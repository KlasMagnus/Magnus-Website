function route(handle, method, url) {
    console.log("About to route a " + method + " request for " + url)
    if (typeof handle[url] === 'function') {
      handle[url]()
    } 
    else {
      console.log("No request handler found for " + url)
    }
  }
  
  exports.route = route