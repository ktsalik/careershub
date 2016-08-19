var fs = require('fs');
var Feeder = require('./app/feeder');
var MongoClient = require('mongodb').MongoClient;
var request = require('request');

var mongoConnect = new Promise((resolve, reject) => {
  MongoClient.connect('mongodb://localhost:27017/careershub', function(err, db) {
    resolve(db);
    // db.close();
  });
});

// var getFeed = new Promise((resolve, reject) => {
//   var stackoverflowFeeder = new Feeder('http://stackoverflow.com/jobs/feed');
//   stackoverflowFeeder.getFeed(function(items) {
//     resolve(items.map(function(item) {
//       return {
//         title: item.title,
//         description: item.description,
//         date: item.date,
//         link: item.link,
//         categories: item.categories,
//         publisher: 'stackoverflow'
//       };
//     }));
//   });
// });

// Promise.all([mongoConnect, getFeed]).then(params => storeItems.apply(this, params));

// function storeItems(db, items) {
//   db.collection('jobs').insertMany(items);
// }

// Promise.all([mongoConnect]).then(function(params) {
//   var db = params[0];
//   var getCategories = db.collection('jobs').distinct('categories');
//   var getAllJobs = db.collection('jobs').find();
//   var countAllJobs = getAllJobs.count();
//   
//   Promise.all([getCategories, getAllJobs, countAllJobs]).then(function(data) {
//     var categoriesCount = {};
//     
//     data[0].forEach(category => {
//       categoriesCount[category] = 0;
//     });
//     
//     var processed = 0;
//     
//     new Promise((resolve, reject) => {
//       data[1].forEach(function(job) {
//         if (job.categories)
//           job.categories.forEach(function(category) {
//             categoriesCount[category]++;
//             processed++;
//             if (processed == data[2]) resolve();
//           });
//       });
//     }).then(function() {
//       function retrieveNextMax() {
//         var max = 0;
//         var maxCategory;
//         for (var category in categoriesCount) {
//           if (categoriesCount[category] > max) {
//             max = categoriesCount[category];
//             maxCategory = category;
//           }
//         }
//         delete categoriesCount[maxCategory];
//         return { name: maxCategory, jobsCount: max };
//       }
//       
//       var categoryStatistics = [];
//       for (var i = 0; i < data[0].length; i++) categoryStatistics.push(retrieveNextMax());
//       db.close();
//       var write = fs.writeFileSync(__dirname + '/app/statistics/categories.json', JSON.stringify(categoryStatistics));
//     });
//     
//   });
// });

request({
  method: 'GET',
  url: 'https://jobs.github.com/positions.json',
  qs: {
    description: 'javascript'
  },
  json: true
}, function(err, response, body) {
  var jobs = body;
  console.log(jobs[0])
});