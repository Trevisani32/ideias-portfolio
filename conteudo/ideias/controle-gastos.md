---
titulo: Controle de gastos pessoais
slug: controle-gastos
bloco: primeiros-projetos
ordem: 8
nivel: 3
icone: "🐷"
resumo: "App para registrar entradas e saídas, com filtros, totais do período e gráfico de gastos por categoria."
tecnologias: [HTML, CSS, JavaScript, Chart.js]
treina: [CRUD, Módulos (ES modules), Validação de formulário, Intl, Biblioteca externa, Estado derivado]
status: rascunho
---

## Sobre o projeto

Um app para registrar entradas e saídas, com filtros, totais e um gráfico de gastos por categoria. É o projeto da trilha que mais se parece com um sistema de verdade: cadastro, listagem, edição, exclusão, cálculos e gráfico. Por isso, pesa bastante no portfólio.

## O que você vai aprender

- **CRUD:** cadastrar, ler, editar e excluir lançamentos, as quatro operações de quase todo sistema.
- **Módulos (ES modules):** separar o código em arquivos, cada um com uma responsabilidade.
- **Validação de formulário:** impedir lançamentos incompletos ou com valor inválido.
- **Intl:** mostrar valores em reais e datas no formato brasileiro.
- **Biblioteca externa:** usar o Chart.js para desenhar o gráfico.
- **Estado derivado:** calcular os totais a partir dos lançamentos, sem guardar nada em duplicidade.

## Requisitos

### Obrigatórios

- Lançamento com descrição, valor, categoria, data e tipo (entrada ou saída), validado antes de salvar
- Listar, editar e excluir (excluir pede confirmação)
- Filtros por mês e por categoria
- Totais do período: entradas, saídas e saldo
- Gráfico de gastos por categoria com Chart.js
- Valores em reais com `Intl.NumberFormat`, guardados em centavos (números inteiros) para evitar erro de arredondamento
- Dados salvos no navegador
- Código dividido em módulos (ES modules): dados, cálculos e tela separados

### Desafios extras

- Exportar CSV
- Orçamento por categoria com alerta
- Categorias personalizadas
- Modo escuro

## Antes de começar

<!-- trecho: ia-professora -->

Este é um projeto maior que os anteriores. Vá com calma, uma parte por vez, e não pule a documentação: aqui ela faz ainda mais diferença.

## Passo a passo

<!-- trecho: escolher-stack -->

#### A stack deste projeto

- **HTML:** o formulário, os filtros, os totais, a lista e o espaço do gráfico.
- **CSS:** o layout do painel, que precisa ficar organizado no computador e no celular.
- **JavaScript com módulos:** o código dividido em arquivos que se importam (`import` e `export`).
- **Chart.js:** uma biblioteca de gráficos, carregada direto de uma CDN (um endereço público), sem instalar nada.
- **localStorage:** onde os lançamentos ficam salvos.
- **Live Server:** obrigatório aqui. Módulos JavaScript não funcionam abrindo o arquivo direto no navegador.

<!-- trecho: documentar-projeto -->

#### O que não pode faltar no documento deste projeto

- **Casos de uso:** "Registrar um lançamento", "Editar um lançamento", "Excluir um lançamento", "Filtrar por mês e por categoria" e "Ver os totais e o gráfico".
- **Telas:** um painel com o formulário, os filtros, três cartões de totais (entradas, saídas e saldo), a lista de lançamentos e o gráfico. Desenhe no computador (colunas) e no celular (tudo em sequência).
- **Dados:** os lançamentos ficam no localStorage, como JSON. Um formato possível:

```js
{
  id: '...',
  descricao: 'Mercado',
  valorEmCentavos: 15990,
  categoria: 'Alimentação',
  data: '2026-09-24',
  tipo: 'saida'
}
```

- **Por que centavos:** explique no documento por que guardar `15990` em vez de `159.90`.
- **Categorias:** a lista fixa de categorias que o app vai oferecer.
- **Banco de dados:** explique por que o localStorage basta aqui e em que situação um banco de dados de verdade seria necessário.
- **Estrutura de arquivos:** `index.html`, `css/estilos.css`, `js/dados.js` (carregar e salvar), `js/calculos.js` (filtros e totais), `js/tela.js` (desenhar na tela) e `js/app.js` (liga tudo).

<!-- trecho: criar-repositorio -->

<!-- trecho: dividir-em-partes -->

#### As partes deste projeto

1. **Layout do painel:** todas as áreas desenhadas em HTML e CSS, com dados de exemplo.
2. **Dados e módulos:** os arquivos em módulos, o salvamento e o cadastro com validação.
3. **Lista, edição e exclusão:** a lista formatada em reais, com editar e excluir.
4. **Filtros e totais:** o filtro por mês e categoria e os cartões de totais.
5. **Gráfico por categoria:** o gráfico do Chart.js, sempre atualizado.

### Etapa — Parte: Layout do painel

**O que esta parte entrega:** o painel completo desenhado, com dados de exemplo fixos, ainda sem funcionar.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Layout do painel" do controle de gastos. Crie o index.html com: o formulário de lançamento (descrição, valor, categoria, data e tipo, cada campo com label), os filtros (mês e categoria), três cartões de totais (entradas, saídas e saldo), a lista de lançamentos com dois exemplos fixos e um espaço para o gráfico (um canvas).

Crie o css/estilos.css com um layout de painel: no computador, formulário e gráfico de um lado, lista do outro; no celular, tudo em sequência. Deixe no HTML só o script js/app.js, com type="module".

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** o painel aparece organizado no computador e no celular (use o modo de dispositivo do DevTools).

**Pergunte à professora:**

- O que o `type="module"` muda na tag `<script>`?
- Qual tipo de campo usar para o valor, e por quê?

**Confira se entendeu:**

- Por que o gráfico precisa de um `<canvas>`?

**Salve no Git:**

```bash
git add .
git commit -m "Cria o layout do painel de gastos"
git push
```

### Etapa — Parte: Dados e módulos

**O que esta parte entrega:** lançamentos cadastrados pelo formulário, validados e salvos no navegador, com o código dividido em módulos.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Dados e módulos". Este é o formato de dados do meu documento:

[COLE O FORMATO DE DADOS DO SEU DOCUMENTO]

Crie o js/dados.js exportando funções para carregar, salvar, adicionar, atualizar e remover lançamentos no localStorage. No js/app.js, importe essas funções e ligue o formulário: valide os campos (descrição obrigatória, valor maior que zero, data preenchida), converta o valor digitado em reais para centavos e salve. Por enquanto, mostre a lista de lançamentos no console.

Antes do código, me explique como import e export funcionam e por que dividir em módulos.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** cadastre lançamentos e veja no console. Tente salvar com a descrição vazia ou valor zero: o formulário deve avisar. Recarregue a página e confira no DevTools (**Application → Local Storage**) se os dados continuam lá.

**Pergunte à professora:**

- Por que `0.1 + 0.2` não dá exatamente `0.3` em JavaScript?
- Como converter "159,90" (com vírgula) em 15990 centavos com segurança?
- O que é um `id` único, e como gerar um com `crypto.randomUUID()`?

**Confira se entendeu:**

- Qual módulo é o único que conversa com o localStorage, e por que isso é bom?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona cadastro validado e módulo de dados"
git push
```

### Etapa — Parte: Lista, edição e exclusão

**O que esta parte entrega:** a lista de lançamentos na tela, em reais e datas brasileiras, com editar e excluir.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Lista, edição e exclusão". Crie o js/tela.js exportando uma função que desenha a lista de lançamentos, com valores em reais (Intl.NumberFormat) e datas no formato brasileiro (Intl.DateTimeFormat), entradas em verde e saídas em vermelho. Tire os exemplos fixos do HTML.

Cada lançamento tem os botões "Editar", que preenche o formulário para alterar e salvar, e "Excluir", que pede confirmação antes de apagar.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** cadastre, edite e exclua lançamentos. Confira se os valores aparecem como "R$ 159,90" e se a lista continua certa depois de recarregar a página.

**Pergunte à professora:**

- Como o formulário sabe se está criando um lançamento novo ou editando um existente?
- Por que formatar os valores só na hora de mostrar, e não na hora de salvar?

**Confira se entendeu:**

- Em que módulo fica cada responsabilidade: salvar, formatar e reagir ao clique?

**Salve no Git:**

```bash
git add .
git commit -m "Mostra a lista com edição e exclusão"
git push
```

### Etapa — Parte: Filtros e totais

**O que esta parte entrega:** filtros por mês e por categoria funcionando, e os cartões de totais sempre certos.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Filtros e totais". Crie o js/calculos.js com funções puras (que só recebem dados e devolvem um resultado, sem mexer na tela nem no localStorage): uma que filtra os lançamentos por mês e categoria, e outra que calcula entradas, saídas e saldo.

No js/app.js, sempre que um filtro mudar ou um lançamento for salvo, recalcule e redesenhe a lista e os totais. Me explique o que é estado derivado e por que não guardamos os totais.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** cadastre lançamentos em meses e categorias diferentes. Troque os filtros e confira os totais fazendo a conta na mão.

**Pergunte à professora:**

- O que é uma função pura, e por que ela é mais fácil de testar?
- Como o `filter` e o `reduce` funcionam?

**Confira se entendeu:**

- Por que os totais não precisam ser salvos no localStorage?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona filtros e totais do período"
git push
```

### Etapa — Parte: Gráfico por categoria

**O que esta parte entrega:** um gráfico dos gastos por categoria, que se atualiza junto com os filtros.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Gráfico por categoria". Carregue o Chart.js por uma CDN e mostre um gráfico de rosca com o total de saídas por categoria, respeitando os filtros. Quando os dados ou os filtros mudarem, o gráfico deve ser atualizado, e não criado de novo por cima.

Me mostre onde encontrar essas informações na documentação oficial do Chart.js, para eu aprender a consultar sozinha.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** o gráfico aparece com as categorias certas. Cadastre uma nova saída e troque os filtros: ele se atualiza na hora, sem piscar nem duplicar.

**Pergunte à professora:**

- O que é uma CDN, e quais os prós e contras de usar uma?
- Por que criar um gráfico novo a cada mudança causaria problemas?

**Confira se entendeu:**

- De onde vêm os números que o gráfico mostra?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona o gráfico de gastos por categoria"
git push
```

<!-- trecho: revisar-e-testar -->

<!-- trecho: escrever-readme -->

<!-- trecho: publicar-github-pages -->

## Checklist de entrega

<!-- trecho: checklist-entrega -->

- Os valores são guardados em centavos e mostrados em reais
- Cada módulo tem uma responsabilidade só, descrita no README

## Para ir além

- Faça os desafios extras: exportar CSV, orçamento por categoria, categorias personalizadas e modo escuro.
- Peça para a professora explicar o que mudaria para os dados ficarem salvos num servidor, acessíveis de qualquer lugar. É um ótimo gancho para os próximos blocos.
