function add(numbers) {
  if (numbers === "") return 0;

  let delimiter = /[\n,]/;
  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");
    delimiter = new RegExp(`[${parts[0].slice(2)}]`); // take part before \n, and remove "//" to get delimiter
    numbers = parts[1];
  }

  const numbersArr = numbers.split(delimiter);
  const negatives = numbersArr.filter(num => num < 0);
  if (negatives.length) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(",")}`);
  }
  const sum = numbersArr.reduce((total, num) => total + parseInt(num, 10), 0);
  return sum;
}
module.exports = add;
