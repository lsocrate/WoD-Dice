## Usage

```javascript
pool = new Pool(7); // create pool with 7 dice
pool = new Pool({dice:7, rerollOn:9, weak:true}); // create pool with 7 dice, rerolling on 9's and with attribute weakness
pool = new Pool(); // create empty pool
pool.isWeak(); // Set pool as weak. 10's do not reroll and 1's cancel successes
pool.reroll(8); // Set pool to reroll 8 and above
successes = pool.roll(); // Roll pool and return successes

// COMBO USE
successes = new Pool().addDice(8).penalty(2).isWeak().reroll(9).roll();
```
