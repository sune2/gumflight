// set requsetAnimationFrame
(function() {
  var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


require(['src/keyinput', 'src/Player', 'src/Colliders'], function(input, Player, Colliders) {
  var previousTime = new Date().getTime();
  var colliders = new Colliders();
  var player = new Player(colliders.colliders);

  // main loop
  (function loop() {
    window.requestAnimationFrame(loop);
    var currentTime = new Date().getTime();
    var timeDelta = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    player.update(timeDelta);
    if (input.getLeftKeyDown()) {
      player.flapLeft();
    }
    if (input.getRightKeyDown()) {
      player.flapRight();
    }

  })();
});
