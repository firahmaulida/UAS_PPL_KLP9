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
      let changed = false;

      // Hapus state dan ref lama
      if (content.includes('const [showNotif, setShowNotif] = useState(false);')) {
        content = content.replace(/const \[showNotif, setShowNotif\] = useState\(false\);\n?/g, '');
        changed = true;
      }
      if (content.includes('const notifRef = useRef(null);')) {
        content = content.replace(/const notifRef = useRef\(null\);\n?/g, '');
        changed = true;
      }

      // Hapus useEffect handleClickOutside
      const useEffectRegex = /useEffect\(\(\) => \{\s*const handleClickOutside = \(e\) => \{\s*if \(notifRef\.current && !notifRef\.current\.contains\(e\.target\)\) \{\s*setShowNotif\(false\);\s*\}\s*\};\s*document\.addEventListener\("mousedown", handleClickOutside\);\s*return \(\) => document\.removeEventListener\("mousedown", handleClickOutside\);\s*\}, \[\]\);\n?/g;
      if (useEffectRegex.test(content)) {
         content = content.replace(useEffectRegex, '');
         changed = true;
      }

      // Replace manual button with NotificationBell
      const buttonRegex = /<button\s*onClick=\{[^}]*setShowNotif[^}]*\}\s*className="[^"]*bg-\[#f8bc22\][^"]*"\s*>\s*<Bell[^>]*\/>\s*<\/button>\s*\{showNotif && <NotifDropdown \/>\}/g;
      if (buttonRegex.test(content)) {
         content = content.replace(buttonRegex, '<NotificationBell />');
         changed = true;
      }

      // Juga yang belum ada NotifDropdown
      const buttonOnlyRegex = /<button\s*className="[^"]*bg-\[#f8bc22\][^"]*"\s*>\s*<Bell[^>]*\/>\s*<\/button>/g;
      if (buttonOnlyRegex.test(content)) {
         content = content.replace(buttonOnlyRegex, '<NotificationBell />');
         changed = true;
      }
      
      // Khusus untuk yang dibungkus <div className="relative" ref={notifRef}> ... </div>
      const relativeDivRegex = /<div className="relative" ref=\{notifRef\}>\s*<NotificationBell \/>\s*<\/div>/g;
      if (relativeDivRegex.test(content)) {
         content = content.replace(relativeDivRegex, '<NotificationBell />');
         changed = true;
      }

      if (changed) {
         // Tambahkan import jika belum ada
         if (!content.includes('NotificationBell')) {
             // Cari baris import terakhir atau pertama
             const importMatch = content.match(/import .* from .*;/g);
             if (importMatch && importMatch.length > 0) {
                 const lastImport = importMatch[importMatch.length - 1];
                 const level = fullPath.includes('admin/') || fullPath.includes('user/') ? '../../' : '../';
                 content = content.replace(lastImport, `${lastImport}\nimport NotificationBell from "${level}components/NotificationBell";`);
             }
         }
         fs.writeFileSync(fullPath, content, 'utf8');
         console.log('Patched:', fullPath);
      }
    }
  }
}

processDir(pagesDir);
console.log("Done patching.");
