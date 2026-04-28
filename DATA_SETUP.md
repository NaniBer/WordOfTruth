# Bible Data Setup

This app supports loading bible translations from an external CDN/server, keeping the app code separate from the copyrighted bible data.

## Option 1: External CDN (Recommended)

### 1. Upload Data to CDN
Upload the contents of `/public/data/` to your CDN:

```
your-cdn.com/
  └── bible-data/
      ├── amharic_bible/
      │   ├── 1.json
      │   ├── 2.json
      │   └── ... (66 books)
      ├── amharic_nasb/
      │   └── ...
      ├── english/
      │   ├── niv/
      │   │   ├── 1.json
      │   │   └── ...
      │   ├── nlt/
      │   │   └── ...
      │   └── csb/
      │       └── ...
      └── amharic/
          └── ...
```

### 2. Configure Environment Variable

Create `.env.local` file:

```bash
NEXT_PUBLIC_DATA_URL=https://your-cdn.com/bible-data
```

Or set in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add: `NEXT_PUBLIC_DATA_URL` = `https://your-cdn.com/bible-data`

### 3. Redeploy

```bash
vercel --prod
```

## Option 2: Local Development

For local development, keep the data in `/public/data/` and leave `NEXT_PUBLIC_DATA_URL` empty.

## CDN Options

### Cloudflare R2 (Free tier)
1. Create R2 bucket
2. Upload data files
3. Enable public access
4. Use the public URL

### AWS S3 + CloudFront
1. Create S3 bucket
2. Upload data files
3. Create CloudFront distribution
4. Use CloudFront URL

### GitHub Pages (Free)
1. Create separate repo for bible data
2. Push data to `gh-pages` branch
3. Use `https://username.github.io/repo-name`

### Another Vercel Project (Free)
1. Create separate Vercel project just for data
2. Push bible data to `/public/` folder
3. Use that project's URL

## Data Format

Each JSON file (e.g., `1.json` for Genesis):

```json
{
  "chapters": [
    {
      "chapter": "1",
      "verses": [
        "Verse 1 text...",
        "Verse 2 text...",
        "..."
      ]
    }
  ]
}
```

## Troubleshooting

**Data not loading?**
- Check browser console for 404 errors
- Verify CORS headers on your CDN
- Check `NEXT_PUBLIC_DATA_URL` is set correctly
- Try accessing the JSON URL directly: `https://your-cdn.com/bible-data/english/niv/1.json`

**CORS errors?**
Add these headers to your CDN:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
```
