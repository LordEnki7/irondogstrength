#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🚀 Starting bundle optimization checks...\n');

// Check for large files that shouldn't be bundled
function checkAttachedAssets() {
  const assetsPath = path.join(process.cwd(), 'attached_assets');
  
  if (!fs.existsSync(assetsPath)) {
    console.log('✅ No attached_assets directory found');
    return;
  }

  const files = fs.readdirSync(assetsPath);
  const largeFiles = [];
  
  files.forEach(file => {
    const filePath = path.join(assetsPath, file);
    const stats = fs.statSync(filePath);
    const sizeMB = stats.size / (1024 * 1024);
    
    if (sizeMB > 1) { // Files larger than 1MB
      largeFiles.push({ file, sizeMB: sizeMB.toFixed(2) });
    }
  });

  if (largeFiles.length > 0) {
    console.log('⚠️  Large files detected in attached_assets:');
    largeFiles.forEach(({ file, sizeMB }) => {
      console.log(`   📁 ${file}: ${sizeMB} MB`);
    });
    console.log('   💡 These should be served statically, not bundled\n');
  } else {
    console.log('✅ No large files found in attached_assets\n');
  }
}

// Check current bundle size
function checkBundleSize() {
  const distPath = path.join(process.cwd(), 'dist/public/assets');
  
  if (!fs.existsSync(distPath)) {
    console.log('📦 No build found. Run "npm run build" to check bundle size.');
    return null;
  }

  const files = fs.readdirSync(distPath);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  
  if (jsFiles.length === 0) {
    console.log('❌ No JavaScript bundles found');
    return null;
  }

  let totalSize = 0;
  const bundles = [];

  jsFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);
    totalSize += sizeKB;
    bundles.push({ file, sizeKB });
  });

  console.log('📊 Current Bundle Analysis:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  bundles.forEach(({ file, sizeKB }) => {
    const status = sizeKB > 500 ? '🚨' : sizeKB > 300 ? '⚠️ ' : '✅';
    console.log(`${status} ${file}: ${sizeKB} KB`);
  });
  
  console.log(`\n📈 Total Bundle Size: ${totalSize} KB`);
  
  if (totalSize > 800) {
    console.log('🚨 CRITICAL: Bundle too large for deployment!');
    console.log('   Recommended: Split code or remove dependencies');
  } else if (totalSize > 500) {
    console.log('⚠️  WARNING: Approaching deployment limits');
    console.log('   Recommended: Monitor and optimize');
  } else {
    console.log('✅ Bundle size is optimal for deployment');
  }
  
  return totalSize;
}

// Optimization recommendations
function showOptimizationTips() {
  console.log('\n💡 Bundle Optimization Tips:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('1. 📁 Move videos/PDFs to client/public/ (static serving)');
  console.log('2. 🔄 Use dynamic imports for heavy components');
  console.log('3. 🌳 Tree-shake unused imports');
  console.log('4. 📦 Code-split routes with React.lazy()');
  console.log('5. 🗜️  Remove unused dependencies');
}

// Main execution
checkAttachedAssets();
const bundleSize = checkBundleSize();
showOptimizationTips();

console.log('\n🎯 Bundle optimization check complete!');