import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch a high-quality Earth texture on the server side
    const response = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_2048.jpg/1024px-Land_ocean_ice_2048.jpg');
    
    if (!response.ok) {
      throw new Error('Failed to fetch texture');
    }

    const arrayBuffer = await response.arrayBuffer();

    // Serve it locally to bypass all browser CORS and WebGL security restrictions
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    return new NextResponse('Error loading texture', { status: 500 });
  }
}
