const express = require("express");
//file system for writing to txt file
const fs = require("node:fs");
const router = express.Router();
router.get("/", (req, res) => {
    const favoritefood = req.query.favoritefood;
    let htmlData = "<html><head></head><body><table>";
    let rowData = "";
    fs.readFile("info.txt", "utf8", (err, data) => {
        if (err) {
            console.err(err);
        }
        const myArray = data.split("\n");
        myArray.forEach(splitSpace);
        function splitSpace(item) {
            const myLineArray = item.split(" ");
            if (myLineArray[2] == favoritefood) {
                rowData += "<tr>";
                rowData += "<td>" + myLineArray[0] + "</td>";
                rowData += "<td>" + myLineArray[1] + "</td>";
                rowData += "</tr>";
            }
        }
        htmlData += rowData;
        htmlData += "</table></body></html>"
        //not usually how return data is displayed
        //usually returned as json object
        //front end parses and displays
        res.send(
            //console.log(htmlData)
            htmlData
        );
    });
});

module.exports = router;