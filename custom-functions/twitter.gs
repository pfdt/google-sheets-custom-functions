// Google Sheets custom functions - twitter
// source : https://github.com/pfdt/google-sheets-custom-functions

// FUNCTIONS CONFIGURATION : fill up the API infos to get the functions works.
// To get these informations, go to https://developer.twitter.com/apps and then : sign-in, create a new application, fill-in the application details and create an access token with "read only" access.
var CONSUMER_KEY = 'YOUR_CONSUMER_KEY'; // Register your app with Twitter.
var CONSUMER_SECRET = 'YOUR_CONSUMER_SECRET'; // Register your app with Twitter.


/**
 * Get the number of published tweets with the specified searched term, hashtag or twitter query (from the 7 previous days maximum).
 *
 * @param {"#googlesheets"} search
 *        Searched term, hashtag or twitter query
 *
 * @param {"2020-01-31"} endDate
 *        Limit the search to this end date, using the format : YYYY-MM-DD (optional)
 *
 * @customfunction
 */

function TWITTERsearchCount( search, endDate ) {
  
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
    
  // Until date or not ?
  if (endDate === undefined || endDate === null) {
    var until = "";
     }
  else {
    var until = '&until='+endDate;
  }
  
  // Call Twitter API
  var search = encodeURL(search);
  var responseToken = UrlFetchApp.fetch(tokenUrl, tokenOptions);
  var parsedToken = JSON.parse(responseToken);
  var token = parsedToken.access_token;
  var query = '?q='+search+'&count=100&result_type=recent'+until;
  var total_tweet_count = 0;

  // Boucle pagination
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
     
     // Parse the JSON encoded Twitter API response
     var tweets = JSON.parse(responseApi.getContentText());
     var tweet_count = 0;
     var tweets_statuses = tweets.statuses;
     
     for (var i = tweets_statuses.length - 1; i >= 0; i--) {
            var tweet_count = tweet_count + 1;
     }

     var total_tweet_count = total_tweet_count + tweet_count;
     
     // Next page or end ?
     var query = tweets.search_metadata.next_results

     if (query === undefined || query === null) {
       break;
     }
     Utilities.sleep(100); 
  }
}
  return total_tweet_count
}


/**
 * Get the number of "followers" from the specified account.
 *
 * @param {"@twitter"} twitter handle
 *        Twitter handle from whom to get followers count
 *
 * @customfunction
 */

function TWITTERfollowersCount( handle ) {

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

 var responseToken = UrlFetchApp.fetch(tokenUrl, tokenOptions);
 var parsedToken = JSON.parse(responseToken);
 var token = parsedToken.access_token;

 // Authenticate Twitter API requests with the bearer token
 var apiUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name='+handle;
 var apiOptions = {
   headers : {
     Authorization: 'Bearer ' + token
   },
   "method" : "get"
 };

 var responseApi = UrlFetchApp.fetch(apiUrl, apiOptions);

 var result = "";

 if (responseApi.getResponseCode() == 200) {

   // Parse the JSON encoded Twitter API response
   var tweets = JSON.parse(responseApi.getContentText());
   return tweets.followers_count

 }

 Logger.log(result);

}


/**
 * Get the number of "followings" from a specified account.
 *
 * @param {"@twitter"} handle
 *        Twitter handle from whom to get followings count
 *
 * @customfunction
 */

function TWITTERfollowingsCount( handle ) {
  
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

 var responseToken = UrlFetchApp.fetch(tokenUrl, tokenOptions);
 var parsedToken = JSON.parse(responseToken);
 var token = parsedToken.access_token;

 // Authenticate Twitter API requests with the bearer token
 var apiUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name='+handle;
 var apiOptions = {
   headers : {
     Authorization: 'Bearer ' + token
   },
   "method" : "get"
 };

 var responseApi = UrlFetchApp.fetch(apiUrl, apiOptions);

 var result = "";

 if (responseApi.getResponseCode() == 200) {

   // Parse the JSON encoded Twitter API response
   var tweets = JSON.parse(responseApi.getContentText());
   return tweets.friends_count

 }

 Logger.log(result);

}