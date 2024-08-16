const express = require("express");
const fs = require("fs")
const router = express.Router();
router.get("/", (req, res) => {
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
            rowData += "<tr>";
            rowData += "<td>" + myLineArray[0] + "</td>";
            rowData += "<td>" + myLineArray[1] + "</td>";
            rowData += "<td>" + myLineArray[2] + "</td>";
            rowData += "</tr>";
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