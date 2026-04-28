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
                  var themeData = {
                    'light': { color: '#ffffff', bg: 'from-gray-50 via-white to-gray-100', text: '#111827' },
                    'warm': { color: '#faf6f0', bg: 'from-[#faf6f0] via-[#f7f0e6] to-[#f3ead9]', text: '#3d3222' },
                    'dark': { color: '#1a1a2e', bg: 'from-[#1a1a2e] via-[#16213e] to-[#0f0f23]', text: '#e5e7eb' },
                    'midnight': { color: '#030712', bg: 'from-[#030712] via-[#0a0e1a] to-[#0f0a1e]', text: '#f3f4f6' },
                    'amoled': { color: '#000000', bg: 'from-black via-black to-black', text: '#f3f4f6' },
                    'ocean': { color: '#0a192f', bg: 'from-[#0a192f] via-[#0c2340] to-[#071528]', text: '#f0f9ff' }
                  };
                  var theme = themeData[savedTheme] || themeData['light'];
                  
                  // Set document and body background immediately
                  document.documentElement.style.backgroundColor = theme.color;
                  document.body.style.backgroundColor = theme.color;
                  document.body.style.color = theme.text;
                  
                  // Add theme gradient class to html element immediately
                  document.documentElement.classList.add('bg-gradient-to-b');
                  var bgClasses = theme.bg.split(' ');
                  for (var i = 0; i < bgClasses.length; i++) {
                    document.documentElement.classList.add(bgClasses[i]);
                  }
                  
                  // Update theme-color meta tag
                  var meta = document.getElementById('theme-color-meta');
                  if (meta) {
                    meta.setAttribute('content', theme.color);
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
