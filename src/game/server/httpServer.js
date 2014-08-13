var fs = require('fs');
var http = require('http');
var sio = require('socket.io');
var path = require('path');
var mime = require('mime');

var trillServer = require('./trillServer');
var log = console.log;

var connectionCache = {};
var staticPageCache = {};

// Path assumption:
//  src -> all js created by us
//  lib -> all deps created by other (valid bower deps)
//  style -> static style sheets

var server = http.createServer(function(request, response) {
  var filePath = false;
  if (request.url === '/') {
    filePath = "./src/static/index.html";
  } else {
    filePath = "./src" + request.url;
  }

  log("Sending " + filePath + " to the client...");
  return serveFile(response, staticPageCache, filePath);
});

var serveFile = function(response, cache, absPath) {
  log("Sending file %s", absPath);
  if (cache[absPath]) {
    return sendFile(response, absPath, cache[absPath]);
  } else {
    return fs.exists(absPath, function(exists) {
      if (exists) {
        return fs.readFile(absPath, function(err, data) {
          if (err) {
            return send404(response);
          } else {
            cache[absPath] = data;
            return sendFile(response, absPath, data);
          }
        });
      } else {
        return send404(response);
      }
    });
  }
};

server.listen(8080, "0.0.0.0", function() {
  return log("Received new connection");
});

var sendFile = function(response, filePath, fileContents) {
  response.writeHead(200, {
    "Content-type": mime.lookup(path.basename(filePath))
  });
  return response.end(fileContents);
};

var send404 = function(response) {
  response.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  response.write('Error 404: resource not found');
  return response.end();
};

trillServer.listen(server);