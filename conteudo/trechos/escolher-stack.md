### Etapa — Escolher a stack e preparar o computador

**Objetivo:** saber com quais tecnologias o projeto vai ser feito e deixar o computador pronto para começar.

#### O que é a stack

A *stack* é o conjunto de tecnologias de um projeto: linguagens, bibliotecas e ferramentas. Pensar nela antes de começar evita surpresas no meio do caminho, como descobrir que falta instalar alguma coisa ou que a ferramenta escolhida não funciona no GitHub Pages.

A pergunta que guia a escolha é sempre a mesma: **o que o projeto precisa fazer, e qual é a tecnologia mais simples que resolve isso?**

#### Converse com a professora

A stack deste projeto já está sugerida no fim desta etapa, mas entender o porquê de cada escolha faz parte do aprendizado. Mande este prompt e leia a resposta com calma:

```prompt
Vou construir o projeto "{{titulo}}". Estes são os requisitos:

[COLE AQUI OS REQUISITOS OBRIGATÓRIOS DESTA PÁGINA]

Me explique qual stack você recomenda para esse projeto e por quê: quais linguagens, se preciso de alguma biblioteca e o que preciso instalar no computador. Quero publicar no GitHub Pages, então explique também por que essa stack funciona lá. Ainda não escreva código.
```

#### Prepare o computador

Se você já fez isto em outro projeto, pule para "Crie a pasta do projeto".

1. **VS Code.** Instale o editor pelo site oficial (code.visualstudio.com). É nele que você vai criar e editar os arquivos.
2. **Extensão Live Server.** No VS Code, abra a aba de extensões (o ícone de quadradinhos na lateral), procure por "Live Server" e instale. Ela abre o site no navegador e atualiza a página sozinha sempre que você salva um arquivo.
3. **Git.** Instale pelo site oficial (git-scm.com), aceitando as opções padrão. O Git guarda o histórico do projeto: cada versão salva fica registrada e dá para voltar nela depois.
4. **Conta no GitHub.** Crie em github.com. É lá que o projeto fica guardado e publicado. Escolha um nome de usuário profissional: ele vai aparecer no endereço dos seus projetos.
5. **Apresente-se ao Git.** Abra o terminal do VS Code (menu **Terminal → New Terminal**) e rode os comandos abaixo, trocando pelo seu nome e pelo e-mail da conta do GitHub:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

Isso só precisa ser feito uma vez por computador. O Git usa essas informações para registrar quem é a autora de cada versão salva.

#### Crie a pasta do projeto

Crie uma pasta chamada `{{slug}}` num lugar fácil de achar (por exemplo, dentro de Documentos) e abra essa pasta no VS Code pelo menu **File → Open Folder**. Todos os arquivos do projeto vão ficar dentro dela.
