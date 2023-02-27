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
  console.log('loading pinned beaches');
}

function populateBeachData(beach) {
  console.log(`Loading data for ${beach.name}`);
}

function findBeaches(search) {
  console.log(`Searching for ${search}`);
}

function getAllNOAAData(stationId) {
  // link to data response descriptions
  // https://api.tidesandcurrents.noaa.gov/api/prod/responseHelp.html
  getNOAAData(stationId, 'tide', updateTideDataCard);
  getNOAAData(stationId, 'wind', updateWindDataCard);
}

function getNOAAData(stationId, type, callback) {
  // https://api.tidesandcurrents.noaa.gov/api/prod/#requestResponse

  // tide data example
  // https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=20250801&end_date=20250831&station=8557863&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&application=DataAPI_Sample&format=json

  // wind data example
  // https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=20210601&end_date=20210630&station=8724580&product=wind&time_zone=lst_ldt&interval=h&units=english&application=DataAPI_Sample&format=csv

  var product = '';
  var datum = '';
  if (type === 'tide') {
    product = 'predictions';
    datum = 'MTL';
  } else if (type === 'wind') {
    product = 'wind';
  }

  var baseURL = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?';
  var paramsObject = {
    date: 'today',
    station: stationId,
    product, // same as product: product
    datum: 'MTL',
    time_zone: 'lst_ldt',
    interval: 'hilo',
    units: 'english',
    application: 'DataAPI_Sample',
    format: 'json',
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

function updateTideDataCard(data) {
  var predictions = data.predictions;
  var tideDataCardEl = document.getElementById('tide');
  console.log(predictions)
  tideDataCardEl.innerHTML = `
  <h4 class="data-card-head">TIDE</h4>
  <h5>Low: ${dayjs(predictions[0].t).format('h:mm a')}</h5>
  <h5>High: ${dayjs(predictions[1].t).format('h:mm a')}</h5>
  <h5>Low: ${dayjs(predictions[2].t).format('h:mm a')}</h5>
  <h5>High: ${dayjs(predictions[3].t).format('h:mm a')}</h5>
  `;
}

function updateWindDataCard(data) {
  var timeblocks = data.data;
  var mostCurrent = timeblocks.at(-1);
  var windDataCardEl = document.getElementById('wind');
  windDataCardEl.innerHTML = `
  <h4 class="data-card-head">WIND</h4>
  <h5>Wind: ${(mostCurrent.s * 1.15078).toFixed(1)} mph</h5>
  <h5>Wind: ${mostCurrent.dr}</h5>
  `;
}

function getOpenWeatherData(lat, lon, callback) {
  // example
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  // default Haleiwa beach, north shore, oahu, hawai'i
  // 21.596175, -158.104939

  var baseURL =
    'https://api.openweathermap.org/data/3.0/onecall?exclude=hourly,daily&';
  var apiKey = '266e8073df65e7c7c339828e843f815a';

  fetch(`${baseURL}lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      callback(data);
    });
}

function updateWeatherDataCards(data) {
  console.log(data);

  // temp card
  var temp = data.current.temp;
  var tempDataCardEl = document.getElementById('temp');
  tempDataCardEl.innerHTML = `
  <h4 class="data-card-head">TEMP</h4>
  <h5>${temp}</h5>
  `;

  // uv card
  var uv = data.current.uvi;
  var uvDataCardEl = document.getElementById('uvindex');
  uvDataCardEl.innerHTML = `
  <h4 class="data-card-head">UV</h4>
  <h5>${uv}</h5>`;

  // spf card
  var spf = getSPF(uv);
  var spfDataCardEl = document.getElementById('spf');
  spfDataCardEl.innerHTML = `
  <h4 class="data-card-head">SPF</h4>
  <h5>${spf}</h5>`;
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
populateBeachData({ name: 'Bondi Beach' });
// default or last searched

// test call to console.log noaa fetches
var lat = 21.596175;
var lon = -158.104939;
var stationId = '1612340';
getAllNOAAData(stationId);
getOpenWeatherData(lat, lon, updateWeatherDataCards);
