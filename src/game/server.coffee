[fs, http, sio] = [require('fs'), require('http'), require('socket.io')]

deploy = "./deploy"

server = http.createServer (req, resp) ->
  resp.writeHead 200, { 'Content-type': 'text/html' }
  resp.end(fs.readFileSync("#{deploy}/index.html"))

server.listen 8080, "0.0.0.0", ->
  console.log("Received new connection")

io = sio.listen(server)
io.sockets.on 'connection', (socket) ->
  console.log "received connection"
