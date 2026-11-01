/* Byte Size Classroom — deeper extension questions (set 3, A level Year 1 part e): correlation and regression, probability, binomial distribution, hypothesis testing. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function d4(x) { return x.toFixed(4); }
  function F(n, d) { return frac(n, d); }
  function C(n, r) { if (r < 0 || r > n) return 0; var v = 1; for (var i = 1; i <= r; i++) v = v * (n - r + i) / i; return Math.round(v); }
  function pmf(n, p, k) { return C(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k); }
  function cdf(n, p, k) { var s = 0; for (var i = 0; i <= k; i++) s += pmf(n, p, i); return s; }
  function ge(n, p, k) { return 1 - cdf(n, p, k - 1); }
  function upperCR(n, p, a) { for (var c = 0; c <= n + 1; c++) if (ge(n, p, c) <= a) return c; return n + 1; }
  function lowerCR(n, p, a) { var c = -1; for (var k = 0; k <= n; k++) if (cdf(n, p, k) <= a) c = k; return c; }

  X('al-correlation', [
    function () {
      var r = pick([0.92, 0.85, -0.88, 0.12, -0.07]);
      return Q('The PMCC between hours of sunshine and ice-cream sales over 15 days is ' + r + '.', [
        ['Interpret this value in context.', 2, Math.abs(r) > 0.5 ? 'Strong ' + (r > 0 ? 'positive' : 'negative') + ' linear correlation: sunnier days tend to have ' + (r > 0 ? 'higher' : 'lower') + ' sales' : 'Very weak linear correlation: little linear relationship'],
        ['Does this show that sunshine causes the change in sales? Explain.', 1, 'No: correlation does not imply causation (temperature may be the real factor)'],
        ['Explain why a PMCC near 0 does not mean there is no relationship.', 1, 'There could be a strong non-linear relationship']
      ]);
    },
    function () {
      var a = ri(10, 40), b = ri(2, 6), lo = ri(5, 10), hi = lo + ri(10, 20);
      return Q('The regression line of ' + M('y') + ' (score) on ' + M('x') + ' (hours revised) is ' + M('y = ' + a + ' + ' + b + 'x') + ', from data with ' + M(lo + ' \\le x \\le ' + hi) + '.', [
        ['Interpret the gradient and the intercept.', 2, 'Each extra hour adds about ' + b + ' marks; ' + a + ' is the predicted score with no revision'],
        ['Estimate the score for ' + (lo + 3) + ' hours and for ' + (hi + 15) + ' hours, commenting on reliability.', 2, (a + b * (lo + 3)) + ' (interpolation, reliable); ' + (a + b * (hi + 15)) + ' (extrapolation, unreliable)'],
        ['Explain why the line should not be used to predict hours from score.', 1, 'It is the regression of ' + M('y') + ' on ' + M('x') + '; it minimises errors in ' + M('y') + ' only']
      ]);
    },
    function () {
      var n = pick([10, 12, 15, 20]), cv = { 10: 0.5494, 12: 0.4973, 15: 0.4409, 20: 0.3783 }[n], r = pick([0.62, 0.41, 0.53, 0.35, 0.48]);
      return Q('A sample of ' + n + ' pairs gives PMCC ' + r + '. Test at the 5% level whether there is positive correlation in the population (critical value ' + cv + ').', [
        ['State the hypotheses.', 1, M('H_0: \\rho = 0') + ', ' + M('H_1: \\rho > 0')],
        ['Carry out the test and conclude in context.', 2, r > cv ? r + ' > ' + cv + ': reject ' + M('H_0') + '; there is evidence of positive correlation' : r + ' < ' + cv + ': do not reject ' + M('H_0') + '; insufficient evidence of positive correlation'],
        ['Explain why the critical value gets smaller as the sample size increases.', 1, 'With more data, a smaller correlation is less likely to happen by chance']
      ]);
    },
    function () {
      return Q('A scatter diagram shows a weak positive correlation, with one point far from the others in the top-right corner.', [
        ['Explain the effect of this point on the PMCC.', 2, 'It may greatly increase the PMCC, making the correlation look stronger'],
        ['How should you decide whether to remove it?', 1, 'Check whether it is an error; if genuine, keep it but report its effect'],
        ['Explain why one point can have such a large effect.', 1, 'The PMCC uses products of deviations, so an extreme point contributes a large amount']
      ]);
    },
    function () {
      var a = ri(10, 50), b = pick([2, 5, 10]);
      return Q('Temperatures ' + M('x') + ' (°C) are coded as ' + M('t = \\frac{x - ' + a + '}{' + b + '}') + '. The PMCC between ' + M('t') + ' and ' + M('y') + ' is 0.74.', [
        ['Write down the PMCC between ' + M('x') + ' and ' + M('y') + '.', 1, '0.74'],
        ['Explain why coding does not change the PMCC.', 2, 'Linear coding only shifts and rescales the axes; the pattern of points is unchanged'],
        ['What would the PMCC be if ' + M('t = \\frac{' + a + ' - x}{' + b + '}') + '?', 1, '−0.74']
      ]);
    },
    function () {
      var a = ri(200, 500), b = ri(5, 20);
      return Q('The cost ' + M('C') + ' (£) of producing ' + M('n') + ' items is modelled by ' + M('C = ' + a + ' + ' + b + 'n') + ', from data with 20 to 200 items.', [
        ['Interpret ' + a + ' and ' + b + ' in context.', 2, 'Fixed costs £' + a + '; each item costs £' + b],
        ['Find the cost per item for 100 items and for 200 items.', 2, '£' + num((a + 100 * b) / 100) + ' and £' + num((a + 200 * b) / 200)],
        ['Explain why the model may be unreliable for 10 000 items.', 1, 'Extrapolation: costs per item often change at scale']
      ]);
    },
    function () {
      return Q('Choosing variables for regression.', [
        ['Explain the difference between an explanatory and a response variable.', 2, 'The explanatory variable is set or controlled; the response depends on it'],
        ['In a study of fertiliser amount and crop yield, which is which?', 1, 'Fertiliser is explanatory; yield is the response'],
        ['Why should the regression line be of yield on fertiliser and not the other way round?', 1, 'We want to predict yield from fertiliser']
      ]);
    },
    function () {
      return Q('Points lie exactly on the curve ' + M('y = (x - 5)^2') + ' for ' + M('x = 0, 1, \\ldots, 10') + '.', [
        ['Estimate the PMCC without calculation, and explain.', 2, '0: the data are symmetric about ' + M('x = 5') + ', so there is no linear trend'],
        ['What does this show about using the PMCC?', 1, 'It measures only linear association'],
        ['Suggest how to check for a non-linear relationship.', 1, 'Plot a scatter diagram first']
      ]);
    },
    function () {
      return Q('A researcher wants to test whether there is any correlation (positive or negative) between two variables.', [
        ['Should the test be one-tailed or two-tailed? Explain.', 1, 'Two-tailed: no direction is predicted'],
        ['For a 5% two-tailed test, what significance level is used in each tail?', 1, '2.5%'],
        ['Explain how the conclusion would change if a one-tailed test had been chosen after seeing the data.', 2, 'It would be invalid: the hypotheses must be decided before collecting data']
      ]);
    },
    function () {
      var Sxx = ri(40, 100), Syy = ri(40, 100), Sxy = ri(-30, 60);
      var r = Sxy / Math.sqrt(Sxx * Syy);
      return Q('For a data set, ' + M('S_{xx} = ' + Sxx) + ', ' + M('S_{yy} = ' + Syy) + ' and ' + M('S_{xy} = ' + Sxy) + '.', [
        ['Find the PMCC using ' + M('r = \\frac{S_{xy}}{\\sqrt{S_{xx}S_{yy}}}') + '.', 2, sf3(r)],
        ['Find the gradient of the regression line of ' + M('y') + ' on ' + M('x') + ', ' + M('b = \\frac{S_{xy}}{S_{xx}}') + '.', 1, sf3(Sxy / Sxx)],
        ['Explain why ' + M('r') + ' and ' + M('b') + ' always have the same sign.', 1, 'Both have ' + M('S_{xy}') + ' in the numerator and positive denominators']
      ]);
    }
  ]);

  X('al-probability', [
    function () {
      var pa = ri(3, 6) / 10, pb = ri(2, 5) / 10, pab = pick([pa * pb, Math.round((pa * pb + 0.05) * 100) / 100]);
      var ind = Math.abs(pab - pa * pb) < 1e-9;
      return Q(M('P(A) = ' + pa) + ', ' + M('P(B) = ' + pb) + ', ' + M('P(A \\cap B) = ' + sf3(pab)) + '.', [
        ['Draw a Venn diagram and find ' + M("P(A' \\cap B')") + '.', 3, sf3(1 - pa - pb + pab)],
        ['Find ' + M('P(A \\mid B)') + '.', 2, sf3(pab / pb)],
        ['Are ' + M('A') + ' and ' + M('B') + ' independent? Justify.', 2, ind ? 'Yes: ' + M('P(A)P(B) = ' + sf3(pa * pb)) : 'No: ' + M('P(A)P(B) = ' + sf3(pa * pb) + ' \\ne ' + sf3(pab))]
      ]);
    },
    function () {
      var r = ri(3, 7), b = ri(3, 7), n = r + b;
      return Q('A bag contains ' + r + ' red and ' + b + ' blue balls. Two are taken without replacement.', [
        ['Find the probability that they are different colours.', 2, M(F(2 * r * b, n * (n - 1)))],
        ['Given that they are different colours, find the probability the first was red.', 2, M('\\frac{1}{2}')],
        ['Given that at least one is red, find the probability both are red.', 3, M(F(r * (r - 1), n * (n - 1) - b * (b - 1)))]
      ]);
    },
    function () {
      var pa = ri(1, 4) / 10, pb = ri(2, 5) / 10;
      return Q(M('P(A) = ' + pa) + ' and ' + M('P(A \\cup B) = ' + sf3(pa + pb - pa * pb)) + '.', [
        ['Find ' + M('P(B)') + ' if ' + M('A') + ' and ' + M('B') + ' are independent.', 3, M('P(B) = ' + pb)],
        ['Find ' + M('P(B)') + ' if instead ' + M('A') + ' and ' + M('B') + ' are mutually exclusive.', 1, sf3(pb - pa * pb)],
        ['Explain why two events with positive probabilities cannot be both.', 1, 'Mutually exclusive means ' + M('P(A \\cap B) = 0') + ', but independence needs it to be ' + M('P(A)P(B) > 0')]
      ]);
    },
    function () {
      var k = ri(7, 11), c = 0; for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) if (i + j >= k) c++;
      var c2 = 0, c3 = 0; for (i = 1; i <= 6; i++) for (j = 1; j <= 6; j++) if (i + j >= k) { if (i === j) c2++; }
      return Q('Two fair dice are rolled.', [
        ['Find ' + M('P(\\text{total} \\ge ' + k + ')') + '.', 2, M(F(c, 36))],
        ['Find the probability of a double given that the total is at least ' + k + '.', 2, M(F(c2, c))],
        ['Are “double” and “total at least ' + k + '” independent?', 2, c2 / c === 1 / 6 ? 'Yes' : 'No: ' + M(F(c2, c) + ' \\ne \\frac{1}{6}')]
      ]);
    },
    function () {
      var p = pick([0.1, 0.2, 0.05, 0.3]), t = pick([0.9, 0.95, 0.99]);
      var n = Math.ceil(Math.log(1 - t) / Math.log(1 - p));
      return Q('Each attempt at a task succeeds with probability ' + p + ', independently.', [
        ['Find the probability of at least one success in 5 attempts.', 2, d4(1 - Math.pow(1 - p, 5))],
        ['Find the least number of attempts for the probability of at least one success to exceed ' + t + '.', 3, n],
        ['Explain why “at least one” questions are usually done using the complement.', 1, 'There is only one outcome to calculate (no successes)']
      ]);
    },
    function () {
      var a = ri(10, 30), b = ri(10, 30), c = ri(10, 30), d = ri(10, 30), N = a + b + c + d;
      return Q('A survey: ' + a + ' boys and ' + b + ' girls walk to school; ' + c + ' boys and ' + d + ' girls do not.', [
        ['Find the probability a randomly chosen student walks, given they are a girl.', 2, M(F(b, b + d))],
        ['Find the probability a walker is a boy.', 1, M(F(a, a + b))],
        ['Are walking and being a boy independent? Show working.', 2, (a * N === (a + b) * (a + c)) ? 'Yes' : 'No: ' + M('P(\\text{walk} \\mid \\text{boy}) = ' + F(a, a + c)) + ' but ' + M('P(\\text{walk}) = ' + F(a + b, N))]
      ]);
    },
    function () {
      var r = ri(2, 4), b = ri(3, 6), n = r + b, k = ri(2, 3);
      var p = 1; for (var i = 0; i < k - 1; i++) p *= (b - i) / (n - i); p *= r / (n - k + 1);
      return Q('A bag has ' + r + ' red and ' + b + ' blue counters. Counters are drawn one at a time without replacement until a red is drawn.', [
        ['Find the probability that the first red is drawn on the ' + (k === 2 ? 'second' : 'third') + ' draw.', 3, sf3(p)],
        ['What is the greatest number of draws that could be needed?', 1, b + 1],
        ['Explain how the probabilities would change with replacement.', 1, 'Each draw would have probability ' + M(F(r, n)) + ' of red, independently']
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(1, 4);
      var k = 1 / (a + 2 * b + 3 * a + 4 * b);
      return Q('A discrete random variable has ' + M('P(X = x) = ' + (a === 1 ? 'kx' : a + 'kx')) + ' for ' + M('x = 1, 3') + ' and ' + M(b === 1 ? 'kx' : b + 'kx') + ' for ' + M('x = 2, 4') + '.', [
        ['Find ' + M('k') + '.', 2, M(F(1, 4 * a + 6 * b))],
        ['Find ' + M('P(X > 2)') + '.', 2, M(F(3 * a + 4 * b, 4 * a + 6 * b))],
        ['Find ' + M('P(X = 4 \\mid X > 2)') + '.', 2, M(F(4 * b, 3 * a + 4 * b))]
      ]);
    },
    function () {
      var c = ri(1, 3), w = ri(4, 10);
      var e = (w - c) / 6 - c * 5 / 6;
      return Q('A game costs £' + c + ' to play. A fair die is rolled; a 6 wins £' + w + ' (including the stake back), otherwise nothing.', [
        ['Find the probability distribution of the profit.', 2, M('P(' + (w - c) + ') = \\frac{1}{6}') + ', ' + M('P(-' + c + ') = \\frac{5}{6}')],
        ['Find the expected profit.', 2, '£' + sf3((w - 6 * c) / 6)],
        ['What prize makes the game fair?', 1, '£' + 6 * c]
      ]);
    },
    function () {
      var p = ri(2, 5) / 10, q = ri(5, 9) / 10, r = ri(1, 4) / 10;
      var t = p * q + (1 - p) * r;
      return Q('A test for a fault is positive with probability ' + q + ' if the fault is present and ' + r + ' if not. The fault is present in ' + p * 100 + '% of items.', [
        ['Find the probability of a positive result.', 2, sf3(t)],
        ['Find the probability the fault is present given a positive result.', 2, sf3(p * q / t)],
        ['Explain why this may be surprisingly low.', 1, 'Many items without the fault also test positive']
      ]);
    }
  ]);

  X('al-binomial-dist', [
    function () {
      var n = ri(10, 20), p = pick([0.2, 0.25, 0.3, 0.4]), k = Math.round(n * p);
      return Q(M('X \\sim B(' + n + ', ' + p + ')') + '.', [
        ['Find ' + M('P(X = ' + k + ')') + '.', 2, d4(pmf(n, p, k))],
        ['Find ' + M('P(X \\le ' + (k - 1) + ')') + ' and ' + M('P(X \\ge ' + (k + 2) + ')') + '.', 3, d4(cdf(n, p, k - 1)) + ', ' + d4(ge(n, p, k + 2))],
        ['Find ' + M('P(' + (k - 1) + ' < X < ' + (k + 3) + ')') + '.', 2, d4(cdf(n, p, k + 2) - cdf(n, p, k - 1))]
      ]);
    },
    function () {
      return Q('A student picks 10 sweets one at a time from a bag of 20, of which 6 are red, and counts the reds.', [
        ['State the conditions needed for a binomial model.', 2, 'Fixed number of trials; two outcomes; constant probability; independent trials'],
        ['Explain why ' + M('B(10, 0.3)') + ' is not a good model here.', 1, 'Without replacement the probability changes and trials are not independent'],
        ['How could the situation be changed so that the binomial model is valid?', 1, 'Replace each sweet before the next pick']
      ]);
    },
    function () {
      var p = pick([0.1, 0.05, 0.2]), t = pick([0.9, 0.95]);
      var n = Math.ceil(Math.log(1 - t) / Math.log(1 - p));
      return Q('Each component is faulty with probability ' + p + '. ' + M('X') + ' is the number faulty in a batch of ' + M('n') + '.', [
        ['Show that ' + M('P(X \\ge 1) = 1 - ' + (1 - p).toFixed(2) + '^n') + '.', 1, M('P(X = 0) = ' + (1 - p).toFixed(2) + '^n')],
        ['Find the smallest ' + M('n') + ' for which ' + M('P(X \\ge 1) > ' + t) + '.', 3, n],
        ['Interpret this result in context.', 1, 'A batch of ' + n + ' gives over ' + t * 100 + '% chance of including a faulty component']
      ]);
    },
    function () {
      var n = pick([5, 8, 10]), p = pick([0.1, 0.2, 0.3]), q0 = Math.pow(1 - p, n);
      return Q(M('X \\sim B(' + n + ', p)') + ' and ' + M('P(X = 0) = ' + d4(q0)) + '.', [
        ['Find ' + M('p') + '.', 2, p],
        ['Find ' + M('P(X = 1)') + '.', 2, d4(pmf(n, p, 1))],
        ['Find the mean and the most likely value of ' + M('X') + '.', 2, sf3(n * p) + '; ' + (function () { var b = 0; for (var k = 0; k <= n; k++) if (pmf(n, p, k) > pmf(n, p, b)) b = k; return b; })()]
      ]);
    },
    function () {
      var n = ri(3, 9);
      return Q(M('X \\sim B(' + n + ', p)') + ' and ' + M('P(X = 1) = P(X = 2)') + '.', [
        ['Write an equation in ' + M('p') + '.', 2, M(n + 'p(1 - p)^{' + (n - 1) + '} = ' + C(n, 2) + 'p^2(1 - p)^{' + (n - 2) + '}')],
        ['Solve to find ' + M('p') + '.', 3, M('p = ' + F(2, n + 1))],
        ['Find the mean of ' + M('X') + '.', 1, M(F(2 * n, n + 1))]
      ]);
    },
    function () {
      var p = pick([0.6, 0.7, 0.8]);
      var day = 1 - cdf(5, p, 2), wk = 1 - cdf(4, day, 1);
      return Q('A train is on time with probability ' + p + ' on each journey. A commuter makes 5 journeys a day.', [
        ['Find the probability that at least 3 of the 5 journeys on a day are on time.', 2, d4(day)],
        ['Find the probability that this happens on at least 2 of 4 days.', 3, d4(wk)],
        ['State an assumption you made and comment on it.', 1, 'Journeys are independent — delays may affect several trains on the same day']
      ]);
    },
    function () {
      var n = pick([8, 10, 12]);
      return Q(M('X \\sim B(' + n + ', 0.5)') + '.', [
        ['Explain why ' + M('P(X = r) = P(X = ' + n + ' - r)') + '.', 1, M('\\binom{' + n + '}{r} = \\binom{' + n + '}{' + n + ' - r}') + ' and ' + M('0.5^r 0.5^{' + n + ' - r} = 0.5^{' + n + '}')],
        ['Use symmetry to find ' + M('P(X \\le ' + (n / 2 - 1) + ')') + ' given ' + M('P(X = ' + n / 2 + ') = ' + d4(pmf(n, 0.5, n / 2))) + '.', 2, d4((1 - pmf(n, 0.5, n / 2)) / 2)],
        ['Sketch the distribution.', 1, 'Symmetric about ' + n / 2]
      ]);
    },
    function () {
      var N = pick([200, 1000]), r = N / 5, n = 5;
      var wo = C(r, 2) * C(N - r, 3) / C(N, 5);
      return Q('A population of ' + N + ' contains ' + r + ' defective items. A sample of 5 is taken without replacement.', [
        ['Use ' + M('B(5, 0.2)') + ' to estimate the probability of exactly 2 defectives.', 2, d4(pmf(5, 0.2, 2))],
        ['Explain why the binomial model is a good approximation here.', 1, 'The population is large, so removing a few items barely changes the probability'],
        ['When would it be a poor approximation?', 1, 'When the sample is a large fraction of the population']
      ]);
    },
    function () {
      var n = ri(15, 25), p = pick([0.3, 0.35, 0.4]), a = Math.round(n * p) - 2, b = Math.round(n * p) + 2;
      return Q(M('X \\sim B(' + n + ', ' + p + ')') + '.', [
        ['Find ' + M('P(' + a + ' \\le X \\le ' + b + ')') + ', writing it in terms of cumulative probabilities.', 3, M('P(X \\le ' + b + ') - P(X \\le ' + (a - 1) + ') = ' + d4(cdf(n, p, b) - cdf(n, p, a - 1)))],
        ['Find the largest ' + M('k') + ' with ' + M('P(X \\le k) < 0.1') + '.', 2, (function () { var k = -1; for (var i = 0; i <= n; i++) if (cdf(n, p, i) < 0.1) k = i; return k; })()]
      ]);
    },
    function () {
      var n = pick([20, 30]), p = pick([0.1, 0.15]);
      return Q('In a large population, ' + p * 100 + '% are left-handed. A class of ' + n + ' is chosen at random.', [
        ['Find the expected number of left-handed students.', 1, sf3(n * p)],
        ['Find the probability of more than twice the expected number.', 2, d4(1 - cdf(n, p, Math.floor(2 * n * p)))],
        ['A class has ' + (Math.floor(2 * n * p) + 2) + ' left-handers. Does this suggest it was not chosen at random? Explain.', 2, 'The probability of ' + (Math.floor(2 * n * p) + 2) + ' or more is ' + d4(ge(n, p, Math.floor(2 * n * p) + 2)) + ', which is ' + (ge(n, p, Math.floor(2 * n * p) + 2) < 0.05 ? 'small, so it is suspicious' : 'not very small, so it could happen by chance')]
      ]);
    }
  ]);

  X('al-hypothesis', [
    function () {
      var n = 20, p = pick([0.2, 0.25, 0.3]), x = Math.round(n * p) + ri(2, 5);
      var pv = ge(n, p, x);
      return Q('A company claims ' + p * 100 + '% of customers buy a second item. A manager thinks it is more. In a sample of ' + n + ', ' + x + ' bought a second item.', [
        ['State suitable hypotheses.', 1, M('H_0: p = ' + p) + ', ' + M('H_1: p > ' + p)],
        ['Find the p-value ' + M('P(X \\ge ' + x + ')') + '.', 2, d4(pv)],
        ['Conclude at the 5% level in context.', 2, pv < 0.05 ? 'Reject ' + M('H_0') + ': evidence that more than ' + p * 100 + '% buy a second item' : 'Do not reject ' + M('H_0') + ': insufficient evidence that more than ' + p * 100 + '% buy a second item']
      ]);
    },
    function () {
      var n = pick([20, 25]), p = pick([0.2, 0.25, 0.3]), a = 0.05;
      var c = upperCR(n, p, a);
      return Q('A test of ' + M('H_0: p = ' + p) + ' against ' + M('H_1: p > ' + p) + ' uses ' + M('X \\sim B(' + n + ', ' + p + ')') + ' at the 5% level.', [
        ['Find the critical region.', 3, M('X \\ge ' + c)],
        ['Find the actual significance level.', 1, d4(ge(n, p, c))],
        ['Explain why the actual significance level is not exactly 5%.', 1, 'The distribution is discrete, so tail probabilities jump']
      ]);
    },
    function () {
      var n = 20, p = pick([0.3, 0.4, 0.5]);
      var lo = lowerCR(n, p, 0.025), hi = upperCR(n, p, 0.025);
      return Q('A two-tailed test of ' + M('H_0: p = ' + p) + ' at the 5% level uses a sample of ' + n + '.', [
        ['State the alternative hypothesis.', 1, M('H_1: p \\ne ' + p)],
        ['Find the critical region, aiming for no more than 2.5% in each tail.', 4, M('X \\le ' + lo) + ' or ' + M('X \\ge ' + hi)],
        ['Find the actual significance level.', 1, d4(cdf(n, p, lo) + ge(n, p, hi))]
      ]);
    },
    function () {
      var n = pick([15, 20]), p = pick([0.3, 0.4]), c = lowerCR(n, p, 0.05);
      return Q('A lower-tail test of ' + M('H_0: p = ' + p) + ' against ' + M('H_1: p < ' + p) + ' at 5% uses ' + n + ' trials.', [
        ['Find the critical region.', 3, M('X \\le ' + c)],
        ['An observed value of ' + (c + 1) + ' is obtained. State the conclusion.', 1, 'Not in the critical region: do not reject ' + M('H_0')],
        ['Explain what the actual significance level represents.', 1, 'The probability of rejecting ' + M('H_0') + ' when it is true: ' + d4(cdf(n, p, c))]
      ]);
    },
    function () {
      return Q('Writing conclusions.', [
        ['Explain why we say “there is insufficient evidence to reject ' + M('H_0') + '” rather than “' + M('H_0') + ' is true”.', 2, 'The test only measures evidence against ' + M('H_0') + '; failing to find it does not prove ' + M('H_0')],
        ['Explain why conclusions should be stated in context.', 1, 'The reader needs to know what the result means for the situation'],
        ['A test is significant at 5%. Is it necessarily significant at 1%? Explain.', 1, 'No: the evidence may not be strong enough for the stricter level']
      ]);
    },
    function () {
      return Q('Choosing the tail.', [
        ['A coin is suspected of being biased towards heads. One-tailed or two-tailed?', 1, 'One-tailed: ' + M('H_1: p > 0.5')],
        ['A die is suspected of being biased (no direction given) when rolling sixes. One-tailed or two-tailed?', 1, 'Two-tailed: ' + M('H_1: p \\ne \\frac{1}{6}')],
        ['Explain why a two-tailed test needs more extreme evidence in each tail.', 2, 'The significance level is split between the two tails']
      ]);
    },
    function () {
      var p = 0.5, n1 = 10, n2 = 50;
      return Q('A coin is tested for bias towards heads at 5%, with ' + M('H_0: p = 0.5') + '.', [
        ['With 10 throws, find the critical region.', 2, M('X \\ge ' + upperCR(n1, p, 0.05))],
        ['With 50 throws, the critical region is ' + M('X \\ge ' + upperCR(n2, p, 0.05)) + '. Compare the proportions of heads needed.', 2, (upperCR(n1, p, 0.05) / n1 * 100) + '% vs ' + sf3(upperCR(n2, p, 0.05) / n2 * 100) + '%'],
        ['Explain why larger samples can detect smaller biases.', 1, 'The proportion varies less in larger samples']
      ]);
    },
    function () {
      var n = 12, p = 1 / 6, x = ri(5, 6);
      var pv = ge(n, p, x);
      return Q('A die is rolled 12 times and shows a six ' + x + ' times. Test at 5% whether the die is biased towards sixes.', [
        ['State the hypotheses and the distribution under ' + M('H_0') + '.', 2, M('H_0: p = \\frac{1}{6}') + ', ' + M('H_1: p > \\frac{1}{6}') + '; ' + M('X \\sim B(12, \\frac{1}{6})')],
        ['Find ' + M('P(X \\ge ' + x + ')') + '.', 2, d4(pv)],
        ['Conclude.', 1, pv < 0.05 ? 'Reject ' + M('H_0') + ': evidence of bias towards sixes' : 'Do not reject ' + M('H_0')]
      ]);
    },
    function () {
      var n = 20, p = 0.25, c = upperCR(n, p, 0.1);
      return Q('A test uses ' + M('X \\sim B(20, 0.25)') + ' with ' + M('H_1: p > 0.25') + ' at the 10% level.', [
        ['Find the critical region.', 2, M('X \\ge ' + c)],
        ['Find the probability of wrongly rejecting ' + M('H_0') + '.', 1, d4(ge(n, p, c))],
        ['If in fact ' + M('p = 0.4') + ', find the probability that the test correctly rejects ' + M('H_0') + '.', 2, d4(ge(n, 0.4, c))]
      ]);
    },
    function () {
      var p0 = pick([0.1, 0.15]), n = 40, x = ri(1, 2);
      var pv = cdf(n, p0, x);
      return Q('A machine produces ' + p0 * 100 + '% defective items. After a service, a sample of ' + n + ' has ' + x + ' defectives. Test at 5% whether the proportion has decreased.', [
        ['State the hypotheses.', 1, M('H_0: p = ' + p0) + ', ' + M('H_1: p < ' + p0)],
        ['Find the p-value.', 2, d4(pv)],
        ['Conclude in context.', 2, pv < 0.05 ? 'Reject ' + M('H_0') + ': evidence the service reduced the defect rate' : 'Do not reject ' + M('H_0') + ': insufficient evidence of a reduction']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
