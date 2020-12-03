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


/**
 * Get the the crossing value between a vertical and an horizontal search from a multi-dimensional range (Vloolup and Hlookup combined), with two possible search for both vertical and horizontal lookups.
 *
 * @param {"A5:H50"} range
 *        The multi-dimensional range to be searched
 *
 * @param {"Francis"} V_search_key
 *        The value to search for the vertical lookup
 *
 * @param {"1"} V_index
 *        The column index to be searched for the vertical lookup
 *
 * @param {"Town"} H_search_key
 *        The value to search for the vertical lookup
 *
 * @param {"1"} H_index
 *        The row index to be searched for the horizontal lookup
 *
 * @param {"New York"} Vbis_search_key
 *        The value to search for the vertical lookup (optional)
 *
 * @param {"3"} Vbis_index
 *        The column index to be searched for the vertical lookup (optional)
 *
 * @param {"Martin"} Hbis_search_key
 *        The value to search for the vertical lookup (optional)
 *
 * @param {"5"} Hbis_index
 *        The row index to be searched for the horizontal lookup (optional)
 *
 * @customfunction
 */

function crossLookup(array,V_search_key,V_index,H_search_key,H_index,Vbis_search_key,Vbis_index,Hbis_search_key,Hbis_index) {
  var returnVal = null;
  var returnError = "#N/A";
  
  if (array && V_search_key && V_index && H_search_key && H_index) {
    
    var V_index = --V_index;
    var H_index = --H_index;
    var rowsA = [];
    var colsA = [];
    var i;
    
    // Vlookup
    for (i=0; i<array.length; i++) {
      if (array[i][V_index]==V_search_key) {
        rowsA.push(i);
      }
    }
    
    // Hlookup
    for (i = 0; i<array[H_index].length; i++) {
      if (array[H_index][i]==H_search_key) {
        colsA.push(i);
      }
    }
    
    // noResult
    if (!rowsA || !colsA) {
      return returnError;
    }
    
    // BIS Vlookup
    if (Vbis_search_key && Vbis_index) {
      var Vbis_index = --Vbis_index;
      var rowsB = [];

      for (i=0; i<array.length; i++) {
        if (array[i][Vbis_index]==Vbis_search_key) {
          rowsB.push(i);
        }
      }
      
      // rowsA vs rowsB
      for (i in rowsA) {   
        if (rowsB.indexOf(rowsA[i]) > -1) {
          var row = rowsA[i];
          break;         
        }
      }
      if (!row) {
        return returnError;
      }
    }
    else {
      var row = rowsA[0];
    }
        
    // BIS Hlookup
    if (Hbis_search_key && Hbis_index) {
      var Hbis_index = --Hbis_index;
      var colsB = [];
      
      for (i=0; i<array[Hbis_index].length; i++) {
        if (array[Hbis_index][i]==Hbis_search_key) {
          colsB.push(i);
        }
      }
          
      // colsA vs colsB
      for (i in colsA) {   
        if (colsB.indexOf(colsA[i]) > -1) {
          var col = colsA[i];
          break;
        }
      }
      if(!col) {
        return returnError;
      }
    }
    else {
      var col = colsA[0];
    }
    
    // return
    return array[row][col];
  } 
}
