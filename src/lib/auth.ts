/**
 * Edge-compatible Authentication & Cryptography
 * Uses native Web Crypto API supported by Cloudflare Workers, Node.js, and Browsers.
 */

const JWT_SECRET = process.env.JWT_SECRET || "marvac_d2c_edge_jwt_secret_2026_secure";

// SHA-256 password hashing with salt
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = "marvac_salt_2026_";
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const calculated = await hashPassword(password);
  return calculated === hash;
}

// Edge-ready lightweight token (HMAC-SHA256 Signed Token)
export async function createSessionToken(payload: { userId: string; email: string; name: string }): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
  const tokenPayload = { ...payload, exp };

  const encoder = new TextEncoder();
  const base64UrlHeader = btoa(JSON.stringify(header)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const base64UrlPayload = btoa(JSON.stringify(tokenPayload)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const unsignedToken = `${base64UrlHeader}.${base64UrlPayload}`;

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(unsignedToken));
  const base64UrlSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${unsignedToken}.${base64UrlSignature}`;
}

export async function verifySessionToken(token: string): Promise<{ userId: string; email: string; name: string } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;
    const unsignedToken = `${headerB64}.${payloadB64}`;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // Decode signature
    const binarySignature = atob(signatureB64.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = new Uint8Array(binarySignature.length);
    for (let i = 0; i < binarySignature.length; i++) {
      bytes[i] = binarySignature.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify("HMAC", key, bytes, encoder.encode(unsignedToken));
    if (!isValid) return null;

    const payload = JSON.parse(atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/")));
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null; // Expired
    }

    return {
      userId: payload.userId,
      email: payload.email,
      name: payload.name,
    };
  } catch {
    return null;
  }
}
