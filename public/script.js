const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";

 const food = [];

 fetch(endpoint)
  .then(blob => blob.json())
  .then(data => food.push(...data))
  function findMatches(wordToMatch, food) {
  return food.filter(place => {
  const regex = new RegExp(wordToMatch, "gi");
  return place.address_line_1.match(regex) || place.zip.match(regex)
  })
  }

  function displayMatches() {
  const matchArray = findMatches(this.value, food);
  const hyml = matchArray.map(place => {
  return `
  ${place.address_line_1}, ${place.zip}</span>
  ${place.category}
   
      `;
    }).join('');
  suggestions.innerHTML = html;
  }
  const searchInput = document.querySelector('.search')
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
  function runThisWithResultsFromServer(jsonFromServer) {
    console.log('jsonFromServer', jsonFromServer);
    sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
    // Process your restaurants list
    // Make a configuration object for your chart
    // Instantiate your chart
    const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
    const options = makeYourOptionsObject(reorganizedData);
    const chart = new CanvasJS.Chart('chartContainer', options);  
    chart.render();
    $(window).on('resize', () => {
      chart.render();
    });
  }
  
  // Leave lines 52-67 alone; do your work in the functions above
  document.body.addEventListener('submit', async (e) => {
    e.preventDefault(); // this stops whatever the browser wanted to do itself.
    const form = $(e.target).serializeArray();
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((fromServer) => fromServer.json())
      .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
      .catch((err) => {
        console.log(err);
      });
  });
  