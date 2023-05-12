const express = require('express');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://qinyuncao:iplQalcuF1m1ph18@ucar-server.sgcgteh.mongodb.net/?retryWrites=true&w=majority";
const app = express();

app.use(express.static('public'));
app.use(express.json());

const client = new MongoClient(uri);

client.connect(err => {
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected to the server!')
        app.listen(process.env.PORT || 8086);
    }
});


//Log in information check, compare the information from client with the information in database.
app.get('/users/login/:username/:password',async function(req,res){
    const result = await client.db("finalProject").collection("users").findOne({'username':req.params.username,'password':req.params.password});
    if(result){ 
        res.end(JSON.stringify(result.id));
    }
    else{
        res.end(JSON.stringify(''));
    }
});
