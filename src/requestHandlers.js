const exec = require("child_process").exec;

const mongoClient = require("mongodb").MongoClient
const mongoURL = "mongodb://localhost:27017/";

function start(params, response) {
    console.log("Request handler 'start' was called.")
    
    
    
    exec("dir /a", function (error, stdout, stderr) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.setheader("Access-Control-Allow-Origin", "*");
        response.end();
    });
    
    
}

function getLimerick(params, response) {

    console.log("Request handler 'getLimerick' was called.")

    for(var pair of params.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
     }

     var endOfWord = pair[0].substring(1).toUpperCase() + '$'
     var regExedEndOfWord = '/' + endOfWord + '$/i'
     console.log(endOfWord)
     //console.log(regExedEndOfWord)

     
     var query = { wordclass: "noun", word: {'$regex' : endOfWord, '$options' : 'i'}}
     var result = queryDB(query)


     behöver fixa så detta blir asynkront och fint

     const myJSON = JSON.stringify(result);

     console.log("will now return\n" + myJSON)

    
    response.setHeader('Access-Control-Allow-Origin', '*')
    //response.setHeader('Access-Control-Allow-Headers', 'application/json')
    response.writeHead(200, {"Content-Type": "application/json"});
    //response.write(myJSON);
    response.end(myJSON);
    
    // response.end();
}

function queryDB(query){
    console.log("Querying Mongo DB")
    console.log(query);
    mongoClient.connect(mongoURL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("webster");
    //var query = { wordclass: "preposition" };
    //Starts with Ro
    //var query = { wordclass: "noun", word: {'$regex' : '^Ro', '$options' : 'i'}}
    
    //var query = {word: {'$regex' : endOfWord + '$', '$options' : 'i'}}

    


    //dbo.collection("words").find(query).toArray(function(err, result)
      dbo.collection("words").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      
      db.close();
      return result;
      });
    });
}

exports.start = start
exports.getLimerick = getLimerick