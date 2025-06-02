import os

structure = """
backend/
│
├── main.py
├── routes/
│   └── analyze.py         
│
├── agents/
│   ├── data_fetcher.py
│   ├── financial_analyst.py
│   └── advisor.py
│
├── services/
│   └── gemini.py        
│
└── requirements.txt
"""

import re

def build_structure(structure_str, root='.'):
    lines = structure_str.strip().splitlines()
    current_path = []
    base_indent = None

    for line in lines:
        if not line.strip() or '─' not in line and '/' not in line and '.' not in line:
            continue  # Skip non-structural lines

        # Determine indentation level
        indent = len(line) - len(line.lstrip(' │'))
        if base_indent is None:
            base_indent = indent

        # Normalize path depth
        level = (indent - base_indent) // 4

        # Extract path and comment
        match = re.search(r'[├└]── (.+?)(?:\s+#.*)?$', line)
        if not match:
            continue
        item = match.group(1).strip()

        # If it's a directory (ends with '/')
        if item.endswith('/'):
            current_path = current_path[:level] + [item.rstrip('/')]
            dir_path = os.path.join(root, *current_path)
            os.makedirs(dir_path, exist_ok=True)
        else:
            file_path = os.path.join(root, *current_path[:level], item)
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, 'w') as f:
                f.write('')  # Create empty file

if __name__ == "__main__":
    build_structure(structure)
    print("Project structure created.")
