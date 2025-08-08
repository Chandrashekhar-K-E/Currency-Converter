const API_KEY = "cur_live_zg09zKlq37FIhj7DgT4zs4db9RiH67dSITGroBJf";

const populate = async (amount, baseCurrency) => {
    const url = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${baseCurrency}`;
    console.log("Fetching:", url); 

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        if (!data.data) {
            throw new Error("No data returned from API.");
        }

        document.querySelector(".output").style.display = "block";

        let tableRows = "";
        for (let code of Object.keys(data.data)) {
            let rate = data.data[code].value;
            tableRows += `
                <tr>
                    <td>${code}</td>
                    <td>${data.data[code].code}</td>
                    <td>${(rate * amount).toFixed(3)}</td>
                </tr>`;
        }

        document.querySelector("tbody").innerHTML = tableRows;

    } catch (err) {
        console.error("Error:", err);
        alert("Failed to load currency data. Check API key or internet connection.");
    }
};

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    const amount = parseFloat(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    populate(amount, currency);
});
