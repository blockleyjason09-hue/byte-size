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
  function cv(a, b) { return '\\begin{pmatrix}' + a + '\\\\' + b + '\\end{pmatrix}'; }
  function ij(a, b) { var s = a ? c1(a, '\\mathbf{i}') : ''; if (b) s += (s ? (b < 0 ? ' - ' + c1(-b, '\\mathbf{j}') : ' + ' + c1(b, '\\mathbf{j}')) : c1(b, '\\mathbf{j}')); return s || '\\mathbf{0}'; }
  function sq(n) { var r = Math.round(Math.sqrt(n)); return r * r === n; }
  function rt(n) { var o = 1, i = n; for (var k = 2; k * k <= i; k++) while (i % (k * k) === 0) { o *= k; i /= k * k; } return i === 1 ? String(o) : (o === 1 ? '' : o) + '\\sqrt{' + i + '}'; }
  var D = Math.PI / 180;
  function norm(a) { a = ((a % 360) + 360) % 360; return a; }
  function list(a) { return a.map(function (v) { return sf3(v) + '°'; }).join(', '); }

  X('al-trig', [
    function () {
      var k = pick([0.5, 0.3, 0.7, -0.4]), a = pick([10, 20, 30, 40]);
      var b = Math.asin(k) / D, base = [b, 180 - b], sols = [];
      for (var n = -2; n <= 3; n++) base.forEach(function (t) { var x = (t + 360 * n - a) / 2; if (x >= 0 && x <= 360 + 1e-9) sols.push(x); });
      sols = sols.filter(function (v, i, A) { return A.findIndex(function (w) { return Math.abs(w - v) < 1e-6; }) === i; }).sort(function (p, q) { return p - q; });
      return Q('Solve ' + M('\\sin(2x + ' + a + '°) = ' + k) + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['State the interval for ' + M('2x + ' + a + '°') + '.', 1, M(a + '° \\le 2x + ' + a + '° \\le ' + (720 + a) + '°')],
        ['Find all solutions.', 4, list(sols)],
        ['Explain why there are ' + sols.length + ' solutions rather than 2.', 1, 'The interval for ' + M('2x + ' + a + '°') + ' covers two full cycles']
      ]);
    },
    function () {
      var k = pick([3, 1]);
      return Q('Prove that ' + M('\\frac{1 - \\cos^2 x}{1 - \\sin^2 x} \\equiv \\tan^2 x') + ', and use it.', [
        ['Prove the identity.', 2, M('\\frac{\\sin^2 x}{\\cos^2 x}')],
        ['Hence solve ' + M('\\frac{1 - \\cos^2 x}{1 - \\sin^2 x} = ' + k) + ' for ' + M('0° \\le x \\le 360°') + '.', 3, k === 3 ? '60°, 120°, 240°, 300°' : '45°, 135°, 225°, 315°'],
        ['For which values of ' + M('x') + ' is the identity not valid?', 1, 'Where ' + M('\\cos x = 0') + ': 90°, 270°']
      ]);
    },
    function () {
      return Q('Solve ' + M('2\\cos^2 x + 3\\sin x - 3 = 0') + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['Use an identity to write it as a quadratic in ' + M('\\sin x') + '.', 2, M('2\\sin^2 x - 3\\sin x + 1 = 0')],
        ['Solve.', 3, '30°, 90°, 150°'],
        ['Explain why there are three solutions and not four.', 1, M('\\sin x = 1') + ' has only one solution in the range']
      ]);
    },
    function () {
      var a = ri(6, 10), b = ri(a + 1, a + 4), A = ri(25, 35);
      var s = b * Math.sin(A * D) / a, B1 = Math.asin(s) / D, B2 = 180 - B1;
      var c1v = a * Math.sin((180 - A - B1) * D) / Math.sin(A * D), c2v = a * Math.sin((180 - A - B2) * D) / Math.sin(A * D);
      return Q('In triangle ' + M('ABC') + ', ' + M('BC = ' + a) + ' cm, ' + M('AC = ' + b) + ' cm and angle ' + M('A = ' + A + '°') + '.', [
        ['Find the two possible values of angle ' + M('B') + '.', 3, M(sf3(B1) + '°') + ' and ' + M(sf3(B2) + '°')],
        ['Find the two possible lengths of ' + M('AB') + '.', 3, M(sf3(c1v)) + ' cm and ' + M(sf3(c2v)) + ' cm'],
        ['Find the condition on ' + M('BC') + ' for there to be two triangles.', 2, M(sf3(b * Math.sin(A * D)) + ' < BC < ' + b)]
      ]);
    },
    function () {
      var a = ri(2, 5), b = ri(-3, 3), c = ri(-6, 6);
      var n = Math.abs(c - b) < a ? 2 : Math.abs(c - b) === a ? 1 : 0;
      return Q('Consider ' + M('y = ' + a + '\\sin x' + S0(b)) + ' for ' + M('0° \\le x < 360°') + '.', [
        ['State the maximum and minimum values.', 1, (a + b) + ' and ' + (b - a)],
        ['How many solutions does ' + M(a + '\\sin x' + S0(b) + ' = ' + c) + ' have?', 2, n],
        ['Find the range of values of ' + M('k') + ' for which ' + M(a + '\\sin x' + S0(b) + ' = k') + ' has exactly two solutions.', 2, M((b - a) + ' < k < ' + (a + b))]
      ]);
    },
    function () {
      return Q('Trigonometric identities.', [
        ['Prove ' + M('(\\sin x + \\cos x)^2 + (\\sin x - \\cos x)^2 \\equiv 2') + '.', 2, 'The cross terms cancel; ' + M('2(\\sin^2 x + \\cos^2 x)')],
        ['Prove ' + M('\\tan x + \\frac{1}{\\tan x} \\equiv \\frac{1}{\\sin x\\cos x}') + '.', 3, 'Common denominator ' + M('\\sin x\\cos x') + '; numerator ' + M('\\sin^2 x + \\cos^2 x')],
        ['Hence solve ' + M('\\tan x + \\frac{1}{\\tan x} = 4') + ' for ' + M('0° < x < 180°') + '.', 3, M('\\tan^2 x - 4\\tan x + 1 = 0') + ', ' + M('\\tan x = 2 \\pm \\sqrt{3}') + ': 15°, 75°']
      ]);
    },
    function () {
      var a = pick([20, 30, 40, 50]);
      return Q('Solve ' + M('\\tan(x - ' + a + '°) = \\sqrt{3}') + ' for ' + M('-180° \\le x \\le 180°') + '.', [
        ['State the interval for ' + M('x - ' + a + '°') + '.', 1, M((-180 - a) + '° \\le x - ' + a + '° \\le ' + (180 - a) + '°')],
        ['Find all solutions.', 3, list([60 + a, -120 + a].filter(function (v) { return v >= -180 && v <= 180; }).sort(function (p, q) { return p - q; }))],
        ['Explain why solutions of a tan equation are 180° apart.', 1, 'The tangent function has period 180°']
      ]);
    },
    function () {
      var b = ri(5, 10), c = ri(5, 10), Ar = ri(10, Math.floor(b * c / 2) - 2);
      var s = 2 * Ar / (b * c), A1 = Math.asin(s) / D, A2 = 180 - A1;
      var a1 = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A1 * D)), a2 = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A2 * D));
      return Q('A triangle has two sides ' + b + ' cm and ' + c + ' cm, and area ' + Ar + ' cm².', [
        ['Find the two possible values of the angle between the given sides.', 3, M(sf3(A1) + '°') + ' and ' + M(sf3(A2) + '°')],
        ['Find the two possible lengths of the third side.', 3, M(sf3(a1)) + ' cm and ' + M(sf3(a2)) + ' cm'],
        ['What is the largest possible area?', 1, num(b * c / 2) + ' cm² (at 90°)']
      ]);
    },
    function () {
      return Q('Solve ' + M('3\\tan x = 2\\cos x') + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['Show that ' + M('2\\sin^2 x + 3\\sin x - 2 = 0') + '.', 3, 'Multiply by ' + M('\\cos x') + ' and use ' + M('\\cos^2 x = 1 - \\sin^2 x')],
        ['Solve, explaining why one factor gives no solutions.', 3, '30°, 150°; ' + M('\\sin x = -2') + ' is impossible'],
        ['Explain why multiplying by ' + M('\\cos x') + ' is safe here.', 1, M('\\cos x = 0') + ' would leave ' + M('\\tan x') + ' without a value, so those values were never solutions']
      ]);
    },
    function () {
      var a = pick([60, 90, 120]);
      var x1 = a / 2, x2 = a / 2 + 180;
      return Q('The graphs ' + M('y = \\cos x') + ' and ' + M('y = \\cos(x - ' + a + '°)') + ' are drawn for ' + M('0° \\le x \\le 360°') + '.', [
        ['Describe the transformation from the first to the second.', 1, 'Translation by ' + a + '° in the positive ' + M('x') + ' direction'],
        ['Find where the graphs cross, explaining your method.', 4, list([x1, x2]) + ': by symmetry, halfway between matching points, and 180° later'],
        ['Find the ' + M('y') + '-coordinates of these points.', 1, sf3(Math.cos(x1 * D)) + ' and ' + sf3(Math.cos(x2 * D))]
      ]);
    }
  ]);

  X('al-vectors', [
    function () {
      var t = pick([[3, 4], [5, 12], [8, 6], [-3, 4], [6, -8], [-5, -12]]), a = t[0], b = t[1], m = Math.sqrt(a * a + b * b), L = m * pick([2, 3]);
      return Q('The vector ' + M('\\mathbf{v} = ' + ij(a, b)) + '.', [
        ['Find ' + M('|\\mathbf{v}|') + ' and the unit vector in the direction of ' + M('\\mathbf{v}') + '.', 2, m + '; ' + M(F(a, m) + '\\mathbf{i}' + (b < 0 ? ' - ' + F(-b, m) : ' + ' + F(b, m)) + '\\mathbf{j}')],
        ['Find the angle ' + M('\\mathbf{v}') + ' makes with ' + M('\\mathbf{i}') + '.', 2, M(sf3(norm(Math.atan2(b, a) / D)) + '°') + ' measured anticlockwise'],
        ['Find a vector of magnitude ' + L + ' in the direction opposite to ' + M('\\mathbf{v}') + '.', 1, M(ij(-L * a / m, -L * b / m))]
      ]);
    },
    function () {
      var A = [nz(-4, 4), nz(-4, 4)], d = [3 * nz(-2, 2), 3 * nz(-2, 2)], m = ri(1, 2);
      var Pp = [A[0] + d[0] * m / 3, A[1] + d[1] * m / 3];
      return Q('Points ' + M('A') + ' and ' + M('B') + ' have position vectors ' + M(ij(A[0], A[1])) + ' and ' + M(ij(A[0] + d[0], A[1] + d[1])) + '.', [
        ['Find ' + M('\\vec{AB}') + ' and ' + M('|\\vec{AB}|') + '.', 2, M(ij(d[0], d[1])) + ', ' + M(rt(d[0] * d[0] + d[1] * d[1]))],
        ['Find the position vector of ' + M('P') + ' on ' + M('AB') + ' with ' + M('AP : PB = ' + m + ' : ' + (3 - m)) + '.', 2, M(ij(Pp[0], Pp[1]))],
        ['Find the position vector of ' + M('Q') + ' with ' + M('\\vec{AQ} = -\\frac{1}{3}\\vec{AB}') + ' and describe where ' + M('Q') + ' lies.', 2, M(ij(A[0] - d[0] / 3, A[1] - d[1] / 3)) + ': on the line ' + M('AB') + ' extended beyond ' + M('A')]
      ]);
    },
    function () {
      var A = [ri(-3, 0), ri(-3, 0)], B = [ri(1, 4), ri(-2, 1)], Cc = [ri(0, 4), ri(2, 5)];
      return Q('Three vertices of a parallelogram are ' + M('A' + P(A[0], A[1])) + ', ' + M('B' + P(B[0], B[1])) + ' and ' + M('C' + P(Cc[0], Cc[1])) + '.', [
        ['If the parallelogram is ' + M('ABCD') + ', find ' + M('D') + ' using ' + M('\\vec{AD} = \\vec{BC}') + '.', 2, M(P(A[0] + Cc[0] - B[0], A[1] + Cc[1] - B[1]))],
        ['Find the other two possible positions for the fourth vertex.', 3, M(P(A[0] + B[0] - Cc[0], A[1] + B[1] - Cc[1])) + ' and ' + M(P(B[0] + Cc[0] - A[0], B[1] + Cc[1] - A[1]))],
        ['Explain why there are three possibilities.', 1, 'Any one of the three given points could be opposite the missing vertex']
      ]);
    },
    function () {
      var f1 = [ri(1, 6), ri(-4, 4)], f2 = [ri(-5, 2), ri(1, 6)];
      var r = [f1[0] + f2[0], f1[1] + f2[1]]; if (!r[0] && !r[1]) { f2[1]++; r[1]++; }
      return Q('Forces ' + M('\\mathbf{F}_1 = (' + ij(f1[0], f1[1]) + ')') + ' N and ' + M('\\mathbf{F}_2 = (' + ij(f2[0], f2[1]) + ')') + ' N act on a particle.', [
        ['Find the resultant and its magnitude.', 2, M(ij(r[0], r[1])) + ' N, ' + M(sf3(Math.hypot(r[0], r[1]))) + ' N'],
        ['Find the third force needed for equilibrium.', 1, M('(' + ij(-r[0], -r[1]) + ')') + ' N'],
        ['Find the angle between the resultant and ' + M('\\mathbf{j}') + '.', 2, M(sf3(Math.acos(r[1] / Math.hypot(r[0], r[1])) / D) + '°')]
      ]);
    },
    function () {
      var a = [ri(1, 5), ri(-3, 3)], b; do { b = [ri(-3, 3), ri(1, 5)]; } while (a[0] * b[1] === a[1] * b[0]);
      var la = Math.hypot(a[0], a[1]), lb = Math.hypot(b[0], b[1]), dx = a[0] - b[0], dy = a[1] - b[1];
      var th = Math.acos(Math.max(-1, Math.min(1, (la * la + lb * lb - dx * dx - dy * dy) / (2 * la * lb)))) / D;
      return Q(M('\\vec{OA} = ' + ij(a[0], a[1])) + ' and ' + M('\\vec{OB} = ' + ij(b[0], b[1])) + '.', [
        ['Find ' + M('|\\vec{OA}|') + ', ' + M('|\\vec{OB}|') + ' and ' + M('|\\vec{AB}|') + '.', 3, M(rt(a[0] * a[0] + a[1] * a[1]) + ', ' + rt(b[0] * b[0] + b[1] * b[1]) + ', ' + rt(dx * dx + dy * dy))],
        ['Use the cosine rule to find angle ' + M('AOB') + '.', 2, M(sf3(th) + '°')],
        ['Find the area of triangle ' + M('OAB') + '.', 2, num(Math.abs(a[0] * b[1] - a[1] * b[0]) / 2)]
      ]);
    },
    function () {
      var a = nz(-3, 3), b = nz(-3, 3), k = ri(2, 4);
      return Q(M('\\vec{OA} = \\mathbf{a}') + ', ' + M('\\vec{OB} = \\mathbf{b}') + ' and ' + M('\\vec{OC} = ' + (1 - k) + '\\mathbf{a} + ' + k + '\\mathbf{b}') + '.', [
        ['Find ' + M('\\vec{AC}') + ' in terms of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '.', 2, M(k + '(\\mathbf{b} - \\mathbf{a})')],
        ['Prove that ' + M('A, B, C') + ' are collinear and find ' + M('AB : BC') + '.', 3, M('\\vec{AC} = ' + k + '\\vec{AB}') + '; ' + M('1 : ' + (k - 1))],
        ['Explain why any point ' + M('(1 - t)\\mathbf{a} + t\\mathbf{b}') + ' lies on the line ' + M('AB') + '.', 1, 'It equals ' + M('\\mathbf{a} + t(\\mathbf{b} - \\mathbf{a})')]
      ]);
    },
    function () {
      var p0 = [ri(-10, -2), ri(-8, 0)], v = [ri(1, 4), ri(1, 4)];
      var tN = -p0[0] / v[0];
      return Q('A boat starts at ' + M(ij(p0[0], p0[1])) + ' km relative to a harbour ' + M('O') + ' and moves with velocity ' + M(ij(v[0], v[1])) + ' km/h.', [
        ['Write its position vector after ' + M('t') + ' hours.', 1, M('(' + p0[0] + ' + ' + c1(v[0], 't') + ')\\mathbf{i} + (' + p0[1] + ' + ' + c1(v[1], 't') + ')\\mathbf{j}').replace(/\(0 \+ /g, '(')],
        ['Find when it is due north of the harbour and how far away it is then.', 3, M('t = ' + sf3(tN)) + ' h, ' + M(sf3(Math.abs(p0[1] + v[1] * tN))) + ' km'],
        ['Find its speed.', 1, M(sf3(Math.hypot(v[0], v[1]))) + ' km/h']
      ]);
    },
    function () {
      var a = [nz(-3, 3), nz(-3, 3)], b = [nz(-3, 3), nz(-3, 3)], c = [nz(-3, 3), nz(-3, 3)];
      var det = b[0] * c[1] - b[1] * c[0];
      if (det === 0) { b = [1, 2]; c = [2, 1]; det = -3; }
      var lam = (a[1] * c[0] - a[0] * c[1]) / det;
      return Q(M('\\mathbf{a} = ' + ij(a[0], a[1])) + ', ' + M('\\mathbf{b} = ' + ij(b[0], b[1])) + ', ' + M('\\mathbf{c} = ' + ij(c[0], c[1])) + '.', [
        ['Find ' + M('\\lambda') + ' such that ' + M('\\mathbf{a} + \\lambda\\mathbf{b}') + ' is parallel to ' + M('\\mathbf{c}') + '.', 4, M('\\lambda = ' + F(a[1] * c[0] - a[0] * c[1], det))],
        ['Explain the condition you used for two vectors to be parallel.', 1, 'One is a scalar multiple of the other, so the ratios of components are equal']
      ]);
    },
    function () {
      var a = ri(3, 9), b = ri(3, 9), th = ri(30, 150);
      return Q('Two vectors have magnitudes ' + a + ' and ' + b + ' and the angle between them is ' + th + '°.', [
        ['Find the magnitude of their sum.', 3, M(sf3(Math.sqrt(a * a + b * b + 2 * a * b * Math.cos(th * D))))],
        ['Find the magnitude of their difference.', 2, M(sf3(Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(th * D))))],
        ['For what angle are the two magnitudes equal? Explain.', 1, '90°: the parallelogram is a rectangle, so its diagonals are equal']
      ]);
    },
    function () {
      var u = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]), m = u[2] * ri(2, 4);
      return Q('A particle moves in the direction of ' + M(ij(u[0], u[1])) + ' with speed ' + m + ' m/s.', [
        ['Find its velocity vector.', 2, M(ij(u[0] * m / u[2], u[1] * m / u[2]))],
        ['Find its displacement after 5 seconds.', 1, M(ij(5 * u[0] * m / u[2], 5 * u[1] * m / u[2]))],
        ['A second particle has velocity ' + M(ij(u[1], -u[0])) + '. Show that the paths are perpendicular.', 2, 'Gradients ' + M(F(u[1], u[0])) + ' and ' + M(F(-u[0], u[1])) + ' multiply to −1']
      ]);
    }
  ]);

  X('al-differentiation', [
    function () {
      return Q('Differentiation from first principles.', [
        ['Show that the gradient of the chord from ' + M('(x, x^3)') + ' to ' + M('(x + h, (x + h)^3)') + ' is ' + M('3x^2 + 3xh + h^2') + '.', 3, 'Expand ' + M('(x + h)^3 - x^3') + ' and divide by ' + M('h')],
        ['Hence find ' + M('\\frac{dy}{dx}') + ' for ' + M('y = x^3') + '.', 1, M('3x^2') + ' as ' + M('h \\to 0')],
        ['Explain why the limit is needed rather than putting ' + M('h = 0') + ' at the start.', 1, 'With ' + M('h = 0') + ' the chord is a single point and the gradient is ' + M('\\frac{0}{0}')]
      ]);
    },
    function () {
      var k = pick([1, 4, 9, 16, 25]), a = Math.sqrt(k);
      return Q('Consider ' + M('y = x + \\frac{' + k + '}{x}') + '.', [
        ['Find ' + M('\\frac{dy}{dx}') + ' and the stationary points.', 3, M('1 - \\frac{' + k + '}{x^2}') + '; ' + M(P(a, 2 * a)) + ' and ' + M(P(-a, -2 * a))],
        ['Use ' + M('\\frac{d^2y}{dx^2}') + ' to classify them.', 2, M('\\frac{' + 2 * k + '}{x^3}') + ': minimum at ' + M('x = ' + a) + ', maximum at ' + M('x = -' + a)],
        ['Explain why the “maximum” is lower than the “minimum”.', 1, 'They are local: the curve has two separate branches']
      ]);
    },
    function () {
      var a = nz(-3, 3);
      var other = -a - 1 / (2 * a);
      return Q('The normal to ' + M('y = x^2') + ' at ' + M(P(a, a * a)) + ' meets the curve again at ' + M('Q') + '.', [
        ['Find the equation of the normal.', 3, M('y - ' + a * a + ' = ' + F(-1, 2 * a) + xm(a))],
        ['Find the ' + M('x') + '-coordinate of ' + M('Q') + '.', 3, M(F(-2 * a * a - 1, 2 * a))],
        ['Explain how you could have found it from the sum of the roots.', 1, 'The roots of ' + M('x^2 + \\frac{x}{' + 2 * a + '} - \\ldots = 0') + ' add to ' + M(F(-1, 2 * a))]
      ]);
    },
    function () {
      var V = pick([250, 500, 1000, 2000]);
      var r = Math.cbrt(V / (2 * Math.PI)), A = 2 * Math.PI * r * r + 2 * V / r;
      return Q('A closed cylinder has volume ' + V + ' cm³.', [
        ['Show that its surface area is ' + M('A = 2\\pi r^2 + \\frac{' + 2 * V + '}{r}') + '.', 2, 'Use ' + M('h = \\frac{' + V + '}{\\pi r^2}')],
        ['Find the value of ' + M('r') + ' that minimises ' + M('A') + ', and the minimum area.', 4, M('r = ' + sf3(r)) + ' cm, ' + M('A = ' + sf3(A)) + ' cm²'],
        ['Show that at the minimum, the height equals the diameter.', 2, M('h = \\frac{' + V + '}{\\pi r^2} = 2r') + ' since ' + M('\\pi r^3 = ' + V / 2)]
      ]);
    },
    function () {
      var a = ri(2, 6), lim = 3 * a * a;
      return Q('Consider ' + M('y = x^3 - ' + 3 * a + 'x^2 + kx') + '.', [
        ['Find the range of ' + M('k') + ' for which ' + M('y') + ' is increasing for all ' + M('x') + '.', 4, M('3x^2 - ' + 6 * a + 'x + k \\ge 0') + ' always: ' + M('k \\ge ' + lim)],
        ['When ' + M('k = ' + lim) + ', show the curve has one stationary point and classify it.', 2, M('x = ' + a) + ': a stationary point of inflection'],
        ['Explain why a cubic with a positive ' + M('x^3') + ' coefficient can never be decreasing for all ' + M('x') + '.', 1, 'Its derivative is a positive quadratic, which is positive for large ' + M('|x|')]
      ]);
    },
    function () {
      var c = pick([1, 4, 9]), a = Math.sqrt(c);
      return Q('Tangents to ' + M('y = x^2 + ' + c) + ' pass through the origin.', [
        ['Write the tangent at ' + M('x = t') + '.', 2, M('y = 2tx - t^2 + ' + c)],
        ['Find the values of ' + M('t') + ' for which it passes through the origin.', 2, M('t = \\pm ' + a)],
        ['State the equations of the tangents.', 1, M('y = \\pm ' + c1(2 * a, 'x'))]
      ]);
    },
    function () {
      var a = ri(2, 9);
      return Q('Let ' + M('f(x) = \\frac{x^2 + ' + a + '}{\\sqrt{x}}') + ', ' + M('x > 0') + '.', [
        ['Write ' + M('f(x)') + ' as a sum of powers of ' + M('x') + '.', 1, M('x^{3/2} + ' + a + 'x^{-1/2}')],
        ['Find ' + M("f'(x)") + '.', 2, M('\\frac{3}{2}x^{1/2} - ' + (a === 2 ? '' : F(a, 2)) + 'x^{-3/2}')],
        ['Find the minimum value of ' + M('f') + '.', 3, M('3x^2 = ' + a) + ', ' + M('x = \\sqrt{' + F(a, 3) + '} = ' + sf3(Math.sqrt(a / 3))) + ', ' + M('f = ' + sf3((4 * a / 3) / Math.pow(a / 3, 0.25)))]
      ]);
    },
    function () {
      var a = ri(1, 3);
      return Q('Consider ' + M('y = x^4 - ' + 2 * a * a + 'x^2') + '.', [
        ['Find the three stationary points.', 3, M(P(0, 0)) + ', ' + M(P(a, -a * a * a * a)) + ', ' + M(P(-a, -a * a * a * a))],
        ['Classify each using the second derivative.', 3, 'Maximum at 0, minima at ' + M('\\pm ' + a)],
        ['Sketch the curve and explain its symmetry.', 1, 'W-shaped; only even powers, so symmetric in the ' + M('y') + '-axis']
      ]);
    },
    function () {
      var a = ri(2, 3), m = 3 * a * a - 3, t = 2 * a * a * a;
      return Q('Find the points on ' + M('y = x^3 - 3x') + ' where the tangent is parallel to ' + M('y = ' + m + 'x + 1') + '.', [
        ['Solve ' + M('3x^2 - 3 = ' + m) + '.', 2, M('x = \\pm ' + a)],
        ['Find the points and the tangent equations.', 3, M(P(a, a * a * a - 3 * a)) + ', ' + M(P(-a, -a * a * a + 3 * a)) + '; ' + M('y = ' + m + 'x - ' + t) + ' and ' + M('y = ' + m + 'x + ' + t)],
        ['Explain why there are always two such points (for gradients above −3).', 1, 'The gradient function is an even quadratic']
      ]);
    },
    function () {
      var x0 = ri(2, 9);
      return Q('A square has side ' + M('x') + ' cm.', [
        ['Find ' + M('\\frac{dA}{dx}') + ' for its area, and interpret it at ' + M('x = ' + x0) + '.', 2, M(2 * x0) + ': the area increases by about ' + 2 * x0 + ' cm² per cm of side'],
        ['Use this to estimate the change in area when the side increases from ' + x0 + ' to ' + (x0 + 0.1) + ' cm, and compare with the true change.', 2, 'Estimate ' + num(0.2 * x0) + ', true ' + num(Math.round(((x0 + 0.1) * (x0 + 0.1) - x0 * x0) * 100) / 100)],
        ['Explain the difference geometrically.', 1, 'The estimate misses the small corner square of area ' + M('0.1^2')]
      ]);
    }
  ]);

  X('al-integration', [
    function () {
      var a = ri(1, 3), b = ri(1, 4);
      var f = function (x) { return x * x * x / 3 - (a - b) * x * x / 2 - a * b * x; };
      var neg = f(0) - f(-b), pos = f(a) - f(0);
      return Q('The curve ' + M('y = x(x + ' + b + ')(x - ' + a + ')') + ' is considered between ' + M('x = -' + b) + ' and ' + M('x = ' + a) + '.', [
        ['Expand and find ' + M('\\int_{-' + b + '}^{' + a + '} y\\,dx') + '.', 3, (function () { var F3 = function (x) { return Math.pow(x, 4) / 4 + (b - a) * x * x * x / 3 - a * b * x * x / 2; }; return sf3(F3(a) - F3(-b)); })()],
        ['Explain why this is not the total area between the curve and the axis.', 1, 'The part below the axis counts negatively'],
        ['Find the total area.', 3, (function () { var F3 = function (x) { return Math.pow(x, 4) / 4 + (b - a) * x * x * x / 3 - a * b * x * x / 2; }; return sf3(Math.abs(F3(0) - F3(-b)) + Math.abs(F3(a) - F3(0))); })()]
      ]);
    },
    function () {
      var k = ri(1, 6);
      return Q('Find the area enclosed by ' + M('y = x^2') + ' and ' + M('y = ' + c1(k, 'x')) + '.', [
        ['Find where they meet.', 1, M('x = 0') + ' and ' + M('x = ' + k)],
        ['Find the area.', 3, M('\\int_0^{' + k + '} (' + c1(k, 'x') + ' - x^2)\\,dx = ' + F(k * k * k, 6))],
        ['Compare the area with the area of the triangle under the line from ' + M('x = 0') + ' to ' + M('x = ' + k) + '.', 2, 'The triangle has area ' + M(F(k * k * k, 2)) + '; the region is ' + M('\\frac{1}{3}') + ' of it']
      ]);
    },
    function () {
      var a = nz(-3, 3), b = ri(-4, 4), x0 = ri(1, 3), y0 = ri(-5, 5);
      var c = y0 - (a * x0 * x0 * x0 + b * x0 * x0);
      return Q('A curve has ' + M('\\frac{dy}{dx} = ' + poly([3 * a, 2 * b, 0])) + ' and passes through ' + M(P(x0, y0)) + '.', [
        ['Find ' + M('y') + ' in terms of ' + M('x') + '.', 3, M('y = ' + poly([a, b, 0, c]))],
        ['Find where the curve crosses the ' + M('y') + '-axis.', 1, M(P(0, c))],
        ['Explain why a point is needed to find the curve.', 1, 'Integration gives a family of curves differing by a constant']
      ]);
    },
    function () {
      var a = ri(2, 9), b = ri(4, 9);
      var val = (2 / 5) * (Math.pow(b, 2.5) - 1) + 2 * a * (Math.sqrt(b) - 1);
      return Q('Find ' + M('\\int_1^{' + b + '} \\frac{x^2 + ' + a + '}{\\sqrt{x}}\\,dx') + '.', [
        ['Write the integrand as powers of ' + M('x') + '.', 1, M('x^{3/2} + ' + a + 'x^{-1/2}')],
        ['Integrate.', 2, M('\\frac{2}{5}x^{5/2} + ' + 2 * a + 'x^{1/2}')],
        ['Evaluate.', 2, sf3(val)]
      ]);
    },
    function () {
      var k = ri(2, 7), A = k * k + k - 2;
      return Q('Given ' + M('\\int_1^k (2x + 1)\\,dx = ' + A) + ', where ' + M('k > 1') + '.', [
        ['Show that ' + M('k^2 + k - ' + (A + 2) + ' = 0') + '.', 2, M('[x^2 + x]_1^k = k^2 + k - 2')],
        ['Find ' + M('k') + '.', 2, M('k = ' + k)],
        ['Explain why the other root is rejected.', 1, 'It is ' + (-k - 1) + ', not greater than 1']
      ]);
    },
    function () {
      var a = ri(2, 6);
      return Q('Find the area enclosed by ' + M('y = x(' + a + ' - x)') + ' and the ' + M('x') + '-axis.', [
        ['Find the area.', 3, M(F(a * a * a, 6))],
        ['Show that for ' + M('y = x(a - x)') + ' in general the area is ' + M('\\frac{a^3}{6}') + '.', 2, M('\\left[\\frac{ax^2}{2} - \\frac{x^3}{3}\\right]_0^a')],
        ['What fraction of the rectangle with base ' + M('a') + ' and height equal to the maximum value is this?', 2, M('\\frac{a^3/6}{a \\times a^2/4} = \\frac{2}{3}')]
      ]);
    },
    function () {
      var a = nz(-4, 4), b = nz(-4, 4), l = ri(0, 2), u = l + ri(1, 3);
      var Fx = function (x) { return x * x * x / 3 + (a + b) * x * x / 2 + a * b * x; };
      return Q('Evaluate ' + M('\\int_{' + l + '}^{' + u + '} ' + xm(-a) + xm(-b) + '\\,dx') + '.', [
        ['Expand the integrand.', 1, M(poly([1, a + b, a * b]))],
        ['Integrate and evaluate.', 3, M(F(Math.round((Fx(u) - Fx(l)) * 6), 6))],
        ['Explain why you cannot integrate a product by integrating each bracket separately.', 1, 'The integral of a product is not the product of the integrals']
      ]);
    },
    function () {
      var a = ri(1, 4);
      return Q('Areas with ' + M('y = x^2') + ' and ' + M('y = \\sqrt{x}') + '.', [
        ['Find ' + M('\\int_0^{' + a + '} x^2\\,dx') + '.', 1, M(F(a * a * a, 3))],
        ['Find the area between ' + M('y = \\sqrt{x}') + ' and the ' + M('y') + '-axis from ' + M('y = 0') + ' to ' + M('y = ' + a) + '.', 2, M(F(a * a * a, 3)) + ' (it is the same region reflected in ' + M('y = x') + ')'],
        ['Find the area enclosed between ' + M('y = x^2') + ' and ' + M('y = \\sqrt{x}') + '.', 3, M('\\int_0^1 (\\sqrt{x} - x^2)\\,dx = \\frac{1}{3}')]
      ]);
    },
    function () {
      var T = ri(4, 8);
      return Q('A particle has velocity ' + M('v = ' + T + 't - t^2') + ' m/s.', [
        ['When is it instantaneously at rest (after ' + M('t = 0') + ')?', 1, M('t = ' + T)],
        ['Find the distance travelled in this time.', 3, M(F(T * T * T, 6)) + ' m'],
        ['Find the maximum speed.', 2, M(F(T * T, 4)) + ' m/s at ' + M('t = ' + F(T, 2))]
      ]);
    },
    function () {
      var k = ri(2, 5);
      return Q('Find the value of ' + M('a > 0') + ' such that ' + M('\\int_0^a (x^2 - ' + k + 'x)\\,dx = 0') + '.', [
        ['Integrate and form an equation.', 2, M('\\frac{a^3}{3} - \\frac{' + k + 'a^2}{2} = 0')],
        ['Solve.', 2, M('a = ' + F(3 * k, 2))],
        ['Interpret the result in terms of areas.', 1, 'The area below the axis (from 0 to ' + k + ') equals the area above it (from ' + k + ' to ' + F(3 * k, 2) + ')']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
