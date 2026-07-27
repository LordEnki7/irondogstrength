#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const BUNDLE_SIZE_LIMIT = 600; // KB - Set warning threshold
const CRITICAL_LIMIT = 800; // KB - Set critical threshold

function getBundleSize() {
  const distPath = path.join(process.cwd(), 'dist/public/assets');
  
  if (!fs.existsSync(distPath)) {
    console.log('❌ Build assets not found. Run "npm run build" first.');
    return null;
  }

  const files = fs.readdirSync(distPath);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  
  if (jsFiles.length === 0) {
    console.log('❌ No JavaScript bundles found in dist/public/assets');
    return null;
  }

  // Find the largest bundle (main bundle)
  const bundleStats = jsFiles.map(file => ({
    name: file,
    size: fs.statSync(path.join(distPath, file)).size
  })).sort((a, b) => b.size - a.size);
  
  const mainBundle = bundleStats[0]?.name || jsFiles[0];
  const bundlePath = path.join(distPath, mainBundle);
  const stats = fs.statSync(bundlePath);
  const sizeKB = Math.round(stats.size / 1024);

  return { filename: mainBundle, sizeKB };
}

function logBundleSize(bundleInfo) {
  if (!bundleInfo) return;

  const { filename, sizeKB } = bundleInfo;
  
  console.log('\n📊 Bundle Size Report');
  console.log('━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📦 File: ${filename}`);
  console.log(`📏 Size: ${sizeKB} KB`);
  
  if (sizeKB > CRITICAL_LIMIT) {
    console.log('🚨 CRITICAL: Bundle size exceeds 800 KB!');
    console.log('   Consider removing heavy dependencies or implementing code splitting.');
    process.exit(1);
  } else if (sizeKB > BUNDLE_SIZE_LIMIT) {
    console.log('⚠️  WARNING: Bundle size exceeds 600 KB');
    console.log('   Monitor for potential deployment issues.');
  } else {
    console.log('✅ Bundle size is within acceptable limits');
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━\n');
}

function saveBundleHistory(bundleInfo) {
  if (!bundleInfo) return;

  const historyPath = path.join(process.cwd(), 'bundle-history.json');
  let history = [];
  
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    } catch (e) {
      history = [];
    }
  }

  const entry = {
    timestamp: new Date().toISOString(),
    filename: bundleInfo.filename,
    sizeKB: bundleInfo.sizeKB,
    date: new Date().toLocaleDateString()
  };

  history.push(entry);
  
  // Keep only last 50 entries
  if (history.length > 50) {
    history = history.slice(-50);
  }

  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
}

// Main execution
const bundleInfo = getBundleSize();
if (bundleInfo) {
  logBundleSize(bundleInfo);
  saveBundleHistory(bundleInfo);
}