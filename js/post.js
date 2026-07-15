function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function showError(message) {
  const detailHeader = document.getElementById('detail-header');
  const detailTitle = document.getElementById('detail-title');
  const detailMeta = document.getElementById('detail-meta');
  const postBody = document.getElementById('post-body');

  detailHeader.style.backgroundImage = "url('https://via.placeholder.com/1600x900?text=Erro')";
  detailTitle.textContent = 'Erro ao carregar postagem';
  detailMeta.textContent = '';
  postBody.innerHTML = `<div class="error"><pre>${message}</pre></div>`;
}

function renderPost(post) {
  const detailHeader = document.getElementById('detail-header');
  const detailTitle = document.getElementById('detail-title');
  const detailMeta = document.getElementById('detail-meta');
  const postBody = document.getElementById('post-body');

  if (post.active !== true) {
    showError('Este post está desativado.');
    return;
  }

  detailHeader.style.backgroundImage = `url('${post.thumbnail}')`;
  detailTitle.textContent = post.title;
  detailMeta.textContent = `${new Date(post.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })} · ${post.author}`;
  postBody.innerHTML = post.content;
}

const slug = getQueryParam('slug');
if (!slug) {
  showError('Nenhum slug fornecido na URL. Use ?slug=post-01.');
} else {
  fetch(`data/posts/${slug}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(renderPost)
    .catch(error => {
      showError(`Não foi possível carregar o post "${slug}".`);
      console.error(error);
    });
}
