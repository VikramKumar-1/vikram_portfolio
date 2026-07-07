import { NextResponse } from 'next/server';
import fs from 'fs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = "C:\\Users\\vikur\\.gemini\\antigravity\\brain\\674489c0-e2b7-448d-bb9a-8470e186a79e\\vikram_mars_exact_1783427902830.png";
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
    console.warn("Failed to load hero foreground:", e);
  }

  const fallbackBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const buffer = Buffer.from(fallbackBase64, "base64");
  return new NextResponse(buffer, {
    headers: { 'Content-Type': 'image/png' },
  });
}
