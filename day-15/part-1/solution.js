"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const INGREDIENT_ATTRIBUTES_REGEX = /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;
const TEASPOONS_COUNT = 100;

// Parse input and get attributes for all of ingredients
const getIngredientAttributes = input => {
  return input.reduce((map, ingredient) => {
    const parsed = ingredient.match(INGREDIENT_ATTRIBUTES_REGEX);

    map.set(parsed[1], {
      capacity: +parsed[2],
      durability: +parsed[3],
      flavor: +parsed[4],
      texture: +parsed[5],
      calories: +parsed[6]
    });

    return map;
  }, new Map());
};

// Get list of all available ingredients
const getIngredientList = input => {
  return input.reduce((set, ingredient) => {
    const parsed = ingredient.match(INGREDIENT_ATTRIBUTES_REGEX);
    return set.add(parsed[1]);
  }, new Set());
};

// Make cookie from available ingredients and teaspoons count
const makeCookie = (ingredients, ingredientsAttributes, teaspoons) => {
  const map = new Map();

  ingredients.forEach(ingredient => {
    const attributes = ingredientsAttributes.get(ingredient);
    const teaspoonsCount = teaspoons[ingredient];

    map.set('capacity', (map.get('capacity') || 0) + attributes.capacity * teaspoonsCount);
    map.set('durability', (map.get('durability') || 0) + attributes.durability * teaspoonsCount);
    map.set('flavor', (map.get('flavor') || 0) + attributes.flavor * teaspoonsCount);
    map.set('texture', (map.get('texture') || 0) + attributes.texture * teaspoonsCount);
  });

  if (Array.from(map.values()).some(item => item <= 0)) return 0;
  return map.get('capacity') * map.get('durability') * map.get('flavor') * map.get('texture');
};

const ingredients = getIngredientList(INPUT);
const ingredientsAttributes = getIngredientAttributes(INPUT);
const ALL_POSSIBLE_COOKIES = [];

for (let sprinkles = 0; sprinkles < 100; sprinkles++) {
  for (let butterscotch = 0; butterscotch < 100 - sprinkles; butterscotch++) {
    for (let chocolate = 0; chocolate < 100 - sprinkles - butterscotch; chocolate++) {
      let candy = 100 - sprinkles - butterscotch - chocolate;
      ALL_POSSIBLE_COOKIES.push(makeCookie(ingredients, ingredientsAttributes, {
        'Sprinkles': sprinkles,
        'Butterscotch': butterscotch,
        'Chocolate': chocolate,
        'Candy': candy
      }));
    }
  }
}

const result = ALL_POSSIBLE_COOKIES.sort((a, b) => b - a)[0];

console.log(result);
