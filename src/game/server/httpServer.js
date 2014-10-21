var fs = require('fs');
var http = require('http');
var sio = require('socket.io');
var path = require('path');
var mime = require('mime');
var url = require('url');

var path = require('path');

var trillServer = require('./' + path.relative(__dirname, process.env.TRILL_SERVER_SRC));
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
    filePath = path.join(process.env.TRILL_SERVER_ASSET_ROOT, "/index.html");
  } else {
    filePath = path.join(process.env.TRILL_SERVER_ASSET_ROOT, request.url);
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

server.listen(url.parse(process.env.TRILL_SERVER_URL).port, "0.0.0.0", function() {
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