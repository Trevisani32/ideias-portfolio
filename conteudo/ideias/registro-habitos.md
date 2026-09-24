---
titulo: Registro de hábitos diários
slug: registro-habitos
bloco: primeiros-projetos
ordem: 7
nivel: 2
icone: "🌱"
resumo: "App para acompanhar hábitos do dia a dia e ver a sequência de dias cumpridos, com os dados salvos no navegador."
tecnologias: [HTML, CSS, JavaScript]
treina: [Datas em JavaScript, localStorage e JSON, Modelagem de dados, Renderização de listas]
status: publicada
---

## Sobre o projeto

Um app para acompanhar hábitos do dia a dia, como beber água, ler ou estudar, e ver a sequência de dias cumpridos. É um app que você mesma pode usar, e isso conta muito num portfólio: mostra que você sabe fazer algo útil de verdade.

É também o primeiro projeto da trilha que **guarda dados**: fechou a página e abriu de novo, os hábitos continuam lá.

## O que você vai aprender

- **Datas em JavaScript:** trabalhar com o dia de hoje e com os dias anteriores, sem cair na armadilha do fuso horário.
- **localStorage e JSON:** salvar os dados no navegador e ler de volta.
- **Modelagem de dados:** decidir como guardar hábitos e dias cumpridos antes de escrever código.
- **Renderização de listas:** desenhar a lista de hábitos a partir dos dados.

## Requisitos

### Obrigatórios

- Adicionar e remover hábitos
- Marcar e desmarcar um hábito como feito hoje
- Mostrar os últimos 7 dias de cada hábito
- Sequência atual (dias seguidos cumpridos)
- Dados salvos no navegador (localStorage, em JSON)
- Datas pelo dia local. Cuidado: `toISOString()` usa UTC e, à noite no Brasil, já marca o dia seguinte.

### Desafios extras

- Mapa do mês estilo "heatmap"
- Nome, cor e ícone editáveis
- Exportar e importar os dados em JSON
- Meta semanal

## Antes de começar

<!-- trecho: ia-professora -->

Pense em três ou quatro hábitos que você gostaria de acompanhar de verdade. Usar o app no dia a dia enquanto constrói é o melhor teste que existe.

## Passo a passo

<!-- trecho: escolher-stack -->

#### A stack deste projeto

- **HTML:** o formulário de novo hábito e a lista de hábitos.
- **CSS:** o visual da lista e os marcadores dos dias.
- **JavaScript:** as regras, as datas e o salvamento, sem bibliotecas.
- **localStorage:** um espaço do próprio navegador para guardar dados. Não precisa de servidor nem de banco de dados, mas os dados ficam só naquele navegador, naquele computador.
- **Nada mais para instalar.**

<!-- trecho: documentar-projeto -->

#### O que não pode faltar no documento deste projeto

- **Casos de uso:** "Cadastrar um hábito", "Marcar o hábito de hoje" (e desmarcar, se clicou errado), "Ver a semana de um hábito", "Ver a sequência de dias" e "Remover um hábito".
- **Telas:** o formulário no topo e, abaixo, a lista. Cada hábito mostra o nome, os últimos 7 dias (com o dia de hoje em destaque), a sequência atual e o botão de remover.
- **Dados:** os hábitos ficam no localStorage, na chave `habitos`, como JSON. Um formato possível:

```js
[
  { id: '1695...', nome: 'Beber 2 litros de água', dias: ['2026-09-22', '2026-09-23'] }
]
```

- **Por que datas como texto:** explique no documento por que guardar a data como `'AAAA-MM-DD'`, e não como objeto `Date`, facilita comparar dias.
- **Banco de dados:** explique por que não é necessário aqui e o que mudaria se os dados precisassem aparecer em outro celular ou computador.
- **Estrutura de arquivos:** `index.html`, `css/estilos.css` e `js/app.js`.

<!-- trecho: criar-repositorio -->

<!-- trecho: dividir-em-partes -->

#### As partes deste projeto

1. **Tela e formulário:** o HTML e o CSS do app, com um hábito de exemplo.
2. **Guardar os hábitos:** adicionar, remover e salvar no navegador.
3. **Datas do jeito certo:** o dia de hoje e os últimos 7 dias, sem erro de fuso.
4. **Marcar o dia e ver a semana:** o clique que marca o hábito e os 7 dias na tela.
5. **Sequência de dias:** o cálculo de quantos dias seguidos o hábito foi cumprido.

### Etapa — Parte: Tela e formulário

**O que esta parte entrega:** o app desenhado, com o formulário e um hábito de exemplo fixo no HTML.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Tela e formulário" do registro de hábitos. Crie o index.html com um formulário (campo de texto com label e botão "Adicionar") e uma lista de hábitos. Deixe um hábito de exemplo fixo no HTML para eu ver o visual: nome, 7 bolinhas para os últimos dias (a de hoje em destaque), a sequência de dias e um botão de remover.

Crie o css/estilos.css com um visual leve e acolhedor e deixe o link para js/app.js com defer.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** o formulário e o hábito de exemplo aparecem bonitos. O formulário ainda não faz nada.

**Pergunte à professora:**

- Por que usar `<form>` com evento `submit`, e não só um clique no botão?
- Como deixar as bolinhas dos dias acessíveis para quem usa leitor de tela?

**Confira se entendeu:**

- Qual parte do HTML vai ser criada pelo JavaScript nas próximas partes?

**Salve no Git:**

```bash
git add .
git commit -m "Cria a tela e o formulário de hábitos"
git push
```

### Etapa — Parte: Guardar os hábitos

**O que esta parte entrega:** hábitos que você adiciona e remove, e que continuam lá quando a página é recarregada.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Guardar os hábitos". Este é o formato de dados do meu documento:

[COLE O FORMATO DE DADOS DO SEU DOCUMENTO]

No js/app.js, crie funções para carregar e salvar os hábitos no localStorage (com JSON.stringify e JSON.parse), adicionar um hábito pelo formulário, remover um hábito e desenhar a lista na tela a partir dos dados. Tire o exemplo fixo do HTML. Não deixe cadastrar um hábito com o nome vazio.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** adicione três hábitos, remova um e recarregue a página: os dois que ficaram continuam lá. No DevTools, aba **Application → Local Storage**, veja os dados salvos.

**Pergunte à professora:**

- Por que o localStorage só guarda texto, e como o JSON resolve isso?
- O que acontece se o JSON salvo estiver corrompido, e como se proteger?
- Por que desenhar a lista inteira de novo depois de cada mudança?

**Confira se entendeu:**

- Em que momentos o código precisa salvar no localStorage?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona, remove e salva hábitos no navegador"
git push
```

### Etapa — Parte: Datas do jeito certo

**O que esta parte entrega:** funções que calculam o dia de hoje e os últimos 7 dias pelo horário do Brasil, testadas no console.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Datas do jeito certo". Antes do código, me explique por que new Date().toISOString() pode devolver o dia de amanhã à noite no Brasil.

Depois, crie no js/app.js uma função que devolve a data de hoje no formato 'AAAA-MM-DD' pelo dia local, e outra que devolve a lista dos últimos 7 dias nesse formato, do mais antigo para hoje. Me mostre como testar as duas no console.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** no console, chame as duas funções. A data de hoje tem que bater com o calendário, mesmo testando depois das 21h.

**Pergunte à professora:**

- O que é UTC, e qual a diferença para o horário de Brasília?
- Por que os meses em JavaScript começam em 0?
- Como o `padStart` ajuda a formatar a data?

**Confira se entendeu:**

- Por que comparar datas como texto `'AAAA-MM-DD'` funciona para saber qual veio antes?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona funções de data pelo dia local"
git push
```

### Etapa — Parte: Marcar o dia e ver a semana

**O que esta parte entrega:** o clique que marca o hábito de hoje e as 7 bolinhas mostrando a semana de cada hábito.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Marcar o dia e ver a semana". Em cada hábito da lista, quero:
- um botão para marcar ou desmarcar o dia de hoje, que adiciona ou tira a data de hoje da lista de dias e salva;
- as 7 bolinhas dos últimos dias, preenchidas nos dias cumpridos, com a inicial do dia da semana embaixo e a de hoje em destaque.

Use as funções de data da parte anterior.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** marque alguns hábitos, recarregue a página e veja que continuam marcados. Desmarque um e confira se a bolinha de hoje esvazia.

**Pergunte à professora:**

- Como descobrir o dia da semana de uma data em JavaScript?
- Por que o botão precisa saber de qual hábito ele é?

**Confira se entendeu:**

- O que acontece nos dados quando você marca e desmarca o mesmo dia?

**Salve no Git:**

```bash
git add .
git commit -m "Permite marcar o dia e mostra a semana de cada hábito"
git push
```

### Etapa — Parte: Sequência de dias

**O que esta parte entrega:** a sequência atual de cada hábito, contando os dias seguidos cumpridos até hoje.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Sequência de dias". Quero calcular quantos dias seguidos cada hábito foi cumprido, contando para trás a partir de hoje (e, se hoje ainda não foi marcado, a partir de ontem).

Desta vez, quero tentar pensar primeiro: me dê uma dica de como resolver, sem código. Depois que eu responder com a minha ideia, escreva o código completo e explique cada trecho.
```

**Teste:** marque um hábito hoje e veja a sequência em 1. Para testar sequências maiores, edite os dados no DevTools (**Application → Local Storage**), colocando os dias anteriores, e recarregue a página.

**Pergunte à professora:**

- Por que um laço `while` combina com esse problema?
- O que acontece com a sequência se ficar um dia sem marcar no meio?

**Confira se entendeu:**

- Explique, com as suas palavras, o passo a passo do cálculo da sequência.

**Salve no Git:**

```bash
git add .
git commit -m "Calcula a sequência de dias de cada hábito"
git push
```

<!-- trecho: revisar-e-testar -->

<!-- trecho: escrever-readme -->

<!-- trecho: publicar-github-pages -->

## Checklist de entrega

<!-- trecho: checklist-entrega -->

- Os dados continuam lá depois de fechar e abrir o navegador
- O dia de hoje está certo mesmo depois das 21h

## Para ir além

- Faça os desafios extras: mapa do mês, edição de nome e cor, exportar e importar e meta semanal.
- Use o app por uma semana e anote o que você gostaria de melhorar: é assim que nascem as próximas versões de um produto.
