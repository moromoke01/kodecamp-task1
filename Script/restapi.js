const searchInput = document.getElementById('search');
const regionFilter = document.getElementById('region-filter');
const darkModeToggle = document.getElementById('dark-mode-toggle');

let countries = []; // Global variable to store fetched country data

// Fetching country data from API
const loadCountryAPI = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            countries = data; // Store data in the global variable
            displayCountries(countries); // Display all countries initially
            console.log(countries)``
        })
        .catch(error => console.error('Error fetching countries:', error));
}



// Displaying all countries
const displayCountries = countries => {
    const countriesHTML = countries.map(country => getCountry(country)).join('');
    
    // Displaying div to HTML
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML;

    // Add click event listener to each country div
    document.querySelectorAll('.country-div').forEach(div => {
        div.addEventListener('click', () => {
            const countryName = div.dataset.country;
            window.location.href = `countryDetail.html?name=${countryName}`;
        });
    });
}

// Get data and set it to HTML
const getCountry = country => {
    return `
        <div class="country-div" data-country="${country.name.common}">
            <img src="${country.flags.png}" alt="${country.name.common} flag" />
            <h2>${country.name.common}</h2>
            <hr>
            <span class="country-info">
                <h4>Population: ${country.population}</h4>
                <h4>Region: ${country.region}</h4>
                <h4>Capital: ${country.capital}</h4>
            </span>
        </div>
    `;
}

// Search filter function
function filterCountries() {
    const searchQuery = searchInput.value.toLowerCase();
    const region = regionFilter.value;
    const filteredCountries = countries.filter(country => {
        return (country.name.common.toLowerCase().includes(searchQuery) && 
                (region === '' || country.region === region));
    });
    displayCountries(filteredCountries);
}

// Event listeners
searchInput.addEventListener('input', filterCountries);
regionFilter.addEventListener('change', filterCountries);
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Initial load
loadCountryAPI();
