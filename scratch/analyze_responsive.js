const fs = require('fs');

const files = [
  'index.html',
  'home2.html',
  'about.html',
  'shop.html',
  'product-details.html',
  'equipment.html',
  'gallery.html',
  'pricing.html',
  'blog.html',
  'contact.html',
  'orders.html'
];

console.log("Analyzing 11 HTML files for responsive breakpoints and card alignment...");

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  
  // 1. Check for fixed widths that can break 360px
  const fixedWidths = html.match(/(?:w-\[\d+px\]|min-w-\[\d+px\])/g) || [];
  
  // 2. Check for grids with md:grid-cols-3 or md:grid-cols-4 that cram at 768px
  const mdGrids = html.match(/grid[^"]*md:grid-cols-(?:3|4)[^"]*/g) || [];

  // 3. Check for stat-counter or 3-column stats on mobile
  const statRows = html.match(/grid-cols-3[^"]*/g) || [];

  console.log(`\n--- ${file} ---`);
  if (fixedWidths.length) console.log('  Fixed widths:', [...new Set(fixedWidths)]);
  if (mdGrids.length) console.log('  md:grid-cols-3/4 count:', mdGrids.length);
  if (statRows.length) console.log('  grid-cols-3 count:', statRows.length);
});
