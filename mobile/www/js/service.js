'use strict';

angular.module('starter.service', [])
.factory('users', function ($resource)
{
  return $resource("http://localhost:81/mobile/likha/public/user/:id");
}
);
