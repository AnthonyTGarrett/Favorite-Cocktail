document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, { edge: 'right' });
});

let content = document.querySelector('#popular-drinks');

const randomItemUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

async function getSingleItem(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

const singleItem = getSingleItem(randomItemUrl);
console.log(singleItem);

singleItem.then(response => {
  response.drinks.forEach(element => {
    console.log(element);
  });
});

// const fetchPromise = fetch(
//   'https://www.thecocktaildb.com/api/json/v1/1/random.php'
// );

// fetchPromise.then(response => {
//   const jsonPromise = response.json();
//   jsonPromise.then(data => {
//     console.log(data.drinks[0]);
//   });
// });
