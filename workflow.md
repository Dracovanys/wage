# WAGE Workflow

> **Behavior rules and work methods for Workspace-Based Agents.**

---

## 📋 Overview

This document defines **all rules** that a WAGE must follow when receiving and executing a user request.

---

## 🤖 Multi-Agent Mode

### Activation Types

| Activation | Context Used | Scripts Used | Update Target |
|------------|--------------|--------------|---------------|
| `Be @wage, ...` | `contexts/shared/` | `scripts/shared/` | `contexts/shared/` |
| `Be @wage:<name>, ...` | `contexts/shared/` + `contexts/<name>/` | `scripts/shared/` + `scripts/<name>/` | `contexts/<name>/` |

### Pre-Task for Multi-Agent

When activated as `Be @wage:<agent-name>, ...`:

```
[ ] Check if agents/<agent-name>.md exists
[ ] Read agent definition to understand specialization
[ ] Check/create contexts/<agent-name>/ folder
[ ] Check/create scripts/<agent-name>/ folder (optional)
```

### Creating New Agents

When user requests `Be @wage, create agent <name>`:

1. Create `agents/<name>.md` from `agents/agent-template.md`
2. Create `contexts/<name>/` folder
3. Create `scripts/<name>/` folder (optional)
4. Update `agents/README.md` with new agent entry

---

## 🔄 Workflow

### 1. Pre-Task (Mandatory)

Before starting **any** task, a WAGE MUST:

#### 1.1 Check `.gitignore`

```
[ ] Does the .gitignore file exist in the project root?
[ ] Is the "wage/" entry listed in .gitignore?
```

**If NO:**

> ⚠️ **ALERT THE USER:**
>
> ```
> ⚠️ WARNING: The "wage/" folder is not in the project's .gitignore.
>
> This means your local context files may be accidentally committed
> to the repository, causing merge conflicts with other developers.
>
> I recommend adding the following line to your .gitignore:
>
>     wage/
>
> Would you like me to add it now? (Yes/No)
> ```

**Action:** Wait for user confirmation before proceeding.

#### 1.2 Check/Create Folders

```
[ ] Does the agents/ folder exist? → If not, CREATE
[ ] Does the contexts/ folder exist? → If not, CREATE
[ ] Does the contexts/shared/ folder exist? → If not, CREATE
[ ] Does the scripts/ folder exist? → If not, CREATE
[ ] Does the scripts/shared/ folder exist? → If not, CREATE
[ ] Does the temp/ folder exist? → If not, CREATE
```

**Command (example):**
```bash
mkdir -p ./wage/agents ./wage/contexts/shared ./wage/scripts/shared ./wage/temp
```

#### 1.2.1 Multi-Agent Check

If activated as `Be @wage:<agent-name>, ...`:

```
[ ] Check if agents/<agent-name>.md exists
[ ] If not, inform user: "Agent '<name>' not found. Create it with: Be @wage, create agent <name>"
[ ] Check/create contexts/<agent-name>/ folder
[ ] Check/create scripts/<agent-name>/ folder (optional)
```

#### 1.3 Clean `temp/` Folder

```
[ ] Remove all files from temp/ (except .gitkeep if it exists)
```

**Command (example):**
```bash
rm -rf ./wage/temp/*
```

**Reason:** The `temp/` folder is the WAGE's "scratch pad". It must be clean for each new task.

---

### 2. During the Task

#### 2.1 Use Existing Context

**Default mode (`Be @wage, ...`):**

- Read files in `contexts/shared/` to understand the project
- Consult `tool-*.md` to understand external tools
- Consult `action-*.md` to follow best practices
- Consult `concept-*.md` to understand concepts/business rules

**Multi-Agent mode (`Be @wage:<name>, ...`):**

- Read `agents/<name>.md` to understand agent specialization
- Read files in `contexts/shared/` (common knowledge)
- Read files in `contexts/<name>/` (agent-specific knowledge)

#### 2.2 Use Existing Scripts

**Default mode (`Be @wage, ...`):**

- Check `scripts/shared/` for utilities that may help
- Execute scripts when relevant to the task

**Multi-Agent mode (`Be @wage:<name>, ...`):**

- Check `scripts/shared/` for common utilities
- Check `scripts/<name>/` for agent-specific utilities
- Execute scripts when relevant to the task

#### 2.3 Work in `temp/`

- Use `temp/` for:
  - Execution logs
  - Intermediate test results
  - Quick notes
  - Temporary process files

---

### 3. Post-Task (Mandatory)

After completing **any** task, a WAGE MUST:

#### 3.1 Update `contexts/`

```
[ ] Was new knowledge acquired about the project?
[ ] If yes, create/update file in contexts/
```

**Default mode (`Be @wage, ...`):**

- Update files in `contexts/shared/`

**Multi-Agent mode (`Be @wage:<name>, ...`):**

- Update files in `contexts/<name>/` (agent-specific)
- Optionally update `contexts/shared/` if knowledge is universally applicable

**Examples:**

- New tool used → Create `tool-name.md`
- New practice discovered → Create `action-name.md`
- New concept learned → Create `concept-name.md`

**Importance:** ⭐⭐⭐⭐⭐ (Critical)

> This is the WAGE's **learning** mechanism. Without it, the agent does not evolve with the project.

#### 3.2 Clean `temp/` Folder

```
[ ] Remove all files from temp/ (task residues)
[ ] Keep only .gitkeep (if it exists)
```

**Reason:** `temp/` must be clean for the next task.

---

## 📁 Naming Conventions

### `agents/` Folder

| Pattern | Purpose | Example |
|---------|---------|---------|
| `<name>.md` | Agent definition file | `ruby.md`, `frontend.md`, `devops.md` |
| `README.md` | Agent management guide | (auto-created) |
| `agent-template.md` | Template for new agents | (auto-created) |

**Rules:**
- Use **lowercase** letters
- Use **hyphens** for multiple words (e.g., `data-science.md`)
- Keep names **short and descriptive**

### `contexts/` Folder

| Pattern | Purpose | Example |
|---------|---------|---------|
| `shared/` | Context shared by all agents | `shared/tool-git.md` |
| `<agent-name>/` | Agent-specific context | `ruby/tool-rails.md` |
| `tool-*.md` | External tool documentation | `tool-putty.md`, `tool-docker.md` |
| `action-*.md` | Best practices for actions | `action-createUnitTest.md`, `action-deploy.md` |
| `concept-*.md` | Concepts and business rules | `concept-inss.md`, `concept-authentication.md` |

**Rules:**
- Always in **English** for the filename
- **Content always in English** (WAGE standard)
- Use **kebab-case** (hyphens, lowercase)

### `scripts/` Folder

| Pattern | Purpose | Example |
|---------|---------|---------|
| `*.js` | JavaScript scripts (default) | `get-users.js`, `seed-db.js` |
| `*.py` | Python scripts | `analyze-logs.py`, `migrate-data.py` |

**Rules:**
- Descriptive names in **English**
- Use **kebab-case**
- Include comments explaining the purpose

---

## ✅ Task Checklist

When receiving a request, follow this checklist:

### Default Mode (`Be @wage, ...`)

```
PRE-TASK:
[ ] 1. Check if .gitignore exists
[ ] 2. Check if "wage/" is in .gitignore
[ ] 3. Alert user if not (and wait for confirmation)
[ ] 4. Check/create agents/ folder
[ ] 5. Check/create contexts/shared/ folder
[ ] 6. Check/create scripts/shared/ folder
[ ] 7. Check/create temp/ folder
[ ] 8. Clean temp/ folder

DURING:
[ ] 9. Read relevant context from contexts/shared/
[ ] 10. Use existing scripts from scripts/shared/
[ ] 11. Execute requested task
[ ] 12. Use temp/ for temporary files

POST-TASK:
[ ] 13. Update contexts/shared/ with new knowledge
[ ] 14. Clean temp/ (residues)
[ ] 15. Confirm completion to user
```

### Multi-Agent Mode (`Be @wage:<name>, ...`)

```
PRE-TASK:
[ ] 1. Check if .gitignore exists
[ ] 2. Check if "wage/" is in .gitignore
[ ] 3. Alert user if not (and wait for confirmation)
[ ] 4. Check if agents/<name>.md exists → If not, inform user
[ ] 5. Check/create contexts/<name>/ folder
[ ] 6. Check/create scripts/<name>/ folder (optional)
[ ] 7. Check/create contexts/shared/ folder
[ ] 8. Check/create scripts/shared/ folder
[ ] 9. Check/create temp/ folder
[ ] 10. Clean temp/ folder

DURING:
[ ] 11. Read agents/<name>.md for specialization
[ ] 12. Read context from contexts/shared/ + contexts/<name>/
[ ] 13. Use scripts from scripts/shared/ + scripts/<name>/
[ ] 14. Execute requested task
[ ] 15. Use temp/ for temporary files

POST-TASK:
[ ] 16. Update contexts/<name>/ with new knowledge
[ ] 17. Optionally update contexts/shared/ (if universal)
[ ] 18. Clean temp/ (residues)
[ ] 19. Confirm completion to user
```

---

## 🚨 Critical Rules

| # | Rule | Priority |
|---|------|----------|
| 1 | **Never skip .gitignore verification** | Critical |
| 2 | **Always alert if `wage/` is not in .gitignore`** | Critical |
| 3 | **Always clean `temp/` before starting** | High |
| 4 | **Always update `contexts/` with new knowledge** | Critical |
| 5 | **Always clean `temp/` after completing** | High |
| 6 | **Always check/create folders if they don't exist** | High |

---

## 📝 Execution Example

### Default Mode Example

**User request:**
```
Be @wage, create unit tests for the authentication module
```

**WAGE Flow:**

1. ✅ Reads `./wage/README.md` → identifies as WAGE
2. ✅ Reads `./wage/workflow.md` → loads rules
3. ✅ Checks `.gitignore` → confirms `wage/` is listed
4. ✅ Checks folders → `agents/`, `contexts/shared/`, `scripts/shared/`, `temp/` exist
5. ✅ Cleans `temp/` → removes residual files
6. ✅ Reads `contexts/shared/` → looks for `action-createUnitTest.md`, `concept-authentication.md`
7. ✅ Executes task → creates unit tests
8. ✅ Updates `contexts/shared/` → adds `action-auth-tests.md` with learnings
9. ✅ Cleans `temp/` → removes residues
10. ✅ Confirms to user → task completed

### Multi-Agent Mode Example

**User request:**
```
Be @wage:ruby, optimize the user query performance
```

**WAGE Flow:**

1. ✅ Reads `./wage/README.md` → identifies as WAGE
2. ✅ Reads `./wage/workflow.md` → loads rules
3. ✅ Checks `.gitignore` → confirms `wage/` is listed
4. ✅ Checks `agents/ruby.md` → agent exists, reads specialization
5. ✅ Checks folders → `contexts/ruby/`, `contexts/shared/`, etc. exist
6. ✅ Cleans `temp/` → removes residual files
7. ✅ Reads `contexts/shared/` + `contexts/ruby/` → finds `tool-postgres.md`, `action-ruby-performance.md`
8. ✅ Executes task → optimizes queries
9. ✅ Updates `contexts/ruby/` → adds `action-n-plus-one-fix.md` with learnings
10. ✅ Cleans `temp/` → removes residues
11. ✅ Confirms to user → task completed

---

## 🎯 WAGE Principles

1. **Context is King** — Always consult `contexts/` before acting
2. **Continuous Learning** — Always update `contexts/` after acting
3. **Organization** — Keep `temp/` clean, use naming conventions
4. **Security** — Ensure `wage/` is in `.gitignore`
5. **Autonomy** — Check and create structures as needed without asking
6. **Flexibility** — Support multiple agents with specialized contexts

---

## Version

**workflow.md v1.0** — Last updated: March 2026
