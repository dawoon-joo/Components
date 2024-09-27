document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query');
  const articleGroup = document.getElementById('articleGroup');

  if (!query) {
    articleGroup.innerHTML = '<p>검색어를 입력하세요.</p>';
    return;
  }

  fetch('./common/js/articles.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const filteredArticles = data.filter(article => 
        article.keywords.toLowerCase().includes(query.toLowerCase())
      );

      // 검색 결과가 없으면 메시지를 표시
      if (filteredArticles.length === 0) {
        articleGroup.innerHTML = '<p>검색 결과가 없습니다.</p>';
        return;
      }

      filteredArticles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.innerHTML = `
          <a href="${article.url}" class='git-link'>
            <figure>
              <img src="${article.thumbnail}" alt="">
            </figure>
            <div class="txt-box">
              <h4 class="sbj">${article.title}</h4>
              <p class="desc">${article.description}</p>
            </div>
          </a>
        `;
        articleGroup.appendChild(articleElement);
      });
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      articleGroup.innerHTML = '<p>데이터를 불러오는 중 오류가 발생했습니다.</p>';
    });
});
