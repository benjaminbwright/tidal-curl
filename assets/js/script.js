// DEPENDENCIES (DOM Elements)
// DATA / STATE / GLOBAL VARIABLES
// FUNCTIONS
function getSPF(uv) {
  if (uv > 2 && uv < 6) return 30;
  if (uv > 5 && uv < 8) return 50;
  if (uv > 7 && uv < 11) return 80;
  return 15;
}

function loadPinnedBeaches() {
  console.log("loading pinned beaches");
}

function populateBeachData(beach) {
  console.log(`Loading data for ${beach.name}`);
}

function findBeaches(search) {
  console.log(`Searching for ${search}`);
}

function getAllNOAAData(stationId = "1612340") {
  // link to data response descriptions
  // https://api.tidesandcurrents.noaa.gov/api/prod/responseHelp.html
  getNOAAData(stationId, "tide");
  getNOAAData(stationId, "wind");
}

function getNOAAData(stationId = "1612340", type, callback = console.log) {
  // https://api.tidesandcurrents.noaa.gov/api/prod/#requestResponse

  // tide data example
  // https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=20250801&end_date=20250831&station=8557863&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&application=DataAPI_Sample&format=json

  // wind data example
  // https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=20210601&end_date=20210630&station=8724580&product=wind&time_zone=lst_ldt&interval=h&units=english&application=DataAPI_Sample&format=csv

  var product = "";
  var datum = "";
  if (type === "tide") {
    product = "predictions";
    datum = "MTL";
  } else if (type === "wind") {
    product = "wind";
  }

  var baseURL = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?";
  var paramsObject = {
    date: "today",
    station: stationId,
    product, // same as product: product
    datum: "MTL",
    time_zone: "lst_ldt",
    interval: "hilo",
    units: "english",
    application: "DataAPI_Sample",
    format: "json",
  };

  var requestURL = baseURL;

  // for-of is for ARRAYS and for-in is for OBJECTS
  for (var key of Object.keys(paramsObject)) {
    if (paramsObject[key]) {
      requestURL += `${key}=${paramsObject[key]}&`;
    }
  }

  return fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      callback(data);
    });
}

function getOpenWeatherData(
  lat = 21.596175,
  lon = -158.104939,
  callback = console.log
) {
  // example
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  // default Haleiwa beach, north shore, oahu, hawai'i
  // 21.596175, -158.104939

  var baseURL = "https://api.openweathermap.org/data/2.5/weather?";
  var apiKey = "ef8910c554273a994bf8073ccd0ffdae";

  fetch(`${baseURL}lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      callback(data);
    });
}

function handlePinClick() {}
// USER INTERACTIONS
// a user submits the search form
// searchForm.addEventListener('submit', handleSubmitSearch);
// a user clicks a pinned beach or search result
// beachButton.addEventListener('click', handlePinClick);
// a user clickes data div
// expands/collapse
// a user clickes a search result

// INITIALIZATION
// load pinned beaches
loadPinnedBeaches();
// load initial beach
populateBeachData({ name: "Bondi Beach" });
// default or last searched

// test call to console.log noaa fetches
getAllNOAAData();
getOpenWeatherData();
