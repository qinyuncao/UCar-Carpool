import express from "express";
import cors from "cors";
import account from "./routes/account.mjs";
import ride from "./routes/ride.mjs";
import "express-async-errors";

// Start the app with ExpressJS
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/account", account);
app.use("/ride", ride);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send('Something broke! Check the back end!')
})

export default app;
