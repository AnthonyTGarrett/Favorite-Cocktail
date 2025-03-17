document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, { edge: 'right' });
});

const randomButton = document.querySelector('#random-drink');

randomButton.addEventListener('click', () => {
  window.location.href = 'drink.html';
});
randomButton.addEventListener('click', () => {
  console.log('Hello World');
}));

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

// const promise = fetchProducts(singleRandomItemUrl);
// promise
//   .then(data => {
//     console.log(data.drinks[0]);
//   })
//   .catch(error => {
//     console.error(`Could not get products: ${error}`);
//   });

function randomDisplay() {
  const promise = fetchProducts(singleRandomItemUrl);
  console.log(promise);

  promise
    .then(data => {
      console.log(data.drinks[0]);
    })
    .catch(error => {
      console.error(`Could not get products: ${error}`);
    });
}
