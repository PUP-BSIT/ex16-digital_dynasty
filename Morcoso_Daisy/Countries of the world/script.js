const search_Button = document.getElementById("search_Button");
const country_Input = document.getElementById("country_Input");
const countryDetails = document.getElementById("country_details");
const sameRegionCountries = document.getElementById("same_region_countries");

searchButton.addEventListener("click", async () => {
  const countryName = countryInput.value.trim();

  if (!countryName) {
    alert("Please enter a country name");
    return;
  }

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    if (!response.ok) {
      throw new Error("Country not found");
    }
    const countryData = await response.json();
    const country = countryData[0];

    const details = `
      <h2>Country Details - ${country.name.common}</h2>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
      <p> 
        <strong>Capital:</strong> ${
        country.capital ? country.capital[0] : "N/A"}
      </p>

      <p> 
        <strong>Region:</strong> ${country.region ? country.region :"N/A"}
      </p>

      <p> 
        <strong>Languages:</strong> ${
        country.languages ? Object.values(country.languages).join(", ") : "N/A"}
      </p>

      <p> 
        <strong>Population:</strong> ${
        country.population ? country.population.toLocaleString() : "N/A"} 
      </p>

      <p> 
        <strong>Area:</strong> ${
        country.area
          ? country.area.toLocaleString() + " square kilometers"
          : "N/A"} 
      </p>`;
    countryDetails.innerHTML = details;

    const region = country.region;
    const response2 = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
    if (!response2.ok) {
      throw new Error("Region not found");
    }
    const regionData = await response2.json();

    displaySameRegionCountries(regionData);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("An error occurred: " + error.message);
  }
});

function displaySameRegionCountries(regionData) {
  sameRegionCountries.innerHTML = `
    <h2>Countries in the Same Region (${regionData[0].region})</h2>
    <div class="region-countries">
      ${regionData.map(createSameRegionCountryHTML).join("")}
    </div>`;
  }

function createSameRegionCountryHTML(country) {
  return `
    <div class="country">
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}
      " width="100">
      <p>${country.name.common}</p>
    </div>`;
}
