# WHS Flannel Archival

## Updating the site

> This repository contains the source code for the Flannel Archival website.
> The site is deployed automatically and uses a **staging → production** workflow to prevent accidental breakage of the live site.

---

### How this repository works

This project uses **two branches**:

| Branch    | Purpose                  |
| --------- | ------------------------ |
| `staging` | Testing changes safely   |
| `main`    | The live production site |

All changes **must follow this workflow**:

```
Make change → commit to staging
           ↓
     Test on staging site
           ↓
 Create Pull Request
    staging → main
           ↓
       Merge PR
           ↓
    Production site updates
```

 **Never commit directly to `main`.**

---

### Sites

#### Staging Site

The staging site automatically updates whenever changes are made to the **`staging` branch**.

Use this site to verify that your change works correctly.

**Staging URL**

```
https://staging-flannel-archival.oweltonrosie.workers.dev/
```

---

#### Production Site

This is the **live public site**.

It updates only when `staging` is merged into `main`.

**Production URL**

```
https://flannel-archival.oweltonrosie.workers.dev/
```

---

### Quick Start (For Most Contributors)

If you only need to make a small change:

1. Switch to the **`staging` branch**
2. Edit the file
3. Commit your change
4. Check the **staging website**
5. Create a **Pull Request**
6. Merge the PR

Detailed instructions are below.

---

### Step-by-Step Guide (GitHub Web Interface)

This guide assumes you are editing files **directly in GitHub**, not using Git locally.

---

#### 1. Switch to the `staging` Branch

Open the repository on GitHub.

Near the top-left of the file list you will see a **branch selector**.

Click it and choose:

```
staging
```

Make sure the page now shows the `staging` branch before editing anything.

---

#### 2. Edit a File

Navigate to the file you want to change.

Click the **pencil icon (✏️)** to edit the file.

Make your change.

---

#### 3. Commit the Change

Scroll to the bottom of the page.

Fill in the **commit message**, for example:

```
Fix typo on homepage
```

Select:

```
Commit directly to the staging branch
```

Click:

```
Commit changes
```

Your update is now saved in the `staging` branch.

---

#### 4. Test the Change

Wait for the **staging site to update** (usually 1–2 minutes).

Then open the staging site and check that:

* The change appears correctly
* The page loads normally
* Nothing else is broken

If something is wrong, edit the file again and commit another fix to `staging`.

---

#### 5. Create a Pull Request

Once everything looks correct on staging:

1. Go to the repository homepage
2. Click **Pull Requests**
3. Click **New Pull Request**

Set the branches to:

```
Base: main
Compare: staging
```

Then click **Create Pull Request**.

Add a short description of the change.

Example:

```
Fix typo on homepage

Verified on staging site.
```

---

### 6. Merge the Pull Request

After reviewing the changes:

Click **Merge Pull Request**.

Confirm the merge.

The changes will now be applied to the **main branch**.

---

### 7. Production Updates Automatically

After the merge:

The production site will automatically rebuild and deploy.

Your change should appear on the live site shortly after.

---

### Rules for Contributors

#### Always use `staging`

All edits must go to the **`staging` branch first**.

---

#### Never edit `main` directly

The `main` branch should only be updated via **Pull Requests**.

---

#### Always test the staging site

Before creating a PR, confirm that the change works correctly.

---

### Why This Workflow Exists

This workflow protects the live site.

Changes are:

1. Tested safely on staging
2. Reviewed before release
3. Deployed to production only after verification

This reduces the risk of breaking the live site.

---

### Summary

```
Edit file → commit to staging
      ↓
Check staging site
      ↓
Create PR (staging → main)
      ↓
Merge PR
      ↓
Production site updates
```

---

### Need Help?

If you're unsure about anything, ask me (Oscar Welton-Rosie) before merging changes into `main`.
