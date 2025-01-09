function add(numbers, start = null, end = null) {
  if (numbers === "") return 0;

  let delimiter = /[\n,]/;
  let isMultiply = false;
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
      isMultiply = delimiterPart === "*";
    }
  }

  const numbersArr = numbers
    .split(delimiter).map(Number)
    .filter((num) => num <= 1000)
    .filter((num) => start ? (num >= start && num <= end) : num);
  const negatives = numbersArr.filter((num) => num < 0);
  if (negatives.length) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(",")}`);
  }
  if (isMultiply) {
    return numbersArr.reduce((total, num) => total * num, 1);
  } else {
    return numbersArr.reduce((total, num) => total + num, 0);
  }
}

// Utility function to escape special regex characters.
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
module.exports = add;
