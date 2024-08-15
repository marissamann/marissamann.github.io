const express = require("express");
const routes = express.Router();
// This will help us connect to the database
const dbo = require("../db/conn");

routes.route("/session_register").post(async function (req, res) {
    console.log("in session_register");
    let status = "";
    console.log("current session: " + req.session.username);
    console.log("body: " + req.body);
    console.log("input email: " + req.body.email);
    console.log("input password: " + req.body.password);

    try {
        console.log("In record get route (email and password)");
        let db_connect = dbo.getDb();
        const records = db_connect.collection("records");
        console.log(req.body.email);
        const query = {email: req.body.email, password: req.body.password};
        const options = {};
        const cursor = records.find(query, options);
        const numResults = await records.countDocuments(query);
        console.log(`Found ${numResults} documents`);
        if (numResults === 0) {
          if ((req.session.username != req.body.email) && req.body.email && req.body.password) {
            req.session.username = req.body.email;
            status = "Session set";
            console.log(status + " " + req.body.email);
            const resultObj = { status: status };
            res.json(resultObj);
            //res.status(400).json(status);
          } else if ((req.session.username == req.body.email) && req.body.email && req.body.password) {
            status = "Session already exists";
            console.log(status + " " + req.body.email);
            const resultObj = { status: status };
            // req.session.destroy();
            // console.log("TEMP destroy session");
            //res.json(resultObj);
            res.status(500).json(status);
          }
        }
        else if (numResults === 1) {
            status = "Session already exists";
            console.log(status + " " + req.body.email);
            const resultObj = { status: status };
            //res.json(resultObj);
            res.status(500).json(status);
        }
        else {
          res.status(500).json({message: "BAD ERROR: found more than one result for email+password combo"});
        }
      } catch (err) {
          throw err;
      }
});

routes.route("/session_login").post(async function (req, res) {
  console.log("in session_login");
  let status = "";
  console.log("current session: " + req.session.username);
  console.log("body: " + req.body);
  console.log("input email: " + req.body.email);
  console.log("input password: " + req.body.password);

  try {
      console.log("In record get route (email and password)");
      let db_connect = dbo.getDb();
      const records = db_connect.collection("records");
      console.log(req.body.email);
      const query = {email: req.body.email, password: req.body.password};
      const options = {};
      const cursor = records.find(query, options);
      const numResults = await records.countDocuments(query);
      console.log(`Found ${numResults} documents`);
      if (numResults === 1) {
        if ((req.session.username != req.body.email) && req.body.email && req.body.password) {
          req.session.username = req.body.email;
          status = "Session set";
          console.log(status + " " + req.body.email);
          const resultObj = { status: status };
          res.json(resultObj);
          //res.status(400).json(status);
        } else if ((req.session.username == req.body.email) && req.body.email && req.body.password) {
          status = "Session already exists";
          console.log(status + " " + req.body.email);
          const resultObj = { status: status };
          // req.session.destroy();
          // console.log("TEMP destroy session");
          //res.json(resultObj);
          res.status(500).json(status);
        }
      }
      else if (numResults === 0) {
          status = "Session already exists";
          console.log(status + " " + req.body.email);
          const resultObj = { status: status };
          //res.json(resultObj);
          res.status(500).json(status);
      }
      else {
        res.status(500).json({message: "BAD ERROR: found more than one result for email+password combo"});
      }
    } catch (err) {
        throw err;
    }
});

routes.route("/session_logout").get(async function (req, res) {
    console.log("in session_delete");
    req.session.destroy();

    let status = "No session set";
    
    const resultObj = { status: status};

    res.json(resultObj);
});

routes.route("/session_check").post(async function (req, res) {
  console.log("in session_login");
  let status = "";
  console.log("current session: " + req.session.username);
  console.log("body: " + req.body);
  console.log("input email: " + req.body.email);

  try {
      console.log("In session check");
      if (req.session.username && (req.session.username == req.body.email)) {
        status = "Session exists";
        console.log(status);
        const resultObj = { status: status };
        res.json(resultObj);
      }
      else {
        status = "Session does not exist";
        console.log(status);
        res.status(500).json(status);
      }
    } catch (err) {
        throw err;
    }
});


module.exports = routes;