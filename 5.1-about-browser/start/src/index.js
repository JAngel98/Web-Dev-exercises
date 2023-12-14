import axios from '../node_modules/axios';
//1
// form fields
const form = document.querySelector('.form-data');
const region = document.querySelector('.region-name');
const apiKey = document.querySelector('.api-key');

// results divs
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const results = document.querySelector('.result-container');
const usage = document.querySelector('.carbon-usage');
const fossilfuel = document.querySelector('.fossil-fuel');
const myregion = document.querySelector('.my-region');
const clearBtn = document.querySelector('.clear-btn');

//6
//call the API
async function displayCarbonUsage(apiKey, region) {
	try {
		await axios
			.get(`https://api.github.com/users/${apiKey}/repos`, {
				params: {
					sort: region,
				},
				// headers: {
				// 	'auth-token': apiKey,
				// },
			})
			.then((response) => {
				// let CO2 = Math.floor(response.data.data.carbonIntensity);
                // let names = response;
				//calculateColor(CO2);
                
				loading.style.display = 'none';
				form.style.display = 'none';
				myregion.textContent = apiKey;
				// usage.textContent =
				// 	Math.round(response.data.data.carbonIntensity) + ' grams (grams C02 emitted per kilowatt hour)';
                usage.textContent = response.data[0].url;
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
function setUpUser(apiKey, regionName) {
	localStorage.setItem('apiKey', apiKey);
	localStorage.setItem('regionName', regionName);
	loading.style.display = 'block';
	errors.textContent = '';
	clearBtn.style.display = 'block';
	//make initial call
	displayCarbonUsage(apiKey, regionName);
}

//4
// handle form submission
function handleSubmit(e) {
    e.preventDefault();
    console.log('Setting up user session...');
    setUpUser(apiKey.value, region.value);
}

//3 initial checks
function init() {
	//if anything is in localStorage, pick it up
	const storedApiKey = localStorage.getItem('apiKey');
	const storedRegion = localStorage.getItem('regionName');

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

init();
