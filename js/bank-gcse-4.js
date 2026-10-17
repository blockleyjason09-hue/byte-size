/* Byte Size — International GCSE (4MA1) rework: circle theorems, right-angled and non-right-angled
   trigonometry (every question has a diagram), and arithmetic series. Difficulty: 1 Foundation, 2 Core, 3 Accelerated. */
(function (g) {
  var BS = g.BS, D = BS.draw;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sf = BS.sf, dp = BS.dp, num = BS.num, M = BS.m, rad = BS.deg;
  function q1(q, m, a, stem) { return { stem: stem, parts: [{ q: q, m: m, a: a }] }; }
  function dg(x) { return x * 180 / Math.PI; }
  function deg(v) { return v + '°'; }
  var REASONS = ' Give reasons for each stage of your working.';

  /* ================= CIRCLE THEOREMS ================= */
  // pts: name -> degrees on the unit circle, or [x, y]
  function cfig(pts, o) {
    var P = {};
    if (o.centre !== false) P.O = [0, 0];
    Object.keys(pts).forEach(function (k) { P[k] = Array.isArray(pts[k]) ? pts[k] : D.onCircle(pts[k]); });
    return D.geo({ pts: P, circle: [0, 0, 1], segs: o.segs || [], lines: o.lines, angles: o.angles || [], dots: o.centre === false ? [] : ['O'],
      nolabel: o.nolabel || [], lab: o.lab, w: o.w || 300, h: o.h || 280, label: o.label || 'Circle diagram' });
  }
  var ROT = [0, 0, 20, -20, 35, -35, 180];

  var CT = [
    /* ---- one theorem ---- */
    { d: [1, 2], f: function () { // angle at centre
      var x = ri(22, 68), R = pick(ROT), giveC = Math.random() < 0.55;
      var A = 270 - x + R, B = 270 + x + R, C = 90 + R + ri(-35, 35);
      var fig = cfig({ A: A, B: B, C: C }, { segs: [['O', 'A'], ['O', 'B'], ['C', 'A'], ['C', 'B']],
        angles: [{ v: 'C', a: 'A', b: 'B', t: giveC ? deg(x) : 'x', d: 32 }, { v: 'O', a: 'A', b: 'B', t: giveC ? 'y' : deg(2 * x), d: 28 }], label: 'Angle at the centre' });
      return q1(M('A') + ', ' + M('B') + ' and ' + M('C') + ' are points on a circle with centre ' + M('O') + '.' + fig +
        (giveC ? 'Find the size of the angle marked ' + M('y') + '.' : 'Find the size of the angle marked ' + M('x') + '.') + ' Give a reason for your answer.', 2,
        (giveC ? M('y = ' + 2 * x + '^\\circ') : M('x = ' + x + '^\\circ')) + '. The angle at the centre is twice the angle at the circumference.');
    } },
    { d: [1, 2], f: function () { // angle in a semicircle
      var x = ri(18, 70), R = pick([0, 0, 180, 25, -25]);
      var fig = cfig({ A: 180 + R, B: R, C: 2 * x + R }, { segs: [['A', 'B'], ['A', 'C'], ['B', 'C']],
        angles: [{ v: 'A', a: 'B', b: 'C', t: deg(x), d: 36 }, { v: 'B', a: 'A', b: 'C', t: 'y', d: 30 }], label: 'Angle in a semicircle' });
      return q1(M('AB') + ' is a diameter of the circle with centre ' + M('O') + '. ' + M('C') + ' is a point on the circle.' + fig +
        'Find the size of the angle marked ' + M('y') + '. Give reasons for your answer.', 3,
        'Angle ' + M('ACB = 90^\\circ') + ' (the angle in a semicircle is 90°), so ' + M('y = 180 - 90 - ' + x + ' = ' + (90 - x) + '^\\circ') + ' (angles in a triangle add up to 180°).');
    } },
    { d: [1, 2], f: function () { // same segment
      var m = ri(28, 68), R = pick(ROT), A = 270 - m + R, B = 270 + m + R, C = 90 + R + ri(10, 45), Dd = 90 + R - ri(10, 45);
      var fig = cfig({ A: A, B: B, C: C, D: Dd }, { centre: false, segs: [['A', 'C'], ['B', 'C'], ['A', 'D'], ['B', 'D']],
        angles: [{ v: 'D', a: 'A', b: 'B', t: deg(m), d: 34 }, { v: 'C', a: 'A', b: 'B', t: 'x', d: 32 }], label: 'Angles in the same segment' });
      return q1(M('A') + ', ' + M('B') + ', ' + M('C') + ' and ' + M('D') + ' are points on a circle.' + fig + 'Find the size of the angle marked ' + M('x') + '. Give a reason for your answer.', 2,
        M('x = ' + m + '^\\circ') + '. Angles in the same segment are equal.');
    } },
    { d: [1, 2], f: function () { // cyclic quadrilateral
      var s1, s2, s3, R = ri(-40, 40); do { s1 = 2 * ri(30, 60); s2 = 2 * ri(30, 60); s3 = 2 * ri(30, 60); } while (360 - s1 - s2 - s3 < 60);
      var A = R + 200, B = A + s1, C = B + s2, Dd = C + s3; // angle at A subtends arc BCD = s2 + s3
      var angA = (s2 + s3) / 2, giveA = Math.random() < 0.5;
      var fig = cfig({ A: A, B: B, C: C, D: Dd }, { centre: false, segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']],
        angles: [{ v: 'A', a: 'B', b: 'D', t: giveA ? deg(angA) : 'x', d: 32 }, { v: 'C', a: 'B', b: 'D', t: giveA ? 'x' : deg(180 - angA), d: 32 }], label: 'Cyclic quadrilateral' });
      var ans = giveA ? 180 - angA : angA;
      return q1(M('ABCD') + ' is a cyclic quadrilateral.' + fig + 'Find the size of the angle marked ' + M('x') + '. Give a reason for your answer.', 2,
        M('x = 180 - ' + (180 - ans) + ' = ' + ans + '^\\circ') + '. Opposite angles of a cyclic quadrilateral add up to 180°.');
    } },
    { d: [1, 2], f: function () { // tangent meets radius
      var y = ri(32, 62), t = Math.tan(rad(y)), flip = Math.random() < 0.5 ? -1 : 1;
      var fig = D.geo({ pts: { O: [0, 0], A: [0, -1], P: [flip * t, -1] }, circle: [0, 0, 1], segs: [['O', 'A'], ['O', 'P']], lines: [['A', 'P', 0.45, 0.2]], dots: ['O'],
        angles: [{ v: 'A', a: 'O', b: 'P', right: true }, { v: 'O', a: 'A', b: 'P', t: deg(y), d: 38, r: 18 }, { v: 'P', a: 'A', b: 'O', t: 'x', d: 40, r: 20 }], w: 300, h: 250, label: 'Tangent and radius' });
      return q1(M('A') + ' is a point on a circle with centre ' + M('O') + '. ' + M('PA') + ' is a tangent to the circle.' + fig + 'Find the size of the angle marked ' + M('x') + '. Give reasons for your answer.', 3,
        M('x = 180 - 90 - ' + y + ' = ' + (90 - y) + '^\\circ') + '. A tangent is perpendicular to the radius at the point of contact; angles in a triangle add up to 180°.');
    } },
    { d: [2], f: function () { // alternate segment (single)
      var x = ri(35, 75), C = 90 + x + ri(-25, 25);
      var fig = D.geo({ pts: { O: [0, 0], A: [0, -1], B: D.onCircle(-90 + 2 * x), C: D.onCircle(C), S: [-1.55, -1], T: [1.55, -1] }, circle: [0, 0, 1],
        segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['S', 'T']], dots: [], nolabel: ['O'],
        angles: [{ v: 'A', a: 'T', b: 'B', t: deg(x), d: 40 }, { v: 'C', a: 'A', b: 'B', t: 'y', d: 32 }], w: 300, h: 280, label: 'Alternate segment theorem' });
      return q1(M('A') + ', ' + M('B') + ' and ' + M('C') + ' are points on a circle. ' + M('SAT') + ' is a tangent to the circle at ' + M('A') + '.' + fig + 'Find the size of the angle marked ' + M('y') + '. Give a reason for your answer.', 2,
        M('y = ' + x + '^\\circ') + '. The alternate segment theorem: the angle between a tangent and a chord equals the angle in the alternate segment.');
    } },
    { d: [2], f: function () { // two tangents from a point
      var p = 2 * ri(20, 50), h = 90 - p / 2, OP = 1 / Math.sin(rad(p / 2));
      var fig = D.geo({ pts: { O: [0, 0], A: D.onCircle(-90 - h), B: D.onCircle(-90 + h), P: [0, -OP] }, circle: [0, 0, 1], segs: [['P', 'A'], ['P', 'B'], ['A', 'B']], dots: ['O'],
        angles: [{ v: 'P', a: 'A', b: 'B', t: deg(p), d: 30 }, { v: 'A', a: 'P', b: 'B', t: 'x', d: 30 }], w: 280, h: 300, label: 'Two tangents from a point' });
      return q1(M('PA') + ' and ' + M('PB') + ' are tangents to the circle with centre ' + M('O') + '.' + fig + 'Find the size of the angle marked ' + M('x') + '. Give reasons for your answer.', 3,
        M('PA = PB') + ' (tangents from an external point are equal), so triangle ' + M('PAB') + ' is isosceles: ' + M('x = \\frac{180 - ' + p + '}{2} = ' + (90 - p / 2) + '^\\circ') + '.');
    } },
    { d: [1, 2], f: function () { // isosceles triangle from radii
      var t = 2 * ri(20, 70), R = pick(ROT);
      var fig = cfig({ A: 270 - t / 2 + R, B: 270 + t / 2 + R }, { segs: [['O', 'A'], ['O', 'B'], ['A', 'B']],
        angles: [{ v: 'O', a: 'A', b: 'B', t: deg(t), d: 28 }, { v: 'A', a: 'O', b: 'B', t: 'x', d: 30 }], w: 260, h: 260, label: 'Triangle formed by two radii' });
      return q1(M('A') + ' and ' + M('B') + ' are points on a circle with centre ' + M('O') + '.' + fig + 'Find the size of the angle marked ' + M('x') + '. Give a reason for your answer.', 2,
        M('x = \\frac{180 - ' + t + '}{2} = ' + (90 - t / 2) + '^\\circ') + '. ' + M('OA = OB') + ' (radii), so triangle ' + M('OAB') + ' is isosceles.');
    } },

    /* ---- more than one theorem (4–5 marks) ---- */
    { d: [2, 3], f: function () { // centre, then cyclic quadrilateral
      var x = ri(48, 82), b = pick([-50, -30, 200, 160]);
      var fig = cfig({ B: b, C: b + x, D: b + 2 * x, A: b + x + 180 }, { segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['O', 'B'], ['O', 'D']],
        angles: [{ v: 'O', a: 'B', b: 'D', t: deg(2 * x), d: 28 }, { v: 'C', a: 'B', b: 'D', t: 'y', d: 30 }], label: 'Cyclic quadrilateral with the centre' });
      return q1(M('A') + ', ' + M('B') + ', ' + M('C') + ' and ' + M('D') + ' are points on a circle with centre ' + M('O') + '.' + fig + 'Find the size of the angle marked ' + M('y') + '.' + REASONS, 4,
        'Angle ' + M('BAD = ' + x + '^\\circ') + ' (the angle at the centre is twice the angle at the circumference). ' + M('y = 180 - ' + x + ' = ' + (180 - x) + '^\\circ') + ' (opposite angles of a cyclic quadrilateral add up to 180°).');
    } },
    { d: [2, 3], f: function () { // centre + isosceles + tangent
      var y = ri(32, 68), C = 90 + y + ri(-25, 25);
      var fig = D.geo({ pts: { O: [0, 0], A: [0, -1], B: D.onCircle(-90 + 2 * y), C: D.onCircle(C), S: [-1.6, -1], T: [1.6, -1] }, circle: [0, 0, 1],
        segs: [['O', 'A'], ['O', 'B'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['S', 'T']], dots: ['O'],
        angles: [{ v: 'C', a: 'A', b: 'B', t: deg(y), d: 32 }, { v: 'A', a: 'T', b: 'B', t: 'x', d: 40 }], w: 300, h: 290, label: 'Tangent, centre and chord' });
      return { stem: M('A') + ', ' + M('B') + ' and ' + M('C') + ' are points on a circle with centre ' + M('O') + '. ' + M('SAT') + ' is a tangent to the circle at ' + M('A') + '.' + fig, parts: [
        { q: 'Find the size of angle ' + M('OAB') + '. Give reasons for your answer.', m: 3, a: 'Angle ' + M('AOB = ' + 2 * y + '^\\circ') + ' (angle at the centre is twice the angle at the circumference). ' + M('OA = OB') + ' (radii), so ' + M('OAB = \\frac{180 - ' + 2 * y + '}{2} = ' + (90 - y) + '^\\circ') + '.' },
        { q: 'Hence find the size of the angle marked ' + M('x') + '. Give a reason for your answer.', m: 2, a: M('x = 90 - ' + (90 - y) + ' = ' + y + '^\\circ') + '. The tangent is perpendicular to the radius ' + M('OA') + '.' }
      ] };
    } },
    { d: [2, 3], f: function () { // two tangents + centre + circumference
      var p = 2 * ri(18, 48), h = 90 - p / 2, OP = 1 / Math.sin(rad(p / 2));
      var fig = D.geo({ pts: { O: [0, 0], A: D.onCircle(-90 - h), B: D.onCircle(-90 + h), P: [0, -OP], C: D.onCircle(90 + ri(-30, 30)) }, circle: [0, 0, 1],
        segs: [['P', 'A'], ['P', 'B'], ['C', 'A'], ['C', 'B'], ['O', 'A', 'dash'], ['O', 'B', 'dash']], dots: ['O'],
        angles: [{ v: 'P', a: 'A', b: 'B', t: deg(p), d: 30 }, { v: 'C', a: 'A', b: 'B', t: 'x', d: 32 }], w: 280, h: 320, label: 'Two tangents and an inscribed angle' });
      return q1(M('PA') + ' and ' + M('PB') + ' are tangents to the circle with centre ' + M('O') + '. ' + M('C') + ' is a point on the circle.' + fig + 'Find the size of the angle marked ' + M('x') + '.' + REASONS, 4,
        'Angles ' + M('OAP') + ' and ' + M('OBP') + ' are 90° (tangent perpendicular to radius). Angle ' + M('AOB = 360 - 90 - 90 - ' + p + ' = ' + (180 - p) + '^\\circ') + ' (angles in a quadrilateral add up to 360°). ' +
        M('x = ' + (180 - p) + ' \\div 2 = ' + (90 - p / 2) + '^\\circ') + ' (angle at the centre is twice the angle at the circumference).');
    } },
    { d: [2, 3], f: function () { // cyclic quad + same segment with diagonals
      var s; do { s = [2 * ri(28, 60), 2 * ri(28, 60), 2 * ri(28, 60)]; s.push(360 - s[0] - s[1] - s[2]); } while (s[3] < 60 || s[3] > 140);
      var A = 135 + ri(-15, 15), B = A + s[0], C = B + s[1], Dd = C + s[2]; // arc DA = s[3]
      var a = s[3] / 2, b = s[2] / 2;
      var fig = cfig({ A: A, B: B, C: C, D: Dd }, { centre: false, segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['B', 'D'], ['A', 'C']],
        angles: [{ v: 'B', a: 'A', b: 'D', t: deg(a), d: 48, r: 22 }, { v: 'B', a: 'D', b: 'C', t: deg(b), d: 58, r: 34 }, { v: 'A', a: 'C', b: 'D', t: 'x', d: 36, r: 22 }, { v: 'D', a: 'A', b: 'C', t: 'y', d: 30 }], label: 'Cyclic quadrilateral with diagonals' });
      return { stem: M('A') + ', ' + M('B') + ', ' + M('C') + ' and ' + M('D') + ' are points on a circle.' + fig, parts: [
        { q: 'Find the size of the angle marked ' + M('x') + '. Give a reason for your answer.', m: 2, a: M('x = ' + b + '^\\circ') + '. Angles in the same segment are equal (angle ' + M('CAD') + ' = angle ' + M('CBD') + ').' },
        { q: 'Find the size of the angle marked ' + M('y') + '. Give a reason for your answer.', m: 2, a: M('y = 180 - (' + a + ' + ' + b + ') = ' + (180 - a - b) + '^\\circ') + '. Opposite angles of a cyclic quadrilateral add up to 180°.' }
      ] };
    } },
    { d: [3], f: function () { // alternate segment + isosceles
      var x = ri(52, 78), phi = 180 - 2 * x;
      var fig = D.geo({ pts: { A: [0, -1], B: D.onCircle(90 + phi), C: D.onCircle(90 - phi), S: [-1.6, -1], T: [1.6, -1] }, circle: [0, 0, 1],
        segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['S', 'T']], dots: [],
        angles: [{ v: 'A', a: 'T', b: 'C', t: deg(x), d: 42 }, { v: 'A', a: 'B', b: 'C', t: 'y', d: 36 }], w: 300, h: 290, label: 'Tangent and isosceles triangle' });
      return q1(M('A') + ', ' + M('B') + ' and ' + M('C') + ' are points on a circle. ' + M('SAT') + ' is a tangent to the circle at ' + M('A') + '. ' + M('AB = AC') + '.' + fig + 'Find the size of the angle marked ' + M('y') + '.' + REASONS, 4,
        'Angle ' + M('ABC = ' + x + '^\\circ') + ' (alternate segment theorem). Angle ' + M('ACB = ' + x + '^\\circ') + ' (base angles of an isosceles triangle). ' + M('y = 180 - 2 \\times ' + x + ' = ' + (180 - 2 * x) + '^\\circ') + ' (angles in a triangle).');
    } },
    { d: [2, 3], f: function () { // diameter + same segment
      var x = ri(20, 62), Dd = 270 + ri(-35, 35);
      var fig = cfig({ A: 180, B: 0, C: 2 * x, D: Dd }, { segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'D'], ['C', 'D']],
        angles: [{ v: 'A', a: 'B', b: 'C', t: deg(x), d: 38 }, { v: 'D', a: 'A', b: 'C', t: 'y', d: 32 }], label: 'Diameter and angles in the same segment' });
      return q1(M('AB') + ' is a diameter of the circle with centre ' + M('O') + '. ' + M('C') + ' and ' + M('D') + ' are points on the circle.' + fig + 'Find the size of the angle marked ' + M('y') + '.' + REASONS, 4,
        'Angle ' + M('ACB = 90^\\circ') + ' (angle in a semicircle). Angle ' + M('ABC = 180 - 90 - ' + x + ' = ' + (90 - x) + '^\\circ') + ' (angles in a triangle). ' + M('y = ' + (90 - x) + '^\\circ') + ' (angles in the same segment are equal).');
    } },
    { d: [3], f: function () { // tangent, line through centre
      var p = 2 * ri(11, 25), d = 1 / Math.sin(rad(p)), tA = 90 - p;
      var fig = D.geo({ pts: { O: [0, 0], P: [d, 0], Q: [1, 0], R: [-1, 0], T: D.onCircle(tA) }, circle: [0, 0, 1], segs: [['R', 'P'], ['P', 'T'], ['T', 'R'], ['T', 'Q'], ['O', 'T', 'dash']], dots: ['O'],
        lab: { Q: [10, 12], O: [0, 14], R: [-12, 0], P: [12, 0] }, angles: [{ v: 'P', a: 'T', b: 'O', t: deg(p), d: 46, r: 26 }, { v: 'R', a: 'T', b: 'P', t: 'x', d: 36, r: 22 }], w: 340, h: 230, label: 'Tangent and a line through the centre' });
      return q1(M('PT') + ' is a tangent to the circle with centre ' + M('O') + '. The straight line ' + M('PQOR') + ' passes through ' + M('O') + '.' + fig + 'Find the size of the angle marked ' + M('x') + '.' + REASONS, 4,
        'Angle ' + M('OTP = 90^\\circ') + ' (tangent perpendicular to radius), so angle ' + M('TOP = 180 - 90 - ' + p + ' = ' + (90 - p) + '^\\circ') + '. ' +
        M('x = ' + (90 - p) + ' \\div 2 = ' + ((90 - p) / 2) + '^\\circ') + ' (the angle at the centre is twice the angle at the circumference).');
    } },
    { d: [2, 3], f: function () { // algebra in a cyclic quadrilateral
      var x, p, r, q, s, A; do { x = ri(12, 30); p = ri(2, 5); r = ri(1, 4); A = ri(70, 125); q = A - p * x; s = 180 - A - r * x; } while (p === r || Math.abs(q) < 2 || Math.abs(s) < 2 || q === 0 || s === 0);
      var arcBCD = 2 * A, arcDAB = 360 - 2 * A, b1 = arcBCD / 2, Aang = 200, B = Aang + arcDAB / 2, C = B + b1, Dd = C + b1;
      var eA = poly([p, q]), eC = poly([r, s]);
      var fig = cfig({ A: Aang, B: B, C: C, D: Dd }, { centre: false, segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']],
        angles: [{ v: 'A', a: 'B', b: 'D', t: '(' + eA + ')°', d: 46 }, { v: 'C', a: 'B', b: 'D', t: '(' + eC + ')°', d: 46 }], label: 'Cyclic quadrilateral with algebraic angles' });
      return { stem: M('ABCD') + ' is a cyclic quadrilateral. Angle ' + M('DAB = (' + eA + ')^\\circ') + ' and angle ' + M('BCD = (' + eC + ')^\\circ') + '.' + fig, parts: [
        { q: 'Find the value of ' + M('x') + '. Give a reason for your answer.', m: 3, a: M(eA + ' + ' + eC + ' = 180 \\Rightarrow ' + poly([p + r, q + s]) + ' = 180 \\Rightarrow x = ' + x) + '. Opposite angles of a cyclic quadrilateral add up to 180°.' },
        { q: 'Find the size of angle ' + M('BCD') + '.', m: 1, a: M((180 - A) + '^\\circ') }
      ] };
    } },
    { d: [3], f: function () { // reflex angle at the centre
      var c = ri(102, 140), h = 180 - c, R = pick([0, 0, 180, 20, -20]);
      var fig = cfig({ A: 90 - h + R, B: 90 + h + R, C: 90 + R + ri(-Math.floor(h / 2), Math.floor(h / 2)) }, { segs: [['O', 'A'], ['O', 'B'], ['C', 'A'], ['C', 'B']],
        angles: [{ v: 'C', a: 'A', b: 'B', t: deg(c), d: 24, r: 12 }, { v: 'O', a: 'A', b: 'B', t: 'x', d: 22, r: 12 }], label: 'Obtuse angle at the circumference' });
      return q1(M('A') + ', ' + M('B') + ' and ' + M('C') + ' are points on a circle with centre ' + M('O') + '.' + fig + 'Find the size of the angle marked ' + M('x') + '.' + REASONS, 4,
        'Reflex angle ' + M('AOB = 2 \\times ' + c + ' = ' + 2 * c + '^\\circ') + ' (angle at the centre is twice the angle at the circumference). ' + M('x = 360 - ' + 2 * c + ' = ' + (360 - 2 * c) + '^\\circ') + ' (angles around a point add up to 360°).');
    } },
    { d: [3], f: function () { // alternate segment + cyclic quadrilateral + triangle
      var x = ri(40, 65), y = ri(35, 60); if (x + y > 110) y = 110 - x;
      var C = 270 - 2 * x, B = 270 - 2 * x - 2 * y, Dd = 90 - x - y;
      var fig = D.geo({ pts: { A: [0, -1], B: D.onCircle(B), C: D.onCircle(C), D: D.onCircle(Dd), S: [-1.45, -1], T: [1.45, -1] }, circle: [0, 0, 1],
        segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'D'], ['B', 'D'], ['S', 'T']], dots: [],
        angles: [{ v: 'A', a: 'S', b: 'C', t: deg(x), d: 42, r: 20 }, { v: 'A', a: 'C', b: 'B', t: deg(y), d: 40, r: 26 }, { v: 'D', a: 'A', b: 'B', t: 'z', d: 26, r: 14 }], w: 320, h: 310, label: 'Tangent with a cyclic quadrilateral' });
      return { stem: M('A') + ', ' + M('B') + ', ' + M('C') + ' and ' + M('D') + ' are points on a circle. ' + M('SAT') + ' is a tangent to the circle at ' + M('A') + '.' + fig, parts: [
        { q: 'Find the size of angle ' + M('ACB') + '. Give reasons for your answer.', m: 3, a: 'Angle ' + M('ABC = ' + x + '^\\circ') + ' (alternate segment theorem), so ' + M('ACB = 180 - ' + x + ' - ' + y + ' = ' + (180 - x - y) + '^\\circ') + ' (angles in a triangle).' },
        { q: 'Find the size of the angle marked ' + M('z') + '. Give a reason for your answer.', m: 2, a: M('z = 180 - ' + (180 - x - y) + ' = ' + (x + y) + '^\\circ') + ' (' + M('ADBC') + ' is a cyclic quadrilateral, so opposite angles ' + M('ADB') + ' and ' + M('ACB') + ' add up to 180°).' }
      ] };
    } },
    { d: [3], f: function () { // exterior angle of cyclic quad + centre + isosceles (5 marks)
      var x = ri(40, 64), C = 270 - x + Math.round(2 * x * (0.35 + 0.25 * Math.random())), A = 90 + ri(-30, 30);
      var Bp = D.onCircle(270 - x), Cp = D.onCircle(C), E = [Cp[0] + 0.75 * (Cp[0] - Bp[0]), Cp[1] + 0.75 * (Cp[1] - Bp[1])];
      var fig = cfig({ A: A, B: 270 - x, C: C, D: 270 + x, E: E }, { segs: [['A', 'B'], ['C', 'D'], ['D', 'A'], ['B', 'E'], ['O', 'B'], ['O', 'D'], ['B', 'D']],
        angles: [{ v: 'C', a: 'D', b: 'E', t: deg(x), d: 34, r: 16 }, { v: 'B', a: 'O', b: 'D', t: 'y', d: 34, r: 18 }], h: 300, label: 'Cyclic quadrilateral with an extended side' });
      return q1(M('A') + ', ' + M('B') + ', ' + M('C') + ' and ' + M('D') + ' are points on a circle with centre ' + M('O') + '. ' + M('BCE') + ' is a straight line.' + fig + 'Find the size of the angle marked ' + M('y') + '.' + REASONS, 5,
        'Angle ' + M('BCD = 180 - ' + x + ' = ' + (180 - x) + '^\\circ') + ' (angles on a straight line). Angle ' + M('BAD = 180 - ' + (180 - x) + ' = ' + x + '^\\circ') + ' (opposite angles of a cyclic quadrilateral). ' +
        'Angle ' + M('BOD = ' + 2 * x + '^\\circ') + ' (angle at the centre is twice the angle at the circumference). ' + M('OB = OD') + ' (radii), so ' + M('y = \\frac{180 - ' + 2 * x + '}{2} = ' + (90 - x) + '^\\circ') + ' (base angles of an isosceles triangle).');
    } },
    { d: [3], f: function () { // two tangents + alternate segment + isosceles + centre (5 marks)
      var x = ri(50, 70), p = 180 - 2 * x, OP = 1 / Math.sin(rad(p / 2));
      var fig = D.geo({ pts: { O: [0, 0], A: D.onCircle(-90 - x), B: D.onCircle(-90 + x), P: [0, -OP], C: D.onCircle(90 + pick([-1, 1]) * ri(22, 40)) }, circle: [0, 0, 1],
        segs: [['P', 'A'], ['P', 'B'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['O', 'A'], ['O', 'B']], dots: ['O'], lab: { O: [0, 16] },
        angles: [{ v: 'C', a: 'A', b: 'B', t: deg(x), d: 32 }, { v: 'P', a: 'A', b: 'B', t: 'y', d: 30 }], w: 280, h: Math.min(380, 220 + 60 * OP), label: 'Two tangents and the alternate segment' });
      return { stem: M('PA') + ' and ' + M('PB') + ' are tangents to the circle with centre ' + M('O') + '. ' + M('C') + ' is a point on the circle.' + fig, parts: [
        { q: 'Find the size of the angle marked ' + M('y') + '.' + REASONS, m: 4, a: 'Angle ' + M('PAB = ' + x + '^\\circ') + ' (alternate segment theorem). ' + M('PA = PB') + ' (tangents from an external point are equal), so angle ' + M('PBA = ' + x + '^\\circ') + '. ' + M('y = 180 - 2 \\times ' + x + ' = ' + p + '^\\circ') + ' (angles in a triangle).' },
        { q: 'Find the size of angle ' + M('OAB') + '. Give a reason for your answer.', m: 2, a: M('OAB = 90 - ' + x + ' = ' + (90 - x) + '^\\circ') + ' (the tangent is perpendicular to the radius, so angle ' + M('OAP = 90^\\circ') + ').' }
      ] };
    } }
  ];
  BS.topics['circle-theorems'].gens = CT;

  /* ================= RIGHT-ANGLED TRIGONOMETRY ================= */
  var NAMES = [['A', 'B', 'C'], ['P', 'Q', 'R'], ['L', 'M', 'N'], ['D', 'E', 'F'], ['X', 'Y', 'Z']];
  // Right angle at n[1]; n[0] is "up" from n[1] by h, n[2] is "across" by w. Random turn/mirror for variety.
  function rtPts(n, h, w) {
    if (h > 2.4 * w) w = h / 2.4; else if (w > 2.4 * h) h = w / 2.4; // diagrams are not to scale: avoid sliver triangles
    var turn = pick([0, 0, 0, 90, 180, 270, 15, -15]), mir = Math.random() < 0.5 ? -1 : 1, sc = 1 / Math.max(h, w);
    var raw = {}; raw[n[1]] = [0, 0]; raw[n[0]] = [0, h * sc]; raw[n[2]] = [mir * w * sc, 0];
    var c = Math.cos(rad(turn)), s = Math.sin(rad(turn)), P = {};
    Object.keys(raw).forEach(function (k) { var p = raw[k]; P[k] = [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; });
    return P;
  }
  function triFig(P, n, o) {
    return D.geo({ pts: P, polys: [n], slabels: o.sides || [], angles: o.angles || [], w: o.w || 300, h: o.h || 240, label: o.label || 'Triangle ' + n.join('') });
  }
  function nice(lo, hi) { return ri(lo * 10, hi * 10) / 10; }
  function len(x) { return (Number.isInteger(x) ? String(x) : String(x)) + ' cm'; }

  var PT = [
    { d: [1, 2], f: function () { // hypotenuse
      var n = pick(NAMES), a = ri(3, 15), b = ri(3, 15), dec = Math.random() < 0.5;
      if (dec) { a = nice(2.5, 12); b = nice(2.5, 12); }
      var P = rtPts(n, a, b), c = Math.hypot(a, b);
      var fig = triFig(P, n, { sides: [{ p: n[0], q: n[1], t: len(a) }, { p: n[1], q: n[2], t: len(b) }, { p: n[0], q: n[2], t: 'x cm' }], angles: [{ v: n[1], a: n[0], b: n[2], right: true }] });
      return q1(M(n.join('')) + ' is a right-angled triangle.' + fig + 'Work out the value of ' + M('x') + '. Give your answer correct to 1 decimal place.', 3, M('x = \\sqrt{' + num(a) + '^2 + ' + num(b) + '^2} = ' + dp(c, 1)));
    } },
    { d: [1, 2], f: function () { // shorter side
      var n = pick(NAMES), a, c; do { a = ri(3, 18); c = ri(a + 2, 26); } while (Math.sqrt(c * c - a * a) < 2);
      var b = Math.sqrt(c * c - a * a), P = rtPts(n, a, b);
      var fig = triFig(P, n, { sides: [{ p: n[0], q: n[1], t: len(a) }, { p: n[1], q: n[2], t: 'x cm' }, { p: n[0], q: n[2], t: len(c) }], angles: [{ v: n[1], a: n[0], b: n[2], right: true }] });
      return q1('The diagram shows a right-angled triangle ' + M(n.join('')) + '.' + fig + 'Work out the length of ' + M(n[1] + n[2]) + ', marked ' + M('x') + '. Give your answer correct to 3 significant figures.', 3, M('x = \\sqrt{' + c + '^2 - ' + a + '^2} = ' + sf(b, 3)) + ' cm');
    } },
    { d: [1, 2, 3], f: function () { // missing side using SOHCAHTOA
      var n = pick(NAMES), th = ri(22, 68), known = pick(['opp', 'adj', 'hyp']), unk = pick(['opp', 'adj', 'hyp'].filter(function (s) { return s !== known; }));
      var hyp = ri(60, 190) / 10, opp = hyp * Math.sin(rad(th)), adj = hyp * Math.cos(rad(th));
      var v = { opp: opp, adj: adj, hyp: hyp };
      v[known] = Math.round(v[known] * 10) / 10; if (v[known] < 2) v[known] = 2.5;
      // rebuild consistent values from the known side
      if (known === 'opp') { v.hyp = v.opp / Math.sin(rad(th)); v.adj = v.opp / Math.tan(rad(th)); }
      if (known === 'adj') { v.hyp = v.adj / Math.cos(rad(th)); v.opp = v.adj * Math.tan(rad(th)); }
      if (known === 'hyp') { v.opp = v.hyp * Math.sin(rad(th)); v.adj = v.hyp * Math.cos(rad(th)); }
      // angle at n[0]: opposite side is n[1]n[2], adjacent is n[0]n[1]
      var P = rtPts(n, v.adj, v.opp), lab = {};
      lab.opp = { p: n[1], q: n[2] }; lab.adj = { p: n[0], q: n[1] }; lab.hyp = { p: n[0], q: n[2] };
      var sides = []; lab[known].t = len(v[known]); lab[unk].t = 'x cm'; sides.push(lab[known], lab[unk]);
      var fig = triFig(P, n, { sides: sides, angles: [{ v: n[1], a: n[0], b: n[2], right: true }, { v: n[0], a: n[1], b: n[2], t: deg(th), d: 34 }] });
      var r = { 'opp,hyp': ['\\sin', 'x = ' + num(v.hyp) + ' \\times \\sin ' + th + '^\\circ'], 'hyp,opp': ['\\sin', 'x = \\frac{' + num(v.opp) + '}{\\sin ' + th + '^\\circ}'],
        'adj,hyp': ['\\cos', 'x = ' + num(v.hyp) + ' \\times \\cos ' + th + '^\\circ'], 'hyp,adj': ['\\cos', 'x = \\frac{' + num(v.adj) + '}{\\cos ' + th + '^\\circ}'],
        'opp,adj': ['\\tan', 'x = ' + num(v.adj) + ' \\times \\tan ' + th + '^\\circ'], 'adj,opp': ['\\tan', 'x = \\frac{' + num(v.opp) + '}{\\tan ' + th + '^\\circ}'] }[unk + ',' + known];
      return q1(M(n.join('')) + ' is a right-angled triangle.' + fig + 'Work out the value of ' + M('x') + '. Give your answer correct to 3 significant figures.', 3, M(r[1] + ' = ' + sf(v[unk], 3)));
    } },
    { d: [1, 2, 3], f: function () { // missing angle
      var n = pick(NAMES), a = nice(3, 14), b = nice(3, 14), pair = pick(['tan', 'sin', 'cos']);
      var hyp = Math.round(Math.hypot(a, b) * 10) / 10;
      var P = rtPts(n, a, b), sides, ans, work;
      if (pair === 'tan') { sides = [{ p: n[0], q: n[1], t: len(a) }, { p: n[1], q: n[2], t: len(b) }]; ans = dg(Math.atan(b / a)); work = '\\tan x = \\frac{' + num(b) + '}{' + num(a) + '}'; }
      else if (pair === 'sin') { sides = [{ p: n[1], q: n[2], t: len(b) }, { p: n[0], q: n[2], t: len(hyp) }]; ans = dg(Math.asin(b / hyp)); work = '\\sin x = \\frac{' + num(b) + '}{' + num(hyp) + '}'; }
      else { sides = [{ p: n[0], q: n[1], t: len(a) }, { p: n[0], q: n[2], t: len(hyp) }]; ans = dg(Math.acos(a / hyp)); work = '\\cos x = \\frac{' + num(a) + '}{' + num(hyp) + '}'; }
      var fig = triFig(P, n, { sides: sides, angles: [{ v: n[1], a: n[0], b: n[2], right: true }, { v: n[0], a: n[1], b: n[2], t: 'x', d: 32 }] });
      return q1(M(n.join('')) + ' is a right-angled triangle.' + fig + 'Work out the size of the angle marked ' + M('x') + '. Give your answer correct to 1 decimal place.', 3, M(work + ' \\Rightarrow x = ' + dp(ans, 1) + '^\\circ'));
    } },
    { d: [2, 3], f: function () { // two right-angled triangles sharing a side
      var AB = ri(8, 20), t1 = ri(35, 65), t2 = ri(20, 50);
      var AD = AB * Math.sin(rad(t1)), BD = AB * Math.cos(rad(t1)), DC = AD / Math.tan(rad(t2)), AC = AD / Math.sin(rad(t2));
      var want = pick(['DC', 'AC']);
      var P = { A: [BD, AD], B: [0, 0], D: [BD, 0], C: [BD + DC, 0] };
      var fig = D.geo({ pts: P, polys: [['A', 'B', 'C']], segs: [['A', 'D']], slabels: [{ p: 'A', q: 'B', t: len(AB) }, want === 'DC' ? { p: 'D', q: 'C', t: 'x cm', flip: true } : { p: 'A', q: 'C', t: 'x cm' }],
        angles: [{ v: 'D', a: 'A', b: 'C', right: true }, { v: 'B', a: 'A', b: 'D', t: deg(t1), d: 34 }, { v: 'C', a: 'A', b: 'D', t: deg(t2), d: 38 }], w: 340, h: 220, label: 'Two right-angled triangles' });
      return q1(M('ABC') + ' is a triangle. ' + M('D') + ' is the point on ' + M('BC') + ' such that ' + M('AD') + ' is perpendicular to ' + M('BC') + '.' + fig + 'Work out the value of ' + M('x') + '. Give your answer correct to 3 significant figures.', 4,
        M('AD = ' + AB + '\\sin ' + t1 + '^\\circ = ' + dp(AD, 3)) + ', ' + (want === 'DC' ? M('x = \\frac{' + dp(AD, 3) + '}{\\tan ' + t2 + '^\\circ} = ' + sf(DC, 3)) : M('x = \\frac{' + dp(AD, 3) + '}{\\sin ' + t2 + '^\\circ} = ' + sf(AC, 3))));
    } },
    { d: [1, 2], f: function () { // angle of elevation
      var d = ri(15, 80), th = ri(18, 62), h = d * Math.tan(rad(th)), findH = Math.random() < 0.6;
      if (!findH) h = Math.round(h);
      var P = { T: [d, h], B: [d, 0], A: [0, 0] };
      var fig = D.geo({ pts: P, segs: [['A', 'B'], ['B', 'T', 'ln'], ['A', 'T', 'dash']], slabels: [{ p: 'A', q: 'B', t: d + ' m' }, { p: 'B', q: 'T', t: findH ? 'h m' : h + ' m' }],
        angles: [{ v: 'B', a: 'A', b: 'T', right: true }, { v: 'A', a: 'B', b: 'T', t: findH ? deg(th) : 'x', d: 40, r: 24 }], lab: { A: [-10, 10], B: [10, 10], T: [10, -6] }, w: 320, h: 220, label: 'Angle of elevation' });
      return q1(M('T') + ' is the top of a vertical tower ' + M('BT') + '. ' + M('A') + ' is a point on horizontal ground, ' + d + ' m from ' + M('B') + '.' + fig +
        (findH ? 'The angle of elevation of ' + M('T') + ' from ' + M('A') + ' is ' + th + '°. Work out the height of the tower. Give your answer correct to 3 significant figures.' : 'The tower is ' + h + ' m tall. Work out the angle of elevation of ' + M('T') + ' from ' + M('A') + ', marked ' + M('x') + '. Give your answer correct to 1 decimal place.'), 3,
        findH ? M('h = ' + d + '\\tan ' + th + '^\\circ = ' + sf(d * Math.tan(rad(th)), 3)) + ' m' : M('\\tan x = \\frac{' + h + '}{' + d + '} \\Rightarrow x = ' + dp(dg(Math.atan(h / d)), 1) + '^\\circ'));
    } },
    { d: [2, 3], f: function () { // angle of depression
      var h = ri(30, 150), th = ri(12, 48), d = h / Math.tan(rad(th));
      var P = { C: [0, h], F: [0, 0], S: [d, 0], H: [d * 0.75, h] };
      var fig = D.geo({ pts: P, segs: [['C', 'F'], ['F', 'S'], ['C', 'S'], ['C', 'H', 'dash']], nolabel: ['H'], slabels: [{ p: 'C', q: 'F', t: h + ' m', flip: true }],
        angles: [{ v: 'F', a: 'C', b: 'S', right: true }, { v: 'C', a: 'H', b: 'S', t: deg(th), d: 46, r: 28 }], lab: { C: [-12, -4], F: [-12, 8], S: [10, 10] }, w: 340, h: 200, label: 'Angle of depression' });
      return q1('A cliff ' + M('CF') + ' is ' + h + ' m high. From the top of the cliff, ' + M('C') + ', the angle of depression of a ship ' + M('S') + ' is ' + th + '°.' + fig + 'Work out the distance ' + M('FS') + '. Give your answer correct to 3 significant figures.', 3,
        'Angle ' + M('CSF = ' + th + '^\\circ') + ' (alternate angles), so ' + M('FS = \\frac{' + h + '}{\\tan ' + th + '^\\circ} = ' + sf(d, 3)) + ' m');
    } },
    { d: [1, 2], f: function () { // ladder
      var L = nice(3, 9), th = ri(58, 80), ht = L * Math.sin(rad(th)), foot = L * Math.cos(rad(th));
      var P = { W: [0, ht], G: [0, 0], F: [foot, 0] };
      var fig = D.geo({ pts: P, segs: [['W', 'G'], ['G', 'F'], ['W', 'F', 'accent']], nolabel: ['W', 'G', 'F'], slabels: [{ p: 'W', q: 'F', t: num(L) + ' m' }],
        angles: [{ v: 'G', a: 'W', b: 'F', right: true }, { v: 'F', a: 'G', b: 'W', t: deg(th), d: 30 }], w: 240, h: 240, label: 'Ladder against a wall' });
      return { stem: 'A ladder of length ' + num(L) + ' m leans against a vertical wall. The ladder makes an angle of ' + th + '° with the horizontal ground.' + fig, parts: [
        { q: 'How high up the wall does the ladder reach? Give your answer correct to 3 significant figures.', m: 2, a: M(num(L) + '\\sin ' + th + '^\\circ = ' + sf(ht, 3)) + ' m' },
        { q: 'How far is the foot of the ladder from the wall? Give your answer correct to 3 significant figures.', m: 2, a: M(num(L) + '\\cos ' + th + '^\\circ = ' + sf(foot, 3)) + ' m' }
      ] };
    } },
    { d: [2, 3], f: function () { // bearings with right-angled trig
      var d = ri(12, 60), b = ri(20, 75), E = d * Math.sin(rad(b)), N = d * Math.cos(rad(b));
      var svg = D.bearings([{ x: 0, y: 0, name: 'A' }, { x: E, y: N, name: 'B', seg: d + ' km' }], ['A']);
      return { stem: 'A ship sails ' + d + ' km from port ' + M('A') + ' on a bearing of ' + String(b).padStart(3, '0') + '° to a buoy ' + M('B') + '.' + svg, parts: [
        { q: 'Work out how far east of ' + M('A') + ' the buoy is. Give your answer correct to 3 significant figures.', m: 2, a: M(d + '\\sin ' + b + '^\\circ = ' + sf(E, 3)) + ' km' },
        { q: 'Work out how far north of ' + M('A') + ' the buoy is. Give your answer correct to 3 significant figures.', m: 2, a: M(d + '\\cos ' + b + '^\\circ = ' + sf(N, 3)) + ' km' }
      ] };
    } },
    { d: [3], f: function () { // cuboid: line and plane
      var l = ri(4, 12), w = ri(3, 9), h = ri(3, 10), AC = Math.hypot(l, w), AG = Math.hypot(AC, h);
      return { stem: 'The diagram shows a cuboid ' + M('ABCDEFGH') + '.' + D.cuboid(l, w, h, true), parts: [
        { q: 'Work out the length of ' + M('AG') + '. Give your answer correct to 3 significant figures.', m: 3, a: M('AC = \\sqrt{' + l + '^2 + ' + w + '^2},\\ AG = \\sqrt{' + l + '^2 + ' + w + '^2 + ' + h + '^2} = ' + sf(AG, 3)) + ' cm' },
        { q: 'Work out the size of the angle between ' + M('AG') + ' and the plane ' + M('ABCD') + '. Give your answer correct to 1 decimal place.', m: 3, a: 'Angle ' + M('GAC') + ': ' + M('\\tan GAC = \\frac{' + h + '}{' + sf(AC, 4) + '} \\Rightarrow ' + dp(dg(Math.atan(h / AC)), 1) + '^\\circ') }
      ] };
    } },
    { d: [3], f: function () { // pyramid: line and plane
      var s = 2 * ri(3, 7), h = ri(6, 15), half = s * Math.SQRT2 / 2, VA = Math.hypot(half, h);
      return { stem: M('VABCD') + ' is a right pyramid with a square base of side ' + s + ' cm. ' + M('M') + ' is the centre of the base and ' + M('VM = ' + h) + ' cm.' + D.pyramid(s, h), parts: [
        { q: 'Work out the length of ' + M('VA') + '. Give your answer correct to 3 significant figures.', m: 3, a: M('AM = \\frac{1}{2}\\sqrt{' + s + '^2 + ' + s + '^2} = ' + sf(half, 4) + ',\\ VA = \\sqrt{' + sf(half, 4) + '^2 + ' + h + '^2} = ' + sf(VA, 3)) + ' cm' },
        { q: 'Work out the size of the angle between ' + M('VA') + ' and the base ' + M('ABCD') + '. Give your answer correct to 1 decimal place.', m: 2, a: M('\\tan VAM = \\frac{' + h + '}{' + sf(half, 4) + '} \\Rightarrow ' + dp(dg(Math.atan(h / half)), 1) + '^\\circ') }
      ] };
    } }
  ];
  var oldPT = BS.topics['pythagoras-trig'].gens;
  // keep: converse of Pythagoras (no diagram needed) and the isosceles-triangle question (has a diagram)
  BS.topics['pythagoras-trig'].gens = PT.concat(oldPT.filter(function (g) { var s = String(g.f); return s.indexOf('Is the triangle right-angled') > -1 || s.indexOf('isosceles triangle') > -1; }));

  /* ================= NON-RIGHT-ANGLED TRIGONOMETRY ================= */
  // triangle with vertices n[0], n[1], n[2]; side c = n[0]n[1] along the base
  function triFromSides(n, a, b, c) { // a = |n1 n2|, b = |n0 n2|, c = |n0 n1|
    var x = (b * b + c * c - a * a) / (2 * c), y = Math.sqrt(Math.max(0.01, b * b - x * x)), mir = Math.random() < 0.5, sc = 1 / Math.max(a, b, c), P = {};
    P[n[0]] = [0, 0]; P[n[1]] = [c * sc, 0]; P[n[2]] = [x * sc, y * sc];
    if (mir) Object.keys(P).forEach(function (k) { P[k] = [1 - P[k][0], P[k][1]]; });
    return P;
  }
  function triSAS(n, b, c, A) { var a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(rad(A))); return { P: triFromSides(n, a, b, c), a: a }; }
  function angAt(v, n) { var o = n.filter(function (k) { return k !== v; }); return { v: v, a: o[0], b: o[1] }; }
  function withT(an, t, d) { an.t = t; if (d) an.d = d; return an; }
  function sides3(n, lab) { return [{ p: n[1], q: n[2], t: lab[0] }, { p: n[0], q: n[2], t: lab[1] }, { p: n[0], q: n[1], t: lab[2] }].filter(function (s) { return s.t; }); }

  var SC = [
    { d: [2, 3], f: function () { // area 1/2 ab sin C
      var n = pick(NAMES), b = ri(5, 18), c = ri(5, 18), A = ri(35, 140), T = triSAS(n, b, c, A), area = 0.5 * b * c * Math.sin(rad(A));
      var fig = triFig(T.P, n, { sides: sides3(n, [null, b + ' cm', c + ' cm']), angles: [withT(angAt(n[0], n), deg(A), 32)] });
      return q1('The diagram shows triangle ' + M(n.join('')) + '.' + fig + 'Work out the area of the triangle. Give your answer correct to 3 significant figures.', 2,
        M('\\tfrac{1}{2} \\times ' + b + ' \\times ' + c + ' \\times \\sin ' + A + '^\\circ = ' + sf(area, 3)) + ' cm²');
    } },
    { d: [2, 3], f: function () { // cosine rule: side
      var n = pick(NAMES), b = ri(5, 20), c = ri(5, 20), A = ri(25, 130), T = triSAS(n, b, c, A);
      var fig = triFig(T.P, n, { sides: sides3(n, ['x cm', b + ' cm', c + ' cm']), angles: [withT(angAt(n[0], n), deg(A), 32)] });
      return q1('The diagram shows triangle ' + M(n.join('')) + '.' + fig + 'Work out the value of ' + M('x') + '. Give your answer correct to 3 significant figures.', 3,
        M('x^2 = ' + b + '^2 + ' + c + '^2 - 2(' + b + ')(' + c + ')\\cos ' + A + '^\\circ \\Rightarrow x = ' + sf(T.a, 3)));
    } },
    { d: [2, 3], f: function () { // sine rule: side
      var n = pick(NAMES), A = ri(30, 80), B = ri(30, 80), C = 180 - A - B, a = ri(60, 200) / 10;
      var b = a * Math.sin(rad(B)) / Math.sin(rad(A)), c = a * Math.sin(rad(C)) / Math.sin(rad(A));
      var fig = triFig(triFromSides(n, a, b, c), n, { sides: sides3(n, [num(a) + ' cm', 'x cm', null]), angles: [withT(angAt(n[0], n), deg(A), 32), withT(angAt(n[1], n), deg(B), 32)] });
      return q1('The diagram shows triangle ' + M(n.join('')) + '.' + fig + 'Work out the value of ' + M('x') + '. Give your answer correct to 3 significant figures.', 3,
        M('\\frac{x}{\\sin ' + B + '^\\circ} = \\frac{' + num(a) + '}{\\sin ' + A + '^\\circ} \\Rightarrow x = ' + sf(b, 3)));
    } },
    { d: [2, 3], f: function () { // cosine rule: angle
      var n = pick(NAMES), a, b, c; do { a = ri(5, 18); b = ri(5, 18); c = ri(5, 18); } while (a + b <= c + 2 || a + c <= b + 2 || b + c <= a + 2);
      var A = dg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
      var fig = triFig(triFromSides(n, a, b, c), n, { sides: sides3(n, [a + ' cm', b + ' cm', c + ' cm']), angles: [withT(angAt(n[0], n), 'x', 30)] });
      return q1('The diagram shows triangle ' + M(n.join('')) + '.' + fig + 'Work out the size of the angle marked ' + M('x') + '. Give your answer correct to 1 decimal place.', 3,
        M('\\cos x = \\frac{' + b + '^2 + ' + c + '^2 - ' + a + '^2}{2(' + b + ')(' + c + ')} \\Rightarrow x = ' + dp(A, 1) + '^\\circ'));
    } },
    { d: [2, 3], f: function () { // sine rule: acute angle
      var n = pick(NAMES), A = ri(40, 85), B = ri(25, 60); if (A + B > 150) B = 150 - A;
      var a = ri(80, 200) / 10, b = Math.round(a * Math.sin(rad(B)) / Math.sin(rad(A)) * 10) / 10, Bc = dg(Math.asin(b * Math.sin(rad(A)) / a)), C = 180 - A - Bc, c = a * Math.sin(rad(C)) / Math.sin(rad(A));
      var fig = triFig(triFromSides(n, a, b, c), n, { sides: sides3(n, [num(a) + ' cm', num(b) + ' cm', null]), angles: [withT(angAt(n[0], n), deg(A), 32), withT(angAt(n[1], n), 'x', 30)] });
      return q1('The diagram shows triangle ' + M(n.join('')) + '. The angle marked ' + M('x') + ' is acute.' + fig + 'Work out the value of ' + M('x') + '. Give your answer correct to 1 decimal place.', 3,
        M('\\sin x = \\frac{' + num(b) + '\\sin ' + A + '^\\circ}{' + num(a) + '} \\Rightarrow x = ' + dp(Bc, 1) + '^\\circ'));
    } },
    { d: [3], f: function () { // sine rule: obtuse angle
      var n = pick(NAMES), B = ri(100, 135), A = ri(15, Math.min(45, 165 - B)), b = ri(100, 220) / 10, a = Math.round(b * Math.sin(rad(A)) / Math.sin(rad(B)) * 10) / 10;
      var sx = b * Math.sin(rad(A)) / a, X = 180 - dg(Math.asin(sx)), C = 180 - A - X, c = b * Math.sin(rad(C)) / Math.sin(rad(X));
      var fig = triFig(triFromSides(n, a, b, c), n, { sides: sides3(n, [num(a) + ' cm', num(b) + ' cm', null]), angles: [withT(angAt(n[0], n), deg(A), 32), withT(angAt(n[1], n), 'x', 24)] });
      return q1('The diagram shows triangle ' + M(n.join('')) + '. The angle marked ' + M('x') + ' is obtuse.' + fig + 'Work out the value of ' + M('x') + '. Give your answer correct to 1 decimal place.', 4,
        M('\\sin x = \\frac{' + num(b) + '\\sin ' + A + '^\\circ}{' + num(a) + '} = ' + dp(sx, 4)) + '. ' + M('\\sin^{-1}') + ' gives the acute angle ' + M(dp(180 - X, 1) + '^\\circ') + ', so ' + M('x = 180 - ' + dp(180 - X, 1) + ' = ' + dp(X, 1) + '^\\circ') + '.');
    } },
    { d: [3], f: function () { // given area, find angle
      var n = pick(NAMES), b = ri(6, 16), c = ri(6, 16), A = ri(25, 80), area = Math.round(0.5 * b * c * Math.sin(rad(A)));
      var Ar = dg(Math.asin(2 * area / (b * c))), T = triSAS(n, b, c, Ar);
      var fig = triFig(T.P, n, { sides: sides3(n, [null, b + ' cm', c + ' cm']), angles: [withT(angAt(n[0], n), 'x', 30)] });
      return q1('The area of triangle ' + M(n.join('')) + ' is ' + area + ' cm². The angle marked ' + M('x') + ' is acute.' + fig + 'Work out the value of ' + M('x') + '. Give your answer correct to 1 decimal place.', 3,
        M('\\tfrac{1}{2} \\times ' + b + ' \\times ' + c + ' \\sin x = ' + area + ' \\Rightarrow \\sin x = ' + frac(2 * area, b * c) + ' \\Rightarrow x = ' + dp(Ar, 1) + '^\\circ'));
    } },
    { d: [3], f: function () { // quadrilateral split by a diagonal
      var AB = ri(6, 14), AD = ri(6, 14), A = ri(60, 110), BD = Math.sqrt(AB * AB + AD * AD - 2 * AB * AD * Math.cos(rad(A)));
      var C = ri(40, 75), DBC = ri(30, 70); if (C + DBC > 150) DBC = 150 - C;
      var BDC = 180 - C - DBC, BC = BD * Math.sin(rad(BDC)) / Math.sin(rad(C)), CD = BD * Math.sin(rad(DBC)) / Math.sin(rad(C));
      // coordinates
      var Pa = [0, 0], Pb = [AB, 0], Pd = [AD * Math.cos(rad(A)), AD * Math.sin(rad(A)) ];
      var ang = Math.atan2(Pd[1] - Pb[1], Pd[0] - Pb[0]) - rad(DBC), Pc = [Pb[0] + BC * Math.cos(ang), Pb[1] + BC * Math.sin(ang)];
      var fig = D.geo({ pts: { A: Pa, B: Pb, C: Pc, D: Pd }, polys: [['A', 'B', 'C', 'D']], segs: [['B', 'D', 'dash']], slabels: [{ p: 'A', q: 'B', t: AB + ' cm' }, { p: 'A', q: 'D', t: AD + ' cm' }],
        angles: [{ v: 'A', a: 'B', b: 'D', t: deg(A), d: 30 }, { v: 'C', a: 'B', b: 'D', t: deg(C), d: 30 }, { v: 'B', a: 'D', b: 'C', t: deg(DBC), d: 36, r: 20 }], w: 320, h: 260, label: 'Quadrilateral ABCD' });
      return { stem: 'The diagram shows a quadrilateral ' + M('ABCD') + '.' + fig, parts: [
        { q: 'Work out the length of ' + M('BD') + '. Give your answer correct to 3 significant figures.', m: 3, a: M('BD^2 = ' + AB + '^2 + ' + AD + '^2 - 2(' + AB + ')(' + AD + ')\\cos ' + A + '^\\circ \\Rightarrow BD = ' + sf(BD, 3)) + ' cm' },
        { q: 'Work out the length of ' + M('CD') + '. Give your answer correct to 3 significant figures.', m: 3, a: M('\\frac{CD}{\\sin ' + DBC + '^\\circ} = \\frac{' + sf(BD, 4) + '}{\\sin ' + C + '^\\circ} \\Rightarrow CD = ' + sf(CD, 3)) + ' cm' }
      ] };
    } },
    { d: [3], f: function () { // bearings + cosine rule
      var d1 = ri(8, 30), d2 = ri(8, 30), b1 = ri(30, 80), b2 = b1 + ri(70, 120);
      var B = [d1 * Math.sin(rad(b1)), d1 * Math.cos(rad(b1))], C = [B[0] + d2 * Math.sin(rad(b2)), B[1] + d2 * Math.cos(rad(b2))];
      var angB = 180 - (b2 - b1), AC = Math.sqrt(d1 * d1 + d2 * d2 - 2 * d1 * d2 * Math.cos(rad(angB)));
      var fig = D.bearings([{ x: 0, y: 0, name: 'A' }, { x: B[0], y: B[1], name: 'B', seg: d1 + ' km' }, { x: C[0], y: C[1], name: 'C', seg: d2 + ' km' }], ['A', 'B'], true);
      return q1('A boat sails ' + d1 + ' km from ' + M('A') + ' to ' + M('B') + ' on a bearing of ' + String(b1).padStart(3, '0') + '°. It then sails ' + d2 + ' km from ' + M('B') + ' to ' + M('C') + ' on a bearing of ' + String(b2).padStart(3, '0') + '°.' + fig + 'Work out the distance ' + M('AC') + '. Give your answer correct to 3 significant figures.', 4,
        'Angle ' + M('ABC = 180 - (' + b2 + ' - ' + b1 + ') = ' + angB + '^\\circ') + ' (co-interior angles with the north lines). ' + M('AC^2 = ' + d1 + '^2 + ' + d2 + '^2 - 2(' + d1 + ')(' + d2 + ')\\cos ' + angB + '^\\circ \\Rightarrow AC = ' + sf(AC, 3)) + ' km');
    } },
    { d: [2, 3], f: function () { // perimeter with cosine rule then area
      var n = pick(NAMES), b = ri(6, 15), c = ri(6, 15), A = ri(95, 140), T = triSAS(n, b, c, A);
      var fig = triFig(T.P, n, { sides: sides3(n, [null, b + ' cm', c + ' cm']), angles: [withT(angAt(n[0], n), deg(A), 26)] });
      return { stem: 'The diagram shows triangle ' + M(n.join('')) + '.' + fig, parts: [
        { q: 'Work out the perimeter of the triangle. Give your answer correct to 3 significant figures.', m: 3, a: M(n[1] + n[2] + ' = \\sqrt{' + b + '^2 + ' + c + '^2 - 2(' + b + ')(' + c + ')\\cos ' + A + '^\\circ} = ' + sf(T.a, 4)) + '; perimeter ' + M('= ' + sf(T.a + b + c, 3)) + ' cm' },
        { q: 'Work out the area of the triangle. Give your answer correct to 3 significant figures.', m: 2, a: M('\\tfrac{1}{2}(' + b + ')(' + c + ')\\sin ' + A + '^\\circ = ' + sf(0.5 * b * c * Math.sin(rad(A)), 3)) + ' cm²' }
      ] };
    } }
  ];
  BS.topics['sine-cosine'].gens = SC;
  BS.topics['sine-cosine'].name = 'Sine rule, cosine rule and area of a triangle';

  /* ================= ARITHMETIC SERIES (4MA1 3.1) ================= */
  var seq = BS.topics.sequences;
  seq.name = 'Arithmetic sequences and series';
  seq.gens.push(
    { d: [2, 3], f: function () {
      var a = ri(2, 15), d = ri(2, 9), n = ri(20, 60), S = n * (2 * a + (n - 1) * d) / 2;
      return q1('Here are the first four terms of an arithmetic series.<br>' + M([a, a + d, a + 2 * d, a + 3 * d].join(' + ') + ' + \\ldots') + '<br>Find the sum of the first ' + n + ' terms of the series.', 2,
        M('S_{' + n + '} = \\frac{' + n + '}{2}(2 \\times ' + a + ' + ' + (n - 1) + ' \\times ' + d + ') = ' + num(S)));
    } },
    { d: [2, 3], f: function () {
      var a = ri(-10, 20), d = nz(-6, 7), p = ri(3, 6), q = ri(p + 3, 14);
      return q1('The ' + p + 'th term of an arithmetic sequence is ' + (a + (p - 1) * d) + '. The ' + q + 'th term is ' + (a + (q - 1) * d) + '.<br>Find the first term and the common difference.', 3,
        M((q - p) + 'd = ' + ((q - p) * d) + ' \\Rightarrow d = ' + d) + ', ' + M('a = ' + a));
    } },
    { d: [3], f: function () {
      var a = ri(2, 12), d = ri(2, 8), n = ri(12, 40), S = n * (2 * a + (n - 1) * d) / 2;
      return q1('The first term of an arithmetic series is ' + a + ' and the common difference is ' + d + '. The sum of the first ' + M('n') + ' terms is ' + num(S) + '.<br>Find the value of ' + M('n') + '.', 4,
        M('\\frac{n}{2}(' + 2 * a + ' + ' + d + '(n - 1)) = ' + S + ' \\Rightarrow ' + poly([d, 2 * a - d, -2 * S], 'n') + ' = 0 \\Rightarrow n = ' + n));
    } },
    { d: [3], f: function () {
      var a = ri(2, 20), d = ri(2, 9), k = ri(3, 7), N = ri(10, 30), S = N * (2 * a + (N - 1) * d) / 2, t = a + (k - 1) * d;
      return q1('The ' + k + 'th term of an arithmetic series is ' + t + '. The sum of the first ' + N + ' terms is ' + num(S) + '.<br>Find the first term and the common difference of the series.', 4,
        M('a + ' + (k - 1) + 'd = ' + t) + ' and ' + M(N + 'a + ' + N * (N - 1) / 2 + 'd = ' + S) + ', so ' + M('a = ' + a + ',\\ d = ' + d));
    } },
    { d: [3], f: function () {
      var a = ri(3, 15), d = ri(2, 7), L = ri(200, 900), n = 0, s = 0; while (s <= L) { n++; s += a + (n - 1) * d; }
      return q1('An arithmetic series has first term ' + a + ' and common difference ' + d + '.<br>Find the least number of terms needed for the sum of the series to be greater than ' + L + '.', 4,
        M('\\frac{n}{2}(' + 2 * a + ' + ' + d + '(n - 1)) > ' + L) + '. ' + M('S_{' + (n - 1) + '} = ' + (s - (a + (n - 1) * d))) + ', ' + M('S_{' + n + '} = ' + s) + ', so ' + M('n = ' + n));
    } }
  );
})(typeof window !== 'undefined' ? window : globalThis);
