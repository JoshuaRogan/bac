$(document).ready(function () {
	
	//Text auto resizing 
	$("#header").fitText(1.2, {maxFontSize: '50px' });					
	$("#answer h4").fitText(1.2, {minFontSize: '29px', maxFontSize: '50px' });					
	
	$(document).keyup(calculate); 			//On any keypress try to calculate the BAC
	$("#gender").change(calculate); 		//If the gender is changed recalculate the BAC
	
	$("#food_0").change(calculate); 		//If the amount of food is changed 
	$("#food_1").change(calculate); 		//If the amount of food is changed 
	$("#food_2").change(calculate); 		//If the amount of food is changed 
	$("#food_3").change(calculate); 		//If the amount of food is changed 
	
	

});

//Checks to make sure all values are filled and acceptable 
function validate_form(){ 
	var gender = $("#gender").val();
	var weight = $("#weight").val();
	var std_drinks = $("#std_drinks").val();
	var hours = $("#hours").val();
	//console.log(gender, weight, std_drinks, hours); 
	
	//Validate gender
	if(gender != "Male" && gender != "Female"){
		return false; 
	}
	
	if(!isNumber(weight) || !isNumber(std_drinks) || !isNumber(hours)){ 
		//Any case of errors 
	}
	
	//Validate weight
	if(!isNumber(weight)){
		if(weight != ""){
			$("#weight").parent().addClass("has-error");
			$("#weight").parent().removeClass("has-success");
		}
		return false; 
	}
	else{ 
		$("#weight").parent().addClass("has-success");
		$("#weight").parent().removeClass("has-error");
	}
	
	
	if(!isNumber(std_drinks)){
		$("#std_drinks").parent().addClass("has-error");
		$("#std_drinks").parent().removeClass("has-success");
		return false; 
	}
	else{ 
		$("#std_drinks").parent().addClass("has-success");
		$("#std_drinks").parent().removeClass("has-error");
	}

	if(!isNumber(hours)){
		$("#hours").parent().addClass("has-error");
		$("#hours").parent().removeClass("has-success");
		return false; 
	}
	else{ 
		$("#hours").parent().addClass("has-success");
		$("#hours").parent().removeClass("has-error");
	}

	return true; 
}

function calculate(){ 
	if(validate_form()){
		var gender = $("#gender").val();								//Male or Female
		var BW = (gender == "Male") ? 0.58 : 0.49				//Body water constant (0.58 for men and 0.49 for women)
		var MR = (gender == "Male") ? 0.015 : 0.017			//MR is the metabolism constant (0.017 Female, .015 Men)
		var weight = ($("#weight").val())/2.2;						//Converted to KG
		var std_drinks = $("#std_drinks").val();					//Number of total standard drinks 
		var hours = $("#hours").val();									//Hours spent drinking
		var food = $("input:radio[name ='amount_food']:checked").val();
		
		
		//Calculation from wikipedia page
		var bac_level = ((.806 * std_drinks * 1.2)/(BW * weight)) - (MR*hours);
		
		//Compensate for amount of food 
		bac_level -= food *.0123;
		
		
		//Calculation from 
		if(bac_level < 0){
			bac_level = "not measurable (too low)."; 
			var conclusion = "<p> You are not impaired!</p>";
		}
		else{ 
			bac_level = bac_level.toFixed(3); 
			if(bac_level < .01){
				var conclusion = "<p> You are not impaired! </p>"; 
				bac_level = "<span class='emerald'>" + bac_level + "</span>"; 
			}
			else if(bac_level < .03){
				var conclusion = "<p> No loss of coordination, slight euphoria and loss of shyness. Depressant effects are not apparent. Mildly relaxed and maybe a little lightheaded. </p>"; 
				bac_level = "<span class='emerald'>" + bac_level + "</span>"; 
			}
			else if(bac_level < .05){
				var conclusion = "<p>Feeling of well-being, relaxation, lower inhibitions, sensation of warmth. Euphoria. Some minor impairment of reasoning and memory, lowering of caution. Your behavior may become exaggerated and emotions intensified (Good emotions are better, bad emotions are worse) </p>"; 
				bac_level = "<span class='emerald'>" + bac_level + "</span>"; 
			}
			else if(bac_level < .08){
				var conclusion = "<p> You should not be driving, although still within the legal limit.</p> <p>  Slight impairment of balance, speech, vision, reaction time, and hearing.  </p> "; 
				bac_level = "<span class='sun_flower'>" + bac_level + "</span>"; 
			}
			else if(bac_level < .10){
				var conclusion = "<p> You cannot legally drive!</p> <p> Slight impairment of balance, speech, vision, reaction time, and hearing. Euphoria. Judgment and self-control are reduced, and caution, reason and memory are impaired. You will probably believe that you are functioning better than you really are. </p> "; 
				bac_level = "<span class='alizarin'>" + bac_level + "</span>"; 
			}
			else if(bac_level < .13){
				var conclusion = "<p> You cannot legally drive!</p> <p> Significant impairment of motor coordination and loss of good judgment. Speech may be slurred; balance, vision, reaction time and hearing will be impaired. Euphoria. </p> "; 
				bac_level = "<span class='alizarin'>" + bac_level + "</span>"; 
			}
			else if(bac_level < .16){
				var conclusion = "<p> You cannot legally drive!</p> <p>Gross motor impairment and lack of physical control</p>"; 
				bac_level = "<span class='alizarin'>" + bac_level + "</span>"; 
			}
			else if(bac_level < .18){
				var conclusion = "<p> You cannot legally drive!</p> <p>Dysphoria predominates, nausea may appear. The drinker has the appearance of a \"sloppy drunk.\"</p>"; 
				bac_level = "<span class='alizarin'>" + bac_level + "</span>"; 
			}
			else if(bac_level < .22){
				var conclusion = "<p> You cannot legally drive!</p> <p>Felling dazed, confused or otherwise disoriented. May need help to stand or walk. If you injure yourself you may not feel the pain. Some people experience nausea and vomiting at this level. The gag reflex is impaired and you can choke if you do vomit. Blackouts are likely at this level so you may not remember what has happened.</p>"; 
				bac_level = "<span class='alizarin'>" + bac_level + "</span>"; 
			}
			else if(bac_level < .28){
				var conclusion = "<p> You cannot legally drive!</p> <p> All mental, physical and sensory functions are severely impaired. Increased risk of asphyxiation from choking on vomit and of seriously injuring yourself by falls or other accidents. </p>"; 
				bac_level = "<span class='alizarin'>" + bac_level + "</span>"; 
			}
			else if(bac_level < .38){
				var conclusion = "<p> You cannot legally drive!</p> <p> You have little comprehension of where you are. You may pass out suddenly and be difficult to awaken. </p>"; 
				bac_level = "<span class='alizarin'>" + bac_level + "</span>"; 
			}
			else{ 
				var conclusion = "<p> You are good as dead...</p>"; 
				bac_level = "<span class='alizarin'>" + bac_level + "</span>"; 
			}
		}
		
		//Display html
		bac_html = "<h4> B.A.C is  " + bac_level + "</h4>" + conclusion;
		$("#answer").html(bac_html);  
		$("#answer h4").fitText(1.2, {minFontSize: '29px', maxFontSize: '50px' });	//Reset text fitter 
	}
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}



