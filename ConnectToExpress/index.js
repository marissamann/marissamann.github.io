//use express web server
const express = require("express")
//merg knows to look for .js
const myCustomRoutes = require("./routes/user")
const dynamicHtmlRoute = require("./routes/dynamic")
const peopleRoute = require("./routes/people")

//load express
const app = express();
const port = 3000;

//routes in /routes/user
app.use("/user_routes/", myCustomRoutes)
app.use("/dynamic_routes/", dynamicHtmlRoute)
app.use("/people_routes/", peopleRoute)

//routes in this file
app.get("/", (req, res) => {
    res.send("This is a website to learn some basic information about you!");
});

//usually react would be in front end
app.use(express.static("public"));

//set up the server
app.listen(port, () => {
    console.log("Server started on port " + port)
});