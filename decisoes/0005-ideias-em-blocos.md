# ADR 0005 — Ideias agrupadas em blocos progressivos

- **Status:** Aceito
- **Data:** 2026-09-24

## Contexto

A primeira versão separava as ideias em três níveis ("Nível 1 — HTML e CSS", "Nível 2 —
Primeiro JavaScript", "Nível 3 — JavaScript mais completo"), no menu e no Início.

O mantenedor pediu que as nove ideias fiquem **num único grupo, em ordem progressiva**, sem a
separação por nível, porque outros grupos (blocos) virão depois, por exemplo com projetos
que consomem APIs.

## Decisão

- As ideias pertencem a **blocos**. Cada bloco é um arquivo `conteudo/blocos/<id>.md`, com
  `titulo`, `ordem` e uma descrição curta no corpo.
- A ideia aponta para o seu bloco (`bloco: <id>`) e tem a sua posição na trilha do bloco
  (`ordem`, única dentro do bloco).
- O site mostra cada bloco como uma **trilha numerada** (1, 2, 3...), no menu e no Início. A
  página da ideia mostra "Bloco N · Ideia X de Y".
- O `nivel` continua existindo, mas só como **dificuldade** (coraçõezinhos 1 a 3), sem separar
  as ideias.
- O índice gerado passa a ser `{ blocos, ideias }`, com as ideias ordenadas pela ordem do
  bloco e depois pela ordem da ideia. Blocos sem ideia publicada ficam de fora.
- Para liberar a palavra "bloco", os textos reaproveitados entre ideias passaram a se chamar
  **trechos** ([ADR 0003](0003-ideias-autocontidas.md)).

## Consequências

- Criar um grupo novo é criar um arquivo em `conteudo/blocos/` e apontar as ideias para ele.
- A progressão fica explícita: a leitora vê a trilha e sabe qual é a próxima.
- "Anterior" e "próxima" atravessam blocos, na ordem do índice.

## Alternativas consideradas

- **Manter os níveis como grupos.** Rejeitada pelo mantenedor.
- **Nome do bloco escrito direto em cada ideia** (sem arquivo de bloco). Mais simples, mas um
  erro de digitação criaria um grupo novo sem aviso, e não haveria lugar para a descrição.
