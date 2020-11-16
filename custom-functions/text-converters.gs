// Google Sheets custom functions - text converters
// source : https://github.com/pfdt/google-sheets-custom-functions


/**
 * Replace every accented characters by non-accented version.
 *
 * @param {"text example"} text
 *        Accented text to convert
 *
 * @customfunction
 */

function removeACCENT( text ) {

    for (var i = 0, max = ACCENTent.length; i < max; ++i) 
        text = text.replace(new RegExp(ACCENTent[i][0], 'g'), ACCENTent[i][1]);
    return text;
}


/**
 * Encode a regular text (ISO 8859-1) to Uniform Resource Identifier (URI).
 *
 * @param {"URI text"} URI text
 *        URI text to encode
 *
 * @customfunction
 */

function encodeURI( text ) {
return encodeURIComponent(text) ;
}


/**
 * Decode an Uniform Resource Identifier (URI) to regular text (ISO 8859-1).
 *
 * @param {"URI text"} URI text
 *        URI text to decode
 *
 * @customfunction
 */

function decodeURI( text ) {
return decodeURIComponent(text) ;
}


/**
 * Encode a regular text (ISO 8859-1) to HTML one.
 *
 * @param {"text example"} text
 *        Text to encode
 *
 * @customfunction
 */

function encodeHTML( text ) {

    for (var i = 0, max = HTMLent.length; i < max; ++i) 
        text = text.replace(new RegExp(HTMLent[i][0], 'g'), '&'+HTMLent[i][1]+';');
    text = text.replace(/&apos;/g, "'");
    return text;
}


/**
 * Decode an HTML text to regular one (ISO 8859-1).
 *
 * @param {"text example"} text
 *        Text to decode
 *
 * @customfunction
 */

function decodeHTML( text ) {

    for (var i = 0, max = HTMLent.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+HTMLent[i][1]+';', 'g'), HTMLent[i][0]);

    return text;
}


/**
 * Encode a regular text (ISO 8859-1) to UTF8.
 *
 * @param {"text example"} text
 *        Text to encode
 *
 * @customfunction
 */

function encodeUTF8( text ) {

    for (var i = 0, max = UTF8ent.length; i < max; ++i) 
        text = text.replace(new RegExp(UTF8ent[i][0], 'g'), UTF8ent[i][1]);
    return text;
}


/**
 * Decode UTF8 text to regular one (ISO 8859-1).
 *
 * @param {"text example"} text
 *        Text to decode
 *
 * @customfunction
 */

function decodeUTF8( text ) {

    for (var i = 0, max = UTF8ent.length; i < max; ++i) 
        text = text.replace(new RegExp(UTF8ent[i][1], 'g'), UTF8ent[i][0]);

    return text;
}


/**
 * Convert a value into a string.
 *
 * @param {"3.33"} value
 *        Value to convert
 *
 * @customfunction
 */

function toString( value ) {
    return value === null || IsMissing(value) ? "" : value.toString();
}
function IsMissing(x) {
    return isUndefined(x);
}
function isUndefined(arg) {
    return typeof arg === "undefined";
}


// Library of HTMLentities (required for encodeHTML and decodeHTML functions)
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

// Library of UTF8entities (required for encodeUTF8 and decodeUTF8 functions)
var UTF8ent = [
  ['–', 'â€“'],
  ['—', 'â€”'],
  ['¡', 'Â¡'],
  ['¿', 'Â¿'],
  ['…', 'â€¦'],
  ['·', 'Â·'],
  ['‘', 'â€˜'],
  ['’', 'â€™'],
  ['‚', 'â€š'],
  ['‹', 'â€¹'],
  ['›', 'â€º'],
  ['“', 'â€œ'],
  ['”', 'â€'],
  ['„', 'â€ž'],
  ['«', 'Â«'],
  ['»', 'Â»'],
  ['§', 'Â§'],
  ['¶', 'Â¶'],
  ['‰', 'â€°'],
  ['†', 'â€'],
  ['‡', 'â€¡'],
  ['•', 'â€¢'],
  ['´', 'Â´'],
  ['˜', 'Ëœ'],
  ['¯', 'Â¯'],
  ['¨', 'Â¨'],
  ['¸', 'Â¸'],
  ['ˆ', 'Ë†'],
  ['°', 'Â°'],
  ['©', 'Â©'],
  ['®', 'Â®'],
  ['±', 'Â±'],
  ['÷', 'Ã·'],
  ['×', 'Ã—'],
  ['¬', 'Â¬'],
  ['¦', 'Â¦'],
  ['¤', 'Â¤'],
  ['¢', 'Â¢'],
  ['£', 'Â£'],
  ['¥', 'Â¥'],
  ['€', 'â‚¬'],
  ['¹', 'Â¹'],
  ['½', 'Â½'],
  ['¼', 'Â¼'],
  ['²', 'Â²'],
  ['³', 'Â³'],
  ['¾', 'Â¾'],
  ['ª', 'Âª'],
  ['Á', 'Ã'],
  ['á', 'Ã¡'],
  ['à', 'Ã'],
  ['À', 'Ã€'],
  ['Â', 'Ã‚'],
  ['â', 'Ã¢'],
  ['Å', 'Ã…'],
  ['å', 'Ã¥'],
  ['Ä', 'Ã„'],
  ['ä', 'Ã¤'],
  ['ã', 'Ã£'],
  ['Ã', 'Ãƒ'],
  ['Æ', 'Ã†'],
  ['æ', 'Ã¦'],
  ['ç', 'Ã§'],
  ['Ç', 'Ã‡'],
  ['Ð', 'Ã'],
  ['ð', 'Ã°'],
  ['É', 'Ã‰'],
  ['é', 'Ã©'],
  ['è', 'Ã¨'],
  ['È', 'Ãˆ'],
  ['ê', 'Ãª'],
  ['Ê', 'ÃŠ'],
  ['Ë', 'Ã‹'],
  ['ë', 'Ã«'],
  ['ƒ', 'Æ’'],
  ['Í', 'Ã'],
  ['í', 'Ã­'],
  ['ì', 'Ã¬'],
  ['Ì', 'ÃŒ'],
  ['î', 'Ã®'],
  ['Î', 'ÃŽ'],
  ['Ï', 'Ã'],
  ['ï', 'Ã¯'],
  ['Ñ', 'Ã‘'],
  ['ñ', 'Ã±'],
  ['º', 'Âº'],
  ['Ó', 'Ã“'],
  ['ó', 'Ã³'],
  ['Ò', 'Ã’'],
  ['ò', 'Ã²'],
  ['Ô', 'Ã”'],
  ['ô', 'Ã´'],
  ['Ö', 'Ã–'],
  ['ö', 'Ã¶'],
  ['Õ', 'Ã•'],
  ['õ', 'Ãµ'],
  ['Ø', 'Ã˜'],
  ['ø', 'Ã¸'],
  ['Œ', 'Å’'],
  ['œ', 'Å“'],
  ['Š', 'Å'],
  ['š', 'Å¡'],
  ['ß', 'ÃŸ'],
  ['™', 'â„¢'],
  ['ú', 'Ãº'],
  ['Ú', 'Ãš'],
  ['ù', 'Ã¹'],
  ['Ù', 'Ã™'],
  ['Û', 'Ã›'],
  ['û', 'Ã»'],
  ['ü', 'Ã¼'],
  ['Ü', 'Ãœ'],
  ['Ý', 'Ã'],
  ['ý', 'Ã½'],
  ['ÿ', 'Ã¿'],
  ['Ÿ', 'Å¸'],
  ['Ž', 'Å½'],
  ['ž', 'Å¾'],
  ['þ', 'Ã¾'],
  ['Þ', 'Ãž'],
  ['µ', 'Âµ']
];

// Library of accented characters (required for the removeACCENT function)
var ACCENTent = [
  ['Á', 'A'],
  ['á', 'a'],
  ['à', 'a'],
  ['À', 'A'],
  ['Â', 'A'],
  ['â', 'a'],
  ['Å', 'A'],
  ['å', 'a'],
  ['Ä', 'A'],
  ['ä', 'a'],
  ['ã', 'a'],
  ['Ã', 'A'],
  ['Æ', 'AE'],
  ['æ', 'ae'],
  ['ç', 'c'],
  ['Ç', 'C'],
  ['Ð', 'D'],
  ['É', 'E'],
  ['é', 'e'],
  ['è', 'e'],
  ['È', 'E'],
  ['ê', 'e'],
  ['Ê', 'E'],
  ['Ë', 'E'],
  ['ë', 'e'],
  ['ƒ', 'f'],
  ['Í', 'I'],
  ['í', 'i­'],
  ['ì', 'i'],
  ['Ì', 'i'],
  ['î', 'i'],
  ['Î', 'I'],
  ['Ï', 'I'],
  ['ï', 'i'],
  ['Ñ', 'N'],
  ['ñ', 'n'],
  ['Ó', 'O'],
  ['ó', 'o'],
  ['Ò', 'O'],
  ['ò', 'o'],
  ['Ô', 'O'],
  ['ô', 'o'],
  ['Ö', 'O'],
  ['ö', 'o'],
  ['Õ', 'O'],
  ['õ', 'o'],
  ['Ø', 'O'],
  ['ø', 'o'],
  ['Œ', 'OE'],
  ['œ', 'oe'],
  ['Š', 'S'],
  ['š', 's'],
  ['ú', 'u'],
  ['Ú', 'U'],
  ['ù', 'u'],
  ['Ù', 'U'],
  ['Û', 'U'],
  ['û', 'u'],
  ['ü', 'u'],
  ['Ü', 'U'],
  ['Ý', 'Y'],
  ['ý', 'y'],
  ['ÿ', 'y'],
  ['Ÿ', 'U'],
  ['Ž', 'Z'],
  ['ž', 'z']
];