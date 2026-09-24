Neste guia, a IA é a sua **professora particular**. Ela escreve o código do projeto, mas nunca de qualquer jeito: antes de cada trecho, ela explica **o que** vai fazer, **como** vai fazer e **por que** escolheu esse caminho. O seu papel é planejar, ler, testar e perguntar até entender.

No fim, o projeto é seu: foi você que decidiu o que construir, conferiu cada parte e sabe explicar como tudo funciona.

### Como funciona uma conversa com a professora

1. Abra uma conversa nova na IA de chat que você preferir.
2. Cole o **prompt de apresentação** abaixo. Ele combina com a IA o jeito de ensinar.
3. Em cada etapa deste guia, copie o prompt da etapa, troque o que estiver entre `[COLCHETES]` e envie.
4. Leia a explicação **antes** de olhar o código.
5. Copie o código para o arquivo indicado, salve e teste no navegador.
6. Se algo não ficou claro, pergunte. Não existe pergunta boba: é para isso que a professora está ali.
7. Só avance quando conseguir responder às perguntas do "Confira se entendeu".

### Prompt de apresentação

Use este prompt no começo de cada conversa nova sobre o projeto.

```prompt
A partir de agora você é a minha professora de programação. Estou aprendendo a criar sites e vou construir o projeto "{{titulo}}" para o meu portfólio no GitHub. Já vi o básico de HTML e CSS, mas ainda estou começando.

Sempre que for escrever código, siga este jeito de ensinar:
1. Antes do código, explique em poucas frases o que você vai fazer, como vai fazer e por que escolheu esse caminho.
2. Escreva o código completo de cada arquivo, sem pular partes e sem "..." no meio, dizendo o nome do arquivo e em que pasta ele fica.
3. Depois do código, explique cada trecho importante: o que ele faz, como funciona e por que foi escrito assim.
4. Quando aparecer um conceito novo, explique com uma comparação simples do dia a dia.
5. Termine com 2 ou 3 perguntas curtas para eu testar se entendi. Só me dê as respostas se eu pedir.

Fale em português, com linguagem simples, e faça uma parte do projeto por vez. Se eu disser que não entendi, explique de outro jeito.

Responda só "Combinado!" e espere a primeira tarefa.
```

Quando a documentação do projeto estiver pronta (etapa 2), cole também o conteúdo do `docs/projeto.md` logo depois desse prompt, sempre que abrir uma conversa nova.

### Regras de ouro

- **Leia antes de colar.** Nada entra no projeto sem que você tenha lido a explicação.
- **Teste tudo.** Depois de cada parte, abra o site no navegador e veja funcionando.
- **Pergunte o porquê.** "Por que assim, e não de outro jeito?" é a melhor pergunta que existe.
- **A IA também erra.** Se algo não funcionar, conte o que aconteceu, cole a mensagem de erro e peça para ela explicar a causa antes de corrigir.
- **Conversa longa demais?** Se a IA começar a esquecer o que já foi feito, abra uma conversa nova com o prompt de apresentação, o `docs/projeto.md` e o código atual dos arquivos.
- **Guarde o que aprendeu.** As explicações da professora viram material de estudo e ajudam a escrever a seção "Como usei IA" do README.
