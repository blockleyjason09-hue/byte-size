/* Byte Size Classroom — deeper extension questions (set 3, IB AI HL part e): complex numbers, matrices, eigenvalues, logistic models. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function cx(a, b) { if (!b) return String(a); var im = Math.abs(b) === 1 ? 'i' : Math.abs(b) + 'i'; return a ? a + (b < 0 ? ' - ' : ' + ') + im : (b < 0 ? '-' : '') + im; }
  function mat(a, b, c, d) { return '\\begin{pmatrix}' + a + ' & ' + b + '\\\\' + c + ' & ' + d + '\\end{pmatrix}'; }
  function arg(a, b) { return Math.atan2(b, a); }
  function eig(l1, l2, u) { var v = u + 1; return [l1 * v - l2 * u, l2 - l1, (l1 - l2) * u * v, l2 * v - l1 * u]; }
  function vec(a, b) { return '\\begin{pmatrix}' + a + '\\\\' + b + '\\end{pmatrix}'; }

  X('ib-complex', [
    function () {
      var a = nz(-4, 4), b = nz(-4, 4), r = Math.hypot(a, b), t = arg(a, b);
      return Q(M('z = ' + cx(a, b)) + '.', [
        ['Find ' + M('|z|') + ' and ' + M('\\arg z') + ', and write ' + M('z') + ' in the form ' + M('re^{i\\theta}') + '.', 3, M('|z| = ' + sf3(r)) + ', ' + M('\\arg z = ' + sf3(t)) + ', ' + M('z = ' + sf3(r) + 'e^{' + sf3(t) + 'i}')],
        ['Find ' + M('|z^3|') + ' and ' + M('\\arg z^3') + ' without expanding, and explain.', 2, M(sf3(r * r * r)) + ' and ' + M(sf3(3 * t)) + ' (or the equivalent in ' + M('(-\\pi, \\pi]') + '): moduli multiply, arguments add'],
        ['Verify by expanding ' + M('z^3') + '.', 2, M(cx(a * a * a - 3 * a * b * b, 3 * a * a * b - b * b * b))]
      ]);
    },
    function () {
      var a = nz(-4, 4), b = nz(-4, 4);
      return Q('Let ' + M('z = ' + cx(a, b)) + '.', [
        ['Find ' + M('iz') + ', ' + M('i^2z') + ' and ' + M('i^3z') + '.', 2, M(cx(-b, a) + ',\\ ' + cx(-a, -b) + ',\\ ' + cx(b, -a))],
        ['Show that these four points are the vertices of a square, and find its area.', 3, 'Each is ' + M('z') + ' rotated by 90° about 0; area ' + M('2|z|^2 = ' + 2 * (a * a + b * b))],
        ['Describe the effect of multiplying by ' + M('2i') + '.', 1, 'Rotate by 90° anticlockwise and enlarge by scale factor 2 about the origin']
      ]);
    },
    function () {
      var A = ri(2, 8), B = ri(2, 8), w = pick([2, 3, 50, 100]);
      var R = Math.hypot(A, B), ph = Math.atan2(B, A);
      return Q('Two currents are ' + M(A + '\\sin(' + w + 't)') + ' and ' + M(B + '\\cos(' + w + 't)') + '.', [
        ['Write them as phasors (in the form ' + M('re^{i\\theta}') + ', relative to ' + M('\\sin(' + w + 't)') + ').', 2, M(A) + ' and ' + M(B + 'e^{i\\pi/2}')],
        ['Add the phasors to write the total current as ' + M('R\\sin(' + w + 't + \\phi)') + '.', 3, M('R = ' + sf3(R) + ',\\ \\phi = ' + sf3(ph))],
        ['Explain why the maximum total current is less than ' + (A + B) + '.', 1, 'The two waves do not peak at the same time']
      ]);
    },
    function () {
      var r1 = ri(2, 6), r2 = ri(2, 6), t1 = pick([1, 2, 3, 4, 5]), t2; do { t2 = pick([1, 2, 3, 6]); } while (t2 === t1);
      return Q(M('z_1 = ' + r1 + 'e^{i\\pi/' + (t1 === 1 ? '1' : t1) + '}').replace('/1}', '}') + ' and ' + M('z_2 = ' + r2 + 'e^{i\\pi/' + t2 + '}').replace('/1}', '}') + '.', [
        ['Find ' + M('z_1z_2') + ' and ' + M('\\frac{z_1}{z_2}') + ' in exponential form.', 3, M(r1 * r2 + 'e^{i\\pi(' + F(t1 + t2, t1 * t2) + ')}') + ', ' + M(F(r1, r2) + 'e^{i\\pi(' + F(t2 - t1, t1 * t2) + ')}')],
        ['Write ' + M('z_1z_2') + ' in Cartesian form.', 2, M(cx(+sf3(r1 * r2 * Math.cos(Math.PI * (1 / t1 + 1 / t2))), +sf3(r1 * r2 * Math.sin(Math.PI * (1 / t1 + 1 / t2)))))],
        ['Explain why dividing is easier in exponential form than in Cartesian form.', 1, 'Divide moduli and subtract arguments; no need to multiply by a conjugate']
      ]);
    },
    function () {
      var a = nz(-4, 4), b = nz(-4, 4), re = a * a - b * b, im = 2 * a * b;
      return Q('Find the square roots of ' + M('w = ' + cx(re, im)) + '.', [
        ['Let ' + M('(x + iy)^2 = w') + '. Write two equations in ' + M('x') + ' and ' + M('y') + '.', 2, M('x^2 - y^2 = ' + re) + ', ' + M('2xy = ' + im)],
        ['Solve them.', 3, M('\\pm(' + cx(a, b) + ')')],
        ['Check using moduli: ' + M('|w|') + ' should equal the square of the modulus of each root.', 1, M('|w| = ' + (a * a + b * b))]
      ]);
    },
    function () {
      var x = nz(-5, 5), y = nz(-5, 5);
      return Q('Solve ' + M('z + 2z^* = ' + cx(3 * x, -y)) + ', where ' + M('z^*') + ' is the conjugate of ' + M('z') + '.', [
        ['Write ' + M('z = a + bi') + ' and form two equations.', 2, M('3a = ' + 3 * x) + ', ' + M('-b = ' + (-y))],
        ['Find ' + M('z') + '.', 1, M('z = ' + cx(x, y))],
        ['Show that ' + M('zz^*') + ' is always real and non-negative.', 2, M('(a + bi)(a - bi) = a^2 + b^2')]
      ]);
    },
    function () {
      var R = ri(3, 12), Xr = nz(-8, 8), V = pick([12, 24, 230]);
      var Z = Math.hypot(R, Xr);
      return Q('A circuit has impedance ' + M('Z = ' + cx(R, Xr)) + ' ohms and voltage ' + V + ' V (taken as real).', [
        ['Find ' + M('|Z|') + ' and ' + M('\\arg Z') + '.', 2, sf3(Z) + ' Ω, ' + sf3(Math.atan2(Xr, R)) + ' rad'],
        ['Find the current ' + M('I = \\frac{V}{Z}') + ' in Cartesian form.', 3, M(cx(+sf3(V * R / (Z * Z)), +sf3(-V * Xr / (Z * Z)))) + ' A'],
        ['Find the magnitude of the current, and the phase difference between current and voltage.', 2, sf3(V / Z) + ' A; ' + sf3(Math.abs(Math.atan2(Xr, R))) + ' rad']
      ]);
    },
    function () {
      var n = ri(5, 12);
      var m = Math.pow(Math.SQRT2, n), ang = n * Math.PI / 4;
      return Q('Consider ' + M('w = 1 + i') + '.', [
        ['Write ' + M('w') + ' in the form ' + M('re^{i\\theta}') + '.', 1, M('\\sqrt{2}e^{i\\pi/4}')],
        ['Find ' + M('w^{' + n + '}') + ' in Cartesian form.', 3, M(cx(Math.round(m * Math.cos(ang)), Math.round(m * Math.sin(ang))))],
        ['For which positive integers ' + M('n') + ' is ' + M('w^n') + ' real?', 2, 'Multiples of 4']
      ]);
    },
    function () {
      var a = ri(-3, 3), b = ri(-3, 3), r = ri(1, 4);
      var d = Math.hypot(a, b);
      return Q('The set of points ' + M('z') + ' with ' + M('|z - (' + cx(a, b) + ')| = ' + r) + ' is drawn on an Argand diagram.', [
        ['Describe the set.', 1, 'A circle centre ' + M(cx(a, b)) + ', radius ' + r],
        ['Find the greatest and least values of ' + M('|z|') + ' on it.', 2, sf3(d + r) + ' and ' + sf3(Math.abs(d - r))],
        ['Explain your method.', 1, 'Distances from the origin are greatest/least along the line through the origin and the centre']
      ]);
    },
    function () {
      var r1 = ri(2, 5), r2 = ri(2, 5), d1 = pick([30, 45, 60, 90]), d2 = pick([30, 45, 60, 120]);
      return Q('Multiplying by ' + M('z_1 = ' + r1 + 'e^{i\\pi \\times ' + F(d1, 180) + '}') + ' and then by ' + M('z_2 = ' + r2 + 'e^{i\\pi \\times ' + F(d2, 180) + '}') + ' transforms points in the Argand plane.', [
        ['Describe each transformation.', 2, 'Enlargement ' + r1 + ' with rotation ' + d1 + '°; enlargement ' + r2 + ' with rotation ' + d2 + '° (about 0)'],
        ['Describe the single combined transformation.', 2, 'Enlargement ' + r1 * r2 + ' with rotation ' + (d1 + d2) + '°'],
        ['How many times must the combined transformation be applied to return a point’s direction to its original argument?', 2, 360 / gcd(360, d1 + d2)]
      ]);
    }
  ]);

  X('ib-matrices', [
    function () {
      var x = nz(-3, 3), y = nz(-3, 3), z = nz(-3, 3);
      return Q('Solve ' + M('x + 2y - z = ' + (x + 2 * y - z)) + ', ' + M('2x - y + 3z = ' + (2 * x - y + 3 * z)) + ', ' + M('3x + y + z = ' + (3 * x + y + z)) + '.', [
        ['Write the system as ' + M('A\\mathbf{x} = \\mathbf{b}') + '.', 1, M('A = \\begin{pmatrix}1&2&-1\\\\2&-1&3\\\\3&1&1\\end{pmatrix}')],
        ['Find ' + M('\\det A') + ' and explain why there is a unique solution.', 2, M('\\det A = 5 \\ne 0')],
        ['Use ' + M('A^{-1}') + ' to solve.', 2, M('x = ' + x + ',\\ y = ' + y + ',\\ z = ' + z)]
      ]);
    },
    function () {
      var a = nz(-3, 3), b = nz(-3, 3), c = nz(-3, 3), d = nz(-3, 3);
      var t = a + d, det = a * d - b * c;
      return Q(M('A = ' + mat(a, b, c, d)) + '.', [
        ['Show that ' + M('A^2 = ' + (function () { var s1 = t ? (t === 1 ? '' : t === -1 ? '-' : t) + 'A' : ''; var s2 = det ? (det > 0 ? (s1 ? ' - ' : '-') : (s1 ? ' + ' : '')) + (Math.abs(det) === 1 ? '' : Math.abs(det)) + 'I' : ''; return (s1 + s2) || '0'; })()) + '.', 3, M('A^2 = ' + mat(a * a + b * c, a * b + b * d, c * a + d * c, c * b + d * d))],
        ['Hence express ' + M('A^3') + ' in the form ' + M('pA + qI') + '.', 2, M('A^3 = ' + (t * t - det === 1 ? '' : t * t - det === -1 ? '-' : t * t - det) + 'A' + (t * det ? S(-t * det) + 'I' : ''))],
        ['If ' + M('A') + ' is invertible, express ' + M('A^{-1}') + ' in terms of ' + M('A') + ' and ' + M('I') + '.', 2, det ? M('A^{-1} = \\frac{1}{' + det + '}(' + t + 'I - A)') : 'Not invertible: ' + M('\\det A = 0')]
      ]);
    },
    function () {
      var p = nz(-4, 4), q; do { q = nz(-4, 4); } while (q === p);
      return Q('Let ' + M('D = ' + mat(p, 0, 0, q)) + ' and ' + M('B = ' + mat('a', 'b', 'c', 'd')) + '.', [
        ['Find ' + M('DB') + ' and ' + M('BD') + '.', 2, M(mat(p + 'a', p + 'b', q + 'c', q + 'd')) + ' and ' + M(mat(p + 'a', q + 'b', p + 'c', q + 'd'))],
        ['Find the conditions for ' + M('DB = BD') + '.', 2, M('b = c = 0')],
        ['What does this show about matrix multiplication in general?', 1, 'It is not commutative']
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(1, 4), k = a * b + ri(1, 3);
      return Q(M('A = ' + mat('k', a, b, 1)) + '.', [
        ['Find ' + M('\\det A') + ' in terms of ' + M('k') + '.', 1, M('k - ' + a * b)],
        ['For which value of ' + M('k') + ' is ' + M('A') + ' singular?', 1, M('k = ' + a * b)],
        ['When ' + M('k = ' + k) + ', find ' + M('A^{-1}') + '.', 2, M('\\frac{1}{' + (k - a * b) + '}' + mat(1, -a, -b, k))]
      ]);
    },
    function () {
      var q = [ri(10, 30), ri(10, 30), ri(10, 30)], p = [ri(2, 6), ri(3, 9)], c = [ri(1, 4), ri(1, 4), ri(1, 4)];
      return Q('A café sells ' + q[0] + ' teas, ' + q[1] + ' coffees and ' + q[2] + ' cakes on Monday. Each costs £' + c.join(', £') + ' respectively to make.', [
        ['Write the quantities as a row matrix and the costs as a column matrix, and find their product.', 2, '£' + (q[0] * c[0] + q[1] * c[1] + q[2] * c[2])],
        ['Explain why the matrices must be in that order.', 1, 'A 1×3 times a 3×1 gives a 1×1 total; the other order gives a 3×3'],
        ['Tuesday’s quantities are 10% higher. Write Tuesday’s total cost as a scalar multiple.', 1, '£' + sf3(1.1 * (q[0] * c[0] + q[1] * c[1] + q[2] * c[2]))]
      ]);
    },
    function () {
      var A = [nz(-3, 3), nz(-3, 3), nz(-3, 3), nz(-3, 3)], B = [nz(-3, 3), nz(-3, 3), nz(-3, 3), nz(-3, 3)];
      var dA = A[0] * A[3] - A[1] * A[2], dB = B[0] * B[3] - B[1] * B[2];
      if (!dA) A[3]++; if (!dB) B[3]++;
      dA = A[0] * A[3] - A[1] * A[2]; dB = B[0] * B[3] - B[1] * B[2];
      return Q(M('A = ' + mat(A[0], A[1], A[2], A[3])) + ' and ' + M('B = ' + mat(B[0], B[1], B[2], B[3])) + '.', [
        ['Find ' + M('\\det A') + ', ' + M('\\det B') + ' and ' + M('\\det(AB)') + '.', 2, dA + ', ' + dB + ', ' + dA * dB],
        ['Prove that ' + M('(AB)^{-1} = B^{-1}A^{-1}') + '.', 2, M('(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = I')],
        ['Explain why ' + M('A^{-1}B^{-1}') + ' is usually wrong.', 1, 'Matrix multiplication is not commutative, so the order matters']
      ]);
    },
    function () {
      var A = [ri(1, 4), ri(1, 3), ri(1, 3), ri(1, 4)]; if (A[0] * A[3] - A[1] * A[2] === 0) A[3]++;
      var det = A[0] * A[3] - A[1] * A[2], Xm = [nz(-3, 3), nz(-3, 3), nz(-3, 3), nz(-3, 3)];
      var B = [Xm[0] * A[0] + Xm[1] * A[2], Xm[0] * A[1] + Xm[1] * A[3], Xm[2] * A[0] + Xm[3] * A[2], Xm[2] * A[1] + Xm[3] * A[3]];
      return Q('Solve ' + M('XA = B') + ' where ' + M('A = ' + mat(A[0], A[1], A[2], A[3])) + ' and ' + M('B = ' + mat(B[0], B[1], B[2], B[3])) + '.', [
        ['Explain whether to multiply by ' + M('A^{-1}') + ' on the left or the right.', 1, 'On the right: ' + M('X = BA^{-1}')],
        ['Find ' + M('X') + '.', 3, M(mat(Xm[0], Xm[1], Xm[2], Xm[3]))],
        ['Would ' + M('A^{-1}B') + ' give the same answer? Explain.', 1, 'Not in general: the order of multiplication matters']
      ]);
    },
    function () {
      var n = ri(4, 8), f = [0, 1]; for (var i = 2; i <= n + 1; i++) f.push(f[i - 1] + f[i - 2]);
      return Q('Let ' + M('F = ' + mat(1, 1, 1, 0)) + '.', [
        ['Find ' + M('F^2') + ' and ' + M('F^3') + '.', 2, M(mat(2, 1, 1, 1)) + ', ' + M(mat(3, 2, 2, 1))],
        ['Use technology to find ' + M('F^{' + n + '}') + ' and describe the pattern.', 2, M(mat(f[n + 1], f[n], f[n], f[n - 1])) + ': Fibonacci numbers'],
        ['Use determinants to show that ' + M('f_{n+1}f_{n-1} - f_n^2 = (-1)^n') + '.', 2, M('\\det F^n = (\\det F)^n = (-1)^n')]
      ]);
    },
    function () {
      var a = [ri(100, 300), ri(80, 200), ri(50, 150)];
      var Lm = [[0, 1.2, 0.8], [0.6, 0, 0], [0, 0.7, 0]];
      var nx = Lm.map(function (r) { return r[0] * a[0] + r[1] * a[1] + r[2] * a[2]; });
      return Q('A population has ' + a.join(', ') + ' animals in age groups 0–1, 1–2 and 2–3 years. The Leslie matrix is ' + M('L = \\begin{pmatrix}0&1.2&0.8\\\\0.6&0&0\\\\0&0.7&0\\end{pmatrix}') + '.', [
        ['Interpret the entries 1.2 and 0.6.', 2, 'Each 1–2-year-old produces 1.2 young per year; 60% of 0–1-year-olds survive'],
        ['Find the population in each group after one year.', 2, nx.map(sf3).join(', ')],
        ['Use technology to find the long-term growth rate (dominant eigenvalue) and interpret it.', 2, 'About ' + sf3((function () { var v = a.slice(); for (var k = 0; k < 200; k++) { var w = Lm.map(function (r) { return r[0] * v[0] + r[1] * v[1] + r[2] * v[2]; }); var s = w[0] + w[1] + w[2], s0 = v[0] + v[1] + v[2]; v = w.map(function (x) { return x / s; }); if (k === 199) return s / s0; } })()) + ': the population eventually grows by this factor each year']
      ]);
    },
    function () {
      var k = ri(1, 4), c = ri(1, 9);
      return Q('Consider the system ' + M('x + ' + k + 'y = 3') + ', ' + M('2x + ' + 2 * k + 'y = c') + '.', [
        ['Show the coefficient matrix is singular.', 1, M('\\det = ' + 2 * k + ' - ' + 2 * k + ' = 0')],
        ['For which value of ' + M('c') + ' are there infinitely many solutions? Explain.', 2, M('c = 6') + ': the second equation is twice the first'],
        ['When ' + M('c = ' + (c === 6 ? 7 : c)) + ', how many solutions are there? Explain geometrically.', 1, 'None: two parallel lines']
      ]);
    }
  ]);

  X('ib-eigen', [
    function () {
      var l1 = nz(-3, 4), l2; do { l2 = nz(-3, 5); } while (l2 === l1); var u = ri(-2, 2);
      var A = eig(l1, l2, u);
      return Q(M('A = ' + mat(A[0], A[1], A[2], A[3])) + '.', [
        ['Find the characteristic equation and the eigenvalues.', 3, M(poly([1, -(l1 + l2), l1 * l2]).replace(/x/g, '\\lambda') + ' = 0') + '; ' + M('\\lambda = ' + l1 + ', ' + l2)],
        ['Find an eigenvector for each eigenvalue.', 3, M(vec(1, u)) + ' and ' + M(vec(1, u + 1))],
        ['Check that the trace and determinant equal the sum and product of the eigenvalues.', 1, (l1 + l2) + ' and ' + l1 * l2]
      ]);
    },
    function () {
      var l1 = pick([2, 3]), l2 = pick([-1, 1]), u = ri(-1, 1), n = ri(4, 7);
      var A = eig(l1, l2, u), v = u + 1;
      var a1 = Math.pow(l1, n), a2 = Math.pow(l2, n);
      var An = [a1 * v - a2 * u, a2 - a1, (a1 - a2) * u * v, a2 * v - a1 * u];
      return Q(M('A = ' + mat(A[0], A[1], A[2], A[3])) + ' has eigenvalues ' + l1 + ' and ' + l2 + ' with eigenvectors ' + M(vec(1, u)) + ' and ' + M(vec(1, v)) + '.', [
        ['Write ' + M('A = PDP^{-1}') + ', giving ' + M('P') + ' and ' + M('D') + '.', 2, M('P = ' + mat(1, 1, u, v)) + ', ' + M('D = ' + mat(l1, 0, 0, l2))],
        ['Find ' + M('A^{' + n + '}') + '.', 3, M(mat(An[0], An[1], An[2], An[3]))],
        ['Explain why diagonalising makes powers easy to compute.', 1, M('A^n = PD^nP^{-1}') + ' and ' + M('D^n') + ' just raises the diagonal entries to the power ' + M('n')]
      ]);
    },
    function () {
      var p = pick([0.1, 0.2, 0.3]), q = pick([0.2, 0.3, 0.4]);
      return Q('A transition matrix is ' + M('T = ' + mat(1 - p, q, p, 1 - q)) + ' (columns sum to 1).', [
        ['Show that 1 is an eigenvalue.', 1, M('\\det(T - I) = ' + '(-' + p + ')(-' + q + ') - ' + q + '\\times' + p + ' = 0')],
        ['Find the steady-state vector.', 3, M(vec(sf3(q / (p + q)), sf3(p / (p + q))))],
        ['Find the other eigenvalue and explain why the system converges.', 2, sf3(1 - p - q) + ': its magnitude is less than 1, so that component decays']
      ]);
    },
    function () {
      var a = nz(-4, 4), d; do { d = nz(-4, 4); } while (d === a); var b = nz(-4, 4);
      return Q(M('A = ' + mat(a, b, 0, d)) + ' is upper triangular.', [
        ['Find the eigenvalues, and explain why they can be read off directly.', 2, a + ' and ' + d + ': ' + M('\\det(A - \\lambda I) = (' + a + ' - \\lambda)(' + d + ' - \\lambda)')],
        ['Find an eigenvector for each.', 3, M(vec(1, 0)) + ' and ' + M(vec(b, d - a))],
        ['Describe the invariant lines through the origin.', 1, 'The lines in the directions of the eigenvectors']
      ]);
    },
    function () {
      var l1 = ri(2, 4), l2 = -ri(1, 2), u = ri(-1, 1);
      var A = eig(l1, l2, u);
      return Q('The transformation ' + M(mat(A[0], A[1], A[2], A[3])) + ' has eigenvectors ' + M(vec(1, u)) + ' and ' + M(vec(1, u + 1)) + '.', [
        ['Find the eigenvalues.', 2, l1 + ' and ' + l2],
        ['Describe what the transformation does to points on each eigenvector line.', 2, 'Stretches by ' + l1 + ' along the first; scales by ' + l2 + ' (reversing direction) along the second'],
        ['Find the area scale factor.', 1, Math.abs(l1 * l2)]
      ]);
    },
    function () {
      var l = nz(-3, 3), b = nz(-3, 3);
      return Q(M('A = ' + mat(l, b, 0, l)) + '.', [
        ['Show that ' + M('A') + ' has a repeated eigenvalue.', 1, M('(\\lambda - ' + l + ')^2 = 0').replace('- -', '+ ')],
        ['Find all eigenvectors.', 2, 'Multiples of ' + M(vec(1, 0)) + ' only'],
        ['Explain why ' + M('A') + ' cannot be diagonalised.', 1, 'There are not two independent eigenvectors']
      ]);
    },
    function () {
      var l1 = nz(-3, 3), l2; do { l2 = nz(-3, 4); } while (l2 === l1); var u = ri(-1, 1);
      var A = eig(l1, l2, u);
      return Q(M('A = ' + mat(A[0], A[1], A[2], A[3])) + ' has eigenvalues ' + l1 + ' and ' + l2 + '.', [
        ['Write down the eigenvalues of ' + M('A^2') + ' and ' + M('A^{-1}') + '.', 2, (l1 * l1) + ', ' + (l2 * l2) + '; ' + M(F(1, l1) + ', ' + F(1, l2))],
        ['Prove that if ' + M('A\\mathbf{v} = \\lambda\\mathbf{v}') + ' then ' + M('A^2\\mathbf{v} = \\lambda^2\\mathbf{v}') + '.', 2, M('A^2\\mathbf{v} = A(\\lambda\\mathbf{v}) = \\lambda A\\mathbf{v} = \\lambda^2\\mathbf{v}')],
        ['Find the eigenvalues of ' + M('A + 3I') + '.', 1, (l1 + 3) + ' and ' + (l2 + 3)]
      ]);
    },
    function () {
      var a = pick([1.2, 1.5, 0.9]);
      return Q('A population model ' + M('\\mathbf{x}_{n+1} = L\\mathbf{x}_n') + ' has dominant eigenvalue ' + a + ' with eigenvector ' + M(vec(3, 2)) + '.', [
        ['Describe the long-term behaviour of the total population.', 2, a > 1 ? 'Grows by ' + Math.round((a - 1) * 100) + '% per time step' : 'Declines by ' + Math.round((1 - a) * 100) + '% per time step'],
        ['Describe the long-term age structure.', 1, 'The groups settle in the ratio 3 : 2'],
        ['Suggest one limitation of the model.', 1, 'Fixed rates ignore limits on food or space']
      ]);
    },
    function () {
      var l1 = nz(-4, 4), l2 = nz(-4, 4), u = ri(-1, 1);
      var A = eig(l1, l2, u);
      return Q(M('A = ' + mat(A[0], A[1], A[2], A[3])) + '.', [
        ['Find the trace and determinant.', 1, (A[0] + A[3]) + ' and ' + (A[0] * A[3] - A[1] * A[2])],
        ['Without solving, find the sum and product of the eigenvalues.', 1, (l1 + l2) + ' and ' + l1 * l2],
        ['Hence find the eigenvalues.', 2, l1 === l2 ? l1 + ' (repeated)' : l1 + ' and ' + l2]
      ]);
    },
    function () {
      var l1 = 2, l2 = pick([0.5, -0.5]);
      return Q('A matrix ' + M('A') + ' has eigenvalues 2 and ' + l2 + ' with eigenvectors ' + M('\\mathbf{v}_1') + ' and ' + M('\\mathbf{v}_2') + '. A vector ' + M('\\mathbf{x} = 3\\mathbf{v}_1 + 4\\mathbf{v}_2') + '.', [
        ['Find ' + M('A^{n}\\mathbf{x}') + ' in terms of ' + M('\\mathbf{v}_1') + ' and ' + M('\\mathbf{v}_2') + '.', 2, M('3 \\times 2^n\\mathbf{v}_1 + 4(' + l2 + ')^n\\mathbf{v}_2')],
        ['Describe the direction of ' + M('A^n\\mathbf{x}') + ' for large ' + M('n') + '.', 2, 'Close to the direction of ' + M('\\mathbf{v}_1') + ': the other term shrinks'],
        ['Find the ratio of the lengths of ' + M('A^{n+1}\\mathbf{x}') + ' and ' + M('A^n\\mathbf{x}') + ' for large ' + M('n') + '.', 1, 'Approximately 2']
      ]);
    }
  ]);

  X('ib-logistic', [
    function () {
      var L = pick([500, 1000, 2000]), C = pick([9, 19, 49, 99]), k = pick([0.2, 0.3, 0.5]);
      return Q('A population follows ' + M('P = \\frac{' + L + '}{1 + ' + C + 'e^{-' + k + 't}}') + '.', [
        ['Find the initial population and the carrying capacity.', 2, num(L / (1 + C)) + ' and ' + L],
        ['Find when the population reaches half the carrying capacity.', 2, M('t = \\frac{\\ln ' + C + '}{' + k + '} = ' + sf3(Math.log(C) / k))],
        ['Find when it reaches 90% of the carrying capacity.', 2, M('t = \\frac{\\ln ' + 9 * C + '}{' + k + '} = ' + sf3(Math.log(9 * C) / k))]
      ]);
    },
    function () {
      var L = pick([400, 800, 1200]), P0 = pick([20, 40, 50]), k = pick([0.1, 0.25, 0.4]);
      var C = L / P0 - 1;
      return Q('A logistic model has carrying capacity ' + L + ', initial value ' + P0 + ' and growth constant ' + k + '.', [
        ['Find ' + M('C') + ' in ' + M('P = \\frac{L}{1 + Ce^{-kt}}') + '.', 2, num(C)],
        ['Find ' + M('P') + ' after 10 units of time.', 1, sf3(L / (1 + C * Math.exp(-10 * k)))],
        ['Explain why ' + M('P') + ' never exceeds ' + L + ' in this model.', 1, M('1 + Ce^{-kt} > 1')]
      ]);
    },
    function () {
      var L = pick([1000, 5000]), k = pick([0.2, 0.4]);
      return Q('A population satisfies ' + M('\\frac{dP}{dt} = ' + k + 'P\\left(1 - \\frac{P}{' + L + '}\\right)') + '.', [
        ['Find the population at which the growth rate is greatest, and that rate.', 3, L / 2 + '; ' + sf3(k * L / 4) + ' per unit time'],
        ['Explain what happens to the growth rate when ' + M('P') + ' is very small, and when it is near ' + L + '.', 2, 'Approximately ' + k + 'P (exponential); close to 0'],
        ['Explain how this relates to the shape of the graph of ' + M('P') + '.', 1, 'S-shaped, with the point of inflection at ' + M('P = ' + L / 2)]
      ]);
    },
    function () {
      var L = 1000, C = pick([9, 19, 39]), k = pick([0.3, 0.5]);
      return Q('A model ' + M('P = \\frac{1000}{1 + ' + C + 'e^{-' + k + 't}}') + ' is compared with the exponential model ' + M('Q = ' + num(L / (1 + C)) + 'e^{' + k + 't}') + '.', [
        ['Show that they have the same value at ' + M('t = 0') + '.', 1, num(L / (1 + C))],
        ['Compare the models at ' + M('t = 2') + ' and ' + M('t = 15') + '.', 2, (function () { var p = function (t) { return L / (1 + C * Math.exp(-k * t)); }, q = function (t) { return L / (1 + C) * Math.exp(k * t); }; return 't = 2: ' + sf3(p(2)) + ' vs ' + sf3(q(2)) + '; t = 15: ' + sf3(p(15)) + ' vs ' + sf3(q(15)); })()],
        ['Explain when the exponential model is a reasonable approximation.', 1, 'Early on, while ' + M('P') + ' is small compared with the carrying capacity']
      ]);
    },
    function () {
      var L = 800, C = 15, k = 0.4;
      return Q('Data for a population are modelled by ' + M('P = \\frac{L}{1 + Ce^{-kt}}') + '.', [
        ['Show that ' + M('\\ln\\left(\\frac{L}{P} - 1\\right) = \\ln C - kt') + '.', 2, 'Rearrange: ' + M('\\frac{L}{P} - 1 = Ce^{-kt}') + ', then take logs'],
        ['Given ' + M('L = ' + L) + ', explain how plotting ' + M('\\ln\\left(\\frac{L}{P} - 1\\right)') + ' against ' + M('t') + ' gives ' + M('C') + ' and ' + M('k') + '.', 2, 'Straight line: gradient ' + M('-k') + ', intercept ' + M('\\ln C')],
        ['The line has gradient ' + (-k) + ' and intercept ' + sf3(Math.log(C)) + '. Find the model.', 1, M('P = \\frac{' + L + '}{1 + ' + C + 'e^{-' + k + 't}}')]
      ]);
    },
    function () {
      var L = pick([600, 1000]), C = pick([4, 9]), k = pick([0.2, 0.5]);
      var t = Math.log(C) / k;
      return Q('For ' + M('P = \\frac{' + L + '}{1 + ' + C + 'e^{-' + k + 't}}') + ':', [
        ['Find the time of the point of inflection.', 2, sf3(t)],
        ['Find the gradient at that time.', 2, sf3(k * L / 4)],
        ['Explain the significance of this point in context.', 1, 'The population is growing fastest; after this the growth slows']
      ]);
    },
    function () {
      var L = 1000, P0 = pick([50, 100]), P1 = pick([200, 300]), t1 = pick([4, 5]);
      var C = L / P0 - 1, k = -Math.log((L / P1 - 1) / C) / t1;
      return Q('A population with carrying capacity 1000 grows from ' + P0 + ' to ' + P1 + ' in ' + t1 + ' years, following a logistic model.', [
        ['Find ' + M('C') + '.', 1, num(C)],
        ['Find ' + M('k') + '.', 3, M('k = \\frac{1}{' + t1 + '}\\ln\\frac{' + num(C) + '}{' + F(L - P1, P1) + '} = ' + sf3(k))],
        ['Predict the population after 20 years.', 1, sf3(L / (1 + C * Math.exp(-20 * k)))]
      ]);
    },
    function () {
      return Q('Evaluating a logistic model.', [
        ['Give two reasons why a real population might not follow a logistic curve exactly.', 2, 'Environmental changes; disease; seasonal effects; the carrying capacity may change'],
        ['Explain why a logistic model is more realistic than an exponential one for long-term predictions.', 1, 'It includes a limit to growth'],
        ['Give a context other than population where a logistic model is used.', 1, 'Spread of a rumour, a disease, or adoption of a new technology']
      ]);
    },
    function () {
      var L = pick([100, 500]), k = pick([0.2, 0.3]);
      return Q('A rumour spreads through a school of ' + L + ' students according to a logistic model with ' + M('k = ' + k) + ' per hour, starting from 1 student.', [
        ['Write the model.', 2, M('N = \\frac{' + L + '}{1 + ' + (L - 1) + 'e^{-' + k + 't}}')],
        ['Find when half the school knows.', 2, sf3(Math.log(L - 1) / k) + ' hours'],
        ['Find when all but 1 student knows, and comment.', 2, sf3(2 * Math.log(L - 1) / k) + ' hours: twice as long, by symmetry of the curve']
      ]);
    },
    function () {
      var L = pick([400, 900]), C = pick([3, 8]);
      return Q('The logistic curve ' + M('P = \\frac{' + L + '}{1 + ' + C + 'e^{-kt}}') + ' is symmetric about its point of inflection.', [
        ['Find ' + M('P(0)') + '.', 1, sf3(L / (1 + C))],
        ['Use the symmetry to write down the value of ' + M('P') + ' at twice the time of the point of inflection.', 2, sf3(L - L / (1 + C))],
        ['Verify algebraically using ' + M('t = \\frac{2\\ln ' + C + '}{k}') + '.', 2, M('e^{-kt} = \\frac{1}{' + C * C + '}') + ', so ' + M('P = \\frac{' + L + '}{1 + \\frac{1}{' + C + '}} = ' + sf3(L * C / (C + 1)))]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
