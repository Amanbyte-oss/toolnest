import sharp from 'sharp';
import path from 'node:path';

async function generate() {
  const dir = path.resolve('scratch/test-images');

  // 1. Generate 5MB+ phone photo (4032 x 3024)
  console.log('Generating 5MB+ phone photo...');
  const width = 4032;
  const height = 3024;
  
  // Create noise/random pixels for realism and non-compressibility
  const buffer = Buffer.alloc(width * height * 3);
  for (let i = 0; i < buffer.length; i += 3) {
    const x = (i / 3) % width;
    const y = Math.floor((i / 3) / width);
    buffer[i] = (x ^ y ^ (Math.random() * 255)) & 0xff;
    buffer[i + 1] = ((x * 2) ^ (y * 2) ^ (Math.random() * 255)) & 0xff;
    buffer[i + 2] = ((x * 3) ^ (y * 3) ^ (Math.random() * 255)) & 0xff;
  }

  await sharp(buffer, { raw: { width, height, channels: 3 } })
    .jpeg({ quality: 95 })
    .toFile(path.join(dir, 'phone-photo-5mb.jpg'));

  // 2. Generate sample WebP
  await sharp(buffer, { raw: { width: 1200, height: 800, channels: 3 } })
    .webp({ quality: 80 })
    .toFile(path.join(dir, 'sample.webp'));

  // 3. Generate sample PNG
  await sharp(buffer, { raw: { width: 1200, height: 800, channels: 3 } })
    .png()
    .toFile(path.join(dir, 'sample-photo.png'));

  console.log('Generated test assets successfully!');
}

generate().catch(console.error);
