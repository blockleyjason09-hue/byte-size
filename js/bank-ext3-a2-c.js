/* Byte Size Classroom — deeper extension questions (set 3, A level Year 2 part c): differentiation, numerical methods, integration, 3D vectors. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function d4(x) { return x.toFixed(4); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function S0(v) { return v ? S(v) : ''; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function cf(f, v) { f = String(f); return f === '1' ? v : f === '-1' ? '-' + v : f + v; }
  function V3(a) { return '\\begin{pmatrix}' + a.join('\\\\') + '\\end{pmatrix}'; }
  function mag(a) { return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]); }
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function rt(n) { var o = 1, i = n; for (var k = 2; k * k <= i; k++) while (i % (k * k) === 0) { o *= k; i /= k * k; } return i === 1 ? String(o) : (o === 1 ? '' : o) + '\\sqrt{' + i + '}'; }
  var D = 180 / Math.PI;

  X('a2-differentiation', [
    function () {
      var k = pick([1, 2, 3]);
      return Q('Consider ' + M('y = xe^{-' + (k === 1 ? '' : k) + 'x}') + '.', [
        ['Find the stationary point and show it is a maximum.', 3, M('\\left(' + F(1, k) + ', \\frac{1}{' + (k === 1 ? '' : k) + 'e}\\right)') + '; ' + M('\\frac{d^2y}{dx^2} < 0') + ' there'],
        ['Find the point of inflection.', 3, M('x = ' + F(2, k)) + ', where ' + M('\\frac{d^2y}{dx^2} = ' + (k === 1 ? '' : k) + 'e^{-' + (k === 1 ? '' : k) + 'x}(' + (k === 1 ? '' : k) + 'x - 2) = 0').replace('(x - 2)', '(x - 2)')],
        ['State where the curve is concave.', 1, M('x < ' + F(2, k))]
      ]);
    },
    function () {
      var k = pick([3, 12, 27, 48]), a = Math.sqrt(k / 3);
      return Q('A curve has equation ' + M('x^2 + xy + y^2 = ' + k) + '.', [
        ['Find ' + M('\\frac{dy}{dx}') + '.', 3, M('-\\frac{2x + y}{x + 2y}')],
        ['Find the points where the tangent is horizontal.', 3, M('y = -2x') + ': ' + M('(' + a + ', ' + (-2 * a) + ')') + ' and ' + M('(' + (-a) + ', ' + 2 * a + ')')],
        ['Find the points where the tangent is vertical.', 1, M('(' + (-2 * a) + ', ' + a + ')') + ' and ' + M('(' + 2 * a + ', ' + (-a) + ')')]
      ]);
    },
    function () {
      var r = ri(2, 10), dv = ri(10, 50);
      return Q('A spherical balloon is inflated at ' + dv + ' cm³ s⁻¹.', [
        ['Find the rate of increase of the radius when ' + M('r = ' + r) + ' cm.', 3, M('\\frac{dr}{dt} = \\frac{' + dv + '}{4\\pi(' + r + ')^2} = ' + sf3(dv / (4 * Math.PI * r * r))) + ' cm s⁻¹'],
        ['Find the rate of increase of the surface area at that moment.', 2, M('\\frac{dS}{dt} = 8\\pi r\\frac{dr}{dt} = ' + sf3(2 * dv / r)) + ' cm² s⁻¹'],
        ['Show that ' + M('\\frac{dS}{dt} = \\frac{2}{r}\\frac{dV}{dt}') + '.', 1, 'Combine the two chain-rule results']
      ]);
    },
    function () {
      var a = pick([1, 3, 4, 9]);
      return Q('Consider ' + M('y = \\ln(x^2 + ' + a + ')') + '.', [
        ['Find ' + M('\\frac{dy}{dx}') + ' and ' + M('\\frac{d^2y}{dx^2}') + '.', 3, M('\\frac{2x}{x^2 + ' + a + '}') + ', ' + M('\\frac{2(' + a + ' - x^2)}{(x^2 + ' + a + ')^2}')],
        ['Find the points of inflection.', 2, M('x = \\pm ' + (Math.sqrt(a) % 1 ? '\\sqrt{' + a + '}' : Math.sqrt(a)))],
        ['State where the curve is convex.', 1, M('|x| < ' + (Math.sqrt(a) % 1 ? '\\sqrt{' + a + '}' : Math.sqrt(a)))]
      ]);
    },
    function () {
      var a = pick([1, 4, 9, 16]), r = Math.sqrt(a);
      return Q('Consider ' + M('f(x) = \\frac{x}{x^2 + ' + a + '}') + '.', [
        ['Use the quotient rule to find ' + M('f\'(x)') + '.', 2, M('\\frac{' + a + ' - x^2}{(x^2 + ' + a + ')^2}')],
        ['Find the stationary points.', 2, M('\\left(' + r + ', ' + F(1, 2 * r) + '\\right)') + ' and ' + M('\\left(' + (-r) + ', -' + F(1, 2 * r) + '\\right)')],
        ['State the range of ' + M('f') + '.', 1, M('-' + F(1, 2 * r) + ' \\le f(x) \\le ' + F(1, 2 * r))]
      ]);
    },
    function () {
      var a = pick([2, 3, 10]);
      return Q('Consider ' + M('y = ' + a + '^x') + '.', [
        ['Show that ' + M('\\frac{dy}{dx} = ' + a + '^x\\ln ' + a) + '.', 2, 'Write ' + M(a + '^x = e^{x\\ln ' + a + '}')],
        ['Find the tangent at ' + M('x = 0') + '.', 2, M('y = (\\ln ' + a + ')x + 1')],
        ['For which base ' + M('b') + ' is the gradient at ' + M('x = 0') + ' exactly 1?', 1, M('b = e')]
      ]);
    },
    function () {
      return Q('Consider ' + M('y = e^x\\sin x') + ' for ' + M('0 \\le x \\le 2\\pi') + '.', [
        ['Find ' + M('\\frac{dy}{dx}') + '.', 2, M('e^x(\\sin x + \\cos x)')],
        ['Find the ' + M('x') + '-coordinates of the stationary points.', 2, M('\\tan x = -1') + ': ' + M('\\frac{3\\pi}{4}, \\frac{7\\pi}{4}')],
        ['Show that ' + M('\\frac{d^2y}{dx^2} = 2e^x\\cos x') + ' and classify the stationary points.', 3, M('\\frac{3\\pi}{4}') + ': maximum; ' + M('\\frac{7\\pi}{4}') + ': minimum']
      ]);
    },
    function () {
      return Q('Differentiate ' + M('\\sin x') + ' from first principles.', [
        ['Write the gradient of the chord and expand ' + M('\\sin(x + h)') + '.', 2, M('\\frac{\\sin x\\cos h + \\cos x\\sin h - \\sin x}{h}')],
        ['Use ' + M('\\frac{\\sin h}{h} \\to 1') + ' and ' + M('\\frac{\\cos h - 1}{h} \\to 0') + ' to complete the proof.', 2, M('\\cos x')],
        ['Explain why the result needs ' + M('x') + ' in radians.', 1, 'The limits above are only true in radians']
      ]);
    },
    function () {
      return Q('Derivatives of ' + M('\\tan x') + ' and ' + M('\\sec x') + '.', [
        ['Use the quotient rule to show ' + M('\\frac{d}{dx}\\tan x = \\sec^2 x') + '.', 2, M('\\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x}')],
        ['Show ' + M('\\frac{d}{dx}\\sec x = \\sec x\\tan x') + '.', 2, 'Differentiate ' + M('(\\cos x)^{-1}')],
        ['Find the gradient of ' + M('y = \\sec x + \\tan x') + ' at ' + M('x = \\frac{\\pi}{4}') + '.', 2, M('\\sqrt{2} + 2')]
      ]);
    },
    function () {
      var k = pick([5, 10, 13, 25]), p = { 5: [1, 2], 10: [1, 3], 13: [2, 3], 25: [3, 4] }[k];
      return Q('A curve has equation ' + M('x^2 + 2y^2 = ' + (p[0] * p[0] + 2 * p[1] * p[1])) + '.', [
        ['Find ' + M('\\frac{dy}{dx}') + ' at ' + M('(' + p[0] + ', ' + p[1] + ')') + '.', 2, M('-' + F(p[0], 2 * p[1]))],
        ['Find the equation of the normal at that point.', 2, M('y - ' + p[1] + ' = ' + F(2 * p[1], p[0]) + '(x - ' + p[0] + ')')],
        ['Find where the normal meets the ' + M('x') + '-axis.', 1, M('(' + F(p[0], 2) + ', 0)')]
      ]);
    }
  ]);

  X('a2-numerical', [
    function () {
      var f = function (x) { return x * x * x - 2 * x - 5; }, x = 2;
      var it = [2]; for (var i = 0; i < 3; i++) { x = Math.cbrt(2 * x + 5); it.push(x); }
      return Q('Let ' + M('f(x) = x^3 - 2x - 5') + '.', [
        ['Show there is a root between 2 and 3.', 2, M('f(2) = -1 < 0,\\ f(3) = 16 > 0') + ', and ' + M('f') + ' is continuous'],
        ['Show the equation can be written ' + M('x = \\sqrt[3]{2x + 5}') + ', and iterate from ' + M('x_0 = 2') + ' three times.', 3, it.slice(1).map(d4).join(', ')],
        ['Show the root is 2.095 to 3 d.p. by a suitable interval.', 2, M('f(2.0945) < 0 < f(2.0955)')]
      ]);
    },
    function () {
      var k = pick([2, 3, 5, 7, 10]);
      var x = 2, it = []; for (var i = 0; i < 3; i++) { x = (x + k / x) / 2; it.push(x); }
      return Q('Use Newton–Raphson to find ' + M('\\sqrt{' + k + '}') + '.', [
        ['Show that Newton–Raphson for ' + M('f(x) = x^2 - ' + k) + ' gives ' + M('x_{n + 1} = \\frac{1}{2}\\left(x_n + \\frac{' + k + '}{x_n}\\right)') + '.', 2, M('x - \\frac{x^2 - ' + k + '}{2x}')],
        ['Iterate three times from ' + M('x_0 = 2') + '.', 2, it.map(function (v) { return v.toFixed(6); }).join(', ')],
        ['Explain why ' + M('x_0 = 0') + ' would fail.', 1, M('f\'(0) = 0') + ': division by zero']
      ]);
    },
    function () {
      var a = ri(1, 4);
      return Q('A student says: “' + M('f(x) = \\frac{1}{x - ' + a + '}') + ' changes sign between ' + (a - 1) + ' and ' + (a + 1) + ', so there is a root there.”', [
        ['Check the sign change.', 1, M('f(' + (a - 1) + ') = -1,\\ f(' + (a + 1) + ') = 1')],
        ['Explain why the conclusion is wrong.', 2, 'The function is not continuous: it has an asymptote at ' + M('x = ' + a) + ', and no root'],
        ['Give an example where a root exists but there is no sign change.', 1, M('f(x) = (x - 1)^2') + ' on ' + M('[0, 2]')]
      ]);
    },
    function () {
      var c = pick([0.5, 1, 2]);
      return Q('The equation ' + M('x = ' + (c === 1 ? '' : c) + 'e^{-x}') + ' is solved by iteration ' + M('x_{n + 1} = ' + (c === 1 ? '' : c) + 'e^{-x_n}') + '.', [
        ['Find the root to 3 s.f. by iterating from ' + M('x_0 = 0.5') + '.', 3, (function () { var x = 0.5; for (var i = 0; i < 200; i++) x = c * Math.exp(-x); return sf3(x); })()],
        ['Explain the condition on ' + M('g\'(x)') + ' for convergence near the root, and check it.', 2, M('|g\'(\\alpha)| = \\alpha < 1') + ' here (since ' + M('g\'(x) = -g(x)') + ')'],
        ['Describe the shape of the diagram (staircase or cobweb).', 1, 'Cobweb, as ' + M('g\'') + ' is negative']
      ]);
    },
    function () {
      var n = pick([2, 4]);
      var h = 1 / n, s = 0; for (var i = 0; i <= n; i++) { var y = Math.exp(Math.pow(i * h, 2)); s += (i === 0 || i === n) ? y : 2 * y; }
      var T = h / 2 * s;
      return Q('Use the trapezium rule to estimate ' + M('\\int_0^1 e^{x^2}\\, dx') + '.', [
        ['Use ' + n + ' strips.', 3, d4(T)],
        ['Is this an over- or underestimate? Explain.', 2, 'Overestimate: the curve is convex, so the trapezia lie above it'],
        ['How could the estimate be improved?', 1, 'Use more, narrower strips']
      ]);
    },
    function () {
      return Q('Newton–Raphson is applied to ' + M('f(x) = x^3 - 3x + 1') + '.', [
        ['Find ' + M('f\'(x)') + ' and explain what happens if ' + M('x_0 = 1') + '.', 2, M('3x^2 - 3') + '; ' + M('f\'(1) = 0') + ', so the method fails'],
        ['Use ' + M('x_0 = 0.3') + ' to find a root to 3 d.p.', 3, (function () { var x = 0.3; for (var i = 0; i < 20; i++) x = x - (x * x * x - 3 * x + 1) / (3 * x * x - 3); return x.toFixed(3); })()],
        ['Explain geometrically why starting near a stationary point is risky.', 1, 'The tangent is nearly horizontal, so it meets the axis far away']
      ]);
    },
    function () {
      var x = 1, it = []; for (var i = 0; i < 4; i++) { x = Math.log(3 - x); it.push(x); }
      return Q('Solve ' + M('e^x = 3 - x') + '.', [
        ['Show a root lies between 0 and 1.', 2, 'Sign change of ' + M('e^x + x - 3') + ': ' + M('-2') + ' and ' + sf3(Math.E - 2)],
        ['Use ' + M('x_{n + 1} = \\ln(3 - x_n)') + ' with ' + M('x_0 = 1') + ' to find ' + M('x_1') + ' to ' + M('x_4') + '.', 2, it.map(d4).join(', ')],
        ['Explain why the alternative ' + M('x = 3 - e^x') + ' fails to converge.', 2, M('|g\'(x)| = e^x > 1') + ' near the root']
      ]);
    },
    function () {
      var T = function (n) { var h = 1 / n, s = 0; for (var i = 0; i <= n; i++) { var y = 1 / (1 + i * h); s += (i === 0 || i === n) ? y : 2 * y; } return h / 2 * s; };
      return Q('Estimate ' + M('\\int_1^2 \\frac{1}{x}\\, dx') + '.', [
        ['Use the trapezium rule with 2 and with 4 strips.', 3, d4(T(2)) + ' and ' + d4(T(4))],
        ['Find the exact value and the percentage error for each.', 2, M('\\ln 2 = ' + d4(Math.LN2)) + '; ' + sf3(100 * (T(2) - Math.LN2) / Math.LN2) + '% and ' + sf3(100 * (T(4) - Math.LN2) / Math.LN2) + '%'],
        ['Comment on the effect of doubling the number of strips.', 1, 'The error falls to roughly a quarter']
      ]);
    },
    function () {
      return Q('Staircase and cobweb diagrams.', [
        ['For ' + M('x_{n + 1} = g(x_n)') + ', what does the diagram look like when ' + M('0 < g\'(\\alpha) < 1') + '?', 1, 'A staircase converging to the root'],
        ['What happens when ' + M('-1 < g\'(\\alpha) < 0') + '?', 1, 'A cobweb converging to the root'],
        ['What happens when ' + M('|g\'(\\alpha)| > 1') + '?', 1, 'The iterations move away from the root']
      ]);
    },
    function () {
      var x = 0.5; for (var i = 0; i < 100; i++) x = Math.exp(-x);
      return Q('How many roots does ' + M('e^{-x} = x') + ' have?', [
        ['Sketch both graphs and explain.', 2, 'One: ' + M('e^{-x}') + ' decreases and ' + M('x') + ' increases, so they cross once'],
        ['Locate the root between consecutive tenths.', 2, '0.5 and 0.6'],
        ['Find the root to 3 d.p.', 2, x.toFixed(3)]
      ]);
    }
  ]);

  X('a2-integration', [
    function () {
      return Q('Integration by parts.', [
        ['Find ' + M('\\int xe^x\\, dx') + '.', 2, M('xe^x - e^x + c')],
        ['Find ' + M('\\int x^2e^x\\, dx') + '.', 3, M('e^x(x^2 - 2x + 2) + c')],
        ['Predict ' + M('\\int x^3e^x\\, dx') + ' and check by differentiating.', 2, M('e^x(x^3 - 3x^2 + 6x - 6) + c')]
      ]);
    },
    function () {
      var a = pick([3, 8, 15]), b = Math.sqrt(a + 1);
      var val = (2 / 5) * (Math.pow(b, 5) - 1) - (2 / 3) * (Math.pow(b, 3) - 1);
      return Q('Find ' + M('\\int_0^{' + a + '} x\\sqrt{x + 1}\\, dx') + '.', [
        ['Use ' + M('u = x + 1') + ' to rewrite the integral.', 2, M('\\int_1^{' + (a + 1) + '} (u - 1)u^{1/2}\\, du')],
        ['Evaluate it exactly.', 3, M(F(Math.round(val * 15), 15))],
        ['Check using integration by parts.', 2, 'The same answer']
      ]);
    },
    function () {
      var a = ri(1, 3), b = ri(2, 5);
      return Q('Find ' + M('\\int_1^{' + b + '} \\frac{' + a + '}{x(x + ' + a + ')}\\, dx') + '.', [
        ['Write the integrand in partial fractions.', 2, M('\\frac{1}{x} - \\frac{1}{x + ' + a + '}')],
        ['Evaluate exactly.', 3, M('\\ln\\frac{' + b * (1 + a) + '}{' + (b + a) + '}')],
        ['Find the limit of the integral as the upper limit tends to infinity.', 1, M('\\ln ' + (1 + a))]
      ]);
    },
    function () {
      return Q('Find the area enclosed between ' + M('y = \\sin x') + ' and ' + M('y = \\cos x') + ' between consecutive intersections.', [
        ['Find the first two positive intersections.', 2, M('\\frac{\\pi}{4}') + ' and ' + M('\\frac{5\\pi}{4}')],
        ['Find the area exactly.', 3, M('2\\sqrt{2}')],
        ['Explain why each enclosed region has the same area.', 1, 'Both curves repeat every ' + M('2\\pi') + ', and the regions are congruent by symmetry']
      ]);
    },
    function () {
      var k = pick([2, 3]), y0 = pick([1, 2]);
      return Q('Solve ' + M('\\frac{dy}{dx} = ' + c1(k, 'xy^2')) + ', given ' + M('y = ' + y0) + ' when ' + M('x = 0') + '.', [
        ['Separate the variables and integrate.', 3, M('-\\frac{1}{y} = ' + cf(F(k, 2), 'x^2') + ' + c')],
        ['Find ' + M('y') + ' in terms of ' + M('x') + '.', 2, M('y = \\frac{' + 2 * y0 + '}{2 - ' + k * y0 + 'x^2}')],
        ['Explain why the solution breaks down at a certain value of ' + M('x') + '.', 1, M('x = ' + sf3(Math.sqrt(2 / (k * y0)))) + ': the denominator is zero']
      ]);
    },
    function () {
      return Q('Trigonometric integrals.', [
        ['Show that ' + M('\\int \\tan x\\, dx = \\ln|\\sec x| + c') + '.', 2, 'Write ' + M('\\frac{\\sin x}{\\cos x}') + ' as ' + M('-\\frac{f\'(x)}{f(x)}')],
        ['Find ' + M('\\int \\sin^2 x\\, dx') + '.', 2, M('\\frac{x}{2} - \\frac{\\sin 2x}{4} + c')],
        ['Find ' + M('\\int_0^{\\pi} \\sin^2 x\\, dx') + ' and explain why it equals ' + M('\\int_0^{\\pi} \\cos^2 x\\, dx') + '.', 2, M('\\frac{\\pi}{2}') + '; they add to ' + M('\\pi') + ' and are equal by symmetry']
      ]);
    },
    function () {
      var a = pick([2, 3, 'e']);
      return Q('Find ' + M('\\int_1^{' + a + '} \\ln x\\, dx') + '.', [
        ['Use integration by parts with ' + M('u = \\ln x') + ', ' + M('\\frac{dv}{dx} = 1') + '.', 2, M('x\\ln x - x + c')],
        ['Evaluate exactly.', 2, a === 'e' ? '1' : M(a + '\\ln ' + a + ' - ' + (a - 1))],
        ['Find ' + M('\\int \\ln(2x)\\, dx') + '.', 1, M('x\\ln(2x) - x + c')]
      ]);
    },
    function () {
      var a = ri(15, 25), N0 = ri(80, 100), k = pick([0.1, 0.2]);
      return Q('A drink cools so that ' + M('\\frac{dT}{dt} = -' + k + '(T - ' + a + ')') + ', with ' + M('T = ' + N0) + ' at ' + M('t = 0') + '.', [
        ['Solve to find ' + M('T') + ' in terms of ' + M('t') + '.', 3, M('T = ' + a + ' + ' + (N0 - a) + 'e^{-' + k + 't}')],
        ['Find when ' + M('T = ' + (a + 10)) + '.', 2, sf3(Math.log((N0 - a) / 10) / k)],
        ['Interpret ' + a + ' in context.', 1, 'The room temperature, which the drink approaches']
      ]);
    },
    function () {
      var a = ri(1, 9);
      return Q('Integrals of the form ' + M('\\int \\frac{f\'(x)}{f(x)}\\, dx') + '.', [
        ['Find ' + M('\\int \\frac{2x}{x^2 + ' + a + '}\\, dx') + '.', 1, M('\\ln(x^2 + ' + a + ') + c')],
        ['Find ' + M('\\int \\frac{x}{x^2 + ' + a + '}\\, dx') + '.', 1, M('\\frac{1}{2}\\ln(x^2 + ' + a + ') + c')],
        ['Find ' + M('\\int_0^{1} \\frac{e^x}{e^x + 1}\\, dx') + ' exactly.', 2, M('\\ln\\frac{e + 1}{2}')]
      ]);
    },
    function () {
      var n = pick([2, 3]);
      return Q('Find ' + M('\\int \\sin^{' + n + '} x\\cos x\\, dx') + '.', [
        ['Use the substitution ' + M('u = \\sin x') + '.', 2, M('\\frac{\\sin^{' + (n + 1) + '} x}{' + (n + 1) + '} + c')],
        ['Evaluate from 0 to ' + M('\\frac{\\pi}{2}') + '.', 1, M(F(1, n + 1))],
        ['Find ' + M('\\int \\cos^3 x\\, dx') + '.', 3, M('\\sin x - \\frac{\\sin^3 x}{3} + c')]
      ]);
    }
  ]);

  X('a2-vectors', [
    function () {
      var A = [ri(-3, 3), ri(-3, 3), ri(-3, 3)], d = pick([[2, 3, 6], [1, 4, 8], [2, 6, 9], [1, 2, 2], [4, 4, 7]]);
      var B = [A[0] + d[0], A[1] + d[1], A[2] + d[2]], m = mag(d);
      return Q(M('A = (' + A.join(', ') + ')') + ' and ' + M('B = (' + B.join(', ') + ')') + '.', [
        ['Find ' + M('|\\vec{AB}|') + '.', 2, m],
        ['Find a unit vector in the direction of ' + M('\\vec{AB}') + '.', 1, M('\\frac{1}{' + m + '}' + V3(d))],
        ['Find the angle ' + M('\\vec{AB}') + ' makes with the positive ' + M('z') + '-axis.', 2, sf3(Math.acos(d[2] / m) * D) + '°']
      ]);
    },
    function () {
      var a, b, c; do { a = [ri(1, 4), ri(-2, 3), ri(0, 3)]; b = [ri(-2, 3), ri(1, 4), ri(-1, 3)]; c = [ri(2, 5), ri(2, 5), ri(-3, 0)]; var u = sub(b, a), w = sub(c, a); var cr = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]]; } while (mag(cr) < 1e-9);
      var AB = mag(sub(b, a)), AC = mag(sub(c, a)), BC = mag(sub(c, b));
      var ang = Math.acos((AB * AB + AC * AC - BC * BC) / (2 * AB * AC)) * D;
      return Q('Triangle ' + M('ABC') + ' has ' + M('A(' + a.join(', ') + '), B(' + b.join(', ') + '), C(' + c.join(', ') + ')') + '.', [
        ['Find the lengths of the sides.', 3, [AB, AC, BC].map(sf3).join(', ')],
        ['Find angle ' + M('BAC') + '.', 2, sf3(ang) + '°'],
        ['Find the area.', 1, sf3(0.5 * AB * AC * Math.sin(ang / D))]
      ]);
    },
    function () {
      var A = [ri(-2, 2), ri(-2, 2), ri(-2, 2)], d = [nz(-2, 2), nz(-2, 2), nz(-2, 2)], k = ri(2, 3);
      var B = [A[0] + d[0], A[1] + d[1], A[2] + d[2]], C = [A[0] + k * d[0], A[1] + k * d[1], A[2] + k * d[2] + 1];
      return Q('Points ' + M('A(' + A.join(', ') + ')') + ', ' + M('B(' + B.join(', ') + ')') + ', ' + M('C(' + C.join(', ') + ')') + '.', [
        ['Find ' + M('\\vec{AB}') + ' and ' + M('\\vec{AC}') + '.', 2, M(V3(d)) + ', ' + M(V3(sub(C, A)))],
        ['Decide whether ' + M('A, B, C') + ' are collinear.', 2, 'No: ' + M('\\vec{AC}') + ' is not a multiple of ' + M('\\vec{AB}')],
        ['Change the ' + M('z') + '-coordinate of ' + M('C') + ' so that they are collinear.', 1, A[2] + k * d[2]]
      ]);
    },
    function () {
      var A = [ri(0, 3), ri(0, 3), ri(0, 3)], B = [ri(3, 6), ri(-1, 2), ri(0, 3)], C = [ri(2, 6), ri(3, 6), ri(1, 4)];
      var Dd = [A[0] + C[0] - B[0], A[1] + C[1] - B[1], A[2] + C[2] - B[2]];
      return Q(M('ABCD') + ' is a parallelogram with ' + M('A(' + A.join(', ') + '), B(' + B.join(', ') + '), C(' + C.join(', ') + ')') + '.', [
        ['Find ' + M('D') + '.', 2, M('(' + Dd.join(', ') + ')')],
        ['Find the point where the diagonals meet.', 1, M('(' + [F(A[0] + C[0], 2), F(A[1] + C[1], 2), F(A[2] + C[2], 2)].join(', ') + ')')],
        ['Find the lengths of the diagonals and say whether it is a rectangle.', 2, sf3(mag(sub(C, A))) + ' and ' + sf3(mag(sub(Dd, B))) + '; ' + (Math.abs(mag(sub(C, A)) - mag(sub(Dd, B))) < 1e-9 ? 'yes' : 'no')]
      ]);
    },
    function () {
      var A = [ri(-3, 3), ri(-3, 3), ri(-3, 3)], m = ri(1, 3), n = ri(1, 3), d = [(m + n) * nz(-2, 2), (m + n) * nz(-2, 2), (m + n) * nz(-2, 2)];
      var B = [A[0] + d[0], A[1] + d[1], A[2] + d[2]], P = [A[0] + d[0] * m / (m + n), A[1] + d[1] * m / (m + n), A[2] + d[2] * m / (m + n)];
      return Q('Find the point ' + M('P') + ' dividing ' + M('AB') + ' in the ratio ' + M(m + ' : ' + n) + ', where ' + M('A(' + A.join(', ') + ')') + ' and ' + M('B(' + B.join(', ') + ')') + '.', [
        ['Find ' + M('P') + '.', 2, M('(' + P.join(', ') + ')')],
        ['Show that ' + M('\\vec{OP} = \\frac{' + n + '\\mathbf{a} + ' + m + '\\mathbf{b}}{' + (m + n) + '}') + '.', 2, M('\\mathbf{a} + \\frac{' + m + '}{' + (m + n) + '}(\\mathbf{b} - \\mathbf{a})')],
        ['Find the point dividing ' + M('AB') + ' externally so that ' + M('AQ : QB = 2 : 1') + ' with ' + M('Q') + ' beyond ' + M('B') + '.', 2, M('(' + [A[0] + 2 * d[0], A[1] + 2 * d[1], A[2] + 2 * d[2]].join(', ') + ')')]
      ]);
    },
    function () {
      var v = pick([[1, 2, 2], [2, 3, 6], [1, 4, 8], [2, 6, 9]]), m = mag(v);
      return Q('Let ' + M('\\mathbf{v} = ' + V3(v)) + '.', [
        ['Find the angles ' + M('\\mathbf{v}') + ' makes with each of the axes.', 3, v.map(function (c) { return sf3(Math.acos(c / m) * D) + '°'; }).join(', ')],
        ['Show that the squares of the cosines of these angles add to 1.', 2, M('\\frac{' + v[0] * v[0] + ' + ' + v[1] * v[1] + ' + ' + v[2] * v[2] + '}{' + m * m + '} = 1')]
      ]);
    },
    function () {
      var t = pick([[2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9]]);
      return Q('The vector ' + M('\\begin{pmatrix}' + t[0] + '\\\\ p\\\\ ' + t[2] + '\\end{pmatrix}') + ' has magnitude ' + t[3] + '.', [
        ['Find the possible values of ' + M('p') + '.', 2, M('\\pm ' + t[1])],
        ['For positive ' + M('p') + ', find the vector of magnitude ' + 2 * t[3] + ' in the opposite direction.', 1, M(V3([-2 * t[0], -2 * t[1], -2 * t[2]]))]
      ]);
    },
    function () {
      var f = [[ri(-3, 3), ri(-3, 3), ri(-3, 3)], [ri(-3, 3), ri(-3, 3), ri(-3, 3)]], m = ri(2, 5);
      var R = [f[0][0] + f[1][0], f[0][1] + f[1][1], f[0][2] + f[1][2]];
      return Q('Forces ' + M(V3(f[0])) + ' N and ' + M(V3(f[1])) + ' N act on a particle of mass ' + m + ' kg.', [
        ['Find the resultant and the magnitude of the acceleration.', 3, M(V3(R)) + ', ' + sf3(mag(R) / m) + ' m s⁻²'],
        ['Find the force needed to keep the particle in equilibrium.', 1, M(V3(R.map(function (v) { return -v; })))]
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(1, 4), c = ri(1, 4);
      var p = Math.sqrt(a * a + b * b), q = Math.sqrt(b * b + c * c), r = Math.sqrt(a * a + c * c);
      var area = 0.5 * Math.sqrt(a * a * b * b + b * b * c * c + a * a * c * c);
      return Q('The points ' + M('(' + a + ', 0, 0)') + ', ' + M('(0, ' + b + ', 0)') + ' and ' + M('(0, 0, ' + c + ')') + ' form a triangle.', [
        ['Find the side lengths.', 2, [p, q, r].map(sf3).join(', ')],
        ['Find the area of the triangle.', 3, sf3(area)],
        ['Explain why the triangle is always acute.', 1, 'Each side squared is less than the sum of the other two squared (e.g. ' + M('a^2 + b^2 < (a^2 + c^2) + (b^2 + c^2)') + ')']
      ]);
    },
    function () {
      var k = ri(1, 4);
      var A = [0, 0, 0], B = [2 * k, 0, 0], C = [k, k, 0], Dd = [k, 0, k];
      return Q('Show that ' + M('A(0, 0, 0), B(' + 2 * k + ', 0, 0), C(' + k + ', ' + k + ', 0)') + ' form a right-angled isosceles triangle.', [
        ['Find the side lengths.', 2, M(cf(k, '\\sqrt{2}')) + ', ' + M(cf(k, '\\sqrt{2}')) + ', ' + 2 * k],
        ['Show it is right-angled, and say where.', 2, M('2k^2 + 2k^2 = 4k^2') + '; at ' + M('C')],
        ['Show that ' + M('D(' + k + ', 0, ' + k + ')') + ' is the same distance from ' + M('A, B') + ' and ' + M('C') + '.', 2, 'Each distance is ' + M(cf(k, '\\sqrt{2}'))]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
