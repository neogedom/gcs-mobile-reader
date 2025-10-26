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
- [x] Definir interfaces para Character, Trait, Skill, Spell
- [x] Criar funções de validação para cada modelo
- [x] Implementar type guards para validação profunda
- [x] Criar testes de serialização/deserialização

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

## 🚀 FASE 2: PARSING BÁSICO (PRIORIDADE ALTA - MVP)

### Bloco 2.1: Parsing de Entidades Simples
- [ ] Implementar TraitParser para traits básicos
- [ ] Implementar SkillParser para skills fundamentais
- [x] Implementar CharacterParser para dados básicos do personagem
- [x] Criar testes com arquivos exemplo

### Bloco 2.2: Sistema de Containers
- [ ] Criar modelo Equipment com estrutura recursiva
- [ ] Implementar EquipmentTree helpers (flatten, getDepth, findById)
- [ ] Criar EquipmentParser para equipamentos com hierarquia
- [ ] Implementar algoritmo de navegação em árvore

## 🎨 FASE 3: INTERFACE E VISUALIZAÇÃO (PRIORIDADE ALTA - MVP)

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

## 🔧 FASE 4: PARSING AVANÇADO (PRIORIDADE BAIXA - PÓS-MVP)

### Bloco 4.1: Campos Avançados
- [ ] Criar modelos para Feature, Modifier, Condition, Reaction
- [ ] Implementar parsers para features e modifiers
- [ ] Criar sistema de Prerequisites (Prereqs)
- [ ] Implementar parser para campos de estudo (Study)

### Bloco 4.2: Sistema de Bibliotecas
- [ ] Criar modelo Library para bibliotecas externas
- [ ] Implementar LibraryRepository para carregamento
- [ ] Criar sistema de detecção de customizações
- [ ] Implementar identificação de itens desatualizados

## ⚡ FASE 5: FUNCIONALIDADES AVANÇADAS (PRIORIDADE MÉDIA - APÓS MVP)

### Bloco 5.1: Sistema de Busca
- [ ] Implementar SearchBar com debouncing
- [ ] Criar sistema de filtros por tipo e categoria
- [ ] Integrar busca e filtros em todas as listas
- [ ] Implementar empty states para resultados vazios

### Bloco 5.2: Persistência Local
- [ ] Criar sistema de armazenamento local (FileStorage)
- [ ] Implementar importação de arquivos .gcs
- [ ] Criar tela de gerenciamento de fichas salvas
- [ ] Implementar cache de fichas abertas

### Bloco 5.3: Tratamento de Erros
- [ ] Implementar sistema centralizado de tratamento de erros
- [ ] Criar mensagens de erro amigáveis
- [ ] Implementar sistema de logging para debug
- [ ] Criar ErrorBoundary e hooks de error handling

### Bloco 5.4: Ancestries e Recursos Especiais
- [ ] Implementar parser de ancestries
- [ ] Criar visualização de name generator (read-only)
- [ ] Implementar parser de regras de dano customizadas
- [ ] Integrar recursos especiais do GURPS

## ✨ FASE 6: REFINAMENTO E POLIMENTO (PRIORIDADE BAIXA - FINAL)

### Bloco 6.1: Otimização de Performance
- [ ] Implementar lazy loading de dados
- [ ] Otimizar re-renderizações com React.memo
- [ ] Reduzir uso de memória com virtualization
- [ ] Implementar paginação para listas grandes

### Bloco 6.2: Testes de Integração Completos
- [ ] Criar suite completa de testes end-to-end com Detox
- [ ] Implementar testes de compatibilidade de versões
- [ ] Criar testes para casos limite e edge cases
- [ ] Configurar CI para rodar testes E2E

### Bloco 6.3: UX e Acessibilidade
- [ ] Refinar UX com feedback tátil e animações
- [ ] Implementar acessibilidade completa (WCAG AA)
- [ ] Criar suporte a temas (claro/escuro)
- [ ] Implementar customização visual

## 📊 Progresso Geral

- **Total de tarefas:** 96
- **Pendentes:** 68
- **Em progresso:** 0
- **Concluídas:** 28

## 🎯 Próximos Passos (Reorganizado por Prioridade)

1. **Continuar FASE 2** - Implementar TraitParser e SkillParser (Bloco 2.1)
2. **Avançar para Containers** - Sistema de Equipment com hierarquia (Bloco 2.2)
3. **Iniciar FASE 3** - Interface e Visualização (Bloco 3.1 - Navegação)
4. **Desenvolver UI Básica** - Componentes de lista e visualização (Bloco 3.2)
5. **Parsing Avançado** - Features e Modifiers (FASE 4 - Pós-MVP)

## 📝 Notas

- Cada tarefa deve seguir o padrão TDD (Testes Primeiro)
- Manter clean architecture em toda implementação
- Todos os componentes devem ter testes unitários
- Performance é prioridade, especialmente para listas grandes
- Acessibilidade WCAG AA deve ser mantida

## 🔗 Mapeamento com Prompt Plan (Reorganizado por Prioridade)

### ✅ FASE 1: FUNDAÇÕES (Concluída)
- **Prompt 1.1.1**: Inicialização do Projeto → Bloco 1.1 ✅
- **Prompt 1.1.2**: Configuração de CI/CD Básico → Bloco 1.4 ✅
- **Prompt 1.2.1**: Interface Base do Parser → Bloco 1.2 ✅
- **Prompt 1.2.2**: Detecção de Schema e Versão → Bloco 1.2 ✅
- **Prompt 1.3.1**: Modelos de Dados Básicos → Bloco 1.3 ✅
- **Prompt 1.3.2**: Sistema de Validação de Tipos → Bloco 1.3 ✅

### 🚀 FASE 2: PARSING BÁSICO (Em Progresso - MVP)
- **Prompt 2.1.1**: Parser de Informações de Personagem → Bloco 2.1 ✅
- **Prompt 2.1.2**: Parser de Traits Básicos → Bloco 2.1 (Próximo)
- **Prompt 2.1.3**: Parser de Skills Fundamentais → Bloco 2.1
- **Prompt 2.2.1**: Estrutura de Dados para Containers → Bloco 2.2
- **Prompt 2.2.2**: Parser de Equipamentos com Hierarquia → Bloco 2.2

### 🎨 FASE 3: INTERFACE (Próxima - MVP)
- **Prompt 3.1.1**: Estrutura de Navegação Principal → Bloco 3.1
- **Prompt 3.1.2**: Layout Responsivo Base → Bloco 3.1
- **Prompt 3.1.3**: Sistema de Gestão de Estado Global → Bloco 3.1
- **Prompt 3.2.1**: Componente de Lista de Traits → Bloco 3.2
- **Prompt 3.2.2**: Componente de Lista de Skills → Bloco 3.2
- **Prompt 3.2.3**: Tela de Visualização de Personagem → Bloco 3.2

### 🔧 FASE 4: PARSING AVANÇADO (Pós-MVP)
- **Prompt 2.3.1**: Modelos para Features e Modifiers → Bloco 4.1
- **Prompt 2.3.2**: Parser de Features e Modifiers → Bloco 4.1
- **Prompt 2.3.3**: Sistema de Prerequisites → Bloco 4.1
- **Prompt 2.3.4**: Parser de Campos de Estudo → Bloco 4.1
- **Prompt 2.4.1**: Sistema de Referência a Bibliotecas → Bloco 4.2
- **Prompt 2.4.2**: Detecção de Customizações → Bloco 4.2
- **Prompt 2.4.3**: Identificação de Itens Desatualizados → Bloco 4.2

### ⚡ FASE 5: FUNCIONALIDADES AVANÇADAS (Pós-MVP)
- **Prompt 4.1.1**: Sistema de Busca Base → Bloco 5.1
- **Prompt 4.1.2**: Filtros por Tipo e Categoria → Bloco 5.1
- **Prompt 4.1.3**: Integração de Busca e Filtros → Bloco 5.1
- **Prompt 4.2.1**: Sistema de Armazenamento Local → Bloco 5.2
- **Prompt 4.2.2**: Importação de Arquivos .gcs → Bloco 5.2
- **Prompt 4.2.3**: Gerenciamento de Fichas Salvas → Bloco 5.2
- **Prompt 4.3.1**: Sistema Centralizado de Tratamento de Erros → Bloco 5.3
- **Prompt 4.3.2**: Mensagens de Erro Amigáveis → Bloco 5.3
- **Prompt 4.3.3**: Sistema de Logging para Debug → Bloco 5.3
- **Prompt 4.4.1**: Parser de Ancestries → Bloco 5.4
- **Prompt 4.4.2**: Visualização de Name Generator → Bloco 5.4
- **Prompt 4.4.3**: Parser de Regras de Dano → Bloco 5.4

### ✨ FASE 6: REFINAMENTO (Final)
- **Prompt 5.1.1**: Lazy Loading de Dados → Bloco 6.1
- **Prompt 5.1.2**: Otimização de Re-renderizações → Bloco 6.1
- **Prompt 5.1.3**: Redução de Uso de Memória → Bloco 6.1
- **Prompt 5.2.1**: Testes End-to-End Completos → Bloco 6.2
- **Prompt 5.2.2**: Testes de Compatibilidade de Versões → Bloco 6.2
- **Prompt 5.2.3**: Testes de Casos Limite → Bloco 6.2
- **Prompt 5.3.1**: Refinamento de UX → Bloco 6.3
- **Prompt 5.3.2**: Acessibilidade Completa → Bloco 6.3
- **Prompt 5.3.3**: Temas e Customização Visual → Bloco 6.3

## 📋 Resumo da Reorganização por Prioridade

### ✅ FASE 1: FUNDAÇÕES (Concluída)
- Setup inicial, CI/CD, interfaces base, modelos e validação
- **Prioridade:** Essencial para qualquer desenvolvimento

### 🚀 FASE 2: PARSING BÁSICO (Em Progresso - MVP)
- CharacterParser ✅, TraitParser, SkillParser, Equipment com containers
- **Prioridade:** Alta - Permite leitura de arquivos GCS essenciais

### 🎨 FASE 3: INTERFACE (Próxima - MVP)
- Navegação, componentes de lista, visualização de dados
- **Prioridade:** Alta - Permite visualização dos dados parseados

### 🔧 FASE 4: PARSING AVANÇADO (Pós-MVP)
- Features, modifiers, prerequisites, bibliotecas
- **Prioridade:** Baixa - Enriquecimento de dados

### ⚡ FASE 5: FUNCIONALIDADES AVANÇADAS (Pós-MVP)
- Busca, filtros, persistência local, tratamento de erros
- **Prioridade:** Média - Melhoria da experiência

### ✨ FASE 6: REFINAMENTO (Final)
- Performance, testes E2E, UX, acessibilidade
- **Prioridade:** Baixa - Polimento e otimização

### 🎯 Fluxo Recomendado para MVP
1. **FASE 1** ✅ (Concluída)
2. **FASE 2** (2.1.1 ✅ → 2.1.2 → 2.1.3 → 2.2.1 → 2.2.2)
3. **FASE 3** (3.1.1 → 3.1.2 → 3.1.3 → 3.2.1 → 3.2.2 → 3.2.3)
4. **Entrega do MVP** com parsing e visualização básicos