// set requsetAnimationFrame
(function() {
  var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


require(
  ['src/keyinput', 'src/TimeManager', 'src/camera', 'src/Player', 'src/PipeManager', 'src/Goal', 'src/Collision'],
  function(input, TimeManager, camera, Player, PipeManager, Goal, Collision) {

    // preload images
    $("<img>").attr("src", "img/puyo_right.png");
    $("<img>").attr("src", "img/puyo_left.png");
    $("<img>").attr("src", "img/puyo_right_dead.png");
    $("<img>").attr("src", "img/puyo_left_dead.png");
    $("<img>").attr("src", "img/pipe_right.png");
    $("<img>").attr("src", "img/pipe_left.png");

    var gameMain = function() {
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
      var timeManager = new TimeManager();

      var started = false;

      var startGame = function() {
        started = true;
        timeManager.start();
      };

      // main loop
      var previousTime = new Date().getTime();

      (function loop() {

        var currentTime = new Date().getTime();
        var timeDelta = (currentTime - previousTime) / 1000;
        previousTime = currentTime;

        player.update(timeDelta);
        pipeManager.update(timeDelta);
        goal.update(timeDelta);

        if (player.isPlaying()) {
          timeManager.update();
        }

        // camera offset
        camera.offsetY = Math.max(camera.offsetY, player.position.y-200);
        camera.offsetY = Math.min(camera.offsetY, goalY - 100);

        // key input
        if (input.getLeftKeyDown()) {
          if (!started) {
            startGame();
          }
          player.flapLeft();
        }
        if (input.getRightKeyDown()) {
          if (!started) {
            startGame();
          }
          player.flapRight();
        }
        if (input.getSpaceKeyDown()) {
          // retry
          retryGame();
          return;
        }

        // next loop
        window.requestAnimationFrame(loop);
      })();
    };

    var retryGame = function() {
      $('#game-area').empty();
      camera.init();
      gameMain();
    };

    gameMain();
  }
);
