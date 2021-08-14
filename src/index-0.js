// fetch('https://restcountries.eu/rest/v2/all')
//   .then(r => r.json())
//   .then(data => console.log(data));

// fetch('https://restcountries.eu/rest/v2/name/sw')
//   .then(r => r.json())
//   .then(data => console.log(data));

const inputRef = document.querySelector('#q-string');
const searchBtnRef = document.querySelector('#search-btn');
const countryRef = document.querySelector('#country-card');

// inputRef.addEventListener('input', e => console.log(e));
// searchBtnRef.addEventListener('click', search);
// window.addEventListener('keydown', e => {
//   if (e.code === 'Enter') {
//     search(inputRef.value);
//   }
// });

allIn();
console.log(allIn());

function allIn() {
  fetch(`https://restcountries.eu/rest/v2/na1me/sw`)
    .then(r => r.json())
    .then(parseCountry)
    .then(data => console.log(data));
}

function parseCountry(countries) {
  countries.forEach(({ name, capital, population, languages }) => {
    // console.log(name, capital, population, languages);
    return { name, capital, population, languages };
  });
}

// function search() {
//   const country = fetchCountry(inputRef.value);
//   renderCountry();
// }

// function fetchCountry(name) {
//   fetch(`https://restcountries.eu/rest/v2/name/${name}`)
//     .then(r => r.json())
//     .then(data => console.log(data));
// }

// function renderCountry({ name, capital, population, languages }) {
//   countryRef.innerHTML = `
//   <ul>
//     <li>${name}</li>
//   </ul>
//   `;
// }
