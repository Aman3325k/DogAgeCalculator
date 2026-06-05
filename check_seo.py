import os, re

pages_dir = 'E:/Desktop/dogbreedage.com/fumbling-force/src/pages'
h1_tags = {}
links = []
absolute_internal_links = []
noindex_pages = []

for root, _, files in os.walk(pages_dir):
    for file in files:
        if file.endswith('.astro'):
            with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                content = f.read()
                
                # Check for h1
                h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
                if h1_match:
                    h1_clean = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip()
                    h1_tags[file] = ' '.join(h1_clean.split())
                else:
                    h1_tags[file] = 'MISSING'
                
                # Extract links
                page_links = re.findall(r'href=[\'\"]([^\'\"]+)[\'\"]', content)
                for link in page_links:
                    if 'dogbreedage.com' in link and not link.startswith('http') and not link.startswith('//'):
                        pass # probably good
                    if link.startswith('https://dogbreedage.com') and not 'sitemap' in link:
                        absolute_internal_links.append((file, link))
                links.extend(page_links)
                
                # Check for noindex
                if 'noindex' in content and 'BaseLayout' not in content: # naive check
                    pass

print("--- H1 Tags ---")
for f, h1 in h1_tags.items():
    print(f"{f}: {h1}")

print("\n--- Absolute Internal Links ---")
for f, link in absolute_internal_links:
    print(f"{f}: {link}")

# verify all 18 breed pages are linked
breed_pages = [f for f in files if f.endswith('-age-calculator.astro') and f != 'reverse-calculator.astro']
unlinked = []
for bp in breed_pages:
    bp_route = '/' + bp.replace('.astro', '')
    found = any(bp_route in l for l in links)
    if not found:
        unlinked.append(bp)
print(f"\nUnlinked Breed Pages: {unlinked}")
