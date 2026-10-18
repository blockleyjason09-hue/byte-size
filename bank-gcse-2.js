/* Byte Size — GCSE / International GCSE: additional topics with diagrams.
   Difficulty: 1 = Foundation, 2 = Core, 3 = Accelerated. */
(function (g) {
  var BS = g.BS, D = BS.draw;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br,
      sf = BS.sf, dp = BS.dp, money = BS.money, num = BS.num, M = BS.m, rad = BS.deg;
  var T = BS.topic;
  var G = BS.gcse2 = {};
  function q1(q, m, a, stem) { return { stem: stem, parts: [{ q: q, m: m, a: a }] }; }
  function cv(a) { return '\\begin{pmatrix} ' + a.join(' \\\\ ') + ' \\end{pmatrix}'; }
  var surd = G.surd = function (N) { var k = 1, m = N; for (var f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; k *= f; } return m === 1 ? String(k) : (k === 1 ? '' : k) + '\\sqrt{' + m + '}'; };
  // vector expression c1 a + c2 b with fractional coefficients [n, d]
  var vex = G.vex = function (terms) {
    var s = '';
    terms.forEach(function (t) {
      var n = t[0], d = t[1], v = t[2]; if (n === 0) return;
      var k = gcd(n, d); n /= k; d /= k; if (d < 0) { n = -n; d = -d; }
      var c = (Math.abs(n) === 1 && d === 1) ? '' : frac(Math.abs(n), d);
      s += (s === '' ? (n < 0 ? '-' : '') : (n < 0 ? ' - ' : ' + ')) + c + '\\mathbf{' + v + '}';
    });
    return s || '\\mathbf{0}';
  };
  function deg(x) { return x * 180 / Math.PI; }
  function chordEnds(E, ang) { // unit circle, line through E with direction ang (degrees)
    var u = [Math.cos(rad(ang)), Math.sin(rad(ang))], b = E[0] * u[0] + E[1] * u[1], c = E[0] * E[0] + E[1] * E[1] - 1, r = Math.sqrt(b * b - c);
    return [[E[0] + (-b - r) * u[0], E[1] + (-b - r) * u[1]], [E[0] + (-b + r) * u[0], E[1] + (-b + r) * u[1]]];
  }
  G.chordEnds = chordEnds;

  /* ================= VECTORS ================= */
  T({ id: 'vectors', name: 'Vectors', video: 'corbettmaths vectors', gens: [
    { d: [1], f: function () {
      var a = [nz(-6, 6), nz(-6, 6)], b = [nz(-6, 6), nz(-6, 6)], m2 = a[0] * a[0] + a[1] * a[1];
      return { stem: M('\\mathbf{a} = ' + cv(a)) + ' and ' + M('\\mathbf{b} = ' + cv(b)) + '.', parts: [
        { q: 'Find ' + M('2\\mathbf{a} + \\mathbf{b}') + ' as a column vector.', m: 1, a: M(cv([2 * a[0] + b[0], 2 * a[1] + b[1]])) },
        { q: 'Find ' + M('\\mathbf{a} - 3\\mathbf{b}') + ' as a column vector.', m: 1, a: M(cv([a[0] - 3 * b[0], a[1] - 3 * b[1]])) },
        { q: 'Find ' + M('|\\mathbf{a}|') + '. Give your answer as a surd in its simplest form.', m: 2, a: M('\\sqrt{' + m2 + '} = ' + surd(m2)) }
      ] };
    } },
    { d: [1, 2], f: function () {
      var a = [nz(-4, 4), nz(-3, 4)], b = [nz(-4, 4), nz(-3, 4)], pa = [ri(1, 3) + (a[0] < 0 ? 4 : 0), ri(1, 3) + (a[1] < 0 ? 4 : 0)], pb = [ri(1, 3) + (b[0] < 0 ? 4 : 0), ri(1, 3) + (b[1] < 0 ? 4 : 0)];
      pb[0] += 4;
      var p = D.plane({ xmin: 0, xmax: 12, ymin: 0, ymax: 9, w: 340, h: 270, grid: true });
      var s = p.svg + D.arrow(p.X(pa[0]), p.Y(pa[1]), p.X(pa[0] + a[0]), p.Y(pa[1] + a[1]), 'accent') + D.text(p.X(pa[0] + a[0] / 2) - 10, p.Y(pa[1] + a[1] / 2) - 8, 'a', { cls: 'it' }) +
        D.arrow(p.X(pb[0]), p.Y(pb[1]), p.X(pb[0] + b[0]), p.Y(pb[1] + b[1]), 'accent') + D.text(p.X(pb[0] + b[0] / 2) + 10, p.Y(pb[1] + b[1] / 2) - 8, 'b', { cls: 'it' });
      return { stem: 'The vectors ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + ' are drawn on the grid.' + D.svg(340, 270, s, 'Vectors on a grid', true), parts: [
        { q: 'Write ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + ' as column vectors.', m: 2, a: M('\\mathbf{a} = ' + cv(a) + ',\\ \\mathbf{b} = ' + cv(b)) },
        { q: 'Find ' + M('\\mathbf{a} + \\mathbf{b}') + ' as a column vector.', m: 1, a: M(cv([a[0] + b[0], a[1] + b[1]])) }
      ] };
    } },
    { d: [2], f: function () {
      var m = ri(1, 3), n = ri(1, 4); while (m === n || gcd(m, n) > 1) n = ri(1, 4);
      var O = [0, 0], A = [5.2, 0.6], B = [1.4, 4.2], Pp = [B[0] * m / (m + n), B[1] * m / (m + n)], Mm = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      var fig = D.geo({ pts: { O: O, A: A, B: B, M: Mm, P: Pp }, segs: [['O', 'A'], ['O', 'B'], ['A', 'B'], ['P', 'M', 'dash']], vecs: [['O', 'A'], ['O', 'B']], dots: ['M', 'P'],
        slabels: [{ p: 'O', q: 'A', t: 'a' }, { p: 'O', q: 'B', t: 'b' }] });
      return { stem: M('OAB') + ' is a triangle. ' + M('\\overrightarrow{OA} = \\mathbf{a}') + ' and ' + M('\\overrightarrow{OB} = \\mathbf{b}') + '. ' + M('M') + ' is the midpoint of ' + M('AB') + ' and ' + M('P') + ' is the point on ' + M('OB') + ' such that ' + M('OP : PB = ' + m + ' : ' + n) + '.' + fig, parts: [
        { q: 'Find ' + M('\\overrightarrow{AB}') + ' in terms of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '.', m: 1, a: M(vex([[-1, 1, 'a'], [1, 1, 'b']])) },
        { q: 'Find ' + M('\\overrightarrow{OM}') + ' in terms of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '.', m: 2, a: M(vex([[1, 2, 'a'], [1, 2, 'b']])) },
        { q: 'Find ' + M('\\overrightarrow{PM}') + ' in terms of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '. Simplify your answer.', m: 2, a: M(vex([[1, 2, 'a'], [n - m, 2 * (m + n), 'b']])) }
      ] };
    } },
    { d: [3], f: function () {
      var u, v; do { u = ri(1, 5); v = ri(1, 5); } while (gcd(u, v) !== 1 || u === v);
      var Pp = [(5.2 * u + 1.4 * v) / (u + v), (0.6 * u + 4.2 * v) / (u + v)];
      var fig = D.geo({ pts: { O: [0, 0], A: [5.2, 0.6], B: [1.4, 4.2], P: Pp }, segs: [['O', 'A'], ['O', 'B'], ['A', 'B'], ['O', 'P', 'dash']], vecs: [['O', 'A'], ['O', 'B']], dots: ['P'],
        slabels: [{ p: 'O', q: 'A', t: 'a' }, { p: 'O', q: 'B', t: 'b' }] });
      return { stem: M('\\overrightarrow{OA} = \\mathbf{a}') + ' and ' + M('\\overrightarrow{OB} = \\mathbf{b}') + '. ' + M('P') + ' is the point on ' + M('AB') + ' such that ' + M('AP : PB = k : 1') + '.' + fig, parts: [
        { q: 'Show that ' + M('\\overrightarrow{OP} = \\frac{1}{k + 1}\\mathbf{a} + \\frac{k}{k + 1}\\mathbf{b}') + '.', m: 2, a: M('\\overrightarrow{OP} = \\mathbf{a} + \\frac{k}{k + 1}(\\mathbf{b} - \\mathbf{a})') },
        { q: M('\\overrightarrow{OP}') + ' is parallel to the vector ' + M(vex([[u, 1, 'a'], [v, 1, 'b']])) + '. Find the value of ' + M('k') + '.', m: 3, a: M('\\frac{k}{1} = \\frac{' + v + '}{' + u + '} \\Rightarrow k = ' + frac(v, u)) }
      ] };
    } },
    { d: [3], f: function () {
      var fig = D.geo({ pts: { O: [0, 0], A: [5, 0], B: [6.6, 3.2], C: [1.6, 3.2], D: [5.8, 1.6], E: [4.4, 2.133] }, segs: [['O', 'A'], ['A', 'B'], ['B', 'C'], ['C', 'O'], ['O', 'B', 'dash'], ['C', 'D', 'accentdash']], vecs: [['O', 'A'], ['O', 'C']], dots: ['D', 'E'],
        slabels: [{ p: 'O', q: 'A', t: 'a' }, { p: 'O', q: 'C', t: 'c' }] });
      return { stem: M('OABC') + ' is a parallelogram. ' + M('\\overrightarrow{OA} = \\mathbf{a}') + ' and ' + M('\\overrightarrow{OC} = \\mathbf{c}') + '. ' + M('D') + ' is the midpoint of ' + M('AB') + '. ' + M('E') + ' is the point on ' + M('OB') + ' such that ' + M('OE : EB = 2 : 1') + '.' + fig, parts: [
        { q: 'Find ' + M('\\overrightarrow{CE}') + ' in terms of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{c}') + '.', m: 2, a: M('\\overrightarrow{OE} = \\tfrac{2}{3}(\\mathbf{a} + \\mathbf{c})') + ', so ' + M('\\overrightarrow{CE} = \\tfrac{2}{3}\\mathbf{a} - \\tfrac{1}{3}\\mathbf{c}') },
        { q: 'Prove that ' + M('C') + ', ' + M('E') + ' and ' + M('D') + ' lie on a straight line.', m: 3, a: M('\\overrightarrow{ED} = \\mathbf{a} + \\tfrac{1}{2}\\mathbf{c} - \\tfrac{2}{3}(\\mathbf{a} + \\mathbf{c}) = \\tfrac{1}{3}\\mathbf{a} - \\tfrac{1}{6}\\mathbf{c} = \\tfrac{1}{2}\\overrightarrow{CE}') + '. The vectors are parallel and share point ' + M('E') + ', so ' + M('C, E, D') + ' are collinear.' }
      ] };
    } }
  ] });

  /* ================= CIRCLE THEOREMS ================= */
  function circ(pts, segs, angles, extra) { // points given as degrees on unit circle, or [x,y]
    var P = { O: [0, 0] };
    Object.keys(pts).forEach(function (k) { P[k] = Array.isArray(pts[k]) ? pts[k] : D.onCircle(pts[k]); });
    return D.geo(Object.assign({ pts: P, circle: [0, 0, 1], segs: segs, angles: angles, dots: ['O'], w: 300, h: 280, label: 'Circle diagram' }, extra || {}));
  }
  T({ id: 'circle-theorems', name: 'Circle theorems', video: 'corbettmaths circle theorems', gens: [
    { d: [1, 2], f: function () {
      var x = ri(25, 75), A = 220, B = 220 + 2 * x, C = 40 + x, giveX = Math.random() < 0.6;
      var fig = circ({ A: A, B: B, C: C }, [['O', 'A'], ['O', 'B'], ['C', 'A'], ['C', 'B']], [{ v: 'C', a: 'A', b: 'B', t: giveX ? x + '°' : 'x' }, { v: 'O', a: 'A', b: 'B', t: giveX ? 'y' : 2 * x + '°' }]);
      return q1(M('A') + ', ' + M('B') + ' and ' + M('C') + ' are points on a circle with centre ' + M('O') + '.' + fig + (giveX ? 'Angle ' + M('ACB = ' + x + '^\\circ') + '. Find the size of angle ' + M('AOB') + ', marked ' + M('y') + '.' : 'Angle ' + M('AOB = ' + 2 * x + '^\\circ') + '. Find the size of angle ' + M('ACB') + ', marked ' + M('x') + '.') + ' Give a reason for your answer.', 2,
        (giveX ? M('y = ' + 2 * x + '^\\circ') : M('x = ' + x + '^\\circ')) + '. The angle at the centre is twice the angle at the circumference.');
    } },
    { d: [1, 2], f: function () {
      var y = ri(28, 64), t = Math.tan(rad(y));
      var fig = D.geo({ pts: { O: [0, 0], A: [0, -1], P: [t, -1] }, circle: [0, 0, 1], segs: [['O', 'A'], ['O', 'P']], lines: [['A', 'P', 0.5, 0.25]], dots: ['O'],
        angles: [{ v: 'A', a: 'O', b: 'P', right: true }, { v: 'O', a: 'A', b: 'P', t: y + '°' }, { v: 'P', a: 'A', b: 'O', t: 'x', d: 36 }], w: 300, h: 260, label: 'Tangent to a circle' });
      return q1(M('A') + ' is a point on a circle with centre ' + M('O') + '. ' + M('PA') + ' is a tangent to the circle at ' + M('A') + '. Angle ' + M('AOP = ' + y + '^\\circ') + '.' + fig + 'Find the size of angle ' + M('APO') + ', marked ' + M('x') + '. Give reasons for your answer.', 3,
        M('x = 180 - 90 - ' + y + ' = ' + (90 - y) + '^\\circ') + '. A tangent meets a radius at 90°; angles in a triangle add up to 180°.');
    } },
    { d: [2], f: function () {
      var m = ri(30, 70), A = 270 - m, B = 270 + m, C = ri(35, 70), Dd = ri(110, 145);
      var fig = circ({ A: A, B: B, C: C, D: Dd }, [['A', 'C'], ['B', 'C'], ['A', 'D'], ['B', 'D']], [{ v: 'D', a: 'A', b: 'B', t: m + '°' }, { v: 'C', a: 'A', b: 'B', t: 'x' }], { dots: [], nolabel: ['O'] });
      return q1(M('A') + ', ' + M('B') + ', ' + M('C') + ' and ' + M('D') + ' are points on a circle. Angle ' + M('ADB = ' + m + '^\\circ') + '.' + fig + 'Find the size of angle ' + M('ACB') + ', marked ' + M('x') + '. Give a reason for your answer.', 2,
        M('x = ' + m + '^\\circ') + '. Angles in the same segment are equal.');
    } },
    { d: [2], f: function () {
      var x = ri(58, 122), b = ri(-60, 20);
      var fig = circ({ B: b, C: b + x, D: b + 2 * x, A: b + x + 180 }, [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']], [{ v: 'A', a: 'B', b: 'D', t: x + '°' }, { v: 'C', a: 'B', b: 'D', t: 'y' }], { dots: [], nolabel: ['O'] });
      return q1(M('ABCD') + ' is a cyclic quadrilateral. Angle ' + M('DAB = ' + x + '^\\circ') + '.' + fig + 'Find the size of angle ' + M('BCD') + ', marked ' + M('y') + '. Give a reason for your answer.', 2,
        M('y = 180 - ' + x + ' = ' + (180 - x) + '^\\circ') + '. Opposite angles of a cyclic quadrilateral add up to 180°.');
    } },
    { d: [3], f: function () {
      var x = 2 * ri(15, 36), A = [0, -1], B = D.onCircle(-90 + 2 * x), C = D.onCircle(90 + x);
      var fig = D.geo({ pts: { O: [0, 0], A: A, B: B, C: C, S: [-1.5, -1], T: [1.5, -1] }, circle: [0, 0, 1], segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['S', 'T']], dots: ['O'],
        angles: [{ v: 'A', a: 'T', b: 'B', t: x + '°', d: 34 }, { v: 'C', a: 'A', b: 'B', t: 'y', d: 34 }], w: 300, h: 280, label: 'Alternate segment theorem' });
      return { stem: M('A') + ', ' + M('B') + ' and ' + M('C') + ' are points on a circle with centre ' + M('O') + '. ' + M('SAT') + ' is a tangent to the circle at ' + M('A') + '. Angle ' + M('TAB = ' + x + '^\\circ') + '.' + fig, parts: [
        { q: 'Find the size of angle ' + M('ACB') + ', marked ' + M('y') + '. Give a reason for your answer.', m: 2, a: M('y = ' + x + '^\\circ') + '. Alternate segment theorem.' },
        { q: 'Find the size of angle ' + M('AOB') + '. Give a reason.', m: 2, a: M(2 * x + '^\\circ') + '. The angle at the centre is twice the angle at the circumference.' },
        { q: 'Find the size of angle ' + M('OAB') + '.', m: 2, a: M('\\frac{180 - ' + 2 * x + '}{2} = ' + (90 - x) + '^\\circ') + ' (triangle ' + M('OAB') + ' is isosceles).' }
      ] };
    } },
    { d: [3], f: function () {
      var a = ri(50, 110), fig;
      var P = [0, -1 / Math.cos(rad(90 - a / 2))], T1 = D.onCircle(-90 - (90 - a / 2)), T2 = D.onCircle(-90 + (90 - a / 2));
      fig = D.geo({ pts: { O: [0, 0], A: T1, B: T2, P: P }, circle: [0, 0, 1], segs: [['P', 'A'], ['P', 'B'], ['O', 'A'], ['O', 'B']], dots: ['O'],
        angles: [{ v: 'P', a: 'A', b: 'B', t: a + '°', d: 30 }, { v: 'O', a: 'A', b: 'B', t: 'x' }], w: 280, h: 300, label: 'Two tangents' });
      return q1(M('PA') + ' and ' + M('PB') + ' are tangents to the circle with centre ' + M('O') + '. Angle ' + M('APB = ' + a + '^\\circ') + '.' + fig + 'Find the size of angle ' + M('AOB') + ', marked ' + M('x') + '. Give reasons for your answer.', 3,
        M('x = 360 - 90 - 90 - ' + a + ' = ' + (180 - a) + '^\\circ') + '. Tangents meet radii at 90°; angles in a quadrilateral add up to 360°.');
    } }
  ] });

  /* ================= INTERSECTING CHORDS ================= */
  function chordFig(labels) {
    var E = [0.14, -0.1], c1 = chordEnds(E, 22), c2 = chordEnds(E, 118);
    return D.geo({ pts: { A: c1[0], B: c1[1], C: c2[0], D: c2[1], E: E }, circle: [0, 0, 1], segs: [['A', 'B'], ['C', 'D']], dots: ['E'], lab: { E: [12, 12] },
      slabels: [{ p: 'A', q: 'E', t: labels[0] }, { p: 'E', q: 'B', t: labels[1] }, { p: 'C', q: 'E', t: labels[2] }, { p: 'E', q: 'D', t: labels[3] }], w: 300, h: 280, label: 'Intersecting chords' });
  }
  function secantFig(lab, tangent) {
    var P = [-2.3, -0.35], dir1 = 21, out = chordEnds(P, dir1), s = { P: P, A: out[0], B: out[1] };
    var sl = [{ p: 'P', q: 'A', t: lab[0], flip: true }, { p: 'A', q: 'B', t: lab[1], flip: true }];
    var segs = [['P', 'B']];
    if (tangent) {
      var d = Math.hypot(P[0], P[1]), ang = Math.atan2(P[1], P[0]), ph = Math.acos(1 / d);
      s.T = [Math.cos(ang + ph), Math.sin(ang + ph)]; segs.push(['P', 'T']); sl.push({ p: 'P', q: 'T', t: lab[2] });
    } else {
      var o2 = chordEnds(P, -4); s.C = o2[0]; s.D = o2[1]; segs.push(['P', 'D']);
      sl.push({ p: 'P', q: 'C', t: lab[2] }, { p: 'C', q: 'D', t: lab[3] });
    }
    return D.geo({ pts: s, circle: [0, 0, 1], segs: segs, w: 320, h: 240, slabels: sl, label: tangent ? 'Tangent and secant' : 'Two secants' });
  }
  T({ id: 'intersecting-chords', name: 'Intersecting chords, secants and tangents', video: 'intersecting chords theorem igcse', gens: [
    { d: [2, 3], f: function () {
      var a, b, c, d; do { a = ri(2, 12); b = ri(2, 12); c = ri(2, 12); d = a * b / c; } while (d !== Math.round(d) || c === a || c === b || d > 20);
      return q1('The chords ' + M('AB') + ' and ' + M('CD') + ' intersect at ' + M('E') + '. ' + M('AE = ' + a) + ' cm, ' + M('EB = ' + b) + ' cm and ' + M('CE = ' + c) + ' cm.' + chordFig([a + ' cm', b + ' cm', c + ' cm', 'x cm']) + 'Find the length of ' + M('ED') + ', marked ' + M('x') + '.', 2,
        M(a + ' \\times ' + b + ' = ' + c + 'x \\Rightarrow x = ' + d) + ' cm');
    } },
    { d: [2, 3], f: function () {
      var p, q, r, s; do { p = ri(2, 8); q = ri(3, 12); r = ri(2, 9); s = p * (p + q) / r - r; } while (s <= 0 || s !== Math.round(s) || r === p || s > 20);
      return q1('Two lines from ' + M('P') + ' meet a circle at ' + M('A') + ' and ' + M('B') + ', and at ' + M('C') + ' and ' + M('D') + '. ' + M('PA = ' + p) + ' cm, ' + M('AB = ' + q) + ' cm and ' + M('PC = ' + r) + ' cm.' + secantFig([p + ' cm', q + ' cm', r + ' cm', 'x cm']) + 'Find the length of ' + M('CD') + ', marked ' + M('x') + '.', 3,
        M(p + ' \\times ' + (p + q) + ' = ' + r + '(' + r + ' + x) \\Rightarrow x = ' + s) + ' cm');
    } },
    { d: [3], f: function () {
      var p = ri(2, 9), q = ri(3, 14), N = p * (p + q);
      return q1(M('PT') + ' is a tangent to the circle at ' + M('T') + '. The line from ' + M('P') + ' meets the circle at ' + M('A') + ' and ' + M('B') + '. ' + M('PA = ' + p) + ' cm and ' + M('AB = ' + q) + ' cm.' + secantFig([p + ' cm', q + ' cm', 'x cm'], true) + 'Find the length of ' + M('PT') + ', marked ' + M('x') + '. Give your answer in surd form if necessary.', 3,
        M('x^2 = ' + p + ' \\times ' + (p + q) + ' = ' + N + ' \\Rightarrow x = ' + surd(N)) + ' cm' + (surd(N).indexOf('sqrt') > -1 ? ' (' + sf(Math.sqrt(N), 3) + ' cm)' : ''));
    } },
    { d: [3], f: function () {
      var x = ri(2, 9), k = ri(1, 6), N = x * (x + k), divs = [];
      for (var m = 2; m < N; m++) if (N % m === 0 && m !== x && m !== x + k) divs.push(m);
      if (!divs.length) { x = 3; k = 5; N = 24; divs = [4, 6]; }
      var c = pick(divs), d = N / c;
      return q1('The chords ' + M('AB') + ' and ' + M('CD') + ' intersect at ' + M('E') + '. ' + M('AE = x') + ' cm, ' + M('EB = (x + ' + k + ')') + ' cm, ' + M('CE = ' + c) + ' cm and ' + M('ED = ' + d) + ' cm.' + chordFig(['x', 'x + ' + k, c + ' cm', d + ' cm']) + 'Find the length of the chord ' + M('AB') + '.', 4,
        M('x(x + ' + k + ') = ' + N + ' \\Rightarrow ' + poly([1, k, -N]) + ' = 0 \\Rightarrow x = ' + x) + ', so ' + M('AB = ' + (2 * x + k)) + ' cm');
    } }
  ] });

  /* ================= SIMILAR SHAPES ================= */
  T({ id: 'similar-shapes', name: 'Similar shapes: lengths, areas and volumes', video: 'corbettmaths similar shapes area and volume', gens: [
    { d: [1, 2], f: function () {
      var k = pick([1.5, 2, 2.5, 3]), a = ri(3, 8), b = ri(4, 10), c = ri(3, 9);
      var t = [[0, 0], [4, 0], [1.3, 2.4]];
      var P = { A: t[0], B: t[1], C: t[2], P: [6 + t[0][0] * k * 0.8, t[0][1] * k * 0.8], Q: [6 + t[1][0] * k * 0.8, t[1][1] * k * 0.8], R: [6 + t[2][0] * k * 0.8, t[2][1] * k * 0.8] };
      var fig = D.geo({ pts: P, polys: [['A', 'B', 'C'], ['P', 'Q', 'R']], slabels: [{ p: 'A', q: 'B', t: a + ' cm' }, { p: 'B', q: 'C', t: b + ' cm' }, { p: 'P', q: 'Q', t: num(a * k) + ' cm' }, { p: 'Q', q: 'R', t: 'x cm' }, { p: 'R', q: 'P', t: num(c * k) + ' cm' }, { p: 'C', q: 'A', t: 'y cm' }], w: 340, h: 220, label: 'Similar triangles' });
      return { stem: 'Triangles ' + M('ABC') + ' and ' + M('PQR') + ' are similar.' + fig, parts: [
        { q: 'Find the value of ' + M('x') + '.', m: 2, a: M('x = ' + b + ' \\times ' + num(k) + ' = ' + num(b * k)) },
        { q: 'Find the value of ' + M('y') + '.', m: 2, a: M('y = ' + num(c * k) + ' \\div ' + num(k) + ' = ' + c) }
      ] };
    } },
    { d: [2, 3], f: function () {
      var a, b, d, e; do { a = ri(3, 9); b = ri(2, 9); d = ri(4, 12); } while ((d * (a + b)) % a !== 0);
      e = a * ri(1, 2); var ec = e * b / a;
      var A = [2, 5], B = [0, 0], C = [6, 0], t = a / (a + b), Dp = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t], Ep = [A[0] + (C[0] - A[0]) * t, A[1] + (C[1] - A[1]) * t];
      var fig = D.geo({ pts: { A: A, B: B, C: C, D: Dp, E: Ep }, segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['D', 'E']], par: [['D', 'E', 1], ['B', 'C', 1]],
        slabels: [{ p: 'A', q: 'D', t: a + ' cm' }, { p: 'D', q: 'B', t: b + ' cm' }, { p: 'D', q: 'E', t: d + ' cm' }], w: 300, h: 260, label: 'Triangle with parallel line' });
      return { stem: M('D') + ' lies on ' + M('AB') + ' and ' + M('E') + ' lies on ' + M('AC') + '. ' + M('DE') + ' is parallel to ' + M('BC') + '.' + fig, parts: [
        { q: 'Find the length of ' + M('BC') + '.', m: 2, a: M(d + ' \\times \\frac{' + (a + b) + '}{' + a + '} = ' + num(d * (a + b) / a)) + ' cm' },
        { q: M('AE = ' + e) + ' cm. Find the length of ' + M('EC') + '.', m: 2, a: num(ec) + ' cm' }
      ] };
    } },
    { d: [3], f: function () {
      var kk = pick([[3, 2], [2, 1], [5, 2], [3, 1], [4, 3], [5, 3]]), p = kk[0], q = kk[1], m = ri(2, 9) * 5, n = ri(2, 12) * 2;
      return q1('Two bottles are mathematically similar. The surface area of the small bottle is ' + q * q * m + ' cm² and the surface area of the large bottle is ' + p * p * m + ' cm². The volume of the large bottle is ' + num(p * p * p * n) + ' cm³.<br>Find the volume of the small bottle.', 4,
        'Area factor ' + M(frac(p * p, q * q)) + ', length factor ' + M(frac(p, q)) + ', volume factor ' + M(frac(p * p * p, q * q * q)) + '; volume = ' + num(q * q * q * n) + ' cm³');
    } }
  ] });

  /* ================= TRANSFORMATIONS ================= */
  var SHAPES = [[[0, 0], [2, 0], [0, 3]], [[0, 0], [3, 0], [3, 1], [1, 1], [1, 2], [0, 2]], [[0, 0], [3, 0], [3, 1], [0, 2]], [[0, 0], [1, 0], [1, 2], [2, 2], [2, 3], [0, 3]]];
  function inRange(pts) { return pts.every(function (p) { return p[0] >= -7 && p[0] <= 7 && p[1] >= -7 && p[1] <= 7; }); }
  function apart(A, B) { // bounding boxes do not overlap
    function bb(P) { var xs = P.map(function (p) { return p[0]; }), ys = P.map(function (p) { return p[1]; }); return [Math.min.apply(null, xs), Math.max.apply(null, xs), Math.min.apply(null, ys), Math.max.apply(null, ys)]; }
    var a = bb(A), b = bb(B); return a[1] <= b[0] || b[1] <= a[0] || a[3] <= b[2] || b[3] <= a[2];
  }
  function pt(p) { return '(' + p[0] + ', ' + p[1] + ')'; }
  T({ id: 'transformations', name: 'Transformations', video: 'corbettmaths describing transformations', gens: [
    { d: [1], f: function () {
      var A, B, desc, lines = [];
      for (;;) {
        var base = pick(SHAPES), off = [ri(-6, 3), ri(-6, 3)]; A = base.map(function (p) { return [p[0] + off[0], p[1] + off[1]]; });
        var t = pick(['tr', 'x', 'y', 'yx', 'ynx']);
        if (t === 'tr') { var v = [nz(-6, 6), nz(-6, 6)]; B = A.map(function (p) { return [p[0] + v[0], p[1] + v[1]]; }); desc = 'Translation by ' + M(cv(v)); lines = []; }
        else if (t === 'x') { var c = ri(-2, 2); B = A.map(function (p) { return [2 * c - p[0], p[1]]; }); desc = 'Reflection in the line ' + M('x = ' + c); lines = [[c, -7, c, 7]]; }
        else if (t === 'y') { var c2 = ri(-2, 2); B = A.map(function (p) { return [p[0], 2 * c2 - p[1]]; }); desc = 'Reflection in the line ' + M('y = ' + c2); lines = [[-7, c2, 7, c2]]; }
        else if (t === 'yx') { B = A.map(function (p) { return [p[1], p[0]]; }); desc = 'Reflection in the line ' + M('y = x'); lines = [[-7, -7, 7, 7]]; }
        else { B = A.map(function (p) { return [-p[1], -p[0]]; }); desc = 'Reflection in the line ' + M('y = -x'); lines = [[-7, 7, 7, -7]]; }
        if (inRange(A) && inRange(B) && apart(A, B)) break;
      }
      return q1('Shape ' + M('A') + ' and shape ' + M('B') + ' are drawn on the grid.' + D.gridShapes([{ pts: A, name: 'A' }, { pts: B, name: 'B', cls: 'image' }], -7, 7) + 'Describe fully the single transformation that maps shape ' + M('A') + ' onto shape ' + M('B') + '.', 2, desc);
    } },
    { d: [2], f: function () {
      var A, B, desc;
      for (;;) {
        var base = pick(SHAPES), off = [ri(-6, 4), ri(-6, 4)]; A = base.map(function (p) { return [p[0] + off[0], p[1] + off[1]]; });
        var c = [ri(-3, 3), ri(-3, 3)], t = pick(['acw', 'cw', 'half']);
        if (t === 'acw') { B = A.map(function (p) { return [c[0] - (p[1] - c[1]), c[1] + (p[0] - c[0])]; }); desc = 'Rotation, 90° anticlockwise, centre ' + M(pt(c)); }
        else if (t === 'cw') { B = A.map(function (p) { return [c[0] + (p[1] - c[1]), c[1] - (p[0] - c[0])]; }); desc = 'Rotation, 90° clockwise, centre ' + M(pt(c)); }
        else { B = A.map(function (p) { return [2 * c[0] - p[0], 2 * c[1] - p[1]]; }); desc = 'Rotation, 180°, centre ' + M(pt(c)); }
        if (inRange(A) && inRange(B) && apart(A, B)) break;
      }
      return q1('Shape ' + M('A') + ' and shape ' + M('B') + ' are drawn on the grid.' + D.gridShapes([{ pts: A, name: 'A' }, { pts: B, name: 'B', cls: 'image' }], -7, 7) + 'Describe fully the single transformation that maps shape ' + M('A') + ' onto shape ' + M('B') + '.', 3, desc);
    } },
    { d: [3], f: function () {
      var A, B, desc;
      for (;;) {
        var k = pick([2, 3, 0.5]), base = pick(SHAPES.slice(0, 3)).map(function (p) { return k === 0.5 ? [p[0] * 2, p[1] * 2] : p; });
        var c = [ri(-5, 5), ri(-5, 5)], off = [ri(-6, 5), ri(-6, 5)];
        if (k === 0.5) off = [c[0] + 2 * ri(-3, 2) - 0, c[1] + 2 * ri(-3, 2)];
        A = base.map(function (p) { return [p[0] + off[0], p[1] + off[1]]; });
        B = A.map(function (p) { return [c[0] + k * (p[0] - c[0]), c[1] + k * (p[1] - c[1])]; });
        desc = 'Enlargement, scale factor ' + (k === 0.5 ? M('\\frac{1}{2}') : M(String(k))) + ', centre ' + M(pt(c));
        if (inRange(A) && inRange(B) && apart(A, B) && B.every(function (p) { return p[0] === Math.round(p[0]) && p[1] === Math.round(p[1]); })) break;
      }
      return q1('Shape ' + M('A') + ' and shape ' + M('B') + ' are drawn on the grid.' + D.gridShapes([{ pts: A, name: 'A' }, { pts: B, name: 'B', cls: 'image' }], -7, 7) + 'Describe fully the single transformation that maps shape ' + M('A') + ' onto shape ' + M('B') + '.', 3, desc);
    } }
  ] });

  /* ================= ANGLES AND PARALLEL LINES ================= */
  T({ id: 'angles-parallel', name: 'Angles and parallel lines', video: 'corbettmaths angles in parallel lines', gens: [
    { d: [1, 2], f: function () {
      var th = ri(35, 145), dx = 2 / Math.tan(rad(th)), Q = [2.5, 0], P = [2.5 + dx, 2];
      var type = pick(['alt', 'corr', 'co']);
      var pts = { L1: [-0.5, 2], R1: [6, 2], L2: [-0.5, 0], R2: [6, 0], P: P, Q: Q, U: [P[0] + dx * 0.45, 2.9], W: [Q[0] - dx * 0.45, -0.9] };
      var angs = [{ v: 'Q', a: 'R2', b: 'P', t: th + '°', d: 32 }];
      if (type === 'alt') angs.push({ v: 'P', a: 'L1', b: 'Q', t: 'x', d: 32 });
      if (type === 'corr') angs.push({ v: 'P', a: 'R1', b: 'U', t: 'x', d: 32 });
      if (type === 'co') angs.push({ v: 'P', a: 'R1', b: 'Q', t: 'x', d: 32 });
      var fig = D.geo({ pts: pts, segs: [['L1', 'R1'], ['L2', 'R2'], ['W', 'U']], par: [['L1', 'R1', 1], ['L2', 'R2', 1]], angles: angs, nolabel: ['L1', 'R1', 'L2', 'R2', 'U', 'W', 'P', 'Q'], w: 320, h: 220, label: 'Parallel lines' });
      var ans = type === 'co' ? (180 - th) : th, reason = type === 'alt' ? 'Alternate angles are equal.' : type === 'corr' ? 'Corresponding angles are equal.' : 'Co-interior angles add up to 180°.';
      return q1('The diagram shows two parallel lines crossed by a straight line.' + fig + 'Find the size of the angle marked ' + M('x') + '. Give a reason for your answer.', 2, M('x = ' + ans + '^\\circ') + '. ' + reason);
    } },
    { d: [2, 3], f: function () {
      var a = 2 * ri(15, 50), base = (180 - a) / 2;
      var A = [3, 4], B = [3 - 4 / Math.tan(rad(base)), 0], C = [3 + 4 / Math.tan(rad(base)), 0];
      var fig = D.geo({ pts: { A: A, B: B, C: C, D: [A[0] - 3.2, 4], E: [A[0] + 3.2, 4] }, segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['D', 'E']], par: [['D', 'E', 1], ['B', 'C', 1]],
        angles: [{ v: 'A', a: 'B', b: 'C', t: a + '°', d: 32 }, { v: 'A', a: 'D', b: 'B', t: 'x', d: 30 }], w: 320, h: 240, label: 'Isosceles triangle and parallel line' });
      return q1(M('ABC') + ' is an isosceles triangle with ' + M('AB = AC') + '. ' + M('DAE') + ' is a straight line parallel to ' + M('BC') + '. Angle ' + M('BAC = ' + a + '^\\circ') + '.' + fig + 'Find the size of angle ' + M('DAB') + ', marked ' + M('x') + '. Give reasons for your answer.', 3,
        'Base angles ' + M('= \\frac{180 - ' + a + '}{2} = ' + base + '^\\circ') + ' (isosceles triangle); ' + M('x = ' + base + '^\\circ') + ' (alternate angles).');
    } }
  ] });

  /* ================= SPEED-TIME AND DISTANCE-TIME GRAPHS ================= */
  T({ id: 'kinematic-graphs', name: 'Distance–time and speed–time graphs', video: 'corbettmaths speed time graphs', gens: [
    { d: [1], f: function () {
      var t1 = ri(1, 3) * 10, d1 = ri(2, 6) * 2, rest = ri(1, 2) * 10, t3 = ri(2, 4) * 10, tot = t1 + rest + t3;
      var g = D.lineGraph([[0, 0], [t1, d1], [t1 + rest, d1], [tot, 0]], { xmax: tot + 10, ymax: d1 + 2, xstep: 10, ystep: 2, grid: true, gx: 5, gy: 1, xl: 'Time (minutes)', yl: 'Distance from home (km)' });
      return { stem: 'The distance–time graph shows Sam’s journey from home to a shop and back.' + g, parts: [
        { q: 'How long did Sam spend at the shop?', m: 1, a: rest + ' minutes' },
        { q: 'Work out Sam’s speed on the way to the shop, in km/h.', m: 2, a: M('\\frac{' + d1 + '}{' + t1 + '/60}') + ' = ' + num(d1 / (t1 / 60)) + ' km/h' }
      ] };
    } },
    { d: [1, 2], f: function () {
      var V = 2 * ri(3, 10), t1 = 5 * ri(1, 4), t2 = 5 * ri(2, 6), t3 = 5 * ri(1, 4), tot = t1 + t2 + t3;
      var g = D.lineGraph([[0, 0], [t1, V], [t1 + t2, V], [tot, 0]], { xmax: tot + 5, ymax: V + 4, xstep: 5, ystep: V > 12 ? 4 : 2, grid: true, gx: 5, gy: 2, xl: 'Time (s)', yl: 'Speed (m/s)' });
      var dist = V * (t1 / 2 + t2 + t3 / 2);
      return { stem: 'The speed–time graph shows the first ' + tot + ' seconds of a cyclist’s journey.' + g, parts: [
        { q: 'Work out the acceleration during the first ' + t1 + ' seconds.', m: 2, a: num(Number(sf(V / t1, 3))) + ' m/s²' },
        { q: 'Work out the total distance travelled.', m: 3, a: num(dist) + ' m' },
        { q: 'Work out the average speed for the whole journey.', m: 1, a: sf(dist / tot, 3) + ' m/s' }
      ] };
    } },
    { d: [3], f: function () {
      var V = 2 * ri(4, 12), t1 = 2 * ri(3, 10), t3 = 2 * ri(3, 10), Tt = ri(10, 60), Dist = V * (t1 / 2 + Tt + t3 / 2);
      var fig = D.geo({ pts: { O: [0, 0], A: [2, 2], B: [6, 2], C: [8, 0], Vv: [0, 2], X1: [2, 0], X2: [6, 0] }, segs: [['O', 'C', 'ax'], ['O', 'Vv', 'ax'], ['O', 'A', 'accent'], ['A', 'B', 'accent'], ['B', 'C', 'accent'], ['A', 'X1', 'dash'], ['B', 'X2', 'dash'], ['Vv', 'A', 'dash']],
        nolabel: ['O', 'A', 'B', 'C', 'Vv', 'X1', 'X2'], extra: function (Tf) { var a = Tf([0, 2]), b = Tf([1, 0]), c = Tf([4, 0]), d = Tf([7, 0]), o = Tf([0, 0]), e = Tf([8, 0]);
          return D.text(a[0] - 10, a[1], V, { anchor: 'end', size: 12 }) + D.text(b[0], b[1] + 14, t1 + ' s', { anchor: 'middle', size: 12 }) + D.text(c[0], c[1] + 14, 'T s', { anchor: 'middle', size: 12, cls: 'it' }) + D.text(d[0], d[1] + 14, t3 + ' s', { anchor: 'middle', size: 12 }) + D.text(o[0] - 8, o[1] + 12, 'O', { anchor: 'middle', size: 12 }) + D.text(e[0] + 4, e[1] + 14, 'time', { size: 11 }) + D.text(a[0] - 10, a[1] - 26, 'speed (m/s)', { size: 11 }); },
        w: 330, h: 220, label: 'Speed-time graph' });
      return q1('A train accelerates uniformly from rest to ' + V + ' m/s in ' + t1 + ' seconds. It then travels at ' + V + ' m/s for ' + M('T') + ' seconds, before decelerating uniformly to rest in ' + t3 + ' seconds. The total distance travelled is ' + num(Dist) + ' m.' + fig + 'Work out the value of ' + M('T') + '.', 4,
        M(V + '\\left(\\frac{' + t1 + '}{2} + T + \\frac{' + t3 + '}{2}\\right) = ' + Dist + ' \\Rightarrow T = ' + Tt));
    } }
  ] });

  /* ================= STATISTICAL DIAGRAMS ================= */
  T({ id: 'stats-diagrams', name: 'Histograms, cumulative frequency and charts', video: 'corbettmaths histograms', gens: [
    { d: [2, 3], f: function () {
      var b = [0, 10, 20, 25, 30, 40, 60], fd, f;
      do { fd = [ri(1, 6) * 0.5, ri(2, 8) * 0.5, ri(1, 8), ri(1, 8), ri(2, 8) * 0.5, ri(1, 6) * 0.5]; f = fd.map(function (v, i) { return v * (b[i + 1] - b[i]); }); } while (f.some(function (v) { return v !== Math.round(v); }));
      var tot = f.reduce(function (s, v) { return s + v; }, 0);
      var over = f[5] / 2;
      return { stem: 'The histogram shows information about the times, ' + M('t') + ' minutes, that some people took to complete a puzzle.' + D.histogram(b, fd, 'Time (minutes)', 'Frequency density', 1, 10), parts: [
        { q: 'How many people took between 20 and 25 minutes?', m: 1, a: String(f[2]) },
        { q: 'Work out the total number of people.', m: 2, a: String(tot) },
        { q: 'Work out an estimate for the number of people who took more than 50 minutes.', m: 2, a: num(over) }
      ] };
    } },
    { d: [2, 3], f: function () {
      var f = [ri(2, 8), ri(6, 14), ri(10, 20), ri(8, 16), ri(3, 10), ri(1, 5)], cf = [0];
      f.forEach(function (v) { cf.push(cf[cf.length - 1] + v); });
      var N = cf[6], pts = cf.map(function (c, i) { return [i * 10, c]; });
      function inv(target) { for (var i = 1; i < pts.length; i++) if (pts[i][1] >= target) { var a = pts[i - 1], b2 = pts[i]; return a[0] + (target - a[1]) / (b2[1] - a[1]) * (b2[0] - a[0]); } return 60; }
      var med = inv(N / 2), lq = inv(N / 4), uq = inv(3 * N / 4);
      var g = D.lineGraph(pts, { xmax: 60, ymax: Math.ceil((N + 5) / 10) * 10, xstep: 10, ystep: 10, grid: true, gx: 5, gy: 5, dots: true, xl: 'Time (minutes)', yl: 'Cumulative frequency' });
      return { stem: 'The cumulative frequency graph shows the times that ' + N + ' customers waited at a call centre.' + g, parts: [
        { q: 'Use the graph to find an estimate for the median time.', m: 1, a: 'About ' + med.toFixed(1) + ' minutes (accept a reading close to this)' },
        { q: 'Use the graph to find an estimate for the interquartile range.', m: 2, a: 'About ' + (uq - lq).toFixed(1) + ' minutes (UQ ≈ ' + uq.toFixed(1) + ', LQ ≈ ' + lq.toFixed(1) + ')' }
      ] };
    } }
  ] });

  /* ================= SETS AND VENN DIAGRAMS ================= */
  T({ id: 'sets', name: 'Sets and Venn diagrams', video: 'corbettmaths venn diagrams set notation', gens: [
    { d: [1, 2], f: function () {
      var c = [ri(3, 15), ri(2, 10), ri(3, 15), ri(2, 10)], N = c[0] + c[1] + c[2] + c[3];
      return { stem: 'The Venn diagram shows the number of elements in sets ' + M('A') + ' and ' + M('B') + '.' + D.venn(c, ['A', 'B']), parts: [
        { q: 'Find ' + M('n(A \\cap B)') + '.', m: 1, a: String(c[1]) },
        { q: 'Find ' + M("n(A \\cup B)'") + '.', m: 1, a: String(c[3]) },
        { q: 'Find ' + M("n(A' \\cap B)") + '.', m: 1, a: String(c[2]) },
        { q: 'An element is chosen at random. Find the probability that it is in ' + M('A') + ', given that it is in ' + M('B') + '.', m: 2, a: M(frac(c[1], c[1] + c[2])) }
      ] };
    } },
    { d: [2, 3], f: function () {
      var k = ri(1, 6), c1 = ri(2, 8), c2 = ri(2, 8), c3 = ri(2, 8), c4 = ri(5, 15), c5 = ri(2, 9), x = ri(2, 8);
      var N = 2 * x + (x + k) + c4 + c1 + c2 + c3 + x + c5, only = 2 * x + (x + k) + c4;
      return { stem: 'Some students were asked whether they play football (' + M('F') + '), hockey (' + M('H') + ') or tennis (' + M('T') + '). There are ' + N + ' students altogether.' + D.venn3({ a: '2x', b: 'x + ' + k, c: String(c4), ab: String(c1), ac: String(c2), bc: String(c3), abc: 'x', out: String(c5) }, ['F', 'H', 'T']), parts: [
        { q: 'Find the value of ' + M('x') + '.', m: 2, a: M('4x + ' + (N - 4 * x) + ' = ' + N + ' \\Rightarrow x = ' + x) },
        { q: 'A student is chosen at random. Find the probability that they play exactly one of the three sports.', m: 2, a: M(frac(only, N)) }
      ] };
    } }
  ] });

  /* ================= COMPOUND MEASURES ================= */
  T({ id: 'compound-measures', name: 'Speed, density and pressure', video: 'corbettmaths compound measures', gens: [
    { d: [1], f: function () {
      var h = ri(1, 3), m = pick([15, 20, 30, 40, 45]), sp, dist; do { sp = pick([36, 40, 48, 52, 60, 64, 72, 80]); dist = sp * (h * 60 + m) / 60; } while (dist !== Math.round(dist));
      var hrs = m % 15 === 0 ? num(h + m / 60) : '\\frac{' + (3 * h + m / 20) + '}{3}';
      return q1('A car travels ' + num(dist) + ' km in ' + h + ' hour' + (h > 1 ? 's' : '') + ' ' + m + ' minutes. Work out its average speed in km/h.', 3, M(h + '\\text{ h } ' + m + '\\text{ min} = ' + hrs + '\\text{ hours}') + '; ' + M(num(dist) + ' \\div ' + hrs) + ' = ' + sp + ' km/h');
    } },
    { d: [1, 2], f: function () {
      var dens = pick([0.8, 1.2, 2.5, 7.8, 8.9, 11.3]), V = ri(20, 400);
      return { stem: 'A metal block has a volume of ' + V + ' cm³. The density of the metal is ' + dens + ' g/cm³.', parts: [
        { q: 'Work out the mass of the block in grams.', m: 2, a: num(Math.round(dens * V * 100) / 100) + ' g' },
        { q: 'Give your answer in kilograms.', m: 1, a: num(Math.round(dens * V * 100) / 100000) + ' kg' }
      ] };
    } },
    { d: [2, 3], f: function () {
      var F = 10 * ri(20, 200), a = ri(2, 8) * 10, b = ri(2, 8) * 10, kmh = pick([36, 54, 72, 90, 108]);
      return { parts: [
        { q: 'A box exerts a force of ' + F + ' newtons on a floor. The base of the box is a rectangle measuring ' + a + ' cm by ' + b + ' cm. Work out the pressure on the floor in N/m².', m: 3, a: M(F + ' \\div (' + a / 100 + ' \\times ' + b / 100 + ')') + ' = ' + sf(F / (a * b / 10000), 3) + ' N/m²' },
        { q: 'Change ' + kmh + ' km/h into m/s.', m: 2, a: M(kmh + ' \\times 1000 \\div 3600 = ' + kmh / 3.6) + ' m/s' }
      ] };
    } }
  ] });

  /* ================= DIAGRAM VERSIONS OF EXISTING TOPICS ================= */
  function add(id, gen) { if (BS.topics[id]) BS.topics[id].gens.push(gen); }
  add('pythagoras-trig', { d: [1, 2], f: function (d) {
    var a = ri(4, 14), b = ri(4, 14);
    var fig = D.triangle([[0, 0], [a, 0], [a, b]], { names: ['A', 'B', 'C'], right: 1, sides: [a + ' cm', b + ' cm', 'x cm'] });
    return q1('The diagram shows a right-angled triangle ' + M('ABC') + '.' + fig + 'Work out the value of ' + M('x') + '. Give your answer correct to 1 decimal place.', 3, M('x = \\sqrt{' + a + '^2 + ' + b + '^2}') + ' = ' + Math.hypot(a, b).toFixed(1));
  } });
  add('pythagoras-trig', { d: [2, 3], f: function () {
    var th = ri(22, 68), h = ri(60, 180) / 10, adj = h * Math.cos(rad(th)), opp = h * Math.sin(rad(th)), find = pick(['opp', 'ang']);
    if (find === 'opp') {
      var fig = D.triangle([[0, 0], [adj, 0], [adj, opp]], { names: ['A', 'B', 'C'], right: 1, sides: [null, 'x cm', h + ' cm'], ang: [th + '°', null, null] });
      return q1('The diagram shows a right-angled triangle.' + fig + 'Work out the value of ' + M('x') + '. Give your answer correct to 3 significant figures.', 3, M('x = ' + h + '\\sin ' + th + '^\\circ') + ' = ' + sf(opp, 3));
    }
    var o = ri(30, 120) / 10, a2 = ri(30, 120) / 10;
    var fig2 = D.triangle([[0, 0], [a2, 0], [a2, o]], { names: ['A', 'B', 'C'], right: 1, sides: [a2 + ' cm', o + ' cm', null], ang: ['y', null, null] });
    return q1('The diagram shows a right-angled triangle.' + fig2 + 'Work out the size of the angle marked ' + M('y') + '. Give your answer correct to 1 decimal place.', 3, M('y = \\tan^{-1}\\left(\\frac{' + o + '}{' + a2 + '}\\right)') + ' = ' + deg(Math.atan(o / a2)).toFixed(1) + '°');
  } });
  add('sine-cosine', { d: [2, 3], f: function () {
    var a = ri(6, 15), b = ri(6, 15), C = ri(35, 125), P = [[b, 0], [a * Math.cos(rad(C)), a * Math.sin(rad(C))], [0, 0]];
    var c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(C)));
    var fig = D.triangle(P, { sides: ['x cm', a + ' cm', b + ' cm'], ang: [null, null, C + '°'] });
    return { stem: 'The diagram shows triangle ' + M('ABC') + '.' + fig, parts: [
      { q: 'Work out the value of ' + M('x') + '. Give your answer correct to 3 significant figures.', m: 3, a: sf(c, 3) },
      { q: 'Work out the area of the triangle. Give your answer correct to 3 significant figures.', m: 2, a: sf(0.5 * a * b * Math.sin(rad(C)), 3) + ' cm²' }
    ] };
  } });
  add('circles', { d: [2, 3], f: function () {
    var r = ri(4, 15), th = 5 * ri(6, 30), t = th * Math.PI / 180;
    return { stem: 'The diagram shows a sector ' + M('OAB') + ' of a circle, centre ' + M('O') + '.' + D.sector(t, r + ' cm', th + '°'), parts: [
      { q: 'Work out the area of the sector. Give your answer correct to 3 significant figures.', m: 2, a: sf(th / 360 * Math.PI * r * r, 3) + ' cm²' },
      { q: 'Work out the perimeter of the sector. Give your answer correct to 3 significant figures.', m: 3, a: sf(2 * r + th / 360 * 2 * Math.PI * r, 3) + ' cm' }
    ] };
  } });
  add('circles', { d: [2, 3], f: function () {
    var L = ri(6, 16), W = 2 * ri(2, 5);
    var fig = D.geo({ pts: { A: [0, 0], B: [L, 0], C: [L, W], D: [0, W], Z: [L + W / 2, W / 2] }, segs: [['A', 'B'], ['B', 'C', 'dash'], ['C', 'D'], ['D', 'A']], nolabel: ['A', 'B', 'C', 'D', 'Z'],
      slabels: [{ p: 'A', q: 'B', t: L + ' cm' }, { p: 'D', q: 'A', t: W + ' cm' }],
      extra: function (Tf, sc) { var c = Tf([L, W / 2]), top = Tf([L, W]), bot = Tf([L, 0]); return D.path('M' + top[0] + ',' + top[1] + ' A' + (W / 2 * sc) + ',' + (W / 2 * sc) + ' 0 0 1 ' + bot[0] + ',' + bot[1], 'ln'); },
      lines: [['B', 'C', 0, 0, 'dash']], w: 330, h: 200, label: 'Rectangle with semicircle' });
    return { stem: 'The shape is made from a rectangle and a semicircle.' + fig, parts: [
      { q: 'Work out the area of the shape. Give your answer correct to 3 significant figures.', m: 3, a: sf(L * W + Math.PI * W * W / 8, 3) + ' cm²' },
      { q: 'Work out the perimeter of the shape. Give your answer correct to 3 significant figures.', m: 3, a: sf(2 * L + W + Math.PI * W / 2, 3) + ' cm' }
    ] };
  } });
  add('straight-lines', { d: [1, 2], f: function () {
    var m = pick([1, 2, 3, -1, -2, 0.5]), c = ri(-3, 4), p = D.plane({ xmin: -5, xmax: 5, ymin: -6, ymax: 8, w: 300, h: 300, grid: true, ticks: true, tstep: 1, tstepy: 2 });
    var s = p.svg + p.curve(function (x) { return m * x + c; }, -5, 5);
    return q1('The diagram shows a straight line.' + D.svg(300, 300, s, 'Straight line graph', true) + 'Find the equation of the line.', 3, M('y = ' + (m === 1 ? '' : m === -1 ? '-' : m === 0.5 ? '\\tfrac{1}{2}' : m) + 'x' + (c === 0 ? '' : sg(c))));
  } });
  add('quadratics', { d: [1, 2], f: function () {
    var r1 = ri(-4, 0), r2 = ri(1, 4), k = pick([0, 0, 1, -2]), b = -(r1 + r2), c = r1 * r2 + k;
    // y = x^2 + bx + c; solving y = k gives roots r1, r2
    var f = function (x) { return x * x + b * x + c; }, vy = c - b * b / 4;
    var p = D.plane({ xmin: -5, xmax: 5, ymin: Math.floor(vy) - 1, ymax: Math.max(10, f(-5) < 20 ? 10 : 10), w: 300, h: 300, grid: true, ticks: true, tstep: 1, tstepy: 2 });
    var s = p.svg + p.curve(f, -5, 5);
    return q1('The diagram shows the graph of ' + M('y = ' + poly([1, b, c])) + '.' + D.svg(300, 300, s, 'Quadratic graph', true) + 'Use the graph to find estimates for the solutions of ' + M(poly([1, b, c]) + ' = ' + k) + '.', 2, M('x = ' + r1 + ' \\text{ and } x = ' + r2));
  } });
  add('probability', { d: [2, 3], f: function () {
    var r = ri(2, 7), bl = ri(2, 7), n = r + bl;
    var fig = D.tree({ A: 'R', Ac: 'B', B: 'R', Bc: 'B', p: [r + '/' + n, bl + '/' + n, (r - 1) + '/' + (n - 1), bl + '/' + (n - 1), r + '/' + (n - 1), (bl - 1) + '/' + (n - 1)] });
    return { stem: 'A bag contains ' + r + ' red and ' + bl + ' blue counters. Two counters are taken at random without replacement. The tree diagram shows the probabilities.' + fig, parts: [
      { q: 'Work out the probability that both counters are blue.', m: 2, a: M(frac(bl * (bl - 1), n * (n - 1))) },
      { q: 'Work out the probability that the counters are different colours.', m: 3, a: M(frac(2 * r * bl, n * (n - 1))) }
    ] };
  } });
  add('polygons', { d: [1, 2], f: function () {
    var n = pick([5, 6, 8, 9, 10, 12]), pts = {}, names = 'ABCDEFGHIJKL'.slice(0, n).split('');
    names.forEach(function (nm, i) { pts[nm] = D.onCircle(90 + 360 * i / n); });
    var ext = [pts.A[0] + (pts.A[0] - pts[names[n - 1]][0]) * 0.6, pts.A[1] + (pts.A[1] - pts[names[n - 1]][1]) * 0.6];
    pts.X = ext;
    var segs = names.map(function (nm, i) { return [nm, names[(i + 1) % n]]; }); segs.push(['A', 'X', 'dash']);
    var fig = D.geo({ pts: pts, segs: segs, angles: [{ v: 'A', a: 'X', b: 'B', t: 'e', d: 26 }, { v: 'B', a: 'A', b: 'C', t: 'i', d: 26 }], nolabel: ['X'], w: 280, h: 280, label: 'Regular polygon' });
    return { stem: 'The diagram shows a regular polygon with ' + n + ' sides.' + fig, parts: [
      { q: 'Work out the size of the exterior angle ' + M('e') + '.', m: 1, a: num(360 / n) + '°' },
      { q: 'Work out the size of the interior angle ' + M('i') + '.', m: 1, a: num(180 - 360 / n) + '°' }
    ] };
  } });
  add('volume', { d: [1], f: function () {
    var l = ri(4, 12), w = ri(3, 8), h = ri(2, 9);
    return { stem: 'The diagram shows a cuboid.' + D.cuboid(l, w, h, false), parts: [
      { q: 'Work out the volume of the cuboid.', m: 2, a: l * w * h + ' cm³' },
      { q: 'Work out the total surface area of the cuboid.', m: 2, a: 2 * (l * w + w * h + l * h) + ' cm²' }
    ] };
  } });
})(typeof window !== 'undefined' ? window : globalThis);
