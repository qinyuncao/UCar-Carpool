document.getElementById('submitridebutton').addEventListener('click', async function(){
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
    title:inputTitle,
    departure:inputDeparture,
    destination:inputDestination,
    slot :inputSlot,
    date: inputDate,
    time:inputTime,
    brand:inputBrand,
    model:inputModel,
    phone:inputPhoneNum,
    details:inputDetails
};

  //check if inputted username is in the database, if so alert the user. If not, add it to the data and log the user in
  const response = await fetch('http://localhost:5500/users/'+inputEmail);
  if(response.ok) {
      document.getElementById('userUpdate').innerText = 'The information has been stored!';
      //post object to server
      await fetch('http://localhost:5500/users',{
          method:'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization':sessionStorage.token
            },
            body: JSON.stringify(inputData)
      });
      window.location.href = "../LogIn/logIn.html";
  }
  else {
      document.getElementById('userUpdate').innerText = 'Sorry! That user already exists.';
  }
});