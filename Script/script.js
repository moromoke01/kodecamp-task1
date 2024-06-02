const darkModeToggle = document.getElementById('dark-mode-toggle');
const searchInput = document.getElementById('search');
const regionFilter = document.getElementById('region-filter');
const countriesContainer = document.getElementById('countries');
const countryDetailContainer = document.getElementById('country-detail');

let countries = [];

// Fetching country data from API
const loadCountryAPI = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            countries = data;
            displayCountries(data);
        })
        .catch(error => console.error('Error fetching countries:', error));
}

// Displaying all countries
const displayCountries = countries => {
    const countriesHTML = countries.map(country => getCountryHTML(country)).join('');
    countriesContainer.innerHTML = countriesHTML;
    countryDetailContainer.innerHTML = '';
}

// Get data and set it to HTML
const getCountryHTML = country => {
    return `
        <div class="country-div" onclick="navigateToCountryDetail('${country.name.common}')">
            <img src="${country.flags.png}" alt="${country.name.common} flag" />
            <h2>${country.name.common}</h2>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
        </div>
    `;
}

// Navigate to country detail page
const navigateToCountryDetail = countryName => {
    const country = countries.find(c => c.name.common === countryName);
    if (country) {
        displayCountryDetail(country);
        history.pushState({}, '', `/countryDetail.html?name=${countryName}`);
    }
}

// Display country details
const displayCountryDetail = country => {
    const nativeName = getNativeName(country.name.nativeName);
    countryDetailContainer.innerHTML = `
        <div class="country-detail-flex">
            <div class="country-flag">
                <img src="${country.flags.png}" alt="${country.name.common} flag" />
            </div>
            <div class="country-info">
                <h2>${country.name.common}</h2>
                <span class="country-detail-grid">
                <p><strong>Native Name:</strong> ${nativeName}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Sub Region:</strong> ${country.subregion}</p>
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Top Level Domain:</strong> ${country.tld.join(', ')}</p>
                <p><strong>Currencies:</strong> ${Object.values(country.currencies).map(c => c.name).join(', ')}</p>
                <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
                </span>
            </div>
        </div>
    `;
    countriesContainer.innerHTML = '';
}

// Helper function to get the native name
const getNativeName = nativeNameObj => {
    const nativeNames = Object.values(nativeNameObj);
    return nativeNames.length > 0 ? nativeNames[0].common : 'N/A';
}

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Initial load
loadCountryAPI();

// Handle popstate for back/forward navigation
window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const countryName = params.get('name');
    if (countryName) {
        const country = countries.find(c => c.name.common === countryName);
        if (country) {
            displayCountryDetail(country);
        }
    } else {
        displayCountries(countries);
    }
});

// Search and filter functionality
const filterCountries = () => {
    const searchQuery = searchInput.value.toLowerCase();
    const region = regionFilter.value;
    const filteredCountries = countries.filter(country => {
        return (
            country.name.common.toLowerCase().includes(searchQuery) &&
            (region === '' || country.region === region)
        );
    });
    displayCountries(filteredCountries);
}

searchInput.addEventListener('input', filterCountries);
regionFilter.addEventListener('change', filterCountries);
