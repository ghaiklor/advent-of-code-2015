"use strict";

const SPELLS = new Map([
  ['Magic Missile', {cost: 53, damage: 4, heals: 0, effect: false}],
  ['Drain', {cost: 73, damage: 2, heals: 2, effect: false}],
  ['Shield', {cost: 113, damage: 0, heals: 0, effect: 'Shield'}],
  ['Poison', {cost: 173, damage: 0, heals: 0, effect: 'Poison'}],
  ['Recharge', {cost: 229, damage: 0, heals: 0, effect: 'Recharge'}]
]);

const EFFECTS = new Map([
  ['Shield', {duration: 6, armor: 7, damage: 0, mana: 0}],
  ['Poison', {duration: 6, armor: 0, damage: 3, mana: 0}],
  ['Recharge', {duration: 5, armor: 0, damage: 0, mana: 101}]
]);

const BOSS = new Map([
  ['hp', 55],
  ['damage', 8],
  ['armor', 0],
  ['mana', 0],
  ['effects', new Map()]
]);

const PLAYER = new Map([
  ['hp', 50],
  ['damage', 0],
  ['armor', 0],
  ['mana', 500],
  ['effects', new Map()]
]);

const applyEffect = (player, effect) => {
  const effects = player.get('effects');
  if (effects.has(effect)) return;

  effects.set(effect, EFFECTS.get(effect));
};

const attack = (attacker, defender, spell) => {
  if (attacker.has('mana')) {
    attacker.set('mana', attacker.get('mana') - spell.cost);
    attacker.set('hp', attacker.get('hp') + spell.heals);
    defender.set('hp', defender.get('hp') - spell.damage);
    if (spell.effect) applyEffect(attacker, spell.effect);
  } else {
    defender.set('hp', defender.get('hp') - Math.max(1, attacker.get('damage') - defender.get('armor')));
  }

  const effects = PLAYER.get('effects');
  effects.forEach(effect => {
    if (effect.duration > 0) {
      PLAYER.set('armor', effect.armor);
      PLAYER.set('damage', effect.damage);
      PLAYER.set('mana', PLAYER.get('mana') + effect.mana);
      effect.set('duration', effect.get('duration') - 1);

      if (effect.duration === 0) effects.delete(effect);
    }
  });
};
