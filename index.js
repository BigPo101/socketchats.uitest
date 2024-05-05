// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3030;
const { ADMINS, COMMANDS, RANKS } = require('./cmdStuff.js');

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

let numUsers = 0;

io.on('connection', (socket) => {
  socket.emit('init', { ADMINS, COMMANDS });

  let addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    let message = data;
    if (message) {
      let parts = message.split(' ');
      let prefix = parts[0]; // Extract the command prefix
      let args = parts.slice(1); // Extract the arguments after the prefix
  
      let command = COMMANDS.find((cmd) => cmd.prefix === prefix);
      if (command) {
        let user = ADMINS.find((admin) => admin.username === socket.username);
        if (user) {
          let userRank = user.rank;
          let requiredRank = command.rankReq;
          let userRankWeight = RANKS.find((rank) => rank.rank === userRank)?.weight;
          let requiredRankWeight = RANKS.find((rank) => rank.rank === requiredRank)?.weight;
  
          if (userRankWeight !== undefined && requiredRankWeight !== undefined && userRankWeight >= requiredRankWeight) {
            if (command.target && args.length > 0) {
              socket.broadcast.emit('new message', {
                username: socket.username,
                message: {
                  target: args[0],
                  script: command.script
                }
              });
            } else {
              // User has the required rank to execute the command but no target provided
              // Handle this case if necessary
            }
          } else {
            // User does not have the required rank
            socket.emit('new message', {
              username: socket.username,
              message: `You do not have permission to run this command. Required rank: ${requiredRank}`
            });
          }
        }
      } else {
        // Command not found, broadcast the message as is
        socket.broadcast.emit('new message', {
          username: socket.username,
          message: message
        });
      }
    } else {
      // Empty message
      socket.broadcast.emit('new message', {
        username: socket.username,
        message: "Message is undefined or empty."
      });
    }
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});