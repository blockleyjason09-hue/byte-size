/* Byte Size Classroom — deeper extension questions (set 3, Further Maths part b): graphs, equations, inequalities, indices, proof, sequences. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function xm(v) { return v ? '(x' + S(-v) + ')' : 'x'; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }

  X('fm-graphs', [
    function () {
      var a = ri(2, 6), b = pick([2, 3, 1.5]), x1 = 1, x2 = 3;
      var y1 = a * Math.pow(b, x1), y2 = a * Math.pow(b, x2);
      var T = ri(100, 500), n = Math.ceil(Math.log(T / a) / Math.log(b));
      return Q('The curve ' + M('y = ab^x') + ' passes through ' + M('(1, ' + num(y1) + ')') + ' and ' + M('(3, ' + num(y2) + ')') + '.', [
        ['Find ' + M('a') + ' and ' + M('b') + '.', 3, M('b^2 = ' + num(y2 / y1)) + ', ' + M('b = ' + num(b)) + ', ' + M('a = ' + a)],
        ['Write down the ' + M('y') + '-intercept and explain why the curve never meets the ' + M('x') + '-axis.', 2, a + '; ' + M('b^x > 0') + ' for every ' + M('x')],
        ['Find the smallest integer ' + M('x') + ' for which ' + M('y > ' + T) + '.', 2, n]
      ]);
    },
    function () {
      var k = ri(2, 5);
      return Q('A function is defined by ' + M('f(x) = x^2') + ' for ' + M('-' + k + ' \\le x < 0') + ', ' + M('f(x) = ' + k * k + ' - ' + k + 'x') + ' for ' + M('0 \\le x \\le ' + k) + '.', [
        ['Sketch the graph and mark the end points.', 2, 'Parabola from ' + M('(-' + k + ', ' + k * k + ')') + ' to the origin (open), then a line from ' + M('(0, ' + k * k + ')') + ' to ' + M('(' + k + ', 0)')],
        ['Explain why the graph is not continuous at ' + M('x = 0') + '.', 1, 'It jumps from 0 to ' + k * k],
        ['For which values of ' + M('c') + ' does ' + M('f(x) = c') + ' have exactly two solutions?', 3, M('0 < c \\le ' + k * k) + ' (at ' + M('c = ' + k * k) + ' the solutions are ' + M('x = -' + k) + ' and ' + M('x = 0') + ')'],
        ['Solve ' + M('f(x) = ' + k) + '.', 2, M('x = -' + (k === 4 ? '2' : '\\sqrt{' + k + '}')) + ' or ' + M('x = ' + (k - 1))]
      ]);
    },
    function () {
      var a = ri(2, 5), ymax = 2 * a * a * a / (3 * Math.sqrt(3));
      return Q('Consider ' + M('y = x^3 - ' + a * a + 'x') + '.', [
        ['Factorise and find where the curve meets the ' + M('x') + '-axis.', 2, M('x(x - ' + a + ')(x + ' + a + ')') + '; ' + M('x = 0, \\pm ' + a)],
        ['The turning points are at ' + M('x = \\pm\\frac{' + a + '}{\\sqrt{3}}') + '. Find their ' + M('y') + '-coordinates.', 2, M('\\mp ' + sf3(ymax))],
        ['For which values of ' + M('k') + ' does ' + M('x^3 - ' + a * a + 'x = k') + ' have three solutions?', 2, M('-' + sf3(ymax) + ' < k < ' + sf3(ymax))],
        ['Explain why the graph has rotational symmetry about the origin.', 1, 'Replacing ' + M('x') + ' by ' + M('-x') + ' changes the sign of ' + M('y')]
      ]);
    },
    function () {
      var m = nz(-4, 4), c = ri(-6, 6);
      var D = m * m + 4 * c;
      return Q('The line ' + M('y = ' + c1(m, 'x') + (c ? S(c) : '')) + ' and the curve ' + M('y = x^2') + ' are drawn.', [
        ['Show that the ' + M('x') + '-coordinates of any intersections satisfy ' + M(poly([1, -m, -c]) + ' = 0') + '.', 1, 'Set ' + M('x^2 = ' + c1(m, 'x') + (c ? S(c) : ''))],
        ['How many times do they meet? Use the discriminant.', 2, 'Discriminant ' + D + ': ' + (D > 0 ? 'twice' : D === 0 ? 'once (tangent)' : 'never')],
        ['Find the value of ' + M('c') + ' for which the line with gradient ' + m + ' is a tangent.', 2, M('c = ' + F(-m * m, 4))]
      ]);
    },
    function () {
      var r1 = nz(-5, 1), r2 = ri(2, 6), a = pick([1, 2, -1, -2]), k = a * r1 * r2;
      var vx = (r1 + r2) / 2, vy = a * (vx - r1) * (vx - r2);
      return Q('A quadratic curve crosses the ' + M('x') + '-axis at ' + r1 + ' and ' + r2 + ', and the ' + M('y') + '-axis at ' + k + '.', [
        ['Find its equation in the form ' + M('y = ax^2 + bx + c') + '.', 3, M('y = ' + poly([a, -a * (r1 + r2), a * r1 * r2]))],
        ['Find the coordinates of the turning point.', 2, M('(' + num(vx) + ', ' + num(vy) + ')')],
        ['Explain why the turning point lies halfway between the roots.', 1, 'The parabola is symmetric about its axis']
      ]);
    },
    function () {
      var P = ri(10, 30) * 1000, r = pick([0.8, 0.85, 0.9]);
      var half = Math.ceil(Math.log(0.5) / Math.log(r));
      return Q('A car worth £' + P.toLocaleString('en-GB') + ' loses ' + Math.round((1 - r) * 100) + '% of its value each year. Its value after ' + M('t') + ' years is ' + M('V = ' + P + ' \\times ' + r + '^t') + '.', [
        ['Find its value after 3 years.', 1, '£' + Math.round(P * r * r * r).toLocaleString('en-GB')],
        ['After how many whole years is it first worth less than half its original value?', 2, half],
        ['Explain why the graph of ' + M('V') + ' against ' + M('t') + ' never reaches zero, and why its gradient gets less steep.', 2, 'Each year it keeps ' + Math.round(r * 100) + '% of a smaller amount, so the drops get smaller but never finish']
      ]);
    },
    function () {
      var a = nz(-4, 4), b = nz(-4, 4), p = nz(-3, 3), q = nz(-3, 3);
      return Q('The curve ' + M('y = f(x)') + ' has a minimum point at ' + M('(' + a + ', ' + b + ')') + '.', [
        ['Find the minimum point of ' + M('y = f(x' + S(p) + ')') + '.', 1, M('(' + (a - p) + ', ' + b + ')')],
        ['Find the minimum point of ' + M('y = f(x)' + S(q)) + '.', 1, M('(' + a + ', ' + (b + q) + ')')],
        ['Find the turning point of ' + M('y = -f(x)') + ' and say whether it is a maximum or minimum.', 2, M('(' + a + ', ' + (-b) + ')') + ', a maximum'],
        ['Explain why ' + M('f(x' + S(p) + ')') + ' moves the graph the “opposite” way to what you might expect.', 1, 'The old value at ' + M('x = ' + a) + ' is now reached when ' + M('x' + S(p) + ' = ' + a)]
      ]);
    },
    function () {
      var k = ri(2, 12), c = ri(1, 6);
      var D = c * c + 4 * k, x1 = (-c + Math.sqrt(D)) / 2, x2 = (-c - Math.sqrt(D)) / 2;
      return Q('The curves ' + M('y = \\frac{' + k + '}{x}') + ' and ' + M('y = x + ' + c) + ' are sketched.', [
        ['State the asymptotes of ' + M('y = \\frac{' + k + '}{x}') + '.', 1, M('x = 0') + ' and ' + M('y = 0')],
        ['Show that the intersections satisfy ' + M('x^2 + ' + c1(c, 'x') + ' - ' + k + ' = 0') + '.', 1, 'Multiply ' + M('\\frac{' + k + '}{x} = x + ' + c) + ' by ' + M('x')],
        ['Find the ' + M('x') + '-coordinates of the intersections.', 2, M(sf3(x1)) + ' and ' + M(sf3(x2))],
        ['Explain why there are always two intersections, whatever positive values ' + M('k') + ' and ' + M('c') + ' take.', 1, 'Discriminant ' + M('c^2 + 4k > 0')]
      ]);
    }
  ]);

  X('fm-equations', [
    function () {
      var p, q; do { p = nz(-5, 5); q = nz(-5, 5); } while (p === q || p === -q);
      return Q('Solve simultaneously ' + M('x + y = ' + (p + q)) + ' and ' + M('x^2 + y^2 = ' + (p * p + q * q)) + '.', [
        ['Substitute and form a quadratic.', 2, M(poly([2, -2 * (p + q), (p + q) * (p + q) - p * p - q * q]) + ' = 0')],
        ['Solve to find both points.', 2, M('(' + p + ', ' + q + ')') + ' and ' + M('(' + q + ', ' + p + ')')],
        ['Find the length of the chord joining them.', 2, M('\\sqrt{' + 2 * (p - q) * (p - q) + '} = ' + sf3(Math.SQRT2 * Math.abs(p - q)))],
        ['Explain why the solutions are a reflection of each other.', 1, 'Both equations are unchanged when ' + M('x') + ' and ' + M('y') + ' swap, so the graph is symmetric in ' + M('y = x')]
      ]);
    },
    function () {
      var b = nz(-4, 4), m = nz(-3, 3), r1 = nz(-4, 4), r2; do { r2 = nz(-4, 4); } while (r2 === r1);
      var k = ri(-5, 5), bb = m - (r1 + r2), c0 = k + r1 * r2;
      return Q('Find where the line ' + M('y = ' + c1(m, 'x') + (k ? S(k) : '')) + ' meets ' + M('y = ' + poly([1, bb, c0])) + '.', [
        ['Form and solve a quadratic.', 3, M(poly([1, -(r1 + r2), r1 * r2]) + ' = 0') + ', ' + M('x = ' + r1) + ' or ' + M(r2)],
        ['Give the coordinates of both points.', 1, M('(' + r1 + ', ' + (m * r1 + k) + ')') + ', ' + M('(' + r2 + ', ' + (m * r2 + k) + ')')],
        ['Find the midpoint of the chord, and show its ' + M('x') + '-coordinate is half the sum of the roots.', 2, M('(' + num((r1 + r2) / 2) + ', ' + num((m * r1 + m * r2 + 2 * k) / 2) + ')')]
      ]);
    },
    function () {
      var a = ri(3, 12), b = ri(a + 1, 16);
      return Q('A rectangle has area ' + a * b + ' cm² and perimeter ' + 2 * (a + b) + ' cm.', [
        ['Form two equations and reduce them to a quadratic.', 3, M('x(' + (a + b) + ' - x) = ' + a * b) + ', ' + M(poly([1, -(a + b), a * b]) + ' = 0')],
        ['Find the dimensions.', 2, a + ' cm by ' + b + ' cm'],
        ['Explain why both solutions of the quadratic give the same rectangle.', 1, 'They are the two side lengths']
      ]);
    },
    function () {
      var r1 = ri(1, 6), r2; do { r2 = ri(1, 9); } while (r2 === r1);
      return Q('Solve ' + M('x + \\frac{' + r1 * r2 + '}{x} = ' + (r1 + r2)) + '.', [
        ['Rearrange to a quadratic.', 2, M(poly([1, -(r1 + r2), r1 * r2]) + ' = 0')],
        ['Solve it.', 2, M('x = ' + r1) + ' or ' + M('x = ' + r2)],
        ['For which values of ' + M('s') + ' does ' + M('x + \\frac{' + r1 * r2 + '}{x} = s') + ' have no real solutions?', 2, M('-' + (2 * Math.sqrt(r1 * r2) % 1 ? '2\\sqrt{' + r1 * r2 + '}' : 2 * Math.sqrt(r1 * r2)) + ' < s < ' + (2 * Math.sqrt(r1 * r2) % 1 ? '2\\sqrt{' + r1 * r2 + '}' : 2 * Math.sqrt(r1 * r2)))]
      ]);
    },
    function () {
      var a = ri(1, 3), x = ri(2, 6), base = pick([2, 3]);
      var k = Math.pow(base, a) + 1, rhs = k * Math.pow(base, x);
      return Q('Solve ' + M(base + '^{x + ' + a + '} + ' + base + '^x = ' + rhs) + '.', [
        ['Write the left side as a multiple of ' + M(base + '^x') + '.', 2, M(k + ' \\times ' + base + '^x')],
        ['Solve the equation.', 2, M(base + '^x = ' + Math.pow(base, x)) + ', ' + M('x = ' + x)],
        ['Explain why ' + M(base + '^{x + ' + a + '} + ' + base + '^x = 0') + ' has no solution.', 1, 'Powers of ' + base + ' are always positive']
      ]);
    },
    function () {
      var x = nz(-4, 4), y = nz(-4, 4), z = nz(-4, 4);
      return Q('Solve ' + M('x + y + z = ' + (x + y + z)) + ', ' + M('2x - y + z = ' + (2 * x - y + z)) + ', ' + M('x + 2y - z = ' + (x + 2 * y - z)) + '.', [
        ['Eliminate ' + M('z') + ' to get two equations in ' + M('x') + ' and ' + M('y') + '.', 3, M('x - 2y = ' + (x - 2 * y)) + ' and ' + M('2x + 3y = ' + (2 * x + 3 * y))],
        ['Solve completely.', 2, M('x = ' + x + ',\\ y = ' + y + ',\\ z = ' + z)],
        ['Explain why you need three equations to find three unknowns.', 1, 'Each equation removes one unknown; with fewer there are infinitely many solutions']
      ]);
    },
    function () {
      var x = nz(-6, 6), y = nz(-6, 6), P = x * y, Qv = x + 2 * y;
      return Q('Solve ' + M('xy = ' + P) + ' and ' + M('x + 2y = ' + Qv) + '.', [
        ['Substitute to form a quadratic in ' + M('y') + '.', 2, M(poly([2, -Qv, P]).replace(/x/g, 'y') + ' = 0')],
        ['Find both solutions.', 3, (function () { var D = Qv * Qv - 8 * P, ys = D >= 0 ? [(Qv + Math.sqrt(D)) / 4, (Qv - Math.sqrt(D)) / 4] : []; return ys.map(function (yy) { return M('(' + sf3(Qv - 2 * yy) + ', ' + sf3(yy) + ')'); }).join(' and '); })()],
        ['Interpret the solutions graphically.', 1, 'Where the line meets the hyperbola ' + M('y = \\frac{' + P + '}{x}')]
      ]);
    },
    function () {
      var set = pick([{ b: 3, u: { 4: [4, -1], '-2': [1, 2], 10: [5, -2], 18: [6, -3] } }, { b: 5, u: { 6: [6, -1], '-4': [1, 4], '-6': [2, 3], 14: [7, -2] } }]);
      var keys = Object.keys(set.u), u1 = +keys.splice(ri(0, 3), 1)[0], u2 = +pick(keys);
      var xs = set.u[u1].concat(set.u[u2]).sort(function (p, q) { return p - q; });
      return Q('Solve ' + M('(x^2 - ' + set.b + 'x)^2' + (u1 + u2 ? S(-(u1 + u2)).replace(/ 1$/, ' ') + '(x^2 - ' + set.b + 'x)' : '') + S(u1 * u2) + ' = 0') + '.', [
        ['Use the substitution ' + M('u = x^2 - ' + set.b + 'x') + ' and solve for ' + M('u') + '.', 2, M('u = ' + u1) + ' or ' + M('u = ' + u2)],
        ['Find all four values of ' + M('x') + '.', 3, M(xs.join(',\\ '))],
        ['Explain why expanding the brackets first would make the problem harder.', 1, 'It gives a quartic with no obvious factorisation']
      ]);
    }
  ]);

  X('fm-inequalities', [
    function () {
      var x0 = ri(2, 6), y0 = ri(2, 6), p = x0 + 2 * y0, q = 3 * x0 + y0, cx = ri(1, 5), cy = ri(1, 5);
      var V = [[0, 0], [q / 3, 0], [0, p / 2], [x0, y0]], best = V.reduce(function (b, v) { return cx * v[0] + cy * v[1] > cx * b[0] + cy * b[1] ? v : b; });
      return Q('A region ' + M('R') + ' is defined by ' + M('x \\ge 0,\\ y \\ge 0,\\ x + 2y \\le ' + p + ',\\ 3x + y \\le ' + q) + '.', [
        ['Find the coordinates of the vertices of ' + M('R') + '.', 3, M('(0, 0), (' + F(q, 3) + ', 0), (0, ' + F(p, 2) + '), (' + x0 + ', ' + y0 + ')')],
        ['Find the maximum value of ' + M('P = ' + c1(cx, 'x') + ' + ' + c1(cy, 'y')) + ' in ' + M('R') + '.', 2, sf3(cx * best[0] + cy * best[1]) + ' at ' + M('(' + sf3(best[0]) + ', ' + sf3(best[1]) + ')')],
        ['Explain why the maximum of a linear expression over such a region always occurs at a vertex.', 2, 'Lines ' + M('P = \\text{constant}') + ' are parallel; the last one to touch the region does so at a corner']
      ]);
    },
    function () {
      var a = ri(1, 5), b = a + ri(2, 6), c = ri(a + 1, b - 1);
      return Q('Solve ' + M('(x - ' + a + ')(' + b + ' - x) \\ge 0') + ' and ' + M('x < ' + c) + ' at the same time.', [
        ['Solve the quadratic inequality, explaining the effect of the ' + M('(' + b + ' - x)') + ' factor.', 3, M(a + ' \\le x \\le ' + b) + ': the graph is an upside-down parabola'],
        ['Combine with ' + M('x < ' + c) + '.', 1, M(a + ' \\le x < ' + c)],
        ['List the integers in the solution.', 1, (function () { var l = []; for (var i = a; i < c; i++) l.push(i); return l.join(', '); })()]
      ]);
    },
    function () {
      var a = ri(1, 6), b = ri(1, 6);
      return Q('Solve ' + M('\\frac{x + ' + a + '}{x - ' + b + '} < 0') + '.', [
        ['Explain why multiplying both sides by ' + M('(x - ' + b + ')') + ' is not safe.', 1, 'Its sign is unknown, so the inequality might need to flip'],
        ['Multiply both sides by ' + M('(x - ' + b + ')^2') + ' and solve.', 3, M('(x + ' + a + ')(x - ' + b + ') < 0') + ', so ' + M('-' + a + ' < x < ' + b)],
        ['Explain why ' + M('x = ' + b) + ' can never be included, even with ' + M('\\le') + '.', 1, 'The denominator is zero there, so the expression has no value']
      ]);
    },
    function () {
      var a = ri(1, 4), r = ri(3, 7);
      return Q('Find the values of ' + M('x') + ' that satisfy both ' + M('2x + ' + (2 * a + 1) + ' > ' + (4 * a + 1)) + ' and ' + M('x^2 < ' + r * r) + '.', [
        ['Solve each inequality.', 3, M('x > ' + a) + '; ' + M('-' + r + ' < x < ' + r)],
        ['Combine them on a number line.', 1, M(a + ' < x < ' + r)],
        ['How many integers satisfy both?', 1, r - a - 1]
      ]);
    },
    function () {
      var k = pick([4, 9, 16, 25, 2, 3]);
      return Q('For ' + M('x > 0') + ':', [
        ['By expanding ' + M('(\\sqrt{x} - \\frac{1}{\\sqrt{x}})^2 \\ge 0') + ', prove that ' + M('x + \\frac{1}{x} \\ge 2') + '.', 3, M('x - 2 + \\frac{1}{x} \\ge 0')],
        ['When does equality hold?', 1, M('x = 1')],
        ['Similarly show that ' + M('x + \\frac{' + k + '}{x}') + ' has minimum value ' + M(Math.sqrt(k) % 1 ? '2\\sqrt{' + k + '}' : 2 * Math.sqrt(k)) + ', and find where.', 3, 'Expand ' + M('\\left(\\sqrt{x} - \\frac{\\sqrt{' + k + '}}{\\sqrt{x}}\\right)^2 \\ge 0') + '; at ' + M('x = ' + (Math.sqrt(k) % 1 ? '\\sqrt{' + k + '}' : Math.sqrt(k)))]
      ]);
    },
    function () {
      var c = ri(3, 12), r = Math.floor(Math.sqrt(c)), cnt = 0;
      for (var x = -r; x <= r; x++) cnt += c - x * x + 1;
      return Q('The region ' + M('R') + ' is bounded by ' + M('y = x^2') + ' and ' + M('y = ' + c) + ' (including the boundaries).', [
        ['Write inequalities that describe ' + M('R') + '.', 2, M('y \\ge x^2') + ' and ' + M('y \\le ' + c)],
        ['How many points with integer coordinates lie in ' + M('R') + '? Explain your method.', 3, cnt + ': for each integer ' + M('x') + ' from ' + (-r) + ' to ' + r + ', count ' + M(c + ' - x^2 + 1') + ' values of ' + M('y')],
        ['Is the point ' + M('(' + (r + 1) + ', ' + c + ')') + ' in ' + M('R') + '? Explain.', 1, 'No: ' + M((r + 1) * (r + 1) + ' > ' + c)]
      ]);
    },
    function () {
      return Q('Prove inequalities using squares.', [
        ['Prove that ' + M('(a + b)^2 \\ge 4ab') + ' for all real ' + M('a, b') + '.', 2, M('(a + b)^2 - 4ab = (a - b)^2 \\ge 0')],
        ['Hence show that for positive numbers, the mean ' + M('\\frac{a + b}{2}') + ' is at least ' + M('\\sqrt{ab}') + '.', 2, 'Take square roots of ' + M('\\left(\\frac{a + b}{2}\\right)^2 \\ge ab')],
        ['Use this to show that a rectangle with perimeter 40 has area at most 100.', 2, M('\\frac{a + b}{2} = 10 \\ge \\sqrt{ab}') + ', so ' + M('ab \\le 100')]
      ]);
    },
    function () {
      var a = ri(3, 7), b = ri(3, 7), c = ri(1, Math.min(a, b) - 1);
      return Q('Solve ' + M(poly([1, a - b, -a * b]) + ' \\le 0') + ' and ' + M('x^2 \\ge ' + c * c) + ' together.', [
        ['Solve each inequality.', 3, M('-' + a + ' \\le x \\le ' + b) + '; ' + M('x \\le -' + c) + ' or ' + M('x \\ge ' + c)],
        ['Combine the solutions.', 2, M('-' + a + ' \\le x \\le -' + c) + ' or ' + M(c + ' \\le x \\le ' + b)],
        ['Explain why the answer is two separate intervals.', 1, 'The second inequality removes the middle part ' + M('-' + c + ' < x < ' + c)]
      ]);
    }
  ]);

  X('fm-indices', [
    function () {
      var k = ri(1, 5);
      return Q('Solve ' + M('4^x = 8^{x - ' + k + '}') + '.', [
        ['Write both sides as powers of 2.', 2, M('2^{2x} = 2^{3x - ' + 3 * k + '}')],
        ['Solve for ' + M('x') + '.', 1, M('x = ' + 3 * k)],
        ['Solve ' + M('9^{x + 1} = 27^{x}') + ' in the same way.', 2, M('2x + 2 = 3x') + ', ' + M('x = 2')]
      ]);
    },
    function () {
      return Q('Put ' + M('2^{30}') + ', ' + M('3^{20}') + ' and ' + M('5^{12}') + ' in order without a calculator.', [
        ['Write ' + M('2^{30}') + ' and ' + M('3^{20}') + ' as powers with index 10 and compare.', 2, M('8^{10} < 9^{10}')],
        ['Compare ' + M('5^{12}') + ' with ' + M('2^{30}') + '. (Hint: write both with index 6.)', 2, M('25^6 < 32^6')],
        ['State the order.', 1, M('5^{12} < 2^{30} < 3^{20}')]
      ]);
    },
    function () {
      var b = pick([2, 3]), m, n; do { m = ri(0, 3); n = ri(0, 3); } while (m === n);
      var s = Math.pow(b, m) + Math.pow(b, n), p = Math.pow(b, m + n);
      return Q('Solve ' + M(b * b + '^x - ' + s + ' \\times ' + b + '^x + ' + p + ' = 0') + '.', [
        ['Let ' + M('y = ' + b + '^x') + '. Show the equation becomes a quadratic in ' + M('y') + '.', 2, M(b * b + '^x = (' + b + '^x)^2') + ', so ' + M('y^2 - ' + s + 'y + ' + p + ' = 0')],
        ['Solve for ' + M('y') + ' and hence ' + M('x') + '.', 3, M('y = ' + Math.pow(b, m) + ', ' + Math.pow(b, n)) + '; ' + M('x = ' + Math.min(m, n) + ', ' + Math.max(m, n))],
        ['Explain why a negative value of ' + M('y') + ' would have to be rejected.', 1, M(b + '^x') + ' is always positive']
      ]);
    },
    function () {
      var a = ri(2, 7), k = ri(1, 3);
      return Q('Consider ' + M(a + '^{n + ' + k + '} - ' + a + '^n') + ' for positive integers ' + M('n') + '.', [
        ['Factorise the expression.', 2, M(a + '^n(' + a + '^{' + k + '} - 1)') + ' = ' + M((Math.pow(a, k) - 1) + ' \\times ' + a + '^n')],
        ['Hence prove it is always divisible by ' + (Math.pow(a, k) - 1) + '.', 1, 'It is ' + (Math.pow(a, k) - 1) + ' times an integer'],
        ['Is it always divisible by ' + a + '? Explain.', 1, 'Yes, for ' + M('n \\ge 1') + ', since ' + M(a + '^n') + ' is a multiple of ' + a]
      ]);
    },
    function () {
      var p = pick([[4, 9, 2], [16, 81, 2], [25, 4, 2], [9, 49, 2], [8, 27, 3], [27, 8, 3], [16, 81, 4]]), e = [String(ri(1, 3)), String(p[2])];
      var A = Math.round(Math.pow(p[0], 1 / p[2])), B = Math.round(Math.pow(p[1], 1 / p[2])), E = +e[0];
      return Q('Evaluate and explain.', [
        ['Find the exact value of ' + M('\\left(\\frac{' + p[0] + '}{' + p[1] + '}\\right)^{-\\frac{' + e[0] + '}{' + e[1] + '}}') + '.', 3, M(F(Math.pow(B, E), Math.pow(A, E)))],
        ['Explain what each part of the index does: the minus sign, the denominator, the numerator.', 2, 'Reciprocal; root; power'],
        ['Solve ' + M('x^{\\frac{3}{2}} = ' + Math.pow(A, 3)) + '.', 2, M('x = ' + A * A)]
      ]);
    },
    function () {
      var a = ri(2, 5), b = ri(1, 4), c = ri(2, 3), d = ri(1, 5), e = ri(1, 4);
      var px = a * c - d, py = b * c - e;
      return Q('Simplify ' + M('\\frac{(x^{' + a + '}y^{' + b + '})^{' + c + '}}{x^{' + d + '}y^{' + e + '}}') + '.', [
        ['Simplify fully.', 2, M('x^{' + px + '}y^{' + py + '}')],
        ['Find the value when ' + M('x = 2') + ' and ' + M('y = \\frac{1}{2}') + '.', 2, M(px - py >= 0 ? String(Math.pow(2, px - py)) : F(1, Math.pow(2, py - px)))],
        ['Find a value of ' + M('c') + ' (instead of ' + c + ') for which the answer has no ' + M('x') + ' term.', 1, M(F(d, a))]
      ]);
    },
    function () {
      var b = pick([7, 3, 2, 8]), N = ri(20, 99);
      var cyc = { 7: [7, 9, 3, 1], 3: [3, 9, 7, 1], 2: [2, 4, 8, 6], 8: [8, 4, 2, 6] }[b];
      return Q('Units digits of powers of ' + b + '.', [
        ['Write the units digits of ' + M(b + '^1') + ' to ' + M(b + '^8') + '.', 1, cyc.concat(cyc).join(', ')],
        ['Explain why the pattern repeats every 4.', 2, 'The units digit depends only on the previous units digit times ' + b],
        ['Find the units digit of ' + M(b + '^{' + N + '}') + '.', 2, cyc[(N - 1) % 4]]
      ]);
    },
    function () {
      var k = ri(10, 30), m = ri(3, k - 3);
      var digits = String(Math.pow(2, k - m)).length + m;
      return Q('Consider ' + M('N = 2^{' + k + '} \\times 5^{' + m + '}') + '.', [
        ['Write ' + M('N') + ' as ' + M('2^{p} \\times 10^{q}') + '.', 2, M('2^{' + (k - m) + '} \\times 10^{' + m + '}')],
        ['How many digits does ' + M('N') + ' have?', 2, digits],
        ['How many zeros does ' + M('N') + ' end in? Explain.', 1, m + ': each factor of 10 needs a 2 and a 5, and there are only ' + m + ' fives']
      ]);
    }
  ]);

  X('fm-proof', [
    function () {
      return Q('Consecutive integers.', [
        ['Prove that the sum of any three consecutive integers is a multiple of 3.', 2, M('n + (n + 1) + (n + 2) = 3(n + 1)')],
        ['Prove that the sum of four consecutive integers is never a multiple of 4.', 2, M('4n + 6 = 4(n + 1) + 2')],
        ['For which numbers ' + M('k') + ' is the sum of ' + M('k') + ' consecutive integers always a multiple of ' + M('k') + '? Make a conjecture.', 2, 'When ' + M('k') + ' is odd (the sum is ' + M('k') + ' times the middle number)']
      ]);
    },
    function () {
      var a = ri(1, 3);
      return Q('Odd squares.', [
        ['Prove that ' + M('(2n + 1)^2 - (2n - 1)^2') + ' is a multiple of 8.', 2, M('8n')],
        ['Prove that the square of any odd number is one more than a multiple of 8.', 3, M('(2n + 1)^2 = 4n(n + 1) + 1') + ', and ' + M('n(n + 1)') + ' is even'],
        ['Hence show that ' + M('(2n + ' + (2 * a + 1) + ')^2 - 1') + ' is divisible by 8.', 1, 'It is an odd square minus 1']
      ]);
    },
    function () {
      return Q('Divisibility.', [
        ['Prove that ' + M('n^2 - n') + ' is always even.', 2, M('n(n - 1)') + ' is a product of consecutive integers'],
        ['Prove that ' + M('n^3 - n') + ' is always a multiple of 6.', 3, M('(n - 1)n(n + 1)') + ' contains a multiple of 2 and a multiple of 3'],
        ['Is ' + M('n^3 - n') + ' always a multiple of 12? Prove or give a counterexample.', 1, 'No: ' + M('n = 2') + ' gives 6']
      ]);
    },
    function () {
      return Q('A student claims that ' + M('n^2 + n + 41') + ' is prime for every positive integer ' + M('n') + '.', [
        ['Check the claim for ' + M('n = 1, 2, 3') + '.', 1, '43, 47, 53: all prime'],
        ['Disprove the claim with a counterexample, explaining how you found it.', 2, M('n = 40') + ': ' + M('40^2 + 40 + 41 = 41^2') + '; or ' + M('n = 41') + ' makes every term a multiple of 41'],
        ['Explain why checking many cases cannot prove a statement like this.', 1, 'There may always be a case you have not checked']
      ]);
    },
    function () {
      var a = ri(1, 6);
      return Q('Let ' + M('n') + ' be an integer.', [
        ['Prove that ' + M('(n + ' + a + ')^2 - (n - ' + a + ')^2') + ' is a multiple of ' + 4 * a + '.', 2, M(4 * a + 'n')],
        ['Prove that the difference of two odd squares is a multiple of 8.', 3, M('(2m + 1)^2 - (2k + 1)^2 = 4m(m + 1) - 4k(k + 1)') + ', each a multiple of 8'],
        ['Find two odd squares that differ by 40.', 1, '49 and 9 (or 121 and 81)']
      ]);
    },
    function () {
      return Q('Odd and even.', [
        ['Prove that the product of two odd numbers is odd.', 2, M('(2m + 1)(2n + 1) = 2(2mn + m + n) + 1')],
        ['Prove that the sum of the squares of two consecutive integers is odd.', 2, M('n^2 + (n + 1)^2 = 2(n^2 + n) + 1')],
        ['Can the sum of the squares of two consecutive integers be a multiple of 4? Explain.', 1, 'No: it is odd'],
        ['Prove that if ' + M('n^2') + ' is even then ' + M('n') + ' is even.', 2, 'If ' + M('n') + ' were odd, ' + M('n^2') + ' would be odd (first part)']
      ]);
    },
    function () {
      var a = ri(1, 9), b; do { b = ri(0, 9); } while (b === a);
      return Q('Recurring decimals.', [
        ['Prove that ' + M('0.\\dot{' + a + '}\\dot{' + b + '} = \\frac{' + (10 * a + b) + '}{99}') + '.', 3, 'Let ' + M('x = 0.\\dot{' + a + '}\\dot{' + b + '}') + '; ' + M('100x - x = ' + (10 * a + b))],
        ['Simplify the fraction.', 1, M(F(10 * a + b, 99))],
        ['Prove that every two-digit repeating block ' + M('0.\\dot{p}\\dot{q}') + ' equals ' + M('\\frac{10p + q}{99}') + '.', 2, 'The same method with general digits']
      ]);
    },
    function () {
      return Q('Never a square.', [
        ['Prove that ' + M('n^2 < n^2 + n < (n + 1)^2') + ' for positive integers ' + M('n') + '.', 2, M('(n + 1)^2 = n^2 + 2n + 1 > n^2 + n')],
        ['Hence prove that ' + M('n(n + 1)') + ' is never a perfect square for ' + M('n \\ge 1') + '.', 2, 'It lies strictly between consecutive squares'],
        ['Is ' + M('n^2 + 2n') + ' ever a perfect square for ' + M('n \\ge 1') + '? Prove your answer.', 2, 'No: ' + M('n^2 < n^2 + 2n < (n + 1)^2')]
      ]);
    }
  ]);

  X('fm-sequences', [
    function () {
      var a = pick([1, 2, 3, -1]), b = nz(-6, 6), c = ri(-5, 8);
      var t = function (n) { return a * n * n + b * n + c; };
      var N = ri(8, 15);
      return Q('A sequence begins ' + [1, 2, 3, 4, 5].map(t).join(', ') + ', …', [
        ['Find the ' + M('n') + 'th term.', 3, M(poly([a, b, c]).replace(/x/g, 'n'))],
        ['Which term equals ' + t(N) + '?', 2, 'The ' + N + 'th'],
        ['Show that ' + (t(N) + (a > 0 ? 1 : -1)) + ' is not a term of the sequence.', 2, 'Solving gives a non-integer value of ' + M('n')]
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(1, 9), c = ri(1, 4), d = ri(1, 9);
      if (a * d === b * c) d++;
      return Q('The ' + M('n') + 'th term of a sequence is ' + M('\\frac{' + a + 'n + ' + b + '}{' + c1(c, 'n') + ' + ' + d + '}') + '.', [
        ['Find the first three terms.', 1, [1, 2, 3].map(function (n) { return M(F(a * n + b, c * n + d)); }).join(', ')],
        ['Find the limiting value as ' + M('n \\to \\infty') + ', explaining your method.', 2, M(F(a, c)) + ': divide top and bottom by ' + M('n')],
        ['Is the sequence increasing or decreasing? Justify.', 2, (a * d - b * c > 0 ? 'Increasing' : 'Decreasing') + ': the terms move towards ' + M(F(a, c)) + ' from ' + (a * d - b * c > 0 ? 'below' : 'above')]
      ]);
    },
    function () {
      var a = ri(2, 9), d = ri(2, 7), n = ri(15, 40);
      return Q('An arithmetic sequence has first term ' + a + ' and common difference ' + d + '.', [
        ['Find the ' + n + 'th term.', 1, a + (n - 1) * d],
        ['Show that the sum of the first ' + M('n') + ' terms is ' + M('\\frac{n}{2}(2a + (n - 1)d)') + ' by writing the sum forwards and backwards.', 3, 'Each pair adds to ' + M('2a + (n - 1)d') + ', and there are ' + M('n') + ' pairs, counted twice'],
        ['Find the sum of the first ' + n + ' terms.', 1, n * (2 * a + (n - 1) * d) / 2]
      ]);
    },
    function () {
      var k = pick([0.5, 0.2, 0.25, 0.8]), c = ri(2, 9), u1 = ri(1, 20);
      var L = c / (1 - k), u = [u1]; for (var i = 0; i < 3; i++) u.push(k * u[i] + c);
      return Q('A sequence is defined by ' + M('u_{n + 1} = ' + k + 'u_n + ' + c) + ' with ' + M('u_1 = ' + u1) + '.', [
        ['Find ' + M('u_2, u_3, u_4') + '.', 2, u.slice(1).map(sf3).join(', ')],
        ['The sequence tends to a limit ' + M('L') + '. Explain why ' + M('L = ' + k + 'L + ' + c) + ', and find ' + M('L') + '.', 3, M('L = ' + sf3(L))],
        ['Explain why the limit does not depend on ' + M('u_1') + '.', 1, 'The difference from ' + M('L') + ' is multiplied by ' + k + ' each time, so it shrinks to 0']
      ]);
    },
    function () {
      var k = ri(1, 3);
      return Q('The ' + M('n') + 'th term of a sequence is ' + M('n^2 + ' + (2 * k - 1) + 'n') + '.', [
        ['Write the first four terms.', 1, [1, 2, 3, 4].map(function (n) { return n * n + (2 * k - 1) * n; }).join(', ')],
        ['Prove that every term is even.', 2, M('n(n + ' + (2 * k - 1) + ')') + ': one of ' + M('n') + ' and ' + M('n + ' + (2 * k - 1)) + ' is even'],
        ['Find the difference between consecutive terms and show that it increases by 2 each time.', 2, M('2n + ' + 2 * k)]
      ]);
    },
    function () {
      var a = nz(-4, 4), r = pick([2, 3, -2]);
      return Q('A geometric sequence has 3rd term ' + a * r * r + ' and 6th term ' + a * Math.pow(r, 5) + '.', [
        ['Find the common ratio.', 2, M('r^3 = ' + Math.pow(r, 3)) + ', ' + M('r = ' + r)],
        ['Find the first term and the ' + M('n') + 'th term.', 2, a + '; ' + M(a + ' \\times ' + (r < 0 ? '(' + r + ')' : r) + '^{n - 1}')],
        ['If you were told the 2nd and 4th terms instead, explain why there could be two possible sequences.', 1, M('r^2') + ' would have two square roots']
      ]);
    },
    function () {
      var p = pick([3, 4]), q = pick([5, 7]), a = ri(1, p - 1), b = ri(1, q - 1);
            return Q('Sequence A has ' + M('n') + 'th term ' + M(p + 'n + ' + a) + ' and sequence B has ' + M(q + 'n + ' + b) + '.', [
        ['List the first eight terms of each.', 1, 'A: ' + [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) { return p * n + a; }).join(', ') + '; B: ' + [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) { return q * n + b; }).join(', ')],
        ['Find the first number in both sequences.', 2, (function () { for (var v = 1; v < 300; v++) if ((v - a) % p === 0 && (v - a) / p >= 1 && (v - b) % q === 0 && (v - b) / q >= 1) return v; })()],
        ['Explain why the common terms form a sequence with difference ' + p * q + ', and find its ' + M('n') + 'th term.', 3, (function () { var v; for (v = 1; v < 300; v++) if ((v - a) % p === 0 && (v - a) / p >= 1 && (v - b) % q === 0 && (v - b) / q >= 1) break; return 'A step must be a multiple of both ' + p + ' and ' + q + '; ' + M(p * q + 'n' + S(v - p * q)); })()]
      ]);
    },
    function () {
      var a = ri(1, 5);
      return Q('The sequence ' + M('u_n = n^2 + ' + a + 'n') + ' is considered.', [
        ['Find the ' + M('n') + 'th term of the sequence of differences ' + M('u_{n + 1} - u_n') + '.', 2, M('2n + ' + (a + 1))],
        ['Find the first term of ' + M('u_n') + ' that exceeds 1000.', 2, (function () { for (var n = 1; ; n++) if (n * n + a * n > 1000) return 'The ' + n + 'th: ' + (n * n + a * n); })()],
        ['Explain why the second differences of any quadratic sequence ' + M('an^2 + bn + c') + ' are ' + M('2a') + '.', 2, 'First differences are ' + M('a(2n + 1) + b') + ', which go up by ' + M('2a')]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
