### Etapa — Documentar o projeto

**Objetivo:** escrever, antes de qualquer código, um documento que descreve o projeto inteiro: o que ele faz, como vai ser feito e como a IA vai ajudar.

#### Por que documentar primeiro

Programar sem plano é como montar um móvel sem olhar o manual: até dá, mas você desmonta tudo três vezes. O documento é o manual do seu projeto. E ele tem mais uma vantagem: é o melhor contexto que você pode dar para a IA. Com ele colado na conversa, as respostas ficam muito mais certeiras.

Dentro da pasta do projeto, crie a pasta `docs` e, dentro dela, o arquivo `projeto.md`. O `.md` é *Markdown*: um formato de texto simples, com títulos e listas, que o GitHub mostra já formatado.

#### O que o documento precisa ter

Copie este modelo para o `docs/projeto.md`. Se alguma seção não fizer sentido para o projeto, escreva "Não se aplica" e explique por quê, mas pense em cada uma antes de descartar.

```markdown
# {{titulo}}

## Visão geral
Em 2 ou 3 frases: o que é o projeto, para quem é e qual problema resolve.

## Funcionalidades
### Obrigatórias
- ...
### Extras (se der tempo)
- ...

## Casos de uso
Um caso de uso descreve, passo a passo, uma ação de quem usa o site.

### Nome do caso de uso
- **Quem:** quem está usando
- **Passos:**
  1. ...
  2. ...
- **Resultado esperado:** o que acontece no final

## Telas
Um esboço de cada tela: o que aparece, em que ordem e onde.
Pode ser um desenho no papel (fotografe e salve na pasta docs) ou uma descrição em texto.
Descreva como a tela fica no computador e no celular.

## Dados
Quais informações o projeto usa, onde elas ficam (escritas no código, salvas no navegador ou num banco de dados) e em que formato.

## Estrutura de arquivos
Quais arquivos o projeto vai ter e o que vai em cada um.

## Stack
As tecnologias escolhidas na etapa anterior e por quê.

## Como a IA vai ajudar
Em quais partes você vai pedir código para a IA, o que você quer aprender em cada uma e como vai conferir se o resultado está certo.
```

#### Escreva junto com a professora

Tente preencher sozinha primeiro, mesmo que fique incompleto: é pensando no projeto que você entende o que precisa construir. Depois, peça ajuda para completar e revisar:

```prompt
Estou documentando o projeto "{{titulo}}" antes de começar a programar. Este é o meu rascunho:

[COLE AQUI O SEU docs/projeto.md]

Me ajude a completar e melhorar o documento. Para cada seção, me diga o que está bom, o que está faltando e por que aquilo é importante. Se for preciso decidir alguma coisa, me faça perguntas em vez de decidir por mim. No final, me mostre o documento completo.
```

Salve a versão final em `docs/projeto.md`. Daqui para frente, sempre que abrir uma conversa nova com a professora, cole o documento logo depois do prompt de apresentação.
