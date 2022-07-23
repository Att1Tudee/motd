const path = require(“path”);
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 1001;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, “client/build”)))
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
app.get('*', () => {
  // getting index from built folder
});

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});
