// set requsetAnimationFrame
(function() {
  var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


require(['src/keyinput', 'src/Player'], function(input, Player) {
  var previousTime = new Date().getTime();
  var player = new Player();

  // main loop
  (function loop() {
    window.requestAnimationFrame(loop);
    var currentTime = new Date().getTime();
    var timeDelta = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    player.update(timeDelta);
    if (input.getLeftKeyDown()) {
      player.flapLeft();
      console.log("left");
    }
    if (input.getRightKeyDown()) {
      player.flapRight();
      console.log("right");
    }

  })();
});
