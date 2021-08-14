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

function bezier (x, y, num) {
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


class Circle {
  x = 0
  y = 0
  ax = []
  ay = []
  color = ''
  r = 0
  ar = []
  context = null
  index = 0
  constructor (x, y, context) {
    this.r = Math.random() * 7 + 5
    this.ax = bezier(x, x + (150 * Math.random()) * (Math.random() > 0.5 ? 1 : -1), 60)
    this.ay = bezier(y, y + (150 * Math.random()) * (Math.random() > 0.5 ? 1 : -1), 60)
    this.ar = bezier(0, this.r, 60).reverse()
    this.x = this.ax[0]
    this.y = this.ay[0]
    this.r = this.ar[0]
    this.color = ['#c1e1da', '#ffbbc0', '#f1e0d8', '#97cbd5'][~~(Math.random() * 4)]
    this.index = 0
    this.context = context
  }

  draw () {
    if(this.context) {
      this.index++
      this.x = this.ax[this.index]
      this.y = this.ay[this.index]
      this.r = this.ar[this.index]
      this.context.beginPath()
      this.context.fillStyle = this.color
      this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
      this.context.fill()
      this.context.closePath()
    }
  }
}


function init (x, y) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const arr = []
  let timer = 0

  canvas.width = 500
  canvas.height = 500

  for(let i = 0; i < 30; i++) {
    arr.push(new Circle(canvas.width / 2, canvas.height / 2, context))
  }


  canvas.style.position = 'fixed'
  canvas.style.left = `${x - canvas.width / 2}px`
  canvas.style.top = `${y - canvas.height / 2}px`
  canvas.style.zIndex = '100000'

  document.body.appendChild(canvas)

  function render (circleList, circleContext, width, height) {
    circleList.forEach(circle => {
      circle.draw()
    })

    timer = requestAnimationFrame(() => {
      if(circleContext) {
        circleContext.clearRect(0, 0, width, height)
      }

      render(arr, circleContext, width, height)
    })
  }

  render(arr, context, canvas.width, canvas.height)

  setTimeout(() => {
    cancelAnimationFrame(timer)
    document.body.removeChild(canvas)
  }, 1000)
}

window.addEventListener('click', function (event) {
  let element = event.target
  while(element && element.tagName.toLowerCase() !== 'a') {
    element = element.parentElement
  }

  if (element) {
    return
  }

  init(event.clientX, event.clientY)
})