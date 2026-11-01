/* Byte Size Classroom — deeper extension questions (set 3, A level Year 1 part a): indices and surds, quadratics, equations and inequalities, graphs. */
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
  function sq(n) { var r = Math.round(Math.sqrt(n)); return r * r === n; }
  function nonsq(lo, hi) { var v; do { v = ri(lo, hi); } while (sq(v)); return v; }
  function rt(n) { var o = 1, i = n; for (var k = 2; k * k <= i; k++) while (i % (k * k) === 0) { o *= k; i /= k * k; } return i === 1 ? String(o) : (o === 1 ? '' : o) + '\\sqrt{' + i + '}'; }
  function sortn(a) { return a.slice().sort(function (p, q) { return p - q; }); }

  X('al-indices', [
    function () {
      var a = pick([2, 3, 5]);
      return Q('Solve ' + M(a + '^{2x + 1} - ' + (a * a + 1) + ' \\times ' + a + '^x + ' + a + ' = 0') + '.', [
        ['Let ' + M('y = ' + a + '^x') + ' and show that ' + M(a + 'y^2 - ' + (a * a + 1) + 'y + ' + a + ' = 0') + '.', 2, M(a + '^{2x + 1} = ' + a + '(' + a + '^x)^2')],
        ['Solve for ' + M('y') + ' and hence find ' + M('x') + '.', 3, M('y = ' + a + '\\text{ or } \\frac{1}{' + a + '}') + ', so ' + M('x = 1\\text{ or } -1')],
        ['Explain why the two values of ' + M('x') + ' are negatives of each other.', 1, 'The two values of ' + M('y') + ' are reciprocals (their product is 1)']
      ]);
    },
    function () {
      var a, b; do { a = nonsq(2, 15); b = nonsq(2, 15); } while (a === b || sq(a * b));
      if (a < b) { var t = a; a = b; b = t; }
      return Q('Simplify ' + M('\\frac{\\sqrt{' + a + '} + \\sqrt{' + b + '}}{\\sqrt{' + a + '} - \\sqrt{' + b + '}}') + '.', [
        ['Rationalise the denominator.', 3, M('\\frac{' + (a + b) + ' + 2\\sqrt{' + a * b + '}}{' + (a - b) + '}') + (rt(a * b) !== '\\sqrt{' + a * b + '}' ? ' = ' + M('\\frac{' + (a + b) + ' + 2' + rt(a * b) + '}{' + (a - b) + '}') : '')],
        ['Without a calculator, decide whether the value is greater than ' + (a + b) + '. Explain.', 2, (((a + b) + 2 * Math.sqrt(a * b)) / (a - b) > a + b ? 'Yes' : 'No') + ': compare ' + M((a + b) + ' + 2\\sqrt{' + a * b + '}') + ' with ' + M((a + b) * (a - b)) + ', using ' + M(Math.floor(Math.sqrt(a * b)) + ' < \\sqrt{' + a * b + '} < ' + (Math.floor(Math.sqrt(a * b)) + 1))]
      ]);
    },
    function () {
      var x = ri(-3, 4), y = ri(-3, 4), p = 2 * x + 3 * y, q = 2 * x - 3 * y;
      return Q('Solve simultaneously ' + M('4^x \\times 8^y = 2^{' + p + '}') + ' and ' + M('\\frac{9^x}{27^y} = 3^{' + q + '}') + '.', [
        ['Write each equation as a linear equation in ' + M('x') + ' and ' + M('y') + '.', 3, M('2x + 3y = ' + p) + ' and ' + M('2x - 3y = ' + q)],
        ['Solve them.', 2, M('x = ' + x + ',\\ y = ' + y)],
        ['Explain why the bases must be made the same before comparing indices.', 1, 'Equal powers of the same base have equal indices; different bases cannot be compared directly']
      ]);
    },
    function () {
      var r = ri(3, 9), b = ri(0, r - 1), a = (r - b) * (r - b) - r, other = 2 * b + 1 - r;
      while (a <= 0 && b > 0) { b--; a = (r - b) * (r - b) - r; other = 2 * b + 1 - r; }
      if (a <= 0) { r = 6; b = 2; a = 10; other = -1; }
      var ok = other - b >= 0 && other + a >= 0;
      return Q('Solve ' + M('\\sqrt{x + ' + a + '} = x' + S0(-b)) + '.', [
        ['Square both sides and form a quadratic.', 2, M(poly([1, -(2 * b + 1), b * b - a]) + ' = 0')],
        ['Solve the quadratic.', 2, M('x = ' + r) + ' or ' + M('x = ' + other)],
        ['Check both in the original equation and explain any you reject.', 2, ok ? 'Both work' : M('x = ' + other) + ' is rejected: the right side would be ' + (other - b) + ', but a square root cannot be negative']
      ]);
    },
    function () {
      var k = ri(2, 6);
      return Q('Find ' + M('n') + ' if ' + M('(\\sqrt{2})^n \\times 4^n = 32^{' + k + '}') + '.', [
        ['Write each side as a power of 2.', 2, M('2^{\\frac{n}{2} + 2n} = 2^{' + 5 * k + '}')],
        ['Solve for ' + M('n') + '.', 2, M('n = ' + 2 * k)],
        ['Find ' + M('n') + ' if instead ' + M('(\\sqrt{2})^n \\times 4^n = 8') + '.', 1, M(F(6, 5))]
      ]);
    },
    function () {
      var d = pick([3, 4, 5, 6]), N0 = pick([100, 200, 500]), T = d * ri(3, 6);
      return Q('A population of bacteria is ' + M('N = ' + N0 + ' \\times 2^{t/' + d + '}') + ' after ' + M('t') + ' hours.', [
        ['Find the population after ' + T + ' hours.', 1, N0 * Math.pow(2, T / d)],
        ['How long does it take to multiply by 32?', 2, 5 * d + ' hours'],
        ['Write ' + M('N') + ' in the form ' + M(N0 + ' \\times k^t') + ', giving ' + M('k') + ' exactly.', 2, M('k = 2^{\\frac{1}{' + d + '}} = \\sqrt[' + d + ']{2}')]
      ]);
    },
    function () {
      return Q('Rationalise ' + M('\\frac{1}{1 + \\sqrt{2} + \\sqrt{3}}') + '.', [
        ['Multiply by ' + M('\\frac{1 + \\sqrt{2} - \\sqrt{3}}{1 + \\sqrt{2} - \\sqrt{3}}') + ' and simplify the denominator.', 3, M('(1 + \\sqrt{2})^2 - 3 = 2\\sqrt{2}')],
        ['Complete the rationalisation.', 2, M('\\frac{2 + \\sqrt{2} - \\sqrt{6}}{4}')],
        ['Explain why it takes two stages here.', 1, 'Three terms cannot be cleared by one difference of two squares']
      ]);
    },
    function () {
      var a = ri(1, 3), b = nonsq(2, 7);
      return Q('Expand ' + M('(' + a + ' + \\sqrt{' + b + '})^3') + '.', [
        ['Give your answer in the form ' + M('p + q\\sqrt{' + b + '}') + '.', 3, M((a * a * a + 3 * a * b) + ' + ' + (3 * a * a + b) + '\\sqrt{' + b + '}')],
        ['Write down ' + M('(' + a + ' - \\sqrt{' + b + '})^3') + ' without further work, explaining why.', 1, M((a * a * a + 3 * a * b) + ' - ' + (3 * a * a + b) + '\\sqrt{' + b + '}') + ': only odd powers of ' + M('\\sqrt{' + b + '}') + ' change sign'],
        ['Hence find ' + M('(' + a + ' + \\sqrt{' + b + '})^3 + (' + a + ' - \\sqrt{' + b + '})^3') + '.', 1, 2 * (a * a * a + 3 * a * b)]
      ]);
    },
    function () {
      var a = ri(2, 5), b = ri(2, 9), r1 = ri(2, 6);
      var c = a * r1 * r1 - b * r1;
      return Q('Let ' + M('f(x) = \\frac{' + a + 'x^{5/2} - ' + b + 'x^{3/2}}{\\sqrt{x}}') + ', ' + M('x > 0') + '.', [
        ['Write ' + M('f(x)') + ' as a polynomial.', 2, M(poly([a, -b, 0]))],
        ['Solve ' + M('f(x) = ' + c) + '.', 3, M('x = ' + r1) + (b - a * r1 > 0 ? ' or ' + M('x = ' + F(b - a * r1, a)) : ' (the other root, ' + M(F(b - a * r1, a)) + ', is rejected as ' + M('x > 0') + ')')],
        ['Explain why ' + M('x = 0') + ' is excluded from the domain.', 1, 'Division by ' + M('\\sqrt{0}')]
      ]);
    },
    function () {
      var k = ri(2, 5);
      return Q('Simplify ' + M('\\frac{' + k + '^{n + 2} - ' + k + '^n}{' + (k * k - 1) + ' \\times ' + k + '^{n - 1}}') + '.', [
        ['Factorise the numerator.', 2, M(k + '^n(' + k * k + ' - 1)')],
        ['Simplify fully.', 2, k],
        ['Explain why the answer does not depend on ' + M('n') + '.', 1, 'Every term has the same power of ' + k + ' as a factor, which cancels']
      ]);
    }
  ]);

  X('al-quadratics', [
    function () {
      var a = ri(2, 5);
      return Q('Consider ' + M('kx^2 + (k + ' + a + ')x + 1 = 0') + ', where ' + M('k \\ne 0') + '.', [
        ['Show that the discriminant is ' + M('k^2 + ' + (2 * a - 4 === 0 ? '' : (2 * a - 4 === 1 ? '' : 2 * a - 4) + 'k + ') + a * a) + '.', 2, M('(k + ' + a + ')^2 - 4k')],
        ['By completing the square, prove that the equation has two distinct real roots for every ' + M('k') + '.', 3, M((a === 2 ? 'k' : '(k + ' + (a - 2) + ')') + '^2 + ' + (4 * a - 4) + ' > 0')],
        ['What happens when ' + M('k = 0') + '?', 1, 'The equation is linear: ' + M('x = -' + F(1, a))]
      ]);
    },
    function () {
      var a = pick([2, 3, -2]), h = nz(-4, 4), k = ri(-6, 6);
      return Q(M('f(x) = ' + poly([a, -2 * a * h, a * h * h + k])) + '.', [
        ['Write ' + M('f(x)') + ' in the form ' + M('a(x + p)^2 + q') + '.', 3, M(a + xm(h) + '^2' + S0(k))],
        ['State the turning point and its nature.', 2, M('(' + h + ', ' + k + ')') + ', a ' + (a > 0 ? 'minimum' : 'maximum')],
        ['Find the range of ' + M('f') + ' for ' + M((h - 1) + ' \\le x \\le ' + (h + 2)) + '.', 2, a > 0 ? M(k + ' \\le f(x) \\le ' + (4 * a + k)) : M((4 * a + k) + ' \\le f(x) \\le ' + k)]
      ]);
    },
    function () {
      var p = ri(1, 4), q = ri(p + 1, 7);
      return Q('Solve ' + M('x - ' + (p + q) + '\\sqrt{x} + ' + p * q + ' = 0') + '.', [
        ['Use a suitable substitution to write it as a quadratic.', 2, M('u = \\sqrt{x}') + ': ' + M('u^2 - ' + (p + q) + 'u + ' + p * q + ' = 0')],
        ['Solve fully.', 2, M('x = ' + p * p) + ' or ' + M('x = ' + q * q)],
        ['Explain why ' + M('x + ' + (p + q) + '\\sqrt{x} + ' + p * q + ' = 0') + ' has no solutions.', 1, 'It gives ' + M('\\sqrt{x}') + ' negative']
      ]);
    },
    function () {
      var u = 5 * ri(4, 8), H = ri(10, 20);
      var tmax = u / 10, hmax = u * u / 20, D = u * u - 20 * H;
      return Q('A ball is thrown so that its height is ' + M('h = ' + u + 't - 5t^2') + ' metres after ' + M('t') + ' seconds.', [
        ['Complete the square to find the maximum height and when it occurs.', 3, M(num(hmax)) + ' m at ' + M('t = ' + num(tmax))],
        ['For how long is the ball above ' + H + ' m?', 3, D > 0 ? M('\\frac{\\sqrt{' + D + '}}{5} = ' + sf3(Math.sqrt(D) / 5)) + ' s' : 'It never gets that high'],
        ['Criticise the model.', 1, 'It ignores air resistance and the height of release']
      ]);
    },
    function () {
      var a = nz(-2, 2), b = ri(-4, 4), c = ri(-5, 5);
      var f = function (x) { return a * x * x + b * x + c; };
      return Q('A quadratic passes through ' + M('(0, ' + c + ')') + ', ' + M('(1, ' + f(1) + ')') + ' and ' + M('(2, ' + f(2) + ')') + '.', [
        ['Find its equation.', 3, M('y = ' + poly([a, b, c]))],
        ['Explain how the second difference of the ' + M('y') + '-values relates to the ' + M('x^2') + ' coefficient.', 2, 'Second difference ' + (f(2) - 2 * f(1) + c) + ' = ' + M('2a')],
        ['Does it pass through ' + M('(3, ' + (f(3) + 1) + ')') + '?', 1, 'No: ' + M('f(3) = ' + f(3))]
      ]);
    },
    function () {
      var k = 2 * ri(1, 4), m1 = k + 2, m2 = k - 2;
      return Q('The line ' + M('y = mx') + ' is a tangent to ' + M('y = x^2 + ' + k + 'x + 1') + '.', [
        ['Show that ' + M('x^2 + (' + k + ' - m)x + 1 = 0') + ' has equal roots.', 1, 'A tangent meets the curve once'],
        ['Find the two possible values of ' + M('m') + '.', 3, M('(' + k + ' - m)^2 = 4') + ', ' + M('m = ' + m2) + ' or ' + M(m1)],
        ['Find the points of contact.', 2, M('(1, ' + (k + 2) + ')') + ' and ' + M('(-1, ' + (2 - k) + ')')]
      ]);
    },
    function () {
      var b = ri(1, 4), al = 2 * b;
      var p = 2 * (al + b), q = 2 * al * b;
      return Q('The roots of ' + M('2x^2 - px + q = 0') + ' are ' + M('\\alpha') + ' and ' + M('\\beta') + ', where ' + M('\\alpha = 2\\beta') + ' and ' + M('\\beta = ' + b) + '.', [
        ['Use the sum and product of the roots to find ' + M('p') + ' and ' + M('q') + '.', 3, M('p = ' + p + ',\\ q = ' + q)],
        ['Show that in general, if one root is twice the other, then ' + M('p^2 = 9q') + '.', 3, M('3\\beta = \\frac{p}{2},\\ 2\\beta^2 = \\frac{q}{2}') + '; eliminate ' + M('\\beta')]
      ]);
    },
    function () {
      return Q('Find the values of ' + M('k') + ' for which ' + M('x^2 - kx + k > 0') + ' for all real ' + M('x') + '.', [
        ['Explain why the discriminant must be negative.', 1, 'The parabola opens upwards and must not meet the axis'],
        ['Solve the resulting inequality.', 3, M('k^2 - 4k < 0') + ', ' + M('0 < k < 4')],
        ['For ' + M('k = 4') + ', describe the graph.', 1, 'It touches the ' + M('x') + '-axis at ' + M('x = 2')]
      ]);
    },
    function () {
      var c0 = ri(-4, 8);
      var D = 36 - 4 * (c0 + 1), n = D > 0 ? 2 : D === 0 ? 1 : 0;
      return Q('The curve ' + M('y = x^2 - 4x + c') + ' and the line ' + M('y = 2x - 1') + ' are drawn.', [
        ['Find the range of values of ' + M('c') + ' for which they meet twice.', 3, M('36 - 4(c + 1) > 0') + ', ' + M('c < 8')],
        ['When ' + M('c = ' + c0) + ', how many intersections are there?', 1, n],
        ['When ' + M('c = 8') + ', find the point where the line touches the curve.', 2, M('(3, 5)')]
      ]);
    },
    function () {
      var n = 2 * ri(4, 15) + 1, P = n * (n + 2);
      return Q('The product of two consecutive odd numbers is ' + P + '.', [
        ['Let the numbers be ' + M('2k - 1') + ' and ' + M('2k + 1') + '. Form and solve an equation.', 3, M('4k^2 - 1 = ' + P) + ', ' + M('k = \\pm ' + (n + 1) / 2)],
        ['State both possible pairs.', 1, n + ' and ' + (n + 2) + ', or ' + (-n - 2) + ' and ' + (-n)],
        ['Prove that the product of two consecutive odd numbers is always one less than a multiple of 4.', 1, M('4k^2 - 1')]
      ]);
    }
  ]);

  X('al-equations', [
    function () {
      var x1 = nz(-5, 5), y1 = nz(-5, 5), d = x1 - y1, p = x1 * y1;
      return Q('Solve ' + M('x - y = ' + d) + ' and ' + M('xy = ' + p) + '.', [
        ['Substitute to form a quadratic in ' + M('x') + '.', 2, M(poly([1, -d, -p]) + ' = 0')],
        ['Find both pairs of solutions.', 3, M('(' + x1 + ', ' + y1 + ')') + ' and ' + M('(' + (-y1) + ', ' + (-x1) + ')')],
        ['Explain the symmetry in the solutions.', 1, 'Replacing ' + M('(x, y)') + ' by ' + M('(-y, -x)') + ' leaves both equations unchanged']
      ]);
    },
    function () {
      var a = ri(2, 5), r = ri(1, a - 1), D = a * a - r * r;
      return Q('The line ' + M('y = kx') + ' is a tangent to the circle ' + M('x^2 + y^2 - ' + 2 * a + 'x + ' + D + ' = 0') + '.', [
        ['Show that ' + M('(1 + k^2)x^2 - ' + 2 * a + 'x + ' + D + ' = 0') + '.', 1, 'Substitute ' + M('y = kx')],
        ['Find the exact values of ' + M('k') + '.', 3, M('k^2 = ' + F(r * r, D)) + ', ' + M('k = \\pm ' + (sq(r * r) && sq(D) ? F(r, Math.sqrt(D)) : '\\sqrt{' + F(r * r, D) + '}'))],
        ['Check using the geometry: the circle has centre ' + M('(' + a + ', 0)') + ' and radius ' + r + '.', 2, M('\\sin\\theta = ' + F(r, a)) + ', and ' + M('\\tan\\theta = k')]
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(5, 9);
      return Q('Find the set of values of ' + M('x') + ' for which ' + M('2x - 3 < x + ' + (b - 3)) + ' and ' + M(poly([1, -(a + b), a * b]) + ' > 0') + '.', [
        ['Solve each inequality.', 3, M('x < ' + b) + '; ' + M('x < ' + a + '\\text{ or } x > ' + b)],
        ['Combine them, using set notation.', 2, M('\\{x : x < ' + a + '\\}')],
        ['Explain why the second region beyond ' + b + ' disappears.', 1, 'It does not satisfy the first inequality']
      ]);
    },
    function () {
      var a = ri(2, 9);
      return Q('Solve ' + M('\\frac{' + a + '}{x} < 1') + '.', [
        ['Explain why multiplying both sides by ' + M('x') + ' is not valid.', 1, M('x') + ' could be negative, which would reverse the inequality'],
        ['Multiply by ' + M('x^2') + ' and solve.', 3, M('x(x - ' + a + ') > 0') + ', so ' + M('x < 0') + ' or ' + M('x > ' + a)],
        ['Check your answer with ' + M('x = -1') + ' and ' + M('x = ' + (a + 1)) + '.', 1, M('-' + a + ' < 1') + ' and ' + M(F(a, a + 1) + ' < 1')]
      ]);
    },
    function () {
      var c = ri(1, 5);
      return Q('The region ' + M('R') + ' satisfies ' + M('y > x^2 - 4') + ' and ' + M('y < 2x + ' + c) + '.', [
        ['Find where the boundaries meet.', 3, M('x = 1 \\pm \\sqrt{' + (5 + c) + '}')],
        ['Is the point ' + M('(0, 0)') + ' in ' + M('R') + '? Explain.', 1, 'Yes: ' + M('0 > -4') + ' and ' + M('0 < ' + c)],
        ['Explain why the boundaries are drawn dashed.', 1, 'The inequalities are strict']
      ]);
    },
    function () {
      var k = pick([4, 6, 8]), q = k * k / 4;
      return Q('For which values of ' + M('m') + ' does the line ' + M('y = mx - ' + q) + ' meet the curve ' + M('y = x^2') + '?', [
        ['Form a quadratic in ' + M('x') + ' and find its discriminant.', 2, M('x^2 - mx + ' + q + ' = 0') + ', discriminant ' + M('m^2 - ' + 4 * q)],
        ['Find the set of values of ' + M('m') + '.', 2, M('m \\le -' + k + '\\text{ or } m \\ge ' + k)],
        ['Find the tangents from the point ' + M('(0, -' + q + ')') + ' to the curve.', 2, M('y = \\pm ' + k + 'x - ' + q)]
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(1, 9);
      return Q('Solve ' + M('\\frac{x + ' + b + '}{x - ' + a + '} \\ge 2') + '.', [
        ['Rearrange to ' + M('\\frac{' + (a * 2 + b) + ' - x}{x - ' + a + '} \\ge 0') + '.', 2, 'Subtract 2 and combine'],
        ['Solve, explaining whether each end point is included.', 3, M(a + ' < x \\le ' + (2 * a + b)) + '; ' + a + ' is excluded (division by zero), ' + (2 * a + b) + ' is included (equality)']
      ]);
    },
    function () {
      var x = nz(-4, 4), y = nz(-4, 4);
      var s = x * x + y * y, c = 2 * x + y;
      return Q('Solve ' + M('2x + y = ' + c) + ' and ' + M('x^2 + y^2 = ' + s) + '.', [
        ['Substitute and form a quadratic in ' + M('x') + '.', 2, M(poly([5, -4 * c, c * c - s]) + ' = 0')],
        ['Find both solutions.', 3, (function () { var x2 = (4 * c) / 5 - x; return M('(' + x + ', ' + y + ')') + ' and ' + M('(' + num(x2) + ', ' + num(c - 2 * x2) + ')'); })()],
        ['Interpret geometrically.', 1, 'The points where the line crosses the circle centre the origin, radius ' + M(rt(s))]
      ]);
    },
    function () {
      var c = ri(1, 6);
      return Q('Find the values of ' + M('k') + ' for which ' + M('x^2 + (k - 3)x + ' + c * c + ' = 0') + ' has no real roots.', [
        ['Write the discriminant condition.', 1, M('(k - 3)^2 < ' + 4 * c * c)],
        ['Solve it.', 2, M((3 - 2 * c) + ' < k < ' + (3 + 2 * c))],
        ['Give an example of ' + M('k') + ' for which there are two positive roots, and justify.', 2, 'E.g. ' + M('k = ' + (3 - 2 * c - 1)) + ': sum of roots ' + (2 * c + 1) + ' > 0, product ' + c * c + ' > 0']
      ]);
    },
    function () {
      var a = ri(3, 9), b = ri(2, 6);
      return Q('A rectangular field has length ' + M('x') + ' m. Its length is ' + a + ' m more than its width, and its area must be at least ' + b * (b + a) + ' m².', [
        ['Write an inequality and solve it.', 3, M('x(x - ' + a + ') \\ge ' + b * (b + a)) + ', ' + M('x \\ge ' + (b + a))],
        ['Explain why the other part of the quadratic solution is rejected.', 1, 'It gives a negative length'],
        ['The perimeter must also be at most ' + (4 * (b + a) + 2 * a) + ' m. Find the range of possible lengths.', 2, M((b + a) + ' \\le x \\le ' + (b + 2 * a))]
      ]);
    }
  ]);

  X('al-graphs', [
    function () {
      var a = nz(-3, 3), b; do { b = nz(-4, 4); } while (b === a);
      return Q('Sketch ' + M('y = ' + xm(a) + '^2' + xm(b)) + '.', [
        ['State where the curve meets the axes.', 2, M('(' + a + ', 0)') + ', ' + M('(' + b + ', 0)') + ', ' + M('(0, ' + (-a * a * b) + ')')],
        ['Describe the behaviour at each root.', 2, 'Touches at ' + a + ' (repeated root), crosses at ' + b],
        ['Solve ' + M(xm(a) + '^2' + xm(b) + ' < 0') + '.', 2, M('x < ' + b) + (a < b ? ', ' + M('x \\ne ' + a) : '')]
      ]);
    },
    function () {
      var k = ri(1, 6), c = ri(1, 4);
      return Q('Consider ' + M('y = \\frac{' + k + '}{x}') + ' and ' + M('y = \\frac{' + k + '}{x} + ' + c) + '.', [
        ['Describe the transformation from the first to the second, and state the asymptotes of the second.', 2, 'Translation ' + M('\\begin{pmatrix}0\\\\' + c + '\\end{pmatrix}') + '; ' + M('x = 0,\\ y = ' + c)],
        ['Find where the second curve crosses the ' + M('x') + '-axis.', 1, M('x = -' + F(k, c))],
        ['Find where ' + M('y = \\frac{' + k + '}{x - ' + c + '}') + ' crosses the ' + M('y') + '-axis and state its asymptotes.', 2, M('(0, -' + F(k, c) + ')') + '; ' + M('x = ' + c + ',\\ y = 0')]
      ]);
    },
    function () {
      var a = ri(1, 4), b = nz(-3, 3);
      return Q('The curve ' + M('y = f(x)') + ' has a maximum at ' + M('(' + a + ', ' + b + ')') + '.', [
        ['Find the maximum of ' + M('y = f(2x)') + '.', 1, M('(' + F(a, 2) + ', ' + b + ')')],
        ['Find the turning point of ' + M('y = f(-x)') + ' and of ' + M('y = -f(x)') + ', saying which type each is.', 2, M('(' + (-a) + ', ' + b + ')') + ' maximum; ' + M('(' + a + ', ' + (-b) + ')') + ' minimum'],
        ['Find the maximum of ' + M('y = 3f(x - 1) + 2') + '.', 2, M('(' + (a + 1) + ', ' + (3 * b + 2) + ')')]
      ]);
    },
    function () {
      var k = ri(1, 9);
      return Q('Consider ' + M('y = \\frac{1}{x^2}') + ' and ' + M('y = ' + k + ' - x^2') + '.', [
        ['Show that the intersections satisfy ' + M('x^4 - ' + c1(k, 'x^2') + ' + 1 = 0') + '.', 1, 'Multiply by ' + M('x^2')],
        ['For which values of ' + M('k') + ' do the curves meet?', 3, M('k^2 \\ge 4') + ' and the roots for ' + M('x^2') + ' must be positive: ' + M('k \\ge 2')],
        ['When ' + M('k = ' + k) + ', how many intersection points are there?', 1, k > 2 ? 4 : k === 2 ? 2 : 0]
      ]);
    },
    function () {
      var a = ri(2, 4);
      return Q('Let ' + M('f(x) = x^3 - ' + a * a + 'x') + '.', [
        ['Sketch ' + M('y = f(x)') + ' and state its roots.', 2, M('x = 0, \\pm ' + a)],
        ['Sketch ' + M('y = f(x + ' + a + ')') + ' and state its roots.', 2, M('x = ' + (-2 * a) + ', ' + (-a) + ', 0')],
        ['Show that ' + M('f(x + ' + a + ') = x(x + ' + a + ')(x + ' + 2 * a + ')') + '.', 2, 'Factorise ' + M('f') + ' then replace ' + M('x') + ' by ' + M('x + ' + a)]
      ]);
    },
    function () {
      var p = nz(-4, 4), q = nz(-4, 4);
      return Q('The graph of ' + M('y = x^2') + ' is translated to give ' + M('y = ' + poly([1, -2 * p, p * p + q])) + '.', [
        ['Find the translation vector.', 2, M('\\begin{pmatrix}' + p + '\\\\' + q + '\\end{pmatrix}')],
        ['The same curve could be obtained from ' + M('y = ' + xm(p - 1) + '^2') + '. Find this translation.', 2, M('\\begin{pmatrix}1\\\\' + q + '\\end{pmatrix}')],
        ['Explain why there is only one translation taking ' + M('y = x^2') + ' to the curve.', 1, 'The vertex must move to ' + M('(' + p + ', ' + q + ')')]
      ]);
    },
    function () {
      var k = ri(2, 8);
      return Q('The variables ' + M('y') + ' and ' + M('x') + ' satisfy ' + M('y \\propto \\frac{1}{x^2}') + ', and ' + M('y = ' + k * 4) + ' when ' + M('x = 1') + '.', [
        ['Find the equation.', 1, M('y = \\frac{' + 4 * k + '}{x^2}')],
        ['Find ' + M('y') + ' when ' + M('x') + ' is doubled from 1 to 2, and explain the effect of doubling ' + M('x') + ' in general.', 2, k + '; ' + M('y') + ' is divided by 4'],
        ['Sketch the graph and state its asymptotes and symmetry.', 2, 'Both branches above the ' + M('x') + '-axis; asymptotes ' + M('x = 0, y = 0') + '; symmetric in the ' + M('y') + '-axis']
      ]);
    },
    function () {
      var a = ri(1, 3), b = ri(4, 6);
      return Q('Sketch ' + M('y = x(x - ' + a + ')(' + b + ' - x)') + '.', [
        ['State the roots and the end behaviour.', 2, '0, ' + a + ', ' + b + '; as ' + M('x \\to \\infty, y \\to -\\infty')],
        ['For which values of ' + M('x') + ' is ' + M('y > 0') + '?', 2, M(a + ' < x < ' + b) + ' or ' + M('x < 0')],
        ['Explain how the sign of the ' + M('x^3') + ' coefficient decides the shape.', 1, 'Here it is negative, so the curve starts high on the left and ends low on the right']
      ]);
    },
    function () {
      var k = ri(2, 6);
      return Q('The curve ' + M('y = x^2 + 1') + ' is stretched to give ' + M('y = \\frac{x^2}{' + k * k + '} + 1') + '.', [
        ['Describe the stretch.', 2, 'Stretch parallel to the ' + M('x') + '-axis, scale factor ' + k],
        ['Describe a single different transformation of ' + M('y = x^2') + ' that gives the same curve as ' + M('y = \\frac{x^2}{' + k * k + '}') + '.', 2, 'Stretch parallel to the ' + M('y') + '-axis, scale factor ' + M(F(1, k * k))],
        ['Explain why this works for ' + M('x^2') + ' but not for ' + M('x^2 + x') + '.', 1, M('\\left(\\frac{x}{' + k + '}\\right)^2 = \\frac{1}{' + k * k + '}x^2') + ', but the ' + M('x') + ' term scales differently']
      ]);
    },
    function () {
      var a = ri(2, 4);
      return Q('Find the number of solutions of ' + M('x^3 - ' + a * a + 'x = \\frac{1}{x}') + '.', [
        ['Sketch both curves on the same axes.', 2, 'Cubic through ' + M('0, \\pm ' + a) + '; reciprocal in quadrants 1 and 3'],
        ['Use the sketch to state the number of solutions, explaining your reasoning.', 2, '2: one in each of quadrants 1 and 3, where the cubic grows past the reciprocal'],
        ['Confirm algebraically using ' + M('u = x^2') + '.', 2, M('u^2 - ' + a * a + 'u - 1 = 0') + ' has one positive root, giving two values of ' + M('x')]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
