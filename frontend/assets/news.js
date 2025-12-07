// News search page functionality

document.addEventListener('DOMContentLoaded', function () {
    if (!checkAuth()) return;

    const searchForm = document.getElementById('search-form');
    const searchQuery = document.getElementById('search-query');
    const newsGrid = document.getElementById('news-grid');
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error-message');
    const noNewsEl = document.getElementById('no-news');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const query = searchQuery.value.trim();
        if (!query) return;

        loadingEl.style.display = 'block';
        errorEl.style.display = 'none';
        newsGrid.innerHTML = '';
        noNewsEl.style.display = 'none';

        try {
            const articles = await searchNews(query);

            if (articles.length === 0) {
                noNewsEl.textContent = `No articles found for "${query}"`;
                noNewsEl.style.display = 'block';
            } else {
                newsGrid.innerHTML = articles.map(article => `
                    <article class="news-card">
                        ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">` : ''}
                        <div class="news-content">
                            <h3>${article.title}</h3>
                            <p class="source">${article.source?.name || 'Unknown Source'}</p>
                            <p>${article.description || 'No description available'}</p>
                            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="read-more">
                                Read Full Article →
                            </a>
                        </div>
                    </article>
                `).join('');
            }
        } catch (error) {
            errorEl.textContent = error.message;
            errorEl.style.display = 'block';
        } finally {
            loadingEl.style.display = 'none';
        }
    });
});
