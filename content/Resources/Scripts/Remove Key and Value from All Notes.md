---
title: Remove Key and Value from All Notes
type: Tech
aliases: []
tags:
  - Tech
  - Scripts
  - Python
linter-yaml-title-alias: Change the Name of a Tag
date_created: Monday, June 30th 2025, 9:18:17 pm
date_modified: Saturday, July 5th 2025, 11:33:34 pm
---

# Remove Key and Value from All Notes

```
import os
import re

def remove_keys_from_yaml(folder_path, keys_to_remove):
    yaml_block_pattern = re.compile(r"^---\n(.*?)\n---", re.DOTALL)

    for dirpath, _, filenames in os.walk(folder_path):
        for filename in filenames:
            if filename.endswith(".md"):
                file_path = os.path.join(dirpath, filename)

                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    # Extract YAML block
                    match = yaml_block_pattern.search(content)
                    if not match:
                        continue  # No YAML frontmatter

                    yaml_block = match.group(1)
                    for key in keys_to_remove:
                        # Remove key + value (handles inline or multiline)
                        yaml_block = re.sub(rf"^{key}:[^\n]*(\n|$)", "", yaml_block, flags=re.MULTILINE)

                    # Rebuild full content
                    new_content = f"---\n{yaml_block.strip()}\n---" + content[match.end():]

                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)

                    print(f"✅ Cleaned: {file_path}")

                except Exception as e:
                    print(f"❌ Error processing {file_path}: {e}")

# 🔧 Change this to your actual vault path
folder_path = ('/Users/jonathantornberg/Library/Mobile Documents/iCloud~md~obsidian/Documents/JT\'s Vault')
remove_keys_from_yaml(folder_path, keys_to_remove=["created", "updated"])
```

