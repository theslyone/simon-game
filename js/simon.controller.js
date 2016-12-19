(function(){
  angular.module("simon").controller('SimonController', SimonController);
  SimonController.$inject = ['$scope', '$interval', '$timeout', 'SimonFactory'];
  function SimonController($scope, $interval, $timeout, simon){
    var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    var audioBuzzer = new Audio('https://s3-us-west-2.amazonaws.com/guylemon/Buzzer.mp3');
    $scope.sequences = [];
    var result = [];
    var userResponse = false;
    var winCount = 20;

    $scope.simon = simon;
    $scope.isClickable = function(){
      return simon.isOn() && userResponse;
    };
    $scope.power = function(){
      simon.power();
    };
    $scope.restart = function(){
      result = [];
      $scope.sequences = simon.restart();
      $scope.displaySequence();
    };
    $scope.verify = function(color){
      if($scope.sequences[result.length] == color){
        activate(color);
        result[result.length] = color;
        if(result.length == $scope.sequences.length){
          userResponse = false;
          if($scope.sequences.length === winCount){
            alert("Congratulations!!! \nYou have successfully completed " + winCount + " steps.");
            $scope.restart();
          }
          $timeout(function() {
            result = [];
            $scope.sequences = simon.next();
            $scope.displaySequence();
          }, 1000);
        }
      }
      else{
        result = [];
        userResponse = false;
        beep('error');
        if(simon.isStrict()){
          $scope.restart();
        }
        else{
          $scope.displaySequence();
        }
      }
    };
    $scope.displaySequence = function(){
      var idx = 0;
      var interval = $interval(function(){
        activate($scope.sequences[idx]);
        idx++;
        if (idx >= $scope.sequences.length) {
          $interval.cancel(interval);
          userResponse = true;
        }
      }, simon.getSpeed())
    };
    $scope.strictMode = function(){
      simon.strictMode();
    };

    function activate(color){
      beep(color);
      $scope.activate = color;
      $timeout(function() {
        $scope.activate = null;
      }, simon.getSpeed() / 2);
    };
    function beep(color) {
      switch (color) {
        case 'green':
          audio1.play();
          break;
        case 'blue':
          audio2.play();
          break;
        case 'red':
          audio3.play();
          break;
        case 'yellow':
          audio4.play();
          break;
        default:
          audioBuzzer.play();
          break;
      }
    }
  }
})();
