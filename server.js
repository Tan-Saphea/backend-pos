const app = require("./app");
const dotenv = require("dotenv");
const connectToDatabase = require("./config/db");

//init dotenv
dotenv.config({ path: "./config.env" });

//connect to database
connectToDatabase();

//connect to port in dotenv file
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
