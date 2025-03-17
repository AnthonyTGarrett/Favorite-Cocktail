document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, { edge: 'right' });
});

document.querySelector('#random-drink').addEventListener('click', getFetch);
let content = document.querySelector('#popular-drinks');

const randomItemUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

function getFetch(url) {
  content.innerHTML = '';
  const choice = document.querySelector('#choice').value;

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      if (!data.length == 0) {
        data.forEach(el => {
          content.innerHTML += `<div class="card">
                <div class="card-image">
                  <img src="images/sample-1.jpg" />
                  <span class="card-title">Card Title</span>
                </div>
                <div class="card-content">
                  <p>
                    I am a very simple card. I am good at containing small bits
                    of information. I am convenient because I require little
                    markup to use effectively.
                  </p>
                </div>
                <div class="card-action">
                  <a href="#">This is a link</a>
                </div>
              </div>`;
        });
      } else {
        content.innerHTML = `<p class="text-red-700 text-base text-2xl text-center py-2">
          No results found
        </p>`;
      }
    })
    .catch(err => {
      console.log(`error ${err}`);
    });
}
