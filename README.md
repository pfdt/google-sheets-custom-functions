# Google Sheets custom functions

A collection of custom functions made for Google Sheets / Google Scripts.


## CUSTOM FUNCTIONS LIST

How to use it ?
- Simply open a Google Sheets file and go to Tools > Script editor.
- Copy paste the functions you want (you should better create new script files if you want to use a lot of custom functions).
- Save and go back to your Sheets file.
- Begin to use the function in your cells the same way you are doing it with native functions !


### bit.ly
- __BITLYshortener__ : Generate a short bit.ly link.
- __BITLYunshortener__ : Retrieve the original (long) url from a bit.ly link.
- __BITLYclick__ : Get the number of clicks from a bit.ly link.

_bit.ly API credentials are required, see the configuration steps on the file_


### twitter
- __TWITTERsearchCount__ : Get the number of published tweets with the specified searched term, hashtag or twitter query (from the 7 previous days maximum).
- __TWITTERfollowersCount__ : Get the number of "followers" from the specified account.
- __TWITTERfollowingsCount__ : Get the number of "followings" from a specified account.

_Twitter API credentials are required, see the configuration steps on the file_


### tracking
- __UTMtag__ : Generate a Google UTM tag to append to a link.


### lookups
- __headLookup__ : Get the head row value of a searched term, from a multi-dimensional range.
- __rangeLookup__ : Get the lookup (vertical) value from a multi-dimensional range.


### text converters
- __removeACCENT__ : Replace every accented characters by non-accented version.
- __encodeURI__ : Encode a regular text (ISO 8859-1) to Uniform Resource Identifier (URI).
- __decodeURI__ : Decode an Uniform Resource Identifier (URI) to regular text (ISO 8859-1).
- __encodeHTML__ : Encode a regular text (ISO 8859-1) to HTML one.
- __decodeHTML__ : Decode an HTML text to regular one (ISO 8859-1).
- __encodeUTF8__ : Encode a regular text (ISO 8859-1) to UTF8.
- __decodeUTF8__ : Decode UTF8 text to regular one (ISO 8859-1).
- __toString__ : Convert a value into a string.


##  APPS SCRIPT LIST

How to use it ?
- Simply open a Google Sheets file and go to Tools > Script editor.
- Copy paste the app you want.
- Read and follow the Script configuration steps.

### tweet logger
__This script log tweets informations to a Google Sheets document, based on searched term, hashtag or twitter query.__

It can be used with a clock trigger to have automatic updates.

The tweet informations logged are : date, username, user handle, tweet id, user followers count, user followings count, tweet text, retweets count, likes count, tweet status, RT reply user, RT reply id.

