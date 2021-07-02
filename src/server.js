const http = require('http')
const url = require('url')

//const {parse: parseQuery} = require('queryString')

const serverOrigin = "http://localhost:3000"

function start(route, handle){

  function onRequest(request, response) {
   
    const { method, url } = request;
    //console.log(method)
    console.log(url)
    // const myURL = request.URL
    // console.log(myURL.URL)

    // const path = myURL.pathName
    // console.log("hello" + path)

    //console.log(request)
    //const myURL = new URL("/foo", "http://localhost:3000")
    
    // //console.log(aURL)
    // const myURL = new URL(request.URL, "http://localhost:3000")

    // const pathName = JSON.stringify(myURL.pathname)    
    // let pathName = parseurl
    // console.log("Request received for " + pathName)

    
    
    route(handle, url, response)
  }
  
  http.createServer(onRequest).listen(3000)
  
  console.log("Server has started")

}

exports.start = start



// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('Hello World!\n')
// })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })