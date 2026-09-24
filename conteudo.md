# conteudo.md — Como escrever e manter as ideias

Todo texto do site mora em `conteudo/`. É só lá que se edita: `public/conteudo/` é gerado
pelo script a cada `npm start` e `npm run build`, e qualquer mudança feita nele se perde.

```
conteudo/
├── _modelo.md          # copiar para criar uma ideia
├── inicio.md           # texto da página inicial
├── blocos/             # textos que se repetem em todas as ideias
│   └── <nome>.md
└── ideias/
    └── <slug>.md       # uma ideia por arquivo
```

## Cada ideia é completa

Quem lê uma ideia encontra tudo nela: preparação do ambiente, uso da IA, passo a passo,
README e publicação. Não há páginas de guia compartilhadas
([ADR 0003](decisoes/0003-ideias-autocontidas.md)).

O que se repete entre ideias fica em `conteudo/blocos/` e entra em cada ideia por uma
linha de inclusão. Assim, quem lê vê a página completa e quem mantém corrige o texto num
lugar só.

## Frontmatter

~~~yaml
---
titulo: Cardápio digital de uma cafeteria
slug: cardapio-cafeteria
nivel: 1
ordem: 1
resumo: Uma página de cardápio organizada por categorias para uma cafeteria inventada por você.
tecnologias: [HTML, CSS]
treina: [HTML semântico, CSS Grid, Variáveis CSS, Imagens acessíveis]
tempoEstimado: 6 a 10 horas
status: rascunho
---
~~~

| Campo | Regra |
|---|---|
| `titulo` | Obrigatório. |
| `slug` | Igual ao nome do arquivo, só com minúsculas, números e hífens. Também é o nome sugerido para o repositório dela. |
| `nivel` | `1` = HTML e CSS · `2` = primeiro JavaScript · `3` = JavaScript mais completo. |
| `ordem` | Inteiro que define a sequência sugerida. Não pode se repetir entre ideias. |
| `resumo` | Uma frase de até 160 caracteres. Aparece no cartão do Início. |
| `tecnologias` | Lista, ex.: `[HTML, CSS, JavaScript]`. |
| `treina` | Lista de 3 a 6 itens curtos. |
| `tempoEstimado` | Texto livre, ex.: `6 a 10 horas`. |
| `status` | `rascunho` ou `publicada`. Só `publicada` vai para o site no ar. |

## Estrutura do corpo

Seções `##` obrigatórias, **nesta ordem e só estas**. O script valida.

| # | Seção | Conteúdo |
|---|---|---|
| 1 | `## Sobre o projeto` | O que é e por que fica bem no portfólio. De 1 a 3 parágrafos. |
| 2 | `## O que você vai treinar` | Um item por conceito, com uma linha de explicação. |
| 3 | `## Requisitos` | Subseções `### Obrigatórios` e `### Desafios extras`. |
| 4 | `## Antes de começar` | Bloco `antes-de-comecar` + o que for específico (ex.: onde achar imagens gratuitas). |
| 5 | `## Como usar a IA neste projeto` | Bloco `principios-ia` + onde a IA ajuda neste projeto e o que é trabalho dela. |
| 6 | `## Passo a passo` | Etapas em `###` (formato abaixo). |
| 7 | `## Checklist de entrega` | Bloco `checklist-entrega` + itens específicos do projeto. |
| 8 | `## Para ir além` | Como evoluir o projeto depois de entregue e o que estudar em seguida. |

De `###` para baixo, a estrutura é livre, exceto no Passo a passo.

### Etapas do passo a passo

Ordem das etapas:

1. Bloco `criar-repositorio` (sempre a primeira)
2. Etapas específicas do projeto
3. Bloco `revisar-com-ia`
4. Bloco `escrever-readme`
5. Bloco `publicar-github-pages` (sempre a última)

Toda etapa específica segue este formato:

~~~markdown
### Etapa — Montar a grade de itens

**Objetivo:** uma frase com o resultado desta etapa.

**Você faz:**
1. Primeiro passo concreto.
2. Segundo passo concreto.

**Onde a IA ajuda:** quando e para quê usar a IA nesta etapa.

```prompt
Estou fazendo um cardápio de cafeteria em HTML e CSS para meu portfólio. [...]
```

**Confira se entendeu:**
- Uma pergunta que ela deve conseguir responder sem a IA.

**Salve no Git:**
```bash
git add .
git commit -m "Monta a grade de itens do cardápio"
```
~~~

- **Não numere as etapas.** Escreva `### Etapa — Título`; o script numera na ordem.
- Cada etapa entrega algo que dá para ver no navegador.
- A mensagem de commit sugerida descreve o que mudou, em português.

## Blocos padrão

Cada bloco é um arquivo em `conteudo/blocos/`. Para incluir um bloco, escreva numa linha
sozinha:

```markdown
<!-- bloco: nome-do-bloco -->
```

Dentro dos blocos podem ser usadas as variáveis `{{titulo}}` e `{{slug}}`, que o script troca
pelos valores do frontmatter de cada ideia.

| Bloco | Onde entra | O que cobre |
|---|---|---|
| `antes-de-comecar` | Antes de começar | VS Code com uma extensão de pré-visualização; Git instalado e configurado (`user.name` e `user.email`); conta no GitHub; uma IA de chat de sua escolha. Começa com "Se você já fez isso em outro projeto, pule para o Passo a passo". |
| `principios-ia` | Como usar a IA | O princípio "IA como ferramenta" em linguagem para ela, e como montar um bom prompt: contexto, o que já fez, o que quer e a restrição. |
| `criar-repositorio` | 1ª etapa | Criar a pasta `{{slug}}`, abrir no VS Code, `git init`, primeiro arquivo, primeiro commit, criar o repositório `{{slug}}` no GitHub, conectar e enviar (`git push`). Cada comando explicado antes de ser usado. |
| `revisar-com-ia` | Penúltimas etapas | Revisão geral do código com a IA (prompt pedindo revisão sem reescrever); validação do HTML no validador do W3C; console do navegador sem erros. |
| `escrever-readme` | Penúltimas etapas | Modelo de README: título, descrição, print ou GIF, link do site, tecnologias, como rodar, o que aprendi e **Como usei IA**. |
| `publicar-github-pages` | Última etapa | Ativar o GitHub Pages (branch `main`, pasta raiz), endereço `https://<seu-usuario>.github.io/{{slug}}/`, link no "About" do repositório e teste do link. |
| `checklist-entrega` | Checklist de entrega | Itens comuns a qualquer projeto (lista abaixo). |

Checklist comum (conteúdo do bloco `checklist-entrega`):

- Todos os requisitos obrigatórios estão feitos
- O site está no ar no GitHub Pages, com o link no "About" do repositório
- O README está completo, com print e seção "Como usei IA"
- O histórico tem commits pequenos, com mensagens que dizem o que mudou
- O console do navegador não mostra erros
- O HTML passa no validador do W3C
- Você consegue explicar qualquer trecho do seu código

## Regras de escrita

- Português do Brasil, falando com ela por "você". Direto e acolhedor, sem infantilizar.
- Ela já viu HTML e CSS básico: não explicar o que é uma tag ou uma propriedade. Todo o resto
  é explicado na primeira vez que aparece **na página**, porque cada ideia é lida sozinha.
- Frases curtas, um conceito por parágrafo.
- Comandos de terminal em blocos ` ```bash `, iguais em qualquer sistema, pensados para o
  terminal integrado do VS Code. Nada de comando exclusivo de Windows ou Mac.
- Explicar o que um comando faz antes de pedir para rodá-lo.
- Links só para documentação estável: MDN, documentação do GitHub, W3C.
- Não citar nomes de IAs ou de produtos de IA.
- Não usar caixas de seleção (`- [ ]`): o site não salva marcação e uma caixa que não marca
  frustra. Usar lista comum.
- Imagens de terceiros: indicar bancos gratuitos (Unsplash, Pexels) e pedir crédito no README.
- Nada de material de marcas reais no código dela (logotipos, fotos oficiais). Vale
  principalmente para o clone.

## Regras dos prompts

É aqui que o princípio "IA como ferramenta" (ver `produto.md`) vira prática.

- Todo prompt vai num bloco ` ```prompt `, que ganha botão de copiar.
- Estrutura: contexto do projeto → o que ela já fez → o que ela quer → uma restrição.
- O que ela precisa preencher fica em `[COLCHETES MAIÚSCULOS]`, ex.: `[COLE SEU CSS AQUI]`.
- Os prompts pedem **explicação, dica, revisão ou ajuda para depurar**. Nunca "faça o projeto"
  ou "escreva todo o código".
- Quando pedem código, é um trecho pequeno e vem com "explique linha por linha".
- Sempre que der, pedir primeiro uma dica e só depois a solução ("me dê uma dica, sem
  entregar a resposta").
- Geração livre só para o que não é o foco do projeto (dados fictícios, textos, perguntas do
  quiz), e ela confere o resultado.

Bom:

```prompt
Estou fazendo um cardápio de cafeteria em HTML e CSS para meu portfólio. Montei a grade de
produtos com CSS Grid, mas no notebook ficam 5 colunas espremidas. Este é meu CSS:

[COLE SEU CSS AQUI]

Me explique por que isso acontece e me dê uma dica de como resolver, sem reescrever meu código.
```

Ruim: "Faça um cardápio de cafeteria em HTML e CSS."

## Como adicionar uma ideia

1. Copie `conteudo/_modelo.md` para `conteudo/ideias/<slug>.md`.
2. Preencha o frontmatter com `status: rascunho` e a próxima `ordem`.
3. Se a ideia não veio do catálogo, adicione a especificação dela em `produto.md` primeiro.
4. Escreva seguindo este documento.
5. Rode `npm start` e, em outro terminal, `npm run conteudo:watch`. Revise no navegador.
6. Faça a revisão antes de publicar (abaixo).
7. Mude para `status: publicada`, faça o commit e o push na `main`. O deploy é automático.

## Revisão antes de publicar

- Ler a página inteira no site, não só no editor.
- Testar cada prompt em pelo menos uma IA e conferir se a resposta ajuda sem entregar o
  projeto pronto.
- Seguir o passo a passo de verdade até a publicação, ou pedir para alguém seguir.
- Conferir se os links funcionam.
- `npm run build` sem erro.

## Como mudar um bloco padrão

Edite `conteudo/blocos/<nome>.md`. A mudança vale para todas as ideias no próximo deploy.
Releia pelo menos uma ideia de cada nível para conferir se o texto ainda se encaixa.

## Como despublicar

Mude para `status: rascunho` e faça o push. A ideia sai do site no próximo deploy, e o
arquivo continua no repositório.

## O que o script valida

Qualquer item abaixo quebra o `npm start` e o `npm run build`, com a mensagem
`arquivo: problema`.

- **Frontmatter:** todos os campos presentes e com o tipo certo; `slug` igual ao nome do
  arquivo; `nivel` entre 1 e 3; `ordem` sem repetição; `resumo` com até 160 caracteres;
  `status` válido.
- **Seções:** as 8 seções `##` presentes, na ordem, sem seções `##` extras.
- **Blocos:** todo `<!-- bloco: x -->` aponta para um arquivo existente em `conteudo/blocos/`;
  cada um dos 7 blocos padrão aparece uma única vez em cada ideia, na seção indicada acima;
  no Passo a passo, os blocos seguem a ordem das etapas descrita acima.
- **Variáveis:** não pode sobrar `{{...}}` depois da substituição.
- **Etapas:** título de etapa com número escrito à mão (`### Etapa 3 — ...`) é erro; o
  número é sempre do script.
