const { execSync } = require('child_process');
const path = require('path');

// Create zip excluding node_modules and .next
const sourceDir = process.cwd();
const zipName = 'velora-id.zip';

try {
  // Use PowerShell Compress-Archive (works on Windows)
  const excludeDirs = ['node_modules', '.next', '.git'];
  
  // Get all items except excluded
  const cmd = `powershell -Command "Get-ChildItem -Path '${sourceDir}' -Exclude ${excludeDirs.map(d => `'${d}'`).join(',')} | Compress-Archive -DestinationPath '${path.join(sourceDir, '..', zipName)}' -Force"`;
  
  execSync(cmd, { stdio: 'inherit' });
  console.log(`✓ Created ${zipName} in parent directory`);
} catch (err) {
  console.error('PowerShell method failed, trying tar...');
  try {
    // Fallback to tar (available on Windows 10+)
    const cmd = `tar -caf "../velora-id.zip" --exclude="node_modules" --exclude=".next" --exclude=".git" .`;
    execSync(cmd, { stdio: 'inherit', cwd: sourceDir });
    console.log('✓ Created velora-id.zip in parent directory');
  } catch (err2) {
    console.error('Failed to create zip:', err2.message);
  }
}
