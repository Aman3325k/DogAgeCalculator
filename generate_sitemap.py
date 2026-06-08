import os
from datetime import datetime

pages_dir = 'E:/Desktop/dogbreedage.com/fumbling-force/src/pages'
base_url = 'https://dogbreedage.com'
today = datetime.now().strftime('%Y-%m-%d')

urls = []

for root, _, files in os.walk(pages_dir):
    for file in files:
        if file.endswith('.astro') and file not in ['404.astro', '500.astro', 'widget.astro']:
            name = file[:-6] # remove .astro
            
            if name == 'index':
                path = ''
                priority = '1.0'
            elif name in ['compare', 'reverse-calculator', 'dog-birthday', 'dog-age-chart', 'puppy-weight-calculator', 'dog-chocolate-toxicity-calculator', 'dog-calorie-calculator', 'biological-age-quiz', 'embed-widget']:
                path = f'/{name}'
                priority = '0.9'
            elif name in ['about', 'contact', 'privacy-policy', 'terms-of-service']:
                path = f'/{name}'
                priority = '0.5'
            else:
                # Breed pages
                path = f'/{name}'
                priority = '0.8'
                
            urls.append(f'''  <url>
    <loc>{base_url}{path}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>{priority}</priority>
  </url>''')

xml_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>'''

with open('E:/Desktop/dogbreedage.com/fumbling-force/public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(xml_content)

print(f"Generated sitemap.xml with {len(urls)} URLs")
