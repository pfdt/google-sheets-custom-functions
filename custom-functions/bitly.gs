// Google Sheets custom functions - bit.ly
// source : https://github.com/pfdt/google-sheets-custom-functions

// FUNCTIONS CONFIGURATION : fill up the API infos to get the functions works.
// To get these informations, go to https://bitly.is/accesstoken
var accessToken = 'YOU_BITLY_ACCESS_TOKEN';


/**
 * Generate a short bit.ly link.
 *
 * @param {"http://www.google.fr"} url
 *        Link to short
 *
 * @customfunction
 */

function BITLYshortener( url ) {

    /* COMPLETE DATAS */
  if ((url == '') || ( !url.match(/(ftp|http|https):\/\//i))) {
    return '#SOURCE!' ;
  }
  else {	
	/* API CALL */
	// var accessToken = 'YOU_BITLY_ACCESS_TOKEN'; // activate this line if you want to overwrite the global accessToken variable (convenient if you want to use different or multiple bitly accounts.
	var group_guid = BITLYGroupId(accessToken); // you can alos run the function and paste here the group_guid value
	var fetchUrl = 'https://api-ssl.bitly.com/v4/shorten';
	var headers = {
		'Authorization': 'Bearer '+ accessToken,
		'Content-Type': 'application/json',
	};
	var payload = {
		//'domain' : 'bit.ly',
		//'title' : '',
		//'tags' : ['', ''],
		'group_guid' : group_guid,
		'long_url' : url
	};
	var params = {
		'method' : 'post',
		'headers' : headers,
		'payload' : JSON.stringify(payload),
		'muteHttpExceptions' : true
	};
	var response = UrlFetchApp.fetch(fetchUrl, params);
	var BITLYshort_url = JSON.parse(response.getContentText()).link;
	return BITLYshort_url;
  }
}


/**
 * Retrieve the original (long) url from a bit.ly link.
 *
 * @param {"https://bitly.is/3pyLtwg"} url
 *        bit.ly link
 *
 * @customfunction
 */

function BITLYunshortener( url ) {

    /* COMPLETE DATAS */
  if ((url == '') || ( !url.match(/(ftp|http|https):\/\//i))) {
    return '#SOURCE!' ;
  }
  else {
  	/* GET BITLINK_ID */ 
	var BITLYlink_id = url.substring(url.indexOf('//')+2);
	
    /* API CALL */
	// var accessToken = 'YOU_BITLY_ACCESS_TOKEN'; // activate this line if you want to overwrite the global accessToken variable (convenient if you want to use different or multiple bitly accounts.
	var fetchUrl = 'https://api-ssl.bitly.com/v4/expand'
	var headers = {
		'Authorization': 'Bearer '+ accessToken,
		'Content-Type': 'application/json',
	};
	var payload = {
		'bitlink_id' : BITLYlink_id
	};
	var params = {
		'method' : 'post',
		'headers' : headers,
		'payload' : JSON.stringify(payload),
	};
	var response = UrlFetchApp.fetch(fetchUrl, params);
	var BITLYlong_url = JSON.parse(response.getContentText()).long_url;
	return BITLYlong_url;  
  }
}


/**
 * Get the number of clicks from a bit.ly link.
 *
 * @param {"https://bitly.is/3pyLtwg"} url
 *        bit.ly link
 *
 * @customfunction
 */

function BITLYclick( url ) {

    /* COMPLETE DATAS */
  if ((url == '') || ( !url.match(/(ftp|http|https):\/\//i))) {
    return '#SOURCE!' ;
  }
  else {
    /* GET BITLINK_ID */ 
	var BITLYlink_id = url.substring(url.indexOf('//')+2);
    
    /* API CALL */
	// var accessToken = 'YOU_BITLY_ACCESS_TOKEN'; // activate this line if you want to overwrite the global accessToken variable (convenient if you want to use different or multiple bitly accounts.
	var fetchUrl = 'https://api-ssl.bitly.com/v4/bitlinks/' + BITLYlink_id + '/clicks/summary';
	var headers = {
		'Authorization': 'Bearer '+ accessToken,
		'Content-Type': 'application/json',
	};
	var params = {
		'method' : 'get',
		'headers' : headers,
	};
	var response = UrlFetchApp.fetch(fetchUrl, params);
	var BITLYlink_click = JSON.parse(response.getContentText()).total_clicks;
	return BITLYlink_click;   
  }
}


// Retrive the bit.ly groupId (required for the BITLYshortener function)
function BITLYGroupId(accessToken) {
  var headers = {'Authorization' : 'Bearer '+accessToken};
  var params = {'headers' : headers};
  var fetchUrl = 'https://api-ssl.bitly.com/v4/groups';
  var response = UrlFetchApp.fetch(fetchUrl, params);
  var group_guid = JSON.parse(response.getContentText()).groups[0].guid;
  Logger.log(group_guid)
  return group_guid
}