# ADR 0003 — Cada ideia é autocontida, com trechos padrão compartilhados

- **Status:** Aceito
- **Data:** 2026-09-24
- **Atualização (2026-09-24):** os "blocos padrão" passaram a se chamar **trechos padrão**
  (`conteudo/trechos/`, marcador `<!-- trecho: nome -->`), para liberar a palavra "bloco" para
  os grupos de ideias ([ADR 0005](0005-ideias-em-blocos.md)). A lista de trechos passou a
  seguir o método do [ADR 0004](0004-ia-como-professora.md).

## Contexto

Várias partes se repetem em todo projeto: conversar com a IA, preparar o computador,
documentar, criar o repositório, dividir em partes, revisar, escrever o README e publicar no
GitHub Pages. Havia duas opções: páginas de guia compartilhadas, linkadas por cada ideia, ou
tudo dentro de cada ideia.

A escolha foi **tudo dentro de cada ideia**: quem lê abre uma ideia e segue do começo ao
fim, sem pular para outra página.

O risco é a manutenção. Com 9 ideias (e mais no futuro), corrigir um passo de publicação
significaria editar o mesmo texto em 9 arquivos, e cedo ou tarde eles ficariam diferentes.

## Decisão

- **Para quem lê:** cada página de ideia é completa, e nenhuma depende de outra.
- **Para quem mantém:** os trechos que se repetem ficam em `conteudo/trechos/<nome>.md` e
  entram em cada ideia por uma linha `<!-- trecho: nome -->`, expandida pelo script de
  conteúdo no build ([ADR 0002](0002-conteudo-em-markdown.md)).
- Os trechos aceitam as variáveis `{{titulo}}` e `{{slug}}`, para citar o nome do projeto e
  do repositório.
- Os trechos padrão são obrigatórios em toda ideia, cada um na sua seção e ordem (lista em
  `conteudo.md`). A parte específica de cada etapa vem logo depois do trecho.
- Etapas e partes são numeradas pelo script, porque as ideias têm quantidades diferentes de
  partes.

## Consequências

- Corrigir um passo comum é editar um arquivo só.
- Toda ideia tem a mesma espinha dorsal, garantida pela validação.
- Um trecho precisa funcionar em qualquer ideia: nada de citar detalhes de um projeto
  específico dentro dele.
- As páginas ficam longas. O sumário "Nesta página" está no backlog do site.

## Alternativas consideradas

- **Guias compartilhados linkados** ("Publicando no GitHub", "Usando IA do jeito certo").
  Menos texto por página, mas obriga a leitora a pular entre páginas no meio do projeto.
  Rejeitado pelo mantenedor.
- **Copiar e colar o texto comum em cada ideia.** Simples no começo, mas os textos se
  distanciam com o tempo.
