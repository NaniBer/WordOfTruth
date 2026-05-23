import sharp from "sharp";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = join(process.cwd(), "public", "icons");

if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

const createIcon = async (size: number) => {
  const padding = Math.round(size * 0.15);
  const iconSize = size - padding * 2;

  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4f46e5"/>
          <stop offset="100%" style="stop-color:#7c3aed"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="url(#bg)"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
        font-family="Georgia, serif" font-weight="bold"
        font-size="${Math.round(iconSize * 0.7)}" fill="white">W</text>
    </svg>
  `;

  const outputPath = join(iconsDir, `icon-${size}x${size}.png`);
  await sharp(Buffer.from(svg)).png().toFile(outputPath);
  console.log(`Generated: icon-${size}x${size}.png`);
};

async function main() {
  console.log("Generating PWA icons...\n");
  
  for (const size of sizes) {
    await createIcon(size);
  }
  
  const appleTouchIcon = join(iconsDir, "apple-touch-icon.png");
  await sharp(join(iconsDir, "icon-192x192.png"))
    .toFile(appleTouchIcon);
  console.log("\nGenerated: apple-touch-icon.png");
  
  console.log("\nAll icons generated successfully!");
}

main().catch(console.error);