
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { result } from 'lodash';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('country-list'),
  countryInfo: document.querySelector('.country-info'),
};


if(trimValue !== '') {
    fetchCountries(trimValue).then(result => {
        if(result.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (result.length === 0) {
            Notiflix.Notify.failure("Oops, there is no country with that name")
        } else if (result.length >= 2 && result.length <= 10) {
            renderCountryList(result);
        } else if (result.length === 1) {
            renderCountryInfo(result);
        }
    })
}
}, DEBOUNCE_DELAY));

function renderCountryList (country) {
    const markup = country.map(countries => {
        return `<li>
        <img src="${countries.flags.svg}" alt="Flag of ${countries.name.official}" width= "30" hight="20">
        <b>${countries.name.official}</b>
        </li>`;
    }).join('');
    refs.countryList.innerHTML = markup;
};

function renderCountryInfo (countries) {
    const markup = countries.map(country => {
        return `<img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
        <b>${country.name.official}</b>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${Object.values(country.languages)}</p>`
        }).join('');
        refs.countryInfo.innerHTML = markup;
} 

function cleanHtml () {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
};

