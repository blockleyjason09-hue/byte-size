/* Byte Size — Last-question problems: extremely challenging, multi-step questions in the style of the final questions on a GCSE / IGCSE Higher paper. */
(function (g) {
  var BS = g.BS, D = BS.draw, G = BS.gcse2;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, sf = BS.sf, num = BS.num, M = BS.m, rad = BS.deg;
  var surd = G.surd, vex = G.vex;
  function deg(x) { return x * 180 / Math.PI; }
  function q1(q, m, a, stem) { return { stem: stem, parts: [{ q: q, m: m, a: a }] }; }

  BS.topic({ id: 'last-q', name: 'Last-question problems (extremely challenging)', video: 'hardest GCSE maths questions explained', gens: [
    { d: [1, 2, 3], f: function () { // line meets circle
      var R = pick([5, 10, 13]), base5 = [[3, 4], [4, 3], [5, 0], [0, 5]], pts = [];
      var b = R === 13 ? [[5, 12], [12, 5], [13, 0], [0, 13]] : base5.map(function (p) { return R === 10 ? [p[0] * 2, p[1] * 2] : p; });
      b.forEach(function (p) { [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (s) { var q = [p[0] * s[0], p[1] * s[1]]; if (!pts.some(function (t) { return t[0] === q[0] && t[1] === q[1]; })) pts.push(q); }); });
      var P1, P2; do { P1 = pick(pts); P2 = pick(pts); } while (P1[0] === P2[0] || P1[1] === P2[1] || (P1[0] === -P2[0] && P1[1] === -P2[1]));
      var a = P2[1] - P1[1], bb = -(P2[0] - P1[0]), c = a * P1[0] + bb * P1[1], k = gcd(gcd(a, bb), c) || gcd(a, bb); a /= k; bb /= k; c /= k; if (a < 0) { a = -a; bb = -bb; c = -c; }
      var eq = (a === 1 ? '' : a) + 'x' + (bb < 0 ? ' - ' : ' + ') + (Math.abs(bb) === 1 ? '' : Math.abs(bb)) + 'y = ' + c;
      var srt = [P1, P2].sort(function (u, v) { return u[0] - v[0]; }), L2 = (P1[0] - P2[0]) * (P1[0] - P2[0]) + (P1[1] - P2[1]) * (P1[1] - P2[1]);
      var p = D.plane({ xmin: -R - 2, xmax: R + 2, ymin: -R - 2, ymax: R + 2, w: 300, h: 300 });
      var s = p.svg + '<circle cx="' + p.X(0) + '" cy="' + p.Y(0) + '" r="' + (p.X(R) - p.X(0)) + '" class="thin"/>' + p.curve(function (x) { return (c - a * x) / bb; }, -R - 2, R + 2);
      return { stem: 'The circle ' + M('C') + ' has equation ' + M('x^2 + y^2 = ' + R * R) + '. The line ' + M('L') + ' has equation ' + M(eq) + '. ' + M('L') + ' meets ' + M('C') + ' at the points ' + M('A') + ' and ' + M('B') + '.' + D.svg(300, 300, s, 'Line and circle', true), parts: [
        { q: 'Find the coordinates of ' + M('A') + ' and ' + M('B') + '.', m: 5, a: M('(' + srt[0].join(',\\ ') + ')') + ' and ' + M('(' + srt[1].join(',\\ ') + ')') },
        { q: 'Find the length of ' + M('AB') + '. Give your answer as a surd in its simplest form.', m: 2, a: M('\\sqrt{' + L2 + '} = ' + surd(L2)) }
      ] };
    } },
    { d: [1, 2, 3], f: function () { // probability leading to a quadratic
      var k = ri(3, 6), n = ri(4, 12), num_ = n * (n - 1), den = (n + k) * (n + k - 1), gg = gcd(num_, den), p = num_ / gg, q = den / gg;
      var A = q - p, B = q + p * (2 * k - 1), C = p * k * (k - 1), h = gcd(gcd(A, B), C); A /= h; B /= h; C /= h;
      return { stem: 'A bag contains ' + M('n') + ' red counters and ' + k + ' blue counters. Two counters are taken at random, without replacement. The probability that both counters are red is ' + M(frac(p, q)) + '.', parts: [
        { q: 'Show that ' + M((A === 1 ? '' : A) + 'n^2 - ' + B + 'n - ' + C + ' = 0') + '.', m: 4, a: M('\\frac{n}{n + ' + k + '} \\times \\frac{n - 1}{n + ' + (k - 1) + '} = ' + frac(p, q)) + ', then multiply out and rearrange.' },
        { q: 'Find the value of ' + M('n') + '.', m: 2, a: M('n = ' + n) + ' (the other solution is negative)' },
        { q: 'Find the probability that the two counters are different colours.', m: 2, a: M(frac(2 * n * k, (n + k) * (n + k - 1))) }
      ] };
    } },
    { d: [1, 2, 3], f: function () { // vector proof
      var fig = D.geo({ pts: { O: [0, 0], A: [4.4, 0.8], B: [1.2, 3], M: [2.2, 0.4], N: [2.27, 2.27], X: [2.4, 6] }, segs: [['O', 'A'], ['A', 'B'], ['O', 'X'], ['M', 'X', 'accentdash']], vecs: [['O', 'B']], dots: ['M', 'N'],
        slabels: [{ p: 'O', q: 'A', t: 'a' }, { p: 'O', q: 'B', t: 'b' }], w: 300, h: 300, label: 'Vector proof' });
      return { stem: M('OAB') + ' is a triangle. ' + M('\\overrightarrow{OA} = \\mathbf{a}') + ' and ' + M('\\overrightarrow{OB} = \\mathbf{b}') + '. ' + M('M') + ' is the midpoint of ' + M('OA') + '. ' + M('N') + ' is the point on ' + M('AB') + ' such that ' + M('AN : NB = 2 : 1') + '. ' + M('OB') + ' is extended to ' + M('X') + ' so that ' + M('OB = BX') + '.' + fig, parts: [
        { q: 'Find ' + M('\\overrightarrow{MN}') + ' in terms of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '.', m: 3, a: M('\\overrightarrow{ON} = \\tfrac{1}{3}\\mathbf{a} + \\tfrac{2}{3}\\mathbf{b}') + ', so ' + M('\\overrightarrow{MN} = -\\tfrac{1}{6}\\mathbf{a} + \\tfrac{2}{3}\\mathbf{b}') },
        { q: 'Prove that ' + M('M') + ', ' + M('N') + ' and ' + M('X') + ' lie on a straight line.', m: 3, a: M('\\overrightarrow{MX} = -\\tfrac{1}{2}\\mathbf{a} + 2\\mathbf{b} = 3\\overrightarrow{MN}') + ', so ' + M('MX') + ' is parallel to ' + M('MN') + ' and they share point ' + M('M') + '.' },
        { q: 'Write down the ratio ' + M('MN : NX') + '.', m: 1, a: M('1 : 2') }
      ] };
    } },
    { d: [1, 2, 3], f: function () { // frustum
      var t = pick([[1, 3], [1, 2], [2, 3], [1, 4]]), R = t[1] * ri(2, 4), H = t[1] * ri(3, 6), r = R * t[0] / t[1], h = H * t[0] / t[1];
      var kBig = R * R * H / 3, kSmall = r * r * h / 3, kF = kBig - kSmall;
      var fig = D.geo({ pts: { V: [0, H], A: [-R, 0], B: [R, 0], C: [-r, H - h], D: [r, H - h] }, segs: [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D'], ['C', 'V', 'dash'], ['D', 'V', 'dash']], nolabel: ['V', 'A', 'B', 'C', 'D'],
        extra: function (Tf) { var m1 = Tf([0, 0]), m2 = Tf([0, H - h]), m3 = Tf([0, H]); return D.line(m1[0], m1[1], m3[0], m3[1], 'dash') + D.text(m1[0] + 30, m1[1] + 14, R + ' cm', { size: 12 }) + D.text(m2[0] + 18, m2[1] - 8, r + ' cm', { size: 12 }) + D.text(m1[0] - 6, (m1[1] + m2[1]) / 2, (H - h) + ' cm', { anchor: 'end', size: 12 }); },
        w: 300, h: 260, label: 'Frustum of a cone' });
      return q1('A frustum is made by removing a small cone from the top of a large cone. The frustum has base radius ' + R + ' cm, top radius ' + r + ' cm and height ' + (H - h) + ' cm.' + fig + 'Work out the volume of the frustum. Give your answer as a multiple of ' + M('\\pi') + '.', 6,
        'Height of large cone ' + M('= ' + H) + ' cm (similar triangles). Volume ' + M('= \\tfrac{1}{3}\\pi(' + R + ')^2(' + H + ') - \\tfrac{1}{3}\\pi(' + r + ')^2(' + h + ') = ' + frac(R * R * H - r * r * h, 3) + '\\pi') + ' cm³ (' + sf(kF * Math.PI, 3) + ' cm³)');
    } },
    { d: [1, 2, 3], f: function () { // equilateral triangle with three sectors
      var s = 2 * ri(2, 7), a = s * s / 4, b = s * s / 8;
      var A = [0, 0], B = [s, 0], C = [s / 2, s * Math.sqrt(3) / 2];
      var fig = D.geo({ pts: { A: A, B: B, C: C }, polys: [['A', 'B', 'C']], w: 280, h: 250, label: 'Triangle with three sectors',
        extra: function (Tf, sc) { var r = s / 2 * sc, out = ''; [[A, B, C], [B, C, A], [C, A, B]].forEach(function (tr) { var V = Tf(tr[0]), P = Tf([(tr[0][0] + tr[1][0]) / 2, (tr[0][1] + tr[1][1]) / 2]), Q = Tf([(tr[0][0] + tr[2][0]) / 2, (tr[0][1] + tr[2][1]) / 2]);
          var cr = (P[0] - V[0]) * (Q[1] - V[1]) - (P[1] - V[1]) * (Q[0] - V[0]);
          out += D.path('M' + V[0] + ',' + V[1] + 'L' + P[0] + ',' + P[1] + 'A' + r + ',' + r + ' 0 0 ' + (cr > 0 ? 1 : 0) + ' ' + Q[0] + ',' + Q[1] + 'Z', 'cell'); }); return out; } });
      return q1(M('ABC') + ' is an equilateral triangle with sides of length ' + s + ' cm. Three sectors, each of radius ' + s / 2 + ' cm, are drawn with centres ' + M('A') + ', ' + M('B') + ' and ' + M('C') + '.' + fig + 'Work out the area of the region inside the triangle that is not inside any of the sectors. Give your answer in the form ' + M('p\\sqrt{3} - q\\pi') + '.', 5,
        'Triangle ' + M('= ' + num(a) + '\\sqrt{3}') + ', sectors ' + M('= 3 \\times \\frac{60}{360}\\pi(' + s / 2 + ')^2 = ' + num(b) + '\\pi') + '; area ' + M('= ' + num(a) + '\\sqrt{3} - ' + num(b) + '\\pi') + ' (' + sf(a * Math.sqrt(3) - b * Math.PI, 3) + ' cm²)');
    } },
    { d: [1, 2, 3], f: function () { // fg(x) = gf(x)
      var r1, r2; do { r1 = ri(-4, 4); r2 = ri(-4, 5); } while (r1 === r2 || (r1 + r2) % 2);
      var a = (r1 + r2) / 2, b = a * a + a - 2 * r1 * r2;
      return { stem: M('\\mathrm{f}(x) = 2x' + (a === 0 ? '' : sg(-a))) + ' and ' + M('\\mathrm{g}(x) = x^2' + (b === 0 ? '' : sg(b))) + '.', parts: [
        { q: 'Show that the equation ' + M('\\mathrm{fg}(x) = \\mathrm{gf}(x)') + ' simplifies to ' + M(poly([2, -4 * a, a * a + a - b]) + ' = 0') + '.', m: 4, a: M('\\mathrm{fg}(x) = ' + poly([2, 0, 2 * b - a]) + ',\\ \\mathrm{gf}(x) = ' + poly([4, -4 * a, a * a + b])) + '; subtract and simplify.' },
        { q: 'Hence solve ' + M('\\mathrm{fg}(x) = \\mathrm{gf}(x)') + '.', m: 2, a: M('x = ' + Math.min(r1, r2) + ' \\text{ or } x = ' + Math.max(r1, r2)) }
      ] };
    } },
    { d: [1, 2, 3], f: function () { // calculus: find p and q from a stationary point
      var k, k2; do { k = ri(-3, 3); k2 = ri(-3, 4); } while (k === k2 || (k + k2) % 2 || k === 0);
      var p = -3 * (k + k2) / 2, q = 3 * k * k2, r = ri(-6, 6), y1 = 1 + p + q + r, yk2 = Math.pow(k2, 3) + p * k2 * k2 + q * k2 + r;
      return { stem: 'The curve ' + M('C') + ' has equation ' + M('y = x^3 + px^2 + qx' + (r === 0 ? '' : sg(r))) + ', where ' + M('p') + ' and ' + M('q') + ' are constants. ' + M('C') + ' passes through the point ' + M('(1,\\ ' + y1 + ')') + ' and has a stationary point where ' + M('x = ' + k) + '.', parts: [
        { q: 'Show that ' + M(2 * k + 'p + q = ' + (-3 * k * k)) + ' and ' + M('p + q = ' + (y1 - 1 - r)) + '.', m: 3, a: M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 3x^2 + 2px + q = 0') + ' at ' + M('x = ' + k) + '; substitute ' + M('(1,\\ ' + y1 + ')') + ' into the equation.' },
        { q: 'Find the values of ' + M('p') + ' and ' + M('q') + '.', m: 2, a: M('p = ' + p + ',\\ q = ' + q) },
        { q: 'Find the coordinates of the other stationary point of ' + M('C') + '.', m: 3, a: M('3x^2 + ' + 2 * p + 'x + ' + q + ' = 0').replace(/\+ -/g, '- ') + ' gives ' + M('(' + k2 + ',\\ ' + yk2 + ')') }
      ] };
    } },
    { d: [1, 2, 3], f: function () { // pyramid: angle between face and base
      var s = 2 * ri(3, 8), h = 3 * ri(2, 6), V = s * s * h / 3;
      return { stem: M('VABCD') + ' is a right pyramid with a square base of side ' + s + ' cm. The volume of the pyramid is ' + num(V) + ' cm³. ' + M('M') + ' is the centre of the base.' + D.pyramid(s, 'h'), parts: [
        { q: 'Find the height of the pyramid.', m: 2, a: M('\\tfrac{1}{3} \\times ' + s + '^2 \\times h = ' + V + ' \\Rightarrow h = ' + h) + ' cm' },
        { q: 'Find the angle between the face ' + M('VBC') + ' and the base ' + M('ABCD') + '. Give your answer correct to 1 decimal place.', m: 3, a: M('\\tan^{-1}\\left(\\frac{' + h + '}{' + s / 2 + '}\\right)') + ' = ' + deg(Math.atan(h / (s / 2))).toFixed(1) + '°' },
        { q: 'Find the length of ' + M('VA') + '. Give your answer correct to 3 significant figures.', m: 2, a: sf(Math.sqrt(h * h + s * s / 2), 3) + ' cm' }
      ] };
    } },
    { d: [1, 2, 3], f: function () { // algebraic proof
      var k = ri(2, 7), opts = [
        ['Prove that ' + M('(n + ' + k + ')^2 - (n - ' + k + ')^2') + ' is a multiple of ' + 4 * k + ' for all integers ' + M('n') + '.', M('n^2 + ' + 2 * k + 'n + ' + k * k + ' - (n^2 - ' + 2 * k + 'n + ' + k * k + ') = ' + 4 * k + 'n') + ', which is a multiple of ' + 4 * k + '.'],
        ['Prove that the difference between the squares of two consecutive odd numbers is a multiple of 8.', M('(2n + 1)^2 - (2n - 1)^2 = 8n') + ', which is a multiple of 8.'],
        ['Prove that the product of two consecutive odd numbers is always one less than a multiple of 4.', M('(2n - 1)(2n + 1) = 4n^2 - 1') + ', which is one less than ' + M('4n^2') + ', a multiple of 4.'],
        ['Prove that the sum of the squares of any three consecutive integers is always 2 more than a multiple of 3.', M('(n - 1)^2 + n^2 + (n + 1)^2 = 3n^2 + 2') + ', which is 2 more than a multiple of 3.']
      ], o = pick(opts);
      return { parts: [{ q: o[0], m: 4, a: o[1] }] };
    } },
    { d: [1, 2, 3], f: function () { // sum of an arithmetic series given as quadratic
      var a = ri(1, 4), b = ri(-3, 6), X = ri(50, 200);
      var un = function (n) { return a * (2 * n - 1) + b; }, n = 1; while (un(n) <= X) n++;
      return { stem: 'The sum of the first ' + M('n') + ' terms of a sequence is ' + M('S_n = ' + poly([a, b, 0], 'n').replace(/ \+ 0$/, '')) + '.', parts: [
        { q: 'Find the ' + M('n') + 'th term of the sequence.', m: 3, a: M('u_n = S_n - S_{n-1} = ' + poly([2 * a, b - a], 'n')) },
        { q: 'Prove that the sequence is arithmetic.', m: 2, a: M('u_{n+1} - u_n = ' + 2 * a) + ', a constant, so the sequence is arithmetic.' },
        { q: 'Find the first term of the sequence that is greater than ' + X + '.', m: 2, a: M('u_{' + n + '} = ' + un(n)) }
      ] };
    } },
    { d: [1, 2, 3], f: function () { // rectangle area leads to quadratic
      var p, q, A, Dd; do { p = ri(1, 7); q = ri(1, 5); A = ri(20, 90); Dd = Math.pow(p - 2 * q, 2) + 8 * (p * q + A); } while (Math.sqrt(Dd) === Math.round(Math.sqrt(Dd)));
      var x = (-(p - 2 * q) + Math.sqrt(Dd)) / 4;
      var fig = D.geo({ pts: { A: [0, 0], B: [6, 0], C: [6, 3], D: [0, 3] }, polys: [['A', 'B', 'C', 'D']], nolabel: ['A', 'B', 'C', 'D'], slabels: [{ p: 'A', q: 'B', t: '(2x + ' + p + ') cm' }, { p: 'B', q: 'C', t: '(x − ' + q + ') cm' }], w: 300, h: 180, label: 'Rectangle' });
      return { stem: 'A rectangle has length ' + M('(2x + ' + p + ')') + ' cm and width ' + M('(x - ' + q + ')') + ' cm. Its area is ' + A + ' cm².' + fig, parts: [
        { q: 'Show that ' + M(poly([2, p - 2 * q, -(p * q + A)]) + ' = 0') + '.', m: 2, a: M('(2x + ' + p + ')(x - ' + q + ') = ' + A) + ', expand and rearrange.' },
        { q: 'Find the perimeter of the rectangle. Give your answer correct to 3 significant figures.', m: 4, a: M('x = ' + sf(x, 4)) + ' (the other root makes the width negative); perimeter ' + M('= 6x' + (p === q ? '' : sg(2 * p - 2 * q))) + ' = ' + sf(6 * x + 2 * p - 2 * q, 3) + ' cm' }
      ] };
    } },
    { d: [1, 2, 3], f: function () { // two tangents, kite and region
      var tr = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [9, 12, 15], [7, 24, 25]]), r = tr[0], t = tr[1], d = tr[2];
      var half = Math.asin(r / d), apb = 2 * deg(half), aob = 180 - apb;
      var P = [0, -d / r], T1 = D.onCircle(-90 - aob / 2), T2 = D.onCircle(-90 + aob / 2);
      var fig = D.geo({ pts: { O: [0, 0], A: T1, B: T2, P: P }, circle: [0, 0, 1], segs: [['P', 'A'], ['P', 'B'], ['O', 'A'], ['O', 'B'], ['O', 'P', 'dash']], dots: ['O'], w: 260, h: 320,
        slabels: [{ p: 'O', q: 'A', t: r + ' cm' }], label: 'Two tangents from P' });
      var kite = r * t, sector = aob / 360 * Math.PI * r * r;
      return { stem: M('PA') + ' and ' + M('PB') + ' are tangents to a circle with centre ' + M('O') + ' and radius ' + r + ' cm. ' + M('OP = ' + d) + ' cm.' + fig, parts: [
        { q: 'Find the length of ' + M('PA') + '.', m: 2, a: M('\\sqrt{' + d + '^2 - ' + r + '^2} = ' + t) + ' cm' },
        { q: 'Find the area of the kite ' + M('OAPB') + '.', m: 2, a: M('2 \\times \\tfrac{1}{2} \\times ' + r + ' \\times ' + t + ' = ' + kite) + ' cm²' },
        { q: 'Find the area of the region inside the kite but outside the circle. Give your answer correct to 3 significant figures.', m: 4, a: 'Angle ' + M('AOB = ' + aob.toFixed(2) + '^\\circ') + '; ' + M(kite + ' - \\frac{' + aob.toFixed(2) + '}{360}\\pi(' + r + ')^2') + ' = ' + sf(kite - sector, 3) + ' cm²' }
      ] };
    } },
    { d: [1, 2, 3], f: function () { // bounds in a formula
      var l = ri(50, 250) / 100, gv = pick([9.8, 9.81]);
      var lu = l + 0.005, ll = l - 0.005, gu = gv === 9.8 ? 9.85 : 9.815, gl = gv === 9.8 ? 9.75 : 9.805;
      var Tu = 2 * Math.PI * Math.sqrt(lu / gl), Tl = 2 * Math.PI * Math.sqrt(ll / gu);
      return { stem: 'The time, ' + M('T') + ' seconds, for one swing of a pendulum is ' + M('T = 2\\pi\\sqrt{\\frac{l}{g}}') + '. ' + M('l = ' + l.toFixed(2)) + ' m, correct to the nearest centimetre. ' + M('g = ' + gv) + ' m/s², correct to ' + (gv === 9.8 ? '1 decimal place' : '2 decimal places') + '.', parts: [
        { q: 'Work out the upper bound for ' + M('T') + '. Give your answer correct to 5 significant figures.', m: 3, a: M('2\\pi\\sqrt{\\frac{' + lu.toFixed(3) + '}{' + gl + '}}') + ' = ' + sf(Tu, 5) },
        { q: 'By considering bounds, write down the value of ' + M('T') + ' to a suitable degree of accuracy. Give a reason.', m: 2, a: (function () { var n = 4; while (n > 0 && sf(Tu, n) !== sf(Tl, n)) n--; return 'Lower bound ' + sf(Tl, 5) + '. ' + (n ? 'Both bounds round to ' + sf(Tu, n) + ' (' + n + ' s.f.), so ' + M('T = ' + sf(Tu, n)) + '.' : 'The bounds do not agree even to 1 s.f.'); })() }
      ] };
    } }
  ] });
  BS.topics['last-q'].noMix = true;
})(typeof window !== 'undefined' ? window : globalThis);
