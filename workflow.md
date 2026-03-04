# WAGE Workflow

> **Behavior rules and work methods for Workspace-Based Agents (MCP).**

---

## 📋 Overview

This document defines **all rules** that a WAGE agent must follow when receiving and executing a user request via MCP tools.

---

## 🤖 MCP Tools

### Available Tools

| Tool | Description | When to Use |
|------|-------------|-------------|
| `wage_check_gitignore` | Check if `wage/` is in `.gitignore` | **First call before any task** |
| `wage_list_agents` | List available specialized agents | When task may need specialization |
| `wage_set_agent` | Activate a specialized agent | When user requests or task needs specialization |
| `wage_get_current_agent` | Get currently active agent | To check current mode |
| `wage_read_agent` | Read agent definition | After activating specialized agent |
| `wage_list_contexts` | List context files | To discover available knowledge |
| `wage_read_context` | Read context file | To access project knowledge |
| `wage_write_context` | Create/update context | After task to save new knowledge |
| `wage_list_scripts` | List utility scripts | When automation may help |
| `wage_execute_script` | Execute script | When script can automate task |
| `wage_clean_temp` | Clean temp folder | Before and after each task |
| `wage_get_workflow_rules` | Get workflow rules | When unsure about behavior |
| `wage_get_version` | Get WAGE version | When user asks about version |

---

## 🔄 Workflow

### 1. Pre-Task (Mandatory)

Before starting **any** task, an agent MUST:

#### 1.1 Check `.gitignore`

```
wage_check_gitignore()
```

**If `hasWageEntry` is false:**

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

#### 1.2 Clean `temp/` Folder

```
wage_clean_temp()
```

**Reason:** The `temp/` folder is the agent's "scratch pad". It must be clean for each new task.

#### 1.3 Multi-Agent Check

If the task requires specialized knowledge or user requests a specific agent:

```
wage_list_agents()
wage_set_agent({name: "<agent-name>"})
wage_read_agent({name: "<agent-name>"})
```

#### 1.4 List Available Contexts

```
wage_list_contexts()  // Or wage_list_contexts({agent: "<name>"}) for specialized agent
```

Read relevant context files to understand the project.

---

### 2. During the Task

#### 2.1 Use Existing Context

**Default mode (no agent set):**

- Call `wage_list_contexts()` to see available files
- Call `wage_read_context({file: "tool-*.md"})` for external tools
- Call `wage_read_context({file: "action-*.md"})` for best practices
- Call `wage_read_context({file: "concept-*.md"})` for concepts/business rules

**Multi-Agent mode (agent set via `wage_set_agent`):**

- Agent-specific contexts are automatically included in `wage_list_contexts()`
- When reading, specify agent if needed: `wage_read_context({file: "...", agent: "<name>"})`

#### 2.2 Use Existing Scripts

**Default mode:**

- Call `wage_list_scripts()` to see available utilities
- Call `wage_execute_script({file: "script.js", args: [...]})` to run

**Multi-Agent mode:**

- Agent-specific scripts are automatically included
- Execute with: `wage_execute_script({file: "script.js", agent: "<name>"})`

#### 2.3 Work in `temp/`

Use `temp/` for:
- Execution logs
- Intermediate test results
- Quick notes
- Temporary process files

Files in `temp/` are cleaned at the start and end of each task.

---

### 3. Post-Task (Mandatory)

After completing **any** task, an agent MUST:

#### 3.1 Update `contexts/`

```
[ ] Was new knowledge acquired about the project?
[ ] If yes, call wage_write_context({file: "...", content: "..."})
```

**Default mode:**

- Knowledge is saved to `contexts/shared/`

**Multi-Agent mode:**

- Agent-specific knowledge is saved to `contexts/<agent>/`
- Use: `wage_write_context({file: "...", content: "...", agent: "<name>"})`

**Examples:**

- New tool used → Create `tool-name.md`
- New practice discovered → Create `action-name.md`
- New concept learned → Create `concept-name.md`

**Importance:** ⭐⭐⭐⭐⭐ (Critical)

> This is the agent's **learning** mechanism. Without it, the agent does not evolve with the project.

#### 3.2 Clean `temp/` Folder

```
wage_clean_temp()
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

### Default Mode (No Agent Set)

```
PRE-TASK:
[ ] 1. wage_check_gitignore()
[ ] 2. Alert user if wage/ not in .gitignore (wait for confirmation)
[ ] 3. wage_clean_temp()
[ ] 4. wage_list_contexts()
[ ] 5. Read relevant context files via wage_read_context()

DURING:
[ ] 6. Use contexts to understand project
[ ] 7. wage_list_scripts() if automation may help
[ ] 8. wage_execute_script() if relevant
[ ] 9. Execute requested task
[ ] 10. Use temp/ for temporary files

POST-TASK:
[ ] 11. wage_write_context() with new knowledge
[ ] 12. wage_clean_temp()
[ ] 13. Confirm completion to user
```

### Multi-Agent Mode (Agent Set via wage_set_agent)

```
PRE-TASK:
[ ] 1. wage_check_gitignore()
[ ] 2. Alert user if wage/ not in .gitignore (wait for confirmation)
[ ] 3. wage_set_agent({name: "<agent-name>"})
[ ] 4. wage_read_agent({name: "<agent-name>"})
[ ] 5. wage_clean_temp()
[ ] 6. wage_list_contexts({agent: "<agent-name>"})
[ ] 7. Read relevant context files

DURING:
[ ] 8. Use agent-specific + shared contexts
[ ] 9. wage_list_scripts({agent: "<agent-name>"}) if needed
[ ] 10. wage_execute_script({agent: "<agent-name>"}) if relevant
[ ] 11. Execute requested task
[ ] 12. Use temp/ for temporary files

POST-TASK:
[ ] 13. wage_write_context({agent: "<agent-name>", ...}) with new knowledge
[ ] 14. wage_clean_temp()
[ ] 15. Confirm completion to user
```

---

## 🚨 Critical Rules

| # | Rule | Priority |
|---|------|----------|
| 1 | **Never skip `wage_check_gitignore()` call** | Critical |
| 2 | **Always alert if `wage/` is not in `.gitignore`** | Critical |
| 3 | **Always call `wage_clean_temp()` before starting** | High |
| 4 | **Always call `wage_write_context()` with new knowledge** | Critical |
| 5 | **Always call `wage_clean_temp()` after completing** | High |
| 6 | **Always use MCP tools for context access** | High |

---

## 📝 Execution Example

### Default Mode Example

**User request:**
```
Create unit tests for the authentication module
```

**Agent Flow (via MCP tools):**

1. ✅ `wage_check_gitignore()` → confirms `wage/` is listed
2. ✅ `wage_clean_temp()` → removes residual files
3. ✅ `wage_list_contexts()` → sees available contexts
4. ✅ `wage_read_context({file: "action-createUnitTest.md"})` → loads testing practices
5. ✅ `wage_read_context({file: "concept-authentication.md"})` → loads auth concepts
6. ✅ `wage_list_scripts()` → checks for test utilities
7. ✅ Executes task → creates unit tests
8. ✅ `wage_write_context({file: "action-auth-tests.md", content: "..."})` → saves learnings
9. ✅ `wage_clean_temp()` → removes residues
10. ✅ Confirms to user → task completed

### Multi-Agent Mode Example

**User request:**
```
Use the ruby agent to optimize user query performance
```

**Agent Flow (via MCP tools):**

1. ✅ `wage_check_gitignore()` → confirms `wage/` is listed
2. ✅ `wage_list_agents()` → sees ["ruby", "frontend", "devops"]
3. ✅ `wage_set_agent({name: "ruby"})` → activates ruby agent
4. ✅ `wage_read_agent({name: "ruby"})` → reads specialization
5. ✅ `wage_clean_temp()` → removes residual files
6. ✅ `wage_list_contexts({agent: "ruby"})` → sees shared + ruby contexts
7. ✅ `wage_read_context({file: "tool-postgres.md", agent: "ruby"})` → loads DB knowledge
8. ✅ `wage_read_context({file: "action-ruby-performance.md", agent: "ruby"})` → loads practices
9. ✅ Executes task → optimizes queries
10. ✅ `wage_write_context({file: "action-n-plus-one-fix.md", content: "...", agent: "ruby"})` → saves learnings
11. ✅ `wage_clean_temp()` → removes residues
12. ✅ Confirms to user → task completed

---

## 🎯 WAGE Principles

1. **Context is King** — Always consult `contexts/` before acting
2. **Continuous Learning** — Always call `wage_write_context()` after acting
3. **Organization** — Keep `temp/` clean, use naming conventions
4. **Security** — Ensure `wage/` is in `.gitignore`
5. **Autonomy** — Check and create structures as needed without asking
6. **Flexibility** — Support multiple agents with specialized contexts
7. **MCP First** — Always use MCP tools for all WAGE operations

---

## Version

**workflow.md v2.0 (MCP)** — Last updated: March 2026
