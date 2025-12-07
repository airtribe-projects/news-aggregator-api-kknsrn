#!/usr/bin/env node

/**
 * Startup Validation Script
 * Checks all dependencies and configurations before starting the server
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n📋 Checking Project Setup...\n');

// Check 1: Node version
console.log('✓ Node version:', process.version);

// Check 2: Required files
const requiredFiles = [
    '.env',
    'package.json',
    'app.js',
    'config/database.js',
    'src/models/User.js',
    'src/models/Article.js'
];

console.log('\n📁 Checking required files:');
let fileMissing = false;
requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`  ✓ ${file}`);
    } else {
        console.log(`  ✗ ${file} - MISSING`);
        fileMissing = true;
    }
});

// Check 3: Environment variables
console.log('\n⚙️  Checking environment variables:');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = ['PORT', 'MONGODB_URI', 'JWT_SECRET', 'NODE_ENV'];

    envVars.forEach(varName => {
        if (envContent.includes(varName)) {
            console.log(`  ✓ ${varName} defined`);
        } else {
            console.log(`  ⚠ ${varName} not defined`);
        }
    });

    // Check for API keys
    console.log('\n🔑 News API Keys (optional but needed for news endpoints):');
    if (envContent.includes('NEWSAPI_KEY=') && !envContent.includes('NEWSAPI_KEY=your_')) {
        console.log('  ✓ NewsAPI key configured');
    } else {
        console.log('  ⚠ NewsAPI key not configured');
    }

    if (envContent.includes('GNEWS_API_KEY=') && !envContent.includes('GNEWS_API_KEY=your_')) {
        console.log('  ✓ GNews API key configured');
    } else {
        console.log('  ⚠ GNews API key not configured');
    }
} else {
    console.log('  ✗ .env file not found');
}

// Check 4: Dependencies
console.log('\n📦 Checking npm dependencies:');
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const requiredDeps = ['express', 'bcrypt', 'jsonwebtoken', 'mongoose', 'axios', 'dotenv'];

requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
        console.log(`  ✓ ${dep} installed`);
    } else {
        console.log(`  ✗ ${dep} NOT installed`);
        fileMissing = true;
    }
});

// Check 5: node_modules
console.log('\n📚 Checking node_modules:');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
    const moduleCount = fs.readdirSync(nodeModulesPath).length;
    console.log(`  ✓ node_modules exists (${moduleCount} packages)`);
} else {
    console.log('  ✗ node_modules not found - Run: npm install');
    fileMissing = true;
}

// Final summary
console.log('\n' + '='.repeat(50));
if (!fileMissing) {
    console.log('✅ All checks passed! Ready to start the server.\n');
    console.log('Run: npm start   (production)');
    console.log('Run: npm run dev (development with auto-reload)\n');
    console.log('Then visit: http://localhost:5000/api/health');
    process.exit(0);
} else {
    console.log('⚠️  Some issues found. Please review above.\n');
    console.log('Quick fixes:');
    console.log('1. npm install           (install dependencies)');
    console.log('2. cp .env.example .env  (create .env file)');
    console.log('3. Edit .env with your API keys and MongoDB URI\n');
    process.exit(1);
}
