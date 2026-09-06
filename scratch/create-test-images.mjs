import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple BMP/PNG or draw with canvas/raw image bytes
// Let's create an uncompressed large SVG or base64 PPM image
// A simple PPM image can be converted, or write a simple valid BMP / PNG:
// A minimal 100x100 PNG
const minimalPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAALklEQVR42u3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuBn6eAAGYjE3cAAAAAElFTkSuQmCC';
const testDir = path.resolve(__dirname, 'test-images');
if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

fs.writeFileSync(path.join(testDir, 'sample1.png'), Buffer.from(minimalPngBase64, 'base64'));
fs.writeFileSync(path.join(testDir, 'sample2.png'), Buffer.from(minimalPngBase64, 'base64'));

console.log('Sample images generated in', testDir);
