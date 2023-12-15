// import axios from '../node_modules/axios';
//1
// form fields
const form = document.querySelector('.form-data');
const regionNameElm = document.querySelector('.region-name');
const apiKeyElm = document.querySelector('.api-key');

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

//6
//call the API
async function displayCarbonUsage(apiKey, region) {
    try {
		await axios
            .get('https://api.carbonintensity.org.uk/intensity', {
                // params: {
                //     countryCode: region,
                //     zone: 'CU',
                // },
                headers: {
                    'Accept': 'application/json',
                },
            })
			.then((response) => {
				// let CO2 = Math.floor(response.data.data.carbonIntensity);
                // console.log(response);
				//calculateColor(CO2);
                
				loading.style.display = 'none';
				form.style.display = 'none';
                errors.style.display = 'none';
				myregion.textContent = region;
				usageForecast.innerHTML =
					response.data.data[0].intensity.forecast + ' grams/kWh CO<sub>2</sub>';
                usageActual.innerHTML =
					response.data.data[0].intensity.actual + ' grams/kWh CO<sub>2</sub>';
                usageIndex.textContent =
					response.data.data[0].intensity.index.toUpperCase();
				// fossilfuel.textContent =
				// 	response.data.data.fossilFuelPercentage.toFixed(2) +
				// 	'% (percentage of fossil fuels used to generate electricity)';
				results.style.display = 'block';
			});
	} catch (error) {
		console.log(error);
		loading.style.display = 'none';
		results.style.display = 'none';
		errors.textContent = 'Sorry, we have no data for the region you have requested.';
	}
}

//5
//set up user's api key and region
function setUpUser(apiKey, region) {
	localStorage.setItem('apiKey', apiKey);
	localStorage.setItem('regionName', region);
	loading.style.display = 'block';
	errors.textContent = '';
	clearBtn.style.display = 'block';
	//make initial call
	displayCarbonUsage(apiKey, region);
}

//4
// handle form submission
function handleSubmit(e) {
    e.preventDefault();
    console.log('Setting up user session...');
    setUpUser(apiKeyElm.value, regionNameElm.value);
}

//3 initial checks
function init() {
	//if anything is in localStorage, pick it up
	const storedApiKey = localStorage.getItem('apiKey');
	const storedRegion = localStorage.getItem('regionName');
    console.log(`Loaded apiKey: ${storedApiKey} & region: ${storedRegion}`);
	//set icon to be generic green
	//to-do

	if (storedApiKey === null || storedRegion === null) {
		//if we don't have the keys, show the form
		form.style.display = 'block';
		results.style.display = 'none';
		loading.style.display = 'none';
		clearBtn.style.display = 'none';
		errors.textContent = '';
	} else {
        //if we have saved keys/regions in localStorage, show results when they load
        displayCarbonUsage(storedApiKey, storedRegion);
		results.style.display = 'none';
		form.style.display = 'none';
		clearBtn.style.display = 'block';
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
