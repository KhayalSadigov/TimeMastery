// Import Package
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Import Constant
const port = 2121;
const URL =
"mongodb+srv://khayalsadigov:x101010s@timemastery.gdmxn.mongodb.net/?retryWrites=true&w=majority&appName=TimeMastery";

// Use Package
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routing
const userRouter = require("./Routes/users.routes");
const projectRouter = require("./Routes/projects.routes")


app.use(userRouter)
app.use(projectRouter)




// Config
mongoose.connect(URL).then(() => {
  console.log("Connected!");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
