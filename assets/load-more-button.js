document.addEventListener('DOMContentLoaded', function () {
  let loadMoreBtn = document.getElementsByClassName('button--load-more')[0];
  let nextUrl = loadMoreBtn.getAttribute('href');
  let productList = document.getElementById('product-grid');
  let paginationList = document.getElementsByClassName('pagination__list')[0];
  loadMoreBtn.addEventListener('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: nextUrl,
      type: 'GET',
      dataType: 'html',
      success: function (nextPage) {
        window.history.pushState('', '', nextUrl);
        let newProducts = $(nextPage).find('#product-grid');
        productList.innerHTML += newProducts.html();
        let newUrl = $(nextPage).find('.button--load-more').attr('href');
        if (newUrl) {
          nextUrl = newUrl;
          loadMoreBtn.href = newUrl;
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
      },
    });
  });
});
