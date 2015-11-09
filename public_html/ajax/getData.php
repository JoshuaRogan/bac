 <div id="results">
 <?php 
	/*		This is the page that getData() javascript function is going to call. 
	 *	It will, upon success, create the twitter_stats section of the page and return it 
	 *	to the AJAX caller. 
	 */
	$start_time = microtime(true);
	//require "twitter_object.php"; 	//Get the classes required to create twitter objects to hold all of the data
	require "../../libraries/twitter_user/twitter_user.php"; 
	
	/****GLOBALS****/
	$errors = array(); 
	
	if(isset($_POST["username"])){
		$username = $_POST["username"];		//The username to lookup
	}
	if(isset($_POST["retweets"])){
		$retweets = ($_POST["retweets"] == "true") ? 1 : 0; 
	}
	if(isset($_POST["search_words"])){
		$search_words = $_POST["search_words"]; 
	}
	
	if(isset($username) && isset($retweets)){
		$user = new twitter_user($username, $retweets); //Create the twitter user
		
		
		/********* Prepare variables for output *********/
		$date_created = $user->get_datecreated();
		$name = $user->get_jsondatafield('name');
		
		$location = ($user->get_jsondatafield('location')) ? $user->get_jsondatafield('location') : "unknown";
		$description = ($user->get_jsondatafield('description')) ? $user->get_jsondatafield('description') : "no description"; 
		$is_protected = ($user->get_jsondatafield('protected')) ? "yes" : "no"; 
		
		
		$time_zone = $user->get_jsondatafield('time_zone'); 
		$profile_image_url = $user->get_jsondatafield('profile_image_url'); 
		
		$words = $user->get_words(); 
		$num_words = number_format($words->total_count);
		$num_unq_words = number_format($words->count);
		$most_used_words = array();
		
		$num_tweets = number_format($user->get_jsondatafield('statuses_count')); 
		$num_followers = number_format($user->get_jsondatafield('followers_count')); 
		$num_friends = number_format($user->get_jsondatafield('friends_count')); 
		$num_favorites = number_format($user->get_jsondatafield('favourites_count'));
		$avg_word_length = number_format($user->get_avg_wordlength(),3); 
		$avg_tweet_length = number_format($user->get_avg_tweet_length(),3); 
		 
		
		$hashtags = $user->get_hashtags(); 
		$num_hashtags = number_format($hashtags->total_count);
		$num_unq_hashtags = number_format($hashtags->count);
		
		$mentions = $user->get_mentions(); 
		$num_mentions = number_format($mentions->total_count);
		$num_unq_mentions = number_format($mentions->count);
		
		$tweets = $user->get_tweets(); 
		
		
		//Search for all of the words 
		if(isset($search_words)){
			$tweet_ids_list = array(); 
			foreach($search_words as $word){
				$tweet_ids = $words->find($word)->tweet_ids; 
				if($tweet_ids){
					$tweet_ids_list[$word] = $words->find($word)->tweet_ids; 
				}
			}
		}
		
		
		
		/********* Prepare variables for output *********/
		
	}
	else{
		$errors[] = "Username or Retweets was never set"; 
	}
	
	$end_time = microtime(true);
	$time_elapsed = $end_time - $start_time; 
?>
<!-- TWITTER STATS OUTPUT  --> 
<p class="small"> Your request took <?php echo $time_elapsed; ?> seconds to generate</p> 
<h3> <?php echo "$name (@$user->username)"; ?> </h3> 
<ul id="basic_stats"> 
	<li> <span class="bold">description:</span> <?php echo $description;  ?> </li> 
	<li> <span class="bold">protected:</span> <?php echo $is_protected;  ?> </li> 
	<li> <span class="bold">date created:</span> <?php echo $date_created; ?> </li> 
	<li> <span class="bold">location:</span> <?php echo $location; ?> </li> 
	<li> <span class="bold">#followers:</span> <?php echo $num_followers; ?> </li> 
	<li> <span class="bold">#friends:</span> <?php echo $num_friends; ?> </li> 
	<li> <span class="bold">#tweets:</span> <?php echo $num_tweets; ?> </li> 
	<li> <span class="bold">#favorites:</span> <?php echo $num_favorites; ?> </li> 
</ul> 

<h4> Words </h4> 
<ul> 
	<li> <span class="bold">#words:</span> <?php echo $num_words; ?> words</li> 
	<li> <span class="bold">#unique words:</span> <?php echo $num_unq_words; ?> unique words</li> 
	<li> <span class="bold">#hashtags:</span> <?php echo $num_hashtags; ?> hashtags</li> 
	<li> <span class="bold">#unique hashtags:</span> <?php echo $num_unq_hashtags; ?> unique hashtags</li> 
	<li> <span class="bold">#mentions:</span> <?php echo $num_mentions; ?> mentions</li> 
	<li> <span class="bold">#unique mentions:</span> <?php echo $num_unq_mentions; ?> unique mentions</li> 
	<li> <span class="bold">average word length:</span> <?php echo $avg_word_length; ?> characters </li>
	<li> <span class="bold">average tweet length:</span> <?php echo $avg_tweet_length; ?> words </li> 
</ul> 
 
<div class="search_results"> 
	<?php 
		if(is_array($tweet_ids_list)){
			foreach($tweet_ids_list as $word => $tweet_ids){
				if(count($tweet_ids) > 0){
					echo "<h4> Searching for \"$word\" </h4>"; 
					foreach($tweet_ids as $tweet_id){ 
						$tweet_text = $user->get_tweet_text($tweet_id); 
						echo "<li> $tweet_text </li>" ; 
					}
				}

			}
		}
	?> 
</div> 

<pre> 
	<?php 
		/***********Debugging Dump***********/
		
		//If there are any errors output them in an unordered list. Possibly add other logic so the js function won't produce weird output
		if(count($errors) > 0 ) {
			echo "<ul id='errors'>"; 
			foreach($errors as $error){ 
				echo "<li> $error </li>"; 
			}
			echo "</ul>";
		}
		//var_dump($tweet_ids_list);
		//echo "Number of Tweets:" .  count ($tweets) . "<br />";
		//var_dump($tweets);
		
		/***********Debugging Dump***********/
	?>
</pre> 
<!-- TWITTER STATS OUTPUT --> 
</div> 