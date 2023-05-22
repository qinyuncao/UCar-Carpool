//Added Eventlistener for signup button, when hit it, we posts all the information to database
document.getElementById('signupbutton').addEventListener('click', async function(){
  console.log("clicked");
  const inputEmail = document.getElementById('email').value;
  const inputName = document.getElementById('name').value;
  const inputPassword = document.getElementById('password').value;
  const reInputPassword = document.getElementById('confirm password').value;
  const inputData = {
      username: inputEmail,
      name: inputName,
      password: inputPassword,
      confirm_password: reInputPassword
  };

  //valid Umass Emails
  if (!/\S+@\S+\.\S+/.test(inputEmail) || !/@umass\.edu$/.test(inputEmail)) {
      document.getElementById('userUpdate').innerText = 'Sorry! You must input a valid UMass Email.';
      return;
  }

  //Fill all fields
  if(!(inputName&& inputPassword && reInputPassword)) {
      document.getElementById('userUpdate').innerText = 'Sorry! You must fill in all fields.';
      return;
  }
  
  //The passwords do not match
  if (!(inputPassword === reInputPassword)) {
      document.getElementById('userUpdate').innerText = 'Sorry! The passwords do not match.';
      return;
  }

  //The password is not long enough
  if (inputPassword.length < 8) {
      document.getElementById('userUpdate').innerText = 'Sorry! The password must be at least 8 characters long.';
      return;
  }


 // Call the signup API, provide the login info, 
 // Display any error message from the backend

  let response = await fetch("http://127.0.0.1:3000/account/signup", {
    method:"Post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(inputData),
  });

  if (response.ok) {
    window.location.href = "../LogIn/logIn.html";
  }
  else{
    let jsonData = await response.json();
    document.getElementById('userUpdate').innerText = jsonData.error;
  }
});