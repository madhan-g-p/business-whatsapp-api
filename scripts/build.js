#!/usr/bin/env node

/**
 * Comprehensive Build Orchestrator
 * Handles prebuild checks, TypeScript compilation, postbuild conversions, and verification
 * with automatic rollback on failure
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SCRIPT_DIR = path.resolve(__dirname);
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const DIST_BACKUP = path.join(PROJECT_ROOT, '.dist-backup');
const BUILD_LOG = path.join(PROJECT_ROOT, '.build.log');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
};

let buildSuccess = false;
let logMessages = [];

/**
 * Logging utilities
 */
const log = {
  info: (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    const line = `[${timestamp}] ${msg}`;
    logMessages.push(line);
    console.log(`${colors.blue}${line}${colors.reset}`);
  },
  success: (msg) => {
    const line = `✅ ${msg}`;
    logMessages.push(line);
    console.log(`${colors.green}${colors.bold}${line}${colors.reset}`);
  },
  error: (msg) => {
    const line = `❌ ${msg}`;
    logMessages.push(line);
    console.error(`${colors.red}${colors.bold}${line}${colors.reset}`);
  },
  warning: (msg) => {
    const line = `⚠️  ${msg}`;
    logMessages.push(line);
    console.log(`${colors.yellow}${colors.bold}${line}${colors.reset}`);
  },
};

/**
 * Execute command safely
 */
function runCommand(cmd, description, silent = false) {
  try {
    log.info(`Running: ${description}`);
    if (silent) {
      execSync(cmd, { cwd: PROJECT_ROOT, stdio: 'pipe' });
    } else {
      execSync(cmd, { cwd: PROJECT_ROOT, stdio: 'inherit' });
    }
    log.success(`${description} completed`);
    return true;
  } catch (error) {
    log.error(`${description} failed`);
    if (!silent) {
      console.error(error.message);
    }
    return false;
  }
}

/**
 * Backup dist directory
 */
function backupDist() {
  try {
    if (fs.existsSync(DIST_DIR)) {
      log.info('Backing up current dist directory...');
      if (fs.existsSync(DIST_BACKUP)) {
        fs.rmSync(DIST_BACKUP, { recursive: true, force: true });
      }
      fs.cpSync(DIST_DIR, DIST_BACKUP, { recursive: true });
      log.info('Backup created');
      return true;
    }
  } catch (error) {
    log.error(`Failed to backup dist: ${error.message}`);
    return false;
  }
}

/**
 * Restore dist from backup
 */
function restoreDist() {
  try {
    if (fs.existsSync(DIST_BACKUP)) {
      log.warning('Restoring previous build from backup...');
      if (fs.existsSync(DIST_DIR)) {
        fs.rmSync(DIST_DIR, { recursive: true, force: true });
      }
      fs.cpSync(DIST_BACKUP, DIST_DIR, { recursive: true });
      log.success('Previous build restored');
      return true;
    }
  } catch (error) {
    log.error(`Failed to restore dist: ${error.message}`);
    return false;
  }
}

/**
 * Save build log
 */
function saveBuildLog() {
  try {
    fs.writeFileSync(BUILD_LOG, logMessages.join('\n'), 'utf8');
  } catch (error) {
    console.error(`Failed to save build log: ${error.message}`);
  }
}

/**
 * Cleanup function
 */
function cleanup() {
  if (buildSuccess && fs.existsSync(DIST_BACKUP)) {
    try {
      fs.rmSync(DIST_BACKUP, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  }
  saveBuildLog();
}

/**
 * Main build process
 */
async function main() {
  process.on('exit', cleanup);
  process.on('SIGINT', () => {
    log.error('Build interrupted');
    process.exit(1);
  });

  log.info('='.repeat(60));
  log.info('Starting Automated Build Process');
  log.info('='.repeat(60));
  log.info('');

  try {
    // ====================================================================
    // PREBUILD PHASE
    // ====================================================================
    log.info('📋 PREBUILD PHASE: Checking lint and formatting...');

    if (!runCommand('npm run lint', 'ESLint check', true)) {
      log.error('ESLint check failed');
      throw new Error('Prebuild failed');
    }
    log.success('ESLint check passed');

    // Check prettier
    if (!runCommand('npm run prettier:check', 'Prettier check', true)) {
      log.warning('Prettier check failed - running auto-fix...');
      if (!runCommand('npm run prettier', 'Prettier auto-fix', true)) {
        log.error('Prettier auto-fix failed');
        throw new Error('Prebuild failed');
      }
      log.success('Prettier auto-fix completed - review and commit changes');
    } else {
      log.success('Prettier check passed');
    }

    // ====================================================================
    // BUILD PHASE
    // ====================================================================
    log.info('');
    log.info('🔨 BUILD PHASE: Compiling TypeScript...');

    backupDist();

    if (!runCommand('npm run build:only', 'TypeScript compilation', false)) {
      restoreDist();
      throw new Error('Build phase failed');
    }

    // ====================================================================
    // POSTBUILD PHASE
    // ====================================================================
    log.info('');
    log.info('🔧 POSTBUILD PHASE: Converting and fixing imports...');

    const scripts = [
      { file: 'convert-esm.cjs', desc: 'Convert ESM to .mjs' },
      { file: 'fix-esm-imports.cjs', desc: 'Fix ESM import paths' },
      { file: 'convert-cjs.cjs', desc: 'Convert CJS to .cjs' },
      { file: 'fix-cjs-requires.cjs', desc: 'Fix CJS require paths' },
    ];

    for (const script of scripts) {
      const scriptPath = path.join(SCRIPT_DIR, script.file);
      if (!runCommand(`node "${scriptPath}"`, script.desc, true)) {
        restoreDist();
        throw new Error('Postbuild phase failed');
      }
      log.success(`${script.desc} completed`);
    }

    // ====================================================================
    // VERIFICATION PHASE
    // ====================================================================
    log.info('');
    log.info('✔️  VERIFICATION PHASE: Testing built formats...');

    log.info('Testing CommonJS format...');
    if (!runCommand(`node "${path.join(SCRIPT_DIR, 'check-cjs.cjs')}"`, 'CommonJS verification', true)) {
      restoreDist();
      throw new Error('CommonJS verification failed');
    }
    log.success('CommonJS format verified');

    log.info('Testing ESM format...');
    if (!runCommand(`node "${path.join(SCRIPT_DIR, 'check-esm.mjs')}"`, 'ESM verification', true)) {
      restoreDist();
      throw new Error('ESM verification failed');
    }
    log.success('ESM format verified');

    // ====================================================================
    // SUCCESS
    // ====================================================================
    log.info('');
    log.info('='.repeat(60));
    log.success('BUILD COMPLETED SUCCESSFULLY!');
    log.info('='.repeat(60));
    log.info('');
    log.info('Summary:');
    log.info('  ✅ Lint check passed');
    log.info('  ✅ Prettier formatting verified');
    log.info('  ✅ TypeScript compilation successful');
    log.info('  ✅ ESM converted to .mjs with fixed imports');
    log.info('  ✅ CJS converted to .cjs with fixed requires');
    log.info('  ✅ CommonJS format verified');
    log.info('  ✅ ESM format verified');
    log.info('');
    log.info('Artifacts:');
    log.info('  📦 dist/cjs/      - CommonJS build (.cjs files)');
    log.info('  📦 dist/esm/      - ESM build (.mjs files)');
    log.info('  📦 dist/types/    - Shared type definitions (.d.ts)');
    log.info('');
    log.info(`Build log: ${BUILD_LOG}`);
    log.info('');

    buildSuccess = true;
    process.exit(0);
  } catch (error) {
    log.info('');
    log.error(error.message);
    log.info('');
    log.info(`Build log: ${BUILD_LOG}`);
    log.info('');
    process.exit(1);
  }
}

// Run the build
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
