<?php 	
	//Set $page to the contents of the correct page
	if(!isset($_GET['page'])){
		$page = 'home.php'; 	//Default
	}
	else{
		if(file_exists( "../pages/" .$_GET['page'] . ".php")){
			$page = $_GET['page'] . ".php";
		}
		else {
			$errors[] = "The page \"" .$_GET['page'] . "\" doesn't exist!";
			$page = 'home.php';	 //Default 
		}
	}
	
	//If the controller exists grab that data 
	if(file_exists("../controllers/controller." . $page)){
		require ("../controllers/controller." . $page);
	}
	
	
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title> <?php if(isset($_CONTROLLER["title"])) echo $_CONTROLLER["title"]; else echo "B.A.C. Calculator"; ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<link rel="shortcut icon" href="images/favicon.ico">
		
		<!-- Run in full-screen mode. -->
        <meta name="apple-mobile-web-app-capable" content="yes">
		
		<!-- Make the status bar black with white text. -->
        <meta name="apple-mobile-web-app-status-bar-style" content="black">

		<!-- Customize home screen title. -->
        <meta name="apple-mobile-web-app-title" content="BAC Calculator">
	
        <!-- iOS 7 iPhone (retina) -->
        <link href="images/apple-touch-icon-120x120.png"
              sizes="120x120"
              rel="apple-touch-icon">
			  
		<!-- iOS 6 iPhone (retina) -->
        <link href="images/apple-touch-icon-114x114.png"
              sizes="114x114"
              rel="apple-touch-icon">
			  
		<!-- iOS 6 & 7 iPhone 5 Startup -->
        <link href="images/apple-touch-startup-image-640x1096.png"
              media="(device-width: 320px) and (device-height: 568px)
                 and (-webkit-device-pixel-ratio: 2)"
              rel="apple-touch-startup-image">	  
		
		<!-- Loading Bootstrap -->
		<link href="bootstrap/css/bootstrap.css" rel="stylesheet">
		<?php 
			//Get all the stylesheets
			if(isset($_CONTROLLER["stylesheets"])){ 
				foreach ($_CONTROLLER["stylesheets"] as $stylesheet){ 
					echo "<link rel='stylesheet' type='text/css' href='styles/$stylesheet.css'>";
				}
			}
			else{
				echo '<link rel="stylesheet" type="text/css" href="styles/stylesheet.css">';	//Default stylesheet
			}
		?>
	</head> 
	
	<body> 
			<?php // REQUIRE GOOGLE ANALYTICS HERE ?>
			
			<!--HEADER--> 
			<?php 
				if(isset($_CONTROLLER["display_header"]) && $_CONTROLLER["display_header"]){
					require ("../includes/header.php");	//Grab the header
				}
			?>
			<!--HEADER--> 
			
			
			<div id="main" class="container"> 
				<?php 
					if(isset($page)){
						require ("../pages/$page");	//Grab the page
					}
				?>
			</div> 
			
			<!--FOOTER--> 
			<?php 
				if(isset($_CONTROLLER["display_footer"]) && $_CONTROLLER["display_footer"]){
					require ("../includes/footer.php");	//Grab the footer 
				}
			?>
			<!--FOOTER--> 
		
			<!--SCRIPTS-->
			<?php if(isset($_CONTROLLER["flat_ui"]) && $_CONTROLLER["flat_ui"]): ?>
				<script src="js/jquery-1.8.3.min.js"></script>
				<script src="js/jquery-ui-1.10.3.custom.min.js"></script>
				<script src="js/jquery.ui.touch-punch.min.js"></script>
				<script src="js/bootstrap.min.js"></script>
				<script src="js/bootstrap-select.js"></script>
				<script src="js/bootstrap-switch.js"></script>
				<script src="js/flatui-checkbox.js"></script>
				<script src="js/flatui-radio.js"></script>
				<script src="js/jquery.tagsinput.js"></script>
				<script src="js/jquery.placeholder.js"></script>
				<script src="js/jquery.stacktable.js"></script>
				<script src="http://vjs.zencdn.net/4.1/video.js"></script>
				<script src="js/application.js"></script>
			<?php endif; ?>
			
			<?php 
				//Load all of the scripts from the controller
				if(isset($_CONTROLLER["javascript"])){
					foreach($_CONTROLLER["javascript"] as $js_include){ 
						echo "<script src='js/$js_include.js'></script>";
					}
				}

				//Google Analytics 
				include("../includes/google_analytics.php");
			?>
			<!--SCRIPTS-->
	</body> 
</html>
	
	
