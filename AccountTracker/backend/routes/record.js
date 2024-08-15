const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async (req, res) => {
  try {
    console.log("In record get route");
    let db_connect = dbo.getDb("accounts");
    console.log("connected to db");
    const cursor = await db_connect.collection("records").find({});
    let result = [];
    console.log("got collection of records");
    // Print returned documents
    for await (const doc of cursor) {
      let myobj = {
        first_name: doc.first_name,
        last_name: doc.last_name,
        email: doc.email,
        role: doc.role,
        checking: doc.checking,
        savings: doc.savings,
      };
      console.log(myobj);
      result.push(myobj);
    }
    res.json(result);
  } catch (err) {
      throw err;
  }
});

recordRoutes.route("/record/:email").get(async (req, res) => {
  try {
    let db_connect = dbo.getDb();
    let myquery = { email: req.params.email };
    const result = await db_connect.collection("records").findOne(myquery);
    let myobj = {
      first_name: result.first_name,
      last_name: result.last_name,
      email: result.email,
      phone: result.phone,
      role: result.role,
      checking: result.checking,
      savings: result.savings,
    };
    res.json(myobj);
  } catch(err) {
    throw err;
  }
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(async (req, res) => {
  try {
    console.log("goes in add route");
    //ensure email does not already exist
    // Execute query 
    let db_connect = dbo.getDb();
    const records = db_connect.collection("records");
    const query = {email: req.body.email };
    const options = {};
    const cursor = records.find(query, options);
    const numResults = await records.countDocuments(query);
    
    // Print a message if no documents were found
    if (numResults === 0) {
      console.log("No documents found!");
      let myobj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: "",
        checking: 0,
        savings: 0,
      };
      const result = await db_connect.collection("records").insertOne(myobj);
      console.log("creating object");
      res.json(myobj);
    } else {
      console.log(`Found ${numResults} documents`);
    }

    // Print returned documents
    for await (const doc of cursor) {
      console.dir(doc);
    }
  }catch (err) {
    throw err;
  }
});

// This section will help you get a list of all the records.
recordRoutes.route("/record/search").post(async (req, res) => {
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
      res.status(200).json({message: "Failure to locate email and password combo"});
    }
    else if (numResults === 1) {
      res.status(200).json({message: "Successfully found email and password combo in database!"});
    }
    else {
      res.status(200).json({message: "BAD ERROR: found more than one result for email+password combo"});
    }
    for await (const doc of cursor) {
      console.dir(doc);
    }
  } catch (err) {
      throw err;
  }
});
 
recordRoutes.route("/update/:email").post(async (req, res) => {
  try {
    let db_connect = dbo.getDb();
    let myquery = { email: req.params.email };
    if (req.body.role == "customer" || req.body.role == "manager" || req.body.role == "administrator") {
      let newValues = {
        $set: {
          role: req.body.role,
        }
      };
      const result = db_connect.collection("records").updateOne(myquery, newValues);
      console.log("1 document updated");
      res.json(result);
    }
    else {
      res.status(200).json({message: "role not valid (must be customer, manager, or administrator), try again."});
    }
    
  } catch(err) {
    throw err;
  }
});

recordRoutes.route("/deposit/:email-:account/:amount").post(async (req, res) => {
  try {
    console.log("goes into deposit route");
    const account = req.params.account.toString();
    if (account == "checking" || account == "savings" ) {
      //get the amount in the account and add the deposit amount
      let db_connect = dbo.getDb();
      const records = db_connect.collection("records");
      const query = {email: req.params.email };
      const options = {};
      const cursor = records.find(query, options);
      const numResults = await records.countDocuments(query);
      let currentVal = 0;
      if (numResults === 1) {
        for await (const doc of cursor) {
          if (account == "checking") {
            currentVal = doc.checking;
          }
          else if (account == "savings") {
            currentVal = doc.savings;
          }
        }
        console.log("current amount: " + currentVal.toString());
        let newAmount = parseInt(currentVal) + parseInt(req.params.amount);
        console.log("new amount: " + newAmount)
        let newValues = {};
        if (account == "checking") {
          newValues = {
            $set: {
              checking: newAmount,
            }
          };
        }
        else if (account == "savings") {
          newValues = {
            $set: {
              savings: newAmount,
            }
          };
        }
        const result = db_connect.collection("records").updateOne(query, newValues);
        console.log("1 document updated");
        res.json(result);
      }
    }
    else {
      res.status(200).json({message: "account not valid (must be checking or savings), try again."});
    }
    
  } catch(err) {
    throw err;
  }
});

recordRoutes.route("/withdrawl/:email-:account/:amount").post(async (req, res) => {
  try {
    console.log("goes into withdrawl route");
    const account = req.params.account.toString();
    if (account == "checking" || account == "savings" ) {
      //get the amount in the account and add the deposit amount
      let db_connect = dbo.getDb();
      const records = db_connect.collection("records");
      const query = {email: req.params.email };
      const options = {};
      const cursor = records.find(query, options);
      const numResults = await records.countDocuments(query);
      let currentVal = 0;
      if (numResults === 1) {
        for await (const doc of cursor) {
          if (account == "checking") {
            currentVal = doc.checking;
          }
          else if (account == "savings") {
            currentVal = doc.savings;
          }
        }
        console.log("current amount: " + currentVal.toString());
        let newAmount = parseInt(currentVal) - parseInt(req.params.amount);
        if (newAmount < 0) {
          res.status(500).json({message: "failure to withdraw, insignificant funds"});
        }
        else {
          console.log("new amount: " + newAmount);
          let newValues = {};
          if (account == "checking") {
            newValues = {
              $set: {
                checking: newAmount,
              }
            };
          }
          else if (account == "savings") {
            newValues = {
              $set: {
                savings: newAmount,
              }
            };
          }
          const result = db_connect.collection("records").updateOne(query, newValues);
          console.log("1 document updated");
          res.status(200).json({message: "withdrawl completed successfully"});
        }
      }
    }
    else {
      res.status(200).json({message: "account not valid (must be checking or savings), try again."});
    }
    
  } catch(err) {
    throw err;
  }
});

recordRoutes.route("/local_transfer/:email/:fromAccount-:toAccount/:amount").post(async (req, res) => {
  try {
    console.log("goes into transfer route");
    const fromAccount = req.params.fromAccount.toString();
    const toAccount = req.params.toAccount.toString();
    if ((fromAccount == "checking" || fromAccount == "savings") &&
     (toAccount == "checking" || toAccount == "savings") && 
      (toAccount != fromAccount)) {
      //get the amount in the account and add the deposit amount
      let db_connect = dbo.getDb();
      const records = db_connect.collection("records");
      const query = {email: req.params.email };
      const options = {};
      const cursor = records.find(query, options);
      const numResults = await records.countDocuments(query);
      let fromVal = 0;
      let toVal = 0;
      if (numResults === 1) {
        for await (const doc of cursor) {
          if (fromAccount == "checking") {
            fromVal = doc.checking;
            toVal = doc.savings;
          }
          else if (fromAccount == "savings") {
            fromVal = doc.savings;
            toVal = doc.checking;
          }
        }
        console.log("from amount: " + fromVal.toString());
        let newFromAmount = parseInt(fromVal) - parseInt(req.params.amount);
        if (newFromAmount < 0) {
          res.status(200).json({message: "failure to transfer, insignificant funds"});
        }
        else {
          let newToAmount = parseInt(toVal) + parseInt(req.params.amount);
          console.log("new from amount: " + newFromAmount.toString());
          console.log("new to amount: " + newToAmount.toString());
          let newValues = {};
          if (fromAccount == "checking") {
            newValues = {
              $set: {
                checking: newFromAmount,
                savings: newToAmount,
              }
            };
          }
          else if (fromAccount == "savings") {
            newValues = {
              $set: {
                savings: newFromAmount,
                checking: newToAmount,
              }
            };
          }
          const result = db_connect.collection("records").updateOne(query, newValues);
          console.log("1 document updated");
          res.status(200).json({message: "transfer completed successfully"});
        }
      }
    }
    else {
      res.status(200).json({message: "account not valid (must be checking or savings), try again."});
    }
    
  } catch(err) {
    throw err;
  }
});

module.exports = recordRoutes;