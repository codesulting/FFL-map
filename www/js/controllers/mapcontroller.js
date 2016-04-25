app.controller('MapCtrl',['$scope','$stateParams', 'LocationsService', '$ionicPlatform', 'leafletData', function($scope, $stateParams, LocationsService, $ionicPlatform, leafletData) {

  $scope.check = true;

  L.mapbox.accessToken = 'pk.eyJ1IjoidWJpazg3IiwiYSI6ImNpbG5qYXhnZTAwMHd2Z2x5OHJlMzE3MncifQ.COnoUdqvYBkldzWerI55lw';

    var initGeo = LocationsService.getCurrentLocation();

    $scope.map = {
      defaults: {
        tileLayer: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false
      },
      markers : {},
      events: {
        map: {
          enable: ['context'],
          logic: 'emit'
        }
      },
      center: {}
    };

    $scope.$on('LS-UserInint', function() {
      var location = LocationsService.getCurrentLocation();
      console.log("location= ", location.lat, location.lng);

      $scope.map.center  = {
        lat : location.lat,
        lng : location.lng,
        zoom : 16
      };
    });

    $scope.$on("$destroy", function() {
    if (LocationsService.watch) {
      LocationsService.watch.clearWatch();
    }
  });

}]);
