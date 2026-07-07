import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = "C:\\Users\\vikur\\.gemini\\antigravity\\brain\\674489c0-e2b7-448d-bb9a-8470e186a79e\\hero_full_scene_1783424218223.png";
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000',
        },
      });
    }
  } catch (e) {
    console.warn("Failed to load hero background:", e);
  }

  // Fallback: 1x1 transparent PNG
  const fallbackBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const buffer = Buffer.from(fallbackBase64, "base64");
  return new NextResponse(buffer, {
    headers: { 'Content-Type': 'image/png' },
  });
}
