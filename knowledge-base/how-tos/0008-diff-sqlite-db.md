## Inspect changes in sqlite schema

### You will learn

After reading this "how-to" document, you will be able to see how the schema of sqlite files has changed in commits.

By default, git won't show how *binary* files have changed.
Since we have a sqlite file as part of the end to end tests, it might be useful to see how the schema of that database has changed.
This document describes how to configure git to show schema changes.

### Step 1: Configure diff for `sqlite` type

Add the following to your `~/.gitconfig` file:

```
[diff "sqlite"]
	binary = true
	textconv = "echo .schema | sqlite3"
```

### Step 2: Inspect the history of the sqlite diff

```
git log -p -- test-packages/e2e-tests/db.sqlite
```

Refer to [this StackOverflow answer](https://stackoverflow.com/a/21789167) for more details.
