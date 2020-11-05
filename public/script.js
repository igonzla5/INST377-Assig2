// const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";

// const { zip } = require("cypress/types/lodash");

//  const food = [];

//  fetch(endpoint)
//   .then(blob => blob.json())
//   .then(data => food.push(...data))
//   function findMatches(wordToMatch, food) {
//   return food.filter(place => {
//   const regex = new RegExp(wordToMatch, "gi");
//   return place.address_line_1.match(regex) || place.zip.match(regex)
//   })
//   }

//   function displayMatches() {
//   const matchArray = findMatches(this.value, food);
//   const hyml = matchArray.map(place => {
//   return `
//   <li>
//     <span class="locate">${place.address_line_1}, ${place.zip}</span>
//     <span class="cat">${place.category}</span>
//   </li> 
//       `;
//     }).join('');
//   suggestions.innerHTML = html;
//   }
//   const searchInput = document.querySelector('.search')
//   const suggestions = document.querySelector('.suggestions');

//   searchInput.addEventListener('change', displayMatches);
//   searchInput.addEventListener('keyup', displayMatches);
//   runThisWithResultsFromServer();

//   function runThisWithResultsFromServer(jsonFromServer) {
//     console.log('jsonFromServer', jsonFromServer);
//     sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
//     // Process your restaurants list
//     // Make a configuration object for your chart
//     // Instantiate your chart

//     const reorganizedData = findMatches(jsonFromServer);
//     const options = displayMatches(reorganizedData);
//     // const chart = new CanvasJS.Chart('chartContainer', options);  
//     // chart.render();
//     // $(window).on('resize', () => {
//       // chart.render();
//     // });
//   }
  
//   // Leave lines 52-67 alone; do your work in the functions above
//   document.body.addEventListener('text', async (e) => {
//     e.preventDefault(); // this stops whatever the browser wanted to do itself.
//     const form = $(e.target).serializeArray();
//     fetch('/api', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(form)
//     })
//       .then((fromServer) => fromServer.json())
//       .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//ABOVE THIS ISNT USEFUL

const restaurantList = document.getElementById("restaurantList");
const searchBar = document.getElementById('searchBar');
let re = [];

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredrest = re.filter((zip) => {
    return (
      zip.name.toLowerCase().includes(searchString) ||
      zip.category.toLowerCase().includes(searchString)
    );
  });
  displayrest(filteredrest);
});

const loadrest = async () => {
  try {
      const res = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
      re = await res.json();
      displayrest(re);
  } catch (err) {
      console.error(err);
  }
};

const displayrest = (zips) => {
  const htmlString = zips
      .map((zip) => {
          return `
          <li class="zip">
              <h2>${zip.name}</h2>
              <p>address: ${zip.address}</p>
          </li>
      `;
      })
      .join('');
  restaurantList.innerHTML = htmlString;
};

loadrest();

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function getRandomIntInclusive(min, max) {
  const min1 = Math.ceil(min);
  const max1 = Math.floor(max);
  return Math.floor(Math.random() * (max1 - min1 + 1) + min1); // The maximum is inclusive and the minimum is inclusive
}


async function loadData() {
  const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const json = await data.json();
  sessionStorage.setItem('restaurantData', JSON.stringify(json))


  const arrayOfTenItems = range(1000);
  const randomRestaurantsArray = arrayOfTenItems.map((item) => {
    const which = getRandomIntInclusive(0, json.length);
    const restaurant = json[which]; // we are not worrying about uniqueness here
    return restaurant;
  });

  console.table(randomRestaurantsArray); // This shows the shape of our data as it arrives

  const div = document.createElement('div');
  // div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(randomRestaurantsArray[0])}<br /><br />`;
  $('body').append(div);

  /// And now, how to get what we want
  const newDataShape = randomRestaurantsArray.reduce((collection, item, i) => {
    // for each item, check if we have a category for that item already
    const findCat = collection.find((findItem) => findItem.label === item.category);
    
    if (!findCat) {
      collection.push({
        label: item.category,
        y: 1
      });
    } else {
      const position = collection.findIndex(el => el.label === item.category);
      collection[position].y += 1;
    }
    return collection;
  }, []);


  console.table(newDataShape);

  const div2 = document.createElement('div');
  const obj = {
    label: randomRestaurantsArray[0].category,
    y: randomRestaurantsArray.length
  };
  div2.innerHTML = `<h2>What we want</h2> <br /> <h4>A category, how many things are in the category</h4><pre><code class="language-javascript">${JSON.stringify(obj)}</pre></code>`;

  $('body').append(div2);
}

window.onload = loadData;

function matchingwords(wordToMatch, data){
  return data.filter((food) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return item.name.match(regex) || item.category.match(regex);
  });
}
function displayMatches(e, dataSet) {
  console.log(e.target.value);
  const matches = wordToMatch(e.target.value, dataSet);
  let placesHTML = matches.map((place) => `
    <li>
      <span class="name">${place.name}</span><br>
      <span class="category">${place.category}</span>
      <address>${place.address_line_1}<br>
      ${place.city}<br>
      ${place.zip}<address>
    </li>
  `);
  if (e.target.value.length == 0) {
    placesHTML = [];
  }
}