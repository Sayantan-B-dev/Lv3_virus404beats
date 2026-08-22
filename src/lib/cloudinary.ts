// src/lib/cloudinary.ts — Cloudinary signing & URL building (no SDK dependency)
import { createHash, createHmac } from "node:crypto";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

export function isCloudinaryConfigured(): boolean {
  return !!(CLOUD_NAME && API_KEY && API_SECRET);
}

// Build signed upload parameters for direct browser upload (unsigned not used — we sign server-side)
export function getSignedUploadParams(
  publicId: string,
  options: {
    folder?: string;
    resourceType?: "video" | "raw" | "auto";
    allowedFormats?: string[];
    maxFileSize?: number; // bytes
    tags?: string[];
  } = {}
): { signature: string; timestamp: number; apiKey: string; params: Record<string, string> } {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary not configured");
  }
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = options.folder ?? "virus404/beats";
  const paramsToSign: Record<string, string> = {
    public_id: publicId,
    timestamp: timestamp.toString(),
    folder,
    // Overwrite allowed (re-upload same public_id replaces)
    overwrite: "true",
    // Apply eager transformation: tagged+looped preview
    eager: "e_watermark,l_text:Arial_40_bold:VIRUS404%20BEATS,co_rgb:ff0000,o_50,g_south_east,y_20,x_20/e_loop:3",
    eager_async: "true",
  };
  if (options.resourceType) paramsToSign.resource_type = options.resourceType;
  if (options.allowedFormats?.length) paramsToSign.allowed_formats = options.allowedFormats.join(",");
  if (options.maxFileSize) paramsToSign.max_file_size = options.maxFileSize.toString();
  if (options.tags?.length) paramsToSign.tags = options.tags.join(",");

  // Cloudinary signature: SHA1(sorted_params + api_secret)
  // Sort keys alphabetically, join as key=value, concatenate with &
  const sortedKeys = Object.keys(paramsToSign).sort();
  const stringToSign = sortedKeys.map((k) => `${k}=${paramsToSign[k]}`).join("&") + API_SECRET;
  const signature = createHash("sha1").update(stringToSign).digest("hex");

  return { signature, timestamp, apiKey: API_KEY!, params: paramsToSign };
}

// Build streaming URL for a tagged/looped preview
// Uses delivery transformation: watermark text "VIRUS404 BEATS" + loop 3x (short preview)
export function getPreviewUrl(publicId: string): string {
  if (!isCloudinaryConfigured()) return "";
  // video resource type for audio; format auto-detected
  // Transformation: audio codec for streaming, loop 3 times, watermark overlay
  // e_loop:3 loops the audio 3 times (good for ~30-60s preview)
  // e_watermark: text overlay
  const transform = "f_auto/vc_auto/e_loop:3/e_watermark,l_text:Arial_40_bold:VIRUS404%20BEATS,co_rgb:ff0000,o_50,g_south_east,y_20,x_20";
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transform}/${publicId}`;
}

// Build cover image URL (for beat cards)
export function getCoverUrl(publicId: string, options: { width?: number; height?: number; crop?: "fill" | "scale" } = {}): string {
  if (!isCloudinaryConfigured()) return "";
  const { width = 400, height = 400, crop = "fill" } = options;
  const transform = `c_${crop},w_${width},h_${height},f_auto,q_auto`;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transform}/${publicId}`;
}

// Verify webhook signature (for future upload callbacks if needed)
export function verifyWebhookSignature(payload: string, signatureHeader: string): boolean {
  if (!isCloudinaryConfigured() || !API_SECRET) return false;
  const expected = createHmac("sha256", API_SECRET).update(payload).digest("hex");
  // Cloudinary sends header as "sha256=<hex>"
  const provided = signatureHeader.replace(/^sha256=/, "");
  return provided === expected;
}