/* Byte Size Classroom — Pearson Edexcel A level Further Mathematics: Further Statistics 1.
   Difficulty: 1 = Standard, 2 = Exam, 3 = Challenging (extension questions). */
(function (g) {
  var BS = g.BS, A = BS.fa, M = BS.m;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, frac = BS.frac, num = BS.num;
  var Q = A.Q, sf3 = A.sf3, d4 = A.d4, C = A.C, fact = A.fact, pois = A.pois, pcdf = A.pcdf, bin = A.bin, sum = A.sum;
  var X = BS.ext, T = BS.topic, Cn = BS.concept, Sr = String.raw;
  function erf(x) { var s = x < 0 ? -1 : 1; x = Math.abs(x); var t = 1 / (1 + 0.3275911 * x); var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return s * y; }
  function Phi(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
  var CV = { 1: 3.841, 2: 5.991, 3: 7.815, 4: 9.488, 5: 11.070, 6: 12.592 };
  function table(head, rows) { return '<div class="qtable"><table><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>'; }
  function geo(p, x) { return Math.pow(1 - p, x - 1) * p; }
  function nb(r, p, x) { return C(x - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, x - r); }

  /* ---------------- Discrete random variables ---------------- */
  T({ id: 'fs-drv', name: 'Discrete random variables: expectation and variance', video: 'further statistics discrete random variables expectation variance', gens: [
    { d: [1], f: function () {
      var xs = [1, 2, 3, 4], ps = [ri(1, 3), ri(2, 4), ri(2, 4), 0]; ps[3] = 10 - ps[0] - ps[1] - ps[2]; if (ps[3] < 1) { ps = [2, 3, 3, 2]; }
      var E = sum(xs.map(function (x, i) { return x * ps[i] / 10; })), E2 = sum(xs.map(function (x, i) { return x * x * ps[i] / 10; }));
      return Q('The random variable ' + M('X') + ' has this distribution.' + table([M('x'), '1', '2', '3', '4'], [[M('P(X = x)')].concat(ps.map(function (p) { return num(p / 10); }))]), [
        ['Find ' + M('E(X)') + ' and ' + M('E(X^2)') + '.', 2, sf3(E) + ' and ' + sf3(E2)],
        ['Find ' + M('\\text{Var}(X)') + '.', 1, sf3(E2 - E * E)],
        ['Find ' + M('E(3X - 2)') + ' and ' + M('\\text{Var}(3X - 2)') + '.', 2, sf3(3 * E - 2) + ' and ' + sf3(9 * (E2 - E * E))]
      ]);
    } },
    { d: [1, 2], f: function () {
      var a = ri(1, 3), b = ri(1, 3), k = 1 / (a + 2 * b + 3 * a + 4 * b);
      return Q(M('P(X = x) = kx') + ' for ' + M('x = 1, 2, 3, 4') + '.', [
        ['Find ' + M('k') + '.', 1, M('\\frac{1}{10}')],
        ['Find ' + M('E(X)') + ' and ' + M('\\text{Var}(X)') + '.', 3, '3 and 1'],
        ['Find ' + M('E\\left(\\frac{1}{X}\\right)') + '.', 2, M('\\frac{4}{10} = \\frac{2}{5}')]
      ]);
    } },
    { d: [2], f: function () {
      var c = ri(1, 3), w = ri(4, 8);
      var E = (w - c) / 6 - 5 * c / 6, E2 = (Math.pow(w - c, 2) + 5 * c * c) / 6;
      return Q('A game costs £' + c + '. A fair die is rolled; a 6 returns £' + w + ' (including the stake). ' + M('G') + ' is the gain in pounds.', [
        ['Write the distribution of ' + M('G') + '.', 2, M('P(G = ' + (w - c) + ') = \\frac{1}{6}') + ', ' + M('P(G = -' + c + ') = \\frac{5}{6}')],
        ['Find ' + M('E(G)') + ' and ' + M('\\text{Var}(G)') + '.', 3, sf3(E) + ' and ' + sf3(E2 - E * E)],
        ['A player plays 50 times. Find the expected total gain and its standard deviation.', 2, sf3(50 * E) + ' and ' + sf3(Math.sqrt(50 * (E2 - E * E)))]
      ]);
    } },
    { d: [2, 3], f: function () {
      var mu = ri(3, 8), s2 = ri(2, 6), a = ri(2, 5), b = nz(-5, 5);
      return Q(M('E(X) = ' + mu) + ' and ' + M('\\text{Var}(X) = ' + s2) + '.', [
        ['Find ' + M('E(X^2)') + '.', 1, s2 + mu * mu],
        ['Find ' + M('E(' + a + 'X' + (b < 0 ? ' - ' + (-b) : ' + ' + b) + ')') + ' and ' + M('\\text{Var}(' + a + 'X' + (b < 0 ? ' - ' + (-b) : ' + ' + b) + ')') + '.', 2, (a * mu + b) + ' and ' + a * a * s2],
        ['Find ' + M('E[(X - 1)^2]') + '.', 2, s2 + mu * mu - 2 * mu + 1]
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Two fair dice are rolled and ' + M('X') + ' is the larger score.', [
        ['Show that ' + M('P(X = x) = \\frac{2x - 1}{36}') + ' for ' + M('x = 1, \\ldots, 6') + '.', 3, M('P(X \\le x) = \\frac{x^2}{36}') + ', subtract ' + M('\\frac{(x - 1)^2}{36}')],
        ['Find ' + M('E(X)') + '.', 2, M('\\frac{161}{36}')],
        ['Find ' + M('P(X \\ge 5)') + '.', 1, M('\\frac{20}{36} = \\frac{5}{9}')]
      ]);
    } }
  ] });
  X('fs-drv', [
    function () {
      var p = pick([0.2, 0.3, 0.4]), q = pick([0.1, 0.2]);
      var a = 1 - p - q;
      return Q(M('X') + ' takes values 0, 1, 2 with probabilities ' + M('a, b, c') + '. ' + M('E(X) = ' + num(q * 2 + p)) + ' and ' + M('\\text{Var}(X) = ' + sf3(p + 4 * q - Math.pow(p + 2 * q, 2))) + '.', [
        ['Form three equations.', 2, M('a + b + c = 1') + ', ' + M('b + 2c = ' + num(p + 2 * q)) + ', ' + M('b + 4c = ' + sf3(p + 4 * q))],
        ['Solve them.', 3, M('a = ' + num(a) + ',\\ b = ' + p + ',\\ c = ' + q)]
      ]);
    },
    function () {
      var n = ri(4, 8);
      return Q(M('X') + ' is uniformly distributed on ' + M('\\{1, 2, \\ldots, n\\}') + '.', [
        ['Show that ' + M('E(X) = \\frac{n + 1}{2}') + ' and ' + M('\\text{Var}(X) = \\frac{n^2 - 1}{12}') + '.', 4, 'Use ' + M('\\sum r') + ' and ' + M('\\sum r^2')],
        ['For ' + M('n = ' + n) + ', find ' + M('P(|X - E(X)| < \\sigma)') + '.', 2, (function () { var m = (n + 1) / 2, s = Math.sqrt((n * n - 1) / 12), c = 0; for (var x = 1; x <= n; x++) if (Math.abs(x - m) < s) c++; return M(frac(c, n)); })()]
      ]);
    },
    function () {
      return Q('A coin is tossed until a head appears or 4 tosses are made. ' + M('X') + ' is the number of tosses.', [
        ['Find the distribution of ' + M('X') + '.', 3, M('\\frac{1}{2}, \\frac{1}{4}, \\frac{1}{8}, \\frac{1}{8}')],
        ['Find ' + M('E(X)') + '.', 2, M('\\frac{15}{8}')],
        ['Find ' + M('\\text{Var}(X)') + '.', 2, M('\\frac{71}{64}')]
      ]);
    },
    function () {
      var a = ri(2, 5), b = ri(1, 4);
      return Q(M('X') + ' and ' + M('Y') + ' are independent with ' + M('\\text{Var}(X) = ' + a) + ' and ' + M('\\text{Var}(Y) = ' + b) + '.', [
        ['Find ' + M('\\text{Var}(X + Y)') + ' and ' + M('\\text{Var}(X - Y)') + '.', 2, (a + b) + ' and ' + (a + b)],
        ['Find ' + M('\\text{Var}(2X - 3Y)') + '.', 2, 4 * a + 9 * b],
        ['Explain why ' + M('\\text{Var}(X - Y)') + ' is not ' + M('\\text{Var}(X) - \\text{Var}(Y)') + '.', 1, 'Variances of independent variables add, even for differences']
      ]);
    },
    function () {
      var k = ri(2, 5);
      return Q(M('P(X = x) = \\frac{c}{x(x + 1)}') + ' for ' + M('x = 1, 2, \\ldots, ' + k) + '.', [
        ['Find ' + M('c') + ' using the method of differences.', 3, M('c = ' + frac(k + 1, k))],
        ['Find ' + M('P(X = 1)') + '.', 1, M(frac(k + 1, 2 * k))]
      ]);
    }
  ]);

  /* ---------------- Poisson distribution ---------------- */
  T({ id: 'fs-poisson', name: 'The Poisson distribution', video: 'further statistics poisson distribution', gens: [
    { d: [1], f: function () {
      var l = pick([1.5, 2, 2.5, 3, 4]);
      return Q('Calls arrive at a rate of ' + l + ' per minute. ' + M('X \\sim \\text{Po}(' + l + ')') + '.', [
        ['Find ' + M('P(X = 2)') + '.', 1, d4(pois(l, 2))],
        ['Find ' + M('P(X \\le 3)') + ' and ' + M('P(X > 4)') + '.', 2, d4(pcdf(l, 3)) + ' and ' + d4(1 - pcdf(l, 4))],
        ['Find the probability of exactly 5 calls in 2 minutes.', 2, d4(pois(2 * l, 5))]
      ]);
    } },
    { d: [1, 2], f: function () {
      var a = pick([1, 1.5, 2]), b = pick([2, 2.5, 3]);
      return Q('Faults in two machines are independent: ' + M('X \\sim \\text{Po}(' + a + ')') + ' and ' + M('Y \\sim \\text{Po}(' + b + ')') + ' per day.', [
        ['State the distribution of ' + M('X + Y') + '.', 1, M('\\text{Po}(' + (a + b) + ')')],
        ['Find ' + M('P(X + Y \\le 2)') + '.', 2, d4(pcdf(a + b, 2))],
        ['Given ' + M('X + Y = 3') + ', find ' + M('P(X = 1)') + '.', 3, d4(pois(a, 1) * pois(b, 2) / pois(a + b, 3))]
      ]);
    } },
    { d: [2], f: function () {
      var n = pick([100, 200, 400]), p = pick([0.01, 0.02]);
      var l = n * p;
      return Q('A machine makes items, ' + p * 100 + '% faulty. ' + M('X') + ' is the number faulty in ' + n + '.', [
        ['Explain why a Poisson approximation is suitable.', 1, M('n') + ' large, ' + M('p') + ' small'],
        ['Use it to find ' + M('P(X \\le 2)') + '.', 2, d4(pcdf(l, 2))],
        ['Find the exact binomial probability and comment.', 2, (function () { var s = 0; for (var k = 0; k <= 2; k++) s += bin(n, p, k); return d4(s); })() + ': very close']
      ]);
    } },
    { d: [2, 3], f: function () {
      var f = [ri(15, 25), ri(25, 35), ri(15, 25), ri(6, 12), ri(2, 6)];
      var N = sum(f), m = sum(f.map(function (v, i) { return i * v; })) / N, v2 = sum(f.map(function (v, i) { return i * i * v; })) / N - m * m;
      return Q('Goals per match:' + table([M('x'), '0', '1', '2', '3', '4'], [['Frequency'].concat(f)]), [
        ['Find the mean and variance.', 3, sf3(m) + ' and ' + sf3(v2)],
        ['Comment on whether a Poisson model is suitable.', 1, Math.abs(v2 - m) / m < 0.2 ? 'Yes: mean ≈ variance' : 'Doubtful: mean and variance differ'],
        ['Find the expected number of matches with no goals under ' + M('\\text{Po}(' + sf3(m) + ')') + '.', 2, sf3(N * pois(m, 0))]
      ]);
    } },
    { d: [2, 3], f: function () {
      var l = pick([0.5, 0.8, 1.2]);
      return Q('Flaws occur at ' + l + ' per metre of cloth.', [
        ['Find the probability that a 4 m length has at most 2 flaws.', 2, d4(pcdf(4 * l, 2))],
        ['Find the greatest length for which the probability of no flaws is at least 0.9.', 2, sf3(-Math.log(0.9) / l) + ' m'],
        ['Find the probability that exactly 3 of 5 one-metre pieces have no flaws.', 3, d4(bin(5, Math.exp(-l), 3))]
      ]);
    } }
  ] });
  X('fs-poisson', [
    function () {
      var l = pick([2, 3, 4]);
      return Q(M('X \\sim \\text{Po}(\\lambda)') + ' and ' + M('P(X = ' + (l - 1) + ') = P(X = ' + l + ')') + '.', [
        ['Find ' + M('\\lambda') + '.', 2, l],
        ['Find ' + M('P(X \\ge 2)') + '.', 2, d4(1 - pcdf(l, 1))]
      ]);
    },
    function () {
      var l = pick([1.5, 2]);
      return Q('Emails arrive at ' + l + ' per hour.', [
        ['Find the probability of at least one email in each of three separate hours.', 2, d4(Math.pow(1 - Math.exp(-l), 3))],
        ['Find the probability of at least 3 emails in the three hours.', 2, d4(1 - pcdf(3 * l, 2))],
        ['Explain why these answers differ.', 1, 'The first requires every hour to have an email; the second only counts the total']
      ]);
    },
    function () {
      var l = pick([3, 5]);
      return Q('Show that for ' + M('X \\sim \\text{Po}(\\lambda)') + ', ' + M('E(X) = \\lambda') + '.', [
        ['Write ' + M('E(X)') + ' as a series and simplify.', 3, M('\\sum_{x \\ge 1} x\\frac{e^{-\\lambda}\\lambda^x}{x!} = \\lambda\\sum_{x \\ge 1}\\frac{e^{-\\lambda}\\lambda^{x-1}}{(x - 1)!} = \\lambda')],
        ['For ' + M('\\lambda = ' + l) + ', find ' + M('P(X = \\text{mode})') + '.', 2, d4(pois(l, l))]
      ]);
    },
    function () {
      var l = pick([2, 3]);
      return Q('For ' + M('X \\sim \\text{Po}(' + l + ')') + ', find ' + M('k') + ' such that ' + M('P(X \\le k) > 0.95') + ' for the smallest ' + M('k') + '.', [
        ['Tabulate cumulative probabilities.', 2, [0, 1, 2, 3, 4, 5, 6].map(function (k) { return d4(pcdf(l, k)); }).join(', ')],
        ['Find ' + M('k') + '.', 1, (function () { for (var k = 0; ; k++) if (pcdf(l, k) > 0.95) return k; })()]
      ]);
    },
    function () {
      var a = pick([1, 2]), b = pick([1.5, 2.5]);
      return Q(M('X \\sim \\text{Po}(' + a + ')') + ' and ' + M('Y \\sim \\text{Po}(' + b + ')') + ' are independent.', [
        ['Find ' + M('E(2X - Y)') + ' and ' + M('\\text{Var}(2X - Y)') + '.', 2, (2 * a - b) + ' and ' + (4 * a + b)],
        ['Explain why ' + M('2X - Y') + ' cannot be Poisson.', 1, 'It can be negative, and its mean and variance differ']
      ]);
    }
  ]);

  /* ---------------- Geometric and negative binomial ---------------- */
  T({ id: 'fs-geometric', name: 'Geometric and negative binomial distributions', video: 'further statistics geometric negative binomial distribution', gens: [
    { d: [1], f: function () {
      var p = pick([0.1, 0.2, 0.25, 0.3]), x = ri(3, 6);
      return Q('Each attempt succeeds with probability ' + p + '. ' + M('X') + ' is the number of attempts up to and including the first success.', [
        ['State the distribution of ' + M('X') + '.', 1, M('\\text{Geo}(' + p + ')')],
        ['Find ' + M('P(X = ' + x + ')') + '.', 1, d4(geo(p, x))],
        ['Find ' + M('P(X > ' + x + ')') + ' and ' + M('E(X)') + '.', 2, d4(Math.pow(1 - p, x)) + ' and ' + sf3(1 / p)]
      ]);
    } },
    { d: [1, 2], f: function () {
      var p = pick([0.2, 0.25, 0.4]), r = ri(2, 3), x = r + ri(1, 4);
      return Q(M('X') + ' is the number of trials needed to get ' + r + ' successes, each with probability ' + p + '.', [
        ['Find ' + M('P(X = ' + x + ')') + '.', 2, d4(nb(r, p, x))],
        ['Find ' + M('E(X)') + ' and ' + M('\\text{Var}(X)') + '.', 2, sf3(r / p) + ' and ' + sf3(r * (1 - p) / (p * p))],
        ['Explain the binomial coefficient ' + M('\\binom{' + (x - 1) + '}{' + (r - 1) + '}') + '.', 1, 'The last trial is a success; the other ' + (r - 1) + ' successes can be anywhere in the first ' + (x - 1)]
      ]);
    } },
    { d: [2], f: function () {
      var p = pick([0.1, 0.15, 0.2]), t = pick([0.9, 0.95]);
      return Q('A player keeps trying to hit a target with probability ' + p + ' each time.', [
        ['Find the probability that the first hit is after the 5th attempt.', 1, d4(Math.pow(1 - p, 5))],
        ['Find the least number of attempts ' + M('n') + ' with ' + M('P(X \\le n) > ' + t) + '.', 3, Math.ceil(Math.log(1 - t) / Math.log(1 - p))],
        ['Show that ' + M('P(X > a + b \\mid X > a) = P(X > b)') + '.', 2, M('\\frac{(1 - p)^{a + b}}{(1 - p)^a}') + ': the memoryless property']
      ]);
    } },
    { d: [2, 3], f: function () {
      var p = pick([0.25, 0.4, 0.5]);
      return Q(M('X \\sim \\text{Geo}(' + p + ')') + '.', [
        ['Find ' + M('P(X \\text{ is even})') + '.', 3, M('\\frac{(1 - p)p}{1 - (1 - p)^2} = ' + sf3((1 - p) / (2 - p)))],
        ['Find the mode of ' + M('X') + ' and explain.', 1, '1: the probabilities decrease']
      ]);
    } },
    { d: [2, 3], f: function () {
      var p = pick([0.3, 0.5]), r = 3;
      return Q('A basketball player needs 3 successful shots; each succeeds with probability ' + p + '.', [
        ['Find the probability that exactly 5 shots are needed.', 2, d4(nb(r, p, 5))],
        ['Find the probability that at most 4 shots are needed.', 3, d4(nb(r, p, 3) + nb(r, p, 4))],
        ['State an assumption and comment on it.', 1, 'Independent shots with constant probability; fatigue or confidence may change it']
      ]);
    } }
  ] });
  X('fs-geometric', [
    function () {
      return Q('Derive the mean of the geometric distribution.', [
        ['Write ' + M('E(X) = \\sum_{x \\ge 1} xp(1 - p)^{x - 1}') + ' and use ' + M('\\sum_{x \\ge 1} xq^{x-1} = \\frac{1}{(1 - q)^2}') + '.', 3, M('E(X) = \\frac{p}{p^2} = \\frac{1}{p}')],
        ['Explain the formula informally.', 1, 'On average, ' + M('\\frac{1}{p}') + ' trials give one success']
      ]);
    },
    function () {
      var p = pick([0.2, 0.3]);
      return Q('Two players take turns; each succeeds with probability ' + p + '. The first to succeed wins. A goes first.', [
        ['Find the probability A wins.', 3, sf3(1 / (2 - p))],
        ['Explain why A has the advantage.', 1, 'A gets the first chance']
      ]);
    },
    function () {
      var p = pick([0.2, 0.25]), r = ri(2, 4);
      return Q('A negative binomial ' + M('X') + ' with ' + M('r = ' + r) + ' and ' + M('p = ' + p) + '.', [
        ['Explain why ' + M('X') + ' is the sum of ' + r + ' independent geometric variables.', 2, 'Waiting times between successes are independent geometric'],
        ['Hence find ' + M('E(X)') + ' and ' + M('\\text{Var}(X)') + '.', 2, sf3(r / p) + ' and ' + sf3(r * (1 - p) / (p * p))]
      ]);
    },
    function () {
      var p = pick([0.1, 0.2]);
      return Q('For ' + M('X \\sim \\text{Geo}(' + p + ')') + ', find ' + M('P(X > E(X))') + '.', [
        ['Find it.', 2, d4(Math.pow(1 - p, Math.floor(1 / p)))],
        ['Show that as ' + M('p \\to 0') + ' it tends to ' + M('e^{-1}') + '.', 2, M('(1 - p)^{1/p} \\to e^{-1}')]
      ]);
    },
    function () {
      var p = pick([0.3, 0.4]);
      return Q(M('X \\sim \\text{Geo}(' + p + ')') + ' and ' + M('Y \\sim \\text{Geo}(' + p + ')') + ' are independent.', [
        ['Find ' + M('P(X = Y)') + '.', 3, sf3(p * p / (1 - (1 - p) * (1 - p)))],
        ['Find ' + M('P(X + Y = 4)') + '.', 2, d4(3 * p * p * Math.pow(1 - p, 2))]
      ]);
    }
  ]);

  /* ---------------- Hypothesis testing ---------------- */
  T({ id: 'fs-hypothesis', name: 'Hypothesis tests for Poisson and geometric', video: 'further statistics hypothesis test poisson geometric', gens: [
    { d: [1, 2], f: function () {
      var l = pick([2, 3, 4]), x = l + ri(3, 5);
      var pv = 1 - pcdf(l, x - 1);
      return Q('A shop averages ' + l + ' complaints per week. After a change, there are ' + x + ' in a week. Test at 5% whether the rate has increased.', [
        ['State the hypotheses.', 1, M('H_0: \\lambda = ' + l) + ', ' + M('H_1: \\lambda > ' + l)],
        ['Find ' + M('P(X \\ge ' + x + ')') + '.', 2, d4(pv)],
        ['Conclude in context.', 2, pv < 0.05 ? 'Reject ' + M('H_0') + ': evidence the rate has increased' : 'Do not reject ' + M('H_0') + ': insufficient evidence']
      ]);
    } },
    { d: [2], f: function () {
      var l = pick([3, 4, 5]);
      var c = 0; while (1 - pcdf(l, c - 1) > 0.05) c++;
      return Q('A one-tailed test of ' + M('H_0: \\lambda = ' + l) + ' against ' + M('H_1: \\lambda > ' + l) + ' at 5%.', [
        ['Find the critical region.', 3, M('X \\ge ' + c)],
        ['Find the actual significance level.', 1, d4(1 - pcdf(l, c - 1))]
      ]);
    } },
    { d: [2], f: function () {
      var l = pick([6, 8, 10]);
      var lo = -1; while (pcdf(l, lo + 1) <= 0.025) lo++;
      var hi = 0; while (1 - pcdf(l, hi - 1) > 0.025) hi++;
      return Q('A two-tailed test of ' + M('H_0: \\lambda = ' + l) + ' at 5%.', [
        ['Find the critical region.', 4, (lo >= 0 ? M('X \\le ' + lo) + ' or ' : '') + M('X \\ge ' + hi)],
        ['Find the actual significance level.', 1, d4((lo >= 0 ? pcdf(l, lo) : 0) + 1 - pcdf(l, hi - 1))]
      ]);
    } },
    { d: [2, 3], f: function () {
      var p = pick([0.2, 0.25, 0.3]), x = ri(8, 12);
      var pv = Math.pow(1 - p, x - 1);
      return Q('A darts player claims to hit the bull with probability ' + p + '. Her first hit comes on throw ' + x + '. Test at 5% whether ' + M('p') + ' is lower.', [
        ['State the hypotheses and the test statistic’s distribution.', 2, M('H_0: p = ' + p) + ', ' + M('H_1: p < ' + p) + '; ' + M('X \\sim \\text{Geo}(' + p + ')')],
        ['Find ' + M('P(X \\ge ' + x + ')') + '.', 2, d4(pv)],
        ['Conclude.', 1, pv < 0.05 ? 'Reject ' + M('H_0') : 'Do not reject ' + M('H_0')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var l = pick([1.5, 2]), wks = 4, x = ri(14, 18);
      var L = l * wks, pv = 1 - pcdf(L, x - 1);
      return Q('Accidents averaged ' + l + ' per week. In the next ' + wks + ' weeks there were ' + x + '. Test at 1% whether the rate has increased.', [
        ['State the distribution under ' + M('H_0') + '.', 1, M('\\text{Po}(' + L + ')')],
        ['Find the p-value.', 2, d4(pv)],
        ['Conclude.', 1, pv < 0.01 ? 'Reject ' + M('H_0') : 'Do not reject ' + M('H_0')]
      ]);
    } }
  ] });
  X('fs-hypothesis', [
    function () {
      var l = pick([4, 5]);
      var c = 0; while (1 - pcdf(l, c - 1) > 0.05) c++;
      return Q('A test has critical region ' + M('X \\ge ' + c) + ' for ' + M('H_0: \\lambda = ' + l) + '.', [
        ['Find the probability of a Type I error.', 1, d4(1 - pcdf(l, c - 1))],
        ['If in fact ' + M('\\lambda = ' + (l + 3)) + ', find the probability of a Type II error.', 2, d4(pcdf(l + 3, c - 1))]
      ]);
    },
    function () {
      var p = 0.3;
      var c = 1; while (Math.pow(1 - p, c) > 0.05) c++;
      return Q('A geometric test of ' + M('H_0: p = 0.3') + ' against ' + M('H_1: p < 0.3') + ' at 5%.', [
        ['Find the critical region ' + M('X \\ge c') + '.', 3, M('X \\ge ' + (c + 1))],
        ['Find the actual significance level.', 1, d4(Math.pow(1 - p, c))]
      ]);
    },
    function () {
      return Q('Choosing the hypothesis test.', [
        ['When is a Poisson test appropriate?', 1, 'Counting events in a fixed interval at a constant average rate'],
        ['When is a geometric test appropriate?', 1, 'Counting trials until the first success'],
        ['Why should the hypotheses be stated before collecting data?', 1, 'Otherwise the test can be chosen to suit the data']
      ]);
    },
    function () {
      var l = pick([2, 3]), n = 5;
      return Q('Over 5 days, the total count of an event is used to test ' + M('H_0: \\lambda = ' + l) + ' per day against ' + M('H_1: \\lambda < ' + l) + ' at 5%.', [
        ['State the distribution of the total under ' + M('H_0') + '.', 1, M('\\text{Po}(' + n * l + ')')],
        ['Find the critical region.', 3, (function () { var c = -1; while (pcdf(n * l, c + 1) <= 0.05) c++; return M('X \\le ' + c); })()]
      ]);
    },
    function () {
      return Q('Interpreting a p-value.', [
        ['A p-value is 0.03. What does it mean?', 2, 'If ' + M('H_0') + ' were true, a result at least this extreme would happen 3% of the time'],
        ['Does it give the probability that ' + M('H_0') + ' is true?', 1, 'No']
      ]);
    }
  ]);

  /* ---------------- Central limit theorem ---------------- */
  T({ id: 'fs-clt', name: 'The central limit theorem', video: 'further statistics central limit theorem sample mean', gens: [
    { d: [1, 2], f: function () {
      var mu = ri(20, 50), s = ri(4, 12), n = pick([36, 49, 64, 100]), x = mu + ri(1, 3);
      var se = s / Math.sqrt(n);
      return Q('A population has mean ' + mu + ' and standard deviation ' + s + '. A random sample of ' + n + ' is taken.', [
        ['State the approximate distribution of the sample mean, with a reason.', 2, M('\\bar{X} \\approx N\\left(' + mu + ', \\frac{' + s * s + '}{' + n + '}\\right)') + ' by the central limit theorem (' + M('n') + ' is large)'],
        ['Find ' + M('P(\\bar{X} > ' + x + ')') + '.', 2, d4(1 - Phi((x - mu) / se))]
      ]);
    } },
    { d: [2], f: function () {
      var l = pick([2, 3, 4]), n = pick([40, 50, 80]);
      var se = Math.sqrt(l / n);
      return Q('The number of calls per minute is ' + M('\\text{Po}(' + l + ')') + '. The mean of ' + n + ' minutes is ' + M('\\bar{X}') + '.', [
        ['State the approximate distribution of ' + M('\\bar{X}') + '.', 2, M('N\\left(' + l + ', \\frac{' + l + '}{' + n + '}\\right)')],
        ['Find ' + M('P(\\bar{X} < ' + (l - 0.3) + ')') + '.', 2, d4(Phi(-0.3 / se))]
      ]);
    } },
    { d: [2, 3], f: function () {
      var mu = 3.5, v = 35 / 12, n = pick([30, 50, 100]);
      return Q('A fair die is rolled ' + n + ' times.', [
        ['Find the mean and variance for one roll.', 2, '3.5 and ' + M('\\frac{35}{12}')],
        ['Find the approximate probability that the total exceeds ' + Math.round(3.5 * n + Math.sqrt(n * v)) + '.', 3, d4(1 - Phi((Math.round(3.5 * n + Math.sqrt(n * v)) - 3.5 * n) / Math.sqrt(n * v)))]
      ]);
    } },
    { d: [2, 3], f: function () {
      var s = ri(5, 15), E = pick([1, 2]);
      return Q('How large a sample is needed so that the sample mean is within ' + E + ' of the population mean with probability 0.95? (σ = ' + s + ')', [
        ['Write an inequality.', 2, M('1.96\\frac{' + s + '}{\\sqrt{n}} \\le ' + E)],
        ['Find ' + M('n') + '.', 2, Math.ceil(Math.pow(1.96 * s / E, 2))]
      ]);
    } },
    { d: [1, 2], f: function () {
      return Q('Conditions for the central limit theorem.', [
        ['State the central limit theorem.', 2, 'For large ' + M('n') + ', the mean of a random sample is approximately normal, whatever the population distribution'],
        ['Explain why it is not needed if the population is normal.', 1, 'The sample mean is then exactly normal'],
        ['Why does ' + M('n') + ' need to be large?', 1, 'The approximation improves as ' + M('n') + ' increases']
      ]);
    } }
  ] });
  X('fs-clt', [
    function () {
      var p = pick([0.3, 0.4]), n = pick([50, 100]);
      return Q('A proportion ' + p + ' of voters support a party. A sample of ' + n + ' is taken.', [
        ['Use the central limit theorem to find the approximate distribution of the sample proportion.', 2, M('N\\left(' + p + ', \\frac{' + sf3(p * (1 - p)) + '}{' + n + '}\\right)')],
        ['Find the probability the sample proportion exceeds ' + (p + 0.05) + '.', 2, d4(1 - Phi(0.05 / Math.sqrt(p * (1 - p) / n)))]
      ]);
    },
    function () {
      var mu = ri(50, 70), s = ri(8, 12);
      return Q('Two independent samples of 40 come from a population with mean ' + mu + ' and SD ' + s + '.', [
        ['Find the distribution of the difference of their means.', 2, M('N\\left(0, \\frac{' + 2 * s * s + '}{40}\\right)')],
        ['Find the probability they differ by more than 3.', 3, d4(2 * (1 - Phi(3 / Math.sqrt(2 * s * s / 40))))]
      ]);
    },
    function () {
      return Q('Simulating the central limit theorem.', [
        ['Describe how to simulate the distribution of the mean of 30 rolls of a die.', 2, 'Repeat many times: roll 30 dice, record the mean; draw a histogram'],
        ['Describe the expected shape and spread.', 2, 'Bell-shaped, centred at 3.5, with standard deviation ' + M('\\sqrt{35/360} \\approx 0.31')]
      ]);
    },
    function () {
      var l = pick([4, 5]), n = 30;
      return Q('The total of 30 independent ' + M('\\text{Po}(' + l + ')') + ' counts.', [
        ['State the exact distribution of the total.', 1, M('\\text{Po}(' + n * l + ')')],
        ['Use a normal approximation (with continuity correction) to find ' + M('P(T \\le ' + (n * l - 10) + ')') + '.', 3, d4(Phi((n * l - 10 + 0.5 - n * l) / Math.sqrt(n * l)))]
      ]);
    },
    function () {
      var mu = ri(400, 500), s = ri(10, 20), n = 25;
      return Q('Bags have mean mass ' + mu + ' g and SD ' + s + ' g. Boxes contain 25 bags.', [
        ['Find the distribution of the total mass of a box.', 2, M('N(' + 25 * mu + ', ' + 25 * s * s + ')')],
        ['Find the probability a box weighs less than ' + (25 * mu - 100) + ' g.', 2, d4(Phi(-100 / (5 * s)))]
      ]);
    }
  ]);

  /* ---------------- Chi-squared tests ---------------- */
  T({ id: 'fs-chisq', name: 'Chi-squared tests', video: 'further statistics chi squared goodness of fit contingency table', gens: [
    { d: [1, 2], f: function () {
      var n = 60, o = [ri(6, 14), ri(6, 14), ri(6, 14), ri(6, 14), ri(6, 14), 0]; o[5] = n - sum(o.slice(0, 5)); if (o[5] < 3) { o = [8, 12, 9, 11, 10, 10]; }
      var chi = sum(o.map(function (x) { return (x - 10) * (x - 10) / 10; }));
      return Q('A die is rolled 60 times:' + table(['Score', '1', '2', '3', '4', '5', '6'], [['Frequency'].concat(o)]) + 'Test at 5% whether the die is fair.', [
        ['State the hypotheses and expected frequencies.', 2, M('H_0') + ': fair; each expected 10'],
        ['Calculate ' + M('\\chi^2') + '.', 3, sf3(chi)],
        ['State the degrees of freedom and conclude (critical value 11.070).', 2, '5; ' + (chi > 11.07 ? 'reject ' + M('H_0') + ': evidence of bias' : 'do not reject ' + M('H_0'))]
      ]);
    } },
    { d: [2], f: function () {
      var a = ri(20, 40), b = ri(10, 30), c = ri(15, 35), d = ri(15, 35), N = a + b + c + d;
      var r1 = a + b, r2 = c + d, c1v = a + c, c2v = b + d, E = [r1 * c1v / N, r1 * c2v / N, r2 * c1v / N, r2 * c2v / N];
      var chi = [a, b, c, d].reduce(function (s, o, i) { return s + (o - E[i]) * (o - E[i]) / E[i]; }, 0);
      return Q('Does students’ choice of subject depend on year group?' + table(['', 'Maths', 'English'], [['Year 12', a, b], ['Year 13', c, d]]), [
        ['Find the expected frequencies.', 2, E.map(sf3).join(', ')],
        ['Calculate ' + M('\\chi^2') + '.', 3, sf3(chi)],
        ['Conclude at 5% (1 degree of freedom, critical value 3.841).', 2, chi > 3.841 ? 'Reject ' + M('H_0') + ': evidence of association' : 'Do not reject ' + M('H_0') + ': no evidence of association']
      ]);
    } },
    { d: [2, 3], f: function () {
      var l = pick([1, 1.5]), N = 100, o = [ri(18, 30), ri(30, 40), ri(15, 25), 0]; o[3] = N - o[0] - o[1] - o[2];
      var m = (o[1] + 2 * o[2] + 3.4 * o[3]) / N;
      var e = [pois(l, 0), pois(l, 1), pois(l, 2), 1 - pcdf(l, 2)].map(function (p) { return p * N; });
      var chi = o.reduce(function (s, x, i) { return s + (x - e[i]) * (x - e[i]) / e[i]; }, 0);
      return Q('Data are tested against ' + M('\\text{Po}(' + l + ')') + ':' + table([M('x'), '0', '1', '2', M('\\ge 3')], [['Observed'].concat(o)]), [
        ['Find the expected frequencies.', 3, e.map(sf3).join(', ')],
        ['Calculate ' + M('\\chi^2') + '.', 2, sf3(chi)],
        ['State the degrees of freedom and conclude at 5%.', 2, '3 (λ given); critical value 7.815: ' + (chi > 7.815 ? 'reject' : 'do not reject') + ' ' + M('H_0')]
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Degrees of freedom.', [
        ['Find the degrees of freedom for a 3 × 4 contingency table.', 1, 6],
        ['A goodness-of-fit test to a Poisson distribution has 6 classes and the mean is estimated from the data. Find the degrees of freedom.', 2, 4],
        ['Why must expected frequencies be at least 5, and what is done if not?', 2, 'Otherwise the χ² approximation is poor; combine adjacent classes']
      ]);
    } },
    { d: [1, 2], f: function () {
      var o = [ri(15, 30), ri(15, 30), ri(15, 30), ri(15, 30)], N = sum(o), e = N / 4;
      var chi = sum(o.map(function (x) { return (x - e) * (x - e) / e; }));
      return Q('Customers choose one of four doors: ' + o.join(', ') + '. Test at 5% whether each door is equally likely.', [
        ['Find the expected frequencies.', 1, sf3(e) + ' each'],
        ['Calculate ' + M('\\chi^2') + ' and conclude (critical value 7.815).', 3, sf3(chi) + '; ' + (chi > 7.815 ? 'reject ' + M('H_0') : 'do not reject ' + M('H_0'))]
      ]);
    } }
  ] });
  X('fs-chisq', [
    function () {
      var n = 4, p = 0.5, N = 80, o = [ri(3, 8), ri(15, 25), ri(25, 35), ri(15, 25), 0]; o[4] = N - sum(o.slice(0, 4)); if (o[4] < 2) o = [5, 20, 30, 20, 5];
      var e = [0, 1, 2, 3, 4].map(function (k) { return N * bin(n, p, k); });
      return Q('Families of 4 children: number of girls in 80 families:' + table(['Girls', '0', '1', '2', '3', '4'], [['Families'].concat(o)]), [
        ['Find the expected frequencies under ' + M('B(4, 0.5)') + '.', 2, e.map(sf3).join(', ')],
        ['Calculate ' + M('\\chi^2') + ' and conclude at 5% (4 d.f., critical value 9.488).', 3, (function () { var c = o.reduce(function (s, x, i) { return s + (x - e[i]) * (x - e[i]) / e[i]; }, 0); return sf3(c) + '; ' + (c > 9.488 ? 'reject' : 'do not reject') + ' ' + M('H_0'); })()]
      ]);
    },
    function () {
      return Q('Yates’ correction is not used in this course, but small expected values matter.', [
        ['A 2 × 2 table has an expected value of 3.2. What should be done?', 1, 'Collect more data; classes cannot be combined in a 2 × 2 table'],
        ['Why does the test use ' + M('\\frac{(O - E)^2}{E}') + ' rather than ' + M('(O - E)') + '?', 2, 'Deviations would cancel; dividing by ' + M('E') + ' scales them relative to size']
      ]);
    },
    function () {
      var chi = sf3(5 + Math.random() * 6);
      return Q('A ' + M('\\chi^2') + ' value of ' + chi + ' comes from a test with 3 degrees of freedom.', [
        ['Compare with the 5% critical value 7.815 and the 10% critical value 6.251.', 2, (+chi > 7.815 ? 'Significant at 5% (and 10%)' : +chi > 6.251 ? 'Significant at 10% but not 5%' : 'Not significant at 10%')],
        ['Explain why a very small ' + M('\\chi^2') + ' value might be suspicious.', 1, 'The fit is too good: data may have been altered']
      ]);
    },
    function () {
      return Q('Testing a normal fit.', [
        ['Data in 6 classes are tested against a normal distribution with mean and variance estimated from the data. Find the degrees of freedom.', 2, 3],
        ['Explain why each estimated parameter reduces the degrees of freedom.', 1, 'Each estimate makes the expected values agree more closely with the data']
      ]);
    },
    function () {
      return Q('Interpreting a contingency table test.', [
        ['After rejecting ' + M('H_0') + ', how can you tell which cells contribute most?', 2, 'Compare the individual ' + M('\\frac{(O - E)^2}{E}') + ' values'],
        ['Does a significant result prove that one variable causes the other?', 1, 'No: only association']
      ]);
    }
  ]);

  /* ---------------- Probability generating functions ---------------- */
  T({ id: 'fs-pgf', name: 'Probability generating functions', video: 'further statistics probability generating functions', gens: [
    { d: [1], f: function () {
      var p = [ri(1, 4), ri(1, 4), ri(1, 4)]; var s = sum(p);
      return Q(M('X') + ' takes values 0, 1, 2 with probabilities ' + p.map(function (v) { return M(frac(v, s)); }).join(', ') + '.', [
        ['Write down the probability generating function ' + M('G_X(t)') + '.', 2, M(frac(p[0], s) + ' + ' + frac(p[1], s) + 't + ' + frac(p[2], s) + 't^2')],
        ['Find ' + M('E(X)') + ' using ' + M("G_X'(1)") + '.', 2, M(frac(p[1] + 2 * p[2], s))]
      ]);
    } },
    { d: [1, 2], f: function () {
      var l = pick([2, 3, 4]);
      return Q('For ' + M('X \\sim \\text{Po}(' + l + ')') + ':', [
        ['Show that ' + M('G_X(t) = e^{' + l + '(t - 1)}') + '.', 3, M('\\sum\\frac{e^{-' + l + '}(' + l + 't)^x}{x!} = e^{-' + l + '}e^{' + l + 't}')],
        ['Use ' + M('G_X') + ' to find ' + M('E(X)') + ' and ' + M('\\text{Var}(X)') + '.', 3, l + ' and ' + l]
      ]);
    } },
    { d: [2], f: function () {
      var p = pick([0.2, 0.25, 0.5]);
      return Q('For ' + M('X \\sim \\text{Geo}(' + p + ')') + ':', [
        ['Show that ' + M('G_X(t) = \\frac{pt}{1 - (1 - p)t}') + '.', 3, 'Geometric series ' + M('\\sum pt(qt)^{x-1}')],
        ['Find ' + M('E(X)') + ' from ' + M('G_X') + '.', 3, sf3(1 / p)]
      ]);
    } },
    { d: [2, 3], f: function () {
      var a = pick([2, 3]), b = pick([2, 4]);
      return Q(M('X') + ' and ' + M('Y') + ' are independent with ' + M('G_X(t) = e^{' + a + '(t - 1)}') + ' and ' + M('G_Y(t) = e^{' + b + '(t - 1)}') + '.', [
        ['Find the PGF of ' + M('X + Y') + ' and identify the distribution.', 2, M('e^{' + (a + b) + '(t - 1)}') + ': ' + M('\\text{Po}(' + (a + b) + ')')],
        ['Find the PGF of ' + M('2X') + '.', 2, M('G_X(t^2) = e^{' + a + '(t^2 - 1)}')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var n = ri(3, 6), p = pick([0.3, 0.5]);
      return Q('For ' + M('X \\sim B(' + n + ', ' + p + ')') + ', ' + M('G_X(t) = (' + num(1 - p) + ' + ' + p + 't)^' + n) + '.', [
        ['Use ' + M("G''(1)") + ' to find ' + M('E[X(X - 1)]') + '.', 2, sf3(n * (n - 1) * p * p)],
        ['Find ' + M('\\text{Var}(X)') + ' using ' + M("G''(1) + G'(1) - [G'(1)]^2") + '.', 2, sf3(n * p * (1 - p))]
      ]);
    } }
  ] });
  X('fs-pgf', [
    function () {
      return Q(M('G(t) = k(1 + t)^3') + ' is a PGF.', [
        ['Find ' + M('k') + '.', 1, M('\\frac{1}{8}')],
        ['Identify the distribution.', 1, M('B(3, 0.5)')],
        ['Find ' + M('P(X = 2)') + ' from the coefficients.', 1, M('\\frac{3}{8}')]
      ]);
    },
    function () {
      var a = pick([3, 4]);
      return Q('The PGF of ' + M('X') + ' is ' + M('G(t) = \\frac{t}{' + a + ' - ' + (a - 1) + 't}') + '.', [
        ['Identify the distribution and its parameter.', 2, M('\\text{Geo}\\left(\\frac{1}{' + a + '}\\right)')],
        ['Find ' + M('E(X)') + '.', 1, a]
      ]);
    },
    function () {
      return Q('Prove that ' + M("G'(1) = E(X)") + '.', [
        ['Differentiate ' + M('G(t) = \\sum P(X = x)t^x') + '.', 2, M("G'(t) = \\sum xP(X = x)t^{x - 1}")],
        ['Set ' + M('t = 1') + '.', 1, M('\\sum xP(X = x) = E(X)')]
      ]);
    },
    function () {
      var l = pick([2, 3]);
      return Q('The PGF of ' + M('Y = 3X + 2') + ' where ' + M('X \\sim \\text{Po}(' + l + ')') + '.', [
        ['Show that ' + M('G_Y(t) = t^2G_X(t^3)') + '.', 2, M('E(t^{3X + 2}) = t^2E((t^3)^X)')],
        ['Write ' + M('G_Y(t)') + '.', 1, M('t^2e^{' + l + '(t^3 - 1)}')]
      ]);
    },
    function () {
      var p = pick([0.4, 0.6]);
      return Q('A coin with ' + M('P(H) = ' + p) + ' is tossed until two heads have appeared.', [
        ['Write the PGF of the number of tosses as a square of a geometric PGF.', 2, M('\\left(\\frac{' + p + 't}{1 - ' + num(1 - p) + 't}\\right)^2')],
        ['Find the mean number of tosses.', 1, sf3(2 / p)]
      ]);
    }
  ]);

  /* ---------------- Quality of tests ---------------- */
  T({ id: 'fs-quality', name: 'Quality of tests: Type I and Type II errors, power', video: 'further statistics type I type II errors power of a test', gens: [
    { d: [1], f: function () {
      return Q('Errors in hypothesis testing.', [
        ['Define a Type I error.', 1, 'Rejecting ' + M('H_0') + ' when it is true'],
        ['Define a Type II error.', 1, 'Not rejecting ' + M('H_0') + ' when it is false'],
        ['Define the power of a test.', 1, 'The probability of rejecting ' + M('H_0') + ' when it is false']
      ]);
    } },
    { d: [1, 2], f: function () {
      var n = 20, p0 = 0.3;
      var c = 0; while ((function () { var s = 0; for (var k = c; k <= n; k++) s += bin(n, p0, k); return s; })() > 0.05) c++;
      var t1 = 0; for (var k = c; k <= n; k++) t1 += bin(n, p0, k);
      var p1 = pick([0.4, 0.5]), pw = 0; for (k = c; k <= n; k++) pw += bin(n, p1, k);
      return Q('A test of ' + M('H_0: p = 0.3') + ' against ' + M('H_1: p > 0.3') + ' uses ' + M('X \\sim B(20, p)') + ' at 5%.', [
        ['Find the critical region and the probability of a Type I error.', 3, M('X \\ge ' + c) + '; ' + d4(t1)],
        ['Find the power of the test if ' + M('p = ' + p1) + '.', 2, d4(pw)],
        ['Find the probability of a Type II error if ' + M('p = ' + p1) + '.', 1, d4(1 - pw)]
      ]);
    } },
    { d: [2], f: function () {
      var l0 = pick([3, 4]);
      var c = 0; while (1 - pcdf(l0, c - 1) > 0.05) c++;
      return Q('A test of ' + M('H_0: \\lambda = ' + l0) + ' against ' + M('H_1: \\lambda > ' + l0) + ' has critical region ' + M('X \\ge ' + c) + '.', [
        ['Write the power function ' + M('\\pi(\\lambda)') + '.', 2, M('1 - P(X \\le ' + (c - 1) + ' \\mid \\lambda)')],
        ['Find the power when ' + M('\\lambda = ' + (l0 + 2)) + ' and ' + M('\\lambda = ' + (l0 + 4)) + '.', 3, d4(1 - pcdf(l0 + 2, c - 1)) + ' and ' + d4(1 - pcdf(l0 + 4, c - 1))],
        ['Explain the trend.', 1, 'The further the true value from ' + M('H_0') + ', the more likely the test detects it']
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Trade-offs.', [
        ['Explain how decreasing the significance level affects the probability of a Type II error.', 2, 'It increases: the critical region shrinks'],
        ['How can both error probabilities be reduced at once?', 1, 'Increase the sample size'],
        ['Give a context where a Type II error is more serious than a Type I error.', 1, 'Failing to detect a dangerous fault in medical or safety testing']
      ]);
    } },
    { d: [2, 3], f: function () {
      var l0 = 2;
      return Q('A geometric test of ' + M('H_0: p = 0.4') + ' against ' + M('H_1: p < 0.4') + ' rejects ' + M('H_0') + ' if the first success is after the 5th trial.', [
        ['Find the size of the test (probability of a Type I error).', 2, d4(Math.pow(0.6, 5))],
        ['Find the power when ' + M('p = 0.2') + '.', 2, d4(Math.pow(0.8, 5))]
      ]);
    } }
  ] });
  X('fs-quality', [
    function () {
      var n = 10, c = 8;
      return Q('A test rejects ' + M('H_0: p = 0.5') + ' if at least 8 of 10 trials succeed.', [
        ['Find the size of the test.', 2, d4([8, 9, 10].reduce(function (s, k) { return s + bin(10, 0.5, k); }, 0))],
        ['Find the power when ' + M('p = 0.7') + ' and ' + M('p = 0.9') + '.', 3, d4([8, 9, 10].reduce(function (s, k) { return s + bin(10, 0.7, k); }, 0)) + ' and ' + d4([8, 9, 10].reduce(function (s, k) { return s + bin(10, 0.9, k); }, 0))]
      ]);
    },
    function () {
      return Q('Comparing two tests.', [
        ['Test A has size 0.05 and power 0.6; Test B has size 0.05 and power 0.8. Which is better? Explain.', 2, 'B: same Type I error, but more likely to detect a false ' + M('H_0')],
        ['Explain why a test with size 0 is useless.', 1, 'It never rejects ' + M('H_0') + ', so its power is 0']
      ]);
    },
    function () {
      var l0 = 5;
      return Q('A Poisson test of ' + M('H_0: \\lambda = 5') + ' rejects for ' + M('X \\le 1') + ' or ' + M('X \\ge 11') + '.', [
        ['Find the size.', 2, d4(pcdf(5, 1) + 1 - pcdf(5, 10))],
        ['Find the power when ' + M('\\lambda = 9') + '.', 2, d4(pcdf(9, 1) + 1 - pcdf(9, 10))]
      ]);
    },
    function () {
      return Q('Sketch the power function for an upper-tail test.', [
        ['Describe its value at the parameter value in ' + M('H_0') + '.', 1, 'Equal to the size of the test'],
        ['Describe its shape as the parameter increases.', 1, 'Increases towards 1']
      ]);
    },
    function () {
      var n = pick([10, 20]);
      return Q('Increasing the sample size.', [
        ['For a fixed significance level, explain why a larger sample increases power.', 2, 'The sampling distribution is narrower, so deviations are easier to detect'],
        ['Explain why sample size cannot always be increased.', 1, 'Cost, time, or destructive testing']
      ]);
    }
  ]);

  /* ---------------- Reasoning statements ---------------- */
  Cn('fs-drv', [
    ['T', Sr`\(\text{Var}(aX + b) = a^2\text{Var}(X)\).`, Sr`Adding \(b\) shifts without spreading.`],
    ['F', Sr`\(E(X^2) = [E(X)]^2\).`, Sr`They differ by \(\text{Var}(X)\).`],
    ['A', Sr`\(\text{Var}(X) \ge 0\).`, Sr`It is an average of squares.`],
    ['S', Sr`\(E\left(\frac{1}{X}\right) = \frac{1}{E(X)}\).`, Sr`Only in special cases, e.g. when \(X\) is constant.`]
  ]);
  Cn('fs-poisson', [
    ['T', Sr`For a Poisson distribution, the mean equals the variance.`, Sr`Both are \(\lambda\).`],
    ['F', Sr`The sum of two independent Poisson variables is binomial.`, Sr`It is Poisson with the rates added.`],
    ['S', Sr`\(\text{Po}(np)\) is a good approximation to \(B(n, p)\).`, Sr`When \(n\) is large and \(p\) small.`],
    ['N', Sr`A Poisson variable can take the value \(-1\).`, Sr`It counts events.`]
  ]);
  Cn('fs-geometric', [
    ['T', Sr`If \(X \sim \text{Geo}(p)\), \(P(X > n) = (1 - p)^n\).`, Sr`The first \(n\) trials all fail.`],
    ['F', Sr`The mode of a geometric distribution is \(\frac{1}{p}\).`, Sr`The mode is 1.`],
    ['A', Sr`The geometric distribution is memoryless.`, Sr`\(P(X > a + b \mid X > a) = P(X > b)\).`]
  ]);
  Cn('fs-hypothesis', [
    ['T', Sr`The actual significance level of a discrete test is usually below the nominal level.`, Sr`Tail probabilities jump.`],
    ['F', Sr`Not rejecting \(H_0\) proves \(H_0\) is true.`, Sr`It only shows insufficient evidence.`],
    ['S', Sr`A two-tailed test at 5% puts 2.5% in each tail.`, Sr`That is the usual approach, but the split may not be exact for discrete data.`]
  ]);
  Cn('fs-clt', [
    ['T', Sr`The variance of the sample mean is \(\frac{\sigma^2}{n}\).`, Sr`Averaging reduces spread.`],
    ['F', Sr`The CLT says the population becomes normal for large samples.`, Sr`It is the sample mean that becomes approximately normal.`],
    ['A', Sr`The mean of the sample mean equals the population mean.`, Sr`\(E(\bar{X}) = \mu\).`]
  ]);
  Cn('fs-chisq', [
    ['T', Sr`A \(3 \times 3\) contingency table has 4 degrees of freedom.`, Sr`\((3 - 1)(3 - 1)\).`],
    ['F', Sr`Observed frequencies must all be at least 5.`, Sr`It is the expected frequencies that should be at least 5.`],
    ['A', Sr`\(\chi^2\) test statistics are never negative.`, Sr`They are sums of non-negative terms.`]
  ]);
  Cn('fs-pgf', [
    ['T', Sr`\(G_X(1) = 1\) for any PGF.`, Sr`The probabilities add to 1.`],
    ['F', Sr`\(G_{X+Y}(t) = G_X(t) + G_Y(t)\) for independent \(X, Y\).`, Sr`PGFs multiply: \(G_X(t)G_Y(t)\).`],
    ['A', Sr`\(E(X) = G'(1)\).`, Sr`Differentiate the series.`]
  ]);
  Cn('fs-quality', [
    ['T', Sr`The size of a test is the probability of a Type I error.`, Sr`Definition.`],
    ['F', Sr`Power + size = 1.`, Sr`Power + P(Type II) = 1, for a particular alternative.`],
    ['S', Sr`Reducing the significance level reduces the chance of any error.`, Sr`It reduces Type I but increases Type II.`]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
