/* Byte Size Classroom — deeper extension questions (set 2) for GCSE / International GCSE topics.
   Problem solving, proof and generalisation, building on the core skills of each topic. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: p[2] }; }) }; }
  function sf3(x) { if (Math.abs(x - Math.round(x)) < 1e-9) return String(Math.round(x)); var s = BS.sf(x, 3); return s; }
  function F(n, d) { return frac(n, d); }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function money(x) { return '£' + x.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function divisors(n) { var d = []; for (var i = 1; i <= n; i++) if (n % i === 0) d.push(i); return d; }
  function xm(v) { return v ? '(x' + sg(-v) + ')' : 'x'; }

  /* ---------- Number ---------- */
  X('fractions', [
    function () {
      var k = pick([4, 6, 8, 9, 10, 12]), ds = divisors(k * k).filter(function (d) { return d < k; });
      var pairs = ds.map(function (d) { return '\\frac{1}{' + (k + d) + '} + \\frac{1}{' + (k + k * k / d) + '}'; });
      return Q('A unit fraction has numerator 1, for example ' + M('\\frac{1}{7}') + '.', [
        ['Show that ' + M('\\frac{1}{n} = \\frac{1}{n + 1} + \\frac{1}{n(n + 1)}') + ' for any positive integer ' + M('n') + '.', 2, 'Right side: ' + M('\\frac{n}{n(n + 1)} + \\frac{1}{n(n + 1)} = \\frac{n + 1}{n(n + 1)} = \\frac{1}{n}')],
        ['Hence write ' + M('\\frac{1}{' + k + '}') + ' as the sum of two different unit fractions.', 1, M('\\frac{1}{' + (k + 1) + '} + \\frac{1}{' + (k * (k + 1)) + '}')],
        ['Show that ' + M('\\frac{1}{k} = \\frac{1}{k + d} + \\frac{1}{k + \\frac{k^2}{d}}') + ', and explain why this gives a pair of unit fractions whenever ' + M('d') + ' is a factor of ' + M('k^2') + '.', 3, 'Combine: ' + M('\\frac{1}{k + d} + \\frac{d}{k(k + d)} = \\frac{k + d}{k(k + d)} = \\frac{1}{k}') + '; ' + M('k + \\frac{k^2}{d}') + ' is an integer when ' + M('d \\mid k^2')],
        ['Find every way of writing ' + M('\\frac{1}{' + k + '}') + ' as the sum of two different unit fractions.', 2, ds.length + ' ways: ' + pairs.map(function (p) { return M(p); }).join(', ')]
      ]);
    },
    function () {
      var a = ri(1, 8), b = ri(1, 9); while (b === a) b = ri(1, 9);
      var n1 = 10 * a + b, n2 = 10 * b + a;
      return Q('In this question ' + M('0.\\dot{a}\\dot{b}') + ' means the recurring decimal ' + M('0.abababab\\ldots') + ', where ' + M('a') + ' and ' + M('b') + ' are digits.', [
        ['Write ' + M('0.\\dot{' + a + '}\\dot{' + b + '}') + ' as a fraction in its simplest form.', 2, M('\\frac{' + n1 + '}{99} = ' + F(n1, 99))],
        ['Prove that ' + M('0.\\dot{a}\\dot{b} = \\frac{10a + b}{99}') + '.', 2, 'Let ' + M('x = 0.\\dot{a}\\dot{b}') + '; ' + M('100x - x = 10a + b') + ', so ' + M('x = \\frac{10a + b}{99}')],
        ['Hence prove that ' + M('0.\\dot{a}\\dot{b} + 0.\\dot{b}\\dot{a} = \\frac{a + b}{9}') + ', and check it for ' + M('a = ' + a + ',\\ b = ' + b) + '.', 3, M('\\frac{10a + b + 10b + a}{99} = \\frac{11(a + b)}{99} = \\frac{a + b}{9}') + '; ' + M(F(n1, 99) + ' + ' + F(n2, 99) + ' = ' + F(a + b, 9))],
        ['Find all pairs of different non-zero digits for which ' + M('0.\\dot{a}\\dot{b} + 0.\\dot{b}\\dot{a} = 1') + '.', 2, M('a + b = 9') + ': (1, 8), (2, 7), (3, 6), (4, 5) and the reverses']
      ]);
    }
  ]);

  X('percentages', [
    function () {
      var p = pick([10, 15, 20, 25, 30]), v = 20, P = ri(8, 30) * 10, A = P * (1 - p / 100) * (1 + v / 100), d2 = pick([5, 10]);
      return Q('Two shops sell the same item, priced at ' + money(P) + ' before VAT. Shop A takes ' + p + '% off and then adds VAT at ' + v + '%. Shop B adds VAT at ' + v + '% and then takes ' + p + '% off.', [
        ['Find the final price in each shop.', 2, 'Both ' + money(A)],
        ['Prove that the two final prices are always equal, whatever the discount and VAT rates.', 2, 'Both are ' + M('P \\times \\left(1 - \\frac{d}{100}\\right) \\times \\left(1 + \\frac{v}{100}\\right)') + ': multiplication is commutative.'],
        ['Shop C adds VAT and then takes off ' + (p + d2) + '%. Find the single percentage change from the pre-VAT price in Shop C.', 2, M('1.2 \\times ' + (1 - (p + d2) / 100).toFixed(2).replace(/0$/, '') + ' = ' + sf3(1.2 * (1 - (p + d2) / 100))) + ': a ' + (1.2 * (1 - (p + d2) / 100) >= 1 ? 'rise of ' + sf3((1.2 * (1 - (p + d2) / 100) - 1) * 100) : 'fall of ' + sf3((1 - 1.2 * (1 - (p + d2) / 100)) * 100)) + '%'],
        ['Find the discount Shop C would need so that the final price equals the price before VAT.', 2, M('1.2(1 - d) = 1') + ', ' + M('d = \\frac{1}{6}') + ', i.e. ' + sf3(100 / 6) + '%']
      ]);
    },
    function () {
      var r = pick([10, 20, 25, 30]), n = ri(2, 4), f = 1 - r * r / 10000, overall = Math.pow(f, n);
      return Q('A share price rises by ' + r + '% and then falls by ' + r + '%. This two-step pattern is repeated ' + n + ' times.', [
        ['Show that after one rise and one fall the price is multiplied by ' + M(sf3(f)) + '.', 2, M((1 + r / 100) + ' \\times ' + (1 - r / 100) + ' = ' + sf3(f))],
        ['Find the overall percentage change after the ' + n + ' repeats.', 2, M(sf3(f) + '^{' + n + '} = ' + sf3(overall)) + ': a fall of ' + sf3((1 - overall) * 100) + '%'],
        ['Prove that a rise of ' + M('x\\%') + ' followed by a fall of ' + M('x\\%') + ' always leaves the price lower (for ' + M('0 < x < 100') + ').', 2, M('\\left(1 + \\frac{x}{100}\\right)\\left(1 - \\frac{x}{100}\\right) = 1 - \\frac{x^2}{10\\,000} < 1')],
        ['What rise would exactly cancel a fall of ' + r + '%?', 2, M('\\frac{1}{' + (1 - r / 100) + '} = ' + sf3(1 / (1 - r / 100))) + ': a rise of ' + sf3((1 / (1 - r / 100) - 1) * 100) + '%']
      ]);
    }
  ]);

  X('indices', [
    function () {
      var P = pick([[2, 3, 3, 2, 8, 9], [2, 5, 3, 3, 32, 27], [3, 4, 4, 3, 81, 64], [5, 2, 2, 5, 25, 32]]), m = ri(20, 120);
      var a = P[0], pa = P[1] * m, b = P[2], pb = P[3] * m, bigger = P[4] > P[5] ? M(a + '^{' + pa + '}') : M(b + '^{' + pb + '}');
      var base = pick([3, 7, 9, 2]), cyc = { 2: [2, 4, 8, 6], 3: [3, 9, 7, 1], 7: [7, 9, 3, 1], 9: [9, 1] }[base], e = ri(50, 999);
      return Q('', [
        ['Without a calculator, decide which is larger: ' + M(a + '^{' + pa + '}') + ' or ' + M(b + '^{' + pb + '}') + '. Explain your reasoning.', 3, M(a + '^{' + pa + '} = (' + a + '^{' + P[1] + '})^{' + m + '} = ' + P[4] + '^{' + m + '}') + ' and ' + M(b + '^{' + pb + '} = ' + P[5] + '^{' + m + '}') + '; so ' + bigger + ' is larger'],
        ['Find the last digit of ' + M(base + '^{' + e + '}') + '. Explain your method.', 3, 'Last digits repeat in a cycle of ' + cyc.length + ': ' + cyc.join(', ') + '; ' + e + ' leaves remainder ' + (e % cyc.length) + ' when divided by ' + cyc.length + ', so the last digit is ' + cyc[(e - 1) % cyc.length]],
        ['Show that ' + M('4^{n} + 4^{n} + 4^{n} + 4^{n} = 4^{n + 1}') + ', and hence simplify ' + M('2^{n} + 2^{n}') + '.', 2, M('4 \\times 4^{n} = 4^{n + 1}') + '; ' + M('2^{n} + 2^{n} = 2^{n + 1}')]
      ]);
    },
    function () {
      var p = ri(1, 3), q = p + ri(1, 3), sum = Math.pow(2, p) + Math.pow(2, q), prod = Math.pow(2, p + q);
      return Q('', [
        ['Show that the substitution ' + M('y = 2^{x}') + ' turns the equation ' + M('4^{x} - ' + sum + ' \\times 2^{x} + ' + prod + ' = 0') + ' into a quadratic in ' + M('y') + '.', 2, M('4^{x} = (2^{x})^2 = y^2') + ': ' + M('y^2 - ' + sum + 'y + ' + prod + ' = 0')],
        ['Hence solve the equation.', 3, M('(y - ' + Math.pow(2, p) + ')(y - ' + Math.pow(2, q) + ') = 0') + ', ' + M('2^{x} = ' + Math.pow(2, p) + '\\text{ or } ' + Math.pow(2, q)) + ', ' + M('x = ' + p + '\\text{ or } ' + q)],
        ['Explain why ' + M('4^{x} + 2^{x} + 1 = 0') + ' has no solutions.', 2, 'Every term is positive (' + M('2^{x} > 0') + '), so the sum cannot be 0.'],
        ['Solve ' + M('9^{x} - 4 \\times 3^{x} + 3 = 0') + '.', 2, M('(3^{x} - 1)(3^{x} - 3) = 0') + ', ' + M('x = 0\\text{ or } x = 1')]
      ]);
    }
  ]);

  X('ratio', [
    function () {
      var a = ri(2, 5), b = ri(2, 6); while (gcd(a, b) > 1) b++;
      var c = ri(1, 4), d = ri(3, 7); while (gcd(c, d) > 1 || c * b === a * d) d++;
      var V1 = (a + b) * ri(2, 5), V2 = (c + d) * ri(2, 5), A1 = V1 * a / (a + b), B1 = V1 * b / (a + b), A2 = V2 * c / (c + d), B2 = V2 * d / (c + d);
      var tA = A1 + A2, tB = B1 + B2, g2 = gcd(tA, tB), target = [1, 1], add = tB - tA;
      return Q('Orange drink is made by mixing juice and water. Jug P holds ' + V1 + ' litres in the ratio juice : water ' + a + ' : ' + b + '. Jug Q holds ' + V2 + ' litres in the ratio ' + c + ' : ' + d + '.', [
        ['The two jugs are poured together. Find the ratio of juice to water in the mixture, in its simplest form.', 3, 'Juice ' + num(tA) + ' L, water ' + num(tB) + ' L: ' + M((tA / g2) + ' : ' + (tB / g2))],
        [(add > 0 ? 'How much pure juice must be added to make the ratio 1 : 1?' : 'How much water must be added to make the ratio 1 : 1?'), 2, num(Math.abs(add)) + ' litres'],
        ['Explain why mixing two drinks can never give a juice fraction that is higher than the stronger of the two drinks.', 2, 'The mixture\'s juice fraction is a weighted average of ' + M(F(a, a + b)) + ' and ' + M(F(c, c + d)) + ', so it lies between them.']
      ]);
    },
    function () {
      var k = pick([2, 3]), pct = pick([10, 20, 25, 50]), f = 1 + pct / 100, ch = (1 / Math.pow(f, k) - 1) * 100;
      return Q('A quantity ' + M('y') + ' is inversely proportional to ' + (k === 2 ? 'the square' : 'the cube') + ' of ' + M('x') + '.', [
        ['When ' + M('x = 2') + ', ' + M('y = ' + 9 * Math.pow(2, k)) + '. Find a formula for ' + M('y') + ' in terms of ' + M('x') + '.', 2, M('y = \\frac{' + 9 * Math.pow(2, 2 * k) + '}{x^{' + k + '}}')],
        [M('x') + ' is increased by ' + pct + '%. Find the percentage change in ' + M('y') + '.', 3, M('\\frac{1}{' + f + '^{' + k + '}} = ' + sf3(1 / Math.pow(f, k))) + ': a decrease of ' + sf3(-ch) + '%'],
        ['Show that the percentage change in ' + M('y') + ' does not depend on the starting value of ' + M('x') + '.', 2, M('\\frac{k}{(fx)^{' + k + '}} = \\frac{1}{f^{' + k + '}} \\times \\frac{k}{x^{' + k + '}}') + ': ' + M('y') + ' is always multiplied by ' + M('f^{-' + k + '}')],
        ['By what percentage must ' + M('x') + ' change to double ' + M('y') + '?', 2, 'Multiply ' + M('x') + ' by ' + M('2^{-\\frac{1}{' + k + '}} = ' + sf3(Math.pow(2, -1 / k))) + ': a decrease of ' + sf3((1 - Math.pow(2, -1 / k)) * 100) + '%']
      ]);
    }
  ]);

  X('compound-measures', [
    function () {
      var D = ri(12, 30) * 10, u = ri(6, 12) * 10, v = ri(5, 10) * 10, t = D / (u + v), lag = pick([0.5, 1]), t2 = (D + v * lag) / (u + v);
      var hm = function (h) { var mins = Math.round(h * 60); return Math.floor(mins / 60) + ' h ' + (mins % 60) + ' min'; };
      return Q('Two towns are ' + D + ' km apart. A car leaves town A at ' + u + ' km/h towards B. At the same time a van leaves B at ' + v + ' km/h towards A.', [
        ['Find how long it takes for them to meet, and how far from A they meet.', 3, M('\\frac{' + D + '}{' + (u + v) + '} = ' + sf3(t)) + ' h (' + hm(t) + '); ' + sf3(u * t) + ' km from A'],
        ['The next day the van leaves ' + (lag === 1 ? '1 hour' : '30 minutes') + ' earlier. Find where they meet now.', 3, 'Van covers ' + num(v * lag) + ' km first; they then close at ' + (u + v) + ' km/h: meet after ' + sf3((D - v * lag) / (u + v)) + ' h of car travel, ' + sf3(u * (D - v * lag) / (u + v)) + ' km from A'],
        ['Explain why their average speed of closing is the sum of their speeds.', 1, 'Each hour the gap shrinks by both distances travelled.']
      ]);
    },
    function () {
      var a = ri(2, 5) * 10, b = ri(3, 7) * 10, c = ri(4, 9) * 10; while (b === a) b += 10; while (c === a || c === b) c += 10;
      var m = ri(5, 40), W = m * 9.8, faces = [[a, b], [a, c], [b, c]].map(function (f) { return f[0] * f[1] / 10000; }), Pmax = W / Math.min.apply(null, faces), Pmin = W / Math.max.apply(null, faces);
      return Q('A solid block is a cuboid measuring ' + a + ' cm by ' + b + ' cm by ' + c + ' cm and has mass ' + m + ' kg. It rests on a table. (Weight = mass × 9.8 N.)', [
        ['Find the greatest and least pressure the block can exert, in N/m².', 4, 'Smallest face ' + num(Math.min.apply(null, faces)) + ' m²: ' + sf3(Pmax) + ' N/m²; largest face ' + num(Math.max.apply(null, faces)) + ' m²: ' + sf3(Pmin) + ' N/m²'],
        ['Show that the ratio of the greatest to the least pressure is the ratio of the longest edge to the shortest edge.', 2, M('\\frac{W/(xy)}{W/(yz)} = \\frac{z}{x}') + ' where the faces share the middle edge ' + M('y')],
        ['Find the density of the block in g/cm³.', 2, M('\\frac{' + m * 1000 + '}{' + a * b * c + '} = ' + sf3(m * 1000 / (a * b * c))) + ' g/cm³']
      ]);
    }
  ]);

  /* ---------- Algebra ---------- */
  X('expand-factorise', [
    function () {
      var n = ri(2, 9), v = n * (n + 1) * (n + 2) * (n + 3) + 1, r = n * n + 3 * n + 1;
      return Q('', [
        ['Calculate ' + M(n + ' \\times ' + (n + 1) + ' \\times ' + (n + 2) + ' \\times ' + (n + 3) + ' + 1') + ' and show that it is a square number.', 2, M(num(v) + ' = ' + r + '^2')],
        ['Expand ' + M('n(n + 3)') + ' and ' + M('(n + 1)(n + 2)') + '.', 2, M('n^2 + 3n') + ' and ' + M('n^2 + 3n + 2')],
        ['Hence prove that the product of any four consecutive integers, plus 1, is a square number.', 3, 'Let ' + M('m = n^2 + 3n') + ': ' + M('m(m + 2) + 1 = m^2 + 2m + 1 = (m + 1)^2 = (n^2 + 3n + 1)^2')]
      ]);
    },
    function () {
      var a = ri(31, 79), b = ri(21, a - 1), c = ri(2, 9) / 10, d = ri(1, 9) / 100;
      var A = 5 + c + d, B = 5 - c - d;
      return Q('', [
        ['Factorise ' + M('x^4 - y^4') + ' completely.', 2, M('(x - y)(x + y)(x^2 + y^2)')],
        ['Without a calculator, find the exact value of ' + M(a + '^2 - ' + b + '^2') + '.', 2, M('(' + a + ' - ' + b + ')(' + a + ' + ' + b + ') = ' + (a - b) + ' \\times ' + (a + b) + ' = ' + (a * a - b * b))],
        ['Without a calculator, find ' + M(num(Math.round(A * 100) / 100) + '^2 - ' + num(Math.round(B * 100) / 100) + '^2') + '.', 2, M('(' + num(Math.round((A - B) * 100) / 100) + ')(10) = ' + num(Math.round((A - B) * 1000) / 100))],
        ['Prove that the difference between the squares of two consecutive integers is equal to their sum.', 2, M('(n + 1)^2 - n^2 = 2n + 1 = n + (n + 1)')]
      ]);
    }
  ]);

  X('linear-equations', [
    function () {
      var k = ri(2, 5), a = ri(2, 9) * k, res = a / k;
      return Q('Jo plays a "think of a number" trick: "Think of a number. Multiply it by ' + k + '. Add ' + a + '. Divide by ' + k + '. Subtract the number you first thought of."', [
        ['Try the trick with two different starting numbers.', 1, 'You always get ' + res + '.'],
        ['Prove that the answer is always ' + res + '.', 3, M('\\frac{' + k + 'n + ' + a + '}{' + k + '} - n = n + ' + res + ' - n = ' + res)],
        ['Design a similar trick of four steps that always ends with 7, and prove that it works.', 3, 'For example: multiply by 2, add 14, divide by 2, subtract the number: ' + M('\\frac{2n + 14}{2} - n = 7')]
      ]);
    },
    function () {
      var a = pick([3, 4, 5, 6]), b = pick([6, 8, 10, 12]); while (b === a) b += 2;
      var t = a * b / (a + b), L = pick([12, 15, 20, 24]), t2 = 1 / (1 / a + 1 / b - 1 / L);
      var hm = function (h) { var m = Math.round(h * 60); return Math.floor(m / 60) + ' h ' + (m % 60) + ' min'; };
      return Q('Tap A fills a tank in ' + a + ' hours and tap B fills it in ' + b + ' hours.', [
        ['Explain why, in one hour, the two taps together fill ' + M('\\frac{1}{' + a + '} + \\frac{1}{' + b + '}') + ' of the tank.', 1, 'Each tap fills a fixed fraction per hour; these add.'],
        ['Form and solve an equation to find how long both taps together take to fill the tank.', 3, M('t\\left(\\frac{1}{' + a + '} + \\frac{1}{' + b + '}\\right) = 1') + ', ' + M('t = ' + F(a * b, a + b)) + ' h (' + hm(t) + ')'],
        ['A leak would empty the full tank in ' + L + ' hours. Find how long the two taps take to fill it with the leak open.', 3, M('t\\left(\\frac{1}{' + a + '} + \\frac{1}{' + b + '} - \\frac{1}{' + L + '}\\right) = 1') + ', ' + M('t = ' + sf3(t2)) + ' h (' + hm(t2) + ')']
      ]);
    }
  ]);

  X('inequalities', [
    function () {
      var N = ri(8, 14), M2 = ri(N + 3, 2 * N - 2), p = ri(3, 8), q = ri(2, 6), best = null;
      for (var x = 0; x <= N; x++) for (var y = 0; y <= N; y++) if (x + y <= N && 2 * x + y <= M2 && x >= 2 && y >= 1) { var P = p * x + q * y; if (!best || P > best.P) best = { x: x, y: y, P: P }; }
      return Q('A baker makes ' + M('x') + ' large cakes and ' + M('y') + ' small cakes each day. They must satisfy ' + M('x + y \\le ' + N) + ', ' + M('2x + y \\le ' + M2) + ', ' + M('x \\ge 2') + ' and ' + M('y \\ge 1') + '.', [
        ['Explain what the inequality ' + M('2x + y \\le ' + M2) + ' might represent.', 1, 'For example oven space: a large cake uses 2 units and a small cake 1, with ' + M2 + ' units available.'],
        ['Show the region on a graph and find the point where ' + M('x + y = ' + N) + ' meets ' + M('2x + y = ' + M2) + '.', 3, M('(' + (M2 - N) + ',\\ ' + (2 * N - M2) + ')')],
        ['Profit is £' + p + ' per large cake and £' + q + ' per small cake. Find the number of each cake that gives the greatest profit, and the profit.', 3, M('x = ' + best.x + ',\\ y = ' + best.y) + ': £' + best.P]
      ]);
    },
    function () {
      var k = ri(2, 6), A = ri(20, 60), P = ri(30, 60) * 2, lo = (-k + Math.sqrt(k * k + 4 * A)) / 2, hi = (P - 2 * k) / 4;
      return Q('A rectangle has width ' + M('x') + ' cm and length ' + M('(x + ' + k + ')') + ' cm. Its area is more than ' + A + ' cm² and its perimeter is less than ' + P + ' cm.', [
        ['Show that ' + M('x^2 + ' + k + 'x - ' + A + ' > 0') + '.', 1, M('x(x + ' + k + ') > ' + A)],
        ['Solve this inequality, given that ' + M('x > 0') + '.', 3, M('x > \\frac{-' + k + ' + \\sqrt{' + (k * k + 4 * A) + '}}{2} = ' + sf3(lo))],
        ['Use the perimeter to find a second inequality, and hence find the range of possible widths.', 3, M('4x + ' + 2 * k + ' < ' + P) + ', ' + M('x < ' + num(hi)) + '; ' + (lo < hi ? M(sf3(lo) + ' < x < ' + num(hi)) : 'no possible widths')]
      ]);
    }
  ]);

  X('sequences', [
    function () {
      var t = ri(5, 15), T = t * t + t;
      return Q('The ' + M('n') + 'th term of a sequence is ' + M('n^2 + n') + '.', [
        ['Write down the first five terms.', 1, '2, 6, 12, 20, 30'],
        ['Prove that every term is even.', 2, M('n^2 + n = n(n + 1)') + ': one of two consecutive integers is even.'],
        ['Is ' + T + ' a term? Is ' + (T + 2) + ' a term? Explain.', 2, M(T + ' = ' + t + ' \\times ' + (t + 1)) + ': yes, term ' + t + '; ' + (T + 2) + ' lies between terms ' + t + ' and ' + (t + 1) + ': no'],
        ['Prove that the sum of any two consecutive terms is twice a square number.', 3, M('n^2 + n + (n + 1)^2 + (n + 1) = 2n^2 + 4n + 2 = 2(n + 1)^2')]
      ]);
    },
    function () {
      var rows = pick([1, 2]), per = rows === 1 ? 3 : 5, base = rows === 1 ? 1 : 2, S = ri(20, 60), n = Math.floor((S - base) / per);
      return Q('Squares are made from matchsticks in ' + (rows === 1 ? 'one row' : 'two rows') + ', as in a grid that is ' + rows + ' square' + (rows === 1 ? '' : 's') + ' high and ' + M('n') + ' squares long.', [
        ['Find a formula for the number of matchsticks, ' + M('M') + ', for a grid ' + M('n') + ' squares long.', 3, M('M = ' + per + 'n + ' + base)],
        ['Explain where each part of your formula comes from.', 2, rows === 1 ? '1 starting stick, then each new square adds 3 sticks.' : 'The first column needs 2 vertical sticks; each new column adds 3 horizontal and 2 vertical sticks.'],
        ['Find the longest grid that can be made with ' + S + ' matchsticks, and how many are left over.', 2, M('n = ' + n) + ', ' + (S - (per * n + base)) + ' left over'],
        ['For a grid 3 squares high the formula is ' + M('M = 7n + 3') + '. Predict the formula for a grid 4 squares high and justify it.', 2, M('M = 9n + 4') + ': each of the ' + M('n') + ' columns has 5 horizontal sticks, and there are ' + M('n + 1') + ' lines of 4 vertical sticks.']
      ]);
    }
  ]);

  X('straight-lines', [
    function () {
      var A = [ri(-4, 0), ri(-3, 2)], B = [A[0] + ri(4, 8), A[1] + ri(1, 3)], dx = B[0] - A[0], dy = B[1] - A[1], C = [A[0] - dy, A[1] + dx];
      var area = (dx * dx + dy * dy) / 2;
      return Q('Points ' + M('A(' + A.join(',\\ ') + ')') + ', ' + M('B(' + B.join(',\\ ') + ')') + ' and ' + M('C(' + C.join(',\\ ') + ')') + ' are given.', [
        ['Show that ' + M('AB') + ' and ' + M('AC') + ' are perpendicular.', 2, 'Gradients ' + M(F(dy, dx)) + ' and ' + M(F(dx, -dy)) + ' multiply to ' + M('-1')],
        ['Show that ' + M('AB = AC') + ' and find the area of triangle ' + M('ABC') + '.', 3, 'Both ' + M('\\sqrt{' + (dx * dx + dy * dy) + '}') + '; area ' + M(num(area))],
        ['Find the coordinates of ' + M('D') + ' so that ' + M('ABDC') + ' is a square, and the equation of the diagonal ' + M('AD') + '.', 3, M('D(' + (B[0] + C[0] - A[0]) + ',\\ ' + (B[1] + C[1] - A[1]) + ')') + '; gradient ' + M(F(dx + dy, dx - dy))]
      ]);
    },
    function () {
      var m = pick([1, -1, 2, -2, 0.5]), c = nz(-3, 3), P = [ri(-3, 5), ri(-3, 5)];
      while (Math.abs(P[1] - (m * P[0] + c)) < 1e-9) P[1]++;
      var t = (m * (P[1] - c) + P[0]) / (m * m + 1), Fp = [t, m * t + c], R = [2 * Fp[0] - P[0], 2 * Fp[1] - P[1]];
      var ms = m === 0.5 ? '\\frac{1}{2}' : String(m);
      return Q('The line ' + M('L') + ' has equation ' + M('y = ' + (m === 1 ? '' : m === -1 ? '-' : ms) + 'x' + sg(c)) + '. The point ' + M('P(' + P.join(',\\ ') + ')') + ' is reflected in ' + M('L') + '.', [
        ['Find the equation of the line through ' + M('P') + ' perpendicular to ' + M('L') + '.', 2, 'Gradient ' + M(m === 0.5 ? '-2' : F(-1, m)) + ' through ' + M('P')],
        ['Find the point ' + M('F') + ' where this line meets ' + M('L') + '.', 3, M('F(' + sf3(Fp[0]) + ',\\ ' + sf3(Fp[1]) + ')')],
        ['Hence find the coordinates of the image of ' + M('P') + '.', 2, M('(' + sf3(R[0]) + ',\\ ' + sf3(R[1]) + ')') + ' (' + M('F') + ' is the midpoint of ' + M('P') + ' and its image)']
      ]);
    }
  ]);

  X('simultaneous', [
    function () {
      var r = pick([2, 3, 4, 5, 6]), r2 = r * r;
      return Q('The circle ' + M('x^2 + y^2 = ' + r2) + ' and the line ' + M('y = x + c') + ' are given.', [
        ['Show that the ' + M('x') + '-coordinates of any intersection satisfy ' + M('2x^2 + 2cx + c^2 - ' + r2 + ' = 0') + '.', 2, 'Substitute ' + M('y = x + c') + ' and expand.'],
        ['Find the values of ' + M('c') + ' for which the line is a tangent to the circle.', 3, 'Discriminant zero: ' + M('4c^2 - 8(c^2 - ' + r2 + ') = 0') + ', ' + M('c = \\pm ' + r + '\\sqrt{2}')],
        ['Find the coordinates of the point of contact when ' + M('c') + ' is positive.', 2, M('x = -\\frac{c}{2}') + ': ' + M('\\left(-\\frac{' + r + '\\sqrt{2}}{2},\\ \\frac{' + r + '\\sqrt{2}}{2}\\right)')],
        ['Explain geometrically why the two values of ' + M('c') + ' are equal and opposite.', 1, 'The circle is symmetric about the origin, so the two tangents with gradient 1 are reflections of each other.']
      ]);
    },
    function () {
      var A = ri(2, 7), B = ri(A + 3, A + 12), m1 = [A + ri(1, 3), B], m2 = [A, B + ri(1, 4)];
      var f1 = [m1[0], m1[1]], f2 = [m2[0], m2[1]], k1 = gcd(f1[0], f1[1]), k2 = gcd(f2[0], f2[1]);
      var dn = m1[0] - A, dd = m2[1] - B;
      return Q('A fraction is ' + M('\\frac{x}{y}') + '. If ' + dn + ' is added to the numerator it becomes ' + M(F(f1[0], f1[1])) + '. If ' + dd + ' is added to the denominator it becomes ' + M(F(f2[0], f2[1])) + '.', [
        ['Write down two equations in ' + M('x') + ' and ' + M('y') + '.', 2, M(((f1[1] / k1) === 1 ? '' : (f1[1] / k1)) + '(x + ' + dn + ') = ' + ((f1[0] / k1) === 1 ? '' : (f1[0] / k1)) + 'y') + ' and ' + M(((f2[1] / k2) === 1 ? '' : (f2[1] / k2)) + 'x = ' + ((f2[0] / k2) === 1 ? '' : (f2[0] / k2)) + '(y + ' + dd + ')')],
        ['Solve them to find the fraction.', 3, M('x = ' + A + ',\\ y = ' + B) + ': ' + M('\\frac{' + A + '}{' + B + '}')],
        ['Explain why the answer must be checked in the original statements, not just the equations.', 1, 'Rearranging can introduce errors; checking confirms both conditions.']
      ]);
    }
  ]);

  X('quadratics', [
    function () {
      var u = ri(15, 35), h0 = ri(0, 3) * 5, H = h0 + ri(5, Math.floor(u * u / 20) - 3), tmax = u / 10, Hm = h0 + u * u / 20;
      var d = u * u - 20 * (H - h0), t1 = (u - Math.sqrt(d)) / 10, t2 = (u + Math.sqrt(d)) / 10;
      return Q('A ball is thrown upwards. Its height after ' + M('t') + ' seconds is ' + M('h = ' + (h0 ? h0 + ' + ' : '') + u + 't - 5t^2') + ' metres.', [
        ['By completing the square, find the greatest height and when it occurs.', 3, M('h = ' + num(Hm) + ' - 5(t - ' + num(tmax) + ')^2') + ': ' + num(Hm) + ' m at ' + M('t = ' + num(tmax))],
        ['Find the length of time for which the ball is above ' + H + ' m.', 3, M('5t^2 - ' + u + 't + ' + (H - h0) + ' = 0') + ': ' + M('t = ' + sf3(t1) + ',\\ ' + sf3(t2)) + '; ' + sf3(t2 - t1) + ' s'],
        ['Explain using the discriminant why the ball never reaches ' + Math.ceil(Hm + 5) + ' m.', 2, 'The equation ' + M('5t^2 - ' + u + 't + ' + (Math.ceil(Hm + 5) - h0) + ' = 0') + ' has negative discriminant ' + (u * u - 20 * (Math.ceil(Hm + 5) - h0)) + '.']
      ]);
    },
    function () {
      var m = pick([1, 2, 3]), disc = m * m + 4, root = (m + Math.sqrt(disc)) / 2;
      return Q('A rectangle has width 1 unit and length ' + M('x') + ' units, with ' + M('x > ' + m) + '. When ' + m + ' square' + (m > 1 ? 's' : '') + ' of side 1 ' + (m > 1 ? 'are' : 'is') + ' cut from the end, the rectangle left over is similar to the original.', [
        ['Show that ' + M('x^2 - ' + c1(m, 'x') + ' - 1 = 0') + '.', 3, 'Leftover is ' + M('1 \\times (x - ' + m + ')') + '; similarity: ' + M('\\frac{x}{1} = \\frac{1}{x - ' + m + '}')],
        ['Find the exact value of ' + M('x') + '.', 2, M('x = \\frac{' + m + ' + \\sqrt{' + disc + '}}{2} \\approx ' + sf3(root))],
        ['Show that ' + M('x - \\frac{1}{x} = ' + m) + ' for this value of ' + M('x') + '.', 2, 'Divide ' + M('x^2 - ' + c1(m, 'x') + ' - 1 = 0') + ' by ' + M('x')]
      ]);
    }
  ]);

  X('rearranging', [
    function () {
      var u = ri(12, 30), f = ri(5, u - 3), v = u * f / (u - f);
      return Q('For a lens, ' + M('\\frac{1}{u} + \\frac{1}{v} = \\frac{1}{f}') + ', where ' + M('u') + ' and ' + M('v') + ' are distances and ' + M('f') + ' is the focal length.', [
        ['Make ' + M('v') + ' the subject.', 3, M('v = \\frac{uf}{u - f}')],
        ['Find ' + M('v') + ' when ' + M('u = ' + u) + ' and ' + M('f = ' + f) + '.', 1, M(sf3(v))],
        ['Describe what happens to ' + M('v') + ' as ' + M('u') + ' gets closer to ' + M('f') + ', and explain using your formula.', 2, M('u - f \\to 0') + ', so ' + M('v') + ' becomes very large.'],
        ['Make ' + M('f') + ' the subject.', 2, M('f = \\frac{uv}{u + v}')]
      ]);
    },
    function () {
      var L = ri(4, 20) / 10, g = 9.8, T = 2 * Math.PI * Math.sqrt(L / g), p = pick([21, 44, 69]);
      var r = Math.sqrt(1 + p / 100);
      return Q('The period of a pendulum is ' + M('T = 2\\pi\\sqrt{\\frac{L}{g}}') + ', where ' + M('L') + ' m is its length and ' + M('g = 9.8') + '.', [
        ['Make ' + M('L') + ' the subject.', 3, M('L = \\frac{gT^2}{4\\pi^2}')],
        ['Find the length of a pendulum with period 2 s.', 1, M(sf3(9.8 * 4 / (4 * Math.PI * Math.PI))) + ' m'],
        ['Show that quadrupling ' + M('L') + ' doubles ' + M('T') + '.', 2, M('2\\pi\\sqrt{\\frac{4L}{g}} = 2 \\times 2\\pi\\sqrt{\\frac{L}{g}}')],
        [M('L') + ' is increased by ' + p + '%. Find the percentage increase in ' + M('T') + '.', 2, M('\\sqrt{' + (1 + p / 100) + '} = ' + num(Math.round(r * 100) / 100)) + ': ' + Math.round((r - 1) * 100) + '%']
      ]);
    }
  ]);

  X('functions', [
    function () {
      var a = ri(2, 6);
      return Q(M('\\mathrm{f}(x) = \\frac{' + a + 'x + 1}{x - ' + a + '}') + ', ' + M('x \\ne ' + a) + '.', [
        ['Find ' + M('\\mathrm{ff}(x)') + ' and simplify fully.', 4, M('\\frac{' + a + '\\frac{' + a + 'x + 1}{x - ' + a + '} + 1}{\\frac{' + a + 'x + 1}{x - ' + a + '} - ' + a + '} = \\frac{' + (a * a + 1) + 'x}{' + (a * a + 1) + '} = x')],
        ['What does your answer tell you about ' + M('\\mathrm{f}^{-1}') + '?', 1, M('\\mathrm{f}^{-1} = \\mathrm{f}') + ': f is self-inverse'],
        ['Explain how this can be seen from the graph of ' + M('y = \\mathrm{f}(x)') + '.', 1, 'The graph is symmetric in the line ' + M('y = x') + '.'],
        ['Find ' + M('\\mathrm{f}^{-1}(' + (a + 1) + ')') + '.', 1, M(a * (a + 1) + 1)]
      ]);
    },
    function () {
      var a = ri(2, 5), b = nz(-6, 6), c = ri(1, 9);
      return Q(M('\\mathrm{f}(x) = ' + a + 'x' + sg(b)) + ' and ' + M('\\mathrm{g}(x) = \\frac{1}{x - ' + c + '}') + '.', [
        ['Find ' + M('\\mathrm{gf}(x)') + '.', 2, M('\\frac{1}{' + a + 'x' + (b - c ? sg(b - c) : '') + '}')],
        ['State the value of ' + M('x') + ' that must be excluded from the domain of ' + M('\\mathrm{gf}') + ', and explain why.', 2, M('x = ' + F(c - b, a)) + ': it makes ' + M('\\mathrm{f}(x) = ' + c) + ', where g is not defined'],
        ['Find ' + M('(\\mathrm{gf})^{-1}(x)') + ' and check that it equals ' + M('\\mathrm{f}^{-1}\\mathrm{g}^{-1}(x)') + '.', 4, M('(\\mathrm{gf})^{-1}(x) = \\frac{1' + (b - c ? ((b - c) > 0 ? ' - ' : ' + ') + (Math.abs(b - c) === 1 ? '' : Math.abs(b - c)) + 'x' : '') + '}{' + a + 'x}') + '; ' + M('\\mathrm{g}^{-1}(x) = \\frac{1}{x} + ' + c) + ', ' + M('\\mathrm{f}^{-1}(x) = \\frac{x' + sg(-b) + '}{' + a + '}') + ', composing gives the same']
      ]);
    }
  ]);

  X('graphs', [
    function () {
      var b = nz(-4, 4), c = nz(-5, 5), p = nz(-6, 6), q = nz(-6, 6); while (p === b) p = nz(-6, 6);
      var m = b - p, k = c - q;
      return Q('A student has drawn the graph of ' + M('y = ' + poly([1, b, c])) + '.', [
        ['Find the equation of the straight line that must be drawn on the same axes to solve ' + M(poly([1, p, q]) + ' = 0') + '.', 3, M(poly([1, b, c]) + ' = ' + poly([1, b, c]) + ' - (' + poly([1, p, q]) + ')') + ': ' + M('y = ' + (m === 0 ? String(k) : poly([m, k])))],
        ['Explain why the solutions are the ' + M('x') + '-coordinates of the points where the line meets the curve.', 2, 'At those points both equations hold, and subtracting gives ' + M(poly([1, p, q]) + ' = 0')],
        ['Write down an equation, in the form ' + M('x^2 + px + q = 0') + ', that could be solved by drawing the line ' + M('y = 2x + 1') + '.', 2, M(poly([1, b - 2, c - 1]) + ' = 0')]
      ]);
    },
    function () {
      var A = ri(2, 4), h = pick([30, 45, 60, 90]), k = nz(-2, 2);
      return Q('The graph of ' + M('y = \\sin x') + ', for ' + M('0° \\le x \\le 360°') + ', is transformed to the graph of ' + M('y = ' + A + '\\sin(x - ' + h + '°)' + sg(k)) + '.', [
        ['Describe the two or three transformations, in a suitable order.', 3, 'Translation ' + h + '° right, vertical stretch scale factor ' + A + ', translation ' + Math.abs(k) + (k > 0 ? ' up' : ' down')],
        ['Find the coordinates of the maximum point of the new graph in the range ' + M('0° \\le x \\le 360°') + '.', 2, M('(' + (90 + h) + '°,\\ ' + (A + k) + ')')],
        ['Find the range of values of ' + M('y') + ', and the number of solutions of ' + M(A + '\\sin(x - ' + h + '°)' + sg(k) + ' = ' + k) + ' for ' + M('0° \\le x \\le 360°') + '.', 3, M((k - A) + ' \\le y \\le ' + (k + A)) + '; ' + M('\\sin(x - ' + h + '°) = 0') + ' gives ' + M('x = ' + h + '°,\\ ' + (h + 180) + '°' + (h === 0 ? ',\\ 360°' : '')) + ': ' + (h === 0 ? 3 : 2) + ' solutions']
      ]);
    }
  ]);

  X('differentiation', [
    function () {
      var V = pick([500, 864, 1372, 2048, 4000]), x = Math.cbrt(2 * V), h = V / (x * x), S = x * x + 4 * V / x;
      return Q('An open box (no lid) has a square base of side ' + M('x') + ' cm and volume ' + V + ' cm³.', [
        ['Show that its surface area is ' + M('A = x^2 + \\frac{' + 4 * V + '}{x}') + '.', 3, 'Height ' + M('h = \\frac{' + V + '}{x^2}') + '; ' + M('A = x^2 + 4xh')],
        ['Find the dimensions that make ' + M('A') + ' as small as possible.', 4, M('\\frac{dA}{dx} = 2x - \\frac{' + 4 * V + '}{x^2} = 0') + ', ' + M('x = ' + sf3(x)) + ', ' + M('h = ' + sf3(h))],
        ['Show that in the best box the height is half the width.', 2, M('x^3 = ' + 2 * V) + ' so ' + M('h = \\frac{' + V + '}{x^2} = \\frac{x^3/2}{x^2} = \\frac{x}{2}')],
        ['Find the minimum surface area.', 1, M(sf3(S)) + ' cm²']
      ]);
    },
    function () {
      var p = ri(1, 3), q = p + 2 * ri(1, 2), s = function (t) { return t * t * t - 1.5 * (p + q) * t * t + 3 * p * q * t; }, T = q + ri(1, 2);
      var dist = Math.abs(s(p) - s(0)) + Math.abs(s(q) - s(p)) + Math.abs(s(T) - s(q));
      return Q('A particle moves along a line. Its displacement after ' + M('t') + ' seconds is ' + M('s = t^3 - ' + num(1.5 * (p + q)) + 't^2 + ' + 3 * p * q + 't') + ' metres.', [
        ['Find the times when the particle is at rest.', 3, M('v = 3t^2 - ' + 3 * (p + q) + 't + ' + 3 * p * q + ' = 3(t - ' + p + ')(t - ' + q + ')') + ': ' + M('t = ' + p + ',\\ ' + q)],
        ['Find the acceleration at each of these times and describe what it tells you.', 2, M('a = 6t - ' + 3 * (p + q)) + ': ' + (6 * p - 3 * (p + q)) + ' and ' + (6 * q - 3 * (p + q)) + ' m/s²; the particle changes direction at each'],
        ['Find the total distance travelled in the first ' + T + ' seconds.', 3, num(Math.round(dist * 100) / 100) + ' m']
      ]);
    }
  ]);

  /* ---------- Geometry ---------- */
  X('angles-parallel', [
    function () {
      var a = [ri(25, 40), ri(25, 40), ri(25, 40), ri(25, 40)], e = 180 - a.reduce(function (s, v) { return s + v; }, 0);
      return Q('A five-pointed star is made by extending the sides of a pentagon.', [
        ['The angles at four of the points are ' + a.join('°, ') + '°. Find the angle at the fifth point.', 1, e + '°'],
        ['Prove that the angles at the five points of any such star add up to 180°.', 4, 'Each exterior angle of the inner pentagon equals the sum of two point angles (exterior angle of a triangle); the five exterior angles sum to 360° and each point angle is counted twice, so the point angles sum to 180°.'],
        ['Use your result to explain why the points of a regular five-pointed star are each 36°.', 1, M('180 \\div 5 = 36')]
      ]);
    },
    function () {
      var n = ri(3, 4), L = [], R = [], i;
      for (i = 0; i < n - 1; i++) L.push(ri(20, 60));
      for (i = 0; i < n; i++) R.push(ri(20, 60));
      var x = R.reduce(function (s, v) { return s + v; }, 0) - L.reduce(function (s, v) { return s + v; }, 0);
      while (x <= 10) { R[0] += 15; x += 15; }
      return Q('A zig-zag path runs between two parallel lines. At each corner the angle between the path and a line through the corner parallel to the two lines is marked. The angles pointing left are ' + L.join('°, ') + '° and ' + M('x') + '°; the angles pointing right are ' + R.join('°, ') + '°.', [
        ['By drawing lines through each corner parallel to the two lines, prove that the sum of the left-pointing angles equals the sum of the right-pointing angles.', 4, 'Each corner angle splits into two alternate angles; each alternate angle is shared by one left and one right corner, so the two sums are equal.'],
        ['Hence find ' + M('x') + '.', 2, M('x = ' + x)]
      ]);
    }
  ]);

  X('polygons', [
    function () {
      var ns = []; for (var n = 3; n <= 360; n++) if (360 % n === 0) ns.push(n);
      return Q('', [
        ['Explain why the exterior angle of a regular polygon with ' + M('n') + ' sides is ' + M('\\frac{360°}{n}') + '.', 1, 'The exterior angles of any polygon add up to 360°, and they are equal.'],
        ['Find how many regular polygons have exterior angles that are a whole number of degrees.', 3, ns.length + ' (the factors of 360 from 3 to 360)'],
        ['Which regular polygons tessellate on their own? Prove that there are no others.', 4, 'Equilateral triangle, square, hexagon: the interior angle must divide 360°, and ' + M('180 - \\frac{360}{n}') + ' divides 360 only for ' + M('n = 3, 4, 6')]
      ]);
    },
    function () {
      var k = ri(2, 9), n = 2 * (k + 1);
      return Q('The interior angle of a regular polygon is ' + k + ' times its exterior angle.', [
        ['Find the number of sides.', 3, M('180 - e = ' + k + 'e') + ', ' + M('e = ' + F(180, k + 1) + '°') + ', ' + M('n = ' + n)],
        ['Prove that if the interior angle is ' + M('k') + ' times the exterior angle, then the polygon has ' + M('2(k + 1)') + ' sides.', 3, M('e = \\frac{180}{k + 1}') + ', ' + M('n = \\frac{360}{e} = 2(k + 1)')],
        ['Explain why no regular polygon has an interior angle exactly 1.25 times its exterior angle.', 2, M('n = 2(1.25 + 1) = 4.5') + ', which is not a whole number.']
      ]);
    }
  ]);

  X('pythagoras-trig', [
    function () {
      var L = ri(5, 9), b = ri(1, 3), d = ri(1, 2) * 0.5, h1 = Math.sqrt(L * L - b * b), h2 = Math.sqrt(L * L - (b + d) * (b + d));
      return Q('A ladder ' + L + ' m long leans against a vertical wall with its foot ' + b + ' m from the wall.', [
        ['Find how high up the wall the ladder reaches, and the angle it makes with the ground.', 3, M(sf3(h1)) + ' m; ' + M(sf3(Math.acos(b / L) * 180 / Math.PI) + '°')],
        ['The foot slides ' + num(d) + ' m further from the wall. Find how far the top slides down.', 3, M(sf3(h1) + ' - ' + sf3(h2) + ' = ' + sf3(h1 - h2)) + ' m'],
        ['Explain why the top slides down less than the foot slides out, at the start.', 2, 'When the ladder is steep, a small horizontal change needs only a smaller vertical change to keep the length ' + L + ' m (the vertical side is much longer).']
      ]);
    },
    function () {
      var s = ri(6, 12), h = ri(5, 12), e = Math.sqrt(h * h + s * s / 2), ang = Math.atan(h / (s / Math.SQRT2)) * 180 / Math.PI, face = Math.atan(h / (s / 2)) * 180 / Math.PI;
      return Q('A square-based pyramid has base side ' + s + ' cm and vertical height ' + h + ' cm.', [
        ['Find the length of a sloping edge.', 3, M('\\sqrt{' + h + '^2 + (' + s + '/\\sqrt{2})^2} = ' + sf3(e)) + ' cm'],
        ['Find the angle between a sloping edge and the base.', 2, M(sf3(ang) + '°')],
        ['Find the angle between a triangular face and the base, and explain why it is larger than your previous answer.', 3, M(sf3(face) + '°') + '; the horizontal distance to the middle of a base edge (' + s / 2 + ' cm) is shorter than to a corner']
      ]);
    }
  ]);

  X('circles', [
    function () {
      var w = pick([1.2, 1.22, 1.25]), r = ri(30, 40), n = ri(3, 8);
      return Q('A running track has two straights joined by two semicircles. In a 400 m race, runners stay in lanes of width ' + w + ' m. The inside lane has semicircles of radius ' + r + ' m.', [
        ['Find how much further a runner in lane 2 runs on the two bends than a runner in lane 1.', 3, M('2\\pi(' + r + ' + ' + w + ') - 2\\pi(' + r + ') = 2\\pi \\times ' + w + ' = ' + sf3(2 * Math.PI * w)) + ' m'],
        ['Show that this extra distance does not depend on the radius of the bends.', 2, 'The ' + M('2\\pi r') + ' terms cancel, leaving ' + M('2\\pi w')],
        ['Find how far ahead the runner in lane ' + n + ' must start compared with lane 1.', 2, M((n - 1) + ' \\times ' + sf3(2 * Math.PI * w) + ' = ' + sf3((n - 1) * 2 * Math.PI * w)) + ' m']
      ]);
    },
    function () {
      var R = ri(4, 12);
      return Q('A square is drawn inside a circle of radius ' + R + ' cm so that its corners touch the circle. A smaller circle is drawn inside the square, touching all four sides.', [
        ['Find the side of the square, as a surd.', 2, M(R + '\\sqrt{2}') + ' cm'],
        ['Find the ratio of the area of the large circle to the area of the small circle.', 3, 'Small radius ' + M('\\frac{' + R + '\\sqrt{2}}{2}') + '; ratio ' + M('2 : 1')],
        ['Prove that this ratio is the same for any size of circle.', 2, 'Small radius ' + M('\\frac{R}{\\sqrt{2}}') + ', so the area ratio is ' + M('R^2 : \\frac{R^2}{2} = 2 : 1')],
        ['Find the fraction of the large circle that lies outside the square, as an exact expression.', 2, M('1 - \\frac{2R^2}{\\pi R^2} = 1 - \\frac{2}{\\pi}')]
      ]);
    }
  ]);

  X('similar-shapes', [
    function () {
      var hgt = ri(6, 20), base = ri(6, 20), k = 1 / Math.SQRT2;
      return Q('A triangle has base ' + base + ' cm and height ' + hgt + ' cm. A line parallel to the base cuts the triangle into a smaller triangle (at the top) and a trapezium.', [
        ['Explain why the small triangle is similar to the original triangle.', 1, 'Corresponding angles are equal (parallel lines).'],
        ['The line is drawn halfway up. Find the fraction of the area in the small triangle.', 2, M('\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}')],
        ['Find exactly how far below the top vertex the line must be drawn so that the two parts have equal areas.', 3, 'Length factor ' + M('\\frac{1}{\\sqrt{2}}') + ': ' + M('\\frac{' + hgt + '}{\\sqrt{2}} = ' + sf3(hgt * k)) + ' cm'],
        ['Generalise: where should the line be drawn so that the small triangle has a fraction ' + M('f') + ' of the area?', 2, 'At a distance ' + M('h\\sqrt{f}') + ' below the vertex']
      ]);
    },
    function () {
      var s = pick([10, 20, 25, 50]), m = ri(2, 9) * 100, paint = ri(2, 6) * 5;
      return Q('A model of a statue is made to a scale of 1 : ' + s + '. The model has mass ' + m + ' g and needs ' + paint + ' ml of paint to cover it.', [
        ['Find the mass of the real statue, in kg, if it is made of the same material.', 2, M(m + ' \\times ' + s + '^3 = ' + num(m * s * s * s / 1000)) + ' kg'],
        ['Find how much paint is needed for the real statue, in litres.', 2, M(paint + ' \\times ' + s + '^2 = ' + num(paint * s * s / 1000)) + ' L'],
        ['Explain why giants in films could not have the same proportions as people.', 2, 'Mass grows with the cube of the scale but bone strength (cross-section area) only with the square, so bones would break.']
      ]);
    }
  ]);

  X('volume', [
    function () {
      var r = ri(3, 8), h = ri(10, 20), R = ri(5, 10), H = ri(10, 20);
      var Vc = Math.PI * r * r * h, Vk = Math.PI * R * R * H / 3, full = Vc >= Vk;
      return Q('A cylinder of radius ' + r + ' cm and height ' + h + ' cm is full of water. The water is poured into an empty cone (vertex down) of radius ' + R + ' cm and height ' + H + ' cm.', [
        ['Find the volume of water and the volume of the cone.', 3, M(sf3(Vc)) + ' cm³ and ' + M(sf3(Vk)) + ' cm³'],
        [full ? 'Show that the cone overflows, and find how much water spills.' : 'Find the depth of water in the cone.', 3, full ? 'Spill ' + M(sf3(Vc - Vk)) + ' cm³' : 'Similar cones: ' + M('\\frac{d}{' + H + '} = \\left(\\frac{' + sf3(Vc) + '}{' + sf3(Vk) + '}\\right)^{\\frac{1}{3}}') + ', ' + M('d = ' + sf3(H * Math.cbrt(Vc / Vk))) + ' cm'],
        ['Explain why filling the cone to half its height uses only one eighth of its volume.', 2, 'The water forms a similar cone with length factor ' + M('\\frac{1}{2}') + ', so volume factor ' + M('\\frac{1}{8}')]
      ]);
    },
    function () {
      var a = ri(4, 12);
      return Q('A sphere fits exactly inside a cube of side ' + a + ' cm.', [
        ['Find the volume of the space inside the cube but outside the sphere.', 3, M(a + '^3 - \\frac{4}{3}\\pi(' + a / 2 + ')^3 = ' + sf3(a * a * a - 4 / 3 * Math.PI * Math.pow(a / 2, 3))) + ' cm³'],
        ['Show that the sphere fills ' + M('\\frac{\\pi}{6}') + ' of the cube, whatever its size.', 2, M('\\frac{\\frac{4}{3}\\pi(a/2)^3}{a^3} = \\frac{\\pi}{6}')],
        ['Eight equal spheres fit exactly in the same cube (two layers of four). Do they fill more, less or the same fraction of the cube? Justify.', 3, 'Each has radius ' + M('a/4') + '; total ' + M('8 \\times \\frac{4}{3}\\pi(a/4)^3 = \\frac{\\pi}{6}a^3') + ': the same fraction']
      ]);
    }
  ]);

  X('vectors', [
    function () {
      var k = ri(2, 4);
      return Q(M('OABC') + ' is a trapezium with ' + M('\\overrightarrow{OA} = \\mathbf{a}') + ', ' + M('\\overrightarrow{OC} = \\mathbf{c}') + ' and ' + M('\\overrightarrow{CB} = ' + k + '\\mathbf{a}') + '. The diagonals ' + M('OB') + ' and ' + M('AC') + ' meet at ' + M('X') + '.', [
        ['Write ' + M('\\overrightarrow{OB}') + ' and ' + M('\\overrightarrow{AC}') + ' in terms of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{c}') + '.', 2, M('\\overrightarrow{OB} = \\mathbf{c} + ' + k + '\\mathbf{a}') + ', ' + M('\\overrightarrow{AC} = \\mathbf{c} - \\mathbf{a}')],
        ['Write ' + M('\\overrightarrow{OX}') + ' in two ways, using ' + M('\\overrightarrow{OX} = \\lambda\\overrightarrow{OB}') + ' and ' + M('\\overrightarrow{OX} = \\mathbf{a} + \\mu\\overrightarrow{AC}') + '.', 2, M('\\lambda(\\mathbf{c} + ' + k + '\\mathbf{a}) = (1 - \\mu)\\mathbf{a} + \\mu\\mathbf{c}')],
        ['Hence find the ratio ' + M('OX : XB') + '.', 3, 'Compare: ' + M('\\lambda = \\mu') + ', ' + M(k + '\\lambda = 1 - \\mu') + ', so ' + M('\\lambda = ' + F(1, k + 1)) + ': ' + M('OX : XB = 1 : ' + k)],
        ['Explain how the ratio is related to the lengths of the parallel sides.', 1, 'It equals ' + M('OA : CB = 1 : ' + k)]
      ]);
    },
    function () {
      return Q(M('OABC') + ' is a parallelogram with ' + M('\\overrightarrow{OA} = \\mathbf{a}') + ' and ' + M('\\overrightarrow{OC} = \\mathbf{c}') + '. ' + M('M') + ' is the midpoint of ' + M('AB') + ' and ' + M('OM') + ' meets ' + M('AC') + ' at ' + M('P') + '.', [
        ['Find ' + M('\\overrightarrow{OM}') + ' in terms of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{c}') + '.', 1, M('\\mathbf{a} + \\frac{1}{2}\\mathbf{c}')],
        ['Find the ratio ' + M('OP : PM') + ' and the ratio ' + M('AP : PC') + '.', 4, M('\\lambda(\\mathbf{a} + \\tfrac{1}{2}\\mathbf{c}) = \\mathbf{a} + \\mu(\\mathbf{c} - \\mathbf{a})') + ' gives ' + M('\\lambda = \\frac{2}{3},\\ \\mu = \\frac{1}{3}') + ': ' + M('OP : PM = 2 : 1') + ', ' + M('AP : PC = 1 : 2')],
        ['Prove that the diagonals of a parallelogram bisect each other.', 3, 'Both diagonals have midpoint ' + M('\\frac{1}{2}(\\mathbf{a} + \\mathbf{c})')]
      ]);
    }
  ]);

  X('transformations', [
    function () {
      var a = nz(-3, 3), b = a + nz(-4, 4);
      return Q('A shape is reflected in the line ' + M('x = ' + a) + ' and then in the line ' + M('x = ' + b) + '.', [
        ['Find the image of the point ' + M('(0,\\ 1)') + ' after both reflections.', 2, M('(0, 1) \\to (' + 2 * a + ', 1) \\to (' + (2 * b - 2 * a) + ', 1)')],
        ['Describe the single transformation equivalent to the two reflections.', 2, 'Translation by ' + M('\\begin{pmatrix} ' + 2 * (b - a) + ' \\\\ 0 \\end{pmatrix}')],
        ['Prove that reflecting in ' + M('x = p') + ' and then ' + M('x = q') + ' is always a translation by ' + M('\\begin{pmatrix} 2(q - p) \\\\ 0 \\end{pmatrix}') + '.', 3, M('x \\to 2p - x \\to 2q - (2p - x) = x + 2(q - p)')],
        ['What single transformation is a reflection in ' + M('y = 0') + ' followed by a reflection in ' + M('x = 0') + '?', 1, 'A rotation of 180° about the origin']
      ]);
    },
    function () {
      var c = [nz(-3, 3), nz(-3, 3)], k = pick([2, 3, -2, -1, 0.5]), P = [[c[0] + 1, c[1] + 1], [c[0] + 3, c[1] + 1], [c[0] + 1, c[1] + 2]];
      var img = P.map(function (p) { return [c[0] + k * (p[0] - c[0]), c[1] + k * (p[1] - c[1])]; });
      var pt = function (p) { return '(' + num(p[0]) + ',\\ ' + num(p[1]) + ')'; };
      return Q('Triangle ' + M('T') + ' has vertices ' + P.map(function (p) { return M(pt(p)); }).join(', ') + '. Its image after an enlargement is ' + img.map(function (p) { return M(pt(p)); }).join(', ') + '.', [
        ['Find the scale factor, explaining how you know its sign.', 2, M(num(k)) + (k < 0 ? ': the image is on the opposite side of the centre (inverted)' : ': the image is on the same side of the centre')],
        ['Find the centre of enlargement.', 3, M(pt(c)) + ' (where lines joining corresponding vertices meet)'],
        ['Find the ratio of the area of the image to the area of ' + M('T') + '.', 1, M(num(k * k) + ' : 1')]
      ]);
    }
  ]);

  X('sine-cosine', [
    function () {
      var a = ri(5, 12), b = ri(5, 12), C = ri(40, 130), r = C * Math.PI / 180;
      var d1 = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(r)), d2 = Math.sqrt(a * a + b * b + 2 * a * b * Math.cos(r));
      return Q('A parallelogram has sides ' + a + ' cm and ' + b + ' cm, with an angle of ' + C + '° between them.', [
        ['Find the lengths of both diagonals.', 4, M(sf3(d1)) + ' cm and ' + M(sf3(d2)) + ' cm (the other angle is ' + (180 - C) + '°)'],
        ['Find the area of the parallelogram.', 2, M(a + ' \\times ' + b + '\\sin ' + C + '° = ' + sf3(a * b * Math.sin(r))) + ' cm²'],
        ['Prove that for any parallelogram, the sum of the squares of the diagonals equals the sum of the squares of the four sides.', 3, M('d_1^2 + d_2^2 = (a^2 + b^2 - 2ab\\cos C) + (a^2 + b^2 + 2ab\\cos C) = 2a^2 + 2b^2') + ' (since ' + M('\\cos(180° - C) = -\\cos C') + ')']
      ]);
    },
    function () {
      var a = ri(5, 12), b = ri(5, 12), c = ri(Math.abs(a - b) + 2, a + b - 2), s = (a + b + c) / 2, A = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      var C = Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180 / Math.PI;
      return Q('A triangle has sides ' + a + ' cm, ' + b + ' cm and ' + c + ' cm.', [
        ['Find the angle opposite the side of length ' + c + ' cm.', 3, M(sf3(C) + '°')],
        ['Find the area of the triangle.', 2, M(sf3(A)) + ' cm²'],
        ['Find the length of the perpendicular from the opposite vertex to the side of length ' + c + ' cm.', 2, M('\\frac{2 \\times ' + sf3(A) + '}{' + c + '} = ' + sf3(2 * A / c)) + ' cm'],
        ['Without calculating, explain how you can tell from the side lengths whether the largest angle is acute or obtuse.', 2, 'Compare the square of the longest side with the sum of the squares of the other two: larger means obtuse, smaller means acute.']
      ]);
    }
  ]);

  X('circle-theorems', [
    function () {
      var x = ri(20, 70);
      return Q(M('AB') + ' is a diameter of a circle with centre ' + M('O') + '. ' + M('C') + ' is a point on the circle, and angle ' + M('OAC = ' + x + '°') + '.', [
        ['Explain why triangle ' + M('OAC') + ' is isosceles, and find angle ' + M('AOC') + '.', 2, M('OA = OC') + ' (radii); ' + M('AOC = ' + (180 - 2 * x) + '°')],
        ['Find angle ' + M('OCB') + '.', 2, 'Angle ' + M('BOC = ' + 2 * x + '°') + ', triangle ' + M('OBC') + ' isosceles: ' + M('OCB = ' + (90 - x) + '°')],
        ['Prove that angle ' + M('ACB = 90°') + ' for any position of ' + M('C') + '.', 3, 'Let ' + M('OAC = p') + ', ' + M('OBC = q') + '. Then ' + M('OCA = p,\\ OCB = q') + '; angles of triangle ' + M('ABC') + ': ' + M('2p + 2q = 180°') + ', so ' + M('ACB = p + q = 90°')]
      ]);
    },
    function () {
      var x = ri(10, 25), B = ri(30, 70);
      return Q(M('ABCD') + ' is a cyclic quadrilateral. Angle ' + M('DAB = (3y + 10)°') + ' and angle ' + M('BCD = (2y + ' + (170 - 5 * x) + ')°') + '. The tangent at ' + M('B') + ' makes an angle of ' + B + '° with the chord ' + M('BC') + '.', [
        ['Find ' + M('y') + '.', 2, M('5y + ' + (180 - 5 * x) + ' = 180') + ', ' + M('y = ' + x)],
        ['Find angle ' + M('BDC') + ', giving a reason.', 2, M(B + '°') + ' (alternate segment theorem)'],
        ['Given also that ' + M('DB') + ' bisects angle ' + M('ADC') + ', find angle ' + M('BDA') + ' and explain whether ' + M('AB = BC') + '.', 3, M('BDA = ' + B + '°') + '; equal angles at the circumference stand on equal chords, so ' + M('AB = BC')]
      ]);
    }
  ]);

  X('intersecting-chords', [
    function () {
      // PA = c, AB = ?, PC = a... use PA·PB = PC·PD with PA = x, AB = b, PC = a, CD = known
      var x = ri(3, 8), ab = ri(2, 6), pc = ri(2, 6), pd = x * (x + ab) / pc;
      while (!Number.isInteger(pd) || pd <= pc) { x = ri(3, 8); ab = ri(2, 6); pc = ri(2, 6); pd = x * (x + ab) / pc; }
      return Q('From a point ' + M('P') + ' outside a circle, two lines are drawn. One meets the circle at ' + M('A') + ' and ' + M('B') + ', the other at ' + M('C') + ' and ' + M('D') + '. ' + M('PC = ' + pc) + ' cm, ' + M('CD = ' + (pd - pc)) + ' cm and ' + M('AB = ' + ab) + ' cm.', [
        ['Show that ' + M('PA = x') + ' satisfies ' + M('x^2 + ' + ab + 'x - ' + pc * pd + ' = 0') + '.', 2, M('x(x + ' + ab + ') = ' + pc + ' \\times ' + pd)],
        ['Find ' + M('PA') + '.', 2, M('x = ' + x) + ' cm'],
        ['A tangent from ' + M('P') + ' touches the circle at ' + M('T') + '. Find ' + M('PT') + '.', 2, M('PT^2 = ' + pc * pd) + ', ' + M('PT = ' + sf3(Math.sqrt(pc * pd))) + ' cm'],
        ['Explain why ' + M('PA \\times PB') + ' must be the same for every line through ' + M('P') + ' that meets the circle twice.', 2, 'Each equals ' + M('PT^2') + ' (tangent–secant theorem).']
      ]);
    },
    function () {
      var x = ri(2, 8), y = ri(x + 2, 18), cx = Math.sqrt(x * y);
      while (!Number.isInteger(cx)) { x = ri(2, 8); y = ri(x + 2, 18); cx = Math.sqrt(x * y); }
      var r = (x + y) / 2;
      return Q('A chord ' + M('CD') + ' is perpendicular to a diameter ' + M('AB') + ' and meets it at ' + M('X') + '. ' + M('AX = ' + x) + ' cm and ' + M('XB = ' + y) + ' cm.', [
        ['Explain why ' + M('CX = XD') + '.', 1, 'A diameter perpendicular to a chord bisects it.'],
        ['Find the length of the chord ' + M('CD') + '.', 3, M('CX^2 = ' + x + ' \\times ' + y) + ', ' + M('CX = ' + cx) + ', ' + M('CD = ' + 2 * cx) + ' cm'],
        ['Find the radius, and check your answer to the previous part using Pythagoras.', 3, M('r = ' + num(r)) + '; ' + M('OX = ' + num(r - x)) + ', ' + M('OX^2 + CX^2 = ' + num((r - x) * (r - x) + cx * cx) + ' = r^2')]
      ]);
    }
  ]);

  /* ---------- Statistics and probability ---------- */
  X('averages', [
    function () {
      var n = ri(6, 12), m = ri(10, 30), rem = ri(m + 5, m + 25), m2 = (n * m - rem) / (n - 1);
      while (!Number.isInteger(m2 * 10)) { rem++; m2 = (n * m - rem) / (n - 1); }
      return Q('The mean of ' + n + ' numbers is ' + m + '. When one number is removed, the mean of the rest is ' + num(m2) + '.', [
        ['Find the number that was removed.', 3, M(n + ' \\times ' + m + ' - ' + (n - 1) + ' \\times ' + num(m2) + ' = ' + rem)],
        ['A number ' + M('k') + ' is now added so that the mean of the ' + n + ' numbers is ' + (m + 2) + '. Find ' + M('k') + '.', 2, M('k = ' + n * (m + 2) + ' - ' + num((n - 1) * m2) + ' = ' + num(n * (m + 2) - (n - 1) * m2))],
        ['Prove that adding a number greater than the mean always increases the mean.', 2, 'If ' + M('k > \\bar{x}') + ': ' + M('\\frac{n\\bar{x} + k}{n + 1} > \\frac{n\\bar{x} + \\bar{x}}{n + 1} = \\bar{x}')]
      ]);
    },
    function () {
      var w = [ri(1, 3), ri(1, 3), ri(2, 4)], s = [ri(45, 75), ri(45, 75)], A = ri(60, 75), need = (A * (w[0] + w[1] + w[2]) - w[0] * s[0] - w[1] * s[1]) / w[2];
      return Q('A course grade is a weighted mean of three tests with weights ' + w.join(' : ') + '. A student scored ' + s[0] + '% and ' + s[1] + '% on the first two tests.', [
        ['Find the overall grade if the student scores ' + s[1] + '% on the third test.', 2, M('\\frac{' + w[0] + ' \\times ' + s[0] + ' + ' + w[1] + ' \\times ' + s[1] + ' + ' + w[2] + ' \\times ' + s[1] + '}{' + (w[0] + w[1] + w[2]) + '} = ' + sf3((w[0] * s[0] + w[1] * s[1] + w[2] * s[1]) / (w[0] + w[1] + w[2]))) + '%'],
        ['Find the score needed on the third test for an overall grade of at least ' + A + '%.', 3, M(sf3(need)) + '%' + (need > 100 ? ' — impossible, as it exceeds 100%' : '')],
        ['Explain why a weighted mean must lie between the lowest and highest scores.', 2, 'It is a sum of the scores with positive weights adding to 1.']
      ]);
    }
  ]);

  X('stats-diagrams', [
    function () {
      var A = [ri(10, 20)], B = [ri(10, 20)];
      [A, B].forEach(function (S) { for (var i = 0; i < 4; i++) S.push(S[S.length - 1] + ri(3, 12)); });
      var iA = A[3] - A[1], iB = B[3] - B[1], out = A[4] > A[3] + 1.5 * iA;
      return Q('The five-number summaries (min, ' + M('Q_1') + ', median, ' + M('Q_3') + ', max) of reaction times, in hundredths of a second, for two groups are: Group A: ' + A.join(', ') + '; Group B: ' + B.join(', ') + '.', [
        ['Compare the two groups, using one measure of average and one measure of spread, in context.', 4, 'Medians ' + A[2] + ' and ' + B[2] + ' (' + (A[2] < B[2] ? 'A' : 'B') + ' typically faster); IQRs ' + iA + ' and ' + iB + ' (' + (iA < iB ? 'A' : 'B') + ' more consistent)'],
        ['An outlier is more than ' + M('1.5 \\times \\text{IQR}') + ' above ' + M('Q_3') + '. Is the maximum of Group A an outlier?', 2, 'Limit ' + M(num(A[3] + 1.5 * iA)) + ': ' + (out ? 'yes' : 'no')],
        ['Explain why the median and IQR are better than the mean and range when there may be outliers.', 2, 'They depend only on the middle of the data, so extreme values don\'t affect them.']
      ]);
    },
    function () {
      var w = 10, f = [ri(2, 6), ri(6, 14), ri(10, 20), ri(6, 14), ri(2, 6)], N = f.reduce(function (s, v) { return s + v; }, 0), cf = [], s = 0;
      f.forEach(function (v) { s += v; cf.push(s); });
      var interp = function (target) { var c0 = 0; for (var i = 0; i < 5; i++) { if (cf[i] >= target) return 20 + i * w + (target - c0) / f[i] * w; c0 = cf[i]; } return 70; };
      var med = interp(N / 2), q1 = interp(N / 4), q3 = interp(3 * N / 4), k = ri(45, 58), above = N - (function () { var c0 = 0; for (var i = 0; i < 5; i++) { var hi = 20 + (i + 1) * w; if (k <= hi) return c0 + (k - (20 + i * w)) / w * f[i]; c0 = cf[i]; } return N; })();
      return Q('The table shows the masses of ' + N + ' parcels.' + BS.ib.table(['Mass, \\(m\\) kg', '\\(20 < m \\le 30\\)', '\\(30 < m \\le 40\\)', '\\(40 < m \\le 50\\)', '\\(50 < m \\le 60\\)', '\\(60 < m \\le 70\\)'], [['Frequency'].concat(f)]), [
        ['Use linear interpolation to estimate the median and the interquartile range.', 4, 'Median ' + M(sf3(med)) + ' kg; ' + M('Q_1 = ' + sf3(q1) + ',\\ Q_3 = ' + sf3(q3)) + ', IQR ' + M(sf3(q3 - q1)) + ' kg'],
        ['Estimate the number of parcels heavier than ' + k + ' kg.', 2, M(sf3(above))],
        ['Explain why your answers are only estimates.', 1, 'We assume the masses are spread evenly within each class.']
      ]);
    }
  ]);

  X('probability', [
    function () {
      var k = ri(5, 9), ways = 6 - Math.abs(7 - k), dbl = k % 2 === 0 ? 1 : 0, ge = 0, dge = 0, s = ri(8, 10);
      for (var a = 1; a <= 6; a++) for (var b = 1; b <= 6; b++) if (a + b >= s) { ge++; if (a === b) dge++; }
      return Q('Two fair six-sided dice are rolled.', [
        ['Find the probability that the total is ' + k + '.', 2, M(F(ways, 36))],
        ['Find the probability that the product is even.', 2, M('1 - \\frac{9}{36} = \\frac{3}{4}')],
        ['Given that the total is at least ' + s + ', find the probability that both dice show the same number.', 3, M(F(dge, ge))],
        ['Prove that the probability of a total of ' + M('n') + ' equals the probability of a total of ' + M('14 - n') + '.', 2, 'Replace each score ' + M('x') + ' by ' + M('7 - x') + ': this pairs every outcome with total ' + M('n') + ' with one with total ' + M('14 - n') + '.']
      ]);
    },
    function () {
      var p = pick([[1, 6], [1, 4], [1, 3], [1, 2]]), pr = p[0] / p[1], q = 1 - pr, win = pr / (1 - q * q);
      return Q('Amy and Ben take turns to roll a dice, starting with Amy. The first person to succeed wins. Each roll succeeds with probability ' + M(F(p[0], p[1])) + '.', [
        ['Find the probability that Amy wins on her second turn.', 2, M('\\left(' + F(p[1] - p[0], p[1]) + '\\right)^2 \\times ' + F(p[0], p[1]) + ' = ' + F(Math.pow(p[1] - p[0], 2) * p[0], Math.pow(p[1], 3)))],
        ['Show that the probability that Amy wins is the sum of a geometric series, and find it.', 4, M(F(p[0], p[1]) + '\\left(1 + q^2 + q^4 + \\cdots\\right) = \\frac{' + F(p[0], p[1]) + '}{1 - q^2}') + ' with ' + M('q = ' + F(p[1] - p[0], p[1])) + ': ' + M(F(p[1], 2 * p[1] - p[0]))],
        ['Explain why going first is an advantage, whatever the probability of success.', 2, 'Amy wins with probability ' + M('\\frac{p}{1 - q^2} = \\frac{1}{1 + q} > \\frac{1}{2}') + ' since ' + M('q < 1')]
      ]);
    }
  ]);

  X('sets', [
    function () {
      var x = ri(3, 9), a = ri(10, 25), b = ri(10, 25), T = a + b - x + 2 * x + ri(0, 5);
      var nei = T - (a + b - x);
      return Q('In a group of ' + T + ' students, ' + a + ' study French (' + M('F') + ') and ' + b + ' study German (' + M('G') + '). The number who study neither is twice the number who study both.', [
        ['Let ' + M('x') + ' be the number who study both. Show that ' + M(T + ' = ' + (a + b) + ' - x + 2x') + '.', 2, M('n(F \\cup G) = ' + a + ' + ' + b + ' - x') + ', plus neither ' + M('2x')],
        ['Solve to find ' + M('x') + ', and complete a Venn diagram.', 3, M('x = ' + (T - a - b)) + ': only F ' + (a - (T - a - b)) + ', both ' + (T - a - b) + ', only G ' + (b - (T - a - b)) + ', neither ' + 2 * (T - a - b)],
        ['A student who studies at least one of the languages is chosen at random. Find the probability that they study both.', 2, M(F(T - a - b, a + b - (T - a - b)))]
      ]);
    },
    function () {
      var n = ri(30, 60);
      var multiples = function (k) { return Math.floor(n / k); };
      var a = pick([2, 3]), b = pick([5, 7]);
      return Q(M('\\xi = \\{1, 2, 3, \\ldots, ' + n + '\\}') + ', ' + M('A = \\{\\text{multiples of } ' + a + '\\}') + ' and ' + M('B = \\{\\text{multiples of } ' + b + '\\}') + '.', [
        ['Find ' + M('n(A)') + ', ' + M('n(B)') + ' and ' + M('n(A \\cap B)') + '.', 3, multiples(a) + ', ' + multiples(b) + ', ' + multiples(a * b) + ' (multiples of ' + a * b + ')'],
        ['Find ' + M('n(A \\cup B)') + ' and hence the probability that a randomly chosen number is a multiple of neither.', 3, M('n(A \\cup B) = ' + (multiples(a) + multiples(b) - multiples(a * b))) + '; ' + M(F(n - (multiples(a) + multiples(b) - multiples(a * b)), n))],
        ['Explain why ' + M('A \\cap B') + ' is the set of multiples of ' + a * b + '.', 1, a + ' and ' + b + ' are coprime, so a number divisible by both is divisible by ' + a * b + '.']
      ]);
    }
  ]);

  /* ---------- More number ---------- */
  X('surds', [
    function () {
      var a = ri(2, 5), b = pick([2, 3, 5, 7]); while (a * a <= b) a++;
      var area = a * a - b, d2 = 2 * (a * a + b);
      return Q('A rectangle has sides ' + M('(' + a + ' + \\sqrt{' + b + '})') + ' cm and ' + M('(' + a + ' - \\sqrt{' + b + '})') + ' cm.', [
        ['Find the area of the rectangle.', 2, M(area) + ' cm²'],
        ['Find the exact length of the diagonal.', 3, M('\\sqrt{(' + a + ' + \\sqrt{' + b + '})^2 + (' + a + ' - \\sqrt{' + b + '})^2} = \\sqrt{' + d2 + '}') + ' cm'],
        ['Find the ratio of the longer side to the shorter side in the form ' + M('p + q\\sqrt{' + b + '}') + '.', 3, M('\\frac{(' + a + ' + \\sqrt{' + b + '})^2}{' + area + '} = ' + F(a * a + b, area) + ' + ' + F(2 * a, area) + '\\sqrt{' + b + '}')]
      ]);
    },
    function () {
      var p = pick([2, 3]), n = ri(2, 6);
      var A = 1 + 3 * p, B = 3 + p; // (1 + √p)^3 = 1 + 3√p + 3p + p√p
      return Q('', [
        ['Show that ' + M('(1 + \\sqrt{' + p + '})^3 = ' + A + ' + ' + B + '\\sqrt{' + p + '}') + '.', 3, M('1 + 3\\sqrt{' + p + '} + 3(' + p + ') + ' + p + '\\sqrt{' + p + '}')],
        ['Hence write down ' + M('(1 - \\sqrt{' + p + '})^3') + ' and explain your answer.', 2, M(A + ' - ' + B + '\\sqrt{' + p + '}') + ': replacing ' + M('\\sqrt{' + p + '}') + ' by ' + M('-\\sqrt{' + p + '}') + ' changes the sign of each odd power'],
        ['Hence show that ' + M('(1 + \\sqrt{' + p + '})^3 + (1 - \\sqrt{' + p + '})^3') + ' is an integer, and find it.', 2, M(2 * A)],
        ['Solve ' + M('x\\sqrt{' + p * 4 + '} - ' + n + ' = x\\sqrt{' + p + '} + ' + n) + ', giving ' + M('x') + ' in the form ' + M('k\\sqrt{' + p + '}') + '.', 3, M('x\\sqrt{' + p + '} = ' + 2 * n) + ', ' + M('x = ' + F(2 * n, p) + '\\sqrt{' + p + '}')]
      ]);
    }
  ]);

  X('bounds', [
    function () {
      var d = ri(150, 400), t = ri(20, 60), lim = Math.round(d / t * 3.6 / 5) * 5 + pick([0, 5]);
      var vu = (d + 0.5) / (t - 0.5) * 3.6, vl = (d - 0.5) / (t + 0.5) * 3.6;
      return Q('A speed camera measures that a car travels ' + d + ' m, to the nearest metre, in ' + t + ' s, to the nearest second. The speed limit is ' + lim + ' km/h.', [
        ['Find the upper and lower bounds for the speed in km/h.', 4, 'Upper ' + M('\\frac{' + (d + 0.5) + '}{' + (t - 0.5) + '} \\times 3.6 = ' + sf3(vu)) + '; lower ' + M(sf3(vl))],
        ['Can the police be certain the car was speeding? Explain.', 2, vl > lim ? 'Yes: even the lower bound exceeds ' + lim + ' km/h.' : vu < lim ? 'Yes, it certainly was not speeding: the upper bound is below the limit.' : 'No: the bounds lie either side of the limit.'],
        ['To what accuracy would the time need to be measured for the police to be certain, either way? Explain.', 2, 'A smaller error in the time narrows the interval; e.g. to the nearest 0.1 s the bounds would be closer to ' + sf3(d / t * 3.6) + ' km/h.']
      ]);
    },
    function () {
      var A = ri(20, 90) * 10, lo = Math.sqrt(A - 5), hi = Math.sqrt(A + 5);
      return Q('The area of a square is ' + A + ' cm², correct to the nearest 10 cm².', [
        ['Find the upper and lower bounds of the side length.', 3, M('\\sqrt{' + (A - 5) + '} = ' + sf3(lo)) + ' and ' + M('\\sqrt{' + (A + 5) + '} = ' + sf3(hi))],
        ['Give the side length to an appropriate degree of accuracy, explaining your choice.', 2, (function () { for (var d = 2; d >= -1; d--) { var f = Math.pow(10, d); if (Math.round(lo * f) === Math.round(hi * f)) return 'Both bounds round to ' + num(Math.round(lo * f) / f) + ' cm' + (d > 0 ? ' to ' + d + ' d.p.' : d === 0 ? ' to the nearest cm' : ' to the nearest 10 cm'); } return 'The bounds do not agree even to the nearest 10 cm.'; })()],
        ['Explain why the bounds of the side are not exactly half a unit either side of ' + M('\\sqrt{' + A + '}') + '.', 2, 'Square root is not linear: the gap below and above differ.']
      ]);
    }
  ]);

  X('kinematic-graphs', [
    function () {
      var v1 = ri(3, 6), v2 = v1 + ri(2, 5), d = ri(2, 6) * v1, T = d / (v2 - v1) + d / v1;
      var tc = (v2 * d / v1) / (v2 - v1);
      return Q('Cyclist A sets off at ' + v1 + ' m/s. Cyclist B starts from the same place ' + num(d / v1) + ' s later, at ' + v2 + ' m/s, along the same road.', [
        ['On one distance–time graph, sketch both journeys. Explain what the point where the lines cross represents.', 2, 'Two straight lines from the origin and from ' + M('(' + num(d / v1) + ',\\ 0)') + '; the crossing is where B catches A.'],
        ['Find when and where B catches A.', 4, M(v1 + 't = ' + v2 + '(t - ' + num(d / v1) + ')') + ': ' + M('t = ' + sf3(tc)) + ' s after A starts, ' + sf3(v1 * tc) + ' m from the start'],
        ['Explain how the gradients show which cyclist is faster.', 1, 'The gradient of a distance–time graph is the speed; B’s line is steeper.']
      ]);
    },
    function () {
      var u = ri(10, 30), r = pick([0.5, 0.6, 0.7, 0.8]), a = ri(4, 8), d = u * r + u * u / (2 * a);
      return Q('A driver travelling at ' + u + ' m/s sees a hazard. After a reaction time of ' + r + ' s she brakes, decelerating uniformly at ' + a + ' m/s² until she stops.', [
        ['Sketch the speed–time graph and find the total stopping distance.', 4, 'Rectangle ' + M(u + ' \\times ' + r + ' = ' + num(u * r)) + ' m plus triangle ' + M('\\frac{1}{2} \\times ' + u + ' \\times ' + F(u, a) + ' = ' + F(u * u, 2 * a)) + ' m: ' + sf3(d) + ' m'],
        ['Show that the stopping distance at speed ' + M('v') + ' is ' + M(r + 'v + \\frac{v^2}{' + 2 * a + '}') + '.', 2, 'Reaction distance ' + M(r + 'v') + '; braking time ' + M('\\frac{v}{' + a + '}') + ', triangle area ' + M('\\frac{v^2}{' + 2 * a + '}')],
        ['Explain why doubling the speed more than doubles the stopping distance.', 2, 'The braking distance is proportional to ' + M('v^2') + ', so it quadruples.']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
