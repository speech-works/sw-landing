import os
import glob

for filename in glob.glob("src/app/components/*.tsx"):
    with open(filename, "r") as f:
        content = f.read()
    
    # Fix React unsupported style prefix
    content = content.replace("'-webkit-text-stroke'", "WebkitTextStroke")
    content = content.replace("'-webkit-mask-image'", "WebkitMaskImage")
    
    with open(filename, "w") as f:
        f.write(content)

with open("src/app/components/MarqueeDivider.tsx", "r") as f:
    marquee = f.read()
marquee = marquee.replace("}\n}", "}")
with open("src/app/components/MarqueeDivider.tsx", "w") as f:
    f.write(marquee)
    
print("Fixed webkit styles and MarqueeDivider duplicate brace.")
