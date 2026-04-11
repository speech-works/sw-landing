'use client';

import React, {useEffect} from 'react';
import Navbar from './components/Navbar';
import AmbientBackgrounds from './components/AmbientBackgrounds';
import Hero from './components/Hero';
import MarqueeDivider from './components/MarqueeDivider';
import Roadmap from './components/Roadmap';
import Platform from './components/Platform';
import Simulator from './components/Simulator';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function Home() {
  useEffect(() => {
    // Inject scripts
    
        (window as any).tailwind = (window as any).tailwind || {};
        (window as any).tailwind.config = {
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
    

        function activateSimulator(index) {
            const configs = {
                1: { text: 'text-brand', hover: 'group-hover:text-brand' },
                2: { text: 'text-purple-500', hover: 'group-hover:text-purple-500' },
                3: { text: 'text-emerald-500', hover: 'group-hover:text-emerald-500' }
            };

            for(let i=1; i<=3; i++) {
                const btn = document.getElementById('sim-btn-' + i);
                const icon = document.getElementById('sim-icon-' + i);
                const view = document.getElementById('sim-view-' + i);
                const config = configs[i];
                
                if(i === index) {
                    btn.className = 'magnetic-btn pointer-none-children group flex items-center gap-3 px-6 py-2.5 rounded-full transition-all duration-500 bg-app-text text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] whitespace-nowrap outline-none cursor-pointer';
                    icon.className = `${config.text} transition-colors`;
                    view.className = 'absolute inset-0 flex flex-col justify-between p-8 md:p-10 transition-all duration-[800ms] opacity-100 translate-y-0 scale-100 z-20 pointer-events-none';
                    
                    // Trigger Glitch Text Re-animation
                    const content = view.querySelector('.max-w-\\[50\\%\\]');
                    if(content) {
                        content.classList.remove('animate-glitch');
                        void content.offsetWidth; // Force DOM reflow
                        content.classList.add('animate-glitch');
                    }
                } else {
                    btn.className = 'magnetic-btn pointer-none-children group flex items-center gap-3 px-6 py-2.5 rounded-full transition-all duration-500 bg-transparent text-app-muted hover:bg-black/5 whitespace-nowrap outline-none cursor-pointer';
                    icon.className = `transition-colors ${config.hover}`;
                    view.className = 'absolute inset-0 flex flex-col justify-between p-8 md:p-10 transition-all duration-[800ms] opacity-0 translate-y-16 scale-95 z-0 pointer-events-none';
                }
            }
        }

        // Initialize Advanced Experimental Interactions
        (function initExperimental() {
            // Magnetic Dock Buttons
            document.querySelectorAll('.magnetic-btn').forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
                    const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
                    btn.style.transform = `translate(${x}px, ${y}px)`;
                });
                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = `translate(0px, 0px)`;
                });
            });

            // Stage Grid Flashlight Hologram
            const stage = document.getElementById('simulator-stage');
            if(stage) {
                stage.addEventListener('mousemove', (e) => {
                    const rect = stage.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    stage.style.setProperty('--stage-mouse-x', `${x}px`);
                    stage.style.setProperty('--stage-mouse-y', `${y}px`);
                });
            }

            // 3D Parallax Tilt Cards & Border Glow
            document.querySelectorAll('.tilt-card').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    // Tilt calculations
                    const rotateX = ((y - centerY) / centerY) * -12; 
                    const rotateY = ((x - centerX) / centerX) * 12;
                    
                    // Apply Tilt
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                    
                    // Apply Border Tracker Glow
                    card.style.setProperty('--card-mouse-x', `${x}px`);
                    card.style.setProperty('--card-mouse-y', `${y}px`);
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                });
            });

            // Magnetic Sticker Interaction
            document.querySelectorAll('.magnetic-sticker').forEach(sticker => {
                sticker.addEventListener('mousemove', (e) => {
                    const rect = sticker.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
                    const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
                    
                    const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -5; 
                    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5;
                    
                    sticker.style.transform = `perspective(1000px) translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                });
                
                sticker.addEventListener('mouseleave', () => {
                    sticker.style.transform = `perspective(1000px) translate(0px, 0px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                });
            });
        })();
    

            // Attach interaction for the fist rising specifically on button hover
            (function() {
                const btn = document.getElementById('rebel-btn');
                const cta = document.getElementById('download');
                if(btn && cta) {
                    btn.addEventListener('mouseenter', () => cta.classList.add('btn-hovered'));
                    btn.addEventListener('mouseleave', () => cta.classList.remove('btn-hovered'));
                }
            })();
        

        // Initialize Icons
        (window as any).lucide.createIcons();

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) {
                nav.classList.add('py-2', 'md:py-4', 'shadow-sm');
                nav.classList.remove('py-4', 'md:py-6');
            } else {
                nav.classList.add('py-4', 'md:py-6');
                nav.classList.remove('py-2', 'md:py-4', 'shadow-sm');
            }
        });

        // Scroll Reveal Animation
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach((element) => {
            observer.observe(element);
        });

        // Interactive Roadmap Logic
        function switchRoadmap(phase) {
            const themes = {
                1: 'brand',
                2: 'purple-500',
                3: 'emerald-500'
            };

            for (let i = 1; i <= 3; i++) {
                const btn = document.getElementById('rm-btn-' + i);
                const label = document.getElementById('rm-label-' + i);
                const title = document.getElementById('rm-title-' + i);
                const desc = document.getElementById('rm-desc-' + i);
                const line = document.getElementById('rm-line-' + i);
                const canvas = document.getElementById('rm-canvas-' + i);
                
                if (i === phase) {
                    // Activate Menu Item
                    btn.classList.remove('opacity-50', 'hover:opacity-100');
                    btn.classList.add('opacity-100');
                    
                    label.className = `text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2 block transition-colors duration-300 text-${themes[i]}`;
                    title.className = `text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-app-text transition-all duration-500`;
                    
                    desc.style.maxHeight = desc.scrollHeight + "px";
                    desc.classList.remove('opacity-0', 'mt-0');
                    desc.classList.add('opacity-100', 'mt-2', 'md:mt-4');

                    line.className = `absolute left-[-27px] md:left-[-43px] -top-[2px] -bottom-[2px] w-[4px] bg-${themes[i]} transition-all duration-500 opacity-100 scale-y-100 origin-top`;
                    
                    // Activate Canvas Stage
                    canvas.className = `absolute inset-0 bg-gradient-to-br p-6 sm:p-8 md:p-12 flex flex-col justify-between transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 translate-y-0 scale-100 z-20 pointer-events-auto`;
                    if(i===1) canvas.classList.add('from-brand', 'to-[#D9692E]');
                    if(i===2) canvas.classList.add('from-purple-500', 'to-purple-800');
                    if(i===3) canvas.classList.add('from-emerald-500', 'to-emerald-800');

                } else {
                    // Deactivate Menu Item
                    btn.classList.remove('opacity-100');
                    btn.classList.add('opacity-50', 'hover:opacity-100');
                    
                    label.className = `text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2 block text-app-muted transition-colors duration-300`;
                    title.className = `text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(63,51,45,0.3)] group-hover:[-webkit-text-stroke:1px_rgba(63,51,45,0.7)] transition-all duration-500`;
                    
                    desc.style.maxHeight = "0px";
                    desc.classList.remove('opacity-100', 'mt-2', 'md:mt-4');
                    desc.classList.add('opacity-0', 'mt-0');

                    line.className = `absolute left-[-27px] md:left-[-43px] -top-[2px] -bottom-[2px] w-[4px] bg-transparent transition-all duration-500 opacity-0 scale-y-0 origin-top`;
                    
                    // Deactivate Canvas Stage
                    canvas.className = `absolute inset-0 bg-gradient-to-br p-6 sm:p-8 md:p-12 flex flex-col justify-between transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-y-16 scale-95 z-0 pointer-events-none`;
                    if(i===1) canvas.classList.add('from-brand', 'to-[#D9692E]');
                    if(i===2) canvas.classList.add('from-purple-500', 'to-purple-800');
                    if(i===3) canvas.classList.add('from-emerald-500', 'to-emerald-800');
                }
            }
        }

        // Spotlight Mouse Effect
        document.querySelectorAll('.glow-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    
(window as any).switchRoadmap = switchRoadmap;
(window as any).activateSimulator = activateSimulator;

  }, []);

  return (
    <main>
      <AmbientBackgrounds />
      <Navbar />
      <Hero />
      <MarqueeDivider />
      <Roadmap />
      <Platform />
      <Simulator />
      <CTA />
      <Footer />
    </main>
  );
}
