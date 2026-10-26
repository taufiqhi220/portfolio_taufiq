const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');

// Clean and recreate dist
fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

// Copy build assets (CSS, JS, manifest)
const publicBuild = path.join(publicDir, 'build');
const distBuild = path.join(distDir, 'build');
if (fs.existsSync(publicBuild)) {
    fs.cpSync(publicBuild, distBuild, { recursive: true });
}

// Copy favicon and robots if they exist
for (const file of ['favicon.ico', 'robots.txt']) {
    const src = path.join(publicDir, file);
    const dest = path.join(distDir, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
    }
}

console.log('[prepare-dist] Static assets prepared successfully in dist/');
