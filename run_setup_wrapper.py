#!/usr/bin/env python3
import subprocess
import sys

result = subprocess.run([sys.executable, 'setup_dirs.py'], cwd=r'C:\Users\GRACE\Downloads\uviolet')
sys.exit(result.returncode)
