/* Byte Size Classroom — deeper extension questions (set 3, A level Year 2 part a): proof, functions and modulus, sequences and series, general binomial expansion. */
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
  function tm(c, v) { return c ? (c < 0 ? ' - ' : ' + ') + cf(sf3(Math.abs(c)), v) : ''; }
  function xm(v) { return v ? '(x' + S(-v) + ')' : 'x'; }

  X('a2-proof', [
    function () {
      var p = pick([2, 3, 5, 7, 11]);
      return Q('Prove by contradiction that ' + M('\\sqrt{' + p + '}') + ' is irrational.', [
        ['State the assumption, writing ' + M('\\sqrt{' + p + '} = \\frac{a}{b}') + ' in lowest terms.', 1, M('a, b') + ' integers with no common factor'],
        ['Show that ' + M('a') + ' must be a multiple of ' + p + '.', 2, M('a^2 = ' + p + 'b^2') + '; since ' + p + ' is prime and divides ' + M('a^2') + ', it divides ' + M('a')],
        ['Complete the proof.', 2, M('a = ' + p + 'k') + ' gives ' + M('b^2 = ' + p + 'k^2') + ', so ' + p + ' divides ' + M('b') + ' too — contradiction'],
        ['Explain why the same proof fails for ' + M('\\sqrt{' + p * p + '}') + '.', 1, M(p * p + ' = ' + p + '^2') + ' is a perfect square: ' + M('\\sqrt{' + p * p + '} = ' + p)]
      ]);
    },
    function () {
      return Q('Prove that there are infinitely many prime numbers.', [
        ['Assume there are finitely many primes ' + M('p_1, p_2, \\ldots, p_n') + '. Define ' + M('N = p_1p_2\\cdots p_n + 1') + '. What is the remainder when ' + M('N') + ' is divided by each ' + M('p_i') + '?', 2, '1'],
        ['Complete the proof.', 2, M('N > 1') + ' has a prime factor, which is not on the list — contradiction'],
        ['Is ' + M('2 \\times 3 \\times 5 \\times 7 \\times 11 \\times 13 + 1') + ' prime? Does this matter for the proof?', 2, 'No: ' + M('30031 = 59 \\times 509') + '; it does not matter, as its prime factors are new primes']
      ]);
    },
    function () {
      var d = pick([2, 3, 4, 6]), a = d * ri(1, 4), b = d * ri(1, 4) + (d === 2 ? 0 : 0);
      if (gcd(a, b) !== d) b = d * (a / d + 1);
      return Q('Prove that there are no integers ' + M('x, y') + ' with ' + M(a + 'x + ' + b + 'y = 1') + '.', [
        ['Assume such integers exist. Factorise the left side.', 1, M(gcd(a, b) + '(' + c1(a / gcd(a, b), 'x') + ' + ' + c1(b / gcd(a, b), 'y') + ')')],
        ['Complete the proof by contradiction.', 2, 'The left side is a multiple of ' + gcd(a, b) + ', but 1 is not'],
        ['For which values of ' + M('c') + ' does ' + M(a + 'x + ' + b + 'y = c') + ' have integer solutions?', 1, 'Multiples of ' + gcd(a, b)]
      ]);
    },
    function () {
      return Q('Prove by contradiction: if ' + M('n^2') + ' is even, then ' + M('n') + ' is even.', [
        ['State the assumption.', 1, M('n^2') + ' is even and ' + M('n') + ' is odd'],
        ['Complete the proof.', 2, M('n = 2k + 1') + ' gives ' + M('n^2 = 2(2k^2 + 2k) + 1') + ', which is odd — contradiction'],
        ['Is the converse (“if ' + M('n') + ' is even then ' + M('n^2') + ' is even”) also true? Prove it directly.', 1, 'Yes: ' + M('(2k)^2 = 2(2k^2)')]
      ]);
    },
    function () {
      var a = pick([2, 3, 5]), b = a === 2 ? pick([3, 5, 7]) : a === 3 ? pick([2, 5]) : pick([2, 3]);
      return Q('Prove that ' + M('\\log_{' + a + '} ' + b) + ' is irrational.', [
        ['Assume ' + M('\\log_{' + a + '} ' + b + ' = \\frac{p}{q}') + ' with positive integers ' + M('p, q') + '. Show that ' + M(a + '^p = ' + b + '^q') + '.', 2, 'Rewrite ' + M(a + '^{p/q} = ' + b) + ' and raise to the power ' + M('q')],
        ['Complete the proof.', 2, 'The left side has only prime factor ' + a + ', the right side only ' + b + ': they cannot be equal'],
        ['Explain why ' + M('\\log_4 8') + ' is rational.', 1, M('4^{3/2} = 8') + ', so ' + M('\\log_4 8 = \\frac{3}{2}')]
      ]);
    },
    function () {
      return Q('Proof by contradiction.', [
        ['Prove that there is no smallest positive rational number.', 2, 'If ' + M('q') + ' were the smallest, ' + M('\\frac{q}{2}') + ' is smaller and still positive and rational'],
        ['Prove that the sum of a rational and an irrational number is irrational.', 2, 'If ' + M('r + x = s') + ' with ' + M('r, s') + ' rational, then ' + M('x = s - r') + ' is rational — contradiction'],
        ['Is the sum of two irrationals always irrational? Prove or disprove.', 1, 'No: ' + M('\\sqrt{2} + (-\\sqrt{2}) = 0')]
      ]);
    },
    function () {
      var k = pick([2, 6, 10, 14, 18]);
      return Q('Prove that ' + M('x^2 - y^2 = ' + k) + ' has no integer solutions.', [
        ['Factorise and consider whether ' + M('x - y') + ' and ' + M('x + y') + ' are both odd or both even.', 2, 'They differ by ' + M('2y') + ', so they have the same parity'],
        ['Complete the proof.', 2, 'Both odd gives an odd product; both even gives a multiple of 4; ' + k + ' is even but not a multiple of 4'],
        ['Find integers with ' + M('x^2 - y^2 = ' + (k + 2)) + '.', 1, (function () { var n = k + 2; return M('x = ' + (n / 4 + 1) + ',\\ y = ' + (n / 4 - 1)); })()]
      ]);
    },
    function () {
      var k = ri(5, 20);
      return Q('Prove: if ' + M('a + b \\ge ' + k) + ', then ' + M('a \\ge ' + num(k / 2)) + ' or ' + M('b \\ge ' + num(k / 2)) + '.', [
        ['State the negation of the conclusion.', 1, M('a < ' + num(k / 2)) + ' and ' + M('b < ' + num(k / 2))],
        ['Complete the proof by contradiction.', 2, 'Adding gives ' + M('a + b < ' + k) + ' — contradiction'],
        ['Use a similar argument to show that among any 13 people, two share a birth month.', 1, 'If all 13 had different months, there would be 13 months']
      ]);
    },
    function () {
      return Q('Prove that ' + M('\\sqrt{2} + \\sqrt{3}') + ' is irrational. You may assume ' + M('\\sqrt{6}') + ' is irrational.', [
        ['Assume ' + M('\\sqrt{2} + \\sqrt{3} = r') + ', rational. Square both sides.', 2, M('5 + 2\\sqrt{6} = r^2')],
        ['Complete the proof.', 2, M('\\sqrt{6} = \\frac{r^2 - 5}{2}') + ' would be rational — contradiction'],
        ['Prove that ' + M('\\sqrt{6}') + ' is irrational.', 2, 'If ' + M('6b^2 = a^2') + ' in lowest terms, then 2 divides ' + M('a') + ', so 4 divides ' + M('a^2') + ', so 2 divides ' + M('3b^2') + ' and hence ' + M('b') + ' — contradiction']
      ]);
    },
    function () {
      var n = ri(3, 8);
      return Q('Prove that there are no positive integers ' + M('x, y') + ' with ' + M('x^2 - y^2 = 1') + '.', [
        ['Factorise and use the fact that both factors are positive integers.', 2, M('(x - y)(x + y) = 1') + ', so both equal 1'],
        ['Complete the proof.', 1, 'Then ' + M('y = 0') + ', which is not positive'],
        ['Find all positive integer solutions of ' + M('x^2 - y^2 = ' + (2 * n + 1)) + '.', 2, M('x = ' + (n + 1) + ',\\ y = ' + n) + (function () { var o = []; var N = 2 * n + 1; for (var d = 3; d * d < N; d += 2) if (N % d === 0) o.push('(' + (d + N / d) / 2 + ', ' + (N / d - d) / 2 + ')'); return o.length ? ' and also ' + o.join(', ') : ''; })()]
      ]);
    }
  ]);

  X('a2-functions', [
    function () {
      var a = ri(1, 6), b = ri(1, 6);
      var x1 = (a + b), x2 = (a - b) / 3;
      return Q('Solve ' + M('|2x - ' + a + '| = |x + ' + b + '|') + '.', [
        ['Solve by considering ' + M('2x - ' + a + ' = \\pm(x + ' + b + ')') + '.', 3, M('x = ' + x1) + ' or ' + M('x = ' + F(a - b, 3))],
        ['Check by squaring both sides instead.', 2, M(poly([3, -(4 * a + 2 * b), a * a - b * b]) + ' = 0')],
        ['Solve ' + M('|2x - ' + a + '| > |x + ' + b + '|') + '.', 2, M('x < ' + F(a - b, 3)) + ' or ' + M('x > ' + x1)]
      ]);
    },
    function () {
      var k = ri(1, 5), a = pick([1, 2, 3]);
      return Q(M('f(x) = e^{' + (a === 1 ? '' : a) + 'x} + ' + k) + ', ' + M('x \\in \\mathbb{R}') + '.', [
        ['State the range of ' + M('f') + '.', 1, M('f(x) > ' + k)],
        ['Find ' + M('f^{-1}(x)') + ' and state its domain.', 3, M('f^{-1}(x) = ' + (a === 1 ? '' : '\\frac{1}{' + a + '}') + '\\ln(x - ' + k + ')') + ', ' + M('x > ' + k)],
        ['Sketch both graphs and state their asymptotes.', 2, M('y = ' + k) + ' and ' + M('x = ' + k) + ': reflections in ' + M('y = x')]
      ]);
    },
    function () {
      var a = pick([2, 3]);
      return Q(M('f(x) = \\ln x') + ' for ' + M('x > 0') + ' and ' + M('g(x) = e^{' + a + 'x} - 1') + ' for ' + M('x \\in \\mathbb{R}') + '.', [
        ['Find ' + M('fg(x)') + ' and state its domain.', 2, M('\\ln(e^{' + a + 'x} - 1)') + ', ' + M('x > 0')],
        ['Find ' + M('gf(x)') + ' in its simplest form.', 2, M('x^{' + a + '} - 1') + ' for ' + M('x > 0')],
        ['Solve ' + M('fg(x) = ' + a + 'x - 1') + '.', 2, M('e^{' + a + 'x}(1 - e^{-1}) = 1') + ', ' + M('x = ' + F(1, a) + '\\ln\\frac{e}{e - 1} = ' + sf3(Math.log(Math.E / (Math.E - 1)) / a))]
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(1, 4);
      return Q('Let ' + M('f(x) = (x - ' + a + ')(x + ' + b + ')') + '.', [
        ['Sketch ' + M('y = |f(x)|') + ', marking where it meets the axes.', 2, 'Meets the ' + M('x') + '-axis at ' + (-b) + ' and ' + a + ', the ' + M('y') + '-axis at ' + a * b],
        ['Sketch ' + M('y = f(|x|)') + ', explaining how it is built.', 2, 'Take the part for ' + M('x \\ge 0') + ' and reflect it in the ' + M('y') + '-axis; roots ' + M('\\pm ' + a)],
        ['How many solutions has ' + M('|f(x)| = ' + num(a * b / 2)) + '?', 2, (function () { var vmax = Math.pow(a + b, 2) / 4; return vmax > a * b / 2 ? 4 : 3; })()]
      ]);
    },
    function () {
      var a = ri(1, 5), b = ri(2, 3);
      return Q('Solve ' + M('|x - ' + a + '| < ' + b + '|x|') + '.', [
        ['Find the critical values by solving ' + M('|x - ' + a + '| = ' + b + '|x|') + '.', 3, M('x = ' + F(a, b + 1)) + ' and ' + M('x = ' + F(-a, b - 1))],
        ['Use a sketch to solve the inequality.', 2, M('x < ' + F(-a, b - 1)) + ' or ' + M('x > ' + F(a, b + 1))]
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(1, 6), c = ri(1, 3);
      if (a * c + b === 0) b++;
      return Q(M('f(x) = \\frac{' + c1(a, 'x') + ' + ' + b + '}{x - ' + c + '}') + ', ' + M('x > ' + c) + '.', [
        ['Write ' + M('f(x)') + ' as ' + M('A + \\frac{B}{x - ' + c + '}') + '.', 2, M('A = ' + a + ',\\ B = ' + (a * c + b))],
        ['Hence state the range of ' + M('f') + '.', 1, M('f(x) > ' + a)],
        ['Find ' + M('f^{-1}(x)') + ' and its domain.', 3, M('f^{-1}(x) = \\frac{' + c1(c, 'x') + ' + ' + b + '}{x - ' + a + '}') + ', ' + M('x > ' + a)]
      ]);
    },
    function () {
      var a = pick([2, 3]), b = ri(1, 4), c = ri(-6, -1), m = pick([1, -1]);
      return Q('The graph of ' + M('y = ' + a + '|x - ' + b + '|' + S(c)) + ' is drawn.', [
        ['State the vertex and where the graph crosses the ' + M('x') + '-axis.', 3, 'Vertex ' + M('(' + b + ', ' + c + ')') + '; ' + M('x = ' + b + ' \\pm ' + F(-c, a))],
        ['Solve ' + M(a + '|x - ' + b + '|' + S(c) + ' = ' + (m === 1 ? '' : '-') + 'x') + '.', 3, (function () { var s = []; [1, -1].forEach(function (sg) { var x = (sg * a * b - c) / (sg * a - m); if (Math.abs(sg * a - m) > 0 && sg * (x - b) >= 0) s.push(sf3(x)); }); return s.length ? s.map(function (v) { return M('x = ' + v); }).join(' or ') : 'No solutions'; })()]
      ]);
    },
    function () {
      var k = ri(2, 6);
      return Q('Consider ' + M('f(x) = \\frac{' + k + '}{x}') + ' and ' + M('g(x) = ' + k + ' - x') + '.', [
        ['Show that each is self-inverse.', 2, M('ff(x) = x') + ' and ' + M('gg(x) = x')],
        ['Explain what this means about their graphs.', 1, 'Each is symmetric in the line ' + M('y = x')],
        ['Find ' + M('fg(x)') + ' and show it is not self-inverse.', 2, M('\\frac{' + k + '}{' + k + ' - x}') + '; ' + M('fg(fg(x)) = \\frac{' + k + ' - x}{' + (k - 1) + ' - x} \\ne x')]
      ]);
    },
    function () {
      return Q('Odd, even and periodic functions.', [
        ['Show that ' + M('f(x) = x\\sin x') + ' is even.', 2, M('(-x)\\sin(-x) = x\\sin x')],
        ['Is ' + M('e^x') + ' odd, even or neither? Write it as the sum of an even and an odd function.', 3, 'Neither; ' + M('\\cosh x + \\sinh x = \\frac{e^x + e^{-x}}{2} + \\frac{e^x - e^{-x}}{2}')],
        ['State the period of ' + M('|\\sin x|') + '.', 1, M('\\pi')]
      ]);
    },
    function () {
      var a = nz(-3, 3), b = ri(-4, 4);
      return Q(M('f(x) = ' + xm(a) + '^2' + S0(b)) + '.', [
        ['Explain why ' + M('f') + ' has no inverse for ' + M('x \\in \\mathbb{R}') + '.', 1, 'It is many-to-one'],
        ['State the largest domain of the form ' + M('x \\ge k') + ' on which ' + M('f') + ' has an inverse, and find the inverse.', 3, M('x \\ge ' + a) + '; ' + M('f^{-1}(x) = ' + a + ' + \\sqrt{x' + S0(-b) + '}')],
        ['Find where ' + M('y = f(x)') + ' meets ' + M('y = f^{-1}(x)') + ' on this domain.', 2, (function () { var B = -(2 * a + 1), Cc = a * a + b, D = B * B - 4 * Cc; if (D < 0) return 'They do not meet'; var r = (-B + Math.sqrt(D)) / 2; return r >= a ? M('x = ' + sf3(r)) + ' (on ' + M('y = x') + ')' : 'They do not meet'; })()]
      ]);
    }
  ]);

  X('a2-sequences', [
    function () {
      var a = ri(2, 20), r = pick([0.5, 0.25, 0.75, -0.5, 0.2, 0.8]);
      return Q('A geometric series has first term ' + a + ' and common ratio ' + r + '.', [
        ['Explain why it has a sum to infinity and find it.', 2, M('|r| < 1') + '; ' + sf3(a / (1 - r))],
        ['Find the smallest ' + M('n') + ' for which ' + M('S_\\infty - S_n < 0.01') + '.', 3, Math.ceil(Math.log(0.01 * (1 - r) / a) / Math.log(Math.abs(r)) - 1e-12)],
        ['A different series has ' + M('S_\\infty = 4a') + '. Find its ratio.', 1, M('r = \\frac{3}{4}')]
      ]);
    },
    function () {
      var a = ri(2, 10), d = ri(2, 6), T = ri(500, 3000);
      var n = 1; while (n / 2 * (2 * a + (n - 1) * d) <= T) n++;
      return Q('An arithmetic series has first term ' + a + ' and common difference ' + d + '.', [
        ['Find the least ' + M('n') + ' for which ' + M('S_n > ' + T) + '.', 3, n],
        ['Find the sum of all terms between 100 and 200.', 3, (function () { var s = 0; for (var k = 0; k < 1000; k++) { var t = a + k * d; if (t > 100 && t < 200) s += t; } return s; })()],
        ['Show that the sum of the first ' + M('n') + ' terms is a quadratic in ' + M('n') + ' with no constant term.', 1, M('S_n = ' + cf(F(d, 2), 'n^2') + (2 * a - d ? (2 * a - d < 0 ? ' - ' : ' + ') + cf(F(Math.abs(2 * a - d), 2), 'n') : ''))]
      ]);
    },
    function () {
      var a = ri(2, 6), b = nz(-5, 5), n = ri(10, 40);
      return Q('Evaluate ' + M('\\sum_{r = 1}^{' + n + '} (' + a + 'r' + S(b) + ')') + '.', [
        ['Explain why this is an arithmetic series and state its first and last terms.', 2, (a + b) + ' and ' + (a * n + b)],
        ['Find the sum.', 2, n * (a * (n + 1) / 2) + b * n],
        ['Find ' + M('\\sum_{r = ' + (n + 1) + '}^{' + 2 * n + '} (' + a + 'r' + S(b) + ')') + ' without listing terms.', 2, (2 * n * (a * (2 * n + 1) / 2) + 2 * b * n) - (n * (a * (n + 1) / 2) + b * n)]
      ]);
    },
    function () {
      var k = ri(2, 6);
      return Q('A sequence is defined by ' + M('u_{n + 1} = \\frac{' + k + '}{u_n}') + ', ' + M('u_1 = 2') + '.', [
        ['Find ' + M('u_2, u_3, u_4') + '.', 1, M(F(k, 2) + ', 2, ' + F(k, 2))],
        ['Describe the sequence and state its period.', 1, 'Periodic with period 2'],
        ['Find ' + M('\\sum_{r = 1}^{100} u_r') + '.', 2, num(50 * (2 + k / 2))]
      ]);
    },
    function () {
      var P = pick([1000, 2000, 500]), r = pick([1.02, 1.03, 1.05]), n = ri(5, 15);
      var tot = P * r * (Math.pow(r, n) - 1) / (r - 1);
      return Q('At the start of each year, £' + P + ' is paid into an account earning ' + Math.round((r - 1) * 100) + '% interest per year, added at the end of each year.', [
        ['Show that after ' + M('n') + ' years the total is ' + M(P + ' \\times ' + r + '\\times\\frac{' + r + '^n - 1}{' + sf3(r - 1) + '}') + '.', 3, 'A geometric series: ' + M(P + '(' + r + ' + ' + r + '^2 + \\cdots + ' + r + '^n)')],
        ['Find the total after ' + n + ' years.', 1, '£' + tot.toFixed(2)],
        ['Find how many full years it takes for the total to exceed £' + 20 * P + '.', 2, (function () { var k = 1; while (P * r * (Math.pow(r, k) - 1) / (r - 1) <= 20 * P) k++; return k; })()]
      ]);
    },
    function () {
      var n = ri(10, 50);
      return Q('Sums of integers.', [
        ['Show that ' + M('\\sum_{r = n + 1}^{2n} r = \\frac{n(3n + 1)}{2}') + '.', 3, M('\\frac{2n(2n + 1)}{2} - \\frac{n(n + 1)}{2}')],
        ['Evaluate it for ' + M('n = ' + n) + '.', 1, n * (3 * n + 1) / 2],
        ['Find ' + M('\\sum_{r = 1}^{n} (2r - 1)') + ' and explain it with a diagram.', 2, M('n^2') + ': odd numbers build up squares as L-shapes']
      ]);
    },
    function () {
      var a = ri(1, 4), d = ri(1, 3);
      return Q('Three numbers ' + M(a + ', x, y') + ' form an arithmetic sequence, and ' + M(a + ', y, x') + ' form a geometric sequence, with ' + M('x \\ne y') + '.', [
        ['Write two equations.', 2, M('2x = ' + a + ' + y') + ' and ' + M('y^2 = ' + c1(a, 'x'))],
        ['Solve them.', 3, M('y = ' + F(-a, 2) + ',\\ x = ' + F(a, 4))],
        ['Write the two sequences.', 1, M(a + ', ' + F(a, 4) + ', ' + F(-a, 2)) + ' and ' + M(a + ', ' + F(-a, 2) + ', ' + F(a, 4))]
      ]);
    },
    function () {
      var a = ri(1, 3), d = ri(2, 4);
      return Q('Pattern ' + M('n') + ' uses ' + M(a + ' + ' + d + 'n') + ' matches.', [
        ['How many matches are needed for patterns 1 to 20 altogether?', 2, 20 * a + d * 210],
        ['How many complete patterns, starting from pattern 1, can be made with 1000 matches?', 3, (function () { var k = 0, t = 0; while (t + a + d * (k + 1) <= 1000) { k++; t += a + d * k; } return k; })()],
        ['Explain why the total is a quadratic in ' + M('n') + '.', 1, 'Summing a linear term gives a quadratic']
      ]);
    },
    function () {
      var r = pick([2, 3]), a = ri(1, 5), n = ri(5, 10);
      return Q('A geometric series has ' + M('S_n = ' + (a === 1 ? '' : a + '(') + r + '^n - 1' + (a === 1 ? '' : ')')) + '.', [
        ['Find the first term and the common ratio.', 2, M('u_1 = ' + a * (r - 1)) + ', ' + M('r = ' + r)],
        ['Find ' + M('u_n') + '.', 2, M('S_n - S_{n - 1} = ' + a * (r - 1) + ' \\times ' + r + '^{n - 1}')],
        ['Explain why the series has no sum to infinity.', 1, M('|r| > 1')]
      ]);
    },
    function () {
      var a = pick([0.5, 2, 3]);
      return Q('Consider ' + M('u_{n + 1} = ' + a + 'u_n(1 - u_n)') + ' with ' + M('u_1 = 0.2') + '.', [
        ['Find ' + M('u_2, u_3, u_4') + '.', 2, (function () { var u = 0.2, o = []; for (var i = 0; i < 3; i++) { u = a * u * (1 - u); o.push(u.toFixed(4)); } return o.join(', '); })()],
        ['Find the non-zero fixed point ' + M('L') + ' where ' + M('L = ' + a + 'L(1 - L)') + '.', 2, M('L = 1 - \\frac{1}{' + a + '}') + ' = ' + sf3(1 - 1 / a)],
        ['Describe the long-term behaviour.', 1, a < 1 ? 'The terms decrease towards 0' : a <= 3 ? 'The terms approach ' + sf3(1 - 1 / a) : 'The terms oscillate']
      ]);
    }
  ]);

  X('a2-binomial', [
    function () {
      var a = pick([2, 3, 4]);
      return Q('Expand ' + M('(1 + ' + a + 'x)^{-1}') + ' up to ' + M('x^3') + '.', [
        ['Give the expansion and state its validity.', 2, M('1 - ' + a + 'x + ' + a * a + 'x^2 - ' + a * a * a + 'x^3') + ', ' + M('|x| < ' + F(1, a))],
        ['Use it with a suitable value of ' + M('x') + ' to estimate ' + M('\\frac{1}{1.0' + a + '}') + '.', 2, M('x = 0.01') + ': ' + (1 - a * 0.01 + a * a * 0.0001 - a * a * a * 0.000001).toFixed(6)],
        ['Explain why you cannot use it to estimate ' + M('\\frac{1}{' + (1 + a) + '}') + '.', 1, M('x = 1') + ' is outside the range of validity']
      ]);
    },
    function () {
      return Q('Estimating square roots.', [
        ['Expand ' + M('(1 + x)^{\\frac{1}{2}}') + ' up to ' + M('x^2') + '.', 2, M('1 + \\frac{1}{2}x - \\frac{1}{8}x^2')],
        ['By writing ' + M('\\sqrt{4.08} = 2\\sqrt{1.02}') + ', estimate ' + M('\\sqrt{4.08}') + '.', 2, (2 * (1 + 0.01 - 0.00005)).toFixed(5)],
        ['Show that ' + M('\\sqrt{3} = 2\\left(1 - \\frac{1}{4}\\right)^{\\frac{1}{2}}') + ' and use your expansion to estimate ' + M('\\sqrt{3}') + '. Why is it less accurate?', 3, (2 * (1 - 0.125 - 0.0078125)).toFixed(4) + '; ' + M('x = -\\frac{1}{4}') + ' is not small']
      ]);
    },
    function () {
      var a = pick([2, 3]);
      return Q('Expand ' + M('(1 - ' + a + 'x)^{-\\frac{1}{2}}') + '.', [
        ['Find the first three terms.', 3, M('1 + ' + cf(F(a, 2), 'x') + ' + ' + F(3 * a * a, 8) + 'x^2')],
        ['State the range of validity.', 1, M('|x| < ' + F(1, a))],
        ['Use ' + M('x = ' + F(1, 2 * a * 10)) + ' to estimate ' + M('\\sqrt{' + F(20, 19) + '}') + '.', 2, (1 + a / 2 / (20 * a) + 3 * a * a / 8 / (400 * a * a)).toFixed(5)]
      ]);
    },
    function () {
      var A = ri(1, 3), B = ri(1, 3);
      return Q('Let ' + M('f(x) = \\frac{' + poly([B - 2 * A, A + B]) + '}{(1 + x)(1 - 2x)}') + ' = ' + M('\\frac{' + A + '}{1 + x} + \\frac{' + B + '}{1 - 2x}') + '.', [
        ['Verify the partial fractions.', 1, 'Combine over the common denominator'],
        ['Expand ' + M('f(x)') + ' up to ' + M('x^2') + '.', 3, M((A + B) + tm(2 * B - A, 'x') + tm(A + 4 * B, 'x^2'))],
        ['State the range of validity of the combined expansion.', 1, M('|x| < \\frac{1}{2}') + ' (the stricter condition)']
      ]);
    },
    function () {
      return Q('Find the coefficient of ' + M('x^2') + ' in ' + M('\\frac{\\sqrt{1 + x}}{1 - x}') + '.', [
        ['Write as ' + M('(1 + x)^{\\frac{1}{2}}(1 - x)^{-1}') + ' and expand each to ' + M('x^2') + '.', 2, M('1 + \\frac{1}{2}x - \\frac{1}{8}x^2') + ' and ' + M('1 + x + x^2')],
        ['Find the coefficient of ' + M('x^2') + '.', 2, M('1 + \\frac{1}{2} - \\frac{1}{8} = \\frac{11}{8}')],
        ['State the range of validity.', 1, M('|x| < 1')]
      ]);
    },
    function () {
      var n = pick([-2, -1, 0.5, -0.5, -3]), a = pick([2, 3, -2]);
      var c1v = n * a, c2v = n * (n - 1) / 2 * a * a;
      return Q('In the expansion of ' + M('(1 + ax)^n') + ', the first terms are ' + M('1' + tm(c1v, 'x') + tm(c2v, 'x^2')) + '.', [
        ['Form two equations in ' + M('a') + ' and ' + M('n') + '.', 2, M('na = ' + sf3(c1v)) + ', ' + M('\\frac{n(n - 1)}{2}a^2 = ' + sf3(c2v))],
        ['Solve them.', 3, M('n = ' + n + ',\\ a = ' + a)],
        ['State the range of validity.', 1, M('|x| < ' + F(1, Math.abs(a)))]
      ]);
    },
    function () {
      var r = ri(3, 10);
      return Q('Consider ' + M('(1 - x)^{-2}') + '.', [
        ['Expand up to ' + M('x^3') + '.', 2, M('1 + 2x + 3x^2 + 4x^3')],
        ['Write down the coefficient of ' + M('x^{' + r + '}') + ' and justify the pattern.', 2, (r + 1) + '; ' + M('\\frac{(-2)(-3)\\cdots(-r - 1)}{r!}(-1)^r = r + 1')],
        ['Hence find ' + M('\\sum_{r = 0}^{\\infty} \\frac{r + 1}{2^r}') + '.', 2, M('(1 - \\tfrac{1}{2})^{-2} = 4')]
      ]);
    },
    function () {
      var a = pick([2, 3]), b = pick([4, 5]);
      return Q('The expansions of ' + M('(1 + ' + a + 'x)^{-1}') + ' and ' + M('(1 - ' + b + 'x)^{\\frac{1}{2}}') + ' are multiplied.', [
        ['State the validity of each expansion.', 2, M('|x| < ' + F(1, a)) + ' and ' + M('|x| < ' + F(1, b))],
        ['State the validity of the product, and explain.', 1, M('|x| < ' + F(1, b)) + ': both must be valid'],
        ['Find the coefficient of ' + M('x') + ' in the product.', 2, M(F(-2 * a - b, 2))]
      ]);
    },
    function () {
      return Q('Estimate ' + M('\\sqrt[3]{8.24}') + '.', [
        ['Show that ' + M('\\sqrt[3]{8 + x} = 2\\left(1 + \\frac{x}{8}\\right)^{\\frac{1}{3}}') + '.', 1, M('8^{1/3} = 2')],
        ['Expand up to ' + M('x^2') + ' and state the validity.', 3, M('2\\left(1 + \\frac{x}{24} - \\frac{x^2}{576}\\right)') + ', ' + M('|x| < 8')],
        ['Estimate ' + M('\\sqrt[3]{8.24}') + '.', 1, (2 * (1 + 0.24 / 24 - 0.0576 / 576)).toFixed(5)]
      ]);
    },
    function () {
      var a = pick([2, 4, 9]);
      return Q('Expand ' + M('(' + a + ' + x)^{-\\frac{1}{2}}') + '.', [
        ['Take out a factor to write it in the form ' + M('k(1 + cx)^{-\\frac{1}{2}}') + '.', 2, M('\\frac{1}{\\sqrt{' + a + '}}\\left(1 + \\frac{x}{' + a + '}\\right)^{-\\frac{1}{2}}')],
        ['Find the first three terms.', 3, M('\\frac{1}{\\sqrt{' + a + '}}\\left(1 - \\frac{x}{' + 2 * a + '} + \\frac{3x^2}{' + 8 * a * a + '}\\right)')],
        ['State the validity.', 1, M('|x| < ' + a)]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
