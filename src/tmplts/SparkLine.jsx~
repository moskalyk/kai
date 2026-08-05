// Source - https://stackoverflow.com/a/46337322
// Posted by Kaiido, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-04, License - CC BY-SA 4.0

const width = canvas.width;
const height = canvas.height/3;
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'pink';

function plotPoints() {
  const pts = generatePoints(32);
  // first plot the stroke
  pts.forEach((pt) => ctx.lineTo(pt.x, pt.y));
  ctx.stroke();
  // now define the bottom of the filled area
  const maxY = height; //Math.max.apply(null, pts.map(pt=>pt.y));
  // draw the missing parts
  ctx.lineTo(pts[pts.length - 1].x, maxY); // bottom-right
  ctx.lineTo(pts[0].x, maxY); // bottom-left

  ctx.globalCompositeOperation = "destination-over"; // draw behind
  ctx.fill(); // will close the path for us
  ctx.globalCompositeOperation = "source-over"; // normal behavior

}
// plotPoints();

function generatePoints(nbOfPoints) {
  const pts = [];
  for (let i = 0; i <= nbOfPoints; i++) {
    pts.push({
      x: i * (width / nbOfPoints),
      y: Math.random() * height
    });
  }
  return pts;
}
