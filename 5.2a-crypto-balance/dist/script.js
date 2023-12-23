//Banner
const logoElm = document.getElementById('logo');
const contractName = document.getElementById('crypto-name');

const form = document.getElementById('form-data');
const resultContainer = document.getElementById('result-container');
const error = document.getElementById('error-data');
const errorContainer = document.getElementById('error-container');
const loadingElm = document.getElementById('loading');

const apiKeyElm = document.getElementById('api-key');
const wAddressElm = document.getElementById('wallet-address');
const balanceElm = document.getElementById('balance');
const currencyElm = document.getElementById('currency');
const rateElm = document.getElementById('rate');
const getInfoBtn = document.getElementById('get-info');
const userWallet = document.getElementById('user-wallet');
const chains = document.getElementById('chains');

const changeWalletBtn = document.getElementById('change-wallet-btn');
const refreshBalanceBtn = document.getElementById('refresh-balance-btn');
const resutlBtns = document.getElementById('result-btns');

let chainList = [];
let chainName = "";

async function getBalance(apiKey, walletAddress) {
    try {
        await axios
            .get(`https://api.covalenthq.com/v1/${chainName}/address/${walletAddress}/balances_v2/?`, {
                headers: {
                    'Content-type': 'application/json',
                },
                auth: {
                    username: apiKey,
                },
            })
            .then((response) => {
                const balance = response.data.data.items[0].balance;
                const decimals = response.data.data.items[0].contract_decimals;
                const symbol = response.data.data.items[0].contract_ticker_symbol;
                const quote = response.data.data.items[0].quote;
                const currency = response.data.data.quote_currency;
                const rate = response.data.data.items[0].quote_rate;
                const rate24h = response.data.data.items[0].quote_rate_24h;
                const rateChange = rate - rate24h;
                const rateChangePt = (rateChange/rate24h) * 100;

                logoElm.setAttribute('src', response.data.data.items[0].logo_url);
                contractName.innerText = response.data.data.items[0].contract_name;

                balanceElm.innerText = balance / Math.pow(10, decimals) + ' ' + symbol;
                currencyElm.innerText = quote.toFixed(2) + ' ' + currency;
                rateElm.innerText = rate + ' ' + currency + ' (' + rateChangePt.toFixed(2) + '%)';
                userWallet.innerText = walletAddress;

                loadingElm.style.display = 'none';
                errorContainer.style.display = 'none';
                resultContainer.style.display = 'block';

                // console.log(response);
            });

    } catch (e) {
        loadingElm.style.display = 'none';
        errorContainer.style.display = 'block';
        resultContainer.style.display = 'none';
        
        error.innerText = e.response.data.error_message;
        console.log(e);
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    localStorage.setItem('api-key', apiKeyElm.value);
    localStorage.setItem('wallet', wAddressElm.value);
    localStorage.setItem('chain', chainName);

    init();
})

refreshBalanceBtn.addEventListener('click', init);

changeWalletBtn.addEventListener('click', reset);

apiKeyElm.addEventListener('input', () => {
    getAllChains(apiKeyElm.value, chainName);
})

chains.addEventListener('change', (e) => {
    chainName = chains.value;
})

async function getAllChains (apiKey, chain) {
    try {
        await axios
            .get(`https://api.covalenthq.com/v1/chains/?`, {
                headers: {
                    'Content-type': 'application/json',
                },
                auth: {
                    username: apiKey,
                },
            })
            .then((response) => {
                const items = response.data.data.items.length;
                chainList = response.data.data.items;

                sortChainByName();

                for (let i = 0; i < items; i++) {
                    let opt = document.createElement('option');
                    opt.value =chainList[i].name;
                    opt.innerText = chainList[i].label;
                    if (chain === chainList[i].name) {
                        opt.setAttribute('selected', '');
                    }
                    chains.append(opt);
                }
            });

    } catch (e) {
        errorContainer.style.display = 'block';        
        error.innerText = e.response.data.error_message;
        console.log(e);
    }
}

function sortChainByName() {
    chainList.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
}

function reset() {
    localStorage.removeItem('wallet');
    init();
}

function init() {
    const storedApiKey = localStorage.getItem('api-key');
    const storedWallet = localStorage.getItem('wallet');
    const storedChain = localStorage.getItem('chain');
    chainName = storedChain;

    apiKeyElm.value = storedApiKey;
    getAllChains(storedApiKey, chainName);

    if (storedApiKey === null || storedWallet === null) {
        form.style.display = 'block';
        loadingElm.style.display = 'none';
        resultContainer.style.display = 'none';
        errorContainer.style.display = 'none'
        resutlBtns.style.display = 'none';
    } else {
        loadingElm.style.display = 'block';
        resultContainer.style.display = 'none';
        errorContainer.style.display = 'none';
        resutlBtns.style.display = 'block';
        getBalance(storedApiKey, storedWallet);
        form.style.display = 'none';
    }
}

init();