---
title: Change the Name of a Tag
type: Tech
aliases: []
tags:
  - Tech
  - Scripts
  - Python
linter-yaml-title-alias: Change the Name of a Tag
date_created: Monday, June 30th 2025, 9:18:17 pm
date_modified: Saturday, July 5th 2025, 11:33:30 pm
---

# Change the Name of a Tag

```
import os
import re

def update_yaml_keys_in_md(folder_path):
    pattern = re.compile(r'^period\(s\):(.*)', re.MULTILINE)

    for dirpath, _, filenames in os.walk(folder_path):
        for filename in filenames:
            if filename.endswith('.md'):
                file_path = os.path.join(dirpath, filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    if 'period(s):' in content:
                        updated_content = pattern.sub(r'periods:\1', content)
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(updated_content)
                        print(f"✅ Updated: {file_path}")
                except Exception as e:
                    print(f"❌ Error with {file_path}: {e}")

# Replace with the path to your Obsidian vault or any folder of markdown files
update_yaml_keys_in_md('/Users/jonathantornberg/Library/Mobile Documents/iCloud~md~obsidian/Documents/JT\'s Vault')
```

