# Ideias de Portfólio

Ideias de projetos de portfólio para quem está começando em programação. Cada ideia traz o
passo a passo completo, do primeiro arquivo até o projeto publicado no GitHub, com a IA no
papel de professora: ela escreve o código explicando o que vai fazer, como e por quê, e você
planeja, testa, pergunta e aprende.

Site: https://trevisani32.github.io/ideias-portfolio/

## Rodar localmente

Requer Node 22.

```bash
npm install
npm start
```

Abre em `http://localhost:4200`, mostrando também as ideias em rascunho.

## Onde fica cada coisa

| Caminho | O quê |
|---|---|
| `conteudo/` | Todo o texto do site: início, recado, blocos, ideias e trechos padrão |
| `conteudo.md` | Como escrever e manter as ideias |
| `produto.md` | O que o site é, o método, as páginas e o catálogo de ideias |
| `decisoes/` | Decisões de arquitetura |
| `DEPLOY.md` | Publicação no GitHub Pages |

## Comandos

```bash
npm start               # gera o conteúdo (com rascunhos) e sobe o site local
npm run conteudo:watch  # regenera o conteúdo ao salvar um .md
npm test                # testes do app
npm run test:conteudo   # testes do script de conteúdo
npm run build           # build de produção (só ideias publicadas)
```

Feito com Angular e publicado no GitHub Pages.
