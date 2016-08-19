angular
  .module('CareersHub', [
    'ui.router',
    'angularMoment'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state({
        name: 'index',
        url: '/',
        views: {
          header: {
            templateUrl: 'views/header.html'
          },
          content: {
            templateUrl: 'views/index.html',
            controller: 'IndexController',
            controllerAs: 'index',
            resolve: {
              getLatest: function($http) {
                return $http.get('/api/jobs/latest').then(function(response) {
                  var jobs = response.data;
                  jobs.forEach(function(job) {
                    var titleParts = job.title.split('at');
                    job.title = titleParts[0];
                    job.at = titleParts[1];
                  });
                  return jobs;
                });
              }
            }
          }
        }
      })
      .state({
        name: 'jobDetail',
        url: '/jobs/:jobId',
        views: {
          header: {
            templateUrl: 'views/header.html'
          },
          content: {
            templateUrl: 'views/job-detail.html',
            controller: 'JobDetailController',
            controllerAs: 'jobDetail',
            resolve: {
              getJob: function($http, $stateParams, $sce) {
                return $http.get('/api/jobs/' + $stateParams.jobId).then(function(response) {
                  var job = response.data;
                  var titleParts = job.title.split('at');
                  job.title = titleParts[0];
                  job.at = titleParts[1];
                  job.description = $sce.trustAsHtml(job.description);
                  return job;
                });
              }
            }
          }
        }
      })
      .state({
        name: 'jobs',
        url: '/jobs?category&q',
        views: {
          header: {
            templateUrl: 'views/header.html'
          },
          content: {
            templateUrl: 'views/job-list.html',
            controller: 'JobListController',
            controllerAs: 'jobList',
            resolve: {
              getJobs: function($http, $stateParams, $httpParamSerializer) {
                return $http.get('/api/jobs?' + $httpParamSerializer($stateParams)).then(function(response) {
                  var jobs = response.data.jobs;
                  jobs.forEach(function(job) {
                    var titleParts = job.title.split('at');
                    job.title = titleParts[0];
                    job.at = titleParts[1];
                  });
                  return {
                    count: response.data.count,
                    jobs: jobs
                  };
                });
              }
            }
          }
        }
      })
      
    $urlRouterProvider.otherwise('/');
  });