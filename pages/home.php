<?php
	/*		Home Page
	 *	
	 *
	 */
	 
?>

<h4 id="header"> Simple B.A.C. Calculator </h4> 
<p> This is a page that is solely used to calculate your Blood Alcohol level according to <a href="http://en.wikipedia.org/wiki/Blood_alcohol_content#Estimated_blood_ethanol_concentration_.28EBAC.29" target="_blank">this</a>  formula.</p> 



<form class="form-horizontal" id="bac_form">
	<fieldset>
		<!-- Form Name -->
		<legend>B.A.C. Calculator</legend>
		<!-- Select Basic -->
		
		<div class="form-group col-md-12" >
		  <label  for="gender">Gender</label>
			<select id="gender" name="gender" class="form-control">
			  <option>Male</option>
			  <option>Female</option>
			</select>
		</div>

		<!-- Text input-->
		<div class="form-group col-md-12" >
			<label for="weight">Weight (Lbs)</label>
			<input id="weight" name="weight" type="text" pattern="\d*" placeholder="160" class="form-control" required="" autocomplete="off">
		</div>

		<!-- Text input-->
		<div class="form-group col-md-12" >
			<label  for="std_drinks">Num. of Standard Drinks</label>
			<input id="std_drinks" name="std_drinks" type="text"pattern="\d*" placeholder="5" class="form-control" required="" autocomplete="off" >
			<p class="explain"> A standard drink is about 12 oz. beer, 8 oz. malt liquor, 5 oz. table wine, or 1.5 oz spirit. </p> 
		</div>

		<!-- Text input-->
		<div class="form-group col-md-12" >
			<label  for="hours">Time Drinking (Hours)</label>
			<input id="hours" name="hours" type="text" pattern="\d*" placeholder="2" class="form-control" required="" autocomplete="off">
		</div>
		
		<div class="form-group col-md-12">
			<label class="control-label"> Amount of Food <strong>(Beta)</strong></label> 
			<label class="radio">
				<input type="radio" name="amount_food" id="food_0" value="0" data-toggle="radio" checked="">
				None
			</label>
			<label class="radio"> 
				<input type="radio" name="amount_food" id="food_1" value="1" data-toggle="radio">
				Small <small> (Handful of chips, pretzels, etc.) </small>
			</label>
			<label class="radio">
				<input type="radio" name="amount_food" id="food_2" value="2" data-toggle="radio">
				Medium <small> (Couple slices of pizza) </small> 
			</label>
			<label class="radio">
				<input type="radio" name="amount_food" id="food_3" value="3" data-toggle="radio">
				Large <small> (Full meal) </small> 
			</label>
			<p class="note"><strong> Note:</strong> For best reduction of B.A.C. food should be eaten before or in the early stages of drinking.</p> 
		</div>

		<!-- Button 
		<div class="form-group col-md-3" >
		  <label  for="singlebutton"></label>
		  <div class="controls">
			<button onclick="getBAC()" id="singlebutton" name="singlebutton" class="btn btn-primary">Submit</button>
		  </div>
		</div>-->

	</fieldset>
</form>

<div id="answer"> 
	<h4> B.A.C. is 0.00 </h4> 
	<p> Find out what your B.A.C. is ! </p> 
</div> 

