---
titulo: Quadro Kanban
slug: quadro-kanban
bloco: primeiros-projetos
ordem: 9
nivel: 3
icone: "📋"
resumo: "Quadro de tarefas em colunas, com cartões que você arrasta de uma coluna para outra."
tecnologias: [HTML, CSS, JavaScript]
treina: [Drag and Drop API, Modelagem de estado, Módulos, Estado × renderização]
status: rascunho
---

## Sobre o projeto

Um quadro de tarefas em colunas, com cartões que se arrastam de uma coluna para outra. Kanban é usado em quase toda equipe de tecnologia, então é um projeto que conversa direto com o dia a dia de quem vai te avaliar. E arrastar e soltar é daquelas coisas que impressionam na hora.

## O que você vai aprender

- **Drag and Drop API:** arrastar e soltar elementos na página.
- **Modelagem de estado:** representar colunas e cartões com `id`, e a ordem dos cartões.
- **Módulos:** separar dados, regras e tela em arquivos diferentes.
- **Estado × renderização:** mudar os dados primeiro e só depois redesenhar a tela.

## Requisitos

### Obrigatórios

- Colunas "A fazer", "Fazendo" e "Feito"
- Criar, editar e excluir cartões (título e descrição opcional)
- Arrastar cartões entre colunas e reordenar dentro da coluna (HTML Drag and Drop API)
- Contador de cartões por coluna
- Mensagem amigável quando a coluna está vazia
- Dados salvos no navegador
- Estado (colunas e cartões com `id`) separado do código que desenha a tela

### Desafios extras

- Colunas personalizadas
- Etiquetas coloridas com filtro
- Prazo com destaque para atrasados
- Mover cartões pelo teclado
- Arrastar no celular (a Drag and Drop API não funciona com toque; exige Pointer Events)

## Antes de começar

<!-- trecho: ia-professora -->

Este é o último projeto do bloco, e junta muita coisa que você já viu: módulos, dados salvos no navegador e desenhar a tela a partir do estado. Se algo parecer familiar, ótimo: é sinal de que você está aprendendo!

## Passo a passo

<!-- trecho: escolher-stack -->

#### A stack deste projeto

- **HTML:** o quadro, as colunas e a janela de criar e editar cartões (com a tag `<dialog>`).
- **CSS:** o layout das colunas, os cartões e o retorno visual ao arrastar.
- **JavaScript com módulos:** estado, tela e arrastar em arquivos separados.
- **Drag and Drop API e localStorage:** ambos já vêm no navegador, sem instalar nada.
- **Live Server:** obrigatório, por causa dos módulos.

<!-- trecho: documentar-projeto -->

#### O que não pode faltar no documento deste projeto

- **Casos de uso:** "Criar um cartão", "Editar um cartão", "Excluir um cartão", "Mover para outra coluna" e "Mudar a ordem dentro da coluna".
- **Telas:** o quadro com três colunas lado a lado, cada uma com título, contador, cartões e botão de adicionar; e a janela (dialog) do formulário de cartão.
- **Dados:** o estado fica no localStorage, como JSON. Um formato possível, em que a ordem dos cartões fica guardada nas colunas:

```js
{
  colunas: [
    { id: 'a-fazer', titulo: 'A fazer', cartoes: ['c1', 'c2'] },
    { id: 'fazendo', titulo: 'Fazendo', cartoes: [] },
    { id: 'feito', titulo: 'Feito', cartoes: ['c3'] }
  ],
  cartoes: {
    c1: { titulo: 'Estudar Flexbox', descricao: '' }
  }
}
```

- **Por que esse formato:** explique no documento por que guardar a ordem como lista de `id`s na coluna facilita mover e reordenar.
- **Estrutura de arquivos:** `index.html`, `css/estilos.css`, `js/estado.js` (dados e regras), `js/tela.js` (desenhar), `js/arrastar.js` (arrastar e soltar) e `js/app.js` (liga tudo).

<!-- trecho: criar-repositorio -->

<!-- trecho: dividir-em-partes -->

#### As partes deste projeto

1. **Quadro em HTML e CSS:** as três colunas com cartões de exemplo fixos.
2. **Estado e renderização:** o quadro desenhado a partir dos dados salvos.
3. **Criar, editar e excluir:** a janela do cartão e as operações.
4. **Arrastar entre colunas:** mover cartões de uma coluna para outra.
5. **Reordenar na coluna:** soltar o cartão exatamente na posição desejada.

### Etapa — Parte: Quadro em HTML e CSS

**O que esta parte entrega:** o quadro com três colunas e alguns cartões de exemplo, ainda sem funcionar.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Quadro em HTML e CSS" do Kanban. Crie o index.html com três colunas (A fazer, Fazendo e Feito). Cada coluna tem título, contador de cartões, a lista de cartões e um botão "Adicionar cartão". Coloque dois cartões de exemplo fixos e deixe uma coluna vazia, mostrando a mensagem de coluna vazia.

Crie o css/estilos.css com as colunas lado a lado no computador e rolando na horizontal no celular. Deixe no HTML só o script js/app.js, com type="module".

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** o quadro aparece com as três colunas, os cartões de exemplo e a mensagem na coluna vazia.

**Pergunte à professora:**

- Por que cada coluna é uma `<section>` e os cartões ficam numa lista (`<ul>`)?
- Como fazer as colunas terem a mesma altura?

**Confira se entendeu:**

- Qual parte do HTML vai ser gerada pelo JavaScript nas próximas partes?

**Salve no Git:**

```bash
git add .
git commit -m "Cria o quadro Kanban em HTML e CSS"
git push
```

### Etapa — Parte: Estado e renderização

**O que esta parte entrega:** o quadro desenhado a partir dos dados salvos, com contadores e mensagens de coluna vazia automáticos.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Estado e renderização". Este é o formato de dados do meu documento:

[COLE O FORMATO DE DADOS DO SEU DOCUMENTO]

Crie o js/estado.js exportando funções para carregar e salvar o estado no localStorage (com um estado inicial de exemplo na primeira vez). Crie o js/tela.js exportando uma função que desenha o quadro inteiro a partir do estado: colunas, cartões, contadores e mensagem de coluna vazia. No js/app.js, carregue o estado e desenhe. Tire os cartões fixos do HTML.

Antes do código, me explique a ideia de "mudar o estado e redesenhar a tela".

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** o quadro aparece igual ao da parte anterior, mas agora vindo dos dados. Mude o estado no DevTools (**Application → Local Storage**), recarregue e veja a tela seguir os dados.

**Pergunte à professora:**

- Por que a tela nunca deve ser a "fonte da verdade"?
- Qual a vantagem de redesenhar tudo, em vez de mexer em um elemento de cada vez?

**Confira se entendeu:**

- Se um cartão aparecer na tela e não estiver no estado, onde está o problema?

**Salve no Git:**

```bash
git add .
git commit -m "Desenha o quadro a partir do estado salvo"
git push
```

### Etapa — Parte: Criar, editar e excluir

**O que esta parte entrega:** cartões criados, editados e excluídos por uma janela de formulário.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Criar, editar e excluir". Use a tag dialog para uma janela com o formulário do cartão (título obrigatório e descrição opcional). O botão "Adicionar cartão" de cada coluna abre a janela vazia; clicar num cartão abre a janela preenchida para editar; e a janela tem um botão "Excluir" que pede confirmação. Gere os ids com crypto.randomUUID().

As regras (criar, atualizar, excluir) ficam no js/estado.js; o app.js só liga os eventos e redesenha depois de cada mudança.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** crie cartões nas três colunas, edite um e exclua outro. Recarregue a página: tudo continua como você deixou. Aperte Esc com a janela aberta: ela deve fechar.

**Pergunte à professora:**

- Quais vantagens a tag `<dialog>` traz em relação a uma `<div>` que aparece e some?
- Por que as regras ficam no `estado.js`, e não no `app.js`?

**Confira se entendeu:**

- O que precisa acontecer no estado quando um cartão é excluído?

**Salve no Git:**

```bash
git add .
git commit -m "Permite criar, editar e excluir cartões"
git push
```

### Etapa — Parte: Arrastar entre colunas

**O que esta parte entrega:** cartões que você arrasta de uma coluna para outra, com a mudança salva.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Arrastar entre colunas". No js/arrastar.js, use a HTML Drag and Drop API: os cartões ficam draggable; no dragstart, guarde o id do cartão; nas colunas, trate dragover (permitindo soltar e destacando a coluna) e drop. Ao soltar, mova o cartão no estado (função em js/estado.js), salve e redesenhe. Por enquanto, o cartão pode ir para o fim da coluna.

Antes do código, me explique a sequência de eventos de arrastar e soltar.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** arraste cartões entre as colunas. A coluna de destino fica destacada durante o arraste, e os contadores se atualizam. Recarregue: os cartões continuam onde você soltou.

**Pergunte à professora:**

- Por que o `dragover` precisa chamar `event.preventDefault()`?
- O que o `dataTransfer` guarda, e por que guardar só o `id`?

**Confira se entendeu:**

- Qual função muda o estado quando um cartão é solto em outra coluna?

**Salve no Git:**

```bash
git add .
git commit -m "Permite arrastar cartões entre colunas"
git push
```

### Etapa — Parte: Reordenar na coluna

**O que esta parte entrega:** o cartão solto exatamente na posição desejada, entre outros cartões, com uma linha mostrando onde ele vai cair.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Reordenar na coluna". Durante o dragover, descubra antes de qual cartão o cartão arrastado deve entrar, comparando a posição do mouse com o meio de cada cartão (getBoundingClientRect). Mostre uma linha indicando onde ele vai cair. Ao soltar, insira o id na posição certa da lista da coluna, salve e redesenhe. Funciona tanto na mesma coluna quanto em outra.

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** reordene cartões dentro da mesma coluna e solte cartões no meio de outra coluna. A linha indicadora aparece no lugar certo e some ao soltar.

**Pergunte à professora:**

- O que o `getBoundingClientRect` devolve?
- Como o `splice` insere um item no meio de um array?

**Confira se entendeu:**

- Como o código decide se o cartão entra antes ou depois de outro?

**Salve no Git:**

```bash
git add .
git commit -m "Permite reordenar cartões dentro da coluna"
git push
```

<!-- trecho: revisar-e-testar -->

<!-- trecho: escrever-readme -->

<!-- trecho: publicar-github-pages -->

## Checklist de entrega

<!-- trecho: checklist-entrega -->

- Mover e reordenar continuam salvos depois de recarregar a página
- O README explica o formato do estado e a divisão em módulos

## Para ir além

- Faça os desafios extras: colunas personalizadas, etiquetas, prazos, teclado e toque no celular.
- Você terminou o bloco! Revise os nove projetos no seu GitHub e fixe os melhores no seu perfil (**Customize your pins**).
