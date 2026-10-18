/* Byte Size — Pearson Edexcel A Level Mathematics, Year 1 (AS) Pure.
   Topics reuse matching GCSE / Further Maths question types and add A level ones.
   Difficulty: 1 = Standard, 2 = Exam, 3 = Challenging. */
(function (g) {
  var BS = g.BS, D = BS.draw, IB = BS.ib, FM = BS.fm;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, dp = BS.dp, num = BS.num, M = BS.m;
  var s3 = IB.s3, from = FM.from, c1 = FM.c1, tc = FM.tc, comb = FM.comb, surd = BS.gcse2.surd;
  function q1(q, m, a, stem) { return { stem: stem, parts: [{ q: q, m: m, a: a }] }; }
  function rad(d) { return d * Math.PI / 180; }
  function deg(r) { return r * 180 / Math.PI; }
  function pt(p) { return '(' + p.map(function (v) { return typeof v === 'string' ? v : num(v); }).join(',\\ ') + ')'; }
  function xp(e2) { return e2 === 2 ? 'x' : e2 === 0 ? '' : 'x^{' + frac(e2, 2) + '}'; } // power given in halves
  function svgOf(p, s, label) { return D.svg(p.w, p.h, s, label, true); }
  var AL = BS.al = { q1: q1, rad: rad, deg: deg, pt: pt, xp: xp };

  /* ---------------- Algebraic expressions: indices and surds ---------------- */
  BS.topic({ id: 'al-indices', name: 'Indices and surds', video: 'A level maths indices and surds', gens: from('surds', [3, 4, 7]).concat(from('fm-indices', [2, 3, 4, 5])).concat([
    { d: [2, 3], f: function () { // ax^p + bx^q form
      var c = [ri(2, 9), nz(-8, 8)], e = [pick([4, 6, 2]), pick([1, 0, -2])], div = pick([[1, 2], [2, 1], [1, 1], [3, 1]]); // divisor coef, exponent (halves)
      var r0 = [frac(c[0], div[0]), e[0] - div[1]], r1 = [frac(c[1], div[0]), e[1] - div[1]];
      function term(cf, e2, first) { var neg = cf.charAt(0) === '-', a = neg ? cf.slice(1) : cf; if (a === '1' && e2 !== 0) a = ''; return (first ? (neg ? '-' : '') : (neg ? ' - ' : ' + ')) + a + xp(e2); }
      var top = c1(c[0], xp(e[0])) + tc(c[1], xp(e[1])), bot = (div[0] === 1 ? '' : div[0]) + (div[1] === 1 ? '\\sqrt{x}' : div[1] === 2 ? 'x' : '');
      return q1('Write ' + M('\\frac{' + top + '}{' + (bot || '1') + '}') + ' in the form ' + M('Ax^{p} + Bx^{q}') + ', where ' + M('A') + ', ' + M('B') + ', ' + M('p') + ' and ' + M('q') + ' are constants.', 3,
        M(term(r0[0], r0[1], true) + term(r1[0], r1[1], false)));
    } },
    { d: [2], f: function () { // solve with surds
      var k = pick([2, 3, 5, 7]), a = ri(2, 9), b = ri(2, 6); while (b * b === k) b++;
      // x√k + a = b x  =>  x = a/(b - √k) = a(b + √k)/(b² - k)
      var den = b * b - k, g_ = gcd(a, Math.abs(den)), A = a / g_, Dn = den / g_;
      return q1('Solve the equation ' + M('x\\sqrt{' + k + '} + ' + a + ' = ' + b + 'x') + '. Give your answer in the form ' + M('p + q\\sqrt{' + k + '}') + ', where ' + M('p') + ' and ' + M('q') + ' are rational.', 4,
        M('x = \\frac{' + a + '}{' + b + ' - \\sqrt{' + k + '}} = \\frac{' + a + '(' + b + ' + \\sqrt{' + k + '})}{' + den + '} = ' + frac(a * b, den) + (a * den < 0 ? ' - ' : ' + ') + frac(a, Math.abs(den)) + '\\sqrt{' + k + '}'));
    } }
  ]) });

  /* ---------------- Quadratics ---------------- */
  var DISC = [[3, 4], [4, 3], [-3, 4], [-4, 3], [5, 12], [-5, 12], [6, 8], [-6, 8], [0, 2], [0, 4]];
  BS.topic({ id: 'al-quadratics', name: 'Quadratics: discriminant, completing the square and modelling', video: 'A level maths discriminant quadratics', gens: from('quadratics', [1, 8]).concat(from('fm-quadratics', [4, 5])).concat([
    { d: [2, 3], f: function () { // range of k from discriminant
      var cb = pick(DISC), c = cb[0], b = cb[1], R = Math.sqrt(c * c + b * b), k1 = (-c - R) / 2, k2 = (-c + R) / 2;
      return { stem: 'The equation ' + M('kx^2 + ' + b + 'x + ' + (c ? '(k' + sg(c) + ')' : 'k') + ' = 0') + ', where ' + M('k') + ' is a constant, has two distinct real roots.', parts: [
        { q: 'Show that ' + M(poly([4, 4 * c, -b * b], 'k') + ' < 0') + '.', m: 3, a: M('b^2 - 4ac > 0 \\Rightarrow ' + b * b + ' - 4k' + (c ? '(k' + sg(c) + ')' : '^2') + ' > 0') + ', which rearranges to ' + M(poly([4, 4 * c, -b * b], 'k') + ' < 0') },
        { q: 'Find the set of possible values of ' + M('k') + '.', m: 3, a: M(num(k1) + ' < k < ' + num(k2)) + (k1 < 0 && k2 > 0 ? ', ' + M('k \\ne 0') : '') }
      ] };
    } },
    { d: [1, 2], f: function () { // equal roots
      var a = pick([1, 4, 9]), c = pick([1, 4, 9, 16, 25]), p = 2 * Math.sqrt(a * c);
      return q1('The equation ' + M(c1(a, 'x^2') + ' + px + ' + c + ' = 0') + ' has equal roots. Find the possible values of ' + M('p') + '.', 3, M('p^2 - ' + 4 * a * c + ' = 0 \\Rightarrow p = \\pm ' + p));
    } },
    { d: [2, 3], f: function () { // hidden quadratic
      var kind = pick(['x4', 'exp']), A, B, ans;
      if (kind === 'x4') { var s = BS.shuffle([1, 4, 9, 16]).slice(0, 2).sort(function (a, b) { return a - b; }); A = s[0]; B = s[1]; ans = [-Math.sqrt(B), -Math.sqrt(A), Math.sqrt(A), Math.sqrt(B)];
        return q1('Solve ' + M('x^4' + sg(-(A + B)) + 'x^2 + ' + A * B + ' = 0') + '.', 4, M('(x^2 - ' + A + ')(x^2 - ' + B + ') = 0 \\Rightarrow x = ' + ans.join(',\\ ')));
      }
      var bs = pick([2, 3]), pw = BS.shuffle([0, 1, 2]).slice(0, 2).sort(), u = pw.map(function (p) { return Math.pow(bs, p); });
      return q1('Solve ' + M(bs + '^{2x}' + sg(-(u[0] + u[1])) + ' \\times ' + bs + '^{x} + ' + u[0] * u[1] + ' = 0') + '.', 4,
        'Let ' + M('y = ' + bs + '^x') + ': ' + M('(y - ' + u[0] + ')(y - ' + u[1] + ') = 0') + ', so ' + M('x = ' + pw.join('\\text{ or } x = ')));
    } },
    { d: [2], f: function () { // modelling by completing the square
      var u = ri(10, 20), h0 = ri(1, 3) / 2, a = 4.9, tm = u / (2 * a), hm = h0 + u * u / (4 * a);
      return { stem: 'The height, ' + M('h') + ' metres, of a ball ' + M('t') + ' seconds after it is kicked is modelled by ' + M('h = ' + h0 + ' + ' + u + 't - 4.9t^2') + '.', parts: [
        { q: 'Write ' + M('h') + ' in the form ' + M('A - B(t - C)^2') + ', where ' + M('A') + ', ' + M('B') + ' and ' + M('C') + ' are constants to be found.', m: 3, a: M('h = ' + s3(hm) + ' - 4.9(t - ' + s3(tm) + ')^2') },
        { q: 'Write down the maximum height of the ball and the time at which it occurs.', m: 2, a: s3(hm) + ' m at ' + M('t = ' + s3(tm)) + ' s' },
        { q: 'Give one limitation of the model.', m: 1, a: 'For example: it ignores air resistance, or it does not apply after the ball hits the ground.' }
      ] };
    } }
  ]) });

  /* ---------------- Equations and inequalities ---------------- */
  BS.topic({ id: 'al-equations', name: 'Equations and inequalities: simultaneous, regions and set notation', video: 'A level maths quadratic inequalities set notation', gens: from('simultaneous', [2, 6]).concat([
    { d: [2], f: function () { // quadratic inequality in set notation
      var a = pick([1, 2, 3]), r1 = nz(-5, 3), r2 = r1 + ri(1, 6), num1 = a === 1 ? r1 : r1, cf = [a, -a * (r1 + r2), a * r1 * r2], gt = Math.random() < 0.6;
      return q1('Find the set of values of ' + M('x') + ' for which ' + M(poly(cf) + (gt ? ' > 0' : ' \\le 0')) + '. Give your answer in set notation.', 3,
        gt ? M('\\{x : x < ' + r1 + '\\} \\cup \\{x : x > ' + r2 + '\\}') : M('\\{x : ' + r1 + ' \\le x \\le ' + r2 + '\\}'));
    } },
    { d: [2, 3], f: function () { // tangent condition
      var b = nz(-6, 6), d = ri(-4, 6), m = nz(-3, 3), x0 = (m - b) / 2;
      while (x0 !== Math.round(x0)) { m = nz(-3, 3); x0 = (m - b) / 2; }
      var c = d - (b - m) * (b - m) / 4, y0 = m * x0 + c;
      return { stem: 'The line ' + M('y = ' + c1(m, 'x') + ' + k') + ' is a tangent to the curve ' + M('y = ' + poly([1, b, d])) + '.', parts: [
        { q: 'Find the value of the constant ' + M('k') + '.', m: 4, a: M(poly([1, b - m, d]) + ' - k = 0') + ' has equal roots: ' + M('(' + (b - m) + ')^2 - 4(' + d + ' - k) = 0 \\Rightarrow k = ' + num(c)) },
        { q: 'Find the coordinates of the point of contact.', m: 2, a: M(pt([x0, y0])) }
      ] };
    } },
    { d: [2, 3], f: function () { // region R between line and curve
      var r1 = nz(-3, 0), r2 = ri(1, 4), k = ri(-3, 2), m = 1; // curve y = x^2 + k, line through intersections
      // line through (r1, r1² + k) and (r2, r2² + k): gradient r1 + r2, intercept k - r1 r2
      var mg = r1 + r2, ci = k - r1 * r2, f = function (x) { return x * x + k; }, L = function (x) { return mg * x + ci; };
      var lo = r1 - 2, hi = r2 + 2, ys = [f(lo), f(hi), L(lo), L(hi), k];
      var p = D.plane({ xmin: lo, xmax: hi, ymin: Math.min.apply(null, ys.concat([0])) - 1, ymax: Math.max.apply(null, ys.concat([0])) + 1, w: 300, h: 280 });
      var s = p.svg + p.area(L, r1, r2, f) + p.curve(f, lo, hi) + p.curve(L, lo, hi) + D.text(p.X((r1 + r2) / 2), p.Y((L((r1 + r2) / 2) + f((r1 + r2) / 2)) / 2), 'R', { anchor: 'middle', cls: 'it' });
      return { stem: 'The diagram shows the curve ' + M('y = ' + poly([1, 0, k])) + ' and the line ' + M('y = ' + poly([mg, ci])) + '. The shaded region ' + M('R') + ' is bounded by the curve and the line.' + D.svg(300, 280, s, 'Region between a line and a curve', true), parts: [
        { q: 'Find the coordinates of the points where the line meets the curve.', m: 3, a: M(pt([r1, f(r1)]) + ',\\ ' + pt([r2, f(r2)])) },
        { q: 'Write down the inequalities that define ' + M('R') + ', including its boundary.', m: 2, a: M('y \\ge ' + poly([1, 0, k])) + ' and ' + M('y \\le ' + poly([mg, ci])) }
      ] };
    } },
    { d: [3], f: function () { // two inequalities together
      var a = ri(2, 5), b = nz(-6, 6), r1 = nz(-4, 2), r2 = r1 + ri(2, 6), cut = ri(r1, r2 - 1) + 0.5 * pick([0, 1]);
      // 2x + 3 > ... keep: linear ax > a*cut  -> x > cut ; quadratic (x - r1)(x - r2) < 0 -> r1 < x < r2
      return q1('Find the set of values of ' + M('x') + ' for which both ' + M(a + 'x' + sg(b) + ' > ' + num(a * cut + b)) + ' and ' + M(poly([1, -(r1 + r2), r1 * r2]) + ' < 0') + '.', 5,
        M('x > ' + num(cut)) + ' and ' + M(r1 + ' < x < ' + r2) + ', so ' + M('\\{x : ' + num(Math.max(cut, r1)) + ' < x < ' + r2 + '\\}'));
    } }
  ]) });

  /* ---------------- Graphs and transformations ---------------- */
  BS.topic({ id: 'al-graphs', name: 'Graphs and transformations: cubics, quartics and reciprocals', video: 'A level maths graph transformations', gens: [
    { d: [1, 2], f: function () { // identify cubic from sketch
      var p = nz(-4, -1), q = ri(1, 4), a = pick([1, -1]), f = function (x) { return a * (x - p) * (x - q) * (x - q); };
      var ys = []; for (var x = p - 1; x <= q + 1.5; x += 0.1) ys.push(f(x));
      var pl = D.plane({ xmin: p - 1.5, xmax: q + 2, ymin: Math.min.apply(null, ys) - 1, ymax: Math.max.apply(null, ys) + 1, w: 300, h: 280 });
      var s = pl.svg + pl.curve(f, p - 1.5, q + 2) + D.dot(pl.X(p), pl.Y(0)) + D.dot(pl.X(q), pl.Y(0)) + D.dot(pl.X(0), pl.Y(f(0)));
      s += D.text(pl.X(p), pl.Y(0) + 14, String(p), { anchor: 'middle', size: 11 }) + D.text(pl.X(q), pl.Y(0) + 14, String(q), { anchor: 'middle', size: 11 }) + D.text(pl.X(0) + 6, pl.Y(f(0)) - 6, String(f(0)), { size: 11 });
      var cf = [a, -a * (p + 2 * q), a * (q * q + 2 * p * q), -a * p * q * q];
      return { stem: 'The diagram shows a sketch of the curve ' + M('y = f(x)') + ', where ' + M('f(x)') + ' is a cubic. The curve touches the ' + M('x') + '-axis at ' + M('x = ' + q) + ', crosses it at ' + M('x = ' + p) + ' and crosses the ' + M('y') + '-axis at ' + M('(0,\\ ' + f(0) + ')') + '.' + svgOf(pl, s, 'Cubic sketch'), parts: [
        { q: 'Find ' + M('f(x)') + ' in factorised form.', m: 3, a: M('f(x) = ' + (a === 1 ? '' : '-') + br(1, -p) + br(1, -q) + '^2') },
        { q: 'Hence write ' + M('f(x)') + ' in the form ' + M('ax^3 + bx^2 + cx + d') + '.', m: 2, a: M(poly(cf)) }
      ] };
    } },
    { d: [2, 3], f: function () { // transformations of key points
      var P = [ri(-4, -1), ri(2, 6)], Q = [ri(1, 4), 0], a = nz(-3, 3), k = pick([2, 3]);
      return { stem: 'The curve ' + M('y = f(x)') + ' has a maximum point at ' + M('A' + pt(P)) + ' and meets the ' + M('x') + '-axis at ' + M('B' + pt(Q)) + '.', parts: [
        { q: 'Write down the coordinates of the image of ' + M('A') + ' on the curve ' + M('y = f(x' + sg(a) + ')') + '.', m: 1, a: M(pt([P[0] - a, P[1]])) },
        { q: 'Write down the coordinates of the image of ' + M('A') + ' on the curve ' + M('y = ' + k + 'f(x)') + '.', m: 1, a: M(pt([P[0], k * P[1]])) },
        { q: 'Write down the coordinates of the image of ' + M('B') + ' on the curve ' + M('y = f(' + k + 'x)') + '.', m: 1, a: M(pt([frac(Q[0], k), 0])) },
        { q: 'The curve ' + M('y = -f(x)') + ' has a turning point at the image of ' + M('A') + '. State its coordinates and whether it is a maximum or a minimum.', m: 2, a: M(pt([P[0], -P[1]])) + ', a minimum' }
      ] };
    } },
    { d: [1, 2], f: function () { // translated reciprocal
      var k = nz(-6, 6), a = nz(-3, 3), b = nz(-3, 3), f = function (x) { return k / (x - a) + b; };
      var pl = D.plane({ xmin: a - 6, xmax: a + 6, ymin: b - 8, ymax: b + 8, w: 300, h: 280 });
      var s = pl.svg + pl.curve(f, a - 6, a - 0.05) + pl.curve(f, a + 0.05, a + 6) + D.line(pl.X(a), pl.Y(b - 8), pl.X(a), pl.Y(b + 8), 'dash') + D.line(pl.X(a - 6), pl.Y(b), pl.X(a + 6), pl.Y(b), 'dash');
      var xint = a - k / b;
      return { stem: 'The diagram shows a sketch of ' + M('y = \\frac{' + k + '}{x' + sg(-a) + '}' + sg(b)) + '.' + svgOf(pl, s, 'Translated reciprocal graph'), parts: [
        { q: 'Write down the equations of the asymptotes.', m: 2, a: M('x = ' + a) + ' and ' + M('y = ' + b) },
        { q: 'Find the coordinates of the points where the curve crosses the axes.', m: 3, a: M(pt([frac(a * b - k, b), 0])) + ' and ' + M(pt([frac(-k + a * b * 0 - a * b * 0, 1) === '0' ? 0 : frac(b * -a + k * -1, -a), 0]).replace(/.*/, '(0,\\ ' + frac(-k - a * b, -a) + ')')) },
        { q: 'Describe the transformation that maps ' + M('y = \\frac{' + k + '}{x}') + ' onto this curve.', m: 1, a: 'Translation by ' + M('\\begin{pmatrix} ' + a + ' \\\\ ' + b + ' \\end{pmatrix}') }
      ] };
    } },
    { d: [2, 3], f: function () { // quartic sketch and number of roots
      var p = nz(-3, -1), q = ri(1, 3), f = function (x) { return (x - p) * (x - p) * (x - q) * (x - q); }, k = ri(1, 3);
      var ys = []; for (var x = p - 1; x <= q + 1; x += 0.05) ys.push(f(x));
      var pl = D.plane({ xmin: p - 1.2, xmax: q + 1.2, ymin: -2, ymax: Math.min(Math.max.apply(null, ys), f((p + q) / 2) * 2.5) + 2, w: 300, h: 260 });
      var s = pl.svg + pl.curve(f, p - 1.2, q + 1.2);
      var top = f((p + q) / 2), kk = pick([Math.max(1, Math.floor(top / 2)), Math.ceil(top) + ri(1, 3)]); if (Number.isInteger(top) && Math.random() < 0.3) kk = top;
      return { stem: 'The diagram shows a sketch of ' + M('y = (x' + sg(-p) + ')^2(x' + sg(-q) + ')^2') + '.' + svgOf(pl, s, 'Quartic sketch'), parts: [
        { q: 'Write down the coordinates of the points where the curve meets the axes.', m: 2, a: M(pt([p, 0]) + ',\\ ' + pt([q, 0]) + ',\\ ' + pt([0, f(0)])) },
        { q: 'The local maximum of the curve is at ' + M(pt([(p + q) / 2, top])) + '. Write down the number of real solutions of ' + M('(x' + sg(-p) + ')^2(x' + sg(-q) + ')^2 = ' + kk) + '.', m: 1, a: kk < top ? '4' : kk === top ? '3' : '2' }
      ] };
    } }
  ] });
  // clean the reciprocal-graph intercept answer
  (function () { var gs = BS.topics['al-graphs'].gens, gen = gs[2]; gen.f = (function (f0) { return function () {
    var k = nz(-6, 6), a = nz(-3, 3), b = nz(-3, 3); while (a * b === k) b = nz(-3, 3);
    var f = function (x) { return k / (x - a) + b; };
    var pl = D.plane({ xmin: a - 6, xmax: a + 6, ymin: b - 8, ymax: b + 8, w: 300, h: 280 });
    var s = pl.svg + pl.curve(f, a - 6, a - 0.05) + pl.curve(f, a + 0.05, a + 6) + D.line(pl.X(a), pl.Y(b - 8), pl.X(a), pl.Y(b + 8), 'dash') + D.line(pl.X(a - 6), pl.Y(b), pl.X(a + 6), pl.Y(b), 'dash');
    return { stem: 'The diagram shows a sketch of ' + M('y = \\frac{' + k + '}{x' + sg(-a) + '}' + sg(b)) + '.' + svgOf(pl, s, 'Translated reciprocal graph'), parts: [
      { q: 'Write down the equations of the asymptotes.', m: 2, a: M('x = ' + a) + ' and ' + M('y = ' + b) },
      { q: 'Find the coordinates of the points where the curve crosses the coordinate axes.', m: 3, a: M(pt([frac(a * b - k, b), 0])) + ' and ' + M('(0,\\ ' + frac(-k + a * b, a) + ')') },
      { q: 'Describe the transformation that maps ' + M('y = \\frac{' + k + '}{x}') + ' onto this curve.', m: 1, a: 'Translation by ' + M('\\begin{pmatrix} ' + a + ' \\\\ ' + b + ' \\end{pmatrix}') }
    ] };
  }; })(gen.f); })();

  /* ---------------- Straight lines ---------------- */
  BS.topic({ id: 'al-lines', name: 'Straight-line graphs', video: 'A level maths straight line graphs perpendicular', gens: from('fm-coord').concat([
    { d: [2, 3], f: function () { // intersection and triangle area
      var m = nz(-3, 3), c = ri(-4, 8), P = [ri(-6, 6), 0]; P[1] = m * P[0] + c + nz(-6, 6);
      // l1: y = mx + c ; l2 through P perpendicular: y - P1 = -(1/m)(x - P0)
      var X = (P[0] / m + P[1] - c) / (m + 1 / m), Y = m * X + c;
      var xint1 = -c / m, yint2 = P[1] + P[0] / m;
      return { stem: 'The line ' + M('l_1') + ' has equation ' + M('y = ' + poly([m, c])) + '. The line ' + M('l_2') + ' is perpendicular to ' + M('l_1') + ' and passes through ' + M('P' + pt(P)) + '.', parts: [
        { q: 'Find an equation for ' + M('l_2') + ' in the form ' + M('ax + by + c = 0') + '.', m: 3, a: M((function () { var A = 1, B = m, C = -(P[0] + m * P[1]); var k = gcd(gcd(A, Math.abs(B)), Math.abs(C)) || 1; return 'x' + (B < 0 ? ' - ' : ' + ') + (Math.abs(B) === 1 ? '' : Math.abs(B)) + 'y' + (C ? sg(C) : '') + ' = 0'; })()) },
        { q: 'Find the coordinates of the point where ' + M('l_1') + ' and ' + M('l_2') + ' meet.', m: 3, a: M(pt([s3(X), s3(Y)])) }
      ] };
    } },
    { d: [1, 2], f: function () { // linear model
      var fixed = ri(20, 60), rate = ri(8, 25) / 10, n = ri(80, 200);
      return { stem: 'The cost, ' + M('£C') + ', of hiring a van and driving it ' + M('d') + ' miles is modelled by ' + M('C = ' + fixed + ' + ' + rate + 'd') + '.', parts: [
        { q: 'Interpret the values ' + fixed + ' and ' + rate + ' in this model.', m: 2, a: '£' + fixed + ' is the fixed hire charge; £' + rate + ' is the cost per mile.' },
        { q: 'Find the cost of driving ' + n + ' miles.', m: 1, a: '£' + (fixed + rate * n).toFixed(2) },
        { q: 'A second company charges ' + M('C = ' + (fixed + 20) + ' + ' + (rate - 0.4).toFixed(1) + 'd') + '. Find the distance at which both cost the same.', m: 2, a: num(Math.round(20 / 0.4 * 10) / 10) + ' miles' }
      ] };
    } }
  ]) });

  /* ---------------- Circles ---------------- */
  BS.topic({ id: 'al-circles', name: 'Circles: equations, tangents and chords', video: 'A level maths circles tangent chord', gens: from('fm-circles').concat([
    { d: [2, 3], f: function () { // tangent line condition
      var a = ri(-3, 3), b = ri(-3, 3);
      var ks = [b - 2 * a + 5, b - 2 * a - 5];
      return { stem: 'The circle ' + M('C') + ' has equation ' + M((a ? br(1, -a) : 'x') + '^2 + ' + (b ? br(1, -b).replace('x', 'y') : 'y') + '^2 = 5') + '. The line ' + M('y = 2x + k') + ' is a tangent to ' + M('C') + '.', parts: [
        { q: 'Find the two possible values of ' + M('k') + '.', m: 6, a: 'Substitute ' + M('y = 2x + k') + ' and set the discriminant to zero: ' + M((2 * a - b ? '(k' + sg(2 * a - b) + ')' : 'k') + '^2 = 25 \\Rightarrow k = ' + ks[1] + '\\text{ or } k = ' + ks[0]) }
      ] };
    } },
    { d: [1, 2], f: function () { // chord length via perpendicular from centre
      var r = pick([5, 10, 13, 17, 25]), d = { 5: 3, 10: 6, 13: 5, 17: 8, 25: 7 }[r], half = Math.sqrt(r * r - d * d);
      return q1('A circle has centre ' + M('C') + ' and radius ' + r + ' cm. A chord ' + M('AB') + ' is at a perpendicular distance of ' + d + ' cm from ' + M('C') + '.<br>Find the length of ' + M('AB') + ' and the size of angle ' + M('ACB') + ' in degrees, to 3 s.f.', 4,
        M('AB = 2\\sqrt{' + r + '^2 - ' + d + '^2} = ' + num(2 * half)) + ' cm; ' + M('A\\hat{C}B = 2\\cos^{-1}\\left(\\frac{' + d + '}{' + r + '}\\right) = ' + s3(2 * deg(Math.acos(d / r))) + '^\\circ'));
    } },
    { d: [2, 3], f: function () { // tangent length from external point
      var a = ri(-3, 3), b = ri(-3, 3), r = ri(2, 6), P = [a + pick([1, -1]) * ri(r + 2, r + 7), b + pick([1, -1]) * ri(1, 6)], d2 = (P[0] - a) * (P[0] - a) + (P[1] - b) * (P[1] - b);
      return q1('The circle ' + M((a ? br(1, -a) : 'x') + '^2 + ' + (b ? br(1, -b).replace('x', 'y') : 'y') + '^2 = ' + r * r) + ' has centre ' + M('C') + '. A tangent is drawn from ' + M('P' + pt(P)) + ' to touch the circle at ' + M('T') + '.<br>Find the exact length of ' + M('PT') + '.', 4,
        M('CP^2 = ' + d2 + ',\\ PT = \\sqrt{' + d2 + ' - ' + r * r + '} = ' + surd(d2 - r * r)));
    } },
    { d: [3], f: function () { // circle through three points with a right angle
      var C = [ri(-3, 3), ri(-3, 3)], t = pick([[3, 4], [4, 3], [5, 0], [0, 5], [-3, 4], [-4, 3]]), A = [C[0] - t[0], C[1] - t[1]], Bq = [C[0] + t[0], C[1] + t[1]], u = pick([[4, -3], [-4, 3], [3, -4], [5, 0], [0, -5]]), P = [C[0] + u[0], C[1] + u[1]];
      if (P[0] === A[0] && P[1] === A[1] || P[0] === Bq[0] && P[1] === Bq[1]) P = [C[0] - u[0], C[1] - u[1]];
      return { stem: 'The points ' + M('A' + pt(A)) + ', ' + M('B' + pt(Bq)) + ' and ' + M('P' + pt(P)) + ' lie on a circle.', parts: [
        { q: 'Show that angle ' + M('APB = 90^\\circ') + '.', m: 3, a: 'Gradient ' + M('AP') + ' × gradient ' + M('PB') + ' ' + M('= -1') + ' (or use Pythagoras: ' + M('AP^2 + PB^2 = AB^2') + ').' },
        { q: 'Hence find an equation of the circle.', m: 3, a: M('AB') + ' is a diameter: centre ' + M(pt(C)) + ', radius 5, ' + M((C[0] ? br(1, -C[0]) : 'x') + '^2 + ' + (C[1] ? br(1, -C[1]).replace('x', 'y') : 'y') + '^2 = 25') }
      ] };
    } }
  ]) });

  /* ---------------- Algebraic methods ---------------- */
  var DISPROVE = [
    [M('n^2 + n + 1') + ' is prime for all positive integers ' + M('n') + '.', M('n = 4') + ' gives 21 = 3 × 7, which is not prime.'],
    [M('n^2 - n + 41') + ' is prime for all positive integers ' + M('n') + '.', M('n = 41') + ' gives ' + M('41^2') + ', which is not prime.'],
    [M('x^2 > x') + ' for all real numbers ' + M('x') + '.', M('x = 0.5') + ' gives 0.25 < 0.5.'],
    [M('2^n + 1') + ' is prime for all positive integers ' + M('n') + '.', M('n = 3') + ' gives 9, which is not prime.'],
    ['The sum of two irrational numbers is always irrational.', M('\\sqrt{2} + (-\\sqrt{2}) = 0') + ', which is rational.'],
    ['If ' + M('a > b') + ' then ' + M('a^2 > b^2') + '.', M('a = 1,\\ b = -2') + ': ' + M('a > b') + ' but ' + M('a^2 = 1 < 4 = b^2') + '.']];
  BS.topic({ id: 'al-algebraic', name: 'Algebraic methods: division, factor theorem and proof', video: 'A level maths algebraic division factor theorem proof', gens: from('fm-factor').concat(from('fm-algebra', [6, 7])).concat([
    { d: [1, 2], f: function () { // polynomial division
      var a = nz(-4, 4), q = [ri(1, 3), nz(-6, 6), nz(-6, 6)], r = pick([0, 0, nz(-5, 5)]);
      var p = [q[0], q[1] - a * q[0], q[2] - a * q[1], -a * q[2] + r]; // (x - a)q(x) + r
      return q1('Divide ' + M(poly(p)) + ' by ' + M(poly([1, -a])) + '. ' + (r ? 'State the remainder.' : 'Hence show that ' + M(poly([1, -a])) + ' is a factor.'), 3,
        M(poly(p) + ' = ' + br(1, -a) + '(' + poly(q) + ')' + (r ? sg(r) : '')) + (r ? '; remainder ' + r : '; the remainder is 0'));
    } },
    { d: [1, 2], f: function () { // disproof by counter-example
      var a = pick(DISPROVE);
      return q1('Use a counter-example to show that the following statement is false:<br>“' + a[0] + '”', 2, a[1]);
    } },
    { d: [2, 3], f: function () { // proof by exhaustion
      var k = pick([3, 4]);
      return k === 3 ? q1('Prove that the square of any integer is either a multiple of 3 or one more than a multiple of 3.', 4, 'Consider ' + M('n = 3k,\\ 3k + 1,\\ 3k + 2') + ': ' + M('n^2 = 9k^2,\\ 9k^2 + 6k + 1,\\ 9k^2 + 12k + 4 = 3(3k^2 + 4k + 1) + 1') + '. In each case ' + M('n^2') + ' is ' + M('3m') + ' or ' + M('3m + 1') + '.')
        : q1('Prove by exhaustion that ' + M('n^2 + 2') + ' is not divisible by 4 for any integer ' + M('n') + '.', 4, 'If ' + M('n = 2k') + ', ' + M('n^2 + 2 = 4k^2 + 2') + ' (remainder 2). If ' + M('n = 2k + 1') + ', ' + M('n^2 + 2 = 4k^2 + 4k + 3') + ' (remainder 3). Neither is divisible by 4.');
    } }
  ]) });

  /* ---------------- Binomial expansion ---------------- */
  BS.topic({ id: 'al-binomial', name: 'Binomial expansion', video: 'A level maths binomial expansion estimate', gens: from('fm-binomial').concat([
    { d: [2], f: function () { // first terms and estimate
      var n = ri(6, 10), k = pick([2, 3, 4, 5]), xv = 0.01, t = [1, n * k, comb(n, 2) * k * k, comb(n, 3) * k * k * k];
      var est = t[0] + t[1] * xv + t[2] * xv * xv + t[3] * xv * xv * xv;
      return { stem: '', parts: [
        { q: 'Find the first four terms, in ascending powers of ' + M('x') + ', of the binomial expansion of ' + M('(1 + ' + k + 'x)^{' + n + '}') + '. Simplify each term.', m: 4, a: M('1 + ' + t[1] + 'x + ' + num(t[2]) + 'x^2 + ' + num(t[3]) + 'x^3') },
        { q: 'Use your expansion with a suitable value of ' + M('x') + ' to estimate ' + M((1 + k * xv).toFixed(2) + '^{' + n + '}') + '. Give your answer to 4 decimal places.', m: 2, a: M('x = 0.01') + ': ' + est.toFixed(4) }
      ] };
    } },
    { d: [3], f: function () { // product with a linear factor
      var n = ri(4, 7), k = nz(-3, 3), a = ri(1, 4), b = nz(-3, 3);
      var t1 = n * k, t2 = comb(n, 2) * k * k, coef = a * t2 + b * t1;
      return { stem: '', parts: [
        { q: 'Find the first three terms, in ascending powers of ' + M('x') + ', of ' + M('(1' + tc(k, 'x') + ')^{' + n + '}') + '.', m: 2, a: M('1' + tc(t1, 'x') + tc(t2, 'x^2')) },
        { q: 'Hence find the coefficient of ' + M('x^2') + ' in the expansion of ' + M('(' + a + tc(b, 'x') + ')(1' + tc(k, 'x') + ')^{' + n + '}') + '.', m: 2, a: M(a + ' \\times ' + t2 + ' + (' + b + ') \\times (' + t1 + ') = ' + coef) }
      ] };
    } }
  ]) });

  /* ---------------- Trigonometry ---------------- */
  var QT = [ // quadratic trig equations with exact solutions in [0, 360)
    ['2\\cos^2 x + \\cos x - 1 = 0', '(2\\cos x - 1)(\\cos x + 1) = 0', [60, 180, 300]],
    ['2\\sin^2 x - \\cos x - 1 = 0', '2\\cos^2 x + \\cos x - 1 = 0 \\Rightarrow (2\\cos x - 1)(\\cos x + 1) = 0', [60, 180, 300]],
    ['2\\sin^2 x - \\sin x - 1 = 0', '(2\\sin x + 1)(\\sin x - 1) = 0', [90, 210, 330]],
    ['2\\cos^2 x - 3\\sin x = 0', '2\\sin^2 x + 3\\sin x - 2 = 0 \\Rightarrow (2\\sin x - 1)(\\sin x + 2) = 0', [30, 150]],
    ['\\tan^2 x = 3', '\\tan x = \\pm\\sqrt{3}', [60, 120, 240, 300]],
    ['4\\sin^2 x = 3', '\\sin x = \\pm\\tfrac{\\sqrt{3}}{2}', [60, 120, 240, 300]]];
  BS.topic({ id: 'al-trig', name: 'Trigonometry: rules, graphs, identities and equations', video: 'A level maths trig equations identities', gens: from('sine-cosine', [1, 4, 5, 7]).concat(from('fm-trig', [3, 4, 6])).concat([
    { d: [2, 3], f: function () { // multiple angle
      var m = pick([2, 3]), fn = pick(['sin', 'cos']), k = pick([0.5, -0.5, 0.3, 0.7]), base = deg(fn === 'sin' ? Math.asin(k) : Math.acos(k)), sols = [];
      for (var n = -2; n < 2 * m + 2; n++) { var c = fn === 'sin' ? [base + 360 * n, 180 - base + 360 * n] : [base + 360 * n, -base + 360 * n]; c.forEach(function (v) { var x = v / m; if (x >= -1e-9 && x < 360 - 1e-9 && sols.every(function (s) { return Math.abs(s - x) > 1e-6; })) sols.push(x); }); }
      sols.sort(function (a, b) { return a - b; });
      return q1('Solve, for ' + M('0 \\le x < 360^\\circ') + ', ' + M('\\' + fn + ' ' + m + 'x = ' + k) + '. Give your answers to 1 decimal place where appropriate.', 4, M('x = ' + sols.map(function (v) { return (Math.abs(v - Math.round(v)) < 1e-9 ? Math.round(v) : dp(v, 1)) + '^\\circ'; }).join(',\\ ')));
    } },
    { d: [2, 3], f: function () { // quadratic in trig
      var e = pick(QT);
      return q1('Solve, for ' + M('0 \\le x < 360^\\circ') + ', ' + M(e[0]) + '.', 5, M(e[1]) + ', so ' + M('x = ' + e[2].map(function (v) { return v + '^\\circ'; }).join(',\\ ')));
    } },
    { d: [3], f: function () { // ambiguous case
      var A = ri(25, 50), c = ri(10, 20), a, s; do { a = ri(Math.ceil(c * Math.sin(rad(A))) + 1, c - 1); s = c * Math.sin(rad(A)) / a; } while (s >= 0.97 || a >= c);
      var C1 = deg(Math.asin(s)), C2 = 180 - C1;
      return q1('In triangle ' + M('ABC') + ', ' + M('AB = ' + c) + ' cm, ' + M('BC = ' + a) + ' cm and angle ' + M('BAC = ' + A + '^\\circ') + '.<br>Find the two possible values of angle ' + M('ACB') + ', giving your answers to 1 decimal place.', 4,
        M('\\sin C = \\frac{' + c + '\\sin ' + A + '^\\circ}{' + a + '} \\Rightarrow C = ' + dp(C1, 1) + '^\\circ\\text{ or } ' + dp(C2, 1) + '^\\circ'));
    } },
    { d: [1, 2], f: function () { // transformed trig graph
      var fn = pick(['sin', 'cos']), sh = pick([30, 45, 60, -30, -60]);
      var mx = (fn === 'sin' ? 90 : 0) - sh; while (mx < 0) mx += 360;
      var zeros = []; for (var z = -720; z <= 720; z += 180) { var x = (fn === 'sin' ? 0 : 90) + z - sh; if (x >= 0 && x <= 360) zeros.push(x); }
      return { stem: 'The curve ' + M('y = \\' + fn + '(x' + sg(sh) + '^\\circ)') + ' is drawn for ' + M('0 \\le x \\le 360^\\circ') + '.', parts: [
        { q: 'Describe the transformation that maps ' + M('y = \\' + fn + ' x') + ' onto this curve.', m: 1, a: 'Translation by ' + M('\\begin{pmatrix} ' + (-sh) + ' \\\\ 0 \\end{pmatrix}') },
        { q: 'Write down the coordinates of the maximum point(s).', m: 1, a: M('(' + mx + ',\\ 1)') + (mx + 360 <= 360 ? '' : '') },
        { q: 'Write down the coordinates of the points where the curve meets the ' + M('x') + '-axis.', m: 2, a: M(zeros.map(function (z) { return '(' + z + ',\\ 0)'; }).join(',\\ ')) }
      ] };
    } }
  ]) });

  /* ---------------- Vectors (2D) ---------------- */
  BS.topic({ id: 'al-vectors', name: 'Vectors in two dimensions', video: 'A level maths vectors magnitude direction', gens: from('vectors', [2, 3, 4, 8]).concat([
    { d: [1, 2], f: function () {
      var t = pick([[3, 4], [5, 12], [-6, 8], [8, -15], [7, 24], [-4, -3]]), a = t[0], b = t[1], m = Math.hypot(a, b), ang = deg(Math.atan2(b, a));
      return { stem: M('\\mathbf{a} = ' + c1(a, '\\mathbf{i}') + tc(b, '\\mathbf{j}')), parts: [
        { q: 'Find ' + M('|\\mathbf{a}|') + '.', m: 1, a: num(m) },
        { q: 'Find a unit vector in the direction of ' + M('\\mathbf{a}') + '.', m: 1, a: M('\\frac{1}{' + m + '}(' + c1(a, '\\mathbf{i}') + tc(b, '\\mathbf{j}') + ')') },
        { q: 'Find the angle ' + M('\\mathbf{a}') + ' makes with the positive ' + M('x') + '-axis (the direction of ' + M('\\mathbf{i}') + '), measured anticlockwise.', m: 2, a: dp((ang + 360) % 360, 1) + '°' }
      ] };
    } },
    { d: [2], f: function () { // position vectors, ratio
      var A = [ri(-5, 5), ri(-5, 5)], m = ri(1, 3), n = ri(1, 3); while (gcd(m, n) > 1) n++;
      var d = [nz(-3, 3) * (m + n), nz(-3, 3) * (m + n)], B = [A[0] + d[0], A[1] + d[1]], P = [A[0] + d[0] * m / (m + n), A[1] + d[1] * m / (m + n)];
      function v(p) { return BS.vt(p, ['\\mathbf{i}', '\\mathbf{j}']); }
      return { stem: 'The points ' + M('A') + ' and ' + M('B') + ' have position vectors ' + M(v(A)) + ' and ' + M(v(B)) + ' relative to ' + M('O') + '.', parts: [
        { q: 'Find ' + M('\\overrightarrow{AB}') + '.', m: 1, a: M(v(d)) },
        { q: 'Find ' + M('|\\overrightarrow{AB}|') + ', giving your answer as a simplified surd.', m: 2, a: M(surd(d[0] * d[0] + d[1] * d[1])) },
        { q: 'The point ' + M('P') + ' lies on ' + M('AB') + ' with ' + M('AP : PB = ' + m + ' : ' + n) + '. Find the position vector of ' + M('P') + '.', m: 2, a: M(v(P)) }
      ] };
    } },
    { d: [2, 3], f: function () { // resultant force
      var F1 = [ri(1, 8), nz(-5, 5)], F2 = [nz(-6, 6), ri(1, 7)], R = [F1[0] + F2[0], F1[1] + F2[1]];
      if (R[0] === 0 && R[1] === 0) R[0] = 1;
      var mag = Math.hypot(R[0], R[1]), ang = (deg(Math.atan2(R[1], R[0])) + 360) % 360;
      function v(p) { return '(' + BS.vt(p, ['\\mathbf{i}', '\\mathbf{j}']) + ')'; }
      return { stem: 'Two forces ' + M('\\mathbf{F}_1 = ' + v(F1)) + ' N and ' + M('\\mathbf{F}_2 = ' + v(F2)) + ' N act on a particle.', parts: [
        { q: 'Find the resultant force.', m: 1, a: M(v(R)) + ' N' },
        { q: 'Find the magnitude of the resultant force.', m: 2, a: s3(mag) + ' N' },
        { q: 'Find the angle between the resultant and the vector ' + M('\\mathbf{i}') + '.', m: 2, a: dp(ang > 180 ? 360 - ang : ang, 1) + '°' }
      ] };
    } },
    { d: [2, 3], f: function () { // parallel vectors
      var a = [nz(-4, 5), nz(-4, 5)], k = nz(-3, 3), p = a[0] * k, q;
      return q1('The vectors ' + M(c1(a[0], '\\mathbf{i}') + tc(a[1], '\\mathbf{j}')) + ' and ' + M(c1(p, '\\mathbf{i}') + ' + q\\mathbf{j}') + ' are parallel. Find the value of ' + M('q') + '.', 2, M('q = ' + a[1] * k));
    } }
  ]) });

  /* ---------------- Differentiation ---------------- */
  BS.topic({ id: 'al-differentiation', name: 'Differentiation: first principles, tangents, stationary points and optimisation', video: 'A level maths differentiation first principles', gens: from('fm-calculus', [8, 9, 10, 11, 13]).concat([
    { d: [2, 3], f: function () { // first principles
      var a = ri(1, 5), b = nz(-6, 6);
      return q1('Prove, from first principles, that the derivative of ' + M(poly([a, b, 0])) + ' is ' + M(poly([2 * a, b])) + '.', 4,
        M('\\frac{f(x + h) - f(x)}{h} = \\frac{' + a + '(2xh + h^2)' + sg(b) + 'h}{h} = ' + poly([2 * a, b]) + ' + ' + c1(a, 'h')) + ', which tends to ' + M(poly([2 * a, b])) + ' as ' + M('h \\to 0') + '.');
    } },
    { d: [1, 2], f: function () { // fractional powers
      var a = ri(2, 8), b = ri(2, 9), c = nz(-9, 9);
      return q1('Given that ' + M('y = ' + a + 'x^{\\frac{3}{2}} - \\frac{' + b + '}{\\sqrt{x}}' + tc(c, 'x')) + ', ' + M('x > 0') + ', find ' + M('\\frac{\\mathrm{d}y}{\\mathrm{d}x}') + '.', 3,
        M(BS.vt([frac(3 * a, 2), frac(b, 2)], ['x^{\\frac{1}{2}}', 'x^{-\\frac{3}{2}}']) + sg(c)));
    } },
    { d: [2, 3], f: function () { // tangent to curve with sqrt, meets axis
      var a = ri(1, 4), b = ri(1, 6), x0 = pick([1, 4, 9]), r0 = Math.sqrt(x0), y0 = a * x0 + b / r0 * x0 - 0; // y = ax + b√x
      y0 = a * x0 + b * r0; var m = a + b / (2 * r0), c = y0 - m * x0;
      return { stem: 'The curve ' + M('C') + ' has equation ' + M('y = ' + c1(a, 'x') + ' + ' + b + '\\sqrt{x}') + ', ' + M('x > 0') + '. The point ' + M('P') + ' on ' + M('C') + ' has ' + M('x') + '-coordinate ' + x0 + '.', parts: [
        { q: 'Find the gradient of ' + M('C') + ' at ' + M('P') + '.', m: 3, a: M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + a + ' + \\frac{' + b + '}{2\\sqrt{x}} = ' + frac(Math.round(m * 2 * r0), 2 * r0)) },
        { q: 'Find the equation of the tangent to ' + M('C') + ' at ' + M('P') + ', in the form ' + M('y = mx + c') + '.', m: 2, a: M('y = ' + frac(Math.round(m * 2 * r0), 2 * r0) + 'x' + (c ? (c < 0 ? ' - ' : ' + ') + frac(Math.round(Math.abs(c) * 2 * r0), 2 * r0) : '')) }
      ] };
    } },
    { d: [2, 3], f: function () { // optimisation: closed box square base
      var V = pick([250, 500, 1000, 432, 2000]), x = Math.cbrt(V), S = 2 * x * x + 4 * V / x;
      return { stem: 'A closed box has a square base of side ' + M('x') + ' cm and height ' + M('h') + ' cm. Its volume is ' + V + ' cm³.', parts: [
        { q: 'Show that the surface area, ' + M('S') + ' cm², is given by ' + M('S = 2x^2 + \\frac{' + 4 * V + '}{x}') + '.', m: 3, a: M('x^2 h = ' + V + ' \\Rightarrow h = \\frac{' + V + '}{x^2}') + '; ' + M('S = 2x^2 + 4xh = 2x^2 + \\frac{' + 4 * V + '}{x}') },
        { q: 'Use calculus to find the value of ' + M('x') + ' for which ' + M('S') + ' is a minimum.', m: 4, a: M('4x - \\frac{' + 4 * V + '}{x^2} = 0 \\Rightarrow x^3 = ' + V + ' \\Rightarrow x = ' + s3(x)) },
        { q: 'Justify that this value gives a minimum, and find the minimum surface area.', m: 3, a: M('\\frac{\\mathrm{d}^2S}{\\mathrm{d}x^2} = 4 + \\frac{' + 8 * V + '}{x^3} > 0') + '; ' + M('S = ' + s3(S)) + ' cm²' }
      ] };
    } }
  ]) });

  /* ---------------- Integration ---------------- */
  BS.topic({ id: 'al-integration', name: 'Integration: indefinite, definite and areas', video: 'A level maths integration area under curve', gens: [
    { d: [1, 2], f: function () {
      var a = ri(1, 4) * 3, b = ri(1, 4) * 2, c = ri(2, 9);
      return q1('Find ' + M('\\displaystyle\\int \\left(' + a + 'x^2 - \\frac{' + b + '}{\\sqrt{x}} + \\frac{' + c + '}{x^2}\\right)\\mathrm{d}x') + ', giving each term in its simplest form.', 4,
        M(c1(a / 3, 'x^3') + ' - ' + 2 * b + 'x^{\\frac{1}{2}} - ' + c + 'x^{-1} + c'));
    } },
    { d: [2], f: function () { // find f from f' and point
      var a = ri(1, 4) * 3, b = ri(1, 3) * 3, x0 = 4, y0 = ri(-20, 40);
      var F = function (x) { return a / 3 * x * x * x - 2 * b / 3 * Math.pow(x, 1.5); }, C = y0 - F(x0);
      return q1('The curve ' + M('y = f(x)') + ' passes through ' + M('(4,\\ ' + y0 + ')') + ' and ' + M("f'(x) = " + a + 'x^2 - ' + b + '\\sqrt{x}') + '. Find ' + M('f(x)') + '.', 5,
        M('f(x) = ' + c1(a / 3, 'x^3') + ' - ' + frac(2 * b, 3) + 'x^{\\frac{3}{2}}' + (C ? sg(Math.round(C * 3) / 3 === Math.round(C) ? Math.round(C) : 0) : '').replace(/ [+-] 0$/, '') + (Math.round(C) !== C ? ' + ' + frac(Math.round(C * 3), 3) : '')));
    } },
    { d: [2, 3], f: function () { // exact definite integral with sqrt
      var a = ri(1, 4), b = ri(1, 6), lo = 1, hi = pick([4, 9]);
      var F = function (x) { return a * x * x - 2 * b / 3 * Math.pow(x, 1.5); }, val = F(hi) - F(lo);
      return q1('Find the exact value of ' + M('\\displaystyle\\int_1^{' + hi + '} (' + 2 * a + 'x - ' + b + '\\sqrt{x})\\,\\mathrm{d}x') + '.', 4,
        M('\\left[' + c1(a, 'x^2') + ' - ' + frac(2 * b, 3) + 'x^{\\frac{3}{2}}\\right]_1^{' + hi + '} = ' + frac(Math.round(val * 3), 3)));
    } },
    { d: [2, 3], f: function () { // area with part below the axis
      var r = ri(2, 4), f = function (x) { return x * (x - r); }, a1 = r * r * r / 6, top = r + ri(1, 2), a2 = (top * top * top / 3 - r * top * top / 2) - (r * r * r / 3 - r * r * r / 2);
      var pl = D.plane({ xmin: -1, xmax: top + 1, ymin: f(r / 2) - 1, ymax: f(top) + 1, w: 300, h: 260, ticks: true, tstep: 1, tstepy: Math.max(1, Math.round(f(top) / 4)) });
      var s = pl.svg + pl.area(f, 0, r, 0) + pl.area(f, r, top, 0) + pl.curve(f, -0.8, top + 0.8) + D.line(pl.X(top), pl.Y(0), pl.X(top), pl.Y(f(top)), 'dash');
      return { stem: 'The diagram shows the curve ' + M('y = ' + poly([1, -r, 0])) + ' and the line ' + M('x = ' + top) + '. The shaded regions are bounded by the curve, the ' + M('x') + '-axis and the line ' + M('x = ' + top) + '.' + svgOf(pl, s, 'Areas above and below the axis'), parts: [
        { q: 'Evaluate ' + M('\\displaystyle\\int_0^{' + top + '} (' + poly([1, -r, 0]) + ')\\,\\mathrm{d}x') + '.', m: 3, a: M(frac(Math.round((a2 - a1) * 6), 6)) },
        { q: 'Find the total area of the shaded regions.', m: 3, a: M(frac(Math.round(a1 * 6), 6) + ' + ' + frac(Math.round(a2 * 6), 6) + ' = ' + frac(Math.round((a1 + a2) * 6), 6)) }
      ] };
    } },
    { d: [3], f: function () { // area between curve and line
      var r1 = ri(0, 1), r2 = r1 + ri(2, 4), k = ri(1, 4); // curve y = -x^2 + ... line through intersections
      var f = function (x) { return -(x - r1) * (x - r2) + k * x; }, L = function (x) { return k * x; }; // region between f and L for r1..r2
      var area = Math.pow(r2 - r1, 3) / 6, ys = [];
      for (var x = r1 - 1; x <= r2 + 1; x += 0.1) { ys.push(f(x)); ys.push(L(x)); }
      var pl = D.plane({ xmin: Math.min(-1, r1 - 1), xmax: r2 + 1, ymin: Math.min.apply(null, ys.concat([0])) - 1, ymax: Math.max.apply(null, ys) + 1, w: 300, h: 280 });
      var s = pl.svg + pl.area(f, r1, r2, L) + pl.curve(f, r1 - 1, r2 + 1) + pl.curve(L, r1 - 1, r2 + 1);
      var cf = [-1, r1 + r2 + k, -r1 * r2];
      return { stem: 'The diagram shows the curve ' + M('y = ' + poly(cf)) + ' and the line ' + M('y = ' + c1(k, 'x')) + '. The shaded region is bounded by the curve and the line.' + svgOf(pl, s, 'Area between a curve and a line'), parts: [
        { q: 'Find the ' + M('x') + '-coordinates of the points where the line meets the curve.', m: 2, a: M('x = ' + r1 + ',\\ x = ' + r2) },
        { q: 'Use calculus to find the exact area of the shaded region.', m: 5, a: M('\\displaystyle\\int_{' + r1 + '}^{' + r2 + '} (' + poly([-1, r1 + r2, -r1 * r2]) + ')\\,\\mathrm{d}x = ' + frac(Math.pow(r2 - r1, 3), 6)) }
      ] };
    } }
  ] });
  // tidy the f(x) answer above with an exact constant
  BS.topics['al-integration'].gens[1].f = function () {
    var a = ri(1, 4) * 3, b = ri(1, 3) * 3, y0 = ri(-20, 40);
    var C3 = 3 * y0 - (a * 64 - 2 * b * 8); // 3C
    return q1('The curve ' + M('y = f(x)') + ' passes through ' + M('(4,\\ ' + y0 + ')') + ' and ' + M("f'(x) = " + a + 'x^2 - ' + b + '\\sqrt{x}') + '. Find ' + M('f(x)') + '.', 5,
      M('f(x) = ' + c1(a / 3, 'x^3') + ' - ' + frac(2 * b, 3) + 'x^{\\frac{3}{2}}' + (C3 ? (C3 < 0 ? ' - ' : ' + ') + frac(Math.abs(C3), 3) : '')));
  };

  /* ---------------- Exponentials and logarithms ---------------- */
  BS.topic({ id: 'al-explog', name: 'Exponentials and logarithms', video: 'A level maths exponentials logarithms', gens: [
    { d: [1, 2], f: function () { // laws of logs single log, solve
      var a = pick([2, 3, 5]), p = ri(1, 3), q = ri(2, 9), r = ri(2, 9);
      var OK = []; [2, 3].forEach(function (bb) { for (var kk = 1; kk <= 5; kk++) { var L = Math.pow(bb, kk); for (var xx = 2; xx <= 16; xx++) if (L % xx === 0 && xx * xx > L) OK.push([bb, kk, xx]); } });
      var ch = pick(OK), b = ch[0], k = ch[1], x0 = ch[2], lhs = Math.pow(b, k), d = x0 - lhs / x0; // log_b x + log_b (x - d) = k
      return { stem: '', parts: [
        { q: 'Write ' + M(p + '\\log_' + a + ' ' + q + ' + \\log_' + a + ' ' + r) + ' as a single logarithm.', m: 2, a: M('\\log_' + a + ' ' + num(Math.pow(q, p) * r)) },
        { q: 'Solve ' + M('\\log_' + b + ' x + \\log_' + b + '(x - ' + d + ') = ' + k) + '.', m: 4, a: M('x(x - ' + d + ') = ' + lhs + ' \\Rightarrow x = ' + x0) + ' (the negative root is rejected)' }
      ] };
    } },
    { d: [1, 2], f: function () { // a^x = b and ln
      var a = pick([2, 3, 5, 7]), b = ri(10, 90), c = ri(2, 9), e = ri(2, 6);
      return { stem: '', parts: [
        { q: 'Solve ' + M(a + '^{x} = ' + b) + ', giving your answer to 3 significant figures.', m: 2, a: M('x = \\frac{\\ln ' + b + '}{\\ln ' + a + '} = ' + s3(Math.log(b) / Math.log(a))) },
        { q: 'Solve ' + M('\\ln(' + c + 'x - 1) = ' + e) + ', giving your answer in exact form.', m: 2, a: M('x = \\frac{e^{' + e + '} + 1}{' + c + '}') }
      ] };
    } },
    { d: [2, 3], f: function () { // hidden quadratic in e^x
      var u = BS.shuffle([2, 3, 4, 5]).slice(0, 2).sort();
      return q1('Solve ' + M('e^{2x}' + sg(-(u[0] + u[1])) + 'e^{x} + ' + u[0] * u[1] + ' = 0') + ', giving your answers as exact values.', 4, M('(e^x - ' + u[0] + ')(e^x - ' + u[1] + ') = 0 \\Rightarrow x = \\ln ' + u[0] + '\\text{ or } x = \\ln ' + u[1]));
    } },
    { d: [2], f: function () { // exponential model
      var A = ri(20, 90) * 10, k = ri(5, 25) / 100, t1 = ri(3, 10), T = A * pick([2, 3]);
      return { stem: 'The number of bacteria, ' + M('N') + ', in a culture ' + M('t') + ' hours after the start of an experiment is modelled by ' + M('N = ' + A + 'e^{' + k + 't}') + '.', parts: [
        { q: 'Interpret the value ' + A + ' in this model.', m: 1, a: 'The initial number of bacteria.' },
        { q: 'Find ' + M('\\frac{\\mathrm{d}N}{\\mathrm{d}t}') + ' when ' + M('t = ' + t1) + ' and interpret your answer.', m: 3, a: M(num(A * k) + 'e^{' + num(k * t1) + '} = ' + s3(A * k * Math.exp(k * t1))) + ': the rate of increase in bacteria per hour at that time.' },
        { q: 'Find the time when the number of bacteria first exceeds ' + num(T) + '.', m: 2, a: M('t = \\frac{\\ln ' + T / A + '}{' + k + '} = ' + s3(Math.log(T / A) / k)) + ' hours' }
      ] };
    } },
    { d: [2, 3], f: function () { // log-log straight line
      var a = pick([2, 3, 5, 0.5]), n = pick([1.5, 2, 0.5, -1, 3]), lx = [0.2, 1.4], ly = lx.map(function (v) { return Math.log10(a) + n * v; });
      var pl = D.plane({ xmin: 0, xmax: 1.6, ymin: Math.min(0, ly[0], ly[1]) - 0.4, ymax: Math.max(ly[0], ly[1]) + 0.4, w: 300, h: 240, xl: 'log x', yl: 'log y' });
      var s = pl.svg + D.line(pl.X(lx[0]), pl.Y(ly[0]), pl.X(lx[1]), pl.Y(ly[1]), 'curve') + D.dot(pl.X(lx[0]), pl.Y(ly[0])) + D.dot(pl.X(lx[1]), pl.Y(ly[1]));
      s += D.text(pl.X(lx[0]) + 6, pl.Y(ly[0]) - 10, '(' + lx[0] + ', ' + ly[0].toFixed(3) + ')', { size: 11 }) + D.text(pl.X(lx[1]) - 6, pl.Y(ly[1]) - 10, '(' + lx[1] + ', ' + ly[1].toFixed(3) + ')', { anchor: 'end', size: 11 });
      return { stem: 'Two variables ' + M('x') + ' and ' + M('y') + ' are thought to satisfy ' + M('y = ax^n') + '. A graph of ' + M('\\log_{10} y') + ' against ' + M('\\log_{10} x') + ' is a straight line through the points shown.' + svgOf(pl, s, 'Straight line on log axes'), parts: [
        { q: 'Show that ' + M('\\log_{10} y = n\\log_{10} x + \\log_{10} a') + '.', m: 2, a: 'Take logs of both sides and use the laws of logarithms.' },
        { q: 'Find the values of ' + M('n') + ' and ' + M('a') + ', giving ' + M('a') + ' to 2 significant figures.', m: 4, a: M('n = ' + num(n) + ',\\ a = ' + BS.sf(a, 2)) }
      ] };
    } },
    { d: [1, 2], f: function () { // features of e^x graph
      var a = ri(2, 6), k = pick([1, 2, -1, -2, 0.5]), c = nz(-4, 4);
      return { stem: 'The curve ' + M('C') + ' has equation ' + M('y = ' + a + 'e^{' + (k === 1 ? '' : k === -1 ? '-' : k) + 'x}' + sg(c)) + '.', parts: [
        { q: 'Write down the coordinates of the point where ' + M('C') + ' crosses the ' + M('y') + '-axis.', m: 1, a: M('(0,\\ ' + (a + c) + ')') },
        { q: 'Write down the equation of the asymptote to ' + M('C') + '.', m: 1, a: M('y = ' + c) },
        { q: 'Find the gradient of ' + M('C') + ' at the point where ' + M('x = 0') + '.', m: 2, a: num(a * k) }
      ] };
    } }
  ] });
})(typeof window !== 'undefined' ? window : globalThis);
