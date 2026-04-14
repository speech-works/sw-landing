import re

with open("src/app/components/CTA.tsx", "r") as f:
    content = f.read()

new_css = """                  /* Ultra-fast, Aggressive Cinematic Cut Reveal */
                  .premium-reveal {
                      display: inline-block;
                      opacity: 0;
                      transform: translateY(120%) scale(0.6) skewY(15deg);
                      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), 
                                  opacity 0.4s ease;
                      will-change: transform, opacity;
                      transform-origin: bottom left;
                  }
                  .reveal.active .premium-reveal {
                      opacity: 1;
                      transform: translateY(0) scale(1) skewY(0deg);
                  }
                  
                  /* Cinematic Glitch Cut Hover */
                  .ghost-echo {
                      position: relative;
                      display: inline-block;
                      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.1s;
                  }
                  .ghost-echo::before, .ghost-echo::after {
                      content: attr(data-text);
                      position: absolute;
                      top: 0; left: 0; width: 100%; height: 100%;
                      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                      opacity: 0;
                      pointer-events: none;
                      z-index: 10;
                  }
                  /* Top Slice */
                  .ghost-echo::before {
                      clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
                  }
                  /* Bottom Slice */
                  .ghost-echo::after {
                      clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 50%);
                  }
      
                  /* Hover State - Original text becomes glowing wireframe */
                  .group\\/text:hover .ghost-echo {
                      color: transparent !important;
                      -webkit-text-stroke: 1.5px rgba(242, 128, 68, 0.8) !important;
                      text-shadow: 0 0 30px rgba(242, 128, 68, 0.9);
                      transform: scale(1.08) perspective(500px) translateZ(30px);
                      cursor: crosshair;
                  }
                  /* Slices violently jump apart */
                  .group\\/text:hover .ghost-echo::before {
                      opacity: 1;
                      transform: translate(-15px, -15px) rotate(-3deg);
                      -webkit-text-stroke: 0 !important;
                      color: #3F332D;
                      text-shadow: -6px 0 0 rgba(242, 128, 68, 0.5);
                  }
                  .group\\/text:hover .ghost-echo::after {
                      opacity: 1;
                      transform: translate(20px, 15px) rotate(3deg);
                      -webkit-text-stroke: 0 !important;
                      color: #F28044;
                      text-shadow: 6px 0 0 rgba(63, 51, 45, 0.5);
                  }"""

# Use regex to find everything between /* Epic Rebel Text Animation - V2 Premium */ and /* The Rising Rebel Fist */
pattern = r"\/\* Epic Rebel Text Animation - V2 Premium \*\/.*?(?=\/\* The Rising Rebel Fist \*\/)"
content = re.sub(pattern, new_css + "\n\n                  ", content, flags=re.DOTALL)

with open("src/app/components/CTA.tsx", "w") as f:
    f.write(content)
print("done")
