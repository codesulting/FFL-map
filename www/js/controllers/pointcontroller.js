

app.controller("PointCtrl",["$scope","$stateParams", "$ionicPlatform", "$ionicModal","$ionicPopup", "$filter", function($scope, $stateParams, $ionicPlatform, $ionicModal, $ionicPopup, $filter) {

  // to be replaced with API call on the database

  $scope.returnDays = function (data) {
    temp = "";
    angular.forEach(data.dayOfWeek, function (value, key) {
      if (value) {
        temp=temp+" "+key;
      }
    });
    console.log(temp);
    return temp;
  };

  $scope.categories = [
    {
      "category" : "farm",
      "subcategories" : ["organic plus farm", "organic farm","transition farm"]
    },
    {
      "category" : "point of sale",
      "subcategories" :["farmers\' market","local shop","delivery point"]
    },
    {
      "category" : "restaurant",
      "subcategories" : ["organic plus restaurant","organic restaurant"]
    },
    {
      "category" : "exibition",
    }
  ];


  $scope.pointData = {
    "name" : "super ultimate farm",
    "type" : {
      "category" : "farm",
      "subcategory" : "organic farm"
    },
    "openingHoursSpecification":[
       {
          "validFrom":"1",
          "validThrough":"5",
          "datetime":[{
            "timings":[
               {
                  "closes":"13:00",
                  "opens":"10:00"
               },
               {
                  "closes":"18:30",
                  "opens":"14:00"
               }
            ],
            "dayOfWeek":{
               "monday":true,
               "tuesday":false,
               "friday":false,
               "wednesday":true,
               "thursday":false,
               "sunday":false,
               "saturday":false
            },
            "description":""
          },
          {
            "timings":[
               {
                  "closes":"17:00",
                  "opens":"10:00"
               },
               {
                  "closes":"15:30",
                  "opens":"14:00"
               }
            ],
            "dayOfWeek":{
               "monday":false,
               "tuesday":false,
               "friday":true,
               "wednesday":false,
               "thursday":false,
               "sunday":true,
               "saturday":true
            },
            "description":""
          }
        ]
      },
      {
         "validFrom":"5",
         "validThrough":"10",
         "datetime":[{
           "timings":[
              {
                 "closes":"13:00",
                 "opens":"10:00"
              },
              {
                 "closes":"18:30",
                 "opens":"14:00"
              }
           ],
           "dayOfWeek":{
              "monday":true,
              "tuesday":false,
              "friday":false,
              "wednesday":true,
              "thursday":false,
              "sunday":false,
              "saturday":false
           },
           "description":""
         }
       ]
      }
    ],
    "description" : "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "website" : "www.superultimatefarm.com",
    "phone" : "555444333",
    "products" : [
      {
      "name": "vegetables",
      "value": true
      },
      {
      "name": "diary",
      "value": false
      },
      {
      "name": "fruits",
      "value": true
      },
      {
      "name": "bread",
      "value": true
      },
      {
      "name": "meat",
      "value": true
    },
      {
      "name": "drinks",
      "value": false
    },
      {
      "name": "fish",
      "value": false
      }
    ]
  };

$scope.productsFilter={"value" : true};
$scope.tempData={};
  $scope.tempSub=[];

  $scope.findSub = function() {
    angular.forEach($scope.categories, function (value, id) {
      if (value.category==$scope.tempData.type.category) {
        $scope.tempSub = value.subcategories;
      }
    });
  };

$scope.showPopup = function() {
  $scope.tempData={};
  angular.copy($scope.pointData,$scope.tempData);
  $scope.tempSub=[];
  $scope.findSub();

  var myPopup = $ionicPopup.show({
    templateUrl: "templates/modals/editPoint.html",
    title: "Edit "+$scope.editOption,
    scope: $scope,
    buttons: [
      { text: "Cancel" },
      {
        text: "<b>Save</b>",
        type: "button-dark",
        onTap: function(e) {
          if (($scope.tempData.type.category!='')&&($scope.tempData.type.subcategory!='')){
            console.log($scope.tempData);
            angular.copy($scope.tempData,$scope.pointData);
          }
          else {
            console.log("data incomplete");
            e.preventDefault();
          }
        }
      }
    ]
  });

};

  $scope.returnClass = function(name) {
    var product;
    for (var i = 0; i < $scope.pointData.products.length; i++) {
      if ($scope.pointData.products[i].name == name) {
        product = i;
      }
    }
      return name+"-button"
  };

  $scope.returnClassTemp = function(name) {
    var product;
    for (var i = 0; i < $scope.tempData.products.length; i++) {
      if ($scope.tempData.products[i].name == name) {
        product = i;
      }
    }
    if ($scope.tempData.products[product].value) {
      return name+"-button"
    }
    else {
      return name+"-button product-disable"
    }
  };

  $scope.toggleProduct = function(name) {
    var product;
    for (var i = 0; i < $scope.tempData.products.length; i++) {
      if ($scope.tempData.products[i].name == name) {
        product = i;
      }
    }
    $scope.tempData.products[product].value=!$scope.tempData.products[product].value;
  };

  $scope.editField = function(field) {
    console.log("opening");
    $scope.editOption = field;
    $scope.showPopup();
  }

  $scope.confirmField = function() {
      $scope.myPopup.close();
  }

}]);
