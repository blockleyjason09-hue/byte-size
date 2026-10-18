/* Byte Size — IB Mathematics: Applications and Interpretation
   Part 3: Topic 4 Statistics and probability. */
(function (g) {
  var BS = g.BS, D = BS.draw, IB = BS.ib;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, num = BS.num, M = BS.m, dp = BS.dp;
  var s3 = IB.s3, vec = IB.vec, mat = IB.mat, q1 = IB.q1, T = BS.topic;
  function p3(x) { return x < 0.001 ? x.toExponential(2).replace('e-', ' × 10^-') : s3(x); }

  T({ id: 'ib-descriptive', name: 'Descriptive statistics and box plots', video: 'IB maths AI box plots outliers standard deviation', gens: [
    { d: [1], f: function () {
      var n = ri(9, 11), xs = []; for (var i = 0; i < n; i++) xs.push(ri(4, 40));
      var q = IB.quart(xs);
      return { stem: 'The number of minutes ' + n + ' pupils spent on homework one evening is recorded.<br>' + M(xs.join(',\\quad ')), parts: [
        { q: 'Find the mean.', m: 2, a: s3(IB.mean(xs)) },
        { q: 'Find the standard deviation.', m: 1, a: s3(IB.sd(xs)) },
        { q: 'Find the median and the interquartile range.', m: 3, a: 'Median ' + num(q[2]) + ', IQR ' + M(num(q[3]) + ' - ' + num(q[1]) + ' = ' + num(q[3] - q[1])) }
      ] };
    } },
    { d: [2], f: function () {
      var q1v = ri(20, 35), med = q1v + ri(3, 10), q3v = med + ri(3, 10), iqr = q3v - q1v, lo = q1v - ri(3, 15);
      var out = Math.random() < 0.5, hi = out ? q3v + Math.ceil(1.5 * iqr) + ri(1, 6) : q3v + ri(2, Math.floor(1.5 * iqr) - 1);
      var lim = q3v + 1.5 * iqr;
      return { stem: 'The box plot shows the distances, in km, that a group of cyclists rode in one week.' + D.boxplot([lo, q1v, med, q3v, hi], Math.floor(lo / 10) * 10, Math.ceil((hi + 1) / 10) * 10, 10, 'Distance (km)'), parts: [
        { q: 'Write down the median distance.', m: 1, a: med + ' km' },
        { q: 'Find the interquartile range.', m: 1, a: iqr + ' km' },
        { q: 'Determine whether the longest distance is an outlier. Justify your answer.', m: 3, a: M(q3v + ' + 1.5 \\times ' + iqr + ' = ' + num(lim)) + '; ' + hi + (out ? ' > ' : ' < ') + num(lim) + ', so it ' + (out ? 'is' : 'is not') + ' an outlier.' }
      ] };
    } },
    { d: [3], f: function () {
      var f = [ri(2, 8), ri(5, 14), ri(8, 20), ri(4, 12), ri(1, 6)], mids = [5, 15, 25, 35, 45], xs = [];
      f.forEach(function (c, i) { for (var k = 0; k < c; k++) xs.push(mids[i]); });
      var a = pick([2, 3]), b = ri(5, 20);
      return { stem: 'The table shows the time, ' + M('t') + ' minutes, that ' + xs.length + ' customers waited at a bank.' + IB.table(['Time, ' + M('t'), M('0 \\le t < 10'), M('10 \\le t < 20'), M('20 \\le t < 30'), M('30 \\le t < 40'), M('40 \\le t < 50')], [['Frequency'].concat(f)]), parts: [
        { q: 'Find an estimate of the mean waiting time.', m: 2, a: s3(IB.mean(xs)) + ' minutes' },
        { q: 'Find an estimate of the standard deviation.', m: 1, a: s3(IB.sd(xs)) + ' minutes' },
        { q: 'Each waiting time is multiplied by ' + a + ' and then ' + b + ' is added. Write down the new mean and the new standard deviation.', m: 2, a: 'Mean ' + s3(a * IB.mean(xs) + b) + ', standard deviation ' + s3(a * IB.sd(xs)) }
      ] };
    } }
  ] });

  function dataset(n, m, c, noise, x0, step) {
    var xs = [], ys = [];
    for (var i = 0; i < n; i++) { var x = x0 + i * step + ri(0, step - 1); xs.push(x); ys.push(Math.round(m * x + c + (Math.random() * 2 - 1) * noise)); }
    return [xs, ys];
  }
  T({ id: 'ib-regression', name: 'Correlation, regression and Spearman’s rank', video: 'IB maths AI regression line Spearman rank', gens: [
    { d: [1, 2], f: function (d) {
      var m = pick([1.5, 2, 2.5, 3, -1.5, -2]), c = ri(10, 40), dsx = dataset(7, m, m < 0 ? c + 60 : c, 6, 2, 4), xs = dsx[0], ys = dsx[1];
      var P = IB.pearson(xs, ys), xp = xs[2] + 1, outx = xs[6] + 15;
      var parts = [
        { q: 'Find Pearson’s product-moment correlation coefficient, ' + M('r') + '.', m: 2, a: M('r = ' + s3(P.r)) },
        { q: 'Find the equation of the regression line of ' + M('y') + ' on ' + M('x') + '.', m: 2, a: M('y = ' + s3(P.a) + 'x ' + (P.b < 0 ? '- ' + s3(-P.b) : '+ ' + s3(P.b))) },
        { q: 'Use your equation to estimate ' + M('y') + ' when ' + M('x = ' + xp) + '.', m: 2, a: s3(P.a * xp + P.b) }
      ];
      if (d === 1) parts.push({ q: 'Explain why it would not be reliable to use the equation when ' + M('x = ' + outx) + '.', m: 1, a: M('x = ' + outx) + ' is outside the range of the data (extrapolation).' });
      return { stem: 'The table shows data for seven students: ' + M('x') + ' is hours of revision and ' + M('y') + ' is test score.' + IB.table([M('x')].concat(xs), [[M('y')].concat(ys)]) + D.scatter(xs, ys, 'x', 'y'), parts: parts };
    } },
    { d: [3], f: function () {
      var xs, ys, n = 6;
      do { xs = BS.shuffle([52, 58, 61, 66, 70, 74, 79, 83, 88]).slice(0, n); ys = xs.map(function (x) { return Math.round(x * pick([0.8, 1, 1.2]) + ri(-12, 12)); }); }
      while (new Set(ys).size < n);
      var rx = IB.ranks(xs), ry = IB.ranks(ys), rs = IB.pearson(rx, ry).r;
      var desc = Math.abs(rs) >= 0.7 ? 'strong' : Math.abs(rs) >= 0.4 ? 'moderate' : 'weak';
      return { stem: 'Two judges score six dancers.' + IB.table(['Dancer', 'A', 'B', 'C', 'D', 'E', 'F'], [['Judge 1'].concat(xs), ['Judge 2'].concat(ys)]), parts: [
        { q: 'Find Spearman’s rank correlation coefficient, ' + M('r_s') + '.', m: 3, a: 'Ranks 1: ' + rx.join(', ') + '; ranks 2: ' + ry.join(', ') + '. ' + M('r_s = ' + s3(rs)) },
        { q: 'Interpret your answer in context.', m: 1, a: 'There is ' + desc + ' ' + (rs >= 0 ? 'agreement' : 'disagreement') + ' between the judges’ rankings.' }
      ] };
    } }
  ] });

  T({ id: 'ib-probability', name: 'Probability: Venn and tree diagrams', video: 'IB maths AI conditional probability tree diagram', gens: [
    { d: [1], f: function () {
      var c = [ri(3, 15), ri(2, 10), ri(3, 15), ri(2, 10)], N = c[0] + c[1] + c[2] + c[3];
      return { stem: 'A group of ' + N + ' students was asked whether they study French (' + M('F') + ') or Spanish (' + M('S') + '). The Venn diagram shows the results.' + D.venn(c, ['F', 'S']), parts: [
        { q: 'A student is chosen at random. Find ' + M('P(F)') + '.', m: 1, a: M(frac(c[0] + c[1], N)) },
        { q: 'Find ' + M('P(F \\cup S)') + '.', m: 1, a: M(frac(c[0] + c[1] + c[2], N)) },
        { q: 'Find ' + M('P(F \\mid S)') + '.', m: 2, a: M(frac(c[1], c[1] + c[2])) }
      ] };
    } },
    { d: [2], f: function () {
      var p = ri(2, 8) / 10, a = ri(5, 95) / 100, b = ri(5, 95) / 100;
      var both = p * a, PB = p * a + (1 - p) * b;
      return { stem: 'The probability that it rains on a given day is ' + p + '. If it rains, the probability that a bus is late is ' + a + '. If it does not rain, the probability that the bus is late is ' + b + '.' +
        D.tree({ A: 'R', Ac: "R'", B: 'L', Bc: "L'", p: [String(p), dp(1 - p, 1), String(a), dp(1 - a, 2), String(b), dp(1 - b, 2)] }), parts: [
        { q: 'Find the probability that it rains and the bus is late.', m: 2, a: s3(both) },
        { q: 'Find the probability that the bus is late.', m: 2, a: s3(PB) },
        { q: 'Given that the bus is late, find the probability that it rained.', m: 2, a: M('\\frac{' + s3(both) + '}{' + s3(PB) + '}') + ' = ' + s3(both / PB) }
      ] };
    } },
    { d: [3], f: function () {
      var a = ri(2, 7) / 10, b = ri(2, 7) / 10, indep = Math.random() < 0.5, ab = indep ? a * b : Math.round((a * b + pick([0.04, 0.06, -0.04])) * 100) / 100;
      if (ab <= 0) ab = Math.round(a * b * 50) / 100;
      var u = a + b - ab;
      return { stem: 'Events ' + M('A') + ' and ' + M('B') + ' are such that ' + M('P(A) = ' + a) + ', ' + M('P(B) = ' + b) + ' and ' + M('P(A \\cup B) = ' + num(Math.round(u * 10000) / 10000)) + '.', parts: [
        { q: 'Find ' + M('P(A \\cap B)') + '.', m: 2, a: M(num(Math.round(ab * 10000) / 10000)) },
        { q: 'Determine whether ' + M('A') + ' and ' + M('B') + ' are independent. Justify your answer.', m: 2, a: M('P(A)P(B) = ' + num(Math.round(a * b * 10000) / 10000)) + (Math.abs(ab - a * b) < 1e-9 ? ' = ' : ' ≠ ') + M('P(A \\cap B)') + ', so ' + (Math.abs(ab - a * b) < 1e-9 ? 'they are independent.' : 'they are not independent.') },
        { q: 'Find ' + M('P(A \\mid B)') + '.', m: 2, a: s3(ab / b) }
      ] };
    } }
  ] });

  T({ id: 'ib-discrete', name: 'Discrete random variables and the binomial distribution', video: 'IB maths AI binomial distribution expected value', gens: [
    { d: [1], f: function () {
      var c = [ri(1, 5), ri(1, 5), ri(1, 5), ri(1, 5)], S = c[0] + c[1] + c[2] + c[3];
      var E = (c[1] + 2 * c[2] + 3 * c[3]);
      return { stem: 'The discrete random variable ' + M('X') + ' has the probability distribution shown.' + IB.table([M('x'), 0, 1, 2, 3], [[M('P(X = x)')].concat(c.map(function (v) { return M((v === 1 ? '' : v) + 'k'); }))]), parts: [
        { q: 'Find the value of ' + M('k') + '.', m: 2, a: M('k = ' + frac(1, S)) },
        { q: 'Find ' + M('E(X)') + '.', m: 2, a: M(frac(E, S)) + ' (' + s3(E / S) + ')' }
      ] };
    } },
    { d: [2], f: function () {
      var n = ri(10, 25), p = pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4]), r = ri(2, Math.min(7, n - 2)), k = ri(2, 6);
      return { stem: 'The probability that a seed germinates is ' + p + '. A gardener plants ' + n + ' seeds. Let ' + M('X') + ' be the number that germinate.', parts: [
        { q: 'Find ' + M('P(X = ' + r + ')') + '.', m: 2, a: s3(IB.bpdf(n, p, r)) },
        { q: 'Find the probability that at least ' + k + ' seeds germinate.', m: 2, a: s3(1 - IB.bcdf(n, p, k - 1)) },
        { q: 'Find ' + M('E(X)') + ' and ' + M('\\mathrm{Var}(X)') + '.', m: 2, a: M('E(X) = ' + num(Math.round(n * p * 1000) / 1000) + ',\\ \\mathrm{Var}(X) = ' + num(Math.round(n * p * (1 - p) * 10000) / 10000)) }
      ] };
    } },
    { d: [3], f: function () {
      var p = pick([0.05, 0.08, 0.1, 0.12, 0.15]), target = pick([0.9, 0.95, 0.99]), n = Math.ceil(Math.log(1 - target) / Math.log(1 - p));
      var cost = ri(2, 5), win = ri(10, 40), pw = pick([0.05, 0.08, 0.1, 0.12]), E = pw * win - cost;
      return { parts: [
        { q: 'The probability that a component is faulty is ' + p + '. Find the least number of components that must be tested so that the probability of finding at least one faulty component is greater than ' + target + '.', m: 3, a: M('1 - ' + (1 - p).toFixed(2) + '^{n} > ' + target + ' \\Rightarrow n = ' + n) },
        { q: 'A game costs $' + cost + ' to play. A player wins $' + win + ' with probability ' + pw + ', and nothing otherwise. Find the expected gain per game and state whether the game is fair.', m: 3, a: 'Expected gain = ' + (E < 0 ? '−$' : '$') + Math.abs(E).toFixed(2) + '; ' + (Math.abs(E) < 1e-9 ? 'fair' : 'not fair') + '.' }
      ] };
    } }
  ] });

  T({ id: 'ib-normal', name: 'The normal distribution', video: 'IB maths AI normal distribution inverse normal', gens: [
    { d: [1], f: function () {
      var mu = 5 * ri(30, 80), sd = ri(4, 15), a = mu - ri(3, 18), b = mu + ri(3, 18);
      return { stem: 'The masses of apples are normally distributed with mean ' + mu + ' g and standard deviation ' + sd + ' g.' + D.normal(mu, sd, a, b, { mu: String(mu), a: String(a), b: String(b) }), parts: [
        { q: 'Find the probability that an apple has a mass less than ' + a + ' g.', m: 2, a: s3(IB.ncdf(a, mu, sd)) },
        { q: 'Find the probability that an apple has a mass between ' + a + ' g and ' + b + ' g (the shaded region).', m: 2, a: s3(IB.ncdf(b, mu, sd) - IB.ncdf(a, mu, sd)) }
      ] };
    } },
    { d: [2], f: function () {
      var mu = ri(150, 180), sd = ri(5, 10), p = pick([0.05, 0.1, 0.15, 0.2, 0.25]), k = mu + sd * IB.invPhi(1 - p), N = 50 * ri(4, 20), h = mu + ri(5, 15);
      return { stem: 'The heights of adults in a town are normally distributed with mean ' + mu + ' cm and standard deviation ' + sd + ' cm.' + D.normal(mu, sd, Math.round(k * 10) / 10, null, { mu: String(mu), a: 'k' }), parts: [
        { q: 'The tallest ' + p * 100 + '% of adults are taller than ' + M('k') + ' cm. Find ' + M('k') + '.', m: 2, a: M('k = ' + s3(k)) },
        { q: 'In a group of ' + N + ' adults, find the expected number taller than ' + h + ' cm.', m: 2, a: s3(N * (1 - IB.ncdf(h, mu, sd))) }
      ] };
    } },
    { d: [3], f: function () {
      var mu, sd, x1, x2, p1, p2;
      do { mu = ri(40, 80); sd = ri(4, 12); x1 = mu - ri(2, Math.round(1.6 * sd)); x2 = mu + ri(2, Math.round(1.8 * sd)); p1 = Math.round(IB.ncdf(x1, mu, sd) * 1000) / 1000; p2 = Math.round((1 - IB.ncdf(x2, mu, sd)) * 1000) / 1000; } while (p1 < 0.02 || p2 < 0.02);
      var z1 = IB.invPhi(p1), z2 = IB.invPhi(1 - p2), sdc = (x2 - x1) / (z2 - z1), muc = x1 - z1 * sdc;
      return q1('The time taken to complete a puzzle, ' + M('T') + ' minutes, is normally distributed. ' + M('P(T < ' + x1 + ') = ' + p1) + ' and ' + M('P(T > ' + x2 + ') = ' + p2) + '.<br>Find the mean and the standard deviation of ' + M('T') + '.', 5,
        M('\\frac{' + x1 + ' - \\mu}{\\sigma} = ' + s3(z1) + ',\\ \\frac{' + x2 + ' - \\mu}{\\sigma} = ' + s3(z2)) + ' ⇒ ' + M('\\mu = ' + s3(muc) + ',\\ \\sigma = ' + s3(sdc)));
    } }
  ] });

  T({ id: 'ib-hypothesis', name: 'Hypothesis testing: chi-squared and binomial tests', video: 'IB maths AI chi squared test for independence', gens: [
    { d: [1, 2], f: function () {
      var rows = ['Year 12', 'Year 13'], cols = ['Football', 'Hockey', 'Netball'], O = [[ri(10, 40), ri(10, 40), ri(10, 40)], [ri(10, 40), ri(10, 40), ri(10, 40)]];
      var R = O.map(function (r) { return r[0] + r[1] + r[2]; }), C = [0, 1, 2].map(function (j) { return O[0][j] + O[1][j]; }), N = R[0] + R[1];
      var E = O.map(function (r, i) { return r.map(function (_, j) { return R[i] * C[j] / N; }); });
      var chi = 0; O.forEach(function (r, i) { r.forEach(function (o, j) { chi += (o - E[i][j]) * (o - E[i][j]) / E[i][j]; }); });
      var pv = IB.chi2sf(chi, 2);
      return { stem: 'A school asks ' + N + ' students which sport they prefer. A ' + M('\\chi^2') + ' test for independence is carried out at the 5% significance level.' + IB.table([''].concat(cols).concat(['Total']), O.map(function (r, i) { return [rows[i]].concat(r).concat([R[i]]); }).concat([['Total'].concat(C).concat([N])])), parts: [
        { q: 'Write down the null hypothesis.', m: 1, a: 'Preferred sport is independent of year group.' },
        { q: 'Find the expected frequency of Year 12 students who prefer hockey.', m: 2, a: M('\\frac{' + R[0] + ' \\times ' + C[1] + '}{' + N + '}') + ' = ' + s3(E[0][1]) },
        { q: 'Write down the number of degrees of freedom.', m: 1, a: '2' },
        { q: 'Find the ' + M('\\chi^2') + ' statistic and the ' + M('p') + '-value.', m: 2, a: M('\\chi^2 = ' + s3(chi) + ',\\ p = ' + p3(pv)) },
        { q: 'State the conclusion of the test.', m: 1, a: pv < 0.05 ? M('p < 0.05') + ': reject H₀. Preferred sport depends on year group.' : M('p > 0.05') + ': do not reject H₀. There is insufficient evidence that preferred sport depends on year group.' }
      ] };
    } },
    { d: [2, 3], f: function () {
      var N = pick([60, 120]), e = N / 6, O; do { O = [0, 0, 0, 0, 0, 0]; for (var i = 0; i < N; i++) O[Math.random() < 0.3 ? 5 : ri(0, 5)]++; } while (O.some(function (v) { return v < 5; }));
      var chi = O.reduce(function (s, o) { return s + (o - e) * (o - e) / e; }, 0), pv = IB.chi2sf(chi, 5);
      return { stem: 'A die is rolled ' + N + ' times. The results are shown. A goodness of fit test is used at the 5% level to test whether the die is fair.' + IB.table(['Score', 1, 2, 3, 4, 5, 6], [['Frequency'].concat(O)]), parts: [
        { q: 'Write down the expected frequency for each score.', m: 1, a: String(e) },
        { q: 'Write down the number of degrees of freedom.', m: 1, a: '5' },
        { q: 'Find the ' + M('\\chi^2') + ' statistic and the ' + M('p') + '-value.', m: 3, a: M('\\chi^2 = ' + s3(chi) + ',\\ p = ' + p3(pv)) },
        { q: 'State, with a reason, whether the die appears to be fair.', m: 2, a: pv < 0.05 ? 'Not fair: ' + M('p < 0.05') + ', so reject H₀.' : 'Fair: ' + M('p > 0.05') + ', so do not reject H₀.' }
      ] };
    } },
    { d: [3], f: function () {
      var n = pick([20, 25, 30]), p0 = pick([0.2, 0.25, 0.3]), x = Math.round(n * p0) + ri(2, 6), pv = 1 - IB.bcdf(n, p0, x - 1);
      var c = 0; while (1 - IB.bcdf(n, p0, c - 1) >= 0.05) c++;
      return { stem: 'A company claims that ' + p0 * 100 + '% of its customers use its app. A manager believes the proportion is higher. In a random sample of ' + n + ' customers, ' + x + ' use the app. A test is carried out at the 5% significance level.', parts: [
        { q: 'Write down suitable hypotheses.', m: 1, a: M('H_0: p = ' + p0 + ',\\ H_1: p > ' + p0) },
        { q: 'Find the ' + M('p') + '-value of the test.', m: 2, a: M('P(X \\ge ' + x + ') = ' + p3(pv)) },
        { q: 'State the conclusion.', m: 1, a: pv < 0.05 ? 'Reject H₀: evidence that the proportion is higher.' : 'Do not reject H₀: insufficient evidence that the proportion is higher.' },
        { q: 'Find the critical region and the probability of a Type I error.', m: 3, a: M('X \\ge ' + c) + '; ' + M('P(\\text{Type I}) = P(X \\ge ' + c + ') = ' + s3(1 - IB.bcdf(n, p0, c - 1))) }
      ] };
    } }
  ] });

  T({ id: 'ib-estimation', name: 'Random variables, estimation and confidence intervals', video: 'IB maths AI confidence interval central limit theorem', gens: [
    { d: [1], f: function () {
      var mx = ri(5, 30), vx = ri(2, 16), my = ri(5, 30), vy = ri(2, 16), a = nz(-4, 5), b = nz(-10, 10);
      return { stem: 'The independent random variables ' + M('X') + ' and ' + M('Y') + ' have ' + M('E(X) = ' + mx) + ', ' + M('\\mathrm{Var}(X) = ' + vx) + ', ' + M('E(Y) = ' + my) + ' and ' + M('\\mathrm{Var}(Y) = ' + vy) + '.', parts: [
        { q: 'Find ' + M('E(' + a + 'X' + BS.sg(b) + ')') + ' and ' + M('\\mathrm{Var}(' + a + 'X' + BS.sg(b) + ')') + '.', m: 2, a: M('E = ' + (a * mx + b) + ',\\ \\mathrm{Var} = ' + a * a * vx) },
        { q: 'Find ' + M('E(X - Y)') + ' and ' + M('\\mathrm{Var}(X - Y)') + '.', m: 2, a: M('E = ' + (mx - my) + ',\\ \\mathrm{Var} = ' + (vx + vy)) }
      ] };
    } },
    { d: [2], f: function () {
      var n = ri(8, 12), xs = []; for (var i = 0; i < n; i++) xs.push(ri(30, 70) / 10);
      var Sx = xs.reduce(function (s, v) { return s + v; }, 0), Sxx = xs.reduce(function (s, v) { return s + v * v; }, 0), xb = Sx / n, s2 = (Sxx - n * xb * xb) / (n - 1);
      return { stem: 'The lengths, ' + M('x') + ' cm, of a random sample of ' + n + ' leaves are measured. ' + M('\\sum x = ' + num(Math.round(Sx * 100) / 100)) + ' and ' + M('\\sum x^2 = ' + num(Math.round(Sxx * 100) / 100)) + '.', parts: [
        { q: 'Find an unbiased estimate of the population mean.', m: 1, a: s3(xb) + ' cm' },
        { q: 'Find an unbiased estimate of the population variance.', m: 3, a: M('s_{n-1}^2 = \\frac{\\sum x^2 - n\\bar{x}^2}{n - 1}') + ' = ' + s3(s2) }
      ] };
    } },
    { d: [3], f: function () {
      var mu = ri(400, 520), sd = ri(10, 30), n = pick([25, 36, 40, 50, 64]), xb = mu + ri(-6, 6) + ri(0, 9) / 10, z = 1.959964;
      var se = sd / Math.sqrt(n), k = mu + Math.max(1, Math.round(se * pick([0.5, 1, 1.5, 2])));
      return { stem: 'The mass of a bag of rice is a random variable with mean ' + mu + ' g and standard deviation ' + sd + ' g.', parts: [
        { q: 'A random sample of ' + n + ' bags is taken. Find the probability that the sample mean is greater than ' + k + ' g.', m: 3, a: M('\\bar{X} \\sim N\\left(' + mu + ',\\ \\frac{' + sd + '^2}{' + n + '}\\right)') + '; ' + s3(1 - IB.ncdf(k, mu, se)) },
        { q: 'A different sample of ' + n + ' bags has mean ' + xb + ' g. Find a 95% confidence interval for the population mean, assuming the standard deviation is ' + sd + ' g.', m: 3, a: M('(' + (xb - z * se).toFixed(1) + ',\\ ' + (xb + z * se).toFixed(1) + ')') }
      ] };
    } }
  ] });

  T({ id: 'ib-poisson', name: 'The Poisson distribution', video: 'IB maths AI Poisson distribution', gens: [
    { d: [1], f: function () {
      var m = pick([1.5, 2, 2.4, 3, 3.5, 4.2]), k = ri(1, 4), j = ri(2, 5);
      return { stem: 'The number of emails a teacher receives in an hour follows a Poisson distribution with mean ' + m + '.', parts: [
        { q: 'Find the probability that the teacher receives exactly ' + k + ' emails in an hour.', m: 2, a: s3(IB.ppdf(m, k)) },
        { q: 'Find the probability that the teacher receives at most ' + j + ' emails in an hour.', m: 2, a: s3(IB.pcdf(m, j)) }
      ] };
    } },
    { d: [2], f: function () {
      var m = pick([2, 2.5, 3, 4, 5]), k = ri(3, 9);
      return { stem: 'Calls arrive at a help desk at a mean rate of ' + m + ' per hour, following a Poisson distribution.', parts: [
        { q: 'Find the probability that no calls arrive in a 30-minute period.', m: 2, a: M('e^{-' + num(m / 2) + '}') + ' = ' + s3(Math.exp(-m / 2)) },
        { q: 'Find the probability that more than ' + k + ' calls arrive in a 2-hour period.', m: 3, a: M('Y \\sim \\mathrm{Po}(' + num(2 * m) + ')') + '; ' + M('P(Y > ' + k + ') = ' + s3(1 - IB.pcdf(2 * m, k))) }
      ] };
    } },
    { d: [3], f: function () {
      var m1 = pick([1.2, 1.5, 2, 2.5]), m2 = pick([0.8, 1, 1.5, 3]), k = ri(2, 6), p = pick([0.1, 0.15, 0.2, 0.3]);
      return { parts: [
        { q: 'A shop sells red bicycles at a mean rate of ' + m1 + ' per day and blue bicycles at a mean rate of ' + m2 + ' per day, independently, both following Poisson distributions. Find the probability that exactly ' + k + ' bicycles are sold in a day.', m: 3, a: M('\\mathrm{Po}(' + num(m1 + m2) + ')') + ': ' + s3(IB.ppdf(m1 + m2, k)) },
        { q: M('X \\sim \\mathrm{Po}(m)') + ' and ' + M('P(X = 0) = ' + p) + '. Find ' + M('m') + '.', m: 2, a: M('m = -\\ln ' + p + ' = ' + s3(-Math.log(p))) }
      ] };
    } }
  ] });

  T({ id: 'ib-markov', name: 'Transition matrices and Markov chains', video: 'IB maths AI Markov chains transition matrix steady state', gens: [
    { d: [1], f: function () {
      var a = ri(1, 4) / 10, b = ri(1, 5) / 10;
      var Tm = [[1 - a, b], [a, 1 - b]], T2 = IB.mm(Tm, Tm);
      return { stem: 'Each week a family either eats out (' + M('E') + ') or cooks at home (' + M('H') + '). The transition diagram shows the probabilities of changing from one week to the next.' + D.markov(['E', 'H'], [[dp(1 - a, 1), String(a)], [String(b), dp(1 - b, 1)]]), parts: [
        { q: 'Write down the transition matrix ' + M('\\mathbf{T}') + ', where columns represent the current week and rows the next week, in the order ' + M('E') + ', ' + M('H') + '.', m: 2, a: M(mat([[dp(1 - a, 1), b], [a, dp(1 - b, 1)]])) },
        { q: 'The family eats out this week. Find the probability that they eat out in two weeks’ time.', m: 2, a: s3(T2[0][0]) }
      ] };
    } },
    { d: [2], f: function () {
      var Pm = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      for (var j = 0; j < 3; j++) { var x = ri(1, 7), y = ri(1, 9 - x); var col = [x / 10, y / 10, (10 - x - y) / 10]; for (var i = 0; i < 3; i++) Pm[i][j] = col[i]; }
      var s0 = pick([[100, 0, 0], [50, 30, 20], [40, 40, 20]]), s2 = IB.mm(IB.mpow(Pm, 2), s0.map(function (v) { return [v]; }));
      var probs = [0, 1, 2].map(function (i) { return [0, 1, 2].map(function (j) { return dp(Pm[j][i], 1); }); });
      return { stem: 'Shoppers choose between three supermarkets ' + M('A') + ', ' + M('B') + ' and ' + M('C') + ' each week. The transition matrix is ' + M('\\mathbf{T} = ' + mat(Pm.map(function (r) { return r.map(function (v) { return dp(v, 1); }); }))) + ', where columns are this week and rows are next week.' + D.markov(['A', 'B', 'C'], probs), parts: [
        { q: 'This week, the percentages of shoppers at ' + M('A') + ', ' + M('B') + ' and ' + M('C') + ' are ' + s0.join('%, ') + '%. Find the percentages in two weeks’ time.', m: 3, a: M(vec(s2.map(function (r) { return s3(r[0]); }))) + ' (%)' }
      ] };
    } },
    { d: [3], f: function () {
      var a = ri(1, 4) / 10, b = ri(1, 5) / 10, an = Math.round(a * 10), bn = Math.round(b * 10);
      return { stem: 'A machine is either working (' + M('W') + ') or broken (' + M('B') + ') at the start of each day. If it is working, the probability it is broken the next day is ' + a + '. If it is broken, the probability it is working the next day is ' + b + '.', parts: [
        { q: 'Write down the transition matrix.', m: 2, a: M(mat([[dp(1 - a, 1), b], [a, dp(1 - b, 1)]])) },
        { q: 'Find the steady-state vector.', m: 3, a: M(vec([frac(bn, an + bn), frac(an, an + bn)])) },
        { q: 'Interpret the steady state in context.', m: 1, a: 'In the long run the machine is working on ' + s3(bn / (an + bn) * 100) + '% of days.' }
      ] };
    } }
  ] });
})(typeof window !== 'undefined' ? window : globalThis);
