const fs = require('fs');
const path = require('path');

const workspace = path.resolve(__dirname, '..');
const exts = ['.ts', '.tsx', '.js', '.jsx'];

let changed = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      walk(fullPath);
    } else if (entry.isFile()) {
      if (exts.includes(path.extname(entry.name))) {
        processFile(fullPath);
      }
    }
  }
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updated = content
    .replace(/from \"framer-motion\"/g, 'from "motion/react"')
    .replace(/from \'framer-motion\'/g, 'from \'motion/react\'');

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    changed++;
  }
}

walk(workspace);
console.log(`Updated ${changed} files.`);
