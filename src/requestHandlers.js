function start() {
    console.log("Request handler 'start' was called.")
}

function queryDb() {
    console.log("Request handler 'queryDb' was called. shoudl probably be renamed")
}

exports.start = start
exports.queryDb = queryDb