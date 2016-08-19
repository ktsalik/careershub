const WebServer = require('./app/server');
const MongoClient = require('mongodb').MongoClient;
const Feeder = require('./app/feeder');

var bootstrap = new Promise((resolve, reject) => {
  MongoClient.connect('mongodb://localhost:27017/careershub', function(err, db) {
    if (err) {
      reject(err);
    } else {
      var server = new WebServer(db);
      server.listen(3000);
      resolve({ db, server });
    }
  });
});

bootstrap.then(function(params) {
  var db = params.db;
  var server = params.server;
  var feeder = new Feeder('http://stackoverflow.com/jobs/feed');
  
  function updateFeed() {
    feeder.getFeed(function(items) {
      items.forEach(function(item) {
        db.collection('jobs').findOneAndUpdate({
          link: item.link
        }, {
          $set: {
            title: item.title,
            description: item.description,
            date: item.date,
            link: item.link,
            categories: item.categories,
            publisher: 'stackoverflow',
            update: Date.now()
          }
        }, {
          upsert: true
        });
      });
    });  
  }
  
  function createStatistics() {
    
  }
  
  // updateFeed();
  // setInterval(updateFeed, 600);
});