//Banner
const logoElm = document.getElementById('logo');
const contractName = document.getElementById('crypto-name');

const form = document.getElementById('form-data');

const apiKeyElm = document.getElementById('api-key');
const wAddressElm = document.getElementById('wallet-address');
const balanceElm = document.getElementById('balance');
const currencyElm = document.getElementById('currency');
const rateElm = document.getElementById('rate');
const getInfoBtn = document.getElementById('get-info');
const userWallet = document.getElementById('user-wallet');

async function getBalance(apiKey, walletAddress) {
    try {
        await axios
            .get(`https://api.covalenthq.com/v1/btc-mainnet/address/${walletAddress}/balances_v2/?`, {
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

                console.log(response);
            });

    } catch (error) {
        console.log(error);
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    localStorage.setItem('api-key', apiKeyElm.value);
    localStorage.setItem('wallet', wAddressElm.value);
    getBalance(apiKeyElm.value, wAddressElm.value);
})

function init() {
    const storedApiKey = localStorage.getItem('api-key');
    const storedWallet = localStorage.getItem('wallet');
    //to-do: const storedChain = localStorage.getItem('chain');

    if (storedApiKey === null || storedWallet === null) {
        //...
    } else {
        getBalance(storedApiKey, storedWallet);
    }
}

init();