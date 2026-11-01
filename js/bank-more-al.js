/* Byte Size Classroom — more question types for A level Mathematics (Pearson Edexcel), AQA Level 2 Further Maths and GCSE statistics,
   so that a set on one topic is more varied. g = 9.8 m s⁻². */
(function (g) {
  var BS = g.BS, D = BS.draw, IB = BS.ib;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, dp = BS.dp, num = BS.num, M = BS.m;
  var s3 = function (x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : IB.s3(x); }, vec = IB.vec, mat = IB.mat, table = IB.table;
  var G = 9.8;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: p[2] }; }) }; }
  function add(id, list) { var t = BS.topics[id]; if (!t) return; list.forEach(function (x) { t.gens.push({ d: x[0], f: x[1] }); }); }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } var k = gcd(Math.abs(n), d) || 1; return frac(n / k, d / k); }
  function xm(v) { return v ? '(x' + sg(-v) + ')' : 'x'; }
  // signed partial-fraction term n / (d * factor)
  function pf(n, d, fac, first) { if (d < 0) { n = -n; d = -d; } var k = gcd(Math.abs(n), d) || 1; n /= k; d /= k; if (n === 0) return first ? '' : ''; var sgn = n < 0 ? (first ? '-' : ' - ') : (first ? '' : ' + '); return sgn + '\\frac{' + Math.abs(n) + '}{' + (d === 1 ? fac.replace(/^\((.*)\)$/, '$1') : d + fac) + '}'; }
  function ijv(v) { var o = ''; ['\\mathbf{i}', '\\mathbf{j}'].forEach(function (e, i) { if (!v[i]) return; o += (o ? (v[i] < 0 ? ' - ' : ' + ') : (v[i] < 0 ? '-' : '')) + (Math.abs(v[i]) === 1 ? '' : Math.abs(v[i])) + e; }); return o || '\\mathbf{0}'; }
  function comb(n, k) { return Math.round(IB.comb(n, k)); }

  /* ---------- AS ---------- */
  add('al-indices', [[[1], function () {
    var a = pick([2, 3, 5]), p = ri(2, 4), q = ri(1, 3);
    return Q('', [
      ['Write ' + M('\\sqrt{' + (a * p * p) + '}') + ' in the form ' + M('k\\sqrt{' + a + '}') + '.', 1, M(p + '\\sqrt{' + a + '}')],
      ['Simplify ' + M('\\frac{' + (2 * q) + '}{\\sqrt{' + a + '}}') + ', rationalising the denominator.', 2, M(fr(2 * q, a) + '\\sqrt{' + a + '}')],
      ['Write ' + M(Math.pow(a, 2) + '^{x}') + ' as a power of ' + a + '.', 1, M(a + '^{2x}')]
    ]);
  }]]);
  add('al-equations', [[[1], function () {
    var x = nz(-5, 5), y = nz(-5, 5), a = ri(1, 4), b = ri(1, 4), c = ri(1, 4), d = -ri(1, 4);
    return Q('', [
      ['Solve the simultaneous equations ' + M(c1(a, 'x') + ' + ' + c1(b, 'y') + ' = ' + (a * x + b * y)) + ' and ' + M(c1(c, 'x') + (d < 0 ? ' - ' : ' + ') + c1(Math.abs(d), 'y') + ' = ' + (c * x + d * y)) + '.', 3, M('x = ' + x + ',\\ y = ' + y)],
      ['Write the solution set of ' + M('x < ' + x + '\\ \\text{or}\\ x \\ge ' + (x + 3)) + ' using set notation.', 1, M('\\{x : x < ' + x + '\\} \\cup \\{x : x \\ge ' + (x + 3) + '\\}')]
    ]);
  }]]);
  add('al-graphs', [
    [[1, 2], function () {
      var a = nz(-4, 4), b = nz(-4, 4), c = nz(-4, 4); while (b === a) b = nz(-4, 4); while (c === a || c === b) c = nz(-4, 4);
      return Q('Sketch ' + M('y = ' + xm(a) + xm(b) + xm(c)) + '.', [
        ['Write down the coordinates of the points where the curve crosses the axes.', 2, M('(' + a + ', 0), (' + b + ', 0), (' + c + ', 0)') + ' and ' + M('(0, ' + (-a * b * c) + ')')],
        ['Describe the shape of the curve as ' + M('x \\to \\infty') + ' and as ' + M('x \\to -\\infty') + '.', 1, M('y \\to \\infty') + ' and ' + M('y \\to -\\infty') + ' (positive cubic)']
      ]);
    }],
    [[2], function () {
      var k = ri(1, 9), h = nz(-4, 4), v = nz(-4, 4);
      return Q('The curve ' + M('C') + ' has equation ' + M('y = \\frac{' + k + '}{x' + sg(-h) + '}' + sg(v)) + '.', [
        ['Write down the equations of the asymptotes.', 2, M('x = ' + h) + ', ' + M('y = ' + v)],
        ['Find the coordinates of the point where ' + M('C') + ' crosses the ' + M('y') + '-axis.', 1, M('(0,\\ ' + fr(v * h - k, h) + ')')],
        ['Describe the transformation that maps ' + M('y = \\frac{' + k + '}{x}') + ' onto ' + M('C') + '.', 1, 'Translation by ' + M(vec([String(h), String(v)]))]
      ]);
    }]
  ]);
  add('al-vectors', [[[1], function () {
    var a = [nz(-6, 6), nz(-6, 6)], b = [nz(-6, 6), nz(-6, 6)], k = nz(-3, 3);
    return Q(M('\\mathbf{a} = ' + ijv(a)) + ' and ' + M('\\mathbf{b} = ' + ijv(b)) + '.', [
      ['Find ' + M(c1(k, '\\mathbf{a}') + ' + \\mathbf{b}') + '.', 1, M(ijv([k * a[0] + b[0], k * a[1] + b[1]]))],
      ['Find ' + M('|\\mathbf{a}|') + ' and the angle ' + M('\\mathbf{a}') + ' makes with ' + M('\\mathbf{i}') + '.', 3, M(s3(Math.hypot(a[0], a[1]))) + '; ' + M(s3(Math.atan2(a[1], a[0]) * 180 / Math.PI) + '^\\circ')]
    ]);
  }]]);
  add('al-integration', [[[1], function () {
    var a = ri(2, 6), b = ri(1, 5), n = ri(2, 4), c = ri(1, 3);
    return Q('', [
      ['Find ' + M('\\int (' + a + 'x^{' + n + '} + ' + b + ')\\,dx') + '.', 2, M((fr(a, n + 1) === '1' ? '' : fr(a, n + 1)) + 'x^{' + (n + 1) + '} + ' + c1(b, 'x') + ' + c')],
      ['Evaluate ' + M('\\int_0^{' + c + '} (' + a + 'x^{' + n + '} + ' + b + ')\\,dx') + '.', 2, M(fr(a * Math.pow(c, n + 1) + b * c * (n + 1), n + 1))]
    ]);
  }]]);
  add('al-representations', [[[1], function () {
    var lo = ri(10, 30), q1 = lo + ri(5, 12), med = q1 + ri(3, 10), q3 = med + ri(3, 12), hi = q3 + ri(4, 30), iqr = q3 - q1, up = q3 + 1.5 * iqr;
    return Q('For a set of data, the lowest value is ' + lo + ', ' + M('Q_1 = ' + q1) + ', median ' + med + ', ' + M('Q_3 = ' + q3) + ' and the highest value is ' + hi + '.', [
      ['Find the interquartile range.', 1, M(iqr)],
      ['An outlier is a value more than ' + M('1.5 \\times \\text{IQR}') + ' above ' + M('Q_3') + '. Decide whether the highest value is an outlier.', 2, 'Limit ' + M(num(up)) + ': ' + (hi > up ? 'yes, it is an outlier' : 'no')]
    ]);
  }]]);
  add('al-sampling', [
    [[1, 2], function () {
      var N = ri(4, 9) * 100, groups = [ri(2, 5) * 20, ri(2, 5) * 20, ri(2, 5) * 20], tot = groups.reduce(function (a, b) { return a + b; }), n = pick([20, 30, 40, 50]);
      return Q('A school has ' + tot + ' students in Years 10, 11 and 12, with ' + groups.join(', ') + ' students respectively. A stratified sample of ' + n + ' is taken.', [
        ['Find the number of Year 11 students in the sample.', 2, M('\\frac{' + groups[1] + '}{' + tot + '} \\times ' + n + ' = ' + s3(groups[1] * n / tot)) + (Number.isInteger(groups[1] * n / tot) ? '' : ' (round sensibly)')],
        ['Give one advantage of stratified sampling over simple random sampling.', 1, 'It reflects the proportions of each group in the population.']
      ]);
    }],
    [[2], function () {
      var N = ri(3, 9) * 100, n = pick([20, 25, 50]), k = N / n;
      return Q('A factory makes ' + N + ' items a day, numbered 1 to ' + N + '. A sample of ' + n + ' items is needed.', [
        ['Describe how to take a systematic sample.', 2, 'Sampling interval ' + M(N + ' \\div ' + n + ' = ' + k) + '; choose a random start from 1 to ' + k + ', then every ' + k + 'th item.'],
        ['Explain why this sample might be biased.', 1, 'If faults occur in a pattern that matches the interval, they could be over- or under-represented.']
      ]);
    }]
  ]);
  add('al-location', [
    [[1, 2], function () {
      var n = ri(10, 25), sx = ri(300, 900), sxx = Math.round(sx * sx / n + ri(100, 900)), mean = sx / n, sd = Math.sqrt(sxx / n - mean * mean);
      return Q('For a set of ' + n + ' values, ' + M('\\sum x = ' + sx) + ' and ' + M('\\sum x^2 = ' + sxx) + '.', [
        ['Find the mean.', 1, M(s3(mean))],
        ['Find the standard deviation.', 2, M('\\sqrt{\\frac{' + sxx + '}{' + n + '} - ' + s3(mean) + '^2} = ' + s3(sd))]
      ]);
    }],
    [[2], function () {
      var a = ri(10, 50), b = pick([2, 5, 10]), my = ri(10, 50) / 10, sy = ri(5, 30) / 10;
      return Q('Data are coded using ' + M('y = \\frac{x - ' + a + '}{' + b + '}') + '. The coded data have mean ' + my + ' and standard deviation ' + sy + '.', [
        ['Find the mean of ' + M('x') + '.', 2, M(b + ' \\times ' + my + ' + ' + a + ' = ' + s3(b * my + a))],
        ['Find the standard deviation of ' + M('x') + '.', 1, M(b + ' \\times ' + sy + ' = ' + s3(b * sy))]
      ]);
    }]
  ]);
  add('al-correlation', [
    [[1, 2], function () {
      var a = ri(10, 50), b = ri(5, 30) / 10, x0 = ri(5, 20), x1 = ri(40, 80); if (b === 1) b = 1.2;
      return Q('The regression line of ' + M('y') + ' (mass, g) on ' + M('x') + ' (length, cm) for some fish, with lengths from 5 cm to 25 cm, is ' + M('y = ' + a + ' + ' + b + 'x') + '.', [
        ['Interpret the gradient in context.', 1, 'Each extra 1 cm of length adds about ' + b + ' g of mass.'],
        ['Estimate the mass of a fish of length ' + x0 + ' cm, and comment on reliability.', 2, M(s3(a + b * x0)) + ' g; reliable (interpolation)'],
        ['Explain why the line should not be used for a fish of length ' + x1 + ' cm.', 1, 'Extrapolation: ' + x1 + ' cm is outside the data range.']
      ]);
    }],
    [[2], function () {
      var r = pick([-0.92, -0.65, -0.21, 0.18, 0.47, 0.88]);
      return Q('The product moment correlation coefficient between hours of sleep and reaction time for 12 people is ' + r + '.', [
        ['Describe the correlation.', 1, (Math.abs(r) > 0.8 ? 'Strong ' : Math.abs(r) > 0.4 ? 'Moderate ' : 'Weak ') + (r > 0 ? 'positive' : 'negative') + ' correlation'],
        ['A student says this shows that sleeping more causes faster reactions. Comment.', 1, 'Correlation does not imply causation; there may be other factors.']
      ]);
    }]
  ]);
  add('al-probability', [
    [[1, 2], function () {
      var pa = ri(2, 6) / 10, pb = ri(2, 6) / 10, ind = Math.random() < 0.5, pab = ind ? pa * pb : Math.round((pa * pb + pick([-0.05, 0.05, 0.1])) * 100) / 100;
      return Q(M('P(A) = ' + pa) + ', ' + M('P(B) = ' + pb) + ' and ' + M('P(A \\cap B) = ' + num(Math.round(pab * 100) / 100)) + '.', [
        ['Find ' + M('P(A \\cup B)') + '.', 2, M(s3(pa + pb - pab))],
        ['Determine whether ' + M('A') + ' and ' + M('B') + ' are independent.', 2, M('P(A)P(B) = ' + num(Math.round(pa * pb * 100) / 100)) + ': ' + (Math.abs(pab - pa * pb) < 1e-9 ? 'independent' : 'not independent')]
      ]);
    }],
    [[2], function () {
      var r = ri(3, 7), b = ri(3, 7), n = r + b;
      return Q('A bag has ' + r + ' red and ' + b + ' blue counters. Two are taken without replacement.', [
        ['Draw a tree diagram and find the probability that both are the same colour.', 3, M(fr(r * (r - 1) + b * (b - 1), n * (n - 1)))],
        ['Find the probability that at least one is red.', 2, M('1 - ' + fr(b * (b - 1), n * (n - 1)) + ' = ' + fr(n * (n - 1) - b * (b - 1), n * (n - 1)))]
      ]);
    }]
  ]);
  add('al-binomial-dist', [
    [[1, 2], function () {
      var n = ri(8, 20), p = pick([0.1, 0.2, 0.25, 0.3, 0.4]), k = Math.max(1, Math.round(n * p) + ri(-2, 1));
      return Q('Each seed has probability ' + p + ' of not germinating. ' + n + ' seeds are planted.', [
        ['State a suitable distribution, and an assumption needed.', 2, M('X \\sim B(' + n + ',\\ ' + p + ')') + '; seeds germinate independently'],
        ['Find ' + M('P(X = ' + k + ')') + ' and ' + M('P(X \\le ' + k + ')') + '.', 3, M(s3(IB.bpdf(n, p, k))) + ' and ' + M(s3(IB.bcdf(n, p, k)))]
      ]);
    }],
    [[2], function () {
      var n = ri(10, 25), p = pick([0.2, 0.3, 0.35, 0.4]), a = Math.max(1, Math.round(n * p) - ri(1, 3)), b = a + ri(2, 4);
      return Q(M('X \\sim B(' + n + ',\\ ' + p + ')') + '.', [
        ['Find ' + M('P(' + a + ' < X \\le ' + b + ')') + '.', 2, M('P(X \\le ' + b + ') - P(X \\le ' + a + ') = ' + s3(IB.bcdf(n, p, b) - IB.bcdf(n, p, a)))],
        ['Find ' + M('P(X \\ge ' + b + ')') + '.', 2, M('1 - P(X \\le ' + (b - 1) + ') = ' + s3(1 - IB.bcdf(n, p, b - 1)))]
      ]);
    }]
  ]);
  add('al-hypothesis', [
    [[1, 2], function () {
      var n = pick([20, 25, 30]), p = pick([0.2, 0.25, 0.3]), c = 0;
      while (1 - IB.bcdf(n, p, c - 1) > 0.05) c++;
      return Q('A test of ' + M('H_0: p = ' + p) + ' against ' + M('H_1: p > ' + p) + ' uses ' + M('X \\sim B(' + n + ',\\ ' + p + ')') + ' at the 5% level.', [
        ['Find the critical region.', 3, M('X \\ge ' + c) + ' (since ' + M('P(X \\ge ' + c + ') = ' + s3(1 - IB.bcdf(n, p, c - 1))) + ' and ' + M('P(X \\ge ' + (c - 1) + ') = ' + s3(1 - IB.bcdf(n, p, c - 2))) + ')'],
        ['Write down the actual significance level.', 1, M(s3(1 - IB.bcdf(n, p, c - 1)))]
      ]);
    }],
    [[2], function () {
      var n = pick([15, 20, 25]), p = pick([0.3, 0.4, 0.5]), x = Math.max(1, Math.round(n * p) - ri(2, 5)), pv = IB.bcdf(n, p, x);
      return Q('A coach claims ' + Math.round(p * 100) + '% of shots are successful. A player thinks the rate is lower; in ' + n + ' shots, ' + x + ' are successful.', [
        ['Write down suitable hypotheses.', 1, M('H_0: p = ' + p + ',\\ H_1: p < ' + p)],
        ['Test at the 5% level, stating your conclusion in context.', 3, M('P(X \\le ' + x + ') = ' + s3(pv)) + (pv < 0.05 ? ' < 0.05: reject ' + M('H_0') + '; evidence the rate is lower' : ' > 0.05: do not reject ' + M('H_0') + '; insufficient evidence the rate is lower')]
      ]);
    }]
  ]);
  add('al-suvat', [
    [[1, 2], function () {
      var u = ri(2, 12), a = ri(1, 4), t = ri(3, 10), v = u + a * t, s = u * t + a * t * t / 2;
      return Q('A car accelerates uniformly from ' + u + ' m s⁻¹ at ' + a + ' m s⁻² for ' + t + ' s.', [
        ['Find its final speed.', 1, M(v) + ' m s⁻¹'],
        ['Find the distance travelled.', 2, M(num(s)) + ' m'],
        ['Sketch a velocity–time graph and explain how it shows the distance.', 1, 'A straight line from ' + u + ' to ' + v + '; the area underneath is the distance.']
      ]);
    }],
    [[2], function () {
      var u = ri(8, 25), h = ri(0, 20), tmax = u / G, H = u * u / (2 * G);
      return Q('A ball is thrown vertically upwards at ' + u + ' m s⁻¹ from a point ' + h + ' m above the ground.', [
        ['Find the greatest height above the ground reached by the ball.', 2, M(s3(H + h)) + ' m'],
        ['Find the time taken to reach the ground.', 3, M('-' + h + ' = ' + u + 't - 4.9t^2') + ', ' + M('t = ' + s3((u + Math.sqrt(u * u + 2 * G * h)) / G)) + ' s']
      ]);
    }]
  ]);
  add('al-variable-acc', [
    [[1, 2], function () {
      var a = ri(1, 3), b = ri(2, 9), c = ri(1, 9);
      return Q('A particle has displacement ' + M('s = ' + poly([a, -b, c, 0], 't')) + ' m at time ' + M('t') + ' s.', [
        ['Find expressions for the velocity and the acceleration.', 3, M('v = ' + poly([3 * a, -2 * b, c], 't')) + ', ' + M('a = ' + poly([6 * a, -2 * b], 't'))],
        ['Find the acceleration when ' + M('t = 2') + '.', 1, M(12 * a - 2 * b) + ' m s⁻²']
      ]);
    }],
    [[2], function () {
      var k = ri(1, 4), T = ri(2, 5);
      return Q('A particle starts at the origin with velocity ' + M('v = ' + (3 * k) + 't^2 - ' + (2 * k * T) + 't') + ' m s⁻¹.', [
        ['Find the time when it is next instantaneously at rest.', 2, M('t = ' + fr(2 * T, 3)) + ' s'],
        ['Find its displacement when ' + M('t = ' + T) + ', and explain what this shows.', 3, M('s = ' + c1(k, 't^3') + ' - ' + (k * T) + 't^2') + '; at ' + M('t = ' + T) + ', ' + M('s = 0') + ': it has returned to the origin']
      ]);
    }]
  ]);

  /* ---------- A level Year 2 ---------- */
  add('a2-functions', [[[1], function () {
    var a = ri(2, 5), b = nz(-6, 6), x = ri(-3, 4);
    return Q(M('f(x) = ' + c1(a, 'x') + sg(b)) + ' and ' + M('g(x) = x^2') + '.', [
      ['Find ' + M('fg(' + x + ')') + ' and ' + M('gf(' + x + ')') + '.', 2, M(a * x * x + b) + ' and ' + M(Math.pow(a * x + b, 2))],
      ['Find ' + M('f^{-1}(x)') + '.', 2, M('\\frac{x' + sg(-b) + '}{' + a + '}')],
      ['Solve ' + M('|' + c1(a, 'x') + sg(b) + '| = ' + a) + '.', 2, M('x = ' + fr(a - b, a) + '\\text{ or } x = ' + fr(-a - b, a))]
    ]);
  }]]);
  add('a2-proof', [
    [[1, 2], function () {
      var a = ri(2, 6), b = nz(-5, 5), c = nz(-5, 5); while (b === c) c = nz(-5, 5);
      var A = (a * b + 1) / (b - c), B = (a * c + 1) / (c - b);
      return Q('', [
        ['Express ' + M('\\frac{' + a + 'x + 1}{(x' + sg(-b) + ')(x' + sg(-c) + ')}') + ' in partial fractions.', 3, M(pf(a * b + 1, b - c, '(x' + sg(-b) + ')', true) + pf(a * c + 1, c - b, '(x' + sg(-c) + ')', false))]
      ]);
    }],
    [[2], function () {
      var P = pick([['There is no greatest even number.', 'Assume \\(N\\) is the greatest even number. Then \\(N + 2\\) is even and greater than \\(N\\), a contradiction.'],
        ['If \\(n^2\\) is odd, then \\(n\\) is odd.', 'Assume \\(n\\) is even, \\(n = 2k\\). Then \\(n^2 = 4k^2\\) is even, a contradiction.'],
        ['There are no integers \\(a, b\\) with \\(6a + 3b = 1\\).', 'The left side \\(3(2a + b)\\) is a multiple of 3, but 1 is not: a contradiction.'],
        ['\\(\\sqrt{3}\\) is irrational.', 'Assume \\(\\sqrt{3} = \\frac{a}{b}\\) in lowest terms; \\(a^2 = 3b^2\\) so 3 divides \\(a\\), then 3 divides \\(b\\), a contradiction.']]);
      return Q('', [['Use proof by contradiction to show that ' + P[0].charAt(0).toLowerCase() + P[0].slice(1), 4, P[1]]]);
    }]
  ]);
  add('a2-binomial', [
    [[1, 2], function () {
      var a = pick([2, 3, 4]), n = pick([-1, -2, 0.5, -0.5]);
      var t1 = n * a, t2 = n * (n - 1) / 2 * a * a, t3 = n * (n - 1) * (n - 2) / 6 * a * a * a;
      return Q('', [
        ['Find the first three terms of the expansion of ' + M('(1 + ' + a + 'x)^{' + num(n) + '}') + ' in ascending powers of ' + M('x') + '.', 3, M('1 ' + (t1 < 0 ? '- ' : '+ ') + (Math.abs(t1) === 1 ? '' : num(Math.abs(t1))) + 'x ' + (t2 < 0 ? '- ' : '+ ') + (Math.abs(t2) === 1 ? '' : num(Math.abs(t2))) + 'x^2')],
        ['State the values of ' + M('x') + ' for which the expansion is valid.', 1, M('|x| < ' + fr(1, a))]
      ]);
    }],
    [[2], function () {
      var a = pick([4, 9]), r = Math.sqrt(a), x = pick([0.01, 0.02, 0.05]);
      var approx = r * (1 + x / (2 * a) - x * x / (8 * a * a));
      return Q('', [
        ['Show that ' + M('\\sqrt{' + a + ' + x} = ' + r + '\\left(1 + \\frac{x}{' + a + '}\\right)^{\\frac{1}{2}}') + '.', 1, 'Take out a factor of ' + M(a) + ' from inside the root.'],
        ['Hence find an approximation for ' + M('\\sqrt{' + num(a + x) + '}') + ' using the first three terms of the expansion.', 3, M(r + '\\left(1 + \\frac{x}{' + (2 * a) + '} - \\frac{x^2}{' + (8 * a * a) + '}\\right)') + ' with ' + M('x = ' + x) + ': ' + M(dp(approx, 6))]
      ]);
    }]
  ]);
  add('a2-trigadd', [
    [[1, 2], function () {
      var A = pick([[30, 45, '\\frac{\\sqrt{6} + \\sqrt{2}}{4}', 'sin', '+'], [45, 30, '\\frac{\\sqrt{6} - \\sqrt{2}}{4}', 'sin', '-'], [45, 30, '\\frac{\\sqrt{6} + \\sqrt{2}}{4}', 'cos', '-'], [60, 45, '\\frac{\\sqrt{2} - \\sqrt{6}}{4}', 'cos', '+']]);
      var ang = A[4] === '+' ? A[0] + A[1] : A[0] - A[1];
      return Q('', [['Use an addition formula to find the exact value of ' + M('\\' + A[3] + ' ' + ang + '^\\circ') + ', writing ' + ang + '° as ' + M(A[0] + '^\\circ ' + A[4] + ' ' + A[1] + '^\\circ') + '.', 3, M(A[2])]]);
    }],
    [[2], function () {
      var a = ri(1, 5), b = ri(1, 5), R = Math.hypot(a, b), al = Math.atan2(b, a) * 180 / Math.PI;
      return Q('', [
        ['Express ' + M(a + '\\cos\\theta + ' + b + '\\sin\\theta') + ' in the form ' + M('R\\cos(\\theta - \\alpha)') + ', ' + M('0 < \\alpha < 90^\\circ') + '.', 3, M('R = \\sqrt{' + (a * a + b * b) + '},\\ \\alpha = ' + s3(al) + '^\\circ')],
        ['Write down the maximum value and the value of ' + M('\\theta') + ' (in ' + M('[0, 360^\\circ)') + ') at which it occurs.', 2, M(s3(R)) + ' at ' + M('\\theta = ' + s3(al) + '^\\circ')]
      ]);
    }]
  ]);
  add('a2-parametric', [
    [[1, 2], function () {
      var a = nz(-3, 3), b = ri(1, 4), c = nz(-4, 4), t = nz(-2, 3);
      return Q('A curve has parametric equations ' + M('x = t' + sg(a)) + ', ' + M('y = ' + c1(b, 't^2') + sg(c)) + '.', [
        ['Find a Cartesian equation of the curve.', 2, M('y = ' + c1(b, '(x' + sg(-a) + ')^2') + sg(c))],
        ['Find ' + M('\\frac{dy}{dx}') + ' in terms of ' + M('t') + ', and its value when ' + M('t = ' + t) + '.', 2, M((2 * b) + 't') + '; ' + M(2 * b * t)]
      ]);
    }],
    [[2], function () {
      var r = ri(2, 6), h = nz(-3, 3), k = nz(-3, 3);
      return Q('A curve has parametric equations ' + M('x = ' + h + ' + ' + r + '\\cos t') + ', ' + M('y = ' + k + ' + ' + r + '\\sin t') + ', ' + M('0 \\le t < 2\\pi') + '.', [
        ['Show that the curve is a circle, giving its centre and radius.', 3, M('(x' + sg(-h) + ')^2 + (y' + sg(-k) + ')^2 = ' + (r * r)) + ': centre ' + M('(' + h + ',\\ ' + k + ')') + ', radius ' + r],
        ['Find the gradient of the curve when ' + M('t = \\frac{\\pi}{4}') + '.', 2, M('\\frac{dy}{dx} = -\\cot t = -1')]
      ]);
    }]
  ]);
  add('a2-numerical', [
    [[1, 2], function () {
      var c = ri(2, 9), f = function (x) { return x * x * x + x - c; }, a = 0; while (f(a + 1) < 0) a++;
      var r = a; for (var i = 0; i < 60; i++) r = r - f(r) / (3 * r * r + 1);
      return Q(M('f(x) = x^3 + x - ' + c) + '.', [
        ['Show that ' + M('f(x) = 0') + ' has a root between ' + a + ' and ' + (a + 1) + '.', 2, M('f(' + a + ') = ' + f(a) + ' \\lt 0') + ', ' + M('f(' + (a + 1) + ') = ' + f(a + 1) + ' \\gt 0') + ', change of sign and ' + M('f') + ' is continuous'],
        ['Use the Newton–Raphson method with ' + M('x_0 = ' + (a + 1)) + ' to find ' + M('x_1') + '.', 2, M('x_1 = ' + (a + 1) + ' - \\frac{' + f(a + 1) + '}{' + (3 * (a + 1) * (a + 1) + 1) + '} = ' + dp((a + 1) - f(a + 1) / (3 * (a + 1) * (a + 1) + 1), 4))],
        ['Write down the root to 3 decimal places.', 1, M(dp(r, 3))]
      ]);
    }],
    [[2], function () {
      var k = ri(3, 9), x0 = 1, xs = [x0];
      for (var i = 0; i < 3; i++) xs.push(Math.cbrt(k - xs[i]));
      return Q('The iteration formula ' + M('x_{n+1} = \\sqrt[3]{' + k + ' - x_n}') + ' is used with ' + M('x_0 = 1') + '.', [
        ['Find ' + M('x_1') + ', ' + M('x_2') + ' and ' + M('x_3') + ' to 4 decimal places.', 3, xs.slice(1).map(function (v) { return dp(v, 4); }).join(', ')],
        ['Write down the equation whose root the iteration approximates.', 1, M('x^3 + x - ' + k + ' = 0')]
      ]);
    }]
  ]);
  add('a2-vectors', [
    [[1, 2], function () {
      var A = [ri(-4, 4), ri(-4, 4), ri(-4, 4)], B = [ri(-4, 6), ri(-4, 6), ri(-4, 6)], AB = B.map(function (v, i) { return v - A[i]; }), L = Math.sqrt(AB.reduce(function (s, v) { return s + v * v; }, 0));
      var ijk = function (v) { var o = ''; ['\\mathbf{i}', '\\mathbf{j}', '\\mathbf{k}'].forEach(function (e, i) { if (!v[i]) return; o += (o ? (v[i] < 0 ? ' - ' : ' + ') : (v[i] < 0 ? '-' : '')) + (Math.abs(v[i]) === 1 ? '' : Math.abs(v[i])) + e; }); return o || '\\mathbf{0}'; };
      return Q('The points ' + M('A') + ' and ' + M('B') + ' have position vectors ' + M(ijk(A)) + ' and ' + M(ijk(B)) + '.', [
        ['Find ' + M('\\overrightarrow{AB}') + '.', 1, M(ijk(AB))],
        ['Find ' + M('|\\overrightarrow{AB}|') + ' and the angle ' + M('\\overrightarrow{AB}') + ' makes with the ' + M('\\mathbf{k}') + ' direction.', 3, M(s3(L)) + '; ' + M(s3(Math.acos(AB[2] / L) * 180 / Math.PI) + '^\\circ')]
      ]);
    }],
    [[2], function () {
      var A = [ri(0, 4), ri(0, 4), ri(0, 4)], d = [nz(-3, 3), nz(-3, 3), nz(-3, 3)], k = ri(2, 4), B = A.map(function (v, i) { return v + d[i]; }), C = A.map(function (v, i) { return v + k * d[i]; });
      return Q('The points ' + M('A(' + A.join(',\\ ') + ')') + ', ' + M('B(' + B.join(',\\ ') + ')') + ' and ' + M('C(' + C.join(',\\ ') + ')') + ' are given.', [
        ['Show that ' + M('A') + ', ' + M('B') + ' and ' + M('C') + ' are collinear.', 3, M('\\overrightarrow{AC} = ' + k + '\\overrightarrow{AB}') + ', parallel with a common point'],
        ['Find the ratio ' + M('AB : BC') + '.', 1, M('1 : ' + (k - 1))]
      ]);
    }]
  ]);
  add('a2-regression', [
    [[1, 2], function () {
      var c = ri(2, 9) / 10, m = ri(5, 30) / 100;
      return Q('A data set is modelled by ' + M('y = ab^x') + '. The graph of ' + M('\\log_{10} y') + ' against ' + M('x') + ' is a straight line with gradient ' + m + ' and intercept ' + c + '.', [
        ['Find the values of ' + M('a') + ' and ' + M('b') + '.', 3, M('a = 10^{' + c + '} = ' + s3(Math.pow(10, c)) + ',\\ b = 10^{' + m + '} = ' + s3(Math.pow(10, m)))],
        ['Interpret ' + M('b') + ' in context if ' + M('x') + ' is time in years.', 1, 'The quantity is multiplied by ' + s3(Math.pow(10, m)) + ' each year.']
      ]);
    }],
    [[2], function () {
      var n = pick([10, 12, 15, 20]), r = pick([0.43, 0.52, 0.61, 0.38, -0.55, -0.62]), cv = { 10: 0.5494, 12: 0.4973, 15: 0.4409, 20: 0.3783 }[n], one = r > 0;
      var rej = Math.abs(r) > cv;
      return Q('For a sample of ' + n + ' pairs, the product moment correlation coefficient is ' + r + '. Test at the 5% level whether there is ' + (one ? 'positive' : 'negative') + ' correlation in the population (critical value ' + cv + ').', [
        ['State the hypotheses.', 1, M('H_0: \\rho = 0,\\ H_1: \\rho ' + (one ? '>' : '<') + ' 0')],
        ['Complete the test, stating your conclusion in context.', 2, (rej ? M('|r| > ' + cv) + ': reject ' + M('H_0') + '; evidence of ' + (one ? 'positive' : 'negative') + ' correlation' : M('|r| < ' + cv) + ': do not reject ' + M('H_0') + '; insufficient evidence')]
      ]);
    }]
  ]);
  add('a2-moments', [
    [[1, 2], function () {
      var L = ri(4, 8), W = ri(20, 60), w = ri(10, 40), x = ri(1, L - 1);
      var RB = (W * L / 2 + w * x) / L, RA = W + w - RB;
      return Q('A uniform beam ' + M('AB') + ' of length ' + L + ' m and weight ' + W + ' N rests on supports at ' + M('A') + ' and ' + M('B') + '. A load of ' + w + ' N is placed ' + x + ' m from ' + M('A') + '.', [
        ['Take moments about ' + M('A') + ' to find the reaction at ' + M('B') + '.', 3, M(L + 'R_B = ' + W + ' \\times ' + num(L / 2) + ' + ' + w + ' \\times ' + x) + ', ' + M('R_B = ' + s3(RB)) + ' N'],
        ['Find the reaction at ' + M('A') + '.', 1, M(s3(RA)) + ' N']
      ]);
    }],
    [[2], function () {
      var L = ri(3, 6), m = ri(5, 20), T1 = ri(Math.ceil(m * G / 4), Math.floor(m * G * 3 / 4)), T2 = m * G - T1, xg = T2 * L / (m * G);
      return Q('A non-uniform rod of length ' + L + ' m and mass ' + m + ' kg hangs horizontally from two vertical strings at its ends. The tension in the left string is ' + T1 + ' N.', [
        ['Find the tension in the right string.', 1, M(s3(T2)) + ' N'],
        ['Find the distance of the centre of mass from the left end.', 2, M(s3(xg)) + ' m']
      ]);
    }]
  ]);
  add('a2-friction', [
    [[1, 2], function () {
      var m = ri(2, 10), mu = ri(1, 6) / 10, P = Math.round(mu * m * G + ri(2, 15)), a = (P - mu * m * G) / m;
      return Q('A box of mass ' + m + ' kg is pulled along rough horizontal ground by a horizontal force of ' + P + ' N. The coefficient of friction is ' + mu + '.', [
        ['Find the friction force.', 2, M(mu + ' \\times ' + m + 'g = ' + s3(mu * m * G)) + ' N'],
        ['Find the acceleration of the box.', 2, M(s3(a)) + ' m s⁻²']
      ]);
    }],
    [[2], function () {
      var th = ri(15, 35), mu = ri(2, 6) / 10, t = Math.tan(th * Math.PI / 180), slides = t > mu, a = G * (Math.sin(th * Math.PI / 180) - mu * Math.cos(th * Math.PI / 180));
      return Q('A particle rests on a rough plane inclined at ' + th + '° to the horizontal. The coefficient of friction is ' + mu + '.', [
        ['Show whether the particle slides down the plane.', 3, M('\\tan ' + th + '^\\circ = ' + s3(t)) + (slides ? ' > ' : ' \\le ') + mu + ': ' + (slides ? 'it slides' : 'it stays at rest (friction can hold it)')],
        [slides ? 'Find its acceleration down the plane.' : 'Find the size of the friction force on a particle of mass 1 kg.', 2, slides ? M('g(\\sin ' + th + '^\\circ - ' + mu + '\\cos ' + th + '^\\circ) = ' + s3(a)) + ' m s⁻²' : M('g\\sin ' + th + '^\\circ = ' + s3(G * Math.sin(th * Math.PI / 180))) + ' N']
      ]);
    }]
  ]);
  add('a2-projectiles', [
    [[1, 2], function () {
      var u = ri(10, 30), th = ri(20, 70), r = th * Math.PI / 180, ux = u * Math.cos(r), uy = u * Math.sin(r), T = 2 * uy / G;
      return Q('A ball is kicked from level ground at ' + u + ' m s⁻¹ at ' + th + '° above the horizontal.', [
        ['Find the horizontal and vertical components of the initial velocity.', 2, M(s3(ux)) + ' and ' + M(s3(uy)) + ' m s⁻¹'],
        ['Find the time of flight and the range.', 3, M('T = ' + s3(T)) + ' s; range ' + M(s3(ux * T)) + ' m'],
        ['Find the greatest height.', 2, M(s3(uy * uy / (2 * G))) + ' m']
      ]);
    }],
    [[2], function () {
      var u = ri(5, 20), h = ri(10, 50), t = Math.sqrt(2 * h / G);
      return Q('A stone is thrown horizontally at ' + u + ' m s⁻¹ from the top of a cliff ' + h + ' m high.', [
        ['Find the time taken to reach the sea.', 2, M(s3(t)) + ' s'],
        ['Find the speed with which it hits the sea, and the angle below the horizontal.', 3, M(s3(Math.hypot(u, G * t))) + ' m s⁻¹ at ' + M(s3(Math.atan(G * t / u) * 180 / Math.PI) + '^\\circ')]
      ]);
    }]
  ]);
  add('a2-statics', [
    [[1, 2], function () {
      var m = ri(2, 12), a = ri(20, 70), r = a * Math.PI / 180;
      return Q('A particle of mass ' + m + ' kg hangs from two strings. One string is horizontal; the other makes ' + a + '° with the horizontal.', [
        ['Resolve vertically to find the tension in the sloping string.', 2, M('T\\sin ' + a + '^\\circ = ' + m + 'g') + ', ' + M('T = ' + s3(m * G / Math.sin(r))) + ' N'],
        ['Find the tension in the horizontal string.', 2, M('T\\cos ' + a + '^\\circ = ' + s3(m * G / Math.tan(r))) + ' N']
      ]);
    }],
    [[2], function () {
      var m = ri(2, 10), th = ri(15, 40), r = th * Math.PI / 180, P = m * G * Math.sin(r);
      return Q('A particle of mass ' + m + ' kg rests on a smooth plane inclined at ' + th + '°, held by a force ' + M('P') + ' acting up the plane, parallel to it.', [
        ['Find ' + M('P') + '.', 2, M(m + 'g\\sin ' + th + '^\\circ = ' + s3(P)) + ' N'],
        ['Find the normal reaction.', 2, M(m + 'g\\cos ' + th + '^\\circ = ' + s3(m * G * Math.cos(r))) + ' N']
      ]);
    }]
  ]);
  add('a2-kinematics', [
    [[1], function () {
      var p = [ri(-5, 5), ri(-5, 5)], u = [nz(-4, 4), nz(-4, 4)], a = [nz(-2, 2), nz(-2, 2)], t = ri(2, 4);
      var v = [u[0] + a[0] * t, u[1] + a[1] * t], s = [p[0] + u[0] * t + a[0] * t * t / 2, p[1] + u[1] * t + a[1] * t * t / 2];
      var ij = function (x) { return ijv(x.map(function (v) { return Math.round(v * 1000) / 1000; })).replace(/(\d+\.\d+)/g, function (m) { return num(Number(m)); }); };
      return Q('A particle starts at ' + M(ij(p)) + ' m with velocity ' + M(ij(u)) + ' m s⁻¹ and constant acceleration ' + M(ij(a)) + ' m s⁻².', [
        ['Find its velocity after ' + t + ' s.', 2, M(ij(v)) + ' m s⁻¹'],
        ['Find its position after ' + t + ' s.', 2, M(ij(s)) + ' m']
      ]);
    }],
    [[2], function () {
      var a = ri(1, 3), b = ri(1, 4);
      return Q('A particle has position ' + M('\\mathbf{r} = ' + c1(a, 't^3') + '\\mathbf{i} + ' + c1(b, 't^2') + '\\mathbf{j}') + ' m at time ' + M('t') + ' s.', [
        ['Find its velocity and acceleration at time ' + M('t') + '.', 3, M('\\mathbf{v} = ' + (3 * a) + 't^2\\mathbf{i} + ' + (2 * b) + 't\\mathbf{j}') + ', ' + M('\\mathbf{a} = ' + (6 * a) + 't\\mathbf{i} + ' + (2 * b) + '\\mathbf{j}')],
        ['Find its speed when ' + M('t = 1') + '.', 2, M('\\sqrt{' + (9 * a * a) + ' + ' + (4 * b * b) + '} = ' + s3(Math.hypot(3 * a, 2 * b))) + ' m s⁻¹']
      ]);
    }]
  ]);

  /* ---------- AQA Level 2 Further Maths ---------- */
  add('fm-counting', [
    [[1, 2], function () {
      var l = ri(2, 4), d = ri(2, 4);
      return Q('A password has ' + l + ' letters (A–Z) followed by ' + d + ' digits (0–9).', [
        ['Find the number of possible passwords.', 2, M('26^{' + l + '} \\times 10^{' + d + '} = ' + num(Math.pow(26, l) * Math.pow(10, d)))],
        ['Find the number of passwords if no letter or digit can be repeated.', 2, M(num(perm(26, l) * perm(10, d)))]
      ]);
    }],
    [[2], function () {
      var n = ri(4, 7);
      return Q(n + ' different books are arranged on a shelf.', [
        ['Find the number of arrangements.', 1, M(n + '! = ' + fact(n))],
        ['Find the number of arrangements if two particular books must be next to each other.', 2, M('2 \\times ' + (n - 1) + '! = ' + 2 * fact(n - 1))]
      ]);
    }]
  ]);
  function fact(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }
  function perm(n, k) { var r = 1; for (var i = 0; i < k; i++) r *= n - i; return r; }
  add('fm-binomial', [
    [[1, 2], function () {
      var n = ri(4, 7), a = ri(2, 3), r = ri(1, 3);
      return Q('', [
        ['Write down row ' + n + ' of Pascal’s triangle.', 1, Array.apply(null, Array(n + 1)).map(function (_, k) { return comb(n, k); }).join(', ')],
        ['Find the coefficient of ' + M('x^{' + r + '}') + ' in the expansion of ' + M('(1 + ' + a + 'x)^{' + n + '}') + '.', 2, M('\\binom{' + n + '}{' + r + '} \\times ' + a + '^{' + r + '} = ' + comb(n, r) * Math.pow(a, r))]
      ]);
    }],
    [[2], function () {
      var n = ri(3, 5), a = ri(2, 4);
      return Q('', [['Expand ' + M('(x + ' + a + ')^{' + n + '}') + ' fully.', 3, M(poly(Array.apply(null, Array(n + 1)).map(function (_, k) { return comb(n, k) * Math.pow(a, k); })))]]);
    }]
  ]);
  add('fm-factor', [
    [[1, 2], function () {
      var r1 = nz(-3, 3), r2 = nz(-4, 4), r3 = nz(-5, 5); while (r2 === r1) r2 = nz(-4, 4); while (r3 === r1 || r3 === r2) r3 = nz(-5, 5);
      var c = [1, -(r1 + r2 + r3), r1 * r2 + r1 * r3 + r2 * r3, -r1 * r2 * r3];
      return Q(M('f(x) = ' + poly(c)) + '.', [
        ['Show that ' + M(xm(r1)) + ' is a factor of ' + M('f(x)') + '.', 2, M('f(' + r1 + ') = 0')],
        ['Hence factorise ' + M('f(x)') + ' fully and solve ' + M('f(x) = 0') + '.', 3, M(xm(r1) + xm(r2) + xm(r3)) + '; ' + M('x = ' + [r1, r2, r3].sort(function (a, b) { return a - b; }).join(',\\ '))]
      ]);
    }],
    [[2], function () {
      var r = nz(-3, 3), b = nz(-5, 5), c = nz(-6, 6), k = -(r * r * r + b * r * r + c * r);
      return Q(M('(x' + sg(-r) + ')') + ' is a factor of ' + M(poly([1, b, c, 0]) + ' + k') + '.', [['Find the value of ' + M('k') + '.', 2, M('k = ' + k)]]);
    }]
  ]);
  add('fm-graphs', [
    [[1, 2], function () {
      var a = ri(1, 4), b = ri(2, 5);
      return Q('A function is defined by ' + M('f(x) = \\begin{cases} ' + c1(a, 'x') + ' & 0 \\le x < ' + b + ' \\\\ ' + (a * b) + ' & ' + b + ' \\le x \\le ' + (b + 3) + ' \\end{cases}') + '.', [
        ['Find ' + M('f(1)') + ' and ' + M('f(' + (b + 2) + ')') + '.', 2, M(a) + ' and ' + M(a * b)],
        ['Find the area between the graph of ' + M('f') + ' and the ' + M('x') + '-axis from ' + M('x = 0') + ' to ' + M('x = ' + (b + 3)) + '.', 2, M(num(a * b * b / 2) + ' + ' + (3 * a * b) + ' = ' + num(a * b * b / 2 + 3 * a * b))]
      ]);
    }],
    [[2], function () {
      var k = ri(2, 5), x1 = ri(1, 3);
      return Q('The graph of ' + M('y = ' + k + '^x') + ' is sketched.', [
        ['Write down the coordinates of the ' + M('y') + '-intercept.', 1, M('(0,\\ 1)')],
        ['Find the value of ' + M('y') + ' when ' + M('x = ' + x1) + ' and when ' + M('x = -' + x1) + '.', 2, M(Math.pow(k, x1)) + ' and ' + M(frac(1, Math.pow(k, x1)))]
      ]);
    }]
  ]);
  add('fm-sequences', [
    [[1, 2], function () {
      var a = ri(1, 3), b = nz(-5, 5), c = nz(-6, 6), t = [1, 2, 3, 4, 5].map(function (n) { return a * n * n + b * n + c; });
      return Q('The first five terms of a quadratic sequence are ' + t.join(', ') + '.', [['Find an expression for the ' + M('n') + 'th term.', 3, M(poly([a, b, c], 'n'))]]);
    }],
    [[2], function () {
      var a = ri(2, 7), b = nz(-5, 5), c = ri(2, 5), d = nz(-5, 5);
      return Q('', [['Find the limiting value of ' + M('\\frac{' + c1(a, 'n') + sg(b) + '}{' + c1(c, 'n') + sg(d) + '}') + ' as ' + M('n \\to \\infty') + '.', 2, M(fr(a, c))]]);
    }]
  ]);
  add('fm-circles', [
    [[1, 2], function () {
      var a = nz(-5, 5), b = nz(-5, 5), r = pick([3, 4, 5, 6]);
      return Q('A circle has equation ' + M('(x' + sg(-a) + ')^2 + (y' + sg(-b) + ')^2 = ' + r * r) + '.', [
        ['Write down its centre and radius.', 2, M('(' + a + ',\\ ' + b + ')') + ', radius ' + r],
        ['Determine whether the point ' + M('(' + (a + r - 1) + ',\\ ' + (b + 1) + ')') + ' lies inside, on or outside the circle.', 2, M('(' + (r - 1) + ')^2 + 1^2 = ' + ((r - 1) * (r - 1) + 1)) + ((r - 1) * (r - 1) + 1 < r * r ? ' < ' : ' > ') + r * r + ': ' + ((r - 1) * (r - 1) + 1 < r * r ? 'inside' : 'outside')]
      ]);
    }],
    [[2], function () {
      var P = pick([[3, 4], [4, 3], [-3, 4], [5, 0], [0, 5], [-4, -3], [3, -4]]);
      return Q('The point ' + M('P(' + P.join(',\\ ') + ')') + ' lies on the circle ' + M('x^2 + y^2 = 25') + '.', [['Find the equation of the tangent at ' + M('P') + '.', 3, M(c1(P[0], 'x') + (P[1] < 0 ? ' - ' : ' + ') + c1(Math.abs(P[1]), 'y') + ' = 25').replace('0x + ', '').replace(' + 0y', '').replace('- 0y', '')]]);
    }]
  ]);
  add('fm-matrices', [
    [[1, 2], function () {
      var A = [[ri(-3, 4), ri(-3, 4)], [ri(-3, 4), ri(-3, 4)]], P = [ri(-4, 4), ri(-4, 4)];
      return Q(M('\\mathbf{A} = ' + mat(A)) + '.', [
        ['Find ' + M('\\mathbf{A}^2') + '.', 2, M(mat(IB.mm(A, A)))],
        ['Find the image of the point ' + M('(' + P.join(',\\ ') + ')') + ' under the transformation ' + M('\\mathbf{A}') + '.', 1, M('(' + (A[0][0] * P[0] + A[0][1] * P[1]) + ',\\ ' + (A[1][0] * P[0] + A[1][1] * P[1]) + ')')]
      ]);
    }],
    [[2], function () {
      var t = pick([['a reflection in the \\(x\\)-axis', [[1, 0], [0, -1]]], ['a rotation of 90° clockwise about the origin', [[0, 1], [-1, 0]]], ['an enlargement, scale factor 3, centre the origin', [[3, 0], [0, 3]]], ['a reflection in the line \\(y = -x\\)', [[0, -1], [-1, 0]]]]);
      return Q('', [['Find the matrix that represents ' + t[0] + ', by considering the images of ' + M('(1,\\ 0)') + ' and ' + M('(0,\\ 1)') + '.', 2, M(mat(t[1]))]]);
    }]
  ]);
  add('fm-equations', [[[1], function () {
    var x = nz(-4, 4), y = nz(-4, 4);
    return Q('', [['Solve ' + M('y = x' + (y - x ? sg(y - x) : '')) + ' and ' + M('x^2 + y^2 = ' + (x * x + y * y)) + '.', 4, (function () {
      var c = y - x, A = 2, B = 2 * c, C = c * c - (x * x + y * y), d = B * B - 4 * A * C, r1 = (-B + Math.sqrt(d)) / (2 * A), r2 = (-B - Math.sqrt(d)) / (2 * A);
      return [r1, r2].map(function (r) { return M('(' + s3(r) + ',\\ ' + s3(r + c) + ')'); }).join(' and ');
    })()]]);
  }]]);

  /* ---------- GCSE statistics ---------- */
  add('stats-diagrams', [
    [[1, 2], function () {
      var fs = [ri(2, 8), ri(5, 12), ri(8, 16), ri(4, 10), ri(1, 5)], cum = [], s = 0; fs.forEach(function (f) { s += f; cum.push(s); });
      return Q('The table shows the times, in minutes, that ' + s + ' students took to finish a puzzle.' + table(['Time, \\(t\\)', '\\(0 < t \\le 10\\)', '\\(10 < t \\le 20\\)', '\\(20 < t \\le 30\\)', '\\(30 < t \\le 40\\)', '\\(40 < t \\le 50\\)'], [['Frequency'].concat(fs)]), [
        ['Complete a cumulative frequency table.', 2, cum.join(', ')],
        ['Explain how you would use a cumulative frequency graph to estimate the median.', 1, 'Read across from ' + num(s / 2) + ' on the cumulative frequency axis to the curve, then down to the time axis.']
      ]);
    }],
    [[2], function () {
      var w = [10, 5, 15, 20], f = [ri(4, 12), ri(6, 14), ri(9, 24), ri(4, 16)], fd = f.map(function (v, i) { return v / w[i]; });
      return Q('A grouped frequency table of heights is shown.' + table(['Height, \\(h\\) cm', '\\(140 < h \\le 150\\)', '\\(150 < h \\le 155\\)', '\\(155 < h \\le 170\\)', '\\(170 < h \\le 190\\)'], [['Frequency'].concat(f)]), [
        ['Calculate the frequency density for each class.', 2, fd.map(function (v) { return num(Math.round(v * 100) / 100); }).join(', ')],
        ['Explain why a histogram is drawn with frequency density, not frequency.', 1, 'The class widths are unequal; the area of each bar then represents the frequency.']
      ]);
    }]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
