# setorfronteiras

Blog simples usando posts definidos manualmente em JSON.

## Como usar

1. Abra `index.html` no navegador ou use um servidor local.
2. Edite `data/data.json` para adicionar ou alterar posts.
3. Recarregue a página para ver os posts atualizados.

## Estrutura de post

Cada post agora pode conter um thumbnail e é exibido em cards na página inicial, com paginação.

```json
[
  {
    "title": "Primeiro post",
    "date": "2026-07-14",
    "author": "Seu nome",
    "thumbnail": "https://via.placeholder.com/800x450?text=Thumbnail",
    "summary": "Resumo curto do post.",
    "content": "<p>Escreva o conteúdo do post aqui. Você pode usar HTML simples como <strong>negrito</strong> ou listas.</p>"
  }
]
```

## Paginação

A página inicial mostra um conjunto limitado de posts por página. Ao adicionar mais postagens em `data/data.json`, novos botões de paginação aparecem automaticamente.

## Sugestão de teste local

Se preferir, execute um servidor local no diretório do projeto:

```bash
python -m http.server 8000
```

Então abra `http://localhost:8000` no navegador.
