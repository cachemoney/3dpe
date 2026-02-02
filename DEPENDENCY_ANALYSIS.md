# 3DPE Dependency Analysis and Upgrade Plan

**Analysis Date**: 2026-02-01
**Project**: SolarStorm (3DPE)
**Current Status**: Dependencies are 2-5 years outdated

---

## Executive Summary

This project uses React 17.0.1 (released Dec 2020), Three.js 0.136.0 (released Jan 2022), and associated libraries that are significantly outdated. A phased upgrade approach is recommended to minimize breaking changes and ensure stability.

### Critical Findings

- **React 17 → 19**: Major version jump (2 major versions)
- **@react-three/fiber 7 → 8.17.10**: Requires React 18+ and Three.js 0.133+
- **Three.js 0.136 → 0.182**: 46 minor versions behind
- **TypeScript 3.3.3 → 5.9.3**: Critical security and feature updates needed
- **No linting/testing infrastructure**: Missing ESLint, Prettier, Jest

---

## Current Dependency Inventory

### Production Dependencies

| Package | Current | Latest | Type | Notes |
|---------|---------|--------|------|-------|
| `react` | 17.0.1 | 19.2.4 | Framework | 2 major versions behind |
| `react-dom` | 17.0.1 | 19.2.4 | Framework | 2 major versions behind |
| `@react-three/fiber` | 7.0.24 | 9.5.0 | Framework | Requires React 19 for v9 |
| `three` | 0.136.0 | 0.182.0 | 3D Library | 46 versions behind |
| `react-scripts` | 4.0.0 | 5.0.1 | Build Tool | 1 major version behind |
| `@amcdnl/threejs-meshline` | 1.0.0 | 1.0.0 | Utility | ✓ Current |
| `canvas-sketch-util` | 1.10.0 | 1.10.0 | Utility | ✓ Current |

### Development Dependencies

| Package | Current | Latest | Type | Notes |
|---------|---------|--------|------|-------|
| `typescript` | 3.3.3 | 5.9.3 | Type System | Critical security updates needed |

---

## Dependency Categories & Risk Assessment

### Category 1: Framework Dependencies (HIGH RISK)
**Packages**: `react`, `react-dom`, `@react-three/fiber`

**Risk Level**: 🔴 **High**
- Breaking changes across major versions
- API changes in React 18+ (automatic batching, new hooks)
- R3F API changes between v7 and v8+
- Requires coordinated upgrade

**Dependencies Used in Code**:
```javascript
// src/index.js
import ReactDOM from 'react-dom';
import React from 'react';

// src/App.js
import React from 'react';
import { Canvas, extend } from '@react-three/fiber';

// src/Scene.js
import React, { Suspense } from 'react';
import { useThree } from '@react-three/fiber';
```

**Breaking Changes to Address**:
1. **React 17 → 18**:
   - `ReactDOM.render()` → `ReactDOM.createRoot()` API
   - Automatic batching behavior changes
   - New `useId`, `useTransition`, `useDeferredValue` hooks available

2. **React 18 → 19**:
   - Stricter concurrent rendering
   - Suspense boundary improvements
   - Server Components (not applicable for this project)

3. **R3F 7 → 8**:
   - Three.js r133+ required
   - Performance improvements and API refinements
   - Better TypeScript support

### Category 2: Build Tool Dependencies (MEDIUM RISK)
**Packages**: `react-scripts`

**Risk Level**: 🟡 **Medium**
- Webpack 5 upgrade included in v5
- Better performance and modern JS support
- Minimal code changes required

**Breaking Changes**:
- Webpack 5 configuration changes (handled by react-scripts)
- Node.js polyfills no longer included by default
- Improved tree-shaking

### Category 3: Testing Dependencies (NOT PRESENT)
**Packages**: None currently installed

**Risk Level**: 🟢 **Low** (new additions)
- No breaking changes (new infrastructure)
- Recommended: Jest, React Testing Library, @testing-library/react

### Category 4: Linting & Formatting Dependencies (NOT PRESENT)
**Packages**: None currently installed

**Risk Level**: 🟢 **Low** (new additions)
- No breaking changes (new infrastructure)
- Recommended: ESLint 8+, Prettier, eslint-config-airbnb or standard

### Category 5: Type Definition Dependencies (CRITICAL)
**Packages**: `typescript`

**Risk Level**: 🔴 **Critical**
- TypeScript 3.3.3 (Jan 2019) has known security vulnerabilities
- Missing 3 major versions of improvements
- Project uses `.js` files, not `.ts`, so impact is minimal

**Note**: Project doesn't currently use TypeScript in source files, but it's listed as devDependency (likely for type checking in editor).

### Category 6: Utility & Remaining Dependencies (LOW RISK)
**Packages**: `@amcdnl/threejs-meshline`, `canvas-sketch-util`, `three`

**Risk Level**: 🟢 **Low**
- `three`: Backward compatible, follows semantic versioning
- MeshLine and canvas-sketch-util: Already current or stable

**Three.js Compatibility**:
- Current: 0.136.0 (Jan 2022)
- Required for R3F v8: 0.133+
- Latest: 0.182.0 (Feb 2026)
- Breaking changes: Minimal between 0.136 → 0.182 (all minor versions)

---

## Recommended Upgrade Strategy

### Phased Approach (Recommended)

#### **Phase 1: Foundation & Build Tools** (US-003, US-004)
**Goal**: Upgrade React to 18 and build tools for stability

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@react-three/fiber": "^8.17.10",
  "three": "^0.160.0",
  "react-scripts": "^5.0.1"
}
```

**Changes Required**:
- Update `src/index.js`: Replace `ReactDOM.render()` with `createRoot()`
- Test all components for React 18 compatibility
- Verify Three.js compatibility (minimal changes expected)

**Rationale**:
- React 18 is stable and well-tested
- R3F v8 is mature and compatible with React 18
- Provides solid foundation for future upgrades

#### **Phase 2: Testing Infrastructure** (US-005)
**Goal**: Add testing before upgrading to React 19

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0"
  }
}
```

**Changes Required**:
- Create test setup files
- Write basic smoke tests for components
- Ensure existing functionality is covered

#### **Phase 3: Linting & Code Quality** (US-006)
**Goal**: Establish code quality standards

```json
{
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-config-react-app": "^7.0.1",
    "prettier": "^3.0.0"
  }
}
```

#### **Phase 4: Type Definitions** (US-007)
**Goal**: Update TypeScript for security and tooling

```json
{
  "devDependencies": {
    "typescript": "^5.9.3",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/three": "^0.160.0"
  }
}
```

#### **Phase 5: Latest Three.js & Dependencies** (US-008)
**Goal**: Bring 3D libraries to latest stable

```json
{
  "three": "^0.182.0"
}
```

**Optional Phase 6: React 19 Upgrade** (Future Work)
**Status**: Deferred - React 19 is very new (released recently)

```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "@react-three/fiber": "^9.5.0"
}
```

**Rationale for Deferring**:
- React 19 released very recently, ecosystem still catching up
- R3F v9 requires React 19, which is a significant jump
- Better to stabilize on React 18 first
- Can revisit in 3-6 months when ecosystem matures

---

## Version Change Summary by Batch

### Batch 1: Framework Core (React 18 + R3F 8)
| Package | From | To | Change Type |
|---------|------|----|----|
| react | 17.0.1 | 18.3.1 | Major |
| react-dom | 17.0.1 | 18.3.1 | Major |
| @react-three/fiber | 7.0.24 | 8.17.10 | Major |
| three | 0.136.0 | 0.160.0 | Minor (24 versions) |

### Batch 2: Build Tools
| Package | From | To | Change Type |
|---------|------|----|----|
| react-scripts | 4.0.0 | 5.0.1 | Major |

### Batch 3: Testing (New)
| Package | From | To | Change Type |
|---------|------|----|----|
| @testing-library/react | - | 14.0.0 | New |
| @testing-library/jest-dom | - | 6.1.0 | New |
| @testing-library/user-event | - | 14.5.0 | New |

### Batch 4: Linting (New)
| Package | From | To | Change Type |
|---------|------|----|----|
| eslint | - | 8.57.0 | New |
| eslint-config-react-app | - | 7.0.1 | New |
| prettier | - | 3.0.0 | New |

### Batch 5: TypeScript
| Package | From | To | Change Type |
|---------|------|----|----|
| typescript | 3.3.3 | 5.9.3 | Major (2 versions) |
| @types/react | - | 18.3.0 | New |
| @types/react-dom | - | 18.3.0 | New |
| @types/three | - | 0.160.0 | New |

### Batch 6: Three.js Final Update
| Package | From | To | Change Type |
|---------|------|----|----|
| three | 0.160.0 | 0.182.0 | Minor (22 versions) |

---

## Code Impact Analysis

### Files Requiring Changes

#### Guaranteed Changes
1. **src/index.js** (React 18 upgrade)
   ```javascript
   // OLD (React 17)
   import ReactDOM from 'react-dom';
   ReactDOM.render(<App />, document.getElementById('root'));

   // NEW (React 18)
   import { createRoot } from 'react-dom/client';
   const root = createRoot(document.getElementById('root'));
   root.render(<App />);
   ```

#### Potential Changes (Test First)
2. **src/Scene.js** - `Suspense` usage may need adjustment
3. **src/App.js** - `Canvas` component from R3F may have prop changes
4. **All component files** - Test for React 18 concurrent rendering issues

### API Compatibility Checklist

#### React 17 → 18 Breaking Changes
- [ ] `ReactDOM.render()` → `createRoot()`
- [ ] Automatic batching (usually beneficial, but test)
- [ ] `useEffect` timing changes (stricter)
- [ ] Suspense improvements (should be compatible)

#### R3F 7 → 8 Changes
- [ ] `Canvas` component props (review documentation)
- [ ] `useThree()` hook (should be compatible)
- [ ] `extend()` utility (should be compatible)
- [ ] OrbitControls integration (may need adjustment)

#### Three.js 0.136 → 0.160+ Changes
- [ ] Color API (mostly backward compatible)
- [ ] OrbitControls import path (may change)
- [ ] WebGLRenderer settings (verify compatibility)

---

## Risk Mitigation Strategies

### 1. Backup & Rollback (✅ COMPLETE)
- ✅ Safety branch created: `backup/pre-3dpe-optimization`
- ✅ Rollback procedures documented
- ✅ Working on feature branch: `feature/3dpe-optimization`

### 2. Testing Strategy
- Install dependencies: `npm install` or `yarn install`
- Run development server: `npm start`
- Visual regression testing: Compare with demo.png
- Manual testing checklist:
  - [ ] Planet renders correctly
  - [ ] SpaceDust particles visible
  - [ ] Sparks animation working
  - [ ] SparkStorm effects rendering
  - [ ] OrbitControls responsive
  - [ ] No console errors
  - [ ] Performance is acceptable

### 3. Incremental Validation
- Commit after each successful batch upgrade
- Test thoroughly before moving to next batch
- Document any issues encountered

### 4. Fallback Plans
- If React 18 upgrade fails: Stay on React 17, only upgrade Three.js
- If R3F 8 incompatible: Use R3F 7.0.29 (latest v7)
- If major issues: Restore from backup branch

---

## Dependencies Not Currently Used

### Missing Infrastructure
The following are recommended but not currently installed:

#### Testing
- Jest (included with react-scripts)
- React Testing Library
- User event testing

#### Linting
- ESLint
- Prettier
- Airbnb or Standard config

#### Type Definitions
- @types/react
- @types/react-dom
- @types/three

These will be added in Phases 2-4 of the upgrade plan.

---

## Package Manager Considerations

**Current State**: Both `package-lock.json` and `yarn.lock` present

**Recommendation**: Choose one package manager
- **npm**: Standard, well-supported, comes with Node.js
- **yarn**: Faster, better monorepo support

**Decision Required**: Standardize on one to avoid lock file conflicts

---

## Testing Acceptance Criteria

### Per-Batch Testing
After each batch upgrade, verify:
- [ ] `npm install` completes without errors
- [ ] `npm start` runs development server successfully
- [ ] Application loads in browser without console errors
- [ ] All visual elements render correctly
- [ ] No performance regression
- [ ] OrbitControls work smoothly
- [ ] Particle effects animate correctly

### Special Tests for React 18
- [ ] Verify automatic batching doesn't break state updates
- [ ] Check for any `useEffect` infinite loops
- [ ] Test Suspense boundaries

### Special Tests for Three.js
- [ ] Verify OrbitControls import and functionality
- [ ] Check material rendering
- [ ] Verify color API usage

---

## Timeline & Effort Estimate

### Recommended Schedule

**Note**: No time estimates provided. Work proceeds batch by batch with testing between each phase.

| Batch | Dependencies | Complexity | Testing Focus |
|-------|-------------|------------|---------------|
| 1 | React 18 + R3F 8 | High | Rendering, hooks, effects |
| 2 | Build tools | Low | Build process |
| 3 | Testing setup | Medium | Test infrastructure |
| 4 | Linting | Low | Code quality |
| 5 | TypeScript | Low | Type checking |
| 6 | Three.js final | Low | 3D rendering |

---

## Success Metrics

### Technical Metrics
- ✅ All dependencies updated to target versions
- ✅ Zero console errors in development
- ✅ Build completes successfully
- ✅ All tests pass (once testing added)
- ✅ No visual regressions

### Performance Metrics
- Application load time ≤ current baseline
- Frame rate maintains 60fps (or current performance)
- Memory usage stable

### Code Quality Metrics
- ESLint passes with zero errors
- Prettier formatting applied
- TypeScript type checking passes (if applicable)

---

## Known Issues & Considerations

### 1. TypeScript Configuration
- Project has TypeScript as devDependency but no `tsconfig.json`
- Source files are `.js`, not `.ts`
- May want to add `tsconfig.json` for better editor support

### 2. OrbitControls Import
- Currently: `import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'`
- This import path is stable across Three.js versions
- No changes expected

### 3. MeshLine Custom Implementation
- Project has custom MeshLine implementation in `src/MeshLine/`
- Also uses `@amcdnl/threejs-meshline` package
- Verify which is actually used and if both are needed

### 4. Browser Targets
- `browserslist` configured for modern browsers
- React 18+ requires modern browser features
- Current config should be compatible

---

## Rollback Plan Reference

**Full rollback procedures**: See `ROLLBACK_PROCEDURES.md`

**Quick rollback**:
```bash
git checkout backup/pre-3dpe-optimization
git branch -D feature/3dpe-optimization
git checkout -b feature/3dpe-optimization
```

---

## Next Steps (Execution Order)

1. ✅ **US-001**: Analyze dependencies (THIS DOCUMENT)
2. ✅ **US-002**: Create safety branch and backup (COMPLETE)
3. 🔲 **US-003**: Upgrade framework dependencies (React 18 + R3F 8)
4. 🔲 **US-004**: Upgrade build tool dependencies
5. 🔲 **US-005**: Add testing infrastructure
6. 🔲 **US-006**: Add linting and formatting
7. 🔲 **US-007**: Update type definitions
8. 🔲 **US-008**: Final Three.js update
9. 🔲 **US-009**: Document results and create follow-up issues

---

## References

### Documentation Links
- React 18 Upgrade Guide: https://react.dev/blog/2022/03/08/react-18-upgrade-guide
- React 19 Release Notes: https://react.dev/blog/2024/12/05/react-19
- R3F v8 Migration: https://docs.pmnd.rs/react-three-fiber/
- Three.js Migration Guide: https://threejs.org/docs/#manual/introduction/Migration-guide

### Version History
- React 17: Dec 2020
- React 18: March 2022
- React 19: December 2024
- Three.js 0.136: January 2022
- Three.js 0.182: Latest (as of Feb 2026)
- R3F v7: 2021
- R3F v8: 2022
- R3F v9: 2024

---

**Document Version**: 1.0
**Last Updated**: 2026-02-01
**Status**: ✅ Analysis Complete
