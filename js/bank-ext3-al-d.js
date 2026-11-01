/* Byte Size Classroom — deeper extension questions (set 3, A level Year 1 part d): exponentials and logarithms, sampling, measures of location and spread, data representations. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function sf4(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 4); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function S0(v) { return v ? S(v) : ''; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function P(x, y) { return '(' + x + ', ' + y + ')'; }
  function sum(a) { return a.reduce(function (p, q) { return p + q; }, 0); }

  X('al-explog', [
    function () {
      var a = pick([2, 5, 7]), b = pick([3, 2]);
      if (a === b) a = 5;
      var x = Math.log(a) / (2 * Math.log(b) - Math.log(a));
      return Q('Solve ' + M(a + '^{x + 1} = ' + b + '^{2x}') + '.', [
        ['Take logarithms and collect the ' + M('x') + ' terms.', 3, M('(x + 1)\\ln ' + a + ' = 2x\\ln ' + b)],
        ['Show that ' + M('x = \\frac{\\ln ' + a + '}{\\ln ' + (b * b) + ' - \\ln ' + a + '}') + ', and evaluate.', 2, sf4(x)],
        ['Explain why ' + M(a + '^{x} = -' + b) + ' has no solution.', 1, 'Exponentials are always positive']
      ]);
    },
    function () {
      var x = ri(3, 9), k = ri(1, x - 1), m = x * (x - k);
      return Q('Solve ' + M('\\log_2 x + \\log_2(x - ' + k + ') = \\log_2 ' + m) + '.', [
        ['Combine the logarithms and form a quadratic.', 2, M('x(x - ' + k + ') = ' + m) + ', ' + M(poly([1, -k, -m]) + ' = 0')],
        ['Solve, rejecting any invalid root with a reason.', 3, M('x = ' + x) + '; ' + M('x = ' + (k - x)) + ' is rejected: the log of a negative number is not defined'],
        ['Explain why the expression ' + M('\\log_2 x + \\log_2(x - ' + k + ')') + ' only has a value for ' + M('x > ' + k) + '.', 1, 'Both ' + M('x') + ' and ' + M('x - ' + k) + ' must be positive']
      ]);
    },
    function () {
      var A = pick([200, 500, 1000]), r = pick([2, 3]), t1 = ri(2, 5);
      var k = Math.log(r) / t1;
      return Q('A population is modelled by ' + M('P = Ae^{kt}') + ', with ' + M('P = ' + A) + ' at ' + M('t = 0') + ' and ' + M('P = ' + A * r) + ' at ' + M('t = ' + t1) + '.', [
        ['Find ' + M('A') + ' and the exact value of ' + M('k') + '.', 2, M('A = ' + A) + ', ' + M('k = \\frac{\\ln ' + r + '}{' + t1 + '}')],
        ['Find the doubling time.', 2, M('\\frac{\\ln 2}{k} = ' + sf3(Math.log(2) / k))],
        ['Find ' + M('\\frac{dP}{dt}') + ' when ' + M('P = ' + 2 * A) + ', and explain what it shows about the model.', 2, M(sf3(2 * A * k)) + ': the rate of growth is proportional to the population']
      ]);
    },
    function () {
      var a = pick([2, 3, 5]), n = pick([1.5, 2, 2.5, -1]);
      var x1 = 1, x2 = 4, y1 = a * Math.pow(x1, n), y2 = a * Math.pow(x2, n);
      return Q('Data are thought to follow ' + M('y = ax^n') + '. Two points are ' + M(P(x1, sf3(y1))) + ' and ' + M(P(x2, sf3(y2))) + '.', [
        ['Show that ' + M('\\log y = \\log a + n\\log x') + '.', 1, 'Take logs of both sides'],
        ['What straight line should be plotted, and what do the gradient and intercept give?', 2, M('\\log y') + ' against ' + M('\\log x') + ': gradient ' + M('n') + ', intercept ' + M('\\log a')],
        ['Use the two points to find ' + M('n') + ' and ' + M('a') + '.', 3, M('n = \\frac{\\log ' + sf3(y2 / y1) + '}{\\log 4} = ' + n) + ', ' + M('a = ' + a)]
      ]);
    },
    function () {
      var a = pick([2, 3, 5]), b = pick([1.5, 2, 3]);
      return Q('A quantity follows ' + M('y = ab^x') + '. A graph of ' + M('\\log_{10} y') + ' against ' + M('x') + ' is a straight line.', [
        ['Write ' + M('\\log_{10} y') + ' in terms of ' + M('x') + '.', 1, M('\\log_{10} y = \\log_{10} a + x\\log_{10} b')],
        ['The line has gradient ' + sf3(Math.log10(b)) + ' and intercept ' + sf3(Math.log10(a)) + '. Find ' + M('a') + ' and ' + M('b') + '.', 2, M('a = ' + a + ',\\ b = ' + b)],
        ['Explain how you would tell the difference between ' + M('y = ab^x') + ' and ' + M('y = ax^n') + ' from data.', 2, 'Plot ' + M('\\log y') + ' against ' + M('x') + ' and against ' + M('\\log x') + '; the straighter graph shows the model']
      ]);
    },
    function () {
      var k = pick([1, 2, 3]);
      return Q('Tangents to ' + M('y = e^{' + (k === 1 ? '' : k) + 'x}') + '.', [
        ['Find the gradient at ' + M('x = t') + '.', 1, M(c1(k, 'e^{' + (k === 1 ? '' : k) + 't}'))],
        ['Find ' + M('t') + ' so that the tangent passes through the origin.', 3, M('t = ' + F(1, k))],
        ['Find the equation of this tangent.', 1, M('y = ' + (k === 1 ? '' : k) + 'ex')]
      ]);
    },
    function () {
      var T0 = pick([80, 90, 70]), Ta = 20, t1 = ri(5, 15), T1 = ri(Ta + 20, T0 - 10);
      var k = -Math.log((T1 - Ta) / (T0 - Ta)) / t1, t40 = Math.log((T0 - Ta) / 20) / k;
      return Q('Tea cools according to ' + M('T = 20 + ' + (T0 - Ta) + 'e^{-kt}') + ' °C, where ' + M('t') + ' is in minutes. After ' + t1 + ' minutes it is ' + T1 + ' °C.', [
        ['Find ' + M('k') + '.', 3, M('k = \\frac{1}{' + t1 + '}\\ln\\frac{' + (T0 - Ta) + '}{' + (T1 - Ta) + '} = ' + sf3(k))],
        ['Find when the tea reaches 40 °C.', 2, sf3(t40) + ' minutes'],
        ['State the long-term temperature, and explain why the model can never reach it.', 1, '20 °C; ' + M('e^{-kt} > 0') + ' for all ' + M('t')]
      ]);
    },
    function () {
      var a = ri(1, 6), b = ri(2, 5);
      return Q('Solve ' + M('\\ln(x + ' + a + ') - \\ln x = \\ln ' + b) + '.', [
        ['Combine and solve.', 3, M('\\frac{x + ' + a + '}{x} = ' + b) + ', ' + M('x = ' + F(a, b - 1))],
        ['Check that your answer is valid.', 1, 'Both ' + M('x') + ' and ' + M('x + ' + a) + ' are positive'],
        ['For which values of ' + M('b') + ' does ' + M('\\ln(x + ' + a + ') - \\ln x = \\ln b') + ' have a solution?', 2, M('b > 1') + ', since ' + M('\\frac{x + ' + a + '}{x} > 1')]
      ]);
    },
    function () {
      var x = pick([2, 3, 4, 5, 6]), k = x * x - x;
      return Q('Solve ' + M('2\\log_3 x = \\log_3(x + ' + k + ')') + '.', [
        ['Use log laws to form a quadratic.', 2, M('x^2 = x + ' + k)],
        ['Solve and reject any invalid roots.', 2, M('x = ' + x) + ' (' + M('x = ' + (1 - x)) + ' is rejected)'],
        ['Explain why ' + M('2\\log_3 x') + ' and ' + M('\\log_3 x^2') + ' are not quite the same function.', 2, M('\\log_3 x^2') + ' is defined for negative ' + M('x') + ' too']
      ]);
    },
    function () {
      var h = pick([5, 8, 12, 30]), N0 = pick([100, 400, 800]);
      return Q('A radioactive substance has half-life ' + h + ' years: ' + M('N = ' + N0 + 'e^{-\\lambda t}') + '.', [
        ['Show that ' + M('\\lambda = \\frac{\\ln 2}{' + h + '}') + '.', 2, M(N0 / 2 + ' = ' + N0 + 'e^{-' + h + '\\lambda}')],
        ['Find how long until only ' + N0 / 8 + ' remains, without a calculator.', 1, 3 * h + ' years (three half-lives)'],
        ['Find how long until ' + N0 / 10 + ' remains.', 2, sf3(h * Math.log(10) / Math.log(2)) + ' years']
      ]);
    }
  ]);

  X('al-sampling', [
    function () {
      var g = [ri(80, 200), ri(80, 200), ri(80, 200)], N = sum(g), n = pick([30, 40, 50]);
      var raw = g.map(function (x) { return x * n / N; }), r = raw.map(Math.round);
      return Q('A school has ' + g[0] + ' students in Year 12, ' + g[1] + ' in Year 13 and ' + g[2] + ' staff. A stratified sample of ' + n + ' is taken.', [
        ['Find how many from each group.', 3, raw.map(sf3).join(', ') + ' → ' + r.join(', ')],
        ['Do your rounded numbers add to ' + n + '? If not, explain how you would adjust.', 1, sum(r) === n ? 'Yes' : 'No (' + sum(r) + '): adjust the group whose value was closest to rounding the other way'],
        ['Explain how the individuals within each stratum should be chosen.', 1, 'By simple random sampling, e.g. random numbers from a list of each group']
      ]);
    },
    function () {
      var N = pick([600, 800, 1200]), n = pick([20, 40, 50]);
      return Q('A systematic sample of ' + n + ' is taken from a list of ' + N + ' customers.', [
        ['Find the sampling interval and describe how to choose the first person.', 2, N / n + '; choose a random start from 1 to ' + N / n],
        ['Give one advantage and one disadvantage.', 2, 'Quick and spread through the list; biased if the list has a pattern matching the interval'],
        ['Is this a random sample? Explain carefully.', 1, 'Not fully: once the start is chosen, every other member is fixed, so not every sample of ' + n + ' is equally likely']
      ]);
    },
    function () {
      return Q('A researcher asks the first 50 people leaving a gym how many hours of exercise they do each week, to estimate the average for the town.', [
        ['Name the sampling method.', 1, 'Opportunity sampling'],
        ['Explain two sources of bias.', 2, 'Gym users exercise more than average; the time of day affects who is there'],
        ['Suggest a better method and a sampling frame.', 2, 'Simple random sample from the electoral roll (or a stratified sample by age)']
      ]);
    },
    function () {
      return Q('Quota sampling and stratified sampling both divide the population into groups.', [
        ['Explain the key difference.', 2, 'In stratified sampling the members of each group are chosen at random; in quota sampling the interviewer chooses'],
        ['Give a situation where quota sampling is the sensible choice.', 1, 'A street survey where no sampling frame exists'],
        ['Why might a quota sample still be biased even if the quotas match the population?', 1, 'The interviewer may choose people who look approachable']
      ]);
    },
    function () {
      var N = pick([80, 300, 650]), n = ri(5, 10);
      return Q('A simple random sample of ' + n + ' is chosen from ' + N + ' numbered items.', [
        ['Describe how to do this using a random number generator.', 2, 'Number items 1 to ' + N + '; generate random integers in that range, ignoring repeats, until ' + n + ' are chosen'],
        ['Why are repeats ignored?', 1, 'Sampling without replacement: an item cannot be chosen twice'],
        ['What is the probability that a particular item is in the sample?', 2, M(F(n, N))]
      ]);
    },
    function () {
      return Q('A factory tests light bulbs by running them until they fail.', [
        ['Why would a census be inappropriate here?', 1, 'Testing destroys the bulbs'],
        ['Give two other reasons a sample may be preferred to a census in general.', 2, 'Cheaper; quicker; easier to manage'],
        ['Give one situation where a census is the better choice.', 1, 'A small population, e.g. a class of 25 students']
      ]);
    },
    function () {
      var a = ri(150, 400), b = ri(150, 400), n = pick([40, 60]);
      return Q('A company has ' + a + ' office staff and ' + b + ' factory staff. A manager wants views on a new canteen.', [
        ['Define a suitable sampling frame.', 1, 'A list of all ' + (a + b) + ' employees'],
        ['Find the sample sizes for a stratified sample of ' + n + '.', 2, sf3(a * n / (a + b)) + ' and ' + sf3(b * n / (a + b)) + ' (rounded to ' + Math.round(a * n / (a + b)) + ' and ' + (n - Math.round(a * n / (a + b))) + ')'],
        ['Explain why stratifying might matter here.', 1, 'The groups work different shifts and may use the canteen differently']
      ]);
    },
    function () {
      var mu = ri(150, 180);
      return Q('Two students each take a random sample of 10 heights from the same population and get means ' + (mu - 2) + ' cm and ' + (mu + 3) + ' cm.', [
        ['Explain why the means differ.', 1, 'Natural sampling variation'],
        ['How would taking samples of 100 change this?', 2, 'The means would be closer to each other and to the population mean'],
        ['Explain why combining the two samples gives a better estimate.', 1, 'A larger sample reduces the variability of the mean']
      ]);
    },
    function () {
      return Q('A web survey on a news site asks readers whether they support a new law.', [
        ['Identify the type of sample and its main weakness.', 2, 'Self-selected; people with strong views are more likely to respond'],
        ['Explain why a very large number of responses does not fix this.', 1, 'Bias does not shrink with sample size'],
        ['Suggest how to obtain a more representative sample.', 2, 'Random sampling from a defined frame, e.g. stratified by age and region']
      ]);
    },
    function () {
      var p = [ri(20, 40), ri(20, 40)]; p.push(100 - p[0] - p[1]); var n = pick([30, 70]);
      return Q('A population is ' + p[0] + '% under 30, ' + p[1] + '% aged 30–60 and ' + p[2] + '% over 60. A sample of ' + n + ' is needed.', [
        ['Find the numbers for a stratified sample.', 2, p.map(function (x) { return sf3(x * n / 100); }).join(', ')],
        ['After rounding, the total may not be ' + n + '. Explain a fair way to resolve this.', 1, 'Round so the largest remainders get the extra places, keeping the total ' + n],
        ['Why might the over-60 stratum need a larger sample than its share in some studies?', 1, 'To get reliable results for that group on its own']
      ]);
    }
  ]);

  X('al-location', [
    function () {
      var a = ri(100, 200), b = pick([5, 10]), my = ri(-3, 3), sy = ri(1, 4);
      return Q('Data are coded with ' + M('y = \\frac{x - ' + a + '}{' + b + '}') + '. The coded data have mean ' + my + ' and standard deviation ' + sy + '.', [
        ['Find the mean of ' + M('x') + '.', 2, a + b * my],
        ['Find the standard deviation of ' + M('x') + '.', 2, b * sy],
        ['Explain why subtracting ' + a + ' does not affect the standard deviation.', 1, 'It shifts every value equally, so the spread is unchanged']
      ]);
    },
    function () {
      var d = [ri(2, 9), ri(2, 9), ri(2, 9), ri(2, 9), ri(2, 9), ri(10, 15)];
      var n = d.length, sx = sum(d), sxx = sum(d.map(function (x) { return x * x; }));
      var m = sx / n, v = sxx / n - m * m;
      return Q('For ' + n + ' values, ' + M('\\sum x = ' + sx) + ' and ' + M('\\sum x^2 = ' + sxx) + '.', [
        ['Find the mean and standard deviation.', 3, sf3(m) + ', ' + sf3(Math.sqrt(v))],
        ['A value equal to the mean is added. Find the new mean and standard deviation.', 3, 'Mean ' + sf3(m) + ', SD ' + sf3(Math.sqrt(v * n / (n + 1)))],
        ['Explain why the standard deviation decreases.', 1, 'The added value has zero deviation, but ' + M('n') + ' increases']
      ]);
    },
    function () {
      var n1 = ri(10, 20), n2 = ri(10, 20), m1 = ri(40, 60), m2 = ri(40, 60), s1 = ri(3, 8), s2 = ri(3, 8);
      var Sxx = n1 * (s1 * s1 + m1 * m1) + n2 * (s2 * s2 + m2 * m2), N = n1 + n2, mm = (n1 * m1 + n2 * m2) / N;
      return Q('Group A: ' + n1 + ' values, mean ' + m1 + ', SD ' + s1 + '. Group B: ' + n2 + ' values, mean ' + m2 + ', SD ' + s2 + '.', [
        ['Find ' + M('\\sum x') + ' and ' + M('\\sum x^2') + ' for each group.', 3, 'A: ' + n1 * m1 + ', ' + n1 * (s1 * s1 + m1 * m1) + '; B: ' + n2 * m2 + ', ' + n2 * (s2 * s2 + m2 * m2)],
        ['Find the mean and SD of the combined data.', 3, sf3(mm) + ', ' + sf3(Math.sqrt(Sxx / N - mm * mm))],
        ['Explain why the combined SD can be larger than both group SDs.', 1, 'The difference between the group means adds extra spread']
      ]);
    },
    function () {
      var f = [ri(4, 10), ri(10, 20), ri(10, 20), ri(4, 10)], b = [0, 10, 20, 30, 40], N = sum(f);
      var q = function (p) { var t = p * N, cf = 0, k = 0; while (cf + f[k] < t) { cf += f[k]; k++; } return b[k] + (t - cf) / f[k] * 10; };
      return Q('Times (minutes): 0–10: ' + f[0] + ', 10–20: ' + f[1] + ', 20–30: ' + f[2] + ', 30–40: ' + f[3] + '.', [
        ['Estimate the median using interpolation.', 3, sf3(q(0.5))],
        ['Estimate the interquartile range.', 3, sf3(q(0.75) - q(0.25))],
        ['State an assumption made by interpolation.', 1, 'Values are evenly spread within each class']
      ]);
    },
    function () {
      var q1 = ri(20, 30), q3 = q1 + ri(6, 12), iqr = q3 - q1, hi = q3 + Math.round(1.5 * iqr) + ri(-3, 5), lo = q1 - ri(2, 10);
      return Q('A data set has ' + M('Q_1 = ' + q1) + ' and ' + M('Q_3 = ' + q3) + '. The smallest value is ' + lo + ' and the largest is ' + hi + '.', [
        ['Find the boundaries for outliers using ' + M('1.5 \\times') + ' IQR.', 2, num(q1 - 1.5 * iqr) + ' and ' + num(q3 + 1.5 * iqr)],
        ['Are either of the extreme values outliers?', 2, (lo < q1 - 1.5 * iqr ? lo + ' is an outlier; ' : lo + ' is not; ') + (hi > q3 + 1.5 * iqr ? hi + ' is an outlier' : hi + ' is not')],
        ['Should an outlier always be removed? Explain.', 1, 'No — only if it is an error; genuine extreme values are part of the data']
      ]);
    },
    function () {
      var m = ri(20, 50), s = ri(3, 8), a = ri(2, 4), b = ri(5, 20);
      return Q('A data set has mean ' + m + ' and standard deviation ' + s + '. Every value is multiplied by ' + a + ' and then ' + b + ' is subtracted.', [
        ['Find the new mean and standard deviation.', 2, (a * m - b) + ' and ' + a * s],
        ['Find the new variance.', 1, a * a * s * s],
        ['Explain why the variance is multiplied by ' + a * a + ' and not ' + a + '.', 1, 'Variance uses squared deviations']
      ]);
    },
    function () {
      return Q('Prove that ' + M('\\sum (x - \\bar{x})^2 = \\sum x^2 - n\\bar{x}^2') + '.', [
        ['Expand the left-hand side.', 2, M('\\sum x^2 - 2\\bar{x}\\sum x + n\\bar{x}^2')],
        ['Use ' + M('\\sum x = n\\bar{x}') + ' to complete the proof.', 2, M('\\sum x^2 - 2n\\bar{x}^2 + n\\bar{x}^2')],
        ['Explain why the second form is more convenient with a calculator.', 1, 'It needs only running totals of ' + M('x') + ' and ' + M('x^2')]
      ]);
    },
    function () {
      var a = ri(20, 30);
      var d = [a, a + 1, a + 2, a + 2, a + 3, a + 4, a + 60];
      return Q('Seven house prices (in £10 000s) are ' + d.join(', ') + '.', [
        ['Find the mean and the median.', 2, sf3(sum(d) / 7) + ' and ' + (a + 2)],
        ['Which is the better measure of a typical price, and why?', 1, 'The median: the mean is pulled up by the outlier'],
        ['Find the standard deviation with and without the largest value, and comment.', 3, (function () { var f = function (A) { var m = sum(A) / A.length; return Math.sqrt(sum(A.map(function (x) { return x * x; })) / A.length - m * m); }; return sf3(f(d)) + ' and ' + sf3(f(d.slice(0, 6))) + ': the SD is very sensitive to the outlier'; })()]
      ]);
    },
    function () {
      var m = ri(10, 20), a = m - ri(1, 5), b = m + ri(1, 5), c = m + ri(-3, 3);
      var x = 4 * m - a - b - c;
      return Q('Four numbers ' + a + ', ' + b + ', ' + c + ' and ' + M('x') + ' have mean ' + m + '.', [
        ['Find ' + M('x') + '.', 1, x],
        ['Find the variance of the four numbers.', 2, sf3(sum([a, b, c, x].map(function (v) { return (v - m) * (v - m); })) / 4)],
        ['If ' + M('x') + ' could be changed while keeping the other three fixed, which value of ' + M('x') + ' would give the smallest variance?', 2, sf3((a + b + c) / 3) + ': the mean of the other three']
      ]);
    },
    function () {
      var n = ri(4, 9);
      return Q('Consider the integers ' + M('1, 2, 3, \\ldots, ' + n) + '.', [
        ['Find the mean.', 1, num((n + 1) / 2)],
        ['Using ' + M('\\sum x^2 = \\frac{n(n + 1)(2n + 1)}{6}') + ', show that the variance is ' + M('\\frac{n^2 - 1}{12}') + '.', 3, M('\\frac{(n + 1)(2n + 1)}{6} - \\frac{(n + 1)^2}{4}')],
        ['Check for ' + M('n = ' + n) + '.', 1, M(F(n * n - 1, 12))]
      ]);
    }
  ]);

  X('al-representations', [
    function () {
      var w = [5, 5, 10, 20], f = [ri(4, 12), ri(8, 16), ri(10, 24), ri(6, 16)], st = [0, 5, 10, 20, 40];
      var fd = f.map(function (x, i) { return x / w[i]; });
      var lo = 7, hi = 25, est = f[0] * 0 + f[1] * (10 - lo) / 5 + f[2] + f[3] * (hi - 20) / 20;
      return Q('Journey times: 0–5 min: ' + f[0] + ', 5–10: ' + f[1] + ', 10–20: ' + f[2] + ', 20–40: ' + f[3] + '.', [
        ['Find the frequency density for each class.', 2, fd.map(sf3).join(', ')],
        ['Estimate how many journeys took between ' + lo + ' and ' + hi + ' minutes.', 3, sf3(est)],
        ['On the histogram, the 0–5 bar is 2 cm wide and ' + sf3(fd[0] * 0.5) + ' cm tall. Find the width and height of the 20–40 bar.', 2, '8 cm wide, ' + sf3(fd[3] * 0.5) + ' cm tall']
      ]);
    },
    function () {
      var a = [ri(10, 20)], b = [ri(10, 20)];
      for (var i = 0; i < 4; i++) { a.push(a[i] + ri(2, 8)); b.push(b[i] + ri(2, 8)); }
      return Q('Box plots: Group A min ' + a[0] + ', Q1 ' + a[1] + ', median ' + a[2] + ', Q3 ' + a[3] + ', max ' + a[4] + '. Group B min ' + b[0] + ', Q1 ' + b[1] + ', median ' + b[2] + ', Q3 ' + b[3] + ', max ' + b[4] + '.', [
        ['Compare the groups using two measures, in context.', 2, 'Median ' + a[2] + ' vs ' + b[2] + '; IQR ' + (a[3] - a[1]) + ' vs ' + (b[3] - b[1])],
        ['Describe the skew of group A.', 2, (a[3] - a[2] > a[2] - a[1] ? 'Positive' : a[3] - a[2] < a[2] - a[1] ? 'Negative' : 'Symmetric') + ': ' + M('Q_3 - Q_2 = ' + (a[3] - a[2])) + ', ' + M('Q_2 - Q_1 = ' + (a[2] - a[1]))],
        ['What information do box plots lose compared with histograms?', 1, 'The detailed shape, e.g. two peaks']
      ]);
    },
    function () {
      var N = pick([80, 120, 200]);
      return Q('A cumulative frequency graph shows the marks of ' + N + ' students.', [
        ['Explain how to estimate the 90th percentile.', 1, 'Read across from ' + 0.9 * N + ' to the curve and down'],
        ['The pass mark is set so that 70% pass. Explain how to find it.', 2, 'Read across from ' + 0.3 * N + ' (30% fail)'],
        ['Why is a cumulative frequency graph useful for grouped data?', 1, 'It allows medians and percentiles to be estimated without individual values']
      ]);
    },
    function () {
      var f1 = ri(10, 30), w1 = 5, h1 = ri(2, 6), w2 = 15, f2 = ri(15, 45);
      return Q('On a histogram, a bar for a class of width ' + w1 + ' represents frequency ' + f1 + ' and has height ' + h1 + ' cm and width 1 cm.', [
        ['Find the area that represents one item.', 2, sf3(h1 / f1) + ' cm²'],
        ['A class of width ' + w2 + ' has frequency ' + f2 + '. Find the width and height of its bar.', 3, '3 cm wide, ' + sf3(f2 * h1 / f1 / 3) + ' cm tall'],
        ['Explain why height is not proportional to frequency here.', 1, 'Classes have different widths; area is proportional to frequency']
      ]);
    },
    function () {
      var q1 = ri(20, 30), q2 = q1 + ri(2, 8), q3 = q2 + ri(2, 8);
      return Q('A data set has ' + M('Q_1 = ' + q1) + ', ' + M('Q_2 = ' + q2) + ', ' + M('Q_3 = ' + q3) + ', mean ' + sf3(q2 + (q3 - q2 - (q2 - q1)) / 2) + '.', [
        ['Describe the skewness using the quartiles.', 2, (q3 - q2 > q2 - q1 ? 'Positive' : q3 - q2 < q2 - q1 ? 'Negative' : 'Symmetric')],
        ['Describe the skewness using the mean and median.', 1, (q3 - q2 > q2 - q1 ? 'Mean > median: positive' : q3 - q2 < q2 - q1 ? 'Mean < median: negative' : 'Mean = median: symmetric')],
        ['Sketch a distribution with this skew.', 1, 'A long tail to the ' + (q3 - q2 >= q2 - q1 ? 'right' : 'left')]
      ]);
    },
    function () {
      return Q('A data set of reaction times includes the value 0.002 seconds.', [
        ['Explain why this is likely to be an error rather than an outlier.', 1, 'It is impossibly fast for a human reaction'],
        ['Describe how data cleaning should handle it.', 1, 'Remove it (or check the record), and note this in the report'],
        ['Explain how removing it changes the mean, median and standard deviation.', 2, 'Mean rises; median barely changes; SD falls']
      ]);
    },
    function () {
      return Q('Choose a suitable representation for each, with a reason.', [
        ['The relationship between arm span and height.', 1, 'Scatter diagram: two paired variables'],
        ['Comparing the distributions of journey time for two schools.', 1, 'Back-to-back box plots or histograms'],
        ['Showing what proportion of students chose each subject.', 1, 'Pie chart or bar chart: categorical data'],
        ['Showing how a quantity changes over time.', 1, 'Time series (line) graph']
      ]);
    },
    function () {
      var d = [ri(10, 19), ri(10, 19), ri(20, 29), ri(20, 29), ri(20, 29), ri(30, 39), ri(30, 39), ri(40, 49)].sort(function (p, q) { return p - q; });
      return Q('The data ' + d.join(', ') + ' are shown in a stem-and-leaf diagram.', [
        ['Draw the diagram with a key.', 2, d.map(function (x) { return Math.floor(x / 10) + '|' + (x % 10); }).join('; ') + ' (key 2|5 = 25)'],
        ['Find the median and range.', 2, num((d[3] + d[4]) / 2) + ' and ' + (d[7] - d[0])],
        ['Give one advantage of a stem-and-leaf diagram over a grouped frequency table.', 1, 'It keeps the individual values']
      ]);
    },
    function () {
      return Q('A company’s chart shows sales rising from 102 to 108 units, with the vertical axis starting at 100.', [
        ['Explain why the chart is misleading.', 1, 'The bar for 108 looks four times as tall as for 102'],
        ['Find the actual percentage increase.', 1, '5.88%'],
        ['Suggest how to redraw it fairly.', 1, 'Start the axis at 0, or clearly mark a broken axis']
      ]);
    },
    function () {
      var m1 = ri(60, 70), m2 = ri(60, 70), s1 = ri(4, 8), s2 = ri(9, 14);
      return Q('Class A scored mean ' + m1 + ', SD ' + s1 + '. Class B scored mean ' + m2 + ', SD ' + s2 + '.', [
        ['Compare the classes in context.', 2, (m1 > m2 ? 'A' : m1 < m2 ? 'B' : 'Neither') + ' did better on average; A was more consistent'],
        ['A student scored ' + (m2 + 2 * s2) + ' in B. How many SDs above the mean is this? Compare with the same score in A.', 2, '2 in B; ' + sf3((m2 + 2 * s2 - m1) / s1) + ' in A'],
        ['Explain why the same score is more impressive in one class.', 1, 'Scores in A are less spread, so a high score is rarer there']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
