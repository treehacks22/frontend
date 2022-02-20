// const path = require('path');
const express = require('express');
const https = require('http');

const app = express();
const PORT = 3000;
const SignalServer = require('react-rtc-real/server/SignalServer.js'); 

// // This displays message that the server running and listening to specified port
// app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});

// WEBSOCKET SECURED CONNECTION //
const server = https.createServer(app);
const signal = new SignalServer({ server });
signal.connect();

server.listen(PORT, () => {
    console.log('\nListening on PORT: ', PORT);
});
