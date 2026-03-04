#!/usr/bin/env node

/**
 * Example Utility Script
 * 
 * This is a template for utility scripts that the WAGE agent
 * can use during task execution.
 * 
 * Usage:
 *   node example.js [options]
 * 
 * Example:
 *   node example.js --help
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  encoding: 'utf-8',
  wageDir: path.join(process.cwd(), 'wage'),
  tempDir: path.join(process.cwd(), 'wage', 'temp'),
};

/**
 * Main function - Entry point
 */
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  if (args.includes('--info') || args.includes('-i')) {
    showInfo();
    return;
  }

  // Default action
  console.log('WAGE Example Script');
  console.log('-------------------');
  console.log('Run with --help for available options.');
}

/**
 * Display help information
 */
function showHelp() {
  console.log(`
WAGE Example Script - Utility Template

USAGE:
  node example.js [options]

OPTIONS:
  --help, -h     Show this help message
  --info, -i     Show WAGE directory information
  --check        Check if WAGE structure exists

EXAMPLES:
  node example.js --help
  node example.js --info
  node example.js --check
`);
}

/**
 * Show WAGE directory information
 */
function showInfo() {
  console.log('WAGE Directory Information');
  console.log('--------------------------');
  console.log(`Project Root: ${process.cwd()}`);
  console.log(`WAGE Dir: ${CONFIG.wageDir}`);
  console.log(`Temp Dir: ${CONFIG.tempDir}`);
  console.log('');

  // Check if directories exist
  const dirs = ['wage', 'wage/contexts', 'wage/scripts', 'wage/temp'];
  
  console.log('Directory Status:');
  dirs.forEach(dir => {
    const exists = fs.existsSync(path.join(process.cwd(), dir));
    const status = exists ? '✓' : '✗';
    console.log(`  ${status} ${dir}`);
  });
}

/**
 * Check WAGE structure
 */
function checkStructure() {
  const requiredDirs = [
    'wage',
    'wage/contexts',
    'wage/scripts',
    'wage/temp',
  ];

  let allExist = true;

  console.log('Checking WAGE Structure...');
  console.log('');

  requiredDirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    const exists = fs.existsSync(fullPath);
    
    if (exists) {
      console.log(`✓ ${dir}`);
    } else {
      console.log(`✗ ${dir} - MISSING`);
      allExist = false;
    }
  });

  console.log('');
  
  if (allExist) {
    console.log('All directories present.');
  } else {
    console.log('Some directories are missing.');
    console.log('Run: mkdir -p wage/contexts wage/scripts wage/temp');
  }

  return allExist;
}

// Run main function
main();
