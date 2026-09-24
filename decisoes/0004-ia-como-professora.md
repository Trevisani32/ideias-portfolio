# ADR 0004 — A IA como professora, com um método fixo de passo a passo

- **Status:** Aceito
- **Data:** 2026-09-24
- **Substitui:** o princípio "IA como ferramenta, não como autora" da primeira versão do
  `produto.md`

## Contexto

A primeira versão do guia dizia que **ela** escrevia o código e a IA só explicava, revisava e
dava dicas. O passo a passo de cada ideia ainda estava vazio, e as etapas comuns eram curtas.

Ao ver a primeira versão, o mantenedor definiu outro rumo:

- a IA **escreve todo o código**, mas sempre explicando o que vai fazer, como e por quê. A
  ideia é usar a IA como professora;
- os passos precisam ser muito mais detalhados e orientados, sempre com o mesmo roteiro:
  pensar na stack, documentar o projeto inteiro (funcionalidades, casos de uso, banco de
  dados se necessário, telas, como a IA vai ajudar), dividir em partes e, a partir disso, usar
  a IA para escrever o código e ensinar;
- o tempo estimado de cada ideia sai do site.

## Decisão

- **Princípio:** a IA é a professora particular. Ela escreve o código de cada parte com
  explicação antes (o quê, como, por quê) e depois (cada trecho), e termina com perguntas. A
  leitora planeja, documenta, testa, pergunta e faz os commits.
- **Prompt de apresentação:** no começo de cada conversa, ela cola um prompt que combina com a
  IA esse jeito de ensinar (trecho `ia-professora`). Todo prompt de parte termina lembrando o
  combinado.
- **Método fixo** em toda ideia: escolher a stack → documentar (`docs/projeto.md` no
  repositório dela) → criar o repositório → dividir em partes → uma etapa por parte → revisar
  e testar → README → publicar.
- **Cada parte** tem: o que entrega, (antes de pedir), o prompt, como testar, perguntas para
  aprofundar, "Confira se entendeu" e o commit.
- **Partes numeradas pelo script** (`### Etapa — Parte: Título`), como as etapas.
- **Sem tempo estimado:** o campo `tempoEstimado` foi removido e passa a ser rejeitado pela
  validação.
- A seção "Como usar a IA neste projeto" deixou de existir: o papel da IA está no trecho
  `ia-professora` e em cada parte.

## Consequências

- O guia fica muito mais longo e concreto, e cada ideia pode ser seguida do começo ao fim
  sem improviso.
- O risco de ela copiar sem entender é mitigado pelas explicações pedidas em todo prompt,
  pelos testes de cada parte e pelas perguntas de "Confira se entendeu", não por proibir a IA
  de escrever código.
- A seção "Como usei IA" do README dela descreve o uso honestamente: a IA como professora que
  escreveu o código explicando.
- Os prompts precisam ser testados numa IA de verdade antes de publicar cada ideia (revisão
  em `conteudo.md`).

## Alternativas consideradas

- **Manter "ela escreve, a IA ajuda".** Rejeitada pelo mantenedor: o objetivo é aprender com
  a IA ensinando, não evitar que ela escreva código.
- **Passo a passo livre em cada ideia.** Daria mais liberdade, mas perderia o hábito de
  planejar e documentar antes de programar, que é justamente o que o método ensina.
