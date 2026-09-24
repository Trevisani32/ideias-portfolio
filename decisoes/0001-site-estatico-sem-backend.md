# ADR 0001 — Site estático, sem backend e sem banco

- **Status:** Aceito
- **Data:** 2026-09-24

## Contexto

A primeira versão da ideia tinha três módulos: ideias de portfólio, um guia de "como
programar" e um calendário de entregas. Isso pedia persistência (datas, progresso),
login para dois perfis (quem estuda e quem acompanha) e, portanto, backend e banco. Foram
avaliados Spring Boot + PostgreSQL (Neon ou Render), Firestore e Cloud Run.

Na conversa, o escopo foi reduzido: o site serve **só para ler** ideias de portfólio e o
passo a passo de cada uma. Não há dado de usuário para guardar, e quem mantém o conteúdo
é quem mexe no repositório.

## Decisão

- Site **estático** em Angular, sem backend, sem banco e sem login.
- Conteúdo em arquivos versionados no próprio repositório ([ADR 0002](0002-conteudo-em-markdown.md)).
- Hospedagem no **GitHub Pages**, com deploy por GitHub Actions a cada push na `main`.
- Repositório público na conta do mantenedor.

## Consequências

- Custo zero e nenhum servidor para manter, atualizar ou fazer backup.
- Atualizar o conteúdo = commit + push. Não existe tela de edição.
- Qualquer pessoa com o link lê o site. Aceitável: não há conteúdo sensível.
- Não há como acompanhar o progresso da leitora nem marcar prazos. Se isso voltar a ser
  necessário, este ADR deve ser substituído. Os caminhos possíveis, do mais simples ao mais
  completo:
  1. Marcar etapas só no navegador (localStorage), sem o mantenedor ver o progresso.
  2. Backend próprio (Spring Boot + PostgreSQL), com login e dados compartilhados.

## Alternativas consideradas

- **Spring Boot + Angular + PostgreSQL (Neon + Cloud Run).** Mantém a stack conhecida, mas
  exige hospedar e manter um backend sem ter dados para guardar.
- **Firestore.** Resolveria a persistência sem backend próprio, mas também não há o que
  persistir.
- **HTML/CSS/JS puro, sem framework.** Mais leve, mas perderia a estrutura de rotas,
  componentes e testes que o Angular já oferece, e o mantenedor trabalha no dia a dia com
  Angular.
