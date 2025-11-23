import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Local custom fonts
const aquarelle = localFont({
  src: [
    {
      path: '../public/fonts/aquarelle/aquarelle.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/aquarelle/aquarelle.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-aquarelle',
  display: 'swap',
})

const belindaAvenue = localFont({
  src: [
    {
      path: '../public/fonts/belinda-avuenue/belinda-avenue.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/belinda-avuenue/belinda-avenue.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-belinda',
  display: 'swap',
})

const kattyDiona = localFont({
  src: [
    {
      path: '../public/fonts/katty-diano/katty-diona.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/katty-diano/katty-diona.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-katty',
  display: 'swap',
})

const madamGhea = localFont({
  src: [
    {
      path: '../public/fonts/madam-ghea/madam-ghea.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/madam-ghea/madam-ghea.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-madam-ghea',
  display: 'swap',
})

const mallong = localFont({
  src: [
    {
      path: '../public/fonts/mallong/mallong.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/mallong/mallong.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-mallong',
  display: 'swap',
})

const playfairDisplay = localFont({
  src: [
    {
      path: '../public/fonts/playfairdisplay/playfairdisplay.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/playfairdisplay/playfairdisplay.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-playfair',
  display: 'swap',
})

const quicksand = localFont({
  src: [
    {
      path: '../public/fonts/quicksand/quicksand.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/quicksand/quicksand.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-quicksand',
  display: 'swap',
})

const showcaseSans = localFont({
  src: [
    {
      path: '../public/fonts/showcasesans/showcasesans.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/showcasesans/showcasesans.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-showcase',
  display: 'swap',
})

const signora = localFont({
  src: [
    {
      path: '../public/fonts/signora/signora.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/signora/signora.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-signora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Loi & Hang Wedding - A Love Story Begins',
  description: 'Join us as we celebrate the union of Loi and Hang. Discover our love story, wedding details, and share your wishes in our guestbook.',
  keywords: ['wedding', 'Loi Hang wedding', 'wedding invitation', 'wedding ceremony', 'wedding reception', 'love story'],
  authors: [{ name: 'Loi & Hang' }],
  creator: 'Loi & Hang',
  publisher: 'Loi & Hang Wedding',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://loihangwedding.io.vn'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Loi & Hang Wedding - A Love Story Begins',
    description: 'Join us as we celebrate the union of Loi and Hang. Save the date for our special day!',
    url: 'https://loihangwedding.io.vn',
    siteName: 'Loi & Hang Wedding',
    images: [
      {
        url: '/images/main_picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Loi & Hang Wedding',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loi & Hang Wedding - A Love Story Begins',
    description: 'Join us as we celebrate the union of Loi and Hang.',
    images: ['/images/main_picture.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`
        ${inter.variable} 
        ${aquarelle.variable} 
        ${belindaAvenue.variable} 
        ${kattyDiona.variable} 
        ${madamGhea.variable} 
        ${mallong.variable} 
        ${playfairDisplay.variable} 
        ${quicksand.variable} 
        ${showcaseSans.variable} 
        ${signora.variable}
      `}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/webp/favicon_wedding.webp" />
        <link rel="icon" type="image/png" sizes="16x16" href="/webp/favicon_wedding.webp" />
        <link rel="apple-touch-icon" href="/webp/apple-touch-icon.webp" />
        <meta name="theme-color" content="#e3607e" />

        {/* Essential meta tags only */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Hash reload prevention script - DISABLED FOR TESTING iOS RELOAD ISSUES */}
        {/* 
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Early hash reload prevention for in-app browsers
                if (typeof window === 'undefined') return;
                
                var userAgent = navigator.userAgent || '';
                var isInAppBrowser = /Instagram|FBAN|FBAV|Twitter|Line|Snapchat|LinkedIn|WeChat|QQ|MicroMessenger|WhatsApp|Telegram|TikTok|ByteDance|Musical\\.ly/i.test(userAgent) ||
                  (/Mobile.*Safari/i.test(userAgent) && !/Version.*Safari/i.test(userAgent));
                
                if (!isInAppBrowser) return;
                
                console.log('[Early Prevention] In-app browser detected, applying immediate hash protection');
                
                // Clean up any hash from current URL immediately
                if (location.hash) {
                  var cleanUrl = location.href.split('#')[0];
                  history.replaceState(null, '', cleanUrl);
                  console.log('[Early Prevention] Cleaned initial hash');
                }
                
                // Override reload function immediately to prevent framework-triggered reloads
                var originalReload = location.reload.bind(location);
                location.reload = function() {
                  var stack = new Error().stack || '';
                  var isHashRelated = stack.includes('includes("#")') || location.hash;
                  
                  if (isHashRelated) {
                    console.warn('[Early Prevention] Blocked framework hash reload');
                    if (location.hash) {
                      var urlWithoutHash = location.href.split('#')[0];
                      history.replaceState(null, '', urlWithoutHash);
                    }
                    return;
                  }
                  
                  originalReload();
                };
                
                // Prevent hashchange events
                window.addEventListener('hashchange', function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  var urlWithoutHash = location.href.split('#')[0];
                  history.replaceState(null, '', urlWithoutHash);
                  console.warn('[Early Prevention] Hash change blocked');
                }, true);
                
                console.log('[Early Prevention] Hash protection active');
              })();
            `,
          }}
        />
        */}
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
