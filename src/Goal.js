define(['src/Segment', 'src/Vector', 'src/camera'], function(Segment, Vector, camera) {
  var w = 200;
  var h = 67;

  var Goal = function(y) {
    this.y = y;
    this.isCreated = false;
  };

  Goal.prototype.getColliders = function() {
    if (!this.isCreated) {
      return [];
    }
    var pos = this.position;
    var p1 = new Vector(pos.x, pos.y);
    var p2 = new Vector(pos.x, pos.y - h);
    var p3 = new Vector(pos.x + w, pos.y - h);
    var p4 = new Vector(pos.x + w, pos.y);

    return [
      new Segment(p1, p2),
      new Segment(p2, p3),
      new Segment(p3, p4)
    ];
  };

  Goal.prototype.getGoalSegment = function() {
    var pos = this.position;
    var p1 = new Vector(pos.x, pos.y);
    var p4 = new Vector(pos.x + w, pos.y);
    return new Segment(p1, p4);
  };

  Goal.prototype.create = function() {
    var img = $('<img class="goal">');
    img.attr('src', 'img/goal.png');
    this.position = new Vector(camera.width/2 - w/2, this.y);
    $('#game-area').append(img);
    this.img = img;
    this.setPosition();
    this.isCreated = true;
  };

  Goal.prototype.setPosition = function() {
    var screenPos = camera.worldToScreen(this.position);
    this.img.css({left: screenPos.x, top: screenPos.y});
  };

  Goal.prototype.update = function() {
    if (this.isCreated) {
      this.setPosition();
    } else {
      if (this.y < camera.offsetY + camera.height + h) {
        this.create();
      }
    }
  };

  Goal.width = w;
  Goal.height = h;

  return Goal;
});
