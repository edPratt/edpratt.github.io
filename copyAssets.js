const fs = require('fs');
const path = require('path');

const CNAME = 'CNAME';
const buildDir = path.join(__dirname, 'build');

if (!fs.existsSync(buildDir)) {
  console.error('Build directory does not exist. Run `npm run build` first.');
  process.exit(1);
}

fs.copyFileSync(path.join(__dirname, CNAME), path.join(buildDir, CNAME));
console.log('CNAME file copied to build directory.');
