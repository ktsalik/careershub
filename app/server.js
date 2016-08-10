const express = require('express');
const webserver = express();

webserver.use(express.static(`${__dirname}/public`));

webserver.get('/', function(req, res) {
  res.sendFile(`${__dirname}/public/app.html`);
});

module.exports = webserver;
