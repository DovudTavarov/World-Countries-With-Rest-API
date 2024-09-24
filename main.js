const totalCountEl = document.getElementById("total-count");
const pageCountEl = document.getElementById("page-count");
const searchEl = document.getElementById("search");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const countPage = document.querySelector(".counter");
const countriesListEl = document.querySelector(".countries");
const btnCont = document.querySelectorAll(".page-link");
// ------Modal-------
const myModal = new bootstrap.Modal("#myModal");
const modalHead = document.querySelector(".modal-title");
const modalBody = document.querySelector(".modal-body");
// ------URL-------
const url = "https://restcountries.com/v3.1/all";

function getFetch() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allCountries = data;
      getCountries(data);
      totalCountries(data);
    })
    .catch((error) => console.log(error));
}

let counter = 1;

let allCountries = [];

getFetch();

let currentPage = 1;
const countriesPerPage = 25;

function getCountries(data) {
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const countriesToDisplay = data.slice(startIndex, endIndex);

  countriesListEl.innerHTML = "";
  countriesToDisplay.forEach((country) => {
    countryInfo = ` <div class="single-country">
                    <img src="${country.flags.svg}"" alt="country flag" />
                    <div><strong>${country.name.common}</strong></div>
                    <div><b>Cap:</b>${country.capital}</div>
                    <div><b>Pop:</b>${country.population}</div>
                    <div><button onclick="modalBtn('${country.name.common}')" class="country-btn">More...</button></div>
                    </div>`;
    countriesListEl.innerHTML += countryInfo;
  });

  nextBtn.disabled = currentPage === 1;
  prevBtn.disabled = endIndex >= data.length;
}

function getAllCountries(allCountries) {
  countriesListEl.innerHTML = "";
  allCountries.forEach((country) => {
    countryInfo = ` <div class="single-country">
                    <img src="${country.flags.svg}"" alt="country flag" />
                    <div><strong>${country.name.common}</strong></div>
                    <div><b>Cap:</b>${country.capital}</div>
                    <div><b>Pop:</b>${country.population}</div>
                    <div><button onclick="modalBtn('${country.name.common}')" class="country-btn">More...</button></div>
                    </div>`;
    countriesListEl.innerHTML += countryInfo;
  });
}

function totalCountries(data) {
  totalCountEl.innerHTML = `${data.length} countries`;
}

searchEl.addEventListener("keyup", (event) => {
  const value = event.target.value.trim().toLowerCase();
  let filteredCountries = [];
  if (value !== "") {
    filteredCountries = allCountries.filter((country) => {
      return country.name.common.toLowerCase().includes(value);
    });
    getAllCountries(filteredCountries);
  } else {
    getCountries(allCountries);
  }
});

nextBtn.addEventListener("click", () => {
  searchEl.value = "";
  if (currentPage * countriesPerPage < allCountries.length) {
    currentPage++;
    counter++;
    countPage.innerHTML = counter;
    getCountries(allCountries);
  }
});

prevBtn.addEventListener("click", () => {
  searchEl.value = "";
  if (currentPage > 1) {
    currentPage--;
    counter--;
    countPage.innerHTML = counter;
    getCountries(allCountries);
  }
});

function modalBtn(name) {
  myModal.show();
  modalHead.innerHTML = "";
  modalBody.innerHTML = "";
  for (let country of allCountries) {
    modalTitle = `<h1 class="modal-title fs-5" id="exampleModalLabel">
                ${country.name.common}
              </h1>`;
    modalContent = `<img width=200px src="${country.flags.svg}"" alt="country flag" />
                    <div><strong>Official name:</strong> ${country.name.official}</div>
                    <div><b>Capital:</b> ${country.capital}</div>
                    <div><b>Population:</b> ${country.population}</div>
                    <div><b>Region:</b> ${country.region}</div>
                    <div><b>Start Of week:</b> ${country.startOfWeek}</div>
                    <div><b>Timezones:</b> ${country.timezones}</div>`;
    if (name === country.name.common) {
      modalHead.innerHTML = modalTitle;
      modalBody.innerHTML = modalContent;
    }
  }
}
