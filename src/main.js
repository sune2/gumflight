// set requsetAnimationFrame
(function() {
  var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


require(['src/keyinput'], function(input) {
  var startTime = new Date().getTime();

  // main loop
  (function loop() {
    window.requestAnimationFrame(loop);
    var currentTime = new Date().getTime();
    var deltaTime = (currentTime - startTime);

    $("#player").css('left', 0.01*deltaTime);
    if (input.getLeftKeyDown()) {
      console.log("left");
    }
    if (input.getRightKeyDown()) {
      console.log("right");
    }
  })();
});
