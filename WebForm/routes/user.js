const express = require("express");
//file system for writing to txt file
const fs = require("node:fs");
const router = express.Router();
router.get("/", (req, res) => {
    const teamname = req.query.teamname;
    const sport = req.query.sport
    const content = teamname + ", " + sport;
    fs.appendFile("mydata.txt", content, err => {
        if (err) {
            console.err(err);
        }
    });
    //not usually how return data is displayed
    //usually returned as json object
    //front end parses and displays
    res.send(
        "<html><head></head><body>" + 
        "<p>Thank you for: " + req.query.teamname + 
        " in sport: " + req.query.sport + "</p" +
        "</body></html>"
    );
});

module.exports = router;