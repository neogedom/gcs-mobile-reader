# Arquivos de Teste do SchemaDetector

Este diretório contém arquivos de exemplo para testar o `SchemaDetector`. Cada arquivo representa um cenário específico de teste.

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
- Campos básicos (id, total_points, points_record)
- Perfil do personagem (profile)
- Configurações (settings)
- Atributos (attributes)
- Traits e skills (vazios para simplicidade)
- Dados de cálculo (calc)

## Uso nos Testes

Estes arquivos são utilizados pelos testes unitários em `SchemaDetector.test.ts` para validar diferentes cenários de detecção de versão.