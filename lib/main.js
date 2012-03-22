Die = {
  roll: function(){
    return Math.ceil(Math.random() * 10);
  }
};

Pool = function(){
  var dices           = 0;
  var weak            = false;
  var rerollThreshold = 10;

  if(typeof arguments[0] !== "undefined"){
    dices = parseInt(arguments[0], 10);
  }

  var addDice = function(dicesToAdd) {
    dices = dices + parseInt(dicesToAdd, 10);

    return this;
  };
  var removeDice = function(dicesToRemove) {
    dices = dices - parseInt(dicesToRemove, 10);

    return this;
  };
  var penalty = function(penalty) {
    return removeDice(penalty);
  };
  var isWeak = function() {
    weak = true;

    return this;
  };
  var reroll = function(threshold) {
    rerollThreshold = parseInt(threshold, 10);

    return this;
  };
  var roll = function() {
    var successes = 0,
        roll;

    if(dices < 1) {
      while(true){
        roll = Die.roll();
        if(roll === 10){
          successes++;
        } else if(roll === 1) {
          successes--;
        } else {
          break;
        }
      }

      return {successes:successes, passed:(successes > 0)};
    }

    for (var i = 0; i < dices; i++) {
      roll = Die.roll();
      if(roll >= 8) {
        successes++;
      }
      if(!weak && roll >= rerollThreshold) {
        dices++;
      }
      if(weak && roll === 1){
        successes--;
      }
    }

    return {successes:successes, passed:(successes > 0)};
  };

  return {
    addDice: addDice,
    removeDice: removeDice,
    penalty: penalty,
    isWeak: isWeak,
    reroll: reroll,
    roll: roll
  };

};

exports.Die  = Die;
exports.Pool = Pool;