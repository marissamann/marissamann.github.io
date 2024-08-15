const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config({path: "./config.env"});

app.use(cors());
app.use(express.json());

const dbo = require("./db/conn");
app.use(require("./routes/record"));

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(5000, () => {
    console.log(`Server is running on port ${port}`);
    dbo.connectToServer(function(err) {
        if (err) {
            console.err(err);
        }
    });
});