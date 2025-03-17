document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, { edge: 'right' });
});

const randomButton = document.querySelector('#random-drink');

randomButton.addEventListener('click', randomDisplay);

const singleRandomItemUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const nameSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

async function fetchProducts(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

function randomDisplay() {
  const promise = fetchProducts(singleRandomItemUrl);
  promise
    .then(data => {
      console.log(data.drinks[0]);
      document.querySelector('#items').innerHTML = '<h1>Trial</h1>';
    })
    .catch(error => {
      console.error(`Could not get products: ${error}`);
    })
    .finally(() => {
      // Navigate to the new page after the API call (success or failure)
      window.location.href = 'drink.html';
    });
}
