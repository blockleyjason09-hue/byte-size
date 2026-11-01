/* Byte Size Classroom — deeper extension questions (set 3, A level Year 1 part d): exponentials and logarithms, sampling, measures of location and spread, data representation. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function S0(v) { return v ? S(v) : ''; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function sum(a) { return a.reduce(function (p, q) { return p + q; }, 0); }

  X('al-explog', [
    function () {
      var a = ri(2, 5), b; do { b = ri(2, 7); } while (b === a);
      return Q('Solve ' + M('e^{2x} - ' + (a + b) + 'e^x + ' + a * b + ' = 0') + '.', [
        ['Use a substitution to form a quadratic and solve it.', 3, M('u = e^x') + ': ' + M('u = ' + a + '\\text{ or } ' + b)],
        ['Give the exact solutions.', 1, M('x = \\ln ' + a + '\\text{ or } \\ln ' + b)],
        ['Explain why ' + M('e^{2x} + ' + (a + b) + 'e^x + ' + a * b + ' = 0') + ' has no solutions.', 1, 'It would need ' + M('e^x') + ' negative']
      ]);
    },
    function () {
      var a = pick([2, 3, 5, 10]), b = pick([1.5, 2, 3, 0.5]);
      var m = Math.log10(b), c = Math.log10(a);
      return Q('A graph of ' + M('\\log_{10} y') + ' against ' + M('x') + ' is a straight line with gradient ' + m.toFixed(3) + ' and intercept ' + c.toFixed(3) + '.', [
        ['Show that ' + M('y = ab^x') + ' gives a straight line when ' + M('\\log_{10} y') + ' is plotted against ' + M('x') + '.', 2, M('\\log y = \\log a + x\\log b')],
        ['Find ' + M('a') + ' and ' + M('b') + '.', 2, M('a = 10^{' + c.toFixed(3) + '} \\approx ' + a + ',\\ b = 10^{' + m.toFixed(3) + '} \\approx ' + b)],
        ['Explain the significance of a negative gradient.', 1, M('b < 1') + ': exponential decay']
      ]);
    },
    function () {
      var a = pick([2, 3, 5]), n = pick([2, 3, -1, 0.5]);
      var x1 = 2, x2 = 8, y1 = a * Math.pow(x1, n), y2 = a * Math.pow(x2, n);
      return Q('Data fit ' + M('y = ax^n') + '. When ' + M('x = 2') + ', ' + M('y = ' + sf3(y1)) + ' and when ' + M('x = 8') + ', ' + M('y = ' + sf3(y2)) + '.', [
        ['Explain what to plot to get a straight line, and what the gradient represents.', 2, M('\\log y') + ' against ' + M('\\log x') + '; gradient ' + M('n')],
        ['Find ' + M('n') + ' and ' + M('a') + '.', 3, M('n = ' + num(n) + ',\\ a = ' + a)],
        ['Predict ' + M('y') + ' when ' + M('x = 32') + '.', 1, sf3(a * Math.pow(32, n))]
      ]);
    },
    function () {
      var T = pick([4, 5, 8, 10]), N0 = pick([200, 500, 800]), P = pick([10, 20, 25]);
      var k = Math.log(2) / T, t = Math.log(100 / P) / k;
      return Q('A substance decays according to ' + M('N = ' + N0 + 'e^{-kt}') + ' and has a half-life of ' + T + ' days.', [
        ['Find ' + M('k') + ' exactly.', 2, M('k = \\frac{\\ln 2}{' + T + '}')],
        ['Find when ' + P + '% of the substance remains.', 2, sf3(t) + ' days'],
        ['Find the rate of decay when ' + M('N = ' + N0 / 2) + ', and explain why it halves too.', 2, M(sf3(k * N0 / 2)) + ' per day; the rate is proportional to ' + M('N')]
      ]);
    },
    function () {
      var a = pick([2, 3]), b = pick([3, 5, 7]);
      if (a === b) b = 5;
      return Q('Solve ' + M(a + '^x = ' + b + '^{x - 1}') + '.', [
        ['Take logs and rearrange to make ' + M('x') + ' the subject.', 3, M('x = \\frac{\\ln ' + b + '}{\\ln ' + b + ' - \\ln ' + a + '}')],
        ['Find ' + M('x') + ' to 3 significant figures.', 1, sf3(Math.log(b) / (Math.log(b) - Math.log(a)))],
        ['Explain why the solution is greater than 1.', 1, 'The denominator is smaller than the numerator, as ' + M('\\ln ' + a + ' > 0')]
      ]);
    },
    function () {
      var p = pick([2, 3]), q = pick([5, 7]);
      return Q('Let ' + M('\\log_a 2 = p') + ' and ' + M('\\log_a 3 = q') + '.', [
        ['Express ' + M('\\log_a 72') + ' in terms of ' + M('p') + ' and ' + M('q') + '.', 2, M('3p + 2q')],
        ['Express ' + M('\\log_a \\frac{\\sqrt{6}}{8}') + '.', 2, M('\\frac{1}{2}q - \\frac{5}{2}p')],
        ['If ' + M('a = 6') + ', show that ' + M('p + q = 1') + '.', 1, M('\\log_6 6 = 1')]
      ]);
    },
    function () {
      var c = pick([[2, 4, -2], [7, 8, -1]]), k = c[0];
      return Q('Solve ' + M('\\log_2 x + \\log_2 (x - ' + k + ') = 3') + '.', [
        ['Combine the logs and form a quadratic.', 2, M('x(x - ' + k + ') = 8') + ', ' + M('x^2 - ' + k + 'x - 8 = 0')],
        ['Solve, rejecting any invalid solution.', 3, M('x = ' + c[1]) + '; ' + M('x = ' + c[2]) + ' is rejected (log of a negative number)']
      ]);
    },
    function () {
      var k = pick([1, 2, 3, 0.5]);
      return Q('Tangents to ' + M('y = e^{' + (k === 1 ? '' : k) + 'x}') + '.', [
        ['Find the tangent at ' + M('x = 0') + '.', 2, M('y = ' + (k === 1 ? '' : k) + 'x + 1')],
        ['Find the point where the tangent passes through the origin.', 3, M('\\left(' + F(1, 1).replace('1', '') + (k === 3 ? '\\frac{1}{3}' : num(1 / k)) + ', e\\right)') + ': the tangent at ' + M('x = t') + ' passes through the origin when ' + M('kt = 1')],
        ['Show that its gradient there is ' + M((k === 1 ? '' : k) + 'e') + '.', 1, M('\\frac{dy}{dx} = ' + (k === 1 ? '' : k) + 'e^{' + (k === 1 ? '' : k) + 'x}')]
      ]);
    },
    function () {
      var A = ri(50, 70), t1 = ri(5, 15), T1 = 20 + Math.round(A * pick([0.5, 0.6, 0.7])), k = -Math.log((T1 - 20) / A) / t1;
      var target = 30, tt = Math.log(A / (target - 20)) / k;
      return Q('A drink cools according to ' + M('T = 20 + ' + A + 'e^{-kt}') + ' (°C, minutes). After ' + t1 + ' minutes it is ' + T1 + '°C.', [
        ['Find ' + M('k') + '.', 2, M('k = ' + sf3(k))],
        ['Find when it reaches ' + target + '°C.', 2, sf3(tt) + ' minutes'],
        ['State the long-term temperature and explain.', 1, '20°C: ' + M('e^{-kt} \\to 0')]
      ]);
    },
    function () {
      var a = pick([1.05, 1.08, 1.1]);
      var t = 1; while (100 * Math.pow(a, t) <= 1000 + 50 * t) t++;
      return Q('Two models: ' + M('A = 100 \\times ' + a + '^t') + ' and ' + M('B = 1000 + 50t') + '.', [
        ['Which is larger when ' + M('t = 10') + '?', 1, 100 * Math.pow(a, 10) > 1500 ? 'A' : 'B'],
        ['Find the first whole value of ' + M('t') + ' for which ' + M('A > B') + '.', 3, t],
        ['Explain why the exponential model always overtakes the linear one eventually.', 1, 'Its increase grows in proportion to its size, while the linear increase stays fixed']
      ]);
    }
  ]);

  X('al-sampling', [
    function () {
      var g1 = ri(100, 400), g2 = ri(100, 400), g3 = ri(50, 200), n = pick([40, 50, 60]), N = g1 + g2 + g3;
      var s = [g1, g2, g3].map(function (v) { return v * n / N; });
      return Q('A school has ' + g1 + ' students in KS3, ' + g2 + ' in KS4 and ' + g3 + ' in the sixth form. A stratified sample of ' + n + ' is taken.', [
        ['Find the number from each group (to the nearest whole number).', 3, s.map(function (v) { return Math.round(v); }).join(', ')],
        ['Do your numbers add to ' + n + '? Explain how to deal with this if not.', 1, sum(s.map(Math.round)) === n ? 'Yes' : 'No (' + sum(s.map(Math.round)) + '); adjust the group with the largest rounding error'],
        ['Explain why stratified sampling may be better than simple random sampling here.', 1, 'It guarantees each age group is represented in proportion']
      ]);
    },
    function () {
      var n = pick([30, 40, 60]), k = pick([10, 15, 20, 25]), N = n * k;
      return Q('A systematic sample of ' + n + ' is taken from a list of ' + N + ' customers.', [
        ['Describe how to take the sample.', 2, 'Choose a random start from 1 to ' + k + ', then every ' + k + 'th name'],
        ['Explain a situation in which this could give a biased sample.', 1, 'If the list has a pattern that repeats every ' + k + ' entries (e.g. sorted by area)'],
        ['Is this a random sample? Explain.', 1, 'Not fully: once the start is chosen, the rest is fixed, so not every set of ' + n + ' is possible']
      ]);
    },
    function () {
      return Q('A researcher wants the views of shoppers in a town centre. She stands outside one supermarket at 10 am on a Tuesday and asks the first 50 people.', [
        ['Name this sampling method.', 1, 'Opportunity sampling'],
        ['Give two sources of bias.', 2, 'Only one shop; only one time — e.g. no workers or school pupils'],
        ['Suggest how a quota sample could improve this, and one remaining weakness.', 2, 'Set quotas by age and sex; but choice within each quota is still not random']
      ]);
    },
    function () {
      var n = pick([2000, 5000]), m = pick([100, 200]);
      return Q('A council wants to survey its ' + n + ' households about recycling.', [
        ['Suggest a sampling frame and one problem with it.', 2, 'The electoral roll or council tax list; it may be out of date or miss renters'],
        ['Describe how to select a simple random sample of ' + m + '.', 2, 'Number the households 1–' + n + ', use random numbers, ignoring repeats'],
        ['Why might a census be impractical?', 1, 'Cost and time; some households will not respond']
      ]);
    },
    function () {
      return Q('A factory tests the lifetime of light bulbs by running them until they fail.', [
        ['Explain why a census is impossible.', 1, 'Testing destroys the bulbs'],
        ['Explain how the sample size affects the reliability of the estimate of the mean lifetime.', 2, 'Larger samples give estimates that vary less between samples'],
        ['Suggest a sampling method if bulbs come from three production lines.', 1, 'Stratified, by production line']
      ]);
    },
    function () {
      return Q('A survey asks: "Don’t you agree that the new car park is a waste of money?"', [
        ['Explain why this question could bias the results.', 1, 'It is a leading question'],
        ['Rewrite it neutrally.', 1, '"What is your opinion of the new car park?" with balanced options'],
        ['Describe one other source of bias from people who choose not to reply.', 1, 'Non-response bias: those with strong views are more likely to reply']
      ]);
    },
    function () {
      var a = ri(30, 45), b = ri(40, 60), c = ri(8, 15), n = 20, N = a + b + c;
      var raw = [a, b, c].map(function (v) { return v * n / N; }), rd = raw.map(Math.round);
      return Q('Three strata contain ' + a + ', ' + b + ' and ' + c + ' members. A stratified sample of ' + n + ' is needed.', [
        ['Find the exact proportional numbers.', 2, raw.map(sf3).join(', ')],
        ['Round them and comment on the total.', 1, rd.join(', ') + ' — total ' + sum(rd)],
        ['How would you then select members within each stratum?', 1, 'Simple random sampling within each stratum']
      ]);
    },
    function () {
      var n1 = pick([5, 10]), n2 = pick([50, 100]);
      return Q('Two students estimate the mean height of Year 12. One takes a random sample of ' + n1 + ', the other of ' + n2 + '.', [
        ['Whose estimate is likely to be more reliable? Explain.', 1, 'The sample of ' + n2 + ': larger samples vary less'],
        ['Could the smaller sample give a closer estimate on a particular occasion? Explain.', 1, 'Yes, by chance'],
        ['Give one practical reason for preferring the smaller sample.', 1, 'Quicker and cheaper to collect']
      ]);
    },
    function () {
      var q = ri(10, 25);
      return Q('An interviewer is told to question ' + q + ' men and ' + q + ' women aged over 18 in a shopping centre.', [
        ['Name this method and give one advantage.', 2, 'Quota sampling; quick, with groups represented'],
        ['Explain why the sample is not random.', 1, 'The interviewer chooses who to ask'],
        ['Suggest how the results could still be biased.', 1, 'People who avoid interviewers, or who do not visit the centre, are excluded']
      ]);
    },
    function () {
      var N = pick([60, 80, 90]);
      return Q('Random numbers are used to choose 5 students from a list numbered 01–' + N + '. The calculator gives ' + [ri(1, N), ri(N + 1, 99), ri(1, N), ri(1, N), ri(1, N)].join(', ') + ', …', [
        ['Explain what to do with a number greater than ' + N + '.', 1, 'Ignore it'],
        ['Explain what to do with a repeated number.', 1, 'Ignore it (sampling without replacement)'],
        ['State one advantage of simple random sampling.', 1, 'Every sample of that size is equally likely; free of selection bias']
      ]);
    }
  ]);

  X('al-location', [
    function () {
      var a = pick([100, 50, 200]), b = pick([2, 5, 10]), n = ri(10, 30), my = ri(-5, 5), sy = ri(2, 6);
      var Sy = n * my, Syy = n * (sy * sy + my * my);
      return Q('Data are coded with ' + M('y = \\frac{x - ' + a + '}{' + b + '}') + '. For ' + n + ' values, ' + M('\\sum y = ' + Sy) + ' and ' + M('\\sum y^2 = ' + Syy) + '.', [
        ['Find the mean and standard deviation of ' + M('y') + '.', 2, my + ' and ' + sy],
        ['Find the mean and standard deviation of ' + M('x') + '.', 2, (a + b * my) + ' and ' + b * sy],
        ['Explain why subtracting ' + a + ' does not affect the standard deviation.', 1, 'It shifts all values equally, leaving the spread unchanged']
      ]);
    },
    function () {
      var n1 = ri(10, 20), n2 = ri(10, 20), m1 = ri(40, 60), m2 = ri(40, 60), s1 = ri(3, 8), s2 = ri(3, 8);
      var N = n1 + n2, mean = (n1 * m1 + n2 * m2) / N, Sxx = n1 * (s1 * s1 + m1 * m1) + n2 * (s2 * s2 + m2 * m2);
      var sd = Math.sqrt(Sxx / N - mean * mean);
      return Q('Group A: ' + n1 + ' values, mean ' + m1 + ', sd ' + s1 + '. Group B: ' + n2 + ' values, mean ' + m2 + ', sd ' + s2 + '.', [
        ['Find ' + M('\\sum x') + ' and ' + M('\\sum x^2') + ' for each group.', 3, 'A: ' + n1 * m1 + ', ' + n1 * (s1 * s1 + m1 * m1) + '; B: ' + n2 * m2 + ', ' + n2 * (s2 * s2 + m2 * m2)],
        ['Find the mean and standard deviation of the combined data.', 3, sf3(mean) + ' and ' + sf3(sd)],
        ['Explain why the combined sd can be larger than both group sds.', 1, 'The difference between the group means adds extra spread']
      ]);
    },
    function () {
      var n = ri(8, 15), m = ri(20, 40), s = ri(2, 5), x = m;
      return Q('A data set of ' + n + ' values has mean ' + m + ' and sd ' + s + '. A new value of ' + x + ' is added.', [
        ['Find the new mean.', 1, m],
        ['Find the new standard deviation.', 3, sf3(Math.sqrt(n * s * s / (n + 1)))],
        ['Explain why the sd decreases.', 1, 'The new value is at the mean, so it adds no squared deviation but increases ' + M('n')]
      ]);
    },
    function () {
      var f = [ri(5, 12), ri(10, 20), ri(10, 20), ri(5, 10)], b = [0, 10, 20, 30, 40], n = sum(f);
      var cf = 0, k = 0; while (cf + f[k] < n / 2) { cf += f[k]; k++; }
      var med = b[k] + (n / 2 - cf) / f[k] * 10;
      return Q('Times (minutes): 0–10: ' + f[0] + ', 10–20: ' + f[1] + ', 20–30: ' + f[2] + ', 30–40: ' + f[3] + '.', [
        ['Use linear interpolation to estimate the median.', 3, sf3(med)],
        ['State the assumption behind linear interpolation.', 1, 'Values are spread evenly within each class'],
        ['Estimate the mean, and compare it with the median to describe the skew.', 2, (function () { var mn = (f[0] * 5 + f[1] * 15 + f[2] * 25 + f[3] * 35) / n; return sf3(mn) + '; ' + (mn > med ? 'mean > median: slight positive skew' : mn < med ? 'mean < median: slight negative skew' : 'roughly symmetric'); })()]
      ]);
    },
    function () {
      var m = ri(40, 60), s = ri(4, 8), v = m + s * pick([1.5, 2.5, 3]);
      return Q('A data set has mean ' + m + ' and sd ' + s + '. An outlier is defined as more than 2 sd from the mean.', [
        ['Find the range of non-outlier values.', 1, (m - 2 * s) + ' to ' + (m + 2 * s)],
        ['Is ' + num(v) + ' an outlier?', 1, v > m + 2 * s ? 'Yes' : 'No'],
        ['Explain why outliers should not be removed automatically.', 1, 'They may be genuine values rather than errors']
      ]);
    },
    function () {
      var v = [ri(2, 9), ri(2, 9), ri(2, 9), ri(2, 9)], n = 5, m = Math.max(ri(5, 8), Math.ceil((sum(v) + 1) / 5));
      var x = n * m - sum(v);
      return Q('Five numbers ' + v.join(', ') + ' and ' + M('x') + ' have mean ' + m + '.', [
        ['Find ' + M('x') + '.', 1, x],
        ['Find the median and the standard deviation.', 3, (function () { var d = v.concat([x]).sort(function (p, q) { return p - q; }); var mm = sum(d) / 5; var sd = Math.sqrt(sum(d.map(function (y) { return y * y; })) / 5 - mm * mm); return 'Median ' + d[2] + ', sd ' + sf3(sd); })()],
        ['Find ' + M('x') + ' if instead the mean were ' + (m + 1) + '.', 1, x + 5]
      ]);
    },
    function () {
      var n = ri(5, 20);
      return Q('Consider the integers ' + M('1, 2, \\ldots, ' + n) + '.', [
        ['Find the mean.', 1, num((n + 1) / 2)],
        ['Using ' + M('\\sum r^2 = \\frac{n(n + 1)(2n + 1)}{6}') + ', show that the variance is ' + M('\\frac{n^2 - 1}{12}') + '.', 3, M('\\frac{(n + 1)(2n + 1)}{6} - \\frac{(n + 1)^2}{4}')],
        ['Find the sd for ' + M('n = ' + n) + '.', 1, sf3(Math.sqrt((n * n - 1) / 12))]
      ]);
    },
    function () {
      var n = ri(10, 20), m = ri(20, 40), s = ri(3, 6), x = m + 2 * s + ri(0, 3);
      var Sx = n * m, Sxx = n * (s * s + m * m), Sx2 = Sx - x, Sxx2 = Sxx - x * x;
      var m2 = Sx2 / (n - 1), s2 = Math.sqrt(Sxx2 / (n - 1) - m2 * m2);
      return Q(n + ' values have mean ' + m + ' and sd ' + s + '. The value ' + x + ' is found to be an error and removed.', [
        ['Find the new mean.', 2, sf3(m2)],
        ['Find the new standard deviation.', 3, sf3(s2)],
        ['Explain the direction of each change.', 1, 'Both decrease: the removed value was above the mean and far from it']
      ]);
    },
    function () {
      var a = ri(50, 60), b = a + ri(-5, 5), s1 = ri(5, 12), s2 = ri(5, 12);
      return Q('Two classes sat the same test. Class P: mean ' + a + ', sd ' + s1 + '. Class Q: mean ' + b + ', sd ' + s2 + '.', [
        ['Compare the classes in context.', 2, (a > b ? 'P' : a < b ? 'Q' : 'Neither class') + ' scored higher on average; ' + (s1 < s2 ? 'P' : s1 > s2 ? 'Q' : 'neither class') + ' was more consistent'],
        ['A student scored ' + (a + s1) + ' in class P. Find her standardised score ' + M('\\frac{x - \\bar{x}}{s}') + '.', 1, 1],
        ['What score in class Q would be equally good relative to the class?', 1, b + s2]
      ]);
    },
    function () {
      return Q('Prove a formula for the variance.', [
        ['Expand ' + M('\\sum (x - \\bar{x})^2') + '.', 2, M('\\sum x^2 - 2\\bar{x}\\sum x + n\\bar{x}^2')],
        ['Hence show it equals ' + M('\\sum x^2 - n\\bar{x}^2') + '.', 2, 'Use ' + M('\\sum x = n\\bar{x}')],
        ['Explain why the second form is easier for calculation.', 1, 'It needs only the totals ' + M('\\sum x') + ' and ' + M('\\sum x^2')]
      ]);
    }
  ]);

  X('al-representations', [
    function () {
      var w = [10, 10, 20, 30], f = [ri(4, 12), ri(10, 25), ri(15, 30), ri(6, 15)], lo = [0, 10, 20, 40];
      var a = 15, b = 50;
      var est = f[1] * 0.5 + f[2] + f[3] * (10 / 30);
      return Q('Masses (g): 0–10: ' + f[0] + ', 10–20: ' + f[1] + ', 20–40: ' + f[2] + ', 40–70: ' + f[3] + '.', [
        ['Find the frequency density for each class.', 2, f.map(function (v, i) { return sf3(v / w[i]); }).join(', ')],
        ['Estimate the number of masses between ' + a + ' g and ' + b + ' g.', 3, sf3(est)],
        ['Explain why a histogram is used rather than a bar chart.', 1, 'The classes have unequal widths; area shows frequency']
      ]);
    },
    function () {
      var q1 = ri(20, 30), q2 = q1 + ri(4, 8), q3 = q2 + ri(4, 8), iqr = q3 - q1, mx = q3 + Math.round(iqr * pick([1, 2])), mn = q1 - ri(2, 8);
      return Q('Data have ' + M('Q_1 = ' + q1) + ', median ' + q2 + ', ' + M('Q_3 = ' + q3) + ', minimum ' + mn + ', maximum ' + mx + '.', [
        ['Find the outlier limits using ' + M('1.5 \\times \\text{IQR}') + '.', 2, (q1 - 1.5 * iqr) + ' and ' + (q3 + 1.5 * iqr)],
        ['Is the maximum an outlier? How would the box plot show it?', 2, mx > q3 + 1.5 * iqr ? 'Yes: plot it as a cross, with the whisker ending at the largest non-outlier' : 'No: the whisker extends to it'],
        ['Describe the skew using the quartiles.', 1, (q3 - q2) > (q2 - q1) ? 'Positive skew' : (q3 - q2) < (q2 - q1) ? 'Negative skew' : 'Symmetric']
      ]);
    },
    function () {
      var n = pick([80, 120, 200]);
      return Q('A cumulative frequency graph is drawn for ' + n + ' values.', [
        ['Which values of the cumulative frequency would you read to find the 10th and 90th percentiles?', 1, n / 10 + ' and ' + 9 * n / 10],
        ['Explain why the 10–90 percentile range can be more useful than the range.', 1, 'It ignores the extreme 10% at each end'],
        ['Why are cumulative frequencies plotted at upper class boundaries?', 1, 'That is where the running total has been reached']
      ]);
    },
    function () {
      var w = ri(1, 3), hscale = ri(2, 4), f1 = ri(10, 40) * 2;
      var h1 = f1 / 10 * hscale / 2;
      var f2 = ri(5, 30), w2 = 15, area1 = w * h1, k = f1 / area1, h2 = f2 / (k * w * 1.5);
      return Q('On a histogram, the class 10–20 has frequency ' + f1 + ' and is drawn ' + w + ' cm wide and ' + sf3(h1) + ' cm tall.', [
        ['Find the frequency represented by 1 cm².', 2, sf3(k)],
        ['The class 20–35 has frequency ' + f2 + '. Find its width and height on the diagram.', 3, sf3(w * 1.5) + ' cm wide, ' + sf3(h2) + ' cm tall'],
        ['Explain why widths must be proportional to class widths.', 1, 'So that areas remain proportional to frequencies']
      ]);
    },
    function () {
      return Q('Choose a suitable diagram and justify.', [
        ['Comparing the distributions of reaction times of two groups.', 1, 'Box plots side by side'],
        ['Showing whether daily rainfall and temperature are related.', 1, 'A scatter diagram'],
        ['Showing the distribution of a large set of continuous data with unequal classes.', 1, 'A histogram'],
        ['Showing how sales change month by month.', 1, 'A time-series line graph']
      ]);
    },
    function () {
      var a = ri(60, 80), b = a + ri(2, 6);
      return Q('A graph shows exam pass rates rising from ' + a + '% to ' + b + '%, with the vertical axis running from ' + (a - 1) + '% to ' + (b + 1) + '%.', [
        ['Explain why the graph may mislead.', 1, 'The truncated axis exaggerates a small change'],
        ['Find the actual percentage increase in the pass rate.', 2, sf3(100 * (b - a) / a) + '%'],
        ['How should the graph be redrawn?', 1, 'Start the axis at 0 or clearly mark the break']
      ]);
    },
    function () {
      var n = pick([60, 100]), f = [ri(5, 15), ri(15, 25), ri(15, 25)]; f.push(n - sum(f));
      var cf = [f[0], f[0] + f[1], f[0] + f[1] + f[2], n], p = 0.8 * n, k = 0;
      while (cf[k] < p) k++;
      var lower = k ? cf[k - 1] : 0, est = k * 10 + (p - lower) / f[k] * 10;
      return Q('Scores of ' + n + ' students: 0–10: ' + f[0] + ', 10–20: ' + f[1] + ', 20–30: ' + f[2] + ', 30–40: ' + f[3] + '.', [
        ['Estimate the 80th percentile.', 3, sf3(est)],
        ['What does this value mean in context?', 1, '80% of students scored below about ' + sf3(est)],
        ['Why might the estimate be inaccurate?', 1, 'Grouped data; interpolation assumes even spread']
      ]);
    },
    function () {
      var a = [ri(20, 30), 0, 0, 0, 0], b = [ri(20, 30), 0, 0, 0, 0];
      for (var i = 1; i < 5; i++) { a[i] = a[i - 1] + ri(3, 8); b[i] = b[i - 1] + ri(2, 10); }
      return Q('Box plot A: ' + a.join(', ') + '. Box plot B: ' + b.join(', ') + ' (min, Q1, median, Q3, max).', [
        ['Compare the medians and IQRs in context of test scores.', 2, (a[2] === b[2] ? 'Equal medians' : (a[2] > b[2] ? 'A' : 'B') + ' has the higher median') + '; IQRs ' + (a[3] - a[1]) + ' and ' + (b[3] - b[1])],
        ['What percentage of A scored above ' + a[3] + '?', 1, '25%'],
        ['Can you tell which set has more students? Explain.', 1, 'No: box plots show proportions, not counts']
      ]);
    },
    function () {
      var x = [ri(10, 19), ri(20, 29), ri(20, 29), ri(30, 39), ri(30, 39), ri(40, 49), ri(40, 49)].sort(function (p, q) { return p - q; });
      return Q('Seven values: ' + x.join(', ') + '.', [
        ['Find the median and quartiles (use the positions ' + M('\\frac{n}{4}') + ' rounded up).', 2, 'Median ' + x[3] + ', ' + M('Q_1 = ' + x[1]) + ', ' + M('Q_3 = ' + x[5])],
        ['Draw a stem-and-leaf diagram with key.', 2, 'Stems 1–4 with leaves; key e.g. 2|5 = 25'],
        ['Why does a stem-and-leaf keep information that a box plot loses?', 1, 'It shows every individual value']
      ]);
    },
    function () {
      return Q('Skewness.', [
        ['A distribution has mean 52, median 47 and mode 44. Describe the skew.', 1, 'Positive skew'],
        ['Sketch the shape and explain which average is pulled most by the tail.', 2, 'Long tail to the right; the mean'],
        ['Suggest a real variable that is likely to be positively skewed.', 1, 'Income, waiting times, house prices']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
