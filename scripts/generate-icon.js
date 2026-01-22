const fs = require('fs');
const { createCanvas } = require('canvas');

const size = 512;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#1a1a1a';
ctx.fillRect(0, 0, size, size);

ctx.fillStyle = '#ffffff';
ctx.font = 'bold 280px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('PX', size / 2, size / 2);

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./public/icon.png', buffer);
console.log('Icon generated successfully!');
