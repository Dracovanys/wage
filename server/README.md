# WAGE MCP Server

Servidor MCP (Model Context Protocol) para o WAGE - Workspace-Based Agent.

## Tools Disponíveis

| Tool | Descrição |
|------|-----------|
| `wage_check_gitignore` | Verifica se `wage/` está no `.gitignore` |
| `wage_list_agents` | Lista agentes especializados disponíveis |
| `wage_set_agent` | Ativa um agente especializado (multi-agent mode) |
| `wage_get_current_agent` | Retorna o agente atualmente ativo |
| `wage_read_agent` | Lê definição de um agente especializado |
| `wage_list_contexts` | Lista arquivos de contexto disponíveis |
| `wage_read_context` | Lê conteúdo de um arquivo de contexto |
| `wage_write_context` | Cria/atualiza arquivo de contexto |
| `wage_list_scripts` | Lista scripts utilitários disponíveis |
| `wage_execute_script` | Executa um script (JS ou Python) |
| `wage_clean_temp` | Limpa a pasta `temp/` |
| `wage_get_workflow_rules` | Retorna as regras de workflow do WAGE |

## Instalação

```bash
cd server
npm install
```

## Inicialização

```bash
npm start
```

## Configuração

Adicione ao settings.json do seu cliente MCP (Qwen Code, Cline, etc.):

```json
{
  "mcpServers": {
    "wage": {
      "command": "node",
      "args": ["<path-to>/wage/server/server.js"],
      "cwd": "<path-to>/wage/server"
    }
  }
}
```

> 💡 **Nota:** Substitua `<path-to>` pelo caminho absoluto do seu projeto. Cada projeto pode ter sua própria configuração do servidor WAGE.

## Exemplo de Uso

### Modo Padrão (Default)

```
1. wage_check_gitignore()
2. wage_list_contexts()
3. wage_read_context({file: "action-createUnitTest.md"})
4. wage_execute_script({file: "generate-tests.js", args: ["--class", "User"]})
5. wage_write_context({file: "action-test-coverage.md", content: "..."})
```

### Multi-Agent Mode

```
1. wage_set_agent({name: "ruby"})
2. wage_read_agent({name: "ruby"})
3. wage_list_contexts({agent: "ruby"})
4. wage_read_context({file: "tool-rails.md", agent: "ruby"})
5. wage_execute_script({file: "optimize-queries.js", agent: "ruby"})
6. wage_write_context({file: "action-n-plus-one.md", content: "...", agent: "ruby"})
```
