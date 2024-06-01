const darkModeToggle = document.getElementById('dark-mode-toggle');

// Function to fetch country data by name
const fetchCountryByName = (name) => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(res => res.json())
        .then(data => displayCountryDetails(data[0]))
        .catch(error => console.error('Error fetching country details:', error));
}

// Function to display country details
const displayCountryDetails = (country) => {
    const detailsContainer = document.getElementById('country-details');
    detailsContainer.innerHTML = `
    <div class="country-detail-flex">
      <div class="country-flag">
        
        <img src="${country.flags.png}" alt="${country.name.common} flag" />
     </div>
        <div class="country-info">
           <h2>${country.name.common}</h2>
           <span class="country-detail-grid">
            <p><strong>Native Name:</strong> ${country.name.nativeName}</p>
            <p><strong>Population:</strong> ${country.population}</p>
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
}

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Get country name from query parameters
const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('name');

// Fetch and display country details
if (countryName) {
    fetchCountryByName(countryName);
}
