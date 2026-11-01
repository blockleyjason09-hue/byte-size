/* Byte Size Classroom — deeper extension questions (set 3, Further Maths part a): counting, surds, functions, algebra, binomial, factor theorem, quadratics. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }               /* signed constant, never "+ 0" callers avoid 0 */
  function xm(v) { return v ? '(x' + S(-v) + ')' : 'x'; }                  /* (x - v) */
  function fact(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }
  function C(n, r) { if (r < 0 || r > n) return 0; var v = 1; for (var i = 1; i <= r; i++) v = v * (n - r + i) / i; return Math.round(v); }
  function sq(n) { return Math.round(Math.sqrt(n)) * Math.round(Math.sqrt(n)) === n; }
  function nonsq(lo, hi) { var v; do { v = ri(lo, hi); } while (sq(v)); return v; }
  function rt(n) { /* simplify sqrt(n) */ var o = 1, i = n; for (var k = 2; k * k <= i; k++) while (i % (k * k) === 0) { o *= k; i /= k * k; } return i === 1 ? String(o) : (o === 1 ? '' : o) + '\\sqrt{' + i + '}'; }

  X('fm-counting', [
    function () {
      var w = pick([['FACTORS', 2], ['PLANE', 2], ['TRIANGLE', 3], ['NUMBERS', 2], ['DOMAIN', 3]]), word = w[0], n = word.length, v = w[1];
      return Q('The letters of ' + word + ' are all different. ' + v + ' of them are vowels.', [
        ['How many arrangements of all ' + n + ' letters are there?', 1, fact(n)],
        ['How many arrangements start and end with a vowel?', 2, v + ' × ' + (v - 1) + ' × ' + (n - 2) + '! = ' + v * (v - 1) * fact(n - 2)],
        ['How many arrangements have all the vowels next to each other?', 3, 'Treat the vowels as one block: ' + (n - v + 1) + '! × ' + v + '! = ' + fact(n - v + 1) * fact(v)],
        ['What fraction of all arrangements have the vowels together? Explain why it is small.', 1, M(F(fact(n - v + 1) * fact(v), fact(n))) + ': most orders split them up']
      ]);
    },
    function () {
      return Q('A 4-digit PIN uses the digits 0–9.', [
        ['How many PINs are possible?', 1, '10 000'],
        ['How many have no repeated digit?', 2, '10 × 9 × 8 × 7 = 5040'],
        ['How many have at least one repeated digit? Explain why you subtract.', 2, '10 000 − 5040 = 4960; counting “at least one” directly is harder'],
        ['How many have four different digits in strictly increasing order?', 2, '210: each choice of 4 digits gives exactly one increasing order, and 5040 ÷ 4! = 210']
      ]);
    },
    function () {
      var a = ri(5, 9), b = ri(5, 9), n = a + b;
      return Q('A club has ' + a + ' boys and ' + b + ' girls.', [
        ['In how many ways can a captain and a vice-captain be chosen?', 2, n + ' × ' + (n - 1) + ' = ' + n * (n - 1)],
        ['In how many ways if the captain must be a girl and the vice-captain a boy?', 1, b * a],
        ['In how many ways if they must be the same gender?', 2, a * (a - 1) + ' + ' + b * (b - 1) + ' = ' + (a * (a - 1) + b * (b - 1))],
        ['How many different pairs (with no roles) can be chosen? Explain the link to the first answer.', 2, n * (n - 1) / 2 + ': each pair was counted twice when roles mattered']
      ]);
    },
    function () {
      var L = ri(2, 3), D = 5 - L;
      var tot = Math.pow(26, L) * Math.pow(10, D), nr = (L === 2 ? 26 * 25 : 26 * 25 * 24) * (D === 3 ? 720 : 90);
      return Q('Codes consist of ' + L + ' letters followed by ' + D + ' digits.', [
        ['How many codes are possible?', 1, tot.toLocaleString('en-GB')],
        ['How many have no repeated letter and no repeated digit?', 2, nr.toLocaleString('en-GB')],
        ['If one digit is replaced by a letter, by what factor does the number of codes increase?', 2, '2.6'],
        ['Explain why the order of letters then digits does not affect the count.', 1, 'The product of the number of choices is the same in any order.']
      ]);
    },
    function () {
      return Q('Three-digit numbers are made from the digits 1–9, with no digit repeated.', [
        ['How many such numbers are there?', 1, '9 × 8 × 7 = 504'],
        ['How many are odd? Explain why you choose the last digit first.', 3, '5 × 8 × 7 = 280: the last digit has a restriction, so fill it first'],
        ['How many are greater than 500 and even?', 3, 'First digit 5, 7 or 9 then even last (4 ways): 3 × 4 × 7 = 84; first digit 6 or 8 then even last (3 ways): 2 × 3 × 7 = 42; total 126']
      ]);
    },
    function () {
      var n = ri(8, 25), H = n * (n - 1) / 2, m = ri(10, 20);
      return Q('At a meeting, everyone shakes hands with everyone else exactly once.', [
        ['How many handshakes are there with ' + n + ' people?', 2, H],
        ['Explain why the answer is ' + M('\\frac{n(n - 1)}{2}') + ' for ' + M('n') + ' people.', 2, 'Each of ' + M('n') + ' people shakes ' + M('n - 1') + ' hands, and each handshake is counted twice'],
        ['There were ' + m * (m - 1) / 2 + ' handshakes. How many people were there?', 2, m],
        ['Could there be exactly 50 handshakes? Explain.', 1, 'No: ' + M('n(n - 1) = 100') + ' has no whole-number solution']
      ]);
    },
    function () {
      var a = ri(2, 4), b = ri(2, 4);
      return Q('On a grid you may only move one unit right (R) or one unit up (U). You travel from ' + M('(0, 0)') + ' to ' + M('(' + a + ', ' + b + ')') + '.', [
        ['Explain why every route has ' + (a + b) + ' moves, ' + a + ' of them R.', 1, 'You must move ' + a + ' right and ' + b + ' up in total'],
        ['List enough routes to see a pattern, then find the number of routes.', 3, M('\\frac{' + (a + b) + '!}{' + a + '!\\,' + b + '!} = ' + C(a + b, a))],
        ['How many routes pass through ' + M('(1, 1)') + '?', 3, '2 × ' + C(a + b - 2, a - 1) + ' = ' + 2 * C(a + b - 2, a - 1)]
      ]);
    },
    function () {
      var s = ri(3, 5), m = ri(4, 7), d = ri(2, 4);
      return Q('A menu has ' + s + ' starters, ' + m + ' mains and ' + d + ' desserts.', [
        ['How many three-course meals are possible?', 1, s * m * d],
        ['A meal must include a main, and may also have a starter, a dessert, both or neither. How many meals?', 3, (s + 1) + ' × ' + m + ' × ' + (d + 1) + ' = ' + (s + 1) * m * (d + 1)],
        ['Explain the “+ 1” in your method.', 1, 'It counts the option of not having that course'],
        ['How many desserts are needed for more than 200 three-course options?', 2, Math.floor(200 / (s * m)) + 1]
      ]);
    }
  ]);

  X('fm-surds', [
    function () {
      var a = ri(2, 6), b = nonsq(2, 15);
      if (a * a === b) b++;
      var d = a * a - b;
      return Q('Simplify ' + M('\\frac{' + a + ' + \\sqrt{' + b + '}}{' + a + ' - \\sqrt{' + b + '}}') + '.', [
        ['Rationalise the denominator.', 3, M('\\frac{' + (a * a + b) + ' + ' + 2 * a + '\\sqrt{' + b + '}}{' + d + '}')],
        ['Show that the product of this number and its reciprocal is 1 by writing the reciprocal in the same form.', 2, 'Reciprocal ' + M('\\frac{' + (a * a + b) + ' - ' + 2 * a + '\\sqrt{' + b + '}}{' + d + '}') + '; product ' + M('\\frac{' + (a * a + b) + '^2 - ' + 4 * a * a * b + '}{' + d * d + '} = 1')]
      ]);
    },
    function () {
      var a = ri(3, 7), b = nonsq(2, a * a - 1);
      return Q('A rectangle has sides ' + M('(' + a + ' + \\sqrt{' + b + '})') + ' cm and ' + M('(' + a + ' - \\sqrt{' + b + '})') + ' cm.', [
        ['Show that its area is a whole number.', 2, M(a * a + ' - ' + b + ' = ' + (a * a - b)) + ' cm²'],
        ['Find the exact length of a diagonal.', 3, M('\\sqrt{' + (2 * a * a + 2 * b) + '} = ' + rt(2 * a * a + 2 * b)) + ' cm'],
        ['Find the exact perimeter, and explain why it is rational.', 1, 4 * a + ' cm: the surds cancel']
      ]);
    },
    function () {
      var p = nonsq(2, 11), q = ri(2, 9);
      return Q('Solve ' + M('x\\sqrt{' + p + '} = x + ' + q) + '.', [
        ['Show that ' + M('x = \\frac{' + q + '}{\\sqrt{' + p + '} - 1}') + '.', 1, 'Factorise: ' + M('x(\\sqrt{' + p + '} - 1) = ' + q)],
        ['Write ' + M('x') + ' in the form ' + M('a + b\\sqrt{' + p + '}') + '.', 3, M('x = ' + F(q, p - 1) + ' + ' + F(q, p - 1) + '\\sqrt{' + p + '}')],
        ['Check your answer is positive and explain why it must be.', 1, M('\\sqrt{' + p + '} > 1') + ', so ' + M('x') + ' and ' + M(q) + ' have the same sign']
      ]);
    },
    function () {
      var a = ri(2, 7), b; do { b = ri(2, 9); } while (b === a);
      return Q('Find ' + M('\\sqrt{' + (a + b) + ' + 2\\sqrt{' + a * b + '}}') + ' in the form ' + M('\\sqrt{p} + \\sqrt{q}') + '.', [
        ['Square ' + M('\\sqrt{p} + \\sqrt{q}') + ' and compare.', 2, M('p + q = ' + (a + b)) + ', ' + M('pq = ' + a * b)],
        ['Find ' + M('p') + ' and ' + M('q') + '.', 2, M('p = ' + Math.max(a, b) + ',\\ q = ' + Math.min(a, b))],
        ['Explain why ' + M('\\sqrt{' + (a + b) + ' - 2\\sqrt{' + a * b + '}}') + ' equals ' + M('\\sqrt{' + Math.max(a, b) + '} - \\sqrt{' + Math.min(a, b) + '}') + ' and not the other way round.', 2, 'A square root is positive, so the larger surd comes first']
      ]);
    },
    function () {
      var n = pick([3, 8, 15, 24]);
      return Q('Consider ' + M('S = \\frac{1}{\\sqrt{2} + 1} + \\frac{1}{\\sqrt{3} + \\sqrt{2}} + \\cdots + \\frac{1}{\\sqrt{' + (n + 1) + '} + \\sqrt{' + n + '}}') + '.', [
        ['Show that ' + M('\\frac{1}{\\sqrt{k + 1} + \\sqrt{k}} = \\sqrt{k + 1} - \\sqrt{k}') + '.', 2, 'Multiply by ' + M('\\sqrt{k + 1} - \\sqrt{k}') + '; the denominator becomes 1'],
        ['Hence find ' + M('S') + ' exactly.', 3, 'Terms cancel in pairs: ' + M('S = \\sqrt{' + (n + 1) + '} - 1 = ' + (Math.sqrt(n + 1) - 1))],
        ['How many terms are needed for the sum to reach 10?', 1, '120 (up to ' + M('\\sqrt{121}') + ')']
      ]);
    },
    function () {
      var p = nonsq(3, 15);
      return Q('A right-angled triangle has shorter sides ' + M('(\\sqrt{' + p + '} + 1)') + ' and ' + M('(\\sqrt{' + p + '} - 1)') + '.', [
        ['Find its exact area.', 2, M(F(p - 1, 2))],
        ['Find the exact hypotenuse.', 3, M('\\sqrt{' + (2 * p + 2) + '} = ' + rt(2 * p + 2))],
        ['Find the exact value of the tangent of the smaller acute angle.', 2, M('\\frac{\\sqrt{' + p + '} - 1}{\\sqrt{' + p + '} + 1} = \\frac{' + (p + 1) + ' - 2\\sqrt{' + p + '}}{' + (p - 1) + '}')]
      ]);
    },
    function () {
      var a = ri(1, 5), b = nonsq(2, 13);
      return Q('Let ' + M('x = ' + a + ' + \\sqrt{' + b + '}') + '.', [
        ['Show that ' + M('x^2 - ' + 2 * a + 'x') + ' is an integer, and find it.', 2, M((b - a * a))],
        ['Hence write down a quadratic with integer coefficients that has ' + M('x') + ' as a root.', 1, M(poly([1, -2 * a, a * a - b]) + ' = 0')],
        ['Find the other root, and explain why surd roots of such quadratics come in pairs.', 2, M(a + ' - \\sqrt{' + b + '}') + ': the ± in the quadratic formula gives both']
      ]);
    },
    function () {
      var s = pick([10, 12, 14, 16]), p = ri(1, s / 2 - 2), q = p + ri(1, s / 2 - 1 - p);
      return Q('Without a calculator, decide which is larger: ' + M('\\sqrt{' + p + '} + \\sqrt{' + (s - p) + '}') + ' or ' + M('\\sqrt{' + q + '} + \\sqrt{' + (s - q) + '}') + '.', [
        ['Square both expressions.', 2, M(s + ' + 2\\sqrt{' + p * (s - p) + '}') + ' and ' + M(s + ' + 2\\sqrt{' + q * (s - q) + '}')],
        ['Hence decide, explaining why squaring is valid here.', 2, 'The second is larger since ' + q * (s - q) + ' > ' + p * (s - p) + '; both are positive, so squaring keeps the order'],
        ['Which pair of numbers adding to ' + s + ' gives the largest sum of square roots?', 1, (s / 2) + ' and ' + (s / 2)]
      ]);
    }
  ]);

  X('fm-functions', [
    function () {
      var a = nz(-4, 4), b = nz(-5, 5), c = nz(-5, 5);
      if (a === 1) a = 2;
      return Q(M('f(x) = ' + poly([a, b])) + ' and ' + M('g(x) = ' + poly([1, 0, c])) + '.', [
        ['Find ' + M('fg(x)') + ' and ' + M('gf(x)') + '.', 3, M('fg(x) = ' + poly([a, 0, a * c + b])) + ', ' + M('gf(x) = ' + poly([a * a, 2 * a * b, b * b + c]))],
        ['Show that ' + M('fg(x) = gf(x)') + ' leads to a quadratic equation, and decide how many solutions it has.', 3, M(poly([a * a - a, 2 * a * b, b * b + c - a * c - b]) + ' = 0') + '; discriminant ' + (4 * a * a * b * b - 4 * (a * a - a) * (b * b + c - a * c - b)) + ' → ' + (function (D) { return D > 0 ? 'two solutions' : D === 0 ? 'one solution' : 'no real solutions'; })(4 * a * a * b * b - 4 * (a * a - a) * (b * b + c - a * c - b))],
        ['Explain why composite functions are not usually commutative.', 1, 'The order changes which function acts on the output of the other']
      ]);
    },
    function () {
      var a = nz(-4, 4), b; do { b = nz(-6, 6); } while (b === -a * a);
      return Q(M('f(x) = \\frac{' + poly([a, b]) + '}{' + poly([1, -a]) + '}') + ', ' + M('x \\ne ' + a) + '.', [
        ['Find ' + M('f^{-1}(x)') + '.', 3, M('f^{-1}(x) = \\frac{' + poly([a, b]) + '}{' + poly([1, -a]) + '}')],
        ['What do you notice? Explain what this means about the graph of ' + M('y = f(x)') + '.', 2, M('f') + ' is self-inverse, so the graph is symmetric in ' + M('y = x')],
        ['Verify by finding ' + M('ff(' + (a + 1) + ')') + '.', 2, M('f(' + (a + 1) + ') = ' + (a * (a + 1) + b)) + ', ' + M('f(' + (a * (a + 1) + b) + ') = ' + (a + 1))]
      ]);
    },
    function () {
      var k = nz(-4, 4), c = ri(-5, 8);
      return Q(M('f(x) = ' + poly([1, -2 * k, c])) + ' for ' + M('x \\ge ' + k) + '.', [
        ['Complete the square and state the range of ' + M('f') + '.', 2, M('f(x) = ' + xm(k) + '^2' + (c - k * k ? S(c - k * k) : '')) + ', ' + M('f(x) \\ge ' + (c - k * k))],
        ['Find ' + M('f^{-1}(x)') + ' and state its domain.', 3, M('f^{-1}(x) = ' + k + ' + \\sqrt{x' + (k * k - c ? S(k * k - c) : '') + '}') + ', ' + M('x \\ge ' + (c - k * k))],
        ['Explain why the domain of ' + M('f') + ' had to be restricted for the inverse to exist.', 1, 'Without it ' + M('f') + ' is many-to-one (two inputs give each output)']
      ]);
    },
    function () {
      var a = ri(1, 8), b = ri(-6, 6);
      return Q(M('f(x) = \\sqrt{x - ' + a + '}') + ' and ' + M('g(x) = ' + poly([1, 0, b])) + '.', [
        ['State the domain and range of ' + M('f') + '.', 2, M('x \\ge ' + a) + ', ' + M('f(x) \\ge 0')],
        ['Find ' + M('fg(x)') + ' and the values of ' + M('x') + ' for which it is defined.', 3, M('\\sqrt{x^2' + (b - a ? S(b - a) : '') + '}') + (b - a >= 0 ? ', defined for all ' + M('x') : ', defined for ' + M('|x| \\ge ' + rt(a - b)))],
        ['Solve ' + M('fg(x) = 3') + '.', 2, M('x^2 = ' + (9 + a - b)) + ', ' + (9 + a - b > 0 ? M('x = \\pm ' + rt(9 + a - b)) : 'no solutions')]
      ]);
    },
    function () {
      var a = pick([-3, -2, 2, 3, 4]), b = nz(-6, 6);
      return Q(M('f(x) = ' + poly([a, b])) + '.', [
        ['Find ' + M('ff(x)') + ' and ' + M('fff(x)') + '.', 2, M(poly([a * a, a * b + b])) + ', ' + M(poly([a * a * a, a * a * b + a * b + b]))],
        ['Solve ' + M('ff(x) = x') + ' and show it gives the same answer as ' + M('f(x) = x') + '.', 3, M('x = ' + F(-b, a - 1)) + ' in both cases'],
        ['Explain geometrically why this is the point where ' + M('y = f(x)') + ' meets ' + M('y = f^{-1}(x)') + '.', 2, 'Both meet the line ' + M('y = x') + ' there; ' + M('f') + ' leaves it fixed, so ' + M('f^{-1}') + ' does too']
      ]);
    },
    function () {
      var k = ri(1, 4), ff1 = k < 2 ? k * k : k * (6 - k) / 2;
      return Q('A function is defined by ' + M('f(x) = ' + (k === 1 ? '' : k) + 'x') + ' for ' + M('0 \\le x < 2') + ' and ' + M('f(x) = ' + (k === 2 ? '' : F(k, 2)) + '(6 - x)') + ' for ' + M('2 \\le x \\le 6') + '.', [
        ['Show that the two pieces join up at ' + M('x = 2') + '.', 1, 'Both give ' + 2 * k],
        ['Find ' + M('ff(1)') + '.', 2, num(ff1)],
        ['Solve ' + M('f(x) = ' + k) + '.', 3, M('x = 1') + ' or ' + M('x = 4')],
        ['Find the area between the graph and the ' + M('x') + '-axis.', 1, 6 * k]
      ]);
    },
    function () {
      var a = ri(2, 6), c = ri(1, 9);
      return Q(M('f(x) = x^3 - ' + a + 'x') + ' and ' + M('g(x) = x^2 + ' + c) + '.', [
        ['Show that ' + M('f(-x) = -f(x)') + ' and ' + M('g(-x) = g(x)') + '. What does each tell you about the graph?', 3, M('f') + ' is odd (rotational symmetry about the origin); ' + M('g') + ' is even (symmetric in the ' + M('y') + '-axis)'],
        ['Is ' + M('f(x) + g(x)') + ' odd, even or neither? Justify.', 2, 'Neither: e.g. at ' + M('x = 1') + ' it is ' + (1 - a + 1 + c) + ', at ' + M('x = -1') + ' it is ' + (-1 + a + 1 + c)],
        ['Is ' + M('f(x)g(x)') + ' odd, even or neither? Justify.', 2, 'Odd: ' + M('f(-x)g(-x) = -f(x)g(x)')]
      ]);
    },
    function () {
      var a = nz(-5, 5), b = ri(2, 6);
      return Q(M('f(x) = ' + b + 'x' + S(a)) + ' and ' + M('g(x) = \\frac{x' + S(-a) + '}{' + b + '}') + '.', [
        ['Show that ' + M('fg(x) = gf(x) = x') + '. What does this tell you?', 2, M('g = f^{-1}')],
        ['Find where ' + M('y = f(x)') + ' meets ' + M('y = g(x)') + '.', 2, M('(' + F(-a, b - 1) + ', ' + F(-a, b - 1) + ')')],
        ['Explain why this point must lie on ' + M('y = x') + '.', 1, 'The graphs are reflections of each other in ' + M('y = x')]
      ]);
    }
  ]);

  X('fm-algebra', [
    function () {
      var a = ri(1, 6), b; do { b = nz(-6, 6); } while (b === a || b === -a);
      return Q('Simplify ' + M('\\frac{x^2 - ' + a * a + '}{' + poly([1, b - a, -a * b]) + '}') + '.', [
        ['Factorise the numerator and denominator.', 2, M('\\frac{(x + ' + a + ')(x - ' + a + ')}{(x - ' + a + ')' + xm(-b) + '}')],
        ['Simplify fully and state the values of ' + M('x') + ' for which the original is not defined.', 2, M('\\frac{x + ' + a + '}{' + poly([1, b]) + '}') + '; ' + M('x \\ne ' + a + ',\\ x \\ne ' + (-b))],
        ['Solve ' + M('\\frac{x^2 - ' + a * a + '}{' + poly([1, b - a, -a * b]) + '} = 2') + '.', 2, M('x = ' + (a - 2 * b))]
      ]);
    },
    function () {
      var B = nz(-4, 4), Cc = ri(1, 9), A = pick([2, 3, 5]);
      return Q('Write ' + M(poly([A, 2 * A * B, A * B * B + Cc])) + ' in the form ' + M('A(x + B)^2 + C') + '.', [
        ['Find ' + M('A, B, C') + '.', 3, M('A = ' + A + ',\\ B = ' + B + ',\\ C = ' + Cc)],
        ['State the minimum value and where it occurs.', 1, Cc + ' at ' + M('x = ' + (-B))],
        ['Explain why the expression is positive for every value of ' + M('x') + '.', 1, 'A square is never negative, so it is at least ' + Cc],
        ['Find the range of values of ' + M('k') + ' for which ' + M(poly([A, 2 * A * B, A * B * B + Cc]) + ' = k') + ' has two solutions.', 1, M('k > ' + Cc)]
      ]);
    },
    function () {
      var n = ri(5, 20);
      return Q('Consider ' + M('S_n = \\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\cdots + \\frac{1}{n(n + 1)}') + '.', [
        ['Show that ' + M('\\frac{1}{k} - \\frac{1}{k + 1} = \\frac{1}{k(k + 1)}') + '.', 2, 'Common denominator ' + M('k(k + 1)')],
        ['Hence show that ' + M('S_n = \\frac{n}{n + 1}') + '.', 3, 'All middle terms cancel: ' + M('1 - \\frac{1}{n + 1}')],
        ['Find ' + M('S_{' + n + '}') + ' and explain what happens as ' + M('n') + ' gets very large.', 2, M(F(n, n + 1)) + '; the sum gets closer and closer to 1']
      ]);
    },
    function () {
      var r1, r2, a, b;
      do { r1 = ri(2, 6); r2 = -ri(2, 6); a = (r1 + 1) * (r2 + 1) / 2; b = r1 + r2 - a; } while (a !== Math.round(a) || a === 0 || b === 0);
      return Q('Solve ' + M('\\frac{' + a + '}{x + 1} + \\frac{' + b + '}{x - 1} = 1') + '.', [
        ['Multiply through and show it becomes a quadratic.', 3, M(poly([1, -(r1 + r2), r1 * r2]) + ' = 0')],
        ['Solve it.', 2, M('x = ' + r1) + ' or ' + M('x = ' + r2)],
        ['Explain why you must check that neither solution is ' + M('\\pm 1') + '.', 1, 'Those values make a denominator zero']
      ]);
    },
    function () {
      return Q('Consecutive cubes.', [
        ['Show that ' + M('(n + 1)^3 - n^3 = 3n^2 + 3n + 1') + '.', 2, 'Expand ' + M('(n + 1)^3 = n^3 + 3n^2 + 3n + 1')],
        ['Prove that the difference of two consecutive cubes is always odd.', 2, M('3n^2 + 3n = 3n(n + 1)') + ' is even (product of consecutive integers), so adding 1 gives odd'],
        ['Prove that it is never a multiple of 3.', 1, 'It is one more than a multiple of 3'],
        ['Find two consecutive cubes that differ by 397.', 1, M('3n^2 + 3n + 1 = 397') + ', ' + M('n = 11') + ': 1331 and 1728']
      ]);
    },
    function () {
      var a = nz(-5, 5), b = nz(-6, 6), c = ri(1, 4), d = nz(-6, 6);
      if (a * d === b * c) d = d + 1 || 2;
      return Q('Make ' + M('x') + ' the subject of ' + M('y = \\frac{' + poly([a, b]) + '}{' + poly([c, d]) + '}') + '.', [
        ['Rearrange.', 3, M('x = \\frac{' + poly([-d, b]).replace(/x/g, 'y') + '}{' + poly([c, -a]).replace(/x/g, 'y') + '}')],
        ['Find the one value of ' + M('y') + ' that can never be produced. Explain.', 2, M('y = ' + F(a, c)) + ': the denominator of the rearranged formula is zero there'],
        ['Interpret this as a feature of the graph of ' + M('y') + ' against ' + M('x') + '.', 1, 'A horizontal asymptote at ' + M('y = ' + F(a, c))]
      ]);
    },
    function () {
      var k = ri(2, 6);
      return Q('Simplify ' + M('\\frac{x^3 - ' + k * k * k + '}{x - ' + k + '}') + '.', [
        ['By checking ' + M('(x - ' + k + ')(x^2 + ' + k + 'x + ' + k * k + ')') + ', simplify the fraction.', 2, M('x^2 + ' + k + 'x + ' + k * k)],
        ['Show that the result is positive for all ' + M('x') + ' by completing the square.', 3, M('\\left(x + ' + F(k, 2) + '\\right)^2 + ' + F(3 * k * k, 4) + ' > 0')],
        ['Hence explain why ' + M('x^3 = ' + k * k * k) + ' has only one real solution.', 1, 'The quadratic factor has no real roots']
      ]);
    },
    function () {
      var a = nz(-4, 4), b = nz(-4, 4), c = nz(-4, 4);
      return Q('Expand ' + M('(x' + S(a) + ')(x' + S(b) + ')(x' + S(c) + ')') + '.', [
        ['Give your answer in the form ' + M('x^3 + px^2 + qx + r') + '.', 3, M(poly([1, a + b + c, a * b + b * c + a * c, a * b * c]))],
        ['Explain why ' + M('p') + ' is the sum of ' + a + ', ' + b + ' and ' + c + ', and ' + M('r') + ' is their product.', 2, M('x^2') + ' terms come from picking one constant and two ' + M('x') + '’s; the constant term multiplies all three'],
        ['Without expanding, find the coefficient of ' + M('x^2') + ' in ' + M('(x + 1)(x + 2)\\cdots(x + 10)') + '.', 2, 'Sum of products of pairs: ' + M('\\frac{55^2 - 385}{2} = 1320')]
      ]);
    }
  ]);

  X('fm-binomial', [
    function () {
      var n = ri(5, 14), k = n * (n - 1) / 2;
      return Q('In the expansion of ' + M('(1 + x)^n') + ', the coefficient of ' + M('x^2') + ' is ' + k + '.', [
        ['Find ' + M('n') + '.', 3, M('\\frac{n(n - 1)}{2} = ' + k) + ', ' + M('n = ' + n)],
        ['Find the coefficient of ' + M('x^3') + '.', 1, C(n, 3)],
        ['Explain why the coefficients of ' + M('x^2') + ' and ' + M('x^{' + (n - 2) + '}') + ' are equal.', 1, 'Choosing which 2 of the ' + n + ' brackets give ' + M('x') + ' is the same as choosing which ' + (n - 2) + ' give 1, so ' + M('\\binom{' + n + '}{2} = \\binom{' + n + '}{' + (n - 2) + '}')]
      ]);
    },
    function () {
      var n = pick([4, 6, 8]), c = pick([1, 2, 3]);
      var t = C(n, n / 2) * Math.pow(c, n / 2);
      return Q('Consider ' + M('\\left(x + \\frac{' + c + '}{x}\\right)^{' + n + '}') + '.', [
        ['Write down the general term.', 2, M('\\binom{' + n + '}{r}x^{' + n + ' - r}\\left(\\frac{' + c + '}{x}\\right)^r')],
        ['Find the term independent of ' + M('x') + '.', 3, M('r = ' + n / 2) + ': ' + t],
        ['Explain why ' + M('\\left(x + \\frac{' + c + '}{x}\\right)^{' + (n + 1) + '}') + ' has no term independent of ' + M('x') + '.', 1, 'You would need ' + M('r = ' + (n + 1) / 2) + ', which is not a whole number']
      ]);
    },
    function () {
      var n = ri(5, 8), p = pick([1, 2, 3]);
      var x = p / 100, approx = 1 + n * x + n * (n - 1) / 2 * x * x, act = Math.pow(1 + x, n);
      return Q('Use the binomial expansion to estimate ' + M('1.0' + p + '^{' + n + '}') + '.', [
        ['Write the first three terms of ' + M('(1 + x)^{' + n + '}') + '.', 1, M('1 + ' + n + 'x + ' + C(n, 2) + 'x^2')],
        ['Use them to estimate ' + M('1.0' + p + '^{' + n + '}') + '.', 2, approx.toFixed(4) + ' (true value ' + act.toFixed(4) + ')'],
        ['Find the percentage error, and explain why the approximation is good.', 2, sf3(100 * (act - approx) / act) + '%; the missing terms involve ' + M('x^3') + ' and higher, which are tiny for small ' + M('x')]
      ]);
    },
    function () {
      var n = ri(3, 9);
      return Q('In ' + M('(1 + ax)^{' + n + '}') + ' the coefficients of ' + M('x') + ' and ' + M('x^2') + ' are equal, with ' + M('a \\ne 0') + '.', [
        ['Form an equation in ' + M('a') + '.', 2, M(n + 'a = ' + C(n, 2) + 'a^2')],
        ['Find ' + M('a') + '.', 2, M('a = ' + F(2, n - 1))],
        ['Find the coefficient of ' + M('x^3') + '.', 2, M(F(C(n, 3) * 8, Math.pow(n - 1, 3)))]
      ]);
    },
    function () {
      var k = pick([2, 3, 5]);
      var val = 2 * (1 + 6 * k + k * k);
      return Q('Consider ' + M('(1 + x)^4 + (1 - x)^4') + '.', [
        ['Expand and simplify.', 2, M('2 + 12x^2 + 2x^4')],
        ['Explain why the odd powers disappear.', 1, 'They have opposite signs in the two expansions'],
        ['Hence find the exact value of ' + M('(1 + \\sqrt{' + k + '})^4 + (1 - \\sqrt{' + k + '})^4') + '.', 2, val],
        ['Explain why the answer is an integer.', 1, 'Only even powers of ' + M('\\sqrt{' + k + '}') + ' remain']
      ]);
    },
    function () {
      var n = ri(5, 10);
      return Q('Row ' + n + ' of Pascal’s triangle gives the coefficients of ' + M('(1 + x)^{' + n + '}') + '.', [
        ['By substituting a value of ' + M('x') + ', show that the row adds up to ' + M('2^{' + n + '}') + '.', 2, 'Put ' + M('x = 1') + ': ' + M('2^{' + n + '} = ' + Math.pow(2, n))],
        ['What does ' + M('x = -1') + ' tell you about the coefficients?', 2, 'The alternating sum is 0: the even-position and odd-position coefficients have equal totals'],
        ['Hence find the sum of the coefficients in odd positions.', 1, Math.pow(2, n - 1)]
      ]);
    },
    function () {
      var n = ri(4, 7), p = ri(1, 3), q = nz(-3, 3);
      var c2 = C(n, 2) * Math.pow(p, n - 2) + q * n * Math.pow(p, n - 1);
      return Q('Find the coefficient of ' + M('x^2') + ' in ' + M('(' + p + ' + x)^{' + n + '}(1' + S(q).replace(/ 1$/, ' ') + 'x)') + '.', [
        ['Find the first three terms of ' + M('(' + p + ' + x)^{' + n + '}') + '.', 2, M(Math.pow(p, n) + ' + ' + n * Math.pow(p, n - 1) + 'x + ' + C(n, 2) * Math.pow(p, n - 2) + 'x^2')],
        ['Hence find the coefficient of ' + M('x^2') + '.', 2, c2],
        ['Find the value of ' + M('q') + ' that would make this coefficient zero.', 2, M('q = ' + F(-C(n, 2) * Math.pow(p, n - 2), n * Math.pow(p, n - 1)))]
      ]);
    },
    function () {
      var n = ri(6, 12);
      var co = []; for (var r = 0; r <= n; r++) co.push(C(n, r) * Math.pow(2, r));
      var best = co.indexOf(Math.max.apply(null, co));
      return Q('Consider ' + M('(1 + 2x)^{' + n + '}') + '.', [
        ['Show that the ratio of the coefficient of ' + M('x^{r + 1}') + ' to that of ' + M('x^r') + ' is ' + M('\\frac{2(' + n + ' - r)}{r + 1}') + '.', 3, 'Divide ' + M('\\binom{' + n + '}{r + 1}2^{r + 1}') + ' by ' + M('\\binom{' + n + '}{r}2^r')],
        ['Hence find which power of ' + M('x') + ' has the largest coefficient.', 3, M('x^{' + best + '}') + ' (the ratio drops below 1 after that)'],
        ['Find that coefficient.', 1, co[best]]
      ]);
    }
  ]);

  X('fm-factor', [
    function () {
      var r = [nz(-4, 4), nz(-4, 4), nz(-4, 4)];
      var p = [1, -(r[0] + r[1] + r[2]), r[0] * r[1] + r[1] * r[2] + r[0] * r[2], -r[0] * r[1] * r[2]];
      var k = ri(5, 7);
      return Q(M('p(x) = ' + poly(p)) + '.', [
        ['Show that ' + M(xm(r[0])) + ' is a factor.', 1, M('p(' + r[0] + ') = 0')],
        ['Factorise ' + M('p(x)') + ' fully.', 3, M(xm(r[0]) + xm(r[1]) + xm(r[2]))],
        ['Find the remainder when ' + M('p(x)') + ' is divided by ' + M('(x - ' + k + ')') + '.', 1, (k - r[0]) * (k - r[1]) * (k - r[2])],
        ['Solve ' + M('p(x) > 0') + '.', 2, (function () { var s = r.slice().sort(function (a, b) { return a - b; }); if (s[0] === s[1] && s[1] === s[2]) return M('x > ' + s[0]); if (s[0] === s[1]) return M('x > ' + s[2]); if (s[1] === s[2]) return M('x > ' + s[0] + ',\\ x \\ne ' + s[1]); return M(s[0] + ' < x < ' + s[1]) + ' or ' + M('x > ' + s[2]); })()]
      ]);
    },
    function () {
      var r; do { r = [nz(-4, 4), nz(-4, 4), nz(-5, 5)]; } while (r[0] === r[1]);
      var a = -(r[0] + r[1] + r[2]), b = r[0] * r[1] + r[1] * r[2] + r[0] * r[2], c = -r[0] * r[1] * r[2];
      return Q(M('p(x) = x^3 + ax^2 + bx' + S(c)) + '. Both ' + M(xm(r[0])) + ' and ' + M(xm(r[1])) + ' are factors.', [
        ['Form two equations in ' + M('a') + ' and ' + M('b') + '.', 2, M('p(' + r[0] + ') = 0') + ' and ' + M('p(' + r[1] + ') = 0')],
        ['Solve them.', 3, M('a = ' + a + ',\\ b = ' + b)],
        ['Find the third factor without further division, explaining your reasoning.', 2, M(xm(r[2])) + ': the constant term ' + c + ' is ' + M('-(' + r[0] + ')(' + r[1] + ')(\\text{third root})')]
      ]);
    },
    function () {
      var n = ri(3, 9);
      return Q('Consider ' + M('p(x) = x^{' + n + '} - 1') + '.', [
        ['Show that ' + M('(x - 1)') + ' is always a factor.', 1, M('1^{' + n + '} - 1 = 0')],
        ['Is ' + M('(x + 1)') + ' a factor? Explain for general ' + M('n') + '.', 2, M('(-1)^n - 1 = 0') + ' only when ' + M('n') + ' is even, so ' + (n % 2 ? 'not here' : 'yes here')],
        ['Find the quotient when ' + M('x^{' + n + '} - 1') + ' is divided by ' + M('(x - 1)') + '.', 2, M('x^{' + (n - 1) + '} + x^{' + (n - 2) + '} + \\cdots + x + 1')],
        ['Hence explain why ' + M('7^{' + n + '} - 1') + ' is divisible by 6.', 1, 'Put ' + M('x = 7') + ': ' + M('7^{' + n + '} - 1 = 6 \\times (7^{' + (n - 1) + '} + \\cdots + 1)')]
      ]);
    },
    function () {
      var r = nz(-4, 4), b = ri(-3, 3), c = ri(b * b + 1, b * b + 9);
      var p = [1, 2 * b - r, c - 2 * b * r, -c * r];
      return Q(M('p(x) = ' + poly(p)) + '.', [
        ['Show that ' + M(xm(r)) + ' is a factor and find the quadratic factor.', 3, M(xm(r) + '(' + poly([1, 2 * b, c]) + ')')],
        ['Show that ' + M('p(x) = 0') + ' has exactly one real root.', 2, 'The quadratic has discriminant ' + (4 * b * b - 4 * c) + ' < 0'],
        ['Sketch ' + M('y = p(x)') + ', marking the intercepts.', 2, 'Crosses the ' + M('x') + '-axis once at ' + r + ', and the ' + M('y') + '-axis at ' + (-c * r)]
      ]);
    },
    function () {
      var a = nz(-3, 3), k1 = ri(1, 3), k2 = -ri(1, 3);
      var b = -(k1 * k1 * k1 - k2 * k2 * k2 + a * (k1 * k1 - k2 * k2)) / (k1 - k2);
      if (b !== Math.round(b)) b = Math.round(b);
      var rem = function (x) { return x * x * x + a * x * x + b * x + 5; };
      return Q(M('p(x) = x^3' + (a === 1 ? ' + x^2' : a === -1 ? ' - x^2' : S(a) + 'x^2') + ' + bx + 5') + '. The remainder on dividing by ' + M(xm(k1)) + ' equals the remainder on dividing by ' + M(xm(k2)) + '.', [
        ['Form an equation and find ' + M('b') + '.', 3, M('p(' + k1 + ') = p(' + k2 + ')') + ' gives ' + M('b = ' + b)],
        ['Find the common remainder.', 1, rem(k1)],
        ['Explain why ' + M('p(x)' + S(-rem(k1))) + ' has both ' + M(xm(k1)) + ' and ' + M(xm(k2)) + ' as factors.', 2, 'It equals 0 at both values']
      ]);
    },
    function () {
      var r = nz(-4, 4), s; do { s = nz(-4, 4); } while (s === r);
      var p = [1, -(2 * r + s), r * r + 2 * r * s, -r * r * s];
      return Q(M('p(x) = ' + poly(p)) + ' has a repeated factor.', [
        ['Show that ' + M(xm(r)) + ' and ' + M(xm(s)) + ' are factors.', 2, M('p(' + r + ') = p(' + s + ') = 0')],
        ['Factorise fully.', 2, M(xm(r) + '^2' + xm(s))],
        ['Describe what the graph does at ' + M('x = ' + r) + ' and at ' + M('x = ' + s) + '.', 2, 'Touches the axis at ' + r + ' (repeated root); crosses at ' + s],
        ['Solve ' + M('p(x) \\le 0') + '.', 2, M('x \\le ' + s) + ' or ' + M('x = ' + r) + (r < s ? ' (already included)' : '')]
      ]);
    },
    function () {
      var r = nz(-3, 3), s = nz(-3, 3);
      var p = [2, -1 - 2 * (r + s), (r + s) + 2 * r * s, -r * s];
      return Q(M('p(x) = ' + poly(p)) + '.', [
        ['Show that ' + M('(2x - 1)') + ' is a factor by evaluating a suitable value.', 2, M('p\\left(\\tfrac{1}{2}\\right) = 0')],
        ['Factorise fully.', 3, M('(2x - 1)' + xm(r) + xm(s))],
        ['Explain how the factor theorem must be adapted for factors like ' + M('(ax - b)') + '.', 1, 'Evaluate ' + M('p\\left(\\tfrac{b}{a}\\right)')]
      ]);
    },
    function () {
      var r = nz(-3, 3), s; do { s = nz(-3, 3); } while (s === r); var k = nz(-4, 4);
      return Q('A cubic ' + M('p(x)') + ' has leading coefficient 1, factors ' + M(xm(r)) + ' and ' + M(xm(s)) + ', and ' + M('p(0) = ' + (-r * s * k)) + '.', [
        ['Find the third factor.', 2, M(xm(k))],
        ['Write ' + M('p(x)') + ' in expanded form.', 2, M(poly([1, -(r + s + k), r * s + s * k + r * k, -r * s * k]))],
        ['Explain why ' + M('p(0)') + ' alone was enough to find the third factor here.', 1, M('p(0)') + ' is minus the product of the three roots']
      ]);
    }
  ]);

  X('fm-quadratics', [
    function () {
      var m = ri(2, 8);
      return Q('The equation ' + M('x^2 + kx + ' + m * m + ' = 0') + ' has equal roots.', [
        ['Find the possible values of ' + M('k') + '.', 2, M('k = \\pm ' + 2 * m)],
        ['For what values of ' + M('k') + ' are there no real roots?', 2, M('-' + 2 * m + ' < k < ' + 2 * m)],
        ['When ' + M('k = ' + 2 * m) + ', find the root, and explain the link to the graph.', 2, M('x = ' + (-m)) + '; the curve touches the ' + M('x') + '-axis there']
      ]);
    },
    function () {
      var m = 2 * nz(-3, 3), p = ri(-4, 6), c = p - m * m / 4;
      return Q('The line ' + M('y = ' + m + 'x + c') + ' is a tangent to ' + M('y = x^2' + (p ? S(p) : '')) + '.', [
        ['Show that ' + M('x^2' + S(-m) + 'x + (' + p + ' - c) = 0') + ' has equal roots.', 2, 'Equate and rearrange; a tangent meets the curve once'],
        ['Find ' + M('c') + '.', 2, M('c = ' + c)],
        ['Find the point of contact.', 2, M('(' + m / 2 + ', ' + (m * m / 4 + p) + ')')]
      ]);
    },
    function () {
      var a = nz(-5, 5), b = nz(-5, 5), s = a + b, p = a * b;
      return Q('The roots of ' + M(poly([1, -s, p]) + ' = 0') + ' are ' + M('\\alpha') + ' and ' + M('\\beta') + '. Do not solve the equation.', [
        ['Write down ' + M('\\alpha + \\beta') + ' and ' + M('\\alpha\\beta') + '.', 1, s + ' and ' + p],
        ['Find ' + M('\\alpha^2 + \\beta^2') + '.', 2, M('(\\alpha + \\beta)^2 - 2\\alpha\\beta = ' + (s * s - 2 * p))],
        ['Find a quadratic equation whose roots are ' + M('2\\alpha') + ' and ' + M('2\\beta') + '.', 2, M(poly([1, -2 * s, 4 * p]) + ' = 0')],
        ['Check by solving the original equation.', 1, M('\\alpha, \\beta = ' + a + ', ' + b)]
      ]);
    },
    function () {
      var a = ri(1, 3), b = ri(a + 1, 5);
      return Q('Solve ' + M('x^4 - ' + (a * a + b * b) + 'x^2 + ' + a * a * b * b + ' = 0') + '.', [
        ['Use the substitution ' + M('y = x^2') + ' and solve for ' + M('y') + '.', 2, M('y = ' + a * a) + ' or ' + M('y = ' + b * b)],
        ['Find all four values of ' + M('x') + '.', 2, M('\\pm ' + a + ',\\ \\pm ' + b)],
        ['Explain why ' + M('x^4 + ' + (a * a + b * b) + 'x^2 + ' + a * a * b * b + ' = 0') + ' has no real solutions.', 1, 'Every term is non-negative and the constant is positive']
      ]);
    },
    function () {
      var P = 4 * ri(5, 20);
      return Q('A rectangle has perimeter ' + P + ' cm.', [
        ['Show that its area is ' + M('A = x(' + P / 2 + ' - x)') + ', where ' + M('x') + ' is one side.', 1, 'The other side is ' + M(P / 2 + ' - x')],
        ['By completing the square, find the maximum area.', 3, M('A = ' + P * P / 16 + ' - (x - ' + P / 4 + ')^2') + ', max ' + P * P / 16 + ' cm²'],
        ['What shape gives the maximum? Explain why this makes sense.', 1, 'A square of side ' + P / 4 + ' cm: it is the most “balanced” rectangle']
      ]);
    },
    function () {
      var a = ri(-6, 2), b = a + ri(3, 9);
      return Q('Solve ' + M(poly([1, -(a + b), a * b]) + ' < 0') + '.', [
        ['Factorise and sketch the graph.', 2, M(xm(a) + xm(b))],
        ['Solve the inequality.', 2, M(a + ' < x < ' + b)],
        ['How many integers satisfy it?', 1, b - a - 1],
        ['Find the inequality, with integer coefficients, whose solution is ' + M('x \\le ' + a + ' \\text{ or } x \\ge ' + b) + '.', 1, M(poly([1, -(a + b), a * b]) + ' \\ge 0')]
      ]);
    },
    function () {
      var pr = pick([[-1, 4], [-4, 1], [-2, 8], [-8, 2], [-1, 9], [-9, 1], [-3, 3]]), r1 = pr[0], r2 = pr[1], b = Math.round(Math.sqrt(-r1 * r2)), d = r1 + r2;
      return Q('The equation ' + M('kx^2 + ' + 2 * b + 'x + ' + (d ? '(k' + S(-d) + ')' : 'k') + ' = 0') + ' has real roots.', [
        ['Show that ' + M(poly([1, -d, r1 * r2]).replace(/x/g, 'k') + ' \\le 0') + '.', 3, 'Discriminant ' + M(4 * b * b + ' - 4k(k' + (d ? S(-d) : '') + ') \\ge 0')],
        ['Find the range of values of ' + M('k') + '.', 2, M(r1 + ' \\le k \\le ' + r2) + ', ' + M('k \\ne 0')],
        ['Explain why ' + M('k = 0') + ' must be treated separately.', 1, 'Then the equation is linear, not quadratic']
      ]);
    },
    function () {
      var S0 = ri(6, 16), P0 = ri(10, 80);
      var real = S0 * S0 >= 4 * P0;
      return Q('Two numbers have sum ' + M('S') + ' and product ' + M('P') + '.', [
        ['Show that they are the roots of ' + M('x^2 - Sx + P = 0') + '.', 2, M('(x - a)(x - b) = x^2 - (a + b)x + ab')],
        ['Prove that real numbers like this exist only when ' + M('S^2 \\ge 4P') + '.', 2, 'The discriminant must be non-negative'],
        ['Is it possible to have sum ' + S0 + ' and product ' + P0 + '? If so, find the numbers.', 2, real ? 'Yes: ' + M('\\frac{' + S0 + ' \\pm \\sqrt{' + (S0 * S0 - 4 * P0) + '}}{2}') : 'No: ' + M(S0 * S0 + ' < ' + 4 * P0)]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
