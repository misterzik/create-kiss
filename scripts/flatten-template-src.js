const fs = require('fs');
const path = require('path');

const outerSrc = path.resolve(__dirname, '..', 'template', 'src');
const nestedSrc = path.join(outerSrc, 'src');

if (!fs.existsSync(outerSrc)) {
  console.error('Template src folder missing.');
  process.exit(1);
}

if (!fs.existsSync(nestedSrc)) {
  console.log('No nested src folder detected. Nothing to do.');
  process.exit(0);
}

for (const entry of fs.readdirSync(nestedSrc)) {
  const from = path.join(nestedSrc, entry);
  const to = path.join(outerSrc, entry);
  fs.renameSync(from, to);
}

fs.rmSync(nestedSrc, { recursive: true, force: true });
console.log('Flattened template/src directory.');
