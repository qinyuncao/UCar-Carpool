import express from "express";
import cors from "cors";
import account from "./routes/account.mjs";
import ride from "./routes/ride.mjs";
import "express-async-errors";


const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/account", account);
app.use("/ride", ride);

// Global error handling
app.use((err, _req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke! Check the back end!')
})

export default app;

// export default function add(a,b){
//     return a+b;
// }