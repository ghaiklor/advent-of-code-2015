'use strict';

const NO_ITEM = {cost: 0, damage: 0, armor: 0};

const WEAPONS = new Map([
  ['dagger', {cost: 8, damage: 4, armor: 0}],
  ['shortsword', {cost: 10, damage: 5, armor: 0}],
  ['warhammer', {cost: 25, damage: 6, armor: 0}],
  ['longsword', {cost: 40, damage: 7, armor: 0}],
  ['greataxe', {cost: 74, damage: 8, armor: 0}]
]);

const ARMOR = new Map([
  ['leather', {cost: 13, damage: 0, armor: 1}],
  ['chainmail', {cost: 31, damage: 0, armor: 2}],
  ['splintmail', {cost: 53, damage: 0, armor: 3}],
  ['bandedmail', {cost: 75, damage: 0, armor: 4}],
  ['platemail', {cost: 102, damage: 0, armor: 5}]
]);

const RINGS = new Map([
  ['damage+1', {cost: 25, damage: 1, armor: 0}],
  ['damage+2', {cost: 50, damage: 2, armor: 0}],
  ['damage+3', {cost: 100, damage: 3, armor: 0}],
  ['defense+1', {cost: 20, damage: 0, armor: 1}],
  ['defense+2', {cost: 40, damage: 0, armor: 2}],
  ['defense+3', {cost: 80, damage: 0, armor: 3}]
]);

const BOSS = new Map([
  ['damage', 8],
  ['armor', 2],
  ['health', 100]
]);

const PLAYER = new Map([
  ['damage', 0],
  ['armor', 0],
  ['health', 100]
]);

const getTotalStats = (weapon, armor, leftRing, rightRing) => {
  return {
    cost: weapon.cost + armor.cost + leftRing.cost + rightRing.cost,
    damage: weapon.damage + armor.damage + leftRing.damage + rightRing.damage,
    armor: weapon.armor + armor.armor + leftRing.armor + rightRing.armor
  };
};

const hitPerSecond = (defenderHealth, defenderArmor, attackerDmg) => Math.ceil(defenderHealth / Math.max(1, attackerDmg - defenderArmor));
const makeMove = (boss, player) => hitPerSecond(boss.get('health'), boss.get('armor'), player.get('damage')) <= hitPerSecond(player.get('health'), player.get('armor'), boss.get('damage'));

function* possibleBundles() {
  for (let weapon of WEAPONS.values()) {
    yield getTotalStats(weapon, NO_ITEM, NO_ITEM, NO_ITEM);

    for (let armor of ARMOR.values()) {
      yield getTotalStats(weapon, armor, NO_ITEM, NO_ITEM);

      for (let leftRing of RINGS.values()) {
        yield getTotalStats(weapon, armor, leftRing, NO_ITEM);

        for (let rightRing of RINGS.values()) {
          yield getTotalStats(weapon, armor, leftRing, rightRing);
        }
      }
    }
  }
}

let result = Infinity;
for (let bundle of possibleBundles()) {
  PLAYER.set('damage', bundle.damage).set('armor', bundle.armor);
  if (makeMove(BOSS, PLAYER)) result = Math.min(result, bundle.cost);
}

console.log(result);
