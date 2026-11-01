/* Byte Size Classroom — deeper extension questions (set 3, A level Year 1 part b): straight lines, circles, algebraic methods, binomial expansion. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function S0(v) { return v ? S(v) : ''; }
  function xm(v) { return v ? '(x' + S(-v) + ')' : 'x'; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function P(x, y) { return '(' + x + ', ' + y + ')'; }
  function line(m, c) { return 'y = ' + (m === 0 ? String(c || 0) : c1(m, 'x') + S0(c)); }
  function circ(a, b, r2) { return (a ? '(x' + S(-a) + ')^2' : 'x^2') + ' + ' + (b ? '(y' + S(-b) + ')^2' : 'y^2') + ' = ' + r2; }
  function sq(n) { var r = Math.round(Math.sqrt(n)); return r * r === n; }
  function rt(n) { var o = 1, i = n; for (var k = 2; k * k <= i; k++) while (i % (k * k) === 0) { o *= k; i /= k * k; } return i === 1 ? String(o) : (o === 1 ? '' : o) + '\\sqrt{' + i + '}'; }
  function C(n, r) { if (r < 0 || r > n) return 0; var v = 1; for (var i = 1; i <= r; i++) v = v * (n - r + i) / i; return Math.round(v); }
  function lin(a, b, c) { /* ax + by + c = 0 */ var s = c1(a, 'x'); s += b < 0 ? ' - ' + c1(-b, 'y') : ' + ' + c1(b, 'y'); return s + S0(c) + ' = 0'; }

  X('al-lines', [
    function () {
      var x1 = ri(-4, 0), y1 = ri(1, 6), x2 = ri(1, 6), y2 = ri(-4, 0);
      var a = y2 - y1, b = x1 - x2, c = -(a * x1 + b * y1), gg = Math.abs(gcd(gcd(a, b), c)) || 1;
      a /= gg; b /= gg; c /= gg; if (a < 0) { a = -a; b = -b; c = -c; }
      var xi = c ? -c / a : 0, yi = c ? -c / b : 0;
      return Q('A line passes through ' + M(P(x1, y1)) + ' and ' + M(P(x2, y2)) + '.', [
        ['Find its equation in the form ' + M('ax + by + c = 0') + ' with integers.', 3, M(lin(a, b, c))],
        ['Find where it crosses the axes.', 2, M(P(F(-c, a), 0)) + ' and ' + M(P(0, F(-c, b)))],
        ['Find the area of the triangle it forms with the axes.', 1, M(F(c * c, 2 * Math.abs(a * b)))]
      ]);
    },
    function () {
      var A = [0, 0], B = [2 * ri(2, 5), 0], Cc = [2 * ri(0, 3), 2 * ri(2, 5)];
      var ux = B[0] / 2, cx = Cc[0], cy = Cc[1];
      var y0 = (cx * cx + cy * cy - 2 * ux * cx) / (2 * cy);
      return Q('Triangle ' + M('OAB') + ' has vertices ' + M('O(0, 0)') + ', ' + M('A' + P(B[0], 0)) + ' and ' + M('B' + P(cx, cy)) + '.', [
        ['Find the perpendicular bisector of ' + M('OA') + '.', 1, M('x = ' + ux)],
        ['Find the perpendicular bisector of ' + M('OB') + '.', 3, M(cx === 0 ? 'y = ' + cy / 2 : 'y' + S(-cy / 2) + ' = ' + (F(-cx, cy) === '1' ? '' : F(-cx, cy) === '-1' ? '-' : F(-cx, cy)) + '(x' + S(-cx / 2) + ')')],
        ['Hence find the centre of the circle through ' + M('O, A, B') + '.', 2, M(P(ux, F(cx * cx + cy * cy - 2 * ux * cx, 2 * cy)))]
      ]);
    },
    function () {
      var m = nz(-3, 3), c1v = ri(-6, 0), c2v = c1v + ri(3, 10);
      return Q('The lines ' + M(line(m, c1v)) + ' and ' + M(line(m, c2v)) + ' are drawn.', [
        ['Explain why they are parallel.', 1, 'Same gradient ' + m],
        ['Find the point where the perpendicular through ' + M(P(0, c1v)) + ' meets the second line.', 3, M(P(F(-m * (c2v - c1v), 1 + m * m), F(c2v + c1v * m * m, 1 + m * m)))],
        ['Find the exact distance between the lines.', 2, M('\\frac{' + (c2v - c1v) + '}{\\sqrt{' + (1 + m * m) + '}}')]
      ]);
    },
    function () {
      var a = ri(-4, -1), b = ri(2, 6), cx = ri(-2, 3), cy = ri(3, 7);
      return Q('Triangle has vertices ' + M('A' + P(a, 0)) + ', ' + M('B' + P(b, 0)) + ' and ' + M('C' + P(cx, cy)) + '.', [
        ['Find the equation of the altitude from ' + M('A') + ' to ' + M('BC') + '.', 3, M('y = ' + (F(b - cx, cy) === '1' ? '' : F(b - cx, cy) === '-1' ? '-' : F(b - cx, cy)) + '(x' + S(-a) + ')')],
        ['The altitude from ' + M('C') + ' is ' + M('x = ' + cx) + '. Find where the two altitudes meet.', 2, M(P(cx, F((b - cx) * (cx - a), cy)))],
        ['Show that this point also lies on the altitude from ' + M('B') + '.', 2, 'Gradient of ' + M('AC') + ' is ' + M(F(cy, cx - a)) + '; check the line through ' + M('B') + ' with gradient ' + M(F(a - cx, cy))]
      ]);
    },
    function () {
      var p = ri(10, 30), q = ri(2, 6), r = ri(p + 10, p + 40), s = ri(1, q - 1);
      var n = (r - p) / (q - s);
      return Q('Plumber A charges £' + p + ' plus £' + q + ' per minute. Plumber B charges £' + r + ' plus £' + s + ' per minute.', [
        ['Write each cost as a linear model ' + M('C = a + bt') + ' and interpret ' + M('a') + ' and ' + M('b') + '.', 2, M('C_A = ' + p + ' + ' + q + 't') + ', ' + M('C_B = ' + r + ' + ' + s + 't') + '; call-out fee and rate per minute'],
        ['For how long a job is B cheaper?', 2, 'More than ' + sf3(n) + ' minutes'],
        ['Suggest one way in which the models may be unrealistic.', 1, 'Charges are often per hour or part hour, not continuous']
      ]);
    },
    function () {
      var m = nz(-3, 3), c = nz(-6, 6);
      var fx = -m * c / (1 + m * m), fy = c / (1 + m * m);
      return Q('Find the point on ' + M(line(m, c)) + ' closest to the origin.', [
        ['Write the equation of the perpendicular through the origin.', 1, M('y = ' + F(-1, m) + 'x').replace('= 1x', '= x').replace('= -1x', '= -x')],
        ['Find the point.', 2, M(P(F(-m * c, 1 + m * m), F(c, 1 + m * m)))],
        ['Find the shortest distance, and show it equals ' + M('\\frac{|c|}{\\sqrt{1 + m^2}}') + '.', 2, M('\\frac{' + Math.abs(c) + '}{\\sqrt{' + (1 + m * m) + '}} = ' + sf3(Math.abs(c) / Math.sqrt(1 + m * m)))]
      ]);
    },
    function () {
      var x0 = nz(-4, 4), y0 = nz(-4, 4), m1 = nz(-3, 3), m2; do { m2 = nz(-3, 3); } while (m2 === m1);
      var m3; do { m3 = nz(-3, 3); } while (m3 === m1 || m3 === m2);
      return Q('Show that the lines ' + M(line(m1, y0 - m1 * x0)) + ', ' + M(line(m2, y0 - m2 * x0)) + ' and ' + M(line(m3, y0 - m3 * x0)) + ' all pass through one point.', [
        ['Find where the first two meet.', 3, M(P(x0, y0))],
        ['Verify the third passes through it.', 1, M(m3 * x0 + (y0 - m3 * x0) + ' = ' + y0)],
        ['Explain why any line ' + M('y - ' + (y0 < 0 ? '(' + y0 + ')' : y0) + ' = m(x - ' + (x0 < 0 ? '(' + x0 + ')' : x0) + ')') + ' passes through it.', 1, 'Substituting the point makes both sides zero']
      ]);
    },
    function () {
      var px = ri(-4, 4), py = ri(-4, 4), m = pick([2, -2, 3, -3]), c = ri(-3, 3);
      if (py === m * px + c) py++;
      var fx = (px + m * py - m * c) / (1 + m * m), fy = m * fx + c;
      return Q('Find the reflection of ' + M('P' + P(px, py)) + ' in the line ' + M(line(m, c)) + '.', [
        ['Find the foot of the perpendicular from ' + M('P') + ' to the line.', 3, M(P(F(px + m * py - m * c, 1 + m * m), F(m * (px + m * py - m * c) + c * (1 + m * m), 1 + m * m)))],
        ['Hence find the image of ' + M('P') + '.', 2, M(P(F(2 * (px + m * py - m * c) - px * (1 + m * m), 1 + m * m), F(2 * (m * (px + m * py - m * c) + c * (1 + m * m)) - py * (1 + m * m), 1 + m * m)))],
        ['Explain why the foot of the perpendicular is the midpoint of ' + M('P') + ' and its image.', 1, 'A reflection keeps distances to the mirror line equal on both sides']
      ]);
    },
    function () {
      var a = nz(-4, 4), b = nz(-4, 4), c = nz(-5, 5);
      return Q('Consider the lines ' + M('kx + ' + 2 + 'y = ' + c) + ' and ' + M(c1(a, 'x') + (b < 0 ? ' - ' + c1(-b, 'y') : ' + ' + c1(b, 'y')) + ' = 1') + '.', [
        ['Find ' + M('k') + ' if the lines are parallel.', 2, M('k = ' + F(2 * a, b))],
        ['Find ' + M('k') + ' if the lines are perpendicular.', 2, M('k = ' + F(-2 * b, a))],
        ['Explain why there is no value of ' + M('k') + ' making them the same line, unless ' + M('c') + ' is special.', 1, 'The constants would also have to be in the same ratio']
      ]);
    },
    function () {
      var x0 = ri(-3, 3), y0 = ri(-3, 3), u = [ri(1, 4), ri(1, 4)], v = [-u[1], u[0]];
      var A = [x0, y0], B = [x0 + u[0], y0 + u[1]], Cc = [x0 + u[0] + v[0], y0 + u[1] + v[1]], D = [x0 + v[0], y0 + v[1]];
      return Q('A quadrilateral has vertices ' + M('A' + P(A[0], A[1]) + ', B' + P(B[0], B[1]) + ', C' + P(Cc[0], Cc[1]) + ', D' + P(D[0], D[1])) + '.', [
        ['Show that it is a square, using gradients and lengths.', 4, 'Adjacent sides have gradients ' + M(F(u[1], u[0])) + ' and ' + M(F(v[1], v[0])) + ' (product −1), and all sides have length ' + M('\\sqrt{' + (u[0] * u[0] + u[1] * u[1]) + '}')],
        ['Find its area.', 1, u[0] * u[0] + u[1] * u[1]],
        ['Find the centre of the square.', 1, M(P(F(A[0] + Cc[0], 2), F(A[1] + Cc[1], 2)))]
      ]);
    }
  ]);

  X('al-circles', [
    function () {
      var a = ri(-4, 4), b = ri(-4, 4), u = pick([[3, 4], [4, 3], [5, 12], [6, 8], [1, 2], [2, 1]]);
      var A = [a - u[0], b - u[1]], B = [a + u[0], b + u[1]], r2 = u[0] * u[0] + u[1] * u[1];
      return Q('The points ' + M('A' + P(A[0], A[1])) + ' and ' + M('B' + P(B[0], B[1])) + ' are the ends of a diameter of a circle.', [
        ['Find the equation of the circle.', 3, M(circ(a, b, r2))],
        ['Show that ' + M(P(a + u[1], b - u[0])) + ' lies on the circle.', 1, 'Distance squared from centre is ' + r2],
        ['Find the angle ' + M('APB') + ' at that point, without calculation. Explain.', 1, '90°: angle in a semicircle']
      ]);
    },
    function () {
      var a = ri(-3, 3), b = ri(-3, 3), u = pick([[3, 4], [4, -3], [-5, 12], [6, 8], [-8, 6], [1, 2]]);
      var px = a + u[0], py = b + u[1], r2 = u[0] * u[0] + u[1] * u[1];
      var m = F(-u[0], u[1]);
      return Q('The point ' + M('P' + P(px, py)) + ' lies on ' + M(circ(a, b, r2)) + '.', [
        ['Find the gradient of the radius to ' + M('P') + '.', 1, M(F(u[1], u[0]))],
        ['Find the equation of the tangent at ' + M('P') + '.', 3, M('y' + S0(-py) + ' = ' + (m === '1' ? '' : m === '-1' ? '-' : m) + xm(px))],
        ['Find where the tangent crosses the ' + M('x') + '-axis.', 2, M(P(F(px * u[0] + py * u[1], u[0]), 0))]
      ]);
    },
    function () {
      var r = pick([5, 10, 13, 25]), u = { 5: [3, 4], 10: [6, 8], 13: [5, 12], 25: [7, 24] }[r], k = pick([u[0], u[1]]);
      var h = Math.sqrt(r * r - k * k);
      return Q('The line ' + M('y = ' + k) + ' meets ' + M('x^2 + y^2 = ' + r * r) + ' at ' + M('A') + ' and ' + M('B') + '.', [
        ['Find ' + M('A') + ' and ' + M('B') + '.', 2, M(P(-h, k)) + ' and ' + M(P(h, k))],
        ['Find the length ' + M('AB') + ' and the angle ' + M('AOB') + '.', 3, 2 * h + '; ' + M(sf3(2 * Math.atan(h / k) * 180 / Math.PI) + '°')],
        ['Find the area of the minor segment cut off by the line.', 3, M(sf3(0.5 * r * r * (2 * Math.atan(h / k) - Math.sin(2 * Math.atan(h / k)))))]
      ]);
    },
    function () {
      var r = ri(2, 6);
      return Q('Find the values of ' + M('k') + ' for which ' + M('y = x + k') + ' meets ' + M('x^2 + y^2 = ' + r * r) + '.', [
        ['Substitute and form a quadratic in ' + M('x') + '.', 2, M('2x^2 + 2kx + k^2 - ' + r * r + ' = 0')],
        ['Find the condition on ' + M('k') + '.', 3, M('8 \\times ' + r * r + ' - 4k^2 \\ge 0') + ', ' + M('-' + rt(2 * r * r) + ' \\le k \\le ' + rt(2 * r * r))],
        ['Check the boundary values geometrically.', 1, 'The distance from the origin to the line is ' + M('\\frac{|k|}{\\sqrt{2}}') + ', which equals ' + r]
      ]);
    },
    function () {
      var a = ri(1, 5), b = ri(1, 5);
      return Q('A circle passes through ' + M('O(0, 0)') + ', ' + M('A' + P(2 * a, 0)) + ' and ' + M('B' + P(0, 2 * b)) + '.', [
        ['Explain why ' + M('AB') + ' is a diameter.', 2, 'Angle ' + M('AOB = 90°') + ', so ' + M('AB') + ' subtends a right angle at the circumference'],
        ['Find the equation of the circle.', 2, M(circ(a, b, a * a + b * b))],
        ['Find the equation of the tangent at ' + M('O') + '.', 2, M(lin(a, b, 0))]
      ]);
    },
    function () {
      var a1 = ri(-3, 3), b1 = ri(-3, 3), r1 = ri(2, 5), t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [0, 7, 7]]), r2 = ri(2, 6);
      var d = t[2];
      var rel = d > r1 + r2 ? 'do not meet' : d === r1 + r2 ? 'touch externally' : d > Math.abs(r1 - r2) ? 'meet at two points' : d === Math.abs(r1 - r2) ? 'touch internally' : 'one is inside the other';
      return Q('Circle ' + M('C_1') + ': ' + M(circ(a1, b1, r1 * r1)) + '. Circle ' + M('C_2') + ': ' + M(circ(a1 + t[0], b1 + t[1], r2 * r2)) + '.', [
        ['Find the distance between the centres.', 2, d],
        ['Decide whether the circles meet.', 2, 'They ' + rel],
        ['Find the greatest distance between a point on ' + M('C_1') + ' and a point on ' + M('C_2') + '.', 2, d + r1 + r2]
      ]);
    },
    function () {
      var p = ri(2, 6), q = ri(1, 8);
      var bs = [(p * p + q * q) / (2 * q)];
      return Q('A circle touches the ' + M('x') + '-axis at ' + M(P(p, 0)) + ' and passes through ' + M(P(0, q)) + '.', [
        ['Explain why the centre is ' + M(P(p, 'r')) + ', where ' + M('r') + ' is the radius.', 1, 'The radius to the point of contact is perpendicular to the axis'],
        ['Find ' + M('r') + '.', 3, M(p + '^2 + (' + q + ' - r)^2 = r^2') + ', ' + M('r = ' + F(p * p + q * q, 2 * q))],
        ['Write down the equation of the circle.', 1, M('(x - ' + p + ')^2 + \\left(y - ' + F(p * p + q * q, 2 * q) + '\\right)^2 = \\left(' + F(p * p + q * q, 2 * q) + '\\right)^2')]
      ]);
    },
    function () {
      var a = ri(-3, 3), b = ri(-3, 3), r = ri(2, 5), dx = ri(4, 8), dy = ri(4, 8);
      var d2 = dx * dx + dy * dy, t2 = d2 - r * r;
      return Q('Tangents are drawn from ' + M('P' + P(a + dx, b + dy)) + ' to ' + M(circ(a, b, r * r)) + ', touching at ' + M('A') + ' and ' + M('B') + '.', [
        ['Find the length of each tangent.', 2, M(rt(t2))],
        ['Find the area of the kite ' + M('CAPB') + ', where ' + M('C') + ' is the centre.', 2, M(sf3(r * Math.sqrt(t2)))],
        ['Find the angle ' + M('APB') + '.', 2, M(sf3(2 * Math.atan(r / Math.sqrt(t2)) * 180 / Math.PI) + '°')]
      ]);
    },
    function () {
      var g0 = nz(-4, 4), f0 = nz(-4, 4), s = g0 * g0 + f0 * f0;
      return Q('The equation ' + M('x^2 + y^2' + S(2 * g0) + 'x' + S(2 * f0) + 'y + k = 0') + ' represents a circle.', [
        ['Find the centre, and the radius in terms of ' + M('k') + '.', 3, M(P(-g0, -f0)) + ', ' + M('r = \\sqrt{' + s + ' - k}')],
        ['Find the range of values of ' + M('k') + '.', 1, M('k < ' + s)],
        ['Find ' + M('k') + ' if the circle passes through the origin, and ' + M('k') + ' if it touches the ' + M('y') + '-axis.', 3, M('k = 0') + '; ' + M('k = ' + f0 * f0)]
      ]);
    },
    function () {
      var a = ri(-4, 4), b = ri(-4, 4), r = pick([5, 10]), u = r === 5 ? [3, 4] : [6, 8], k = ri(2, 3);
      var px = a + k * u[0], py = b + k * u[1], d = k * r;
      return Q('A circle has equation ' + M(circ(a, b, r * r)) + ' and ' + M('P' + P(px, py)) + ' is outside it.', [
        ['Find the shortest and longest distances from ' + M('P') + ' to the circle.', 2, (d - r) + ' and ' + (d + r)],
        ['Find the point on the circle nearest to ' + M('P') + '.', 3, M(P(a + u[0], b + u[1]))],
        ['Explain why the nearest point lies on the line through ' + M('P') + ' and the centre.', 1, 'Any other path is longer, by the triangle inequality']
      ]);
    }
  ]);

  X('al-algebraic', [
    function () {
      var r1 = nz(-3, 3), r2; do { r2 = nz(-3, 3); } while (r2 === r1); var r3 = nz(-4, 4);
      var a = -(r1 + r2 + r3), b = r1 * r2 + r2 * r3 + r1 * r3, c = -r1 * r2 * r3;
      return Q(M('p(x) = 2x^3 + ax^2 + bx' + S0(2 * c)) + '. ' + M(xm(r1)) + ' and ' + M(xm(r2)) + ' are factors.' + (r1 === r2 ? '' : ''), [
        ['Find ' + M('a') + ' and ' + M('b') + '.', 3, r1 === r2 ? 'A repeated factor needs extra information — here ' + M('a = ' + 2 * a + ',\\ b = ' + 2 * b) : M('a = ' + 2 * a + ',\\ b = ' + 2 * b)],
        ['Factorise ' + M('p(x)') + ' fully.', 2, M('2' + xm(r1) + xm(r2) + xm(r3))],
        ['Find the remainder when ' + M('p(x)') + ' is divided by ' + M('(x - 5)') + '.', 1, 2 * (5 - r1) * (5 - r2) * (5 - r3)]
      ]);
    },
    function () {
      var a = nz(-4, 4), b = nz(-4, 4), k = nz(-3, 3), R0 = ri(-5, 5);
      var p = [1, a - k, b - a * k, R0 - b * k];
      return Q('Divide ' + M(poly(p)) + ' by ' + M(xm(k)) + '.', [
        ['Find the quotient and remainder.', 3, 'Quotient ' + M(poly([1, a, b])) + ', remainder ' + R0],
        ['Check the remainder using the remainder theorem.', 1, M('p(' + k + ') = ' + R0)],
        ['Write ' + M('\\frac{' + poly(p) + '}{' + poly([1, -k]) + '}') + ' in the form ' + M('Ax^2 + Bx + C + \\frac{D}{x' + S(-k) + '}') + '.', 1, M(poly([1, a, b]) + (R0 ? ' + \\frac{' + R0 + '}{' + poly([1, -k]) + '}' : ''))]
      ]);
    },
    function () {
      return Q('Proof by exhaustion.', [
        ['By considering ' + M('n = 3k, 3k + 1, 3k + 2') + ', prove that ' + M('n^2') + ' leaves remainder 0 or 1 when divided by 3.', 3, M('9k^2,\\ 9k^2 + 6k + 1,\\ 9k^2 + 12k + 4 = 3(3k^2 + 4k + 1) + 1')],
        ['Hence prove that ' + M('n^2 + 2') + ' is a multiple of 3 exactly when ' + M('n') + ' is not a multiple of 3.', 2, 'If ' + M('n') + ' is not a multiple of 3, ' + M('n^2') + ' leaves 1, so ' + M('n^2 + 2') + ' leaves 0; otherwise it leaves 2'],
        ['By considering even and odd ' + M('n') + ', prove that the sum of two squares never leaves remainder 3 when divided by 4.', 2, M('(2k)^2 = 4k^2') + ', ' + M('(2k + 1)^2 = 4(k^2 + k) + 1') + ': squares leave 0 or 1, so sums leave 0, 1 or 2']
      ]);
    },
    function () {
      return Q('Disproof by counterexample.', [
        ['Disprove: “' + M('2^n + 1') + ' is prime for every positive integer ' + M('n') + '.”', 1, M('n = 3') + ': 9'],
        ['Disprove: “if ' + M('a^2 > b^2') + ' then ' + M('a > b') + '.”', 1, M('a = -3, b = 1')],
        ['Prove that ' + M('2^n + 1') + ' is never prime when ' + M('n') + ' is odd and ' + M('n > 1') + '.', 3, 'It is divisible by 3: ' + M('2 \\equiv -1') + ', so ' + M('2^n + 1 \\equiv 0 \\pmod 3') + '; and it is bigger than 3']
      ]);
    },
    function () {
      var h = nz(-5, 5), k = ri(1, 9);
      return Q('Consider ' + M(poly([1, -2 * h, h * h + k])) + '.', [
        ['Prove that it is positive for all real ' + M('x') + '.', 2, M(xm(h) + '^2 + ' + k + ' \\ge ' + k)],
        ['Prove that ' + M('\\frac{1}{' + poly([1, -2 * h, h * h + k]) + '}') + ' is at most ' + M(F(1, k)) + '.', 2, 'The denominator is at least ' + k],
        ['For what value of ' + M('x') + ' is the maximum reached?', 1, M('x = ' + h)]
      ]);
    },
    function () {
      var a = ri(2, 6), b; do { b = nz(-5, 5); } while (b === a || b === -a);
      return Q('Simplify ' + M('\\frac{x^3 - ' + a * a + 'x}{' + poly([1, b - a, -a * b]) + '}') + '.', [
        ['Factorise the numerator and denominator.', 3, M('\\frac{x(x - ' + a + ')(x + ' + a + ')}{(x - ' + a + ')' + xm(-b) + '}')],
        ['Simplify, stating any excluded values.', 2, M('\\frac{x(x + ' + a + ')}{' + poly([1, b]) + '}') + ', ' + M('x \\ne ' + a + ', ' + (-b))]
      ]);
    },
    function () {
      return Q('Prove that the product of any three consecutive integers is divisible by 6.', [
        ['Explain why one of them is even.', 1, 'Every second integer is even'],
        ['Explain why one of them is a multiple of 3.', 1, 'Every third integer is a multiple of 3'],
        ['Hence prove that ' + M('n^3 + 3n^2 + 2n') + ' is divisible by 6 for all integers ' + M('n') + '.', 2, M('n(n + 1)(n + 2)')],
        ['Is the product of four consecutive integers always divisible by 24? Explain.', 2, 'Yes: it contains a multiple of 4, another even number and a multiple of 3']
      ]);
    },
    function () {
      var a = pick([1, 2, 3]);
      var k = 2 * a * a * a;
      return Q('The equation ' + M('x^3 - ' + 3 * a * a + 'x + k = 0') + ' has a repeated root.', [
        ['Explain why a repeated root is also a stationary point.', 1, 'The curve touches the axis there, so the gradient is zero'],
        ['Find the stationary points of ' + M('y = x^3 - ' + 3 * a * a + 'x') + '.', 2, M(P(-a, k)) + ' and ' + M(P(a, -k))],
        ['Hence find the possible values of ' + M('k') + ' and the repeated root in each case.', 3, M('k = ' + k) + ' (repeated root ' + a + ') or ' + M('k = -' + k) + ' (repeated root ' + (-a) + ')']
      ]);
    },
    function () {
      var r = [nz(-3, 3), nz(-3, 3), nz(-3, 3)];
      var p = [1, -(r[0] + r[1] + r[2]), r[0] * r[1] + r[1] * r[2] + r[0] * r[2], -r[0] * r[1] * r[2]];
      return Q('Solve ' + M(poly(p) + ' = 0') + '.', [
        ['List the possible integer roots and explain why.', 2, 'Factors of ' + Math.abs(p[3]) + ': an integer root must divide the constant term'],
        ['Find one root and factorise fully.', 3, M(xm(r[0]) + xm(r[1]) + xm(r[2]))],
        ['Check: the roots should add to ' + (-p[1]) + '. Explain why.', 1, 'The ' + M('x^2') + ' coefficient is minus the sum of the roots']
      ]);
    },
    function () {
      return Q('Proof by contrapositive.', [
        ['State the contrapositive of “if ' + M('n^2') + ' is even, then ' + M('n') + ' is even”.', 1, 'If ' + M('n') + ' is odd, then ' + M('n^2') + ' is odd'],
        ['Prove the contrapositive.', 2, M('(2k + 1)^2 = 2(2k^2 + 2k) + 1')],
        ['Explain why this proves the original statement.', 1, 'A statement and its contrapositive are logically equivalent'],
        ['Is the converse “if ' + M('n') + ' is even then ' + M('n^2') + ' is even” also true?', 1, 'Yes: ' + M('(2k)^2 = 2(2k^2)')]
      ]);
    }
  ]);

  X('al-binomial', [
    function () {
      var n = ri(4, 9), k = nz(-3, 3);
      return Q('In the expansion of ' + M('(1 + kx)^n') + ', the coefficient of ' + M('x') + ' is ' + n * k + ' and the coefficient of ' + M('x^2') + ' is ' + C(n, 2) * k * k + '.', [
        ['Form two equations in ' + M('n') + ' and ' + M('k') + '.', 2, M('nk = ' + n * k) + ', ' + M('\\frac{n(n - 1)}{2}k^2 = ' + C(n, 2) * k * k)],
        ['Solve them.', 3, M('n = ' + n + ',\\ k = ' + k)],
        ['Find the coefficient of ' + M('x^3') + '.', 1, C(n, 3) * k * k * k]
      ]);
    },
    function () {
      var n = ri(5, 8), a = ri(2, 3), b = pick([1, 2]), r = ri(2, 4);
      var co = C(n, r) * Math.pow(a, n - r) * Math.pow(-1, r);
      return Q('Find the coefficient of ' + M('x^' + r) + ' in ' + M('\\left(' + a + ' - \\frac{x}{' + 3 * b + '}\\right)^' + n) + '.', [
        ['Write the general term.', 2, M('\\binom{' + n + '}{r}' + a + '^{' + n + ' - r}\\left(-\\frac{x}{' + 3 * b + '}\\right)^r')],
        ['Find the coefficient.', 3, M(F(co, Math.pow(3 * b, r)))],
        ['Explain how the sign of each term is decided.', 1, 'By ' + M('(-1)^r') + ': even powers positive, odd negative']
      ]);
    },
    function () {
      var n = pick([8, 10, 12]), d = pick([1, 2]);
      var x = d / 100, ap = 1 - n * 2 * x + C(n, 2) * 4 * x * x;
      return Q('Use the expansion of ' + M('(1 - 2x)^{' + n + '}') + ' to estimate ' + M((1 - 2 * x).toFixed(2) + '^{' + n + '}') + '.', [
        ['Find the first three terms.', 2, M('1 - ' + 2 * n + 'x + ' + 4 * C(n, 2) + 'x^2')],
        ['State the value of ' + M('x') + ' and find the estimate.', 2, M('x = ' + x) + ', estimate ' + ap.toFixed(4)],
        ['Find the percentage error, and explain why it would be larger for ' + M('x = 0.1') + '.', 2, sf3(100 * Math.abs(ap - Math.pow(1 - 2 * x, n)) / Math.pow(1 - 2 * x, n)) + '%; the ignored terms are no longer tiny']
      ]);
    },
    function () {
      var n = ri(4, 8), q = nz(-3, 3);
      var c2 = C(n, 2) + q * n;
      return Q('Find the coefficient of ' + M('x^2') + ' in ' + M('(1 + x)^' + n + '(1' + S(q).replace(/ 1$/, ' ') + 'x)') + '.', [
        ['Expand ' + M('(1 + x)^' + n) + ' up to ' + M('x^2') + '.', 1, M('1 + ' + n + 'x + ' + C(n, 2) + 'x^2')],
        ['Find the coefficient.', 2, c2],
        ['Find the value of ' + M('q') + ' that would make the coefficient of ' + M('x^2') + ' in ' + M('(1 + x)^' + n + '(1 + qx)') + ' zero.', 2, M('q = ' + F(-C(n, 2), n))]
      ]);
    },
    function () {
      var n = pick([6, 9]), a = pick([1, 2]);
      var r = n / 3 * 2, t = C(n, r) * Math.pow(-2 * a, r);
      return Q('Find the term independent of ' + M('x') + ' in ' + M('\\left(x^2 - \\frac{' + 2 * a + '}{x}\\right)^' + n) + '.', [
        ['Write the general term and find the power of ' + M('x') + '.', 2, M('x^{' + 2 * n + ' - 3r}')],
        ['Find the value of ' + M('r') + ' and the term.', 3, M('r = ' + r) + ', term ' + t],
        ['Explain why ' + M('\\left(x^2 - \\frac{' + 2 * a + '}{x}\\right)^' + (n + 1)) + ' has no term independent of ' + M('x') + '.', 1, M(2 * (n + 1) + ' - 3r = 0') + ' has no integer solution']
      ]);
    },
    function () {
      var n = ri(5, 10), r = ri(1, n - 2);
      return Q('Pascal’s identity.', [
        ['Verify that ' + M('\\binom{' + n + '}{' + r + '} + \\binom{' + n + '}{' + (r + 1) + '} = \\binom{' + (n + 1) + '}{' + (r + 1) + '}') + '.', 2, C(n, r) + ' + ' + C(n, r + 1) + ' = ' + C(n + 1, r + 1)],
        ['Explain this using Pascal’s triangle.', 1, 'Each entry is the sum of the two above it'],
        ['Explain it by counting: choose ' + (r + 1) + ' people from ' + (n + 1) + ', considering whether one particular person is chosen.', 2, 'If chosen, pick ' + r + ' more from ' + n + '; if not, pick ' + (r + 1) + ' from ' + n]
      ]);
    },
    function () {
      var r = ri(1, 5), n = 3 * r + 2;
      return Q('In ' + M('(1 + x)^n') + ', the coefficients of ' + M('x^' + r) + ' and ' + M('x^{' + (r + 1) + '}') + ' are in the ratio ' + M('1 : 2') + '.', [
        ['Show that ' + M('\\frac{\\binom{n}{r + 1}}{\\binom{n}{r}} = \\frac{n - r}{r + 1}') + '.', 2, 'Cancel factorials'],
        ['Find ' + M('n') + '.', 2, M('\\frac{n - ' + r + '}{' + (r + 1) + '} = 2') + ', ' + M('n = ' + n)],
        ['Check with the actual coefficients.', 1, C(n, r) + ' and ' + C(n, r + 1)]
      ]);
    },
    function () {
      var b = pick([2, 3]), n = pick([4, 5]);
      var A = 0, B = 0; for (var r = 0; r <= n; r++) { var t = C(n, r) * Math.pow(b, Math.floor(r / 2)); if (r % 2) B += t; else A += t; }
      return Q('Expand ' + M('(1 + \\sqrt{' + b + '})^' + n) + '.', [
        ['Give the answer in the form ' + M('a + b\\sqrt{' + b + '}') + '.', 3, M(A + ' + ' + B + '\\sqrt{' + b + '}')],
        ['Write down ' + M('(1 - \\sqrt{' + b + '})^' + n) + ' and explain.', 1, M(A + ' - ' + B + '\\sqrt{' + b + '}') + ': odd powers change sign'],
        ['Hence show ' + M('(1 + \\sqrt{' + b + '})^' + n + '(1 - \\sqrt{' + b + '})^' + n) + ' is an integer, and find it.', 2, M(A + '^2 - ' + b + ' \\times ' + B + '^2 = ' + (A * A - b * B * B)) + ' = ' + M('(1 - ' + b + ')^' + n)]
      ]);
    },
    function () {
      var n = ri(5, 8), a = pick([2, 3]);
      return Q(M('(1 + ax)^n = 1 + ' + n * a + 'x + ' + C(n, 2) * a * a + 'x^2 + \\cdots') + '.', [
        ['Form two equations.', 2, M('na = ' + n * a) + ', ' + M('\\frac{n(n - 1)}{2}a^2 = ' + C(n, 2) * a * a)],
        ['Divide to eliminate ' + M('n') + ' and find ' + M('a') + ', then ' + M('n') + '.', 3, M('(n - 1)a = ' + (n - 1) * a) + ', so ' + M('a = ' + a + ',\\ n = ' + n)],
        ['Find the coefficient of ' + M('x^3') + '.', 1, C(n, 3) * a * a * a]
      ]);
    },
    function () {
      var n = ri(6, 10);
      return Q('Consider ' + M('(2 + x)^' + n) + '.', [
        ['Find the first three terms.', 2, M(Math.pow(2, n) + ' + ' + n * Math.pow(2, n - 1) + 'x + ' + C(n, 2) * Math.pow(2, n - 2) + 'x^2')],
        ['Use them to estimate ' + M('2.01^' + n) + '.', 2, (Math.pow(2, n) + n * Math.pow(2, n - 1) * 0.01 + C(n, 2) * Math.pow(2, n - 2) * 0.0001).toFixed(4)],
        ['Explain why ' + M('(2 + x)^' + n) + ' can be written as ' + M('2^' + n + '\\left(1 + \\frac{x}{2}\\right)^' + n) + ', and why this helps for approximations.', 2, 'Take out the factor 2; the bracket then starts at 1 and the small term is ' + M('\\frac{x}{2}')]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
