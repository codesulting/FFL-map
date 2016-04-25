angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ui-leaflet','pascalprecht.translate', 'ngCookies', 'ngResource'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      ionic.Platform.fullScreen(true,true);
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            window.cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('app.map', {
      url: "/map",
      views: {
        'app-map' :{
          templateUrl: "templates/map.html",
          controller: "MapCtrl"
        }
      }
    })

    .state('app.point', {
      url: "/point",
      views: {
        'app-point' :{
          templateUrl: "templates/fullPoint.html",
          controller: "PointCtrl"
        }
      }
    })
  $urlRouterProvider.otherwise('/app/map');
})

/*.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDDEmpTYbOC_wJZZTyItawLSjy2zY5z7HI',
        libraries: 'visualization'
    });
})*/

.config(['$translateProvider', function($translateProvider){
  // Register a loader for the static files
  // So, the module will search missing translation tables under the specified urls.
  // Those urls are [prefix][langKey][suffix].
  $translateProvider.useStaticFilesLoader({
    prefix: 'l10n/',
    suffix: '.json'
  });
  // Tell the module what language to use by default
  $translateProvider.preferredLanguage('en_INT');
}])

.filter('monthName', [function() {
    return function (monthNumber) { //1 = January
        var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
        return monthNames[monthNumber - 1];
    }
}])

.run(function(LocationsService) {
  LocationsService.watchCurrentLocation();
});

var app = angular.module('starter.controllers', []);
