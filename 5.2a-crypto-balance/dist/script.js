const form = document.getElementById('form-data');

const apiKeyElm = document.getElementById('api-key');
const wAddressElm = document.getElementById('wallet-address');
const balanceElm = document.getElementById('balance');
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
                balanceElm.innerText = balance + ' BTC';
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