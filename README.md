# WAGE — Workspace-Based Agent

> **An AI agent framework with local workspace to store project context.**

---

## 👤 For the User

### What Is WAGE?

**WAGE** (Workspace-Based Agent) is a framework that provides a structured workspace for AI agents to work on software projects. It functions as a "smart notebook" where the agent stores:

- 📚 **Project Context** — Documentation, concepts, and business rules
- 🛠️ **Tools** — Information about external tools used
- 📝 **Practices** — Best techniques for specific actions (tests, deploy, etc.)
- ⚙️ **Scripts** — Utilities for task automation

### Why Use WAGE?

| Benefit | Description |
|---------|-------------|
| 🧠 **Persistent Context** | The agent remembers project details across sessions — no need to re-explain everything |
| 📚 **Knowledge Base** | Automatically builds a documentation repository as the agent learns about your project |
| 🎯 **Consistency** | Ensures the agent follows project-specific practices and conventions |
| 🔒 **Local & Private** | All context stays on your machine — nothing is shared or uploaded without your control |
| 🚀 **Faster Onboarding** | New team members (or agents) can quickly understand the project through stored context |
| 🛠️ **Reusable Automation** | Scripts created during tasks are saved for future reuse |
| 📈 **Continuous Learning** | The agent gets smarter with each task by updating context files |
| 🔀 **No Merge Conflicts** | Each developer has their own local `wage/` folder — no Git conflicts |

### Prerequisites

Ensure you have installed on your machine:

| Tool | Minimum Version | Purpose |
|------|-----------------|---------|
| **Node.js** | 18.x or higher | Run JavaScript scripts (`.js`) |
| **Python** | 3.8 or higher | Run Python scripts (`.py`) |

**Verify installations:**

```bash
node --version    # Should display v18.x.x or higher
python --version  # Should display Python 3.8.x or higher
```

> 💡 **Note:** JavaScript scripts are the WAGE default. Python is optional but recommended for certain automations.

### Document Language

| Element | Language |
|---------|----------|
| **Agent Communication** | User preference (PT-BR, EN, ES, etc.) |
| **Documents in `contexts/`** | **English** (WAGE standard) |
| **Scripts** | English (names and comments) |

> 📝 **Why English in documents?** Standardization for international teams, better compatibility with search/AI tools, and universal technical documentation convention.

### Installation

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/dracovanys/wage.git
   ```

2. **Copy the `wage` folder** to the root of your project:
   ```
   your-project/
   ├── src/
   ├── tests/
   ├── package.json
   └── wage/          ← Copy here
   ```

3. **Add `wage/` to `.gitignore`** in your project (if it doesn't exist):
   ```gitignore
   # WAGE - Workspace-Based Agent (developer's local context)
   wage/
   ```

   > ⚠️ **Important:** The `wage/` folder must be in `.gitignore` to prevent your local context from being accidentally committed to the repository, which would cause merge conflicts with other developers.

### How to Use

#### Single Agent (Default)

To request a task from the default agent, use the **secret phrase**:

```
Be @wage, [your request]
```

**Examples:**

- *"Be @wage, create unit tests for the authentication module"*
- *"Be @wage, generate API documentation"*
- *"Be @wage, refactor the button component following project practices"*

#### Multi-Agent (Custom Agents)

Create specialized agents for different tasks and activate them by name:

```
Be @wage:<agent-name>, [your request]
```

**Examples:**

- *"Be @wage:ruby, refactor the user model"*
- *"Be @wage:frontend, update the button styles"*
- *"Be @wage:devops, configure CI/CD pipeline"*

**To see available agents:**

```
Be @wage, what agents are available?
```

**To create a new agent:**

```
Be @wage, create agent <agent-name>
```

See `agents/README.md` for more details on creating and managing agents.

### `wage/` Folder Structure

```
wage/
├── README.md           # This file
├── workflow.md         # Agent behavior rules
├── agents/             # Custom agent definitions
│   ├── README.md       # How to create/manage agents
│   ├── agent-template.md
│   └── <agent-name>.md # Your custom agents
├── contexts/           # Agent's "smart notebook"
│   ├── shared/         # Context shared by all agents
│   │   ├── tool-*.md   # External tool documentation
│   │   ├── action-*.md # Best practices for actions
│   │   └── concept-*.md# Concepts and business rules
│   └── <agent-name>/   # Agent-specific context
├── scripts/            # Utility scripts (JS/Python)
│   ├── shared/         # Scripts available to all agents
│   └── <agent-name>/   # Agent-specific scripts
└── temp/               # Temporary workspace (cleaned each task)
```

---

## 🤖 For the Agent

### Contextualization

You are a **WAGE** (Workspace-Based Agent) — an AI agent with a local workspace to work on software projects.

Your workspace is located at `./wage/` and contains:

| Folder | Purpose |
|--------|---------|
| `agents/` | Custom agent definitions — check for specialized agents |
| `contexts/` | Your "smart notebook" — stores project knowledge |
| `scripts/` | Utility scripts you can use during tasks |
| `temp/` | Your "scratch pad" — temporary files, logs, tests |

### Multi-Agent Mode

When activated as `Be @wage:<agent-name>, ...`:

1. Read `agents/<agent-name>.md` to understand your specialization
2. Use context from `contexts/shared/` + `contexts/<agent-name>/`
3. Use scripts from `scripts/shared/` + `scripts/<agent-name>/`
4. Update `contexts/<agent-name>/` with new knowledge

When activated as `Be @wage, ...` (default):

1. Use context from `contexts/shared/` only
2. Use scripts from `scripts/shared/` only
3. Update `contexts/shared/` with new knowledge

### Language

| Element | Language |
|---------|----------|
| **Communication with user** | Same language as the user |
| **Documents (`contexts/`)** | **English** (mandatory) |
| **Scripts** | English (names and comments) |

> ⚠️ **Important:** Always create/update documents in `contexts/` in **English**, even if the user communicates in Portuguese.

### Behavior Rules

**Read the `workflow.md` file carefully** — it defines all rules and work methods you MUST follow.

**Summary of obligations:**

1. ✅ **Check `.gitignore`** — Before any task, confirm `wage/` is in `.gitignore`
2. ✅ **Check/create folders** — Ensure `contexts/`, `scripts/`, and `temp/` exist
3. ✅ **Clean `temp/`** — Empty before starting a task
4. ✅ **Execute task** — Use context from `contexts/` to work
5. ✅ **Update `contexts/`** — Add new knowledge after completing
6. ✅ **Clean `temp/`** — Remove residues when finishing

### Naming Conventions

| File | Purpose |
|------|---------|
| `tool-*.md` | External tool documentation (e.g., `tool-putty.md`) |
| `action-*.md` | Best practices for actions (e.g., `action-createUnitTest.md`) |
| `concept-*.md` | Concepts and business rules (e.g., `concept-inss.md`) |
| `*.js` or `*.py` | Utility scripts |

### Activation

You are activated when the user uses the phrase:

```
Be @wage, [request]
```

The `@` indicates you should recognize the path and act as WAGE.

---

## License

MIT — Use freely in your projects.
