import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Word of Truth",
  description: "Holy Bible with Amharic and English translations",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Word of Truth",
  },
  icons: {
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#ffffff" id="theme-color-meta" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Load theme immediately to prevent flash
              (function() {
                try {
                  var savedTheme = localStorage.getItem('bible-theme');
                  var themeColors = {
                    'light': '#ffffff',
                    'warm': '#faf6f0',
                    'dark': '#1a1a2e',
                    'midnight': '#030712',
                    'amoled': '#000000',
                    'ocean': '#0a192f'
                  };
                  var color = themeColors[savedTheme] || '#ffffff';
                  
                  // Set document background immediately
                  document.documentElement.style.backgroundColor = color;
                  document.body.style.backgroundColor = color;
                  
                  // Update or create theme-color meta tag
                  var meta = document.getElementById('theme-color-meta');
                  if (meta) {
                    meta.setAttribute('content', color);
                  }
                  
                  // Also try to update any existing meta[name="theme-color"]
                  var metas = document.querySelectorAll('meta[name="theme-color"]');
                  for (var i = 0; i < metas.length; i++) {
                    metas[i].setAttribute('content', color);
                  }
                } catch (e) {
                  // Silent fail - don't break the app
                }
              })();
              
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-hidden">
        {children}
      </body>
    </html>
  );
}
