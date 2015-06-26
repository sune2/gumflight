// set requsetAnimationFrame
(function() {
  var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


require(
  ['src/keyinput', 'src/camera', 'src/Player', 'src/PipeManager', 'src/Goal', 'src/Collision'],
  function(input, camera, Player, PipeManager, Goal, Collision) {
    var pipeArgList = [
      [300,0],
      [600,1],
      [900,0],
      [1100,1],
      [1300,0],
      [1700,1],
      [2100,0],
      [2250,1],
      [2400,0]
    ];
    var goalY = 2800;

    var pipeManager = new PipeManager(pipeArgList);
    var goal = new Goal(goalY);
    var collision = new Collision(pipeManager, goal);
    var player = new Player(collision);

    // main loop
    var previousTime = new Date().getTime();
    (function loop() {
      window.requestAnimationFrame(loop);
      var currentTime = new Date().getTime();
      var timeDelta = (currentTime - previousTime) / 1000;
      previousTime = currentTime;

      player.update(timeDelta);
      pipeManager.update(timeDelta);
      goal.update(timeDelta);

      camera.offsetY = Math.max(camera.offsetY, player.position.y-200);
      camera.offsetY = Math.min(camera.offsetY, goalY - 100);

      if (input.getLeftKeyDown()) {
        player.flapLeft();
      }
      if (input.getRightKeyDown()) {
        player.flapRight();
      }

    })();
  }
);
