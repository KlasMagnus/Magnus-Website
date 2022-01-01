const exec = require("child_process").exec;

const mongoClient = require("mongodb").MongoClient;
const mongoURL = "mongodb://localhost:27017/";

const https = require("https");

function start(params, response) {
  console.log("Request handler 'start' was called.");

  exec("dir /a", function (error, stdout, stderr) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.setheader("Access-Control-Allow-Origin", "*");
    response.end();
  });
}

function getPoem(params, response) {
  console.log("Request handler 'getPoem' was called.");
  const parameters = Object.fromEntries(params.entries());

  queryConceptNetWithPromise(parameters.word)
    .then((result) => console.log(result.toString()))
    .catch((err) => {
      console.log(err);
    });

  BuildPoem(params, response);
}

function getLimerick(params, response) {
  console.log("Request handler 'getLimerick' was called.");

  for (var pair of params.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  var endOfWord = pair[0].substring(1).toUpperCase() + "$";
  var regExedEndOfWord = "/" + endOfWord + "$/i";
  console.log(endOfWord);
  //console.log(regExedEndOfWord)

  var query = { wordclass: "noun", word: { $regex: endOfWord, $options: "i" } };
  queryDB(query, response);

  // response.end();
}

function queryDB(query, response) {
  console.log("Querying Mongo DB");
  console.log(query);
  mongoClient.connect(mongoURL, function (err, db) {
    if (err) throw err;
    var dbo = db.db("webster");

    dbo
      .collection("words")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);

        db.close();

        const myJSON = JSON.stringify(result);

        // Create array of object keys, ["311", "310", ...]
        const keys = Object.keys(result);

        // Generate random index based on number of keys
        const randIndex = Math.floor(Math.random() * keys.length);

        // Select a key from the array of keys using the random index
        const randKey = keys[randIndex];

        // Use the key to get the corresponding name from the "names" object
        const name = result[randKey];

        console.log(
          "Chose " +
            name.word.toLowerCase() +
            " from mongoDb result. Will now query ConceptNet with this"
        );

        const poem = "Your name is " + name;

        //test conceptNet
        queryConceptNet(name.word.toLowerCase());

        console.log("will now return\n" + myJSON);
        response.setHeader("Access-Control-Allow-Origin", "*");
        //response.setHeader('Access-Control-Allow-Headers', 'application/json')
        response.writeHead(200, { "Content-Type": "application/json" });
        //response.write(myJSON);
        response.end(myJSON);
      });
  });
}

function queryConceptNet(word) {
  console.log("GET CN : http://api.conceptnet.io/c/en/" + word);

  https
    .get("https://api.conceptnet.io:443/c/en/" + word, (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        const conceptNode = JSON.parse(data);

        console.log("No of edges: " + conceptNode.edges.length);

        //console.log("Edges:\n" + conceptNode.edges);

        for (var i = 0; i < conceptNode.edges.length; i++) {
          var edge = conceptNode.edges[i];
          //console.log(edge)
          console.log(
            edge.start.label + " " + edge.rel.label + " " + edge.end.label
          );
        }

        // array.forEach(element => {
        //     element.
        // });

        //console.log(data);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}

function queryConceptNetWithPromise(word) {
  return new Promise(function (resolve, reject) {
    const req = https.get(
      "https://api.conceptnet.io:443/c/en/" + word,
      (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          const conceptNode = JSON.parse(data);

          console.log("No of edges: " + conceptNode.edges.length);

          //console.log("Edges:\n" + conceptNode.edges);

          for (var i = 0; i < conceptNode.edges.length; i++) {
            var edge = conceptNode.edges[i];
            //console.log(edge)
            console.log(
              edge.start.label + " " + edge.rel.label + " " + edge.end.label
            );

            resolve(conceptNode);
          }

          // array.forEach(element => {
          //     element.
          // });

          //console.log(data);
        });
      }
    );
    // reject on request error
    req.on("error", function (err) {
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });

    // IMPORTANT
    req.end();
  });
}

function HandleEdge() {}

function BuildPoem(params, response) {
  //Get params: Is the WORD a name or not?
  //***** Ex 1 here word is not a name *******
  //query conceptnet using word
  //is there at least one conceptnet edge with fitting relation?
  //yes: choose a conceptnet relation and word
  //no: TODO
  //from chosen relation choose if start or end word of relation should end the 1st sentence
  //and build 1st sentence
  //query webster DB for a word that rhymes with end of 1st sentence
  //did we find a rhyming word?
  //no: TODO
  //yes: Query ConceptNet with our newly chosen Webster Word
  //is there a fitting relation?
  //no: TODO
  //yes: create 2nd sentence using relation, sentence ending with the Webster Word
  //find word from webster db that rhymes with WORD
  //
  //****** Example2 WORD IS name build first sentence from presets and ending with Name
}

function QueryDBWithPromise(query) {
  console.log("Querying Mongo DB");
  console.log(query);

  MongoClient.connect(mongoURL)
    .then(function (db) {
      //converted
      db.collection("words")
        .find(query)
        .toArray.then(function (data) {
          console.log(data);
          return data;
        })
        .catch(function (err) {
          //failure callback
          console.log(err);
          return err;
        });
    })
    .catch(function (err) {
      return err;
    });

  //My old example
  // mongoClient.connect(mongoURL, function(err, db) {
  // if (err) throw err;
  // var dbo = db.db("webster");

  // dbo.collection("words").find(query).toArray(function(err, result) {
  // if (err) throw err;
  // console.log(result);

  // db.close();

  // const myJSON = JSON.stringify(result);
}

exports.start = start;
exports.getLimerick = getLimerick;
exports.getPoem = getPoem;
