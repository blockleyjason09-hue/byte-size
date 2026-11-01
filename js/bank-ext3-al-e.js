/* Byte Size Classroom — deeper extension questions (set 3, A level Year 1 part e): correlation and regression, probability, binomial distribution, hypothesis testing. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function d4(x) { return x.toFixed(4); }
  function F(n, d) { return frac(n, d); }
  function C(n, r) { if (r < 0 || r > n) return 0; var v = 1; for (var i = 1; i <= r; i++) v = v * (n - r + i) / i; return Math.round(v); }
  function pmf(n, p, k) { return C(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k); }
  function cdf(n, p, k) { var s = 0; for (var i = 0; i <= k; i++) s += pmf(n, p, i); return s; }
  function B(n, p) { return M('\\text{B}(' + n + ', ' + p + ')'); }

  X('al-correlation', [
    function () {
      var a = ri(10, 40), b = pick([0.5, 1.2, 2.5, -0.8, 3]), lo = ri(5, 15), hi = lo + ri(15, 30);
      return Q('A regression line ' + M('y = ' + a + (b < 0 ? ' - ' + (-b) : ' + ' + b) + 'x') + ' was found from data with ' + M('x') + ' between ' + lo + ' and ' + hi + '.', [
        ['Interpret the gradient in context, if ' + M('x') + ' is hours of practice and ' + M('y') + ' is a test score.', 1, 'Each extra hour is associated with a change of ' + b + ' marks'],
        ['Predict ' + M('y') + ' for ' + M('x = ' + (lo + 5)) + ' and for ' + M('x = ' + (hi + 40)) + '. Comment on the reliability of each.', 3, sf3(a + b * (lo + 5)) + ' (reliable: interpolation); ' + sf3(a + b * (hi + 40)) + ' (unreliable: extrapolation)'],
        ['Explain why the regression of ' + M('x') + ' on ' + M('y') + ' should not be used to predict ' + M('x') + ' from this line.', 1, 'The line minimises vertical errors in ' + M('y') + '; it is designed to predict ' + M('y')]
      ]);
    },
    function () {
      var r = pick([0.92, 0.85, -0.78, -0.95, 0.15]);
      return Q('The product moment correlation coefficient for a data set is ' + r + '.', [
        ['Describe the correlation.', 1, (Math.abs(r) > 0.7 ? 'Strong ' : Math.abs(r) > 0.4 ? 'Moderate ' : 'Weak ') + (r > 0 ? 'positive' : 'negative')],
        ['An outlier far from the trend is removed. How would you expect ' + M('|r|') + ' to change?', 1, 'It would increase (closer to a straight line)'],
        ['The ' + M('x') + ' values were converted from cm to inches. What happens to ' + M('r') + '?', 1, 'Nothing: ' + M('r') + ' does not depend on units']
      ]);
    },
    function () {
      return Q('Ice-cream sales and the number of sunburn cases in a town show strong positive correlation.', [
        ['Does this mean ice cream causes sunburn? Explain.', 1, 'No: correlation does not imply causation'],
        ['Suggest a third variable that explains both.', 1, 'Sunny, hot weather'],
        ['Describe how you could test whether there is a link once this variable is controlled for.', 2, 'Compare sales and sunburn on days with similar temperature and sunshine']
      ]);
    },
    function () {
      var xb = ri(10, 30), yb = ri(40, 80), b = pick([1.5, 2, -0.5, 0.8]);
      var a = yb - b * xb;
      return Q('The regression line of ' + M('y') + ' on ' + M('x') + ' has gradient ' + b + '. The means are ' + M('\\bar{x} = ' + xb) + ' and ' + M('\\bar{y} = ' + yb) + '.', [
        ['Explain why the line passes through ' + M('(\\bar{x}, \\bar{y})') + '.', 1, 'The least-squares line always passes through the mean point'],
        ['Find the equation of the line.', 2, M('y = ' + sf3(a) + (b < 0 ? ' - ' + (-b) : ' + ' + b) + 'x')],
        ['Predict ' + M('y') + ' when ' + M('x = ' + (xb + 4)) + '.', 1, sf3(yb + 4 * b)]
      ]);
    },
    function () {
      var a = pick([0.3, 0.5, 1.2]), b = pick([0.02, 0.05, 0.1]);
      return Q('A scientist plots ' + M('\\log_{10} y') + ' against ' + M('x') + ' and finds the line ' + M('\\log_{10} y = ' + a + ' + ' + b + 'x') + '.', [
        ['Show that ' + M('y = kc^x') + ' and find ' + M('k') + ' and ' + M('c') + '.', 3, M('k = 10^{' + a + '} = ' + sf3(Math.pow(10, a)) + ',\\ c = 10^{' + b + '} = ' + sf3(Math.pow(10, b)))],
        ['Interpret ' + M('c') + ' in context.', 1, M('y') + ' is multiplied by ' + sf3(Math.pow(10, b)) + ' for each unit increase in ' + M('x')],
        ['Predict ' + M('y') + ' when ' + M('x = 10') + '.', 1, sf3(Math.pow(10, a + 10 * b))]
      ]);
    },
    function () {
      return Q('Variables: the time spent studying and the score in an exam.', [
        ['Which is the explanatory variable and which is the response?', 1, 'Time studying is explanatory; score is the response'],
        ['On which axis should each be plotted?', 1, 'Explanatory on the horizontal axis'],
        ['Why does it matter which variable is explanatory when finding a regression line?', 1, 'The line of ' + M('y') + ' on ' + M('x') + ' predicts the response from the explanatory variable']
      ]);
    },
    function () {
      var n = ri(8, 15);
      return Q('A scatter diagram of ' + n + ' points shows two clusters: one group of points with low ' + M('x') + ' and low ' + M('y') + ', and one with high ' + M('x') + ' and high ' + M('y') + ', with no correlation within either group.', [
        ['Explain why the PMCC for all the data may be strongly positive.', 1, 'The gap between the clusters creates an overall trend'],
        ['Explain why this could be misleading.', 1, 'Within each group there is no relationship'],
        ['Suggest what should be done.', 1, 'Analyse the two groups separately and investigate what distinguishes them']
      ]);
    },
    function () {
      var m = pick([0.6, 0.75, 0.9]);
      return Q('For data on car age ' + M('x') + ' (years) and value ' + M('y') + ' (£1000s), the regression line is ' + M('y = 18 - 1.5x') + '.', [
        ['Interpret the intercept.', 1, 'The predicted value of a new car is £18 000'],
        ['Find the predicted value at 15 years and comment.', 2, '−4.5: impossible, so the linear model breaks down for old cars'],
        ['Suggest a better model shape and why.', 1, 'An exponential decay model, as cars tend to lose a percentage of value each year']
      ]);
    },
    function () {
      return Q('A researcher measures arm span and height for 30 adults and finds ' + M('r = 0.94') + '.', [
        ['Interpret this value.', 1, 'Strong positive linear correlation'],
        ['Would you expect the same correlation for children aged 5 to 15 combined with adults? Explain.', 2, 'Likely still strong: both grow together, but the relationship may not be linear across ages'],
        ['Explain the difference between interpolation and extrapolation for predictions from this data.', 1, 'Interpolation is within the data range and more reliable']
      ]);
    },
    function () {
      return Q('Describe and interpret a scatter diagram.', [
        ['What features should a full description of a scatter diagram include?', 2, 'Direction, strength, linearity and any outliers or clusters'],
        ['Explain why ' + M('r = 0') + ' does not mean that there is no relationship.', 1, 'There may be a strong non-linear relationship'],
        ['Sketch an example with ' + M('r \\approx 0') + ' but a clear pattern.', 1, 'A U-shaped (quadratic) pattern']
      ]);
    }
  ]);

  X('al-probability', [
    function () {
      var a = ri(3, 6) / 10, b = ri(2, 5) / 10, ab = ri(1, Math.min(a, b) * 10 - 1) / 10;
      return Q(M('P(A) = ' + a + ', P(B) = ' + b + ', P(A \\cap B) = ' + ab) + '.', [
        ['Draw a Venn diagram and find ' + M('P(A \\cup B)') + '.', 2, sf3(a + b - ab)],
        ['Find ' + M('P(A’ \\cap B)') + ' and ' + M('P(A \\mid B)') + '.', 2, sf3(b - ab) + ' and ' + sf3(ab / b)],
        ['Are ' + M('A') + ' and ' + M('B') + ' independent? Show working.', 2, Math.abs(a * b - ab) < 1e-9 ? 'Yes: ' + M('P(A)P(B) = ' + sf3(a * b)) : 'No: ' + M('P(A)P(B) = ' + sf3(a * b) + ' \\ne ' + ab)]
      ]);
    },
    function () {
      var a = ri(2, 6) / 10, b = ri(2, 6) / 10, u = a + b - a * b;
      return Q('Events ' + M('A') + ' and ' + M('B') + ' are independent with ' + M('P(A) = ' + a) + ' and ' + M('P(A \\cup B) = ' + sf3(u)) + '.', [
        ['Show that ' + M(sf3(u) + ' = ' + a + ' + P(B) - ' + a + 'P(B)') + '.', 1, 'Use ' + M('P(A \\cap B) = P(A)P(B)')],
        ['Find ' + M('P(B)') + '.', 2, b],
        ['Find ' + M('P(A \\cap B’)') + '.', 1, sf3(a * (1 - b))]
      ]);
    },
    function () {
      return Q('Mutually exclusive and independent.', [
        ['Explain the difference between mutually exclusive and independent events.', 2, 'Mutually exclusive: cannot both happen. Independent: one does not change the probability of the other'],
        ['Prove that two events with non-zero probabilities cannot be both.', 2, 'Independent needs ' + M('P(A \\cap B) = P(A)P(B) > 0') + '; exclusive needs it to be 0'],
        ['Give an example of each with a die.', 1, '“Even” and “odd” are exclusive; “even” and “at most 2” are independent (' + M('\\frac{1}{6} = \\frac{1}{2} \\times \\frac{1}{3}') + ')']
      ]);
    },
    function () {
      var r = ri(3, 6), b = ri(3, 6), n = r + b, k = 3;
      var none = (b / n) * ((b - 1) / (n - 1)) * ((b - 2) / (n - 2));
      return Q('A bag has ' + r + ' red and ' + b + ' blue balls. Three are drawn without replacement.', [
        ['Find the probability that none are red.', 2, M(F(b * (b - 1) * (b - 2), n * (n - 1) * (n - 2)))],
        ['Find the probability of at least one red.', 1, M(F(n * (n - 1) * (n - 2) - b * (b - 1) * (b - 2), n * (n - 1) * (n - 2)))],
        ['Find the probability that exactly two are red.', 3, M(F(3 * r * (r - 1) * b, n * (n - 1) * (n - 2)))]
      ]);
    },
    function () {
      var t = ri(50, 80), a = ri(10, 25), b = ri(10, 25), x = ri(3, 8);
      var none = t - (a + b - x);
      return Q('Of ' + t + ' students, ' + a + ' study Art, ' + b + ' study Biology, and ' + none + ' study neither.', [
        ['Find the number studying both.', 2, x],
        ['A student is picked at random. Find ' + M('P(\\text{Art} \\mid \\text{Biology})') + '.', 2, M(F(x, b))],
        ['Are the events independent? Show working.', 2, (a * b === x * t ? 'Yes' : 'No') + ': ' + M(F(a, t) + ' \\times ' + F(b, t)) + ' vs ' + M(F(x, t))]
      ]);
    },
    function () {
      var s = []; for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) s.push(i + j);
      var t = ri(5, 9), cnt = s.filter(function (v) { return v === t; }).length, ge = s.filter(function (v) { return v >= t; }).length;
      return Q('Two fair dice are thrown and the scores added.', [
        ['Find ' + M('P(\\text{total} = ' + t + ')') + '.', 1, M(F(cnt, 36))],
        ['Find ' + M('P(\\text{total} \\ge ' + t + ')') + '.', 2, M(F(ge, 36))],
        ['Given that at least one die shows a 4, find the probability that the total is ' + t + '.', 2, (function () { var c = 0, n = 0; for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) if (i === 4 || j === 4) { n++; if (i + j === t) c++; } return M(F(c, n)); })()]
      ]);
    },
    function () {
      var p = pick([0.2, 0.3, 0.4]);
      return Q('A player keeps trying until she scores, with probability ' + p + ' of scoring on each attempt, independently.', [
        ['Find the probability she first scores on her 4th attempt.', 2, d4(Math.pow(1 - p, 3) * p)],
        ['Find the probability she needs more than 4 attempts.', 2, d4(Math.pow(1 - p, 4))],
        ['Find the least number of attempts so that the probability of having scored is at least 0.9.', 2, Math.ceil(Math.log(0.1) / Math.log(1 - p))]
      ]);
    },
    function () {
      var a = 0.1 * ri(1, 2), ab = 0.05, bc = 0.05, ac = 0.05, abc = 0.02;
      return Q('Three events ' + M('A, B, C') + ' have ' + M('P(A \\cap B \\cap C) = 0.02') + ', each pairwise intersection is 0.05, and ' + M('P(A) = P(B) = P(C) = 0.3') + '.', [
        ['Find the probability of exactly one of the events.', 3, sf3(3 * (0.3 - 2 * 0.05 + 0.02))],
        ['Find ' + M('P(A \\cup B \\cup C)') + '.', 2, sf3(0.9 - 0.15 + 0.02)],
        ['Find the probability of none of them.', 1, sf3(1 - 0.77)]
      ]);
    },
    function () {
      var p = ri(1, 4) / 20, n = pick([200, 500, 1000]);
      return Q('A machine produces faulty items with probability ' + p + ', independently.', [
        ['Find the expected number of faulty items in ' + n + '.', 1, num(p * n)],
        ['Two items are chosen. Find the probability that exactly one is faulty.', 2, sf3(2 * p * (1 - p))],
        ['An inspector checks items until the first faulty one. Find the probability that more than 10 are checked.', 2, d4(Math.pow(1 - p, 10))]
      ]);
    },
    function () {
      var p = ri(1, 3) / 10, s = ri(6, 9) / 10, f = ri(1, 3) / 10;
      var pos = p * s + (1 - p) * f;
      return Q('A test detects a condition with probability ' + s + ' when present and gives a false positive with probability ' + f + ' when absent. ' + (p * 100) + '% of people have the condition.', [
        ['Find the probability of a positive result.', 2, sf3(pos)],
        ['Given a positive result, find the probability the person has the condition.', 2, sf3(p * s / pos)],
        ['Explain why this is lower than many people expect.', 1, 'Most people do not have the condition, so false positives are a large share of positives']
      ]);
    }
  ]);

  X('al-binomial-dist', [
    function () {
      var n = pick([10, 12, 15, 20]), p = pick([0.2, 0.25, 0.3, 0.4]), k = Math.round(n * p);
      return Q('Let ' + M('X \\sim \\text{B}(' + n + ', ' + p + ')') + '.', [
        ['Find ' + M('P(X = ' + k + ')') + '.', 1, d4(pmf(n, p, k))],
        ['Find ' + M('P(X \\le ' + k + ')') + ' and ' + M('P(X > ' + k + ')') + '.', 2, d4(cdf(n, p, k)) + ' and ' + d4(1 - cdf(n, p, k))],
        ['Find ' + M('P(' + (k - 2) + ' < X \\le ' + (k + 2) + ')') + '.', 2, d4(cdf(n, p, k + 2) - cdf(n, p, k - 2))]
      ]);
    },
    function () {
      return Q('A student models the number of red cars passing a school in an hour with a binomial distribution.', [
        ['State the conditions needed for a binomial model.', 2, 'Fixed number of trials, two outcomes, constant probability, independent trials'],
        ['Explain why the model may be unsuitable.', 2, 'The number of cars is not fixed; cars may travel in groups (not independent)'],
        ['Suggest a situation involving cars where a binomial model would be reasonable.', 1, 'The number of red cars among the next 50 cars']
      ]);
    },
    function () {
      var p = pick([0.05, 0.1, 0.15, 0.2]), t = pick([0.9, 0.95, 0.99]);
      var n = Math.ceil(Math.log(1 - t) / Math.log(1 - p));
      return Q('Each component fails with probability ' + p + ', independently.', [
        ['Write ' + M('P(\\text{at least one failure in } n)') + ' in terms of ' + M('n') + '.', 1, M('1 - ' + (1 - p).toFixed(2) + '^n')],
        ['Find the smallest ' + M('n') + ' for which this exceeds ' + t + '.', 3, n],
        ['Explain why the answer is not simply ' + M(t + ' \\div ' + p) + '.', 1, 'Probabilities of overlapping events cannot just be added']
      ]);
    },
    function () {
      var n = pick([20, 25, 40, 50]), p = pick([0.2, 0.4, 0.6]);
      return Q(M('X \\sim \\text{B}(n, p)') + ' with mean ' + num(n * p) + ' and variance ' + sf3(n * p * (1 - p)) + '.', [
        ['Find ' + M('p') + ' and ' + M('n') + '.', 3, M('1 - p = ' + sf3(1 - p)) + ', ' + M('p = ' + p + ',\\ n = ' + n)],
        ['Find ' + M('P(X = ' + Math.round(n * p) + ')') + '.', 1, d4(pmf(n, p, Math.round(n * p)))],
        ['Explain why the variance is always less than the mean for a binomial distribution.', 1, M('np(1 - p) < np') + ' since ' + M('1 - p < 1')]
      ]);
    },
    function () {
      var n = ri(8, 15), p = pick([0.2, 0.3, 0.4]);
      var mode = Math.floor((n + 1) * p);
      return Q('Let ' + M('X \\sim \\text{B}(' + n + ', ' + p + ')') + '.', [
        ['Show that ' + M('\\frac{P(X = r + 1)}{P(X = r)} = \\frac{(' + n + ' - r)}{(r + 1)} \\times \\frac{' + p + '}{' + (1 - p).toFixed(1) + '}') + '.', 3, 'Cancel factorials in the binomial coefficients'],
        ['Hence find the most likely value of ' + M('X') + '.', 2, mode],
        ['Check by calculating the probabilities either side.', 1, d4(pmf(n, p, mode - 1)) + ', ' + d4(pmf(n, p, mode)) + ', ' + d4(pmf(n, p, mode + 1))]
      ]);
    },
    function () {
      var p = pick([0.3, 0.4]), q = cdf(10, p, 4);
      var pd = 1 - q;
      return Q('Each day, the number of late buses is ' + M('X \\sim \\text{B}(10, ' + p + ')') + '. A day is “bad” if more than 4 buses are late.', [
        ['Find the probability that a day is bad.', 2, d4(pd)],
        ['Find the probability of at least 2 bad days in a 5-day week.', 3, d4(1 - cdf(5, pd, 1))],
        ['State an assumption you made.', 1, 'Days are independent']
      ]);
    },
    function () {
      var n = pick([10, 12, 14]);
      return Q('Let ' + M('X \\sim \\text{B}(' + n + ', 0.5)') + '.', [
        ['Explain why ' + M('P(X = r) = P(X = ' + n + ' - r)') + '.', 1, 'The distribution is symmetric when ' + M('p = 0.5')],
        ['Hence find ' + M('P(X \\le ' + (n / 2 - 1) + ')') + ' using ' + M('P(X = ' + n / 2 + ') = ' + d4(pmf(n, 0.5, n / 2))) + '.', 3, M('\\frac{1 - ' + d4(pmf(n, 0.5, n / 2)) + '}{2} = ' + d4((1 - pmf(n, 0.5, n / 2)) / 2))]
      ]);
    },
    function () {
      var p = pick([0.1, 0.2, 0.05]), n = ri(10, 30);
      return Q('The probability that a seed fails is ' + p + '. A packet has ' + M('n') + ' seeds.', [
        ['Write ' + M('P(\\text{no failures})') + ' in terms of ' + M('n') + '.', 1, M(sf3(1 - p) + '^n')],
        ['Find the largest ' + M('n') + ' for which ' + M('P(\\text{no failures}) > 0.1') + '.', 3, Math.floor(Math.log(0.1) / Math.log(1 - p) - 1e-12)],
        ['For ' + M('n = ' + n) + ', find ' + M('P(\\text{at most 1 failure})') + '.', 2, d4(cdf(n, p, 1))]
      ]);
    },
    function () {
      return Q('Compare ' + M('X \\sim \\text{B}(10, 0.3)') + ' and ' + M('Y \\sim \\text{B}(20, 0.15)') + '.', [
        ['Show they have the same mean.', 1, 'Both 3'],
        ['Find both variances and explain the difference.', 2, '2.1 and 2.55; ' + M('Y') + ' has more trials, each less likely, so outcomes are more spread'],
        ['Find ' + M('P(X = 0)') + ' and ' + M('P(Y = 0)') + '.', 2, d4(pmf(10, 0.3, 0)) + ' and ' + d4(pmf(20, 0.15, 0))]
      ]);
    },
    function () {
      var n = pick([5, 6, 8]), p = pick([0.3, 0.5, 0.7]);
      return Q('A multiple-choice test has ' + n + ' questions. A student answers each correctly with probability ' + p + '.', [
        ['Find the probability of passing (at least ' + Math.ceil(n / 2) + ' correct).', 2, d4(1 - cdf(n, p, Math.ceil(n / 2) - 1))],
        ['How many questions would she expect to get right?', 1, num(n * p)],
        ['Find the probability she gets exactly the expected number (if whole).', 1, (n * p) % 1 ? 'Not a whole number, so this is 0 for that value' : d4(pmf(n, p, n * p))]
      ]);
    }
  ]);

  X('al-hypothesis', [
    function () {
      var n = 20, p = pick([0.2, 0.25, 0.3]), x = Math.round(n * p) + ri(3, 5);
      var pv = 1 - cdf(n, p, x - 1);
      return Q('A coin-like process has ' + M('P(\\text{success}) = ' + p) + '. After a change, ' + x + ' successes are seen in ' + n + ' trials. Test at the 5% level whether the probability has increased.', [
        ['State the hypotheses.', 1, M('H_0: p = ' + p + ',\\ H_1: p > ' + p)],
        ['Find ' + M('P(X \\ge ' + x + ')') + ' under ' + M('H_0') + '.', 2, d4(pv)],
        ['State your conclusion in context.', 2, pv < 0.05 ? 'Reject ' + M('H_0') + ': evidence the probability has increased' : 'Do not reject ' + M('H_0') + ': insufficient evidence of an increase']
      ]);
    },
    function () {
      var n = pick([20, 25, 30]), p = pick([0.3, 0.4, 0.5]);
      var c = -1; while (cdf(n, p, c + 1) <= 0.05) c++;
      return Q('For ' + M('X \\sim \\text{B}(' + n + ', ' + p + ')') + ', a test of ' + M('H_0: p = ' + p) + ' against ' + M('H_1: p < ' + p) + ' is carried out at the 5% level.', [
        ['Find the critical region.', 3, M('X \\le ' + c)],
        ['Find the actual significance level.', 1, d4(cdf(n, p, c))],
        ['Explain why the actual level is not exactly 5%.', 1, 'The distribution is discrete']
      ]);
    },
    function () {
      var n = 20, p = 0.5;
      var lo = -1; while (cdf(n, p, lo + 1) <= 0.025) lo++;
      var hi = n + 1; while (1 - cdf(n, p, hi - 2) <= 0.025) hi--;
      return Q('A coin is tested for bias by throwing it 20 times. ' + M('H_0: p = 0.5') + ', ' + M('H_1: p \\ne 0.5') + ', 5% level.', [
        ['Find the critical region, using 2.5% in each tail.', 4, M('X \\le ' + lo) + ' or ' + M('X \\ge ' + hi)],
        ['Find the actual significance level.', 1, d4(cdf(n, p, lo) + 1 - cdf(n, p, hi - 1))],
        ['Explain why this is a two-tailed test.', 1, 'We are looking for bias in either direction']
      ]);
    },
    function () {
      return Q('A student concludes: “The test shows the coin is fair.”', [
        ['Explain what is wrong with this statement if ' + M('H_0') + ' was not rejected.', 2, 'Not rejecting ' + M('H_0') + ' means there is not enough evidence against it, not that it is proven'],
        ['Write a correct conclusion.', 1, 'There is insufficient evidence at the 5% level that the coin is biased'],
        ['How could the test be made more sensitive?', 1, 'Use a larger number of throws']
      ]);
    },
    function () {
      return Q('Choosing hypotheses.', [
        ['A firm claims 90% of its parcels arrive on time. A customer suspects it is less. Write the hypotheses.', 1, M('H_0: p = 0.9,\\ H_1: p < 0.9')],
        ['A researcher wants to know if a drug changes the recovery rate from 40%. Write the hypotheses.', 1, M('H_0: p = 0.4,\\ H_1: p \\ne 0.4')],
        ['Explain why the hypotheses must be set before collecting data.', 1, 'Choosing after seeing the data biases the test']
      ]);
    },
    function () {
      var p = 0.3;
      var crit = function (n) { var c = n + 1; while (1 - cdf(n, p, c - 2) <= 0.05) c--; return c; };
      var c1 = crit(10), c2 = crit(40);
      return Q('Tests of ' + M('H_0: p = 0.3') + ' against ' + M('H_1: p > 0.3') + ' at 5% are done with samples of 10 and of 40.', [
        ['Find the critical region for each.', 4, M('X \\ge ' + c1) + ' and ' + M('X \\ge ' + c2)],
        ['Express each critical value as a proportion of the sample size and comment.', 2, sf3(c1 / 10) + ' and ' + sf3(c2 / 40) + '; larger samples detect smaller increases']
      ]);
    },
    function () {
      var n = 15, p = pick([0.2, 0.3]), x = ri(0, 1);
      var pv = cdf(n, p, x);
      return Q('Historically, ' + p * 100 + '% of customers complain. In a sample of ' + n + ', ' + x + ' complain. Test at 5% whether the proportion has fallen.', [
        ['State hypotheses.', 1, M('H_0: p = ' + p + ',\\ H_1: p < ' + p)],
        ['Find the p-value.', 2, d4(pv)],
        ['Conclude in context.', 1, pv < 0.05 ? 'Reject ' + M('H_0') + ': evidence the complaint rate has fallen' : 'Insufficient evidence that the rate has fallen']
      ]);
    },
    function () {
      var n = 25, p = 0.2;
      var c = n + 1; while (1 - cdf(n, p, c - 2) <= 0.1) c--;
      return Q('Test ' + M('H_0: p = 0.2') + ' against ' + M('H_1: p > 0.2') + ' with ' + M('n = 25') + ' at the 10% level.', [
        ['Find the smallest number of successes that would lead to rejecting ' + M('H_0') + '.', 3, c],
        ['Find the actual significance level.', 1, d4(1 - cdf(n, p, c - 1))],
        ['State the probability of rejecting ' + M('H_0') + ' when it is true.', 1, 'The actual significance level, ' + d4(1 - cdf(n, p, c - 1))]
      ]);
    },
    function () {
      return Q('Interpreting p-values.', [
        ['A test gives p-value 0.032. What can be concluded at the 5% and at the 1% levels?', 2, 'Reject at 5%; do not reject at 1%'],
        ['Explain what the p-value measures.', 1, 'The probability, assuming ' + M('H_0') + ', of a result at least as extreme as the one observed'],
        ['Why is a lower significance level more cautious?', 1, 'It needs stronger evidence before rejecting ' + M('H_0')]
      ]);
    },
    function () {
      var p = pick([0.1, 0.15]), n = 40, x = ri(1, 2);
      var pv = cdf(n, p, x);
      return Q('A machine produced ' + p * 100 + '% defective items. After servicing, ' + x + ' of ' + n + ' items are defective.', [
        ['Test at 5% whether the defect rate has decreased.', 4, M('P(X \\le ' + x + ') = ' + d4(pv)) + '; ' + (pv < 0.05 ? 'reject ' + M('H_0') + ': evidence of a decrease' : 'do not reject ' + M('H_0'))],
        ['Comment on the assumption of independence.', 1, 'Defects may come in batches, so items may not be independent']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
