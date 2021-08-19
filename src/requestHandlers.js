const exec = require("child_process").exec;

const mongoClient = require("mongodb").MongoClient
const mongoURL = "mongodb://localhost:27017/";

const https = require('https')

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
     queryDB(query, response)


     

     
    
    // response.end();
}

function queryDB(query, response){
    console.log("Querying Mongo DB")
    console.log(query);
    mongoClient.connect(mongoURL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("webster");
    
      dbo.collection("words").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      
      db.close();
      
      const myJSON = JSON.stringify(result);
      
      //test conceptNet
      queryConceptNet("bear");


      console.log("will now return\n" + myJSON)
      response.setHeader('Access-Control-Allow-Origin', '*')
      //response.setHeader('Access-Control-Allow-Headers', 'application/json')
      response.writeHead(200, {"Content-Type": "application/json"});
      //response.write(myJSON);
      response.end(myJSON);


      });
    });
}

function queryConceptNet(word) {

    console.log("GET CN : http://api.conceptnet.io/c/en/" + word)

    https.get("https://api.conceptnet.io:443/c/en/" + word, (resp) => {
        let data = '';


        

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(data);
        });

        }).on("error", (err) => {
        console.log("Error: " + err.message);

    })

}

exports.start = start
exports.getLimerick = getLimerick