const compression = require('compression');
const path = require('path');
const express = require('express');
const app = express(); 
const port = process.env.PORT || 8080;

// Gzip
app.use(compression());

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(port, function() {
  // console.log(server);
  // var host = this.server.address;
  // var port = this.port;
  // console.log('app listening to ' + host + ':' + port);
});

// For all GET requests, send back index.html so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

//console.log(`Server listening on ${port}`);
