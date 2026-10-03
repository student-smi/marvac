/**
 * Shared media utilities — used across all components and admin panel.
 * Handles: images, direct video URLs (mp4/webm), Instagram Reels/Posts.
 */

/** Returns true if the URL is an Instagram post/reel/video link */
export function isInstagramUrl(url: string): boolean {
  if (!url) return false;
  return /instagram\.com\/(reel|p|tv)\//i.test(url);
}

/** Returns true if the URL is a direct video file or data URI video */
export function isVideoUrl(url: string): boolean {
  if (!url) return false;
  return (
    url.startsWith("data:video") ||
    url.startsWith("blob:") ||
    /\.(mp4|webm|mov|ogg|m4v)(\?.*)?$/i.test(url) ||
    url.includes(".mp4") ||
    url.includes(".webm") ||
    url.includes("/video/")
  );
}

/**
 * Converts a plain Instagram URL to its embed URL.
 * e.g. https://www.instagram.com/reel/ABC123/ → https://www.instagram.com/reel/ABC123/embed/
 */
export function toInstagramEmbedUrl(url: string): string {
  // Already an embed URL
  if (url.includes("/embed")) return url;

  // Extract the path part: /reel/CODE or /p/CODE or /tv/CODE
  const match = url.match(/instagram\.com\/(reel|p|tv)\/([A-Za-z0-9_-]+)/i);
  if (!match) return url;
  const [, type, code] = match;
  return `https://www.instagram.com/${type}/${code}/embed/`;
}

/** Returns the detected media type for a given URL */
export type MediaType = "instagram" | "video" | "image";

export function getMediaType(url: string): MediaType {
  if (isInstagramUrl(url)) return "instagram";
  if (isVideoUrl(url)) return "video";
  return "image";
}
