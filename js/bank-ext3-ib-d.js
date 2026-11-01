/* Byte Size Classroom — deeper extension questions (set 3, IB Applications and Interpretation part d): descriptive statistics, regression, probability, discrete distributions, normal distribution, hypothesis tests. Shared between SL and HL. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function sum(a) { return a.reduce(function (p, q) { return p + q; }, 0); }
  function C(n, r) { if (r < 0 || r > n) return 0; var v = 1; for (var i = 1; i <= r; i++) v = v * (n - r + i) / i; return Math.round(v); }
  function pmf(n, p, k) { return C(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k); }
  function cdf(n, p, k) { var s = 0; for (var i = 0; i <= k; i++) s += pmf(n, p, i); return s; }
  function Phi(z) { var t = 1 / (1 + 0.2316419 * Math.abs(z)), d = 0.3989422804014327 * Math.exp(-z * z / 2); var p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429)))); return z >= 0 ? 1 - p : p; }
  function invPhi(p) { var lo = -8, hi = 8; for (var i = 0; i < 80; i++) { var m = (lo + hi) / 2; if (Phi(m) < p) lo = m; else hi = m; } return lo; }
  var CHI = { 1: 3.841, 2: 5.991, 3: 7.815, 4: 9.488, 5: 11.070 };
  function lsq(x, y) { var n = x.length, mx = sum(x) / n, my = sum(y) / n, sxy = 0, sxx = 0, syy = 0; for (var i = 0; i < n; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) * (x[i] - mx); syy += (y[i] - my) * (y[i] - my); } var b = sxy / sxx; return { a: my - b * mx, b: b, r: sxy / Math.sqrt(sxx * syy) }; }
  function rank(a) { var s = a.slice().sort(function (p, q) { return q - p; }); return a.map(function (v) { var f = s.indexOf(v), l = s.lastIndexOf(v); return (f + l) / 2 + 1; }); }

  X(['sl-descriptive', 'ib-descriptive'], [
    function () {
      var mids = [5, 15, 25, 35, 45], f = mids.map(function () { return ri(3, 15); }), n = sum(f);
      var mean = sum(mids.map(function (m, i) { return m * f[i]; })) / n, sd = Math.sqrt(sum(mids.map(function (m, i) { return m * m * f[i]; })) / n - mean * mean);
      return Q('Times (minutes): 0–10: ' + f[0] + ', 10–20: ' + f[1] + ', 20–30: ' + f[2] + ', 30–40: ' + f[3] + ', 40–50: ' + f[4] + '.', [
        ['Use technology to estimate the mean and standard deviation.', 2, sf3(mean) + ' and ' + sf3(sd)],
        ['Explain why these are estimates.', 1, 'Midpoints are used for each class'],
        ['Find the modal class and the class containing the median.', 2, (function () { var mi = f.indexOf(Math.max.apply(null, f)); var cf = 0, k = 0; while (cf + f[k] < n / 2) { cf += f[k]; k++; } return (mi * 10) + '–' + (mi * 10 + 10) + '; ' + (k * 10) + '–' + (k * 10 + 10); })()]
      ]);
    },
    function () {
      var q1 = ri(20, 30), q2 = q1 + ri(3, 8), q3 = q2 + ri(3, 8), iqr = q3 - q1, mx = q3 + Math.round(iqr * pick([1, 2])), mn = q1 - ri(2, 8);
      return Q('A data set has minimum ' + mn + ', ' + M('Q_1 = ' + q1) + ', median ' + q2 + ', ' + M('Q_3 = ' + q3) + ', maximum ' + mx + '.', [
        ['Find the boundaries for outliers.', 2, (q1 - 1.5 * iqr) + ' and ' + (q3 + 1.5 * iqr)],
        ['Is the maximum an outlier?', 1, mx > q3 + 1.5 * iqr ? 'Yes' : 'No'],
        ['Describe the shape of the distribution.', 1, (q3 - q2) > (q2 - q1) ? 'Positively skewed' : (q3 - q2) < (q2 - q1) ? 'Negatively skewed' : 'Symmetric']
      ]);
    },
    function () {
      var m = ri(20, 50), s = ri(3, 8), a = pick([2, 3]), b = ri(5, 20);
      return Q('A data set has mean ' + m + ' and standard deviation ' + s + '. Each value is multiplied by ' + a + ' and then ' + b + ' is added.', [
        ['Find the new mean and standard deviation.', 2, (a * m + b) + ' and ' + a * s],
        ['Find the new variance.', 1, a * a * s * s],
        ['Explain why adding ' + b + ' does not change the spread.', 1, 'Every value moves by the same amount']
      ]);
    },
    function () {
      var n1 = ri(10, 30), n2 = ri(10, 30), m1 = ri(40, 70), m2 = ri(40, 70);
      return Q('Class A (' + n1 + ' students) has mean ' + m1 + '; class B (' + n2 + ' students) has mean ' + m2 + '.', [
        ['Find the combined mean.', 2, sf3((n1 * m1 + n2 * m2) / (n1 + n2))],
        ['Explain why it is closer to the mean of the larger class.', 1, 'The larger class has more weight'],
        ['A student with score ' + (m1 + 10) + ' moves from A to B. Do both means change? In which direction?', 2, 'A’s mean falls (if ' + (m1 + 10) + ' > ' + m1 + '); B’s ' + (m1 + 10 > m2 ? 'rises' : 'falls')]
      ]);
    },
    function () {
      return Q('Sampling methods.', [
        ['A researcher picks every 10th name from a list. Name the method and one weakness.', 2, 'Systematic; a pattern in the list could bias it'],
        ['A researcher divides a school by year group and samples each in proportion. Name the method.', 1, 'Stratified'],
        ['Explain the difference between quota and stratified sampling.', 1, 'Quota sampling does not choose randomly within each group']
      ]);
    },
    function () {
      var n = pick([80, 100, 120]);
      return Q('A cumulative frequency curve is drawn for ' + n + ' values.', [
        ['Which cumulative frequencies give the median and quartiles?', 1, n / 2 + ', ' + n / 4 + ', ' + 3 * n / 4],
        ['How would you estimate the number of values above a certain point?', 1, 'Read the cumulative frequency at that point and subtract from ' + n],
        ['Why is the curve always increasing?', 1, 'Frequencies are added cumulatively']
      ]);
    },
    function () {
      var d = [ri(10, 20), ri(10, 20), ri(20, 30), ri(20, 30), ri(30, 40), ri(30, 40), ri(40, 50)].sort(function (p, q) { return p - q; });
      var mean = sum(d) / 7, sd = Math.sqrt(sum(d.map(function (x) { return x * x; })) / 7 - mean * mean);
      return Q('Data: ' + d.join(', ') + '.', [
        ['Use technology to find the mean, median and standard deviation.', 2, sf3(mean) + ', ' + d[3] + ', ' + sf3(sd)],
        ['A value of 100 is added. Which measures change most?', 2, 'The mean and standard deviation; the median changes little'],
        ['Which measure of centre would you report after adding 100? Why?', 1, 'The median: it is resistant to outliers']
      ]);
    },
    function () {
      return Q('Discrete and continuous data.', [
        ['Classify: number of siblings; height; shoe size; time to run 100 m.', 2, 'Discrete, continuous, discrete, continuous'],
        ['Explain why age is often treated as discrete although it is continuous.', 1, 'It is usually recorded in whole years'],
        ['Which diagrams suit continuous data?', 1, 'Histograms, box plots, cumulative frequency curves']
      ]);
    },
    function () {
      var a = [ri(40, 50), 0, 0, 0, 0]; for (var i = 1; i < 5; i++) a[i] = a[i - 1] + ri(3, 8);
      var b = [ri(40, 50), 0, 0, 0, 0]; for (var j = 1; j < 5; j++) b[j] = b[j - 1] + ri(2, 10);
      return Q('Box plots summarise two groups. A: ' + a.join(', ') + '. B: ' + b.join(', ') + ' (min, ' + M('Q_1') + ', median, ' + M('Q_3') + ', max).', [
        ['Compare the medians and IQRs.', 2, 'Medians ' + a[2] + ' and ' + b[2] + '; IQRs ' + (a[3] - a[1]) + ' and ' + (b[3] - b[1])],
        ['What proportion of group A scored above ' + a[2] + '?', 1, '50%'],
        ['Give one advantage of a box plot over a histogram.', 1, 'Easy comparison of medians and spread; shows outliers']
      ]);
    },
    function () {
      var n = ri(10, 20), m = ri(30, 60), s = ri(3, 8);
      return Q(n + ' values have mean ' + m + ' and standard deviation ' + s + '.', [
        ['Find ' + M('\\sum x') + ' and ' + M('\\sum x^2') + '.', 2, n * m + ' and ' + n * (s * s + m * m)],
        ['A new value ' + m + ' is added. Find the new standard deviation.', 2, sf3(Math.sqrt(n * s * s / (n + 1)))],
        ['Explain why it decreases.', 1, 'The new value adds no deviation but increases ' + M('n')]
      ]);
    }
  ]);

  X(['sl-regression', 'ib-regression'], [
    function () {
      var a = ri(5, 20), b = pick([1.5, 2, 2.5, 3]);
      var x = [1, 2, 3, 4, 5, 6], y = x.map(function (v) { return +(a + b * v + pick([-1, -0.5, 0, 0.5, 1])).toFixed(1); });
      var L = lsq(x, y);
      return Q('Data: ' + M('x = ' + x.join(', ')) + '; ' + M('y = ' + y.join(', ')) + '.', [
        ['Use technology to find the regression line of ' + M('y') + ' on ' + M('x') + ' and ' + M('r') + '.', 2, M('y = ' + sf3(L.b) + 'x' + (Math.abs(L.a) < 1e-9 ? '' : L.a < 0 ? ' - ' + sf3(-L.a) : ' + ' + sf3(L.a))) + ', ' + M('r = ' + L.r.toFixed(3))],
        ['Predict ' + M('y') + ' for ' + M('x = 3.5') + ' and for ' + M('x = 20') + '. Comment.', 2, sf3(L.a + 3.5 * L.b) + ' (reliable); ' + sf3(L.a + 20 * L.b) + ' (extrapolation)'],
        ['Interpret the gradient.', 1, M('y') + ' increases by about ' + sf3(L.b) + ' for each unit of ' + M('x')]
      ]);
    },
    function () {
      var x = [ri(1, 20), ri(21, 40), ri(41, 60), ri(61, 80), ri(81, 99)], y = x.map(function (v) { return Math.round(Math.sqrt(v) * 10 + ri(-3, 3)); });
      var rx = rank(x), ry = rank(y), d2 = sum(rx.map(function (v, i) { return Math.pow(v - ry[i], 2); }));
      var rs = 1 - 6 * d2 / (5 * 24);
      return Q('Five students’ scores: test A ' + x.join(', ') + '; test B ' + y.join(', ') + '.', [
        ['Rank each set and find Spearman’s ' + M('r_s') + '.', 3, M('r_s = ' + sf3(rs))],
        ['Interpret the value.', 1, rs > 0.7 ? 'Strong agreement in rankings' : rs > 0.3 ? 'Some agreement' : 'Little agreement'],
        ['Why might Spearman’s be preferred to Pearson’s here?', 1, 'The relationship may be monotonic but not linear']
      ]);
    },
    function () {
      var r = pick([0.95, 0.72, -0.85, 0.12, -0.4]);
      return Q('A data set has ' + M('r = ' + r) + '.', [
        ['Describe the correlation.', 1, (Math.abs(r) > 0.75 ? 'Strong ' : Math.abs(r) > 0.5 ? 'Moderate ' : 'Weak ') + (r > 0 ? 'positive' : 'negative')],
        ['Is it appropriate to use the regression line for prediction?', 1, Math.abs(r) > 0.75 ? 'Yes, within the data range' : 'Not reliably'],
        ['State what ' + M('r = 0') + ' would and would not tell you.', 1, 'No linear correlation; there could still be a non-linear relationship']
      ]);
    },
    function () {
      var x = [1, 2, 3, 4, 5], y = [ri(2, 4), ri(4, 6), ri(6, 8), ri(8, 10), ri(10, 12)];
      var L = lsq(x, y), res = y.map(function (v, i) { return v - (L.a + L.b * x[i]); });
      return Q('Data ' + x.map(function (v, i) { return M('(' + v + ', ' + y[i] + ')'); }).join(', ') + '.', [
        ['Find the regression line.', 1, M('y = ' + sf3(L.b) + 'x' + (Math.abs(L.a) < 1e-9 ? '' : L.a < 0 ? ' - ' + sf3(-L.a) : ' + ' + sf3(L.a)))],
        ['Find the residual for each point.', 2, res.map(sf3).join(', ')],
        ['Show that the residuals sum to zero.', 1, 'The least-squares line passes through the mean point']
      ]);
    },
    function () {
      return Q('Regression of ' + M('y') + ' on ' + M('x') + ' vs ' + M('x') + ' on ' + M('y') + '.', [
        ['Which line should be used to predict ' + M('y') + ' from ' + M('x') + '?', 1, M('y') + ' on ' + M('x')],
        ['When are the two lines the same?', 1, 'When ' + M('|r| = 1')],
        ['Explain why ' + M('x') + ' should be the independent variable.', 1, 'It is controlled or measured without much error']
      ]);
    },
    function () {
      var x = [1, 2, 3, 4, 5, 6], y = x.map(function (v) { return 2 * v + 1 + pick([-0.5, 0, 0.5]); });
      var L1 = lsq(x, y), x2 = x.concat([7]), y2 = y.concat([2]), L2 = lsq(x2, y2);
      return Q('A data set ' + x.map(function (v, i) { return M('(' + v + ', ' + y[i] + ')'); }).join(', ') + ' has an extra point ' + M('(7, 2)') + ' added.', [
        ['Find ' + M('r') + ' before and after adding the point.', 2, L1.r.toFixed(3) + ' and ' + L2.r.toFixed(3)],
        ['Explain the effect of the outlier.', 1, 'It greatly weakens the correlation and changes the line'],
        ['What should you do with such a point?', 1, 'Investigate it; remove it only if it is an error']
      ]);
    },
    function () {
      var r = pick([0.8, 0.9, 0.6]);
      return Q('The coefficient of determination is ' + M('r^2') + '.', [
        ['Find ' + M('r^2') + ' for ' + M('r = ' + r) + ' and interpret.', 2, sf3(r * r) + ': about ' + Math.round(r * r * 100) + '% of the variation in ' + M('y') + ' is explained by the linear model'],
        ['Explain why ' + M('r^2') + ' cannot show the direction of correlation.', 1, 'Squaring removes the sign']
      ]);
    },
    function () {
      return Q('A study finds a strong positive correlation between shoe size and reading ability in children aged 5–11.', [
        ['Does larger feet cause better reading?', 1, 'No'],
        ['Identify the confounding variable.', 1, 'Age'],
        ['How could the study be redesigned?', 1, 'Compare children of the same age']
      ]);
    },
    function () {
      var x = [ri(1, 3), ri(4, 6), ri(7, 9), ri(10, 12), ri(13, 15)], y = x.map(function (v) { return Math.round(100 * Math.exp(-0.2 * v)); });
      var rx = rank(x), ry = rank(y), d2 = sum(rx.map(function (v, i) { return Math.pow(v - ry[i], 2); }));
      return Q('Data: ' + M('x = ' + x.join(', ')) + ', ' + M('y = ' + y.join(', ')) + '.', [
        ['Find Spearman’s ' + M('r_s') + '.', 2, sf3(1 - 6 * d2 / 120)],
        ['Find Pearson’s ' + M('r') + ' using technology.', 1, lsq(x, y).r.toFixed(3)],
        ['Explain why ' + M('|r_s| > |r|') + ' here.', 1, 'The relationship is perfectly monotonic but curved']
      ]);
    },
    function () {
      var a = ri(5, 20), b = pick([0.5, 1.5, 2]);
      return Q('The regression line is ' + M('y = ' + b + 'x + ' + a) + ' with ' + M('r = 0.92') + ', from data with ' + M('10 \\le x \\le 50') + '.', [
        ['Predict ' + M('y') + ' at ' + M('x = 30') + '.', 1, sf3(a + 30 * b)],
        ['Can the line predict ' + M('x') + ' when ' + M('y = 40') + '? Explain.', 1, 'Not reliably: use the regression of ' + M('x') + ' on ' + M('y')],
        ['Why should you not predict at ' + M('x = 100') + '?', 1, 'Extrapolation beyond the data']
      ]);
    }
  ]);

  X(['sl-probability', 'ib-probability'], [
    function () {
      var a = ri(3, 6) / 10, b = ri(2, 5) / 10, ab = ri(1, 2) / 10;
      return Q(M('P(A) = ' + a + ',\\ P(B) = ' + b + ',\\ P(A \\cap B) = ' + ab) + '.', [
        ['Find ' + M('P(A \\cup B)') + ' and ' + M('P(A’ \\cap B’)') + '.', 2, sf3(a + b - ab) + ' and ' + sf3(1 - a - b + ab)],
        ['Find ' + M('P(A \\mid B)') + '.', 1, sf3(ab / b)],
        ['Are ' + M('A') + ' and ' + M('B') + ' independent?', 1, Math.abs(a * b - ab) < 1e-9 ? 'Yes' : 'No: ' + M('P(A)P(B) = ' + sf3(a * b))]
      ]);
    },
    function () {
      var r = ri(3, 7), b = ri(3, 7), n = r + b;
      return Q('A bag has ' + r + ' red and ' + b + ' blue marbles. Two are drawn without replacement.', [
        ['Draw a tree diagram and find ' + M('P(\\text{both red})') + '.', 2, M(F(r * (r - 1), n * (n - 1)))],
        ['Find ' + M('P(\\text{one of each})') + '.', 2, M(F(2 * r * b, n * (n - 1)))],
        ['Given the second is red, find the probability the first was red.', 2, M(F(r - 1, n - 1))]
      ]);
    },
    function () {
      var p = ri(1, 3) / 10, s = ri(85, 99) / 100, f = ri(2, 10) / 100;
      var pos = p * s + (1 - p) * f;
      return Q('A disease affects ' + p * 100 + '% of a population. A test is positive for ' + s * 100 + '% of those with it, and ' + f * 100 + '% of those without it.', [
        ['Find the probability of a positive test.', 2, sf3(pos)],
        ['Find the probability someone with a positive test has the disease.', 2, sf3(p * s / pos)],
        ['Explain why this is lower than ' + s * 100 + '%.', 1, 'Most people tested do not have the disease, so false positives are common']
      ]);
    },
    function () {
      var t = ri(5, 9);
      var c = 0, ge = 0; for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) { if (i + j === t) c++; if (i + j >= t) ge++; }
      return Q('Two dice are rolled and the scores added.', [
        ['Draw a sample space and find ' + M('P(\\text{sum} = ' + t + ')') + '.', 2, M(F(c, 36))],
        ['Find ' + M('P(\\text{sum} \\ge ' + t + ')') + '.', 1, M(F(ge, 36))],
        ['In 180 rolls, how many sums of ' + t + ' would you expect?', 1, 180 * c / 36]
      ]);
    },
    function () {
      var a = ri(20, 40), b = ri(20, 40), c = ri(10, 30), d = ri(10, 30), n = a + b + c + d;
      return Q('A survey: ' + a + ' boys and ' + c + ' girls play sport; ' + b + ' boys and ' + d + ' girls do not.', [
        ['Find ' + M('P(\\text{sport} \\mid \\text{girl})') + '.', 1, M(F(c, c + d))],
        ['Find ' + M('P(\\text{girl} \\mid \\text{sport})') + '.', 1, M(F(c, a + c))],
        ['Is playing sport independent of gender? Justify.', 2, (a * d === b * c ? 'Yes' : 'No') + ': compare ' + M(F(a, a + b)) + ' and ' + M(F(c, c + d))]
      ]);
    },
    function () {
      var p = pick([0.1, 0.2, 0.3]);
      return Q('A machine produces faulty items with probability ' + p + ', independently.', [
        ['Find the probability of at least one faulty item in 5.', 2, sf3(1 - Math.pow(1 - p, 5))],
        ['Find the least ' + M('n') + ' so that ' + M('P(\\text{at least one faulty}) > 0.95') + '.', 2, Math.ceil(Math.log(0.05) / Math.log(1 - p))],
        ['Explain the method of using the complement.', 1, '“At least one” is 1 minus “none”']
      ]);
    },
    function () {
      var w = ri(1, 5), cost = ri(1, 3);
      var E = w / 6 * 1 + 0;
      return Q('A game costs $' + cost + '. Roll a die: a 6 wins $' + (cost * 4) + ', a 5 wins $' + cost + ', otherwise nothing.', [
        ['Find the expected winnings per game.', 2, '$' + sf3((4 * cost + cost) / 6)],
        ['Find the expected profit for the player.', 1, '$' + sf3((5 * cost) / 6 - cost)],
        ['Is the game fair? Explain.', 1, 'No: the expected profit is not zero']
      ]);
    },
    function () {
      var a = ri(20, 40), b = ri(15, 30), c = ri(5, 12), n = a + b - c + ri(5, 15);
      return Q('In a class of ' + n + ', ' + a + ' study French, ' + b + ' study Spanish and ' + c + ' study both.', [
        ['Draw a Venn diagram and find the number studying neither.', 2, n - (a + b - c)],
        ['A student studying Spanish is chosen. Find the probability they also study French.', 1, M(F(c, b))],
        ['Two students are chosen. Find the probability both study neither language.', 2, M(F((n - a - b + c) * (n - a - b + c - 1), n * (n - 1)))]
      ]);
    },
    function () {
      var p = pick([0.6, 0.7]), q = pick([0.3, 0.4]);
      return Q('If it rains, the probability a football match is cancelled is ' + p + '; otherwise ' + q / 10 + '. The probability of rain is ' + q + '.', [
        ['Find the probability the match is cancelled.', 2, sf3(q * p + (1 - q) * q / 10)],
        ['Given the match was cancelled, find the probability it rained.', 2, sf3(q * p / (q * p + (1 - q) * q / 10))]
      ]);
    },
    function () {
      return Q('Mutually exclusive and independent events.', [
        ['Give the formula for ' + M('P(A \\cup B)') + ' for mutually exclusive events.', 1, M('P(A) + P(B)')],
        ['Give the formula for ' + M('P(A \\cap B)') + ' for independent events.', 1, M('P(A)P(B)')],
        ['Explain why two events with non-zero probabilities cannot be both.', 1, 'Independence needs ' + M('P(A \\cap B) > 0') + '; exclusivity needs it to be 0']
      ]);
    }
  ]);

  X(['sl-discrete', 'ib-discrete'], [
    function () {
      var a = ri(1, 4), b = ri(1, 4), c = ri(1, 4), d = ri(1, 4), T = a + b + c + d;
      return Q(M('P(X = x)') + ' for ' + M('x = 1, 2, 3, 4') + ' is ' + M(a + 'k, ' + b + 'k, ' + c + 'k, ' + d + 'k') + '.', [
        ['Find ' + M('k') + '.', 1, M(F(1, T))],
        ['Find ' + M('E(X)') + '.', 2, M(F(a + 2 * b + 3 * c + 4 * d, T))],
        ['Find ' + M('P(X > 2)') + '.', 1, M(F(c + d, T))]
      ]);
    },
    function () {
      var cost = ri(2, 5), p6 = cost * 3;
      return Q('A game costs $' + cost + '. A die is rolled: a six wins $' + p6 + ', otherwise nothing.', [
        ['Write the distribution of the profit ' + M('X') + '.', 2, M('X = ' + (p6 - cost)) + ' with probability ' + M('\\frac{1}{6}') + '; ' + M('X = -' + cost) + ' with probability ' + M('\\frac{5}{6}')],
        ['Find ' + M('E(X)') + '.', 1, sf3((p6 - cost) / 6 - 5 * cost / 6)],
        ['What prize makes the game fair?', 1, '$' + 6 * cost]
      ]);
    },
    function () {
      var n = pick([10, 12, 15, 20]), p = pick([0.2, 0.3, 0.4]), k = Math.round(n * p);
      return Q(M('X \\sim B(' + n + ', ' + p + ')') + '.', [
        ['Find ' + M('P(X = ' + k + ')') + ' and ' + M('P(X \\le ' + k + ')') + '.', 2, pmf(n, p, k).toFixed(4) + ' and ' + cdf(n, p, k).toFixed(4)],
        ['Find ' + M('E(X)') + ' and ' + M('\\text{Var}(X)') + '.', 1, sf3(n * p) + ' and ' + sf3(n * p * (1 - p))],
        ['Find ' + M('P(X > E(X))') + '.', 1, (1 - cdf(n, p, Math.floor(n * p))).toFixed(4)]
      ]);
    },
    function () {
      var p = pick([0.1, 0.2, 0.05]), t = 0.9;
      var n = Math.ceil(Math.log(1 - t) / Math.log(1 - p));
      return Q('Each ticket wins with probability ' + p + '.', [
        ['Find the probability of no win in 10 tickets.', 1, Math.pow(1 - p, 10).toFixed(4)],
        ['Find the least number of tickets for ' + M('P(\\text{at least one win}) > ' + t) + '.', 2, n],
        ['Find the expected number of wins in ' + n + ' tickets.', 1, sf3(n * p)]
      ]);
    },
    function () {
      var n = ri(8, 15), p = pick([0.3, 0.4]);
      var probs = []; for (var k = 0; k <= n; k++) probs.push(pmf(n, p, k));
      var mode = probs.indexOf(Math.max.apply(null, probs));
      return Q(M('X \\sim B(' + n + ', ' + p + ')') + '.', [
        ['Use technology to find the most likely value of ' + M('X') + '.', 2, mode],
        ['Compare with ' + M('E(X)') + '.', 1, sf3(n * p)],
        ['Find ' + M('P(' + (mode - 1) + ' \\le X \\le ' + (mode + 1) + ')') + '.', 1, (probs[mode - 1] + probs[mode] + probs[mode + 1]).toFixed(4)]
      ]);
    },
    function () {
      var x = [0, 1, 2, 3], p = [0.1, 0.3, 0.4, 0.2];
      var E = sum(x.map(function (v, i) { return v * p[i]; })), E2 = sum(x.map(function (v, i) { return v * v * p[i]; }));
      return Q('The number of goals ' + M('X') + ' has ' + M('P(X = 0, 1, 2, 3) = 0.1, 0.3, 0.4, 0.2') + '.', [
        ['Find ' + M('E(X)') + '.', 1, sf3(E)],
        ['Find ' + M('\\text{Var}(X)') + '.', 2, sf3(E2 - E * E)],
        ['A team earns 3 points per goal plus 2 for turning up. Find the expected points.', 1, sf3(3 * E + 2)]
      ]);
    },
    function () {
      var n = pick([20, 30, 50]), p = pick([0.5, 0.1]);
      return Q('A multiple-choice quiz has ' + n + ' questions with ' + (p === 0.5 ? 2 : 10) + ' options each. A student guesses.', [
        ['Write the distribution of the number correct.', 1, M('B(' + n + ', ' + p + ')')],
        ['Find the probability of passing (at least half correct).', 2, (1 - cdf(n, p, Math.ceil(n / 2) - 1)).toFixed(4)],
        ['Find the expected score.', 1, n * p]
      ]);
    },
    function () {
      var p = pick([0.3, 0.4]);
      var day = 1 - cdf(10, p, 4);
      return Q('Each day ' + M('X \\sim B(10, ' + p + ')') + ' buses are late. A day is bad if more than 4 are late.', [
        ['Find the probability of a bad day.', 2, day.toFixed(4)],
        ['Find the probability of exactly 2 bad days in a week of 5 days.', 2, pmf(5, day, 2).toFixed(4)],
        ['State an assumption.', 1, 'Days are independent']
      ]);
    },
    function () {
      return Q('Conditions for a binomial model.', [
        ['State the four conditions.', 2, 'Fixed ' + M('n') + ', two outcomes, constant ' + M('p') + ', independent trials'],
        ['Explain why drawing 5 cards without replacement is not binomial.', 1, 'The probability changes after each draw'],
        ['When is it approximately binomial anyway?', 1, 'When the population is large compared with the sample']
      ]);
    },
    function () {
      var n = pick([10, 20]), p = pick([0.25, 0.5]);
      return Q(M('X \\sim B(' + n + ', ' + p + ')') + '.', [
        ['Find the standard deviation.', 1, sf3(Math.sqrt(n * p * (1 - p)))],
        ['Find ' + M('P(|X - E(X)| \\le \\sigma)') + '.', 3, (function () { var m = n * p, s = Math.sqrt(n * p * (1 - p)); var t = 0; for (var k = 0; k <= n; k++) if (Math.abs(k - m) <= s) t += pmf(n, p, k); return t.toFixed(4); })()]
      ]);
    }
  ]);

  X(['sl-normal', 'ib-normal'], [
    function () {
      var mu = ri(50, 100), s = ri(5, 15), a = mu + ri(3, 15), b = mu - ri(3, 15);
      return Q(M('X \\sim N(' + mu + ', ' + s * s + ')') + '.', [
        ['Find ' + M('P(X > ' + a + ')') + '.', 1, (1 - Phi((a - mu) / s)).toFixed(4)],
        ['Find ' + M('P(' + b + ' < X < ' + a + ')') + '.', 1, (Phi((a - mu) / s) - Phi((b - mu) / s)).toFixed(4)],
        ['In a sample of 200, how many would you expect above ' + a + '?', 1, Math.round(200 * (1 - Phi((a - mu) / s)))]
      ]);
    },
    function () {
      var mu = ri(150, 180), s = ri(5, 10), p = pick([0.1, 0.05, 0.25]);
      return Q('Heights are ' + M('N(' + mu + ', ' + s * s + ')') + ' cm.', [
        ['Find the height exceeded by ' + p * 100 + '% of people.', 2, sf3(mu + invPhi(1 - p) * s) + ' cm'],
        ['Find the interquartile range.', 2, sf3(2 * invPhi(0.75) * s) + ' cm'],
        ['Find the probability a person is within 1 sd of the mean.', 1, (Phi(1) - Phi(-1)).toFixed(4)]
      ]);
    },
    function () {
      var mu = ri(400, 500), p = pick([0.05, 0.1, 0.02]), a = mu - ri(5, 20);
      var s = (mu - a) / invPhi(1 - p);
      return Q('Bags of flour have mean mass ' + mu + ' g. ' + p * 100 + '% weigh less than ' + a + ' g.', [
        ['Find the standard deviation.', 2, sf3(s) + ' g'],
        ['Find the probability a bag weighs more than ' + (mu + 10) + ' g.', 1, (1 - Phi(10 / s)).toFixed(4)]
      ]);
    },
    function () {
      var mu = ri(40, 80), s = ri(5, 12);
      var a = Math.round(mu + invPhi(0.9) * s), b = Math.round(mu - invPhi(0.8) * s);
      return Q('For a normal variable, ' + M('P(X > ' + a + ') = 0.1') + ' and ' + M('P(X < ' + b + ') = 0.2') + '.', [
        ['Write two equations in ' + M('\\mu') + ' and ' + M('\\sigma') + '.', 2, M('\\mu + 1.282\\sigma = ' + a) + ', ' + M('\\mu - 0.842\\sigma = ' + b)],
        ['Solve them.', 2, (function () { var sg = (a - b) / (invPhi(0.9) + invPhi(0.8)); return M('\\mu = ' + sf3(a - invPhi(0.9) * sg) + ',\\ \\sigma = ' + sf3(sg)); })()]
      ]);
    },
    function () {
      var mu = ri(20, 40), s = ri(2, 6);
      var p = 1 - Phi(1.5);
      return Q('Battery lives are ' + M('N(' + mu + ', ' + s * s + ')') + ' hours. Three batteries are chosen.', [
        ['Find the probability one battery lasts more than ' + (mu + 1.5 * s) + ' hours.', 1, p.toFixed(4)],
        ['Find the probability all three do.', 1, Math.pow(p, 3).toExponential(2)],
        ['Find the probability at least one does.', 1, (1 - Math.pow(1 - p, 3)).toFixed(4)]
      ]);
    },
    function () {
      var mu = ri(60, 75), s = ri(8, 12), pass = pick([0.7, 0.8]);
      return Q('Exam marks are ' + M('N(' + mu + ', ' + s * s + ')') + '.', [
        ['The top 10% get a grade A. Find the lowest A mark.', 2, sf3(mu + invPhi(0.9) * s)],
        ['If ' + pass * 100 + '% should pass, find the pass mark.', 2, sf3(mu + invPhi(1 - pass) * s)],
        ['Why is a normal model reasonable for marks only approximately?', 1, 'Marks are discrete and bounded']
      ]);
    },
    function () {
      var k = pick([1, 2, 3]);
      return Q('For any normal distribution:', [
        ['Find ' + M('P(\\mu - ' + (k === 1 ? '' : k) + '\\sigma < X < \\mu + ' + (k === 1 ? '' : k) + '\\sigma)') + '.', 1, (Phi(k) - Phi(-k)).toFixed(4)],
        ['Explain why it does not depend on ' + M('\\mu') + ' and ' + M('\\sigma') + '.', 1, 'Standardising gives the same ' + M('z') + '-values'],
        ['Use this to judge whether a value ' + (k + 1) + ' sd above the mean is unusual.', 1, 'Yes: very few values lie that far out']
      ]);
    },
    function () {
      var mu = ri(500, 1000), s = ri(20, 50), lo = mu - 2 * s;
      return Q('Bottles are filled with ' + M('N(' + mu + ', ' + s * s + ')') + ' ml. Bottles under ' + lo + ' ml are rejected.', [
        ['Find the proportion rejected.', 1, Phi(-2).toFixed(4)],
        ['Of 5000 bottles, how many are rejected?', 1, Math.round(5000 * Phi(-2))],
        ['The mean is raised to ' + (mu + s) + ' ml. Find the new proportion rejected.', 1, Phi(-3).toFixed(4)]
      ]);
    },
    function () {
      var mu = ri(30, 50), s = ri(4, 8), x = mu + ri(5, 12);
      return Q('Two students sit different tests. Test 1 is ' + M('N(' + mu + ', ' + s * s + ')') + '; test 2 is ' + M('N(' + (mu + 10) + ', ' + (s + 2) * (s + 2) + ')') + '. Student A scores ' + x + ' on test 1; B scores ' + (x + 10) + ' on test 2.', [
        ['Find each standardised score.', 2, sf3((x - mu) / s) + ' and ' + sf3((x - mu) / (s + 2))],
        ['Who did better relative to their group?', 1, 'Student A']
      ]);
    },
    function () {
      return Q('Checking a normal model.', [
        ['A data set has mean 50, median 42 and many low values. Is a normal model suitable?', 1, 'No: it is skewed'],
        ['What features of a histogram suggest a normal model?', 1, 'Symmetric, single peak, bell-shaped'],
        ['Explain why a normal model gives a small probability to impossible negative values for heights.', 1, 'The normal distribution extends to infinity in both directions']
      ]);
    }
  ]);

  X(['sl-tests', 'ib-hypothesis'], [
    function () {
      var a = ri(20, 40), b = ri(20, 40), c = ri(20, 40), d = ri(20, 40), n = a + b + c + d;
      var E = [[(a + b) * (a + c) / n, (a + b) * (b + d) / n], [(c + d) * (a + c) / n, (c + d) * (b + d) / n]];
      var O = [[a, b], [c, d]], chi = 0; for (var i = 0; i < 2; i++) for (var j = 0; j < 2; j++) chi += Math.pow(O[i][j] - E[i][j], 2) / E[i][j];
      return Q('A survey of ' + n + ' people: male—yes ' + a + ', no ' + b + '; female—yes ' + c + ', no ' + d + '. Test at 5% whether answer is independent of gender.', [
        ['State the hypotheses and degrees of freedom.', 2, M('H_0') + ': independent; 1 degree of freedom'],
        ['Find the expected frequency for male–yes.', 1, sf3(E[0][0])],
        ['Find ' + M('\\chi^2') + ' and conclude (critical value 3.841).', 3, M('\\chi^2 = ' + (chi < 0.001 ? '0.000' : sf3(chi))) + '; ' + (chi > 3.841 ? 'reject ' + M('H_0') + ': not independent' : 'do not reject ' + M('H_0'))]
      ]);
    },
    function () {
      var n = 120, o = [ri(12, 28), ri(12, 28), ri(12, 28), ri(12, 28), ri(12, 28)]; o.push(n - sum(o));
      if (o[5] < 5) { o[0] -= 10; o[5] += 10; }
      var chi = sum(o.map(function (v) { return Math.pow(v - 20, 2) / 20; }));
      return Q('A die is rolled 120 times: ' + o.join(', ') + ' for faces 1–6. Test at 5% whether it is fair.', [
        ['Find the expected frequencies.', 1, '20 each'],
        ['Find the ' + M('\\chi^2') + ' statistic.', 2, sf3(chi)],
        ['State the degrees of freedom and conclude (critical value 11.070).', 2, '5; ' + (chi > 11.07 ? 'reject ' + M('H_0') + ': evidence the die is biased' : 'do not reject ' + M('H_0'))]
      ]);
    },
    function () {
      return Q('Degrees of freedom in ' + M('\\chi^2') + ' tests.', [
        ['Find the degrees of freedom for a 3 × 4 contingency table.', 1, 6],
        ['Explain why expected frequencies below 5 cause problems.', 1, 'The ' + M('\\chi^2') + ' approximation becomes unreliable'],
        ['What should be done if an expected frequency is below 5?', 1, 'Combine rows or columns']
      ]);
    },
    function () {
      var pv = pick([0.002, 0.03, 0.07, 0.2]);
      return Q('A test gives a p-value of ' + pv + '.', [
        ['State the conclusion at the 5% level.', 1, pv < 0.05 ? 'Reject ' + M('H_0') : 'Do not reject ' + M('H_0')],
        ['State the conclusion at the 1% level.', 1, pv < 0.01 ? 'Reject ' + M('H_0') : 'Do not reject ' + M('H_0')],
        ['Explain what the p-value means.', 1, 'The probability, if ' + M('H_0') + ' is true, of a result at least this extreme']
      ]);
    },
    function () {
      var m1 = ri(60, 70), m2 = m1 + ri(-2, 6);
      return Q('A t-test compares the mean scores of two groups (' + m1 + ' and ' + m2 + ').', [
        ['State suitable hypotheses for a two-tailed test.', 1, M('H_0: \\mu_1 = \\mu_2,\\ H_1: \\mu_1 \\ne \\mu_2')],
        ['State an assumption of the t-test.', 1, 'Data are normally distributed (with similar variances)'],
        ['Explain why a difference of ' + Math.abs(m2 - m1) + ' may not be significant.', 1, 'It may be small compared with the variation within the groups']
      ]);
    },
    function () {
      return Q('Errors in hypothesis testing.', [
        ['Define a Type I error.', 1, 'Rejecting ' + M('H_0') + ' when it is true'],
        ['Define a Type II error.', 1, 'Not rejecting ' + M('H_0') + ' when it is false'],
        ['What is the probability of a Type I error in a 5% test?', 1, '0.05 (the significance level)']
      ]);
    },
    function () {
      var a = ri(20, 40), b = ri(30, 50), c = ri(20, 40);
      var n = a + b + c, e = n / 3, chi = (Math.pow(a - e, 2) + Math.pow(b - e, 2) + Math.pow(c - e, 2)) / e;
      return Q('Customers choose three flavours: ' + a + ', ' + b + ', ' + c + '. Test at 5% whether all flavours are equally popular.', [
        ['State the expected frequency.', 1, sf3(e)],
        ['Find ' + M('\\chi^2') + ' and conclude (critical value 5.991).', 3, sf3(chi) + '; ' + (chi > 5.991 ? 'reject ' + M('H_0') : 'do not reject ' + M('H_0'))]
      ]);
    },
    function () {
      return Q('Writing conclusions.', [
        ['A student writes “We accept ' + M('H_0') + ', so the variables are independent.” What is wrong?', 1, 'Not rejecting ' + M('H_0') + ' does not prove it'],
        ['Rewrite the conclusion correctly in context.', 1, 'There is insufficient evidence that the variables are associated'],
        ['Why must hypotheses be set before collecting data?', 1, 'To avoid choosing them to fit the results']
      ]);
    },
    function () {
      var n = 20, p = 0.3, x = ri(9, 12);
      var pv = 1 - cdf(n, p, x - 1);
      return Q('A claim is that 30% of customers buy dessert. In a sample of 20, ' + x + ' did. Test at 5% whether the proportion is higher.', [
        ['State the hypotheses.', 1, M('H_0: p = 0.3,\\ H_1: p > 0.3')],
        ['Find ' + M('P(X \\ge ' + x + ')') + ' under ' + M('H_0') + '.', 2, pv.toFixed(4)],
        ['Conclude.', 1, pv < 0.05 ? 'Reject ' + M('H_0') + ': evidence the proportion is higher' : 'Do not reject ' + M('H_0')]
      ]);
    },
    function () {
      return Q('One-tailed and two-tailed tests.', [
        ['When should a one-tailed test be used?', 1, 'When the alternative specifies a direction'],
        ['Why is it harder to reject ' + M('H_0') + ' in a two-tailed test at the same level?', 1, 'The significance level is split between two tails'],
        ['Give an example of each.', 1, 'One-tailed: “has the mean increased?”; two-tailed: “has the mean changed?”']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
