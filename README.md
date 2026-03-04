# WAGE — Workspace-Based Agent

> **MCP server that provides structured workspace for AI agents to store project context, tools, practices, and scripts.**

---

## 👤 For the User

### What Is WAGE?

**WAGE** (Workspace-Based Agent) is an **MCP server** that provides a structured workspace for AI agents working on software projects. It functions as a "smart notebook" where agents store:

- 📚 **Project Context** — Documentation, concepts, and business rules
- 🛠️ **Tools** — Information about external tools used
- 📝 **Practices** — Best techniques for specific actions (tests, deploy, etc.)
- ⚙️ **Scripts** — Utilities for task automation

---

### ⚡ Quick Start

**Prerequisites:**
- Node.js 18.x or higher
- MCP-compatible AI assistant (Qwen Code, Cline, etc.)

**Setup:**
```bash
cd wage/server
npm install
```

**Configuration:** Add the WAGE MCP server to your AI assistant's configuration. See [Configuration](#-configuration) below.

**Usage:** Simply ask your AI assistant to perform tasks. It will automatically use WAGE tools when needed:

```
"Create unit tests for the authentication module"
"List available contexts"
"Optimize database queries using the ruby agent"
```

---

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
| 🔌 **MCP Integration** | Works seamlessly with any MCP-compatible AI assistant |

---

### Prerequisites

Ensure you have installed on your machine:

| Tool | Minimum Version | Purpose |
|------|-----------------|---------|
| **Node.js** | 18.x or higher | Run JavaScript scripts (`.js`) |
| **Python** | 3.8 or higher | Run Python scripts (`.py`) — optional but recommended |

**Verify installations:**

```bash
node --version    # Should display v18.x.x or higher
python --version  # Should display Python 3.8.x or higher
```

---

### 📋 Document Language

| Element | Language |
|---------|----------|
| **Agent Communication** | User preference (PT-BR, EN, ES, etc.) |
| **Documents in `contexts/`** | **English** (WAGE standard) |
| **Scripts** | English (names and comments) |

> 📝 **Why English in documents?** Standardization for international teams, better compatibility with search/AI tools, and universal technical documentation convention.

---

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

---

### 🔌 Configuration

Configure the WAGE MCP server in your AI assistant. The server runs from `wage/server/server.js`.

#### Qwen Code (VS Code)

Add to your `~/.qwen/settings.json`:

```json
{
  "mcpServers": {
    "wage": {
      "command": "node",
      "args": ["path/to/your-project/wage/server/server.js"],
      "cwd": "path/to/your-project/wage/server"
    }
  }
}
```

> 💡 **Tip:** Use absolute paths or paths relative to your workspace root.

#### Cline (VS Code)

Add to your Cline MCP settings:

```json
{
  "mcpServers": {
    "wage": {
      "command": "node",
      "args": ["path/to/your-project/wage/server/server.js"],
      "cwd": "path/to/your-project/wage/server"
    }
  }
}
```

#### Other MCP Clients

Use the standard MCP configuration format:

```json
{
  "mcpServers": {
    "wage": {
      "command": "node",
      "args": ["<absolute-path-to>/wage/server/server.js"],
      "cwd": "<absolute-path-to>/wage/server"
    }
  }
}
```

> 💡 **Note:** Each project can have its own WAGE configuration. Context files are stored per-project in `wage/contexts/`.

---

### How to Use

#### Basic Usage

Simply ask your AI assistant to perform tasks. The assistant will automatically:

1. Check `.gitignore` before starting
2. Read relevant contexts from `contexts/`
3. Use scripts from `scripts/` if available
4. Update contexts with new knowledge after completing

**Examples:**

- *"Create unit tests for the authentication module"*
- *"Generate API documentation"*
- *"Refactor the button component following project practices"*
- *"List available contexts"*
- *"What agents are available?"*

#### Multi-Agent Mode

To use a specialized agent, simply mention it in your request:

**Examples:**

- *"Use the ruby agent to refactor the user model"*
- *"Ask the frontend agent to update button styles"*
- *"The devops agent should configure the CI/CD pipeline"*

The assistant will automatically:
1. Activate the specialized agent
2. Read agent-specific contexts from `contexts/<agent>/`
3. Use scripts from `scripts/<agent>/`
4. Save new knowledge to the agent's context folder

**To see available agents:**

```
What agents are available?
```

**To create a new agent:**

```
Create a new agent named <agent-name>
```

See `agents/README.md` for more details on creating and managing agents.

---

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

## 🤖 For the Agent (MCP Tools)

### Contextualization

You are an AI agent with access to the WAGE MCP server — a set of tools that provide structured workspace for software projects.

The WAGE workspace is located at `./wage/` and contains:

| Folder | Purpose |
|--------|---------|
| `agents/` | Specialized agent definitions — check for specialized agents |
| `contexts/` | Project knowledge base — stores project knowledge |
| `scripts/` | Utility scripts you can use during tasks |
| `temp/` | Temporary workspace (cleaned each task) |

---

### Available MCP Tools

| Tool | Description |
|------|-------------|
| `wage_check_gitignore` | Check if `wage/` is in `.gitignore`. **Must be called before any task.** |
| `wage_list_agents` | List all available specialized agents |
| `wage_set_agent` | Activate a specialized agent (multi-agent mode) |
| `wage_get_current_agent` | Get the currently active agent |
| `wage_read_agent` | Read an agent definition file |
| `wage_list_contexts` | List available context files |
| `wage_read_context` | Read a context file |
| `wage_write_context` | Create or update a context file |
| `wage_list_scripts` | List available utility scripts |
| `wage_execute_script` | Execute a script (JS or Python) |
| `wage_clean_temp` | Clean the `temp/` folder |
| `wage_get_workflow_rules` | Get the WAGE workflow rules |

---

### Multi-Agent Mode

When a task requires specialized knowledge:

1. **List available agents:**
   ```
   wage_list_agents()
   ```

2. **Activate specialized agent:**
   ```
   wage_set_agent({name: "ruby"})
   ```

3. **Read agent definition:**
   ```
   wage_read_agent({name: "ruby"})
   ```

4. **Access agent-specific contexts:**
   ```
   wage_list_contexts({agent: "ruby"})
   wage_read_context({file: "tool-rails.md", agent: "ruby"})
   ```

5. **Save new knowledge:**
   ```
   wage_write_context({file: "action-learnings.md", content: "...", agent: "ruby"})
   ```

---

### Context Isolation

| Agent Status | Contexts Available | Scripts Available |
|--------------|-------------------|-------------------|
| Default (null) | `contexts/shared/` | `scripts/shared/` |
| Specialized (`ruby`) | `contexts/shared/` + `contexts/ruby/` | `scripts/shared/` + `scripts/ruby/` |

---

### Language

| Element | Language |
|---------|----------|
| **Communication with user** | Same language as the user |
| **Documents (`contexts/`)** | **English** (mandatory) |
| **Scripts** | English (names and comments) |

> ⚠️ **Important:** Always create/update documents in `contexts/` in **English**, even if the user communicates in Portuguese.

---

### Behavior Rules

**Always follow the workflow defined in `workflow.md`.**

**Summary of obligations:**

1. ✅ **Check `.gitignore`** — Before any task, call `wage_check_gitignore()`
2. ✅ **Check/create folders** — Ensure structure exists via `wage_list_contexts()`
3. ✅ **Clean `temp/`** — Call `wage_clean_temp()` before starting a task
4. ✅ **Execute task** — Use contexts and scripts to work
5. ✅ **Update `contexts/`** — Call `wage_write_context()` after completing with new knowledge
6. ✅ **Clean `temp/`** — Call `wage_clean_temp()` when finishing

---

### Naming Conventions

| File | Purpose |
|------|---------|
| `tool-*.md` | External tool documentation (e.g., `tool-putty.md`) |
| `action-*.md` | Best practices for actions (e.g., `action-createUnitTest.md`) |
| `concept-*.md` | Concepts and business rules (e.g., `concept-inss.md`) |
| `*.js` or `*.py` | Utility scripts |

---

## License

MIT — Use freely in your projects.
