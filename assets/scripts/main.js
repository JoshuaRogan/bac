var app = angular.module('BacApp', ['ngMaterial']).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('light-blue');
});
//Main Controller
app.controller('AppController', function() {
    var vm = this;
});
//Actual Form to calculate value 
app.controller('AppCtrl', function($scope) {
    
    //Setup Default Values
    $scope.data = {
        food: 'None', 
        weight: 0, 
        std_drinks: 0, 
        duration: 0
    };

    $scope.gender_options = [
    	{ text: "Male", slug: 'male', extend: 'Tool tip? ' },
    	{ text: "Female", slug: 'female', extend: 'Tool tip? ' },
    ];

    $scope.food_options = [
    	{ text: "None", slug: 'none', extend: 'Tool tip? ' },
    	{ text: "Small", slug: 'small', extend: 'Tool tip? ' },
    	{ text: "Medium", slug: 'medium', extend: 'Tool tip? ' },
    	{ text: "Full", slug: 'full', extend: 'Tool tip? ' }
    ];

});