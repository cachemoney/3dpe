# 3DPE Optimization - Rollback Procedures

## Safety Branches Created

**Backup Branch**: `backup/pre-3dpe-optimization`
- Created: 2026-02-01
- Base commit: `10d846e` (beads)
- Purpose: Safe restore point before any optimization work

**Feature Branch**: `feature/3dpe-optimization`
- Purpose: Active development branch for optimization work
- Safe to experiment, revert, or reset without affecting main branches

## Quick Rollback Commands

### 1. Discard All Changes (Nuclear Option)
```bash
# Go back to backup state completely
git checkout backup/pre-3dpe-optimization
git branch -D feature/3dpe-optimization
git checkout -b feature/3dpe-optimization
```

### 2. Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### 3. Undo Last Commit (Discard Changes)
```bash
git reset --hard HEAD~1
```

### 4. Revert to Specific Commit
```bash
# Check commit history
git log --oneline

# Revert to specific commit (keep history)
git revert <commit-hash>

# OR reset to specific commit (rewrite history)
git reset --hard <commit-hash>
```

### 5. Restore Single File
```bash
# From backup branch
git checkout backup/pre-3dpe-optimization -- path/to/file

# From specific commit
git checkout <commit-hash> -- path/to/file
```

### 6. Compare Changes
```bash
# Compare current state to backup
git diff backup/pre-3dpe-optimization

# Compare specific file
git diff backup/pre-3dpe-optimization -- path/to/file
```

## Merge Back to Dev (After Testing)

When optimization work is complete and tested:

```bash
# Switch to dev branch
git checkout dev

# Merge feature branch
git merge feature/3dpe-optimization

# If there are conflicts, resolve them and commit
git commit

# Push to remote
git push origin dev
```

## Emergency Restore Procedures

### Scenario 1: Code Broken, Need Immediate Fix
```bash
# Stash current changes
git stash save "WIP: broken optimization attempt"

# Go back to backup
git checkout backup/pre-3dpe-optimization

# Create new feature branch from backup
git checkout -b feature/3dpe-optimization-v2

# Check stashed changes later
git stash list
git stash show -p stash@{0}
```

### Scenario 2: Accidental Commit to Wrong Branch
```bash
# Note the commit hash
git log --oneline -1

# Undo the commit
git reset --hard HEAD~1

# Switch to correct branch
git checkout feature/3dpe-optimization

# Cherry-pick the commit
git cherry-pick <commit-hash>
```

### Scenario 3: Need to Start Fresh
```bash
# Delete feature branch
git branch -D feature/3dpe-optimization

# Recreate from backup
git checkout backup/pre-3dpe-optimization
git checkout -b feature/3dpe-optimization
```

## Branch Information

### Current Branches
- `main` - Production branch
- `dev` - Development integration branch (current base)
- `backup/pre-3dpe-optimization` - Backup restore point
- `feature/3dpe-optimization` - Active optimization work
- `beads-sync` - Beads issue tracking sync

### Remote Branches
All branches are available on remote:
- `origin/main`
- `origin/dev`
- `origin/beads-sync`

## Testing Before Merge

Before merging optimization work back to dev:

1. **Run all tests**
   ```bash
   npm test  # or appropriate test command
   ```

2. **Build verification**
   ```bash
   npm run build  # or appropriate build command
   ```

3. **Performance benchmarking**
   - Document before/after metrics
   - Verify optimization goals achieved

4. **Code review**
   - Review all changes: `git diff backup/pre-3dpe-optimization`
   - Check for unintended side effects

## Backup Verification

Verify backup branch is intact:
```bash
git checkout backup/pre-3dpe-optimization
git log --oneline -5
# Should show: 10d846e beads (and earlier commits)
```

## Notes

- **DO NOT** delete `backup/pre-3dpe-optimization` until optimization is merged and verified in production
- All work should be done on `feature/3dpe-optimization` branch
- Commit frequently with descriptive messages
- Push feature branch to remote periodically: `git push -u origin feature/3dpe-optimization`

## Support

If you encounter issues:
1. Check current state: `git status`
2. Check branch: `git branch`
3. Check commit history: `git log --oneline -10`
4. Refer to specific rollback scenario above

## Commit History Reference

Base state (backup point):
```
10d846e beads
8d62b23 test
8d826cc beads
dd9ce45 initial
```
