### Etapa — Escrever o README

**Objetivo:** criar a vitrine do projeto, que é a primeira coisa que alguém vê ao abrir o repositório.

O `README.md` fica na raiz do projeto, e o GitHub mostra esse arquivo logo abaixo da lista de arquivos. Muita gente que avalia portfólio lê só o README, então ele precisa contar rápido o que é o projeto e mostrá-lo funcionando.

#### O que o README deve ter

```markdown
# {{titulo}}

Uma ou duas frases sobre o que é o projeto.

**Acesse:** https://seu-usuario.github.io/{{slug}}/

![Print do projeto](docs/print.png)

## Funcionalidades
- ...

## Tecnologias
- ...

## Como rodar no seu computador
1. Clone o repositório.
2. Abra a pasta no VS Code.
3. Abra o index.html com o Live Server.

## O que eu aprendi
- ...

## Como usei IA
Usei uma IA como professora: ela escreveu o código de cada parte explicando o que fazia, como e por quê. Eu planejei e documentei o projeto, testei cada parte e fiz perguntas até entender tudo. Algumas coisas que aprendi nesse processo: ...
```

Tire um print da tela do projeto funcionando e salve como `docs/print.png`.

#### Escreva com a professora

```prompt
Preciso escrever o README do meu projeto "{{titulo}}" para o portfólio. Esta é a documentação:

[COLE AQUI O SEU docs/projeto.md]

Me ajude a escrever um README claro e atraente seguindo este modelo:

[COLE AQUI O MODELO DE README DESTA PÁGINA]

Nas seções "O que eu aprendi" e "Como usei IA", me faça perguntas sobre a minha experiência em vez de inventar. Explique também por que cada seção é importante para quem vai avaliar o meu portfólio.
```

Salve o arquivo e envie para o GitHub:

```bash
git add .
git commit -m "Adiciona o README"
git push
```
