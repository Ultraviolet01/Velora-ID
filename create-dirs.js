const fs = require('fs');
const path = require('path');

const directories = [
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
];

let successCount = 0;
let failureCount = 0;

directories.forEach(dir => {
    try {
        fs.mkdirSync(dir, { recursive: true });
        successCount++;
    } catch (err) {
        console.error(`Failed to create: ${dir} - ${err.message}`);
        failureCount++;
    }
});

console.log(`✓ Successfully created ${successCount} directories`);
if (failureCount > 0) {
    console.log(`✗ Failed to create ${failureCount} directories`);
}
