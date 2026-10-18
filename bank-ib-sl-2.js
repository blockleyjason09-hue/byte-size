/* Byte Size — IB Mathematics: Applications and Interpretation SL (Topics 3, 4 and 5). */
(function (g) {
  var BS = g.BS, D = BS.draw, IB = BS.ib, hl = IB.sl.hl;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, dp = BS.dp, num = BS.num, M = BS.m;
  var s3 = IB.s3, table = IB.table, htable = IB.htable, q1 = IB.q1;
  function rad(d) { return d * Math.PI / 180; }
  function deg(r) { return r * 180 / Math.PI; }
  function tpdf(x, v) { return Math.exp(IB.lgamma((v + 1) / 2) - IB.lgamma(v / 2)) / Math.sqrt(v * Math.PI) * Math.pow(1 + x * x / v, -(v + 1) / 2); }
  function tTwoTail(t, v) { var a = Math.abs(t), n = 2000, h = a / n, s = tpdf(0, v) + tpdf(a, v); for (var i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * tpdf(i * h, v); return Math.max(0, 1 - 2 * s * h / 3); }
  IB.tTwoTail = tTwoTail;
  function p3(p) { return p < 0.001 ? p.toExponential(2).replace('e-', ' \\times 10^{-') + '}' : s3(p); }

  /* =============== TOPIC 3: GEOMETRY AND TRIGONOMETRY (SL) =============== */
  BS.topic({ id: 'sl-3d', name: '3D geometry: volume, surface area, distance and angles', video: 'IB maths AI SL volume and surface area 3D shapes', gens: hl('ib-3d', [0, 1, 2]).concat([
    { d: [1, 2], f: function () { // hemisphere on a cylinder
      var r = ri(3, 9), h = ri(8, 20), V = Math.PI * r * r * h + 2 / 3 * Math.PI * r * r * r, S = Math.PI * r * r + 2 * Math.PI * r * h + 2 * Math.PI * r * r;
      var W = 220, Hh = 230, cx = 110, R = 60, top = 90, bot = 200, sc = '';
      sc += '<ellipse cx="' + cx + '" cy="' + bot + '" rx="' + R + '" ry="12" class="thin"/>' + D.line(cx - R, top, cx - R, bot) + D.line(cx + R, top, cx + R, bot);
      sc += D.path('M' + (cx - R) + ',' + top + ' A' + R + ',' + R + ' 0 0 1 ' + (cx + R) + ',' + top, 'ln') + '<ellipse cx="' + cx + '" cy="' + top + '" rx="' + R + '" ry="12" class="thin" stroke-dasharray="4 3"/>';
      sc += D.line(cx, bot, cx + R, bot, 'dash') + D.text(cx + R / 2, bot - 8, r + ' cm', { anchor: 'middle', size: 12 }) + D.text(cx + R + 8, (top + bot) / 2, h + ' cm', { size: 12 });
      return { stem: 'A solid is made from a cylinder and a hemisphere. Both have radius ' + r + ' cm. The height of the cylinder is ' + h + ' cm.' + D.svg(W, Hh, sc, 'Cylinder with a hemisphere on top'), parts: [
        { q: 'Find the volume of the solid.', m: 3, a: M('\\pi(' + r + ')^2(' + h + ') + \\tfrac{2}{3}\\pi(' + r + ')^3 = ' + s3(V)) + ' cm³' },
        { q: 'Find the total surface area of the solid.', m: 3, a: M('\\pi r^2 + 2\\pi r h + 2\\pi r^2 = ' + s3(S)) + ' cm²' }
      ] };
    } },
    { d: [2], f: function () { // cone: slant height, angle, volume
      var r = ri(3, 10), h = ri(8, 24), l = Math.hypot(r, h), ang = deg(Math.atan(h / r));
      var sc = D.path('M40,200 L120,40 L200,200', 'ln') + '<ellipse cx="120" cy="200" rx="80" ry="14" class="thin"/>' + D.line(120, 40, 120, 200, 'dash') + D.line(120, 200, 200, 200, 'dash');
      sc += D.text(126, 125, h + ' cm', { size: 12 }) + D.text(160, 214, r + ' cm', { anchor: 'middle', size: 12 }) + D.text(120, 30, 'V', { anchor: 'middle', cls: 'it' }) + D.text(208, 204, 'A', { cls: 'it' }) + D.text(112, 214, 'O', { cls: 'it' });
      return { stem: 'A right circular cone has vertex ' + M('V') + ', base radius ' + M('OA = ' + r) + ' cm and vertical height ' + M('VO = ' + h) + ' cm.' + D.svg(240, 230, sc, 'Cone'), parts: [
        { q: 'Find the slant height ' + M('VA') + '.', m: 2, a: s3(l) + ' cm' },
        { q: 'Find the angle between ' + M('VA') + ' and the base of the cone.', m: 2, a: M('\\tan^{-1}\\left(\\frac{' + h + '}{' + r + '}\\right) = ' + s3(ang) + '^\\circ') },
        { q: 'Find the volume of the cone.', m: 2, a: s3(Math.PI * r * r * h / 3) + ' cm³' },
        { q: 'Find the curved surface area of the cone.', m: 2, a: M('\\pi r l = ' + s3(Math.PI * r * l)) + ' cm²' }
      ] };
    } },
    { d: [1, 2], f: function () { // 3D coordinates
      var A = [ri(-5, 5), ri(-5, 5), ri(0, 6)], B = [ri(-5, 8), ri(-5, 8), ri(0, 9)], d = Math.hypot(B[0] - A[0], B[1] - A[1], B[2] - A[2]);
      var Mp = A.map(function (v, i) { return num((v + B[i]) / 2); });
      return { stem: 'A drone flies in a straight line from ' + M('A(' + A.join(',\\ ') + ')') + ' to ' + M('B(' + B.join(',\\ ') + ')') + ', where distances are in metres.', parts: [
        { q: 'Find the distance ' + M('AB') + '.', m: 2, a: s3(d) + ' m' },
        { q: 'Find the coordinates of the midpoint of ' + M('AB') + '.', m: 2, a: M('(' + Mp.join(',\\ ') + ')') },
        { q: 'The drone flies at ' + pick([4, 5, 6]) + ' m s⁻¹. Find the time taken to fly from ' + M('A') + ' to ' + M('B') + '.', m: 1, a: '' } // filled below
      ] };
    } }
  ]) });
  // fill the time answer for the drone question
  (function () { var gen = BS.topics['sl-3d'].gens[BS.topics['sl-3d'].gens.length - 1], f0 = gen.f; gen.f = function (d) { var q = f0(d), sp = Number(q.parts[2].q.match(/flies at (\d)/)[1]), dist = Number(q.parts[0].a.replace(' m', '')); q.parts[2].a = s3(dist / sp) + ' s'; return q; }; })();

  BS.topic({ id: 'sl-trig', name: 'Trigonometry: right-angled triangles, sine and cosine rules, bearings', video: 'IB maths AI SL sine rule cosine rule bearings', gens: hl('ib-trig', [0, 1, 2]).concat(hl('ib-bearings', [0, 1, 2])).concat([
    { d: [1], f: function () { // right-angled trig with diagram
      var a = ri(5, 20), th = ri(25, 65), opp = a * Math.tan(rad(th)), hyp = a / Math.cos(rad(th));
      var fig = D.geo({ pts: { A: [0, 0], B: [a, 0], C: [a, opp] }, polys: [['A', 'B', 'C']], slabels: [{ p: 'A', q: 'B', t: a + ' cm' }, { p: 'B', q: 'C', t: 'x cm' }],
        angles: [{ v: 'B', a: 'A', b: 'C', right: true }, { v: 'A', a: 'B', b: 'C', t: th + '°', d: 34 }], w: 300, h: 220, label: 'Right-angled triangle' });
      return { stem: 'Triangle ' + M('ABC') + ' has a right angle at ' + M('B') + '.' + fig, parts: [
        { q: 'Find the value of ' + M('x') + '.', m: 2, a: M('x = ' + a + '\\tan ' + th + '^\\circ = ' + s3(opp)) },
        { q: 'Find the length of ' + M('AC') + '.', m: 2, a: s3(hyp) + ' cm' }
      ] };
    } },
    { d: [2, 3], f: function () { // quadrilateral field
      var AB, AD, A, BC, C, BD, ABD, sBDC, BDC, CBD, BCD;
      do {
        AB = ri(40, 90); AD = ri(40, 90); A = ri(60, 110); BC = ri(30, 70); C = ri(60, 100);
        BD = Math.sqrt(AB * AB + AD * AD - 2 * AB * AD * Math.cos(rad(A))); ABD = 0.5 * AB * AD * Math.sin(rad(A));
        sBDC = BC * Math.sin(rad(C)) / BD; BDC = deg(Math.asin(Math.min(1, sBDC))); CBD = 180 - C - BDC;
      } while (sBDC >= 0.9 || CBD < 15 || BDC < 15);
      BCD = 0.5 * BC * BD * Math.sin(rad(CBD));
      var P = { A: [0, 0], B: [AB, 0], D: [AD * Math.cos(rad(A)), AD * Math.sin(rad(A))] };
      var bdAng = Math.atan2(P.D[1] - P.B[1], P.D[0] - P.B[0]) - rad(CBD); P.C = [P.B[0] + BC * Math.cos(bdAng), P.B[1] + BC * Math.sin(bdAng)];
      var fig = D.geo({ pts: P, polys: [['A', 'B', 'C', 'D']], segs: [['B', 'D', 'dash']], slabels: [{ p: 'A', q: 'B', t: AB + ' m' }, { p: 'A', q: 'D', t: AD + ' m' }, { p: 'B', q: 'C', t: BC + ' m' }],
        angles: [{ v: 'A', a: 'B', b: 'D', t: A + '°', d: 30 }, { v: 'C', a: 'B', b: 'D', t: C + '°', d: 30 }], w: 320, h: 260, label: 'Quadrilateral field' });
      return { stem: 'The diagram shows a field ' + M('ABCD') + '.' + fig, parts: [
        { q: 'Find the length of ' + M('BD') + '.', m: 3, a: M('BD^2 = ' + AB + '^2 + ' + AD + '^2 - 2(' + AB + ')(' + AD + ')\\cos ' + A + '^\\circ \\Rightarrow BD = ' + s3(BD)) + ' m' },
        { q: 'Find the size of angle ' + M('B\\hat{D}C') + '.', m: 3, a: M('\\frac{\\sin B\\hat{D}C}{' + BC + '} = \\frac{\\sin ' + C + '^\\circ}{' + s3(BD) + '} \\Rightarrow B\\hat{D}C = ' + s3(BDC) + '^\\circ') },
        { q: 'Find the area of the field.', m: 3, a: s3(ABD) + ' + ' + s3(BCD) + ' = ' + s3(ABD + BCD) + ' m²' }
      ] };
    } }
  ]) });
  // regenerate the field if the triangle BCD would be degenerate
  (function () { var gs = BS.topics['sl-trig'].gens, gen = gs[gs.length - 1], f0 = gen.f; gen.f = function (d) { for (var k = 0; k < 50; k++) { var q = f0(d); if (!/NaN|-/.test(q.parts[2].a.replace(/m²/, ''))) return q; } return f0(d); }; })();

  BS.topic({ id: 'sl-sectors', name: 'Arcs and sectors (degrees)', video: 'IB maths AI SL arc length and area of a sector degrees', gens: [
    { d: [1], f: function () {
      var r = ri(4, 15), th = 5 * ri(8, 30), L = th / 360 * 2 * Math.PI * r, A = th / 360 * Math.PI * r * r;
      return { stem: 'The diagram shows a sector ' + M('OAB') + ' of a circle with centre ' + M('O') + ' and radius ' + r + ' cm. Angle ' + M('A\\hat{O}B = ' + th + '^\\circ') + '.' + D.sector(rad(th), r + ' cm', th + '°'), parts: [
        { q: 'Find the length of the arc ' + M('AB') + '.', m: 2, a: M('\\frac{' + th + '}{360} \\times 2\\pi \\times ' + r + ' = ' + s3(L)) + ' cm' },
        { q: 'Find the area of the sector.', m: 2, a: M('\\frac{' + th + '}{360} \\times \\pi \\times ' + r + '^2 = ' + s3(A)) + ' cm²' }
      ] };
    } },
    { d: [2], f: function () {
      var r = ri(5, 14), th = ri(40, 150), A = th / 360 * Math.PI * r * r, P = 2 * r + th / 360 * 2 * Math.PI * r;
      return { stem: 'A sector of a circle has radius ' + r + ' cm and area ' + s3(A) + ' cm².', parts: [
        { q: 'Find the angle of the sector, correct to the nearest degree.', m: 2, a: M('\\frac{\\theta}{360} \\times \\pi(' + r + ')^2 = ' + s3(A) + ' \\Rightarrow \\theta = ' + th + '^\\circ') },
        { q: 'Find the perimeter of the sector.', m: 2, a: s3(P) + ' cm' }
      ] };
    } },
    { d: [2, 3], f: function () { // segment
      var r = ri(5, 15), th = ri(50, 140), sec = th / 360 * Math.PI * r * r, tri = 0.5 * r * r * Math.sin(rad(th)), chord = 2 * r * Math.sin(rad(th / 2));
      var fig = D.geo({ pts: { O: [0, 0], A: D.onCircle(90 - th / 2), B: D.onCircle(90 + th / 2) }, circle: [0, 0, 1], segs: [['O', 'A'], ['O', 'B'], ['A', 'B']], dots: ['O'],
        angles: [{ v: 'O', a: 'A', b: 'B', t: th + '°', d: 26 }], slabels: [{ p: 'O', q: 'A', t: r + ' cm' }], w: 280, h: 260, label: 'Circle with a chord' });
      return { stem: 'The diagram shows a circle with centre ' + M('O') + ' and radius ' + r + ' cm. The chord ' + M('AB') + ' subtends an angle of ' + th + '° at ' + M('O') + '.' + fig, parts: [
        { q: 'Find the length of the chord ' + M('AB') + '.', m: 3, a: M('AB^2 = ' + r + '^2 + ' + r + '^2 - 2(' + r + ')(' + r + ')\\cos ' + th + '^\\circ \\Rightarrow AB = ' + s3(chord)) + ' cm' },
        { q: 'Find the area of the minor segment between the chord ' + M('AB') + ' and the arc ' + M('AB') + '.', m: 4, a: M(s3(sec) + ' - \\tfrac{1}{2}(' + r + ')^2\\sin ' + th + '^\\circ = ' + s3(sec - tri)) + ' cm²' }
      ] };
    } },
    { d: [1, 2], f: function () { // running track
      var L = ri(60, 120), w = ri(40, 80), r = w / 2, per = 2 * L + 2 * Math.PI * r, area = L * w + Math.PI * r * r;
      var sc = D.path('M60,40 L220,40 A60,60 0 0 1 220,160 L60,160 A60,60 0 0 1 60,40 Z', 'shape') + D.line(60, 40, 60, 160, 'dash') + D.line(220, 40, 220, 160, 'dash');
      sc += D.text(140, 30, L + ' m', { anchor: 'middle', size: 12 }) + D.text(68, 100, w + ' m', { size: 12 });
      return { stem: 'A running track is made from a rectangle and two semicircles, as shown.' + D.svg(290, 200, sc, 'Running track'), parts: [
        { q: 'Find the perimeter of the track.', m: 3, a: M('2(' + L + ') + 2\\pi(' + num(r) + ') = ' + s3(per)) + ' m' },
        { q: 'Find the area enclosed by the track.', m: 3, a: M(L + ' \\times ' + w + ' + \\pi(' + num(r) + ')^2 = ' + s3(area)) + ' m²' }
      ] };
    } },
    { d: [3], f: function () { // find radius from arc and angle, then area
      var th = ri(40, 160), r = ri(6, 20), L = Math.round(th / 360 * 2 * Math.PI * r * 10) / 10, rr = L * 360 / (th * 2 * Math.PI);
      return { stem: 'The arc length of a sector is ' + L + ' cm and the angle of the sector is ' + th + '°.', parts: [
        { q: 'Find the radius of the sector.', m: 2, a: s3(rr) + ' cm' },
        { q: 'Find the area of the sector.', m: 2, a: s3(th / 360 * Math.PI * rr * rr) + ' cm²' },
        { q: 'The sector is used to make the curved surface of a cone. Find the radius of the base of the cone.', m: 2, a: M('2\\pi R = ' + L + ' \\Rightarrow R = ' + s3(L / (2 * Math.PI))) + ' cm' }
      ] };
    } }
  ] });

  BS.topic({ id: 'sl-voronoi', name: 'Perpendicular bisectors and Voronoi diagrams', video: 'IB maths AI SL Voronoi diagrams perpendicular bisector', gens: hl('ib-voronoi', [0, 1, 2]).concat([
    { d: [2], f: function () { // perpendicular bisector in general form
      var A, B; do { A = [ri(-6, 8), ri(-6, 8)]; B = [ri(-6, 8), ri(-6, 8)]; } while ((A[0] - B[0]) % 2 || (A[1] - B[1]) % 2 || A[0] === B[0] || A[1] === B[1]);
      var Mx = (A[0] + B[0]) / 2, My = (A[1] + B[1]) / 2, dx = B[0] - A[0], dy = B[1] - A[1];
      // dx (x - Mx) + dy (y - My) = 0 -> dx x + dy y - (dx Mx + dy My) = 0
      var a = dx, b = dy, c = -(dx * Mx + dy * My), k = gcd(gcd(Math.abs(a), Math.abs(b)), Math.abs(c)) || 1; a /= k; b /= k; c /= k; if (a < 0) { a = -a; b = -b; c = -c; }
      var Hh, dA, dB; do { Hh = [ri(-6, 8), ri(-6, 8)]; dA = Math.hypot(Hh[0] - A[0], Hh[1] - A[1]); dB = Math.hypot(Hh[0] - B[0], Hh[1] - B[1]); } while (Math.abs(dA - dB) < 0.5 || dA === 0 || dB === 0);
      var eq = poly([a, 0]) + (b < 0 ? ' - ' + (b === -1 ? '' : -b) : ' + ' + (b === 1 ? '' : b)) + 'y' + (c ? sg(c) : '') + ' = 0';
      return { stem: 'Two hospitals are located at ' + M('A(' + A.join(',\\ ') + ')') + ' and ' + M('B(' + B.join(',\\ ') + ')') + '. A planner wants to find the boundary between the regions that are closer to each hospital.', parts: [
        { q: 'Find the gradient of ' + M('AB') + '.', m: 1, a: M(frac(dy, dx)) },
        { q: 'Find the equation of the perpendicular bisector of ' + M('AB') + ', giving your answer in the form ' + M('ax + by + d = 0') + ', where ' + M('a, b, d \\in \\mathbb{Z}') + '.', m: 4, a: 'Midpoint ' + M('(' + num(Mx) + ',\\ ' + num(My) + ')') + ', gradient ' + M(frac(-dx, dy)) + ': ' + M(eq) },
        { q: 'A house is at ' + M('H(' + Hh.join(',\\ ') + ')') + '. Determine which hospital is closer to the house.', m: 2, a: (dA < dB ? 'A' : 'B') + ': ' + M('HA = ' + s3(dA)) + ', ' + M('HB = ' + s3(dB)) + ' (equivalently, ' + M('H') + ' lies on ' + (dA < dB ? 'A' : 'B') + '’s side of the bisector).' }
      ] };
    } },
    { d: [1, 2], f: function () { // nearest neighbour interpolation
      var sites, names = ['A', 'B', 'C', 'D'], P, dd, best;
      do {
        sites = []; while (sites.length < 4) { var s = [ri(1, 13), ri(1, 13)]; if (!sites.some(function (t) { return Math.hypot(t[0] - s[0], t[1] - s[1]) < 4.5; })) sites.push(s); }
        P = [ri(1, 13), ri(1, 13)]; dd = sites.map(function (s) { return Math.hypot(s[0] - P[0], s[1] - P[1]); }); best = dd.indexOf(Math.min.apply(null, dd));
      } while (dd.some(function (v, i) { return i !== best && v - dd[best] < 1; }) || dd[best] < 2);
      var rain = sites.map(function () { return ri(20, 95); });
      return { stem: 'The Voronoi diagram shows four weather stations ' + M('A') + ', ' + M('B') + ', ' + M('C') + ' and ' + M('D') + '. The rainfall recorded at each station last month is shown in the table.' + table(['Station', 'A', 'B', 'C', 'D'], [['Rainfall (mm)'].concat(rain.map(String))]) + D.voronoi(sites, names, 14, 14, [[P[0], P[1], 'P']]), parts: [
        { q: 'Use nearest neighbour interpolation to estimate the rainfall at ' + M('P(' + P.join(',\\ ') + ')') + '.', m: 2, a: rain[best] + ' mm (' + M('P') + ' is in the cell of station ' + names[best] + ')' },
        { q: 'Find the distance from ' + M('P') + ' to the nearest station.', m: 2, a: s3(dd[best]) + ' units' }
      ] };
    } }
  ]) });

  /* =============== TOPIC 4: STATISTICS AND PROBABILITY (SL) =============== */
  BS.topic({ id: 'sl-descriptive', name: 'Sampling, statistical diagrams and summary statistics', video: 'IB maths AI SL cumulative frequency box plot', gens: hl('ib-descriptive', [0, 1, 2]).concat([
    { d: [1, 2], f: function () { // cumulative frequency graph
      var b = [0, 10, 20, 30, 40, 50, 60], f = [ri(2, 8), ri(6, 14), ri(12, 22), ri(10, 18), ri(4, 10), ri(1, 5)], cf = [0]; f.forEach(function (v) { cf.push(cf[cf.length - 1] + v); });
      var N = cf[6], cfAt = function (x) { for (var i = 0; i < 6; i++) if (x <= b[i + 1]) return cf[i] + (cf[i + 1] - cf[i]) * (x - b[i]) / 10; return N; };
      var inv = function (c) { for (var i = 0; i < 6; i++) if (c <= cf[i + 1]) return b[i] + 10 * (c - cf[i]) / (cf[i + 1] - cf[i]); return 60; };
      var med = inv(N / 2), q1v = inv(N / 4), q3v = inv(3 * N / 4), cut = pick([25, 35, 45]);
      var g_ = D.lineGraph(b.map(function (x, i) { return [x, cf[i]]; }), { xmax: 60, ymax: Math.ceil((N + 5) / 10) * 10, xstep: 10, ystep: 10, grid: true, gx: 5, gy: 5, dots: true, xl: 'Time (t minutes)', yl: 'Cumulative frequency' });
      return { stem: 'The cumulative frequency graph shows the times taken by ' + N + ' students to complete a puzzle.' + g_, parts: [
        { q: 'Use the graph to estimate the median time.', m: 2, a: 'About ' + s3(med) + ' minutes' },
        { q: 'Use the graph to estimate the interquartile range.', m: 2, a: 'About ' + s3(q3v) + ' − ' + s3(q1v) + ' = ' + s3(q3v - q1v) + ' minutes' },
        { q: 'Estimate the number of students who took more than ' + cut + ' minutes.', m: 2, a: 'About ' + Math.round(N - cfAt(cut)) }
      ] };
    } },
    { d: [1], f: function () { // histogram equal widths
      var b = [0, 5, 10, 15, 20, 25, 30], f = [ri(1, 6), ri(4, 12), ri(8, 18), ri(6, 15), ri(2, 9), ri(1, 5)], N = f.reduce(function (a, c) { return a + c; }, 0);
      var top = Math.max.apply(null, f), modal = f.indexOf(top);
      return { stem: 'The histogram shows the masses, in kg, of the dogs at an animal shelter.' + D.histogram(b, f, 'Mass (kg)', 'Frequency', top > 10 ? 2 : 1, 5), parts: [
        { q: 'Write down the modal class.', m: 1, a: M(b[modal] + ' \\le m < ' + b[modal + 1]) },
        { q: 'Find the number of dogs at the shelter.', m: 2, a: String(N) },
        { q: 'Find an estimate of the mean mass.', m: 2, a: s3(f.reduce(function (a, c, i) { return a + c * (b[i] + 2.5); }, 0) / N) + ' kg' }
      ] };
    } },
    { d: [1, 2], f: function () { // sampling
      var groups = [['Year 12', ri(60, 140)], ['Year 13', ri(60, 140)]], n = pick([20, 25, 30, 40]), tot = groups[0][1] + groups[1][1];
      var s1 = Math.round(groups[0][1] / tot * n), s2 = n - s1;
      var kinds = [['every 10th name on a list after a random start', 'Systematic sampling'], ['the first ' + n + ' students who walk into the library', 'Convenience sampling'], ['names drawn at random from a hat containing every name', 'Simple random sampling']], k = pick(kinds);
      return { stem: 'A school has ' + groups[0][1] + ' students in Year 12 and ' + groups[1][1] + ' in Year 13. A sample of ' + n + ' students is chosen to complete a survey.', parts: [
        { q: 'The sample is chosen by selecting ' + k[0] + '. Name this sampling method.', m: 1, a: k[1] },
        { q: 'A stratified sample is used instead, by year group. Find the number of Year 12 students and the number of Year 13 students in the sample.', m: 2, a: 'Year 12: ' + s1 + ', Year 13: ' + s2 },
        { q: 'State whether the number of hours students spend on homework is discrete or continuous data.', m: 1, a: 'Continuous' }
      ] };
    } },
    { d: [2, 3], f: function () { // two box plots, outliers
      function five() { var q1v = ri(20, 35), med = q1v + ri(4, 12), q3v = med + ri(4, 12), lo = q1v - ri(3, 12), hi = q3v + ri(3, 30); return [lo, q1v, med, q3v, hi]; }
      var A = five(), B = five(), iqrA = A[3] - A[1], fence = A[3] + 1.5 * iqrA;
      return { stem: 'The box plots show the times, in seconds, taken by two groups of students, ' + M('A') + ' and ' + M('B') + ', to solve a puzzle.' + D.boxplot(A, 0, 100, 10, 'Group A') + D.boxplot(B, 0, 100, 10, 'Group B'), parts: [
        { q: 'Write down the median time for each group.', m: 2, a: 'A: ' + A[2] + ' s, B: ' + B[2] + ' s' },
        { q: 'Find the interquartile range for group ' + M('A') + '.', m: 1, a: iqrA + ' s' },
        { q: 'Determine whether the longest time in group ' + M('A') + ' is an outlier.', m: 2, a: M(A[3] + ' + 1.5 \\times ' + iqrA + ' = ' + num(fence)) + '; ' + A[4] + (A[4] > fence ? ' > ' : ' ≤ ') + num(fence) + ', so it is ' + (A[4] > fence ? '' : 'not ') + 'an outlier.' },
        { q: 'Compare the times of the two groups.', m: 2, a: 'Group ' + (A[2] < B[2] ? 'A' : 'B') + ' has the lower median, so was generally faster. Group ' + (iqrA < B[3] - B[1] ? 'A' : 'B') + ' has the smaller IQR, so its times were more consistent.' }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-regression', name: 'Correlation, regression and Spearman’s rank', video: 'IB maths AI SL Pearson correlation regression line', gens: hl('ib-regression', [0, 1]).concat([
    { d: [2], f: function () { // use a regression line
      var a = ri(15, 45) / 10, b = ri(10, 60), r = ri(82, 97) / 100, xlo = ri(5, 10), xhi = xlo + ri(10, 20), xin = ri(xlo + 2, xhi - 2), xout = xhi + ri(15, 30);
      return { stem: 'For a group of students, the number of hours spent revising, ' + M('x') + ', and the test score, ' + M('y') + ', were recorded. The values of ' + M('x') + ' ranged from ' + xlo + ' to ' + xhi + '. The regression line of ' + M('y') + ' on ' + M('x') + ' is ' + M('y = ' + a + 'x + ' + b) + ' and Pearson’s product-moment correlation coefficient is ' + M('r = ' + r) + '.', parts: [
        { q: 'Describe the correlation between ' + M('x') + ' and ' + M('y') + '.', m: 1, a: 'Strong positive linear correlation' },
        { q: 'Interpret the value ' + a + ' in context.', m: 1, a: 'Each extra hour of revision is associated with an increase of about ' + a + ' marks.' },
        { q: 'Estimate the test score of a student who revised for ' + xin + ' hours.', m: 2, a: s3(a * xin + b) },
        { q: 'Explain why it may not be valid to use the line to estimate the score for a student who revised for ' + xout + ' hours.', m: 1, a: xout + ' hours is outside the range of the data, so this is extrapolation.' }
      ] };
    } },
    { d: [1, 2], f: function () { // scatter + r with GDC
      var n = 8, xs = [], ys = [], m = pick([-1, 1]) * ri(5, 15) / 10, c = ri(20, 60);
      for (var i = 0; i < n; i++) { var x = ri(2, 30); while (xs.indexOf(x) > -1) x = ri(2, 30); xs.push(x); ys.push(Math.round(m * x + c + ri(-6, 6))); }
      var st = IB.pearson(xs, ys);
      return { stem: 'The table shows the temperature, ' + M('x') + ' °C, and the number of hot drinks sold, ' + M('y') + ', at a café on eight days.' + table([M('x')].concat(xs.map(String)), [[M('y')].concat(ys.map(String))]) + D.scatter(xs, ys, 'x', 'y'), parts: [
        { q: 'Find Pearson’s product-moment correlation coefficient, ' + M('r') + '.', m: 2, a: M('r = ' + IB.s3(st.r)) },
        { q: 'Describe the correlation.', m: 1, a: (Math.abs(st.r) > 0.8 ? 'Strong ' : Math.abs(st.r) > 0.5 ? 'Moderate ' : 'Weak ') + (st.r > 0 ? 'positive' : 'negative') + ' correlation' },
        { q: 'Find the equation of the regression line of ' + M('y') + ' on ' + M('x') + '.', m: 2, a: M('y = ' + s3(st.a) + 'x ' + (st.b < 0 ? '- ' + s3(-st.b) : '+ ' + s3(st.b))) }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-probability', name: 'Probability: sample spaces, Venn and tree diagrams', video: 'IB maths AI SL probability tree diagrams conditional', gens: hl('ib-probability', [0, 1, 2]).concat([
    { d: [1], f: function () { // two dice sample space
      var op = pick(['sum', 'product']), tgt = op === 'sum' ? ri(5, 9) : pick([6, 12]), cnt = 0, more = 0, T = ri(8, 10);
      for (var a = 1; a <= 6; a++) for (var b = 1; b <= 6; b++) { var v = op === 'sum' ? a + b : a * b; if (v === tgt) cnt++; if (op === 'sum' ? v > T : v > 2 * T) more++; }
      var rows = []; for (var r = 1; r <= 6; r++) { var row = ['<b>' + r + '</b>']; for (var c = 1; c <= 6; c++) row.push(String(op === 'sum' ? r + c : r * c)); rows.push(row); }
      return { stem: 'Two fair six-sided dice are rolled and the ' + op + ' of the scores is recorded. The sample space diagram is shown.' + table([op === 'sum' ? '+' : '×', '1', '2', '3', '4', '5', '6'], rows), parts: [
        { q: 'Find the probability that the ' + op + ' is ' + tgt + '.', m: 2, a: M(frac(cnt, 36)) },
        { q: 'Find the probability that the ' + op + ' is greater than ' + (op === 'sum' ? T : 2 * T) + '.', m: 2, a: M(frac(more, 36)) },
        { q: 'The dice are rolled 180 times. Find the expected number of times the ' + op + ' is ' + tgt + '.', m: 1, a: num(180 * cnt / 36) }
      ] };
    } },
    { d: [2], f: function () { // two-way table conditional
      var a = ri(10, 30), b = ri(10, 30), c = ri(10, 30), d = ri(10, 30), N = a + b + c + d;
      return { stem: 'A survey asked ' + N + ' adults whether they prefer cats or dogs.' + table(['', 'Cats', 'Dogs', 'Total'], [['Under 40', a, b, a + b], ['40 or over', c, d, c + d], ['Total', a + c, b + d, N]].map(function (r) { return r.map(String); })), parts: [
        { q: 'An adult is chosen at random. Find the probability that they prefer dogs.', m: 1, a: M(frac(b + d, N)) },
        { q: 'Find the probability that an adult is under 40, given that they prefer cats.', m: 2, a: M(frac(a, a + c)) },
        { q: 'Determine whether preferring cats is independent of being under 40. Justify your answer.', m: 2, a: M('P(\\text{cats}) = ' + s3((a + c) / N)) + ', ' + M('P(\\text{cats} \\mid \\text{under 40}) = ' + s3(a / (a + b))) + (Math.abs((a + c) / N - a / (a + b)) < 1e-9 ? '; these are equal, so they are independent.' : '; these are not equal, so they are not independent.') }
      ] };
    } },
    { d: [2, 3], f: function () { // without replacement tree
      var r = ri(3, 8), bl = ri(3, 8), n = r + bl;
      var tree = D.tree({ A: 'R', Ac: 'B', B: 'R', Bc: 'B', p: [frac(r, n).replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2'), frac(bl, n).replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2'), (r - 1) + '/' + (n - 1), bl + '/' + (n - 1), r + '/' + (n - 1), (bl - 1) + '/' + (n - 1)] });
      return { stem: 'A bag contains ' + r + ' red and ' + bl + ' blue marbles. Two marbles are taken at random without replacement.' + tree, parts: [
        { q: 'Find the probability that both marbles are red.', m: 2, a: M('\\frac{' + r + '}{' + n + '} \\times \\frac{' + (r - 1) + '}{' + (n - 1) + '} = ' + frac(r * (r - 1), n * (n - 1))) },
        { q: 'Find the probability that the marbles are different colours.', m: 2, a: M(frac(2 * r * bl, n * (n - 1))) },
        { q: 'Given that the marbles are the same colour, find the probability that they are both blue.', m: 3, a: M('\\frac{' + bl * (bl - 1) + '}{' + (r * (r - 1) + bl * (bl - 1)) + '} = ' + frac(bl * (bl - 1), r * (r - 1) + bl * (bl - 1))) }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-discrete', name: 'Discrete random variables and the binomial distribution', video: 'IB maths AI SL binomial distribution GDC', gens: hl('ib-discrete', [0, 1, 2]).concat([
    { d: [2], f: function () {
      var n = ri(10, 25), p = ri(10, 45) / 100, k = ri(2, Math.min(8, n - 2)), k2 = ri(2, 6);
      return { stem: 'In a factory, ' + Math.round(p * 100) + '% of light bulbs are faulty. A random sample of ' + n + ' bulbs is taken. Let ' + M('X') + ' be the number of faulty bulbs.', parts: [
        { q: 'Write down the distribution of ' + M('X') + '.', m: 1, a: M('X \\sim B(' + n + ',\\ ' + p + ')') },
        { q: 'Find ' + M('P(X \\le ' + k + ')') + '.', m: 2, a: s3(IB.bcdf(n, p, k)) },
        { q: 'Find the probability that more than ' + k2 + ' bulbs are faulty.', m: 2, a: s3(1 - IB.bcdf(n, p, k2)) },
        { q: 'Find the expected number of faulty bulbs.', m: 1, a: s3(n * p) }
      ] };
    } },
    { d: [1, 2], f: function () { // fair game
      var cost = ri(2, 5), pr = [ri(10, 30), ri(20, 40)]; var p0 = 100 - pr[0] - pr[1], prize = [ri(4, 9), ri(1, 3)];
      var E = (pr[0] * prize[0] + pr[1] * prize[1]) / 100 - cost;
      return { stem: 'A game costs $' + cost + ' to play. The table shows the prize won and its probability.' + table(['Prize ($)', '0', String(prize[1]), String(prize[0])], [['Probability', String(p0 / 100), String(pr[1] / 100), String(pr[0] / 100)]]), parts: [
        { q: 'Find the expected prize.', m: 2, a: '$' + s3((pr[0] * prize[0] + pr[1] * prize[1]) / 100) },
        { q: 'Find the expected gain for a player and state whether the game is fair.', m: 2, a: 'Expected gain = ' + (E < 0 ? '−$' + s3(-E) : '$' + s3(E)) + (Math.abs(E) < 1e-9 ? ', so the game is fair.' : ', so the game is not fair.') }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-normal', name: 'The normal distribution', video: 'IB maths AI SL normal distribution inverse normal', gens: hl('ib-normal', [0, 1]).concat([
    { d: [1], f: function () {
      var mu = ri(40, 80), sd = ri(3, 9), a = mu - ri(1, 2) * sd + ri(-2, 2), b = mu + ri(1, 2) * sd + ri(-2, 2), N = ri(2, 6) * 100, p = IB.ncdf(b, mu, sd) - IB.ncdf(a, mu, sd);
      return { stem: 'The lengths of fish in a lake are normally distributed with mean ' + mu + ' cm and standard deviation ' + sd + ' cm.' + D.normal(mu, sd, a, b, { mu: String(mu), a: String(a), b: String(b) }), parts: [
        { q: 'Find the probability that a fish is between ' + a + ' cm and ' + b + ' cm long.', m: 2, a: s3(p) },
        { q: 'There are ' + N + ' fish in the lake. Find the expected number between ' + a + ' cm and ' + b + ' cm long.', m: 2, a: s3(N * p) }
      ] };
    } },
    { d: [2], f: function () {
      var mu = ri(400, 520), sd = ri(10, 30), q = pick([5, 10, 15, 20, 90, 95]), k = mu + sd * IB.invPhi(q / 100), lo = mu - ri(1, 3) * 10;
      return { stem: 'The mass of a bag of flour is normally distributed with mean ' + mu + ' g and standard deviation ' + sd + ' g.', parts: [
        { q: 'Find the probability that a bag has a mass less than ' + lo + ' g.', m: 2, a: s3(IB.ncdf(lo, mu, sd)) },
        { q: (q < 50 ? 'The lightest ' + q + '%' : 'The heaviest ' + (100 - q) + '%') + ' of bags are rejected. Find the mass ' + M('m') + ' that separates the rejected bags from the rest.', m: 2, a: M('m = ' + s3(k)) + ' g' }
      ] };
    } },
    { d: [3], f: function () { // normal then binomial
      var mu = ri(150, 190), sd = ri(5, 12), x = mu + ri(5, 15), p = 1 - IB.ncdf(x, mu, sd), n = ri(8, 15), k = ri(1, 3);
      return { stem: 'The heights of a type of plant are normally distributed with mean ' + mu + ' cm and standard deviation ' + sd + ' cm.', parts: [
        { q: 'Find the probability that a plant is taller than ' + x + ' cm.', m: 2, a: s3(p) },
        { q: 'A random sample of ' + n + ' plants is taken. Find the probability that exactly ' + k + ' of them are taller than ' + x + ' cm.', m: 3, a: M('X \\sim B(' + n + ',\\ ' + s3(p) + ')') + ', ' + M('P(X = ' + k + ') = ' + s3(IB.bpdf(n, p, k))) },
        { q: 'Find the probability that at least one plant in the sample is taller than ' + x + ' cm.', m: 2, a: s3(1 - Math.pow(1 - p, n)) }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-tests', name: 'Hypothesis testing: chi-squared and t-tests', video: 'IB maths AI SL chi squared test t test', gens: hl('ib-hypothesis', [0, 1]).concat([
    { d: [2], f: function () { // chi-squared independence 2x3
      var rows = ['Male', 'Female'], cols = ['Football', 'Hockey', 'Tennis'], O = [[ri(15, 45), ri(10, 40), ri(10, 35)], [ri(10, 40), ri(15, 45), ri(10, 35)]];
      var R = O.map(function (r) { return r.reduce(function (a, c) { return a + c; }, 0); }), C = [0, 1, 2].map(function (j) { return O[0][j] + O[1][j]; }), N = R[0] + R[1];
      var chi = 0; O.forEach(function (r, i) { r.forEach(function (o, j) { var e = R[i] * C[j] / N; chi += (o - e) * (o - e) / e; }); });
      var pv = IB.chi2sf(chi, 2), E01 = R[0] * C[1] / N;
      return { stem: 'A survey records the favourite sport of ' + N + ' students. A ' + M('\\chi^2') + ' test for independence is carried out at the 5% significance level.' + table([''].concat(cols), O.map(function (r, i) { return [rows[i]].concat(r.map(String)); })), parts: [
        { q: 'State the null and alternative hypotheses.', m: 1, a: M('H_0') + ': favourite sport is independent of gender. ' + M('H_1') + ': favourite sport is not independent of gender.' },
        { q: 'Find the expected frequency for male students who prefer hockey.', m: 2, a: M('\\frac{' + R[0] + ' \\times ' + C[1] + '}{' + N + '} = ' + s3(E01)) },
        { q: 'Write down the number of degrees of freedom.', m: 1, a: '2' },
        { q: 'Find the ' + M('p') + '-value for the test.', m: 2, a: M('\\chi^2_{calc} = ' + s3(chi)) + ', ' + M('p = ' + p3(pv)) },
        { q: 'State the conclusion of the test, giving a reason.', m: 1, a: (pv < 0.05 ? 'Reject ' + M('H_0') + ' since ' + M('p < 0.05') + ': there is evidence that sport and gender are not independent.' : 'Do not reject ' + M('H_0') + ' since ' + M('p > 0.05') + ': there is insufficient evidence that sport depends on gender.') }
      ] };
    } },
    { d: [2, 3], f: function () { // goodness of fit with given proportions
      var props = pick([[0.5, 0.3, 0.2], [0.4, 0.4, 0.2], [0.25, 0.5, 0.25], [0.6, 0.25, 0.15]]), N = pick([80, 100, 120, 160, 200]);
      var E = props.map(function (p) { return p * N; }), O = E.map(function (e) { return Math.max(1, Math.round(e + ri(-8, 8))); }); O[2] = N - O[0] - O[1];
      var chi = O.reduce(function (s, o, i) { return s + (o - E[i]) * (o - E[i]) / E[i]; }, 0), pv = IB.chi2sf(chi, 2);
      return { stem: 'A seed company claims that its mixed packets contain red, yellow and white flowers in the ratio ' + props.map(function (p) { return Math.round(p * 20); }).join(' : ') + '. A gardener grows ' + N + ' plants and records the colours.' + table(['Colour', 'Red', 'Yellow', 'White'], [['Observed'].concat(O.map(String))]) + 'A ' + M('\\chi^2') + ' goodness of fit test is carried out at the 5% significance level.', parts: [
        { q: 'Write down the expected frequencies.', m: 2, a: E.map(num).join(', ') },
        { q: 'Write down the number of degrees of freedom.', m: 1, a: '2' },
        { q: 'Find the ' + M('\\chi^2') + ' statistic and the ' + M('p') + '-value.', m: 2, a: M('\\chi^2 = ' + s3(chi) + ',\\ p = ' + p3(pv)) },
        { q: 'State, with a reason, whether the company’s claim is supported.', m: 2, a: pv < 0.05 ? 'Reject ' + M('H_0') + ' (' + M('p < 0.05') + '): the data do not support the claim.' : 'Do not reject ' + M('H_0') + ' (' + M('p > 0.05') + '): the data are consistent with the claim.' }
      ] };
    } },
    { d: [3], f: function () { // two-sample t-test (pooled)
      var n1 = ri(6, 8), n2 = ri(6, 8), m1 = ri(55, 75), diff = pick([0, 2, 4, 6, 8]), sdv = ri(4, 8);
      var A = [], B = []; for (var i = 0; i < n1; i++) A.push(m1 + ri(-sdv, sdv)); for (var j = 0; j < n2; j++) B.push(m1 + diff + ri(-sdv, sdv));
      var ma = IB.mean(A), mb = IB.mean(B), va = A.reduce(function (s, v) { return s + (v - ma) * (v - ma); }, 0) / (n1 - 1), vb = B.reduce(function (s, v) { return s + (v - mb) * (v - mb); }, 0) / (n2 - 1);
      var sp = Math.sqrt(((n1 - 1) * va + (n2 - 1) * vb) / (n1 + n2 - 2)), t = (mb - ma) / (sp * Math.sqrt(1 / n1 + 1 / n2)), df = n1 + n2 - 2, pv = tTwoTail(t, df);
      var oneTail = t > 0 ? pv / 2 : 1 - pv / 2;
      return { stem: 'Two groups of students took the same test. Group ' + M('A') + ' used a textbook and group ' + M('B') + ' used an online course. Their scores are shown. Assume the scores are normally distributed with equal variances.' + htable([['Group A'].concat(A.map(String)), ['Group B'].concat(B.map(String))]) + 'A ' + M('t') + '-test is carried out at the 5% significance level to test whether the mean score of group ' + M('B') + ' is higher than that of group ' + M('A') + '.', parts: [
        { q: 'State the null and alternative hypotheses.', m: 2, a: M('H_0: \\mu_A = \\mu_B') + ', ' + M('H_1: \\mu_B > \\mu_A') },
        { q: 'Find the ' + M('p') + '-value for the test.', m: 2, a: M('t = ' + s3(t) + ',\\ p = ' + p3(oneTail)) + ' (pooled two-sample ' + M('t') + '-test)' },
        { q: 'State the conclusion of the test, giving a reason.', m: 2, a: oneTail < 0.05 ? 'Since ' + M('p < 0.05') + ', reject ' + M('H_0') + ': there is evidence that the mean score of group B is higher.' : 'Since ' + M('p > 0.05') + ', do not reject ' + M('H_0') + ': there is insufficient evidence that the mean score of group B is higher.' }
      ] };
    } },
    { d: [1], f: function () { // interpreting a p-value
      var pv = pick([0.012, 0.034, 0.048, 0.067, 0.081, 0.153, 0.002]), sl = pick([1, 5, 10]);
      return { stem: 'A ' + M('\\chi^2') + ' test for independence between age group and choice of newspaper gives a ' + M('p') + '-value of ' + pv + '.', parts: [
        { q: 'Write down the null hypothesis.', m: 1, a: M('H_0') + ': age group and choice of newspaper are independent.' },
        { q: 'State the conclusion of the test at the ' + sl + '% significance level, giving a reason.', m: 2, a: (pv < sl / 100 ? 'Reject ' + M('H_0') + ', since ' + pv + ' < ' + sl / 100 + '.' : 'Do not reject ' + M('H_0') + ', since ' + pv + ' > ' + sl / 100 + '.') }
      ] };
    } }
  ]) });

  /* =============== TOPIC 5: CALCULUS (SL) =============== */
  BS.topic({ id: 'sl-derivatives', name: 'Differentiation: gradients, tangents, normals, increasing and decreasing', video: 'IB maths AI SL differentiation tangent normal', gens: hl('ib-derivatives', [0, 1, 2]).concat([
    { d: [1], f: function () {
      var a = ri(2, 6), n = ri(3, 5), b = nz(-6, 6), c = ri(2, 9), x0 = pick([1, 2, -1]);
      var fp = function (x) { return a * n * Math.pow(x, n - 1) + 2 * b * x - c / (x * x); };
      return { stem: M('f(x) = ' + a + 'x^{' + n + '}' + (b < 0 ? ' - ' + (b === -1 ? '' : -b) : ' + ' + (b === 1 ? '' : b)) + 'x^{2} + \\frac{' + c + '}{x}') + ', ' + M('x \\ne 0') + '.', parts: [
        { q: 'Find ' + M("f'(x)") + '.', m: 3, a: M("f'(x) = " + a * n + 'x^{' + (n - 1) + '}' + sg(2 * b) + 'x - \\frac{' + c + '}{x^{2}}') },
        { q: 'Find the gradient of the graph of ' + M('f') + ' at ' + M('x = ' + x0) + '.', m: 1, a: num(fp(x0)) }
      ] };
    } },
    { d: [2], f: function () { // tangent & normal in ax+by+d=0
      var a = nz(-3, 3), b = nz(-6, 6), c = ri(-5, 5), x0 = nz(-3, 3), y0 = a * x0 * x0 + b * x0 + c, m = 2 * a * x0 + b;
      while (m === 0) { x0 = nz(-3, 3); y0 = a * x0 * x0 + b * x0 + c; m = 2 * a * x0 + b; }
      // normal: y - y0 = -1/m (x - x0) -> x + m y - (x0 + m y0) = 0
      var K = x0 + m * y0, nEq = 'x' + (m < 0 ? ' - ' + (m === -1 ? '' : -m) : ' + ' + (m === 1 ? '' : m)) + 'y' + (K ? sg(-K) : '') + ' = 0';
      return { stem: 'The curve ' + M('C') + ' has equation ' + M('y = ' + poly([a, b, c])) + '. The point ' + M('P') + ' on ' + M('C') + ' has ' + M('x') + '-coordinate ' + x0 + '.', parts: [
        { q: 'Find the gradient of the tangent to ' + M('C') + ' at ' + M('P') + '.', m: 2, a: M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + poly([2 * a, b]) + ' = ' + m) },
        { q: 'Find the equation of the tangent to ' + M('C') + ' at ' + M('P') + '.', m: 2, a: M('P(' + x0 + ',\\ ' + y0 + ')') + '; ' + M('y = ' + poly([m, y0 - m * x0])) },
        { q: 'Find the equation of the normal to ' + M('C') + ' at ' + M('P') + ', giving your answer in the form ' + M('ax + by + d = 0') + ', where ' + M('a, b, d \\in \\mathbb{Z}') + '.', m: 3, a: 'Gradient ' + M(frac(-1, m)) + '; ' + M(nEq) }
      ] };
    } },
    { d: [2, 3], f: function () { // increasing/decreasing from a graph of f
      var p = nz(-3, 0), q = p + ri(2, 5), a = pick([1, -1]) * pick([0.5, 1]);
      var f = function (x) { return a * (x * x * x / 3 - (p + q) * x * x / 2 + p * q * x); };
      var lo = p - 2, hi = q + 2, ys = []; for (var x = lo; x <= hi; x += 0.1) ys.push(f(x));
      var ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);
      var pl = D.plane({ xmin: lo, xmax: hi, ymin: Math.floor(ymin) - 1, ymax: Math.ceil(ymax) + 1, w: 300, h: 280, ticks: true, tstep: 1, tstepy: Math.max(1, Math.ceil((ymax - ymin) / 8)) });
      var s = pl.svg + pl.curve(f, lo, hi) + D.dot(pl.X(p), pl.Y(f(p))) + D.dot(pl.X(q), pl.Y(f(q)));
      var incr = a > 0 ? M('x < ' + p) + ' or ' + M('x > ' + q) : M(p + ' < x < ' + q), decr = a > 0 ? M(p + ' < x < ' + q) : M('x < ' + p) + ' or ' + M('x > ' + q);
      return { stem: 'The graph of ' + M('y = f(x)') + ' is shown. It has a local maximum and a local minimum at ' + M('x = ' + p) + ' and ' + M('x = ' + q) + '.' + D.svg(300, 280, s, 'Cubic graph with turning points', true), parts: [
        { q: 'Write down the values of ' + M('x') + ' for which ' + M("f'(x) = 0") + '.', m: 1, a: M('x = ' + p + ',\\ x = ' + q) },
        { q: 'Write down the values of ' + M('x') + ' for which ' + M('f') + ' is increasing.', m: 2, a: incr },
        { q: 'Write down the values of ' + M('x') + ' for which ' + M("f'(x) < 0") + '.', m: 1, a: decr }
      ] };
    } },
    { d: [3], f: function () { // point where gradient = k, then tangent intercept
      var a = ri(1, 3), b = nz(-6, 6), c = ri(-6, 6), k = nz(-6, 8), x0 = (k - b) / (2 * a);
      while (x0 !== Math.round(x0)) { k = nz(-6, 8); x0 = (k - b) / (2 * a); }
      var y0 = a * x0 * x0 + b * x0 + c, cint = y0 - k * x0;
      return { stem: 'The curve ' + M('y = ' + poly([a, b, c])) + ' has a tangent with gradient ' + k + ' at the point ' + M('Q') + '.', parts: [
        { q: 'Find the coordinates of ' + M('Q') + '.', m: 3, a: M(poly([2 * a, b]) + ' = ' + k + ' \\Rightarrow x = ' + x0) + '; ' + M('Q(' + x0 + ',\\ ' + y0 + ')') },
        { q: 'Find the equation of the tangent at ' + M('Q') + '.', m: 2, a: M('y = ' + poly([k, cint])) },
        { q: 'Find the ' + M('x') + '-coordinate of the point where this tangent meets the ' + M('x') + '-axis.', m: 1, a: M('x = ' + frac(-cint, k)) }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-optimisation', name: 'Stationary points and optimisation', video: 'IB maths AI SL optimisation stationary points', gens: hl('ib-optimisation', [1, 2]).concat([
    { d: [1, 2], f: function () { // stationary points of a cubic
      var p = nz(-3, 2), q = p + ri(1, 4), a = pick([1, 2]);
      var c = [2 * a, -3 * a * (p + q), 6 * a * p * q, ri(-5, 5)], f = function (x) { return c[0] * x * x * x + c[1] * x * x + c[2] * x + c[3]; };
      return { stem: 'A curve has equation ' + M('y = ' + poly(c)) + '.', parts: [
        { q: 'Find ' + M('\\frac{\\mathrm{d}y}{\\mathrm{d}x}') + '.', m: 2, a: M(poly([3 * c[0], 2 * c[1], c[2]])) },
        { q: 'Find the coordinates of the local maximum and the local minimum points.', m: 4, a: 'Local maximum ' + M('(' + p + ',\\ ' + f(p) + ')') + ', local minimum ' + M('(' + q + ',\\ ' + f(q) + ')') }
      ] };
    } },
    { d: [2], f: function () { // profit
      var a = ri(2, 6), b = ri(80, 200), cst = ri(Math.round(b * b / (16 * a)), Math.round(b * b / (5 * a))), xm = b / (2 * a), Pm = -a * xm * xm + b * xm - cst;
      return { stem: 'The weekly profit, ' + M('P') + ' dollars, from selling ' + M('x') + ' items is modelled by ' + M('P(x) = -' + a + 'x^2 + ' + b + 'x - ' + cst) + '.', parts: [
        { q: 'Find ' + M("P'(x)") + '.', m: 2, a: M("P'(x) = -" + 2 * a + 'x + ' + b) },
        { q: 'Find the number of items that maximises the profit.', m: 2, a: (xm === Math.round(xm) ? num(xm) : dp(xm, 2)) + (xm === Math.round(xm) ? '' : ' (so ' + Math.floor(xm) + ' or ' + Math.ceil(xm) + ' items in practice)') },
        { q: 'Find the maximum weekly profit.', m: 1, a: '$' + s3(Pm) },
        { q: 'Find the least number of items that must be sold for the company not to make a loss.', m: 2, a: String(Math.ceil((b - Math.sqrt(b * b - 4 * a * cst)) / (2 * a))) }
      ] };
    } },
    { d: [3], f: function () { // fencing along a river
      var L = ri(12, 40) * 10, x = L / 4, A = x * (L - 2 * x);
      return { stem: 'A farmer has ' + L + ' m of fencing to enclose a rectangular field next to a straight river. No fence is needed along the river. The width of the field perpendicular to the river is ' + M('x') + ' m.' + D.svg(280, 170, D.line(20, 30, 260, 30, 'accent') + D.text(140, 20, 'River', { anchor: 'middle', size: 12 }) + D.path('M60,30 L60,140 L220,140 L220,30', 'ln') + D.text(50, 85, 'x', { anchor: 'end', cls: 'it' }) + D.text(230, 85, 'x', { cls: 'it' }), 'Field next to a river'), parts: [
        { q: 'Show that the area of the field is ' + M('A = ' + L + 'x - 2x^2') + '.', m: 2, a: 'Length parallel to the river ' + M('= ' + L + ' - 2x') + ', so ' + M('A = x(' + L + ' - 2x)') },
        { q: 'Find ' + M('\\frac{\\mathrm{d}A}{\\mathrm{d}x}') + '.', m: 1, a: M(L + ' - 4x') },
        { q: 'Find the maximum area of the field.', m: 3, a: M(L + ' - 4x = 0 \\Rightarrow x = ' + num(x)) + '; ' + M('A = ' + num(A)) + ' m²' }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-integration', name: 'Integration, areas and the trapezoidal rule', video: 'IB maths AI SL integration area under curve trapezoidal rule', gens: hl('ib-integration', [0, 1, 2]).concat([
    { d: [1], f: function () { // indefinite with negative power, then constant
      var a = ri(2, 6) * 3, b = nz(-6, 6) * 2, c = ri(2, 9), x0 = 1, y0 = ri(-5, 10);
      var F = function (x) { return a / 3 * x * x * x + b / 2 * x * x - c / x; }, C = y0 - F(x0);
      return { stem: '', parts: [
        { q: 'Find ' + M('\\displaystyle\\int \\left(' + a + 'x^{2}' + sg(b) + 'x + \\frac{' + c + '}{x^{2}}\\right)\\mathrm{d}x') + '.', m: 3, a: M(a / 3 + 'x^{3}' + (b === 2 ? ' + ' : b === -2 ? ' - ' : sg(b / 2)) + 'x^{2} - \\frac{' + c + '}{x} + C') },
        { q: 'The curve ' + M('y = f(x)') + ' has gradient ' + M("f'(x) = " + a + 'x^{2}' + sg(b) + 'x + \\frac{' + c + '}{x^{2}}') + ' and passes through ' + M('(1,\\ ' + y0 + ')') + '. Find ' + M('f(x)') + '.', m: 3, a: M('f(x) = ' + a / 3 + 'x^{3}' + (b === 2 ? ' + ' : b === -2 ? ' - ' : sg(b / 2)) + 'x^{2} - \\frac{' + c + '}{x}' + (C ? sg(C) : '')) }
      ] };
    } },
    { d: [2], f: function () { // area under a curve with GDC
      var r = ri(2, 5), k = pick([1, 2, 3]), f = function (x) { return k * x * (r - x) * (x + 1) / 2; };
      var area = 0, n = 2000; for (var i = 0; i < n; i++) { var x = r * (i + 0.5) / n; area += f(x) * r / n; }
      var ys = []; for (var x2 = -1; x2 <= r + 0.5; x2 += 0.1) ys.push(f(x2));
      var pl = D.plane({ xmin: -1.5, xmax: r + 1, ymin: Math.min.apply(null, ys) - 1, ymax: Math.max.apply(null, ys) + 1, w: 300, h: 260, ticks: true, tstep: 1, tstepy: Math.max(1, Math.ceil(Math.max.apply(null, ys) / 5)) });
      var s = pl.svg + pl.area(f, 0, r, 0) + pl.curve(f, -1.5, r + 1) + D.text(pl.X(r / 2), pl.Y(f(r / 2) / 3), 'R', { anchor: 'middle', cls: 'it' });
      var cf = [-k / 2, k * (r - 1) / 2, k * r / 2, 0];
      return { stem: 'The diagram shows part of the graph of ' + M('y = ' + poly(cf.map(function (v) { return Math.round(v * 2) / 2; }))) + '. The region ' + M('R') + ' is enclosed by the curve and the ' + M('x') + '-axis between ' + M('x = 0') + ' and ' + M('x = ' + r) + '.' + D.svg(300, 260, s, 'Area under a curve', true), parts: [
        { q: 'Write down an integral that represents the area of ' + M('R') + '.', m: 2, a: M('\\displaystyle\\int_0^{' + r + '} \\left(' + poly(cf.map(function (v) { return Math.round(v * 2) / 2; })) + '\\right)\\mathrm{d}x') },
        { q: 'Use technology to find the area of ' + M('R') + '.', m: 2, a: s3(area) }
      ] };
    } },
    { d: [2, 3], f: function () { // trapezoidal rule from data (river cross-section)
      var h = pick([1, 2, 2.5]), n = 6, depths = [0]; for (var i = 1; i < n; i++) depths.push(ri(8, 30) / 10); depths.push(0);
      var est = h / 2 * (depths[0] + depths[n] + 2 * depths.slice(1, n).reduce(function (a, c) { return a + c; }, 0));
      var W = 320, sy = 30, H = Math.ceil(50 + Math.max.apply(null, depths) * sy), sx = (W - 40) / (n * h), s = D.line(20, 30, W - 20, 30, 'ax'), d = 'M20,30';
      depths.forEach(function (v, i) { d += 'L' + (20 + i * h * sx) + ',' + (30 + v * sy); if (i > 0 && i < n) s += D.line(20 + i * h * sx, 30, 20 + i * h * sx, 30 + v * sy, 'dash'); });
      s += D.path(d, 'curve') + D.text(W / 2, 20, (n * h) + ' m', { anchor: 'middle', size: 12 });
      return { stem: 'The depth of a river, ' + M('d') + ' metres, is measured at intervals of ' + h + ' m across its width.' + table([M('x') + ' (m)'].concat(depths.map(function (_, i) { return num(i * h); })), [[M('d') + ' (m)'].concat(depths.map(function (v) { return num(v); }))]) + D.svg(W, H, s, 'Cross-section of a river', true), parts: [
        { q: 'Use the trapezoidal rule to estimate the area of the cross-section of the river.', m: 3, a: M('\\frac{' + h + '}{2}\\left[0 + 0 + 2(' + depths.slice(1, n).map(num).join(' + ') + ')\\right] = ' + s3(est)) + ' m²' },
        { q: 'The water flows at 0.' + ri(3, 9) + ' m s⁻¹. Estimate the volume of water passing the measuring point each minute.', m: 2, a: '' }
      ] };
    } },
    { d: [3], f: function () { // find k from a definite integral
      var a = ri(1, 4) * 3, k = ri(2, 5), val = a / 3 * k * k * k + k;
      return q1('Given that ' + M('\\displaystyle\\int_0^{k} (' + a + 'x^{2} + 1)\\,\\mathrm{d}x = ' + val) + ', where ' + M('k > 0') + ', find the value of ' + M('k') + '.', 4,
        M('\\left[' + (a / 3 === 1 ? '' : a / 3) + 'x^{3} + x\\right]_0^{k} = ' + (a / 3 === 1 ? '' : a / 3) + 'k^{3} + k = ' + val + ' \\Rightarrow k = ' + k));
    } }
  ]) });
  // fill the flow-volume answer for the river question
  (function () { var gs = BS.topics['sl-integration'].gens, gen = gs[gs.length - 2], f0 = gen.f; gen.f = function (d) { var q = f0(d), v = Number(q.parts[1].q.match(/flows at (0\.\d)/)[1]), A = Number(q.parts[0].a.match(/= ([\d.]+)\\\)/)[1]); q.parts[1].a = M(s3(A) + ' \\times ' + v + ' \\times 60 = ' + s3(A * v * 60)) + ' m³'; return q; }; })();
})(typeof window !== 'undefined' ? window : globalThis);
