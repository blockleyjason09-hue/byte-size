/* Byte Size — extra GCSE / IGCSE question types: Geometry, Vectors, Transformations, Statistics and Probability. */
(function (g) {
  var BS = g.BS, D = BS.draw, G = BS.gcse2;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br,
      sf = BS.sf, dp = BS.dp, money = BS.money, num = BS.num, M = BS.m, rad = BS.deg;
  var surd = G.surd;
  function q1(q, m, a, stem) { return { stem: stem, parts: [{ q: q, m: m, a: a }] }; }
  function add(id, d, f) { BS.topics[id].gens.push({ d: d, f: f }); }
  function deg(x) { return x * 180 / Math.PI; }
  function cv(a) { return '\\begin{pmatrix} ' + a.join(' \\\\ ') + ' \\end{pmatrix}'; }
  function table(head, rows) {
    return '<div class="qtable"><table><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }

  /* ---------- ANGLES ---------- */
  add('angles-parallel', [1], function () {
    var k = ri(2, 4), x, a; do { x = ri(15, 50); a = 180 - (1 + k) * x; } while (a < 15 || a > 120);
    var P = { O: [0, 0], A: [-3, 0], B: [3, 0], C: D.onCircle(180 - a).map(function (v) { return v * 2.6; }), E: D.onCircle(180 - a - x).map(function (v) { return v * 2.6; }) };
    var fig = D.geo({ pts: P, segs: [['A', 'B'], ['O', 'C'], ['O', 'E']], nolabel: ['O', 'A', 'B', 'C', 'E'], angles: [{ v: 'O', a: 'A', b: 'C', t: a + '°', d: 30 }, { v: 'O', a: 'C', b: 'E', t: 'x', d: 34 }, { v: 'O', a: 'E', b: 'B', t: k + 'x', d: 32 }], w: 300, h: 180, label: 'Angles on a straight line' });
    return q1('The diagram shows angles on a straight line.' + fig + 'Work out the value of ' + M('x') + '.', 2, M((1 + k) + 'x = 180 - ' + a + ' \\Rightarrow x = ' + x) + '°');
  });
  add('angles-parallel', [1], function () {
    var a = ri(60, 130), b = ri(50, 120), c = ri(40, 100); while (a + b + c >= 330) c -= 20;
    var x = 360 - a - b - c;
    return q1('Four angles meet at a point. Three of the angles are ' + a + '°, ' + b + '° and ' + c + '°.<br>Work out the size of the fourth angle.', 2, x + '° (angles around a point add up to 360°)');
  });
  add('angles-parallel', [1, 2], function () {
    var ap = ri(20, 80), base = (180 - ap) / 2, iso = Math.random() < 0.5 && ap % 2 === 0;
    if (iso) return q1('Triangle ' + M('ABC') + ' is isosceles with ' + M('AB = AC') + '. Angle ' + M('BAC = ' + ap + '^\\circ') + '.<br>Work out the size of angle ' + M('ABC') + '. Give a reason.', 2, base + '°. Base angles of an isosceles triangle are equal; angles in a triangle add to 180°.');
    var b2 = ri(30, 100); while (ap + b2 >= 170) b2 -= 20;
    return q1('Two angles of a triangle are ' + ap + '° and ' + b2 + '°.<br>Work out the size of the third angle.', 1, (180 - ap - b2) + '°');
  });
  add('angles-parallel', [2], function () {
    var a = ri(30, 75), b = ri(30, 75), Bi = 180 - a - b, AC = 5 * Math.sin(rad(Bi)) / Math.sin(rad(b));
    var fig = D.geo({ pts: { A: [0, 0], B: [5, 0], C: [AC * Math.cos(rad(a)), AC * Math.sin(rad(a))], D: [7.5, 0] }, segs: [['A', 'D'], ['A', 'C'], ['B', 'C']], nolabel: ['D'],
      angles: [{ v: 'A', a: 'B', b: 'C', t: a + '°' }, { v: 'C', a: 'A', b: 'B', t: b + '°' }, { v: 'B', a: 'D', b: 'C', t: 'x', d: 30 }], w: 300, h: 200, label: 'Exterior angle of a triangle' });
    return q1('The side ' + M('AB') + ' of triangle ' + M('ABC') + ' is extended to ' + M('D') + '.' + fig + 'Work out the size of the exterior angle ' + M('x') + '. Give a reason.', 2, (a + b) + '°. The exterior angle equals the sum of the two interior opposite angles.');
  });
  add('angles-parallel', [2], function () {
    var c, S, x; do { c = BS.shuffle([1, 2, 3, 4, 5, 6, 7]).slice(0, 4); S = c[0] + c[1] + c[2] + c[3]; x = 360 / S; } while (x !== Math.round(x));
    return q1('The angles of a quadrilateral are ' + c.map(function (k) { return M((k === 1 ? '' : k) + 'x'); }).join(', ') + '.<br>Work out the size of the largest angle.', 3, M(S + 'x = 360 \\Rightarrow x = ' + x) + '; largest angle ' + Math.max.apply(null, c) * x + '°');
  });
  add('angles-parallel', [2, 3], function () {
    var b = 5 * ri(2, 70), back = (b + 180) % 360, pad = function (n) { return ('00' + n).slice(-3); };
    return q1('The bearing of ' + M('B') + ' from ' + M('A') + ' is ' + pad(b) + '°.<br>Work out the bearing of ' + M('A') + ' from ' + M('B') + '.', 2, pad(back) + '°');
  });
  add('angles-parallel', [3], function () {
    var x, a, b, c, d; do { x = ri(10, 40); a = ri(2, 5); c = ri(1, a - 1); b = ri(-20, 30); d = (a - c) * x + b; } while (a * x + b < 20 || a * x + b > 160 || d === 0 || b === 0);
    return q1('Two parallel lines are crossed by a transversal. A pair of alternate angles are ' + M('(' + a + 'x' + sg(b) + ')^\\circ') + ' and ' + M('(' + (c === 1 ? '' : c) + 'x' + sg(d) + ')^\\circ') + '.<br>Work out the size of each angle.', 3, M(a + 'x' + sg(b) + ' = ' + (c === 1 ? '' : c) + 'x' + sg(d) + ' \\Rightarrow x = ' + x) + '; each angle is ' + (a * x + b) + '°');
  });

  /* ---------- POLYGONS ---------- */
  add('polygons', [2, 3], function () {
    var n = ri(5, 20);
    return q1('The interior angles of a polygon add up to ' + num((n - 2) * 180) + '°. How many sides does the polygon have?', 2, M('(n - 2) \\times 180 = ' + (n - 2) * 180 + ' \\Rightarrow n = ' + n));
  });
  add('polygons', [2, 3], function () {
    var n = pick([5, 6]), tot = (n - 2) * 180, ang = []; for (var i = 0; i < n - 1; i++) ang.push(ri(90, 150));
    var x = tot - ang.reduce(function (s, v) { return s + v; }, 0); if (x <= 30 || x >= 200) { ang = n === 5 ? [100, 110, 120, 95] : [120, 125, 110, 115, 130]; x = tot - ang.reduce(function (s, v) { return s + v; }, 0); }
    return q1('A ' + (n === 5 ? 'pentagon' : 'hexagon') + ' has angles ' + ang.map(function (v) { return v + '°'; }).join(', ') + ' and ' + M('x') + '.<br>Work out the value of ' + M('x') + '.', 3, 'Sum ' + tot + '°, so ' + M('x = ' + x) + '°');
  });

  /* ---------- PYTHAGORAS AND TRIGONOMETRY ---------- */
  add('pythagoras-trig', [1, 2], function () {
    var tr = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25]]), right = Math.random() < 0.5, s = tr.slice();
    if (!right) s[2] += pick([1, -1]);
    return q1('A triangle has sides ' + s[0] + ' cm, ' + s[1] + ' cm and ' + s[2] + ' cm.<br>Is the triangle right-angled? You must show your working.', 2, M(s[0] + '^2 + ' + s[1] + '^2 = ' + (s[0] * s[0] + s[1] * s[1]) + ',\\ ' + s[2] + '^2 = ' + s[2] * s[2]) + '. ' + (right ? 'They are equal, so it is right-angled.' : 'They are not equal, so it is not right-angled.'));
  });
  add('pythagoras-trig', [2], function () {
    var b = 2 * ri(3, 10), s = ri(b / 2 + 2, b + 6), h = Math.sqrt(s * s - b * b / 4);
    var fig = D.geo({ pts: { A: [-b / 2, 0], B: [b / 2, 0], C: [0, h], M: [0, 0] }, polys: [['A', 'B', 'C']], segs: [['C', 'M', 'dash']], nolabel: ['M'], slabels: [{ p: 'A', q: 'B', t: b + ' cm' }, { p: 'B', q: 'C', t: s + ' cm' }, { p: 'C', q: 'A', t: s + ' cm' }], w: 280, h: 230, label: 'Isosceles triangle' });
    return { stem: 'The diagram shows an isosceles triangle.' + fig, parts: [
      { q: 'Work out the perpendicular height of the triangle. Give your answer correct to 3 significant figures.', m: 3, a: sf(h, 3) + ' cm' },
      { q: 'Work out the area of the triangle. Give your answer correct to 3 significant figures.', m: 1, a: sf(b * h / 2, 3) + ' cm²' }
    ] };
  });
  add('pythagoras-trig', [2, 3], function () {
    var L = ri(5, 12), ang = ri(60, 78);
    return { stem: 'A ladder of length ' + L + ' m leans against a vertical wall. The ladder makes an angle of ' + ang + '° with the horizontal ground.', parts: [
      { q: 'How high up the wall does the ladder reach? Give your answer correct to 3 significant figures.', m: 2, a: sf(L * Math.sin(rad(ang)), 3) + ' m' },
      { q: 'How far is the foot of the ladder from the wall? Give your answer correct to 3 significant figures.', m: 2, a: sf(L * Math.cos(rad(ang)), 3) + ' m' }
    ] };
  });
  add('pythagoras-trig', [3], function () {
    var v = pick([[30, 'sin', '\\frac{1}{2}'], [60, 'cos', '\\frac{1}{2}'], [45, 'tan', '1'], [60, 'sin', '\\frac{\\sqrt{3}}{2}'], [30, 'cos', '\\frac{\\sqrt{3}}{2}'], [60, 'tan', '\\sqrt{3}'], [30, 'tan', '\\frac{1}{\\sqrt{3}}']]);
    var h = 2 * ri(2, 10);
    return { parts: [
      { q: 'Write down the exact value of ' + M('\\' + v[1] + ' ' + v[0] + '^\\circ') + '.', m: 1, a: M(v[2]) },
      { q: 'In a right-angled triangle, the hypotenuse is ' + h + ' cm and one angle is 30°. Without a calculator, find the length of the side opposite the 30° angle.', m: 2, a: M(h + ' \\times \\sin 30^\\circ = ' + h / 2) + ' cm' }
    ] };
  });

  /* ---------- SINE AND COSINE RULES ---------- */
  add('sine-cosine', [2], function () {
    var A, B; do { A = ri(30, 80); B = ri(30, 75); } while (A + B > 150);
    var a = ri(8, 20), b = a * Math.sin(rad(B)) / Math.sin(rad(A)), bb = Math.round(b * 10) / 10;
    var Bc = deg(Math.asin(bb * Math.sin(rad(A)) / a));
    return q1('In triangle ' + M('ABC') + ', ' + M('BC = ' + a) + ' cm, ' + M('AC = ' + bb) + ' cm and angle ' + M('BAC = ' + A + '^\\circ') + '. Angle ' + M('ABC') + ' is acute.<br>Work out the size of angle ' + M('ABC') + '. Give your answer correct to 1 decimal place.', 3,
      M('\\sin B = \\frac{' + bb + '\\sin ' + A + '^\\circ}{' + a + '}') + ', ' + M('B = ' + Bc.toFixed(1) + '^\\circ'));
  });
  add('sine-cosine', [3], function () {
    var a = ri(6, 15), b = ri(6, 15), C = ri(40, 130), c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(C)));
    return q1('In triangle ' + M('PQR') + ', ' + M('PR = ' + b) + ' cm, ' + M('QR = ' + a) + ' cm and angle ' + M('PRQ = ' + C + '^\\circ') + '.<br>Work out the perimeter of the triangle. Give your answer correct to 3 significant figures.', 4, M('PQ = ' + sf(c, 4)) + '; perimeter ' + sf(a + b + c, 3) + ' cm');
  });
  add('sine-cosine', [3], function () {
    var area = ri(20, 80), a = ri(6, 14), b = ri(6, 14), s = 2 * area / (a * b);
    if (s >= 1) { area = Math.floor(a * b / 2 * 0.8); s = 2 * area / (a * b); }
    return q1('Triangle ' + M('ABC') + ' has area ' + area + ' cm². ' + M('AB = ' + a) + ' cm, ' + M('AC = ' + b) + ' cm and angle ' + M('BAC') + ' is acute.<br>Work out the size of angle ' + M('BAC') + '. Give your answer correct to 1 decimal place.', 3,
      M('\\tfrac{1}{2} \\times ' + a + ' \\times ' + b + '\\sin A = ' + area) + ', ' + M('A = ' + deg(Math.asin(s)).toFixed(1) + '^\\circ'));
  });

  /* ---------- CIRCLES ---------- */
  add('circles', [1, 2], function () {
    var C = ri(20, 120);
    return q1('The circumference of a circle is ' + C + ' cm. Work out the radius. Give your answer correct to 3 significant figures.', 2, M('r = \\frac{' + C + '}{2\\pi}') + ' = ' + sf(C / (2 * Math.PI), 3) + ' cm');
  });
  add('circles', [2], function () {
    var R = ri(6, 15), r = ri(2, R - 2);
    var fig = D.geo({ pts: { O: [0, 0], P: [R, 0], Q: [0, r] }, circle: [0, 0, R], dots: ['O'], nolabel: ['P', 'Q'], segs: [['O', 'P'], ['O', 'Q']], slabels: [{ p: 'O', q: 'P', t: R + ' cm', flip: true }, { p: 'O', q: 'Q', t: r + ' cm' }],
      extra: function (Tf, sc) { var c = Tf([0, 0]); return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + r * sc + '" class="thin"/>'; }, w: 260, h: 260, label: 'Ring between two circles' });
    return q1('The diagram shows a ring between two circles with the same centre ' + M('O') + '. The radii are ' + R + ' cm and ' + r + ' cm.' + fig + 'Work out the area of the ring. Give your answer in terms of ' + M('\\pi') + '.', 3, M('\\pi(' + R + '^2 - ' + r + '^2) = ' + (R * R - r * r) + '\\pi') + ' cm²');
  });
  add('circles', [3], function () {
    var r = ri(4, 15), th = 5 * ri(6, 30), L = Math.round(th / 360 * 2 * Math.PI * r * 10) / 10, thc = L / (2 * Math.PI * r) * 360;
    return q1('A sector of a circle has radius ' + r + ' cm and arc length ' + L + ' cm.<br>Work out the angle of the sector. Give your answer correct to 1 decimal place.', 3, M('\\frac{\\theta}{360} \\times 2\\pi(' + r + ') = ' + L) + ', ' + M('\\theta = ' + thc.toFixed(1) + '^\\circ'));
  });

  /* ---------- CIRCLE THEOREMS ---------- */
  add('circle-theorems', [1, 2], function () {
    var x = ri(20, 70), A = D.onCircle(180), B = D.onCircle(0), C = D.onCircle(180 - 2 * (90 - x));
    C = D.onCircle(2 * x); // angle CAB = x when C at 2x
    var fig = D.geo({ pts: { O: [0, 0], A: A, B: B, C: C }, circle: [0, 0, 1], segs: [['A', 'B'], ['A', 'C'], ['B', 'C']], dots: ['O'], angles: [{ v: 'A', a: 'B', b: 'C', t: x + '°', d: 34 }, { v: 'B', a: 'A', b: 'C', t: 'y', d: 30 }], w: 300, h: 260, label: 'Angle in a semicircle' });
    return q1(M('AB') + ' is a diameter of the circle with centre ' + M('O') + '. ' + M('C') + ' is a point on the circle. Angle ' + M('CAB = ' + x + '^\\circ') + '.' + fig + 'Work out the size of angle ' + M('ABC') + ', marked ' + M('y') + '. Give reasons.', 3, M('y = 180 - 90 - ' + x + ' = ' + (90 - x) + '^\\circ') + '. The angle in a semicircle is 90°; angles in a triangle add to 180°.');
  });
  add('circle-theorems', [2], function () {
    var t = ri(30, 140), base = (180 - t) / 2;
    if (t % 2) t++;
    base = (180 - t) / 2;
    var A = D.onCircle(270 - t / 2), B = D.onCircle(270 + t / 2);
    var fig = D.geo({ pts: { O: [0, 0], A: A, B: B }, circle: [0, 0, 1], segs: [['O', 'A'], ['O', 'B'], ['A', 'B']], dots: ['O'], angles: [{ v: 'O', a: 'A', b: 'B', t: t + '°' }, { v: 'A', a: 'O', b: 'B', t: 'x', d: 28 }], w: 260, h: 260, label: 'Isosceles triangle in a circle' });
    return q1(M('A') + ' and ' + M('B') + ' are points on a circle with centre ' + M('O') + '. Angle ' + M('AOB = ' + t + '^\\circ') + '.' + fig + 'Work out the size of angle ' + M('OAB') + ', marked ' + M('x') + '. Give a reason.', 2, M('x = \\frac{180 - ' + t + '}{2} = ' + base + '^\\circ') + '. ' + M('OA = OB') + ' (radii), so triangle ' + M('OAB') + ' is isosceles.');
  });
  add('circle-theorems', [3], function () {
    var x = ri(50, 80), b = -40;
    var fig = D.geo({ pts: { O: [0, 0], B: D.onCircle(b), C: D.onCircle(b + x), D: D.onCircle(b + 2 * x), A: D.onCircle(b + x + 180) }, circle: [0, 0, 1], segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['O', 'B'], ['O', 'D']], dots: ['O'],
      angles: [{ v: 'O', a: 'B', b: 'D', t: 2 * x + '°' }, { v: 'C', a: 'B', b: 'D', t: 'y', d: 28 }], w: 300, h: 280, label: 'Cyclic quadrilateral and centre' });
    return q1(M('A') + ', ' + M('B') + ', ' + M('C') + ' and ' + M('D') + ' are points on a circle with centre ' + M('O') + '. Angle ' + M('BOD = ' + 2 * x + '^\\circ') + '.' + fig + 'Work out the size of angle ' + M('BCD') + ', marked ' + M('y') + '. Give reasons.', 4,
      'Angle ' + M('BAD = ' + x + '^\\circ') + ' (angle at centre is twice angle at circumference); ' + M('y = 180 - ' + x + ' = ' + (180 - x) + '^\\circ') + ' (opposite angles of a cyclic quadrilateral add to 180°).');
  });

  /* ---------- INTERSECTING CHORDS ---------- */
  add('intersecting-chords', [2, 3], function () {
    var tr = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15]]), half = tr[1], d = tr[0], r = tr[2];
    var fig = D.geo({ pts: { O: [0, 0], A: [-half / r, -d / r], B: [half / r, -d / r], M: [0, -d / r] }, circle: [0, 0, 1], segs: [['A', 'B'], ['O', 'M', 'dash'], ['O', 'B']], dots: ['O'], angles: [{ v: 'M', a: 'B', b: 'O', right: true }], w: 260, h: 260, label: 'Chord and radius' });
    return q1('A chord ' + M('AB') + ' of length ' + 2 * half + ' cm is drawn in a circle with centre ' + M('O') + '. The perpendicular distance from ' + M('O') + ' to the chord is ' + d + ' cm.' + fig + 'Work out the radius of the circle.', 3, 'The perpendicular from the centre bisects the chord, so ' + M('r = \\sqrt{' + half + '^2 + ' + d + '^2} = ' + r) + ' cm');
  });

  /* ---------- SIMILAR SHAPES ---------- */
  add('similar-shapes', [1], function () {
    var a = ri(2, 8), k = pick([2, 3, 4, 1.5, 2.5]);
    return q1('Shape ' + M('B') + ' is an enlargement of shape ' + M('A') + '. A side of length ' + a + ' cm on shape ' + M('A') + ' corresponds to a side of length ' + num(a * k) + ' cm on shape ' + M('B') + '.<br>Work out the scale factor of the enlargement.', 1, num(k));
  });
  add('similar-shapes', [2], function () {
    var k = pick([2, 3, 1.5, 2.5, 4]), A = ri(5, 40);
    return q1('Two similar triangles have corresponding sides in the ratio 1 : ' + num(k) + '. The area of the smaller triangle is ' + A + ' cm².<br>Work out the area of the larger triangle.', 2, M(A + ' \\times ' + num(k) + '^2 = ' + num(A * k * k)) + ' cm²');
  });
  add('similar-shapes', [2, 3], function () {
    var h1 = ri(4, 10), k = pick([2, 3, 1.5]), V1 = ri(50, 400);
    return q1('Two cylinders are mathematically similar. The smaller has height ' + h1 + ' cm and volume ' + V1 + ' cm³. The larger has height ' + num(h1 * k) + ' cm.<br>Work out the volume of the larger cylinder.', 3, M(V1 + ' \\times ' + num(k) + '^3 = ' + num(V1 * k * k * k)) + ' cm³');
  });
  add('similar-shapes', [3], function () {
    var p = ri(2, 4), q = ri(1, p - 1); while (gcd(p, q) > 1) q = ri(1, p - 1);
    var Vs = q * q * q * ri(20, 90), Vl = Vs / Math.pow(q, 3) * Math.pow(p, 3), hs = q * ri(2, 6);
    return q1('Two similar jugs have volumes ' + num(Vs) + ' cm³ and ' + num(Vl) + ' cm³. The smaller jug is ' + hs + ' cm tall.<br>Work out the height of the larger jug.', 3, 'Volume factor ' + M(frac(Math.pow(p, 3), Math.pow(q, 3))) + ', length factor ' + M(frac(p, q)) + '; height ' + num(hs * p / q) + ' cm');
  });

  /* ---------- VOLUME AND SURFACE AREA ---------- */
  add('volume', [2], function () {
    var r = ri(2, 8), h = ri(3, 15), V = Math.round(Math.PI * r * r * h * 10) / 10;
    return q1('A cylinder has radius ' + r + ' cm and volume ' + V + ' cm³.<br>Work out the height of the cylinder. Give your answer correct to 3 significant figures.', 2, M('h = \\frac{' + V + '}{\\pi \\times ' + r + '^2}') + ' = ' + sf(V / (Math.PI * r * r), 3) + ' cm');
  });
  add('volume', [3], function () {
    var r = ri(2, 12);
    return { stem: 'A sphere has radius ' + r + ' cm.', parts: [
      { q: 'Work out the surface area of the sphere. Give your answer in terms of ' + M('\\pi') + '.', m: 2, a: M(4 * r * r + '\\pi') + ' cm²' },
      { q: 'Work out the volume of the sphere. Give your answer in terms of ' + M('\\pi') + '.', m: 2, a: M(frac(4 * r * r * r, 3) + '\\pi') + ' cm³' }
    ] };
  });
  add('volume', [3], function () {
    var tr = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]), r = tr[0], h = tr[1], l = tr[2];
    return { stem: 'A solid cone has base radius ' + r + ' cm and perpendicular height ' + h + ' cm.', parts: [
      { q: 'Work out the slant height of the cone.', m: 2, a: l + ' cm' },
      { q: 'Work out the total surface area of the cone. Give your answer in terms of ' + M('\\pi') + '.', m: 3, a: M('\\pi(' + r + ')^2 + \\pi(' + r + ')(' + l + ') = ' + (r * r + r * l) + '\\pi') + ' cm²' }
    ] };
  });
  add('volume', [1, 2], function () {
    var b = ri(3, 10), hh = ri(3, 8), a2 = ri(2, b - 1), l = ri(5, 15), area = (b + a2) / 2 * hh;
    return q1('A prism has a cross-section in the shape of a trapezium. The parallel sides are ' + a2 + ' cm and ' + b + ' cm and the distance between them is ' + hh + ' cm. The prism is ' + l + ' cm long.<br>Work out the volume of the prism.', 3, 'Area ' + num(area) + ' cm²; volume ' + num(area * l) + ' cm³');
  });

  /* ---------- VECTORS ---------- */
  add('vectors', [1], function () {
    var a = [nz(-8, 8), nz(-8, 8)], n2 = a[0] * a[0] + a[1] * a[1];
    return q1('Work out the magnitude of the vector ' + M(cv(a)) + '. Give your answer correct to 3 significant figures.', 2, M('\\sqrt{' + n2 + '}') + ' = ' + sf(Math.sqrt(n2), 3));
  });
  add('vectors', [1, 2], function () {
    var A = [ri(-6, 6), ri(-6, 6)], B = [ri(-6, 6), ri(-6, 6)]; while (A[0] === B[0] && A[1] === B[1]) B[0]++;
    return q1(M('A') + ' is the point ' + M('(' + A.join(',\\ ') + ')') + ' and ' + M('B') + ' is the point ' + M('(' + B.join(',\\ ') + ')') + '.<br>Write ' + M('\\overrightarrow{AB}') + ' as a column vector.', 2, M(cv([B[0] - A[0], B[1] - A[1]])));
  });
  add('vectors', [2, 3], function () {
    var u = [nz(-4, 4), nz(-4, 4)], k = pick([2, 3, -2, 4]), v = [u[0] * k, 'p'];
    return q1('The vectors ' + M(cv(u)) + ' and ' + M(cv([u[0] * k, 'p'])) + ' are parallel. Find the value of ' + M('p') + '.', 2, M('p = ' + u[1] * k));
  });
  add('vectors', [3], function () {
    var fig = D.geo({ pts: { A: [0, 0], B: [6, 0], C: [7.5, 3], D: [1.5, 3], M: [3.75, 1.5] }, segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C', 'dash'], ['B', 'D', 'dash']], vecs: [['A', 'B'], ['A', 'D']], dots: ['M'],
      slabels: [{ p: 'A', q: 'B', t: 'p' }, { p: 'A', q: 'D', t: 'q' }], w: 300, h: 200, label: 'Parallelogram' });
    return { stem: M('ABCD') + ' is a parallelogram. ' + M('\\overrightarrow{AB} = \\mathbf{p}') + ' and ' + M('\\overrightarrow{AD} = \\mathbf{q}') + '. The diagonals meet at ' + M('M') + '.' + fig, parts: [
      { q: 'Find ' + M('\\overrightarrow{BD}') + ' in terms of ' + M('\\mathbf{p}') + ' and ' + M('\\mathbf{q}') + '.', m: 1, a: M('\\mathbf{q} - \\mathbf{p}') },
      { q: 'Find ' + M('\\overrightarrow{AM}') + ' in terms of ' + M('\\mathbf{p}') + ' and ' + M('\\mathbf{q}') + '.', m: 2, a: M('\\tfrac{1}{2}(\\mathbf{p} + \\mathbf{q})') },
      { q: 'Find ' + M('\\overrightarrow{MB}') + ' in terms of ' + M('\\mathbf{p}') + ' and ' + M('\\mathbf{q}') + '.', m: 2, a: M('\\tfrac{1}{2}\\mathbf{p} - \\tfrac{1}{2}\\mathbf{q}') }
    ] };
  });

  /* ---------- TRANSFORMATIONS ---------- */
  function pt(p) { return '(' + p[0] + ',\\ ' + p[1] + ')'; }
  add('transformations', [1], function () {
    var P = [ri(-6, 6), ri(-6, 6)], v = [nz(-5, 5), nz(-5, 5)], c = ri(-3, 3), which = pick(['tr', 'x', 'y']);
    if (which === 'tr') return q1('The point ' + M('P' + pt(P)) + ' is translated by the vector ' + M(cv(v)) + '. Write down the coordinates of the image of ' + M('P') + '.', 1, M(pt([P[0] + v[0], P[1] + v[1]])));
    if (which === 'x') return q1('The point ' + M('P' + pt(P)) + ' is reflected in the line ' + M('x = ' + c) + '. Write down the coordinates of the image of ' + M('P') + '.', 1, M(pt([2 * c - P[0], P[1]])));
    return q1('The point ' + M('P' + pt(P)) + ' is reflected in the line ' + M('y = ' + c) + '. Write down the coordinates of the image of ' + M('P') + '.', 1, M(pt([P[0], 2 * c - P[1]])));
  });
  add('transformations', [2], function () {
    var P = [nz(-6, 6), nz(-6, 6)], t = pick(['acw', 'cw', 'half']);
    var img = t === 'acw' ? [-P[1], P[0]] : t === 'cw' ? [P[1], -P[0]] : [-P[0], -P[1]];
    return q1('The point ' + M('P' + pt(P)) + ' is rotated ' + (t === 'half' ? '180°' : '90° ' + (t === 'acw' ? 'anticlockwise' : 'clockwise')) + ' about the origin. Write down the coordinates of the image of ' + M('P') + '.', 1, M(pt(img)));
  });
  add('transformations', [2, 3], function () {
    var k = pick([2, 3, 4, 0.5]), A = ri(3, 20);
    return q1('A shape with area ' + A + ' cm² is enlarged by scale factor ' + (k === 0.5 ? M('\\frac{1}{2}') : k) + '.<br>Work out the area of the enlarged shape.', 2, M(A + ' \\times ' + (k === 0.5 ? '\\left(\\frac{1}{2}\\right)' : k) + '^2 = ' + num(A * k * k)) + ' cm²');
  });
  add('transformations', [3], function () {
    var P = [nz(-5, 5), nz(-5, 5)], first = pick([['a reflection in the ' + M('x') + '-axis', function (p) { return [p[0], -p[1]]; }], ['a reflection in the ' + M('y') + '-axis', function (p) { return [-p[0], p[1]]; }]]);
    var second = pick([['a rotation of 90° anticlockwise about the origin', function (p) { return [-p[1], p[0]]; }], ['a rotation of 90° clockwise about the origin', function (p) { return [p[1], -p[0]]; }]]);
    var img = second[1](first[1](P)), test = second[1](first[1]([1, 2]));
    var single = (test[0] === 2 && test[1] === 1) ? 'a reflection in the line ' + M('y = x') : 'a reflection in the line ' + M('y = -x');
    return { stem: 'The point ' + M('P' + pt(P)) + ' is transformed by ' + first[0] + ', followed by ' + second[0] + '.', parts: [
      { q: 'Find the coordinates of the final image of ' + M('P') + '.', m: 2, a: M(pt(img)) },
      { q: 'Describe fully the single transformation equivalent to these two transformations.', m: 2, a: single.charAt(0).toUpperCase() + single.slice(1) }
    ] };
  });

  /* ---------- AVERAGES ---------- */
  add('averages', [1], function () {
    var n = ri(5, 7), xs = []; for (var i = 0; i < n - 1; i++) xs.push(ri(2, 20)); var mean = ri(6, 14), miss = mean * n - xs.reduce(function (s, v) { return s + v; }, 0);
    if (miss < 0 || miss > 40) { mean = Math.ceil((xs.reduce(function (s, v) { return s + v; }, 0) + 5) / n); miss = mean * n - xs.reduce(function (s, v) { return s + v; }, 0); }
    return q1('Here are ' + (n - 1) + ' numbers: ' + xs.join(', ') + '. A ' + (n === 5 ? 'fifth' : n === 6 ? 'sixth' : 'seventh') + ' number is added. The mean of all ' + n + ' numbers is ' + mean + '.<br>Work out the missing number.', 2, M(mean + ' \\times ' + n + ' - ' + xs.reduce(function (s, v) { return s + v; }, 0) + ' = ' + miss));
  });
  add('averages', [1, 2], function () {
    var n = 2 * ri(3, 5), xs = []; for (var i = 0; i < n; i++) xs.push(ri(1, 30));
    var s = xs.slice().sort(function (a, b) { return a - b; });
    return q1('Find the median of these numbers: ' + xs.join(', '), 2, num((s[n / 2 - 1] + s[n / 2]) / 2));
  });
  add('averages', [2], function () {
    var n = ri(4, 9), m1 = ri(8, 30), m2 = m1 + ri(1, 4), x = m2 * (n + 1) - m1 * n;
    return q1('The mean of ' + n + ' numbers is ' + m1 + '. One more number is added and the mean becomes ' + m2 + '.<br>Work out the number that was added.', 3, M(m2 + ' \\times ' + (n + 1) + ' - ' + m1 + ' \\times ' + n + ' = ' + x));
  });
  add('averages', [2], function () {
    var vals = [1, 2, 3, 4, 5], f; do { f = vals.map(function () { return ri(2, 12); }); } while (new Set(f).size < 5);
    var N = f.reduce(function (s, v) { return s + v; }, 0), mode = vals[f.indexOf(Math.max.apply(null, f))], cum = 0, med1 = 0, med2 = 0;
    vals.forEach(function (v, i) { if (cum < N / 2 && cum + f[i] >= N / 2) med1 = v; if (cum < N / 2 + 1 && cum + f[i] >= N / 2 + 1) med2 = v; cum += f[i]; });
    var med = N % 2 ? (function () { var c = 0; for (var i = 0; i < 5; i++) { c += f[i]; if (c >= (N + 1) / 2) return vals[i]; } })() : (med1 + med2) / 2;
    return { stem: 'The table shows the number of pets owned by ' + N + ' students.' + table(['Number of pets', 1, 2, 3, 4, 5], [['Frequency'].concat(f)]), parts: [
      { q: 'Write down the mode.', m: 1, a: String(mode) },
      { q: 'Find the median.', m: 2, a: num(med) }
    ] };
  });
  add('averages', [3], function () {
    var x = ri(2, 12), terms = [x, x + 3, 2 * x, 4 * x - 1];
    var mean = terms.reduce(function (s, v) { return s + v; }, 0) / 4;
    return q1('The mean of ' + M('x,\\ x + 3,\\ 2x') + ' and ' + M('4x - 1') + ' is ' + num(mean) + '.<br>Work out the value of ' + M('x') + ' and the range of the four numbers.', 3, M('8x + 2 = ' + num(4 * mean) + ' \\Rightarrow x = ' + x) + '; range ' + (Math.max.apply(null, terms) - Math.min.apply(null, terms)));
  });

  /* ---------- STATISTICAL DIAGRAMS ---------- */
  add('stats-diagrams', [1], function () {
    var f; do { f = [ri(2, 12), ri(2, 12), ri(2, 12), ri(2, 12)]; } while (360 % f.reduce(function (s, v) { return s + v; }, 0));
    var N = f.reduce(function (s, v) { return s + v; }, 0), per = 360 / N, labs = ['Bus', 'Car', 'Walk', 'Cycle'];
    return { stem: 'The pie chart shows how ' + N + ' students travel to school.' + D.pie(f, labs), parts: [
      { q: 'The angle for Walk is ' + f[2] * per + '°. How many students walk?', m: 2, a: String(f[2]) },
      { q: 'Work out the angle for Car.', m: 2, a: f[1] * per + '°' }
    ] };
  });
  add('stats-diagrams', [3], function () {
    var bounds = [0, 10, 15, 20, 30, 50], f = [ri(2, 10) * 2, ri(1, 8) * 5, ri(1, 6) * 5, ri(2, 8) * 2, ri(1, 6) * 4];
    var fd = f.map(function (v, i) { return v / (bounds[i + 1] - bounds[i]); });
    return q1('The table shows information about the heights, ' + M('h') + ' cm, of some plants.' + table(['Height, ' + M('h') + ' (cm)', 'Frequency'], f.map(function (v, i) { return [M(bounds[i] + ' < h \\le ' + bounds[i + 1]), v]; })) + 'Work out the frequency density for each class, to draw a histogram.', 3, fd.map(function (v, i) { return bounds[i] + '–' + bounds[i + 1] + ': ' + num(v); }).join('; '));
  });

  /* ---------- PROBABILITY ---------- */
  add('probability', [1], function () {
    var r = ri(2, 9), b = ri(2, 9), gg = ri(1, 6), n = r + b + gg;
    return { stem: 'A bag contains ' + r + ' red, ' + b + ' blue and ' + gg + ' green counters. A counter is taken at random.', parts: [
      { q: 'Find the probability that it is blue.', m: 1, a: M(frac(b, n)) },
      { q: 'Find the probability that it is not red.', m: 1, a: M(frac(n - r, n)) }
    ] };
  });
  add('probability', [1], function () {
    var N = 10 * ri(5, 20), k = ri(3, N / 2), M2 = 50 * ri(4, 20);
    return { stem: 'A drawing pin is dropped ' + N + ' times. It lands point up ' + k + ' times.', parts: [
      { q: 'Write down the relative frequency of the pin landing point up.', m: 1, a: M(frac(k, N)) },
      { q: 'The pin is dropped ' + M2 + ' more times. Estimate how many times it lands point up.', m: 2, a: num(Math.round(k / N * M2 * 10) / 10) }
    ] };
  });
  add('probability', [2], function () {
    var s = ri(3, 11), ways = 0; for (var a = 1; a <= 6; a++) for (var b = 1; b <= 6; b++) if (a + b === s) ways++;
    return q1('Two fair six-sided dice are rolled and the scores are added together.<br>Find the probability that the total is ' + s + '.', 2, M(frac(ways, 36)));
  });
  add('probability', [2], function () {
    var p = pick([0.15, 0.2, 0.25, 0.35, 0.4, 0.45]), N = 20 * ri(5, 25);
    return q1('The probability that a train is late is ' + p + '. There are ' + N + ' trains in a week.<br>Work out an estimate for the number of trains that are late.', 2, num(p * N));
  });
  add('probability', [3], function () {
    var t = [[ri(5, 20), ri(5, 20)], [ri(5, 20), ri(5, 20)]], rs = [t[0][0] + t[0][1], t[1][0] + t[1][1]], cs = [t[0][0] + t[1][0], t[0][1] + t[1][1]], N = rs[0] + rs[1];
    return { stem: 'The two-way table shows whether ' + N + ' students prefer maths or science.' + table(['', 'Maths', 'Science', 'Total'], [['Boys', t[0][0], t[0][1], rs[0]], ['Girls', t[1][0], t[1][1], rs[1]], ['Total', cs[0], cs[1], N]]), parts: [
      { q: 'A student is chosen at random. Find the probability that the student is a girl who prefers science.', m: 1, a: M(frac(t[1][1], N)) },
      { q: 'A student who prefers maths is chosen at random. Find the probability that the student is a boy.', m: 2, a: M(frac(t[0][0], cs[0])) }
    ] };
  });
  add('probability', [3], function () {
    var p = pick([0.1, 0.2, 0.3, 0.4]), n = 3;
    return q1('The probability that it rains on any day is ' + p + ', independently of other days.<br>Work out the probability that it rains on at least one of the next 3 days.', 3, M('1 - ' + (1 - p).toFixed(1) + '^3 = ' + num(Math.round((1 - Math.pow(1 - p, 3)) * 10000) / 10000)));
  });

  /* ---------- SETS ---------- */
  add('sets', [1], function () {
    var N = pick([12, 15, 20]), a = pick([2, 3]), b = pick([4, 5]);
    var A = [], B = [], both = [];
    for (var i = 1; i <= N; i++) { if (i % a === 0) A.push(i); if (i % b === 0) B.push(i); if (i % a === 0 && i % b === 0) both.push(i); }
    var uni = []; for (var j = 1; j <= N; j++) if (j % a === 0 || j % b === 0) uni.push(j);
    return { stem: M('\\xi = \\{1, 2, 3, \\ldots, ' + N + '\\}') + ', ' + M('A = \\{\\text{multiples of } ' + a + '\\}') + ' and ' + M('B = \\{\\text{multiples of } ' + b + '\\}') + '.', parts: [
      { q: 'List the members of ' + M('A \\cap B') + '.', m: 1, a: both.length ? both.join(', ') : M('\\emptyset') },
      { q: 'Find ' + M('n(A \\cup B)') + '.', m: 1, a: String(uni.length) }
    ] };
  });
  add('sets', [2], function () {
    var both = ri(3, 12), A = both + ri(5, 20), B = both + ri(5, 20), out = ri(2, 10), N = A + B - both + out;
    return q1('In a group of ' + N + ' people, ' + A + ' like tea, ' + B + ' like coffee and ' + out + ' like neither.<br>How many people like both tea and coffee?', 3, M(A + ' + ' + B + ' + ' + out + ' - ' + N + ' = ' + both));
  });
  add('sets', [2, 3], function () {
    var c = [ri(3, 15), ri(2, 10), ri(3, 15), ri(2, 10)];
    return { stem: 'The Venn diagram shows the numbers of elements in each region.' + D.venn(c, ['A', 'B']), parts: [
      { q: 'Find ' + M("n(A' \\cup B)") + '.', m: 1, a: String(c[1] + c[2] + c[3]) },
      { q: 'Find ' + M("n(A \\cap B')") + '.', m: 1, a: String(c[0]) }
    ] };
  });
  add('sets', [3], function () {
    var x = ri(2, 9) / 100, a = ri(10, 30) / 100, b = ri(10, 30) / 100, out = 1 - x - a - b;
    out = Math.round(out * 100) / 100;
    return q1('The Venn diagram shows probabilities for events ' + M('A') + ' and ' + M('B') + '.' + D.venn([String(a), 'x', String(b), String(out)], ['A', 'B']) + 'Find the value of ' + M('x') + ' and hence find ' + M('P(A \\mid B)') + '.', 3,
      M('x = 1 - ' + a + ' - ' + b + ' - ' + out + ' = ' + num(x)) + '; ' + M('P(A \\mid B) = \\frac{' + num(x) + '}{' + num(Math.round((x + b) * 100) / 100) + '} = ') + num(Number(sf(x / (x + b), 3))));
  });
})(typeof window !== 'undefined' ? window : globalThis);
