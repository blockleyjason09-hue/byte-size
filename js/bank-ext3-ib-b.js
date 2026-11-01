/* Byte Size Classroom — deeper extension questions (set 3, IB Applications and Interpretation part b): systems and polynomials, straight lines, functions, graphs, modelling. Shared between SL and HL. */
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
  function P(x, y) { return '(' + x + ', ' + y + ')'; }
  function line(m, c) { return 'y = ' + c1(m, 'x') + S0(c); }
  function xm(v) { return v ? '(x' + S(-v) + ')' : 'x'; }

  X(['sl-systems', 'ib-systems'], [
    function () {
      var a = ri(8, 15), c = ri(4, 8), s = ri(5, 10), na = ri(50, 150), nc = ri(30, 100), ns = ri(20, 60);
      return Q('A cinema sells adult, child and senior tickets. On three days:', [
        ['Day 1: ' + (na) + ' adult, ' + nc + ' child, ' + ns + ' senior, total $' + (na * a + nc * c + ns * s) + '. Day 2: ' + (na - 10) + ', ' + (nc + 20) + ', ' + (ns + 5) + ', total $' + ((na - 10) * a + (nc + 20) * c + (ns + 5) * s) + '. Day 3: ' + (na + 15) + ', ' + (nc - 10) + ', ' + (ns - 10) + ', total $' + ((na + 15) * a + (nc - 10) * c + (ns - 10) * s) + '. Write a system of equations.', 2, 'Three linear equations in the three prices'],
        ['Use technology to find the prices.', 2, 'Adult $' + a + ', child $' + c + ', senior $' + s],
        ['Find the takings from 100 of each ticket.', 1, '$' + 100 * (a + c + s)]
      ]);
    },
    function () {
      var r = [nz(-3, 3), nz(-3, 3), nz(-3, 3)], k = pick([1, 2, -1]);
      var f = function (x) { return k * (x - r[0]) * (x - r[1]) * (x - r[2]); };
      var xs = [-1, 0, 1, 2];
      return Q('A cubic passes through ' + xs.map(function (x) { return M(P(x, f(x))); }).join(', ') + '.', [
        ['Set up a system of equations for ' + M('y = ax^3 + bx^2 + cx + d') + '.', 2, 'Four linear equations in ' + M('a, b, c, d')],
        ['Use technology to find the cubic.', 2, M('y = ' + poly([k, -k * (r[0] + r[1] + r[2]), k * (r[0] * r[1] + r[1] * r[2] + r[0] * r[2]), -k * r[0] * r[1] * r[2]]))],
        ['Find its roots.', 1, r.slice().sort(function (p, q) { return p - q; }).join(', ')]
      ]);
    },
    function () {
      var a = ri(1, 3);
      return Q('Consider ' + M('f(x) = x^3 - ' + 3 * a * a + 'x') + '.', [
        ['Use technology to find the local maximum and minimum values.', 2, (2 * a * a * a) + ' and ' + (-2 * a * a * a)],
        ['For which values of ' + M('k') + ' does ' + M('f(x) = k') + ' have three solutions?', 2, M((-2 * a * a * a) + ' < k < ' + 2 * a * a * a)],
        ['How many solutions are there when ' + M('k = ' + 2 * a * a * a) + '?', 1, 2]
      ]);
    },
    function () {
      var x = ri(10, 40), y = ri(10, 40), p1 = pick([2, 3]), p2 = pick([5, 6]);
      return Q('A café sells small coffees at $' + p1 + ' and large at $' + p2 + '. One morning it sold ' + (x + y) + ' coffees for $' + (p1 * x + p2 * y) + '.', [
        ['Write two equations.', 2, M('s + l = ' + (x + y)) + ', ' + M(p1 + 's + ' + p2 + 'l = ' + (p1 * x + p2 * y))],
        ['Solve them.', 2, x + ' small and ' + y + ' large'],
        ['What total would make the problem impossible with whole numbers of coffees?', 1, 'Any total that gives a non-integer solution, e.g. $' + (p1 * x + p2 * y + 1)]
      ]);
    },
    function () {
      var k = ri(1, 9);
      return Q('Consider ' + M('2x + 4y = 6') + ' and ' + M('x + 2y = ' + k) + '.', [
        ['Explain why there is no solution unless ' + M('k = 3') + '.', 2, 'The lines are parallel; they coincide only if ' + M('k = 3')],
        ['How many solutions are there when ' + M('k = 3') + '?', 1, 'Infinitely many'],
        ['What does technology report in each case?', 1, 'No solution, or infinitely many solutions']
      ]);
    },
    function () {
      var a = -ri(2, 5), b = ri(10, 20), c = ri(1, 5);
      var f = function (t) { return a * t * t + b * t + c; };
      return Q('A ball’s height is ' + f(1) + ' m at ' + M('t = 1') + ', ' + f(2) + ' m at ' + M('t = 2') + ' and ' + f(3) + ' m at ' + M('t = 3') + '.', [
        ['Find a quadratic model ' + M('h = at^2 + bt + c') + '.', 3, M('h = ' + poly([a, b, c]).replace(/x/g, 't'))],
        ['Find the maximum height.', 1, sf3(c - b * b / (4 * a)) + ' m'],
        ['When does the ball land?', 1, sf3((-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)) + ' s']
      ]);
    },
    function () {
      var r = [ri(-4, -1), ri(1, 3), ri(4, 6)];
      var c3 = -(r[0] + r[1] + r[2]), c2 = r[0] * r[1] + r[1] * r[2] + r[0] * r[2], c0 = -r[0] * r[1] * r[2];
      return Q('Solve ' + M(poly([1, c3, c2, c0]) + ' = 0') + ' using technology.', [
        ['State the roots.', 1, r.join(', ')],
        ['Check that their sum is ' + (-c3) + ' and their product is ' + (-c0) + '.', 1, 'Yes'],
        ['Solve ' + M(poly([1, c3, c2, c0]) + ' > 0') + '.', 2, M(r[0] + ' < x < ' + r[1]) + ' or ' + M('x > ' + r[2])]
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(3, 9), c = ri(1, 5);
      return Q('A shop sells pens, notebooks and rulers. 2 pens, 1 notebook and 3 rulers cost $' + (2 * a + b + 3 * c) + '; 1 pen, 2 notebooks and 1 ruler cost $' + (a + 2 * b + c) + '; 3 pens and 2 rulers cost $' + (3 * a + 2 * c) + '.', [
        ['Write the system.', 2, 'Three equations in ' + M('p, n, r')],
        ['Solve it.', 2, 'Pen $' + a + ', notebook $' + b + ', ruler $' + c],
        ['How much do 5 of each cost?', 1, '$' + 5 * (a + b + c)]
      ]);
    },
    function () {
      return Q('Use technology to solve ' + M('x^3 > 4x') + '.', [
        ['Find where ' + M('x^3 = 4x') + '.', 1, M('x = -2, 0, 2')],
        ['Solve the inequality.', 2, M('-2 < x < 0') + ' or ' + M('x > 2')],
        ['Explain why dividing by ' + M('x') + ' would give a wrong answer.', 1, M('x') + ' can be negative, which reverses the inequality, and ' + M('x = 0') + ' is lost']
      ]);
    },
    function () {
      var a = ri(5, 15), b = ri(5, 15), c = ri(5, 15);
      return Q('A jar has 10c, 20c and 50c coins: ' + (a + b + c) + ' coins worth $' + ((10 * a + 20 * b + 50 * c) / 100).toFixed(2) + ', with ' + (b - a >= 0 ? (b - a) + ' more 20c than 10c coins' : (a - b) + ' fewer 20c than 10c coins') + '.', [
        ['Write a system of three equations.', 2, M('x + y + z = ' + (a + b + c)) + ', ' + M('10x + 20y + 50z = ' + (10 * a + 20 * b + 50 * c)) + ', ' + M('y - x = ' + (b - a))],
        ['Solve it.', 2, a + ', ' + b + ', ' + c]
      ]);
    }
  ]);

  X(['sl-lines', 'ib-lines'], [
    function () {
      var ax = ri(-4, 0), ay = ri(-2, 4), bx = ax + 2 * ri(1, 4), by = ay + 2 * nz(-3, 3);
      var mx = (ax + bx) / 2, my = (ay + by) / 2;
      return Q('Points ' + M('A' + P(ax, ay)) + ' and ' + M('B' + P(bx, by)) + ' are given.', [
        ['Find the midpoint and the gradient of ' + M('AB') + '.', 2, M(P(mx, my)) + ', ' + M(F(by - ay, bx - ax))],
        ['Find the perpendicular bisector in the form ' + M('ax + by + d = 0') + '.', 3, M(c1(bx - ax, 'x') + S(by - ay).replace(/ 1$/, ' ') + 'y' + S0(-(bx - ax) * mx - (by - ay) * my) + ' = 0')],
        ['Explain what every point on this line has in common.', 1, 'It is the same distance from ' + M('A') + ' and ' + M('B')]
      ]);
    },
    function () {
      var f = ri(200, 600), v = ri(5, 20), p = v + ri(5, 20);
      return Q('A company has fixed costs of $' + f + ' and costs of $' + v + ' per item. Items sell for $' + p + '.', [
        ['Write the cost and revenue as functions of ' + M('n') + '.', 2, M('C = ' + f + ' + ' + v + 'n') + ', ' + M('R = ' + p + 'n')],
        ['Find the break-even point.', 2, M('n = ' + sf3(f / (p - v)))],
        ['Interpret the gradients.', 1, 'Cost per item and price per item']
      ]);
    },
    function () {
      var x1 = ri(-5, 5), y1 = ri(-5, 5), x2, y2; do { x2 = ri(-5, 5); y2 = ri(-5, 5); } while (x2 === x1);
      var a = y2 - y1, b = x1 - x2, c = -(a * x1 + b * y1), gg = Math.abs(gcd(gcd(a, b), c)) || 1;
      if (a < 0 || (a === 0 && b < 0)) gg = -gg;
      return Q('Find the line through ' + M(P(x1, y1)) + ' and ' + M(P(x2, y2)) + '.', [
        ['Find the gradient.', 1, M(F(y2 - y1, x2 - x1))],
        ['Write the equation in the form ' + M('ax + by + d = 0') + ' with integers.', 2, M((a / gg ? c1(a / gg, 'x') : '') + (b / gg ? (a / gg ? (b / gg < 0 ? ' - ' + c1(-b / gg, 'y') : ' + ' + c1(b / gg, 'y')) : c1(b / gg, 'y')) : '') + S0(c / gg) + ' = 0')],
        ['Find where it crosses the axes.', 2, (a ? M(P(F(-c, a), 0)) : 'Parallel to the x-axis') + (b ? ', ' + M(P(0, F(-c, b))) : ', parallel to the y-axis')]
      ]);
    },
    function () {
      var m1 = nz(-3, 3), c1v = ri(-5, 5), m2 = m1 + nz(-2, 2) || 4, c2v = ri(-5, 5);
      var x = (c2v - c1v) / (m1 - m2), y = m1 * x + c1v;
      return Q('Lines ' + M('L_1: ' + line(m1, c1v)) + ' and ' + M('L_2: ' + line(m2, c2v)) + '.', [
        ['Find their point of intersection.', 2, M(P(sf3(x), sf3(y)))],
        ['Find the equation of the line through this point parallel to ' + M('y = 2x') + '.', 1, M('y = 2x' + S0(+(y - 2 * x).toFixed(3)))],
        ['Are ' + M('L_1') + ' and ' + M('L_2') + ' perpendicular?', 1, m1 * m2 === -1 ? 'Yes' : 'No: ' + M(m1 + ' \\times ' + (m2 < 0 ? '(' + m2 + ')' : m2) + ' \\ne -1')]
      ]);
    },
    function () {
      var m = nz(-2, 2), c = ri(-3, 3), px = ri(-4, 4), py = ri(-4, 4);
      if (py === m * px + c) py++;
      var fx = (px + m * py - m * c) / (1 + m * m), fy = m * fx + c;
      return Q('Find the foot of the perpendicular from ' + M(P(px, py)) + ' to ' + M(line(m, c)) + '.', [
        ['Find the perpendicular line through the point.', 2, M('y' + S0(-py) + ' = ' + cf(F(-1, m), '') + (px ? '(x' + S(-px) + ')' : 'x'))],
        ['Find the foot.', 2, M(P(sf3(fx), sf3(fy)))],
        ['Find the shortest distance from the point to the line.', 1, sf3(Math.hypot(px - fx, py - fy))]
      ]);
    },
    function () {
      var m = pick([0.6, 1.2, 2.5, -0.8]), c = ri(10, 40);
      return Q('A model for the height of a plant is ' + M('h = ' + c + (m < 0 ? ' - ' + (-m) : ' + ' + m) + 't') + ' cm, where ' + M('t') + ' is in days.', [
        ['Interpret the gradient and the intercept.', 2, 'Growth of ' + m + ' cm per day; initial height ' + c + ' cm'],
        ['Find when the height is ' + (c + 30) + ' cm.', 1, m > 0 ? sf3(30 / m) + ' days' : 'Never: the model decreases'],
        ['Give one limitation of a linear model here.', 1, 'Plants do not grow at a constant rate forever']
      ]);
    },
    function () {
      var m = nz(-2, 2), c = ri(-3, 3), x1 = ri(-4, 0), x3 = ri(3, 6), x2 = ri(1, 2);
      return Q('The points ' + M(P(x1, m * x1 + c)) + ', ' + M(P(x2, 'k')) + ' and ' + M(P(x3, m * x3 + c)) + ' are collinear.', [
        ['Find the equation of the line through the first and third points.', 2, M(line(m, c))],
        ['Find ' + M('k') + '.', 1, m * x2 + c],
        ['Describe a method using gradients to check collinearity.', 1, 'The gradients between each pair must be equal']
      ]);
    },
    function () {
      var V = ri(20, 50) * 1000, n = ri(5, 10), R = ri(2, 6) * 1000;
      var d = (V - R) / n;
      return Q('A machine bought for $' + V.toLocaleString('en-GB') + ' is worth $' + R.toLocaleString('en-GB') + ' after ' + n + ' years, depreciating linearly.', [
        ['Find the equation of value against time.', 2, M('V = ' + V + ' - ' + sf3(d) + 't')],
        ['Interpret the gradient.', 1, 'The value falls by $' + sf3(d) + ' per year'],
        ['When would the model give a value of zero?', 1, sf3(V / d) + ' years']
      ]);
    },
    function () {
      var a = [ri(-4, 0), ri(-3, 1)], b = [ri(3, 6), ri(-2, 2)], c = [ri(-1, 4), ri(4, 7)];
      var area = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;
      return Q('A triangle has vertices ' + M(P(a[0], a[1]) + ', ' + P(b[0], b[1]) + ', ' + P(c[0], c[1])) + '.', [
        ['Find the gradients of the three sides.', 2, [[a, b], [b, c], [a, c]].map(function (p) { return p[1][0] === p[0][0] ? 'undefined (vertical)' : M(F(p[1][1] - p[0][1], p[1][0] - p[0][0])); }).join(', ').replace('undefined (vertical)', 'vertical')],
        ['Is it right-angled? Explain.', 1, (function () { var g = [[a, b], [b, c], [a, c]].map(function (p) { return [p[1][0] - p[0][0], p[1][1] - p[0][1]]; }); var r = g.some(function (u, i) { return g.some(function (v, j) { return i < j && u[0] * v[0] + u[1] * v[1] === 0; }); }); return r ? 'Yes: two gradients multiply to −1' : 'No: no two gradients multiply to −1'; })()],
        ['Find its area.', 2, num(area)]
      ]);
    },
    function () {
      var a = ri(1, 5), b = ri(1, 5);
      return Q('A line has ' + M('x') + '-intercept ' + a + ' and ' + M('y') + '-intercept ' + b + '.', [
        ['Find its gradient and equation.', 2, M(F(-b, a)) + '; ' + M('\\frac{x}{' + a + '} + \\frac{y}{' + b + '} = 1')],
        ['Find the area of the triangle it makes with the axes.', 1, num(a * b / 2)],
        ['Find the equation of the parallel line through the origin.', 1, M('y = ' + cf(F(-b, a), 'x'))]
      ]);
    }
  ]);

  X(['sl-functions', 'ib-functions'], [
    function () {
      var a = ri(1, 6), b = ri(-4, 4);
      return Q(M('f(x) = \\sqrt{x - ' + a + '}' + S0(b)) + '.', [
        ['State the domain and range.', 2, M('x \\ge ' + a) + ', ' + M('f(x) \\ge ' + b)],
        ['Find ' + M('f^{-1}(x)') + ' and its domain.', 2, M('f^{-1}(x) = ' + (b ? '(x' + S(-b) + ')^2' : 'x^2') + ' + ' + a) + ', ' + M('x \\ge ' + b)],
        ['Solve ' + M('f(x) = ' + (b + 3)) + '.', 1, M('x = ' + (a + 9))]
      ]);
    },
    function () {
      var a = nz(-4, 4), b = ri(2, 5);
      return Q(M('f(x) = ' + c1(b, 'x') + S(a)) + ' and ' + M('g(x) = x^2') + '.', [
        ['Find ' + M('(f \\circ g)(x)') + ' and ' + M('(g \\circ f)(x)') + '.', 2, M(c1(b, 'x^2') + S(a)) + ' and ' + M('(' + c1(b, 'x') + S(a) + ')^2')],
        ['Solve ' + M('(f \\circ g)(x) = (g \\circ f)(x)') + ' using technology or algebra.', 3, (function () { var A = b * b - b, B = 2 * a * b, Cc = a * a - a, D = B * B - 4 * A * Cc; if (D < 0) return 'No real solutions'; return [(-B + Math.sqrt(D)) / (2 * A), (-B - Math.sqrt(D)) / (2 * A)].map(sf3).join(', '); })()],
        ['Find ' + M('f^{-1}(x)') + '.', 1, M('\\frac{x' + S(-a) + '}{' + b + '}')]
      ]);
    },
    function () {
      var base = ri(3, 6), k = pick([1.5, 2, 2.5]), b = ri(2, 5);
      return Q('A taxi charges $' + base + ' for the first ' + b + ' km and $' + k + ' per km after that.', [
        ['Write the cost ' + M('C(d)') + ' as a piecewise function.', 2, M('C = ' + base) + ' for ' + M('0 < d \\le ' + b) + '; ' + M('C = ' + base + ' + ' + k + '(d - ' + b + ')') + ' for ' + M('d > ' + b)],
        ['Find the cost of a 12 km journey.', 1, '$' + num(base + k * (12 - b))],
        ['How far can you travel for $30?', 1, sf3(b + (30 - base) / k) + ' km']
      ]);
    },
    function () {
      return Q('Temperature conversion: ' + M('F = 1.8C + 32') + '.', [
        ['Find the inverse function ' + M('C(F)') + '.', 1, M('C = \\frac{F - 32}{1.8}')],
        ['Find the temperature that is the same in both scales.', 2, '−40'],
        ['Explain the meaning of the gradient 1.8.', 1, 'A rise of 1 °C is a rise of 1.8 °F']
      ]);
    },
    function () {
      var h = nz(-3, 3), k = ri(-4, 4), a = pick([1, 2, -1]);
      var f = function (x) { return a * (x - h) * (x - h) + k; };
      var lo = h - 2, hi = h + 3;
      return Q(M('f(x) = ' + c1(a, xm(h) + '^2') + S0(k)) + ' for ' + M(lo + ' \\le x \\le ' + hi) + '.', [
        ['Find the range.', 2, a > 0 ? M(k + ' \\le f(x) \\le ' + f(hi)) : M(f(hi) + ' \\le f(x) \\le ' + k)],
        ['Explain why ' + M('f') + ' has no inverse on this domain.', 1, 'It is not one-to-one: e.g. ' + M('f(' + (h - 1) + ') = f(' + (h + 1) + ')')],
        ['Suggest a domain on which it would have an inverse.', 1, M(h + ' \\le x \\le ' + hi)]
      ]);
    },
    function () {
      var a = ri(1, 6), b = nz(-3, 3), c = nz(-3, 3);
      return Q(M('f(x) = \\frac{' + a + '}{x' + S(-b) + '}' + S(c)) + '.', [
        ['State the asymptotes, domain and range.', 3, M('x = ' + b + ',\\ y = ' + c) + '; ' + M('x \\ne ' + b) + '; ' + M('f(x) \\ne ' + c)],
        ['Find ' + M('f^{-1}(x)') + '.', 2, M('f^{-1}(x) = \\frac{' + a + '}{x' + S(-c) + '}' + S(b))],
        ['Explain how the asymptotes of ' + M('f^{-1}') + ' relate to those of ' + M('f') + '.', 1, 'They are swapped (reflection in ' + M('y = x') + ')']
      ]);
    },
    function () {
      var P0 = ri(100, 500), r = pick([1.1, 1.2, 0.9]);
      return Q('A population is modelled by ' + M('P(t) = ' + P0 + ' \\times ' + r + '^t') + ' for ' + M('0 \\le t \\le 20') + ' years.', [
        ['Find the range of ' + M('P') + ' for this domain.', 2, r > 1 ? M(P0 + ' \\le P \\le ' + sf3(P0 * Math.pow(r, 20))) : M(sf3(P0 * Math.pow(r, 20)) + ' \\le P \\le ' + P0)],
        ['Explain why the domain is restricted.', 1, 'The model is only valid for the period studied'],
        ['Find ' + M('P^{-1}(' + P0 * 2 + ')') + ' and interpret.', 1, r > 1 ? sf3(Math.log(2) / Math.log(r)) + ': years to double' : 'Not in range: the population falls']
      ]);
    },
    function () {
      var k = ri(2, 9);
      return Q('Self-inverse functions.', [
        ['Show that ' + M('f(x) = ' + k + ' - x') + ' is its own inverse.', 1, M('f(f(x)) = ' + k + ' - (' + k + ' - x) = x')],
        ['Show that ' + M('g(x) = \\frac{' + k + '}{x}') + ' is its own inverse.', 1, M('g(g(x)) = x')],
        ['What feature do their graphs share?', 1, 'Symmetry in the line ' + M('y = x')]
      ]);
    },
    function () {
      var xs = [1, 2, 3, 4], ys = [ri(1, 9), ri(1, 9), ri(1, 9), ri(1, 9)];
      var oneone = new Set(ys).size === 4;
      return Q('A function is defined by the table: ' + xs.map(function (x, i) { return M('f(' + x + ') = ' + ys[i]); }).join(', ') + '.', [
        ['Does ' + M('f') + ' have an inverse? Explain.', 1, oneone ? 'Yes: each output comes from one input' : 'No: some output is repeated'],
        ['Find ' + M('f(f(1))') + ' if possible.', 1, xs.indexOf(ys[0]) >= 0 ? ys[xs.indexOf(ys[0])] : 'Not defined: ' + ys[0] + ' is not in the domain'],
        ['State the range.', 1, '{' + Array.from(new Set(ys)).sort(function (p, q) { return p - q; }).join(', ') + '}']
      ]);
    },
    function () {
      var b = pick([2, 10, 'e']);
      return Q('Consider ' + M('f(x) = ' + b + '^x') + '.', [
        ['State its inverse.', 1, M(b === 'e' ? '\\ln x' : '\\log_{' + b + '} x')],
        ['State the domain and range of the inverse.', 2, M('x > 0') + '; all real numbers'],
        ['Solve ' + M(b + '^x = 7') + '.', 1, M('x = ' + (b === 'e' ? '\\ln 7' : '\\log_{' + b + '} 7') + ' = ' + sf3(Math.log(7) / Math.log(b === 'e' ? Math.E : b)))]
      ]);
    }
  ]);

  X(['sl-graphs', 'ib-graphs'], [
    function () {
      return Q('Solve ' + M('x^2 = 2^x') + ' using technology.', [
        ['Find all solutions.', 2, M('x = 2, 4') + ' and ' + M('x \\approx -0.767')],
        ['For which ' + M('x') + ' is ' + M('2^x > x^2') + '?', 2, M('-0.767 < x < 2') + ' or ' + M('x > 4')],
        ['Explain why ' + M('2^x') + ' eventually stays above ' + M('x^2') + '.', 1, 'Exponential growth eventually beats any polynomial']
      ]);
    },
    function () {
      var a = ri(1, 5), b = nz(-3, 3), c = ri(1, 4);
      return Q('Consider ' + M('y = \\frac{' + c1(c, 'x') + ' + ' + a + '}{x' + S(-b) + '}') + '.', [
        ['State the vertical and horizontal asymptotes.', 2, M('x = ' + b) + ', ' + M('y = ' + c)],
        ['Find the intercepts.', 2, M(P(F(-a, c), 0)) + (b ? ', ' + M(P(0, F(a, -b))) : '')],
        ['Explain why the graph never crosses ' + M('y = ' + c) + '.', 1, 'Setting ' + M('y = ' + c) + ' gives ' + M(a + ' = ' + (-c * b)) + (a === -c * b ? ' — the function simplifies' : ', which is false')]
      ]);
    },
    function () {
      var r = [ri(-4, -1), ri(0, 2), ri(3, 5)];
      var f = function (x) { return (x - r[0]) * (x - r[1]) * (x - r[2]); };
      var p = [3, -2 * (r[0] + r[1] + r[2]), r[0] * r[1] + r[1] * r[2] + r[0] * r[2]];
      var D = p[1] * p[1] - 4 * p[0] * p[2], t1 = (-p[1] - Math.sqrt(D)) / 6, t2 = (-p[1] + Math.sqrt(D)) / 6;
      return Q('Consider ' + M('y = ' + r.map(function (v) { return xm(v); }).join('')) + '.', [
        ['State the zeros and the ' + M('y') + '-intercept.', 2, r.join(', ') + '; ' + f(0)],
        ['Use technology to find the local maximum and minimum.', 2, M(P(sf3(t1), sf3(f(t1)))) + ' and ' + M(P(sf3(t2), sf3(f(t2))))],
        ['For which ' + M('k') + ' does ' + M('y = k') + ' meet the curve once?', 1, M('k < ' + sf3(f(t2))) + ' or ' + M('k > ' + sf3(f(t1)))]
      ]);
    },
    function () {
      var a = pick([2, 3]), h = nz(-3, 3), k = ri(-5, 5);
      return Q('Sketch ' + M('y = ' + a + xm(h) + '^2' + S0(k)) + '.', [
        ['State the vertex and axis of symmetry.', 2, M(P(h, k)) + ', ' + M('x = ' + h)],
        ['Find the ' + M('y') + '-intercept.', 1, a * h * h + k],
        ['Find the zeros, if any.', 2, k < 0 ? M('x = ' + h + ' \\pm \\sqrt{' + F(-k, a) + '}') : k === 0 ? M('x = ' + h) : 'None']
      ]);
    },
    function () {
      var a = ri(2, 5);
      return Q('Consider ' + M('f(x) = x^4 - ' + 2 * a * a + 'x^2') + '.', [
        ['Use technology to find the turning points.', 2, M('(0, 0)') + ', ' + M('(\\pm ' + a + ', ' + (-a * a * a * a) + ')')],
        ['Find the number of solutions of ' + M('f(x) = k') + ' for ' + M((-a * a * a * a) + ' < k < 0') + '.', 1, 4],
        ['Explain the symmetry of the graph.', 1, 'Only even powers: symmetric in the ' + M('y') + '-axis']
      ]);
    },
    function () {
      return Q('Consider ' + M('f(x) = e^{-0.2x}\\sin x') + ' for ' + M('0 \\le x \\le 20') + '.', [
        ['Describe the shape of the graph.', 1, 'A sine wave whose height decreases'],
        ['Use technology to find the first local maximum.', 2, M(P(sf3(Math.atan(5)), sf3(Math.exp(-0.2 * Math.atan(5)) * Math.sin(Math.atan(5)))))],
        ['How many zeros are there in the interval?', 1, 7]
      ]);
    },
    function () {
      var a = nz(-3, 3), b = ri(1, 5);
      return Q('Consider ' + M('f(x) = \\ln(x' + S(-a) + ')' + S(b)) + '.', [
        ['State the domain and the vertical asymptote.', 2, M('x > ' + a) + ', ' + M('x = ' + a)],
        ['Find the ' + M('x') + '-intercept.', 2, M('x = ' + a + ' + e^{-' + b + '} \\approx ' + sf3(a + Math.exp(-b)))],
        ['Describe the transformation from ' + M('y = \\ln x') + '.', 1, 'Translation by ' + M('\\begin{pmatrix}' + a + '\\\\' + b + '\\end{pmatrix}')]
      ]);
    },
    function () {
      var n = pick([3, 5, 10]);
      return Q('Compare ' + M('y = x^{' + n + '}') + ' and ' + M('y = 2^x') + ' for ' + M('x > 0') + '.', [
        ['Use technology to find where they intersect for ' + M('x > 1') + '.', 2, (function () { var lo = 2, hi = 100; for (var i = 0; i < 100; i++) { var m = (lo + hi) / 2; if (Math.pow(2, m) > Math.pow(m, n)) hi = m; else lo = m; } return sf3(lo); })()],
        ['Which is larger for large ' + M('x') + '?', 1, M('2^x')],
        ['Explain why graphing on a small window can mislead.', 1, 'The exponential only overtakes beyond the window']
      ]);
    },
    function () {
      var a = pick([1, 2, 4]);
      return Q('Consider ' + M('y = \\frac{1}{x^2 + ' + a + '}') + '.', [
        ['Find the maximum value and where it occurs.', 2, M(F(1, a)) + ' at ' + M('x = 0')],
        ['State the horizontal asymptote.', 1, M('y = 0')],
        ['Explain why there is no vertical asymptote.', 1, 'The denominator is never zero']
      ]);
    },
    function () {
      var A = ri(2, 5), B = pick([2, 3]), C = ri(-2, 3);
      return Q('Consider ' + M('y = ' + A + '\\sin(' + B + 'x)' + S0(C)) + ' with ' + M('x') + ' in degrees.', [
        ['Find the period, amplitude and principal axis.', 2, (360 / B) + '°, ' + A + ', ' + M('y = ' + C)],
        ['Find the maximum and minimum values.', 1, (A + C) + ' and ' + (C - A)],
        ['How many solutions has ' + M('y = ' + C) + ' for ' + M('0 \\le x \\le 360') + '?', 1, 2 * B + 1]
      ]);
    }
  ]);

  X(['sl-models', 'ib-models'], [
    function () {
      var a = ri(2, 10), r = pick([1.5, 2]);
      var ys = [0, 1, 2, 3].map(function (x) { return +(a * Math.pow(r, x)).toFixed(1); });
      return Q('Data: ' + M('x = 0, 1, 2, 3') + ' and ' + M('y = ' + ys.join(', ')) + '.', [
        ['Explain why an exponential model fits better than a linear one.', 1, 'The ratios of consecutive values are constant (' + r + '), not the differences'],
        ['Write the model.', 2, M('y = ' + a + ' \\times ' + r + '^x')],
        ['Predict ' + M('y') + ' at ' + M('x = 6') + ' and comment.', 1, sf3(a * Math.pow(r, 6)) + '; extrapolation is uncertain']
      ]);
    },
    function () {
      var hi = ri(20, 30), lo = ri(0, 10), peak = ri(6, 8);
      var a = (hi - lo) / 2, d = (hi + lo) / 2;
      return Q('Average monthly temperature varies between ' + lo + '°C and ' + hi + '°C, peaking in month ' + peak + '. Model: ' + M('T = a\\cos(30(t - c)) + d') + ' (degrees).', [
        ['Find ' + M('a, c, d') + '.', 3, M('a = ' + num(a) + ',\\ c = ' + peak + ',\\ d = ' + num(d))],
        ['Explain why the coefficient is 30.', 1, 'Period 12 months: ' + M('\\frac{360}{12} = 30')],
        ['For how many months is it above ' + num(d) + '°C?', 1, 6]
      ]);
    },
    function () {
      var k = ri(2, 5), x0 = ri(2, 4);
      return Q('The variable ' + M('y') + ' varies inversely as the square of ' + M('x') + '. When ' + M('x = ' + x0) + ', ' + M('y = ' + k) + '.', [
        ['Find the model.', 2, M('y = \\frac{' + k * x0 * x0 + '}{x^2}')],
        ['Find ' + M('y') + ' when ' + M('x') + ' is doubled.', 1, M(F(k, 4))],
        ['Give a physical example of an inverse square law.', 1, 'Light intensity or gravitational force with distance']
      ]);
    },
    function () {
      var L = ri(20, 40);
      var x = (4 * L - Math.sqrt(16 * L * L - 12 * L * L)) / 12, V = x * (L - 2 * x) * (L - 2 * x);
      return Q('Squares of side ' + M('x') + ' cm are cut from a ' + L + ' cm square sheet to make an open box.', [
        ['Write the volume as a cubic model.', 1, M('V = x(' + L + ' - 2x)^2')],
        ['State a suitable domain.', 1, M('0 < x < ' + L / 2)],
        ['Use technology to find the maximum volume.', 2, sf3(V) + ' cm³ at ' + M('x = ' + sf3(x))]
      ]);
    },
    function () {
      var D = ri(100, 500), k = pick([0.1, 0.15, 0.2]);
      return Q('After a dose of ' + D + ' mg, the amount of drug is ' + M('A = ' + D + 'e^{-' + k + 't}') + ' after ' + M('t') + ' hours.', [
        ['Find the amount after 6 hours.', 1, sf3(D * Math.exp(-6 * k)) + ' mg'],
        ['A second dose is needed when the amount falls below 25% of ' + D + ' mg. When?', 2, sf3(Math.log(4) / k) + ' hours'],
        ['What does ' + M('k') + ' represent?', 1, 'The proportional rate of elimination']
      ]);
    },
    function () {
      var H = ri(3, 6), d = ri(5, 8), p = pick([12, 12.4]);
      return Q('The depth of water in a harbour is ' + M('h = ' + H + '\\cos(' + sf3(360 / p) + 't) + ' + d) + ' metres, ' + M('t') + ' hours after midnight.', [
        ['Find the maximum and minimum depths.', 1, (d + H) + ' and ' + (d - H) + ' m'],
        ['A boat needs at least ' + d + ' m. For how long each cycle can it enter?', 2, sf3(p / 2) + ' hours'],
        ['Find the first time after midnight the depth is ' + (d - H / 2) + ' m.', 2, sf3(p / 3) + ' hours']
      ]);
    },
    function () {
      var a = ri(20, 50), b = ri(3, 8), c = ri(10, 20);
      return Q('A phone plan costs $' + a + ' per month including ' + c + ' GB, then $' + b + ' per extra GB.', [
        ['Write the monthly cost as a piecewise model.', 2, M('C = ' + a) + ' for ' + M('g \\le ' + c) + '; ' + M('C = ' + a + ' + ' + b + '(g - ' + c + ')') + ' otherwise'],
        ['Another plan costs $' + (a + 20) + ' with unlimited data. When is it cheaper?', 2, 'When more than ' + sf3(c + 20 / b) + ' GB are used'],
        ['Explain why the cost function is continuous but not smooth.', 1, 'The gradient jumps from 0 to ' + b + ' at ' + c + ' GB']
      ]);
    },
    function () {
      var a = pick([1.5, 2, 2.5]), b = ri(2, 10);
      var data = [1, 2, 3, 4].map(function (x) { return +(a * x + b + pick([-0.3, 0.2, 0.4, -0.1])).toFixed(1); });
      return Q('A linear model ' + M('y = ' + a + 'x + ' + b) + ' is fitted to data ' + data.map(function (y, i) { return M(P(i + 1, y)); }).join(', ') + '.', [
        ['Find the residuals.', 2, data.map(function (y, i) { return sf3(y - (a * (i + 1) + b)); }).join(', ')],
        ['Find the sum of the squared residuals.', 1, sf3(data.reduce(function (s, y, i) { return s + Math.pow(y - (a * (i + 1) + b), 2); }, 0))],
        ['Explain how this measures the fit.', 1, 'Smaller values mean the model is closer to the data']
      ]);
    },
    function () {
      var r = ri(10, 30), c = r + ri(2, 5), T = ri(10, 30);
      return Q('A Ferris wheel of radius ' + r + ' m has its centre ' + c + ' m above the ground and turns once every ' + T + ' minutes. A seat starts at the bottom.', [
        ['Write a model for the height ' + M('h') + ' after ' + M('t') + ' minutes.', 3, M('h = ' + c + ' - ' + r + '\\cos\\left(' + sf3(360 / T) + 't\\right)')],
        ['Find the height after ' + num(T / 4) + ' minutes.', 1, c + ' m'],
        ['For what fraction of each turn is the seat above ' + c + ' m?', 1, 'Half']
      ]);
    },
    function () {
      return Q('Choosing a model.', [
        ['Data increase by roughly the same amount each step. Which model?', 1, 'Linear'],
        ['Data increase by roughly the same percentage each step. Which model?', 1, 'Exponential'],
        ['Data rise and fall regularly. Which model?', 1, 'Sinusoidal'],
        ['Data rise to a maximum then fall, symmetrically. Which model?', 1, 'Quadratic']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
