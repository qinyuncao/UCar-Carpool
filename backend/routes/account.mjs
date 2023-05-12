import express from "express";
import db from "../database.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {checkUser} from "../middleware/auth.mjs";
// import { ObjectId } from "mongodb";

const router = express.Router();

// Middleware to check if the user is logged in with jwt token
// function checkUser(req, res, next) {
//     let authHeader = req.headers['authorization'];
//     let token = authHeader && authHeader.split(' ')[1];

//     // Verity if the token is still avaliable
//     jwt.verify(token, process.env.TOKEN_SECRET,
//         function (err, decoded) {
//             if (err) return res.status(403).send({ error: "You need a new token!" });
//             req.user = decoded;
//             next();
//         });
// }

// Testing simple get method on the auth collection
router.get("/test", async (req, res) => {
    let collection = await db.collection(process.env.AUTH_COLLECTION_NAME);
    let query = { username: "testingUserName" };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
})

// Testing simple get method on the token, returns the loggedin user's username
router.get("/token", checkUser, async (req, res) => {
    res.status(200).send(req.user.username);
})

// Sign up method, body needs to be json
// link: https://www.npmjs.com/package/bcrypt
// TODO Email Confirmation
router.post("/signup", async (req, res) => {
    let collection = await db.collection(process.env.AUTH_COLLECTION_NAME);
    let username = req.body.username;
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;

    // Check if the required information are null
    if (!username || !password || !confirm_password) {
        return res.status(400).send({
            message: "Need more details!"
        });
    }

    // Check if it is umass email
    if (!username.includes("@umass.edu")) {
        return res.status(400).send({
            message: "Your username needs to be umass email!"
        });
    }

    // Check if user already exist
    let query = { username: username };
    let result = await collection.findOne(query);
    if (result) {
        return res.status(400).send({
            message: "User Already exist!"
        });
    }

    // Check if password and confirm_password is the same
    if (password !== confirm_password) {
        return res.status(400).send({
            message: "Please confirm your password!"
        });
    }

    // Hash and store the password
    bcrypt.hash(password, 10, async function(err, hash){
        if (err) {
            return res.status(400).send({
                message: "Can not generate the hash!"
            });
        }
        // Store hash in your password DB.
        else {
            let result = await collection.insertOne({ username: username, password: hash });
            return res.send(result).status(204);
        }
    });
})

// Login route, takes username, password, return a jwt token
router.post("/login", async (req, res) => {
    let collection = await db.collection(process.env.AUTH_COLLECTION_NAME);
    let username = req.body.username;
    let password = req.body.password;

    // Find the user, return error if not found
    let query = { username: username };
    let user = await collection.findOne(query);
    if (!user) return res.status(400).send({ message: "Can not find the user!" });

    // console.log(bcrypt.compare(password, result))

    bcrypt.compare(password, user.password)
        .then((result) => {
            if (!result) return res.status(400).send({ error: "Incorrect Password" });
        })
        .catch((err) => {
            return res.status(400).send({ error: "Can not check the hash password" })
        });

    jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), username: username },
        process.env.TOKEN_SECRET, function (err, token) {
            if (err) return res.status(400).send({ message: "Can not generate token, " + err });
            return res.status(200).send(token);
        })

})

// // Get a list of 50 posts
// router.get("/", async (req, res) => {
//   let collection = await db.collection("posts");
//   let results = await collection.find({})
//     .limit(50)
//     .toArray();

//   res.send(results).status(200);
// });

// // Fetches the latest posts
// router.get("/latest", async (req, res) => {
//   let collection = await db.collection("posts");
//   let results = await collection.aggregate([
//     {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
//     {"$sort": {"date": -1}},
//     {"$limit": 3}
//   ]).toArray();
//   res.send(results).status(200);
// });

// // Get a single post
// router.get("/:id", async (req, res) => {
//   let collection = await db.collection("posts");
//   let query = {_id: ObjectId(req.params.id)};
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Add a new document to the collection
// router.post("/", async (req, res) => {
//   let collection = await db.collection("posts");
//   let newDocument = req.body;
//   newDocument.date = new Date();
//   let result = await collection.insertOne(newDocument);
//   res.send(result).status(204);
// });

// // Update the post with a new comment
// router.patch("/comment/:id", async (req, res) => {
//   const query = { _id: ObjectId(req.params.id) };
//   const updates = {
//     $push: { comments: req.body }
//   };

//   let collection = await db.collection("posts");
//   let result = await collection.updateOne(query, updates);

//   res.send(result).status(200);
// });

// // Delete an entry
// router.delete("/:id", async (req, res) => {
//   const query = { _id: ObjectId(req.params.id) };

//   const collection = db.collection("posts");
//   let result = await collection.deleteOne(query);

//   res.send(result).status(200);
// });

export default router;