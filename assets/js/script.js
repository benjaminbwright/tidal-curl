// DEPENDENCIES (DOM Elements)
// DATA / STATE / GLOBAL VARIABLES
// FUNCTIONS
function loadPinnedBeaches() {
  console.log('loading pinned beaches');
}

function populateBeachData(beach) {
  console.log(`Loading data for ${beach.name}`);
}

function findBeaches(search) {
  console.log(`Searching for ${search}`);
}

function getNOAATideData(stationId = '1612340') {
  // https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=20250801&end_date=20250831&station=8557863&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&application=DataAPI_Sample&format=json
  var baseURL = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?';
  var paramsObject = {
    date: 'today',
    station: stationId,
    product: 'predictions',
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
    requestURL += `${key}=${paramsObject[key]}&`;
  }

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

getNOAATideData();

function handlePinClick() {}
// USER INTERACTIONS
// a user submits the search form
searchForm.addEventListener('submit', handleSubmitSearch);
// a user clicks a pinned beach or search result
beachButton.addEventListener('click', handlePinClick);
// a user clickes data div
// expands/collapse
// a user clickes a search result

// INITIALIZATION
// load pinned beaches
loadPinnedBeaches();
// load initial beach
populateBeachData({ name: 'Bondi Beach' });
// default or last searched
