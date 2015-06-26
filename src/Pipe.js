define(['src/Segment', 'src/Vector', 'src/scene'], function(Segment, Vector, scene) {
  var w = 320;
  var h = 52;
  var Pipe = function(y, type) {
    var img = $('<img class="pipe">');
    if (type === 0) {
      img.attr('src', 'img/pipe_left.png');
      this.position = new Vector(0, y);
    } else {
      img.attr('src', 'img/pipe_right.png');
      this.position = new Vector(scene.width-w, y);
    }
    img.css({left: this.position.x, top: scene.height - y});
    $('#game-area').append(img);
  };
  Pipe.prototype.getColliders = function() {
    var pos = this.position;
    var p1 = new Vector(pos.x, pos.y);
    var p2 = new Vector(pos.x + w, pos.y);
    var p3 = new Vector(pos.x + w, pos.y - h);
    var p4 = new Vector(pos.x, pos.y - h);
    return [new Segment(p1, p2),
            new Segment(p2, p3),
            new Segment(p3, p4),
            new Segment(p4, p1)];
  };

  return Pipe;
});
