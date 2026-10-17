/* Byte Size — Last-question problems: long, multi-step questions in the style of the final questions on an
   International GCSE Higher paper. All content stays inside the Pearson Edexcel 4MA1 specification.
   Every question is original; numbers change each time. */
(function (g) {
  var BS = g.BS, D = BS.draw, G = BS.gcse2;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, sf = BS.sf, dp = BS.dp, num = BS.num, M = BS.m, rad = BS.deg, money = BS.money;
  var surd = G.surd, vex = G.vex;
  function dg(x) { return x * 180 / Math.PI; }
  function q1(q, m, a, stem) { return { stem: stem, parts: [{ q: q, m: m, a: a }] }; }
  function ratio(a, b) { var k = gcd(a, b); return (a / k) + ' : ' + (b / k); }
  function isSq(n) { var r = Math.round(Math.sqrt(n)); return r * r === n; }
  function brg(b) { b = ((Math.round(b) % 360) + 360) % 360; return String(b).padStart(3, '0') + '°'; }
  function sq(x) { return x * x; }
  var GENS = [];
  function add(f) { GENS.push({ d: [1, 2, 3], f: f }); }

  /* 1. Vectors: where two lines cross */
  add(function () {
    var m, n, r, s; do { m = ri(1, 3); n = ri(1, 3); r = ri(1, 3); s = ri(1, 3); } while (gcd(m, n) > 1 || gcd(r, s) > 1 || (m === n && r === s));
    var den = n * r + m * (r + s), lam = (m + n) * r, mu = m * (r + s);
    var A = [5, 0.6], B = [1.3, 4.1], P = [(n * A[0] + m * B[0]) / (m + n), (n * A[1] + m * B[1]) / (m + n)], Mm = [B[0] * r / (r + s), B[1] * r / (r + s)];
    var X = [P[0] * lam / den, P[1] * lam / den];
    var fig = D.geo({ pts: { O: [0, 0], A: A, B: B, P: P, M: Mm, X: X }, segs: [['O', 'A'], ['O', 'B'], ['A', 'B'], ['O', 'P', 'dash'], ['A', 'M', 'dash']], vecs: [['O', 'A'], ['O', 'B']], dots: ['P', 'M', 'X'],
      slabels: [{ p: 'O', q: 'A', t: 'a' }, { p: 'O', q: 'B', t: 'b' }], lab: { X: [0, -14] }, w: 320, h: 280, label: 'Two lines crossing inside a triangle' });
    return { stem: M('OAB') + ' is a triangle. ' + M('\\overrightarrow{OA} = \\mathbf{a}') + ' and ' + M('\\overrightarrow{OB} = \\mathbf{b}') + '. ' + M('P') + ' is the point on ' + M('AB') + ' such that ' + M('AP : PB = ' + m + ' : ' + n) + '. ' + M('M') + ' is the point on ' + M('OB') + ' such that ' + M('OM : MB = ' + r + ' : ' + s) + '. The lines ' + M('OP') + ' and ' + M('AM') + ' meet at ' + M('X') + '.' + fig, parts: [
      { q: 'Find ' + M('\\overrightarrow{OP}') + ' in terms of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '. Simplify your answer.', m: 2, a: M('\\overrightarrow{OP} = ' + vex([[n, m + n, 'a'], [m, m + n, 'b']])) },
      { q: 'Find ' + M('\\overrightarrow{AM}') + ' in terms of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '.', m: 1, a: M('\\overrightarrow{AM} = ' + vex([[-1, 1, 'a'], [r, r + s, 'b']])) },
      { q: 'Find the ratio ' + M('OX : XP') + '. You must show all your working.', m: 4, a: M('\\overrightarrow{OX} = \\lambda\\overrightarrow{OP} = \\mathbf{a} + \\mu\\overrightarrow{AM}') + '. Comparing coefficients gives ' + M('\\lambda = ' + frac(lam, den)) + ' and ' + M('\\mu = ' + frac(mu, den)) + ', so ' + M('OX : XP = ' + ratio(lam, den - lam)) + '.' }
    ] };
  });

  /* 2. Line and circle with surd answers */
  add(function () {
    var R, c, Dd; do { R = ri(3, 8); c = nz(-6, 6); Dd = 2 * R * R - c * c; } while (Dd <= 0 || isSq(Dd));
    var sgn = pick([1, -1]); // line y = sgn*x + c
    var p = D.plane({ xmin: -R - 2, xmax: R + 2, ymin: -R - 2, ymax: R + 2, w: 300, h: 300 });
    var s = p.svg + '<circle cx="' + p.X(0) + '" cy="' + p.Y(0) + '" r="' + (p.X(R) - p.X(0)) + '" class="thin"/>' + p.curve(function (x) { return sgn * x + c; }, -R - 2, R + 2);
    var b2 = sgn * c; // x^2 + (sgn x + c)^2 = R^2 -> 2x^2 + 2 sgn c x + c^2 - R^2 = 0
    var xs = '\\frac{' + (-b2) + ' \\pm ' + surd(Dd) + '}{2}', qq = [2, 2 * b2, c * c - R * R], hq = gcd(gcd(qq[0], qq[1]), qq[2]); qq = qq.map(function (v) { return v / hq; });
    [-1, 1].forEach(function (e, i) { var X0 = (-b2 + e * Math.sqrt(Dd)) / 2, Y0 = sgn * X0 + c; s += D.dot(p.X(X0), p.Y(Y0), 3) + D.text(p.X(X0) + 12, p.Y(Y0) - 10, i ? 'B' : 'A', { cls: 'it' }); });
    var L2 = 2 * Dd;
    return { stem: 'The line ' + M('L') + ' has equation ' + M('y = ' + (sgn < 0 ? '-' : '') + 'x' + sg(c)) + '. The circle ' + M('C') + ' has equation ' + M('x^2 + y^2 = ' + R * R) + '. ' + M('L') + ' meets ' + M('C') + ' at the points ' + M('A') + ' and ' + M('B') + '.' + D.svg(300, 300, s, 'Line meeting a circle', true), parts: [
      { q: 'Show that the ' + M('x') + '-coordinates of ' + M('A') + ' and ' + M('B') + ' satisfy ' + M(poly(qq) + ' = 0') + '.', m: 2, a: M('x^2 + (' + (sgn < 0 ? '-' : '') + 'x' + sg(c) + ')^2 = ' + R * R) + ', expand and rearrange.' },
      { q: 'Find the exact ' + M('x') + '-coordinates of ' + M('A') + ' and ' + M('B') + '. Give your answers in the form ' + M('\\frac{p \\pm \\sqrt{q}}{r}') + ' or simpler.', m: 3, a: M('x = \\frac{' + (-2 * b2) + ' \\pm \\sqrt{' + (4 * b2 * b2 - 8 * (c * c - R * R)) + '}}{4} = ' + xs) + ' (from ' + M(poly([2, 2 * b2, c * c - R * R]) + ' = 0') + ')' },
      { q: 'Show that the length of ' + M('AB') + ' can be written as ' + M(surd(L2)) + '.', m: 3, a: 'The difference between the ' + M('x') + '-coordinates is ' + M(surd(Dd)) + ', and so is the difference between the ' + M('y') + '-coordinates (gradient ±1). ' + M('AB = \\sqrt{2 \\times ' + Dd + '} = ' + surd(L2)) }
    ] };
  });

  /* 3. Probability leading to a quadratic */
  add(function () {
    var k, n, A, B, C, p, q, rr; do {
      k = ri(3, 8); n = ri(4, 14); var nu = n * (n - 1), de = (n + k) * (n + k - 1), gg = gcd(nu, de); p = nu / gg; q = de / gg;
      A = q - p; B = q + p * (2 * k - 1); C = p * k * (k - 1); var h = gcd(gcd(A, B), C); A /= h; B /= h; C /= h;
      rr = (B * B + 4 * A * C);
    } while (!isSq(rr) || A <= 0 || A > 10);
    return { stem: 'There are ' + M('n') + ' red counters and ' + k + ' blue counters in a bag. Ana takes a counter at random and does not replace it. She then takes a second counter at random. The probability that both counters are red is ' + M(frac(p, q)) + '.', parts: [
      { q: 'Show that ' + M(poly([A, -B, -C], 'n') + ' = 0') + '.', m: 4, a: M('\\frac{n}{n + ' + k + '} \\times \\frac{n - 1}{n + ' + (k - 1) + '} = ' + frac(p, q)) + '; cross-multiply, expand and rearrange.' },
      { q: 'Find the value of ' + M('n') + '.', m: 2, a: M('n = ' + n) + ' (the other solution is negative)' },
      { q: 'Ana now puts both counters back and takes three counters at random without replacement. Work out the probability that she takes at least one blue counter.', m: 3, a: M('1 - \\frac{' + n + ' \\times ' + (n - 1) + ' \\times ' + (n - 2) + '}{' + (n + k) + ' \\times ' + (n + k - 1) + ' \\times ' + (n + k - 2) + '} = ' + frac((n + k) * (n + k - 1) * (n + k - 2) - n * (n - 1) * (n - 2), (n + k) * (n + k - 1) * (n + k - 2))) }
    ] };
  });

  /* 4. Similar containers, density and cost */
  add(function () {
    var k = pick([[3, 2], [5, 3], [4, 3], [2, 1], [5, 2], [5, 4]]), A1 = ri(4, 20) * k[1] * k[1] * 5, A2 = A1 * k[0] * k[0] / (k[1] * k[1]);
    var V2 = ri(2, 9) * k[0] * k[0] * k[0] * 10, V1 = V2 * k[1] * k[1] * k[1] / (k[0] * k[0] * k[0]);
    var dens = pick([0.92, 0.88, 1.03, 1.2, 0.8]), price = pick([3.6, 4.2, 5.5, 6.8, 2.75]);
    var mass = V2 * dens / 1000, cost = mass * price;
    return { stem: 'Two oil cans, ' + M('P') + ' and ' + M('Q') + ', are mathematically similar. The surface area of ' + M('P') + ' is ' + num(A1) + ' cm². The surface area of ' + M('Q') + ' is ' + num(A2) + ' cm². The volume of ' + M('Q') + ' is ' + num(V2) + ' cm³.', parts: [
      { q: 'Work out the volume of ' + M('P') + '.', m: 3, a: 'Area factor ' + M(frac(A2, A1)) + ', length factor ' + M(frac(k[0], k[1])) + ', volume factor ' + M(frac(k[0] * k[0] * k[0], k[1] * k[1] * k[1])) + ': ' + M('V_P = ' + num(V1)) + ' cm³' },
      { q: M('Q') + ' is full of oil with density ' + dens + ' g/cm³. The oil costs ' + money(price, true) + ' per kilogram. Work out the cost of the oil in ' + M('Q') + '.', m: 3, a: 'Mass ' + M('= ' + num(V2) + ' \\times ' + dens + ' = ' + num(Math.round(V2 * dens * 100) / 100)) + ' g ' + M('= ' + num(Math.round(mass * 100000) / 100000)) + ' kg; cost ' + M('= ' + money(Math.round(cost * 100) / 100, true)) }
    ] };
  });

  /* 5. Frustum: capacity and filling time */
  add(function () {
    var r, R, h, H; do { r = ri(5, 12); R = r + ri(3, 9); h = ri(10, 30); H = h * R / (R - r); } while (H !== Math.round(H) || (R * R * H - r * r * (H - h)) % 3 !== 0);
    var Vbig = R * R * H / 3, Vsmall = r * r * (H - h) / 3, V = Vbig - Vsmall, rate = pick([0.5, 0.8, 1.2, 1.5, 2]);
    var Vcm = V * Math.PI, secs = Vcm / (rate * 1000) * 60, mins = Math.floor(secs / 60), s2 = Math.round(secs - mins * 60);
    if (s2 === 60) { mins++; s2 = 0; }
    var fig = (function () {
      var W = 300, Hh = 230, cx = 150, top = 30, bot = 200, sc = 110 / R;
      var s = '<ellipse cx="' + cx + '" cy="' + top + '" rx="' + (R * sc) + '" ry="12" class="shape"/>' + D.line(cx - R * sc, top, cx - r * sc, bot) + D.line(cx + R * sc, top, cx + r * sc, bot) +
        '<path d="M' + (cx - r * sc) + ',' + bot + ' A' + (r * sc) + ',8 0 0 0 ' + (cx + r * sc) + ',' + bot + '" class="ln" fill="none"/>' + '<path d="M' + (cx - r * sc) + ',' + bot + ' A' + (r * sc) + ',8 0 0 1 ' + (cx + r * sc) + ',' + bot + '" class="dash" fill="none"/>';
      s += D.line(cx, top, cx + R * sc, top, 'dash') + D.text(cx + R * sc / 2, top - 18, R + ' cm', { anchor: 'middle', size: 12 }) + D.line(cx, bot, cx + r * sc, bot, 'dash') + D.text(cx + r * sc / 2, bot + 20, r + ' cm', { anchor: 'middle', size: 12 }) +
        D.line(cx, top, cx, bot, 'dash') + D.text(cx - 6, (top + bot) / 2, h + ' cm', { anchor: 'end', size: 12 });
      return D.svg(W, Hh, s, 'Frustum-shaped bucket');
    })();
    return { stem: 'A bucket is in the shape of a frustum. It is made by removing a small cone from a large cone. The top of the bucket is a circle of radius ' + R + ' cm, the base is a circle of radius ' + r + ' cm, and the bucket is ' + h + ' cm deep.' + fig, parts: [
      { q: 'Show that the height of the large cone is ' + H + ' cm.', m: 2, a: 'By similar triangles, ' + M('\\frac{H}{' + R + '} = \\frac{H - ' + h + '}{' + r + '} \\Rightarrow H = ' + H) },
      { q: 'Work out the volume of the bucket. Give your answer as a multiple of ' + M('\\pi') + '.', m: 3, a: M('\\tfrac{1}{3}\\pi(' + R + ')^2(' + H + ') - \\tfrac{1}{3}\\pi(' + r + ')^2(' + (H - h) + ') = ' + num(V) + '\\pi') + ' cm³' },
      { q: 'Water flows into the empty bucket at ' + rate + ' litres per minute. How long does it take to fill the bucket? Give your answer in minutes and seconds, to the nearest second.', m: 2, a: M(num(V) + '\\pi = ' + num(Math.round(Vcm)) ) + ' cm³ ' + M('= ' + sf(Vcm / 1000, 4)) + ' litres; time ' + M('= ' + mins) + (mins === 1 ? ' minute ' : ' minutes ') + s2 + (s2 === 1 ? ' second' : ' seconds') }
    ] };
  });

  /* 6. Bounds: answer to an appropriate degree of accuracy */
  add(function () {
    var V, Rr, ub, lb, n; do {
      V = ri(150, 900) * 10; Rr = ri(80, 250) / 10;
      ub = (V + 5) / (Rr - 0.05); lb = (V - 5) / (Rr + 0.05);
      n = 0; for (var k = 4; k >= 1; k--) if (sf(ub, k) === sf(lb, k)) { n = k; break; }
    } while (n < 2);
    return { stem: 'A tank holds ' + num(V) + ' litres of water, correct to the nearest 10 litres. Water is pumped out at a rate of ' + Rr.toFixed(1) + ' litres per second, correct to 1 decimal place.', parts: [
      { q: 'Work out the upper bound for the time taken to empty the tank.', m: 3, a: M('\\frac{' + (V + 5) + '}{' + (Rr - 0.05).toFixed(2) + '} = ' + dp(ub, 3)) + ' seconds' },
      { q: 'By considering bounds, work out the time taken to empty the tank to a suitable degree of accuracy. You must show all your working and give a reason for your answer.', m: 3, a: 'Lower bound ' + M('\\frac{' + (V - 5) + '}{' + (Rr + 0.05).toFixed(2) + '} = ' + dp(lb, 3)) + '. Both bounds round to ' + M(sf(ub, n)) + ' seconds (' + n + ' s.f.), so the time is ' + sf(ub, n) + ' seconds.' }
    ] };
  });

  /* 7. Pyramid with a rectangular base: volume, then angle between a line and a plane */
  add(function () {
    var l = 2 * ri(3, 8), w = 2 * ri(2, 6), h = ri(6, 15), V = l * w * h / 3;
    while (V !== Math.round(V)) { h++; V = l * w * h / 3; }
    var AM = Math.hypot(l, w) / 2, VA = Math.hypot(AM, h), ang = dg(Math.atan(h / AM));
    var A = [50, 200], B = [210, 200], C = [270, 150], Dd = [110, 150], Mc = [160, 175], Vv = [160, 30];
    var s = D.line(A[0], A[1], B[0], B[1]) + D.line(B[0], B[1], C[0], C[1]) + D.line(C[0], C[1], Dd[0], Dd[1], 'dash') + D.line(Dd[0], Dd[1], A[0], A[1], 'dash') +
      D.line(Vv[0], Vv[1], A[0], A[1]) + D.line(Vv[0], Vv[1], B[0], B[1]) + D.line(Vv[0], Vv[1], C[0], C[1]) + D.line(Vv[0], Vv[1], Dd[0], Dd[1], 'dash') + D.line(Vv[0], Vv[1], Mc[0], Mc[1], 'accentdash') + D.dot(Mc[0], Mc[1], 2.5);
    [[A, 'A', -12, 8], [B, 'B', 10, 8], [C, 'C', 12, 0], [Dd, 'D', -12, -4], [Vv, 'V', 0, -12], [Mc, 'M', 12, 8]].forEach(function (q) { s += D.text(q[0][0] + q[2], q[0][1] + q[3], q[1], { anchor: 'middle', cls: 'it' }); });
    s += D.text(130, 216, l + ' cm', { anchor: 'middle', size: 12 }) + D.text(258, 182, w + ' cm', { anchor: 'middle', size: 12 });
    return { stem: M('VABCD') + ' is a pyramid with a rectangular base ' + M('ABCD') + '. ' + M('AB = ' + l) + ' cm and ' + M('BC = ' + w) + ' cm. The vertex ' + M('V') + ' is vertically above ' + M('M') + ', the centre of the base. The volume of the pyramid is ' + num(V) + ' cm³.<br>[Volume of a pyramid ' + M('= \\tfrac{1}{3} \\times') + ' area of base ' + M('\\times') + ' vertical height]' + D.svg(320, 240, s, 'Rectangular-based pyramid'), parts: [
      { q: 'Show that ' + M('VM = ' + h) + ' cm.', m: 2, a: M('\\tfrac{1}{3} \\times ' + l + ' \\times ' + w + ' \\times VM = ' + V + ' \\Rightarrow VM = ' + h) },
      { q: 'Work out the length of ' + M('VA') + '. Give your answer correct to 3 significant figures.', m: 3, a: M('AM = \\tfrac{1}{2}\\sqrt{' + l + '^2 + ' + w + '^2} = ' + sf(AM, 4)) + ', ' + M('VA = \\sqrt{' + sf(AM, 4) + '^2 + ' + h + '^2} = ' + sf(VA, 3)) + ' cm' },
      { q: 'Work out the size of the angle between ' + M('VA') + ' and the base ' + M('ABCD') + '. Give your answer correct to 1 decimal place.', m: 2, a: M('\\tan VAM = \\frac{' + h + '}{' + sf(AM, 4) + '} \\Rightarrow ' + dp(ang, 1) + '^\\circ') }
    ] };
  });

  /* 8. Sector: find radius and angle from arc length and area, then the segment */
  add(function () {
    var r = ri(5, 15), th = 5 * ri(12, 30), L = Math.PI * r * th / 180, A = 0.5 * r * L;
    var Lr = Math.round(L * 100) / 100, Ar = Math.round(A * 10) / 10, rr = 2 * Ar / Lr, thr = Lr / (Math.PI * rr) * 180, seg = Ar - 0.5 * rr * rr * Math.sin(rad(thr));
    return { stem: M('OAB') + ' is a sector of a circle with centre ' + M('O') + '. The length of the arc ' + M('AB') + ' is ' + Lr + ' cm. The area of the sector is ' + Ar + ' cm².' + D.sector(rad(th), 'r cm', 'θ'), parts: [
      { q: 'Show that the radius of the sector is ' + r + ' cm, correct to the nearest centimetre.', m: 3, a: M('\\frac{\\theta}{360} \\times 2\\pi r = ' + Lr) + ' and ' + M('\\frac{\\theta}{360} \\times \\pi r^2 = ' + Ar) + '. Dividing: ' + M('\\frac{r}{2} = \\frac{' + Ar + '}{' + Lr + '} \\Rightarrow r = ' + dp(rr, 2)) },
      { q: 'Work out the size of angle ' + M('AOB') + '. Give your answer correct to the nearest degree.', m: 2, a: M('\\theta = \\frac{' + Lr + ' \\times 360}{2\\pi \\times ' + dp(rr, 2) + '} = ' + Math.round(thr) + '^\\circ') },
      { q: 'Work out the area of the segment between the chord ' + M('AB') + ' and the arc ' + M('AB') + '. Give your answer correct to 3 significant figures.', m: 3, a: M(Ar + ' - \\tfrac{1}{2} \\times ' + dp(rr, 2) + '^2 \\times \\sin ' + dp(thr, 1) + '^\\circ = ' + sf(seg, 3)) + ' cm²' }
    ] };
  });

  /* 9. Calculus: open box of maximum volume */
  add(function () {
    var k = ri(2, 8), S = 6 * k;
    return { stem: 'A square sheet of card has sides of length ' + S + ' cm. A square of side ' + M('x') + ' cm is cut from each corner. The card is then folded to make an open box.', parts: [
      { q: 'Show that the volume, ' + M('V') + ' cm³, of the box is given by ' + M('V = 4x^3 - ' + 4 * S + 'x^2 + ' + S * S + 'x') + '.', m: 2, a: M('V = x(' + S + ' - 2x)^2 = x(' + S * S + ' - ' + 4 * S + 'x + 4x^2)') },
      { q: 'Use calculus to find the value of ' + M('x') + ' for which the volume is a maximum. You must show all your working.', m: 4, a: M('\\frac{\\mathrm{d}V}{\\mathrm{d}x} = 12x^2 - ' + 8 * S + 'x + ' + S * S + ' = 0 \\Rightarrow (6x - ' + S + ')(2x - ' + S + ') = 0') + ', so ' + M('x = ' + k + '\\text{ or } x = ' + 3 * k) + '. ' + M('x = ' + 3 * k) + ' gives ' + M('V = 0') + ', so ' + M('x = ' + k) },
      { q: 'Work out the maximum volume of the box.', m: 1, a: M('V = ' + k + '(' + S + ' - ' + 2 * k + ')^2 = ' + num(16 * k * k * k)) + ' cm³' }
    ] };
  });

  /* 10. Kinematics with a change of direction */
  add(function () {
    var p, q; do { p = ri(1, 4); q = ri(p + 2, 7); } while ((p + q) % 2);
    var a2 = 3 * (p + q) / 2, a1 = 3 * p * q, s = function (t) { return t * t * t - a2 * t * t + a1 * t; }, T = q + ri(1, 3);
    var dist = Math.abs(s(p) - s(0)) + Math.abs(s(q) - s(p)) + Math.abs(s(T) - s(q));
    return { stem: 'A particle ' + M('P') + ' moves along a straight line. The displacement, ' + M('s') + ' metres, of ' + M('P') + ' from a fixed point ' + M('O') + ' at time ' + M('t') + ' seconds is ' + M('s = ' + poly([1, -a2, a1, 0], 't')) + '.', parts: [
      { q: 'Find the times when ' + M('P') + ' is instantaneously at rest.', m: 3, a: M('v = ' + poly([3, -2 * a2, a1], 't') + ' = 3(t - ' + p + ')(t - ' + q + ') = 0 \\Rightarrow t = ' + p + '\\text{ or } ' + q) },
      { q: 'Find the acceleration of ' + M('P') + ' when ' + M('t = ' + T) + '.', m: 2, a: M('a = 6t - ' + 2 * a2 + ' = ' + (6 * T - 2 * a2)) + ' m/s²' },
      { q: 'Find the total distance travelled by ' + M('P') + ' in the first ' + T + ' seconds.', m: 3, a: M('s(' + p + ') = ' + s(p) + ',\\ s(' + q + ') = ' + s(q) + ',\\ s(' + T + ') = ' + s(T)) + '; distance ' + M('= ' + Math.abs(s(p)) + ' + ' + Math.abs(s(q) - s(p)) + ' + ' + Math.abs(s(T) - s(q)) + ' = ' + dist) + ' m' }
    ] };
  });

  /* 11. Functions: find a constant, an inverse, and solve a quadratic */
  add(function () {
    var r1, r2; do { r1 = nz(-4, 5); r2 = nz(-4, 5); } while (r1 === r2 || r1 + r2 === 0);
    var a = 3, b = -(r1 + r2), k = nz(-9, 9), m = ri(1, 4), R = a * (m * m + k) + b, C = b * b + k - b - 6 * r1 * r2;
    var lo = Math.min(r1, r2), hi = Math.max(r1, r2);
    return { stem: M('\\mathrm{f}(x) = 3x' + sg(b)) + ' and ' + M('\\mathrm{g}(x) = x^2 + k') + ', where ' + M('k') + ' is a constant. Given that ' + M('\\mathrm{fg}(' + m + ') = ' + R) + ',', parts: [
      { q: 'find the value of ' + M('k') + '.', m: 2, a: M('3(' + m * m + ' + k)' + sg(b) + ' = ' + R + ' \\Rightarrow k = ' + k) },
      { q: 'Find ' + M('\\mathrm{f}^{-1}(x)') + '.', m: 2, a: M('\\mathrm{f}^{-1}(x) = \\frac{x' + sg(-b) + '}{3}') },
      { q: 'Solve ' + M('\\mathrm{gf}(x) = \\mathrm{f}(x^2)' + (C ? sg(C) : '')) + '.', m: 4, a: M('(3x' + sg(b) + ')^2' + sg(k) + ' = 3x^2' + sg(b) + (C ? sg(C) : '') + ' \\Rightarrow ' + poly([6, -6 * (r1 + r2), 6 * r1 * r2]) + ' = 0 \\Rightarrow 6' + br(1, -lo) + br(1, -hi) + ' = 0') + ', so ' + M('x = ' + lo + '\\text{ or } x = ' + hi) }
    ] };
  });

  /* 12. Completing the square with a leading coefficient, surd roots and a translation */
  add(function () {
    var a = pick([2, 3]), p = nz(-4, 4), k, h = nz(-3, 3), v = nz(-5, 5); do { k = ri(2, 13); } while (isSq(k));
    var q = -a * k, b = 2 * a * p, c = a * p * p + q;
    var P2 = p - h, nb = 2 * a * P2, nc = a * P2 * P2 + q + v;
    return { stem: M('\\mathrm{f}(x) = ' + poly([a, b, c])) + '.', parts: [
      { q: 'Write ' + M('\\mathrm{f}(x)') + ' in the form ' + M('a(x + b)^2 + c') + ', where ' + M('a') + ', ' + M('b') + ' and ' + M('c') + ' are integers.', m: 3, a: M(a + br(1, p) + '^2' + sg(q)) },
      { q: 'Write down the coordinates of the turning point of the graph of ' + M('y = \\mathrm{f}(x)') + ' and state whether it is a maximum or a minimum.', m: 2, a: M('(' + (-p) + ',\\ ' + q + ')') + ', a minimum' },
      { q: 'Hence solve ' + M('\\mathrm{f}(x) = 0') + '. Give your answers in the form ' + M('m \\pm \\sqrt{n}') + '.', m: 2, a: M(br(1, p) + '^2 = ' + k + ' \\Rightarrow x = ' + (-p) + ' \\pm \\sqrt{' + k + '}') },
      { q: 'The graph of ' + M('y = \\mathrm{f}(x)') + ' is translated by the vector ' + M('\\begin{pmatrix} ' + h + ' \\\\ ' + v + ' \\end{pmatrix}') + '. Find the equation of the new graph. Give your answer in the form ' + M('y = Ax^2 + Bx + C') + '.', m: 3,
        a: M('y = ' + a + br(1, P2) + '^2' + (q + v ? sg(q + v) : '') + ' = ' + poly([a, nb, nc])) }
    ] };
  });

  /* 13. Arithmetic series: two savings plans */
  add(function () {
    var a1, d1, a2, d2, n; do { a1 = ri(2, 12) * 5; d1 = ri(3, 8) * 5; a2 = a1 + ri(4, 16) * 5; d2 = ri(1, d1 / 5 - 1) * 5; n = 2 * (a2 - a1) / (d1 - d2) + 1; } while (n !== Math.round(n) || n < 6 || n > 30);
    var S = function (a, d, k) { return k * (2 * a + (k - 1) * d) / 2; }, T = ri(30, 90) * 100, m = 0; while (S(a1, d1, m) <= T) m++;
    return { stem: 'Jun and Kemi both start saving on the same day. Jun saves ' + money(a1) + ' in the first month and then saves ' + money(d1) + ' more each month than the month before. Kemi saves ' + money(a2) + ' in the first month and then saves ' + money(d2) + ' more each month than the month before.', parts: [
      { q: 'Work out how much Jun has saved in total after 12 months.', m: 2, a: M('\\frac{12}{2}(2 \\times ' + a1 + ' + 11 \\times ' + d1 + ') = ') + money(S(a1, d1, 12)) },
      { q: 'After ' + M('n') + ' months, Jun and Kemi have saved the same total amount. Find the value of ' + M('n') + '.', m: 4, a: M('\\frac{n}{2}(' + 2 * a1 + ' + ' + d1 + '(n - 1)) = \\frac{n}{2}(' + 2 * a2 + ' + ' + d2 + '(n - 1)) \\Rightarrow ' + (d1 - d2) + '(n - 1) = ' + 2 * (a2 - a1) + ' \\Rightarrow n = ' + n) },
      { q: 'Find the least number of months it takes Jun to save more than ' + money(T) + '.', m: 3, a: M('\\frac{n}{2}(' + 2 * a1 + ' + ' + d1 + '(n - 1)) > ' + T) + '; ' + M('S_{' + (m - 1) + '} = ' + S(a1, d1, m - 1)) + ', ' + M('S_{' + m + '} = ' + S(a1, d1, m)) + ', so ' + m + ' months' }
    ] };
  });

  /* 14. Cosine rule leading to a quadratic, exact area */
  add(function () {
    var c = pick([[3, 5, 7, 60], [5, 3, 7, 60], [8, 7, 13, 60], [7, 8, 13, 60], [5, 16, 19, 60], [16, 5, 19, 60], [3, 2, 7, 120], [7, 1, 13, 120], [5, 11, 19, 120]]);
    var x = c[0], p = c[1], q = c[2], A = c[3];
    var quad = A === 60 ? [1, p, p * p - q * q] : [3, 3 * p, p * p - q * q];
    var other = (-quad[1] - Math.sqrt(quad[1] * quad[1] - 4 * quad[0] * quad[2])) / (2 * quad[0]);
    var fig = D.geo({ pts: { A: [0, 0], B: [x + p, 0], C: [x * Math.cos(rad(A)), x * Math.sin(rad(A))] }, polys: [['A', 'B', 'C']], slabels: [{ p: 'A', q: 'C', t: 'x cm' }, { p: 'A', q: 'B', t: '(x + ' + p + ') cm' }, { p: 'B', q: 'C', t: q + ' cm' }],
      angles: [{ v: 'A', a: 'B', b: 'C', t: A + '°', d: 30 }], w: 320, h: 230, label: 'Triangle ABC' });
    return { stem: 'The diagram shows triangle ' + M('ABC') + '.' + fig + '[You may use ' + M('\\cos ' + A + '^\\circ = ' + (A === 60 ? '\\tfrac{1}{2}' : '-\\tfrac{1}{2}')) + ' and ' + M('\\sin ' + A + '^\\circ = \\tfrac{\\sqrt{3}}{2}') + '.]', parts: [
      { q: 'Show that ' + M(poly(quad) + ' = 0') + '.', m: 3, a: M(q + '^2 = x^2 + (x + ' + p + ')^2 - 2x(x + ' + p + ')\\cos ' + A + '^\\circ') + ', with ' + M('\\cos ' + A + '^\\circ = ' + (A === 60 ? '\\tfrac{1}{2}' : '-\\tfrac{1}{2}')) + '; expand and simplify.' },
      { q: 'Find the value of ' + M('x') + '.', m: 2, a: M('x = ' + x) + ' (the other solution, ' + M(dp(other, 2).replace(/\.00$/, '')) + ', is negative)' },
      { q: 'Find the exact area of triangle ' + M('ABC') + '. Give your answer in the form ' + M('k\\sqrt{3}') + '.', m: 2, a: M('\\tfrac{1}{2} \\times ' + x + ' \\times ' + (x + p) + ' \\times \\tfrac{\\sqrt{3}}{2} = ' + frac(x * (x + p), 4) + '\\sqrt{3}') + ' cm²' }
    ] };
  });

  /* 15. Area of a triangle with algebra, then the cosine rule */
  add(function () {
    var x = ri(3, 12), p = ri(2, 8), area = x * (x + p) / 4, th = pick([30, 150]);
    var third = Math.sqrt(x * x + sq(x + p) - 2 * x * (x + p) * Math.cos(rad(th)));
    var fig = D.geo({ pts: { P: [0, 0], Q: [x + p, 0], R: [x * Math.cos(rad(th)), x * Math.sin(rad(th))] }, polys: [['P', 'Q', 'R']], slabels: [{ p: 'P', q: 'R', t: 'x cm' }, { p: 'P', q: 'Q', t: '(x + ' + p + ') cm' }],
      angles: [{ v: 'P', a: 'Q', b: 'R', t: th + '°', d: th > 90 ? 22 : 34 }], w: 320, h: 220, label: 'Triangle PQR' });
    return { stem: 'The diagram shows triangle ' + M('PQR') + '. The area of the triangle is ' + num(area) + ' cm².' + fig + '[You may use ' + M('\\sin ' + th + '^\\circ = \\tfrac{1}{2}') + '.]', parts: [
      { q: 'Show that ' + M(poly([1, p, -4 * area]) + ' = 0') + '.', m: 3, a: M('\\tfrac{1}{2}x(x + ' + p + ')\\sin ' + th + '^\\circ = ' + num(area)) + ' and ' + M('\\sin ' + th + '^\\circ = \\tfrac{1}{2}') + ', so ' + M('x(x + ' + p + ') = ' + 4 * area) },
      { q: 'Find the value of ' + M('x') + '.', m: 2, a: M(br(1, -x) + br(1, x + p) + ' = 0 \\Rightarrow x = ' + x) },
      { q: 'Work out the length of ' + M('QR') + '. Give your answer correct to 3 significant figures.', m: 3, a: M('QR^2 = ' + x + '^2 + ' + (x + p) + '^2 - 2(' + x + ')(' + (x + p) + ')\\cos ' + th + '^\\circ \\Rightarrow QR = ' + sf(third, 3)) + ' cm' }
    ] };
  });

  /* 16. Two-stage proportion */
  add(function () {
    // y = A x^p and x = B z^q (q < 0 means inverse). Exact rational arithmetic with [num, den].
    var c = pick([
      { p: 2, q: -1, B: pick([6, 12, 24]), z0: pick([2, 3]) }, { p: 3, q: -2, B: pick([8, 16, 32]), z0: 2 },
      { p: -1, q: 2, B: pick([2, 3]), z0: pick([1, 2]) }, { p: -2, q: 1, B: pick([2, 3]), z0: pick([1, 2]) }, { p: 2, q: 3, B: pick([1, 2]), z0: 2 }]);
    function pw(b, e) { return e >= 0 ? [Math.pow(b, e), 1] : [1, Math.pow(b, -e)]; }
    function mul(a, b) { var n = a[0] * b[0], d = a[1] * b[1], k = gcd(n, d); return [n / k, d / k]; }
    var x0 = mul([c.B, 1], pw(c.z0, c.q)); // x0 = B z0^q
    var A = pick([2, 3, 5]) * Math.pow(Math.max(x0[0], x0[1]), c.p < 0 ? -c.p : 0); var Af = [A, 1];
    var y0 = mul(Af, c.p >= 0 ? [Math.pow(x0[0], c.p), Math.pow(x0[1], c.p)] : [Math.pow(x0[1], -c.p), Math.pow(x0[0], -c.p)]);
    var K = mul(Af, pw(c.B, c.p)), e = c.p * c.q, z1 = c.z0 * pick([2, 3]), y1 = mul(K, pw(z1, e));
    function F(r) { return r[1] === 1 ? num(r[0]) : frac(r[0], r[1]); }
    function power(v, k) { return k === 1 ? v : v + '^{' + k + '}'; }
    var yExpr = e >= 0 ? (K[1] === 1 ? (K[0] === 1 ? '' : K[0]) + power('z', e) : '\\frac{' + K[0] + power('z', e) + '}{' + K[1] + '}') : '\\frac{' + K[0] + '}{' + (K[1] === 1 ? '' : K[1]) + power('z', -e) + '}';
    var xRel = c.q > 0 ? 'directly proportional to ' + M(power('z', c.q)) : 'inversely proportional to ' + M(power('z', -c.q));
    var yRel = c.p > 0 ? 'directly proportional to ' + M(power('x', c.p)) : 'inversely proportional to ' + M(power('x', -c.p));
    var xForm = c.q > 0 ? (c.B === 1 ? '' : c.B) + power('z', c.q) : '\\frac{' + c.B + '}{' + power('z', -c.q) + '}', yForm = c.p > 0 ? A + power('x', c.p) : '\\frac{' + A + '}{' + power('x', -c.p) + '}';
    return { stem: M('y') + ' is ' + yRel + '. ' + M('x') + ' is ' + xRel + '. When ' + M('z = ' + c.z0) + ', ' + M('x = ' + F(x0)) + ' and ' + M('y = ' + F(y0)) + '.', parts: [
      { q: 'Find a formula for ' + M('y') + ' in terms of ' + M('z') + '. Give your answer in its simplest form.', m: 4, a: M('x = ' + xForm) + ', ' + M('y = ' + yForm) + ', so ' + M('y = ' + yExpr) },
      { q: 'Find the value of ' + M('y') + ' when ' + M('z = ' + z1) + '.', m: 1, a: M(F(y1)) },
      { q: 'The value of ' + M('z') + ' is increased by 20%. Work out the percentage change in the value of ' + M('y') + '. Give your answer correct to 3 significant figures and state whether it is an increase or a decrease.', m: 3,
        a: M('y \\propto ' + power('z', e)) + ' (from part (a)), so ' + M('y') + ' is multiplied by ' + M('1.2^{' + e + '} = ' + sf(Math.pow(1.2, e), 4)) + ': a ' + sf(Math.abs(Math.pow(1.2, e) - 1) * 100, 3) + '% ' + (e > 0 ? 'increase' : 'decrease') }
    ] };
  });

  /* 17. Compound interest with an unknown rate */
  add(function () {
    var P = ri(20, 80) * 100, r = pick([2.5, 3, 3.5, 4, 4.5, 5, 6]), n = pick([3, 4, 5]), Q = Math.round(P * Math.pow(1 + r / 100, n) * 100) / 100;
    var target = 2 * P, yrs = Math.ceil(Math.log(2) / Math.log(1 + r / 100));
    var dep = pick([12, 15, 18, 20]), car = ri(15, 40) * 1000, yrs2 = 0, v = car; while (v >= car / 2) { v *= (1 - dep / 100); yrs2++; }
    return { stem: 'Mia invested ' + money(P) + ' in a savings account paying compound interest at a fixed rate of ' + M('R\\%') + ' per year. After ' + n + ' years the investment was worth ' + money(Q, true) + '.', parts: [
      { q: 'Find the value of ' + M('R') + '.', m: 3, a: M('\\left(1 + \\frac{R}{100}\\right)^{' + n + '} = \\frac{' + Q.toFixed(2) + '}{' + P + '} \\Rightarrow 1 + \\frac{R}{100} = ' + num(Math.round((1 + r / 100) * 10000) / 10000) + ' \\Rightarrow R = ' + r) },
      { q: 'Work out the least number of whole years for the investment to be worth at least ' + money(target) + '.', m: 2, a: M(P + ' \\times ' + num(Math.round((1 + r / 100) * 10000) / 10000) + '^{n} \\ge ' + target) + '; ' + M('n = ' + yrs) + ' years' },
      { q: 'Mia also buys a car for ' + money(car) + '. Its value depreciates by ' + dep + '% each year. After how many whole years is the car first worth less than half of what Mia paid?', m: 2, a: M(car + ' \\times ' + num(Math.round((1 - dep / 100) * 1000) / 1000) + '^{n} < ' + car / 2) + '; ' + yrs2 + ' years' }
    ] };
  });

  /* 18. Indices: simultaneous equations */
  add(function () {
    var x, y, A, B; do { x = nz(-4, 6); y = nz(-4, 6); A = x + 2 * y; B = 3 * x - 2 * y; } while (A === 0 || B === 0 || Math.abs(A) > 10 || Math.abs(B) > 8);
    var lhs1 = A >= 0 ? String(Math.pow(2, A)) : '\\frac{1}{' + Math.pow(2, -A) + '}', lhs2 = B >= 0 ? String(Math.pow(3, B)) : '\\frac{1}{' + Math.pow(3, -B) + '}';
    return q1('Solve the simultaneous equations<br>' + M('2^x \\times 4^y = ' + lhs1) + '<br>' + M('\\frac{27^x}{9^y} = ' + lhs2) + '<br>You must show all your working.', 6,
      M('2^{x + 2y} = 2^{' + A + '} \\Rightarrow x + 2y = ' + A) + '; ' + M('3^{3x - 2y} = 3^{' + B + '} \\Rightarrow 3x - 2y = ' + B) + '. Adding: ' + M('4x = ' + (A + B) + ' \\Rightarrow x = ' + x + ',\\ y = ' + y));
  });

  /* 19. Algebraic fractions: simplify, then solve */
  add(function () {
    var a, b, p, q, r1, r2, ok = false, tries = 0;
    while (!ok && tries < 5000) {
      tries++; a = ri(1, 6); b = ri(1, 6); p = nz(-5, 5); q = nz(-5, 5); if (p === q) continue;
      var B = p + q - a - b, C = p * q - a * q - b * p, Dd = B * B - 4 * C; if (Dd <= 0 || !isSq(Dd)) continue;
      r1 = (-B - Math.sqrt(Dd)) / 2; r2 = (-B + Math.sqrt(Dd)) / 2;
      ok = r1 === Math.round(r1) && r1 !== r2 && [r1, r2].indexOf(-p) < 0 && [r1, r2].indexOf(-q) < 0;
    }
    if (!ok) { a = 3; b = 2; p = 2; q = -1; r1 = -1; r2 = 5; }
    var m = ri(2, 4), k = nz(-5, 5), c = nz(-4, 4); while (gcd(m, k) > 1) k = nz(-5, 5); while (m * c === k || m * c === -k) c = nz(-4, 4);
    var Bq = p + q - a - b, Cq = p * q - a * q - b * p;
    return { stem: '', parts: [
      { q: 'Simplify fully ' + M('\\frac{' + poly([m, m * c + k, c * k]) + '}{' + poly([m * m, 0, -k * k]) + '}') + '.', m: 3, a: M('\\frac{' + br(m, k) + br(1, c) + '}{' + br(m, k) + br(m, -k) + '} = \\frac{' + poly([1, c]) + '}{' + poly([m, -k]) + '}') },
      { q: 'Solve ' + M('\\frac{' + a + '}{' + poly([1, p]) + '} + \\frac{' + b + '}{' + poly([1, q]) + '} = 1') + '.', m: 4, a: M((a === 1 ? '' : a) + br(1, q) + ' + ' + (b === 1 ? '' : b) + br(1, p) + ' = ' + br(1, p) + br(1, q) + ' \\Rightarrow ' + poly([1, Bq, Cq]) + ' = 0 \\Rightarrow x = ' + r1 + '\\text{ or } x = ' + r2) }
    ] };
  });

  /* 20. Histogram with no frequency-density scale */
  add(function () {
    var b = [0, 10, 20, 30, 40, 60, 80], fd, f, unit; do { unit = pick([1, 2, 3]); fd = [ri(1, 6), ri(3, 10), ri(4, 12), ri(3, 10), ri(1, 6), ri(1, 4)]; f = fd.map(function (v, i) { return v * unit * (b[i + 1] - b[i]) / 10; }); } while (f.some(function (v) { return v !== Math.round(v); }));
    var top = Math.max.apply(null, fd) + 1, p = D.plane({ xmin: 0, xmax: 80, ymin: 0, ymax: top, w: 340, h: 260, pad: 40, grid: true, gstep: 5, gstepy: 0.5, ticks: false, xl: '', yl: '' });
    var s = p.svg; for (var x = 10; x <= 80; x += 10) s += D.text(p.X(x), p.Y(0) + 13, x, { anchor: 'middle', size: 11 });
    fd.forEach(function (v, i) { s += D.poly([[p.X(b[i]), p.Y(0)], [p.X(b[i]), p.Y(v)], [p.X(b[i + 1]), p.Y(v)], [p.X(b[i + 1]), p.Y(0)]], 'bar'); });
    s += D.text(190, 254, 'Time (t minutes)', { anchor: 'middle', size: 12 }) + '<text x="12" y="130" transform="rotate(-90 12 130)" text-anchor="middle" font-size="12">Frequency density</text>';
    var tot = f.reduce(function (a, c) { return a + c; }, 0), over = f[4] / 2 + f[5], last = f[5];
    return { stem: 'The histogram shows information about the times, ' + M('t') + ' minutes, some people took to finish a task. There are ' + f[1] + ' people with ' + M('10 < t \\le 20') + '.' + D.svg(340, 262, s, 'Histogram', true), parts: [
      { q: 'Work out the total number of people.', m: 3, a: 'Frequency density for ' + M('10 < t \\le 20') + ' is ' + M(f[1] + ' \\div 10 = ' + num(f[1] / 10)) + ', which fixes the scale. The frequencies are ' + f.join(', ') + ', so the total is ' + M(String(tot)) + '.' },
      { q: 'Work out an estimate for the number of people who took more than 50 minutes.', m: 2, a: M('\\tfrac{1}{2} \\times ' + f[4] + ' + ' + f[5] + ' = ' + num(over)) },
      { q: 'Two of the people are chosen at random. Work out the probability that both of them took more than 60 minutes.', m: 2, a: M('\\frac{' + last + '}{' + tot + '} \\times \\frac{' + (last - 1) + '}{' + (tot - 1) + '} = ' + frac(last * (last - 1), tot * (tot - 1))) }
    ] };
  });

  /* 21. Surds in a rectangle */
  add(function () {
    var k = pick([2, 3, 5, 7]), u = ri(2, 9), v = ri(1, 4), p = ri(2, 6); while (p * p === k) p++;
    var m = u * p + v * k, n = u + v * p;
    var d2a = u * u + v * v * k + p * p + k, d2b = 2 * u * v + 2 * p;
    return { stem: 'A rectangle has area ' + M('(' + m + ' + ' + n + '\\sqrt{' + k + '})') + ' cm². The width of the rectangle is ' + M('(' + p + ' + \\sqrt{' + k + '})') + ' cm.', parts: [
      { q: 'Work out the length of the rectangle. Give your answer in the form ' + M('a + b\\sqrt{' + k + '}') + ', where ' + M('a') + ' and ' + M('b') + ' are integers.', m: 3, a: M('\\frac{' + m + ' + ' + n + '\\sqrt{' + k + '}}{' + p + ' + \\sqrt{' + k + '}} \\times \\frac{' + p + ' - \\sqrt{' + k + '}}{' + p + ' - \\sqrt{' + k + '}} = ' + u + ' + ' + (v === 1 ? '' : v) + '\\sqrt{' + k + '}') },
      { q: 'Show that the square of the length of a diagonal of the rectangle is ' + M(d2a + ' + ' + d2b + '\\sqrt{' + k + '}') + '.', m: 3, a: M('(' + u + ' + ' + (v === 1 ? '' : v) + '\\sqrt{' + k + '})^2 + (' + p + ' + \\sqrt{' + k + '})^2 = (' + (u * u + v * v * k) + ' + ' + 2 * u * v + '\\sqrt{' + k + '}) + (' + (p * p + k) + ' + ' + 2 * p + '\\sqrt{' + k + '})') }
    ] };
  });

  /* 22. Normal to a curve meets the curve again */
  add(function () {
    var a, b, c, m; do { a = nz(-3, 3); b = nz(-6, 6); c = ri(-8, 8); m = 2 * a + b; } while (m === 0 || Math.abs(m) > 4);
    var yP = a * a + b * a + c, K = a + m * yP; // normal: x + m y = a + m yP
    var xQ = frac(a * m - m * m - 1, m), yQ = frac(yP * m * m + m * m + 1, m * m);
    var line = 'x' + (m < 0 ? ' - ' : ' + ') + (Math.abs(m) === 1 ? '' : Math.abs(m)) + 'y = ' + K;
    return { stem: 'The curve ' + M('C') + ' has equation ' + M('y = ' + poly([1, b, c])) + '. The point ' + M('P') + ' on ' + M('C') + ' has ' + M('x') + '-coordinate ' + a + '.', parts: [
      { q: 'Find the gradient of ' + M('C') + ' at ' + M('P') + '.', m: 2, a: M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 2x' + sg(b) + ' = ' + m) + ' at ' + M('x = ' + a) },
      { q: 'The normal to ' + M('C') + ' at ' + M('P') + ' is the line through ' + M('P') + ' perpendicular to the tangent. Show that the normal has equation ' + M(line) + '.', m: 3, a: M('P(' + a + ',\\ ' + yP + ')') + ', gradient of normal ' + M('= ' + frac(-1, m)) + '; ' + M('y' + (yP ? sg(-yP) : '') + ' = ' + (m === -1 ? '' : m === 1 ? '-' : frac(-1, m)) + br(1, -a)) + ' rearranges to ' + M(line) },
      { q: 'The normal meets ' + M('C') + ' again at the point ' + M('Q') + '. Find the coordinates of ' + M('Q') + '. You must show all your working.', m: 4, a: 'Substitute ' + M('y = ' + poly([1, b, c])) + ' into the normal and solve the quadratic; one root is ' + M('x = ' + a) + ', so ' + M('Q\\left(' + xQ + ',\\ ' + yQ + '\\right)') }
    ] };
  });

  /* 23. Speed–time: find the maximum speed from a quadratic */
  add(function () {
    var a1, a2, V, T, Dd; do { a1 = pick([0.5, 1, 2, 2.5]); a2 = pick([1, 2, 2.5, 4, 5]); V = ri(4, 20); T = ri(40, 120); var t1 = V / a1, t3 = V / a2; Dd = V * (T - (t1 + t3) / 2); } while (V / a1 + V / a2 >= T || Dd !== Math.round(Dd) || V / a1 !== Math.round(V / a1) || V / a2 !== Math.round(V / a2));
    var kk = (1 / a1 + 1 / a2) / 2, other = T / kk - V, qc = [Math.round(20 / a1 + 20 / a2), -40 * T, Math.round(40 * Dd)], hq = gcd(gcd(qc[0], qc[1]), qc[2]); qc = qc.map(function (v) { return v / hq; });
    var p = D.plane({ xmin: 0, xmax: T + 4, ymin: 0, ymax: 1.4, w: 340, h: 200, pad: 30, xl: 't', yl: 'v' });
    var t1 = V / a1, t3 = V / a2, s = p.svg + D.path('M' + p.X(0) + ',' + p.Y(0) + 'L' + p.X(t1) + ',' + p.Y(1) + 'L' + p.X(T - t3) + ',' + p.Y(1) + 'L' + p.X(T) + ',' + p.Y(0), 'curve') + D.text(p.X(0) - 8, p.Y(1), 'V', { anchor: 'end', cls: 'it' }) + D.line(p.X(0), p.Y(1), p.X(t1), p.Y(1), 'dash') + D.text(p.X(T), p.Y(0) + 13, T, { anchor: 'middle', size: 11 });
    return { stem: 'A car starts from rest. It accelerates at ' + a1 + ' m/s² until it reaches a speed of ' + M('V') + ' m/s. It travels at ' + M('V') + ' m/s and then decelerates at ' + a2 + ' m/s² until it stops. The whole journey takes ' + T + ' seconds and the car travels ' + num(Dd) + ' m.' + D.svg(340, 200, s, 'Speed–time graph', true), parts: [
      { q: 'Show that ' + M(poly(qc, 'V') + ' = 0') + '.', m: 4, a: 'Time accelerating ' + M('= \\frac{V}{' + a1 + '}') + ', time decelerating ' + M('= \\frac{V}{' + a2 + '}') + '. Distance = area under the graph ' + M('= V\\left(' + T + ' - \\tfrac{1}{2}\\left(\\frac{V}{' + a1 + '} + \\frac{V}{' + a2 + '}\\right)\\right) = ' + num(Dd)) },
      { q: 'Find the value of ' + M('V') + '. Give a reason for rejecting the other solution.', m: 3, a: M('V = ' + V) + '. The other solution, ' + M('V = ' + num(Math.round(other * 10) / 10)) + ', would make the accelerating and decelerating times add up to more than ' + T + ' seconds.' }
    ] };
  });

  /* 24. Intersecting chords with algebra, then an area */
  add(function () {
    var x, k, c, d, th; do { x = ri(2, 9); k = ri(1, 5); var N = x * (x + k); c = ri(2, 12); d = N / c; } while (d !== Math.round(d) || c === x || c === x + k || d > 20 || d < 2);
    th = ri(40, 80);
    var E = [0.12, -0.08], ch1 = G.chordEnds(E, 18), ch2 = G.chordEnds(E, 18 + th);
    var fig = D.geo({ pts: { A: ch1[0], B: ch1[1], C: ch2[1], D: ch2[0], E: E }, circle: [0, 0, 1], segs: [['A', 'B'], ['C', 'D'], ['A', 'C', 'dash']], dots: ['E'], lab: { E: [12, 12] },
      slabels: [{ p: 'A', q: 'E', t: 'x' }, { p: 'E', q: 'B', t: 'x + ' + k }, { p: 'C', q: 'E', t: c + ' cm' }, { p: 'E', q: 'D', t: d + ' cm' }], w: 300, h: 280, label: 'Intersecting chords' });
    var va = [ch1[0][0] - E[0], ch1[0][1] - E[1]], vc = [ch2[1][0] - E[0], ch2[1][1] - E[1]];
    th = 180 - Math.round(dg(Math.acos((va[0] * vc[0] + va[1] * vc[1]) / (Math.hypot(va[0], va[1]) * Math.hypot(vc[0], vc[1])))));
    var AC = Math.sqrt(x * x + c * c - 2 * x * c * Math.cos(rad(180 - th)));
    return { stem: 'The chords ' + M('AB') + ' and ' + M('CD') + ' of a circle meet at ' + M('E') + '. ' + M('AE = x') + ' cm, ' + M('EB = (x + ' + k + ')') + ' cm, ' + M('CE = ' + c) + ' cm and ' + M('ED = ' + d) + ' cm. Angle ' + M('AEC = ' + (180 - th) + '^\\circ') + '.' + fig, parts: [
      { q: 'Find the value of ' + M('x') + '.', m: 3, a: M('x(x + ' + k + ') = ' + c * d + ' \\Rightarrow ' + poly([1, k, -c * d]) + ' = 0 \\Rightarrow x = ' + x) },
      { q: 'Work out the area of triangle ' + M('AEC') + '. Give your answer correct to 3 significant figures.', m: 2, a: M('\\tfrac{1}{2} \\times ' + x + ' \\times ' + c + ' \\times \\sin ' + (180 - th) + '^\\circ = ' + sf(0.5 * x * c * Math.sin(rad(180 - th)), 3)) + ' cm²' },
      { q: 'Work out the length of ' + M('AC') + '. Give your answer correct to 3 significant figures.', m: 3, a: M('AC^2 = ' + x + '^2 + ' + c + '^2 - 2(' + x + ')(' + c + ')\\cos ' + (180 - th) + '^\\circ \\Rightarrow AC = ' + sf(AC, 3)) + ' cm' }
    ] };
  });

  /* 25. Circle theorems with algebra */
  add(function () {
    var x, a, b, c, dd, angB; do { angB = ri(40, 76); a = ri(3, 4); c = ri(1, 2); x = ri(6, 16); b = angB - a * x; dd = angB - c * x; } while (b < 3 || dd < 3);
    var fig = D.geo({ pts: { O: [0, 0], A: [0, -1], B: D.onCircle(-90 + 2 * angB), C: D.onCircle(90 + angB), S: [-1.6, -1], T: [1.6, -1] }, circle: [0, 0, 1], segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['O', 'A', 'dash'], ['O', 'B', 'dash'], ['S', 'T']], dots: ['O'],
      angles: [{ v: 'C', a: 'A', b: 'B', t: '(' + poly([a, b]) + ')°', d: 64 }, { v: 'A', a: 'T', b: 'B', t: '(' + poly([c, dd]) + ')°', d: 78, r: 26 }], lab: { O: [-12, 6] }, w: 340, h: 330, label: 'Circle with tangent and algebraic angles' });
    return { stem: M('A') + ', ' + M('B') + ' and ' + M('C') + ' are points on a circle with centre ' + M('O') + '. ' + M('SAT') + ' is a tangent to the circle at ' + M('A') + '.' + fig, parts: [
      { q: 'Find the value of ' + M('x') + '. Give a reason for your answer.', m: 3, a: M(poly([a, b]) + ' = ' + poly([c, dd]) + ' \\Rightarrow x = ' + x) + ' (alternate segment theorem)' },
      { q: 'Find the size of angle ' + M('OBA') + '. Give reasons for each stage of your working.', m: 3, a: 'Angle ' + M('ACB = ' + angB + '^\\circ') + ', so angle ' + M('AOB = ' + 2 * angB + '^\\circ') + ' (angle at centre is twice the angle at the circumference). Triangle ' + M('OAB') + ' is isosceles (radii), so ' + M('OBA = \\frac{180 - ' + 2 * angB + '}{2} = ' + (90 - angB) + '^\\circ') }
    ] };
  });

  /* 26. Composite solid: surface area gives the radius */
  add(function () {
    var r = ri(2, 9), kk = ri(2, 5), h = kk * r, coef = 2 * kk + 3, TSA = coef * r * r, dens = pick([2.7, 7.8, 8.9, 11.3]);
    var V = Math.PI * r * r * h + 2 / 3 * Math.PI * r * r * r, Vexact = r * r * h + 2 * r * r * r / 3;
    return { stem: 'A solid is made from a cylinder and a hemisphere. The cylinder and the hemisphere both have radius ' + M('r') + ' cm. The height of the cylinder is ' + M(kk + 'r') + ' cm. The total surface area of the solid is ' + num(TSA) + M('\\pi') + ' cm².<br>[Surface area of a sphere ' + M('= 4\\pi r^2') + '. Volume of a sphere ' + M('= \\tfrac{4}{3}\\pi r^3') + ']', parts: [
      { q: 'Show that the total surface area is ' + M(coef + '\\pi r^2') + '.', m: 3, a: 'Base ' + M('\\pi r^2') + ' + curved surface of cylinder ' + M('2\\pi r(' + kk + 'r) = ' + 2 * kk + '\\pi r^2') + ' + hemisphere ' + M('2\\pi r^2') + ' ' + M('= ' + coef + '\\pi r^2') },
      { q: 'Find the value of ' + M('r') + '.', m: 1, a: M(coef + '\\pi r^2 = ' + TSA + '\\pi \\Rightarrow r = ' + r) },
      { q: 'The solid is made of metal with density ' + dens + ' g/cm³. Work out the mass of the solid in kilograms. Give your answer correct to 3 significant figures.', m: 3, a: 'Volume ' + M('= \\pi(' + r + ')^2(' + h + ') + \\tfrac{2}{3}\\pi(' + r + ')^3 = ' + sf(V, 5)) + ' cm³; mass ' + M('= ' + sf(V * dens / 1000, 3)) + ' kg' }
    ] };
  });

  /* 27. Melting and recasting */
  add(function () {
    var R = ri(6, 15), H = ri(10, 30), r = pick([1, 1.5, 2, 2.5, 3]), Vc = Math.PI * R * R * H, Vs = 4 / 3 * Math.PI * r * r * r, n = Math.floor(Vc / Vs);
    var SAc = 2 * Math.PI * R * R + 2 * Math.PI * R * H, SAs = n * 4 * Math.PI * r * r, inc = (SAs - SAc) / SAc * 100;
    return { stem: 'A solid metal cylinder has radius ' + R + ' cm and height ' + H + ' cm. The cylinder is melted down and recast into as many solid spheres of radius ' + num(r) + ' cm as possible.<br>[Volume of a sphere ' + M('= \\tfrac{4}{3}\\pi r^3') + '. Surface area of a sphere ' + M('= 4\\pi r^2') + ']', parts: [
      { q: 'Work out the number of spheres made.', m: 3, a: M('\\frac{\\pi(' + R + ')^2(' + H + ')}{\\tfrac{4}{3}\\pi(' + num(r) + ')^3} = ' + dp(Vc / Vs, 2)) + ', so ' + n + ' spheres' },
      { q: 'Work out the percentage increase from the total surface area of the cylinder to the total surface area of all the spheres. Give your answer correct to 3 significant figures.', m: 4, a: 'Cylinder ' + M('= ' + sf(SAc, 5)) + ' cm², spheres ' + M('= ' + n + ' \\times 4\\pi(' + num(r) + ')^2 = ' + sf(SAs, 5)) + ' cm²; increase ' + M('= ' + sf(inc, 3) + '\\%') }
    ] };
  });

  /* 28. Three-set Venn diagram with algebra and probability */
  add(function () {
    var x = ri(2, 7), p1 = ri(1, 6), c1 = pick([2, 3]), q1_ = ri(2, 6), q2 = ri(1, 5), q3 = ri(2, 6), abc = ri(1, 4), out = ri(2, 8);
    var cells = { a: x + p1, b: c1 * x, c: q3, ab: x, ac: q1_, bc: q2, abc: abc, out: out };
    var N = Object.keys(cells).reduce(function (t, k) { return t + cells[k]; }, 0), coef = 1 + c1 + 1, rest = N - coef * x;
    var lab = { a: 'x + ' + p1, b: c1 + 'x', c: String(q3), ab: 'x', ac: String(q1_), bc: String(q2), abc: String(abc), out: String(out) };
    var two = cells.ab + cells.ac + cells.bc, nF = cells.a + cells.ab + cells.ac + cells.abc, FS = cells.ac + cells.abc, one = cells.a + cells.b + cells.c;
    return { stem: 'Each of ' + N + ' students was asked whether they study French (' + M('F') + '), German (' + M('G') + ') or Spanish (' + M('S') + '). The Venn diagram shows some information about their answers.' + D.venn3(lab, ['F', 'G', 'S']), parts: [
      { q: 'Find the value of ' + M('x') + '.', m: 2, a: M(coef + 'x + ' + rest + ' = ' + N + ' \\Rightarrow x = ' + x) },
      { q: 'A student who studies French is chosen at random. Find the probability that this student also studies Spanish.', m: 2, a: M('\\frac{' + FS + '}{' + nF + '}' + (frac(FS, nF) !== '\\frac{' + FS + '}{' + nF + '}' ? ' = ' + frac(FS, nF) : '')) },
      { q: 'Two of the ' + N + ' students are chosen at random. Work out the probability that one of them studies exactly one language and the other studies exactly two languages.', m: 3,
        a: M('2 \\times \\frac{' + one + '}{' + N + '} \\times \\frac{' + two + '}{' + (N - 1) + '} = ' + frac(2 * one * two, N * (N - 1))) }
    ] };
  });

  /* 29. Bearings with the cosine rule and the sine rule */
  add(function () {
    var d1 = ri(10, 40), d2 = ri(10, 40), b1 = ri(20, 80), b2 = b1 + ri(60, 120);
    var B = [d1 * Math.sin(rad(b1)), d1 * Math.cos(rad(b1))], C = [B[0] + d2 * Math.sin(rad(b2)), B[1] + d2 * Math.cos(rad(b2))];
    var angB = 180 - (b2 - b1), AC = Math.hypot(C[0], C[1]), bearAC = (dg(Math.atan2(C[0], C[1])) + 360) % 360, bearCA = (bearAC + 180) % 360, angA = dg(Math.asin(d2 * Math.sin(rad(angB)) / AC));
    var fig = D.bearings([{ x: 0, y: 0, name: 'A' }, { x: B[0], y: B[1], name: 'B', seg: d1 + ' km' }, { x: C[0], y: C[1], name: 'C', seg: d2 + ' km' }], ['A', 'B', 'C'], true);
    return { stem: 'A ship sails ' + d1 + ' km from port ' + M('A') + ' to a buoy ' + M('B') + ' on a bearing of ' + brg(b1) + '. It then sails ' + d2 + ' km from ' + M('B') + ' to a lighthouse ' + M('C') + ' on a bearing of ' + brg(b2) + '.' + fig, parts: [
      { q: 'Work out the distance ' + M('AC') + '. Give your answer correct to 3 significant figures.', m: 3, a: 'Angle ' + M('ABC = ' + angB + '^\\circ') + '; ' + M('AC^2 = ' + d1 + '^2 + ' + d2 + '^2 - 2(' + d1 + ')(' + d2 + ')\\cos ' + angB + '^\\circ \\Rightarrow AC = ' + sf(AC, 3)) + ' km' },
      { q: 'Work out the bearing of ' + M('A') + ' from ' + M('C') + '. Give your answer correct to the nearest degree.', m: 4, a: M('\\sin BAC = \\frac{' + d2 + '\\sin ' + angB + '^\\circ}{' + sf(AC, 4) + '} \\Rightarrow BAC = ' + dp(angA, 1) + '^\\circ') + '; bearing of ' + M('C') + ' from ' + M('A') + ' ' + M('= ' + dp(bearAC, 1) + '^\\circ') + ', so bearing of ' + M('A') + ' from ' + M('C') + ' is ' + brg(bearCA) }
    ] };
  });

  /* 30. Similar triangles with algebra and area */
  add(function () {
    var x, p, AE, EC; do { x = ri(2, 10); p = ri(1, 6); AE = ri(3, 12); EC = AE * (x + p) / x; } while (EC !== Math.round(EC) || EC > 30);
    // AD = x, DB = x + p ... make it quadratic: AD = x, DB = (x + p), AE = AE, EC given -> AD/AB = AE/AC
    var k2n = x * x, k2d = sq(2 * x + p), trap = k2d - k2n;
    var A = [0, 3], B = [-2.2, 0], C = [2.6, 0], t = x / (2 * x + p), Dp = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t], Ep = [A[0] + (C[0] - A[0]) * t, A[1] + (C[1] - A[1]) * t];
    var fig = D.geo({ pts: { A: A, B: B, C: C, D: Dp, E: Ep }, polys: [['A', 'B', 'C']], segs: [['D', 'E']], par: [['D', 'E', 1], ['B', 'C', 1]],
      slabels: [{ p: 'A', q: 'D', t: 'x cm' }, { p: 'D', q: 'B', t: '(x + ' + p + ') cm' }, { p: 'A', q: 'E', t: AE + ' cm' }, { p: 'E', q: 'C', t: EC + ' cm' }], w: 320, h: 260, label: 'Triangle with a parallel line' });
    return { stem: M('D') + ' lies on ' + M('AB') + ' and ' + M('E') + ' lies on ' + M('AC') + '. ' + M('DE') + ' is parallel to ' + M('BC') + '.' + fig, parts: [
      { q: 'Find the value of ' + M('x') + '.', m: 3, a: M('\\frac{x}{' + AE + '} = \\frac{x + ' + p + '}{' + EC + '} \\Rightarrow ' + EC + 'x = ' + AE + 'x + ' + AE * p + ' \\Rightarrow x = ' + x) },
      { q: 'The area of triangle ' + M('ADE') + ' is ' + num(k2n * 2) + ' cm². Work out the area of the trapezium ' + M('DBCE') + '.', m: 3, a: 'Length factor ' + M(frac(2 * x + p, x)) + ', area factor ' + M(frac(k2d, k2n)) + '; area of ' + M('ABC = ' + num(k2d * 2)) + ', so trapezium ' + M('= ' + num(trap * 2)) + ' cm²' }
    ] };
  });


  /* 31. Algebraic proof (two proofs) */
  add(function () {
    var k = ri(1, 6), e = ri(2, 5);
    var pool = [
      { q: 'Prove algebraically that ' + M('(2n + ' + k + ')^2 - (2n - ' + k + ')^2') + ' is a multiple of 8 for all positive integers ' + M('n') + '.', m: 3,
        a: M('(4n^2 + ' + 4 * k + 'n + ' + k * k + ') - (4n^2 - ' + 4 * k + 'n + ' + k * k + ') = ' + 8 * k + 'n = 8(' + (k === 1 ? '' : k) + 'n)') + ', which is a multiple of 8.' },
      { q: 'Prove algebraically that the sum of the squares of any two consecutive odd numbers is 2 more than a multiple of 8.', m: 4,
        a: M('(2n + 1)^2 + (2n + 3)^2 = 8n^2 + 16n + 10 = 8(n^2 + 2n + 1) + 2') + ', which is 2 more than a multiple of 8.' },
      { q: 'Prove algebraically that the product of any two consecutive odd numbers is 1 less than a multiple of 4.', m: 3,
        a: M('(2n - 1)(2n + 1) = 4n^2 - 1') + ', and ' + M('4n^2') + ' is a multiple of 4.' },
      { q: 'Prove algebraically that the difference between the squares of any two consecutive integers is equal to the sum of the two integers.', m: 3,
        a: M('(n + 1)^2 - n^2 = 2n + 1 = n + (n + 1)') },
      { q: 'Prove algebraically that the sum of any ' + e + ' consecutive even numbers is a multiple of ' + 2 * e + '.', m: 3,
        a: M('2n + (2n + 2) + \\ldots + (2n + ' + 2 * (e - 1) + ') = ' + 2 * e + 'n + ' + e * (e - 1) + ' = ' + 2 * e + '(n + ' + frac(e * (e - 1), 2 * e) + ')') + (e % 2 === 1 ? ', a multiple of ' + 2 * e + '.' : '. This is not always a multiple of ' + 2 * e + '.') },
      { q: 'Prove that ' + M('(3n + 1)^2 - (n - 1)^2') + ' is always a multiple of 8 for all positive integers ' + M('n') + '.', m: 3,
        a: M('(9n^2 + 6n + 1) - (n^2 - 2n + 1) = 8n^2 + 8n = 8n(n + 1)') + ', which is a multiple of 8.' },
      { q: 'Prove that, for all positive integers ' + M('n') + ', ' + M('n^2 + n') + ' is even.', m: 2,
        a: M('n^2 + n = n(n + 1)') + ', the product of two consecutive integers. One of them is even, so the product is even.' }
    ];
    // drop the even-numbers proof when it would be false
    pool = pool.filter(function (p) { return p.q.indexOf('consecutive even') < 0 || e % 2 === 1; });
    var a = pick(pool), b; do { b = pick(pool); } while (b === a);
    return { stem: '', parts: [a, b] };
  });

  /* 32. A sector folded into a cone */
  add(function () {
    var t = pick([[3, 4, 5], [6, 8, 10], [9, 12, 15], [12, 16, 20], [4, 3, 5], [8, 6, 10], [12, 9, 15], [16, 12, 20]]), k = pick([1, 1, 2]);
    var r = t[0], h = t[1], R = t[2], th = 360 * r / R, V = r * r * h / 3, cr = pick([4, 5, 6, 8]);
    var depth = V / (cr * cr), dExact = frac(r * r * h, 3 * cr * cr);
    return { stem: 'The diagram shows a sector ' + M('OAB') + ' of a circle with centre ' + M('O') + ' and radius ' + R + ' cm. Angle ' + M('AOB = ' + th + '^\\circ') + '. The sector is folded so that ' + M('OA') + ' meets ' + M('OB') + ', making the curved surface of a hollow cone with no overlap.' + D.sector(th * Math.PI / 180, R + ' cm', th + '°') + '[Volume of a cone ' + M('= \\tfrac{1}{3}\\pi r^2 h') + ']', parts: [
      { q: 'Show that the radius of the base of the cone is ' + r + ' cm.', m: 2, a: 'Arc length ' + M('= \\frac{' + th + '}{360} \\times 2\\pi \\times ' + R + ' = ' + 2 * r + '\\pi') + ' = circumference of the base, so ' + M('2\\pi r = ' + 2 * r + '\\pi \\Rightarrow r = ' + r) },
      { q: 'Work out the vertical height of the cone.', m: 2, a: 'The slant height is ' + R + ' cm, so ' + M('h = \\sqrt{' + R + '^2 - ' + r + '^2} = ' + h) + ' cm' },
      { q: 'The cone is held with its vertex down and filled with water. The water is then poured into an empty cylinder of radius ' + cr + ' cm. Work out the depth of the water in the cylinder. Give your answer correct to 3 significant figures.', m: 3,
        a: 'Volume ' + M('= \\tfrac{1}{3}\\pi(' + r + ')^2(' + h + ') = ' + num(V) + '\\pi') + ' cm³. ' + M('\\pi(' + cr + ')^2 d = ' + num(V) + '\\pi \\Rightarrow d = ' + dExact + ' = ' + sf(depth, 3)) + ' cm' }
    ] };
  });

  /* 33. Cuboid: a triangle across three faces */
  add(function () {
    var l, w, h; do { l = ri(5, 14); w = ri(3, 9); h = ri(3, 10); } while (l === w || w === h);
    var AC2 = l * l + w * w, AF2 = l * l + h * h, CF2 = w * w + h * h, cosA = (AC2 + AF2 - CF2) / (2 * Math.sqrt(AC2 * AF2)), A = dg(Math.acos(cosA));
    var area = 0.5 * Math.sqrt(AC2 * AF2) * Math.sin(rad(A));
    var fig = D.cuboid(l, w, h, [['A', 'C', 'accentdash'], ['A', 'F', 'accent'], ['F', 'C', 'accentdash']]);
    return { stem: 'The diagram shows a cuboid ' + M('ABCDEFGH') + ' with ' + M('AB = ' + l) + ' cm, ' + M('BC = ' + w) + ' cm and ' + M('AE = ' + h) + ' cm. The points ' + M('A') + ', ' + M('C') + ' and ' + M('F') + ' are joined to make a triangle.' + fig, parts: [
      { q: 'Work out the lengths of ' + M('AC') + ', ' + M('AF') + ' and ' + M('CF') + '. Leave your answers in surd form.', m: 3, a: M('AC = \\sqrt{' + AC2 + '},\\ AF = \\sqrt{' + AF2 + '},\\ CF = \\sqrt{' + CF2 + '}') },
      { q: 'Work out the size of angle ' + M('CAF') + '. Give your answer correct to 1 decimal place.', m: 3, a: M('\\cos CAF = \\frac{' + AC2 + ' + ' + AF2 + ' - ' + CF2 + '}{2\\sqrt{' + AC2 + '}\\sqrt{' + AF2 + '}} \\Rightarrow CAF = ' + dp(A, 1) + '^\\circ') },
      { q: 'Work out the area of triangle ' + M('ACF') + '. Give your answer correct to 3 significant figures.', m: 2, a: M('\\tfrac{1}{2}\\sqrt{' + AC2 + '}\\sqrt{' + AF2 + '}\\sin ' + dp(A, 1) + '^\\circ = ' + sf(area, 3)) + ' cm²' }
    ] };
  });

  /* 34. Tangent to a circle centred at the origin */
  add(function () {
    var t = pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10], [8, 15, 17]]), sx = pick([1, -1]), sy = pick([1, -1]);
    var a = sx * t[0], b = sy * t[1], R = t[2], K = R * R; // tangent: ax + by = R^2
    function lin(u, v) { return (u === 1 ? '' : u === -1 ? '-' : u) + 'x' + (v < 0 ? ' - ' : ' + ') + (Math.abs(v) === 1 ? '' : Math.abs(v)) + 'y'; }
    var xA = frac(K, a), yB = frac(K, b), area = frac(K * K, 2 * Math.abs(a * b));
    var p = D.plane({ xmin: -R - 2, xmax: R + 2, ymin: -R - 2, ymax: R + 2, w: 300, h: 300 });
    var s = p.svg + '<circle cx="' + p.X(0) + '" cy="' + p.Y(0) + '" r="' + (p.X(R) - p.X(0)) + '" class="thin"/>' + p.curve(function (x) { return (K - a * x) / b; }, -R - 2, R + 2) + D.dot(p.X(a), p.Y(b), 3) + D.text(p.X(a) + (a > 0 ? 10 : -16), p.Y(b) + (b > 0 ? -10 : 14), 'P', { cls: 'it' });
    return { stem: 'The circle ' + M('C') + ' has equation ' + M('x^2 + y^2 = ' + K) + '. The point ' + M('P(' + a + ',\\ ' + b + ')') + ' lies on ' + M('C') + '. The line ' + M('L') + ' is the tangent to ' + M('C') + ' at ' + M('P') + '.' + D.svg(300, 300, s, 'Circle with a tangent', true), parts: [
      { q: 'Find an equation of ' + M('L') + '. Give your answer in the form ' + M('ax + by = c') + ', where ' + M('a') + ', ' + M('b') + ' and ' + M('c') + ' are integers.', m: 4,
        a: 'Gradient of ' + M('OP = ' + frac(b, a)) + '. The tangent is perpendicular to the radius, so its gradient is ' + M(frac(-a, b)) + '. ' + M('y - ' + (b < 0 ? '(' + b + ')' : b) + ' = ' + frac(-a, b) + '(x - ' + (a < 0 ? '(' + a + ')' : a) + ')') + ' gives ' + M(lin(a, b) + ' = ' + K) },
      { q: M('L') + ' meets the ' + M('x') + '-axis at ' + M('A') + ' and the ' + M('y') + '-axis at ' + M('B') + '. Work out the area of triangle ' + M('OAB') + ', where ' + M('O') + ' is the origin.', m: 3,
        a: M('A\\left(' + xA + ',\\ 0\\right)') + ', ' + M('B\\left(0,\\ ' + yB + '\\right)') + '; area ' + M('= \\tfrac{1}{2} \\times ' + frac(K, Math.abs(a)) + ' \\times ' + frac(K, Math.abs(b)) + ' = ' + area + (area.indexOf('frac') > -1 ? ' = ' + sf(K * K / (2 * Math.abs(a * b)), 3) : '')) }
    ] };
  });

  /* 35. Bounds with trigonometry */
  add(function () {
    var p, q, U, L, n; do { p = ri(20, 90); q = ri(15, 80); U = dg(Math.atan((q + 0.5) / (p - 0.5))); L = dg(Math.atan((q - 0.5) / (p + 0.5))); } while (Math.round(U) !== Math.round(L) || U - L < 0.3);
    var fig = D.geo({ pts: { A: [0, 0], B: [p, 0], C: [p, q] }, polys: [['A', 'B', 'C']], slabels: [{ p: 'A', q: 'B', t: p + ' cm' }, { p: 'B', q: 'C', t: q + ' cm' }],
      angles: [{ v: 'B', a: 'A', b: 'C', right: true }, { v: 'A', a: 'B', b: 'C', t: 'x', d: 34 }], w: 320, h: 220, label: 'Right-angled triangle' });
    return { stem: 'In triangle ' + M('ABC') + ', angle ' + M('ABC = 90^\\circ') + '. ' + M('AB = ' + p) + ' cm and ' + M('BC = ' + q) + ' cm, both correct to the nearest centimetre.' + fig, parts: [
      { q: 'Work out the upper bound for the size of the angle marked ' + M('x') + '. Give your answer correct to 3 decimal places.', m: 3, a: M('\\tan x = \\frac{' + (q + 0.5) + '}{' + (p - 0.5) + '} \\Rightarrow x = ' + U.toFixed(3) + '^\\circ') + ' (largest opposite side over smallest adjacent side)' },
      { q: 'By considering bounds, work out the value of ' + M('x') + ' to a suitable degree of accuracy. You must show all your working and give a reason for your answer.', m: 3,
        a: 'Lower bound ' + M('\\tan x = \\frac{' + (q - 0.5) + '}{' + (p + 0.5) + '} \\Rightarrow x = ' + L.toFixed(3) + '^\\circ') + '. Both bounds round to ' + Math.round(U) + '° to the nearest degree, so ' + M('x = ' + Math.round(U) + '^\\circ') + '.' }
    ] };
  });

  /* 36. Minimum surface area of a closed cylinder */
  add(function () {
    var k = ri(3, 9), V = 2 * k * k * k;
    return { stem: 'A closed cylinder has radius ' + M('r') + ' cm and height ' + M('h') + ' cm. The volume of the cylinder is ' + V + M('\\pi') + ' cm³.', parts: [
      { q: 'Show that the total surface area, ' + M('A') + ' cm², of the cylinder is given by ' + M('A = 2\\pi r^2 + \\frac{' + 2 * V + '\\pi}{r}') + '.', m: 3, a: M('\\pi r^2 h = ' + V + '\\pi \\Rightarrow h = \\frac{' + V + '}{r^2}') + '; ' + M('A = 2\\pi r^2 + 2\\pi r h = 2\\pi r^2 + \\frac{' + 2 * V + '\\pi}{r}') },
      { q: 'Use calculus to find the value of ' + M('r') + ' for which ' + M('A') + ' is a minimum.', m: 4, a: M('\\frac{\\mathrm{d}A}{\\mathrm{d}r} = 4\\pi r - \\frac{' + 2 * V + '\\pi}{r^2} = 0 \\Rightarrow r^3 = ' + V / 2 + ' \\Rightarrow r = ' + k) },
      { q: 'Work out the minimum surface area. Give your answer as a multiple of ' + M('\\pi') + '.', m: 2, a: M('2\\pi(' + k + ')^2 + \\frac{' + 2 * V + '\\pi}{' + k + '} = ' + 6 * k * k + '\\pi') + ' cm²' }
    ] };
  });

  /* 37. A rational function: inverse, composite, fixed points */
  add(function () {
    var a, c, p, Dd; do { a = ri(2, 5); c = ri(1, 4); p = nz(-6, 9); Dd = sq(a + c) + 4 * p; } while (a === c || Dd <= 0 || isSq(Dd) || a * c + p === 0);
    var f = '\\frac{' + poly([a, p]) + '}{' + poly([1, -c]) + '}', finv = '\\frac{' + poly([c, p]) + '}{' + poly([1, -a]) + '}';
    var g = ri(2, 5);
    return { stem: M('\\mathrm{f}(x) = ' + f) + ', ' + M('x \\ne ' + c) + ', and ' + M('\\mathrm{g}(x) = ' + g + 'x') + '.', parts: [
      { q: 'Find ' + M('\\mathrm{f}^{-1}(x)') + '.', m: 3, a: M('y(x - ' + c + ') = ' + poly([a, p]) + ' \\Rightarrow xy - ' + a + 'x = ' + poly([c, p], 'y') + ' \\Rightarrow \\mathrm{f}^{-1}(x) = ' + finv) },
      { q: 'Find ' + M('\\mathrm{fg}(x)') + '. Simplify your answer.', m: 2, a: M('\\mathrm{fg}(x) = \\frac{' + poly([a * g, p]) + '}{' + poly([g, -c]) + '}') },
      { q: 'Solve ' + M('\\mathrm{f}(x) = x') + '. Give your answers in the form ' + M('\\frac{m \\pm \\sqrt{n}}{2}') + '.', m: 4, a: M(poly([a, p]) + ' = ' + poly([1, -c, 0]) + ' \\Rightarrow ' + poly([1, -(a + c), -p]) + ' = 0 \\Rightarrow x = \\frac{' + (a + c) + ' \\pm \\sqrt{' + Dd + '}}{2}') }
    ] };
  });

  BS.topic({ id: 'last-q', name: 'Last-question problems', video: 'hardest igcse maths questions explained', gens: GENS });
  BS.topics['last-q'].noMix = true;
})(typeof window !== 'undefined' ? window : globalThis);
