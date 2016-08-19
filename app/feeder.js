var FeedParser = require('feedparser');
var request = require('request');

var Feeder = function(url) {
  
  this.url = url;
  
  this.parser = new FeedParser();
  
  this.items = [];
  
};

Feeder.prototype.getFeed = function(callback) {
  var feeder = this;
  
  var rssRequest = request.get(feeder.url);
  
  rssRequest.on('response', function(response) {
    this.pipe(feeder.parser);
  });
  
  rssRequest.on('end', function() {
    if (typeof callback === 'function') {
      callback.call(feeder, feeder.items);
    }
  });
  
  feeder.parser.on('readable', function() {
    var item;
    
    while (item = this.read()) {
      feeder.items.push(item);
    }
  });
  
};

module.exports = Feeder;