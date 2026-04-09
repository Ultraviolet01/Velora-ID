#!/usr/bin/env python3
"""Create Next.js directory structure"""

import os
import sys
from pathlib import Path

# Get the script's directory (should be uviolet project root)
base_path = Path(__file__).parent.absolute()

# List of directories to create
directories = [
    'src/app',
    'src/app/(marketing)',
    'src/app/(app)',
    'src/app/(app)/dashboard',
    'src/app/(app)/onboarding',
    'src/app/(app)/creator',
    'src/app/(app)/merchant',
    'src/app/(app)/defi',
    'src/app/(app)/proof-vault',
    'src/app/(app)/verifier',
    'src/app/docs',
    'src/app/api',
    'src/components/ui',
    'src/components/layout',
    'src/components/onboarding',
    'src/components/dashboard',
    'src/components/proof',
    'src/components/eligibility',
    'src/components/ai',
    'src/lib',
    'src/services',
    'src/hooks',
    'src/types',
    'src/config',
    'src/data'
]

created_count = 0
failed_dirs = []

print(f'Creating directories in: {base_path}\n')

for dir_path in directories:
    full_path = base_path / dir_path
    try:
        full_path.mkdir(parents=True, exist_ok=True)
        created_count += 1
        print(f'✓ {dir_path}')
    except Exception as e:
        failed_dirs.append((dir_path, str(e)))
        print(f'✗ {dir_path}: {e}')

print(f'\n=== Summary ===')
print(f'Successfully created: {created_count}/{len(directories)} directories')

if failed_dirs:
    print(f'\nFailed directories:')
    for dir_path, error in failed_dirs:
        print(f'  ✗ {dir_path}: {error}')
    sys.exit(1)
else:
    print(f'All directories created successfully!')
    sys.exit(0)
