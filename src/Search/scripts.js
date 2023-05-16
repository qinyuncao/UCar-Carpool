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
  //Use reponse instead after testing
  // posts = [{
  //   "title": "Boston TO NY",
  //   "date": "2019/5/5",
  //   "time": "11:15 AM",
  //   "departure": "Boston",
  //   "destination": "NYC",
  //   "remainSlot": 4,
  //   "phoneNum": "4133799999",
  //   "details": "asldkfjeljflkajsdklfjalkwejasdfaefasdfasefasdfaefaseafsefasea1231231231312312312312"
  // },
  // {
  //   "title": "Boston TO NY",
  //   "date": "2019/5/5",
  //   "time": "11:15 AM",
  //   "departure": "Boston",
  //   "destination": "Boston",
  //   "remainSlot": 4,
  //   "phoneNum": "4133799999",
  //   "details": "asldkfjeljflkajsdklfjalkwej"
  // },
  // {
  //   "title": "Boston TO NY",
  //   "date": "2019/5/5",
  //   "time": "11:15 AM",
  //   "departure": "Boston",
  //   "destination": "Amherst",
  //   "remainSlot": 4,
  //   "phoneNum": "4133799999",
  //   "details": "asldkfjeljflkajsdklfjalkwej"
  // },
  // {
  //   "title": "Boston TO NY",
  //   "date": "2019/5/5",
  //   "time": "11:15 AM",
  //   "departure": "Boston",
  //   "destination": "NYC",
  //   "remainSlot": 4,
  //   "phoneNum": "4133799999",
  //   "details": "asldkfjeljflkajsdklfjalkwej"
  // },
  // {
  //   "title": "Boston TO NY",
  //   "date": "2019/5/5",
  //   "time": "11:15 AM",
  //   "departure": "Boston",
  //   "destination": "Amherst",
  //   "remainSlot": 4,
  //   "phoneNum": "4133799999",
  //   "details": "asldkfjeljflkajsdklfjalkwej"
  // }
  // ];

  var postContainer = document.getElementById("post-container");
  //Delete all posts in the container
  while (postContainer.firstChild) {
    postContainer.removeChild(postContainer.firstChild);
  }

  for (var i = 0; i < posts.length; i++) {
    postContainer.appendChild(createPostCard(posts[i]));
  }

  //   const response = await fetch('http://127.0.0.1:3000/ride/avaliable-rides',{
  //     method:'GET',
  //     headers: {
  //         'Authorization':sessionStorage.getItem('token')
  //     }
  // });
  //Use reponse instead after testing
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

  // userPosts = posts = [
  // {
  //   "title": "Boston TO NY",
  //   "date": "2019/5/5",
  //   "time": "11:15 AM",
  //   "departure": "Boston",
  //   "destination": "Amherst",
  //   "remainSlot": 4,
  //   "phoneNum": "4133799999",
  //   "details": "asldkfjeljflkajsdklfjalkwej"
  // },
  // {
  //   "title": "Boston TO NY",
  //   "date": "2019/5/5",
  //   "time": "11:15 AM",
  //   "departure": "Boston",
  //   "destination": "Amherst",
  //   "remainSlot": 4,
  //   "phoneNum": "4133799999",
  //   "details": "asldkfjeljflkajsdklfjalkwej"
  // }
  // ];

  var userRideContainer = document.getElementById("userRide-container");
  while (userRideContainer.firstChild) {
    userRideContainer.removeChild(userRideContainer.firstChild);
  }

  for (var i = 0; i < userPosts.length; i++) {
    userRideContainer.appendChild(createUserPostCard(userPosts[i]));
  }





});

document.getElementById('searchbutton').addEventListener('click', async function () {
  const inputDestination = document.getElementById('inputDestination').value.toLowerCase();
  //   const response = await fetch('http://127.0.0.1:3000/ride/avaliable-rides',{
  //     method:'GET',
  //     headers: {
  //         'Authorization':sessionStorage.getItem('token')
  //     }
  // });
  posts = [{
    "title": "Boston TO NY",
    "date": "2019/5/5",
    "time": "11:15 AM",
    "departure": "Boston",
    "destination": "NYC",
    "remainSlot": 4,
    "phoneNum": "4133799999",
    "details": "asldkfjeljflkajsdklfjalkwejasdfaefasdfasefasdfaefaseafsefasea1231231231312312312312"
  },
  {
    "title": "Boston TO NY",
    "date": "2019/5/5",
    "time": "11:15 AM",
    "departure": "Boston",
    "destination": "Boston",
    "remainSlot": 4,
    "phoneNum": "4133799999",
    "details": "asldkfjeljflkajsdklfjalkwej"
  },
  {
    "title": "Boston TO NY",
    "date": "2019/5/5",
    "time": "11:15 AM",
    "departure": "Boston",
    "destination": "Amherst",
    "remainSlot": 4,
    "phoneNum": "4133799999",
    "details": "asldkfjeljflkajsdklfjalkwej"
  },
  {
    "title": "Boston TO NY",
    "date": "2019/5/5",
    "time": "11:15 AM",
    "departure": "Boston",
    "destination": "NYC",
    "remainSlot": 4,
    "phoneNum": "4133799999",
    "details": "asldkfjeljflkajsdklfjalkwej"
  },
  {
    "title": "Boston TO NY",
    "date": "2019/5/5",
    "time": "11:15 AM",
    "departure": "Boston",
    "destination": "Amherst",
    "remainSlot": 4,
    "phoneNum": "4133799999",
    "details": "asldkfjeljflkajsdklfjalkwej"
  }
  ];

  var filtered_post = posts.filter(post=>post.destination.toLowerCase().indexOf(inputDestination)>-1);
  var postContainer = document.getElementById("post-container");
  //Delete all posts in the container
  while (postContainer.firstChild) {
    postContainer.removeChild(postContainer.firstChild);
  }

  for (var i = 0; i < filtered_post.length; i++) {
    postContainer.appendChild(createPostCard(filtered_post[i]));
  }




});

function createPostCard(post) {
  let card = document.createElement('div');
  card.className = 'card mb-2 mx-2';
  card.style = 'width:30%';

  let img = document.createElement('img');
  img.className = 'card-image-top'
  img.src = '../photos/car.jpg'
  // Create image based on the car model

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
  


  cardBody.appendChild(title);
  cardBody.appendChild(dateAndTime);
  cardBody.appendChild(departAndDest);
  cardBody.appendChild(deleteButton);

  card.appendChild(cardBody);
  return card
}