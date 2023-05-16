import Notiflix from 'notiflix';
const COUNTRY_PATH = 'https://restcountries.com/v3.1/name';

export function fetchCountries(name) {
  return new Promise((resolve, reject) => {
    const fields = 'name,capital,population,flags,languages';
    const endpoint = `${COUNTRY_PATH}/${name}?fields=${fields}`;
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          reject(`Error code ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  });
}
