#!/bin/bash

# Comprehensive Build Automation Script
# - Prebuild: Check lint and prettier
# - Build: Run TypeScript compilation
# - Postbuild: Convert, fix imports, and verify
# - Rollback: Restore previous dist if any step fails

set -e  # Exit on first error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_ROOT/dist"
DIST_BACKUP="$PROJECT_ROOT/.dist-backup"
BUILD_LOG="$PROJECT_ROOT/.build.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1" | tee -a "$BUILD_LOG"
}

success() {
    echo -e "${GREEN}✅ $1${NC}" | tee -a "$BUILD_LOG"
}

error() {
    echo -e "${RED}❌ $1${NC}" | tee -a "$BUILD_LOG"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}" | tee -a "$BUILD_LOG"
}

# Cleanup function
cleanup() {
    if [ $? -ne 0 ]; then
        error "Build failed!"
        if [ -d "$DIST_BACKUP" ]; then
            warning "Restoring previous build from backup..."
            rm -rf "$DIST_DIR"
            mv "$DIST_BACKUP" "$DIST_DIR"
            success "Previous build restored"
        fi
        exit 1
    fi
}

trap cleanup EXIT

# Initialize
echo "" > "$BUILD_LOG"
log "================================================"
log "Starting Automated Build Process"
log "================================================"

# ============================================================================
# PREBUILD PHASE: Lint and Prettier Check
# ============================================================================
log ""
log "📋 PREBUILD PHASE: Checking lint and formatting..."

if npm run lint >> "$BUILD_LOG" 2>&1; then
    success "ESLint check passed"
else
    error "ESLint check failed"
    exit 1
fi

if npm run prettier:check >> "$BUILD_LOG" 2>&1; then
    success "Prettier check passed"
else
    error "Prettier check failed - running auto-fix..."
    if npm run prettier >> "$BUILD_LOG" 2>&1; then
        success "Prettier auto-fix completed"
        warning "Code was reformatted. Please review and commit changes."
    else
        error "Prettier auto-fix failed"
        exit 1
    fi
fi

# ============================================================================
# BUILD PHASE: TypeScript Compilation
# ============================================================================
log ""
log "🔨 BUILD PHASE: Compiling TypeScript..."

# Backup current dist if it exists
if [ -d "$DIST_DIR" ]; then
    log "Backing up current dist directory..."
    rm -rf "$DIST_BACKUP"
    cp -r "$DIST_DIR" "$DIST_BACKUP"
    log "Backup created at $DIST_BACKUP"
fi

if npm run build:only >> "$BUILD_LOG" 2>&1; then
    success "TypeScript compilation completed"
else
    error "TypeScript compilation failed"
    exit 1
fi

# ============================================================================
# POSTBUILD PHASE: Convert, Fix Imports, and Verify
# ============================================================================
log ""
log "🔧 POSTBUILD PHASE: Converting and fixing imports..."

# Convert ESM .js to .mjs
log "Converting ESM files to .mjs..."
if node "$SCRIPT_DIR/convert-esm.cjs" >> "$BUILD_LOG" 2>&1; then
    success "ESM conversion completed"
else
    error "ESM conversion failed"
    exit 1
fi

# Fix ESM imports with explicit extensions
log "Fixing ESM import paths..."
if node "$SCRIPT_DIR/fix-esm-imports.cjs" >> "$BUILD_LOG" 2>&1; then
    success "ESM import fixes completed"
else
    error "ESM import fixes failed"
    exit 1
fi

# Convert CJS .js to .cjs
log "Converting CJS files to .cjs..."
if node "$SCRIPT_DIR/convert-cjs.cjs" >> "$BUILD_LOG" 2>&1; then
    success "CJS conversion completed"
else
    error "CJS conversion failed"
    exit 1
fi

# Fix CJS require paths
log "Fixing CJS require paths..."
if node "$SCRIPT_DIR/fix-cjs-requires.cjs" >> "$BUILD_LOG" 2>&1; then
    success "CJS require fixes completed"
else
    error "CJS require fixes failed"
    exit 1
fi

# ============================================================================
# VERIFICATION PHASE: Check both formats work
# ============================================================================
log ""
log "✔️  VERIFICATION PHASE: Testing built formats..."

log "Testing CommonJS format..."
if node "$SCRIPT_DIR/check-cjs.cjs" >> "$BUILD_LOG" 2>&1; then
    success "CommonJS format verified"
else
    error "CommonJS format verification failed"
    exit 1
fi

log "Testing ESM format..."
if node "$SCRIPT_DIR/check-esm.mjs" >> "$BUILD_LOG" 2>&1; then
    success "ESM format verified"
else
    error "ESM format verification failed"
    exit 1
fi

# ============================================================================
# SUCCESS
# ============================================================================
log ""
log "================================================"
success "BUILD COMPLETED SUCCESSFULLY!"
log "================================================"
log ""
log "Summary:"
log "  ✅ Lint check passed"
log "  ✅ Prettier formatting verified"
log "  ✅ TypeScript compilation successful"
log "  ✅ ESM converted to .mjs with fixed imports"
log "  ✅ CJS converted to .cjs with fixed requires"
log "  ✅ CommonJS format verified"
log "  ✅ ESM format verified"
log ""
log "Artifacts:"
log "  📦 dist/cjs/      - CommonJS build (.cjs files)"
log "  📦 dist/esm/      - ESM build (.mjs files)"
log "  📦 dist/types/    - Shared type definitions (.d.ts)"
log ""
log "Build log: $BUILD_LOG"
log ""

# Cleanup backup on success
if [ -d "$DIST_BACKUP" ]; then
    rm -rf "$DIST_BACKUP"
fi

exit 0
