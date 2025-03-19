document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav(elems, { edge: 'right' });
});

const randomButton = document.getElementById('random-drink');
const popularDrinksInsert = document.getElementById('popular-drink-items');
const singleDrinkButton = document.querySelector('.single-drink-btn');
const singleDrinkInsert = document.querySelector('.single-drink-insert');
const userDrinkInput = document.getElementById('drink');

// randomButton.addEventListener('click', randomDisplay);
// singleDrinkButton.addEventListener('click', displaySingleDrink);

const singleRandomItemUrl =
  'https://www.thecocktaildb.com/api/json/v2/961249867/random.php';

const nameSearchUrl =
  'https://www.thecocktaildb.com/api/json/v2/961249867/search.php?s=';

const popularDrinksUrl = `https://www.thecocktaildb.com/api/json/v2/961249867/popular.php`;

const latestDrinkUrl =
  'https://www.thecocktaildb.com/api/json/v2/961249867/latest.php';

async function fetchProducts(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

const popularDrinks = fetchProducts(popularDrinksUrl);

window.onload = event => {
  if (document.URL.includes('random')) {
    const randomDrink = fetchProducts(singleRandomItemUrl);

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
          document.querySelector(
            '.instructions'
          ).innerHTML += `<li>${el}.</li>`;
        }
      }
    });
  } else if (document.URL.includes('drink')) {
  } else {
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
  }
};

function displaySingleDrink() {
  const userInput = userDrinkInput.value.trim().split(' ').join('&');

  // const promise = fetchProducts(nameSearchUrl + userInput);
  promise
    .then(data => {
      // singleDrinkInsert.innerHTML += data.drinks[0].strDrink;
      // localStorage.setItem('randomDrink', data.drinks[0]);
    })
    .catch(error => {
      console.error(`Could not get products: ${error}`);
    })
    .finally(() => {
      // Navigate to the new page after the API call (success or failure)
      window.location.href = `drink.html?${userInput}`;
    });
}
function displayRandomDrink() {}
function displayPopularDrinks() {}
function displayLatestDrinks() {}
function displayRelatedDrinks() {}
