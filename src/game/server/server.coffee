fs   = require('fs')
http = require('http')
sio  = require('socket.io')
path = require('path')
mime = require('mime')

connectionCache = {}
staticPageCache = {}
deploy = "./deploy"

server = http.createServer (request, response) ->
  filePath = false;
  if (request.url == '/')
    filePath = "./#{deploy}/index.html"
  else
    filePath = "./#{deploy}/#{request.url}"

  console.log("Sending #{filePath} to the client...")
  serveStatic(response, staticPageCache, filePath)

serveStatic = (response, cache, absPath) ->
  if (cache[absPath])
    sendFile(response, absPath, cache[absPath])
  else
    fs.exists absPath, (exists) ->
      if (exists)
        fs.readFile absPath, (err, data) ->
          if (err)
            send404(response)
          else
            cache[absPath] = data
            sendFile(response, absPath, data);
      else
        send404(response)

server.listen 8080, "0.0.0.0", ->
  console.log("Received new connection")

sendFile = (response, filePath, fileContents) ->
  response.writeHead(200,
    {
      "Content-type": mime.lookup(path.basename(filePath))
    })

  response.end(fileContents)

send404 = (response) ->
  response.writeHead(404, { 'Content-Type': 'text/plain' })
  response.write('Error 404: resourse not found')
  response.end()


trillServer = require('./trill-server')
trillServer.listen(server)