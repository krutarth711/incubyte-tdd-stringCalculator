function add(numbers) {
  if (numbers === "") return 0;

  let delimiter = /[\n,]/;
  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");
    const delimiterPart = parts[0].slice(2); // Extract custom delimiter definition.
    numbers = parts[1]; // Remaining part is the numbers string.

    if (delimiterPart.startsWith("[")) {
      // Handle multi-character delimiters.
      const customDelimiter = delimiterPart.slice(1, -1); // Extract between `[` and `]`.
      delimiter = new RegExp(escapeRegex(customDelimiter));
    } else {
      // Single-character delimiter.
      delimiter = new RegExp(escapeRegex(delimiterPart));
    }
  }

  const numbersArr = numbers
    .split(delimiter)
    .filter((num) => parseInt(num, 10) <= 1000);
  const negatives = numbersArr.filter((num) => num < 0);
  if (negatives.length) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(",")}`);
  }
  const sum = numbersArr.reduce((total, num) => total + parseInt(num, 10), 0);
  return sum;
}

// Utility function to escape special regex characters.
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
module.exports = add;
