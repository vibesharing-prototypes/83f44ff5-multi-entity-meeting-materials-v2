# Making changes, opening a PR, and pushing to main

## 1. What you need before you start

### GitHub access
- **Repo:** `https://github.com/vibesharing-prototypes/83f44ff5-multi-entity-meeting-materials-v2`
- You need **push access** to this repo (or a fork you can push to and open a PR from).
- If you don’t have push to `vibesharing-prototypes/83f44ff5-multi-entity-meeting-materials-v2`, either:
  - Get added as a collaborator, or
  - Fork the repo, push your branch to your fork, and open a PR from the fork.

### Optional: VibeSharing deploy
- Only needed if you run `npm run deploy`.
- One-time: sign in at [vibesharing.app](https://vibesharing.app) → Account → copy deploy token.
- Save it: `mkdir -p ~/.vibesharing && echo '{"deployToken": "vs_your_token_here"}' > ~/.vibesharing/config.json`
- Per-project: set `prototypeId` in `vibesharing.json` (see README).

### Local setup
- Node.js and npm installed.
- Run `npm install` in the project root (already done).
- `.gitignore` is in place so `node_modules/` and `.next/` are not committed.

---

## 2. Making changes to the app

1. **Create a branch** (don’t work directly on `main` for PRs):
   ```bash
   git checkout -b your-feature-name
   ```
   Examples: `feature/add-dashboard`, `fix/login-form`, `docs/update-readme`.

2. **Edit the code**
   - Main app entry: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`
   - Reusable UI: `components/`
   - Config: `package.json`, `next.config.js`, `tailwind.config.js`, etc.
   - Keep `CLAUDE.md` updated (what you built, decisions, known issues, next steps).

3. **Run locally**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 and test.

4. **Stage and commit**
   ```bash
   git add .
   git status   # double-check: no node_modules or .next
   git commit -m "Short description of the change"
   ```

---

## 3. Creating a PR and getting to main

1. **Push your branch**
   ```bash
   git push -u origin your-feature-name
   ```
   If GitHub asks you to log in or use a personal access token, do that.  
   If you use a **fork**, push to your fork and open the PR from there:
   ```bash
   git remote add myfork https://github.com/YOUR_USERNAME/83f44ff5-multi-entity-meeting-materials-v2.git
   git push -u myfork your-feature-name
   ```

2. **Open the PR**
   - Go to: https://github.com/vibesharing-prototypes/83f44ff5-multi-entity-meeting-materials-v2
   - GitHub often shows a “Compare & pull request” for the branch you just pushed; click it.
   - Or: **Branches** → your branch → **New pull request**.
   - Fill in title and description (what changed, why).
   - Create the pull request.

3. **Merge the PR**
   - After review (if your org requires it), merge via the PR page (Merge pull request).
   - Choose merge method (e.g. “Create a merge commit” or “Squash and merge”) and confirm.

4. **Update your local main** (optional but recommended)
   ```bash
   git checkout main
   git pull origin main
   ```

You don’t “push to main” manually when using PRs: you push a **branch**, open a **PR**, then **merge** the PR into `main` on GitHub. That updates `main`; `git pull origin main` syncs your local `main` to that.

---

## 4. Possible authorization / permission issues

| Issue | What to check |
|-------|-------------------------------|
| **Push rejected (403)** | No write access to the repo. Use a fork and push there, then open PR from fork. |
| **Push rejected (401)** | Not logged in or token expired. Re-authenticate (HTTPS: token as password; SSH: add SSH key to GitHub). |
| **“Branch protected”** | Repo may require PRs and reviews before merging to `main`. Open a PR, get approval, then merge. |
| **Deploy fails** | Missing or wrong VibeSharing deploy token in `~/.vibesharing/config.json`, or wrong `prototypeId` in `vibesharing.json`. |

---

## 5. Quick reference

```bash
# Branch, edit, run, commit
git checkout -b my-feature
# ... edit files ...
npm run dev
git add .
git commit -m "Add my feature"

# Push and open PR on GitHub
git push -u origin my-feature
# → Open PR on GitHub → merge when ready

# Sync local main after merge
git checkout main
git pull origin main
```

---

*Optional: Remove or shorten this doc once your team has its own process.*
