import sharp from "sharp";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = join(process.cwd(), "public", "icons");

if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

const createIcon = async (size: number) => {
  const padding = Math.round(size * 0.08);
  const iconSize = size - padding * 2;
  const strokeWidth = Math.max(Math.round(size * 0.025), 1);

  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4f46e5"/>
          <stop offset="100%" style="stop-color:#7c3aed"/>
        </linearGradient>
        <linearGradient id="book" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#fbbf24"/>
          <stop offset="50%" style="stop-color:#f59e0b"/>
          <stop offset="100%" style="stop-color:#d97706"/>
        </linearGradient>
        <clipPath id="rounded">
          <rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}"/>
        </clipPath>
      </defs>
      
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="url(#bg)"/>
      
      <g transform="translate(${padding + iconSize * 0.1}, ${padding + iconSize * 0.1})">
        <path d="
          M ${iconSize * 0.1} ${iconSize * 0.15}
          L ${iconSize * 0.5} ${iconSize * 0.05}
          L ${iconSize * 0.5} ${iconSize * 0.85}
          L ${iconSize * 0.1} ${iconSize * 0.95}
          Z
        " fill="url(#book)" stroke="#b45309" stroke-width="${strokeWidth}"/>
        
        <path d="
          M ${iconSize * 0.9} ${iconSize * 0.15}
          L ${iconSize * 0.5} ${iconSize * 0.05}
          L ${iconSize * 0.5} ${iconSize * 0.85}
          L ${iconSize * 0.9} ${iconSize * 0.95}
          Z
        " fill="#fcd34d" stroke="#b45309" stroke-width="${strokeWidth}"/>
        
        <line x1="${iconSize * 0.2}" y1="${iconSize * 0.3}" x2="${iconSize * 0.45}" y2="${iconSize * 0.25}" stroke="#78350f" stroke-width="${strokeWidth * 0.8}" stroke-linecap="round"/>
        <line x1="${iconSize * 0.2}" y1="${iconSize * 0.45}" x2="${iconSize * 0.45}" y2="${iconSize * 0.4}" stroke="#78350f" stroke-width="${strokeWidth * 0.8}" stroke-linecap="round"/>
        <line x1="${iconSize * 0.2}" y1="${iconSize * 0.6}" x2="${iconSize * 0.45}" y2="${iconSize * 0.55}" stroke="#78350f" stroke-width="${strokeWidth * 0.8}" stroke-linecap="round"/>
        
        <line x1="${iconSize * 0.55}" y1="${iconSize * 0.25}" x2="${iconSize * 0.8}" y2="${iconSize * 0.3}" stroke="#78350f" stroke-width="${strokeWidth * 0.8}" stroke-linecap="round"/>
        <line x1="${iconSize * 0.55}" y1="${iconSize * 0.4}" x2="${iconSize * 0.8}" y2="${iconSize * 0.45}" stroke="#78350f" stroke-width="${strokeWidth * 0.8}" stroke-linecap="round"/>
        <line x1="${iconSize * 0.55}" y1="${iconSize * 0.55}" x2="${iconSize * 0.8}" y2="${iconSize * 0.6}" stroke="#78350f" stroke-width="${strokeWidth * 0.8}" stroke-linecap="round"/>
      </g>
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