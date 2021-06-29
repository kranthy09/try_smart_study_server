// server.js

const express = require("express");
const server = express();

const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = 4000;

// << db setup >>
const db = require("./db");
const dbName = "TrySmartStudy";
const collectionName = "courses";

// << db init >>
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
    // get all items
    dbCollection.find().toArray(function(err, result) {
        if (err) throw err;
          // console.log(result);
    });

    // << db CRUD routes >>
    server.get("/course/:id", (request, response) => {
        const courseId = request.params.id;
        console.log(courseId)

        dbCollection.findOne({ id: courseId }, (error, result) => {
            if (error) throw error;
            // return item
            response.json(result);
        });
    });
    server.get("/stream/:id", (request, response) => {
        const streamId = request.params.id;
        console.log(streamId)

        dbCollection.findOne({ id: streamId }, (error, result) => {
            if (error) throw error;
            // return item
            response.json(result);
        });
    });

}, function(err) { // failureCallback
    throw (err);
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});