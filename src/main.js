// set requsetAnimationFrame
(function() {
  var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


require(['src/keyinput', 'src/Player', 'src/PipeManager', 'src/Collision'], function(input, Player, PipeManager, Collision) {
  var previousTime = new Date().getTime();
  var pipeManager = new PipeManager();
  var collision = new Collision(pipeManager);
  var player = new Player(collision);

  // main loop
  (function loop() {
    window.requestAnimationFrame(loop);
    var currentTime = new Date().getTime();
    var timeDelta = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    player.update(timeDelta);
    pipeManager.update(timeDelta);

    if (input.getLeftKeyDown()) {
      player.flapLeft();
    }
    if (input.getRightKeyDown()) {
      player.flapRight();
    }

  })();
});
