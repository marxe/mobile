/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout)
{
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++)
    {
        navIcons.addEventListener('click', function()
        {
            this.classList.toggle('active');
        }
      );
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function()
    {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function()
    {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function()
    {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++)
        {
            if (content[i].classList.contains('has-header'))
            {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool)
    {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location)
    {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location)
        {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function()
    {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++)
        {
            if (!content[i].classList.contains('has-header'))
            {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function()
    {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function()
    {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function()
    {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1)
        {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicLoading, $ionicSideMenuDelegate)
{
  $scope.$parent.clearFabs();
  $timeout(function()
  {
      $scope.$parent.hideHeader();
  }, 0);
  ionicMaterialInk.displayEffect();

      // //show Loading
      // $ionicLoading.show({
      // content: 'Loading',
      // animation: 'fade-in',
      // showBackdrop: true,
      // maxWidth: 200,
      // showDelay: 0
      // });

    // //hide Loading
    // $ionicLoading.hide();


  $ionicSideMenuDelegate.canDragContent(false);
})
.controller('RegisterCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate, $location, users)
{
    $scope.$parent.clearFabs();
    $timeout(function()
    {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    $ionicSideMenuDelegate.canDragContent(false);

    $scope.submit = function(data){
      var newuser = new users(data);
      newuser->save();
    }
})

.controller('CategoriesCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicPopup)
{
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function()
    {
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,  $ionicActionSheet)
{
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function()
    {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function()
    {
        ionicMaterialMotion.fadeSlideInRight(
        {
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '<b>Share</b> This' },
          { text: 'Move' }
        ],
        destructiveText: 'Delete',
        titleText: 'Modify your album',
        cancelText: 'Cancel',
        cancel: function() {
             // add cancel code..
           },
        buttonClicked: function(index) {
          return true;
        }
      });

      // For example's sake, hide the sheet after two seconds
      $timeout(function() {
        hideSheet();
      }, 2000);

    };
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk)
{
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');

    $timeout(function()
    {
        ionicMaterialMotion.fadeSlideIn(
        {
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('SettingCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk)
{
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');

    $timeout(function()
    {
        ionicMaterialMotion.fadeSlideIn(
        {
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('UploadCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk)
{
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');

    $timeout(function()
    {
        ionicMaterialMotion.fadeSlideIn(
        {
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('ListCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicPopup)
{
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');

    $timeout(function()
    {
        ionicMaterialMotion.fadeSlideIn(
        {
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    // Triggered on a button click, or some other target
    $scope.bid = function()
    {
      $scope.data = {}
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show(
      {
        template: '<input type="number" ng-model="data.bid">',
        title: 'Enter Amount of your Bid',
        subTitle: 'In Pesos',
        scope: $scope,
        buttons: [{ text: 'Close' },
        {
          text: '<b>Bid</b>',
          type: 'button-positive',
          onTap: function(e)
          {
            if (!$scope.data.bid)
            {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            }
            else
            {
              return $scope.data.bid;
            }
          }
        },
      ]
    });
    myPopup.then(function(res)
    {
      console.log('Tapped!', res);
    });
   };

})

.controller('MessageCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion)
{
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown(
    {
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight(
    {
        selector: '.animate-fade-slide-in .item'
    });

})
;
