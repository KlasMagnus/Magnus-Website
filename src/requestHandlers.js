const exec = require("child_process").exec;

const mongoClient = require("mongodb").MongoClient
const mongoURL = "mongodb://localhost:27017/";

function start(params, response) {
    console.log("Request handler 'start' was called.")
    
    
    
    exec("dir /a", function (error, stdout, stderr) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(stdout);
        response.end();
    });
    
    
}

function queryDb(params, response) {

    console.log("Request handler 'queryDb' was called.")

    for(var pair of params.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
     }

     console.log("Querying Mongo DB")
     

     mongoClient.connect(mongoURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("webster");
        var query = { wordclass: "preposition" };
        dbo.collection("words").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          
          db.close();
        });
      });

    
    response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("queryDb was called");
    
    response.end();
}

exports.start = start
exports.queryDb = queryDb