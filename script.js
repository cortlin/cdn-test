const form = document.querySelector('#name_form');
const popup = document.querySelector('.message');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.querySelector('[name="name"]').value;
    const state = document.querySelector('[name="states"').value;
    const isTrue = await checkName(name, state);

    if (isTrue == true) {
        window.location.href = "/claim-name-2";

    } else {
        popup.textContent = "Name is Taken";
    }
});


async function checkName (name, state) {
    
    const check = await fetch (`https://api.opencorporates.com/v0.4/companies/search?q=${name}*&jurisdiction_code=${state}`);
    const json = await check.json();

    if (json.results.companies.length === 0) {
        return true;
    } else {
        return false;
    }
} 