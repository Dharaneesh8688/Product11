
$(document).ready(async function () {
  // Disable right-click
//  document.addEventListener('contextmenu', (e) => e.preventDefault());

// // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
// document.onkeydown = (e) => {
//   if (e.keyCode1 === 123 || (e.ctrlKey && e.shiftKey && e.keyCode1 === 'I'.charCodeAt(0)) ||
//       (e.ctrlKey && e.shiftKey && e.keyCode1 === 'J'.charCodeAt(0)) ||
//       (e.ctrlKey && e.shiftKey && e.keyCode1 === 'C'.charCodeAt(0)) ||
//       (e.ctrlKey && e.keyCode1 === 'U'.charCodeAt(0))) {
//     return false;
//   }
// };


  const webcam = document.getElementById('webcam');
 
  const predictionsDiv = document.getElementById('predictions');
  const detailsDiv = $('#details'); 
  const model = await cocoSsd.load();
  
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
     // predictionsDiv.innerText = JSON.stringify(predictions[0].class, null, 2);
      
     
      if (predictions.length > 0) {
        if(predictions.length > 0 && predictions[0].class === "apple") {
           
 var item1 = "name of prodect: apple <br> calories: 95 <br> carbohydrates: 25 grams <br> dietary fiber: 4 grams,<br> \
 vitamin c: 14% <br> potassium: 6%";
  detailsDiv.html(item1);
      } 
      else if(predictions.length > 0 && predictions[0].class === "person") {
        var item1 = "hi as you are a human we dont have <br> any details to show about you";
        detailsDiv.html(item1);
      }
      else if(predictions.length > 0 && predictions[0].class === "cell phone") {
        detailsDiv.html("mobile is an electronic device so <br> I won't have any information");
      }
      else if(predictions.length > 0 && predictions[0].class === "orange") {
        detailsDiv.html("name of prodect: orange <br> Oranges are a rich <br> source of vitamin C,  providing over 100% of the recommended daily intake in just one fruit.<br> \
        They also contain significant amounts of dietary fiber, vitamin A, potassium, and <br> various phytochemicals such as flavonoids and carotenoids.");
      }
      else if(predictions.length > 0 && predictions[0].class === "cell phone") {
        detailsDiv.text("hi");
      }
      else{
        detailsDiv.text("no data found");
      }

      } 
   
      
      else {
        detailsDiv.text("no product dedected");
      }
    }, 1000); 
  });
});
