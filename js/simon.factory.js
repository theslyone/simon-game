(function(){
  angular.module("simon").factory("SimonFactory", SimonFactory);
  const possibilities = 4;

  function SimonFactory(){
    var isOn = false;
    var isStrict = false;
    var sequences = [];
    var speed = 900;

    return {
      power: function(){
        isOn = !isOn;
      },
      isOn: function(){
        return isOn;
      },
      strictMode: function(){
        isStrict = !isStrict;
      },
      isStrict: function(){
        return isStrict;
      },
      restart: function(){
        sequences = [];
        return this.next();
      },
      getSpeed: function(){
        return speed + (sequences.length * 100);
      },
      next: function(){
        var nextSequence = Math.floor(Math.random() * possibilities) + 1;
        switch(nextSequence){
          case 1:
            sequences.push('green');
          break;
          case 2:
            sequences.push('blue');
          break;
          case 3:
            sequences.push('red');
          break;
          case 4:
            sequences.push('yellow');
          break;
        }
        return sequences;
      }
    }
  }
})();
