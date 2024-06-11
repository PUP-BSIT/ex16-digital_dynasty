function search_country() {
  const country_name = document.getElementById("country_input").value.trim();
  if (!country_name) {
    document.getElementById("country_details").innerHTML =
      "<p>Please enter a country name.</p>";
    document.getElementById("same_region_countries").innerHTML = "";
    document.getElementById("new_country_details").innerHTML = "";
    return;
  }

  fetch("https://restcountries.com/v3.1/name/" + country_name)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then(function (country_data) {
      let country = country_data[0];
      let details = `
            <h2>Country Details - ${country.name.common}</h2>
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}"
                     " width="100">
            <p><strong>Area:</strong> ${
              country.area
                ? country.area.toLocaleString() + " square kilometers"
                : "N/A"
            }</p>
            <p><strong>Population:</strong> ${
              country.population ? country.population.toLocaleString() : "N/A"
            }</p>
            <p><strong>Region:</strong> ${
              country.region ? country.region : "N/A"
            }</p>
            <p><strong>Capital:</strong> ${
              country.capital ? country.capital[0] : "N/A"
            }</p>
            <p><strong>Currency:</strong> ${
              country.currencies
                ? Object.values(country.currencies).join(", ")
                : "N/A"
            }</p>
            <p><strong>Calling Code:</strong> ${
              country.callingCodes ? country.callingCodes[0] : "N/A"
            }</p>
            <p><strong>Timezones:</strong> ${
              country.timezones ? country.timezones.join(", ") : "N/A"
            }</p>
            <p><strong>Native Name:</strong> ${
              country.name.nativeName
                ? Object.values(country.name.nativeName).join(", ")
                : "N/A"
            }</p>
            <p><strong>Official Languages:</strong> ${
              country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"
            }</p>
          `;
      document.getElementById("country_details").innerHTML = details;

      return fetch("https://restcountries.com/v3.1/region/" + country.region);
    })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Region not found");
      }
      return response.json();
    })
    .then(function (region_data) {
      let region = region_data[0].region;
      let same_region_countries_list = region_data
        .map(function (c) {
          return `
              <div class="country-card">
                <img src="${c.flags.svg}" alt="Flag of ${c.name.common}"
                 width="50">
                <p>${c.name.common}</p>
              </div>`;
        })
        .join("");
      document.getElementById("same_region_countries").innerHTML = `
            <h2>Countries in the Same Region (${region})</h2>
            <div class="country-list">${same_region_countries_list}</div>
          `;
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
      document.getElementById("country_details").innerHTML =
        "<p>An error occurred: " + error.message + "</p>";
      document.getElementById("same_region_countries").innerHTML = "";
      document.getElementById("new_country_details").innerHTML = "";
    });
}
