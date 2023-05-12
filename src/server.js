require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URL);




client.connect();
client.on('error',(error)=>console.error(error));
client.once('open',()=> console.log('Connected to Database'));

app.use(express.static('public'));
app.use(express.json());





//Log in information check, compare the information from client with the information in database.
app.get('/users/login/:email/:password',async function(req,res){
    const result = await client.db("UCar").collection("UserInfo").findOne({'email':req.params.email,'password':req.params.password});
    console.log(result);
    if(result){ 
        res.end(JSON.stringify(result.id));
    }
    else{
        res.end(JSON.stringify(''));
    }
});

//When client ask for specific user
//use this when sign up, if the database has the username from front end, return 404
app.get('/users/:email',async function(req,res){
    //Check if the database has this email, if not, return 404
    const result = await client.db("Ucar").collection("UserInfo").findOne({'email':req.params.email});
    console.log("print something");
    if(!result){ 
        res.writeHead(200,{'Content-Type': 'application/javascript'});
        res.end(JSON.stringify('Email Available!'));
    }
    else{
        res.writeHead(404,{'Content-Type': 'application/javascript'});
        res.end(JSON.stringify('Email Not Available!'));
    }

});


//When client want to create new username and password
//use this when sign up
app.post('/users', async function(req,res){
    const user = {
        email: req.body.email,
        name : req.body.name,
        password : req.body.password,
        id: Math.random().toString(16).slice(2)
    };
    console.log(user);
    await client.db("UCar").collection('UserInfo').insertOne(user);
    console.log("print something");
    res.end(JSON.stringify('User Added!'));
});



app.listen(5500, () => console.log("Server Started!"));