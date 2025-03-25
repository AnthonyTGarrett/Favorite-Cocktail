'use strict';

const urls = {
  random: 'https://www.thecocktaildb.com/api/json/v2/961249867/random.php',
  name: 'https://www.thecocktaildb.com/api/json/v2/961249867/search.php?s=',
  popular: `https://www.thecocktaildb.com/api/json/v2/961249867/popular.php`,
  latest: 'https://www.thecocktaildb.com/api/json/v2/961249867/latest.php',
  id: 'https://www.thecocktaildb.com/api/json/v2/961249867/lookup.php?i=',
};

function displaySingleDrink() {
  const promise = fetchProducts(urls.id + document.URL.split('?')[1]);
  promise.then(data => {
    const ingredientList = document.querySelector('.ingredient-list');

    document.querySelector('.random-header').textContent =
      data.drinks[0].strDrink;
    document
      .querySelector('.single-image')
      .setAttribute('src', data.drinks[0].strDrinkThumb);
    for (let i = 1; i < 15; i++) {
      if (data.drinks[0]['strIngredient' + i]) {
        ingredientList.innerHTML += `<li>${
          data.drinks[0]['strIngredient' + i]
        } ${data.drinks[0]['strMeasure' + i]}</li>`;
      }
    }

    for (let el of data.drinks[0].strInstructions.split('.')) {
      if (el) {
        document.querySelector('.instructions').innerHTML += `<li>${el}.</li>`;
      }
    }
  });
}
function displayRandomDrink() {
  const randomDrink = fetchProducts(urls.random);

  randomDrink.then(data => {
    const ingredientList = document.querySelector('.ingredient-list');

    document.querySelector('.random-header').textContent =
      data.drinks[0].strDrink;
    document
      .querySelector('.random-image')
      .setAttribute('src', data.drinks[0].strDrinkThumb);
    for (let i = 1; i < 15; i++) {
      if (data.drinks[0]['strIngredient' + i]) {
        ingredientList.innerHTML += `<li>${
          data.drinks[0]['strIngredient' + i]
        } ${data.drinks[0]['strMeasure' + i]}</li>`;
      }
    }

    for (let el of data.drinks[0].strInstructions.split('.')) {
      if (el) {
        document.querySelector('.instructions').innerHTML += `<li>${el}.</li>`;
      }
    }
  });
}
function displayPopularDrinks() {
  const popularDrinksInsert = document.getElementById('popular-drink-items');
  const popularDrinks = fetchProducts(urls.popular);

  popularDrinks
    .then(data => {
      data.drinks.forEach(element => {
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
                  <div class="card-action" data-target="${element.idDrink}">
                    <a href="drink.html?${element.idDrink}" class="single-link">Full Recipe</a>
                  </div>
            </div>
          </div>
  `;
      });
    })
    .catch(error => {
      console.error(`Could not get products: ${error}`);
    });
}

function displaySearchDrinks() {
  const searchDrinksInsert = document.getElementById('search-drink-items');
  let urlParams = new URLSearchParams(window.location.search).get('cocktail');
  urlParams = urlParams.split(' ').join('+');

  const searchDrinks = fetchProducts(urls.name + urlParams);

  searchDrinks
    .then(data => {
      if (data.drinks) {
        data.drinks.forEach(element => {
          searchDrinksInsert.innerHTML += `
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
                  <div class="card-action" data-target="${element.idDrink}">
                    <a href="drink.html?${element.idDrink}" class="single-link">Full Recipe</a>
                  </div>
            </div>
          </div>
  `;
        });
      } else {
        searchDrinksInsert.innerHTML += `
        <h3>No results found.</h3>
        `;
      }
    })
    .catch(error => {
      console.error(`Could not get products: ${error}`);
    });
}

function displayLatestDrinks() {
  const latestDrinksInsert = document.getElementById('latest-drink-items');
  const latestDrinks = fetchProducts(urls.latest);

  latestDrinks
    .then(data => {
      // const partialArr = data.drinks.splice(0, 9);
      data.drinks.forEach(element => {
        latestDrinksInsert.innerHTML += `
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
                <div class="card-action" data-target="${element.idDrink}">
                  <a href="drink.html?${element.idDrink}" class="single-link">Full Recipe</a>
                </div>
          </div>
        </div>
`;
      });
    })
    .catch(error => {
      console.error(`Could not get products: ${error}`);
    });
}

async function fetchProducts(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, { edge: 'right' });

  if (document.URL.includes('random')) {
    displayRandomDrink();
  } else if (document.URL.includes('drink')) {
    displaySingleDrink();
  } else if (
    !document.URL.includes('random') &&
    !document.URL.includes('drink') &&
    !document.URL.includes('about') &&
    !document.URL.includes('popular') &&
    !document.URL.includes('search')
  ) {
    displayLatestDrinks();
  } else if (document.URL.includes('search')) {
    displaySearchDrinks();
  } else if (document.URL.includes('popular')) {
    displayPopularDrinks();
  }
});
