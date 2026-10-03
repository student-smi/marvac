import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { hashPassword, createSessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    const existing = await store.findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const user = await store.createUser({
      id: userId,
      email,
      password_hash: passwordHash,
      full_name: name,
      phone: phone || "",
      role: "customer",
    });

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.full_name,
    });

    const res = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
      },
    });

    res.cookies.set("aura_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
