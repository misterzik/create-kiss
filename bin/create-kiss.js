#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const templateDir = path.resolve(__dirname, '..', 'template');

const args = process.argv.slice(2);
const rawProjectName = args[0] || 'kiss-app';
const targetDir = path.resolve(process.cwd(), rawProjectName);

const formatPackageName = (name) => name
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9-_.]/g, '-')
  .replace(/-{2,}/g, '-')
  .replace(/^-+|-+$/g, '')
  || 'kiss-app';

const ensureDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return;
  }

  const contents = fs.readdirSync(dir);
  if (contents.length > 0) {
    throw new Error(`Target directory "${dir}" already exists and is not empty.`);
  }
};

const copyTemplate = (destination) => {
  if (!fs.existsSync(templateDir)) {
    throw new Error('Template directory is missing from the package.');
  }
  fs.cpSync(templateDir, destination, { recursive: true });
};

const flattenNestedSrc = (destination) => {
  const outerSrc = path.join(destination, 'src');
  const nestedSrc = path.join(outerSrc, 'src');

  if (!fs.existsSync(nestedSrc)) {
    return;
  }

  for (const entry of fs.readdirSync(nestedSrc)) {
    const from = path.join(nestedSrc, entry);
    const to = path.join(outerSrc, entry);
    fs.renameSync(from, to);
  }

  fs.rmSync(nestedSrc, { recursive: true, force: true });
};

const updatePackageJson = (destination, finalName) => {
  const pkgPath = path.join(destination, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.name = finalName;
  pkg.version = '0.1.0';

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
};

const main = () => {
  try {
    ensureDirectory(targetDir);
    copyTemplate(targetDir);
    flattenNestedSrc(targetDir);

    const pkgName = formatPackageName(rawProjectName);
    updatePackageJson(targetDir, pkgName);

    console.log(`\nSuccess! Created ${pkgName} at ${targetDir}`);
    console.log('\nNext steps:');
    console.log(`  cd ${rawProjectName}`);
    console.log('  npm install');
    console.log('  npm run start');
    console.log('\nHappy building!');
  } catch (error) {
    console.error(`\nError: ${error.message}`);
    process.exit(1);
  }
};

main();
