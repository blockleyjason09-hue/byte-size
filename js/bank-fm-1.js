/* Byte Size — AQA Level 2 Certificate in Further Mathematics (8365): Number and Algebra.
   Topics reuse the matching International GCSE question types and add Further Maths ones.
   Difficulty: 1 = Standard, 2 = Exam, 3 = Challenging. */
(function (g) {
  var BS = g.BS, D = BS.draw, G = BS.gcse2;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, dp = BS.dp, num = BS.num, M = BS.m, sf = BS.sf;
  var surd = G.surd;
  function q1(q, m, a, stem) { return { stem: stem, parts: [{ q: q, m: m, a: a }] }; }
  function from(id, idx) { var gs = BS.topics[id].gens; return (idx || gs.map(function (_, i) { return i; })).map(function (i) { return gs[i]; }); }
  function comb(n, k) { var r = 1; for (var i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; } // coefficient beside a letter
  function tc(c, t) { return (c < 0 ? ' - ' : ' + ') + (Math.abs(c) === 1 ? '' : Math.abs(c)) + t; } // signed term
  var FM = BS.fm = { from: from, comb: comb, c1: c1, tc: tc };

  /* =============== NUMBER =============== */
  BS.topic({ id: 'fm-counting', name: 'The product rule for counting', video: 'product rule for counting further maths', gens: [
    { d: [1, 2], f: function () { // digits without repetition, with a condition
      var pool = BS.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, ri(5, 6)).sort(function (a, b) { return a - b; }), k = ri(3, 4);
      var cond = pick(['odd', 'even', 'greater', 'any']), lim = Math.pow(10, k - 1) * pick([3, 4, 5, 6]), cnt = 0;
      (function rec(prefix, used) {
        if (prefix.length === k) {
          if (prefix[0] === 0) return; var n = Number(prefix.join(''));
          if (cond === 'odd' && n % 2 === 0) return; if (cond === 'even' && n % 2) return; if (cond === 'greater' && n <= lim) return;
          cnt++; return;
        }
        pool.forEach(function (d) { if (used.indexOf(d) < 0) rec(prefix.concat([d]), used.concat([d])); });
      })([], []);
      var desc = cond === 'odd' ? 'odd ' : cond === 'even' ? 'even ' : '';
      return q1('Here are ' + pool.length + ' digits: ' + M(pool.join(',\\ ')) + '.<br>How many ' + desc + k + '-digit numbers' + (cond === 'greater' ? ' greater than ' + num(lim) : '') + ' can be made using these digits, if no digit may be used more than once?' + (pool[0] === 0 ? ' A number cannot start with 0.' : ''), cond === 'any' ? 2 : 3, String(cnt));
    } },
    { d: [1], f: function () { // codes with repetition
      var L = ri(2, 3), Dg = ri(2, 4);
      return { stem: 'A security code is made of ' + L + ' letters from A to Z followed by ' + Dg + ' digits from 0 to 9. Letters and digits may be repeated.', parts: [
        { q: 'How many different codes are possible?', m: 2, a: M('26^{' + L + '} \\times 10^{' + Dg + '} = ' + num(Math.pow(26, L) * Math.pow(10, Dg))) },
        { q: 'How many codes have no repeated letters and no repeated digits?', m: 2, a: num(perm(26, L) * perm(10, Dg)) }
      ] };
      function perm(n, r) { var x = 1; for (var i = 0; i < r; i++) x *= n - i; return x; }
    } },
    { d: [2, 3], f: function () { // menu / outfits and probability
      var a = ri(3, 6), b = ri(4, 8), c = ri(2, 5), v = ri(2, a - 1);
      return { stem: 'A café offers ' + a + ' starters, ' + b + ' main courses and ' + c + ' desserts. A meal is one starter, one main course and one dessert. ' + v + ' of the starters are vegetarian.', parts: [
        { q: 'How many different meals are possible?', m: 1, a: M(a + ' \\times ' + b + ' \\times ' + c + ' = ' + a * b * c) },
        { q: 'Sam chooses a meal at random. Work out the probability that the starter is vegetarian.', m: 2, a: M(frac(v * b * c, a * b * c)) }
      ] };
    } },
    { d: [3], f: function () { // arrangements with fixed ends
      var n = ri(5, 7), letters = 'ABCDEFG'.slice(0, n).split('');
      var f = 1; for (var i = 2; i <= n - 2; i++) f *= i; var all = 1; for (var j = 2; j <= n; j++) all *= j;
      return { stem: n + ' people, ' + letters.join(', ') + ', stand in a line for a photo.', parts: [
        { q: 'How many different arrangements are possible?', m: 1, a: num(all) },
        { q: 'How many arrangements have ' + letters[0] + ' at one end and ' + letters[1] + ' at the other end?', m: 2, a: M('2 \\times ' + (n - 2) + '! = ' + num(2 * f)) }
      ] };
    } }
  ] });

  BS.topic({ id: 'fm-surds', name: 'Surds', video: 'surds rationalise the denominator further maths', gens: from('surds').concat([
    { d: [2, 3], f: function () { // a + b√k form after rationalising (a+√k) denominator
      var k = pick([2, 3, 5, 7]), p = ri(2, 6), q = nz(-3, 3); while (p * p === k) p++;
      var u = ri(1, 9), v = nz(-4, 4); while (u + v * p === 0) u = ri(1, 9); var N = [u * p + v * k, u + v * p]; // (u + v√k)(p + √k)
      var den = p * p - k, top = [N[0] * p - N[1] * k, N[1] * p - N[0]];
      return q1('Write ' + M('\\frac{' + N[0] + (N[1] < 0 ? ' - ' : ' + ') + (Math.abs(N[1]) === 1 ? '' : Math.abs(N[1])) + '\\sqrt{' + k + '}}{' + p + ' + \\sqrt{' + k + '}}') + ' in the form ' + M('a + b\\sqrt{' + k + '}') + ', where ' + M('a') + ' and ' + M('b') + ' are integers.', 3,
        'Multiply top and bottom by ' + M(p + ' - \\sqrt{' + k + '}') + ': ' + M(u + (v < 0 ? ' - ' : ' + ') + (Math.abs(v) === 1 ? '' : Math.abs(v)) + '\\sqrt{' + k + '}'));
    } },
    { d: [2], f: function () { // expand product of surds
      var k = pick([2, 3, 5, 6, 7]), a = ri(1, 6), b = nz(-4, 4), c = ri(1, 6), d = nz(-4, 4);
      var A = a * c + b * d * k, B = a * d + b * c;
      return q1('Expand and simplify ' + M('(' + a + (b < 0 ? ' - ' : ' + ') + c1(Math.abs(b), '\\sqrt{' + k + '}') + ')(' + c + (d < 0 ? ' - ' : ' + ') + c1(Math.abs(d), '\\sqrt{' + k + '}') + ')') + '. Give your answer in the form ' + M('a + b\\sqrt{' + k + '}') + '.', 2,
        M(B === 0 ? String(A) : A + (B < 0 ? ' - ' : ' + ') + c1(Math.abs(B), '\\sqrt{' + k + '}')));
    } },
    { d: [3], f: function () { // surd area / Pythagoras exact
      var k = pick([3, 5]), a = ri(2, 5), b = ri(1, 3);
      var A = a * a + b * b * k, B = 2 * a * b;
      return q1('A square has side length ' + M('(' + a + ' + ' + c1(b, '\\sqrt{' + k + '}') + ')') + ' cm.<br>Show that its area is ' + M('(' + A + ' + ' + B + '\\sqrt{' + k + '})') + ' cm² and find the length of its diagonal in the form ' + M('p\\sqrt{2} + q\\sqrt{' + 2 * k + '}') + '.', 4,
        M('(' + a + ' + ' + c1(b, '\\sqrt{' + k + '}') + ')^2 = ' + a * a + ' + ' + 2 * a * b + '\\sqrt{' + k + '} + ' + b * b * k) + '; diagonal ' + M('= \\sqrt{2}(' + a + ' + ' + c1(b, '\\sqrt{' + k + '}') + ') = ' + c1(a, '\\sqrt{2}') + ' + ' + c1(b, '\\sqrt{' + 2 * k + '}')));
    } }
  ]) });

  /* =============== ALGEBRA =============== */
  BS.topic({ id: 'fm-functions', name: 'Functions: domain, range, composite and inverse', video: 'further maths functions domain range', gens: from('functions').concat([
    { d: [1, 2], f: function () { // domain with excluded value
      var a = ri(1, 9), b = nz(-6, 6);
      return { stem: M('\\mathrm{f}(x) = \\frac{' + a + '}{' + poly([1, b]) + '}') + '.', parts: [
        { q: 'Write down the value of ' + M('x') + ' that cannot be in the domain of ' + M('\\mathrm{f}') + '.', m: 1, a: M('x = ' + (-b)) },
        { q: 'Write down the value that is not in the range of ' + M('\\mathrm{f}') + '.', m: 1, a: M('0') }
      ] };
    } },
    { d: [2, 3], f: function () { // range of a quadratic on a domain
      var p = nz(-4, 4), q = ri(-6, 6), lo = ri(-3, 3);
      var f = function (x) { return (x - p) * (x - p) + q; }, c = [1, -2 * p, p * p + q];
      var mn = lo <= p ? q : f(lo);
      return { stem: M('\\mathrm{f}(x) = ' + poly(c)) + ' with domain ' + M('x \\ge ' + lo) + '.', parts: [
        { q: 'Write ' + M('\\mathrm{f}(x)') + ' in the form ' + M('(x + a)^2 + b') + '.', m: 2, a: M(br(1, -p) + '^2' + (q ? sg(q) : '')) },
        { q: 'Find the range of ' + M('\\mathrm{f}') + '.', m: 2, a: M('\\mathrm{f}(x) \\ge ' + mn) }
      ] };
    } },
    { d: [2, 3], f: function () { // inverse of a rational function
      var a = ri(2, 5), b = nz(-6, 6), c = nz(-5, 5); while (a * c + b === 0) b = nz(-6, 6);
      // f(x) = (ax + b)/(x + c) -> inverse (b - c x)/(x - a)
      return { stem: M('\\mathrm{f}(x) = \\frac{' + poly([a, b]) + '}{' + poly([1, c]) + '}') + ', ' + M('x \\ne ' + (-c)) + '.', parts: [
        { q: 'Find ' + M('\\mathrm{f}^{-1}(x)') + '.', m: 3, a: M('y(x' + sg(c) + ') = ' + poly([a, b]) + ' \\Rightarrow x(y - ' + a + ') = ' + poly([-c, b], 'y') + ' \\Rightarrow \\mathrm{f}^{-1}(x) = \\frac{' + poly([-c, b]) + '}{x - ' + a + '}') },
        { q: 'Write down the value of ' + M('x') + ' that must be excluded from the domain of ' + M('\\mathrm{f}^{-1}') + '.', m: 1, a: M('x = ' + a) }
      ] };
    } },
    { d: [2], f: function () { // composite with a square root
      var a = ri(2, 5), b = ri(1, 9), k = ri(2, 6), x0 = (k * k - b) / a;
      while (x0 !== Math.round(x0)) { b = ri(1, 9); k = ri(2, 6); x0 = (k * k - b) / a; }
      return { stem: M('\\mathrm{f}(x) = \\sqrt{x}') + ' for ' + M('x \\ge 0') + ' and ' + M('\\mathrm{g}(x) = ' + poly([a, b])) + '.', parts: [
        { q: 'Find ' + M('\\mathrm{fg}(x)') + '.', m: 1, a: M('\\sqrt{' + poly([a, b]) + '}') },
        { q: 'Solve ' + M('\\mathrm{fg}(x) = ' + k) + '.', m: 2, a: M(poly([a, b]) + ' = ' + k * k + ' \\Rightarrow x = ' + x0) },
        { q: 'State the domain of ' + M('\\mathrm{fg}') + '.', m: 1, a: M('x \\ge ' + frac(-b, a)) }
      ] };
    } }
  ]) });

  BS.topic({ id: 'fm-binomial', name: 'Binomial expansion and Pascal’s triangle', video: 'binomial expansion pascals triangle further maths', gens: [
    { d: [1], f: function () {
      var n = ri(3, 5), a = ri(1, 3), b = nz(-3, 3), terms = [];
      for (var k = 0; k <= n; k++) terms.push(comb(n, k) * Math.pow(a, n - k) * Math.pow(b, k));
      return q1('Expand ' + M('(' + a + (b < 0 ? ' - ' : ' + ') + c1(Math.abs(b), 'x') + ')^{' + n + '}') + '. Simplify your answer.', 3, M(poly(terms.slice().reverse())));
    } },
    { d: [2], f: function () { // coefficient of x^k
      var n = ri(5, 8), a = ri(1, 4), b = nz(-3, 3), k = ri(2, n - 2), coef = comb(n, k) * Math.pow(a, n - k) * Math.pow(b, k);
      return q1('Find the coefficient of ' + M('x^{' + k + '}') + ' in the expansion of ' + M('(' + a + (b < 0 ? ' - ' : ' + ') + c1(Math.abs(b), 'x') + ')^{' + n + '}') + '.', 2,
        M('\\binom{' + n + '}{' + k + '}(' + a + ')^{' + (n - k) + '}(' + b + ')^{' + k + '} = ' + num(coef)));
    } },
    { d: [3], f: function () { // find a from a coefficient
      var n = ri(4, 7), a = nz(-4, 4), c2 = comb(n, 2) * a * a, c1_ = n * a;
      return { stem: 'In the expansion of ' + M('(1 + ax)^{' + n + '}') + ', the coefficient of ' + M('x^2') + ' is ' + c2 + ' and the coefficient of ' + M('x') + ' is ' + (a > 0 ? 'positive' : 'negative') + '.', parts: [
        { q: 'Find the value of ' + M('a') + '.', m: 3, a: M(comb(n, 2) + 'a^2 = ' + c2 + ' \\Rightarrow a = ' + a) },
        { q: 'Find the coefficient of ' + M('x^3') + '.', m: 2, a: num(comb(n, 3) * a * a * a) }
      ] };
    } },
    { d: [1, 2], f: function () { // Pascal row and (x + y)^n
      var n = ri(4, 6), row = []; for (var k = 0; k <= n; k++) row.push(comb(n, k));
      var t = []; for (var j = 0; j <= n; j++) t.push((row[j] === 1 ? '' : row[j]) + (n - j ? (n - j === 1 ? 'x' : 'x^{' + (n - j) + '}') : '') + (j ? (j === 1 ? 'y' : 'y^{' + j + '}') : ''));
      return { stem: '', parts: [
        { q: 'Write down row ' + n + ' of Pascal’s triangle (the row that starts 1, ' + n + ').', m: 1, a: row.join(', ') },
        { q: 'Hence expand ' + M('(x + y)^{' + n + '}') + '.', m: 2, a: M(t.join(' + ')) }
      ] };
    } }
  ] });

  BS.topic({ id: 'fm-algebra', name: 'Expanding, factorising and algebraic fractions', video: 'algebraic fractions further maths', gens: from('expand-factorise', [4, 5, 10, 11]).concat([
    { d: [1, 2], f: function () { // quadratic times linear
      var a = nz(-5, 5), b = nz(-6, 6), c = nz(-6, 6);
      return q1('Expand and simplify ' + M('(x' + sg(a) + ')(' + poly([1, b, c]) + ')') + '.', 2, M(poly([1, b + a, c + a * b, a * c])));
    } },
    { d: [2], f: function () { // two-variable quadratic
      var p = ri(1, 3), q = nz(-5, 5), r = ri(1, 3), s = nz(-5, 5);
      return q1('Factorise fully ' + M(poly([p * r, p * s + q * r, q * s]).replace(/x(?!\^)/g, 'xy').replace(/(\d|^|-|\s)y?$/, '$1') ) + '.', 2, '');
    } },
    { d: [2, 3], f: function () { // divide algebraic fractions
      var a = nz(-5, 5), b = nz(-5, 5), c = ri(2, 4), d = nz(-6, 6); while (b === a || b === -a || d === a || d === b) { b = nz(-5, 5); d = nz(-6, 6); }
      // (x^2 - a^2)/((x + a)(x + b)) ÷ (x - a)/(c(x + d))  = c(x + d)/(x + b)
      return q1('Simplify fully ' + M('\\frac{' + poly([1, 0, -a * a]) + '}{' + poly([1, a + b, a * b]) + '} \\div \\frac{' + poly([1, -a]) + '}{' + poly([c, c * d]) + '}') + '.', 4,
        M('\\frac{' + br(1, a) + br(1, -a) + '}{' + br(1, a) + br(1, b) + '} \\times \\frac{' + c + br(1, d) + '}{' + poly([1, -a]) + '} = \\frac{' + c + br(1, d) + '}{' + poly([1, b]) + '}'));
    } },
    { d: [3], f: function () { // subtract fractions with quadratic denominator
      var a = nz(-5, 5), b = nz(-5, 5), p = ri(1, 5); while (a === b) b = nz(-5, 5);
      // p/((x+a)(x+b)) - 1/(x+a)... = (p - (x + b))/((x+a)(x+b))
      return q1('Write ' + M('\\frac{' + p + '}{' + poly([1, a + b, a * b]) + '} - \\frac{1}{' + poly([1, a]) + '}') + ' as a single fraction in its simplest form.', 3,
        M('\\frac{' + p + ' - ' + br(1, b) + '}{' + br(1, a) + br(1, b) + '} = \\frac{' + poly([-1, p - b]) + '}{' + br(1, a) + br(1, b) + '}'));
    } }
  ]) });
  // fill the two-variable factorisation answer with a clean construction
  BS.topics['fm-algebra'].gens[5].f = function () {
    var p, q, r, s, k = pick([1, 1, 2, 3]); do { p = ri(1, 3); q = nz(-5, 5); r = ri(1, 3); s = nz(-5, 5); } while (gcd(p, Math.abs(q)) > 1 || gcd(r, Math.abs(s)) > 1 || (p === r && q === s));
    function lin(a, b) { return c1(a, 'x') + (b < 0 ? ' - ' : ' + ') + c1(Math.abs(b), 'y'); }
    var A = k * p * r, B = k * (p * s + q * r), C = k * q * s;
    var expr = c1(A, 'x^2') + (B === 0 ? '' : (B < 0 ? ' - ' : ' + ') + c1(Math.abs(B), 'xy')) + (C < 0 ? ' - ' : ' + ') + c1(Math.abs(C), 'y^2');
    return q1('Factorise fully ' + M(expr) + '.', 2, M((k === 1 ? '' : k) + '(' + lin(p, q) + ')(' + lin(r, s) + ')'));
  };

  BS.topic({ id: 'fm-factor', name: 'The factor theorem and cubic equations', video: 'factor theorem further maths', gens: [
    { d: [1, 2], f: function () { // show factor, factorise fully
      var r = [nz(-4, 4), nz(-5, 5), nz(-5, 5)]; while (r[1] === r[0]) r[1] = nz(-5, 5); while (r[2] === r[0] || r[2] === r[1]) r[2] = nz(-5, 5);
      var c = [1, -(r[0] + r[1] + r[2]), r[0] * r[1] + r[0] * r[2] + r[1] * r[2], -r[0] * r[1] * r[2]];
      return { stem: M('\\mathrm{f}(x) = ' + poly(c)), parts: [
        { q: 'Use the factor theorem to show that ' + M(poly([1, -r[0]])) + ' is a factor of ' + M('\\mathrm{f}(x)') + '.', m: 2, a: M('\\mathrm{f}(' + r[0] + ') = 0') + ', so ' + M(poly([1, -r[0]])) + ' is a factor.' },
        { q: 'Factorise ' + M('\\mathrm{f}(x)') + ' fully.', m: 3, a: M(br(1, -r[0]) + br(1, -r[1]) + br(1, -r[2])) }
      ] };
    } },
    { d: [2], f: function () { // find k then solve
      var r = [nz(-3, 3), nz(-4, 4), nz(-5, 5)]; while (r[1] === r[0]) r[1] = nz(-4, 4); while (r[2] === r[0] || r[2] === r[1]) r[2] = nz(-5, 5);
      var c = [1, -(r[0] + r[1] + r[2]), r[0] * r[1] + r[0] * r[2] + r[1] * r[2], -r[0] * r[1] * r[2]];
      var shown = poly(c.slice(0, 3).concat([0])).replace(/ [+-] 0$/, '');
      return { stem: M(poly([1, -r[0]])) + ' is a factor of ' + M(poly([1, c[1], c[2], 0]) + ' + k') + '.', parts: [
        { q: 'Find the value of ' + M('k') + '.', m: 2, a: M('(' + r[0] + ')^3' + (c[1] ? tc(c[1], '(' + r[0] + ')^2') : '') + (c[2] ? tc(c[2], '(' + r[0] + ')') : '') + ' + k = 0 \\Rightarrow k = ' + c[3]) },
        { q: 'Hence solve ' + M(poly(c) + ' = 0') + '.', m: 3, a: M('x = ' + r.slice().sort(function (a, b) { return a - b; }).join(',\\ ')) }
      ] };
    } },
    { d: [3], f: function () { // two unknown coefficients
      var r = [nz(-3, 3), nz(-3, 3), nz(-4, 4)]; while (r[1] === r[0]) r[1] = nz(-3, 3); while (r[2] === r[0] || r[2] === r[1]) r[2] = nz(-4, 4);
      var a = ri(1, 2), c = [a, -a * (r[0] + r[1] + r[2]), a * (r[0] * r[1] + r[0] * r[2] + r[1] * r[2]), -a * r[0] * r[1] * r[2]];
      return { stem: M(poly([1, -r[0]])) + ' and ' + M(poly([1, -r[1]])) + ' are factors of ' + M(poly([a, 0, 0, 0]) + ' + px^2 + qx' + sg(c[3])) + '.', parts: [
        { q: 'Find the values of ' + M('p') + ' and ' + M('q') + '.', m: 4, a: 'Use ' + M('\\mathrm{f}(' + r[0] + ') = 0') + ' and ' + M('\\mathrm{f}(' + r[1] + ') = 0') + ' and solve simultaneously: ' + M('p = ' + c[1] + ',\\ q = ' + c[2]) },
        { q: 'Find the third linear factor.', m: 1, a: M(br(1, -r[2])) + (a === 1 ? '' : ' (and the constant factor ' + a + ')') }
      ] };
    } },
    { d: [2, 3], f: function () { // quintic / higher power
      var r = pick([1, -1, 2]), n = 5, b = ri(2, 6), cst = -(Math.pow(r, 5) + b * Math.pow(r, 2));
      return q1('Show that ' + M(poly([1, -r])) + ' is a factor of ' + M('x^{5} + ' + b + 'x^{2}' + sg(cst)) + '.', 2, M('(' + r + ')^5 + ' + b + '(' + r + ')^2' + sg(cst) + ' = ' + Math.pow(r, 5) + sg(b * r * r) + sg(cst) + ' = 0') + ', so it is a factor.');
    } }
  ] });

  BS.topic({ id: 'fm-quadratics', name: 'Quadratics: completing the square, solving and sketching', video: 'completing the square a not 1 further maths', gens: from('quadratics', [1, 2, 3, 8]).concat([
    { d: [2, 3], f: function () { // a(x+b)^2 + c with a != 1
      var bb = pick([1, 2, 3, -1, -2, 0.5, -1.5, 1.5]), a = bb % 1 ? pick([4, -4]) : pick([2, 3, -2, 4]), cc = nz(-9, 9);
      var A = a, B = 2 * a * bb, C = a * bb * bb + cc;
      return { stem: '', parts: [
        { q: 'Find the values of ' + M('a') + ', ' + M('b') + ' and ' + M('c') + ' such that ' + M(poly([A, B, C]) + ' \\equiv a(x + b)^2 + c') + '.', m: 3, a: M('a = ' + a + ',\\ b = ' + num(bb) + ',\\ c = ' + num(C - a * bb * bb)) },
        { q: 'Hence write down the coordinates of the turning point of ' + M('y = ' + poly([A, B, C])) + ' and state whether it is a maximum or a minimum.', m: 2, a: M('(' + num(-bb) + ',\\ ' + num(cc) + ')') + ', a ' + (a > 0 ? 'minimum' : 'maximum') }
      ] };
    } },
    { d: [1, 2], f: function () { // sketch with labelled intercepts
      var r1 = nz(-5, 1), r2 = r1 + ri(2, 6), a = pick([1, -1]); if (r2 === 0) r2 = r1 + 1 === 0 ? r1 + 2 : r1 + 1; var c = [a, -a * (r1 + r2), a * r1 * r2], h = (r1 + r2) / 2, k = a * (h - r1) * (h - r2);
      var f = function (x) { return a * (x - r1) * (x - r2); };
      var p = D.plane({ xmin: r1 - 2, xmax: r2 + 2, ymin: Math.min(0, k, c[2]) - 2, ymax: Math.max(0, k, c[2]) + 2, w: 300, h: 260 });
      var s = p.svg + p.curve(f, r1 - 2, r2 + 2) + D.dot(p.X(r1), p.Y(0)) + D.dot(p.X(r2), p.Y(0)) + D.dot(p.X(0), p.Y(c[2])) + D.text(p.X(r1) - 4, p.Y(0) + (a > 0 ? -10 : 14), 'A', { anchor: 'end', cls: 'it' }) + D.text(p.X(r2) + 6, p.Y(0) + (a > 0 ? -10 : 14), 'B', { cls: 'it' }) + D.text(p.X(0) + 8, p.Y(c[2]), 'C', { cls: 'it' });
      return { stem: 'The sketch shows the graph of ' + M('y = ' + poly(c)) + '. It crosses the ' + M('x') + '-axis at ' + M('A') + ' and ' + M('B') + ' and the ' + M('y') + '-axis at ' + M('C') + '.' + D.svg(300, 260, s, 'Sketch of a quadratic', true), parts: [
        { q: 'Find the coordinates of ' + M('A') + ', ' + M('B') + ' and ' + M('C') + '.', m: 3, a: M('A(' + r1 + ',\\ 0),\\ B(' + r2 + ',\\ 0),\\ C(0,\\ ' + c[2] + ')') },
        { q: 'Find the coordinates of the turning point.', m: 2, a: M('(' + num(h) + ',\\ ' + num(k) + ')') }
      ] };
    } },
    { d: [2, 3], f: function () { // quadratic in context
      var w = ri(3, 12), d = ri(2, 7), A = w * (w + d);
      return q1('A rectangle has length ' + M('(x + ' + d + ')') + ' cm and width ' + M('x') + ' cm. Its diagonal is ' + M('\\sqrt{' + (w * w + (w + d) * (w + d)) + '}') + ' cm.<br>Form and solve an equation to find ' + M('x') + ', and hence find the area of the rectangle.', 5,
        M('x^2 + (x + ' + d + ')^2 = ' + (w * w + (w + d) * (w + d)) + ' \\Rightarrow ' + poly([2, 2 * d, d * d - w * w - (w + d) * (w + d)]) + ' = 0 \\Rightarrow x = ' + w) + '; area ' + A + ' cm²');
    } }
  ]) });

  BS.topic({ id: 'fm-graphs', name: 'Sketching graphs: piecewise and exponential functions', video: 'piecewise functions further maths', gens: [
    { d: [1, 2], f: function () { // piecewise function from definition, with graph
      var a = ri(2, 3), m = ri(2, 4), b = a * a; // f = x^2 on [0,a], linear rising? keep: f = x^2 (0<=x<a), b (a<=x<a+m), b - (x - a - m)*k down to 0
      var k = pick(a === 2 ? [1, 2, 4] : [1, 3]), end = a + m + b / k;
      var f = function (x) { return x < a ? x * x : x < a + m ? b : b - k * (x - a - m); };
      var p = D.plane({ xmin: -1, xmax: Math.ceil(end) + 1, ymin: -1, ymax: b + 2, w: 320, h: 240, grid: true, ticks: true, tstep: 1, tstepy: b > 6 ? 2 : 1 });
      var s = p.svg + p.curve(f, 0, a) + D.line(p.X(a), p.Y(b), p.X(a + m), p.Y(b), 'curve') + D.line(p.X(a + m), p.Y(b), p.X(end), p.Y(0), 'curve');
      var t = ri(1, b - 1 > 0 ? b - 1 : 1), sols = [Math.sqrt(t), a + m + (b - t) / k];
      return { stem: 'The function ' + M('\\mathrm{f}') + ' is defined for ' + M('0 \\le x \\le ' + num(end)) + ' by ' + M('\\mathrm{f}(x) = \\begin{cases} x^2 & 0 \\le x < ' + a + ' \\\\ ' + b + ' & ' + a + ' \\le x < ' + (a + m) + ' \\\\ ' + b + ' - ' + c1(k, '(x - ' + (a + m) + ')') + ' & ' + (a + m) + ' \\le x \\le ' + num(end) + ' \\end{cases}') + '<br>The graph of ' + M('y = \\mathrm{f}(x)') + ' is shown.' + D.svg(320, 240, s, 'Graph of a piecewise function', true), parts: [
        { q: 'Write down the range of ' + M('\\mathrm{f}') + '.', m: 1, a: M('0 \\le \\mathrm{f}(x) \\le ' + b) },
        { q: 'Find ' + M('\\mathrm{f}(' + (a + m + 0.5 * Math.min(1, b / k)) + ')') + '.', m: 1, a: num(f(a + m + 0.5 * Math.min(1, b / k))) },
        { q: 'Solve ' + M('\\mathrm{f}(x) = ' + t) + '.', m: 3, a: M('x = ' + (Number.isInteger(sols[0]) ? sols[0] : '\\sqrt{' + t + '}') + '\\text{ or } x = ' + frac((a + m) * k + b - t, k)) }
      ] };
    } },
    { d: [2, 3], f: function () { // exponential through two points
      var a = ri(2, 6), b = pick([2, 3, 0.5, 1.5]), x1 = pick([1, 2]), y1 = a * Math.pow(b, x1);
      var f = function (x) { return a * Math.pow(b, x); }, top = Math.max(f(3), f(-2), a) + 2;
      var p = D.plane({ xmin: -3, xmax: 3, ymin: -1, ymax: top, w: 300, h: 260 });
      var s = p.svg + p.curve(f, -3, 3) + D.dot(p.X(0), p.Y(a)) + D.dot(p.X(x1), p.Y(y1)) + D.text(p.X(0) + 8, p.Y(a) + 12, '(0, ' + a + ')', { size: 11 }) + D.text(p.X(x1) + 8, p.Y(y1), '(' + x1 + ', ' + num(y1) + ')', { size: 11 });
      return { stem: 'The sketch shows the graph of ' + M('y = ab^x') + '. The graph passes through ' + M('(0,\\ ' + a + ')') + ' and ' + M('(' + x1 + ',\\ ' + num(y1) + ')') + '.' + D.svg(300, 260, s, 'Exponential graph', true), parts: [
        { q: 'Write down the value of ' + M('a') + '.', m: 1, a: String(a) },
        { q: 'Work out the value of ' + M('b') + '.', m: 2, a: M((x1 === 1 ? 'b' : 'b^{' + x1 + '}') + ' = ' + frac(Math.round(y1 * 4), a * 4) + ' \\Rightarrow b = ' + num(b)) },
        { q: 'Work out the value of ' + M('y') + ' when ' + M('x = -2') + '.', m: 1, a: M((function () { var bf = { 2: [2, 1], 3: [3, 1], 0.5: [1, 2], 1.5: [3, 2] }[b]; return frac(a * bf[1] * bf[1], bf[0] * bf[0]); })()) }
      ] };
    } },
    { d: [1], f: function () { // sketch features of y = ab^-x
      var a = ri(2, 9), b = ri(2, 4);
      return { stem: 'A curve has equation ' + M('y = ' + a + ' \\times ' + b + '^{-x}') + '.', parts: [
        { q: 'Write down the coordinates of the point where the curve crosses the ' + M('y') + '-axis.', m: 1, a: M('(0,\\ ' + a + ')') },
        { q: 'Work out the value of ' + M('y') + ' when ' + M('x = 2') + '.', m: 1, a: M(frac(a, b * b)) },
        { q: 'Describe what happens to ' + M('y') + ' as ' + M('x') + ' becomes very large.', m: 1, a: M('y') + ' gets closer and closer to 0 (the ' + M('x') + '-axis is an asymptote).' }
      ] };
    } }
  ] });

  BS.topic({ id: 'fm-equations', name: 'Simultaneous equations (including three unknowns)', video: 'three simultaneous equations further maths', gens: from('simultaneous', [1, 2, 6]).concat([
    { d: [2, 3], f: function () { // 3x3 linear
      var x = nz(-5, 5), y = nz(-5, 5), z = nz(-5, 5), rows = [], det;
      do {
        rows = [0, 1, 2].map(function () { return [nz(-3, 3), nz(-3, 3), nz(-3, 3)]; });
        det = rows[0][0] * (rows[1][1] * rows[2][2] - rows[1][2] * rows[2][1]) - rows[0][1] * (rows[1][0] * rows[2][2] - rows[1][2] * rows[2][0]) + rows[0][2] * (rows[1][0] * rows[2][1] - rows[1][1] * rows[2][0]);
      } while (det === 0);
      function lhs(r) { var s = c1(r[0], 'x'); s += (r[1] < 0 ? ' - ' : ' + ') + c1(Math.abs(r[1]), 'y'); s += (r[2] < 0 ? ' - ' : ' + ') + c1(Math.abs(r[2]), 'z'); return s; }
      return q1('Solve the simultaneous equations<br>' + M('\\begin{aligned} ' + rows.map(function (r) { return lhs(r) + ' &= ' + (r[0] * x + r[1] * y + r[2] * z); }).join(' \\\\ ') + ' \\end{aligned}') + '<br>You must show your working.', 5, M('x = ' + x + ',\\ y = ' + y + ',\\ z = ' + z));
    } },
    { d: [2], f: function () { // line meets parabola, find intersection coordinates
      var r1 = nz(-4, 3), r2 = r1 + ri(1, 5), m = nz(-3, 3), c = ri(-5, 5);
      // y = x^2 + bx + q meets y = mx + c at r1, r2: x^2 + (b - m)x + (q - c) = (x - r1)(x - r2)
      var b = m - (r1 + r2), q = c + r1 * r2;
      return q1('Solve the simultaneous equations ' + M('y = ' + poly([1, b, q])) + ' and ' + M('y = ' + poly([m, c])) + '.', 5, M('x = ' + r1 + ',\\ y = ' + (m * r1 + c)) + ' and ' + M('x = ' + r2 + ',\\ y = ' + (m * r2 + c)));
    } }
  ]) });

  BS.topic({ id: 'fm-inequalities', name: 'Linear and quadratic inequalities', video: 'quadratic inequalities further maths', gens: from('inequalities', [4, 7, 9]).concat([
    { d: [2], f: function () {
      var a = pick([1, 2, 3]), r1 = nz(-5, 3), r2 = r1 + ri(1, 6), cf = [a, -a * (r1 + r2), a * r1 * r2], gt = Math.random() < 0.5;
      return q1('Solve ' + M(poly(cf) + (gt ? ' > 0' : ' \\le 0')) + '.', 3, gt ? M('x < ' + r1) + ' or ' + M('x > ' + r2) : M(r1 + ' \\le x \\le ' + r2));
    } },
    { d: [2, 3], f: function () { // with brackets / rearranging
      var p = nz(-4, 4), q = nz(-5, 5), k = ri(1, 4); // (x + p)(x + q) < k(x + p)  -> (x+p)(x+q-k) < 0
      var r = [-p, k - q].sort(function (a, b) { return a - b; });
      if (r[0] === r[1]) { q += 1; r = [-p, k - q].sort(function (a, b) { return a - b; }); }
      return q1('Solve ' + M(br(1, p) + br(1, q) + ' < ' + (k === 1 ? '' : k) + br(1, p)) + '.', 4, M(br(1, p) + br(1, q - k) + ' < 0 \\Rightarrow ' + r[0] + ' < x < ' + r[1]));
    } },
    { d: [1], f: function () { // linear with brackets
      var a = ri(2, 5), b = nz(-6, 6), c = ri(1, a - 1 || 1), d = nz(-9, 9); if (a === c) a++;
      var rhs = c * d - a * b, coef = a - c;
      return q1('Solve ' + M(a + br(1, b) + ' > ' + c1(c, '') + br(1, d).replace(/^/, '')) + '.', 2, M('x > ' + frac(rhs, coef)));
    } }
  ]) });

  BS.topic({ id: 'fm-indices', name: 'Indices: fractional and negative, and equations', video: 'fractional indices further maths', gens: from('indices', [4, 10]).concat([
    { d: [1, 2], f: function () {
      var base = pick([[8, 3, 2], [27, 3, 3], [16, 4, 2], [32, 5, 2], [125, 3, 5], [81, 4, 3], [64, 3, 4]]), n = base[1], r = base[2], m = ri(1, 3), neg = Math.random() < 0.5;
      var val = Math.pow(r, m);
      return q1('Work out the value of ' + M(base[0] + '^{' + (neg ? '-' : '') + '\\frac{' + m + '}{' + n + '}}') + '.', 2, M(neg ? '\\frac{1}{' + val + '}' : String(val)));
    } },
    { d: [2], f: function () { // solve with same base
      var b = pick([2, 3]), p = pick([2, 3]), A = ri(1, 3), B = nz(-2, 3); // b^(x+A) = (b^p)^(x+B)... -> x + A = p(x + B)
      var x = (A - p * B) / (p - 1);
      return q1('Solve ' + M(b + '^{x' + sg(A) + '} = ' + Math.pow(b, p) + '^{x' + sg(B) + '}') + '.', 3, M('x' + sg(A) + ' = ' + p + '(x' + sg(B) + ') \\Rightarrow x = ' + frac(A - p * B, p - 1)));
    } },
    { d: [2, 3], f: function () { // x^(p/q) = k
      var r = ri(2, 5), q = pick([2, 3]), p = pick([2, 3]); while (p === q) p = pick([2, 3, 5]);
      var k = Math.pow(r, p);
      return q1('Solve ' + M('x^{\\frac{' + p + '}{' + q + '}} = ' + k) + '.', 2, M('x = ' + k + '^{\\frac{' + q + '}{' + p + '}} = ' + Math.pow(r, q)));
    } },
    { d: [3], f: function () { // simplify algebraic indices
      var a = pick([4, 9, 16, 25]), m = ri(2, 4) * 2, n = ri(1, 3) * 2;
      return q1('Simplify ' + M('\\left(' + a + 'x^{' + m + '}y^{-' + n + '}\\right)^{-\\frac{1}{2}}') + '.', 2, M('\\frac{y^{' + n / 2 + '}}{' + Math.sqrt(a) + 'x^{' + m / 2 + '}}'));
    } }
  ]) });

  BS.topic({ id: 'fm-proof', name: 'Algebraic proof', video: 'algebraic proof further maths', gens: [
    { d: [1, 2], f: function () {
      var k = ri(1, 5);
      return q1('Prove that ' + M('(n + ' + k + ')^2 - (n - ' + k + ')^2') + ' is a multiple of ' + 4 * k + ' for all integer values of ' + M('n') + '.', 3, M('(n^2 + ' + 2 * k + 'n + ' + k * k + ') - (n^2 - ' + 2 * k + 'n + ' + k * k + ') = ' + 4 * k + 'n') + ', which is a multiple of ' + 4 * k + '.');
    } },
    { d: [2], f: function () {
      return q1('Prove that the sum of the squares of any two consecutive odd numbers is always 2 more than a multiple of 8.', 4, M('(2n + 1)^2 + (2n + 3)^2 = 8n^2 + 16n + 10 = 8(n^2 + 2n + 1) + 2'));
    } },
    { d: [2, 3], f: function () {
      var a = ri(2, 6);
      return q1('Prove that ' + M('n(n + 1)(n + 2)') + ' is a multiple of 6 for all positive integers ' + M('n') + '.', 3, 'Among three consecutive integers at least one is even and exactly one is a multiple of 3, so the product is a multiple of ' + M('2 \\times 3 = 6') + '.');
    } },
    { d: [2, 3], f: function () { // show expression always positive by completing the square
      var p = nz(-5, 5), q = ri(1, 9), c = [1, 2 * p, p * p + q];
      return q1('Prove that ' + M(poly(c)) + ' is positive for all values of ' + M('x') + '.', 3, M(poly(c) + ' = (x' + sg(p) + ')^2 + ' + q) + '. Since ' + M('(x' + sg(p) + ')^2 \\ge 0') + ', the expression is always at least ' + q + ', so it is positive.');
    } },
    { d: [3], f: function () {
      var k = ri(2, 5);
      return q1('Prove that ' + M('(' + k + 'n + 1)^2 - (' + k + 'n - 1)^2') + ' is always a multiple of ' + 4 * k + '. Hence explain why it is always even.', 4, M('= ' + 4 * k + 'n') + ', a multiple of ' + 4 * k + '. Since ' + 4 * k + ' is even, any multiple of it is even.');
    } },
    { d: [1], f: function () {
      return q1('Prove that the difference between the squares of two consecutive integers is always odd.', 3, M('(n + 1)^2 - n^2 = 2n + 1') + ', which is odd.');
    } }
  ] });

  BS.topic({ id: 'fm-sequences', name: 'Sequences: linear, quadratic and limiting values', video: 'quadratic sequences nth term limiting value', gens: [
    { d: [1, 2], f: function () { // quadratic nth term
      var a = pick([1, 2, 3, -1]), b = ri(-6, 6), c = ri(-8, 8), t = [1, 2, 3, 4, 5].map(function (n) { return a * n * n + b * n + c; });
      return q1('Here are the first five terms of a quadratic sequence.<br>' + M(t.join(',\\quad ')) + '<br>Work out an expression for the ' + M('n') + 'th term.', 3, M(poly([a, b, c], 'n')));
    } },
    { d: [2, 3], f: function () { // which term is zero / value
      var r = ri(4, 12), s = nz(-3, 3), a = 1, b = -(r + s), c = r * s; // (n - r)(n - s)
      return { stem: 'The ' + M('n') + 'th term of a sequence is ' + M(poly([a, b, c], 'n')) + '.', parts: [
        { q: 'Which term of the sequence is zero?', m: 2, a: M('(n - ' + r + ')(n' + sg(-s) + ') = 0') + ', so the ' + r + 'th term' + (s > 0 && s !== r ? ' (and the ' + s + 'th term)' : '') },
        { q: 'Show that the first difference between consecutive terms is ' + M(poly([2, 1 + b], 'n')) + '.', m: 2, a: M('((n + 1)^2' + tc(b, '(n + 1)') + sg(c) + ') - (n^2' + tc(b, 'n') + sg(c) + ') = ' + poly([2, 1 + b], 'n')) }
      ] };
    } },
    { d: [2], f: function () { // limiting value
      var a = ri(1, 7), b = nz(-5, 5), c = ri(2, 5), d = ri(1, 6);
      var L = frac(a, c);
      return { stem: 'The ' + M('n') + 'th term of a sequence is ' + M('\\frac{' + poly([a, b], 'n') + '}{' + poly([c, d], 'n') + '}') + '.', parts: [
        { q: 'Write down the first three terms.', m: 2, a: [1, 2, 3].map(function (n) { return M(frac(a * n + b, c * n + d)); }).join(', ') },
        { q: 'Write down the limiting value of the sequence as ' + M('n \\to \\infty') + '.', m: 1, a: M(L) }
      ] };
    } },
    { d: [2, 3], f: function () { // symbolic linear sequence
      var p = ri(1, 3), q = ri(1, 4), bv = nz(-3, 5);
      var t = [0, 1, 2, 3].map(function (i) { var A = p + i, B = q + 2 * i; return c1(A, 'a') + ' + ' + c1(B, 'b'); });
      return { stem: 'Here are the first four terms of a linear sequence: ' + M(t.join(',\\ ')), parts: [
        { q: 'Write down an expression for the ' + M('n') + 'th term.', m: 2, a: M((p === 1 ? 'na' : '(n' + sg(p - 1) + ')a') + ' + ' + (q === 2 ? '2nb' : '(2n' + sg(q - 2) + ')b')) },
        { q: 'The 10th term is ' + (2 * (9 + p) + (q + 18) * bv) + ' and ' + M('a = 2') + '. Find the value of ' + M('b') + '.', m: 2, a: M((9 + p) + '(2) + ' + (q + 18) + 'b = ' + (2 * (9 + p) + (q + 18) * bv) + ' \\Rightarrow b = ' + bv) }
      ] };
    } },
    { d: [1], f: function () { // linear nth term and term value
      var d = nz(-6, 8), a = ri(-5, 12), N = ri(20, 60), t = [0, 1, 2, 3].map(function (i) { return a + i * d; });
      return { stem: 'Here are the first four terms of a sequence: ' + M(t.join(',\\ ')), parts: [
        { q: 'Write down an expression for the ' + M('n') + 'th term.', m: 2, a: M(poly([d, a - d], 'n')) },
        { q: 'Which term of the sequence is ' + (a + (N - 1) * d) + '?', m: 1, a: 'The ' + N + 'th term' }
      ] };
    } }
  ] });
})(typeof window !== 'undefined' ? window : globalThis);
