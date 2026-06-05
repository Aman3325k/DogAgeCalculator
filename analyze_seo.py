import os, re

pages_dir = 'E:/Desktop/dogbreedage.com/fumbling-force/src/pages'
layouts_dir = 'E:/Desktop/dogbreedage.com/fumbling-force/src/layouts'
components_dir = 'E:/Desktop/dogbreedage.com/fumbling-force/src/components'

print("--- SEO ANALYSIS ---")
for root, _, files in os.walk(pages_dir):
    for file in files:
        if file.endswith('.astro'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find title
            title_match = re.search(r'title\s*=\s*["\']([^"\']+)["\']', content)
            title = title_match.group(1) if title_match else "NO_TITLE"
            
            # Find description
            desc_match = re.search(r'description\s*=\s*["\']([^"\']+)["\']', content)
            desc = desc_match.group(1) if desc_match else "NO_DESC"
            
            # Find images
            imgs = re.findall(r'<img[^>]*>', content)
            
            print(f"{file}:")
            print(f"  TITLE: {title}")
            print(f"  DESC: {desc} (Length: {len(desc)})")
            for img in imgs:
                print(f"  IMG: {img}")

print("--- LAYOUT ANALYSIS ---")
for root, _, files in os.walk(layouts_dir):
    for file in files:
        if file.endswith('.astro'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            canonical = re.search(r'<link\s+rel="canonical".*?>', content)
            print(f"{file} Canonical: {canonical.group(0) if canonical else 'NONE'}")
