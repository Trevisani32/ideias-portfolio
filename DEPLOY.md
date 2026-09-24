# Deploy — Ideias de Portfólio

Site estático no GitHub Pages, publicado por GitHub Actions a cada push na `main`.

Endereço: https://trevisani32.github.io/ideias-portfolio/

Custo: zero. GitHub Pages e Actions são gratuitos para repositório público.

## Como funciona

A cada push na `main`, o workflow `.github/workflows/deploy.yml`:

1. Instala as dependências (`npm ci`).
2. Roda os testes do script de conteúdo e do app.
3. Roda `npm run build`, que:
   - gera o conteúdo só com as ideias `publicada` (`prebuild`);
   - faz o build de produção com `baseHref: /ideias-portfolio/`;
   - copia `index.html` para `404.html` (`postbuild`).
4. Publica `dist/ideias-portfolio/browser` no GitHub Pages.

Se qualquer passo falhar, nada é publicado e a versão anterior continua no ar.

### Por que o `404.html`

O GitHub Pages só conhece arquivos. Ao abrir direto `/ideias-portfolio/ideias/quiz-perguntas`
(ou apertar F5 nessa página), ele não acha o arquivo e serve o `404.html`. Como esse
arquivo é uma cópia do `index.html`, o Angular carrega e o roteador mostra a página certa.

## Primeira publicação

Feita uma vez só:

1. Crie o repositório **público** `ideias-portfolio` na sua conta do GitHub, **vazio** (sem
   README, licença ou `.gitignore`).
2. Na pasta do projeto (o git local já está iniciado na branch `main`):
   ```bash
   git remote add origin https://github.com/<seu-usuario>/ideias-portfolio.git
   git add .
   git commit -m "Cria o site de ideias de portfólio"
   git push -u origin main
   ```
3. No GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Acompanhe a execução na aba **Actions**. Quando terminar, abra o endereço.

## Conferir depois de publicar

- O Início carrega e lista as ideias publicadas (ou "Nenhuma ideia publicada ainda").
- Abrir uma ideia e apertar F5: a página continua na ideia.
- Um endereço inexistente (`/ideias-portfolio/xyz`) mostra "Não encontrada".
- O console do navegador não mostra erros.

## Workflow

Cópia de `.github/workflows/deploy.yml`. As versões das actions oficiais foram conferidas
em 2026-09-24; ao atualizar uma, atualize as duas cópias.

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run test:conteudo
      - run: npm test -- --watch=false
      - run: npm run build
      - uses: actions/upload-pages-artifact@v5
        with:
          path: dist/ideias-portfolio/browser

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

`workflow_dispatch` permite publicar de novo pela aba Actions sem precisar de commit.

## Desfazer uma publicação

```bash
git revert <hash-do-commit>
git push
```

O workflow roda de novo e publica a versão anterior.

## Se mudar o nome do repositório

Mude também o `baseHref` da configuração de produção no `angular.json` para
`/<novo-nome>/`. Sem isso, o site abre em branco (os arquivos são buscados no caminho antigo).
