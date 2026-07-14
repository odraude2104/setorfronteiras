const postsContainer = document.getElementById('posts');
const paginationContainer = document.getElementById('pagination');
const POSTS_PER_PAGE = 4;
let currentPage = 1;
let allPosts = [];

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

function createPostCard(post) {
  const thumbnail = post.thumbnail || 'https://via.placeholder.com/800x450?text=Sem+imagem';
  const summary = post.summary || post.content || '';

  return `
    <article class="post-card">
      <div class="thumbnail" style="background-image: url('${thumbnail}')"></div>
      <div class="card-body">
        <h2>${post.title}</h2>
        <p class="meta">${formatDate(post.date)} · ${post.author || 'Autor não informado'}</p>
        <p class="summary">${summary}</p>
      </div>
    </article>
  `;
}

function renderPosts(posts) {
  if (!posts || posts.length === 0) {
    postsContainer.innerHTML = '<div class="empty-state">Nenhum post encontrado. Crie conteúdo em <code>data/data.json</code>.</div>';
    return;
  }

  postsContainer.innerHTML = posts.map(createPostCard).join('');
}

function renderPagination(totalPages) {
  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  let buttons = '';
  for (let page = 1; page <= totalPages; page += 1) {
    buttons += `<button class="page-button ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`;
  }

  paginationContainer.innerHTML = buttons;
  paginationContainer.querySelectorAll('.page-button').forEach(button => {
    button.addEventListener('click', () => {
      const page = Number(button.dataset.page);
      if (page !== currentPage) {
        goToPage(page);
      }
    });
  });
}

function goToPage(page) {
  currentPage = page;
  renderCurrentPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCurrentPage() {
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = allPosts.slice(start, start + POSTS_PER_PAGE);
  renderPosts(visiblePosts);
  renderPagination(Math.ceil(allPosts.length / POSTS_PER_PAGE));
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
  .then(posts => {
    allPosts = Array.isArray(posts) ? posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date)) : [];
    renderCurrentPage();
  })
  .catch(error => {
    showError('Verifique se o arquivo data/data.json existe e se está acessível via servidor.', error);
    console.error(error);
  });
