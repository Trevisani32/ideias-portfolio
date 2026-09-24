---
titulo: Quiz de perguntas
slug: quiz-perguntas
bloco: primeiros-projetos
ordem: 5
nivel: 2
icone: "🧠"
resumo: "Quiz sobre um tema de que você goste, com retorno a cada resposta, pontuação e resultado no final."
tecnologias: [HTML, CSS, JavaScript]
treina: [Arrays de objetos, Estado da aplicação, HTML pelo JavaScript, Eventos, Embaralhamento]
status: rascunho
---

## Sobre o projeto

Um quiz sobre um tema de que você goste, com retorno a cada resposta e resultado no final. É divertido de mostrar, e treina o essencial de qualquer app em JavaScript: guardar dados, controlar o estado e desenhar a tela a partir deles.

## O que você vai aprender

- **Arrays de objetos:** guardar perguntas, alternativas e respostas de forma organizada.
- **Estado da aplicação:** saber em que pergunta a pessoa está e quantos pontos ela fez.
- **HTML pelo JavaScript:** montar cada pergunta na tela a partir dos dados.
- **Eventos:** reagir à escolha de cada alternativa.
- **Embaralhamento:** mudar a ordem das perguntas com o algoritmo Fisher–Yates.

## Requisitos

### Obrigatórios

- Pelo menos 10 perguntas num array de objetos (pergunta, alternativas, resposta certa, explicação)
- Uma pergunta por vez, com barra de progresso
- Retorno imediato de certo ou errado, com a explicação
- Pontuação e tela final com o resultado e botão de recomeçar
- Ordem das perguntas embaralhada a cada partida (algoritmo Fisher–Yates)

### Desafios extras

- Tempo limite por pergunta
- Recorde salvo no navegador (localStorage)
- Categorias ou níveis de dificuldade
- Revisão das respostas no final

## Antes de começar

<!-- trecho: ia-professora -->

Escolha o tema do quiz antes de começar: um filme, uma série, um hobby, uma matéria... Quanto mais você gostar do tema, mais fácil fica conferir as perguntas e mais divertido fica o projeto.

## Passo a passo

<!-- trecho: escolher-stack -->

#### A stack deste projeto

- **HTML:** as três telas do quiz (início, pergunta e resultado).
- **CSS:** o visual, os estados de certo e errado e a barra de progresso.
- **JavaScript:** as perguntas, o controle do jogo e a montagem da tela, sem bibliotecas.
- **Nada mais para instalar.**

<!-- trecho: documentar-projeto -->

#### O que não pode faltar no documento deste projeto

- **Visão geral:** o tema do quiz e para quem ele é.
- **Casos de uso:** "Começar o quiz", "Responder uma pergunta" (escolhe uma alternativa e vê se acertou, com a explicação), "Ver o resultado" e "Jogar de novo".
- **Telas:** três estados da mesma página: início (tema e botão de começar), pergunta (progresso, pergunta, alternativas, retorno e botão de próxima) e resultado (pontuação, mensagem e botão de recomeçar).
- **Dados:** as perguntas ficam num array de objetos, no arquivo `js/perguntas.js`, neste formato:

```js
{
  pergunta: 'Qual é a capital da Austrália?',
  alternativas: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
  correta: 2,
  explicacao: 'Canberra foi planejada para ser a capital e fica entre Sydney e Melbourne.'
}
```

- **Estado do jogo:** o que o JavaScript precisa lembrar durante a partida (a pergunta atual, os pontos, a ordem das perguntas).
- **Estrutura de arquivos:** `index.html`, `css/estilos.css`, `js/perguntas.js` e `js/app.js`.

<!-- trecho: criar-repositorio -->

<!-- trecho: dividir-em-partes -->

#### As partes deste projeto

1. **Banco de perguntas:** as perguntas do seu tema, no formato certo.
2. **As três telas:** o HTML e o CSS das telas de início, pergunta e resultado.
3. **Mostrar uma pergunta:** o estado do jogo e a pergunta desenhada pelo JavaScript.
4. **Responder e dar retorno:** o clique nas alternativas, o certo e errado e a barra de progresso.
5. **Resultado e recomeço:** a tela final, o embaralhamento e o jogar de novo.

### Etapa — Parte: Banco de perguntas

**O que esta parte entrega:** o arquivo `js/perguntas.js` com pelo menos 10 perguntas do seu tema.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Banco de perguntas" do quiz. O tema é [SEU TEMA]. Crie o arquivo js/perguntas.js com uma constante contendo um array de 10 perguntas, no formato do meu documento: pergunta, alternativas (4 opções), correta (a posição da alternativa certa, começando em 0) e explicacao.

Varie a dificuldade e a posição da resposta certa. Me explique o que é um array de objetos e por que esse formato facilita o resto do projeto.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** **confira cada resposta**. A IA também erra, principalmente com fatos. Se encontrar uma resposta errada, corrija no arquivo e conte para a professora.

**Pergunte à professora:**

- Por que a posição da resposta certa começa em 0?
- Qual a diferença entre `const` e `let`?

**Confira se entendeu:**

- Como você acessaria o texto da terceira alternativa da primeira pergunta?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona o banco de perguntas do quiz"
git push
```

### Etapa — Parte: As três telas

**O que esta parte entrega:** as telas de início, pergunta e resultado desenhadas, trocando só com o JavaScript mais simples.

**Peça para a professora:**

```prompt
Vamos fazer a parte "As três telas". Crie o index.html com três sections: início (título do quiz, tema e botão "Começar"), pergunta (barra de progresso, texto da pergunta, lugar para as alternativas, área de retorno e botão "Próxima") e resultado (pontuação, mensagem e botão "Jogar de novo"). Só a tela de início começa visível; use o atributo hidden nas outras.

Crie o css/estilos.css com um visual divertido que combine com o tema [SEU TEMA], e ligue os arquivos js/perguntas.js e js/app.js no HTML, nessa ordem. No js/app.js, por enquanto, faça só o botão "Começar" esconder a tela de início e mostrar a de pergunta.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** a página abre na tela de início. Clique em "Começar": ela some e aparece a tela de pergunta, ainda vazia.

**Pergunte à professora:**

- Para que serve o atributo `hidden`?
- Por que o `perguntas.js` precisa ser carregado antes do `app.js`?

**Confira se entendeu:**

- Como você mostraria a tela de resultado pelo JavaScript?

**Salve no Git:**

```bash
git add .
git commit -m "Cria as três telas do quiz"
git push
```

### Etapa — Parte: Mostrar uma pergunta

**O que esta parte entrega:** a primeira pergunta aparecendo na tela, com as alternativas montadas pelo JavaScript.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Mostrar uma pergunta". No js/app.js, crie o estado do jogo (a posição da pergunta atual e os pontos) e uma função que desenha a pergunta atual na tela: o texto da pergunta e um botão para cada alternativa, criados pelo JavaScript a partir do array de perguntas.

Me explique o que é "estado" e por que a tela deve ser desenhada a partir dele.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** clique em "Começar": a primeira pergunta aparece com as quatro alternativas como botões.

**Pergunte à professora:**

- Qual a diferença entre criar elementos com `createElement` e com `innerHTML`?
- Por que as alternativas são botões, e não parágrafos?

**Confira se entendeu:**

- O que você precisa mudar no estado para mostrar a segunda pergunta?

**Salve no Git:**

```bash
git add .
git commit -m "Mostra a pergunta atual a partir do estado"
git push
```

### Etapa — Parte: Responder e dar retorno

**O que esta parte entrega:** o quiz jogável do começo ao fim, com certo e errado, explicação e barra de progresso.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Responder e dar retorno". Quando a pessoa clica numa alternativa:
- marque a escolhida como certa (verde) ou errada (vermelho) e destaque a correta;
- bloqueie as outras alternativas;
- mostre a explicação e o botão "Próxima";
- some o ponto se acertou.

O botão "Próxima" avança para a pergunta seguinte, e a barra de progresso mostra em qual pergunta a pessoa está. Na última pergunta, o botão leva para a tela de resultado.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** jogue uma partida inteira. Acerte algumas e erre outras de propósito. Tente clicar em duas alternativas na mesma pergunta: só a primeira deve contar.

**Pergunte à professora:**

- Por que precisamos bloquear as alternativas depois da resposta?
- Como a barra de progresso calcula a porcentagem?

**Confira se entendeu:**

- Onde, no código, o ponto é somado?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona respostas, retorno e barra de progresso"
git push
```

### Etapa — Parte: Resultado e recomeço

**O que esta parte entrega:** a tela final com a pontuação e partidas sempre com as perguntas em ordem diferente.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Resultado e recomeço". Quero:
- a tela de resultado com a pontuação (por exemplo, "7 de 10") e uma mensagem que muda conforme o desempenho;
- o botão "Jogar de novo" zerando o estado e voltando para a primeira pergunta;
- as perguntas embaralhadas a cada partida com o algoritmo Fisher–Yates, sem alterar o array original.

Antes do código, me explique o Fisher–Yates com um exemplo de cartas de baralho.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** jogue duas partidas seguidas: a ordem das perguntas muda. A pontuação final bate com o que você acertou.

**Pergunte à professora:**

- Por que `array.sort(() => Math.random() - 0.5)` não é um bom jeito de embaralhar?
- Por que é melhor embaralhar uma cópia do array?

**Confira se entendeu:**

- O que precisa voltar ao valor inicial quando a pessoa clica em "Jogar de novo"?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona resultado, embaralhamento e recomeço"
git push
```

<!-- trecho: revisar-e-testar -->

<!-- trecho: escrever-readme -->

<!-- trecho: publicar-github-pages -->

## Checklist de entrega

<!-- trecho: checklist-entrega -->

- Todas as respostas do banco de perguntas foram conferidas por você
- A ordem das perguntas muda a cada partida

## Para ir além

- Faça os desafios extras: tempo por pergunta, recorde no navegador, categorias e revisão das respostas.
- Crie um segundo quiz sozinha, reaproveitando o código e trocando só o banco de perguntas e as cores.
