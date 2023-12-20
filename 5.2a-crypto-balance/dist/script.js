const form = document.getElementById('form-data');

const apiKeyElm = document.getElementById('api-key');
const wAddressElm = document.getElementById('wallet-address');
const balanceElm = document.getElementById('balance');
const currencyElm = document.getElementById('currency');
const rateElm = document.getElementById('rate');
const getInfoBtn = document.getElementById('get-info');

async function getBalance() {
    try {
        await axios
            .get(`https://api.covalenthq.com/v1/btc-mainnet/address/${wAddressElm.value}/balances_v2/?`, {
                headers: {
                    'Content-type': 'application/json',
                },
                auth: {
                    username: apiKeyElm.value,
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

                balanceElm.innerText = balance / Math.pow(10, decimals) + ' ' + symbol;
                currencyElm.innerText = quote.toFixed(2) + ' ' + currency;
                rateElm.innerText = rate + ' ' + currency + ' (' + rateChangePt.toFixed(2) + '%)';

                console.log(response);
            });

    } catch (error) {
        console.log(error);
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getBalance();
})