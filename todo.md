# 📋 TODO - Visualizador Mobile GCS

Plano detalhado para construção do visualizador mobile GURPS Character Sheet (.gcs) baseado no roteiro de desenvolvimento.

## 🎯 FASE 1: FUNDAÇÕES E INFRAESTRUTURA BASE

### Bloco 1.1: Setup Inicial do Projeto
- [x] Configurar ambiente de desenvolvimento com TypeScript strict
- [x] Estruturar pastas seguindo clean architecture (/src/domain, /src/data, /src/presentation, /src/infrastructure)
- [x] Configurar Jest para testes unitários
- [x] Configurar ESLint e Prettier
- [x] Criar README.md com descrição do projeto

### Bloco 1.2: Sistema de Parsing Fundamental
- [x] Criar interface IFileParser com métodos parseFile() e detectSchema()
- [x] Implementar tipos ParseResult e SchemaVersion
- [x] Criar SchemaDetector para detectar JSON e extrair versão
- [x] Implementar validação de formato de arquivo

### Bloco 1.3: Modelos de Dados Core
- [ ] Definir interfaces para Character, Trait, Skill, Spell
- [ ] Criar funções de validação para cada modelo
- [ ] Implementar type guards para validação profunda
- [ ] Criar testes de serialização/deserialização

### Bloco 1.4: CI/CD e DevOps
- [x] Configurar pipeline básico de CI/CD
 - [x] Criar arquivo .github/workflows/ci.yml
 - [x] Configurar triggers para push em main e pull requests
 - [x] Implementar jobs: quality-check, tests, build
 - [x] Adicionar cache de dependências
 - [x] Configurar execução em ubuntu-latest
- [x] Configurar badges de status
 - [x] Adicionar badges no README.md
 - [x] Configurar badges para CI e Tests
 - [x] Usar placeholders para username/repo
- [x] Documentar pipeline
 - [x] Criar documentação completa em docs/ci-cd-documentation.md
 - [x] Documentar estrutura e funcionamento
 - [x] Incluir guia de uso e troubleshooting

## 🔧 FASE 2: PARSING E INTERPRETAÇÃO DE DADOS

### Bloco 2.1: Parsing de Entidades Simples
- [ ] Implementar TraitParser para traits básicos
- [ ] Implementar SkillParser para skills fundamentais
- [ ] Implementar CharacterParser para dados básicos do personagem
- [ ] Criar testes com arquivos exemplo

### Bloco 2.2: Sistema de Containers
- [ ] Criar modelo Equipment com estrutura recursiva
- [ ] Implementar EquipmentTree helpers (flatten, getDepth, findById)
- [ ] Criar EquipmentParser para equipamentos com hierarquia
- [ ] Implementar algoritmo de navegação em árvore

### Bloco 2.3: Campos Avançados
- [ ] Criar modelos para Feature, Modifier, Condition, Reaction
- [ ] Implementar parsers para features e modifiers
- [ ] Criar sistema de Prerequisites (Prereqs)
- [ ] Implementar parser para campos de estudo (Study)

### Bloco 2.4: Sistema de Bibliotecas
- [ ] Criar modelo Library para bibliotecas externas
- [ ] Implementar LibraryRepository para carregamento
- [ ] Criar sistema de detecção de customizações
- [ ] Implementar identificação de itens desatualizados

## 🎨 FASE 3: INTERFACE E VISUALIZAÇÃO

### Bloco 3.1: UI Base e Navegação
- [ ] Configurar React Navigation com bottom tabs
- [ ] Criar estrutura de navegação principal (5 telas)
- [ ] Implementar sistema de layout responsivo com styled-components
- [ ] Configurar Zustand para gestão de estado global

### Bloco 3.2: Visualização de Dados Simples
- [ ] Criar componente TraitList com FlatList
- [ ] Criar componente SkillList
- [ ] Implementar tela de visualização de personagem
- [ ] Integrar componentes com stores

### Bloco 3.3: Visualização de Containers
- [ ] Criar componente EquipmentTree com hierarquia visual
- [ ] Implementar sistema de drill-down em equipamentos
- [ ] Adicionar gestos de navegação (swipe)
- [ ] Criar breadcrumbs para navegação

### Bloco 3.4: Indicadores e Estados Especiais
- [ ] Criar sistema de badges (custom, outdated, active, etc)
- [ ] Integrar badges de customização e desatualização
- [ ] Implementar visualização de modifiers e reactions
- [ ] Criar indicadores visuais para conditions ativas

## ⚡ FASE 4: FUNCIONALIDADES AVANÇADAS

### Bloco 4.1: Sistema de Busca
- [ ] Implementar SearchBar com debouncing
- [ ] Criar sistema de filtros por tipo e categoria
- [ ] Integrar busca e filtros em todas as listas
- [ ] Implementar empty states para resultados vazios

### Bloco 4.2: Persistência Local
- [ ] Criar sistema de armazenamento local (FileStorage)
- [ ] Implementar importação de arquivos .gcs
- [ ] Criar tela de gerenciamento de fichas salvas
- [ ] Implementar cache de fichas abertas

### Bloco 4.3: Tratamento de Erros
- [ ] Implementar sistema centralizado de tratamento de erros
- [ ] Criar mensagens de erro amigáveis
- [ ] Implementar sistema de logging para debug
- [ ] Criar ErrorBoundary e hooks de error handling

### Bloco 4.4: Ancestries e Recursos Especiais
- [ ] Implementar parser de ancestries
- [ ] Criar visualização de name generator (read-only)
- [ ] Implementar parser de regras de dano customizadas
- [ ] Integrar recursos especiais do GURPS

## ✨ FASE 5: REFINAMENTO E POLIMENTO

### Bloco 5.1: Otimização de Performance
- [ ] Implementar lazy loading de dados
- [ ] Otimizar re-renderizações com React.memo
- [ ] Reduzir uso de memória com virtualization
- [ ] Implementar paginação para listas grandes

### Bloco 5.2: Testes de Integração Completos
- [ ] Criar suite completa de testes end-to-end com Detox
- [ ] Implementar testes de compatibilidade de versões
- [ ] Criar testes para casos limite e edge cases
- [ ] Configurar CI para rodar testes E2E

### Bloco 5.3: UX e Acessibilidade
- [ ] Refinar UX com feedback tátil e animações
- [ ] Implementar acessibilidade completa (WCAG AA)
- [ ] Criar suporte a temas (claro/escuro)
- [ ] Implementar customização visual

## 📊 Progresso Geral

- **Total de tarefas:** 96
- **Pendentes:** 74
- **Em progresso:** 0
- **Concluídas:** 22

## 🎯 Próximos Passos

1. **Iniciar com Bloco 1.1** - Setup inicial do projeto
2. **Configurar ambiente base** - TypeScript, estrutura de pastas, ferramentas de desenvolvimento
3. **Implementar parsing fundamental** - Interfaces e detectores básicos
4. **Construir modelos de dados** - Character, Trait, Skill, Spell

## 📝 Notas

- Cada tarefa deve seguir o padrão TDD (Testes Primeiro)
- Manter clean architecture em toda implementação
- Todos os componentes devem ter testes unitários
- Performance é prioridade, especialmente para listas grandes
- Acessibilidade WCAG AA deve ser mantida