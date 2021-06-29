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
const collectionCourse = "courses";

// << db init >>
db.initialize(dbName, collectionCourse, function(dbCollection) { // successCallback

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
}, function(err) { // failureCallback
    throw (err);
});

const collectionStream = "streams";
    
// << db init >>
db.initialize(dbName, collectionStream, function(dbCollection) { // successCallback

    // << db CRUD routes >>
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