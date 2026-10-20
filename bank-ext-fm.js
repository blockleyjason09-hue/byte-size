/* Byte Size Classroom — extension questions for AQA Level 2 Further Maths (top level). */
(function (g) {
  var BS = g.BS, D = BS.draw, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, dp = BS.dp, num = BS.num, M = BS.m;
  function sf3(x) { return String(Number(x.toPrecision(3))); }
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: p[2] }; }) }; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function tc(c, v) { return c === 0 ? '' : (c < 0 ? ' - ' : ' + ') + (Math.abs(c) === 1 && v ? '' : Math.abs(c)) + v; }
  function pt(x, y) { return '(' + x + ',\\ ' + y + ')'; }
  function F(n, d) { return frac(n, d); }
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } var k = gcd(Math.abs(n), d) || 1; return [n / k, d / k]; }
  function fs(a) { return frac(a[0], a[1]); }
  function comb(n, k) { var r = 1; for (var i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); }
  function surd(n) { return BS.gcse2.surd(n); }

  X('fm-counting', [
    function () {
      var len = pick([3, 4]), digits = pick([[1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]), cond = pick(['even', 'odd', 'gt', 'mult5']), G = Math.pow(10, len - 1) * ri(3, 6), cnt = 0;
      (function rec(pre) {
        if (pre.length === len) { if (pre[0] === 0) return; var n = Number(pre.join('')); if ((cond === 'even' && n % 2 === 0) || (cond === 'odd' && n % 2 === 1) || (cond === 'gt' && n > G) || (cond === 'mult5' && n % 5 === 0)) cnt++; return; }
        digits.forEach(function (d) { if (pre.indexOf(d) < 0) rec(pre.concat([d])); });
      })([]);
      var cs = { even: 'even', odd: 'odd', gt: 'greater than ' + num(G), mult5: 'multiples of 5' }[cond];
      return Q('', [['Numbers with ' + len + ' digits are made using the digits ' + M(digits.join(',\\ ')) + '. No digit may be used more than once, and the first digit cannot be 0. How many of these numbers are ' + cs + '?', 4, String(cnt) + ' (consider the restricted positions first, treating 0 separately)']]);
    },
    function () {
      var L = pick([2, 3]), Dg = pick([2, 3, 4]), total = Math.pow(26, L) * Math.pow(10, Dg), noRep = 1; for (var i = 0; i < L; i++) noRep *= (26 - i); for (var j = 0; j < Dg; j++) noRep *= (10 - j);
      var atLeast = total - noRep;
      return Q('A password consists of ' + L + ' letters (A–Z) followed by ' + Dg + ' digits (0–9).', [
        ['How many different passwords are possible?', 1, num(total)],
        ['How many passwords have no repeated letter and no repeated digit?', 2, num(noRep)],
        ['What fraction of all passwords contain at least one repeated letter or repeated digit? Give your answer to 3 significant figures.', 2, M('\\frac{' + num(atLeast) + '}{' + num(total) + '} = ' + sf3(atLeast / total))]
      ]);
    }
  ]);

  X('fm-surds', [
    function () {
      var p = pick([2, 3, 5, 7]), q = nz(-6, 6), r = nz(-5, 5); while (r === q) r = nz(-5, 5);
      // sqrt(p) x + q = x + r sqrt(p)  => x = (r p - q)/(p - 1) + (r - q)/(p - 1) sqrt(p)
      var a = fr(r * p - q, p - 1), b = fr(r - q, p - 1);
      return Q('', [['Solve ' + M('x\\sqrt{' + p + '}' + sg(q) + ' = x' + (r < 0 ? ' - ' : ' + ') + (Math.abs(r) === 1 ? '' : Math.abs(r)) + '\\sqrt{' + p + '}') + ', giving your answer in the form ' + M('a + b\\sqrt{' + p + '}') + ' where ' + M('a') + ' and ' + M('b') + ' are rational.', 5, M('x(\\sqrt{' + p + '} - 1) = ' + c1(r, '\\sqrt{' + p + '}') + sg(-q)) + ', rationalise: ' + M('x = ' + fs(a) + (b[0] === 0 ? '' : (b[0] < 0 ? ' - ' + fs([-b[0], b[1]]) : ' + ' + fs(b)) + '\\sqrt{' + p + '}'))]]);
    },
    function () {
      var c = pick([2, 3, 5, 6, 7]), m = ri(1, 5), n = ri(1, 3), p = ri(1, 6), q = ri(1, 3);
      // area = (m + n sqrt c)(p + q sqrt c) = (mp + nqc) + (mq + np) sqrt c ; width m + n sqrt c
      var A = m * p + n * q * c, B = m * q + n * p;
      return Q('A rectangle has area ' + M('(' + A + ' + ' + B + '\\sqrt{' + c + '})') + ' cm² and width ' + M('(' + m + ' + ' + (n === 1 ? '' : n) + '\\sqrt{' + c + '})') + ' cm.', [
        ['Find the length of the rectangle in the form ' + M('(a + b\\sqrt{' + c + '})') + ' cm.', 4, M('\\frac{' + A + ' + ' + B + '\\sqrt{' + c + '}}{' + m + ' + ' + (n === 1 ? '' : n) + '\\sqrt{' + c + '}} = ' + p + ' + ' + (q === 1 ? '' : q) + '\\sqrt{' + c + '}')],
        ['Find the exact length of a diagonal of the rectangle, in the form ' + M('\\sqrt{u + v\\sqrt{' + c + '}}') + '.', 3, M('\\sqrt{' + (m * m + n * n * c + p * p + q * q * c) + ' + ' + (2 * m * n + 2 * p * q) + '\\sqrt{' + c + '}}')]
      ]);
    }
  ]);

  X('fm-functions', [
    function () {
      var a = nz(-5, 5), b = nz(-9, 9), c = ri(1, 6); while (-a * a - b * c === 0 || b === 0) b++;
      return Q(M('\\mathrm{f}(x) = \\frac{' + poly([a, b]) + '}{' + poly([c, -a]) + '}') + ', ' + M('x \\ne ' + F(a, c)) + '.', [
        ['Find ' + M('\\mathrm{f}^{-1}(x)') + '.', 4, M('y(' + poly([c, -a]) + ') = ' + poly([a, b]) + ' \\Rightarrow x(' + c1(c, 'y') + sg(-a) + ') = ' + c1(a, 'y') + sg(b)) + ', so ' + M('\\mathrm{f}^{-1}(x) = \\frac{' + poly([a, b]) + '}{' + poly([c, -a]) + '}')],
        ['What do you notice? Hence find ' + M('\\mathrm{ff}(x)') + '.', 2, M('\\mathrm{f}^{-1} = \\mathrm{f}') + ' (f is self-inverse), so ' + M('\\mathrm{ff}(x) = x')]
      ]);
    },
    function () {
      var k = ri(2, 6), m = pick([1, 2, 4].filter(function (v) { return (k * k) % v === 0; }));
      // f(x) = x^2 for 0<=x<k ; = k^2 - m(x - k) ... ; ... domain 0..k + k^2/m
      var end = k + k * k / m, t = ri(1, k * k - 1), x1 = Math.sqrt(t), x2 = k + (k * k - t) / m;
      var p = D.plane({ xmin: -0.5, xmax: end + 1, ymin: -1, ymax: k * k + 2, w: 320, h: 240, ticks: true, tstep: end > 12 ? 4 : 2, tstepy: k * k > 12 ? 5 : 2 });
      var s = p.svg + p.curve(function (x) { return x * x; }, 0, k) + p.curve(function (x) { return k * k - m * (x - k); }, k, end);
      return Q('The function ' + M('\\mathrm{f}') + ' is defined by ' + M('\\mathrm{f}(x) = \\begin{cases} x^2 & 0 \\le x < ' + k + ' \\\\ ' + (k * k) + ' - ' + c1(m, '(x - ' + k + ')') + ' & ' + k + ' \\le x \\le ' + num(end) + '\\end{cases}') + D.svg(320, 240, s, 'Piecewise function'), [
        ['Solve ' + M('\\mathrm{f}(x) = ' + t) + '.', 4, M('x = ' + (Number.isInteger(x1) ? x1 : '\\sqrt{' + t + '}') + '\\text{ or } x = ' + num(Math.round(x2 * 1000) / 1000))],
        ['Find the range of ' + M('\\mathrm{f}') + '.', 1, M('0 \\le \\mathrm{f}(x) \\le ' + (k * k))],
        ['Find the area enclosed between the graph and the ' + M('x') + '-axis for ' + M(k + ' \\le x \\le ' + num(end)) + '.', 2, M('\\tfrac{1}{2} \\times ' + num(k * k / m) + ' \\times ' + (k * k) + ' = ' + num(k * k * k * k / (2 * m)))]
      ]);
    }
  ]);

  X('fm-algebra', [
    function () {
      var a = ri(1, 5), b = ri(1, 5), r1 = nz(-6, 6), k = ri(2, 4);
      // k/(x - a) - 1/(x + b) = c   pick x root r1 to make c rational; then solve quadratic
      while (r1 === a || r1 === -b) r1 = nz(-6, 6);
      var cN = k * (r1 + b) - (r1 - a), cD = (r1 - a) * (r1 + b), C = fr(cN, cD);
      // c (x - a)(x + b) = k(x + b) - (x - a)  => C x^2 + (C(b - a) - k + 1) x + (-C a b - k b - a) = 0  (times C[1])
      var A2 = C[0], B2 = C[0] * (b - a) - (k - 1) * C[1], C2 = -C[0] * a * b - (k * b + a) * C[1];
      var other = A2 !== 0 ? fr(-B2 - A2 * r1, A2) : null; // sum of roots
      return Q('', [['Solve ' + M('\\frac{' + k + '}{x - ' + a + '} - \\frac{1}{x + ' + b + '} = ' + fs(C)) + '.', 5, 'Multiply through: ' + M(poly([A2, B2, C2]) + ' = 0') + ', so ' + M('x = ' + r1 + (other ? '\\text{ or } x = ' + fs(other) : ''))]]);
    },
    function () {
      var a = ri(1, 4), b = ri(1, 5), c = ri(2, 5);
      return Q('', [
        ['Simplify fully ' + M('\\frac{\\frac{' + c + '}{x} - \\frac{' + c + '}{x + ' + a + '}}{\\frac{1}{x^2} - \\frac{1}{(x + ' + a + ')^2}}') + '.', 5, M('\\frac{\\frac{' + (c * a) + '}{x(x + ' + a + ')}}{\\frac{' + a + '(2x + ' + a + ')}{x^2(x + ' + a + ')^2}} = \\frac{' + c + 'x(x + ' + a + ')}{2x + ' + a + '}')],
        ['Prove that ' + M('\\frac{1}{x} - \\frac{1}{x + ' + b + '} > 0') + ' for all ' + M('x > 0') + '.', 2, M('\\frac{' + b + '}{x(x + ' + b + ')}') + ', and the numerator and denominator are both positive.']
      ]);
    }
  ]);

  X('fm-binomial', [
    function () {
      var n = pick([5, 6, 7, 8]), r = 2, kv = ri(2, 5) * pick([1, -1]);
      // coefficient of x^2 in (1 + kx)^n is C(n,2) k^2 ; of x^3 is C(n,3) k^3 ; ratio ... give coefficient of x^2 value -> k^2 -> two values of k
      var c2 = comb(n, 2) * kv * kv, c3 = comb(n, 3) * kv * kv * kv;
      return Q('In the expansion of ' + M('(1 + kx)^{' + n + '}') + ', the coefficient of ' + M('x^2') + ' is ' + num(c2) + '.', [
        ['Find the possible values of ' + M('k') + '.', 3, M(comb(n, 2) + 'k^2 = ' + num(c2)) + ', so ' + M('k = \\pm ' + Math.abs(kv))],
        ['Given also that the coefficient of ' + M('x^3') + ' is negative, find the coefficient of ' + M('x^3') + '.', 2, M('k = -' + Math.abs(kv)) + ', so ' + M(comb(n, 3) + 'k^3 = ' + num(-Math.abs(c3)))]
      ]);
    },
    function () {
      var n = 6, a = ri(1, 3);
      // (x + a/x)^6 constant term: C(6,3) a^3 ; (x^2 + a/x)^6: x^{12-3r}: r=4 -> C(6,4) a^4
      var t1 = comb(6, 3) * Math.pow(a, 3), t2 = comb(6, 4) * Math.pow(a, 4), h = pick([0.01, 0.02, 0.03]), est = 1 + 6 * h + 15 * h * h + 20 * h * h * h;
      return Q('', [
        ['Find the term independent of ' + M('x') + ' in the expansion of ' + M('\\left(x + \\frac{' + a + '}{x}\\right)^{6}') + '.', 3, M('\\binom{6}{3}x^3\\left(\\frac{' + a + '}{x}\\right)^3 = ' + t1)],
        ['Find the term independent of ' + M('x') + ' in the expansion of ' + M('\\left(x^2 + \\frac{' + a + '}{x}\\right)^{6}') + '.', 3, 'General term ' + M('\\binom{6}{r}x^{12 - 3r}' + a + '^r') + '; ' + M('r = 4') + ': ' + M(t2)],
        ['Use the first four terms of the expansion of ' + M('(1 + x)^6') + ' to estimate ' + M(num(1 + h) + '^6') + ', to 6 decimal places.', 2, M('1 + 6(' + h + ') + 15(' + h + ')^2 + 20(' + h + ')^3 = ' + est.toFixed(6))]
      ]);
    }
  ]);

  X('fm-factor', [
    function () {
      var p = nz(-3, 3), q = nz(-4, 4), r = nz(-5, 5); while (q === p) q = nz(-4, 4); while (r === p || r === q) r = nz(-5, 5);
      var A = -(p + q + r), B = p * q + q * r + p * r, C = -p * q * r;
      return Q(M('\\mathrm{f}(x) = x^3 + ax^2 + bx' + sg(C)) + '. ' + M('(x' + sg(-p) + ')') + ' and ' + M('(x' + sg(-q) + ')') + ' are factors of ' + M('\\mathrm{f}(x)') + '.', [
        ['Find the values of ' + M('a') + ' and ' + M('b') + '.', 4, M('\\mathrm{f}(' + p + ') = 0') + ' and ' + M('\\mathrm{f}(' + q + ') = 0') + ' give ' + M('a = ' + A + ',\\ b = ' + B)],
        ['Solve ' + M('\\mathrm{f}(x) = 0') + '.', 2, M('x = ' + [p, q, r].sort(function (u, v) { return u - v; }).join(',\\ '))]
      ]);
    },
    function () {
      var p = nz(-3, 3), b = nz(-4, 4), c = pick([-1, -2, -3, 1, 2]); // (x - p)(x^2 + b x + c), with disc not square
      while (b * b - 4 * c < 0 || Math.sqrt(b * b - 4 * c) === Math.round(Math.sqrt(b * b - 4 * c))) { b = nz(-4, 4); c = pick([-1, -2, -3, 1, 2]); }
      var co = [1, b - p, c - p * b, -p * c], disc = b * b - 4 * c;
      return Q('', [
        ['Show that ' + M('x = ' + p) + ' is a solution of ' + M(poly(co) + ' = 0') + '.', 1, 'Substituting gives 0.'],
        ['Hence solve the equation fully, giving the other solutions in surd form.', 4, M(poly(co) + ' = (x' + sg(-p) + ')(' + poly([1, b, c]) + ')') + ', so ' + M('x = ' + p + ',\\ x = \\frac{' + (-b) + ' \\pm \\sqrt{' + disc + '}}{2}')]
      ]);
    }
  ]);

  X('fm-quadratics', [
    function () {
      var p = nz(-5, 5), q = ri(1, 9);
      // x^2 - 2 p x + p^2 + q : min (p, q)
      return Q('', [
        ['Write ' + M(poly([1, -2 * p, p * p + q])) + ' in the form ' + M('(x + a)^2 + b') + '.', 2, M('(x' + sg(-p) + ')^2 + ' + q)],
        ['Hence prove that ' + M(poly([1, -2 * p, p * p + q])) + ' is always positive, and state its least value.', 2, 'A square is never negative, so the expression is at least ' + q + ' > 0; least value ' + q + ' at ' + M('x = ' + p)],
        ['Find the greatest value of ' + M('\\frac{' + (2 * q) + '}{' + poly([1, -2 * p, p * p + q]) + '}') + '.', 2, M('\\frac{' + (2 * q) + '}{' + q + '} = 2') + ' (denominator is least when ' + M('x = ' + p) + ')']
      ]);
    },
    function () {
      var h = nz(-4, 4), m = pick([1, 2, -1]), c = nz(-4, 4), k = m * h + c; // min point (h, k) lies on y = m x + c
      var b = -2 * h, cc = h * h + k;
      return Q('The curve ' + M('y = x^2 + bx + c') + ' has its minimum point on the line ' + M('y = ' + poly([m, c])) + '. The ' + M('x') + '-coordinate of the minimum point is ' + h + '.', [
        ['Find the values of ' + M('b') + ' and ' + M('c') + '.', 4, 'Minimum at ' + M(pt(h, k)) + ', so ' + M('y = (x' + sg(-h) + ')^2' + (k ? sg(k) : '')) + ': ' + M('b = ' + b + ',\\ c = ' + cc)],
        ['Find the coordinates of the points where the curve crosses the line.', 3, (function () { var A = 1, B = b - m, C = cc - c, d = B * B - 4 * C; if (d < 0) return 'They do not cross'; var s = Math.sqrt(d); return Number.isInteger(s) ? M(pt((-B - s) / 2, m * (-B - s) / 2 + c) + ',\\ ' + pt((-B + s) / 2, m * (-B + s) / 2 + c)) : M('x = \\frac{' + (-B) + ' \\pm \\sqrt{' + d + '}}{2}'); })()]
      ]);
    }
  ]);

  X('fm-graphs', [
    function () {
      var a = ri(2, 9), b = pick([2, 3, 0.5]), x1 = ri(1, 3), x2 = x1 + ri(1, 3), y1 = a * Math.pow(b, x1), y2 = a * Math.pow(b, x2);
      return Q('The graph of ' + M('y = ab^x') + ' passes through ' + M(pt(x1, num(y1))) + ' and ' + M(pt(x2, num(y2))) + '.', [
        ['Find the values of ' + M('a') + ' and ' + M('b') + '.', 4, M('b^{' + (x2 - x1) + '} = \\frac{' + num(y2) + '}{' + num(y1) + '}') + ', so ' + M('b = ' + num(b) + ',\\ a = ' + a)],
        ['Find the value of ' + M('x') + ' for which ' + M('y = ' + num(a * Math.pow(b, b > 1 ? x1 - 1 : -1))) + '.', 1, M('x = ' + (b > 1 ? x1 - 1 : -1))],
        ['Describe what happens to ' + M('y') + ' as ' + M('x') + ' becomes very ' + (b > 1 ? 'negative' : 'large') + '.', 1, M('y') + ' approaches 0 (the ' + M('x') + '-axis is an asymptote) but never reaches it']
      ]);
    },
    function () {
      var k = ri(2, 5);
      var f = function (x) { return x < 0 ? -x : x <= k ? x * x / k : 2 * k - x; };
      var lo = -k, hi = 2 * k, p = D.plane({ xmin: lo - 1, xmax: hi + 1, ymin: -1, ymax: k + 2, w: 320, h: 220, ticks: true, tstep: 1, tstepy: 1 });
      var s = p.svg + p.curve(f, lo, hi);
      var area = k * k / 2 + k * k / 3 + k * k / 2;
      return Q(M('y = \\mathrm{f}(x)') + ' is defined by ' + M('\\mathrm{f}(x) = \\begin{cases} -x & -' + k + ' \\le x < 0 \\\\ \\frac{x^2}{' + k + '} & 0 \\le x \\le ' + k + ' \\\\ ' + (2 * k) + ' - x & ' + k + ' < x \\le ' + (2 * k) + '\\end{cases}') + D.svg(320, 220, s, 'Piecewise graph'), [
        ['Solve ' + M('\\mathrm{f}(x) = 1') + '.', 3, M('x = -1,\\ x = ' + (Number.isInteger(Math.sqrt(k)) ? Math.sqrt(k) : '\\sqrt{' + k + '}') + ',\\ x = ' + (2 * k - 1))],
        ['Find the total area between the graph and the ' + M('x') + '-axis.', 3, M('\\tfrac{1}{2}(' + k + ')(' + k + ') + \\int_0^{' + k + '} \\frac{x^2}{' + k + '}\\,\\mathrm{d}x + \\tfrac{1}{2}(' + k + ')(' + k + ') = ' + F(Math.round(area * 6), 6))]
      ]);
    }
  ]);

  X('fm-equations', [
    function () {
      var x = nz(-5, 5), y = nz(-5, 5), z = nz(-5, 5), r = function () { return nz(-3, 3); };
      var e = [[1, r(), r()], [r(), 1, r()], [r(), r(), 2]];
      var det = e[0][0] * (e[1][1] * e[2][2] - e[1][2] * e[2][1]) - e[0][1] * (e[1][0] * e[2][2] - e[1][2] * e[2][0]) + e[0][2] * (e[1][0] * e[2][1] - e[1][1] * e[2][0]);
      if (det === 0) e[2][2] = 3;
      function row(c) { return M(c1(c[0], 'x') + tc(c[1], 'y') + tc(c[2], 'z') + ' = ' + (c[0] * x + c[1] * y + c[2] * z)); }
      return Q('', [['Solve the simultaneous equations ' + row(e[0]) + ', ' + row(e[1]) + ' and ' + row(e[2]) + '.', 5, M('x = ' + x + ',\\ y = ' + y + ',\\ z = ' + z)]]);
    },
    function () {
      var a = nz(-5, 5), b = nz(-5, 5); while (a === b) b = nz(-5, 5);
      var s = a + b, pr = a * b;
      return Q('', [
        ['Solve the simultaneous equations ' + M('x + y = ' + s) + ' and ' + M('xy = ' + pr) + '.', 4, M('x(' + s + ' - x) = ' + pr) + ': ' + M('x = ' + a + ',\\ y = ' + b) + ' or ' + M('x = ' + b + ',\\ y = ' + a)],
        ['Hence find the value of ' + M('x^2 + y^2') + ' without using your values of ' + M('x') + ' and ' + M('y') + '.', 2, M('(x + y)^2 - 2xy = ' + (s * s) + ' - ' + (2 * pr < 0 ? '(' + 2 * pr + ')' : 2 * pr) + ' = ' + (s * s - 2 * pr))]
      ]);
    }
  ]);

  X('fm-inequalities', [
    function () {
      var a = nz(-6, 2), b = a + ri(3, 8), c = ri(1, 4), d = nz(-6, 6), lim = fr(d, c);
      // (x - a)(x - b) < 0  and  c x > d
      var ints = []; for (var x = -20; x <= 20; x++) if ((x - a) * (x - b) < 0 && c * x > d) ints.push(x);
      return Q('', [
        ['Solve ' + M(poly([1, -(a + b), a * b]) + ' < 0') + '.', 2, M(a + ' < x < ' + b)],
        ['Find the integers that satisfy both ' + M(poly([1, -(a + b), a * b]) + ' < 0') + ' and ' + M(c1(c, 'x') + ' > ' + d) + '.', 3, ints.length ? M(ints.join(',\\ ')) : 'There are none']
      ]);
    },
    function () {
      var p = ri(1, 5), q = ri(2, 8), r = p + q; // x^2 - (r) ... solve x(x - r) >= p q -? keep: (x - p)(x + q) >= k ; choose k so factorises
      var m = ri(1, 4), n = ri(1, 5), k = 0; // (x - p)(x + q) - k = (x - m')(x + n')
      var r1 = -q - ri(1, 3), r2 = p + ri(1, 3); // new roots
      var A = 1, B = -(r1 + r2), C = r1 * r2, K = p * -q - C, Bq = q - p; // (x-p)(x+q) = x^2 + (q-p)x - pq ; want x^2 + (q-p)x - pq - K = (x - r1)(x - r2) -> need B = q - p
      // simpler: choose roots symmetric about -(q-p)/2
      var mid2 = p - q, d = ri(1, 4) * 2 + (mid2 % 2 === 0 ? 0 : 1); r1 = (mid2 - d) / 2; r2 = (mid2 + d) / 2;
      if (!Number.isInteger(r1)) { d += 1; r1 = (mid2 - d) / 2; r2 = (mid2 + d) / 2; }
      K = r1 * r2 - (-p * q); // (x-p)(x+q) >= K  <=> x^2 + (q-p)x - pq - K >= 0 = (x - r1)(x - r2)
      return Q('', [['Solve ' + M('(x - ' + p + ')(x + ' + q + ') \\ge ' + (-K)) + '. Give your answer using inequalities.', 4, 'Rearrange: ' + M(poly([1, q - p, -p * q + K]) + ' \\ge 0') + ', ' + M(br(1, -r1) + br(1, -r2) + ' \\ge 0') + ', so ' + M('x \\le ' + r1 + '\\text{ or } x \\ge ' + r2)]]);
    }
  ]);

  X('fm-indices', [
    function () {
      var a = ri(0, 3), b = a + ri(1, 3), A = Math.pow(2, a), B = Math.pow(2, b), base = pick([2, 3]);
      if (base === 3) { A = Math.pow(3, a); B = Math.pow(3, b); }
      var sq = base * base;
      return Q('', [['Solve ' + M(sq + '^x - ' + (A + B) + ' \\times ' + base + '^x + ' + (A * B) + ' = 0') + '.', 5, 'Let ' + M('y = ' + base + '^x') + ': ' + M('y^2 - ' + (A + B) + 'y + ' + (A * B) + ' = 0') + ', ' + M('y = ' + A + '\\text{ or } ' + B) + ', so ' + M('x = ' + a + '\\text{ or } x = ' + b)]]);
    },
    function () {
      var c = pick([8, 27, 64]), k = Math.round(Math.cbrt(c)), p = ri(1, 3) * 3, q = ri(1, 3) * 3, num_ = pick([['-\\frac{2}{3}', -2 / 3], ['\\frac{2}{3}', 2 / 3], ['-\\frac{1}{3}', -1 / 3]]);
      var e = num_[1], coef = Math.pow(k, 3 * e), ex = p * e, ey = -q * e;
      function cf(v) { var r = fr(Math.round(v * 1000000), 1000000); return fs(r); }
      return Q('', [['Simplify ' + M('\\left(' + c + 'x^{' + p + '}y^{-' + q + '}\\right)^{' + num_[0] + '}') + ', giving your answer without negative indices.', 4, (function () { var co = coef >= 1 ? String(Math.round(coef)) : '\\frac{1}{' + Math.round(1 / coef) + '}'; var top = [], bot = []; if (ex > 0) top.push('x^{' + ex + '}'); else bot.push('x^{' + (-ex) + '}'); if (ey > 0) top.push('y^{' + ey + '}'); else bot.push('y^{' + (-ey) + '}'); var T = (coef >= 1 ? Math.round(coef) : '') + top.join(''), B = (coef < 1 ? Math.round(1 / coef) : '') + bot.join(''); return M(B ? '\\frac{' + (T || '1') + '}{' + B + '}' : T); })()]]);
    }
  ]);

  X('fm-proof', [
    function () {
      var P = pick([
        ['Prove that ' + M('n^3 - n') + ' is a multiple of 6 for all positive integers ' + M('n') + '.', M('n^3 - n = (n - 1)n(n + 1)') + ', the product of three consecutive integers, which contains a multiple of 2 and a multiple of 3.'],
        ['Prove that the sum of five consecutive integers is a multiple of 5.', M('(n - 2) + (n - 1) + n + (n + 1) + (n + 2) = 5n') + '.'],
        ['Prove that ' + M('(2n + 1)^2 - (2n + 1)') + ' is always even.', M('(2n + 1)(2n + 1 - 1) = 2n(2n + 1)') + ', which has a factor of 2.'],
        ['Prove that the difference between the squares of two consecutive integers is equal to their sum.', M('(n + 1)^2 - n^2 = 2n + 1 = n + (n + 1)') + '.'],
        ['Prove that ' + M('x^2 - 8x + 20 > 0') + ' for all values of ' + M('x') + '.', M('(x - 4)^2 + 4 \\ge 4 > 0') + '.'],
        ['Prove that the product of any two odd numbers is odd.', M('(2m + 1)(2n + 1) = 4mn + 2m + 2n + 1 = 2(2mn + m + n) + 1') + '.']]);
      var Q2 = pick([
        ['Prove that ' + M('\\frac{n(n + 1)}{2} + \\frac{(n + 1)(n + 2)}{2}') + ' is a square number.', M('\\frac{(n + 1)(n + n + 2)}{2} = (n + 1)^2') + '.'],
        ['Prove that ' + M('(3n + 1)^2 - (3n - 1)^2') + ' is a multiple of 12.', M('= 12n') + '.'],
        ['Show that ' + M('\\frac{2}{x - 1} - \\frac{2}{x + 1} \\equiv \\frac{4}{x^2 - 1}') + '.', M('\\frac{2(x + 1) - 2(x - 1)}{x^2 - 1} = \\frac{4}{x^2 - 1}') + '.']]);
      return Q('', [[P[0], 3, P[1]], [Q2[0], 3, Q2[1]]]);
    }
  ]);

  X('fm-sequences', [
    function () {
      var a = ri(2, 9), b = nz(-9, 9), c = ri(1, 5), d = ri(1, 9), Lm = fr(a, c), target = 0.01;
      // |u_n - a/c| = |b c - a d| / (c (c n + d))
      var diff = Math.abs(b * c - a * d), n = 1; while (diff / (c * (c * n + d)) >= target && n < 100000) n++;
      if (diff === 0) { b += 1; diff = Math.abs(b * c - a * d); n = 1; while (diff / (c * (c * n + d)) >= target) n++; }
      return Q('The ' + M('n') + 'th term of a sequence is ' + M('u_n = \\frac{' + poly([a, b], 'n') + '}{' + poly([c, d], 'n') + '}') + '.', [
        ['Write down the limiting value of ' + M('u_n') + ' as ' + M('n \\to \\infty') + '.', 1, M(fs(Lm))],
        ['Find the least value of ' + M('n') + ' for which ' + M('u_n') + ' is within ' + target + ' of the limiting value.', 4, M('\\left|u_n - ' + fs(Lm) + '\\right| = \\frac{' + diff + '}{' + c + '(' + poly([c, d], 'n') + ')} < ' + target) + ', so ' + M('n = ' + n)]
      ]);
    },
    function () {
      var a = ri(1, 3), b = nz(-6, 6), c = nz(-8, 8), T = function (n) { return a * n * n + b * n + c; };
      var p = ri(2, 4), q = p + ri(2, 4);
      return Q('A quadratic sequence has ' + M('n') + 'th term ' + M('an^2 + bn + c') + '. The 1st term is ' + T(1) + ', the ' + ordinal(p) + ' term is ' + T(p) + ' and the ' + ordinal(q) + ' term is ' + T(q) + '.', [
        ['Find ' + M('a') + ', ' + M('b') + ' and ' + M('c') + '.', 5, M('a = ' + a + ',\\ b = ' + b + ',\\ c = ' + c) + ' (solve three simultaneous equations)'],
        ['Find the first term of the sequence that is greater than 1000.', 2, (function () { var n = 1; while (T(n) <= 1000) n++; return 'The ' + ordinal(n) + ' term, ' + T(n); })()]
      ]);
    }
  ]);
  function ordinal(n) { var s = ['th', 'st', 'nd', 'rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }

  X('fm-coord', [
    function () {
      var A = [ri(-5, 0), ri(-4, 3)], u = [ri(1, 4), ri(1, 4)], k = ri(1, 3);
      // right angle at B: B = A + u, C = B + k*(-u_y, u_x)
      var B = [A[0] + u[0], A[1] + u[1]], C = [B[0] - k * u[1], B[1] + k * u[0]], Dp = [A[0] - k * u[1], A[1] + k * u[0]];
      var area = k * (u[0] * u[0] + u[1] * u[1]);
      return Q('The points ' + M('A' + pt(A[0], A[1])) + ', ' + M('B' + pt(B[0], B[1])) + ' and ' + M('C' + pt(C[0], C[1])) + ' are three vertices of a rectangle ' + M('ABCD') + '.', [
        ['Show that angle ' + M('ABC') + ' is a right angle.', 2, 'Gradient ' + M('AB = ' + F(u[1], u[0])) + ', gradient ' + M('BC = ' + F(u[0], -u[1])) + '; product ' + M('-1') + '.'],
        ['Find the coordinates of ' + M('D') + '.', 1, M(pt(Dp[0], Dp[1]))],
        ['Find the area of the rectangle.', 2, M('AB \\times BC = \\sqrt{' + (u[0] * u[0] + u[1] * u[1]) + '} \\times ' + k + '\\sqrt{' + (u[0] * u[0] + u[1] * u[1]) + '} = ' + area)]
      ]);
    },
    function () {
      var A = [ri(-6, 0), ri(-6, 0)], B = [ri(2, 9), ri(2, 9)], m = ri(1, 4), n = ri(1, 4); while (gcd(m, n) > 1) n++;
      var P = [fr(A[0] * n + B[0] * m, m + n), fr(A[1] * n + B[1] * m, m + n)];
      return Q('', [
        ['The point ' + M('P') + ' lies on the line segment from ' + M('A' + pt(A[0], A[1])) + ' to ' + M('B' + pt(B[0], B[1])) + ' with ' + M('AP : PB = ' + m + ' : ' + n) + '. Find the coordinates of ' + M('P') + '.', 3, M(pt(fs(P[0]), fs(P[1])))],
        ['The point ' + M('Q') + ' lies on the line ' + M('AB') + ' extended beyond ' + M('B') + ' so that ' + M('AB : BQ = 2 : 1') + '. Find ' + M('Q') + '.', 2, M(pt(fs(fr(B[0] * 2 + (B[0] - A[0]), 2)), fs(fr(B[1] * 2 + (B[1] - A[1]), 2))))]
      ]);
    }
  ]);

  X('fm-circles', [
    function () {
      var c = [nz(-4, 4), nz(-4, 4)], T = pick([[3, 4], [4, 3], [5, 12], [12, 5], [6, 8], [8, 6]]), s = [pick([1, -1]), pick([1, -1])], P = [c[0] + s[0] * T[0], c[1] + s[1] * T[1]], r2 = T[0] * T[0] + T[1] * T[1];
      var A = [2 * c[0] - P[0], 2 * c[1] - P[1]];
      // tangent at P: (P - c).(x - P) = 0 -> dx x + dy y = dx Px + dy Py
      var dx = P[0] - c[0], dy = P[1] - c[1], rhs = dx * P[0] + dy * P[1], g_ = gcd(gcd(Math.abs(dx), Math.abs(dy)), Math.abs(rhs)) || 1;
      var xi = fr(rhs, dx), yi = fr(rhs, dy);
      return Q('The points ' + M('A' + pt(A[0], A[1])) + ' and ' + M('P' + pt(P[0], P[1])) + ' are the ends of a diameter of a circle.', [
        ['Find the equation of the circle.', 3, M('(x' + sg(-c[0]) + ')^2 + (y' + sg(-c[1]) + ')^2 = ' + r2)],
        ['Find the equation of the tangent to the circle at ' + M('P') + ', in the form ' + M('ax + by = c') + '.', 3, M(c1(dx / g_, 'x') + tc(dy / g_, 'y') + ' = ' + rhs / g_)],
        ['The tangent meets the axes at ' + M('Q') + ' and ' + M('R') + '. Find the area of triangle ' + M('OQR') + '.', 2, rhs === 0 ? 'The tangent passes through the origin, so there is no triangle' : M('\\tfrac{1}{2} \\times |' + fs(xi) + '| \\times |' + fs(yi) + '| = ' + fs(fr(Math.abs(rhs * rhs), 2 * Math.abs(dx * dy))))]
      ]);
    },
    function () {
      var r = ri(2, 6), c = [ri(-3, 3), ri(-3, 3)], d = pick([[r + 3, 0], [0, r + 4], [r + 1, r + 2]]), P = [c[0] + d[0], c[1] + d[1]], L2 = d[0] * d[0] + d[1] * d[1] - r * r;
      return Q('A circle has equation ' + M((c[0] ? '(x' + sg(-c[0]) + ')^2' : 'x^2') + ' + ' + (c[1] ? '(y' + sg(-c[1]) + ')^2' : 'y^2') + ' = ' + r * r) + '. The point ' + M('P' + pt(P[0], P[1])) + ' lies outside the circle.', [
        ['A tangent from ' + M('P') + ' touches the circle at ' + M('T') + '. Find the exact length of ' + M('PT') + '.', 3, M('PT^2 = CP^2 - r^2 = ' + (d[0] * d[0] + d[1] * d[1]) + ' - ' + r * r) + ', ' + M('PT = ' + surd(L2))],
        ['Find the shortest distance from ' + M('P') + ' to the circle.', 2, M(surd(d[0] * d[0] + d[1] * d[1]) + ' - ' + r)]
      ]);
    }
  ]);

  X('fm-calculus', [
    function () {
      var V = pick([250, 500, 1000, 2000]), r = Math.cbrt(V / (2 * Math.PI)), A = 2 * Math.PI * r * r + 2 * V / r;
      return Q('A closed cylinder has volume ' + V + ' cm³ and radius ' + M('r') + ' cm.', [
        ['Show that the surface area is ' + M('A = 2\\pi r^2 + \\frac{' + (2 * V) + '}{r}') + '.', 3, M('h = \\frac{' + V + '}{\\pi r^2}') + ', ' + M('A = 2\\pi r^2 + 2\\pi r h = 2\\pi r^2 + \\frac{' + (2 * V) + '}{r}')],
        ['Find the radius that gives the minimum surface area, and the minimum surface area, to 3 significant figures. Show that it is a minimum.', 5, M('\\frac{\\mathrm{d}A}{\\mathrm{d}r} = 4\\pi r - \\frac{' + (2 * V) + '}{r^2} = 0 \\Rightarrow r = \\sqrt[3]{\\frac{' + V + '}{2\\pi}} = ' + sf3(r)) + '; ' + M('A = ' + sf3(A)) + ' cm²; ' + M('\\frac{\\mathrm{d}^2A}{\\mathrm{d}r^2} = 4\\pi + \\frac{' + (4 * V) + '}{r^3} > 0') + ', so a minimum']
      ]);
    },
    function () {
      var p = nz(-3, 3), q = p + ri(2, 4), a = pick([1, 2]); // f'(x) = 3a (x - p)(x - q)
      var co = [a, -1.5 * a * (p + q), 3 * a * p * q, nz(-5, 5)];
      if (!Number.isInteger(co[1])) { a = 2; co = [a, -1.5 * a * (p + q), 3 * a * p * q, co[3]]; }
      var f = function (x) { return co[0] * x * x * x + co[1] * x * x + co[2] * x + co[3]; };
      return Q(M('y = ' + poly(co)) + '.', [
        ['Find the coordinates of the stationary points and determine their nature.', 6, M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + poly([3 * a, 2 * co[1], co[2]]) + ' = ' + (3 * a) + br(1, -p) + br(1, -q)) + '; maximum at ' + M(pt(p, f(p))) + ', minimum at ' + M(pt(q, f(q))) + ' (using ' + M('\\frac{\\mathrm{d}^2y}{\\mathrm{d}x^2}') + ')'],
        ['Write down the range of values of ' + M('x') + ' for which ' + M('y') + ' is decreasing.', 1, M(p + ' < x < ' + q)],
        ['For what values of ' + M('k') + ' does ' + M(poly(co) + ' = k') + ' have three solutions?', 2, M(f(q) + ' < k < ' + f(p))]
      ]);
    }
  ]);

  X('fm-matrices', [
    function () {
      var a = nz(-3, 3), b = nz(-3, 3);
      // M = [[a, b], [c, -a]] with a^2 + bc = 1 -> M^2 = I ; choose bc = 1 - a^2
      var bc = 1 - a * a, c;
      if (bc === 0) { b = nz(-3, 3); c = 0; } else { var fs_ = []; for (var t = -12; t <= 12; t++) if (t !== 0 && bc % t === 0) fs_.push(t); b = pick(fs_); c = bc / b; }
      return Q(M('\\mathbf{M} = \\begin{pmatrix} ' + a + ' & ' + b + ' \\\\ c & ' + (-a) + ' \\end{pmatrix}') + '.', [
        ['Given that ' + M('\\mathbf{M}^2 = \\mathbf{I}') + ', find the value of ' + M('c') + '.', 3, M('\\mathbf{M}^2 = \\begin{pmatrix} ' + (a * a) + tc(b, 'c') + ' & 0 \\\\ 0 & ' + c1(b, 'c') + ' + ' + (a * a) + ' \\end{pmatrix}') + ', so ' + M(c1(b, 'c') + ' = ' + bc) + ', ' + M('c = ' + c)],
        ['Hence write down ' + M('\\mathbf{M}^{15}') + '.', 1, M('\\mathbf{M}^{15} = \\mathbf{M}^{14}\\mathbf{M} = \\mathbf{M}')],
        ['Find the image of the point ' + M('(1, 2)') + ' under ' + M('\\mathbf{M}') + ', and then under ' + M('\\mathbf{M}^2') + '.', 2, M(pt(a + 2 * b, c - 2 * a)) + ', then ' + M('(1, 2)')]
      ]);
    },
    function () {
      var k = pick([2, 3]), R = pick([['90', [[0, -1], [1, 0]]], ['180', [[-1, 0], [0, -1]]]]), E = [[k, 0], [0, k]];
      var Mx = [[R[1][0][0] * k, R[1][0][1] * k], [R[1][1][0] * k, R[1][1][1] * k]];
      return Q('Matrix ' + M('\\mathbf{A}') + ' represents a rotation of ' + R[0] + '° anticlockwise about the origin. Matrix ' + M('\\mathbf{B}') + ' represents an enlargement, scale factor ' + k + ', centre the origin.', [
        ['Write down ' + M('\\mathbf{A}') + ' and ' + M('\\mathbf{B}') + ', and find ' + M('\\mathbf{BA}') + '.', 3, M('\\mathbf{BA} = \\begin{pmatrix} ' + Mx[0][0] + ' & ' + Mx[0][1] + ' \\\\ ' + Mx[1][0] + ' & ' + Mx[1][1] + ' \\end{pmatrix}')],
        ['The unit square is transformed by ' + M('\\mathbf{BA}') + '. Find the area of the image and the coordinates of the image of ' + M('(1, 1)') + '.', 2, 'Area ' + (k * k) + '; ' + M(pt(Mx[0][0] + Mx[0][1], Mx[1][0] + Mx[1][1]))],
        ['Find the smallest positive integer ' + M('n') + ' for which ' + M('\\mathbf{A}^n = \\mathbf{I}') + '.', 1, M('n = ' + (R[0] === '90' ? 4 : 2))]
      ]);
    }
  ]);

  X('fm-trig', [
    function () {
      var E = pick([
        ['2\\sin^2 x = 3\\cos x', '2(1 - \\cos^2 x) = 3\\cos x \\Rightarrow (2\\cos x - 1)(\\cos x + 2) = 0', '\\cos x = \\tfrac{1}{2}', [60, 300]],
        ['2\\cos^2 x + \\sin x = 1', '2(1 - \\sin^2 x) + \\sin x - 1 = 0 \\Rightarrow (2\\sin x + 1)(\\sin x - 1) = 0', '\\sin x = 1\\text{ or } -\\tfrac{1}{2}', [90, 210, 330]],
        ['\\tan x = 2\\sin x', '\\sin x(1 - 2\\cos x) = 0', '\\sin x = 0\\text{ or }\\cos x = \\tfrac{1}{2}', [0, 60, 180, 300]],
        ['3\\tan^2 x = 1', '\\tan x = \\pm\\tfrac{1}{\\sqrt{3}}', '\\tan x = \\pm\\tfrac{1}{\\sqrt{3}}', [30, 150, 210, 330]],
        ['\\sin x = \\sqrt{3}\\cos x', '\\tan x = \\sqrt{3}', '\\tan x = \\sqrt{3}', [60, 240]]]);
      return Q('', [['Solve ' + M(E[0]) + ' for ' + M('0^\\circ \\le x < 360^\\circ') + '.', 5, M(E[1]) + ', so ' + M(E[2]) + ': ' + M('x = ' + E[3].map(function (v) { return v + '^\\circ'; }).join(',\\ '))]]);
    },
    function () {
      var P = pick([
        ['\\frac{\\sin^2 x}{1 - \\cos x} \\equiv 1 + \\cos x', '\\frac{1 - \\cos^2 x}{1 - \\cos x} = \\frac{(1 - \\cos x)(1 + \\cos x)}{1 - \\cos x}'],
        ['\\tan x + \\frac{1}{\\tan x} \\equiv \\frac{1}{\\sin x\\cos x}', '\\frac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x}'],
        ['(\\sin x + \\cos x)^2 + (\\sin x - \\cos x)^2 \\equiv 2', '2\\sin^2 x + 2\\cos^2 x = 2'],
        ['\\frac{1 - \\sin^2 x}{\\sin x\\cos x} \\equiv \\frac{1}{\\tan x}', '\\frac{\\cos^2 x}{\\sin x\\cos x} = \\frac{\\cos x}{\\sin x}']]);
      var k = ri(2, 5);
      return Q('', [
        ['Prove that ' + M(P[0]) + '.', 3, M(P[1])],
        ['Given that ' + M('\\tan x = \\frac{1}{' + k + '}') + ' and ' + M('x') + ' is acute, find the exact value of ' + M('\\sin x\\cos x') + '.', 3, 'Right triangle with sides 1, ' + k + ', ' + M('\\sqrt{' + (1 + k * k) + '}') + ': ' + M('\\sin x\\cos x = \\frac{' + k + '}{' + (1 + k * k) + '}')]
      ]);
    }
  ]);

  X('fm-geometry', [
    function () {
      var s = 2 * ri(3, 7), h = ri(4, 12), half = s / 2, faceAng = Math.atan(h / half) * 180 / Math.PI, edgeAng = Math.atan(h / (half * Math.SQRT2)) * 180 / Math.PI, slant = Math.sqrt(h * h + half * half);
      return Q('The diagram shows a right pyramid with a square base ' + M('ABCD') + ' of side ' + s + ' cm. The apex ' + M('V') + ' is ' + h + ' cm vertically above the centre of the base.' + D.pyramid(s, h), [
        ['Find the angle between the edge ' + M('VA') + ' and the base.', 3, M('\\tan\\theta = \\frac{' + h + '}{' + half + '\\sqrt{2}}') + ', ' + M('\\theta = ' + dp(edgeAng, 1)) + '°'],
        ['Find the angle between the face ' + M('VAB') + ' and the base.', 3, M('\\tan\\phi = \\frac{' + h + '}{' + half + '}') + ', ' + M('\\phi = ' + dp(faceAng, 1)) + '°'],
        ['Find the total surface area of the pyramid.', 3, M(s * s + ' + 4 \\times \\tfrac{1}{2} \\times ' + s + ' \\times ' + sf3(slant) + ' = ' + sf3(s * s + 2 * s * slant)) + ' cm²']
      ]);
    },
    function () {
      var a = ri(5, 12), b = ri(5, 12), C = ri(35, 80), c2 = a * a + b * b - 2 * a * b * Math.cos(C * Math.PI / 180), c = Math.sqrt(c2);
      var area = 0.5 * a * b * Math.sin(C * Math.PI / 180), R = c / (2 * Math.sin(C * Math.PI / 180));
      return Q('In triangle ' + M('ABC') + ', ' + M('BC = ' + a) + ' cm, ' + M('AC = ' + b) + ' cm and angle ' + M('ACB = ' + C) + '°. The triangle is inscribed in a circle.', [
        ['Find ' + M('AB') + ' and the area of the triangle.', 4, M('AB = ' + sf3(c)) + ' cm, area ' + M('= ' + sf3(area)) + ' cm²'],
        ['Use the fact that the angle at the centre is twice the angle at the circumference to find the radius of the circle.', 3, 'Angle ' + M('AOB = ' + 2 * C) + '°; in isosceles triangle ' + M('AOB') + ', ' + M('r = \\frac{' + sf3(c / 2) + '}{\\sin ' + C + '^\\circ} = ' + sf3(R)) + ' cm']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
