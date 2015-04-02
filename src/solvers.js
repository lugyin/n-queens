/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// board.set(n, x) takes in target row, x is what to replace row with
// board.get(n) retrieves the target row
// board.rows() retrieves entire board

// board.hasAnyRowConflicts() checks current state of the board
//  for horizontal issues
// board.hasAnyColConflicts() checks current state of board for column conflicts

window.playsGen = function(n){
  plays = [];
  for(var i = 0; i < n; i++){
    plays.push([]);
    for(var o = 0; o < n; o++){
      plays[i].push(0);
      if(i === o){
        plays[i][o] = 1;
      }
    }
  }
  return plays;
}

window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({'n': n});
  var successSol = [];
  var rowLength = n;

  var plays = window.playsGen(n);

  // for(var i = 0; i < n; i++){
  //   plays[i][]
  // }
  // var boardsSoFar = [];
  // // for(){
  var algorithm = function(queensLeft){
    if(queensLeft === 0){
      successSol.push(board.rows());
    }
    for(var i = 0; i < plays.length; i++){
      board.set(x, plays[i])
      boardsSoFar.push(board)
      algorithm(queensLeft - 1);
      // if(!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()){
        // return board.rows();
      // }
  }
    algorithm(n);
    return successSol[0];
    }
  // }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  var currentSolutions = [];
  var position

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
