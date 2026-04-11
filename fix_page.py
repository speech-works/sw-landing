with open("src/app/page.tsx", "r") as f:
    code = f.read()
code = code.replace("import Navbar from './components/Navbar';", "import Navbar from './components/Navbar';\nimport AmbientBackgrounds from './components/AmbientBackgrounds';")
code = code.replace("<Navbar />", "<AmbientBackgrounds />\n      <Navbar />")
with open("src/app/page.tsx", "w") as f:
    f.write(code)
print("page.tsx updated")
