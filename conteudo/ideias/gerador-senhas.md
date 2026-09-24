---
titulo: Gerador de senhas
slug: gerador-senhas
bloco: primeiros-projetos
ordem: 4
nivel: 2
icone: "🔐"
resumo: "Ferramenta que gera senhas fortes com as opções que você escolher. Pequena, útil e boa para o primeiro contato com JavaScript."
tecnologias: [HTML, CSS, JavaScript]
treina: [DOM e eventos, Strings e arrays, Aleatoriedade segura, Clipboard API]
status: rascunho
---

## Sobre o projeto

Uma ferramenta que gera senhas fortes a partir das opções escolhidas: tamanho, letras maiúsculas e minúsculas, números e símbolos. É pequena, útil de verdade e o primeiro projeto da trilha com JavaScript: a página deixa de só mostrar coisas e passa a reagir ao que a pessoa faz.

## O que você vai aprender

- **DOM e eventos:** ler o que foi escolhido na tela e reagir a cliques e mudanças.
- **Strings e arrays:** montar a senha caractere por caractere.
- **Aleatoriedade segura:** usar `crypto.getRandomValues` em vez de `Math.random`, e entender por quê.
- **Clipboard API:** copiar a senha com um clique.

## Requisitos

### Obrigatórios

- Controle de tamanho (8 a 64), mostrando o valor atual
- Opções de maiúsculas, minúsculas, números e símbolos
- Aviso quando nenhuma opção está marcada; nesse caso, não gerar
- Senha com pelo menos um caractere de cada tipo marcado
- Aleatoriedade com `crypto.getRandomValues`, e não `Math.random`, explicando o porquê
- Botão copiar (Clipboard API) com retorno "Copiado!"
- Indicador de força (fraca, média, forte), com a regra explicada na tela

### Desafios extras

- Opção para evitar caracteres parecidos (0/O, l/1/I)
- Histórico das últimas 5 senhas só enquanto a página está aberta, sem gravar senhas no navegador (e explicando por quê)
- Modo frase-senha

## Antes de começar

<!-- trecho: ia-professora -->

Se JavaScript ainda é novidade para você, peça uma introdução rápida para a professora antes de começar o projeto:

```prompt
Antes de começar o projeto, me dê uma introdução bem curta ao JavaScript no navegador: o que ele é, como ligar um arquivo .js no HTML, o que é o DOM e o que é um evento. Use exemplos pequenos e comparações do dia a dia.
```

## Passo a passo

<!-- trecho: escolher-stack -->

#### A stack deste projeto

- **HTML:** a tela com os controles (tamanho, opções, botões) e o lugar onde a senha aparece.
- **CSS:** o visual da ferramenta e o indicador de força.
- **JavaScript:** a lógica de gerar a senha, sem nenhuma biblioteca.
- **APIs do navegador:** a *Web Crypto* (`crypto.getRandomValues`) para sortear com segurança e a *Clipboard API* para copiar. Ambas já vêm no navegador.
- **Live Server:** aqui ele é obrigatório. A Clipboard API só funciona em endereços seguros, e o endereço local do Live Server conta como seguro.

<!-- trecho: documentar-projeto -->

#### O que não pode faltar no documento deste projeto

- **Casos de uso:** "Gerar uma senha" (escolhe o tamanho e os tipos de caractere e clica em gerar), "Copiar a senha" e "Entender a força da senha".
- **Telas:** uma tela só, com o controle de tamanho, as quatro opções, o botão de gerar, a senha gerada, o botão de copiar e o indicador de força. Descreva também o estado de aviso, quando nenhuma opção está marcada.
- **Dados:** nada é salvo. Explique no documento por que guardar senhas no navegador seria uma má ideia.
- **Regra de força:** escreva a regra que você vai usar (por exemplo, com base no tamanho e na quantidade de tipos de caractere).
- **Estrutura de arquivos:** `index.html`, `css/estilos.css` e `js/app.js`.

<!-- trecho: criar-repositorio -->

<!-- trecho: dividir-em-partes -->

#### As partes deste projeto

1. **Tela e controles:** o HTML e o CSS da ferramenta, ainda sem funcionar.
2. **Ler as opções com JavaScript:** o código que enxerga o que foi escolhido na tela.
3. **Gerar a senha com segurança:** o sorteio seguro, com um caractere de cada tipo marcado.
4. **Copiar e mostrar a força:** o botão de copiar e o indicador de força.

### Etapa — Parte: Tela e controles

**O que esta parte entrega:** a ferramenta desenhada na tela, com todos os controles, mas ainda sem funcionar.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Tela e controles" do gerador de senhas. Crie o index.html com:
- um controle deslizante (input range) de 8 a 64 para o tamanho, mostrando o valor atual ao lado;
- quatro caixas de seleção com label: maiúsculas, minúsculas, números e símbolos;
- um botão "Gerar senha";
- uma área onde a senha aparece, com um botão "Copiar" ao lado;
- um lugar para o indicador de força e outro para mensagens de aviso.

Crie também o css/estilos.css com um visual limpo, centralizado na tela, e deixe no HTML o link para o js/app.js (que ainda vai ficar vazio), usando defer.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** abra com o Live Server. Todos os controles aparecem e dá para mexer neles, mas nada acontece ainda. Clique no texto de uma opção: a caixa de seleção correspondente deve marcar e desmarcar.

**Pergunte à professora:**

- Por que clicar no texto do `<label>` marca a caixa de seleção?
- O que o atributo `defer` faz na tag `<script>`?

**Confira se entendeu:**

- Quais atributos definem o mínimo e o máximo do controle deslizante?

**Salve no Git:**

```bash
git add .
git commit -m "Cria a tela e os controles do gerador"
git push
```

### Etapa — Parte: Ler as opções com JavaScript

**O que esta parte entrega:** o JavaScript enxergando a tela: o número do tamanho muda enquanto você arrasta, e o botão mostra as opções escolhidas no console.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Ler as opções com JavaScript". No js/app.js:
- selecione os elementos da tela com querySelector;
- atualize o número do tamanho enquanto o controle deslizante é arrastado (evento input);
- quando o botão "Gerar senha" for clicado, monte um objeto com as opções escolhidas (tamanho e os quatro tipos) e mostre esse objeto no console.

Ainda não gere a senha. Quero entender bem o que é o DOM e como os eventos funcionam.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** arraste o controle e veja o número mudar. Abra o DevTools na aba Console, marque algumas opções e clique em "Gerar senha": o objeto com as suas escolhas aparece no console.

**Pergunte à professora:**

- Qual a diferença entre os eventos `input` e `change`?
- Por que o valor do controle deslizante chega como texto, e como transformar em número?
- O que é um objeto em JavaScript?

**Confira se entendeu:**

- O que o `addEventListener` recebe, e quando a função passada para ele é executada?

**Salve no Git:**

```bash
git add .
git commit -m "Lê as opções escolhidas com JavaScript"
git push
```

### Etapa — Parte: Gerar a senha com segurança

**O que esta parte entrega:** o botão gerando senhas de verdade, sorteadas com segurança e com um caractere de cada tipo marcado.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Gerar a senha com segurança". Escreva uma função que recebe as opções e devolve a senha:
- sorteie os caracteres com crypto.getRandomValues, e não com Math.random;
- garanta pelo menos um caractere de cada tipo marcado e depois embaralhe a senha;
- se nenhuma opção estiver marcada, não gere a senha e mostre uma mensagem de aviso na tela.

Antes do código, me explique por que Math.random não é seguro para senhas.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** gere várias senhas com opções diferentes. Marque só "números" e confira se sai só número. Desmarque tudo e clique em gerar: a mensagem de aviso aparece e nenhuma senha é gerada.

**Pergunte à professora:**

- O que significa uma aleatoriedade ser "previsível", e por que isso é perigoso numa senha?
- Por que precisamos embaralhar depois de garantir um caractere de cada tipo?
- O que é o operador `%` e para que ele serve no sorteio?

**Confira se entendeu:**

- O que aconteceria se a senha não fosse embaralhada no final?

**Salve no Git:**

```bash
git add .
git commit -m "Gera senhas seguras com crypto.getRandomValues"
git push
```

### Etapa — Parte: Copiar e mostrar a força

**O que esta parte entrega:** o botão de copiar com retorno "Copiado!" e o indicador de força mudando de cor.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Copiar e mostrar a força". Quero:
- o botão "Copiar" usando a Clipboard API, mostrando "Copiado!" por 2 segundos e voltando ao texto normal;
- uma mensagem se a cópia falhar;
- um indicador de força (fraca, média, forte) com uma barra colorida, seguindo esta regra: [COLE A REGRA DE FORÇA DO SEU DOCUMENTO];
- um texto curto na tela explicando a regra.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** gere uma senha, clique em "Copiar" e cole em qualquer lugar (um bloco de notas, por exemplo). Mude o tamanho e as opções e veja o indicador de força mudar.

**Pergunte à professora:**

- O que é uma função assíncrona (`async`), e por que copiar para a área de transferência é assíncrono?
- Para que serve o `setTimeout` no botão de copiar?

**Confira se entendeu:**

- Por que a cópia só funciona num endereço seguro?

**Salve no Git:**

```bash
git add .
git commit -m "Adiciona o botão de copiar e o indicador de força"
git push
```

<!-- trecho: revisar-e-testar -->

<!-- trecho: escrever-readme -->

<!-- trecho: publicar-github-pages -->

## Checklist de entrega

<!-- trecho: checklist-entrega -->

- O README explica por que o projeto usa `crypto.getRandomValues`
- Nenhuma senha é guardada no navegador

## Para ir além

- Faça os desafios extras: evitar caracteres parecidos, histórico da sessão e modo frase-senha.
- Pesquise com a professora como sites de verdade guardam senhas (spoiler: eles não guardam a senha em si).
