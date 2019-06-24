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

// binary search
var isPerfectSquare = function (num) {
  var left = 1;
  var right = num;
  while (left <= right) {
    var mid = Math.floor((left + right) / 2);
    var temp = mid * mid;
    if (temp === num) return true;
    else if (temp > num) right = mid - 1;
    else left = mid + 1;
  }
  return false;
}

console.log(isPerfectSquare(12))
console.log(isPerfectSquare(16))

// note: https://medium.com/@dd0425/algorithm-leetcode-367-valid-perfect-square-javascript-%E5%AE%8C%E5%85%A8%E5%B9%B3%E6%96%B9%E6%95%B8-e87bcdeb86

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

function wordSearch(board, word) {
  if (word === "") return true;
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      if (board[row][col] === word[0]) {
        if (dfs(0, row, col)) return true;
      }
    }
  }
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
      // backtracking到前一個節點
    }
    return false;
  }
};

var board = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E']
];
var word1 = "ABCCED";
var word2 = "ABFA";

console.log(wordSearch(board, word1));
console.log(wordSearch(board, word2));

// note: https://medium.com/@dd0425/algorithm-leetcode-79-word-search-javascript-dfs-%E6%B7%B1%E5%BA%A6%E5%84%AA%E5%85%88%E6%90%9C%E5%B0%8B-fa6bab9cae08?postPublishedType=initial

// Q5. Calculate the sum of two integers a and b, but you are not allowed to use the operator
// + and -.
// Example:
// Given a = 1 and b = 2, return 3.

function getSum(a, b) {
  if (b === 0) return a;
  var sum = a ^ b;
  var carry = (a & b) << 1;
  return getSum(sum, carry);
};

console.log(getSum(1, 2))

// note: https://medium.com/@dd0425/%E4%BD%8D%E5%85%83%E9%81%8B%E7%AE%97-leetcode-371-sum-of-two-integers-f96d5be5c417
