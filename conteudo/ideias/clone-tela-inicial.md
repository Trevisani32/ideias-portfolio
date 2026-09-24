---
titulo: Clone da tela inicial de um site conhecido
slug: clone-tela-inicial
bloco: primeiros-projetos
ordem: 3
nivel: 1
icone: "🎬"
resumo: "Reprodução fiel da tela inicial de um site conhecido, para treinar a transformação de um layout real em código."
tecnologias: [HTML, CSS]
treina: [Leitura de layout, DevTools, Posicionamento, Overflow e scroll-snap, Fidelidade visual]
status: publicada
---

## Sobre o projeto

Reproduzir com fidelidade a tela inicial de um site conhecido: Spotify, Netflix ou Airbnb, à sua escolha. Mostra para quem avalia o seu portfólio que você consegue olhar um layout real e transformar em código, que é exatamente o que uma pessoa desenvolvedora front-end faz no dia a dia com os designs de uma equipe.

## O que você vai aprender

- **Leitura de layout:** dividir uma tela pronta em blocos antes de codar.
- **DevTools:** inspecionar medidas, cores e fontes de um site real.
- **Posicionamento:** controlar onde cada elemento fica na tela.
- **Overflow e scroll-snap:** criar fileiras que rolam na horizontal e param no lugar certo.
- **Fidelidade visual:** chegar perto do original em espaçamentos e tipografia.

## Requisitos

### Obrigatórios

- Escolher um site e salvar prints de referência da versão desktop
- Reproduzir a estrutura: cabeçalho, menus, barra lateral (se houver), fileiras ou grades de cartões
- Espaçamentos, tamanhos e tipografia próximos do original, medidos com o DevTools do navegador
- Fileira de cartões com rolagem horizontal em CSS (`overflow-x`, `scroll-snap`)
- Efeitos de hover em cartões e botões
- Funcionar bem em pelo menos duas larguras (notebook e monitor grande)

### Regras

- Nada de logotipo, fotos ou textos oficiais: use um nome genérico, imagens de bancos gratuitos e texto fictício.
- O README diz que é um projeto de estudo, sem vínculo com a empresa.

### Desafios extras

- Prints lado a lado (original × clone) no README
- Versão para celular
- Tema alternativo com outras cores

## Antes de começar

<!-- trecho: ia-professora -->

Este projeto é um **estudo de layout**, não uma cópia da marca. Você reproduz a organização da tela, os espaçamentos e o jeito de navegar, mas com nome, imagens e textos seus. Isso deixa o projeto seguro de publicar e ainda mostra criatividade.

## Passo a passo

<!-- trecho: escolher-stack -->

#### A stack deste projeto

- **HTML:** a estrutura da tela, com as mesmas áreas do site original.
- **CSS:** o layout, as medidas e os efeitos.
- **DevTools do navegador:** a sua régua. É com ele que você mede cores, fontes e espaçamentos do original.
- **Fontes parecidas e gratuitas:** a fonte original de marcas grandes costuma ser paga; peça para a professora sugerir uma parecida no Google Fonts.
- **Nada mais para instalar.**

<!-- trecho: documentar-projeto -->

#### O que não pode faltar no documento deste projeto

- **Visão geral:** qual site você escolheu, por que, e o nome fictício do seu clone.
- **Referência:** salve o print da tela original em `docs/referencia.png` e cite no documento.
- **Casos de uso:** "Navegar pela tela inicial", "Rolar uma fileira de cartões na horizontal" e "Passar o mouse sobre um cartão".
- **Telas:** o print dividido em blocos numerados (cabeçalho, barra lateral, fileiras de cartões...). Descreva cada bloco: o que tem dentro, onde fica e como se comporta na rolagem.
- **Dados:** textos e imagens fictícios, escritos direto no HTML. Não há banco de dados.
- **Estrutura de arquivos:** `index.html`, `css/estilos.css`, a pasta `imagens/` e `docs/referencia.png`.
- **Regras de marca:** anote as regras deste projeto para não esquecer.

<!-- trecho: criar-repositorio -->

<!-- trecho: dividir-em-partes -->

#### As partes deste projeto

1. **Mapa do layout:** a tela dividida em blocos e o esqueleto em HTML.
2. **Medidas e variáveis:** cores, fontes e espaçamentos do original, medidos no DevTools.
3. **Cabeçalho e barra lateral:** a moldura da tela, com as áreas no lugar certo.
4. **Fileiras de cartões:** as listas que rolam na horizontal, com efeitos de hover.
5. **Ajuste fino:** a comparação lado a lado com o original e as correções.

### Etapa — Parte: Mapa do layout

**O que esta parte entrega:** o esqueleto HTML com todas as áreas da tela, na mesma organização do original.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Mapa do layout" do meu clone da tela inicial do [SITE ESCOLHIDO]. O meu clone vai se chamar [NOME FICTÍCIO].

[SE A SUA IA ACEITAR IMAGENS, ANEXE O PRINT. SE NÃO, DESCREVA A TELA: O QUE TEM NO TOPO, NAS LATERAIS E NO MEIO, E COMO OS CARTÕES ESTÃO ORGANIZADOS]

Primeiro, me ajude a dividir a tela em blocos e me explique como você enxerga a estrutura dela. Depois, crie o index.html só com a estrutura: as áreas principais com tags semânticas, as fileiras de cartões com conteúdo fictício e o link para css/estilos.css no head. Ainda sem CSS.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** abra com o Live Server. Sem estilo, a página parece uma lista longa, mas a ordem das áreas deve seguir a do original.

**Pergunte à professora:**

- Como você decide o que é um bloco separado numa tela?
- Por que a barra lateral é um `<aside>` ou um `<nav>`, e não uma `<div>`?

**Confira se entendeu:**

- Quais são os três ou quatro blocos principais da tela que você escolheu?

**Salve no Git:**

```bash
git add .
git commit -m "Cria o esqueleto HTML do clone"
git push
```

### Etapa — Parte: Medidas e variáveis

**O que esta parte entrega:** as cores, as fontes e os espaçamentos do original, guardados em variáveis CSS.

**Antes de pedir:** abra o site original, aperte F12 e use a ferramenta de seleção (a setinha no canto do DevTools) para clicar nos elementos. Anote a cor de fundo, a cor do texto, o tamanho das fontes dos títulos e do texto e o espaçamento entre os cartões.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Medidas e variáveis". Medi o site original no DevTools e anotei isto:

[COLE AS SUAS ANOTAÇÕES: CORES, TAMANHOS DE FONTE, ESPAÇAMENTOS, LARGURAS]

Primeiro, me explique como ler essas informações no DevTools (abas Styles e Computed) e se eu anotei o que precisava. Depois, crie o css/estilos.css com variáveis CSS no :root para essas medidas e os estilos gerais da página: fundo, fonte, cor do texto e títulos. Sugira uma fonte gratuita parecida com a original.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** a página já tem as cores e a tipografia parecidas com as do original, mesmo com o layout ainda desorganizado.

**Pergunte à professora:**

- Qual a diferença entre as abas Styles e Computed do DevTools?
- Por que guardar as medidas em variáveis, em vez de repetir os valores?

**Confira se entendeu:**

- Onde você encontra, no DevTools, a cor exata de um texto?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona as medidas do original em variáveis CSS"
git push
```

### Etapa — Parte: Cabeçalho e barra lateral

**O que esta parte entrega:** a moldura da tela, com cabeçalho, barra lateral (se houver) e área principal no lugar certo.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Cabeçalho e barra lateral". Monte o layout principal da tela: [DESCREVA COMO FICAM O CABEÇALHO, A BARRA LATERAL E A ÁREA PRINCIPAL NO ORIGINAL, E O QUE FICA FIXO QUANDO A PÁGINA ROLA].

Me explique por que você escolheu Grid ou Flexbox para cada área e como o position sticky ou fixed entra aqui. Me mostre o css/estilos.css completo.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** as áreas ficam nas mesmas posições do original. Role a página e confira se o que é fixo no original também fica fixo no clone.

**Pergunte à professora:**

- Como o CSS Grid ajuda a montar o layout de uma página inteira?
- O que acontece com o conteúdo quando um elemento fica com `position: fixed`?

**Confira se entendeu:**

- Qual propriedade faz a barra lateral ficar parada enquanto o resto rola?

**Salve no Git:**

```bash
git add .
git commit -m "Monta o cabeçalho e a barra lateral"
git push
```

### Etapa — Parte: Fileiras de cartões

**O que esta parte entrega:** as fileiras de cartões rolando na horizontal, parando certinho em cada cartão, com efeito ao passar o mouse.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Fileiras de cartões". Quero fileiras que rolam na horizontal como no original, usando overflow-x e scroll-snap para cada cartão parar alinhado. Os cartões têm [DESCREVA O FORMATO: TAMANHO, IMAGEM, TEXTOS]. Adicione um efeito ao passar o mouse parecido com o do original.

Me explique como o overflow e o scroll-snap funcionam, e como esconder a barra de rolagem sem impedir a rolagem.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** role cada fileira para os lados (com o mouse ou arrastando no touchpad): ela para sempre com um cartão alinhado. O efeito de hover aparece suave.

**Pergunte à professora:**

- Qual a diferença entre `scroll-snap-type: x mandatory` e `proximity`?
- Por que os cartões não encolhem quando a fileira fica mais estreita?

**Confira se entendeu:**

- Qual propriedade faz a fileira rolar para os lados, em vez de quebrar a linha?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona as fileiras de cartões com rolagem horizontal"
git push
```

### Etapa — Parte: Ajuste fino

**O que esta parte entrega:** um clone que, de longe, dá para confundir com o original.

**Antes de pedir:** abra o original e o clone lado a lado, na mesma largura, e anote as diferenças que você enxerga.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Ajuste fino". Comparei o meu clone com o original e estas são as diferenças que encontrei:

[LISTE AS DIFERENÇAS]

Me ajude a corrigir uma de cada vez, explicando a causa de cada diferença. Depois, adicione uma media query para monitores grandes (a partir de 1440px), para o layout não ficar esticado demais.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** compare de novo, lado a lado. Teste também numa tela larga (no DevTools, escolha uma largura de 1440px ou mais).

**Pergunte à professora:**

- Quais são os erros mais comuns ao reproduzir um layout?
- Como usar a sobreposição de um print com transparência para comparar medidas?

**Confira se entendeu:**

- Qual foi a diferença mais difícil de corrigir, e o que causava ela?

**Salve no Git:**

```bash
git add .
git commit -m "Ajusta detalhes e adapta para telas grandes"
git push
```

<!-- trecho: revisar-e-testar -->

<!-- trecho: escrever-readme -->

<!-- trecho: publicar-github-pages -->

## Checklist de entrega

<!-- trecho: checklist-entrega -->

- O clone não usa logotipo, fotos nem textos oficiais
- O README diz que é um projeto de estudo e mostra o print de referência

## Para ir além

- Faça os desafios extras: comparação lado a lado no README, versão para celular e tema alternativo.
- Escolha outra tela do mesmo site (a página de um álbum, de um filme ou de uma hospedagem) e reproduza sozinha, usando o que aprendeu.
