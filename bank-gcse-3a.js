/* Byte Size — extra GCSE / IGCSE question types: Number and Algebra. */
(function (g) {
  var BS = g.BS, D = BS.draw, G = BS.gcse2;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, mixed = BS.mixed, poly = BS.poly, sg = BS.sg, br = BS.br,
      sf = BS.sf, dp = BS.dp, money = BS.money, num = BS.num, M = BS.m;
  var surd = G.surd;
  function q1(q, m, a, stem) { return { stem: stem, parts: [{ q: q, m: m, a: a }] }; }
  function add(id, d, f) { BS.topics[id].gens.push({ d: d, f: f }); }
  function lcm(a, b) { return a / gcd(a, b) * b; }
  function cv(a) { return '\\begin{pmatrix} ' + a.join(' \\\\ ') + ' \\end{pmatrix}'; }

  /* ---------- FRACTIONS ---------- */
  add('fractions', [1], function () {
    var d = pick([6, 8, 9, 10, 12, 14, 15, 18, 20, 24]), n = ri(1, d - 1); while (gcd(n, d) === 1) n = ri(1, d - 1);
    var k = ri(2, 5);
    return q1('Write ' + M('\\frac{' + n * k + '}{' + d * k + '}') + ' as a fraction in its simplest form.', 1, M(frac(n, d)));
  });
  add('fractions', [1], function () {
    var d = ri(3, 9), w = ri(1, 6), n = ri(1, d - 1); while (gcd(n, d) > 1) n = ri(1, d - 1);
    return { parts: [
      { q: 'Write ' + M('\\frac{' + (w * d + n) + '}{' + d + '}') + ' as a mixed number.', m: 1, a: M(w + '\\tfrac{' + n + '}{' + d + '}') },
      { q: 'Write ' + M(w + '\\tfrac{' + n + '}{' + d + '}') + ' as an improper fraction.', m: 1, a: M('\\frac{' + (w * d + n) + '}{' + d + '}') }
    ] };
  });
  add('fractions', [1, 2], function () {
    var a = pick([[3, 5], [5, 8], [7, 10], [2, 3], [3, 4], [5, 6]]), dec = ri(55, 78) / 100, pc = ri(56, 79);
    var items = [[a[0] / a[1], M('\\frac{' + a[0] + '}{' + a[1] + '}')], [dec, String(dec)], [pc / 100, pc + '%']];
    if (Math.abs(items[0][0] - items[2][0]) < 0.006) { items[2][0] += 0.03; items[2][1] = Math.round(items[2][0] * 100) + '%'; }
    while (Math.abs(items[0][0] - items[1][0]) < 0.006 || Math.abs(items[1][0] - items[2][0]) < 0.006) { items[1][0] = Math.round((items[1][0] + 0.013) * 1000) / 1000; items[1][1] = String(items[1][0]); }
    var sorted = items.slice().sort(function (x, y) { return x[0] - y[0]; });
    return q1('Write these numbers in order of size. Start with the smallest.<br>' + items.map(function (i) { return i[1]; }).join(',&nbsp;&nbsp; '), 2, sorted.map(function (i) { return i[1]; }).join(', '));
  });
  add('fractions', [2], function () {
    var N = 20 * ri(2, 8), f1 = pick([[2, 5], [3, 5], [1, 4], [3, 4], [7, 10]]), f2 = pick([[1, 2], [1, 4], [3, 4], [1, 5]]);
    var boys = N * f1[0] / f1[1], g_ = boys * f2[0] / f2[1];
    if (g_ !== Math.round(g_)) { f2 = [1, 2]; g_ = boys / 2; }
    if (g_ !== Math.round(g_)) { N = 40; boys = 40 * f1[0] / f1[1]; g_ = boys * f2[0] / f2[1]; }
    return q1('There are ' + N + ' students in a year group. ' + M('\\frac{' + f1[0] + '}{' + f1[1] + '}') + ' of the students are boys. ' + M('\\frac{' + f2[0] + '}{' + f2[1] + '}') + ' of the boys play in the orchestra.<br>How many boys play in the orchestra?', 3, num(g_));
  });
  add('fractions', [2, 3], function () {
    var a, b, c, d; do { a = ri(1, 7); b = ri(a + 1, 9); c = ri(1, 7); d = ri(c + 1, 9); } while (gcd(a, b) > 1 || gcd(c, d) > 1);
    return q1('Work out ' + M('\\frac{' + a + '}{' + b + '} \\div \\frac{' + c + '}{' + d + '}') + '. Give your answer in its simplest form.', 2, M(frac(a * d, b * c)));
  });
  add('fractions', [3], function () {
    var a = pick([[2, 3], [3, 4], [3, 5], [2, 5]]), b = pick([[1, 2], [3, 4], [4, 5], [5, 6]]);
    return q1(M('x') + ' is ' + M('\\frac{' + a[0] + '}{' + a[1] + '}') + ' of ' + M('y') + ', and ' + M('y') + ' is ' + M('\\frac{' + b[0] + '}{' + b[1] + '}') + ' of ' + M('z') + '.<br>What fraction of ' + M('z') + ' is ' + M('x') + '? Give your answer in its simplest form.', 2, M(frac(a[0] * b[0], a[1] * b[1])));
  });
  add('fractions', [3], function () {
    var digits; do { digits = [ri(0, 9), ri(0, 9), ri(1, 9)]; } while (digits[0] === digits[1] && digits[1] === digits[2]);
    var n = digits[0] * 100 + digits[1] * 10 + digits[2], s = String(n).padStart(3, '0');
    return q1('Prove algebraically that ' + M('0.\\dot{' + s[0] + '}' + s[1] + '\\dot{' + s[2] + '}') + ' can be written as ' + M(frac(n, 999)) + '.', 3,
      M('x = 0.' + s + s + '\\ldots,\\ 1000x = ' + n + '.' + s + '\\ldots') + ', so ' + M('999x = ' + n + ' \\Rightarrow x = \\frac{' + n + '}{999}' + (frac(n, 999) === '\\frac{' + n + '}{999}' ? '' : ' = ' + frac(n, 999))));
  });

  /* ---------- PERCENTAGES ---------- */
  add('percentages', [1], function () {
    var p = pick([12.5, 17.5, 15, 35, 45, 7.5, 2.5]), A = 40 * ri(2, 20);
    return q1('Work out ' + p + '% of ' + money(A) + '.', 2, money(A * p / 100, true));
  });
  add('percentages', [1], function () {
    var d = pick([20, 25, 40, 50]), n = ri(1, d - 1);
    return { parts: [
      { q: 'Write ' + M('\\frac{' + n + '}{' + d + '}') + ' as a percentage.', m: 1, a: num(n / d * 100) + '%' },
      { q: 'Write ' + num(n / d) + ' as a fraction in its simplest form.', m: 1, a: M(frac(n, d)) }
    ] };
  });
  add('percentages', [2], function () {
    var A = ri(20, 200), B = A + ri(-40, 60); if (B === A) B += 5; if (B <= 0) B = A + 10;
    return q1('The price of a coat changed from ' + money(A) + ' to ' + money(B) + '.<br>Work out the percentage ' + (B > A ? 'increase' : 'decrease') + '. Give your answer correct to 1 decimal place.', 3,
      M('\\frac{' + Math.abs(B - A) + '}{' + A + '} \\times 100') + ' = ' + (Math.abs(B - A) / A * 100).toFixed(1) + '%');
  });
  add('percentages', [2], function () {
    var P = 100 * ri(5, 60), r = pick([2, 2.5, 3, 4, 4.5, 5]), n = ri(2, 7);
    return q1('Jo invests ' + money(P) + ' for ' + n + ' years at ' + r + '% per year simple interest.<br>Work out the total interest she earns.', 2, money(P * r / 100 * n, true));
  });
  add('percentages', [3], function () {
    var p = pick([10, 20, 25, 30, 40]), q = pick([10, 20, 25, 30, 40]), f = (1 + p / 100) * (1 - q / 100), ch = Math.round((f - 1) * 10000) / 100;
    return q1('The price of a TV is increased by ' + p + '%. The new price is then reduced by ' + q + '%.<br>Work out the overall percentage change in the price. State whether it is an increase or a decrease.', 3,
      M((100 + p) / 100 + ' \\times ' + (100 - q) / 100 + ' = ' + Math.round(f * 10000) / 10000) + ': ' + (ch === 0 ? 'no change' : Math.abs(ch) + '% ' + (ch > 0 ? 'increase' : 'decrease')));
  });
  add('percentages', [3], function () {
    var O = 5 * ri(8, 80), S = O * 1.2;
    return q1('The price of a printer is ' + money(S, true) + '. This price includes VAT at 20%.<br>Work out the price of the printer before VAT was added.', 3, M(num(S) + ' \\div 1.2') + ' = ' + money(O, true));
  });

  /* ---------- INDICES, PRIMES, STANDARD FORM ---------- */
  add('indices', [1], function () {
    var b = ri(2, 5), e = b === 2 ? ri(4, 7) : ri(3, 4), sq = ri(6, 15), cb = ri(2, 6);
    return { parts: [
      { q: 'Work out ' + M(b + '^{' + e + '}') + '.', m: 1, a: num(Math.pow(b, e)) },
      { q: 'Work out ' + M('\\sqrt{' + sq * sq + '}') + '.', m: 1, a: String(sq) },
      { q: 'Work out ' + M('\\sqrt[3]{' + cb * cb * cb + '}') + '.', m: 1, a: String(cb) }
    ] };
  });
  function pfd(n) { var f = {}, p = 2; while (n > 1) { while (n % p === 0) { f[p] = (f[p] || 0) + 1; n /= p; } p++; } return f; }
  function pfdStr(f) { return Object.keys(f).map(function (p) { return f[p] > 1 ? p + '^{' + f[p] + '}' : p; }).join(' \\times '); }
  add('indices', [1, 2], function () {
    var n = pick([2, 3]) * pick([2, 4, 8]) * pick([3, 5, 9, 7]) * pick([1, 5, 7, 11]);
    return q1('Write ' + num(n) + ' as a product of its prime factors. Give your answer in index form.', 2, M(pfdStr(pfd(n))));
  });
  add('indices', [2], function () {
    var h = pick([4, 6, 8, 12, 14, 15]), a = h * pick([2, 3, 5]), b = h * pick([7, 4, 9]); while (gcd(a, b) !== h) b = h * pick([7, 11, 13]);
    var L = lcm(a, b);
    return { parts: [
      { q: 'Find the highest common factor (HCF) of ' + a + ' and ' + b + '.', m: 2, a: String(h) },
      { q: 'Find the lowest common multiple (LCM) of ' + a + ' and ' + b + '.', m: 2, a: num(L) }
    ] };
  });
  add('indices', [2], function () {
    var A = ri(11, 99), B = ri(11, 99); if (A % 10 === 0) A++; if (B % 10 === 0) B++;
    var m = ri(3, 12), n = ri(-6, 6), P = A * B, s = String(P).replace(/0+$/, ''), exp = m + n + String(P).length - 3;
    var mant = s.length > 1 ? s[0] + '.' + s.slice(1) : s;
    return q1('Work out ' + M('\\frac{' + mant + ' \\times 10^{' + exp + '}}{' + A / 10 + ' \\times 10^{' + m + '}}') + '.<br>Give your answer in standard form.', 2, M(B / 10 + ' \\times 10^{' + n + '}'));
  });
  add('indices', [2, 3], function () {
    var a = ri(3, 9), b = ri(1, 4), c = ri(1, a - 1), d = ri(2, 7), k = ri(2, 6), l = ri(2, 5) * k;
    return q1('Simplify fully ' + M('\\frac{' + l + 'x^{' + a + '}y^{' + b + '}}{' + k + 'x^{' + c + '}y^{' + (b + d) + '}}') + '.', 2, M('\\frac{' + l / k + 'x^{' + (a - c) + '}}{y^{' + d + '}}').replace('x^{1}', 'x').replace('y^{1}', 'y'));
  });
  add('indices', [3], function () {
    var b = pick([2, 3]), k = ri(2, 3), q = ri(2, 4), p = ri(-3, 4);
    return q1('Solve ' + M(b + '^{x' + sg(p) + '} = ' + Math.pow(b, k) + '^{' + q + '}').replace('+ 0', '') + '.', 3, M(b + '^{x' + sg(p) + '} = ' + b + '^{' + k * q + '} \\Rightarrow x = ' + (k * q - p)).replace(/\+ 0/g, ''));
  });
  add('indices', [3], function () {
    var a = ri(11, 99) / 10, b = ri(11, 99) / 10, m = ri(4, 9), n = m - ri(1, 2);
    var v = a * Math.pow(10, m) + b * Math.pow(10, n), e = Math.floor(Math.log10(v)), mant = Math.round(v / Math.pow(10, e) * 10000) / 10000;
    return q1('Work out ' + M('(' + a + ' \\times 10^{' + m + '}) + (' + b + ' \\times 10^{' + n + '})') + '.<br>Give your answer in standard form.', 2, M(num(mant) + ' \\times 10^{' + e + '}'));
  });

  /* ---------- SURDS ---------- */
  add('surds', [2], function () {
    var m = pick([2, 3, 5, 6, 7]), a = ri(2, 5), b = ri(2, 5);
    return q1('Simplify ' + M('\\sqrt{' + a * a * m + '} \\times \\sqrt{' + b * b * m + '}') + '.', 2, M(String(a * b * m)));
  });
  add('surds', [2, 3], function () {
    var a = ri(2, 6), m = pick([2, 3, 5, 7]);
    return q1('Show that ' + M('(' + a + ' + \\sqrt{' + m + '})^2 - (' + a + ' - \\sqrt{' + m + '})^2 = ' + 4 * a + '\\sqrt{' + m + '}') + '.', 3,
      M('(' + (a * a + m) + ' + ' + 2 * a + '\\sqrt{' + m + '}) - (' + (a * a + m) + ' - ' + 2 * a + '\\sqrt{' + m + '}) = ' + 4 * a + '\\sqrt{' + m + '}'));
  });
  add('surds', [3], function () {
    var a = ri(2, 5), m = pick([2, 3, 5, 6, 7]); while (a * a === m) a++;
    var D_ = a * a - m, A = a * a + m, B = 2 * a, k = gcd(gcd(A, B), Math.abs(D_));
    var top = (A / k) + ' + ' + (B / k === 1 ? '' : B / k) + '\\sqrt{' + m + '}', den = D_ / k;
    var ans = den === 1 ? top : den === -1 ? '-(' + top + ')' : '\\frac{' + top + '}{' + den + '}';
    return q1('Rationalise the denominator and simplify ' + M('\\frac{' + a + ' + \\sqrt{' + m + '}}{' + a + ' - \\sqrt{' + m + '}}') + '.', 3, M(ans));
  });
  add('surds', [3], function () {
    var a = ri(2, 6), c = ri(3, 6), b = pick([2, 3, 5, 7].filter(function (v) { return v < c * c; }));
    var cons = a * c - b, coef = c - a;
    return q1('A rectangle has length ' + M('(' + a + ' + \\sqrt{' + b + '})') + ' cm and width ' + M('(' + c + ' - \\sqrt{' + b + '})') + ' cm.<br>Work out the area of the rectangle. Give your answer in the form ' + M('p + q\\sqrt{' + b + '}') + '.', 3,
      M(cons + (coef === 0 ? '' : (coef < 0 ? ' - ' : ' + ') + (Math.abs(coef) === 1 ? '' : Math.abs(coef)) + '\\sqrt{' + b + '}')) + ' cm²');
  });

  /* ---------- RATIO AND PROPORTION ---------- */
  add('ratio', [1], function () {
    var r = [ri(1, 5), ri(1, 5), ri(1, 7)], k = gcd(gcd(r[0], r[1]), r[2]); r = r.map(function (v) { return v / k; });
    var m = ri(2, 12);
    return q1('Write the ratio ' + r.map(function (v) { return v * m; }).join(' : ') + ' in its simplest form.', 1, r.join(' : '));
  });
  add('ratio', [1], function () {
    var p, q, f, b; do { p = pick([4, 6, 8]); q = pick([10, 12, 15, 20, 3, 5]); f = 50 * ri(3, 10); b = 25 * ri(2, 8); } while ((2 * f * q) % p || (2 * b * q) % p || p === q);
    return q1('A recipe for ' + p + ' people uses ' + f + ' g of flour and ' + b + ' g of butter.<br>How much flour and butter are needed for ' + q + ' people?', 2, 'Flour ' + num(f / p * q) + ' g, butter ' + num(b / p * q) + ' g');
  });
  add('ratio', [2], function () {
    var nA = pick([4, 6, 8]), nB = pick([10, 12, 15]), pA = ri(150, 400) / 100, unitA = pA / nA, unitB = unitA * pick([0.9, 0.95, 1.05, 1.1]), pB = Math.round(unitB * nB * 100) / 100;
    var better = pA / nA < pB / nB ? 'A' : 'B';
    return q1('Pack ' + M('A') + ' contains ' + nA + ' batteries and costs ' + money(pA, true) + '. Pack ' + M('B') + ' contains ' + nB + ' batteries and costs ' + money(pB, true) + '.<br>Which pack is the better value for money? You must show your working.', 3,
      'A: ' + (pA / nA * 100).toFixed(1) + 'p each; B: ' + (pB / nB * 100).toFixed(1) + 'p each. Pack ' + better + ' is better value.');
  });
  add('ratio', [2], function () {
    var a = ri(1, 7), b = ri(1, 9); while (gcd(a, b) > 1 || a === b) b = ri(1, 9);
    return q1('The ratio of red counters to blue counters in a bag is ' + a + ' : ' + b + '.<br>What fraction of the counters are red?', 1, M(frac(a, a + b)));
  });
  add('ratio', [3], function () {
    var a = ri(2, 5), c = ri(a + 1, 8); while (gcd(a, c) > 1) c = ri(a + 1, 9);
    var k = ri(2, 8), boys = a * k, girls = c * k, extra = girls - boys;
    return q1('In a club, the ratio of boys to girls is ' + a + ' : ' + c + '. After ' + extra + ' more boys join, the numbers of boys and girls are equal.<br>How many people were in the club before the new boys joined?', 3, M('(' + c + ' - ' + a + ')k = ' + extra + ' \\Rightarrow k = ' + k) + '; ' + (boys + girls) + ' people');
  });
  add('ratio', [2, 3], function () {
    var w1 = pick([3, 4, 6, 8, 10, 12]), d1 = pick([4, 5, 6, 8, 10, 12, 15]), total = w1 * d1, opts = [];
    for (var w = 2; w <= 30; w++) if (total % w === 0 && w !== w1) opts.push(w);
    var w2 = pick(opts);
    return q1(w1 + ' builders take ' + d1 + ' days to build a wall. How many days would ' + w2 + ' builders take, working at the same rate?', 2, M(w1 + ' \\times ' + d1 + ' \\div ' + w2 + ' = ' + total / w2) + ' days');
  });

  /* ---------- BOUNDS ---------- */
  add('bounds', [1, 2], function () {
    var x = ri(11, 99) / 10;
    return q1(M('x') + ' is truncated to 1 decimal place. The result is ' + x.toFixed(1) + '.<br>Write down the error interval for ' + M('x') + '.', 2, M(x.toFixed(1) + ' \\le x < ' + (x + 0.1).toFixed(1)));
  });
  add('bounds', [2], function () {
    var s = ri(4, 20), unit = pick([1, 0.1]);
    var lb = unit === 1 ? s - 0.5 : s / 10 - 0.05;
    return q1('The length of each side of a square is ' + (unit === 1 ? s : (s / 10).toFixed(1)) + ' cm, correct to the nearest ' + (unit === 1 ? 'centimetre' : 'millimetre') + '.<br>Work out the lower bound for the perimeter of the square.', 2, M('4 \\times ' + num(Math.round(lb * 100) / 100) + ' = ' + num(Math.round(4 * lb * 100) / 100)) + ' cm');
  });
  add('bounds', [2, 3], function () {
    var a = ri(30, 90), b = ri(10, a - 5);
    return q1('A piece of wood is ' + a + ' cm long, correct to the nearest cm. A piece ' + b + ' cm long, correct to the nearest cm, is cut off.<br>Work out the upper bound for the length of wood remaining.', 2, M((a + 0.5) + ' - ' + (b - 0.5) + ' = ' + (a - b + 1)) + ' cm');
  });
  add('bounds', [3], function () {
    var m = ri(200, 900), v = ri(20, 90);
    return q1('The mass of a stone is ' + m + ' g, correct to the nearest gram. Its volume is ' + v + ' cm³, correct to the nearest cm³.<br>Work out the lower bound for the density of the stone. Give your answer correct to 3 significant figures.', 3,
      M('\\frac{' + (m - 0.5) + '}{' + (v + 0.5) + '}') + ' = ' + sf((m - 0.5) / (v + 0.5), 3) + ' g/cm³');
  });

  /* ---------- COMPOUND MEASURES ---------- */
  add('compound-measures', [1], function () {
    var sp = pick([40, 48, 50, 60, 64, 72, 80]), mins = pick([45, 75, 90, 105, 135, 150]), dist = sp * mins / 60;
    return q1('A coach travels ' + num(dist) + ' km at an average speed of ' + sp + ' km/h.<br>How long does the journey take? Give your answer in hours and minutes.', 2, Math.floor(mins / 60) + (Math.floor(mins / 60) === 1 ? ' hour ' : ' hours ') + (mins % 60) + ' minutes');
  });
  add('compound-measures', [1, 2], function () {
    var dens = pick([2.7, 7.9, 8.9, 0.9, 1.5]), V = ri(10, 80), m = Math.round(dens * V * 10) / 10;
    return q1('A block has a mass of ' + num(m) + ' g. The density of the material is ' + dens + ' g/cm³.<br>Work out the volume of the block.', 2, M(num(m) + ' \\div ' + dens) + ' = ' + num(Math.round(m / dens * 100) / 100) + ' cm³');
  });
  add('compound-measures', [2], function () {
    var d1 = ri(20, 90), s1 = pick([30, 40, 45, 60]), d2 = ri(20, 90), t2 = pick([0.5, 1, 1.5, 2]);
    var t1 = d1 / s1, avg = (d1 + d2) / (t1 + t2);
    return q1('Ali drives ' + d1 + ' km at an average speed of ' + s1 + ' km/h. He then drives a further ' + d2 + ' km in ' + num(t2) + ' hour' + (t2 === 1 ? '' : 's') + '.<br>Work out his average speed for the whole journey. Give your answer correct to 3 significant figures.', 4,
      M('\\frac{' + (d1 + d2) + '}{' + sf(t1, 4) + ' + ' + t2 + '}') + ' = ' + sf(avg, 3) + ' km/h');
  });
  add('compound-measures', [2], function () {
    var cap = 50 * ri(4, 40), rate = pick([5, 8, 10, 12, 15, 20, 25]), mins = cap / rate;
    return q1('A tank holds ' + num(cap) + ' litres of water. It is filled at a rate of ' + rate + ' litres per minute.<br>How long does it take to fill the empty tank? Give your answer in minutes and seconds if necessary.', 2, Math.floor(mins) + ' minutes' + (mins % 1 ? ' ' + Math.round(mins % 1 * 60) + ' seconds' : ''));
  });
  add('compound-measures', [3], function () {
    var a = pick([25, 30, 35, 40]), b = pick([20, 25, 30, 32]), P = ri(80, 400);
    var area = a * b / 10000, F = P * area;
    return q1('A box exerts a pressure of ' + P + ' N/m² on the floor. The base of the box is ' + a + ' cm by ' + b + ' cm.<br>Work out the force exerted by the box.', 3, M(P + ' \\times ' + area) + ' = ' + sf(F, 3) + ' N');
  });
  add('compound-measures', [3], function () {
    var mps = ri(12, 35), kmh = pick([50, 60, 70, 80, 90, 100, 110]);
    var conv = mps * 3.6;
    return q1('A cheetah runs at ' + mps + ' m/s. A car travels at ' + kmh + ' km/h.<br>Which is faster? You must show your working.', 3, M(mps + ' \\times 3.6 = ' + num(Math.round(conv * 10) / 10)) + ' km/h, so the ' + (conv > kmh ? 'cheetah' : conv < kmh ? 'car' : 'two are equally fast; neither') + ' is faster.');
  });

  /* ---------- EXPANDING AND FACTORISING ---------- */
  add('expand-factorise', [1], function () {
    var a, c, e, b = ri(2, 9), d = ri(2, 9); do { a = ri(3, 9); c = ri(1, a - 1); e = ri(1, 6); } while (a - c - e === 0);
    var pc = a - c - e;
    return q1('Simplify ' + M(a + 'p + ' + b + 'q - ' + c + 'p + ' + d + 'q - ' + e + 'p') + '.', 2, M((pc === 1 ? '' : pc === -1 ? '-' : pc) + 'p + ' + (b + d) + 'q'));
  });
  add('expand-factorise', [1, 2], function () {
    var a = ri(2, 6), b = nz(-6, 6), c = ri(2, 6), d = nz(-6, 6);
    return q1('Expand and simplify ' + M(a + br(1, b) + ' + ' + c + br(1, d)) + '.', 2, M(poly([a + c, a * b + c * d])));
  });
  add('expand-factorise', [2], function () {
    var p = ri(2, 4), q = nz(-6, 6), r = nz(-6, 6);
    return q1('Expand and simplify ' + M(br(p, q) + br(1, r)) + '.', 2, M(poly([p, p * r + q, q * r])));
  });
  add('expand-factorise', [3], function () {
    var k = ri(2, 5), a = ri(2, 9);
    return q1('Factorise fully ' + M(k + 'x^2 - ' + k * a * a) + '.', 2, M(k + '(x + ' + a + ')(x - ' + a + ')'));
  });
  add('expand-factorise', [3], function () {
    var p, q, r; do { p = nz(-6, 6); q = nz(-6, 6); r = nz(-6, 6); } while (p === r || q === -p || q === -r);
    return q1('Simplify fully ' + M('\\frac{' + poly([1, q - p, -p * q]) + '}{' + poly([1, q - r, -q * r]) + '}') + '.', 3, M('\\frac{' + poly([1, -p]) + '}{' + poly([1, -r]) + '}'));
  });

  /* ---------- LINEAR EQUATIONS ---------- */
  add('linear-equations', [1], function () {
    var m = ri(2, 9), a = ri(1, 20), x = ri(2, 15);
    return q1('Sam thinks of a number. He multiplies it by ' + m + ' and then adds ' + a + '. His answer is ' + (m * x + a) + '.<br>What number did Sam think of?', 2, String(x));
  });
  add('linear-equations', [1, 2], function () {
    var x = ri(3, 12), a = ri(1, 5), b = ri(1, 6), P = 2 * ((2 * x + a) + (x + b));
    return q1('A rectangle has length ' + M('(2x + ' + a + ')') + ' cm and width ' + M('(x + ' + b + ')') + ' cm. Its perimeter is ' + P + ' cm.<br>Work out the value of ' + M('x') + '.', 3, M('6x + ' + 2 * (a + b) + ' = ' + P + ' \\Rightarrow x = ' + x));
  });
  add('linear-equations', [2], function () {
    var p = pick([2, 3, 4, 5]), q = pick([3, 4, 5, 6]); while (q === p) q = pick([3, 4, 6, 7]);
    var L = lcm(p, q), x = L * ri(1, 6), r = x / p + x / q;
    return q1('Solve ' + M('\\frac{x}{' + p + '} + \\frac{x}{' + q + '} = ' + r) + '.', 3, M('x = ' + x));
  });
  add('linear-equations', [3], function () {
    var x, k, b, a; do { x = nz(-6, 9); k = nz(-4, 5); b = nz(-6, 6); a = k * (x + b) - 2 * x; } while (x + b === 0 || k === 2 || a === 0);
    return q1('Solve ' + M('\\frac{' + poly([2, a]) + '}{' + poly([1, b]) + '} = ' + k) + '.', 3, M('x = ' + x));
  });

  /* ---------- SIMULTANEOUS EQUATIONS ---------- */
  add('simultaneous', [1], function () {
    var x = ri(2, 15), y = ri(1, x - 1);
    return q1('The sum of two numbers is ' + (x + y) + '. The difference between them is ' + (x - y) + '.<br>Find the two numbers.', 3, x + ' and ' + y);
  });
  add('simultaneous', [1, 2], function () {
    var x = nz(-5, 6), m = nz(-3, 4), c = nz(-6, 6), y = m * x + c, a = ri(1, 5), b = nz(-4, 4);
    return q1('Solve the simultaneous equations ' + M('y = ' + poly([m, c])) + ' and ' + M((a === 1 ? '' : a) + 'x' + (b < 0 ? ' - ' : ' + ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y = ' + (a * x + b * y)) + '.', 3, M('x = ' + x + ',\\ y = ' + y));
  });
  add('simultaneous', [2, 3], function () {
    var x0 = ri(-3, 4), y0 = ri(-3, 5), m1 = pick([1, 2, -1, 3]), m2 = pick([-2, -1, 0.5, 1]); while (m1 === m2) m2 = -m2 - 1;
    var c1 = y0 - m1 * x0, c2 = y0 - m2 * x0;
    var p = D.plane({ xmin: -5, xmax: 5, ymin: -5, ymax: 7, w: 300, h: 320, grid: true, ticks: true });
    var s = p.svg + p.curve(function (x) { return m1 * x + c1; }, -5, 5) + p.curve(function (x) { return m2 * x + c2; }, -5, 5, 'accentdash');
    function eq(m, c) { return 'y = ' + (m === 1 ? '' : m === -1 ? '-' : m === 0.5 ? '\\tfrac{1}{2}' : m) + 'x' + (c === 0 ? '' : sg(c)); }
    return q1('The graphs of ' + M(eq(m1, c1)) + ' and ' + M(eq(m2, c2)) + ' are drawn on the grid.' + D.svg(300, 320, s, 'Two straight lines', true) + 'Use the graphs to solve the simultaneous equations.', 2, M('x = ' + x0 + ',\\ y = ' + y0));
  });
  add('simultaneous', [3], function () {
    var R = pick([5, 10, 13]), base = R === 13 ? [5, 12] : R === 10 ? [6, 8] : [3, 4];
    var s = base[0] + base[1];
    return q1('Solve the simultaneous equations ' + M('x^2 + y^2 = ' + R * R) + ' and ' + M('x + y = ' + s) + '.', 5, M('x = ' + base[0] + ',\\ y = ' + base[1]) + ' or ' + M('x = ' + base[1] + ',\\ y = ' + base[0]));
  });

  /* ---------- QUADRATICS ---------- */
  add('quadratics', [1], function () {
    var k = ri(2, 12);
    return q1('Solve ' + M('x^2 = ' + k * k) + '.', 1, M('x = ' + k + ' \\text{ or } x = -' + k));
  });
  add('quadratics', [1, 2], function () {
    var b = nz(-9, 9);
    return q1('Solve ' + M(poly([1, b, 0]) + ' = 0') + '.', 2, M('x(x' + sg(b) + ') = 0 \\Rightarrow x = 0 \\text{ or } x = ' + (-b)));
  });
  add('quadratics', [2], function () {
    var x = ri(3, 12), k = ri(2, 7), A = x * (x + k);
    return q1('A rectangle has width ' + M('x') + ' cm and length ' + M('(x + ' + k + ')') + ' cm. Its area is ' + A + ' cm².<br>Work out the value of ' + M('x') + '.', 3, M(poly([1, k, -A]) + ' = 0 \\Rightarrow x = ' + x) + ' (reject the negative solution)');
  });
  add('quadratics', [3], function () {
    var p = nz(-5, 5), c; do { c = ri(-10, 8); } while (p * p - c <= 0 || Math.sqrt(p * p - c) === Math.round(Math.sqrt(p * p - c)));
    return q1('By completing the square, solve ' + M(poly([1, 2 * p, c]) + ' = 0') + '. Give your answers in surd form.', 4, M(br(1, p) + '^2 = ' + (p * p - c) + ' \\Rightarrow x = ' + (-p) + ' \\pm ' + surd(p * p - c)));
  });

  /* ---------- INEQUALITIES ---------- */
  add('inequalities', [1], function () {
    var lo = ri(-4, 1), hi = ri(lo + 2, 4), lc = Math.random() < 0.5, hc = Math.random() < 0.5, one = Math.random() < 0.3;
    if (one) return q1('Write down the inequality shown on the number line.' + D.numberLine(-5, 5, lo, lc, null, false), 1, M('x ' + (lc ? '\\ge ' : '> ') + lo));
    return q1('Write down the inequality shown on the number line.' + D.numberLine(-5, 5, lo, lc, hi, hc), 2, M(lo + (lc ? ' \\le ' : ' < ') + 'x' + (hc ? ' \\le ' : ' < ') + hi));
  });
  add('inequalities', [2], function () {
    var a = ri(2, 5), b = nz(-6, 6), lo = ri(-3, 1), hi = ri(lo + 2, 6), L = a * lo + b, H = a * hi + b;
    var ints = []; for (var n = lo + 1; n <= hi; n++) ints.push(n);
    return { parts: [
      { q: 'Solve ' + M(L + ' < ' + poly([a, b]) + ' \\le ' + H) + '.', m: 2, a: M(lo + ' < x \\le ' + hi) },
      { q: 'Write down all the integer values of ' + M('x') + ' that satisfy the inequality.', m: 1, a: M(ints.join(',\\ ')) }
    ] };
  });
  add('inequalities', [2, 3], function () {
    var k = ri(2, 10), sq = Math.random() < 0.5;
    return q1('Solve ' + M('x^2 ' + (sq ? '<' : '\\ge') + ' ' + k * k) + '.', 2, M(sq ? '-' + k + ' < x < ' + k : 'x \\le -' + k + ' \\text{ or } x \\ge ' + k));
  });
  add('inequalities', [3], function () {
    var a = ri(1, 2), c = ri(a + 4, 8);
    var pts = []; for (var x = -1; x <= 7; x++) for (var y = -1; y <= 7; y++) if (y > a && x + y < c && y < 2 * x) pts.push('(' + x + ', ' + y + ')');
    var p = D.plane({ xmin: -1, xmax: 7, ymin: -1, ymax: 7, w: 300, h: 300, grid: true, ticks: true });
    var s = p.svg + p.curve(function () { return a; }, -1, 7, 'accentdash') + p.curve(function (x) { return c - x; }, -1, 7, 'accentdash') + p.curve(function (x) { return 2 * x; }, -1, 7, 'accentdash');
    return q1('The lines ' + M('y = ' + a) + ', ' + M('x + y = ' + c) + ' and ' + M('y = 2x') + ' are drawn on the grid.' + D.svg(300, 300, s, 'Region bounded by lines', true) + 'List all the points with integer coordinates that satisfy ' + M('y > ' + a) + ', ' + M('x + y < ' + c) + ' and ' + M('y < 2x') + '.', 3, pts.join(', '));
  });
  add('inequalities', [3], function () {
    var p = pick([2, 3, 4]), q = pick([3, 5, 6]), a = ri(1, 6), b = ri(1, 6);
    // (x - a)/p > (x + b)/q  ->  q(x - a) > p(x + b) -> (q - p)x > qa + pb
    while (q === p) q = pick([5, 7]);
    var co = q - p, rhs = q * a + p * b;
    return q1('Solve ' + M('\\frac{x - ' + a + '}{' + p + '} > \\frac{x + ' + b + '}{' + q + '}') + '.', 3, M(co > 0 ? 'x > ' + frac(rhs, co) : 'x < ' + frac(rhs, co)));
  });

  /* ---------- REARRANGING ---------- */
  add('rearranging', [1], function () {
    return pick([
      q1('Make ' + M('h') + ' the subject of ' + M('A = \\frac{1}{2}bh') + '.', 2, M('h = \\frac{2A}{b}')),
      q1('Make ' + M('r') + ' the subject of ' + M('C = 2\\pi r') + '.', 2, M('r = \\frac{C}{2\\pi}')),
      q1('Make ' + M('l') + ' the subject of ' + M('P = 2(l + w)') + '.', 2, M('l = \\frac{P}{2} - w')),
      q1('Make ' + M('c') + ' the subject of ' + M('y = mx + c') + '.', 1, M('c = y - mx'))
    ]);
  });
  add('rearranging', [2], function () {
    var a = ri(3, 8), c = ri(1, a - 1), b = ri(1, 9), d = ri(2, 6);
    return q1('Make ' + M('x') + ' the subject of ' + M(a + 'x + ' + b + ' = ' + (c === 1 ? '' : c) + 'x + ' + d + 'y') + '.', 3, M('x = \\frac{' + d + 'y - ' + b + '}{' + (a - c) + '}').replace('\\frac{' + d + 'y - ' + b + '}{1}', d + 'y - ' + b));
  });
  add('rearranging', [3], function () {
    var a = ri(1, 9), b = ri(2, 5);
    return q1('Make ' + M('x') + ' the subject of ' + M('y = \\sqrt{\\frac{x + ' + a + '}{' + b + '}}') + '.', 3, M('x = ' + b + 'y^2 - ' + a));
  });
  add('rearranging', [3], function () {
    return q1('Make ' + M('v') + ' the subject of ' + M('\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v}') + '.', 3, M('v = \\frac{uf}{u - f}'));
  });

  /* ---------- SEQUENCES ---------- */
  add('sequences', [1], function () {
    var t = pick(['add', 'sub']), a = ri(1, 9), d = ri(2, 9), r = pick([2, 3]);
    if (t === 'sub') a += 5 * d;
    var dd = t === 'add' ? d : -d, terms = [0, 1, 2, 3].map(function (i) { return a + i * dd; });
    var next = [a + 4 * dd, a + 5 * dd];
    return { stem: 'Here are the first four terms of a sequence: ' + M(terms.join(',\\ ')), parts: [
      { q: 'Write down the next two terms.', m: 1, a: next.join(', ') },
      { q: 'Write down the term-to-term rule.', m: 1, a: t === 'add' ? 'Add ' + d : 'Subtract ' + d }
    ] };
  });
  add('sequences', [1], function () {
    var a = ri(2, 7), b = nz(-6, 8);
    return q1('The ' + M('n') + 'th term of a sequence is ' + M(poly([a, b], 'n')) + '. Write down the first three terms.', 2, [1, 2, 3].map(function (n) { return a * n + b; }).join(', '));
  });
  add('sequences', [2], function () {
    var a = ri(1, 6), b = ri(1, 8), t = [a, b]; for (var i = 2; i < 7; i++) t.push(t[i - 1] + t[i - 2]);
    return q1('The rule for a sequence is: each term is the sum of the two previous terms. The first two terms are ' + a + ' and ' + b + '.<br>Work out the 7th term.', 2, String(t[6]));
  });
  add('sequences', [3], function () {
    var a = ri(1, 3), b = ri(-3, 5), c = ri(-5, 5), n0 = ri(6, 14), target = a * n0 * n0 + b * n0 + c;
    return q1('The ' + M('n') + 'th term of a sequence is ' + M(poly([a, b, c], 'n')) + '.<br>Which term of the sequence is equal to ' + target + '?', 3, M(poly([a, b, c - target], 'n') + ' = 0 \\Rightarrow n = ' + n0) + ' (the ' + n0 + 'th term)');
  });

  /* ---------- FUNCTIONS ---------- */
  add('functions', [1], function () {
    var a = ri(2, 7), b = nz(-9, 9), k = ri(-3, 6), y = ri(-5, 30);
    var x = (y - b) / a; if (x !== Math.round(x)) { x = ri(1, 6); y = a * x + b; }
    return { stem: M('\\mathrm{f}(x) = ' + poly([a, b])), parts: [
      { q: 'Find ' + M('\\mathrm{f}(' + k + ')') + '.', m: 1, a: String(a * k + b) },
      { q: 'Solve ' + M('\\mathrm{f}(x) = ' + y) + '.', m: 2, a: M('x = ' + x) }
    ] };
  });
  add('functions', [1, 2], function () {
    var c = nz(-9, 9), k = nz(-5, 5), m = ri(2, 4);
    return { stem: M('\\mathrm{g}(x) = x^2' + sg(c)), parts: [
      { q: 'Find ' + M('\\mathrm{g}(' + k + ')') + '.', m: 1, a: String(k * k + c) },
      { q: 'Find ' + M('\\mathrm{g}(' + m + 'x)') + ' in terms of ' + M('x') + '.', m: 1, a: M(m * m + 'x^2' + sg(c)) }
    ] };
  });
  add('functions', [2], function () {
    var a = ri(2, 6), b = nz(-9, 9), c = ri(2, 5);
    var k = gcd(gcd(c, Math.abs(b)), a), cc = c / k, bb = b / k, aa = a / k;
    var inv = aa === 1 ? poly([cc, -bb]) : '\\frac{' + poly([cc, -bb]) + '}{' + aa + '}';
    return q1(M('\\mathrm{f}(x) = \\frac{' + poly([a, b]) + '}{' + c + '}') + '. Find ' + M('\\mathrm{f}^{-1}(x)') + '.', 2, M('\\mathrm{f}^{-1}(x) = ' + inv));
  });
  add('functions', [2, 3], function () {
    var a = ri(2, 12), b = nz(-5, 5), k = nz(-4, 6); while (k + b === 0) k++;
    return { stem: M('\\mathrm{g}(x) = \\frac{' + a + '}{' + poly([1, b]) + '}'), parts: [
      { q: 'Find ' + M('\\mathrm{g}(' + k + ')') + '.', m: 1, a: M(frac(a, k + b)) },
      { q: 'Which value of ' + M('x') + ' must be excluded from the domain of ' + M('\\mathrm{g}') + '?', m: 1, a: M('x = ' + (-b)) }
    ] };
  });
  add('functions', [3], function () {
    var a = ri(2, 4), b = nz(-6, 6), x = nz(-4, 5), k = a * (a * x + b) + b;
    return q1(M('\\mathrm{f}(x) = ' + poly([a, b])) + '. Solve ' + M('\\mathrm{ff}(x) = ' + k) + '.', 3, M('\\mathrm{ff}(x) = ' + poly([a * a, a * b + b]) + ' = ' + k + ' \\Rightarrow x = ' + x));
  });
  add('functions', [3], function () {
    var r1 = ri(-5, 0), r2 = ri(1, 5), a = ri(2, 3), c = r1 * r2;
    // f(x) = a x + c? use f(x) = x + p, g(x) = x^2 : fg(x) = x^2 + p ; gf(x) = (x + p)^2
    var p = nz(-4, 4);
    var A = 2 * p, B = p * p - p; // gf - fg = 2px + p^2 - p = 0 -> x = (p - p^2)/(2p) = (1 - p)/2
    return q1(M('\\mathrm{f}(x) = x' + sg(p)) + ' and ' + M('\\mathrm{g}(x) = x^2') + '. Solve ' + M('\\mathrm{fg}(x) = \\mathrm{gf}(x)') + '.', 4,
      M('x^2' + sg(p) + ' = ' + br(1, p) + '^2 \\Rightarrow ' + A + 'x' + (B === 0 ? '' : sg(B)) + ' = 0 \\Rightarrow x = ' + frac(1 - p, 2)));
  });

  /* ---------- STRAIGHT LINES ---------- */
  add('straight-lines', [1, 2], function () {
    var a = pick([2, 3, 4]), b = pick([2, 3, 4, 6]), c = a * b * ri(1, 3);
    return q1('A line has equation ' + M(a + 'x + ' + b + 'y = ' + c) + '.<br>Find the gradient and the ' + M('y') + '-intercept of the line.', 3, 'Gradient ' + M(frac(-a, b)) + ', ' + M('y') + '-intercept ' + M(frac(c, b)));
  });
  add('straight-lines', [2], function () {
    var m = nz(-4, 5), c = ri(-6, 6), px = ri(-4, 4), py = ri(-6, 8);
    return q1('Find the equation of the line that is parallel to ' + M('y = ' + poly([m, c])) + ' and passes through ' + M('(' + px + ',\\ ' + py + ')') + '.', 3, M('y = ' + poly([m, py - m * px])));
  });
  add('straight-lines', [3], function () {
    var a = pick([2, 3, 4, 5]), b = pick([2, 3, 4, 6]), k = ri(1, 4), c = a * b * k;
    return q1('The line ' + M(a + 'x + ' + b + 'y = ' + c) + ' crosses the ' + M('x') + '-axis at ' + M('P') + ' and the ' + M('y') + '-axis at ' + M('Q') + '.<br>Work out the area of triangle ' + M('OPQ') + ', where ' + M('O') + ' is the origin.', 4,
      M('P(' + b * k + ',\\ 0),\\ Q(0,\\ ' + a * k + ')') + '; area ' + M('= \\tfrac{1}{2} \\times ' + b * k + ' \\times ' + a * k + ' = ' + num(a * b * k * k / 2)));
  });

  /* ---------- DIFFERENTIATION ---------- */
  add('differentiation', [2], function () {
    var b = nz(-8, 8), k = nz(-6, 10), x = (k - b) / 2;
    return q1('The curve ' + M('y = ' + poly([1, b, 0])) + ' has gradient ' + k + ' at the point ' + M('P') + '.<br>Find the coordinates of ' + M('P') + '.', 3, M('2x' + sg(b) + ' = ' + k + ' \\Rightarrow x = ' + num(x)) + ', so ' + M('P(' + num(x) + ',\\ ' + num(x * x + b * x) + ')'));
  });
  add('differentiation', [2, 3], function () {
    var a = nz(-3, 3), b = nz(-6, 6), c = ri(-8, 8), k = nz(-3, 3), m = 2 * a * k + b, y0 = a * k * k + b * k + c;
    return q1('Find the equation of the tangent to the curve ' + M('y = ' + poly([a, b, c])) + ' at the point where ' + M('x = ' + k) + '.', 4, 'Gradient ' + m + ', point ' + M('(' + k + ',\\ ' + y0 + ')') + '; ' + M('y = ' + poly([m, y0 - m * k])));
  });
  add('differentiation', [3], function () {
    var a = pick([1, 2, -1, -2]), h = nz(-4, 4), k = ri(-6, 6), b = -2 * a * h, c = a * h * h + k;
    return q1('Use differentiation to find the coordinates of the turning point of ' + M('y = ' + poly([a, b, c])) + '.', 3, M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + poly([2 * a, b]) + ' = 0 \\Rightarrow x = ' + h) + '; turning point ' + M('(' + h + ',\\ ' + k + ')'));
  });
  add('differentiation', [3], function () {
    var P = 4 * ri(10, 60);
    return q1('A farmer has ' + P + ' m of fencing to make a rectangular pen against a straight wall. The wall forms one side of the pen. The width of the pen is ' + M('x') + ' m.<br>Show that the area is ' + M('A = x(' + P + ' - 2x)') + ' and find the maximum possible area.', 5,
      M('\\frac{\\mathrm{d}A}{\\mathrm{d}x} = ' + P + ' - 4x = 0 \\Rightarrow x = ' + P / 4) + '; maximum area ' + M(num(P * P / 8)) + ' m²');
  });

  /* ---------- KINEMATIC GRAPHS ---------- */
  add('kinematic-graphs', [1], function () {
    var t1 = ri(1, 3) * 10, d1 = ri(2, 5) * 2, rest = ri(1, 2) * 10, t3 = ri(1, 3) * 10, tot = t1 + rest + t3;
    var g_ = D.lineGraph([[0, 0], [t1, d1], [t1 + rest, d1], [tot, 0]], { xmax: tot + 10, ymax: d1 + 2, xstep: 10, ystep: 2, grid: true, gx: 5, gy: 1, xl: 'Time (minutes)', yl: 'Distance from home (km)' });
    return { stem: 'The distance–time graph shows Mia’s walk to the park and back.' + g_, parts: [
      { q: 'How far from home is the park?', m: 1, a: d1 + ' km' },
      { q: 'At what time, in minutes after leaving, did Mia arrive home?', m: 1, a: tot + ' minutes' },
      { q: 'Work out Mia’s average speed for the whole walk, in km/h. Do not include the time spent at the park.', m: 2, a: num(Math.round(2 * d1 / ((t1 + t3) / 60) * 100) / 100) + ' km/h' }
    ] };
  });
  add('kinematic-graphs', [1, 2], function () {
    var rate = pick([1.1, 1.2, 1.25, 1.3, 1.4]), x1 = 10 * ri(2, 8), x2 = 10 * ri(2, 8);
    var g_ = D.lineGraph([[0, 0], [100, 100 * rate]], { xmax: 100, ymax: Math.ceil(100 * rate / 20) * 20, xstep: 20, ystep: 20, grid: true, gx: 10, gy: 10, xl: 'Pounds (£)', yl: 'Euros (€)' });
    return { stem: 'The conversion graph can be used to change between pounds and euros.' + g_, parts: [
      { q: 'Use the graph to change £' + x1 + ' into euros.', m: 1, a: '€' + num(x1 * rate) },
      { q: 'Use the graph to change €' + num(x2 * rate) + ' into pounds.', m: 1, a: '£' + x2 }
    ] };
  });
  add('kinematic-graphs', [2], function () {
    var V = 2 * ri(3, 10), t1 = 5 * ri(1, 4), t2 = 5 * ri(2, 5), t3 = 5 * ri(1, 4), tot = t1 + t2 + t3;
    var g_ = D.lineGraph([[0, 0], [t1, V], [t1 + t2, V], [tot, 0]], { xmax: tot + 5, ymax: V + 4, xstep: 5, ystep: V > 12 ? 4 : 2, grid: true, gx: 5, gy: 2, xl: 'Time (s)', yl: 'Speed (m/s)' });
    return { stem: 'The speed–time graph shows the motion of a car.' + g_, parts: [
      { q: 'Work out the deceleration in the last ' + t3 + ' seconds.', m: 2, a: num(Math.round(V / t3 * 1000) / 1000) + ' m/s²' },
      { q: 'Work out the distance travelled in the last ' + t3 + ' seconds.', m: 2, a: num(V * t3 / 2) + ' m' }
    ] };
  });
  add('kinematic-graphs', [3], function () {
    var u = ri(2, 8), v = u + 2 * ri(2, 6), t = 2 * ri(2, 8);
    var g_ = D.lineGraph([[0, u], [t, v]], { xmax: t + 2, ymax: v + 4, xstep: 2, ystep: 2, grid: true, gx: 1, gy: 1, xl: 'Time (s)', yl: 'Speed (m/s)' });
    return { stem: 'The speed–time graph shows a cyclist accelerating uniformly from ' + u + ' m/s to ' + v + ' m/s.' + g_, parts: [
      { q: 'Work out the acceleration.', m: 2, a: num(Math.round((v - u) / t * 1000) / 1000) + ' m/s²' },
      { q: 'Work out the distance travelled in this time.', m: 3, a: M('\\frac{' + u + ' + ' + v + '}{2} \\times ' + t + ' = ' + (u + v) * t / 2) + ' m' }
    ] };
  });
})(typeof window !== 'undefined' ? window : globalThis);
