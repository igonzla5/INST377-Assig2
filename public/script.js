function convertRestaurantsToCategories(restaurantList) {
    // process your restaurants here!
    const categoryArray = [];
    const result = {}
    for (let i = 0; i < restaurantList.length; i += 1) {
      categoryArray.push(restaurantList[i].category);
    }
    for (let i = 0; i < categoryArray.length;i += 1){
      if (!result[categoryArray[i]]) {
        result[categoryArray[i]] = 0;
      }
      result[categoryArray[i]] +=1;
    }
      const reply = Object.keys(result).map((category) => ({
      y: result[category], label: category
    }));
    return reply;
  }
  
  function makeYourOptionsObject(datapointsFromRestaurantsList) {
    // set your chart configuration here!
    CanvasJS.addColorSet('customColorSet1', [
      // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
                  "#fc0a0a",
                  "#53fc0a",
                  "#0be0d9",
                  "#c30fff",
                  "#ff03af"                
                  ]);
    return {
      animationEnabled: true,
      colorSet: 'customColorSet1',
      title: {
        text: 'Places To Eat Out In Future'
      },
      axisX: {
        interval: 1,
        labelFontSize: 12
      },
      axisY2: {
        interlacedColor: 'rgba(1,77,101,.2)',
        gridColor: 'rgba(1,77,101,.1)',
        title: 'Types Of Food',
        labelFontSize: 12,
        scaleBreaks: {customBreaks: [{
          startValue: 40,
          endValue: 50,
          color: "purple"
  
        },
        {
          startValue: 85,
          endValue: 100,
          color: "purple"
        },
        {
          startValue: 140,
          endValue: 175,
          color: "purple"
        }]
       } // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
      },
      data: [{
        type: 'bar',
        name: 'restaurants',
        axisYType: 'secondary',
        dataPoints: datapointsFromRestaurantsList
      }]
    };
  }
  
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