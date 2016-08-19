const fs = require('fs');
const express = require('express');
const server = express();
const objectId = require('mongodb').ObjectID;

const WebServer = function(db) {
  server.use(express.static(`${__dirname}/public`));

  server.get('/', function(req, res) {
    res.sendFile(`${__dirname}/public/app.html`);
  });

  server.get('/api', function(req, res) {
    res.json({
      version: '1.0.0',
      statistics: {
        topCategories: JSON.parse(fs.readFileSync(__dirname + '/statistics/categories.json')).slice(0, 15)
      }
    });
  });

  server.get('/api/jobs/latest', function(req, res) {
    db.collection('jobs').find().sort({ date: -1 }).limit(15).toArray(function(err, jobs) {
      if (!err) {
        res.json(jobs);  
      } else {
        res.status(409).json(err);
      }
    });
  });
  
  server.get('/api/jobs/:id', function(req, res) {
    db.collection('jobs').findOne({ _id: objectId(req.params.id) }, function(err, job) {
      if (!err) {
        res.json(job);
      } else {
        res.status(409).json(err);
      }
    });
  });
  
  server.get('/api/jobs', function(req, res) {
    var page = req.query.page || 1;
    var q = req.query.q;
    var categories = [];
    if (req.query.category) categories = req.query.category.split(',');
    
    var query = {};
    
    if (categories.length) query.categories = { $in: categories };
    if (q) query.$text = { $search: q };
    
    if (Object.keys(query).length > 0) {
      var countJobs = db.collection('jobs').count(query);
      var getJobs = db.collection('jobs').find(query).skip((page - 1) * 15).limit(15).sort({ date: -1 });
    } else {
      var countJobs = db.collection('jobs').count();
      var getJobs = db.collection('jobs').find().skip(page * 15).limit(15).sort({ date: -1 });
    }
    
    Promise.all([
      countJobs,
      getJobs
    ]).then(function(results) {
      results[1].toArray(function(err, jobs) {
        res.json({
          count: results[0],
          jobs: jobs
        });
      });
    });
  });
  
  return server;
};

module.exports = WebServer;
