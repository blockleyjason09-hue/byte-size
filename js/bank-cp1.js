/* Byte Size Classroom — Pearson Edexcel A level Further Mathematics: Core Pure Mathematics, Year 1 content.
   Difficulty: 1 = Standard, 2 = Exam, 3 = Challenging (extension questions). */
(function (g) {
  var BS = g.BS, A = BS.fa, M = BS.m;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num;
  var Q = A.Q, sf3 = A.sf3, S = A.S, S0 = A.S0, c1 = A.c1, xm = A.xm, cx = A.cx, cxF = A.cxF, mat = A.mat, vec = A.vec, lin = A.lin, det3 = A.det3, mul = A.mul, dot = A.dot, cross = A.cross, len = A.len, add = A.add, rt = A.rt, ang = A.ang;
  var X = BS.ext, T = BS.topic, Cn = BS.concept;
  function pz(cs) { return poly(cs).replace(/x/g, 'z'); }
  function nzv(lo, hi) { return [nz(lo, hi), nz(lo, hi), nz(lo, hi)]; }
  function cart(a, d) { return a.map(function (v, i) { var n = ['x', 'y', 'z'][i]; return '\\frac{' + (v ? n + S(-v) : n) + '}{' + d[i] + '}'; }).join(' = '); }
  function plane(n, p) { return lin(n, ['x', 'y', 'z']) + ' = ' + p; }

  /* ---------------- Complex numbers ---------------- */
  T({ id: 'cp-complex1', name: 'Complex numbers: arithmetic, roots, Argand diagrams and loci', video: 'further maths core pure complex numbers argand diagram loci', gens: [
    { d: [1], f: function () {
      var a = nz(-5, 5), b = nz(-5, 5), c = nz(-4, 4), d = nz(-4, 4), D = c * c + d * d;
      return Q('Let ' + M('z = ' + cx(a, b)) + ' and ' + M('w = ' + cx(c, d)) + '.', [
        ['Find ' + M('zw') + '.', 2, M(cx(a * c - b * d, a * d + b * c))],
        ['Find ' + M('\\frac{z}{w}') + ' in the form ' + M('p + qi') + '.', 3, M(cxF(a * c + b * d, D, b * c - a * d, D))],
        ['Find ' + M('|z|') + '.', 1, M(rt(a * a + b * b))]
      ]);
    } },
    { d: [1, 2], f: function () {
      var m = nz(-4, 4), n = ri(1, 5);
      return Q('Solve ' + M(pz([1, -2 * m, m * m + n * n]) + ' = 0') + '.', [
        ['Find the roots.', 3, M('z = ' + cx(m, n)) + ' and ' + M('z = ' + cx(m, -n))],
        ['Show the roots on an Argand diagram and describe their relationship.', 2, 'Reflections of each other in the real axis (complex conjugates)'],
        ['Explain why the roots of a quadratic with real coefficients are always conjugates when not real.', 1, 'The formula gives ' + M('\\frac{-b \\pm \\sqrt{\\Delta}}{2a}') + ', and ' + M('\\pm\\sqrt{\\Delta}') + ' gives ' + M('\\pm ki')]
      ]);
    } },
    { d: [2], f: function () {
      var a = nz(-4, 4), b = nz(-4, 4), r = Math.hypot(a, b), t = Math.atan2(b, a);
      return Q(M('z = ' + cx(a, b)) + '.', [
        ['Find the modulus and argument of ' + M('z') + ', giving the argument in radians to 3 s.f.', 3, M('|z| = ' + rt(a * a + b * b)) + ', ' + M('\\arg z = ' + sf3(t))],
        ['Write ' + M('z') + ' in the form ' + M('r(\\cos\\theta + i\\sin\\theta)') + '.', 1, M(rt(a * a + b * b) + '(\\cos(' + sf3(t) + ') + i\\sin(' + sf3(t) + '))')],
        ['Find ' + M('|z^2|') + ' and ' + M('\\arg(z^2)') + ' without expanding.', 2, M(a * a + b * b) + ' and ' + sf3(((2 * t + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI) + ' (in ' + M('(-\\pi, \\pi]') + ')']
      ]);
    } },
    { d: [2, 3], f: function () {
      var a = nz(-3, 3), b = ri(1, 4), r = nz(-4, 4), m2 = a * a + b * b;
      var cs = [1, -(2 * a + r), m2 + 2 * a * r, -r * m2];
      return Q(M('f(z) = z^3 + pz^2 + qz + s') + ' has real coefficients. Two of its roots are ' + M(r) + ' and ' + M(cx(a, b)) + '.', [
        ['Write down the third root, with a reason.', 1, M(cx(a, -b)) + ': complex roots of real polynomials occur in conjugate pairs'],
        ['Find the quadratic factor with roots ' + M(cx(a, b)) + ' and ' + M(cx(a, -b)) + '.', 2, M(pz([1, -2 * a, m2]))],
        ['Find ' + M('p') + ', ' + M('q') + ' and ' + M('s') + '.', 3, M('p = ' + cs[1] + ',\\ q = ' + cs[2] + ',\\ s = ' + cs[3])]
      ]);
    } },
    { d: [2, 3], f: function () {
      var a = ri(-3, 3), b = ri(-3, 3), r = ri(2, 5), th = pick([[1, 4], [1, 3], [3, 4], [-1, 4], [1, 2]]);
      return Q('Loci on an Argand diagram.', [
        ['Describe the locus ' + M('|z - (' + cx(a, b) + ')| = ' + r) + ' and write its Cartesian equation.', 3, 'A circle, centre ' + M(A.pr(a, b)) + ', radius ' + r + ': ' + M(xm(a) + '^2 + ' + xm(b, 'y') + '^2 = ' + r * r)],
        ['Describe the locus ' + M('\\arg(z - (' + cx(a, b) + ')) = ' + A.piF(th[0], th[1])) + '.', 2, 'A half-line from ' + M(A.pr(a, b)) + ' (not included) at angle ' + M(A.piF(th[0], th[1])) + ' to the positive real direction'],
        ['Find the greatest value of ' + M('|z|') + ' for ' + M('z') + ' on the circle.', 2, M(sf3(Math.hypot(a, b) + r))]
      ]);
    } }
  ] });
  X('cp-complex1', [
    function () {
      var x = nz(-5, 5), y = nz(-5, 5);
      return Q('Solve ' + M('z + 2iz^* = ' + cx(x + 2 * y, y + 2 * x)) + ', where ' + M('z^*') + ' is the conjugate of ' + M('z') + '.', [
        ['Let ' + M('z = a + bi') + ' and form two equations.', 3, M('a + 2b = ' + (x + 2 * y)) + ', ' + M('b + 2a = ' + (y + 2 * x))],
        ['Solve to find ' + M('z') + '.', 2, M('z = ' + cx(x, y))],
        ['Explain why an equation involving ' + M('z') + ' and ' + M('z^*') + ' gives two real equations.', 1, 'Equate real and imaginary parts']
      ]);
    },
    function () {
      var a = nz(-4, 4), b = nz(-4, 4);
      return Q('Find the square roots of ' + M(cx(a * a - b * b, 2 * a * b)) + '.', [
        ['Let ' + M('(x + iy)^2 = ' + cx(a * a - b * b, 2 * a * b)) + ' and form two equations.', 2, M('x^2 - y^2 = ' + (a * a - b * b)) + ', ' + M('xy = ' + a * b)],
        ['Solve, explaining why only real ' + M('x, y') + ' are allowed.', 3, M('\\pm(' + cx(a, b) + ')') + '; ' + M('x') + ' and ' + M('y') + ' are real by definition'],
        ['Use moduli to check your answer.', 1, M('|w| = ' + (a * a + b * b)) + ' and each root has modulus ' + M(rt(a * a + b * b))]
      ]);
    },
    function () {
      var a = ri(2, 6), r = ri(1, a - 1);
      var t = Math.asin(r / a);
      return Q('The point ' + M('z') + ' lies on the circle ' + M('|z - ' + a + 'i| = ' + r) + '.', [
        ['Sketch the circle and explain why ' + M('\\arg z') + ' has a greatest and least value.', 2, 'The circle lies entirely above the real axis, away from the origin'],
        ['Find the greatest value of ' + M('\\arg z') + '.', 3, M('\\frac{\\pi}{2} + \\arcsin\\frac{' + r + '}{' + a + '} = ' + sf3(Math.PI / 2 + t))],
        ['Find the least value of ' + M('|z|') + '.', 1, a - r]
      ]);
    },
    function () {
      var p = [nz(-4, 4), nz(-4, 4)], q; do { q = [nz(-4, 4), nz(-4, 4)]; } while (q[0] === p[0] && q[1] === p[1]);
      var mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, dx = q[0] - p[0], dy = q[1] - p[1];
      var cc = dx * mx + dy * my, dist = Math.abs(cc) / Math.hypot(dx, dy);
      return Q('The locus ' + M('|z - (' + cx(p[0], p[1]) + ')| = |z - (' + cx(q[0], q[1]) + ')|') + ' is drawn.', [
        ['Describe the locus.', 1, 'The perpendicular bisector of the points ' + M(A.pr(p[0], p[1])) + ' and ' + M(A.pr(q[0], q[1]))],
        ['Find its Cartesian equation.', 3, M(lin([dx, dy], ['x', 'y']) + ' = ' + num(cc))],
        ['Find the least value of ' + M('|z|') + ' on the locus.', 2, sf3(dist)]
      ]);
    },
    function () {
      var a = nz(-2, 2), b = ri(1, 3), c = nz(-2, 2), d = ri(1, 3);
      var q1 = [1, -2 * a, a * a + b * b], q2 = [1, -2 * c, c * c + d * d];
      var f = [1, q1[1] + q2[1], q1[2] + q1[1] * q2[1] + q2[2], q1[1] * q2[2] + q1[2] * q2[1], q1[2] * q2[2]];
      return Q('The quartic ' + M(pz(f) + ' = 0') + ' has a root ' + M(cx(a, b)) + '.', [
        ['Find a quadratic factor of the quartic.', 2, M(pz(q1))],
        ['Find the other quadratic factor.', 3, M(pz(q2))],
        ['Find all four roots.', 2, M(cx(a, b) + ',\\ ' + cx(a, -b) + ',\\ ' + cx(c, d) + ',\\ ' + cx(c, -d))]
      ]);
    },
    function () {
      return Q('Properties of conjugates.', [
        ['Prove that ' + M('zz^* = |z|^2') + '.', 2, M('(a + bi)(a - bi) = a^2 + b^2')],
        ['Prove that ' + M('(zw)^* = z^*w^*') + '.', 2, 'Expand both with ' + M('z = a + bi') + ', ' + M('w = c + di')],
        ['Hence show that if ' + M('w') + ' is a root of a polynomial with real coefficients, so is ' + M('w^*') + '.', 2, 'Take conjugates of ' + M('\\sum a_k w^k = 0') + ': ' + M('\\sum a_k (w^*)^k = 0')]
      ]);
    }
  ]);

  /* ---------------- Roots of polynomials ---------------- */
  T({ id: 'cp-roots', name: 'Roots of polynomials', video: 'further maths roots of polynomials sum and product', gens: [
    { d: [1], f: function () {
      var a = ri(1, 4), b = nz(-9, 9), c = nz(-9, 9);
      return Q('The roots of ' + M(poly([a, b, c]) + ' = 0') + ' are ' + M('\\alpha') + ' and ' + M('\\beta') + '.', [
        ['Write down ' + M('\\alpha + \\beta') + ' and ' + M('\\alpha\\beta') + '.', 2, M(frac(-b, a)) + ' and ' + M(frac(c, a))],
        ['Find ' + M('\\alpha^2 + \\beta^2') + '.', 2, M(frac(b * b - 2 * a * c, a * a))],
        ['Find ' + M('\\frac{1}{\\alpha} + \\frac{1}{\\beta}') + '.', 1, M(frac(-b, c))]
      ]);
    } },
    { d: [1, 2], f: function () {
      var r = [nz(-3, 3), nz(-3, 3), nz(-3, 3)], s1 = r[0] + r[1] + r[2], s2 = r[0] * r[1] + r[1] * r[2] + r[0] * r[2], s3 = r[0] * r[1] * r[2];
      return Q('The roots of ' + M(poly([1, -s1, s2, -s3]) + ' = 0') + ' are ' + M('\\alpha, \\beta, \\gamma') + '.', [
        ['Write down ' + M('\\sum\\alpha') + ', ' + M('\\sum\\alpha\\beta') + ' and ' + M('\\alpha\\beta\\gamma') + '.', 2, s1 + ', ' + s2 + ', ' + s3],
        ['Find ' + M('\\alpha^2 + \\beta^2 + \\gamma^2') + '.', 2, s1 * s1 - 2 * s2],
        ['Find ' + M('\\frac{1}{\\alpha} + \\frac{1}{\\beta} + \\frac{1}{\\gamma}') + '.', 2, M(frac(s2, s3))]
      ]);
    } },
    { d: [2], f: function () {
      var a = ri(1, 3), b = nz(-6, 6), c = nz(-6, 6), d = nz(-6, 6), k = pick([2, 3, -1]);
      return Q('The roots of ' + M(poly([a, b, c, d]) + ' = 0') + ' are ' + M('\\alpha, \\beta, \\gamma') + '.', [
        ['Use the substitution ' + M('w = ' + c1(k, 'x')) + ' to find an equation with roots ' + M(c1(k, '\\alpha') + ', ' + c1(k, '\\beta') + ', ' + c1(k, '\\gamma')) + '.', 3, M(poly([a, b * k, c * k * k, d * k * k * k]).replace(/x/g, 'w') + ' = 0')],
        ['Explain why the substitution is ' + M(k === -1 ? 'x = -w' : 'x = \\frac{w}{' + k + '}') + '.', 1, 'If ' + M('x') + ' is a root of the original, ' + M('w = ' + c1(k, 'x')) + ' is a root of the new equation']
      ]);
    } },
    { d: [2, 3], f: function () {
      var a = nz(-3, 3), b = nz(-6, 6), c = nz(-6, 6);
      var s1 = -a, s2 = b, s3 = -c;
      return Q('The roots of ' + M(poly([1, a, b, c]) + ' = 0') + ' are ' + M('\\alpha, \\beta, \\gamma') + '.', [
        ['Use the substitution ' + M('w = x + 1') + ' to find an equation with roots ' + M('\\alpha + 1, \\beta + 1, \\gamma + 1') + '.', 4, M(poly([1, a - 3, b - 2 * a + 3, c - b + a - 1]).replace(/x/g, 'w') + ' = 0')],
        ['Check using ' + M('\\sum(\\alpha + 1) = \\sum\\alpha + 3') + '.', 1, (s1 + 3) + ' = ' + (-(a - 3))]
      ]);
    } },
    { d: [2, 3], f: function () {
      var m = nz(-3, 3), d = ri(1, 3), r = [m - d, m, m + d];
      var s1 = 3 * m, s2 = r[0] * r[1] + r[1] * r[2] + r[0] * r[2], s3 = r[0] * r[1] * r[2];
      return Q('The roots of ' + M('x^3' + S(-s1) + 'x^2 + px' + S0(-s3) + ' = 0') + ' are in arithmetic progression.', [
        ['Let the roots be ' + M('m - d, m, m + d') + '. Find ' + M('m') + '.', 2, M('3m = ' + s1) + ', ' + M('m = ' + m)],
        ['Find the roots and the value of ' + M('p') + '.', 3, r.join(', ') + '; ' + M('p = ' + s2)]
      ]);
    } }
  ] });
  X('cp-roots', [
    function () {
      var r = [nz(-3, 3), nz(-3, 3), nz(-3, 3)], s1 = r[0] + r[1] + r[2], s2 = r[0] * r[1] + r[1] * r[2] + r[0] * r[2], s3 = r[0] * r[1] * r[2];
      return Q('For ' + M(poly([1, -s1, s2, -s3]) + ' = 0') + ' with roots ' + M('\\alpha, \\beta, \\gamma') + ':', [
        ['Find ' + M('\\alpha^3 + \\beta^3 + \\gamma^3') + '.', 3, s1 * s1 * s1 - 3 * s1 * s2 + 3 * s3],
        ['Find ' + M('(\\alpha + 1)(\\beta + 1)(\\gamma + 1)') + '.', 2, s3 + s2 + s1 + 1],
        ['Check by finding the roots.', 1, r.join(', ')]
      ]);
    },
    function () {
      var a = ri(1, 3), b = nz(-6, 6), c = nz(-6, 6);
      return Q('The roots of ' + M(poly([a, b, c]) + ' = 0') + ' are ' + M('\\alpha, \\beta') + '.', [
        ['Find a quadratic with integer coefficients whose roots are ' + M('\\alpha^2') + ' and ' + M('\\beta^2') + '.', 4, M(poly([a * a, -(b * b - 2 * a * c), c * c]) + ' = 0')],
        ['Explain how to do this by substitution instead.', 2, 'Let ' + M('w = x^2') + ', so ' + M('x = \\sqrt{w}') + '; rearrange and square to remove the root']
      ]);
    },
    function () {
      var k = ri(2, 4), m = nz(-3, 3);
      var r = [m, k * m, k * k * m], s1 = r[0] + r[1] + r[2], s2 = r[0] * r[1] + r[1] * r[2] + r[0] * r[2], s3 = r[0] * r[1] * r[2];
      return Q('The roots of ' + M(poly([1, -s1, s2, -s3]) + ' = 0') + ' are in geometric progression.', [
        ['Let the roots be ' + M('\\frac{a}{r}, a, ar') + '. Show that ' + M('a^3 = ' + s3) + '.', 2, 'The product of the roots is ' + M('a^3')],
        ['Find the roots.', 3, r.join(', ')],
        ['Verify ' + M('\\sum\\alpha\\beta') + '.', 1, s2]
      ]);
    },
    function () {
      var a = ri(2, 5), b = nz(-6, 6), c = nz(-8, 8), d = nz(-8, 8), e = nz(-8, 8);
      return Q('The roots of ' + M(poly([a, b, c, d, e]) + ' = 0') + ' are ' + M('\\alpha, \\beta, \\gamma, \\delta') + '.', [
        ['Write down ' + M('\\sum\\alpha') + ', ' + M('\\sum\\alpha\\beta') + ', ' + M('\\sum\\alpha\\beta\\gamma') + ' and ' + M('\\alpha\\beta\\gamma\\delta') + '.', 2, M(frac(-b, a) + ',\\ ' + frac(c, a) + ',\\ ' + frac(-d, a) + ',\\ ' + frac(e, a))],
        ['Find ' + M('\\sum\\alpha^2') + '.', 2, M(frac(b * b - 2 * a * c, a * a))],
        ['Deduce whether all four roots can be real.', 1, (b * b - 2 * a * c) < 0 ? 'No: the sum of squares of real numbers cannot be negative' : 'This test does not rule it out']
      ]);
    },
    function () {
      var p = ri(2, 6), q = ri(1, 9);
      return Q('The roots of ' + M('x^3 + ' + p + 'x + ' + q + ' = 0') + ' are ' + M('\\alpha, \\beta, \\gamma') + '.', [
        ['Show that ' + M('\\sum\\alpha^2 = ' + (-2 * p)) + '.', 2, M('(\\sum\\alpha)^2 - 2\\sum\\alpha\\beta = 0 - ' + 2 * p)],
        ['Hence explain why the equation has exactly one real root.', 2, 'If all three were real, ' + M('\\sum\\alpha^2 \\ge 0') + '; so two roots are complex (a conjugate pair)'],
        ['Find ' + M('\\sum\\alpha^3') + ', using the fact that each root satisfies the equation.', 2, M('\\alpha^3 = -' + p + '\\alpha - ' + q) + ' so ' + M('\\sum\\alpha^3 = ' + (-3 * q))]
      ]);
    }
  ]);

  /* ---------------- Matrices ---------------- */
  var TRANS = [[[0, -1], [1, 0], 'rotation 90° anticlockwise about the origin'], [[-1, 0], [0, -1], 'rotation 180° about the origin'], [[0, 1], [1, 0], 'reflection in the line y = x'], [[0, -1], [-1, 0], 'reflection in the line y = −x'], [[1, 0], [0, -1], 'reflection in the x-axis'], [[-1, 0], [0, 1], 'reflection in the y-axis'], [[0, 1], [-1, 0], 'rotation 90° clockwise about the origin']];
  T({ id: 'cp-matrices', name: 'Matrices and linear transformations', video: 'further maths matrices determinants inverses transformations', gens: [
    { d: [1], f: function () {
      var a = [[nz(-4, 4), nz(-4, 4)], [nz(-4, 4), nz(-4, 4)]], b = [[nz(-4, 4), nz(-4, 4)], [nz(-4, 4), nz(-4, 4)]];
      var ab = mul(a, b), ba = mul(b, a);
      return Q(M('\\mathbf{A} = ' + mat(a)) + ' and ' + M('\\mathbf{B} = ' + mat(b)) + '.', [
        ['Find ' + M('\\mathbf{AB}') + ' and ' + M('\\mathbf{BA}') + '.', 3, M(mat(ab)) + ', ' + M(mat(ba))],
        ['Find ' + M('\\det\\mathbf{A}') + ' and ' + M('\\det(\\mathbf{AB})') + '.', 2, (a[0][0] * a[1][1] - a[0][1] * a[1][0]) + ' and ' + (ab[0][0] * ab[1][1] - ab[0][1] * ab[1][0])]
      ]);
    } },
    { d: [1, 2], f: function () {
      var a, dt; do { a = [[nz(-5, 5), nz(-5, 5)], [nz(-5, 5), nz(-5, 5)]]; dt = a[0][0] * a[1][1] - a[0][1] * a[1][0]; } while (!dt);
      var x = nz(-4, 4), y = nz(-4, 4), b = [a[0][0] * x + a[0][1] * y, a[1][0] * x + a[1][1] * y];
      return Q(M('\\mathbf{M} = ' + mat(a)) + '.', [
        ['Find ' + M('\\mathbf{M}^{-1}') + '.', 2, M((dt < 0 ? '-' : '') + '\\frac{1}{' + Math.abs(dt) + '}' + mat([[a[1][1], -a[0][1]], [-a[1][0], a[0][0]]]))],
        ['Hence solve ' + M(lin(a[0], ['x', 'y']) + ' = ' + b[0]) + ', ' + M(lin(a[1], ['x', 'y']) + ' = ' + b[1]) + '.', 3, M('x = ' + x + ',\\ y = ' + y)]
      ]);
    } },
    { d: [2], f: function () {
      var t1 = pick(TRANS), t2 = pick(TRANS), P = mul(t2[0].map ? [t2[0], t2[1]] : t2, [t1[0], t1[1]]);
      return Q('The transformation ' + M('T_1') + ' is a ' + t1[2] + ', and ' + M('T_2') + ' is a ' + t2[2] + '.', [
        ['Write down the matrices for ' + M('T_1') + ' and ' + M('T_2') + '.', 2, M(mat([t1[0], t1[1]])) + ', ' + M(mat([t2[0], t2[1]]))],
        ['Find the matrix for ' + M('T_1') + ' followed by ' + M('T_2') + '.', 2, M(mat(P))],
        ['Describe the combined transformation.', 1, (function () { var f = TRANS.filter(function (t) { return t[0][0] === P[0][0] && t[0][1] === P[0][1] && t[1][0] === P[1][0] && t[1][1] === P[1][1]; }); return f.length ? 'A ' + f[0][2] : (P[0][0] === 1 && P[1][1] === 1 ? 'The identity (no change)' : 'Another isometry with determinant ' + (P[0][0] * P[1][1] - P[0][1] * P[1][0])); })()]
      ]);
    } },
    { d: [2, 3], f: function () {
      var r1 = nz(-3, 3), r2; do { r2 = nz(-3, 4); } while (r2 === r1); var b = r1 + r2, c = -r1 * r2;
      var m = [['k', c, 0], [1, 'k', 1], [0, b, 1]];
      return Q(M('\\mathbf{A} = ' + mat(m)) + ', where ' + M('k') + ' is a constant.', [
        ['Show that ' + M('\\det\\mathbf{A} = ' + poly([1, -b, -c]).replace(/x/g, 'k')) + '.', 3, 'Expand along the first row: ' + M('k(k' + S0(-b) + ')' + S0(-c))],
        ['Find the values of ' + M('k') + ' for which ' + M('\\mathbf{A}') + ' is singular.', 2, M('k = ' + Math.min(r1, r2) + ', ' + Math.max(r1, r2))],
        ['Explain what this means for the system ' + M('\\mathbf{A}\\mathbf{x} = \\mathbf{b}') + ' at those values.', 1, 'There is no unique solution: either none or infinitely many']
      ]);
    } },
    { d: [3], f: function () {
      var bb = nz(-2, 2), m1 = nz(-2, 2), m2; do { m2 = nz(-3, 3); } while (m2 === m1);
      var d = nz(-3, 3), a = d - bb * (m1 + m2), c = -bb * m1 * m2;
      return Q('Find the invariant lines through the origin for ' + M('\\mathbf{M} = ' + mat([[a, bb], [c, d]])) + '.', [
        ['Show that a line ' + M('y = mx') + ' is invariant when ' + M(c1(bb, 'm^2') + S0(a - d) + (a - d ? 'm' : '') + S0(-c) + ' = 0').replace(/ \+ 1m/, ' + m').replace(/ - 1m/, ' - m') + '.', 3, 'The image of ' + M('(x, mx)') + ' is ' + M('(' + lin([a, bb], ['x', 'mx']) + ',\\ ' + lin([c, d], ['x', 'mx']) + ')') + ', which must satisfy ' + M('y = mx')],
        ['Find the invariant lines.', 2, M('y = ' + c1(Math.min(m1, m2), 'x')) + ' and ' + M('y = ' + c1(Math.max(m1, m2), 'x'))],
        ['Explain the difference between an invariant line and a line of invariant points.', 1, 'Points on an invariant line may move along it; on a line of invariant points they do not move at all']
      ]);
    } }
  ] });
  X('cp-matrices', [
    function () {
      var m, dt; do { m = [[ri(-2, 3), ri(-2, 3), ri(-2, 3)], [ri(-2, 3), ri(-2, 3), ri(-2, 3)], [ri(-2, 3), ri(-2, 3), ri(-2, 3)]]; dt = det3(m); } while (!dt || Math.abs(dt) > 12);
      var x = [nz(-3, 3), nz(-3, 3), nz(-3, 3)], b = m.map(function (r) { return dot(r, x); });
      return Q('Solve the system using ' + M('\\mathbf{A}^{-1}') + ', where ' + M('\\mathbf{A} = ' + mat(m)) + ' and ' + M('\\mathbf{A}\\mathbf{x} = ' + vec(b)) + '.', [
        ['Find ' + M('\\det\\mathbf{A}') + '.', 2, dt],
        ['Solve the system.', 3, M('x = ' + x[0] + ',\\ y = ' + x[1] + ',\\ z = ' + x[2])],
        ['Interpret the solution geometrically.', 1, 'The three planes meet at a single point']
      ]);
    },
    function () {
      var k = ri(2, 4), a = nz(-3, 3);
      return Q('A shape of area ' + k * 3 + ' is transformed by ' + M(mat([[k, a], [0, 1]])) + ' and then by ' + M(mat([[0, -1], [1, 0]])) + '.', [
        ['Find the single matrix for the combined transformation.', 2, M(mat([[0, -1], [k, a]]))],
        ['Find the area of the image.', 2, 3 * k * k],
        ['Explain why the order of the transformations does not change the area.', 1, M('\\det(\\mathbf{AB}) = \\det\\mathbf{A}\\det\\mathbf{B} = \\det(\\mathbf{BA})')]
      ]);
    },
    function () {
      var k = nz(-3, 3);
      return Q('Prove by induction that ' + M(mat([[1, k], [0, 1]]) + '^n = ' + mat([[1, c1(k, 'n')], [0, 1]])) + ' for all positive integers ' + M('n') + '.', [
        ['Show the result is true for ' + M('n = 1') + '.', 1, 'Both sides are the given matrix'],
        ['Assume true for ' + M('n = j') + ' and show it is true for ' + M('n = j + 1') + '.', 3, M(mat([[1, c1(k, 'j')], [0, 1]]) + mat([[1, k], [0, 1]]) + ' = ' + mat([[1, (k === 1 ? '' : k === -1 ? '-' : k) + '(j + 1)'], [0, 1]]))],
        ['Describe the transformation geometrically.', 1, 'A shear parallel to the ' + M('x') + '-axis']
      ]);
    },
    function () {
      var a, dt; do { a = [[nz(-4, 4), nz(-4, 4)], [nz(-4, 4), nz(-4, 4)]]; dt = a[0][0] * a[1][1] - a[0][1] * a[1][0]; } while (Math.abs(dt) !== 1);
      var bm = [[nz(-3, 3), nz(-3, 3)], [nz(-3, 3), nz(-3, 3)]], B = mul(a, bm);
      return Q('Given ' + M('\\mathbf{A} = ' + mat(a)) + ' and ' + M('\\mathbf{AX} = ' + mat(B)) + ', find ' + M('\\mathbf{X}') + '.', [
        ['Find ' + M('\\mathbf{A}^{-1}') + '.', 2, M(mat([[a[1][1] * dt, -a[0][1] * dt], [-a[1][0] * dt, a[0][0] * dt]]))],
        ['Find ' + M('\\mathbf{X}') + ', explaining which side to multiply on.', 3, M(mat(bm)) + ': multiply by ' + M('\\mathbf{A}^{-1}') + ' on the left']
      ]);
    },
    function () {
      var k = pick([2, 3]);
      return Q('Consider the planes ' + M('x + y + z = 3') + ', ' + M('x + 2y + ' + k + 'z = ' + (3 + k)) + ' and ' + M('2x + 3y + ' + (k + 1) + 'z = c') + '.', [
        ['Show that the matrix of coefficients is singular.', 2, 'The third row is the sum of the first two'],
        ['Find ' + M('c') + ' so that the planes meet in a line (a sheaf).', 2, M('c = ' + (6 + k))],
        ['Describe the arrangement for other values of ' + M('c') + '.', 1, 'A triangular prism: they meet in pairs but have no common point']
      ]);
    },
    function () {
      return Q('Invariant points.', [
        ['Find the line of invariant points of ' + M(mat([[0, 1], [1, 0]])) + '.', 2, M('y = x')],
        ['Explain why every point on ' + M('y = x') + ' is invariant but ' + M('y = -x') + ' is only an invariant line.', 2, 'Points on ' + M('y = -x') + ' map to their negatives: they stay on the line but move'],
        ['Show that a rotation about the origin (other than 0° or 360°) has exactly one invariant point.', 1, 'Only the origin is fixed']
      ]);
    }
  ]);

  /* ---------------- Series ---------------- */
  function S1(n) { return n * (n + 1) / 2; } function S2(n) { return n * (n + 1) * (2 * n + 1) / 6; } function S3(n) { return S1(n) * S1(n); }
  T({ id: 'cp-series1', name: 'Series: sums of r, r² and r³', video: 'further maths series sum of r squared standard results', gens: [
    { d: [1], f: function () {
      var a = nz(-5, 5), b = nz(-6, 6), n = ri(10, 30);
      return Q('Consider ' + M('\\sum_{r=1}^{n} (' + lin([a, b], ['r', '']).replace(/ $/, '') + ')') + '.', [
        ['Show that the sum is ' + M('\\frac{n}{2}(' + lin([a, a + 2 * b], ['n', '']) + ')') + '.', 2, M(a + '\\cdot\\frac{n(n + 1)}{2}' + (b < 0 ? ' - ' : ' + ') + c1(Math.abs(b), 'n'))],
        ['Evaluate it for ' + M('n = ' + n) + '.', 1, a * S1(n) + b * n]
      ]);
    } },
    { d: [1, 2], f: function () {
      var k = ri(5, 15), n = k + ri(10, 25);
      return Q('Evaluate ' + M('\\sum_{r=' + k + '}^{' + n + '} r^2') + '.', [
        ['Explain why it equals ' + M('\\sum_{r=1}^{' + n + '} r^2 - \\sum_{r=1}^{' + (k - 1) + '} r^2') + '.', 1, 'Remove the terms below ' + M('r = ' + k)],
        ['Evaluate it.', 2, S2(n) - S2(k - 1)]
      ]);
    } },
    { d: [2], f: function () {
      var k = ri(1, 4);
      return Q('Show that ' + M('\\sum_{r=1}^{n} r(r + ' + k + ') = \\frac{n(n + 1)(2n + ' + (1 + 3 * k) + ')}{6}') + '.', [
        ['Expand and split the sum.', 2, M('\\sum r^2 + ' + k + '\\sum r')],
        ['Complete the proof.', 3, M('\\frac{n(n + 1)}{6}[(2n + 1) + ' + 3 * k + ']')],
        ['Check for ' + M('n = 2') + '.', 1, (1 + k) + 2 * (2 + k)]
      ]);
    } },
    { d: [2, 3], f: function () {
      var n = ri(4, 12);
      return Q('Show that ' + M('\\sum_{r=n+1}^{2n} r^2 = \\frac{n(2n + 1)(7n + 1)}{6}') + '.', [
        ['Write the sum as a difference of two standard sums.', 1, M('\\sum_{1}^{2n} - \\sum_{1}^{n}')],
        ['Complete the algebra.', 4, M('\\frac{2n(2n + 1)(4n + 1)}{6} - \\frac{n(n + 1)(2n + 1)}{6}')],
        ['Evaluate for ' + M('n = ' + n) + '.', 1, n * (2 * n + 1) * (7 * n + 1) / 6]
      ]);
    } },
    { d: [2, 3], f: function () {
      var n = ri(5, 20);
      return Q('Use standard results with ' + M('\\sum_{r=1}^{n} r^3 = \\frac{n^2(n + 1)^2}{4}') + '.', [
        ['Show that ' + M('\\sum_{r=1}^{n} r^3 = \\left(\\sum_{r=1}^{n} r\\right)^2') + '.', 1, M('\\left(\\frac{n(n + 1)}{2}\\right)^2')],
        ['Find ' + M('\\sum_{r=1}^{n} (r^3 - r)') + ' in factorised form.', 3, M('\\frac{n(n + 1)(n - 1)(n + 2)}{4}')],
        ['Evaluate it for ' + M('n = ' + n) + '.', 1, S3(n) - S1(n)]
      ]);
    } }
  ] });
  X('cp-series1', [
    function () {
      var t = ri(500, 3000);
      var n = 1; while (S2(n) <= t) n++;
      return Q('Find the smallest ' + M('n') + ' for which ' + M('\\sum_{r=1}^{n} r^2 > ' + t) + '.', [
        ['Write an inequality in ' + M('n') + '.', 1, M('\\frac{n(n + 1)(2n + 1)}{6} > ' + t)],
        ['Find ' + M('n') + ', showing a check either side.', 3, n + ': ' + M('S_{' + (n - 1) + '} = ' + S2(n - 1)) + ', ' + M('S_{' + n + '} = ' + S2(n))]
      ]);
    },
    function () {
      return Q('Sum of the first ' + M('n') + ' odd squares.', [
        ['Show that ' + M('\\sum_{r=1}^{n} (2r - 1)^2 = \\frac{n(2n - 1)(2n + 1)}{3}') + '.', 4, M('4\\sum r^2 - 4\\sum r + n')],
        ['Hence find the sum of the squares of all odd numbers from 1 to 99.', 2, 50 * 99 * 101 / 3]
      ]);
    },
    function () {
      var a = ri(1, 3);
      return Q('Find ' + M('\\sum_{r=1}^{n} r(r + 1)(r + ' + a + ')') + '.', [
        ['Expand the general term.', 1, M('r^3 + ' + (a + 1) + 'r^2 + ' + c1(a, 'r'))],
        ['Find the sum in fully factorised form.', 4, a === 2 ? M('\\frac{n(n + 1)(n + 2)(n + 3)}{4}') : M('\\frac{n(n + 1)}{12}(3n(n + 1) + ' + 2 * (a + 1) + '(2n + 1) + ' + 6 * a + ')')],
        ['Check for ' + M('n = 1') + '.', 1, 2 * (1 + a)]
      ]);
    },
    function () {
      var n = ri(6, 15);
      return Q('Alternating sums.', [
        ['Show that ' + M('1^2 - 2^2 + 3^2 - 4^2 + \\cdots - (2n)^2 = -n(2n + 1)') + '.', 4, 'Pair terms: ' + M('(2r - 1)^2 - (2r)^2 = -(4r - 1)') + ', then sum'],
        ['Evaluate it for ' + M('n = ' + n) + '.', 1, -n * (2 * n + 1)]
      ]);
    },
    function () {
      var k = ri(2, 5);
      return Q('Let ' + M('S_n = \\sum_{r=1}^{n} (r^2 + ' + k + 'r)') + '.', [
        ['Find ' + M('S_n') + ' in factorised form.', 3, M('\\frac{n(n + 1)}{3}\\left(n + ' + frac(1 + 3 * k, 2) + '\\right)')],
        ['Find ' + M('S_{2n} - S_n') + ' when ' + M('n = 10') + '.', 2, (S2(20) + k * S1(20)) - (S2(10) + k * S1(10))]
      ]);
    }
  ]);

  /* ---------------- Proof by induction ---------------- */
  var SUMS = [
    ['\\sum_{r=1}^{n} (2r - 1) = n^2', 'Add ' + M('2(k + 1) - 1') + ': ' + M('k^2 + 2k + 1 = (k + 1)^2')],
    ['\\sum_{r=1}^{n} r(r + 1) = \\frac{n(n + 1)(n + 2)}{3}', 'Add ' + M('(k + 1)(k + 2)') + ' and factorise ' + M('\\frac{(k + 1)(k + 2)}{3}(k + 3)')],
    ['\\sum_{r=1}^{n} r^3 = \\frac{n^2(n + 1)^2}{4}', 'Add ' + M('(k + 1)^3') + ': ' + M('\\frac{(k + 1)^2}{4}(k^2 + 4k + 4)')],
    ['\\sum_{r=1}^{n} \\frac{1}{r(r + 1)} = \\frac{n}{n + 1}', 'Add ' + M('\\frac{1}{(k + 1)(k + 2)}') + ': ' + M('\\frac{k(k + 2) + 1}{(k + 1)(k + 2)} = \\frac{k + 1}{k + 2}')],
    ['\\sum_{r=1}^{n} r2^{r} = (n - 1)2^{n + 1} + 2', 'Add ' + M('(k + 1)2^{k + 1}') + ': ' + M('2^{k+1}(2k) + 2 = k2^{k+2} + 2')]
  ];
  var DIVS = [['4^n - 1', 3, '4^{k+1} - 1 = 4(4^k - 1) + 3'], ['3^{2n} - 1', 8, '3^{2k+2} - 1 = 9(3^{2k} - 1) + 8'], ['7^n - 3^n', 4, '7^{k+1} - 3^{k+1} = 7(7^k - 3^k) + 4\\cdot 3^k'], ['5^n - 1', 4, '5^{k+1} - 1 = 5(5^k - 1) + 4'], ['2^{3n} - 1', 7, '2^{3k+3} - 1 = 8(2^{3k} - 1) + 7'], ['6^n + 4', 5, '6^{k+1} + 4 = 6(6^k + 4) - 20']];
  T({ id: 'cp-induction', name: 'Proof by induction', video: 'further maths proof by induction series divisibility matrices', gens: [
    { d: [1, 2], f: function () {
      var s = pick(SUMS);
      return Q('Prove by induction that ' + M(s[0]) + ' for all positive integers ' + M('n') + '.', [
        ['Show the result holds for ' + M('n = 1') + '.', 1, 'Both sides are equal at ' + M('n = 1')],
        ['Assume it holds for ' + M('n = k') + ' and show it holds for ' + M('n = k + 1') + '.', 4, s[1]],
        ['Write a conclusion.', 1, 'True for ' + M('n = 1') + ', and true for ' + M('k') + ' implies true for ' + M('k + 1') + ', so true for all positive integers ' + M('n')]
      ]);
    } },
    { d: [1, 2], f: function () {
      var s = pick(DIVS);
      return Q('Prove by induction that ' + M(s[0]) + ' is divisible by ' + s[1] + ' for all positive integers ' + M('n') + '.', [
        ['Check ' + M('n = 1') + '.', 1, M(s[0].replace(/n/g, '1')) + ' is a multiple of ' + s[1]],
        ['Complete the inductive step.', 4, M(s[2]) + ', both terms divisible by ' + s[1]],
        ['Explain why writing ' + M('f(k + 1)') + ' in terms of ' + M('f(k)') + ' is the key step.', 1, 'It uses the assumption that ' + M('f(k)') + ' is divisible by ' + s[1]]
      ]);
    } },
    { d: [2], f: function () {
      return Q('Prove by induction that ' + M(mat([[3, -2], [2, -1]]) + '^n = ' + mat([['2n + 1', '-2n'], ['2n', '1 - 2n']])) + '.', [
        ['Check ' + M('n = 1') + '.', 1, M(mat([[3, -2], [2, -1]]))],
        ['Complete the inductive step.', 4, M(mat([['2k + 1', '-2k'], ['2k', '1 - 2k']]) + mat([[3, -2], [2, -1]]) + ' = ' + mat([['2k + 3', '-2k - 2'], ['2k + 2', '-2k - 1']]))],
        ['Write a conclusion.', 1, 'True for all positive integers ' + M('n')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var a = pick([2, 3]), b = pick([1, 2, 5]);
      return Q('A sequence has ' + M('u_1 = ' + (a + b)) + ' and ' + M('u_{n+1} = ' + a + 'u_n - ' + b * (a - 1)) + '. Prove that ' + M('u_n = ' + a + '^n + ' + b) + '.', [
        ['Check ' + M('n = 1') + '.', 1, M(a + ' + ' + b + ' = ' + (a + b))],
        ['Complete the inductive step.', 3, M(a + '(' + a + '^k + ' + b + ') - ' + b * (a - 1) + ' = ' + a + '^{k+1} + ' + b)],
        ['Find ' + M('u_{10}') + '.', 1, Math.pow(a, 10) + b]
      ]);
    } },
    { d: [3], f: function () {
      return Q('Prove by induction that ' + M('n! > 2^n') + ' for all integers ' + M('n \\ge 4') + '.', [
        ['Check the base case.', 1, M('24 > 16')],
        ['Complete the inductive step.', 3, M('(k + 1)! = (k + 1)k! > (k + 1)2^k > 2 \\cdot 2^k') + ' since ' + M('k + 1 > 2')],
        ['Explain why the base case is ' + M('n = 4') + ' and not ' + M('n = 1') + '.', 1, 'The statement is false for ' + M('n = 1, 2, 3')]
      ]);
    } }
  ] });
  X('cp-induction', [
    function () {
      return Q('Prove by induction that ' + M('\\frac{d^n}{dx^n}(xe^x) = (x + n)e^x') + '.', [
        ['Check ' + M('n = 1') + '.', 1, M('e^x + xe^x = (x + 1)e^x')],
        ['Complete the inductive step.', 3, M('\\frac{d}{dx}[(x + k)e^x] = (x + k + 1)e^x')],
        ['Write a conclusion.', 1, 'True for all positive integers ' + M('n')]
      ]);
    },
    function () {
      return Q('Prove by induction that ' + M('n^3 - n') + ' is divisible by 6 for all positive integers ' + M('n') + '.', [
        ['Show that ' + M('f(k + 1) - f(k) = 3k(k + 1)') + '.', 2, 'Expand ' + M('(k + 1)^3 - (k + 1) - k^3 + k')],
        ['Complete the proof.', 3, M('k(k + 1)') + ' is even, so ' + M('3k(k + 1)') + ' is a multiple of 6'],
        ['Give a direct (non-induction) proof.', 1, M('(n - 1)n(n + 1)') + ' contains a multiple of 2 and of 3']
      ]);
    },
    function () {
      return Q('Find the error in this “proof” that all horses are the same colour.', [
        ['The claim is true for one horse. Assume any ' + M('k') + ' horses are the same colour. For ' + M('k + 1') + ' horses, the first ' + M('k') + ' and the last ' + M('k') + ' are each one colour, and they overlap. Find the flaw.', 3, 'For ' + M('k = 1') + ' going to 2, the two groups of one horse do not overlap, so the step fails'],
        ['What does this show about the inductive step?', 1, 'It must work for every ' + M('k \\ge') + ' the base case, including the first step']
      ]);
    },
    function () {
      return Q('Prove by induction that ' + M('\\sum_{r=1}^{n} \\frac{1}{(2r - 1)(2r + 1)} = \\frac{n}{2n + 1}') + '.', [
        ['Check ' + M('n = 1') + '.', 1, M('\\frac{1}{3}')],
        ['Complete the inductive step.', 4, M('\\frac{k}{2k + 1} + \\frac{1}{(2k + 1)(2k + 3)} = \\frac{(2k + 1)(k + 1)}{(2k + 1)(2k + 3)}')],
        ['Find the limit of the sum as ' + M('n \\to \\infty') + '.', 1, M('\\frac{1}{2}')]
      ]);
    },
    function () {
      return Q('Prove by induction that ' + M('2^n > n^2') + ' for all integers ' + M('n \\ge 5') + '.', [
        ['Check the base case.', 1, M('32 > 25')],
        ['Show that ' + M('2k^2 > (k + 1)^2') + ' for ' + M('k \\ge 5') + '.', 2, M('k^2 - 2k - 1 > 0') + ' for ' + M('k \\ge 3')],
        ['Complete the inductive step.', 2, M('2^{k+1} = 2 \\cdot 2^k > 2k^2 > (k + 1)^2')]
      ]);
    }
  ]);

  /* ---------------- Vectors: lines and planes ---------------- */
  T({ id: 'cp-vectors', name: 'Vectors: lines and planes', video: 'further maths vectors planes lines intersection angle', gens: [
    { d: [1], f: function () {
      var a = nzv(-4, 4), d = nzv(-3, 3), b = add(a, d);
      return Q('A line passes through ' + M('A(' + a.join(', ') + ')') + ' and ' + M('B(' + b.join(', ') + ')') + '.', [
        ['Find a vector equation of the line.', 2, M('\\mathbf{r} = ' + vec(a) + ' + \\lambda' + vec(d))],
        ['Write the line in Cartesian form.', 2, M(cart(a, d))]
      ]);
    } },
    { d: [1, 2], f: function () {
      var d1 = nzv(-3, 3), d2; do { d2 = nzv(-3, 3); } while (cross(d1, d2).every(function (x) { return !x; }));
      var c = Math.abs(dot(d1, d2)) / (len(d1) * len(d2));
      return Q('Two lines have directions ' + M(vec(d1)) + ' and ' + M(vec(d2)) + '.', [
        ['Find the acute angle between them.', 3, sf3(ang(Math.acos(c))) + '°'],
        ['Are they perpendicular? Explain.', 1, dot(d1, d2) === 0 ? 'Yes: the scalar product is 0' : 'No: the scalar product is ' + dot(d1, d2)]
      ]);
    } },
    { d: [2], f: function () {
      var P, Q1, R, n; do { P = nzv(-3, 3); Q1 = nzv(-3, 3); R = nzv(-3, 3); n = cross(add(Q1, P, -1), add(R, P, -1)); } while (n.every(function (x) { return !x; }));
      var gg = Math.abs(n.reduce(function (s, x) { return gcd(s, Math.abs(x)); }, 0)) || 1; n = n.map(function (x) { return x / gg; });
      return Q('A plane passes through ' + M('(' + P.join(', ') + ')') + ', ' + M('(' + Q1.join(', ') + ')') + ' and ' + M('(' + R.join(', ') + ')') + '.', [
        ['Find a normal vector.', 3, M(vec(n))],
        ['Find a Cartesian equation of the plane.', 2, M(plane(n, dot(n, P)))]
      ]);
    } },
    { d: [2, 3], f: function () {
      var n = nzv(-3, 3), a = nzv(-4, 4), d; do { d = nzv(-3, 3); } while (dot(n, d) === 0);
      var lam = nz(-3, 3), X0 = add(a, d, lam), p = dot(n, X0);
      return Q('The line ' + M('\\mathbf{r} = ' + vec(a) + ' + \\lambda' + vec(d)) + ' meets the plane ' + M(plane(n, p)) + '.', [
        ['Find the point of intersection.', 3, M('\\lambda = ' + lam) + ': ' + M('(' + X0.join(', ') + ')')],
        ['Find the acute angle between the line and the plane.', 3, sf3(ang(Math.asin(Math.min(1, Math.abs(dot(n, d)) / (len(n) * len(d)))))) + '°']
      ]);
    } },
    { d: [2, 3], f: function () {
      var n = nzv(-3, 3), p = nz(-10, 10), q = nzv(-5, 5);
      return Q('Find the perpendicular distance from ' + M('(' + q.join(', ') + ')') + ' to the plane ' + M(plane(n, p)) + '.', [
        ['Use ' + M('\\frac{|\\mathbf{n}\\cdot\\mathbf{q} - p|}{|\\mathbf{n}|}') + '.', 3, sf3(Math.abs(dot(n, q) - p) / len(n))],
        ['Find the foot of the perpendicular.', 3, (function () { var t = (p - dot(n, q)) / dot(n, n); return M('(' + q.map(function (v, i) { return sf3(v + t * n[i]); }).join(', ') + ')'); })()]
      ]);
    } }
  ] });
  X('cp-vectors', [
    function () {
      var a = nzv(-3, 3), b = nzv(-3, 3), d1 = nzv(-2, 2), d2; do { d2 = nzv(-2, 2); } while (cross(d1, d2).every(function (x) { return !x; }));
      var nn = cross(d1, d2), dist = Math.abs(dot(add(b, a, -1), nn)) / len(nn);
      return Q('Lines ' + M('\\mathbf{r} = ' + vec(a) + ' + \\lambda' + vec(d1)) + ' and ' + M('\\mathbf{r} = ' + vec(b) + ' + \\mu' + vec(d2)) + '.', [
        ['Find a vector perpendicular to both lines.', 2, M(vec(nn))],
        ['Find the shortest distance between the lines.', 3, sf3(dist)],
        ['Do the lines intersect? Explain.', 1, dist < 1e-9 ? 'Yes: the shortest distance is 0' : 'No: the shortest distance is not 0 (they are skew)']
      ]);
    },
    function () {
      var n1 = nzv(-3, 3), n2; do { n2 = nzv(-3, 3); } while (cross(n1, n2).every(function (x) { return !x; }));
      return Q('Planes ' + M(plane(n1, nz(-6, 6))) + ' and ' + M(plane(n2, nz(-6, 6))) + '.', [
        ['Find the acute angle between the planes.', 3, sf3(ang(Math.acos(Math.abs(dot(n1, n2)) / (len(n1) * len(n2))))) + '°'],
        ['Find the direction of their line of intersection.', 2, M(vec(cross(n1, n2)))]
      ]);
    },
    function () {
      var n = nzv(-3, 3), p = nz(-8, 8), q = nzv(-4, 4), t = (p - dot(n, q)) / dot(n, n);
      return Q('Reflect ' + M('Q(' + q.join(', ') + ')') + ' in the plane ' + M(plane(n, p)) + '.', [
        ['Write the line through ' + M('Q') + ' perpendicular to the plane.', 1, M('\\mathbf{r} = ' + vec(q) + ' + t' + vec(n))],
        ['Find the value of ' + M('t') + ' where it meets the plane.', 2, M('t = ' + frac(p - dot(n, q), dot(n, n)))],
        ['Find the image of ' + M('Q') + '.', 2, M('(' + q.map(function (v, i) { return frac(Math.round((v + 2 * t * n[i]) * dot(n, n)), dot(n, n)); }).join(', ') + ')')]
      ]);
    },
    function () {
      var a = nzv(-3, 3), d = nzv(-3, 3), n = [d[1], -d[0], 0];
      var p = dot(n, a), p2 = p + nz(-5, 5);
      return Q('The line ' + M('\\mathbf{r} = ' + vec(a) + ' + \\lambda' + vec(d)) + ' and the planes ' + M(plane(n, p)) + ' and ' + M(plane(n, p2)) + '.', [
        ['Show that the line is parallel to both planes.', 2, M('\\mathbf{d}\\cdot\\mathbf{n} = 0')],
        ['Which plane contains the line? Explain.', 2, 'The first: ' + M('(' + a.join(', ') + ')') + ' satisfies it'],
        ['Find the distance between the line and the other plane.', 2, sf3(Math.abs(p2 - p) / len(n))]
      ]);
    },
    function () {
      var P = nzv(-3, 3), d1 = nzv(-2, 2), d2; do { d2 = nzv(-2, 2); } while (cross(d1, d2).every(function (x) { return !x; }));
      var s = nz(-2, 2), t = nz(-2, 2), a = add(P, d1, -s), b = add(P, d2, -t);
      return Q('Lines ' + M('\\mathbf{r} = ' + vec(a) + ' + s' + vec(d1)) + ' and ' + M('\\mathbf{r} = ' + vec(b) + ' + t' + vec(d2)) + ' intersect.', [
        ['Find the point of intersection.', 4, M('(' + P.join(', ') + ')')],
        ['Find the equation of the plane containing both lines.', 3, (function () { var n = cross(d1, d2); return M(plane(n, dot(n, P))); })()]
      ]);
    }
  ]);

  /* ---------------- Volumes of revolution ---------------- */
  T({ id: 'cp-volumes1', name: 'Volumes of revolution', video: 'further maths core pure volumes of revolution', gens: [
    { d: [1], f: function () {
      var r = ri(2, 6), h = ri(3, 9);
      return Q('The line ' + M('y = \\frac{' + r + 'x}{' + h + '}') + ' for ' + M('0 \\le x \\le ' + h) + ' is rotated through ' + M('2\\pi') + ' about the ' + M('x') + '-axis.', [
        ['Find the volume by integration.', 3, M(frac(r * r * h, 3) + '\\pi')],
        ['Check using the formula for a cone.', 1, M('\\frac{1}{3}\\pi r^2 h')]
      ]);
    } },
    { d: [1, 2], f: function () {
      var a = ri(1, 6), h = ri(2, 8);
      return Q('The region under ' + M('y = \\sqrt{' + (a === 1 ? '' : a) + 'x}') + ' from ' + M('x = 0') + ' to ' + M('x = ' + h) + ' is rotated about the ' + M('x') + '-axis.', [
        ['Find the exact volume.', 3, M(frac(a * h * h, 2) + '\\pi')],
        ['Explain why the solid is called a paraboloid.', 1, 'Its cross-sections through the axis are parabolas']
      ]);
    } },
    { d: [2], f: function () {
      var h = ri(2, 9);
      return Q('The region between ' + M('y = x^2') + ', the ' + M('y') + '-axis and ' + M('y = ' + h) + ' (for ' + M('x \\ge 0') + ') is rotated about the ' + M('y') + '-axis.', [
        ['Write the volume as an integral in ' + M('y') + '.', 2, M('\\pi\\int_0^{' + h + '} y\\,dy')],
        ['Find the exact volume.', 2, M(frac(h * h, 2) + '\\pi')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var a = ri(1, 4);
      return Q('The region between ' + M('y = ' + c1(a, 'x')) + ' and ' + M('y = x^2') + ' is rotated about the ' + M('x') + '-axis.', [
        ['Find where the curves meet.', 1, M('x = 0') + ' and ' + M('x = ' + a)],
        ['Find the exact volume.', 4, M('\\pi\\int_0^{' + a + '}(' + (a * a === 1 ? '' : a * a) + 'x^2 - x^4)\\,dx = ' + frac(2 * Math.pow(a, 5), 15) + '\\pi')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var k = ri(2, 5);
      return Q('The curve ' + M('y = \\frac{1}{x}') + ' from ' + M('x = 1') + ' to ' + M('x = ' + k) + ' is rotated about the ' + M('x') + '-axis.', [
        ['Find the exact volume.', 3, M(frac(k - 1, k) + '\\pi')],
        ['Find the limit of the volume as the upper limit tends to infinity.', 1, M('\\pi')]
      ]);
    } }
  ] });
  X('cp-volumes1', [
    function () {
      var h = ri(1, 3);
      return Q('The region under ' + M('y = e^x') + ' from ' + M('x = 0') + ' to ' + M('x = ' + h) + ' is rotated about the ' + M('x') + '-axis.', [
        ['Find the exact volume.', 3, M('\\frac{\\pi}{2}(e^{' + 2 * h + '} - 1)')],
        ['Explain why the integrand is ' + M('e^{2x}') + '.', 1, 'Each disc has area ' + M('\\pi y^2')]
      ]);
    },
    function () {
      var h = pick([1, 8, 27]);
      var c = Math.round(Math.cbrt(h));
      return Q('The region between ' + M('y = x^3') + ', the ' + M('y') + '-axis and ' + M('y = ' + h) + ' is rotated about the ' + M('y') + '-axis.', [
        ['Write ' + M('x^2') + ' in terms of ' + M('y') + '.', 1, M('y^{2/3}')],
        ['Find the exact volume.', 3, M('\\frac{3\\pi}{5}(' + h + ')^{5/3} = ' + frac(3 * Math.pow(c, 5), 5) + '\\pi')]
      ]);
    },
    function () {
      var r = ri(3, 8), d = ri(1, r - 1);
      return Q('A sphere of radius ' + r + ' is cut by a plane ' + d + ' units from its centre.', [
        ['Model the sphere by rotating ' + M('x^2 + y^2 = ' + r * r) + ' about the ' + M('x') + '-axis, and write the volume of the smaller cap as an integral.', 2, M('\\pi\\int_{' + d + '}^{' + r + '}(' + r * r + ' - x^2)\\,dx')],
        ['Find the exact volume of the cap.', 3, M(frac(3 * r * r * (r - d) - (r * r * r - d * d * d), 3) + '\\pi')]
      ]);
    },
    function () {
      var a = ri(2, 4), h = ri(3, 8);
      return Q('A vase is modelled by rotating ' + M('y = ' + a + ' + \\frac{x}{' + h + '}') + ' (cm) for ' + M('0 \\le x \\le ' + 2 * h) + ' about the ' + M('x') + '-axis.', [
        ['Find the volume.', 4, sf3(Math.PI * 2 * h * (a * a + 2 * a + 4 / 3)) + ' cm³'],
        ['Give one limitation of the model.', 1, 'The vase has thickness; the base is not modelled']
      ]);
    },
    function () {
      var a = ri(1, 3);
      return Q('The region between ' + M('y = x^2') + ' and ' + M('y = ' + a * a) + ' is rotated about the ' + M('x') + '-axis.', [
        ['Write the volume as a difference of two integrals.', 2, M('\\pi\\int_{-' + a + '}^{' + a + '}(' + Math.pow(a, 4) + ' - x^4)\\,dx')],
        ['Find the exact volume.', 3, M(frac(8 * Math.pow(a, 5), 5) + '\\pi')]
      ]);
    }
  ]);

  /* ---------------- Reasoning statements (Varied Do Now / Exit) ---------------- */
  var Sr = String.raw;
  Cn('cp-complex1', [
    ['T', Sr`\(i^2 = -1\), so \(i^4 = 1\).`, Sr`\((i^2)^2 = 1\).`],
    ['F', Sr`\(|z + w| = |z| + |w|\) for all complex numbers.`, Sr`Only when they have the same argument (or one is 0).`],
    ['A', Sr`\(zz^*\) is real.`, Sr`It equals \(|z|^2\).`],
    ['S', Sr`\(z^2\) is real.`, Sr`True if \(z\) is real or purely imaginary; false for \(1 + i\).`],
    ['N', Sr`A cubic with real coefficients has exactly two non-real roots and no real root.`, Sr`Non-real roots come in pairs, so at least one root is real.`],
    ['T', Sr`\(\arg(zw) = \arg z + \arg w\) (up to adding \(2\pi\)).`, Sr`Moduli multiply, arguments add.`]
  ]);
  Cn('cp-roots', [
    ['T', Sr`For \(2x^3 - 5x + 1 = 0\), \(\sum\alpha = 0\).`, Sr`There is no \(x^2\) term.`],
    ['F', Sr`For \(ax^2 + bx + c = 0\), \(\alpha\beta = -\frac{c}{a}\).`, Sr`\(\alpha\beta = \frac{c}{a}\).`],
    ['A', Sr`\(\sum\alpha^2 = (\sum\alpha)^2 - 2\sum\alpha\beta\).`, Sr`Expand \((\alpha + \beta + \gamma)^2\).`],
    ['S', Sr`If \(\sum\alpha^2 < 0\), some roots are not real.`, Sr`This is always true; but \(\sum\alpha^2 \ge 0\) does not show all roots are real.`],
    ['N', Sr`A quartic with real coefficients can have exactly three real roots and one non-real root.`, Sr`Non-real roots come in conjugate pairs.`]
  ]);
  Cn('cp-matrices', [
    ['F', Sr`\(\mathbf{AB} = \mathbf{BA}\) for all square matrices.`, Sr`Matrix multiplication is not commutative.`],
    ['T', Sr`\((\mathbf{AB})^{-1} = \mathbf{B}^{-1}\mathbf{A}^{-1}\).`, Sr`Reverse the order.`],
    ['A', Sr`\(\det(\mathbf{AB}) = \det\mathbf{A}\det\mathbf{B}\).`, Sr`Area scale factors multiply.`],
    ['S', Sr`A matrix with a negative determinant represents a reflection.`, Sr`It reverses orientation, but it may also stretch, e.g. \(\begin{pmatrix}2&0\\0&-1\end{pmatrix}\).`],
    ['N', Sr`A singular matrix has an inverse.`, Sr`Its determinant is 0.`],
    ['T', Sr`The determinant of a rotation matrix is 1.`, Sr`\(\cos^2\theta + \sin^2\theta = 1\).`]
  ]);
  Cn('cp-series1', [
    ['T', Sr`\(\sum_{r=1}^{n} 1 = n\).`, Sr`It adds \(n\) ones.`],
    ['F', Sr`\(\sum_{r=1}^{n} r^2 = \left(\sum_{r=1}^{n} r\right)^2\).`, Sr`That identity holds for cubes, not squares.`],
    ['A', Sr`\(\sum_{r=1}^{n} r^3 = \left(\frac{n(n + 1)}{2}\right)^2\).`, Sr`Standard result.`],
    ['F', Sr`\(\sum_{r=5}^{20} r^2 = \sum_{r=1}^{20} r^2 - \sum_{r=1}^{5} r^2\).`, Sr`Subtract up to \(r = 4\), not 5.`],
    ['N', Sr`\(\sum_{r=1}^{n} r^2\) is odd for every \(n\).`, Sr`\(1 + 4 = 5\) is odd but \(1 + 4 + 9 + 16 = 30\) is even; it is sometimes odd.`]
  ]);
  Cn('cp-induction', [
    ['A', Sr`An induction proof needs both a base case and an inductive step.`, Sr`Without either, the chain of implications fails.`],
    ['F', Sr`Checking a result for \(n = 1, 2, \ldots, 100\) proves it for all \(n\).`, Sr`Examples never prove a general statement.`],
    ['T', Sr`The base case need not be \(n = 1\).`, Sr`E.g. \(n! > 2^n\) starts at \(n = 4\).`],
    ['S', Sr`In the inductive step you may assume the result you are proving.`, Sr`You assume it for \(n = k\) only, not for \(k + 1\).`]
  ]);
  Cn('cp-vectors', [
    ['T', Sr`The plane \(2x - y + 3z = 5\) has normal \(\begin{pmatrix}2\\-1\\3\end{pmatrix}\).`, Sr`The coefficients give the normal.`],
    ['F', Sr`Two non-parallel lines in 3D always intersect.`, Sr`They may be skew.`],
    ['A', Sr`If \(\mathbf{a}\cdot\mathbf{b} = 0\) for non-zero vectors, they are perpendicular.`, Sr`\(\cos\theta = 0\).`],
    ['S', Sr`The angle between a line and a plane is found with \(\cos\theta = \frac{|\mathbf{d}\cdot\mathbf{n}|}{|\mathbf{d}||\mathbf{n}|}\).`, Sr`That gives the angle with the normal; the angle with the plane uses \(\sin\).`],
    ['N', Sr`Two distinct parallel planes intersect in a line.`, Sr`They never meet.`]
  ]);
  Cn('cp-volumes1', [
    ['T', Sr`Rotating \(y = r\) for \(0 \le x \le h\) about the \(x\)-axis gives a cylinder.`, Sr`\(\pi\int_0^h r^2\,dx = \pi r^2 h\).`],
    ['F', Sr`The volume of revolution about the \(x\)-axis is \(\pi\int y\,dx\).`, Sr`It is \(\pi\int y^2\,dx\).`],
    ['A', Sr`A volume of revolution is never negative.`, Sr`The integrand \(y^2\) is never negative.`],
    ['S', Sr`The volume between two curves rotated is \(\pi\int (y_1 - y_2)^2\,dx\).`, Sr`It should be \(\pi\int (y_1^2 - y_2^2)\,dx\); the two agree only if one curve is the axis.`]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
