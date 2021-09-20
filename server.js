const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors")

require("./server/config/db.config");

app.use(express.json(), express.urlencoded({ extended: true }));

app.use(cors());

const allRoutes = require("./server/routes/authors.routes");
allRoutes(app);



app.listen(8000, () => console.log("This is the Express server live port 8000"));