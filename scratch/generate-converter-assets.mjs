import sharp from 'sharp';
import path from 'node:path';

async function generate() {
  const dir = path.resolve('scratch/test-images');

  // 1. Transparent PNG: 400x400 with a red circle in center and alpha: 0 in corners
  const size = 400;
  const rgba = Buffer.alloc(size * size * 4);
  const radius = 120;
  const cx = 200;
  const cy = 200;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        rgba[idx] = 255;     // R
        rgba[idx + 1] = 50;  // G
        rgba[idx + 2] = 50;  // B
        rgba[idx + 3] = 255; // Alpha
      } else {
        rgba[idx] = 0;
        rgba[idx + 1] = 0;
        rgba[idx + 2] = 0;
        rgba[idx + 3] = 0;   // Transparent!
      }
    }
  }

  await sharp(rgba, { raw: { width: size, height: size, channels: 4 } })
    .png()
    .toFile(path.join(dir, 'transparent-circle.png'));
  console.log('Generated transparent-circle.png');

  // 2. GIF image: 200x200
  await sharp(rgba, { raw: { width: size, height: size, channels: 4 } })
    .gif()
    .toFile(path.join(dir, 'sample.gif'));
  console.log('Generated sample.gif');
}

generate().catch(console.error);
