/* Byte Size Classroom — extension questions for the top level of the GCSE / International GCSE topics.
   Multi-step, unfamiliar or proof-style questions in the style of the hardest questions on a Higher paper. */
(function (g) {
  var BS = g.BS, D = BS.draw, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, dp = BS.dp, num = BS.num, M = BS.m;
  function sf3(x) { return BS.sf ? BS.sf(x, 3) : String(Number(x.toPrecision(3))); }
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: p[2] }; }) }; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function tc(c, v) { return c === 0 ? '' : (c < 0 ? ' - ' : ' + ') + (Math.abs(c) === 1 ? '' : Math.abs(c)) + v; }
  function pt(x, y) { return '(' + x + ',\\ ' + y + ')'; }
  function F(n, d) { return frac(n, d); }
  // exact fraction arithmetic [n, d]
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } var k = gcd(Math.abs(n), d) || 1; return [n / k, d / k]; }
  function fadd(a, b) { return fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]); }
  function fsub(a, b) { return fr(a[0] * b[1] - b[0] * a[1], a[1] * b[1]); }
  function fmul(a, b) { return fr(a[0] * b[0], a[1] * b[1]); }
  function fdiv(a, b) { return fr(a[0] * b[1], a[1] * b[0]); }
  function fs(a) { return frac(a[0], a[1]); }

  /* ---------- Number ---------- */
  X('fractions', [
    function () {
      var a = ri(1, 9), b = ri(0, 9), c = ri(1, 9); while (b === c) c = ri(1, 9);
      var top = 100 * a + 10 * b + c - a, d = ri(2, 8);
      return Q('', [
        ['Show that ' + M('0.' + a + '\\dot{' + b + '}\\dot{' + c + '}') + ' can be written as ' + M(F(top, 990)) + '.', 3, M('x = 0.' + a + b + c + b + c + '\\ldots') + ', ' + M('1000x - 10x = ' + (100 * a + 10 * b + c) + ' - ' + a + ' = ' + top) + ', so ' + M('x = \\frac{' + top + '}{990} = ' + F(top, 990))],
        ['Given that ' + M('y = 0.\\dot{' + d + '}') + ', find the exact value of ' + M('y^2 + y') + ' as a fraction in its simplest form.', 3, M('y = \\frac{' + d + '}{9}') + ', so ' + M('y^2 + y = \\frac{' + d * d + '}{81} + \\frac{' + 9 * d + '}{81} = ' + F(d * d + 9 * d, 81))]
      ]);
    },
    function () {
      var k = ri(9, 49), n = ri(2, 9);
      return Q('', [
        ['Show that ' + M('\\frac{1}{n} - \\frac{1}{n + 1} = \\frac{1}{n(n + 1)}') + '.', 2, M('\\frac{(n + 1) - n}{n(n + 1)} = \\frac{1}{n(n + 1)}')],
        ['Hence find the exact value of ' + M('\\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\frac{1}{3 \\times 4} + \\cdots + \\frac{1}{' + k + ' \\times ' + (k + 1) + '}') + '.', 3, 'Each term is ' + M('\\frac{1}{n} - \\frac{1}{n+1}') + ', so the sum is ' + M('1 - \\frac{1}{' + (k + 1) + '} = ' + F(k, k + 1))],
        ['Find the value of ' + M('\\frac{1}{' + n + ' \\times ' + (n + 1) + '} + \\frac{1}{' + (n + 1) + ' \\times ' + (n + 2) + '} + \\cdots + \\frac{1}{' + (k) + ' \\times ' + (k + 1) + '}') + '.', 2, M('\\frac{1}{' + n + '} - \\frac{1}{' + (k + 1) + '} = ' + F(k + 1 - n, n * (k + 1)))]
      ]);
    }
  ]);

  X('percentages', [
    function () {
      var O = 100 * ri(1, 9), p = pick([10, 15, 20, 25, 30]), q = pick([10, 15, 20, 25, 30, 40]), P = O * (100 + p) * (100 - q) / 10000;
      var m = (100 + p) * (100 - q) / 10000, ch = dp((m - 1) * 100, 1);
      return Q('In a sale, the price of a coat is increased by ' + p + '% and then the new price is reduced by ' + q + '%. The final price is £' + P.toFixed(2) + '.', [
        ['Find the original price of the coat.', 3, '£' + P.toFixed(2) + ' ÷ ' + M('(' + (1 + p / 100) + ' \\times ' + (1 - q / 100) + ')') + ' = £' + O.toFixed(2)],
        ['Find the single percentage change from the original price to the final price, stating whether it is an increase or a decrease.', 2, M('1.' + (p < 10 ? '0' + p : p) + ' \\times ' + (1 - q / 100) + ' = ' + num(m)) + ', so a ' + Math.abs(ch) + '% ' + (m > 1 ? 'increase' : m < 1 ? 'decrease' : 'change of 0') ],
        ['Explain why increasing by ' + q + '% and then decreasing by ' + q + '% does not give the original price.', 1, 'The decrease is ' + q + '% of a larger amount, so more is taken off than was added (multiplier ' + M(num((1 + q / 100) * (1 - q / 100))) + ').']
      ]);
    },
    function () {
      var r = pick([3, 4, 5, 6, 8, 12]), k = pick([2, 3]), n = Math.ceil(Math.log(k) / Math.log(1 + r / 100)), N = ri(8, 20), rr = (Math.pow(2, 1 / N) - 1) * 100;
      return Q('The value of an investment increases by ' + r + '% each year, compound interest.', [
        ['Find the least number of whole years after which the investment is worth more than ' + (k === 2 ? 'double' : 'three times') + ' its original value.', 3, M('1.' + (r < 10 ? '0' + r : r) + '^{' + (n - 1) + '} = ' + dp(Math.pow(1 + r / 100, n - 1), 3) + ',\\ 1.' + (r < 10 ? '0' + r : r) + '^{' + n + '} = ' + dp(Math.pow(1 + r / 100, n), 3)) + ', so ' + n + ' years'],
        ['A different investment doubles in value in exactly ' + N + ' years. Find its annual rate of interest, correct to 2 decimal places.', 3, M('(1 + \\frac{r}{100})^{' + N + '} = 2 \\Rightarrow 1 + \\frac{r}{100} = \\sqrt[' + N + ']{2}') + ', so ' + M('r = ' + dp(rr, 2)) + '%']
      ]);
    }
  ]);

  X('indices', [
    function () {
      var base = pick([[2, [4, 8, 16]], [3, [9, 27]]]), p = base[0], pw = pick(base[1]), m = Math.round(Math.log(pw) / Math.log(p)), q = pick(base[1].filter(function (v) { return v !== pw; }).concat([p])), n = Math.round(Math.log(q) / Math.log(p));
      var b = nz(-4, 4), c = ri(1, 3), e = nz(-4, 4); while (m - n * c === 0) c++;
      var X1 = fr(n * e - m * b, m - n * c);
      return Q('', [
        ['Solve ' + M(pw + '^{x' + sg(b) + '} = ' + q + '^{' + c1(c, 'x') + sg(e) + '}') + '.', 4, 'Write both sides as powers of ' + p + ': ' + M(p + '^{' + (m === 1 ? 'x' + sg(b) : m + '(x' + sg(b) + ')') + '} = ' + p + '^{' + (n === 1 ? c1(c, 'x') + sg(e) : n + '(' + c1(c, 'x') + sg(e) + ')') + '}') + ', so ' + M((m === 1 ? 'x' + sg(b) : m + '(x' + sg(b) + ')') + ' = ' + (n === 1 ? c1(c, 'x') + sg(e) : n + '(' + c1(c, 'x') + sg(e) + ')')) + ', ' + M('x = ' + fs(X1))]
      ]);
    },
    function () {
      var x = ri(-3, 6), y = ri(-2, 4); while (x - 2 * y === 0 || x + 2 * y === 0) y++;
      function pw(b, e) { return e >= 0 ? String(Math.pow(b, e)) : '\\frac{1}{' + Math.pow(b, -e) + '}'; }
      return Q('', [
        ['Given that ' + M('2^{x} \\times 4^{y} = ' + pw(2, x + 2 * y)) + ' and ' + M('3^{x} \\div 9^{y} = ' + pw(3, x - 2 * y)) + ', find the values of ' + M('x') + ' and ' + M('y') + '.', 5, M('x + 2y = ' + (x + 2 * y)) + ' and ' + M('x - 2y = ' + (x - 2 * y)) + ', so ' + M('x = ' + x + ',\\ y = ' + y)],
        ['Hence find the value of ' + M('8^{x} \\times 16^{-y}') + ', giving your answer as a power of 2.', 2, M('2^{3x - 4y} = 2^{' + (3 * x - 4 * y) + '}')]
      ]);
    }
  ]);

  X('ratio', [
    function () {
      var rb = pick([[2, 3], [3, 4], [3, 5], [4, 5], [2, 5], [5, 7]]), a = rb[0], b = rb[1], t = ri(3, 9), k = ri(2, 9) * 2;
      var r1 = a * t + k, b1 = b * t, gg = gcd(r1, b1);
      return Q('A bag contains red and blue counters in the ratio ' + a + ' : ' + b + '. ' + k + ' red counters are added. The ratio of red to blue counters is now ' + (r1 / gg) + ' : ' + (b1 / gg) + '.', [
        ['Find how many counters were in the bag at the start.', 4, 'Red ' + M(a + 'n') + ', blue ' + M(b + 'n') + ': ' + M('\\frac{' + a + 'n + ' + k + '}{' + b + 'n} = \\frac{' + (r1 / gg) + '}{' + (b1 / gg) + '}') + ' gives ' + M('n = ' + t) + ', so ' + (a + b) * t + ' counters'],
        ['How many blue counters must now be removed so that there are twice as many red counters as blue counters? Give a reason if it is not possible.', 2, r1 % 2 !== 0 ? 'Not possible: there are ' + r1 + ' red counters, an odd number, so half of it is not a whole number' : b1 - r1 / 2 > 0 ? 'Need ' + (r1 / 2) + ' blue counters, so remove ' + (b1 - r1 / 2) : 'Not possible by removing blue counters: there are only ' + b1 + ' blue counters but ' + (r1 / 2) + ' are needed']
      ]);
    },
    function () {
      var p = ri(2, 5), q = ri(3, 7), r = ri(2, 6), s = ri(3, 8); while (gcd(p, q) > 1) q++; while (gcd(r, s) > 1) s++;
      var X1 = p * r, Y1 = q * r, Z1 = q * s, gg = gcd(gcd(X1, Y1), Z1); X1 /= gg; Y1 /= gg; Z1 /= gg;
      var T = X1 + Y1 + Z1, N = T * ri(3, 12);
      return Q(M('x : y = ' + p + ' : ' + q) + ' and ' + M('y : z = ' + r + ' : ' + s) + '.', [
        ['Find ' + M('x : y : z') + ' in its simplest form.', 2, M(X1 + ' : ' + Y1 + ' : ' + Z1)],
        ['Given that ' + M('x + y + z = ' + N) + ', find the value of ' + M('z - x') + '.', 2, M(N / T * (Z1 - X1))],
        ['Find ' + M('\\frac{x + y}{y + z}') + ' as a fraction in its simplest form.', 1, M(F(X1 + Y1, Y1 + Z1))]
      ]);
    }
  ]);

  X('compound-measures', [
    function () {
      var d1 = 10 * ri(4, 12), v1 = 10 * ri(4, 9), d2 = 10 * ri(4, 12), V = 10 * ri(5, 9);
      V = v1 + 10 * ri(1, 2); while (V >= v1 * (d1 + d2) / d1) V -= 10; if (V === v1) V -= 10;
      var t1 = d1 / v1, need = d2 / ((d1 + d2) / V - t1), avg = (d1 + d2) / (t1 + d2 / v1);
      return Q('A car travels ' + d1 + ' km at an average speed of ' + v1 + ' km/h. It then travels a further ' + d2 + ' km.', [
        ['The car travels the second part of the journey at ' + v1 + ' km/h as well. Explain why the average speed for the whole journey is ' + v1 + ' km/h.', 1, 'Both parts are at the same speed, so total distance ÷ total time = ' + v1 + ' km/h.'],
        ['The driver wants an average speed of ' + V + ' km/h for the whole journey. Find the average speed needed for the second part, correct to 3 significant figures.', 4, 'Total time ' + M('\\frac{' + (d1 + d2) + '}{' + V + '} = ' + sf3((d1 + d2) / V)) + ' h; first part takes ' + sf3(t1) + ' h; speed ' + M('= \\frac{' + d2 + '}{' + sf3((d1 + d2) / V - t1) + '} = ' + sf3(need)) + ' km/h']
      ]);
    },
    function () {
      var r1 = pick([7.9, 8.9, 10.5, 2.7, 11.3]), r2 = pick([19.3, 7.1, 8.4, 4.5]); while (r2 === r1) r2 = 8.4;
      var a = ri(1, 4), b = ri(1, 5); while (gcd(a, b) > 1) b++;
      var rho = (a * r1 + b * r2) / (a + b), V = 10 * ri(2, 9);
      return Q('Metal A has density ' + r1 + ' g/cm³ and metal B has density ' + r2 + ' g/cm³. An alloy is made by mixing volumes of A and B in the ratio ' + a + ' : ' + b + '.', [
        ['Find the density of the alloy, correct to 3 significant figures.', 3, M('\\frac{' + a + ' \\times ' + r1 + ' + ' + b + ' \\times ' + r2 + '}{' + (a + b) + '} = ' + sf3(rho)) + ' g/cm³'],
        ['Find the ratio of the mass of A to the mass of B in the alloy, in the form ' + M('1 : n') + '.', 2, M('1 : ' + sf3(b * r2 / (a * r1)))],
        ['Find the mass of A in ' + V + ' cm³ of the alloy.', 2, M(F(a * V, a + b) + ' \\times ' + r1 + ' = ' + sf3(a * V / (a + b) * r1)) + ' g']
      ]);
    }
  ]);

  /* ---------- Algebra ---------- */
  X('expand-factorise', [
    function () {
      var p = ri(2, 3), q = nz(-5, 5), r = 1, s = nz(-6, 6), u = 1, v = nz(-6, 6); while (v === s) v = nz(-6, 6);
      while (gcd(p, Math.abs(q)) > 1) q = nz(-5, 5);
      var top = [p * r, p * s + q * r, q * s], bot = [p * u, p * v + q * u, q * v];
      var ks = [-4, -3, -2, 2, 3, 4, 5].filter(function (k) { var x = (s - k * v) / (k - 1); return Number.isInteger(x) && x !== -v && p * x + q !== 0 && x !== -s; });
      var a = ri(2, 3), b = ri(1, 5), c = nz(-4, 4);
      var parts = [['Simplify fully ' + M('\\frac{' + poly(top) + '}{' + poly(bot) + '}') + '.', 3, M('\\frac{' + br(p, q) + br(r, s) + '}{' + br(p, q) + br(u, v) + '} = \\frac{' + poly([r, s]) + '}{' + poly([u, v]) + '}')]];
      if (ks.length) { var k = pick(ks), xs = (s - k * v) / (k - 1); parts.push(['Hence solve ' + M('\\frac{' + poly(top) + '}{' + poly(bot) + '} = ' + k) + '.', 3, M(poly([1, s]) + ' = ' + k + '(' + poly([1, v]) + ')') + ', so ' + M('x = ' + xs)]); }
      parts.push(['Expand and simplify ' + M(br(a, c) + br(1, b) + br(1, -b)) + '.', 3, M(br(a, c) + '(x^2 - ' + (b * b) + ') = ' + poly([a, c, -a * b * b, -c * b * b]))]);
      return Q('', parts);
    },
    function () {
      var P = pick([
        ['Prove that the difference between the squares of any two consecutive odd numbers is a multiple of 8.', M('(2n + 1)^2 - (2n - 1)^2 = 8n') + ', which is a multiple of 8.'],
        ['Prove that the product of two consecutive odd numbers is always one less than a multiple of 4.', M('(2n - 1)(2n + 1) = 4n^2 - 1') + ', which is one less than the multiple of 4, ' + M('4n^2') + '.'],
        ['Prove that the sum of the squares of any three consecutive integers is never a multiple of 3.', M('(n - 1)^2 + n^2 + (n + 1)^2 = 3n^2 + 2') + ', which leaves remainder 2 when divided by 3.'],
        ['Prove that the sum of any three consecutive even numbers is a multiple of 6.', M('2n + (2n + 2) + (2n + 4) = 6n + 6 = 6(n + 1)') + '.'],
        ['Prove that ' + M('(n + 3)^2 - (n - 3)^2') + ' is a multiple of 12 for all positive integers ' + M('n') + '.', M('(n^2 + 6n + 9) - (n^2 - 6n + 9) = 12n') + '.']]);
      return Q('', [[P[0], 4, P[1]]]);
    }
  ]);

  X('linear-equations', [
    function () {
      var x = nz(-6, 9), a = nz(-5, 5), b = pick([2, 3, 4, 5]), c = nz(-5, 5), d = pick([2, 3, 4, 5, 6]); while (d === b) d++;
      var E = fsub(fr(x + a, b), fr(x - c, d));
      return Q('', [['Solve ' + M('\\frac{x' + sg(a) + '}{' + b + '} - \\frac{x' + sg(-c) + '}{' + d + '} = ' + fs(E)) + '. Show clear algebraic working.', 4, 'Multiply by ' + (b * d / gcd(b, d)) + ' and simplify: ' + M('x = ' + x)]]);
    },
    function () {
      var m, k, B, tries = 0; do { m = ri(2, 3); k = m + ri(1, 3); B = (m - 1) * ri(2, 8); tries++; } while ((2 * B) % (k + 1) !== 0 && tries < 200); var n = B * (k - m) / (m - 1), A = k * B;
      return Q('Ann is ' + k + ' times as old as her son Ben. In ' + n + ' years’ time Ann will be ' + m + ' times as old as Ben.', [
        ['Form an equation and solve it to find Ben’s age now.', 4, M(k + 'b + ' + n + ' = ' + m + '(b + ' + n + ')') + ' so ' + M('b = ' + B)],
        ['How many years ago was Ann ' + (k + 2) + ' times as old as Ben? Give a reason if this never happened.', 2, (function () { var y = (A - (k + 2) * B) / (1 - (k + 2)); return y > 0 && y < B && Number.isInteger(y) ? M(A + ' - y = ' + (k + 2) + '(' + B + ' - y)') + ', so ' + y + ' years ago' : y > 0 && y < B ? M('y = ' + F(A - (k + 2) * B, -(k + 1))) + ' years ago' : 'It solves to ' + M('y = ' + F(A - (k + 2) * B, -(k + 1))) + ', which is not before Ben was born, so it never happened'; })()]
      ]);
    }
  ]);

  X('inequalities', [
    function () {
      var b = pick([2, 3, 4, 5]), c = nz(-6, 6), lo = ri(-5, 2), hi = lo + ri(3, 6), d = pick([2, 3]);
      // lo < (b x + c)/d <= hi  =>  (d lo - c)/b < x <= (d hi - c)/b
      var L = fr(d * lo - c, b), H = fr(d * hi - c, b), ints = [];
      for (var y = -40; y <= 40; y++) if (b * y + c > d * lo && b * y + c <= d * hi) ints.push(y);
      return Q('', [
        ['Solve ' + M(lo + ' < \\frac{' + poly([b, c]) + '}{' + d + '} \\le ' + hi) + '.', 3, M(fs(L) + ' < x \\le ' + fs(H))],
        ['Find the sum of all the integers that satisfy the inequality.', 2, M(ints.filter(function (v) { return v !== 0; }).join(' + ').replace(/\+ -/g, '- ') + ' = ' + ints.reduce(function (s, v) { return s + v; }, 0))]
      ]);
    },
    function () {
      var k = ri(5, 9), m = ri(2, 4), c = ri(1, 2), best = null, pts = [];
      for (var x = -10; x <= 20; x++) for (var y = -10; y <= 20; y++) if (y >= x - c && x + y < k && y < m && x >= 0) { pts.push([x, y]); if (!best || 2 * x + y > 2 * best[0] + best[1]) best = [x, y]; }
      return Q('The integer coordinates ' + M('(x, y)') + ' satisfy all of these inequalities: ' + M('x \\ge 0,\\ y \\ge x - ' + c + ',\\ x + y < ' + k + ',\\ y < ' + m) + '.', [
        ['Sketch the region and list the point(s) with the greatest value of ' + M('2x + y') + '.', 4, M(pt(best[0], best[1])) + ', giving ' + M('2x + y = ' + (2 * best[0] + best[1]))],
        ['How many points with integer coordinates satisfy all four inequalities?', 2, String(pts.length)]
      ]);
    }
  ]);

  X('sequences', [
    function () {
      var a = pick([1, 2, 3]), b = nz(-6, 6), c = nz(-8, 10), T = function (n) { return a * n * n + b * n + c; }, n0 = ri(12, 25), N = T(n0);
      return Q('The first five terms of a quadratic sequence are ' + M([1, 2, 3, 4, 5].map(T).join(',\\ ')) + '.', [
        ['Find an expression, in terms of ' + M('n') + ', for the ' + M('n') + 'th term.', 4, M(poly([a, b, c], 'n'))],
        ['Is ' + N + ' a term of the sequence? Show how you decide, and if it is, state which term.', 2, 'Solve ' + M(poly([a, b, c], 'n') + ' = ' + N) + ': ' + M('n = ' + n0) + ', so yes, the ' + n0 + 'th term'],
        ['Show that ' + (N + 1) + ' is not a term of the sequence.', 1, 'Term ' + n0 + ' is ' + N + ' and term ' + (n0 + 1) + ' is ' + T(n0 + 1) + ' (the sequence is increasing here), so ' + (N + 1) + ' is skipped.']
      ]);
    },
    function () {
      var a = ri(1, 9), b = ri(2, 9), t3 = a + b, t6 = 3 * a + 5 * b;
      return Q('A sequence is formed by adding the two previous terms. The first term is ' + M('a') + ' and the second term is ' + M('b') + '.', [
        ['Show that the 6th term is ' + M('3a + 5b') + '.', 2, M('a,\\ b,\\ a + b,\\ a + 2b,\\ 2a + 3b,\\ 3a + 5b')],
        ['The 3rd term is ' + t3 + ' and the 6th term is ' + t6 + '. Find ' + M('a') + ' and ' + M('b') + '.', 3, M('a + b = ' + t3 + ',\\ 3a + 5b = ' + t6) + ' so ' + M('a = ' + a + ',\\ b = ' + b)],
        ['Prove that no term of the sequence with ' + M('n') + 'th term ' + M('4n + 2') + ' is a square number.', 2, 'Square numbers leave remainder 0 or 1 when divided by 4 (even squares ' + M('4k^2') + ', odd squares ' + M('4k^2 + 4k + 1') + '); ' + M('4n + 2') + ' leaves remainder 2.']
      ]);
    }
  ]);

  X('straight-lines', [
    function () {
      var A = [ri(-6, 0) * 2, ri(-4, 4) * 2], B = [ri(1, 6) * 2, ri(-4, 4) * 2]; while (B[1] === A[1]) B[1] += 2;
      var Mx = (A[0] + B[0]) / 2, My = (A[1] + B[1]) / 2, mN = B[1] - A[1], mD = B[0] - A[0]; // AB gradient mN/mD; perpendicular -mD/mN
      // perpendicular bisector: y - My = -(mD/mN)(x - Mx). x-intercept: x = Mx + My*mN/mD
      var xi = fadd([Mx, 1], fr(My * mN, mD)), yi = fadd([My, 1], fr(mD * Mx, mN));
      if (xi[0] === 0 || yi[0] === 0) return BS.topics['straight-lines'].gens.filter(function (g) { return g.x; })[0].f();
      var gS = F(-mD, mN); gS = gS === '1' ? '' : gS === '-1' ? '-' : gS;
      return Q('The points ' + M('A' + pt(A[0], A[1])) + ' and ' + M('B' + pt(B[0], B[1])) + ' are joined by a straight line.', [
        ['Find the equation of the perpendicular bisector of ' + M('AB') + ', in the form ' + M('y = mx + c') + '.', 4, 'Midpoint ' + M(pt(Mx, My)) + ', gradient ' + M(F(-mD, mN)) + ': ' + M('y = ' + gS + 'x' + (fs(yi).charAt(0) === '-' ? ' - ' + fs([-yi[0], yi[1]]) : ' + ' + fs(yi)))],
        ['The perpendicular bisector meets the ' + M('x') + '-axis at ' + M('P') + ' and the ' + M('y') + '-axis at ' + M('Q') + '. Find the area of triangle ' + M('OPQ') + '.', 3, M('P' + pt(fs(xi), 0) + ',\\ Q' + pt(0, fs(yi))) + ', area ' + M('= \\tfrac{1}{2}|' + fs(xi) + ' \\times ' + fs(yi) + '| = ' + fs(fr(Math.abs(xi[0] * yi[0]), 2 * xi[1] * yi[1])))]
      ]);
    },
    function () {
      var m1 = nz(1, 4), c1v = ri(1, 8), m2 = -nz(1, 3), c2v = c1v + ri(2, 9);
      // intersection: m1 x + c1 = m2 x + c2 -> x = (c2-c1)/(m1-m2)
      var xI = fr(c2v - c1v, m1 - m2), yI = fadd(fmul([m1, 1], xI), [c1v, 1]);
      var xa = fr(-c1v, m1), xb = fr(-c2v, m2), base = fsub(xb, xa), area = fmul(fr(1, 2), fmul(base, yI));
      var D1 = D.plane({ xmin: Math.min(-c1v / m1, 0) - 1, xmax: -c2v / m2 + 1, ymin: -1, ymax: (yI[0] / yI[1]) + 2, w: 300, h: 230 });
      var s = D1.svg + D1.curve(function (x) { return m1 * x + c1v; }, Math.min(-c1v / m1, 0) - 1, -c2v / m2 + 1) + D1.curve(function (x) { return m2 * x + c2v; }, Math.min(-c1v / m1, 0) - 1, -c2v / m2 + 1) + D.poly([[D1.X(xa[0] / xa[1]), D1.Y(0)], [D1.X(xI[0] / xI[1]), D1.Y(yI[0] / yI[1])], [D1.X(xb[0] / xb[1]), D1.Y(0)]], 'shade');
      return Q('The lines ' + M('y = ' + poly([m1, c1v])) + ' and ' + M('y = ' + poly([m2, c2v])) + ' and the ' + M('x') + '-axis enclose a triangle.' + D.svg(300, 230, s, 'Triangle between two lines and the x-axis'), [
        ['Find the coordinates of the point where the two lines meet.', 2, M(pt(fs(xI), fs(yI)))],
        ['Find the exact area of the triangle.', 3, 'Base from ' + M('x = ' + fs(xa)) + ' to ' + M('x = ' + fs(xb)) + ', so area ' + M('= \\tfrac{1}{2} \\times ' + fs(base) + ' \\times ' + fs(yI) + ' = ' + fs(area))]
      ]);
    }
  ]);

  X('kinematic-graphs', [
    function () {
      var V = ri(8, 20), t1 = ri(4, 10), t3 = ri(4, 12), T = ri(30, 70), dist = V * (T - (t1 + t3) / 2);
      var g_ = D.lineGraph([[0, 0], [t1, V], [T - t3, V], [T, 0]], { xmax: T + 5, ymax: V + 4, xstep: 10, ystep: V > 12 ? 4 : 2, grid: true, gx: 5, gy: 2, xl: 'Time (s)', yl: 'Speed (m/s)' });
      var half = dist / 2, tHalf = half <= V * t1 / 2 ? Math.sqrt(2 * half * t1 / V) : t1 + (half - V * t1 / 2) / V;
      return Q('A train accelerates from rest to ' + V + ' m/s in ' + t1+ ' s, travels at constant speed, then decelerates to rest in ' + t3 + ' s. The whole journey takes ' + M('T') + ' seconds and covers ' + num(dist) + ' m.' + g_, [
        ['Find the value of ' + M('T') + '.', 3, M('\\tfrac{1}{2}(T + T - ' + (t1 + t3) + ') \\times ' + V + ' = ' + num(dist)) + ', so ' + M('T = ' + T)],
        ['Find the time taken for the train to travel the first half of the distance.', 3, 'Half distance is ' + num(half) + ' m; ' + (half <= V * t1 / 2 ? 'still accelerating' : 'after ' + t1 + ' s it has gone ' + num(V * t1 / 2) + ' m') + ', so time ' + M('= ' + sf3(tHalf)) + ' s']
      ]);
    },
    function () {
      var k = pick([0.2, 0.25, 0.5]), f = function (t) { return k * t * t + 1; }, ts = [0, 2, 4, 6, 8], vs = ts.map(function (t) { return Math.round(f(t) * 100) / 100; }), est = 2 / 2 * (vs[0] + vs[4] + 2 * (vs[1] + vs[2] + vs[3]));
      var p = D.plane({ xmin: -0.5, xmax: 9, ymin: 0, ymax: f(8) + 2, w: 300, h: 230, ticks: true, tstep: 2, tstepy: f(8) > 12 ? 4 : 2 });
      var s = p.svg + p.curve(f, 0, 8.5); for (var i = 0; i < 4; i++) s += D.poly([[p.X(ts[i]), p.Y(0)], [p.X(ts[i]), p.Y(vs[i])], [p.X(ts[i + 1]), p.Y(vs[i + 1])], [p.X(ts[i + 1]), p.Y(0)]], 'trap');
      var grad = 2 * k * 4;
      return Q('The speed ' + M('v') + ' m/s of an object ' + M('t') + ' seconds after it starts is shown on the speed-time graph, where ' + M('v = ' + k + 't^2 + 1') + '.' + D.svg(300, 230, s, 'Curved speed-time graph'), [
        ['Use four strips of equal width to estimate the distance travelled in the first 8 seconds.', 3, M('\\tfrac{1}{2} \\times 2 \\times [' + vs[0] + ' + ' + vs[4] + ' + 2(' + vs[1] + ' + ' + vs[2] + ' + ' + vs[3] + ')] = ' + num(est)) + ' m'],
        ['Is your answer an overestimate or an underestimate? Give a reason.', 1, 'An overestimate: the curve bends upwards, so the straight tops of the strips lie above the curve.'],
        ['Find the acceleration of the object at ' + M('t = 4') + ' by finding the gradient of a tangent, or otherwise.', 2, M(num(grad)) + ' m/s² (tangent gradient at ' + M('t = 4') + ')']
      ]);
    }
  ]);

  /* ---------- Geometry ---------- */
  X('angles-parallel', [
    function () {
      var x = ri(10, 25), a = ri(5, 30), C = 0, ok = false, A3, b;
      for (var tries = 0; tries < 50 && !ok; tries++) { x = ri(10, 25); a = ri(5, 30); b = 5 * x - (3 * x + a); C = 3 * x + a; ok = b > 0 && C > 40 && C < 85; }
      if (!ok) { x = 15; a = 20; b = 5; C = 65; }
      var apex = 180 - 2 * C;
      var P = { A: [0, 5], B: [-2.4, 0], C: [2.4, 0], D: [-1.2, 2.5], E: [1.2, 2.5] };
      var dg = D.geo({ pts: P, segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['D', 'E']], par: [['D', 'E', 1], ['B', 'C', 1]], angles: [{ v: 'D', a: 'E', b: 'A', t: '(3x + ' + a + ')°' }, { v: 'C', a: 'A', b: 'B', t: '(5x − ' + b + ')°' }], w: 300, h: 250 });
      return Q('Triangle ' + M('ABC') + ' is isosceles with ' + M('AB = AC') + '. ' + M('D') + ' lies on ' + M('AB') + ' and ' + M('E') + ' lies on ' + M('AC') + ', with ' + M('DE') + ' parallel to ' + M('BC') + '. Angle ' + M('ADE = (3x + ' + a + ')°') + ' and angle ' + M('ACB = (5x - ' + b + ')°') + '.' + dg, [
        ['Find the value of ' + M('x') + '. Give a reason for each stage of your working.', 4, 'Angle ' + M('ABC = ADE') + ' (corresponding angles), and angle ' + M('ABC = ACB') + ' (base angles of an isosceles triangle), so ' + M('3x + ' + a + ' = 5x - ' + b) + ', ' + M('x = ' + x)],
        ['Find the size of angle ' + M('BAC') + '.', 2, M('180 - 2 \\times ' + C + ' = ' + apex) + '°']
      ]);
    },
    function () {
      var y = ri(10, 30), p = ri(5, 20), q = ri(5, 30), A1 = 2 * y + p, B1 = 3 * y - q; // angle at P = A1 + B1 = 4y + ... choose total
      var tot = A1 + B1, r = tot - 4 * y; // label angle at P as (4y + r)
      if (A1 >= 90 || B1 <= 10 || B1 >= 90) { y = 20; p = 10; q = 15; A1 = 50; B1 = 45; tot = 95; r = 15; }
      var P = { A: [-3, 3], B: [3, 3], P: [0.6, 1.6], C: [-3, 0], E: [3, 0] };
      var dg = D.geo({ pts: P, lines: [['A', 'B'], ['C', 'E']], segs: [['A', 'P'], ['P', 'E']], par: [['A', 'B', 1], ['C', 'E', 1]], angles: [{ v: 'A', a: 'B', b: 'P', t: '(2y + ' + p + ')°', d: 38 }, { v: 'E', a: 'C', b: 'P', t: '(3y − ' + q + ')°', d: 38 }, { v: 'P', a: 'A', b: 'E', t: '(4y' + (r ? sg(r) : '') + ')°', d: 30 }], w: 320, h: 220 });
      return Q('The lines ' + M('AB') + ' and ' + M('CE') + ' are parallel. ' + M('P') + ' lies between them, as shown.' + dg, [
        ['Prove that angle ' + M('APE') + ' = angle ' + M('BAP') + ' + angle ' + M('PEC') + '.', 3, 'Draw a line through ' + M('P') + ' parallel to ' + M('AB') + '. Alternate angles give the two parts of angle ' + M('APE') + ' equal to angles ' + M('BAP') + ' and ' + M('PEC') + '.'],
        ['Hence find the value of ' + M('y') + ' and the size of angle ' + M('APE') + '.', 3, M('(2y + ' + p + ') + (3y - ' + q + ') = 4y' + (r ? sg(r) : '')) + ', so ' + M('y = ' + y) + '; angle ' + M('APE = ' + tot) + '°']
      ]);
    }
  ]);

  X('polygons', [
    function () {
      var n = pick([5, 6, 9, 10, 12, 15, 18, 20]), d = 180 / n;
      return Q('', [
        ['The interior angle of a regular polygon with ' + M('2n') + ' sides is ' + d + '° more than the interior angle of a regular polygon with ' + M('n') + ' sides. Show that ' + M('\\frac{180}{n} = ' + d) + ' and find ' + M('n') + '.', 4, M('180 - \\frac{360}{2n} - (180 - \\frac{360}{n}) = \\frac{180}{n} = ' + d) + ', so ' + M('n = ' + n)],
        ['Find the sum of the interior angles of the polygon with ' + M('2n') + ' sides.', 1, M('(' + (2 * n) + ' - 2) \\times 180 = ' + num((2 * n - 2) * 180)) + '°']
      ]);
    },
    function () {
      var T = pick([[3, 7, 42], [3, 8, 24], [3, 9, 18], [3, 10, 15], [3, 12, 12], [4, 5, 20], [4, 6, 12], [4, 8, 8], [5, 5, 10]]), sh = BS.shuffle(T.slice()), a = sh[0], b = sh[1], c = sh[2];
      function ia(n) { return 180 - 360 / n; }
      return Q('Three regular polygons meet at a point and fit together exactly with no gaps. One has ' + a + ' sides and one has ' + b + ' sides.', [
        ['Find the number of sides of the third polygon.', 4, 'Interior angles ' + num(dp(ia(a), 2) * 1) + '° and ' + num(dp(ia(b), 2) * 1) + '°; remaining angle ' + num(Math.round((360 - ia(a) - ia(b)) * 100) / 100) + '°, so ' + M('180 - \\frac{360}{n} = ' + num(Math.round(ia(c) * 100) / 100)) + ', ' + M('n = ' + c)],
        ['Explain why three regular pentagons cannot meet at a point without a gap.', 1, '3 × 108° = 324°, which is not 360°.']
      ]);
    }
  ]);

  X('pythagoras-trig', [
    function () {
      var l = ri(5, 14), w = ri(3, 9), h = ri(3, 10), diag = Math.sqrt(l * l + w * w + h * h), ang = Math.atan(h / Math.sqrt(l * l + w * w)) * 180 / Math.PI;
      var ang2 = Math.atan(w / Math.sqrt(l * l + h * h)) * 180 / Math.PI;
      return Q('The diagram shows a cuboid ' + M('ABCDEFGH') + '.' + D.cuboid(l, w, h, [['A', 'G', 'accent'], ['A', 'C', 'accentdash']]), [
        ['Find the length of ' + M('AG') + ', giving your answer as a surd in its simplest form.', 3, M('AG = \\sqrt{' + l + '^2 + ' + w + '^2 + ' + h + '^2} = ' + BS.gcse2.surd(l * l + w * w + h * h))],
        ['Find the angle between ' + M('AG') + ' and the plane ' + M('ABCD') + '.', 3, M('\\tan\\theta = \\frac{' + h + '}{\\sqrt{' + (l * l + w * w) + '}}') + ', ' + M('\\theta = ' + dp(ang, 1)) + '°'],
        ['Find the angle between ' + M('AG') + ' and the plane ' + M('ABFE') + '.', 2, M('\\tan\\phi = \\frac{' + w + '}{\\sqrt{' + (l * l + h * h) + '}}') + ', ' + M('\\phi = ' + dp(ang2, 1)) + '°']
      ]);
    },
    function () {
      var a = ri(25, 40), b = a + ri(10, 25), d = 10 * ri(3, 12), ta = Math.tan(a * Math.PI / 180), tb = Math.tan(b * Math.PI / 180), H = d / (1 / ta - 1 / tb), xB = H / tb;
      var P = { P: [0, 0], Q: [d, 0], F: [d + xB, 0], T: [d + xB, H] };
      var dg = D.geo({ pts: P, segs: [['P', 'F'], ['F', 'T'], ['P', 'T'], ['Q', 'T']], angles: [{ v: 'P', a: 'F', b: 'T', t: a + '°', d: 44 }, { v: 'Q', a: 'F', b: 'T', t: b + '°', d: 30 }, { v: 'F', a: 'P', b: 'T', right: true }], slabels: [{ p: 'P', q: 'Q', t: d + ' m' }], w: 320, h: 220 });
      return Q('From point ' + M('P') + ' the angle of elevation of the top ' + M('T') + ' of a tower is ' + a + '°. From point ' + M('Q') + ', ' + d + ' m closer to the tower, the angle of elevation is ' + b + '°. ' + M('P') + ', ' + M('Q') + ' and the foot of the tower ' + M('F') + ' lie on horizontal ground in a straight line.' + dg, [
        ['Find the height of the tower, correct to 3 significant figures.', 5, M('QT = \\frac{' + d + '\\sin ' + a + '^\\circ}{\\sin ' + (b - a) + '^\\circ}') + ' (sine rule in triangle ' + M('PQT') + '), height ' + M('= QT\\sin ' + b + '^\\circ = ' + sf3(H)) + ' m']
      ]);
    }
  ]);

  X('circles', [
    function () {
      var r = ri(3, 12), s = ri(2, r - 1), th = 360 * s * s / (r * r);
      var theta = ri(40, 150), P = ri(20, 60), rr = P / (2 + Math.PI * theta / 180);
      return Q('', [
        ['A sector of a circle of radius ' + r + ' cm has the same area as a circle of radius ' + s + ' cm. Find the angle of the sector, correct to 1 decimal place.', 3, M('\\frac{\\theta}{360}\\pi(' + r + ')^2 = \\pi(' + s + ')^2 \\Rightarrow \\theta = ' + dp(th, 1)) + '°'],
        ['A different sector has angle ' + theta + '° and perimeter ' + P + ' cm. Find its radius and its area, correct to 3 significant figures.' + D.sector(theta * Math.PI / 180, M('r') + ' cm', theta + '°'), 4, M('2r + \\frac{' + theta + '}{360} \\times 2\\pi r = ' + P) + ', ' + M('r = ' + sf3(rr)) + ' cm; area ' + M('= ' + sf3(theta / 360 * Math.PI * rr * rr)) + ' cm²']
      ]);
    },
    function () {
      var r = ri(2, 9);
      var s = '<rect x="60" y="20" width="180" height="180" class="shade"/>' +
        D.path('M60,20 L150,20 A90,90 0 0,1 60,110 Z', 'shape') + D.path('M240,20 L240,110 A90,90 0 0,1 150,20 Z', 'shape') +
        D.path('M240,200 L150,200 A90,90 0 0,1 240,110 Z', 'shape') + D.path('M60,200 L60,110 A90,90 0 0,1 150,200 Z', 'shape') +
        '<rect x="60" y="20" width="180" height="180" class="thin"/>' + D.text(150, 218, (2 * r) + ' cm', { anchor: 'middle', size: 12 });
      return Q('The diagram shows a square of side ' + (2 * r) + ' cm. A quarter circle of radius ' + r + ' cm is drawn at each corner. The region inside the square but outside all four quarter circles is shaded.' + D.svg(300, 230, s, 'Square with four quarter circles'), [
        ['Show that the area of the shaded region is ' + M(r * r + '(4 - \\pi)') + ' cm².', 3, M((2 * r) + '^2 - \\pi(' + r + ')^2 = ' + (4 * r * r) + ' - ' + (r * r) + '\\pi = ' + r * r + '(4 - \\pi)')],
        ['Find the exact perimeter of the shaded region.', 2, 'Four quarter arcs make one full circle: ' + M((2 * r) + '\\pi') + ' cm'],
        ['What percentage of the square is shaded? Give your answer to 1 decimal place.', 1, M('\\frac{4 - \\pi}{4} \\times 100 = ' + dp((4 - Math.PI) / 4 * 100, 1)) + '%']
      ]);
    }
  ]);

  X('similar-shapes', [
    function () {
      var k = pick([[3, 2], [4, 3], [5, 2], [5, 3], [5, 4]]), A1 = k[1] * k[1] * ri(2, 8) * 5, A2 = A1 * k[0] * k[0] / (k[1] * k[1]), V2 = Math.pow(k[0], 3) * ri(2, 6) * 10, V1 = V2 * Math.pow(k[1], 3) / Math.pow(k[0], 3);
      return Q('Two mathematically similar bottles have surface areas ' + num(A1) + ' cm² and ' + num(A2) + ' cm². The larger bottle has a volume of ' + num(V2) + ' cm³.', [
        ['Find the volume of the smaller bottle.', 3, 'Area scale factor ' + M(F(k[0] * k[0], k[1] * k[1])) + ', length scale factor ' + M(F(k[0], k[1])) + ', so ' + M('V = ' + num(V2) + ' \\times (' + F(k[1], k[0]) + ')^3 = ' + num(V1)) + ' cm³'],
        ['The smaller bottle is filled with water and poured into an empty larger bottle. What fraction of the larger bottle is filled?', 1, M(F(Math.pow(k[1], 3), Math.pow(k[0], 3)))]
      ]);
    },
    function () {
      var a = ri(2, 7), b = ri(1, 6), c = ri(3, 12), BC = fr(c * (a + b), a), frac1 = fr((a + b) * (a + b) - a * a, (a + b) * (a + b));
      var P = { A: [1.5, 4.5], B: [0, 0], C: [5, 0] }, t = a / (a + b); P.D = [P.A[0] + (P.B[0] - P.A[0]) * t, P.A[1] + (P.B[1] - P.A[1]) * t]; P.E = [P.A[0] + (P.C[0] - P.A[0]) * t, P.A[1] + (P.C[1] - P.A[1]) * t];
      var dg = D.geo({ pts: P, segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['D', 'E']], par: [['D', 'E', 1], ['B', 'C', 1]], slabels: [{ p: 'A', q: 'D', t: a + ' cm' }, { p: 'D', q: 'B', t: b + ' cm' }, { p: 'D', q: 'E', t: c + ' cm', flip: true }], w: 300, h: 240 });
      return Q(M('DE') + ' is parallel to ' + M('BC') + '. ' + M('AD = ' + a) + ' cm, ' + M('DB = ' + b) + ' cm and ' + M('DE = ' + c) + ' cm.' + dg, [
        ['Find the length of ' + M('BC') + '.', 2, M('BC = ' + c + ' \\times \\frac{' + (a + b) + '}{' + a + '} = ' + fs(BC)) + ' cm'],
        ['The area of triangle ' + M('ADE') + ' is ' + a * a * 2 + ' cm². Find the area of the trapezium ' + M('DBCE') + '.', 3, 'Area of ' + M('ABC = ' + (a * a * 2) + ' \\times (' + F(a + b, a) + ')^2 = ' + fs(fr(2 * (a + b) * (a + b), 1))) + ', so trapezium ' + M('= ' + (2 * (a + b) * (a + b) - 2 * a * a)) + ' cm²'],
        ['What fraction of triangle ' + M('ABC') + ' is the trapezium?', 1, M(fs(frac1))]
      ]);
    }
  ]);

  X('volume', [
    function () {
      var cones = pick([[1, 2], [2, 3], [1, 3]]), R = cones[1] * ri(1, 3), r = R * cones[0] / cones[1], H = cones[1] * ri(2, 5), h = H * cones[0] / cones[1];
      var Vb = R * R * H / 3, Vs = r * r * h / 3, Vf = Vb - Vs;
      return Q('A cone has base radius ' + R + ' cm and height ' + H + ' cm. A smaller cone, of height ' + num(h) + ' cm, is cut off the top, leaving a frustum.', [
        ['Find the radius of the small cone.', 1, M(num(r)) + ' cm (similar cones)'],
        ['Find the exact volume of the frustum, giving your answer in terms of ' + M('\\pi') + '.', 4, M('\\tfrac{1}{3}\\pi(' + R + ')^2(' + H + ') - \\tfrac{1}{3}\\pi(' + num(r) + ')^2(' + num(h) + ') = ' + F(R * R * H - r * r * h, 3) + '\\pi') + ' cm³']
      ]);
    },
    function () {
      var r = ri(3, 9), a = ri(1, 3), h = ri(2, 6), Vs = 4 * r * r * r / 3, Vc = a * a * h / 3, n = Math.floor(Vs / Vc);
      return Q('A solid metal sphere of radius ' + r + ' cm is melted down. The metal is used to make solid cones, each with base radius ' + a + ' cm and height ' + h + ' cm.', [
        ['Find the greatest number of cones that can be made.', 4, M('\\frac{\\tfrac{4}{3}\\pi(' + r + ')^3}{\\tfrac{1}{3}\\pi(' + a + ')^2(' + h + ')} = ' + dp(Vs / Vc, 2)) + ', so ' + n + ' cones'],
        ['Find the percentage of the metal left over, correct to 1 decimal place.', 2, M(dp((Vs - n * Vc) / Vs * 100, 1)) + '%']
      ]);
    }
  ]);

  X('vectors', [
    function () {
      var K = pick([[1, 2, 1, 3, '3 : 1'], [2, 3, 1, 2, '2 : 1'], [4, 5, 2, 3, '3 : 2']]), kn = K[0], kd = K[1], tn = K[2], td = K[3];
      var P = { O: [0, 0], A: [5, 0], B: [1.5, 4] }; P.M = [(P.A[0] + P.B[0]) / 2, (P.A[1] + P.B[1]) / 2]; P.N = [P.B[0] * tn / td, P.B[1] * tn / td]; P.X = [P.M[0] * kn / kd, P.M[1] * kn / kd];
      var dg = D.geo({ pts: P, segs: [['O', 'A'], ['O', 'B'], ['A', 'B'], ['O', 'M'], ['A', 'N']], vecs: [['O', 'A'], ['O', 'B']], w: 320, h: 240 });
      return Q(M('\\overrightarrow{OA} = \\mathbf{a}') + ' and ' + M('\\overrightarrow{OB} = \\mathbf{b}') + '. ' + M('M') + ' is the midpoint of ' + M('AB') + '. ' + M('N') + ' lies on ' + M('OB') + ' with ' + M('ON = ' + F(tn, td) + 'OB') + '. ' + M('X') + ' lies on ' + M('OM') + ' with ' + M('OX = ' + F(kn, kd) + 'OM') + '.' + dg, [
        ['Find ' + M('\\overrightarrow{AN}') + ' and ' + M('\\overrightarrow{AX}') + ' in terms of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '.', 3, M('\\overrightarrow{AN} = -\\mathbf{a} + ' + F(tn, td) + '\\mathbf{b}') + ', ' + M('\\overrightarrow{AX} = ' + fs(fr(kn - 2 * kd, 2 * kd)) + '\\mathbf{a} + ' + fs(fr(kn, 2 * kd)) + '\\mathbf{b}')],
        ['Prove that ' + M('A') + ', ' + M('X') + ' and ' + M('N') + ' lie on a straight line, and find the ratio ' + M('AX : XN') + '.', 3, M('\\overrightarrow{AX} = ' + fs(fr(2 * kd - kn, 2 * kd)) + '\\overrightarrow{AN}') + ', a multiple of ' + M('\\overrightarrow{AN}') + ' with ' + M('A') + ' in common, so they are collinear; ' + M('AX : XN = ' + K[4])]
      ]);
    },
    function () {
      var p = ri(1, 3), q = ri(1, 4), lam = ri(2, 4), k = ri(3, 8), N = q + lam * (k - q), Rx = p + lam * (3 * p - p);
      return Q(M('\\overrightarrow{OP} = ' + c1(p, '\\mathbf{a}') + ' + ' + c1(q, '\\mathbf{b}')) + ', ' + M('\\overrightarrow{OQ} = ' + (3 * p) + '\\mathbf{a} + k\\mathbf{b}') + ' and ' + M('\\overrightarrow{OR} = ' + Rx + '\\mathbf{a}' + tc(N, '\\mathbf{b}')) + ', where ' + M('k') + ' is a constant.', [
        ['Given that ' + M('P') + ', ' + M('Q') + ' and ' + M('R') + ' lie on a straight line, find the value of ' + M('k') + '.', 4, M('\\overrightarrow{PR} = ' + (Rx - p) + '\\mathbf{a}' + tc(N - q, '\\mathbf{b}')) + ' must be a multiple of ' + M('\\overrightarrow{PQ} = ' + (2 * p) + '\\mathbf{a} + (k - ' + q + ')\\mathbf{b}') + ': ' + M('\\lambda = ' + lam) + ', so ' + M('k = ' + k)],
        ['Find the ratio ' + M('PQ : QR') + '.', 1, M('1 : ' + (lam - 1))]
      ]);
    }
  ]);

  X('transformations', [
    function () {
      var T = { I: function (x, y) { return [x, y]; }, R90: function (x, y) { return [y, -x]; }, R180: function (x, y) { return [-x, -y]; }, R270: function (x, y) { return [-y, x]; }, Mx: function (x, y) { return [x, -y]; }, My: function (x, y) { return [-x, y]; }, Myx: function (x, y) { return [y, x]; }, Mnyx: function (x, y) { return [-y, -x]; } };
      var N = { I: 'no change', R90: 'a rotation of 90° clockwise about the origin', R180: 'a rotation of 180° about the origin', R270: 'a rotation of 90° anticlockwise about the origin', Mx: 'a reflection in the ' + M('x') + '-axis', My: 'a reflection in the ' + M('y') + '-axis', Myx: 'a reflection in the line ' + M('y = x'), Mnyx: 'a reflection in the line ' + M('y = -x') };
      var keys = ['R90', 'R180', 'R270', 'Mx', 'My', 'Myx', 'Mnyx'], a = pick(keys), b; do { b = pick(keys); } while (b === a);
      var pts = [[1, 1], [3, 1], [1, 2]], img = pts.map(function (p) { var u = T[a](p[0], p[1]); return T[b](u[0], u[1]); });
      var single = Object.keys(T).filter(function (k) { return pts.every(function (p, i) { var v = T[k](p[0], p[1]); return v[0] === img[i][0] && v[1] === img[i][1]; }); })[0];
      return Q('Triangle ' + M('P') + ' has vertices ' + M('(1, 1),\\ (3, 1),\\ (1, 2)') + '. ' + M('P') + ' is transformed by ' + N[a] + ', then the image is transformed by ' + N[b] + ', giving triangle ' + M('Q') + '.', [
        ['Find the coordinates of the vertices of ' + M('Q') + '.', 3, M(img.map(function (p) { return pt(p[0], p[1]); }).join(',\\ '))],
        ['Describe fully the single transformation that maps ' + M('P') + ' onto ' + M('Q') + '.', 2, single === 'I' ? 'No transformation (it maps the triangle onto itself)' : N[single].charAt(0).toUpperCase() + N[single].slice(1)],
        ['Does doing the two transformations in the other order give the same triangle? Show how you decide.', 1, (function () { var other = pts.map(function (p) { var u = T[b](p[0], p[1]); return T[a](u[0], u[1]); }); var same = other.every(function (p, i) { return p[0] === img[i][0] && p[1] === img[i][1]; }); return (same ? 'Yes' : 'No') + ': the other order gives ' + M(other.map(function (p) { return pt(p[0], p[1]); }).join(',\\ ')); })()]
      ]);
    },
    function () {
      var cx = ri(-2, 3), cy = ri(-2, 3), k = pick([-2, -0.5, -3]), V = [[cx + 2, cy + 2], [cx + 4, cy + 2], [cx + 2, cy + 6]];
      if (k === -0.5) V = [[cx + 2, cy + 2], [cx + 6, cy + 2], [cx + 2, cy + 6]];
      var img = V.map(function (p) { return [cx + k * (p[0] - cx), cy + k * (p[1] - cy)]; }), area = Math.abs((V[1][0] - V[0][0]) * (V[2][1] - V[0][1])) / 2;
      return Q('Triangle ' + M('T') + ' has vertices ' + M(V.map(function (p) { return pt(p[0], p[1]); }).join(',\\ ')) + '.', [
        ['Triangle ' + M('T') + ' is enlarged by scale factor ' + M(k === -0.5 ? '-\\frac{1}{2}' : String(k)) + ' with centre ' + M(pt(cx, cy)) + '. Find the vertices of the image.', 3, M(img.map(function (p) { return pt(num(p[0]), num(p[1])); }).join(',\\ '))],
        ['Find the area of the image.', 2, M(num(area) + ' \\times ' + num(k * k) + ' = ' + num(area * k * k))],
        ['Describe the single transformation that maps the image back onto ' + M('T') + '.', 1, 'Enlargement, scale factor ' + M(k === -0.5 ? '-2' : k === -2 ? '-\\frac{1}{2}' : '-\\frac{1}{3}') + ', centre ' + M(pt(cx, cy))]
      ]);
    }
  ]);

  /* ---------- Statistics and probability ---------- */
  X('averages', [
    function () {
      var x1, x2, b, a, c, r, ok = false;
      while (!ok) { a = ri(8, 15); b = ri(4, a - 2); r = ri(a - 2, a + 4); x1 = a - r; var sum = 5 * ri(Math.ceil((x1 + b + 2 * a + x1 + 1) / 5), Math.floor((x1 + 2 * b + 2 * a - 1) / 5)); x2 = sum - (x1 + b + 2 * a); c = sum / 5; ok = x1 >= 1 && x2 > x1 && x2 < b && Number.isInteger(c); }
      return Q('Five positive whole numbers have a mode of ' + a + ', a median of ' + b + ', a mean of ' + c + ' and a range of ' + r + '.', [
        ['Find the five numbers. Explain your reasoning.', 4, 'Mode ' + a + ' must appear twice above the median: ' + M('\\_,\\ \\_,\\ ' + b + ',\\ ' + a + ',\\ ' + a) + '; smallest ' + M('= ' + a + ' - ' + r + ' = ' + x1) + '; total ' + M('5 \\times ' + c + ' = ' + 5 * c) + ', so the numbers are ' + M([x1, x2, b, a, a].join(',\\ '))],
        ['A sixth number is added and the mean increases by 1. Find the sixth number and the new median.', 2, M(6 * (c + 1) - 5 * c) + '; new median ' + M(num(([x1, x2, b, a, a, 6 * (c + 1) - 5 * c].sort(function (u, v) { return u - v; })[2] + [x1, x2, b, a, a, 6 * (c + 1) - 5 * c].sort(function (u, v) { return u - v; })[3]) / 2))]
      ]);
    },
    function () {
      var n1 = ri(10, 30), m1 = ri(55, 80), m2 = m1 - ri(4, 15), Mn = 0, n2 = 0, ok = false;
      while (!ok) { n2 = ri(5, 30); var tot = n1 * m1 + n2 * m2; if (tot % (n1 + n2) === 0) { Mn = tot / (n1 + n2); ok = true; } else { m2 = m1 - ri(4, 15); } }
      return Q('Class A has ' + n1 + ' students with a mean test score of ' + m1 + '. Class B has a mean test score of ' + m2 + '. The mean score of all the students in both classes is ' + Mn + '.', [
        ['Find the number of students in class B.', 3, M(n1 + ' \\times ' + m1 + ' + ' + m2 + 'n = ' + Mn + '(' + n1 + ' + n)') + ', ' + M('n = ' + n2)],
        ['One student in class A was absent and later scored 100. Find the new mean for class A, correct to 1 decimal place.', 2, M('\\frac{' + (n1 * m1) + ' + 100}{' + (n1 + 1) + '} = ' + dp((n1 * m1 + 100) / (n1 + 1), 1))]
      ]);
    }
  ]);

  X('stats-diagrams', [
    function () {
      var b = [0, 10, 15, 20, 30, 50], fd, f, N;
      do { fd = [ri(2, 8) / 2, ri(4, 12) / 2, ri(6, 16) / 2, ri(2, 10) / 2, ri(1, 4) / 2]; f = fd.map(function (d, i) { return d * (b[i + 1] - b[i]); }); } while (f.some(function (v) { return !Number.isInteger(v); }));
      N = f.reduce(function (s, v) { return s + v; }, 0);
      var lo = 12, hi = 25, est = f[1] * (15 - lo) / 5 + f[2] + f[3] * (hi - 20) / 10;
      var cum = 0, med = 0, half = N / 2; for (var i = 0; i < f.length; i++) { if (cum + f[i] >= half) { med = b[i] + (half - cum) / f[i] * (b[i + 1] - b[i]); break; } cum += f[i]; }
      return Q('The histogram shows the times, in minutes, that some people took to complete a puzzle. ' + f[2] + ' people took between 15 and 20 minutes.' + D.histogram(b, fd, 'Time (minutes)', 'Frequency density', 1, 10), [
        ['Find the total number of people.', 2, String(N)],
        ['Estimate the number of people who took between ' + lo + ' and ' + hi + ' minutes.', 2, M(num(f[1] * (15 - lo) / 5) + ' + ' + f[2] + ' + ' + num(f[3] * (hi - 20) / 10) + ' = ' + num(est))],
        ['Estimate the median time.', 2, M(num(dp(med, 1) * 1)) + ' minutes (by linear interpolation)']
      ]);
    },
    function () {
      var mids = [5, 15, 25, 35], f = [ri(3, 10), 0, ri(5, 15), ri(2, 8)], x = ri(4, 14), S, T, Mn;
      f[1] = x; S = f.reduce(function (s, v) { return s + v; }, 0); T = f.reduce(function (s, v, i) { return s + v * mids[i]; }, 0);
      Mn = T / S;
      var Mstr = Number.isInteger(Mn * 10) ? num(Mn) : null;
      if (!Mstr) { // adjust last frequency to make the mean a 1 dp number
        for (var k = 1; k <= 20; k++) { f[3] = k; S = f.reduce(function (s, v) { return s + v; }, 0); T = f.reduce(function (s, v, i) { return s + v * mids[i]; }, 0); if (Number.isInteger(T * 10 / S)) { Mn = T / S; Mstr = num(Mn); break; } }
      }
      if (!Mstr) { f = [4, 10, 4, 2]; x = 10; S = 20; T = 340; Mn = 17; Mstr = '17'; }
      return Q('The table shows the times, in minutes, taken by some students to travel to school. One frequency is unknown.' + BS.ib.table(['Time ' + M('t') + ' (minutes)', 'Frequency'], [['0 < t ≤ 10', String(f[0])], ['10 < t ≤ 20', M('x')], ['20 < t ≤ 30', String(f[2])], ['30 < t ≤ 40', String(f[3])]]), [
        ['An estimate of the mean time is ' + Mstr + ' minutes. Find the value of ' + M('x') + '.', 4, M('\\frac{' + (f[0] * 5) + ' + 15x + ' + (f[2] * 25) + ' + ' + (f[3] * 35) + '}{' + (f[0] + f[2] + f[3]) + ' + x} = ' + Mstr) + ', ' + M('x = ' + f[1])],
        ['Explain why your answer to the mean is only an estimate.', 1, 'The midpoints of the classes are used instead of the actual times.']
      ]);
    }
  ]);

  X('probability', [
    function () {
      var L = [[3, 6], [6, 10], [6, 3], [10, 15], [10, 6], [15, 21], [15, 10]], rn = pick(L), r = rn[0], n = rn[1];
      return Q('A bag contains ' + r + ' red counters and ' + M('n') + ' blue counters. Two counters are taken at random without replacement. The probability that both counters are the same colour is ' + M('\\frac{1}{2}') + '.', [
        ['Show that ' + M('n^2 - ' + (2 * r + 1) + 'n + ' + (r * r - r) + ' = 0') + '.', 4, M('\\frac{' + r + '}{' + r + ' + n} \\times \\frac{' + (r - 1) + '}{' + (r - 1) + ' + n} + \\frac{n}{' + r + ' + n} \\times \\frac{n - 1}{' + (r - 1) + ' + n} = \\frac{1}{2}') + '; multiply out and simplify.'],
        ['Find the possible values of ' + M('n') + '.', 2, (function () { var o = 2 * r + 1 - n; return M('n = ' + Math.min(n, o) + '\\text{ or } n = ' + Math.max(n, o)); })()]
      ]);
    },
    function () {
      var p = pick([0.2, 0.3, 0.4, 0.35, 0.25]), a = pick([0.4, 0.5, 0.6, 0.7]), b = pick([0.1, 0.15, 0.2]), pl = p * a + (1 - p) * b;
      return Q('The probability that it rains on a school day is ' + p + '. If it rains, the probability that Sam is late is ' + a + '. If it does not rain, the probability that Sam is late is ' + b + '.', [
        ['Find the probability that Sam is late on a randomly chosen school day.', 2, M(p + ' \\times ' + a + ' + ' + num(dp(1 - p, 2) * 1) + ' \\times ' + b + ' = ' + num(Math.round(pl * 10000) / 10000))],
        ['Given that Sam is late, find the probability that it rained. Give your answer to 3 significant figures.', 3, M('\\frac{' + num(Math.round(p * a * 10000) / 10000) + '}{' + num(Math.round(pl * 10000) / 10000) + '} = ' + sf3(p * a / pl))],
        ['Find the probability that Sam is late on at least one of two school days.', 2, M('1 - (1 - ' + num(Math.round(pl * 10000) / 10000) + ')^2 = ' + sf3(1 - (1 - pl) * (1 - pl)))]
      ]);
    }
  ]);

  X('sets', [
    function () {
      var x = ri(2, 9), A = ri(3, 10), Bv = ri(3, 10), C = ri(3, 10), ab = ri(1, 6), bc = ri(1, 6), ac = ri(1, 6), none = ri(2, 12);
      // regions: A only = A, B only = Bv, C only = C, AB only = ab, BC only = bc, AC only = ac, ABC = x, none
      var tot = A + Bv + C + ab + bc + ac + x + none;
      var nA = A + ab + ac + x, nB = Bv + ab + bc + x;
      return Q('Each of the ' + tot + ' members of a club was asked whether they play tennis (' + M('T') + '), golf (' + M('G') + ') and squash (' + M('S') + '). ' + (A) + ' play only tennis, ' + Bv + ' only golf and ' + C + ' only squash. ' + ab + ' play tennis and golf but not squash, ' + bc + ' play golf and squash but not tennis, and ' + ac + ' play tennis and squash but not golf. ' + none + ' play none of the three. ' + M('x') + ' members play all three.', [
        ['Find the value of ' + M('x') + '.', 2, M(tot + ' - ' + (tot - x) + ' = ' + x)],
        ['A member who plays tennis is chosen at random. Find the probability that this member also plays golf.', 2, M('\\frac{' + (ab + x) + '}{' + nA + '}' + (gcd(ab + x, nA) > 1 ? ' = ' + F(ab + x, nA) : ''))],
        ['Find ' + M("n(T' \\cap (G \\cup S))") + '.', 2, M(String(Bv + C + bc))]
      ]);
    },
    function () {
      var p = pick([3, 4, 5, 6]), N = pick([24, 30, 36, 40]), E = []; for (var i = 1; i <= 30; i++) E.push(i);
      var A = E.filter(function (v) { return v % p === 0; }), B = E.filter(function (v) { return N % v === 0; }), isP = function (v) { if (v < 2) return false; for (var k = 2; k * k <= v; k++) if (v % k === 0) return false; return true; };
      var AnB = A.filter(function (v) { return B.indexOf(v) > -1; }), AuB = E.filter(function (v) { return A.indexOf(v) > -1 || B.indexOf(v) > -1; }), BnPc = B.filter(function (v) { return !isP(v); });
      return Q(M('\\mathscr{E} = \\{1, 2, 3, \\ldots, 30\\}') + ', ' + M('A = \\{\\text{multiples of } ' + p + '\\}') + ', ' + M('B = \\{\\text{factors of } ' + N + '\\}') + ' and ' + M('C = \\{\\text{prime numbers}\\}') + '.', [
        ['List the members of ' + M('A \\cap B') + '.', 1, M('\\{' + AnB.join(', ') + '\\}')],
        ['Find ' + M('n(A \\cup B)') + '.', 2, String(AuB.length)],
        ['List the members of ' + M("B \\cap C'") + '.', 2, M('\\{' + BnPc.join(', ') + '\\}')],
        ['A number is chosen at random from ' + M('B') + '. Find the probability that it is in ' + M('A') + '.', 1, M(F(AnB.length, B.length))]
      ]);
    }
  ]);

  /* ---------- Higher algebra ---------- */
  X('surds', [
    function () {
      var q = pick([2, 3, 5, 6, 7]), p = ri(1, 6), r = ri(2, 6); while (r * r === q) r++;
      var den = r * r - q, mN = p * r - q, nN = r - p;
      return Q('', [
        ['Express ' + M('\\frac{' + p + ' + \\sqrt{' + q + '}}{' + r + ' + \\sqrt{' + q + '}}') + ' in the form ' + M('m + n\\sqrt{' + q + '}') + ', where ' + M('m') + ' and ' + M('n') + ' are rational.', 4, M('\\frac{(' + p + ' + \\sqrt{' + q + '})(' + r + ' - \\sqrt{' + q + '})}{' + den + '} = ' + F(mN, den) + (nN === 0 ? '' : (nN * den > 0 ? ' + ' : ' - ') + F(Math.abs(nN), Math.abs(den)) + '\\sqrt{' + q + '}'))],
        ['A right-angled triangle has shorter sides ' + M('(' + r + ' + \\sqrt{' + q + '})') + ' cm and ' + M('(' + r + ' - \\sqrt{' + q + '})') + ' cm. Find the exact length of the hypotenuse and the exact area.', 3, 'Hypotenuse ' + M('\\sqrt{2(' + (r * r) + ' + ' + q + ')} = ' + BS.gcse2.surd(2 * (r * r + q))) + ' cm; area ' + M('\\tfrac{1}{2}(' + (r * r) + ' - ' + q + ') = ' + F(den, 2)) + ' cm²']
      ]);
    },
    function () {
      var c = pick([2, 3, 5, 6, 7]), m = ri(1, 5), n = ri(1, 4), a = m * m + n * n * c, b = 2 * m * n;
      return Q('', [
        ['Given that ' + M('\\sqrt{' + a + ' + ' + b + '\\sqrt{' + c + '}} = p + q\\sqrt{' + c + '}') + ', where ' + M('p') + ' and ' + M('q') + ' are positive integers, find ' + M('p') + ' and ' + M('q') + '.', 4, 'Square: ' + M('p^2 + ' + c + 'q^2 = ' + a + ',\\ 2pq = ' + b) + ', so ' + M('p = ' + m + ',\\ q = ' + n)],
        ['Hence simplify ' + M('\\frac{1}{\\sqrt{' + a + ' + ' + b + '\\sqrt{' + c + '}}}') + ', rationalising the denominator.', 2, (function () { var dn = m * m - n * n * c, ns = (n === 1 ? '' : n) + '\\sqrt{' + c + '}'; return M('\\frac{1}{' + m + ' + ' + ns + '} = ' + (dn > 0 ? '\\frac{' + m + ' - ' + ns + '}{' + dn + '}' : '\\frac{' + ns + ' - ' + m + '}{' + (-dn) + '}')); })()]
      ]);
    }
  ]);

  X('bounds', [
    function () {
      var a = ri(50, 99) / 10, b = ri(110, 300) / 100; while (b >= a - 0.5) b = ri(110, 300) / 100;
      var aU = a + 0.05, aL = a - 0.05, bU = b + 0.005, bL = b - 0.005, U = (aU - bL) / bL, L = (aL - bU) / bU, k = 0;
      for (var s = 6; s >= 1; s--) { if (Number(U.toPrecision(s)) === Number(L.toPrecision(s))) { k = s; break; } }
      return Q(M('a = ' + a.toFixed(1)) + ' correct to 1 decimal place and ' + M('b = ' + b.toFixed(2)) + ' correct to 2 decimal places.', [
        ['Find the upper bound of ' + M('\\frac{a - b}{b}') + '. Show your working clearly.', 3, M('\\frac{' + aU.toFixed(2) + ' - ' + bL.toFixed(3) + '}{' + bL.toFixed(3) + '} = ' + U.toFixed(5))],
        ['Find the lower bound of ' + M('\\frac{a - b}{b}') + ' and hence write down the value of ' + M('\\frac{a - b}{b}') + ' to a suitable degree of accuracy. Give a reason.', 3, 'Lower bound ' + M(L.toFixed(5)) + '. ' + (k ? 'Both round to ' + M(Number(U.toPrecision(k)).toString()) + ' to ' + k + ' significant figure' + (k > 1 ? 's' : '') + '.' : 'The bounds do not agree even to 1 significant figure.')]
      ]);
    },
    function () {
      var d = ri(80, 200), t = ri(80, 140) / 10, U = (d + 0.5) / (t - 0.05), L = (d - 0.5) / (t + 0.05), lim = Math.floor(L);
      return Q('A runner covers ' + d + ' m, correct to the nearest metre, in ' + t.toFixed(1) + ' seconds, correct to the nearest tenth of a second.', [
        ['Find the upper bound of the runner’s average speed in m/s.', 2, M('\\frac{' + (d + 0.5) + '}{' + (t - 0.05).toFixed(2) + '} = ' + U.toFixed(4)) + ' m/s'],
        ['A coach says the runner’s average speed was definitely more than ' + lim + ' m/s. Is the coach correct? Show how you decide.', 2, 'Lower bound ' + M('\\frac{' + (d - 0.5) + '}{' + (t + 0.05).toFixed(2) + '} = ' + L.toFixed(4)) + ' > ' + lim + ', so yes'],
        ['Find the upper bound of the speed in km/h.', 1, M(U.toFixed(4) + ' \\times 3.6 = ' + (U * 3.6).toFixed(3)) + ' km/h']
      ]);
    }
  ]);

  X('simultaneous', [
    function () {
      var C = pick([[25, [[3, 4], [4, 3], [5, 0], [0, 5]]], [50, [[1, 7], [7, 1], [5, 5]]], [65, [[1, 8], [8, 1], [4, 7], [7, 4]]], [85, [[2, 9], [9, 2], [6, 7], [7, 6]]]]);
      var r2 = C[0], base = C[1], P1, P2, sgn = function (p) { return [p[0] * pick([1, -1]), p[1] * pick([1, -1])]; };
      do { P1 = sgn(pick(base)); P2 = sgn(pick(base)); } while (P1[0] === P2[0] || P1[1] === P2[1]);
      var A = P2[1] - P1[1], B = P1[0] - P2[0], Cc = A * P1[0] + B * P1[1], gg = gcd(gcd(Math.abs(A), Math.abs(B)), Math.abs(Cc)) || 1; A /= gg; B /= gg; Cc /= gg;
      if (B < 0) { A = -A; B = -B; Cc = -Cc; }
      var L2 = Math.pow(P1[0] - P2[0], 2) + Math.pow(P1[1] - P2[1], 2);
      return Q('', [
        ['Solve the simultaneous equations ' + M('x^2 + y^2 = ' + r2) + ' and ' + M(c1(A, 'x') + tc(B, 'y') + ' = ' + Cc) + '.', 5, 'Substitute and solve the quadratic: ' + M(pt(P1[0], P1[1]) + '\\text{ and }' + pt(P2[0], P2[1]))],
        ['The line meets the circle at ' + M('P') + ' and ' + M('Q') + '. Find the exact length of ' + M('PQ') + '.', 2, M(BS.gcse2.surd(L2))]
      ]);
    },
    function () {
      var T = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]), k = ri(1, 4), l = T[1] * k, w = T[0] * k, d = T[2] * k;
      return Q('A rectangle has perimeter ' + 2 * (l + w) + ' cm and its diagonal is ' + d + ' cm long.', [
        ['Form two equations and solve them to find the length and width of the rectangle.', 5, M('l + w = ' + (l + w) + ',\\ l^2 + w^2 = ' + d * d) + ' gives ' + M('w^2 - ' + (l + w) + 'w + ' + (l * w) + ' = 0') + ', so the sides are ' + l + ' cm and ' + w + ' cm'],
        ['Find the area of the rectangle without finding the sides, using ' + M('(l + w)^2') + '.', 2, M('2lw = (l + w)^2 - (l^2 + w^2) = ' + ((l + w) * (l + w) - d * d)) + ', area ' + (l * w) + ' cm²']
      ]);
    }
  ]);

  X('quadratics', [
    function () {
      var k1, k2, a, b, B, C, disc;
      do { k1 = ri(1, 4); k2 = ri(1, 4); a = ri(1, 5); b = -ri(1, 5); B = a + b - k1 - k2; C = a * b - k1 * b - k2 * a; disc = B * B - 4 * C; } while (disc <= 0 || Math.sqrt(disc) === Math.round(Math.sqrt(disc)));
      var r1 = (-B + Math.sqrt(disc)) / 2, r2 = (-B - Math.sqrt(disc)) / 2;
      return Q('', [
        ['Show that the equation ' + M('\\frac{' + k1 + '}{x' + sg(a) + '} + \\frac{' + k2 + '}{x' + sg(b) + '} = 1') + ' can be written as ' + M(poly([1, B, C]) + ' = 0') + '.', 3, 'Multiply by ' + M('(x' + sg(a) + ')(x' + sg(b) + ')') + ': ' + M((k1 === 1 ? '' : k1) + '(x' + sg(b) + ') + ' + (k2 === 1 ? '' : k2) + '(x' + sg(a) + ') = (x' + sg(a) + ')(x' + sg(b) + ')') + ', and rearrange.'],
        ['Hence solve the equation, giving your answers correct to 3 significant figures.', 3, M('x = ' + sf3(r1) + '\\text{ or } x = ' + sf3(r2))]
      ]);
    },
    function () {
      var x = ri(3, 12), w = pick([1, 2]), A = (x + 2 * w) * (x + 3 + 2 * w);
      return Q('A rectangular garden is ' + M('x') + ' m wide and ' + M('(x + 3)') + ' m long. A path ' + w + ' m wide is laid all the way round the outside of the garden. The total area of the garden and path is ' + A + ' m².', [
        ['Show that ' + M(poly([1, 3 + 4 * w, 4 * w * w + 6 * w - A]) + ' = 0') + '.', 3, M('(x + ' + 2 * w + ')(x + ' + (3 + 2 * w) + ') = ' + A) + ', expand and rearrange.'],
        ['Find the area of the path.', 3, M('x = ' + x) + ' (reject the negative root), so path area ' + M('= ' + A + ' - ' + x + ' \\times ' + (x + 3) + ' = ' + (A - x * (x + 3))) + ' m²']
      ]);
    }
  ]);

  X('rearranging', [
    function () {
      var a, b, c, d; do { a = ri(2, 5); b = nz(-6, 6); c = ri(2, 4); d = ri(1, 6); } while (a * d + b * c === 0);
      return Q('', [
        ['Make ' + M('x') + ' the subject of ' + M('y = \\frac{' + c1(a, 'x') + sg(b) + '}{' + c1(c, 'x') + ' - ' + d + '}') + '.', 4, M(c1(c, 'xy') + ' - ' + d + 'y = ' + c1(a, 'x') + sg(b)) + ', so ' + M('x = \\frac{' + d + 'y' + sg(b) + '}{' + c1(c, 'y') + ' - ' + a + '}')],
        ['Find the value of ' + M('y') + ' for which there is no value of ' + M('x') + '.', 1, M('y = ' + F(a, c))]
      ]);
    },
    function () {
      var a = ri(1, 9), b = ri(1, 9);
      return Q('', [
        ['Make ' + M('x') + ' the subject of ' + M('y = \\sqrt{\\frac{x + ' + a + '}{x - ' + b + '}}') + '.', 5, M('y^2(x - ' + b + ') = x + ' + a) + ', so ' + M('x = \\frac{' + b + 'y^2 + ' + a + '}{y^2 - 1}')],
        ['Explain why ' + M('y') + ' cannot equal 1.', 1, 'The denominator ' + M('y^2 - 1') + ' would be zero (the equation would become ' + M('-' + b + ' = ' + a) + ').']
      ]);
    }
  ]);

  X('functions', [
    function () {
      var p = pick([2, 3, 4, 5, -2, -3]), q = nz(-9, 9), x0 = fr(q, 1 - p);
      return Q(M('\\mathrm{f}(x) = ' + poly([p, q])) + '.', [
        ['Find ' + M('\\mathrm{f}^{-1}(x)') + '.', 2, M('\\mathrm{f}^{-1}(x) = \\frac{x' + sg(-q) + '}{' + p + '}')],
        ['Solve ' + M('\\mathrm{f}(x) = \\mathrm{f}^{-1}(x)') + '.', 3, M(p + '(' + poly([p, q]) + ') = x' + sg(-q)) + ', ' + M('x = ' + fs(x0))],
        ['Find ' + M('\\mathrm{ff}(x)') + ' and solve ' + M('\\mathrm{ff}(x) = x') + '.', 2, M('\\mathrm{ff}(x) = ' + poly([p * p, p * q + q])) + ', ' + M('x = ' + fs(fr(p * q + q, 1 - p * p)))]
      ]);
    },
    function () {
      var a = ri(2, 5), b = ri(1, 6), k = ri(2, 9);
      // f(x) = a x + b, g(x) = x^2 - k ; fg(x) = a x^2 - a k + b ; gf(x) = (a x + b)^2 - k
      // fg(x) = gf(x): a x^2 - a k + b = a^2 x^2 + 2 a b x + b^2 - k  -> (a^2 - a) x^2 + 2ab x + b^2 - k + a k - b = 0
      var A = a * a - a, B = 2 * a * b, C = b * b - k + a * k - b, disc = B * B - 4 * A * C;
      return Q(M('\\mathrm{f}(x) = ' + poly([a, b])) + ' and ' + M('\\mathrm{g}(x) = x^2 - ' + k) + '.', [
        ['Show that ' + M('\\mathrm{fg}(x) = \\mathrm{gf}(x)') + ' leads to ' + M(poly([A, B, C]) + ' = 0') + '.', 3, M(a + '(x^2 - ' + k + ')' + sg(b) + ' = (' + poly([a, b]) + ')^2 - ' + k) + ', expand and collect terms.'],
        ['Hence determine whether there are any values of ' + M('x') + ' for which ' + M('\\mathrm{fg}(x) = \\mathrm{gf}(x)') + '. Give the values correct to 3 significant figures if they exist.', 3, disc < 0 ? 'Discriminant ' + M(disc + ' < 0') + ', so there are no real solutions' : M('x = ' + sf3((-B + Math.sqrt(disc)) / (2 * A)) + '\\text{ or } ' + sf3((-B - Math.sqrt(disc)) / (2 * A)))]
      ]);
    }
  ]);

  X('graphs', [
    function () {
      var m = pick([1, 2, 3]), c = pick([-1, 1, 2, -2]), f = function (x) { return x * x * x - 3 * x; };
      // x^3 - 3x = m x + c  <=> x^3 - (3+m) x - c = 0
      var roots = []; for (var x = -3.5; x < 3.5; x += 0.001) { var u = f(x) - m * x - c, v = f(x + 0.001) - m * (x + 0.001) - c; if (u * v < 0) roots.push(x + 0.0005); }
      var p = D.plane({ xmin: -3, xmax: 3, ymin: -8, ymax: 8, w: 300, h: 300, grid: true, ticks: true, tstep: 1, tstepy: 2 });
      var s = p.svg + p.curve(f, -2.9, 2.9);
      return Q('The diagram shows the graph of ' + M('y = x^3 - 3x') + ' for ' + M('-3 \\le x \\le 3') + '.' + D.svg(300, 300, s, 'Cubic graph'), [
        ['By drawing a suitable straight line on the grid, find estimates for the solutions of ' + M('x^3 - ' + (3 + m) + 'x' + sg(-c) + ' = 0') + '.', 4, 'Draw ' + M('y = ' + poly([m, c])) + '; ' + M('x \\approx ' + roots.map(function (r) { return dp(r, 1); }).join(',\\ '))],
        ['For what values of ' + M('k') + ' does the equation ' + M('x^3 - 3x = k') + ' have exactly three solutions?', 2, M('-2 < k < 2') + ' (between the turning points ' + M('(1, -2)') + ' and ' + M('(-1, 2)') + ')']
      ]);
    },
    function () {
      var a = nz(-4, 4), b = nz(-5, 5), h = nz(-3, 3), k = nz(-4, 4);
      return Q('The curve ' + M('y = \\mathrm{f}(x)') + ' has a maximum point at ' + M(pt(a, b)) + '.', [
        ['Write down the coordinates of the turning point of ' + M('y = \\mathrm{f}(x' + sg(-h) + ')' + sg(k)) + '.', 2, M(pt(a + h, b + k))],
        ['Write down the coordinates of the turning point of ' + M('y = -\\mathrm{f}(x)' + sg(k)) + ' and state whether it is a maximum or a minimum.', 2, M(pt(a, -b + k)) + ', a minimum'],
        ['Write down the coordinates of the turning point of ' + M('y = \\mathrm{f}(-x)') + '.', 1, M(pt(-a, b))]
      ]);
    }
  ]);

  X('differentiation', [
    function () {
      var L = 6 * ri(2, 8), x = L / 6, V = x * (L - 2 * x) * (L - 2 * x);
      return Q('A square sheet of card has side ' + L + ' cm. A square of side ' + M('x') + ' cm is cut from each corner and the sides are folded up to make an open box.', [
        ['Show that the volume of the box is ' + M('V = ' + (4) + 'x^3 - ' + (4 * L) + 'x^2 + ' + (L * L) + 'x') + '.', 2, M('V = x(' + L + ' - 2x)^2') + ', expand.'],
        ['Find the value of ' + M('x') + ' that gives the maximum volume, and find the maximum volume. Show that it is a maximum.', 5, M('\\frac{\\mathrm{d}V}{\\mathrm{d}x} = 12x^2 - ' + (8 * L) + 'x + ' + (L * L) + ' = 0') + ' gives ' + M('x = ' + x) + ' (or ' + M('x = ' + (L / 2)) + ', which gives no box); ' + M('V = ' + num(V)) + ' cm³; ' + M('\\frac{\\mathrm{d}^2V}{\\mathrm{d}x^2} = 24x - ' + (8 * L) + ' < 0') + ' at ' + M('x = ' + x) + ', so a maximum']
      ]);
    },
    function () {
      var a = pick([1, 2, -1]), b = nz(-4, 4), c = ri(1, 8), p = nz(-3, 3), y0 = a * p * p + b * p + c, m = 2 * a * p + b;
      while (m === 0) { p += 1; y0 = a * p * p + b * p + c; m = 2 * a * p + b; }
      var cc = y0 - m * p, xi = fr(-cc, m), area = fr(Math.abs(cc * cc), 2 * Math.abs(m));
      return Q('The curve ' + M('C') + ' has equation ' + M('y = ' + poly([a, b, c])) + '. The point ' + M('P') + ' on ' + M('C') + ' has ' + M('x') + '-coordinate ' + p + '.', [
        ['Find the equation of the tangent to ' + M('C') + ' at ' + M('P') + '.', 4, M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + poly([2 * a, b])) + ', gradient ' + m + ' at ' + M(pt(p, y0)) + ': ' + M('y = ' + poly([m, cc]))],
        ['The tangent meets the axes at ' + M('A') + ' and ' + M('B') + '. Find the area of triangle ' + M('OAB') + '.', 3, cc === 0 ? 'The tangent passes through the origin, so there is no triangle' : M('A' + pt(fs(xi), 0) + ',\\ B' + pt(0, cc)) + ', area ' + M('= ' + fs(area))]
      ]);
    }
  ]);

  X('sine-cosine', [
    function () {
      var AB = ri(6, 14), BC = ri(5, 12), B = ri(70, 120), AC = Math.sqrt(AB * AB + BC * BC - 2 * AB * BC * Math.cos(B * Math.PI / 180));
      var cad = ri(30, 55), adc = ri(55, 90), acd = 180 - cad - adc, AD = AC * Math.sin(acd * Math.PI / 180) / Math.sin(adc * Math.PI / 180);
      var area = 0.5 * AB * BC * Math.sin(B * Math.PI / 180) + 0.5 * AC * AD * Math.sin(cad * Math.PI / 180);
      var rb = B * Math.PI / 180, Pp = { B: [0, 0], C: [BC, 0], A: [AB * Math.cos(rb), AB * Math.sin(rb)] };
      var ux = (Pp.C[0] - Pp.A[0]) / AC, uy = (Pp.C[1] - Pp.A[1]) / AC, th = -cad * Math.PI / 180; // turn away from B
      var cr = (Pp.C[0] - Pp.A[0]) * (Pp.B[1] - Pp.A[1]) - (Pp.C[1] - Pp.A[1]) * (Pp.B[0] - Pp.A[0]); if (cr < 0) th = -th;
      Pp.D = [Pp.A[0] + AD * (ux * Math.cos(th) - uy * Math.sin(th)), Pp.A[1] + AD * (ux * Math.sin(th) + uy * Math.cos(th))];
      var dg = D.geo({ pts: Pp, segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C', 'dash']], angles: [{ v: 'B', a: 'A', b: 'C', t: B + '°' }, { v: 'A', a: 'C', b: 'D', t: cad + '°' }, { v: 'D', a: 'A', b: 'C', t: adc + '°' }], slabels: [{ p: 'A', q: 'B', t: AB + ' cm' }, { p: 'B', q: 'C', t: BC + ' cm' }], w: 320, h: 260, label: 'Quadrilateral ABCD' });
      return Q('In quadrilateral ' + M('ABCD') + ', ' + M('AB = ' + AB) + ' cm, ' + M('BC = ' + BC) + ' cm, angle ' + M('ABC = ' + B) + '°, angle ' + M('CAD = ' + cad) + '° and angle ' + M('ADC = ' + adc) + '°.' + dg, [
        ['Find the length of ' + M('AC') + '.', 3, M('AC^2 = ' + AB + '^2 + ' + BC + '^2 - 2(' + AB + ')(' + BC + ')\\cos ' + B + '^\\circ') + ', ' + M('AC = ' + sf3(AC)) + ' cm'],
        ['Find the length of ' + M('AD') + '.', 3, 'Angle ' + M('ACD = ' + acd) + '°; ' + M('AD = \\frac{' + sf3(AC) + '\\sin ' + acd + '^\\circ}{\\sin ' + adc + '^\\circ} = ' + sf3(AD)) + ' cm'],
        ['Find the area of the quadrilateral.', 3, M(sf3(area)) + ' cm²']
      ]);
    },
    function () {
      var A = ri(25, 45), b = ri(8, 15), a = b * Math.sin(A * Math.PI / 180) + ri(1, 3) + ri(0, 9) / 10; a = Math.round(a * 10) / 10;
      if (a >= b) a = Math.round((b - 0.6) * 10) / 10;
      var sB = b * Math.sin(A * Math.PI / 180) / a, B1 = Math.asin(sB) * 180 / Math.PI, B2 = 180 - B1;
      var C1 = 180 - A - B1, C2 = 180 - A - B2, ar = function (C) { return 0.5 * a * b * Math.sin(C * Math.PI / 180); };
      return Q('In triangle ' + M('ABC') + ', ' + M('BC = ' + a) + ' cm, ' + M('AC = ' + b) + ' cm and angle ' + M('BAC = ' + A) + '°.', [
        ['Show that there are two possible triangles, and find the two possible sizes of angle ' + M('ABC') + '.', 4, M('\\sin B = \\frac{' + b + '\\sin ' + A + '^\\circ}{' + a + '} = ' + dp(sB, 4)) + ', so ' + M('B = ' + dp(B1, 1) + '^\\circ') + ' or ' + M(dp(B2, 1) + '^\\circ') + ' (both leave a positive angle ' + M('C') + ')'],
        ['Find the difference between the areas of the two possible triangles.', 3, M(sf3(Math.abs(ar(C1) - ar(C2)))) + ' cm²']
      ]);
    }
  ]);

  X('circle-theorems', [
    function () {
      var x = ri(12, 25), p = ri(2, 4), a = ri(5, 20), ACD = (p + 1) * x - a;
      while (ACD <= 25 || ACD >= 70) { x = ri(12, 25); a = ri(5, 20); ACD = (p + 1) * x - a; }
      var ABD = ACD, k = ABD - p * x; // label ABD = p x + k
      var C = D.onCircle;
      var P = { A: C(200), C: C(20), B: C(130), D: C(-40), O: [0, 0] };
      var dg = D.geo({ pts: P, circle: [0, 0, 1], segs: [['A', 'C'], ['A', 'B'], ['B', 'D'], ['A', 'D'], ['C', 'D']], dots: ['O'], angles: [{ v: 'B', a: 'A', b: 'D', t: '(' + p + 'x' + (k ? sg(k) : '') + ')°' }, { v: 'C', a: 'A', b: 'D', t: '(' + (p + 1) + 'x − ' + a + ')°' }], w: 300, h: 300 });
      return Q(M('A, B, C') + ' and ' + M('D') + ' are points on a circle with centre ' + M('O') + '. ' + M('AC') + ' is a diameter. Angle ' + M('ABD = (' + p + 'x' + (k ? sg(k) : '') + ')°') + ' and angle ' + M('ACD = (' + (p + 1) + 'x - ' + a + ')°') + '.' + dg, [
        ['Find the value of ' + M('x') + '. Give a reason for each step.', 3, 'Angles in the same segment are equal: ' + M(p + 'x' + (k ? sg(k) : '') + ' = ' + (p + 1) + 'x - ' + a) + ', so ' + M('x = ' + x)],
        ['Find the size of angle ' + M('CAD') + '. Give reasons.', 3, 'Angle ' + M('ADC = 90') + '° (angle in a semicircle), so angle ' + M('CAD = 180 - 90 - ' + ACD + ' = ' + (90 - ACD)) + '°']
      ]);
    },
    function () {
      var t = 2 * ri(15, 40);
      var C = D.onCircle, a0 = 90 - (180 - t) / 2, P = { A: C(-90 + (90 - t / 2) + 90 - 90), O: [0, 0] };
      // tangents from T at angles: points A and B at angles ±(90 - t/2) around the direction of T (to the right)
      var half = 90 - t / 2; P.A = C(half); P.B = C(-half); var dist = 1 / Math.cos(half * Math.PI / 180); P.T = [dist, 0]; P.C = C(180);
      var dg = D.geo({ pts: P, circle: [0, 0, 1], segs: [['T', 'A'], ['T', 'B'], ['A', 'C'], ['B', 'C'], ['O', 'A', 'dash'], ['O', 'B', 'dash']], dots: ['O'], angles: [{ v: 'T', a: 'A', b: 'B', t: t + '°' }], w: 320, h: 260 });
      return Q(M('TA') + ' and ' + M('TB') + ' are tangents to a circle with centre ' + M('O') + '. ' + M('C') + ' is a point on the major arc ' + M('AB') + '. Angle ' + M('ATB = ' + t) + '°.' + dg, [
        ['Prove that angle ' + M('ACB = 90° - \\tfrac{1}{2}') + ' angle ' + M('ATB') + '.', 4, 'Angles ' + M('OAT') + ' and ' + M('OBT') + ' are 90° (tangent ⟂ radius), so angle ' + M('AOB = 180° - ATB') + ' (angles in quadrilateral ' + M('OATB') + '). Angle at the circumference is half the angle at the centre: ' + M('ACB = 90° - \\tfrac{1}{2}ATB') + '.'],
        ['Find angle ' + M('ACB') + ' and angle ' + M('TAB') + '.', 2, M('ACB = ' + (90 - t / 2)) + '°; ' + M('TAB = ' + (90 - t / 2)) + '° (alternate segment theorem, or base angles of isosceles triangle ' + M('TAB') + ')']
      ]);
    }
  ]);

  X('intersecting-chords', [
    function () {
      var x = ri(2, 9), a = ri(1, 6), bc = x * (x + a), facs = []; for (var f = 2; f < bc; f++) if (bc % f === 0 && f !== x && f !== x + a && f * f !== bc) facs.push(f);
      var b = facs.length ? pick(facs) : 1, c = bc / b;
      var Cc = D.onCircle, P = { A: Cc(160), B: Cc(-20), C: Cc(80), D: Cc(250) };
      var ix = (function () { var p = P.A, r = P.B, q = P.C, s = P.D, d = (p[0] - r[0]) * (q[1] - s[1]) - (p[1] - r[1]) * (q[0] - s[0]), t = ((p[0] - q[0]) * (q[1] - s[1]) - (p[1] - q[1]) * (q[0] - s[0])) / d; return [p[0] + t * (r[0] - p[0]), p[1] + t * (r[1] - p[1])]; })();
      P.X = ix;
      var dg = D.geo({ pts: P, circle: [0, 0, 1], segs: [['A', 'B'], ['C', 'D']], slabels: [{ p: 'A', q: 'X', t: 'x' }, { p: 'X', q: 'B', t: 'x + ' + a }, { p: 'C', q: 'X', t: String(b) }, { p: 'X', q: 'D', t: String(c) }], w: 300, h: 280 });
      return Q('The chords ' + M('AB') + ' and ' + M('CD') + ' of a circle meet at ' + M('X') + '. ' + M('AX = x') + ' cm, ' + M('XB = (x + ' + a + ')') + ' cm, ' + M('CX = ' + b) + ' cm and ' + M('XD = ' + c) + ' cm.' + dg, [
        ['Find the value of ' + M('x') + '.', 4, M('x(x + ' + a + ') = ' + b + ' \\times ' + c) + ', ' + M('x^2' + tc(a, 'x') + ' - ' + bc + ' = 0') + ', ' + M('x = ' + x)],
        ['Find the length of chord ' + M('AB') + '.', 1, (2 * x + a) + ' cm']
      ]);
    },
    function () {
      var L = pick([[4, 5, 6], [9, 7, 12], [1, 3, 2], [3, 9, 6], [2, 6, 4], [5, 15, 10], [8, 10, 12], [9, 16, 15]]), x = L[0], d = L[1], t = L[2];
      return Q('From a point ' + M('T') + ' outside a circle, a tangent touches the circle at ' + M('A') + ' and a line through ' + M('T') + ' meets the circle at ' + M('B') + ' and ' + M('C') + ', with ' + M('B') + ' between ' + M('T') + ' and ' + M('C') + '. ' + M('TA = ' + t) + ' cm and ' + M('BC = ' + d) + ' cm.', [
        ['Find the length of ' + M('TB') + '.', 4, M('TA^2 = TB \\times TC') + ': ' + M(t + '^2 = y(y + ' + d + ')') + ', ' + M('y^2 + ' + d + 'y - ' + t * t + ' = 0') + ', ' + M('TB = ' + x) + ' cm'],
        ['Find the length of ' + M('TC') + '.', 1, (x + d) + ' cm']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
