const postsContainer = document.getElementById('posts');

function renderPosts(posts) {
  if (!posts || posts.length === 0) {
    postsContainer.innerHTML = '<div class="empty-state">Nenhum post encontrado. Crie conteúdo em <code>data/data.json</code>.</div>';
    return;
  }

  const html = posts.map(post => {
    const date = new Date(post.date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    return `
      <article class="post-card">
        <h2>${post.title}</h2>
        <p class="meta">${date} · ${post.author}</p>
        <p class="summary">${post.summary}</p>
        <div class="content">${post.content}</div>
      </article>
    `;
  }).join('');

  postsContainer.innerHTML = html;
}

function showError(message, error) {
  postsContainer.innerHTML = `
    <div class="error">
      <strong>Erro ao carregar posts:</strong>
      <pre>${message}</pre>
      ${error ? `<pre>${error}</pre>` : ''}
    </div>
  `;
}

fetch('data/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(renderPosts)
  .catch(error => {
    showError('Verifique se o arquivo data/data.json existe e se está acessível via servidor.', error);
    console.error(error);
  });
