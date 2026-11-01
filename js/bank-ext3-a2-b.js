/* Byte Size Classroom — deeper extension questions (set 3, A level Year 2 part b): radians, reciprocal and inverse trig, compound and double angles, parametric equations. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function S0(v) { return v ? S(v) : ''; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function cf(f, v) { f = String(f); return f === '1' ? v : f === '-1' ? '-' + v : f + v; }
  var D = 180 / Math.PI;

  X('a2-radians', [
    function () {
      var r = ri(4, 12), t = pick([0.6, 0.8, 1.2, 1.5, 2]);
      return Q('A sector has radius ' + r + ' cm and angle ' + t + ' radians.', [
        ['Find its arc length, perimeter and area.', 2, sf3(r * t) + ' cm, ' + sf3(r * t + 2 * r) + ' cm, ' + sf3(r * r * t / 2) + ' cm²'],
        ['Find the area of the segment cut off by the chord.', 2, sf3(r * r / 2 * (t - Math.sin(t))) + ' cm²'],
        ['What percentage of the sector is the segment?', 1, sf3(100 * (t - Math.sin(t)) / t) + '%']
      ]);
    },
    function () {
      return Q('Use small-angle approximations.', [
        ['Show that ' + M('\\frac{1 - \\cos 2\\theta}{\\theta\\sin\\theta} \\approx 2') + ' for small ' + M('\\theta') + '.', 3, M('\\frac{1 - (1 - 2\\theta^2)}{\\theta \\times \\theta}')],
        ['Check with ' + M('\\theta = 0.1') + '.', 1, sf3((1 - Math.cos(0.2)) / (0.1 * Math.sin(0.1)))],
        ['Find an approximation for ' + M('\\frac{\\tan 3\\theta}{\\sin\\theta}') + '.', 1, '3']
      ]);
    },
    function () {
      var P = pick([3, 4, 5]);
      return Q('A sector has radius ' + M('r') + ' and angle ' + M('\\theta') + '. Its perimeter is ' + P + ' times its radius.', [
        ['Find ' + M('\\theta') + '.', 2, (P - 2) + ' radians'],
        ['If the perimeter is fixed at 20 cm, show that the area is ' + M('A = 10r - r^2') + '.', 2, M('\\theta = \\frac{20 - 2r}{r}') + ', ' + M('A = \\frac{1}{2}r^2\\theta')],
        ['Find the maximum area and the angle that gives it.', 2, '25 cm² at ' + M('r = 5') + ', ' + M('\\theta = 2')]
      ]);
    },
    function () {
      return Q('Solve ' + M('\\sin 2x = \\cos x') + ' for ' + M('0 \\le x \\le 2\\pi') + '.', [
        ['Use a double-angle formula and factorise.', 2, M('\\cos x(2\\sin x - 1) = 0')],
        ['Find all solutions exactly.', 3, M('\\frac{\\pi}{6}, \\frac{\\pi}{2}, \\frac{5\\pi}{6}, \\frac{3\\pi}{2}')],
        ['Explain why dividing by ' + M('\\cos x') + ' would be a mistake.', 1, 'It loses the solutions where ' + M('\\cos x = 0')]
      ]);
    },
    function () {
      var r = ri(2, 8);
      return Q('A square of side ' + 2 * r + ' cm has a circle of radius ' + r + ' cm inscribed in it, and quarter circles of radius ' + r + ' cm drawn at each corner.', [
        ['Find the area of the square not covered by the quarter circles, in terms of ' + M('\\pi') + '.', 2, M((4 * r * r) + ' - ' + r * r + '\\pi')],
        ['Find the area inside the inscribed circle but outside all the quarter circles.', 3, M(r * r + '\\pi - 2 \\times ' + r * r + '(\\pi - 2)') + ' = ' + M((4 * r * r) + ' - ' + r * r + '\\pi')],
        ['Comment on the result.', 1, 'The two regions have equal area']
      ]);
    },
    function () {
      var rpm = pick([30, 45, 60, 120]), r = ri(20, 50);
      var w = rpm * 2 * Math.PI / 60;
      return Q('A wheel of radius ' + r + ' cm turns at ' + rpm + ' revolutions per minute.', [
        ['Find its angular speed in radians per second.', 1, M(F(rpm, 30) + '\\pi') + ' = ' + sf3(w)],
        ['Find the speed of a point on the rim.', 2, sf3(w * r / 100) + ' m s⁻¹'],
        ['Find the angle turned through while a point on the rim travels 1 m.', 1, sf3(100 / r) + ' radians']
      ]);
    },
    function () {
      var k = pick(['\\sqrt{3}', '1', '\\frac{1}{\\sqrt{3}}', '-1', '-\\sqrt{3}']);
      var base = { '\\sqrt{3}': ['\\frac{\\pi}{3}', '\\frac{4\\pi}{3}'], '1': ['\\frac{\\pi}{4}', '\\frac{5\\pi}{4}'], '\\frac{1}{\\sqrt{3}}': ['\\frac{\\pi}{6}', '\\frac{7\\pi}{6}'], '-1': ['\\frac{3\\pi}{4}', '\\frac{7\\pi}{4}'], '-\\sqrt{3}': ['\\frac{2\\pi}{3}', '\\frac{5\\pi}{3}'] }[k];
      return Q('Solve ' + M('\\tan x = ' + k) + ' for ' + M('0 \\le x \\le 2\\pi') + '.', [
        ['Find both solutions exactly.', 2, M(base[0] + ',\\ ' + base[1])],
        ['Solve ' + M('\\tan 2x = ' + k) + ' in the same interval.', 3, 'Halve each of ' + M(base[0] + ' + n\\pi') + ': four solutions'],
        ['Explain why the second equation has twice as many solutions.', 1, M('2x') + ' covers ' + M('0') + ' to ' + M('4\\pi')]
      ]);
    },
    function () {
      var t = pick([0.05, 0.1, 0.2, 0.3]);
      return Q('Compare ' + M('\\cos ' + t) + ' with the approximation ' + M('1 - \\frac{\\theta^2}{2}') + '.', [
        ['Find the approximation and the true value.', 2, (1 - t * t / 2).toFixed(6) + ' and ' + Math.cos(t).toFixed(6)],
        ['Find the percentage error.', 1, (function (e) { var p = Math.floor(Math.log10(e)); return M(sf3(e / Math.pow(10, p)) + ' \\times 10^{' + p + '}') + '%'; })(100 * Math.abs(Math.cos(t) - (1 - t * t / 2)) / Math.cos(t))],
        ['Explain why the approximation only works in radians.', 1, 'The derivation uses ' + M('\\frac{\\sin\\theta}{\\theta} \\to 1') + ', true only when ' + M('\\theta') + ' is in radians']
      ]);
    },
    function () {
      var r = ri(3, 8);
      var A = 2 * (r * r * Math.PI / 3 - r * r * Math.sqrt(3) / 4) ;
      return Q('Two circles of radius ' + r + ' cm each pass through the other’s centre.', [
        ['Find the angle at each centre subtended by the common chord.', 2, M('\\frac{2\\pi}{3}')],
        ['Find the exact area of the overlap.', 3, M(F(2 * r * r, 3) + '\\pi - ' + F(r * r, 2) + '\\sqrt{3}') + ' = ' + sf3(2 * r * r * Math.PI / 3 - r * r * Math.sqrt(3) / 2)],
        ['What fraction of one circle is overlapped?', 1, sf3((2 * Math.PI / 3 - Math.sqrt(3) / 2) / Math.PI)]
      ]);
    },
    function () {
      var t = 1.895494267;
      return Q('A chord cuts a circle so that the segment has half the area of the sector.', [
        ['Show that ' + M('\\theta = 2\\sin\\theta') + '.', 2, M('\\frac{1}{2}r^2(\\theta - \\sin\\theta) = \\frac{1}{4}r^2\\theta')],
        ['Use iteration ' + M('\\theta_{n + 1} = 2\\sin\\theta_n') + ' from ' + M('\\theta_0 = 2') + ' to find ' + M('\\theta') + ' to 3 s.f.', 3, sf3(t)],
        ['Explain why ' + M('\\theta = 0') + ' is not a sensible answer.', 1, 'There would be no sector']
      ]);
    }
  ]);

  X('a2-trigfn', [
    function () {
      return Q('Solve ' + M('\\sec^2 x = 3\\tan x - 1') + ' for ' + M('0 \\le x < 2\\pi') + '.', [
        ['Prove ' + M('1 + \\tan^2 x \\equiv \\sec^2 x') + '.', 2, 'Divide ' + M('\\sin^2 x + \\cos^2 x = 1') + ' by ' + M('\\cos^2 x')],
        ['Form and solve a quadratic in ' + M('\\tan x') + '.', 2, M('\\tan^2 x - 3\\tan x + 2 = 0') + ': ' + M('\\tan x = 1, 2')],
        ['Find all solutions.', 2, M('\\frac{\\pi}{4}, \\frac{5\\pi}{4}') + ', ' + sf3(Math.atan(2)) + ', ' + sf3(Math.atan(2) + Math.PI)]
      ]);
    },
    function () {
      return Q('Prove ' + M('\\csc x - \\sin x \\equiv \\cos x\\cot x') + '.', [
        ['Write the left side over a single denominator.', 2, M('\\frac{1 - \\sin^2 x}{\\sin x}')],
        ['Complete the proof.', 2, M('\\frac{\\cos^2 x}{\\sin x} = \\cos x \\times \\frac{\\cos x}{\\sin x}')],
        ['State the values of ' + M('x') + ' for which the identity is not defined.', 1, M('x = n\\pi')]
      ]);
    },
    function () {
      var x = pick(['\\frac{3}{5}', '\\frac{5}{13}', '\\frac{1}{2}']);
      var v = { '\\frac{3}{5}': ['\\frac{4}{5}', '\\frac{3}{4}'], '\\frac{5}{13}': ['\\frac{12}{13}', '\\frac{5}{12}'], '\\frac{1}{2}': ['\\frac{\\sqrt{3}}{2}', '\\frac{1}{\\sqrt{3}}'] }[x];
      return Q('Inverse trigonometric functions.', [
        ['State the domain and range of ' + M('\\arcsin x') + '.', 2, M('-1 \\le x \\le 1') + '; ' + M('-\\frac{\\pi}{2} \\le y \\le \\frac{\\pi}{2}')],
        ['Find ' + M('\\cos(\\arcsin ' + x + ')') + ' and ' + M('\\tan(\\arcsin ' + x + ')') + ' exactly.', 2, M(v[0]) + ', ' + M(v[1])],
        ['Show that ' + M('\\cos(\\arcsin x) = \\sqrt{1 - x^2}') + ', explaining why the positive root is taken.', 2, M('\\arcsin x') + ' is in ' + M('[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]') + ', where cosine is non-negative']
      ]);
    },
    function () {
      return Q('Solve ' + M('2\\cot^2 x + 3\\csc x = 0') + ' for ' + M('0 < x < 2\\pi') + '.', [
        ['Use ' + M('\\cot^2 x = \\csc^2 x - 1') + ' to form a quadratic.', 2, M('2\\csc^2 x + 3\\csc x - 2 = 0')],
        ['Solve and explain why one root is rejected.', 2, M('\\csc x = \\frac{1}{2}') + ' (rejected, as ' + M('|\\csc x| \\ge 1') + ') or ' + M('-2')],
        ['Find all solutions.', 2, M('\\frac{7\\pi}{6}, \\frac{11\\pi}{6}')]
      ]);
    },
    function () {
      var a = pick([1, 2, 3]);
      return Q('Sketch ' + M('y = ' + c1(a, '\\sec x')) + ' for ' + M('0 \\le x \\le 2\\pi') + '.', [
        ['State the asymptotes.', 1, M('x = \\frac{\\pi}{2},\\ \\frac{3\\pi}{2}')],
        ['State the range.', 1, M('y \\le -' + a + '\\text{ or } y \\ge ' + a)],
        ['How many solutions has ' + M(c1(a, '\\sec x') + ' = k') + ' in this interval, for each ' + M('k') + '?', 2, '2 if ' + M('|k| > ' + a) + '; ' + M('k = ' + a) + ': 2 (at 0 and ' + M('2\\pi') + '); ' + M('k = -' + a) + ': 1; none if ' + M('|k| < ' + a)]
      ]);
    },
    function () {
      return Q('Show that ' + M('\\tan(\\arcsin x) = \\frac{x}{\\sqrt{1 - x^2}}') + '.', [
        ['Let ' + M('\\theta = \\arcsin x') + ' and draw a right-angled triangle.', 2, 'Opposite ' + M('x') + ', hypotenuse 1, adjacent ' + M('\\sqrt{1 - x^2}')],
        ['Complete the proof, and state where it holds.', 2, M('-1 < x < 1')],
        ['Find ' + M('\\sec(\\arctan x)') + '.', 1, M('\\sqrt{1 + x^2}')]
      ]);
    },
    function () {
      return Q('Prove ' + M('\\frac{1 + \\cos x}{\\sin x} + \\frac{\\sin x}{1 + \\cos x} \\equiv 2\\csc x') + '.', [
        ['Combine the fractions.', 2, M('\\frac{(1 + \\cos x)^2 + \\sin^2 x}{\\sin x(1 + \\cos x)}')],
        ['Simplify the numerator and complete the proof.', 2, M('2 + 2\\cos x = 2(1 + \\cos x)')],
        ['Hence solve the equation “left side = 4” for ' + M('0 < x < 2\\pi') + '.', 2, M('\\sin x = \\frac{1}{2}') + ': ' + M('\\frac{\\pi}{6}, \\frac{5\\pi}{6}')]
      ]);
    },
    function () {
      var k = pick([2, 3, 4]);
      return Q('Solve ' + M('\\sec x = ' + k) + ' for ' + M('0 \\le x \\le 2\\pi') + '.', [
        ['Write as an equation in ' + M('\\cos x') + ' and solve.', 2, M('\\cos x = \\frac{1}{' + k + '}') + ': ' + sf3(Math.acos(1 / k)) + ', ' + sf3(2 * Math.PI - Math.acos(1 / k))],
        ['Explain why ' + M('\\sec x = \\frac{1}{' + k + '}') + ' has no solutions.', 1, M('|\\sec x| \\ge 1')],
        ['Find ' + M('\\tan x') + ' exactly at the smaller solution.', 2, M('\\sqrt{' + (k * k - 1) + '}')]
      ]);
    },
    function () {
      return Q('Show that ' + M('\\arctan x + \\arctan\\frac{1}{x} = \\frac{\\pi}{2}') + ' for ' + M('x > 0') + '.', [
        ['Use a right-angled triangle with shorter sides ' + M('x') + ' and 1.', 2, 'The two acute angles are ' + M('\\arctan x') + ' and ' + M('\\arctan\\frac{1}{x}')],
        ['What is the value for ' + M('x < 0') + '?', 2, M('-\\frac{\\pi}{2}') + ' (both angles are negative)'],
        ['Check with ' + M('x = 1') + '.', 1, M('\\frac{\\pi}{4} + \\frac{\\pi}{4}')]
      ]);
    },
    function () {
      var k = pick([3, 4]);
      return Q('Solve ' + M('\\cot x = ' + k + '\\tan x') + ' for ' + M('0 < x < \\pi') + '.', [
        ['Show that ' + M('\\tan^2 x = \\frac{1}{' + k + '}') + '.', 1, 'Multiply by ' + M('\\tan x')],
        ['Find the solutions.', 3, (k === 3 ? M('\\frac{\\pi}{6}, \\frac{5\\pi}{6}') : M('\\arctan\\frac{1}{2} = ' + sf3(Math.atan(0.5)) + ',\\ ' + sf3(Math.PI - Math.atan(0.5))))],
        ['Explain why ' + M('x = \\frac{\\pi}{2}') + ' must be checked separately.', 1, M('\\tan x') + ' has no value there; ' + M('\\cot\\frac{\\pi}{2} = 0') + ', so it is not a solution']
      ]);
    }
  ]);

  X('a2-trigadd', [
    function () {
      return Q('Exact values from compound angles.', [
        ['Find ' + M('\\sin 75°') + ' exactly.', 2, M('\\frac{\\sqrt{6} + \\sqrt{2}}{4}')],
        ['Show that ' + M('\\tan 15° = 2 - \\sqrt{3}') + '.', 3, M('\\frac{1 - \\frac{1}{\\sqrt{3}}}{1 + \\frac{1}{\\sqrt{3}}}') + ', then rationalise'],
        ['Hence find ' + M('\\tan 75°') + '.', 1, M('2 + \\sqrt{3}')]
      ]);
    },
    function () {
      var t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [1, 1, null]]);
      var a = t[0], b = t[1], R = t[2] || Math.SQRT2, al = Math.atan(b / a) * D;
      return Q('Write ' + M(c1(a, '\\cos x') + ' + ' + c1(b, '\\sin x')) + ' in the form ' + M('R\\cos(x - \\alpha)') + '.', [
        ['Find ' + M('R') + ' and ' + M('\\alpha') + '.', 3, M('R = ' + (t[2] || '\\sqrt{2}')) + ', ' + M('\\alpha = ' + sf3(al) + '°')],
        ['State the maximum value and the smallest positive ' + M('x') + ' at which it occurs.', 2, (t[2] || '√2') + ' at ' + sf3(al) + '°'],
        ['Find the range of ' + M('\\frac{1}{' + c1(a, '\\cos x') + ' + ' + c1(b, '\\sin x') + ' + ' + (Math.ceil(R) + 1) + '}') + '.', 2, M('\\frac{1}{' + sf3(Math.ceil(R) + 1 + R) + '} \\le y \\le \\frac{1}{' + sf3(Math.ceil(R) + 1 - R) + '}')]
      ]);
    },
    function () {
      return Q('Prove ' + M('\\sin 3x \\equiv 3\\sin x - 4\\sin^3 x') + '.', [
        ['Write ' + M('\\sin 3x = \\sin(2x + x)') + ' and expand.', 2, M('\\sin 2x\\cos x + \\cos 2x\\sin x')],
        ['Complete the proof.', 3, M('2\\sin x\\cos^2 x + (1 - 2\\sin^2 x)\\sin x') + ', then use ' + M('\\cos^2 x = 1 - \\sin^2 x')],
        ['Hence solve ' + M('\\sin 3x = 2\\sin x') + ' for ' + M('0 \\le x < 2\\pi') + '.', 2, M('\\sin x(1 - 4\\sin^2 x) = 0') + ': ' + M('0, \\pi, \\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{7\\pi}{6}, \\frac{11\\pi}{6}')]
      ]);
    },
    function () {
      return Q('Solve ' + M('\\cos 2x = \\sin x') + ' for ' + M('0 \\le x < 360°') + '.', [
        ['Write in terms of ' + M('\\sin x') + ' only.', 2, M('2\\sin^2 x + \\sin x - 1 = 0')],
        ['Solve.', 3, '30°, 150°, 270°'],
        ['Which version of the ' + M('\\cos 2x') + ' formula did you use and why?', 1, M('1 - 2\\sin^2 x') + ', to match ' + M('\\sin x') + ' on the right']
      ]);
    },
    function () {
      var a = ri(1, 4), b; do { b = ri(1, 5); } while (b === a);
      return Q(M('\\tan A = ' + a) + ' and ' + M('\\tan B = ' + F(1, b)) + '.', [
        ['Find ' + M('\\tan(A + B)') + ' exactly.', 2, M(F((a * b + 1), (b - a)))],
        ['Find ' + M('\\tan(A - B)') + '.', 2, M(F(a * b - 1, b + a))],
        ['For which values of ' + M('a, b') + ' would ' + M('A + B = 90°') + '?', 1, 'When ' + M('a = b') + ' (the denominator ' + M('1 - \\frac{a}{b}') + ' is zero)']
      ]);
    },
    function () {
      return Q('Prove ' + M('\\frac{\\sin 2x}{1 + \\cos 2x} \\equiv \\tan x') + '.', [
        ['Use double-angle formulae.', 3, M('\\frac{2\\sin x\\cos x}{2\\cos^2 x}')],
        ['Hence find the exact value of ' + M('\\tan 22.5°') + '.', 2, M('\\frac{\\sin 45°}{1 + \\cos 45°} = \\sqrt{2} - 1')],
        ['State the values for which the identity is not valid.', 1, M('\\cos x = 0')]
      ]);
    },
    function () {
      var a = pick([3, 5, 8]), b = { 3: 4, 5: 12, 8: 15 }[a], R = Math.hypot(a, b), c = Math.ceil(R) + ri(1, 5);
      return Q('Find the maximum and minimum of ' + M('\\frac{1}{' + a + '\\sin x + ' + b + '\\cos x + ' + c + '}') + '.', [
        ['Write the denominator as ' + M('R\\sin(x + \\alpha) + ' + c) + '.', 2, M('R = ' + R)],
        ['Find the maximum and minimum values.', 2, M(F(1, c - R)) + ' and ' + M(F(1, c + R))],
        ['Explain why the constant ' + c + ' must exceed ' + R + ' for the function to be defined for all ' + M('x') + '.', 1, 'Otherwise the denominator can be zero']
      ]);
    },
    function () {
      return Q('Express ' + M('\\cos 4x') + ' in terms of ' + M('\\cos x') + '.', [
        ['Write ' + M('\\cos 4x = 2\\cos^2 2x - 1') + ' and substitute.', 3, M('8\\cos^4 x - 8\\cos^2 x + 1')],
        ['Check at ' + M('x = 60°') + '.', 1, 'Both give ' + M('-\\frac{1}{2}')],
        ['Hence find ' + M('\\cos^4 x') + ' in terms of ' + M('\\cos 4x') + ' and ' + M('\\cos 2x') + '.', 2, M('\\frac{3 + 4\\cos 2x + \\cos 4x}{8}')]
      ]);
    },
    function () {
      var A = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]), B = pick([[3, 4, 5], [5, 12, 13], [7, 24, 25]]);
      var sA = A[0] / A[2], cA = A[1] / A[2], sB = B[1] / B[2], cB = B[0] / B[2];
      return Q('Angles ' + M('A') + ' and ' + M('B') + ' are acute, with ' + M('\\sin A = ' + F(A[0], A[2])) + ' and ' + M('\\cos B = ' + F(B[0], B[2])) + '.', [
        ['Find ' + M('\\cos A') + ' and ' + M('\\sin B') + '.', 2, M(F(A[1], A[2])) + ', ' + M(F(B[1], B[2]))],
        ['Find ' + M('\\sin(A + B)') + ' and ' + M('\\cos(A - B)') + ' exactly.', 3, M(F(A[0] * B[0] + A[1] * B[1], A[2] * B[2])) + ', ' + M(F(A[1] * B[0] + A[0] * B[1], A[2] * B[2]))],
        ['Is ' + M('A + B') + ' acute or obtuse? Explain.', 1, (cA * cB - sA * sB > 0 ? 'Acute' : 'Obtuse') + ': ' + M('\\cos(A + B) = ' + F(A[1] * B[0] - A[0] * B[1], A[2] * B[2]))]
      ]);
    },
    function () {
      var k = pick([1, 2, 3, 4]);
      var al = Math.atan(4 / 3) * D, b = Math.asin(k / 5) * D;
      var s = [b - al, 180 - b - al, b - al + 360, 180 - b - al + 360].filter(function (v) { return v >= 0 && v < 360; }).sort(function (p, q) { return p - q; });
      return Q('Solve ' + M('3\\sin x + 4\\cos x = ' + k) + ' for ' + M('0 \\le x < 360°') + '.', [
        ['Write the left side as ' + M('5\\sin(x + \\alpha)') + '.', 2, M('\\alpha = ' + sf3(al) + '°')],
        ['Solve.', 3, s.map(function (v) { return sf3(v) + '°'; }).join(', ')],
        ['For which values of ' + M('k') + ' are there no solutions?', 1, M('|k| > 5')]
      ]);
    }
  ]);

  X('a2-parametric', [
    function () {
      var t0 = nz(-3, 3), a = pick([1, 2]);
      return Q('A curve has ' + M('x = ' + c1(a, 't^2')) + ', ' + M('y = ' + 2 * a + 't') + '.', [
        ['Find a Cartesian equation.', 2, M('y^2 = ' + 4 * a + 'x')],
        ['Find ' + M('\\frac{dy}{dx}') + ' in terms of ' + M('t') + '.', 2, M('\\frac{1}{t}')],
        ['Find the tangent at ' + M('t = ' + t0) + ' and where it meets the ' + M('y') + '-axis.', 2, M('y = ' + cf(F(1, t0), 'x') + S(a * t0)) + '; ' + M('(0, ' + a * t0 + ')')]
      ]);
    },
    function () {
      var a = nz(-3, 3), b = nz(-3, 3), r = ri(2, 5);
      return Q('A curve has ' + M('x = ' + c1(r, '\\cos t') + S(a)) + ', ' + M('y = ' + c1(r, '\\sin t') + S(b)) + ', ' + M('0 \\le t < 2\\pi') + '.', [
        ['Find the Cartesian equation and describe the curve.', 2, M('(x' + S(-a) + ')^2 + (y' + S(-b) + ')^2 = ' + r * r) + ': a circle'],
        ['Describe the curve if ' + M('0 \\le t \\le \\pi') + ' only.', 1, 'The upper semicircle'],
        ['Find the value of ' + M('t') + ' at the point furthest to the left.', 1, M('t = \\pi')]
      ]);
    },
    function () {
      var m = nz(-3, 3), c = ri(-4, 4);
      return Q('The curve ' + M('x = t^2,\\ y = t^3') + ' meets the line ' + M('y = ' + c1(m, 'x')) + '.', [
        ['Show that ' + M('t^3 = ' + c1(m, 't^2')) + '.', 1, 'Substitute'],
        ['Find the points of intersection.', 2, M('(0, 0)') + ' and ' + M('(' + m * m + ', ' + m * m * m + ')')],
        ['Find a Cartesian equation of the curve.', 1, M('y^2 = x^3')]
      ]);
    },
    function () {
      var a = ri(1, 3);
      return Q('A curve has ' + M('x = t^2 - ' + a) + ', ' + M('y = t^3 - ' + 3 * a * a + 't') + '.', [
        ['Find ' + M('\\frac{dy}{dx}') + '.', 2, M('\\frac{3t^2 - ' + 3 * a * a + '}{2t}')],
        ['Find the stationary points.', 2, M('t = \\pm ' + a) + ': ' + M('(0, ' + (-2 * a * a * a) + ')') + ' and ' + M('(0, ' + 2 * a * a * a + ')')],
        ['Explain why the curve has a vertical tangent at ' + M('t = 0') + '.', 1, M('\\frac{dx}{dt} = 0') + ' while ' + M('\\frac{dy}{dt} \\ne 0')]
      ]);
    },
    function () {
      return Q('A curve has ' + M('x = t + \\frac{1}{t},\\ y = t - \\frac{1}{t}') + ', ' + M('t > 0') + '.', [
        ['Show that ' + M('x^2 - y^2 = 4') + '.', 2, 'The cross terms cancel'],
        ['Explain why ' + M('x \\ge 2') + ' for this curve.', 2, M('t + \\frac{1}{t} \\ge 2') + ' for ' + M('t > 0')],
        ['Find ' + M('\\frac{dy}{dx}') + ' at ' + M('t = 2') + '.', 2, M('\\frac{1 + \\frac{1}{4}}{1 - \\frac{1}{4}} = \\frac{5}{3}')]
      ]);
    },
    function () {
      var u = ri(15, 30), t = pick([30, 45, 60]);
      var ux = u * Math.cos(t * Math.PI / 180), uy = u * Math.sin(t * Math.PI / 180);
      return Q('A projectile has ' + M('x = ' + sf3(ux) + 't') + ', ' + M('y = ' + sf3(uy) + 't - 4.9t^2') + '.', [
        ['Find the Cartesian equation.', 2, M('y = ' + cf(sf3(uy / ux), 'x') + ' - ' + sf3(4.9 / (ux * ux)) + 'x^2')],
        ['Find the range on horizontal ground.', 2, sf3(2 * ux * uy / 9.8) + ' m'],
        ['Find the maximum height.', 2, sf3(uy * uy / 19.6) + ' m']
      ]);
    },
    function () {
      var a = ri(1, 3);
      return Q('A curve has ' + M('x = ' + c1(a, 't^2')) + ', ' + M('y = t^3') + ' for ' + M('0 \\le t \\le 2') + '.', [
        ['Write the area under the curve as an integral in ' + M('t') + '.', 2, M('\\int_0^2 t^3 \\times ' + 2 * a + 't\\, dt')],
        ['Evaluate it.', 2, M(F(64 * a, 5))],
        ['Check by finding the Cartesian equation and integrating with respect to ' + M('x') + '.', 2, M('y = \\left(\\frac{x}{' + a + '}\\right)^{3/2}') + ', from 0 to ' + 4 * a]
      ]);
    },
    function () {
      var a = ri(2, 5), b; do { b = ri(2, 5); } while (b === a);
      return Q('A curve has ' + M('x = ' + a + '\\cos t') + ', ' + M('y = ' + b + '\\sin t') + '.', [
        ['Find its Cartesian equation.', 2, M('\\frac{x^2}{' + a * a + '} + \\frac{y^2}{' + b * b + '} = 1')],
        ['Describe the curve and its intercepts.', 1, 'An ellipse through ' + M('(\\pm ' + a + ', 0)') + ' and ' + M('(0, \\pm ' + b + ')')],
        ['Find the gradient at ' + M('t = \\frac{\\pi}{4}') + '.', 2, M('-' + F(b, a))]
      ]);
    },
    function () {
      return Q('A curve has ' + M('x = \\sin t,\\ y = \\cos 2t') + ', ' + M('-\\frac{\\pi}{2} \\le t \\le \\frac{\\pi}{2}') + '.', [
        ['Find the Cartesian equation.', 2, M('y = 1 - 2x^2')],
        ['State the domain and range of the Cartesian form.', 2, M('-1 \\le x \\le 1') + ', ' + M('-1 \\le y \\le 1')],
        ['Explain why the Cartesian equation alone does not describe the curve fully.', 1, 'It allows all ' + M('x') + ', but the parametric form only gives ' + M('|x| \\le 1')]
      ]);
    },
    function () {
      var t0 = pick([1, 2, -1]);
      var t2 = -t0 - 2 / t0;
      return Q('The normal to ' + M('x = t^2,\\ y = 2t') + ' at ' + M('t = ' + t0) + ' meets the curve again.', [
        ['Find the equation of the normal.', 3, M('y - ' + 2 * t0 + ' = ' + (-t0) + '(x - ' + t0 * t0 + ')').replace('= 1(', '= (').replace('= -1(', '= -(').replace('- -', '+ ')],
        ['Find the parameter of the second intersection.', 3, M('t = ' + sf3(t2))],
        ['Find the coordinates.', 1, M('(' + sf3(t2 * t2) + ', ' + sf3(2 * t2) + ')')]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
