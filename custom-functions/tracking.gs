// Google Sheets custom functions - tracking
// source : https://github.com/pfdt/google-sheets-custom-functions

/**
 * Generate a Google UTM tag to append to a link.
 *
 * @param {"referral"} medium
 *        Campaign medium (ex: social, email, referral, cpc...)
 * @param {"facebook"} source
 *        Campaign source (ex: facebook, twitter, github.com...)
 * @param {"$10coupon"} campaign (optional)
 *        Campaign name
 *
 * @customfunction
 */

function UTMtag( medium, source, campaign ) {

    /* COMPLETE DATAS */
  if ((source == '') || (medium == '')) {
    return '#SOURCE!' ;
  }
  else { 

    /* TAGGED LINK */
  if ((campaign == '') || (campaign === undefined)) {
      var tag = '?utm_source=' + source + '&utm_medium=' + medium;
    }
  else {
      var tag = '?utm_source=' + source + '&utm_medium=' + medium + '&utm_campaign=' + campaign;
    }

    return tag ;
  }
}