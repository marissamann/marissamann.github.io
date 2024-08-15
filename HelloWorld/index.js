const express = require("express");
//instantiation of webserver
const app = express();
const port = 3000;
//route triggered by browser
//passing function into function
app.get("/", (req, res) => {
    res.send("Hello, world!")
});

app.listen(port, () => {
    console.log("server has started on port: " + port)
});