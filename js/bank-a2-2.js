/* Byte Size — Pearson Edexcel A Level Mathematics, Year 2 Statistics and Mechanics. Take g = 9.8 m s⁻². */
(function (g) {
  var BS = g.BS, D = BS.draw, IB = BS.ib, FM = BS.fm, AL = BS.al;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, dp = BS.dp, num = BS.num, M = BS.m;
  var s3 = IB.s3, from = FM.from, c1 = FM.c1, tc = FM.tc, q1 = AL.q1, pt = AL.pt, deg = AL.deg, rad = AL.rad, table = IB.table;
  var G = 9.8;
  function f4(p) { return p.toFixed(4); }
  function vt(cs) { return BS.vt(cs.map(function (c) { return typeof c === 'number' ? num(c) : c; }), ['\\mathbf{i}', '\\mathbf{j}']); }

  /* ---------- diagrams ---------- */
  function beam(L, sup, loads, opts) { // sup: positions of supports (m); loads: [[pos, label]]
    opts = opts || {};
    var W = 320, x0 = 30, sc = (W - 60) / L, y = 70, X = function (v) { return x0 + v * sc; };
    var s = D.arrowDefs + '<rect x="' + x0 + '" y="' + (y - 6) + '" width="' + (L * sc) + '" height="12" class="shape"/>';
    s += D.text(x0 - 6, y + 4, 'A', { anchor: 'end', cls: 'it' }) + D.text(x0 + L * sc + 6, y + 4, 'B', { cls: 'it' });
    sup.forEach(function (p, i) { var px = X(p[0]); s += D.poly([[px, y + 6], [px - 9, y + 24], [px + 9, y + 24]], 'thin') + D.text(px, y + 38, p[1], { anchor: 'middle', cls: 'it' }); });
    loads.forEach(function (l) { var px = X(l[0]); s += D.arrow(px, y + 6, px, y + 42, 'accent') + D.text(px + 5, y + 54, l[1], { size: 11 }); });
    // dimension ticks along the top
    var marks = [0, L].concat(sup.map(function (p) { return p[0]; })).concat(loads.map(function (l) { return l[0]; })).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(function (a, b) { return a - b; });
    for (var i = 0; i + 1 < marks.length; i++) { var a = X(marks[i]), b = X(marks[i + 1]); s += D.line(a, y - 22, b, y - 22, 'thin') + D.line(a, y - 26, a, y - 18, 'thin') + D.line(b, y - 26, b, y - 18, 'thin') + (b - a >= 30 ? D.text((a + b) / 2, y - 28, num(marks[i + 1] - marks[i]) + ' m', { anchor: 'middle', size: 11 }) : ''); }
    return D.svg(W, 140, s, 'Beam resting on supports');
  }
  function incline(th, label, pull) { // th degrees, block on slope
    var W = 320, H = 200, bx = 290, by = 170, L = 260, ang = rad(th), tx = bx - L * Math.cos(ang), ty = by - L * Math.sin(ang);
    var s = D.arrowDefs + D.poly([[tx, ty], [bx, by], [tx, by]], 'thin');
    var mx = tx + (bx - tx) * 0.5, my = ty + (by - ty) * 0.5, ux = Math.cos(ang), uy = -Math.sin(ang), nx = Math.sin(ang), ny = -Math.cos(ang);
    // block (rotated square)
    var p1 = [mx - 16 * Math.cos(ang), my - 16 * Math.sin(ang)], p2 = [mx + 16 * Math.cos(ang), my + 16 * Math.sin(ang)];
    var p3 = [p2[0] + 26 * nx, p2[1] + 26 * ny], p4 = [p1[0] + 26 * nx, p1[1] + 26 * ny];
    s += D.poly([p1, p2, p3, p4], 'shape');
    s += D.text(bx - 46, by - 6, th === Math.round(th) ? th + '°' : 'α', { anchor: 'end', size: 12 });
    s += '<path d="M' + (bx - 40) + ',' + by + ' A40,40 0 0,1 ' + (bx - 40 * Math.cos(ang)).toFixed(1) + ',' + (by - 40 * Math.sin(ang)).toFixed(1) + '" class="thin"/>';
    if (pull) { var cx = (p1[0] + p3[0]) / 2, cy = (p1[1] + p3[1]) / 2; s += D.arrow(cx, cy, cx - 60 * Math.cos(ang), cy - 60 * Math.sin(ang), 'accent') + D.text(cx - 66 * Math.cos(ang), cy - 66 * Math.sin(ang) - 6, pull, { anchor: 'middle', cls: 'it' }); }
    if (label) s += D.text((p1[0] + p3[0]) / 2 + 30 * nx, (p1[1] + p3[1]) / 2 + 30 * ny, label, { anchor: 'middle', size: 11 });
    return D.svg(W, H, s, 'Particle on an inclined plane');
  }
  function ladder(th) {
    var bx = 220, by = 190, L = 170, ang = rad(th), tx = bx - L * Math.cos(ang), ty = by - L * Math.sin(ang);
    var s = D.line(20, by, 300, by, 'ln') + D.line(tx, by, tx, 10, 'ln');
    for (var i = 0; i < 12; i++) s += D.line(30 + i * 22, by, 22 + i * 22, by + 8, 'thin');
    for (var j = 0; j < 8; j++) s += D.line(tx, 20 + j * 22, tx - 8, 28 + j * 22, 'thin');
    s += D.line(tx, ty, bx, by, 'curve') + D.text(bx + 6, by - 6, 'A', { cls: 'it' }) + D.text(tx + 8, ty - 4, 'B', { cls: 'it' });
    s += '<path d="M' + (bx - 30) + ',' + by + ' A30,30 0 0,1 ' + (bx - 30 * Math.cos(ang)).toFixed(1) + ',' + (by - 30 * Math.sin(ang)).toFixed(1) + '" class="thin"/>' + D.text(bx - 44, by - 8, th + '°', { anchor: 'end', size: 12 });
    return D.svg(320, 210, s, 'Ladder resting against a wall');
  }

  /* ================= STATISTICS ================= */
  BS.topic({ id: 'a2-regression', name: 'Regression, correlation and hypothesis tests for correlation', video: 'A level maths PMCC hypothesis test exponential regression', gens: [
    { d: [2, 3], f: function () { // y = a b^x from log y = c + m x
      var c = ri(2, 15) / 10, m = ri(5, 30) / 100, x = ri(5, 12), a = Math.pow(10, c), b = Math.pow(10, m);
      var pl = D.plane({ xmin: -1, xmax: 14, ymin: -0.5, ymax: c + 14 * m + 0.6, w: 300, h: 240, xl: 'x', yl: 'log y' });
      var s = pl.svg + pl.curve(function (t) { return c + m * t; }, 0, 13);
      for (var i = 0; i < 7; i++) { var tx = 1 + i * 2; s += D.dot(pl.X(tx), pl.Y(c + m * tx + (Math.random() - 0.5) * 0.15), 2.5); }
      return { stem: 'A biologist models the number of cells, ' + M('y') + ', after ' + M('x') + ' hours. A graph of ' + M('\\log_{10} y') + ' against ' + M('x') + ' is approximately a straight line with equation ' + M('\\log_{10} y = ' + c + ' + ' + m + 'x') + '.' + D.svg(300, 240, s, 'Graph of log y against x'), parts: [
        { q: 'Show that the model can be written as ' + M('y = ab^x') + ', and find the values of ' + M('a') + ' and ' + M('b') + ' to 3 significant figures.', m: 4, a: M('y = 10^{' + c + '} \\times (10^{' + m + '})^x') + ', so ' + M('a = ' + s3(a) + ',\\ b = ' + s3(b)) },
        { q: 'Interpret the value of ' + M('b') + ' in context.', m: 1, a: 'The number of cells is multiplied by ' + s3(b) + ' each hour.' },
        { q: 'Use the model to estimate the number of cells after ' + x + ' hours.', m: 1, a: num(Math.round(a * Math.pow(b, x))) }
      ] };
    } },
    { d: [2, 3], f: function () { // PMCC test with critical value
      var n = pick([8, 10, 12, 15, 20]), cv = { 8: [0.6215, 0.7887], 10: [0.5494, 0.7155], 12: [0.4973, 0.6581], 15: [0.4409, 0.5923], 20: [0.3783, 0.5155] }[n], lv = pick([[5, 0], [2.5, 1]]);
      var tail = pick(['pos', 'neg', 'two']), crit = tail === 'two' ? cv[lv[1] ? 1 : 0] : cv[lv[1]];
      var sig = tail === 'two' ? (lv[1] ? 5 : 10) : lv[0];
      if (tail === 'two') crit = sig === 5 ? { 8: 0.7067, 10: 0.6319, 12: 0.5760, 15: 0.5140, 20: 0.4438 }[n] : cv[0];
      var r = (tail === 'neg' ? -1 : pick([1, -1])) * (Math.round((crit + pick([-1, 1]) * ri(3, 15) / 100) * 1000) / 1000);
      if (tail === 'pos') r = Math.abs(r);
      var reject = tail === 'two' ? Math.abs(r) > crit : tail === 'pos' ? r > crit : r < -crit;
      var H1 = tail === 'two' ? '\\rho \\ne 0' : tail === 'pos' ? '\\rho > 0' : '\\rho < 0';
      return { stem: 'A random sample of ' + n + ' days is taken. The product moment correlation coefficient between the maximum temperature and the number of ice creams sold is ' + M('r = ' + r) + '.', parts: [
        { q: 'Test, at the ' + sig + '% level of significance, whether there is evidence of ' + (tail === 'two' ? 'a correlation' : tail === 'pos' ? 'a positive correlation' : 'a negative correlation') + ' between the variables. State your hypotheses clearly. The critical value is ' + crit + '.', m: 4,
          a: M('H_0: \\rho = 0,\\ H_1: ' + H1) + '. ' + (reject ? M((tail === 'two' ? '|r| = ' + Math.abs(r) : 'r = ' + r) + (tail === 'neg' ? ' < -' : ' > ') + crit) + ', so reject ' + M('H_0') + ': there is evidence of ' + (tail === 'two' ? 'correlation' : tail === 'pos' ? 'positive correlation' : 'negative correlation') + '.' : M((tail === 'two' ? '|r| = ' + Math.abs(r) : 'r = ' + r) + (tail === 'neg' ? ' > -' : ' < ') + crit) + ', so do not reject ' + M('H_0') + ': there is insufficient evidence of ' + (tail === 'two' ? 'correlation' : tail === 'pos' ? 'positive correlation' : 'negative correlation') + '.') },
        { q: 'State an assumption needed for this test to be valid.', m: 1, a: 'The data come from a bivariate normal distribution.' }
      ] };
    } },
    { d: [1, 2], f: function () { // interpret r
      var r = pick([0.92, -0.87, 0.15, -0.08, 0.64, -0.55]);
      var desc = Math.abs(r) > 0.8 ? 'strong' : Math.abs(r) > 0.5 ? 'moderate' : 'weak (or no)';
      return { stem: 'For a set of data, the product moment correlation coefficient is ' + M('r = ' + r) + '.', parts: [
        { q: 'Describe the correlation.', m: 1, a: (Math.abs(r) < 0.2 ? 'Very weak / no linear correlation' : desc.charAt(0).toUpperCase() + desc.slice(1) + ' ' + (r > 0 ? 'positive' : 'negative') + ' correlation') },
        { q: 'Explain why correlation does not imply causation.', m: 1, a: 'A third factor may affect both variables, or the link may be coincidence.' }
      ] };
    } }
  ] });

  BS.topic({ id: 'a2-probability', name: 'Conditional probability', video: 'A level maths conditional probability Venn tree', gens: from('ib-probability', [1]).concat([
    { d: [1, 2], f: function () { // Venn counts, conditional
      var a = ri(5, 30), b = ri(3, 20), c = ri(5, 30), n = a + b + c + ri(3, 20);
      var ven = D.venn([a, b, c, n - a - b - c], ['F', 'T']);
      return { stem: 'In a group of ' + n + ' students, ' + (a + b) + ' play football (' + M('F') + '), ' + (b + c) + ' play tennis (' + M('T') + ') and ' + b + ' play both.' + ven, parts: [
        { q: 'A student is chosen at random. Find ' + M('P(F \\cup T)') + '.', m: 1, a: M(frac(a + b + c, n)) },
        { q: 'Find ' + M('P(T \\mid F)') + '.', m: 2, a: M('\\frac{' + b + '}{' + (a + b) + '}' + (gcd(b, a + b) > 1 ? ' = ' + frac(b, a + b) : '')) },
        { q: 'Find ' + M("P(F' \\mid T)") + '.', m: 2, a: M('\\frac{' + c + '}{' + (b + c) + '}' + (gcd(c, b + c) > 1 ? ' = ' + frac(c, b + c) : '')) }
      ] };
    } },
    { d: [2, 3], f: function () { // tree diagram, reverse conditional
      var pA = ri(2, 8) / 10, pDA = ri(1, 9) / 100, pDB = ri(1, 9) / 100; if (pDA === pDB) pDB += 0.02; pDB = Math.round(pDB * 100) / 100;
      var pD = pA * pDA + (1 - pA) * pDB, post = pA * pDA / pD;
      var tr = D.tree({ A: 'A', Ac: 'B', B: 'D', Bc: "D'", p: [String(pA), String(dp(1 - pA, 1)), String(pDA), String(dp(1 - pDA, 2)), String(pDB), String(dp(1 - pDB, 2))] });
      return { stem: 'A factory has two machines. Machine ' + M('A') + ' makes ' + pA * 100 + '% of the items and machine ' + M('B') + ' makes the rest. Of items made by ' + M('A') + ', ' + num(pDA * 100) + '% are defective (' + M('D') + '); of items made by ' + M('B') + ', ' + num(pDB * 100) + '% are defective.' + tr, parts: [
        { q: 'Find the probability that a randomly chosen item is defective.', m: 2, a: s3(pD) },
        { q: 'Given that an item is defective, find the probability that it was made by machine ' + M('A') + '.', m: 3, a: M('\\frac{' + num(pA * pDA) + '}{' + s3(pD) + '} = ' + s3(post)) }
      ] };
    } },
    { d: [2, 3], f: function () { // formula P(A ∩ B) and independence
      var pA = ri(2, 6) / 10, pB = ri(2, 6) / 10, pAB = Math.round(pA * pB * 100) / 100 + pick([0, 0, 0.02, -0.02]); pAB = Math.round(pAB * 100) / 100;
      var ind = Math.abs(pAB - pA * pB) < 1e-9;
      return { stem: M('P(A) = ' + pA + ',\\ P(B) = ' + pB) + ' and ' + M('P(A \\cap B) = ' + pAB) + '.', parts: [
        { q: 'Find ' + M('P(A \\mid B)') + '.', m: 2, a: M('\\frac{' + pAB + '}{' + pB + '} = ' + frac(Math.round(pAB * 100), Math.round(pB * 100))) },
        { q: 'Find ' + M("P(A \\mid B')") + '.', m: 2, a: M('\\frac{' + dp(pA - pAB, 2) + '}{' + dp(1 - pB, 2) + '} = ' + frac(Math.round((pA - pAB) * 100), Math.round((1 - pB) * 100))) },
        { q: 'Determine whether ' + M('A') + ' and ' + M('B') + ' are independent.', m: 2, a: M('P(A)P(B) = ' + dp(pA * pB, 2)) + (ind ? ' = ' : ' ≠ ') + M('P(A \\cap B)') + ', so they are ' + (ind ? '' : 'not ') + 'independent.' }
      ] };
    } }
  ]) });

  BS.topic({ id: 'a2-normal', name: 'The normal distribution and hypothesis tests for the mean', video: 'A level maths normal distribution hypothesis test mean', gens: from('ib-normal', [0, 1, 2]).concat([
    { d: [2, 3], f: function () { // binomial approximation
      var n = pick([60, 80, 100, 120, 150, 200]), p = pick([0.3, 0.4, 0.45, 0.5, 0.35]), mu = n * p, sd = Math.sqrt(n * p * (1 - p)), k = Math.round(mu + pick([-1, 1]) * ri(3, 8)), above = k > mu;
      var pr = above ? 1 - IB.ncdf(k - 0.5, mu, sd) : IB.ncdf(k + 0.5, mu, sd);
      return { stem: M('X \\sim \\mathrm{B}(' + n + ',\\ ' + p + ')') + '.', parts: [
        { q: 'Explain why a normal distribution can be used to approximate ' + M('X') + '.', m: 1, a: M('n') + ' is large and ' + M('p') + ' is close to 0.5' },
        { q: 'Write down the mean and variance of the approximating distribution.', m: 2, a: M('\\mu = ' + num(mu) + ',\\ \\sigma^2 = ' + num(Math.round(sd * sd * 1000) / 1000)) },
        { q: 'Use the approximation to find ' + M('P(X ' + (above ? '\\ge ' : '\\le ') + k + ')') + '.', m: 3, a: M('P(Y ' + (above ? '> ' + (k - 0.5) : '< ' + (k + 0.5)) + ') = ' + s3(pr)) + ' (continuity correction)' }
      ] };
    } },
    { d: [2, 3], f: function () { // z-test for mean
      var mu = ri(40, 120), sd = ri(4, 15), n = pick([16, 20, 25, 30, 36, 40]), lev = pick([5, 1, 10]), tail = pick(['up', 'down']);
      var z = { 5: 1.6449, 1: 2.3263, 10: 1.2816 }[lev], se = sd / Math.sqrt(n), xb = Math.round((mu + (tail === 'up' ? 1 : -1) * se * (z + pick([-0.6, 0.5, 0.9]))) * 10) / 10;
      var pv = tail === 'up' ? 1 - IB.ncdf(xb, mu, se) : IB.ncdf(xb, mu, se), rej = pv < lev / 100;
      return { stem: 'The lengths of bolts are normally distributed with mean ' + mu + ' mm and standard deviation ' + sd + ' mm. After a machine is adjusted, a random sample of ' + n + ' bolts has mean length ' + xb + ' mm.', parts: [
        { q: 'Test, at the ' + lev + '% level of significance, whether the mean length has ' + (tail === 'up' ? 'increased' : 'decreased') + '. Assume the standard deviation is unchanged.', m: 5,
          a: M('H_0: \\mu = ' + mu + ',\\ H_1: \\mu ' + (tail === 'up' ? '>' : '<') + ' ' + mu) + '. ' + M('\\bar{X} \\sim \\mathrm{N}\\left(' + mu + ',\\ \\frac{' + sd * sd + '}{' + n + '}\\right)') + ', ' + M('P(\\bar{X} ' + (tail === 'up' ? '\\ge' : '\\le') + ' ' + xb + ') = ' + f4(pv)) + (rej ? ' < ' : ' > ') + lev / 100 + ', so ' + (rej ? 'reject ' + M('H_0') + ': there is evidence that the mean has ' + (tail === 'up' ? 'increased' : 'decreased') : 'do not reject ' + M('H_0') + ': insufficient evidence that the mean has ' + (tail === 'up' ? 'increased' : 'decreased')) + '.' },
        { q: 'Find the critical region for ' + M('\\bar{X}') + '.', m: 2, a: M('\\bar{X} ' + (tail === 'up' ? '> ' + s3(mu + z * se) : '< ' + s3(mu - z * se))) }
      ] };
    } }
  ]) });

  /* ================= MECHANICS ================= */
  BS.topic({ id: 'a2-moments', name: 'Moments', video: 'A level maths moments beam reactions', gens: [
    { d: [1, 2], f: function () { // uniform beam on two supports, extra load
      var L = ri(6, 10), C = ri(1, 2), Dp = L - ri(0, 1), m = ri(10, 40), w = ri(5, 30), pW = ri(1, L - 1);
      if (Dp - C < 2) Dp = L;
      while (pW === C || pW === Dp || Math.abs(pW - L / 2) < 1) pW = ri(1, L - 1);
      var Wb = m * G, Wl = w * G, RD = (Wb * (L / 2 - C) + Wl * (pW - C)) / (Dp - C), RC = Wb + Wl - RD;
      var sups = [[C, 'C'], [Dp, 'D']], loads = [[L / 2, m + 'g'], [pW, w + 'g']];
      if (pW === L / 2) loads = [[L / 2, (m + w) + 'g']];
      return { stem: 'A uniform beam ' + M('AB') + ' of length ' + L + ' m and mass ' + m + ' kg rests horizontally on supports at ' + M('C') + ' and ' + M('D') + ', where ' + M('AC = ' + C + '\\text{ m}') + ' and ' + M('AD = ' + Dp + '\\text{ m}') + '. A particle of mass ' + w + ' kg is placed on the beam ' + pW + ' m from ' + M('A') + '.' + beam(L, sups, loads), parts: [
        { q: 'Find the reaction at ' + M('D') + '.', m: 3, a: 'Moments about ' + M('C') + ': ' + M('R_D = ' + s3(RD)) + ' N' },
        { q: 'Find the reaction at ' + M('C') + '.', m: 2, a: M('R_C = ' + s3(RC)) + ' N' }
      ] };
    } },
    { d: [2, 3], f: function () { // about to tilt
      var L, C, Dp, m, w, x;
      do { L = ri(6, 12); C = ri(1, 2); Dp = L - ri(1, 3); m = ri(15, 50); w = ri(50, 95); x = Dp + m * (Dp - L / 2) / w; } while (x > L - 0.3 || Dp - L / 2 < 0.5);
      return { stem: 'A uniform plank ' + M('AB') + ' of length ' + L + ' m and mass ' + m + ' kg rests on supports at ' + M('C') + ' and ' + M('D') + ', where ' + M('AC = ' + C + '\\text{ m}') + ' and ' + M('DB = ' + (L - Dp) + '\\text{ m}') + '. A person of mass ' + w + ' kg walks along the plank from ' + M('D') + ' towards ' + M('B') + '.' + beam(L, [[C, 'C'], [Dp, 'D']], [[L / 2, m + 'g']]), parts: [
        { q: 'Explain what happens to the reaction at ' + M('C') + ' when the plank is about to tilt.', m: 1, a: 'It becomes zero.' },
        { q: 'Find the distance from ' + M('A') + ' of the person when the plank is about to tilt about ' + M('D') + '.', m: 4, a: M(m + 'g(' + num(Dp - L / 2) + ') = ' + w + 'g(x - ' + Dp + ')') + ' ⇒ ' + M('x = ' + s3(x)) + ' m' },
        { q: 'State one modelling assumption you have made about the person.', m: 1, a: 'The person is modelled as a particle.' }
      ] };
    } },
    { d: [3], f: function () { // non-uniform rod: find centre of mass
      var L = ri(4, 8), m = ri(10, 30), C = 0.5, Dp = L - 0.5, k = ri(2, 4) / 10 + 0.3;
      var xG = Math.round(L * (0.3 + Math.random() * 0.4) * 10) / 10;
      var RD = m * G * (xG - C) / (Dp - C), RC = m * G - RD, ratio = RC / RD;
      return q1('A non-uniform rod ' + M('AB') + ' of length ' + L + ' m and mass ' + m + ' kg rests horizontally on supports at ' + M('C') + ' and ' + M('D') + ', where ' + M('AC = DB = 0.5\\text{ m}') + '. The reaction at ' + M('D') + ' is ' + s3(RD) + ' N.<br>Find the distance of the centre of mass of the rod from ' + M('A') + '.', 4,
        'Moments about ' + M('C') + ': ' + M(s3(RD) + ' \\times ' + num(Dp - C) + ' = ' + m + 'g(x - 0.5)') + ' ⇒ ' + M('x = ' + s3(xG)) + ' m');
    } }
  ] });

  BS.topic({ id: 'a2-friction', name: 'Forces and friction, including inclined planes', video: 'A level maths friction inclined plane', gens: [
    { d: [1, 2], f: function () { // rough horizontal, pulled at angle
      var m = ri(4, 10), th = pick([20, 25, 30, 35, 40]), mu = ri(1, 5) / 10, P = ri(Math.ceil(m * 3), Math.floor(m * 6));
      var R = m * G - P * Math.sin(rad(th)), F = mu * R, a = (P * Math.cos(rad(th)) - F) / m;
      if (a <= 0) { P = Math.ceil((mu * m * G) / (Math.cos(rad(th)) + mu * Math.sin(rad(th)))) + ri(5, 15); R = m * G - P * Math.sin(rad(th)); F = mu * R; a = (P * Math.cos(rad(th)) - F) / m; }
      return { stem: 'A box of mass ' + m + ' kg is pulled along rough horizontal ground by a rope inclined at ' + th + '° above the horizontal. The tension in the rope is ' + P + ' N and the coefficient of friction is ' + mu + '.', parts: [
        { q: 'Find the normal reaction.', m: 2, a: M('R = ' + m + 'g - ' + P + '\\sin ' + th + '^\\circ = ' + s3(R)) + ' N' },
        { q: 'Find the acceleration of the box.', m: 3, a: M(P + '\\cos ' + th + '^\\circ - ' + mu + 'R = ' + m + 'a \\Rightarrow a = ' + s3(a)) + ' m s⁻²' }
      ] };
    } },
    { d: [2], f: function () { // sliding down rough slope
      var m = ri(2, 12), th = pick([20, 25, 30, 35, 40]), mu = ri(1, 4) / 10;
      if (mu >= Math.tan(rad(th))) mu = Math.round(Math.tan(rad(th)) * 5) / 10;
      var R = m * G * Math.cos(rad(th)), a = G * Math.sin(rad(th)) - mu * G * Math.cos(rad(th)), d = ri(3, 10), v = Math.sqrt(2 * a * d);
      return { stem: 'A particle of mass ' + m + ' kg is released from rest on a rough plane inclined at ' + th + '° to the horizontal. The coefficient of friction is ' + mu + '.' + incline(th, m + ' kg'), parts: [
        { q: 'Find the normal reaction.', m: 1, a: M(m + 'g\\cos ' + th + '^\\circ = ' + s3(R)) + ' N' },
        { q: 'Find the acceleration of the particle down the plane.', m: 3, a: M(m + 'g\\sin ' + th + '^\\circ - ' + mu + 'R = ' + m + 'a \\Rightarrow a = ' + s3(a)) + ' m s⁻²' },
        { q: 'Find its speed after it has travelled ' + d + ' m.', m: 2, a: s3(v) + ' m s⁻¹' }
      ] };
    } },
    { d: [2, 3], f: function () { // limiting equilibrium, find mu; tan alpha = 3/4
      var m = ri(2, 10), P = ri(10, 50);
      // pulled up slope by P parallel; on point of slipping down: P + F = mg sin a; sin=0.6, cos=0.8
      var need = m * G * 0.6; P = Math.round(need * (0.3 + Math.random() * 0.4));
      var mu = (need - P) / (m * G * 0.8);
      return { stem: 'A particle of mass ' + m + ' kg rests on a rough plane inclined at ' + M('\\alpha') + ' to the horizontal, where ' + M('\\tan\\alpha = \\tfrac{3}{4}') + '. It is held in limiting equilibrium, on the point of sliding down the plane, by a force of ' + P + ' N acting up the line of greatest slope.' + incline(36.87, m + ' kg', P + ' N').replace('36.87°', 'α'), parts: [
        { q: 'Find the normal reaction.', m: 2, a: M(m + 'g \\times \\tfrac{4}{5} = ' + s3(m * G * 0.8)) + ' N' },
        { q: 'Find the coefficient of friction.', m: 4, a: M(P + ' + \\mu R = ' + m + 'g \\times \\tfrac{3}{5} \\Rightarrow \\mu = ' + s3(mu)) }
      ] };
    } },
    { d: [3], f: function () { // projected up slope, comes to rest and whether it slides back
      var u = ri(4, 12), th = pick([20, 25, 30]), mu = pick([0.2, 0.3, 0.5, 0.7, 0.8]);
      var dec = G * (Math.sin(rad(th)) + mu * Math.cos(rad(th))), d = u * u / (2 * dec), slides = mu < Math.tan(rad(th));
      return { stem: 'A particle is projected up a rough plane inclined at ' + th + '° to the horizontal with speed ' + u + ' m s⁻¹. The coefficient of friction is ' + mu + '.' + incline(th, ''), parts: [
        { q: 'Find the deceleration of the particle as it moves up the plane.', m: 3, a: M('g\\sin ' + th + '^\\circ + ' + mu + 'g\\cos ' + th + '^\\circ = ' + s3(dec)) + ' m s⁻²' },
        { q: 'Find the distance it travels before coming to rest.', m: 2, a: s3(d) + ' m' },
        { q: 'Determine whether the particle will remain at rest.', m: 2, a: (slides ? M('\\mu = ' + mu + ' < \\tan ' + th + '^\\circ = ' + s3(Math.tan(rad(th)))) + ', so it slides back down.' : M('\\mu = ' + mu + ' \\ge \\tan ' + th + '^\\circ = ' + s3(Math.tan(rad(th)))) + ', so it remains at rest.') }
      ] };
    } }
  ] });

  BS.topic({ id: 'a2-projectiles', name: 'Projectiles', video: 'A level maths projectiles', gens: [
    { d: [1, 2], f: function () { // from ground, tan a = 3/4 or 4/3
      var u = 5 * ri(3, 8), t = pick([[3, 4, 5], [4, 3, 5]]), s = t[0] / t[2], c = t[1] / t[2];
      var T = 2 * u * s / G, Rg = u * c * T, Hm = Math.pow(u * s, 2) / (2 * G);
      var pl = D.plane({ xmin: -Rg * 0.05, xmax: Rg * 1.1, ymin: -Hm * 0.1, ymax: Hm * 1.4, w: 320, h: 200 });
      var sv = pl.svg + pl.curve(function (x) { var tt = x / (u * c); return u * s * tt - 4.9 * tt * tt; }, 0, Rg) + D.arrow(pl.X(0), pl.Y(0), pl.X(0) + 40 * c, pl.Y(0) - 40 * s, 'accent') + D.text(pl.X(0) + 44 * c, pl.Y(0) - 44 * s, u + ' m s⁻¹', { size: 11 });
      return { stem: 'A ball is projected from a point ' + M('O') + ' on horizontal ground with speed ' + u + ' m s⁻¹ at an angle ' + M('\\alpha') + ' above the horizontal, where ' + M('\\tan\\alpha = ' + frac(t[0], t[1])) + '.' + D.svg(320, 200, sv, 'Trajectory of a projectile'), parts: [
        { q: 'Find the time of flight.', m: 3, a: M('0 = ' + num(u * s) + 't - 4.9t^2 \\Rightarrow t = ' + s3(T)) + ' s' },
        { q: 'Find the horizontal range.', m: 2, a: s3(Rg) + ' m' },
        { q: 'Find the greatest height reached.', m: 2, a: s3(Hm) + ' m' }
      ] };
    } },
    { d: [2, 3], f: function () { // from a cliff, horizontal
      var h = ri(20, 80), u = ri(5, 20), T = Math.sqrt(2 * h / G), X = u * T, vy = G * T, sp = Math.hypot(u, vy), ang = deg(Math.atan(vy / u));
      var pl = D.plane({ xmin: -X * 0.25, xmax: X * 1.15, ymin: -h * 0.08, ymax: h * 1.25, w: 320, h: 220 });
      var sv = pl.svg + '<rect x="' + pl.X(-X * 0.25).toFixed(1) + '" y="' + pl.Y(h).toFixed(1) + '" width="' + (pl.X(0) - pl.X(-X * 0.25)).toFixed(1) + '" height="' + (pl.Y(0) - pl.Y(h)).toFixed(1) + '" class="shade"/>' + pl.curve(function (x) { var tt = x / u; return h - 4.9 * tt * tt; }, 0, X) + D.text(pl.X(-X * 0.12), pl.Y(h / 2), h + ' m', { anchor: 'middle', size: 11 });
      return { stem: 'A stone is thrown horizontally with speed ' + u + ' m s⁻¹ from the top of a vertical cliff ' + h + ' m above the sea.' + D.svg(320, 220, sv, 'Stone thrown from a cliff'), parts: [
        { q: 'Find the time taken for the stone to reach the sea.', m: 2, a: s3(T) + ' s' },
        { q: 'Find the horizontal distance from the foot of the cliff to where the stone lands.', m: 1, a: s3(X) + ' m' },
        { q: 'Find the speed and direction of the stone as it hits the sea.', m: 4, a: s3(sp) + ' m s⁻¹ at ' + dp(ang, 1) + '° below the horizontal' }
      ] };
    } },
    { d: [3], f: function () { // clearing a wall
      var u = ri(15, 25), a = pick([30, 35, 40, 45]), d = ri(10, 25), hw = ri(2, 6);
      var tt = d / (u * Math.cos(rad(a))), y = u * Math.sin(rad(a)) * tt - 4.9 * tt * tt;
      return q1('A ball is kicked from ground level with speed ' + u + ' m s⁻¹ at ' + a + '° above the horizontal towards a wall of height ' + hw + ' m standing ' + d + ' m away. Determine whether the ball clears the wall, showing your working.', 5,
        M('t = \\frac{' + d + '}{' + u + '\\cos ' + a + '^\\circ} = ' + s3(tt)) + ' s, ' + M('y = ' + s3(y)) + ' m, so the ball ' + (y > hw ? 'clears' : 'does not clear') + ' the wall' + (y > hw ? ' by ' + s3(y - hw) + ' m.' : '.'));
    } },
    { d: [3], f: function () { // derive trajectory equation
      return q1('A particle is projected from the origin with speed ' + M('U') + ' at an angle ' + M('\\theta') + ' above the horizontal. Show that its trajectory has equation ' + M('y = x\\tan\\theta - \\frac{gx^2}{2U^2}(1 + \\tan^2\\theta)') + '.', 5,
        M('x = Ut\\cos\\theta \\Rightarrow t = \\frac{x}{U\\cos\\theta}') + '; ' + M('y = Ut\\sin\\theta - \\tfrac{1}{2}gt^2 = x\\tan\\theta - \\frac{gx^2}{2U^2\\cos^2\\theta}') + ' and ' + M('\\sec^2\\theta = 1 + \\tan^2\\theta') + '.');
    } }
  ] });

  BS.topic({ id: 'a2-statics', name: 'Statics: equilibrium and ladders', video: 'A level maths statics ladder friction', gens: [
    { d: [2, 3], f: function () { // ladder
      var m = ri(10, 30), L = ri(4, 8), th = pick([50, 55, 60, 65, 70]);
      // smooth wall, rough ground. Moments about A: S L sin th = m g (L/2) cos th -> S = m g / (2 tan th); F = S; R = m g; mu >= S/R
      var S = m * G / (2 * Math.tan(rad(th))), mu = S / (m * G);
      return { stem: 'A uniform ladder ' + M('AB') + ', of mass ' + m + ' kg and length ' + L + ' m, rests with ' + M('A') + ' on rough horizontal ground and ' + M('B') + ' against a smooth vertical wall. The ladder makes an angle of ' + th + '° with the ground and is about to slip.' + ladder(th), parts: [
        { q: 'Find the normal reaction at the wall.', m: 3, a: 'Moments about ' + M('A') + ': ' + M('S \\times ' + L + '\\sin ' + th + '^\\circ = ' + m + 'g \\times ' + num(L / 2) + '\\cos ' + th + '^\\circ \\Rightarrow S = ' + s3(S)) + ' N' },
        { q: 'Find the coefficient of friction between the ladder and the ground.', m: 3, a: M('R = ' + m + 'g,\\ F = S,\\ \\mu = \\frac{F}{R} = ' + s3(mu)) },
        { q: 'State how you have used the modelling assumption that the ladder is uniform.', m: 1, a: 'The weight acts at the midpoint of the ladder.' }
      ] };
    } },
    { d: [1, 2], f: function () { // particle on rope, three forces
      var W = ri(20, 80), a = pick([30, 40, 45, 50, 60]), b = pick([30, 40, 45, 50, 60]);
      // strings at a and b to horizontal: T1 cos a = T2 cos b; T1 sin a + T2 sin b = W
      var T1 = W * Math.cos(rad(b)) / Math.sin(rad(a + b)), T2 = W * Math.cos(rad(a)) / Math.sin(rad(a + b));
      var sv = D.arrowDefs + D.line(30, 30, 290, 30, 'ln'); var px = 160, py = 120, l1 = 90 / Math.sin(rad(a)), x1 = px - 90 / Math.tan(rad(a)), x2 = px + 90 / Math.tan(rad(b));
      sv += D.line(x1, 30, px, py) + D.line(x2, 30, px, py) + D.dot(px, py) + D.arrow(px, py, px, py + 45, 'accent') + D.text(px + 6, py + 50, W + ' N', { size: 11 });
      sv += D.text(x1 + 22, 46, a + '°', { size: 11 }) + D.text(x2 - 22, 46, b + '°', { anchor: 'end', size: 11 });
      return { stem: 'A particle of weight ' + W + ' N hangs in equilibrium from two light strings attached to a horizontal ceiling. The strings make angles of ' + a + '° and ' + b + '° with the ceiling.' + D.svg(320, 190, sv, 'Particle suspended by two strings'), parts: [
        { q: 'Find the tension in each string.', m: 5, a: M('T_1 = ' + s3(T1) + '\\text{ N},\\ T_2 = ' + s3(T2) + '\\text{ N}') + ' (resolving horizontally and vertically)' }
      ] };
    } },
    { d: [2, 3], f: function () { // forces in vector form, find unknown force for equilibrium
      var F1 = [nz(-8, 8), nz(-8, 8)], F2 = [nz(-8, 8), nz(-8, 8)], F3 = [-(F1[0] + F2[0]), -(F1[1] + F2[1])];
      if (!F3[0] && !F3[1]) F3 = [1, 1];
      return { stem: 'A particle is in equilibrium under the action of the forces ' + M('(' + vt(F1) + ')') + ' N, ' + M('(' + vt(F2) + ')') + ' N and ' + M('\\mathbf{F}') + ' N.', parts: [
        { q: 'Find ' + M('\\mathbf{F}') + '.', m: 2, a: M(vt([-(F1[0] + F2[0]), -(F1[1] + F2[1])])) },
        { q: 'Find the magnitude of ' + M('\\mathbf{F}') + ' and the angle it makes with ' + M('\\mathbf{i}') + '.', m: 3, a: s3(Math.hypot(F1[0] + F2[0], F1[1] + F2[1])) + ' N at ' + dp(((deg(Math.atan2(-(F1[1] + F2[1]), -(F1[0] + F2[0]))) + 360) % 360), 1) + '° anticlockwise from ' + M('\\mathbf{i}') }
      ] };
    } }
  ] });

  BS.topic({ id: 'a2-kinematics', name: 'Further kinematics: vectors and calculus', video: 'A level maths kinematics vectors calculus', gens: [
    { d: [2], f: function () { // constant acceleration vectors
      var u = [nz(-6, 6), nz(-6, 6)], a = [nz(-3, 3), nz(-3, 3)], t = ri(2, 6), v = [u[0] + a[0] * t, u[1] + a[1] * t], r = [u[0] * t + a[0] * t * t / 2, u[1] * t + a[1] * t * t / 2];
      return { stem: 'A particle starts at the origin with velocity ' + M('(' + vt(u) + ')') + ' m s⁻¹ and moves with constant acceleration ' + M('(' + vt(a) + ')') + ' m s⁻².', parts: [
        { q: 'Find the velocity of the particle when ' + M('t = ' + t) + '.', m: 2, a: M('(' + vt(v) + ')') + ' m s⁻¹' },
        { q: 'Find its speed at this time.', m: 1, a: s3(Math.hypot(v[0], v[1])) + ' m s⁻¹' },
        { q: 'Find its position vector when ' + M('t = ' + t) + '.', m: 2, a: M('(' + vt(r) + ')') + ' m' }
      ] };
    } },
    { d: [2, 3], f: function () { // r(t) with calculus
      var a = ri(1, 4), b = nz(-8, 8), c = ri(1, 5), d = ri(2, 6), T = ri(1, 4);
      // r = (a t^3 + b t) i + (c t^2 - d t) j ; v = (3a t^2 + b) i + (2c t - d) j ; a = 6a t i + 2c j
      var tj = frac(d, 2 * c);
      return { stem: 'A particle ' + M('P') + ' moves in a plane so that its position vector at time ' + M('t') + ' seconds is ' + M('\\mathbf{r} = (' + poly([a, 0, b, 0], 't') + ')\\mathbf{i} + (' + poly([c, -d, 0], 't') + ')\\mathbf{j}') + ' m.', parts: [
        { q: 'Find the velocity of ' + M('P') + ' at time ' + M('t') + '.', m: 2, a: M('\\mathbf{v} = (' + poly([3 * a, 0, b], 't') + ')\\mathbf{i} + (' + poly([2 * c, -d], 't') + ')\\mathbf{j}') },
        { q: 'Find the time at which ' + M('P') + ' is moving parallel to ' + M('\\mathbf{i}') + '.', m: 2, a: M('' + c1(2 * c, 't') + ' - ' + d + ' = 0 \\Rightarrow t = ' + tj) + (3 * a * (d / (2 * c)) * (d / (2 * c)) + b === 0 ? ' (but then ' + M('\\mathbf{v} = \\mathbf{0}') + ')' : '') },
        { q: 'Find the acceleration of ' + M('P') + ' when ' + M('t = ' + T) + '.', m: 2, a: M('(' + vt([6 * a * T, 2 * c]) + ')') + ' m s⁻²' }
      ] };
    } },
    { d: [3], f: function () { // velocity given, integrate with initial position, when due north-east
      var p = nz(-4, 4), q = ri(1, 3), r0 = [ri(-5, 5), ri(-5, 5)];
      // v = (2q t + p) i + (3) j? keep: v = (2t + p) i + (q t^2) j? choose v = (6t - p)i + (2q)j
      var A = ri(2, 6);
      return { stem: 'A particle has velocity ' + M('\\mathbf{v} = (' + poly([A, p], 't') + ')\\mathbf{i} + ' + 2 * q + '\\mathbf{j}') + ' m s⁻¹ at time ' + M('t') + ' seconds. When ' + M('t = 0') + ' its position vector is ' + M('(' + vt(r0) + ')') + ' m.', parts: [
        { q: 'Find the position vector of the particle at time ' + M('t') + '.', m: 3, a: M('\\mathbf{r} = (' + (A % 2 ? '\\tfrac{' + A + '}{2}' : c1(A / 2, '')) + 't^2' + tc(p, 't') + (r0[0] ? sg(r0[0]) : '') + ')\\mathbf{i} + (' + c1(2 * q, 't') + (r0[1] ? sg(r0[1]) : '') + ')\\mathbf{j}') },
        { q: 'Find the value of ' + M('t') + ' when the particle is moving in the direction of ' + M('\\mathbf{i} + \\mathbf{j}') + '.', m: 3, a: M(poly([A, p], 't') + ' = ' + 2 * q + ' \\Rightarrow t = ' + frac(2 * q - p, A)) + ((2 * q - p) / A < 0 ? ' (negative, so this never happens for ' + M('t \\ge 0') + ')' : '') }
      ] };
    } }
  ] });
})(typeof window !== 'undefined' ? window : globalThis);
