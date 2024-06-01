$(document).ready(async function () {
 

  //Disable right-click
 document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
document.onkeydown = (e) => {
  if (e.keyCode1 === 123 || (e.ctrlKey && e.shiftKey && e.keyCode1 === 'I'.charCodeAt(0)) ||
      (e.ctrlKey && e.shiftKey && e.keyCode1 === 'J'.charCodeAt(0)) ||
      (e.ctrlKey && e.shiftKey && e.keyCode1 === 'C'.charCodeAt(0)) ||
      (e.ctrlKey && e.keyCode1 === 'U'.charCodeAt(0))) {
    return false;
  }
};


  const webcam = document.getElementById('webcam');
  const predictionsDiv = document.getElementById('predictions');
  const detailsDiv = $('#details');
  const model = await cocoSsd.load();
  fetch('details.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(jsonData => {

      const apple =jsonData.apple[0];
      const orange = jsonData.orange[0];
      // Use the fetched JSON data
      
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          webcam.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });

      webcam.addEventListener('loadeddata', async () => {
        setInterval(async () => {
          const predictions = await model.detect(webcam);
          predictionsDiv.innerText = JSON.stringify(predictions[0].class, null, 2);
          
          if (predictions.length > 0) {
            const predictedClass = predictions[0].class;
            switch (predictedClass) {
              case "apple":
                detailsDiv.html(`Name: Apple<br>Calories: ${apple.scientific_details.nutritional_composition.calories}<br>Carbohydrates: ${apple.scientific_details.nutritional_composition.carbohydrates}\
                <br>Dietary Fiber: ${apple.scientific_details.nutritional_composition.dietary_fiber}<br>Vitamin C: ${apple.scientific_details.nutritional_composition.vitamin_c}<br>Potassium: ${apple.scientific_details.nutritional_composition.potassium}`);
                break;
              case "orange":
                detailsDiv.html(`Name: orange<br>Calories: ${orange.scientific_details.nutritional_composition.calories}<br>Carbohydrates: ${orange.scientific_details.nutritional_composition.carbohydrates}\
                <br>Dietary Fiber: ${orange.scientific_details.nutritional_composition.dietary_fiber}<br>Vitamin C: ${orange.scientific_details.nutritional_composition.vitamin_c}<br>Potassium: ${apple.scientific_details.nutritional_composition.potassium}`);
                break;
            case "person":
              detailsDiv.html("sorry we dont have any data for humans");
              break;
              default:
                detailsDiv.text("No data found");
            }
          } else {
            detailsDiv.text("No product detected");
          }
        }, 6000);
      });
    })
    .catch(error => {
      console.error('There was a problem fetching the JSON data:', error);
    });
});
