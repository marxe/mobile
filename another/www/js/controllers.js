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

  localservice.getData('http://localhost/mobile/likha/public/authen').success(function(data, status, headers, config) {
      if(data.userid)
      {
        localservice.getData('http://localhost/mobile/likha/public/user/'+data.userid+'').success(function(data, status, headers, config) {
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
.controller('RegisterCtrl', function( $ionicPopup, $ionicLoading, $filter, $scope, $timeout, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate, localservice, $location)
{
    // An alert dialog
    $scope.infoArtisan = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Artisan:',
      template: 'The one who makes the idea of the designer into a tangible product.'
    });
    alertPopup.then(function(res) {
      console.log(res);
    });
    };
    $scope.infoDesigner = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Designer:',
      template: 'The one who has requests for their design to be produced.'
    });
    alertPopup.then(function(res) {
      console.log(res);
    });
    };
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
    $scope.fileerror=" ";
    $scope.file={};
  $scope.onFileSelect = function (files)
  {
    if (files[0].size<1500000 && files[0].size > 10000) {
      $scope.file.profilepicture=files[0];
      $scope.fileerror = " ";
      console.log($scope.file);
    }
    else {
      $scope.fileerror= "The file size should not be less than 10 kb and should not exceed 1.5Mb"
      $scope.file={};
    }
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

.controller('CategoriesCtrl', function($ionicLoading, localservice, $location, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicPopup)
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
    //show Loading
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
    $scope.storeCategory = function(data)
    {
      localStorage.setItem("Category", data);
      $location.path('app/list');
    }

    localservice.getData('http://localhost/mobile/likha/public/category').success(function(data, status, headers, config) {
          console.log(data);
          $scope.category=data.data;
          console.log($scope.category);
          $ionicLoading.hide();
        }).error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
        });
})
.controller('EditingCtrl', function($filter, $ionicLoading, localservice, $location, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicPopup)
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
    //show Loading
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
    localservice.getData('http://localhost/mobile/likha/public/finding/'+localStorage.getItem("itemid")).success(function(data, status, headers, config) {
          $scope.item = data.data;
          $scope.item.date_to_finish = new Date($scope.item.date_to_finish);
          console.log($scope.item);
          localservice.getData('http://localhost/mobile/likha/public/category').success(function(data, status, headers, config) {
                console.log(data);
                $scope.category = data.data;
                console.log($scope.category);
                $ionicLoading.hide();
              }).error(function(data, status, headers, config) {
                  console.log(data);
                  $ionicLoading.hide();
              });
          $ionicLoading.hide();
        }).error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
        });
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
          item.date_to_finish = $filter('date')(new Date(item.date_to_finish), "yyyy-MM-dd");
          console.log(item);
          localservice.postReg('http://localhost/mobile/likha/public/editing/'+localStorage.getItem("itemid"),item).success(function(data, status, headers, config) {
                console.log(data);
                if(data.errors)
                {
                  $scope.error = data.errors;
                  $scope.message = data.message;
                }
                else{
                  // $location.path('app/profile');
                }
                $ionicLoading.hide();
              }).error(function(data, status, headers, config) {
                  console.log(data);
                  $ionicLoading.hide();
              });
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
    localservice.getData('http://localhost/mobile/likha/public/authen').success(function(data, status, headers, config) {
      localservice.getData('http://localhost/mobile/likha/public/user/'+data.userid+'').success(function(data, status, headers, config) {
            console.log(data);
            $scope.user = data.data;
            $scope.bid = data.bid;
            $scope.item = data.item;
            $scope.user.profilepicture= 'http://localhost/mobile/likha/public/uploads/'+data.data.profilepicture;
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
        localservice.getData('http://localhost/mobile/likha/public/item/'+localStorage.getItem("Category")+'/edit').success(function(data, status, headers, config) {
              $scope.data = data.data;
              // $scope.data.users.profilepicture = 'http://localhost/mobile/likha/public/uploads/'+data.data.users.profilepicture;
              // $scope.data.item_picture = 'http://localhost/mobile/likha/public/uploads/'+data.data.item_picture;
              console.log($scope.data);
              $ionicLoading.hide();
            }).error(function(data, status, headers, config) {
                console.log(data);
                $ionicLoading.hide();
            });
        localservice.getData('http://localhost/mobile/likha/public/bid/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
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
          $scope.editing= function(item)
          {
            localStorage.setItem("itemid", item);
            $location.path('app/editing');
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
    localservice.getData('http://localhost/mobile/likha/public/bid/'+localStorage.getItem("itemid")+'').success(function(data, status, headers, config) {
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
          localservice.putData('http://localhost/mobile/likha/public/item/'+localStorage.getItem("itemid"),$scope.select).success(function(data, status, headers, config) {
                if(data.errors)
                {
                  $scope.error = data.errors;
                  $scope.message = data.message;
                }
                else{
                  localservice.putData('http://localhost/mobile/likha/public/bid/'+localStorage.getItem("itemid"),$scope.bidselect).success(function(data, status, headers, config) {
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
        $scope.folioid= function(id)
        {
          localStorage.setItem("artisanid", id);
          $location.path('app/portfolio');
        }

})
.controller('ActivityCtrl', function($location, localservice, $ionicLoading, $scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk)
{
  localStorage.setItem("userid",1000);
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');
    $scope.itemsearch="";
    $scope.itemstatus="";
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
    localservice.getData('http://localhost/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
          $scope.user = data.data;
          $scope.item = data.item;
          $scope.bid = data.bid;
          console.log(data);
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

          localservice.putData('http://localhost/mobile/likha/public/item/'+localStorage.getItem("itemid"),$scope.dataProgress).success(function(data, status, headers, config) {
                if(data.errors)
                {
                  $scope.error = data.errors;
                  $scope.message = data.message;
                }
                else {
                  localservice.getData('http://localhost/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
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
          localservice.postReg('http://localhost/mobile/likha/public/transaction/'+id,$scope.dataProgress).success(function(data, status, headers, config) {
                console.log(data);
                if(data.errors)
                {
                  $scope.error = data.errors;
                  $scope.message = data.message;
                }
                else{
                  localservice.getData('http://localhost/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
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
          localservice.putData('http://localhost/mobile/likha/public/transaction/'+id,$scope.dataProgress).success(function(data, status, headers, config) {
                console.log(data);
                if(data.errors)
                {
                  $scope.error = data.errors;
                  $scope.message = data.message;
                }
                else{
                  localservice.getData('http://localhost/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
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
        $scope.file={};
        $scope.onFileSelect = function (files)
        {
          console.log(files);
          if (files[0].size<1500000 && files[0].size > 10000) {
            $scope.file.progress_picture =files[0];
            $scope.fileerror = " ";
            console.log($scope.file);
          }
          else {
            $scope.fileerror= "The file size should not be less than 10 kb and should not exceed 1.5Mb"
            $scope.file={};
          }
          console.log($scope.file);
        }

        $scope.updateprogress = function(id)
        {
          $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
          });
          var fd = new FormData();
          fd.append("progress_picture", $scope.file.progress_picture);
          console.log(fd);
        localservice.postData('http://localhost/mobile/likha/public/upload/'+id,fd).success(function(data, status, headers, config) {
              if(data.errors)
              {
                $scope.error = data.errors;
                $scope.message = data.message;
              }
              else{
                localservice.getData('http://localhost/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
                      console.log(data);
                      $scope.user = data.data;
                      $scope.item = data.item;
                      $scope.bid = data.bid;
                    }).error(function(data, status, headers, config) {
                        console.log(data);
                    })
              }
              $ionicLoading.hide();
            }).error(function(data, status, headers, config) {
                console.log(data);
                $ionicLoading.hide();
            });
        }

        $scope.doRefresh = function() {
          localservice.getData('http://localhost/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
                console.log(data);
                $scope.user = data.data;
                $scope.item = data.item;
                $scope.bid = data.bid;
              }).error(function(data, status, headers, config) {
                  console.log(data);
              })
          .finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
          });
       }
       $scope.data={};
       $scope.cancel = function(item)
       {
         $ionicLoading.show({
         content: 'Loading',
         animation: 'fade-in',
         showBackdrop: true,
         maxWidth: 200,
         showDelay: 0
         });
         $scope.data.userid = localStorage.getItem("userid");
         $scope.data.itemid = item;
         localservice.postReg('http://localhost/mobile/likha/public/cancel',$scope.data).success(function(data, status, headers, config) {
               if(data.errors)
               {
                 $scope.error = data.errors;
                 $scope.message = data.message;
               }
               else
               {
                 localservice.getData('http://localhost/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
                       console.log(data);
                       $scope.user = data.data;
                       $scope.item = data.item;
                       $scope.bid = data.bid;
                     }).error(function(data, status, headers, config) {
                         console.log(data);
                     })
               }
               $ionicLoading.hide();
             }).error(function(data, status, headers, config) {
                 console.log(data);
                 $ionicLoading.hide();
             });
       }
       $scope.cancelaction= function(item, action)
       {
         if(action == 'accept')
         {
           localservice.getData('http://localhost/mobile/likha/public/cancel/'+item).success(function(data, status, headers, config) {
             localservice.getData('http://localhost/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
                   console.log(data);
                   $scope.user = data.data;
                   $scope.item = data.item;
                   $scope.bid = data.bid;
                 }).error(function(data, status, headers, config) {
                     console.log(data);
                 })
               }).error(function(data, status, headers, config) {
                   console.log(data);
               })
         }
         else if(action == 'refusal'){
           localservice.getData('http://localhost/mobile/likha/public/cancel/'+item+'/edit').success(function(data, status, headers, config) {
             localservice.getData('http://localhost/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
                   console.log(data);
                   $scope.user = data.data;
                   $scope.item = data.item;
                   $scope.bid = data.bid;
                 }).error(function(data, status, headers, config) {
                     console.log(data);
                 })
               }).error(function(data, status, headers, config) {
                   console.log(data);
               })
         }
       }
       $scope.claim = function(item, action)
       {
         $ionicLoading.show({
         content: 'Loading',
         animation: 'fade-in',
         showBackdrop: true,
         maxWidth: 200,
         showDelay: 0
         });
         if(action == 'receipt')
         {
           localservice.getData('http://localhost/mobile/likha/public/transaction/'+item).success(function(data, status, headers, config) {
             localservice.getData('http://localhost/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
                   console.log(data);
                   $scope.user = data.data;
                   $scope.item = data.item;
                   $scope.bid = data.bid;
                   $ionicLoading.hide();

                 }).error(function(data, status, headers, config) {
                     console.log(data);
                     $ionicLoading.hide();

                 })
               }).error(function(data, status, headers, config) {
                   console.log(data);
                   $ionicLoading.hide();
              })
         }
         else if(action == 'tracking_number'){
           localservice.getData('http://localhost/mobile/likha/public/transaction/'+item+'/edit').success(function(data, status, headers, config) {
             localservice.getData('http://localhost/mobile/likha/public/user/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
                   console.log(data);
                   $scope.user = data.data;
                   $scope.item = data.item;
                   $scope.bid = data.bid;
                   $ionicLoading.hide();

                 }).error(function(data, status, headers, config) {
                     console.log(data);
                     $ionicLoading.hide();

                 })
               }).error(function(data, status, headers, config) {
                   console.log(data);
                   $ionicLoading.hide();
              })
         }
       }
})
.controller('AdminCtrl', function(localservice, $location,$scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk)
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
    localservice.getData('http://localhost/mobile/likha/public/admin/'+localStorage.getItem("userid")).success(function(data, status, headers, config) {
          $scope.message=data.data;
          console.log($scope.message);
        }).error(function(data, status, headers, config) {
            console.log(data);
        });

        $scope.sent= function(data){
          data.userid = localStorage.getItem("userid");
          data.subject = "Report";
          data.sender = 'c';
          console.log(data);
          localservice.postReg('http://localhost/mobile/likha/public/admin',data).success(function(data, status, headers, config) {
                if(data.errors)
                {
                  $scope.error = data.errors;
                  $scope.message = data.message;
                }
                else{
                  localservice.getData('http://localhost/mobile/likha/public/admin/'+localStorage.getItem("userid")).success(function(data, status, headers, config) {
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
      localservice.getData('http://localhost/mobile/likha/public/admin/'+localStorage.getItem("userid")).success(function(data, status, headers, config) {
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
    localservice.getData('http://localhost/mobile/likha/public/category').success(function(data, status, headers, config) {
          console.log(data);
          $scope.category = data.data;
          console.log($scope.category);
          $ionicLoading.hide();
        }).error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
        });

    $scope.file={};
    $scope.parts={};
    $scope.error={};
    $scope.message;
    $scope.datenow = $filter('date')(new Date(), "yyyy-MM-dd");
    $scope.onFileSelect = function (files)
    {
      if (files[0].size<1500000 && files[0].size > 10000) {
        $scope.file=files;
        $scope.fileerror = " ";
        console.log($scope.file);
      }
      else {
        $scope.fileerror= "The file size should not be less than 10 kb and should not exceed 1.5Mb"
        $scope.file={};
      }
    };
    $scope.onFileSelects = function (files, part)
    {
      if (files[0].size<1500000 && files[0].size > 10000) {
        $scope.parts[part]=files[0];
        $scope.fileerror = " ";
        console.log($scope.parts);
      }
      else {
        $scope.fileerror= "The file sizes should not be less than 10 kb and should not exceed 1.5Mb"
        $scope.parts={};
      }
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
        item.date_to_finish = $filter('date')(new Date(item.date_to_finish), "yyyy-MM-dd");
        var fd = new FormData();
        angular.forEach(item, function(value, key){
        fd.append(key, value);
        });
        console.log(item);

      localservice.postData('http://localhost/mobile/likha/public/item',fd).success(function(data, status, headers, config) {
            if(data.errors)
            {
              $scope.error = data.errors;
              $scope.message = data.message;
              console.log(data);
            }
            else{
              var fd = new FormData();
              angular.forEach($scope.parts, function(value, key){
              fd.append(key, value);
              });
              localservice.postData('http://localhost/mobile/likha/public/picture/'+data.data.itemid,fd).success(function(data, status, headers, config) {
                    if(data.errors)
                    {
                      $scope.error = data.errors;
                      $scope.message = data.message;
                      console.log(data);
                    }
                    else{
                      $scope.error = '';
                      $scope.message = data.message;
                      $location.path('app/profile');
                    }
                  }).error(function(data, status, headers, config) {
                      console.log(data);
                  })
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
    localservice.getData('http://localhost/mobile/likha/public/item/'+localStorage.getItem("Category")+'/edit').success(function(data, status, headers, config) {
          $scope.data = data.data;
          $ionicLoading.hide();
          console.log($scope.data);
        }).error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
        });
    localservice.getData('http://localhost/mobile/likha/public/bid/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
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
        template: '<form name="myForm" novalidate><input type="number" ng-model="money.amount" min="'+min+'" max="'+max+'"><br><span ng-hide="myForm.$valid" style="color:red;">Please set your bid into the given range</span><br>Comment:<br><textarea ng-model="money.comment" style="height: 100px;"></textarea></form>',
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
              localservice.postReg('http://localhost/mobile/likha/public/bid',$scope.money).success(function(data, status, headers, config) {
                  $scope.user= data.data;

                  localservice.getData('http://localhost/mobile/likha/public/item/'+localStorage.getItem("Category")+'/edit').success(function(data, status, headers, config) {
                        $scope.data = data.data;
                        console.log($scope.data);
                        $ionicLoading.hide();
                      }).error(function(data, status, headers, config) {
                          console.log(data);
                          $ionicLoading.hide();
                      });
                  localservice.getData('http://localhost/mobile/likha/public/bid/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
                        $scope.user = data.data;
                        console.log($scope.user);
                        $ionicLoading.hide();
                      }).error(function(data, status, headers, config) {
                          console.log(data);
                          $ionicLoading.hide();
                      });
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
     localservice.getData('http://localhost/mobile/likha/public/item/'+localStorage.getItem("Category")+'/edit').success(function(data, status, headers, config) {
           $scope.data = data.data;
           console.log($scope.data);
           $ionicLoading.hide();
         }).error(function(data, status, headers, config) {
             console.log(data);
             $ionicLoading.hide();
         })
     localservice.getData('http://localhost/mobile/likha/public/bid/'+localStorage.getItem("userid")+'/edit').success(function(data, status, headers, config) {
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
    localservice.getData('http://localhost/mobile/likha/public/message/'+localStorage.getItem("itemid")).success(function(data, status, headers, config) {
          $scope.message=data.data;
          console.log($scope.message);
        }).error(function(data, status, headers, config) {
            console.log(data);
        });

    $scope.sent= function(data){
      data.itemid=localStorage.getItem("itemid");
      data.userid=localStorage.getItem("userid");
      console.log(data);
      localservice.postReg('http://localhost/mobile/likha/public/message',data).success(function(data, status, headers, config) {
            if(data.errors)
            {
              $scope.error = data.errors;
              $scope.message = data.message;
            }
            else{
              localservice.getData('http://localhost/mobile/likha/public/message/'+localStorage.getItem("itemid")).success(function(data, status, headers, config) {
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
      localservice.getData('http://localhost/mobile/likha/public/message/'+localStorage.getItem("itemid")).success(function(data, status, headers, config) {
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
    localservice.getData('http://localhost/mobile/likha/public/feedback/'+localStorage.getItem("itemid")).success(function(data, status, headers, config) {
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
      localservice.postReg('http://localhost/mobile/likha/public/feedback',data).success(function(data, status, headers, config) {
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
.controller('PortfolioCtrl', function(localservice, $ionicLoading, $location, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion)
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
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
    console.log(localStorage.getItem("artisanid"));
    localservice.getData('http://localhost/mobile/likha/public/user/'+localStorage.getItem("artisanid")+'/portfolio').success(function(data, status, headers, config) {
          $scope.user = data.data;
          $scope.item = data.bid;
          console.log(data);
          $ionicLoading.hide();
        }).error(function(data, status, headers, config) {
            console.log(data);
            $ionicLoading.hide();
        });


})
;
