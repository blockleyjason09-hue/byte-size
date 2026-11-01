/* Byte Size Classroom — deeper extension questions (set 3a): GCSE / International GCSE number topics.
   Eight further problem-solving questions per topic. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: p[2] }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function money(x) { return '£' + x.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function red(n, d) { var k = gcd(n, d) || 1; return [n / k, d / k]; }

  X('fractions', [
    function () {
      var p = ri(1, 4), q = ri(p + 1, 7), v = 1 + 1 / (1 + 1 / (1 + q / p)), r = red(2 * p + 3 * q, p + 2 * q) ;
      // 1 + 1/(1 + 1/(1 + q/p)) : 1 + q/p = (p+q)/p ; 1 + p/(p+q) = (2p+q)/(p+q) ; 1 + (p+q)/(2p+q) = (3p+2q)/(2p+q)
      var n1 = 3 * p + 2 * q, d1 = 2 * p + q;
      return Q('', [
        ['Write ' + M('1 + \\cfrac{1}{1 + \\cfrac{1}{1 + \\frac{' + q + '}{' + p + '}}}') + ' as a single fraction in its simplest form.', 3, M(F(n1, d1))],
        ['Show that ' + M('1 + \\cfrac{1}{1 + \\cfrac{1}{x}} = \\frac{2x + 1}{x + 1}') + '.', 2, M('1 + \\frac{1}{\\frac{x + 1}{x}} = 1 + \\frac{x}{x + 1} = \\frac{2x + 1}{x + 1}')],
        ['Find the value of ' + M('x') + ' for which ' + M('1 + \\cfrac{1}{1 + \\cfrac{1}{x}} = \\frac{7}{5}') + '.', 2, M('5(2x + 1) = 7(x + 1)') + ', ' + M('x = \\frac{2}{3}')]
      ]);
    },
    function () {
      var a, b, c, d;
      do { a = ri(1, 5); b = ri(a + 1, 9); c = ri(1, 7); d = ri(c + 1, 11); } while (gcd(a, b) > 1 || gcd(c, d) > 1 || a * d >= b * c);
      var mn = a + c, md = b + d;
      return Q('The mediant of ' + M('\\frac{a}{b}') + ' and ' + M('\\frac{c}{d}') + ' is ' + M('\\frac{a + c}{b + d}') + ' (with positive integers).', [
        ['Find the mediant of ' + M(F(a, b)) + ' and ' + M(F(c, d)) + ', and show that it lies between them.', 3, M(F(mn, md)) + '; as decimals ' + sf3(a / b) + ' < ' + sf3(mn / md) + ' < ' + sf3(c / d)],
        ['Prove that if ' + M('\\frac{a}{b} < \\frac{c}{d}') + ', then ' + M('\\frac{a}{b} < \\frac{a + c}{b + d}') + '.', 3, M('\\frac{a + c}{b + d} - \\frac{a}{b} = \\frac{bc - ad}{b(b + d)} > 0') + ' since ' + M('bc > ad')],
        ['A cricketer has a batting average of ' + M(F(a, b)) + ' runs per ball in one match and ' + M(F(c, d)) + ' in the next. Explain why the mediant gives the overall average, but the mean of the two fractions does not.', 2, 'Overall: total runs ÷ total balls = ' + M('\\frac{' + a + ' + ' + c + '}{' + b + ' + ' + d + '}') + '; the mean of the fractions ignores how many balls were faced in each.']
      ]);
    },
    function () {
      var k = ri(2, 6), digits = ['142857', '285714', '428571', '571428', '714285', '857142'][k - 1];
      return Q(M('\\frac{1}{7} = 0.\\dot{1}4285\\dot{7}') + '.', [
        ['Use this to write ' + M('\\frac{' + k + '}{7}') + ' as a recurring decimal without dividing.', 2, M('0.\\dot{' + digits[0] + '}' + digits.slice(1, 5) + '\\dot{' + digits[5] + '}') + ' (the same cycle, starting in a different place)'],
        ['Explain why the decimal for any fraction with denominator 7 repeats after at most 6 digits.', 2, 'When dividing by 7 the only possible non-zero remainders are 1 to 6, so a remainder must repeat within 6 steps.'],
        ['Prove that ' + M('0.\\dot{1}4285\\dot{7}') + ' equals ' + M('\\frac{1}{7}') + ' using algebra.', 3, M('10^6x - x = 142857') + ', ' + M('x = \\frac{142857}{999999} = \\frac{1}{7}')]
      ]);
    },
    function () {
      var t = pick([0.99, 0.999, 0.9999]), n = 1; while (1 - Math.pow(2, -n) <= t) n++;
      return Q('Consider ' + M('S_n = \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\cdots + \\frac{1}{2^n}') + '.', [
        ['Find ' + M('S_1, S_2, S_3') + ' and ' + M('S_4') + ' as fractions.', 2, M('\\frac{1}{2}, \\frac{3}{4}, \\frac{7}{8}, \\frac{15}{16}')],
        ['Suggest a formula for ' + M('S_n') + ' and explain why it works using a diagram of a square of area 1.', 3, M('S_n = 1 - \\frac{1}{2^n}') + ': each step fills half of the remaining part of the square'],
        ['Find the least ' + M('n') + ' for which ' + M('S_n > ' + t) + '.', 2, M('2^n > ' + Math.round(1 / (1 - t))) + ': ' + M('n = ' + n)]
      ]);
    },
    function () {
      var a = pick([[1, 3], [1, 4], [2, 5], [1, 5]]), b = pick([[2, 5], [1, 3], [3, 4], [1, 2]]), leftFrac = [(a[1] - a[0]) * (b[1] - b[0]), a[1] * b[1]], lr = red(leftFrac[0], leftFrac[1]);
      var left = ri(3, 12) * lr[0] * 2, orig = left * lr[1] / lr[0];
      return Q('Sam spends ' + M(F(a[0], a[1])) + ' of his money on a coat and then ' + M(F(b[0], b[1])) + ' of what is left on shoes. He has ' + money(left) + ' left.', [
        ['What fraction of his original money is left?', 2, M(F(a[1] - a[0], a[1]) + ' \\times ' + F(b[1] - b[0], b[1]) + ' = ' + F(lr[0], lr[1]))],
        ['How much money did he start with?', 2, money(orig)],
        ['Priya spends the same fractions but in the opposite order. Explain whether she has more, less or the same left from the same starting amount.', 2, 'The same: ' + M('\\left(1 - \\frac{b}{c}\\right)\\left(1 - \\frac{a}{d}\\right)') + ' is the same product in either order.']
      ]);
    },
    function () {
      var P = pick([[4, 5], [3, 7], [5, 6], [2, 9], [7, 12], [5, 11]]), n = P[0], d = P[1], terms = [];
      while (n > 0) { var u = Math.ceil(d / n); terms.push(u); var nn = n * u - d, nd = d * u, k = gcd(nn, nd) || 1; n = nn / k; d = nd / k; }
      return Q('The greedy method writes a fraction as a sum of different unit fractions: at each step subtract the largest unit fraction that fits.', [
        ['Use the greedy method to write ' + M(F(P[0], P[1])) + ' as a sum of different unit fractions.', 4, M(terms.map(function (u) { return '\\frac{1}{' + u + '}'; }).join(' + '))],
        ['Explain why, at each step, the numerator of what is left gets smaller.', 2, 'If ' + M('\\frac{1}{u}') + ' is the largest unit fraction below ' + M('\\frac{n}{d}') + ', then ' + M('nu - d < n') + ', so the new numerator is smaller; the method must stop.'],
        ['Check your answer by adding the fractions.', 1, 'The sum is ' + M(F(P[0], P[1]))]
      ]);
    },
    function () {
      var a = ri(2, 8), b = ri(a + 1, 12), k = ri(1, 5);
      return Q('', [
        ['Which is larger: ' + M(F(a, b)) + ' or ' + M(F(a + k, b + k)) + '? Show your working.', 2, M(F(a + k, b + k)) + ' (' + sf3((a + k) / (b + k)) + ' > ' + sf3(a / b) + ')'],
        ['Prove that if ' + M('0 < a < b') + ' and ' + M('k > 0') + ', then ' + M('\\frac{a + k}{b + k} > \\frac{a}{b}') + '.', 3, M('\\frac{a + k}{b + k} - \\frac{a}{b} = \\frac{k(b - a)}{b(b + k)} > 0')],
        ['What happens to ' + M('\\frac{a + k}{b + k}') + ' as ' + M('k') + ' becomes very large? Explain.', 2, 'It approaches 1: the numerator and denominator become almost equal compared with their size.']
      ]);
    },
    function () {
      var a = ri(1, 8), b = ri(1, 8);
      return Q('', [
        ['Show that ' + M('0.\\dot{' + a + '} = \\frac{' + a + '}{9}') + '.', 2, M('10x - x = ' + a)],
        ['Find ' + M('0.\\dot{' + a + '} \\times 0.\\dot{' + b + '}') + ' as a fraction in its simplest form, and write it as a recurring decimal.', 3, M(F(a * b, 81)) + ' (' + M('= ' + (a * b / 81).toFixed(6) + '\\ldots') + ')'],
        ['Prove that the sum of two recurring decimals of the form ' + M('0.\\dot{p}') + ' and ' + M('0.\\dot{q}') + ' is a terminating number only when ' + M('p + q = 9') + ' (for digits ' + M('p, q') + ' from 1 to 8).', 3, M('\\frac{p + q}{9}') + ' terminates only if 9 divides ' + M('p + q') + ', i.e. ' + M('p + q = 9') + ' (giving 1)']
      ]);
    }
  ]);

  X('percentages', [
    function () {
      var P = ri(2, 10) * 1000, r = pick([3, 4, 5, 6]), n = ri(5, 15), si = P * r / 100 * n, ci = P * (Math.pow(1 + r / 100, n) - 1), y = 1;
      while (P * (Math.pow(1 + r / 100, y) - 1) - P * r / 100 * y < 0.5 * P * r / 100) y++;
      return Q(money(P) + ' is invested for ' + n + ' years at ' + r + '% per year.', [
        ['Find the interest earned with simple interest and with compound interest.', 3, 'Simple ' + money(si) + '; compound ' + money(ci)],
        ['Explain why compound interest gives more, and why the gap grows each year.', 2, 'Compound interest also earns interest on previous interest, and that interest itself grows.'],
        ['After how many whole years does compound interest first exceed simple interest by more than half a year’s simple interest?', 3, y + ' years']
      ]);
    },
    function () {
      var p = ri(10, 40), sale = ri(5, 30) * 10, orig = sale / (1 - p / 100);
      return Q('In a sale, prices are reduced by ' + p + '%. A jacket costs ' + money(sale) + ' in the sale.', [
        ['Find the original price.', 2, money(orig)],
        ['The shop later says "Prices back up by ' + p + '%". Find the new price and explain why it is not the original price.', 3, money(sale * (1 + p / 100)) + '; the ' + p + '% is taken of a smaller amount'],
        ['By what percentage must the sale price be increased to return to the original price?', 2, sf3(100 * p / (100 - p)) + '%']
      ]);
    },
    function () {
      var a = ri(5, 15), b = ri(5, 15), p = ri(20, 60);
      var overall = (1 + a / 100) * (1 - b / 100);
      return Q('A town’s population rose by ' + a + '% in one year and fell by ' + b + '% the next.', [
        ['Find the overall percentage change.', 2, (overall >= 1 ? 'Increase of ' : 'Decrease of ') + sf3(Math.abs(overall - 1) * 100) + '%'],
        ['In the third year the population changed again, and over the three years it rose by ' + p + '% overall. Find the percentage change in the third year.', 3, M('\\frac{' + (1 + p / 100) + '}{' + sf3(overall) + '} = ' + sf3((1 + p / 100) / overall)) + ': ' + sf3(((1 + p / 100) / overall - 1) * 100) + '%'],
        ['Explain why the percentage changes cannot simply be added.', 1, 'Each percentage is of a different starting amount.']
      ]);
    },
    function () {
      var V = ri(15, 40) * 1000, r = pick([12, 15, 18, 20]), half = Math.ceil(Math.log(0.5) / Math.log(1 - r / 100)), t = ri(3, 6);
      return Q('A car worth ' + money(V) + ' depreciates by ' + r + '% each year.', [
        ['Find its value after ' + t + ' years.', 2, money(V * Math.pow(1 - r / 100, t))],
        ['Find the number of whole years until it is worth less than half its original value.', 2, half + ' years'],
        ['Show that the time to halve does not depend on the starting value.', 2, M('V(1 - ' + r / 100 + ')^n < 0.5V') + ' simplifies to ' + M('(' + (1 - r / 100) + ')^n < 0.5') + ', which has no ' + M('V')]
      ]);
    },
    function () {
      var w = ri(20, 40), r = pick([2, 3, 4]), y = ri(5, 10), inf = pick([2, 3, 4, 5]);
      return Q('A worker earns £' + num(w * 1000) + ' a year. Her pay rises by ' + r + '% each year, but prices rise by ' + inf + '% each year.', [
        ['Find her pay after ' + y + ' years.', 2, money(w * 1000 * Math.pow(1 + r / 100, y))],
        ['Find what her pay after ' + y + ' years is worth in today’s prices.', 3, money(w * 1000 * Math.pow((1 + r / 100) / (1 + inf / 100), y))],
        ['Explain whether she is better or worse off in real terms.', 1, r > inf ? 'Better off: pay rises faster than prices.' : r < inf ? 'Worse off: prices rise faster than pay.' : 'The same.']
      ]);
    },
    function () {
      var x = ri(2, 8) * 5, y = ri(2, 8) * 5;
      return Q('In a school, ' + x + '% of students study French and ' + y + '% of the French students also study Spanish.', [
        ['What percentage of all students study both French and Spanish?', 2, M(sf3(x * y / 100) + '\\%')],
        ['There are 400 students. How many study both?', 1, num(x * y / 25)],
        ['Explain why "' + y + '% of ' + x + '%" is not ' + (x + y) + '%.', 2, 'A percentage of a percentage is a product: ' + M(x / 100 + ' \\times ' + y / 100) + '.']
      ]);
    },
    function () {
      var c = ri(20, 80), m = pick([20, 25, 40, 50, 60]), sell = c * (1 + m / 100), margin = m / (100 + m) * 100;
      return Q('A shop buys a game for £' + c + ' and sells it at a ' + m + '% markup (profit as a percentage of cost).', [
        ['Find the selling price.', 1, money(sell)],
        ['Find the profit as a percentage of the selling price.', 2, M(sf3(margin) + '\\%')],
        ['Show that a markup of ' + M('m\\%') + ' gives a profit of ' + M('\\frac{100m}{100 + m}\\%') + ' of the selling price.', 3, 'Profit ' + M('\\frac{m}{100}C') + ', selling price ' + M('\\frac{100 + m}{100}C') + '; divide']
      ]);
    },
    function () {
      var a = ri(1, 9), n = ri(2, 4), total = Math.pow(1 + a / 100, n);
      return Q('A price rises by ' + a + '% each year for ' + n + ' years.', [
        ['Find the total percentage increase over the ' + n + ' years.', 2, sf3((total - 1) * 100) + '%'],
        ['Find the single annual rate that would give the same total increase over twice as many years.', 3, M('\\sqrt{' + sf3(1 + a / 100) + '} = ' + sf3(Math.sqrt(1 + a / 100))) + ': ' + sf3((Math.sqrt(1 + a / 100) - 1) * 100) + '% per year'],
        ['Explain why this is a little less than half of ' + a + '%.', 2, 'With compounding, smaller increases each year still build on each other, so less than half the rate is needed.']
      ]);
    }
  ]);

  X('indices', [
    function () {
      var a = ri(2, 6), b = ri(2, 6), x = ri(2, 4);
      return Q('', [
        ['Simplify ' + M('\\frac{(2x^{' + a + '})^3 \\times 3x^{' + b + '}}{6x^{' + (a + b) + '}}') + '.', 3, M('4x^{' + (3 * a + b - a - b) + '}')],
        ['Find the value of ' + M('n') + ' if ' + M('\\frac{x^{n} \\times x^{' + a + '}}{x^{' + b + '}} = x^{' + (a + 2 * b) + '}') + '.', 2, M('n = ' + 3 * b)],
        ['Evaluate ' + M('\\left(\\frac{8}{27}\\right)^{-\\frac{2}{3}}') + ' exactly.', 2, M('\\frac{9}{4}')]
      ]);
    },
    function () {
      var c = 3e8, d = pick([1.5e11, 2.28e11, 7.78e11, 5.8e10]), name = { 1.5e11: 'the Earth', 2.28e11: 'Mars', 7.78e11: 'Jupiter', 5.8e10: 'Mercury' }[d], t = d / c;
      var std = function (v) { var e = Math.floor(Math.log10(v)); return sf3(v / Math.pow(10, e)) + ' \\times 10^{' + e + '}'; };
      return Q('Light travels at about ' + M('3 \\times 10^8') + ' m/s. The mean distance from the Sun to ' + name + ' is ' + M(std(d)) + ' m.', [
        ['Find the time for light to travel from the Sun to ' + name + ', in seconds and in minutes.', 3, M(std(t)) + ' s, about ' + sf3(t / 60) + ' minutes'],
        ['A light-year is the distance light travels in a year (365 days). Write it in standard form.', 2, M(std(c * 365 * 24 * 3600)) + ' m'],
        ['The nearest star is about 4.2 light-years away. How many times further is it than ' + name + ' from the Sun?', 2, M(std(4.2 * c * 365 * 24 * 3600 / d))]
      ]);
    },
    function () {
      var n = ri(5, 20);
      return Q('', [
        ['Show that ' + M('2^{n} + 2^{n} = 2^{n+1}') + ' and ' + M('3^{n} + 3^{n} + 3^{n} = 3^{n+1}') + '.', 2, M('2 \\times 2^n') + ' and ' + M('3 \\times 3^n')],
        ['Write ' + M('5^{' + n + '} + 5^{' + n + '} + 5^{' + n + '} + 5^{' + n + '} + 5^{' + n + '}') + ' as a single power.', 1, M('5^{' + (n + 1) + '}')],
        ['Find ' + M('x') + ' if ' + M('4^{' + n + '} + 4^{' + n + '} = 2^{x}') + '.', 3, M('2 \\times 2^{' + 2 * n + '} = 2^{' + (2 * n + 1) + '}') + ', ' + M('x = ' + (2 * n + 1))]
      ]);
    },
    function () {
      var p = pick([2, 3, 5]), a = ri(2, 5), b = ri(2, 5);
      return Q('', [
        ['Solve ' + M(Math.pow(p, a) + '^{x} = ' + Math.pow(p, b) + '^{x + 1}') + '.', 3, M(a + 'x = ' + b + '(x + 1)') + (a === b ? ': no solution' : ', ' + M('x = ' + F(b, a - b)))],
        ['Solve ' + M(p + '^{x^2} = ' + p + '^{' + (a + b) + 'x - ' + a * b + '}') + '.', 3, M('x^2 - ' + (a + b) + 'x + ' + a * b + ' = 0') + ', ' + M('x = ' + a + '\\text{ or } ' + b)],
        ['Explain why equating the powers is valid.', 1, 'For a base greater than 1, ' + M(p + '^x') + ' is increasing, so equal values mean equal powers.']
      ]);
    },
    function () {
      var a = pick([2, 3]), n = ri(10, 30);
      return Q('A sheet of paper is 0.1 mm thick. It is folded in half again and again.', [
        ['Find its thickness after ' + n + ' folds, in metres, in standard form.', 2, M('0.1 \\times 2^{' + n + '}') + ' mm = ' + sf3(1e-4 * Math.pow(2, n)) + ' m'],
        ['How many folds would make it thicker than the height of Mount Everest (8849 m)?', 3, M('2^n > 8.849 \\times 10^{7}') + ': ' + M('n = ' + Math.ceil(Math.log2(8.849e7)))],
        ['Explain why repeated doubling grows so quickly.', 1, 'Each fold multiplies the thickness by 2, so it grows exponentially.']
      ]);
    },
    function () {
      var a = ri(2, 9), b = ri(2, 9);
      return Q('', [
        ['Show that ' + M('\\frac{1}{\\sqrt{x}} = x^{-\\frac{1}{2}}') + ' and ' + M('\\sqrt[3]{x^2} = x^{\\frac{2}{3}}') + '.', 2, 'A root is a fractional power; a reciprocal is a negative power.'],
        ['Write ' + M('\\frac{' + a + 'x^2\\sqrt{x}}{x^{-1}}') + ' in the form ' + M('kx^n') + '.', 2, M(a + 'x^{\\frac{7}{2}}')],
        ['Given that ' + M('y = ' + b + 'x^{\\frac{3}{2}}') + ', find ' + M('x') + ' when ' + M('y = ' + b * 8) + '.', 2, M('x^{\\frac{3}{2}} = 8') + ', ' + M('x = 4')]
      ]);
    },
    function () {
      var k = ri(3, 8);
      return Q('Bacteria double every 20 minutes. At noon there are ' + num(k * 1000) + ' bacteria.', [
        ['Write an expression for the number after ' + M('h') + ' hours.', 2, M(k * 1000 + ' \\times 2^{3h}') + ' (or ' + M('8^h') + ')'],
        ['Find the number at 3 pm, in standard form.', 2, M(sf3(k * 1000 * 512 / Math.pow(10, Math.floor(Math.log10(k * 512000)))) + ' \\times 10^{' + Math.floor(Math.log10(k * 512000)) + '}')],
        ['At what time was the population ' + num(k * 1000 / 8) + '?', 2, '11 am (one hour, i.e. three doublings, earlier)']
      ]);
    },
    function () {
      var x = ri(2, 5), y = ri(2, 5);
      return Q('Given that ' + M('a = 2^{' + x + '}') + ' and ' + M('b = 2^{' + y + '}') + ':', [
        ['Write ' + M('ab') + ', ' + M('\\frac{a}{b}') + ' and ' + M('a^2b') + ' as powers of 2.', 3, M('2^{' + (x + y) + '},\\ 2^{' + (x - y) + '},\\ 2^{' + (2 * x + y) + '}')],
        ['Write ' + M('4^{' + x + '} \\times 8^{' + y + '}') + ' in terms of ' + M('a') + ' and ' + M('b') + '.', 2, M('2^{' + 2 * x + '} \\times 2^{' + 3 * y + '} = a^2b^3')],
        ['Find ' + M('\\sqrt{a^{' + 2 + '}b^{4}}') + ' as a power of 2.', 1, M('2^{' + (x + 2 * y) + '}')]
      ]);
    }
  ]);

  X('ratio', [
    function () {
      var a = ri(2, 5), b = ri(2, 5), c = ri(2, 5), T = (a + b + c) * ri(10, 30);
      return Q('Three friends share £' + T + ' in the ratio ' + a + ' : ' + b + ' : ' + c + '.', [
        ['Find each share.', 2, [a, b, c].map(function (v) { return money(T * v / (a + b + c)); }).join(', ')],
        ['The first friend gives some money to the third so that the ratio becomes ' + b + ' : ' + b + ' : ' + (a + c - b) + '. Is this possible? If so, how much changes hands?', 3, a + c - b > 0 ? 'Yes: first gives ' + money(T * (a - b) / (a + b + c)) + (a - b < 0 ? ' (negative: the third gives to the first)' : '') : 'No: a share would be negative'],
        ['Explain why the total stays the same however money is passed between them.', 1, 'Money is only moved, not added or removed.']
      ]);
    },
    function () {
      var s = pick([25000, 50000, 100000]), l = ri(2, 9), area = ri(2, 12);
      return Q('A map has scale 1 : ' + num(s) + '.', [
        ['Two villages are ' + l + ' cm apart on the map. Find the real distance in km.', 2, num(l * s / 100000) + ' km'],
        ['A lake has area ' + area + ' cm² on the map. Find its real area in km².', 3, M(area + ' \\times ' + num(s) + '^2') + ' cm² = ' + num(area * s * s / 1e10) + ' km²'],
        ['Explain why area does not scale by ' + num(s) + '.', 1, 'Area involves two lengths, so it scales by the square of the length factor.']
      ]);
    },
    function () {
      var a = ri(3, 8), b = ri(2, 6), w = ri(2, 5);
      return Q(a + ' workers can build a wall in ' + b * 2 + ' days.', [
        ['How long would ' + 2 * a + ' workers take, working at the same rate?', 1, b + ' days'],
        ['How many workers are needed to build ' + w + ' walls in ' + b + ' days?', 3, M(a + ' \\times 2 \\times ' + w + ' = ' + 2 * a * w) + ' workers'],
        ['Write a formula for the time ' + M('T') + ' days for ' + M('n') + ' workers to build ' + M('k') + ' walls.', 2, M('T = \\frac{' + 2 * a * b + 'k}{n}')]
      ]);
    },
    function () {
      var a = ri(2, 5), b = ri(2, 5), k = ri(2, 6), g2 = b * k, boys = a * k, newB = boys + k * b, r2 = red(newB, g2);
      return Q('The ratio of boys to girls in a club is ' + a + ' : ' + b + '. Then ' + (k * b) + ' more boys join, and the ratio becomes ' + r2[0] + ' : ' + r2[1] + '.', [
        ['Find the number of girls in the club.', 3, 'Boys ' + M(a + 'n') + ', girls ' + M(b + 'n') + ': ' + M('\\frac{' + a + 'n + ' + k * b + '}{' + b + 'n} = \\frac{' + r2[0] + '}{' + r2[1] + '}') + ', ' + M('n = ' + k) + '; girls ' + g2],
        ['How many girls must now join to make the ratio 1 : 1?', 2, (newB - g2) + ' girls'],
        ['Explain why the number of girls must be a multiple of ' + b + '.', 1, 'Girls make ' + b + ' parts of the original ratio, each part a whole number of people.']
      ]);
    },
    function () {
      var p = ri(2, 7), q = ri(1, p - 1);
      return Q('Given that ' + M('\\frac{a + b}{a - b} = \\frac{' + (p + q) + '}{' + (p - q) + '}') + ', with ' + M('a, b > 0') + ':', [
        ['Find the ratio ' + M('a : b') + ' in its simplest form.', 3, M(red(p, q)[0] + ' : ' + red(p, q)[1])],
        ['Find ' + M('\\frac{a^2 + b^2}{ab}') + '.', 2, M(F(p * p + q * q, p * q))],
        ['Explain why knowing the ratio is enough to find the value of any expression in which every term has the same total power.', 2, 'Divide top and bottom by a power of ' + M('b') + ': the expression then depends only on ' + M('\\frac{a}{b}')]
      ]);
    },
    function () {
      var r1 = ri(2, 5), r2 = ri(2, 5), n = ri(20, 60);
      return Q('In a recipe for ' + r1 * 2 + ' people, the ratio of flour to sugar to butter is ' + 3 + ' : ' + r2 + ' : 2, and ' + 60 * r1 + ' g of flour is used.', [
        ['Find the amounts of sugar and butter.', 2, num(20 * r1 * r2) + ' g sugar, ' + num(40 * r1) + ' g butter'],
        ['Find the amounts needed for ' + n + ' people.', 2, 'Multiply by ' + M(F(n, 2 * r1)) + ': flour ' + sf3(60 * r1 * n / (2 * r1)) + ' g, sugar ' + sf3(20 * r1 * r2 * n / (2 * r1)) + ' g, butter ' + sf3(40 * r1 * n / (2 * r1)) + ' g'],
        ['Only 250 g of butter is available. Find the greatest number of people the recipe can serve.', 2, Math.floor(250 / (40 * r1 / (2 * r1))) + ' people']
      ]);
    },
    function () {
      var k = ri(2, 6), x1 = ri(2, 5), y1 = k * x1 * x1, x2 = x1 + ri(1, 4);
      return Q(M('y') + ' is directly proportional to the square of ' + M('x') + '. When ' + M('x = ' + x1) + ', ' + M('y = ' + y1) + '.', [
        ['Find ' + M('y') + ' when ' + M('x = ' + x2) + '.', 2, M('y = ' + k + 'x^2 = ' + k * x2 * x2)],
        ['Find ' + M('x') + ' when ' + M('y = ' + k * 49) + ', given ' + M('x > 0') + '.', 1, M('x = 7')],
        ['Sketch the graph of ' + M('y') + ' against ' + M('x') + ' and the graph of ' + M('y') + ' against ' + M('x^2') + '. Explain the difference.', 2, 'A parabola through the origin; a straight line through the origin with gradient ' + k]
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(5, 9), c = ri(1, 4), d = ri(5, 9);
      while (a * d === b * c) d++;
      var t1 = a / (a + b), t2 = c / (c + d);
      return Q('Bottle A contains cordial and water in the ratio ' + a + ' : ' + b + '. Bottle B contains them in the ratio ' + c + ' : ' + d + '.', [
        ['Which bottle has the stronger drink? Show working.', 2, (t1 > t2 ? 'A' : 'B') + ': cordial fractions ' + M(F(a, a + b)) + ' and ' + M(F(c, c + d))],
        ['Equal volumes of A and B are mixed. Find the ratio of cordial to water.', 3, M(F(a, a + b) + ' + ' + F(c, c + d)) + ' : ' + M(F(b, a + b) + ' + ' + F(d, c + d)) + ' = ' + M(red(a * (c + d) + c * (a + b), b * (c + d) + d * (a + b))[0] + ' : ' + red(a * (c + d) + c * (a + b), b * (c + d) + d * (a + b))[1])],
        ['Explain why the answer is not ' + M((a + c) + ' : ' + (b + d)) + ' in general.', 2, 'That would only be right if the bottles held ' + (a + b) + ' and ' + (c + d) + ' parts; equal volumes weight the ratios differently.']
      ]);
    }
  ]);

  X('compound-measures', [
    function () {
      var d1 = ri(20, 60), v1 = ri(30, 60), d2 = ri(20, 80), v2 = ri(60, 110), t = d1 / v1 + d2 / v2;
      return Q('A journey has two parts: ' + d1 + ' km at ' + v1 + ' km/h, then ' + d2 + ' km at ' + v2 + ' km/h.', [
        ['Find the total time, in hours and minutes.', 2, Math.floor(t) + ' h ' + Math.round((t % 1) * 60) + ' min'],
        ['Find the average speed for the whole journey.', 2, M(sf3((d1 + d2) / t)) + ' km/h'],
        ['Explain why the average speed is not ' + M('\\frac{' + v1 + ' + ' + v2 + '}{2}') + '.', 2, 'More time is spent at the slower speed, so it has more weight.']
      ]);
    },
    function () {
      var rho = pick([7.9, 2.7, 8.9, 11.3, 19.3]), name = { 7.9: 'iron', 2.7: 'aluminium', 8.9: 'copper', 11.3: 'lead', 19.3: 'gold' }[rho], r = ri(2, 6);
      var V = 4 / 3 * Math.PI * r * r * r, m = V * rho;
      return Q('A solid sphere of ' + name + ' (density ' + rho + ' g/cm³) has radius ' + r + ' cm.', [
        ['Find its mass in kg.', 3, M(sf3(m / 1000)) + ' kg'],
        ['The sphere is melted and recast as a cube. Find the side length of the cube.', 2, M('\\sqrt[3]{' + sf3(V) + '} = ' + sf3(Math.cbrt(V))) + ' cm'],
        ['Explain whether the cube has the same mass, volume and surface area as the sphere.', 2, 'Same mass and volume; larger surface area (a sphere has the least surface area for its volume).']
      ]);
    },
    function () {
      var F2 = ri(200, 800), A1 = ri(2, 8) / 100, P = F2 / A1;
      return Q('A force of ' + F2 + ' N acts on an area of ' + num(A1 * 10000) + ' cm².', [
        ['Find the pressure in N/m².', 2, M(num(F2) + ' \\div ' + num(A1) + ' = ' + sf3(P)) + ' N/m²'],
        ['A stiletto heel has area 1 cm² and an elephant’s foot has area 1000 cm². A 60 kg person stands on one heel; a 4000 kg elephant stands on four feet. Compare the pressures (use ' + M('g = 9.8') + ').', 3, 'Heel: ' + M(num(60 * 9.8 / 0.0001)) + ' N/m²; elephant: ' + M(num(4000 * 9.8 / 0.4)) + ' N/m²: the heel exerts more'],
        ['Explain why snowshoes help you walk on snow.', 1, 'They spread the weight over a larger area, reducing the pressure.']
      ]);
    },
    function () {
      var Q1 = ri(5, 20), vol = ri(200, 600), h = ri(2, 5);
      return Q('Water flows into a tank at ' + Q1 + ' litres per minute. The tank is a cuboid with base 1.2 m by 0.8 m.', [
        ['Find how long it takes to fill the tank to a depth of ' + h * 10 + ' cm.', 3, 'Volume ' + num(1.2 * 0.8 * h * 0.1 * 1000) + ' L: ' + sf3(1.2 * 0.8 * h * 0.1 * 1000 / Q1) + ' min'],
        ['Find the rate at which the depth rises, in cm per minute.', 2, M(sf3(Q1 / 1000 / 0.96 * 100)) + ' cm/min'],
        ['A second tap is opened and the depth rises twice as fast. Find the flow rate of the second tap.', 1, Q1 + ' L/min']
      ]);
    },
    function () {
      var c = ri(4, 9), p = ri(120, 180) / 100, mpg = ri(40, 60), dist = ri(200, 600);
      var litres = dist / mpg * 4.546 / 1.609;
      return Q('A car travels ' + mpg + ' miles per gallon. 1 gallon = 4.546 litres and 1 mile = 1.609 km.', [
        ['Convert ' + mpg + ' miles per gallon to km per litre.', 3, M(sf3(mpg * 1.609 / 4.546)) + ' km/L'],
        ['Find the cost of fuel for a ' + dist + ' km journey if fuel costs £' + p.toFixed(2) + ' per litre.', 2, money(dist / (mpg * 1.609 / 4.546) * p)],
        ['Explain how converting units of a compound measure works.', 1, 'Convert the numerator and denominator units separately and divide.']
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(2, 6);
      return Q('Alloy X is made from metals with densities ' + (a + 5) + ' g/cm³ and ' + (b + 1) + ' g/cm³, mixed in the ratio 1 : 1 by mass.', [
        ['For 100 g of each metal, find the total volume and hence the density of the alloy.', 4, 'Volume ' + M(F(100, a + 5) + ' + ' + F(100, b + 1)) + '; density ' + M(sf3(200 / (100 / (a + 5) + 100 / (b + 1)))) + ' g/cm³'],
        ['Explain why this is not the mean of the two densities.', 2, 'Equal masses do not have equal volumes; the less dense metal takes up more space.']
      ]);
    },
    function () {
      var L = ri(150, 400), v = ri(15, 30), tunnel = ri(300, 1200), t = (L + tunnel) / v;
      return Q('A train ' + L + ' m long travels at ' + v + ' m/s.', [
        ['How long does it take to pass a signal post?', 1, M(sf3(L / v)) + ' s'],
        ['How long does it take to pass completely through a tunnel ' + tunnel + ' m long?', 2, M(sf3(t)) + ' s'],
        ['Convert ' + v + ' m/s to km/h.', 1, num(v * 3.6) + ' km/h']
      ]);
    },
    function () {
      var w = ri(40, 90), s = ri(3, 8), dist = ri(5, 12);
      return Q('A runner trains for ' + dist + ' km at an average pace of ' + s + ' minutes per kilometre.', [
        ['Find her average speed in km/h.', 2, M(sf3(60 / s)) + ' km/h'],
        ['She wants to improve her time by 10%. Find the new pace in minutes and seconds per km.', 3, M(s + ' \\times 0.9 = ' + sf3(s * 0.9)) + ' min = ' + Math.floor(s * 0.9) + ' min ' + Math.round((s * 0.9 % 1) * 60) + ' s'],
        ['By what percentage does her speed increase?', 2, M(sf3((1 / 0.9 - 1) * 100) + '\\%')]
      ]);
    }
  ]);

  X('surds', [
    function () {
      var n = pick([2, 3, 5, 6, 7]), a = ri(2, 5);
      return Q('', [
        ['Simplify ' + M('\\sqrt{' + a * a * n + '} + \\sqrt{' + 4 * n + '}') + '.', 2, M((a + 2) + '\\sqrt{' + n + '}')],
        ['Show that ' + M('\\frac{\\sqrt{' + n + '}}{\\sqrt{' + n + '} - 1}') + ' can be written as ' + M('\\frac{' + n + ' + \\sqrt{' + n + '}}{' + (n - 1) + '}') + '.', 3, 'Multiply by ' + M('\\sqrt{' + n + '} + 1')],
        ['Find the exact value of ' + M('\\left(\\sqrt{' + n + '} + \\frac{1}{\\sqrt{' + n + '}}\\right)^2') + '.', 2, M(n + ' + 2 + ' + F(1, n) + ' = ' + F(n * n + 2 * n + 1, n))]
      ]);
    },
    function () {
      var a = ri(1, 5), b = ri(1, 4), n = pick([2, 3, 5]);
      return Q('A square has side ' + M('(' + a + ' + ' + b + '\\sqrt{' + n + '})') + ' cm.', [
        ['Find its area in the form ' + M('p + q\\sqrt{' + n + '}') + '.', 2, M((a * a + b * b * n) + ' + ' + 2 * a * b + '\\sqrt{' + n + '}')],
        ['Find the exact length of its diagonal.', 2, M('(' + a + ' + ' + b + '\\sqrt{' + n + '})\\sqrt{2} = ' + a + '\\sqrt{2} + ' + b + '\\sqrt{' + 2 * n + '}')],
        ['Find the perimeter, and show that the area is irrational.', 2, M((4 * a) + ' + ' + (4 * b) + '\\sqrt{' + n + '}') + ' cm; the area contains a non-zero multiple of ' + M('\\sqrt{' + n + '}') + ', which is irrational']
      ]);
    },
    function () {
      var a = ri(2, 7), b = pick([2, 3, 5, 7]);
      return Q('', [
        ['Rationalise ' + M('\\frac{' + a + '}{\\sqrt{' + b + '}}') + ' and ' + M('\\frac{1}{' + a + ' - \\sqrt{' + b + '}}') + '.', 3, M(F(a, b) + '\\sqrt{' + b + '}') + '; ' + M('\\frac{' + a + ' + \\sqrt{' + b + '}}{' + (a * a - b) + '}')],
        ['Explain why multiplying by ' + M(a + ' + \\sqrt{' + b + '}') + ' removes the surd from the denominator.', 2, M('(' + a + ' - \\sqrt{' + b + '})(' + a + ' + \\sqrt{' + b + '}) = ' + a * a + ' - ' + b) + ': the difference of two squares']
      ]);
    },
    function () {
      var p = pick([2, 3, 5]);
      return Q('A right-angled triangle has shorter sides ' + M('\\sqrt{' + p + '}') + ' cm and ' + M('\\sqrt{' + (p + 1) * 2 + '}') + ' cm.', [
        ['Find the exact length of the hypotenuse.', 2, M('\\sqrt{' + (p + 2 * (p + 1)) + '}') + ' cm'],
        ['Find the exact area.', 2, M('\\frac{1}{2}\\sqrt{' + p * 2 * (p + 1) + '}') + ' cm²'],
        ['Find the exact value of the tangent of the smallest angle, rationalising the denominator.', 2, M('\\frac{\\sqrt{' + p + '}}{\\sqrt{' + 2 * (p + 1) + '}} = \\frac{\\sqrt{' + p * 2 * (p + 1) + '}}{' + 2 * (p + 1) + '}')]
      ]);
    },
    function () {
      var n = pick([2, 3, 5, 6, 7, 10]);
      return Q('', [
        ['Prove that ' + M('\\sqrt{' + n + '}') + ' lies between ' + Math.floor(Math.sqrt(n)) + ' and ' + (Math.floor(Math.sqrt(n)) + 1) + '.', 1, M(Math.pow(Math.floor(Math.sqrt(n)), 2) + ' < ' + n + ' < ' + Math.pow(Math.floor(Math.sqrt(n)) + 1, 2))],
        ['Is ' + M('(\\sqrt{' + n + '} + 1)(\\sqrt{' + n + '} - 1)') + ' rational? Explain.', 2, 'Yes: ' + M(n + ' - 1 = ' + (n - 1))],
        ['Find two different irrational numbers whose product is rational and whose sum is also rational.', 3, 'For example ' + M('3 + \\sqrt{' + n + '}') + ' and ' + M('3 - \\sqrt{' + n + '}') + ': sum 6, product ' + (9 - n)]
      ]);
    },
    function () {
      var a = ri(2, 6), n = pick([2, 3, 5]);
      return Q('', [
        ['Expand and simplify ' + M('(\\sqrt{' + n + '} + ' + a + ')^2 - (\\sqrt{' + n + '} - ' + a + ')^2') + '.', 3, M(4 * a + '\\sqrt{' + n + '}')],
        ['Hence, or otherwise, show that ' + M('(x + y)^2 - (x - y)^2 = 4xy') + ' for all ' + M('x, y') + '.', 2, 'Difference of two squares: ' + M('(2x)(2y)')]
      ]);
    },
    function () {
      var a = pick([8, 18, 32, 50, 72]), b = pick([2, 8, 18]), s = Math.sqrt(a / 2), t = Math.sqrt(b / 2);
      return Q('', [
        ['Write ' + M('\\sqrt{' + a + '} + \\sqrt{' + b + '}') + ' in the form ' + M('k\\sqrt{2}') + '.', 2, M((s + t) + '\\sqrt{2}')],
        ['Find ' + M('\\sqrt{' + a + '} \\times \\sqrt{' + b + '}') + '.', 1, M(2 * s * t)],
        ['A circle has area ' + M((a) + '\\pi') + ' cm². Find its radius in simplest surd form.', 2, M(s + '\\sqrt{2}') + ' cm']
      ]);
    },
    function () {
      var n = ri(2, 4);
      return Q('', [
        ['Show that ' + M('(1 + \\sqrt{2})^2 = 3 + 2\\sqrt{2}') + '.', 1, M('1 + 2\\sqrt{2} + 2')],
        ['Hence find ' + M('(1 + \\sqrt{2})^4') + ' in the form ' + M('a + b\\sqrt{2}') + '.', 2, M('(3 + 2\\sqrt{2})^2 = 17 + 12\\sqrt{2}')],
        ['Find ' + M('\\sqrt{3 + 2\\sqrt{2}}') + ' in simplest form, explaining your reasoning.', 2, M('1 + \\sqrt{2}') + ' (from the first part, since it is positive)']
      ]);
    }
  ]);

  X('bounds', [
    function () {
      var l = ri(50, 150), w = ri(20, 60);
      return Q('A rectangle has length ' + l + ' cm and width ' + w + ' cm, both to the nearest cm.', [
        ['Find the upper and lower bounds of the perimeter.', 2, M(2 * (l + w) - 2) + ' cm and ' + M(2 * (l + w) + 2) + ' cm'],
        ['Find the upper and lower bounds of the area.', 2, M(num((l - 0.5) * (w - 0.5))) + ' and ' + M(num((l + 0.5) * (w + 0.5))) + ' cm²'],
        ['Explain why the area has a much wider error interval than the perimeter, in absolute terms.', 2, 'Errors are multiplied by the other dimension in the area.']
      ]);
    },
    function () {
      var a = ri(40, 90), b = ri(10, 30);
      return Q(M('a = ' + a) + ' and ' + M('b = ' + b) + ', both to the nearest whole number.', [
        ['Find the upper bound of ' + M('a - b') + ' and of ' + M('\\frac{a}{b}') + '.', 3, M(a - b + 1) + ' and ' + M(sf3((a + 0.5) / (b - 0.5)))],
        ['Find the lower bound of ' + M('\\frac{a - b}{b}') + '.', 2, M('\\frac{' + (a - b - 1) + '}{' + (b + 0.5) + '} = ' + sf3((a - b - 1) / (b + 0.5)))],
        ['Explain why, to find the upper bound of ' + M('a - b') + ', you use the lower bound of ' + M('b') + '.', 1, 'Subtracting a smaller number gives a larger result.']
      ]);
    },
    function () {
      var m = ri(200, 900), v = ri(80, 300);
      return Q('A stone has mass ' + m + ' g to the nearest 10 g and volume ' + v + ' cm³ to the nearest 5 cm³.', [
        ['Find the upper and lower bounds of its density.', 3, M(sf3((m + 5) / (v - 2.5))) + ' and ' + M(sf3((m - 5) / (v + 2.5))) + ' g/cm³'],
        ['Give the density to a suitable degree of accuracy, explaining your choice.', 2, 'Round both bounds and use the most accurate value they agree on.']
      ]);
    },
    function () {
      var T = ri(100, 159) / 10, vu = 100.5 / (T - 0.05), vl = 99.5 / (T + 0.05);
      return Q('A sprinter runs 100 m (to the nearest metre) in ' + T.toFixed(1) + ' s (to the nearest 0.1 s).', [
        ['Find the upper and lower bounds for the average speed.', 3, M('\\frac{100.5}{' + (T - 0.05).toFixed(2) + '} = ' + sf3(vu)) + ' m/s and ' + M('\\frac{99.5}{' + (T + 0.05).toFixed(2) + '} = ' + sf3(vl)) + ' m/s'],
        ['Records are timed to the nearest 0.01 s. Explain why.', 2, 'Races are decided by tiny margins; the bounds must be narrow enough to separate runners.']
      ]);
    },
    function () {
      var r = ri(30, 90) / 10;
      return Q('The radius of a circle is ' + r.toFixed(1) + ' cm to 1 decimal place.', [
        ['Find the lower and upper bounds of the circumference.', 2, M(sf3(2 * Math.PI * (r - 0.05))) + ' and ' + M(sf3(2 * Math.PI * (r + 0.05)))],
        ['Find the lower and upper bounds of the area.', 2, M(sf3(Math.PI * (r - 0.05) * (r - 0.05))) + ' and ' + M(sf3(Math.PI * (r + 0.05) * (r + 0.05)))],
        ['Find the maximum percentage error in the area if ' + r.toFixed(1) + ' is used.', 2, M(sf3(((r + 0.05) * (r + 0.05) / (r * r) - 1) * 100) + '\\%')]
      ]);
    },
    function () {
      var n = ri(20, 40), w = ri(60, 90);
      return Q('A lift can carry a maximum load of ' + n * 100 + ' kg, to the nearest 100 kg. People each weigh ' + w + ' kg to the nearest kg.', [
        ['Find the greatest number of people that can always safely use the lift.', 3, 'Use the lower bound of the load and the upper bound of a person: ' + M('\\lfloor ' + (n * 100 - 50) + ' \\div ' + (w + 0.5) + ' \\rfloor = ' + Math.floor((n * 100 - 50) / (w + 0.5)))],
        ['Explain why you use these bounds.', 1, 'For safety, assume the least capacity and the heaviest people.']
      ]);
    },
    function () {
      var x = ri(4, 9) * 10;
      return Q('A number ' + M('x') + ' is ' + x + ' to 2 significant figures.', [
        ['Write the error interval for ' + M('x') + '.', 1, M((x - 0.5) + ' \\le x < ' + (x + 0.5))],
        ['Find the error interval for ' + M('\\sqrt{x}') + ', to 3 decimal places.', 2, M(Math.sqrt(x - 0.5).toFixed(3) + ' \\le \\sqrt{x} < ' + Math.sqrt(x + 0.5).toFixed(3))],
        ['Explain why truncating ' + x + '.9 to 2 s.f. gives a different error interval from rounding.', 2, 'Truncation interval: ' + M(x + ' \\le x < ' + (x + 1)) + ', one-sided']
      ]);
    },
    function () {
      var a = ri(10, 30), b = ri(10, 30), C = ri(40, 80);
      return Q('In triangle ' + M('ABC') + ', ' + M('AB = ' + a) + ' cm and ' + M('AC = ' + b) + ' cm (both to the nearest cm) and angle ' + M('A = ' + C + '°') + ' (to the nearest degree).', [
        ['Find the upper bound of the area.', 3, M('\\frac{1}{2}(' + (a + 0.5) + ')(' + (b + 0.5) + ')\\sin ' + (C + 0.5) + '° = ' + sf3(0.5 * (a + 0.5) * (b + 0.5) * Math.sin((C + 0.5) * Math.PI / 180)))],
        ['Explain why the upper bound of the angle gives the upper bound of the area here, and when it would not.', 2, M('\\sin') + ' increases up to 90°; for an angle near or over 90° the bound nearest 90° would give the largest area.']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
