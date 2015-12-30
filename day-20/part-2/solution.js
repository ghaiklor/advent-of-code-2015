var INPUT = 34000000 / 10;
var houses = new Uint32Array(INPUT);
var houseNumber = INPUT;

for (var i = 1; i < INPUT; i++) {
  var visits = 0;
  for (var j = i; j < INPUT; j += i) {
    if ((houses[j] = (houses[j] || 11) + i * 11) >= INPUT * 10 && j < houseNumber) houseNumber = j;

    visits++;
    if (visits === 50) break;
  }
}

console.log(houseNumber);
