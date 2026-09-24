# conteudo.md — Como escrever e manter as ideias

Todo texto do site mora em `conteudo/`. É só lá que se edita: `public/conteudo/` é gerado
pelo script a cada `npm start` e `npm run build`, e qualquer mudança feita nele se perde.

```
conteudo/
├── inicio.md           # página inicial (título e subtítulo no frontmatter)
├── recado.md           # página "Para você" (título no frontmatter)
├── _modelo.md          # copiar para criar uma ideia
├── blocos/             # grupos de ideias em ordem progressiva
│   └── <id>.md
├── trechos/            # textos que se repetem em todas as ideias
│   └── <nome>.md
└── ideias/
    └── <slug>.md       # uma ideia por arquivo
```

## Cada ideia é completa

Quem lê uma ideia encontra tudo nela: como conversar com a IA professora, preparar o
computador, documentar, criar o repositório, construir parte por parte, revisar, escrever o
README e publicar. Não há páginas de guia compartilhadas
([ADR 0003](decisoes/0003-ideias-autocontidas.md)).

O que se repete entre ideias fica em `conteudo/trechos/` e entra em cada ideia por uma linha
de inclusão. Assim, quem lê vê a página completa e quem mantém corrige o texto num lugar só.

## Páginas: Início e Para você

`conteudo/inicio.md` e `conteudo/recado.md` têm frontmatter e texto em Markdown:

~~~yaml
---
titulo: Ideias de Portfólio
subtitulo: Projetos para o seu GitHub...   # só no inicio.md
---
~~~

O `recado.md` é a página "💌 Para você". **Ele é público**, como todo o repositório.

## Blocos

Cada arquivo em `conteudo/blocos/` é um grupo de ideias. O nome do arquivo é o `id` do bloco.

~~~yaml
---
titulo: Primeiros projetos
ordem: 1
---

Uma frase curta descrevendo o bloco (aparece no Início).
~~~

Blocos sem nenhuma ideia publicada não aparecem no site.

## Frontmatter da ideia

~~~yaml
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
~~~

| Campo | Regra |
|---|---|
| `titulo` | Obrigatório. |
| `slug` | Igual ao nome do arquivo, só com minúsculas, números e hífens. Também é o nome sugerido para o repositório dela. |
| `bloco` | O `id` de um arquivo em `conteudo/blocos/`. |
| `ordem` | Posição da ideia na trilha do bloco (1, 2, 3...). Não pode se repetir dentro do mesmo bloco. |
| `nivel` | Dificuldade: `1` iniciante, `2` intermediária, `3` desafiadora (vira coraçõezinhos). |
| `icone` | Um emoji, entre aspas. |
| `resumo` | Uma frase de até 160 caracteres. Aparece nos cartões. |
| `tecnologias` | Lista, ex.: `[HTML, CSS, JavaScript]`. |
| `treina` | Lista de 3 a 6 itens curtos ("O que você vai aprender" na capa). |
| `status` | `rascunho` ou `publicada`. Só `publicada` vai para o site no ar. |

Texto com dois-pontos seguido de espaço precisa ir entre aspas (`resumo: "Pequena: útil"`).
Na dúvida, use aspas.

## Estrutura do corpo

Seções `##` obrigatórias, **nesta ordem e só estas**. O script valida.

| # | Seção | Conteúdo |
|---|---|---|
| 1 | `## Sobre o projeto` | O que é e por que fica bem no portfólio. De 1 a 3 parágrafos. |
| 2 | `## O que você vai aprender` | Um item por conceito, com uma linha de explicação. |
| 3 | `## Requisitos` | Subseções `### Obrigatórios` e `### Desafios extras` (outras `###`, como `### Regras`, são permitidas). |
| 4 | `## Antes de começar` | Trecho `ia-professora` + (opcional) algo que ela precisa saber antes deste projeto. |
| 5 | `## Passo a passo` | As etapas, no método abaixo. |
| 6 | `## Checklist de entrega` | Trecho `checklist-entrega` + itens específicos do projeto. |
| 7 | `## Para ir além` | Como evoluir o projeto depois de entregue. |

### O passo a passo: sempre o mesmo método

| Ordem | O que entra | Parte específica da ideia, logo depois do trecho |
|---|---|---|
| 1 | Trecho `escolher-stack` | `#### A stack deste projeto`: cada tecnologia e para que serve aqui, e o que instalar além do básico |
| 2 | Trecho `documentar-projeto` | `#### O que não pode faltar no documento deste projeto`: casos de uso, telas, dados (com o formato, se houver), se precisa de banco de dados e estrutura de arquivos |
| 3 | Trecho `criar-repositorio` | — |
| 4 | Trecho `dividir-em-partes` | `#### As partes deste projeto`: a lista numerada das partes |
| 5… | Uma etapa `### Etapa — Parte: Nome` para cada parte | (é toda específica) |
| depois | Trechos `revisar-e-testar`, `escrever-readme` e `publicar-github-pages` | — |

**Não numere nada.** Escreva `### Etapa — Parte: Estrutura da página`; o script transforma
em `### Etapa 5 — Parte 1: Estrutura da página`.

Toda parte segue este formato:

~~~markdown
### Etapa — Parte: Estrutura da página

**O que esta parte entrega:** o resultado visível no navegador, numa frase.

**Antes de pedir:** (opcional) o que ela precisa preparar antes, como fotos ou anotações.

**Peça para a professora:**

```prompt
Vamos fazer a parte "Estrutura da página" do cardápio. Crie o index.html com: ...

Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o código completo e depois explique cada trecho.
```

**Teste:** o que ela deve ver ou fazer no navegador para saber que deu certo.

**Pergunte à professora:**

- Perguntas que aprofundam os conceitos da parte.

**Confira se entendeu:**

- Uma pergunta que ela deve conseguir responder sem a IA.

**Salve no Git:**

```bash
git add .
git commit -m "Cria a estrutura HTML do cardápio"
git push
```
~~~

Uma boa parte entrega algo visível no navegador, mexe em poucos arquivos e cabe numa resposta
da IA.

## Trechos padrão

Cada trecho é um arquivo em `conteudo/trechos/`. Para incluir, escreva numa linha sozinha:

```markdown
<!-- trecho: nome-do-trecho -->
```

Dentro dos trechos podem ser usadas as variáveis `{{titulo}}` e `{{slug}}`, que o script
troca pelos valores do frontmatter de cada ideia (inclusive dentro de blocos de código).

| Trecho | Onde entra | O que cobre |
|---|---|---|
| `ia-professora` | Antes de começar | O papel da IA professora, como funciona uma conversa, o **prompt de apresentação** (que combina o jeito de ensinar: explicar antes, código completo, explicar depois, perguntas no fim) e as regras de ouro. |
| `escolher-stack` | 1ª etapa | O que é stack, prompt para discutir a stack, preparar o computador (VS Code, Live Server, Git, GitHub, `git config`) e criar a pasta `{{slug}}`. |
| `documentar-projeto` | 2ª etapa | Por que documentar, o modelo do `docs/projeto.md` (visão, funcionalidades, casos de uso, telas, dados, arquivos, stack, como a IA vai ajudar) e o prompt para completar o documento. |
| `criar-repositorio` | 3ª etapa | `git init`, primeiro commit com a documentação, criar o repositório no GitHub, `remote` e `push`, e o prompt para erros. |
| `dividir-em-partes` | 4ª etapa | Por que dividir, o ciclo de cada parte (pedir, ler, colar, testar, perguntar, commit) e o prompt para discutir a divisão. |
| `revisar-e-testar` | Depois das partes | Requisitos, telas diferentes, console, validador do W3C e o prompt de revisão. |
| `escrever-readme` | Depois da revisão | Modelo de README com "Como usei IA" e o prompt para escrevê-lo. |
| `publicar-github-pages` | Última etapa | Configurar o GitHub Pages, testar o link e colocar no "About". |
| `checklist-entrega` | Checklist de entrega | Itens comuns a qualquer projeto. |

## Regras de escrita

- Português do Brasil, falando com ela por "você". Direto e acolhedor, sem infantilizar.
- Ela já viu HTML e CSS básico: não explicar o que é uma tag ou uma propriedade. Todo o resto
  é explicado na primeira vez que aparece **na página**, porque cada ideia é lida sozinha.
- Cada etapa diz **o que** fazer, **como** e **por quê**.
- Frases curtas, um conceito por parágrafo.
- Comandos de terminal em blocos ` ```bash `, iguais em qualquer sistema, pensados para o
  terminal integrado do VS Code. Nada de comando exclusivo de Windows ou Mac.
- Explicar o que um comando faz antes (ou logo depois) de pedir para rodá-lo.
- Não citar nomes de IAs ou de produtos de IA.
- Não usar caixas de seleção (`- [ ]`): o site não salva marcação.
- Imagens de terceiros: indicar bancos gratuitos (Unsplash, Pexels) e pedir crédito no README.
- Nada de material de marcas reais no código dela (logotipos, fotos oficiais).

## Regras dos prompts

É aqui que o princípio "IA como professora" (ver `produto.md`) vira prática.

- Todo prompt vai num bloco ` ```prompt `, que ganha o rótulo "Prompt para a IA" e o botão
  de copiar.
- **A IA escreve o código**, sempre com explicação: todo prompt de parte termina com
  "Lembre do nosso jeito de ensinar: explique antes o que vai fazer e por quê, escreva o
  código completo e depois explique cada trecho."
- O prompt diz exatamente o que construir: arquivos, elementos, comportamentos e limites
  ("ainda não faça X").
- Quando um conceito é central na parte, o prompt pede para explicá-lo antes do código.
- O que ela precisa preencher fica em `[COLCHETES MAIÚSCULOS]`, ex.: `[SEU TEMA]`.
- Prompts que não são de código (stack, documento, divisão, erros, revisão) terminam pedindo
  explicação e, quando for o caso, "Ainda não escreva código".
- De vez em quando, para exercitar o raciocínio, o prompt pede **primeiro uma dica** e só
  depois o código (ex.: a sequência de dias no registro de hábitos).
- Dados gerados pela IA (perguntas do quiz, textos) sempre vêm com o aviso de conferir.

## Como adicionar uma ideia

1. Copie `conteudo/_modelo.md` para `conteudo/ideias/<slug>.md`.
2. Preencha o frontmatter com `status: rascunho`, o `bloco` e a próxima `ordem` dele.
3. Escreva seguindo este documento e acrescente a ideia ao catálogo em `produto.md`.
4. Rode `npm start` e, em outro terminal, `npm run conteudo:watch`. Revise no navegador.
5. Faça a revisão antes de publicar (abaixo).
6. Mude para `status: publicada`, faça o commit e o push na `main`. O deploy é automático.

Para um bloco novo, crie `conteudo/blocos/<id>.md` com a próxima `ordem`.

## Revisão antes de publicar

- Ler a página inteira no site, não só no editor.
- Testar os prompts numa IA de verdade: a resposta explica antes e depois do código, e o
  código funciona?
- Seguir o passo a passo de verdade até a publicação, ou pedir para alguém seguir.
- Conferir se os links funcionam.
- `npm run build` sem erro.

## Como mudar um trecho padrão

Edite `conteudo/trechos/<nome>.md`. A mudança vale para todas as ideias no próximo deploy.
Releia pelo menos uma ideia para conferir se o texto ainda se encaixa com a parte específica
que vem depois dele.

## Como despublicar

Mude para `status: rascunho` e faça o push. A ideia sai do site no próximo deploy, e o
arquivo continua no repositório.

## O que o script valida

Qualquer item abaixo quebra o `npm start` e o `npm run build`, com a mensagem
`arquivo: problema`.

- **Frontmatter da ideia:** começa com `---` e fecha com outra linha `---`; YAML válido;
  todos os campos da tabela, com o tipo certo, e nenhum a mais (pega erros de digitação e
  campos antigos, como `tempoEstimado`); `slug` igual ao nome do arquivo; `bloco` existente;
  `nivel` entre 1 e 3; `icone` curto; `ordem` sem repetição no mesmo bloco; `resumo` com até
  160 caracteres; `treina` com 3 a 6 itens; `status` válido.
- **Blocos:** pelo menos um; cada um com `titulo`, `ordem` (sem repetição) e descrição.
- **Páginas:** `inicio.md` (com `titulo` e `subtitulo`) e `recado.md` (com `titulo`) existem e
  têm texto.
- **Seções:** as 7 seções `##` presentes, na ordem, sem seções `##` extras e sem texto antes
  de `## Sobre o projeto` (comentários são permitidos); `## Requisitos` tem
  `### Obrigatórios` e `### Desafios extras`. Linhas dentro de blocos de código não contam.
- **Trechos na ideia:** todo `<!-- trecho: x -->` fica sozinho na linha e aponta para um
  arquivo existente; cada um dos 9 trechos padrão aparece uma única vez, na seção certa; no
  Passo a passo, a ordem é a do método, com pelo menos uma parte.
- **Arquivos de trecho:** não podem ser vazios, ter seções `##`, incluir outros trechos nem
  ter partes; os trechos de etapa têm um título `### Etapa — Título`, e os demais não podem
  ter etapas.
- **Etapas e partes:** toda etapa própria da ideia é uma parte (`### Etapa — Parte: Título`);
  número escrito à mão (`### Etapa 3 — ...` ou `Parte 2:`) é erro; etapa fora do
  `## Passo a passo` é erro.
- **Variáveis:** só `{{titulo}}` e `{{slug}}`, nas ideias e nos trechos.
- **Markdown:** bloco de código (` ``` `) ou comentário HTML (`<!--`) sem fechamento.

Se houver qualquer erro, o script não grava nada: o que já estava gerado continua valendo
(no `npm run conteudo:watch`, o site local segue mostrando a última versão válida).

Comentários HTML são removidos em todo lugar fora de blocos de código cercados, inclusive
dentro de código inline. Para mostrar um comentário HTML no texto, use um bloco ` ```html `.
