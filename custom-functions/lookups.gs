// Google Sheets custom functions - lookups
// source : https://github.com/pfdt/google-sheets-custom-functions


/**
 * Get the head row value of a searched term, from a multi-dimensional range.
 *
 * @param {"red"} searchValue
 *        Searched term
 *
 * @param {"A5:H50"} range
 *        The multi-dimensional range to be searched
 *
 * @param {"A1:H1"} tableHead
 *        The head row of the table to return (must be the same horizontal lenght as the range)
 *
 * @customfunction
 */

function headLookup( searchValue, range, tableHead )
{
  var returnVal = null;
  if (searchValue) {
    var flatArray = [].concat.apply([], range);
    var col = flatArray.indexOf(searchValue);
    var row = -1;
    if (col != -1)
      while (range[++row].length <= col)
        col -= range[row].length;
    
    returnVal = tableHead[0][col];
  }

  return returnVal;
}


/**
 * Get the lookup (vertical) value from a multi-dimensional range.
 *
 * @param {"red"} searchValue
 *        The value to search for the lookup (vertical)
 *
 * @param {"A5:H50"} range
 *        The multi-dimensional range to be searched
 *
 * @param {"4"} searchIndex
 *        The column-index of the array where to search
 *
 * @param {"2"} returnIndex
 *        The column-index of the array from where to get the returning matching value
 *
 * @customfunction
 */
 
 // Adapted from narottamdas : https://gist.github.com/narottamdas/26aca662b6eb19322789ec98a445eb18
 
function rangeLookup( searchValue, array, searchIndex, returnIndex )
{
  var returnVal = null;
  var searchIndex = --searchIndex;
  var returnIndex = --returnIndex;
  var i;
  for(i=0; i<range.length; i++)
  {
    if(range[i][searchIndex]==searchValue)
    {
      returnVal = range[i][returnIndex];
      break;
    }
  }
  
  return returnVal;
}

