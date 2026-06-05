import os

pages_dir = 'E:/Desktop/dogbreedage.com/fumbling-force/src/pages'

for root, _, files in os.walk(pages_dir):
    for file in files:
        if file.endswith('.astro'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            if r"split(\'T\')" in content:
                content = content.replace(r"split(\'T\')", "split('T')")
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
print("Fixed split syntax")
