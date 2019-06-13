// Q1. Write a function that takes a string as input and returns the string reversed.
// Example: Given s = "hello", return "olleh".

function reverseString(str) {
  return str.split("").reverse().join("");
}

console.log(reverseString('hello'));

// Q2. Given a positive integer num, write a function which returns True if num is a perfect
// square else False.
// Note: Do not use any built-in library function such as sqrt.
// Example 1:
// Input: 16
// Returns: True
// Example 2:
// Input: 14
// Returns: False

function isPerfectSquare(n) {
  function sqrt(n) {
    var x;
    var x1 = n / 2;

    do {
      x = x1;
      x1 = (x + (n / x)) / 2;
    } while (x !== x1);
    return x;
  }

  return n > 0 && sqrt(n) % 1 === 0;
}

console.log(`isPerfectSquare(9): ${isPerfectSquare(9)}`)

// Q3. Given a set of non-overlapping intervals, insert a new interval into the intervals
// (merge if necessary).
// You may assume that the intervals were initially sorted according to their start times.
// Example 1:
// Given intervals [1,3],[6,9], insert and merge [2,5] in as [1,5],[6,9].
// Example 2:
// Given [1,2],[3,5],[6,7],[8,10],[12,16], insert and merge [4,9] in as [1,2],[3,10],[12,16].
// This is because the new interval [4,9] overlaps with [3,5],[6,7],[8,10].

function insert(intervals, newInterval) {
  var res = [];
  var isInserted = false;
  for (var i = 0; i < intervals.length; i++) {
    var current = intervals[i];
    if (current[1] < newInterval[0] || isInserted) {
      // 1. current[1]小於newInterval[0]，current可以直接塞進結果；
      res.push(current);
    } else if (newInterval[1] < current[0] && !isInserted) {
      // 2. newInterval[1]小於current[0]，newInterval和current都要塞進結果；
      res.push(newInterval);
      res.push(current);
      isInserted = true;
    } else if (current[0] <= newInterval[0] || newInterval[1] <= current[1]) {
      // 3. newInterval的start或者end與current交叉，merge兩個區間，start以小的為準，end以大的為準；
      newInterval[0] = Math.min(current[0], newInterval[0]);
      newInterval[1] = Math.max(current[1], newInterval[1]);
    } else {
      // 4. newInterval“吃掉了”current，什麼都不做。
    }
  }

  if (!isInserted) {
    res.push(newInterval);
  }

  return res;
};

console.log(insert([
  [1, 2],
  [3, 5],
  [6, 7],
  [8, 10],
  [12, 16]
], [4, 9]))

// Q4. Given a 2D board and a word, find if the word exists in the grid.
// For example,
// Given board =
// [
// ['A','B','C','E'],
// ['S','F','C','S'],
// ['A','D','E','E']
// ]
// word = "ABCCED", -> returns true,
// word = "SEE", -> returns true,
// word = "ABCB", -> returns false.

// DFS
function wordSearch (board, word) {
  if (word === "") return true;
  var i, j;
  for (i = 0; i < board.length; i++)
    for (j = 0; j < board[i].length; j++)
      if (board[i][j] === word[0])
        if (dfs(0, i, j)) return true;
  return false;

  function dfs(index, x, y) {
    if (index === word.length) return true;
    if (!board[x] || !board[x][y]) return false;
    if (board[x][y] !== '#' && board[x][y] === word[index]) {
      var ch = board[x][y];
      board[x][y] = '#';
      if (dfs(index + 1, x - 1, y)) return true; //up
      if (dfs(index + 1, x + 1, y)) return true; //down
      if (dfs(index + 1, x, y - 1)) return true; //left
      if (dfs(index + 1, x, y + 1)) return true; //right
      board[x][y] = ch;
    }
    return false;
  }
};

var board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
];
var word = "ABCCED";

console.log(wordSearch(board, word));

// Q5. Calculate the sum of two integers a and b, but you are not allowed to use the operator
// + and -.
// Example:
// Given a = 1 and b = 2, return 3.

function getSum (a, b) {
  if(b===0) return a;
  var sum=a^b;
  var carry=(a & b) << 1;
  return getSum(sum,carry);
};

console.log(getSum(1,2))
