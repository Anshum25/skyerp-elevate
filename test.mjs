import fs from 'fs';
const data = fs.readFileSync('public/logo.glb');
console.log('Size:', data.length);
console.log('Header:', data.slice(0, 4).toString());
