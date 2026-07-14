# setorfronteiras

Blog simples usando posts definidos manualmente em JSON.

## Como usar

1. Abra `index.html` no navegador ou use um servidor local.
2. Edite `data/data.json` para adicionar ou alterar posts.
3. Recarregue a página para ver os posts atualizados.

## Modelo de post

```json
[
  {
    "title": "Primeiro post",
    "date": "2026-07-14",
    "author": "Seu nome",
    "summary": "Resumo curto do post.",
    "content": "<p>Escreva o conteúdo do post aqui. Você pode usar HTML simples como <strong>negrito</strong> ou listas.</p>"
  }
]
```

## Sugestão de teste local

Se preferir, execute um servidor local no diretório do projeto:

```bash
python -m http.server 8000
```

Então abra `http://localhost:8000` no navegador.
