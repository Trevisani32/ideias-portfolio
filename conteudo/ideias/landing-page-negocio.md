---
titulo: Landing page de um negócio fictício
slug: landing-page-negocio
bloco: primeiros-projetos
ordem: 2
nivel: 1
icone: "🛍️"
resumo: "Página de apresentação de um negócio inventado por você, com as seções clássicas de uma landing page e layout responsivo."
tecnologias: [HTML, CSS]
treina: [Flexbox, Grid, Media queries, Mobile-first, Formulários, Acessibilidade básica]
status: publicada
---

## Sobre o projeto

A página de apresentação de um negócio inventado por você: um estúdio de yoga, uma confeitaria, um aplicativo. Landing pages estão em todo lugar, e fazer uma bem-feita mostra que você domina layout e responsividade, duas coisas que qualquer vaga de front-end pede.

## O que você vai aprender

- **Flexbox:** alinhar cartões lado a lado e distribuir o espaço entre eles.
- **Grid:** montar seções com mais de uma coluna.
- **Media queries:** mudar o layout conforme a largura da tela.
- **Mobile-first:** começar pelo layout de telas pequenas e ir ampliando.
- **Formulários:** campos com a validação que o próprio navegador oferece.
- **Acessibilidade básica:** contraste, textos alternativos e navegação pelo teclado.

## Requisitos

### Obrigatórios

- Menu fixo no topo, com links para as seções
- Seção principal com título, subtítulo e botão de ação
- Benefícios ou serviços em cartões lado a lado (Flexbox)
- Depoimentos de clientes fictícios
- Planos e preços em cartões, com um plano em destaque
- Perguntas frequentes com `<details>` e `<summary>`
- Formulário de contato com validação nativa do HTML (`required`, `type="email"`). Ele não envia nada de verdade, e o README deixa isso claro.
- Responsiva: construída primeiro para telas pequenas, com media queries para as maiores

### Desafios extras

- Animações de entrada em CSS
- Menu "hambúrguer" em telas pequenas
- Modo escuro com `prefers-color-scheme`

## Antes de começar

<!-- trecho: ia-professora -->

Antes de começar este projeto, invente o negócio: o nome, o que ele vende e para quem. Isso guia os textos, as cores e as imagens da página.

## Passo a passo

<!-- trecho: escolher-stack -->

#### A stack deste projeto

- **HTML:** todas as seções e os textos da página, além do formulário.
- **CSS:** o layout com Flexbox e Grid, as media queries e a identidade visual.
- **Imagens:** fotos ou ilustrações gratuitas (Unsplash, Pexels ou unDraw), com crédito no README.
- **Nada mais para instalar:** sem bibliotecas e sem servidor.

<!-- trecho: documentar-projeto -->

#### O que não pode faltar no documento deste projeto

- **Visão geral:** o negócio, o público e o objetivo da página. Em geral, o objetivo é fazer a pessoa escolher um plano ou entrar em contato.
- **Casos de uso:** "Conhecer o negócio" (lê a seção principal e os benefícios), "Escolher um plano" (compara os planos), "Tirar uma dúvida" (abre uma pergunta frequente) e "Pedir contato" (preenche o formulário e vê a validação funcionando).
- **Telas:** uma página longa, com as seções em sequência. Desenhe primeiro no celular, tudo em uma coluna, e depois no computador, com os cartões lado a lado. É o mobile-first já no papel!
- **Dados:** os textos ficam no HTML. O formulário não envia nada; explique no documento por que (não há servidor para receber os dados).
- **Estrutura de arquivos:** `index.html`, `css/estilos.css` e a pasta `imagens/`.

<!-- trecho: criar-repositorio -->

<!-- trecho: dividir-em-partes -->

#### As partes deste projeto

1. **Estrutura e textos:** todas as seções em HTML semântico, com os textos do negócio.
2. **Base visual mobile-first:** cores, fontes e espaçamentos, com tudo em uma coluna.
3. **Menu fixo e seção principal:** o topo sempre visível e a primeira impressão da página.
4. **Cartões com Flexbox:** benefícios, depoimentos e planos.
5. **Telas maiores:** media queries para tablet e computador.
6. **Perguntas frequentes e formulário:** o FAQ interativo e o formulário com validação.

### Etapa — Parte: Estrutura e textos

**O que esta parte entrega:** a página inteira em HTML, com todas as seções e textos, ainda sem estilo.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Estrutura e textos" da landing page. O meu negócio é [DESCREVA O NEGÓCIO: NOME, O QUE VENDE E PARA QUEM].

Crie o index.html com estas seções, nesta ordem: header com o nome e um nav com links para as seções; seção principal com título, subtítulo e um botão de ação; benefícios (3 itens); depoimentos (3 clientes fictícios); planos e preços (3 planos, um deles em destaque); perguntas frequentes com details e summary (4 perguntas); formulário de contato com nome, e-mail e mensagem; e footer.

Escreva textos de verdade, com cara de site profissional, combinando com o meu negócio. Use tags semânticas e deixe no head o link para css/estilos.css.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** abra com o Live Server. Todas as seções aparecem em ordem, os links do menu levam para a seção certa e as perguntas frequentes abrem e fecham ao clicar, mesmo sem nenhum CSS.

**Pergunte à professora:**

- Por que `<details>` e `<summary>` funcionam sem nenhum JavaScript?
- Por que cada campo do formulário precisa de um `<label>`?
- Como os títulos (`h1`, `h2`, `h3`) ajudam quem usa leitor de tela?

**Confira se entendeu:**

- Quantos `<h1>` a página deve ter, e por quê?

**Salve no Git:**

```bash
git add .
git commit -m "Cria a estrutura e os textos da landing page"
git push
```

### Etapa — Parte: Base visual mobile-first

**O que esta parte entrega:** a página com cores, fontes e espaçamentos, pensada primeiro para o celular.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Base visual mobile-first". Sugira uma paleta de cores e uma combinação de fontes que combinem com o meu negócio e explique a escolha.

Crie o css/estilos.css com variáveis CSS no :root (cores, fontes e espaçamentos) e os estilos gerais: corpo da página, títulos, parágrafos, links, botões e o espaçamento entre as seções. Por enquanto, tudo em uma coluna, pensado para telas pequenas.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** com o DevTools no modo de dispositivo, escolha um celular. A página fica legível, sem texto colado nas bordas e sem nada vazando para os lados.

**Pergunte à professora:**

- O que significa mobile-first, e por que começar pelo celular costuma dar menos trabalho?
- Qual a diferença entre as unidades `px`, `rem` e `%`?

**Confira se entendeu:**

- Por que o CSS escrito até aqui funciona em qualquer tamanho de tela?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona a base visual mobile-first"
git push
```

### Etapa — Parte: Menu fixo e seção principal

**O que esta parte entrega:** um menu que acompanha a rolagem e uma seção principal que chama atenção.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Menu fixo e seção principal". Quero o header sempre visível no topo quando a página rola, com o nome do negócio de um lado e os links do outro. A seção principal deve ter um fundo marcante (cor, gradiente ou imagem), o título grande e o botão de ação bem visível, com um efeito ao passar o mouse.

Cuide para o menu fixo não cobrir o começo das seções quando clico nos links. Me mostre o css/estilos.css completo.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** role a página e veja o menu no topo. Clique em cada link: o título da seção não pode ficar escondido atrás do menu.

**Pergunte à professora:**

- Qual a diferença entre `position: sticky` e `position: fixed`?
- Para que serve o `scroll-margin-top`?
- Como garantir que o texto sobre uma imagem de fundo continue legível?

**Confira se entendeu:**

- Onde você mudaria a altura do menu, e o que mais precisaria ajustar junto?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona o menu fixo e estiliza a seção principal"
git push
```

### Etapa — Parte: Cartões com Flexbox

**O que esta parte entrega:** benefícios, depoimentos e planos em cartões bonitos, com o plano em destaque.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Cartões com Flexbox". Estilize os benefícios, os depoimentos e os planos como cartões usando Flexbox. No celular, os cartões ficam um embaixo do outro. O plano em destaque precisa chamar atenção (borda, cor ou um selo "Mais escolhido").

Me explique as propriedades de Flexbox que você usar, principalmente flex-direction, gap, justify-content e align-items.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** os cartões aparecem organizados, com o mesmo espaçamento entre eles. O plano em destaque é o primeiro que o olho encontra.

**Pergunte à professora:**

- Qual a diferença entre `justify-content` e `align-items`?
- Quando usar Flexbox e quando usar Grid?

**Confira se entendeu:**

- O que muda se você trocar `flex-direction: column` por `row`?

**Salve no Git:**

```bash
git add .
git commit -m "Estiliza benefícios, depoimentos e planos com Flexbox"
git push
```

### Etapa — Parte: Telas maiores

**O que esta parte entrega:** a página se adaptando a tablets e computadores, com os cartões lado a lado.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Telas maiores". Adicione media queries para a partir de 768px (tablet) e de 1024px (computador): os cartões ficam lado a lado, o conteúdo ganha uma largura máxima centralizada e a seção principal pode ter texto e imagem em duas colunas.

Me explique como escolher os pontos de quebra e por que usamos min-width numa abordagem mobile-first.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** no DevTools, vá aumentando a largura aos poucos: o layout muda em 768px e em 1024px, sem nenhuma largura em que fique quebrado.

**Pergunte à professora:**

- Por que usar `min-width` e não `max-width` nas media queries deste projeto?
- Para que serve o `max-width` no container principal?

**Confira se entendeu:**

- Numa tela de 900px, quais regras de media query estão valendo?

**Salve no Git:**

```bash
git add .
git commit -m "Adapta o layout para tablets e computadores"
git push
```

### Etapa — Parte: Perguntas frequentes e formulário

**O que esta parte entrega:** o FAQ estilizado e um formulário bonito, que avisa quando algo está errado.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Perguntas frequentes e formulário". Estilize o details e o summary do FAQ, com um ícone que gira quando a pergunta abre. Estilize o formulário: campos confortáveis de preencher, foco bem visível e uma borda de erro quando o campo é inválido, usando :focus-visible e :user-invalid.

Mantenha a validação nativa do HTML (required e type="email") e me explique como ela funciona sem JavaScript.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** abra e feche as perguntas. Tente enviar o formulário vazio e depois com um e-mail inválido: o navegador deve avisar e o campo deve ficar marcado. Navegue pelo formulário só com a tecla Tab.

**Pergunte à professora:**

- Qual a diferença entre `:invalid` e `:user-invalid`?
- Por que não devemos tirar o contorno de foco dos campos?

**Confira se entendeu:**

- Por que o formulário não envia a mensagem de verdade?

**Salve no Git:**

```bash
git add .
git commit -m "Estiliza as perguntas frequentes e o formulário"
git push
```

<!-- trecho: revisar-e-testar -->

<!-- trecho: escrever-readme -->

<!-- trecho: publicar-github-pages -->

## Checklist de entrega

<!-- trecho: checklist-entrega -->

- A página funciona bem em celular, tablet e computador
- O README avisa que o formulário é só visual

## Para ir além

- Faça os desafios extras: animações de entrada, menu hambúrguer e modo escuro.
- Troque o negócio e refaça só o CSS: um bom exercício para ver como a mesma estrutura HTML pode ganhar outra cara.
