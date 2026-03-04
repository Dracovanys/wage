# Script para adicionar configuração MCP a um cliente MCP
# Nota: Este script usa o caminho padrão do Qwen Code. Para outros clientes,
# ajuste o caminho conforme necessário.
$settingsPath = "$env:USERPROFILE\.qwen\settings.json"

# Ler conteúdo atual
$content = Get-Content $settingsPath -Raw -Encoding UTF8
$settings = $content | ConvertFrom-Json

# Adicionar configuração MCP
$settings.mcpServers = @{
    wage = @{
        command = "node"
        args = @("d:/Desenvolvimento/wage/server/server.js")
        cwd = "d:/Desenvolvimento/wage"
        description = "WAGE - Workspace-Based Agent MCP Server"
        trust = $true
    }
}

# Salvar com formatação
$newContent = $settings | ConvertTo-Json -Depth 10
$newContent | Set-Content $settingsPath -Encoding UTF8

Write-Host "Configuracao MCP adicionada com sucesso!"
Write-Host "Arquivo atualizado: $settingsPath"
