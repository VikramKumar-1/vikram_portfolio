import { NextResponse } from 'next/server';

export async function GET() {
  // Try multiple reliable CDNs in case one is blocked by the network
  const urls = [
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_2048.jpg/1024px-Land_ocean_ice_2048.jpg'
  ];

  let arrayBuffer: ArrayBuffer | null = null;

  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: 'force-cache' });
      if (response.ok) {
        arrayBuffer = await response.arrayBuffer();
        break; // Successfully fetched, exit loop
      }
    } catch (e) {
      console.warn(`Failed to fetch from ${url}`);
      // Continue to next URL
    }
  }

  if (arrayBuffer) {
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  }

  // FATAL FALLBACK: If the user's Node network is strictly blocking external fetches, 
  // we return a valid 1x1 transparent PNG instead of a 500 error. 
  // This absolutely guarantees that Three.js TextureLoader will NEVER crash the canvas.
  const fallbackBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const buffer = Buffer.from(fallbackBase64, "base64");
  
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store'
    },
  });
}
