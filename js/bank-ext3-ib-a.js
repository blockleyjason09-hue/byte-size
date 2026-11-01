/* Byte Size Classroom — deeper extension questions (set 3, IB Applications and Interpretation part a): approximation and error, sequences and series, financial mathematics, exponents and logarithms. SL and HL share questions where the content matches. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function money(x) { return x.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function stdf(x) { var p = Math.floor(Math.log10(Math.abs(x))); return M(sf3(x / Math.pow(10, p)) + ' \\times 10^{' + p + '}'); }

  X(['sl-approx', 'ib-approx'], [
    function () {
      var l = ri(20, 60), w = ri(10, 30);
      var Amax = (l + 0.5) * (w + 0.5), Amin = (l - 0.5) * (w - 0.5);
      return Q('A rectangle measures ' + l + ' cm by ' + w + ' cm, each to the nearest cm.', [
        ['Find the upper and lower bounds of the area.', 2, Amax + ' and ' + Amin + ' cm²'],
        ['Find the maximum percentage error in the area if ' + l * w + ' cm² is used.', 2, sf3(100 * (Amax - l * w) / (l * w)) + '%'],
        ['Compare this with the percentage errors in the lengths and explain.', 2, 'About ' + sf3(50 / l + 50 / w) + '%: percentage errors roughly add when multiplying']
      ]);
    },
    function () {
      var d = pick([1.496e11, 7.78e11, 5.9e12]), c = 3e8;
      return Q('Light travels at ' + stdf(c) + ' m s⁻¹. A planet is ' + stdf(d) + ' m from the Sun.', [
        ['Find the time for light to reach the planet, in standard form.', 2, stdf(d / c) + ' s'],
        ['Convert this to minutes, to 3 s.f.', 1, sf3(d / c / 60) + ' minutes'],
        ['How many times further is this than the Moon (' + stdf(3.84e8) + ' m)?', 1, stdf(d / 3.84e8)]
      ]);
    },
    function () {
      var appr = pick([['\\frac{22}{7}', 22 / 7], ['3.14', 3.14], ['\\frac{355}{113}', 355 / 113]]);
      return Q('Approximating ' + M('\\pi') + ' by ' + M(appr[0]) + '.', [
        ['Find the percentage error.', 2, (function (e) { return e < 0.001 ? stdf(e) + '%' : sf3(e) + '%'; })(100 * Math.abs(appr[1] - Math.PI) / Math.PI)],
        ['A circle has radius 20 m. Find the absolute error in its area when this approximation is used.', 2, sf3(Math.abs(appr[1] - Math.PI) * 400) + ' m²'],
        ['Explain why the percentage error in the area equals that for ' + M('\\pi') + '.', 1, 'The area is ' + M('\\pi') + ' times an exact number']
      ]);
    },
    function () {
      var d = 10 * ri(10, 40), t = ri(10, 30);
      return Q('A runner covers ' + d + ' m, to the nearest 10 m, in ' + t + ' s, to the nearest second.', [
        ['Find the upper bound of the speed.', 2, sf3((d + 5) / (t - 0.5)) + ' m s⁻¹'],
        ['Find the lower bound of the speed.', 1, sf3((d - 5) / (t + 0.5)) + ' m s⁻¹'],
        ['Give the speed to a suitable degree of accuracy, explaining your choice.', 1, 'Both bounds round to ' + (Math.round((d + 5) / (t - 0.5)) === Math.round((d - 5) / (t + 0.5)) ? Math.round(d / t) + ' m s⁻¹ to the nearest whole number' : sf3(d / t).slice(0, 1) + '… — only 1 s.f. is reliable')]
      ]);
    },
    function () {
      var A = ri(200, 900);
      return Q('The area of a square is ' + A + ' cm², correct to the nearest 10 cm².', [
        ['Find the bounds of the area.', 1, (Math.round(A / 10) * 10 - 5) + ' and ' + (Math.round(A / 10) * 10 + 5)],
        ['Find the bounds of the side length.', 2, sf3(Math.sqrt(Math.round(A / 10) * 10 - 5)) + ' and ' + sf3(Math.sqrt(Math.round(A / 10) * 10 + 5)) + ' cm'],
        ['Explain why the percentage error in the side is about half that in the area.', 1, 'The side is the square root of the area']
      ]);
    },
    function () {
      var a = ri(40, 80), b = ri(10, 30);
      return Q('Two lengths are ' + a + ' cm and ' + b + ' cm, each to the nearest cm.', [
        ['Find the bounds of their sum.', 1, (a + b - 1) + ' and ' + (a + b + 1)],
        ['Find the bounds of their difference.', 2, (a - b - 1) + ' and ' + (a - b + 1)],
        ['Explain why the error in the difference is not smaller than in the sum.', 1, 'Errors in the two lengths can combine in either direction']
      ]);
    },
    function () {
      var r = ri(5, 20), e = pick([1, 2, 5]);
      return Q('The radius of a sphere is measured as ' + r + ' cm with a possible error of ' + e + '%.', [
        ['Find the possible percentage error in the volume.', 2, 'About ' + sf3(100 * (Math.pow(1 + e / 100, 3) - 1)) + '%'],
        ['Explain why it is roughly three times the error in the radius.', 1, M('V \\propto r^3')],
        ['Find the range of possible volumes.', 2, sf3(4 / 3 * Math.PI * Math.pow(r * (1 - e / 100), 3)) + ' to ' + sf3(4 / 3 * Math.PI * Math.pow(r * (1 + e / 100), 3)) + ' cm³']
      ]);
    },
    function () {
      var p = pick([6.7e7, 8.3e7, 1.4e9]), a = pick([2.4e5, 3.6e5, 9.6e6]);
      return Q('A country has population ' + stdf(p) + ' and area ' + stdf(a) + ' km².', [
        ['Find the population density.', 2, sf3(p / a) + ' people per km²'],
        ['The population grows by 0.5% a year. Find the population in 10 years, in standard form.', 2, stdf(p * Math.pow(1.005, 10))],
        ['Explain why the answer should be given to only 2 or 3 s.f.', 1, 'The original data are approximate']
      ]);
    },
    function () {
      var x = ri(1000, 9999) / 100;
      return Q('A student rounds ' + x + ' to 1 significant figure and to 1 decimal place.', [
        ['Give both roundings.', 1, sf3(Number(x.toPrecision(1))) + ' and ' + x.toFixed(1)],
        ['Find the percentage error for each.', 2, sf3(100 * Math.abs(Number(x.toPrecision(1)) - x) / x) + '% and ' + sf3(100 * Math.abs(Number(x.toFixed(1)) - x) / x) + '%'],
        ['When is rounding to significant figures more useful than decimal places?', 1, 'For very large or very small numbers']
      ]);
    },
    function () {
      var v = ri(20, 60), t = ri(2, 6);
      return Q('A car travels at ' + v + ' m s⁻¹ (to the nearest m s⁻¹) for ' + t + '.0 s (to 1 d.p.).', [
        ['Find the bounds of the distance.', 2, sf3((v - 0.5) * (t - 0.05)) + ' to ' + sf3((v + 0.5) * (t + 0.05)) + ' m'],
        ['Find the maximum percentage error in using ' + v * t + ' m.', 2, sf3(100 * ((v + 0.5) * (t + 0.05) - v * t) / (v * t)) + '%']
      ]);
    }
  ]);

  X(['sl-seq', 'ib-arith'], [
    function () {
      var a = ri(15, 25), d = ri(1, 3), n = ri(20, 30), T = ri(25, 40);
      var k = Math.ceil((T - a) / d) + 1;
      return Q('A theatre has ' + a + ' seats in the first row, and each row has ' + d + ' more than the row in front. There are ' + n + ' rows.', [
        ['Find the number of seats in the last row.', 1, a + (n - 1) * d],
        ['Find the total number of seats.', 2, n / 2 * (2 * a + (n - 1) * d)],
        ['Find the first row with more than ' + T + ' seats.', 2, 'Row ' + (a + (k - 1) * d > T ? k : k + 1)]
      ]);
    },
    function () {
      var a = ri(-5, 10), d = nz(-3, 5);
      return Q('An arithmetic sequence has ' + M('u_3 = ' + (a + 2 * d)) + ' and ' + M('u_8 = ' + (a + 7 * d)) + '.', [
        ['Find ' + M('u_1') + ' and ' + M('d') + '.', 2, M('u_1 = ' + a + ',\\ d = ' + d)],
        ['Find ' + M('S_{20}') + '.', 1, 10 * (2 * a + 19 * d)],
        ['Is ' + (a + 50 * d + (d > 0 ? 1 : -1)) + ' a term of the sequence? Explain.', 1, 'No: it would need a non-integer ' + M('n')]
      ]);
    },
    function () {
      var a = ri(2, 10), d = ri(2, 6), T = ri(1000, 5000);
      var n = 1; while (n / 2 * (2 * a + (n - 1) * d) <= T) n++;
      return Q('An arithmetic series has first term ' + a + ' and common difference ' + d + '.', [
        ['Use technology to find the smallest ' + M('n') + ' for which ' + M('S_n > ' + T) + '.', 2, n],
        ['Find ' + M('S_n') + ' for this ' + M('n') + '.', 1, n / 2 * (2 * a + (n - 1) * d)],
        ['Explain why solving ' + M('S_n = ' + T) + ' as a quadratic gives a non-integer answer.', 1, M('S_n') + ' jumps past ' + T + ' between consecutive integers']
      ]);
    },
    function () {
      var a = ri(2, 5), b = ri(1, 9), n = ri(10, 30), T = n * (a * (n + 1) / 2) + b * n;
      return Q('Given ' + M('\\sum_{k = 1}^{n} (' + a + 'k + ' + b + ') = ' + T) + '.', [
        ['Write the first and last terms.', 1, (a + b) + ' and ' + M(a + 'n + ' + b)],
        ['Find ' + M('n') + '.', 3, n],
        ['Find ' + M('\\sum_{k = 1}^{' + 2 * n + '} (' + a + 'k + ' + b + ')') + '.', 1, 2 * n * (a * (2 * n + 1) / 2) + 2 * b * n]
      ]);
    },
    function () {
      var V = ri(20, 40) * 1000, d = ri(15, 30) * 100;
      return Q('A machine worth $' + V.toLocaleString('en-GB') + ' loses $' + d.toLocaleString('en-GB') + ' in value each year (straight-line depreciation).', [
        ['Find its value after 5 years.', 1, '$' + (V - 5 * d).toLocaleString('en-GB')],
        ['After how many full years is it worth less than $' + (V / 4).toLocaleString('en-GB') + '?', 2, Math.floor((V - V / 4) / d) + 1],
        ['Explain why this model must eventually fail.', 1, 'It would give a negative value']
      ]);
    }
  ]);

  X('ib-arith', [
    function () {
      var n = ri(10, 25);
      return Q('Cans are stacked in rows: 1 on top, 2 in the next row, and so on.', [
        ['How many cans are in a stack of ' + n + ' rows?', 1, n * (n + 1) / 2],
        ['What is the greatest number of complete rows that can be made from 500 cans?', 2, Math.floor((-1 + Math.sqrt(1 + 4000)) / 2)],
        ['How many cans would be left over?', 1, 500 - (function (k) { return k * (k + 1) / 2; })(Math.floor((-1 + Math.sqrt(4001)) / 2))]
      ]);
    },
    function () {
      return Q('The numbers ' + M('x + 1') + ', ' + M('3x - 1') + ' and ' + M('4x + 2') + ' are consecutive terms of an arithmetic sequence.', [
        ['Find ' + M('x') + '.', 2, M('2(3x - 1) = (x + 1) + (4x + 2)') + ', ' + M('x = 5')],
        ['Find the common difference.', 1, 8],
        ['Find the next two terms.', 1, '30, 38']
      ]);
    },
    function () {
      var k = pick([7, 9, 11]), lo = 100, hi = 500;
      var first = Math.ceil(lo / k) * k, last = Math.floor(hi / k) * k, n = (last - first) / k + 1;
      return Q('Consider the multiples of ' + k + ' between ' + lo + ' and ' + hi + '.', [
        ['Find the first and last such multiples.', 1, first + ' and ' + last],
        ['How many are there?', 1, n],
        ['Find their sum.', 2, n * (first + last) / 2]
      ]);
    },
    function () {
      var a1 = ri(5, 20), d1 = ri(1, 3), a2 = ri(-10, 0), d2 = d1 + ri(2, 4);
      var n = 1; while (a2 + (n - 1) * d2 <= a1 + (n - 1) * d1) n++;
      return Q('Sequence A has ' + M('u_1 = ' + a1 + ',\\ d = ' + d1) + '. Sequence B has ' + M('u_1 = ' + a2 + ',\\ d = ' + d2) + '.', [
        ['Find the first term of B that is greater than the corresponding term of A.', 3, 'Term ' + n],
        ['Find the first ' + M('n') + ' for which the sum of B exceeds the sum of A.', 3, (function () { var m = 1; while (m / 2 * (2 * a2 + (m - 1) * d2) <= m / 2 * (2 * a1 + (m - 1) * d1)) m++; return m; })()],
        ['Explain why the second answer is larger than the first.', 1, 'B starts behind, so it needs extra terms to make up the earlier difference']
      ]);
    },
    function () {
      var S = ri(100, 300) * 2, n = pick([10, 12, 16, 20]);
      return Q('The sum of ' + n + ' terms of an arithmetic series is ' + S + '.', [
        ['Find the sum of the first and last terms.', 1, M(F(2 * S, n))],
        ['If the first term is 1, find the common difference.', 2, M(F(2 * S / n - 2, n - 1))],
        ['Explain why many sequences have this sum.', 1, 'Only ' + M('u_1 + u_n') + ' is fixed']
      ]);
    }
  ]);

  X(['sl-seq', 'ib-geom'], [
    function () {
      var h = ri(2, 10), r = pick([0.5, 0.6, 0.75, 0.8]);
      return Q('A ball is dropped from ' + h + ' m. Each bounce reaches ' + r * 100 + '% of the previous height.', [
        ['Find the height after the 4th bounce.', 1, sf3(h * Math.pow(r, 4)) + ' m'],
        ['Find the total distance travelled before it comes to rest (theoretically).', 3, sf3(h + 2 * h * r / (1 - r)) + ' m'],
        ['Explain why the model is unrealistic.', 1, 'It predicts infinitely many bounces']
      ]);
    },
    function () {
      var S = ri(25, 45) * 1000, p = pick([2, 3, 4]), n = 10;
      var tot = S * (Math.pow(1 + p / 100, n) - 1) / (p / 100);
      return Q('A salary starts at $' + S.toLocaleString('en-GB') + ' and rises by ' + p + '% each year.', [
        ['Find the salary in year 10.', 1, '$' + money(S * Math.pow(1 + p / 100, 9))],
        ['Find the total earned over 10 years.', 2, '$' + money(tot)],
        ['In which year does the salary first exceed $' + (S * 1.5).toLocaleString('en-GB') + '?', 2, (function () { var k = 1; while (S * Math.pow(1 + p / 100, k - 1) <= S * 1.5) k++; return 'Year ' + k; })()]
      ]);
    },
    function () {
      var a = ri(10, 100), r = pick([0.2, 0.25, 0.4, 0.5, -0.5]);
      return Q('A geometric series has first term ' + a + ' and ratio ' + r + '.', [
        ['Find ' + M('S_\\infty') + '.', 1, sf3(a / (1 - r))],
        ['Find the least ' + M('n') + ' for which ' + M('S_n') + ' is within 0.1 of ' + M('S_\\infty') + '.', 3, Math.ceil(Math.log(0.1 * (1 - r) / a) / Math.log(Math.abs(r)) - 1e-12)],
        ['Explain why a negative ratio makes the partial sums alternate above and below the limit.', 1, 'Terms alternate in sign']
      ]);
    },
    function () {
      var a = ri(2, 10), r = pick([1.2, 1.5, 2, 3]), T = pick([1000, 5000, 10000]);
      var n = 1; while (a * Math.pow(r, n - 1) <= T) n++;
      return Q('A geometric sequence has ' + M('u_1 = ' + a) + ' and ' + M('r = ' + r) + '.', [
        ['Find the first term that exceeds ' + T + '.', 2, 'Term ' + n + ': ' + sf3(a * Math.pow(r, n - 1))],
        ['Solve ' + M(a + ' \\times ' + r + '^{n - 1} = ' + T) + ' using logarithms.', 2, M('n = ' + sf3(1 + Math.log(T / a) / Math.log(r)))],
        ['Explain how the two answers relate.', 1, 'The first integer above the log answer']
      ]);
    },
    function () {
      var A = ri(30, 40) * 1000, inc = ri(10, 20) * 100, p = pick([3, 4, 5]);
      var n = 1; while (A * Math.pow(1 + p / 100, n - 1) <= A + (n - 1) * inc) n++;
      return Q('Job 1 pays $' + A.toLocaleString('en-GB') + ' rising by $' + inc.toLocaleString('en-GB') + ' each year. Job 2 pays the same at first but rises by ' + p + '% each year.', [
        ['Find the salaries in year 5.', 2, '$' + (A + 4 * inc).toLocaleString('en-GB') + ' and $' + money(A * Math.pow(1 + p / 100, 4))],
        ['Find the first year in which Job 2 pays more.', 2, 'Year ' + n],
        ['Which is better over 20 years in total? Show working.', 2, (function () { var t1 = 10 * (2 * A + 19 * inc), t2 = A * (Math.pow(1 + p / 100, 20) - 1) / (p / 100); return (t1 > t2 ? 'Job 1' : 'Job 2') + ': $' + money(t1) + ' vs $' + money(t2); })()]
      ]);
    }
  ]);

  X('ib-geom', [
    function () {
      var a = pick([2, 3, 5]), r = pick([2, 3, -2]);
      return Q('A geometric sequence has ' + M('u_2 = ' + a * r) + ' and ' + M('u_5 = ' + a * Math.pow(r, 4)) + '.', [
        ['Find ' + M('r') + ' and ' + M('u_1') + '.', 2, M('r = ' + r + ',\\ u_1 = ' + a)],
        ['Find ' + M('S_{10}') + '.', 2, sf3(a * (Math.pow(r, 10) - 1) / (r - 1))],
        ['Explain why ' + M('u_2') + ' and ' + M('u_4') + ' alone would not fix the sign of ' + M('r') + '.', 1, M('r^2') + ' has two square roots']
      ]);
    },
    function () {
      var p = pick([3, 5, 7, 10]);
      return Q('An investment grows by ' + p + '% per year.', [
        ['Find how many years it takes to double.', 2, sf3(Math.log(2) / Math.log(1 + p / 100)) + ' years'],
        ['Compare with the “rule of 72” estimate.', 1, sf3(72 / p) + ' years'],
        ['How long to multiply by 8?', 1, sf3(3 * Math.log(2) / Math.log(1 + p / 100)) + ' years (three doublings)']
      ]);
    },
    function () {
      var a = ri(10, 50), r = pick([0.5, 0.8, 0.9]);
      return Q('A geometric series has ' + M('u_1 = ' + a) + ' and ' + M('r = ' + r) + '.', [
        ['Find ' + M('S_\\infty') + ' and ' + M('S_{10}') + '.', 2, sf3(a / (1 - r)) + ' and ' + sf3(a * (1 - Math.pow(r, 10)) / (1 - r))],
        ['What percentage of ' + M('S_\\infty') + ' is ' + M('S_{10}') + '?', 1, sf3(100 * (1 - Math.pow(r, 10))) + '%'],
        ['Show that this percentage does not depend on ' + M('u_1') + '.', 1, M('\\frac{S_{10}}{S_\\infty} = 1 - r^{10}')]
      ]);
    },
    function () {
      return Q('The numbers ' + M('x') + ', ' + M('x + 4') + ' and ' + M('3x') + ' are consecutive terms of a geometric sequence, with ' + M('x > 0') + '.', [
        ['Show that ' + M('2x^2 - 8x - 16 = 0') + '.', 2, M('(x + 4)^2 = 3x^2')],
        ['Find ' + M('x') + ' and the common ratio.', 2, M('x = 2 + 2\\sqrt{3} \\approx ' + sf3(2 + 2 * Math.sqrt(3))) + ', ' + M('r = ' + sf3((6 + 2 * Math.sqrt(3)) / (2 + 2 * Math.sqrt(3))))]
      ]);
    },
    function () {
      var P0 = ri(2, 9) * 1000, p = pick([1.5, 2, 2.5]), T = ri(15, 30);
      return Q('A town of ' + P0.toLocaleString('en-GB') + ' grows by ' + p + '% per year.', [
        ['Find the population after ' + T + ' years.', 1, Math.round(P0 * Math.pow(1 + p / 100, T)).toLocaleString('en-GB')],
        ['Find the total number of births if each year there are births equal to 3% of the population at the start of that year, over ' + T + ' years.', 3, Math.round(0.03 * P0 * (Math.pow(1 + p / 100, T) - 1) / (p / 100)).toLocaleString('en-GB')],
        ['State an assumption of the model.', 1, 'The growth rate stays constant']
      ]);
    }
  ]);

  X(['sl-finance', 'ib-finance'], [
    function () {
      var P = ri(2, 20) * 1000, r = pick([3, 4, 5, 6]), n = ri(5, 15), k = pick([1, 4, 12]);
      var FV = P * Math.pow(1 + r / (100 * k), k * n);
      return Q('$' + P.toLocaleString('en-GB') + ' is invested at ' + r + '% per year compounded ' + { 1: 'annually', 4: 'quarterly', 12: 'monthly' }[k] + '.', [
        ['Find the value after ' + n + ' years.', 2, '$' + money(FV)],
        ['Find the interest earned.', 1, '$' + money(FV - P)],
        ['Find the effective annual rate.', 2, sf3(100 * (Math.pow(1 + r / (100 * k), k) - 1)) + '%']
      ]);
    },
    function () {
      var P = ri(10, 30) * 1000, r = pick([4, 5, 6, 8]), N = pick([3, 5, 10]);
      var i = r / 1200, n = 12 * N, pmt = P * i / (1 - Math.pow(1 + i, -n));
      return Q('A loan of $' + P.toLocaleString('en-GB') + ' at ' + r + '% per year compounded monthly is repaid monthly over ' + N + ' years.', [
        ['Use technology to find the monthly payment.', 2, '$' + money(pmt)],
        ['Find the total interest paid.', 1, '$' + money(pmt * n - P)],
        ['Explain why increasing the term reduces the payment but increases total interest.', 1, 'Payments are spread out but interest accrues for longer']
      ]);
    },
    function () {
      var V = ri(20, 50) * 1000, d = pick([10, 15, 20]), n = ri(3, 8);
      return Q('A car worth $' + V.toLocaleString('en-GB') + ' depreciates by ' + d + '% per year.', [
        ['Find its value after ' + n + ' years.', 1, '$' + money(V * Math.pow(1 - d / 100, n))],
        ['After how many full years is it worth less than half its value?', 2, Math.ceil(Math.log(0.5) / Math.log(1 - d / 100))],
        ['Compare with straight-line depreciation of $' + (V / 10).toLocaleString('en-GB') + ' per year after ' + n + ' years.', 1, '$' + (V - n * V / 10).toLocaleString('en-GB')]
      ]);
    },
    function () {
      var P = ri(5, 20) * 1000, r = pick([4, 5]), inf = pick([2, 3]), n = 10;
      var nom = P * Math.pow(1 + r / 100, n), real = P * Math.pow((1 + r / 100) / (1 + inf / 100), n);
      return Q('$' + P.toLocaleString('en-GB') + ' is saved at ' + r + '% per year. Inflation is ' + inf + '% per year.', [
        ['Find the value after 10 years.', 1, '$' + money(nom)],
        ['Find its real value in today’s money.', 2, '$' + money(real)],
        ['Find the real annual rate of growth.', 1, sf3(100 * ((1 + r / 100) / (1 + inf / 100) - 1)) + '%']
      ]);
    },
    function () {
      var pmt = ri(1, 5) * 100, r = pick([3, 4, 5]), N = ri(10, 25);
      var i = r / 1200, n = 12 * N, FV = pmt * (Math.pow(1 + i, n) - 1) / i;
      return Q('$' + pmt + ' is saved at the end of each month at ' + r + '% per year compounded monthly.', [
        ['Use technology to find the balance after ' + N + ' years.', 2, '$' + money(FV)],
        ['Find the total amount paid in and the interest earned.', 2, '$' + (pmt * n).toLocaleString('en-GB') + '; $' + money(FV - pmt * n)],
        ['Explain why interest becomes a larger share of the balance over time.', 1, 'Interest is earned on earlier interest']
      ]);
    },
    function () {
      var P = ri(5, 15) * 1000, a = pick([4, 4.5]), b = pick([4.2, 4.4]);
      var A = P * Math.pow(1 + a / 100, 5), B = P * Math.pow(1 + b / 1200, 60);
      return Q('Bank A offers ' + a + '% compounded annually. Bank B offers ' + b + '% compounded monthly. $' + P.toLocaleString('en-GB') + ' is invested for 5 years.', [
        ['Find the value at each bank.', 2, '$' + money(A) + ' and $' + money(B)],
        ['Find the effective annual rate for Bank B.', 1, sf3(100 * (Math.pow(1 + b / 1200, 12) - 1)) + '%'],
        ['Which is better? Explain.', 1, A > B ? 'Bank A' : 'Bank B']
      ]);
    },
    function () {
      var P = ri(100, 300) * 1000, r = pick([3, 4, 5]), N = 25, pmt;
      var i = r / 1200, n = 12 * N; pmt = P * i / (1 - Math.pow(1 + i, -n));
      var bal10 = P * Math.pow(1 + i, 120) - pmt * (Math.pow(1 + i, 120) - 1) / i;
      return Q('A mortgage of $' + P.toLocaleString('en-GB') + ' at ' + r + '% (monthly) is repaid over 25 years.', [
        ['Find the monthly payment.', 2, '$' + money(pmt)],
        ['Find the outstanding balance after 10 years.', 3, '$' + money(bal10)],
        ['Explain why less than 40% of the loan has been repaid after 40% of the time.', 1, 'Early payments are mostly interest']
      ]);
    },
    function () {
      var P = ri(2, 10) * 1000, T = P * pick([1.5, 2]), r = pick([3, 5, 6]);
      return Q('$' + P.toLocaleString('en-GB') + ' is invested at ' + r + '% compounded monthly.', [
        ['Use technology to find how many months it takes to reach $' + T.toLocaleString('en-GB') + '.', 2, Math.ceil(Math.log(T / P) / Math.log(1 + r / 1200)) + ' months'],
        ['Find the rate needed to reach $' + T.toLocaleString('en-GB') + ' in 5 years.', 2, sf3(1200 * (Math.pow(T / P, 1 / 60) - 1)) + '%']
      ]);
    },
    function () {
      var c = ri(500, 2000), inf = pick([2, 3, 4]), n = 10;
      return Q('A basket of goods costs $' + c + ' today. Inflation is ' + inf + '% per year.', [
        ['Find the cost in 10 years.', 1, '$' + money(c * Math.pow(1 + inf / 100, n))],
        ['Find the equivalent of today’s $' + c + ' in money 10 years ago.', 1, '$' + money(c / Math.pow(1 + inf / 100, n))],
        ['How long until prices double?', 1, sf3(Math.log(2) / Math.log(1 + inf / 100)) + ' years']
      ]);
    },
    function () {
      var P = ri(1, 5) * 1000, r = pick([5, 8]);
      var simple = P * (1 + r * 10 / 100), comp = P * Math.pow(1 + r / 100, 10);
      return Q('$' + P.toLocaleString('en-GB') + ' is invested for 10 years at ' + r + '%.', [
        ['Find the value with simple interest.', 1, '$' + money(simple)],
        ['Find the value with annual compound interest.', 1, '$' + money(comp)],
        ['After how many years is the compound value at least 10% more than the simple value?', 2, (function () { var k = 1; while (P * Math.pow(1 + r / 100, k) < 1.1 * P * (1 + r * k / 100)) k++; return k; })()]
      ]);
    }
  ]);

  X(['sl-logs', 'ib-logs'], [
    function () {
      var a = pick([2, 3, 5]), b = pick([2, 3, 4]), x = ri(2, 6), c = a * Math.pow(b, x);
      return Q('Solve ' + M(a + ' \\times ' + b + '^x = ' + c) + '.', [
        ['Solve exactly.', 2, M('x = ' + x)],
        ['Solve ' + M(a + ' \\times ' + b + '^x = ' + (c + 10)) + ' using logarithms.', 2, M('x = \\frac{\\log(' + F(c + 10, a) + ')}{\\log ' + b + '} = ' + sf3(Math.log((c + 10) / a) / Math.log(b)))],
        ['Explain why the second answer is only slightly larger than ' + x + '.', 1, 'Exponential growth is fast, so a small increase in the output needs only a small increase in ' + M('x')]
      ]);
    },
    function () {
      var H = pick([1e-3, 1e-5, 1e-7, 1e-9]);
      var pH = -Math.log10(H);
      return Q('pH is defined by ' + M('\\text{pH} = -\\log_{10}[H^+]') + '.', [
        ['Find the pH when ' + M('[H^+] = ' + H.toExponential(0).replace('e', '\\times 10^{') + '}') + '.', 1, pH],
        ['A solution has pH ' + (pH + 2) + '. How many times lower is its ' + M('[H^+]') + '?', 1, 100],
        ['Find ' + M('[H^+]') + ' for pH 4.5.', 1, stdf(Math.pow(10, -4.5))]
      ]);
    },
    function () {
      var I1 = pick([60, 70, 80]), k = pick([2, 10, 100]);
      return Q('Sound level in decibels is ' + M('L = 10\\log_{10}\\left(\\frac{I}{I_0}\\right)') + '.', [
        ['By how much does ' + M('L') + ' increase if the intensity is multiplied by ' + k + '?', 2, sf3(10 * Math.log10(k)) + ' dB'],
        ['A sound is ' + I1 + ' dB. Another is ' + (I1 + 20) + ' dB. Compare intensities.', 1, '100 times as intense'],
        ['Explain why two identical speakers do not double the decibel level.', 1, 'Doubling intensity adds only about 3 dB']
      ]);
    },
    function () {
      var T = pick([5, 8, 12]), A0 = pick([100, 200, 500]);
      var k = Math.log(2) / T;
      return Q('A substance decays according to ' + M('A = ' + A0 + 'e^{-kt}') + ' with half-life ' + T + ' days.', [
        ['Find ' + M('k') + '.', 2, sf3(k)],
        ['Find when 10% remains.', 2, sf3(Math.log(10) / k) + ' days'],
        ['Explain why the time to fall to 10% does not depend on ' + A0 + '.', 1, 'The fraction remaining depends only on ' + M('t')]
      ]);
    },
    function () {
      var a = pick([2, 3, 5]);
      return Q('Solve ' + M('\\log_{10} x + \\log_{10}(x - 3) = 1') + '.', [
        ['Combine the logs.', 1, M('x(x - 3) = 10')],
        ['Solve, rejecting any invalid solution.', 3, M('x = 5') + '; ' + M('x = -2') + ' rejected'],
        ['Explain why it must be rejected.', 1, 'The log of a negative number is not defined']
      ]);
    },
    function () {
      var M1 = pick([5, 6]), M2 = M1 + pick([1, 2]);
      return Q('Earthquake magnitude ' + M('M = \\log_{10}\\left(\\frac{A}{A_0}\\right)') + '.', [
        ['How many times larger is the amplitude of a magnitude ' + M2 + ' quake than a magnitude ' + M1 + '?', 1, Math.pow(10, M2 - M1)],
        ['An amplitude is 500 times another. Find the difference in magnitude.', 1, sf3(Math.log10(500))],
        ['Why are logarithmic scales useful here?', 1, 'They compress a huge range of values']
      ]);
    },
    function () {
      var b = pick([2, 3, 5]), x = ri(10, 200);
      return Q('Change of base.', [
        ['Find ' + M('\\log_{' + b + '} ' + x) + ' using ' + M('\\log_{10}') + '.', 2, sf3(Math.log(x) / Math.log(b))],
        ['Solve ' + M(b + '^{2x} = ' + x) + '.', 2, sf3(Math.log(x) / Math.log(b) / 2)],
        ['Show that ' + M('\\log_a b \\times \\log_b a = 1') + '.', 1, M('\\frac{\\ln b}{\\ln a} \\times \\frac{\\ln a}{\\ln b}')]
      ]);
    },
    function () {
      var k = pick([0.05, 0.1, 0.2]), A = ri(50, 200);
      return Q('A quantity grows as ' + M('N = ' + A + 'e^{' + k + 't}') + '.', [
        ['Find the time to double.', 1, sf3(Math.log(2) / k)],
        ['Write ' + M('N = ' + A + ' \\times b^t') + ', finding ' + M('b') + '.', 2, M('b = e^{' + k + '} = ' + sf3(Math.exp(k)))],
        ['Interpret ' + M('b') + ' as a percentage growth rate.', 1, sf3(100 * (Math.exp(k) - 1)) + '% per unit time']
      ]);
    },
    function () {
      return Q('Laws of logarithms.', [
        ['Write ' + M('\\log 72 - \\log 2 - 2\\log 3') + ' as a single number.', 2, M('\\log 4')],
        ['Solve ' + M('\\ln(x + 1) - \\ln x = \\ln 3') + '.', 2, M('x = \\frac{1}{2}')],
        ['Solve ' + M('2\\ln x = \\ln(x + 6)') + '.', 2, M('x = 3') + ' (' + M('x = -2') + ' rejected)']
      ]);
    },
    function () {
      var a = pick([2, 3]), b = pick([5, 7]);
      return Q('Solve ' + M(a + '^{x + 1} = ' + b + '^{x}') + '.', [
        ['Take logs and make ' + M('x') + ' the subject.', 3, M('x = \\frac{\\ln ' + a + '}{\\ln ' + b + ' - \\ln ' + a + '}')],
        ['Evaluate.', 1, sf3(Math.log(a) / (Math.log(b) - Math.log(a)))],
        ['Check using technology by graphing both sides.', 1, 'The curves meet at the same ' + M('x')]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
