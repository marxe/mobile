'use strict';

angular.module('starter.service', [])
.service('localservice', function ()
{
  var thisUser = null;
  // this.sayHello = function () {
  //   console.log('hello');
  // };

  this.setNewUser = function (data)
  {
    thisUser = data;
  }
  this.getUser = function()
  {
      return thisUser;
  }
}
);
