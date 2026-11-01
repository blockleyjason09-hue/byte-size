/* Byte Size Classroom — deeper extension questions (set 3, Further Maths part c): coordinate geometry, circles, calculus, matrices, trigonometry, 3D geometry. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function P(x, y) { return '(' + x + ', ' + y + ')'; }
  function mat(a, b, c, d) { return '\\begin{pmatrix}' + a + ' & ' + b + '\\\\' + c + ' & ' + d + '\\end{pmatrix}'; }
  function sq(n) { return Math.round(Math.sqrt(n)) * Math.round(Math.sqrt(n)) === n; }
  function rt(n) { var o = 1, i = n; for (var k = 2; k * k <= i; k++) while (i % (k * k) === 0) { o *= k; i /= k * k; } return i === 1 ? String(o) : (o === 1 ? '' : o) + '\\sqrt{' + i + '}'; }
  function line(m, c) { return 'y = ' + (m === 0 ? (c || 0) : c1(m, 'x') + (c ? S(c) : '')); }
  function circ(a, b, r2) { return (a ? '(x' + S(-a) + ')^2' : 'x^2') + ' + ' + (b ? '(y' + S(-b) + ')^2' : 'y^2') + ' = ' + r2; }
  var R = Math.PI / 180;
  function pl(x0, y0, mt) { return (y0 ? 'y' + S(-y0) : 'y') + ' = ' + (mt === '1' ? '' : mt === '-1' ? '-' : mt) + (x0 ? '(x' + S(-x0) + ')' : 'x'); }

  X('fm-coord', [
    function () {
      var bx = ri(-3, 3), by = ri(-3, 3), p = nz(-3, 3), q = nz(-3, 3), k = ri(1, 2);
      var A = [bx + p, by + q], Cc = [bx - k * q, by + k * p];
      return Q('Triangle ' + M('ABC') + ' has ' + M('A' + P(A[0], A[1])) + ', ' + M('B' + P(bx, by)) + ' and ' + M('C' + P(Cc[0], Cc[1])) + '.', [
        ['Show that angle ' + M('ABC') + ' is a right angle.', 3, 'Gradients ' + M(F(q, p)) + ' and ' + M(F(p, -q)) + ' multiply to ' + M('-1')],
        ['Find the area of the triangle.', 2, M(F(k * (p * p + q * q), 2))],
        ['Find the centre of the circle through ' + M('A, B, C') + ', explaining your method.', 2, 'The midpoint of ' + M('AC') + ', ' + M(P(F(A[0] + Cc[0], 2), F(A[1] + Cc[1], 2))) + ' — the hypotenuse is a diameter']
      ]);
    },
    function () {
      var ax = ri(-4, 2), ay = ri(-4, 2), bx = ax + 2 * nz(-3, 3), by = ay + 2 * nz(-3, 3);
      var mx = (ax + bx) / 2, my = (ay + by) / 2, mg = -(bx - ax) / (by - ay);
      var c = my - mg * mx;
      return Q('Points ' + M('A' + P(ax, ay)) + ' and ' + M('B' + P(bx, by)) + ' are given.', [
        ['Find the equation of the perpendicular bisector of ' + M('AB') + '.', 3, M(pl(mx, my, F(-(bx - ax), by - ay)))],
        ['Find where it crosses the ' + M('y') + '-axis.', 1, M(P(0, sf3(c)))],
        ['Explain why every point on this line is the same distance from ' + M('A') + ' and ' + M('B') + '.', 1, 'Each point forms two congruent right-angled triangles with ' + M('A') + ', ' + M('B') + ' and the midpoint']
      ]);
    },
    function () {
      var ax = ri(-5, 5), ay = ri(-5, 5), m = ri(1, 4), n = ri(1, 4), dx = (m + n) * nz(-2, 2), dy = (m + n) * nz(-2, 2);
      var bx = ax + dx, by = ay + dy;
      return Q(M('A' + P(ax, ay)) + ' and ' + M('B' + P(bx, by)) + '. Point ' + M('P') + ' lies on ' + M('AB') + ' with ' + M('AP : PB = ' + m + ' : ' + n) + '.', [
        ['Find the coordinates of ' + M('P') + '.', 3, M(P(ax + dx * m / (m + n), ay + dy * m / (m + n)))],
        ['Point ' + M('Q') + ' lies on ' + M('AB') + ' extended beyond ' + M('B') + ' with ' + M('BQ = AB') + '. Find ' + M('Q') + '.', 2, M(P(bx + dx, by + dy))],
        ['Find the ratio ' + M('AP : PQ') + '.', 1, M(m / gcd(m, 2 * (m + n) - m) + ' : ' + (2 * (m + n) - m) / gcd(m, 2 * (m + n) - m))]
      ]);
    },
    function () {
      var m = nz(-3, 3), c = ri(-5, 5), px = ri(-5, 5), py = ri(-5, 5);
      var fx = (px + m * py - m * c) / (1 + m * m), fy = m * fx + c, d = Math.abs(m * px - py + c) / Math.sqrt(1 + m * m);
      return Q('The point ' + M('P' + P(px, py)) + ' and the line ' + M(line(m, c)) + ' are given.', [
        ['Find the equation of the line through ' + M('P') + ' perpendicular to ' + M(line(m, c)) + '.', 2, M(pl(px, py, F(-1, m)))],
        ['Find the foot of the perpendicular.', 3, M(P(sf3(fx), sf3(fy)))],
        ['Find the shortest distance from ' + M('P') + ' to the line.', 2, M(sf3(d))]
      ]);
    },
    function () {
      var ax = ri(-4, 0), ay = ri(-4, 0), u = [ri(2, 5), ri(-2, 2)], v = [ri(-2, 2), ri(2, 5)];
      var B = [ax + u[0], ay + u[1]], D = [ax + v[0], ay + v[1]], Cc = [ax + u[0] + v[0], ay + u[1] + v[1]];
      var rh = u[0] * u[0] + u[1] * u[1] === v[0] * v[0] + v[1] * v[1];
      return Q('A quadrilateral has vertices ' + M('A' + P(ax, ay) + ', B' + P(B[0], B[1]) + ', C' + P(Cc[0], Cc[1]) + ', D' + P(D[0], D[1])) + '.', [
        ['Show that the diagonals have the same midpoint.', 2, M(P(F(ax + Cc[0], 2), F(ay + Cc[1], 2)))],
        ['Explain why this proves ' + M('ABCD') + ' is a parallelogram.', 1, 'Diagonals that bisect each other give a parallelogram'],
        ['Is it a rhombus? Justify.', 2, rh ? 'Yes: ' + M('AB^2 = AD^2 = ' + (u[0] * u[0] + u[1] * u[1])) : 'No: ' + M('AB^2 = ' + (u[0] * u[0] + u[1] * u[1])) + ' but ' + M('AD^2 = ' + (v[0] * v[0] + v[1] * v[1]))]
      ]);
    },
    function () {
      var m = nz(-3, 3), c = ri(-4, 4), x1 = ri(-3, 0), x2 = ri(2, 4), x3 = ri(5, 8);
      return Q('The points ' + M(P(x1, m * x1 + c)) + ', ' + M(P(x2, 'k')) + ' and ' + M(P(x3, m * x3 + c)) + ' are collinear.', [
        ['Find ' + M('k') + '.', 3, M('k = ' + (m * x2 + c))],
        ['Find the equation of the line.', 1, M(line(m, c))],
        ['Explain a method using areas to test whether three points are collinear.', 1, 'They are collinear exactly when the triangle they form has area 0']
      ]);
    },
    function () {
      var A = [ri(-4, 0), ri(-4, 0)], B = [ri(2, 6), ri(-3, 2)], Cc = [ri(-2, 4), ri(3, 7)];
      var area = Math.abs(A[0] * (B[1] - Cc[1]) + B[0] * (Cc[1] - A[1]) + Cc[0] * (A[1] - B[1])) / 2;
      return Q('Find the area of the triangle with vertices ' + M(P(A[0], A[1]) + ', ' + P(B[0], B[1]) + ', ' + P(Cc[0], Cc[1])) + '.', [
        ['Draw the smallest rectangle around the triangle with sides parallel to the axes, and use it to find the area.', 4, num(area)],
        ['Find the length of the longest side.', 2, (function () { var d = [[A, B], [B, Cc], [A, Cc]].map(function (p) { return Math.pow(p[0][0] - p[1][0], 2) + Math.pow(p[0][1] - p[1][1], 2); }); var mx = Math.max.apply(null, d); return M('\\sqrt{' + mx + '} = ' + sf3(Math.sqrt(mx))); })()],
        ['Hence find the perpendicular distance from the opposite vertex to that side.', 2, (function () { var d = [[A, B], [B, Cc], [A, Cc]].map(function (p) { return Math.pow(p[0][0] - p[1][0], 2) + Math.pow(p[0][1] - p[1][1], 2); }); var mx = Math.max.apply(null, d); return M(sf3(2 * area / Math.sqrt(mx))); })()]
      ]);
    },
    function () {
      var c = nz(-4, 4), x = ri(-5, 5), y = ri(-5, 5);
      if (y === x + c) y++;
      return Q('Reflect the point ' + M('P' + P(x, y)) + ' in the line ' + M('y = x' + S(c)) + '.', [
        ['Find the equation of the line through ' + M('P') + ' perpendicular to the mirror line.', 2, M('y = ' + c1(-1, 'x') + ((x + y) ? S(x + y) : ''))],
        ['Find where it meets the mirror line.', 2, M(P(F(x + y - c, 2), F(x + y + c, 2)))],
        ['Hence find the image of ' + M('P') + ', and show that it is ' + M(P('y' + S(-c), 'x' + S(c))) + ' in general.', 2, M(P(y - c, x + c))]
      ]);
    }
  ]);

  X('fm-circles', [
    function () {
      var a = nz(-5, 5), b = nz(-5, 5), r = ri(2, 7);
      var cc = a * a + b * b - r * r;
      return Q('A circle has equation ' + M('x^2 + y^2' + S(-2 * a) + 'x' + S(-2 * b) + 'y' + (cc ? S(cc) : '') + ' = 0') + '.', [
        ['Find its centre and radius by completing the square.', 3, 'Centre ' + M(P(a, b)) + ', radius ' + r],
        ['Does the circle cross the ' + M('x') + '-axis? Explain.', 2, Math.abs(b) < r ? 'Yes, twice: the centre is ' + Math.abs(b) + ' from the axis, less than the radius' : Math.abs(b) === r ? 'It touches it' : 'No: the centre is ' + Math.abs(b) + ' from the axis, more than the radius'],
        ['Is the origin inside, on or outside the circle?', 1, cc < 0 ? 'Inside' : cc === 0 ? 'On it' : 'Outside']
      ]);
    },
    function () {
      var pt = pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [5, 12, 13], [12, 5, 13], [8, 6, 10]]), sx = pick([1, -1]), sy = pick([1, -1]);
      var x0 = sx * pt[0], y0 = sy * pt[1], r = pt[2];
      return Q('The point ' + M(P(x0, y0)) + ' lies on ' + M('x^2 + y^2 = ' + r * r) + '.', [
        ['Find the equation of the tangent at this point.', 3, M(c1(x0, 'x') + (y0 < 0 ? ' - ' + c1(-y0, 'y') : ' + ' + c1(y0, 'y')) + ' = ' + r * r)],
        ['Find where the tangent meets the axes.', 2, M(P(F(r * r, x0), 0)) + ' and ' + M(P(0, F(r * r, y0)))],
        ['Find the area of the triangle formed by the tangent and the axes.', 1, M(F(Math.pow(r, 4), 2 * Math.abs(x0 * y0)))]
      ]);
    },
    function () {
      var r = ri(2, 6), c = ri(1, 9);
      var D = 8 * r * r - 4 * c * c;
      return Q('The line ' + M('y = x + ' + c) + ' and the circle ' + M('x^2 + y^2 = ' + r * r) + ' are drawn.', [
        ['Show that the ' + M('x') + '-coordinates of any intersections satisfy ' + M('2x^2 + ' + 2 * c + 'x' + (c * c - r * r ? S(c * c - r * r) : '') + ' = 0') + '.', 2, 'Substitute and expand'],
        ['How many times does the line meet the circle?', 2, 'Discriminant ' + D + ': ' + (D > 0 ? 'twice' : D === 0 ? 'once' : 'never')],
        ['Find the exact value of ' + M('c > 0') + ' for which ' + M('y = x + c') + ' is a tangent.', 2, M('c = ' + rt(2 * r * r))]
      ]);
    },
    function () {
      var a = ri(-3, 3), b = ri(-3, 3);
      var pts = [[a + 3, b + 4], [a - 5, b], [a + 4, b - 3]];
      return Q('A circle passes through ' + M(P(pts[0][0], pts[0][1])) + ', ' + M(P(pts[1][0], pts[1][1])) + ' and ' + M(P(pts[2][0], pts[2][1])) + '.', [
        ['Explain why the centre lies on the perpendicular bisector of any chord.', 1, 'The centre is equidistant from both ends of the chord'],
        ['Find the centre by intersecting two perpendicular bisectors.', 4, M(P(a, b))],
        ['Write down the equation of the circle.', 1, M(circ(a, b, 25))]
      ]);
    },
    function () {
      var a = ri(-3, 3), b = ri(-3, 3), r = pick([5, 10, 13]), d = pick({ 5: [3, 4], 10: [6, 8], 13: [5, 12] }[r]), k = a + d;
      var h = Math.sqrt(r * r - d * d);
      return Q('The line ' + M('x = ' + k) + ' cuts the circle ' + M(circ(a, b, r * r)) + '.', [
        ['Find the distance from the centre to the line.', 1, d],
        ['Find the length of the chord.', 2, 2 * h],
        ['Find the coordinates of the ends of the chord.', 2, M(P(k, b + h)) + ' and ' + M(P(k, b - h))],
        ['Find the angle the chord subtends at the centre.', 2, M(sf3(2 * Math.asin(h / r) / R) + '°')]
      ]);
    },
    function () {
      var a = ri(-4, 4), b = ri(-4, 4), r = ri(3, 8), px = a + ri(6, 9), py = b + ri(6, 9);
      var d = Math.sqrt((px - a) * (px - a) + (py - b) * (py - b));
      return Q('A circle has equation ' + M(circ(a, b, r * r)) + ' and ' + M('P' + P(px, py)) + ' is a point.', [
        ['Show that ' + M('P') + ' lies outside the circle.', 2, 'Distance from centre ' + M(sf3(d)) + ' > ' + r],
        ['Find the shortest distance from ' + M('P') + ' to the circle.', 2, M(sf3(d - r))],
        ['Find the length of a tangent from ' + M('P') + ' to the circle.', 2, M('\\sqrt{' + Math.round(d * d - r * r) + '} = ' + sf3(Math.sqrt(d * d - r * r)))]
      ]);
    },
    function () {
      var a = ri(-3, 3), b = ri(-3, 3), r1 = ri(2, 5), r2 = ri(2, 5), t = pick([3, 4, 5, 6, 8, 10, 12, 13]);
      var vec = { 3: [3, 0], 4: [0, 4], 5: [3, 4], 6: [6, 0], 8: [0, 8], 10: [6, 8], 12: [12, 0], 13: [5, 12] }[t];
      var Dd = t, rel = Dd > r1 + r2 ? 'separate (no intersection)' : Dd === r1 + r2 ? 'touch externally' : Dd > Math.abs(r1 - r2) ? 'intersect at two points' : Dd === Math.abs(r1 - r2) ? 'touch internally' : 'one lies inside the other';
      return Q('Circle ' + M('C_1') + ' is ' + M(circ(a, b, r1 * r1)) + ' and circle ' + M('C_2') + ' is ' + M(circ(a + vec[0], b + vec[1], r2 * r2)) + '.', [
        ['Find the distance between the centres.', 2, Dd],
        ['Decide how the circles are related, comparing with the radii.', 2, rel],
        ['Find a radius for ' + M('C_2') + ' that would make the circles touch externally.', 1, Dd - r1 > 0 ? Dd - r1 : 'Impossible with this centre (it is inside ' + M('C_1') + ')']
      ]);
    },
    function () {
      var r = ri(3, 8), a = nz(-3, 3), b = ri(-3, 3);
      return Q('A circle has centre ' + M(P(a, b)) + ' and touches the ' + M('y') + '-axis.', [
        ['Find its radius and equation.', 2, Math.abs(a) + '; ' + M(circ(a, b, a * a))],
        ['A second circle with the same centre has radius ' + (Math.abs(a) + r) + '. Find where it meets the ' + M('y') + '-axis.', 3, M('(0,\\ ' + b + ' \\pm ' + rt((Math.abs(a) + r) * (Math.abs(a) + r) - a * a) + ')')],
        ['Explain why a circle touching both axes has centre on ' + M('y = x') + ' or ' + M('y = -x') + '.', 1, 'Its distances to both axes equal the radius, so ' + M('|x| = |y|')]
      ]);
    }
  ]);

  X('fm-calculus', [
    function () {
      var p = ri(1, 4), q = ri(-5, 5);
      return Q('Consider ' + M('y = x^3 - ' + 3 * p * p + 'x' + (q ? S(q) : '')) + '.', [
        ['Find the stationary points.', 3, M(P(-p, 2 * p * p * p + q)) + ' and ' + M(P(p, -2 * p * p * p + q))],
        ['Use the second derivative to decide which is a maximum.', 2, M('\\frac{d^2y}{dx^2} = 6x') + ': maximum at ' + M('x = -' + p) + ', minimum at ' + M('x = ' + p)],
        ['For which values of ' + M('k') + ' does ' + M('y = k') + ' meet the curve three times?', 2, M((-2 * p * p * p + q) + ' < k < ' + (2 * p * p * p + q))]
      ]);
    },
    function () {
      var a = nz(-3, 3), b = ri(-4, 4), x0 = nz(-2, 2);
      var y0 = a * x0 * x0 + b * x0, m = 2 * a * x0 + b;
      if (m === 0) { b += 1; y0 = a * x0 * x0 + b * x0; m = 2 * a * x0 + b; }
      return Q('The curve ' + M('y = ' + poly([a, b, 0])) + ' passes through ' + M('P' + P(x0, y0)) + '.', [
        ['Find the equation of the tangent at ' + M('P') + '.', 3, M(line(m, y0 - m * x0))],
        ['Find the equation of the normal at ' + M('P') + '.', 2, M(pl(x0, y0, F(-1, m)))],
        ['Find where the normal crosses the ' + M('x') + '-axis.', 2, M(P(sf3(x0 + m * y0), 0))]
      ]);
    },
    function () {
      var L = 6 * ri(2, 8);
      return Q('Equal squares of side ' + M('x') + ' cm are cut from the corners of a square sheet of side ' + L + ' cm, and the sides folded up to make an open box.', [
        ['Show that the volume is ' + M('V = x(' + L + ' - 2x)^2') + '.', 1, 'Base ' + M('(' + L + ' - 2x)') + ' square, height ' + M('x')],
        ['Find ' + M('\\frac{dV}{dx}') + ' and the value of ' + M('x') + ' that maximises the volume.', 4, M('\\frac{dV}{dx} = (' + L + ' - 2x)(' + L + ' - 6x)') + ', ' + M('x = ' + L / 6)],
        ['Find the maximum volume, and explain why the other stationary value is rejected.', 2, 2 * L * L * L / 27 + ' cm³; ' + M('x = ' + L / 2) + ' gives no box']
      ]);
    },
    function () {
      var k = pick([3, 12, 27, 48]), a = Math.sqrt(k / 3);
      return Q('Consider ' + M('y = x^3') + '.', [
        ['Find the points where the gradient is ' + k + '.', 2, M(P(a, a * a * a)) + ' and ' + M(P(-a, -a * a * a))],
        ['Show that the tangents at these points are parallel, and find the distance between where they cross the ' + M('y') + '-axis.', 3, M('y = ' + k + 'x \\mp ' + 2 * a * a * a) + '; distance ' + 4 * a * a * a],
        ['Explain why the gradient of ' + M('y = x^3') + ' is never negative.', 1, M('3x^2 \\ge 0')]
      ]);
    },
    function () {
      var p = ri(1, 3), q = p + ri(1, 3);
      var b = -(p + q) * 3 / 2, c = 3 * p * q;
      var A = 2, B = -3 * (p + q), Cc = 6 * p * q;
      return Q('A particle moves so that its displacement is ' + M('s = ' + poly([A, B, Cc, 0]).replace(/x/g, 't')) + ' metres after ' + M('t') + ' seconds.', [
        ['Find the velocity and the times when the particle is at rest.', 3, M('v = ' + poly([3 * A, 2 * B, Cc]).replace(/x/g, 't')) + '; ' + M('t = ' + p) + ' and ' + M('t = ' + q)],
        ['Find the acceleration at each of these times.', 2, M('a = ' + poly([6 * A, 2 * B]).replace(/x/g, 't')) + ': ' + (6 * A * p + 2 * B) + ' and ' + (6 * A * q + 2 * B)],
        ['Find the total distance travelled in the first ' + q + ' seconds.', 3, (function () { var s = function (t) { return A * t * t * t + B * t * t + Cc * t; }; return num(Math.abs(s(p)) + Math.abs(s(q) - s(p))) + ' m'; })()]
      ]);
    },
    function () {
      var a = nz(-3, 3), p = nz(-3, 3), q = -a * p * p, b = -2 * a * p;
      return Q('The curve ' + M('y = ax^2 + bx') + ' has a stationary point at ' + M(P(p, q)) + '.', [
        ['Form two equations in ' + M('a') + ' and ' + M('b') + '.', 2, M('2a(' + p + ') + b = 0') + ' and ' + M('a(' + p * p + ') + b(' + p + ') = ' + q)],
        ['Solve them.', 2, M('a = ' + a + ',\\ b = ' + b)],
        ['Is the point a maximum or minimum?', 1, a > 0 ? 'Minimum (' + M('a > 0') + ')' : 'Maximum (' + M('a < 0') + ')']
      ]);
    },
    function () {
      var a = ri(1, 5);
      return Q('Tangents are drawn to ' + M('y = x^2') + ' at ' + M('x = ' + a) + ' and ' + M('x = -' + a) + '.', [
        ['Find the equations of both tangents.', 3, M('y = ' + 2 * a + 'x - ' + a * a) + ' and ' + M('y = -' + 2 * a + 'x - ' + a * a)],
        ['Show that they meet on the ' + M('y') + '-axis, and find where.', 1, M(P(0, -a * a))],
        ['Find the positive value of ' + M('t') + ' for which the tangents at ' + M('x = t') + ' and ' + M('x = -t') + ' are perpendicular.', 2, M('2t \\times (-2t) = -1') + ', ' + M('t = \\frac{1}{2}')]
      ]);
    },
    function () {
      var k = ri(1, 9);
      return Q('Consider ' + M('y = x^3 - 3x^2 + kx') + '.', [
        ['Find ' + M('\\frac{dy}{dx}') + '.', 1, M('3x^2 - 6x + ' + k)],
        ['Find the values of ' + M('k') + ' for which the curve is increasing for all ' + M('x') + '.', 3, M('36 - 12k \\le 0') + ', so ' + M('k \\ge 3')],
        ['When ' + M('k = ' + k) + ', does the curve have stationary points? If so, find their ' + M('x') + '-coordinates.', 2, k < 3 ? 'Yes: ' + M('x = 1 \\pm \\sqrt{' + F(3 - k, 3) + '}') : k === 3 ? 'One stationary point of inflection at ' + M('x = 1') : 'No']
      ]);
    }
  ]);

  X('fm-matrices', [
    function () {
      var a = nz(-3, 3), b = nz(-3, 3), c = nz(-3, 3), d = nz(-3, 3), t = a + d, det = a * d - b * c;
      return Q(M('\\mathbf{A} = ' + mat(a, b, c, d)) + '.', [
        ['Find ' + M('\\mathbf{A}^2') + '.', 2, M(mat(a * a + b * c, a * b + b * d, c * a + d * c, c * b + d * d))],
        ['Show that ' + M('\\mathbf{A}^2' + (t ? (t > 0 ? ' - ' : ' + ') + (Math.abs(t) === 1 ? '' : Math.abs(t)) + '\\mathbf{A}' : '') + (det ? (det > 0 ? ' + ' : ' - ') + (Math.abs(det) === 1 ? '' : Math.abs(det)) + '\\mathbf{I}' : '') + ' = \\mathbf{0}') + '.', 3, 'Substitute and simplify each entry'],
        ['Explain where the numbers ' + t + ' and ' + det + ' come from.', 1, 'The sum of the leading diagonal, and ' + M('ad - bc')]
      ]);
    },
    function () {
      return Q(M('\\mathbf{R} = ' + mat(0, -1, 1, 0)) + ' and ' + M('\\mathbf{M} = ' + mat(0, 1, 1, 0)) + '.', [
        ['Describe the transformations ' + M('\\mathbf{R}') + ' and ' + M('\\mathbf{M}') + '.', 2, 'Rotation 90° anticlockwise about the origin; reflection in ' + M('y = x')],
        ['Find ' + M('\\mathbf{RM}') + ' and ' + M('\\mathbf{MR}') + ' and describe each.', 3, M('\\mathbf{RM} = ' + mat(-1, 0, 0, 1)) + ': reflection in the ' + M('y') + '-axis; ' + M('\\mathbf{MR} = ' + mat(1, 0, 0, -1)) + ': reflection in the ' + M('x') + '-axis'],
        ['Explain why ' + M('\\mathbf{RM}') + ' means “do ' + M('\\mathbf{M}') + ' first”.', 1, M('\\mathbf{RM}\\mathbf{x} = \\mathbf{R}(\\mathbf{M}\\mathbf{x})')]
      ]);
    },
    function () {
      var a, b, c, d; do { a = nz(-4, 4); b = nz(-4, 4); c = nz(-4, 4); d = nz(-4, 4); } while (Math.abs(a * d - b * c) !== 1);
      var det = a * d - b * c;
      return Q(M('\\mathbf{A} = ' + mat(a, b, c, d)) + '.', [
        ['Find the determinant.', 1, det],
        ['Find the matrix ' + M('\\mathbf{B} = ' + mat('p', 'q', 'r', 's')) + ' with ' + M('\\mathbf{AB} = \\mathbf{I}') + ' by solving equations.', 4, M(mat(d * det, -b * det, -c * det, a * det))],
        ['Describe a quick way to write down ' + M('\\mathbf{B}') + ', and explain what goes wrong when the determinant is 0.', 2, 'Swap ' + M('a, d') + ', negate ' + M('b, c') + ', divide by the determinant; with determinant 0 there is no inverse']
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(-3, 3), c = ri(-3, 3), d = ri(1, 4);
      if (a * d - b * c === 0) d++;
      var det = a * d - b * c;
      return Q('The unit square is transformed by ' + M(mat(a, b, c, d)) + '.', [
        ['Find the vertices of the image.', 2, M(P(0, 0) + ', ' + P(a, c) + ', ' + P(a + b, c + d) + ', ' + P(b, d))],
        ['Find the area of the image.', 2, Math.abs(det)],
        ['A shape of area 7 is transformed by this matrix. Find the area of the image, and explain.', 1, 7 * Math.abs(det) + ': areas are multiplied by |determinant|']
      ]);
    },
    function () {
      var a = nz(-3, 3), b = nz(-3, 3);
      return Q(M('\\mathbf{A} = ' + mat('a', 2, 1, 'b')) + ' and ' + M('\\mathbf{A}^2 = ' + mat(a * a + 2, 2 * a + 2 * b, a + b, 2 + b * b)) + '.', [
        ['Form equations by comparing entries.', 2, M('a^2 + 2 = ' + (a * a + 2)) + ', ' + M('2a + 2b = ' + (2 * a + 2 * b)) + ', ' + M('b^2 + 2 = ' + (b * b + 2))],
        ['Find ' + M('a') + ' and ' + M('b') + ', explaining why the off-diagonal entries are needed.', 3, M('a = ' + a + ',\\ b = ' + b) + '; the squares alone allow ' + M('\\pm') + ' each']
      ]);
    },
    function () {
      var k = nz(-3, 3);
      return Q('The matrix ' + M('\\mathbf{S} = ' + mat(1, k, 0, 1)) + ' is a shear.', [
        ['Find ' + M('\\mathbf{S}^2') + ' and ' + M('\\mathbf{S}^3') + '.', 2, M(mat(1, 2 * k, 0, 1)) + ', ' + M(mat(1, 3 * k, 0, 1))],
        ['Write down ' + M('\\mathbf{S}^n') + ' and explain why it makes sense geometrically.', 2, M(mat(1, 'n \\times ' + (k < 0 ? '(' + k + ')' : k), 0, 1)) + ': repeating the shear adds the same slide each time'],
        ['Show that points on the ' + M('x') + '-axis are not moved.', 1, M(mat(1, k, 0, 1) + '\\begin{pmatrix}x\\\\0\\end{pmatrix} = \\begin{pmatrix}x\\\\0\\end{pmatrix}')]
      ]);
    },
    function () {
      var k = ri(2, 4);
      return Q('A transformation is an enlargement, scale factor ' + k + ', centre the origin, followed by a rotation of 90° anticlockwise about the origin.', [
        ['Write the matrix for each transformation.', 2, M(mat(k, 0, 0, k)) + ' and ' + M(mat(0, -1, 1, 0))],
        ['Find the single matrix, multiplying in the correct order.', 2, M(mat(0, -k, k, 0))],
        ['Does the order matter here? Explain.', 1, 'No: an enlargement about the origin commutes with any matrix'],
        ['Find the area scale factor of the combined transformation.', 1, k * k]
      ]);
    },
    function () {
      var a = pick([-3, -2, -1, 2, 3]);
      return Q('The matrix ' + M(mat(1, 0, 0, a)) + ' is applied.', [
        ['Describe the transformation.', 1, a === -1 ? 'Reflection in the ' + M('x') + '-axis' : 'A stretch parallel to the ' + M('y') + '-axis, factor ' + a],
        ['Find all invariant points (points that do not move).', 2, a === 1 ? 'Every point' : 'All points on the ' + M('x') + '-axis'],
        ['Is the line ' + M('x = 2') + ' invariant (mapped onto itself)? Explain.', 2, 'Yes: ' + M('(2, y) \\to (2, ' + c1(a, 'y') + ')') + ', still on ' + M('x = 2')]
      ]);
    }
  ]);

  X('fm-trig', [
    function () {
      var k = pick([0.2, 0.3, 0.4, 0.6, 0.7, 0.8, -0.3, -0.5, -0.6]), b = Math.asin(k) / R;
      var s1 = k >= 0 ? b : 180 - b, s2 = k >= 0 ? 180 - b : 360 + b;
      return Q('Solve ' + M('\\sin x = ' + k) + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['Find the calculator value and explain whether it is in the range.', 1, M(sf3(b) + '°') + (b < 0 ? ': not in range' : ': in range')],
        ['Use the symmetry of the sine graph to find all solutions.', 3, M(sf3(s1) + '°') + ' and ' + M(sf3(s2) + '°')],
        ['How many solutions are there in ' + M('0° \\le x \\le 1080°') + '?', 1, 6]
      ]);
    },
    function () {
      var k = pick([1.2, 1.3, 1.4, 0.5, 0.6]);
      return Q('Given ' + M('\\sin\\theta + \\cos\\theta = ' + k) + '.', [
        ['Show that ' + M('(\\sin\\theta + \\cos\\theta)^2 = 1 + 2\\sin\\theta\\cos\\theta') + '.', 2, 'Expand and use ' + M('\\sin^2\\theta + \\cos^2\\theta = 1')],
        ['Find ' + M('\\sin\\theta\\cos\\theta') + '.', 2, M(sf3((k * k - 1) / 2))],
        ['Explain why ' + M('\\sin\\theta + \\cos\\theta = 1.5') + ' is impossible.', 2, 'It would need ' + M('\\sin\\theta\\cos\\theta = 0.625') + ', but ' + M('(\\sin\\theta - \\cos\\theta)^2 \\ge 0') + ' gives ' + M('\\sin\\theta\\cos\\theta \\le 0.5')]
      ]);
    },
    function () {
      return Q('Solve ' + M('2\\sin^2 x - \\sin x - 1 = 0') + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['Factorise as a quadratic in ' + M('\\sin x') + '.', 2, M('(2\\sin x + 1)(\\sin x - 1) = 0')],
        ['Find all solutions.', 3, '90°, 210°, 330°'],
        ['Explain why ' + M('2\\sin^2 x - \\sin x - 6 = 0') + ' has no solutions.', 1, 'It gives ' + M('\\sin x = 2') + ' or ' + M('-1.5') + ', both outside ' + M('[-1, 1]')]
      ]);
    },
    function () {
      var a = ri(2, 6);
      return Q('Use exact values.', [
        ['Find the exact value of ' + M('\\sin 60° \\tan 30° + \\cos^2 45°') + '.', 2, M('\\frac{1}{2} + \\frac{1}{2} = 1')],
        ['A triangle has sides ' + a + ' cm and ' + 2 * a + ' cm with included angle 60°. Find the exact third side.', 3, M(a + '\\sqrt{3}') + ' cm'],
        ['Show that the triangle is right-angled.', 1, M('(' + a + '\\sqrt{3})^2 + ' + a + '^2 = (' + 2 * a + ')^2')]
      ]);
    },
    function () {
      var c = pick([0.3, 0.5, -0.4, 1, -1, 0]);
      var n = c === 1 || c === -1 ? 2 : c === 0 ? 5 : 4;
      return Q('Consider the graph of ' + M('y = \\sin x') + ' for ' + M('0° \\le x \\le 720°') + '.', [
        ['How many solutions does ' + M('\\sin x = ' + c) + ' have in this range? Explain using the graph.', 2, n],
        ['For which values of ' + M('c') + ' are there exactly 4 solutions?', 2, M('-1 < c < 0') + ' or ' + M('0 < c < 1')],
        ['Find the sum of all solutions of ' + M('\\sin x = 0.5') + ' in this range.', 2, '30 + 150 + 390 + 510 = 1080°']
      ]);
    },
    function () {
      return Q('Solve ' + M('\\tan x = 2\\sin x') + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['Explain why dividing both sides by ' + M('\\sin x') + ' would lose solutions.', 1, M('\\sin x') + ' might be 0'],
        ['Rewrite as ' + M('\\sin x\\left(\\frac{1}{\\cos x} - 2\\right) = 0') + ' and solve.', 4, '0°, 60°, 180°, 300°, 360°']
      ]);
    },
    function () {
      var k = pick([2, 3, 0.5]);
      var b = Math.atan(k) / R;
      return Q('Solve ' + M('\\sin x = ' + k + '\\cos x') + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['Show that ' + M('\\tan x = ' + k) + '.', 1, 'Divide by ' + M('\\cos x') + ' (it cannot be 0 here, since then ' + M('\\sin x') + ' would be 0 too)'],
        ['Find both solutions.', 2, M(sf3(b) + '°') + ' and ' + M(sf3(b + 180) + '°')],
        ['Explain why solutions of ' + M('\\tan x = k') + ' are always 180° apart.', 1, 'The tangent graph repeats every 180°']
      ]);
    },
    function () {
      var k = pick([3, 1]);
      var sols = k === 3 ? '60°, 120°, 240°, 300°' : '45°, 135°, 225°, 315°';
      return Q('Solve ' + M('\\sin^2 x = ' + (k === 1 ? '' : k) + '\\cos^2 x') + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['Show that ' + M('\\tan^2 x = ' + k) + '.', 1, 'Divide by ' + M('\\cos^2 x')],
        ['Find all solutions.', 3, sols],
        ['Solve the same equation using ' + M('\\sin^2 x + \\cos^2 x = 1') + ' instead, and check you agree.', 2, M('\\cos^2 x = ' + F(1, k + 1))]
      ]);
    }
  ]);

  X('fm-geometry', [
    function () {
      var a = ri(3, 8), b = ri(3, 8), c = ri(2, 6);
      var d = Math.sqrt(a * a + b * b + c * c);
      return Q('A cuboid measures ' + a + ' by ' + b + ' by ' + c + ' cm.', [
        ['Find the angle between a space diagonal and the base.', 3, M(sf3(Math.atan(c / Math.sqrt(a * a + b * b)) / R) + '°')],
        ['Find the angle between two face diagonals that meet at a corner (one on the base, one on the ' + a + ' × ' + c + ' face).', 4, (function () { var p = Math.sqrt(a * a + b * b), q = Math.sqrt(a * a + c * c), r = Math.sqrt(b * b + c * c); return M(sf3(Math.acos((p * p + q * q - r * r) / (2 * p * q)) / R) + '°'); })()],
        ['Find the length of the space diagonal.', 1, M(sf3(d)) + ' cm']
      ]);
    },
    function () {
      var s = 2 * ri(2, 6), h = ri(4, 12), half = s / 2, dg = s * Math.SQRT2 / 2;
      return Q('A square-based pyramid has base side ' + s + ' cm and its vertex is ' + h + ' cm directly above the centre.', [
        ['Find the angle between a sloping edge and the base.', 3, M(sf3(Math.atan(h / dg) / R) + '°')],
        ['Find the angle between a triangular face and the base.', 2, M(sf3(Math.atan(h / half) / R) + '°')],
        ['Explain why the second angle is larger.', 1, 'The horizontal distance to the midpoint of a side is shorter than to a corner']
      ]);
    },
    function () {
      var a = ri(4, 12);
      return Q('A regular tetrahedron has all edges ' + a + ' cm.', [
        ['Find the distance from a vertex of the base to the centre of the base triangle.', 2, M('\\frac{' + a + '}{\\sqrt{3}} = ' + sf3(a / Math.sqrt(3))) + ' cm'],
        ['Find the height of the tetrahedron.', 2, M(sf3(a * Math.sqrt(2 / 3))) + ' cm'],
        ['Find the angle between an edge and the base.', 2, M(sf3(Math.acos(1 / Math.sqrt(3)) / R) + '°') + ' — the same for every size']
      ]);
    },
    function () {
      var l = ri(8, 15), w = ri(3, 8), h = ri(2, 6);
      return Q('A triangular prism (a wedge) has a horizontal rectangular base ' + l + ' cm by ' + w + ' cm. Its vertical rectangular face is ' + l + ' cm by ' + h + ' cm.', [
        ['Find the angle between the sloping face and the base.', 2, M(sf3(Math.atan(h / w) / R) + '°')],
        ['Find the length of the line from a bottom corner on the back edge to the opposite top corner.', 2, M(sf3(Math.sqrt(l * l + w * w + h * h))) + ' cm'],
        ['Find the angle between this line and the base.', 2, M(sf3(Math.atan(h / Math.sqrt(l * l + w * w)) / R) + '°')]
      ]);
    },
    function () {
      var a = ri(3, 8), b = ri(3, 8), c = ri(3, 8);
      var p = Math.sqrt(a * a + b * b), q = Math.sqrt(b * b + c * c), r = Math.sqrt(a * a + c * c);
      var C = Math.acos((p * p + q * q - r * r) / (2 * p * q));
      return Q('A cuboid is ' + a + ' by ' + b + ' by ' + c + ' cm. Choose one corner; a triangle is formed by joining the three corners that are one edge away from it.', [
        ['Find the lengths of the three sides of the triangle.', 2, M(sf3(p) + ', ' + sf3(q) + ', ' + sf3(r)) + ' cm'],
        ['Find one angle of the triangle using the cosine rule.', 2, M(sf3(C / R) + '°')],
        ['Find the area of the triangle.', 2, M(sf3(0.5 * p * q * Math.sin(C))) + ' cm²']
      ]);
    },
    function () {
      var r = ri(3, 9), h = ri(4, 15), l = Math.sqrt(r * r + h * h);
      return Q('A cone has base radius ' + r + ' cm and height ' + h + ' cm.', [
        ['Find the semi-vertical angle (between the slant edge and the axis).', 2, M(sf3(Math.atan(r / h) / R) + '°')],
        ['Find the angle at the vertex in a vertical cross-section through the axis.', 1, M(sf3(2 * Math.atan(r / h) / R) + '°')],
        ['An ant walks once round the cone from a point on the base edge back to itself, taking the shortest path on the surface. Explain how you would find this distance.', 2, 'Unroll the curved surface into a sector of radius ' + sf3(l) + ' cm and angle ' + sf3(360 * r / l) + '°; the path is the straight chord']
      ]);
    },
    function () {
      return Q('In triangle ' + M('ABC') + ', the circle through ' + M('A, B, C') + ' has radius ' + M('R') + '.', [
        ['Draw the diameter ' + M('BD') + '. Explain why angle ' + M('BDC') + ' = angle ' + M('BAC') + ' and angle ' + M('BCD = 90°') + '.', 2, 'Angles in the same segment; angle in a semicircle'],
        ['Hence prove that ' + M('\\frac{a}{\\sin A} = 2R') + '.', 2, 'In triangle ' + M('BCD') + ', ' + M('\\sin D = \\frac{a}{2R}')],
        ['Explain how this extends the sine rule.', 1, 'All three ratios equal ' + M('2R') + ', the diameter of the circumcircle']
      ]);
    },
    function () {
      var t = ri(10, 30), w = ri(5, 15), a = ri(20, 70);
      var h = w * Math.tan(t * R);
      return Q('A rectangular ramp rises at ' + t + '° along its line of greatest slope, which is ' + w + ' m long horizontally. A path on the ramp makes an angle of ' + a + '° with the horizontal edge at the bottom.', [
        ['Find the height of the top of the ramp.', 2, M(sf3(h)) + ' m'],
        ['Find the length of the path from the bottom edge to the top edge.', 3, M(sf3(w / (Math.sin(a * R) * Math.cos(t * R)))) + ' m'],
        ['Explain why the path makes a smaller angle with the horizontal than ' + t + '°.', 1, 'It climbs the same height over a longer distance']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
