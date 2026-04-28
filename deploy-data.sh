#!/bin/bash

# Deploy bible data to CDN
# Usage: ./deploy-data.sh [target]
# Targets: r2, s3, vercel

DATA_DIR="./public/data"
TARGET=${1:-"help"}

case $TARGET in
  r2)
    echo "Deploying to Cloudflare R2..."
    echo "Make sure you have rclone configured:"
    echo "  rclone config (create 'r2' remote)"
    echo "Then run:"
    echo "  rclone sync $DATA_DIR r2:your-bucket-name --progress"
    ;;
    
  s3)
    echo "Deploying to AWS S3..."
    echo "Make sure AWS CLI is configured:"
    echo "  aws configure"
    echo "Then run:"
    echo "  aws s3 sync $DATA_DIR s3://your-bucket-name --delete"
    echo ""
    echo "For CloudFront cache invalidation:"
    echo "  aws cloudfront create-invalidation --distribution-id YOUR_ID --paths '/*'"
    ;;
    
  vercel)
    echo "Deploying to separate Vercel project..."
    echo "1. Create new project: mkdir bible-data && cd bible-data"
    echo "2. Copy data: cp -r $DATA_DIR/* ."
    echo "3. Create vercel.json:"
    echo '    {'
    echo '      "headers": ['
    echo '        {'
    echo '          "source": "/(.*)",'
    echo '          "headers": ['
    echo '            { "key": "Access-Control-Allow-Origin", "value": "*" }'
    echo '          ]'
    echo '        }'
    echo '      ]'
    echo '    }'
    echo "4. Deploy: vercel --prod"
    ;;
    
  github)
    echo "Deploying to GitHub Pages..."
    echo "1. Create new repo: bible-data"
    echo "2. Clone it: git clone https://github.com/YOUR_USERNAME/bible-data.git"
    echo "3. Copy data: cp -r $DATA_DIR/* bible-data/"
    echo "4. Push to gh-pages branch:"
    echo "    cd bible-data"
    echo "    git checkout -b gh-pages"
    echo "    git add ."
    echo "    git commit -m 'Add bible data'"
    echo "    git push origin gh-pages"
    echo "5. Enable GitHub Pages in repo settings"
    echo "6. Use URL: https://YOUR_USERNAME.github.io/bible-data"
    ;;
    
  *)
    echo "Bible Data Deploy Script"
    echo ""
    echo "Usage: ./deploy-data.sh [target]"
    echo ""
    echo "Targets:"
    echo "  r2      - Cloudflare R2"
    echo "  s3      - AWS S3 + CloudFront"
    echo "  vercel  - Separate Vercel project"
    echo "  github  - GitHub Pages"
    echo ""
    echo "Example:"
    echo "  ./deploy-data.sh r2"
    echo ""
    echo "Note: Make sure you have the necessary CLI tools installed and configured."
    ;;
esac
