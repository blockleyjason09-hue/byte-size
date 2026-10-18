/* Byte Size — GCSE / Pearson Edexcel International GCSE (4MA1) question bank.
   Difficulty: 1 = Foundation, 2 = Core, 3 = Accelerated. */
(function (g) {
  var BS = g.BS;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, mixed = BS.mixed,
      poly = BS.poly, sg = BS.sg, br = BS.br, sf = BS.sf, dp = BS.dp, money = BS.money, num = BS.num,
      M = BS.m, rad = BS.deg;
  var T = BS.topic;
  function q1(q, m, a, stem) { return { stem: stem, parts: [{ q: q, m: m, a: a }] }; }

  /* ---------------- NUMBER ---------------- */
  T({ id: 'fractions', name: 'Fractions and recurring decimals', video: 'corbettmaths fractions', gens: [
    { d: [1], f: function () {
      var b = pick([3, 4, 5, 6, 8, 10]), d = pick([3, 4, 5, 6, 8, 10].filter(function (x) { return x !== b; }));
      var a = ri(1, b - 1), c = ri(1, d - 1), op = pick(['+', '-']);
      if (op === '-' && a * d < c * b) { var t1 = a; a = c; c = t1; var t2 = b; b = d; d = t2; }
      var n = op === '+' ? a * d + c * b : a * d - c * b;
      return q1('Work out ' + M('\\frac{' + a + '}{' + b + '} ' + op + ' \\frac{' + c + '}{' + d + '}') + '. Give your answer as a fraction in its simplest form.', 2, M(frac(n, b * d)));
    } },
    { d: [1], f: function () {
      var den = pick([3, 4, 5, 6, 8]), n = ri(1, den - 1); while (gcd(n, den) > 1) n = ri(1, den - 1);
      var amt = den * ri(6, 40);
      return q1('Work out ' + M('\\frac{' + n + '}{' + den + '}') + ' of ' + amt + ' kg.', 2, amt * n / den + ' kg');
    } },
    { d: [2], f: function () {
      function mk() { var d = ri(2, 7), n = ri(1, d - 1); while (gcd(n, d) > 1) n = ri(1, d - 1); return [ri(1, 3), n, d]; }
      var A = mk(), B = mk(), op = pick(['\\times', '\\div']);
      var an = A[0] * A[2] + A[1], ad = A[2], bn = B[0] * B[2] + B[1], bd = B[2];
      var rn = op === '\\times' ? an * bn : an * bd, rd = op === '\\times' ? ad * bd : ad * bn;
      return q1('Work out ' + M(A[0] + '\\tfrac{' + A[1] + '}{' + A[2] + '} ' + op + ' ' + B[0] + '\\tfrac{' + B[1] + '}{' + B[2] + '}') + '. Give your answer as a mixed number in its simplest form.', 3, M(mixed(rn, rd)));
    } },
    { d: [2], f: function () {
      var b = pick([3, 4, 5, 6]), d = pick([4, 5, 6, 7, 8].filter(function (x) { return x !== b; }));
      var a = ri(1, b - 1), c = ri(1, d - 1); while (gcd(a, b) > 1) a = ri(1, b - 1); while (gcd(c, d) > 1) c = ri(1, d - 1);
      var w1 = ri(1, 3), w2 = ri(1, 3);
      var n1 = w1 * b + a, n2 = w2 * d + c, L = b * d / gcd(b, d);
      var s = n1 * (L / b) + n2 * (L / d);
      return q1('Show that ' + M(w1 + '\\tfrac{' + a + '}{' + b + '} + ' + w2 + '\\tfrac{' + c + '}{' + d + '} = ' + mixed(s, L)) + '.', 3,
        M('\\frac{' + n1 + '}{' + b + '} + \\frac{' + n2 + '}{' + d + '} = \\frac{' + n1 * (L / b) + '}{' + L + '} + \\frac{' + n2 * (L / d) + '}{' + L + '} = \\frac{' + s + '}{' + L + '} = ' + mixed(s, L)));
    } },
    { d: [3], f: function () {
      var a = ri(1, 9), b = ri(1, 8); while (b === a) b = ri(1, 8);
      var n = 9 * a + b;
      return q1('Prove algebraically that the recurring decimal ' + M('0.' + a + '\\dot{' + b + '}') + ' can be written as ' + M(frac(n, 90)) + '.', 3,
        M('x = 0.' + a + b + b + b + '\\ldots,\\ 100x = ' + a + b + '.' + b + b + '\\ldots,\\ 10x = ' + a + '.' + b + b + '\\ldots') + '<br>' + M('90x = ' + (10 * a + b) + ' - ' + a + ' = ' + n + ' \\Rightarrow x = \\frac{' + n + '}{90} = ' + frac(n, 90)));
    } },
    { d: [3], f: function () {
      var a = ri(1, 9), b = ri(0, 9); while (b === a) b = ri(1, 9);
      var n = 10 * a + b;
      return q1('Prove algebraically that the recurring decimal ' + M('0.\\dot{' + a + '}\\dot{' + b + '}') + ' can be written as ' + M(frac(n, 99)) + '.', 2,
        M('x = 0.' + a + b + a + b + '\\ldots,\\ 100x = ' + n + '.' + a + b + '\\ldots') + '<br>' + M('99x = ' + n + ' \\Rightarrow x = \\frac{' + n + '}{99}' + (frac(n, 99) === '\\frac{' + n + '}{99}' ? '' : ' = ' + frac(n, 99))));
    } }
  ] });

  T({ id: 'percentages', name: 'Percentages', video: 'corbettmaths percentages', gens: [
    { d: [1], f: function () {
      var P = 20 * ri(2, 40), r = pick([5, 10, 15, 20, 25, 30, 35]), up = Math.random() < 0.5;
      return q1((up ? 'Increase ' : 'Decrease ') + money(P) + ' by ' + r + '%.', 2, money(P * (1 + (up ? r : -r) / 100)));
    } },
    { d: [1], f: function () {
      var b = pick([20, 25, 40, 50, 80, 200, 250]), p = ri(1, 19) * 5, a = b * p / 100;
      if (a !== Math.round(a)) { p = 20; a = b / 5; }
      return q1('There are ' + b + ' pupils in Year 9. ' + a + ' of them walk to school.<br>What percentage of the pupils walk to school?', 2, p + '%');
    } },
    { d: [2], f: function () {
      var P = 500 * ri(2, 18), r = pick([1.5, 2, 2.5, 3, 3.5, 4, 4.5]), n = ri(2, 5);
      return q1('Ali invests ' + money(P) + ' for ' + n + ' years in a savings account.<br>The account pays ' + r + '% per annum compound interest.<br>Work out the value of the investment at the end of ' + n + ' years. Give your answer to the nearest penny.', 3,
        M(num(P) + ' \\times ' + (100 + r) / 100 + '^{' + n + '}') + ' = ' + money(Math.round(P * Math.pow(1 + r / 100, n) * 100) / 100, true));
    } },
    { d: [2], f: function () {
      var V = 1000 * ri(8, 30), r = pick([8, 10, 12, 15, 18, 20]), n = ri(2, 4);
      return q1('A car was bought for ' + money(V) + '.<br>The value of the car depreciates by ' + r + '% each year.<br>Work out the value of the car after ' + n + ' years.', 3,
        M(num(V) + ' \\times ' + (100 - r) / 100 + '^{' + n + '}') + ' = ' + money(Math.round(V * Math.pow(1 - r / 100, n) * 100) / 100, true));
    } },
    { d: [3], f: function () {
      var O = 20 * ri(3, 15), r = pick([10, 15, 20, 25, 30, 35, 40]), S = O * (100 - r) / 100;
      return q1('In a sale, all normal prices are reduced by ' + r + '%.<br>The sale price of a jacket is ' + money(S) + '.<br>Work out the normal price of the jacket.', 3,
        M(num(S) + ' \\div ' + (100 - r) / 100) + ' = ' + money(O));
    } },
    { d: [3], f: function () {
      var O = 25 * ri(8, 60), r = pick([4, 8, 12, 16, 24]), S = O * (100 + r) / 100;
      return q1('The population of a town increased by ' + r + '% in one year.<br>At the end of the year the population was ' + num(S) + '.<br>Work out the population at the start of the year.', 3,
        M(num(S) + ' \\div ' + (100 + r) / 100) + ' = ' + num(O));
    } },
    { d: [3], f: function () {
      var P = 1000 * ri(2, 9), r = pick([3, 4, 5, 6]), target = P * pick([1.2, 1.25, 1.3]);
      var n = 0, v = P; while (v <= target) { v *= 1 + r / 100; n++; }
      return q1(money(P) + ' is invested at ' + r + '% per annum compound interest.<br>Work out the least number of whole years it takes for the investment to be worth more than ' + money(target) + '.', 3, n + ' years');
    } }
  ] });

  T({ id: 'indices', name: 'Indices and standard form', video: 'corbettmaths standard form', gens: [
    { d: [1], f: function () {
      var A = ri(11, 99); if (A % 10 === 0) A++;
      var e = ri(3, 7), big = Math.random() < 0.6;
      var mant = (A / 10).toString();
      var n = big ? num(A * Math.pow(10, e - 1)) : '0.' + '0'.repeat(e - 1) + A;
      return q1('Write ' + n + ' in standard form.', 1, M(mant + ' \\times 10^{' + (big ? e : -e) + '}'));
    } },
    { d: [1], f: function () {
      var a = ri(2, 9), b = ri(2, 9), c = ri(2, 5), d = ri(2, 4), e = ri(6, 12), f = ri(2, 5);
      return { parts: [
        { q: 'Simplify ' + M('x^{' + a + '} \\times x^{' + b + '}'), m: 1, a: M('x^{' + (a + b) + '}') },
        { q: 'Simplify ' + M('y^{' + e + '} \\div y^{' + f + '}'), m: 1, a: M('y^{' + (e - f) + '}') },
        { q: 'Simplify ' + M('(p^{' + c + '})^{' + d + '}'), m: 1, a: M('p^{' + c * d + '}') }
      ] };
    } },
    { d: [2], f: function () {
      var A = ri(11, 99), B = ri(11, 99), m = ri(-6, 9), n = ri(-6, 9);
      if (A % 10 === 0) A++; if (B % 10 === 0) B++;
      var P = A * B, s = String(P).replace(/0+$/, '');
      var exp = m + n + String(P).length - 3;
      var mant = s.length > 1 ? s[0] + '.' + s.slice(1) : s;
      return q1('Work out ' + M('(' + A / 10 + ' \\times 10^{' + m + '}) \\times (' + B / 10 + ' \\times 10^{' + n + '})') + '.<br>Give your answer in standard form.', 2, M(mant + ' \\times 10^{' + exp + '}'));
    } },
    { d: [2], f: function () {
      var k = ri(2, 3), p = ri(4, 4), a = ri(2, 5), b = ri(1, 3);
      p = pick([2, 3, 4]);
      return q1('Simplify fully ' + M('(' + k + 'x^{' + a + '}y^{' + (b === 1 ? '' : b) + '})^{' + p + '}').replace('y^{}', 'y') + '.', 2,
        M(Math.pow(k, p) + 'x^{' + a * p + '}y^{' + b * p + '}'));
    } },
    { d: [3], f: function () {
      var c = pick([[2, 2], [3, 2], [4, 2], [5, 2], [2, 3], [3, 3], [4, 3], [2, 4], [3, 4], [2, 5]]);
      var r = c[0], n = c[1], base = Math.pow(r, n), p = n === 2 ? ri(1, 3) : ri(1, 2);
      var e1 = frac(p, n);
      var a = pick([[2, 3], [3, 4], [2, 5], [1, 3], [3, 5]]), m2 = 2;
      return { parts: [
        { q: 'Find the value of ' + M(base + '^{' + e1 + '}'), m: 1, a: M(String(Math.pow(r, p))) },
        { q: 'Find the value of ' + M(base + '^{-' + e1 + '}'), m: 1, a: M('\\frac{1}{' + Math.pow(r, p) + '}') },
        { q: 'Find the value of ' + M('\\left(\\frac{' + a[0] * a[0] + '}{' + a[1] * a[1] + '}\\right)^{-\\frac{3}{2}}'), m: 2, a: M('\\left(\\frac{' + a[1] + '}{' + a[0] + '}\\right)^{3} = ' + frac(Math.pow(a[1], 3), Math.pow(a[0], 3))) }
      ] };
    } }
  ] });

  T({ id: 'surds', name: 'Surds', video: 'corbettmaths surds', gens: [
    { d: [1, 2], f: function (d) {
      var m = pick([2, 3, 5, 6, 7, 10, 11]), k = ri(2, d === 1 ? 4 : 7);
      return q1('Write ' + M('\\sqrt{' + k * k * m + '}') + ' in the form ' + M('k\\sqrt{' + m + '}') + ', where ' + M('k') + ' is an integer.', 2, M(k + '\\sqrt{' + m + '}'));
    } },
    { d: [2], f: function () {
      var m = pick([2, 3, 5, 6, 7]), a = ri(2, 4), b = ri(2, 5); while (b === a) b = ri(2, 5);
      return q1('Simplify ' + M('\\sqrt{' + a * a * m + '} + \\sqrt{' + b * b * m + '}') + '.', 2, M((a + b) + '\\sqrt{' + m + '}'));
    } },
    { d: [2, 3], f: function () {
      var m = pick([2, 3, 5, 7]), a = ri(2, 6);
      return { parts: [
        { q: 'Expand and simplify ' + M('(' + a + ' + \\sqrt{' + m + '})(' + a + ' - \\sqrt{' + m + '})'), m: 2, a: M(String(a * a - m)) },
        { q: 'Expand and simplify ' + M('(' + a + ' + \\sqrt{' + m + '})^2'), m: 2, a: M((a * a + m) + ' + ' + 2 * a + '\\sqrt{' + m + '}') }
      ] };
    } },
    { d: [3], f: function () {
      var m = pick([2, 3, 5, 6, 7]), k = pick([2, 3, 4, 6, 10]);
      return q1('Rationalise the denominator of ' + M('\\frac{' + k + '}{\\sqrt{' + m + '}}') + '. Simplify your answer.', 2,
        M((function () { var gg = gcd(k, m); var p = k / gg, q = m / gg; return (q === 1 ? (p === 1 ? '' : p) + '\\sqrt{' + m + '}' : '\\frac{' + (p === 1 ? '' : p) + '\\sqrt{' + m + '}}{' + q + '}'); })()));
    } },
    { d: [3], f: function () {
      var m = pick([2, 3, 5, 7]), a = ri(1, 4); while (a * a === m) a = ri(1, 4);
      var k = ri(1, 6), D = a * a - m, gg = gcd(k, D), p = k / gg, q = D / gg;
      var inner = q < 0 ? '\\sqrt{' + m + '} - ' + a : a + ' - \\sqrt{' + m + '}';
      q = Math.abs(q);
      var numr = (p === 1 ? '' : p) + '(' + inner + ')';
      var ans = q === 1 ? numr : '\\frac{' + numr + '}{' + q + '}';
      return q1('Rationalise the denominator of ' + M('\\frac{' + k + '}{' + a + ' + \\sqrt{' + m + '}}') + '.<br>Give your answer in its simplest form.', 3, M(ans));
    } }
  ] });

  T({ id: 'ratio', name: 'Ratio and proportion', video: 'corbettmaths ratio', gens: [
    { d: [1], f: function () {
      var a = ri(1, 5), b = ri(2, 7); while (gcd(a, b) > 1 || a === b) b = ri(2, 7);
      var u = 5 * ri(2, 20), N = (a + b) * u;
      return q1('Ella and Sam share ' + money(N) + ' in the ratio ' + a + ' : ' + b + '.<br>Work out how much each person gets.', 2, 'Ella ' + money(a * u) + ', Sam ' + money(b * u));
    } },
    { d: [1, 2], f: function () {
      var a = ri(2, 6), b = ri(2, 6), c = ri(2, 6), u = ri(3, 12) * 2, tot = (a + b + c) * u;
      return q1('A drink is made by mixing orange, mango and lemonade in the ratio ' + a + ' : ' + b + ' : ' + c + '.<br>Jo makes ' + tot + ' ml of the drink. How much lemonade does she use?', 2, c * u + ' ml');
    } },
    { d: [2], f: function () {
      var a = ri(1, 5), b = ri(2, 6), c = ri(2, 6), d = ri(1, 6);
      var x = a * c, z = b * d, k = gcd(x, z);
      return q1(M('x : y = ' + a + ' : ' + b) + ' and ' + M('y : z = ' + c + ' : ' + d) + '.<br>Find ' + M('x : z') + ' in its simplest form.', 2, M(x / k + ' : ' + z / k));
    } },
    { d: [2], f: function () {
      var k = ri(2, 5), x1 = ri(2, 5), x2 = ri(3, 9); while (x2 === x1) x2 = ri(3, 9);
      return { stem: M('y') + ' is directly proportional to ' + M('x^2') + '. When ' + M('x = ' + x1) + ', ' + M('y = ' + k * x1 * x1) + '.', parts: [
        { q: 'Find a formula for ' + M('y') + ' in terms of ' + M('x') + '.', m: 3, a: M('y = ' + k + 'x^2') },
        { q: 'Work out the value of ' + M('y') + ' when ' + M('x = ' + x2) + '.', m: 1, a: M(String(k * x2 * x2)) }
      ] };
    } },
    { d: [3], f: function () {
      var xs = BS.shuffle([2, 3, 4, 5, 6, 10]), x1 = xs[0], x2 = xs[1], k = 3600;
      return { stem: M('y') + ' is inversely proportional to ' + M('x^2') + '. When ' + M('x = ' + x1) + ', ' + M('y = ' + k / (x1 * x1)) + '.', parts: [
        { q: 'Find a formula for ' + M('y') + ' in terms of ' + M('x') + '.', m: 3, a: M('y = \\frac{3600}{x^2}') },
        { q: 'Work out the value of ' + M('y') + ' when ' + M('x = ' + x2) + '.', m: 1, a: M(String(k / (x2 * x2))) }
      ] };
    } },
    { d: [3], f: function () {
      var a = ri(2, 5), b = ri(a + 1, 9); while (gcd(a, b) > 1) b = ri(a + 1, 9);
      var u = ri(3, 20) * 2;
      return q1('Amir and Beth share some money in the ratio ' + a + ' : ' + b + '.<br>Beth gets ' + money((b - a) * u) + ' more than Amir.<br>Work out the total amount of money they share.', 3, money((a + b) * u));
    } }
  ] });

  T({ id: 'bounds', name: 'Bounds and error intervals', video: 'corbettmaths error intervals', gens: [
    { d: [1], f: function () {
      if (Math.random() < 0.5) { var L = ri(12, 95); return q1('The length of a pencil is ' + L + ' mm, correct to the nearest millimetre.<br>Write down the error interval for the length, ' + M('l') + ' mm.', 2, M((L - 0.5) + ' \\le l < ' + (L + 0.5))); }
      var N = 10 * ri(12, 99);
      return q1('The number of people at a concert is ' + N + ', correct to the nearest 10.<br>Write down the error interval for the number of people, ' + M('n') + '.', 2, M((N - 5) + ' \\le n < ' + (N + 5)));
    } },
    { d: [2], f: function () {
      var x = ri(21, 99) / 10;
      return q1(M('x = ' + x.toFixed(1)) + ', correct to 1 decimal place.<br>Write down the error interval for ' + M('x') + '.', 2, M(dp(x - 0.05, 2) + ' \\le x < ' + dp(x + 0.05, 2)));
    } },
    { d: [2, 3], f: function () {
      var a = ri(4, 20), b = ri(4, 20);
      return q1('A rectangle has length ' + a + ' cm and width ' + b + ' cm, both correct to the nearest centimetre.<br>Work out the upper bound for the area of the rectangle.', 2, M((a + 0.5) + ' \\times ' + (b + 0.5) + ' = ' + num((a + 0.5) * (b + 0.5))) + ' cm²');
    } },
    { d: [3], f: function () {
      var D = ri(120, 400), t = ri(15, 45) / 10;
      var up = (D + 0.5) / (t - 0.05);
      return q1('A car travels ' + D + ' km, correct to the nearest kilometre, in ' + t.toFixed(1) + ' hours, correct to 1 decimal place.<br>Work out the upper bound for the average speed of the car. Give your answer correct to 3 significant figures.', 3,
        M('\\frac{' + (D + 0.5) + '}{' + dp(t - 0.05, 2) + '}') + ' = ' + sf(up, 3) + ' km/h');
    } }
  ] });

  /* ---------------- ALGEBRA ---------------- */
  T({ id: 'expand-factorise', name: 'Expanding and factorising', video: 'corbettmaths factorising', gens: [
    { d: [1], f: function () {
      var k = ri(2, 9), a = ri(2, 7), b = nz(-9, 9), k2 = ri(2, 6), p = ri(1, 7), q = ri(1, 9); while (gcd(p, q) > 1) q = ri(1, 9);
      return { parts: [
        { q: 'Expand ' + M(k + br(a, b)), m: 1, a: M(poly([k * a, k * b])) },
        { q: 'Factorise ' + M(poly([k2 * p, k2 * q])), m: 1, a: M(k2 + br(p, q)) }
      ] };
    } },
    { d: [1, 2], f: function () {
      var a = ri(2, 6), b = ri(2, 9), c = ri(2, 5);
      while (gcd(b, c) > 1) b = ri(2, 9);
      return q1('Factorise fully ' + M(a * c + 'x^{2}y + ' + a * b + 'xy^{2}'), 2, M(a + 'xy(' + c + 'x + ' + b + 'y)'));
    } },
    { d: [2], f: function () {
      var a = nz(-9, 9), b = nz(-9, 9), r1 = nz(-9, 9), r2 = nz(-9, 9);
      return { parts: [
        { q: 'Expand and simplify ' + M(br(1, a) + br(1, b)), m: 2, a: M(poly([1, a + b, a * b])) },
        { q: 'Factorise ' + M(poly([1, -(r1 + r2), r1 * r2])), m: 2, a: M(br(1, -r1) + br(1, -r2)) }
      ] };
    } },
    { d: [2], f: function () {
      var k = ri(2, 12);
      return q1('Factorise ' + M('x^2 - ' + k * k), 1, M('(x + ' + k + ')(x - ' + k + ')'));
    } },
    { d: [3], f: function () {
      var p = pick([2, 3, 5]), r = pick([1, 2]), q, s;
      do { q = nz(-7, 7); } while (gcd(p, q) > 1);
      do { s = nz(-7, 7); } while (gcd(r, s) > 1);
      return q1('Factorise fully ' + M(poly([p * r, p * s + q * r, q * s])), 2, M(br(p, q) + br(r, s)));
    } },
    { d: [3], f: function () {
      var a = nz(-5, 5), b = nz(-5, 5), c = nz(-5, 5);
      return q1('Expand and simplify ' + M(br(1, a) + br(1, b) + br(1, c)), 3, M(poly([1, a + b + c, a * b + a * c + b * c, a * b * c])));
    } }
  ] });

  T({ id: 'linear-equations', name: 'Linear equations', video: 'corbettmaths solving equations', gens: [
    { d: [1], f: function () {
      var x = ri(-6, 12), a = ri(2, 9), b = nz(-20, 20);
      return q1('Solve ' + M(poly([a, b]) + ' = ' + (a * x + b)), 2, M('x = ' + x));
    } },
    { d: [1], f: function () {
      var a = ri(2, 6), c = ri(1, 9), b = nz(-8, 8), x = a * ri(-3, 8);
      return q1('Solve ' + M('\\frac{x}{' + a + '}' + sg(b) + ' = ' + (x / a + b)), 2, M('x = ' + x));
    } },
    { d: [2], f: function () {
      var x = nz(-7, 9), a = ri(3, 9), c = ri(1, a - 1), b = nz(-15, 15), d = a * x + b - c * x;
      return q1('Solve ' + M(poly([a, b]) + ' = ' + poly([c, d])), 3, M('x = ' + x));
    } },
    { d: [2], f: function () {
      var x = ri(2, 9), k = ri(2, 6), b = nz(-6, 6), c = ri(2, 9); while (c === k) c = ri(2, 9);
      var d = k * (x + b) - c * x;
      return q1('Solve ' + M(k + br(1, b) + ' = ' + poly([c, d])), 3, M('x = ' + x));
    } },
    { d: [2, 3], f: function () {
      var x, a, b, c;
      do { x = ri(15, 35); a = ri(5, 30); b = ri(5, 20); c = 180 - 6 * x - a + b; } while (c < -10 || c > 40 || c === 0 || 2 * x - b <= 0 || 3 * x + c <= 0);
      return q1('The angles of a triangle are ' + M('(x' + sg(a) + ')^\\circ') + ', ' + M('(2x - ' + b + ')^\\circ') + ' and ' + M('(3x' + sg(c) + ')^\\circ') + '.<br>Work out the size of the largest angle.', 4,
        M('6x' + (a - b + c ? sg(a - b + c) : '') + ' = 180 \\Rightarrow x = ' + x) + '; largest angle ' + Math.max(x + a, 2 * x - b, 3 * x + c) + '°');
    } },
    { d: [3], f: function () {
      var x, p, q, k1, k2, a, b;
      do { x = ri(-5, 12); p = ri(2, 5); q = ri(2, 6); k1 = ri(-2, 5); k2 = ri(-2, 5); a = k1 * p - x; b = x - k2 * q; } while (q === p || a === 0 || b === 0);
      return q1('Solve ' + M('\\frac{' + poly([1, a]) + '}{' + p + '} + \\frac{' + poly([1, -b]) + '}{' + q + '} = ' + (k1 + k2)), 4, M('x = ' + x));
    } }
  ] });

  T({ id: 'simultaneous', name: 'Simultaneous equations', video: 'corbettmaths simultaneous equations', gens: [
    { d: [1, 2], f: function (d) {
      var x = nz(-5, 8), y = nz(-5, 8), a, b, c, e;
      do {
        a = ri(1, 6); c = ri(1, 6);
        if (d === 1) { b = ri(1, 5); e = -b; } else { b = nz(-6, 6); e = nz(-6, 6); }
      } while (a * e - b * c === 0);
      return q1('Solve the simultaneous equations<br>' + M('\\begin{aligned} ' + lin(a, b) + ' &= ' + (a * x + b * y) + ' \\\\ ' + lin(c, e) + ' &= ' + (c * x + e * y) + ' \\end{aligned}'), 3, M('x = ' + x + ',\\ y = ' + y));
    } },
    { d: [2, 3], f: function () {
      var A = ri(4, 12), C = ri(2, 8), a1 = ri(2, 5), c1 = ri(1, 4), a2 = ri(1, 4), c2 = ri(2, 6);
      while (a1 * c2 - c1 * a2 === 0) c2 = ri(2, 6);
      return q1(a1 + ' adult tickets and ' + c1 + ' child ' + (c1 === 1 ? 'ticket' : 'tickets') + ' cost ' + money(a1 * A + c1 * C) + '.<br>' + a2 + ' adult ' + (a2 === 1 ? 'ticket' : 'tickets') + ' and ' + c2 + ' child tickets cost ' + money(a2 * A + c2 * C) + '.<br>Work out the cost of an adult ticket and the cost of a child ticket.', 4, 'Adult ' + money(A) + ', child ' + money(C));
    } },
    { d: [3], f: function () {
      var x1 = ri(-4, 4), x2 = ri(-4, 4); while (x2 === x1) x2 = ri(-4, 4);
      var m = nz(-3, 3), n = ri(-5, 5);
      var bq = m - (x1 + x2), cq = x1 * x2 + n;
      return q1('Solve the simultaneous equations<br>' + M('\\begin{aligned} y &= ' + poly([1, bq, cq]) + ' \\\\ y &= ' + poly([m, n]) + ' \\end{aligned}'), 5,
        M('x = ' + Math.min(x1, x2) + ', y = ' + (m * Math.min(x1, x2) + n)) + ' and ' + M('x = ' + Math.max(x1, x2) + ', y = ' + (m * Math.max(x1, x2) + n)));
    } }
  ] });
  function lin(a, b) { // ax + by
    var s = poly([a, 0]).replace(/ \+ 0$/, '');
    s = (a === 1 ? 'x' : a === -1 ? '-x' : a + 'x');
    var t = Math.abs(b) === 1 ? 'y' : Math.abs(b) + 'y';
    return s + (b < 0 ? ' - ' : ' + ') + t;
  }

  T({ id: 'quadratics', name: 'Quadratic equations', video: 'corbettmaths quadratic formula', gens: [
    { d: [1, 2], f: function () {
      var r1 = nz(-9, 9), r2 = nz(-9, 9);
      var ans = r1 === r2 ? 'x = ' + r1 : 'x = ' + Math.min(r1, r2) + ' \\text{ or } x = ' + Math.max(r1, r2);
      return q1('Solve ' + M(poly([1, -(r1 + r2), r1 * r2]) + ' = 0'), 3, M(ans));
    } },
    { d: [2, 3], f: function () {
      var a, b, c, D;
      do { a = ri(1, 3); b = nz(-9, 9); c = nz(-9, 9); D = b * b - 4 * a * c; } while (D <= 0 || Math.sqrt(D) === Math.round(Math.sqrt(D)));
      var x1 = (-b + Math.sqrt(D)) / (2 * a), x2 = (-b - Math.sqrt(D)) / (2 * a);
      return q1('Solve ' + M(poly([a, b, c]) + ' = 0') + '.<br>Give your solutions correct to 2 decimal places.', 3, M('x = ' + dp(Math.min(x1, x2), 2) + ' \\text{ or } x = ' + dp(Math.max(x1, x2), 2)));
    } },
    { d: [3], f: function () {
      var p = pick([2, 3]), r = 1, q, s;
      do { q = nz(-7, 7); } while (gcd(p, q) > 1);
      s = nz(-7, 7);
      return q1('Solve ' + M(poly([p * r, p * s + q * r, q * s]) + ' = 0'), 3, M('x = ' + frac(-q, p) + ' \\text{ or } x = ' + (-s)));
    } },
    { d: [3], f: function () {
      var a = pick([1, 1, 2, 3]), p = nz(-6, 6), c = ri(-12, 15);
      var expr = poly([a, 2 * a * p, c]), qv = c - a * p * p;
      return { parts: [
        { q: 'Write ' + M(expr) + ' in the form ' + M(a === 1 ? '(x + p)^2 + q' : 'a(x + p)^2 + q') + '.', m: 3, a: M((a === 1 ? '' : a) + br(1, p) + '^2' + (qv === 0 ? '' : sg(qv))) },
        { q: 'Hence write down the coordinates of the turning point of the graph of ' + M('y = ' + expr) + '.', m: 1, a: M('(' + (-p) + ',\\ ' + qv + ')') }
      ] };
    } }
  ] });

  T({ id: 'inequalities', name: 'Inequalities', video: 'corbettmaths inequalities', gens: [
    { d: [1], f: function () {
      var a = ri(-5, 2), b = ri(a + 3, a + 7), strictL = Math.random() < 0.5, strictR = Math.random() < 0.5;
      var vals = []; for (var n = a; n <= b; n++) { if ((n === a && strictL) || (n === b && strictR)) continue; vals.push(n); }
      return q1(M('n') + ' is an integer such that ' + M(a + (strictL ? ' < ' : ' \\le ') + 'n' + (strictR ? ' < ' : ' \\le ') + b) + '.<br>Write down all the possible values of ' + M('n') + '.', 2, M(vals.join(',\\ ')));
    } },
    { d: [1, 2], f: function () {
      var a = ri(2, 7), x = ri(-4, 9), b = nz(-12, 12), op = pick(['<', '>', '\\le', '\\ge']);
      return q1('Solve ' + M(poly([a, b]) + ' ' + op + ' ' + (a * x + b)), 2, M('x ' + op + ' ' + x));
    } },
    { d: [2], f: function () {
      var a = ri(3, 9), c = ri(1, a - 1), b = nz(-12, 12), d = nz(-12, 12);
      return q1('Solve ' + M(poly([a, b]) + ' > ' + poly([c, d])), 2, M('x > ' + frac(d - b, a - c)));
    } },
    { d: [2], f: function () {
      var a = ri(2, 6), x = ri(-5, 5), c = ri(1, 15);
      return q1('Solve ' + M(c + ' - ' + a + 'x \\ge ' + (c - a * x)), 2, M('x \\le ' + x));
    } },
    { d: [3], f: function () {
      var r1 = ri(-7, 6), r2 = ri(r1 + 1, 8), le = Math.random() < 0.5;
      var ans = le ? r1 + ' \\le x \\le ' + r2 : 'x < ' + r1 + ' \\text{ or } x > ' + r2;
      return q1('Solve ' + M(poly([1, -(r1 + r2), r1 * r2]) + (le ? ' \\le 0' : ' > 0')), 3, M(ans));
    } }
  ] });

  T({ id: 'rearranging', name: 'Changing the subject of a formula', video: 'corbettmaths changing the subject', gens: [
    { d: [1], f: function () {
      var a = ri(2, 9), b = nz(-12, 12);
      return q1('Make ' + M('x') + ' the subject of ' + M('y = ' + poly([a, b])), 2, M('x = \\frac{y' + sg(-b) + '}{' + a + '}'));
    } },
    { d: [1, 2], f: function () {
      return pick([
        q1('Make ' + M('a') + ' the subject of ' + M('v = u + at'), 2, M('a = \\frac{v - u}{t}')),
        q1('Make ' + M('w') + ' the subject of ' + M('P = 2l + 2w'), 2, M('w = \\frac{P - 2l}{2}')),
        q1('Make ' + M('r') + ' the subject of ' + M('A = \\pi r^2'), 2, M('r = \\sqrt{\\frac{A}{\\pi}}'))
      ]);
    } },
    { d: [2, 3], f: function () {
      return pick([
        q1('Make ' + M('s') + ' the subject of ' + M('v^2 = u^2 + 2as'), 2, M('s = \\frac{v^2 - u^2}{2a}')),
        q1('Make ' + M('v') + ' the subject of ' + M('E = \\frac{1}{2}mv^2'), 2, M('v = \\sqrt{\\frac{2E}{m}}')),
        q1('Make ' + M('h') + ' the subject of ' + M('V = \\frac{1}{3}\\pi r^2 h'), 2, M('h = \\frac{3V}{\\pi r^2}'))
      ]);
    } },
    { d: [3], f: function () {
      var a = ri(1, 9), b = ri(1, 9);
      return q1('Make ' + M('x') + ' the subject of ' + M('y = \\frac{x + ' + a + '}{x - ' + b + '}'), 4, M('x = \\frac{' + b + 'y + ' + a + '}{y - 1}'));
    } },
    { d: [3], f: function () {
      return q1('Make ' + M('l') + ' the subject of ' + M('T = 2\\pi\\sqrt{\\frac{l}{g}}'), 3, M('l = \\frac{gT^2}{4\\pi^2}'));
    } }
  ] });

  T({ id: 'sequences', name: 'Sequences', video: 'corbettmaths nth term', gens: [
    { d: [1, 2], f: function () {
      var d = nz(-6, 9), a = ri(-5, 20), N = ri(15, 50);
      var terms = [0, 1, 2, 3, 4].map(function (i) { return a + i * d; });
      return { stem: 'Here are the first five terms of an arithmetic sequence.<br>' + M(terms.join(',\\quad ')), parts: [
        { q: 'Find an expression, in terms of ' + M('n') + ', for the ' + M('n') + 'th term of the sequence.', m: 2, a: M(poly([d, a - d], 'n')) },
        { q: 'Work out the ' + N + 'th term of the sequence.', m: 1, a: M(String(a + (N - 1) * d)) }
      ] };
    } },
    { d: [2], f: function () {
      var d = ri(3, 9), a = ri(1, 12), target = ri(80, 300), isT = Math.random() < 0.5;
      if (isT) target = a + d * ri(15, 40);
      else if ((target - a) % d === 0) target++;
      var terms = [0, 1, 2, 3].map(function (i) { return a + i * d; });
      var ans = (target - a) % d === 0 ? 'Yes. ' + M(poly([d, a - d], 'n') + ' = ' + target) + ' gives ' + M('n = ' + ((target - a) / d + 1)) + ', a whole number.' :
        'No. ' + M(poly([d, a - d], 'n') + ' = ' + target) + ' gives ' + M('n = ' + frac(target - a + d, d)) + ', which is not a whole number.';
      return q1('The first four terms of an arithmetic sequence are ' + M(terms.join(',\\ ')) + '.<br>Is ' + target + ' a term of this sequence? You must show how you get your answer.', 2, ans);
    } },
  ] });

  T({ id: 'functions', name: 'Functions', video: 'corbettmaths composite functions', gens: [
    { d: [1, 2], f: function () {
      var a = ri(2, 7), b = nz(-9, 9), c = nz(-9, 9), k = nz(-4, 6), m = nz(-3, 4);
      return { stem: M('\\mathrm{f}(x) = ' + poly([a, b])) + ' and ' + M('\\mathrm{g}(x) = ' + poly([1, 0, c])), parts: [
        { q: 'Find ' + M('\\mathrm{f}(' + k + ')'), m: 1, a: M(String(a * k + b)) },
        { q: 'Find ' + M('\\mathrm{fg}(' + m + ')'), m: 2, a: M(String(a * (m * m + c) + b)) },
        { q: 'Find ' + M('\\mathrm{f}^{-1}(x)'), m: 2, a: M('\\mathrm{f}^{-1}(x) = \\frac{x' + sg(-b) + '}{' + a + '}') }
      ] };
    } },
    { d: [3], f: function () {
      var a = ri(2, 5), b = nz(-6, 6), c = nz(-9, 9), k = ri(2, 9), p = nz(-5, 5);
      return { stem: M('\\mathrm{f}(x) = ' + poly([a, b])) + ', ' + M('\\mathrm{g}(x) = ' + poly([1, 0, c])) + ' and ' + M('\\mathrm{h}(x) = \\frac{' + k + '}{' + poly([1, -p]) + '}'), parts: [
        { q: 'Find ' + M('\\mathrm{gf}(x)') + '. Simplify your answer.', m: 2, a: M('\\mathrm{gf}(x) = ' + poly([a * a, 2 * a * b, b * b + c])) },
        { q: 'State which value of ' + M('x') + ' must be excluded from the domain of ' + M('\\mathrm{h}') + '.', m: 1, a: M('x = ' + p) },
        { q: 'Find ' + M('\\mathrm{h}^{-1}(x)') + '.', m: 3, a: M('\\mathrm{h}^{-1}(x) = \\frac{' + k + '}{x}' + sg(p)) }
      ] };
    } }
  ] });

  T({ id: 'differentiation', name: 'Differentiation', video: 'differentiation igcse maths', gens: [
    { d: [1, 2], f: function () {
      var a = nz(-4, 5), b = nz(-9, 9), c = nz(-9, 9), d = ri(-10, 10), k = nz(-3, 4);
      return { stem: M('y = ' + poly([a, b, c, d])), parts: [
        { q: 'Find ' + M('\\frac{\\mathrm{d}y}{\\mathrm{d}x}'), m: 2, a: M(poly([3 * a, 2 * b, c])) },
        { q: 'Find the gradient of the curve at the point where ' + M('x = ' + k), m: 2, a: M(String(3 * a * k * k + 2 * b * k + c)) }
      ] };
    } },
    { d: [3], f: function () {
      var a = ri(1, 5), b = nz(-16, 16);
      return q1('A curve has equation ' + M('y = ' + (a === 1 ? '' : a) + 'x^2' + (b < 0 ? ' - ' : ' + ') + '\\frac{' + Math.abs(b) + '}{x}') + '.<br>Find ' + M('\\frac{\\mathrm{d}y}{\\mathrm{d}x}') + '.', 2,
        M(2 * a + 'x' + (b < 0 ? ' + ' : ' - ') + '\\frac{' + Math.abs(b) + '}{x^2}'));
    } },
    { d: [3], f: function () {
      var r1 = ri(-3, 2), r2 = ri(r1 + 1, 4), d = ri(-10, 10);
      var b = -3 * (r1 + r2), c = 6 * r1 * r2;
      var y = function (x) { return 2 * x * x * x + b * x * x + c * x + d; };
      return q1('The curve ' + M('C') + ' has equation ' + M('y = ' + poly([2, b, c, d])) + '.<br>Find the coordinates of the turning points of ' + M('C') + '.', 5,
        M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + poly([6, 2 * b, c]) + ' = 0') + ' ⇒ ' + M('(' + r1 + ',\\ ' + y(r1) + ')') + ' and ' + M('(' + r2 + ',\\ ' + y(r2) + ')'));
    } },
    { d: [3], f: function () {
      var a = ri(1, 6), b = ri(2, 12), t = ri(1, 5);
      return { stem: 'A particle moves along a straight line. Its displacement, ' + M('s') + ' metres, from a fixed point ' + M('O') + ' at time ' + M('t') + ' seconds is ' + M('s = t^3 - ' + a + 't^2 + ' + b + 't'), parts: [
        { q: 'Find an expression for the velocity, ' + M('v') + ' m/s, at time ' + M('t') + '.', m: 2, a: M('v = ' + poly([3, -2 * a, b], 't')) },
        { q: 'Find the acceleration of the particle when ' + M('t = ' + t) + '.', m: 2, a: (6 * t - 2 * a) + ' m/s²' }
      ] };
    } }
  ] });

  T({ id: 'straight-lines', name: 'Straight-line graphs', video: 'corbettmaths equation of a straight line', gens: [
    { d: [1], f: function () {
      var k = pick([2, 3, 4]), m = nz(-5, 5), c = nz(-9, 9);
      return q1('A line has equation ' + M(k + 'y = ' + poly([k * m, k * c])) + '.<br>Write down the gradient and the ' + M('y') + '-intercept of the line.', 2, 'Gradient ' + M(String(m)) + ', ' + M('y') + '-intercept ' + M(String(c)));
    } },
    { d: [1, 2], f: function () {
      var x1 = ri(-5, 5), y1 = ri(-5, 5), x2 = ri(-5, 9), y2 = ri(-5, 9); while (x2 === x1 && y2 === y1) x2 = ri(-5, 9);
      return q1(M('A') + ' is the point ' + M('(' + x1 + ',\\ ' + y1 + ')') + ' and ' + M('B') + ' is the point ' + M('(' + x2 + ',\\ ' + y2 + ')') + '.<br>Find the coordinates of the midpoint of ' + M('AB') + '.', 2, M('(' + num((x1 + x2) / 2) + ',\\ ' + num((y1 + y2) / 2) + ')'));
    } },
    { d: [2], f: function () {
      var m = nz(-4, 4), c = ri(-8, 8), x1 = ri(-4, 3), x2 = x1 + ri(1, 4);
      return q1('Find an equation of the straight line that passes through the points ' + M('(' + x1 + ',\\ ' + (m * x1 + c) + ')') + ' and ' + M('(' + x2 + ',\\ ' + (m * x2 + c) + ')') + '.', 3, M('y = ' + poly([m, c])));
    } },
    { d: [3], f: function () {
      var m = pick([2, 3, 4, -2, -3, -4]), c = nz(-6, 6), t = nz(-3, 3), p = m * t, q = ri(-6, 6);
      var k = q + p / m;
      var mstr = (m > 0 ? '-' : '') + '\\frac{1}{' + Math.abs(m) + '}x';
      return q1('The line ' + M('L') + ' has equation ' + M('y = ' + poly([m, c])) + '.<br>Find an equation of the line that is perpendicular to ' + M('L') + ' and passes through the point ' + M('(' + p + ',\\ ' + q + ')') + '.', 3,
        M('y = ' + mstr + (k === 0 ? '' : sg(k))));
    } },
    { d: [3], f: function () {
      var tr = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]), x1 = ri(-5, 5), y1 = ri(-5, 5);
      var sx = pick([1, -1]), sy = pick([1, -1]);
      return q1('Work out the length of the line segment joining ' + M('(' + x1 + ',\\ ' + y1 + ')') + ' and ' + M('(' + (x1 + sx * tr[0]) + ',\\ ' + (y1 + sy * tr[1]) + ')') + '.', 3, M(String(tr[2])) + ' units');
    } }
  ] });

  /* ---------------- GEOMETRY ---------------- */
  T({ id: 'pythagoras-trig', name: 'Pythagoras and trigonometry', video: 'corbettmaths trigonometry', gens: [
    { d: [1], f: function () {
      var a = ri(3, 15), b = ri(3, 15);
      return q1(M('ABC') + ' is a right-angled triangle with angle ' + M('ABC = 90^\\circ') + '.<br>' + M('AB = ' + a + '\\text{ cm}') + ' and ' + M('BC = ' + b + '\\text{ cm}') + '.<br>Work out the length of ' + M('AC') + '. Give your answer correct to 1 decimal place.', 3, Math.sqrt(a * a + b * b).toFixed(1) + ' cm');
    } },
    { d: [1, 2], f: function () {
      var c = ri(10, 25), a = ri(3, c - 3);
      return q1(M('PQR') + ' is a right-angled triangle with angle ' + M('PQR = 90^\\circ') + '.<br>' + M('PR = ' + c + '\\text{ cm}') + ' and ' + M('PQ = ' + a + '\\text{ cm}') + '.<br>Work out the length of ' + M('QR') + '. Give your answer correct to 3 significant figures.', 3, sf(Math.sqrt(c * c - a * a), 3) + ' cm');
    } },
    { d: [2], f: function () {
      var th = ri(20, 70), h = ri(50, 200) / 10, which = pick(['sin', 'cos']);
      var val = which === 'sin' ? h * Math.sin(rad(th)) : h * Math.cos(rad(th));
      var side = which === 'sin' ? 'BC' : 'AB';
      return q1(M('ABC') + ' is a right-angled triangle with angle ' + M('ABC = 90^\\circ') + '.<br>Angle ' + M('BAC = ' + th + '^\\circ') + ' and ' + M('AC = ' + h + '\\text{ cm}') + '.<br>Work out the length of ' + M(side) + '. Give your answer correct to 3 significant figures.', 3, sf(val, 3) + ' cm');
    } },
    { d: [2, 3], f: function () {
      var th = ri(20, 70), adj = ri(40, 150) / 10;
      return q1(M('ABC') + ' is a right-angled triangle with angle ' + M('ABC = 90^\\circ') + '.<br>Angle ' + M('BAC = ' + th + '^\\circ') + ' and ' + M('AB = ' + adj + '\\text{ cm}') + '.<br>Work out the length of ' + M('AC') + '. Give your answer correct to 3 significant figures.', 3, sf(adj / Math.cos(rad(th)), 3) + ' cm');
    } },
    { d: [2, 3], f: function () {
      var o = ri(30, 150) / 10, a = ri(30, 150) / 10;
      return q1(M('ABC') + ' is a right-angled triangle with angle ' + M('ABC = 90^\\circ') + '.<br>' + M('AB = ' + a + '\\text{ cm}') + ' and ' + M('BC = ' + o + '\\text{ cm}') + '.<br>Work out the size of angle ' + M('BAC') + '. Give your answer correct to 1 decimal place.', 3, (Math.atan(o / a) * 180 / Math.PI).toFixed(1) + '°');
    } },
    { d: [3], f: function () {
      var a = ri(3, 12), b = ri(3, 12), c = ri(3, 12);
      var dg = Math.sqrt(a * a + b * b + c * c), base = Math.sqrt(a * a + b * b);
      return { stem: 'A cuboid ' + M('ABCDEFGH') + ' has length ' + a + ' cm, width ' + b + ' cm and height ' + c + ' cm. ' + M('AG') + ' is a diagonal of the cuboid and ' + M('AC') + ' is a diagonal of its base.', parts: [
        { q: 'Work out the length of ' + M('AG') + '. Give your answer correct to 3 significant figures.', m: 3, a: sf(dg, 3) + ' cm' },
        { q: 'Work out the size of the angle between ' + M('AG') + ' and the base of the cuboid. Give your answer correct to 1 decimal place.', m: 3, a: (Math.atan(c / base) * 180 / Math.PI).toFixed(1) + '°' }
      ] };
    } }
  ] });

  T({ id: 'circles', name: 'Circles, arcs and sectors', video: 'corbettmaths area of a sector', gens: [
    { d: [1], f: function () {
      var r = ri(3, 15), useD = Math.random() < 0.5;
      return useD ? q1('A circle has diameter ' + 2 * r + ' cm.<br>Work out the circumference of the circle. Give your answer correct to 1 decimal place.', 2, (2 * Math.PI * r).toFixed(1) + ' cm')
                  : q1('A circle has radius ' + r + ' cm.<br>Work out the area of the circle. Give your answer correct to 1 decimal place.', 2, (Math.PI * r * r).toFixed(1) + ' cm²');
    } },
    { d: [1, 2], f: function () {
      var r = ri(2, 12);
      return q1('A circle has radius ' + r + ' cm.<br>Work out the area of the circle. Give your answer in terms of ' + M('\\pi') + '.', 2, M(r * r + '\\pi') + ' cm²');
    } },
    { d: [2], f: function () {
      var r = ri(4, 20), th = 5 * ri(4, 32);
      return { stem: 'A sector of a circle has radius ' + r + ' cm and angle ' + th + '°.', parts: [
        { q: 'Work out the arc length of the sector. Give your answer correct to 3 significant figures.', m: 2, a: sf(th / 360 * 2 * Math.PI * r, 3) + ' cm' },
        { q: 'Work out the area of the sector. Give your answer correct to 3 significant figures.', m: 2, a: sf(th / 360 * Math.PI * r * r, 3) + ' cm²' }
      ] };
    } },
    { d: [3], f: function () {
      var r = ri(5, 15), th = 5 * ri(8, 30);
      return q1(M('OAB') + ' is a sector of a circle with centre ' + M('O') + ' and radius ' + r + ' cm. Angle ' + M('AOB = ' + th + '^\\circ') + '.<br>Work out the area of the segment between the chord ' + M('AB') + ' and the arc ' + M('AB') + '. Give your answer correct to 3 significant figures.', 4,
        sf(th / 360 * Math.PI * r * r - 0.5 * r * r * Math.sin(rad(th)), 3) + ' cm²');
    } },
    { d: [3], f: function () {
      var r = ri(4, 14), th = 5 * ri(6, 30);
      return q1('A sector has radius ' + r + ' cm and angle ' + th + '°.<br>Work out the perimeter of the sector. Give your answer correct to 3 significant figures.', 3, sf(2 * r + th / 360 * 2 * Math.PI * r, 3) + ' cm');
    } }
  ] });

  T({ id: 'polygons', name: 'Angles and polygons', video: 'corbettmaths angles in polygons', gens: [
    { d: [1], f: function () {
      var n = pick([5, 6, 8, 9, 10, 12, 15, 18, 20]);
      return { stem: 'A regular polygon has ' + n + ' sides.', parts: [
        { q: 'Work out the size of each exterior angle.', m: 1, a: num(360 / n) + '°' },
        { q: 'Work out the size of each interior angle.', m: 1, a: num(180 - 360 / n) + '°' }
      ] };
    } },
    { d: [1, 2], f: function () {
      var n = ri(5, 14);
      return q1('Work out the sum of the interior angles of a polygon with ' + n + ' sides.', 2, M('(' + n + ' - 2) \\times 180') + ' = ' + num((n - 2) * 180) + '°');
    } },
    { d: [2], f: function () {
      var n = pick([8, 9, 10, 12, 15, 18, 20, 24, 30, 36]);
      return q1('Each exterior angle of a regular polygon is ' + 360 / n + '°.<br>How many sides does the polygon have?', 2, M('360 \\div ' + 360 / n + ' = ' + n));
    } },
    { d: [3], f: function () {
      var k = pick([2, 3, 4, 5, 8, 9]);
      return q1('Each interior angle of a regular polygon is ' + k + ' times the size of each exterior angle.<br>Work out the number of sides of the polygon.', 3, M('e + ' + k + 'e = 180 \\Rightarrow e = ' + num(180 / (k + 1)) + '^\\circ') + ', so ' + M('n = ' + 2 * (k + 1)));
    } },
    { d: [2, 3], f: function () {
      var e = pick([25, 35, 50, 70, 80, 110]);
      return q1('Explain why a regular polygon cannot have an exterior angle of ' + e + '°.', 2, M('360 \\div ' + e + ' = ' + num(Math.round(360 / e * 100) / 100)) + ', which is not a whole number, so the number of sides would not be a whole number.');
    } }
  ] });

  T({ id: 'volume', name: 'Volume and surface area', video: 'corbettmaths volume of a cylinder', gens: [
    { d: [1], f: function () {
      var a = ri(2, 12), b = ri(2, 12), c = ri(2, 12);
      return { stem: 'A cuboid measures ' + a + ' cm by ' + b + ' cm by ' + c + ' cm.', parts: [
        { q: 'Work out the volume of the cuboid.', m: 2, a: a * b * c + ' cm³' },
        { q: 'Work out the total surface area of the cuboid.', m: 2, a: 2 * (a * b + b * c + a * c) + ' cm²' }
      ] };
    } },
    { d: [1, 2], f: function () {
      var b = ri(3, 12), h = ri(3, 12), l = ri(5, 20);
      return q1('A prism has a cross-section that is a right-angled triangle with base ' + b + ' cm and height ' + h + ' cm.<br>The length of the prism is ' + l + ' cm. Work out the volume of the prism.', 3, num(b * h / 2 * l) + ' cm³');
    } },
    { d: [2], f: function () {
      var r = ri(2, 10), h = ri(3, 20);
      return { stem: 'A cylinder has radius ' + r + ' cm and height ' + h + ' cm.', parts: [
        { q: 'Work out the volume of the cylinder. Give your answer in terms of ' + M('\\pi') + '.', m: 2, a: M(r * r * h + '\\pi') + ' cm³' },
        { q: 'Work out the curved surface area of the cylinder. Give your answer correct to 3 significant figures.', m: 2, a: sf(2 * Math.PI * r * h, 3) + ' cm²' }
      ] };
    } },
    { d: [3], f: function () {
      var r = ri(2, 8), h = ri(5, 20);
      var V = Math.PI * r * r * h + 2 / 3 * Math.PI * r * r * r;
      return q1('A solid is made from a cylinder and a hemisphere. The cylinder has radius ' + r + ' cm and height ' + h + ' cm. The hemisphere has radius ' + r + ' cm and sits on top of the cylinder.<br>Work out the total volume of the solid. Give your answer correct to 3 significant figures.', 4, sf(V, 3) + ' cm³');
    } },
    { d: [3], f: function () {
      var r = ri(1, 6);
      return q1('A sphere has volume ' + M(frac(4 * r * r * r, 3) + '\\pi') + ' cm³.<br>Work out the radius of the sphere.', 3, M('\\frac{4}{3}\\pi r^3 = ' + frac(4 * r * r * r, 3) + '\\pi \\Rightarrow r^3 = ' + r * r * r) + ', so ' + M('r = ' + r) + ' cm');
    } },
    { d: [3], f: function () {
      var r = ri(3, 12), h = ri(4, 20);
      return q1('A cone has base radius ' + r + ' cm and perpendicular height ' + h + ' cm.<br>Work out the volume of the cone. Give your answer correct to 3 significant figures.', 2, sf(Math.PI * r * r * h / 3, 3) + ' cm³');
    } }
  ] });

  T({ id: 'sine-cosine', name: 'Sine rule, cosine rule and area', video: 'corbettmaths cosine rule', gens: [
    { d: [1, 2], f: function () {
      var a = ri(5, 20), b = ri(5, 20), C = ri(25, 150);
      return q1('In triangle ' + M('ABC') + ', ' + M('CA = ' + a + '\\text{ cm}') + ', ' + M('CB = ' + b + '\\text{ cm}') + ' and angle ' + M('ACB = ' + C + '^\\circ') + '.<br>Work out the area of the triangle. Give your answer correct to 3 significant figures.', 2, sf(0.5 * a * b * Math.sin(rad(C)), 3) + ' cm²');
    } },
    { d: [2], f: function () {
      var b = ri(5, 20), c = ri(5, 20), A = ri(25, 140);
      return q1('In triangle ' + M('ABC') + ', ' + M('AB = ' + c + '\\text{ cm}') + ', ' + M('AC = ' + b + '\\text{ cm}') + ' and angle ' + M('BAC = ' + A + '^\\circ') + '.<br>Work out the length of ' + M('BC') + '. Give your answer correct to 3 significant figures.', 3,
        sf(Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(rad(A))), 3) + ' cm');
    } },
    { d: [2, 3], f: function () {
      var A, B; do { A = ri(30, 100); B = ri(25, 80); } while (A + B > 160);
      var a = ri(60, 200) / 10;
      return q1('In triangle ' + M('ABC') + ', angle ' + M('BAC = ' + A + '^\\circ') + ', angle ' + M('ABC = ' + B + '^\\circ') + ' and ' + M('BC = ' + a + '\\text{ cm}') + '.<br>Work out the length of ' + M('AC') + '. Give your answer correct to 3 significant figures.', 3,
        sf(a * Math.sin(rad(B)) / Math.sin(rad(A)), 3) + ' cm');
    } },
    { d: [3], f: function () {
      var a, b, c; do { a = ri(4, 15); b = ri(4, 15); c = ri(4, 15); } while (a + b <= c + 1 || a + c <= b + 1 || b + c <= a + 1);
      var C = Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180 / Math.PI;
      return { stem: 'In triangle ' + M('ABC') + ', ' + M('BC = ' + a + '\\text{ cm}') + ', ' + M('AC = ' + b + '\\text{ cm}') + ' and ' + M('AB = ' + c + '\\text{ cm}') + '.', parts: [
        { q: 'Work out the size of angle ' + M('ACB') + '. Give your answer correct to 1 decimal place.', m: 3, a: C.toFixed(1) + '°' },
        { q: 'Work out the area of the triangle. Give your answer correct to 3 significant figures.', m: 2, a: sf(0.5 * a * b * Math.sin(rad(C)), 3) + ' cm²' }
      ] };
    } }
  ] });

  /* ---------------- STATISTICS & PROBABILITY ---------------- */
  function table(head, rows) {
    return '<div class="qtable"><table><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }

  T({ id: 'averages', name: 'Averages and frequency tables', video: 'corbettmaths mean from a frequency table', gens: [
    { d: [1], f: function () {
      var xs, modes;
      do {
        var n = ri(7, 9); xs = []; for (var i = 0; i < n - 1; i++) xs.push(ri(1, 20)); xs.push(pick(xs));
        var cnt = {}; xs.forEach(function (x) { cnt[x] = (cnt[x] || 0) + 1; });
        var mx = Math.max.apply(null, Object.values(cnt)); modes = Object.keys(cnt).filter(function (k) { return cnt[k] === mx; });
      } while (modes.length !== 1);
      var s = xs.slice().sort(function (a, b) { return a - b; }), N = s.length;
      var med = N % 2 ? s[(N - 1) / 2] : (s[N / 2 - 1] + s[N / 2]) / 2;
      var mean = xs.reduce(function (a, b) { return a + b; }, 0) / N;
      return { stem: 'Here are the numbers of emails some people received one day.<br>' + M(xs.join(',\\quad ')), parts: [
        { q: 'Write down the mode.', m: 1, a: modes[0] },
        { q: 'Work out the median.', m: 1, a: num(med) },
        { q: 'Work out the range.', m: 1, a: String(s[N - 1] - s[0]) },
        { q: 'Work out the mean. Give your answer correct to 1 decimal place if necessary.', m: 2, a: (Math.round(mean * 10) / 10).toString() }
      ] };
    } },
    { d: [2], f: function () {
      var vals = [0, 1, 2, 3, 4, 5], f = vals.map(function () { return ri(1, 12); });
      var N = f.reduce(function (a, b) { return a + b; }, 0), S = vals.reduce(function (a, v, i) { return a + v * f[i]; }, 0);
      return q1('The table shows the number of goals scored by a hockey team in each of ' + N + ' matches.' +
        table(['Goals', 'Frequency'], vals.map(function (v, i) { return [v, f[i]]; })) + 'Work out the mean number of goals per match. Give your answer correct to 2 decimal places.', 3,
        M('\\frac{' + S + '}{' + N + '}') + ' = ' + dp(S / N, 2));
    } },
    { d: [3], f: function () {
      var w = 10, f = [ri(2, 8), ri(5, 15), ri(8, 20), ri(4, 12), ri(1, 6)];
      var N = f.reduce(function (a, b) { return a + b; }, 0), S = f.reduce(function (a, x, i) { return a + x * (w * i + w / 2); }, 0);
      var cum = 0, med = 0; for (var i = 0; i < f.length; i++) { cum += f[i]; if (cum >= N / 2) { med = i; break; } }
      var rows = f.map(function (x, i) { return [M(w * i + ' < t \\le ' + w * (i + 1)), x]; });
      return { stem: 'The table gives information about the times, ' + M('t') + ' minutes, that ' + N + ' pupils took to get to school.' + table(['Time (' + M('t') + ' minutes)', 'Frequency'], rows), parts: [
        { q: 'Write down the class interval that contains the median.', m: 1, a: M(w * med + ' < t \\le ' + w * (med + 1)) },
        { q: 'Work out an estimate for the mean time. Give your answer correct to 1 decimal place.', m: 4, a: M('\\frac{' + S + '}{' + N + '}') + ' = ' + (S / N).toFixed(1) + ' minutes' }
      ] };
    } },
    { d: [3], f: function () {
      var n1 = ri(10, 30), n2 = ri(10, 30), m1 = ri(40, 80), m2 = ri(40, 80);
      var tot = n1 * m1 + n2 * m2;
      return q1('The mean mark of ' + n1 + ' pupils in class A is ' + m1 + '.<br>The mean mark of ' + n2 + ' pupils in class B is ' + m2 + '.<br>Work out the mean mark of all ' + (n1 + n2) + ' pupils. Give your answer correct to 1 decimal place.', 3,
        M('\\frac{' + n1 * m1 + ' + ' + n2 * m2 + '}{' + (n1 + n2) + '}') + ' = ' + (tot / (n1 + n2)).toFixed(1));
    } }
  ] });

  T({ id: 'probability', name: 'Probability', video: 'corbettmaths probability tree diagrams', gens: [
    { d: [1], f: function () {
      var p, s;
      do { p = [ri(5, 40), ri(5, 40), ri(5, 40)]; s = p[0] + p[1] + p[2]; } while (s >= 95);
      var x = 100 - s, n = pick([100, 200, 300, 400]);
      var cols = ['Red', 'Blue', 'Green', 'Yellow'];
      return { stem: 'A spinner can land on red, blue, green or yellow. The table shows the probability of each colour.' +
        table(['Colour'].concat(cols), [['Probability', (p[0] / 100).toFixed(2), (p[1] / 100).toFixed(2), M('x'), (p[2] / 100).toFixed(2)]]), parts: [
        { q: 'Work out the value of ' + M('x') + '.', m: 2, a: M('x = ' + (x / 100).toFixed(2)) },
        { q: 'The spinner is spun ' + n + ' times. Work out an estimate for the number of times it lands on blue.', m: 2, a: String(p[1] * n / 100) }
      ] };
    } },
    { d: [2], f: function () {
      var r = ri(2, 9), b = ri(2, 9), n = r + b;
      return { stem: 'A bag contains ' + r + ' red counters and ' + b + ' blue counters. Kate takes a counter at random, records its colour and puts it back. She then takes a second counter at random.', parts: [
        { q: 'Work out the probability that both counters are red.', m: 2, a: M(frac(r * r, n * n)) },
        { q: 'Work out the probability that the two counters are different colours.', m: 3, a: M(frac(2 * r * b, n * n)) }
      ] };
    } },
    { d: [3], f: function () {
      var r = ri(3, 9), b = ri(3, 9), n = r + b;
      return { stem: 'A bag contains ' + r + ' red sweets and ' + b + ' green sweets. Raj takes two sweets at random from the bag without replacement.', parts: [
        { q: 'Work out the probability that both sweets are the same colour.', m: 3, a: M(frac(r * (r - 1) + b * (b - 1), n * (n - 1))) },
        { q: 'Work out the probability that at least one sweet is red.', m: 3, a: M('1 - ' + frac(b * (b - 1), n * (n - 1)) + ' = ' + frac(n * (n - 1) - b * (b - 1), n * (n - 1))) }
      ] };
    } },
    { d: [2, 3], f: function () {
      var pa = ri(1, 4) / 10, pb = ri(1, 4) / 10;
      return { stem: 'The probability that Lena is late for school on any day is ' + pa + '. The probability that Omar is late on any day is ' + pb + '. The two events are independent.', parts: [
        { q: 'Work out the probability that both Lena and Omar are late on Monday.', m: 2, a: dp(pa * pb, 2) },
        { q: 'Work out the probability that exactly one of them is late on Monday.', m: 3, a: dp(pa * (1 - pb) + pb * (1 - pa), 2) }
      ] };
    } }
  ] });
})(typeof window !== 'undefined' ? window : globalThis);
