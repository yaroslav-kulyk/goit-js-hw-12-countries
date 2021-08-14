const debounce = require('lodash.debounce');

import './sass/main.scss';
import API from './js/fetchCountries';
import countriesListTpl from './templates/countries-list.hbs';
import countryCard from './templates/country-card.hbs';

const resultContainerRef = document.querySelector('#country-card');
const inputRef = document.querySelector('#q-string');

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

inputRef.addEventListener('input', debounce(onIputFinish, 500));

function onIputFinish() {
  if (inputRef.value === '') {
    return;
  }

  API.fetchCountries(inputRef.value).then(handleNotFound).then(checkNumberOfCountries);
}

function handleNotFound(response) {
  if (response.status === 404) {
    error({
      title: `No mathces found`,
      text: `Make sure you're looking a country`,
      styling: 'brighttheme',
      delay: 2500,
    });
    return;
  }

  return response.json();
}

function checkNumberOfCountries(countriesArray) {
  if (!countriesArray) {
    return;
  }

  if (countriesArray.length > 10) {
    error({
      title: `Too many matches found.`,
      text: `Please enter a more specific query`,
      styling: 'brighttheme',
      delay: 2500,
    });
    return;
  }
  renderCountryCard(countriesArray);
}

function renderCountryCard(country) {
  if (country.length > 1) {
    const markup = countriesListTpl(country);
    resultContainerRef.innerHTML = markup;
    return;
  }

  resultContainerRef.innerHTML = countryCard(country);
}
