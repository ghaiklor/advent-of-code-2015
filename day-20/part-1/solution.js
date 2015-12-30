var INPUT = 34000000 / 10;
var houses = new Uint32Array(INPUT);
var houseNumber = INPUT;

for (var i = 1; i < INPUT; i++) {
  for (var j = i; j < INPUT; j += i) {
    if ((houses[j] += i) >= INPUT && j < houseNumber) houseNumber = j;
  }
}

console.log(houseNumber);
