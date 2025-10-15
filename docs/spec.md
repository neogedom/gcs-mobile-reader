<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

## Especificação Técnica: Visualizador Mobile GCS

### Visão Geral

O aplicativo mobile GCS (GURPS Character Sheet) será um **visualizador e leitor de fichas** compatível com arquivos .gcs e bibliotecas do sistema de personagens GURPS, com ênfase em fidelidade aos dados, suporte às principais funcionalidades do ecossistema GCS e experiência de navegação otimizada para dispositivos móveis. Não haverá edição avançada nem geração/exportação de outros formatos.

***

### Requisitos Funcionais

1. **Suporte a Formato de Arquivo**
    - Importação, leitura e renderização de arquivos .gcs (ficha de personagem).
    - Carregamento de múltiplas bibliotecas (oficiais e customizadas, sem edição).
    - Detecção automática do schema/versão para futuras evoluções.
2. **Visualização de Dados**
    - Renderizar todos os blocos e estruturas presentes no arquivo, incluindo:
        - **Ancestries:** apresentação clara, uso do gerador de nomes embutido (leitura apenas).
        - **Equipamentos:** suporte total a containers e sub-itens, incluindo organização hierárquica.
        - **Traits, Skills, Spells:** exibir campos avançados, prereqs, containers aninhados.
        - **Campos de estudo:** progresso, horas necessárias, estado.
        - **Regras de dano:** reconhecer e processar valores com base nas regras definidas na ficha (não editáveis).
3. **Campos Avançados**
    - Suporte completo à exibição/interpretação de features, conditions, reactions, modifiers, etc.
    - Identificação visual de estados especiais, condições ativas, bônus, penalidades e efeitos especiais.
4. **Reconhecimento de Customizações e Versão**
    - Exibir quando um item está:
        - Customizado (não faz parte da biblioteca oficial).
        - Desatualizado em relação à biblioteca-mestra (exibição clara de estado).
    - Itens customizados/desatualizados não poderão ser editados (apenas leitura).
5. **Interface**
    - Navegação intuitiva por blocos/seções (swipe, drilldown).
    - Busca/filtro por nome, tipo e categoria.
    - Indicações visuais de containers e hierarquia.
6. **Restrições**
    - Sem edição de bibliotecas.
    - Sem edição de notas livres de personagem.
    - Sem integração com VTT, Fantasy Grounds ou exportação especial.
    - Sem scripting ou execução de campos dinâmicos.

***

### Arquitetura Proposta

- **Frontend:** Flutter, React Native, Kotlin/Swift ou framework multiplataforma, priorizando legibilidade, desempenho e desacoplamento da camada de parsing.
- **Backend (app):** Parsing local dos arquivos .gcs (JSON/XML/Protobuf conforme padrão do GCS) com abstração em classes/structs.
- **Gerenciamento de Estado:** Pode ser Redux/MobX/Provider/Bloc ou equivalente do framework escolhido.
- **Persistência:** Armazenamento local dos arquivos impressos/importados pelo usuário (pasta sandboxed).

***

### Manipulação de Dados

- **Leitura:** Parser robusto de arquivos .gcs e bibliotecas, analisando campos obrigatórios e opcionais.
- **Containers:** Estruturas recursivas; apresentação hierárquica (ex: mochila > frascos > poção).
- **Campos de estudo:** Renderizar progresso, horas dedicadas/restantes (read-only).
- **Features/Modifiers/Conditions/Reactions:** Extração conforme modelos de dados do GCS, renderizando campos e efeitos com marcadores e cores distintas.
- **Versões/Regras Especiais:** Reconhecer e aplicar regras de dano customizadas segundo definições da ficha; alertar caso esteja usando opção não suportada.
- **Custom Content:** Marcação visual de “custom”/“desatualizado” para todos os itens não oficiais.

***

### Estratégias de Tratamento de Erros

- **Parsing:** Erros de leitura/compreensão do arquivo deverão ser tratados com:
    - Mensagem clara ao usuário (“Arquivo corrompido”, “Versão não suportada”, “Campo obrigatório ausente”).
    - Logs internos opcionais para depuração (sem expor dados sensíveis).
- **Inconsistências de Biblioteca:**
    - Exibir alerta ao usuário caso itens estejam desatualizados, apenas leitura.
    - Ocultar opções de edição e impedir operações não suportadas em tais itens.
- **Dados Faltantes/Opcionais:**
    - Renderizar placeholder (“—” ou campo vazio) nos casos de dados opcionais ausentes.
    - Não travar o app caso campos opcionais estejam ausentes ou com valor nulo.
- **Falha ao importar biblioteca/custom:** Notificação amigável sem crash.
- **Atualizações futuras:** Verificação de schema/versão para avisar sobre recursos não suportados.

***

### Plano de Testes

1. **Testes de Unidade**
    - Parsing individual de cada entidade: personagem, traits, skills, spells, equipment, study, containers, ancestries.
    - Verificação de parsing correto das regras de dano.
    - Renderização correta de containers aninhados.
2. **Testes de Integração**
    - Importação e visualização de fichas grandes, médias e pequenas.
    - Importação e visualização de múltiplas bibliotecas.
    - Exibição correta de estados customizado/desatualizado.
    - Reconhecimento de estudo e campos avançados em diferentes fichas de exemplo.
3. **Testes de Interface**
    - Navegação por blocos, drilldown em inventário/containers.
    - Busca e filtro de itens.
    - Exibição visual de features, reactions, modifiers e conditions.
    - Mensagens de erro e alertas em casos de parsing falho, campos ausentes ou custom content.
4. **Testes de Regressão e Compatibilidade**
    - Testes com arquivos de diferentes versões do GCS.
    - Testes em diversas resoluções e sistemas (iOS/Android).
5. **Casos Limite**
    - Fichas com muitos níveis de containers (“matrioska”).
    - Fichas com regras de dano alternativas/não documentadas.
    - Importação de bibliotecas corrompidas ou incompletas.

***

### Considerações Finais

- Todo suporte a edição avançada, exportação em múltiplos formatos ou integração externa ficará exclusivamente para a versão desktop;
- O app deve ser capaz de “ler tudo o que chega”, mas limitar interações a navegação e pesquisa;
- Interfaces enxutas, responsivas e compatíveis com uso offline/local;
- O código deve ser modular, prevendo evolução futura para possíveis recursos de edição/exportação.

Caso queira exemplos práticos de telas, wireframes ou modelos de dados, posso elaborar!

