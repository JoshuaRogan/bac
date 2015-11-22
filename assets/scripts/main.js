var app = angular.module('BacApp', ['ngMaterial']).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('light-blue');
});

//Main Controller
app.controller('AppController', function() {
    var vm = this;
    
});

//Actual Form to calculate value 
app.controller('AppCtrl', function($scope) {
    $scope.data = {
        food: 'None'
    };
});