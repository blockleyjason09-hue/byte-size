/* Byte Size Classroom — extension questions for Pearson Edexcel A level Mathematics, Year 1 and Year 2 (top level). g = 9.8 m s⁻². */
(function (g) {
  var BS = g.BS, D = BS.draw, X = BS.ext, IB = BS.ib;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, dp = BS.dp, num = BS.num, M = BS.m;
  var G = 9.8;
  function s3(x) { return IB.s3(x); }
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: p[2] }; }) }; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function tc(c, v) { return c === 0 ? '' : (c < 0 ? ' - ' : ' + ') + (Math.abs(c) === 1 && v ? '' : Math.abs(c)) + v; }
  function pt(x, y) { return '(' + x + ',\\ ' + y + ')'; }
  function F(n, d) { return frac(n, d); }
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } var k = gcd(Math.abs(n), d) || 1; return [n / k, d / k]; }
  function fs(a) { return frac(a[0], a[1]); }
  function comb(n, k) { var r = 1; for (var i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); }
  function surd(n) { return BS.gcse2.surd(n); }
  function rad(d) { return d * Math.PI / 180; }
  function deg(r) { return r * 180 / Math.PI; }
  function bcdf(n, p, k) { return IB.bcdf(n, p, k); }
  function bpdf(n, p, k) { return IB.bpdf(n, p, k); }
  function f4(x) { return x.toFixed(4); }
  // exact roots of A x^2 + B x + C = 0 as simplified LaTeX
  function qroots(A, B, C, v) {
    v = v || 'x'; var d = B * B - 4 * A * C;
    if (d < 0) return 'no real roots';
    var r = Math.sqrt(d); if (Number.isInteger(r)) { var a = fr(-B - r, 2 * A), b = fr(-B + r, 2 * A); return M(v + ' = ' + fs(a) + (d ? '\\text{ or } ' + v + ' = ' + fs(b) : '')); }
    var k = 1, m = d; for (var f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; k *= f; }
    var gg = gcd(gcd(Math.abs(B), k), Math.abs(2 * A)) || 1, den = 2 * A / gg, b0 = -B / gg, k0 = k / gg;
    if (den < 0) { den = -den; b0 = -b0; }
    var top = (b0 ? b0 + ' \\pm ' : '\\pm ') + (k0 === 1 ? '' : k0) + '\\sqrt{' + m + '}';
    return M(v + ' = ' + (den === 1 ? top : '\\frac{' + top + '}{' + den + '}'));
  }
  function ordinal(n) { var s_ = ['th', 'st', 'nd', 'rd'], q = n % 100; return n + (s_[(q - 20) % 10] || s_[q] || s_[0]); }
  function xm(v, x) { x = x || 'x'; return v ? '(' + x + sg(-v) + ')' : x; }
  function fx(f, v) { var t = fs(f); return t === '1' ? v : t === '-1' ? '-' + v : t + v; }

  /* ================= Year 1 Pure ================= */
  X('al-indices', [
    function () {
      var n = pick([8, 15, 24, 35, 48, 63, 80, 99]), N = n + 1, rt = Math.sqrt(N);
      return Q('', [
        ['Show that ' + M('\\frac{1}{\\sqrt{k} + \\sqrt{k + 1}} = \\sqrt{k + 1} - \\sqrt{k}') + '.', 2, 'Multiply top and bottom by ' + M('\\sqrt{k + 1} - \\sqrt{k}') + '; the denominator is ' + M('(k + 1) - k = 1') + '.'],
        ['Hence find the exact value of ' + M('\\displaystyle\\sum_{k=1}^{' + n + '} \\frac{1}{\\sqrt{k} + \\sqrt{k + 1}}') + '.', 3, 'The sum telescopes to ' + M('\\sqrt{' + N + '} - \\sqrt{1} = ' + (rt - 1))]
      ]);
    },
    function () {
      var p = ri(1, 3), q = p + ri(2, 3), P = Math.pow(p, 3), Qv = Math.pow(q, 3);
      return Q('', [
        ['Solve ' + M('x^{\\frac{2}{3}} - ' + (p + q) + 'x^{\\frac{1}{3}} + ' + (p * q) + ' = 0') + '.', 4, 'Let ' + M('u = x^{\\frac{1}{3}}') + ': ' + M('u^2 - ' + (p + q) + 'u + ' + (p * q) + ' = 0') + ', ' + M('u = ' + p + '\\text{ or } ' + q) + ', so ' + M('x = ' + P + '\\text{ or } x = ' + Qv)],
        ['Solve ' + M('2^{2x + 1} - ' + (Math.pow(2, p) * 2 + Math.pow(2, q)) + ' \\times 2^{x} + ' + Math.pow(2, p + q) + ' = 0') + '.', 4, 'Let ' + M('y = 2^x') + ': ' + M('2y^2 - ' + (Math.pow(2, p) * 2 + Math.pow(2, q)) + 'y + ' + Math.pow(2, p + q) + ' = 0') + ', ' + M('y = ' + Math.pow(2, p) + '\\text{ or } ' + F(Math.pow(2, q), 2)) + ', so ' + M('x = ' + p + '\\text{ or } x = ' + (q - 1))]
      ]);
    }
  ]);

  X('al-quadratics', [
    function () {
      var c = ri(2, 9);
      return Q('', [['Find the set of values of ' + M('k') + ' for which ' + M('kx^2 + 2kx + ' + c + ' > 0') + ' for all real values of ' + M('x') + '.', 5, 'If ' + M('k = 0') + ', it is ' + M(c + ' > 0') + ', true. If ' + M('k \\ne 0') + ' we need ' + M('k > 0') + ' and discriminant ' + M('4k^2 - ' + (4 * c) + 'k < 0') + ', so ' + M('0 < k < ' + c) + '. Answer: ' + M('\\{k : 0 \\le k < ' + c + '\\}')]]);
    },
    function () {
      var c = pick([1, 4, 9, 16, 25]), s = Math.sqrt(c), m = nz(-3, 3);
      // x^2 + k x + c > m x  for all x : (k - m)^2 < 4c  ->  m - 2s < k < m + 2s
      var a = ri(1, 5);
      return Q('', [
        ['Find the set of values of ' + M('k') + ' for which the curve ' + M('y = x^2 + kx + ' + c) + ' lies entirely above the line ' + M('y = ' + c1(m, 'x')) + '.', 4, M('x^2 + (k' + sg(-m) + ')x + ' + c + ' > 0') + ' for all ' + M('x') + ': ' + M('(k' + sg(-m) + ')^2 < ' + (4 * c)) + ', so ' + M((m - 2 * s) + ' < k < ' + (m + 2 * s))],
        ['Prove that the equation ' + M('x^2 + (k + ' + a + ')x + ' + a + 'k = 0') + ' has real roots for every value of ' + M('k') + '.', 2, 'Discriminant ' + M('(k + ' + a + ')^2 - ' + (4 * a) + 'k = (k - ' + a + ')^2 \\ge 0') + '.']
      ]);
    }
  ]);

  X('al-equations', [
    function () {
      var b = ri(2, 4), c = nz(-6, 6);
      // x = c - b y ; x^2 + x y = (b^2 - b) y^2 + (c - 2bc) y + c^2 = k ; tangency k = c^2 - (c - 2bc)^2 / (4(b^2 - b))
      var A = b * b - b, B = c - 2 * b * c, K = fr(4 * A * c * c - B * B, 4 * A);
      return Q('', [['Find the value of ' + M('k') + ' for which the simultaneous equations ' + M('x + ' + b + 'y = ' + c) + ' and ' + M('x^2 + xy = k') + ' have exactly one solution, and find that solution.', 6, 'Substitute ' + M('x = ' + c + ' - ' + b + 'y') + ': ' + M(poly([A, B, c * c], 'y') + ' - k = 0') + '; one solution when ' + M(B * B + ' = ' + (4 * A) + '(' + (c * c) + ' - k)') + ', ' + M('k = ' + fs(K)) + '; then ' + M('y = ' + fs(fr(-B, 2 * A)) + ',\\ x = ' + fs(fr(c * 2 * A + b * B, 2 * A)))]]);
    },
    function () {
      var a = nz(-5, 1), b = a + ri(3, 8), m = ri(2, 4), n = ri(5, 20); // x^2 - (a+b)x + ab > 0  and  m x - 1 < n
      var lim = fr(n + 1, m), A = '\\{x : x < ' + a + '\\} \\cup \\{x : x > ' + b + '\\}';
      var ans = []; if (a < lim[0] / lim[1]) ans.push('x < ' + a); if (b < lim[0] / lim[1]) ans.push(b + ' < x < ' + fs(lim));
      return Q('', [['Using set notation, find the set of values of ' + M('x') + ' for which ' + M(poly([1, -(a + b), a * b]) + ' > 0') + ' and ' + M(c1(m, 'x') + ' - 1 < ' + n) + '.', 5, M('x < ' + a + '\\text{ or } x > ' + b) + ' and ' + M('x < ' + fs(lim)) + ', so ' + M('\\{x : ' + ans.join('\\} \\cup \\{x : ') + '\\}')]]);
    }
  ]);

  X('al-graphs', [
    function () {
      var a = nz(-3, 3), b = a + ri(2, 5) * pick([1, -1]); // y = (x - a)^2 (x - b)
      var f = function (x) { return (x - a) * (x - a) * (x - b); }, s1 = a, s2 = (a + 2 * b) / 3, y2 = f(s2);
      var lo = Math.min(a, b) - 1.5, hi = Math.max(a, b) + 1.5, ys = [f(lo), f(hi), 0, y2];
      var p = D.plane({ xmin: lo, xmax: hi, ymin: Math.max(Math.min.apply(null, ys), -40) - 2, ymax: Math.min(Math.max.apply(null, ys), 40) + 2, w: 300, h: 240 });
      var sv = p.svg + p.curve(f, lo, hi);
      var lowK = Math.min(0, y2), highK = Math.max(0, y2);
      return Q('The curve ' + M('C') + ' has equation ' + M('y = ' + xm(a) + '^2' + xm(b)) + '.' + D.svg(300, 240, sv, 'Cubic curve'), [
        ['Find the coordinates of the turning points of ' + M('C') + '.', 4, M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + xm(a) + '(3x' + (a + 2 * b ? sg(-(a + 2 * b)) : '') + ')') + ', so ' + M(pt(a, 0)) + ' and ' + M(pt(fs(fr(a + 2 * b, 3)), fs(fr(Math.round(y2 * 27), 27))))],
        ['Find the set of values of ' + M('k') + ' for which the line ' + M('y = k') + ' meets ' + M('C') + ' at three distinct points.', 2, M(fs(fr(Math.round(lowK * 27), 27)) + ' < k < ' + fs(fr(Math.round(highK * 27), 27)))]
      ]);
    },
    function () {
      var a = ri(1, 6), b = nz(-3, 3), c = nz(-3, 3);
      // y = a/(x - b) + c meets y = x : (x - c)(x - b) = a -> x^2 - (b + c) x + bc - a = 0
      var disc = (b + c) * (b + c) - 4 * (b * c - a);
      return Q('The curve ' + M('C') + ' has equation ' + M('y = \\frac{' + a + '}{x' + sg(-b) + '}' + sg(c)) + '.', [
        ['Write down the equations of the asymptotes of ' + M('C') + '.', 2, M('x = ' + b + ',\\ y = ' + c)],
        ['Find the exact coordinates of the points where ' + M('C') + ' meets the line ' + M('y = x') + '.', 4, M(xm(c) + xm(b) + ' = ' + a) + ': ' + qroots(1, -(b + c), b * c - a) + ', with ' + M('y = x') + ' at each point'],
        ['Prove that ' + M('C') + ' meets every line ' + M('y = x + m') + ' at exactly two points.', 3, M('(x + m' + (c ? sg(-c) : '') + ')' + xm(b) + ' = ' + a) + ' is a quadratic with discriminant ' + M('(m' + (b - c ? sg(b - c) : '') + ')^2 + ' + (4 * a) + ' > 0') + ', so there are always two distinct roots.']
      ]);
    }
  ]);

  X('al-lines', [
    function () {
      var m = pick([[1, 2], [2, 1], [1, 3], [3, 1], [1, -2], [-2, 1], [2, -3]]), c = nz(-6, 6), P = [ri(-6, 6), ri(-6, 6)];
      // line: a x + b y = k  with gradient -a/b ; use y = (m0/m1) x + c  -> m0 x - m1 y + m1 c = 0
      var A = m[0], B = -m[1], C = m[1] * c; // A x + B y + C = 0
      var t = -(A * P[0] + B * P[1] + C), den = A * A + B * B, foot = [fr(P[0] * den + A * t, den), fr(P[1] * den + B * t, den)], d2 = t * t / den;
      return Q('The line ' + M('l') + ' has equation ' + M('y = ' + F(m[0], m[1]) + 'x' + sg(c)) + '. The point ' + M('P') + ' has coordinates ' + M(pt(P[0], P[1])) + '.', [
        ['Find the coordinates of the point ' + M('N') + ' on ' + M('l') + ' that is closest to ' + M('P') + '.', 5, 'The perpendicular from ' + M('P') + ' meets ' + M('l') + ' at ' + M('N' + pt(fs(foot[0]), fs(foot[1])))],
        ['Find the exact shortest distance from ' + M('P') + ' to ' + M('l') + '.', 2, M('PN = \\frac{' + Math.abs(t) + '}{\\sqrt{' + den + '}} = ' + (function () { var r = fr(Math.abs(t), den), c0 = r[0] === 1 && r[1] === 1 ? '' : fs(r); return (c0 === '1' ? '' : c0) + '\\sqrt{' + den + '}'; })())]
      ]);
    },
    function () {
      var A = [ri(-4, 0), ri(-4, 0)], B = [ri(3, 8), ri(-3, 2)], C = [ri(0, 4), ri(4, 9)];
      var area = Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1])) / 2;
      var mAB = fr(B[1] - A[1], B[0] - A[0]);
      return Q('The points ' + M('A' + pt(A[0], A[1])) + ', ' + M('B' + pt(B[0], B[1])) + ' and ' + M('C' + pt(C[0], C[1])) + ' form a triangle.', [
        ['Find the equation of the line through ' + M('C') + ' perpendicular to ' + M('AB') + '.', 3, 'Gradient ' + M(fs(fr(-mAB[1], mAB[0] || 1))) + (mAB[0] === 0 ? ' (vertical line ' + M('x = ' + C[0]) + ')' : ': ' + M('y' + (C[1] ? sg(-C[1]) : '') + ' = ' + fx(fr(-mAB[1], mAB[0]), xm(C[0]))))],
        ['Find the area of triangle ' + M('ABC') + '.', 3, M(num(area))]
      ]);
    }
  ]);

  X('al-circles', [
    function () {
      var c = [nz(-4, 4), nz(-4, 4)], T = pick([[3, 4], [5, 0], [0, 5], [4, 3], [-3, 4], [-4, -3], [5, 12], [12, 5], [-5, 12]]), r2 = T[0] * T[0] + T[1] * T[1];
      var pts = [[3, 4], [4, -3], [-3, -4], [-4, 3], [5, 0], [0, -5], [-5, 0], [0, 5]].filter(function (p) { return p[0] * p[0] + p[1] * p[1] === 25; });
      var sc = r2 === 25 ? 1 : 0; if (!sc) { T = [3, 4]; r2 = 25; }
      var ch = BS.shuffle(pts).slice(0, 3).map(function (p) { return [p[0] + c[0], p[1] + c[1]]; });
      return Q('', [['Find the equation of the circle that passes through ' + M(ch.map(function (p) { return pt(p[0], p[1]); }).join(',\\ ')) + '.', 6, 'The perpendicular bisectors of two chords meet at the centre ' + M(pt(c[0], c[1])) + '; radius 5: ' + M('(x' + sg(-c[0]) + ')^2 + (y' + sg(-c[1]) + ')^2 = 25')]]);
    },
    function () {
      var a = ri(2, 6), b = ri(1, 5), r = ri(1, 4);
      // circle centre (a, b) radius r ; tangents y = m x through origin: |m a - b| / sqrt(m^2 + 1) = r -> (a^2 - r^2) m^2 - 2ab m + b^2 - r^2 = 0
      while (a * a - r * r <= 0 || a * a + b * b <= r * r) { a = ri(2, 6); r = ri(1, 4); }
      var A = a * a - r * r, B = -2 * a * b, C = b * b - r * r, disc = B * B - 4 * A * C;
      return Q('The circle ' + M('C') + ' has centre ' + M(pt(a, b)) + ' and radius ' + r + '. The line ' + M('y = mx') + ' is a tangent to ' + M('C') + '.', [
        ['Show that ' + M(poly([A, B, C], 'm') + ' = 0') + '.', 4, 'Substitute ' + M('y = mx') + ' into ' + M('(x - ' + a + ')^2 + (y - ' + b + ')^2 = ' + r * r) + ' and set the discriminant of the quadratic in ' + M('x') + ' to zero.'],
        ['Hence find the exact values of ' + M('m') + '.', 2, qroots(A, B, C, 'm')],
        ['Find the distance from the origin to each point of contact.', 2, M('\\sqrt{' + a + '^2 + ' + b + '^2 - ' + r + '^2} = ' + surd(a * a + b * b - r * r))]
      ]);
    }
  ]);

  X('al-algebraic', [
    function () {
      var r1 = nz(-3, 3), r2 = nz(-3, 3), k = pick([2, 3]), r3n = nz(-3, 3); while (r2 === r1) r2 = nz(-3, 3);
      // f(x) = (k x - r3n)(x - r1)(x - r2)
      var co = [k, -k * (r1 + r2) - r3n, k * r1 * r2 + r3n * (r1 + r2), -r3n * r1 * r2];
      return Q(M('\\mathrm{f}(x) = ' + k + 'x^3 + ax^2 + bx' + sg(co[3])) + '. ' + M('(x' + sg(-r1) + ')') + ' and ' + M('(x' + sg(-r2) + ')') + ' are factors of ' + M('\\mathrm{f}(x)') + '.', [
        ['Find the values of ' + M('a') + ' and ' + M('b') + '.', 4, M('a = ' + co[1] + ',\\ b = ' + co[2])],
        ['Factorise ' + M('\\mathrm{f}(x)') + ' completely and solve ' + M('\\mathrm{f}(2^y) = 0') + '.', 4, M('\\mathrm{f}(x) = ' + br(k, -r3n) + br(1, -r1) + br(1, -r2)) + '; ' + M('2^y > 0') + ', so only positive roots give solutions: ' + (function () { var rs = [r1, r2, r3n / k].filter(function (v) { return v > 0; }); return rs.length ? rs.map(function (v) { var l2 = Math.log(v) / Math.log(2); return M('y = ' + (Math.abs(l2 - Math.round(l2)) < 1e-9 ? Math.round(l2) : '\\log_2 ' + (Number.isInteger(v) ? v : fs(fr(r3n, k))))); }).join(', ') : 'no solutions'; })()]
      ]);
    },
    function () {
      var P = pick([
        ['Prove by exhaustion that ' + M('n^2 - 1') + ' is a multiple of 3 whenever the integer ' + M('n') + ' is not a multiple of 3.', 'Write ' + M('n = 3k \\pm 1') + ': ' + M('n^2 - 1 = 9k^2 \\pm 6k = 3(3k^2 \\pm 2k)') + '.'],
        ['Prove that ' + M('n^2 + n + 1') + ' is odd for every integer ' + M('n') + '.', M('n^2 + n = n(n + 1)') + ' is a product of consecutive integers, so it is even; adding 1 makes it odd.'],
        ['Prove that the square of any integer is of the form ' + M('4k') + ' or ' + M('4k + 1') + '.', 'Even: ' + M('(2m)^2 = 4m^2') + '. Odd: ' + M('(2m + 1)^2 = 4(m^2 + m) + 1') + '.'],
        ['Prove that for all real ' + M('x') + ', ' + M('x^4 - 4x^2 + 5 > 0') + '.', M('(x^2 - 2)^2 + 1 \\ge 1 > 0') + '.'],
        ['Prove that ' + M('2^n - 1') + ' is not a multiple of 3 when ' + M('n') + ' is odd, by considering ' + M('n = 2k + 1') + '.', M('2^{2k + 1} - 1 = 2 \\cdot 4^k - 1') + '; ' + M('4^k') + ' leaves remainder 1 on division by 3, so ' + M('2 \\cdot 4^k - 1') + ' leaves remainder 1.']]);
      var D2 = pick([
        ['Disprove: “' + M('2^n + 1') + ' is prime for every positive integer ' + M('n') + '.”', M('n = 3') + ': ' + M('2^3 + 1 = 9') + ', which is not prime.'],
        ['Disprove: “if ' + M('a > b') + ' then ' + M('a^2 > b^2') + '.”', M('a = 1,\\ b = -2') + ': ' + M('1 < 4') + '.'],
        ['Disprove: “' + M('n^2 - n + 41') + ' is prime for all positive integers ' + M('n') + '.”', M('n = 41') + ' gives ' + M('41^2') + ', which is not prime.']]);
      return Q('', [[P[0], 4, P[1]], [D2[0], 2, D2[1]]]);
    }
  ]);

  X('al-binomial', [
    function () {
      var n = ri(5, 9), a = nz(-4, 4), c1v = n * a, c2v = comb(n, 2) * a * a, c3v = comb(n, 3) * a * a * a;
      return Q('In the binomial expansion of ' + M('(1 + ax)^n') + ', where ' + M('n') + ' is a positive integer, the coefficient of ' + M('x') + ' is ' + c1v + ' and the coefficient of ' + M('x^2') + ' is ' + num(c2v) + '.', [
        ['Find the values of ' + M('n') + ' and ' + M('a') + '.', 5, M('na = ' + c1v + ',\\ \\frac{n(n - 1)}{2}a^2 = ' + num(c2v)) + '; dividing, ' + M('\\frac{(n - 1)a}{2} = ' + fs(fr(c2v, c1v))) + ', so ' + M('n = ' + n + ',\\ a = ' + a)],
        ['Find the coefficient of ' + M('x^3') + '.', 1, num(c3v)]
      ]);
    },
    function () {
      var n = 7, kr = fr(3 * 2, 5); // (2 + kx)^7 : coefficient x^2: C(7,2) 2^5 k^2 ; x^3: C(7,3) 2^4 k^3 ; equal -> k = 21*32/(35*16) = 6/5
      var b = pick([2, 3]), nn = pick([6, 7, 8]), r = 2, s = 3; // general (b + kx)^nn : C(n,2) b^{n-2} k^2 = C(n,3) b^{n-3} k^3 -> k = C(n,2) b / C(n,3) = 3b/(n-2)
      var K = fr(3 * b, nn - 2);
      return Q('', [['In the expansion of ' + M('(' + b + ' + kx)^{' + nn + '}') + ', where ' + M('k \\ne 0') + ', the coefficients of ' + M('x^2') + ' and ' + M('x^3') + ' are equal. Find the value of ' + M('k') + '.', 4, M('\\binom{' + nn + '}{2}' + b + '^{' + (nn - 2) + '}k^2 = \\binom{' + nn + '}{3}' + b + '^{' + (nn - 3) + '}k^3') + ', so ' + M('k = \\frac{' + comb(nn, 2) + ' \\times ' + b + '}{' + comb(nn, 3) + '} = ' + fs(K))], ['Find the term independent of ' + M('x') + ' in ' + M('\\left(2x - \\frac{1}{x^2}\\right)^{9}') + '.', 3, 'General term ' + M('\\binom{9}{r}(2x)^{9 - r}(-x^{-2})^r') + '; ' + M('9 - 3r = 0 \\Rightarrow r = 3') + ': ' + M('\\binom{9}{3}2^6(-1)^3 = ' + num(-comb(9, 3) * 64))]]);
    }
  ]);

  X('al-trig', [
    function () {
      var d = ri(2, 6), x = ri(3, 9), ang = pick([60, 120]), sgn = ang === 60 ? -1 : 1, AC2 = x * x + (x + d) * (x + d) + sgn * x * (x + d);
      // given AC^2 and angle, solve for x: x^2 + (x+d)^2 + sgn x(x+d) = AC2
      var A2 = 2 + sgn, B2 = 2 * d + sgn * d, C2 = d * d - AC2;
      var area = 0.5 * x * (x + d) * Math.sin(rad(ang));
      return Q('In triangle ' + M('ABC') + ', ' + M('AB = x') + ' cm, ' + M('BC = (x + ' + d + ')') + ' cm, angle ' + M('ABC = ' + ang) + '° and ' + M('AC = ' + surd(AC2)) + ' cm.', [
        ['Show that ' + M(poly([A2, B2, C2]) + ' = 0') + '.', 3, 'Cosine rule: ' + M(AC2 + ' = x^2 + (x + ' + d + ')^2 - 2x(x + ' + d + ')\\cos ' + ang + '^\\circ') + ', simplify.'],
        ['Find ' + M('x') + ' and the exact area of the triangle.', 3, M('x = ' + x) + '; area ' + M('= \\tfrac{1}{2}(' + x + ')(' + (x + d) + ')\\sin ' + ang + '^\\circ = ' + F(x * (x + d), 4) + '\\sqrt{3}') + ' cm²']
      ]);
    },
    function () {
      var E = pick([
        ['3\\sin^2\\theta + 7\\cos\\theta = 5', '3(1 - \\cos^2\\theta) + 7\\cos\\theta - 5 = 0 \\Rightarrow (3\\cos\\theta - 1)(\\cos\\theta - 2) = 0', '\\cos\\theta = \\tfrac{1}{3}', [70.5, 289.5]],
        ['4\\sin\\theta = 3\\tan\\theta', '\\sin\\theta(4\\cos\\theta - 3) = 0', '\\sin\\theta = 0\\text{ or }\\cos\\theta = \\tfrac{3}{4}', [0, 41.4, 180, 318.6]],
        ['2\\cos^2\\theta = 3\\sin\\theta', '2\\sin^2\\theta + 3\\sin\\theta - 2 = 0 \\Rightarrow (2\\sin\\theta - 1)(\\sin\\theta + 2) = 0', '\\sin\\theta = \\tfrac{1}{2}', [30, 150]],
        ['\\tan\\theta + \\frac{1}{\\tan\\theta} = 4', '\\tan^2\\theta - 4\\tan\\theta + 1 = 0', '\\tan\\theta = 2 \\pm \\sqrt{3}', [15, 75, 195, 255]]]);
      var k = pick([2, 3]), A = pick([20, 40, 50]);
      var sols = []; var base = deg(Math.asin(0.5)); for (var n = -6; n <= 6; n++) [base, 180 - base].forEach(function (b0) { var t = (b0 + 360 * n - A) / k; if (t >= 0 && t < 180 && sols.every(function (v) { return Math.abs(v - t) > 1e-6; })) sols.push(t); });
      sols.sort(function (u, v) { return u - v; });
      return Q('', [
        ['Solve ' + M(E[0]) + ' for ' + M('0 \\le \\theta < 360^\\circ') + ', giving answers to 1 decimal place.', 5, M(E[1]) + ', ' + M(E[2]) + ': ' + M('\\theta = ' + E[3].map(function (v) { return v + '^\\circ'; }).join(',\\ '))],
        ['Solve ' + M('\\sin(' + k + 'x + ' + A + '^\\circ) = \\tfrac{1}{2}') + ' for ' + M('0 \\le x < 180^\\circ') + '.', 4, M('x = ' + sols.map(function (v) { return num(Math.round(v * 10) / 10) + '^\\circ'; }).join(',\\ '))]
      ]);
    }
  ]);

  X('al-vectors', [
    function () {
      var a = [nz(-5, 5), nz(-5, 5)], b = [nz(-4, 4), nz(-4, 4)];
      // |a + lam b|^2 = |b|^2 lam^2 + 2 (a.b) lam + |a|^2 ; min at lam = -(a.b)/|b|^2
      var ab = a[0] * b[0] + a[1] * b[1], bb = b[0] * b[0] + b[1] * b[1], aa = a[0] * a[0] + a[1] * a[1], lam = fr(-ab, bb), min2 = fr(aa * bb - ab * ab, bb);
      function v(p) { return BS.vt(p.map(String), ['\\mathbf{i}', '\\mathbf{j}']); }
      return Q(M('\\mathbf{a} = ' + v(a)) + ' and ' + M('\\mathbf{b} = ' + v(b)) + '.', [
        ['Show that ' + M('|\\mathbf{a} + \\lambda\\mathbf{b}|^2 = ' + poly([bb, 2 * ab, aa], '\\lambda')) + '.', 3, M('\\mathbf{a} + \\lambda\\mathbf{b} = (' + a[0] + tc(b[0], '\\lambda') + ')\\mathbf{i} + (' + a[1] + tc(b[1], '\\lambda') + ')\\mathbf{j}') + '; square and add the components.'],
        ['Find the value of ' + M('\\lambda') + ' for which ' + M('|\\mathbf{a} + \\lambda\\mathbf{b}|') + ' is least, and the least value.', 4, 'Complete the square: ' + M('\\lambda = ' + fs(lam)) + ', least value ' + M(min2[1] === 1 ? surd(min2[0]) : '\\sqrt{' + fs(min2) + '}')]
      ]);
    },
    function () {
      var A = [ri(-3, 3), ri(-3, 3)], u = [ri(1, 4), ri(-3, 3)], k = ri(1, 3), B = [A[0] + u[0], A[1] + u[1]], C = [B[0] - k * u[1], B[1] + k * u[0]];
      var AB2 = u[0] * u[0] + u[1] * u[1], BC2 = k * k * AB2, AC2 = AB2 + BC2;
      return Q('Relative to an origin ' + M('O') + ', the points ' + M('A, B, C') + ' have position vectors ' + M(BS.vt([A[0], A[1]].map(String), ['\\mathbf{i}', '\\mathbf{j}'])) + ', ' + M(BS.vt([B[0], B[1]].map(String), ['\\mathbf{i}', '\\mathbf{j}'])) + ' and ' + M(BS.vt([C[0], C[1]].map(String), ['\\mathbf{i}', '\\mathbf{j}'])) + '.', [
        ['Show that triangle ' + M('ABC') + ' is right-angled.', 3, M('|AB|^2 = ' + AB2 + ',\\ |BC|^2 = ' + BC2 + ',\\ |AC|^2 = ' + AC2) + ', and ' + M(AB2 + ' + ' + BC2 + ' = ' + AC2) + ' (Pythagoras), so the right angle is at ' + M('B')],
        ['Find the position vector of ' + M('D') + ' such that ' + M('ABCD') + ' is a rectangle, and the angle ' + M('AC') + ' makes with ' + M('\\mathbf{i}') + '.', 3, M('\\overrightarrow{OD} = ' + BS.vt([A[0] - k * u[1], A[1] + k * u[0]].map(String), ['\\mathbf{i}', '\\mathbf{j}'])) + '; angle ' + dp(((deg(Math.atan2(C[1] - A[1], C[0] - A[0])) + 360) % 360), 1) + '° anticlockwise from ' + M('\\mathbf{i}')]
      ]);
    }
  ]);

  X('al-differentiation', [
    function () {
      var a = ri(1, 4), b = nz(-5, 5);
      return Q('', [['Prove, from first principles, that the derivative of ' + M(c1(a, 'x^3') + tc(b, 'x')) + ' is ' + M(c1(3 * a, 'x^2') + sg(b)) + '.', 5, M('\\frac{\\mathrm{f}(x + h) - \\mathrm{f}(x)}{h} = \\frac{' + a + '(3x^2h + 3xh^2 + h^3)' + sg(b) + 'h}{h} = ' + (3 * a) + 'x^2 + ' + (3 * a) + 'xh + ' + a + 'h^2' + sg(b)) + '; as ' + M('h \\to 0') + ' this tends to ' + M(c1(3 * a, 'x^2') + sg(b))]]);
    },
    function () {
      var r1 = nz(-3, 0), r2 = ri(1, 4), a = nz(-4, 4), p = fr(r1 + r2, 2), q = r1 * r2 + a; // y = x^2 + a, tangents through (p, q)
      // tangent at x0 passes through (p, q): q = x0^2 + a + 2 x0 (p - x0) => x0^2 - 2 p x0 + q - a = 0 ; roots r1, r2 => p = (r1+r2)/2, q - a = r1 r2
      return Q('The curve ' + M('C') + ' has equation ' + M('y = x^2' + sg(a)) + '. Two tangents to ' + M('C') + ' pass through the point ' + M('P' + pt(fs(p), q)) + '.', [
        ['Find the coordinates of the points where the tangents touch ' + M('C') + '.', 5, 'Tangent at ' + M('x = t') + ': ' + M('y = 2tx - t^2' + sg(a)) + '. Through ' + M('P') + ': ' + M('t^2' + tc(-(r1 + r2), 't') + (r1 * r2 ? sg(r1 * r2) : '') + ' = 0') + ', so ' + M('t = ' + r1 + ',\\ ' + r2) + ': ' + M(pt(r1, r1 * r1 + a) + ',\\ ' + pt(r2, r2 * r2 + a))],
        ['Find the equations of the two tangents.', 2, M('y = ' + poly([2 * r1, -r1 * r1 + a]) + '\\text{ and } y = ' + poly([2 * r2, -r2 * r2 + a]))]
      ]);
    }
  ]);

  X('al-integration', [
    function () {
      var k = ri(2, 5), N = k * k * k - k * k;
      return Q('', [['Given that ' + M('\\displaystyle\\int_{1}^{k} (3x^2 - 2x)\\,\\mathrm{d}x = ' + N) + ', where ' + M('k > 1') + ', find the value of ' + M('k') + '.', 4, M('[x^3 - x^2]_1^k = k^3 - k^2 = ' + N) + '; ' + M('k = ' + k) + ' (the quadratic factor has no real roots)'], ['Find ' + M('\\displaystyle\\int \\frac{(2\\sqrt{x} - 3)^2}{\\sqrt{x}}\\,\\mathrm{d}x') + '.', 4, M('\\int (4x^{\\frac{1}{2}} - 12 + 9x^{-\\frac{1}{2}})\\,\\mathrm{d}x = \\tfrac{8}{3}x^{\\frac{3}{2}} - 12x + 18x^{\\frac{1}{2}} + c')]]);
    },
    function () {
      var a = ri(3, 6), m = ri(1, a - 1); // y = x(a - x) and y = m x : meet at x = 0 and x = a - m
      var X2 = a - m, area = Math.pow(X2, 3) / 6;
      var p = D.plane({ xmin: -0.5, xmax: a + 0.5, ymin: -0.5, ymax: a * a / 4 + 1, w: 300, h: 230 }), f = function (x) { return x * (a - x); }, L = function (x) { return m * x; };
      var sv = p.svg + p.area(f, 0, X2, L) + p.curve(f, 0, a) + p.curve(L, 0, a);
      return Q('The diagram shows the curve ' + M('y = x(' + a + ' - x)') + ' and the line ' + M('y = ' + c1(m, 'x')) + '. The shaded region ' + M('R') + ' is enclosed by the curve and the line.' + D.svg(300, 230, sv, 'Region between curve and line'), [
        ['Find the exact area of ' + M('R') + '.', 5, 'They meet at ' + M('x = 0') + ' and ' + M('x = ' + X2) + '; ' + M('\\int_0^{' + X2 + '} (' + c1(a - m, 'x') + ' - x^2)\\,\\mathrm{d}x = ' + fs(fr(Math.pow(X2, 3), 6)))],
        ['The line ' + M('y = kx') + ' divides ' + M('R') + ' into two regions of equal area. Show that ' + M('(' + a + ' - k)^3 = ' + num(Math.pow(X2, 3) / 2)) + '.', 3, 'Area between curve and ' + M('y = kx') + ' is ' + M('\\frac{(' + a + ' - k)^3}{6}') + ', which must be half of ' + M(fs(fr(Math.pow(X2, 3), 6))) + '.']
      ]);
    }
  ]);

  X('al-explog', [
    function () {
      var a = pick([2, 3]), n = pick([3, 6, 9]), x = Math.pow(a, 2 * n / 3);
      return Q('', [
        ['Solve ' + M('\\log_{' + a + '} x + \\log_{' + (a * a) + '} x = ' + n) + '.', 4, M('\\log_{' + (a * a) + '} x = \\tfrac{1}{2}\\log_{' + a + '} x') + ', so ' + M('\\tfrac{3}{2}\\log_{' + a + '} x = ' + n) + ', ' + M('x = ' + a + '^{' + (2 * n / 3) + '} = ' + num(x))],
        ['Solve ' + M('\\log_2(x + 2) - \\log_2(x - 1) = 2') + '.', 3, M('\\frac{x + 2}{x - 1} = 4 \\Rightarrow x = 2')]
      ]);
    },
    function () {
      var A = 10 * ri(20, 90), k = ri(3, 12) / 100, t1 = ri(3, 8), P1 = Math.round(A * Math.exp(k * t1)), kk = Math.log(P1 / A) / t1, T = Math.round(A * pick([3, 4, 5])), tT = Math.log(T / A) / kk;
      return Q('The number of bacteria, ' + M('P') + ', in a culture is modelled by ' + M('P = Ae^{kt}') + ', where ' + M('t') + ' is the time in hours. Initially there are ' + A + ' bacteria and after ' + t1 + ' hours there are ' + P1 + '.', [
        ['Find the values of ' + M('A') + ' and ' + M('k') + '.', 3, M('A = ' + A + ',\\ k = \\frac{1}{' + t1 + '}\\ln\\frac{' + P1 + '}{' + A + '} = ' + s3(kk))],
        ['Find the time at which the number of bacteria reaches ' + T + '.', 2, M('t = \\frac{\\ln(' + T + '/' + A + ')}{' + s3(kk) + '} = ' + s3(tT)) + ' hours'],
        ['Find the rate at which the number is increasing at that time, and interpret the value of ' + M('k') + '.', 3, M('\\frac{\\mathrm{d}P}{\\mathrm{d}t} = kP = ' + s3(kk * T)) + ' bacteria per hour; ' + M('k') + ' is the rate of growth per bacterium (the proportional growth rate)']
      ]);
    }
  ]);

  /* ================= Year 1 Statistics ================= */
  X('al-sampling', [
    function () {
      var g_ = [ri(150, 400), ri(150, 400), ri(150, 400), ri(50, 150)], N = g_.reduce(function (s, v) { return s + v; }, 0), n = pick([40, 50, 60]);
      var raw = g_.map(function (v) { return v / N * n; }), r = raw.map(Math.round), diff = n - r.reduce(function (s, v) { return s + v; }, 0);
      var fl = raw.map(Math.floor), left = n - fl.reduce(function (s, v) { return s + v; }, 0);
      [0, 1, 2, 3].sort(function (i, j) { return (raw[j] - fl[j]) - (raw[i] - fl[i]); }).slice(0, left).forEach(function (i) { fl[i]++; });
      return Q('A school has ' + g_[0] + ' pupils in Year 10, ' + g_[1] + ' in Year 11, ' + g_[2] + ' in Year 12 and ' + g_[3] + ' in Year 13. A stratified sample of ' + n + ' pupils is required.', [
        ['Calculate the number from each year group, making sure the total is exactly ' + n + '.', 3, M(raw.map(function (v) { return v.toFixed(2); }).join(',\\ ')) + ' rounds to ' + fl.join(', ') + ' (adjusting by the largest remainders so the total is ' + n + ')'],
        ['The head teacher instead asks the first ' + n + ' pupils to arrive at school one morning. Give two reasons why this sample may be biased.', 2, 'Early arrivals may differ systematically (for example, those who travel by bus or live nearby), and year groups may not be represented in proportion; it is not random.'],
        ['Explain how the head teacher could use systematic sampling, and one disadvantage of it here.', 2, 'Number all ' + N + ' pupils, choose a random start from 1 to ' + Math.floor(N / n) + ', then take every ' + ordinal(Math.floor(N / n)) + ' pupil. If the list is ordered by year group, the sample may not reflect each year exactly.']
      ]);
    },
    function () {
      var N = ri(200, 900), n = ri(20, 50);
      return Q('A researcher wants to estimate the mean daily rainfall at a weather station from the ' + N + ' days of records available.', [
        ['Describe how to select a simple random sample of ' + n + ' days.', 2, 'Number the days 1 to ' + N + ', then use a random number generator to choose ' + n + ' different numbers (ignoring repeats).'],
        ['Explain why a sample taken from one month only would not be suitable, and suggest a better sampling method.', 2, 'Rainfall varies with the season, so one month is not representative; use stratified sampling by month.'],
        ['The researcher’s sample mean is much higher than the mean of all the data. Suggest two reasons.', 2, 'Natural sampling variation; the sample may include unusual days (for example storms), or days with missing (n/a) data may have been handled differently.']
      ]);
    }
  ]);

  X('al-location', [
    function () {
      var n = ri(15, 40), a = 10 * ri(2, 9), xs = []; for (var i = 0; i < n; i++) xs.push(a + ri(-12, 15));
      var S1 = xs.reduce(function (s, v) { return s + (v - a); }, 0), S2 = xs.reduce(function (s, v) { return s + (v - a) * (v - a); }, 0);
      var mean = a + S1 / n, sd = Math.sqrt(S2 / n - (S1 / n) * (S1 / n)), extra = a + ri(20, 30), n2 = n + 1, Sx = n * mean + extra, Sxx = S2 + 2 * a * S1 + n * a * a + extra * extra, m2 = Sx / n2, sd2 = Math.sqrt(Sxx / n2 - m2 * m2);
      return Q('For ' + n + ' values of ' + M('x') + ': ' + M('\\sum (x - ' + a + ') = ' + S1) + ' and ' + M('\\sum (x - ' + a + ')^2 = ' + S2) + '.', [
        ['Find the mean and standard deviation of ' + M('x') + '.', 4, 'Mean ' + M(a + ' + \\frac{' + S1 + '}{' + n + '} = ' + s3(mean)) + ', sd ' + M('\\sqrt{\\frac{' + S2 + '}{' + n + '} - \\left(\\frac{' + S1 + '}{' + n + '}\\right)^2} = ' + s3(sd))],
        ['A further value ' + M('x = ' + extra) + ' is added. Find the new mean and standard deviation.', 4, M('\\sum x = ' + num(Sx) + ',\\ \\sum x^2 = ' + num(Sxx)) + '; mean ' + s3(m2) + ', sd ' + s3(sd2)]
      ]);
    },
    function () {
      var n1 = ri(10, 30), m1 = ri(40, 70), s1 = ri(4, 12), n2 = ri(10, 30), m2 = ri(40, 70), s2 = ri(4, 12);
      var S = n1 * (s1 * s1 + m1 * m1) + n2 * (s2 * s2 + m2 * m2), N = n1 + n2, Mn = (n1 * m1 + n2 * m2) / N, sd = Math.sqrt(S / N - Mn * Mn);
      return Q('Group A: ' + n1 + ' values, mean ' + m1 + ', standard deviation ' + s1 + '. Group B: ' + n2 + ' values, mean ' + m2 + ', standard deviation ' + s2 + '.', [
        ['Find ' + M('\\sum x^2') + ' for each group.', 2, M(num(n1 * (s1 * s1 + m1 * m1)) + '\\text{ and }' + num(n2 * (s2 * s2 + m2 * m2)))],
        ['Find the mean and standard deviation of the combined data.', 4, 'Mean ' + M(s3(Mn)) + ', sd ' + M('\\sqrt{\\frac{' + num(S) + '}{' + N + '} - ' + s3(Mn) + '^2} = ' + s3(sd))]
      ]);
    }
  ]);

  X('al-representations', [
    function () {
      var b = [0, 5, 10, 20, 40], f = [ri(4, 12), ri(10, 25), ri(10, 30), ri(4, 16)], w = [5, 5, 10, 20], kH = pick([0.4, 0.5, 0.8, 1.2]);
      // heights proportional to f/w; bar 2 height on drawing is given in cm: height = k f/w, width cm = 0.4 * w
      var hcm = kH * f[1] / w[1], wcm = 0.4 * w[1], hx = kH * f[3] / w[3], wx = 0.4 * w[3];
      return Q('A histogram is drawn to represent the times, in minutes, taken by pupils to complete a task. The bar for the ' + b[1] + '–' + b[2] + ' minute class is ' + num(Math.round(wcm * 100) / 100) + ' cm wide and ' + num(Math.round(hcm * 100) / 100) + ' cm tall, and represents ' + f[1] + ' pupils.', [
        ['The ' + b[3] + '–' + b[4] + ' minute class contains ' + f[3] + ' pupils. Find the width and height of its bar.', 4, 'Width ' + M(num(Math.round(wx * 100) / 100)) + ' cm; height ' + M(num(Math.round(hx * 1000) / 1000)) + ' cm (area is proportional to frequency)'],
        ['Explain why a histogram, rather than a bar chart, is used here.', 1, 'The data are continuous and the classes have unequal widths.']
      ]);
    },
    function () {
      var xs = []; for (var i = 0; i < 11; i++) xs.push(ri(20, 40)); var big = ri(70, 90); xs.push(big); xs.sort(function (a, b) { return a - b; });
      var n = xs.length, S = xs.reduce(function (s, v) { return s + v; }, 0), SS = xs.reduce(function (s, v) { return s + v * v; }, 0);
      var m = S / n, sd = Math.sqrt(SS / n - m * m), m2 = (S - big) / (n - 1), sd2 = Math.sqrt((SS - big * big) / (n - 1) - m2 * m2);
      return Q('Twelve data values have ' + M('\\sum x = ' + S) + ' and ' + M('\\sum x^2 = ' + num(SS)) + '. The largest value is ' + big + '.', [
        ['Find the mean and standard deviation.', 3, M(s3(m)) + ', ' + M(s3(sd))],
        ['An outlier is defined as a value more than 2 standard deviations from the mean. Show that ' + big + ' is an outlier.', 2, M(s3(m) + ' + 2(' + s3(sd) + ') = ' + s3(m + 2 * sd) + ' < ' + big)],
        ['The outlier is removed. Find the new mean and standard deviation, and comment.', 3, M(s3(m2)) + ', ' + M(s3(sd2)) + '; both fall, the standard deviation sharply, because one extreme value has a large effect.']
      ]);
    }
  ]);

  X('al-correlation', [
    function () {
      var a = 10 * ri(2, 8), b = pick([2, 5, 10]), c = 100 * ri(1, 5), p = ri(2, 15) / 2, q = ri(4, 30) / 10 * pick([1, -1]);
      // v = p + q u, u = (x - a)/b, v = y - c  -> y = c + p + q (x - a)/b = (c + p - q a / b) + (q / b) x
      var grad = q / b, inter = c + p - q * a / b, x0 = a + b * ri(2, 6);
      return Q('Data are coded using ' + M('u = \\frac{x - ' + a + '}{' + b + '}') + ' and ' + M('v = y - ' + c) + '. The regression line of ' + M('v') + ' on ' + M('u') + ' is ' + M('v = ' + p + (q < 0 ? ' - ' : ' + ') + Math.abs(q) + 'u') + '.', [
        ['Find the equation of the regression line of ' + M('y') + ' on ' + M('x') + ', in the form ' + M('y = a + bx') + '.', 4, M('y - ' + c + ' = ' + p + (q < 0 ? ' - ' : ' + ') + Math.abs(q) + '\\cdot\\frac{x - ' + a + '}{' + b + '}') + ', so ' + M('y = ' + num(Math.round(inter * 1000) / 1000) + (grad < 0 ? ' - ' : ' + ') + (Math.abs(grad) === 1 ? '' : num(Math.abs(Math.round(grad * 10000) / 10000))) + 'x')],
        ['Estimate ' + M('y') + ' when ' + M('x = ' + x0) + '.', 1, num(Math.round((inter + grad * x0) * 1000) / 1000)],
        ['Explain why the line should not be used to estimate ' + M('x') + ' from a given value of ' + M('y') + '.', 1, 'It is the regression line of ' + M('y') + ' on ' + M('x') + '; it minimises errors in ' + M('y') + ', not in ' + M('x') + '.']
      ]);
    },
    function () {
      var r = pick([0.92, 0.88, -0.85, 0.12, -0.05]), n = ri(8, 15);
      return Q('A researcher records the number of ice creams sold and the number of people treated for sunburn on ' + n + ' summer days. The product moment correlation coefficient is ' + r + '.', [
        ['Interpret this value in context.', 1, Math.abs(r) > 0.7 ? 'Strong ' + (r > 0 ? 'positive' : 'negative') + ' linear correlation between the two variables.' : 'Little or no linear correlation.'],
        ['The researcher concludes that eating ice cream causes sunburn. Criticise this conclusion.', 2, 'Correlation does not imply causation; both are likely to be caused by a third variable, hot sunny weather.'],
        ['Explain how adding a single extreme day could change the value of ' + M('r') + ' a lot.', 1, 'With only ' + n + ' points, one outlier far from the pattern can strongly increase or decrease ' + M('r') + '.']
      ]);
    }
  ]);

  X('al-probability', [
    function () {
      var p = pick([0.2, 0.3, 0.4, 0.5, 0.6]), q = pick([0.25, 0.4, 0.5, 0.75]), u = p + q - p * q;
      // independent: P(A∪B) = p + q - pq ; given q and union, find p
      return Q('Events ' + M('A') + ' and ' + M('B') + ' are independent, with ' + M('P(B) = ' + q) + ' and ' + M('P(A \\cup B) = ' + num(Math.round(u * 10000) / 10000)) + '.', [
        ['Find ' + M('P(A)') + '.', 3, M('p + ' + q + ' - ' + q + 'p = ' + num(Math.round(u * 10000) / 10000)) + ', so ' + M('P(A) = ' + p)],
        ['Find ' + M("P(A' \\cap B)") + ' and ' + M("P(A \\mid B')") + '.', 3, M("P(A' \\cap B) = " + num(Math.round((1 - p) * q * 10000) / 10000)) + '; ' + M("P(A \\mid B') = " + p) + ' (independent)'],
        ['Explain why ' + M('A') + ' and ' + M('B') + ' cannot be mutually exclusive.', 1, M('P(A \\cap B) = ' + num(Math.round(p * q * 10000) / 10000) + ' \\ne 0')]
      ]);
    },
    function () {
      var p = pick([0.3, 0.4, 0.6, 0.7]), qn = 1 - p, k = ri(3, 5);
      var P3 = qn * qn * p, Pwithin = 1 - Math.pow(qn, k);
      return Q('Sam keeps taking a driving test until he passes. The probability that he passes on any attempt is ' + p + ', independently of other attempts.', [
        ['Find the probability that he passes on his third attempt.', 2, M(num(qn) + '^2 \\times ' + p + ' = ' + f4(P3))],
        ['Find the probability that he needs more than ' + k + ' attempts.', 2, M(num(qn) + '^{' + k + '} = ' + f4(Math.pow(qn, k)))],
        ['Find the least number of attempts ' + M('n') + ' for which the probability that he has passed within ' + M('n') + ' attempts exceeds 0.99.', 3, (function () { var n = 1; while (1 - Math.pow(qn, n) <= 0.99) n++; return M('1 - ' + num(qn) + '^n > 0.99') + ', ' + M('n = ' + n); })()]
      ]);
    }
  ]);

  X('al-binomial-dist', [
    function () {
      var p = pick([0.05, 0.1, 0.15, 0.2]), n = 1; while (1 - Math.pow(1 - p, n) <= 0.95) n++;
      var N = ri(20, 40);
      return Q('Each item from a production line is faulty with probability ' + p + ', independently.', [
        ['Find the least number of items that must be checked for the probability of finding at least one faulty item to exceed 0.95.', 3, M('1 - ' + num(1 - p) + '^n > 0.95') + ', so ' + M('n = ' + n)],
        ['A box contains ' + N + ' items. Find the probability that it contains more than ' + Math.round(N * p) + ' faulty item' + (Math.round(N * p) === 1 ? '' : 's') + '.', 2, f4(1 - bcdf(N, p, Math.round(N * p)))],
        ['Ten boxes are checked. Find the probability that exactly two of them contain more than ' + Math.round(N * p) + ' faulty item' + (Math.round(N * p) === 1 ? '' : 's') + '.', 3, (function () { var q = 1 - bcdf(N, p, Math.round(N * p)); return M('\\binom{10}{2}(' + f4(q) + ')^2(' + f4(1 - q) + ')^8 = ' + f4(comb(10, 2) * q * q * Math.pow(1 - q, 8))); })()]
      ]);
    },
    function () {
      var p = pick([0.2, 0.25, 0.3, 0.4]), n = ri(5, 10), P0 = Math.pow(1 - p, n);
      return Q(M('X \\sim \\mathrm{B}(' + n + ',\\ p)') + ' and ' + M('P(X = 0) = ' + f4(P0)) + '.', [
        ['Find the value of ' + M('p') + '.', 2, M('(1 - p)^{' + n + '} = ' + f4(P0)) + ', ' + M('p = ' + p)],
        ['Find ' + M('P(X \\ge 2)') + '.', 2, f4(1 - bcdf(n, p, 1))],
        ['Find the most likely value of ' + M('X') + ', showing your working.', 2, (function () { var best = 0; for (var k = 1; k <= n; k++) if (bpdf(n, p, k) > bpdf(n, p, best)) best = k; return M('X = ' + best) + ' (largest of ' + M('P(X = k)') + ')'; })()]
      ]);
    }
  ]);

  X('al-hypothesis', [
    function () {
      var p = pick([0.1, 0.15, 0.2, 0.25]), lev = 0.05, n = 1; while (Math.pow(1 - p, n) >= lev) n++;
      return Q('A company claims that ' + (p * 100) + '% of its customers use a loyalty card. A manager believes the proportion is lower. She will survey ' + M('n') + ' customers and test ' + M('H_0: p = ' + p) + ' against ' + M('H_1: p < ' + p) + ' at the 5% level.', [
        ['Find the smallest value of ' + M('n') + ' for which the result “no customers use a card” would lead to rejecting ' + M('H_0') + '.', 3, M(num(1 - p) + '^n < 0.05') + ', so ' + M('n = ' + n)],
        ['With ' + M('n = 40') + ', find the critical region and the actual significance level.', 3, (function () { var k = -1; while (bcdf(40, p, k + 1) <= 0.05) k++; return k < 0 ? 'No critical region at 5%' : M('X \\le ' + k) + ', actual significance ' + f4(bcdf(40, p, k)); })()]
      ]);
    },
    function () {
      var p0 = pick([0.3, 0.4, 0.5]), n = pick([20, 25, 30]), x = Math.round(n * p0) + ri(3, 6), pv = 1 - bcdf(n, p0, x - 1);
      return Q('A coin-operated game is meant to pay out with probability ' + p0 + '. In ' + n + ' plays it pays out ' + x + ' times. A test of ' + M('H_0: p = ' + p0) + ' against ' + M('H_1: p > ' + p0) + ' is carried out.', [
        ['Find the ' + M('p') + '-value of the test.', 2, M('P(X \\ge ' + x + ') = ' + f4(pv))],
        ['Find the smallest significance level, to the nearest whole percent above the ' + M('p') + '-value, at which ' + M('H_0') + ' would be rejected, and state the conclusion at the 5% level.', 3, Math.ceil(pv * 100) + '%; at 5%: ' + (pv < 0.05 ? 'reject ' + M('H_0') + ', evidence the pay-out probability is higher' : 'do not reject ' + M('H_0') + ', insufficient evidence')]
      ]);
    }
  ]);

  X('al-lds', [
    function () {
      var mean = ri(80, 130) / 10, sd = ri(25, 50) / 10, lo = mean - sd, hi = mean + sd;
      function bf(k) { return k < 1 ? 'Calm' : k <= 10 ? 'Light' : k <= 16 ? 'Moderate' : k <= 21 ? 'Fresh' : 'Strong'; }
      return Q('Using the large data set, a student finds that the daily mean windspeed at Leuchars in 2015 had mean ' + mean + ' knots and standard deviation ' + sd + ' knots.', [
        ['Find the range of windspeeds within one standard deviation of the mean, and give the Beaufort descriptions they cover.', 3, M(s3(lo) + '\\text{ to }' + s3(hi)) + ' knots: ' + (bf(lo) === bf(hi) ? bf(lo) : bf(lo) + ' to ' + bf(hi))],
        ['Explain why the student cannot use the large data set to compare this with the daily mean windspeed in Perth in December.', 1, 'The large data set only covers May to October.'],
        ['Explain why the student should not simply convert the Beaufort descriptions back into knots to find the mean.', 1, 'Each description covers a range of windspeeds, so the exact values are lost.']
      ]);
    },
    function () {
      var n = ri(20, 31), tr = ri(3, 8), na = ri(1, 3), wet = ri(5, n - tr - na - 2), dry = n - tr - na - wet, mm = Math.round(wet * ri(30, 90) / 10 * 10) / 10;
      return Q('A student looks at the daily total rainfall for ' + n + ' consecutive days at Heathrow in the large data set. ' + dry + ' days have 0 mm, ' + tr + ' days are recorded as "tr", ' + na + ' days are "n/a", and the remaining ' + wet + ' days have a total of ' + mm + ' mm.', [
        ['Calculate the mean daily rainfall, explaining how you treat "tr" and "n/a".', 3, '"tr" counts as 0 and "n/a" is excluded: ' + M('\\frac{' + mm + '}{' + (n - na) + '} = ' + s3(mm / (n - na))) + ' mm'],
        ['The student says the proportion of wet days is ' + M(F(wet, n)) + '. Explain the mistakes and give the correct proportion, treating a trace as a wet day.', 3, 'The "n/a" days should be excluded and a trace day is wet if wet means any rain: ' + M('\\frac{' + (wet + tr) + '}{' + (n - na) + '}' + (gcd(wet + tr, n - na) > 1 ? ' = ' + F(wet + tr, n - na) : ''))]
      ]);
    }
  ]);

  /* ================= Year 1 Mechanics ================= */
  X('al-suvat', [
    function () {
      var u, h, t, yA, va; do { u = ri(10, 25); h = ri(20, 60); t = h / u; yA = u * t - 4.9 * t * t; va = u - G * t; } while (yA <= 1);
      return Q('A ball ' + M('A') + ' is thrown vertically upwards with speed ' + u + ' m s⁻¹ from ground level. At the same instant, a ball ' + M('B') + ' is dropped from rest from a point ' + h + ' m directly above.', [
        ['Show that the balls meet ' + M('\\frac{' + h + '}{' + u + '}') + ' seconds later, and find the height at which they meet.', 5, M(u + 't - 4.9t^2 = ' + h + ' - 4.9t^2 \\Rightarrow t = \\frac{' + h + '}{' + u + '}') + '; height ' + M('= ' + s3(yA)) + ' m' + (yA < 0 ? ' (negative: A has already landed, so they do not meet in the air)' : '')],
        ['Find the velocity of ' + M('A') + ' at that moment, stating its direction.', 2, Math.abs(va) < 1e-6 ? '0 m s⁻¹: ' + M('A') + ' is instantaneously at rest at its highest point' : M(s3(Math.abs(va))) + ' m s⁻¹ ' + (va > 0 ? 'upwards' : 'downwards')]
      ]);
    },
    function () {
      var u = ri(15, 30), h = ri(5, Math.floor(u * u / (2 * G)) - 2);
      var disc = u * u - 2 * G * h, t1 = (u - Math.sqrt(disc)) / G, t2 = (u + Math.sqrt(disc)) / G;
      return Q('A stone is projected vertically upwards from ground level with speed ' + u + ' m s⁻¹.', [
        ['Find the length of time for which the stone is more than ' + h + ' m above the ground.', 5, M('4.9t^2 - ' + u + 't + ' + h + ' < 0') + ' between ' + M('t = ' + s3(t1)) + ' and ' + M(s3(t2)) + ': ' + M(s3(t2 - t1)) + ' s'],
        ['Find the speed of the stone when it is ' + h + ' m above the ground.', 2, M('\\sqrt{' + u + '^2 - 2(9.8)(' + h + ')} = ' + s3(Math.sqrt(disc))) + ' m s⁻¹']
      ]);
    }
  ]);

  X('al-forces', [
    function () {
      var mA = ri(2, 6), mB = ri(1, 4), T0 = ri(2, 4), h = ri(1, 3) * 0.5 + 0.5, a = mB * G / (mA + mB), v = a * T0, s = 0.5 * a * T0 * T0, d = ri(2, 5);
      return Q('Particle ' + M('A') + ' of mass ' + mA + ' kg lies on a smooth horizontal table, ' + num(Math.round((s + d) * 10) / 10) + ' m from a smooth pulley at the edge. It is connected by a light inextensible string to particle ' + M('B') + ' of mass ' + mB + ' kg hanging freely. The system is released from rest. After ' + T0 + ' s the string breaks.', [
        ['Find the acceleration of the system and the speed of ' + M('A') + ' when the string breaks.', 4, M('a = \\frac{' + mB + 'g}{' + (mA + mB) + '} = ' + s3(a)) + ' m s⁻²; speed ' + M(s3(v)) + ' m s⁻¹'],
        ['Find the total time from release until ' + M('A') + ' reaches the pulley.', 4, 'Distance before breaking ' + M(s3(s)) + ' m; then constant speed for ' + d + ' m: ' + M(T0 + ' + \\frac{' + d + '}{' + s3(v) + '} = ' + s3(T0 + d / v)) + ' s']
      ]);
    },
    function () {
      var mL = 100 * ri(4, 9), mP = ri(50, 90), a = ri(1, 15) / 10 * pick([1, -1]), T = (mL + mP) * (G + a), R = mP * (G + a);
      return Q('A lift of mass ' + mL + ' kg carries a person of mass ' + mP + ' kg. The lift is moving upwards with ' + (a > 0 ? 'acceleration' : 'deceleration') + ' ' + Math.abs(a) + ' m s⁻².', [
        ['Find the tension in the lift cable.', 3, M('T - ' + (mL + mP) + 'g = ' + (mL + mP) + '(' + a + ')') + ', ' + M('T = ' + s3(T)) + ' N'],
        ['Find the force exerted by the person on the floor of the lift, and explain which Newton’s law you used.', 3, M(s3(R)) + ' N downwards; Newton’s third law (equal and opposite to the reaction on the person)'],
        ['The cable can withstand a tension of at most ' + Math.round(T * 1.2) + ' N. Find the greatest upward acceleration possible.', 2, M(s3(Math.round(T * 1.2) / (mL + mP) - G)) + ' m s⁻²']
      ]);
    }
  ]);

  X('al-variable-acc', [
    function () {
      var p = ri(1, 3), q = p + ri(1, 3), T = q + ri(1, 3); // v = (t - p)(t - q)
      var Fn = function (t) { return t * t * t / 3 - (p + q) * t * t / 2 + p * q * t; };
      var dist = Math.abs(Fn(p) - Fn(0)) + Math.abs(Fn(q) - Fn(p)) + Math.abs(Fn(T) - Fn(q)), disp = Fn(T) - Fn(0);
      return Q('A particle moves in a straight line. Its velocity at time ' + M('t') + ' s is ' + M('v = ' + poly([1, -(p + q), p * q], 't')) + ' m s⁻¹.', [
        ['Find the times when the particle is at instantaneous rest, and its acceleration at those times.', 3, M('t = ' + p + ',\\ a = ' + (2 * p - p - q)) + '; ' + M('t = ' + q + ',\\ a = ' + (2 * q - p - q)) + ' (m s⁻²)'],
        ['Find the total distance travelled and the displacement in the first ' + T + ' seconds.', 5, 'Distance ' + M(s3(dist)) + ' m (split at ' + M('t = ' + p) + ' and ' + M('t = ' + q) + '); displacement ' + M(s3(disp)) + ' m']
      ]);
    },
    function () {
      var k = ri(2, 6), c = ri(1, 5);
      // a = 6t - 2k ; v = 3t^2 - 2k t + c ... choose s = t^3 - k t^2 + c t ; returns to origin when t^2 - k t + c = 0
      var disc = k * k - 4 * c;
      while (disc < 0) { k++; disc = k * k - 4 * c; }
      return Q('A particle starts from the origin ' + M('O') + ' with velocity ' + c + ' m s⁻¹. Its acceleration at time ' + M('t') + ' s is ' + M('(6t - ' + (2 * k) + ')') + ' m s⁻².', [
        ['Find an expression for its displacement ' + M('s') + ' from ' + M('O') + ' at time ' + M('t') + '.', 4, M('v = 3t^2 - ' + (2 * k) + 't + ' + c) + ', ' + M('s = t^3 - ' + k + 't^2 + ' + c + 't')],
        ['Find the times, after the start, when the particle is at ' + M('O') + '.', 3, M('t(t^2 - ' + k + 't + ' + c + ') = 0') + ': ' + (disc === 0 ? M('t = ' + num(k / 2)) : M('t = \\frac{' + k + ' \\pm \\sqrt{' + disc + '}}{2}') + ', i.e. ' + s3((k - Math.sqrt(disc)) / 2) + ' s and ' + s3((k + Math.sqrt(disc)) / 2) + ' s')]
      ]);
    }
  ]);

  /* ================= Year 2 Pure ================= */
  X('a2-proof', [
    function () {
      var P = pick([
        ['Prove by contradiction that ' + M('\\log_2 3') + ' is irrational.', 'Assume ' + M('\\log_2 3 = \\frac{p}{q}') + ' with integers ' + M('p, q > 0') + '. Then ' + M('2^p = 3^q') + ': the left side is even and the right side is odd, a contradiction.'],
        ['Prove by contradiction that there are no positive integers ' + M('x') + ' and ' + M('y') + ' with ' + M('x^2 - y^2 = 1') + '.', 'Assume they exist: ' + M('(x - y)(x + y) = 1') + ', so ' + M('x - y = x + y = 1') + ', giving ' + M('y = 0') + ', which is not positive.'],
        ['Prove by contradiction that if ' + M('n^2') + ' is a multiple of 3 then ' + M('n') + ' is a multiple of 3.', 'Assume ' + M('n = 3k \\pm 1') + ': ' + M('n^2 = 9k^2 \\pm 6k + 1') + ', which is not a multiple of 3, a contradiction.'],
        ['Prove by contradiction that ' + M('\\sqrt{3}') + ' is irrational.', 'Assume ' + M('\\sqrt{3} = \\frac{a}{b}') + ' in lowest terms: ' + M('a^2 = 3b^2') + ', so 3 divides ' + M('a') + '; then 3 divides ' + M('b') + ', a contradiction.']]);
      return Q('', [[P[0], 5, P[1]]]);
    },
    function () {
      var k = pick([1, 2]), n = ri(10, 50);
      // 1/(r(r+2)) = 1/2 (1/r - 1/(r+2)) ; sum r=1..n = 1/2 (1 + 1/2 - 1/(n+1) - 1/(n+2))
      var S = fr(3 * (n + 1) * (n + 2) - 2 * (n + 2) - 2 * (n + 1), 4 * (n + 1) * (n + 2));
      return Q('', [
        ['Express ' + M('\\frac{2}{r(r + 2)}') + ' in partial fractions.', 2, M('\\frac{1}{r} - \\frac{1}{r + 2}')],
        ['Hence find ' + M('\\displaystyle\\sum_{r=1}^{' + n + '} \\frac{1}{r(r + 2)}') + ' as a single fraction.', 4, 'Most terms cancel: ' + M('\\tfrac{1}{2}\\left(1 + \\tfrac{1}{2} - \\tfrac{1}{' + (n + 1) + '} - \\tfrac{1}{' + (n + 2) + '}\\right) = ' + fs(S))],
        ['Find the limit of the sum as the number of terms tends to infinity.', 1, M('\\frac{3}{4}')]
      ]);
    }
  ]);

  X('a2-functions', [
    function () {
      var a = ri(2, 8), b = ri(1, 4), m = pick([1, 2]), c = ri(1, 4); // f(x) = |2x - a| - b ; solve f(x) = (1/m) x ... keep: f(x) = c
      var x1 = fr(a + b + c, 2), x2 = fr(a - b - c, 2);
      return Q(M('\\mathrm{f}(x) = |2x - ' + a + '| - ' + b) + ', ' + M('x \\in \\mathbb{R}') + '.', [
        ['Sketch ' + M('y = \\mathrm{f}(x)') + ', giving the coordinates of the vertex and the ' + M('y') + '-intercept, and state the range of ' + M('\\mathrm{f}') + '.', 4, 'Vertex ' + M(pt(F(a, 2), -b)) + ', ' + M('y') + '-intercept ' + M(pt(0, a - b)) + '; range ' + M('\\mathrm{f}(x) \\ge -' + b)],
        ['Solve ' + M('\\mathrm{f}(x) = ' + c) + '.', 2, M('x = ' + fs(x2) + '\\text{ or } x = ' + fs(x1))],
        ['Find the set of values of ' + M('k') + ', with ' + M('k > 0') + ', for which ' + M('\\mathrm{f}(x) = kx') + ' has exactly one solution.', 3, 'The line ' + M('y = kx') + ' always meets the left branch (gradient ' + M('-2') + '). It meets the right branch, ' + M('y = 2x - ' + (a + b)) + ', only if it is less steep: ' + M('x = \\frac{' + (a + b) + '}{2 - k}') + ' needs ' + M('k < 2') + '. So exactly one solution when ' + M('k \\ge 2') + '.']
      ]);
    },
    function () {
      var a = ri(2, 5), b = ri(1, 6);
      // f(x) = e^{a x} + b (x real) ; g(x) = ln(x - b) for x > b ; fg(x) = (x - b)^a + b ; f^{-1}(x) = ln(x - b)/a
      return Q(M('\\mathrm{f}(x) = e^{' + a + 'x} + ' + b) + ', ' + M('x \\in \\mathbb{R}') + ', and ' + M('\\mathrm{g}(x) = \\ln(x - ' + b + ')') + ', ' + M('x > ' + b) + '.', [
        ['Find ' + M('\\mathrm{fg}(x)') + ' in its simplest form, and state its domain and range.', 3, M('\\mathrm{fg}(x) = (x - ' + b + ')^{' + a + '} + ' + b) + ', domain ' + M('x > ' + b) + ', range ' + M('\\mathrm{fg}(x) > ' + b)],
        ['Solve ' + M('\\mathrm{gf}(x) = ' + (2 * a)) + '.', 2, M('\\mathrm{gf}(x) = ' + a + 'x') + ' so ' + M('x = 2')],
        ['Find ' + M('\\mathrm{f}^{-1}(x)') + ' and solve ' + M('\\mathrm{f}^{-1}(x) = 1') + '.', 3, M('\\mathrm{f}^{-1}(x) = \\frac{1}{' + a + '}\\ln(x - ' + b + ')') + '; ' + M('x = e^{' + a + '} + ' + b)]
      ]);
    }
  ]);

  X('a2-sequences', [
    function () {
      var a = pick([2, 3, 4]), b = pick([1, 2, 3]);
      // series 1 + (a x - b) + (a x - b)^2 + ... ; converge when |a x - b| < 1 -> (b - 1)/a < x < (b + 1)/a ; sum = 1/(1 - a x + b)
      var xs = fr((b + 1) * 2 - 1, 2 * a); // a value inside: x = (2b+1)/(2a)
      return Q('A geometric series is ' + M('1 + (' + a + 'x - ' + b + ') + (' + a + 'x - ' + b + ')^2 + (' + a + 'x - ' + b + ')^3 + \\cdots') + '.', [
        ['Find the set of values of ' + M('x') + ' for which the series converges.', 3, M('|' + a + 'x - ' + b + '| < 1 \\Rightarrow ' + fs(fr(b - 1, a)) + ' < x < ' + fs(fr(b + 1, a)))],
        ['Find the sum to infinity in terms of ' + M('x') + ', and its value when ' + M('x = ' + fs(xs)) + '.', 3, M('S_\\infty = \\frac{1}{' + (1 + b) + ' - ' + a + 'x}') + '; ' + M('= ' + fs(fr(1 * xs[1], (1 + b) * xs[1] - a * xs[0])))]
      ]);
    },
    function () {
      var a = ri(2, 6), r = pick([2, 3]), d = a * (r - 1);
      // AP first term a, common difference d ; its 1st, 2nd and 4th terms? use: terms 1, 2, 5 form GP when d = 2a (1, 3, 9) ... generic: a, a + d, a + 4d GP -> (a+d)^2 = a(a+4d) -> d = 2a, r = 3
      var D = 2 * a, n = ri(10, 30), S = n * (2 * a + (n - 1) * D) / 2;
      return Q('The first, second and fifth terms of an arithmetic sequence with first term ' + a + ' and common difference ' + M('d \\ne 0') + ' form the first three terms of a geometric sequence.', [
        ['Show that ' + M('d = ' + (2 * a)) + ' and find the common ratio of the geometric sequence.', 4, M('(' + a + ' + d)^2 = ' + a + '(' + a + ' + 4d) \\Rightarrow d^2 = ' + (2 * a) + 'd') + ', so ' + M('d = ' + (2 * a)) + '; terms ' + a + ', ' + (3 * a) + ', ' + (9 * a) + ', ratio 3'],
        ['Find the sum of the first ' + n + ' terms of the arithmetic sequence.', 2, num(S)],
        ['Find the least ' + M('n') + ' for which the sum of the first ' + M('n') + ' terms of the geometric sequence exceeds ' + num(1000000) + '.', 3, (function () { var k = 1; while (a * (Math.pow(3, k) - 1) / 2 <= 1e6) k++; return M('\\frac{' + a + '(3^n - 1)}{2} > 10^6') + ', ' + M('n = ' + k); })()]
      ]);
    }
  ]);

  X('a2-binomial', [
    function () {
      var c = pick([2, 3, 4]);
      // (1 + x)/sqrt(1 - c x) = (1 + x)(1 + (c/2) x + (3c^2/8) x^2 + ...)
      var a1 = fr(c, 2), a2 = fr(3 * c * c, 8), t1 = [a1[0] + a1[1], a1[1]], t2 = [a2[0] * a1[1] + a1[0] * a2[1], a1[1] * a2[1]];
      t1 = fr(t1[0], t1[1]); t2 = fr(t2[0], t2[1]);
      return Q('', [
        ['Find the first three terms, in ascending powers of ' + M('x') + ', of ' + M('\\frac{1 + x}{\\sqrt{1 - ' + c + 'x}}') + '.', 5, M('(1 + x)\\left(1 + ' + fx(a1, 'x') + ' + ' + fx(a2, 'x^2') + ' + \\ldots\\right) = 1 + ' + fx(t1, 'x') + ' + ' + fx(t2, 'x^2'))],
        ['State the range of values of ' + M('x') + ' for which the expansion is valid.', 1, M('|x| < ' + F(1, c))],
        ['By choosing a suitable value of ' + M('x') + ', use your expansion to estimate ' + M('\\sqrt{2}') + ', and explain your choice.', 3, (function () { var x = fr(1, 2 * c); var val = (1 + x[0] / x[1]) / Math.sqrt(1 - c * x[0] / x[1]); var est = 1 + t1[0] / t1[1] * x[0] / x[1] + t2[0] / t2[1] * Math.pow(x[0] / x[1], 2); return M('x = ' + fs(x)) + ' makes ' + M('1 - ' + c + 'x = \\tfrac{1}{2}') + ' (inside the range): ' + M('\\frac{1 + ' + fs(x) + '}{\\sqrt{1/2}} = ' + fs([x[1] + x[0], x[1]]) + '\\sqrt{2} \\approx ' + est.toFixed(4)) + ', so ' + M('\\sqrt{2} \\approx ' + (est * x[1] / (x[1] + x[0])).toFixed(4)); })()]
      ]);
    },
    function () {
      var n = pick([-2, -3]), k = pick([2, 3]);
      var c = [1, n * k, n * (n - 1) / 2 * k * k, n * (n - 1) * (n - 2) / 6 * k * k * k];
      return Q('', [
        ['Find the coefficient of ' + M('x^3') + ' in the expansion of ' + M('\\frac{1 - x}{(1 + ' + k + 'x)^{' + (-n) + '}}') + '.', 4, M(c[3] + (c[2] < 0 ? ' + ' + (-c[2]) : ' - ' + c[2]) + ' = ' + (c[3] - c[2]))],
        ['Explain why the expansion is not valid for ' + M('x = ' + F(1, k)) + '.', 1, 'It is valid only for ' + M('|x| < ' + F(1, k)) + '.']
      ]);
    }
  ]);

  X('a2-radians', [
    function () {
      // segment with area a quarter of the circle: theta - sin theta = pi/2
      var f = function (t) { return t - Math.sin(t) - Math.PI / 2; }, t = 2.3; for (var i = 0; i < 8; i++) t = t - f(t) / (1 - Math.cos(t));
      var r = ri(4, 12);
      return Q('A chord ' + M('AB') + ' of a circle with centre ' + M('O') + ' and radius ' + r + ' cm subtends an angle ' + M('\\theta') + ' radians at ' + M('O') + '. The minor segment cut off by ' + M('AB') + ' has area equal to one quarter of the area of the circle.', [
        ['Show that ' + M('\\theta - \\sin\\theta = \\frac{\\pi}{2}') + '.', 3, M('\\tfrac{1}{2}r^2(\\theta - \\sin\\theta) = \\tfrac{1}{4}\\pi r^2') + '.'],
        ['Use the Newton–Raphson method with ' + M('\\theta_0 = 2') + ' to find ' + M('\\theta') + ' correct to 3 decimal places.', 4, M('\\theta_{n+1} = \\theta_n - \\frac{\\theta_n - \\sin\\theta_n - \\frac{\\pi}{2}}{1 - \\cos\\theta_n}') + ', ' + M('\\theta = ' + t.toFixed(3))],
        ['Find the length of the chord ' + M('AB') + '.', 2, M('2(' + r + ')\\sin\\frac{\\theta}{2} = ' + s3(2 * r * Math.sin(t / 2))) + ' cm']
      ]);
    },
    function () {
      var P = pick([
        ['\\frac{1 - \\cos 2\\theta}{\\theta\\tan\\theta}', '\\frac{1 - (1 - 2\\theta^2)}{\\theta \\cdot \\theta} = 2', 2],
        ['\\frac{\\sin 3\\theta \\tan 2\\theta}{1 - \\cos\\theta}', '\\frac{3\\theta \\cdot 2\\theta}{\\tfrac{1}{2}\\theta^2} = 12', 12],
        ['\\frac{\\theta\\sin\\theta}{1 - \\cos 4\\theta}', '\\frac{\\theta^2}{8\\theta^2} = \\frac{1}{8}', 0.125]]);
      var th = 0.1, val = (function () { var t = th; if (P[2] === 2) return (1 - Math.cos(2 * t)) / (t * Math.tan(t)); if (P[2] === 12) return Math.sin(3 * t) * Math.tan(2 * t) / (1 - Math.cos(t)); return t * Math.sin(t) / (1 - Math.cos(4 * t)); })();
      return Q('', [
        ['Use small-angle approximations to find the limit of ' + M(P[0]) + ' as ' + M('\\theta \\to 0') + '.', 4, M(P[1])],
        ['Evaluate the expression when ' + M('\\theta = 0.1') + ' and find the percentage error in the approximation.', 2, M(val.toFixed(5)) + '; error ' + M(dp(Math.abs(P[2] - val) / val * 100, 2)) + '%']
      ]);
    }
  ]);

  X('a2-trigfn', [
    function () {
      var E = pick([
        ['2\\tan^2 x + \\sec x = 1', '(2\\sec x + 3)(\\sec x - 1) = 0', [0, 2.30, 3.98], '\\cos x = 1\\text{ or } -\\tfrac{2}{3}'],
        ['3\\csc^2 x = 4 + \\cot x', '(3\\cot x - 1)\\ldots', null, ''],
        ['\\sec^2 x - 3\\tan x + 1 = 0', '(\\tan x - 1)(\\tan x - 2) = 0', [0.785, 1.107, 3.927, 4.249], '\\tan x = 1\\text{ or } 2']]);
      if (!E[2]) E = ['\\cot^2 x + 5 = 4\\csc x', '\\csc^2 x - 4\\csc x + 4 = 0 \\Rightarrow (\\csc x - 2)^2 = 0', [0.524, 2.618], '\\sin x = \\tfrac{1}{2}'];
      return Q('', [['Solve ' + M(E[0]) + ' for ' + M('0 \\le x < 2\\pi') + ', giving answers to 3 decimal places where appropriate.', 6, M(E[1]) + ', ' + M(E[3]) + ': ' + M('x = ' + E[2].map(function (v) { return v.toFixed(3); }).join(',\\ '))]]);
    },
    function () {
      var k = ri(2, 5);
      return Q('', [
        ['Prove that ' + M('\\frac{\\csc x}{\\csc x - \\sin x} \\equiv \\sec^2 x') + '.', 4, M('\\frac{1/\\sin x}{(1 - \\sin^2 x)/\\sin x} = \\frac{1}{\\cos^2 x}')],
        ['Hence solve ' + M('\\frac{\\csc x}{\\csc x - \\sin x} = ' + k) + ' for ' + M('0 < x < \\pi') + ', giving answers to 3 significant figures.', 3, M('\\cos^2 x = \\frac{1}{' + k + '}') + ': ' + M('x = ' + s3(Math.acos(1 / Math.sqrt(k))) + ',\\ ' + s3(Math.PI - Math.acos(1 / Math.sqrt(k))))],
        ['Given that ' + M('y = \\arcsin x') + ', show that ' + M('\\cos y = \\sqrt{1 - x^2}') + ' and hence find the exact value of ' + M('\\cos(\\arcsin \\tfrac{1}{' + k + '})') + '.', 3, M('\\sin y = x,\\ \\cos y \\ge 0 \\text{ on } [-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}]') + '; ' + M('\\frac{\\sqrt{' + (k * k - 1) + '}}{' + k + '}')]
      ]);
    }
  ]);

  X('a2-trigadd', [
    function () {
      var t = pick([[3, 4], [5, 12], [8, 15], [7, 24]]), a = t[0], b = t[1], R = Math.hypot(a, b), c = R + ri(2, 8), al = deg(Math.atan2(b, a));
      return Q('', [
        ['Express ' + M(a + '\\cos\\theta + ' + b + '\\sin\\theta') + ' in the form ' + M('R\\cos(\\theta - \\alpha)') + ', ' + M('0 < \\alpha < 90^\\circ') + '.', 3, M('R = ' + R + ',\\ \\alpha = ' + al.toFixed(2) + '^\\circ')],
        ['Find the maximum and minimum values of ' + M('\\frac{1}{' + c + ' + ' + a + '\\cos\\theta + ' + b + '\\sin\\theta}') + ' and the values of ' + M('\\theta') + ' in ' + M('[0, 360^\\circ)') + ' at which they occur.', 5, 'Maximum ' + M(F(1, c - R)) + ' at ' + M('\\theta = ' + ((al + 180) % 360).toFixed(2) + '^\\circ') + '; minimum ' + M(F(1, c + R)) + ' at ' + M('\\theta = ' + al.toFixed(2) + '^\\circ')]
      ]);
    },
    function () {
      return Q('', [
        ['Show that ' + M('\\sin 3x \\equiv 3\\sin x - 4\\sin^3 x') + '.', 4, M('\\sin(2x + x) = 2\\sin x\\cos^2 x + (1 - 2\\sin^2 x)\\sin x = 3\\sin x - 4\\sin^3 x')],
        ['Hence solve ' + M('\\sin 3x = 2\\sin x') + ' for ' + M('0 \\le x < 360^\\circ') + '.', 4, M('\\sin x(1 - 4\\sin^2 x) = 0') + ': ' + M('x = 0^\\circ, 30^\\circ, 150^\\circ, 180^\\circ, 210^\\circ, 330^\\circ')],
        ['Find the exact value of ' + M('\\sin^3 15^\\circ') + ' using ' + M('\\sin 45^\\circ') + '.', 2, M('4\\sin^3 15^\\circ = 3\\sin 15^\\circ - \\sin 45^\\circ') + ', with ' + M('\\sin 15^\\circ = \\frac{\\sqrt{6} - \\sqrt{2}}{4}') + ': ' + M('\\sin^3 15^\\circ = \\frac{3(\\sqrt{6} - \\sqrt{2}) - 2\\sqrt{2}}{16} = \\frac{3\\sqrt{6} - 5\\sqrt{2}}{16}')]
      ]);
    }
  ]);

  X('a2-parametric', [
    function () {
      var a = ri(1, 3), T = ri(1, 3); // x = t^2, y = a t (T^2... ) area under curve for x from 0 to T^2 with y = a(t^3?) use y = a t (T - t)?
      // x = t^2 (t >= 0), y = a t (2 - t)... area = ∫_0^2 a t (2 - t) * 2t dt = 2a ∫ (2t^2 - t^3) dt = 2a (16/3 - 4) = 8a/3
      var area = fr(8 * a, 3);
      var p = D.plane({ xmin: -0.3, xmax: 4.5, ymin: -0.3, ymax: a + 0.6, w: 300, h: 220 });
      var d = ''; for (var i = 0; i <= 100; i++) { var tt = 2 * i / 100; d += (i ? 'L' : 'M') + p.X(tt * tt).toFixed(1) + ',' + p.Y(a * tt * (2 - tt)).toFixed(1); }
      var sv = p.svg + D.path(d + 'Z', 'shade') + D.path(d, 'curve');
      return Q('The curve ' + M('C') + ' has parametric equations ' + M('x = t^2,\\ y = ' + c1(a, 't(2 - t)')) + ', ' + M('0 \\le t \\le 2') + '. The region ' + M('R') + ' is enclosed by ' + M('C') + ' and the ' + M('x') + '-axis.' + D.svg(300, 220, sv, 'Parametric curve and region'), [
        ['Show that the area of ' + M('R') + ' is given by ' + M('\\int_0^2 ' + (2 * a) + '(2t^2 - t^3)\\,\\mathrm{d}t') + ' and find it.', 5, M('\\int y\\,\\frac{\\mathrm{d}x}{\\mathrm{d}t}\\,\\mathrm{d}t = \\int_0^2 ' + c1(a, 't') + '(2 - t)(2t)\\,\\mathrm{d}t = ' + fs(area))],
        ['Find the coordinates of the highest point of ' + M('C') + '.', 2, M('\\frac{\\mathrm{d}y}{\\mathrm{d}t} = ' + c1(2 * a, '') + '(1 - t) = 0 \\Rightarrow t = 1') + ': ' + M(pt(1, a))]
      ]);
    },
    function () {
      var a = ri(1, 3), t0 = nz(-2, 2);
      // x = a t^2, y = 2 a t (parabola y^2 = 4 a x). normal at t0 meets the curve again at t1 = -t0 - 2/t0
      var t1 = fr(-t0 * t0 - 2, t0), P1 = [a * t1[0] * t1[0], t1[1] * t1[1]], P1y = fr(2 * a * t1[0], t1[1]);
      return Q('The curve ' + M('C') + ' has parametric equations ' + M('x = ' + c1(a, 't^2') + ',\\ y = ' + (2 * a) + 't') + '. The point ' + M('P') + ' on ' + M('C') + ' has parameter ' + M('t = ' + t0) + '.', [
        ['Show that the normal to ' + M('C') + ' at ' + M('P') + ' has equation ' + M('y' + tc(t0, 'x') + ' = ' + (2 * a * t0 + a * t0 * t0 * t0)) + '.', 4, 'Gradient of tangent ' + M('\\frac{1}{t}') + ', normal gradient ' + M('-t') + ': ' + M('y' + sg(-2 * a * t0) + ' = ' + c1(-t0, '(x - ' + (a * t0 * t0) + ')'))],
        ['The normal meets ' + M('C') + ' again at ' + M('Q') + '. Find the coordinates of ' + M('Q') + '.', 4, 'Substitute: ' + M(c1(a * t0, 't^2') + ' + ' + (2 * a) + 't' + sg(-(2 * a * t0 + a * t0 * t0 * t0)) + ' = 0') + ', other root ' + M('t = ' + fs(t1)) + ': ' + M('Q' + pt(fs(fr(P1[0], P1[1])), fs(P1y)))]
      ]);
    }
  ]);

  X('a2-differentiation', [
    function () {
      var k = pick([3, 12, 27, 48]);
      // x^2 + xy + y^2 = k : dy/dx = -(2x + y)/(x + 2y) ; horizontal tangents where y = -2x : x^2 - 2x^2 + 4x^2 = 3x^2 = k
      var x = Math.sqrt(k / 3);
      return Q('The curve ' + M('C') + ' has equation ' + M('x^2 + xy + y^2 = ' + k) + '.', [
        ['Find ' + M('\\frac{\\mathrm{d}y}{\\mathrm{d}x}') + ' in terms of ' + M('x') + ' and ' + M('y') + '.', 3, M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = -\\frac{2x + y}{x + 2y}')],
        ['Find the coordinates of the points on ' + M('C') + ' where the tangent is parallel to the ' + M('x') + '-axis.', 4, M('y = -2x') + ': ' + M('3x^2 = ' + k) + ', so ' + M(pt(x, -2 * x) + ',\\ ' + pt(-x, 2 * x))],
        ['Find the coordinates of the points where the tangent is parallel to the ' + M('y') + '-axis.', 2, M('x = -2y') + ': ' + M(pt(-2 * x, x) + ',\\ ' + pt(2 * x, -x))]
      ]);
    },
    function () {
      var H = ri(10, 30), Rr = ri(4, 12), Q_ = ri(2, 9), h = ri(3, H - 2);
      // conical tank vertex down: r = (R/H) h, V = (1/3) pi (R/H)^2 h^3 ; dV/dt = Q ; dh/dt = Q / (pi (R/H)^2 h^2)
      var dhdt = Q_ / (Math.PI * Math.pow(Rr / H, 2) * h * h);
      return Q('Water is poured at a constant rate of ' + Q_ + ' cm³ s⁻¹ into a conical tank with its vertex pointing down. The cone has height ' + H + ' cm and top radius ' + Rr + ' cm.', [
        ['Show that the volume of water when the depth is ' + M('h') + ' cm is ' + M('V = \\frac{' + (Rr * Rr) + '\\pi h^3}{' + (3 * H * H) + '}') + '.', 2, 'Similar triangles: ' + M('r = \\frac{' + Rr + 'h}{' + H + '}') + ', ' + M('V = \\tfrac{1}{3}\\pi r^2 h') + '.'],
        ['Find the rate at which the depth is increasing when the depth is ' + h + ' cm.', 4, M('\\frac{\\mathrm{d}h}{\\mathrm{d}t} = \\frac{' + Q_ + '}{\\mathrm{d}V/\\mathrm{d}h} = ' + s3(dhdt)) + ' cm s⁻¹'],
        ['Explain why the depth rises more slowly as the tank fills.', 1, 'The surface area of the water increases, so each cm³ raises the level by less.']
      ]);
    }
  ]);

  X('a2-numerical', [
    function () {
      var c = pick([2, 3, 5]), f = function (x) { return x * x * x - c * x - 1; }, root = (function () { var x = 2; for (var i = 0; i < 30; i++) x = x - f(x) / (3 * x * x - c); return x; })();
      var g1 = function (x) { return (x * x * x - 1) / c; }, x0 = Math.round(root * 2) / 2, xs = [x0]; for (var i = 0; i < 3; i++) xs.push(g1(xs[i]));
      var st = Math.sqrt(c / 3);
      return Q('The equation ' + M('x^3 - ' + c + 'x - 1 = 0') + ' has a root ' + M('\\alpha') + ' close to ' + num(x0) + '.', [
        ['Use the iteration ' + M('x_{n+1} = \\frac{x_n^3 - 1}{' + c + '}') + ' with ' + M('x_0 = ' + num(x0)) + ' to find ' + M('x_1, x_2, x_3') + '. Comment on the result.', 3, M(xs.slice(1).map(function (v) { return Math.abs(v) > 1e6 ? 'large' : v.toFixed(3); }).join(',\\ ')) + ': the iterates move away from ' + M('\\alpha') + ' — the iteration diverges because ' + M("|g'(\\alpha)| = \\frac{3\\alpha^2}{" + c + "} > 1")],
        ['Explain why the Newton–Raphson method fails if ' + M('x_0 = ' + (Math.abs(st - Math.round(st * 1000) / 1000) < 1e-9 ? num(st) : '\\sqrt{\\frac{' + c + '}{3}}')) + '.', 2, M("f'(x_0) = 3x_0^2 - " + c + ' = 0') + ', so the tangent is horizontal and the formula divides by zero.'],
        ['Use Newton–Raphson with ' + M('x_0 = 2') + ' to find ' + M('\\alpha') + ' to 4 decimal places.', 3, M('\\alpha = ' + root.toFixed(4))]
      ]);
    },
    function () {
      var a = ri(1, 4);
      return Q(M('\\mathrm{f}(x) = \\frac{1}{x - ' + a + '} + 1') + '.', [
        ['Show that ' + M('\\mathrm{f}(' + (a - 0.5) + ')') + ' and ' + M('\\mathrm{f}(' + (a + 1) + ')') + ' have opposite signs.', 2, M('\\mathrm{f}(' + (a - 0.5) + ') = -2 + 1 = -1 < 0') + ' and ' + M('\\mathrm{f}(' + (a + 1) + ') = 1 + 1 = 2 > 0') + '.'],
        ['Explain why this does not show that ' + M('\\mathrm{f}(x) = 0') + ' has a root between ' + (a - 0.5) + ' and ' + (a + 1) + '.', 2, M('\\mathrm{f}') + ' is not continuous: it has a vertical asymptote at ' + M('x = ' + a) + '. The only root is ' + M('x = ' + (a - 1)) + '.']
      ]);
    }
  ]);

  X('a2-integration', [
    function () {
      var a = ri(2, 3), E = pick(['x^2 e^{' + c1(a, 'x') + '}', 'e^{x}\\sin x']);
      var ans = E.indexOf('sin') > -1 ? '\\tfrac{1}{2}e^{x}(\\sin x - \\cos x) + c' : (function () { return '\\frac{e^{' + c1(a, 'x') + '}}{' + (a * a * a) + '}(' + (a * a) + 'x^2 - ' + (2 * a) + 'x + 2) + c'; })();
      return Q('', [['Find ' + M('\\displaystyle\\int ' + E + '\\,\\mathrm{d}x') + '.', 6, 'Integrate by parts twice' + (E.indexOf('sin') > -1 ? ' and rearrange for the integral' : '') + ': ' + M(ans)]]);
    },
    function () {
      var N = 100 * ri(2, 10), P0 = N / pick([4, 5, 10]), k = ri(2, 6) / 10, t1 = ri(3, 10), A = (N - P0) / P0, Pt = N / (1 + A * Math.exp(-k * t1));
      return Q('A population ' + M('P') + ' satisfies ' + M('\\frac{\\mathrm{d}P}{\\mathrm{d}t} = ' + k + 'P\\left(1 - \\frac{P}{' + N + '}\\right)') + ', with ' + M('P = ' + P0) + ' when ' + M('t = 0') + '.', [
        ['Show that ' + M('\\frac{' + N + '}{P(' + N + ' - P)} \\equiv \\frac{1}{P} + \\frac{1}{' + N + ' - P}') + '.', 1, M('\\frac{(' + N + ' - P) + P}{P(' + N + ' - P)}')],
        ['Solve the differential equation to show that ' + M('P = \\frac{' + N + '}{1 + ' + num(A) + 'e^{-' + k + 't}}') + '.', 6, M('\\int \\left(\\frac{1}{P} + \\frac{1}{' + N + ' - P}\\right)\\mathrm{d}P = \\int ' + k + '\\,\\mathrm{d}t') + ': ' + M('\\ln\\frac{P}{' + N + ' - P} = ' + k + 't + c') + '; ' + M('t = 0') + ' gives ' + M('c = \\ln\\frac{1}{' + num(A) + '}') + '; rearrange.'],
        ['Find ' + M('P') + ' when ' + M('t = ' + t1) + ' and state the long-term population.', 2, M(s3(Pt)) + '; it tends to ' + N]
      ]);
    }
  ]);

  X('a2-vectors', [
    function () {
      var A = [ri(-3, 3), ri(-3, 3), ri(-3, 3)], u = [ri(1, 3), ri(-2, 2), ri(-2, 2)], v = [0, 0, 0];
      // pick v perpendicular to u (integer): v = (u_y, -u_x, 0) or similar
      v = [u[1], -u[0], 0]; if (v[0] === 0 && v[1] === 0) v = [0, u[2], -u[1]];
      var B = [A[0] + u[0], A[1] + u[1], A[2] + u[2]], C = [B[0] + v[0], B[1] + v[1], B[2] + v[2]], Dp = [A[0] + v[0], A[1] + v[1], A[2] + v[2]];
      var uu = u[0] * u[0] + u[1] * u[1] + u[2] * u[2], vv = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
      function V3(p) { return BS.vt(p.map(String), ['\\mathbf{i}', '\\mathbf{j}', '\\mathbf{k}']); }
      return Q('The points ' + M('A, B, C') + ' have position vectors ' + M(V3(A)) + ', ' + M(V3(B)) + ' and ' + M(V3(C)) + '.', [
        ['Show that angle ' + M('ABC = 90^\\circ') + ' using Pythagoras’ theorem.', 3, M('|AB|^2 = ' + uu + ',\\ |BC|^2 = ' + vv + ',\\ |AC|^2 = ' + (uu + vv)) + '.'],
        ['Find the position vector of ' + M('D') + ' so that ' + M('ABCD') + ' is a rectangle, and the exact area of the rectangle.', 3, M(V3(Dp)) + '; area ' + M(surd(uu) + ' \\times ' + surd(vv) + ' = ' + surd(uu * vv))],
        ['Find the angle between ' + M('\\overrightarrow{AC}') + ' and the ' + M('z') + '-axis.', 2, dp(deg(Math.acos((C[2] - A[2]) / Math.sqrt(uu + vv))), 1) + '°']
      ]);
    },
    function () {
      var a = [ri(1, 4), nz(-3, 3), ri(-3, 3)], b = [nz(-2, 2), ri(-2, 2), ri(1, 3)], lam = nz(-3, 3), w = [a[0] + lam * b[0], a[1] + lam * b[1], a[2] + lam * b[2]], L2 = w[0] * w[0] + w[1] * w[1] + w[2] * w[2];
      var bb = b[0] * b[0] + b[1] * b[1] + b[2] * b[2], ab = a[0] * b[0] + a[1] * b[1] + a[2] * b[2], aa = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
      var other = fr(-2 * ab - bb * lam, bb);
      function V3(p) { return BS.vt(p.map(String), ['\\mathbf{i}', '\\mathbf{j}', '\\mathbf{k}']); }
      return Q(M('\\mathbf{a} = ' + V3(a)) + ' and ' + M('\\mathbf{b} = ' + V3(b)) + '.', [
        ['Find the values of ' + M('\\lambda') + ' for which ' + M('|\\mathbf{a} + \\lambda\\mathbf{b}| = ' + surd(L2)) + '.', 5, M(poly([bb, 2 * ab, aa - L2], '\\lambda') + ' = 0') + ', so ' + M('\\lambda = ' + lam + '\\text{ or } \\lambda = ' + fs(other))]
      ]);
    }
  ]);

  /* ================= Year 2 Statistics ================= */
  X('a2-regression', [
    function () {
      var a = ri(2, 9) / 10 + ri(0, 2), n = ri(15, 30) / 10, A = Math.pow(10, a), x0 = ri(5, 20);
      return Q('Data are modelled by ' + M('y = kx^n') + '. A graph of ' + M('\\log_{10} y') + ' against ' + M('\\log_{10} x') + ' gives a straight line with gradient ' + n + ' and intercept ' + a.toFixed(1) + '.', [
        ['Find the values of ' + M('k') + ' and ' + M('n') + '.', 3, M('\\log y = ' + a.toFixed(1) + ' + ' + n + '\\log x') + ', so ' + M('n = ' + n + ',\\ k = 10^{' + a.toFixed(1) + '} = ' + s3(A))],
        ['Estimate ' + M('y') + ' when ' + M('x = ' + x0) + '.', 1, s3(A * Math.pow(x0, n))],
        ['Explain how you would decide whether ' + M('y = kx^n') + ' or ' + M('y = ab^x') + ' is the better model.', 2, 'Plot ' + M('\\log y') + ' against ' + M('\\log x') + ' and against ' + M('x') + '; the better model gives the more linear graph (PMCC closer to ±1).']
      ]);
    },
    function () {
      var n = pick([10, 12, 15, 20]), cv = { 10: 0.5494, 12: 0.4973, 15: 0.4409, 20: 0.3783 }[n], r = Math.round((cv + 0.03 + Math.random() * 0.2) * 1000) / 1000;
      return Q('For a sample of ' + n + ' pairs, ' + M('r = ' + r) + '. The critical value for a one-tailed test of ' + M('H_0: \\rho = 0') + ' against ' + M('H_1: \\rho > 0') + ' at the 5% level is ' + cv + '.', [
        ['Carry out the test and state the conclusion.', 2, M(r + ' > ' + cv) + ', reject ' + M('H_0') + ': evidence of positive correlation.'],
        ['A second sample of ' + n + ' pairs gives ' + M('r = ' + (cv - 0.1).toFixed(3)) + '. A student combines both samples and claims the result is now not significant. Explain why combining them requires the raw data, not just the two values of ' + M('r') + '.', 2, 'The PMCC of the combined data depends on all the sums ' + M('\\sum x, \\sum y, \\sum xy') + ', etc.; it cannot be found by averaging the two ' + M('r') + ' values.'],
        ['State one assumption needed for the test.', 1, 'The data come from a bivariate normal distribution.']
      ]);
    }
  ]);

  X('a2-probability', [
    function () {
      var p = [0.5, 0.3, 0.2].map(function (v) { return v; }), sh = pick([[0.5, 0.3, 0.2], [0.4, 0.35, 0.25], [0.6, 0.25, 0.15]]), d = [pick([0.02, 0.03]), pick([0.04, 0.05]), pick([0.06, 0.08])];
      var pd = sh[0] * d[0] + sh[1] * d[1] + sh[2] * d[2], post = sh[2] * d[2] / pd;
      return Q('Three machines ' + M('A, B, C') + ' make ' + (sh[0] * 100) + '%, ' + (sh[1] * 100) + '% and ' + (sh[2] * 100) + '% of the items in a factory. The proportions of defective items they make are ' + d[0] + ', ' + d[1] + ' and ' + d[2] + '.', [
        ['Find the probability that a random item is defective.', 2, f4(pd)],
        ['Given that an item is defective, find the probability that it was made by ' + M('C') + '.', 2, M('\\frac{' + num(Math.round(sh[2] * d[2] * 10000) / 10000) + '}{' + f4(pd) + '} = ' + s3(post))],
        ['Two items are chosen at random. Given that at least one is defective, find the probability that both are defective.', 3, M('\\frac{' + f4(pd) + '^2}{1 - (1 - ' + f4(pd) + ')^2} = ' + s3(pd * pd / (1 - (1 - pd) * (1 - pd))))]
      ]);
    },
    function () {
      var a = pick([0.3, 0.4, 0.5]), b = pick([0.2, 0.25, 0.4]), ab = Math.round(a * b * 100) / 100 + pick([0, 0.05]);
      ab = Math.round(ab * 100) / 100;
      var ind = Math.abs(ab - a * b) < 1e-9;
      return Q(M('P(A) = ' + a + ',\\ P(B) = ' + b) + ' and ' + M('P(A \\cap B) = ' + ab) + '.', [
        ['Find ' + M("P(A' \\mid B')") + '.', 3, M("\\frac{1 - P(A \\cup B)}{1 - P(B)} = \\frac{" + num(Math.round((1 - (a + b - ab)) * 100) / 100) + '}{' + num(Math.round((1 - b) * 100) / 100) + '} = ' + s3((1 - (a + b - ab)) / (1 - b)))],
        ['Determine whether ' + M("A'") + ' and ' + M("B'") + ' are independent.', 2, (ind ? 'Yes' : 'No') + ': ' + M("P(A')P(B') = " + num(Math.round((1 - a) * (1 - b) * 10000) / 10000)) + (ind ? ' = ' : ' \\ne ') + M("P(A' \\cap B') = " + num(Math.round((1 - (a + b - ab)) * 10000) / 10000))],
        ['Prove that if ' + M('A') + ' and ' + M('B') + ' are independent, so are ' + M("A'") + ' and ' + M("B'") + '.', 3, M("P(A' \\cap B') = 1 - P(A) - P(B) + P(A)P(B) = (1 - P(A))(1 - P(B))") + '.']
      ]);
    }
  ]);

  X('a2-normal', [
    function () {
      var mu, sd, x1, x2, p1, p2; do { mu = ri(40, 90); sd = ri(4, 12); x1 = mu - ri(3, 10); x2 = mu + ri(5, 15); p1 = Math.round(IB.ncdf(x1, mu, sd) * 1000) / 1000; p2 = Math.round((1 - IB.ncdf(x2, mu, sd)) * 1000) / 1000; } while (p1 < 0.01 || p2 < 0.01);
      var z1 = IB.invPhi(p1), z2 = IB.invPhi(1 - p2), sdc = (x2 - x1) / (z2 - z1), muc = x1 - z1 * sdc;
      var y = Math.round(muc + sdc * 0.5);
      return Q('The lifetime ' + M('X') + ' hours of a battery is normally distributed. ' + M('P(X < ' + x1 + ') = ' + p1) + ' and ' + M('P(X > ' + x2 + ') = ' + p2) + '.', [
        ['Find the mean and standard deviation.', 5, M('\\frac{' + x1 + ' - \\mu}{\\sigma} = ' + z1.toFixed(4) + ',\\ \\frac{' + x2 + ' - \\mu}{\\sigma} = ' + z2.toFixed(4)) + '; ' + M('\\mu = ' + s3(muc) + ',\\ \\sigma = ' + s3(sdc))],
        ['Three batteries are chosen at random. Find the probability that exactly one lasts longer than ' + y + ' hours.', 3, (function () { var q = 1 - IB.ncdf(y, muc, sdc); return M('3(' + q.toFixed(4) + ')(' + (1 - q).toFixed(4) + ')^2 = ' + s3(3 * q * (1 - q) * (1 - q))); })()],
        ['Given that a battery has lasted ' + x1 + ' hours, find the probability that it lasts more than ' + y + ' hours.', 2, (function () { var q = (1 - IB.ncdf(y, muc, sdc)) / (1 - p1); return M('\\frac{P(X > ' + y + ')}{P(X > ' + x1 + ')} = ' + s3(q)); })()]
      ]);
    },
    function () {
      var mu = ri(200, 500), sd = ri(10, 30), n = pick([16, 25, 36]), se = sd / Math.sqrt(n), lev = pick([5, 1]), z = lev === 5 ? 1.9600 : 2.5758;
      var lo = mu - z * se, hi = mu + z * se;
      return Q('The masses of bags of flour are normally distributed with standard deviation ' + sd + ' g. The mean is claimed to be ' + mu + ' g. A random sample of ' + n + ' bags is taken to test this claim against ' + M('H_1: \\mu \\ne ' + mu) + ' at the ' + lev + '% level.', [
        ['Find the critical regions for the sample mean.', 4, M('\\bar{X} < ' + s3(lo)) + ' or ' + M('\\bar{X} > ' + s3(hi))],
        ['The true mean is in fact ' + (mu + Math.round(se * 2)) + ' g. Find the probability that the test fails to detect the change.', 3, M('P(' + s3(lo) + ' < \\bar{X} < ' + s3(hi) + ') = ' + s3(IB.ncdf(hi, mu + Math.round(se * 2), se) - IB.ncdf(lo, mu + Math.round(se * 2), se)))]
      ]);
    }
  ]);

  /* ================= Year 2 Mechanics ================= */
  X('a2-moments', [
    function () {
      var L = 2 * ri(3, 5), m = ri(10, 25), e = 2, Cp = e, Dp = L - e, w = ri(60, 100);
      var xmax = Math.min(L, Dp + m * (Dp - L / 2) / w), xmin = Math.max(0, Cp - m * (L / 2 - Cp) / w);
      return Q('A uniform plank ' + M('AB') + ' of length ' + L + ' m and mass ' + m + ' kg rests horizontally on supports at ' + M('C') + ' and ' + M('D') + ', where ' + M('AC = DB = ' + e) + ' m. A person of mass ' + w + ' kg stands on the plank ' + M('x') + ' m from ' + M('A') + '.', [
        ['Find, in terms of ' + M('x') + ', the reactions at ' + M('C') + ' and ' + M('D') + '.', 4, 'Moments about ' + M('C') + ': ' + M('R_D = \\frac{' + m + 'g(' + num(L / 2 - e) + ') + ' + w + 'g(x - ' + e + ')}{' + (L - 2 * e) + '}') + ', ' + M('R_C = ' + (m + w) + 'g - R_D')],
        ['Find the range of values of ' + M('x') + ' for which the plank stays in equilibrium.', 4, 'Both reactions must be non-negative: ' + M(s3(xmin) + ' \\le x \\le ' + s3(xmax))],
        ['State how you have used the modelling assumption that the plank is uniform.', 1, 'Its weight acts at its midpoint, ' + num(L / 2) + ' m from ' + M('A') + '.']
      ]);
    },
    function () {
      var L = ri(4, 8), m = ri(10, 30), xg = Math.round(L * (0.3 + Math.random() * 0.4) * 10) / 10, T1 = m * G * (L - xg) / L, T2 = m * G * xg / L, k = ri(5, 15);
      return Q('A non-uniform rod ' + M('AB') + ' of length ' + L + ' m and mass ' + m + ' kg hangs horizontally from two vertical strings at ' + M('A') + ' and ' + M('B') + '. The tension at ' + M('A') + ' is ' + s3(T1) + ' N.', [
        ['Find the distance of the centre of mass from ' + M('A') + ' and the tension at ' + M('B') + '.', 4, M('x = ' + s3(xg)) + ' m; ' + M('T_B = ' + s3(T2)) + ' N'],
        ['A particle of mass ' + k + ' kg is attached to the rod so that the tensions become equal. Find where it is attached.', 3, M('(' + m + ' + ' + k + ')\\frac{g}{2}') + ' each; moments about ' + M('A') + ': ' + M('y = \\frac{(' + m + ' + ' + k + ')\\tfrac{' + L + '}{2} - ' + m + '(' + s3(xg) + ')}{' + k + '} = ' + s3(((m + k) * L / 2 - m * xg) / k)) + ' m from ' + M('A') + (((m + k) * L / 2 - m * xg) / k > L || ((m + k) * L / 2 - m * xg) / k < 0 ? ' (outside the rod, so it is impossible)' : '')]
      ]);
    }
  ]);

  X('a2-friction', [
    function () {
      var m = ri(2, 10), th = pick([20, 25, 30, 35]), mu = pick([0.2, 0.3, 0.4, 0.5]), s = Math.sin(rad(th)), c = Math.cos(rad(th));
      var Pmin = Math.max(0, m * G * (s - mu * c)), Pmax = m * G * (s + mu * c);
      return Q('A particle of mass ' + m + ' kg rests on a rough plane inclined at ' + th + '° to the horizontal. The coefficient of friction is ' + mu + '. A force of ' + M('P') + ' N acts on the particle up the line of greatest slope.', [
        ['Find the least value of ' + M('P') + ' needed to stop the particle sliding down.', 3, M('P + ' + mu + '(' + m + 'g\\cos ' + th + '^\\circ) = ' + m + 'g\\sin ' + th + '^\\circ') + ': ' + (Pmin === 0 ? M('P = 0') + ' (friction alone is enough)' : M('P = ' + s3(Pmin)) + ' N')],
        ['Find the greatest value of ' + M('P') + ' for which the particle remains at rest.', 3, M('P = ' + m + 'g(\\sin ' + th + '^\\circ + ' + mu + '\\cos ' + th + '^\\circ) = ' + s3(Pmax)) + ' N'],
        ['When ' + M('P = ' + Math.round(Pmax + 20)) + ', find the acceleration of the particle.', 2, M(s3((Math.round(Pmax + 20) - Pmax) / m)) + ' m s⁻² up the plane']
      ]);
    },
    function () {
      var mA = ri(2, 6), mB = ri(3, 8), th = 30, mu = pick([0.1, 0.2, 0.25]), s = 0.5, c = Math.cos(rad(30));
      var a = (mB * G - mA * G * s - mu * mA * G * c) / (mA + mB);
      if (a <= 0) { mB = mA + 4; a = (mB * G - mA * G * s - mu * mA * G * c) / (mA + mB); }
      var T = mB * (G - a), h = ri(1, 3);
      return Q('Particle ' + M('A') + ' of mass ' + mA + ' kg is on a rough plane inclined at 30° (coefficient of friction ' + mu + '). It is connected by a light string over a smooth pulley at the top of the plane to particle ' + M('B') + ' of mass ' + mB + ' kg, which hangs freely ' + h + ' m above the ground. The system is released from rest.', [
        ['Find the acceleration of the system and the tension in the string.', 6, M('a = ' + s3(a)) + ' m s⁻², ' + M('T = ' + s3(T)) + ' N'],
        ['Find the speed of ' + M('B') + ' as it hits the ground.', 2, M(s3(Math.sqrt(2 * a * h))) + ' m s⁻¹'],
        ['After ' + M('B') + ' hits the ground, find how much further ' + M('A') + ' moves up the plane.', 3, 'Deceleration ' + M('g(\\sin 30^\\circ + ' + mu + '\\cos 30^\\circ) = ' + s3(G * (s + mu * c))) + '; distance ' + M(s3(2 * a * h / (2 * G * (s + mu * c)))) + ' m']
      ]);
    }
  ]);

  X('a2-projectiles', [
    function () {
      var u = ri(15, 25), d = ri(15, 35), h = ri(1, 6);
      // y = x tan t - g x^2 (1 + tan^2 t) / (2 u^2) ; at x = d, y = h  -> (g d^2 / 2u^2) T^2 - d T + (h + g d^2 / 2u^2) = 0
      var k = G * d * d / (2 * u * u), A = k, B = -d, C = h + k, disc = B * B - 4 * A * C;
      if (disc <= 0) { u = 25; d = 20; h = 3; k = G * d * d / (2 * u * u); A = k; B = -d; C = h + k; disc = B * B - 4 * A * C; }
      var T1 = (-B - Math.sqrt(disc)) / (2 * A), T2 = (-B + Math.sqrt(disc)) / (2 * A);
      return Q('A ball is kicked from ground level with speed ' + u + ' m s⁻¹ at an angle ' + M('\\theta') + ' above the horizontal. It passes through a point ' + d + ' m horizontally from the start and ' + h + ' m above the ground.', [
        ['Show that ' + M(s3(A) + '\\tan^2\\theta - ' + d + '\\tan\\theta + ' + s3(C) + ' = 0') + '.', 4, 'Use ' + M('y = x\\tan\\theta - \\frac{gx^2}{2u^2}(1 + \\tan^2\\theta)') + ' with ' + M('x = ' + d + ',\\ y = ' + h) + '.'],
        ['Find the two possible values of ' + M('\\theta') + '.', 3, M('\\tan\\theta = ' + s3(T1) + '\\text{ or } ' + s3(T2)) + ', so ' + M('\\theta = ' + dp(deg(Math.atan(T1)), 1) + '^\\circ\\text{ or } ' + dp(deg(Math.atan(T2)), 1) + '^\\circ')],
        ['For the smaller angle, find the time taken to reach the point.', 2, M('t = \\frac{' + d + '}{' + u + '\\cos ' + dp(deg(Math.atan(T1)), 1) + '^\\circ} = ' + s3(d / (u * Math.cos(Math.atan(T1))))) + ' s']
      ]);
    },
    function () {
      var u = ri(10, 20), h = ri(10, 40), a = 30, uy = u * 0.5, ux = u * Math.cos(rad(30)), T = (uy + Math.sqrt(uy * uy + 2 * G * h)) / G, R = ux * T, vy = uy - G * T, sp = Math.hypot(ux, vy);
      return Q('A stone is thrown from the top of a cliff ' + h + ' m above the sea, with speed ' + u + ' m s⁻¹ at 30° above the horizontal.', [
        ['Find the time taken to reach the sea and the horizontal distance travelled.', 5, M('-' + h + ' = ' + num(uy) + 't - 4.9t^2') + ', ' + M('t = ' + s3(T)) + ' s; distance ' + M(s3(R)) + ' m'],
        ['Find the speed and direction of the stone as it hits the sea.', 3, M(s3(sp)) + ' m s⁻¹ at ' + dp(deg(Math.atan(-vy / ux)), 1) + '° below the horizontal'],
        ['Find the length of time for which the stone is above the level of the cliff top.', 2, M('\\frac{2 \\times ' + num(uy) + '}{9.8} = ' + s3(2 * uy / G)) + ' s']
      ]);
    }
  ]);

  X('a2-statics', [
    function () {
      var L = ri(4, 8), m = ri(10, 25), w = ri(50, 90), th = pick([60, 65, 70]), mu = pick([0.3, 0.35, 0.4, 0.5]);
      // ladder AB, A on rough ground, B against smooth wall. person at distance x from A. Limiting: F = mu R, R = (m + w) g, S = F
      // moments about A: S L sin th = m g (L/2) cos th + w g x cos th -> x = (mu (m+w) L tan th - m L/2) / w
      var x = (mu * (m + w) * L * Math.tan(rad(th)) - m * L / 2) / w;
      return Q('A uniform ladder of length ' + L + ' m and mass ' + m + ' kg rests with its foot on rough horizontal ground (coefficient of friction ' + mu + ') and its top against a smooth vertical wall, at ' + th + '° to the horizontal. A person of mass ' + w + ' kg climbs the ladder.', [
        ['Find how far up the ladder the person can climb before the ladder slips.', 6, 'Resolving: ' + M('R = ' + (m + w) + 'g,\\ S = F = ' + mu + 'R') + '; moments about the foot: ' + M('S(' + L + '\\sin ' + th + '^\\circ) = ' + m + 'g(' + num(L / 2) + '\\cos ' + th + '^\\circ) + ' + w + 'g\\,x\\cos ' + th + '^\\circ') + ', ' + M('x = ' + s3(x)) + ' m' + (x >= L ? ' — more than the length, so the person can reach the top safely' : '')],
        ['State one modelling assumption about the wall, and its effect.', 1, 'The wall is smooth, so the only force from it is perpendicular to the wall (no friction at the top).']
      ]);
    },
    function () {
      var m = ri(2, 8), th = pick([20, 25, 30, 35]), mu = pick([0.2, 0.25, 0.3]), s = Math.sin(rad(th)), c = Math.cos(rad(th));
      // horizontal force P holds particle on rough slope. On point of sliding down: P cos th + mu(m g cos th + P sin th) = m g sin th
      var Pmin = m * G * (s - mu * c) / (c + mu * s), Pmax = m * G * (s + mu * c) / (c - mu * s);
      return Q('A particle of mass ' + m + ' kg is held at rest on a rough plane inclined at ' + th + '° (coefficient of friction ' + mu + ') by a horizontal force of magnitude ' + M('P') + ' N acting in the vertical plane containing a line of greatest slope.', [
        ['Show that the normal reaction is ' + M(m + 'g\\cos ' + th + '^\\circ + P\\sin ' + th + '^\\circ') + '.', 2, 'Resolve perpendicular to the plane.'],
        ['Find the range of values of ' + M('P') + ' for which the particle remains at rest.', 6, (Pmin < 0 ? M('0') : M(s3(Pmin))) + M(' \\le P \\le ' + s3(Pmax)) + ' (limiting friction down and up the plane)']
      ]);
    }
  ]);

  X('a2-kinematics', [
    function () {
      var A0 = [ri(-10, 0), ri(0, 10)], vA = [ri(1, 5), ri(-3, 3)], B0 = [ri(5, 15), ri(-5, 5)], vB = [ri(-4, 1), ri(-2, 4)];
      // relative r(t) = (B0 - A0) + t (vB - vA) ; min at t = -(d.w)/(w.w)
      var d = [B0[0] - A0[0], B0[1] - A0[1]], w = [vB[0] - vA[0], vB[1] - vA[1]]; if (w[0] === 0 && w[1] === 0) w = [1, 1];
      var t = -(d[0] * w[0] + d[1] * w[1]) / (w[0] * w[0] + w[1] * w[1]); if (t < 0) t = 0;
      var dmin = Math.hypot(d[0] + t * w[0], d[1] + t * w[1]);
      function V(p) { return BS.vt(p.map(String), ['\\mathbf{i}', '\\mathbf{j}']); }
      return Q('Ship ' + M('A') + ' starts at ' + M(V(A0)) + ' km and moves with constant velocity ' + M('(' + V(vA) + ')') + ' km h⁻¹. Ship ' + M('B') + ' starts at the same time at ' + M(V(B0)) + ' km with velocity ' + M('(' + V(vB) + ')') + ' km h⁻¹.', [
        ['Find ' + M('\\overrightarrow{AB}') + ' at time ' + M('t') + ' hours.', 2, M('(' + d[0] + tc(w[0], 't') + ')\\mathbf{i} + (' + d[1] + tc(w[1], 't') + ')\\mathbf{j}')],
        ['Find the time at which the ships are closest together and the least distance between them.', 5, 'Minimise ' + M('|\\overrightarrow{AB}|^2') + ': ' + M('t = ' + s3(t)) + ' h, distance ' + M(s3(dmin)) + ' km']
      ]);
    },
    function () {
      var p = ri(1, 3), q = ri(2, 6), c = ri(1, 4);
      // v = (3 t^2 - 2 q t) i + (c t - p) j ... parallel to i when c t = p ; to j when 3 t^2 = 2 q t -> t = 2q/3
      var t1 = fr(p, c), t2 = fr(2 * q, 3), aMag = Math.hypot(6 * 2 * q / 3 - 2 * q, c);
      return Q('A particle moves so that its velocity at time ' + M('t') + ' s is ' + M('\\mathbf{v} = (3t^2 - ' + (2 * q) + 't)\\mathbf{i} + (' + c1(c, 't') + ' - ' + p + ')\\mathbf{j}') + ' m s⁻¹.', [
        ['Find the times when the particle is moving parallel to ' + M('\\mathbf{i}') + ' and when it is moving parallel to ' + M('\\mathbf{j}') + '.', 4, 'Parallel to ' + M('\\mathbf{i}') + ' when ' + M('t = ' + fs(t1)) + (3 * t1[0] * t1[0] / (t1[1] * t1[1]) - 2 * q * t1[0] / t1[1] === 0 ? ' (but then it is at rest)' : '') + '; parallel to ' + M('\\mathbf{j}') + ' when ' + M('t = ' + fs(t2)) + ' (and at ' + M('t = 0') + ')'],
        ['Find the magnitude of the acceleration when the particle is moving parallel to ' + M('\\mathbf{j}') + ' (for ' + M('t > 0') + ').', 3, M('\\mathbf{a} = (6t - ' + (2 * q) + ')\\mathbf{i} + ' + c + '\\mathbf{j}') + '; ' + M('|\\mathbf{a}| = ' + s3(aMag)) + ' m s⁻²']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
