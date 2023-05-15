import express from "express";
import cors from "cors";
import "./loadEnviroment.mjs";
import "express-async-errors";
import account from "./routes/account.mjs";
import ride from "./routes/ride.mjs";

const PORT = process.env.BACKEND_PORT || 3000;
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

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});