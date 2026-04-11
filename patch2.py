with open("src/app/components/CTA.tsx", "r") as f:
    text = f.read()

# Fix the invalid CSS class issue
text = text.replace("group\\\\/text:hover", "rebel-hover-zone:hover")
text = text.replace("group/text", "rebel-hover-zone")
text = text.replace("JOIN<", "JOIN&nbsp;<")

with open("src/app/components/CTA.tsx", "w") as f:
    f.write(text)
    
print("Replaced!")
