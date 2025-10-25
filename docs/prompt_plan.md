# Roteiro Detalhado para Construção do Visualizador Mobile GCS

## Prompts para IA Geradora de Código

A seguir, apresento os prompts organizados sequencialmente, cada um construindo sobre os anteriores. Cada prompt é apresentado em bloco de código para facilitar o uso direto.[^1]

### FASE 1: FUNDAÇÕES E INFRAESTRUTURA BÁSICA

#### Prompt 1.1.1: Inicialização do Projeto
[x]
```
Crie a estrutura inicial de um projeto React Native/TypeScript para um aplicativo mobile de visualização de fichas GURPS Character Sheet (.gcs).

Requisitos:
1. Setup TypeScript com configuração strict
2. Estrutura de pastas modular seguindo clean architecture:
   - /src/domain (modelos e interfaces)
   - /src/data (parsers e repositórios)
   - /src/presentation (UI e componentes)
   - /src/infrastructure (utilitários)
3. Configuração do Jest para testes unitários
4. ESLint e Prettier configurados
5. Arquivo README.md com descrição do projeto

Entregas esperadas:
- package.json com dependências necessárias
- tsconfig.json com configurações apropriadas
- jest.config.js configurado
- Estrutura de pastas vazia mas organizada
- Scripts de teste no package.json

Teste de aceitação:
- npm test deve executar sem erros (mesmo sem testes ainda)
- npm run lint deve validar código
- Estrutura de pastas deve estar conforme especificado
```

#### Prompt 1.1.2: Configuração de CI/CD Básico
[x]
```
Configure um pipeline básico de CI/CD para o projeto React Native iniciado no prompt 1.1.1.

Contexto: Projeto já tem estrutura base, TypeScript, Jest e linting configurados.

Requisitos:
1. Arquivo .github/workflows/ci.yml para GitHub Actions
2. Pipeline deve executar:
   - Instalação de dependências
   - Linting
   - Testes unitários
   - Build TypeScript
3. Pipeline deve rodar em push para main e em pull requests
4. Adicionar badges no README.md

Entregas esperadas:
- .github/workflows/ci.yml funcional
- README.md atualizado com badges de status
- Documentação de como o CI funciona

Teste de aceitação:
- Push para repositório deve disparar pipeline
- Pipeline deve completar com sucesso
- Badges devem aparecer no README
```

#### Prompt 1.2.1: Interface Base do Parser
[x]
```
Crie a camada de abstração para parsing de arquivos .gcs com TDD.

Contexto: Projeto configurado com TypeScript e Jest. Arquivos .gcs são JSON contendo dados de personagens GURPS.

Requisitos:
1. Interface IFileParser em /src/domain/interfaces/IFileParser.ts:
   - Método parseFile(content: string): Promise<ParseResult>
   - Método detectSchema(content: string): SchemaVersion
2. Type ParseResult com campos success, data, errors
3. Enum SchemaVersion com versões conhecidas
4. Testes unitários PRIMEIRO, depois implementação mock

Entregas esperadas:
- /src/domain/interfaces/IFileParser.ts
- /src/domain/types/ParseResult.ts
- /src/domain/types/SchemaVersion.ts
- /tests/unit/domain/interfaces/IFileParser.test.ts (testes primeiro!)
- Implementação mock em /src/data/parsers/MockParser.ts

Teste de aceitação:
- Testes devem passar
- Interface deve ser exportável
- Mock parser deve retornar estrutura esperada
- Tipos devem estar bem definidos
```

#### Prompt 1.2.2: Detecção de Schema e Versão
[x]
```
Implemente o detector de schema e versão para arquivos .gcs com TDD.

Contexto: Interface IFileParser já existe. Precisamos detectar versão antes de processar.

Requisitos:
1. Criar SchemaDetector em /src/data/parsers/SchemaDetector.ts
2. Implementar lógica para:
   - Extrair campo de versão do arquivo
   - Mapear para SchemaVersion
   - Retornar "UNKNOWN" se não reconhecer
3. Escrever testes PRIMEIRO com casos:
   - JSON válido com versão 5
   - Arquivo sem versão
   - Arquivo malformado
4. Implementar após testes escritos

Entregas esperadas:
- /tests/unit/data/parsers/SchemaDetector.test.ts (primeiro!)
- /src/data/parsers/SchemaDetector.ts
- Arquivos de exemplo em /tests/fixtures/
- Documentação inline sobre formatos suportados

Teste de aceitação:
- Todos os testes devem passar
- Detector deve identificar JSON
- Detector deve extrair versão corretamente
- Detector deve retornar UNKNOWN para casos inválidos
```

#### Prompt 1.3.1: Modelos de Dados Básicos
[x]
```
Crie os modelos de dados fundamentais para entidades GURPS com TDD.

Contexto: Parser e detector prontos. Precisamos definir estruturas de dados core.

Requisitos:
1. Criar modelos modulares em /src/domain/models/:
   - Character.ts (version, id, total_points, created_date, modified_date)
   - CharacterProfile.ts (name, player_name, age, height, weight, etc)
   - CharacterAttributes.ts (st, dx, iq, ht, will, per, etc)
   - Trait.ts (id, name, cost, description, modifiers, features)
   - Skill.ts (id, name, level, difficulty, attribute, specialization)
   - Spell.ts (id, name, level, college, cost, time, duration)
   - Equipment.ts (id, name, quantity, weight, cost, children)
2. Todas as interfaces devem ter:
   - Campos obrigatórios bem definidos
   - Campos opcionais marcados com ?
   - JSDoc documentando cada campo
3. Criar funções de validação para cada modelo
4. Escrever testes PRIMEIRO validando:
   - Instanciação válida
   - Campos obrigatórios ausentes
   - Tipos incorretos

Entregas esperadas:
- /src/domain/models/CharacterBasic.ts (container principal)
- /src/domain/models/CharacterProfile.ts
- /src/domain/models/CharacterAttributes.ts
- /src/domain/models/Trait.ts
- /src/domain/models/Skill.ts
- /src/domain/models/Spell.ts
- /src/domain/models/Equipment.ts
- /tests/unit/domain/models/*.test.ts (primeiro!)
- /src/domain/validators/*.ts

Teste de aceitação:
- Testes de validação devem passar
- Modelos devem ser type-safe
- JSDoc deve estar completo
- Validadores devem rejeitar dados inválidos
```

#### Prompt 1.3.2: Sistema de Validação de Tipos
[x]
```
Implemente sistema robusto de validação de tipos para os modelos criados.

Contexto: Modelos básicos (Character, Trait, Skill, Spell, Equipment) já existem. Precisamos validar dados parseados.

Requisitos:
1. Criar TypeGuards em /src/domain/guards/:
   - isCharacter(obj: unknown): obj is Character
   - isTrait(obj: unknown): obj is Trait
   - isSkill(obj: unknown): obj is Skill
   - isSpell(obj: unknown): obj is Spell
2. Implementar validação profunda (não apenas verificar existência de campos)
3. Escrever testes PRIMEIRO com casos:
   - Objetos válidos
   - Campos faltando
   - Tipos errados
   - Valores nulos/undefined
4. Documentar regras de validação

Entregas esperadas:
- /tests/unit/domain/guards/*.test.ts (primeiro!)
- /src/domain/guards/Character.guard.ts
- /src/domain/guards/Trait.guard.ts
- /src/domain/guards/Skill.guard.ts
- /src/domain/guards/Spell.guard.ts
- /src/domain/guards/Equipment.guard.ts

Teste de aceitação:
- Guards devem detectar objetos inválidos
- Type narrowing do TypeScript deve funcionar
- Testes devem cobrir casos limite
- Performance deve ser adequada (< 1ms por validação)
```


### FASE 2: PARSING BÁSICO (PRIORIDADE ALTA - MVP)

#### Prompt 2.1.1: Parser de Informações de Personagem
[x]
```
Implemente parser para dados básicos do personagem com TDD. Este é o primeiro passo para permitir leitura de arquivos GCS.

Contexto: Modelos básicos (CharacterBasic, CharacterProfile, CharacterAttributes) e validadores prontos. SchemaDetector funcional. Parseamos dados root do Character para entregar valor rápido.

Requisitos:
1. Criar CharacterParser em /src/data/parsers/CharacterParser.ts
2. Implementar parseCharacter(data: unknown): CharacterBasic (usando modelo existente)
3. Suportar campos essenciais:
   - id, name, total_points (obrigatórios)
   - player, campaign, created, modified (opcionais)
   - attributes (ST, DX, IQ, HT) via CharacterAttributes
4. Escrever testes PRIMEIRO com:
   - Character completo com todos os campos
   - Character mínimo (só obrigatórios)
   - Character com attributes
   - Dados inválidos (deve retornar erro, não crash)
5. Integrar com validadores e guards existentes

Entregas esperadas:
- /tests/unit/data/parsers/CharacterParser.test.ts (primeiro!)
- /src/data/parsers/CharacterParser.ts
- Integração com modelos CharacterBasic, CharacterProfile, CharacterAttributes

Teste de aceitação:
- Parser deve criar objeto Character válido para visualização básica
- Attributes devem ser parseados e validados
- Parser deve ser robusto contra dados inválidos
- Cobertura de testes > 90%
```

#### Prompt 2.1.2: Parser de Traits Básicos
```
Implemente parser para traits básicos de GURPS com TDD, construindo sobre o CharacterParser.

Contexto: CharacterParser implementado. Modelos Trait e validadores prontos. Agora parseamos traits para enriquecer a visualização.

Requisitos:
1. Criar TraitParser em /src/data/parsers/TraitParser.ts
2. Implementar parseTraits(data: unknown): Trait[]
3. Suportar campos:
   - id, name, cost (obrigatórios)
   - description, reference, notes (opcionais)
4. Escrever testes PRIMEIRO com:
   - Array de traits válidos
   - Trait com campos opcionais ausentes
   - Trait malformado (deve retornar erro, não crash)
   - Array vazio
5. Integrar com validadores e guards de Trait

Entregas esperadas:
- /tests/unit/data/parsers/TraitParser.test.ts (primeiro!)
- /tests/fixtures/traits.json (dados de exemplo)
- /src/data/parsers/TraitParser.ts
- Tratamento de erros documentado

Teste de aceitação:
- Parser deve retornar array de Trait válidos
- Parser não deve crashar com dados inválidos
- Parser deve usar type guards existentes
- Testes devem ter cobertura > 90%
```

#### Prompt 2.1.3: Parser de Skills Fundamentais (Prioridade Alta)
```
Implemente parser para skills de GURPS com TDD, seguindo padrão do TraitParser.

Contexto: Parsers de Character e Trait funcionais. Modelo Skill pronto. Aplicar mesmo padrão para skills.

Requisitos:
1. Criar SkillParser em /src/data/parsers/SkillParser.ts
2. Implementar parseSkills(data: unknown): Skill[]
3. Suportar campos:
   - id, name, level, difficulty, attribute (obrigatórios)
   - specialization, techLevel, points (opcionais)
4. Escrever testes PRIMEIRO com:
   - Skills válidos
   - Skills com diferentes attributes (DX, IQ, etc)
   - Skills com specialization
   - Dados inválidos
5. Reutilizar padrões do TraitParser e integrar com guards

Entregas esperadas:
- /tests/unit/data/parsers/SkillParser.test.ts (primeiro!)
- /tests/fixtures/skills.json
- /src/data/parsers/SkillParser.ts
- Documentação de campos GURPS

Teste de aceitação:
- Parser deve processar todos os campos corretamente
- Attributes devem ser validados
- Padrão de código consistente com parsers anteriores
- Cobertura de testes > 90%
```


#### Prompt 2.2.1: Estrutura de Dados para Containers (Prioridade Média)
```
Crie modelo de dados recursivo para containers (equipamentos hierárquicos) com TDD. Essencial para visualização de equipamentos aninhados.

Contexto: Modelos básicos e parsers de Character/Traits/Skills prontos. Modelo Equipment já existe, mas precisa de suporte a recursividade.

Requisitos:
1. Atualizar Equipment model em /src/domain/models/Equipment.ts para suportar:
   - children: Equipment[] (para recursividade)
   - isContainer: boolean (calculado automaticamente)
2. Criar EquipmentTree helper em /src/domain/helpers/EquipmentTree.ts:
   - flatten(equipment: Equipment[]): Equipment[]
   - getDepth(equipment: Equipment): number
   - findById(tree: Equipment[], id: string): Equipment | null
3. Escrever testes PRIMEIRO:
   - Equipment simples (sem filhos)
   - Container com 1-2 níveis de filhos (para MVP)
   - Helper functions com casos limite

Entregas esperadas:
- /tests/unit/domain/models/Equipment.test.ts (primeiro!)
- /tests/unit/domain/helpers/EquipmentTree.test.ts (primeiro!)
- Atualizar /src/domain/models/Equipment.ts
- /src/domain/helpers/EquipmentTree.ts
- Diagrama de estrutura em comentários

Teste de aceitação:
- Modelo deve suportar recursão para equipamentos básicos
- Helpers devem navegar árvore corretamente
- Performance adequada (< 10ms para 100 itens)
- Integração com guard e validator existentes
```

#### Prompt 2.2.2: Parser de Equipamentos com Hierarquia (Prioridade Média)
```
Implemente parser recursivo para equipamentos e containers com TDD.

Contexto: Equipment model e helpers atualizados. Agora parseamos estruturas hierárquicas para completar o parsing básico.

Requisitos:
1. Criar EquipmentParser em /src/data/parsers/EquipmentParser.ts
2. Implementar parseEquipment(data: unknown): Equipment[]
3. Parser deve:
   - Processar recursivamente children (até 2-3 níveis para MVP)
   - Validar integridade da árvore
   - Calcular peso total considerando children
   - Marcar isContainer automaticamente
4. Escrever testes PRIMEIRO:
   - Lista simples de equipamentos
   - Container com 1-2 níveis
   - Container vazio
   - Dados malformados
5. Usar EquipmentTree helpers nos testes

Entregas esperadas:
- /tests/unit/data/parsers/EquipmentParser.test.ts (primeiro!)
- /tests/fixtures/equipment-simple.json
- /tests/fixtures/equipment-nested.json
- /src/data/parsers/EquipmentParser.ts

Teste de aceitação:
- Parser deve construir árvore correta para casos comuns
- Recursão deve funcionar para profundidade limitada
- Parser não deve permitir ciclos
- Testes devem verificar estrutura completa
```

#### Prompt 2.2.3: Algoritmo de Navegação em Árvore (Prioridade Média - Opcional para MVP)
```
Implemente algoritmos eficientes de navegação na árvore de equipamentos.

Contexto: EquipmentParser funcional. Essencial para UI de drill-down, mas pode ser adiado se foco for em listas simples.

Requisitos:
1. Estender EquipmentTree helper com:
   - getPath(tree: Equipment[], id: string): Equipment[]
   - getParent(tree: Equipment[], childId: string): Equipment | null
   - getSiblings(tree: Equipment[], id: string): Equipment[]
   - getTotalWeight(equipment: Equipment): number (recursivo)
2. Escrever testes PRIMEIRO:
   - getPath para item em container
   - getParent para diferentes níveis
   - getSiblings em contextos simples
   - getTotalWeight para containers
3. Otimizar para performance

Entregas esperadas:
- /tests/unit/domain/helpers/EquipmentTree.navigation.test.ts (primeiro!)
- Atualizar /src/domain/helpers/EquipmentTree.ts
- Documentar complexidade algorítmica

Teste de aceitação:
- getPath deve retornar caminho completo
- getTotalWeight deve somar recursivamente
- Performance adequada (< 5ms para 50 itens)
- Todos os testes passando
```


#### Prompt 2.3.1: Modelos para Features e Modifiers (Prioridade Baixa - Adiar para Pós-MVP)

**Nota:** Estes modelos são avançados e não essenciais para leitura básica de arquivos GCS. Adiar implementação até que o MVP (parsing e visualização simples) esteja funcional.

```
Crie modelos de dados para features, modifiers e conditions do GURPS com TDD.

Contexto: Modelos básicos prontos. GURPS tem campos avançados que modificam traits/skills/etc. Implementar apenas se necessário para casos específicos.

Requisitos:
1. Criar models em /src/domain/models/:
   - Feature.ts (type, amount, perLevel, etc)
   - Modifier.ts (name, cost, affects, notes)
   - Condition.ts (name, active, effects[])
   - Reaction.ts (modifier, situation)
2. Criar enum FeatureType (AttributeBonus, SkillBonus, DRBonus, etc)
3. Criar enum ModifierCostType (Percentage, Points, Multiplier)
4. Escrever testes PRIMEIRO:
   - Criação de cada tipo
   - Validação de campos
   - Type guards
   - Serialização/deserialização

Entregas esperadas:
- /tests/unit/domain/models/Feature.test.ts (primeiro!)
- /tests/unit/domain/models/Modifier.test.ts (primeiro!)
- /tests/unit/domain/models/Condition.test.ts (primeiro!)
- /tests/unit/domain/models/Reaction.test.ts (primeiro!)
- /src/domain/models/Feature.ts
- /src/domain/models/Modifier.ts
- /src/domain/models/Condition.ts
- /src/domain/models/Reaction.ts
- /src/domain/enums/FeatureType.ts

Teste de aceitação:
- Modelos devem representar conceitos GURPS corretamente
- Type guards devem funcionar
- Documentação inline deve explicar conceitos
- Testes devem cobrir todos os tipos
```


#### Prompt 2.3.2: Parser de Features e Modifiers (Prioridade Baixa - Adiar)

**Nota:** Parser avançado. Implementar apenas após MVP para enriquecer dados.

```
Implemente parsers para features e modifiers com TDD.

Contexto: Modelos de Feature e Modifier prontos. Agora parseamos do arquivo .gcs.

Requisitos:
1. Criar FeatureParser em /src/data/parsers/FeatureParser.ts
2. Implementar parseFeatures(data: unknown): Feature[]
3. Criar ModifierParser em /src/data/parsers/ModifierParser.ts
4. Implementar parseModifiers(data: unknown): Modifier[]
5. Ambos devem:
   - Validar tipos de feature/modifier
   - Processar campos opcionais
   - Retornar erros claros
6. Escrever testes PRIMEIRO:
   - Cada tipo de feature
   - Cada tipo de modifier
   - Combinações complexas
   - Dados inválidos

Entregas esperadas:
- /tests/unit/data/parsers/FeatureParser.test.ts (primeiro!)
- /tests/unit/data/parsers/ModifierParser.test.ts (primeiro!)
- /tests/fixtures/features.json
- /tests/fixtures/modifiers.json
- /src/data/parsers/FeatureParser.ts
- /src/data/parsers/ModifierParser.ts

Teste de aceitação:
- Parsers devem processar todos os tipos
- Erros devem ser informativos
- Integração com models funcionando
- Cobertura > 90%
```


#### Prompt 2.3.3: Sistema de Prerequisites (Prereqs) (Prioridade Baixa - Adiar)

**Nota:** Funcionalidade avançada para validação de regras. Não essencial para leitura básica.

```
Implemente sistema de prerequisites para traits/skills/spells com TDD.

Contexto: GURPS tem sistema complexo de prereqs (requer trait X OU skill Y no nível Z).

Requisitos:
1. Criar Prereq model em /src/domain/models/Prereq.ts:
   - type (Trait, Skill, Attribute, Advantage)
   - qualifier (nome/id do prereq)
   - level (valor mínimo)
   - has (booleano, deve ter ou não ter)
2. Criar PrereqList model (lista com operador AND/OR)
3. Criar PrereqChecker em /src/domain/services/PrereqChecker.ts:
   - checkPrereqs(character: Character, prereqs: PrereqList): boolean (usando apenas campos básicos)
4. Escrever testes PRIMEIRO:
   - Prereq simples satisfeito
   - Prereq simples não satisfeito
   - Lista AND (todos devem satisfazer)
   - Lista OR (pelo menos um)
   - Listas aninhadas (AND dentro de OR)

Entregas esperadas:
- /tests/unit/domain/models/Prereq.test.ts (primeiro!)
- /tests/unit/domain/services/PrereqChecker.test.ts (primeiro!)
- /src/domain/models/Prereq.ts
- /src/domain/models/PrereqList.ts
- /src/domain/services/PrereqChecker.ts

Teste de aceitação:
- Checker deve avaliar lógica booleana corretamente
- Suporte para listas aninhadas
- Performance adequada
- Documentação de exemplos GURPS
```


#### Prompt 2.3.4: Parser de Campos de Estudo (Study) (Prioridade Baixa - Adiar)

**Nota:** Rastreamento de progresso é avançado. Adiar para versões futuras.

```
Implemente parser para campos de estudo (study fields) com TDD.

Contexto: GURPS permite rastreamento de horas de estudo para skills/spells.

Requisitos:
1. Criar Study model em /src/domain/models/Study.ts:
   - targetId (skill/spell sendo estudado)
   - hoursSpent (horas dedicadas)
   - hoursNeeded (horas necessárias para próximo nível)
   - status (NotStarted, InProgress, Completed)
2. Criar StudyParser em /src/data/parsers/StudyParser.ts
3. Implementar parseStudy(data: unknown): Study[]
4. Escrever testes PRIMEIRO:
   - Study em progresso
   - Study completado
   - Study não iniciado
   - Validação de horas (não negativas)

Entregas esperadas:
- /tests/unit/domain/models/Study.test.ts (primeiro!)
- /tests/unit/data/parsers/StudyParser.test.ts (primeiro!)
- /tests/fixtures/study.json
- /src/domain/models/Study.ts
- /src/domain/enums/StudyStatus.ts
- /src/data/parsers/StudyParser.ts

Teste de aceitação:
- Parser deve processar todos os estados
- Validação de horas funcionando
- Cálculo de progresso (hoursSpent/hoursNeeded)
- Integração com Skills/Spells
```


#### Prompt 2.4.1: Sistema de Referência a Bibliotecas (Prioridade Baixa - Adiar para Pós-MVP)

**Nota:** Sistema de bibliotecas é útil para validação avançada, mas não essencial para leitura básica de arquivos GCS. Adiar até que o app suporte funcionalidades como detecção de customizações.

```
Implemente sistema de carregamento e referência de bibliotecas externas com TDD.

Contexto: Fichas referenciam itens de bibliotecas. Precisamos carregar e resolver referências. Implementar apenas se necessário para casos específicos.

Requisitos:
1. Criar Library model em /src/domain/models/Library.ts:
   - id, name, version
   - traits, skills, spells, equipment (coleções)
   - isOfficial (boolean)
2. Criar LibraryRepository em /src/data/repositories/LibraryRepository.ts:
   - loadLibrary(path: string): Promise<Library>
   - getItemById(libraryId: string, itemId: string): LibraryItem | null
   - getAllLibraries(): Library[]
3. Criar LibraryItem union type (Trait | Skill | Spell | Equipment)
4. Escrever testes PRIMEIRO:
   - Carregar biblioteca válida
   - Buscar item por ID
   - Biblioteca não encontrada
   - Item não encontrado

Entregas esperadas:
- /tests/unit/domain/models/Library.test.ts (primeiro!)
- /tests/unit/data/repositories/LibraryRepository.test.ts (primeiro!)
- /tests/fixtures/library-official.json
- /tests/fixtures/library-custom.json
- /src/domain/models/Library.ts
- /src/domain/types/LibraryItem.ts
- /src/data/repositories/LibraryRepository.ts

Teste de aceitação:
- Repository deve carregar múltiplas bibliotecas
- Busca por ID deve ser eficiente (< 1ms)
- Bibliotecas devem ser imutáveis após carregadas
- Tratamento de erros robusto
```


#### Prompt 2.4.2: Detecção de Customizações (Prioridade Baixa - Adiar)

**Nota:** Detecção de customizações é uma feature avançada. Adiar para versões futuras focadas em validação.

```
Implemente sistema de detecção de itens customizados com TDD.

Contexto: LibraryRepository pronto. Precisamos identificar itens customizados vs oficiais.

Requisitos:
1. Criar CustomizationDetector em /src/domain/services/CustomizationDetector.ts
2. Implementar isCustomized(item: LibraryItem, libraries: Library[]): boolean
3. Lógica:
   - Item customizado se não existe em nenhuma biblioteca oficial
   - Item customizado se campos foram modificados em relação à biblioteca
4. Criar CustomizationInfo type:
   - isCustomized: boolean
   - originalLibrary?: string
   - modifiedFields?: string[]
5. Escrever testes PRIMEIRO:
   - Item oficial não modificado
   - Item oficial modificado
   - Item totalmente customizado
   - Item de biblioteca custom

Entregas esperadas:
- /tests/unit/domain/services/CustomizationDetector.test.ts (primeiro!)
- /src/domain/services/CustomizationDetector.ts
- /src/domain/types/CustomizationInfo.ts
- Documentação de critérios

Teste de aceitação:
- Detector deve identificar customizações corretamente
- Deve listar campos modificados
- Performance adequada para fichas grandes
- Integração com LibraryRepository
```


#### Prompt 2.4.3: Identificação de Itens Desatualizados (Prioridade Baixa - Adiar)

**Nota:** Verificação de versões é útil para manutenção, mas não para leitura inicial. Adiar.

```
Implemente sistema de detecção de itens desatualizados com TDD.

Contexto: CustomizationDetector pronto. Agora detectamos itens desatualizados em relação às bibliotecas.

Requisitos:
1. Criar VersionChecker em /src/domain/services/VersionChecker.ts
2. Implementar isOutdated(item: LibraryItem, libraries: Library[]): boolean
3. Lógica:
   - Item desatualizado se version < biblioteca atual
   - Comparar hash de conteúdo se version não disponível
4. Criar OutdatedInfo type:
   - isOutdated: boolean
   - currentVersion: string
   - latestVersion: string
   - changesSummary?: string[]
5. Escrever testes PRIMEIRO:
   - Item atualizado
   - Item com versão antiga
   - Item sem informação de versão
   - Biblioteca mais antiga que item

Entregas esperadas:
- /tests/unit/domain/services/VersionChecker.test.ts (primeiro!)
- /src/domain/services/VersionChecker.ts
- /src/domain/types/OutdatedInfo.ts
- /src/infrastructure/utils/hash.ts (para comparação)

Teste de aceitação:
- Checker deve detectar versões antigas
- Deve funcionar sem campo version
- Integração com LibraryRepository
- Performance adequada
```

**Próximos Passos Após FASE 2:** Com o parsing básico implementado (Prompts 2.1.1 a 2.2.2), o app já pode ler e processar arquivos GCS essenciais. Para entregar valor rápido, transite para FASE 3 (Interface e Visualização) para criar telas simples que exibam os dados parseados (Character, Traits, Skills, Equipment). Isso permite testar o parsing com UI real e disponibilizar o app para leitura básica.

**Próximos Passos Após FASE 3:** Com a interface básica funcional, o app já permite visualização dos dados essenciais. A FASE 4 (Parsing Avançado) pode ser implementada posteriormente para enriquecer os dados com features, modifiers e prerequisites. A FASE 5 (Funcionalidades Avançadas) adiciona busca, filtros e persistência local. A FASE 6 (Refinamento) foca em performance, testes E2E e acessibilidade.

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

### FASE 3: INTERFACE E VISUALIZAÇÃO (PRIORIDADE ALTA - MVP)

#### Prompt 3.1.1: Estrutura de Navegação Principal

```
Crie estrutura de navegação base do app com React Navigation e TDD.

Contexto: Lógica de parsing pronta. Agora construímos UI. App terá bottom tabs para diferentes seções.

Requisitos:
1. Instalar e configurar React Navigation (bottom tabs)
2. Criar telas placeholder em /src/presentation/screens/:
   - CharacterScreen
   - TraitsScreen
   - SkillsScreen
   - EquipmentScreen
   - SpellsScreen
3. Configurar navegação em /src/presentation/navigation/AppNavigator.tsx
4. Criar testes para navegação:
   - Todas as tabs acessíveis
   - Deep linking funcionando
   - Estado preservado entre tabs

Entregas esperadas:
- /src/presentation/navigation/AppNavigator.tsx
- /src/presentation/screens/CharacterScreen.tsx (placeholder)
- /src/presentation/screens/TraitsScreen.tsx (placeholder)
- /src/presentation/screens/SkillsScreen.tsx (placeholder)
- /src/presentation/screens/EquipmentScreen.tsx (placeholder)
- /src/presentation/screens/SpellsScreen.tsx (placeholder)
- /tests/integration/navigation/AppNavigator.test.tsx

Teste de aceitação:
- App deve iniciar sem erros
- Todas as 5 tabs devem aparecer no bottom menu
- Navegação entre tabs deve funcionar
- Testes de navegação passando
```


#### Prompt 3.1.2: Layout Responsivo Base

```
Implemente sistema de layout responsivo e temas com styled-components.

Contexto: Navegação básica pronta. Precisamos de sistema de design consistente.

Requisitos:
1. Instalar styled-components
2. Criar theme em /src/presentation/theme/:
   - colors.ts (paleta de cores)
   - spacing.ts (espaçamentos consistentes)
   - typography.ts (fontes e tamanhos)
   - breakpoints.ts (responsive)
3. Criar ThemeProvider wrapper
4. Criar componentes base em /src/presentation/components/base/:
   - Container
   - Text
   - Card
   - Button
5. Escrever testes para componentes base

Entregas esperadas:
- /src/presentation/theme/colors.ts
- /src/presentation/theme/spacing.ts
- /src/presentation/theme/typography.ts
- /src/presentation/theme/index.ts
- /src/presentation/components/base/*.tsx
- /tests/unit/presentation/components/base/*.test.tsx

Teste de aceitação:
- ThemeProvider deve injetar tema
- Componentes base devem usar tema
- Responsividade deve funcionar
- Testes de renderização passando
```


#### Prompt 3.1.3: Sistema de Gestão de Estado Global

```
Configure sistema de gestão de estado com Zustand para o app.

Contexto: UI base pronta. Precisamos gerenciar estado global (personagem carregado, bibliotecas, etc).

Requisitos:
1. Instalar Zustand
2. Criar stores em /src/presentation/store/:
   - characterStore.ts (personagem atual)
   - libraryStore.ts (bibliotecas carregadas)
   - uiStore.ts (estado de UI - modals, loading, etc)
3. Cada store deve ter:
   - State interface
   - Actions (set*, clear*, etc)
   - Selectors
4. Escrever testes para stores:
   - Estado inicial correto
   - Actions modificam estado
   - Selectors retornam valores corretos

Entregas esperadas:
- /src/presentation/store/characterStore.ts
- /src/presentation/store/libraryStore.ts
- /src/presentation/store/uiStore.ts
- /tests/unit/presentation/store/*.test.ts
- Documentação de uso dos stores

Teste de aceitação:
- Stores devem ser type-safe
- Actions devem ser imutáveis
- Testes devem cobrir todos os casos
- Performance adequada (< 1ms por action)
```


#### Prompt 3.2.1: Componente de Lista de Traits

```
Crie componente para exibir lista de traits com TDD.

Contexto: Stores prontos. TraitParser funcional. Agora renderizamos traits na UI.

Requisitos:
1. Criar TraitList em /src/presentation/components/traits/TraitList.tsx:
   - Recebe traits: Trait[]
   - Renderiza lista com FlatList
   - Cada item mostra nome, custo, descrição curta
   - Tap no item mostra detalhes
2. Criar TraitItem component
3. Escrever testes PRIMEIRO:
   - Lista vazia
   - Lista com 1 trait
   - Lista com 10+ traits
   - Tap em item

Entregas esperadas:
- /tests/unit/presentation/components/traits/TraitList.test.tsx (primeiro!)
- /src/presentation/components/traits/TraitList.tsx
- /src/presentation/components/traits/TraitItem.tsx
- Snapshot tests

Teste de aceitação:
- Lista deve renderizar corretamente
- Performance adequada (60fps)
- Tap deve funcionar
- Testes passando com coverage > 80%
```


#### Prompt 3.2.2: Componente de Lista de Skills

```
Crie componente para exibir lista de skills com TDD, seguindo padrão do TraitList.

Contexto: TraitList pronto e funcionando. Aplicar mesmo padrão para skills.

Requisitos:
1. Criar SkillList em /src/presentation/components/skills/SkillList.tsx
2. Criar SkillItem component
3. Exibir:
   - Nome do skill
   - Level atual
   - Attribute base (DX, IQ, etc)
   - Specialization (se houver)
4. Escrever testes PRIMEIRO:
   - Lista vazia
   - Skills com diferentes attributes
   - Skills com specialization
   - Ordenação por nome

Entregas esperadas:
- /tests/unit/presentation/components/skills/SkillList.test.tsx (primeiro!)
- /src/presentation/components/skills/SkillList.tsx
- /src/presentation/components/skills/SkillItem.tsx
- Reutilizar componentes base

Teste de aceitação:
- Lista deve renderizar skills corretamente
- Attributes devem ter cores distintas
- Performance adequada
- Consistência com TraitList
```


#### Prompt 3.2.3: Tela de Visualização de Personagem

```
Implemente tela principal de visualização do personagem com integração completa.

Contexto: Componentes de lista prontos. Stores funcionando. Agora integramos tudo na CharacterScreen.

Requisitos:
1. Atualizar CharacterScreen para:
   - Buscar character do characterStore
   - Exibir informações básicas no topo (nome, pontos, attributes)
   - Renderizar seções scrolláveis (traits, skills, vantagens, desvantagens)
   - Loading state enquanto carrega
   - Empty state se não há personagem
2. Criar CardSection component para agrupar seções
3. Escrever testes de integração:
   - Tela com personagem carregado
   - Tela vazia (sem personagem)
   - Loading state
   - Navegação para detalhes

Entregas esperadas:
- /tests/integration/presentation/screens/CharacterScreen.test.tsx
- /src/presentation/screens/CharacterScreen.tsx (completa)
- /src/presentation/components/character/CharacterHeader.tsx
- /src/presentation/components/common/CardSection.tsx

Teste de aceitação:
- Tela deve integrar com store
- Todas as seções devem aparecer
- Performance adequada com personagem grande
- Estados de loading/empty funcionando
```


#### Prompt 3.3.1: Componente de Hierarquia Visual para Equipment

```
Crie componente para exibir equipamentos com hierarquia visual (indentação) com TDD.

Contexto: EquipmentParser e helpers prontos. Precisamos renderizar árvore visualmente.

Requisitos:
1. Criar EquipmentTree em /src/presentation/components/equipment/EquipmentTree.tsx
2. Implementar renderização recursiva:
   - Indentação baseada em profundidade
   - Ícone de container (seta expansível)
   - Expand/collapse de containers
   - Exibir nome, quantidade, peso
3. Criar EquipmentNode component (recursivo)
4. Escrever testes PRIMEIRO:
   - Lista simples (sem containers)
   - Container com 1 nível
   - Container aninhado (3 níveis)
   - Expand/collapse funcionando
   - Performance com muitos itens

Entregas esperadas:
- /tests/unit/presentation/components/equipment/EquipmentTree.test.tsx (primeiro!)
- /src/presentation/components/equipment/EquipmentTree.tsx
- /src/presentation/components/equipment/EquipmentNode.tsx
- Hook useEquipmentExpansion para gerenciar estado

Teste de aceitação:
- Hierarquia visual deve ser clara
- Expand/collapse deve funcionar recursivamente
- Performance adequada (60fps com 100 itens)
- Indentação proporcional à profundidade
```


#### Prompt 3.3.2: Sistema de Drill-down em Equipamentos

```
Implemente navegação drill-down para explorar containers com TDD.

Contexto: EquipmentTree com expand/collapse pronto. Agora adicionamos navegação por toque.

Requisitos:
1. Criar EquipmentDetailScreen em /src/presentation/screens/EquipmentDetailScreen.tsx
2. Ao tocar em container, navegar para tela mostrando apenas seus filhos
3. Breadcrumb no topo mostrando caminho (Root > Mochila > Frascos)
4. Botão voltar para nível anterior
5. Exibir peso total do container e quantidade de itens
6. Escrever testes PRIMEIRO:
   - Navegação para container
   - Breadcrumb correto
   - Voltar funciona
   - Peso total calculado

Entregas esperadas:
- /tests/integration/presentation/screens/EquipmentDetailScreen.test.tsx (primeiro!)
- /src/presentation/screens/EquipmentDetailScreen.tsx
- /src/presentation/components/equipment/EquipmentBreadcrumb.tsx
- Integração com navigation stack

Teste de aceitação:
- Drill-down deve funcionar para qualquer profundidade
- Breadcrumb deve mostrar caminho completo
- Peso e contagem devem estar corretos
- Performance adequada
```

#### Prompt 3.3.3: Gestos de Navegação (Swipe)

```
Adicione suporte a gestos de swipe para navegação entre tabs com TDD.

Contexto: Navegação por tabs pronta. Adicionar gestos para melhorar UX mobile.

Requisitos:
1. Instalar react-native-gesture-handler
2. Configurar swipe left/right entre tabs principais
3. Feedback visual durante swipe (indicador de próxima tab)
4. Swipe deve respeitar limites (não swipe beyond última tab)
5. Escrever testes para gestos:
   - Swipe right vai para próxima tab
   - Swipe left vai para tab anterior
   - Swipe nas bordas não faz nada
   - Cancelar swipe mantém tab atual

Entregas esperadas:
- /tests/integration/presentation/navigation/GestureNavigation.test.tsx
- Atualizar AppNavigator.tsx com gesture handler
- /src/presentation/components/navigation/SwipeIndicator.tsx
- Configuração de gestos

Teste de aceitação:
- Swipe deve funcionar suavemente (60fps)
- Feedback visual deve aparecer
- Gestos devem respeitar limites
- Testes de gestos passando
```


#### Prompt 3.4.1: Sistema de Badges e Indicadores

```
Crie sistema de badges para marcar customizações, modifiers e conditions com TDD.

Contexto: UI base pronta. Precisamos de indicadores visuais para estados especiais.

Requisitos:
1. Criar Badge component em /src/presentation/components/common/Badge.tsx:
   - Variantes: custom, outdated, active, bonus, penalty
   - Cores distintas por tipo
   - Tamanho small/medium/large
   - Opcional: texto ou ícone
2. Criar BadgeContainer para agrupar múltiplos badges
3. Escrever testes PRIMEIRO:
   - Cada variante renderiza corretamente
   - Cores estão corretas
   - Tamanhos funcionam
   - Acessibilidade (labels)

Entregas esperadas:
- /tests/unit/presentation/components/common/Badge.test.tsx (primeiro!)
- /src/presentation/components/common/Badge.tsx
- /src/presentation/components/common/BadgeContainer.tsx
- Integração com tema (cores)

Teste de aceitação:
- Badges devem ser visualmente distintos
- Cores devem seguir tema
- Acessibilidade deve estar ok
- Snapshots devem estar estáveis
```

#### Prompt 3.4.2: Marcadores de Customização e Desatualização

```
Integre badges de customização e desatualização nos componentes de lista com TDD.

Contexto: Badge component pronto. CustomizationDetector e VersionChecker funcionais. Agora integramos.

Requisitos:
1. Atualizar TraitItem, SkillItem, EquipmentNode para:
   - Verificar se item é customizado (usar CustomizationDetector)
   - Verificar se item está desatualizado (usar VersionChecker)
   - Renderizar badges apropriados
2. Criar hook useItemStatus que encapsula as verificações
3. Escrever testes PRIMEIRO:
   - Item oficial: sem badges
   - Item customizado: badge "Custom"
   - Item desatualizado: badge "Outdated"
   - Item customizado E desatualizado: ambos badges

Entregas esperadas:
- /tests/unit/presentation/hooks/useItemStatus.test.ts (primeiro!)
- /src/presentation/hooks/useItemStatus.ts
- Atualizar TraitItem.tsx, SkillItem.tsx, EquipmentNode.tsx
- /tests/integration/presentation/components/ItemBadges.test.tsx

Teste de aceitação:
- Badges devem aparecer corretamente
- Performance não deve degradar
- Hook deve cachear resultados
- Integração com services funcionando
```

#### Prompt 3.4.3: Visualização de Modifiers e Reactions

```
Crie componentes para exibir modifiers e reactions com TDD.

Contexto: Modelos e parsers de Modifier/Reaction prontos. Agora renderizamos na UI.

Requisitos:
1. Criar ModifierList em /src/presentation/components/modifiers/ModifierList.tsx:
   - Lista de modifiers aplicados
   - Exibir nome, valor, situação
   - Badge de bonus (verde) ou penalty (vermelho)
2. Criar ReactionList similar
3. Integrar nas telas de detalhes (TraitDetail, SkillDetail, etc)
4. Escrever testes PRIMEIRO:
   - Lista vazia
   - Modifiers positivos e negativos
   - Reactions diversas
   - Performance com muitos modifiers

Entregas esperadas:
- /tests/unit/presentation/components/modifiers/ModifierList.test.tsx (primeiro!)
- /tests/unit/presentation/components/modifiers/ReactionList.test.tsx (primeiro!)
- /src/presentation/components/modifiers/ModifierList.tsx
- /src/presentation/components/modifiers/ReactionList.tsx
- /src/presentation/screens/TraitDetailScreen.tsx (integração)

Teste de aceitação:
- Modifiers devem ter cores apropriadas
- Reactions devem ser legíveis
- Performance adequada
- Integração em telas de detalhe funcionando
```


### FASE 4: PARSING AVANÇADO (PRIORIDADE BAIXA - PÓS-MVP)

#### Prompt 2.3.1: Modelos para Features e Modifiers (Prioridade Baixa - Adiar para Pós-MVP)

**Nota:** Estes modelos são avançados e não essenciais para leitura básica de arquivos GCS. Adiar implementação até que o MVP (parsing e visualização simples) esteja funcional.

```
Crie modelos de dados para features, modifiers e conditions do GURPS com TDD.

Contexto: Modelos básicos prontos. GURPS tem campos avançados que modificam traits/skills/etc. Implementar apenas se necessário para casos específicos.

Requisitos:
1. Criar models em /src/domain/models/:
   - Feature.ts (type, amount, perLevel, etc)
   - Modifier.ts (name, cost, affects, notes)
   - Condition.ts (name, active, effects[])
   - Reaction.ts (modifier, situation)
2. Criar enum FeatureType (AttributeBonus, SkillBonus, DRBonus, etc)
3. Criar enum ModifierCostType (Percentage, Points, Multiplier)
4. Escrever testes PRIMEIRO:
   - Criação de cada tipo
   - Validação de campos
   - Type guards
   - Serialização/deserialização

Entregas esperadas:
- /tests/unit/domain/models/Feature.test.ts (primeiro!)
- /tests/unit/domain/models/Modifier.test.ts (primeiro!)
- /tests/unit/domain/models/Condition.test.ts (primeiro!)
- /tests/unit/domain/models/Reaction.test.ts (primeiro!)
- /src/domain/models/Feature.ts
- /src/domain/models/Modifier.ts
- /src/domain/models/Condition.ts
- /src/domain/models/Reaction.ts
- /src/domain/enums/FeatureType.ts

Teste de aceitação:
- Modelos devem representar conceitos GURPS corretamente
- Type guards devem funcionar
- Documentação inline deve explicar conceitos
- Testes devem cobrir todos os tipos
```

#### Prompt 2.3.2: Parser de Features e Modifiers (Prioridade Baixa - Adiar)

**Nota:** Parser avançado. Implementar apenas após MVP para enriquecer dados.

```
Implemente parsers para features e modifiers com TDD.

Contexto: Modelos de Feature e Modifier prontos. Agora parseamos do arquivo .gcs.

Requisitos:
1. Criar FeatureParser em /src/data/parsers/FeatureParser.ts
2. Implementar parseFeatures(data: unknown): Feature[]
3. Criar ModifierParser em /src/data/parsers/ModifierParser.ts
4. Implementar parseModifiers(data: unknown): Modifier[]
5. Ambos devem:
   - Validar tipos de feature/modifier
   - Processar campos opcionais
   - Retornar erros claros
6. Escrever testes PRIMEIRO:
   - Cada tipo de feature
   - Cada tipo de modifier
   - Combinações complexas
   - Dados inválidos

Entregas esperadas:
- /tests/unit/data/parsers/FeatureParser.test.ts (primeiro!)
- /tests/unit/data/parsers/ModifierParser.test.ts (primeiro!)
- /tests/fixtures/features.json
- /tests/fixtures/modifiers.json
- /src/data/parsers/FeatureParser.ts
- /src/data/parsers/ModifierParser.ts

Teste de aceitação:
- Parsers devem processar todos os tipos
- Erros devem ser informativos
- Integração com models funcionando
- Cobertura > 90%
```

#### Prompt 2.3.3: Sistema de Prerequisites (Prereqs) (Prioridade Baixa - Adiar)

**Nota:** Funcionalidade avançada para validação de regras. Não essencial para leitura básica.

```
Implemente sistema de prerequisites para traits/skills/spells com TDD.

Contexto: GURPS tem sistema complexo de prereqs (requer trait X OU skill Y no nível Z).

Requisitos:
1. Criar Prereq model em /src/domain/models/Prereq.ts:
   - type (Trait, Skill, Attribute, Advantage)
   - qualifier (nome/id do prereq)
   - level (valor mínimo)
   - has (booleano, deve ter ou não ter)
2. Criar PrereqList model (lista com operador AND/OR)
3. Criar PrereqChecker em /src/domain/services/PrereqChecker.ts:
   - checkPrereqs(character: Character, prereqs: PrereqList): boolean (usando apenas campos básicos)
4. Escrever testes PRIMEIRO:
   - Prereq simples satisfeito
   - Prereq simples não satisfeito
   - Lista AND (todos devem satisfazer)
   - Lista OR (pelo menos um)
   - Listas aninhadas (AND dentro de OR)

Entregas esperadas:
- /tests/unit/domain/models/Prereq.test.ts (primeiro!)
- /tests/unit/domain/services/PrereqChecker.test.ts (primeiro!)
- /src/domain/models/Prereq.ts
- /src/domain/models/PrereqList.ts
- /src/domain/services/PrereqChecker.ts

Teste de aceitação:
- Checker deve avaliar lógica booleana corretamente
- Suporte para listas aninhadas
- Performance adequada
- Documentação de exemplos GURPS
```

#### Prompt 2.3.4: Parser de Campos de Estudo (Study) (Prioridade Baixa - Adiar)

**Nota:** Rastreamento de progresso é avançado. Adiar para versões futuras.

```
Implemente parser para campos de estudo (study fields) com TDD.

Contexto: GURPS permite rastreamento de horas de estudo para skills/spells.

Requisitos:
1. Criar Study model em /src/domain/models/Study.ts:
   - targetId (skill/spell sendo estudado)
   - hoursSpent (horas dedicadas)
   - hoursNeeded (horas necessárias para próximo nível)
   - status (NotStarted, InProgress, Completed)
2. Criar StudyParser em /src/data/parsers/StudyParser.ts
3. Implementar parseStudy(data: unknown): Study[]
4. Escrever testes PRIMEIRO:
   - Study em progresso
   - Study completado
   - Study não iniciado
   - Validação de horas (não negativas)

Entregas esperadas:
- /tests/unit/domain/models/Study.test.ts (primeiro!)
- /tests/unit/data/parsers/StudyParser.test.ts (primeiro!)
- /tests/fixtures/study.json
- /src/domain/models/Study.ts
- /src/domain/enums/StudyStatus.ts
- /src/data/parsers/StudyParser.ts

Teste de aceitação:
- Parser deve processar todos os estados
- Validação de horas funcionando
- Cálculo de progresso (hoursSpent/hoursNeeded)
- Integração com Skills/Spells
```

#### Prompt 2.4.1: Sistema de Referência a Bibliotecas (Prioridade Baixa - Adiar para Pós-MVP)

**Nota:** Sistema de bibliotecas é útil para validação avançada, mas não essencial para leitura básica de arquivos GCS. Adiar até que o app suporte funcionalidades como detecção de customizações.

```
Implemente sistema de carregamento e referência de bibliotecas externas com TDD.

Contexto: Fichas referenciam itens de bibliotecas. Precisamos carregar e resolver referências. Implementar apenas se necessário para casos específicos.

Requisitos:
1. Criar Library model em /src/domain/models/Library.ts:
   - id, name, version
   - traits, skills, spells, equipment (coleções)
   - isOfficial (boolean)
2. Criar LibraryRepository em /src/data/repositories/LibraryRepository.ts:
   - loadLibrary(path: string): Promise<Library>
   - getItemById(libraryId: string, itemId: string): LibraryItem | null
   - getAllLibraries(): Library[]
3. Criar LibraryItem union type (Trait | Skill | Spell | Equipment)
4. Escrever testes PRIMEIRO:
   - Carregar biblioteca válida
   - Buscar item por ID
   - Biblioteca não encontrada
   - Item não encontrado

Entregas esperadas:
- /tests/unit/domain/models/Library.test.ts (primeiro!)
- /tests/unit/data/repositories/LibraryRepository.test.ts (primeiro!)
- /tests/fixtures/library-official.json
- /tests/fixtures/library-custom.json
- /src/domain/models/Library.ts
- /src/domain/types/LibraryItem.ts
- /src/data/repositories/LibraryRepository.ts

Teste de aceitação:
- Repository deve carregar múltiplas bibliotecas
- Busca por ID deve ser eficiente (< 1ms)
- Bibliotecas devem ser imutáveis após carregadas
- Tratamento de erros robusto
```

#### Prompt 2.4.2: Detecção de Customizações (Prioridade Baixa - Adiar)

**Nota:** Detecção de customizações é uma feature avançada. Adiar para versões futuras focadas em validação.

```
Implemente sistema de detecção de itens customizados com TDD.

Contexto: LibraryRepository pronto. Precisamos identificar itens customizados vs oficiais.

Requisitos:
1. Criar CustomizationDetector em /src/domain/services/CustomizationDetector.ts
2. Implementar isCustomized(item: LibraryItem, libraries: Library[]): boolean
3. Lógica:
   - Item customizado se não existe em nenhuma biblioteca oficial
   - Item customizado se campos foram modificados em relação à biblioteca
4. Criar CustomizationInfo type:
   - isCustomized: boolean
   - originalLibrary?: string
   - modifiedFields?: string[]
5. Escrever testes PRIMEIRO:
   - Item oficial não modificado
   - Item oficial modificado
   - Item totalmente customizado
   - Item de biblioteca custom

Entregas esperadas:
- /tests/unit/domain/services/CustomizationDetector.test.ts (primeiro!)
- /src/domain/services/CustomizationDetector.ts
- /src/domain/types/CustomizationInfo.ts
- Documentação de critérios

Teste de aceitação:
- Detector deve identificar customizações corretamente
- Deve listar campos modificados
- Performance adequada para fichas grandes
- Integração com LibraryRepository
```

#### Prompt 2.4.3: Identificação de Itens Desatualizados (Prioridade Baixa - Adiar)

**Nota:** Verificação de versões é útil para manutenção, mas não para leitura inicial. Adiar.

```
Implemente sistema de detecção de itens desatualizados com TDD.

Contexto: CustomizationDetector pronto. Agora detectamos itens desatualizados em relação às bibliotecas.

Requisitos:
1. Criar VersionChecker em /src/domain/services/VersionChecker.ts
2. Implementar isOutdated(item: LibraryItem, libraries: Library[]): boolean
3. Lógica:
   - Item desatualizado se version < biblioteca atual
   - Comparar hash de conteúdo se version não disponível
4. Criar OutdatedInfo type:
   - isOutdated: boolean
   - currentVersion: string
   - latestVersion: string
   - changesSummary?: string[]
5. Escrever testes PRIMEIRO:
   - Item atualizado
   - Item com versão antiga
   - Item sem informação de versão
   - Biblioteca mais antiga que item

Entregas esperadas:
- /tests/unit/domain/services/VersionChecker.test.ts (primeiro!)
- /src/domain/services/VersionChecker.ts
- /src/domain/types/OutdatedInfo.ts
- /src/infrastructure/utils/hash.ts (para comparação)

Teste de aceitação:
- Checker deve detectar versões antigas
- Deve funcionar sem campo version
- Integração com LibraryRepository
- Performance adequada
```

### FASE 5: FUNCIONALIDADES AVANÇADAS (PRIORIDADE MÉDIA - APÓS MVP)

#### Prompt 4.1.1: Sistema de Busca Base

```
Implemente sistema de busca básico com debouncing e TDD.

Contexto: Todas as listas prontas. Agora adicionamos busca para facilitar navegação.

Requisitos:
1. Criar SearchBar component em /src/presentation/components/common/SearchBar.tsx:
   - Input com debouncing (300ms)
   - Ícone de busca e clear
   - Placeholder customizável
2. Criar hook useSearch com lógica:
   - Debouncing
   - Normalização de texto (lowercase, sem acentos)
   - Retornar query e setQuery
3. Escrever testes PRIMEIRO:
   - Debouncing funciona
   - Clear limpa input
   - Normalização correta
   - Performance (não rerender desnecessário)

Entregas esperadas:
- /tests/unit/presentation/components/common/SearchBar.test.tsx (primeiro!)
- /tests/unit/presentation/hooks/useSearch.test.ts (primeiro!)
- /src/presentation/components/common/SearchBar.tsx
- /src/presentation/hooks/useSearch.ts
- /src/infrastructure/utils/textNormalization.ts

Teste de aceitação:
- Debouncing deve evitar buscas excessivas
- Clear deve funcionar
- Normalização deve remover acentos
- Performance adequada
```


#### Prompt 4.1.2: Filtros por Tipo e Categoria

```
Adicione sistema de filtros para listas (tipo, categoria, tags) com TDD.

Contexto: SearchBar pronto. Agora adicionamos filtros mais específicos.

Requisitos:
1. Criar FilterBar component em /src/presentation/components/common/FilterBar.tsx:
   - Chips de filtro (selecionáveis)
   - Filtros comuns: tipo, categoria, equipado, ativo
   - Multi-seleção
2. Criar hook useFilter:
   - Gerenciar filtros ativos
   - Função de aplicar filtros em array
   - Combinar com busca textual
3. Escrever testes PRIMEIRO:
   - Selecionar/desselecionar filtros
   - Aplicar múltiplos filtros (AND)
   - Combinar filtros + busca
   - Performance com grandes listas

Entregas esperadas:
- /tests/unit/presentation/components/common/FilterBar.test.tsx (primeiro!)
- /tests/unit/presentation/hooks/useFilter.test.ts (primeiro!)
- /src/presentation/components/common/FilterBar.tsx
- /src/presentation/hooks/useFilter.ts

Teste de aceitação:
- Filtros devem ser aplicados corretamente
- Combinação filtros + busca funciona
- Performance adequada (< 10ms para 100 itens)
- UI responsiva
```


#### Prompt 4.1.3: Integração de Busca e Filtros nas Listas

```
Integre SearchBar e FilterBar em todas as listas principais com TDD.

Contexto: SearchBar e FilterBar prontos. Agora integramos em TraitList, SkillList, EquipmentTree.

Requisitos:
1. Atualizar cada lista para incluir:
   - SearchBar no topo
   - FilterBar abaixo (colapsável)
   - Aplicar busca + filtros nos dados
   - Mostrar contador de resultados
2. Criar hook useSearchAndFilter que combina ambos
3. Adicionar empty state customizado: "Nenhum resultado encontrado"
4. Escrever testes de integração PRIMEIRO:
   - Busca funciona em cada lista
   - Filtros funcionam em cada lista
   - Combinação busca + filtros
   - Performance com listas grandes

Entregas esperadas:
- /tests/integration/presentation/components/SearchAndFilter.test.tsx (primeiro!)
- /src/presentation/hooks/useSearchAndFilter.ts
- Atualizar TraitList.tsx, SkillList.tsx, EquipmentTree.tsx
- /src/presentation/components/common/EmptySearchResult.tsx

Teste de aceitação:
- Busca deve funcionar em todas as listas
- Filtros devem funcionar
- Performance não deve degradar
- Empty state apropriado
```


#### Prompt 4.2.1: Sistema de Armazenamento Local

```
Implemente sistema de persistência local de arquivos importados com TDD.

Contexto: App funciona mas dados não persistem. Precisamos salvar fichas importadas.

Requisitos:
1. Instalar react-native-fs ou expo-file-system
2. Criar FileStorage service em /src/infrastructure/storage/FileStorage.ts:
   - saveFile(filename: string, content: string): Promise<void>
   - loadFile(filename: string): Promise<string>
   - listFiles(): Promise<string[]>
   - deleteFile(filename: string): Promise<void>
3. Criar FileStorageRepository em /src/data/repositories/FileStorageRepository.ts
4. Escrever testes PRIMEIRO:
   - Salvar arquivo
   - Carregar arquivo salvo
   - Listar arquivos
   - Deletar arquivo
   - Arquivo não encontrado (erro)

Entregas esperadas:
- /tests/unit/infrastructure/storage/FileStorage.test.ts (primeiro!)
- /tests/unit/data/repositories/FileStorageRepository.test.ts (primeiro!)
- /src/infrastructure/storage/FileStorage.ts
- /src/data/repositories/FileStorageRepository.ts
- Documentação de estrutura de pastas

Teste de aceitação:
- Arquivos devem persistir entre sessões
- Operações devem ser atômicas
- Erros tratados apropriadamente
- Performance adequada
```


#### Prompt 4.2.2: Importação de Arquivos .gcs

```
Implemente funcionalidade de importação de arquivos .gcs com TDD.

Contexto: FileStorage pronto. Parsers funcionais. Agora permitimos importar arquivos.

Requisitos:
1. Instalar react-native-document-picker
2. Criar ImportService em /src/domain/services/ImportService.ts:
   - pickFile(): Promise<FileInfo>
   - importCharacter(file: FileInfo): Promise<Character>
   - Validar arquivo antes de importar
   - Salvar em FileStorage após parse
3. Criar tela ImportScreen
4. Escrever testes PRIMEIRO:
   - Importar arquivo válido
   - Rejeitar arquivo inválido
   - Importar e salvar
   - Erro de parsing

Entregas esperadas:
- /tests/unit/domain/services/ImportService.test.ts (primeiro!)
- /tests/integration/presentation/screens/ImportScreen.test.tsx (primeiro!)
- /src/domain/services/ImportService.ts
- /src/presentation/screens/ImportScreen.tsx
- Integração com characterStore

Teste de aceitação:
- Usuário deve poder escolher arquivo
- Arquivo válido deve ser importado
- Arquivo inválido deve mostrar erro claro
- Character deve aparecer no app após importação
```


#### Prompt 4.2.3: Gerenciamento de Fichas Salvas

```
Crie tela de gerenciamento de fichas salvas localmente com TDD.

Contexto: Importação funcional. Arquivos sendo salvos. Precisamos de tela para gerenciar.

Requisitos:
1. Criar CharacterListScreen em /src/presentation/screens/CharacterListScreen.tsx:
   - Listar todas as fichas salvas
   - Exibir nome, pontos, última modificação
   - Tap para abrir ficha
   - Swipe para deletar
   - Botão "Importar Nova Ficha"
2. Criar CharacterListItem component
3. Escrever testes PRIMEIRO:
   - Lista vazia mostra empty state
   - Lista com fichas
   - Abrir ficha
   - Deletar ficha (com confirmação)

Entregas esperadas:
- /tests/integration/presentation/screens/CharacterListScreen.test.tsx (primeiro!)
- /src/presentation/screens/CharacterListScreen.tsx
- /src/presentation/components/character/CharacterListItem.tsx
- Integração com FileStorageRepository

Teste de aceitação:
- Tela deve listar fichas salvas
- Abrir ficha deve carregar no store
- Deletar deve remover arquivo
- Empty state apropriado
```


#### Prompt 4.3.1: Sistema Centralizado de Tratamento de Erros

```
Implemente sistema centralizado de tratamento e exibição de erros com TDD.

Contexto: Erros acontecem em diversos pontos. Precisamos de sistema unificado.

Requisitos:
1. Criar ErrorHandler service em /src/infrastructure/errors/ErrorHandler.ts:
   - Categorizar erros (Network, Parsing, Storage, etc)
   - Logar erros apropriadamente
   - Converter erro técnico em mensagem amigável
2. Criar ErrorBoundary component
3. Criar hook useErrorHandler
4. Criar error types customizados:
   - ParsingError
   - FileNotFoundError
   - InvalidSchemaError
5. Escrever testes PRIMEIRO:
   - Cada tipo de erro é tratado corretamente
   - Mensagens são amigáveis
   - Logs são criados
   - ErrorBoundary captura erros

Entregas esperadas:
- /tests/unit/infrastructure/errors/ErrorHandler.test.ts (primeiro!)
- /src/infrastructure/errors/ErrorHandler.ts
- /src/infrastructure/errors/types/*.ts
- /src/presentation/components/common/ErrorBoundary.tsx
- /src/presentation/hooks/useErrorHandler.ts

Teste de aceitação:
- Erros devem ser categorizados corretamente
- Mensagens devem ser claras para usuário
- App não deve crashar
- Logs devem ser informativos
```


#### Prompt 4.3.2: Mensagens de Erro Amigáveis

```
Crie componentes de UI para exibir erros de forma amigável com TDD.

Contexto: ErrorHandler pronto. Agora criamos UI para mostrar erros ao usuário.

Requisitos:
1. Criar ErrorMessage component em /src/presentation/components/common/ErrorMessage.tsx:
   - Variantes: error, warning, info
   - Título e descrição
   - Ação opcional (botão "Tentar Novamente")
   - Ícone apropriado por tipo
2. Criar ErrorDialog (modal) para erros críticos
3. Criar ErrorToast para erros leves (auto-dismissible)
4. Escrever testes PRIMEIRO:
   - Cada variante renderiza corretamente
   - Botão de ação funciona
   - Toast auto-dismiss após timeout
   - Dialog requer dismissal manual

Entregas esperadas:
- /tests/unit/presentation/components/common/ErrorMessage.test.tsx (primeiro!)
- /src/presentation/components/common/ErrorMessage.tsx
- /src/presentation/components/common/ErrorDialog.tsx
- /src/presentation/components/common/ErrorToast.tsx

Teste de aceitação:
- Erros devem ser visualmente claros
- Ações devem funcionar
- Acessibilidade ok
- Animações suaves
```


#### Prompt 4.3.3: Sistema de Logging para Debug

```
Implemente sistema de logging interno para facilitar debug com TDD.

Contexto: ErrorHandler pronto. Precisamos de logs detalhados sem expor dados sensíveis.

Requisitos:
1. Criar Logger service em /src/infrastructure/logging/Logger.ts:
   - Níveis: debug, info, warn, error
   - Não logar em produção (debug/info)
   - Formato estruturado: timestamp, level, message, context
   - Opcionalmente salvar logs em arquivo (últimas 100 linhas)
2. Criar LogViewer screen (apenas debug builds)
3. Escrever testes PRIMEIRO:
   - Cada nível loga corretamente
   - Produção não loga debug/info
   - Logs são estruturados
   - Arquivo não cresce indefinidamente

Entregas esperadas:
- /tests/unit/infrastructure/logging/Logger.test.ts (primeiro!)
- /src/infrastructure/logging/Logger.ts
- /src/presentation/screens/LogViewerScreen.tsx (dev only)
- Integração com ErrorHandler

Teste de aceitação:
- Logs devem ser criados corretamente
- Produção não deve logar info/debug
- LogViewer deve mostrar logs recentes
- Performance não deve degradar
```


#### Prompt 4.4.1: Parser de Ancestries

```
Implemente parser para ancestries (ancestralidades) de GURPS com TDD.

Contexto: Parsers básicos prontos. Ancestries são templates que definem características raciais.

Requisitos:
1. Criar Ancestry model em /src/domain/models/Ancestry.ts:
   - id, name, cost
   - traits incluídos
   - attributeModifiers
   - nameGenerator (dados para geração de nomes)
2. Criar AncestryParser em /src/data/parsers/AncestryParser.ts
3. Implementar parseAncestries(data: unknown): Ancestry[]
4. Escrever testes PRIMEIRO:
   - Ancestry simples
   - Ancestry com traits
   - Ancestry com modifiers de atributo
   - Name generator data

Entregas esperadas:
- /tests/unit/domain/models/Ancestry.test.ts (primeiro!)
- /tests/unit/data/parsers/AncestryParser.test.ts (primeiro!)
- /tests/fixtures/ancestries.json
- /src/domain/models/Ancestry.ts
- /src/data/parsers/AncestryParser.ts

Teste de aceitação:
- Parser deve processar ancestries corretamente
- Traits associados devem ser linkados
- Modifiers devem ser parseados
- Name generator data preservado
```


#### Prompt 4.4.2: Visualização de Name Generator (Read-Only)

```
Crie componente para exibir dados de name generator de ancestries (leitura apenas) com TDD.

Contexto: AncestryParser pronto. Name generator tem regras/padrões para nomes. Apenas exibir, não gerar.

Requisitos:
1. Criar NameGeneratorViewer em /src/presentation/components/ancestry/NameGeneratorViewer.tsx:
   - Exibir padrões de nomes (prefixos, sufixos, etc)
   - Mostrar exemplos se disponíveis
   - Read-only (sem geração ativa)
2. Integrar em AncestryDetailScreen
3. Escrever testes PRIMEIRO:
   - Exibir padrões corretamente
   - Exemplos aparecem
   - Empty state se sem name generator

Entregas esperadas:
- /tests/unit/presentation/components/ancestry/NameGeneratorViewer.test.tsx (primeiro!)
- /src/presentation/components/ancestry/NameGeneratorViewer.tsx
- /src/presentation/screens/AncestryDetailScreen.tsx

Teste de aceitação:
- Dados do generator devem ser exibidos claramente
- Não deve tentar gerar nomes
- UI deve ser informativa
- Integração em detail screen
```


#### Prompt 4.4.3: Parser de Regras de Dano Customizadas

```
Implemente parser e interpretador para regras de dano customizadas com TDD.

Contexto: GURPS permite regras customizadas de cálculo de dano. Precisamos interpretar (não calcular).

Requisitos:
1. Criar DamageRule model em /src/domain/models/DamageRule.ts:
   - type (Thrust, Swing, Custom)
   - formula (string representando fórmula)
   - modifiers
2. Criar DamageRuleParser em /src/data/parsers/DamageRuleParser.ts
3. Criar DamageRuleInterpreter (apenas exibir, não calcular):
   - Converter fórmula em texto legível
   - Explicar modifiers
4. Escrever testes PRIMEIRO:
   - Regra padrão (Thrust, Swing)
   - Regra customizada simples
   - Regra com múltiplos modifiers
   - Interpretação de fórmulas

Entregas esperadas:
- /tests/unit/domain/models/DamageRule.test.ts (primeiro!)
- /tests/unit/data/parsers/DamageRuleParser.test.ts (primeiro!)
- /tests/unit/domain/services/DamageRuleInterpreter.test.ts (primeiro!)
- /src/domain/models/DamageRule.ts
- /src/data/parsers/DamageRuleParser.ts
- /src/domain/services/DamageRuleInterpreter.ts

Teste de aceitação:
- Parser deve extrair regras de dano
- Interpreter deve gerar texto legível
- Regras customizadas suportadas
- Não calcular, apenas interpretar
```


### FASE 6: REFINAMENTO E POLIMENTO (PRIORIDADE BAIXA - FINAL)

#### Prompt 5.1.1: Lazy Loading de Dados

```
Implemente lazy loading para listas grandes com TDD.

Contexto: App funcional mas pode ficar lento com fichas grandes. Otimizar renderização.

Requisitos:
1. Atualizar FlatList components para usar:
   - initialNumToRender (10-20 itens)
   - windowSize otimizado
   - removeClippedSubviews
   - getItemLayout para performance
2. Criar hook useLazyList para encapsular lógica
3. Escrever testes de performance PRIMEIRO:
   - Medir tempo de renderização inicial
   - Medir FPS durante scroll
   - Lista com 100 itens < 500ms
   - Lista com 1000 itens < 2s

Entregas esperadas:
- /tests/performance/presentation/components/LazyList.test.tsx (primeiro!)
- /src/presentation/hooks/useLazyList.ts
- Atualizar todas as listas (Trait, Skill, Equipment)
- Documentação de otimizações

Teste de aceitação:
- Renderização inicial deve ser rápida
- Scroll deve ser suave (60fps)
- Memória não deve crescer indefinidamente
- Benchmarks devem passar
```


#### Prompt 5.1.2: Otimização de Re-renderizações

```
Otimize re-renderizações desnecessárias com React.memo e hooks com TDD.

Contexto: App funcional mas pode ter re-renders desnecessários. Usar React.memo, useMemo, useCallback.

Requisitos:
1. Analisar componentes e adicionar React.memo onde apropriado:
   - TraitItem, SkillItem, EquipmentNode
   - Badge, Card, outros componentes reutilizáveis
2. Adicionar useMemo para computações pesadas:
   - Filtros de lista
   - Cálculos de totais
3. Adicionar useCallback para funções passadas como props
4. Escrever testes de performance PRIMEIRO:
   - Contar re-renders com React DevTools Profiler
   - Verificar que memo evita re-renders
   - Medir impacto em performance

Entregas esperadas:
- /tests/performance/presentation/components/Memoization.test.tsx (primeiro!)
- Atualizar componentes com React.memo
- Adicionar useMemo e useCallback onde necessário
- Documentação de decisões de otimização

Teste de aceitação:
- Re-renders devem diminuir significativamente
- Performance deve melhorar
- Comportamento deve permanecer idêntico
- Testes de regressão passando
```


#### Prompt 5.1.3: Redução de Uso de Memória

```
Otimize uso de memória do app com TDD.

Contexto: App pode consumir muita memória com fichas grandes. Implementar estratégias de redução.

Requisitos:
1. Implementar virtualization completa nas listas:
   - Usar react-native-virtualized-list
   - Calcular alturas dinamicamente
2. Limpar dados não usados do store:
   - Remover personagem anterior ao carregar novo
   - Clear cache de imagens se houver
3. Implementar paginação em listas muito grandes (1000+ itens)
4. Escrever testes de memória PRIMEIRO:
   - Medir uso base
   - Medir com ficha pequena
   - Medir com ficha grande (500+ itens)
   - Verificar que memória não cresce indefinidamente

Entregas esperadas:
- /tests/performance/memory/MemoryUsage.test.tsx (primeiro!)
- Implementar virtualization em listas
- Adicionar cleanup no characterStore
- Documentação de limites de memória

Teste de aceitação:
- Memória não deve crescer indefinidamente
- App deve funcionar com fichas grandes
- Performance não deve degradar após uso prolongado
- Testes de memória passando
```


#### Prompt 5.2.1: Testes End-to-End Completos

```
Crie suite completa de testes end-to-end com Detox.

Contexto: Testes unitários e integração prontos. Agora testamos fluxos completos.

Requisitos:
1. Instalar e configurar Detox
2. Criar testes E2E para fluxos principais:
   - Importar ficha
   - Navegar entre tabs
   - Buscar item
   - Aplicar filtros
   - Ver detalhes
   - Drill-down em equipamentos
   - Deletar ficha
3. Configurar CI para rodar E2E tests
4. Escrever testes PRIMEIRO (specs):
   - happy-path-import.e2e.ts
   - navigation.e2e.ts
   - search-and-filter.e2e.ts
   - equipment-drilldown.e2e.ts

Entregas esperadas:
- detox.config.js
- /e2e/happy-path-import.e2e.ts
- /e2e/navigation.e2e.ts
- /e2e/search-and-filter.e2e.ts
- /e2e/equipment-drilldown.e2e.ts
- Atualizar CI workflow

Teste de aceitação:
- Todos os fluxos principais devem funcionar E2E
- Testes devem rodar em CI
- Testes devem ser determinísticos
- Cobertura dos principais use cases
```


#### Prompt 5.2.2: Testes de Compatibilidade de Versões

```
Crie suite de testes para validar compatibilidade com diferentes versões de arquivos .gcs com TDD.

Contexto: GCS tem múltiplas versões de schema. Precisamos garantir compatibilidade.

Requisitos:
1. Criar fixtures para cada versão de schema conhecida:
   - v4, v5, v6 (exemplos)
   - Cada um com personagem completo
2. Criar SchemaCompatibilityTests:
   - Detectar versão corretamente
   - Parsear cada versão sem erros
   - Validar que dados essenciais são extraídos
   - Testar backward compatibility
3. Escrever testes PRIMEIRO:
   - Para cada versão de schema
   - Campos deprecados são ignorados
   - Campos novos são opcionais
   - Nenhuma versão causa crash

Entregas esperadas:
- /tests/fixtures/v4-character.gcs
- /tests/fixtures/v5-character.gcs
- /tests/fixtures/v6-character.gcs
- /tests/integration/data/SchemaCompatibility.test.ts (primeiro!)
- Documentação de versões suportadas

Teste de aceitação:
- App deve abrir fichas de todas as versões
- Versões antigas devem funcionar
- Versões futuras devem mostrar aviso mas não crash
- Documentação clara de compatibilidade
```


#### Prompt 5.2.3: Testes de Casos Limite

```
Implemente suite de testes para casos limite e edge cases com TDD.

Contexto: Funcionalidades básicas testadas. Agora testamos casos extremos.

Requisitos:
1. Criar testes para casos limite:
   - Ficha vazia (nenhum trait/skill/etc)
   - Ficha gigante (1000+ itens)
   - Containers com 10+ níveis de profundidade
   - Caracteres especiais/Unicode em nomes
   - Campos com valores extremos (999999 pontos)
   - Arquivo corrompido (JSON inválido)
   - Arquivo parcialmente corrompido (campos faltando)
2. Escrever testes PRIMEIRO:
   - edge-cases/empty-character.test.ts
   - edge-cases/huge-character.test.ts
   - edge-cases/deep-nesting.test.ts
   - edge-cases/unicode.test.ts
   - edge-cases/corrupted-files.test.ts

Entregas esperadas:
- /tests/integration/edge-cases/*.test.ts (primeiro!)
- /tests/fixtures/edge-cases/*.gcs
- Documentação de limitações conhecidas
- Fixes para bugs encontrados

Teste de aceitação:
- App deve lidar graciosamente com todos os casos
- Nenhum crash deve ocorrer
- Mensagens de erro apropriadas
- Performance aceitável mesmo em casos extremos
```


#### Prompt 5.3.1: Refinamento de UX

```
Refine experiência do usuário com feedback tátil, animações e polimentos com TDD.

Contexto: App funcional. Agora melhoramos sensação de uso.

Requisitos:
1. Adicionar feedback tátil (haptics):
   - Tap em botões
   - Delete de item
   - Erro
   - Sucesso em ações
2. Adicionar animações suaves:
   - Transições entre telas (fade, slide)
   - Expand/collapse de containers
   - Loading states (skeleton screens)
   - Pull-to-refresh
3. Melhorar loading states:
   - Skeleton screens em vez de spinners
   - Progressive loading
4. Escrever testes para animações:
   - Animações completam
   - Durações apropriadas (< 300ms)
   - Não travar UI

Entregas esperadas:
- /src/infrastructure/haptics/HapticFeedback.ts
- /src/presentation/animations/*.ts
- /src/presentation/components/common/SkeletonScreen.tsx
- /tests/unit/presentation/animations/*.test.ts

Teste de aceitação:
- Haptics devem funcionar (iOS e Android)
- Animações devem ser suaves (60fps)
- Loading states devem ser informativos
- UX deve ser polida e profissional
```


#### Prompt 5.3.2: Acessibilidade Completa

```
Implemente recursos de acessibilidade completos com TDD.

Contexto: App funcional mas pode não ser acessível. Implementar suporte completo.

Requisitos:
1. Adicionar accessibility labels em todos os componentes:
   - Buttons, inputs, lists
   - Meaningful labels (não "botão" mas "importar ficha")
2. Suporte a screen readers:
   - React Native Accessibility
   - Ordem de navegação lógica
   - Hints apropriados
3. Suporte a tamanhos de fonte do sistema
4. Cores com contraste adequado (WCAG AA)
5. Escrever testes de acessibilidade:
   - Todos os botões têm labels
   - Ordem de navegação correta
   - Contraste de cores adequado

Entregas esperadas:
- Atualizar todos os componentes com accessibility props
- /tests/accessibility/*.test.tsx
- Documentação de features de acessibilidade
- Audit com ferramentas (Lighthouse, Axe)

Teste de aceitação:
- Screen readers devem funcionar completamente
- Navegação deve ser lógica
- Contraste deve passar WCAG AA
- Testes automatizados passando
```


#### Prompt 5.3.3: Temas e Customização Visual

```
Implemente suporte a temas (claro/escuro) e customização visual com TDD.

Contexto: App usa tema fixo. Adicionar suporte a mo


<div align="center">⁂</div>

[^1]: Especificacao-Tecnica_-Visualizador-Mobile-GCS.md```

