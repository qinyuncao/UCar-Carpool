
//Added Eventlistener for submit button, when hit it, we post the input information to the database
document.getElementById('submitridebutton').addEventListener('click', async function () {
  console.log("clicked");
  const inputTitle = document.getElementById('title').value;
  const inputDeparture = document.getElementById('departure').value;
  const inputDestination = document.getElementById('destination').value;
  const inputSlot = document.getElementById("remainSlot").value;
  const inputDate = document.getElementById('date').value;
  const inputTime = document.getElementById('time').value;
  const inputBrand = document.getElementById('brand').value;
  const inputModel = document.getElementById('model').value;
  const inputPhoneNum = document.getElementById('phoneNum').value;
  const inputDetails = document.getElementById('details').value;
  const inputData = {
    title: inputTitle,
    departure: inputDeparture,
    destination: inputDestination,
    slot: inputSlot,
    date: inputDate,
    time: inputTime,
    brand: inputBrand,
    model: inputModel,
    phone: inputPhoneNum,
    details: inputDetails
  };

  // Send the post new ride API call
  let response = await fetch('http://127.0.0.1:3000/ride/post-newride', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify(inputData)
  })

  //If everything works, back to the search page
  if (response.ok) {
    document.getElementById('userUpdate').innerText = 'The information has been stored!';
    window.location.href = "../Search/search.html";
  }
  else {
    let jsonData = await response.json();
    // Re-direct user to login page, if there token is expired
    if (response.status === 401){
      window.location.href = "../LogIn/logIn.html";
    }
    // Print the error message, if there are other errors
    else{
      document.getElementById('userUpdate').innerText = jsonData.error;
    }
  }
});