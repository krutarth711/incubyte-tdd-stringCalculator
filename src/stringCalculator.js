function add(numbers) {
  if (numbers === "") return 0;
  const numbersArr = numbers.replace("\n", ",").split(",");

  const sum = numbersArr.reduce((total, num) => total + parseInt(num, 10), 0);
  return sum;
}
module.exports = add;
