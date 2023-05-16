import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function cleanMarkup(element) {
  if (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}

const inputHandler = e => {
  const name = e.target.value.trim();

  if (!name) {
    cleanMarkup(countryList);
    cleanMarkup(countryInfo);
    return;
  }

  fetchCountries(name)
    .then(data => {
      console.log(data);
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }
      if (name.toLowerCase() === 'sudan') {
        const sudanData = data.filter(country =>
          country.name.official.toLowerCase().includes('republic of the sudan')
        );
        renderMarkup(sudanData);
      } else {
        renderMarkup(data);
      }
    })
    .catch(err => {
      cleanMarkup(countryList);
      cleanMarkup(countryInfo);
      Notify.failure('Oops, there is no country with that name');
    });
};

const renderMarkup = data => {
  cleanMarkup(countryList);
  cleanMarkup(countryInfo);

  if (data.length === 1) {
    const infoFragment = document.createDocumentFragment();
    const markupInfo = createInfoMarkup(data);
    infoFragment.appendChild(markupInfo);

    if (countryInfo) {
      countryInfo.appendChild(infoFragment);
    }
  } else {
    const listFragment = document.createDocumentFragment();
    const markupList = createListMarkup(data);
    listFragment.appendChild(markupList);

    if (countryList) {
      countryList.appendChild(listFragment);
    }
  }
};

const createListMarkup = data => {
  const fragment = document.createDocumentFragment();

  data.forEach(({ name, flags }) => {
    const listItem = document.createElement('li');
    const img = document.createElement('img');
    img.src = flags.svg;
    img.alt = name.official;
    img.width = 30;
    img.height = 20;
    img.classList.add('clickable-flag');
    img.addEventListener('click', () => {
      showCountryInfo(name.official);
    });
    listItem.appendChild(img);
    listItem.appendChild(document.createTextNode(name.official));

    fragment.appendChild(listItem);
  });

  return fragment;
};

const createInfoMarkup = data => {
  const container = document.createElement('div');

  data.forEach(({ name, capital, population, flags, languages }) => {
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    img.src = flags.svg;
    img.alt = name.official;
    img.width = 60;
    img.height = 40;
    h2.appendChild(img);
    h2.innerHTML += `${name.official}`;
    container.appendChild(h2);

    const p1 = document.createElement('p');
    p1.innerHTML = `<strong>Capital: </strong>${capital}`;
    container.appendChild(p1);

    const p2 = document.createElement('p');
    p2.innerHTML = `<strong>Population: </strong>${population}`;
    container.appendChild(p2);

    const p3 = document.createElement('p');
    p3.innerHTML = `<strong>Languages: </strong>${Object.values(languages)}`;
    container.appendChild(p3);
  });

  return container;
};

const showCountryInfo = officialName => {
  fetchCountries(officialName)
    .then(data => {
      if (data.length === 1) {
        renderMarkup(data);
      }
    })
    .catch(err => {
      cleanMarkup(countryInfo);
      Notify.failure('Oops, failed to fetch country information');
    });
};

searchBox.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
const resetButton = document.querySelector('[data-reset]');

const resetSearch = () => {
  cleanMarkup(countryList);
  cleanMarkup(countryInfo);
  searchBox.value = '';
};

resetButton.addEventListener('click', resetSearch);
