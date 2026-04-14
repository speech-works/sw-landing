import re
import os

with open("new.html", "r") as f:
    html = f.read()

def convert_to_jsx(code):
    # Convert HTML comments to JSX comments
    code = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', code, flags=re.DOTALL)
    # class to className
    code = code.replace('class="', 'className="')
    # JS handlers
    code = code.replace('onclick="', 'onClick={() => ')
    code = re.sub(r'onClick={\(\) => (.*?)"', r'onClick={() => {\1}}"', code)
    
    # SVG properties
    svg_props = [
        'stroke-width', 'stroke-linecap', 'stroke-linejoin', 
        'fill-rule', 'clip-rule', 'crossorigin'
    ]
    for prop in svg_props:
        camel = prop.split('-')[0] + ''.join(x.capitalize() for x in prop.split('-')[1:])
        code = code.replace(f'{prop}=', f'{camel}=')

    # Void tags
    code = re.sub(r'<input([^>]*?)(?<!/)>', r'<input\1 />', code)
    code = re.sub(r'<img([^>]*?)(?<!/)>', r'<img\1 />', code)
    code = re.sub(r'<br>', r'<br />', code)
    code = re.sub(r'<hr>', r'<hr />', code)
    
    # styles
    def style_replacer(match):
        style_str = match.group(1)
        rules = [s.strip() for s in style_str.split(';') if s.strip()]
        obj_props = []
        for r in rules:
            if ':' not in r: continue
            k, v = r.split(':', 1)
            k = k.strip()
            v = v.strip().replace('"', "'")
            parts = k.split('-')
            if parts[0] == '': 
                camel_k = "'" + k + "'"
            elif k.startswith('--'):
                camel_k = "'" + k + "'"
            else:
                camel_k = parts[0] + ''.join(p.capitalize() for p in parts[1:])
            obj_props.append(f"{camel_k}: '{v}'")
        return 'style={{ ' + ', '.join(obj_props) + ' }}'
    
    code = re.sub(r'style="([^"]*)"', style_replacer, code)
    
    # Fix the missing closing quotes for onClick
    code = code.replace('}}"', '}}')
    
    return code

components = {
    'Navbar': re.search(r'<nav.*?</nav>', html, re.DOTALL),
    'Hero': re.search(r'{/\* EXPERIMENTAL HERO.*?<section.*?</section>', html.replace('<!--', '{/*').replace('-->', '*/}'), re.DOTALL),
    'MarqueeDivider': re.search(r'{/\* Infinite Marquee.*?<div className="w-full border-b.*?</div>\n    </div>', html.replace('<!--', '{/*').replace('-->', '*/}').replace('class="','className="'), re.DOTALL),
    'Roadmap': re.search(r'<section id="roadmap".*?</section>', html, re.DOTALL),
    'Platform': re.search(r'<section id="platform".*?</section>', html, re.DOTALL),
    'Simulator': re.search(r'{/\* SCENARIOS SECTION: PERFECTED.*?<style>.*?</style>', html.replace('<!--', '{/*').replace('-->', '*/}'), re.DOTALL), # Wait, the script at the bottom of simulator section is tricky.
    'CTA': re.search(r'<section id="download".*?</section>', html, re.DOTALL),
    'Footer': re.search(r'<footer.*?</footer>', html, re.DOTALL)
}

# The simulator section in new.html ends with <section...><style></style>...<script></script>...<style></style></section>.
# Let's extract the exact sections from the raw HTML to prevent breaking.
components_raw = {
    'Navbar': re.search(r'<nav.*?</nav>', html, re.DOTALL),
    'Hero': re.search(r'<!-- EXPERIMENTAL HERO.*?<section.*?</section>', html, re.DOTALL),
    'MarqueeDivider': re.search(r'<!-- Infinite Marquee.*?(<div class="w-full border-b.*?(?:</div>\s*){3}</div>)', html, re.DOTALL),
    'Roadmap': re.search(r'<section id="roadmap".*?</section>', html, re.DOTALL),
    'Platform': re.search(r'<section id="platform".*?</section>', html, re.DOTALL),
    'Simulator': re.search(r'<!-- SCENARIOS SECTION.*?(<section .*?</section>)', html, re.DOTALL),
    'CTA': re.search(r'<section id="download".*?</section>', html, re.DOTALL),
    'Footer': re.search(r'<footer.*?</footer>', html, re.DOTALL)
}

for k, match in components_raw.items():
    if not match:
        print(f"Failed to find {k}")
    else:
        # If it's a capture group (like MarqueeDivider and Simulator), use group(1), else group(0)
        code = match.group(1) if match.lastindex else match.group(0)
        jsx = convert_to_jsx(code)
        
        # specific fix for <style> tags in JSX: must use dangerouslySetInnerHTML
        def style_tag_replacer(m):
            style_content = m.group(1)
            # escape backticks and interpolation
            escaped = style_content.replace('`', '\\`').replace('$', '\\$')
            return f"<style dangerouslySetInnerHTML={{{{ __html: `{escaped}` }}}} />"
        jsx = re.sub(r'<style>(.*?)</style>', style_tag_replacer, jsx, flags=re.DOTALL)
        
        # removing <script> tags since we'll put them in a useEffect in page.tsx
        jsx = re.sub(r'<script.*?>.*?</script>', '', jsx, flags=re.DOTALL)
        
        with open(f"src/app/components/{k}.tsx", "w") as f:
            f.write("import React from 'react';\n\n")
            f.write(f"export default function {k}() {{\n")
            f.write("  return (\n    <>\n")
            f.write("      " + jsx.replace("\n", "\n      ") + "\n")
            f.write("    </>\n  );\n}\n")
        print(f"Wrote {k}.tsx")

