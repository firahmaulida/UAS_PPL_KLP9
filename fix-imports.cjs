const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      if (content.includes('<NotificationBell />') && !content.includes('import NotificationBell')) {
          const importMatch = content.match(/import .* from .*;/g);
          if (importMatch && importMatch.length > 0) {
              const lastImport = importMatch[importMatch.length - 1];
              const level = fullPath.includes('admin/') || fullPath.includes('user/') ? '../../' : '../';
              content = content.replace(lastImport, `${lastImport}\nimport NotificationBell from "${level}components/NotificationBell";`);
              fs.writeFileSync(fullPath, content, 'utf8');
              console.log('Fixed import in:', fullPath);
          }
      }
    }
  }
}

processDir(pagesDir);
console.log("Done fixing imports.");
