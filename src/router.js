function route(handle, url, response) {
    console.log("About to route a request for " + url)

    const params = new URLSearchParams(url)
    console.log(params.get('/q'))
    const firstParam = params.get('/q')
    
    console.log("First param is " + firstParam)

    if (typeof handle[firstParam] === 'function') {
      return handle[firstParam](params, response)
    } 
    else {
      console.log("No request handler found for " + firstParam)
      response.writeHead(404, {"Content-Type" : "text/plain"})
      response.write("404 not found unfortunately good user")
      response.end()
    }
  }
  
  exports.route = route