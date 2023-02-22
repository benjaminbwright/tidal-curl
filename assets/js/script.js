// DEPENDENCIES (DOM Elements)
// DATA / STATE / GLOBAL VARIABLES
// FUNCTIONS
function loadPinnedBeaches() {
  console.log("loading pinned beaches");
}

function populateBeachData(beach) {
  console.log(`Loading data for ${beach.name}`);
}

function findBeaches(search) {
  console.log(`Searching for ${search}`);
}

function handlePinClick() {}
// USER INTERACTIONS
// a user submits the search form
searchForm.addEventListener("submit", handleSubmitSearch);
// a user clicks a pinned beach or search result
beachButton.addEventListener("click", handlePinClick);
// a user clickes data div
// expands/collapse
// a user clickes a search result

// INITIALIZATION
// load pinned beaches
loadPinnedBeaches();
// load initial beach
populateBeachData({ name: "Bondi Beach" });
// default or last searched
