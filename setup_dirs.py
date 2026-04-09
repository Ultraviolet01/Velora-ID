import os
from pathlib import Path

# Change to the target directory
os.chdir(r'c:\Users\GRACE\Downloads\uviolet')

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

success_count = 0
fail_count = 0

for dir_path in directories:
    try:
        Path(dir_path).mkdir(parents=True, exist_ok=True)
        success_count += 1
    except Exception as e:
        print(f'Failed to create: {dir_path} - {e}')
        fail_count += 1

print(f'✓ Successfully created {success_count} directories')
if fail_count > 0:
    print(f'✗ Failed to create {fail_count} directories')
else:
    print('All directories created successfully!')
