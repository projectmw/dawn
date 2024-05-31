document.addEventListener('DOMContentLoaded', function () {
  let loadMoreBtn = document.getElementsByClassName('button--load-more')[0];
  let nextUrl = loadMoreBtn.getAttribute('href');
  let productList = document.getElementById('product-grid');
  let paginationList = document.getElementsByClassName('pagination__list')[0];
  loadMoreBtn.addEventListener('click', function (e) {
    e.preventDefault();

    function handleResponse() {
      var parser = new DOMParser();
      window.history.pushState('', '', nextUrl);
      var nextPageHTML = parser.parseFromString(this.responseText, 'text/html');
      //console.log(nextPageHTML);
      let newProducts = nextPageHTML.getElementById('product-grid');
      productList.innerHTML += newProducts.innerHTML;
      let nextPageLoadMore = nextPageHTML.getElementsByClassName('button--load-more')[0];
      if (nextPageLoadMore) {
        let newUrl = nextPageLoadMore.getAttribute('href');
        if (newUrl) {
          nextUrl = newUrl;
          loadMoreBtn.href = newUrl;
        } else {
          loadMoreBtn.style.display = 'none';
        }
      } else {
        loadMoreBtn.style.display = 'none';
      }
      let currentLink = paginationList.querySelectorAll('.pagination__item--current')[0];
      currentLink.classList.remove('pagination__item--current');
      currentLink.setAttribute('aria-disabled', 'false');
      currentLink.setAttribute('href', currentLink.getAttribute('data-link'));
      let nextLink = currentLink.parentElement.nextSibling.firstChild;
      nextLink.classList.add('pagination__item--current');
      nextLink.setAttribute('aria-disabled', 'true');
      nextLink.removeAttribute('href');
    }
    const request = new XMLHttpRequest();
    request.addEventListener('load', handleResponse);
    //console.log(nextUrl);
    request.open('GET', nextUrl + '&section_id=template--22694769918259__product-grid', true);
    request.send();
  });
});
