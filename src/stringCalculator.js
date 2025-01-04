function add(numbers) {
  if (numbers === "") return 0;
  const sum = numbers.split(",").reduce((total, num) => total + parseInt(num, 10), 0);
  return sum;
}
module.exports = add;
