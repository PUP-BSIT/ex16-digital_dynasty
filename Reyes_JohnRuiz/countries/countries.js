function searchCountry() {
    var countryName = document.getElementById('countryInput').value.trim();
  
    if (!countryName) {
      document.getElementById('countryDetails').innerHTML = '<p>Please enter a country name.</p>';
      document.getElementById('sameRegionCountries').innerHTML = '';
      return;
    }
  
    fetch('https://restcountries.com/v3.1/name/' + countryName)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Country not found');
        }
        return response.json();
      })
      .then(function(countryData) {
        var country = countryData[0];
        var details = `
            <h2>Country Details - ${country.name.common}</h2>
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="100">
            <p><strong>Area:</strong> ${country.area ? country.area.toLocaleString() + ' square kilometers' : 'N/A'}</p>
            <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <p><strong>Subregion:</strong> ${country.subregion ? country.subregion : 'N/A'}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Timezones:</strong> ${country.timezones ? country.timezones.join(', ') : 'N/A'}</p>
          `;
        document.getElementById('countryDetails').innerHTML = details;
  
        return fetch('https://restcountries.com/v3.1/region/' + country.region);
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Region not found');
        }
        return response.json();
      })
      .then(function(regionData) {
        var region = regionData[0].region;
        var sameRegionCountriesList = regionData.map(function(c) {
          return `
            <div style="display: inline-block; margin: 10px; text-align: center;">
              <img src="${c.flags.svg}" alt="Flag of ${c.name.common}" width="50">
              <p>${c.name.common}</p>
            </div>
          `;
        }).join('');
        document.getElementById('sameRegionCountries').innerHTML = `
          <h2>Countries in the Same Region (${region})</h2>
          <div>${sameRegionCountriesList}</div>
        `;
      })
      .catch(function(error) {
        console.error('Error fetching data:', error);
        document.getElementById('countryDetails').innerHTML = '<p>An error occurred: ' + error.message + '</p>';
        document.getElementById('sameRegionCountries').innerHTML = '';
      });
  }