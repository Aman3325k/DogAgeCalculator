import os, re

pages_dir = 'E:/Desktop/dogbreedage.com/fumbling-force/src/pages'

for root, _, files in os.walk(pages_dir):
    for file in files:
        if file.endswith('.astro'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Fix spacing
            content = re.sub(r'\b(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-x|space-y)-3\b', r'\1-4', content)
            content = re.sub(r'\b(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-x|space-y)-5\b', r'\1-6', content)
            content = re.sub(r'\b(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-x|space-y)-7\b', r'\1-8', content)
            content = re.sub(r'\b(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-x|space-y)-9\b', r'\1-8', content)
            content = re.sub(r'\b(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-x|space-y)-11\b', r'\1-12', content)
            content = re.sub(r'\bp-3\.5\b', 'p-4', content)
            
            # Add dateModified to FAQPage if not present
            if '"@type": "FAQPage"' in content and '"dateModified"' not in content:
                content = re.sub(r'("@type":\s*"FAQPage",\s*"mainEntity":\s*\[)', r'"dateModified": new Date().toISOString().split(\'T\')[0],\n  \1', content)
                
            # Update descriptions
            if '-age-calculator' in file:
                breed = file.replace('-age-calculator.astro', '').replace('-', ' ').title()
                desc = f"Calculate your {breed}'s age in human years with our highly accurate, breed-size based scientific formula. Fast, free, and no login required."
                content = re.sub(r'description\s*=\s*([\'"]).*?\1', f'description="{desc}"', content, count=1, flags=re.DOTALL)
            elif file == 'index.astro':
                desc = "The most accurate dog age calculator using breed-size scientific formulas. Convert your dog's age to human years instantly. Free and easy to use."
                content = re.sub(r'description\s*=\s*([\'"]).*?\1', f'description="{desc}"', content, count=1, flags=re.DOTALL)
            elif file == 'compare.astro':
                desc = "Compare two dogs' ages in human years side-by-side using our breed-size accurate calculator. See how different breeds age biologically. Free to use."
                content = re.sub(r'description\s*=\s*([\'"]).*?\1', f'description="{desc}"', content, count=1, flags=re.DOTALL)
            elif file == 'dog-age-chart.astro':
                desc = "Complete dog age chart: accurately convert dog years to human years by breed size. Small, medium, large, and giant breed age conversion tables included."
                content = re.sub(r'description\s*=\s*([\'"]).*?\1', f'description="{desc}"', content, count=1, flags=re.DOTALL)
            elif file == 'reverse-calculator.astro':
                desc = "Enter a human age and find out exactly how old a dog would be at that life stage. Reverse dog age calculator works for all breed sizes. Fast and free."
                content = re.sub(r'description\s*=\s*([\'"]).*?\1', f'description="{desc}"', content, count=1, flags=re.DOTALL)
            elif file == 'dog-birthday.astro':
                desc = "Find out exactly how many days until your dog's next birthday or half-birthday. Count down the days to celebrate your dog's milestones accurately."
                content = re.sub(r'description\s*=\s*([\'"]).*?\1', f'description="{desc}"', content, count=1, flags=re.DOTALL)
            elif file == 'about.astro':
                desc = "Learn about DOGBREEDAGE: the most accurate, science-based dog age calculator by breed size. We use DNA methylation formulas to provide exact conversions."
                content = re.sub(r'description\s*=\s*([\'"]).*?\1', f'description="{desc}"', content, count=1, flags=re.DOTALL)
            elif file == 'contact.astro':
                desc = "Contact DOGBREEDAGE today. Get in touch with our team regarding questions, feedback, or suggestions about our breed-based dog age calculator."
                content = re.sub(r'description\s*=\s*([\'"]).*?\1', f'description="{desc}"', content, count=1, flags=re.DOTALL)
            elif file == '404.astro':
                desc = "Page not found. Use our scientifically-accurate dog age calculator to convert your dog's age to human years based on their breed size."
                content = re.sub(r'description\s*=\s*([\'"]).*?\1', f'description="{desc}"', content, count=1, flags=re.DOTALL)
            elif file == '500.astro':
                desc = "Internal server error. Please return to the homepage to use our highly accurate dog age calculator based on breed size."
                content = re.sub(r'description\s*=\s*([\'"]).*?\1', f'description="{desc}"', content, count=1, flags=re.DOTALL)
            elif file == 'privacy-policy.astro':
                desc = "Read the Privacy Policy for DOGBREEDAGE. We respect your privacy and do not collect personal data when you use our dog age calculators."
                content = re.sub(r'description\s*=\s*([\'"]).*?\1', f'description="{desc}"', content, count=1, flags=re.DOTALL)
            elif file == 'terms-of-service.astro':
                desc = "Read the Terms of Service for DOGBREEDAGE. By using our website and accurate dog age calculators, you agree to these standard terms."
                content = re.sub(r'description\s*=\s*([\'"]).*?\1', f'description="{desc}"', content, count=1, flags=re.DOTALL)
                
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
                
print('Done!')
