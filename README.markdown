# Trill

![Trill](src/static/imgs/trill.gif)

> The press, smash, or smash, stupid game that measures your [trill](https://en.wikipedia.org/wiki/Trill_(music)) in action per minute. Compete against your friends, and crush them with your finger agility.

## Socket Server Debugging
The socket server has been decoupled from the game http server, and lives on port 8088. This allow testing the socket server via API calls.
To make calls to the socket server, install `iocat` via npm

    npm install -g iocat

Run the local socket io server, either via command line through nodejs, or use the launcher in WebStorm
Once the server is running, connect to the server via command line

    iocat --socketio ws://localhost:8088

What is left to do is then:
- Simulate browser socketio client connection _clicks_, by entering number that would represent the click rate on the client side
- Echo back periodically the updated stats of the game
- Simulate different events from the client side

## Authors
- [Charles Yang](https://github.com/snwfog)
- [Robson](https://github.com/rz-robson)
