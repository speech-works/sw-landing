import type { Metadata } from 'next';

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
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Fonts: Inter for clean UI */}
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com/"></script>
        
        {/* Lucide Icons */}
        <script src="https://unpkg.com/lucide@latest" crossOrigin="anonymous"></script>

        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            brand: {
                                DEFAULT: '#F28044', 
                                50: '#FFF5F0',
                                100: '#FFE6D9',
                                500: '#F28044',
                                600: '#D9692E',
                            },
                            app: {
                                bg: '#FFFAF5', 
                                text: '#3F332D', 
                                muted: '#8C7C73', 
                                card: '#FFFFFF',
                            }
                        },
                        fontFamily: {
                            sans: ['Inter', 'sans-serif']
                        },
                        letterSpacing: {
                            tighter: '-.04em',
                            tightest: '-.06em',
                        },
                        boxShadow: {
                            'soft-orange': '0 10px 40px -10px rgba(242, 128, 68, 0.15)',
                            'card-hover': '0 20px 40px -10px rgba(63, 51, 45, 0.08)',
                        }
                    }
                }
            }
          `
        }}></script>

        <style dangerouslySetInnerHTML={{
          __html: `
            body {
                font-family: 'Inter', sans-serif;
                background-color: #FFFAF5;
                color: #3F332D;
                -webkit-font-smoothing: antialiased;
                overflow-x: hidden;
                width: 100%;
            }

            /* Ambient Grid Background - Light Theme */
            .bg-grid {
                background-size: 40px 40px;
                background-image: 
                    linear-gradient(to right, rgba(242, 128, 68, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(242, 128, 68, 0.05) 1px, transparent 1px);
                mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
                -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
            }

            /* Custom Scrollbar */
            ::-webkit-scrollbar { width: 6px; }
            @media (min-width: 768px) {
                ::-webkit-scrollbar { width: 8px; }
            }
            ::-webkit-scrollbar-track { background: #FFFAF5; }
            ::-webkit-scrollbar-thumb { background: #F28044; border-radius: 4px; opacity: 0.5; }
            ::-webkit-scrollbar-thumb:hover { background: #D9692E; }

            /* Awwwards Scroll Reveal Animation */
            .reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .reveal.active {
                opacity: 1;
                transform: translateY(0);
            }
            .reveal-delay-1 { transition-delay: 0.1s; }
            .reveal-delay-2 { transition-delay: 0.2s; }
            .reveal-delay-3 { transition-delay: 0.3s; }

            /* Infinite Marquee */
            .marquee-container {
                display: flex;
                overflow: hidden;
                user-select: none;
                width: 100%;
            }
            .marquee-content {
                flex-shrink: 0;
                display: flex;
                min-width: 100%;
                animation: scroll 20s linear infinite;
            }
            .marquee-content.slow {
                animation-duration: 40s;
            }
            @keyframes scroll {
                from { transform: translateX(0); }
                to { transform: translateX(-100%); }
            }

            /* Smooth fade on edges for Light Theme */
            .mask-edges {
                -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
                mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
            }

            /* Interactive Spotlight Glow Effect */
            .glow-card {
                position: relative;
            }
            .glow-card::before {
                content: "";
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(242, 128, 68, 0.04), transparent 40%);
                z-index: 0;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
                border-radius: inherit;
            }
            .glow-card:hover::before {
                opacity: 1;
            }

            /* Float Animation */
            @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-15px); }
                100% { transform: translateY(0px); }
            }
            .animate-float {
                animation: float 6s ease-in-out infinite;
            }
            
            /* Custom animation for the sliding tracker effect */
            @keyframes translate {
                0% { transform: translateX(0%); }
                100% { transform: translateX(80px); } 
            }
            @media (min-width: 1024px) {
                @keyframes translate {
                    100% { transform: translateX(120px); } 
                }
            }
            /* Hide scrollbar for the mobile dock */
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
          `
        }}></style>
      </head>
      <body className="relative bg-app-bg text-app-text overflow-x-hidden max-w-[100vw]">
        {children}
      </body>
    </html>
  );
}
