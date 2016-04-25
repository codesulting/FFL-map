app.service('LocationsService', ['$cordovaGeolocation', '$rootScope', function($cordovaGeolocation, $rootScope) {

  var watch;
  var watchOptions = {
    timeout : 10000,
    maximumAge: 0,
    enableHighAccuracy: true // may cause errors if true
  };
  var currentLocation = {};

  this.getCurrentLocation = function(){
    return currentLocation
  };

  var inint = false;

  this.watchCurrentLocation = function() {
    watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function(err) {
        // error
        console.log("watch error", err);
      },
      function(position) {
        var lati  = position.coords.latitude
        var longi = position.coords.longitude
        console.log('lat long', lati, longi);

        currentLocation = {
          lat : lati,
          lng : longi
        };
        if(!inint){
          $rootScope.$broadcast('LS-UserInint');
          inint = true;
        }
        else {
          $rootScope.$broadcast('LS-UserMoved');
        }
    });
  };

  this.savedLocations = [
  ];

}]);
