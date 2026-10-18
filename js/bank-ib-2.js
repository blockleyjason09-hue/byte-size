/* Byte Size — IB Mathematics: Applications and Interpretation
   Part 2: Topic 3 Geometry and trigonometry (including vectors, matrices as transformations and graph theory). */
(function (g) {
  var BS = g.BS, D = BS.draw, IB = BS.ib;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, num = BS.num, M = BS.m;
  var s3 = IB.s3, vec = IB.vec, mat = IB.mat, q1 = IB.q1, T = BS.topic;
  var DEG = Math.PI / 180;
  function deg(x) { return x / DEG; }

  T({ id: 'ib-3d', name: '3D geometry: solids, distances and angles', video: 'IB maths AI 3D trigonometry angle between line and plane', gens: [
    { d: [1, 2], f: function () {
      var l = ri(6, 15), w = ri(3, 9), h = ri(3, 10);
      var ac = Math.hypot(l, w), ag = Math.hypot(l, w, h);
      return { stem: 'The diagram shows a cuboid ' + M('ABCDEFGH') + ' with ' + M('AB = ' + l) + ' cm, ' + M('BC = ' + w) + ' cm and ' + M('AE = ' + h) + ' cm.' + D.cuboid(l, w, h, true), parts: [
        { q: 'Find the length of ' + M('AC') + '.', m: 2, a: M('\\sqrt{' + (l * l + w * w) + '}') + ' = ' + s3(ac) + ' cm' },
        { q: 'Find the length of ' + M('AG') + '.', m: 2, a: s3(ag) + ' cm' },
        { q: 'Find the angle between ' + M('AG') + ' and the base ' + M('ABCD') + '.', m: 2, a: M('\\tan^{-1}\\left(\\frac{' + h + '}{' + s3(ac) + '}\\right)') + ' = ' + s3(deg(Math.atan(h / ac))) + '°' }
      ] };
    } },
    { d: [2, 3], f: function () {
      var s = ri(6, 14), h = ri(8, 20), half = s * Math.SQRT2 / 2, va = Math.hypot(h, half);
      return { stem: 'A right pyramid ' + M('VABCD') + ' has a square base of side ' + s + ' cm. ' + M('M') + ' is the centre of the base and the height ' + M('VM') + ' is ' + h + ' cm.' + D.pyramid(s, h), parts: [
        { q: 'Find the length of ' + M('AC') + '.', m: 2, a: M(s + '\\sqrt{2}') + ' = ' + s3(s * Math.SQRT2) + ' cm' },
        { q: 'Find the length of ' + M('VA') + '.', m: 2, a: s3(va) + ' cm' },
        { q: 'Find the volume of the pyramid.', m: 2, a: M('\\frac{1}{3} \\times ' + s + '^2 \\times ' + h) + ' = ' + s3(s * s * h / 3) + ' cm³' },
        { q: 'Find the angle between the edge ' + M('VA') + ' and the base ' + M('ABCD') + '.', m: 2, a: s3(deg(Math.atan(h / half))) + '°' }
      ] };
    } },
    { d: [3], f: function () {
      var A = [ri(-5, 5), ri(-5, 5), ri(-5, 5)], B = [ri(-5, 8), ri(-5, 8), ri(-5, 8)], r = ri(3, 9), l = r + ri(2, 8);
      var hgt = Math.sqrt(l * l - r * r);
      return { parts: [
        { q: 'Find the distance between the points ' + M('P(' + A.join(',\\ ') + ')') + ' and ' + M('Q(' + B.join(',\\ ') + ')') + '.', m: 2, a: s3(Math.hypot(B[0] - A[0], B[1] - A[1], B[2] - A[2])) },
        { q: 'Find the coordinates of the midpoint of ' + M('PQ') + '.', m: 1, a: M('(' + A.map(function (v, i) { return num((v + B[i]) / 2); }).join(',\\ ') + ')') },
        { q: 'A cone has base radius ' + r + ' cm and slant height ' + l + ' cm. Find its total surface area.', m: 2, a: M('\\pi(' + r + ')^2 + \\pi(' + r + ')(' + l + ')') + ' = ' + s3(Math.PI * r * r + Math.PI * r * l) + ' cm²' },
        { q: 'Find the volume of the cone.', m: 2, a: 'Height ' + s3(hgt) + ' cm; volume ' + s3(Math.PI * r * r * hgt / 3) + ' cm³' }
      ] };
    } }
  ] });

  function triFromSAS(a, b, C) { // CB = a, CA = b, angle C (degrees). Return vertices [A, B, C]
    return [[b, 0], [a * Math.cos(C * DEG), a * Math.sin(C * DEG)], [0, 0]];
  }
  T({ id: 'ib-trig', name: 'Sine rule, cosine rule and area of a triangle', video: 'IB maths AI sine rule cosine rule', gens: [
    { d: [1], f: function () {
      var a = ri(5, 15), b = ri(5, 15), C = ri(30, 130);
      var P = triFromSAS(a, b, C);
      return q1('The diagram shows triangle ' + M('ABC') + ' with ' + M('CA = ' + b) + ' cm, ' + M('CB = ' + a) + ' cm and ' + M('A\\hat{C}B = ' + C + '^\\circ') + '.' +
        D.triangle(P, { sides: [null, a + ' cm', b + ' cm'], ang: [null, null, C + '°'] }) + 'Find the area of the triangle.', 3,
        M('\\frac{1}{2} \\times ' + a + ' \\times ' + b + ' \\times \\sin ' + C + '^\\circ') + ' = ' + s3(0.5 * a * b * Math.sin(C * DEG)) + ' cm²');
    } },
    { d: [2], f: function () {
      var a = ri(6, 16), b = ri(6, 16), C = ri(35, 120);
      var P = triFromSAS(a, b, C), c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * DEG));
      var A = deg(Math.acos(Math.max(-1, Math.min(1, (b * b + c * c - a * a) / (2 * b * c)))));
      return { stem: 'In triangle ' + M('ABC') + ', ' + M('CA = ' + b) + ' cm, ' + M('CB = ' + a) + ' cm and ' + M('A\\hat{C}B = ' + C + '^\\circ') + '.' + D.triangle(P, { sides: [null, a + ' cm', b + ' cm'], ang: [null, null, C + '°'] }), parts: [
        { q: 'Find ' + M('AB') + '.', m: 3, a: s3(c) + ' cm' },
        { q: 'Find ' + M('C\\hat{A}B') + '.', m: 3, a: s3(A) + '°' }
      ] };
    } },
    { d: [3], f: function () {
      var a, b, c; do { a = ri(5, 16); b = ri(5, 16); c = ri(5, 16); } while (a + b <= c + 2 || a + c <= b + 2 || b + c <= a + 2);
      var A = deg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
      var P = [[0, 0], [c, 0], [b * Math.cos(A * DEG), b * Math.sin(A * DEG)]];
      var big = Math.max(a, b, c), opp = big === a ? 'A' : big === b ? 'B' : 'C';
      var angBig = deg(Math.acos((a * a + b * b + c * c - 2 * big * big) / (2 * (big === a ? b * c : big === b ? a * c : a * b))));
      return { stem: 'A triangular field ' + M('ABC') + ' has sides ' + M('AB = ' + c) + ' m, ' + M('BC = ' + a) + ' m and ' + M('CA = ' + b) + ' m.' + D.triangle(P, { sides: [c + ' m', a + ' m', b + ' m'] }), parts: [
        { q: 'Find the size of the largest angle of the field.', m: 3, a: 'Angle at ' + opp + ' = ' + s3(angBig) + '°' },
        { q: 'Find the area of the field.', m: 2, a: s3(0.5 * b * c * Math.sin(A * DEG)) + ' m²' }
      ] };
    } }
  ] });

  T({ id: 'ib-bearings', name: 'Bearings, elevation and depression', video: 'IB maths AI bearings angle of elevation', gens: [
    { d: [1, 2], f: function () {
      var d1 = ri(5, 20), d2 = ri(5, 20), b1, b2, ang;
      do { b1 = 5 * ri(2, 34); b2 = 5 * ri(2, 70); ang = Math.abs(((b2 - b1 + 540) % 360) - 180); } while (ang < 35 || ang > 145);
      var Q = { x: d1 * Math.sin(b1 * DEG), y: d1 * Math.cos(b1 * DEG) }, R = { x: Q.x + d2 * Math.sin(b2 * DEG), y: Q.y + d2 * Math.cos(b2 * DEG) };
      var pqr = 180 - ang, PR = Math.hypot(R.x, R.y);
      var bearRP = (deg(Math.atan2(-R.x, -R.y)) + 360) % 360;
      var pad3 = function (n) { return ('00' + n).slice(-3); };
      return { stem: 'A ship sails ' + d1 + ' km from port ' + M('P') + ' on a bearing of ' + pad3(b1) + '° to point ' + M('Q') + '. It then sails ' + d2 + ' km on a bearing of ' + pad3(b2) + '° to point ' + M('R') + '.' +
        D.bearings([{ x: 0, y: 0, name: 'P' }, { x: Q.x, y: Q.y, name: 'Q' }, { x: R.x, y: R.y, name: 'R' }], ['P', 'Q'], true), parts: [
        { q: 'Show that ' + M('P\\hat{Q}R = ' + pqr + '^\\circ') + '.', m: 2, a: 'Using angles on a straight line and alternate angles at the north lines: ' + M('180^\\circ - ' + ang + '^\\circ = ' + pqr + '^\\circ') },
        { q: 'Find the distance ' + M('PR') + '.', m: 3, a: s3(PR) + ' km' },
        { q: 'Find the bearing of ' + M('P') + ' from ' + M('R') + '.', m: 3, a: s3(bearRP) + '°' }
      ] };
    } },
    { d: [1, 2], f: function () {
      var Dd = ri(20, 90), al = ri(20, 55), H = Dd * Math.tan(al * DEG), d = ri(5, Math.floor(Dd / 2));
      var P = [[0, 0], [Dd, 0], [Dd, H]];
      return { stem: 'Amir stands at point ' + M('A') + ', ' + Dd + ' m from the base ' + M('F') + ' of a vertical tower ' + M('FT') + '. The angle of elevation of the top of the tower ' + M('T') + ' from ' + M('A') + ' is ' + al + '°.' +
        D.triangle(P, { names: ['A', 'F', 'T'], right: 1, sides: [Dd + ' m', null, null], ang: [al + '°', null, null] }), parts: [
        { q: 'Find the height of the tower.', m: 2, a: M(Dd + '\\tan ' + al + '^\\circ') + ' = ' + s3(H) + ' m' },
        { q: 'Amir walks ' + d + ' m directly towards the tower. Find the new angle of elevation of ' + M('T') + '.', m: 2, a: s3(deg(Math.atan(H / (Dd - d)))) + '°' }
      ] };
    } },
    { d: [3], f: function () {
      var a, b, d; do { a = ri(15, 40); b = a + ri(8, 30); d = ri(20, 80); } while (b >= 80);
      var H = d * Math.sin(a * DEG) * Math.sin(b * DEG) / Math.sin((b - a) * DEG), F = H / Math.tan(a * DEG);
      var W = 320, Hh = 200, sc = Math.min(260 / F, 150 / H), ox = 30, oy = 180;
      var X = function (x) { return ox + x * sc; }, Y = function (y) { return oy - y * sc; };
      var s = D.line(X(0), Y(0), X(F), Y(0)) + D.line(X(F), Y(0), X(F), Y(H)) + D.line(X(0), Y(0), X(F), Y(H)) + D.line(X(d), Y(0), X(F), Y(H)) +
        D.text(X(0), Y(0) + 14, 'A', { anchor: 'middle', cls: 'it' }) + D.text(X(d), Y(0) + 14, 'B', { anchor: 'middle', cls: 'it' }) + D.text(X(F) + 12, Y(0), 'F', { cls: 'it' }) + D.text(X(F) + 12, Y(H), 'T', { cls: 'it' }) +
        D.text(X(0) + 36, Y(0) - 10, a + '°', { size: 12 }) + D.text(X(d) + 34, Y(0) - 10, b + '°', { size: 12 }) + D.text((X(0) + X(d)) / 2, Y(0) + 14, d + ' m', { anchor: 'middle', size: 12 });
      return { stem: 'From point ' + M('A') + ' the angle of elevation of the top ' + M('T') + ' of a vertical tower ' + M('FT') + ' is ' + a + '°. From point ' + M('B') + ', ' + d + ' m closer to the tower on horizontal ground, the angle of elevation is ' + b + '°.' + D.svg(W, Hh, s, 'Angles of elevation'), parts: [
        { q: 'Find ' + M('A\\hat{T}B') + '.', m: 1, a: (b - a) + '°' },
        { q: 'Find ' + M('BT') + '.', m: 3, a: M('\\frac{' + d + '\\sin ' + a + '^\\circ}{\\sin ' + (b - a) + '^\\circ}') + ' = ' + s3(d * Math.sin(a * DEG) / Math.sin((b - a) * DEG)) + ' m' },
        { q: 'Find the height of the tower.', m: 2, a: s3(H) + ' m' }
      ] };
    } }
  ] });

  T({ id: 'ib-radians', name: 'Arcs, sectors and radians', video: 'IB maths AI radians arc length sector area', gens: [
    { d: [1], f: function () {
      var r = ri(4, 15), th = ri(5, 25) / 10;
      return { stem: 'The diagram shows a sector ' + M('OAB') + ' of a circle with centre ' + M('O') + ' and radius ' + r + ' cm. Angle ' + M('A\\hat{O}B = ' + th) + ' radians.' + D.sector(th, r + ' cm', th + ' rad'), parts: [
        { q: 'Find the length of the arc ' + M('AB') + '.', m: 2, a: M(r + ' \\times ' + th) + ' = ' + s3(r * th) + ' cm' },
        { q: 'Find the area of the sector.', m: 2, a: M('\\frac{1}{2} \\times ' + r + '^2 \\times ' + th) + ' = ' + s3(0.5 * r * r * th) + ' cm²' }
      ] };
    } },
    { d: [2], f: function () {
      var dg = pick([40, 60, 72, 80, 100, 120, 135, 150]), r = ri(5, 14), th = dg * DEG;
      return { stem: 'A sector of a circle has radius ' + r + ' cm and angle ' + dg + '°.' + D.sector(th, r + ' cm', dg + '°'), parts: [
        { q: 'Write ' + dg + '° in radians, as an exact fraction of ' + M('\\pi') + '.', m: 1, a: M(IB.pif(dg, 180)) },
        { q: 'Find the length of the chord ' + M('AB') + '.', m: 2, a: M('2 \\times ' + r + '\\sin\\left(' + IB.pif(dg, 360) + '\\right)') + ' = ' + s3(2 * r * Math.sin(th / 2)) + ' cm' },
        { q: 'Find the area of the segment between the chord ' + M('AB') + ' and the arc.', m: 3, a: M('\\frac{1}{2}(' + r + ')^2(\\theta - \\sin\\theta)') + ' = ' + s3(0.5 * r * r * (th - Math.sin(th))) + ' cm²' }
      ] };
    } },
    { d: [3], f: function () {
      var r = ri(5, 12), th = ri(6, 28) / 10, A = Math.round(0.5 * r * r * th * 10) / 10, thc = 2 * A / (r * r);
      return { stem: 'A sector of a circle with radius ' + r + ' cm has area ' + A + ' cm².', parts: [
        { q: 'Find the angle of the sector in radians.', m: 2, a: s3(thc) },
        { q: 'Find the perimeter of the sector.', m: 2, a: s3(2 * r + r * thc) + ' cm' },
        { q: 'Find the angle of the sector in degrees.', m: 1, a: s3(deg(thc)) + '°' }
      ] };
    } }
  ] });

  T({ id: 'ib-voronoi', name: 'Perpendicular bisectors and Voronoi diagrams', video: 'IB maths AI Voronoi diagrams', gens: [
    { d: [1], f: function () {
      var A, B; do { A = [ri(1, 9), ri(1, 9)]; B = [ri(1, 9), ri(1, 9)]; } while ((A[0] - B[0]) % 2 || (A[1] - B[1]) % 2 || (A[0] === B[0] && A[1] === B[1]));
      var Mx = (A[0] + B[0]) / 2, My = (A[1] + B[1]) / 2, dx = B[0] - A[0], dy = B[1] - A[1];
      var eq = dy === 0 ? 'x = ' + Mx : IB.lineEq(-dx, dy, My * dy + dx * Mx, dy);
      return { stem: 'Two shops are located at ' + M('A(' + A.join(',\\ ') + ')') + ' and ' + M('B(' + B.join(',\\ ') + ')') + '. The perpendicular bisector of ' + M('AB') + ' divides the region into the points closer to each shop.' + D.voronoi([A, B], ['A', 'B'], 10, 10), parts: [
        { q: 'Find the midpoint of ' + M('AB') + '.', m: 1, a: M('(' + Mx + ',\\ ' + My + ')') },
        { q: 'Find the gradient of ' + M('AB') + '.', m: 1, a: dx === 0 ? 'Undefined (vertical line)' : M(frac(dy, dx)) },
        { q: 'Find the equation of the perpendicular bisector of ' + M('AB') + '.', m: 2, a: M(eq) }
      ] };
    } },
    { d: [2], f: function () {
      var sites, names = ['A', 'B', 'C', 'D', 'E'], P, d2, best;
      do {
        sites = []; while (sites.length < 5) { var s = [ri(1, 13), ri(1, 13)]; if (!sites.some(function (t) { return Math.hypot(t[0] - s[0], t[1] - s[1]) < 4; })) sites.push(s); }
        P = [ri(1, 13), ri(1, 13)]; d2 = sites.map(function (s) { return Math.hypot(s[0] - P[0], s[1] - P[1]); });
        best = d2.indexOf(Math.min.apply(null, d2));
      } while (d2.some(function (v, i) { return i !== best && v - d2[best] < 0.8; }) || d2[best] < 1);
      return { stem: 'The Voronoi diagram shows the locations of five mobile-phone masts ' + M('A') + ' to ' + M('E') + '. Each cell contains the points closest to that mast. A new house is built at ' + M('H(' + P.join(',\\ ') + ')') + '.' + D.voronoi(sites, names, 14, 14, [[P[0], P[1], 'H']]), parts: [
        { q: 'Write down which mast is closest to ' + M('H') + '.', m: 1, a: names[best] + ' ' + M('(' + sites[best].join(',\\ ') + ')') },
        { q: 'Find the distance from ' + M('H') + ' to this mast.', m: 2, a: s3(d2[best]) + ' units' }
      ] };
    } },
    { d: [3], f: function () {
      var offs = BS.shuffle([[3, 4], [-3, 4], [4, -3], [-4, -3], [5, 0], [0, -5], [-5, 0], [0, 5]]), pts, c = [ri(6, 8), ri(6, 8)];
      do { pts = BS.shuffle(offs).slice(0, 3); } while (Math.min(Math.hypot(pts[0][0] - pts[1][0], pts[0][1] - pts[1][1]), Math.hypot(pts[0][0] - pts[2][0], pts[0][1] - pts[2][1]), Math.hypot(pts[1][0] - pts[2][0], pts[1][1] - pts[2][1])) < 5);
      var sites = pts.map(function (o) { return [c[0] + o[0], c[1] + o[1]]; });
      return { stem: 'Three towns are located at ' + M('A(' + sites[0].join(',\\ ') + ')') + ', ' + M('B(' + sites[1].join(',\\ ') + ')') + ' and ' + M('C(' + sites[2].join(',\\ ') + ')') + '. The Voronoi diagram for the towns is shown. A waste site is to be built at the point that is the same distance from all three towns.' + D.voronoi(sites, ['A', 'B', 'C'], 14, 14), parts: [
        { q: 'Find the coordinates of the point that is equidistant from all three towns.', m: 4, a: M('(' + c.join(',\\ ') + ')') },
        { q: 'Find the distance from this point to each town.', m: 2, a: '5 units' }
      ] };
    } }
  ] });

  T({ id: 'ib-trig-eq', name: 'Unit circle, identities and trigonometric equations', video: 'IB maths AI unit circle trig equations', gens: [
    { d: [1], f: function () {
      var tab = [[1, 6, '\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}'], [1, 4, '\\frac{\\sqrt{2}}{2}', '\\frac{\\sqrt{2}}{2}'], [1, 3, '\\frac{\\sqrt{3}}{2}', '\\frac{1}{2}']];
      var t = pick(tab), q = pick([1, 2, 3]); // quadrant multiples
      var n = q === 1 ? t[0] : q === 2 ? t[1] - t[0] : t[1] + t[0], d = t[1];
      var sinS = q === 3 ? '-' : '', cosS = q === 1 ? '' : '-';
      return { parts: [
        { q: 'Find the exact value of ' + M('\\sin\\left(' + IB.pif(n, d) + '\\right)') + '.', m: 1, a: M(sinS + t[2]) },
        { q: 'Find the exact value of ' + M('\\cos\\left(' + IB.pif(n, d) + '\\right)') + '.', m: 1, a: M(cosS + t[3]) }
      ] };
    } },
    { d: [2], f: function () {
      var eqs = [['2\\sin x - 1 = 0', [[1, 6], [5, 6]]], ['2\\sin x - \\sqrt{3} = 0', [[1, 3], [2, 3]]], ['2\\cos x - 1 = 0', [[1, 3], [5, 3]]], ['2\\cos x + 1 = 0', [[2, 3], [4, 3]]],
        ['\\tan x = 1', [[1, 4], [5, 4]]], ['\\sqrt{3}\\tan x = 1', [[1, 6], [7, 6]]], ['2\\sin x + 1 = 0', [[7, 6], [11, 6]]], ['\\sqrt{2}\\cos x + 1 = 0', [[3, 4], [5, 4]]]];
      var e = pick(eqs);
      return q1('Solve ' + M(e[0]) + ' for ' + M('0 \\le x \\le 2\\pi') + '. Give your answers as exact values.', 3, M('x = ' + e[1].map(function (p) { return IB.pif(p[0], p[1]); }).join(',\\ ')));
    } },
    { d: [3], f: function () {
      var t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), p = t[0], q = t[1], r = t[2];
      return { stem: 'The angle ' + M('\\theta') + ' is obtuse and ' + M('\\sin\\theta = \\frac{' + p + '}{' + r + '}') + '.', parts: [
        { q: 'Find the exact value of ' + M('\\cos\\theta') + '.', m: 2, a: M('\\cos\\theta = -\\sqrt{1 - \\frac{' + p * p + '}{' + r * r + '}} = -\\frac{' + q + '}{' + r + '}') },
        { q: 'Find the exact value of ' + M('\\tan\\theta') + '.', m: 1, a: M('-\\frac{' + p + '}{' + q + '}') },
        { q: 'Find ' + M('\\theta') + ' in radians.', m: 1, a: s3(Math.PI - Math.asin(p / r)) }
      ] };
    } }
  ] });

  T({ id: 'ib-mat-transform', name: 'Matrix transformations', video: 'IB maths AI matrix transformations', gens: [
    { d: [1], f: function () {
      var tr = pick([['a rotation of 90° anticlockwise about the origin', [[0, -1], [1, 0]]], ['a reflection in the line ' + M('y = x'), [[0, 1], [1, 0]]], ['a reflection in the ' + M('y') + '-axis', [[-1, 0], [0, 1]]], ['a rotation of 180° about the origin', [[-1, 0], [0, -1]]], ['an enlargement, scale factor 3, centre the origin', [[3, 0], [0, 3]]]]);
      var p = nz(-5, 5), q = nz(-5, 5), im = IB.mm(tr[1], [[p], [q]]);
      return { parts: [
        { q: 'Write down the matrix that represents ' + tr[0] + '.', m: 1, a: M(mat(tr[1])) },
        { q: 'Find the image of the point ' + M('(' + p + ',\\ ' + q + ')') + ' under this transformation.', m: 2, a: M('(' + im[0][0] + ',\\ ' + im[1][0] + ')') }
      ] };
    } },
    { d: [2], f: function () {
      var Pts = [[1, 1], [ri(3, 4), 1], [ri(1, 3), ri(3, 4)]], Mx;
      do { Mx = [[ri(-2, 3), ri(-2, 2)], [ri(-2, 2), ri(-2, 3)]]; } while (Mx[0][0] * Mx[1][1] - Mx[0][1] * Mx[1][0] === 0);
      var det = Mx[0][0] * Mx[1][1] - Mx[0][1] * Mx[1][0];
      var area = Math.abs((Pts[1][0] - Pts[0][0]) * (Pts[2][1] - Pts[0][1]) - (Pts[2][0] - Pts[0][0]) * (Pts[1][1] - Pts[0][1])) / 2;
      var img = Pts.map(function (p) { var v = IB.mm(Mx, [[p[0]], [p[1]]]); return [v[0][0], v[1][0]]; });
      var pl = D.plane({ xmin: -1, xmax: 6, ymin: -1, ymax: 6, w: 280, h: 280, grid: true, ticks: true });
      var s = pl.svg + D.poly(Pts.map(function (p) { return [pl.X(p[0]), pl.Y(p[1])]; }), 'shape');
      ['P', 'Q', 'R'].forEach(function (n, i) { s += D.text(pl.X(Pts[i][0]) + (i === 1 ? 10 : -10), pl.Y(Pts[i][1]) - 8, n, { anchor: 'middle', cls: 'it' }); });
      return { stem: 'Triangle ' + M('PQR') + ' is shown on the grid. It is transformed by the matrix ' + M('\\mathbf{T} = ' + mat(Mx)) + '.' + D.svg(280, 280, s, 'Triangle PQR', true), parts: [
        { q: 'Find the coordinates of the image of each vertex.', m: 3, a: img.map(function (v, i) { return M(["P'", "Q'", "R'"][i] + '(' + v.join(',\\ ') + ')'); }).join(', ') },
        { q: 'Find the area of triangle ' + M('PQR') + '.', m: 1, a: num(area) + ' units²' },
        { q: 'Hence find the area of the image triangle.', m: 2, a: M('|\\det \\mathbf{T}| \\times ' + num(area) + ' = ' + Math.abs(det) + ' \\times ' + num(area)) + ' = ' + num(Math.abs(det) * area) + ' units²' }
      ] };
    } },
    { d: [3], f: function () {
      var R = pick([['a rotation of 90° anticlockwise about the origin', [[0, -1], [1, 0]]], ['a rotation of 90° clockwise about the origin', [[0, 1], [-1, 0]]]]);
      var F = pick([['a reflection in the ' + M('x') + '-axis', [[1, 0], [0, -1]]], ['a reflection in the line ' + M('y = -x'), [[0, -1], [-1, 0]]], ['a horizontal stretch, scale factor 2', [[2, 0], [0, 1]]]]);
      var C = IB.mm(F[1], R[1]), p = nz(-4, 4), q = nz(-4, 4), im = IB.mm(C, [[p], [q]]);
      return { stem: 'Transformation ' + M('R') + ' is ' + R[0] + '. Transformation ' + M('F') + ' is ' + F[0] + '.', parts: [
        { q: 'Find the single matrix that represents ' + M('R') + ' followed by ' + M('F') + '.', m: 3, a: M(mat(F[1]) + mat(R[1]) + ' = ' + mat(C)) },
        { q: 'Find the image of ' + M('(' + p + ',\\ ' + q + ')') + ' under this combined transformation.', m: 2, a: M('(' + im[0][0] + ',\\ ' + im[1][0] + ')') }
      ] };
    } }
  ] });

  T({ id: 'ib-vectors', name: 'Vectors and vector equations of lines', video: 'IB maths AI vector equation of a line', gens: [
    { d: [1], f: function () {
      var A = [ri(-5, 5), ri(-5, 5), ri(-5, 5)], B = [ri(-5, 6), ri(-5, 6), ri(-5, 6)], AB = B.map(function (v, i) { return v - A[i]; });
      return { stem: 'The points ' + M('A') + ' and ' + M('B') + ' have position vectors ' + M(vec(A)) + ' and ' + M(vec(B)) + '.', parts: [
        { q: 'Find ' + M('\\overrightarrow{AB}') + '.', m: 2, a: M(vec(AB)) },
        { q: 'Find ' + M('|\\overrightarrow{AB}|') + '.', m: 2, a: M('\\sqrt{' + (AB[0] * AB[0] + AB[1] * AB[1] + AB[2] * AB[2]) + '}') + ' = ' + s3(Math.hypot(AB[0], AB[1], AB[2])) }
      ] };
    } },
    { d: [2], f: function () {
      var A = [ri(-4, 4), ri(-4, 4), ri(-4, 4)], dvec = [nz(-3, 3), nz(-3, 3), nz(-3, 3)], B = A.map(function (v, i) { return v + dvec[i]; });
      var t = nz(-3, 4), on = Math.random() < 0.5, C = A.map(function (v, i) { return v + t * dvec[i]; }); if (!on) C[2] += 1;
      return { stem: 'The line ' + M('L') + ' passes through ' + M('A(' + A.join(',\\ ') + ')') + ' and ' + M('B(' + B.join(',\\ ') + ')') + '.', parts: [
        { q: 'Find a vector equation of ' + M('L') + '.', m: 2, a: M('\\mathbf{r} = ' + vec(A) + ' + \\lambda' + vec(dvec)) },
        { q: 'Determine whether the point ' + M('C(' + C.join(',\\ ') + ')') + ' lies on ' + M('L') + '.', m: 3, a: on ? 'Yes: ' + M('\\lambda = ' + t) + ' gives ' + M('C') + '.' : 'No: ' + M('\\lambda = ' + t) + ' fits the ' + M('x') + ' and ' + M('y') + ' components but not the ' + M('z') + ' component.' }
      ] };
    } },
    { d: [3], f: function () {
      var u, v; do { u = [nz(-4, 4), nz(-4, 4), ri(-4, 4)]; v = [nz(-4, 4), ri(-4, 4), nz(-4, 4)]; } while (Math.abs(Math.abs(u[0] * v[0] + u[1] * v[1] + u[2] * v[2]) - Math.hypot.apply(null, u) * Math.hypot.apply(null, v)) < 1e-9);
      var dot = u[0] * v[0] + u[1] * v[1] + u[2] * v[2], nu = Math.hypot.apply(null, u), nv = Math.hypot.apply(null, v);
      var th = deg(Math.acos(Math.max(-1, Math.min(1, dot / (nu * nv)))));
      return { stem: 'Line ' + M('L_1') + ' has direction ' + M(vec(u)) + ' and line ' + M('L_2') + ' has direction ' + M(vec(v)) + '.', parts: [
        { q: 'Find the scalar product of the two direction vectors.', m: 1, a: M(String(dot)) },
        { q: 'Find the acute angle between the two lines.', m: 3, a: s3(th > 90 ? 180 - th : th) + '°' }
      ] };
    } }
  ] });

  T({ id: 'ib-vec-kinematics', name: 'Vector kinematics', video: 'IB maths AI vector kinematics closest approach', gens: [
    { d: [1], f: function () {
      var r0 = [ri(-5, 5), ri(-5, 5)], v = [nz(-4, 5), nz(-4, 5)], t = ri(2, 6);
      return { stem: 'The position of a boat ' + M('t') + ' hours after noon is given by ' + M('\\mathbf{r} = ' + vec(r0) + ' + t' + vec(v)) + ', where distances are in km.', parts: [
        { q: 'Find the speed of the boat.', m: 2, a: s3(Math.hypot(v[0], v[1])) + ' km/h' },
        { q: 'Find the position of the boat at ' + t + ' pm.', m: 2, a: M('(' + (r0[0] + t * v[0]) + ',\\ ' + (r0[1] + t * v[1]) + ')') }
      ] };
    } },
    { d: [2], f: function () {
      var a = [ri(-6, 6), ri(-6, 6)], u = [nz(-4, 4), nz(-4, 4)], v = [nz(-4, 4), nz(-4, 4)], ts = ri(2, 5);
      while (u[0] === v[0] && u[1] === v[1]) v[0]++;
      var b = [a[0] + ts * (u[0] - v[0]), a[1] + ts * (u[1] - v[1])], P = [a[0] + ts * u[0], a[1] + ts * u[1]];
      return { stem: 'Two drones move so that their positions after ' + M('t') + ' seconds are ' + M('\\mathbf{r}_A = ' + vec(a) + ' + t' + vec(u)) + ' and ' + M('\\mathbf{r}_B = ' + vec(b) + ' + t' + vec(v)) + '.', parts: [
        { q: 'Find the distance between the drones when ' + M('t = 0') + '.', m: 2, a: s3(Math.hypot(b[0] - a[0], b[1] - a[1])) },
        { q: 'Show that the drones collide, and find the time and position of the collision.', m: 4, a: M('t = ' + ts) + ', at ' + M('(' + P.join(',\\ ') + ')') }
      ] };
    } },
    { d: [3], f: function () {
      var a, u, b, v, p, q, ts;
      do { a = [ri(-8, 0), ri(-8, 0)]; u = [ri(1, 5), nz(-3, 4)]; b = [ri(2, 10), ri(-6, 8)]; v = [nz(-4, 3), nz(-3, 5)];
        p = [b[0] - a[0], b[1] - a[1]]; q = [v[0] - u[0], v[1] - u[1]]; ts = -(p[0] * q[0] + p[1] * q[1]) / (q[0] * q[0] + q[1] * q[1]); } while (!(ts > 0.5) || !isFinite(ts) || Math.hypot(p[0] + ts * q[0], p[1] + ts * q[1]) < 0.5);
      return { stem: 'Ship ' + M('A') + ' has position ' + M('\\mathbf{r}_A = ' + vec(a) + ' + t' + vec(u)) + ' and ship ' + M('B') + ' has position ' + M('\\mathbf{r}_B = ' + vec(b) + ' + t' + vec(v)) + ', where ' + M('t') + ' is in hours and distances are in km.', parts: [
        { q: 'Show that the vector from ' + M('A') + ' to ' + M('B') + ' at time ' + M('t') + ' is ' + M(vec([p[0], p[1]]) + ' + t' + vec(q)) + '.', m: 2, a: M('\\mathbf{r}_B - \\mathbf{r}_A') },
        { q: 'Find the time at which the ships are closest together.', m: 3, a: M('t = ' + s3(ts)) + ' hours' },
        { q: 'Find the minimum distance between the ships.', m: 2, a: s3(Math.hypot(p[0] + ts * q[0], p[1] + ts * q[1])) + ' km' }
      ] };
    } }
  ] });

  T({ id: 'ib-vec-product', name: 'Scalar and vector products', video: 'IB maths AI vector product area of triangle', gens: [
    { d: [1], f: function () {
      var u = [nz(-4, 4), ri(-4, 4), nz(-4, 4)], c = [nz(-4, 4), nz(-4, 4)];
      if (u[1] === 0) u[1] = 2;
      var k0 = u[0] * c[0] + u[2] * c[1];
      return q1('The vectors ' + M(vec(u)) + ' and ' + M(vec([c[0], 'k', c[1]])) + ' are perpendicular. Find the value of ' + M('k') + '.', 3,
        M(k0 + (u[1] < 0 ? ' - ' : ' + ') + (Math.abs(u[1]) === 1 ? '' : Math.abs(u[1])) + 'k = 0 \\Rightarrow k = ' + frac(-k0, u[1])));
    } },
    { d: [2], f: function () {
      var u = [nz(-4, 4), ri(-4, 4), nz(-4, 4)], v = [ri(-4, 4), nz(-4, 4), nz(-4, 4)];
      var cr = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
      return { stem: M('\\mathbf{u} = ' + vec(u)) + ' and ' + M('\\mathbf{v} = ' + vec(v)) + '.', parts: [
        { q: 'Find ' + M('\\mathbf{u} \\cdot \\mathbf{v}') + '.', m: 1, a: M(String(u[0] * v[0] + u[1] * v[1] + u[2] * v[2])) },
        { q: 'Find ' + M('\\mathbf{u} \\times \\mathbf{v}') + '.', m: 2, a: M(vec(cr)) }
      ] };
    } },
    { d: [3], f: function () {
      var A = [ri(-3, 3), ri(-3, 3), ri(-3, 3)], B = [ri(-3, 5), ri(-3, 5), ri(-3, 5)], C = [ri(-4, 4), ri(-4, 4), ri(-4, 4)], cr;
      var ab = B.map(function (v, i) { return v - A[i]; }), ac = C.map(function (v, i) { return v - A[i]; });
      cr = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]];
      if (cr[0] === 0 && cr[1] === 0 && cr[2] === 0) { C[0] += 1; ac[0] += 1; cr = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]]; }
      return { stem: 'The points ' + M('A(' + A.join(',\\ ') + ')') + ', ' + M('B(' + B.join(',\\ ') + ')') + ' and ' + M('C(' + C.join(',\\ ') + ')') + ' are vertices of a triangle.', parts: [
        { q: 'Find ' + M('\\overrightarrow{AB} \\times \\overrightarrow{AC}') + '.', m: 3, a: M(vec(cr)) },
        { q: 'Hence find the area of triangle ' + M('ABC') + '.', m: 2, a: M('\\frac{1}{2}\\sqrt{' + (cr[0] * cr[0] + cr[1] * cr[1] + cr[2] * cr[2]) + '}') + ' = ' + s3(0.5 * Math.hypot(cr[0], cr[1], cr[2])) }
      ] };
    } }
  ] });

  /* ---------- Graph theory ---------- */
  var PENT = [{ n: 'A', x: 0.5, y: 0 }, { n: 'B', x: 1, y: 0.38 }, { n: 'C', x: 0.81, y: 1 }, { n: 'D', x: 0.19, y: 1 }, { n: 'E', x: 0, y: 0.38 }];
  function connected(n, edges) {
    var seen = [0], st = [0]; while (st.length) { var v = st.pop(); edges.forEach(function (e) { var w = e[0] === v ? e[1] : e[1] === v ? e[0] : -1; if (w > -1 && seen.indexOf(w) < 0) { seen.push(w); st.push(w); } }); }
    return seen.length === n;
  }
  function randGraph() {
    var all = []; for (var i = 0; i < 5; i++) for (var j = i + 1; j < 5; j++) all.push([i, j]);
    var e; do { e = BS.shuffle(all).slice(0, ri(6, 8)); } while (!connected(5, e));
    return e;
  }
  T({ id: 'ib-graph-theory', name: 'Graph theory: degree, adjacency and walks', video: 'IB maths AI graph theory adjacency matrix walks', gens: [
    { d: [1], f: function () {
      var e = randGraph(), deg_ = [0, 0, 0, 0, 0]; e.forEach(function (x) { deg_[x[0]]++; deg_[x[1]]++; });
      var odd = deg_.filter(function (v) { return v % 2; }).length;
      var eul = odd === 0 ? 'Eulerian circuit: every vertex has even degree.' : odd === 2 ? 'Eulerian trail but not a circuit: exactly two vertices have odd degree.' : 'Neither: more than two vertices have odd degree.';
      return { stem: 'The graph ' + M('G') + ' is shown.' + D.network(PENT, e), parts: [
        { q: 'Write down the degree of each vertex.', m: 2, a: PENT.map(function (p, i) { return p.n + ': ' + deg_[i]; }).join(', ') },
        { q: 'State, with a reason, whether ' + M('G') + ' has an Eulerian circuit, an Eulerian trail, or neither.', m: 2, a: eul }
      ] };
    } },
    { d: [2, 3], f: function (d) {
      var e = randGraph(), Mx = [0, 1, 2, 3, 4].map(function () { return [0, 0, 0, 0, 0]; });
      e.forEach(function (x) { Mx[x[0]][x[1]] = 1; Mx[x[1]][x[0]] = 1; });
      var k = d === 2 ? 3 : 4, Mk = IB.mpow(Mx, k), i = ri(0, 4), j = ri(0, 4);
      return { stem: 'The graph ' + M('G') + ' is shown.' + D.network(PENT, e), parts: [
        { q: 'Write down the adjacency matrix ' + M('\\mathbf{M}') + ' for ' + M('G') + ', with vertices in the order A, B, C, D, E.', m: 2, a: M(mat(Mx)) },
        { q: 'Find the number of walks of length ' + k + ' from ' + PENT[i].n + ' to ' + PENT[j].n + '.', m: 2, a: 'Entry of ' + M('\\mathbf{M}^{' + k + '}') + ': ' + Mk[i][j] }
      ] };
    } }
  ] });

  var HEX = [{ n: 'A', x: 0, y: 0.5 }, { n: 'B', x: 0.33, y: 0 }, { n: 'C', x: 0.33, y: 1 }, { n: 'D', x: 0.67, y: 0 }, { n: 'E', x: 0.67, y: 1 }, { n: 'F', x: 1, y: 0.5 }];
  var CAND = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 5], [1, 4], [0, 3]];
  function weighted(minE, maxE, odd2) {
    var e, w;
    for (;;) {
      e = BS.shuffle(CAND).slice(0, ri(minE, maxE)).filter(function (x) { return !(x[0] === 0 && x[1] === 3); });
      if (!connected(6, e)) continue;
      if (odd2) { var dg = [0, 0, 0, 0, 0, 0]; e.forEach(function (x) { dg[x[0]]++; dg[x[1]]++; }); if (dg.filter(function (v) { return v % 2; }).length !== 2) continue; }
      break;
    }
    w = BS.shuffle([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).slice(0, e.length);
    return e.map(function (x, i) { return [x[0], x[1], w[i]]; });
  }
  function kruskal(n, E) {
    var par = []; for (var i = 0; i < n; i++) par.push(i);
    function f(x) { while (par[x] !== x) x = par[x]; return x; }
    var out = [];
    E.slice().sort(function (a, b) { return a[2] - b[2]; }).forEach(function (e) { var a = f(e[0]), b = f(e[1]); if (a !== b) { par[a] = b; out.push(e); } });
    return out;
  }
  function prim(n, E, start) {
    var inT = [start], out = [];
    while (inT.length < n) {
      var best = null;
      E.forEach(function (e) { var a = inT.indexOf(e[0]) > -1, b = inT.indexOf(e[1]) > -1; if (a !== b && (!best || e[2] < best[2])) best = e; });
      out.push(best); inT.push(inT.indexOf(best[0]) > -1 ? best[1] : best[0]);
    }
    return { edges: out, order: inT };
  }
  function dijkstra(n, E, s) {
    var dist = []; for (var i = 0; i < n; i++) dist.push(Infinity); dist[s] = 0; var done = [];
    for (var k = 0; k < n; k++) { var u = -1; for (var j = 0; j < n; j++) if (done.indexOf(j) < 0 && (u < 0 || dist[j] < dist[u])) u = j; done.push(u);
      E.forEach(function (e) { var v = e[0] === u ? e[1] : e[1] === u ? e[0] : -1; if (v > -1 && dist[u] + e[2] < dist[v]) dist[v] = dist[u] + e[2]; }); }
    return dist;
  }
  function en(e) { return HEX[e[0]].n + HEX[e[1]].n; }
  T({ id: 'ib-graph-algorithms', name: 'Graph algorithms: spanning trees and the Chinese postman', video: 'IB maths AI Kruskal Prim Chinese postman', gens: [
    { d: [1], f: function () {
      var E = weighted(8, 9), mst = kruskal(6, E), tot = mst.reduce(function (s, e) { return s + e[2]; }, 0);
      return { stem: 'The weighted graph shows the lengths, in metres, of possible cable routes between six buildings.' + D.network(HEX, E), parts: [
        { q: 'Use Kruskal’s algorithm to find a minimum spanning tree. List the edges in the order they are added.', m: 3, a: mst.map(en).join(', ') },
        { q: 'Find the total length of cable needed.', m: 1, a: tot + ' m' }
      ] };
    } },
    { d: [2], f: function () {
      var E = weighted(8, 9), pr = prim(6, E, 0), tot = pr.edges.reduce(function (s, e) { return s + e[2]; }, 0);
      return { stem: 'The weighted graph shows the travel times, in minutes, between six villages.' + D.network(HEX, E), parts: [
        { q: 'Starting at ' + M('A') + ', use Prim’s algorithm to find a minimum spanning tree. State the order in which the vertices are added.', m: 3, a: pr.order.map(function (i) { return HEX[i].n; }).join(', ') + ' (edges ' + pr.edges.map(en).join(', ') + ')' },
        { q: 'Write down the total weight of the minimum spanning tree.', m: 1, a: tot + ' minutes' }
      ] };
    } },
    { d: [3], f: function () {
      var E = weighted(7, 9, true), dg = [0, 0, 0, 0, 0, 0]; E.forEach(function (x) { dg[x[0]]++; dg[x[1]]++; });
      var odd = []; dg.forEach(function (v, i) { if (v % 2) odd.push(i); });
      var tot = E.reduce(function (s, e) { return s + e[2]; }, 0), sp = dijkstra(6, E, odd[0])[odd[1]];
      return { stem: 'A road inspector must travel along every road shown in the weighted graph at least once, starting and finishing at ' + M('A') + '. Weights are distances in km.' + D.network(HEX, E), parts: [
        { q: 'Write down the vertices with odd degree.', m: 1, a: HEX[odd[0]].n + ' and ' + HEX[odd[1]].n },
        { q: 'Find the length of the shortest route between these two vertices.', m: 2, a: sp + ' km' },
        { q: 'Find the length of the inspector’s shortest possible route.', m: 2, a: M(tot + ' + ' + sp + ' = ' + (tot + sp)) + ' km' }
      ] };
    } }
  ] });

  IB.connected = connected;
})(typeof window !== 'undefined' ? window : globalThis);
