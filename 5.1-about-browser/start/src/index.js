import axios from '../node_modules/axios';
//1
// form fields
const form = document.querySelector('.form-data');
const regionNameElm = document.querySelector('.region-name');
// const apiKeyElm = document.querySelector('.api-key');

// results divs
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const results = document.querySelector('.result-container');
const usageForecast = document.querySelector('.carbon-forecast');
const usageActual = document.querySelector('.carbon-actual');
const usageIndex = document.querySelector('.carbon-index');
const fossilfuel = document.querySelector('.fossil-fuel');
const myregion = document.querySelector('.my-region');
const clearBtn = document.querySelector('.clear-btn');
const reloadBtn = document.querySelector('.reload-btn');
const resultBtn = document.getElementById('result-btns');

//6
//call the API
function generateLink(region) {
	if (region == 0) {
		return 'https://api.carbonintensity.org.uk/intensity';
	} else {
		return 'https://api.carbonintensity.org.uk/regional/regionid/' + region;
	}
}

function displayCarbonUsage(response, region) {
	if (region == 0) {
		loading.style.display = 'none';
		form.style.display = 'none';
		errors.style.display = 'none';
		myregion.textContent = "Global";
		usageForecast.innerHTML =
			response.data.data[0].intensity.forecast + ' gCO<sub>2</sub>/kWh';
		usageActual.innerHTML =
			response.data.data[0].intensity.actual + ' gCO<sub>2</sub>/kWh';
		usageIndex.textContent =
			response.data.data[0].intensity.index.toUpperCase();
		fossilfuel.textContent = "-";
		results.style.display = 'block';
	} else {
		loading.style.display = 'none';
		form.style.display = 'none';
		errors.style.display = 'none';
		myregion.textContent = 
			response.data.data[0].shortname;
		usageForecast.innerHTML =
			response.data.data[0].data[0].intensity.forecast + ' gCO<sub>2</sub>/kWh';
		usageActual.innerHTML = "-";
		usageIndex.textContent =
			response.data.data[0].data[0].intensity.index.toUpperCase();
		fossilfuel.textContent =
			response.data.data[0].data[0].generationmix[3].perc + '%';
		results.style.display = 'block';
	}
}

async function getCarbonUsage(region) {
    try {
		await axios
            .get(generateLink(region), {
                headers: {
                    'Accept': 'application/json',
                },
            })
			.then((response) => {                
				displayCarbonUsage(response, region);
			});
	} catch (error) {
		console.log(error);
		loading.style.display = 'none';
		results.style.display = 'none';
		form.style.display = 'none';
		errors.textContent = 'Sorry, we have no data for the region you have requested.';
	}
}

//5
//set up user's api key and region
function setUpUser(region) {
	// localStorage.setItem('apiKey', apiKey);
	localStorage.setItem('regionName', region);
	loading.style.display = 'block';
	errors.textContent = '';
	resultBtn.style.display = 'block';
	//make initial call
	getCarbonUsage(region);
}

//4
// handle form submission
function handleSubmit(e) {
    e.preventDefault();
    console.log('Setting up user session...');
    setUpUser(regionNameElm.value);
}

//3 initial checks
function init() {
	//if anything is in localStorage, pick it up
	// const storedApiKey = localStorage.getItem('apiKey');
	const storedRegion = localStorage.getItem('regionName');
    console.log(`Loaded region: ${storedRegion}`);
	//set icon to be generic green
	//to-do

	if (storedRegion === null) {
		//if we don't have the keys, show the form
		form.style.display = 'block';
		results.style.display = 'none';
		loading.style.display = 'none';
		resultBtn.style.display = 'none';
		errors.textContent = '';
	} else {
        //if we have saved keys/regions in localStorage, show results when they load
        loading.style.display = 'block';
		getCarbonUsage(storedRegion);
		results.style.display = 'none';
		form.style.display = 'none';
		resultBtn.style.display = 'block';
	}
};

function reset(e) {
	e.preventDefault();
	//clear local storage for region only
	localStorage.removeItem('regionName');
	init();
}

//2
form.addEventListener('submit', (e) => handleSubmit(e));
clearBtn.addEventListener('click', (e) => reset(e));
reloadBtn.addEventListener('click', () => init());

init();
