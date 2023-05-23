import express from "express";
import db from "../database.mjs";
import { checkUser } from "../middleware/auth.mjs";

// This class is declaring API for rides
// Including create, get-rides and delete-rides
const router = express.Router();

// Get all the rides, return array of rides
router.get("/get-all-rides", checkUser, async (req, res) => {
    let collection = await db.collection(process.env.RIDE_COLLECTION_NAME);
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Get all the avaliable rides, except the current user's ride
router.get("/avaliable-rides", checkUser, async(req, res) => {
    let collection = await db.collection(process.env.RIDE_COLLECTION_NAME);
    let currentUser = req.user.username;
    let results;
    try {
        results = await collection.find({username: {'$ne' : currentUser}}).toArray();
    } catch (error) {
        res.status(400).send({error: "Unable get the documents"})
    }
    return res.status(200).send(results);
});

// Get all the rides under the current user
router.get("/user-posted-rides", checkUser, async(req, res) => {
    let collection = await db.collection(process.env.RIDE_COLLECTION_NAME);
    let currentUser = req.user.username;
    let results;
    try {
        results = await collection.find({username: currentUser}).toArray();
    } catch (error) {
        res.status(400).send({error: "Unable get the documents"})
    }
    return res.status(200).send(results);
})

// Post new rides under the current user
router.post("/post-newride", checkUser, async (req, res) => {
    let collection = await db.collection(process.env.RIDE_COLLECTION_NAME);
    let currentUser = req.user.username;

    // Check import fields are filled
    let filled = req.body.date && req.body.time && req.body.title && 
                req.body.departure && req.body.destination && req.body.slot
                && req.body.phone;
    if (! filled ) return res.status(400).send({error: "Missing required information"});

    // Check if the ride already exists
    let exist = await collection.findOne({
        username: currentUser, 
        date: req.body.date, 
        time: req.body.time
    });
    if (exist) {
        return res.status(400).send({error: "Same ride already exist!"});
    }

    let newRide = {
        username: currentUser,
        date: req.body.date,
        time: req.body.time,
        title: req.body.title,
        departure: req.body.departure,
        destination: req.body.destination,
        slot: req.body.slot,
        brand: req.body.brand,
        model: req.body.model,
        phone: req.body.phone,
        details: req.body.details
    }
    let result = await collection.insertOne(newRide);
    if (result.acknowledged) {
        return res.status(200).send(true);
    }
    else{
        return res.status(400).send({error: "Couldn't insert"});
    }
});

// Delete a ride, need date & time in req body
router.post("/remove-ride", checkUser, async(req, res) => {
    let collection = await db.collection(process.env.RIDE_COLLECTION_NAME);
    let currentUser = req.user.username;
    
    // Check import fields are filled
    let filled = req.body.date && req.body.time;
    if (! filled ) return res.status(400).send({error: "Missing required information"});

    let query = {
        username: currentUser, 
        date: req.body.date, 
        time: req.body.time
    }

    // Check if the ride already exists
    let exist = await collection.findOne(query);
    if (!exist) {
        return res.status(200).send(false);
    }

    let result = await collection.deleteOne(query);
    if (result.acknowledged) {
        return res.status(200).send(true);
    }
    else{
        return res.status(400).send({error: "Couldn't delete"});
    }
});

export default router;