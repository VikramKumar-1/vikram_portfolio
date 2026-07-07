import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  try {
    const filePath = "C:\\Users\\vikur\\.gemini\\antigravity\\brain\\674489c0-e2b7-448d-bb9a-8470e186a79e\\boy_dog_pure_black_1783425008385.png";
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      return new NextResponse(buffer, {
        headers: { 'Content-Type': 'image/png' },
      });
    }
    return new NextResponse('File not found', { status: 404 });
  } catch (error) {
    return new NextResponse('Error loading image', { status: 500 });
  }
}
