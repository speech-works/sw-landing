import re

with open("new.html", "r") as f:
    html = f.read()

scripts = re.findall(r'<script>(.*?)</script>', html, re.DOTALL)
js_content = "\n".join(scripts)
js_content = js_content.replace('`', '\\`').replace('$', '\\$')

# Make sure window functions are exported to window so onClick works
js_content += """
window.switchRoadmap = switchRoadmap;
window.activateSimulator = activateSimulator;
"""

page_template = """'use client';

import React, {useEffect} from 'react';
import Navbar from './components/Navbar';
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
    __JS_CONTENT__
  }, []);

  return (
    <main>
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
"""

page_tsx = page_template.replace("__JS_CONTENT__", js_content)

with open("src/app/page.tsx", "w") as f:
    f.write(page_tsx)
print("page.tsx written")
