/* Byte Size — IB Mathematics: Applications and Interpretation (SL + AHL)
   Part 1: shared helpers, Topic 1 Number and algebra, Topic 2 Functions.
   Difficulty: 1 = Standard, 2 = Exam, 3 = Challenging. */
(function (g) {
  var BS = g.BS, D = BS.draw;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br,
      dp = BS.dp, num = BS.num, M = BS.m;
  var IB = BS.ib = {};

  /* ---------- helpers ---------- */
  var s3 = IB.s3 = function (x) { var s = BS.sf(x, 3); return /^-0(\.0+)?$/.test(s) ? s.slice(1) : s; };
  IB.s4 = function (x) { var s = BS.sf(x, 4); return /^-0(\.0+)?$/.test(s) ? s.slice(1) : s; };
  IB.usd = function (x) { return '$' + x.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  IB.vec = function (a) { return '\\begin{pmatrix} ' + a.join(' \\\\ ') + ' \\end{pmatrix}'; };
  IB.mat = function (A) { return '\\begin{pmatrix} ' + A.map(function (r) { return r.join(' & '); }).join(' \\\\ ') + ' \\end{pmatrix}'; };
  IB.mm = function (A, B) { return A.map(function (r) { return B[0].map(function (_, j) { return r.reduce(function (s, v, k) { return s + v * B[k][j]; }, 0); }); }); };
  IB.mpow = function (A, n) { var R = A.map(function (r, i) { return r.map(function (_, j) { return i === j ? 1 : 0; }); }); for (var i = 0; i < n; i++) R = IB.mm(R, A); return R; };
  IB.pif = function (n, d) { // n*pi/d in simplest form
    if (n === 0) return '0';
    var k = gcd(n, d); n /= k; d /= k; if (d < 0) { n = -n; d = -d; }
    var sgn = n < 0 ? '-' : '', a = Math.abs(n);
    var top = (a === 1 ? '' : a) + '\\pi';
    return sgn + (d === 1 ? top : '\\frac{' + top + '}{' + d + '}');
  };
  IB.lineEq = function (mn, md, cn, cd) { // y = (mn/md) x + (cn/cd)
    if (mn === 0) return 'y = ' + frac(cn, cd);
    var k = gcd(mn, md); mn /= k; md /= k; if (md < 0) { mn = -mn; md = -md; }
    var mStr = (mn === md) ? '' : (mn === -md) ? '-' : frac(mn, md);
    var cStr = cn === 0 ? '' : (cn * cd < 0 ? ' - ' : ' + ') + frac(Math.abs(cn), Math.abs(cd));
    return 'y = ' + mStr + 'x' + cStr;
  };
  IB.erf = function (x) { var t = 1 / (1 + 0.3275911 * Math.abs(x)); var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x >= 0 ? y : -y; };
  IB.Phi = function (z) { return 0.5 * (1 + IB.erf(z / Math.SQRT2)); };
  IB.ncdf = function (x, mu, sd) { return IB.Phi((x - mu) / sd); };
  IB.invPhi = function (p) { // Acklam's algorithm
    var a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00],
        b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01],
        c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00],
        d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
    var q, r;
    if (p < 0.02425) { q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    if (p > 1 - 0.02425) { q = Math.sqrt(-2 * Math.log(1 - p)); return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    q = p - 0.5; r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  };
  IB.lgamma = function (x) {
    var c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
    var y = x, t = x + 5.5; t -= (x + 0.5) * Math.log(t); var s = 1.000000000190015;
    for (var j = 0; j < 6; j++) s += c[j] / ++y;
    return -t + Math.log(2.5066282746310005 * s / x);
  };
  IB.gammaQ = function (a, x) { // regularised upper incomplete gamma
    if (x <= 0) return 1;
    var gln = IB.lgamma(a);
    if (x < a + 1) {
      var ap = a, sum = 1 / a, del = sum;
      for (var n = 0; n < 500; n++) { ap++; del *= x / ap; sum += del; if (Math.abs(del) < Math.abs(sum) * 1e-14) break; }
      return 1 - sum * Math.exp(-x + a * Math.log(x) - gln);
    }
    var b = x + 1 - a, cc = 1 / 1e-300, dd = 1 / b, h = dd;
    for (var i = 1; i < 500; i++) {
      var an = -i * (i - a); b += 2; dd = an * dd + b; if (Math.abs(dd) < 1e-300) dd = 1e-300; cc = b + an / cc; if (Math.abs(cc) < 1e-300) cc = 1e-300;
      dd = 1 / dd; var de = dd * cc; h *= de; if (Math.abs(de - 1) < 1e-14) break;
    }
    return Math.exp(-x + a * Math.log(x) - gln) * h;
  };
  IB.chi2sf = function (x, k) { return IB.gammaQ(k / 2, x / 2); };
  IB.comb = function (n, k) { var r = 1; for (var i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; };
  IB.bpdf = function (n, p, k) { return IB.comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k); };
  IB.bcdf = function (n, p, k) { var s = 0; for (var i = 0; i <= k; i++) s += IB.bpdf(n, p, i); return Math.min(1, s); };
  IB.ppdf = function (m, k) { var r = Math.exp(-m); for (var i = 1; i <= k; i++) r *= m / i; return r; };
  IB.pcdf = function (m, k) { var s = 0; for (var i = 0; i <= k; i++) s += IB.ppdf(m, i); return Math.min(1, s); };
  IB.mean = function (a) { return a.reduce(function (s, v) { return s + v; }, 0) / a.length; };
  IB.sd = function (a) { var m = IB.mean(a); return Math.sqrt(a.reduce(function (s, v) { return s + (v - m) * (v - m); }, 0) / a.length); };
  IB.median = function (s) { var n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
  IB.quart = function (a) { // GDC method: halves exclude the median
    var s = a.slice().sort(function (x, y) { return x - y; }), n = s.length, h = Math.floor(n / 2);
    return [s[0], IB.median(s.slice(0, h)), IB.median(s), IB.median(s.slice(n % 2 ? h + 1 : h)), s[n - 1]];
  };
  IB.pearson = function (x, y) {
    var mx = IB.mean(x), my = IB.mean(y), sxy = 0, sxx = 0, syy = 0;
    x.forEach(function (v, i) { sxy += (v - mx) * (y[i] - my); sxx += (v - mx) * (v - mx); syy += (y[i] - my) * (y[i] - my); });
    return { r: sxy / Math.sqrt(sxx * syy), a: sxy / sxx, b: my - sxy / sxx * mx };
  };
  IB.ranks = function (a) { var s = a.slice().sort(function (x, y) { return y - x; }); return a.map(function (v) { return s.indexOf(v) + 1; }); };
  IB.table = function (head, rows) {
    return '<div class="qtable"><table><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  };
  IB.htable = function (rows) { // first column is a header
    return '<div class="qtable"><table><tbody>' + rows.map(function (r) { return '<tr><th>' + r[0] + '</th>' + r.slice(1).map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  };
  function q1(q, m, a, stem) { return { stem: stem, parts: [{ q: q, m: m, a: a }] }; }
  IB.q1 = q1;
  var T = BS.topic, s3l = s3, usd = IB.usd, vec = IB.vec, mat = IB.mat;

  /* =============== TOPIC 1: NUMBER AND ALGEBRA =============== */
  T({ id: 'ib-approx', name: 'Standard form, approximation and error', video: 'IB maths AI percentage error standard form', gens: [
    { d: [1], f: function () {
      var A; do { A = ri(1001, 9999); } while (A % 10 === 0);
      var k = ri(6, 10), N = A * Math.pow(10, k - 3);
      var r2 = Math.round(A / 100) / 10, k2 = k; if (r2 >= 10) { r2 = 1; k2 = k + 1; }
      return { stem: 'A space probe has travelled ' + num(N) + ' km since its launch.', parts: [
        { q: 'Write this distance in the form ' + M('a \\times 10^{k}') + ', where ' + M('1 \\le a < 10') + ' and ' + M('k \\in \\mathbb{Z}') + '.', m: 2, a: M((A / 1000) + ' \\times 10^{' + k + '}') },
        { q: 'Write this distance correct to two significant figures, in the form ' + M('a \\times 10^{k}') + '.', m: 1, a: M(r2.toFixed(1) + ' \\times 10^{' + k2 + '}') }
      ] };
    } },
    { d: [1, 2], f: function () {
      var L = ri(1200, 4800) / 10, E = Math.round(L / 10) * 10 + pick([10, -10, 0]); if (E === L) E += 10;
      return q1('Mei estimates that the height of a tower is ' + E + ' m. The actual height is ' + L.toFixed(1) + ' m.<br>Calculate the percentage error in Mei’s estimate.', 2,
        M('\\left|\\frac{' + E + ' - ' + L.toFixed(1) + '}{' + L.toFixed(1) + '}\\right| \\times 100\\%') + ' = ' + s3(Math.abs(E - L) / L * 100) + '%');
    } },
    { d: [2, 3], f: function () {
      function d1() { var v; do { v = ri(21, 149) / 10; } while (Math.abs(v * 10 % 10 - 5) < 1e-9 || v * 10 % 10 === 0); return v; }
      var a = d1(), b = d1(), c = d1();
      var V = a * b * c, Ve = Math.round(a) * Math.round(b) * Math.round(c);
      return { stem: 'A box is a cuboid with dimensions ' + a.toFixed(1) + ' cm, ' + b.toFixed(1) + ' cm and ' + c.toFixed(1) + ' cm.', parts: [
        { q: 'Calculate the exact volume of the box.', m: 1, a: num(Math.round(V * 1000) / 1000) + ' cm³' },
        { q: 'Write your answer to part (a) correct to three significant figures.', m: 1, a: s3(V) + ' cm³' },
        { q: 'Sam estimates the volume by rounding each dimension to the nearest centimetre. Calculate the percentage error in Sam’s estimate.', m: 3, a: 'Estimate ' + Ve + ' cm³; error ' + s3(Math.abs(Ve - V) / V * 100) + '%' }
      ] };
    } }
  ] });

  T({ id: 'ib-arith', name: 'Arithmetic sequences and series', video: 'IB maths AI arithmetic sequences and series', gens: [
    { d: [1], f: function () {
      var u1 = ri(12, 30), d = ri(2, 5), n = ri(12, 30);
      return { stem: 'The first row of a theatre has ' + u1 + ' seats. Each row has ' + d + ' more seats than the row in front of it. There are ' + n + ' rows.', parts: [
        { q: 'Find the number of seats in the last row.', m: 2, a: M(u1 + ' + (' + n + ' - 1) \\times ' + d + ' = ' + (u1 + (n - 1) * d)) },
        { q: 'Find the total number of seats in the theatre.', m: 2, a: M('\\frac{' + n + '}{2}(2 \\times ' + u1 + ' + ' + (n - 1) + ' \\times ' + d + ') = ' + (n * (2 * u1 + (n - 1) * d) / 2)) }
      ] };
    } },
    { d: [2], f: function () {
      var u1 = ri(-10, 30), d = nz(-6, 8), k = ri(3, 6), m = k + ri(3, 8), N = ri(20, 40);
      return { stem: 'In an arithmetic sequence, ' + M('u_{' + k + '} = ' + (u1 + (k - 1) * d)) + ' and ' + M('u_{' + m + '} = ' + (u1 + (m - 1) * d)) + '.', parts: [
        { q: 'Find the common difference, ' + M('d') + '.', m: 2, a: M('d = ' + d) },
        { q: 'Find the first term, ' + M('u_1') + '.', m: 1, a: M('u_1 = ' + u1) },
        { q: 'Find the sum of the first ' + N + ' terms.', m: 2, a: M('S_{' + N + '} = ' + (N * (2 * u1 + (N - 1) * d) / 2)) }
      ] };
    } },
    { d: [3], f: function () {
      var u1 = 5 * ri(4, 20), d = 5 * ri(1, 4), target = 50 * ri(60, 200);
      var n = 1; while (n * (2 * u1 + (n - 1) * d) / 2 < target) n++;
      return { stem: 'Jo saves $' + u1 + ' in the first month. Each month after that she saves $' + d + ' more than the month before.', parts: [
        { q: 'Find the amount Jo saves in the 12th month.', m: 2, a: '$' + (u1 + 11 * d) },
        { q: 'Find the total amount Jo has saved after 12 months.', m: 2, a: '$' + num(6 * (2 * u1 + 11 * d)) },
        { q: 'Find the number of months it takes for Jo’s total savings to first reach at least $' + num(target) + '.', m: 3, a: n + ' months' }
      ] };
    } }
  ] });

  T({ id: 'ib-geom', name: 'Geometric sequences and series', video: 'IB maths AI geometric sequences infinite series', gens: [
    { d: [1], f: function () {
      var u1 = ri(2, 9), r = pick([1.5, 2, 3, 0.8, 1.2]), n = ri(6, 12);
      return { stem: 'A geometric sequence has first term ' + u1 + ' and common ratio ' + r + '.', parts: [
        { q: 'Find the ' + n + 'th term.', m: 2, a: s3(u1 * Math.pow(r, n - 1)) },
        { q: 'Find the sum of the first ' + n + ' terms.', m: 2, a: s3(u1 * (Math.pow(r, n) - 1) / (r - 1)) }
      ] };
    } },
    { d: [2], f: function () {
      var P0 = 500 * ri(10, 60), p = pick([2, 2.5, 3, 3.5, 4, 5]), n = ri(5, 12), X = Math.round(P0 * pick([1.5, 1.8, 2]) / 100) * 100;
      var k = 0, P = P0; while (P <= X) { P *= 1 + p / 100; k++; }
      return { stem: 'The population of a town is ' + num(P0) + '. It is expected to increase by ' + p + '% each year.', parts: [
        { q: 'Find the expected population after ' + n + ' years.', m: 2, a: M(num(P0) + ' \\times ' + (100 + p) / 100 + '^{' + n + '}') + ' = ' + num(Math.round(P0 * Math.pow(1 + p / 100, n))) },
        { q: 'Find the number of complete years until the population first exceeds ' + num(X) + '.', m: 3, a: k + ' years' }
      ] };
    } },
    { d: [2, 3], f: function () {
      var h = ri(2, 10), r = pick([0.5, 0.6, 0.7, 0.75, 0.8]);
      return { stem: 'A ball is dropped from a height of ' + h + ' m. After each bounce it rises to ' + (r * 100) + '% of the height of the previous bounce.', parts: [
        { q: 'Find the height the ball reaches after the third bounce.', m: 2, a: s3(h * r * r * r) + ' m' },
        { q: 'Find the total vertical distance the ball travels before it comes to rest.', m: 3, a: M(h + ' + 2 \\times \\frac{' + h + ' \\times ' + r + '}{1 - ' + r + '}') + ' = ' + s3(h + 2 * h * r / (1 - r)) + ' m' }
      ] };
    } },
    { d: [3], f: function () {
      var r = pick([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8]), u1 = ri(3, 30), S = u1 / (1 - r);
      return { stem: 'An infinite geometric series has first term ' + u1 + ' and sum to infinity ' + s3(S) + '.', parts: [
        { q: 'Find the common ratio.', m: 2, a: M('r = 1 - \\frac{' + u1 + '}{' + s3(S) + '} = ' + r) },
        { q: 'Find the least number of terms needed for the sum of the series to exceed ' + s3(0.99 * S) + '.', m: 3, a: (function () { var n = 1; while (u1 * (1 - Math.pow(r, n)) / (1 - r) <= Number(s3(0.99 * S))) n++; return n; })() + ' terms' }
      ] };
    } }
  ] });

  T({ id: 'ib-finance', name: 'Financial mathematics: interest, depreciation and loans', video: 'IB maths AI financial mathematics TVM solver', gens: [
    { d: [1, 2], f: function () {
      var P = 500 * ri(4, 40), r = pick([2.4, 3, 3.6, 4.2, 4.8, 5.4]), k = pick([4, 12]), n = ri(3, 10);
      var FV = P * Math.pow(1 + r / (100 * k), k * n);
      return { stem: 'Ana invests $' + num(P) + ' in an account that pays a nominal annual interest rate of ' + r + '%, compounded ' + (k === 12 ? 'monthly' : 'quarterly') + '.', parts: [
        { q: 'Find the value of the investment after ' + n + ' years. Give your answer to two decimal places.', m: 3, a: M(num(P) + '\\left(1 + \\frac{' + r + '}{100 \\times ' + k + '}\\right)^{' + k * n + '}') + ' = ' + usd(FV) },
        { q: 'Find the interest earned.', m: 1, a: usd(FV - P) }
      ] };
    } },
    { d: [2], f: function () {
      var V = 1000 * ri(15, 45), r = pick([10, 12, 15, 18, 20]), n = ri(3, 6), X = 1000 * Math.round(V * pick([0.3, 0.4, 0.5]) / 1000);
      var k = 0, v = V; while (v >= X) { v *= 1 - r / 100; k++; }
      return { stem: 'A car is bought for $' + num(V) + '. Its value depreciates by ' + r + '% each year.', parts: [
        { q: 'Find the value of the car after ' + n + ' years, to the nearest dollar.', m: 2, a: '$' + num(Math.round(V * Math.pow(1 - r / 100, n))) },
        { q: 'Find the number of complete years until the value of the car first falls below $' + num(X) + '.', m: 3, a: k + ' years' }
      ] };
    } },
    { d: [3], f: function () {
      var L = 5000 * ri(20, 80), r = pick([3.5, 4, 4.5, 5, 5.5, 6]), n = pick([10, 15, 20, 25]);
      var i = r / 1200, N = 12 * n, PMT = L * i / (1 - Math.pow(1 + i, -N));
      return { stem: 'Raj takes out a loan of $' + num(L) + ' to buy an apartment. The loan has a nominal annual interest rate of ' + r + '%, compounded monthly. He repays the loan in equal monthly payments over ' + n + ' years.', parts: [
        { q: 'Find the amount of each monthly payment.', m: 3, a: usd(PMT) },
        { q: 'Find the total interest Raj pays over the ' + n + ' years.', m: 2, a: usd(PMT * N - L) }
      ] };
    } }
  ] });

  T({ id: 'ib-logs', name: 'Exponents and logarithms', video: 'IB maths AI laws of logarithms', gens: [
    { d: [1], f: function () {
      var b = pick([2, 3, 5, 10]), k = ri(2, b === 2 ? 6 : 3), N = ri(20, 900);
      return { parts: [
        { q: 'Find the exact value of ' + M('\\log_{' + b + '} ' + Math.pow(b, k)) + '.', m: 1, a: M(String(k)) },
        { q: 'Solve ' + M('10^{x} = ' + N) + '. Give your answer correct to three significant figures.', m: 2, a: M('x = \\log_{10} ' + N + ' = ' + s3(Math.log10(N))) }
      ] };
    } },
    { d: [2], f: function () {
      var opts = []; [2, 3].forEach(function (b) { for (var n = 2; n <= 6; n++) { var B = Math.pow(b, n); for (var x = 1; x <= 20; x++) if (B % x === 0 && B / x - x > 0 && B / x - x <= 30) opts.push([b, n, x, B / x - x]); } });
      var o = pick(opts), b = o[0], n = o[1], x = o[2], k = o[3];
      return q1('Solve ' + M('\\log_{' + b + '} x + \\log_{' + b + '}(x + ' + k + ') = ' + n) + '.', 4,
        M('x(x + ' + k + ') = ' + Math.pow(b, n) + ' \\Rightarrow x = ' + x) + ' (reject ' + M('x = ' + (-Math.pow(b, n) / x)) + ' since ' + M('x > 0') + ')');
    } },
    { d: [2, 3], f: function () {
      var a = ri(2, 6), c = ri(2, 5);
      return q1('Write ' + M('2\\log ' + a + ' + \\log ' + c + ' - \\log ' + a) + ' as a single logarithm.', 2, M('\\log ' + a * c));
    } },
    { d: [3], f: function () {
      var c = ri(2, 5), m = ri(1, 3), A = ri(2, 9), B = ri(15, 200), k = pick([0.2, 0.3, 0.5, 0.4]);
      return { parts: [
        { q: 'Simplify ' + M('(' + c * c * c + 'x^{' + 3 * m + '})^{\\frac{2}{3}}') + '.', m: 2, a: M(c * c + 'x^{' + 2 * m + '}') },
        { q: 'Solve ' + M(A + 'e^{' + k + 'x} = ' + B) + '. Give your answer correct to three significant figures.', m: 3, a: M('x = \\frac{\\ln(' + B + '/' + A + ')}{' + k + '} = ' + s3(Math.log(B / A) / k)) }
      ] };
    } }
  ] });

  T({ id: 'ib-systems', name: 'Systems of equations and polynomials', video: 'IB maths AI systems of linear equations GDC', gens: [
    { d: [1], f: function () {
      var c = ri(2, 5) + 0.5 * ri(0, 1), t = ri(1, 4) + 0.5 * ri(0, 1), a1 = ri(2, 5), b1 = ri(1, 4), a2 = ri(1, 4), b2 = ri(2, 6);
      while (a1 * b2 - a2 * b1 === 0) b2++;
      return q1('At a café, ' + a1 + ' coffees and ' + b1 + ' teas cost $' + (a1 * c + b1 * t).toFixed(2) + '. ' + a2 + ' coffees and ' + b2 + ' teas cost $' + (a2 * c + b2 * t).toFixed(2) + '.<br>Find the cost of one coffee and the cost of one tea.', 4, 'Coffee $' + c.toFixed(2) + ', tea $' + t.toFixed(2));
    } },
    { d: [2], f: function () {
      var x = nz(-5, 6), y = nz(-5, 6), z = nz(-5, 6), A, det;
      do { A = [[ri(1, 4), nz(-3, 3), nz(-3, 3)], [nz(-3, 3), ri(1, 4), nz(-3, 3)], [nz(-3, 3), nz(-3, 3), ri(1, 4)]];
        det = A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]); } while (det === 0);
      var rows = A.map(function (r) { return poly([r[0], 0]).replace(/x$/, 'x').replace(' + 0', '') .replace(/^0$/, '') ; });
      function lhs(r) { var s = ''; [['x', r[0]], ['y', r[1]], ['z', r[2]]].forEach(function (t, i) { var a = t[1]; var term = (Math.abs(a) === 1 ? '' : Math.abs(a)) + t[0]; s += i === 0 ? (a < 0 ? '-' : '') + term : (a < 0 ? ' - ' : ' + ') + term; }); return s; }
      var eqs = A.map(function (r) { return lhs(r) + ' &= ' + (r[0] * x + r[1] * y + r[2] * z); });
      return q1('Solve the system of equations<br>' + M('\\begin{aligned} ' + eqs.join(' \\\\ ') + ' \\end{aligned}'), 3, M('x = ' + x + ',\\ y = ' + y + ',\\ z = ' + z));
    } },
    { d: [3], f: function () {
      var a = -ri(1, 3), b = ri(2, 12), c = ri(0, 8), xs = BS.shuffle([1, 2, 3, 4, 5, 6]).slice(0, 3).sort(function (p, q) { return p - q; });
      var Y = function (x) { return a * x * x + b * x + c; };
      return { stem: 'The path of a ball is modelled by ' + M('y = ax^2 + bx + c') + ', where ' + M('x') + ' is the horizontal distance and ' + M('y') + ' the height, both in metres. The ball passes through the points ' + xs.map(function (x) { return M('(' + x + ',\\ ' + Y(x) + ')'); }).join(', ') + '.', parts: [
        { q: 'Write down a system of three equations in ' + M('a') + ', ' + M('b') + ' and ' + M('c') + '.', m: 3, a: xs.map(function (x) { return M(x * x + 'a + ' + x + 'b + c = ' + Y(x)); }).join('<br>') },
        { q: 'Hence find the values of ' + M('a') + ', ' + M('b') + ' and ' + M('c') + '.', m: 2, a: M('a = ' + a + ',\\ b = ' + b + ',\\ c = ' + c) },
        { q: 'Find the maximum height of the ball.', m: 2, a: s3(c - b * b / (4 * a)) + ' m' }
      ] };
    } }
  ] });

  T({ id: 'ib-complex', name: 'Complex numbers', video: 'IB maths AI complex numbers Euler form', gens: [
    { d: [1], f: function () {
      var a = nz(-6, 6), b = nz(-6, 6), c = nz(-6, 6), d = nz(-6, 6);
      function cx(re, im) { return re === 0 ? (im + 'i').replace(/^1i/, 'i').replace(/^-1i/, '-i') : re + (im === 0 ? '' : (im < 0 ? ' - ' : ' + ') + (Math.abs(im) === 1 ? '' : Math.abs(im)) + 'i'); }
      return { stem: M('z = ' + cx(a, b)) + ' and ' + M('w = ' + cx(c, d)) + '.', parts: [
        { q: 'Find ' + M('2z - w') + '.', m: 2, a: M(cx(2 * a - c, 2 * b - d)) },
        { q: 'Find ' + M('zw') + '.', m: 2, a: M(cx(a * c - b * d, a * d + b * c)) },
        { q: 'Find ' + M('z^{*}') + ', the complex conjugate of ' + M('z') + '.', m: 1, a: M(cx(a, -b)) }
      ] };
    } },
    { d: [2], f: function () {
      var a = nz(-5, 5), b = nz(-5, 5), r = Math.hypot(a, b), th = Math.atan2(b, a);
      var cx = a + (b < 0 ? ' - ' : ' + ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'i';
      return { stem: 'The complex number ' + M('z = ' + cx) + ' is shown on the Argand diagram.' + D.argand([{ re: a, im: b, name: 'z' }]), parts: [
        { q: 'Find the modulus of ' + M('z') + '.', m: 2, a: M('\\sqrt{' + (a * a + b * b) + '}') + ' = ' + s3(r) },
        { q: 'Find the argument of ' + M('z') + ', in radians, where ' + M('-\\pi < \\arg z \\le \\pi') + '.', m: 2, a: s3(th) },
        { q: 'Write ' + M('z') + ' in the form ' + M('re^{i\\theta}') + '.', m: 1, a: M(s3(r) + 'e^{' + s3(th) + 'i}') }
      ] };
    } },
    { d: [3], f: function () {
      var ang = [[1, 6], [1, 4], [1, 3], [1, 2], [2, 3], [3, 4], [5, 6]];
      var A = pick(ang), B = pick(ang), r1 = ri(2, 5), r2 = ri(2, 5);
      var sn = A[0] * B[1] + B[0] * A[1], sd = A[1] * B[1]; if (sn / sd > 1) sn -= 2 * sd;
      var t1 = A[0] / A[1] * Math.PI;
      var re = Math.pow(r1, 3) * Math.cos(3 * t1), im = Math.pow(r1, 3) * Math.sin(3 * t1);
      if (Math.abs(re) < 1e-9) re = 0; if (Math.abs(im) < 1e-9) im = 0;
      return { stem: M('z_1 = ' + r1 + 'e^{i' + IB.pif(A[0], A[1]).replace('\\frac{\\pi}', '\\frac{\\pi}') + '}') + ' and ' + M('z_2 = ' + r2 + 'e^{i' + IB.pif(B[0], B[1]) + '}') + '.', parts: [
        { q: 'Find ' + M('z_1 z_2') + ', giving your answer in the form ' + M('re^{i\\theta}') + ', where ' + M('-\\pi < \\theta \\le \\pi') + '.', m: 2, a: M(r1 * r2 + 'e^{i' + IB.pif(sn, sd) + '}') },
        { q: 'Find ' + M('(z_1)^3') + ', giving your answer in the form ' + M('a + bi') + '.', m: 3, a: M(im === 0 ? s3(re) : re === 0 ? s3(im) + 'i' : s3(re) + (im < 0 ? ' - ' : ' + ') + s3(Math.abs(im)) + 'i') }
      ] };
    } }
  ] });

  T({ id: 'ib-matrices', name: 'Matrices', video: 'IB maths AI matrices inverse', gens: [
    { d: [1], f: function () {
      var A = [[nz(-4, 5), nz(-4, 5)], [nz(-4, 5), nz(-4, 5)]], B = [[nz(-4, 5), nz(-4, 5)], [nz(-4, 5), nz(-4, 5)]];
      return { stem: M('\\mathbf{A} = ' + mat(A)) + ' and ' + M('\\mathbf{B} = ' + mat(B)) + '.', parts: [
        { q: 'Find ' + M('\\mathbf{A} + 2\\mathbf{B}') + '.', m: 2, a: M(mat(A.map(function (r, i) { return r.map(function (v, j) { return v + 2 * B[i][j]; }); }))) },
        { q: 'Find ' + M('\\mathbf{AB}') + '.', m: 2, a: M(mat(IB.mm(A, B))) }
      ] };
    } },
    { d: [2], f: function () {
      var a, b, c, d, det; do { a = nz(-5, 6); b = nz(-5, 6); c = nz(-5, 6); d = nz(-5, 6); det = a * d - b * c; } while (det === 0);
      var x = nz(-5, 6), y = nz(-5, 6);
      function lhs(p, q) { return (p === 1 ? '' : p === -1 ? '-' : p) + 'x' + (q < 0 ? ' - ' : ' + ') + (Math.abs(q) === 1 ? '' : Math.abs(q)) + 'y'; }
      return { stem: M('\\mathbf{A} = ' + mat([[a, b], [c, d]])) + '.', parts: [
        { q: 'Find ' + M('\\det \\mathbf{A}') + '.', m: 1, a: M(String(det)) },
        { q: 'Find ' + M('\\mathbf{A}^{-1}') + '.', m: 2, a: M((det < 0 ? '-' : '') + '\\frac{1}{' + Math.abs(det) + '}' + mat([[d, -b], [-c, a]])) },
        { q: 'Hence solve the system ' + M('\\begin{aligned} ' + lhs(a, b) + ' &= ' + (a * x + b * y) + ' \\\\ ' + lhs(c, d) + ' &= ' + (c * x + d * y) + ' \\end{aligned}'), m: 3, a: M('x = ' + x + ',\\ y = ' + y) }
      ] };
    } },
    { d: [3], f: function () {
      var a = ri(2, 6), c = ri(2, 7), d = ri(2, 9), k = frac(a * d, c);
      var P = [[ri(1, 3), nz(-2, 2)], [nz(-2, 2), ri(1, 3)]], Q = [[nz(-3, 4), nz(-3, 4)], [nz(-3, 4), nz(-3, 4)]];
      var dp_ = P[0][0] * P[1][1] - P[0][1] * P[1][0]; if (dp_ === 0) { P[0][1] = 0; dp_ = P[0][0] * P[1][1]; }
      var Pinv = [[P[1][1] / dp_, -P[0][1] / dp_], [-P[1][0] / dp_, P[0][0] / dp_]], X = IB.mm(Pinv, Q);
      return { parts: [
        { q: 'The matrix ' + M('\\mathbf{M} = ' + mat([[a, 'k'], [c, d]])) + ' has no inverse. Find the value of ' + M('k') + '.', m: 2, a: M(a + ' \\times ' + d + ' - ' + c + 'k = 0 \\Rightarrow k = ' + k) },
        { q: M(mat(P) + '\\mathbf{X} = ' + mat(Q)) + '. Find the matrix ' + M('\\mathbf{X}') + '.', m: 3, a: M(mat(X.map(function (r) { return r.map(function (v) { var n = Math.round(v * dp_); return frac(n, dp_); }); }))) }
      ] };
    } }
  ] });

  function eigenSetup() {
    var p, q, l1, l2;
    do { p = ri(-2, 2); q = ri(-2, 2); l1 = nz(-3, 5); l2 = nz(-3, 5); } while (l1 === l2 || (p === 0 && q === 0));
    var P = [[1, p], [q, 1 + p * q]], Pi = [[1 + p * q, -p], [-q, 1]];
    var A = IB.mm(IB.mm(P, [[l1, 0], [0, l2]]), Pi);
    return { A: A, P: P, Pi: Pi, l1: l1, l2: l2, v1: [1, q], v2: [p, 1 + p * q] };
  }
  IB.eigenSetup = eigenSetup;
  T({ id: 'ib-eigen', name: 'Eigenvalues and eigenvectors', video: 'IB maths AI eigenvalues eigenvectors diagonalisation', gens: [
    { d: [1, 2], f: function () {
      var e = eigenSetup(), A = e.A, tr = A[0][0] + A[1][1], det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
      return { stem: M('\\mathbf{A} = ' + mat(A)) + '.', parts: [
        { q: 'Show that the characteristic equation of ' + M('\\mathbf{A}') + ' is ' + M('\\lambda^2' + (tr === 0 ? '' : (tr > 0 ? ' - ' : ' + ') + (Math.abs(tr) === 1 ? '' : Math.abs(tr)) + '\\lambda') + (det === 0 ? '' : sg(det)) + ' = 0') + '.', m: 2, a: M('\\det(\\mathbf{A} - \\lambda\\mathbf{I}) = (' + A[0][0] + ' - \\lambda)(' + A[1][1] + ' - \\lambda) - (' + A[0][1] + ')(' + A[1][0] + ') = 0') },
        { q: 'Find the eigenvalues of ' + M('\\mathbf{A}') + '.', m: 2, a: M('\\lambda = ' + Math.min(e.l1, e.l2) + ',\\ ' + Math.max(e.l1, e.l2)) },
        { q: 'Find an eigenvector for each eigenvalue.', m: 3, a: M('\\lambda = ' + e.l1 + ': ' + vec(e.v1)) + '; ' + M('\\lambda = ' + e.l2 + ': ' + vec(e.v2)) + ' (or any non-zero multiple)' }
      ] };
    } },
    { d: [3], f: function () {
      var e = eigenSetup(), n = ri(3, 5), An = IB.mpow(e.A, n);
      return { stem: M('\\mathbf{A} = ' + mat(e.A)) + '. The eigenvalues of ' + M('\\mathbf{A}') + ' are ' + M(e.l1) + ' and ' + M(e.l2) + '.', parts: [
        { q: 'Find matrices ' + M('\\mathbf{P}') + ' and ' + M('\\mathbf{D}') + ' such that ' + M('\\mathbf{A} = \\mathbf{PDP}^{-1}') + ', where ' + M('\\mathbf{D}') + ' is a diagonal matrix.', m: 4, a: M('\\mathbf{P} = ' + mat(e.P) + ',\\ \\mathbf{D} = ' + mat([[e.l1, 0], [0, e.l2]])) + ' (columns of P are eigenvectors, in the same order)' },
        { q: 'Hence find ' + M('\\mathbf{A}^{' + n + '}') + '.', m: 3, a: M('\\mathbf{PD}^{' + n + '}\\mathbf{P}^{-1} = ' + mat(An.map(function (r) { return r.map(function (v) { return Math.round(v); }); }))) }
      ] };
    } }
  ] });

  /* =============== TOPIC 2: FUNCTIONS =============== */
  T({ id: 'ib-lines', name: 'Equations of straight lines', video: 'IB maths AI equation of a straight line perpendicular', gens: [
    { d: [1], f: function () {
      var run = ri(1, 4), rise = nz(-4, 4), x1 = ri(0, 3), y1 = ri(rise < 0 ? 4 : 0, rise < 0 ? 8 : 3), x2 = x1 + run, y2 = y1 + rise;
      if (x2 > 8) { x1 -= x2 - 8; x2 = 8; }
      var p = D.plane({ xmin: -1, xmax: 9, ymin: -1, ymax: 9, w: 300, h: 300, grid: true, ticks: true, tstep: 2 });
      var m = rise / run, c = y1 - m * x1;
      var s = p.svg + p.curve(function (x) { return m * x + c; }, -1, 9) + D.dot(p.X(x1), p.Y(y1)) + D.dot(p.X(x2), p.Y(y2)) +
        D.text(p.X(x1) + 8, p.Y(y1) - 10, 'A', { cls: 'it' }) + D.text(p.X(x2) + 8, p.Y(y2) - 10, 'B', { cls: 'it' });
      return { stem: 'The diagram shows the line ' + M('L') + ' passing through the points ' + M('A(' + x1 + ',\\ ' + y1 + ')') + ' and ' + M('B(' + x2 + ',\\ ' + y2 + ')') + '.' + D.svg(300, 300, s, 'Line through A and B', true), parts: [
        { q: 'Find the gradient of ' + M('L') + '.', m: 2, a: M(frac(rise, run)) },
        { q: 'Find the equation of ' + M('L') + ' in the form ' + M('y = mx + c') + '.', m: 2, a: M(IB.lineEq(rise, run, y1 * run - rise * x1, run)) }
      ] };
    } },
    { d: [2], f: function () {
      var pn = nz(-4, 4), pd = ri(1, 3), xa = ri(-4, 4), ya = ri(-4, 4), xb = ri(-4, 4), yb = ri(-4, 4);
      var k = gcd(pn, pd); pn /= k; pd /= k;
      // perpendicular gradient -pd/pn through B: pn(y - yb) = -pd(x - xb) -> pd x + pn y - (pd xb + pn yb) = 0
      var a = pd, b = pn, d = -(pd * xb + pn * yb); if (a < 0 || (a === 0 && b < 0)) { a = -a; b = -b; d = -d; }
      var g2 = gcd(gcd(a, b), d) || 1; a /= g2; b /= g2; d /= g2;
      var eq = (a === 1 ? '' : a) + 'x' + (b < 0 ? ' - ' : ' + ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y' + (d === 0 ? '' : sg(d)) + ' = 0';
      return { stem: 'The line ' + M('L_1') + ' has gradient ' + M(frac(pn, pd)) + ' and passes through ' + M('A(' + xa + ',\\ ' + ya + ')') + '.', parts: [
        { q: 'Find the equation of ' + M('L_1') + ' in the form ' + M('y = mx + c') + '.', m: 2, a: M(IB.lineEq(pn, pd, ya * pd - pn * xa, pd)) },
        { q: 'The line ' + M('L_2') + ' is perpendicular to ' + M('L_1') + ' and passes through ' + M('B(' + xb + ',\\ ' + yb + ')') + '. Find the equation of ' + M('L_2') + ' in the form ' + M('ax + by + d = 0') + ', where ' + M('a, b, d \\in \\mathbb{Z}') + '.', m: 3, a: M(eq) }
      ] };
    } },
    { d: [3], f: function () {
      var X0 = ri(-4, 5), Y0 = ri(-4, 5), m1 = nz(-3, 3), a = ri(1, 4), b = nz(-4, 4); while (b * m1 === -a) b = nz(-4, 4);
      var c1 = Y0 - m1 * X0, d = -(a * X0 + b * Y0);
      return q1('Find the coordinates of the point of intersection of the lines ' + M('y = ' + poly([m1, c1])) + ' and ' + M((a === 1 ? '' : a) + 'x' + (b < 0 ? ' - ' : ' + ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y' + (d === 0 ? '' : sg(d)) + ' = 0') + '.', 3, M('(' + X0 + ',\\ ' + Y0 + ')'));
    } }
  ] });

  T({ id: 'ib-functions', name: 'Functions: domain, range, composite and inverse', video: 'IB maths AI composite inverse functions', gens: [
    { d: [1], f: function () {
      var a = nz(-3, 3), b = ri(-5, 5), lo = -ri(1, 3), hi = ri(2, 4), f = function (x) { return a * x * x + b; };
      var vals = [f(lo), f(hi), f(0)], mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals);
      return { stem: 'The function ' + M('f') + ' is defined by ' + M('f(x) = ' + poly([a, 0, b])) + ', for ' + M(lo + ' \\le x \\le ' + hi) + '.', parts: [
        { q: 'Find ' + M('f(' + (hi - 1) + ')') + '.', m: 1, a: M(String(f(hi - 1))) },
        { q: 'Find the range of ' + M('f') + '.', m: 2, a: M(mn + ' \\le f(x) \\le ' + mx) }
      ] };
    } },
    { d: [2], f: function () {
      var a = nz(-4, 5), b = nz(-6, 6), c = ri(1, 9), k = nz(-8, 12);
      return { stem: M('f(x) = ' + poly([a, b])) + ' and ' + M('g(x) = x^2 - ' + c) + '.', parts: [
        { q: 'Find ' + M('(g \\circ f)(x)') + ', giving your answer in the form ' + M('px^2 + qx + r') + '.', m: 2, a: M(poly([a * a, 2 * a * b, b * b - c])) },
        { q: 'Find ' + M('f^{-1}(x)') + '.', m: 2, a: M('f^{-1}(x) = ' + (a > 0 ? '\\frac{x' + sg(-b) + '}{' + a + '}' : '\\frac{' + b + ' - x}{' + (-a) + '}')) },
        { q: 'Find ' + M('f^{-1}(' + k + ')') + '.', m: 1, a: M(frac(k - b, a)) }
      ] };
    } },
    { d: [3], f: function () {
      var a = ri(1, 3), c = nz(-3, 3), b; do { b = nz(-6, 6); } while (b === a * c);
      var f = function (x) { return (a * x + b) / (x + c); };
      var p = D.plane({ xmin: -8, xmax: 8, ymin: -8, ymax: 8, w: 300, h: 300, ticks: true, tstep: 2 });
      var s = p.svg + D.line(p.X(-c), p.Y(-8), p.X(-c), p.Y(8), 'dash') + D.line(p.X(-8), p.Y(a), p.X(8), p.Y(a), 'dash') +
        p.curve(f, -8, -c - 0.01, 'curve', 200) + p.curve(f, -c + 0.01, 8, 'curve', 200);
      var fx = '\\frac{' + poly([a, b]) + '}{' + poly([1, c]) + '}';
      return { stem: 'The function ' + M('f') + ' is defined by ' + M('f(x) = ' + fx) + ', for ' + M('x \\ne ' + (-c)) + '. Part of the graph of ' + M('y = f(x)') + ' is shown.' + D.svg(300, 300, s, 'Graph of a rational function', true), parts: [
        { q: 'Write down the equation of the vertical asymptote and the equation of the horizontal asymptote.', m: 2, a: M('x = ' + (-c)) + ' and ' + M('y = ' + a) },
        { q: 'Find the coordinates of the points where the graph meets the axes.', m: 2, a: M('(' + frac(-b, a) + ',\\ 0)') + ' and ' + M('(0,\\ ' + frac(b, c) + ')') },
        { q: 'Find ' + M('f^{-1}(x)') + '.', m: 3, a: M('f^{-1}(x) = \\frac{' + poly([-c, b]) + '}{' + poly([1, -a]) + '}') }
      ] };
    } }
  ] });

  T({ id: 'ib-graphs', name: 'Graphs and their key features', video: 'IB maths AI key features of graphs', gens: [
    { d: [1], f: function () {
      var a = pick([1, -1, 2, -2]), h = nz(-3, 3), k = ri(-4, 4), y0 = a * h * h + k;
      var f = function (x) { return a * (x - h) * (x - h) + k; };
      var ymin = Math.min(k, y0, -2) - 2, ymax = Math.max(k, y0, 2) + 2;
      var p = D.plane({ xmin: Math.min(-1, h - 4), xmax: Math.max(1, h + 4), ymin: ymin, ymax: ymax, w: 300, h: 280 });
      var s = p.svg + p.curve(f, h - 4, h + 4) + D.dot(p.X(h), p.Y(k)) + D.text(p.X(h) + 8, p.Y(k) + (a > 0 ? 14 : -14), '(' + h + ', ' + k + ')', { size: 12 }) +
        D.dot(p.X(0), p.Y(y0)) + D.text(p.X(0) + 8, p.Y(y0) + (a > 0 ? -10 : 12), '(0, ' + y0 + ')', { size: 12 });
      return { stem: 'The diagram shows the graph of the quadratic function ' + M('y = a(x - h)^2 + k') + '. The vertex is at ' + M('(' + h + ',\\ ' + k + ')') + ' and the graph meets the ' + M('y') + '-axis at ' + M('(0,\\ ' + y0 + ')') + '.' + D.svg(300, 280, s, 'Quadratic graph', true), parts: [
        { q: 'Write down the equation of the axis of symmetry.', m: 1, a: M('x = ' + h) },
        { q: 'Find the value of ' + M('a') + '.', m: 2, a: M(y0 + ' = a(' + (-h) + ')^2' + (k < 0 ? ' - ' + (-k) : k > 0 ? ' + ' + k : '') + ' \\Rightarrow a = ' + a) },
        { q: 'Write down the range of the function.', m: 1, a: M(a > 0 ? 'y \\ge ' + k : 'y \\le ' + k) }
      ] };
    } },
    { d: [2], f: function () {
      var roots; do { roots = BS.shuffle([-3, -2, -1, 1, 2, 3, 4]).slice(0, 3).sort(function (x, y) { return x - y; }); } while (false);
      var a = pick([1, -1, 2, 0.5]), f = function (x) { return a * (x - roots[0]) * (x - roots[1]) * (x - roots[2]); }, y0 = f(0);
      var vals = []; for (var x = roots[0] - 0.6; x <= roots[2] + 0.6; x += 0.05) vals.push(f(x));
      var ymin = Math.floor(Math.min.apply(null, vals.concat([y0, 0]))) - 1, ymax = Math.ceil(Math.max.apply(null, vals.concat([y0, 0]))) + 1;
      var p = D.plane({ xmin: roots[0] - 1, xmax: roots[2] + 1, ymin: ymin, ymax: ymax, w: 300, h: 280 });
      var s = p.svg + p.curve(f, roots[0] - 0.6, roots[2] + 0.6);
      roots.forEach(function (r) { s += D.dot(p.X(r), p.Y(0)) + D.text(p.X(r), p.Y(0) + 14, r, { anchor: 'middle', size: 12 }); });
      s += D.dot(p.X(0), p.Y(y0)) + D.text(p.X(0) + 10, p.Y(y0) - 10, '(0, ' + num(y0) + ')', { size: 12 });
      return { stem: 'The diagram shows the graph of a cubic function ' + M('y = f(x)') + '. It crosses the ' + M('x') + '-axis at ' + M('x = ' + roots.join(',\\ ')) + ' and the ' + M('y') + '-axis at ' + M('(0,\\ ' + num(y0) + ')') + '.' + D.svg(300, 280, s, 'Cubic graph', true), parts: [
        { q: 'Write down ' + M('f(x)') + ' in the form ' + M('a(x - p)(x - q)(x - r)') + ', leaving ' + M('a') + ' unknown.', m: 2, a: M('a' + roots.map(function (r) { return br(1, -r); }).join('')) },
        { q: 'Find the value of ' + M('a') + '.', m: 2, a: M('a = ' + num(a)) }
      ] };
    } },
    { d: [3], f: function () {
      var A = ri(1, 4), b = pick([2, 3, 0.5]), c = ri(-3, 3), f = function (x) { return A * Math.pow(b, x) + c; };
      var xmin = -3, xmax = 3, vals = [f(xmin), f(xmax), c];
      var ymin = Math.floor(Math.min.apply(null, vals.concat([0]))) - 1, ymax = Math.min(Math.ceil(Math.max.apply(null, vals)) + 1, c + 14);
      var p = D.plane({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, w: 300, h: 280 });
      var s = p.svg + D.line(p.X(xmin), p.Y(c), p.X(xmax), p.Y(c), 'dash') + p.curve(f, xmin, xmax) +
        D.dot(p.X(0), p.Y(A + c)) + D.text(p.X(0) + 8, p.Y(A + c) - 10, '(0, ' + (A + c) + ')', { size: 12 }) +
        D.dot(p.X(1), p.Y(f(1))) + D.text(p.X(1) + 8, p.Y(f(1)) + (b < 1 ? 12 : -10), '(1, ' + num(f(1)) + ')', { size: 12 }) +
        D.text(p.X(xmax) - 4, p.Y(c) + (c >= ymax - 1 ? 12 : -10), 'y = ' + c, { anchor: 'end', size: 12 });
      return { stem: 'The graph of ' + M('y = A \\times b^{x} + c') + ' is shown. It has a horizontal asymptote ' + M('y = ' + c) + ' and passes through ' + M('(0,\\ ' + (A + c) + ')') + ' and ' + M('(1,\\ ' + num(f(1)) + ')') + '.' + D.svg(300, 280, s, 'Exponential graph', true), parts: [
        { q: 'Write down the value of ' + M('c') + '.', m: 1, a: M(String(c)) },
        { q: 'Find the value of ' + M('A') + '.', m: 2, a: M('A = ' + A) },
        { q: 'Find the value of ' + M('b') + '.', m: 2, a: M('b = ' + num(b)) }
      ] };
    } }
  ] });

  T({ id: 'ib-models', name: 'Modelling: linear, exponential and sinusoidal', video: 'IB maths AI modelling sinusoidal exponential', gens: [
    { d: [1], f: function () {
      var m = ri(15, 60), b = 5 * ri(4, 30), ns = [2, 5, 8], N = ri(12, 25);
      return { stem: 'The total cost, ' + M('C') + ' dollars, of hiring a minibus for ' + M('n') + ' hours is shown in the table.' + IB.table(['Hours, ' + M('n'), ns[0], ns[1], ns[2]], [['Cost, ' + M('C') + ' ($)', m * ns[0] + b, m * ns[1] + b, m * ns[2] + b]]) + 'The cost can be modelled by a linear function.', parts: [
        { q: 'Find the equation of the model in the form ' + M('C = an + b') + '.', m: 3, a: M('C = ' + m + 'n + ' + b) },
        { q: 'Interpret the value of ' + M('b') + ' in context.', m: 1, a: 'The fixed charge of $' + b + ' (the cost before any hours are added).' },
        { q: 'Find the cost of hiring the minibus for ' + N + ' hours.', m: 1, a: '$' + (m * N + b) }
      ] };
    } },
    { d: [2], f: function () {
      var R = ri(18, 24), T0 = ri(80, 95), t1 = pick([5, 10]), k = pick([0.04, 0.05, 0.06, 0.08]), A = T0 - R;
      var T1 = Math.round((A * Math.exp(-k * t1) + R) * 10) / 10, kk = -Math.log((T1 - R) / A) / t1, t2 = ri(20, 40), target = ri(R + 8, R + 20);
      return { stem: 'The temperature, ' + M('T') + ' °C, of a cup of coffee ' + M('t') + ' minutes after it is made is modelled by ' + M('T(t) = Ae^{-kt} + ' + R) + '. The initial temperature is ' + T0 + ' °C and after ' + t1 + ' minutes it is ' + T1 + ' °C.', parts: [
        { q: 'Find the value of ' + M('A') + '.', m: 1, a: M('A = ' + A) },
        { q: 'Find the value of ' + M('k') + '.', m: 2, a: M('k = ' + s3(kk)) },
        { q: 'Find the temperature after ' + t2 + ' minutes.', m: 2, a: s3(A * Math.exp(-kk * t2) + R) + ' °C' },
        { q: 'Find the time taken for the temperature to fall to ' + target + ' °C.', m: 2, a: s3(-Math.log((target - R) / A) / kk) + ' minutes' }
      ] };
    } },
    { d: [2, 3], f: function () {
      var P = pick([8, 10, 12, 24]), a = ri(2, 8), d = a + ri(1, 8), half = P / 2;
      var h = function (t) { return a * Math.cos(2 * Math.PI * t / P) + d; };
      var p = D.plane({ xmin: 0, xmax: P * 1.25, ymin: 0, ymax: d + a + 2, w: 320, h: 240, tstep: P / 4, tstepy: Math.max(2, Math.round((d + a) / 4)), ticks: true, xl: 't', yl: 'h' });
      var s = p.svg + p.curve(h, 0, P * 1.25) + D.dot(p.X(0), p.Y(d + a)) + D.text(p.X(0) + 8, p.Y(d + a) - 10, '(0, ' + (d + a) + ')', { size: 12 }) +
        D.dot(p.X(half), p.Y(d - a)) + D.text(p.X(half), p.Y(d - a) + 14, '(' + half + ', ' + (d - a) + ')', { anchor: 'middle', size: 12 });
      var v = ri(d - a + 1, d + a - 1), t1 = Math.acos((v - d) / a) * P / (2 * Math.PI);
      return { stem: 'The height, ' + M('h') + ' metres, of the water in a harbour ' + M('t') + ' hours after midnight is modelled by ' + M('h(t) = a\\cos(bt) + d') + '. The graph shows a maximum at ' + M('(0,\\ ' + (d + a) + ')') + ' and the next minimum at ' + M('(' + half + ',\\ ' + (d - a) + ')') + '.' + D.svg(320, 240, s, 'Sinusoidal graph', true), parts: [
        { q: 'Find the value of ' + M('a') + ' and the value of ' + M('d') + '.', m: 2, a: M('a = ' + a + ',\\ d = ' + d) },
        { q: 'Find the value of ' + M('b') + '.', m: 2, a: M('b = \\frac{2\\pi}{' + P + '} = ' + IB.pif(2, P)) + ' (' + s3(2 * Math.PI / P) + ')' },
        { q: 'Find the first time after midnight when the height of the water is ' + v + ' m.', m: 2, a: M('t = ' + s3(t1)) + ' hours' }
      ] };
    } }
  ] });

  T({ id: 'ib-logistic', name: 'Logistic and logarithmic models', video: 'IB maths AI logistic model', gens: [
    { d: [1, 2], f: function (d) {
      var L = 100 * ri(5, 30), C = ri(4, 20), k = pick([0.2, 0.3, 0.4, 0.5, 0.6]), t = ri(3, 8), X = Math.round(L * pick([0.6, 0.75, 0.9]) / 10) * 10;
      var P = function (t) { return L / (1 + C * Math.exp(-k * t)); };
      var parts = [
        { q: 'Find the initial number of fish.', m: 2, a: s3(P(0)) },
        { q: 'Find the number of fish after ' + t + ' years.', m: 2, a: s3(P(t)) },
        { q: 'Write down the number of fish the lake can support in the long term.', m: 1, a: num(L) }
      ];
      if (d === 2) parts.push({ q: 'Find the time it takes for the number of fish to reach ' + num(X) + '.', m: 2, a: s3(-Math.log((L / X - 1) / C) / k) + ' years' });
      return { stem: 'The number of fish, ' + M('N') + ', in a lake ' + M('t') + ' years after the lake was stocked is modelled by ' + M('N(t) = \\frac{' + L + '}{1 + ' + C + 'e^{-' + k + 't}}') + '.', parts: parts };
    } },
    { d: [3], f: function () {
      var a = ri(10, 40), y2 = a + ri(20, 60), b = (y2 - a) / Math.log(10), x3 = ri(20, 60);
      return { stem: 'The height, ' + M('y') + ' cm, of a plant ' + M('x') + ' days after it is planted is modelled by ' + M('y = a + b\\ln x') + ', for ' + M('x \\ge 1') + '. When ' + M('x = 1') + ', ' + M('y = ' + a) + ', and when ' + M('x = 10') + ', ' + M('y = ' + y2) + '.', parts: [
        { q: 'Write down the value of ' + M('a') + '.', m: 1, a: M('a = ' + a) },
        { q: 'Find the value of ' + M('b') + '.', m: 2, a: M('b = \\frac{' + (y2 - a) + '}{\\ln 10} = ' + s3(b)) },
        { q: 'Find the height of the plant after ' + x3 + ' days.', m: 2, a: s3(a + b * Math.log(x3)) + ' cm' }
      ] };
    } }
  ] });

  T({ id: 'ib-transform', name: 'Transformations of graphs', video: 'IB maths AI transformations of graphs', gens: [
    { d: [1], f: function () {
      var p = ri(-5, 5), q = ri(-5, 5), h = nz(-4, 4), k = nz(-4, 4);
      return { stem: 'The point ' + M('A(' + p + ',\\ ' + q + ')') + ' lies on the graph of ' + M('y = f(x)') + '.', parts: [
        { q: 'Find the coordinates of the image of ' + M('A') + ' on the graph of ' + M('y = f(x' + sg(-h) + ')' + sg(k)) + '.', m: 2, a: M('(' + (p + h) + ',\\ ' + (q + k) + ')') },
        { q: 'Find the coordinates of the image of ' + M('A') + ' on the graph of ' + M('y = -f(x)') + '.', m: 1, a: M('(' + p + ',\\ ' + (-q) + ')') },
        { q: 'Find the coordinates of the image of ' + M('A') + ' on the graph of ' + M('y = f(-x)') + '.', m: 1, a: M('(' + (-p) + ',\\ ' + q + ')') }
      ] };
    } },
    { d: [2], f: function () {
      var a = pick([2, 3, -1, -2, 0.5]), h = nz(-4, 4), k = nz(-5, 5);
      return { stem: 'The graph of ' + M('f(x) = x^2') + ' is stretched vertically by scale factor ' + num(a < 0 ? -a : a) + (a < 0 ? ', reflected in the ' + M('x') + '-axis' : '') + ' and then translated by ' + M(vec([h, k])) + ' to give the graph of ' + M('y = g(x)') + '.', parts: [
        { q: 'Write down ' + M('g(x)') + ' in the form ' + M('a(x - h)^2 + k') + '.', m: 3, a: M('g(x) = ' + (a === 1 ? '' : a === -1 ? '-' : num(a)) + br(1, -h) + '^2' + sg(k)) },
        { q: 'Write down the coordinates of the vertex of the graph of ' + M('g') + '.', m: 1, a: M('(' + h + ',\\ ' + k + ')') }
      ] };
    } },
    { d: [3], f: function () {
      var a = pick([2, 3, 0.5]), b = pick([2, 3, 0.5]), h = nz(-3, 3), k = nz(-4, 4), p = nz(-3, 3) * (b === 3 ? 3 : b === 2 ? 2 : 1), q = nz(-4, 4);
      var px = p / b + h, py = a * q + k;
      return { stem: 'The graph of ' + M('y = f(x)') + ' is transformed to the graph of ' + M('y = ' + num(a) + 'f\\left(' + (b === 0.5 ? '\\tfrac{1}{2}' : b) + '(x' + sg(-h) + ')\\right)' + sg(k)) + '.', parts: [
        { q: 'Describe fully the sequence of transformations.', m: 4, a: 'Horizontal stretch, scale factor ' + (b === 3 ? M('\\tfrac{1}{3}') : num(1 / b)) + '; translation ' + Math.abs(h) + ' units ' + (h > 0 ? 'right' : 'left') + '; vertical stretch, scale factor ' + num(a) + '; translation ' + Math.abs(k) + ' units ' + (k > 0 ? 'up' : 'down') + '.' },
        { q: 'The point ' + M('(' + p + ',\\ ' + q + ')') + ' lies on ' + M('y = f(x)') + '. Find its image.', m: 2, a: M('(' + num(px) + ',\\ ' + num(py) + ')') }
      ] };
    } }
  ] });

  T({ id: 'ib-linearise', name: 'Linearising data with logarithms', video: 'IB maths AI semi log log log graphs', gens: [
    { d: [1, 2], f: function () {
      var m = ri(10, 90) / 100, c = ri(5, 30) / 10;
      return { stem: 'Data that follow the model ' + M('y = ab^{x}') + ' are plotted as ' + M('\\ln y') + ' against ' + M('x') + '. The points lie on the straight line ' + M('\\ln y = ' + m + 'x + ' + c) + '.', parts: [
        { q: 'Find the value of ' + M('a') + '.', m: 2, a: M('a = e^{' + c + '} = ' + s3(Math.exp(c))) },
        { q: 'Find the value of ' + M('b') + '.', m: 2, a: M('b = e^{' + m + '} = ' + s3(Math.exp(m))) }
      ] };
    } },
    { d: [2, 3], f: function () {
      var n = pick([0.5, 1.5, 2, 2.5, -1, 3]), a = ri(2, 9), xs = [1, 2, 4, 8, 16].slice(0, 4);
      var ys = xs.map(function (x) { return a * Math.pow(x, n); });
      return { stem: 'The table shows data for two variables ' + M('x') + ' and ' + M('y') + ', which are thought to follow a model ' + M('y = ax^{n}') + '.' + IB.table([M('x')].concat(xs.map(String)), [[M('y')].concat(ys.map(s3))]), parts: [
        { q: 'Explain why a graph of ' + M('\\ln y') + ' against ' + M('\\ln x') + ' will be a straight line.', m: 2, a: M('\\ln y = n\\ln x + \\ln a') + ', which has the form ' + M('Y = mX + c') + '.' },
        { q: 'Find the value of ' + M('n') + ' and the value of ' + M('a') + '.', m: 4, a: M('n = ' + num(n) + ',\\ a = ' + a) }
      ] };
    } }
  ] });
})(typeof window !== 'undefined' ? window : globalThis);
