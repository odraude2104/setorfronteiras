const postsContainer = document.getElementById('posts');
const paginationContainer = document.getElementById('pagination');
const POSTS_PER_PAGE = 9;
const POSTS_DIR = 'data/posts';
const MAX_POST_FILES = 80;
const MAX_MISSES = 6;
let currentPage = 1;
let allPosts = [];

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

async function loadPostFiles() {
  const posts = [];
  let consecutiveMissing = 0;

  for (let i = 1; i <= MAX_POST_FILES && consecutiveMissing < MAX_MISSES; i += 1) {
    const slug = `post-${String(i).padStart(2, '0')}`;
    const url = `${POSTS_DIR}/${slug}.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        consecutiveMissing += 1;
        continue;
      }

      const post = await response.json();
      if (post.enable) {
        posts.push(post);
      }
      consecutiveMissing = 0;
    } catch (error) {
      consecutiveMissing += 1;
    }
  }

  return posts;
}

function createPostCard(post) {
  return `
    <a class="card-link" href="post.html?slug=${post.slug}">
      <article class="post-card">
        <div class="thumbnail" style="background-image: url('${post.thumbnail}')"></div>
        <div class="card-body">
          <h2>${post.title}</h2>
          <p class="meta">${formatDate(post.date)} · ${post.author}</p>
          <p class="summary">${post.summary}</p>
        </div>
      </article>
    </a>
  `;
}

function renderPosts(posts) {
  if (!posts || posts.length === 0) {
    postsContainer.innerHTML = '<div class="empty-state">Nenhum post ativo encontrado. Crie ou ative um post em <code>data/posts/post-XX.json</code>.</div>';
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

loadPostFiles()
  .then(posts => {
    allPosts = Array.isArray(posts) ? posts.slice().sort((a, b) => new Date(a.date) - new Date(b.date)) : [];
    renderCurrentPage();
  })
  .catch(error => {
    showError('Verifique se os arquivos em data/posts/ existem e estão acessíveis via servidor.', error);
    console.error(error);
  });
