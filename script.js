const form = document.querySelector("#name_form");
const popup = document.querySelector(".message");

// const query = window.location.search;

// const urlParams = new URLSearchParams(query);

// const paramStates = urlParams.get("states");
// const paramName = urlParams.get("businessName");

// const statesArray = paramStates.split(" ");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.querySelector('[name="name"]').value;

  const checks = {
    DE: await checkDelaware(name),
    WY: await checkWyoming(name),
  };

  if (checks.DE == true || checks.WY == true) {
    if (checks.DE && checks.WY) {
      window.location.href = `/claim-name-2?businessName=${name}&states=Delaware+Wyoming`;
    } else if (checks.DE == true) {
      window.location.href = `/claim-name-2?businessName=${name}&states=Delaware`;
    } else if (checks.WY == true) {
      window.location.href = `/claim-name-2?businessName=${name}&states=Wyoming`;
    }
  } else {
    popup.textContent = `Shucks, that name is already taken.`;
  }
});

async function checkDelaware(name) {
  const check = await fetch(
    `https://api.opencorporates.com/v0.4/companies/search?q=${name}*&jurisdiction_code=us_de`
  );
  const json = await check.json();

  if (json.results.companies.length === 0) {
    return true;
  } else {
    return false;
  }
}

async function checkWyoming(name) {
  const check = await fetch(
    `https://api.opencorporates.com/v0.4/companies/search?q=${name}*&jurisdiction_code=us_wy`
  );
  const json = await check.json();

  if (json.results.companies.length === 0) {
    return true;
  } else {
    return false;
  }
}
