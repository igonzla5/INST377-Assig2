function matchingwords(wordToMatch, data) {
  return data.filter((item) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return item.name.match(regex) || item.category.match(regex);
  });
}

function displayMatches(e, dataSet) {
  console.log(e.target.value);
  const matches = matchingwords(e.target.value, dataSet);
  let placesHTML = matches.map((place) => `
  <li>
      <span class="name"><b>${place.name}</b></span><br>
      <span class="category"><b>${place.category}</b></span>
      <address><b>${place.address_line_1}</b><br>
      <b>${place.city}</b><br>
      <b>${place.zip}</b><address>
    </li>
  `);
  if (e.target.value.length == 0) {
    placesHTML = [];
  }
  return placesHTML 
}

async function mainT() {
  const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const json = await data.json();
  const input = document.querySelector('input[type="text"]');
  input.addEventListener('input', (e) => {
    const makeMlst = displayMatches(e,json);
    const target = document.querySelector('.restaurantList');
    target.innerHTML = makeMlst;
  });
}
window.onload = mainT;