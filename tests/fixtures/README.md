# Arquivos de Teste do SchemaDetector e Modelos de Dados Modulares

Este diretório contém arquivos de exemplo para testar o `SchemaDetector` e os modelos de dados modulares. Cada arquivo representa um cenário específico de teste, seguindo a arquitetura onde cada entidade é tratada de forma independente.

## Arquivos Obrigatórios

### 1. `valid-v5.gcs`
- **Propósito**: JSON válido com versão 5
- **Versão detectada**: V5
- **Características**: Arquivo JSON completo e válido com estrutura GCS padrão

### 2. `no-version.gcs`
- **Propósito**: Arquivo sem versão
- **Versão detectada**: UNKNOWN
- **Características**: JSON válido mas sem o campo "version"

### 3. `malformed.gcs`
- **Propósito**: Arquivo malformado
- **Versão detectada**: UNKNOWN
- **Características**: JSON com sintaxe inválida (chave final sem vírgula)

## Arquivos Adicionais para Cobertura Completa

### 4. `valid-v2.gcs`
- **Propósito**: JSON com versão 2
- **Versão detectada**: V2
- **Características**: JSON válido com versão específica

### 5. `valid-v3.gcs`
- **Propósito**: JSON com versão 3
- **Versão detectada**: V3
- **Características**: JSON válido com versão específica

### 6. `valid-v4.gcs`
- **Propósito**: JSON com versão 4
- **Versão detectada**: V4
- **Características**: JSON válido com versão específica

### 7. `multiple-versions.gcs`
- **Propósito**: JSON com múltiplas versões
- **Versão detectada**: V3 (primeira encontrada)
- **Características**: JSON com múltiplos campos "version" em diferentes locais

### 8. `case-insensitive.gcs`
- **Propósito**: JSON com "Version" maiúsculo
- **Versão detectada**: UNKNOWN (detector diferencia maiúsculas/minúsculas)
- **Características**: JSON válido mas com campo "Version" em maiúsculo

### 9. `empty.gcs`
- **Propósito**: Arquivo vazio
- **Versão detectada**: UNKNOWN
- **Características**: Arquivo completamente vazio

### 10. `xml-like.gcs`
- **Propósito**: Arquivo que parece XML mas não é
- **Versão detectada**: UNKNOWN
- **Características**: Arquivo estruturado como XML mas não é JSON válido

## Estrutura dos Arquivos

Todos os arquivos seguem a estrutura básica GCS com:
- Campos básicos (version, id, total_points, created_date, modified_date)
- Registro de pontos (points_record)
- Perfil do personagem (profile)
- Configurações (settings)
- Atributos (attributes)
- Traits e skills (vazios para simplicidade)
- Equipamentos (equipment)
- Dados de cálculo (calc)

## Arquitetura Modular de Testes

Os testes seguem a arquitetura modular proposta onde cada entidade é tratada de forma independente:

### Modelo Core (Campos Básicos)
- **Character**: Responsável apenas por version, id, total_points, created_date, modified_date

### Sub-Entidades Modulares (Campos Específicos)
- **CharacterProfile**: Dados do perfil (name, player_name, age, height, weight, etc.)
- **CharacterSettings**: Configurações (page, block_layout, attributes, body_type, etc.)
- **CharacterAttributes**: Atributos básicos (st, dx, iq, ht, will, per, etc.)
- **CharacterPointsRecord**: Registro de pontos ao longo do tempo
- **CharacterCalc**: Dados calculados (swing, thrust, basic_lift, move, dodge)

### Entidades Independentes
- **Trait**: Traits/advantages/disadvantages independentemente
- **Skill**: Skills independentemente
- **Spell**: Spells independentemente
- **Equipment**: Equipamentos e containers hierárquicos
- **Ancestry**: Ancestries e características raciais

### Modelos Adicionais Necessários (Para Arquitetura Completa)
- **CharacterProfile**: Dados do perfil (name, player_name, age, height, weight, etc.)
- **CharacterSettings**: Configurações (page, block_layout, attributes, body_type, etc.)
- **CharacterAttributes**: Atributos básicos (st, dx, iq, ht, will, per, etc.)
- **CharacterPointsRecord**: Registro de pontos ao longo do tempo
- **CharacterCalc**: Dados calculados (swing, thrust, basic_lift, move, dodge)

## Uso nos Testes

Estes arquivos são utilizados pelos testes unitários em `SchemaDetector.test.ts` para validar diferentes cenários de detecção de versão.