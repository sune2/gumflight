define(function() {
  var keyState = [];
  var keyStatePre = [];
  for(var i=0; i<128; i++){
    keyState.push(false);
    keyStatePre.push(false);
  }
  var updateKeyState = function(keyCode,isHit){
    keyState[keyCode] = isHit;
  };
  document.onkeydown = function(ev) {
    var eve = ev ? ev : window.event;
    updateKeyState(eve.keyCode,true);
    return true;
  };
  document.onkeyup = function(ev){
    var eve = ev ? ev : window.event;
    updateKeyState(eve.keyCode,false);
    return true;
  };
  var LEFT_KEY = 37;
  var RIGHT_KEY = 39;
  return {
    getState: function(key) {
      return keyState[key];
    },
    getLeftKey: function() {
      return keyState[37];
    },
    getRightKey: function() {
      return keyState[39];
    },
    getKeyDown: function(key) {
      var down = !keyStatePre[key] && keyState[key];
      keyStatePre[key] = keyState[key];
      return down;
    },
    getLeftKeyDown: function() {
      return this.getKeyDown(LEFT_KEY);
    },
    getRightKeyDown: function() {
      return this.getKeyDown(RIGHT_KEY);
    }
  };
});
