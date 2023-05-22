//Added Eventlistener for login button, when hit it, we check if the input information matches with the database
document.getElementById('logInButton').addEventListener('click',async() => {
    
  const inputEmail = document.getElementById('email').value;
  const inputPassword = document.getElementById('password').value;
  
  //Check if this object is in the server. If it is, the user should be logged in
  let response = await fetch('http://localhost:3000/account/login', {
    method:"Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "username": inputEmail,
      "password": inputPassword
    }),
  });

  //If login succesful, go to search page with user logged in, set the token
  //If not, give the reason
  if (response.ok) {
      // Token is JWT token saved in session storage
      let token = await response.text();
      token = 'Bearer ' + token;
      sessionStorage.setItem('token', token);
      window.location.href = '../Search/search.html';
  }
  else {
      document.getElementById('userUpdate').innerText = 'Sorry! Inputted username/password is not correct';
  }
});