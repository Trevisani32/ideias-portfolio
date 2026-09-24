---
titulo: Cardápio digital de uma cafeteria
slug: cardapio-cafeteria
bloco: primeiros-projetos
ordem: 1
nivel: 1
icone: "☕"
resumo: "Página de cardápio de uma cafeteria inventada por você, com categorias, fotos, preços e layout em grade."
tecnologias: [HTML, CSS]
treina: [HTML semântico, Imagens acessíveis, CSS Grid, Variáveis CSS, Âncoras]
status: rascunho
---

## Sobre o projeto

Uma página de cardápio para uma cafeteria inventada por você, com nome, identidade visual e fotos. É um projeto pequeno, bonito de mostrar e perfeito para começar: você aprende a estruturar uma página com HTML do jeito certo e a organizar tudo em grade com CSS.

Como é o primeiro projeto da trilha, ele também é o seu primeiro contato com o jeito de trabalhar deste guia: planejar, documentar, construir em partes com a professora e publicar.

## O que você vai aprender

- **HTML semântico:** usar a tag certa para cada parte da página (`header`, `nav`, `main`, `section`, `footer`).
- **Imagens acessíveis:** descrever cada imagem no atributo `alt` e deixar os arquivos leves.
- **CSS Grid:** organizar os itens em linhas e colunas que se ajustam à largura da tela.
- **Variáveis CSS:** definir cores e fontes num lugar só e reaproveitar em todo o site.
- **Âncoras:** criar links que levam para outra parte da mesma página.

## Requisitos

### Obrigatórios

- Cabeçalho com o nome da cafeteria, um slogan e o horário de funcionamento
- Menu com links para as categorias (âncoras na própria página)
- Pelo menos 4 categorias (ex.: cafés, bebidas geladas, doces, salgados), cada uma com 3 ou mais itens
- Cada item com foto, nome, descrição curta e preço
- Itens em grade com CSS Grid, mudando o número de colunas conforme a largura da tela
- Cores e fontes definidas em variáveis CSS
- Imagens com `alt` descritivo e peso reduzido
- Rodapé com endereço fictício e links de redes sociais

### Desafios extras

- Selos "novo" e "vegano" nos itens
- Destaque para o "especial do dia"
- Versão para impressão

## Antes de começar

<!-- trecho: ia-professora -->

Antes de começar este projeto, escolha um nome e um "jeitinho" para a sua cafeteria: aconchegante, moderna, rústica, fofa... Essa escolha vai guiar as cores, as fontes e os textos.

## Passo a passo

<!-- trecho: escolher-stack -->

#### A stack deste projeto

- **HTML:** a estrutura e o conteúdo do cardápio (categorias, itens e preços).
- **CSS:** as cores, as fontes e o layout em grade.
- **Fotos:** de bancos gratuitos, como Unsplash ou Pexels. Anote de onde veio cada uma para dar o crédito no README.
- **Nada mais para instalar:** o navegador já entende HTML e CSS, e o Live Server mostra o resultado enquanto você trabalha.

<!-- trecho: documentar-projeto -->

#### O que não pode faltar no documento deste projeto

- **Visão geral:** o nome da cafeteria, o estilo dela e para quem é o cardápio.
- **Casos de uso:** "Ver os itens de uma categoria" (a pessoa clica no menu e a página rola até a categoria) e "Conhecer um item" (ver a foto, a descrição e o preço).
- **Telas:** uma página só, com cabeçalho, menu de categorias, as seções do cardápio e o rodapé. Desenhe como a grade de itens fica no celular (uma coluna) e no computador (três ou quatro colunas).
- **Dados:** os itens ficam escritos direto no HTML. Não há banco de dados; explique no documento por que ele não é necessário aqui.
- **Estrutura de arquivos:** `index.html`, `css/estilos.css` e a pasta `imagens/`.

<!-- trecho: criar-repositorio -->

<!-- trecho: dividir-em-partes -->

#### As partes deste projeto

1. **Estrutura da página:** o esqueleto em HTML semântico, com cabeçalho, menu, seções e rodapé.
2. **Itens do cardápio:** os produtos de cada categoria, com foto, nome, descrição e preço.
3. **Identidade visual:** as cores, as fontes e o estilo do cabeçalho, do menu e do rodapé.
4. **Grade responsiva:** os itens em cartões, numa grade que muda de colunas conforme a tela.
5. **Acabamento:** rolagem suave, efeitos ao passar o mouse, imagens leves e acessibilidade.

### Etapa — Parte: Estrutura da página

**O que esta parte entrega:** o esqueleto da página, ainda sem estilo, com todas as áreas no lugar.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Estrutura da página" do cardápio. Crie o index.html com:
- um header com o nome da cafeteria, um slogan curto e o horário de funcionamento;
- um nav com links âncora para as categorias: Cafés, Bebidas geladas, Doces e Salgados;
- um main com uma section para cada categoria, cada uma com um id igual ao do link do menu e um título;
- um footer com um endereço fictício e links para redes sociais.

Ainda não coloque os itens do cardápio nem CSS, mas já deixe no head o link para o arquivo css/estilos.css. Use tags semânticas.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** abra o `index.html` com o Live Server. A página aparece sem estilo, com os títulos em ordem. Clique nos links do menu: a página deve pular para a categoria certa.

**Pergunte à professora:**

- Qual a diferença entre `<section>` e `<div>`? Quando usar cada um?
- Como o link do menu sabe para qual seção ir?
- Para que serve a tag `<meta name="viewport">` no `<head>`?

**Confira se entendeu:**

- Qual tag envolve o conteúdo principal da página?
- O que acontece se o `id` de uma seção for diferente do `href` do link?

**Salve no Git:**

```bash
git add .
git commit -m "Cria a estrutura HTML do cardápio"
git push
```

### Etapa — Parte: Itens do cardápio

**O que esta parte entrega:** o cardápio completo, com todos os itens em cada categoria, ainda sem estilo.

**Antes de pedir:** escolha as fotos nos bancos gratuitos e salve na pasta `imagens/` com nomes simples, em minúsculas e sem acento (por exemplo, `cappuccino.jpg`). Anote de onde veio cada uma.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Itens do cardápio". A minha cafeteria se chama [NOME DA CAFETERIA] e o estilo dela é [ESTILO]. Estas são as fotos que salvei na pasta imagens:

[LISTE OS NOMES DOS ARQUIVOS DE IMAGEM]

Invente nomes, descrições curtas e preços para pelo menos 3 itens por categoria, combinando com o estilo da cafeteria. Escreva cada item como um article dentro da section da sua categoria, com a imagem (com um alt que descreva a foto), o nome, a descrição e o preço. Me mostre o index.html completo.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** todos os itens aparecem, cada um com a sua foto. Se alguma imagem não aparecer, confira se o nome do arquivo está escrito exatamente igual no HTML e na pasta.

**Pergunte à professora:**

- Por que cada item é um `<article>`?
- Como escrever um bom texto para o `alt`? O que acontece para quem usa leitor de tela se ele estiver vazio?
- Qual tag faz mais sentido para o preço, e por quê?

**Confira se entendeu:**

- Por que o caminho da imagem começa com `imagens/`?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona os itens do cardápio"
git push
```

### Etapa — Parte: Identidade visual

**O que esta parte entrega:** a página com as cores, as fontes e o estilo da sua cafeteria.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Identidade visual". O estilo da minha cafeteria é [ESTILO]. Sugira uma paleta de 4 ou 5 cores e uma combinação de fontes gratuitas (pode ser do Google Fonts) e me explique a escolha.

Depois, crie o css/estilos.css começando por variáveis CSS no :root para as cores e as fontes, e use essas variáveis para estilizar o corpo da página, os títulos, o header, o menu e o footer. Ainda não faça a grade dos itens.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** a página ganha as cores e as fontes escolhidas. Troque o valor de uma variável de cor no `:root`, salve e veja a cor mudar em todos os lugares de uma vez.

**Pergunte à professora:**

- O que são variáveis CSS e por que elas facilitam a manutenção?
- Como o navegador escolhe a fonte quando a primeira da lista não carrega?
- Como saber se o texto tem contraste suficiente com o fundo?

**Confira se entendeu:**

- Onde você mudaria a cor principal do site inteiro?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona a identidade visual do cardápio"
git push
```

### Etapa — Parte: Grade responsiva

**O que esta parte entrega:** os itens em cartões lado a lado, numa grade que se ajusta ao tamanho da tela.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Grade responsiva". Estilize os itens do cardápio como cartões (foto em cima; nome, descrição e preço embaixo) e organize os cartões de cada categoria com CSS Grid: uma coluna em telas pequenas e mais colunas conforme a tela aumenta.

Quero entender a diferença entre fazer isso com media queries e com repeat(auto-fill, minmax(...)). Escolha o jeito que achar melhor e explique por quê. Me mostre o css/estilos.css completo.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** aperte F12, ative o modo de dispositivo e vá diminuindo a largura: os cartões passam de várias colunas para uma só, sem nada vazar para os lados.

**Pergunte à professora:**

- O que significa a unidade `fr` no CSS Grid?
- Como o `minmax()` decide quantas colunas cabem na tela?
- Para que serve o `object-fit: cover` nas fotos?

**Confira se entendeu:**

- O que acontece com a grade se você aumentar o valor mínimo do `minmax()`?

**Salve no Git:**

```bash
git add .
git commit -m "Organiza os itens em grade responsiva"
git push
```

### Etapa — Parte: Acabamento

**O que esta parte entrega:** os detalhes que deixam o site agradável de usar e acessível.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Acabamento" do cardápio. Quero:
- rolagem suave quando clico nos links do menu;
- um efeito sutil nos cartões quando passo o mouse;
- o menu sempre visível no topo quando rolo a página;
- conferir se todas as imagens têm alt e se o contraste das cores está bom.

Me explique também como deixar as fotos mais leves antes de publicar: que tamanho usar e como comprimir.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** clique no menu e veja a rolagem suave; passe o mouse sobre os cartões; role a página e confira se o menu continua no topo; navegue só com a tecla Tab e veja se dá para usar todos os links.

**Pergunte à professora:**

- Qual a diferença entre `position: sticky` e `position: fixed`?
- Por que o foco do teclado precisa ficar visível?
- Qual o tamanho ideal, em pixels e em KB, para as fotos de um site como este?

**Confira se entendeu:**

- Como você deixaria mais leve uma foto de 4 MB?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona acabamento e melhorias de acessibilidade"
git push
```

<!-- trecho: revisar-e-testar -->

<!-- trecho: escrever-readme -->

<!-- trecho: publicar-github-pages -->

## Checklist de entrega

<!-- trecho: checklist-entrega -->

- As fotos têm crédito no README
- A grade funciona bem do celular ao computador

## Para ir além

- Faça os desafios extras: selos "novo" e "vegano", especial do dia e versão para impressão.
- Crie sozinha o cardápio de outro tipo de negócio, como uma sorveteria ou uma pizzaria, e compare com o que você fez com a professora.
