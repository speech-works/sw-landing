import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

content = content.replace("tailwind.config =", "(window as any).tailwind = (window as any).tailwind || {};\n        (window as any).tailwind.config =")
content = content.replace("lucide.createIcons()", "(window as any).lucide.createIcons()")
content = content.replace("window.switchRoadmap =", "(window as any).switchRoadmap =")
content = content.replace("window.activateSimulator =", "(window as any).activateSimulator =")

with open("src/app/page.tsx", "w") as f:
    f.write(content)

