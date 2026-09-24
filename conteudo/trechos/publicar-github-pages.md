### Etapa — Publicar no GitHub Pages

**Objetivo:** deixar o projeto no ar, com um link que qualquer pessoa consegue abrir.

O GitHub Pages publica de graça sites feitos com HTML, CSS e JavaScript, direto do seu repositório.

1. **Confira se tudo foi enviado.** No terminal, `git status` deve dizer que não há nada para salvar (*nothing to commit*). Se houver, faça o commit e o `git push`.
2. **Abra as configurações.** No repositório, vá em **Settings → Pages**.
3. **Escolha a origem.** Em **Build and deployment**, deixe **Source** em **Deploy from a branch**.
4. **Escolha a branch.** Em **Branch**, selecione `main` e a pasta `/ (root)` e clique em **Save**.
5. **Espere um pouco.** Depois de um ou dois minutos, atualize a página: o endereço aparece no topo. Ele vai ser `https://seu-usuario.github.io/{{slug}}/`.
6. **Teste o site publicado.** Abra o link e teste tudo de novo, agora pelo endereço público.
7. **Deixe o link em destaque.** Na página inicial do repositório, clique na engrenagem ao lado de **About** e cole o link no campo **Website**.

A cada novo `git push` na `main`, o GitHub Pages atualiza o site sozinho em alguns minutos.

**Se aparecer erro 404:** confira se o arquivo principal se chama exatamente `index.html` (tudo em minúsculas) e se ele está na raiz do repositório, e não dentro de uma pasta.
