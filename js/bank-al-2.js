/* Byte Size — Pearson Edexcel A Level Mathematics, Year 1 (AS) Statistics and Mechanics. Take g = 9.8 m s⁻². */
(function (g) {
  var BS = g.BS, D = BS.draw, IB = BS.ib, FM = BS.fm, AL = BS.al;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, dp = BS.dp, num = BS.num, M = BS.m;
  var s3 = IB.s3, from = FM.from, c1 = FM.c1, tc = FM.tc, q1 = AL.q1, table = IB.table;
  function f4(p) { return p < 0.0001 ? p.toExponential(2) : p.toFixed(4); }
  var G = 9.8;
  function vec(a, b) { return c1(a, '\\mathbf{i}') + tc(b, '\\mathbf{j}'); }

  /* ---------- diagrams ---------- */
  function pulleyTable(mA, mB) {
    var s = D.line(20, 80, 230, 80, 'ln') + D.line(230, 80, 230, 210, 'ln') + '<rect x="20" y="80" width="210" height="8" class="shade"/>';
    s += '<circle cx="240" cy="72" r="10" class="thin"/>' + '<rect x="80" y="50" width="50" height="30" class="shape"/>' + D.line(130, 62, 240, 62, 'ln') + D.line(250, 72, 250, 140, 'ln') + '<rect x="235" y="140" width="30" height="34" class="shape"/>';
    s += D.text(105, 70, 'A', { anchor: 'middle', cls: 'it' }) + D.text(250, 162, 'B', { anchor: 'middle', cls: 'it' }) + D.text(105, 40, mA + ' kg', { anchor: 'middle', size: 12 }) + D.text(274, 160, mB + ' kg', { size: 12 }) + D.text(240, 50, 'P', { anchor: 'middle', cls: 'it' });
    return D.svg(320, 220, s, 'Particles connected over a pulley at the edge of a table');
  }
  function atwood(m1, m2) {
    var s = D.line(130, 20, 170, 20, 'ln') + D.line(150, 20, 150, 40) + '<circle cx="150" cy="50" r="12" class="thin"/>' + D.line(138, 50, 138, 130) + D.line(162, 50, 162, 100);
    s += '<rect x="122" y="130" width="32" height="30" class="shape"/><rect x="146" y="100" width="32" height="30" class="shape"/>';
    s += D.text(138, 148, 'A', { anchor: 'middle', cls: 'it' }) + D.text(162, 118, 'B', { anchor: 'middle', cls: 'it' }) + D.text(112, 148, m1 + ' kg', { anchor: 'end', size: 12 }) + D.text(186, 118, m2 + ' kg', { size: 12 });
    return D.svg(300, 180, s, 'Two particles hanging over a pulley');
  }
  function towing(m1, m2) {
    var s = D.line(10, 120, 310, 120, 'ln') + '<rect x="30" y="90" width="80" height="30" class="shape"/><rect x="160" y="80" width="110" height="40" class="shape"/>' + D.line(110, 105, 160, 105, 'ln');
    s += D.text(70, 110, 'trailer', { anchor: 'middle', size: 11 }) + D.text(215, 104, 'car', { anchor: 'middle', size: 11 }) + D.text(70, 80, m1 + ' kg', { anchor: 'middle', size: 12 }) + D.text(215, 70, m2 + ' kg', { anchor: 'middle', size: 12 });
    s += D.arrow(270, 100, 305, 100, 'accent') + D.text(300, 90, 'D', { anchor: 'middle', cls: 'it' });
    return D.svg(320, 140, s, 'Car towing a trailer');
  }

  /* ================= STATISTICS ================= */
  var METHODS = [
    ['taking every 20th name from the school register after choosing a random starting point between 1 and 20', 'Systematic sampling', 'Simple to carry out; it needs a list (sampling frame), and can be biased if the list has a pattern.'],
    ['standing outside a shop and asking the first 30 people who walk past', 'Opportunity (convenience) sampling', 'Quick and cheap; unlikely to be representative of the population.'],
    ['choosing 10 boys and 10 girls, with the interviewer deciding who to ask', 'Quota sampling', 'Can be representative of the groups without a sampling frame; it is not random, so it may be biased.'],
    ['giving each student a number and using a random number generator to choose 25 numbers', 'Simple random sampling', 'Every sample is equally likely, so it is free from bias; it needs a full sampling frame.'],
    ['choosing students from each year group in proportion to the size of the year group, at random within each group', 'Stratified sampling', 'Reflects the population structure; it needs a sampling frame and clear groups.']];
  BS.topic({ id: 'al-sampling', name: 'Data collection and sampling', video: 'A level maths statistics sampling methods', gens: [
    { d: [1, 2], f: function () {
      var a = pick(METHODS);
      return { stem: 'A researcher wants to find out about the travel habits of students at a school. She selects a sample by ' + a[0] + '.', parts: [
        { q: 'Name this method of sampling.', m: 1, a: a[1] },
        { q: 'Give one advantage and one disadvantage of this method.', m: 2, a: a[2] },
        { q: 'Explain why she uses a sample rather than a census.', m: 1, a: 'A census would take too long and cost too much; a sample is quicker and cheaper.' }
      ] };
    } },
    { d: [1, 2], f: function () {
      var g_ = [ri(80, 200), ri(80, 200), ri(80, 200)], N = g_[0] + g_[1] + g_[2], n = pick([30, 40, 50, 60]);
      var raw = g_.map(function (v) { return v / N * n; }), r = raw.map(Math.floor), left = n - r.reduce(function (a, c) { return a + c; }, 0);
      [0, 1, 2].sort(function (i, j) { return (raw[j] - r[j]) - (raw[i] - r[i]); }).slice(0, left).forEach(function (i) { r[i]++; });
      return q1('A sports club has ' + g_[0] + ' junior, ' + g_[1] + ' adult and ' + g_[2] + ' senior members. A stratified sample of ' + n + ' members is taken.<br>Find the number of members from each group in the sample.', 2,
        'Junior ' + r[0] + ', adult ' + r[1] + ', senior ' + r[2] + ' (e.g. ' + M('\\frac{' + g_[0] + '}{' + N + '} \\times ' + n + ' = ' + raw[0].toFixed(1)) + ')');
    } }
  ] });

  BS.topic({ id: 'al-location', name: 'Measures of location and spread, and coding', video: 'A level maths standard deviation coding', gens: [
    { d: [1, 2], f: function () { // from summary statistics
      var n = ri(10, 30), xs = []; for (var i = 0; i < n; i++) xs.push(ri(10, 60)); var Sx = xs.reduce(function (a, c) { return a + c; }, 0), Sxx = xs.reduce(function (a, c) { return a + c * c; }, 0);
      var mean = Sx / n, sd = Math.sqrt(Sxx / n - mean * mean);
      return { stem: 'The times, ' + M('x') + ' minutes, that ' + n + ' commuters took to travel to work are summarised by ' + M('\\sum x = ' + Sx) + ' and ' + M('\\sum x^2 = ' + num(Sxx)) + '.', parts: [
        { q: 'Find the mean time.', m: 1, a: s3(mean) + ' minutes' },
        { q: 'Find the standard deviation of the times.', m: 2, a: M('\\sigma = \\sqrt{\\frac{' + Sxx + '}{' + n + '} - ' + s3(mean) + '^2} = ' + s3(sd)) + ' minutes' }
      ] };
    } },
    { d: [2, 3], f: function () { // coding
      var a = pick([100, 50, 200, 20]), b = pick([10, 5, 2]), my = ri(-20, 40) / 10, sy = ri(5, 30) / 10;
      return { stem: 'A set of data values ' + M('x') + ' is coded using ' + M('y = \\frac{x - ' + a + '}{' + b + '}') + '. For the coded data, the mean is ' + my + ' and the standard deviation is ' + sy + '.', parts: [
        { q: 'Find the mean of ' + M('x') + '.', m: 2, a: num(a + b * my) },
        { q: 'Find the standard deviation of ' + M('x') + '.', m: 2, a: num(b * sy) }
      ] };
    } },
    { d: [2, 3], f: function () { // grouped data with interpolation
      var b = [0, 10, 20, 30, 50, 80], f = [ri(4, 12), ri(10, 20), ri(14, 26), ri(10, 20), ri(3, 10)], N = f.reduce(function (a, c) { return a + c; }, 0);
      var mids = [5, 15, 25, 40, 65], mean = f.reduce(function (a, c, i) { return a + c * mids[i]; }, 0) / N, sx2 = f.reduce(function (a, c, i) { return a + c * mids[i] * mids[i]; }, 0) / N, sd = Math.sqrt(sx2 - mean * mean);
      var cf = 0, k = 0; while (cf + f[k] < N / 2) { cf += f[k]; k++; } var med = b[k] + (N / 2 - cf) / f[k] * (b[k + 1] - b[k]);
      return { stem: 'The table shows the distances, ' + M('d') + ' km, that ' + N + ' people travelled to a concert.' + table(['Distance ' + M('d') + ' (km)', 'Frequency'], b.slice(0, 5).map(function (lo, i) { return [lo + ' ≤ ' + M('d') + ' < ' + b[i + 1], String(f[i])]; })), parts: [
        { q: 'Use linear interpolation to estimate the median distance.', m: 2, a: s3(med) + ' km' },
        { q: 'Estimate the mean and the standard deviation of the distances.', m: 4, a: 'Mean ' + s3(mean) + ' km, standard deviation ' + s3(sd) + ' km' }
      ] };
    } }
  ] });

  BS.topic({ id: 'al-representations', name: 'Data presentation: histograms, outliers and box plots', video: 'A level maths histograms outliers', gens: from('stats-diagrams', [0, 1]).concat([
    { d: [2], f: function () { // histogram unequal widths
      var b = [0, 5, 10, 20, 30, 50], f = [ri(4, 10), ri(8, 18), ri(16, 30), ri(10, 22), ri(4, 12)], fd = f.map(function (v, i) { return v / (b[i + 1] - b[i]); });
      var lo = 8, hi = 25, est = f[1] * (10 - lo) / 5 + f[2] + f[3] * (hi - 20) / 10, N = f.reduce(function (a, c) { return a + c; }, 0);
      return { stem: 'The histogram shows the times, in minutes, that ' + N + ' runners took to complete a race (times shown as minutes over the winning time).' + D.histogram(b, fd, 'Time (minutes)', 'Frequency density', fd.some(function (v) { return v > 4; }) ? 1 : 0.5, 10), parts: [
        { q: 'Find the number of runners in the class ' + M('10 \\le t < 20') + '.', m: 1, a: String(f[2]) },
        { q: 'Estimate the number of runners with times between ' + lo + ' and ' + hi + ' minutes.', m: 3, a: s3(est) }
      ] };
    } },
    { d: [2, 3], f: function () { // outliers 1.5 IQR and box plot
      var q1v = ri(20, 30), q2 = q1v + ri(3, 8), q3 = q2 + ri(3, 8), iqr = q3 - q1v, lowF = q1v - 1.5 * iqr, highF = q3 + 1.5 * iqr, big = Math.ceil(highF) + ri(2, 8), next = q3 + ri(1, Math.max(1, Math.floor(1.5 * iqr) - 1)), small = Math.max(0, Math.ceil(lowF) + ri(0, 3));
      return { stem: 'A data set has lower quartile ' + q1v + ', median ' + q2 + ' and upper quartile ' + q3 + '. The smallest value is ' + small + ' and the two largest values are ' + next + ' and ' + big + '. An outlier is a value more than ' + M('1.5 \\times') + ' the interquartile range above ' + M('Q_3') + ' or below ' + M('Q_1') + '.', parts: [
        { q: 'Show that ' + big + ' is an outlier and determine whether there are any other outliers.', m: 3, a: 'Upper fence ' + M(q3 + ' + 1.5 \\times ' + iqr + ' = ' + num(highF)) + '; ' + big + ' > ' + num(highF) + ' so it is an outlier. Lower fence ' + num(lowF) + '; ' + small + ' is ' + (small < lowF ? '' : 'not ') + 'an outlier, and ' + next + ' is not an outlier.' },
        { q: 'Draw a box plot for these data, showing the outlier with a cross.', m: 3, a: 'Box from ' + q1v + ' to ' + q3 + ' with median ' + q2 + '; whiskers to ' + small + ' and ' + next + '; cross at ' + big + '.' + D.boxplot([small, q1v, q2, q3, next], Math.floor(small / 10) * 10, Math.ceil((big + 5) / 10) * 10, 10, '') }
      ] };
    } },
    { d: [2], f: function () { // mean ± 2sd rule
      var mean = ri(40, 80), sd = ri(4, 10), v = mean + pick([1, -1]) * (2 * sd + ri(1, 6)), w = mean + ri(1, 2 * sd - 1);
      return q1('A data set has mean ' + mean + ' and standard deviation ' + sd + '. Values more than 2 standard deviations from the mean are outliers.<br>Determine whether ' + v + ' and ' + w + ' are outliers.', 3,
        'Limits ' + (mean - 2 * sd) + ' and ' + (mean + 2 * sd) + ': ' + v + ' is an outlier; ' + w + ' is not.');
    } }
  ]) });

  BS.topic({ id: 'al-correlation', name: 'Correlation and regression', video: 'A level maths regression line interpret', gens: from('ib-regression', [0]).concat([
    { d: [1, 2], f: function () {
      var a = ri(10, 60), b = ri(12, 40) / 10, xlo = ri(10, 20), xhi = xlo + ri(15, 30), xin = ri(xlo + 2, xhi - 2), xout = xhi + ri(10, 30);
      return { stem: 'A teacher records the hours of revision, ' + M('h') + ', and the test score, ' + M('s') + ', of a group of students, with ' + M('h') + ' between ' + xlo + ' and ' + xhi + '. The equation of the regression line of ' + M('s') + ' on ' + M('h') + ' is ' + M('s = ' + a + ' + ' + b + 'h') + '.', parts: [
        { q: 'Give an interpretation of the value ' + b + '.', m: 1, a: 'Each extra hour of revision is associated with an increase of ' + b + ' marks in the test score.' },
        { q: 'Estimate the score of a student who revised for ' + xin + ' hours.', m: 1, a: s3(a + b * xin) },
        { q: 'Comment on the reliability of using the line to estimate the score for ' + xout + ' hours of revision.', m: 1, a: 'Unreliable: ' + xout + ' is outside the range of the data (extrapolation).' }
      ] };
    } },
    { d: [1], f: function () {
      var n = 8, xs = [], ys = [], m = pick([-1, 1]) * ri(5, 15) / 10, c = ri(20, 60); for (var i = 0; i < n; i++) { var x = ri(2, 30); while (xs.indexOf(x) > -1) x = ri(2, 30); xs.push(x); ys.push(Math.round(m * x + c + ri(-5, 5))); }
      return { stem: 'The scatter diagram shows the daily maximum temperature, ' + M('x') + ' °C, and the number of ice creams sold, ' + M('y') + ', on eight days.' + D.scatter(xs, ys, 'x', 'y'), parts: [
        { q: 'Describe the correlation shown.', m: 1, a: (m > 0 ? 'Positive' : 'Negative') + ' correlation' },
        { q: 'A student says that the temperature causes the change in sales. Explain why correlation alone does not show this.', m: 1, a: 'Correlation does not imply causation; another factor could be responsible.' }
      ] };
    } }
  ]) });

  BS.topic({ id: 'al-probability', name: 'Probability: Venn diagrams, independence and tree diagrams', video: 'A level maths probability independent events venn', gens: from('ib-probability', [0, 2]).concat([
    { d: [2, 3], f: function () { // independence on a Venn diagram
      var pA = ri(2, 6) / 10, pB = ri(2, 6) / 10, both = Math.round(pA * pB * 100) / 100, onlyA = Math.round((pA - both) * 100) / 100, onlyB = Math.round((pB - both) * 100) / 100, none = Math.round((1 - pA - pB + both) * 100) / 100;
      return { stem: 'The Venn diagram shows the probabilities for two events ' + M('A') + ' and ' + M('B') + ', where ' + M('p') + ' and ' + M('q') + ' are probabilities.' + D.venn([String(onlyA), 'p', 'q', String(none)], ['A', 'B']) + 'The events ' + M('A') + ' and ' + M('B') + ' are independent.', parts: [
        { q: 'Find the values of ' + M('p') + ' and ' + M('q') + '.', m: 4, a: M('p + q = ' + num(Math.round((1 - onlyA - none) * 100) / 100)) + ' and ' + M('(' + onlyA + ' + p)(p + q) = p') + ', giving ' + M('p = ' + both + ',\\ q = ' + onlyB) },
        { q: 'Find ' + M("P(A' \\cup B)") + '.', m: 1, a: num(Math.round((1 - onlyA) * 100) / 100) }
      ] };
    } },
    { d: [1, 2], f: function () { // mutually exclusive / independence check
      var pA = ri(1, 5) / 10, pB = ri(1, 5) / 10, pAB = pick([0, Math.round(pA * pB * 100) / 100, Math.round((pA * pB + 0.02) * 100) / 100]);
      return { stem: M('P(A) = ' + pA) + ', ' + M('P(B) = ' + pB) + ' and ' + M('P(A \\cap B) = ' + pAB) + '.', parts: [
        { q: 'State, with a reason, whether ' + M('A') + ' and ' + M('B') + ' are mutually exclusive.', m: 1, a: pAB === 0 ? 'Yes, because ' + M('P(A \\cap B) = 0') + '.' : 'No, because ' + M('P(A \\cap B) \\ne 0') + '.' },
        { q: 'Determine whether ' + M('A') + ' and ' + M('B') + ' are independent.', m: 2, a: M('P(A) \\times P(B) = ' + num(Math.round(pA * pB * 100) / 100)) + (Math.abs(pA * pB - pAB) < 1e-9 ? ' = P(A ∩ B), so independent.' : ' ≠ P(A ∩ B), so not independent.') },
        { q: 'Find ' + M('P(A \\cup B)') + '.', m: 1, a: num(Math.round((pA + pB - pAB) * 100) / 100) }
      ] };
    } }
  ]) });

  BS.topic({ id: 'al-binomial-dist', name: 'The binomial distribution', video: 'A level maths binomial distribution', gens: [
    { d: [1, 2], f: function () {
      var n = pick([10, 12, 15, 20, 25, 30]), p = pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45]), r = ri(2, Math.round(n * p) + 1), a = ri(1, 3), b = a + ri(2, 5);
      return { stem: 'The random variable ' + M('X \\sim B(' + n + ',\\ ' + p + ')') + '.', parts: [
        { q: 'Find ' + M('P(X = ' + r + ')') + '.', m: 2, a: f4(IB.bpdf(n, p, r)) },
        { q: 'Find ' + M('P(X \\le ' + r + ')') + '.', m: 1, a: f4(IB.bcdf(n, p, r)) },
        { q: 'Find ' + M('P(' + a + ' < X \\le ' + b + ')') + '.', m: 2, a: f4(IB.bcdf(n, p, b) - IB.bcdf(n, p, a)) }
      ] };
    } },
    { d: [2], f: function () { // context and conditions
      var n = pick([12, 15, 20]), p = pick([0.15, 0.2, 0.25, 0.3]), k = ri(3, 6);
      return { stem: 'A manufacturer finds that ' + Math.round(p * 100) + '% of its plates are chipped. A box contains ' + n + ' plates.', parts: [
        { q: 'State two assumptions needed to model the number of chipped plates in a box by a binomial distribution.', m: 2, a: 'Plates are chipped independently of each other; the probability of a plate being chipped is constant.' },
        { q: 'Find the probability that more than ' + k + ' plates in a box are chipped.', m: 2, a: f4(1 - IB.bcdf(n, p, k)) },
        { q: 'Find the probability that, in 5 boxes, exactly 2 boxes contain more than ' + k + ' chipped plates.', m: 3, a: f4(IB.bpdf(5, 1 - IB.bcdf(n, p, k), 2)) }
      ] };
    } },
    { d: [3], f: function () { // least n
      var p = pick([0.05, 0.1, 0.15, 0.2]), target = pick([0.9, 0.95, 0.99]), n = Math.ceil(Math.log(1 - target) / Math.log(1 - p));
      return q1('The probability that a seed fails to grow is ' + p + '. Find the least number of seeds that must be planted for the probability that at least one fails to grow to be greater than ' + target + '.', 3, M('1 - ' + (1 - p).toFixed(2) + '^n > ' + target + ' \\Rightarrow n = ' + n));
    } }
  ] });

  function critUpper(n, p, alpha) { for (var c = 0; c <= n; c++) if (1 - IB.bcdf(n, p, c - 1) <= alpha) return c; return n + 1; }
  function critLower(n, p, alpha) { var c = -1; for (var k = 0; k <= n; k++) if (IB.bcdf(n, p, k) <= alpha) c = k; return c; }
  BS.topic({ id: 'al-hypothesis', name: 'Hypothesis testing with the binomial distribution', video: 'A level maths binomial hypothesis test critical region', gens: [
    { d: [1, 2], f: function () { // one-tailed test on an observed value
      var n = pick([15, 20, 25, 30]), p = pick([0.2, 0.25, 0.3, 0.4]), up = Math.random() < 0.6, x = up ? Math.round(n * p) + ri(2, 5) : Math.max(0, Math.round(n * p) - ri(2, 5)), alpha = pick([0.05, 0.1]);
      var pv = up ? 1 - IB.bcdf(n, p, x - 1) : IB.bcdf(n, p, x);
      return { stem: 'A coin-operated game is claimed to give a prize with probability ' + p + '. A player suspects the probability is ' + (up ? 'higher' : 'lower') + '. In ' + n + ' games, ' + x + ' prizes are won. A test is carried out at the ' + alpha * 100 + '% significance level.', parts: [
        { q: 'State suitable hypotheses.', m: 1, a: M('H_0: p = ' + p) + ', ' + M('H_1: p ' + (up ? '>' : '<') + ' ' + p) },
        { q: 'Carry out the test, stating your conclusion in context.', m: 4, a: M('X \\sim B(' + n + ',\\ ' + p + ')') + ', ' + M('P(X ' + (up ? '\\ge' : '\\le') + ' ' + x + ') = ' + f4(pv)) + (pv < alpha ? ' < ' + alpha + ': reject ' + M('H_0') + '; there is evidence the probability is ' + (up ? 'higher' : 'lower') + '.' : ' > ' + alpha + ': do not reject ' + M('H_0') + '; insufficient evidence that the probability is ' + (up ? 'higher' : 'lower') + '.') }
      ] };
    } },
    { d: [2, 3], f: function () { // critical region and actual significance
      var n = pick([20, 25, 30]), p = pick([0.2, 0.25, 0.3, 0.35]), alpha = 0.05, c = critUpper(n, p, alpha), act = 1 - IB.bcdf(n, p, c - 1);
      return { stem: 'A test is carried out of ' + M('H_0: p = ' + p) + ' against ' + M('H_1: p > ' + p) + ', using ' + M('X \\sim B(' + n + ',\\ p)') + ' at the 5% significance level.', parts: [
        { q: 'Find the critical region for the test.', m: 3, a: M('X \\ge ' + c) },
        { q: 'State the actual significance level of the test.', m: 1, a: f4(act) }
      ] };
    } },
    { d: [3], f: function () { // two-tailed critical regions
      var n = pick([20, 25, 30, 40]), p = pick([0.3, 0.35, 0.4, 0.45]), lo = critLower(n, p, 0.025), hi = critUpper(n, p, 0.025);
      var act = (lo >= 0 ? IB.bcdf(n, p, lo) : 0) + 1 - IB.bcdf(n, p, hi - 1);
      return { stem: 'A two-tailed test of ' + M('H_0: p = ' + p) + ' against ' + M('H_1: p \\ne ' + p) + ' uses ' + M('X \\sim B(' + n + ',\\ p)') + ' at the 5% level, with probability in each tail as close as possible to, but not exceeding, 2.5%.', parts: [
        { q: 'Find the critical regions.', m: 4, a: (lo >= 0 ? M('X \\le ' + lo) + ' and ' : '') + M('X \\ge ' + hi) },
        { q: 'Find the actual significance level.', m: 1, a: f4(act) }
      ] };
    } }
  ] });

  /* ================= MECHANICS ================= */
  BS.topic({ id: 'al-suvat', name: 'Kinematics: constant acceleration and vertical motion', video: 'A level maths suvat vertical motion', gens: [
    { d: [1], f: function () {
      var u = ri(0, 10), a = ri(1, 6) / 2, t = ri(4, 12), v = u + a * t, s = (u + v) / 2 * t;
      return { stem: 'A car moves along a straight horizontal road with constant acceleration. It passes point ' + M('A') + ' with speed ' + u + ' m s⁻¹ and ' + t + ' s later passes point ' + M('B') + ' with speed ' + num(v) + ' m s⁻¹.', parts: [
        { q: 'Find the acceleration of the car.', m: 2, a: num(a) + ' m s⁻²' },
        { q: 'Find the distance ' + M('AB') + '.', m: 2, a: num(s) + ' m' }
      ] };
    } },
    { d: [2], f: function () { // vertical projection from height
      var u = ri(8, 20), h = ri(5, 40), H = u * u / (2 * G), T = (u + Math.sqrt(u * u + 2 * G * h)) / G, vg = Math.sqrt(u * u + 2 * G * h);
      return { stem: 'A ball is projected vertically upwards with speed ' + u + ' m s⁻¹ from a point ' + h + ' m above the ground. The ball is modelled as a particle moving freely under gravity.', parts: [
        { q: 'Find the greatest height above the ground reached by the ball.', m: 2, a: s3(H + h) + ' m' },
        { q: 'Find the time taken for the ball to reach the ground.', m: 3, a: s3(T) + ' s' },
        { q: 'Find the speed of the ball as it hits the ground.', m: 2, a: s3(vg) + ' m s⁻¹' },
        { q: 'State one limitation of the model.', m: 1, a: 'For example: it ignores air resistance.' }
      ] };
    } },
    { d: [2, 3], f: function () { // velocity-time graph
      var V = ri(8, 20), t1 = ri(4, 10), t3 = ri(4, 10), T = ri(30, 60), dist = V * (T - (t1 + t3) / 2);
      var g_ = D.lineGraph([[0, 0], [t1, V], [T - t3, V], [T, 0]], { xmax: T + 5, ymax: V + 4, xstep: 10, ystep: V > 12 ? 4 : 2, grid: true, gx: 5, gy: 2, xl: 'Time (s)', yl: 'Velocity (m/s)' });
      return { stem: 'A train accelerates uniformly from rest to ' + V + ' m s⁻¹ in ' + t1 + ' s, travels at constant speed, then decelerates uniformly to rest in ' + t3 + ' s. The whole journey takes ' + M('T') + ' s and covers ' + num(dist) + ' m. The velocity-time graph is shown.' + g_, parts: [
        { q: 'Find the value of ' + M('T') + '.', m: 3, a: M(num(dist) + ' = \\tfrac{1}{2}(T + T - ' + (t1 + t3) + ')(' + V + ') \\Rightarrow T = ' + T) },
        { q: 'Find the deceleration of the train.', m: 1, a: s3(V / t3) + ' m s⁻²' }
      ] };
    } },
    { d: [3], f: function () { // catching up
      var a = ri(1, 4), V = ri(8, 20), d = ri(0, 30), t = (V + Math.sqrt(V * V + 2 * a * d)) / a;
      return q1('A cyclist passes a point ' + M('P') + ' travelling at a constant ' + V + ' m s⁻¹. At the same moment a car starts from rest ' + (d ? d + ' m behind ' + M('P') : 'at ' + M('P')) + ' and accelerates at ' + a + ' m s⁻² in the same direction.<br>Find the time taken for the car to catch up with the cyclist, and the distance from ' + M('P') + ' at which this happens.', 6,
        M('\\tfrac{1}{2}(' + a + ')t^2 = ' + V + 't' + (d ? ' + ' + d : '') + ' \\Rightarrow t = ' + s3(t)) + ' s; distance from ' + M('P') + ' ' + M('= ' + V + 't = ' + s3(V * t)) + ' m');
    } }
  ] });

  BS.topic({ id: 'al-forces', name: 'Forces and Newton’s laws: connected particles and pulleys', video: 'A level maths connected particles pulley', gens: [
    { d: [1], f: function () { // F = ma with resistance
      var m = ri(8, 15) * 100, D_ = ri(20, 50) * 100, R = ri(5, 15) * 100, a = (D_ - R) / m, v = ri(10, 25);
      return { stem: 'A car of mass ' + m + ' kg moves along a straight horizontal road. The engine produces a driving force of ' + D_ + ' N and the total resistance to motion is ' + R + ' N.', parts: [
        { q: 'Find the acceleration of the car.', m: 2, a: s3(a) + ' m s⁻²' },
        { q: 'The car starts from rest. Find the time taken to reach ' + v + ' m s⁻¹.', m: 2, a: s3(v / a) + ' s' }
      ] };
    } },
    { d: [2], f: function () { // vector forces
      var F1 = [ri(1, 8), nz(-6, 6)], F2, m = ri(2, 5), R; do { F2 = [nz(-6, 6), ri(1, 8)]; R = [F1[0] + F2[0], F1[1] + F2[1]]; } while (!R[0] || !R[1]);
      var a = Math.hypot(R[0], R[1]) / m;
      return { stem: 'Two forces ' + M('(' + vec(F1[0], F1[1]) + ')') + ' N and ' + M('(' + vec(F2[0], F2[1]) + ')') + ' N act on a particle of mass ' + m + ' kg.', parts: [
        { q: 'Find the acceleration of the particle as a vector.', m: 2, a: M('\\mathbf{a} = ' + frac(R[0], m) + '\\mathbf{i} ' + (R[1] < 0 ? '- ' + frac(-R[1], m) : '+ ' + frac(R[1], m)) + '\\mathbf{j}') + ' m s⁻²' },
        { q: 'Find the magnitude of the acceleration.', m: 2, a: s3(a) + ' m s⁻²' }
      ] };
    } },
    { d: [2, 3], f: function () { // towing
      var m1 = ri(3, 8) * 100, m2 = ri(9, 16) * 100, R1 = ri(2, 6) * 100, R2 = ri(3, 8) * 100, a = ri(2, 8) / 10, Dv = (m1 + m2) * a + R1 + R2, T = m1 * a + R1;
      return { stem: 'A car of mass ' + m2 + ' kg tows a trailer of mass ' + m1 + ' kg along a straight horizontal road using a light inextensible tow bar. The resistances to motion of the car and trailer are ' + R2 + ' N and ' + R1 + ' N. The car accelerates at ' + a + ' m s⁻².' + towing(m1, m2), parts: [
        { q: 'Find the driving force ' + M('D') + ' produced by the engine.', m: 3, a: M('D - ' + (R1 + R2) + ' = ' + (m1 + m2) + ' \\times ' + a + ' \\Rightarrow D = ' + num(Dv)) + ' N' },
        { q: 'Find the tension in the tow bar.', m: 3, a: M('T - ' + R1 + ' = ' + m1 + ' \\times ' + a + ' \\Rightarrow T = ' + num(T)) + ' N' }
      ] };
    } },
    { d: [2, 3], f: function () { // table pulley
      var mA = ri(2, 6), mB = ri(1, 5), a = mB * G / (mA + mB), T = mA * a, h = ri(5, 15) / 10, v = Math.sqrt(2 * a * h);
      return { stem: 'Particle ' + M('A') + ' of mass ' + mA + ' kg rests on a smooth horizontal table. It is attached by a light inextensible string, passing over a smooth pulley ' + M('P') + ' at the edge of the table, to particle ' + M('B') + ' of mass ' + mB + ' kg, which hangs freely ' + h + ' m above the floor. The system is released from rest.' + pulleyTable(mA, mB), parts: [
        { q: 'Find the acceleration of the system.', m: 3, a: s3(a) + ' m s⁻²' },
        { q: 'Find the tension in the string.', m: 2, a: s3(T) + ' N' },
        { q: 'Find the speed of ' + M('B') + ' as it hits the floor.', m: 2, a: s3(v) + ' m s⁻¹' }
      ] };
    } },
    { d: [2, 3], f: function () { // Atwood
      var m1 = ri(3, 8), m2 = ri(1, m1 - 1), a = (m1 - m2) * G / (m1 + m2), T = m2 * (G + a);
      return { stem: 'Two particles ' + M('A') + ' and ' + M('B') + ', of masses ' + m1 + ' kg and ' + m2 + ' kg, are connected by a light inextensible string passing over a smooth fixed pulley. The particles hang with the string taut and are released from rest.' + atwood(m1, m2), parts: [
        { q: 'Find the acceleration of the particles.', m: 3, a: s3(a) + ' m s⁻²' },
        { q: 'Find the tension in the string.', m: 2, a: s3(T) + ' N' },
        { q: 'Find the force exerted on the pulley by the string.', m: 1, a: s3(2 * T) + ' N' }
      ] };
    } },
    { d: [1, 2], f: function () { // lift
      var m = ri(50, 90), a = ri(1, 15) / 10, up = Math.random() < 0.5, R = m * (G + (up ? a : -a));
      return q1('A person of mass ' + m + ' kg stands in a lift. The lift is ' + (up ? 'accelerating upwards' : 'moving upwards and decelerating') + ' at ' + a + ' m s⁻². Find the reaction force between the person and the floor of the lift.', 3,
        M('R - ' + m + 'g = ' + m + ' \\times ' + (up ? '' : '(-') + a + (up ? '' : ')') + ' \\Rightarrow R = ' + s3(R)) + ' N');
    } }
  ] });

  BS.topic({ id: 'al-variable-acc', name: 'Variable acceleration (calculus in kinematics)', video: 'A level maths variable acceleration calculus', gens: from('ib-kinematics', [0, 1]).concat([
    { d: [2], f: function () { // v(t), at rest, distance
      var p = ri(1, 3), q = p + ri(1, 4), k = pick([1, 2]); // v = k(t - p)(t - q) for 0 <= t <= q + 1
      var cf = [k, -k * (p + q), k * p * q], S = function (t) { return k * (t * t * t / 3 - (p + q) * t * t / 2 + p * q * t); };
      var dist = Math.abs(S(p) - S(0)) + Math.abs(S(q) - S(p));
      return { stem: 'A particle moves along a straight line. Its velocity at time ' + M('t') + ' seconds is ' + M('v = ' + poly(cf, 't')) + ' m s⁻¹.', parts: [
        { q: 'Find the times when the particle is instantaneously at rest.', m: 2, a: M('t = ' + p + ',\\ t = ' + q) },
        { q: 'Find the acceleration when ' + M('t = ' + (q + 1)) + '.', m: 2, a: num(2 * k * (q + 1) - k * (p + q)) + ' m s⁻²' },
        { q: 'Find the total distance travelled in the first ' + q + ' seconds.', m: 4, a: s3(dist) + ' m' }
      ] };
    } },
    { d: [2, 3], f: function () { // a(t) integrate twice
      var a1 = ri(1, 4) * 2, b1 = nz(-6, 6), u = ri(0, 8), T = ri(2, 5);
      var v = function (t) { return a1 / 2 * t * t + b1 * t + u; }, s = function (t) { return a1 / 6 * t * t * t + b1 / 2 * t * t + u * t; };
      return { stem: 'A particle moves in a straight line from ' + M('O') + '. Its acceleration at time ' + M('t') + ' s is ' + M('a = ' + poly([a1, b1], 't')) + ' m s⁻². When ' + M('t = 0') + ', the velocity is ' + u + ' m s⁻¹.', parts: [
        { q: 'Find an expression for the velocity at time ' + M('t') + '.', m: 3, a: M('v = ' + poly([a1 / 2, b1, u], 't')) },
        { q: 'Find the displacement from ' + M('O') + ' when ' + M('t = ' + T) + '.', m: 3, a: s3(s(T)) + ' m' }
      ] };
    } }
  ]) });
})(typeof window !== 'undefined' ? window : globalThis);
