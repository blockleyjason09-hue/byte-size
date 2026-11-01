/* Byte Size Classroom — deeper extension questions (set 2) for AQA Level 2 Further Maths. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function fact(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }
  function comb(n, k) { return Math.round(fact(n) / (fact(k) * fact(n - k))); }
  function xm(v) { return v ? '(x' + sg(-v) + ')' : 'x'; }

  X('fm-counting', [
    function () {
      var W = pick([['FACTOR', 2], ['PLANET', 2], ['GARDEN', 2], ['MOTHER', 2], ['CUSTARD', 2], ['TRIANGLE', 3]]), w = W[0], n = w.length, v = W[1], c = n - v;
      return Q('The letters of the word ' + w + ' are all different. ' + w + ' has ' + v + ' vowels.', [
        ['Find the number of arrangements of all the letters.', 1, M(n + '! = ' + fact(n))],
        ['Find the number of arrangements that begin and end with a consonant.', 3, M(c + ' \\times ' + (c - 1) + ' \\times ' + (n - 2) + '! = ' + c * (c - 1) * fact(n - 2))],
        ['Find the number of arrangements in which all the vowels are together.', 3, 'Treat the vowels as one block: ' + M('(' + (n - v + 1) + ')! \\times ' + v + '! = ' + fact(n - v + 1) * fact(v))],
        ['Find the probability that a random arrangement has no two vowels next to each other.', 3, 'Place consonants (' + M(c + '!') + '), then choose ' + v + ' of the ' + (c + 1) + ' gaps for vowels in order: ' + M('\\frac{' + c + '! \\times ' + (fact(c + 1) / fact(c + 1 - v)) + '}{' + n + '!} = ' + F(fact(c) * fact(c + 1) / fact(c + 1 - v), fact(n)))]
      ]);
    },
    function () {
      var n = ri(6, 15), D = n * (n - 3) / 2, n2 = ri(8, 20), D2 = n2 * (n2 - 3) / 2;
      return Q('', [
        ['At a meeting, each of ' + n + ' people shakes hands once with every other person. Explain why there are ' + M('\\frac{' + n + ' \\times ' + (n - 1) + '}{2}') + ' handshakes.', 2, 'Each person shakes ' + (n - 1) + ' hands; each handshake involves 2 people and is counted twice.'],
        ['Show that a polygon with ' + M('n') + ' sides has ' + M('\\frac{n(n - 3)}{2}') + ' diagonals.', 3, 'Each vertex joins to ' + M('n - 3') + ' others (not itself or its two neighbours); halve for double counting.'],
        ['A polygon has ' + D2 + ' diagonals. Find the number of sides.', 3, M('n^2 - 3n - ' + 2 * D2 + ' = 0') + ', ' + M('n = ' + n2)],
        ['Prove that no polygon has exactly 100 diagonals.', 2, M('n^2 - 3n - 200 = 0') + ' has discriminant 809, not a square, so no whole-number ' + M('n')]
      ]);
    }
  ]);

  X('fm-surds', [
    function () {
      var a = ri(1, 4), b = pick([2, 3, 5, 7]); while (a * a - b === 1 || a * a - b === -1) b = pick([2, 3, 5, 7]); var x2 = a * a + b, val = 2 * (a * a + b) * (a * a + b) / Math.pow(a * a - b, 2) - 2;
      var den = a * a - b;
      return Q(M('x = ' + a + ' + \\sqrt{' + b + '}') + '.', [
        ['Find ' + M('\\frac{1}{x}') + ' in the form ' + M('p + q\\sqrt{' + b + '}') + '.', 2, M(F(a, den) + (den > 0 ? ' - ' : ' + ') + (Math.abs(den) === 1 ? '' : F(1, Math.abs(den))) + '\\sqrt{' + b + '}')],
        ['Hence find ' + M('x + \\frac{1}{x}') + ' in the form ' + M('p + q\\sqrt{' + b + '}') + '.', 2, M(F(a * den + a, den) + ' + ' + F(den - 1, den) + '\\sqrt{' + b + '}').replace('+ -', '- ')],
        ['Find ' + M('x^2') + ' and show that ' + M('x^2 - ' + 2 * a + 'x') + ' is an integer.', 3, M('x^2 = ' + x2 + ' + ' + 2 * a + '\\sqrt{' + b + '}') + '; ' + M('x^2 - ' + 2 * a + 'x = ' + (x2 - 2 * a * a))]
      ]);
    },
    function () {
      var a = pick([2, 3, 5]), b = pick([6, 7, 8, 10, 11]);
      return Q('', [
        ['Without a calculator, decide which is larger: ' + M('\\sqrt{' + a + '} + \\sqrt{' + b + '}') + ' or ' + M('\\sqrt{' + (a + b) + '}') + '. Prove your answer.', 3, 'Square both: ' + M(a + b + ' + 2\\sqrt{' + a * b + '}') + ' vs ' + M(a + b) + '; so ' + M('\\sqrt{' + a + '} + \\sqrt{' + b + '}') + ' is larger'],
        ['Rationalise ' + M('\\frac{1}{\\sqrt{' + b + '} - \\sqrt{' + a + '}}') + '.', 2, M('\\frac{\\sqrt{' + b + '} + \\sqrt{' + a + '}}{' + (b - a) + '}')],
        ['Hence show that ' + M('\\frac{1}{\\sqrt{2} + 1} + \\frac{1}{\\sqrt{3} + \\sqrt{2}} + \\cdots + \\frac{1}{\\sqrt{9} + \\sqrt{8}}') + ' is an integer.', 3, 'Each term ' + M('= \\sqrt{k + 1} - \\sqrt{k}') + '; the sum telescopes to ' + M('\\sqrt{9} - 1 = 2')]
      ]);
    }
  ]);

  X('fm-functions', [
    function () {
      var a = ri(1, 4), c = nz(-6, 6), k = c - a * a;
      return Q(M('\\mathrm{f}(x) = x^2 - ' + 2 * a + 'x' + sg(c)) + ' for ' + M('x \\ge ' + a) + '.', [
        ['Write ' + M('\\mathrm{f}(x)') + ' in the form ' + M('(x - p)^2 + q') + ', and state the range of ' + M('\\mathrm{f}') + '.', 2, M('(x - ' + a + ')^2' + (k ? sg(k) : '')) + '; ' + M('\\mathrm{f}(x) \\ge ' + k)],
        ['Find ' + M('\\mathrm{f}^{-1}(x)') + ' and state its domain.', 3, M('\\mathrm{f}^{-1}(x) = ' + a + ' + \\sqrt{x' + (k ? sg(-k) : '') + '}') + ', ' + M('x \\ge ' + k)],
        ['Explain why ' + M('\\mathrm{f}') + ' would have no inverse if its domain were all real numbers.', 2, 'It would be many-to-one (e.g. ' + M('\\mathrm{f}(' + (a - 1) + ') = \\mathrm{f}(' + (a + 1) + ')') + ').']
      ]);
    },
    function () {
      var a = ri(2, 5), b = nz(-6, 6), fx = function (x) { return a * x + b; }, fixed = -b / (a - 1), ff = [a * a, a * b + b];
      return Q(M('\\mathrm{f}(x) = ' + a + 'x' + sg(b)) + ' and ' + M('\\mathrm{g}(x) = \\sqrt{x - 1}') + ', ' + M('x \\ge 1') + '.', [
        ['Solve ' + M('\\mathrm{ff}(x) = x') + '. Explain why your answer is also the solution of ' + M('\\mathrm{f}(x) = x') + '.', 3, M(ff[0] + 'x' + sg(ff[1]) + ' = x') + ', ' + M('x = ' + F(-ff[1], ff[0] - 1)) + ' = ' + M(F(-b, a - 1)) + '; a fixed point of f is a fixed point of ff'],
        ['Find the domain of ' + M('\\mathrm{gf}') + '.', 2, M(a + 'x' + sg(b) + ' \\ge 1') + ': ' + M('x \\ge ' + F(1 - b, a))],
        ['Solve ' + M('\\mathrm{gf}(x) = 3') + '.', 2, M(a + 'x' + sg(b) + ' = 10') + ', ' + M('x = ' + F(10 - b, a))]
      ]);
    }
  ]);

  X('fm-algebra', [
    function () {
      var n = ri(10, 40);
      return Q('', [
        ['Show that ' + M('\\frac{1}{r} - \\frac{1}{r + 2} = \\frac{2}{r(r + 2)}') + '.', 2, M('\\frac{r + 2 - r}{r(r + 2)}')],
        ['Hence find ' + M('\\frac{2}{1 \\times 3} + \\frac{2}{3 \\times 5} + \\frac{2}{5 \\times 7} + \\cdots + \\frac{2}{' + (2 * n - 1) + ' \\times ' + (2 * n + 1) + '}') + '.', 3, 'Terms telescope: ' + M('1 - \\frac{1}{' + (2 * n + 1) + '} = ' + F(2 * n, 2 * n + 1))],
        ['Explain what happens to the sum as more terms are added.', 1, 'It gets closer and closer to 1 but never reaches it.']
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(2, 6), r1 = ri(1, 5), r2 = -ri(1, 5);
      // equation x/(x + a) + b/(x - a)?? use: a/(x-p) + 1/(x+p)... keep generic and computed
      var p = ri(1, 4), k = ri(2, 4); // solve k/(x - p) - 1/(x + p) = 1 -> k(x+p) - (x-p) = x^2 - p^2 -> x^2 - (k-1)x - (k+1)p - p^2 = 0
      var B = -(k - 1), C = -((k + 1) * p + p * p), d = B * B - 4 * C, s1 = (-B + Math.sqrt(d)) / 2, s2 = (-B - Math.sqrt(d)) / 2;
      return Q('', [
        ['Show that the equation ' + M('\\frac{' + k + '}{x - ' + p + '} - \\frac{1}{x + ' + p + '} = 1') + ' can be written as ' + M(poly([1, B, C]) + ' = 0') + '.', 3, 'Multiply by ' + M('(x - ' + p + ')(x + ' + p + ')') + ': ' + M(k + '(x + ' + p + ') - (x - ' + p + ') = x^2 - ' + p * p)],
        ['Solve the equation, giving answers to 3 significant figures where necessary.', 2, M('x = ' + sf3(s1) + '\\text{ or } x = ' + sf3(s2))],
        ['Explain why it is important to check that neither solution is ' + M('\\pm ' + p) + '.', 1, 'Those values make a denominator zero, so they cannot be solutions.']
      ]);
    }
  ]);

  X('fm-binomial', [
    function () {
      var k = ri(2, 6), n = 2 * k + 1;
      return Q('In the expansion of ' + M('(1 + x)^n') + ', the coefficient of ' + M('x^2') + ' is ' + k + ' times the coefficient of ' + M('x') + '.', [
        ['Show that ' + M('\\frac{n - 1}{2} = ' + k) + ' and find ' + M('n') + '.', 3, M('\\frac{n(n - 1)}{2} = ' + k + 'n') + ', ' + M('n = ' + n)],
        ['Find the largest coefficient in the expansion, and the term it belongs to.', 2, M('\\binom{' + n + '}{' + k + '} = \\binom{' + n + '}{' + (k + 1) + '} = ' + comb(n, k)) + ' (terms in ' + M('x^{' + k + '}') + ' and ' + M('x^{' + (k + 1) + '}') + ')'],
        ['Find the sum of all the coefficients, and explain your method.', 2, M('2^{' + n + '} = ' + Math.pow(2, n)) + ': substitute ' + M('x = 1')]
      ]);
    },
    function () {
      var n = ri(5, 8), h = pick([0.01, 0.02, 0.03]), approx = 1 + n * h + comb(n, 2) * h * h, ex = Math.pow(1 + h, n);
      return Q('', [
        ['Write down the first three terms of the expansion of ' + M('(1 + x)^{' + n + '}') + ' in ascending powers of ' + M('x') + '.', 2, M('1 + ' + n + 'x + ' + comb(n, 2) + 'x^2')],
        ['Use your answer to estimate ' + M(num(1 + h) + '^{' + n + '}') + '.', 2, M('1 + ' + num(n * h) + ' + ' + num(Math.round(comb(n, 2) * h * h * 1e6) / 1e6) + ' = ' + num(Math.round(approx * 1e6) / 1e6))],
        ['Explain why the estimate is very close to the true value, and say whether it is an over- or underestimate.', 2, 'The missing terms contain ' + M('x^3') + ' and higher, which are tiny for ' + M('x = ' + h) + '; they are positive, so it is a slight underestimate (true value ' + num(Math.round(ex * 1e6) / 1e6) + ').']
      ]);
    }
  ]);

  X('fm-factor', [
    function () {
      var r = nz(-3, 3), a = nz(-5, 5), b = nz(-6, 6), c = -(r * r * r + a * r * r + b * r);
      var R1 = 1 + a + b + c, R2 = -1 + a - b + c;
      return Q(M('\\mathrm{f}(x) = x^3 + ax^2 + bx + c') + '. When ' + M('\\mathrm{f}(x)') + ' is divided by ' + M('(x - 1)') + ' the remainder is ' + R1 + ', and when divided by ' + M('(x + 1)') + ' the remainder is ' + R2 + '. Also ' + M(xm(r)) + ' is a factor.', [
        ['Write down three equations in ' + M('a') + ', ' + M('b') + ' and ' + M('c') + '.', 3, M('1 + a + b + c = ' + R1) + ', ' + M('-1 + a - b + c = ' + R2) + ', ' + M((r * r * r) + ' + ' + r * r + 'a' + sg(r) + 'b + c = 0').replace('+ -', '- ')],
        ['Solve to find ' + M('a') + ', ' + M('b') + ' and ' + M('c') + '.', 3, M('a = ' + a + ',\\ b = ' + b + ',\\ c = ' + c)],
        ['Find the remainder when ' + M('\\mathrm{f}(x)') + ' is divided by ' + M('(x - 2)') + '.', 1, M(8 + 4 * a + 2 * b + c)]
      ]);
    },
    function () {
      var r = nz(-3, 3), p = nz(-3, 3), q = p * p + ri(1, 5);
      // (x - r)(x^2 + 2p x + q) with q > p^2 -> no other roots
      var co = [1, 2 * p - r, q - 2 * p * r, -q * r];
      return Q(M('\\mathrm{f}(x) = ' + poly(co)) + '.', [
        ['Show that ' + M(xm(r)) + ' is a factor of ' + M('\\mathrm{f}(x)') + '.', 2, M('\\mathrm{f}(' + r + ') = 0')],
        ['Write ' + M('\\mathrm{f}(x)') + ' as a product of a linear factor and a quadratic factor.', 2, M(xm(r) + '(' + poly([1, 2 * p, q]) + ')')],
        ['Prove that ' + M('\\mathrm{f}(x) = 0') + ' has exactly one real solution.', 3, 'The quadratic has discriminant ' + M((4 * p * p) + ' - ' + (4 * q) + ' = ' + (4 * p * p - 4 * q) + ' < 0') + ', so the only root is ' + M('x = ' + r)]
      ]);
    }
  ]);

  X('fm-quadratics', [
    function () {
      var c = ri(1, 9), k = 2 * Math.sqrt(c);
      return Q('The line ' + M('y = kx') + ' and the curve ' + M('y = x^2 + ' + c) + ' are given.', [
        ['Show that the ' + M('x') + '-coordinates of the points of intersection satisfy ' + M('x^2 - kx + ' + c + ' = 0') + '.', 1, 'Equate ' + M('kx = x^2 + ' + c)],
        ['Find the values of ' + M('k') + ' for which the line is a tangent to the curve.', 3, M('k^2 - ' + 4 * c + ' = 0') + ', ' + M('k = \\pm ' + (Number.isInteger(k) ? k : '2\\sqrt{' + c + '}'))],
        ['Find the points where these tangents touch the curve.', 2, M('x = \\pm\\sqrt{' + c + '}') + ', ' + M('y = ' + 2 * c)],
        ['For which values of ' + M('k') + ' does the line miss the curve?', 1, M('-' + (Number.isInteger(k) ? k : '2\\sqrt{' + c + '}') + ' < k < ' + (Number.isInteger(k) ? k : '2\\sqrt{' + c + '}'))]
      ]);
    },
    function () {
      var p = nz(-4, 4);
      return Q('The curve ' + M('C_p') + ' has equation ' + M('y = x^2 - 2px + p^2 + p') + ', where ' + M('p') + ' is a constant.', [
        ['Write the equation in completed-square form and find the vertex when ' + M('p = ' + p) + '.', 2, M('y = (x - p)^2 + p') + '; ' + M('(' + p + ',\\ ' + p + ')')],
        ['Show that, for every value of ' + M('p') + ', the vertex lies on the line ' + M('y = x') + '.', 2, 'The vertex is ' + M('(p,\\ p)')],
        ['Find the values of ' + M('p') + ' for which ' + M('C_p') + ' does not meet the ' + M('x') + '-axis.', 2, 'Minimum value ' + M('p > 0') + ': ' + M('p > 0')],
        ['Find the value of ' + M('p') + ' for which ' + M('C_p') + ' passes through ' + M('(0,\\ 6)') + '.', 2, M('p^2 + p = 6') + ': ' + M('p = 2\\text{ or } p = -3')]
      ]);
    }
  ]);

  X('fm-graphs', [
    function () {
      var a = ri(1, 4), b = ri(2, 6), k = (b * b - 1) / (b + a);
      // f(x) = ax + 1 for x < b, x^2 - k for x >= b; continuous when ab + 1 = b^2 - k
      var K = b * b - a * b - 1;
      return Q('A function is defined by ' + M('\\mathrm{f}(x) = \\begin{cases} ' + c1(a, 'x') + ' + 1 & x < ' + b + ' \\\\ x^2 - k & x \\ge ' + b + ' \\end{cases}') + '.', [
        ['Find the value of ' + M('k') + ' for which the graph has no jump at ' + M('x = ' + b) + '.', 2, M((a * b + 1) + ' = ' + b * b + ' - k') + ', ' + M('k = ' + K)],
        ['For this value of ' + M('k') + ', solve ' + M('\\mathrm{f}(x) = ' + (b * b - K + 5)) + '.', 3, (function () { var t = b * b - K + 5, s = [], x1 = (t - 1) / a; if (x1 < b) s.push(sf3(x1)); var x2 = Math.sqrt(t + K); if (x2 >= b) s.push(sf3(x2)); return s.length ? s.map(function (v) { return M('x = ' + v); }).join(', ') : 'no solutions'; })()],
        ['Sketch the graph for ' + M('0 \\le x \\le ' + (b + 2)) + ' and find the area between it and the ' + M('x') + '-axis for ' + M('0 \\le x \\le ' + b) + '.', 2, 'Trapezium: ' + M('\\frac{1}{2}(1 + ' + (a * b + 1) + ') \\times ' + b + ' = ' + num((a * b + 2) * b / 2))]
      ]);
    },
    function () {
      var a = ri(2, 5), b = pick([2, 3]), m = ri(3, 8);
      var xs = []; for (var x = 0; x <= 6; x++) xs.push(a * Math.pow(b, x));
      var cross = 0; while (a * Math.pow(b, cross) <= m * cross + 20) cross++;
      return Q('Two savings schemes are modelled by ' + M('y = ' + a + ' \\times ' + b + '^{x}') + ' and ' + M('y = ' + m + 'x + 20') + ', where ' + M('x') + ' is the number of years.', [
        ['Find the value of each scheme when ' + M('x = 0') + ' and ' + M('x = 3') + '.', 2, M(a + ',\\ ' + a * Math.pow(b, 3)) + ' and ' + M('20,\\ ' + (3 * m + 20))],
        ['Find the first whole number of years after which the exponential scheme is worth more.', 2, M('x = ' + cross)],
        ['Explain why an exponential model always eventually overtakes a linear model with a positive gradient.', 2, 'Exponential growth multiplies by a constant factor each year, so its yearly increase keeps growing; the linear increase stays fixed.']
      ]);
    }
  ]);

  X('fm-equations', [
    function () {
      var a = ri(4, 12), b = ri(4, 10), c = ri(2, b - 1), v = [5, 10, 20], total = 5 * a + 10 * b + 20 * c, n = a + b + c;
      return Q('A jar contains ' + n + ' coins: 5p, 10p and 20p coins, worth £' + (total / 100).toFixed(2) + ' altogether. There are ' + (b - c) + ' more 10p coins than 20p coins.', [
        ['Form three equations in ' + M('x') + ', ' + M('y') + ' and ' + M('z') + ', the numbers of 5p, 10p and 20p coins.', 3, M('x + y + z = ' + n) + ', ' + M('5x + 10y + 20z = ' + total) + ', ' + M('y - z = ' + (b - c))],
        ['Solve the equations.', 3, M('x = ' + a + ',\\ y = ' + b + ',\\ z = ' + c)]
      ]);
    },
    function () {
      var s = ri(3, 9), p = ri(1, Math.floor(s * s / 4) - 1);
      var d = s * s - 4 * p, x1 = (s + Math.sqrt(d)) / 2, x2 = (s - Math.sqrt(d)) / 2;
      return Q('Two numbers ' + M('x') + ' and ' + M('y') + ' satisfy ' + M('x + y = ' + s) + ' and ' + M('xy = ' + p) + '.', [
        ['Without solving, find ' + M('x^2 + y^2') + ' and ' + M('(x - y)^2') + '.', 3, M('(x + y)^2 - 2xy = ' + (s * s - 2 * p)) + '; ' + M('(x + y)^2 - 4xy = ' + d)],
        ['Find ' + M('\\frac{1}{x} + \\frac{1}{y}') + '.', 2, M('\\frac{x + y}{xy} = ' + F(s, p))],
        ['Solve the simultaneous equations exactly.', 3, M('x, y = \\frac{' + s + ' \\pm \\sqrt{' + d + '}}{2}') + ' (≈ ' + sf3(x1) + ', ' + sf3(x2) + ')']
      ]);
    }
  ]);

  X('fm-inequalities', [
    function () {
      var a = ri(2, 6);
      return Q('Consider ' + M('kx^2 + ' + 2 * a + 'x + k') + ', where ' + M('k') + ' is a constant.', [
        ['Find the values of ' + M('k') + ' for which ' + M('kx^2 + ' + 2 * a + 'x + k > 0') + ' for all ' + M('x') + '.', 4, 'Need ' + M('k > 0') + ' and ' + M(4 * a * a + ' - 4k^2 < 0') + ': ' + M('k > ' + a)],
        ['For ' + M('k = ' + a) + ', describe the graph of ' + M('y = kx^2 + ' + 2 * a + 'x + k') + '.', 2, M(a + '(x + 1)^2') + ': touches the ' + M('x') + '-axis at ' + M('(-1, 0)')],
        ['Find the values of ' + M('k') + ' for which the equation ' + M('kx^2 + ' + 2 * a + 'x + k = 0') + ' has two distinct real roots.', 2, M('-' + a + ' < k < ' + a + ',\\ k \\ne 0')]
      ]);
    },
    function () {
      var a = ri(1, 3), b = ri(4, 7), m = ri(1, 2), c = ri(0, 3), pts = [];
      for (var x = -2; x <= 10; x++) for (var y = -2; y <= 12; y++) if (y >= (x - a) * (x - b) && y <= m * x + c && y >= 0) pts.push('(' + x + ', ' + y + ')');
      return Q('The region ' + M('R') + ' is defined by ' + M('y \\ge (x - ' + a + ')(x - ' + b + ')') + ', ' + M('y \\le ' + c1(m, 'x') + (c ? ' + ' + c : '')) + ' and ' + M('y \\ge 0') + '.', [
        ['Sketch the region.', 3, 'Above the parabola (roots ' + a + ' and ' + b + '), below the line, above the ' + M('x') + '-axis.'],
        ['List all the points with integer coordinates in ' + M('R') + '.', 3, pts.length ? pts.length + ' points: ' + pts.join(', ') : 'none']
      ]);
    }
  ]);

  X('fm-indices', [
    function () {
      var k = ri(2, 5), n = ri(2, 6), total = Math.pow(2, n) * (Math.pow(2, k) + 1);
      return Q('', [
        ['Solve ' + M('2^{x + ' + k + '} + 2^{x} = ' + total) + '.', 3, M('2^{x}(2^{' + k + '} + 1) = ' + total) + ', ' + M('2^{x} = ' + Math.pow(2, n)) + ', ' + M('x = ' + n)],
        ['Show that ' + M('3^{x + 2} - 3^{x} = 8 \\times 3^{x}') + ', and hence solve ' + M('3^{x + 2} - 3^{x} = 72') + '.', 3, M('3^x(9 - 1)') + '; ' + M('3^x = 9') + ', ' + M('x = 2')],
        ['Explain why ' + M('2^{x} = -4') + ' has no real solution.', 1, M('2^x > 0') + ' for every real ' + M('x')]
      ]);
    },
    function () {
      var a = pick([4, 8, 9, 16, 25, 27]), base = { 4: [2, 2], 8: [2, 3], 9: [3, 2], 16: [2, 4], 25: [5, 2], 27: [3, 3] }[a], n = pick([2, 3, -1, -2]);
      return Q('', [
        ['Write ' + M(a + '^{' + c1(n, 'x') + '}') + ' as a power of ' + base[0] + '.', 1, M(base[0] + '^{' + c1(base[1] * n, 'x') + '}')],
        ['Solve ' + M(a + '^{x} = ' + base[0] + '^{x + 3}') + '.', 2, M(base[1] + 'x = x + 3') + ', ' + M('x = ' + F(3, base[1] - 1))],
        ['Prove that ' + M('\\left(a^{\\frac{1}{2}} + a^{-\\frac{1}{2}}\\right)^2 = a + 2 + \\frac{1}{a}') + ' for ' + M('a > 0') + ', and use it to find ' + M('\\left(' + a + '^{\\frac{1}{2}} + ' + a + '^{-\\frac{1}{2}}\\right)^2') + '.', 3, 'Expand: ' + M('a + 2a^0 + a^{-1}') + '; ' + M(a + ' + 2 + ' + F(1, a) + ' = ' + F(a * a + 2 * a + 1, a))]
      ]);
    }
  ]);

  X('fm-proof', [
    function () {
      var n = ri(3, 9);
      return Q('', [
        ['Show that ' + M('n^3 - n = (n - 1)n(n + 1)') + '.', 1, M('n(n^2 - 1)')],
        ['Hence prove that ' + M('n^3 - n') + ' is divisible by 6 for every integer ' + M('n') + '.', 3, 'Three consecutive integers include a multiple of 2 and a multiple of 3.'],
        ['Check your result for ' + M('n = ' + n) + ', and find the largest whole number that always divides ' + M('n^3 - n') + '.', 2, M(n * n * n - n + ' = 6 \\times ' + (n * n * n - n) / 6) + '; 6 (since ' + M('2^3 - 2 = 6') + ')']
      ]);
    },
    function () {
      return Q('', [
        ['Prove that the sum of the squares of two consecutive odd numbers is always 2 more than a multiple of 8.', 4, M('(2n - 1)^2 + (2n + 1)^2 = 8n^2 + 2')],
        ['Prove that the product of two consecutive even numbers is always a multiple of 8.', 3, M('2n(2n + 2) = 4n(n + 1)') + ', and ' + M('n(n + 1)') + ' is even'],
        ['Prove or disprove: the sum of two consecutive square numbers is always odd.', 2, M('n^2 + (n + 1)^2 = 2n^2 + 2n + 1') + ': always odd (proved)']
      ]);
    }
  ]);

  X('fm-sequences', [
    function () {
      var a = ri(2, 6), b = ri(1, 5), c = ri(2, 5), d = ri(1, 6), lim = a / c, eps = pick([0.01, 0.001]);
      var u = function (n) { return (a * n + b) / (c * n + d); }, n = 1; while (Math.abs(u(n) - lim) >= eps) n++;
      return Q('A sequence has ' + M('u_n = \\frac{' + c1(a, 'n') + ' + ' + b + '}{' + c1(c, 'n') + ' + ' + d + '}') + '.', [
        ['Find the limiting value ' + M('L') + ' of ' + M('u_n') + ' as ' + M('n \\to \\infty') + '.', 1, M('L = ' + F(a, c))],
        ['Show that ' + M('u_n - L = \\frac{' + (b * c - a * d) + '}{' + c + '(' + c1(c, 'n') + ' + ' + d + ')}') + '.', 3, 'Common denominator ' + M(c + '(' + c1(c, 'n') + ' + ' + d + ')')],
        ['Find the least value of ' + M('n') + ' for which ' + M('u_n') + ' is within ' + eps + ' of ' + M('L') + '.', 2, M('n = ' + n)],
        ['State whether the sequence is increasing or decreasing, with a reason.', 1, (b * c - a * d) > 0 ? 'Decreasing: ' + M('u_n - L > 0') + ' and shrinks towards 0' : 'Increasing: ' + M('u_n - L < 0') + ' and approaches 0']
      ]);
    },
    function () {
      var a = ri(1, 3), b = nz(-6, 6), c = nz(-8, 8), p = ri(3, 12), q = ri(-20, 20), roots = [];
      for (var n = 1; n <= 60; n++) if (a * n * n + b * n + c === p * n + q) roots.push(n);
      if (!roots.length) { var n0 = ri(3, 9); q = a * n0 * n0 + b * n0 + c - p * n0; roots = []; for (n = 1; n <= 60; n++) if (a * n * n + b * n + c === p * n + q) roots.push(n); }
      return Q('Sequence A has ' + M('n') + 'th term ' + M(poly([a, b, c], 'n')) + ' and sequence B has ' + M('n') + 'th term ' + M(poly([p, q], 'n')) + '.', [
        ['Find the value(s) of ' + M('n') + ' for which the two sequences have the same term.', 3, M(poly([a, b - p, c - q], 'n') + ' = 0') + ': ' + roots.map(function (r) { return M('n = ' + r); }).join(', ')],
        ['Explain why, for large ' + M('n') + ', the terms of A are bigger than the terms of B.', 2, 'The ' + M('n^2') + ' term grows faster than any linear term.'],
        ['Find the second difference of sequence A, and explain how it relates to the coefficient of ' + M('n^2') + '.', 2, 2 * a + ': it is twice the coefficient of ' + M('n^2')]
      ]);
    }
  ]);

  X('fm-coord', [
    function () {
      var A = [ri(-4, 0), ri(-4, 0)], B = [ri(3, 8), ri(-3, 2)], C = [ri(0, 5), ri(4, 9)];
      var area = Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1])) / 2, AB = Math.hypot(B[0] - A[0], B[1] - A[1]);
      return Q('Triangle ' + M('ABC') + ' has vertices ' + M('A(' + A.join(',\\ ') + ')') + ', ' + M('B(' + B.join(',\\ ') + ')') + ' and ' + M('C(' + C.join(',\\ ') + ')') + '.', [
        ['Find the area of the triangle by surrounding it with a rectangle.', 3, M(num(area))],
        ['Find the exact length of ' + M('AB') + '.', 1, M('\\sqrt{' + (Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2)) + '}')],
        ['Hence find the perpendicular distance from ' + M('C') + ' to the line ' + M('AB') + '.', 2, M('\\frac{2 \\times ' + num(area) + '}{' + sf3(AB) + '} = ' + sf3(2 * area / AB))]
      ]);
    },
    function () {
      var A = [ri(-5, 0), ri(0, 6)], B = [ri(2, 7), ri(-4, 2)], m = pick([1, 2, -1]), c = ri(-2, 3);
      // point on y = m x + c equidistant from A and B: (x-A0)^2 + (mx+c-A1)^2 = (x-B0)^2 + (mx+c-B1)^2
      var coef = -2 * A[0] + 2 * B[0] - 2 * m * A[1] + 2 * m * B[1], cons = A[0] * A[0] - B[0] * B[0] + A[1] * A[1] - B[1] * B[1] - 2 * c * A[1] + 2 * c * B[1];
      if (coef === 0) { B = [B[0] + 1, B[1]]; coef = -2 * A[0] + 2 * B[0] - 2 * m * A[1] + 2 * m * B[1]; cons = A[0] * A[0] - B[0] * B[0] + A[1] * A[1] - B[1] * B[1] - 2 * c * A[1] + 2 * c * B[1]; }
      var x = -cons / coef, y = m * x + c;
      return Q('The points ' + M('A(' + A.join(',\\ ') + ')') + ' and ' + M('B(' + B.join(',\\ ') + ')') + ' are given. ' + M('P') + ' lies on the line ' + M('y = ' + c1(m, 'x') + (c ? sg(c) : '')) + ' and is the same distance from ' + M('A') + ' as from ' + M('B') + '.', [
        ['Explain why ' + M('P') + ' must lie on the perpendicular bisector of ' + M('AB') + '.', 1, 'Points equidistant from ' + M('A') + ' and ' + M('B') + ' form that bisector.'],
        ['Find the coordinates of ' + M('P') + '.', 4, M('(' + sf3(x) + ',\\ ' + sf3(y) + ')')],
        ['Find the distance ' + M('PA') + '.', 1, M(sf3(Math.hypot(x - A[0], y - A[1])))]
      ]);
    }
  ]);

  X('fm-circles', [
    function () {
      var O = [nz(-4, 4), nz(-4, 4)], offs = BS.shuffle([[3, 4], [-3, 4], [4, -3], [-4, -3], [5, 0], [0, -5], [-5, 0], [0, 5]]).slice(0, 3);
      var P = offs.map(function (o) { return [O[0] + o[0], O[1] + o[1]]; });
      return Q('A circle passes through ' + P.map(function (p) { return M('(' + p.join(',\\ ') + ')'); }).join(', ') + '.', [
        ['Explain why the centre lies on the perpendicular bisector of any chord.', 1, 'The centre is the same distance from both ends of the chord.'],
        ['Find the centre and radius of the circle.', 5, 'Intersect two perpendicular bisectors: centre ' + M('(' + O.join(',\\ ') + ')') + ', radius 5'],
        ['Write down the equation of the circle.', 1, M('(x' + sg(-O[0]) + ')^2 + (y' + sg(-O[1]) + ')^2 = 25')]
      ]);
    },
    function () {
      var r = ri(3, 8), d = r + ri(2, 8), t = Math.sqrt(d * d - r * r), ang = 2 * Math.asin(r / d) * 180 / Math.PI;
      return Q('A circle has centre ' + M('O(0,\\ 0)') + ' and radius ' + r + '. The point ' + M('P(' + d + ',\\ 0)') + ' lies outside the circle. Two tangents are drawn from ' + M('P') + '.', [
        ['Find the exact length of each tangent.', 2, M('\\sqrt{' + d * d + ' - ' + r * r + '} = \\sqrt{' + (d * d - r * r) + '}')],
        ['Find the angle between the two tangents.', 3, M('2\\sin^{-1}\\frac{' + r + '}{' + d + '} = ' + sf3(ang) + '°')],
        ['Find the coordinates of the points where the tangents touch the circle.', 3, M('x = \\frac{' + r * r + '}{' + d + '}') + ', ' + M('y = \\pm ' + sf3(r * t / d)) + ' (from similar triangles)']
      ]);
    }
  ]);

  X('fm-calculus', [
    function () {
      var a = ri(1, 3), b = ri(2, 8);
      // y = x^3 + b; tangent through origin: tangent at t: y = 3t^2 x - 2t^3 + b; through origin: 2t^3 = b
      var t = Math.cbrt(b / 2);
      return Q('The curve ' + M('C') + ' has equation ' + M('y = x^3 + ' + b) + '.', [
        ['Show that the tangent to ' + M('C') + ' at the point where ' + M('x = t') + ' has equation ' + M('y = 3t^2x - 2t^3 + ' + b) + '.', 3, 'Gradient ' + M('3t^2') + ' through ' + M('(t,\\ t^3 + ' + b + ')')],
        ['Find the value of ' + M('t') + ' for which this tangent passes through the origin.', 2, M('2t^3 = ' + b) + ', ' + M('t = ' + sf3(t))],
        ['Find the equation of this tangent.', 2, M('y = ' + sf3(3 * t * t) + 'x')]
      ]);
    },
    function () {
      var L = ri(40, 120), x = L / 4, A = L * L / 8;
      return Q('A farmer has ' + L + ' m of fencing to make a rectangular pen against a long straight wall. The wall forms one side, so fencing is needed on three sides.', [
        ['Let the sides at right angles to the wall be ' + M('x') + ' m. Show that the area is ' + M('A = ' + L + 'x - 2x^2') + '.', 2, 'Length parallel to wall ' + M(L + ' - 2x')],
        ['Find the maximum area, and the dimensions that give it.', 4, M('\\frac{dA}{dx} = ' + L + ' - 4x = 0') + ', ' + M('x = ' + num(x)) + ', length ' + num(L / 2) + ' m; area ' + num(A) + ' m²'],
        ['Show that in the best pen the side along the wall is twice the length of each other side.', 1, num(L / 2) + ' = 2 × ' + num(x)]
      ]);
    }
  ]);

  X('fm-matrices', [
    function () {
      var M2 = pick([[[0, -1], [1, 0], 'a rotation of 90° anticlockwise about the origin'], [[0, 1], [1, 0], 'a reflection in the line \\(y = x\\)'], [[-1, 0], [0, 1], 'a reflection in the \\(y\\)-axis'], [[2, 0], [0, 2], 'an enlargement, scale factor 2, centre the origin'], [[0, 1], [-1, 0], 'a rotation of 90° clockwise about the origin']]);
      var A = [M2[0], M2[1]], P = [ri(1, 4), ri(1, 4)], Q2 = [ri(-3, 2), ri(1, 5)]; while (P[0] * Q2[1] - P[1] * Q2[0] === 0) Q2[0]++;
      var im = function (v) { return [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]]; };
      return Q('A transformation maps ' + M('(' + P.join(',\\ ') + ')') + ' to ' + M('(' + im(P).join(',\\ ') + ')') + ' and ' + M('(' + Q2.join(',\\ ') + ')') + ' to ' + M('(' + im(Q2).join(',\\ ') + ')') + '.', [
        ['Let the matrix be ' + M('\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}') + '. Form equations and find ' + M('a, b, c, d') + '.', 4, M(BS.ib.mat(A))],
        ['Describe the transformation fully.', 1, M2[2].charAt(0).toUpperCase() + M2[2].slice(1)],
        ['Find the matrix that maps the images back to the original points.', 2, M(BS.ib.mat((function () { var d = A[0][0] * A[1][1] - A[0][1] * A[1][0]; return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]].map(function (r) { return r.map(function (v) { return num(v); }); }); })()))]
      ]);
    },
    function () {
      var a = nz(-3, 4), n = ri(3, 8);
      return Q(M('\\mathbf{M} = \\begin{pmatrix} 1 & ' + a + ' \\\\ 0 & 1 \\end{pmatrix}') + '.', [
        ['Find ' + M('\\mathbf{M}^2') + ' and ' + M('\\mathbf{M}^3') + '.', 2, M('\\begin{pmatrix} 1 & ' + 2 * a + ' \\\\ 0 & 1 \\end{pmatrix}') + ', ' + M('\\begin{pmatrix} 1 & ' + 3 * a + ' \\\\ 0 & 1 \\end{pmatrix}')],
        ['Write down ' + M('\\mathbf{M}^{' + n + '}') + ' and explain the pattern.', 2, M('\\begin{pmatrix} 1 & ' + n * a + ' \\\\ 0 & 1 \\end{pmatrix}') + '; each multiplication adds ' + a + ' to the top-right entry'],
        ['The unit square is transformed by ' + M('\\mathbf{M}') + '. Describe the image, and explain why its area is still 1.', 2, 'A parallelogram (a shear); the determinant is 1, so area is unchanged.']
      ]);
    }
  ]);

  X('fm-trig', [
    function () {
      var k = pick([3, 5]);
      // 2 sin^2 x + k cos x - k... use 2sin^2x = 3cos x  -> 2 - 2cos^2 = 3 cos -> 2c^2 + 3c - 2 = 0 -> (2c-1)(c+2) -> c = 1/2
      return Q('', [
        ['Show that ' + M('2\\sin^2 x = 3\\cos x') + ' can be written as ' + M('2\\cos^2 x + 3\\cos x - 2 = 0') + '.', 2, 'Use ' + M('\\sin^2 x = 1 - \\cos^2 x')],
        ['Hence solve ' + M('2\\sin^2 x = 3\\cos x') + ' for ' + M('0° \\le x < 360°') + '.', 3, M('(2\\cos x - 1)(\\cos x + 2) = 0') + '; ' + M('\\cos x = \\frac{1}{2}') + ': ' + M('x = 60°,\\ 300°') + ' (' + M('\\cos x = -2') + ' is impossible)'],
        ['Solve ' + M('2\\sin^2 (2x) = 3\\cos (2x)') + ' for ' + M('0° \\le x < 360°') + '.', 3, M('2x = 60°, 300°, 420°, 660°') + ': ' + M('x = 30°, 150°, 210°, 330°')]
      ]);
    },
    function () {
      var t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
      return Q('Angle ' + M('x') + ' is obtuse and ' + M('\\sin x = \\frac{' + t[0] + '}{' + t[2] + '}') + '.', [
        ['Find the exact values of ' + M('\\cos x') + ' and ' + M('\\tan x') + '.', 3, M('\\cos x = -\\frac{' + t[1] + '}{' + t[2] + '}') + ', ' + M('\\tan x = -\\frac{' + t[0] + '}{' + t[1] + '}')],
        ['Prove that ' + M('\\frac{1 - \\cos^2 x}{\\sin x \\cos x} \\equiv \\tan x') + '.', 2, M('\\frac{\\sin^2 x}{\\sin x\\cos x} = \\frac{\\sin x}{\\cos x}')],
        ['Hence find the exact value of ' + M('\\frac{1 - \\cos^2 x}{\\sin x \\cos x}') + ' for this angle.', 1, M('-\\frac{' + t[0] + '}{' + t[1] + '}')]
      ]);
    }
  ]);

  X('fm-geometry', [
    function () {
      var l = ri(6, 12), w = ri(4, 10), h = ri(3, 8), ang = Math.atan(h / w) * 180 / Math.PI, diag = Math.sqrt(l * l + w * w + h * h), ang2 = Math.atan(h / Math.sqrt(l * l + w * w)) * 180 / Math.PI;
      return Q('A wedge has a horizontal rectangular base ' + M('ABCD') + ' with ' + M('AB = ' + l) + ' cm and ' + M('BC = ' + w) + ' cm. The vertical rectangular face ' + M('CDEF') + ' has height ' + h + ' cm, and the sloping face is ' + M('ABFE') + '.', [
        ['Find the angle between the sloping face and the base.', 3, M('\\tan^{-1}\\frac{' + h + '}{' + w + '} = ' + sf3(ang) + '°')],
        ['Find the length of ' + M('AF') + '.', 2, M('\\sqrt{' + l + '^2 + ' + w + '^2 + ' + h + '^2} = ' + sf3(diag)) + ' cm'],
        ['Find the angle between ' + M('AF') + ' and the base, and explain why it is smaller than the angle between the sloping face and the base.', 3, M(sf3(ang2) + '°') + '; ' + M('AF') + ' runs diagonally, so its horizontal projection is longer than ' + w + ' cm']
      ]);
    },
    function () {
      var x = ri(15, 35);
      return Q(M('A, B, C, D') + ' lie on a circle. ' + M('AC') + ' and ' + M('BD') + ' meet at ' + M('X') + '. Angle ' + M('BAC = ' + x + '°') + ' and angle ' + M('ABD = ' + (2 * x) + '°') + '.', [
        ['Find angle ' + M('BDC') + ' and angle ' + M('ACD') + ', giving reasons.', 3, M('BDC = ' + x + '°') + ' and ' + M('ACD = ' + 2 * x + '°') + ' (angles in the same segment)'],
        ['Find angle ' + M('AXB') + '.', 1, M((180 - 3 * x) + '°')],
        ['Prove that triangles ' + M('ABX') + ' and ' + M('DCX') + ' are similar, and hence that ' + M('AX \\times XC = BX \\times XD') + '.', 3, 'Equal angles at ' + M('X') + ' and in the same segments; ratio ' + M('\\frac{AX}{DX} = \\frac{BX}{CX}')]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
