angular.module('angbaseApp')
  .factory('IncumbentCommitteeFactory', function ($q, $http) {
    return function(id) {
      //need to resolve how to get data if the json is 1000
      this.getSchA = function () {
        var url = 'http://data.sfgov.org/resource/q66q-d2tr.json?filer_id='+id;
        

        var deferred = $q.defer(),
          httpPromise = $http.get(url);
 
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });
 
        return deferred.promise;
      };
      this.getSchE=function () {
        var url = 'http://data.sfgov.org/resource/hc26-j9if.json?filer_id='+id;
        
        var deferred = $q.defer(),
          httpPromise = $http.get(url);
 
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });
 
        return deferred.promise;
      };
      this.getSum= function () {
        var url = 'http://data.sfgov.org/resource/4tts-fyix.json?filer_id='+id;
        
        var deferred = $q.defer(),
          httpPromise = $http.get(url);
 
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });
 
        return deferred.promise;
      }
    }
    /*
      this.getLobbyContact=function () {
        var url = ''+naml;
        
        var deferred = $q.defer(),
          httpPromise = $http.get(url);
 
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });
 
        return deferred.promise;
      };
      this.getLobbyContribution= function () {
        var url = ''+naml;
        
        var deferred = $q.defer(),
          httpPromise = $http.get(url);
 
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });
 
        return deferred.promise;
    };
    */
  })