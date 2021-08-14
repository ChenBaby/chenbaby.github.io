function Point2D (x, y) {
  this.x = x || 0.0;
  this.y = y || 0.0;
}

// 贝塞尔三阶曲线
function PointOnCubicBezier (cp, t) {
  let ax, bx, cx,
    ay, by, cy,
    tSquared, tCubed,
    x, y;

  cx = 3.0 * (cp[1].x - cp[0].x);
  bx = 3.0 * (cp[2].x - cp[1].x) - cx;
  ax = cp[3].x - cp[0].x - cx - bx;
  cy = 3.0 * (cp[1].y - cp[0].y);
  by = 3.0 * (cp[2].y - cp[1].y) - cy;
  ay = cp[3].y - cp[0].y - cy - by;

  tSquared = t * t;
  tCubed = tSquared * t;
  x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
  y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;

  return new Point2D(x, y);
}

// 贝塞尔二阶曲线
function PointOnQuadraticBezier (cp, t) {
  let x = (1 - t) * (1 - t) * cp[0].x + 2 * t * (1 - t) * cp[1].x + t * t * cp[2].x;
  let y = (1 - t) * (1 - t) * cp[0].y + 2 * t * (1 - t) * cp[1].y + t * t * cp[2].y;

  return new Point2D(x, y);
}

// 获取贝塞尔三阶曲线点阵
function ComputeCubicBezier(cp, numberOfPoints, curve) {
  let dt = 1.0 / (numberOfPoints - 1);

  for (let i = 0; i < numberOfPoints; i++) {
    curve[i] = PointOnCubicBezier(cp, i * dt);
  }
}

// 获取贝塞尔二阶曲线点阵
function ComputeQuadraticBezier (cp, numberOfPoints, curve) {
  let dt = 1.0 / ( numberOfPoints - 1 );

  for(let i = 0; i < numberOfPoints; i++) {
    curve[i] = PointOnQuadraticBezier( cp, i*dt );
  }
}

export default function create (x, y, num) {
  let POINT_NUMBER = num;
  let quadratic = [];
  let quadraticArr = [
    new Point2D(x, 0), new Point2D(y * 0.999, 0), new Point2D(y, 0)
  ];
  // let cubicArr = [
  //   new Point2D(20, 0), new Point2D(40, 50), new Point2D(0, 100), new Point2D(20, 150)
  // ];

  ComputeQuadraticBezier(quadraticArr, POINT_NUMBER, quadratic);
  // ComputeCubicBezier(cubicArr, POINT_NUMBER, curve);
  return quadratic.map(item => item.x)
}


