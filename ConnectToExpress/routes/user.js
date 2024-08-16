const express = require("express");
//file system for writing to txt file
const fs = require("node:fs");
const router = express.Router();
router.get("/", (req, res) => {
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    const favoritefood = req.query.favoritefood;
    const content = firstname + " " + lastname + " " + favoritefood + "\n";
    fs.appendFile("info.txt", content, err => {
        if (err) {
            console.err(err);
        }
    });
    //not usually how return data is displayed
    //usually returned as json object
    //front end parses and displays
    res.send(
        "<html><head></head><body>" + 
        "<p>" + content + "</p" +
        "</body></html>"
    );
});

module.exports = router;