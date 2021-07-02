const exec = require("child_process").exec;

function start(response) {
    console.log("Request handler 'start' was called.")
    
    
    
    exec("dir /a", function (error, stdout, stderr) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(stdout);
        response.end();
    });
    
    
}

function queryDb(response) {
    console.log("Request handler 'queryDb' was called. shoudl probably be renamed")
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("queryDb was called");
    response.end();
}

exports.start = start
exports.queryDb = queryDb