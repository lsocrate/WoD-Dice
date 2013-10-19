function rollDie () {
  return Math.ceil(Math.random() * 10)
}

Pool = function(){
  this.dices = 0
  this.weak = false
  this.rerollOn = 10

  if (typeof arguments[0] === "number") {
    this.dices = parseInt(arguments[0], 10)
  }
  if (typeof arguments[0] === "object") {
    var config = arguments[0]

    this.dices    = config.dices || this.dices
    this.weak     = config.weak || this.weak
    this.rerollOn = config.rerollOn || this.rerollOn
  }
};
Pool.prototype.addDice = function (dices) {
  this.dices = this.dices + parseInt(dices, 10)

  return this;
};
Pool.prototype.removeDice = function (dices) {
  this.dices = this.dices - parseInt(dices, 10)

  return this;
};
Pool.prototype.penalty = function (penalty) {
  return this.removeDice(penalty)
};
Pool.prototype.isWeak = function () {
  this.weak = true

  return this;
};
Pool.prototype.reroll = function (threshold) {
  this.rerollOn = parseInt(threshold, 10)

  return this;
};
Pool.prototype.isChanceRoll = function () {
  return (this.dices < 1)
}

Pool.prototype.roll = function () {
  var successes = 0,
      roll;

  if (this.isChanceRoll()) {
    while (true) {
      roll = rollDie()

      if (roll === 10) {
        successes++
      } else if(roll === 1) {
        successes--
      }
      if (this.weak || roll < 10) {
        break
      }
    }
  } else {
    for (var i = 0; i < this.dices; i++) {
      roll = rollDie()

      if (roll >= 8) {
        successes++
      }
      if (!this.weak && roll >= this.rerollOn) {
        this.dices++
      }
      if (this.weak && roll === 1) {
        successes--
      }
    }
  }

  return (this.isChanceRoll()) ? successes : Math.max(0, successes);
};

exports.Pool = Pool;
