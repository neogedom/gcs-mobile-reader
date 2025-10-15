# GCS Mobile Reader

<!-- Badges de Status do GitHub Actions -->
[![CI](https://github.com/{username}/{repo}/workflows/CI/badge.svg)](https://github.com/{username}/{repo}/actions)
[![Tests](https://github.com/{username}/{repo}/workflows/Tests/badge.svg)](https://github.com/{username}/{repo}/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.72.6-blue)](https://reactnative.dev/)

Aplicativo mobile desenvolvido em React Native com TypeScript para visualização de fichas de personagem do sistema GURPS (Generic Universal RolePlaying System) no formato `.gcs`.

## Sobre o Projeto

O GCS Mobile Reader é uma aplicação móvel que permite aos jogadores de RPG visualizar e gerenciar suas fichas de personagem do GURPS de forma prática e eficiente. Desenvolvido com foco na usabilidade e performance, o aplicativo oferece uma interface intuitiva para acesso às informações detalhadas dos personagens.

### Funcionalidades Principais

- 📱 **Visualização de Fichas**: Interface otimizada para dispositivos móveis
- 🎯 **Compatibilidade GCS**: Leitura de arquivos `.gcs` padrão do GURPS Character Sheet
- 🔍 **Navegação Intuitiva**: Estrutura clara e fácil navegação entre seções
- ⚡ **Performance**: Carregamento rápido e responsivo
- 🎨 **Interface Nativa**: Design consistente com as diretrizes do Material Design

## Tecnologias Utilizadas

### Core
- **[React Native](https://reactnative.dev/)** (v0.72.6) - Framework para desenvolvimento mobile
- **[TypeScript](https://www.typescriptlang.org/)** (v5.2.2) - Superset do JavaScript com tipagem estática
- **[React Navigation](https://reactnavigation.org/)** (v6.x) - Sistema de navegação declarativo

### Desenvolvimento e Qualidade
- **[TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)** - Configuração rigorosa de tipos
- **[ESLint](https://eslint.org/)** - Linting de código com regras específicas para React Native
- **[Prettier](https://prettier.io/)** - Formatação automática de código
- **[Jest](https://jestjs.io/)** - Framework de testes unitários
- **[Testing Library](https://testing-library.com/)** - Utilitários para testes de componentes React Native

### Arquitetura
- **[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)** - Separação clara de responsabilidades

## Pré-requisitos

Antes de iniciar o desenvolvimento, certifique-se de que seu ambiente atende aos seguintes requisitos:

### Sistema Operacional
- **Windows** (10 ou superior)
- **macOS** (10.15 ou superior)
- **Linux** (distribuições modernas)

### Software Necessário
- **[Node.js](https://nodejs.org/)** (v18.0.0 ou superior)
- **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)** (gerenciador de pacotes)
- **[React Native CLI](https://github.com/react-native-community/cli)**

### Ambiente de Desenvolvimento
- **[Visual Studio Code](https://code.visualstudio.com/)** (recomendado)
- **[Android Studio](https://developer.android.com/studio)** (para desenvolvimento Android)
- **[Xcode](https://developer.apple.com/xcode/)** (para desenvolvimento iOS - apenas macOS)

## Instalação

Siga os passos abaixo para configurar o projeto em seu ambiente de desenvolvimento:

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/gcs-mobile-reader.git
cd gcs-mobile-reader
```

### 2. Instale as Dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure o Ambiente React Native

#### Para Android
```bash
# Instale o Android SDK
npx react-native run-android
```

#### Para iOS (macOS apenas)
```bash
# Instale as dependências do CocoaPods
cd ios && pod install && cd ..

# Execute no simulador iOS
npx react-native run-ios
```

### 4. Execute o Projeto
```bash
# Para Android
npm run android

# Para iOS
npm run ios

# Para iniciar o Metro bundler
npm start
```

## Scripts Disponíveis

O projeto inclui os seguintes scripts npm:

### Desenvolvimento
- `npm start` - Inicia o Metro bundler
- `npm run android` - Executa o aplicativo no Android
- `npm run ios` - Executa o aplicativo no iOS

### Qualidade de Código
- `npm run lint` - Executa o ESLint para análise de código
- `npm run type-check` - Verifica tipos TypeScript sem emitir arquivos

### Testes
- `npm test` - Executa os testes com Jest

## Estrutura do Projeto

O projeto segue os princípios da **Clean Architecture**, organizando o código em camadas bem definidas:

```
src/
├── data/                 # Camada de dados
│   ├── repositories/     # Implementações de repositórios
│   ├── models/          # Modelos de dados
│   └── index.ts         # Barrel export
├── domain/              # Camada de domínio
│   ├── entities/        # Entidades de negócio
│   ├── use-cases/       # Casos de uso
│   ├── repositories/    # Interfaces de repositórios
│   └── index.ts         # Barrel export
├── infrastructure/      # Camada de infraestrutura
│   ├── services/        # Serviços externos
│   ├── config/         # Configurações
│   └── index.ts        # Barrel export
└── presentation/        # Camada de apresentação
    ├── components/      # Componentes reutilizáveis
    ├── screens/         # Telas da aplicação
    ├── navigation/      # Configuração de navegação
    ├── styles/          # Estilos e temas
    └── index.ts         # Barrel export
```

### Características da Arquitetura

- **Independência de Frameworks**: A camada de domínio não depende de frameworks externos
- **Testabilidade**: Cada camada pode ser testada independentemente
- **Manutenibilidade**: Mudanças em uma camada não afetam as outras
- **Escalabilidade**: Fácil adição de novas funcionalidades

## Testes

O projeto utiliza **Jest** e **Testing Library** para testes automatizados:

### Executar Testes
```bash
npm test
```

### Cobertura de Testes
Os testes cobrem:
- **Casos de Uso**: Lógica de negócio da camada de domínio
- **Componentes**: Interface com usuário
- **Utilitários**: Funções auxiliares

### Estrutura de Testes
```
src/
├── __tests__/           # Testes de integração
├── domain/             # Testes de unidade (use cases)
├── presentation/       # Testes de componentes
└── utils/              # Testes de utilitários
```

## Contribuição

Contribuições são muito bem-vindas! Para contribuir com o projeto:

### 1. Fork o Projeto

### 2. Crie uma Branch para sua Feature
```bash
git checkout -b feature/nova-funcionalidade
```

### 3. Commit suas Mudanças
```bash
git commit -m "Adiciona nova funcionalidade"
```

### 4. Push para a Branch
```bash
git push origin feature/nova-funcionalidade
```

### 5. Abra um Pull Request

### Diretrizes para Contribuidores

- **Código Limpo**: Mantenha o código limpo e bem documentado
- **Testes**: Adicione testes para novas funcionalidades
- **TypeScript**: Use tipagem adequada em todas as partes do código
- **ESLint**: Certifique-se de que o código passa no linting
- **Conventional Commits**: Use [Conventional Commits](https://conventionalcommits.org/) para mensagens de commit

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para a comunidade GURPS**