#!/usr/bin/env node

/**
 * WAGE MCP Server
 * 
 * Model Context Protocol server for WAGE (Workspace-Based Agent)
 * Provides tools for context management, agent specialization, and script execution.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { readFile, writeFile, readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const __dirname = dirname(fileURLToPath(import.meta.url));
const execAsync = promisify(exec);

// WAGE directory structure
const WAGE_DIR = join(__dirname, '..');
const CONTEXTS_DIR = join(WAGE_DIR, 'contexts');
const AGENTS_DIR = join(WAGE_DIR, 'agents');
const SCRIPTS_DIR = join(WAGE_DIR, 'scripts');
const TEMP_DIR = join(WAGE_DIR, 'temp');
const WORKFLOW_FILE = join(WAGE_DIR, 'workflow.md');

// Current agent state (for multi-agent mode)
let currentAgent = null;

/**
 * Ensure WAGE directory structure exists
 */
async function ensureWageStructure() {
  const dirs = [
    CONTEXTS_DIR,
    join(CONTEXTS_DIR, 'shared'),
    AGENTS_DIR,
    SCRIPTS_DIR,
    join(SCRIPTS_DIR, 'shared'),
    TEMP_DIR,
  ];

  for (const dir of dirs) {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
  }
}

/**
 * Check if .gitignore contains wage/ entry
 */
async function checkGitignore() {
  const gitignorePath = join(WAGE_DIR, '..', '.gitignore');
  
  if (!existsSync(gitignorePath)) {
    return { exists: false, hasWageEntry: false };
  }

  const content = await readFile(gitignorePath, 'utf-8');
  const lines = content.split('\n').map(l => l.trim());
  
  return {
    exists: true,
    hasWageEntry: lines.some(line => 
      line === 'wage/' || 
      line === '/wage/' || 
      line === 'wage' ||
      line === '/wage'
    ),
  };
}

/**
 * List all context files for an agent (or shared)
 */
async function listContextFiles(agent = null) {
  await ensureWageStructure();
  
  const contexts = [];
  
  // Always include shared contexts
  const sharedDir = join(CONTEXTS_DIR, 'shared');
  if (existsSync(sharedDir)) {
    const files = await readdir(sharedDir);
    contexts.push(
      ...files
        .filter(f => f.endsWith('.md'))
        .map(f => ({ file: f, agent: 'shared', path: join('contexts', 'shared', f) }))
    );
  }
  
  // Include agent-specific contexts if agent is set
  if (agent) {
    const agentDir = join(CONTEXTS_DIR, agent);
    if (existsSync(agentDir)) {
      const files = await readdir(agentDir);
      contexts.push(
        ...files
          .filter(f => f.endsWith('.md'))
          .map(f => ({ file: f, agent, path: join('contexts', agent, f) }))
      );
    }
  }
  
  return contexts;
}

/**
 * List all available agents
 */
async function listAvailableAgents() {
  await ensureWageStructure();
  
  if (!existsSync(AGENTS_DIR)) {
    return [];
  }
  
  const files = await readdir(AGENTS_DIR);
  return files
    .filter(f => f.endsWith('.md') && f !== 'README.md' && f !== 'agent-template.md')
    .map(f => f.replace('.md', ''));
}

/**
 * List all available scripts for an agent (or shared)
 */
async function listScripts(agent = null) {
  await ensureWageStructure();
  
  const scripts = [];
  
  // Always include shared scripts
  const sharedDir = join(SCRIPTS_DIR, 'shared');
  if (existsSync(sharedDir)) {
    const files = await readdir(sharedDir);
    scripts.push(
      ...files
        .filter(f => f.endsWith('.js') || f.endsWith('.py'))
        .map(f => ({ file: f, agent: 'shared', path: join('scripts', 'shared', f) }))
    );
  }
  
  // Include agent-specific scripts if agent is set
  if (agent) {
    const agentDir = join(SCRIPTS_DIR, agent);
    if (existsSync(agentDir)) {
      const files = await readdir(agentDir);
      scripts.push(
        ...files
          .filter(f => f.endsWith('.js') || f.endsWith('.py'))
          .map(f => ({ file: f, agent, path: join('scripts', agent, f) }))
      );
    }
  }
  
  return scripts;
}

/**
 * Execute a script (JS or Python)
 */
async function executeScript(scriptPath, args = []) {
  const fullPath = join(WAGE_DIR, scriptPath);
  
  if (!existsSync(fullPath)) {
    throw new Error(`Script not found: ${scriptPath}`);
  }
  
  const isPython = scriptPath.endsWith('.py');
  const command = isPython 
    ? `python "${fullPath}" ${args.join(' ')}`
    : `node "${fullPath}" ${args.join(' ')}`;
  
  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: WAGE_DIR,
      timeout: 30000,
    });
    
    return {
      success: true,
      stdout,
      stderr,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      stdout: error.stdout || '',
      stderr: error.stderr || '',
    };
  }
}

/**
 * Clean temp directory
 */
async function cleanTemp() {
  await ensureWageStructure();
  
  const files = await readdir(TEMP_DIR);
  
  for (const file of files) {
    if (file === '.gitkeep') continue;
    
    const filePath = join(TEMP_DIR, file);
    const stat = await readFile(filePath).then(() => null).catch(() => null);
    
    // Simple file removal (can be enhanced for directories)
    try {
      await execAsync(`del /q "${filePath}"`, { cwd: WAGE_DIR });
    } catch {
      // Ignore errors
    }
  }
  
  return { success: true, cleaned: files.filter(f => f !== '.gitkeep').length };
}

/**
 * Get workflow rules
 */
async function getWorkflowRules() {
  if (!existsSync(WORKFLOW_FILE)) {
    return { error: 'workflow.md not found' };
  }
  
  const content = await readFile(WORKFLOW_FILE, 'utf-8');
  return { content };
}

// Define available tools
const TOOLS = [
  {
    name: 'wage_check_gitignore',
    description: 'Check if wage/ folder is in .gitignore. Must be called before any task.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'wage_list_agents',
    description: 'List all available specialized agents. Use this to see what agents exist.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'wage_set_agent',
    description: 'Activate a specialized agent for multi-agent mode. Use null to reset to default.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { 
          type: 'string', 
          description: 'Agent name (e.g., "ruby", "frontend") or null for default',
          nullable: true,
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'wage_get_current_agent',
    description: 'Get the currently active specialized agent (null if default mode).',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'wage_read_agent',
    description: 'Read a specialized agent definition file to understand its specialization.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Agent name (e.g., "ruby", "frontend")' },
      },
      required: ['name'],
    },
  },
  {
    name: 'wage_list_contexts',
    description: 'List all available context files. Include agent-specific contexts if agent is active.',
    inputSchema: {
      type: 'object',
      properties: {
        agent: { 
          type: 'string', 
          description: 'Agent name for agent-specific contexts (optional, uses current agent if not provided)',
          nullable: true,
        },
      },
    },
  },
  {
    name: 'wage_read_context',
    description: 'Read a context file content. Use this to access project knowledge, tools, and practices.',
    inputSchema: {
      type: 'object',
      properties: {
        file: { type: 'string', description: 'Context file name (e.g., "tool-git.md")' },
        agent: { 
          type: 'string', 
          description: 'Agent context to read from (optional, uses current agent if not provided)',
          nullable: true,
        },
      },
      required: ['file'],
    },
  },
  {
    name: 'wage_write_context',
    description: 'Create or update a context file with new knowledge. Saves to appropriate agent folder.',
    inputSchema: {
      type: 'object',
      properties: {
        file: { type: 'string', description: 'Context file name (e.g., "action-newPractice.md")' },
        content: { type: 'string', description: 'Markdown content to save' },
        agent: { 
          type: 'string', 
          description: 'Agent context to save to (optional, uses current agent if not provided)',
          nullable: true,
        },
      },
      required: ['file', 'content'],
    },
  },
  {
    name: 'wage_list_scripts',
    description: 'List all available utility scripts. Include agent-specific scripts if agent is active.',
    inputSchema: {
      type: 'object',
      properties: {
        agent: { 
          type: 'string', 
          description: 'Agent name for agent-specific scripts (optional, uses current agent if not provided)',
          nullable: true,
        },
      },
    },
  },
  {
    name: 'wage_execute_script',
    description: 'Execute a utility script (JS or Python). Use this for automation tasks.',
    inputSchema: {
      type: 'object',
      properties: {
        file: { type: 'string', description: 'Script file name (e.g., "generate-tests.js")' },
        args: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'Command-line arguments for the script',
        },
        agent: { 
          type: 'string', 
          description: 'Agent scripts folder to use (optional, uses current agent if not provided)',
          nullable: true,
        },
      },
      required: ['file'],
    },
  },
  {
    name: 'wage_clean_temp',
    description: 'Clean the temp/ folder. Call before starting a task and after completing.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'wage_get_workflow_rules',
    description: 'Get the WAGE workflow rules and behavior guidelines.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

// Create MCP server
const server = new Server(
  {
    name: 'wage-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle list_tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// Handle call_tool request
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'wage_check_gitignore': {
        const result = await checkGitignore();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'wage_list_agents': {
        const agents = await listAvailableAgents();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(agents, null, 2),
            },
          ],
        };
      }

      case 'wage_set_agent': {
        const { name: agentName } = args;
        currentAgent = agentName;
        return {
          content: [
            {
              type: 'text',
              text: agentName 
                ? `Agent '${agentName}' activated. Use contexts/${agentName}/ and scripts/${agentName}/ for specialized knowledge.`
                : 'Agent reset to default mode. Using contexts/shared/ and scripts/shared/.',
            },
          ],
        };
      }

      case 'wage_get_current_agent': {
        return {
          content: [
            {
              type: 'text',
              text: currentAgent || 'null (default mode)',
            },
          ],
        };
      }

      case 'wage_read_agent': {
        const { name: agentName } = args;
        const agentFile = join(AGENTS_DIR, `${agentName}.md`);
        
        if (!existsSync(agentFile)) {
          throw new Error(`Agent '${agentName}' not found. Create it first.`);
        }
        
        const content = await readFile(agentFile, 'utf-8');
        return {
          content: [
            {
              type: 'text',
              text: content,
            },
          ],
        };
      }

      case 'wage_list_contexts': {
        const { agent } = args;
        const targetAgent = agent !== undefined ? agent : currentAgent;
        const contexts = await listContextFiles(targetAgent);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(contexts, null, 2),
            },
          ],
        };
      }

      case 'wage_read_context': {
        const { file, agent } = args;
        const targetAgent = agent !== undefined ? agent : currentAgent;
        
        // Try agent-specific context first if agent is set
        if (targetAgent) {
          const agentContextPath = join(CONTEXTS_DIR, targetAgent, file);
          if (existsSync(agentContextPath)) {
            const content = await readFile(agentContextPath, 'utf-8');
            return {
              content: [
                {
                  type: 'text',
                  text: content,
                },
              ],
            };
          }
        }
        
        // Fall back to shared context
        const sharedPath = join(CONTEXTS_DIR, 'shared', file);
        if (!existsSync(sharedPath)) {
          throw new Error(`Context file '${file}' not found in ${targetAgent ? `contexts/${targetAgent}/ or contexts/shared/` : 'contexts/shared/'}`);
        }
        
        const content = await readFile(sharedPath, 'utf-8');
        return {
          content: [
            {
              type: 'text',
              text: content,
            },
          ],
        };
      }

      case 'wage_write_context': {
        const { file, content, agent } = args;
        const targetAgent = agent !== undefined ? agent : currentAgent;
        
        const contextDir = targetAgent 
          ? join(CONTEXTS_DIR, targetAgent)
          : join(CONTEXTS_DIR, 'shared');
        
        await ensureWageStructure();
        
        if (!existsSync(contextDir)) {
          await mkdir(contextDir, { recursive: true });
        }
        
        const filePath = join(contextDir, file);
        await writeFile(filePath, content, 'utf-8');
        
        return {
          content: [
            {
              type: 'text',
              text: `Context saved to ${targetAgent ? `contexts/${targetAgent}/${file}` : `contexts/shared/${file}`}`,
            },
          ],
        };
      }

      case 'wage_list_scripts': {
        const { agent } = args;
        const targetAgent = agent !== undefined ? agent : currentAgent;
        const scripts = await listScripts(targetAgent);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(scripts, null, 2),
            },
          ],
        };
      }

      case 'wage_execute_script': {
        const { file, args: scriptArgs = [], agent } = args;
        const targetAgent = agent !== undefined ? agent : currentAgent;
        
        const scriptDir = targetAgent 
          ? join('scripts', targetAgent)
          : join('scripts', 'shared');
        
        const scriptPath = join(scriptDir, file);
        const result = await executeScript(scriptPath, scriptArgs);
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'wage_clean_temp': {
        const result = await cleanTemp();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'wage_get_workflow_rules': {
        const result = await getWorkflowRules();
        return {
          content: [
            {
              type: 'text',
              text: result.content || result.error,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  await ensureWageStructure();
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error('WAGE MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
