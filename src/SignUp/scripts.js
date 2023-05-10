document.getElementById('signupbutton').addEventListener('click', async function(){
  const inputFullName = document.getElementById('full name').value;
  const inputEmail = document.getElementById('email').value;
  const inputPassword = document.getElementById('password').value;
  const reInputPassword = document.getElementById('confirm password').value;
  const inputData = {
      email:inputEmail,
      fullname:inputFullName,
      password:inputPassword
  };

  //valid Umass Emails
  if (!/\S+@\S+\.\S+/.test(inputEmail) || !/@umass\.edu$/.test(inputEmail)) {
      document.getElementById('userUpdate').innerText = 'Sorry! You must input a valid UMass Email.';
      return;
  }

  //Fill all fields
  if(!(inputFullName&& inputPassword && reInputPassword)) {
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


  //check if inputted username is in the database, if so alert the user. If not, add it to the data and log the user in
  const response = await fetch('/users/'+inputEmail);
  if(response.ok) {
      document.getElementById('userUpdate').innerText = 'The information has been stored!';
      //post object to server
      await fetch('/users',{
          method:'POST',
          headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
      });
      window.location.href = "../LogIn.logIn.html";
  }
  else {
      document.getElementById('userUpdate').innerText = 'Sorry! That user already exists.';
  }
});