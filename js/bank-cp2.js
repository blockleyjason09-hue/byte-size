/* Byte Size Classroom — Pearson Edexcel A level Further Mathematics: Core Pure Mathematics, Year 2 content.
   Difficulty: 1 = Standard, 2 = Exam, 3 = Challenging (extension questions). */
(function (g) {
  var BS = g.BS, A = BS.fa, M = BS.m;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num;
  var Q = A.Q, sf3 = A.sf3, S = A.S, S0 = A.S0, c1 = A.c1, xm = A.xm, cx = A.cx, lin = A.lin, piF = A.piF, rt = A.rt;
  var X = BS.ext, T = BS.topic, Cn = BS.concept, Sr = String.raw;
  // exact cos and sin of k*pi/6 as [integer part, sqrt3 part] numerators over 2
  var COS6 = [[2, 0], [0, 1], [1, 0], [0, 0], [-1, 0], [0, -1], [-2, 0], [0, -1], [-1, 0], [0, 0], [1, 0], [0, 1]];
  function sin6(k) { return COS6[((3 - k) % 12 + 12) % 12]; }
  function cos6(k) { return COS6[((k % 12) + 12) % 12]; }
  function half(v, m) { /* m*(v[0] + v[1]sqrt3)/2 */ var a = m * v[0] / 2, b = m * v[1] / 2; if (!b) return String(a); var s3 = (Math.abs(b) === 1 ? '' : Math.abs(b)) + '\\sqrt{3}'; return a ? a + (b < 0 ? ' - ' : ' + ') + s3 : (b < 0 ? '-' : '') + s3; }
  function cplx(re, im) { if (im === '0') return re; var neg = im.charAt(0) === '-', imv = neg ? im.slice(1) : im; var t = (imv === '1' ? '' : imv) + 'i'; if (re === '0') return (neg ? '-' : '') + t; return re + (neg ? ' - ' : ' + ') + t; }
  function argN(n, d) { var k = ((n % (2 * d)) + 2 * d) % (2 * d); if (k > d) k -= 2 * d; return piF(k, d); }

  /* ---------------- Complex numbers 2 ---------------- */
  T({ id: 'cp-complex2', name: 'Complex numbers: exponential form, de Moivre and roots', video: 'further maths de moivre theorem complex roots exponential form', gens: [
    { d: [1], f: function () {
      var n = ri(3, 9), m = Math.pow(2, n);
      return Q('Let ' + M('z = \\sqrt{3} + i') + '.', [
        ['Write ' + M('z') + ' in the form ' + M('re^{i\\theta}') + '.', 2, M('2e^{i\\pi/6}')],
        ['Use de Moivre’s theorem to find ' + M('z^{' + n + '}') + ' in the form ' + M('a + bi') + '.', 3, M(cplx(half(cos6(n), m), half(sin6(n), m)))],
        ['Find the smallest positive ' + M('n') + ' for which ' + M('z^n') + ' is real.', 1, 6]
      ]);
    } },
    { d: [1, 2], f: function () {
      var n = pick([3, 4]), c = pick([1, 2]), w = pick([[1, 2, 'i'], [0, 1, ''], [1, 1, '-'], [-1, 2, '-i']]);
      var R = Math.pow(c, n), Ri = R === 1 ? '' : R, wtxt = w[2] === 'i' ? Ri + 'i' : w[2] === '-i' ? '-' + Ri + 'i' : w[2] === '-' ? '-' + R : String(R);
      var args = []; for (var k = 0; k < n; k++) args.push(argN(w[0] + 2 * k * w[1], w[1] * n));
      return Q('Solve ' + M('z^' + n + ' = ' + wtxt) + '.', [
        ['Write the right-hand side in exponential form.', 1, M(Ri + 'e^{' + (w[0] ? piF(w[0], w[1]) + 'i' : '0') + '}')],
        ['Find all the roots in the form ' + M('re^{i\\theta}') + ', ' + M('-\\pi < \\theta \\le \\pi') + '.', 4, args.map(function (a) { return M((c === 1 ? '' : c) + 'e^{' + (a === '0' ? '0' : a + 'i') + '}'); }).join(', ')],
        ['Describe the shape formed by the roots on an Argand diagram.', 1, 'The vertices of ' + (n === 3 ? 'an equilateral triangle' : 'a square') + ' centred at the origin']
      ]);
    } },
    { d: [2], f: function () {
      var k = pick([3, 4]);
      return Q('Use de Moivre’s theorem.', [
        ['Show that ' + (k === 3 ? M('\\cos 3\\theta = 4\\cos^3\\theta - 3\\cos\\theta') : M('\\cos 4\\theta = 8\\cos^4\\theta - 8\\cos^2\\theta + 1')) + '.', 4, 'Expand ' + M('(\\cos\\theta + i\\sin\\theta)^' + k) + ' and take real parts, using ' + M('\\sin^2\\theta = 1 - \\cos^2\\theta')],
        ['Hence solve ' + (k === 3 ? M('4x^3 - 3x = \\frac{1}{2}') : M('8x^4 - 8x^2 + 1 = 0')) + ', giving answers as cosines.', 3, k === 3 ? M('x = \\cos\\frac{\\pi}{9}, \\cos\\frac{5\\pi}{9}, \\cos\\frac{7\\pi}{9}') : M('x = \\pm\\cos\\frac{\\pi}{8}, \\pm\\cos\\frac{3\\pi}{8}')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var k = pick([3, 4]);
      return Q('Let ' + M('z = \\cos\\theta + i\\sin\\theta') + '.', [
        ['Show that ' + M('z^n + \\frac{1}{z^n} = 2\\cos n\\theta') + '.', 2, M('z^{-n} = \\cos n\\theta - i\\sin n\\theta')],
        ['Hence express ' + M('\\cos^' + k + '\\theta') + ' in terms of cosines of multiple angles.', 4, k === 3 ? M('\\frac{1}{4}(\\cos 3\\theta + 3\\cos\\theta)') : M('\\frac{1}{8}(\\cos 4\\theta + 4\\cos 2\\theta + 3)')],
        ['Find ' + M('\\int_0^{\\pi/2}\\cos^' + k + '\\theta\\,d\\theta') + '.', 2, k === 3 ? M('\\frac{2}{3}') : M('\\frac{3\\pi}{16}')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var n = ri(5, 8);
      return Q('The ' + n + 'th roots of unity are ' + M('1, \\omega, \\omega^2, \\ldots, \\omega^{' + (n - 1) + '}') + ', where ' + M('\\omega = e^{2\\pi i/' + n + '}') + '.', [
        ['Show that ' + M('1 + \\omega + \\cdots + \\omega^{' + (n - 1) + '} = 0') + '.', 3, 'Geometric series: ' + M('\\frac{\\omega^' + n + ' - 1}{\\omega - 1} = 0') + ' since ' + M('\\omega^' + n + ' = 1')],
        ['Hence find ' + M('\\sum_{k=0}^{' + (n - 1) + '}\\cos\\frac{2\\pi k}{' + n + '}') + '.', 1, 0],
        ['Find ' + M('\\omega^{' + (n + 2) + '}') + ' as a power of ' + M('\\omega') + '.', 1, M('\\omega^2')]
      ]);
    } }
  ] });
  X('cp-complex2', [
    function () {
      var n = pick([4, 6, 8, 10]);
      return Q('Let ' + M('z = 1 + i') + '.', [
        ['Write ' + M('z') + ' in exponential form.', 1, M('\\sqrt{2}e^{i\\pi/4}')],
        ['Find ' + M('z^{' + n + '}') + '.', 3, M(cx(Math.round(Math.pow(2, n / 2) * Math.cos(n * Math.PI / 4)), Math.round(Math.pow(2, n / 2) * Math.sin(n * Math.PI / 4))))],
        ['Find ' + M('(1 + i)^{' + n + '} + (1 - i)^{' + n + '}') + '.', 2, 2 * Math.round(Math.pow(2, n / 2) * Math.cos(n * Math.PI / 4))]
      ]);
    },
    function () {
      return Q('Show that ' + M('\\sin 5\\theta = 16\\sin^5\\theta - 20\\sin^3\\theta + 5\\sin\\theta') + '.', [
        ['Use ' + M('(\\cos\\theta + i\\sin\\theta)^5') + ' and take imaginary parts.', 3, M('5c^4s - 10c^2s^3 + s^5')],
        ['Replace ' + M('c^2') + ' by ' + M('1 - s^2') + ' to complete the proof.', 3, M('5s(1 - s^2)^2 - 10s^3(1 - s^2) + s^5')],
        ['Hence find the exact value of ' + M('\\sin^2\\frac{\\pi}{5}') + '.', 2, M('16s^4 - 20s^2 + 5 = 0') + ': ' + M('s^2 = \\frac{5 - \\sqrt{5}}{8}')]
      ]);
    },
    function () {
      var n = ri(4, 8);
      return Q('Let ' + M('S = \\sum_{k=0}^{' + (n - 1) + '} e^{ik\\theta}') + ' for ' + M('\\theta') + ' not a multiple of ' + M('2\\pi') + '.', [
        ['Use the geometric series formula to write ' + M('S') + '.', 2, M('\\frac{e^{i' + n + '\\theta} - 1}{e^{i\\theta} - 1}')],
        ['Show that ' + M('S = e^{i' + frac(n - 1, 2) + '\\theta}\\frac{\\sin(' + frac(n, 2) + '\\theta)}{\\sin(\\theta/2)}') + '.', 4, 'Factor ' + M('e^{in\\theta/2}') + ' and ' + M('e^{i\\theta/2}') + ' from top and bottom'],
        ['Deduce a formula for ' + M('\\sum_{k=0}^{' + (n - 1) + '}\\cos k\\theta') + '.', 1, 'The real part of ' + M('S')]
      ]);
    },
    function () {
      var a = pick([1, 2]), n = 3;
      return Q('The roots of ' + M('z^3 = ' + Math.pow(a, 3) * 8 + 'i') + ' form a triangle.', [
        ['Find the roots in exponential form.', 3, M((2 * a) + 'e^{i\\pi/6}, ' + (2 * a) + 'e^{5i\\pi/6}, ' + (2 * a) + 'e^{-i\\pi/2}')],
        ['Find the area of the triangle.', 3, M(3 * a * a * 1 + '\\sqrt{3}')],
        ['Explain why the centroid of the triangle is the origin.', 1, 'The roots add to 0 (no ' + M('z^2') + ' term)']
      ]);
    },
    function () {
      var a = pick([2, 3, 4]);
      return Q('A point ' + M('P') + ' represents ' + M('z = ' + cx(a, 1)) + '. It is rotated about the origin by ' + M('\\frac{\\pi}{3}') + ' anticlockwise.', [
        ['Write the rotation as multiplication by a complex number in exponential and Cartesian form.', 2, M('e^{i\\pi/3} = \\frac{1}{2} + \\frac{\\sqrt{3}}{2}i')],
        ['Find the image exactly.', 3, M('\\frac{' + a + ' - \\sqrt{3}}{2} + \\frac{1 + ' + a + '\\sqrt{3}}{2}i')],
        ['If ' + M('P') + ' and its image are two vertices of an equilateral triangle with the origin, find its area.', 2, M('\\frac{\\sqrt{3}}{4}(' + (a * a + 1) + ')')]
      ]);
    }
  ]);

  /* ---------------- Series 2: method of differences, Maclaurin ---------------- */
  T({ id: 'cp-series2', name: 'Series: method of differences and Maclaurin series', video: 'further maths method of differences maclaurin series', gens: [
    { d: [1, 2], f: function () {
      var a = ri(0, 3), n = ri(5, 20);
      return Q('Consider ' + M('\\sum_{r=1}^{n} \\frac{1}{(r + ' + a + ')(r + ' + (a + 1) + ')}').replace('(r + 0)', 'r') + '.', [
        ['Write the general term in partial fractions.', 2, M('\\frac{1}{r + ' + a + '} - \\frac{1}{r + ' + (a + 1) + '}').replace('r + 0', 'r')],
        ['Use the method of differences to find the sum.', 3, M('\\frac{1}{' + (a + 1) + '} - \\frac{1}{n + ' + (a + 1) + '}')],
        ['Find the sum for ' + M('n = ' + n) + ' and the limit as ' + M('n \\to \\infty') + '.', 2, M(frac(n, (a + 1) * (n + a + 1))) + '; ' + M(frac(1, a + 1))]
      ]);
    } },
    { d: [2], f: function () {
      var n = ri(5, 15);
      return Q('Use the method of differences with ' + M('\\frac{2}{r(r + 2)} = \\frac{1}{r} - \\frac{1}{r + 2}') + '.', [
        ['Find ' + M('\\sum_{r=1}^{n}\\frac{2}{r(r + 2)}') + ' in terms of ' + M('n') + '.', 4, M('\\frac{3}{2} - \\frac{1}{n + 1} - \\frac{1}{n + 2}')],
        ['Evaluate for ' + M('n = ' + n) + '.', 1, M(frac(3 * (n + 1) * (n + 2) - 2 * (n + 2) - 2 * (n + 1), 2 * (n + 1) * (n + 2)))],
        ['Explain why two terms remain at each end.', 1, 'Each term cancels with one two places later']
      ]);
    } },
    { d: [1, 2], f: function () {
      var k = pick([2, 3, -2, -1]);
      var f = pick(['e', 'ln', 'sin']);
      var ser = f === 'e' ? M('1 + ' + c1(k, 'x') + ' + ' + frac(k * k, 2) + 'x^2 + ' + frac(k * k * k, 6) + 'x^3') : f === 'ln' ? M(c1(k, 'x') + ' - ' + frac(k * k, 2) + 'x^2 + ' + frac(k * k * k, 3) + 'x^3') : M(c1(k, 'x') + ' - ' + frac(k * k * k, 6) + 'x^3');
      var fn = f === 'e' ? 'e^{' + c1(k, 'x') + '}' : f === 'ln' ? '\\ln(1' + (k < 0 ? ' - ' : ' + ') + c1(Math.abs(k), 'x') + ')' : '\\sin(' + c1(k, 'x') + ')';
      return Q('Find the Maclaurin series of ' + M(fn) + ' up to the term in ' + M('x^3') + '.', [
        ['Find the series.', 3, ser.replace(/\+ -/g, '- ').replace(/- -/g, '+ ')],
        ['Use it to estimate ' + M(fn.replace(/x/g, '(0.1)')) + '.', 1, (function () { var x = 0.1; var v = f === 'e' ? 1 + k * x + k * k * x * x / 2 + k * k * k * x * x * x / 6 : f === 'ln' ? k * x - k * k * x * x / 2 + k * k * k * x * x * x / 3 : k * x - k * k * k * x * x * x / 6; return sf3(v); })()],
        f === 'ln' ? ['State the values of ' + M('x') + ' for which the series is valid.', 1, M(k > 0 ? frac(-1, k) + ' < x \\le ' + frac(1, k) : frac(-1, -k) + ' \\le x < ' + frac(1, -k))] : ['Explain why the estimate is good for small ' + M('x') + '.', 1, 'The missing terms involve higher powers of a small number']
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Find the Maclaurin series of ' + M('e^x\\sin x') + ' up to ' + M('x^3') + '.', [
        ['Multiply the series for ' + M('e^x') + ' and ' + M('\\sin x') + '.', 3, M('x + x^2 + \\frac{x^3}{3}')],
        ['Hence estimate ' + M('\\int_0^{0.2} e^x\\sin x\\,dx') + '.', 2, sf3(0.02 + 0.008 / 3 + 0.0016 / 12)],
        ['Explain why multiplying series gives the correct coefficients up to ' + M('x^3') + '.', 1, 'Higher terms of each series only contribute ' + M('x^4') + ' and beyond']
      ]);
    } },
    { d: [2, 3], f: function () {
      var k = ri(2, 5), which = pick(['cos', 'e', 'sin']);
      var expr = which === 'cos' ? '\\frac{1 - \\cos ' + k + 'x}{x^2}' : which === 'e' ? '\\frac{e^{' + k + 'x} - 1 - ' + k + 'x}{x^2}' : '\\frac{' + k + 'x - \\sin ' + k + 'x}{x^3}';
      var ans = which === 'cos' ? frac(k * k, 2) : which === 'e' ? frac(k * k, 2) : frac(k * k * k, 6);
      return Q('Use Maclaurin series to find ' + M('\\lim_{x \\to 0} ' + expr) + '.', [
        ['Write the series for the numerator up to the first non-zero term.', 2, which === 'cos' ? M(frac(k * k, 2) + 'x^2 - \\cdots') : which === 'e' ? M(frac(k * k, 2) + 'x^2 + \\cdots') : M(frac(k * k * k, 6) + 'x^3 - \\cdots')],
        ['Find the limit.', 2, M(ans)]
      ]);
    } }
  ] });
  X('cp-series2', [
    function () {
      var n = ri(5, 12);
      return Q('Find ' + M('\\sum_{r=1}^{n} r \\cdot r!') + ' using ' + M('r \\cdot r! = (r + 1)! - r!') + '.', [
        ['Verify the identity.', 1, M('(r + 1)r! - r! = r\\cdot r!')],
        ['Find the sum.', 3, M('(n + 1)! - 1')],
        ['Evaluate for ' + M('n = ' + n) + '.', 1, A.fact(n + 1) - 1]
      ]);
    },
    function () {
      return Q('Find the Maclaurin series of ' + M('\\ln(\\cos x)') + ' up to ' + M('x^4') + '.', [
        ['Write ' + M('\\cos x = 1 + u') + ' with ' + M('u = -\\frac{x^2}{2} + \\frac{x^4}{24}') + '.', 1, 'From the cosine series'],
        ['Use ' + M('\\ln(1 + u) = u - \\frac{u^2}{2} + \\cdots') + ' to find the series.', 4, M('-\\frac{x^2}{2} - \\frac{x^4}{12}')],
        ['Check by differentiating to get the series for ' + M('-\\tan x') + '.', 1, M('-x - \\frac{x^3}{3}')]
      ]);
    },
    function () {
      return Q('Use the method of differences with ' + M('\\ln\\frac{r + 1}{r}') + '.', [
        ['Show that ' + M('\\sum_{r=1}^{n}\\ln\\frac{r + 1}{r} = \\ln(n + 1)') + '.', 3, 'Write as ' + M('\\ln(r + 1) - \\ln r') + '; terms cancel'],
        ['Explain what this shows about the sum as ' + M('n \\to \\infty') + '.', 1, 'It grows without limit (diverges)'],
        ['Find the smallest ' + M('n') + ' for which the sum exceeds 5.', 1, Math.ceil(Math.exp(5) - 1)]
      ]);
    },
    function () {
      var k = ri(2, 4);
      return Q('Find the first three non-zero terms of the Maclaurin series of ' + M('\\frac{1}{1 - ' + k + 'x}') + ' and of ' + M('\\frac{1}{(1 - ' + k + 'x)^2}') + '.', [
        ['First series.', 1, M('1 + ' + k + 'x + ' + k * k + 'x^2')],
        ['Second series, by differentiating the first.', 3, M('1 + ' + 2 * k + 'x + ' + 3 * k * k + 'x^2')],
        ['State the range of validity.', 1, M('|x| < ' + frac(1, k))]
      ]);
    },
    function () {
      return Q('Find ' + M('\\sum_{r=1}^{n} \\frac{1}{r(r + 1)(r + 2)}') + '.', [
        ['Show that ' + M('\\frac{2}{r(r + 1)(r + 2)} = \\frac{1}{r(r + 1)} - \\frac{1}{(r + 1)(r + 2)}') + '.', 2, 'Common denominator'],
        ['Find the sum.', 3, M('\\frac{1}{4} - \\frac{1}{2(n + 1)(n + 2)}')],
        ['Find the limit as ' + M('n \\to \\infty') + '.', 1, M('\\frac{1}{4}')]
      ]);
    }
  ]);

  /* ---------------- Methods in calculus ---------------- */
  var AT = [[3, 4, 'arsinh'], [1, 1, ''], [1, 3, '']];
  T({ id: 'cp-calculus', name: 'Methods in calculus: improper integrals, mean values, inverse trig', video: 'further maths improper integrals mean value inverse trigonometric integration', gens: [
    { d: [1], f: function () {
      var k = ri(2, 4), a = ri(1, 3);
      return Q('Improper integrals.', [
        ['Evaluate ' + M('\\int_' + a + '^{\\infty} \\frac{1}{x^' + k + '}\\,dx') + '.', 3, M(frac(1, (k - 1) * Math.pow(a, k - 1)))],
        ['Explain why ' + M('\\int_1^{\\infty}\\frac{1}{x}\\,dx') + ' does not converge.', 2, M('\\ln b \\to \\infty') + ' as ' + M('b \\to \\infty')]
      ]);
    } },
    { d: [1, 2], f: function () {
      var k = ri(1, 6), w = pick(['sq', 'sin']);
      return Q('Find the mean value of the function on the interval.', [
        w === 'sq' ? ['Find the mean value of ' + M('f(x) = x^2') + ' for ' + M('0 \\le x \\le ' + k) + '.', 3, M(frac(k * k, 3))] : ['Find the mean value of ' + M('\\sin x') + ' for ' + M('0 \\le x \\le \\pi') + '.', 3, M('\\frac{2}{\\pi}')],
        ['Find the mean value of ' + M('3f(x) + 2') + ' on the same interval.', 1, w === 'sq' ? M(frac(k * k + 2, 1)) : M('\\frac{6}{\\pi} + 2')]
      ]);
    } },
    { d: [2], f: function () {
      var a = ri(2, 6), b = pick([1, 2]) * a;
      var v = Math.atan(b / a) / a;
      return Q('Evaluate ' + M('\\int_0^{' + b + '} \\frac{1}{' + a * a + ' + x^2}\\,dx') + ' exactly.', [
        ['State the standard integral used.', 1, M('\\int\\frac{1}{a^2 + x^2}\\,dx = \\frac{1}{a}\\arctan\\frac{x}{a}')],
        ['Evaluate.', 2, M('\\frac{1}{' + a + '}\\arctan ' + (b / a) + ' = ' + (b === a ? '\\frac{\\pi}{' + 4 * a + '}' : sf3(v)))]
      ]);
    } },
    { d: [2, 3], f: function () {
      var a = ri(2, 8), w = pick([[1, 2, 6], [1, 1, 2]]);
      return Q('Evaluate ' + M('\\int_0^{' + (w[1] === 2 ? frac(a, 2) : a) + '} \\frac{1}{\\sqrt{' + a * a + ' - x^2}}\\,dx') + '.', [
        ['State the standard integral.', 1, M('\\arcsin\\frac{x}{' + a + '}')],
        ['Evaluate exactly.', 2, M('\\frac{\\pi}{' + w[2] + '}')],
        ['Explain why the integral with upper limit ' + a + ' would be improper.', 1, 'The integrand is not defined at ' + M('x = ' + a)]
      ]);
    } },
    { d: [2, 3], f: function () {
      var a = ri(1, 4), b; do { b = ri(1, 5); } while (b === a);
      var P1 = ri(1, 3), P2 = ri(1, 3);
      return Q('Evaluate ' + M('\\int_0^1 \\frac{' + lin([P1 + P2, P1 * b + P2 * a], ['x', '']) + '}{(x + ' + a + ')(x + ' + b + ')}\\,dx') + '.', [
        ['Write the integrand in partial fractions.', 3, M('\\frac{' + P1 + '}{x + ' + a + '} + \\frac{' + P2 + '}{x + ' + b + '}')],
        ['Evaluate, giving your answer as a single logarithm.', 3, M('\\ln\\left(\\left(\\frac{' + (1 + a) + '}{' + a + '}\\right)^{' + P1 + '}\\left(\\frac{' + (1 + b) + '}{' + b + '}\\right)^{' + P2 + '}\\right)').replace(/\^\{1\}/g, '')]
      ]);
    } }
  ] });
  X('cp-calculus', [
    function () {
      var k = ri(1, 3);
      return Q('Evaluate ' + M('\\int_0^{\\infty} ' + (k === 1 ? '' : k) + 'xe^{-x^2}\\,dx') + '.', [
        ['Find the integral from 0 to ' + M('b') + '.', 2, M((k === 2 ? '' : frac(k, 2)) + '(1 - e^{-b^2})')],
        ['Find the limit as ' + M('b \\to \\infty') + '.', 1, M(frac(k, 2))]
      ]);
    },
    function () {
      var a = ri(2, 5);
      return Q('Differentiate inverse trigonometric functions.', [
        ['Show that ' + M('\\frac{d}{dx}\\arcsin\\frac{x}{' + a + '} = \\frac{1}{\\sqrt{' + a * a + ' - x^2}}') + '.', 3, 'Let ' + M('y = \\arcsin\\frac{x}{' + a + '}') + ', ' + M('x = ' + a + '\\sin y') + ', ' + M('\\frac{dx}{dy} = ' + a + '\\cos y')],
        ['Find ' + M('\\frac{d}{dx}(x\\arctan x)') + '.', 2, M('\\arctan x + \\frac{x}{1 + x^2}')],
        ['Hence find ' + M('\\int\\arctan x\\,dx') + '.', 2, M('x\\arctan x - \\frac{1}{2}\\ln(1 + x^2) + c')]
      ]);
    },
    function () {
      var a = ri(1, 3);
      return Q('Evaluate ' + M('\\int_0^1 \\frac{1}{x^2 + ' + 2 * a + 'x + ' + (a * a + 1) + '}\\,dx') + '.', [
        ['Complete the square in the denominator.', 1, M('(x + ' + a + ')^2 + 1')],
        ['Evaluate exactly.', 3, M('\\arctan ' + (a + 1) + ' - \\arctan ' + a)]
      ]);
    },
    function () {
      return Q('The mean value of ' + M('\\cos^2 x') + ' over a period.', [
        ['Find the mean value of ' + M('\\cos^2 x') + ' for ' + M('0 \\le x \\le 2\\pi') + '.', 3, M('\\frac{1}{2}')],
        ['An alternating current has ' + M('I = I_0\\sin\\omega t') + '. Explain why the mean of ' + M('I^2') + ' over a cycle is ' + M('\\frac{I_0^2}{2}') + '.', 1, 'Same calculation with ' + M('\\sin^2')],
        ['Hence explain the “root mean square” value ' + M('\\frac{I_0}{\\sqrt{2}}') + '.', 1, 'Square root of the mean of ' + M('I^2')]
      ]);
    },
    function () {
      return Q('Evaluate ' + M('\\int_0^1 \\ln x\\,dx') + '.', [
        ['Explain why it is improper.', 1, M('\\ln x \\to -\\infty') + ' as ' + M('x \\to 0')],
        ['Find ' + M('\\int_a^1 \\ln x\\,dx') + '.', 2, M('-1 - a\\ln a + a')],
        ['Find the limit as ' + M('a \\to 0') + ', using ' + M('a\\ln a \\to 0') + '.', 1, -1]
      ]);
    }
  ]);

  /* ---------------- Polar coordinates ---------------- */
  T({ id: 'cp-polar', name: 'Polar coordinates', video: 'further maths polar coordinates area tangents', gens: [
    { d: [1], f: function () {
      var r = ri(2, 8), k = pick([[1, 6], [1, 4], [1, 3], [2, 3], [5, 6]]);
      var c = Math.cos(Math.PI * k[0] / k[1]), s = Math.sin(Math.PI * k[0] / k[1]);
      return Q('Convert between polar and Cartesian coordinates.', [
        ['Convert ' + M('(r, \\theta) = \\left(' + r + ', ' + piF(k[0], k[1]) + '\\right)') + ' to Cartesian form.', 2, M('(' + sf3(r * c) + ', ' + sf3(r * s) + ')')],
        ['Convert ' + M('(' + -r + ', ' + r + ')') + ' to polar form with ' + M('-\\pi < \\theta \\le \\pi') + '.', 2, M('\\left(' + rt(2 * r * r) + ', \\frac{3\\pi}{4}\\right)')]
      ]);
    } },
    { d: [1, 2], f: function () {
      var a = ri(2, 5), w = pick(['card', 'circ', 'rose']);
      var curve = w === 'card' ? 'r = ' + a + '(1 + \\cos\\theta)' : w === 'circ' ? 'r = ' + 2 * a + '\\cos\\theta' : 'r = ' + a + '\\sin 2\\theta';
      var ans = w === 'card' ? frac(3 * a * a, 2) + '\\pi' : w === 'circ' ? (a * a === 1 ? '' : a * a) + '\\pi' : frac(a * a, 8) + '\\pi';
      return Q('Find areas enclosed by polar curves.', [
        ['Find the area enclosed by ' + M(curve) + (w === 'rose' ? ' in one loop ' + M('(0 \\le \\theta \\le \\frac{\\pi}{2})') : '') + '.', 4, M(ans)],
        ['State the formula used and why ' + M('\\cos^2') + ' or ' + M('\\sin^2') + ' identities are needed.', 1, M('\\frac{1}{2}\\int r^2\\,d\\theta') + '; double angle identities let the squared trig terms be integrated']
      ]);
    } },
    { d: [2], f: function () {
      var a = ri(1, 6);
      return Q('A curve has polar equation ' + M('r = ' + 2 * a + '\\cos\\theta') + '.', [
        ['Find its Cartesian equation.', 2, M('x^2 + y^2 = ' + 2 * a + 'x')],
        ['Describe the curve.', 2, 'A circle, centre ' + M('(' + a + ', 0)') + ', radius ' + a],
        ['State the range of ' + M('\\theta') + ' that traces it once.', 1, M('-\\frac{\\pi}{2} \\le \\theta \\le \\frac{\\pi}{2}')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var a = ri(2, 5);
      return Q('Find the points on ' + M('r = ' + a + '(1 + \\cos\\theta)') + ' where the tangent is parallel to the initial line.', [
        ['Show that ' + M('\\frac{dy}{d\\theta} = ' + a + '(\\cos\\theta + \\cos 2\\theta)') + '.', 3, M('y = ' + a + '(\\sin\\theta + \\sin\\theta\\cos\\theta)')],
        ['Find the points (other than the pole).', 3, M('\\left(' + frac(3 * a, 2) + ', \\pm\\frac{\\pi}{3}\\right)')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var a = ri(2, 4);
      return Q('Find the area of the region inside ' + M('r = ' + a + '(1 + \\cos\\theta)') + ' for ' + M('0 \\le \\theta \\le \\frac{\\pi}{2}') + '.', [
        ['Write the integral.', 1, M('\\frac{' + a * a + '}{2}\\int_0^{\\pi/2}(1 + \\cos\\theta)^2\\,d\\theta').replace('\\frac{1}{2}', '\\frac{1}{2}')],
        ['Evaluate exactly.', 4, M('\\frac{' + a * a + '}{8}(3\\pi + 8)').replace('\\frac{1}{8}', '\\frac{1}{8}')]
      ]);
    } }
  ] });
  X('cp-polar', [
    function () {
      var a = ri(1, 4);
      return Q('The curves ' + M('r = ' + a) + ' and ' + M('r = ' + 2 * a + '\\cos\\theta') + ' intersect.', [
        ['Find the points of intersection.', 2, M('\\left(' + a + ', \\pm\\frac{\\pi}{3}\\right)')],
        ['Find the area of the region inside both curves.', 4, M(a * a === 1 ? '\\frac{2\\pi}{3} - \\frac{\\sqrt{3}}{2}' : a * a + '\\left(\\frac{2\\pi}{3} - \\frac{\\sqrt{3}}{2}\\right)')]
      ]);
    },
    function () {
      var a = ri(2, 4);
      return Q('Find the points on ' + M('r = ' + a + '(1 + \\cos\\theta)') + ' where the tangent is perpendicular to the initial line.', [
        ['Find ' + M('\\frac{dx}{d\\theta}') + '.', 2, M('-' + a + '(\\sin\\theta + \\sin 2\\theta)')],
        ['Solve ' + M('\\frac{dx}{d\\theta} = 0') + ' and find the points.', 4, M('(' + 2 * a + ', 0)') + ', ' + M('\\left(' + frac(a, 2) + ', \\pm\\frac{2\\pi}{3}\\right)')]
      ]);
    },
    function () {
      var a = ri(1, 4), k = pick([2, 3]);
      return Q('The curve ' + M('r = ' + a + '\\sin ' + k + '\\theta') + ' is a rose.', [
        ['How many petals does it have?', 1, k === 2 ? 4 : 3],
        ['Find the area of one petal.', 3, M(frac(a * a, 4 * k) + '\\pi')],
        ['Find the total area.', 1, M(frac(a * a * (k === 2 ? 4 : 3), 4 * k) + '\\pi')]
      ]);
    },
    function () {
      var a = ri(1, 3);
      return Q('The spiral ' + M('r = ' + a + '\\theta') + ' for ' + M('0 \\le \\theta \\le 2\\pi') + '.', [
        ['Find the area swept out.', 3, M(frac(4 * a * a, 3) + '\\pi^3')],
        ['Explain why the spiral crosses the initial line at ' + M('r = ' + 2 * a + '\\pi') + '.', 1, 'At ' + M('\\theta = 2\\pi')]
      ]);
    },
    function () {
      return Q('Convert ' + M('r^2 = 4\\cos 2\\theta') + ' to Cartesian form.', [
        ['Use ' + M('\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta') + '.', 3, M('(x^2 + y^2)^2 = 4(x^2 - y^2)')],
        ['Explain why there are no points for ' + M('\\frac{\\pi}{4} < \\theta < \\frac{3\\pi}{4}') + '.', 1, M('\\cos 2\\theta < 0') + ' there, so ' + M('r^2 < 0')],
        ['Find the total area enclosed.', 2, 4]
      ]);
    }
  ]);

  /* ---------------- Hyperbolic functions ---------------- */
  var HYP = [[3, 1, 3, '0', '-\\ln 2'], [5, 3, 5, '0', '-2\\ln 2'], [4, 2, 4, '0', '-\\ln 3'], [5, 4, 5, '0', '-2\\ln 3']];
  T({ id: 'cp-hyperbolic', name: 'Hyperbolic functions', video: 'further maths hyperbolic functions cosh sinh equations', gens: [
    { d: [1], f: function () {
      var k = ri(2, 6);
      return Q('Use the definitions of the hyperbolic functions.', [
        ['Find ' + M('\\sinh(\\ln ' + k + ')') + ' and ' + M('\\cosh(\\ln ' + k + ')') + ' exactly.', 3, M(frac(k * k - 1, 2 * k)) + ' and ' + M(frac(k * k + 1, 2 * k))],
        ['Verify ' + M('\\cosh^2 x - \\sinh^2 x = 1') + ' with these values.', 1, M(frac(Math.pow(k * k + 1, 2) - Math.pow(k * k - 1, 2), 4 * k * k) + ' = 1')],
        ['Find ' + M('\\tanh(\\ln ' + k + ')') + '.', 1, M(frac(k * k - 1, k * k + 1))]
      ]);
    } },
    { d: [1, 2], f: function () {
      var t = ri(2, 5);
      return Q('Solve ' + M('\\cosh x = ' + frac(t * t + 1, 2 * t)) + '.', [
        ['Write as a quadratic in ' + M('e^x') + '.', 2, M(t + 'e^{2x} - ' + (t * t + 1) + 'e^x + ' + t + ' = 0').replace(/^\\\(1e/, '\\(e')],
        ['Solve exactly.', 2, M('x = \\pm\\ln ' + t)],
        ['Explain why there are two solutions symmetric about 0.', 1, M('\\cosh') + ' is an even function']
      ]);
    } },
    { d: [2], f: function () {
      var h = pick(HYP);
      return Q('Solve ' + M(h[0] + '\\cosh x + ' + (h[1] === 1 ? '' : h[1]) + '\\sinh x = ' + h[2]) + '.', [
        ['Use exponential definitions to form a quadratic in ' + M('e^x') + '.', 3, M((h[0] + h[1]) + 'e^{2x} - ' + 2 * h[2] + 'e^x + ' + (h[0] - h[1]) + ' = 0')],
        ['Solve exactly.', 3, M('x = ' + h[3]) + ' or ' + M('x = ' + h[4])]
      ]);
    } },
    { d: [2, 3], f: function () {
      var p = pick([[3, 4, '\\ln 3'], [5, 12, '\\ln 5'], [4, 3, '\\ln 2'], [12, 5, '\\ln\\frac{3}{2}']]);
      return Q('Evaluate ' + M('\\int_0^{' + p[1] + '}\\frac{1}{\\sqrt{x^2 + ' + p[0] * p[0] + '}}\\,dx') + '.', [
        ['State the standard integral.', 1, M('\\operatorname{arsinh}\\frac{x}{' + p[0] + '}')],
        ['Use the logarithmic form of ' + M('\\operatorname{arsinh}') + ' to evaluate exactly.', 3, M('\\ln\\left(\\frac{' + p[1] + ' + ' + Math.round(Math.hypot(p[0], p[1])) + '}{' + p[0] + '}\\right) = ' + p[2])]
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Solve ' + M('\\cosh 2x - 3\\sinh x = 3') + '.', [
        ['Use ' + M('\\cosh 2x = 1 + 2\\sinh^2 x') + ' to form a quadratic.', 2, M('2\\sinh^2 x - 3\\sinh x - 2 = 0')],
        ['Solve, giving exact logarithmic answers.', 4, M('\\sinh x = 2') + ': ' + M('x = \\ln(2 + \\sqrt{5})') + '; ' + M('\\sinh x = -\\frac{1}{2}') + ': ' + M('x = \\ln\\frac{\\sqrt{5} - 1}{2}')]
      ]);
    } }
  ] });
  X('cp-hyperbolic', [
    function () {
      return Q('Prove that ' + M('\\operatorname{arcosh} x = \\ln(x + \\sqrt{x^2 - 1})') + ' for ' + M('x \\ge 1') + '.', [
        ['Let ' + M('y = \\operatorname{arcosh} x') + ' and form a quadratic in ' + M('e^y') + '.', 2, M('e^{2y} - 2xe^y + 1 = 0')],
        ['Solve and explain which root is taken.', 3, M('e^y = x \\pm \\sqrt{x^2 - 1}') + '; take ' + M('+') + ' since ' + M('y \\ge 0')],
        ['Find ' + M('\\operatorname{arcosh} \\frac{5}{4}') + ' exactly.', 1, M('\\ln 2')]
      ]);
    },
    function () {
      var k = ri(2, 4);
      return Q('Differentiate and integrate hyperbolic functions.', [
        ['Find ' + M('\\frac{d}{dx}\\cosh^2(' + k + 'x)') + '.', 2, M(k + '\\sinh(' + 2 * k + 'x)')],
        ['Find ' + M('\\int\\sinh^2 x\\,dx') + '.', 3, M('\\frac{1}{4}\\sinh 2x - \\frac{x}{2} + c')]
      ]);
    },
    function () {
      return Q('Use Osborn’s rule.', [
        ['State the hyperbolic version of ' + M('\\cos 2x = 1 - 2\\sin^2 x') + '.', 1, M('\\cosh 2x = 1 + 2\\sinh^2 x')],
        ['Prove it from the definitions.', 3, M('1 + \\frac{2(e^{2x} - 2 + e^{-2x})}{4} = \\frac{e^{2x} + e^{-2x}}{2}')],
        ['Explain why the sign changes.', 1, 'A product of two sines becomes ' + M('-\\sinh^2')]
      ]);
    },
    function () {
      var a = ri(2, 6);
      return Q('A hanging chain has shape ' + M('y = ' + a + '\\cosh\\frac{x}{' + a + '}') + ' for ' + M('-' + a + ' \\le x \\le ' + a) + '.', [
        ['Find the length of the chain using ' + M('\\int\\sqrt{1 + y\'^2}\\,dx') + '.', 4, M(2 * a + '\\sinh 1 = ' + sf3(2 * a * Math.sinh(1)))],
        ['Find the sag (difference between highest and lowest points).', 1, sf3(a * (Math.cosh(1) - 1))]
      ]);
    },
    function () {
      return Q('Show that ' + M('\\tanh x = \\frac{e^{2x} - 1}{e^{2x} + 1}') + ' and use it.', [
        ['Prove the identity.', 2, 'Multiply top and bottom of ' + M('\\frac{e^x - e^{-x}}{e^x + e^{-x}}') + ' by ' + M('e^x')],
        ['Solve ' + M('\\tanh x = \\frac{1}{2}') + ' exactly.', 2, M('e^{2x} = 3') + ', ' + M('x = \\frac{1}{2}\\ln 3')],
        ['State the range of ' + M('\\tanh') + '.', 1, M('-1 < \\tanh x < 1')]
      ]);
    }
  ]);

  /* ---------------- Differential equations: first order ---------------- */
  T({ id: 'cp-de1', name: 'First-order differential equations (integrating factor)', video: 'further maths integrating factor first order differential equations', gens: [
    { d: [1, 2], f: function () {
      var k = ri(1, 3), m = ri(1, 3);
      return Q('Solve ' + M('\\frac{dy}{dx} + \\frac{' + k + '}{x}y = x^{' + m + '}') + ' for ' + M('x > 0') + '.', [
        ['Find the integrating factor.', 2, M('x^{' + k + '}').replace('^{1}', '')],
        ['Find the general solution.', 3, M('y = \\frac{x^{' + (m + 1) + '}}{' + (m + k + 1) + '} + \\frac{C}{x^{' + k + '}}').replace('^{1}}', '}')]
      ]);
    } },
    { d: [1, 2], f: function () {
      var k = ri(1, 4), a = ri(1, 3), y0 = ri(1, 5);
      return Q('Solve ' + M('\\frac{dy}{dx} + ' + c1(k, 'y') + ' = e^{' + c1(a, 'x') + '}') + ' with ' + M('y(0) = ' + y0) + '.', [
        ['Find the integrating factor.', 1, M('e^{' + c1(k, 'x') + '}')],
        ['Find the particular solution.', 4, M('y = \\frac{1}{' + (a + k) + '}e^{' + c1(a, 'x') + '}' + (y0 * (a + k) - 1 < 0 ? ' - ' : ' + ') + frac(Math.abs(y0 * (a + k) - 1), a + k) + 'e^{-' + c1(k, 'x') + '}')]
      ]);
    } },
    { d: [2], f: function () {
      var k = pick([0.1, 0.2, 0.5]);
      return Q('A particle falls with ' + M('\\frac{dv}{dt} + ' + k + 'v = 9.8') + ', starting from rest.', [
        ['Solve for ' + M('v') + '.', 4, M('v = ' + sf3(9.8 / k) + '(1 - e^{-' + k + 't})')],
        ['State the terminal velocity.', 1, sf3(9.8 / k) + ' m/s'],
        ['Find when ' + M('v') + ' is 90% of terminal velocity.', 2, sf3(Math.log(10) / k) + ' s']
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Solve ' + M('\\frac{dy}{dx} + y\\tan x = \\cos x') + ' for ' + M('0 < x < \\frac{\\pi}{2}') + ', with ' + M('y = 1') + ' when ' + M('x = 0') + '.', [
        ['Find the integrating factor.', 2, M('\\sec x')],
        ['Find the particular solution.', 4, M('y = (x + 1)\\cos x')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var V = pick([100, 200]), r = pick([2, 5]), c = pick([0.5, 1]);
      return Q('A tank holds ' + V + ' litres of pure water. Brine with ' + c + ' kg of salt per litre flows in at ' + r + ' L/min, and the mixture flows out at the same rate.', [
        ['Show that the mass of salt ' + M('S') + ' satisfies ' + M('\\frac{dS}{dt} + \\frac{' + r + '}{' + V + '}S = ' + num(c * r)) + '.', 2, 'In: ' + num(c * r) + ' kg/min; out: ' + M('\\frac{S}{' + V + '} \\times ' + r)],
        ['Solve with ' + M('S(0) = 0') + '.', 3, M('S = ' + num(c * V) + '(1 - e^{-' + num(r / V) + 't})')],
        ['Find the long-term mass of salt and explain.', 1, num(c * V) + ' kg: the tank becomes the same concentration as the inflow']
      ]);
    } }
  ] });
  X('cp-de1', [
    function () {
      return Q('Solve ' + M('x\\frac{dy}{dx} - 2y = x^3e^x') + ' for ' + M('x > 0') + '.', [
        ['Write in standard form and find the integrating factor.', 2, M('\\frac{dy}{dx} - \\frac{2}{x}y = x^2e^x') + '; ' + M('\\frac{1}{x^2}')],
        ['Find the general solution.', 3, M('y = x^2(e^x + C)')]
      ]);
    },
    function () {
      var k = ri(1, 3);
      return Q('Solve ' + M('\\frac{dy}{dx} + ' + c1(k, 'y') + ' = x') + '.', [
        ['Find the general solution.', 4, M('y = \\frac{x}{' + k + '} - \\frac{1}{' + k * k + '} + Ce^{-' + c1(k, 'x') + '}').replace('\\frac{x}{1}', 'x').replace('\\frac{1}{1}', '1')],
        ['Describe the long-term behaviour of all solutions.', 1, 'They approach the line ' + M('y = \\frac{x}{' + k + '} - \\frac{1}{' + k * k + '}').replace('\\frac{x}{1}', 'x').replace('\\frac{1}{1}', '1')]
      ]);
    },
    function () {
      return Q('Solve ' + M('\\frac{dy}{dx} = \\frac{y}{x} + x') + ' with ' + M('y(1) = 2') + '.', [
        ['Rearrange and find the integrating factor.', 2, M('\\frac{1}{x}')],
        ['Find the particular solution.', 3, M('y = x^2 + x')]
      ]);
    },
    function () {
      var k = pick([0.02, 0.05]), T0 = pick([80, 90]);
      return Q('A body cools in a room whose temperature rises: ' + M('\\frac{dT}{dt} + ' + k + 'T = ' + k + '(15 + 0.1t)') + ', with ' + M('T(0) = ' + T0) + '.', [
        ['Find the integrating factor.', 1, M('e^{' + k + 't}')],
        ['Show that a particular solution is ' + M('T = 15 + 0.1t - ' + num(0.1 / k)) + '.', 2, 'Substitute into the equation'],
        ['Write the general solution and explain its long-term behaviour.', 2, M('T = 15 + 0.1t - ' + num(0.1 / k) + ' + Ce^{-' + k + 't}') + '; it follows the rising room temperature, lagging by ' + num(0.1 / k) + '°']
      ]);
    },
    function () {
      return Q('Bernoulli-type substitution.', [
        ['Show that ' + M('u = \\frac{1}{y}') + ' turns ' + M('\\frac{dy}{dx} + y = y^2') + ' into ' + M('\\frac{du}{dx} - u = -1') + '.', 3, M('\\frac{du}{dx} = -\\frac{1}{y^2}\\frac{dy}{dx}')],
        ['Solve for ' + M('u') + ' and hence ' + M('y') + '.', 3, M('u = 1 + Ce^x') + ', ' + M('y = \\frac{1}{1 + Ce^x}')]
      ]);
    }
  ]);

  /* ---------------- Differential equations: second order ---------------- */
  T({ id: 'cp-de2', name: 'Second-order differential equations and modelling', video: 'further maths second order differential equations auxiliary equation particular integral', gens: [
    { d: [1], f: function () {
      var p = nz(-4, 4), q; do { q = nz(-4, 4); } while (q === p);
      return Q('Solve ' + M('\\frac{d^2y}{dx^2}' + S0(-(p + q)) + (p + q ? '\\frac{dy}{dx}' : '') + S0(p * q) + (p * q ? 'y' : '') + ' = 0').replace(/ 1\\frac/, ' \\frac').replace(/ 1y/, ' y') + '.', [
        ['Write the auxiliary equation and solve it.', 2, M(poly([1, -(p + q), p * q]).replace(/x/g, 'm') + ' = 0') + ', ' + M('m = ' + p + ', ' + q)],
        ['Write the general solution.', 1, M('y = Ae^{' + c1(p, 'x') + '} + Be^{' + c1(q, 'x') + '}')]
      ]);
    } },
    { d: [1, 2], f: function () {
      var p = nz(-3, 3);
      return Q('Solve ' + M('\\frac{d^2y}{dx^2}' + S(-2 * p) + '\\frac{dy}{dx} + ' + c1(p * p, 'y') + ' = 0') + '.', [
        ['Solve the auxiliary equation.', 1, M('(m' + S(-p) + ')^2 = 0') + ', ' + M('m = ' + p) + ' (repeated)'],
        ['Write the general solution, explaining the factor of ' + M('x') + '.', 2, M('y = (A + Bx)e^{' + c1(p, 'x') + '}') + '; with a repeated root, ' + M('xe^{' + c1(p, 'x') + '}') + ' is a second independent solution']
      ]);
    } },
    { d: [2], f: function () {
      var a = nz(-2, 2), b = ri(1, 4);
      return Q('Solve ' + M('\\frac{d^2y}{dx^2}' + S(-2 * a) + '\\frac{dy}{dx} + ' + (a * a + b * b) + 'y = 0') + '.', [
        ['Solve the auxiliary equation.', 2, M('m = ' + cx(a, b) + ',\\ ' + cx(a, -b))],
        ['Write the general solution in real form.', 2, M('y = e^{' + c1(a, 'x') + '}(A\\cos ' + c1(b, 'x') + ' + B\\sin ' + c1(b, 'x') + ')')],
        ['Describe the behaviour of solutions as ' + M('x') + ' increases.', 1, a < 0 ? 'Oscillations that decay' : 'Oscillations that grow']
      ]);
    } },
    { d: [2, 3], f: function () {
      var p = nz(-3, 3), q; do { q = nz(-3, 3); } while (q === p || p * q === 0); var c = p * q * nz(-3, 3), k = ri(1, 3);
      var B = -(p + q), Cq = p * q;
      return Q('Find the general solution of ' + M('\\frac{d^2y}{dx^2}' + S0(B) + (B ? '\\frac{dy}{dx}' : '') + S(Cq) + 'y = ' + c1(Cq * k, 'x') + S0(c + B * k)).replace(/ 1\\frac/, ' \\frac').replace(/ 1y/, ' y') + '.', [
        ['Find the complementary function.', 2, M('Ae^{' + c1(p, 'x') + '} + Be^{' + c1(q, 'x') + '}')],
        ['Find a particular integral of the form ' + M('\\lambda x + \\mu') + '.', 3, M('y = ' + c1(k, 'x') + S0(c / Cq))],
        ['Write the general solution.', 1, M('y = Ae^{' + c1(p, 'x') + '} + Be^{' + c1(q, 'x') + '} + ' + c1(k, 'x') + S0(c / Cq))]
      ]);
    } },
    { d: [2, 3], f: function () {
      var p = nz(-3, 2), q; do { q = nz(-3, 2); } while (q === p);
      var y0 = ri(1, 5), d0 = nz(-4, 4);
      var B = (d0 - p * y0) / (q - p), Aa = y0 - B;
      return Q('Solve ' + M('\\frac{d^2y}{dx^2}' + S0(-(p + q)) + (p + q ? '\\frac{dy}{dx}' : '') + S0(p * q) + 'y = 0').replace(/ 1\\frac/, ' \\frac').replace(/ 1y/, ' y') + ' with ' + M('y(0) = ' + y0) + ' and ' + M("y'(0) = " + d0) + '.', [
        ['Write the general solution.', 2, M('y = Ae^{' + c1(p, 'x') + '} + Be^{' + c1(q, 'x') + '}')],
        ['Use the conditions to find ' + M('A') + ' and ' + M('B') + '.', 3, M('A = ' + frac(Math.round(Aa * (q - p)), q - p) + ',\\ B = ' + frac(d0 - p * y0, q - p))]
      ]);
    } }
  ] });
  X('cp-de2', [
    function () {
      var w = ri(2, 6), a0 = ri(1, 5);
      return Q('A particle moves with ' + M('\\ddot{x} + ' + w * w + 'x = 0') + ', starting at rest at ' + M('x = ' + a0) + '.', [
        ['Solve the equation.', 3, M('x = ' + a0 + '\\cos ' + w + 't')],
        ['State the amplitude and period.', 2, a0 + ' and ' + M('\\frac{2\\pi}{' + w + '}')],
        ['Find the maximum speed.', 1, a0 * w]
      ]);
    },
    function () {
      var k = ri(1, 6);
      return Q('Damped motion: ' + M('\\ddot{x} + ' + 2 * k + '\\dot{x} + n^2x = 0') + '.', [
        ['Find the values of ' + M('n > 0') + ' for which the motion is heavily damped, critically damped and lightly damped.', 3, M('n < ' + k) + ', ' + M('n = ' + k) + ', ' + M('n > ' + k)],
        ['For light damping, explain why the motion is oscillatory.', 1, 'The auxiliary equation has complex roots'],
        ['Write the general solution for critical damping.', 1, M('x = (A + Bt)e^{-' + c1(k, 't') + '}')]
      ]);
    },
    function () {
      var a = ri(3, 5);
      return Q('Find a particular integral for ' + M('\\frac{d^2y}{dx^2} - ' + 3 + '\\frac{dy}{dx} + 2y = e^{' + a + 'x}') + '.', [
        ['Try ' + M('y = \\lambda e^{' + a + 'x}') + ' and find ' + M('\\lambda') + '.', 3, M('\\lambda = ' + frac(1, a * a - 3 * a + 2))],
        ['Explain why the trial ' + M('\\lambda e^{x}') + ' would fail for ' + M('e^{x}') + ' on the right-hand side.', 2, M('e^x') + ' is in the complementary function; try ' + M('\\lambda xe^x') + ' instead']
      ]);
    },
    function () {
      var w = ri(2, 4);
      return Q('Resonance: ' + M('\\ddot{x} + ' + w * w + 'x = \\cos ' + w + 't') + '.', [
        ['Explain why ' + M('\\lambda\\cos ' + w + 't + \\mu\\sin ' + w + 't') + ' cannot be a particular integral.', 1, 'It satisfies the homogeneous equation'],
        ['Show that ' + M('x = \\frac{t}{' + 2 * w + '}\\sin ' + w + 't') + ' is a particular integral.', 3, 'Differentiate twice and substitute'],
        ['Describe the motion for large ' + M('t') + '.', 1, 'Oscillations with growing amplitude (resonance)']
      ]);
    },
    function () {
      return Q('Coupled equations: ' + M('\\dot{x} = 3x - 2y') + ', ' + M('\\dot{y} = x') + '.', [
        ['Show that ' + M('\\ddot{x} - 3\\dot{x} + 2x = 0') + '.', 3, 'Differentiate the first and substitute ' + M('\\dot{y} = x')],
        ['Find ' + M('x') + ' and ' + M('y') + ' given ' + M('x(0) = 1, y(0) = 0') + '.', 4, M('x = 2e^{2t} - e^{t}') + ', ' + M('y = e^{2t} - e^{t}')]
      ]);
    }
  ]);

  /* ---------------- Reasoning statements ---------------- */
  Cn('cp-complex2', [
    ['T', Sr`\(e^{i\pi} + 1 = 0\).`, Sr`\(\cos\pi + i\sin\pi = -1\).`],
    ['F', Sr`The cube roots of 8 are 2, 2 and 2.`, Sr`There are three distinct roots: \(2, 2e^{\pm 2\pi i/3}\).`],
    ['A', Sr`The \(n\) \(n\)th roots of unity add to 0 (for \(n \ge 2\)).`, Sr`They are the roots of \(z^n - 1 = 0\), which has no \(z^{n-1}\) term.`],
    ['S', Sr`\((\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta\) for real \(n\).`, Sr`It holds for integers; for non-integers it gives only one of several values.`],
    ['N', Sr`\(|e^{i\theta}| = 2\) for some real \(\theta\).`, Sr`It always has modulus 1.`]
  ]);
  Cn('cp-series2', [
    ['T', Sr`\(\sum_{r=1}^{n}(f(r + 1) - f(r)) = f(n + 1) - f(1)\).`, Sr`The middle terms cancel.`],
    ['F', Sr`The Maclaurin series of \(\ln x\) exists.`, Sr`\(\ln x\) is not defined at \(x = 0\).`],
    ['A', Sr`The Maclaurin series of an even function has only even powers.`, Sr`Odd derivatives at 0 are zero.`],
    ['S', Sr`A Maclaurin series converges for all \(x\).`, Sr`True for \(e^x\) and \(\sin x\), but \(\ln(1 + x)\) needs \(-1 < x \le 1\).`]
  ]);
  Cn('cp-calculus', [
    ['T', Sr`\(\int_1^\infty \frac{1}{x^2}\,dx = 1\).`, Sr`\(\left[-\frac{1}{x}\right]_1^\infty\).`],
    ['F', Sr`\(\int_1^\infty \frac{1}{x}\,dx\) converges.`, Sr`\(\ln x\) grows without bound.`],
    ['A', Sr`\(\frac{d}{dx}\arctan x = \frac{1}{1 + x^2}\).`, Sr`Standard result.`],
    ['S', Sr`The mean value of \(f\) on \([a, b]\) lies between the minimum and maximum of \(f\) there.`, Sr`True for continuous \(f\); it can fail if \(f\) has a jump.`]
  ]);
  Cn('cp-polar', [
    ['T', Sr`The area enclosed by a polar curve is \(\frac{1}{2}\int r^2\,d\theta\).`, Sr`Sum of thin sectors.`],
    ['F', Sr`\(r = 3\) is a straight line.`, Sr`It is a circle of radius 3 centred at the pole.`],
    ['A', Sr`\(x = r\cos\theta\) and \(y = r\sin\theta\).`, Sr`Definition of polar coordinates.`],
    ['N', Sr`In the usual convention for this course, \(r\) is negative.`, Sr`We take \(r \ge 0\) and omit points with \(r < 0\).`]
  ]);
  Cn('cp-hyperbolic', [
    ['T', Sr`\(\cosh^2 x - \sinh^2 x = 1\).`, Sr`From the exponential definitions.`],
    ['F', Sr`\(\cosh x\) can equal \(\frac{1}{2}\).`, Sr`\(\cosh x \ge 1\).`],
    ['A', Sr`\(\sinh\) is an odd function.`, Sr`\(\sinh(-x) = -\sinh x\).`],
    ['S', Sr`\(\cosh x = k\) has two solutions.`, Sr`True for \(k > 1\); one for \(k = 1\); none for \(k < 1\).`],
    ['F', Sr`\(\frac{d}{dx}\cosh x = -\sinh x\).`, Sr`It is \(+\sinh x\).`]
  ]);
  Cn('cp-de1', [
    ['T', Sr`The integrating factor for \(\frac{dy}{dx} + Py = Q\) is \(e^{\int P\,dx}\).`, Sr`It makes the left side a derivative of a product.`],
    ['F', Sr`An integrating factor can only be used when \(P\) is constant.`, Sr`\(P\) may be any function of \(x\).`],
    ['A', Sr`The general solution of a first-order equation has one arbitrary constant.`, Sr`One integration.`]
  ]);
  Cn('cp-de2', [
    ['T', Sr`If the auxiliary equation has roots \(2 \pm 3i\), solutions are \(e^{2x}(A\cos 3x + B\sin 3x)\).`, Sr`Standard form.`],
    ['F', Sr`A repeated root \(m\) gives \(y = Ae^{mx} + Be^{mx}\).`, Sr`That is only one solution; use \((A + Bx)e^{mx}\).`],
    ['A', Sr`The general solution is the complementary function plus a particular integral.`, Sr`Linearity.`],
    ['S', Sr`Solutions of \(\ddot{x} + k\dot{x} + x = 0\) oscillate.`, Sr`Only when \(k < 2\) (light damping).`]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
