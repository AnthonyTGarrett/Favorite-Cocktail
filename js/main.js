'use strict';

const urls = {
  random: 'https://www.thecocktaildb.com/api/json/v2/961249867/random.php',
  name: 'https://www.thecocktaildb.com/api/json/v2/961249867/search.php?s=',
  popular: `https://www.thecocktaildb.com/api/json/v2/961249867/popular.php`,
  latest: 'https://www.thecocktaildb.com/api/json/v2/961249867/latest.php',
  ingredient:
    'https://www.thecocktaildb.com/api/json/v2/961249867/filter.php?i=',
  id: 'https://www.thecocktaildb.com/api/json/v2/961249867/lookup.php?i=',
  type: 'https://www.thecocktaildb.com/api/json/v2/961249867/filter.php?a=Alcoholic',
};

function displaySingleDrink() {
  const promise = fetchProducts(urls.id + document.URL.split('?')[1]);
  console.log(promise);
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
function displayLatestDrinks() {}
function displayRelatedDrinks() {}

async function fetchProducts(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

document.addEventListener('DOMContentLoaded', function () {
  // if (!complete) {
  //   const complete = fetchProducts(urls.type);
  //   const autoCompleteData = {};

  //   complete.then(data => {
  //     complete.forEach(element => {
  //       autoCompleteData[element];
  //     });
  //   });
  // }

  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, { edge: 'right' });

  if (document.URL.includes('random')) {
    displayRandomDrink();
  } else if (document.URL.includes('drink')) {
    displaySingleDrink();
    displayRelatedDrinks();
  } else if (
    !document.URL.includes('random') ||
    !document.URL.includes('drink') ||
    !document.URL.includes('about')
  ) {
    displayPopularDrinks();
  }
});
