//When we load the search page, grab all the information we need from database
//Include all avaliable ride, current user's ride, current user's name
window.addEventListener('load', async () => {

  // Fetch all the avaliable rides
  let posts;
  let result = await fetch('http://127.0.0.1:3000/ride/avaliable-rides',{
    method:'GET',
    headers: {
        'Authorization':sessionStorage.getItem('token')
    }
  });
  let jsonData = await result.json();
  if (!result.ok) {
    console.log(jsonData.error);
  }
  else{
    posts = jsonData;
  }

  var postContainer = document.getElementById("post-container"); //get the container
  while (postContainer.firstChild) {
    postContainer.removeChild(postContainer.firstChild); //Delete all posts in the container if there is any
  }
  for (var i = 0; i < posts.length; i++) {
    postContainer.appendChild(createPostCard(posts[i])); //Append all card create by createPostCard to container
  }


  //Fetch currrent user's post
  let userPosts;
  let myrides = await fetch('http://127.0.0.1:3000/ride/user-posted-rides',{
    method:'GET',
    headers: {
        'Authorization':sessionStorage.getItem('token')
    }
  });
  let myridesData = await myrides.json();
  if (!result.ok) {
    console.log(myridesData.error);
  }
  else{
    userPosts = myridesData;
  }

  var userRideContainer = document.getElementById("userRide-container"); //get the container
  while (userRideContainer.firstChild) {
    userRideContainer.removeChild(userRideContainer.firstChild); //Delete all posts in the container if there is any
  }
  for (let i = 0; i < userPosts.length; i++) {
    userRideContainer.appendChild(createUserPostCard(userPosts[i])); //Append all card create by createPostCard to container
  }

  
  // Fetch current user's name
  let user_name;
  result = await fetch('http://127.0.0.1:3000/account/getname',{
    method:'GET',
    headers: {
        'Authorization':sessionStorage.getItem('token')
    }
  });
  jsonData = await result.text();
  if (!result.ok) {
    console.log(jsonData.error);
  }
  else{
    user_name = jsonData;
  }
  var displayName = document.getElementById("displayName"); //get the element
  displayName.innerText = user_name;
});



//When hit the search button, grab the filterd posts from database
document.getElementById('searchbutton').addEventListener('click', async function () {
  const inputDestination = document.getElementById('inputDestination').value.toLowerCase();
  let posts;
  let result = await fetch('http://127.0.0.1:3000/ride/avaliable-rides',{
    method:'GET',
    headers: {
        'Authorization':sessionStorage.getItem('token')
    }
  });
  let jsonData = await result.json();
  if (!result.ok) {
    console.log(jsonData.error);
  }
  else{
    posts = jsonData;
  }

  var filtered_post = posts.filter(post=>post.destination.toLowerCase().indexOf(inputDestination)>-1);
  var postContainer = document.getElementById("post-container");
  
  while (postContainer.firstChild) {
    postContainer.removeChild(postContainer.firstChild); //Delete all posts in the container
  }

  for (var i = 0; i < filtered_post.length; i++) {
    postContainer.appendChild(createPostCard(filtered_post[i])); //Append the filtered posts
  }

});

//If there is nothing in the search bar, refresh the page to get all posts
document.getElementById('inputDestination').addEventListener('input', function (e) {
  if (e.target.value.trim() === '') {
      location.reload();
  }
});


//Create post card
function createPostCard(post) {
  let card = document.createElement('div');
  card.className = 'card mb-2 mx-2';
  card.style = 'width:30%';

  let img = document.createElement('img');
  img.className = 'card-image-top';
  var img_name ="../photos/"+post.brand+".jpg"; // Create image based on the car model
  img.src = img_name;
  

  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  let title = document.createElement('h5');
  title.innerText = post.title;
  title.className = 'card-title';

  let dateAndTime = document.createElement('h6');
  dateAndTime.innerText = post.date.concat(" ", post.time);
  dateAndTime.className = "card-subtitle mb-2 text-muted";

  let departAndDest = document.createElement('div');
  departAndDest.innerText = "Departure:" + post.departure + " | " + "Destination:" + post.destination;
  departAndDest.className = 'card-text';

  let remainSlot = document.createElement('div');
  remainSlot.innerText = "Number of Passenger:" + post.slot;
  remainSlot.className = 'card-text';

  let phoneNum = document.createElement('div');
  phoneNum.innerText = "Contact Number: " + post.phone;
  phoneNum.className = 'card-text';

  let details = document.createElement('div');
  details.innerText = "More Information:" + post.details;
  details.className = 'card-text';


  cardBody.appendChild(title);
  cardBody.appendChild(dateAndTime);
  cardBody.appendChild(departAndDest);
  cardBody.appendChild(remainSlot);
  cardBody.appendChild(phoneNum);
  cardBody.appendChild(details);
  card.appendChild(img);
  card.appendChild(cardBody);
  return card
}

//Create User's post card
function createUserPostCard(post) {
  let card = document.createElement('div');
  card.className = 'card mb-2';
  card.style = 'width:100%';


  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  let title = document.createElement('h6');
  title.innerText = post.title;
  title.className = 'card-title';

  let dateAndTime = document.createElement('div');
  dateAndTime.innerText = post.date.concat(" ", post.time);
  dateAndTime.className = "card-subtitle mb-2 text-muted";

  let departAndDest = document.createElement('div');
  departAndDest.innerText = "Departure:" + post.departure + " | " + "Destination:" + post.destination;
  departAndDest.className = 'card-text';

  let deleteButton = document.createElement('input');
  deleteButton.value = 'delete';
  deleteButton.type = 'button';
  deleteButton.className = 'btn btn-danger text-white btn-sm';
  deleteButton.addEventListener('click', async function () {
    let inputData = {
      "date":post.date,
      "time":post.time
    };
    console.log(inputData);
    let result = await fetch('http://127.0.0.1:3000/ride/remove-ride',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
        'Authorization':sessionStorage.getItem('token')
    },
    body:JSON.stringify(inputData)
  });
  location.reload(); //Reload the page when hit delete to refresh user's posts
    
  })

  cardBody.appendChild(title);
  cardBody.appendChild(dateAndTime);
  cardBody.appendChild(departAndDest);
  cardBody.appendChild(deleteButton);

  card.appendChild(cardBody);
  return card
}