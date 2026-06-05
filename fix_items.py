import os
import glob
import json

pages_dir = r"E:\Desktop\dogbreedage.com\fumbling-force\src\pages"
files = glob.glob(os.path.join(pages_dir, "*-age-calculator.astro"))
removed_count = 0
changed_files = 0

target_line = "import FAQ from '../components/FAQ.astro';"

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = []
    changed = False
    for line in lines:
        if target_line in line:
            changed = True
            removed_count += 1
        else:
            new_lines.append(line)
            
    if changed:
        with open(file, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        changed_files += 1

pkg_path = r"E:\Desktop\dogbreedage.com\fumbling-force\package.json"
with open(pkg_path, 'r', encoding='utf-8') as f:
    pkg = json.load(f)

removed_deps = []
if "html2canvas" in pkg.get("dependencies", {}):
    del pkg["dependencies"]["html2canvas"]
    removed_deps.append("html2canvas")
if "@astrojs/sitemap" in pkg.get("dependencies", {}):
    del pkg["dependencies"]["@astrojs/sitemap"]
    removed_deps.append("@astrojs/sitemap")

if removed_deps:
    with open(pkg_path, 'w', encoding='utf-8') as f:
        json.dump(pkg, f, indent=2)

print(f"Changed {changed_files} files, removed {removed_count} lines.")
print(f"Removed deps: {removed_deps}")
