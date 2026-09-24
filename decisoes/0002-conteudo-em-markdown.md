# ADR 0002 — Conteúdo em Markdown com índice gerado no build

- **Status:** Aceito
- **Data:** 2026-09-24

## Contexto

O site é praticamente só texto longo: cada ideia tem um passo a passo com várias etapas,
comandos e prompts. Sem backend ([ADR 0001](0001-site-estatico-sem-backend.md)), o conteúdo
precisa viver no repositório, num formato confortável de escrever e revisar, e o app
precisa de uma lista das ideias (título, nível, ordem...) para montar o menu e os cartões.

## Decisão

- Cada ideia é um arquivo `conteudo/ideias/<slug>.md`, com **frontmatter YAML** (metadados)
  e corpo em **Markdown**.
- Um script Node (`scripts/gerar-conteudo.mjs`) roda antes do `start` e do `build` e:
  - valida frontmatter e estrutura;
  - monta o corpo final (inclusão de blocos, variáveis, numeração de etapas —
    [ADR 0003](0003-ideias-autocontidas.md));
  - gera `public/conteudo/indice.json` (metadados de todas as ideias) e
    `public/conteudo/ideias/<slug>.md` (corpo final).
- `public/conteudo/` é gerado e não é versionado.
- O Angular busca esses arquivos por HTTP e renderiza o Markdown com **ngx-markdown**.
- Ideias têm `status: rascunho | publicada`. O build de produção só inclui as publicadas; o
  ambiente local mostra as duas.

## Consequências

- Escrever uma ideia é editar um `.md` no editor, com pré-visualização local.
- Os metadados têm uma fonte só (o frontmatter): o índice nunca fica fora de sincronia.
- Conteúdo inválido quebra o build e não vai para o ar. É de propósito.
- Depende do ngx-markdown acompanhar as versões do Angular. Se ficar para trás, dá para
  trocar por `marked` direto num componente próprio sem mudar nenhum arquivo de conteúdo.
- Sem pré-renderização, buscadores veem pouco conteúdo. Não importa para este site.

## Alternativas consideradas

- **Conteúdo em JSON ou TypeScript.** Ruim para texto longo com formatação.
- **CMS headless.** Serviço externo e conta extra para um site de um mantenedor só.
- **Pré-renderização (SSG) do Angular.** Melhoraria SEO e primeira carga, mas adiciona
  complexidade sem necessidade agora. Fica como opção futura, sem afetar o formato do
  conteúdo.
