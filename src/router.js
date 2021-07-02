function route(handle, url, response) {
    console.log("About to route a request for " + url)
    if (typeof handle[url] === 'function') {
      return handle[url](response)
    } 
    else {
      console.log("No request handler found for " + url)
      response.writeHead(404, {"Content-Type" : "text/plain"})
      response.write("404 not found unfortunately good user")
      response.end()
    }
  }
  
  exports.route = route