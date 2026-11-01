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
  function ym(v) { return v ? '(y' + S(-v) + ')' : 'y'; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function P(x, y) { return '(' + x + ', ' + y + ')'; }
  function C(n, r) { if (r < 0 || r > n) return 0; var v = 1; for (var i = 1; i <= r; i++) v = v * (n - r + i) / i; return Math.round(v); }
  function rt(n) { var o = 1, i = n; for (var k = 2; k * k <= i; k++) while (i % (k * k) === 0) { o *= k; i /= k * k; } return i === 1 ? String(o) : (o === 1 ? '' : o) + '\\sqrt{' + i + '}'; }
  function line(m, c) { return 'y = ' + c1(m, 'x') + S0(c); }
  function circ(a, b, r2) { return (a ? xm(a) + '^2' : 'x^2') + ' + ' + (b ? ym(b) + '^2' : 'y^2') + ' = ' + r2; }
  function shoe(pts) { var s = 0; for (var i = 0; i < pts.length; i++) { var p = pts[i], q = pts[(i + 1) % pts.length]; s += p[0] * q[1] - q[0] * p[1]; } return Math.abs(s) / 2; }

  X('al-lines', [
    function () {
      var m1 = nz(-3, 3), m2; do { m2 = nz(-3, 3); } while (m2 === m1);
      var x0 = nz(-3, 3), y0 = nz(-3, 3), c1v = y0 - m1 * x0, c2v = y0 - m2 * x0;
      var A = [-c1v / m1, 0], B = [-c2v / m2, 0];
      return Q('The lines ' + M(line(m1, c1v)) + ' and ' + M(line(m2, c2v)) + ' meet at ' + M('P') + '.', [
        ['Find ' + M('P') + '.', 2, M(P(x0, y0))],
        ['Find where each line crosses the ' + M('x') + '-axis.', 2, M(P(sf3(A[0]), 0)) + ' and ' + M(P(sf3(B[0]), 0))],
        ['Find the area of the triangle formed by the two lines and the ' + M('x') + '-axis.', 2, sf3(shoe([[x0, y0], A, B]))]
      ]);
    },
    function () {
      var a = [ri(-3, 1), ri(-3, 1)], u = [ri(1, 4), ri(-2, 2)], v = [-u[1], u[0]];
      var B = [a[0] + u[0], a[1] + u[1]], D = [a[0] + v[0], a[1] + v[1]], Cc = [a[0] + u[0] + v[0], a[1] + u[1] + v[1]];
      return Q('Three vertices of a square ' + M('ABCD') + ' are ' + M('A' + P(a[0], a[1])) + ', ' + M('B' + P(B[0], B[1])) + ' and ' + M('D' + P(D[0], D[1])) + '.', [
        ['Show that ' + M('AB') + ' and ' + M('AD') + ' are perpendicular and equal in length.', 3, 'Both have length ' + M('\\sqrt{' + (u[0] * u[0] + u[1] * u[1]) + '}') + '; gradients multiply to ' + M('-1') + (u[1] === 0 ? ' (one is horizontal, one vertical)' : '')],
        ['Find ' + M('C') + '.', 2, M(P(Cc[0], Cc[1]))],
        ['Find the equation of the diagonal ' + M('BD') + '.', 2, (D[0] === B[0] ? M('x = ' + B[0]) : M('y' + S0(-B[1]) + ' = ' + F(D[1] - B[1], D[0] - B[0]) + '(x' + S0(-B[0]) + ')').replace('= 1(', '= (').replace('= -1(', '= -('))]
      ]);
    },
    function () {
      var a = ri(20, 50), b = ri(3, 8), c = ri(5, 20), d = b + ri(2, 5);
      var n = (a - c) / (d - b);
      return Q('Company A charges £' + a + ' plus £' + b + ' per hour. Company B charges £' + c + ' plus £' + d + ' per hour.', [
        ['Write each cost as a linear function of the number of hours ' + M('h') + '.', 1, M('A = ' + a + ' + ' + b + 'h') + ', ' + M('B = ' + c + ' + ' + d + 'h')],
        ['Find when the costs are equal.', 2, M('h = ' + sf3(n))],
        ['Interpret the gradient and intercept of each line, and advise a customer.', 2, 'Gradient: cost per hour; intercept: fixed charge. B is cheaper for fewer than ' + sf3(n) + ' hours, A for more']
      ]);
    },
    function () {
      var p = ri(1, 4), q = p + ri(1, 3), r = (q - p) * ri(1, 3);
      var k = p * r / (q - p);
      return Q('The lines ' + M('kx + ' + c1(p, 'y') + ' = 1') + ' and ' + M(c1(q, 'x') + ' - (k + ' + r + ')y = 1') + ' are perpendicular.', [
        ['Write down the gradient of each line.', 2, M('-' + (p === 1 ? 'k' : '\\frac{k}{' + p + '}')) + ' and ' + M('\\frac{' + q + '}{k + ' + r + '}')],
        ['Find ' + M('k') + '.', 3, M('k = ' + num(k))],
        ['Find the point where they meet.', 2, (function () { var a1 = k, b1 = p, a2 = q, b2 = -(k + r), det = a1 * b2 - a2 * b1; return M(P(sf3((b2 - b1) / det), sf3((a1 - a2) / det))); })()]
      ]);
    },
    function () {
      var ax = ri(-4, 0), ay = ri(1, 5), bx = ri(2, 6), by = ri(-5, -1);
      var x = (bx * bx + by * by - ax * ax - ay * ay) / (2 * (bx - ax));
      return Q('Points ' + M('A' + P(ax, ay)) + ' and ' + M('B' + P(bx, by)) + ' are given.', [
        ['Find the point on the ' + M('x') + '-axis that is equidistant from ' + M('A') + ' and ' + M('B') + '.', 3, M(P(sf3(x), 0))],
        ['Explain how this point is related to the perpendicular bisector of ' + M('AB') + '.', 1, 'It is where the perpendicular bisector crosses the ' + M('x') + '-axis'],
        ['Find the distance from this point to ' + M('A') + '.', 2, M(sf3(Math.hypot(x - ax, ay)))]
      ]);
    },
    function () {
      var m = pick([1, -1, 2, -2, 3]), x0 = ri(-4, 4), y0 = ri(-4, 4);
      var c = y0 - m * x0 + nz(-6, 6);
      var t = (y0 - m * x0 - c) / (1 + m * m), fx = x0 + m * t, fy = y0 - t;
      return Q('Find the reflection of ' + M('P' + P(x0, y0)) + ' in the line ' + M(line(m, c)) + '.', [
        ['Find the line through ' + M('P') + ' perpendicular to the mirror line.', 2, M('y' + S0(-y0) + ' = ' + (m === 1 ? '-' : m === -1 ? '' : F(-1, m)) + (x0 ? '(x' + S(-x0) + ')' : 'x'))],
        ['Find where it meets the mirror line.', 2, M(P(sf3(fx), sf3(fy)))],
        ['Hence find the image of ' + M('P') + '.', 2, M(P(sf3(2 * fx - x0), sf3(2 * fy - y0)))]
      ]);
    },
    function () {
      var pts = [[ri(-5, -1), ri(-4, 0)], [ri(2, 6), ri(-5, -1)], [ri(3, 7), ri(2, 6)], [ri(-4, 0), ri(3, 7)]];
      return Q('A quadrilateral has vertices ' + pts.map(function (p) { return M(P(p[0], p[1])); }).join(', ') + ' in order.', [
        ['Find its area.', 4, num(shoe(pts))],
        ['Show that it is not a parallelogram.', 2, (function () { var g1 = [pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]], g2 = [pts[2][0] - pts[3][0], pts[2][1] - pts[3][1]]; return g1[0] * g2[1] === g1[1] * g2[0] && (pts[2][0] - pts[1][0]) * (pts[3][1] - pts[0][1]) === (pts[2][1] - pts[1][1]) * (pts[3][0] - pts[0][0]) ? 'It is a parallelogram (both pairs of sides parallel)' : 'At least one pair of opposite sides has different gradients'; })()]
      ]);
    },
    function () {
      var x0 = nz(-3, 3), y0 = nz(-3, 3), m1 = nz(-2, 2), m2 = m1 + nz(-2, 2) || 3;
      var px = x0 + ri(1, 3), py = y0 + nz(-4, 4);
      return Q('Lines ' + M(line(m1, y0 - m1 * x0)) + ' and ' + M(line(m2, y0 - m2 * x0)) + ' meet at ' + M('A') + '.', [
        ['Find ' + M('A') + '.', 2, M(P(x0, y0))],
        ['Find the equation of the line through ' + M('A') + ' and ' + M(P(px, py)) + '.', 2, M('y' + S0(-y0) + ' = ' + F(py - y0, px - x0) + (x0 ? '(x' + S(-x0) + ')' : 'x'))],
        ['Find the acute angle between the first two lines.', 2, M(sf3(Math.abs(Math.atan(m1) - Math.atan(m2)) * 180 / Math.PI > 90 ? 180 - Math.abs(Math.atan(m1) - Math.atan(m2)) * 180 / Math.PI : Math.abs(Math.atan(m1) - Math.atan(m2)) * 180 / Math.PI) + '°')]
      ]);
    },
    function () {
      var a = ri(2, 8), b = ri(2, 8);
      return Q('A line passes through ' + M(P(a, b)) + ' and crosses the positive axes at ' + M('(p, 0)') + ' and ' + M('(0, q)') + '.', [
        ['Show that ' + M('\\frac{' + a + '}{p} + \\frac{' + b + '}{q} = 1') + '.', 2, 'The line is ' + M('\\frac{x}{p} + \\frac{y}{q} = 1')],
        ['If the intercepts are equal, find the equation of the line.', 2, M('x + y = ' + (a + b))],
        ['Find the area of the triangle formed with the axes in that case.', 1, num((a + b) * (a + b) / 2)]
      ]);
    },
    function () {
      var u = ri(1, 4), w = ri(1, 4);
      return Q('The gradient of a line is ' + M('\\tan\\theta') + ', where ' + M('\\theta') + ' is the angle it makes with the positive ' + M('x') + '-axis.', [
        ['Find the angle made by ' + M(c1(u, 'y') + ' = ' + c1(w, 'x') + ' + 1') + '.', 2, M(sf3(Math.atan(w / u) * 180 / Math.PI) + '°')],
        ['Show that perpendicular lines have gradients with product ' + M('-1') + ' by using ' + M('\\tan(\\theta + 90°)') + '.', 3, M('\\tan(\\theta + 90°) = -\\frac{1}{\\tan\\theta}')]
      ]);
    }
  ]);

  X('al-circles', [
    function () {
      var g2 = nz(-4, 4), f2 = nz(-4, 4), L = g2 * g2 + f2 * f2;
      return Q('The equation ' + M('x^2 + y^2' + S(2 * g2) + 'x' + S(2 * f2) + 'y + k = 0') + ' represents a circle.', [
        ['Find the centre, and the radius in terms of ' + M('k') + '.', 3, 'Centre ' + M(P(-g2, -f2)) + ', radius ' + M('\\sqrt{' + L + ' - k}')],
        ['Find the range of values of ' + M('k') + '.', 1, M('k < ' + L)],
        ['Find ' + M('k') + ' if the circle touches the ' + M('x') + '-axis.', 2, M('k = ' + (L - f2 * f2))]
      ]);
    },
    function () {
      var a = [ri(-5, -1), ri(-3, 3)], b = [ri(2, 6), ri(-3, 3)];
      var cx = (a[0] + b[0]) / 2, cy = (a[1] + b[1]) / 2, r2 = ((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1])) / 4;
      return Q(M('A' + P(a[0], a[1])) + ' and ' + M('B' + P(b[0], b[1])) + ' are the ends of a diameter of a circle.', [
        ['Find the equation of the circle.', 3, M(circ(cx, cy, num(r2)))],
        ['Find the ' + M('y') + '-coordinates of the points where the circle crosses the ' + M('y') + '-axis.', 2, (function () { var d = r2 - cx * cx; return d < 0 ? 'It does not cross' : M(sf3(cy) + ' \\pm ' + sf3(Math.sqrt(d))); })()],
        ['Explain why angle ' + M('APB') + ' is a right angle for any other point ' + M('P') + ' on the circle.', 1, 'Angle in a semicircle']
      ]);
    },
    function () {
      var a = ri(-3, 3), b = ri(-3, 3), r = ri(2, 5), d = r + ri(2, 5);
      var px = a + d, py = b;
      return Q('From ' + M('P' + P(px, py)) + ', tangents are drawn to the circle ' + M(circ(a, b, r * r)) + '.', [
        ['Find the length of each tangent.', 2, M('\\sqrt{' + (d * d - r * r) + '}' + (rt(d * d - r * r) !== '\\sqrt{' + (d * d - r * r) + '}' ? ' = ' + rt(d * d - r * r) : ''))],
        ['Find the angle between the two tangents.', 2, M(sf3(2 * Math.asin(r / d) * 180 / Math.PI) + '°')],
        ['Find the area of the kite formed by the centre, the two points of contact and ' + M('P') + '.', 2, M(sf3(r * Math.sqrt(d * d - r * r)))]
      ]);
    },
    function () {
      var c = pick([[2, 1, 1, 5], [4, 2, 2, 10], [1, 8, 5, 13], [3, 6, 3, 15], [1, 2, 1, 5], [2, 4, 2, 10]]);
      return Q('A circle touches both positive axes and passes through ' + M(P(c[0], c[1])) + '.', [
        ['Explain why its equation is ' + M('(x - r)^2 + (y - r)^2 = r^2') + '.', 1, 'Touching both axes, the centre is ' + M('r') + ' from each'],
        ['Find the two possible values of ' + M('r') + '.', 3, M('r^2 - ' + 2 * (c[0] + c[1]) + 'r + ' + (c[0] * c[0] + c[1] * c[1]) + ' = 0') + ', ' + M('r = ' + c[2] + '\\text{ or } ' + c[3])],
        ['Find the distance between the two centres.', 1, M(rt(2 * (c[3] - c[2]) * (c[3] - c[2])))]
      ]);
    },
    function () {
      var r = pick([5, 10, 13]), pts = { 5: [[3, 4], [-4, 3], [4, -3], [-3, -4], [5, 0], [0, 5]], 10: [[6, 8], [-8, 6], [8, -6], [-6, -8]], 13: [[5, 12], [-12, 5], [12, -5], [-5, -12]] }[r];
      var p1 = pick(pts), p2; do { p2 = pick(pts); } while (p2 === p1 || (p1[0] === p2[0]) || (p1[0] + p2[0] === 0 && p1[1] + p2[1] === 0));
      var mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2, chord = Math.hypot(p1[0] - p2[0], p1[1] - p2[1]);
      return Q('The chord ' + M('AB') + ' of ' + M('x^2 + y^2 = ' + r * r) + ' joins ' + M('A' + P(p1[0], p1[1])) + ' and ' + M('B' + P(p2[0], p2[1])) + '.', [
        ['Find the midpoint ' + M('M') + ' of ' + M('AB') + ' and show that ' + M('OM') + ' is perpendicular to ' + M('AB') + '.', 3, M('M' + P(num(mx), num(my))) + '; gradients multiply to ' + M('-1')],
        ['Find the distance from the centre to the chord.', 2, M(sf3(Math.hypot(mx, my)))],
        ['Find the area of triangle ' + M('OAB') + '.', 2, num(Math.abs(p1[0] * p2[1] - p2[0] * p1[1]) / 2) + ' (check: ' + M('\\frac{1}{2} \\times ' + sf3(chord) + ' \\times ' + sf3(Math.hypot(mx, my))) + ')']
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(2, 6);
      return Q('Triangle ' + M('OAB') + ' has ' + M('O(0, 0)') + ', ' + M('A' + P(2 * a, 0)) + ', ' + M('B' + P(0, 2 * b)) + '.', [
        ['Explain why ' + M('AB') + ' is a diameter of the circle through ' + M('O, A, B') + '.', 1, 'Angle ' + M('AOB = 90°') + ', so ' + M('AB') + ' subtends a right angle'],
        ['Find the equation of the circle.', 2, M(circ(a, b, a * a + b * b))],
        ['Find the equation of the tangent at ' + M('O') + '.', 2, M('y = ' + F(-a, b) + 'x').replace('= 1x', '= x').replace('= -1x', '= -x')]
      ]);
    },
    function () {
      var r1 = 5, a = pick([2, 4, 6, 8]);
      var x = (a * a) / (2 * a), y2 = 25 - x * x;
      return Q('Circles ' + M('x^2 + y^2 = 25') + ' and ' + M(circ(a, 0, 25)) + ' intersect.', [
        ['Subtract the equations to find a straight line through both intersection points.', 2, M('x = ' + num(x))],
        ['Find the intersection points.', 2, M(P(num(x), '\\pm ' + rt(y2)))],
        ['Find the length of the common chord.', 1, M('2' + (rt(y2) === '1' ? '' : rt(y2)))]
      ]);
    },
    function () {
      var a = ri(-3, 3), b = ri(-3, 3), v = pick([[3, 4], [4, 3], [-3, 4], [4, -3], [6, 8], [8, -6]]), r2 = v[0] * v[0] + v[1] * v[1];
      var px = a + v[0], py = b + v[1];
      return Q('The point ' + M('P' + P(px, py)) + ' lies on the circle ' + M(circ(a, b, r2)) + '.', [
        ['Find the gradient of the radius to ' + M('P') + ' and hence the gradient of the tangent.', 2, M(F(v[1], v[0])) + ' and ' + M(F(-v[0], v[1]))],
        ['Find the equation of the tangent at ' + M('P') + ' in the form ' + M('ax + by = c') + '.', 2, M(c1(v[0], 'x') + (v[1] < 0 ? ' - ' + c1(-v[1], 'y') : ' + ' + c1(v[1], 'y')) + ' = ' + (v[0] * px + v[1] * py))],
        ['Find where it crosses the ' + M('x') + '-axis.', 1, M(P(F(v[0] * px + v[1] * py, v[0]), 0))]
      ]);
    },
    function () {
      var a = ri(-3, 3), b = ri(-3, 3), r = ri(2, 5);
      var lo = b - a - r * Math.SQRT2, hi = b - a + r * Math.SQRT2;
      return Q('For which values of ' + M('c') + ' does ' + M('y = x + c') + ' meet ' + M(circ(a, b, r * r)) + '?', [
        ['Use the perpendicular distance from the centre to the line.', 3, M('\\frac{|' + a + ' - ' + (b < 0 ? '(' + b + ')' : b) + ' + c|}{\\sqrt{2}} \\le ' + r)],
        ['Solve to find the range of ' + M('c') + '.', 2, M(sf3(lo) + ' \\le c \\le ' + sf3(hi)) + ' (exactly ' + M((b - a) + ' \\pm ' + r + '\\sqrt{2}') + ')'],
        ['Confirm one end point using the discriminant.', 2, 'At the end points the quadratic in ' + M('x') + ' has equal roots']
      ]);
    },
    function () {
      var r = ri(4, 10), t = pick([60, 90, 120]);
      return Q('A chord of a circle of radius ' + r + ' subtends ' + t + '° at the centre.', [
        ['Find the area of the triangle formed by the chord and the centre.', 2, M(sf3(0.5 * r * r * Math.sin(t * Math.PI / 180)))],
        ['Find the length of the chord exactly.', 2, t === 60 ? r : t === 90 ? M(r + '\\sqrt{2}') : M(r + '\\sqrt{3}')],
        ['Find the distance from the centre to the chord exactly.', 1, t === 60 ? M(F(r, 2) + '\\sqrt{3}') : t === 90 ? M(F(r, 2) + '\\sqrt{2}') : M(F(r, 2))]
      ]);
    }
  ]);

  X('al-algebraic', [
    function () {
      var r = [nz(-3, 3), nz(-4, 4), nz(-4, 4)], k = ri(2, 5);
      var p = [1, -(r[0] + r[1] + r[2]), r[0] * r[1] + r[1] * r[2] + r[0] * r[2], -r[0] * r[1] * r[2]];
      var q0 = 1, q1 = p[1] + k, q2 = p[2] + k * q1, rem = p[3] + k * q2;
      return Q('Divide ' + M(poly(p)) + ' by ' + M('(x - ' + k + ')') + '.', [
        ['Find the quotient and remainder.', 3, 'Quotient ' + M(poly([q0, q1, q2])) + ', remainder ' + rem],
        ['Check the remainder using the remainder theorem.', 1, M('p(' + k + ') = ' + rem)],
        ['Factorise the cubic fully.', 2, M(xm(r[0]) + xm(r[1]) + xm(r[2]))]
      ]);
    },
    function () {
      var r1 = nz(-3, 3), r2, s = pick([1, -1, 3, -3]); do { r2 = nz(-3, 3); } while (r2 === r1);
      var p = [2, -(2 * r1 + 2 * r2 + s), 2 * r1 * r2 + s * (r1 + r2), -s * r1 * r2];
      return Q(M('p(x) = 2x^3 + ax^2 + bx' + S(p[3])) + '. ' + M(xm(r1)) + ' and ' + M(xm(r2)) + ' are factors.', [
        ['Find ' + M('a') + ' and ' + M('b') + '.', 3, M('a = ' + p[1] + ',\\ b = ' + p[2])],
        ['Find the third factor.', 2, M('(2x' + S(-s) + ')')],
        ['Solve ' + M('p(x) = 0') + '.', 1, M('x = ' + r1 + ',\\ ' + r2 + ',\\ ' + F(s, 2))]
      ]);
    },
    function () {
      return Q('Proof by deduction.', [
        ['Prove that the sum of the squares of three consecutive integers is always 2 more than a multiple of 3.', 3, M('(n - 1)^2 + n^2 + (n + 1)^2 = 3n^2 + 2')],
        ['Hence prove that it can never be a perfect square.', 2, 'Squares are 0 or 1 more than a multiple of 3 (since ' + M('(3k \\pm 1)^2 = 3(3k^2 \\pm 2k) + 1') + ')']
      ]);
    },
    function () {
      return Q('Proof by exhaustion.', [
        ['Prove that every square number leaves remainder 0 or 1 when divided by 4.', 3, 'Even: ' + M('(2k)^2 = 4k^2') + '; odd: ' + M('(2k + 1)^2 = 4(k^2 + k) + 1')],
        ['Hence prove that no number of the form ' + M('4k + 3') + ' is the sum of two squares.', 2, 'Sums of two squares leave remainder 0, 1 or 2'],
        ['Give an example showing that ' + M('4k + 1') + ' numbers can be.', 1, 'e.g. ' + M('13 = 4 + 9')]
      ]);
    },
    function () {
      return Q('A student claims that ' + M('2^n + 1') + ' is prime for every positive integer ' + M('n') + '.', [
        ['Test ' + M('n = 1, 2') + '.', 1, '3, 5: both prime'],
        ['Disprove the claim.', 1, M('n = 3') + ': 9'],
        ['Prove that if ' + M('n') + ' is odd and ' + M('n > 1') + ', then ' + M('2^n + 1') + ' is divisible by 3.', 3, M('2 \\equiv -1 \\pmod 3') + ', so ' + M('2^n + 1 \\equiv -1 + 1 = 0') + '; or use ' + M('2^n + 1 = (2 + 1)(2^{n - 1} - \\cdots + 1)')]
      ]);
    },
    function () {
      var a = nz(-3, 3), b = nz(-3, 3), c = nz(-3, 3);
      if (b === c) c = c === 3 ? -3 : c + 1;
      if (c === 0) c = 2;
      if (b === c) b = -c;
      return Q('Simplify ' + M('\\frac{' + poly([1, -(a + b + c), a * b + b * c + a * c, -a * b * c]) + '}{' + poly([1, -(b + c), b * c]) + '}') + '.', [
        ['Factorise the denominator.', 1, M(xm(b) + xm(c))],
        ['Use the factor theorem to factorise the numerator.', 3, M(xm(a) + xm(b) + xm(c))],
        ['Simplify the fraction, stating any restrictions on ' + M('x') + '.', 1, M(poly([1, -a])) + ', ' + M('x \\ne ' + b + ',\\ ' + c)]
      ]);
    },
    function () {
      return Q('Consider ' + M('f(n) = n^3 - 6n^2 + 11n - 6') + '.', [
        ['Show that ' + M('f(n) = (n - 1)(n - 2)(n - 3)') + '.', 2, M('f(1) = 0') + ', then divide'],
        ['Hence prove that ' + M('f(n)') + ' is a multiple of 6 for every integer ' + M('n') + '.', 2, 'Product of three consecutive integers contains a multiple of 2 and of 3'],
        ['Is it always a multiple of 24? Prove or disprove.', 1, 'No: ' + M('n = 4') + ' gives 6']
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(2, 6);
      return Q('Prove that ' + M('n^2 + ' + (a + b) + 'n + ' + a * b) + ' is never prime for positive integers ' + M('n') + '.', [
        ['Factorise.', 1, M('(n + ' + a + ')(n + ' + b + ')')],
        ['Complete the proof.', 2, 'Both factors are at least 2 for ' + M('n \\ge 1') + ', so it has a non-trivial factorisation'],
        ['What happens when ' + M('n = 0') + '?', 1, a === 1 ? 'It is ' + b + (b === 2 || b === 3 || b === 5 ? ', which is prime' : ', which is not prime') : 'It is ' + a * b + ', not prime']
      ]);
    },
    function () {
      var p = [2, nz(-5, 5), nz(-5, 5), nz(-5, 5)];
      var rem = p[0] / 8 + p[1] / 4 + p[2] / 2 + p[3];
      return Q('Find the remainder when ' + M(poly(p)) + ' is divided by ' + M('(2x - 1)') + '.', [
        ['Explain which value to substitute.', 1, M('x = \\frac{1}{2}') + ', where ' + M('2x - 1 = 0')],
        ['Find the remainder.', 2, M(F(Math.round(rem * 8), 8))],
        ['Find the value of the constant term that would make ' + M('(2x - 1)') + ' a factor.', 2, M(F(Math.round((rem - p[3]) * -8), 8))]
      ]);
    },
    function () {
      var a = nz(-5, 5), b = ri(1, 9);
      return Q('Prove that ' + M(poly([1, -2 * a, a * a + b])) + ' is positive for every real ' + M('x') + '.', [
        ['Complete the square.', 2, M(xm(a) + '^2 + ' + b)],
        ['Complete the proof.', 1, 'A square is at least 0, so the expression is at least ' + b],
        ['Find the maximum value of ' + M('\\frac{1}{' + poly([1, -2 * a, a * a + b]) + '}') + ', and explain why it has no minimum.', 2, 'Maximum ' + M(F(1, b)) + ' at ' + M('x = ' + a) + ', and no minimum (it tends to 0)']
      ]);
    }
  ]);

  X('al-binomial', [
    function () {
      var n = ri(4, 10), k = pick([2, 3, -2, -3]);
      return Q('In the expansion of ' + M('(1 + kx)^n') + ', the coefficient of ' + M('x') + ' is ' + n * k + ' and the coefficient of ' + M('x^2') + ' is ' + C(n, 2) * k * k + '.', [
        ['Form two equations.', 2, M('nk = ' + n * k) + ', ' + M('\\frac{n(n - 1)}{2}k^2 = ' + C(n, 2) * k * k)],
        ['Solve them.', 3, M('n = ' + n + ',\\ k = ' + k)],
        ['Find the coefficient of ' + M('x^3') + '.', 1, C(n, 3) * k * k * k]
      ]);
    },
    function () {
      var n = ri(5, 9);
      var approx = Math.pow(2, n) - n * Math.pow(2, n - 1) * 0.02 + C(n, 2) * Math.pow(2, n - 2) * 0.0004;
      return Q('Use the expansion of ' + M('(2 - x)^{' + n + '}') + '.', [
        ['Find the first three terms in ascending powers of ' + M('x') + '.', 3, M(Math.pow(2, n) + ' - ' + n * Math.pow(2, n - 1) + 'x + ' + C(n, 2) * Math.pow(2, n - 2) + 'x^2')],
        ['Use them to estimate ' + M('1.98^{' + n + '}') + '.', 2, approx.toFixed(4)],
        ['Explain why the estimate is good, and whether it is an over- or underestimate.', 2, 'The next term has ' + M('x^3 = 0.000008') + ' and is negative, so it is a slight overestimate']
      ]);
    },
    function () {
      var n = pick([3, 6, 9]), a = pick([1, 2, -1, -2]), r = 2 * n / 3;
      return Q('Find the term independent of ' + M('x') + ' in ' + M('\\left(x^2 ' + (a < 0 ? '-' : '+') + ' \\frac{' + Math.abs(a) + '}{x}\\right)^{' + n + '}') + '.', [
        ['Show that the general term involves ' + M('x^{' + 2 * n + ' - 3r}') + '.', 2, M('\\binom{' + n + '}{r}(x^2)^{' + n + ' - r}\\left(\\frac{' + a + '}{x}\\right)^r')],
        ['Find the term independent of ' + M('x') + '.', 2, M('r = ' + r) + ': ' + C(n, r) * Math.pow(a, r)],
        ['Explain why ' + M('\\left(x^2 + \\frac{1}{x}\\right)^{' + (n + 1) + '}') + ' has no such term.', 1, M(2 * (n + 1) + ' - 3r = 0') + ' has no whole-number solution']
      ]);
    },
    function () {
      var n = ri(3, 8);
      return Q('Consider ' + M('(1 + x)^{' + n + '}(1 - x)^{' + n + '}') + '.', [
        ['Write it as a single power.', 1, M('(1 - x^2)^{' + n + '}')],
        ['Find the coefficients of ' + M('x^2') + ', ' + M('x^3') + ' and ' + M('x^4') + '.', 3, (-n) + ', 0, ' + C(n, 2)],
        ['Explain why all odd powers have zero coefficient.', 1, 'Only even powers of ' + M('x') + ' appear in ' + M('(1 - x^2)^{' + n + '}')]
      ]);
    },
    function () {
      var n = ri(4, 6), a = pick([2, 3]), b = pick([-1, 1, 2]);
      var e = function (k) { return C(n, k) * Math.pow(a, k); };
      var c3 = e(3) + 2 * b * e(2) + b * b * e(1);
      return Q('Find the coefficient of ' + M('x^3') + ' in ' + M('(1 + ' + a + 'x)^{' + n + '}(1' + S(b) + 'x)^2').replace(' 1x', ' x') + '.', [
        ['Expand ' + M('(1' + S(b) + 'x)^2').replace(' 1x', ' x') + '.', 1, M('1' + S(2 * b) + 'x + ' + c1(b * b, 'x^2')).replace(' 1x', ' x')],
        ['Find the first four terms of ' + M('(1 + ' + a + 'x)^{' + n + '}') + '.', 2, M('1 + ' + e(1) + 'x + ' + e(2) + 'x^2 + ' + e(3) + 'x^3')],
        ['Hence find the coefficient of ' + M('x^3') + '.', 2, c3]
      ]);
    },
    function () {
      var k = ri(1, 4), n = 3 * k + 2;
      return Q('In ' + M('(1 + x)^n') + ', the coefficients of ' + M('x^2') + ' and ' + M('x^3') + ' are in the ratio ' + M('1 : ' + k) + '.', [
        ['Show that ' + M('\\frac{\\binom{n}{3}}{\\binom{n}{2}} = \\frac{n - 2}{3}') + '.', 2, 'Cancel the factorials'],
        ['Find ' + M('n') + '.', 2, n],
        ['Find the coefficient of ' + M('x^4') + '.', 1, C(n, 4)]
      ]);
    },
    function () {
      var b = pick([2, 3]);
      var e = [1, 4, 6, 4, 1], rat = 1 + 6 * b + b * b, irr = 4 + 4 * b;
      return Q('Use the binomial expansion to find ' + M('(1 + \\sqrt{' + b + '})^4') + ' exactly.', [
        ['Expand.', 3, M(rat + ' + ' + irr + '\\sqrt{' + b + '}')],
        ['Hence find ' + M('(1 - \\sqrt{' + b + '})^4') + ' without further expansion.', 1, M(rat + ' - ' + irr + '\\sqrt{' + b + '}')],
        ['Explain why ' + M('(1 + \\sqrt{' + b + '})^4 + (1 - \\sqrt{' + b + '})^4') + ' is an integer and find it.', 1, 2 * rat]
      ]);
    },
    function () {
      var n = ri(5, 10);
      return Q('Binomial coefficients.', [
        ['By choosing a value of ' + M('x') + ' in ' + M('(1 + x)^{' + n + '}') + ', show that ' + M('\\sum_{r = 0}^{' + n + '}\\binom{' + n + '}{r} = 2^{' + n + '}') + '.', 2, M('x = 1')],
        ['Explain this result by counting subsets of a set of ' + n + ' objects.', 2, 'Each subset size ' + M('r') + ' gives ' + M('\\binom{' + n + '}{r}') + ' subsets; in total each object is in or out: ' + M('2^{' + n + '}')],
        ['Find ' + M('\\sum_{r = 0}^{' + n + '}\\binom{' + n + '}{r}2^r') + '.', 1, M('3^{' + n + '} = ' + Math.pow(3, n))]
      ]);
    },
    function () {
      var a = pick([2, 3]), n = ri(4, 8), A = a * a * C(n, 2);
      return Q('The coefficient of ' + M('x^2') + ' in ' + M('(1 + ' + a + 'x)^n') + ' is ' + A + '.', [
        ['Show that ' + M('n(n - 1) = ' + 2 * A / (a * a)) + '.', 2, M(F(a * a, 2) + 'n(n - 1) = ' + A)],
        ['Find ' + M('n') + ', explaining why there is only one answer.', 2, M('n = ' + n) + '; the other root ' + (1 - n) + ' is negative'],
        ['Find the coefficient of ' + M('x^3') + '.', 1, C(n, 3) * a * a * a]
      ]);
    },
    function () {
      var x = pick([0.01, 0.02, 0.03]);
      var approx = 1 - 10 * x + 45 * x * x, act = Math.pow(1 - x, 10);
      return Q('Estimate ' + M('(' + (1 - x).toFixed(2) + ')^{10}') + '.', [
        ['Write the first three terms of ' + M('(1 - x)^{10}') + '.', 1, M('1 - 10x + 45x^2')],
        ['Use them with a suitable value of ' + M('x') + '.', 2, approx.toFixed(4) + ' (with ' + M('x = ' + x) + ')'],
        ['Find the percentage error compared with the true value.', 2, sf3(100 * (approx - act) / act) + '%']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
