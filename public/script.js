function matchingwords(wordToMatch, info) {
  return info.filter((piece) => {
    const re = new RegExp(wordToMatch, 'gi');
    return piece.name.match(re) || piece.category.match(re) || piece.zip.match(re);
  });
}

function displayMatches(i, sInfo) {
  const match = matchingwords(i.target.value, sInfo);
  let locationsHTML = match.map((location) => `
  <li>
      <span class="name"><b>${location.name}</b></span><br>
      <span class="category"><b>${location.category}</b></span>
      <address><b>${location.address_line_1}</b><br>
      <b>${location.city}</b><br>
      <b>${location.zip}</b><address>
    </li>
  `);
  if (i.target.value.length == 0) {
    locationsHTML = [];
  }
  return locationsHTML;
}

async function mainT() {
  const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const json = await data.json();
  const input = document.querySelector('input[type="text"]');
  input.addEventListener('input', (e) => {
    const makeMlst = displayMatches(e,json);
    const trg = document.querySelector('.restaurantList');
    trg.innerHTML = makeMlst;
  });
}
window.onload = mainT;