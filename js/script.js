document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, { edge: 'right' });
});

const randomButton = document.querySelector('#random-drink');
const popularDrinksInsert = document.getElementById('popular-drink-items');

// randomButton.addEventListener('click', randomDisplay);

const singleRandomItemUrl =
  'https://www.thecocktaildb.com/api/json/v2/961249867/random.php';
const nameSearchUrl =
  'https://www.thecocktaildb.com/api/json/v2/961249867/search.php?s=';

const popularDrinksUrl = `https://www.thecocktaildb.com/api/json/v2/961249867/popular.php`;

async function fetchProducts(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

const popularDrinks = fetchProducts(popularDrinksUrl);

popularDrinks
  .then(data => {
    const partialArr = data.drinks.splice(0, 9);
    partialArr.forEach(element => {
      popularDrinksInsert.innerHTML += `
      <div class="col s12 m6 l4">
        <div class="card hoverable">
            <div class="card-image">
              <img src="${element.strDrinkThumb}" />
              <span class="card-title">${element.strDrink}</span>
                </div>
                <div class="card-content">
                  <p>
                    Glass: ${element.strGlass}
                  </p>
                  <p>
                    Alcohol: ${element.strIngredient1}
                  </p>
                  <p>
                    Type: ${element.strAlcoholic}
                  </p>
                </div>
                <div class="card-action">
                  <a href="#">Full Recipe</a>
                </div>
          </div>
        </div>
      `;
    });
  })
  .catch(error => {
    console.error(`Could not get products: ${error}`);
  });

// function randomDisplay() {
//   const promise = fetchProducts(singleRandomItemUrl);
//   promise
//     .then(data => {
//       console.log(data.drinks[0]);
//       document.querySelector('#items').innerHTML = '<h1>Trial</h1>';
//     })
//     .catch(error => {
//       console.error(`Could not get products: ${error}`);
//     })
//     .finally(() => {
//       // Navigate to the new page after the API call (success or failure)
//       window.location.href = 'drink.html';
//     });
// }
