const form = document.querySelector('#name_form');
const popup = document.querySelector('.message');
const results = document.querySelector('.results');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.querySelector('[name="name"]').value;
    const state = document.querySelector('[name="states"').value;
    const isTrue = await checkName(name, state);

    if (isTrue == true) {
        popup.textContent = "Name is available";
    } else {
        popup.textContent = "Name is Taken";
    }
});


async function checkName (name, state) {
    
    const check = await fetch (`https://api.opencorporates.com/v0.4/companies/search?q=${name}*&jurisdiction_code=${state}`);
    const json = await check.json();
    const data = JSON.stringify(json.results.companies, null, 2);
    console.log(data);

    if (json.results.companies.length === 0) {
        results.textContent = '';
        return true;
    } else {
        results.textContent = data;
        return false;
    }
} 