# produto.md — Ideias de Portfólio

Site com ideias de projetos de portfólio para uma pessoa que está começando em programação.
Cada ideia traz o passo a passo completo, do primeiro arquivo até o projeto publicado no
GitHub, usando IA como ferramenta.

## Pessoas

| Quem | O que faz |
|---|---|
| Leitora | Escolhe uma ideia, segue o passo a passo e publica o projeto no GitHub dela. Já viu o básico de HTML e CSS, mas nunca publicou um projeto. Usa o site pelo computador. |
| Mantenedor | Escreve e atualiza as ideias editando arquivos do repositório. Cada push na `main` publica o site. |

Não há login. O site é público e só de leitura.

## Princípio: IA como ferramenta, não como autora

É o que diferencia este guia de "peça para a IA fazer o site". Em todo projeto:

- **Ela escreve o código.** A IA explica conceitos, dá dicas, revisa o que ela fez e ajuda
  a encontrar erros.
- **A IA pode gerar o que é repetitivo e não é o foco** do aprendizado: textos fictícios,
  dados de exemplo, o banco de perguntas do quiz, sugestões de paleta de cores.
- **Nada entra no projeto sem que ela consiga explicar.** Toda etapa termina com perguntas
  de "Confira se entendeu".
- **Transparência.** O README de cada projeto tem a seção "Como usei IA", contando onde a IA
  ajudou.
- **Qualquer IA serve.** O site não indica ferramenta. Os prompts funcionam em qualquer
  assistente de chat.

As regras de escrita que aplicam o princípio estão em `conteudo.md`.

## Fora do escopo

Decidido na concepção, em 2026-09-24:

- Ensinar programação do zero. O site parte de quem já viu o básico.
- Calendário, prazos e acompanhamento de progresso.
- Backend, banco de dados e login.
- Recomendar uma IA específica.
- Versão pensada para celular. Em telas pequenas, o site só não pode quebrar.

Se algum desses itens voltar, reabrir o [ADR 0001](decisoes/0001-site-estatico-sem-backend.md).

## Páginas

### Menu lateral

Fixo em todas as páginas:

- Nome do site, com link para o Início
- **Início**
- As ideias agrupadas por nível, na ordem sugerida:
  - Nível 1 — HTML e CSS
  - Nível 2 — Primeiro JavaScript
  - Nível 3 — JavaScript mais completo
- O item da página atual fica destacado (`aria-current="page"`)
- Em desenvolvimento local, ideias em rascunho aparecem com o selo "Rascunho"

### Início

- Texto vindo de `conteudo/inicio.md`: o que é o site, o princípio "IA como ferramenta"
  resumido e como usar (seguir a ordem sugerida; ler a ideia inteira antes de começar;
  cada ideia tem tudo o que precisa)
- Cartões das ideias agrupados por nível: título, resumo, tecnologias e tempo estimado,
  com link para a ideia

### Ideia

- Cabeçalho: título, selo de nível, tecnologias, tempo estimado e "o que você vai treinar"
- Corpo: o Markdown da ideia, com estrutura fixa (ver `conteudo.md`)
- Blocos de código com botão **Copiar**:
  - ` ```prompt ` tem o rótulo "Prompt" e visual próprio, para destacar o que vai para a IA
  - ` ```bash ` tem o rótulo "Terminal"
  - os demais levam o nome da linguagem (HTML, CSS, JavaScript)
- Rodapé: links "← anterior" e "próxima →" pela ordem sugerida

### Não encontrada

- Mensagem curta e link para o Início

### Estados especiais

- Nenhuma ideia publicada: "Nenhuma ideia publicada ainda." no lugar dos cartões e do menu
- O índice não carrega: "Não foi possível carregar as ideias. Recarregue a página."
- O corpo de uma ideia não carrega: a mesma mensagem na área do conteúdo; o cabeçalho continua

## Visual

- Pensado para desktop (≥ 1024 px). Abaixo disso, só não pode ter rolagem horizontal.
- Feito para leitura longa: coluna de texto com no máximo ~75 caracteres por linha (≈ 760 px).
- Tema claro, com fontes do sistema (sem carregar fontes externas).
- Uma cor por nível, usada no selo e no menu, com contraste AA.
- Sem rastreamento, sem cookies e sem requisições para outros domínios.

## Catálogo — primeira leva

São 9 ideias, todas front-end estático, publicadas pela leitora no GitHub Pages dela. A
numeração segue a ordem sugerida. O `slug` de cada ideia é também o nome sugerido para o
repositório dela.

### Nível 1 — HTML e CSS

#### 1. Cardápio digital de uma cafeteria · `cardapio-cafeteria`

HTML, CSS · 6 a 10 horas

Página de cardápio de uma cafeteria inventada por ela, com nome, identidade visual e fotos.

- **Obrigatórios**
  - Cabeçalho com o nome da cafeteria, um slogan e o horário de funcionamento
  - Menu com links para as categorias (âncoras na própria página)
  - Pelo menos 4 categorias (ex.: cafés, bebidas geladas, doces, salgados), cada uma com 3 ou mais itens
  - Cada item com foto, nome, descrição curta e preço
  - Itens em grade com CSS Grid, mudando o número de colunas conforme a largura da tela
  - Cores e fontes definidas em variáveis CSS
  - Imagens com `alt` descritivo e peso reduzido
  - Rodapé com endereço fictício e links de redes sociais
- **Desafios extras:** selos "novo" e "vegano"; destaque "especial do dia"; rolagem suave
  entre categorias; versão para impressão.
- **Treina:** HTML semântico, imagens acessíveis, CSS Grid, variáveis CSS, âncoras.
- **Onde a IA mais ajuda:** inventar nomes e descrições dos itens; sugerir paleta e
  combinação de fontes; revisar a semântica do HTML.
- **Observação:** fotos de bancos gratuitos (Unsplash, Pexels), com crédito no README.

#### 2. Landing page de um negócio fictício · `landing-page-negocio`

HTML, CSS · 8 a 12 horas

Página de apresentação de um negócio inventado por ela (estúdio de yoga, confeitaria,
aplicativo...), com as seções clássicas de uma landing page.

- **Obrigatórios**
  - Menu fixo no topo, com links para as seções
  - Seção principal com título, subtítulo e botão de ação
  - Benefícios ou serviços em cartões lado a lado (Flexbox)
  - Depoimentos de clientes fictícios
  - Planos e preços em cartões, com um plano em destaque
  - Perguntas frequentes com `<details>` e `<summary>`
  - Formulário de contato com validação nativa do HTML (`required`, `type="email"`). Ele não
    envia nada de verdade, e o README deixa isso claro.
  - Responsiva: construída primeiro para telas pequenas (mobile-first), com media queries
    para as maiores
- **Desafios extras:** animações de entrada em CSS; menu "hambúrguer" em telas pequenas;
  modo escuro com `prefers-color-scheme`.
- **Treina:** Flexbox, Grid, media queries, mobile-first, formulários, acessibilidade básica.
- **Onde a IA mais ajuda:** textos de venda e depoimentos fictícios; entender por que o
  layout quebra numa largura específica; checar acessibilidade.

#### 3. Clone da tela inicial de um site conhecido · `clone-tela-inicial`

HTML, CSS · 10 a 15 horas

Reproduzir com fidelidade a tela inicial de um site conhecido (Spotify, Netflix ou Airbnb, à
escolha dela). Mostra que ela consegue transformar um layout real em código.

- **Obrigatórios**
  - Escolher um site e salvar prints de referência da versão desktop
  - Reproduzir a estrutura: cabeçalho, menus, barra lateral (se houver), fileiras ou grades de cartões
  - Espaçamentos, tamanhos e tipografia próximos do original, medidos com o DevTools do navegador
  - Fileira de cartões com rolagem horizontal em CSS (`overflow-x`, `scroll-snap`)
  - Efeitos de hover em cartões e botões
  - Funcionar bem em pelo menos duas larguras (notebook e monitor grande)
- **Regras:** nada de logotipo, fotos ou textos oficiais. Usar nome genérico, imagens de
  bancos gratuitos e texto fictício. O README diz que é um projeto de estudo, sem vínculo
  com a empresa.
- **Desafios extras:** prints lado a lado (original × clone) no README; versão para celular;
  tema alternativo com outras cores.
- **Treina:** ler um layout real, DevTools, posicionamento, overflow e scroll-snap,
  fidelidade visual.
- **Onde a IA mais ajuda:** dividir o layout em blocos antes de codar; explicar as
  propriedades encontradas no DevTools; descobrir por que algo está desalinhado.

### Nível 2 — Primeiro JavaScript

#### 4. Gerador de senhas · `gerador-senhas`

HTML, CSS, JavaScript · 6 a 10 horas

Ferramenta que gera senhas fortes com as opções escolhidas. Pequena, útil e boa para o
primeiro contato com JavaScript.

- **Obrigatórios**
  - Controle de tamanho (8 a 64), mostrando o valor atual
  - Opções de maiúsculas, minúsculas, números e símbolos
  - Aviso quando nenhuma opção está marcada; nesse caso, não gerar
  - Senha com pelo menos um caractere de cada tipo marcado
  - Aleatoriedade com `crypto.getRandomValues`, e não `Math.random`, explicando o porquê
  - Botão copiar (Clipboard API) com retorno "Copiado!"
  - Indicador de força (fraca, média, forte), com a regra explicada na tela
- **Desafios extras:** evitar caracteres parecidos (0/O, l/1/I); histórico das últimas 5
  senhas só enquanto a página está aberta, sem gravar senhas no navegador (e explicar por
  quê); modo frase-senha.
- **Treina:** DOM e eventos (`input`, `change`, `click`), strings e arrays, aleatoriedade
  segura, Clipboard API.
- **Onde a IA mais ajuda:** explicar a diferença entre `Math.random` e `crypto`; discutir a
  regra de força; revisar a lógica que garante um caractere de cada tipo.

#### 5. Quiz de perguntas · `quiz-perguntas`

HTML, CSS, JavaScript · 8 a 12 horas

Quiz sobre um tema de que ela goste, com retorno a cada resposta e resultado no final.

- **Obrigatórios**
  - Pelo menos 10 perguntas num array de objetos (pergunta, alternativas, resposta certa, explicação)
  - Uma pergunta por vez, com barra de progresso
  - Retorno imediato de certo ou errado, com a explicação
  - Pontuação e tela final com o resultado e botão de recomeçar
  - Ordem das perguntas embaralhada a cada partida (algoritmo Fisher–Yates)
- **Desafios extras:** tempo limite por pergunta; recorde salvo no navegador (localStorage);
  categorias ou níveis de dificuldade; revisão das respostas no final.
- **Treina:** arrays de objetos, estado da aplicação, montar HTML pelo JavaScript, eventos,
  embaralhamento.
- **Onde a IA mais ajuda:** gerar o banco de perguntas (é dado, não é o foco), com ela
  conferindo cada resposta; explicar o Fisher–Yates; revisar como o estado do quiz está
  organizado.

#### 6. Jogo da memória · `jogo-memoria`

HTML, CSS, JavaScript · 8 a 12 horas

O clássico jogo de encontrar pares, com cronômetro e contador de jogadas.

- **Obrigatórios**
  - Grade com 8 pares (16 cartas) de emojis ou ícones
  - Cartas embaralhadas a cada partida (Fisher–Yates)
  - Animação de virar a carta em CSS (efeito 3D)
  - Duas cartas por vez: se não formam par, desviram depois de um instante, e os cliques
    ficam bloqueados enquanto isso
  - Contador de jogadas e cronômetro
  - Tela de vitória com tempo e jogadas, e botão de jogar de novo
- **Desafios extras:** níveis (4×4, 6×6); melhor tempo salvo no navegador; sons; jogável
  pelo teclado.
- **Treina:** estado do jogo, `setTimeout` e `setInterval`, classes CSS controladas pelo
  JavaScript, animações CSS, prevenção de clique duplo.
- **Onde a IA mais ajuda:** explicar `transform` 3D e `backface-visibility`; depurar o bug
  clássico de clicar rápido em três cartas; revisar a organização do estado.

#### 7. Registro de hábitos diários · `registro-habitos`

HTML, CSS, JavaScript · 10 a 14 horas

App para acompanhar hábitos do dia a dia (beber água, ler, estudar) e ver a sequência de
dias cumpridos.

- **Obrigatórios**
  - Adicionar e remover hábitos
  - Marcar e desmarcar um hábito como feito hoje
  - Mostrar os últimos 7 dias de cada hábito
  - Sequência atual (dias seguidos cumpridos)
  - Dados salvos no navegador (localStorage, em JSON)
  - Datas pelo dia local. Cuidado: `toISOString()` usa UTC e, à noite no Brasil, já marca o
    dia seguinte.
- **Desafios extras:** mapa do mês estilo "heatmap"; nome, cor e ícone editáveis; exportar
  e importar os dados em JSON; meta semanal.
- **Treina:** datas em JavaScript, localStorage e JSON, modelagem de dados, renderização de
  listas.
- **Onde a IA mais ajuda:** pensar no formato dos dados antes de codar; explicar fuso
  horário; calcular a sequência (primeiro uma dica, depois a resposta).

### Nível 3 — JavaScript mais completo

#### 8. Controle de gastos pessoais · `controle-gastos`

HTML, CSS, JavaScript, Chart.js · 14 a 20 horas

App para registrar entradas e saídas, com filtros, totais e gráfico por categoria.

- **Obrigatórios**
  - Lançamento com descrição, valor, categoria, data e tipo (entrada ou saída), validado antes de salvar
  - Listar, editar e excluir (excluir pede confirmação)
  - Filtros por mês e por categoria
  - Totais do período: entradas, saídas e saldo
  - Gráfico de gastos por categoria com Chart.js
  - Valores em reais com `Intl.NumberFormat`, guardados em centavos (números inteiros) para
    evitar erro de arredondamento
  - Dados salvos no navegador
  - Código dividido em módulos (ES modules): dados, cálculos e tela separados
- **Desafios extras:** exportar CSV; orçamento por categoria com alerta; categorias
  personalizadas; modo escuro.
- **Treina:** CRUD (cadastrar, ler, editar e excluir), módulos, validação de formulário,
  `Intl`, uso de biblioteca externa, estado derivado (totais).
- **Onde a IA mais ajuda:** planejar a divisão em módulos; explicar por que
  `0.1 + 0.2 !== 0.3`; ler a documentação do Chart.js junto com ela; revisão de código.

#### 9. Quadro Kanban · `quadro-kanban`

HTML, CSS, JavaScript · 14 a 20 horas

Quadro de tarefas em colunas, com cartões que se arrastam de uma coluna para outra.

- **Obrigatórios**
  - Colunas "A fazer", "Fazendo" e "Feito"
  - Criar, editar e excluir cartões (título e descrição opcional)
  - Arrastar cartões entre colunas e reordenar dentro da coluna (HTML Drag and Drop API)
  - Contador de cartões por coluna
  - Mensagem amigável quando a coluna está vazia
  - Dados salvos no navegador
  - Estado (colunas e cartões com `id`) separado do código que desenha a tela
- **Desafios extras:** colunas personalizadas; etiquetas coloridas com filtro; prazo com
  destaque para atrasados; mover cartões pelo teclado; arrastar no celular (a Drag and Drop
  API não funciona com toque; exige Pointer Events).
- **Treina:** Drag and Drop API, modelagem de estado, módulos, separação entre estado e
  renderização.
- **Onde a IA mais ajuda:** desenhar o modelo de dados; entender os eventos de arrastar
  (`dragstart`, `dragover`, `drop`); depurar a reordenação.

## Backlog de ideias

Ficaram de fora da primeira leva e são as candidatas às próximas:

- **Nível 1:** Página "Sobre mim"; Currículo online imprimível; Galeria de fotos com efeitos só em CSS
- **Nível 2:** Lista de tarefas; Calculadora; Timer Pomodoro
- **Nível 3:** Portfólio pessoal que reúne os projetos publicados (boa candidata a fechar a
  primeira leva)
- **Consumindo APIs públicas** (ainda no GitHub Pages, sem backend): Busca de CEP (ViaCEP);
  App de clima (Open-Meteo); Pokédex (PokéAPI); Conversor de moedas (AwesomeAPI)

## Backlog do site

- Sumário "Nesta página" para navegar pelas páginas longas
- Filtro de ideias por tecnologia
- Modo escuro
- Marcar etapas como feitas, salvando só no navegador (exigiria rever "Fora do escopo")

## Roadmap

1. **Estrutura do site.** Criar o projeto Angular, o layout com menu lateral, o script de
   conteúdo com validação e testes, as páginas e o deploy no GitHub Pages. As 9 ideias
   entram como `rascunho`, com o esqueleto do modelo, e os blocos padrão com texto
   provisório. O site vai ao ar mostrando "Nenhuma ideia publicada ainda".
2. **Blocos padrão.** Escrever `conteudo/blocos/`: preparação do ambiente, princípios de uso
   da IA, criação do repositório, revisão com IA, README, publicação e checklist. É tudo o
   que se repete nas 9 ideias.
3. **Conteúdo da primeira leva.** Escrever as 9 ideias na ordem sugerida. Cada uma vira
   `publicada` quando passar pela revisão de `conteudo.md`.
4. **Próximas levas**, a partir do backlog.
