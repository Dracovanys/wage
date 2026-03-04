#!/usr/bin/env node

/**
 * Script para adicionar configuração MCP ao settings.json de um cliente MCP
 * Nota: Este script usa o caminho padrão do Qwen Code. Para outros clientes,
 * ajuste o caminho conforme necessário.
 */

import { readFile, writeFile } from 'fs/promises';
import { homedir } from 'os';
import { join } from 'path';

async function main() {
  // Caminho padrão do Qwen Code. Ajuste para outros clientes MCP se necessário.
  const settingsPath = join(homedir(), '.qwen', 'settings.json');
  
  console.log(`Lendo: ${settingsPath}`);
  
  let settings;
  try {
    const content = await readFile(settingsPath, 'utf-8');
    settings = JSON.parse(content);
  } catch (error) {
    console.log('Arquivo não encontrado ou inválido. Criando novo...');
    settings = {};
  }
  
  // Adicionar configuração MCP
  settings.mcpServers = {
    ...settings.mcpServers,
    wage: {
      command: 'node',
      args: ['d:/Desenvolvimento/wage/server/server.js'],
      cwd: 'd:/Desenvolvimento/wage',
      description: 'WAGE - Workspace-Based Agent MCP Server',
      trust: true
    }
  };
  
  // Salvar
  await writeFile(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
  
  console.log(`\n✅ Configuração MCP adicionada com sucesso!`);
  console.log(`Arquivo atualizado: ${settingsPath}`);
  console.log('\nReinicie o VS Code para aplicar as mudanças.');
}

main().catch(console.error);
