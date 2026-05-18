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
    icon: [
      { url: "/icons/icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/icons/icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#ffffff" id="theme-color-meta" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <style dangerouslySetInnerHTML={{ __html: `
          html { background-color: var(--theme-bg); color: var(--theme-text); }
          body { background-color: var(--theme-bg); color: var(--theme-text); }
        ` }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('bible-theme');
                  var themeData = {
                    'light': { bg: '#ffffff', text: '#111827' },
                    'warm': { bg: '#faf6f0', text: '#3d3222' },
                    'dark': { bg: '#1a1a2e', text: '#e5e7eb' },
                    'midnight': { bg: '#030712', text: '#f3f4f6' },
                    'amoled': { bg: '#000000', text: '#f3f4f6' },
                    'ocean': { bg: '#0a192f', text: '#f0f9ff' }
                  };
                  var theme = themeData[savedTheme] || themeData['warm'];
                  var el = document.documentElement;
                  el.style.setProperty('--theme-bg', theme.bg);
                  el.style.setProperty('--theme-text', theme.text);
                  var meta = document.getElementById('theme-color-meta');
                  if (meta) meta.setAttribute('content', theme.bg);
                } catch (e) {}
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
