/* Byte Size Classroom — more question types for IB Mathematics: Applications and Interpretation HL topics,
   so that Do Nows, exit tickets and worksheets on one topic are more varied. */
(function (g) {
  var BS = g.BS, D = BS.draw, IB = BS.ib;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, dp = BS.dp, num = BS.num, M = BS.m;
  var s3 = function (x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : IB.s3(x); }, vec = IB.vec, mat = IB.mat, table = IB.table;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: p[2] }; }) }; }
  function add(id, list) { var t = BS.topics[id]; if (!t) return; list.forEach(function (x) { t.gens.push({ d: x[0], f: x[1] }); }); }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function tc(c, v) { return c === 0 ? '' : (c < 0 ? ' - ' : ' + ') + (Math.abs(c) === 1 && v ? '' : Math.abs(c)) + v; }
  function lin(cs, vs) { var o = ''; cs.forEach(function (c, i) { if (!c) return; o += o ? tc(c, vs[i]) : (vs[i] ? c1(c, vs[i]) : String(c)); }); return o || '0'; }
  function vv(a) { return vec(a.map(String)); }
  function cx(a, b) { return (a ? a : '') + (b ? (a ? (b < 0 ? ' - ' : ' + ') : (b < 0 ? '-' : '')) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'i' : (a ? '' : '0')); }
  function dot(a, b) { return a.reduce(function (s, v, i) { return s + v * b[i]; }, 0); }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function norm(a) { return Math.sqrt(dot(a, a)); }
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } var k = gcd(Math.abs(n), d) || 1; return frac(n / k, d / k); }

  add('ib-complex', [
    [[1, 2], function () {
      var a = nz(-6, 6), b = nz(-6, 6), c = nz(-5, 5), d = nz(-5, 5), den = c * c + d * d, re = a * c + b * d, im = b * c - a * d;
      return Q(M('z = ' + cx(a, b)) + ' and ' + M('w = ' + cx(c, d)) + '.', [
        ['Find ' + M('\\frac{z}{w}') + ' in the form ' + M('x + iy') + '.', 3, 'Multiply by ' + M('w^{*}') + ': ' + M(im === 0 ? fr(re, den) : re === 0 ? fr(im, den) + 'i' : fr(re, den) + (im < 0 ? ' - ' : ' + ') + fr(Math.abs(im), den) + 'i')],
        ['Find ' + M('|z|') + ' and ' + M('|w|') + ', and hence write down ' + M('\\left|\\frac{z}{w}\\right|') + '.', 2, M('|z| = ' + s3(Math.hypot(a, b)) + ',\\ |w| = ' + s3(Math.hypot(c, d))) + '; ' + M('\\left|\\frac{z}{w}\\right| = ' + s3(Math.hypot(a, b) / Math.hypot(c, d)))]
      ]);
    }],
    [[2], function () {
      var r = ri(2, 6), k = pick([1, 2, 3, 4, 5]), th = k * Math.PI / 6, a = r * Math.cos(th), b = r * Math.sin(th), n = ri(2, 4), R = Math.pow(r, n), T = n * th;
      while (T > Math.PI) T -= 2 * Math.PI;
      return Q('The complex number ' + M('z = ' + r + 'e^{' + IB.pif(k, 6) + 'i}') + '.', [
        ['Write ' + M('z') + ' in Cartesian form ' + M('a + bi') + ', giving exact values or values to 3 s.f.', 2, M(s3(a) + (b < 0 ? ' - ' : ' + ') + s3(Math.abs(b)) + 'i')],
        ['Find ' + M('z^{' + n + '}') + ' in the form ' + M('re^{i\\theta}') + ' with ' + M('-\\pi < \\theta \\le \\pi') + '.', 3, M(R + 'e^{' + (Math.abs(T) < 1e-9 ? '0' : IB.pif(Math.round(T / Math.PI * 6), 6)) + 'i}')]
      ]);
    }],
    [[2, 3], function () {
      var w = ri(10, 50), A1 = ri(2, 8), A2 = ri(2, 8), p1 = pick([20, 30, 45, 60]), p2 = pick([90, 120, 135, 150]);
      var re = A1 * Math.cos(p1 * Math.PI / 180) + A2 * Math.cos(p2 * Math.PI / 180), im = A1 * Math.sin(p1 * Math.PI / 180) + A2 * Math.sin(p2 * Math.PI / 180);
      return Q('Two currents in a circuit are modelled by ' + M('I_1 = ' + A1 + '\\cos(' + w + 't + ' + p1 + '^\\circ)') + ' and ' + M('I_2 = ' + A2 + '\\cos(' + w + 't + ' + p2 + '^\\circ)') + '.', [
        ['Write each current as the real part of a complex number of the form ' + M('Ae^{i\\varphi}e^{i' + w + 't}') + '.', 2, M(A1 + 'e^{i' + p1 + '^\\circ}') + ' and ' + M(A2 + 'e^{i' + p2 + '^\\circ}') + ' (times ' + M('e^{i' + w + 't}') + ')'],
        ['Hence find the amplitude and phase of the total current ' + M('I_1 + I_2') + '.', 4, 'Add: ' + M(s3(re) + (im < 0 ? ' - ' : ' + ') + s3(Math.abs(im)) + 'i') + '; amplitude ' + M(s3(Math.hypot(re, im))) + ', phase ' + M(s3(Math.atan2(im, re) * 180 / Math.PI) + '^\\circ')]
      ]);
    }]
  ]);

  add('ib-matrices', [
    [[1, 2], function () {
      var A = [[ri(1, 5), ri(-3, 4)], [ri(-3, 4), ri(1, 5)]], B = [[ri(-3, 4), ri(1, 5)], [ri(1, 5), ri(-3, 4)]], k = nz(-3, 3);
      var AB = IB.mm(A, B), BA = IB.mm(B, A);
      return Q(M('\\mathbf{A} = ' + mat(A)) + ' and ' + M('\\mathbf{B} = ' + mat(B)) + '.', [
        ['Find ' + M('\\mathbf{AB}') + ' and ' + M('\\mathbf{BA}') + '.', 3, M('\\mathbf{AB} = ' + mat(AB) + ',\\ \\mathbf{BA} = ' + mat(BA))],
        ['Find ' + M(c1(k, '\\mathbf{A}') + ' - \\mathbf{B}') + '.', 2, M(mat(A.map(function (r, i) { return r.map(function (v, j) { return k * v - B[i][j]; }); })))],
        ['Comment on your answers to the first part.', 1, JSON.stringify(AB) === JSON.stringify(BA) ? 'Here they are equal, but matrix multiplication is not commutative in general.' : 'They are different: matrix multiplication is not commutative.']
      ]);
    }],
    [[2], function () {
      var x = ri(2, 9) * 10, y = ri(2, 9) * 10, z = ri(2, 9) * 10, pa, pb, pc, A;
      do { pa = [ri(3, 8), ri(2, 6), ri(4, 9)]; pb = [ri(2, 7), ri(4, 9), ri(2, 6)]; pc = [ri(5, 9), ri(1, 4), ri(3, 7)]; A = [pa, pb, pc]; }
      while (pa[0] * (pb[1] * pc[2] - pb[2] * pc[1]) - pa[1] * (pb[0] * pc[2] - pb[2] * pc[0]) + pa[2] * (pb[0] * pc[1] - pb[1] * pc[0]) === 0);
      A = [pa, pb, pc], v = [x, y, z], R = A.map(function (r) { return dot(r, v); });
      return Q('A café sells three meals. Each meal uses a number of units of bread, cheese and salad, shown in the matrix ' + M('\\mathbf{A} = ' + mat(A)) + ' (rows: bread, cheese, salad; columns: meals 1, 2, 3). One day the café uses ' + R.join(', ') + ' units of bread, cheese and salad respectively.', [
        ['Write this information as a matrix equation.', 2, M(mat(A) + vec(['p', 'q', 'r']) + ' = ' + vv(R))],
        ['Use technology to find how many of each meal were sold.', 3, M('\\mathbf{A}^{-1}' + vv(R) + ' = ' + vv(v)) + ': ' + x + ', ' + y + ', ' + z]
      ]);
    }],
    [[2, 3], function () {
      var a = nz(-4, 5), d = nz(-4, 5), b, c; do { b = nz(-4, 4); c = nz(-4, 4); } while (a * d - b * c === 0);
      var det = a * d - b * c, A = [[a, b], [c, d]], P = [ri(-5, 5), ri(-5, 5)], Y = [a * P[0] + b * P[1], c * P[0] + d * P[1]];
      return Q('The point ' + M('P') + ' is mapped to ' + M('P\'' + '(' + Y.join(',\\ ') + ')') + ' by the matrix ' + M('\\mathbf{A} = ' + mat(A)) + '.', [
        ['Find ' + M('\\mathbf{A}^{-1}') + '.', 2, M(frac(1, det) + mat([[d, -b], [-c, a]]))],
        ['Hence find the coordinates of ' + M('P') + '.', 2, M('(' + P.join(',\\ ') + ')')],
        ['A shape has area 6 units². Find the area of its image under ' + M('\\mathbf{A}') + '.', 1, M('6 \\times |' + det + '| = ' + 6 * Math.abs(det))]
      ]);
    }]
  ]);

  function eigNice() {
    for (var t = 0; t < 500; t++) {
      var l1 = nz(-4, 6), l2 = nz(-4, 6), p = nz(-3, 3), q = nz(-3, 3), d = q - p; if (l1 === l2 || !d) continue;
      var A = [[(l1 * q - l2 * p) / d, (l2 - l1) / d], [p * q * (l1 - l2) / d, (q * l2 - p * l1) / d]];
      if (A.every(function (r) { return r.every(function (v) { return Number.isInteger(v) && Math.abs(v) <= 12; }); })) return { A: A, l1: l1, l2: l2, p: p, q: q };
    }
    return { A: [[4, 1], [2, 3]], l1: 5, l2: 2, p: 1, q: -2 };
  }
  add('ib-eigen', [
    [[1, 2], function () {
      var E = eigNice(), A = E.A, tr = A[0][0] + A[1][1], dt = A[0][0] * A[1][1] - A[0][1] * A[1][0];
      return Q(M('\\mathbf{M} = ' + mat(A)) + '.', [
        ['Show that ' + M(vv([1, E.p])) + ' is an eigenvector of ' + M('\\mathbf{M}') + ' and state its eigenvalue.', 2, M('\\mathbf{M}' + vv([1, E.p]) + ' = ' + vv([E.l1, E.l1 * E.p]) + ' = ' + E.l1 + vv([1, E.p])) + '; eigenvalue ' + E.l1],
        ['Without solving the characteristic equation, use the trace or determinant to find the other eigenvalue.', 2, 'Trace ' + tr + ' (or det ' + dt + '): ' + M('\\lambda_2 = ' + E.l2)]
      ]);
    }],
    [[2], function () {
      var E = eigNice(), A = E.A, n = ri(3, 6);
      return Q(M('\\mathbf{M} = ' + mat(A)) + ' has eigenvalues ' + E.l1 + ' and ' + E.l2 + '.', [
        ['Find an eigenvector for each eigenvalue.', 4, M(vv([1, E.p])) + ' and ' + M(vv([1, E.q]))],
        ['Write down matrices ' + M('\\mathbf{P}') + ' and ' + M('\\mathbf{D}') + ' such that ' + M('\\mathbf{M} = \\mathbf{PDP}^{-1}') + '.', 2, M('\\mathbf{P} = ' + mat([[1, 1], [E.p, E.q]]) + ',\\ \\mathbf{D} = ' + mat([[E.l1, 0], [0, E.l2]]))],
        ['Hence find ' + M('\\mathbf{M}^{' + n + '}') + '.', 2, M(mat(IB.mpow(A, n)))]
      ]);
    }],
    [[2, 3], function () {
      var a = ri(1, 4) / 10, b = ri(1, 4) / 10, T = [[1 - a, b], [a, 1 - b]];
      return Q('A transition matrix is ' + M('\\mathbf{T} = ' + mat(T.map(function (r) { return r.map(function (v) { return dp(v, 1); }); }))) + '.', [
        ['Show that ' + M('\\lambda = 1') + ' is an eigenvalue of ' + M('\\mathbf{T}') + ' and find the other eigenvalue.', 3, M('\\det(\\mathbf{T} - \\mathbf{I}) = 0') + '; trace ' + dp(2 - a - b, 1) + ', so ' + M('\\lambda_2 = ' + dp(1 - a - b, 1))],
        ['Find the eigenvector for ' + M('\\lambda = 1') + ' whose entries sum to 1, and explain its meaning.', 3, M(vec([s3(b / (a + b)), s3(a / (a + b))])) + ': the long-term (steady-state) probabilities']
      ]);
    }]
  ]);

  add('ib-logistic', [
    [[1, 2], function () {
      var L = ri(4, 20) * 100, C = ri(4, 20), k = ri(2, 9) / 10, t = ri(2, 8), N0 = L / (1 + C), Nt = L / (1 + C * Math.exp(-k * t));
      return Q('The number of users of an app ' + M('t') + ' months after launch is modelled by ' + M('N(t) = \\frac{' + L + '}{1 + ' + C + 'e^{-' + k + 't}}') + '.', [
        ['Find the number of users at launch.', 1, M(num(Math.round(N0)))],
        ['Find the number of users after ' + t + ' months.', 1, M(num(Math.round(Nt)))],
        ['Write down the long-term number of users predicted by the model, and explain how you know.', 2, M(L) + ': as ' + M('t \\to \\infty') + ', ' + M('e^{-' + k + 't} \\to 0')],
        ['Find when the number of users reaches ' + Math.round(0.8 * L) + '.', 2, M('t = ' + s3(Math.log(4 * C) / k)) + ' months']
      ]);
    }],
    [[2], function () {
      var a = ri(10, 40), b = ri(5, 25), x1 = ri(2, 4), x2 = ri(8, 15);
      return Q('The sound level ' + M('S') + ' (in dB) at a distance from a speaker is modelled by ' + M('S = ' + (a + 60) + ' - ' + b + '\\ln x') + ', where ' + M('x') + ' is the distance in metres, ' + M('x \\ge 1') + '.', [
        ['Find the sound level at ' + x1 + ' m and at ' + x2 + ' m.', 2, s3(a + 60 - b * Math.log(x1)) + ' dB and ' + s3(a + 60 - b * Math.log(x2)) + ' dB'],
        ['Find the distance at which the sound level is ' + (a + 30) + ' dB.', 2, M('x = e^{30/' + b + '} = ' + s3(Math.exp(30 / b))) + ' m'],
        ['Show that doubling the distance always lowers the level by the same amount, and find it.', 2, M(b + '\\ln(2x) = ' + b + '\\ln x + ' + b + '\\ln 2') + ': a drop of ' + s3(b * Math.log(2)) + ' dB']
      ]);
    }],
    [[2, 3], function () {
      var L = ri(5, 15) * 100, N0 = ri(2, 8) * 10, C = L / N0 - 1, k = ri(3, 8) / 10;
      return Q('A rumour spreads through a school of ' + L + ' students. The number who have heard it after ' + M('t') + ' days is modelled by ' + M('N(t) = \\frac{' + L + '}{1 + Ce^{-' + k + 't}}') + '. Initially ' + N0 + ' students have heard it.', [
        ['Find the value of ' + M('C') + '.', 2, M('C = \\frac{' + L + '}{' + N0 + '} - 1 = ' + s3(C))],
        ['Find the time at which the rumour is spreading fastest, and the number who have heard it then.', 3, 'When ' + M('N = ' + L / 2) + ': ' + M('t = \\frac{\\ln C}{' + k + '} = ' + s3(Math.log(C) / k)) + ' days'],
        ['Give one reason why a logistic model is more suitable than an exponential model here.', 1, 'The number cannot exceed the ' + L + ' students; growth slows as fewer people are left to hear it.']
      ]);
    }]
  ]);

  add('ib-transform', [
    [[1, 2], function () {
      var x = ri(-4, 4), y = ri(-4, 4), a = pick([2, 3, -1, -2]), h = nz(-4, 4), k = nz(-4, 4);
      return Q('The point ' + M('P(' + x + ',\\ ' + y + ')') + ' lies on the graph of ' + M('y = f(x)') + '.', [
        ['Find the image of ' + M('P') + ' on ' + M('y = ' + c1(a, 'f(x)') + sg(k)) + '.', 2, M('(' + x + ',\\ ' + (a * y + k) + ')')],
        ['Find the image of ' + M('P') + ' on ' + M('y = f(x' + sg(-h) + ')') + '.', 1, M('(' + (x + h) + ',\\ ' + y + ')')],
        ['Find the image of ' + M('P') + ' on ' + M('y = f(-x)') + '.', 1, M('(' + (-x) + ',\\ ' + y + ')')]
      ]);
    }],
    [[2], function () {
      var a = pick([2, 3, 0.5]), b = pick([2, 3, 0.5]), h = nz(-4, 4), k = nz(-5, 5);
      var desc = 'a vertical stretch with scale factor ' + num(a) + ', a horizontal stretch with scale factor ' + (b === 0.5 ? '2' : M(frac(1, b))) + ', then a translation by ' + M(vv([h, k]));
      return Q('The graph of ' + M('y = f(x)') + ' is transformed by ' + desc + '.', [
        ['Write down the equation of the transformed graph in terms of ' + M('f') + '.', 3, M('y = ' + num(a) + 'f\\left(' + num(b) + '(x' + sg(-h) + ')\\right)' + sg(k))],
        ['The graph of ' + M('y = f(x)') + ' has a maximum at ' + M('(2,\\ 6)') + '. Find the maximum on the transformed graph.', 2, M('(' + s3(2 / b + h) + ',\\ ' + s3(6 * a + k) + ')')]
      ]);
    }],
    [[2, 3], function () {
      var A = ri(2, 5), B = pick([2, 3, 4]), C = pick([30, 45, 60, 90]), Dd = ri(-3, 3);
      return Q('The graph of ' + M('y = \\sin x') + ' (in degrees) is transformed to the graph of ' + M('y = ' + A + '\\sin(' + B + '(x - ' + C + '))' + (Dd ? sg(Dd) : '')) + '.', [
        ['Describe fully the transformations, in order.', 4, 'Translate ' + C + '° right; horizontal stretch scale factor ' + M(frac(1, B)) + ' (about the ' + M('y') + '-axis); vertical stretch scale factor ' + A + (Dd ? '; translate ' + Math.abs(Dd) + (Dd > 0 ? ' up' : ' down') : '') + '. (Other correct orders accepted.)'],
        ['Write down the period, amplitude and range of the new graph.', 3, 'Period ' + 360 / B + '°, amplitude ' + A + ', range ' + M((Dd - A) + ' \\le y \\le ' + (Dd + A))]
      ]);
    }]
  ]);

  add('ib-linearise', [
    [[1, 2], function () {
      var m = ri(2, 9) / 10, c = ri(5, 30) / 10;
      return Q('A data set is modelled by ' + M('y = ax^n') + '. A graph of ' + M('\\ln y') + ' against ' + M('\\ln x') + ' is a straight line with gradient ' + m + ' and intercept ' + c + '.', [
        ['Find the values of ' + M('a') + ' and ' + M('n') + '.', 3, M('n = ' + m + ',\\ a = e^{' + c + '} = ' + s3(Math.exp(c)))],
        ['Estimate ' + M('y') + ' when ' + M('x = 10') + '.', 1, M(s3(Math.exp(c) * Math.pow(10, m)))]
      ]);
    }],
    [[2], function () {
      var a = ri(2, 9), b = pick([1.5, 2, 1.2, 0.8, 0.5]), xs = [1, 2, 3, 4, 5], ys = xs.map(function (x) { return Math.round(a * Math.pow(b, x) * 100) / 100; });
      return Q('The table shows values of ' + M('x') + ' and ' + M('y') + '.' + table(['\\(x\\)'].concat(xs), [['\\(y\\)'].concat(ys)]), [
        ['Calculate ' + M('\\ln y') + ' for each value, and describe the relationship between ' + M('\\ln y') + ' and ' + M('x') + '.', 2, ys.map(function (v) { return s3(Math.log(v)); }).join(', ') + ': linear (constant differences of ' + s3(Math.log(b)) + ')'],
        ['Hence find a model of the form ' + M('y = ab^x') + '.', 3, M('y = ' + a + ' \\times ' + b + '^x') + ' (approximately)']
      ]);
    }],
    [[2, 3], function () {
      var k = ri(2, 6), n = pick([-1, -2, 0.5, 1.5]);
      return Q('Data that follow ' + M('y = kx^{n}') + ' are plotted as ' + M('\\log_{10} y') + ' against ' + M('\\log_{10} x') + '.', [
        ['Show that the graph is a straight line, stating its gradient and ' + M('y') + '-intercept in terms of ' + M('k') + ' and ' + M('n') + '.', 2, M('\\log y = n\\log x + \\log k') + ': gradient ' + M('n') + ', intercept ' + M('\\log k')],
        ['The line passes through ' + M('(0,\\ ' + s3(Math.log10(k)) + ')') + ' and ' + M('(1,\\ ' + s3(Math.log10(k) + n) + ')') + '. Find ' + M('k') + ' and ' + M('n') + '.', 3, M('n = ' + num(n) + ',\\ k = 10^{' + s3(Math.log10(k)) + '} \\approx ' + k)]
      ]);
    }]
  ]);

  add('ib-radians', [
    [[1, 2], function () {
      var deg = pick([30, 40, 45, 60, 72, 75, 120, 135, 150, 210, 240, 300]), r = ri(4, 15), th = deg * Math.PI / 180;
      return Q('A sector has radius ' + r + ' cm and angle ' + deg + '°.', [
        ['Convert ' + deg + '° to radians, as an exact multiple of ' + M('\\pi') + '.', 1, M(IB.pif(deg, 180))],
        ['Find the arc length and the area of the sector.', 3, M(s3(r * th)) + ' cm; ' + M(s3(0.5 * r * r * th)) + ' cm²']
      ]);
    }],
    [[2], function () {
      var r = ri(5, 15), th = ri(5, 25) / 10, seg = 0.5 * r * r * (th - Math.sin(th));
      return Q('A chord ' + M('AB') + ' of a circle with centre ' + M('O') + ' and radius ' + r + ' cm subtends an angle of ' + th + ' radians at ' + M('O') + '.', [
        ['Find the area of triangle ' + M('AOB') + '.', 2, M('\\frac{1}{2}(' + r + ')^2\\sin ' + th + ' = ' + s3(0.5 * r * r * Math.sin(th))) + ' cm²'],
        ['Find the area of the minor segment.', 2, M(s3(seg)) + ' cm²'],
        ['Find the perimeter of the minor segment.', 2, M(s3(r * th + 2 * r * Math.sin(th / 2))) + ' cm']
      ]);
    }],
    [[2, 3], function () {
      var w = ri(10, 40), r = ri(20, 60) / 100;
      return Q('A wheel of radius ' + num(r) + ' m turns at ' + w + ' revolutions per minute.', [
        ['Find the angle turned through in one second, in radians.', 2, M('\\frac{' + w + ' \\times 2\\pi}{60} = ' + s3(w * 2 * Math.PI / 60))],
        ['Find the distance travelled by a point on the rim in one minute.', 2, M(s3(w * 2 * Math.PI * r)) + ' m']
      ]);
    }]
  ]);

  add('ib-trig-eq', [
    [[1, 2], function () {
      var k = pick([['\\frac{1}{2}', 0.5], ['-\\frac{1}{2}', -0.5], ['\\frac{\\sqrt{3}}{2}', Math.sqrt(3) / 2], ['\\frac{\\sqrt{2}}{2}', Math.SQRT1_2]]), f = pick(['sin', 'cos']);
      var x1 = f === 'sin' ? Math.asin(k[1]) : Math.acos(k[1]), sols = (f === 'sin' ? [x1, Math.PI - x1] : [x1, 2 * Math.PI - x1]).map(function (x) { return (x + 2 * Math.PI) % (2 * Math.PI); }).sort(function (a, b) { return a - b; });
      return Q('', [['Solve ' + M('\\' + f + ' x = ' + k[0]) + ' for ' + M('0 \\le x \\le 2\\pi') + ', giving exact answers.', 3, sols.map(function (x) { return M(IB.pif(Math.round(x / Math.PI * 12), 12)); }).join(', ')]]);
    }],
    [[2], function () {
      var k = pick([2, 3, 4]), c = ri(1, 9) / 10, base = Math.asin(c), sols = [];
      for (var n = 0; n < 2 * k; n++) { [base, Math.PI - base].forEach(function (v) { var x = (v + 2 * Math.PI * n) / k; if (x <= 2 * Math.PI + 1e-9 && sols.every(function (s) { return Math.abs(s - x) > 1e-6; })) sols.push(x); }); }
      sols.sort(function (a, b) { return a - b; });
      return Q('', [['Solve ' + M('\\sin(' + k + 'x) = ' + c) + ' for ' + M('0 \\le x \\le 2\\pi') + ', giving answers to 3 significant figures.', 4, sols.length + ' solutions: ' + sols.map(s3).join(', ')]]);
    }],
    [[2, 3], function () {
      var a = ri(2, 5);
      return Q('', [
        ['Show that the equation ' + M(a + '\\cos^2 x + \\sin x = ' + a) + ' can be written as ' + M('\\sin x(' + a + '\\sin x - 1) = 0') + '.', 2, 'Use ' + M('\\cos^2 x = 1 - \\sin^2 x') + ': ' + M(a + ' - ' + a + '\\sin^2 x + \\sin x = ' + a)],
        ['Hence solve the equation for ' + M('0 \\le x \\le 2\\pi') + '.', 3, M('\\sin x = 0') + ': ' + M('0,\\ \\pi,\\ 2\\pi') + '; ' + M('\\sin x = ' + frac(1, a)) + ': ' + M(s3(Math.asin(1 / a)) + ',\\ ' + s3(Math.PI - Math.asin(1 / a)))]
      ]);
    }]
  ]);

  add('ib-mat-transform', [
    [[1, 2], function () {
      var k = ri(2, 4), m = pick([['an enlargement, scale factor ' + k + ', centre the origin', [[k, 0], [0, k]]], ['a reflection in the line \\(y = x\\)', [[0, 1], [1, 0]]], ['a rotation of 90° anticlockwise about the origin', [[0, -1], [1, 0]]], ['a stretch parallel to the \\(x\\)-axis, scale factor ' + k, [[k, 0], [0, 1]]], ['a reflection in the \\(y\\)-axis', [[-1, 0], [0, 1]]]]);
      return Q('', [
        ['Write down the matrix for ' + m[0] + '.', 1, M(mat(m[1]))],
        ['Find the image of the point ' + M('(3,\\ -2)') + '.', 1, M('(' + (3 * m[1][0][0] - 2 * m[1][0][1]) + ',\\ ' + (3 * m[1][1][0] - 2 * m[1][1][1]) + ')')],
        ['State the area scale factor, giving a reason.', 1, Math.abs(m[1][0][0] * m[1][1][1] - m[1][0][1] * m[1][1][0]) + ', the absolute value of the determinant']
      ]);
    }],
    [[2], function () {
      var a = ri(1, 4), b = ri(-3, 3), c = ri(-3, 3), d = ri(1, 4); if (a * d - b * c === 0) d++;
      var T = [[a, b], [c, d]], U = [1, 0], V = [0, 1];
      return Q('The transformation ' + M('T') + ' maps ' + M('(1,\\ 0)') + ' to ' + M('(' + a + ',\\ ' + c + ')') + ' and ' + M('(0,\\ 1)') + ' to ' + M('(' + b + ',\\ ' + d + ')') + '.', [
        ['Write down the matrix of ' + M('T') + '.', 1, M(mat(T))],
        ['The unit square is transformed by ' + M('T') + '. Find the area of its image.', 2, M('|' + (a * d - b * c) + '| = ' + Math.abs(a * d - b * c))],
        ['Explain what the sign of the determinant tells you about the transformation.', 1, (a * d - b * c) > 0 ? 'Positive: orientation is preserved.' : 'Negative: orientation is reversed (it includes a reflection).']
      ]);
    }],
    [[2, 3], function () {
      var th = pick([30, 45, 60, 120, 135]), r = th * Math.PI / 180, c = Math.cos(r), s = Math.sin(r), P = [ri(1, 5), ri(-4, 4)];
      return Q('', [
        ['Write down the matrix for an anticlockwise rotation of ' + th + '° about the origin, giving values to 3 s.f.', 1, M(mat([[s3(c), s3(-s)], [s3(s), s3(c)]]))],
        ['Find the image of ' + M('(' + P.join(',\\ ') + ')') + ' under this rotation.', 2, M('(' + s3(c * P[0] - s * P[1]) + ',\\ ' + s3(s * P[0] + c * P[1]) + ')')],
        ['Find the smallest positive number of times this rotation must be applied to return every point to its starting position.', 2, (360 / gcd(360, th)) + ' times']
      ]);
    }]
  ]);

  add('ib-vectors', [
    [[1, 2], function () {
      var A = [ri(-4, 4), ri(-4, 4), ri(-4, 4)], B = [ri(-4, 6), ri(-4, 6), ri(-4, 6)], AB = B.map(function (v, i) { return v - A[i]; }), Mp = A.map(function (v, i) { return (v + B[i]) / 2; });
      return Q('The points ' + M('A(' + A.join(',\\ ') + ')') + ' and ' + M('B(' + B.join(',\\ ') + ')') + ' are given.', [
        ['Find ' + M('\\overrightarrow{AB}') + ' and ' + M('|\\overrightarrow{AB}|') + '.', 3, M(vv(AB)) + ', ' + M(s3(norm(AB)))],
        ['Find the coordinates of the midpoint of ' + M('AB') + '.', 1, M('(' + Mp.map(num).join(',\\ ') + ')')],
        ['Find a unit vector in the direction of ' + M('\\overrightarrow{AB}') + '.', 1, M('\\frac{1}{' + s3(norm(AB)) + '}' + vv(AB))]
      ]);
    }],
    [[2], function () {
      var a = [ri(-3, 3), ri(-3, 3), ri(-3, 3)], b = [nz(-3, 3), nz(-3, 3), nz(-3, 3)], t1 = nz(-3, 3), P = a.map(function (v, i) { return v + t1 * b[i]; }), Qp = P.slice(); Qp[2] += nz(-2, 2);
      return Q('The line ' + M('L') + ' has equation ' + M('\\mathbf{r} = ' + vv(a) + ' + t' + vv(b)) + '.', [
        ['Show that the point ' + M('P(' + P.join(',\\ ') + ')') + ' lies on ' + M('L') + '.', 2, M('t = ' + t1) + ' gives ' + M('P')],
        ['Determine whether ' + M('Q(' + Qp.join(',\\ ') + ')') + ' lies on ' + M('L') + '.', 2, 'The ' + M('x') + ' and ' + M('y') + ' components need ' + M('t = ' + t1) + ', but then ' + M('z = ' + P[2] + ' \\ne ' + Qp[2]) + ': no']
      ]);
    }],
    [[2, 3], function () {
      var d1 = [nz(-3, 3), nz(-3, 3), ri(-3, 3)], d2; do { d2 = [nz(-3, 3), ri(-3, 3), nz(-3, 3)]; } while (d1[1] * d2[2] === d1[2] * d2[1] && d1[0] * d2[2] === d1[2] * d2[0] && d1[0] * d2[1] === d1[1] * d2[0]); var cs = Math.min(1, Math.abs(dot(d1, d2)) / (norm(d1) * norm(d2)));
      return Q('Two lines have direction vectors ' + M(vv(d1)) + ' and ' + M(vv(d2)) + '.', [
        ['Find the acute angle between the lines.', 3, M('\\cos\\theta = \\frac{|' + dot(d1, d2) + '|}{\\sqrt{' + dot(d1, d1) + '}\\sqrt{' + dot(d2, d2) + '}}') + ', ' + M(s3(Math.acos(cs) * 180 / Math.PI) + '^\\circ')],
        ['State, with a reason, whether the lines are perpendicular.', 1, dot(d1, d2) === 0 ? 'Yes: the scalar product is 0.' : 'No: the scalar product is ' + dot(d1, d2) + ', not 0.']
      ]);
    }]
  ]);

  add('ib-vec-kinematics', [
    [[1, 2], function () {
      var p = [ri(-5, 5), ri(-5, 5)], v = [nz(-6, 6), nz(-6, 6)], t = ri(2, 5);
      return Q('A drone has position ' + M('\\mathbf{r} = ' + vv(p) + ' + t' + vv(v)) + ' m after ' + M('t') + ' seconds.', [
        ['Find the speed of the drone.', 2, M(s3(norm(v))) + ' m s⁻¹'],
        ['Find its position after ' + t + ' seconds and its distance from the starting point.', 2, M(vv([p[0] + t * v[0], p[1] + t * v[1]])) + '; ' + M(s3(t * norm(v))) + ' m'],
        ['Find the bearing on which the drone is travelling.', 2, s3(((Math.atan2(v[0], v[1]) * 180 / Math.PI) + 360) % 360) + '° (taking ' + M(vv([0, 1])) + ' as north)']
      ]);
    }],
    [[2], function () {
      var s = ri(5, 15), b = pick([30, 45, 60, 120, 135, 210, 300]), r = b * Math.PI / 180, vx = s * Math.sin(r), vy = s * Math.cos(r);
      return Q('A ship leaves port ' + M('(0,\\ 0)') + ' at noon and sails at ' + s + ' km h⁻¹ on a bearing of ' + (b < 100 ? '0' : '') + b + '°. ' + M(vv([1, 0])) + ' is 1 km east and ' + M(vv([0, 1])) + ' is 1 km north.', [
        ['Find the velocity vector of the ship.', 2, M(vec([s3(vx), s3(vy)]))],
        ['Write down its position vector ' + M('t') + ' hours after noon, and find when it is ' + (2 * s) + ' km from port.', 2, M('t' + vec([s3(vx), s3(vy)])) + '; ' + M('t = 2') + ' (2 pm)']
      ]);
    }],
    [[2, 3], function () {
      var a = [ri(-5, 0), ri(-5, 5)], u = [ri(2, 5), ri(-2, 3)], b = [ri(5, 12), ri(-5, 5)], v = [ri(-3, 1), ri(-2, 3)], D0 = [b[0] - a[0], b[1] - a[1]], W = [v[0] - u[0], v[1] - u[1]], t = -dot(D0, W) / dot(W, W);
      if (!(t > 0) || dot(W, W) === 0) { v = [-2, 1]; u = [4, 1]; W = [-6, 0]; t = -dot(D0, W) / 36; }
      var dm = Math.hypot(D0[0] + t * W[0], D0[1] + t * W[1]);
      return Q('Particles ' + M('A') + ' and ' + M('B') + ' have positions ' + M('\\mathbf{r}_A = ' + vv(a) + ' + t' + vv(u)) + ' and ' + M('\\mathbf{r}_B = ' + vv(b) + ' + t' + vv(v)) + '.', [
        ['Find ' + M('\\overrightarrow{AB}') + ' in terms of ' + M('t') + '.', 2, M(vec([lin([W[0], D0[0]], ['t', '']), lin([W[1], D0[1]], ['t', ''])]))],
        ['Find the minimum distance between the particles.', 3, M('t = ' + s3(t)) + ', distance ' + M(s3(dm))]
      ]);
    }]
  ]);

  add('ib-vec-product', [
    [[1, 2], function () {
      var a = [ri(-4, 4), ri(-4, 4), ri(-4, 4)], b = [ri(-4, 4), ri(-4, 4), ri(-4, 4)]; if (norm(cross(a, b)) === 0) b = [1, 2, 3];
      return Q(M('\\mathbf{a} = ' + vv(a)) + ' and ' + M('\\mathbf{b} = ' + vv(b)) + '.', [
        ['Find ' + M('\\mathbf{a} \\times \\mathbf{b}') + '.', 2, M(vv(cross(a, b)))],
        ['Verify that ' + M('\\mathbf{a} \\times \\mathbf{b}') + ' is perpendicular to ' + M('\\mathbf{a}') + '.', 2, M('(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{a} = 0')],
        ['Find the area of the parallelogram with sides ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '.', 1, M(s3(norm(cross(a, b)))) + ' units²']
      ]);
    }],
    [[2], function () {
      var a = [ri(1, 5), ri(-3, 3), ri(-3, 3)], b = [ri(-3, 3), ri(1, 5), ri(-3, 3)]; while (norm(cross(a, b)) === 0) b = [ri(-3, 3), ri(1, 5), ri(-3, 3)]; var ang = Math.acos(dot(a, b) / (norm(a) * norm(b))) * 180 / Math.PI;
      return Q('The vectors ' + M('\\mathbf{p} = ' + vv(a)) + ' and ' + M('\\mathbf{q} = ' + vv(b)) + ' are given.', [
        ['Find the angle between ' + M('\\mathbf{p}') + ' and ' + M('\\mathbf{q}') + '.', 3, M(s3(ang) + '^\\circ')],
        ['Find the component of ' + M('\\mathbf{p}') + ' in the direction of ' + M('\\mathbf{q}') + '.', 2, M('\\frac{\\mathbf{p} \\cdot \\mathbf{q}}{|\\mathbf{q}|} = ' + s3(dot(a, b) / norm(b)))]
      ]);
    }],
    [[2, 3], function () {
      var k = nz(-5, 5), a = [ri(1, 4), ri(-3, 3), ri(1, 4)], b2 = [ri(-3, 3), ri(-3, 3)], kk = -(a[0] * b2[0] + a[1] * b2[1]); if (kk % a[2] !== 0) { b2 = [a[2], 0]; kk = -a[0] * a[2]; }
      var z = kk / a[2];
      return Q('', [
        ['Find the value of ' + M('k') + ' for which ' + M(vv(a)) + ' and ' + M(vec([String(b2[0]), String(b2[1]), 'k'])) + ' are perpendicular.', 2, M(a[0] * b2[0] + a[1] * b2[1] + ' + ' + a[2] + 'k = 0').replace('+ -', '- ') + ', ' + M('k = ' + z)],
        ['For this value of ' + M('k') + ', find a vector perpendicular to both.', 2, M(vv(cross(a, [b2[0], b2[1], z])))]
      ]);
    }]
  ]);

  var PENT = [{ x: 0.5, y: 0, n: 'A' }, { x: 1, y: 0.38, n: 'B' }, { x: 0.82, y: 1, n: 'C' }, { x: 0.18, y: 1, n: 'D' }, { x: 0, y: 0.38, n: 'E' }];
  function randGraph(minE, maxE) {
    for (;;) {
      var E = [], deg = [0, 0, 0, 0, 0];
      for (var i = 0; i < 5; i++) for (var j = i + 1; j < 5; j++) if (Math.random() < 0.5) { E.push([i, j]); deg[i]++; deg[j]++; }
      if (E.length >= minE && E.length <= maxE && deg.every(function (d) { return d > 0; })) return { E: E, deg: deg };
    }
  }
  add('ib-graph-theory', [
    [[1, 2], function () {
      var G = randGraph(5, 8);
      return Q('The graph ' + M('G') + ' is shown.' + D.network(PENT, G.E), [
        ['Write down the number of vertices, edges and the degree of each vertex.', 2, '5 vertices, ' + G.E.length + ' edges; degrees ' + G.deg.join(', ') + ' (A to E)'],
        ['Verify the handshaking lemma for ' + M('G') + '.', 1, 'Sum of degrees ' + G.deg.reduce(function (a, b) { return a + b; }) + ' = 2 × ' + G.E.length],
        ['Is ' + M('G') + ' a simple graph? Is it complete? Give reasons.', 2, 'Simple: no loops or multiple edges. ' + (G.E.length === 10 ? 'Complete: every pair is joined.' : 'Not complete: ' + (10 - G.E.length) + ' pairs are not joined.')]
      ]);
    }],
    [[2], function () {
      var n = ri(4, 9), e = ri(n, Math.min(2 * n, 3 * n - 6));
      return Q('A connected planar graph has ' + n + ' vertices and ' + e + ' edges.', [
        ['Find the number of faces (including the outer face).', 2, 'Euler: ' + M('v - e + f = 2') + ', ' + M('f = ' + (e - n + 2))],
        ['A tree has ' + n + ' vertices. Write down its number of edges and explain why.', 2, M(n - 1) + ': a tree is connected with no cycles; each added vertex adds one edge']
      ]);
    }],
    [[2, 3], function () {
      var G = randGraph(6, 8), A = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
      G.E.forEach(function (e) { A[e[0]][e[1]] = A[e[1]][e[0]] = 1; });
      var A2 = IB.mpow(A, 2), u = ri(0, 4), w = (u + ri(1, 4)) % 5, nm = 'ABCDE';
      return Q('The adjacency matrix of a graph with vertices ' + M('A, B, C, D, E') + ' is ' + M('\\mathbf{M} = ' + mat(A)) + '.', [
        ['Draw the graph.', 2, 'Edges: ' + G.E.map(function (e) { return nm[e[0]] + nm[e[1]]; }).join(', ')],
        ['Find the number of walks of length 2 from ' + M(nm[u]) + ' to ' + M(nm[w]) + ', and from ' + M(nm[u]) + ' back to ' + M(nm[u]) + '.', 2, A2[u][w] + ' and ' + A2[u][u] + ' (the second equals the degree of ' + nm[u] + ')']
      ]);
    }]
  ]);

  add('ib-graph-algorithms', [
    [[1, 2], function () {
      var pts = [[0.1, 0.2], [0.5, 0], [0.9, 0.25], [0.8, 0.85], [0.2, 0.9]], nm = 'ABCDE', E = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 3], [1, 4]];
      E = E.map(function (e) { return [e[0], e[1], ri(2, 15)]; });
      var nodes = pts.map(function (p, i) { return { x: p[0], y: p[1], n: nm[i] }; });
      var sorted = E.slice().sort(function (a, b) { return a[2] - b[2]; }), par = [0, 1, 2, 3, 4], f = function (x) { while (par[x] !== x) x = par[x]; return x; }, tree = [], w = 0;
      sorted.forEach(function (e) { var a = f(e[0]), b = f(e[1]); if (a !== b) { par[a] = b; tree.push(e); w += e[2]; } });
      return Q('The weighted graph shows the costs, in thousands of dollars, of laying cables between five offices.' + D.network(nodes, E), [
        ['Use Kruskal’s algorithm to find a minimum spanning tree, listing the edges in the order you add them.', 3, tree.map(function (e) { return nm[e[0]] + nm[e[1]] + ' (' + e[2] + ')'; }).join(', ')],
        ['Find the total cost.', 1, '$' + w + ' thousand'],
        ['Explain why the tree has 4 edges.', 1, 'A spanning tree of 5 vertices has ' + M('5 - 1 = 4') + ' edges.']
      ]);
    }],
    [[2], function () {
      var W = [], n = 4, nm = 'ABCD';
      for (var i = 0; i < n; i++) { W.push([]); for (var j = 0; j < n; j++) W[i].push(0); }
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) W[i][j] = W[j][i] = ri(5, 20);
      var perms = [[1, 2, 3], [1, 3, 2], [2, 1, 3]], best = 1e9, bestP;
      perms.forEach(function (p) { var c = W[0][p[0]] + W[p[0]][p[1]] + W[p[1]][p[2]] + W[p[2]][0]; if (c < best) { best = c; bestP = p; } });
      return Q('The table shows the travel times, in minutes, between four shops.' + table([''].concat(nm.split('')), W.map(function (r, i) { return [nm[i]].concat(r.map(function (v, j) { return i === j ? '–' : v; })); })), [
        ['Explain why there are only 3 different Hamiltonian cycles starting at ' + M('A') + '.', 1, M('\\frac{(4 - 1)!}{2} = 3') + ' (a cycle and its reverse have the same length)'],
        ['Find the length of each cycle and hence the optimal route.', 3, perms.map(function (p) { return 'A' + p.map(function (k) { return nm[k]; }).join('') + 'A: ' + (W[0][p[0]] + W[p[0]][p[1]] + W[p[1]][p[2]] + W[p[2]][0]); }).join('; ') + '. Best: A' + bestP.map(function (k) { return nm[k]; }).join('') + 'A, ' + best + ' min']
      ]);
    }],
    [[2, 3], function () {
      var odd = ri(0, 1) ? 2 : 4, tot = ri(40, 90), extra = ri(5, 20);
      return Q('A graph has total weight ' + tot + ' and exactly ' + odd + ' vertices of odd degree.', [
        ['Explain why a route that starts and finishes at the same vertex must repeat some edges.', 2, 'A closed route uses an even number of edges at each vertex; the odd vertices need extra (repeated) edges.'],
        [odd === 2 ? 'The shortest path between the two odd vertices has weight ' + extra + '. Find the length of the shortest closed route that uses every edge.' : 'The best pairing of the four odd vertices has total weight ' + extra + '. Find the length of the shortest closed route that uses every edge.', 2, M(tot + ' + ' + extra + ' = ' + (tot + extra))]
      ]);
    }]
  ]);

  add('ib-estimation', [
    [[1, 2], function () {
      var n = ri(6, 10), xs = []; for (var i = 0; i < n; i++) xs.push(ri(120, 180) / 10);
      var m = IB.mean(xs), s2 = xs.reduce(function (a, v) { return a + (v - m) * (v - m); }, 0) / (n - 1);
      return Q('The masses, in grams, of a random sample of ' + n + ' apples are:' + table(['Mass (g)'].concat(xs.map(function (v) { return dp(v, 1); })), []), [
        ['Find an unbiased estimate of the population mean.', 1, M(s3(m))],
        ['Find an unbiased estimate of the population variance.', 2, M('s_{n-1}^2 = ' + s3(s2))]
      ]);
    }],
    [[2], function () {
      var mu = ri(40, 80), sd = ri(3, 12), n = ri(16, 50), k = mu + ri(1, 3), p = 1 - IB.ncdf(k, mu, sd / Math.sqrt(n));
      return Q('The lengths of bolts have mean ' + mu + ' mm and standard deviation ' + sd + ' mm. A sample of ' + n + ' bolts is taken.', [
        ['State the approximate distribution of the sample mean ' + M('\\bar{X}') + ', and the theorem used.', 2, M('\\bar{X} \\approx N\\left(' + mu + ',\\ \\frac{' + sd + '^2}{' + n + '}\\right)') + ', central limit theorem'],
        ['Find ' + M('P(\\bar{X} > ' + k + ')') + '.', 2, M(p < 0.001 ? '\\approx 0' : s3(p))]
      ]);
    }],
    [[2, 3], function () {
      var a = ri(3, 5), b = ri(2, 4), mx = ri(10, 30), vx = ri(2, 9), my = ri(10, 30), vy = ri(2, 9);
      return Q(M('X') + ' and ' + M('Y') + ' are independent with ' + M('E(X) = ' + mx + ',\\ \\mathrm{Var}(X) = ' + vx) + ' and ' + M('E(Y) = ' + my + ',\\ \\mathrm{Var}(Y) = ' + vy) + '.', [
        ['Find ' + M('E(' + a + 'X - ' + b + 'Y)') + ' and ' + M('\\mathrm{Var}(' + a + 'X - ' + b + 'Y)') + '.', 3, M(a * mx - b * my) + ' and ' + M(a * a * vx + b * b * vy)],
        ['Find ' + M('\\mathrm{Var}(X_1 + X_2 + \\dots + X_{' + a + '})') + ' for independent copies of ' + M('X') + ', and explain why it differs from ' + M('\\mathrm{Var}(' + a + 'X)') + '.', 2, M(a * vx) + ' vs ' + M(a * a * vx) + ': independent copies vary separately']
      ]);
    }]
  ]);

  add('ib-poisson', [
    [[1, 2], function () {
      var m = ri(15, 60) / 10, k = ri(1, 5);
      return Q('The number of typing errors on a page follows a Poisson distribution with mean ' + dp(m, 1) + '.', [
        ['Find the probability that a page has exactly ' + k + ' errors.', 2, M(s3(IB.ppdf(m, k)))],
        ['Find the probability that a page has at least 2 errors.', 2, M('1 - P(X \\le 1) = ' + s3(1 - IB.pcdf(m, 1)))],
        ['Write down the variance of the number of errors on a page.', 1, M(dp(m, 1))]
      ]);
    }],
    [[2], function () {
      var m = ri(5, 15) / 10, n = ri(2, 4), p0 = IB.ppdf(m * n, 0), k = Math.round(m * n) + ri(1, 3);
      return Q('Cars pass a checkpoint at a mean rate of ' + dp(m, 1) + ' per minute, following a Poisson distribution.', [
        ['Find the probability that no cars pass in a ' + n + '-minute period.', 2, M('\\mathrm{Po}(' + dp(m * n, 1) + ')') + ': ' + M(s3(p0))],
        ['Find the probability that more than ' + k + ' cars pass in a ' + n + '-minute period.', 2, M(s3(1 - IB.pcdf(m * n, k)))]
      ]);
    }],
    [[2, 3], function () {
      var m = ri(10, 40) / 10, mode = Math.floor(m);
      return Q(M('X \\sim \\mathrm{Po}(' + dp(m, 1) + ')') + '.', [
        ['Find the most likely value of ' + M('X') + ', showing your working.', 2, M('x = ' + mode) + ' (largest probability: ' + s3(IB.ppdf(m, mode)) + ')'],
        ['Find ' + M('P(X > E(X))') + '.', 2, M('P(X > ' + dp(m, 1) + ') = 1 - P(X \\le ' + mode + ') = ' + s3(1 - IB.pcdf(m, mode)))]
      ]);
    }]
  ]);

  add('ib-markov', [
    [[1, 2], function () {
      var a = ri(1, 4) / 10, b = ri(1, 4) / 10, T = [[1 - a, b], [a, 1 - b]], s0 = pick([[1, 0], [0, 1], [0.5, 0.5]]), s1 = IB.mm(T, [[s0[0]], [s0[1]]]);
      return Q('A weather model has two states, sunny (' + M('S') + ') and rainy (' + M('R') + '). If today is sunny, the probability tomorrow is rainy is ' + a + '; if today is rainy, the probability tomorrow is sunny is ' + b + '.' + D.markov(['S', 'R'], [[dp(1 - a, 1), String(a)], [String(b), dp(1 - b, 1)]]), [
        ['Write down the transition matrix ' + M('\\mathbf{T}') + ' (columns: today).', 2, M(mat([[dp(1 - a, 1), b], [a, dp(1 - b, 1)]]))],
        ['The probabilities that today is sunny and rainy are ' + s0.join(' and ') + '. Find the probabilities for tomorrow.', 2, M(vec([s3(s1[0][0]), s3(s1[1][0])]))]
      ]);
    }],
    [[2], function () {
      var a = ri(1, 4) / 10, b = ri(1, 4) / 10, T = [[1 - a, b], [a, 1 - b]], n = ri(3, 6), Tn = IB.mpow(T, n);
      return Q('A transition matrix is ' + M('\\mathbf{T} = ' + mat([[dp(1 - a, 1), b], [a, dp(1 - b, 1)]])) + '.', [
        ['Find ' + M('\\mathbf{T}^{' + n + '}') + '.', 2, M(mat(Tn.map(function (r) { return r.map(s3); })))],
        ['Find the steady-state vector, and describe what happens to the columns of ' + M('\\mathbf{T}^n') + ' as ' + M('n') + ' increases.', 3, M(vec([s3(b / (a + b)), s3(a / (a + b))])) + '; both columns approach this vector']
      ]);
    }],
    [[2, 3], function () {
      var p = ri(2, 5) / 10, q = ri(2, 5) / 10;
      return Q('A gym member either attends (' + M('A') + ') or misses (' + M('M') + ') each week. After attending, the probability of attending the next week is ' + dp(1 - p, 1) + '. After missing, the probability of attending the next week is ' + q + '. This week the member attended.', [
        ['Find the probability that they attend in each of the next two weeks.', 2, M(dp(1 - p, 1) + '^2 = ' + s3((1 - p) * (1 - p)))],
        ['Find the probability that they attend in exactly one of the next two weeks.', 3, M(dp(1 - p, 1) + ' \\times ' + p + ' + ' + p + ' \\times ' + q + ' = ' + s3((1 - p) * p + p * q))]
      ]);
    }]
  ]);

  add('ib-diff-rules', [
    [[1, 2], function () {
      var a = ri(2, 5), b = nz(-4, 4), n = ri(3, 6);
      return Q('', [
        ['Differentiate ' + M('y = (' + a + 'x' + sg(b) + ')^{' + n + '}') + '.', 2, M((n * a) + '(' + a + 'x' + sg(b) + ')^{' + (n - 1) + '}')],
        ['Differentiate ' + M('y = e^{' + a + 'x}\\cos x') + '.', 2, M('e^{' + a + 'x}(' + a + '\\cos x - \\sin x)')],
        ['Differentiate ' + M('y = \\frac{\\ln x}{x}') + '.', 2, M('\\frac{1 - \\ln x}{x^2}')]
      ]);
    }],
    [[2], function () {
      var r = ri(2, 10), dr = ri(1, 5) / 10;
      return Q('The radius of a circular oil spill increases at ' + dp(dr, 1) + ' m per minute.', [
        ['Find the rate at which the area is increasing when the radius is ' + r + ' m.', 3, M('\\frac{dA}{dt} = 2\\pi r\\frac{dr}{dt} = ' + s3(2 * Math.PI * r * dr)) + ' m² per minute'],
        ['Find the rate at which the circumference is increasing.', 1, M('2\\pi \\times ' + dp(dr, 1) + ' = ' + s3(2 * Math.PI * dr)) + ' m per minute (constant)']
      ]);
    }],
    [[2, 3], function () {
      var k = ri(2, 4);
      return Q('A curve has equation ' + M('y = x^' + k + 'e^{-x}') + ', ' + M('x \\ge 0') + '.', [
        ['Find ' + M('\\frac{dy}{dx}') + '.', 2, M('x^{' + (k - 1) + '}e^{-x}(' + k + ' - x)')],
        ['Find the coordinates of the maximum point.', 2, M('(' + k + ',\\ ' + s3(Math.pow(k, k) * Math.exp(-k)) + ')') + ' (exactly ' + M(Math.pow(k, k) + 'e^{-' + k + '}') + ')']
      ]);
    }]
  ]);

  add('ib-volumes', [
    [[1, 2], function () {
      var a = ri(1, 4), b = ri(2, 5);
      return Q('The region between ' + M('y = ' + c1(a, 'x') + ' ') + ', the ' + M('x') + '-axis and ' + M('x = ' + b) + ' is rotated 360° about the ' + M('x') + '-axis.', [
        ['Write down an integral for the volume of the solid formed.', 1, M('\\pi\\int_0^{' + b + '} ' + (a * a === 1 ? '' : a * a) + 'x^2\\,dx')],
        ['Find the exact volume, and name the solid.', 2, M(frac(a * a * b * b * b, 3) + '\\pi') + '; a cone']
      ]);
    }],
    [[2], function () {
      var k = ri(1, 4), b = ri(2, 4), V = Math.PI * (k * k * b);
      return Q('The curve ' + M('y = \\sqrt{' + c1(2 * k, 'x') + '}') + ' for ' + M('0 \\le x \\le ' + b) + ' is rotated 360° about the ' + M('x') + '-axis.', [
        ['Find the exact volume of the solid formed.', 3, M('\\pi\\int_0^{' + b + '} ' + 2 * k + 'x\\,dx = ' + (k * b * b) + '\\pi')],
        ['The solid is cut at ' + M('x = 1') + '. Find the volume of the smaller piece.', 2, M(k + '\\pi')]
      ]);
    }],
    [[2, 3], function () {
      var h = ri(2, 6);
      return Q('The curve ' + M('y = x^2') + ', for ' + M('0 \\le y \\le ' + h) + ', is rotated 360° about the ' + M('y') + '-axis.', [
        ['Write down an integral, in terms of ' + M('y') + ', for the volume of the solid.', 1, M('\\pi\\int_0^{' + h + '} y\\,dy')],
        ['Find the volume, and the height at which the solid would be cut into two equal volumes.', 3, M(frac(h * h, 2) + '\\pi') + '; ' + M('y = \\frac{' + h + '}{\\sqrt{2}} = ' + s3(h / Math.SQRT2))]
      ]);
    }]
  ]);

  add('ib-kinematics', [
    [[1, 2], function () {
      var a = ri(1, 4), b = ri(2, 8), T = ri(2, 5);
      return Q('A particle starts from rest at the origin with acceleration ' + M('a = ' + (2 * a) + 't + ' + b) + ' m s⁻².', [
        ['Find its velocity at time ' + M('t') + '.', 2, M('v = ' + c1(a, 't^2') + ' + ' + b + 't')],
        ['Find its displacement after ' + T + ' seconds.', 2, M(fr(2 * a * T * T * T + 3 * b * T * T, 6)) + ' m']
      ]);
    }],
    [[2], function () {
      var p = ri(1, 3), q = p + ri(2, 4);
      return Q('A particle moves with velocity ' + M('v = (t - ' + p + ')(t - ' + q + ')') + ' m s⁻¹.', [
        ['Find the acceleration when ' + M('t = ' + p) + '.', 2, M('a = 2t - ' + (p + q) + ' = ' + (2 * p - p - q))],
        ['Find the distance travelled while the particle moves in the negative direction.', 3, M('\\left|\\int_' + p + '^' + q + ' v\\,dt\\right| = ' + fr(Math.pow(q - p, 3), 6)) + ' m']
      ]);
    }],
    [[2, 3], function () {
      var A = ri(2, 6), k = ri(2, 6) / 10;
      return Q('A ball rolls with velocity ' + M('v = ' + A + 'e^{-' + k + 't}') + ' m s⁻¹.', [
        ['Find the acceleration when ' + M('t = 2') + ', and comment on its sign.', 2, M(s3(-A * k * Math.exp(-2 * k))) + ' m s⁻²; negative, the ball is slowing down'],
        ['Find the total distance the ball travels as ' + M('t \\to \\infty') + '.', 2, M('\\int_0^\\infty ' + A + 'e^{-' + k + 't}\\,dt = ' + s3(A / k)) + ' m']
      ]);
    }]
  ]);

  add('ib-diff-equations', [
    [[1, 2], function () {
      var k = ri(2, 9) / 10, y0 = ri(2, 20) * 10, t = ri(2, 6);
      return Q('A population ' + M('P') + ' satisfies ' + M('\\frac{dP}{dt} = ' + k + 'P') + ', with ' + M('P = ' + y0) + ' when ' + M('t = 0') + '.', [
        ['Solve the differential equation.', 3, M('P = ' + y0 + 'e^{' + k + 't}')],
        ['Find ' + M('P') + ' when ' + M('t = ' + t) + '.', 1, M(s3(y0 * Math.exp(k * t)))],
        ['Find the time taken for the population to double.', 2, M('t = \\frac{\\ln 2}{' + k + '} = ' + s3(Math.log(2) / k))]
      ]);
    }],
    [[2], function () {
      var a = ri(1, 3), y0 = ri(1, 3), h = pick([0.1, 0.2, 0.25]), n = Math.round(0.5 / h) || 2, x = 0, y = y0;
      for (var i = 0; i < n; i++) { y += h * (a * x - y); x += h; }
      return Q('Consider ' + M('\\frac{dy}{dx} = ' + c1(a, 'x') + ' - y') + ' with ' + M('y(0) = ' + y0) + '.', [
        ['Use Euler’s method with step ' + h + ' to estimate ' + M('y(' + num(Math.round(n * h * 100) / 100) + ')') + '.', 3, M(s3(y))],
        ['State, with a reason, how the accuracy could be improved.', 1, 'Use a smaller step length.']
      ]);
    }],
    [[2, 3], function () {
      var T0 = ri(70, 95), R = ri(15, 25), k = ri(3, 9) / 100;
      return Q('A drink cools according to ' + M('\\frac{dT}{dt} = -' + k + '(T - ' + R + ')') + ', where ' + M('T') + ' °C is its temperature after ' + M('t') + ' minutes. Initially ' + M('T = ' + T0) + '.', [
        ['Solve the differential equation to find ' + M('T') + ' in terms of ' + M('t') + '.', 4, M('T = ' + R + ' + ' + (T0 - R) + 'e^{-' + k + 't}')],
        ['Find the time taken for the drink to cool to ' + (R + 20) + ' °C.', 2, M(s3(Math.log((T0 - R) / 20) / k)) + ' minutes']
      ]);
    }]
  ]);

  add('ib-coupled', [
    [[1, 2], function () {
      var E = eigNice(), A = E.A;
      return Q('A system is given by ' + M('\\dot{x} = ' + lin(A[0], ['x', 'y'])) + ', ' + M('\\dot{y} = ' + lin(A[1], ['x', 'y'])) + '.', [
        ['Find the eigenvalues of the system matrix.', 3, M('\\lambda = ' + E.l1 + ',\\ ' + E.l2)],
        ['Classify the equilibrium at the origin.', 1, E.l1 * E.l2 < 0 ? 'Saddle point (unstable)' : (E.l1 > 0 ? 'Unstable node (source)' : 'Stable node (sink)')]
      ]);
    }],
    [[2], function () {
      var a = ri(1, 5) / 10, b = ri(1, 5) / 10, x0 = ri(20, 60), y0 = ri(5, 20), h = 0.1, x1 = x0 + h * (a * x0 - b * x0 * y0 / 10), y1 = y0 + h * (-a * y0 + b * x0 * y0 / 100);
      return Q('Populations of prey ' + M('x') + ' and predators ' + M('y') + ' satisfy ' + M('\\dot{x} = ' + a + 'x - ' + num(b / 10) + 'xy') + ', ' + M('\\dot{y} = -' + a + 'y + ' + num(b / 100) + 'xy') + ', with ' + M('x(0) = ' + x0) + ', ' + M('y(0) = ' + y0) + '.', [
        ['Use one step of Euler’s method with ' + M('h = 0.1') + ' to estimate ' + M('x(0.1)') + ' and ' + M('y(0.1)') + '.', 3, M('x \\approx ' + s3(x1) + ',\\ y \\approx ' + s3(y1))],
        ['Find the non-zero equilibrium point.', 2, M('x = ' + s3(a * 100 / b) + ',\\ y = ' + s3(a * 10 / b))]
      ]);
    }],
    [[2, 3], function () {
      var p = ri(1, 4), q = ri(2, 9);
      var disc = p * p - 4 * q, kind = disc > 0 ? 'overdamped (no oscillation), a stable node' : disc === 0 ? 'critically damped, a stable node' : 'underdamped (decaying oscillation), a stable spiral';
      return Q('A spring satisfies ' + M('\\ddot{x} + ' + (p === 1 ? '' : p) + '\\dot{x} + ' + q + 'x = 0') + '.', [
        ['Write the equation as a system of first-order equations.', 2, M('\\dot{x} = y,\\ \\dot{y} = -' + q + 'x - ' + (p === 1 ? '' : p) + 'y')],
        ['Find the eigenvalues of the system and describe the motion.', 3, M('\\lambda^2 + ' + (p === 1 ? '' : p) + '\\lambda + ' + q + ' = 0') + '; ' + kind]
      ]);
    }]
  ]);

  add('ib-arith', [
    [[1, 2], function () {
      var a = ri(3, 20), d = ri(2, 9), n = ri(15, 40), un = a + (n - 1) * d;
      return Q('An arithmetic sequence has first term ' + a + ' and last term ' + un + '. There are ' + n + ' terms.', [
        ['Find the common difference.', 2, M('d = \\frac{' + un + ' - ' + a + '}{' + (n - 1) + '} = ' + d)],
        ['Find the sum of the sequence.', 2, M('\\frac{' + n + '}{2}(' + a + ' + ' + un + ') = ' + num(n * (a + un) / 2))]
      ]);
    }]
  ]);
  add('ib-geom', [
    [[1, 2], function () {
      var P = ri(5, 30) * 1000, r = ri(5, 20), n = ri(3, 8), V = P * Math.pow(1 - r / 100, n);
      return Q('A car bought for $' + num(P) + ' loses ' + r + '% of its value each year.', [
        ['Find its value after ' + n + ' years.', 2, IB.usd(V)],
        ['Find how many complete years it takes for the value to fall below half of the original value.', 2, Math.ceil(Math.log(0.5) / Math.log(1 - r / 100)) + ' years']
      ]);
    }]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
