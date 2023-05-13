document.getElementById('logInButton').addEventListener('click',async() => {
    
  const inputEmail = document.getElementById('email').value;
  const inputPassword = document.getElementById('password').value;
  
  //Insert code to check if this object is in the server. If it is, the user should be logged in
  const response = await (await fetch('http://localhost:5500/users/login/'+inputEmail+'/'+inputPassword)).json();

  //If login succesful, go to main page with user logged in
  if (response) {
      document.getElementById('userUpdate').innerText = 'Correct username and password';
      window.location.href = '../Search/search.html';
  }
  else {
      document.getElementById('userUpdate').innerText = 'Sorry! Inputted username/password is not correct';
  }
});