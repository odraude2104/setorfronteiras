# setorfronteiras

Blog simples usando posts definidos manualmente em JSON.

## Como usar

1. Abra `index.html` no navegador ou use um servidor local.
2. Edite os arquivos em `data/posts/*.json` para adicionar ou alterar posts.
3. Recarregue a página para ver as alterações.

## Estrutura de arquivos

- `data/posts/post-01.json` ... `data/posts/post-25.json`: cada postagem separada.
- `images/post-01.svg` ... `images/post-25.svg`: miniaturas usadas nos cards.
- `post.html`: página de postagem individual.

## Propriedade `enable`

Cada post agora deve indicar se está habilitado ou não:

```json
{
  "slug": "post-01",
  "title": "Primeiro post do blog",
  "date": "2026-07-14",
  "author": "Equipe Setor Fronteiras",
  "thumbnail": "images/post-01.svg",
  "summary": "Resumo curto do post.",
  "content": "<p>Escreva o conteúdo do post aqui. Você pode usar HTML simples como <strong>negrito</strong>, listas ou parágrafos.</p>",
  "enable": true
}
```

A homepage só exibe posts com `enable: true`. Um post desativado também não será exibido em `post.html`.

## Paginação e navegação

A página inicial exibe cards com thumbnails e paginação. Ao clicar em um card, você é levado para `post.html?slug=post-XX`.

## Sugestão de teste local

Se preferir, execute um servidor local no diretório do projeto:

```bash
python -m http.server 8000
```

Então abra `http://localhost:8000` no navegador.
