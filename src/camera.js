define(['src/Vector'], function(Vector) {
  var node = $('#game-area');
  var camera = {
    offsetY: 0,
    width: node.width(),
    height: node.height()
  };

  camera.offsetY = 0;
  camera.worldToScreen = function(pos) {
    return new Vector(pos.x, this.height - (pos.y - this.offsetY));
  };

  camera.init = function() {
    this.offsetY = 0;
  };

  return camera;
});
