/* Byte Size Classroom — deeper extension questions (set 3, A level Year 1 part c): trigonometry, vectors, differentiation, integration. */
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
  function vij(a, b) { return (a ? c1(a, '\\mathbf{i}') : '') + (b ? (a ? (b < 0 ? ' - ' + c1(-b, '\\mathbf{j}') : ' + ' + c1(b, '\\mathbf{j}')) : c1(b, '\\mathbf{j}')) : (a ? '' : '\\mathbf{0}')); }
  function rt(n) { var o = 1, i = n; for (var k = 2; k * k <= i; k++) while (i % (k * k) === 0) { o *= k; i /= k * k; } return i === 1 ? String(o) : (o === 1 ? '' : o) + '\\sqrt{' + i + '}'; }
  var R = Math.PI / 180, D = 180 / Math.PI;
  function deg(x) { return sf3(x) + '°'; }

  X('al-trig', [
    function () {
      return Q('Solve ' + M('2\\cos^2 x = 1 + \\sin x') + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['Use ' + M('\\cos^2 x = 1 - \\sin^2 x') + ' to form a quadratic in ' + M('\\sin x') + '.', 2, M('2\\sin^2 x + \\sin x - 1 = 0')],
        ['Solve it.', 3, M('\\sin x = \\frac{1}{2}') + ' or ' + M('-1') + ': ' + M('x = 30°, 150°, 270°')],
        ['Explain why it is better to replace ' + M('\\cos^2 x') + ' than ' + M('\\sin x') + '.', 1, 'Replacing ' + M('\\sin x') + ' would need a square root of ' + M('1 - \\cos^2 x') + ', introducing ' + M('\\pm')]
      ]);
    },
    function () {
      var a = pick([10, 20, 30, 40]);
      var sols = []; for (var k = -2; k <= 4; k++) { [30, 150].forEach(function (b) { var x = (b + 360 * k - a) / 2; if (x >= 0 && x <= 360) sols.push(x); }); }
      sols.sort(function (p, q) { return p - q; });
      return Q('Solve ' + M('\\sin(2x + ' + a + '°) = \\frac{1}{2}') + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['Find the range of values of ' + M('2x + ' + a + '°') + '.', 1, M(a + '° \\le 2x + ' + a + '° \\le ' + (720 + a) + '°')],
        ['Find all the solutions.', 4, sols.map(function (v) { return num(v) + '°'; }).join(', ')],
        ['Explain why there are ' + sols.length + ' solutions rather than 2.', 1, 'The doubled angle goes round twice']
      ]);
    },
    function () {
      return Q('Prove the identity ' + M('\\frac{\\sin x}{1 - \\cos x} - \\frac{\\sin x}{1 + \\cos x} \\equiv \\frac{2}{\\tan x}') + '.', [
        ['Combine the fractions.', 2, M('\\frac{2\\sin x\\cos x}{1 - \\cos^2 x}')],
        ['Complete the proof.', 2, M('= \\frac{2\\sin x\\cos x}{\\sin^2 x} = \\frac{2\\cos x}{\\sin x}')],
        ['Hence solve ' + M('\\frac{\\sin x}{1 - \\cos x} - \\frac{\\sin x}{1 + \\cos x} = 2') + ' for ' + M('0° < x < 360°') + '.', 2, M('\\tan x = 1') + ': 45°, 225°']
      ]);
    },
    function () {
      var a = ri(6, 10), b = ri(a + 1, a + 4), A = ri(25, 35);
      var s = b * Math.sin(A * R) / a, B1 = Math.asin(s) * D, B2 = 180 - B1;
      var c1v = a * Math.sin((180 - A - B1) * R) / Math.sin(A * R), c2v = a * Math.sin((180 - A - B2) * R) / Math.sin(A * R);
      return Q('In triangle ' + M('ABC') + ', ' + M('BC = ' + a) + ' cm, ' + M('AC = ' + b) + ' cm and angle ' + M('BAC = ' + A + '°') + '.', [
        ['Show that there are two possible triangles.', 3, 'Angle ' + M('B') + ' = ' + deg(B1) + ' or ' + deg(B2) + ' (both give a positive third angle)'],
        ['Find the difference between the two possible areas.', 3, M(sf3(Math.abs(0.5 * b * c1v - 0.5 * b * c2v) * Math.sin(A * R))) + ' cm²'],
        ['For which lengths of ' + M('BC') + ' would there be exactly one triangle?', 2, M('BC = ' + sf3(b * Math.sin(A * R))) + ' (right angle) or ' + M('BC \\ge ' + b)]
      ]);
    },
    function () {
      var a = ri(2, 5), b = pick([2, 3, 4]), c = ri(-2, 3);
      return Q('Consider ' + M('y = ' + a + '\\sin(' + b + 'x)' + S0(c)) + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['State the maximum and minimum values and the period.', 2, (a + c) + ', ' + (c - a) + ', ' + 360 / b + '°'],
        ['How many solutions does ' + M('y = ' + c) + ' have in this range?', 2, 2 * b + 1],
        ['Find the first positive ' + M('x') + ' at which ' + M('y') + ' is at its maximum.', 1, num(90 / b) + '°']
      ]);
    },
    function () {
      var p = ri(1, 5), q = ri(1, 5);
      var b = Math.atan(q / p) * D;
      return Q('Solve ' + M(c1(p, '\\sin x') + ' = ' + c1(q, '\\cos x')) + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['Write as an equation in ' + M('\\tan x') + ', justifying the division.', 2, M('\\tan x = ' + F(q, p)) + '; ' + M('\\cos x = 0') + ' is not a solution as then ' + M('\\sin x = \\pm 1')],
        ['Solve.', 2, deg(b) + ', ' + deg(b + 180)],
        ['Find the exact value of ' + M('\\sin x') + ' at the smaller solution.', 2, M('\\frac{' + q + '}{\\sqrt{' + (p * p + q * q) + '}}')]
      ]);
    },
    function () {
      var d1 = ri(5, 15), d2 = ri(5, 15), b1 = ri(20, 80), b2 = b1 + ri(70, 140);
      var x = d1 * Math.sin(b1 * R) + d2 * Math.sin(b2 * R), y = d1 * Math.cos(b1 * R) + d2 * Math.cos(b2 * R);
      var ang = 180 - (b2 - b1);
      return Q('A ship sails ' + d1 + ' km on a bearing of ' + b1 + '°, then ' + d2 + ' km on a bearing of ' + b2 + '°.', [
        ['Find the angle between the two legs at the turning point.', 2, ang + '°'],
        ['Find the distance from the start.', 3, M(sf3(Math.hypot(x, y))) + ' km'],
        ['Find the bearing of the finish from the start.', 2, deg(((Math.atan2(x, y) * D) + 360) % 360)]
      ]);
    },
    function () {
      var k = pick([0.2, 0.4, 0.6, 0.8, -0.3, -0.7]), b = Math.acos(k) * D;
      var s1 = 30 + b, s2 = 30 + 360 - b;
      var sols = [s1, s2, s2 - 360].filter(function (v) { return v >= 0 && v <= 360; }).sort(function (p, q) { return p - q; });
      return Q('Solve ' + M('\\cos(x - 30°) = ' + k) + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['State the range for ' + M('x - 30°') + '.', 1, M('-30° \\le x - 30° \\le 330°')],
        ['Find all solutions.', 3, sols.map(deg).join(', ')],
        ['Describe the transformation from ' + M('y = \\cos x') + ' to ' + M('y = \\cos(x - 30°)') + '.', 1, 'Translation 30° to the right']
      ]);
    },
    function () {
      return Q('Identities.', [
        ['Prove that ' + M('(\\sin x + \\cos x)^2 + (\\sin x - \\cos x)^2 \\equiv 2') + '.', 2, 'The cross terms cancel; ' + M('2(\\sin^2 x + \\cos^2 x) = 2')],
        ['Prove that ' + M('\\tan x + \\frac{1}{\\tan x} \\equiv \\frac{1}{\\sin x\\cos x}') + '.', 3, M('\\frac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x}')],
        ['Hence show ' + M('\\tan x + \\frac{1}{\\tan x}') + ' is never between ' + M('-2') + ' and 2.', 2, M('|\\sin x\\cos x| \\le \\frac{1}{2}') + ' (from the first identity, ' + M('(\\sin x - \\cos x)^2 \\ge 0') + ')']
      ]);
    },
    function () {
      var a = ri(3, 8), b = ri(3, 8), c = ri(Math.abs(a - b) + 2, a + b - 2);
      var A = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * D;
      var area = 0.5 * b * c * Math.sin(A * R);
      return Q('A triangle has sides ' + a + ', ' + b + ' and ' + c + ' cm.', [
        ['Find the angle opposite the side of length ' + a + ' cm.', 2, deg(A)],
        ['Find the area.', 2, M(sf3(area)) + ' cm²'],
        ['Find the radius of the circle through the three vertices, using ' + M('\\frac{a}{\\sin A} = 2R') + '.', 2, M(sf3(a / (2 * Math.sin(A * R)))) + ' cm']
      ]);
    }
  ]);

  X('al-vectors', [
    function () {
      var a = [ri(-3, 3), ri(-3, 3)], b = [ri(-3, 5), ri(-3, 5)], c = [ri(-3, 5), ri(-3, 5)];
      var d = [a[0] + c[0] - b[0], a[1] + c[1] - b[1]];
      return Q(M('ABCD') + ' is a parallelogram with ' + M('A' + P(a[0], a[1])) + ', ' + M('B' + P(b[0], b[1])) + ', ' + M('C' + P(c[0], c[1])) + '.', [
        ['Find ' + M('\\vec{AB}') + ' and hence the position of ' + M('D') + '.', 3, M('\\vec{AB} = ' + vij(b[0] - a[0], b[1] - a[1])) + ', ' + M('D' + P(d[0], d[1]))],
        ['Find the lengths of the diagonals.', 2, M(sf3(Math.hypot(c[0] - a[0], c[1] - a[1]))) + ' and ' + M(sf3(Math.hypot(d[0] - b[0], d[1] - b[1])))],
        ['If the diagonals were equal, what shape would it be?', 1, 'A rectangle']
      ]);
    },
    function () {
      var v = pick([[3, 4], [5, 12], [8, 15], [-3, 4], [6, -8], [-5, -12]]), m = Math.hypot(v[0], v[1]);
      return Q('Let ' + M('\\mathbf{v} = ' + vij(v[0], v[1])) + '.', [
        ['Find ' + M('|\\mathbf{v}|') + ' and a unit vector in the direction of ' + M('\\mathbf{v}') + '.', 2, m + '; ' + M('\\frac{1}{' + m + '}(' + vij(v[0], v[1]) + ')')],
        ['Find the angle ' + M('\\mathbf{v}') + ' makes with ' + M('\\mathbf{i}') + '.', 2, deg(Math.atan2(v[1], v[0]) * D)],
        ['Find a vector of magnitude 26 in the opposite direction.', 1, M(F(-26 * v[0], m) + '\\mathbf{i} ' + (v[1] > 0 ? '-' : '+') + ' ' + F(26 * Math.abs(v[1]), m) + '\\mathbf{j}')]
      ]);
    },
    function () {
      var k = ri(2, 4);
      return Q(M('\\vec{OA} = \\mathbf{a}') + ' and ' + M('\\vec{OB} = \\mathbf{b}') + '. ' + M('C') + ' is such that ' + M('\\vec{OC} = ' + k + '\\mathbf{b} - ' + (k - 1) + '\\mathbf{a}').replace(' 1\\mathbf{a}', ' \\mathbf{a}') + '.', [
        ['Find ' + M('\\vec{AB}') + ' and ' + M('\\vec{AC}') + '.', 2, M('\\mathbf{b} - \\mathbf{a}') + ', ' + M(k + '(\\mathbf{b} - \\mathbf{a})')],
        ['Prove that ' + M('A, B, C') + ' are collinear and find ' + M('AB : BC') + '.', 3, M('\\vec{AC} = ' + k + '\\vec{AB}') + '; ' + M('1 : ' + (k - 1))]
      ]);
    },
    function () {
      var x0 = ri(-8, -2), y0 = ri(-6, 6), u = ri(1, 3), w = ri(-2, 2);
      var t = -x0 / u;
      return Q('A boat starts at ' + M(vij(x0, y0)) + ' km and moves with velocity ' + M(vij(u, w)) + ' km/h, relative to a port at the origin.', [
        ['Write its position after ' + M('t') + ' hours.', 1, M('(' + x0 + ' + ' + c1(u, 't') + ')\\mathbf{i} + (' + y0 + (w ? S(w).replace(/ 1$/, ' ') + 't' : '') + ')\\mathbf{j}')],
        ['When is it due north or due south of the port, and how far away is it then?', 3, M('t = ' + sf3(t)) + ' h, ' + sf3(Math.abs(y0 + w * t)) + ' km'],
        ['Find its speed.', 1, M(sf3(Math.hypot(u, w))) + ' km/h']
      ]);
    },
    function () {
      var a, b, c; do { a = [ri(-3, 1), ri(-3, 1)]; b = [ri(2, 6), ri(-3, 3)]; c = [ri(-2, 4), ri(3, 7)]; } while ((b[0] - a[0]) * (c[1] - a[1]) === (b[1] - a[1]) * (c[0] - a[0]));
      var AB = Math.hypot(b[0] - a[0], b[1] - a[1]), AC = Math.hypot(c[0] - a[0], c[1] - a[1]), BC = Math.hypot(c[0] - b[0], c[1] - b[1]);
      var A = Math.acos((AB * AB + AC * AC - BC * BC) / (2 * AB * AC)) * D;
      return Q('Triangle ' + M('ABC') + ' has ' + M('A' + P(a[0], a[1]) + ', B' + P(b[0], b[1]) + ', C' + P(c[0], c[1])) + '.', [
        ['Find ' + M('|\\vec{AB}|, |\\vec{AC}|, |\\vec{BC}|') + '.', 3, [AB, AC, BC].map(sf3).join(', ')],
        ['Find angle ' + M('BAC') + '.', 2, deg(A)],
        ['Find the area.', 1, sf3(0.5 * AB * AC * Math.sin(A * R))]
      ]);
    },
    function () {
      var t = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]);
      return Q('The vector ' + M(t[0] + '\\mathbf{i} + p\\mathbf{j}') + ' has magnitude ' + t[2] + '.', [
        ['Find the possible values of ' + M('p') + '.', 2, M('p = \\pm ' + t[1])],
        ['For the positive value, find the angle with ' + M('\\mathbf{j}') + '.', 2, deg(Math.atan(t[0] / t[1]) * D)],
        ['Find ' + M('q') + ' if ' + M(t[0] + '\\mathbf{i} + ' + t[1] + '\\mathbf{j}') + ' is parallel to ' + M('q\\mathbf{i} + 2\\mathbf{j}') + '.', 2, M('q = ' + F(2 * t[0], t[1]))]
      ]);
    },
    function () {
      var l = nz(-3, 3), m = nz(-3, 3), a = [ri(1, 3), nz(-2, 2)], b = [nz(-2, 2), ri(1, 3)];
      if (a[0] * b[1] === a[1] * b[0]) b[1]++;
      var c = [l * a[0] + m * b[0], l * a[1] + m * b[1]];
      return Q(M('\\mathbf{a} = ' + vij(a[0], a[1])) + ', ' + M('\\mathbf{b} = ' + vij(b[0], b[1])) + ', ' + M('\\mathbf{c} = ' + vij(c[0], c[1])) + '.', [
        ['Find ' + M('\\lambda') + ' and ' + M('\\mu') + ' such that ' + M('\\lambda\\mathbf{a} + \\mu\\mathbf{b} = \\mathbf{c}') + '.', 3, M('\\lambda = ' + l + ',\\ \\mu = ' + m)],
        ['Explain why this is always possible when ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + ' are not parallel.', 1, 'The two equations have a unique solution; non-parallel vectors span the plane']
      ]);
    },
    function () {
      var p = [ri(0, 4), ri(0, 4)], u = [ri(1, 3), ri(-1, 2)], q = [ri(8, 14), ri(-2, 6)], w = [ri(-2, 0), ri(0, 3)];
      var d0 = [q[0] - p[0], q[1] - p[1]], dv = [w[0] - u[0], w[1] - u[1]];
      var tm = -(d0[0] * dv[0] + d0[1] * dv[1]) / (dv[0] * dv[0] + dv[1] * dv[1]);
      if (!(tm > 0)) tm = 0;
      var dm = Math.hypot(d0[0] + tm * dv[0], d0[1] + tm * dv[1]);
      return Q('Ship ' + M('P') + ' is at ' + M(vij(p[0], p[1]) || '\\mathbf{0}') + ' with velocity ' + M(vij(u[0], u[1])) + ' and ship ' + M('Q') + ' is at ' + M(vij(q[0], q[1])) + ' with velocity ' + M(vij(w[0], w[1])) + ' (km, km/h).', [
        ['Find ' + M('\\vec{PQ}') + ' after ' + M('t') + ' hours.', 2, M('(' + d0[0] + (dv[0] ? S(dv[0]).replace(/ 1$/, ' ') + 't' : '') + ')\\mathbf{i} + (' + d0[1] + (dv[1] ? S(dv[1]).replace(/ 1$/, ' ') + 't' : '') + ')\\mathbf{j}')],
        ['Find the time when they are closest, by minimising the square of the distance.', 3, M('t = ' + sf3(tm))],
        ['Find the closest distance.', 1, M(sf3(dm)) + ' km']
      ]);
    },
    function () {
      var A = [ri(-4, 0), ri(-4, 0)], B = [ri(2, 6), ri(-3, 1)], Cc = [ri(-2, 4), ri(3, 7)];
      var G = [(A[0] + B[0] + Cc[0]) / 3, (A[1] + B[1] + Cc[1]) / 3];
      return Q('Triangle ' + M('ABC') + ' has ' + M('A' + P(A[0], A[1]) + ', B' + P(B[0], B[1]) + ', C' + P(Cc[0], Cc[1])) + '. ' + M('M') + ' is the midpoint of ' + M('BC') + '.', [
        ['Find the position vector of the point ' + M('G') + ' that divides ' + M('AM') + ' in the ratio ' + M('2 : 1') + '.', 3, M(P(F(A[0] + B[0] + Cc[0], 3), F(A[1] + B[1] + Cc[1], 3)))],
        ['Show that ' + M('\\vec{OG} = \\frac{1}{3}(\\mathbf{a} + \\mathbf{b} + \\mathbf{c})') + ' in general.', 2, M('\\mathbf{a} + \\frac{2}{3}\\left(\\frac{\\mathbf{b} + \\mathbf{c}}{2} - \\mathbf{a}\\right)')],
        ['Explain why ' + M('G') + ' lies on all three medians.', 1, 'The formula is symmetric in ' + M('\\mathbf{a}, \\mathbf{b}, \\mathbf{c}')]
      ]);
    },
    function () {
      var a = ri(1, 5), b = nz(-5, 5), p = ri(1, 3), q = nz(-3, 3);
      return Q('Find ' + M('k') + ' such that ' + M('(' + vij(a, b) + ') + k(' + vij(p, q) + ')') + ' is parallel to ' + M('\\mathbf{i}') + '.', [
        ['Write the combined vector.', 1, M('(' + a + ' + ' + c1(p, 'k') + ')\\mathbf{i} + (' + b + S(q).replace(/ 1$/, ' ') + 'k)\\mathbf{j}')],
        ['Find ' + M('k') + '.', 2, M('k = ' + F(-b, q))],
        ['Find ' + M('k') + ' so that it is parallel to ' + M('\\mathbf{i} + \\mathbf{j}') + ' instead.', 2, (p === q ? 'Impossible: the coefficients differ by a constant ' + (a - b) : M('k = ' + F(b - a, p - q)))]
      ]);
    }
  ]);

  X('al-differentiation', [
    function () {
      return Q('Differentiate ' + M('f(x) = x^3') + ' from first principles.', [
        ['Expand ' + M('(x + h)^3') + '.', 1, M('x^3 + 3x^2h + 3xh^2 + h^3')],
        ['Write the gradient of the chord from ' + M('x') + ' to ' + M('x + h') + ' and simplify.', 2, M('3x^2 + 3xh + h^2')],
        ['Find the limit as ' + M('h \\to 0') + ', and explain why ' + M('h') + ' cannot simply be set to 0 at the start.', 2, M('3x^2') + '; the chord gradient is ' + M('\\frac{0}{0}') + ' when ' + M('h = 0')]
      ]);
    },
    function () {
      var a = ri(1, 3), b = a + ri(1, 3), k = ri(-5, 5);
      var p = [2, -3 * (a + b), 6 * a * b, k], f = function (x) { return 2 * x * x * x - 3 * (a + b) * x * x + 6 * a * b * x + k; };
      return Q('Find and classify the stationary points of ' + M('y = ' + poly(p)) + '.', [
        ['Find ' + M('\\frac{dy}{dx}') + ' and solve ' + M('\\frac{dy}{dx} = 0') + '.', 3, M('6(x - ' + a + ')(x - ' + b + ')') + ': ' + M('x = ' + a + ', ' + b)],
        ['Find the coordinates and nature of each.', 3, M(P(a, f(a))) + ' maximum, ' + M(P(b, f(b))) + ' minimum'],
        ['For which ' + M('k') + ' would the curve touch the ' + M('x') + '-axis at its minimum?', 1, M('k = ' + (k - f(b)))]
      ]);
    },
    function () {
      var a = ri(1, 3), x0 = ri(1, 3);
      var y0 = a * x0 * x0 * x0, m = 3 * a * x0 * x0, c = y0 - m * x0;
      return Q('Find the tangent to ' + M('y = ' + c1(a, 'x^3')) + ' at ' + M('x = ' + x0) + '.', [
        ['Find its equation.', 2, M('y = ' + m + 'x' + S0(c))],
        ['Find the area of the triangle it forms with the axes.', 2, M(F(c * c, 2 * m))],
        ['Find where the tangent meets the curve again.', 3, M('x = ' + (-2 * x0)) + ' (from ' + M((a === 1 ? '' : a) + '(x - ' + x0 + ')^2(x + ' + 2 * x0 + ') = 0') + ')']
      ]);
    },
    function () {
      var V = pick([250, 500, 1000, 2000]), r = Math.cbrt(V / (2 * Math.PI));
      return Q('A closed cylinder has volume ' + V + ' cm³.', [
        ['Show that the surface area is ' + M('A = 2\\pi r^2 + \\frac{' + 2 * V + '}{r}') + '.', 2, M('h = \\frac{' + V + '}{\\pi r^2}')],
        ['Find the value of ' + M('r') + ' that minimises ' + M('A') + ', and show it is a minimum.', 4, M('r = ' + sf3(r)) + '; ' + M('\\frac{d^2A}{dr^2} = 4\\pi + \\frac{' + 4 * V + '}{r^3} > 0')],
        ['Show that the height then equals the diameter.', 2, M('h = \\frac{' + V + '}{\\pi r^2} = 2r') + ' since ' + M('\\pi r^3 = ' + V / 2)]
      ]);
    },
    function () {
      var a = ri(1, 3), b = a + ri(1, 3), c = ri(-5, 5);
      return Q('Let ' + M('f(x) = ' + poly([2, -3 * (a + b), 6 * a * b, c])) + '.', [
        ['Find the interval on which ' + M('f') + ' is decreasing.', 3, M(a + ' < x < ' + b)],
        ['Explain why ' + M('f(x) = 0') + ' has exactly one root less than ' + a + ' if ' + M('f(' + a + ') < 0') + '.', 2, M('f') + ' is increasing for ' + M('x < ' + a) + ' and tends to ' + M('-\\infty')],
        ['Find the value of ' + M('f(' + a + ') - f(' + b + ')') + '.', 2, (2 * a * a * a - 3 * (a + b) * a * a + 6 * a * b * a) - (2 * b * b * b - 3 * (a + b) * b * b + 6 * a * b * b)]
      ]);
    },
    function () {
      var a = ri(2, 4), x0 = pick([1, 4, 9]);
      var rx = Math.sqrt(x0), d = 1.5 * Math.sqrt(x0) + a - a * a / 2 / Math.pow(x0, 1.5) + 0;
      var dd = 1.5 * rx + a / rx - a * a / (2 * x0 * rx);
      return Q('Let ' + M('y = \\frac{(x + ' + a + ')^2}{\\sqrt{x}}') + '.', [
        ['Write ' + M('y') + ' as a sum of powers of ' + M('x') + '.', 2, M('x^{3/2} + ' + 2 * a + 'x^{1/2} + ' + a * a + 'x^{-1/2}')],
        ['Find ' + M('\\frac{dy}{dx}') + '.', 2, M('\\frac{3}{2}x^{1/2} + ' + c1(a, 'x^{-1/2}') + ' - ' + F(a * a, 2) + 'x^{-3/2}')],
        ['Find the gradient at ' + M('x = ' + x0) + '.', 1, M(sf3(dd))]
      ]);
    },
    function () {
      var c = pick([1, 4, 9, 16]), t = Math.sqrt(c);
      return Q('Tangents from the origin are drawn to ' + M('y = x^2 + ' + c) + '.', [
        ['Write the tangent at ' + M('x = t') + '.', 2, M('y = 2tx - t^2 + ' + c)],
        ['Find the values of ' + M('t') + ' for which it passes through the origin.', 2, M('t = \\pm ' + t)],
        ['Find the equations of the tangents and the angle between them.', 2, M('y = \\pm ' + 2 * t + 'x') + '; ' + deg(180 - 2 * Math.atan(2 * t) * D)]
      ]);
    },
    function () {
      var r = ri(2, 6), k = ri(2, 5);
      return Q('The radius of a circle increases at a constant ' + k + ' cm/s.', [
        ['Find ' + M('\\frac{dA}{dr}') + ' and interpret it.', 2, M('2\\pi r') + ': the circumference — the rate the area grows per unit radius'],
        ['Find the rate at which the area is increasing when ' + M('r = ' + r) + '.', 2, M(2 * r * k + '\\pi') + ' cm²/s'],
        ['Explain why the area grows faster as the circle gets bigger, even though the radius grows steadily.', 1, 'A band of the same width has more area further out']
      ]);
    },
    function () {
      var a = nz(-3, 3), p = nz(-2, 2);
      var b = -3 * a * p / 2, q = a * p * p * p + b * p * p;
      if (b !== Math.round(b)) { p = 2; b = -3 * a; q = 8 * a + 4 * b; }
      return Q('The curve ' + M('y = ax^3 + bx^2') + ' has a stationary point at ' + M(P(p, q)) + '.', [
        ['Form two equations.', 2, M(3 * p * p + 'a + ' + 2 * p + 'b = 0').replace('+ -', '- ') + ' and ' + M(p * p * p + 'a + ' + p * p + 'b = ' + q).replace('+ -', '- ')],
        ['Find ' + M('a') + ' and ' + M('b') + '.', 2, M('a = ' + a + ',\\ b = ' + b)],
        ['Find the other stationary point.', 2, M(P(0, 0))]
      ]);
    },
    function () {
      var a = pick([1, 2, -1, 3]);
      var x2 = -a - 1 / (2 * a);
      return Q('The normal to ' + M('y = x^2') + ' at ' + M(P(a, a * a)) + ' meets the curve again at ' + M('Q') + '.', [
        ['Find the equation of the normal.', 2, M('y - ' + a * a + ' = ' + F(-1, 2 * a) + (a ? '(x' + S(-a) + ')' : 'x'))],
        ['Find ' + M('Q') + '.', 3, M(P(sf3(x2), sf3(x2 * x2)))],
        ['Explain why the normal always meets the parabola twice.', 1, 'It is not vertical, so it crosses the parabola, which opens upward and is unbounded']
      ]);
    }
  ]);

  X('al-integration', [
    function () {
      var k = ri(2, 6);
      return Q('Consider ' + M('y = x^2 - ' + k + 'x') + '.', [
        ['Find the area between the curve and the ' + M('x') + '-axis.', 3, M(F(k * k * k, 6))],
        ['Find ' + M('\\int_0^{' + 2 * k + '} (x^2 - ' + k + 'x)\\, dx') + ' and explain why it is not an area.', 2, M(F(2 * k * k * k, 3)) + ': part of the region is below the axis and counts negatively'],
        ['Find the total area between the curve and the axis for ' + M('0 \\le x \\le ' + 2 * k) + '.', 2, M(F(k * k * k, 6) + ' + ' + F(5 * k * k * k, 6) + ' = ' + F(k * k * k, 1))]
      ]);
    },
    function () {
      var a = nz(-3, 3), b = nz(-4, 4), x0 = ri(1, 3), y0 = ri(-5, 5);
      var c = y0 - (a * x0 * x0 * x0 / 3 * 3 / 3 + b * x0);
      return Q('A curve has ' + M('\\frac{dy}{dx} = ' + c1(3 * a, 'x^2') + S(b)) + ' and passes through ' + M(P(x0, y0)) + '.', [
        ['Find the equation of the curve.', 3, M('y = ' + c1(a, 'x^3') + S(b).replace(/ 1$/, ' ') + 'x' + S0(y0 - a * x0 * x0 * x0 - b * x0))],
        ['Explain why the extra point is needed.', 1, 'Integration gives a family of curves; the point fixes the constant'],
        ['Find the gradient where the curve crosses the ' + M('y') + '-axis.', 1, b]
      ]);
    },
    function () {
      var m = ri(1, 6);
      return Q('Find the area enclosed by ' + M('y = x^2') + ' and ' + M('y = ' + c1(m, 'x')) + '.', [
        ['Find the intersections.', 1, M('x = 0') + ' and ' + M('x = ' + m)],
        ['Find the area.', 3, M(F(m * m * m, 6))],
        ['How does the area change if ' + M('m') + ' is doubled? Explain.', 1, 'It is multiplied by 8: the area is proportional to ' + M('m^3')]
      ]);
    },
    function () {
      var a = ri(2, 3), b = pick([1, 4]);
      var F1 = function (x) { return 0.4 * Math.pow(x, 2.5) + (4 / 3) * a * Math.pow(x, 1.5) + 2 * a * a * Math.sqrt(x); };
      return Q('Find ' + M('\\int_1^{' + (b === 1 ? 4 : 9) + '} \\frac{(x + ' + a + ')^2}{\\sqrt{x}}\\, dx') + '.', [
        ['Write the integrand as powers of ' + M('x') + '.', 2, M('x^{3/2} + ' + 2 * a + 'x^{1/2} + ' + a * a + 'x^{-1/2}')],
        ['Integrate.', 2, M('\\frac{2}{5}x^{5/2} + ' + F(4 * a, 3) + 'x^{3/2} + ' + 2 * a * a + 'x^{1/2}')],
        ['Evaluate exactly.', 2, M(F(Math.round((F1(b === 1 ? 4 : 9) - F1(1)) * 15), 15))]
      ]);
    },
    function () {
      var k = ri(2, 6), A = k * k + k;
      return Q('Given ' + M('\\int_0^k (2x + 1)\\, dx = ' + A) + ', where ' + M('k > 0') + '.', [
        ['Show that ' + M('k^2 + k - ' + A + ' = 0') + '.', 2, M('[x^2 + x]_0^k')],
        ['Find ' + M('k') + ', explaining your choice.', 2, M('k = ' + k) + '; the other root ' + (-k - 1) + ' is negative'],
        ['Check your answer using the area of a trapezium.', 1, M('\\frac{1 + ' + (2 * k + 1) + '}{2} \\times ' + k + ' = ' + A)]
      ]);
    },
    function () {
      var a = ri(1, 4);
      return Q('Consider ' + M('\\int_{-' + a + '}^{' + a + '} x^3\\, dx') + '.', [
        ['Evaluate it.', 1, 0],
        ['Explain the answer using the symmetry of the graph.', 2, M('y = x^3') + ' has rotational symmetry about the origin, so the areas cancel'],
        ['Find the total area enclosed between the curve and the ' + M('x') + '-axis for ' + M('-' + a + ' \\le x \\le ' + a) + '.', 1, M(F(Math.pow(a, 4), 2))]
      ]);
    },
    function () {
      var a = ri(1, 4);
      return Q('The chord from ' + M(P(-a, a * a)) + ' to ' + M(P(2 * a, 4 * a * a)) + ' cuts off a region of ' + M('y = x^2') + '.', [
        ['Find the equation of the chord.', 1, M('y = ' + c1(a, 'x') + ' + ' + 2 * a * a)],
        ['Find the area between the chord and the curve.', 3, M(F(9 * a * a * a, 2))],
        ['Find the area of the triangle with vertices at the ends of the chord and ' + M(P(num(a / 2), num(a * a / 4))) + ', and compare (Archimedes).', 2, M(F(27 * a * a * a, 8)) + '; the segment is ' + M('\\frac{4}{3}') + ' of the triangle']
      ]);
    },
    function () {
      var k = ri(2, 10);
      return Q('Consider ' + M('\\int_1^k \\frac{1}{x^2}\\, dx') + '.', [
        ['Evaluate it in terms of ' + M('k') + ' and for ' + M('k = ' + k) + '.', 2, M('1 - \\frac{1}{k}') + ', ' + M(F(k - 1, k))],
        ['What happens as ' + M('k \\to \\infty') + '? Interpret.', 2, 'It tends to 1: the infinite region has finite area'],
        ['Does ' + M('\\int_0^1 \\frac{1}{x^2}\\, dx') + ' work the same way? Explain.', 1, 'No: ' + M('\\frac{1}{a} - 1 \\to \\infty') + ' as ' + M('a \\to 0')]
      ]);
    },
    function () {
      var p = ri(1, 2), q = p + ri(1, 3);
      var s = function (t) { return t * t * t - 1.5 * (p + q) * t * t + 3 * p * q * t; };
      return Q('A particle has velocity ' + M('v = ' + poly([3, -3 * (p + q), 3 * p * q]).replace(/x/g, 't')) + ' m/s and starts at the origin.', [
        ['Find its displacement after ' + M('t') + ' seconds.', 2, M('s = t^3 - ' + num(1.5 * (p + q)) + 't^2 + ' + 3 * p * q + 't')],
        ['Find the displacement after ' + q + ' seconds.', 1, num(s(q)) + ' m'],
        ['Find the total distance travelled in that time.', 3, num(s(p) + (s(p) - s(q))) + ' m (it changes direction at ' + M('t = ' + p) + ')']
      ]);
    },
    function () {
      var A = ri(2, 9), k = ri(2, 5), c = ri(1, 4);
      return Q('Given ' + M('\\int_0^2 f(x)\\, dx = ' + A) + '.', [
        ['Find ' + M('\\int_0^2 (' + k + 'f(x) + ' + 2 * c + 'x)\\, dx') + '.', 2, k * A + 4 * c],
        ['Find ' + M('\\int_2^0 f(x)\\, dx') + '.', 1, -A],
        ['Find ' + M('\\int_0^2 (f(x) + ' + c + ')\\, dx') + ' and explain geometrically.', 2, (A + 2 * c) + ': adds a rectangle ' + 2 + ' by ' + c]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
