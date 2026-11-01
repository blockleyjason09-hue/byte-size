/* Byte Size Classroom — deeper extension questions (set 3, A level Year 2 part d): regression and correlation tests, conditional probability, normal distribution, moments. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function d4(x) { return x.toFixed(4); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function Phi(z) { var t = 1 / (1 + 0.2316419 * Math.abs(z)), d = 0.3989422804014327 * Math.exp(-z * z / 2); var p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429)))); return z >= 0 ? 1 - p : p; }
  var CV1 = { 8: 0.6215, 10: 0.5494, 12: 0.4973, 15: 0.4409, 20: 0.3783, 25: 0.3365, 30: 0.3061 };
  var CV2 = { 8: 0.7067, 10: 0.6319, 12: 0.5760, 15: 0.5140, 20: 0.4438, 25: 0.3961, 30: 0.3610 };
  var Z = { 0.1: 1.2816, 0.05: 1.6449, 0.025: 1.96, 0.01: 2.3263, 0.2: 0.8416 };

  X('a2-regression', [
    function () {
      var a = pick([0.5, 0.8, 1.2]), b = pick([0.05, 0.1, 0.15]);
      return Q('Data for ' + M('y') + ' against ' + M('x') + ' are modelled by ' + M('y = kc^x') + '. The regression line of ' + M('\\log_{10} y') + ' on ' + M('x') + ' is ' + M('\\log_{10} y = ' + a + ' + ' + b + 'x') + '.', [
        ['Find ' + M('k') + ' and ' + M('c') + '.', 3, M('k = ' + sf3(Math.pow(10, a)) + ',\\ c = ' + sf3(Math.pow(10, b)))],
        ['Interpret ' + M('c') + ' in context, if ' + M('x') + ' is time in years and ' + M('y') + ' is the number of users.', 1, 'Users are multiplied by ' + sf3(Math.pow(10, b)) + ' each year'],
        ['Predict ' + M('y') + ' at ' + M('x = 20') + ' and comment if the data run from ' + M('x = 0') + ' to 10.', 2, sf3(Math.pow(10, a + 20 * b)) + '; extrapolation, unreliable']
      ]);
    },
    function () {
      var n = pick([2, 3, -1, 0.5]), a = pick([2, 5, 10]);
      return Q('A plot of ' + M('\\log y') + ' against ' + M('\\log x') + ' gives a straight line with gradient ' + n + ' and intercept ' + sf3(Math.log10(a)) + '.', [
        ['Write the relationship between ' + M('y') + ' and ' + M('x') + '.', 3, M('y = ' + a + 'x^{' + n + '}')],
        ['Find ' + M('y') + ' when ' + M('x = 4') + '.', 1, sf3(a * Math.pow(4, n))],
        ['Explain why a log–log plot is used rather than log–linear.', 1, 'A power law gives a straight line on log–log axes']
      ]);
    },
    function () {
      var n = pick([8, 10, 12, 15, 20]), cv = CV1[n], r = +(cv + pick([-0.08, 0.05, 0.12])).toFixed(3);
      return Q('For ' + n + ' pairs of data, ' + M('r = ' + r) + '. Test at the 5% level whether there is positive correlation in the population. (Critical value: ' + cv + ')', [
        ['State the hypotheses.', 1, M('H_0: \\rho = 0,\\ H_1: \\rho > 0')],
        ['Carry out the test and conclude in context.', 2, r > cv ? 'Reject ' + M('H_0') + ': evidence of positive correlation' : 'Do not reject ' + M('H_0') + ': insufficient evidence of positive correlation'],
        ['Explain why the critical value depends on the sample size.', 1, 'Small samples can show strong correlation by chance']
      ]);
    },
    function () {
      var n = pick([10, 12, 15, 20]), cv = CV2[n], r = +(-(cv + pick([-0.1, 0.04, 0.1]))).toFixed(3);
      return Q('For ' + n + ' pairs, ' + M('r = ' + r) + '. Test at the 5% level (two-tailed) for correlation. (Critical value: ' + cv + ')', [
        ['State the hypotheses.', 1, M('H_0: \\rho = 0,\\ H_1: \\rho \\ne 0')],
        ['Carry out the test.', 2, Math.abs(r) > cv ? 'Reject ' + M('H_0') + ': evidence of correlation' : 'Do not reject ' + M('H_0')],
        ['Why is the two-tailed critical value larger than the one-tailed one?', 1, 'Each tail has only 2.5%']
      ]);
    },
    function () {
      return Q('Choosing a model.', [
        ['A scatter of ' + M('y') + ' against ' + M('x') + ' curves upwards. A plot of ' + M('\\log y') + ' against ' + M('x') + ' is straight. Which model fits?', 1, M('y = ab^x')],
        ['If instead ' + M('\\log y') + ' against ' + M('\\log x') + ' were straight, which model fits?', 1, M('y = ax^n')],
        ['Explain why ' + M('\\log') + ' cannot be applied directly to data with zero or negative values.', 1, 'Logs of zero or negative numbers do not exist as real numbers']
      ]);
    },
    function () {
      var cv = 0.5494, r = pick([0.62, 0.71, 0.48]);
      return Q('A sample of 10 gives ' + M('r = ' + r) + ' between hours of sleep and test score.', [
        ['Test for positive correlation at 5% (critical value 0.5494).', 2, r > cv ? 'Reject ' + M('H_0') : 'Do not reject ' + M('H_0')],
        ['Test at 1% (critical value 0.7155).', 1, r > 0.7155 ? 'Reject ' + M('H_0') : 'Do not reject ' + M('H_0')],
        ['Explain what a significant result would and would not show.', 1, 'Evidence of a linear association in the population; not that sleep causes higher scores']
      ]);
    },
    function () {
      return Q('Why test the PMCC?', [
        ['Explain the difference between ' + M('r') + ' and ' + M('\\rho') + '.', 1, M('r') + ' is from the sample; ' + M('\\rho') + ' is the population value'],
        ['State an assumption needed for the test.', 1, 'The data come from a bivariate normal distribution (random sample)'],
        ['Explain why a large sample with ' + M('r = 0.2') + ' can be significant.', 1, 'With many data points, a weak correlation is unlikely to arise by chance']
      ]);
    },
    function () {
      var c = pick([0.9, 0.85, 0.8]), k = ri(100, 500);
      return Q('The value of a machine is modelled as ' + M('V = ' + k + ' \\times ' + c + '^t') + ' (£1000s, years).', [
        ['Write the linear relationship between ' + M('\\log V') + ' and ' + M('t') + '.', 2, M('\\log V = \\log ' + k + ' + t\\log ' + c)],
        ['Find when the value falls below half its initial value.', 2, sf3(Math.log(0.5) / Math.log(c)) + ' years'],
        ['Interpret the gradient of the log graph.', 1, 'Negative, showing a constant percentage loss per year']
      ]);
    },
    function () {
      return Q('A researcher finds a significant positive PMCC between ice-cream sales and drownings.', [
        ['Explain why this does not show that ice cream causes drowning.', 1, 'Correlation does not imply causation'],
        ['Suggest a confounding variable.', 1, 'Hot weather'],
        ['How might the researcher reduce the effect of this variable?', 1, 'Compare days with similar temperatures']
      ]);
    },
    function () {
      return Q('Critical values for a one-tailed test at 5%: ' + Object.keys(CV1).map(function (k) { return 'n = ' + k + ': ' + CV1[k]; }).join(', ') + '.', [
        ['Describe how the critical value changes as ' + M('n') + ' increases, and explain.', 2, 'It decreases: with more data, weaker correlations become convincing'],
        ['What is the smallest ' + M('n') + ' in the table for which ' + M('r = 0.45') + ' is significant?', 1, 15]
      ]);
    }
  ]);

  X('a2-probability', [
    function () {
      var p = ri(1, 5) / 10, a = ri(5, 9) / 10, b = ri(1, 4) / 10;
      var pos = p * a + (1 - p) * b;
      return Q('A factory has machines A and B. ' + p * 100 + '% of items come from A. Faulty rates are ' + (1 - a).toFixed(1) + ' for A and ' + b + ' for B.', [
        ['Find the probability an item is faulty.', 2, d4(p * (1 - a) + (1 - p) * b)],
        ['Given an item is faulty, find the probability it came from A.', 2, d4(p * (1 - a) / (p * (1 - a) + (1 - p) * b))],
        ['Explain why the answers differ from the original proportions.', 1, 'Faulty items are more likely from the machine with the higher fault rate']
      ]);
    },
    function () {
      var pa = ri(2, 6) / 10, pb = ri(2, 6) / 10, pab = +(pa * pb + pick([0, 0.02, -0.02])).toFixed(2);
      return Q(M('P(A) = ' + pa + ',\\ P(B) = ' + pb + ',\\ P(A \\cap B) = ' + pab) + '.', [
        ['Find ' + M('P(A \\mid B)') + ' and ' + M('P(B \\mid A)') + '.', 2, d4(pab / pb) + ' and ' + d4(pab / pa)],
        ['Are ' + M('A') + ' and ' + M('B') + ' independent? Use conditional probability.', 2, Math.abs(pab - pa * pb) < 1e-9 ? 'Yes: ' + M('P(A \\mid B) = P(A)') : 'No: ' + M('P(A \\mid B) \\ne P(A)')],
        ['Find ' + M('P(A \\mid B’)') + '.', 2, d4((pa - pab) / (1 - pb))]
      ]);
    },
    function () {
      var pa = ri(3, 6) / 10, pb = ri(2, 5) / 10, u = +(pa + pb - ri(1, 2) / 10).toFixed(1);
      var ab = +(pa + pb - u).toFixed(2);
      return Q(M('P(A) = ' + pa + ',\\ P(B) = ' + pb + ',\\ P(A \\cup B) = ' + u) + '.', [
        ['Find ' + M('P(A \\cap B)') + '.', 1, ab],
        ['Find ' + M('P(A \\mid B)') + ' and ' + M('P(A’ \\mid B’)') + '.', 3, d4(ab / pb) + ' and ' + d4((1 - u) / (1 - pb))],
        ['Find ' + M('P(A \\cup B \\mid B)') + ' and explain.', 1, '1: if ' + M('B') + ' happens, ' + M('A \\cup B') + ' does']
      ]);
    },
    function () {
      var p = pick([0.6, 0.7]), q = pick([0.5, 0.6]), r = pick([0.3, 0.4]);
      return Q('A player wins her first game with probability ' + p + '. After a win, she wins the next with probability ' + q + '; after a loss, with probability ' + r + '.', [
        ['Find the probability she wins exactly two of the first three games.', 4, d4(p * q * (1 - q) + p * (1 - q) * r + (1 - p) * r * q)],
        ['Given she won the third game, find the probability she won the first.', 3, (function () { var w3 = p * q * q + p * (1 - q) * r + (1 - p) * r * q + (1 - p) * (1 - r) * r; var w1w3 = p * q * q + p * (1 - q) * r; return d4(w1w3 / w3); })()]
      ]);
    },
    function () {
      var a = ri(30, 50), b = ri(20, 40), c = ri(10, 30), ab = ri(5, 10), bc = ri(3, 8), ac = ri(4, 9), abc = ri(1, 3), n = a + b + c - ab - bc - ac + abc + ri(5, 20);
      var onlyA = a - ab - ac + abc;
      return Q('In a group of ' + n + ', ' + a + ' play football, ' + b + ' play tennis, ' + c + ' swim; ' + ab + ' play football and tennis, ' + bc + ' play tennis and swim, ' + ac + ' play football and swim, and ' + abc + ' do all three.', [
        ['Find the number who only play football.', 2, onlyA],
        ['Find ' + M('P(\\text{swim} \\mid \\text{football})') + '.', 2, M(F(ac, a))],
        ['Find the number who do none of these.', 2, n - (a + b + c - ab - bc - ac + abc)]
      ]);
    },
    function () {
      return Q('Independence via conditional probability.', [
        ['Prove that if ' + M('P(B \\mid A) = P(B \\mid A’)') + ', then ' + M('A') + ' and ' + M('B') + ' are independent.', 3, 'Let both equal ' + M('k') + '; then ' + M('P(B) = kP(A) + kP(A’) = k') + ', so ' + M('P(B \\mid A) = P(B)')],
        ['Give an everyday example.', 1, 'The chance of rain tomorrow is the same whether or not you carry an umbrella']
      ]);
    },
    function () {
      var n = 52;
      return Q('Two cards are drawn without replacement from a standard pack.', [
        ['Find ' + M('P(\\text{second is a heart} \\mid \\text{first is a heart})') + '.', 1, M('\\frac{12}{51}')],
        ['Find the probability that the second card is a heart.', 2, M('\\frac{1}{4}')],
        ['Explain why this equals the probability for the first card.', 1, 'By symmetry, without information about the first card, every position is equally likely to be a heart']
      ]);
    },
    function () {
      return Q('Cards are dealt from a shuffled pack until the first ace appears.', [
        ['Find the probability the first ace is the 3rd card.', 2, M('\\frac{48}{52} \\times \\frac{47}{51} \\times \\frac{4}{50} = ' + d4(48 / 52 * 47 / 51 * 4 / 50))],
        ['Find the probability that no ace appears in the first 5 cards.', 2, d4(48 / 52 * 47 / 51 * 46 / 50 * 45 / 49 * 44 / 48)],
        ['Explain why these events are not independent trials.', 1, 'The pack changes after each card']
      ]);
    },
    function () {
      var a = ri(20, 40), b = ri(20, 40), c = ri(10, 30), d = ri(10, 30), t = a + b + c + d;
      return Q('A survey: Year 12 — ' + a + ' prefer maths, ' + b + ' prefer English; Year 13 — ' + c + ' prefer maths, ' + d + ' prefer English.', [
        ['Find ' + M('P(\\text{maths} \\mid \\text{Year 13})') + '.', 1, M(F(c, c + d))],
        ['Find ' + M('P(\\text{Year 13} \\mid \\text{maths})') + '.', 1, M(F(c, a + c))],
        ['Is preference independent of year? Justify.', 2, (a * d === b * c ? 'Yes' : 'No') + ': compare ' + M(F(a, a + b)) + ' with ' + M(F(c, c + d))]
      ]);
    },
    function () {
      var pa = ri(2, 4) / 10, pb = ri(2, 4) / 10;
      return Q(M('A') + ' and ' + M('B') + ' are mutually exclusive with ' + M('P(A) = ' + pa + ',\\ P(B) = ' + pb) + '.', [
        ['Find ' + M('P(A \\mid B)') + '.', 1, 0],
        ['Find ' + M('P(A \\mid B’)') + '.', 2, d4(pa / (1 - pb))],
        ['Explain why ' + M('P(A \\mid B’) > P(A)') + '.', 1, 'Knowing ' + M('B') + ' did not happen removes outcomes that cannot be ' + M('A')]
      ]);
    }
  ]);

  X('a2-normal', [
    function () {
      var mu = ri(40, 80), s = ri(4, 12), a = mu + ri(2, 15), b = mu - ri(2, 15);
      return Q(M('X \\sim N(' + mu + ', ' + s * s + ')') + '.', [
        ['Find ' + M('P(X > ' + a + ')') + '.', 2, d4(1 - Phi((a - mu) / s))],
        ['Find ' + M('P(' + b + ' < X < ' + a + ')') + '.', 2, d4(Phi((a - mu) / s) - Phi((b - mu) / s))],
        ['Find ' + M('P(X = ' + mu + ')') + ' and explain.', 1, '0: a continuous variable has zero probability at a single value']
      ]);
    },
    function () {
      var mu = ri(100, 200), p = pick([0.05, 0.1, 0.025]), z = Z[p], s = ri(5, 20), a = mu + Math.round(z * s);
      return Q('The mass of a bag is ' + M('N(' + mu + ', \\sigma^2)') + ' grams. ' + p * 100 + '% of bags weigh more than ' + a + ' g.', [
        ['Find ' + M('\\sigma') + '.', 3, M('\\frac{' + (a - mu) + '}{' + z + '} = ' + sf3((a - mu) / z))],
        ['Find the probability a bag weighs less than ' + (2 * mu - a) + ' g.', 1, p],
        ['Explain the symmetry used.', 1, 'The normal curve is symmetric about the mean']
      ]);
    },
    function () {
      var mu = ri(50, 100), s = ri(5, 15);
      var a = mu + Math.round(1.2816 * s), b = mu - Math.round(0.8416 * s);
      return Q('For a normal variable, ' + M('P(X > ' + a + ') = 0.1') + ' and ' + M('P(X < ' + b + ') = 0.2') + '.', [
        ['Write two equations using the standard normal.', 2, M('\\frac{' + a + ' - \\mu}{\\sigma} = 1.2816') + ', ' + M('\\frac{' + b + ' - \\mu}{\\sigma} = -0.8416')],
        ['Solve for ' + M('\\mu') + ' and ' + M('\\sigma') + '.', 3, (function () { var sg = (a - b) / (1.2816 + 0.8416), m = a - 1.2816 * sg; return M('\\mu = ' + sf3(m) + ',\\ \\sigma = ' + sf3(sg)); })()]
      ]);
    },
    function () {
      var mu = ri(150, 180), s = ri(5, 10);
      return Q('Heights are ' + M('N(' + mu + ', ' + s * s + ')') + ' cm.', [
        ['Find the height exceeded by the tallest 10%.', 2, sf3(mu + 1.2816 * s) + ' cm'],
        ['Find the interquartile range.', 2, sf3(2 * 0.6745 * s) + ' cm'],
        ['Express the IQR as a multiple of ' + M('\\sigma') + '.', 1, 'About ' + M('1.35\\sigma')]
      ]);
    },
    function () {
      var n = pick([50, 80, 100]), p = pick([0.3, 0.4, 0.5]), k = Math.round(n * p) + ri(3, 8);
      var mu = n * p, sd = Math.sqrt(n * p * (1 - p));
      return Q(M('X \\sim B(' + n + ', ' + p + ')') + '. Use a normal approximation.', [
        ['State the approximating distribution and why it is valid.', 2, M('N(' + num(mu) + ', ' + sf3(sd * sd) + ')') + '; ' + M('n') + ' large and ' + M('p') + ' near 0.5'],
        ['Estimate ' + M('P(X \\ge ' + k + ')') + ' using a continuity correction.', 3, d4(1 - Phi((k - 0.5 - mu) / sd))],
        ['Explain the continuity correction.', 1, 'Each integer value is represented by an interval of width 1 on the continuous scale']
      ]);
    },
    function () {
      var mu = ri(40, 60), s = ri(4, 10), n = pick([16, 25, 36]), xb = +(mu + pick([1.2, 2, 2.8]) * s / Math.sqrt(n)).toFixed(1);
      var z = (xb - mu) / (s / Math.sqrt(n));
      return Q('A machine fills bottles with mean ' + mu + ' ml and sd ' + s + ' ml. A sample of ' + n + ' has mean ' + xb + ' ml. Test at 5% whether the mean has increased.', [
        ['State the distribution of the sample mean under ' + M('H_0') + '.', 1, M('\\bar{X} \\sim N\\left(' + mu + ', \\frac{' + s * s + '}{' + n + '}\\right)')],
        ['Carry out the test.', 3, M('z = ' + sf3(z)) + '; ' + (z > 1.6449 ? 'reject ' + M('H_0') + ': evidence of an increase' : 'do not reject ' + M('H_0'))]
      ]);
    },
    function () {
      var mu = ri(20, 40), s = ri(2, 6), a = mu + s;
      var p = 1 - Phi(1);
      return Q('Lifetimes are ' + M('N(' + mu + ', ' + s * s + ')') + ' months. Three are chosen independently.', [
        ['Find the probability that one exceeds ' + a + ' months.', 1, d4(p)],
        ['Find the probability that all three exceed ' + a + ' months.', 1, d4(p * p * p)],
        ['Find the probability that exactly one exceeds ' + a + ' months.', 2, d4(3 * p * (1 - p) * (1 - p))]
      ]);
    },
    function () {
      var k = pick([1, 2, 3]);
      return Q('For any normal distribution, find ' + M('P(\\mu - ' + (k === 1 ? '' : k) + '\\sigma < X < \\mu + ' + (k === 1 ? '' : k) + '\\sigma)') + '.', [
        ['Find the probability.', 2, d4(Phi(k) - Phi(-k))],
        ['Explain why it does not depend on ' + M('\\mu') + ' or ' + M('\\sigma') + '.', 1, 'Standardising gives ' + M('P(-' + k + ' < Z < ' + k + ')')],
        ['Use this to describe the “68–95–99.7” rule.', 1, 'About 68%, 95%, 99.7% within 1, 2, 3 sd']
      ]);
    },
    function () {
      return Q('The normal curve ' + M('f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{(x - \\mu)^2}{2\\sigma^2}}') + '.', [
        ['Show that the maximum is at ' + M('x = \\mu') + '.', 2, 'The exponent is largest (0) there'],
        ['The points of inflection are at ' + M('\\mu \\pm \\sigma') + '. Explain how this helps sketch the curve.', 1, 'The curve changes from concave to convex one sd from the mean'],
        ['Explain why the total area is 1.', 1, 'It is a probability density function']
      ]);
    },
    function () {
      var m = ri(40, 60), med = m + pick([0, 0, 4]), s = ri(5, 10);
      return Q('A data set has mean ' + m + ', median ' + med + ' and sd ' + s + '.', [
        ['Is a normal model appropriate? Explain.', 2, med === m ? 'Plausibly: mean equals median, suggesting symmetry' : 'Probably not: mean ≠ median suggests skew'],
        ['What proportion of the data would you expect within ' + (m - 2 * s) + ' and ' + (m + 2 * s) + ' if it were normal?', 1, 'About 95%'],
        ['Suggest a way to check normality.', 1, 'Draw a histogram and look for a symmetric bell shape']
      ]);
    }
  ]);

  X('a2-moments', [
    function () {
      var L = ri(4, 8), w = ri(50, 200), a = ri(Math.ceil(L / 2), L);
      var Rb = w * (L / 2) / a, Ra = w - Rb;
      return Q('A uniform beam of length ' + L + ' m and weight ' + w + ' N rests on supports at one end ' + M('A') + ' and at ' + M('B') + ', ' + a + ' m from ' + M('A') + '.', [
        ['Find the reactions.', 3, 'At ' + M('B') + ': ' + sf3(Rb) + ' N; at ' + M('A') + ': ' + sf3(Ra) + ' N'],
        ['Explain what a negative reaction would mean.', 1, 'The beam would tip; the support cannot pull'],
        ['For which positions of ' + M('B') + ' is the beam in equilibrium?', 1, M('AB \\ge ' + L / 2) + ' m']
      ]);
    },
    function () {
      var L = 2 * ri(2, 5), w = ri(100, 300), p = ri(400, 800), c = ri(1, L / 2 - 1);
      var x = (w * (L / 2 - c) - 0) / p;
      return Q('A uniform plank of length ' + L + ' m and weight ' + w + ' N rests on supports ' + c + ' m from each end. A person of weight ' + p + ' N walks along it.', [
        ['Find how far beyond a support the person can walk before the plank tips.', 3, sf3(w * (L / 2 - c) / p) + ' m'],
        ['Can they reach the end? Explain.', 1, w * (L / 2 - c) / p >= c ? 'Yes' : 'No: the end is ' + c + ' m beyond the support'],
        ['What is the reaction at the other support at the point of tipping?', 1, '0']
      ]);
    },
    function () {
      var L = ri(4, 8), W = ri(100, 300), x = ri(10, L * 10 - 10) / 10;
      var Ra = W * (L - x) / L, Rb = W - Ra;
      return Q('A non-uniform rod of length ' + L + ' m and weight ' + W + ' N rests on supports at its ends. The reactions are ' + sf3(Ra) + ' N and ' + sf3(Rb) + ' N.', [
        ['Find the distance of the centre of mass from the end with the larger reaction.', 3, sf3(Ra >= Rb ? x : L - x) + ' m'],
        ['Explain why the larger reaction is nearer the centre of mass.', 1, 'Taking moments, the support nearer the weight carries more of it']
      ]);
    },
    function () {
      var L = ri(4, 8), w = ri(60, 200), m = ri(20, 100), d = ri(1, L - 1);
      var T2 = (w * L / 2 + m * d) / L, T1 = w + m - T2;
      return Q('A uniform beam of length ' + L + ' m and weight ' + w + ' N hangs horizontally from two vertical strings at its ends. A load of ' + m + ' N is placed ' + d + ' m from the left end.', [
        ['Find the tensions.', 3, 'Left ' + sf3(T1) + ' N, right ' + sf3(T2) + ' N'],
        ['Where should the load be placed for equal tensions?', 1, 'At the centre'],
        ['If each string breaks above 200 N, find the largest load that can be placed at the left end.', 2, sf3(Math.max(0, 200 - w / 2)) + ' N']
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(2, 6), F1 = ri(10, 50);
      return Q('A seesaw is pivoted at its centre. A child of weight ' + F1 * b + ' N sits ' + a + ' m from the pivot.', [
        ['Where must a child of weight ' + F1 * a + ' N sit to balance?', 2, b + ' m on the other side'],
        ['A third child of weight 200 N sits next to the first child. How far from the pivot must the second child now sit?', 2, sf3(b + 200 / F1) + ' m'],
        ['Explain why the pivot reaction does not appear in the moments equation.', 1, 'Moments are taken about the pivot, where it has zero moment']
      ]);
    },
    function () {
      var L = ri(3, 6), W = ri(50, 150), h = ri(1, L - 1);
      return Q('A uniform plank of length ' + L + ' m and weight ' + W + ' N lies on a table with ' + h + ' m overhanging the edge.', [
        ['Find the greatest weight that can be hung from the overhanging end without tipping.', 3, h >= L / 2 ? 'None: the plank already tips' : sf3(W * (L / 2 - h) / h) + ' N'],
        ['Explain where the reaction acts at the point of tipping.', 1, 'At the table edge'],
        ['How does the answer change if the overhang is halved?', 1, 'The weight that can be hung increases']
      ]);
    },
    function () {
      var L = ri(4, 10), W = ri(100, 300);
      return Q('A uniform beam ' + L + ' m long, weight ' + W + ' N, rests on supports at its ends. Each support can provide at most ' + W + ' N.', [
        ['Find the greatest load that can be placed at the centre.', 2, W + ' N'],
        ['Find the greatest load that can be placed 1 m from one end.', 3, sf3(W / 2 * L / (L - 1)) + ' N'],
        ['Explain why the second answer is smaller.', 1, 'Most of the load goes to the nearer support']
      ]);
    },
    function () {
      var x = nz(-3, 3), y = nz(-3, 3), a = nz(-5, 5), b = nz(-5, 5);
      return Q('A force ' + M('(' + a + '\\mathbf{i}' + S(b) + '\\mathbf{j})') + ' N acts at the point ' + M('(' + x + ', ' + y + ')') + ' m.', [
        ['Find its moment about the origin (anticlockwise positive).', 2, (x * b - y * a) + ' N m'],
        ['Find a point on the ' + M('x') + '-axis about which the moment is zero.', 2, M('(' + sf3(x - y * a / b) + ', 0)')],
        ['Explain why such a point lies on the line of action of the force.', 1, 'The perpendicular distance is zero']
      ]);
    },
    function () {
      var L = ri(4, 8), W = ri(80, 200), c = ri(1, 3);
      return Q('A non-uniform rod of length ' + L + ' m hangs horizontally from two strings, one at each end. The tension in one string is ' + c + ' times the other.', [
        ['Find the position of the centre of mass.', 3, sf3(L * c / (c + 1)) + ' m from the end with the smaller tension'],
        ['If the weight is ' + W + ' N, find the tensions.', 2, sf3(W / (c + 1)) + ' N and ' + sf3(W * c / (c + 1)) + ' N']
      ]);
    },
    function () {
      var L = ri(3, 6), W = ri(50, 150), F1 = ri(20, 60);
      return Q('A uniform rod of length ' + L + ' m and weight ' + W + ' N is hinged at one end and held horizontal by a vertical force at the other end.', [
        ['Find the vertical force needed.', 2, sf3(W / 2) + ' N'],
        ['Find the force at the hinge.', 1, sf3(W / 2) + ' N upwards'],
        ['If the force acts at 30° to the rod instead, find its magnitude.', 2, sf3(W) + ' N']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
