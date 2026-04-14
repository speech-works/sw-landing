import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Speechworks | Elevate Your Voice',
  description: 'Your voice can change how the world listens.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Fonts: Inter for clean UI */}
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        
        {/* Lucide Icons */}
        <script src="https://unpkg.com/lucide@latest" crossOrigin="anonymous"></script>
      </head>
      <body className="relative bg-app-bg text-app-text overflow-x-hidden max-w-[100vw]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
