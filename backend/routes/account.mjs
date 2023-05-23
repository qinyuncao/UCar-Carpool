import express from "express";
import db from "../database.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkUser } from "../middleware/auth.mjs";

// This file contains API calls related to user collection
// Signup, Login, delete user
const router = express.Router();

// Testing simple get method on the token, returns the loggedin user's username
router.get("/token", checkUser, async (req, res) => {
    res.sendStatus(200).send(req.user);
})

// Sign up method, body needs to be json
// link: https://www.npmjs.com/package/bcrypt
// TODO Email Confirmation
router.post("/signup", async (req, res) => {
    let collection = await db.collection(process.env.AUTH_COLLECTION_NAME);
    let username = req.body.username;
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;
    let name = req.body.name;

    // Check if the required information are null
    if (!username || !password || !confirm_password) {
        return res.status(400).send({
            error: "Need more details!"
        });
    }

    // Check if it is umass email
    if (!username.includes("@umass.edu")) {
        return res.status(400).send({
            error: "Your username needs to be umass email!"
        });
    }

    // Check if user already exist
    let query = { username: username };
    let result = await collection.findOne(query);
    if (result) {
        return res.status(400).send({
            error: "User Already exist!"
        });
    }

    // Check if password and confirm_password is the same
    if (password !== confirm_password) {
        return res.status(400).send({
            error: "Please confirm your password!"
        });
    }

    // Hash and store the password
    bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
            return res.status(400).send({
                error: "Can not generate the hash!"
            });
        }
        // Store hash in your password DB.
        else {
            let result = await collection.insertOne({ username: username, password: hash, name: name});
            return res.send(result.acknowledged).status(200);
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
    if (!user) return res.status(400).send({ error: "Can not find the user!" });

    // console.log(bcrypt.compare(password, result))

    bcrypt.compare(password, user.password)
        .then((result) => {
            if (!result) return res.status(400).send({ error: "Incorrect Password" });
            else {
                jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), username: username },
                    process.env.TOKEN_SECRET, function (err, token) {
                        if (err) return res.status(400).send({ error: "Can not generate token, " + err });
                        return res.status(200).send(token);
                    })
            }
        })
})

// Get the current user name
router.get("/getname", checkUser, async (req, res) => {
    let collection = await db.collection(process.env.AUTH_COLLECTION_NAME);
    let currentUser = req.user.username;

    // Check if the user exists
    let result = await collection.findOne({
        username: currentUser, 
    });
    if (result) {
        return res.status(200).send(result.name);
    }
    else{
        return res.status(400).send({error: "User doesn't exist"});
    }
})

// Post method for delete a user
router.post("/delete", async (req, res) => {
    let collection = await db.collection(process.env.AUTH_COLLECTION_NAME);
    let username = req.body.username;

    // Check if the required information are null
    if (!username) {
        return res.status(400).send({
            error: "Need more details!"
        });
    }

    // Check if user already exist
    let query = { username: username };
    let result = await collection.findOne(query);
    if (result) {
        result = await collection.deleteOne(query);
        return res.status(200).send(result);
    }
    else{
        return res.status(400).send({
            error: "User does not exist"
        })
    }
})

export default router;