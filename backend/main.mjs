import "./loadEnviroment.mjs";
import app from "./app.mjs";

const PORT = process.env.BACKEND_PORT || 3000;

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});