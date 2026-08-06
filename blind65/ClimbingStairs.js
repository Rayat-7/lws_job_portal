/**
 * Function to calculate the number of ways
 * to climb n stairs when you can take 1 or 2 steps.
 */
function climbStairs(n) {
  // Base cases:
  // If there's only 1 stair, only 1 way (just take it).
  // If there are 2 stairs, 2 ways (1+1 or 2).
  if (n <= 2) return n;

  // Think of this like Fibonacci:
  // f(1) = 1, f(2) = 2
  let a = 1; // ways to climb 1 stair
  let b = 2; // ways to climb 2 stairs

  // Start calculating from stair 3 up to n
  for (let i = 3; i <= n; i++) {
    let temp = a + b; // ways to climb current stair
    a = b;            // shift forward: f(n-1)
    b = temp;         // shift forward: f(n)
  }

  return b; // final result
}

// Example runs:
console.log(climbStairs(2)); // Output: 2
console.log(climbStairs(3)); // Output: 3
console.log(climbStairs(4)); // Output: 5
