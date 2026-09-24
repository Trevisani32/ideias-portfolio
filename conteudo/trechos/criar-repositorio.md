### Etapa — Criar o repositório

**Objetivo:** guardar o projeto no Git e no GitHub, começando pela documentação.

#### Por que agora

O repositório guarda a história do projeto. Começar pela documentação mostra, para quem visitar o seu GitHub, que você planejou antes de programar. Recrutadores reparam nisso.

#### Passo a passo

1. **Inicie o Git na pasta.** No terminal do VS Code, dentro da pasta `{{slug}}`, rode:

```bash
git init -b main
```

Isso transforma a pasta num repositório, com a linha principal do histórico chamada `main`. Essa linha é uma *branch*; por enquanto você só vai usar essa.

2. **Faça o primeiro commit.** Um *commit* é uma versão salva do projeto, com uma mensagem que diz o que mudou.

```bash
git add .
git commit -m "Adiciona a documentação do projeto"
```

O `git add .` separa todos os arquivos da pasta para entrar na próxima versão, e o `git commit` salva essa versão com a mensagem.

3. **Crie o repositório no GitHub.** Em github.com, clique em **New repository**. Dê o nome `{{slug}}`, deixe como **Public** e **não** marque as opções de criar README, .gitignore ou licença: o repositório precisa nascer vazio.

4. **Conecte e envie.** Rode os comandos abaixo, trocando `seu-usuario` pelo seu nome de usuário do GitHub:

```bash
git remote add origin https://github.com/seu-usuario/{{slug}}.git
git push -u origin main
```

O `remote add` diz ao Git onde fica a cópia do projeto no GitHub, e o `push` envia os seus commits para lá. Na primeira vez, o Git pode abrir o navegador para você entrar na sua conta.

5. **Confira.** Atualize a página do repositório no GitHub: a pasta `docs` com o seu documento deve aparecer.

#### Se der erro

Copie a mensagem inteira do terminal e mande para a professora:

```prompt
Tentei enviar o meu projeto para o GitHub e apareceu este erro no terminal:

[COLE A MENSAGEM DE ERRO]

Me explique o que esse erro significa, por que ele aconteceu e como resolver, um passo de cada vez.
```
