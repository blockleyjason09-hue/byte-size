/* Byte Size — AQA Level 2 Certificate in Further Mathematics (8365): Coordinate geometry, Calculus, Matrices and Geometry. */
(function (g) {
  var BS = g.BS, D = BS.draw, FM = BS.fm, from = FM.from, c1 = FM.c1;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, dp = BS.dp, num = BS.num, M = BS.m, sf = BS.sf;
  var surd = BS.gcse2.surd;
  function q1(q, m, a, stem) { return { stem: stem, parts: [{ q: q, m: m, a: a }] }; }
  function rad(d) { return d * Math.PI / 180; }
  function pt(p) { return '(' + p.map(num).join(',\\ ') + ')'; }
  function lineABC(a, b, c) { // ax + by + c = 0 with a > 0 and integer coefficients
    var k = gcd(gcd(Math.abs(a), Math.abs(b)), Math.abs(c)) || 1; a /= k; b /= k; c /= k; if (a < 0 || (a === 0 && b < 0)) { a = -a; b = -b; c = -c; }
    var s = a ? c1(a, 'x') : ''; if (b) s += (s ? (b < 0 ? ' - ' : ' + ') : (b < 0 ? '-' : '')) + c1(Math.abs(b), 'y'); if (c) s += sg(c); return s + ' = 0';
  }
  function mat(A) { return '\\begin{pmatrix} ' + A.map(function (r) { return r.join(' & '); }).join(' \\\\ ') + ' \\end{pmatrix}'; }
  function mm(A, B) { return A.map(function (r) { return B[0].map(function (_, j) { return r.reduce(function (s, v, k) { return s + v * B[k][j]; }, 0); }); }); }

  /* =============== COORDINATE GEOMETRY =============== */
  BS.topic({ id: 'fm-coord', name: 'Coordinate geometry: gradients, distance, ratio and lines', video: 'coordinate geometry further maths perpendicular', gens: from('straight-lines', [2, 3, 4]).concat([
    { d: [1, 2], f: function () { // show right angle via gradients
      var A = [ri(-4, 2), ri(-4, 2)], u = [nz(-3, 3), nz(-3, 3)], k = pick([1, 2]), B = [A[0] + u[0] * 2, A[1] + u[1] * 2], C = [A[0] - u[1] * k, A[1] + u[0] * k];
      var mAB = frac(u[1], u[0]), mAC = frac(u[0], -u[1]);
      return q1(M('A' + pt(A)) + ', ' + M('B' + pt(B)) + ' and ' + M('C' + pt(C)) + ' are three points.<br>Show that triangle ' + M('ABC') + ' is right-angled at ' + M('A') + '.', 3,
        'Gradient ' + M('AB = ' + mAB) + ', gradient ' + M('AC = ' + mAC) + '. Their product is ' + M('-1') + ', so ' + M('AB') + ' is perpendicular to ' + M('AC') + '.');
    } },
    { d: [1, 2], f: function () { // point dividing in a ratio
      var m = ri(1, 4), n = ri(1, 4); while (gcd(m, n) > 1) n = ri(1, 4); var A = [ri(-6, 4), ri(-6, 4)], dir = [nz(-3, 3) * (m + n), nz(-3, 3) * (m + n)], B = [A[0] + dir[0], A[1] + dir[1]];
      var P = [A[0] + dir[0] * m / (m + n), A[1] + dir[1] * m / (m + n)];
      var fig = D.geo({ pts: { A: A, P: P, B: B }, segs: [['A', 'B']], dots: ['A', 'P', 'B'], w: 300, h: 200, label: 'Point P on AB' });
      return { stem: M('A' + pt(A)) + ' and ' + M('B' + pt(B)) + ' are two points. ' + M('P') + ' lies on ' + M('AB') + ' such that ' + M('AP : PB = ' + m + ' : ' + n) + '.' + fig, parts: [
        { q: 'Work out the coordinates of the midpoint of ' + M('AB') + '.', m: 1, a: M(pt([(A[0] + B[0]) / 2, (A[1] + B[1]) / 2])) },
        { q: 'Work out the coordinates of ' + M('P') + '.', m: 3, a: M(pt(P)) }
      ] };
    } },
    { d: [2, 3], f: function () { // perpendicular bisector and intersection with axes
      var A, B; do { A = [ri(-6, 6), ri(-6, 6)]; B = [ri(-6, 6), ri(-6, 6)]; } while ((A[0] - B[0]) % 2 || (A[1] - B[1]) % 2 || A[0] === B[0] || A[1] === B[1]);
      var Mx = (A[0] + B[0]) / 2, My = (A[1] + B[1]) / 2, dx = B[0] - A[0], dy = B[1] - A[1];
      return q1('The points ' + M('A' + pt(A)) + ' and ' + M('B' + pt(B)) + ' are shown on a coordinate grid.<br>Work out the equation of the perpendicular bisector of ' + M('AB') + '. Give your answer in the form ' + M('ax + by + c = 0') + ', where ' + M('a') + ', ' + M('b') + ' and ' + M('c') + ' are integers.', 4,
        'Midpoint ' + M(pt([Mx, My])) + ', gradient of ' + M('AB = ' + frac(dy, dx)) + ', so perpendicular gradient ' + M(frac(-dx, dy)) + ': ' + M(lineABC(dx, dy, -(dx * Mx + dy * My))));
    } },
    { d: [1], f: function () { // distance and gradient
      var A = [ri(-6, 6), ri(-6, 6)], t = pick([[3, 4], [5, 12], [6, 8], [8, 15], [4, 3]]), B = [A[0] + pick([1, -1]) * t[0], A[1] + pick([1, -1]) * t[1]];
      return { stem: M('A' + pt(A)) + ' and ' + M('B' + pt(B)) + ' are two points.', parts: [
        { q: 'Work out the length of ' + M('AB') + '.', m: 2, a: num(Math.hypot(t[0], t[1])) },
        { q: 'Work out the gradient of ' + M('AB') + '.', m: 1, a: M(frac(B[1] - A[1], B[0] - A[0])) }
      ] };
    } },
    { d: [2], f: function () { // line through a point, other form
      var m = pick([2, 3, -2, 0.5, -0.5, -3]), P = [ri(-4, 4), ri(-4, 4)];
      var mn = m % 1 ? m * 2 : m, md = m % 1 ? 2 : 1; // y - y1 = (mn/md)(x - x1) -> mn x - md y + (md y1 - mn x1) = 0
      return q1('A line has gradient ' + M(m % 1 ? frac(mn, md) : String(m)) + ' and passes through ' + M(pt(P)) + '.<br>Work out the equation of the line in the form ' + M('ax + by + c = 0') + ', where ' + M('a') + ', ' + M('b') + ' and ' + M('c') + ' are integers.', 3,
        'Using ' + M('y - y_1 = m(x - x_1)') + ': ' + M(lineABC(mn, -md, md * P[1] - mn * P[0])));
    } }
  ]) });

  BS.topic({ id: 'fm-circles', name: 'Equation of a circle and tangents', video: 'equation of a circle tangent further maths', gens: [
    { d: [1], f: function () { // write the equation, test a point
      var a = ri(-5, 5), b = ri(-5, 5), t = pick([[3, 4], [5, 12], [6, 8], [0, 5], [4, 3]]), r = Math.hypot(t[0], t[1]), P = [a + t[0], b + t[1]];
      return { stem: 'A circle has centre ' + M(pt([a, b])) + ' and radius ' + r + '.', parts: [
        { q: 'Write down the equation of the circle.', m: 2, a: M((a ? br(1, -a) : 'x') + '^2 + ' + (b ? br(1, -b).replace('x', 'y') : 'y') + '^2 = ' + r * r) },
        { q: 'Show that the point ' + M(pt(P)) + ' lies on the circle.', m: 1, a: M('(' + t[0] + ')^2 + (' + t[1] + ')^2 = ' + r * r) }
      ] };
    } },
    { d: [2], f: function () { // centre and radius from expanded form
      var a = nz(-6, 6), b = nz(-6, 6), r2 = pick([4, 9, 16, 25, 36, 7, 10, 13]), F = a * a + b * b - r2;
      return q1('A circle has equation ' + M('x^2 + y^2' + sg(-2 * a) + 'x' + sg(-2 * b) + 'y' + (F ? sg(F) : '') + ' = 0') + '.<br>By completing the square, find the coordinates of the centre and the radius of the circle.', 4,
        M(br(1, -a) + '^2 + ' + br(1, -b).replace('x', 'y') + '^2 = ' + r2) + ', so centre ' + M(pt([a, b])) + ', radius ' + M(surd(r2)));
    } },
    { d: [2, 3], f: function () { // tangent at a point, with diagram
      var a = ri(-3, 3), b = ri(-3, 3), t = pick([[3, 4], [4, 3], [-3, 4], [4, -3], [-4, -3], [3, -4], [-4, 3], [-3, -4]]), r = 5, P = [a + t[0], b + t[1]];
      var eq = lineABC(t[0], t[1], -(t[0] * P[0] + t[1] * P[1]));
      var pl = D.plane({ xmin: a - 8, xmax: a + 8, ymin: b - 8, ymax: b + 8, w: 300, h: 300 });
      var s = pl.svg + '<circle cx="' + pl.X(a) + '" cy="' + pl.Y(b) + '" r="' + (pl.X(a + r) - pl.X(a)) + '" class="thin"/>' + D.dot(pl.X(a), pl.Y(b), 3) + D.dot(pl.X(P[0]), pl.Y(P[1]), 3) + D.line(pl.X(a), pl.Y(b), pl.X(P[0]), pl.Y(P[1]), 'dash');
      var dir = [-t[1], t[0]], L = 0.9; s += D.line(pl.X(P[0] - dir[0] * L), pl.Y(P[1] - dir[1] * L), pl.X(P[0] + dir[0] * L), pl.Y(P[1] + dir[1] * L), 'accent');
      s += D.text(pl.X(a) + 6, pl.Y(b) + 14, 'C', { cls: 'it' }) + D.text(pl.X(P[0]) + 8, pl.Y(P[1]) - 8, 'P', { cls: 'it' });
      return { stem: 'The circle ' + M((a ? br(1, -a) : 'x') + '^2 + ' + (b ? br(1, -b).replace('x', 'y') : 'y') + '^2 = 25') + ' has centre ' + M('C') + '. The point ' + M('P' + pt(P)) + ' lies on the circle.' + D.svg(300, 300, s, 'Circle with a tangent', true), parts: [
        { q: 'Write down the coordinates of ' + M('C') + '.', m: 1, a: M(pt([a, b])) },
        { q: 'Work out the equation of the tangent to the circle at ' + M('P') + '. Give your answer in the form ' + M('ax + by + c = 0') + '.', m: 4, a: 'Gradient ' + M('CP = ' + (t[0] ? frac(t[1], t[0]) : '\\text{undefined}')) + ', so the tangent is perpendicular to it: ' + M(eq) }
      ] };
    } },
    { d: [2], f: function () { // diameter endpoints
      var C = [ri(-4, 4), ri(-4, 4)], t = pick([[3, 4], [6, 8], [5, 12], [1, 2], [2, 3]]), A = [C[0] - t[0], C[1] - t[1]], B = [C[0] + t[0], C[1] + t[1]], r2 = t[0] * t[0] + t[1] * t[1];
      return q1(M('A' + pt(A)) + ' and ' + M('B' + pt(B)) + ' are the ends of a diameter of a circle.<br>Work out the equation of the circle.', 3,
        'Centre ' + M(pt(C)) + ', ' + M('r^2 = ' + r2) + ': ' + M((C[0] ? br(1, -C[0]) : 'x') + '^2 + ' + (C[1] ? br(1, -C[1]).replace('x', 'y') : 'y') + '^2 = ' + r2));
    } },
    { d: [3], f: function () { // line meets circle centred at origin
      var pts = pick([[[3, 4], [-4, -3]], [[5, 0], [0, 5]], [[-5, 0], [0, 5]], [[3, 4], [4, 3]], [[-3, -4], [4, 3]], [[6, 8], [8, 6]], [[0, -5], [3, 4]], [[1, 7], [7, 1]]]);
      var P = pts[0], Q = pts[1], r2 = P[0] * P[0] + P[1] * P[1], m = (Q[1] - P[1]) / (Q[0] - P[0]), c = P[1] - m * P[0];
      return q1('Solve the simultaneous equations ' + M('x^2 + y^2 = ' + r2) + ' and ' + M('y = ' + poly([m, c]).replace(/^1x/, 'x')) + '. Interpret your answer geometrically.', 6,
        M(pt(P)) + ' and ' + M(pt(Q)) + '; these are the points where the line meets the circle.');
    } }
  ] });

  /* =============== CALCULUS =============== */
  BS.topic({ id: 'fm-calculus', name: 'Differentiation: tangents, normals, stationary points and optimisation', video: 'differentiation further maths stationary points', gens: from('differentiation').concat([
    { d: [1, 2], f: function () { // expand then differentiate
      var a = ri(1, 4), b = nz(-6, 6), c = ri(1, 3), d = nz(-6, 6);
      var e = [a * c, a * d + b * c, b * d];
      return q1('Given that ' + M('y = ' + br(a, b) + br(c, d)) + ', find ' + M('\\frac{\\mathrm{d}y}{\\mathrm{d}x}') + '.', 3, M('y = ' + poly(e) + ' \\Rightarrow \\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + poly([2 * e[0], e[1]])));
    } },
    { d: [2], f: function () { // divide then differentiate (negative powers)
      var a = ri(1, 5), b = nz(-6, 6), c = nz(-9, 9);
      return q1('Given that ' + M('y = \\frac{' + poly([a, b, 0, c]) + '}{x}') + ', find ' + M('\\frac{\\mathrm{d}y}{\\mathrm{d}x}') + '.', 3,
        M('y = ' + c1(a, 'x^2') + FM.tc(b, 'x') + (c < 0 ? ' - ' : ' + ') + c1(Math.abs(c), 'x^{-1}') + ' \\Rightarrow \\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + c1(2 * a, 'x') + sg(b) + (c < 0 ? ' + ' : ' - ') + '\\frac{' + Math.abs(c) + '}{x^2}'));
    } },
    { d: [2, 3], f: function () { // normal at a point
      var a = ri(1, 3), b = nz(-5, 5), c = ri(-5, 5), x0 = nz(-3, 3), y0 = a * x0 * x0 + b * x0 + c, m = 2 * a * x0 + b;
      while (m === 0) { x0 = nz(-3, 3); y0 = a * x0 * x0 + b * x0 + c; m = 2 * a * x0 + b; }
      return q1('Work out the equation of the normal to the curve ' + M('y = ' + poly([a, b, c])) + ' at the point where ' + M('x = ' + x0) + '. Give your answer in the form ' + M('ax + by + c = 0') + '.', 5,
        'Gradient of tangent ' + M('= ' + m) + ', gradient of normal ' + M('= ' + frac(-1, m)) + ', point ' + M(pt([x0, y0])) + ': ' + M(lineABC(1, m, -(x0 + m * y0))));
    } },
    { d: [2, 3], f: function () { // second derivative and nature
      var p = nz(-3, 2), q = p + ri(1, 4), k = pick([1, -1]), cf = [2 * k, -3 * k * (p + q), 6 * k * p * q, ri(-6, 6)];
      var f = function (x) { return cf[0] * x * x * x + cf[1] * x * x + cf[2] * x + cf[3]; }, d2 = function (x) { return 6 * cf[0] * x + 2 * cf[1]; };
      return { stem: 'A curve has equation ' + M('y = ' + poly(cf)) + '.', parts: [
        { q: 'Find ' + M('\\frac{\\mathrm{d}y}{\\mathrm{d}x}') + ' and ' + M('\\frac{\\mathrm{d}^2y}{\\mathrm{d}x^2}') + '.', m: 2, a: M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + poly([3 * cf[0], 2 * cf[1], cf[2]]) + ',\\ \\frac{\\mathrm{d}^2y}{\\mathrm{d}x^2} = ' + poly([6 * cf[0], 2 * cf[1]])) },
        { q: 'Find the coordinates of the stationary points and use the second derivative to determine their nature.', m: 5, a: M(pt([p, f(p)])) + ': ' + M('\\frac{\\mathrm{d}^2y}{\\mathrm{d}x^2} = ' + d2(p)) + ', ' + (d2(p) < 0 ? 'maximum' : 'minimum') + '; ' + M(pt([q, f(q)])) + ': ' + M('\\frac{\\mathrm{d}^2y}{\\mathrm{d}x^2} = ' + d2(q)) + ', ' + (d2(q) < 0 ? 'maximum' : 'minimum') }
      ] };
    } },
    { d: [2, 3], f: function () { // optimisation V = a/x + bx
      var r = ri(2, 6), b = ri(2, 9), a = b * r * r, minV = 2 * b * r;
      return q1(M('V = \\frac{' + a + '}{x} + ' + b + 'x') + ', for ' + M('x > 0') + '.<br>Use calculus to show that ' + M('V') + ' has a minimum value and work out this value.', 5,
        M('\\frac{\\mathrm{d}V}{\\mathrm{d}x} = -\\frac{' + a + '}{x^2} + ' + b + ' = 0 \\Rightarrow x = ' + r) + '; ' + M('\\frac{\\mathrm{d}^2V}{\\mathrm{d}x^2} = \\frac{' + 2 * a + '}{x^3} > 0') + ', so a minimum; ' + M('V = ' + minV));
    } },
    { d: [2], f: function () { // increasing / decreasing
      var a = ri(1, 3), p = ri(1, 4), cf = [a, 0, -3 * a * p * p, ri(-5, 5)];
      return { stem: M('y = ' + poly(cf)), parts: [
        { q: 'Find the range of values of ' + M('x') + ' for which ' + M('y') + ' is a decreasing function.', m: 3, a: M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = ' + poly([3 * a, 0, -3 * a * p * p]) + ' < 0 \\Rightarrow -' + p + ' < x < ' + p) },
        { q: 'Show that ' + M('y = x^3 + ' + ri(2, 6) + 'x') + ' is an increasing function for all values of ' + M('x') + '.', m: 2, a: M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 3x^2 + k') + ' with ' + M('k > 0') + ', and ' + M('3x^2 \\ge 0') + ', so the gradient is always positive.' }
      ] };
    } },
    { d: [2, 3], f: function () { // sketch interpretation with diagram
      var p = nz(-3, 0), q = p + ri(2, 4), k = pick([1, -1]), cf = [2 * k, -3 * k * (p + q), 6 * k * p * q, nz(-6, 6)];
      var f = function (x) { return cf[0] * x * x * x + cf[1] * x * x + cf[2] * x + cf[3]; };
      var ys = [f(p), f(q), f(p - 1.3), f(q + 1.3), 0], lo = Math.min.apply(null, ys), hi = Math.max.apply(null, ys);
      var pl = D.plane({ xmin: p - 1.5, xmax: q + 1.5, ymin: lo - 2, ymax: hi + 2, w: 300, h: 280 });
      var s = pl.svg + pl.curve(f, p - 1.5, q + 1.5) + D.dot(pl.X(p), pl.Y(f(p))) + D.dot(pl.X(q), pl.Y(f(q))) + D.text(pl.X(p), pl.Y(f(p)) + (k > 0 ? -10 : 16), 'A', { anchor: 'middle', cls: 'it' }) + D.text(pl.X(q), pl.Y(f(q)) + (k > 0 ? 16 : -10), 'B', { anchor: 'middle', cls: 'it' });
      return { stem: 'The sketch shows the curve ' + M('y = ' + poly(cf)) + '. ' + M('A') + ' and ' + M('B') + ' are stationary points.' + D.svg(300, 280, s, 'Cubic curve with stationary points', true), parts: [
        { q: 'Work out the coordinates of ' + M('A') + ' and ' + M('B') + '.', m: 4, a: M('A' + pt([p, f(p)]) + ',\\ B' + pt([q, f(q)])) },
        { q: 'Write down the values of ' + M('k') + ' for which ' + M(poly(cf) + ' = k') + ' has three solutions.', m: 2, a: M(Math.min(f(p), f(q)) + ' < k < ' + Math.max(f(p), f(q))) }
      ] };
    } }
  ]) });

  /* =============== MATRIX TRANSFORMATIONS =============== */
  var TRANS = [
    ['a rotation of 90° anticlockwise about the origin', [[0, -1], [1, 0]]], ['a rotation of 180° about the origin', [[-1, 0], [0, -1]]], ['a rotation of 90° clockwise about the origin', [[0, 1], [-1, 0]]],
    ['a reflection in the x-axis', [[1, 0], [0, -1]]], ['a reflection in the y-axis', [[-1, 0], [0, 1]]], ['a reflection in the line y = x', [[0, 1], [1, 0]]], ['a reflection in the line y = −x', [[0, -1], [-1, 0]]]
  ];
  function nameOf(A) { for (var i = 0; i < TRANS.length; i++) if (JSON.stringify(TRANS[i][1]) === JSON.stringify(A)) return TRANS[i][0]; if (A[0][1] === 0 && A[1][0] === 0 && A[0][0] === A[1][1]) return A[0][0] === 1 ? 'the identity (no change)' : 'an enlargement, scale factor ' + A[0][0] + ', centre the origin'; return null; }
  BS.topic({ id: 'fm-matrices', name: 'Matrices and matrix transformations', video: 'matrix transformations unit square further maths', gens: [
    { d: [1], f: function () {
      var A = [[nz(-4, 5), ri(-4, 5)], [ri(-4, 5), nz(-4, 5)]], B = [[ri(-4, 5), nz(-4, 5)], [nz(-4, 5), ri(-4, 5)]], v = [[ri(-5, 5)], [ri(-5, 5)]], k = ri(2, 4);
      return { stem: M('\\mathbf{A} = ' + mat(A)) + ', ' + M('\\mathbf{B} = ' + mat(B)) + ' and ' + M('\\mathbf{v} = ' + mat(v)) + '.', parts: [
        { q: 'Work out ' + M(k + '\\mathbf{A}') + '.', m: 1, a: M(mat(A.map(function (r) { return r.map(function (x) { return k * x; }); }))) },
        { q: 'Work out ' + M('\\mathbf{AB}') + '.', m: 2, a: M(mat(mm(A, B))) },
        { q: 'Work out ' + M('\\mathbf{Av}') + '.', m: 2, a: M(mat(mm(A, v))) }
      ] };
    } },
    { d: [2], f: function () { // identity / unknowns
      var a = ri(2, 5), b = ri(1, 4), c = ri(1, 4);
      var k = nz(-5, 5), A = [[a, b], [c, k]];
      var P = mm(A, A);
      return { stem: M('\\mathbf{M} = ' + mat([[a, b], [c, 'k']])) + ' and ' + M('\\mathbf{M}^2 = ' + mat(P)) + '.', parts: [
        { q: 'Work out the value of ' + M('k') + '.', m: 3, a: M(a + ' \\times ' + b + ' + ' + b + 'k = ' + P[0][1] + ' \\Rightarrow k = ' + k) },
        { q: 'Write down the 2 by 2 identity matrix, ' + M('\\mathbf{I}') + ', and state the value of ' + M('\\mathbf{MI}') + '.', m: 1, a: M('\\mathbf{I} = ' + mat([[1, 0], [0, 1]])) + ', ' + M('\\mathbf{MI} = \\mathbf{M}') }
      ] };
    } },
    { d: [1, 2], f: function () { // transformation of the unit square on a grid
      var t = pick(TRANS.concat([['an enlargement, scale factor 2, centre the origin', [[2, 0], [0, 2]]], ['an enlargement, scale factor 3, centre the origin', [[3, 0], [0, 3]]]]));
      var sq = [[0, 0], [1, 0], [1, 1], [0, 1]], img = sq.map(function (p) { return [t[1][0][0] * p[0] + t[1][0][1] * p[1], t[1][1][0] * p[0] + t[1][1][1] * p[1]]; });
      var fig = D.gridShapes([{ pts: sq, name: 'U' }, { pts: img, name: "U'", cls: 'image' }], -4, 4);
      return { stem: 'The unit square ' + M('U') + ' is transformed to ' + M("U'") + ' as shown.' + fig, parts: [
        { q: 'Describe fully the single transformation.', m: 2, a: t[0].charAt(0).toUpperCase() + t[0].slice(1) },
        { q: 'Write down the matrix that represents this transformation.', m: 2, a: M(mat(t[1])) }
      ] };
    } },
    { d: [2, 3], f: function () { // combined transformations
      var a = pick(TRANS), b = pick(TRANS); while (b === a) b = pick(TRANS);
      var C = mm(b[1], a[1]), nm = nameOf(C);
      return { stem: 'Transformation ' + M('P') + ' is ' + a[0] + '. Transformation ' + M('Q') + ' is ' + b[0] + '.', parts: [
        { q: 'Write down the matrix for ' + M('P') + ' and the matrix for ' + M('Q') + '.', m: 2, a: M('\\mathbf{P} = ' + mat(a[1]) + ',\\ \\mathbf{Q} = ' + mat(b[1])) },
        { q: 'Work out the matrix for transformation ' + M('P') + ' followed by transformation ' + M('Q') + '.', m: 2, a: M('\\mathbf{QP} = ' + mat(C)) },
        { q: 'Describe fully the single transformation represented by this matrix.', m: 2, a: nm ? nm.charAt(0).toUpperCase() + nm.slice(1) : 'See matrix' }
      ] };
    } },
    { d: [1, 2], f: function () { // image of a point / find original point
      var t = pick(TRANS), P = [nz(-5, 5), nz(-5, 5)], img = [t[1][0][0] * P[0] + t[1][0][1] * P[1], t[1][1][0] * P[0] + t[1][1][1] * P[1]], k = ri(2, 4);
      return { stem: 'The matrix ' + M(mat(t[1])) + ' represents ' + t[0] + '.', parts: [
        { q: 'Work out the image of the point ' + M(pt(P)) + ' under this transformation.', m: 2, a: M(pt(img)) },
        { q: 'The point ' + M('Q') + ' is mapped to ' + M(pt([k * P[1], -k * P[0]])) + ' by the enlargement ' + M(mat([[k, 0], [0, k]])) + '. Work out the coordinates of ' + M('Q') + '.', m: 1, a: M(pt([P[1], -P[0]])) }
      ] };
    } }
  ] });
  BS.topics['fm-matrices'].gens.forEach(function (gn) { var f0 = gn.f; gn.f = function (d) { for (var i = 0; i < 40; i++) { var q = f0(d); if (JSON.stringify(q).indexOf('See matrix') < 0) return q; } return f0(d); }; });

  /* =============== GEOMETRY AND TRIGONOMETRY =============== */
  var EX = { '30': ['\\tfrac{1}{2}', '\\tfrac{\\sqrt{3}}{2}', '\\tfrac{1}{\\sqrt{3}}'], '45': ['\\tfrac{1}{\\sqrt{2}}', '\\tfrac{1}{\\sqrt{2}}', '1'], '60': ['\\tfrac{\\sqrt{3}}{2}', '\\tfrac{1}{2}', '\\sqrt{3}'] };
  BS.topic({ id: 'fm-trig', name: 'Trigonometry: exact values, graphs, identities and equations', video: 'trig identities and equations further maths', gens: [
    { d: [1, 2], f: function () { // exact values
      var forms = [
        ['\\sin 30^\\circ + \\cos 60^\\circ', '1'], ['\\tan 45^\\circ + \\sin 30^\\circ', '\\tfrac{3}{2}'], ['\\sin 60^\\circ \\times \\cos 30^\\circ', '\\tfrac{3}{4}'], ['\\tan 60^\\circ \\times \\tan 30^\\circ', '1'],
        ['\\cos^2 45^\\circ + \\sin 30^\\circ', '1'], ['\\frac{\\sin 60^\\circ}{\\cos 60^\\circ}', '\\sqrt{3}'], ['2\\sin 45^\\circ \\cos 45^\\circ', '1'], ['\\sin^2 60^\\circ - \\cos^2 60^\\circ', '\\tfrac{1}{2}']];
      var a = pick(forms), b; do { b = pick(forms); } while (b === a);
      return { stem: 'Do not use a calculator in this question.', parts: [
        { q: 'Work out the exact value of ' + M(a[0]) + '.', m: 2, a: M(a[1]) },
        { q: 'Work out the exact value of ' + M(b[0]) + '.', m: 2, a: M(b[1]) }
      ] };
    } },
    { d: [1, 2], f: function () { // exact length from a triangle with diagram
      var th = pick([30, 45, 60]), h = 2 * ri(2, 8), opp = th === 30 ? h / 2 : th === 60 ? null : null;
      var P = { A: [0, 0], B: [h * Math.cos(rad(th)), 0], C: [h * Math.cos(rad(th)), h * Math.sin(rad(th))] };
      var fig = D.geo({ pts: P, polys: [['A', 'B', 'C']], slabels: [{ p: 'A', q: 'C', t: h + ' cm' }, { p: 'B', q: 'C', t: 'x cm' }], angles: [{ v: 'B', a: 'A', b: 'C', right: true }, { v: 'A', a: 'B', b: 'C', t: th + '°', d: 32 }], w: 280, h: 220, label: 'Right-angled triangle' });
      var ans = th === 30 ? String(h / 2) : th === 45 ? (h / 2) + '\\sqrt{2}' : (h / 2) + '\\sqrt{3}';
      return q1('Do not use a calculator.' + fig + 'Work out the exact value of ' + M('x') + '.', 2, M('x = ' + h + '\\sin ' + th + '^\\circ = ' + ans));
    } },
    { d: [2], f: function () { // solve sin/cos/tan = k on 0-360
      var fn = pick(['sin', 'cos', 'tan']), k = fn === 'tan' ? pick([2, 0.5, -1.5, 3]) : pick([0.3, 0.6, -0.4, 0.75, -0.8]);
      var base = fn === 'sin' ? Math.asin(k) : fn === 'cos' ? Math.acos(k) : Math.atan(k), b = base * 180 / Math.PI, sols;
      if (fn === 'sin') sols = [b, 180 - b]; else if (fn === 'cos') sols = [b, 360 - b]; else sols = [b, b + 180];
      sols = sols.map(function (x) { return ((x % 360) + 360) % 360; }).sort(function (x, y) { return x - y; });
      return q1('Solve ' + M('\\' + fn + ' x = ' + k) + ' for ' + M('0^\\circ \\le x \\le 360^\\circ') + '. Give your answers to 1 decimal place.', 3, M('x = ' + sols.map(function (x) { return dp(x, 1) + '^\\circ'; }).join(',\\ ')));
    } },
    { d: [2, 3], f: function () { // 2 sin x = cos x and sin^2 x = k
      var a = ri(2, 5), b = ri(1, 3); while (gcd(a, b) > 1) a = ri(2, 5); var t = b / a, b1 = Math.atan(t) * 180 / Math.PI;
      var s2 = pick([['\\tfrac{1}{4}', [30, 150, 210, 330]], ['\\tfrac{3}{4}', [60, 120, 240, 300]], ['\\tfrac{1}{2}', [45, 135, 225, 315]]]);
      return { stem: '', parts: [
        { q: 'Solve ' + M(c1(a, '\\sin x') + ' = ' + c1(b, '\\cos x')) + ' for ' + M('0^\\circ \\le x \\le 360^\\circ') + '. Give your answers to 1 decimal place.', m: 3, a: M('\\tan x = ' + frac(b, a) + ' \\Rightarrow x = ' + dp(b1, 1) + '^\\circ,\\ ' + dp(b1 + 180, 1) + '^\\circ') },
        { q: 'Solve ' + M('\\sin^2 x = ' + s2[0]) + ' for ' + M('0^\\circ \\le x \\le 360^\\circ') + '.', m: 3, a: M('x = ' + s2[1].map(function (x) { return x + '^\\circ'; }).join(',\\ ')) }
      ] };
    } },
    { d: [2, 3], f: function () { // identities
      var ids = [
        ['\\frac{1 - \\cos^2 x}{\\sin x} \\equiv \\sin x', '\\frac{\\sin^2 x}{\\sin x} = \\sin x'],
        ['\\tan x \\cos x \\equiv \\sin x', '\\frac{\\sin x}{\\cos x} \\times \\cos x = \\sin x'],
        ['(\\sin x + \\cos x)^2 \\equiv 1 + 2\\sin x\\cos x', '\\sin^2 x + 2\\sin x\\cos x + \\cos^2 x = 1 + 2\\sin x\\cos x'],
        ['\\frac{\\sin^2 x}{1 - \\sin^2 x} \\equiv \\tan^2 x', '\\frac{\\sin^2 x}{\\cos^2 x} = \\tan^2 x'],
        ['\\tan x + \\frac{1}{\\tan x} \\equiv \\frac{1}{\\sin x \\cos x}', '\\frac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x} = \\frac{1}{\\sin x\\cos x}'],
        ['(1 - \\sin x)(1 + \\sin x) \\equiv \\cos^2 x', '1 - \\sin^2 x = \\cos^2 x']];
      var a = pick(ids);
      return q1('Prove that ' + M(a[0]) + '.', 3, M(a[1]) + ', using ' + M('\\sin^2 x + \\cos^2 x = 1') + ' and ' + M('\\tan x = \\frac{\\sin x}{\\cos x}') + ' as needed.');
    } },
    { d: [2, 3], f: function () { // exact cos/tan from sin, angle obtuse
      var t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), obt = Math.random() < 0.5;
      return q1(M('\\sin \\theta = \\frac{' + t[0] + '}{' + t[2] + '}') + ' and ' + M('\\theta') + ' is ' + (obt ? 'obtuse' : 'acute') + '.<br>Work out the exact values of ' + M('\\cos \\theta') + ' and ' + M('\\tan \\theta') + '.', 3,
        M('\\cos \\theta = ' + (obt ? '-' : '') + '\\frac{' + t[1] + '}{' + t[2] + '},\\ \\tan \\theta = ' + (obt ? '-' : '') + '\\frac{' + t[0] + '}{' + t[1] + '}'));
    } },
    { d: [1, 2], f: function () { // graph of sin/cos with diagram
      var fn = pick(['sin', 'cos']), a0 = pick([20, 30, 40, 50, 70]), v = fn === 'sin' ? Math.sin(rad(a0)) : Math.cos(rad(a0));
      var other = fn === 'sin' ? 180 - a0 : 360 - a0, f = fn === 'sin' ? Math.sin : Math.cos;
      var pl = D.plane({ xmin: 0, xmax: 360, ymin: -1.4, ymax: 1.4, w: 340, h: 220, ticks: true, tstep: 90, tstepy: 1, xl: 'x', yl: 'y' });
      var s = pl.svg + pl.curve(function (x) { return f(rad(x)); }, 0, 360);
      return { stem: 'The diagram shows the graph of ' + M('y = \\' + fn + ' x') + ' for ' + M('0^\\circ \\le x \\le 360^\\circ') + '.' + D.svg(340, 220, s, 'Graph of y = ' + fn + ' x', true), parts: [
        { q: 'Write down the coordinates of the maximum point.', m: 1, a: M(fn === 'sin' ? '(90,\\ 1)' : '(0,\\ 1)\\text{ and }(360,\\ 1)') },
        { q: 'Given that ' + M('\\' + fn + ' ' + a0 + '^\\circ = ' + v.toFixed(3)) + ', write down another value of ' + M('x') + ' between ' + M('0^\\circ') + ' and ' + M('360^\\circ') + ' for which ' + M('\\' + fn + ' x = ' + v.toFixed(3)) + '.', m: 1, a: M(other + '^\\circ') },
        { q: 'Write down a value of ' + M('x') + ' for which ' + M('\\' + fn + ' x = -' + v.toFixed(3)) + '.', m: 1, a: M((fn === 'sin' ? 180 + a0 : 180 - a0) + '^\\circ') }
      ] };
    } }
  ] });

  BS.topic({ id: 'fm-geometry', name: 'Geometry: 3D trigonometry, sine and cosine rules, circle theorems', video: 'angle between two planes further maths', gens: from('sine-cosine').concat(from('pythagoras-trig', [9, 10])).concat(from('circle-theorems', [8, 9, 10, 12, 13, 14, 16, 17, 18, 19])).concat([
    { d: [2, 3], f: function () { // angle between two planes in a pyramid
      var s = 2 * ri(3, 8), h = ri(6, 18), ang = Math.atan(h / (s / 2)) * 180 / Math.PI, slant = Math.hypot(h, s / 2);
      return { stem: M('VABCD') + ' is a right pyramid with a square base of side ' + s + ' cm. The vertex ' + M('V') + ' is ' + h + ' cm vertically above the centre ' + M('M') + ' of the base.' + D.pyramid(s, h), parts: [
        { q: 'Work out the angle between the triangular face ' + M('VBC') + ' and the base ' + M('ABCD') + '.', m: 3, a: 'Let ' + M('N') + ' be the midpoint of ' + M('BC') + '; ' + M('MN = ' + s / 2) + ', ' + M('\\tan V\\hat{N}M = \\frac{' + h + '}{' + s / 2 + '} \\Rightarrow ' + dp(ang, 1) + '^\\circ') },
        { q: 'Work out the angle between the edge ' + M('VA') + ' and the base.', m: 3, a: M('AM = ' + (s / 2) + '\\sqrt{2}') + ', ' + M('\\tan = \\frac{' + h + '}{' + dp(s / 2 * Math.SQRT2, 3) + '} \\Rightarrow ' + dp(Math.atan(h / (s / 2 * Math.SQRT2)) * 180 / Math.PI, 1) + '^\\circ') }
      ] };
    } },
    { d: [2, 3], f: function () { // wedge (triangular prism): angle between planes
      var l = ri(8, 20), w = ri(4, 10), h = ri(3, 9), ang = Math.atan(h / w) * 180 / Math.PI, diag = Math.atan(h / Math.hypot(l, w)) * 180 / Math.PI;
      var A = [40, 190], B = [40 + 2 * l * 6 / Math.max(l, 10), 190], sc = 160 / Math.max(l, w + 6);
      var Bp = [40 + l * sc, 190], C = [Bp[0] + 50, 150], Dd = [90, 150], E = [90, 150 - h * sc * 0.9], F = [C[0], 150 - h * sc * 0.9];
      var s = D.line(A[0], A[1], Bp[0], Bp[1]) + D.line(Bp[0], Bp[1], C[0], C[1]) + D.line(C[0], C[1], Dd[0], Dd[1], 'dash') + D.line(Dd[0], Dd[1], A[0], A[1], 'dash') + D.line(Dd[0], Dd[1], E[0], E[1], 'dash') + D.line(C[0], C[1], F[0], F[1]) + D.line(E[0], E[1], F[0], F[1]) + D.line(A[0], A[1], E[0], E[1]) + D.line(Bp[0], Bp[1], F[0], F[1]);
      [[A, 'A', -12, 8], [Bp, 'B', 6, 12], [C, 'C', 12, 4], [Dd, 'D', -12, 0], [E, 'E', -10, -6], [F, 'F', 10, -6]].forEach(function (q) { s += D.text(q[0][0] + q[2], q[0][1] + q[3], q[1], { anchor: 'middle', cls: 'it' }); });
      s += D.text((A[0] + Bp[0]) / 2, 206, l + ' cm', { anchor: 'middle', size: 12 }) + D.text((Bp[0] + C[0]) / 2 + 18, (Bp[1] + C[1]) / 2 + 8, w + ' cm', { size: 12 }) + D.text(C[0] + 8, (C[1] + F[1]) / 2, h + ' cm', { size: 12 });
      return { stem: 'The diagram shows a wedge. The base ' + M('ABCD') + ' is a horizontal rectangle with ' + M('AB = ' + l) + ' cm and ' + M('BC = ' + w) + ' cm. ' + M('CDEF') + ' is a vertical rectangle with ' + M('CF = ' + h) + ' cm. ' + M('ABFE') + ' is a sloping rectangle.' + D.svg(300, 220, s, 'Wedge'), parts: [
        { q: 'Work out the angle between the plane ' + M('ABFE') + ' and the base ' + M('ABCD') + '.', m: 2, a: M('\\tan^{-1}\\left(\\frac{' + h + '}{' + w + '}\\right) = ' + dp(ang, 1) + '^\\circ') },
        { q: 'Work out the angle between the line ' + M('AF') + ' and the base ' + M('ABCD') + '.', m: 3, a: M('AC = \\sqrt{' + l + '^2 + ' + w + '^2}') + ', ' + M('\\tan^{-1}\\left(\\frac{' + h + '}{' + dp(Math.hypot(l, w), 3) + '}\\right) = ' + dp(diag, 1) + '^\\circ') }
      ] };
    } },
    { d: [1, 2], f: function () { // Pythagorean triples
      var t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), k = ri(2, 6);
      return q1('A triangle has sides ' + t[0] * k + ' cm, ' + t[1] * k + ' cm and ' + t[2] * k + ' cm.<br>Show that the triangle is right-angled, and work out its area.', 3,
        M('(' + t[0] * k + ')^2 + (' + t[1] * k + ')^2 = ' + (t[2] * k) * (t[2] * k) + ' = (' + t[2] * k + ')^2') + ' (a multiple of the ' + t.join('–') + ' triple); area ' + M('= \\tfrac{1}{2} \\times ' + t[0] * k + ' \\times ' + t[1] * k + ' = ' + t[0] * t[1] * k * k / 2) + ' cm²');
    } }
  ]) });
})(typeof window !== 'undefined' ? window : globalThis);
