
define(['src/Segment', 'src/Vector'], function(Segment, Vector) {
  var Colliders = function() {
    this.colliders = [new Segment(new Vector(0,200), new Vector(300, 200))];
    // var context = $('#game-area')[0].getContext('2d');
    // console.log(context);
    // context.beginPath();
    // context.moveTo(0, 500-200);
    // context.lineTo(300, 500-200);
    // context.lineTo(400, 500-100);
    // context.closePath();
    // context.stroke();
  };

  return Colliders;
});
