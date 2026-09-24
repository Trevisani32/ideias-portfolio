---
titulo: Jogo da memória
slug: jogo-memoria
bloco: primeiros-projetos
ordem: 6
nivel: 2
icone: "🃏"
resumo: "O clássico jogo de encontrar pares, com cartas que viram, cronômetro e contador de jogadas."
tecnologias: [HTML, CSS, JavaScript]
treina: [Estado do jogo, setTimeout e setInterval, Classes CSS pelo JavaScript, Animações CSS, Prevenção de clique duplo]
status: rascunho
---

## Sobre o projeto

O clássico jogo de encontrar pares, com cartas que viram, cronômetro e contador de jogadas. Todo mundo sabe jogar, então quem abre o seu portfólio entende o projeto na hora, e a animação das cartas virando deixa tudo com cara de produto de verdade.

## O que você vai aprender

- **Estado do jogo:** saber quais cartas estão viradas, quais já formaram par e quantas jogadas foram feitas.
- **setTimeout e setInterval:** esperar um instante antes de desvirar e contar o tempo.
- **Classes CSS pelo JavaScript:** virar a carta trocando uma classe.
- **Animações CSS:** criar o efeito 3D de virar a carta.
- **Prevenção de clique duplo:** impedir cliques enquanto duas cartas estão sendo comparadas.

## Requisitos

### Obrigatórios

- Grade com 8 pares (16 cartas) de emojis ou ícones
- Cartas embaralhadas a cada partida (Fisher–Yates)
- Animação de virar a carta em CSS (efeito 3D)
- Duas cartas por vez: se não formam par, desviram depois de um instante, e os cliques ficam bloqueados enquanto isso
- Contador de jogadas e cronômetro
- Tela de vitória com tempo e jogadas, e botão de jogar de novo

### Desafios extras

- Níveis de dificuldade (4×4, 6×6)
- Melhor tempo salvo no navegador
- Sons
- Jogável pelo teclado

## Antes de começar

<!-- trecho: ia-professora -->

Escolha os 8 emojis das cartas antes de começar: bichinhos, comidas, plantas... Um tema bonito faz toda a diferença na hora de mostrar o projeto.

## Passo a passo

<!-- trecho: escolher-stack -->

#### A stack deste projeto

- **HTML:** o placar e o espaço da grade de cartas.
- **CSS:** a grade, o visual das cartas e a animação 3D.
- **JavaScript:** o baralho, as regras do jogo, o cronômetro e o placar.
- **Emojis:** as figuras das cartas, sem precisar de nenhuma imagem.
- **Nada mais para instalar.**

<!-- trecho: documentar-projeto -->

#### O que não pode faltar no documento deste projeto

- **Casos de uso:** "Virar duas cartas" (clica em uma, depois em outra), "Encontrar um par" (as duas ficam viradas), "Errar um par" (as duas desviram depois de um instante) e "Vencer e jogar de novo".
- **Telas:** o placar no topo (jogadas, tempo e botão de reiniciar), a grade 4×4 de cartas e a mensagem de vitória.
- **Dados:** nada é salvo, tudo fica na memória durante a partida. Descreva o estado do jogo: a lista de cartas (cada uma com um símbolo e se está virada ou encontrada), as cartas viradas na jogada atual, o número de jogadas e o tempo.
- **Regras:** escreva as regras do jogo com as suas palavras. Elas viram o roteiro do código.
- **Estrutura de arquivos:** `index.html`, `css/estilos.css` e `js/app.js`.

<!-- trecho: criar-repositorio -->

<!-- trecho: dividir-em-partes -->

#### As partes deste projeto

1. **Grade e cartas:** a grade 4×4 e o visual das cartas, com frente e verso.
2. **Virar a carta:** a animação 3D e o clique que vira a carta.
3. **Montar o baralho:** os pares embaralhados e as cartas criadas pelo JavaScript.
4. **Regras do jogo:** a comparação das cartas, o bloqueio de cliques e os pares.
5. **Placar e vitória:** as jogadas, o cronômetro, a vitória e o jogar de novo.

### Etapa — Parte: Grade e cartas

**O que esta parte entrega:** 16 cartas organizadas em grade, com frente e verso desenhados (ainda fixas no HTML).

**Peça para a professora:**

```prompt
Vamos fazer a parte "Grade e cartas" do jogo da memória. Crie o index.html com um placar no topo (jogadas, tempo e botão "Reiniciar") e uma grade com 16 cartas. Cada carta é um botão com duas faces: o verso (igual em todas) e a frente (com um emoji). Por enquanto, as cartas podem ficar escritas direto no HTML.

Crie o css/estilos.css com a grade 4×4 usando CSS Grid e o visual das cartas. Deixe o link para js/app.js no HTML, usando defer.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** a grade aparece com 16 cartas do mesmo tamanho, bem espaçadas, e o placar fica no topo.

**Pergunte à professora:**

- Por que cada carta é um `<button>`, e não uma `<div>`?
- Como o `aspect-ratio` ajuda a deixar as cartas proporcionais?

**Confira se entendeu:**

- Onde, no CSS, você mudaria a grade para 6 colunas?

**Salve no Git:**

```bash
git add .
git commit -m "Cria a grade e o visual das cartas"
git push
```

### Etapa — Parte: Virar a carta

**O que esta parte entrega:** cartas que viram com uma animação 3D ao serem clicadas.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Virar a carta". Quero o efeito 3D de virar: a carta gira no eixo Y e mostra a frente. Use perspective, transform, transition e backface-visibility no CSS, com uma classe "virada" que mostra a frente.

No js/app.js, faça cada carta alternar a classe "virada" quando for clicada. Antes do código, me explique com uma comparação do dia a dia como o efeito 3D funciona.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** clique nas cartas: elas viram com animação e mostram o emoji. Clique de novo: elas desviram.

**Pergunte à professora:**

- O que o `backface-visibility: hidden` esconde?
- Por que a animação fica no CSS, e o JavaScript só troca a classe?

**Confira se entendeu:**

- O que acontece se você tirar o `perspective`?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona a animação de virar a carta"
git push
```

### Etapa — Parte: Montar o baralho

**O que esta parte entrega:** cartas criadas pelo JavaScript, em ordem diferente a cada vez que a página abre.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Montar o baralho". Os meus 8 emojis são: [SEUS 8 EMOJIS].

No js/app.js, crie o baralho duplicando os emojis, embaralhe com o algoritmo Fisher–Yates e crie os botões das cartas pelo JavaScript dentro da grade. Tire as cartas fixas do HTML. Guarde as cartas num array de objetos, que vai ser o estado do jogo.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** recarregue a página várias vezes: as cartas mudam de lugar a cada vez, e cada emoji aparece exatamente duas vezes.

**Pergunte à professora:**

- Como o Fisher–Yates garante que todas as ordens têm a mesma chance?
- O que o operador de espalhamento (`...`) faz ao duplicar os emojis?

**Confira se entendeu:**

- Onde fica guardada a informação de qual emoji está em cada carta?

**Salve no Git:**

```bash
git add .
git commit -m "Monta e embaralha o baralho pelo JavaScript"
git push
```

### Etapa — Parte: Regras do jogo

**O que esta parte entrega:** o jogo funcionando: pares ficam virados, erros desviram e ninguém consegue virar três cartas de uma vez.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Regras do jogo". Estas são as regras que escrevi no meu documento:

[COLE AS REGRAS DO SEU DOCUMENTO]

Implemente no js/app.js: a pessoa vira duas cartas; se forem iguais, ficam viradas e marcadas como encontradas; se forem diferentes, desviram depois de 1 segundo. Enquanto as duas cartas estão sendo comparadas, bloqueie os cliques. Uma carta já virada ou encontrada não pode ser clicada de novo.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** jogue uma partida. Tente clicar muito rápido em três cartas diferentes: a terceira não pode virar. Clique duas vezes na mesma carta: ela não pode contar como par com ela mesma.

**Pergunte à professora:**

- O que é o bug de "clicar rápido em três cartas", e como o bloqueio resolve?
- Por que o `setTimeout` não "pausa" o resto do código?

**Confira se entendeu:**

- O que mudaria se o tempo para desvirar fosse 0?

**Salve no Git:**

```bash
git add .
git commit -m "Implementa as regras do jogo da memória"
git push
```

### Etapa — Parte: Placar e vitória

**O que esta parte entrega:** jogadas contadas, cronômetro rodando, tela de vitória e botão para jogar de novo.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Placar e vitória". Quero:
- contar uma jogada a cada duas cartas viradas;
- um cronômetro que começa no primeiro clique (com setInterval) e para quando todos os pares forem encontrados;
- uma mensagem de vitória com o tempo e as jogadas;
- o botão "Reiniciar" (e um "Jogar de novo" na vitória) que embaralha tudo e zera o placar.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** jogue até o fim e confira se o tempo parou e as jogadas batem. Clique em "Reiniciar" no meio de uma partida: tudo deve zerar, inclusive o cronômetro.

**Pergunte à professora:**

- Por que precisamos guardar o identificador do `setInterval`?
- O que acontece se reiniciarmos sem parar o cronômetro anterior?

**Confira se entendeu:**

- Como o código sabe que a pessoa venceu?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona placar, cronômetro e tela de vitória"
git push
```

<!-- trecho: revisar-e-testar -->

<!-- trecho: escrever-readme -->

<!-- trecho: publicar-github-pages -->

## Checklist de entrega

<!-- trecho: checklist-entrega -->

- Não dá para virar três cartas de uma vez, nem fazer par de uma carta com ela mesma
- O cronômetro para na vitória e zera no reinício

## Para ir além

- Faça os desafios extras: níveis de dificuldade, melhor tempo salvo, sons e jogo pelo teclado.
- Troque os emojis por imagens do seu tema favorito e ajuste o visual.
