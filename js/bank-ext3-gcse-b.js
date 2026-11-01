/* Byte Size Classroom — deeper extension questions (set 3b): GCSE / International GCSE algebra topics (part 1). */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function xm(v) { return v ? '(x' + sg(-v) + ')' : 'x'; }
  function lin(m, c, v) { v = v || 'x'; return (m === 0 ? '' : c1(m, v)) + (c ? (m === 0 ? String(c) : sg(c)) : (m === 0 ? '0' : '')); }

  X('expand-factorise', [
    function () {
      var a = nz(-5, 5), b = nz(-5, 5), c = nz(-5, 5);
      var co = [1, -(a + b + c), a * b + b * c + a * c, -a * b * c];
      return Q('', [
        ['Expand and simplify ' + M(xm(a) + xm(b) + xm(c)) + '.', 3, M(poly(co))],
        ['Without expanding again, write down the value of the expression when ' + M('x = ' + a) + ', and explain.', 1, '0, because one bracket is zero'],
        ['Use your expansion to show that the sum of the solutions of ' + M(poly(co) + ' = 0') + ' is ' + (a + b + c) + '.', 2, 'The ' + M('x^2') + ' coefficient is ' + M('-(a + b + c)') + ', and the roots are ' + a + ', ' + b + ', ' + c]
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(1, 9);
      return Q('', [
        ['Factorise ' + M(a * a + 'x^2 - ' + b * b) + ' and ' + M(a * a + 'x^2 - ' + 2 * a * b + 'x + ' + b * b) + '.', 3, M('(' + a + 'x - ' + b + ')(' + a + 'x + ' + b + ')') + ' and ' + M('(' + a + 'x - ' + b + ')^2')],
        ['Hence simplify ' + M('\\frac{' + a * a + 'x^2 - ' + b * b + '}{' + a * a + 'x^2 - ' + 2 * a * b + 'x + ' + b * b + '}') + '.', 2, M('\\frac{' + a + 'x + ' + b + '}{' + a + 'x - ' + b + '}')],
        ['Find the value of ' + M('x') + ' for which the simplified fraction equals 3.', 2, M(a + 'x + ' + b + ' = 3(' + a + 'x - ' + b + ')') + ', ' + M('x = ' + F(4 * b, 2 * a))]
      ]);
    },
    function () {
      var n = ri(10, 99); if (n % 10 === 0) n++;
      return Q('', [
        ['Use ' + M('(a + b)^2 = a^2 + 2ab + b^2') + ' to work out ' + M(n + '^2') + ' mentally, showing your method.', 2, M('(' + (n - n % 10) + ' + ' + n % 10 + ')^2 = ' + (n - n % 10) * (n - n % 10) + ' + ' + 2 * (n - n % 10) * (n % 10) + ' + ' + (n % 10) * (n % 10) + ' = ' + n * n)],
        ['Prove that a number ending in 5, squared, ends in 25.', 3, M('(10k + 5)^2 = 100k^2 + 100k + 25 = 100k(k + 1) + 25')],
        ['Hence explain why ' + M('(10k + 5)^2') + ' always starts with the digits of ' + M('k(k + 1)') + '.', 1, 'It equals ' + M('100 \\times k(k + 1) + 25')]
      ]);
    },
    function () {
      var a = ri(2, 5), b = nz(-6, 6), c = nz(-6, 6);
      var p = a, q = b, r = 1, s2 = c; // (px + q)(rx + s)
      return Q('', [
        ['Factorise ' + M(poly([p * r, p * s2 + q * r, q * s2])) + '.', 3, M('(' + poly([p, q]) + ')(' + poly([r, s2]) + ')')],
        ['Hence solve ' + M(poly([p * r, p * s2 + q * r, q * s2]) + ' = 0') + '.', 1, M('x = ' + F(-q, p) + '\\text{ or } x = ' + (-s2))],
        ['Explain how the factorised form shows where the graph of ' + M('y = ' + poly([p * r, p * s2 + q * r, q * s2])) + ' crosses the ' + M('x') + '-axis.', 1, 'At the roots, where each bracket is zero']
      ]);
    },
    function () {
      var n = ri(2, 6);
      return Q('', [
        ['Show that ' + M('(n + 1)^3 - n^3 = 3n^2 + 3n + 1') + '.', 2, 'Expand ' + M('(n + 1)^3 = n^3 + 3n^2 + 3n + 1')],
        ['Hence prove that the difference between two consecutive cube numbers is always odd.', 2, M('3n^2 + 3n = 3n(n + 1)') + ' is even, so adding 1 gives an odd number'],
        ['Find two consecutive cubes that differ by ' + (3 * n * n + 3 * n + 1) + '.', 1, M(n + '^3') + ' and ' + M((n + 1) + '^3')]
      ]);
    },
    function () {
      var a = ri(2, 7);
      return Q('', [
        ['Factorise fully ' + M('x^4 - ' + Math.pow(a, 4)) + '.', 3, M('(x - ' + a + ')(x + ' + a + ')(x^2 + ' + a * a + ')')],
        ['Explain why ' + M('x^2 + ' + a * a) + ' cannot be factorised further using real numbers.', 1, 'It is always positive, so it has no real roots.'],
        ['Hence solve ' + M('x^4 = ' + Math.pow(a, 4)) + '.', 1, M('x = \\pm ' + a)]
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(1, 4);
      return Q('A rectangle has sides ' + M('(x + ' + a + ')') + ' and ' + M('(x + ' + b + ')') + '. A square has side ' + M('(x + ' + ((a + b) / 2) + ')') + '.', [
        ['Find, in terms of ' + M('x') + ', the area of each shape.', 2, M(poly([1, a + b, a * b])) + ' and ' + M(poly([1, a + b, (a + b) * (a + b) / 4]))],
        ['Prove that the square always has the larger area (unless ' + M('a = b') + '), and find the difference.', 3, 'Difference ' + M('\\frac{(a + b)^2}{4} - ab = \\frac{(a - b)^2}{4} = ' + num((a - b) * (a - b) / 4)) + ' ≥ 0'],
        ['Explain why both shapes have the same perimeter.', 1, M('2(2x + a + b)') + ' for both']
      ]);
    },
    function () {
      var k = ri(2, 5);
      return Q('', [
        ['Expand ' + M('(x + \\frac{1}{x})^2') + '.', 1, M('x^2 + 2 + \\frac{1}{x^2}')],
        ['Given that ' + M('x + \\frac{1}{x} = ' + k) + ', find ' + M('x^2 + \\frac{1}{x^2}') + ' without finding ' + M('x') + '.', 2, M(k * k - 2)],
        ['Find ' + M('x^4 + \\frac{1}{x^4}') + '.', 2, M('(' + (k * k - 2) + ')^2 - 2 = ' + ((k * k - 2) * (k * k - 2) - 2))]
      ]);
    }
  ]);

  X('linear-equations', [
    function () {
      var x = ri(3, 15), a = ri(2, 5), b = ri(2, 5), c = ri(1, 10);
      return (function () {
        var x0 = ri(10, 25), p = ri(2, 4), q = ri(1, 3), r = 180 - (p + q + 1) * x0;
        while (r <= 5) { x0 -= 2; r = 180 - (p + q + 1) * x0; }
        return Q('The angles of a triangle are ' + M('(' + p + 'x)°') + ', ' + M('(' + c1(q, 'x') + ' + ' + r + ')°') + ' and ' + M('x°') + '.', [
          ['Form and solve an equation to find ' + M('x') + '.', 3, M((p + q + 1) + 'x + ' + r + ' = 180') + ', ' + M('x = ' + x0)],
          ['Find the largest angle and classify the triangle.', 2, Math.max(p * x0, q * x0 + r, x0) + '°; ' + (Math.max(p * x0, q * x0 + r, x0) > 90 ? 'obtuse' : Math.max(p * x0, q * x0 + r, x0) === 90 ? 'right-angled' : 'acute')],
          ['Find the range of values of ' + M('x') + ' for which all three expressions could be angles of a triangle (ignoring the sum).', 2, M('x > 0') + ' (and each less than 180)']
        ]);
      })();
    },
    function () {
      var a = ri(2, 6), d = ri(2, 6), n = ri(4, 8), sum = n * a + d * n * (n - 1) / 2;
      return Q(n + ' consecutive terms of the sequence ' + M('x, x + ' + d + ', x + ' + 2 * d + ', \\ldots') + ' add up to ' + sum + '.', [
        ['Show that ' + M(n + 'x + ' + d * n * (n - 1) / 2 + ' = ' + sum) + '.', 2, 'Adding: ' + M(n + 'x + ' + d + '(0 + 1 + \\cdots + ' + (n - 1) + ')')],
        ['Find ' + M('x') + '.', 1, M('x = ' + a)],
        ['Prove that the sum of any 5 consecutive integers is divisible by 5.', 2, M('n + (n + 1) + \\cdots + (n + 4) = 5n + 10 = 5(n + 2)')]
      ]);
    },
    function () {
      var c = ri(20, 50), p = ri(5, 15), q = ri(20, 60), r = ri(2, 4), x = (q - c) / (p - r);
      var v1 = ri(2, 6), f1 = ri(20, 40), v2 = v1 + ri(2, 6), f2 = ri(2, f1 - 5), m = (f1 - f2) / (v2 - v1);
      return Q('Taxi company A charges £' + f1 + ' plus £' + v1 + ' per mile. Company B charges £' + f2 + ' plus £' + v2 + ' per mile.', [
        ['Find the distance for which the two companies charge the same.', 3, M(f1 + ' + ' + v1 + 'd = ' + f2 + ' + ' + v2 + 'd') + ', ' + M('d = ' + sf3(m)) + ' miles'],
        ['For what distances is company A cheaper?', 1, M('d > ' + sf3(m)) + ' miles'],
        ['Explain what the two parts of each formula represent on a graph of cost against distance.', 2, 'The fixed charge is the ' + M('y') + '-intercept; the cost per mile is the gradient.']
      ]);
    },
    function () {
      var a = ri(2, 5), b = ri(2, 7), c = ri(1, 9), d = ri(1, 9), x = ri(-5, 8);
      while ((a * x + c) % b !== 0) c++; var R = (a * x + c) / b;
      var left = '\\frac{' + a + 'x + ' + c + '}{' + b + '}';
      return Q('', [
        ['Solve ' + M(left + ' = ' + R) + '.', 2, M('x = ' + x)],
        ['Solve ' + M(left + ' = \\frac{x + ' + d + '}{2}') + '.', 3, M('2(' + a + 'x + ' + c + ') = ' + b + '(x + ' + d + ')') + ', ' + M('x = ' + F(b * d - 2 * c, 2 * a - b)) + (2 * a === b ? ' (no solution)' : '')],
        ['For what value of ' + M('k') + ' does ' + M(left + ' = \\frac{x + k}{2}') + ' have no solution, if any? Explain.', 2, 2 * a === b ? 'Every value of ' + M('k') + ' except ' + F(2 * c, b) + ' gives no solution' : 'None: the ' + M('x') + ' terms never cancel, so there is always one solution']
      ]);
    },
    function () {
      var s = ri(2, 6), h = ri(30, 60);
      return (function () {
        var a = ri(10, 20), b = a + ri(4, 10), age = ri(8, 15), k = ri(2, 4);
        var y = (b - k * a);
        // mother is b, child is a? use: mother is k times child's age now; in y years mother will be ... keep simple
        var c0 = ri(5, 12), m0 = k * c0, y2 = ri(4, 12), ratio = (m0 + y2) / (c0 + y2);
        return Q('A mother is ' + k + ' times as old as her son. In ' + y2 + ' years, the sum of their ages will be ' + (m0 + c0 + 2 * y2) + '.', [
          ['Form and solve an equation to find their ages now.', 3, M(k + 'x + x + ' + 2 * y2 + ' = ' + (m0 + c0 + 2 * y2)) + ': son ' + c0 + ', mother ' + m0],
          ['How many years ago was the mother ' + (k + 1) + ' times as old as her son?', 3, M(m0 + ' - t = ' + (k + 1) + '(' + c0 + ' - t)') + ', ' + M('t = ' + F((k + 1) * c0 - m0, k)) + ' years'],
          ['Explain why the ratio of their ages gets closer to 1 over time.', 2, 'The difference stays ' + (m0 - c0) + ' years while both ages grow, so the difference becomes small compared with the ages.']
        ]);
      })();
    },
    function () {
      var n = ri(3, 8), pr = ri(2, 5);
      return Q('I think of a number, add ' + n + ', multiply by ' + pr + ', subtract ' + 2 * n + ' and get the same answer as when I multiply my number by ' + (pr + 1) + '.', [
        ['Form an equation and find the number.', 3, M(pr + '(x + ' + n + ') - ' + 2 * n + ' = ' + (pr + 1) + 'x') + ', ' + M('x = ' + (pr * n - 2 * n))],
        ['Change one number in the puzzle so that every number works. Explain your choice.', 2, 'Multiply by ' + pr + ' at the end instead of ' + (pr + 1) + ', and subtract ' + pr * n + ': then both sides are ' + M(pr + 'x') + '.']
      ]);
    },
    function () {
      var w = ri(3, 9), l = w + ri(2, 8), P = 2 * (w + l);
      return Q('A rectangle’s length is ' + (l - w) + ' cm more than its width. Its perimeter is ' + P + ' cm.', [
        ['Find its dimensions.', 2, w + ' cm by ' + l + ' cm'],
        ['The length and width are each increased by ' + M('k') + ' cm and the perimeter becomes ' + (P + 12) + ' cm. Find ' + M('k') + '.', 2, M('k = 3')],
        ['Find the increase in area, and explain why it is not ' + M('k^2') + '.', 2, ((w + 3) * (l + 3) - w * l) + ' cm²: the strips along each side add area too']
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(1, 9), c = ri(1, 9);
      return Q('', [
        ['Solve ' + M('\\frac{' + a + '}{x} + \\frac{' + b + '}{2x} = ' + c) + '.', 3, M('\\frac{' + (2 * a + b) + '}{2x} = ' + c) + ', ' + M('x = ' + F(2 * a + b, 2 * c))],
        ['Explain why ' + M('x = 0') + ' can never be a solution of this type of equation.', 1, 'Division by zero is not defined.'],
        ['Find ' + M('c') + ' so that the solution is ' + M('x = ' + (2 * a + b)) + '.', 1, M('c = \\frac{1}{2}')]
      ]);
    }
  ]);

  X('inequalities', [
    function () {
      var a = ri(2, 5), b = ri(1, 9), c = ri(10, 30);
      var hi = Math.floor((c - b) / a);
      return Q('', [
        ['Find the largest integer ' + M('n') + ' that satisfies ' + M(a + 'n + ' + b + ' < ' + c) + '.', 2, M('n < ' + F(c - b, a)) + ': ' + M('n = ' + ((c - b) % a === 0 ? hi - 1 : hi))],
        ['Find all positive integers ' + M('n') + ' for which both ' + M(a + 'n + ' + b + ' < ' + c) + ' and ' + M('n^2 > ' + (a + 3)) + '.', 3, (function () { var r = []; for (var n = 1; n < 50; n++) if (a * n + b < c && n * n > a + 3) r.push(n); return r.join(', ') || 'none'; })()],
        ['Represent the solution of ' + M(a + 'x + ' + b + ' < ' + c) + ' on a number line, explaining your choice of circle.', 1, 'Open circle at ' + sf3((c - b) / a) + ', arrow to the left']
      ]);
    },
    function () {
      var p = ri(1, 4), q = p + ri(2, 5);
      return Q('', [
        ['Solve ' + M('(x - ' + p + ')(x - ' + q + ') < 0') + '.', 2, M(p + ' < x < ' + q)],
        ['Solve ' + M('(x - ' + p + ')(x - ' + q + ') \\ge 0') + ' and explain how a sketch helps.', 3, M('x \\le ' + p + '\\text{ or } x \\ge ' + q) + '; the parabola is above or on the axis outside the roots'],
        ['How many integers satisfy ' + M('(x - ' + p + ')(x - ' + q + ') < 0') + '?', 1, (q - p - 1)]
      ]);
    },
    function () {
      var a = ri(2, 6);
      return Q('A rectangular pen is ' + M('x') + ' m wide and ' + M('(x + ' + a + ')') + ' m long. Fencing is limited, so the perimeter must be at most 40 m, and the area must be at least 20 m².', [
        ['Write two inequalities in ' + M('x') + '.', 2, M('4x + ' + 2 * a + ' \\le 40') + ' and ' + M('x^2 + ' + a + 'x \\ge 20')],
        ['Find the range of possible widths.', 4, M(sf3((-a + Math.sqrt(a * a + 80)) / 2) + ' \\le x \\le ' + num((40 - 2 * a) / 4))]
      ]);
    },
    function () {
      var m1 = 1, c1v = ri(1, 3), c2 = ri(6, 10);
      var pts = []; for (var x = -5; x <= 10; x++) for (var y = -5; y <= 10; y++) if (y > x - c1v && y + x <= c2 && y >= 0 && x >= 0) pts.push([x, y]);
      var best = pts.reduce(function (b, p) { var v = 2 * p[0] + 3 * p[1]; return v > b[0] ? [v, p] : b; }, [-1e9, null]);
      return Q('The region ' + M('R') + ' satisfies ' + M('y > x - ' + c1v) + ', ' + M('x + y \\le ' + c2) + ', ' + M('x \\ge 0') + ' and ' + M('y \\ge 0') + '.', [
        ['Sketch ' + M('R') + ', using a dashed line for the strict inequality.', 3, 'Dashed ' + M('y = x - ' + c1v) + ', solid ' + M('x + y = ' + c2) + ' and axes'],
        ['How many points with integer coordinates lie in ' + M('R') + '?', 2, pts.length],
        ['Find the point in ' + M('R') + ' with integer coordinates that maximises ' + M('2x + 3y') + '.', 2, M('(' + best[1].join(', ') + ')') + ' giving ' + best[0]]
      ]);
    },
    function () {
      return Q('', [
        ['Solve ' + M('-3 < 2x + 1 \\le 9') + '.', 2, M('-2 < x \\le 4')],
        ['Show that the solution of ' + M('|x - 1| < 3') + ' means the same as ' + M('-2 < x < 4') + ', and explain using distance on a number line.', 2, 'The distance from ' + M('x') + ' to 1 is less than 3'],
        ['Write ' + M('-2 < x \\le 4') + ' as the intersection of two simpler inequalities.', 1, M('x > -2') + ' and ' + M('x \\le 4')]
      ]);
    },
    function () {
      var a = ri(2, 4), b = ri(5, 12), N = ri(8, 12), budget = ri(a * N + 2 * (b - a), b * N - 1), lim = (budget - a * N) / (b - a), best = Math.ceil(lim) - 1;
      return Q('Tickets cost £' + a + ' for children and £' + b + ' for adults. A group of ' + N + ' people must spend less than £' + budget + ' in total.', [
        ['Write an inequality for the number of adults, ' + M('n') + '.', 2, M(b + 'n + ' + a + '(' + N + ' - n) < ' + budget)],
        ['Find the greatest number of adults.', 2, M('n < ' + F(budget - a * N, b - a)) + ': ' + best + ' adults']
      ]);
    },
    function () {
      return Q('', [
        ['Show that ' + M('x^2 - 6x + 10 = (x - 3)^2 + 1') + '.', 1, 'Expand'],
        ['Hence explain why ' + M('x^2 - 6x + 10 > 0') + ' for all values of ' + M('x') + '.', 2, 'A square is never negative, so the expression is at least 1'],
        ['Find the values of ' + M('k') + ' for which ' + M('x^2 - 6x + k > 0') + ' for all ' + M('x') + '.', 2, M('(x - 3)^2 + k - 9 > 0') + ' always when ' + M('k > 9')]
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(2, 6);
      return Q('', [
        ['Explain why ' + M('x^2 > ' + a * a) + ' does not mean ' + M('x > ' + a) + '.', 1, 'Negative values like ' + M(-a - 1) + ' also satisfy it'],
        ['Solve ' + M('x^2 > ' + a * a) + ' and ' + M('x^2 \\le ' + b * b) + ' together.', 3, a < b ? M('-' + b + ' \\le x < -' + a + '\\text{ or } ' + a + ' < x \\le ' + b) : 'No solutions'],
        ['How many integers satisfy both?', 1, a < b ? 2 * (b - a) : 0]
      ]);
    }
  ]);

  X('sequences', [
    function () {
      var a = ri(2, 8), d = ri(2, 6), b = ri(30, 60), e = -ri(2, 5), n = Math.ceil((b - a) / (d - e));
      while (a + (n - 1) * d <= b + (n - 1) * e) n++;
      return Q('Sequence P starts ' + a + ', ' + (a + d) + ', ' + (a + 2 * d) + ', … and sequence Q starts ' + b + ', ' + (b + e) + ', ' + (b + 2 * e) + ', …', [
        ['Find the ' + M('n') + 'th term of each sequence.', 2, M(lin(d, a - d, 'n')) + ' and ' + M(lin(e, b - e, 'n'))],
        ['Find the first term at which P is greater than Q.', 3, 'Term ' + n + ': P = ' + (a + (n - 1) * d) + ', Q = ' + (b + (n - 1) * e)],
        ['Is there a term number at which they are equal? Explain.', 2, (b - a) % (d - e) === 0 ? 'Yes, term ' + ((b - a) / (d - e) + 1) : 'No: ' + M(lin(d - e, a - b, 'n') + ' = 0') + ' has no whole-number solution']
      ]);
    },
    function () {
      var r = pick([2, 3]), a = ri(2, 5);
      return Q('A geometric sequence starts ' + a + ', ' + a * r + ', ' + a * r * r + ', …', [
        ['Write a formula for the ' + M('n') + 'th term.', 2, M(a + ' \\times ' + r + '^{n-1}')],
        ['Find the first term greater than 10 000.', 2, (function () { var n = 1; while (a * Math.pow(r, n - 1) <= 10000) n++; return 'Term ' + n + ': ' + a * Math.pow(r, n - 1); })()],
        ['Explain why a geometric sequence with ratio ' + r + ' eventually overtakes any arithmetic sequence.', 2, 'Its increases grow each time, while an arithmetic sequence always increases by the same amount.']
      ]);
    },
    function () {
      var a = ri(1, 3), b = ri(-4, 4), c = ri(-5, 5), t = [1, 2, 3, 4, 5].map(function (n) { return a * n * n + b * n + c; });
      return Q('The first five terms of a sequence are ' + t.join(', ') + '.', [
        ['Show that the sequence is quadratic and find its ' + M('n') + 'th term.', 4, 'Second differences ' + 2 * a + '; ' + M(poly([a, b, c], 'n'))],
        ['Find the 20th term.', 1, a * 400 + b * 20 + c],
        ['Is ' + (a * 900 + b * 30 + c + 1) + ' a term of the sequence? Explain.', 2, 'No: term 30 is ' + (a * 900 + b * 30 + c) + ' and term 31 is ' + (a * 961 + b * 31 + c) + '; it lies between them']
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(1, 4);
      var f = [a, b]; for (var i = 2; i < 8; i++) f.push(f[i - 1] + f[i - 2]);
      return Q('A Fibonacci-type sequence starts ' + a + ', ' + b + ', and each term after that is the sum of the two before.', [
        ['Write down the first 8 terms.', 1, f.join(', ')],
        ['Show that the sum of the first 6 terms is 4 times the 5th term.', 3, 'In general ' + M('a + b + (a + b) + (a + 2b) + (2a + 3b) + (3a + 5b) = 8a + 12b = 4(2a + 3b)')],
        ['The ratio of consecutive terms gets close to a fixed number. Calculate the ratio of the 8th to the 7th term.', 1, M(sf3(f[7] / f[6])) + ' (approaching 1.618…)']
      ]);
    },
    function () {
      var n = ri(5, 12);
      return Q('Triangular numbers are 1, 3, 6, 10, 15, …', [
        ['Show that the ' + M('n') + 'th triangular number is ' + M('\\frac{n(n + 1)}{2}') + ', and find the ' + n + 'th.', 3, 'Two copies form an ' + M('n \\times (n + 1)') + ' rectangle; ' + n * (n + 1) / 2],
        ['Prove that the sum of two consecutive triangular numbers is a square number.', 3, M('\\frac{n(n + 1)}{2} + \\frac{(n + 1)(n + 2)}{2} = (n + 1)^2')],
        ['Is 2026 a triangular number? Explain.', 2, M('n(n + 1) = 4052') + ': ' + M('63 \\times 64 = 4032') + ', ' + M('64 \\times 65 = 4160') + ', so no']
      ]);
    },
    function () {
      var a = ri(10, 50), d = ri(3, 9), S = ri(500, 2000);
      var n = 1; while (n * (2 * a + (n - 1) * d) / 2 <= S) n++;
      return Q('A savings plan puts £' + a + ' away in week 1, £' + (a + d) + ' in week 2, £' + (a + 2 * d) + ' in week 3, and so on.', [
        ['How much is saved in week 20?', 1, '£' + (a + 19 * d)],
        ['Show that the total after ' + M('n') + ' weeks is ' + M('\\frac{n}{2}(' + 2 * a + ' + ' + d + '(n - 1))') + '.', 3, 'Pair the first and last weeks: each pair sums to the same amount'],
        ['In which week does the total first exceed £' + S + '?', 2, 'Week ' + n]
      ]);
    },
    function () {
      var a = ri(2, 5);
      return Q('Pattern ' + M('n') + ' is made of ' + M('n^2 + ' + a + 'n') + ' tiles.', [
        ['How many more tiles does pattern ' + M('n + 1') + ' have than pattern ' + M('n') + '?', 2, M('2n + ' + (1 + a))],
        ['Explain why the number of tiles is always even when ' + a + ' is odd... investigate: when is ' + M('n^2 + ' + a + 'n') + ' even?', 2, a % 2 ? 'Always: ' + M('n(n + ' + a + ')') + ' has one even factor' : 'Only when ' + M('n') + ' is even'],
        ['Which pattern has exactly ' + (100 + 10 * a) + ' tiles?', 1, 'Pattern 10']
      ]);
    },
    function () {
      var u1 = ri(2, 5), k = ri(2, 3), c = ri(-3, 3), t = [u1]; for (var i = 1; i < 5; i++) t.push(k * t[i - 1] + c);
      return Q('A sequence is defined by ' + M('u_{n+1} = ' + k + 'u_n' + (c ? sg(c) : '')) + ' with ' + M('u_1 = ' + u1) + '.', [
        ['Find ' + M('u_2, u_3, u_4, u_5') + '.', 2, t.slice(1).join(', ')],
        ['Find the value of ' + M('u_1') + ' for which every term is the same.', 2, M('u = ' + k + 'u' + (c ? sg(c) : '')) + ': ' + M('u_1 = ' + F(-c, k - 1))],
        ['Describe what happens to the sequence for other starting values.', 1, 'It moves further and further away from that value.']
      ]);
    }
  ]);

  X('straight-lines', [
    function () {
      var A = [ri(-5, 0), ri(-5, 0)], m = pick([2, -2, 3, -1, 0.5]), B = [A[0] + 4, A[1] + 4 * m];
      return Q('A line passes through ' + M('A(' + A.join(',\\ ') + ')') + ' with gradient ' + M(m === 0.5 ? '\\frac{1}{2}' : String(m)) + '.', [
        ['Find its equation in the form ' + M('y = mx + c') + '.', 2, M('y = ' + (m === 0.5 ? '\\frac{1}{2}x' : c1(m, 'x')) + (A[1] - m * A[0] ? sg(A[1] - m * A[0]) : ''))],
        ['Find where it crosses each axis.', 2, M('(0,\\ ' + num(A[1] - m * A[0]) + ')') + ' and ' + M('(' + sf3(-(A[1] - m * A[0]) / m) + ',\\ 0)')],
        ['Find the area of the triangle it makes with the axes.', 2, M(sf3(Math.abs((A[1] - m * A[0]) * (A[1] - m * A[0]) / m) / 2))]
      ]);
    },
    function () {
      var P = [ri(1, 6), ri(1, 6)], Qp = [P[0] + ri(2, 6), P[1] + ri(-4, 4)], Rp = [P[0] + ri(-4, 4), P[1] + ri(2, 6)];
      var area = Math.abs((Qp[0] - P[0]) * (Rp[1] - P[1]) - (Rp[0] - P[0]) * (Qp[1] - P[1])) / 2;
      return Q('Triangle ' + M('PQR') + ' has vertices ' + M('P(' + P.join(',\\ ') + ')') + ', ' + M('Q(' + Qp.join(',\\ ') + ')') + ', ' + M('R(' + Rp.join(',\\ ') + ')') + '.', [
        ['Find the midpoints of ' + M('PQ') + ' and ' + M('PR') + '.', 2, M('(' + num((P[0] + Qp[0]) / 2) + ',\\ ' + num((P[1] + Qp[1]) / 2) + ')') + ' and ' + M('(' + num((P[0] + Rp[0]) / 2) + ',\\ ' + num((P[1] + Rp[1]) / 2) + ')')],
        ['Show that the line joining these midpoints is parallel to ' + M('QR') + '.', 3, 'Both have gradient ' + M(F(Rp[1] - Qp[1], Rp[0] - Qp[0] || 1))],
        ['Find the area of triangle ' + M('PQR') + '.', 2, M(num(area))]
      ]);
    },
    function () {
      var m1 = nz(-3, 3), c1v = nz(-5, 5), m2 = nz(-3, 3), c2 = nz(-5, 5); while (m2 === m1) m2 = nz(-3, 3);
      var x = (c2 - c1v) / (m1 - m2), y = m1 * x + c1v;
      return Q('Lines ' + M('L_1: y = ' + lin(m1, c1v)) + ' and ' + M('L_2: y = ' + lin(m2, c2)) + ' are given.', [
        ['Find their point of intersection.', 2, M('(' + sf3(x) + ',\\ ' + sf3(y) + ')')],
        ['Determine whether they are perpendicular.', 1, m1 * m2 === -1 ? 'Yes: gradients multiply to −1' : 'No: ' + m1 + ' × ' + m2 + ' = ' + m1 * m2],
        ['Find the equation of the line through the intersection perpendicular to ' + M('L_1') + '.', 2, 'Gradient ' + M(F(-1, m1)) + ' through ' + M('(' + sf3(x) + ',\\ ' + sf3(y) + ')')]
      ]);
    },
    function () {
      var a = ri(1, 5), b = ri(1, 5), k = ri(2, 4);
      return Q('The points ' + M('A(1,\\ ' + a + ')') + ', ' + M('B(3,\\ ' + (a + 2 * b) + ')') + ' and ' + M('C(' + (1 + 2 * k) + ',\\ t)') + ' are collinear.', [
        ['Find the gradient of ' + M('AB') + '.', 1, M(b)],
        ['Find ' + M('t') + '.', 2, M('t = ' + (a + 2 * k * b))],
        ['Find the ratio ' + M('AB : AC') + '.', 2, M('1 : ' + k)]
      ]);
    },
    function () {
      var c = ri(2, 8);
      return Q('The line ' + M('y = mx + ' + c) + ' passes through the point ' + M('(2,\\ 0)') + '.', [
        ['Find ' + M('m') + '.', 1, M('m = ' + F(-c, 2))],
        ['Find the equation of the line parallel to it through ' + M('(0,\\ -' + c + ')') + ', and the distance between the two ' + M('y') + '-intercepts.', 2, M('y = ' + (F(-c, 2) === '-1' ? '-' : F(-c, 2)) + 'x - ' + c) + '; ' + 2 * c],
        ['Explain why parallel lines never meet, using their equations.', 1, 'Setting them equal gives ' + M(c + ' = -' + c) + ', which is impossible.']
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(2, 6);
      return Q('The line ' + M(a + 'x + ' + b + 'y = ' + a * b) + ' is given.', [
        ['Find where it crosses the axes, and hence sketch it.', 2, M('(' + b + ',\\ 0)') + ' and ' + M('(0,\\ ' + a + ')')],
        ['Show that its gradient is ' + M('-\\frac{' + a + '}{' + b + '}') + '.', 1, 'Rearrange: ' + M('y = -\\frac{' + a + '}{' + b + '}x + ' + a)],
        ['Prove that the line ' + M('\\frac{x}{p} + \\frac{y}{q} = 1') + ' always crosses the axes at ' + M('(p, 0)') + ' and ' + M('(0, q)') + '.', 2, 'Substitute ' + M('y = 0') + ' and ' + M('x = 0')]
      ]);
    },
    function () {
      var C = [ri(-2, 4), ri(-2, 4)], A = [C[0] - ri(2, 5), C[1] + ri(1, 4)], B = [2 * C[0] - A[0], 2 * C[1] - A[1]];
      return Q(M('C(' + C.join(',\\ ') + ')') + ' is the midpoint of ' + M('AB') + ', and ' + M('A(' + A.join(',\\ ') + ')') + '.', [
        ['Find the coordinates of ' + M('B') + '.', 2, M('B(' + B.join(',\\ ') + ')')],
        ['Find the equation of the perpendicular bisector of ' + M('AB') + '.', 3, 'Gradient ' + M(F(A[0] - B[0], B[1] - A[1])) + ' through ' + M('C')],
        ['Explain why every point on the perpendicular bisector is the same distance from ' + M('A') + ' and ' + M('B') + '.', 1, 'Reflection in the bisector swaps ' + M('A') + ' and ' + M('B') + '.']
      ]);
    },
    function () {
      var c = ri(1, 6), m = ri(1, 4), t = ri(1, 3);
      return Q('A plumber charges according to ' + M('C = ' + m * 10 + 'h + ' + c * 10) + ', where ' + M('C') + ' is the cost in £ and ' + M('h') + ' is the number of hours.', [
        ['Explain the meaning of ' + m * 10 + ' and ' + c * 10 + ' in context.', 2, '£' + m * 10 + ' per hour; a fixed call-out charge of £' + c * 10],
        ['A second plumber charges £' + (m * 10 + 10) + ' per hour with no call-out charge. When are they the same price?', 2, M('h = ' + c)],
        ['Explain which plumber you would choose for a job of ' + (c + t) + ' hours.', 1, 'The first: cheaper for jobs longer than ' + c + ' hours']
      ]);
    }
  ]);

  X('simultaneous', [
    function () {
      var x = ri(-5, 5), y = ri(-5, 5), a = nz(-4, 4), b = nz(-4, 4), c = nz(-4, 4), d = nz(-4, 4); while (a * d - b * c === 0) d = nz(-4, 4);
      return Q('', [
        ['Solve ' + M(lin(a, 0) + (b > 0 ? ' + ' : ' - ') + c1(Math.abs(b), 'y') + ' = ' + (a * x + b * y)) + ' and ' + M(lin(c, 0) + (d > 0 ? ' + ' : ' - ') + c1(Math.abs(d), 'y') + ' = ' + (c * x + d * y)) + '.', 3, M('x = ' + x + ',\\ y = ' + y)],
        ['Change one number in the second equation so that there is no solution. Explain.', 2, 'Make it a multiple of the first on the left but not the right, e.g. ' + M(lin(2 * a, 0) + (b > 0 ? ' + ' : ' - ') + c1(Math.abs(2 * b), 'y') + ' = ' + (2 * (a * x + b * y) + 1)) + ': parallel lines']
      ]);
    },
    function () {
      var a = ri(2, 6), c = ri(5, 15), x = ri(2, 8);
      var adult = ri(6, 12), child = ri(2, adult - 2), A = ri(2, 6), Cn = ri(2, 6), T1 = A * adult + Cn * child, A2 = A + ri(1, 3), C2 = Cn + ri(1, 3), T2 = A2 * adult + C2 * child;
      return Q('Group 1 buys ' + A + ' adult and ' + Cn + ' child tickets for £' + T1 + '. Group 2 buys ' + A2 + ' adult and ' + C2 + ' child tickets for £' + T2 + '.', [
        ['Find the price of each ticket.', 4, 'Adult £' + adult + ', child £' + child],
        ['Group 3 has £100. Find the greatest number of people it can take if it must include at least one adult and twice as many children as adults.', 3, (function () { var best = 0; for (var a2 = 1; a2 < 20; a2++) { var cost = a2 * adult + 2 * a2 * child; if (cost <= 100) best = Math.max(best, 3 * a2 + Math.floor((100 - cost) / child)); } return best + ' people'; })()]
      ]);
    },
    function () {
      var k = ri(1, 5), r2 = ri(2, 6);
      var A = 2, B = 2 * k, C = k * k - r2 * r2, D = B * B - 4 * A * C;
      return Q('Solve ' + M('x^2 + y^2 = ' + r2 * r2) + ' and ' + M('y = x + ' + k) + ' simultaneously.', [
        ['Show that ' + M(poly([2, 2 * k, k * k - r2 * r2]) + ' = 0') + '.', 2, 'Substitute and expand'],
        ['Solve, giving answers to 3 s.f., and interpret your answer geometrically.', 4, D < 0 ? 'No real solutions: the line misses the circle' : M('x = ' + sf3((-B + Math.sqrt(D)) / 4) + ',\\ ' + sf3((-B - Math.sqrt(D)) / 4)) + ': two intersection points of a line and a circle'],
        ['Find the value of ' + M('k > 0') + ' for which the line is a tangent.', 2, M('k = ' + r2 + '\\sqrt{2}')]
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(2, 6);
      return Q('The curve ' + M('y = x^2') + ' and the line ' + M('y = ' + (a + b) + 'x - ' + a * b) + ' are drawn.', [
        ['Find their points of intersection.', 3, M('(' + a + ',\\ ' + a * a + ')') + ' and ' + M('(' + b + ',\\ ' + b * b + ')')],
        ['Show that the line through ' + M('(p, p^2)') + ' and ' + M('(q, q^2)') + ' on ' + M('y = x^2') + ' has gradient ' + M('p + q') + '.', 2, M('\\frac{q^2 - p^2}{q - p} = q + p')],
        ['Use this to find the equation of the tangent at ' + M('(3, 9)') + '.', 2, 'Let ' + M('q \\to p = 3') + ': gradient 6; ' + M('y = 6x - 9')]
      ]);
    },
    function () {
      var x = ri(1, 9), y = ri(1, 9), z = ri(1, 9);
      return Q('Three numbers have sum ' + (x + y + z) + '. The first is ' + (x - y) + ' more than the second, and the third is ' + (z - x) + ' more than the first.', [
        ['Write three equations and solve them.', 4, x + ', ' + y + ', ' + z],
        ['Explain how you reduced the problem to one with fewer unknowns.', 1, 'Substitute the relationships into the sum.']
      ]);
    },
    function () {
      var a = ri(1, 5), b = ri(1, 5), s = a + b, p = a * b;
      return Q('Two numbers have sum ' + s + ' and product ' + p + '.', [
        ['Show that the numbers are solutions of ' + M('t^2 - ' + s + 't + ' + p + ' = 0') + ' and find them.', 3, M('(t - ' + a + ')(t - ' + b + ') = 0') + ': ' + a + ' and ' + b],
        ['Two numbers have sum 10 and product 30. Prove that they cannot both be real.', 2, M('t^2 - 10t + 30 = 0') + ' has discriminant ' + M('100 - 120 < 0')]
      ]);
    },
    function () {
      var v = ri(3, 8), w = ri(1, v - 1), d = ri(10, 30);
      return Q('A boat goes ' + d + ' km upstream in ' + sf3(d / (v - w)) + ' hours and returns downstream in ' + sf3(d / (v + w)) + ' hours.', [
        ['Write two equations for the boat’s speed in still water ' + M('b') + ' and the speed of the current ' + M('c') + '.', 2, M('b - c = ' + (v - w)) + ', ' + M('b + c = ' + (v + w))],
        ['Solve them.', 2, M('b = ' + v + ',\\ c = ' + w) + ' km/h'],
        ['Explain why the round trip takes longer than it would in still water.', 2, 'More time is spent going slowly upstream than is saved going downstream.']
      ]);
    },
    function () {
      var x = ri(2, 6), y = ri(1, 5);
      return Q('', [
        ['Solve ' + M('xy = ' + x * y) + ' and ' + M('x + 2y = ' + (x + 2 * y)) + '.', 4, 'Substitute ' + M('x = ' + (x + 2 * y) + ' - 2y') + ': two solutions, including ' + M('(' + x + ',\\ ' + y + ')') + ' and ' + M('(' + 2 * y + ',\\ ' + num(x / 2) + ')')],
        ['Explain why a line can meet the curve ' + M('xy = k') + ' at most twice.', 2, 'Substituting gives a quadratic, which has at most two roots.']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
