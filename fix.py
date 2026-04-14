import os

files = ["Roadmap.tsx", "Simulator.tsx"]
for filename in files:
    path = f"src/app/components/{filename}"
    if not os.path.exists(path): continue
    
    with open(path, "r") as f:
        content = f.read()
    
    content = content.replace("switchRoadmap(", "(window as any).switchRoadmap(")
    content = content.replace("activateSimulator(", "(window as any).activateSimulator(")
    
    with open(path, "w") as f:
        f.write(content)
    print(f"Fixed {filename}")

