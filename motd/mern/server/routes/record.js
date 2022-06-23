const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("Data");
  db_connect
    .collection("motds")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log('serverside record.js posting the 2nd value of array, if undefined theres no 2nd arrray yet', result[2]) // Tämä postaa koko collectionin pituuden lengthillä, nyt taulukon arvon 2
    });
    
});
// This trying ot be the random sample demonstration
recordRoutes.route("/sample").get(function (req, res) {
  let db_connect = dbo.getDb("Data");
  db_connect
    .collection("motds")
    .aggregate([{ $sample: { size: 1 } }])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log(result) // This should post the sample
    });
    
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("motds")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    author: req.body.author,
    motd: req.body.motd,
    level: req.body.level,
    randid: req.body.randid,
  };
  db_connect.collection("motds").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      author: req.body.author,
      motd: req.body.motd,
      level: req.body.level,
    },
  };
  db_connect
    .collection("motds")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("motds").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;
