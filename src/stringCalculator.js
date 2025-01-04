function add(numbers) {
  if (numbers === "") return 0;

  let delimiter = /[\n,]/;
  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");
    const delimiterPart = parts[0].slice(2); // Extract custom delimiter definition.
    numbers = parts[1]; // Remaining part is the numbers string.

    if (delimiterPart.startsWith("[")) {
      // Handle multiple delimiters.
      const delimiterPattern = delimiterPart
        .match(/\[([^\]]+)\]/g) // Match all `[delimiter]` parts.
        .map((d) => d.slice(1, -1)) // Remove square brackets.
        .map((d) => escapeRegex(d)) // Escape special regex characters.
        .join("|"); // Join delimiters with `|` for regex alternation.
      delimiter = new RegExp(delimiterPattern);
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
