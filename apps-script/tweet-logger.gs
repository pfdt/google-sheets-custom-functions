// Google Sheets custom functions - Tweet-logger app script
// source : https://github.com/pfdt/google-sheets-custom-functions
// This app script log tweets informations to a Google Sheets document, based on searched term, hashtag or twitter query. It can be used with a clock trigger to have automatic updates.
// The tweet informations logged are : date, username, user handle, tweet id, user followers count, user followings count, tweet text, retweets count, likes count, tweet status, RT reply user, RT reply id.

// SCRIPT CONFIGURATION
	// TWITTER CREDENTIALS : fill up the API infos to get the function works.
	var CONSUMER_KEY = 'YOUR_CONSUMER_KEY'; // Register your app with Twitter.
	var CONSUMER_SECRET = 'YOUR_CONSUMER_SECRET'; // Register your app with Twitter.
	// To get these informations, go to https://developer.twitter.com/apps and then : sign-in, create a new application, fill-in the application details and create an access token with "read only" access.

	// SEARCH QUERY
	var search = "from:@twitter"; // add your searched term, hashtag or twitter query
	var delay = "3"; // wait X full days before log tweets. Ex : if we are the 10 of the month and delay=3, the script will only log tweets published before the 7 (set 0 if you don't want any delay).
	
	// CLOCK TRIGGER
	// You can (and should) set a clock trigger (cron) to automatically log tweets every X days. This is very useful considering the 7 days limit Twitter API limit to retrieve tweets. -> Set a clock trigger at least every 7 days, or less.
	// For that, go in your Apps script document to Edit > Current project's triggers > Add a trigger.
	
	// EMPTY CACHE
	var empty_cache = false; // set to true if you want to empty the cache (and so re-log previously logged tweets and add head row on the next run -> you may clean your google sheets). Just after the next run, set this variable back to false.

	// INITIATE THE DOCUMENT
	// For the first run (and all the others) you can wait for the clock trigger or manually trigger clicking on the "Run" button.


// MAIN FUNCTION
function TWEET_LOGGER( search ) {

  // Twitter credentials
  var props = PropertiesService.getScriptProperties();
  var search = encodeString_(search);
  Logger.log("EXECUTION DU SCRIPT...");
  
  // Empty cache ?
  if ( empty_cache == true ) {
	  props.deleteAllProperties();	   
   }
   
  // Encode consumer key and secret
  var tokenUrl = "https://api.twitter.com/oauth2/token";
  var tokenCredential = Utilities.base64EncodeWebSafe(
   CONSUMER_KEY + ":" + CONSUMER_SECRET);

  //  Obtain a bearer token with HTTP POST request
  var tokenOptions = {
   headers : {
     Authorization: "Basic " + tokenCredential,
     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" 
   },
   method: "post",
   payload: "grant_type=client_credentials"
  };
  
  //  Build the request
  if (delay === undefined || delay === null || delay == 0) {
    var until_param = "";
  }
  else {
    var date = new Date();
    date.setDate(date.getDate() - delay)
    date = Utilities.formatDate(new Date(date), "GMT+1", "yyyy-MM-dd")
    var until_param = "&until="+date;
  }
  var since_id = props.getProperty('saved_since_id') || '0';
  var run_id = props.getProperty('saved_run_id')  || '1';
  var query = '?q='+search+'&count=100&result_type=recent&include_entities=false&since_id='+since_id+until_param;
  var new_tweets = 0;
  
  // AFTER AN ERROR, YOU CAN RE-RUN THE SCRIPT (personnalised manually since_id)
  // var query = '?q='+search+'&count=100&result_type=recent&include_entities=false&until='+until_param+'&since_id=ID_OF_THE_LAST_TWEET';
  
  // RUN = 1
  if (run_id == 1) {
    var sheet_id = SpreadsheetApp.getActiveSpreadsheet().getId();
    var sheet_index = SpreadsheetApp.getActiveSheet().getName();
    var sheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_index);
    props.setProperty('active_sheet_id', sheet_id);
    props.setProperty('active_sheet_index', sheet_index);
    sheet.appendRow(['DATE', 'USERNAME', 'USER HANDLE', 'TWEET ID', 'USER FOLLOWERS', 'USER FOLLOWINGS', 'TWEET TEXT', 'TWEET RETWEETS', 'TWEET LIKES', 'TWEET STATUS', 'RT REPLY-USER', 'RT REPLY-ID']);
  }

  // RUN > 1
  else {
    var sheet_id = props.getProperty('active_sheet_id');
    var sheet_index = props.getProperty('active_sheet_index');
    var sheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_index);
  }

  // Call Twitter API
  var responseToken = UrlFetchApp.fetch(tokenUrl, tokenOptions);
  var parsedToken = JSON.parse(responseToken);
  var token = parsedToken.access_token;
  
  // BOUCLE LOG_TWEET PAGINATION
  while(true) {
    
   // Authenticate Twitter API requests with the bearer token
   var apiUrl = 'https://api.twitter.com/1.1/search/tweets.json'+query;
   var apiOptions = {
     headers : {
       Authorization: 'Bearer ' + token
     },
     "method" : "get"
   };
   
   var responseApi = UrlFetchApp.fetch(apiUrl, apiOptions);  
   var result = "";
   
   if (responseApi.getResponseCode() == 200) {

     var tweets = JSON.parse(responseApi.getContentText());
     var tweets_statuses = tweets.statuses;
       
     // loop = 1
     if (loop_id === undefined || loop_id === null) {
      var loop_id = 2;
      var lastRow = sheet.getLastRow();;
      for (var i = tweets_statuses.length - 1; i >= 0; i--) {
       var logtweet = logTweet_(tweets_statuses[i]);
       sheet.appendRow(logtweet);
       if (i == 0) {
        var since_id = tweets_statuses[0].id_str;
       }
      }  
     }
     // loop > 1
     else {     
       var indexRow = lastRow;
       for (var i = tweets_statuses.length - 1; i >= 0; i--) {
         var logtweet = logTweet_(tweets_statuses[i]);
         insertRow_(logtweet, sheet, indexRow);
         var indexRow = indexRow + 1;
       }
     }
     
     var new_tweets = new_tweets + tweets_statuses.length;

     // Next or last page ?
     var query = tweets.search_metadata.next_results;
     if (query === undefined || query === null) {
       break;
     }
     Utilities.sleep(1000);
  }
  }
  props.setProperty('saved_run_id', '2');
  props.setProperty('saved_since_id', since_id);
  Logger.log("Succès : "+new_tweets+" new tweets / max_id = "+since_id);
}

// Add the tweet details into the sheet
function logTweet_(tweet) {
  var log = [];
  log.push(Utilities.formatDate(new Date(tweet.created_at), "GMT-8", "yyyy/MM/dd HH:mm:ss"));
  log.push("'"+tweet.user.name);
  log.push('=HYPERLINK("https://twitter.com/' + tweet.user.screen_name + '";"@' + tweet.user.screen_name + '")');
  log.push('=HYPERLINK("https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str + '";"' + tweet.id_str + '")');
  log.push(tweet.user.followers_count);
  log.push(tweet.user.friends_count);
  log.push("'"+decodeHTML_(tweet.text));
  log.push(tweet.retweet_count);
  log.push(tweet.favorite_count);
  var retweet = tweet.retweeted_status;
  if (retweet === undefined || retweet === null) {
    if (tweet.text.charAt(0) == '@') {
      log.push('Reply');
      log.push('=HYPERLINK("https://twitter.com/' + tweet.in_reply_to_screen_name + '";"@' + tweet.in_reply_to_screen_name + '")');
      log.push('=HYPERLINK("https://twitter.com/' + tweet.in_reply_to_screen_name + '/status/' + tweet.in_reply_to_status_id_str + '";"' + tweet.in_reply_to_status_id_str + '")');
    }
    else {
      log.push('Original');
    }
  }
  else {
    log.push('Retweet');
    log.push('=HYPERLINK("https://twitter.com/' + retweet.user.screen_name + '";"@' + retweet.user.screen_name + '")');
    log.push('=HYPERLINK("https://twitter.com/' + retweet.user.screen_name + '/status/' + retweet.id_str + '";"' + retweet.id_str + '")');
  }
  
  return log;
}

// insertRow
function insertRow_(log, sheet, index) {
  sheet.insertRowAfter(index).getRange(index+1, 1, 1, log.length).setValues(new Array(log));
}

// Encoders
function encodeString_(q) {
  var str = encodeURIComponent(q);
  str = str.replace(/!/g, '%21');
  str = str.replace(/\*/g, '%2A');
  str = str.replace(/\(/g, '%28');
  str = str.replace(/\)/g, '%29');
  str = str.replace(/'/g, '%27');
  return str;
}

// Library of HTMLentities
function decodeHTML_(q) {
  var HTMLent = [
    ['&', 'amp'],
    ['"', 'quot'],
    ['"', 'quot'],
    ["'", "apos"],
    ["’", "apos"],
    ["’", "apos"],
    ['\<', 'lt'],
    ['\>', 'gt'],
    ['¡', 'iexcl'],
    ['¢', 'cent'],
    ['£', 'pound'],
    ['¤', 'curren'],
    ['¥', 'yen'],
    ['¦', 'brvbar'],
    ['§', 'sect'],
    ['¨', 'uml'],
    ['©', 'copy'],
    ['ª', 'ordf'],
    ['«', 'laquo'],
    ['¬', 'not'],
    ['®', 'reg'],
    ['¯', 'macr'],
    ['°', 'deg'],
    ['±', 'plusmn'],
    ['²', 'sup2'],
    ['³', 'sup3'],
    ['´', 'acute'],
    ['µ', 'micro'],
    ['¶', 'para'],
    ['·', 'middot'],
    ['¸', 'cedil'],
    ['¹', 'sup1'],
    ['º', 'ordm'],
    ['»', 'raquo'],
    ['¼', 'frac14'],
    ['½', 'frac12'],
    ['¾', 'frac34'],
    ['¿', 'iquest'],
    ['×', 'times'],
    ['÷', 'divide'],
    ['À', 'Agrave'],
    ['Á', 'Aacute'],
    ['Â', 'Acirc'],
    ['Ã', 'Atilde'],
    ['Ä', 'Auml'],
    ['Å', 'Aring'],
    ['Æ', 'AElig'],
    ['Ç', 'Ccedil'],
    ['È', 'Egrave'],
    ['É', 'Eacute'],
    ['Ê', 'Ecirc'],
    ['Ë', 'Euml'],
    ['Ì', 'Igrave'],
    ['Í', 'Iacute'],
    ['Î', 'Icirc'],
    ['Ï', 'Iuml'],
    ['Ð', 'ETH'],
    ['Ñ', 'Ntilde'],
    ['Ò', 'Ograve'],
    ['Ó', 'Oacute'],
    ['Ô', 'Ocirc'],
    ['Õ', 'Otilde'],
    ['Ö', 'Ouml'],
    ['Ø', 'Oslash'],
    ['Ù', 'Ugrave'],
    ['Ú', 'Uacute'],
    ['Û', 'Ucirc'],
    ['Ü', 'Uuml'],
    ['Ý', 'Yacute'],
    ['Þ', 'THORN'],
    ['ß', 'szlig'],
    ['à', 'agrave'],
    ['á', 'aacute'],
    ['â', 'acirc'],
    ['ã', 'atilde'],
    ['ä', 'auml'],
    ['å', 'aring'],
    ['æ', 'aelig'],
    ['ç', 'ccedil'],
    ['è', 'egrave'],
    ['é', 'eacute'],
    ['ê', 'ecirc'],
    ['ë', 'euml'],
    ['ì', 'igrave'],
    ['í', 'iacute'],
    ['î', 'icirc'],
    ['ï', 'iuml'],
    ['ð', 'eth'],
    ['ñ', 'ntilde'],
    ['ò', 'ograve'],
    ['ó', 'oacute'],
    ['ô', 'ocirc'],
    ['õ', 'otilde'],
    ['ö', 'ouml'],
    ['ø', 'oslash'],
    ['ù', 'ugrave'],
    ['ú', 'uacute'],
    ['û', 'ucirc'],
    ['ü', 'uuml'],
    ['ý', 'yacute'],
    ['þ', 'thorn'],
    ['ÿ', 'yuml']
  ]; 
  for (var i = 0, max = HTMLent.length; i < max; ++i) {
    q = q.replace(new RegExp('&'+HTMLent[i][1]+';', 'g'), HTMLent[i][0]);
  }
  return q;
}