// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
                                                                                         // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //declare var counter = 0;
      //iterate through current row we are interested in
        // if we find occupied space in row; counter++
        // after iteration, if counter > 1; return true;

      var counter = 0;
      var rowsArray = this.rows();
      for(var i = 0; i < rowsArray[rowIndex].length; i++){
        counter += rowsArray[rowIndex][i];
          if(counter > 1){
            return true;
          }
        }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //iterate through every row; run hasRowConflictAt on each row
        //if any row returns true; return true;
      var rowsArray = this.rows();
      for(var i = 0; i < rowsArray.length; i++){
        if(this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //iterate through each element of the rowsArray
      //push the element at row [colIndex] into a new array
      //sum that array, if > 1, return true
      var colArr = [];
      var rowsArray = this.rows();
      var count = 0;
      for(var i = 0; i < rowsArray.length;i++){
        colArr.push(rowsArray[i][colIndex]);
      }
      for(var x = 0; x < colArr.length; x++){
        count += colArr[x];
      }
      return count > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //iterate through each col in the board
      //test each col using hasColConflictAt, if any return true, short circuit true
      var rowsArray = this.rows();
      for(var i = 0; i < rowsArray[0].length; i++){
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var currentplace = majorDiagonalColumnIndexAtFirstRow;
      var rowsArray = this.rows();
      var count = 0;
      var val;
      for(var i = 0; i < rowsArray[0].length;i++){
        val = (rowsArray[i][i + currentplace]);
        if(val!== undefined){
          count += val;
        }
      }

      return count > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //check rowsArray.length to find n
       //calculate negative index equation (2 - n)
       //iterate from negative index value to it's absolute value

    var rowsArray = this.rows();
    var rowSize = rowsArray.length;
    var negIdx = (2 - rowSize);

    for(var i = negIdx; i < Math.abs(negIdx); i++){
      if(this.hasMajorDiagonalConflictAt(i)){
        return true;
      }
    }

      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //starting at top row
      var currentplace = minorDiagonalColumnIndexAtFirstRow;
      var rowsArray = this.rows();
      var count = 0;
      var val;
      for(var i = 0; i < rowsArray.length; i++){
        val = rowsArray[i][currentplace - i];
        if(val !== undefined){
          count += val;
            if(count > 1){
              return true;
            }
          }
        }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rowsArray = this.rows();
      var rowSize = rowsArray.length;
      var endIdx = (rowSize - 2)*(2) + 1;

      for(var i = 1; i <= endIdx; i++){
        if(this.hasMinorDiagonalConflictAt(i)){
          return true;
        }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
