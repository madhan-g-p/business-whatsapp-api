@echo off
REM Comprehensive Build Automation Script for Windows
REM - Prebuild: Check lint and prettier
REM - Build: Run TypeScript compilation
REM - Postbuild: Convert, fix imports, and verify
REM - Rollback: Restore previous dist if any step fails

setlocal enabledelayedexpansion

cd /d "%~dp0\.."
set "PROJECT_ROOT=%CD%"
set "SCRIPT_DIR=%PROJECT_ROOT%\scripts"
set "DIST_DIR=%PROJECT_ROOT%\dist"
set "DIST_BACKUP=%PROJECT_ROOT%\.dist-backup"
set "BUILD_LOG=%PROJECT_ROOT%\.build.log"

REM Clear build log
> "%BUILD_LOG%" echo.

REM Color codes (using escape sequences)
for /F %%A in ('copy /Z "%~f0" nul') do set "BS=%%A"

goto :main

:log
    echo [%date% %time%] %~1 >> "%BUILD_LOG%"
    echo %~1
    exit /b 0

:success
    echo [✓] %~1 >> "%BUILD_LOG%"
    echo [✓] %~1
    exit /b 0

:error
    echo [✗] %~1 >> "%BUILD_LOG%"
    echo [✗] %~1
    exit /b 1

:warning
    echo [!] %~1 >> "%BUILD_LOG%"
    echo [!] %~1
    exit /b 0

:main
    call :log "================================================"
    call :log "Starting Automated Build Process"
    call :log "================================================"
    call :log ""

    REM ============================================================================
    REM PREBUILD PHASE: Lint and Prettier Check
    REM ============================================================================
    call :log "PREBUILD PHASE: Checking lint and formatting..."

    call npm run lint >nul 2>&1
    if errorlevel 1 (
        call :error "ESLint check failed"
        goto :cleanup_and_fail
    )
    call :success "ESLint check passed"

    call npm run prettier:check >nul 2>&1
    if errorlevel 1 (
        call :warning "Prettier check failed - running auto-fix..."
        call npm run prettier >nul 2>&1
        if errorlevel 1 (
            call :error "Prettier auto-fix failed"
            goto :cleanup_and_fail
        )
        call :success "Prettier auto-fix completed - review and commit changes"
    ) else (
        call :success "Prettier check passed"
    )

    REM ============================================================================
    REM BUILD PHASE: TypeScript Compilation
    REM ============================================================================
    call :log ""
    call :log "BUILD PHASE: Compiling TypeScript..."

    if exist "%DIST_DIR%" (
        call :log "Backing up current dist directory..."
        if exist "%DIST_BACKUP%" rmdir /s /q "%DIST_BACKUP%" >nul 2>&1
        xcopy "%DIST_DIR%" "%DIST_BACKUP%" /E /I /Q >nul 2>&1
        call :log "Backup created"
    )

    call npm run build:only >nul 2>&1
    if errorlevel 1 (
        call :error "TypeScript compilation failed"
        goto :cleanup_and_fail
    )
    call :success "TypeScript compilation completed"

    REM ============================================================================
    REM POSTBUILD PHASE: Convert, Fix Imports, and Verify
    REM ============================================================================
    call :log ""
    call :log "POSTBUILD PHASE: Converting and fixing imports..."

    call :log "Converting ESM files to .mjs..."
    call node "%SCRIPT_DIR%\convert-esm.cjs" >nul 2>&1
    if errorlevel 1 (
        call :error "ESM conversion failed"
        goto :cleanup_and_fail
    )
    call :success "ESM conversion completed"

    call :log "Fixing ESM import paths..."
    call node "%SCRIPT_DIR%\fix-esm-imports.cjs" >nul 2>&1
    if errorlevel 1 (
        call :error "ESM import fixes failed"
        goto :cleanup_and_fail
    )
    call :success "ESM import fixes completed"

    call :log "Converting CJS files to .cjs..."
    call node "%SCRIPT_DIR%\convert-cjs.cjs" >nul 2>&1
    if errorlevel 1 (
        call :error "CJS conversion failed"
        goto :cleanup_and_fail
    )
    call :success "CJS conversion completed"

    call :log "Fixing CJS require paths..."
    call node "%SCRIPT_DIR%\fix-cjs-requires.cjs" >nul 2>&1
    if errorlevel 1 (
        call :error "CJS require fixes failed"
        goto :cleanup_and_fail
    )
    call :success "CJS require fixes completed"

    REM ============================================================================
    REM VERIFICATION PHASE: Check both formats work
    REM ============================================================================
    call :log ""
    call :log "VERIFICATION PHASE: Testing built formats..."

    call :log "Testing CommonJS format..."
    call node "%SCRIPT_DIR%\check-cjs.cjs" >nul 2>&1
    if errorlevel 1 (
        call :error "CommonJS format verification failed"
        goto :cleanup_and_fail
    )
    call :success "CommonJS format verified"

    call :log "Testing ESM format..."
    call node "%SCRIPT_DIR%\check-esm.mjs" >nul 2>&1
    if errorlevel 1 (
        call :error "ESM format verification failed"
        goto :cleanup_and_fail
    )
    call :success "ESM format verified"

    REM ============================================================================
    REM SUCCESS
    REM ============================================================================
    call :log ""
    call :log "================================================"
    call :success "BUILD COMPLETED SUCCESSFULLY!"
    call :log "================================================"
    call :log ""
    call :log "Summary:"
    call :log "  [✓] Lint check passed"
    call :log "  [✓] Prettier formatting verified"
    call :log "  [✓] TypeScript compilation successful"
    call :log "  [✓] ESM converted to .mjs with fixed imports"
    call :log "  [✓] CJS converted to .cjs with fixed requires"
    call :log "  [✓] CommonJS format verified"
    call :log "  [✓] ESM format verified"
    call :log ""
    call :log "Artifacts:"
    call :log "  [*] dist/cjs/      - CommonJS build (.cjs files)"
    call :log "  [*] dist/esm/      - ESM build (.mjs files)"
    call :log "  [*] dist/types/    - Shared type definitions"
    call :log ""
    call :log "Build log: %BUILD_LOG%"
    call :log ""

    REM Cleanup backup on success
    if exist "%DIST_BACKUP%" (
        rmdir /s /q "%DIST_BACKUP%" >nul 2>&1
    )

    exit /b 0

:cleanup_and_fail
    call :log ""
    call :error "Build process failed!"
    
    if exist "%DIST_BACKUP%" (
        call :warning "Restoring previous build from backup..."
        if exist "%DIST_DIR%" rmdir /s /q "%DIST_DIR%" >nul 2>&1
        move "%DIST_BACKUP%" "%DIST_DIR%" >nul 2>&1
        call :success "Previous build restored"
    )
    
    call :log ""
    call :log "Build log: %BUILD_LOG%"
    call :log ""
    
    exit /b 1

endlocal
