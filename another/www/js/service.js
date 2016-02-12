'use strict';

angular.module('starter.service', [])
.service('localservice', function ($http)
{
  // this.sayHello = function () {
  //   console.log('hello');
  // };
  Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
    }
  this.logout = function()
  {
    // Simple GET request example:
    return $http({
      method: 'GET',
      url: 'http://localhost/mobile/likha/public/authen/create'
    });
  }
  this.getData = function(url)
  {
    // Simple GET request example:
    return $http({
      method: 'GET',
      url: url
    });
  }
  this.login = function(user)
  {
    // Simple POST request example:
    return $http({
      method: 'POST',
      url: 'http://localhost/mobile/likha/public/authen',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
       },
       data: Object.toparams(user)
    });
  }
  this.postReg = function(url, data)
  {
    // Simple POST request example:
    return $http({
      method: 'POST',
      url: url,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
       },
       data: Object.toparams(data)
    });
  }
  this.register = function(user)
  {
    // Simple POST request example:
    return $http({
      method: 'POST',
      withCredentials: false,
      url: 'http://localhost/mobile/likha/public/user',
       data:   Object.toparams(user),
       headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    });
  }
  this.uploadprofilepic = function(user, id)
  {
    return $http({
      method: 'POST',
      url: 'http://localhost/mobile/likha/public/photo/'+ id,
      withCredentials: true,
      // params: {id: '@id'},
      headers: {'Content-Type': undefined},
      transformRequest: angular.identity,
      data: user,
    });
  }
  this.postData = function(url,data)
  {
    return $http({
      method: 'POST',
      url: url,
      withCredentials: true,
      // params: {id: '@id'},
      headers: {'Content-Type': undefined},
      transformRequest: angular.identity,
      data: data,
    });
  }

  this.putData = function(url,data)
  {
    console.log(data);
    return $http({
      method: 'PUT',
      url: url,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
       },
       data: Object.toparams(data)
    });
  }
}
)
// $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
