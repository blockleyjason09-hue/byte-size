/* Byte Size Classroom — extension questions for IB Mathematics: Applications and Interpretation SL and HL (top level).
   Technology (a GDC) is assumed throughout, as in IB Paper 2 and Paper 3. */
(function (g) {
  var BS = g.BS, D = BS.draw, X = BS.ext, IB = BS.ib;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, dp = BS.dp, num = BS.num, M = BS.m;
  var s3 = function (x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : IB.s3(x); }, vec = IB.vec, mat = IB.mat, usd = IB.usd, table = IB.table;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: p[2] }; }) }; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function tc(c, v) { return c === 0 ? '' : (c < 0 ? ' - ' : ' + ') + (Math.abs(c) === 1 && v ? '' : Math.abs(c)) + v; }
  function lin(cs, vs) { var o = ''; cs.forEach(function (c, i) { if (!c) return; o += o ? tc(c, vs[i]) : (vs[i] ? c1(c, vs[i]) : String(c)); }); return o || '0'; }
  function pt(x, y) { return '(' + x + ',\\ ' + y + ')'; }
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } var k = gcd(Math.abs(n), d) || 1; return [n / k, d / k]; }
  function fs(a) { return frac(a[0], a[1]); }
  function rad(d) { return d * Math.PI / 180; }
  function deg(r) { return r * 180 / Math.PI; }
  function d1(x) { return dp(x, 1); }
  function d2(x) { return dp(x, 2); }
  function sum(a) { return a.reduce(function (s, v) { return s + v; }, 0); }
  function dot(a, b) { return sum(a.map(function (v, i) { return v * b[i]; })); }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function norm(a) { return Math.sqrt(dot(a, a)); }
  function add(a, b, k) { k = k === undefined ? 1 : k; return a.map(function (v, i) { return v + k * b[i]; }); }
  function vv(a) { return vec(a.map(String)); }
  // least-squares line y = a + b x
  function lsq(xs, ys) { var n = xs.length, mx = sum(xs) / n, my = sum(ys) / n, sxy = 0, sxx = 0; xs.forEach(function (x, i) { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) * (x - mx); }); var b = sxy / sxx; return { a: my - b * mx, b: b }; }
  // real roots of fn on [lo, hi] by scanning and bisection
  function roots(fn, lo, hi, n) {
    n = n || 4000; var out = [], px = lo, pv = fn(lo);
    for (var i = 1; i <= n; i++) {
      var x = lo + (hi - lo) * i / n, v = fn(x);
      if (pv === 0) out.push(px);
      else if (pv * v < 0) { var a = px, b = x, fa = pv; for (var k = 0; k < 60; k++) { var m = (a + b) / 2, fm = fn(m); if (fa * fm <= 0) b = m; else { a = m; fa = fm; } } out.push((a + b) / 2); }
      px = x; pv = v;
    }
    return out;
  }
  function sci(x) { var e = Math.floor(Math.log10(Math.abs(x))), m = s3(x / Math.pow(10, e)); if (m === '10.0') { e++; m = s3(x / Math.pow(10, e)); } return m + ' \\times 10^{' + e + '}'; }
  function solve3(A, b) { var det = function (m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]); }, D0 = det(A); return [0, 1, 2].map(function (j) { return det(A.map(function (r, i) { return r.map(function (v, k) { return k === j ? b[i] : v; }); })) / D0; }); }
  function pv3(x) { return x < 0.001 ? sci(x) : s3(x); }
  // ax + by = c through integers, with a common factor removed and a positive leading coefficient
  function leq(a, b, c) { var g_ = gcd(gcd(Math.abs(a), Math.abs(b)), Math.abs(c)) || 1; a /= g_; b /= g_; c /= g_; if (a < 0 || (a === 0 && b < 0)) { a = -a; b = -b; c = -c; } return lin([a, b], ['x', 'y']) + ' = ' + c; }
  function bisEq(U, V) { return M(leq(2 * (V[0] - U[0]), 2 * (V[1] - U[1]), (V[0] * V[0] + V[1] * V[1]) - (U[0] * U[0] + U[1] * U[1]))); }
  function et(l) { return l === 1 ? 't' : l === -1 ? '-t' : l + 't'; }
  // y = bx + a with values to 3 s.f.
  function yl(y, b, x, a) { var bs = s3(b), as = s3(Math.abs(a)); bs = bs === '1' ? '' : bs === '-1' ? '-' : bs; return y + ' = ' + bs + x + (as === '0' ? '' : (a < 0 ? ' - ' : ' + ') + as); }
  function bearing(e, n) { var b = deg(Math.atan2(e, n)); if (b < 0) b += 360; return b; }
  function b3(b) { var s = d1(b); return (b < 100 ? '0' : '') + (b < 10 ? '0' : '') + s; }
  // 2x2 matrix with integer eigenvalues l1 > l2 and eigenvectors (1, p), (1, q)
  function eig2(pos) {
    for (var t = 0; t < 4000; t++) {
      var l1 = ri(2, 6), l2 = pos ? ri(1, l1 - 1) : pick([-3, -2, -1, 1, 2, 3].filter(function (v) { return v !== l1 && Math.abs(v) < l1; })), p = nz(-4, 4), q = nz(-4, 4), d = q - p;
      if (!d || p === q) continue;
      var Mx = [[(l1 * q - l2 * p) / d, (l2 - l1) / d], [p * q * (l1 - l2) / d, (q * l2 - p * l1) / d]];
      if (!Mx.every(function (r) { return r.every(function (v) { return Number.isInteger(v) && Math.abs(v) <= 12; }); })) continue;
      if (pos && !Mx.every(function (r) { return r.every(function (v) { return v > 0; }); })) continue;
      if (!pos && Mx.some(function (r) { return r.some(function (v) { return v === 0; }); })) continue;
      return { M: Mx, l1: l1, l2: l2, p: p, q: q, d: d };
    }
    return { M: [[4, 1], [2, 3]], l1: 5, l2: 2, p: 1, q: -2, d: -3 };
  }

  /* ================= Topic 1: Number and algebra ================= */
  var APPROX = [
    function () {
      var r = ri(25, 60) / 10, h = ri(80, 160) / 10, V = Math.PI * r * r * h, Vu = Math.PI * Math.pow(r + 0.05, 2) * (h + 0.05), Vl = Math.PI * Math.pow(r - 0.05, 2) * (h - 0.05);
      var e = Math.max(Vu - V, V - Vl) / V * 100;
      return Q('The radius and height of a cylindrical can are measured as ' + M('r = ' + d1(r)) + ' cm and ' + M('h = ' + d1(h)) + ' cm, each correct to 1 decimal place.', [
        ['Write down the lower and upper bounds of ' + M('r') + ' and of ' + M('h') + '.', 2, M(dp(r - 0.05, 2) + ' \\le r < ' + dp(r + 0.05, 2)) + ', ' + M(dp(h - 0.05, 2) + ' \\le h < ' + dp(h + 0.05, 2))],
        ['Find the volume calculated from the measured values, and the upper and lower bounds of the true volume.', 4, 'Measured ' + M('V = ' + s3(V)) + ' cm³; bounds ' + M(s3(Vl)) + ' cm³ and ' + M(s3(Vu)) + ' cm³'],
        ['Hence find the maximum possible percentage error in the calculated volume.', 2, M(s3(e) + '\\%') + ' (the larger of the two differences, divided by ' + s3(V) + ')']
      ]);
    },
    function () {
      var a = ri(11, 98) / 10, k = ri(15, 18), d = a * Math.pow(10, k), c = 2.998e8, t = d / c, yrs = t / (365.25 * 24 * 3600);
      var ta = Math.round(a) * Math.pow(10, k) / 3e8, pe = Math.abs(ta - t) / t * 100;
      return Q('The distance from Earth to a star is ' + M(d1(a) + ' \\times 10^{' + k + '}') + ' m. Light travels at ' + M('2.998 \\times 10^{8}') + ' m s⁻¹.', [
        ['Find the time, in seconds, that light from the star takes to reach Earth. Give your answer in the form ' + M('a \\times 10^{k}') + ', where ' + M('1 \\le a < 10') + ' and ' + M('k \\in \\mathbb{Z}') + '.', 2, M(sci(t)) + ' s'],
        ['Convert your answer to years, taking a year as 365.25 days.', 2, M(s3(yrs)) + ' years'],
        ['A student estimates the time by rounding the distance to ' + M(Math.round(a) + ' \\times 10^{' + k + '}') + ' m and the speed to ' + M('3 \\times 10^{8}') + ' m s⁻¹. Find the percentage error in the student’s estimate of the time.', 3, 'Estimate ' + M(sci(ta)) + ' s; percentage error ' + M(s3(pe) + '\\%')]
      ]);
    }
  ];
  X(['sl-approx', 'ib-approx'], APPROX);

  function arith1() {
    var a = ri(12, 25), d = ri(2, 4), R = ri(18, 30), un = a + (R - 1) * d, SR = R * (2 * a + (R - 1) * d) / 2, T = SR + ri(150, 400), n = R;
    while (n * (2 * a + (n - 1) * d) / 2 < T) n++;
    return Q('The first row of a theatre has ' + a + ' seats. Each row after the first has ' + d + ' more seats than the row before.', [
      ['Find the number of seats in row ' + R + '.', 2, M(a + ' + ' + (R - 1) + ' \\times ' + d + ' = ' + un)],
      ['The theatre has ' + R + ' rows. Find the total number of seats.', 2, M('S_{' + R + '} = \\frac{' + R + '}{2}(' + (2 * a) + ' + ' + (R - 1) + ' \\times ' + d + ') = ' + SR)],
      ['A new theatre is designed in the same way, and must have at least ' + T + ' seats. Find the least number of rows it needs, and the number of seats in its last row.', 4, 'Solve ' + M('\\frac{n}{2}(' + (2 * a) + ' + ' + d + '(n - 1)) \\ge ' + T) + ': ' + M('n = ' + n) + ' rows; last row has ' + M(a + (n - 1) * d) + ' seats']
    ]);
  }
  function arith2() {
    var d = 2 * ri(2, 5), u1 = ri(-15, 9), p = d / 2, q = u1 - p, K = ri(80, 200), n = 1;
    while (u1 + (n - 1) * d <= K) n++;
    var L = ri(1000, 3000), m = 1; while (p * m * m + q * m <= L) m++;
    return Q('The sum of the first ' + M('n') + ' terms of an arithmetic sequence is ' + M('S_n = ' + lin([p, q], ['n^2', 'n'])) + '.', [
      ['Find the first term and the common difference.', 3, M('u_1 = S_1 = ' + u1) + '; ' + M('u_2 = S_2 - S_1 = ' + (u1 + d)) + ', so ' + M('d = ' + d)],
      ['Find the first term of the sequence that is greater than ' + K + '.', 3, M('u_n = ' + lin([d, u1 - d], ['n', ''])) + ' > ' + K + ' gives ' + M('n = ' + n) + ', ' + M('u_{' + n + '} = ' + (u1 + (n - 1) * d))],
      ['Find the least value of ' + M('n') + ' for which ' + M('S_n > ' + L) + '.', 2, M('n = ' + m)]
    ]);
  }
  function geom1() {
    var A = ri(30, 40) * 1000, inc = ri(10, 20) * 100, B = A - ri(2, 6) * 1000, r = ri(5, 8), n = 1, fa = function (k) { return A + (k - 1) * inc; }, fb = function (k) { return B * Math.pow(1 + r / 100, k - 1); };
    while (fb(n) <= fa(n)) n++;
    var TA = 10 * (2 * A + 9 * inc) / 2, TB = B * (Math.pow(1 + r / 100, 10) - 1) / (r / 100);
    return Q('Ana is offered two jobs. Job ' + M('A') + ' pays $' + num(A) + ' in the first year, rising by $' + num(inc) + ' each year. Job ' + M('B') + ' pays $' + num(B) + ' in the first year, rising by ' + r + '% each year.', [
      ['Find the salary in year 10 for each job.', 3, M('A') + ': ' + usd(fa(10)) + '; ' + M('B') + ': ' + usd(fb(10))],
      ['Find the first year in which the salary for job ' + M('B') + ' is greater than the salary for job ' + M('A') + '.', 3, 'Year ' + n],
      ['Find the total amount Ana would earn over the first 10 years in each job, and state which job pays more in total.', 4, M('A') + ': ' + usd(TA) + '; ' + M('B') + ': ' + usd(TB) + '; job ' + M(TA > TB ? 'A' : 'B') + ' pays more']
    ]);
  }
  function geom2() {
    var h = ri(3, 8), r = pick([0.6, 0.65, 0.7, 0.75, 0.8]), n = ri(4, 6), Dn = h + 2 * h * r * (1 - Math.pow(r, n - 1)) / (1 - r), Dinf = h + 2 * h * r / (1 - r), k = 1;
    while (h * Math.pow(r, k) >= 0.01) k++;
    return Q('A ball is dropped from a height of ' + h + ' m. After each bounce it rises to ' + Math.round(r * 100) + '% of the height from which it fell.', [
      ['Find the total distance travelled by the ball when it hits the ground for the ' + n + 'th time.', 4, M(h + ' + 2 \\times \\frac{' + s3(h * r) + '(1 - ' + r + '^{' + (n - 1) + '})}{1 - ' + r + '} = ' + s3(Dn)) + ' m'],
      ['Find the total distance the ball would travel if it bounced indefinitely.', 3, M(h + ' + \\frac{2 \\times ' + s3(h * r) + '}{1 - ' + r + '} = ' + s3(Dinf)) + ' m'],
      ['Find the number of the first bounce whose height is less than 1 cm.', 2, M(h + ' \\times ' + r + '^{k} < 0.01') + ' gives ' + M('k = ' + k)]
    ]);
  }
  X('sl-seq', [arith1, geom1]);
  X('ib-arith', [arith1, arith2]);
  X('ib-geom', [geom1, geom2]);

  var FIN = [
    function () {
      var P = ri(15, 40) * 10000, i = pick([3.6, 4.2, 4.8, 5.4, 6]), N = pick([15, 20, 25]), j = i / 1200, n = N * 12, pmt = P * j / (1 - Math.pow(1 + j, -n));
      var k = 60, out = P * Math.pow(1 + j, k) - pmt * (Math.pow(1 + j, k) - 1) / j;
      return Q('A mortgage of $' + num(P) + ' is taken out at a nominal annual interest rate of ' + i + '%, compounded monthly. It is repaid in equal monthly instalments over ' + N + ' years, with payments made at the end of each month.', [
        ['Find the monthly repayment.', 3, usd(pmt)],
        ['Find the total amount of interest paid over the ' + N + ' years.', 2, usd(pmt * n - P)],
        ['Find the amount still owed immediately after the 60th payment.', 3, usd(out)]
      ]);
    },
    function () {
      var P = ri(5, 20) * 1000, r = pick([4, 4.5, 5, 5.5, 6]), inf = pick([2, 2.5, 3]), n = 1, rv = function (k) { return P * Math.pow(1 + r / 400, 4 * k) / Math.pow(1 + inf / 100, k); };
      while (rv(n) < 1.5 * P) n++;
      return Q('Kai invests $' + num(P) + ' at a nominal annual rate of ' + r + '%, compounded quarterly. Inflation is ' + inf + '% per year.', [
        ['Find the value of the investment after 10 years.', 2, usd(P * Math.pow(1 + r / 400, 40))],
        ['Find the real value of the investment after 10 years, in terms of today’s money.', 2, usd(rv(10))],
        ['Find the least number of complete years after which the real value of the investment is at least 1.5 times the amount invested.', 3, n + ' years']
      ]);
    }
  ];
  X(['sl-finance', 'ib-finance'], FIN);

  var LOGS = [
    function () {
      var a = ri(2, 8) * 1000, b = ri(20, 50) * 1000, k = ri(5, 12) / 100, m = ri(3, 8) / 100, t = Math.log(b / a) / (k + m), t2 = Math.log(b / (2 * a)) / (k + m);
      return Q('Two towns have populations modelled by ' + M('A = ' + a + 'e^{' + k + 't}') + ' and ' + M('B = ' + b + 'e^{-' + m + 't}') + ', where ' + M('t') + ' is the number of years after 2020.', [
        ['Show that the populations are equal when ' + M('t = \\frac{\\ln ' + (b / gcd(a, b)) + (a / gcd(a, b) === 1 ? '' : ' - \\ln ' + (a / gcd(a, b))) + '}{' + num(k + m) + '}') + '.', 3, M(a + 'e^{' + k + 't} = ' + b + 'e^{-' + m + 't} \\Rightarrow e^{' + num(k + m) + 't} = \\frac{' + b + '}{' + a + '}') + ', then take logs.'],
        ['Hence find this time to 3 significant figures.', 1, M('t = ' + s3(t)) + ' years'],
        ['Find the time when the population of ' + M('A') + ' is twice the population of ' + M('B') + '.', 3, M('e^{' + num(k + m) + 't} = \\frac{' + b + '}{' + (2 * a) + '}') + ', ' + M('t = ' + s3(t2)) + ' years' + (t2 < 0 ? ' (before 2020)' : '')]
      ]);
    },
    function () {
      var L = ri(60, 80), k = ri(3, 9), L2 = L + ri(12, 25), n = Math.ceil(Math.pow(10, (L2 - L) / 10));
      return Q('The loudness ' + M('L') + ' decibels of a sound of intensity ' + M('I') + ' is ' + M('L = 10\\log_{10}\\left(\\frac{I}{I_0}\\right)') + ', where ' + M('I_0') + ' is a constant. One machine produces a sound of ' + L + ' dB.', [
        ['Find the loudness when the intensity of the sound is multiplied by ' + k + '.', 2, M('L + 10\\log_{10}' + k + ' = ' + s3(L + 10 * Math.log10(k))) + ' dB'],
        ['Find the loudness of two identical machines running together, assuming intensities add.', 2, M(L + ' + 10\\log_{10} 2 = ' + s3(L + 10 * Math.log10(2))) + ' dB'],
        ['Find the least number of identical machines that together produce a sound louder than ' + L2 + ' dB.', 3, M('10\\log_{10} n > ' + (L2 - L)) + ', ' + M('n > ' + IB.s4(Math.pow(10, (L2 - L) / 10))) + ', so ' + M(n) + ' machines']
      ]);
    }
  ];
  X(['sl-logs', 'ib-logs'], LOGS);

  var SYS = [
    function () {
      var x = ri(40, 120), y = ri(20, 80), z = ri(10, 50), pa = ri(12, 20), pc = ri(5, pa - 3), ps = ri(pc + 1, pa - 1);
      var tot = x + y + z, inc = pa * x + pc * y + ps * z, k = ri(2, 3), rel = x - k * z;
      return Q('A theatre sells adult tickets at $' + pa + ', child tickets at $' + pc + ' and senior tickets at $' + ps + '. One evening ' + tot + ' tickets were sold, for a total of $' + num(inc) + '. The number of adult tickets was ' + rel + ' more than ' + k + ' times the number of senior tickets.', [
        ['Write down three equations in ' + M('a') + ', ' + M('c') + ' and ' + M('s') + ', the numbers of adult, child and senior tickets sold.', 3, M('a + c + s = ' + tot) + ', ' + M(pa + 'a + ' + pc + 'c + ' + ps + 's = ' + inc) + ', ' + M('a - ' + k + 's = ' + rel)],
        ['Solve your equations.', 2, M('a = ' + x + ',\\ c = ' + y + ',\\ s = ' + z)],
        ['On another evening the first and third conditions hold again, but the income is reported as $' + num(inc + 1) + '. Show that this report must be wrong.', 2, (function () { var z2 = solve3([[1, 1, 1], [pa, pc, ps], [1, 0, -k]], [tot, inc + 1, rel]); return 'Solving gives ' + M('a = ' + s3(z2[0]) + ',\\ c = ' + s3(z2[1]) + ',\\ s = ' + s3(z2[2])) + ', which are not whole numbers.'; })()]
      ]);
    },
    function () {
      var a = -pick([4, 5]), b = ri(15, 30), c = ri(1, 10), h = function (t) { return a * t * t + b * t + c; }, land = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a), tmax = -b / (2 * a);
      var H = Math.round(h(tmax) * 0.6), tt = roots(function (t) { return h(t) - H; }, 0, land);
      return Q('The height ' + M('h') + ' metres of a ball ' + M('t') + ' seconds after it is thrown is modelled by ' + M('h = at^2 + bt + c') + '. When ' + M('t = 1, 2, 3') + ', the heights are ' + h(1) + ' m, ' + h(2) + ' m and ' + h(3) + ' m.', [
        ['Write down a system of three equations and solve it to find ' + M('a') + ', ' + M('b') + ' and ' + M('c') + '.', 4, M('a + b + c = ' + h(1)) + ', ' + M('4a + 2b + c = ' + h(2)) + ', ' + M('9a + 3b + c = ' + h(3)) + '; ' + M('a = ' + a + ',\\ b = ' + b + ',\\ c = ' + c)],
        ['Find the maximum height of the ball.', 2, M(s3(h(tmax))) + ' m at ' + M('t = ' + s3(tmax)) + ' s'],
        ['Find the length of time for which the ball is more than ' + H + ' m above the ground.', 3, M(s3(tt[1]) + ' - ' + s3(tt[0]) + ' = ' + s3(tt[1] - tt[0])) + ' s'],
        ['Find the time at which the ball hits the ground.', 1, M('t = ' + s3(land)) + ' s']
      ]);
    }
  ];
  X(['sl-systems', 'ib-systems'], SYS);

  X('ib-complex', [
    function () {
      var a = ri(3, 9), b = ri(2, 8), th = pick([30, 45, 60, 90, 120]), re = a + b * Math.cos(rad(th)), im = b * Math.sin(rad(th)), R = Math.hypot(re, im), ph = Math.atan2(im, re);
      var thr = { 30: '\\frac{\\pi}{6}', 45: '\\frac{\\pi}{4}', 60: '\\frac{\\pi}{3}', 90: '\\frac{\\pi}{2}', 120: '\\frac{2\\pi}{3}' }[th];
      return Q('Two alternating voltages are ' + M('V_1 = ' + a + '\\sin t') + ' and ' + M('V_2 = ' + b + '\\sin\\left(t + ' + thr + '\\right)') + '. Each can be written as the imaginary part of ' + M('Ae^{i(t + \\theta)}') + '.', [
        ['Write ' + M('V_1') + ' and ' + M('V_2') + ' as the imaginary parts of complex exponentials, and show that ' + M('V_1 + V_2 = \\operatorname{Im}\\left[(' + a + ' + ' + b + 'e^{i' + thr + '})e^{it}\\right]') + '.', 2, M('V_1 = \\operatorname{Im}(' + a + 'e^{it})') + ', ' + M('V_2 = \\operatorname{Im}(' + b + 'e^{i' + thr + '}e^{it})') + '; add and factor out ' + M('e^{it}')],
        ['Write ' + M(a + ' + ' + b + 'e^{i' + thr + '}') + ' in the form ' + M('re^{i\\varphi}') + '.', 3, M((Math.abs(re) < 1e-9 ? '' : s3(re) + ' + ') + s3(im) + 'i = ' + s3(R) + 'e^{' + s3(ph) + 'i}')],
        ['Hence write the total voltage in the form ' + M('R\\sin(t + \\varphi)') + ' and state its maximum value.', 2, M(s3(R) + '\\sin(t + ' + s3(ph) + ')') + '; maximum ' + M(s3(R))]
      ]);
    },
    function () {
      var R = pick([1, 2, 3]), k = pick([0, 1, 2, 3]), w = Math.pow(R, 3), wtxt = [String(w), (w === 1 ? '' : w) + 'i', '-' + w, '-' + (w === 1 ? '' : w) + 'i'][k], base = k * Math.PI / 2;
      var args = [0, 1, 2].map(function (j) { var a = (base + 2 * Math.PI * j) / 3; while (a > Math.PI + 1e-9) a -= 2 * Math.PI; return a; }).sort(function (x, y) { return x - y; });
      var piw = function (a) { var n = Math.round(a / Math.PI * 6); return n === 0 ? '0' : IB.pif(n, 6); };
      return Q('Consider the equation ' + M('z^3 = ' + wtxt) + ', where ' + M('z \\in \\mathbb{C}') + '.', [
        ['Write ' + M(wtxt) + ' in the form ' + M('re^{i\\theta}') + '.', 1, M(k ? (w === 1 ? '' : w) + 'e^{' + piw(base) + 'i}' : w + 'e^{0i}')],
        ['Find the three solutions, giving each in the form ' + M('re^{i\\theta}') + ' with ' + M('-\\pi < \\theta \\le \\pi') + '.', 4, args.map(function (a) { var e = piw(a); return M(e === '0' ? String(R) : (R === 1 ? '' : R) + 'e^{' + e + 'i}'); }).join(', ')],
        ['The solutions are plotted on an Argand diagram. Find the exact area of the triangle they form.', 3, 'Equilateral triangle with circumradius ' + R + ': ' + M('3 \\times \\frac{1}{2} \\times ' + R + '^2 \\sin\\frac{2\\pi}{3} = ' + (function () { var f_ = fr(3 * R * R, 4); return f_[1] === 1 ? f_[0] + '\\sqrt{3}' : '\\frac{' + f_[0] + '\\sqrt{3}}{' + f_[1] + '}'; })())]
      ]);
    }
  ]);

  X('ib-matrices', [
    function () {
      var A; do { A = [[ri(-3, 5), ri(-3, 4)], [ri(-3, 4), ri(-3, 5)]]; } while (A[0][1] === 0 || A[1][0] === 0 || A[0][0] * A[1][1] - A[0][1] * A[1][0] === 0);
      var tr = A[0][0] + A[1][1], dt = A[0][0] * A[1][1] - A[0][1] * A[1][0], p = tr, q = -dt;
      return Q('Let ' + M('\\mathbf{M} = ' + mat(A)) + '.', [
        ['Show that ' + M('\\mathbf{M}^2 = p\\mathbf{M} + q\\mathbf{I}') + ', stating the values of ' + M('p') + ' and ' + M('q') + '.', 3, M('\\mathbf{M}^2 = ' + mat(IB.mm(A, A))) + '; ' + M('p = ' + p + ',\\ q = ' + q)],
        ['Hence express ' + M('\\mathbf{M}^{-1}') + ' in the form ' + M('\\alpha\\mathbf{M} + \\beta\\mathbf{I}') + '.', 3, 'Multiply by ' + M('\\mathbf{M}^{-1}') + ': ' + M('\\mathbf{M} = p\\mathbf{I} + q\\mathbf{M}^{-1}') + ', so ' + M('\\mathbf{M}^{-1} = ' + ({ '1': '', '-1': '-' }[frac(1, q)] !== undefined ? { '1': '', '-1': '-' }[frac(1, q)] : frac(1, q)) + '\\mathbf{M} ' + (p ? (-p / q > 0 ? '+ ' : '- ') + (frac(Math.abs(p), Math.abs(q)) === '1' ? '' : frac(Math.abs(p), Math.abs(q))) + '\\mathbf{I}' : ''))],
        ['Express ' + M('\\mathbf{M}^3') + ' in the form ' + M('a\\mathbf{M} + b\\mathbf{I}') + ' and check your answer by direct calculation.', 3, M('\\mathbf{M}^3 = ' + lin([p * p + q, p * q], ['\\mathbf{M}', '\\mathbf{I}']) + ' = ' + mat(IB.mm(A, IB.mm(A, A))))]
      ]);
    },
    function () {
      var r = pick([2, 3, 4]), N = r * (1 - r), divs = [], i;
      for (i = 1; i <= Math.abs(N); i++) if (N % i === 0) { divs.push(i); divs.push(-i); }
      var b, a; do { b = pick(divs); a = N / b + 1; } while (a === 1 || a === 0 || Math.abs(a) > 9);
      var k = r + ri(1, 3), sol = [nz(-4, 5), nz(-4, 5), nz(-4, 5)], A = [[1, a, 1], [0, k, b], [1, 1, k]], rhs = A.map(function (row) { return dot(row, sol); });
      var eq = function (row, c) { return M(lin(row, ['x', 'y', 'z']) + ' = ' + c); };
      return Q('Consider the system ' + M('x' + tc(a, 'y') + ' + z = 1') + ', ' + M('ky' + tc(b, 'z') + ' = 2') + ', ' + M('x + y + kz = 3') + ', where ' + M('k \\in \\mathbb{R}') + '.', [
        ['Write the system in the form ' + M('\\mathbf{A}\\mathbf{x} = \\mathbf{b}') + ' and show that ' + M('\\det \\mathbf{A} = k^2 - k ' + (N < 0 ? '- ' + (-N) : '+ ' + N)) + '.', 3, M('\\mathbf{A} = ' + mat([[1, a, 1], [0, 'k', b], [1, 1, 'k']])) + '; expand along the first row.'],
        ['Find the values of ' + M('k') + ' for which the system does not have a unique solution.', 2, M('k = ' + (1 - r) + '\\text{ or } k = ' + r)],
        ['When ' + M('k = ' + k) + ' the right-hand sides are changed to ' + rhs.join(', ') + '. Solve the new system.', 3, eq(A[0], rhs[0]) + ', ' + eq(A[1], rhs[1]) + ', ' + eq(A[2], rhs[2]) + ': ' + M('x = ' + sol[0] + ',\\ y = ' + sol[1] + ',\\ z = ' + sol[2])]
      ]);
    }
  ]);

  X('ib-eigen', [
    function () {
      var E = eig2(false), A = E.M;
      return Q('Let ' + M('\\mathbf{M} = ' + mat(A)) + '.', [
        ['Find the eigenvalues of ' + M('\\mathbf{M}') + '.', 3, M(lin([1, -(A[0][0] + A[1][1]), A[0][0] * A[1][1] - A[0][1] * A[1][0]], ['\\lambda^2', '\\lambda', '']) + ' = 0') + ', ' + M('\\lambda = ' + E.l1 + ',\\ ' + E.l2)],
        ['Find an eigenvector for each eigenvalue.', 3, M(vv([1, E.p])) + ' for ' + E.l1 + '; ' + M(vv([1, E.q])) + ' for ' + E.l2],
        ['Hence write ' + M('\\mathbf{M}') + ' in the form ' + M('\\mathbf{P}\\mathbf{D}\\mathbf{P}^{-1}') + ' and find an expression for the top-left entry of ' + M('\\mathbf{M}^n') + '.', 4, M('\\mathbf{P} = ' + mat([[1, 1], [E.p, E.q]]) + ',\\ \\mathbf{D} = ' + mat([[E.l1, 0], [0, E.l2]])) + '; entry ' + (function () { var sgn = E.d < 0 ? -1 : 1, a1 = sgn * E.q, a2 = -sgn * E.p, dd = Math.abs(E.d), top = lin([a1, a2], ['(' + E.l1 + ')^n', '(' + E.l2 + ')^n']); return M(dd === 1 ? top : '\\frac{' + top + '}{' + dd + '}'); })()]
      ]);
    },
    function () {
      var E = eig2(true), A = E.M, x0, y0, al, be;
      do { x0 = ri(5, 30) * 10; y0 = ri(5, 30) * 10; al = (E.q * x0 - y0) / E.d; be = x0 - al; } while (Math.abs(al) < 1 || Math.abs(be) < 1);
      return Q('The numbers of two species, ' + M('x_n') + ' and ' + M('y_n') + ', after ' + M('n') + ' years are modelled by ' + M(vec(['x_{n+1}', 'y_{n+1}']) + ' = ' + mat(A) + vec(['x_n', 'y_n'])) + ', with ' + M('x_0 = ' + x0) + ' and ' + M('y_0 = ' + y0) + '.', [
        ['Show that ' + M(vv([1, E.p])) + ' and ' + M(vv([1, E.q])) + ' are eigenvectors of the matrix and find the corresponding eigenvalues.', 3, M('\\lambda_1 = ' + E.l1 + ',\\ \\lambda_2 = ' + E.l2)],
        ['Write ' + M(vv([x0, y0])) + ' as a combination of the two eigenvectors and hence find an expression for ' + M('x_n') + '.', 4, M(vv([x0, y0]) + ' = ' + s3(al) + vv([1, E.p]) + ' + ' + s3(be) + vv([1, E.q])).replace('+ -', '- ') + '; ' + M('x_n = ' + s3(al) + '(' + E.l1 + ')^n + ' + s3(be) + (E.l2 === 1 ? '' : '(' + E.l2 + ')^n')).replace('+ -', '- ')],
        ['Describe the long-term behaviour of the two populations.', 2, 'Both grow by a factor of about ' + E.l1 + ' each year, with ' + M('y_n : x_n \\to ' + E.p + ' : 1')]
      ]);
    }
  ]);

  /* ================= Topic 2: Functions ================= */
  var LINES = [
    function () {
      var A, B, C, cr;
      do { A = [ri(-5, 0), ri(-4, 2)]; B = [ri(3, 8), ri(-2, 6)]; C = [ri(-3, 6), ri(4, 9)]; cr = (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]); } while (B[1] === A[1] || cr === 0);
      var dx = B[0] - A[0], dy = B[1] - A[1], L2 = dx * dx + dy * dy, tn = (C[0] - A[0]) * dx + (C[1] - A[1]) * dy;
      var F = [fr(A[0] * L2 + tn * dx, L2), fr(A[1] * L2 + tn * dy, L2)], h = Math.abs(cr) / Math.sqrt(L2), rhs = dx * C[0] + dy * C[1];
      return Q('Triangle ' + M('ABC') + ' has vertices ' + M('A' + pt(A[0], A[1])) + ', ' + M('B' + pt(B[0], B[1])) + ' and ' + M('C' + pt(C[0], C[1])) + '.', [
        ['Find the equation of the line through ' + M('C') + ' perpendicular to ' + M('AB') + ', in the form ' + M('ax + by = d') + '.', 3, 'Gradient of ' + M('AB') + ' is ' + M(frac(dy, dx)) + ', so ' + M(leq(dx, dy, rhs))],
        ['Find the coordinates of ' + M('F') + ', the point where this line meets ' + M('AB') + '.', 4, M('F' + pt(fs(F[0]), fs(F[1])))],
        ['Hence find the perpendicular height ' + M('CF') + ' and the area of the triangle.', 3, M('CF = ' + s3(h)) + '; area ' + M('= \\frac{1}{2} \\times ' + s3(Math.sqrt(L2)) + ' \\times ' + s3(h) + ' = ' + num(Math.abs(cr) / 2))]
      ]);
    },
    function () {
      var O = [ri(-2, 3), ri(-2, 3)], offs = BS.shuffle([[3, 4], [-3, 4], [4, -3], [-4, -3], [5, 0], [0, -5], [-5, 0], [4, 3], [-4, 3], [3, -4]]), P;
      for (;;) { P = offs.slice(0, 3); var ok = true; for (var i = 0; i < 3; i++) for (var j = i + 1; j < 3; j++) if (P[i][1] === P[j][1] || P[i][0] === P[j][0]) ok = false; if (ok) break; offs = BS.shuffle(offs); }
      var A = add(O, P[0]), B = add(O, P[1]), C = add(O, P[2]);
      var bis = bisEq;
      return Q('Three villages are at ' + M('A' + pt(A[0], A[1])) + ', ' + M('B' + pt(B[0], B[1])) + ' and ' + M('C' + pt(C[0], C[1])) + '. A mast is to be built the same distance from all three villages.', [
        ['Find the equation of the perpendicular bisector of ' + M('AB') + '.', 3, bis(A, B)],
        ['Find the equation of the perpendicular bisector of ' + M('BC') + '.', 2, bis(B, C)],
        ['Hence find the position of the mast and its distance from each village.', 3, M(pt(O[0], O[1])) + '; distance 5 units']
      ]);
    }
  ];
  X(['sl-lines', 'ib-lines'], LINES);

  var FUNCS = [
    function () {
      var c = nz(-4, 4), s, b; do { s = ri(2, 6); b = s * s - c * c; } while (b === 0);
      return Q('Let ' + M('f(x) = \\frac{kx' + sg(b) + '}{x' + sg(-c) + '}') + ', ' + M('x \\ne ' + c) + ', where ' + M('k') + ' is a constant.', [
        ['Find ' + M('f^{-1}(x)') + ' in terms of ' + M('k') + '.', 3, M('f^{-1}(x) = \\frac{' + c1(c, 'x') + sg(b) + '}{x - k}')],
        ['Find the value of ' + M('k') + ' for which ' + M('f') + ' is its own inverse.', 2, M('k = ' + c)],
        ['For this value of ' + M('k') + ', solve ' + M('f(x) = x') + ' and explain the result graphically.', 3, M('x^2 ' + (2 * c < 0 ? '+ ' + (-2 * c) : '- ' + 2 * c) + 'x ' + (b < 0 ? '+ ' + (-b) : '- ' + b) + ' = 0') + ', ' + M('x = ' + (c - s) + '\\text{ or } ' + (c + s)) + '; a self-inverse graph is symmetric in ' + M('y = x') + ', and these are where it meets that line.']
      ]);
    },
    function () {
      var r = ri(118, 135) / 100, F = ri(3, 8), s = ri(86, 95) / 100, G = ri(2, 5), E = ri(30, 80) * 10, x = (E + G) / (r * s) + F;
      return Q('A bureau converts British pounds to US dollars using ' + M('f(x) = ' + r + '(x - ' + F + ')') + ', where ' + M('x') + ' is the amount in pounds. It converts dollars to euros using ' + M('g(x) = ' + s + 'x - ' + G) + '.', [
        ['Find ' + M('(g \\circ f)(x)') + ' and explain what it represents.', 3, M('(g \\circ f)(x) = ' + s3(r * s) + 'x - ' + s3(r * s * F + G)) + '; euros received for ' + M('x') + ' pounds, via dollars'],
        ['Find ' + M('(g \\circ f)^{-1}(x)') + '.', 2, M('\\frac{x + ' + s3(r * s * F + G) + '}{' + s3(r * s) + '}')],
        ['Find the amount in pounds needed to receive €' + E + ', to the nearest penny.', 2, '£' + d2(x)]
      ]);
    }
  ];
  X(['sl-functions', 'ib-functions'], FUNCS);

  var GRAPHS = [
    function () {
      var a, b, c, m, k, A, B, C, disc;
      do { a = nz(-3, 3); c = nz(-3, 3); b = nz(-6, 6); m = pick([1, -1, 2]); k = ri(-4, 4); A = m; B = k - m * c - a; C = -(k * c + b); disc = B * B - 4 * A * C; } while (b === -a * c || disc <= 0);
      var xs = [(-B - Math.sqrt(disc)) / (2 * A), (-B + Math.sqrt(disc)) / (2 * A)].sort(function (u, v) { return u - v; });
      return Q('Let ' + M('f(x) = \\frac{' + lin([a, b], ['x', '']) + '}{x' + sg(-c) + '}') + ' and ' + M('g(x) = ' + lin([m, k], ['x', ''])) + '.', [
        ['Write down the equations of the asymptotes of the graph of ' + M('y = f(x)') + '.', 2, M('x = ' + c) + ', ' + M('y = ' + a)],
        ['Find the coordinates of the points where the graphs of ' + M('f') + ' and ' + M('g') + ' intersect.', 3, xs.map(function (x) { return M(pt(s3(x), s3(m * x + k))); }).join(', ')],
        ['Hence solve ' + M('f(x) > g(x)') + '.', 3, (function () { var t = function (x) { return (a * x + b) / (x - c) - m * x - k; }, pts = [xs[0], c, xs[1]].sort(function (u, v) { return u - v; }), iv = []; var tests = [pts[0] - 1, (pts[0] + pts[1]) / 2, (pts[1] + pts[2]) / 2, pts[2] + 1]; var lab = ['x < ' + s3(pts[0]), s3(pts[0]) + ' < x < ' + s3(pts[1]), s3(pts[1]) + ' < x < ' + s3(pts[2]), 'x > ' + s3(pts[2])]; tests.forEach(function (x, i) { if (t(x) > 0) iv.push(M(lab[i])); }); return iv.join(' or '); })()]
      ]);
    },
    function () {
      var A = ri(2, 6), b = pick([0.5, 1, 1.5]), C = ri(1, 4), p = ri(2, 5), f = function (x) { return A * Math.exp(-b * x) + C; }, gq = function (x) { return x * x - p; };
      var rs = roots(function (x) { return f(x) - gq(x); }, -6, 8);
      return Q('Let ' + M('f(x) = ' + A + 'e^{-' + (b === 1 ? '' : b) + 'x} + ' + C) + ' and ' + M('g(x) = x^2 - ' + p) + '.', [
        ['Write down the equation of the horizontal asymptote of ' + M('y = f(x)') + ' and the range of ' + M('f') + '.', 2, M('y = ' + C) + '; ' + M('f(x) > ' + C)],
        ['Use technology to find all solutions of ' + M('f(x) = g(x)') + '.', 3, rs.map(function (x) { return M('x = ' + s3(x)); }).join(', ')],
        ['Find the set of values of ' + M('k') + ' for which the equation ' + M('f(x) = k') + ' has exactly one solution.', 2, M('k > ' + C)]
      ]);
    }
  ];
  X(['sl-graphs', 'ib-graphs'], GRAPHS);

  var MODELS = [
    function () {
      var H = ri(70, 110) / 10, L = ri(10, 30) / 10, t1 = ri(1, 4) + pick([0, 0.5]), hp = pick([6, 6.2, 6.25]), t2 = t1 + hp, a = (H - L) / 2, k = (H + L) / 2, P = 2 * hp, b = Math.PI / hp;
      var Dm = Math.round((k + ri(-15, 15) / 10) * 10) / 10, w = Math.acos((Dm - k) / a) / b;
      return Q('The depth of water in a harbour, ' + M('d') + ' metres, ' + M('t') + ' hours after midnight is modelled by ' + M('d(t) = a\\cos(b(t - c)) + e') + '. High tide is ' + d1(H) + ' m at ' + M('t = ' + t1) + ' and the next low tide is ' + d1(L) + ' m at ' + M('t = ' + t2) + '.', [
        ['Find the values of ' + M('a') + ', ' + M('b') + ', ' + M('c') + ' and ' + M('e') + ' (with ' + M('a, b > 0') + ').', 4, M('a = ' + s3(a) + ',\\ b = \\frac{\\pi}{' + hp + '} = ' + s3(b) + ',\\ c = ' + t1 + ',\\ e = ' + s3(k))],
        ['A ship needs at least ' + d1(Dm) + ' m of water. Find the length of time in each tidal cycle for which the ship can be in the harbour.', 4, 'Solve ' + M('d(t) = ' + d1(Dm)) + ': safe from ' + M('t = ' + s3(t1 - w)) + ' to ' + M(s3(t1 + w)) + ', a time of ' + M(s3(2 * w)) + ' hours each cycle of ' + M(s3(P)) + ' hours'],
        ['Find the rate at which the depth is changing at ' + M('t = ' + s3(t1 + hp / 2)) + ', and comment.', 2, M('d\'(t) = -ab\\sin(b(t - c)) = ' + s3(-a * b)) + ' m per hour; the water is falling fastest half-way between high and low tide']
      ]);
    },
    function () {
      var R = ri(18, 24), T0 = ri(85, 98), t1 = ri(5, 12), T1 = ri(Math.round(R + (T0 - R) * 0.45), Math.round(R + (T0 - R) * 0.75)), k = Math.log((T0 - R) / (T1 - R)) / t1, T2 = ri(R + 8, T1 - 5), tt = Math.log((T0 - R) / (T2 - R)) / k;
      return Q('A cup of tea cools in a room at ' + R + '°C. Its temperature ' + M('T') + '°C after ' + M('t') + ' minutes is modelled by ' + M('T = Ae^{-kt} + ' + R) + '. Initially ' + M('T = ' + T0) + ', and after ' + t1 + ' minutes ' + M('T = ' + T1) + '.', [
        ['Find the values of ' + M('A') + ' and ' + M('k') + '.', 4, M('A = ' + (T0 - R)) + ', ' + M('k = \\frac{1}{' + t1 + '}\\ln\\frac{' + (T0 - R) + '}{' + (T1 - R) + '} = ' + s3(k))],
        ['Find the time taken for the tea to cool to ' + T2 + '°C.', 2, M(s3(tt)) + ' minutes'],
        ['Find the rate of cooling when ' + M('t = ' + t1) + '.', 2, M('kAe^{-kt} = k(T - ' + R + ') = ' + s3(k * (T1 - R))) + ' °C per minute'],
        ['Explain why, according to the model, the tea never reaches room temperature.', 1, M('Ae^{-kt} > 0') + ' for all ' + M('t') + ', so ' + M('T > ' + R)]
      ]);
    }
  ];
  X(['sl-models', 'ib-models'], MODELS);

  X('ib-logistic', [
    function () {
      var L = ri(5, 20) * 100, P0 = ri(2, 8) * 10, C = L / P0 - 1, t1 = ri(3, 6), P1 = Math.round(L / (1 + C * Math.exp(-ri(5, 9) / 10 * t1))), k = Math.log(C * P1 / (L - P1)) / t1;
      var t90 = Math.log(9 * C) / k, th = Math.log(C) / k;
      return Q('The number of fish in a lake ' + M('t') + ' years after they are introduced is modelled by ' + M('N(t) = \\frac{' + L + '}{1 + Ce^{-kt}}') + '. Initially there are ' + P0 + ' fish, and after ' + t1 + ' years there are ' + P1 + '.', [
        ['Find the value of ' + M('C') + ' and the value of ' + M('k') + '.', 4, M('C = ' + s3(C) + ',\\ k = ' + s3(k))],
        ['Find the time taken for the number of fish to reach 90% of the carrying capacity.', 2, M(s3(t90)) + ' years'],
        ['The population grows fastest when ' + M('N = ' + (L / 2)) + '. Find when this happens.', 2, M('t = \\frac{\\ln C}{k} = ' + s3(th)) + ' years']
      ]);
    },
    function () {
      var a = ri(10, 30), b = ri(5, 15), xs = [1, 2, 4, 6, 8, 10, 12], ys = xs.map(function (x) { return Math.round((a + b * Math.log(x) + ri(-10, 10) / 10) * 10) / 10; });
      var f = lsq(xs.map(Math.log), ys), x0 = ri(5, 9), Y = Math.round(f.a + f.b * Math.log(ri(15, 25)));
      return Q('The table shows the height ' + M('y') + ' cm of a plant ' + M('x') + ' weeks after planting.' + table(['\\(x\\)'].concat(xs), [['\\(y\\)'].concat(ys.map(d1))]), [
        ['Use technology to find a model of the form ' + M('y = a + b\\ln x') + ', by regression of ' + M('y') + ' on ' + M('\\ln x') + '.', 3, M('y = ' + s3(f.a) + ' + ' + s3(f.b) + '\\ln x')],
        ['Use your model to estimate the height after ' + x0 + ' weeks.', 1, M(s3(f.a + f.b * Math.log(x0))) + ' cm'],
        ['Use your model to estimate when the plant will reach ' + Y + ' cm, and comment on the reliability of this estimate.', 3, M('x = e^{(' + Y + ' - ' + s3(f.a) + ')/' + s3(f.b) + '} = ' + s3(Math.exp((Y - f.a) / f.b))) + ' weeks; unreliable, as this extrapolates beyond the data']
      ]);
    }
  ]);

  X('ib-transform', [
    function () {
      var a = nz(-6, 6), p = pick([2, 3, -2]), h = nz(-4, 4), k = nz(-5, 5), vx = -a / 2, vy = -a * a / 4;
      var gv = [fr(-a + 2 * h, 2), fr(p * -a * a + 4 * k, 4)], diff = (p - 1) * k;
      return Q('Let ' + M('f(x) = x^2' + tc(a, 'x')) + '. The graph of ' + M('y = f(x)') + ' is stretched vertically by scale factor ' + p + ' and then translated by ' + M(vv([h, k])) + ' to give ' + M('y = g(x)') + '.', [
        ['Write down an expression for ' + M('g(x)') + ' in terms of ' + M('f') + ', and expand it.', 3, M('g(x) = ' + p + 'f(x' + sg(-h) + ')' + sg(k)) + ' = ' + M(poly([p, p * (a - 2 * h), p * (h * h - a * h) + k]))],
        ['Find the coordinates of the vertex of the graph of ' + M('g') + '.', 2, M(pt(fs(gv[0]), fs(gv[1])))],
        ['The transformations are applied in the opposite order. Find the vertical distance between the vertices of the two resulting graphs.', 3, 'Translating first gives ' + M(p + '(f(x' + sg(-h) + ')' + sg(k) + ')') + '; the vertices differ by ' + M('|(' + p + ' - 1)(' + k + ')| = ' + Math.abs(diff))]
      ]);
    },
    function () {
      var h = ri(2, 6), k = nz(-3, 3), xi = h - Math.exp(-k);
      return Q('The graph of ' + M('y = \\ln x') + ' is reflected in the ' + M('y') + '-axis and then translated by ' + M(vv([h, k])) + ' to give ' + M('y = g(x)') + '.', [
        ['Find ' + M('g(x)') + ', and state its domain.', 3, M('g(x) = \\ln(' + h + ' - x)' + sg(k)) + ', ' + M('x < ' + h)],
        ['Write down the equation of the vertical asymptote of ' + M('y = g(x)') + '.', 1, M('x = ' + h)],
        ['Find the exact coordinates of the points where the graph crosses the axes.', 3, M('x') + '-axis: ' + M(pt(h + ' - e^{' + (-k) + '}', 0)) + ' ≈ ' + M(pt(s3(xi), 0)) + '; ' + M('y') + '-axis: ' + M(pt(0, '\\ln ' + h + sg(k)))]
      ]);
    }
  ]);

  X('ib-linearise', [
    function () {
      var a = ri(15, 45) / 10, n = pick([1.5, 2.5, -0.5, 0.75, 1.25]), xs = [1, 2, 3, 4, 5, 6], ys = xs.map(function (x) { return Math.round(a * Math.pow(x, n) * (1 + ri(-3, 3) / 100) * 100) / 100; });
      var f = lsq(xs.map(Math.log), ys.map(Math.log)), A = Math.exp(f.a), x0 = 8;
      return Q('The table shows values of ' + M('x') + ' and ' + M('y') + ' from an experiment. It is thought that ' + M('y = ax^n') + '.' + table(['\\(x\\)'].concat(xs), [['\\(y\\)'].concat(ys.map(d2))]), [
        ['Show that if ' + M('y = ax^n') + ', the graph of ' + M('\\ln y') + ' against ' + M('\\ln x') + ' is a straight line, stating its gradient and intercept.', 2, M('\\ln y = n\\ln x + \\ln a') + ': gradient ' + M('n') + ', intercept ' + M('\\ln a')],
        ['Find the equation of the regression line of ' + M('\\ln y') + ' on ' + M('\\ln x') + '.', 3, M(yl('\\ln y', f.b, '\\ln x', f.a))],
        ['Hence find the values of ' + M('a') + ' and ' + M('n') + ', and estimate ' + M('y') + ' when ' + M('x = ' + x0) + '.', 3, M('n = ' + s3(f.b) + ',\\ a = e^{' + s3(f.a) + '} = ' + s3(A)) + '; ' + M('y \\approx ' + s3(A * Math.pow(x0, f.b)))]
      ]);
    },
    function () {
      var a = ri(20, 80), b = ri(105, 135) / 100, x1 = 2, x2 = ri(8, 12), l1 = Math.round(Math.log10(a * Math.pow(b, x1)) * 100) / 100, l2 = Math.round(Math.log10(a * Math.pow(b, x2)) * 100) / 100;
      var m = (l2 - l1) / (x2 - x1), c = l1 - m * x1, A = Math.pow(10, c), B = Math.pow(10, m), Y = Math.round(A * Math.pow(B, 15) / 10) * 10;
      return Q('A scientist models the number of bacteria, ' + M('N') + ' thousand, after ' + M('t') + ' hours by ' + M('N = ab^t') + '. A graph of ' + M('\\log_{10} N') + ' against ' + M('t') + ' is a straight line through the points ' + M(pt(x1, l1)) + ' and ' + M(pt(x2, l2)) + '.', [
        ['Find the equation of the line in the form ' + M('\\log_{10} N = mt + c') + '.', 2, M('\\log_{10} N = ' + s3(m) + 't + ' + s3(c))],
        ['Hence find the values of ' + M('a') + ' and ' + M('b') + ', and interpret ' + M('b') + '.', 4, M('a = 10^{' + s3(c) + '} = ' + s3(A) + ',\\ b = 10^{' + s3(m) + '} = ' + s3(B)) + '; the number is multiplied by ' + s3(B) + ' each hour'],
        ['Find the time at which the model predicts ' + num(Y) + ' thousand bacteria.', 2, M('t = \\frac{\\log_{10}' + Y + ' - ' + s3(c) + '}{' + s3(m) + '} = ' + s3((Math.log10(Y) - c) / m)) + ' hours']
      ]);
    }
  ]);

  /* ================= Topic 3: Geometry and trigonometry ================= */
  var SOLIDS = [
    function () {
      var l = ri(6, 14), w = ri(3, 9), h = ri(3, 10);
      while (w === l) w = ri(3, 9);
      var diag = Math.sqrt(l * l + w * w + h * h), ang = deg(Math.atan(h / Math.sqrt(l * l + w * w)));
      var paths = [Math.sqrt((l + w) * (l + w) + h * h), Math.sqrt((l + h) * (l + h) + w * w), Math.sqrt((w + h) * (w + h) + l * l)], best = Math.min.apply(null, paths);
      return Q('The diagram shows a cuboid ' + M('ABCDEFGH') + ' with ' + M('AB = ' + l) + ' cm, ' + M('BC = ' + w) + ' cm and ' + M('AE = ' + h) + ' cm.' + D.cuboid(l, w, h, true), [
        ['Find the length of the diagonal ' + M('AG') + '.', 2, M('\\sqrt{' + l + '^2 + ' + w + '^2 + ' + h + '^2} = ' + s3(diag)) + ' cm'],
        ['Find the angle between ' + M('AG') + ' and the base ' + M('ABCD') + '.', 2, M('\\tan^{-1}\\frac{' + h + '}{' + s3(Math.sqrt(l * l + w * w)) + '} = ' + s3(ang) + '^\\circ')],
        ['An ant walks from ' + M('A') + ' to ' + M('G') + ' along the outside surface of the cuboid. By considering nets of the cuboid, find the length of the shortest possible path.', 4, 'Unfolding two faces gives ' + paths.map(function (v) { return s3(v); }).join(', ') + ' cm; the shortest is ' + M(s3(best)) + ' cm']
      ]);
    },
    function () {
      var r = ri(15, 40) / 10, V = ri(60, 200), h = (V - 2 / 3 * Math.PI * r * r * r) / (Math.PI * r * r);
      while (h < 2) { V += 50; h = (V - 2 / 3 * Math.PI * r * r * r) / (Math.PI * r * r); }
      var S = 2 * Math.PI * r * h + 2 * Math.PI * r * r, cov = ri(8, 14), tins = Math.ceil(2 * S / cov), cost = ri(18, 35);
      return Q('A grain silo is a cylinder of radius ' + d1(r) + ' m with a hemispherical roof of the same radius. The silo holds ' + V + ' m³.', [
        ['Find the height of the cylindrical part of the silo.', 3, M(V + ' = \\pi(' + d1(r) + ')^2 h + \\frac{2}{3}\\pi(' + d1(r) + ')^3') + ', ' + M('h = ' + s3(h)) + ' m'],
        ['The outside of the silo, but not the base, is to be painted with two coats. Find the area to be painted.', 3, M('2 \\times (2\\pi rh + 2\\pi r^2) = ' + s3(2 * S)) + ' m²'],
        ['Paint is sold in tins costing $' + cost + ', each covering ' + cov + ' m². Find the cost of the paint needed.', 2, tins + ' tins, ' + usd(tins * cost)]
      ]);
    }
  ];
  X(['sl-3d', 'ib-3d'], SOLIDS);

  function trigAmb() {
    var A, a, b, s;
    do { A = ri(25, 55); b = ri(8, 15); a = ri(Math.ceil(b * Math.sin(rad(A))) + 1, b - 1); s = b * Math.sin(rad(A)) / a; } while (a >= b || s >= 0.97 || a <= b * Math.sin(rad(A)));
    var B1 = deg(Math.asin(s)), B2 = 180 - B1, C1 = 180 - A - B1, C2 = 180 - A - B2, ar = function (C) { return 0.5 * a * b * Math.sin(rad(C)); };
    return Q('In triangle ' + M('ABC') + ', ' + M('BC = ' + a) + ' cm, ' + M('AC = ' + b) + ' cm and ' + M('B\\hat{A}C = ' + A + '^\\circ') + '.', [
      ['Show that there are two possible triangles, and find both possible sizes of ' + M('A\\hat{B}C') + '.', 4, M('\\sin B = \\frac{' + b + '\\sin ' + A + '^\\circ}{' + a + '} = ' + s3(s)) + '; ' + M('B = ' + s3(B1) + '^\\circ') + ' or ' + M(s3(B2) + '^\\circ') + ' (both give ' + M('A + B < 180^\\circ') + ')'],
      ['Find the difference between the areas of the two possible triangles.', 4, 'Areas ' + M('\\frac{1}{2}ab\\sin C') + ': ' + s3(ar(C1)) + ' and ' + s3(ar(C2)) + ' cm²; difference ' + M(s3(ar(C1) - ar(C2))) + ' cm²']
    ]);
  }
  function trigQuad() {
    var AB = ri(40, 90), BC = ri(40, 90), B = ri(70, 130), AD = ri(40, 90), CAD = ri(35, 80);
    var AC = Math.sqrt(AB * AB + BC * BC - 2 * AB * BC * Math.cos(rad(B))), CD = Math.sqrt(AC * AC + AD * AD - 2 * AC * AD * Math.cos(rad(CAD))), area = 0.5 * AB * BC * Math.sin(rad(B)) + 0.5 * AC * AD * Math.sin(rad(CAD));
    return Q('A field ' + M('ABCD') + ' is a quadrilateral with ' + M('AB = ' + AB) + ' m, ' + M('BC = ' + BC) + ' m, ' + M('A\\hat{B}C = ' + B + '^\\circ') + ', ' + M('AD = ' + AD) + ' m and ' + M('C\\hat{A}D = ' + CAD + '^\\circ') + '.', [
      ['Find the length of the diagonal ' + M('AC') + '.', 2, M(s3(AC)) + ' m'],
      ['Find the length of ' + M('CD') + '.', 2, M(s3(CD)) + ' m'],
      ['Find the area of the field.', 3, M('\\frac{1}{2}(' + AB + ')(' + BC + ')\\sin ' + B + '^\\circ + \\frac{1}{2}(' + s3(AC) + ')(' + AD + ')\\sin ' + CAD + '^\\circ = ' + s3(area)) + ' m²'],
      ['A farmer says the perimeter is less than ' + Math.round((AB + BC + AD + CD) / 10) * 10 + ' m. Is the farmer correct?', 1, 'Perimeter ' + M(s3(AB + BC + AD + CD)) + ' m, so ' + (AB + BC + AD + CD < Math.round((AB + BC + AD + CD) / 10) * 10 ? 'yes' : 'no')]
    ]);
  }
  function bear1() {
    var d1_ = ri(8, 25), t1 = ri(20, 80), d2 = ri(8, 25), t2 = ri(110, 200);
    var e = d1_ * Math.sin(rad(t1)) + d2 * Math.sin(rad(t2)), n = d1_ * Math.cos(rad(t1)) + d2 * Math.cos(rad(t2)), PR = Math.hypot(e, n), bp = bearing(-e, -n), sp = ri(10, 20);
    var fig = D.bearings([{ x: 0, y: 0, name: 'P' }, { x: d1_ * Math.sin(rad(t1)), y: d1_ * Math.cos(rad(t1)), name: 'Q', seg: d1_ + ' km' }, { x: e, y: n, name: 'R', seg: d2 + ' km' }], ['P', 'Q'], true);
    return Q('A ship sails ' + d1_ + ' km from port ' + M('P') + ' on a bearing of ' + b3(t1).replace('.0', '') + '° to ' + M('Q') + ', then ' + d2 + ' km on a bearing of ' + b3(t2).replace('.0', '') + '° to ' + M('R') + '.' + fig, [
      ['Find the size of angle ' + M('P\\hat{Q}R') + '.', 2, M(180 - (t2 - t1) + '^\\circ')],
      ['Find the distance ' + M('PR') + '.', 2, M(s3(PR)) + ' km'],
      ['Find the bearing of ' + M('P') + ' from ' + M('R') + '.', 3, b3(bp) + '°'],
      ['The ship returns directly to ' + M('P') + ' at ' + sp + ' km h⁻¹. Find the time taken, to the nearest minute.', 1, Math.round(PR / sp * 60) + ' minutes']
    ]);
  }
  function bear2() {
    var a = ri(15, 35), b = ri(20, 45), d = ri(60, 200), h = d / Math.sqrt(1 / Math.pow(Math.tan(rad(a)), 2) + 1 / Math.pow(Math.tan(rad(b)), 2));
    return Q('A vertical mast ' + M('TF') + ' stands on horizontal ground with its foot at ' + M('F') + '. Point ' + M('A') + ' is due south of ' + M('F') + ' and point ' + M('B') + ' is due east of ' + M('F') + ', with ' + M('AB = ' + d) + ' m. The angle of elevation of ' + M('T') + ' is ' + a + '° from ' + M('A') + ' and ' + b + '° from ' + M('B') + '.', [
      ['Write ' + M('AF') + ' and ' + M('BF') + ' in terms of the height ' + M('h') + ' of the mast.', 2, M('AF = \\frac{h}{\\tan ' + a + '^\\circ},\\ BF = \\frac{h}{\\tan ' + b + '^\\circ}')],
      ['Hence find the height of the mast.', 3, M('AF^2 + BF^2 = ' + d + '^2') + ', ' + M('h = ' + s3(h)) + ' m'],
      ['Find the bearing of ' + M('B') + ' from ' + M('A') + '.', 2, b3(deg(Math.atan((h / Math.tan(rad(b))) / (h / Math.tan(rad(a)))))) + '°']
    ]);
  }
  X('sl-trig', [trigAmb, bear1]);
  X('ib-trig', [trigAmb, trigQuad]);
  X('ib-bearings', [bear1, bear2]);

  X('sl-sectors', [
    function () {
      var r = ri(5, 15), t = ri(50, 150), arc = 2 * Math.PI * r * t / 360, ch = 2 * r * Math.sin(rad(t / 2)), seg = Math.PI * r * r * t / 360 - 0.5 * r * r * Math.sin(rad(t));
      return Q('The diagram shows a sector ' + M('OAB') + ' of a circle with centre ' + M('O') + ' and radius ' + r + ' cm. Angle ' + M('A\\hat{O}B = ' + t + '^\\circ') + '. The region between the chord ' + M('AB') + ' and the arc is a segment.' + D.sector(rad(t), r + ' cm', t + '°'), [
        ['Find the length of the chord ' + M('AB') + '.', 2, M(s3(ch)) + ' cm'],
        ['Find the perimeter of the segment.', 2, M(s3(arc) + ' + ' + s3(ch) + ' = ' + s3(arc + ch)) + ' cm'],
        ['Find the area of the segment, and the percentage of the sector that it occupies.', 4, M(s3(seg)) + ' cm²; ' + M(s3(seg / (Math.PI * r * r * t / 360) * 100) + '\\%')]
      ]);
    },
    function () {
      var L = ri(40, 120), t = ri(30, 60), k = pick([0.9, 0.92, 0.95]), arc = 2 * Math.PI * L * t / 360, tot = arc / (1 - k), n = 1;
      while (arc * Math.pow(k, n - 1) >= arc / 4) n++;
      return Q('A pendulum of length ' + L + ' cm swings through an angle of ' + t + '° on its first swing. On each later swing, the length of the arc is ' + Math.round(k * 100) + '% of the previous one.', [
        ['Find the length of the arc travelled on the first swing.', 2, M(s3(arc)) + ' cm'],
        ['Find the total distance travelled by the end of the pendulum in the first 10 swings.', 3, M('\\frac{' + s3(arc) + '(1 - ' + k + '^{10})}{1 - ' + k + '} = ' + s3(arc * (1 - Math.pow(k, 10)) / (1 - k))) + ' cm'],
        ['Find the number of the first swing whose arc is less than a quarter of the first arc, and the maximum total distance the pendulum can travel.', 3, 'Swing ' + n + '; ' + M('\\frac{' + s3(arc) + '}{1 - ' + k + '} = ' + s3(tot)) + ' cm']
      ]);
    }
  ]);

  X('ib-radians', [
    function () {
      var P = ri(10, 30) * 2, r = P / 4, A = r * r;
      return Q('A sector of a circle has radius ' + M('r') + ' cm and angle ' + M('\\theta') + ' radians. Its perimeter is ' + P + ' cm.', [
        ['Show that ' + M('\\theta = \\frac{' + P + ' - 2r}{r}') + ' and that the area of the sector is ' + M('A = ' + (P / 2) + 'r - r^2') + '.', 3, M('2r + r\\theta = ' + P) + '; ' + M('A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}r(' + P + ' - 2r)')],
        ['Find the value of ' + M('r') + ' that maximises the area, and the maximum area.', 3, M('\\frac{\\mathrm{d}A}{\\mathrm{d}r} = ' + (P / 2) + ' - 2r = 0') + ', ' + M('r = ' + num(r)) + ', ' + M('A = ' + num(A)) + ' cm²'],
        ['Find the angle of the sector with maximum area, and state whether it depends on ' + P + '.', 2, M('\\theta = 2') + ' radians, whatever the perimeter']
      ]);
    },
    function () {
      var r = ri(5, 12), d = ri(Math.round(r * 0.6), Math.round(r * 1.5)), th = 2 * Math.acos(d / (2 * r)), lens = r * r * (th - Math.sin(th)), chord = 2 * r * Math.sin(th / 2);
      return Q('Two circles, each of radius ' + r + ' cm, have centres ' + M('A') + ' and ' + M('B') + ' that are ' + d + ' cm apart. The circles meet at ' + M('P') + ' and ' + M('Q') + '.', [
        ['Find the angle ' + M('P\\hat{A}Q') + ' in radians.', 3, M('\\cos\\frac{\\theta}{2} = \\frac{' + d + '}{' + (2 * r) + '}') + ', ' + M('\\theta = ' + s3(th))],
        ['Find the length of the common chord ' + M('PQ') + '.', 2, M(s3(chord)) + ' cm'],
        ['Find the area of the region inside both circles.', 3, 'Two segments: ' + M('2 \\times \\frac{1}{2}(' + r + ')^2(\\theta - \\sin\\theta) = ' + s3(lens)) + ' cm²']
      ]);
    }
  ]);

  var VOR = [
    function () {
      var O = [7, 7], offs = BS.shuffle([[3, 4], [-3, 4], [4, -3], [-4, -3], [5, 0], [0, -5], [-5, 0], [4, 3], [-4, 3], [3, -4], [0, 5], [-3, -4]]), P;
      for (;;) {
        P = offs.slice(0, 3); var ok = true;
        for (var i = 0; i < 3; i++) for (var j = i + 1; j < 3; j++) if (P[i][1] === P[j][1] || P[i][0] === P[j][0]) ok = false;
        // the centre must lie inside the triangle so it is a vertex of the diagram inside the region
        var ang = P.map(function (q) { return Math.atan2(q[1], q[0]); }).sort(function (a, b) { return a - b; });
        if (ang[1] - ang[0] >= Math.PI || ang[2] - ang[1] >= Math.PI || ang[0] + 2 * Math.PI - ang[2] >= Math.PI) ok = false;
        if (ok) break; offs = BS.shuffle(offs);
      }
      var S = P.map(function (q) { return add(O, q); });
      var bis = bisEq;
      return Q('Three hospitals are at ' + M('A' + pt(S[0][0], S[0][1])) + ', ' + M('B' + pt(S[1][0], S[1][1])) + ' and ' + M('C' + pt(S[2][0], S[2][1])) + ', where units are kilometres. The Voronoi diagram for the hospitals is shown.' + D.voronoi(S, ['A', 'B', 'C'], 14, 14), [
        ['Find the equations of the perpendicular bisectors of ' + M('AB') + ' and ' + M('AC') + '.', 4, bis(S[0], S[1]) + '; ' + bis(S[0], S[2])],
        ['Find the coordinates of the vertex of the Voronoi diagram, and its distance from each hospital.', 3, M(pt(7, 7)) + '; 5 km'],
        ['A new clinic is to be built as far as possible from the nearest hospital, within the triangle ' + M('ABC') + '. Explain why the vertex is the best site and state the greatest distance to the nearest hospital.', 2, 'Inside the triangle, the point furthest from its nearest site is the vertex where all three cells meet (the circumcentre); 5 km']
      ]);
    },
    function () {
      var W = 12, H = 10, A, B, cells, area;
      do { A = [ri(1, 5), ri(1, 9)]; B = [ri(7, 11), ri(1, 9)]; } while (A[1] === B[1] || Math.abs(A[1] - B[1]) > 6);
      cells = D.voronoiCells([A, B], W, H);
      var sh = function (c) { var s = 0; for (var i = 0; i < c.length; i++) { var p = c[i], q = c[(i + 1) % c.length]; s += p[0] * q[1] - q[0] * p[1]; } return Math.abs(s) / 2; };
      area = sh(cells[0]);
      var dx = B[0] - A[0], dy = B[1] - A[1], rhs = ((B[0] * B[0] + B[1] * B[1]) - (A[0] * A[0] + A[1] * A[1])) / 2, Hs = [ri(4, 8), ri(1, 9)], dist = Math.abs(dx * Hs[0] + dy * Hs[1] - rhs) / Math.hypot(dx, dy);
      var near = Math.hypot(Hs[0] - A[0], Hs[1] - A[1]) < Math.hypot(Hs[0] - B[0], Hs[1] - B[1]) ? 'A' : 'B';
      return Q('A rectangular park occupies ' + M('0 \\le x \\le ' + W) + ', ' + M('0 \\le y \\le ' + H) + ' (in hundreds of metres). Two ice-cream kiosks are at ' + M('A' + pt(A[0], A[1])) + ' and ' + M('B' + pt(B[0], B[1])) + '. Each visitor goes to the nearer kiosk.' + D.voronoi([A, B], ['A', 'B'], W, H, [[Hs[0], Hs[1], 'V']]), [
        ['Find the equation of the boundary between the two regions.', 3, bisEq(A, B)],
        ['Find the area of the park that is closer to kiosk ' + M('A') + '.', 4, 'The boundary meets the edges of the park; the region is a polygon of area ' + M(s3(area)) + ' (hundred m)², i.e. ' + num(Math.round(area * 10000)) + ' m²'],
        ['A visitor is at ' + M('V' + pt(Hs[0], Hs[1])) + '. State which kiosk they go to, and find how far they are from the boundary.', 3, 'Kiosk ' + M(near) + '; ' + 'distance from ' + M('V') + ' to the line ' + M('ax + by = c') + ' is ' + M('\\frac{|ax_0 + by_0 - c|}{\\sqrt{a^2 + b^2}} = ' + s3(dist)) + ' (hundred m)']
      ]);
    }
  ];
  X(['sl-voronoi', 'ib-voronoi'], VOR);

  X('ib-trig-eq', [
    function () {
      var k, u, v, cv;
      do { k = ri(2, 6); v = pick([-3, -2, 2, 3]); u = nz(-k + 1, k - 1); cv = u / k; } while (gcd(u, k) !== 1);
      var m = k * v + u, n = k + u * v, x1 = Math.acos(cv), x2 = 2 * Math.PI - x1;
      return Q('', [
        ['Show that the equation ' + M(k + '\\sin^2 x ' + (m < 0 ? '- ' + (-m) : '+ ' + m) + '\\cos x = ' + n) + ' can be written as ' + M(k + '\\cos^2 x ' + (m < 0 ? '+ ' + (-m) : '- ' + m) + '\\cos x ' + (n - k < 0 ? '- ' + (k - n) : '+ ' + (n - k)) + ' = 0').replace('+ 0 = 0', '= 0').replace('- 0 = 0', '= 0') + '.', 2, 'Use ' + M('\\sin^2 x = 1 - \\cos^2 x') + ' and rearrange.'],
        ['Hence solve the equation for ' + M('0 \\le x \\le 2\\pi') + '.', 4, M('(' + k + '\\cos x ' + (u < 0 ? '+ ' + (-u) : '- ' + u) + ')(\\cos x ' + (v < 0 ? '+ ' + (-v) : '- ' + v) + ') = 0') + '; ' + M('\\cos x = ' + frac(u, k)) + ' (' + M('\\cos x = ' + v) + ' is impossible), ' + M('x = ' + s3(x1) + ',\\ ' + s3(x2))]
      ]);
    },
    function () {
      var r = ri(15, 40), c = r + ri(2, 5), T = ri(8, 20), Hh = ri(c - r + 5, c + r - 5), w = Math.acos((c - Hh) / r) * T / (2 * Math.PI);
      return Q('A Ferris wheel has radius ' + r + ' m and its centre is ' + c + ' m above the ground. It turns at a constant rate, making one revolution every ' + T + ' minutes. A passenger boards at the lowest point at ' + M('t = 0') + '.', [
        ['Show that the height of the passenger after ' + M('t') + ' minutes is ' + M('h(t) = ' + c + ' - ' + r + '\\cos\\left(\\frac{2\\pi t}{' + T + '}\\right)') + '.', 2, 'Starts at the minimum ' + (c - r) + ' m; amplitude ' + r + ', period ' + T + ', so ' + M('b = \\frac{2\\pi}{' + T + '}')],
        ['Find the times during the first revolution when the passenger is exactly ' + Hh + ' m above the ground.', 3, M('\\cos\\left(\\frac{2\\pi t}{' + T + '}\\right) = ' + frac(c - Hh, r)) + ': ' + M('t = ' + s3(w) + ',\\ ' + s3(T - w)) + ' minutes'],
        ['Find the percentage of each revolution for which the passenger is more than ' + Hh + ' m above the ground.', 2, M('\\frac{' + s3(T - 2 * w) + '}{' + T + '} = ' + s3((T - 2 * w) / T * 100) + '\\%')]
      ]);
    }
  ]);

  var EXA = { 0: ['1', '0'], 60: ['\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}'], 90: ['0', '1'], 120: ['-\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}'], 180: ['-1', '0'], 240: ['-\\frac{1}{2}', '-\\frac{\\sqrt{3}}{2}'], 270: ['0', '-1'], 300: ['\\frac{1}{2}', '-\\frac{\\sqrt{3}}{2}'], 30: ['\\frac{\\sqrt{3}}{2}', '\\frac{1}{2}'], 150: ['-\\frac{\\sqrt{3}}{2}', '\\frac{1}{2}'], 210: ['-\\frac{\\sqrt{3}}{2}', '-\\frac{1}{2}'], 330: ['\\frac{\\sqrt{3}}{2}', '-\\frac{1}{2}'] };
  function neg(s) { return s === '0' ? '0' : s.charAt(0) === '-' ? s.slice(1) : '-' + s; }
  X('ib-mat-transform', [
    function () {
      var maps = [
        ['a reflection in the line ' + M('y = x'), [[0, 1], [1, 0]]], ['a reflection in the ' + M('x') + '-axis', [[1, 0], [0, -1]]], ['a rotation of 90° anticlockwise about the origin', [[0, -1], [1, 0]]], ['a reflection in the line ' + M('y = -x'), [[0, -1], [-1, 0]]]
      ], k = ri(2, 4), T1 = pick(maps), T2 = pick([['a horizontal stretch with scale factor ' + k, [[k, 0], [0, 1]]], ['a vertical stretch with scale factor ' + k, [[1, 0], [0, k]]], ['an enlargement with scale factor ' + k + ' about the origin', [[k, 0], [0, k]]]]);
      var Mx = IB.mm(T2[1], T1[1]), dt = Mx[0][0] * Mx[1][1] - Mx[0][1] * Mx[1][0], P = [[0, 0], [ri(2, 5), 0], [ri(0, 3), ri(2, 4)]], ar = Math.abs(P[1][0] * P[2][1]) / 2;
      var img = P.map(function (p) { return '(' + (Mx[0][0] * p[0] + Mx[0][1] * p[1]) + ',\\ ' + (Mx[1][0] * p[0] + Mx[1][1] * p[1]) + ')'; });
      var inv = [[Mx[1][1], -Mx[0][1]], [-Mx[1][0], Mx[0][0]]].map(function (r) { return r.map(function (v) { return frac(v, dt); }); });
      return Q('A transformation ' + M('T') + ' consists of ' + T1[0] + ' followed by ' + T2[0] + '. Triangle ' + M('OPQ') + ' has vertices ' + M('O(0,\\ 0)') + ', ' + M('P' + pt(P[1][0], P[1][1])) + ' and ' + M('Q' + pt(P[2][0], P[2][1])) + '.', [
        ['Find the matrix ' + M('\\mathbf{T}') + ' that represents the combined transformation.', 3, M('\\mathbf{T} = ' + mat(T2[1]) + mat(T1[1]) + ' = ' + mat(Mx))],
        ['Find the coordinates of the image of triangle ' + M('OPQ') + ', and its area.', 3, img.map(M).join(', ') + '; area ' + M('|\\det \\mathbf{T}| \\times ' + num(ar) + ' = ' + num(Math.abs(dt) * ar))],
        ['Find the matrix of the transformation that maps the image back onto ' + M('OPQ') + ', and explain why the order of the original transformations matters.', 3, M('\\mathbf{T}^{-1} = ' + mat(inv)) + '; matrix multiplication is not commutative, and here ' + M(mat(T1[1]) + mat(T2[1]) + ' = ' + mat(IB.mm(T1[1], T2[1]))) + (JSON.stringify(IB.mm(T1[1], T2[1])) === JSON.stringify(Mx) ? ', which happens to be equal in this case' : ', which is different')]
      ]);
    },
    function () {
      var al = pick([0, 30, 60]), be = pick([30, 60, 90, 120, 150].filter(function (v) { return v > al; })), r1 = EXA[2 * al % 360], r2 = EXA[2 * be % 360], rot = (2 * (be - al)) % 360, R = EXA[rot];
      var refl = function (e) { return mat([[e[0], e[1]], [e[1], neg(e[0])]]); };
      return Q('The matrix ' + M('\\begin{pmatrix} \\cos 2\\theta & \\sin 2\\theta \\\\ \\sin 2\\theta & -\\cos 2\\theta \\end{pmatrix}') + ' represents a reflection in the line through the origin at angle ' + M('\\theta') + ' to the positive ' + M('x') + '-axis.', [
        ['Write down, with exact values, the matrices ' + M('\\mathbf{A}') + ' and ' + M('\\mathbf{B}') + ' for reflections in the lines at ' + al + '° and ' + be + '° to the ' + M('x') + '-axis.', 2, M('\\mathbf{A} = ' + refl(r1) + ',\\ \\mathbf{B} = ' + refl(r2))],
        ['Find ' + M('\\mathbf{BA}') + ' and describe fully the single transformation it represents.', 4, M('\\mathbf{BA} = ' + mat([[R[0], neg(R[1])], [R[1], R[0]]])) + ': an anticlockwise rotation of ' + rot + '° about the origin'],
        ['Without further calculation, describe the transformation ' + M('\\mathbf{AB}') + '.', 1, (rot === 180 ? 'The same rotation of 180° about the origin (' + M('\\mathbf{AB} = (\\mathbf{BA})^{-1}') + ')' : 'A rotation of ' + rot + '° clockwise about the origin (the inverse of ' + M('\\mathbf{BA}') + ')')]
      ]);
    }
  ]);

  X('ib-vectors', [
    function () {
      var P, b, d, l0, m0, a, c;
      do { P = [ri(-4, 6), ri(-4, 6), ri(-3, 5)]; b = [nz(-3, 3), nz(-3, 3), ri(-2, 3)]; d = [nz(-3, 3), ri(-2, 3), nz(-3, 3)]; } while (norm(cross(b, d)) === 0);
      l0 = nz(-3, 3); m0 = nz(-3, 3); a = add(P, b, -l0); c = add(P, d, -m0);
      var ang = deg(Math.acos(Math.abs(dot(b, d)) / (norm(b) * norm(d))));
      return Q('Line ' + M('L_1') + ' has equation ' + M('\\mathbf{r} = ' + vv(a) + ' + \\lambda' + vv(b)) + ' and line ' + M('L_2') + ' has equation ' + M('\\mathbf{r} = ' + vv(c) + ' + \\mu' + vv(d)) + '.', [
        ['Show that the lines intersect, and find the coordinates of the point of intersection.', 5, M('\\lambda = ' + l0 + ',\\ \\mu = ' + m0) + ' satisfy all three equations; the point is ' + M('(' + P.join(',\\ ') + ')')],
        ['Find the acute angle between the lines.', 3, M('\\cos\\theta = \\frac{|' + dot(b, d) + '|}{\\sqrt{' + dot(b, b) + '}\\sqrt{' + dot(d, d) + '}}') + ', ' + M('\\theta = ' + s3(ang) + '^\\circ')],
        ['Find a vector perpendicular to both lines.', 2, M(vv((function (c) { var g_ = c.reduce(function (a, v) { return gcd(a, v); }, 0) || 1; if (c[0] < 0 || (c[0] === 0 && c[1] < 0)) g_ = -g_; return c.map(function (v) { return v / g_; }); })(cross(b, d))))]
      ]);
    },
    function () {
      var a = [ri(-3, 4), ri(-3, 4), ri(-3, 4)], b, n, t0 = nz(-3, 3), k = nz(-2, 2);
      do { b = [nz(-3, 3), ri(-2, 3), nz(-3, 3)]; n = cross(b, [ri(-2, 2), nz(-2, 2), ri(-2, 2)]); } while (norm(n) === 0);
      var g = Math.abs(n.reduce(gcd)); n = n.map(function (v) { return v / g * k; });
      var F = add(a, b, t0), Qp = add(F, n);
      return Q('The line ' + M('L') + ' has equation ' + M('\\mathbf{r} = ' + vv(a) + ' + t' + vv(b)) + '. The point ' + M('Q') + ' has coordinates ' + M('(' + Qp.join(',\\ ') + ')') + '.', [
        ['Write down the vector ' + M('\\overrightarrow{QF}') + ' where ' + M('F') + ' is the general point on ' + M('L') + ' with parameter ' + M('t') + '.', 2, M('\\overrightarrow{QF} = ' + vec(a.map(function (v, i) { return lin([b[i], v - Qp[i]], ['t', '']); })))],
        ['Find the value of ' + M('t') + ' for which ' + M('QF') + ' is perpendicular to ' + M('L') + ', and the coordinates of ' + M('F') + '.', 4, M('\\overrightarrow{QF} \\cdot ' + vv(b) + ' = 0') + ' gives ' + M('t = ' + t0) + '; ' + M('F(' + F.join(',\\ ') + ')')],
        ['Hence find the shortest distance from ' + M('Q') + ' to ' + M('L') + '.', 2, M('|\\overrightarrow{QF}| = \\sqrt{' + dot(n, n) + '} = ' + s3(norm(n)))]
      ]);
    }
  ]);

  X('ib-vec-kinematics', [
    function () {
      var a, u, b, v, Dv, Wv, t;
      do { a = [ri(-10, 0), ri(-10, 0)]; b = [ri(5, 20), ri(0, 15)]; u = [ri(2, 8), ri(1, 7)]; v = [ri(-6, 2), ri(-4, 4)]; Dv = add(b, a, -1); Wv = add(v, u, -1); t = -dot(Dv, Wv) / dot(Wv, Wv); } while (!(t > 0.5 && t < 6) || dot(Wv, Wv) === 0);
      var dmin = norm(add(Dv, Wv, t));
      return Q('Two boats ' + M('A') + ' and ' + M('B') + ' move with constant velocities. Their positions in kilometres ' + M('t') + ' hours after noon are ' + M('\\mathbf{r}_A = ' + vv(a) + ' + t' + vv(u)) + ' and ' + M('\\mathbf{r}_B = ' + vv(b) + ' + t' + vv(v)) + '.', [
        ['Find the speed of each boat.', 2, M('A') + ': ' + s3(norm(u)) + ' km h⁻¹; ' + M('B') + ': ' + s3(norm(v)) + ' km h⁻¹'],
        ['Show that the displacement of ' + M('B') + ' from ' + M('A') + ' at time ' + M('t') + ' is ' + M(vec([lin([Wv[0], Dv[0]], ['t', '']), lin([Wv[1], Dv[1]], ['t', ''])])) + '.', 2, M('\\mathbf{r}_B - \\mathbf{r}_A')],
        ['Find the time at which the boats are closest together, and the least distance between them.', 5, 'Minimise ' + M('|\\mathbf{r}_B - \\mathbf{r}_A|^2') + ': ' + M('t = ' + s3(t)) + ' h; least distance ' + M(s3(dmin)) + ' km']
      ]);
    },
    function () {
      var p, v, s, A, B, C, t;
      do { p = [ri(8, 25), ri(5, 25)]; v = [ri(-6, 6), ri(-6, 6)]; s = ri(8, 18); A = dot(v, v) - s * s; B = 2 * dot(p, v); C = dot(p, p); t = (-B - Math.sqrt(B * B - 4 * A * C)) / (2 * A); } while (!(t > 0) || norm(v) === 0);
      var P = add(p, v, t), br = bearing(P[0], P[1]);
      return Q('At noon a speedboat ' + M('S') + ' is at the origin and a yacht ' + M('Y') + ' is at ' + M(vv(p)) + ' km, where ' + M(vv([1, 0])) + ' is east and ' + M(vv([0, 1])) + ' is north. The yacht moves with constant velocity ' + M(vv(v)) + ' km h⁻¹. The speedboat travels at ' + s + ' km h⁻¹ in a straight line to intercept the yacht as soon as possible.', [
        ['Write down the position of the yacht at time ' + M('t') + ' hours after noon.', 1, M(vec([lin([v[0], p[0]], ['t', '']), lin([v[1], p[1]], ['t', ''])]))],
        ['Find the time at which the speedboat meets the yacht.', 4, M('|\\mathbf{r}_Y|^2 = (' + s + 't)^2') + ': ' + M(lin([A, B, C], ['t^2', 't', '']) + ' = 0') + ', ' + M('t = ' + s3(t)) + ' h'],
        ['Find the bearing on which the speedboat should travel.', 2, b3(br) + '°']
      ]);
    }
  ]);

  X('ib-vec-product', [
    function () {
      var A = [ri(-2, 3), ri(-2, 3), ri(-2, 3)], AB, AC, AD, n;
      do { AB = [ri(-3, 4), ri(-3, 4), ri(-3, 4)]; AC = [ri(-3, 4), ri(-3, 4), ri(-3, 4)]; AD = [ri(-3, 4), ri(-3, 4), ri(1, 5)]; n = cross(AB, AC); } while (norm(n) === 0 || dot(n, AD) === 0);
      var B = add(A, AB), C = add(A, AC), Dp = add(A, AD), V = Math.abs(dot(n, AD)) / 6;
      return Q('The points ' + M('A(' + A.join(',\\ ') + ')') + ', ' + M('B(' + B.join(',\\ ') + ')') + ', ' + M('C(' + C.join(',\\ ') + ')') + ' and ' + M('D(' + Dp.join(',\\ ') + ')') + ' are the vertices of a tetrahedron.', [
        ['Find ' + M('\\overrightarrow{AB} \\times \\overrightarrow{AC}') + '.', 2, M(vv(n))],
        ['Hence find the area of triangle ' + M('ABC') + '.', 2, M('\\frac{1}{2}\\sqrt{' + dot(n, n) + '} = ' + s3(norm(n) / 2))],
        ['Find the height of ' + M('D') + ' above the plane ' + M('ABC') + ', and hence the volume of the tetrahedron.', 4, 'Height ' + M('\\frac{|' + vv(n) + ' \\cdot ' + vv(AD) + '|}{\\sqrt{' + dot(n, n) + '}} = ' + s3(Math.abs(dot(n, AD)) / norm(n))) + '; volume ' + M('\\frac{1}{3} \\times \\text{area} \\times \\text{height} = ' + fs(fr(Math.abs(dot(n, AD)), 6)))]
      ]);
    },
    function () {
      var F, d;
      do { F = [ri(-4, 8), ri(-4, 8), ri(-3, 6)]; d = [ri(1, 9), ri(-3, 6), ri(-2, 4)]; } while (norm(cross(F, d)) === 0 || dot(F, d) <= 0);
      var W = dot(F, d), ang = deg(Math.acos(W / (norm(F) * norm(d)))), perp = norm(cross(F, d)) / norm(d);
      return Q('A constant force ' + M('\\mathbf{F} = ' + vv(F)) + ' N moves a particle through a displacement ' + M('\\mathbf{d} = ' + vv(d)) + ' m.', [
        ['Find the work done by the force, ' + M('\\mathbf{F} \\cdot \\mathbf{d}') + '.', 2, M(W) + ' J'],
        ['Find the angle between the force and the displacement.', 2, M(s3(ang) + '^\\circ')],
        ['Find the magnitude of the component of the force perpendicular to the displacement, using a vector product.', 3, M('\\frac{|\\mathbf{F} \\times \\mathbf{d}|}{|\\mathbf{d}|} = \\frac{\\sqrt{' + dot(cross(F, d), cross(F, d)) + '}}{\\sqrt{' + dot(d, d) + '}} = ' + s3(perp)) + ' N']
      ]);
    }
  ]);

  var PENT = [{ x: 0.5, y: 0, n: 'A' }, { x: 1, y: 0.38, n: 'B' }, { x: 0.82, y: 1, n: 'C' }, { x: 0.18, y: 1, n: 'D' }, { x: 0, y: 0.38, n: 'E' }];
  X('ib-graph-theory', [
    function () {
      var E, A, deg_, odd;
      do {
        E = []; A = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
        for (var i = 0; i < 5; i++) for (var j = i + 1; j < 5; j++) if (Math.random() < 0.55) { E.push([i, j]); A[i][j] = A[j][i] = 1; }
        deg_ = A.map(sum); odd = deg_.filter(function (v) { return v % 2; }).length;
      } while (deg_.some(function (v) { return v === 0; }) || E.length < 6 || E.length > 8);
      var A3 = IB.mpow(A, 3), S = [IB.mpow(A, 1), IB.mpow(A, 2), A3].reduce(function (s, m) { return s.map(function (r, i) { return r.map(function (v, j) { return v + m[i][j]; }); }); }), u = ri(0, 4), w = (u + ri(1, 4)) % 5, nm = 'ABCDE';
      return Q('The graph ' + M('G') + ' is shown.' + D.network(PENT, E), [
        ['Write down the adjacency matrix ' + M('\\mathbf{M}') + ' of ' + M('G') + ', in the order ' + M('A, B, C, D, E') + '.', 2, M(mat(A))],
        ['Find the number of walks of length 3 from ' + M(nm[u]) + ' to ' + M(nm[w]) + '.', 2, M('(\\mathbf{M}^3)_{' + nm[u] + nm[w] + '} = ' + A3[u][w])],
        ['Find the number of walks from ' + M(nm[u]) + ' to ' + M(nm[w]) + ' of length at most 3.', 2, M('\\mathbf{M} + \\mathbf{M}^2 + \\mathbf{M}^3') + ' gives ' + S[u][w]],
        ['Determine whether ' + M('G') + ' has an Eulerian circuit, an Eulerian trail, or neither, giving a reason.', 2, 'Degrees ' + deg_.join(', ') + ': ' + (odd === 0 ? 'all even, so an Eulerian circuit' : odd === 2 ? 'exactly two odd vertices, so an Eulerian trail (not a circuit)' : odd + ' odd vertices, so neither')]
      ]);
    },
    function () {
      var n = pick([5, 6, 7]), e = n * (n - 1) / 2, f = 1; for (var i = 2; i < n; i++) f *= i;
      return Q('Consider the complete graph ' + M('K_{' + n + '}') + '.', [
        ['Find the number of edges of ' + M('K_{' + n + '}') + '.', 1, M('\\frac{' + n + ' \\times ' + (n - 1) + '}{2} = ' + e)],
        ['For a simple connected planar graph with ' + M('v \\ge 3') + ', ' + M('e \\le 3v - 6') + '. Use this to show that ' + M('K_{' + n + '}') + ' is not planar.', 2, M(e + ' > 3(' + n + ') - 6 = ' + (3 * n - 6))],
        ['Find the number of different Hamiltonian cycles in ' + M('K_{' + n + '}') + ', counting a cycle and its reverse as the same.', 2, M('\\frac{(' + n + ' - 1)!}{2} = ' + (f / 2))],
        ['Find the number of walks of length 2 between two different vertices of ' + M('K_{' + n + '}') + ', and the number of walks of length 2 from a vertex back to itself.', 3, M(n - 2) + ' and ' + M(n - 1) + ' (the entries of ' + M('\\mathbf{M}^2') + ')']
      ]);
    }
  ]);

  function floyd(n, W) { var Dm = W.map(function (r) { return r.slice(); }); for (var k = 0; k < n; k++) for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) if (Dm[i][k] + Dm[k][j] < Dm[i][j]) Dm[i][j] = Dm[i][k] + Dm[k][j]; return Dm; }
  X('ib-graph-algorithms', [
    function () {
      var pts = [], W, nm = 'ABCDE';
      for (var i = 0; i < 5; i++) pts.push([ri(0, 20), ri(0, 20)]);
      W = pts.map(function (p) { return pts.map(function (q) { return Math.round(Math.hypot(p[0] - q[0], p[1] - q[1])) + ri(1, 3); }); });
      for (i = 0; i < 5; i++) { W[i][i] = 0; for (var j = 0; j < i; j++) W[i][j] = W[j][i]; }
      // nearest neighbour from A
      var vis = [0], tot = 0, cur = 0;
      while (vis.length < 5) { var best = -1; for (j = 0; j < 5; j++) if (vis.indexOf(j) < 0 && (best < 0 || W[cur][j] < W[cur][best])) best = j; tot += W[cur][best]; vis.push(best); cur = best; }
      tot += W[cur][0];
      // deleted vertex A: MST of B..E (Prim) + two smallest from A
      var inT = [1], mst = 0;
      while (inT.length < 4) { var bw = 1e9, bj = -1; inT.forEach(function (u) { for (var k = 1; k < 5; k++) if (inT.indexOf(k) < 0 && W[u][k] < bw) { bw = W[u][k]; bj = k; } }); mst += bw; inT.push(bj); }
      var fromA = W[0].slice(1).sort(function (a, b) { return a - b; }), lb = mst + fromA[0] + fromA[1];
      var rows = W.map(function (r, i) { return ['\\(' + nm[i] + '\\)'].concat(r.map(function (v, j) { return i === j ? '–' : v; })); });
      return Q('A salesperson must visit five towns. The table shows the travel times, in minutes, between them.' + table([''].concat(nm.split('').map(function (c) { return '\\(' + c + '\\)'; })), rows), [
        ['Use the nearest neighbour algorithm, starting at ' + M('A') + ', to find an upper bound for the travelling salesperson problem.', 3, 'Route ' + vis.map(function (k) { return nm[k]; }).join('') + 'A, total ' + tot + ' minutes'],
        ['By deleting vertex ' + M('A') + ', find a lower bound.', 4, 'Minimum spanning tree of ' + M('BCDE') + ' has weight ' + mst + '; add the two shortest edges from ' + M('A') + ' (' + fromA[0] + ', ' + fromA[1] + '): lower bound ' + lb],
        ['Write down an inequality for the length ' + M('T') + ' of the optimal route.', 1, M(lb + ' \\le T \\le ' + tot)]
      ]);
    },
    function () {
      var nodes = [{ x: 0, y: 0.5, n: 'A' }, { x: 0.33, y: 0, n: 'B' }, { x: 0.67, y: 0, n: 'C' }, { x: 1, y: 0.5, n: 'D' }, { x: 0.67, y: 1, n: 'E' }, { x: 0.33, y: 1, n: 'F' }];
      var cand = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 5], [2, 4], [1, 4], [0, 3]], E, deg_, odd, n = 6, nm = 'ABCDEF';
      do {
        E = cand.filter(function (e, i) { return i < 6 || Math.random() < 0.45; }).filter(function (e) { return !(e[0] === 0 && e[1] === 3) || Math.random() < 0.3; });
        if (E.some(function (e) { return e[0] === 1 && e[1] === 4; }) && E.some(function (e) { return e[0] === 2 && e[1] === 4; })) E = E.filter(function (e) { return !(e[0] === 1 && e[1] === 4); });
        if (E.some(function (e) { return e[0] === 0 && e[1] === 3; })) E = E.filter(function (e) { return !(e[0] === 1 && e[1] === 4) && !(e[0] === 2 && e[1] === 4) && !(e[0] === 1 && e[1] === 5); });
        deg_ = [0, 0, 0, 0, 0, 0]; E.forEach(function (e) { deg_[e[0]]++; deg_[e[1]]++; });
        odd = []; deg_.forEach(function (v, i) { if (v % 2) odd.push(i); });
      } while (odd.length !== 4);
      E = E.map(function (e) { return [e[0], e[1], ri(3, 15)]; });
      var Wm = []; for (var i = 0; i < n; i++) { Wm.push([]); for (var j = 0; j < n; j++) Wm[i].push(i === j ? 0 : 1e9); }
      E.forEach(function (e) { Wm[e[0]][e[1]] = Wm[e[1]][e[0]] = e[2]; });
      var Dm = floyd(n, Wm), tot = sum(E.map(function (e) { return e[2]; })), o = odd, pairs = [[[o[0], o[1]], [o[2], o[3]]], [[o[0], o[2]], [o[1], o[3]]], [[o[0], o[3]], [o[1], o[2]]]];
      var pv = pairs.map(function (p) { return Dm[p[0][0]][p[0][1]] + Dm[p[1][0]][p[1][1]]; }), best = Math.min.apply(null, pv);
      var single = Math.min.apply(null, [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]].map(function (q) { return Dm[o[q[0]]][o[q[1]]]; }));
      var lab = function (p) { return nm[p[0]] + nm[p[1]]; };
      return Q('The weighted graph shows the lengths, in hundreds of metres, of the paths in a park. A warden must walk along every path at least once.' + D.network(nodes, E), [
        ['Find the total length of all the paths, and list the vertices of odd degree.', 2, tot + '; ' + odd.map(function (k) { return M(nm[k]); }).join(', ')],
        ['Find the length of the shortest route that starts and finishes at ' + M('A') + ' and walks every path.', 4, 'Pairings: ' + pairs.map(function (p, i) { return lab(p[0]) + ' + ' + lab(p[1]) + ' = ' + pv[i]; }).join('; ') + '. Least is ' + best + ', so route length ' + M(tot + ' + ' + best + ' = ' + (tot + best))],
        ['The warden may instead start and finish at any two different vertices. Find the length of the shortest possible route, and state where it should start and finish.', 3, (function () { var bp = null, bv = 1e9; [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]].forEach(function (q) { var rest = [0, 1, 2, 3].filter(function (z) { return q.indexOf(z) < 0; }); var v = Dm[o[rest[0]]][o[rest[1]]]; if (v < bv) { bv = v; bp = q; } }); return 'Repeat only the shortest connection between one pair of odd vertices (' + bv + '), starting and finishing at the other two, ' + M(nm[o[bp[0]]]) + ' and ' + M(nm[o[bp[1]]]) + ': length ' + M(tot + bv); })()]
      ]);
    }
  ]);

  /* ================= Topic 4: Statistics and probability ================= */
  var DESC = [
    function () {
      var n1 = ri(12, 30), m1 = ri(50, 70), s1 = ri(5, 12), n2 = ri(12, 30), m2 = ri(55, 80), s2 = ri(4, 12);
      var N = n1 + n2, mu = (n1 * m1 + n2 * m2) / N, ex2 = (n1 * (s1 * s1 + m1 * m1) + n2 * (s2 * s2 + m2 * m2)) / N, sd = Math.sqrt(ex2 - mu * mu), a = pick([1.1, 1.2, 0.9]), b = ri(2, 6);
      return Q('Two classes sat the same test. Class ' + M('A') + ' had ' + n1 + ' students with mean ' + m1 + ' and standard deviation ' + s1 + '. Class ' + M('B') + ' had ' + n2 + ' students with mean ' + m2 + ' and standard deviation ' + s2 + '. (Standard deviations are population values, ' + M('\\sigma') + '.)', [
        ['Find the mean mark of all ' + N + ' students.', 2, M(s3(mu))],
        ['Using ' + M('\\sum x^2 = n(\\sigma^2 + \\bar{x}^2)') + ' for each class, find the standard deviation of all ' + N + ' marks.', 4, M('\\sum x^2 = ' + (n1 * (s1 * s1 + m1 * m1)) + ' + ' + (n2 * (s2 * s2 + m2 * m2))) + '; ' + M('\\sigma = ' + s3(sd))],
        ['The marks are scaled using ' + M('y = ' + a + 'x + ' + b) + '. Find the mean and standard deviation of the scaled marks.', 2, 'Mean ' + M(s3(a * mu + b)) + ', standard deviation ' + M(s3(a * sd))]
      ]);
    },
    function () {
      var w = 10, fs_ = [ri(3, 9), ri(8, 16), ri(12, 22), ri(10, 20), ri(5, 12), ri(2, 7)], j = ri(1, 4), mids = fs_.map(function (_, i) { return w * i + w / 2; });
      var N = sum(fs_), mean = dot(fs_, mids) / N, mr = Math.round(mean * 100) / 100, sfx = dot(fs_, mids) - fs_[j] * mids[j], sf = N - fs_[j], pp = (sfx - mr * sf) / (mr - mids[j]);
      var sd = Math.sqrt(dot(fs_, mids.map(function (x) { return x * x; })) / N - mean * mean), cum = 0, mc = -1;
      fs_.forEach(function (f, i) { cum += f; if (mc < 0 && cum >= N / 2) mc = i; });
      var head = ['Time, \\(t\\) (min)'].concat(fs_.map(function (_, i) { return '\\(' + (w * i) + ' \\le t < ' + (w * i + w) + '\\)'; })), row = ['Frequency'].concat(fs_.map(function (f, i) { return i === j ? '\\(p\\)' : f; }));
      if (Math.round(pp) !== fs_[j]) return DESC[1]();
      return Q('The table shows the times taken by a group of people to complete a puzzle. The estimated mean time is ' + dp(mr, 2) + ' minutes.' + table(head, [row]), [
        ['Find the value of ' + M('p') + '.', 4, M('\\frac{' + sfx + ' + ' + mids[j] + 'p}{' + sf + ' + p} = ' + dp(mr, 2)) + ', ' + M('p = ' + fs_[j])],
        ['Estimate the standard deviation of the times.', 2, M(s3(sd)) + ' minutes'],
        ['Write down the class that contains the median, and explain why the mean is ' + (mean > (w * mc + w / 2) ? 'greater' : 'less') + ' than the mid-value of that class.', 2, M((w * mc) + ' \\le t < ' + (w * mc + w)) + '; the distribution is ' + (mean > (w * mc + w / 2) ? 'positively' : 'negatively') + ' skewed, which pulls the mean that way']
      ]);
    }
  ];
  X(['sl-descriptive', 'ib-descriptive'], DESC);

  function dataset(n, b, a, noise, lo, hi) {
    var xs, ys, pool = []; for (var v = lo; v <= hi; v++) pool.push(v);
    do {
      xs = BS.shuffle(pool).slice(0, n).sort(function (u, w) { return u - w; });
      ys = xs.map(function (x) { return Math.round(a + b * x + ri(-noise * 10, noise * 10) / 10); });
    } while (new Set(ys).size < n || Math.abs(IB.pearson(xs, ys).r) < 0.5);
    return { xs: xs, ys: ys };
  }
  var REG = [
    function () {
      var pos = Math.random() < 0.6, d = pos ? dataset(8, ri(20, 35) / 10, ri(25, 40), 9, 2, 18) : dataset(8, -ri(15, 30) / 10, ri(75, 90), 9, 2, 18), xs = d.xs, ys = d.ys, r = IB.pearson(xs, ys).r, f = lsq(xs, ys), rs = IB.pearson(IB.ranks(xs), IB.ranks(ys)).r, x0 = Math.round((xs[2] + xs[5]) / 2), x1 = xs[7] + 15;
      return Q('The table shows the number of hours, ' + M('x') + ', that eight students spent ' + (pos ? 'revising' : 'on social media') + ' in the week before a test, and their test score, ' + M('y') + '.' + table(['\\(x\\)'].concat(xs), [['\\(y\\)'].concat(ys)]), [
        ['Find the Pearson correlation coefficient and describe the correlation.', 2, M('r = ' + s3(r)) + '; ' + (Math.abs(r) > 0.75 ? 'strong' : Math.abs(r) > 0.45 ? 'moderate' : 'weak') + ' ' + (r > 0 ? 'positive' : 'negative')],
        ['Find the equation of the regression line of ' + M('y') + ' on ' + M('x') + ', and interpret its gradient.', 3, M(yl('y', f.b, 'x', f.a)) + '; each extra hour changes the score by about ' + s3(f.b)],
        ['Estimate the score for ' + x0 + ' hours. Explain why it would not be appropriate to use the line for ' + x1 + ' hours.', 2, M(s3(f.a + f.b * x0)) + '; ' + x1 + ' is outside the data (extrapolation)'],
        ['Find Spearman’s rank correlation coefficient, and explain what it measures that ' + M('r') + ' does not.', 3, M('r_s = ' + s3(rs)) + '; it measures any monotonic relationship, not only a linear one']
      ]);
    },
    function () {
      var d = dataset(7, ri(25, 45) / 10, -ri(20, 40), 8, 18, 40), xs = d.xs, ys = d.ys, f = lsq(xs, ys), g2 = lsq(ys, xs), mx = IB.mean(xs), my = IB.mean(ys), Y0 = Math.round((ys[1] + ys[4]) / 2);
      return Q('The table shows the length ' + M('x') + ' cm and the mass ' + M('y') + ' g of seven fish.' + table(['\\(x\\)'].concat(xs), [['\\(y\\)'].concat(ys)]), [
        ['Find the regression line of ' + M('y') + ' on ' + M('x') + ' and the regression line of ' + M('x') + ' on ' + M('y') + '.', 4, M(yl('y', f.b, 'x', f.a)) + '; ' + M(yl('x', g2.b, 'y', g2.a))],
        ['A fish has mass ' + Y0 + ' g. Use the appropriate line to estimate its length, and explain your choice.', 2, M(s3(g2.a + g2.b * Y0)) + ' cm, using ' + M('x') + ' on ' + M('y') + ' because ' + M('y') + ' is known'],
        ['Show that both lines pass through the same point and state its coordinates.', 2, 'Both pass through the mean point ' + M(pt(s3(mx), s3(my)))]
      ]);
    }
  ];
  X(['sl-regression', 'ib-regression'], REG);

  var PROB = [
    function () {
      var pr = pick([0.01, 0.02, 0.03, 0.05]), se = pick([0.9, 0.95, 0.98]), sp = pick([0.9, 0.95, 0.97]), pp = pr * se + (1 - pr) * (1 - sp), post = pr * se / pp;
      var pp2 = post * se + (1 - post) * (1 - sp), post2 = post * se / pp2;
      return Q('A disease affects ' + Math.round(pr * 100) + '% of a population. A test gives a positive result for ' + Math.round(se * 100) + '% of people with the disease and a negative result for ' + Math.round(sp * 100) + '% of people without it.', [
        ['Find the probability that a randomly chosen person tests positive.', 3, M(pr + ' \\times ' + se + ' + ' + num(1 - pr) + ' \\times ' + num(Math.round((1 - sp) * 100) / 100) + ' = ' + s3(pp))],
        ['Find the probability that a person who tests positive has the disease. Comment on your answer.', 3, M(s3(post)) + '; most positive results are false positives because the disease is rare'],
        ['A person who tests positive takes the test again, independently, and again tests positive. Find the probability that they have the disease.', 3, 'Update with prior ' + s3(post) + ': ' + M(s3(post2))]
      ]);
    },
    function () {
      var r = ri(4, 8), b = ri(3, 7), n = r + b, P3r = (r * (r - 1) * (r - 2)) / (n * (n - 1) * (n - 2)), P3b = (b * (b - 1) * (b - 2)) / (n * (n - 1) * (n - 2)), P2r = 3 * r * (r - 1) * b / (n * (n - 1) * (n - 2)), Pany = 1 - P3b;
      var den = n * (n - 1) * (n - 2);
      return Q('A bag contains ' + r + ' red and ' + b + ' blue counters. Three counters are taken at random without replacement.', [
        ['Find the probability that all three counters are the same colour.', 3, M(fs(fr(r * (r - 1) * (r - 2) + b * (b - 1) * (b - 2), den)))],
        ['Find the probability that exactly two of the counters are red, given that at least one is red.', 4, M('\\frac{P(2R)}{1 - P(3B)} = \\frac{' + fs(fr(3 * r * (r - 1) * b, den)) + '}{' + fs(fr(den - b * (b - 1) * (b - 2), den)) + '} = ' + fs(fr(3 * r * (r - 1) * b, den - b * (b - 1) * (b - 2))))],
        ['A player wins $5 for three red counters and $1 for exactly two red counters, and pays $1 to play. Find the expected gain per game.', 2, usd(5 * P3r + P2r - 1).replace('$-', '−$')]
      ]);
    }
  ];
  X(['sl-probability', 'ib-probability'], PROB);

  var DISC = [
    function () {
      var c = ri(1, 5), den = 10 + 4 * c, EX = fr(30 + 10 * c, den), EX2 = fr(100 + 30 * c, den), cost = ri(5, 9);
      return Q('A discrete random variable ' + M('X') + ' has ' + M('P(X = x) = k(x + ' + c + ')') + ' for ' + M('x = 1, 2, 3, 4') + '.', [
        ['Find the value of ' + M('k') + '.', 2, M('k(' + (1 + c) + ' + ' + (2 + c) + ' + ' + (3 + c) + ' + ' + (4 + c) + ') = 1') + ', ' + M('k = ' + frac(1, den))],
        ['Find ' + M('E(X)') + '.', 2, M(fs(EX))],
        ['In a game, a player pays $' + cost + ' and wins ' + M('\\$X^2') + '. Find the expected gain, and the fee that would make the game fair.', 4, M('E(X^2) = ' + fs(EX2) + ' = ' + s3(EX2[0] / EX2[1])) + '; expected gain ' + usd(EX2[0] / EX2[1] - cost).replace('$-', '−$') + '; fair fee ' + usd(EX2[0] / EX2[1])]
      ]);
    },
    function () {
      var p = pick([0.02, 0.03, 0.04, 0.05]), n = pick([20, 25, 30]), c = 2, pr = 1 - IB.bcdf(n, p, c), k = 5, P2 = IB.bpdf(k, pr, 2), m = 1;
      while (1 - Math.pow(1 - p, m) < 0.9) m++;
      return Q('A factory makes light bulbs, ' + Math.round(p * 100) + '% of which are faulty, independently of each other. Bulbs are packed in boxes of ' + n + '. A box is rejected if it contains more than ' + c + ' faulty bulbs.', [
        ['Find the probability that a box contains at most one faulty bulb.', 2, M(s3(IB.bcdf(n, p, 1)))],
        ['Find the probability that a box is rejected.', 2, M('P(X > ' + c + ') = ' + pv3(pr))],
        ['An inspector checks ' + k + ' boxes. Find the probability that exactly 2 of them are rejected.', 2, M('Y \\sim B(' + k + ',\\ ' + s3(pr) + ')') + ', ' + M('P(Y = 2) = ' + pv3(P2))],
        ['Find the least number of bulbs that must be tested so that the probability of finding at least one faulty bulb is at least 0.9.', 3, M('1 - ' + num(1 - p) + '^m \\ge 0.9') + ', ' + M('m = ' + m)]
      ]);
    }
  ];
  X(['sl-discrete', 'ib-discrete'], DISC);

  var NORM = [
    function () {
      var mu = ri(40, 80) * 5, sd = ri(8, 25), p1 = pick([0.1, 0.15, 0.2]), p2 = pick([0.05, 0.1, 0.25]);
      var a = Math.round(mu + IB.invPhi(p1) * sd), b = Math.round(mu + IB.invPhi(1 - p2) * sd), z1 = IB.invPhi(p1), z2 = IB.invPhi(1 - p2), S = (b - a) / (z2 - z1), Mu = a - z1 * S;
      var lo = Math.round(Mu - S / 2), hi = Math.round(Mu + S);
      return Q('The masses of melons are normally distributed. ' + Math.round(p1 * 100) + '% of melons have a mass less than ' + a + ' g and ' + Math.round(p2 * 100) + '% have a mass greater than ' + b + ' g.', [
        ['Write down two equations in ' + M('\\mu') + ' and ' + M('\\sigma') + '.', 2, M('\\frac{' + a + ' - \\mu}{\\sigma} = ' + s3(z1)) + ', ' + M('\\frac{' + b + ' - \\mu}{\\sigma} = ' + s3(z2))],
        ['Find the mean and standard deviation of the masses.', 3, M('\\mu = ' + s3(Mu) + ',\\ \\sigma = ' + s3(S))],
        ['Find the probability that a melon has a mass between ' + lo + ' g and ' + hi + ' g.', 2, M(s3(IB.ncdf(hi, Mu, S) - IB.ncdf(lo, Mu, S)))]
      ]);
    },
    function () {
      var mu = ri(55, 65), sd = ri(25, 50) / 10, w = mu + ri(-3, 2), q = 1 - IB.ncdf(w, mu, sd), n = 12, k = Math.min(n - 1, Math.max(2, Math.round(n * q) + ri(1, 2))), Pk = 1 - IB.bcdf(n, q, k - 1), w95 = mu + IB.invPhi(0.05) * sd;
      return Q('The masses of eggs are normally distributed with mean ' + mu + ' g and standard deviation ' + d1(sd) + ' g. An egg is classed as large if its mass is more than ' + w + ' g.', [
        ['Find the probability that an egg is large.', 2, M(s3(q))],
        ['A box holds ' + n + ' eggs chosen at random. Find the probability that at least ' + k + ' of them are large.', 3, M('X \\sim B(' + n + ',\\ ' + s3(q) + ')') + ', ' + M('P(X \\ge ' + k + ') = ' + pv3(Pk))],
        ['The farm wants 95% of its eggs to be classed as large. Find the mass that the definition of “large” would need to use.', 2, M(s3(w95)) + ' g']
      ]);
    }
  ];
  X(['sl-normal', 'ib-normal'], NORM);

  function chiIndep() {
    var rowsN = ['Walk', 'Bus', 'Car'], colsN = ['Year 10', 'Year 12'], O, E, chi, R, C, N;
    do {
      O = rowsN.map(function () { return colsN.map(function () { return ri(12, 45); }); });
      R = O.map(sum); C = [0, 1].map(function (j) { return sum(O.map(function (r) { return r[j]; })); }); N = sum(R);
      E = O.map(function (r, i) { return r.map(function (_, j) { return R[i] * C[j] / N; }); });
      chi = 0; O.forEach(function (r, i) { r.forEach(function (o, j) { chi += Math.pow(o - E[i][j], 2) / E[i][j]; }); });
    } while (false);
    var pv = IB.chi2sf(chi, 2);
    return Q('Students were asked how they travel to school. The results are shown.' + table(['', colsN[0], colsN[1]], O.map(function (r, i) { return [rowsN[i]].concat(r); })), [
      ['Write down the hypotheses for a ' + M('\\chi^2') + ' test of independence.', 1, M('H_0') + ': travel method is independent of year group; ' + M('H_1') + ': it is not independent'],
      ['Find the expected frequency for students in ' + colsN[0] + ' who walk.', 2, M('\\frac{' + R[0] + ' \\times ' + C[0] + '}{' + N + '} = ' + s3(E[0][0]))],
      ['Find the ' + M('\\chi^2') + ' statistic, the degrees of freedom and the ' + M('p') + '-value.', 4, M('\\chi^2 = ' + s3(chi)) + ', ' + M('\\nu = 2') + ', ' + M('p = ' + pv3(pv))],
      ['State the conclusion of the test at the 5% significance level, in context.', 2, pv < 0.05 ? M(pv3(pv) + ' < 0.05') + ': reject ' + M('H_0') + '; travel method depends on year group' : M(s3(pv) + ' > 0.05') + ': do not reject ' + M('H_0') + '; no evidence that travel method depends on year group']
    ]);
  }
  function chiGof() {
    var ratio = pick([[9, 3, 3, 1], [1, 2, 1], [3, 1], [1, 1, 1, 1, 2]]), k = ratio.length, tot = ri(12, 25) * sum(ratio), Ex = ratio.map(function (r) { return tot * r / sum(ratio); });
    var O = Ex.map(function (e) { return Math.max(3, Math.round(e + ri(-25, 25) / 100 * e)); }); O[0] += tot - sum(O);
    var chi = 0; O.forEach(function (o, i) { chi += Math.pow(o - Ex[i], 2) / Ex[i]; }); var pv = IB.chi2sf(chi, k - 1);
    var cats = ['A', 'B', 'C', 'D', 'E'].slice(0, k), words = ['', '', 'two', 'three', 'four', 'five'];
    return Q('A genetic theory predicts that ' + words[k] + ' types of plant, ' + cats.join(', ').replace(/, ([^,]*)$/, ' and $1') + ', occur in the ratio ' + ratio.join(' : ') + '. In a sample of ' + tot + ' plants the observed frequencies were:' + table(['Type'].concat(cats), [['Frequency'].concat(O)]), [
      ['Find the expected frequencies under the theory.', 2, Ex.map(function (e) { return num(e); }).join(', ')],
      ['Carry out a ' + M('\\chi^2') + ' goodness of fit test at the 5% significance level, stating the hypotheses, the degrees of freedom, the ' + M('p') + '-value and your conclusion.', 6, M('H_0') + ': the data fit the ratio; ' + M('\\nu = ' + (k - 1)) + ', ' + M('\\chi^2 = ' + s3(chi)) + ', ' + M('p = ' + pv3(pv)) + '; ' + (pv < 0.05 ? 'reject ' + M('H_0') + ': the data do not support the theory' : 'do not reject ' + M('H_0') + ': the data are consistent with the theory')]
    ]);
  }
  function binTest() {
    var p0 = pick([0.2, 0.25, 0.3, 0.4]), n = pick([20, 25, 30]), c = 0;
    while (1 - IB.bcdf(n, p0, c - 1) > 0.05) c++;
    var x = c + ri(-2, 1), pv = 1 - IB.bcdf(n, p0, x - 1), p1 = p0 + 0.2, pw = 1 - IB.bcdf(n, p1, c - 1);
    return Q('A seed company claims that ' + Math.round(p0 * 100) + '% of its seeds produce white flowers. A gardener thinks the proportion is higher. She plants ' + n + ' seeds and ' + x + ' produce white flowers.', [
      ['State suitable hypotheses.', 1, M('H_0: p = ' + p0 + ',\\ H_1: p > ' + p0)],
      ['Find the ' + M('p') + '-value and state the conclusion at the 5% level.', 3, M('P(X \\ge ' + x + ') = ' + s3(pv)) + '; ' + (pv < 0.05 ? 'reject ' + M('H_0') + ': evidence the proportion is higher' : 'do not reject ' + M('H_0'))],
      ['Find the critical region for the test and the probability of a Type I error.', 3, M('X \\ge ' + c) + '; ' + M('P(X \\ge ' + c + ' \\mid p = ' + p0 + ') = ' + s3(1 - IB.bcdf(n, p0, c - 1)))],
      ['The true proportion is ' + num(p1) + '. Find the probability of a Type II error.', 2, M('P(X < ' + c + ' \\mid p = ' + num(p1) + ') = ' + s3(1 - pw))]
    ]);
  }
  X('sl-tests', [chiIndep, chiGof]);
  X('ib-hypothesis', [chiIndep, binTest]);

  X('ib-estimation', [
    function () {
      var m1 = ri(40, 60) * 10, s1 = ri(10, 25), m2 = ri(25, 40) * 10, s2 = ri(8, 20), mt = 3 * m1 + 2 * m2, vt = 3 * s1 * s1 + 2 * s2 * s2, K = Math.round((mt + ri(5, 15) / 10 * Math.sqrt(vt)) / 10) * 10;
      var md = m1 - m2, vd = s1 * s1 + s2 * s2, d = Math.round(md / 10) * 10 + 20;
      return Q('Large bags of flour have masses ' + M('X \\sim N(' + m1 + ',\\ ' + s1 + '^2)') + ' grams and small bags have masses ' + M('Y \\sim N(' + m2 + ',\\ ' + s2 + '^2)') + ' grams, all independent.', [
        ['Find the probability that three large bags and two small bags have a total mass of more than ' + K + ' g.', 4, M('T \\sim N(' + mt + ',\\ ' + vt + ')') + ', ' + M('P(T > ' + K + ') = ' + s3(1 - IB.ncdf(K, mt, Math.sqrt(vt))))],
        ['Explain why the variance of ' + M('3X') + ' is not the same as the variance of the total of three large bags.', 2, M('\\mathrm{Var}(3X) = 9\\sigma^2') + ' but ' + M('\\mathrm{Var}(X_1 + X_2 + X_3) = 3\\sigma^2') + ': three different bags vary independently'],
        ['Find the probability that a large bag is more than ' + d + ' g heavier than a small bag.', 3, M('X - Y \\sim N(' + md + ',\\ ' + vd + ')') + ', ' + M('P(X - Y > ' + d + ') = ' + s3(1 - IB.ncdf(d, md, Math.sqrt(vd))))]
      ]);
    },
    function () {
      var sig = ri(4, 12), n = ri(20, 50), xb = ri(200, 500) / 10, z = IB.invPhi(0.975), h = z * sig / Math.sqrt(n), w = pick([2, 3, 4]), nmin = Math.ceil(Math.pow(2 * z * sig / w, 2)), cl = pick([90, 99]), z2 = IB.invPhi(1 - (1 - cl / 100) / 2);
      return Q('The lengths of leaves on a tree are normally distributed with standard deviation ' + sig + ' mm. A random sample of ' + n + ' leaves has mean length ' + d1(xb) + ' mm.', [
        ['Find a 95% confidence interval for the mean length of the leaves.', 3, M(d1(xb) + ' \\pm 1.96 \\times \\frac{' + sig + '}{\\sqrt{' + n + '}}') + ': ' + M('(' + s3(xb - h) + ',\\ ' + s3(xb + h) + ')')],
        ['Find the ' + cl + '% confidence interval, and explain why its width differs from the 95% interval.', 3, M('(' + s3(xb - z2 * sig / Math.sqrt(n)) + ',\\ ' + s3(xb + z2 * sig / Math.sqrt(n)) + ')') + '; ' + (cl > 95 ? 'wider, because more confidence requires a larger range' : 'narrower, because less confidence is required')],
        ['Find the smallest sample size for which the 95% confidence interval has width less than ' + w + ' mm.', 3, M('2 \\times 1.96 \\times \\frac{' + sig + '}{\\sqrt{n}} < ' + w) + ', ' + M('n = ' + nmin)]
      ]);
    }
  ]);

  X('ib-poisson', [
    function () {
      var lam = ri(15, 45) / 10, k = Math.round(2 * lam) + ri(1, 3), p0 = Math.exp(-lam), P2 = IB.bpdf(8, p0, 2), t = 60 * Math.log(2) / lam;
      return Q('Calls arrive at a help desk at random, at a mean rate of ' + d1(lam) + ' per hour.', [
        ['Find the probability of at least ' + k + ' calls in a two-hour period.', 2, M('X \\sim \\mathrm{Po}(' + num(2 * lam) + ')') + ', ' + M('P(X \\ge ' + k + ') = ' + s3(1 - IB.pcdf(2 * lam, k - 1)))],
        ['An 8-hour shift is divided into 8 one-hour periods. Find the probability that exactly 2 of these periods have no calls.', 3, M('P(0) = e^{-' + d1(lam) + '} = ' + s3(p0)) + '; ' + M('B(8,\\ ' + s3(p0) + ')') + ': ' + M(s3(P2))],
        ['Find the length of time, in minutes, for which the probability of no calls is 0.5.', 3, M('e^{-' + d1(lam) + 't/60} = 0.5') + ', ' + M('t = ' + s3(t)) + ' minutes']
      ]);
    },
    function () {
      var a = ri(12, 35) / 10, b = ri(8, 25) / 10, k = ri(3, 6), j = ri(1, k - 1), pa = a / (a + b), cond = IB.comb(k, j) * Math.pow(pa, j) * Math.pow(1 - pa, k - j);
      return Q('The numbers of emails ' + M('A') + ' receives from work and from friends in an hour are independent, ' + M('X \\sim \\mathrm{Po}(' + d1(a) + ')') + ' and ' + M('Y \\sim \\mathrm{Po}(' + d1(b) + ')') + '.', [
        ['Find the probability that ' + M('A') + ' receives exactly ' + k + ' emails in an hour.', 2, M('X + Y \\sim \\mathrm{Po}(' + d1(a + b) + ')') + ', ' + M(s3(IB.ppdf(a + b, k)))],
        ['Given that ' + M('A') + ' receives exactly ' + k + ' emails in an hour, find the probability that ' + (j === 1 ? 'exactly one of them is' : 'exactly ' + j + ' of them are') + ' from work.', 4, M('\\frac{P(X = ' + j + ')P(Y = ' + (k - j) + ')}{P(X + Y = ' + k + ')} = ' + s3(cond))],
        ['Show that this conditional distribution is binomial, and state its parameters.', 2, M('B\\left(' + k + ',\\ \\frac{' + d1(a) + '}{' + d1(a + b) + '}\\right)') + ': the ' + M('e^{-\\lambda}') + ' factors cancel, leaving ' + M('\\binom{' + k + '}{j}p^j(1 - p)^{' + k + ' - j}')]
      ]);
    }
  ]);

  X('ib-markov', [
    function () {
      var a = ri(1, 4) / 10, b = ri(1, 4) / 10, Tm = [[1 - a, b], [a, 1 - b]], ss = b / (a + b), n = 1, s = [1, 0];
      for (;;) { s = [Tm[0][0] * s[0] + Tm[0][1] * s[1], Tm[1][0] * s[0] + Tm[1][1] * s[1]]; if (Math.abs(s[0] - ss) < 0.01) break; n++; }
      var s3v = IB.mm(IB.mpow(Tm, 3), [[1], [0]]);
      return Q('Each month, customers of a phone company choose plan ' + M('P') + ' or plan ' + M('Q') + '. Of those on ' + M('P') + ', ' + Math.round(a * 100) + '% switch to ' + M('Q') + ' the next month; of those on ' + M('Q') + ', ' + Math.round(b * 100) + '% switch to ' + M('P') + '. A new customer starts on plan ' + M('P') + '.' + D.markov(['P', 'Q'], [[d1(1 - a), d1(a)], [d1(b), d1(1 - b)]]), [
        ['Write down the transition matrix ' + M('\\mathbf{T}') + ', with columns for this month.', 1, M(mat([[d1(1 - a), d1(b)], [d1(a), d1(1 - b)]]))],
        ['Find the probability that the customer is on plan ' + M('P') + ' after 3 months.', 2, M(s3(s3v[0][0]))],
        ['Find the steady-state vector, and explain how it relates to the eigenvalues of ' + M('\\mathbf{T}') + '.', 4, M(vec([fs(fr(Math.round(b * 10), Math.round((a + b) * 10))), fs(fr(Math.round(a * 10), Math.round((a + b) * 10)))])) + '; it is the eigenvector for eigenvalue 1 (the other eigenvalue is ' + d1(1 - a - b) + ', whose powers tend to 0)'],
        ['Find the least number of months after which the probability of being on ' + M('P') + ' is within 0.01 of its long-term value.', 2, n + ' months']
      ]);
    },
    function () {
      var Pm, ok;
      do {
        Pm = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; ok = true;
        for (var j = 0; j < 3; j++) { var x = ri(4, 8), y = ri(1, 9 - x); var col = [x, y, 10 - x - y]; col = [col[(3 - j) % 3], col[(4 - j) % 3], col[(5 - j) % 3]]; for (var i = 0; i < 3; i++) { Pm[i][j] = col[i] / 10; if (!col[i]) ok = false; } }
      } while (!ok);
      var s = [[1 / 3], [1 / 3], [1 / 3]]; for (var k = 0; k < 400; k++) s = IB.mm(Pm, s);
      var path = Pm[1][0] * Pm[2][1], T2 = IB.mpow(Pm, 2);
      var probs = [0, 1, 2].map(function (i) { return [0, 1, 2].map(function (j) { return d1(Pm[j][i]); }); });
      return Q('A frog moves between three lily pads ' + M('A') + ', ' + M('B') + ' and ' + M('C') + ' each minute, according to the transition matrix ' + M('\\mathbf{T} = ' + mat(Pm.map(function (r) { return r.map(d1); }))) + ', where columns show the current pad.' + D.markov(['A', 'B', 'C'], probs), [
        ['The frog starts on ' + M('A') + '. Find the probability that it moves to ' + M('B') + ' and then to ' + M('C') + '.', 2, M(d1(Pm[1][0]) + ' \\times ' + d1(Pm[2][1]) + ' = ' + num(Math.round(path * 100) / 100))],
        ['Find the probability that the frog is on ' + M('C') + ' after two minutes.', 2, M('(\\mathbf{T}^2)_{CA} = ' + s3(T2[2][0]))],
        ['Find the steady-state vector by solving ' + M('\\mathbf{T}\\mathbf{s} = \\mathbf{s}') + ' with the components of ' + M('\\mathbf{s}') + ' summing to 1, and interpret it.', 4, M(vec(s.map(function (r) { return s3(r[0]); })))+ '; in the long run these are the proportions of time the frog spends on each pad']
      ]);
    }
  ]);

  /* ================= Topic 5: Calculus ================= */
  var DERIV = [
    function () {
      var a, p, b = nz(-6, 6), c = ri(-5, 5);
      do { a = nz(-4, 4); p = nz(-2, 2); } while (a === -3 * p);
      var f = function (x) { return x * x * x + a * x * x + b * x + c; }, m = 3 * p * p + 2 * a * p + b, k = f(p) - m * p, q = -a - 2 * p;
      return Q('The curve ' + M('C') + ' has equation ' + M('y = ' + poly([1, a, b, c])) + '. The tangent to ' + M('C') + ' at the point ' + M('P') + ' where ' + M('x = ' + p) + ' meets ' + M('C') + ' again at ' + M('Q') + '.', [
        ['Find the equation of the tangent at ' + M('P') + '.', 3, M('y = ' + lin([m, k], ['x', '']))],
        ['Show that the ' + M('x') + '-coordinates of ' + M('P') + ' and ' + M('Q') + ' satisfy ' + M(poly([1, a, b - m, c - k]) + ' = 0') + ', and hence find the coordinates of ' + M('Q') + '.', 4, M('(x' + sg(-p) + ')^2' + (q ? '(x' + sg(-q) + ')' : 'x') + ' = 0') + '; ' + M('Q' + pt(q, f(q)))],
        ['Find the equation of the normal to ' + M('C') + ' at ' + M('Q') + '.', 2, (function () { var mq = 3 * q * q + 2 * a * q + b; return mq === 0 ? M('x = ' + q) : M('y - ' + '(' + f(q) + ') = ' + ({ '1': '', '-1': '-' }[frac(-1, mq)] !== undefined ? { '1': '', '-1': '-' }[frac(-1, mq)] : frac(-1, mq)) + '(x - (' + q + '))').replace(/- \((-?\d+)\)/g, function (_, v) { return Number(v) < 0 ? '+ ' + (-v) : '- ' + v; }); })()]
      ]);
    },
    function () {
      var p = ri(1, 3), k = p * p + ri(2, 8), yp = k - p * p, TN = fr(yp * (1 + 4 * p * p), 2 * p), A = fr(yp * yp * (1 + 4 * p * p), 4 * p);
      return Q('The curve ' + M('y = ' + k + ' - x^2') + ' passes through ' + M('P' + pt(p, yp)) + '. The tangent at ' + M('P') + ' meets the ' + M('x') + '-axis at ' + M('T') + ' and the normal at ' + M('P') + ' meets the ' + M('x') + '-axis at ' + M('N') + '.', [
        ['Find the equations of the tangent and the normal at ' + M('P') + '.', 4, 'Tangent ' + M('y = ' + lin([-2 * p, yp + 2 * p * p], ['x', ''])) + '; normal ' + M('y = ' + frac(1, 2 * p) + 'x + ' + fs(fr(2 * p * yp - 1, 2 * p)))],
        ['Find the coordinates of ' + M('T') + ' and ' + M('N') + '.', 2, M('T' + pt(fs(fr(2 * p * p + yp, 2 * p)), 0)) + ', ' + M('N' + pt(p - 2 * p * yp, 0))],
        ['Find the area of triangle ' + M('PTN') + '.', 2, M('\\frac{1}{2} \\times ' + fs(TN) + ' \\times ' + yp + ' = ' + fs(A))]
      ]);
    }
  ];
  X(['sl-derivatives', 'ib-derivatives'], DERIV);

  var OPT = [
    function () {
      var V = ri(3, 10) * 100, c1_ = ri(3, 6) / 100, c2 = ri(1, 3) / 100, r = Math.pow(c2 * V / (2 * Math.PI * c1_), 1 / 3), h = V / (Math.PI * r * r), C = 2 * Math.PI * c1_ * r * r + 2 * c2 * V / r;
      return Q('A closed cylindrical tin has volume ' + V + ' cm³. The material for the top and bottom costs $' + c1_ + ' per cm² and the material for the curved side costs $' + c2 + ' per cm².', [
        ['Show that the cost of the tin is ' + M('C = ' + s3(2 * Math.PI * c1_) + 'r^2 + \\frac{' + s3(2 * c2 * V) + '}{r}') + ', where ' + M('r') + ' cm is the radius.', 3, M('C = 2\\pi r^2(' + c1_ + ') + 2\\pi rh(' + c2 + ')') + ' with ' + M('h = \\frac{' + V + '}{\\pi r^2}')],
        ['Find the value of ' + M('r') + ' that minimises the cost, and justify that it is a minimum.', 4, M('\\frac{\\mathrm{d}C}{\\mathrm{d}r} = ' + s3(4 * Math.PI * c1_) + 'r - \\frac{' + s3(2 * c2 * V) + '}{r^2} = 0') + ', ' + M('r = ' + s3(r)) + '; ' + M('C\'\'(r) > 0')],
        ['Find the minimum cost and the corresponding height of the tin.', 2, usd(C) + ', ' + M('h = ' + s3(h)) + ' cm']
      ]);
    },
    function () {
      var b = ri(2, 6) * 5, c = ri(4, 10), a = b * ri(c + 8, c + 20), F = ri(5, 20) * 100, pm = (a + b * c) / (2 * b), P = function (p) { return (p - c) * (a - b * p) - F; };
      if (P(pm) <= 0) F = Math.floor(P(pm) + F) / 2;
      var A_ = -b, B_ = a + b * c, C_ = -(a * c) - F, dsc = B_ * B_ - 4 * A_ * C_, rts = [(-B_ + Math.sqrt(dsc)) / (2 * A_), (-B_ - Math.sqrt(dsc)) / (2 * A_)].sort(function (x, y) { return x - y; });
      return Q('A company sells ' + M('q = ' + a + ' - ' + b + 'p') + ' items per week when the price is $' + M('p') + '. Each item costs $' + c + ' to make and there are fixed costs of $' + num(F) + ' per week.', [
        ['Show that the weekly profit is ' + M('P(p) = ' + poly([A_, B_, C_], 'p')) + '.', 2, M('(p - ' + c + ')(' + a + ' - ' + b + 'p) - ' + num(F))],
        ['Find the price that maximises the profit, and the maximum profit.', 3, M('P\'(p) = ' + (2 * A_) + 'p + ' + B_ + ' = 0') + ', ' + M('p = ' + s3(pm)) + '; ' + usd(P(pm))],
        ['Find the range of prices for which the company makes a profit.', 3, M(s3(rts[0]) + ' < p < ' + s3(rts[1]))]
      ]);
    }
  ];
  X(['sl-optimisation', 'ib-optimisation'], OPT);

  var INTEG = [
    function () {
      var t = ri(1, 3), r1 = -t - 1, r2 = t, k = ri(6, 14), m = k + r1 * r2, A = fr(Math.pow(r2 - r1, 3), 6), hf = function (x) { return (k - x * x) - (x + m); }, n = 4, hh = (r2 - r1) / n, tr = 0;
      for (var i = 0; i <= n; i++) tr += (i === 0 || i === n ? 1 : 2) * hf(r1 + i * hh);
      tr *= hh / 2; var err = Math.abs(tr - A[0] / A[1]) / (A[0] / A[1]) * 100;
      return Q('The region ' + M('R') + ' is enclosed by the curve ' + M('y = ' + k + ' - x^2') + ' and the line ' + M('y = ' + lin([1, m], ['x', ''])) + '.', [
        ['Find the ' + M('x') + '-coordinates of the points where the curve and line meet.', 2, M('x^2 + x' + sg(m - k) + ' = 0') + ', ' + M('x = ' + r1 + ',\\ ' + r2)],
        ['Find the exact area of ' + M('R') + '.', 3, M('\\int_{' + r1 + '}^{' + r2 + '} (' + poly([-1, -1, k - m]) + ')\\,\\mathrm{d}x = ' + fs(A))],
        ['Use the trapezoidal rule with ' + n + ' strips to estimate the area of ' + M('R') + ', and find the percentage error in the estimate.', 4, M(s3(tr)) + '; ' + M(s3(err) + '\\%') + ' (an underestimate, as the curve is concave)']
      ]);
    },
    function () {
      var k = ri(3, 8), A = fr(k * k * k, 6), mh = k * (1 - Math.pow(2, -1 / 3));
      return Q('The region ' + M('R') + ' lies between the curve ' + M('y = x(' + k + ' - x)') + ' and the ' + M('x') + '-axis.', [
        ['Find the exact area of ' + M('R') + '.', 3, M('\\int_0^{' + k + '} (' + k + 'x - x^2)\\,\\mathrm{d}x = ' + fs(A))],
        ['The line ' + M('y = mx') + ', where ' + M('0 < m < ' + k) + ', meets the curve at the origin and at ' + M('x = ' + k + ' - m') + '. Show that the area between the line and the curve is ' + M('\\frac{(' + k + ' - m)^3}{6}') + '.', 3, M('\\int_0^{' + k + ' - m} ((' + k + ' - m)x - x^2)\\,\\mathrm{d}x = \\frac{(' + k + ' - m)^3}{2} - \\frac{(' + k + ' - m)^3}{3}')],
        ['Find the value of ' + M('m') + ' for which the line divides ' + M('R') + ' into two regions of equal area.', 2, M('(' + k + ' - m)^3 = \\frac{' + (k * k * k) + '}{2}') + ', ' + M('m = ' + s3(mh))]
      ]);
    }
  ];
  X(['sl-integration', 'ib-integration'], INTEG);

  X('ib-diff-rules', [
    function () {
      var R = ri(2, 5), H = R * ri(2, 3), Qr = ri(5, 30) / 10, h = ri(1, H - 1), K = Math.PI * (R / H) * (R / H), dh = Qr / (K * h * h), dA = 2 * K * h * dh;
      return Q('A conical tank, vertex downwards, has radius ' + R + ' m and height ' + H + ' m. Water flows in at ' + d1(Qr) + ' m³ per minute.', [
        ['Show that when the depth of water is ' + M('h') + ' m, the volume is ' + M('V = ' + fs(fr(R * R, 3 * H * H)) + '\\pi h^3') + '.', 2, 'Similar triangles: radius ' + M('r = ' + fs(fr(R, H)) + 'h') + ', and ' + M('V = \\frac{1}{3}\\pi r^2 h')],
        ['Find the rate at which the depth is increasing when the depth is ' + h + ' m.', 3, M('\\frac{\\mathrm{d}h}{\\mathrm{d}t} = \\frac{' + d1(Qr) + '}{\\pi(' + fs(fr(R * R, H * H)) + ')h^2} = ' + s3(dh)) + ' m per minute'],
        ['Find the rate at which the area of the water surface is increasing at that moment.', 3, M('A = \\pi r^2 = ' + fs(fr(R * R, H * H)) + '\\pi h^2') + ', ' + M('\\frac{\\mathrm{d}A}{\\mathrm{d}t} = ' + s3(dA)) + ' m² per minute']
      ]);
    },
    function () {
      var a = ri(5, 20), b = ri(2, 6);
      return Q('The concentration of a drug in the blood ' + M('t') + ' hours after it is taken is ' + M('C(t) = ' + a + 'te^{-t/' + b + '}') + ' mg per litre.', [
        ['Use the product rule to find ' + M('C\'(t)') + '.', 2, M('C\'(t) = ' + a + 'e^{-t/' + b + '}\\left(1 - \\frac{t}{' + b + '}\\right)')],
        ['Find the exact maximum concentration and when it occurs.', 3, M('t = ' + b) + ' hours; ' + M('C = \\frac{' + (a * b) + '}{e} = ' + s3(a * b / Math.E))],
        ['Find ' + M('C\'\'(t)') + ' and hence the time at which the concentration is decreasing most rapidly.', 4, M('C\'\'(t) = ' + a + 'e^{-t/' + b + '}\\left(\\frac{t}{' + (b * b) + '} - ' + fs(fr(2, b)) + '\\right)') + '; ' + M('t = ' + (2 * b)) + ' hours']
      ]);
    }
  ]);

  X('ib-volumes', [
    function () {
      var a = ri(2, 8), h = ri(3, 10), V = Math.PI * a * h * h / 2, Qr = ri(5, 20), d = ri(1, h - 1);
      return Q('A bowl is formed by rotating the curve ' + M('y = \\frac{x^2}{' + a + '}') + ', ' + M('0 \\le y \\le ' + h) + ', through ' + M('2\\pi') + ' about the ' + M('y') + '-axis. Units are centimetres.', [
        ['Show that the volume of liquid in the bowl when the depth is ' + M('d') + ' cm is ' + M(fs(fr(a, 2)).replace(/^1$/, '') + '\\pi d^2') + '.', 3, M('V = \\pi\\int_0^d x^2\\,\\mathrm{d}y = \\pi\\int_0^d ' + a + 'y\\,\\mathrm{d}y')],
        ['Find the depth when the bowl is half full.', 2, M('d^2 = \\frac{' + h + '^2}{2}') + ', ' + M('d = ' + s3(h / Math.SQRT2)) + ' cm'],
        ['Liquid is poured in at ' + Qr + ' cm³ s⁻¹. Find the rate at which the depth is rising when ' + M('d = ' + d) + '.', 3, M('\\frac{\\mathrm{d}d}{\\mathrm{d}t} = \\frac{' + Qr + '}{' + a + '\\pi(' + d + ')} = ' + s3(Qr / (a * Math.PI * d))) + ' cm s⁻¹']
      ]);
    },
    function () {
      var m = ri(2, 4), A = fr(m * m * m, 6), V = fr(2 * Math.pow(m, 5), 15);
      return Q('The region ' + M('R') + ' is enclosed by the line ' + M('y = ' + m + 'x') + ' and the curve ' + M('y = x^2') + '.', [
        ['Find the area of ' + M('R') + '.', 3, M('\\int_0^{' + m + '} (' + m + 'x - x^2)\\,\\mathrm{d}x = ' + fs(A))],
        ['The region is rotated through ' + M('2\\pi') + ' about the ' + M('x') + '-axis. Find the exact volume of the solid formed.', 4, M('\\pi\\int_0^{' + m + '} (' + (m * m) + 'x^2 - x^4)\\,\\mathrm{d}x = ' + fs(V) + '\\pi')],
        ['Explain why the volume is not ' + M('\\pi\\int_0^{' + m + '} (' + m + 'x - x^2)^2\\,\\mathrm{d}x') + '.', 1, 'The solid is a washer: subtract the inner volume from the outer, ' + M('\\pi(y_1^2 - y_2^2)') + ', not ' + M('\\pi(y_1 - y_2)^2')]
      ]);
    }
  ]);

  X('ib-kinematics', [
    function () {
      var k = ri(1, 3), p = ri(1, 3), q = p + ri(1, 3), T = q + ri(1, 2), V6 = function (t) { return k * (2 * t * t * t - 3 * (p + q) * t * t + 6 * p * q * t); };
      var disp = V6(T), dist = Math.abs(V6(p)) + Math.abs(V6(q) - V6(p)) + Math.abs(V6(T) - V6(q));
      return Q('A particle moves in a straight line with velocity ' + M('v = ' + c1(k, '(t - ' + p + ')(t - ' + q + ')')) + ' m s⁻¹ for ' + M('0 \\le t \\le ' + T) + '.', [
        ['Find the times when the particle changes direction.', 1, M('t = ' + p) + ' and ' + M('t = ' + q)],
        ['Find the displacement of the particle from ' + M('t = 0') + ' to ' + M('t = ' + T) + '.', 3, M(fs(fr(disp, 6))) + ' m'],
        ['Find the total distance travelled from ' + M('t = 0') + ' to ' + M('t = ' + T) + '.', 3, M(fs(fr(Math.abs(V6(p)), 6)) + ' + ' + fs(fr(Math.abs(V6(q) - V6(p)), 6)) + ' + ' + fs(fr(Math.abs(V6(T) - V6(q)), 6)) + ' = ' + fs(fr(dist, 6))) + ' m'],
        ['Find the acceleration when the particle is moving with its greatest speed in the negative direction.', 1, 'At ' + M('t = ' + num((p + q) / 2)) + ', ' + M('a = 0')]
      ]);
    },
    function () {
      var p = ri(2, 6), q = ri(1, 3) * 2;
      return Q('A car starts from rest. Its acceleration is ' + M('a = ' + p + ' - ' + q + 't') + ' m s⁻² until it comes to rest again.', [
        ['Find an expression for the velocity.', 2, M('v = ' + p + 't - ' + c1(q / 2, 't^2'))],
        ['Find the maximum speed of the car.', 2, 'At ' + M('t = ' + fs(fr(p, q))) + ': ' + M(fs(fr(p * p, 2 * q))) + ' m s⁻¹'],
        ['Find the time when the car comes to rest and the distance it has travelled.', 4, M('t = ' + fs(fr(2 * p, q))) + ' s; ' + M('\\int_0^{' + fs(fr(2 * p, q)) + '} v\\,\\mathrm{d}t = ' + fs(fr(2 * p * p * p, 3 * q * q))) + ' m']
      ]);
    }
  ]);

  X('ib-diff-equations', [
    function () {
      var s0 = ri(3, 6), s1 = ri(1, s0 - 1), t1 = ri(5, 20), k = 2 * (s0 - s1) / t1, te = 2 * s0 / k, th = (s0 - Math.sqrt(s0 * s0 / 2)) * 2 / k;
      return Q('Water drains from a tank. The depth ' + M('h') + ' cm after ' + M('t') + ' minutes satisfies ' + M('\\frac{\\mathrm{d}h}{\\mathrm{d}t} = -k\\sqrt{h}') + '. Initially ' + M('h = ' + (s0 * s0)) + ', and after ' + t1 + ' minutes ' + M('h = ' + (s1 * s1)) + '.', [
        ['Solve the differential equation to show that ' + M('\\sqrt{h} = ' + s0 + ' - \\frac{kt}{2}') + '.', 3, M('\\int h^{-\\frac{1}{2}}\\,\\mathrm{d}h = -\\int k\\,\\mathrm{d}t') + ': ' + M('2\\sqrt{h} = -kt + c') + ', with ' + M('c = ' + (2 * s0))],
        ['Find the value of ' + M('k') + '.', 2, M('k = ' + fs(fr(2 * (s0 - s1), t1)))],
        ['Find the time taken for the tank to empty, and the time taken for the depth to halve.', 3, M(s3(te)) + ' minutes; ' + M(s3(th)) + ' minutes']
      ]);
    },
    function () {
      var a = nz(-3, 3), y0 = ri(1, 3), h = 0.1; while (a === -y0) a = nz(-3, 3); var x = 0, y = y0, steps = 5;
      for (var i = 0; i < steps; i++) { y = y + h * (a * x + y); x += h; }
      var ex = (y0 + a) * Math.exp(0.5) - a * 0.5 - a, pe = Math.abs(y - ex) / Math.abs(ex) * 100;
      return Q('The function ' + M('y') + ' satisfies ' + M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + lin([a, 1], ['x', 'y'])) + ', with ' + M('y = ' + y0) + ' when ' + M('x = 0') + '.', [
        ['Use Euler’s method with step length 0.1 to estimate ' + M('y') + ' when ' + M('x = 0.5') + '.', 4, M(s3(y))],
        ['Verify that ' + M('y = ' + (y0 + a) + 'e^{x}' + tc(-a, 'x') + tc(-a, '')) + ' satisfies the differential equation and the initial condition.', 3, M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + (y0 + a) + 'e^x' + tc(-a, '')) + ' and ' + M(lin([a, 1], ['x', 'y']) + ' = ' + (y0 + a) + 'e^x' + tc(-a, '')) + '; ' + M('y(0) = ' + y0)],
        ['Find the percentage error in the Euler estimate, and suggest how the estimate could be improved.', 2, 'Exact ' + M(s3(ex)) + '; error ' + M(s3(pe) + '\\%') + '; use a smaller step length']
      ]);
    }
  ]);

  X('ib-coupled', [
    function () {
      var E = eig2(false), A = E.M, x0 = nz(-4, 4), y0 = nz(-4, 4), al = (E.q * x0 - y0) / E.d, be = x0 - al;
      var kind = E.l2 < 0 ? 'a saddle point (unstable)' : 'an unstable node';
      return Q('Consider the system ' + M('\\dot{x} = ' + lin(A[0], ['x', 'y'])) + ', ' + M('\\dot{y} = ' + lin(A[1], ['x', 'y'])) + '.' + D.phase(A), [
        ['Find the eigenvalues and corresponding eigenvectors of the matrix of the system.', 4, M('\\lambda = ' + E.l1) + ': ' + M(vv([1, E.p])) + '; ' + M('\\lambda = ' + E.l2) + ': ' + M(vv([1, E.q]))],
        ['Write down the general solution, and classify the equilibrium point at the origin.', 3, M(vec(['x', 'y']) + ' = Ae^{' + et(E.l1) + '}' + vv([1, E.p]) + ' + Be^{' + et(E.l2) + '}' + vv([1, E.q])) + '; ' + kind],
        ['Find the particular solution with ' + M('x(0) = ' + x0) + ' and ' + M('y(0) = ' + y0) + ', and describe the long-term behaviour of ' + M('y/x') + '.', 4, M('A = ' + fs(fr(E.q * x0 - y0, E.d)) + ',\\ B = ' + fs(fr(x0 * E.d - (E.q * x0 - y0), E.d))) + '; ' + (Math.abs(al) > 1e-9 ? M('y/x \\to ' + E.p) : M('y/x = ' + E.q) + ' throughout')]
      ]);
    },
    function () {
      var p = ri(1, 4) / 2, q = ri(4, 12), x0 = ri(1, 3), h = 0.1, x = x0, v = 0, i;
      for (i = 0; i < 2; i++) { var nx = x + h * v, nv = v + h * (-q * x - p * v); x = nx; v = nv; }
      var w = Math.sqrt(q - p * p / 4);
      return Q('The motion of a damped spring is modelled by ' + M('\\ddot{x} + ' + (p === 1 ? '' : num(p)) + '\\dot{x} + ' + q + 'x = 0') + ', with ' + M('x = ' + x0) + ' and ' + M('\\dot{x} = 0') + ' when ' + M('t = 0') + '.', [
        ['By letting ' + M('y = \\dot{x}') + ', write the equation as a system of first-order equations in matrix form.', 2, M(vec(['\\dot{x}', '\\dot{y}']) + ' = ' + mat([[0, 1], [-q, '-' + num(p)]]) + vec(['x', 'y']))],
        ['Find the eigenvalues of the matrix and describe the phase portrait.', 4, M('\\lambda^2 + ' + (p === 1 ? '' : num(p)) + '\\lambda + ' + q + ' = 0') + ', ' + M('\\lambda = ' + num(-p / 2) + ' \\pm ' + s3(w) + 'i') + '; a stable spiral: the oscillations decay to the origin'],
        ['Use Euler’s method with step 0.1 to estimate ' + M('x') + ' and ' + M('\\dot{x}') + ' when ' + M('t = 0.2') + '.', 3, M('x \\approx ' + s3(x) + ',\\ \\dot{x} \\approx ' + s3(v))]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
