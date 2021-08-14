import './sass/main.scss';
import API from './js/fetchCountries';
import countriesListTpl from './templates/countries-list.hbs';
import countryCard from './templates/country-card.hbs';

const resultContainerRef = document.querySelector('#country-card');
const inputRef = document.querySelector('#q-string');
const searchBtnRef = document.querySelector('#search-btn');

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

searchBtnRef.addEventListener('click', onClick);
window.addEventListener('keydown', e => {
  if (e.code === 'Enter') onClick();
});

function onClick() {
  API.fetchCountries(inputRef.value)
    .then(handleNotFound)
    .then(response => response.json())
    .then(countriesArray => {
      if (countriesArray.length > 10) {
        error({
          title: `Too many matches found.`,
          text: `Please enter a more specific query`,
          styling: 'brighttheme',
          delay: 3000,
        });
        return;
      }
      renderCountryCard(countriesArray);
    });
}

function renderCountryCard(country) {
  console.log(country);
  if (country.length > 1) {
    const markup = countriesListTpl(country);
    resultContainerRef.innerHTML = markup;
    return;
  }

  resultContainerRef.innerHTML = countryCard(country);
}

function handleNotFound(response) {
  if (response.status === 404) {
    error({
      title: `No mathces found`,
      text: `Make sure you enter a alphabetic symbols`,
      styling: 'brighttheme',
      delay: 3000,
    });
    return;
  }
  return response;
}
