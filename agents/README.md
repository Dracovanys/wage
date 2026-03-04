# WAGE Agents

> **Define and manage your custom agents.**

---

## Overview

The `agents/` folder contains definitions for all custom agents in your WAGE workspace. Each agent has its own specialization, context, and scripts.

---

## Available Agents

| Agent | Purpose | Context Folder |
|-------|---------|----------------|
| *(none yet)* | Create your first agent! | - |

---

## How to Create a New Agent

### Step 1: Create Agent Definition

Create a new file `agents/<agent-name>.md` using the template:

```markdown
# Agent: <agent-name>

**Created:** YYYY-MM-DD
**Author:** Your Name

## Purpose

What this agent is responsible for.

## Specialization

- Area 1
- Area 2
- Area 3

## Context Folder

`contexts/<agent-name>/`

## Scripts Folder

`scripts/<agent-name>/`

## Notes

Any additional information about this agent.
```

### Step 2: Create Context Folder

The folder is created automatically when you first save a context for this agent.

### Step 3: Create Scripts Folder (Optional)

Create `scripts/<agent-name>/` for agent-specific utility scripts.

### Step 4: Update This File

Add your new agent to the "Available Agents" table above.

---

## How to Use Agents

### Activate a Specific Agent (MCP)

When using MCP, simply mention the agent in your request:

```
Use the ruby agent to refactor the user model
Ask the frontend agent to update button styles
The devops agent should configure the CI/CD pipeline
```

The agent will automatically:
1. Call `wage_set_agent({name: "ruby"})`
2. Read agent-specific contexts
3. Use agent-specific scripts
4. Save new knowledge to the agent's context folder

### Use the Default Agent

```
Create unit tests for the authentication module
```

The default agent uses only `contexts/shared/` and `scripts/shared/`.

### List Available Agents

```
What agents are available?
```

This triggers `wage_list_agents()` to show all specialized agents.

### Create a New Agent via Chat

```
Create a new agent named ruby
```

This will create the agent definition file and necessary folders.

---

## Context Sharing

| Context Type | Location | Access |
|--------------|----------|--------|
| **Shared** | `contexts/shared/` | All agents can read/write |
| **Agent-specific** | `contexts/<agent-name>/` | Only that agent uses |

**Best Practice:**

- Put common project knowledge in `shared/`
- Put specialized knowledge in agent folders

---

## Agent Naming Conventions

| Pattern | Example | Description |
|---------|---------|-------------|
| By technology | `ruby`, `python`, `node` | Agent specialized in a technology |
| By layer | `backend`, `frontend`, `mobile` | Agent specialized in a project layer |
| By function | `devops`, `testing`, `security` | Agent specialized in a function |
| By project | `project-alpha`, `project-beta` | Agent specialized in a sub-project |
| Creative names | `sapphire`, `wizard`, `guardian` | Custom names for your agents |

**Rules:**

- Use **lowercase** letters
- Use **hyphens** for multiple words (e.g., `data-science`)
- Keep names **short and descriptive**
- Avoid special characters

---

## Agent Lifecycle

### Creating

Ask the agent via chat:

```
Create a new agent named ruby
```

This creates the agent definition file and folders automatically.

### Updating

Edit the agent's `.md` file in `agents/` to update purpose or specialization.

### Removing

1. Delete `agents/<agent-name>.md`
2. Optionally delete `contexts/<agent-name>/` and `scripts/<agent-name>/`
3. Update this `agents/README.md`

---

## Example Agent Definition

```markdown
# Agent: ruby

**Created:** 2026-03-03
**Author:** John Doe

## Purpose

Backend development, API optimization, and database management.

## Specialization

- Ruby on Rails
- PostgreSQL
- API Performance
- Code Refactoring

## Context Folder

`contexts/ruby/`

## Scripts Folder

`scripts/ruby/`

## Notes

Focus on performance and code quality. Always consider N+1 queries.
```

---

## Quick Reference

| Request | Result |
|---------|--------|
| `Use the ruby agent to...` | Activate agent "ruby" |
| `What agents are available?` | List available agents |
| `Create agent ruby` | Create new agent |

---

**Last Updated:** March 2026
