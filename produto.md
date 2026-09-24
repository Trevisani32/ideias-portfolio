# produto.md — Ideias de Portfólio

Site com ideias de projetos de portfólio para uma pessoa que está começando em programação.
Cada ideia traz o passo a passo completo, do primeiro arquivo até o projeto publicado no
GitHub, com a IA no papel de professora particular.

## Pessoas

| Quem | O que faz |
|---|---|
| Leitora | Escolhe uma ideia, segue o passo a passo com a IA e publica o projeto no GitHub dela. Já viu o básico de HTML e CSS, mas nunca publicou um projeto. Usa o site pelo computador. |
| Mantenedor | Escreve e atualiza as ideias e o recado editando arquivos do repositório. Cada push na `main` publica o site. |

Não há login. O site é público e só de leitura.

## Princípio: a IA como professora

Decidido em 2026-09-24 ([ADR 0004](decisoes/0004-ia-como-professora.md)):

- **A IA escreve o código**, sempre explicando **o que** vai fazer, **como** e **por quê**:
  antes do código, um resumo da abordagem; depois, a explicação de cada trecho.
- **A leitora conduz:** planeja, documenta, testa cada parte no navegador, pergunta até
  entender e faz os commits.
- **Nada entra no projeto sem que ela consiga explicar.** Toda parte termina com perguntas de
  "Confira se entendeu".
- **Transparência:** o README de cada projeto tem a seção "Como usei IA".
- **Qualquer IA serve.** O site não indica ferramenta; os prompts funcionam em qualquer
  assistente de chat.

## Método: o mesmo caminho em toda ideia

Toda ideia segue o mesmo passo a passo, e cada etapa é detalhada, dizendo o que fazer, como e
por quê:

1. **Escolher a stack e preparar o computador:** quais tecnologias, o que instalar.
2. **Documentar o projeto:** visão geral, funcionalidades, casos de uso, telas, dados (e se
   precisa de banco de dados), estrutura de arquivos, stack e como a IA vai ajudar. O
   documento fica em `docs/projeto.md` no repositório dela.
3. **Criar o repositório:** Git e GitHub, começando pela documentação.
4. **Dividir o projeto em partes:** partes pequenas, cada uma visível no navegador.
5. **Uma etapa por parte:** o prompt que pede código com explicação, como testar, perguntas
   para aprofundar, "Confira se entendeu" e o commit.
6. **Revisar e testar**, **escrever o README** e **publicar no GitHub Pages**.

As etapas 1 a 4 e as finais são iguais em todas as ideias (trechos padrão) e ganham, em cada
ideia, a parte específica daquele projeto. Formato e regras: `conteudo.md`.

## Fora do escopo

Decidido na concepção, em 2026-09-24:

- Ensinar programação do zero. O site parte de quem já viu o básico.
- Calendário, prazos e acompanhamento de progresso.
- Tempo estimado das ideias.
- Backend, banco de dados e login.
- Recomendar uma IA específica.
- Versão pensada para celular. Em telas pequenas, o site só não pode quebrar.

Se algum desses itens voltar, reabrir o [ADR 0001](decisoes/0001-site-estatico-sem-backend.md).

## Blocos de ideias

As ideias ficam em **blocos**: grupos em ordem progressiva, cada ideia um pouco mais
desafiadora que a anterior ([ADR 0005](decisoes/0005-ideias-em-blocos.md)). Hoje existe um
bloco; os próximos entram como novos arquivos em `conteudo/blocos/`.

Cada ideia mostra a dificuldade em coraçõezinhos (1 a 3: iniciante, intermediária,
desafiadora), sem separar as ideias por nível.

## Páginas

### Menu lateral

Fixo em todas as páginas:

- Marca do site, com link para o Início
- **Início**
- **💌 Para você**, com destaque
- Os blocos, cada um com as suas ideias numeradas na ordem da trilha (número, emoji e
  título). O item da página atual fica destacado (`aria-current="page"`).
- Em desenvolvimento local, ideias em rascunho têm um pontinho âmbar
- Rodapé "feito com 💗"

### Início

- Hero com título e subtítulo (frontmatter de `conteudo/inicio.md`) e botão "Começar pela
  primeira ideia"
- Cartão com o texto de `conteudo/inicio.md`: como funciona e dicas
- Cada bloco com número, título e descrição, e as ideias como uma **trilha**: cartões em
  sequência, ligados por uma linha pontilhada, com número, emoji, dificuldade, título,
  resumo e tecnologias

### Ideia

- Capa: voltar para todas as ideias, emoji, "Bloco N · título · Ideia X de Y", título, resumo,
  dificuldade, tecnologias e "o que você vai aprender"
- Corpo: o Markdown da ideia (estrutura fixa, ver `conteudo.md`), num cartão branco
- Etapas com visual de cartão; blocos de código com botão **Copiar**:
  - ` ```prompt `: "💬 Prompt para a IA", moldura rosa e texto corrido
  - ` ```bash `: "⌨️ Terminal", fundo escuro
  - os demais levam o nome da linguagem (HTML, CSS, JavaScript...)
- Rodapé: "← anterior" e "próxima →" pela ordem da trilha

### Para você

- O recado escrito pelo mantenedor em `conteudo/recado.md` (título no frontmatter), com
  visual de cartinha: papel pautado, fonte manuscrita, selo 💌 e coraçõezinhos
- O recado é **público**, como todo o conteúdo do repositório

### Não encontrada

- "Ops! Página não encontrada" e botão para o Início

### Estados especiais

- Nenhuma ideia publicada: "Nenhuma ideia publicada ainda." no lugar da trilha e do menu
- O índice não carrega: "Não foi possível carregar as ideias. Recarregue a página."
- O corpo de uma ideia não carrega: a mesma mensagem na área do conteúdo; a capa continua

## Visual

- **Bonito e fofo:** paleta pastel (rosa, lilás, azul-céu), gradientes suaves, cantos bem
  arredondados, sombras leves, emojis e enfeites (✦ ♡ ✿) que flutuam devagar.
- **Fontes:** Nunito (texto), Fredoka (títulos) e Caveat (recado), servidas pelo próprio
  site (pacotes `@fontsource-variable`), sem requisições externas.
- **Ícone do site:** uma tulipa branca com um brilho, sobre um quadrado arredondado em
  gradiente rosa → lilás (a mesma 🌷 da marca no menu). Também vira o ícone do atalho no
  celular.
- **Barras de rolagem** no mesmo estilo: trilho clarinho e pílula em gradiente rosa → lilás
  (mais forte ao passar o mouse). No menu lateral, fininha e só visível com o mouse em cima;
  nos blocos de código, horizontal e discreta (clarinha no terminal).
- Pensado para desktop (≥ 1024 px). Abaixo disso, o menu vai para o topo e nada quebra.
- Leitura longa: coluna de texto com no máximo ~48rem.
- Contraste AA nos textos; animações desligadas com `prefers-reduced-motion`.
- Sem rastreamento, sem cookies e sem requisições para outros domínios.

## Catálogo — bloco "Primeiros projetos"

Nove ideias de front-end estático, publicadas pela leitora no GitHub Pages dela. A
especificação completa de cada uma (requisitos, stack, documento e partes) está no arquivo da
ideia, em `conteudo/ideias/<slug>.md`.

| # | Ideia | Slug | Dificuldade | Partes |
|---|---|---|---|---|
| 1 | ☕ Cardápio digital de uma cafeteria | `cardapio-cafeteria` | ♥ | 5 |
| 2 | 🛍️ Landing page de um negócio fictício | `landing-page-negocio` | ♥ | 6 |
| 3 | 🎬 Clone da tela inicial de um site conhecido | `clone-tela-inicial` | ♥ | 5 |
| 4 | 🔐 Gerador de senhas | `gerador-senhas` | ♥♥ | 4 |
| 5 | 🧠 Quiz de perguntas | `quiz-perguntas` | ♥♥ | 5 |
| 6 | 🃏 Jogo da memória | `jogo-memoria` | ♥♥ | 5 |
| 7 | 🌱 Registro de hábitos diários | `registro-habitos` | ♥♥ | 5 |
| 8 | 🐷 Controle de gastos pessoais | `controle-gastos` | ♥♥♥ | 5 |
| 9 | 📋 Quadro Kanban | `quadro-kanban` | ♥♥♥ | 5 |

## Backlog de ideias

Candidatas aos próximos blocos:

- **Mais projetos de front-end:** Página "Sobre mim"; Currículo online imprimível; Galeria de
  fotos com efeitos só em CSS; Lista de tarefas; Calculadora; Timer Pomodoro; Portfólio
  pessoal que reúne os projetos publicados
- **Consumindo APIs públicas** (ainda no GitHub Pages, sem backend): Busca de CEP (ViaCEP);
  App de clima (Open-Meteo); Pokédex (PokéAPI); Conversor de moedas (AwesomeAPI)

## Backlog do site

- Sumário "Nesta página" para navegar pelas páginas longas
- Filtro de ideias por tecnologia
- Modo escuro
- Marcar etapas como feitas, salvando só no navegador (exigiria rever "Fora do escopo")

## Roadmap

1. **Estrutura do site** (feita em 2026-09-24). Projeto Angular, layout, script de conteúdo
   com validação e testes, páginas e deploy no GitHub Pages.
2. **IA professora, blocos e visual novo** (feito em 2026-09-24). Método fixo do passo a passo,
   trechos padrão escritos por completo, as 9 ideias com todas as partes detalhadas, agrupamento
   em blocos, página "Para você" e visual fofo.
3. **Revisão e publicação da primeira leva.** Revisar cada ideia (ver `conteudo.md`), testar
   os prompts numa IA de verdade e mudar para `status: publicada`.
4. **Próximos blocos**, a partir do backlog.
