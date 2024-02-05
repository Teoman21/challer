HOW TO INSTALL:
--------------------------------------------------
Clone the Repository:

git clone https://github.com/Teoman21/challer.git

Install Dependencies:

npm install

## GIT COMMANDS  YOU SHOULD KNOW

This section covers the fundamental Git commands you'll use regularly when working on this project. These commands are crucial for managing your changes, updating your local repository, and collaborating with others.

### `git clone [repository URL]`

- **What it does:** Copies the repository from GitHub (or another remote location) to your local machine.
- **When to use it:** When you want to start working on the project for the first time.

### `git status`

- **What it does:** Shows the status of changes as untracked, modified, or staged.
- **When to use it:** To check which files have been changed and which changes are ready to be committed.

### `git add [file or directory name]` or `git add .`

- **What it does:** Adds files or changes to the staging area, marking them for inclusion in the next commit. Use `.` to add all current changes.
- **When to use it:** After you've made changes to your files and you're ready to prepare a commit.

### `git commit -m "Commit message"`

- **What it does:** Saves your staged changes along with a descriptive message about what was changed.
- **When to use it:** Once you've staged your changes and you want to create a snapshot of these changes in the project history.

### `git pull [remote] [branch]`

- **What it does:** Fetches changes from the remote repository and merges them into your current branch.
- **When to use it:** To update your local repository with the latest changes from others. It's a good practice to do this before starting new work or pushing your changes.

### `git push [remote] [branch]`

- **What it does:** Uploads your commits to the remote repository.
- **When to use it:** After committing your changes and you want to share them with the team or save them to the remote repository.

### `git branch`

- **What it does:** Lists all local branches in your repository.
- **When to use it:** To see what branch you're currently on and what other branches exist locally.

### `git checkout [branch-name]` or `git switch [branch-name]`

- **What it does:** Switches to another branch in your repository.
- **When to use it:** When you want to start working on a different part of the project or check out someone else's work.

---

Remember, the `[remote]` placeholder is typically `origin` for the default remote repository, and `[branch]` is the name of the branch you want to push to or pull from. Adjust the commands based on your specific project setup and naming conventions.


---

### `git stash`
- **What it does:** Temporarily shelves (or stashes) changes you've made to your working directory so you can work on a different task. Your local changes are saved away, and your working directory is reverted to match the HEAD commit.
- **When to use it:** Use this command when you need to switch contexts or branches, but you're not ready to commit your current work. For example, if you need to quickly address a bug on another branch but don't want to lose or commit your current changes.

### `git stash pop`
- **What it does:** Applies the changes from the most recent stash to your working directory and then removes the stash from your stash list. It attempts to reapply the work you had stashed away with `git stash`.
- **When to use it:** After you've completed work on another task and want to return to your stashed work. This command brings back your stashed changes so you can continue where you left off.

---

