// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.service', 'ngFileUpload',  'imageupload', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);
    $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.activity', {
        url: '/activity',
        views: {
            'menuContent': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.list', {
        url: '/list',
        views: {
            'menuContent': {
                templateUrl: 'templates/list.html',
                controller: 'ListCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.editing', {
        url: '/editing',
        views: {
            'menuContent': {
                templateUrl: 'templates/editing.html',
                controller: 'EditingCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.selection', {
        url: '/selection',
        views: {
            'menuContent': {
                templateUrl: 'templates/selection.html',
                controller: 'SelectCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.portfolio', {
        url: '/portfolio',
        views: {
            'menuContent': {
                templateUrl: 'templates/portfolio.html',
                controller: 'PortfolioCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.category', {
        url: '/category',
        views: {
            'menuContent': {
                templateUrl: 'templates/category.html',
                controller: 'CategoriesCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.message', {
        url: '/message',
        views: {
            'menuContent': {
                templateUrl: 'templates/message.html',
                controller: 'MessageCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.admin', {
        url: '/admin',
        views: {
            'menuContent': {
                templateUrl: 'templates/admin.html',
                controller: 'AdminCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.upload', {
        url: '/upload',
        views: {
            'menuContent': {
                templateUrl: 'templates/upload.html',
                controller: 'UploadCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.register', {
        url: '/register',
        views: {
            'menuContent': {
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.profilepicture', {
        url: '/profilepicture',
        views: {
            'menuContent': {
                templateUrl: 'templates/profilepicture.html',
                controller: 'RegisterCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($scope, $timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/

                }
            }
        }
    })
    .state('app.feedback', {
        url: '/feedback',
        views: {
            'menuContent': {
                templateUrl: 'templates/feedback.html',
                controller: 'FeedbackCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($scope, $timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/

                }
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');


})
.directive('ngFileSelect', [ '$parse', '$timeout', function($parse, $timeout) {
    return function(scope, elem, attr) {
            var fn = $parse(attr['ngFileSelect']);
            elem.bind('change', function(evt) {
                var files = [], fileList, i;
                fileList = evt.target.files;
                if (fileList != null) {
                    for (i = 0; i < fileList.length; i++) {
                        files.push(fileList.item(i));
                        // console.log(files);
                    }
                }
                $timeout(function() {
                    fn(scope, {
                        $files : files,
                        $event : evt
                    });
                });
            });
        };
        // $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    }])
    .directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});

;
