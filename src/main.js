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
  var p = new Player();

  // main loop
  (function loop() {
    window.requestAnimationFrame(loop);
    var currentTime = new Date().getTime();
    var timeDelta = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    p.update(timeDelta);
    if (input.getLeftKeyDown()) {
      console.log("left");
    }
    if (input.getRightKeyDown()) {
      console.log("right");
    }

  })();
});
