/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, localservice, $location)
{
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

    $scope.userout = function(){
        localservice.logout().success(function(data, status, headers, config) {
            $location.path('app/login');
            }).error(function(data, status, headers, config) {
                console.log(data);
                localStorage.setItem("user_type",'');
            });
    }
})

.controller('LoginCtrl', function($filter, $scope, $timeout, $stateParams, ionicMaterialInk, $location, $ionicLoading, $ionicSideMenuDelegate, localservice)
{
  $scope.error;
  $scope.$parent.clearFabs();
  $timeout(function()
  {
      $scope.$parent.hideHeader();
  }, 0);
  ionicMaterialInk.displayEffect();

  localservice.getData('http://192.168.1.15:81/mobile/likha/public/authen').success(function(data, status, headers, config) {
      if(data.userid)
      {
        localservice.getData('http://192.168.1.15:81/mobile/likha/public/user/'+data.userid+'').success(function(data, status, headers, config) {
              localStorage.setItem("userid", data.data.userid);
              localStorage.setItem("user_type", data.data.user_type);
            }).error(function(data, status, headers, config) {
                console.log(data);
                $ionicLoading.hide();
            });
      }
      }).error(function(data, status, headers, config) {
          console.log(data);
      });

  $scope.Userin = function(me){
    //show Loading
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
    // console.log(me);
    localservice.login(me).success(function(data, status, headers, config) {
          console.log(data.logined);
          if(data.logined == "no"){
            //
            $scope.error = data.reply;
            console.log(data.logined);
          }
          else if(data.logined == "yes"){
            $location.path('app/profile');
          }
          $ionicLoading.hide();
        }).error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
        });

  };


  $ionicSideMenuDelegate.canDragContent(false);
})
.controller('RegisterCtrl', function( $ionicLoading, $filter, $scope, $timeout, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate, localservice, $location)
{
    $scope.$parent.clearFabs();
    $scope.error;
    $scope.message;
    $scope.newUser={};

    $timeout(function()
    {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    $ionicSideMenuDelegate.canDragContent(false);

    $scope.submit= function()
    {
      console.log($scope.newUser);
      //show Loading
      $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
      });
      $scope.newUser.birthday = $filter('date')($scope.newUser.birthday, "yyyy-MM-dd");
      localservice.register($scope.newUser).success(function(data, status, headers, config) {
            if(data.errors)
            {
              $scope.error = data.errors;
              $scope.message = data.message;
            }
            else{
              localStorage.setItem("userid",data.data);
              console.log($scope.user);
              $location.path('app/profilepicture');

            }
            $ionicLoading.hide();
          }).error(function(data, status, headers, config) {
              console.log(data);
              $ionicLoading.hide();
          });
      //
    }

    $scope.file={};
  $scope.onFileSelect = function (files)
  {
    $scope.file.profilepicture=files[0];
  };
  $scope.add = function()
  {
    console.log($scope.file);
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
    var fd = new FormData();
    //Take the first selected file
    fd.append("profilepicture", $scope.file.profilepicture);

    console.log(fd);
    localservice.uploadprofilepic(fd, localStorage.getItem("userid")).success(function(data, status, headers, config) {
          if(data.errors)
          {
            $scope.error = data.errors;
            $scope.message = data.message;
            console.log(data);
          }
          else{
            $scope.message = data.message;
            $location.path('app/login');

          }
          $ionicLoading.hide();
        }).error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
        });
  }
})

.controller('CategoriesCtrl', function($location, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicPopup)
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
    $scope.storeCategory = function(data)
    {
      localStorage.setItem("Category", data);
      $location.path('app/list');
    }
})

.controller('ProfileCtrl', function($location,$ionicPopup, $ionicLoading, localservice, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,  $ionicActionSheet)
{
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.itemid=localStorage.getItem("itemid");
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

    //show Loading
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
    $scope.user={};
    localservice.getData('http://192.168.1.15:81/mobile/likha/public/authen').success(function(data, status, headers, config) {
      localservice.getData('http://192.168.1.15:81/mobile/likha/public/user/'+data.userid+'').success(function(data, status, headers, config) {
            console.log(data);
            $scope.user = data.data;
            $scope.bid = data.bid;
            $scope.item = data.item;
            $scope.user.profilepicture= 'http://192.168.1.15:81/mobile/likha/public/uploads/'+data.data.profilepicture;
            $ionicLoading.hide();
            console.log(data.data);
            localStorage.setItem("userid",$scope.user.userid);
            localStorage.setItem("user_type", $scope.user.user_type);
            $scope.user_type = localStorage.getItem("user_type");
            if (  $scope.user_type == 'd'){
                $scope.show = true;
            } else if (  $scope.user_type == 'a') {
                $scope.show = false;
            }
          }).error(function(data, status, headers, config) {
              console.log(data);
              $ionicLoading.hide();
          });
        }).error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
        });
        $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
        });
        localservice.getData('http://192.168.1.15:81/mobile/likha/public/item/'+localStorage.getItem("Category")+'/edit').success(function(data, status, headers, config) {
              $scope.data = data.data;
              // $scope.data.users.profilepicture = 'http://192.168.1.15:81/mobile/likha/public/uploads/'+data.data.users.profilepicture;
              // $scope.data.item_picture = 'http://192.168.1.15:81/mobile/likha/public/uploads/'+data.data.item_picture;
              console.log($scope.data);
              $ionicLoading.hide();
            }).error(function(data, status, headers, config) {
                console.log(data);
                $ionicLoading.hide();
            });
        localservice.getData('http://192.168.1.15:81/mobile/likha/public/bid/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
              $scope.user = data.data;
              console.log($scope.user);
              $ionicLoading.hide();
            }).error(function(data, status, headers, config) {
                console.log(data);
                $ionicLoading.hide();
            });
          $scope.selection = function(id, data){
            localStorage.setItem("itemid", id);
            $location.path('app/selection');
          }
})

.controller('SelectCtrl', function($location, localservice, $ionicLoading, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk)
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
    //show Loading
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
    $scope.select={};
    $scope.bidselect={};
    // Activate ink for controller
    console.log(localStorage.getItem("itemid"));
    ionicMaterialInk.displayEffect();
    localservice.getData('http://192.168.1.15:81/mobile/likha/public/bid/'+localStorage.getItem("itemid")+'').success(function(data, status, headers, config) {
          console.log(data);
          $scope.artisan=data.data;
          $ionicLoading.hide();
        }).error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
        });
        $scope.save=function(userid){
          $scope.select.userid = userid;
          $scope.select.itemid = localStorage.getItem("itemid");
          $scope.select.progress = "0";

          $scope.bidselect.userid = userid;
          $scope.bidselect.itemid = localStorage.getItem("itemid");
          $scope.bidselect.status = "0";
        }
        $scope.record = function(){
          console.log($scope.select);
          localservice.putData('http://192.168.1.15:81/mobile/likha/public/item/'+localStorage.getItem("itemid"),$scope.select).success(function(data, status, headers, config) {
                if(data.errors)
                {
                  $scope.error = data.errors;
                  $scope.message = data.message;
                }
                else{
                  localservice.putData('http://192.168.1.15:81/mobile/likha/public/bid/'+localStorage.getItem("itemid"),$scope.bidselect).success(function(data, status, headers, config) {
                        if(data.errors)
                        {
                          $scope.error = data.errors;
                          $scope.message = data.message;
                        }
                        else{
                          $location.path('app/profile');
                        }
                        $ionicLoading.hide();
                      }).error(function(data, status, headers, config) {
                          console.log(data);
                          $ionicLoading.hide();
                      });
                }
                $ionicLoading.hide();
              }).error(function(data, status, headers, config) {
                  console.log(data);
                  $ionicLoading.hide();
              });

        }

})
.controller('ActivityCtrl', function($location, localservice, $ionicLoading, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk)
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
    //show Loading
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
    $scope.dataProgress={};
    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    localservice.getData('http://192.168.1.15:81/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
          $scope.user = data.data;
          $scope.item = data.item;
          $scope.bid = data.bid;
          $ionicLoading.hide();
        }).error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
        });
        $scope.setProgress = function(id, percent){
          //show Loading
          $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
          });
          localStorage.setItem("itemid", id);
          $scope.dataProgress.progress = percent;

          localservice.putData('http://192.168.1.15:81/mobile/likha/public/item/'+localStorage.getItem("itemid"),$scope.dataProgress).success(function(data, status, headers, config) {
                if(data.errors)
                {
                  $scope.error = data.errors;
                  $scope.message = data.message;
                }
                else {
                  localservice.getData('http://192.168.1.15:81/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
                        console.log(data);
                        $scope.user = data.data;
                        $scope.item = data.item;
                        $scope.bid = data.bid;
                        $ionicLoading.hide();
                      }).error(function(data, status, headers, config) {
                          console.log(data);
                          $ionicLoading.hide();
                      });
                }
                $ionicLoading.hide();
              }).error(function(data, status, headers, config) {
                  console.log(data);
                  $ionicLoading.hide();
              });
        }

        $scope.addReceipt = function(data,id)
        {
          //show Loading
          $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
          });
          $scope.dataProgress.receipt=data;
          localservice.postReg('http://192.168.1.15:81/mobile/likha/public/transaction/'+id,$scope.dataProgress).success(function(data, status, headers, config) {
                console.log(data);
                if(data.errors)
                {
                  $scope.error = data.errors;
                  $scope.message = data.message;
                }
                else{
                  localservice.getData('http://192.168.1.15:81/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
                        console.log(data);
                        $scope.user = data.data;
                        $scope.item = data.item;
                        $scope.bid = data.bid;
                        $ionicLoading.hide();
                      }).error(function(data, status, headers, config) {
                          console.log(data);
                          $ionicLoading.hide();
                      });
                }
                $ionicLoading.hide();
              }).error(function(data, status, headers, config) {
                  console.log(data);
                  $ionicLoading.hide();
              });

        }
        $scope.addTackingNumber = function(data,id)
        {
          //show Loading
          $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
          });
          $scope.dataProgress.tracking_number=data;
          localservice.putData('http://192.168.1.15:81/mobile/likha/public/transaction/'+id,$scope.dataProgress).success(function(data, status, headers, config) {
                console.log(data);
                if(data.errors)
                {
                  $scope.error = data.errors;
                  $scope.message = data.message;
                }
                else{
                  localservice.getData('http://192.168.1.15:81/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
                        console.log(data);
                        $scope.user = data.data;
                        $scope.item = data.item;
                        $scope.bid = data.bid;
                        $ionicLoading.hide();
                      }).error(function(data, status, headers, config) {
                          console.log(data);
                          $ionicLoading.hide();
                      });
                }

              }).error(function(data, status, headers, config) {
                  console.log(data);

              });

        }
        $scope.feed = function(id){
          localStorage.setItem("itemid", id);
          $location.path('app/feedback');
          console.log(localStorage.getItem("itemid"));
        }
        $scope.message = function(id){
          console.log(id);
          localStorage.setItem("itemid", id);
          $location.path('app/message');
        }


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
.controller('UploadCtrl', function($location, $filter,$ionicLoading, localservice, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk)
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

    $scope.file={};
    $scope.error={};
    $scope.message;
    $scope.date = $filter('date')(new Date(), "yyyy-MM-dd");
    $scope.onFileSelect = function (files)
    {
      $scope.file=files;
    };
    $scope.submit = function(item){
      // console.log(item);
      //show Loading
      $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
      });

      if(item.minimum_price > item.maximum_price)
      {
        $scope.error.minimum_price = ["Minimum Price must less that Maximum Price"];
        $scope.message="Validation Failed";
        $ionicLoading.hide();
      }
      else {
        item.item_picture = $scope.file[0];
        item.userid = localStorage.getItem("userid");
        item.date_to_finish = $filter('date')(item.date_to_finish, "yyyy-MM-dd");
        console.log(item);
        var fd = new FormData();
        angular.forEach(item, function(value, key){
        fd.append(key, value);
        });
        console.log(fd);
      localservice.postData('http://192.168.1.15:81/mobile/likha/public/item',fd).success(function(data, status, headers, config) {
            if(data.errors)
            {
              $scope.error = data.errors;
              $scope.message = data.message;
            }
            else{
              $scope.error = '';
              $scope.message = data.message;
              $location.path('app/profile');
            }
            $ionicLoading.hide();
          }).error(function(data, status, headers, config) {
              console.log(data);
              $ionicLoading.hide();
          });

      }
    }
})
.controller('ListCtrl', function($ionicLoading, localservice, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicPopup)
{

    $scope.data={};
    $scope.user_type = localStorage.getItem("user_type");
    $scope.userid =localStorage.getItem("userid");
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
    //show Loading
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
    localservice.getData('http://192.168.1.15:81/mobile/likha/public/item/'+localStorage.getItem("Category")+'/edit').success(function(data, status, headers, config) {
          $scope.data = data.data;
          console.log($scope.data);
          $ionicLoading.hide();
        }).error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
        });
    localservice.getData('http://192.168.1.15:81/mobile/likha/public/bid/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
          $scope.user = data.data;
          console.log($scope.user);
          $ionicLoading.hide();
        }).error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
        });
    // Triggered on a button click, or some other target
    $scope.bidding = function(id, min, max)
    {
      $scope.money = {}
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show(
      {
        template: '<input type="number" ng-model="money.amount" ng-min="'+min+'" ng-max="'+max+'">',
        title: 'Enter Amount of your Bid',
        subTitle: 'Bid must between the destined price min: '+min+' max:'+max+' ',
        scope: $scope,
        buttons: [{ text: 'Close' },
        {
          text: '<b>Bid</b>',
          type: 'button-positive',
          onTap: function(e)
          {
            if (!$scope.money.amount)
            {
              e.preventDefault();
            }
            else
            {
              $scope.money.itemid=id;
              $scope.money.userid=localStorage.getItem("userid");
              console.log($scope.money);
              localservice.postReg('http://192.168.1.15:81/mobile/likha/public/bid',$scope.money).success(function(data, status, headers, config) {
                  $scope.user= data.data;
                    return $scope.user;
                  }).error(function(data, status, headers, config) {
                    return data;
                  });

            }
          }
        },
      ]
    });
    myPopup.then(function(res)
    {
      console.log('Tapped!', res);
      console.log(res);
    });
   };
   $scope.doRefresh = function() {
     localservice.getData('http://192.168.1.15:81/mobile/likha/public/item/'+localStorage.getItem("Category")+'/edit').success(function(data, status, headers, config) {
           $scope.data = data.data;
           console.log($scope.data);
           $ionicLoading.hide();
         }).error(function(data, status, headers, config) {
             console.log(data);
             $ionicLoading.hide();
         })
     localservice.getData('http://192.168.1.15:81/mobile/likha/public/bid/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
           $scope.user = data.data;
           console.log($scope.user);
           $ionicLoading.hide();
         }).error(function(data, status, headers, config) {
             console.log(data);
             $ionicLoading.hide();
         })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };

})

.controller('MessageCtrl', function(localservice, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion)
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
    console.log(localStorage.getItem("itemid"));
    localservice.getData('http://192.168.1.15:81/mobile/likha/public/message/'+localStorage.getItem("itemid")).success(function(data, status, headers, config) {
          $scope.message=data.data;
          console.log($scope.message);
        }).error(function(data, status, headers, config) {
            console.log(data);
        });

    $scope.sent= function(data){
      data.itemid=localStorage.getItem("itemid");
      data.userid=localStorage.getItem("userid");
      console.log(data);
      localservice.postReg('http://192.168.1.15:81/mobile/likha/public/message',data).success(function(data, status, headers, config) {
            if(data.errors)
            {
              $scope.error = data.errors;
              $scope.message = data.message;
            }
            else{
              localservice.getData('http://192.168.1.15:81/mobile/likha/public/message/'+localStorage.getItem("itemid")).success(function(data, status, headers, config) {
                    $scope.message=data.data;
                    console.log($scope.message);
                  }).error(function(data, status, headers, config) {
                      console.log(data);
                  });
            }
          }).error(function(data, status, headers, config) {
              console.log(data);
          });
    }

    $scope.doRefresh = function() {
      localservice.getData('http://192.168.1.15:81/mobile/likha/public/message/'+localStorage.getItem("itemid")).success(function(data, status, headers, config) {
            $scope.message=data.data;
            console.log($scope.message);
          }).error(function(data, status, headers, config) {
              console.log(data);
          })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
   };

})
.controller('FeedbackCtrl', function(localservice, $ionicLoading, $location, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion)
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
    console.log(localStorage.getItem("itemid"));
    localservice.getData('http://192.168.1.15:81/mobile/likha/public/feedback/'+localStorage.getItem("itemid")).success(function(data, status, headers, config) {
          $scope.feeddata=data.data;
          $scope.user_type = localStorage.getItem("user_type");
          console.log($scope.feeddata);
        }).error(function(data, status, headers, config) {
            console.log(data);
        });
    $scope.submit = function(data){
      //show Loading
      $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
      });
      data.itemid = localStorage.getItem("itemid");
      data.userid = localStorage.getItem("userid");
      console.log(data);
      localservice.postReg('http://192.168.1.15:81/mobile/likha/public/feedback',data).success(function(data, status, headers, config) {
            console.log(data);
            if(data.errors)
            {
              $scope.error = data.errors;
              $scope.message = data.message;
            }
            else{
              $location.path('app/activity');
            }
            $ionicLoading.hide();
          }).error(function(data, status, headers, config) {
              console.log(data);
              $ionicLoading.hide();
          });

    }
})

;
