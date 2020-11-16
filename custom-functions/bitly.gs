// Google Sheets custom functions - bit.ly
// source : https://github.com/pfdt/google-sheets-custom-functions

// FUNCTIONS CONFIGURATION : fill up the API infos to get the functions works.
// To get these informations, sign in to your bit.ly account and go to : Profile menu > Profile Settings > Generic Access Token.
var apiKey = 'YOU_BITLY_APIKEY';
var username = 'YOUR_BITLY_USERNAME';


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
    /* REPLACE BEFORE BITLY */
    url = url.replace(/\s/g,'');
    url = encodeURIComponent(url);
    
    /* SHORTENER */
    var bitcall = 'http://api.bit.ly/shorten?t=1&version=3&login=' + username + '&apiKey=' + apiKey + '&format=text&longUrl=' + url;
    var bitlink = UrlFetchApp.fetch(bitcall).getContentText();
    return bitlink ;
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
    /* REPLACE BEFORE BITLY */
    url = url.replace(/\s/g,'');
    url = encodeURIComponent(url);
    
    /* UNSHORTENER */
    var bitcall = 'https://api-ssl.bitly.com/v3/expand?login=' + username + '&apiKey=' + apiKey + '&format=text&shortUrl=' + url;
    var responseApi = UrlFetchApp.fetch(bitcall);

    // Parse the JSON encoded Twitter API response
    var bitlink = JSON.parse(responseApi.getContentText());
    return bitlink.data.expand[0].long_url
    
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
    /* REPLACE BEFORE BITLY */
    url = url.replace(/\s/g,'');
    url = encodeURIComponent(url);
    
    /* SHORTENER */
    var bitcall = 'https://api-ssl.bitly.com/v3/link/clicks?format=txt&unit=day&units=-1&rollup=true&access_token=fa98ec7a674af0d805527cb7851dee6c5ccadc63&link=' + url;
    var bitlink = UrlFetchApp.fetch(bitcall).getContentText();
    return bitlink ;
  }
}