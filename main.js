document.addEventListener("DOMContentLoaded", () => {

    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amountInput = document.getElementById('amount');
    const convertButton = document.getElementById('convertButton');
    const resultDiv = document.getElementById('result');


    const apiKey = 'YOUR_API_KEY';    //  Replace with your own API key
    const apiURL = `https://api.exchangerate-api.com/v4/latest/USD`;

    // Fetch the currency codes and populate the select elements
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {

            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.text = currency;
                fromCurrency.add(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.text = currency;
                toCurrency.add(option2);
            });

        });

    // Convert currency when button is clicked

    convertButton.addEventListener('click', () => {

        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount) || amount <= 0) {

            alert("please Enter a valid amount");
            return;
        }



        fetch(`${apiURL}?base=${from}`)
            .then(response => response.json())
            .then(data => {

                const rate = data.rates[to];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.innerHTML = `${amount} ${from} = ${convertedAmount}`;

            })
            .catch(error => {

                console.error('Error fetching exchange rates', error)
            })

    });




});