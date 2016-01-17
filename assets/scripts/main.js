//Themes
var app = angular.module('BacApp', ['ngMaterial']).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('light-blue');
});

//Main Controller
app.controller('AppController', function() {
    var vm = this;
});


//Actual Form to calculate value 
app.controller('AppCtrl', function($scope, $mdDialog) {

	

	$scope.constants = {
		kg_in_lbs: 2.20462262185,
		water_in_blood: 0.806,
		swedish_grams: 1.2  //Convert to grams set by Swedish National Instuitue of public health

	};

    //Data Values
    $scope.data = {
        food: 'None',
        gender: false,
        weight: 0, 
        std_drinks: 0, 
        duration: 0, 
        bac: "- -",
        bac_color: "default",
        valid: false,
        conclusion: ""

    };

    $scope.gender_options = [
    	{ text: "Male", slug: 'male', extend: 'Tool tip? ' },
    	{ text: "Female", slug: 'female', extend: 'Tool tip? ' },
    ];


    //Food options to more accuratley predict current peak BAC
    $scope.food_options = [
    	{ text: "None", slug: 'none', extend: 'Tool tip? ' },
    	{ text: "Small", slug: 'small', extend: 'Tool tip? ' },
    	{ text: "Medium", slug: 'medium', extend: 'Tool tip? ' },
    	{ text: "Full", slug: 'full', extend: 'Tool tip? ' }
    ];

    //Conclusions to help explain the value to the user (Maintain order to prevent having to sort)
    $scope.conclusions = [
    	{lower: 0.01, color: 'low', conclusion: "You are not impaired!"},
    	{lower: 0.03, color: 'good', conclusion: "No loss of coordination, slight euphoria and loss of shyness. Depressant effects are not apparent. Mildly relaxed and maybe a little lightheaded."},
    	{lower: 0.05, color: 'good', conclusion: "Feeling of well-being, relaxation, lower inhibitions, sensation of warmth. Euphoria. Some minor impairment of reasoning and memory, lowering of caution. Your behavior may become exaggerated and emotions intensified (Good emotions are better, bad emotions are worse)"},
    	{lower: 0.08, color: 'okay', conclusion: "You should not be driving, although still within the legal limit. Slight impairment of balance, speech, vision, reaction time, and hearing."},
    	{lower: 0.10, color: 'over', conclusion: "You cannot legally drive! Slight impairment of balance, speech, vision, reaction time, and hearing. Euphoria. Judgment and self-control are reduced, and caution, reason and memory are impaired. You will probably believe that you are functioning better than you really are."},
    	{lower: 0.13, color: 'over', conclusion: "You cannot legally drive! Significant impairment of motor coordination and loss of good judgment. Speech may be slurred; balance, vision, reaction time and hearing will be impaired. Euphoria."},
    	{lower: 0.16, color: 'over', conclusion: "You cannot legally drive! Gross motor impairment and lack of physical control. "},
    	{lower: 0.18, color: 'high', conclusion: "You cannot legally drive! Dysphoria predominates, nausea may appear. The drinker has the appearance of a \"sloppy drunk.\""},
    	{lower: 0.22, color: 'high', conclusion: "You cannot legally drive! Felling dazed, confused or otherwise disoriented. May need help to stand or walk. If you injure yourself you may not feel the pain. Some people experience nausea and vomiting at this level. The gag reflex is impaired and you can choke if you do vomit. Blackouts are likely at this level so you may not remember what has happened."},
    	{lower: 0.28, color: 'high', conclusion: "You cannot legally drive! All mental, physical and sensory functions are severely impaired. Increased risk of asphyxiation from choking on vomit and of seriously injuring yourself by falls or other accidents."},
    	{lower: 0.38, color: 'high', conclusion: "You cannot legally drive! You have little comprehension of where you are. You may pass out suddenly and be difficult to awaken."},
    	{lower: 1.0, color: 'dead', conclusion: "You are good as dead..."}
    ];

    /**
     * [update_bac description]
     * @return {[type]} [description]
     */
    $scope.update_bac = function() {
    	//Validate Inputs 
    	if($scope.data.gender && $scope.data.weight > 0 && $scope.data.std_drinks > 0 && $scope.data.duration){
    		var body_water_constant = ($scope.data.gender == "male") ? 0.58 : 0.49; 	//Body water constant (0.58 for men and 0.49 for women)	
    		var metabolism_constant = ($scope.data.gender == "male") ? 0.015 : 0.017;	//Metabolism constant (0.017 Female, .015 Men)
    		var weight_kg = $scope.data.weight /  $scope.constants.kg_in_lbs; 			//Convert pounds to kilos
    		var bac =  (($scope.constants.water_in_blood * $scope.data.std_drinks * 
    		 	$scope.constants.swedish_grams)/(body_water_constant * weight_kg)) - (metabolism_constant*$scope.data.duration);

    		if(bac < 0) bac = 0; 

			//Concat result
			$scope.data.bac = bac.toFixed(4);  

			//Determine conclusion and color class
			var conclusion = false;
			for(var i=0; i<$scope.conclusions.length; i++){
				if(bac < $scope.conclusions[i].lower){
					conclusion = $scope.conclusions[i];
					break; 
				}
			}
			if(!conclusion) conclusion =  {lower: 0.01, color: 'default', conclusion: ""}; //Default Conclusion 
			
			//Update Data Model
			$scope.data.bac_color = conclusion.color;	
			$scope.data.conclusion = conclusion.conclusion;	
			
 
    	}
    	else{ // Not valid
    		$scope.data.bac = '  -';
    	}
  	};

  	//Learn More dialog box to show conclusions 
  	$scope.learnMore = function(ev){
		$mdDialog.show(
			$mdDialog.alert()
			.parent(angular.element(document.querySelector('#main')))
			.title('More info')
			.clickOutsideToClose(true)
			.textContent($scope.data.conclusion)
			.ariaLabel('Alert Dialog Demo')
        	.ok('Got it!')
        	.targetEvent(ev)
		); 
	};

	

});
