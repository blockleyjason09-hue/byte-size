/* Byte Size Classroom — deeper extension questions (set 3, IB AI HL part f): transformations of graphs, linearising data, trigonometric equations and models, matrix transformations. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function S0(v) { return v ? S(v) : ''; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function xm(v) { return v ? '(x' + S(-v) + ')' : 'x'; }
  function P(x, y) { return '(' + x + ', ' + y + ')'; }
  function mat(a, b, c, d) { return '\\begin{pmatrix}' + a + ' & ' + b + '\\\\' + c + ' & ' + d + '\\end{pmatrix}'; }
  function vec(a, b) { return '\\begin{pmatrix}' + a + '\\\\' + b + '\\end{pmatrix}'; }
  function list(a) { return a.map(function (v) { return sf3(v); }).join(', '); }

  X('ib-transform', [
    function () {
      var a = pick([2, 3, -1, -2]), c = nz(-3, 3), d = nz(-4, 4), px = nz(-3, 3), py = nz(-3, 3);
      return Q('The point ' + M(P(px, py)) + ' lies on ' + M('y = f(x)') + '.', [
        ['Find its image on ' + M('y = ' + c1(a, 'f(x' + S(c) + ')') + S(d)) + '.', 3, M(P(px - c, a * py + d))],
        ['List the transformations in a correct order.', 2, 'Translate ' + (-c) + ' horizontally, stretch vertically by ' + a + (a < 0 ? ' (including a reflection in the x-axis)' : '') + ', then translate ' + d + ' vertically'],
        ['Explain why the vertical stretch must come before the vertical translation here.', 1, 'Stretching after translating would also stretch the translation']
      ]);
    },
    function () {
      var b = pick([2, 3, 0.5]), c = nz(-3, 3);
      return Q('The graph of ' + M('y = x^2') + ' is transformed to ' + M('y = (' + (b === 0.5 ? '0.5' : b) + 'x' + S(c) + ')^2') + '.', [
        ['Describe the transformations in order, taking care with the horizontal stretch.', 3, 'Translate by ' + (-c) + ' horizontally, then stretch horizontally by scale factor ' + M(F(b === 0.5 ? 2 : 1, b === 0.5 ? 1 : b))],
        ['Find the vertex of the new graph.', 1, M(P(F(-c * (b === 0.5 ? 2 : 1), b === 0.5 ? 1 : b), 0))],
        ['Show that the same graph can be obtained by a vertical stretch and a translation.', 2, M('(' + (b === 0.5 ? '0.5' : b) + 'x' + S(c) + ')^2 = ' + (b * b) + '\\left(x ' + (c > 0 ? '+ ' : '- ') + F(Math.abs(c) * (b === 0.5 ? 2 : 1), b === 0.5 ? 1 : b) + '\\right)^2')]
      ]);
    },
    function () {
      var a = ri(2, 5), k = pick([2, 3]);
      return Q('The function ' + M('f(x) = ' + a + '\\sin x') + ' is transformed to ' + M('g(x) = ' + a + '\\sin(' + k + 'x) + 1') + '.', [
        ['Describe the transformations.', 2, 'Horizontal stretch scale factor ' + M(F(1, k)) + ', then translation 1 up'],
        ['State the period and range of ' + M('g') + '.', 2, M(F(2, k) + '\\pi') + '; ' + M((1 - a) + ' \\le g(x) \\le ' + (1 + a))],
        ['How many solutions does ' + M('g(x) = 1') + ' have for ' + M('0 \\le x \\le 2\\pi') + '?', 2, 2 * k + 1]
      ]);
    },
    function () {
      var c = nz(-4, 4);
      return Q('Reflections of ' + M('f(x) = e^x') + '.', [
        ['Write the equations of the reflections of ' + M('y = e^x') + ' in the ' + M('x') + '-axis and in the ' + M('y') + '-axis.', 2, M('y = -e^x') + ' and ' + M('y = e^{-x}')],
        ['Write the equation after reflecting in the ' + M('y') + '-axis and then translating by ' + M(vec(c, 0)) + '.', 2, M('y = e^{-(x' + S(-c) + ')}')],
        ['Find the ' + M('y') + '-intercept of this graph.', 1, M('e^{' + c + '}')]
      ]);
    },
    function () {
      var p = nz(-3, 3), q = nz(-3, 3), a = pick([2, -1, 3]);
      return Q('The minimum point of ' + M('y = f(x)') + ' is ' + M(P(p, q)) + '.', [
        ['Find the corresponding point on ' + M('y = ' + c1(a, 'f(x)')) + ' and state its type.', 2, M(P(p, a * q)) + (a < 0 ? ', a maximum' : ', a minimum')],
        ['Find the corresponding point on ' + M('y = f(2x' + S(-p) + ')') + '.', 2, M(P(p, q))],
        ['Explain why the answer to the previous part is the same point.', 1, 'The transformations happen to map ' + M('x = ' + p) + ' to itself']
      ]);
    },
    function () {
      var a = ri(2, 6), b = pick([0.5, 2, 3]);
      return Q('A model ' + M('h(t) = ' + a + 'e^{-' + b + 't}') + ' is transformed to ' + M('H(t) = ' + 2 * a + 'e^{-' + b + '(t - 1)}') + '.', [
        ['Describe the two transformations.', 2, 'Vertical stretch by 2 and translation 1 to the right'],
        ['Show that ' + M('H') + ' is also a single vertical stretch of ' + M('h') + ' and find its factor.', 2, M('H = ' + 2 * a + 'e^{' + b + '}e^{-' + b + 't}') + '; factor ' + M('2e^{' + b + '}')],
        ['Explain why a horizontal translation of an exponential is equivalent to a vertical stretch.', 1, M('e^{-b(t - c)} = e^{bc}e^{-bt}')]
      ]);
    },
    function () {
      var a = nz(-3, 3), b = nz(-3, 3);
      return Q('The graph of ' + M('y = \\frac{1}{x}') + ' is translated by ' + M(vec(a, b)) + '.', [
        ['Write the new equation.', 1, M('y = \\frac{1}{x' + S(-a) + '}' + S(b))],
        ['State the asymptotes.', 1, M('x = ' + a + ',\\ y = ' + b)],
        ['Find where the new graph crosses the axes.', 3, M(P(0, F(-1 + a * b, a))) + ' and ' + M(P(F(a * b - 1, b), 0))]
      ]);
    },
    function () {
      var k = pick([2, 3, 4]);
      return Q('The function ' + M('f(x) = x^3') + ' is stretched.', [
        ['Write the equation after a horizontal stretch scale factor ' + k + '.', 1, M('y = \\left(\\frac{x}{' + k + '}\\right)^3')],
        ['Show that this is also a vertical stretch and find its factor.', 2, M('\\frac{1}{' + k * k * k + '}')],
        ['Explain why this does not work for ' + M('f(x) = x^3 + 1') + '.', 1, 'The constant term is not scaled']
      ]);
    },
    function () {
      var a = ri(2, 5), b = ri(1, 4);
      return Q('Temperature is modelled by ' + M('T(t) = ' + a + '\\cos\\left(\\frac{\\pi t}{12}\\right) + 15') + ', with ' + M('t') + ' in hours after midnight.', [
        ['State the maximum and minimum temperatures and when they occur.', 2, (15 + a) + ' °C at midnight; ' + (15 - a) + ' °C at noon'],
        ['The model is changed so the maximum is at ' + (14 + b) + ':00. Write the new model.', 2, M('T = ' + a + '\\cos\\left(\\frac{\\pi(t - ' + (14 + b) + ')}{12}\\right) + 15')],
        ['Explain which transformation this is.', 1, 'Horizontal translation by ' + (14 + b) + ' hours']
      ]);
    },
    function () {
      var p = nz(-3, 3);
      return Q('The graph of ' + M('y = \\ln x') + ' is transformed to ' + M('y = \\ln(x' + S(-p) + ') + 2') + '.', [
        ['State the vertical asymptote and the domain.', 2, M('x = ' + p) + '; ' + M('x > ' + p)],
        ['Find the ' + M('x') + '-intercept.', 2, M('x = ' + p + ' + e^{-2} = ' + sf3(p + Math.exp(-2)))],
        ['Show that ' + M('\\ln(x' + S(-p) + ') + 2 = \\ln(e^2(x' + S(-p) + '))') + ' and interpret this as a stretch.', 2, 'A horizontal stretch about ' + M('x = ' + p) + ' by scale factor ' + M('e^{-2}')]
      ]);
    }
  ]);

  X('ib-linearise', [
    function () {
      var a = pick([2, 3, 5]), n = pick([1.5, 2, 0.5, 3]);
      return Q('Data are believed to follow ' + M('y = ax^n') + '.', [
        ['Show that ' + M('\\ln y = n\\ln x + \\ln a') + '.', 1, 'Take natural logs'],
        ['A graph of ' + M('\\ln y') + ' against ' + M('\\ln x') + ' has gradient ' + n + ' and intercept ' + sf3(Math.log(a)) + '. Find the model.', 2, M('y = ' + a + 'x^{' + n + '}')],
        ['Predict ' + M('y') + ' when ' + M('x = 4') + '.', 1, sf3(a * Math.pow(4, n))]
      ]);
    },
    function () {
      var a = pick([2, 4, 10]), b = pick([1.5, 2, 0.8]);
      return Q('Data are believed to follow ' + M('y = ab^x') + '.', [
        ['Show that ' + M('\\ln y') + ' is linear in ' + M('x') + '.', 1, M('\\ln y = x\\ln b + \\ln a')],
        ['The line of ' + M('\\ln y') + ' against ' + M('x') + ' has gradient ' + sf3(Math.log(b)) + ' and intercept ' + sf3(Math.log(a)) + '. Find ' + M('a') + ' and ' + M('b') + '.', 2, M('a = ' + a + ',\\ b = ' + b)],
        ['Describe the behaviour as ' + M('x') + ' increases.', 1, b > 1 ? 'Exponential growth' : 'Exponential decay towards 0']
      ]);
    },
    function () {
      var xs = [1, 2, 4, 8], n = pick([2, 0.5]), a = pick([3, 5]);
      var ys = xs.map(function (x) { return a * Math.pow(x, n); });
      return Q('The data ' + xs.map(function (x, i) { return P(x, sf3(ys[i])); }).join(', ') + ' are given.', [
        ['Explain why plotting ' + M('y') + ' against ' + M('x') + ' does not give a straight line, but ' + M('\\log y') + ' against ' + M('\\log x') + ' does.', 2, 'The ratio of ' + M('y') + ' values is constant when ' + M('x') + ' doubles: a power law'],
        ['Find the model.', 3, M('y = ' + a + 'x^{' + n + '}')],
        ['Explain why ' + M('y = ab^x') + ' would not fit.', 1, 'Equal steps in ' + M('x') + ' do not give equal ratios in ' + M('y')]
      ]);
    },
    function () {
      var m = pick([1.2, 0.8, 2.5]), c = pick([0.5, 1.1, 2.3]);
      return Q('A scientist plots ' + M('\\log_{10} y') + ' against ' + M('\\log_{10} x') + ' and finds the line ' + M('\\log_{10} y = ' + m + '\\log_{10} x + ' + c) + '.', [
        ['Express ' + M('y') + ' in terms of ' + M('x') + '.', 2, M('y = ' + sf3(Math.pow(10, c)) + 'x^{' + m + '}')],
        ['Find ' + M('y') + ' when ' + M('x = 50') + '.', 1, sf3(Math.pow(10, c) * Math.pow(50, m))],
        ['Explain why the intercept must be converted with ' + M('10^c') + '.', 1, 'The intercept is ' + M('\\log_{10} a') + ', not ' + M('a')]
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(1, 4);
      return Q('A relationship has the form ' + M('y = \\frac{a}{x} + b') + '.', [
        ['What should be plotted to get a straight line?', 1, M('y') + ' against ' + M('\\frac{1}{x}')],
        ['The line has gradient ' + a + ' and intercept ' + b + '. Find ' + M('y') + ' when ' + M('x = 0.5') + '.', 2, 2 * a + b],
        ['What happens to ' + M('y') + ' as ' + M('x') + ' becomes large?', 1, 'It approaches ' + b]
      ]);
    },
    function () {
      return Q('Choosing a model.', [
        ['Data give a straight line when ' + M('\\ln y') + ' is plotted against ' + M('x') + ' but not against ' + M('\\ln x') + '. Which model fits?', 1, M('y = ab^x') + ' (exponential)'],
        ['Explain how residuals can help choose between two linearised models.', 2, 'The model whose residuals are smaller and show no pattern fits better'],
        ['Why might ' + M('R^2') + ' for the linearised data be misleading about the original data?', 1, 'It measures fit on the log scale, not the original scale']
      ]);
    },
    function () {
      var k = pick([0.3, 0.5, 0.8]), T0 = pick([80, 90]);
      return Q('Coffee cools so that ' + M('T - 20 = ' + (T0 - 20) + 'e^{-kt}') + '.', [
        ['Show that ' + M('\\ln(T - 20)') + ' is linear in ' + M('t') + '.', 1, M('\\ln(T - 20) = \\ln ' + (T0 - 20) + ' - kt')],
        ['A line of ' + M('\\ln(T - 20)') + ' against ' + M('t') + ' has gradient ' + (-k) + '. State ' + M('k') + ' and find when ' + M('T = 40') + '.', 2, M('k = ' + k) + ', ' + M('t = ' + sf3(Math.log((T0 - 20) / 20) / k))],
        ['Why is 20 subtracted before taking logs?', 1, 'The model decays towards 20, not 0']
      ]);
    },
    function () {
      var a = pick([2, 3]), n = pick([2, 3]);
      return Q('The period ' + M('T') + ' of a planet and its distance ' + M('r') + ' from the sun satisfy ' + M('T = kr^{1.5}') + '.', [
        ['What straight-line graph tests this law?', 1, M('\\ln T') + ' against ' + M('\\ln r') + ', with gradient 1.5'],
        ['If one planet is ' + n * n + ' times as far from the sun as another, how many times as long is its period?', 2, n * n * n],
        ['Explain why ' + M('T^2 \\propto r^3') + ' is equivalent.', 1, 'Square both sides: ' + M('T^2 = k^2r^3')]
      ]);
    },
    function () {
      var a = pick([2, 5]), b = pick([1.2, 1.5]);
      return Q('Using technology, a regression ' + M('y = ' + a + ' \\times ' + b + '^x') + ' is found for data with ' + M('0 \\le x \\le 10') + '.', [
        ['Predict ' + M('y') + ' at ' + M('x = 5') + ' and ' + M('x = 20') + '.', 2, sf3(a * Math.pow(b, 5)) + ' and ' + sf3(a * Math.pow(b, 20))],
        ['Comment on the reliability of each prediction.', 1, 'The first is interpolation; the second is extrapolation and unreliable'],
        ['Find the value of ' + M('x') + ' for which ' + M('y = 100') + '.', 2, sf3(Math.log(100 / a) / Math.log(b))]
      ]);
    },
    function () {
      var a = pick([4, 6]), b = pick([0.5, 0.25]);
      return Q('Data are modelled by ' + M('y = a - be^{-x}') + ' with ' + M('a = ' + a) + '.', [
        ['What straight line could be plotted to find ' + M('b') + '?', 2, M('\\ln(' + a + ' - y)') + ' against ' + M('x') + ': gradient −1, intercept ' + M('\\ln b')],
        ['The intercept is ' + sf3(Math.log(b)) + '. Find ' + M('b') + '.', 1, b],
        ['Explain why this method needs ' + M('a') + ' to be known first.', 1, 'Otherwise ' + M('a - y') + ' cannot be calculated']
      ]);
    }
  ]);

  X('ib-trig-eq', [
    function () {
      var k = pick([0.3, 0.5, 0.7, -0.4]);
      var b = Math.asin(k), sols = [];
      [b, Math.PI - b].forEach(function (t) { for (var n = -1; n <= 2; n++) { var x = t + 2 * Math.PI * n; if (x >= -1e-9 && x <= 2 * Math.PI + 1e-9) sols.push(x); } });
      sols.sort(function (p, q) { return p - q; });
      return Q('Solve ' + M('\\sin x = ' + k) + ' for ' + M('0 \\le x \\le 2\\pi') + '.', [
        ['Find all solutions, in radians to 3 s.f.', 3, list(sols)],
        ['Explain how the second solution relates to the first.', 1, 'By symmetry of the sine graph: ' + M('\\pi - x') + ' (adjusted into the interval)'],
        ['How many solutions are there for ' + M('0 \\le x \\le 6\\pi') + '?', 1, 6]
      ]);
    },
    function () {
      return Q('Solve ' + M('2\\cos^2 x - \\cos x - 1 = 0') + ' for ' + M('0 \\le x \\le 2\\pi') + '.', [
        ['Factorise as a quadratic in ' + M('\\cos x') + '.', 2, M('(2\\cos x + 1)(\\cos x - 1) = 0')],
        ['Find all solutions exactly.', 3, M('0, \\frac{2\\pi}{3}, \\frac{4\\pi}{3}, 2\\pi')],
        ['Explain why ' + M('\\cos x = 1') + ' gives two solutions in this interval.', 1, 'Both endpoints 0 and ' + M('2\\pi') + ' are included']
      ]);
    },
    function () {
      var A = ri(2, 6), D = ri(8, 15), P = pick([12, 24]), h = ri(D - A + 1, D + A - 1);
      var w = 2 * Math.PI / P, s = Math.asin((h - D) / A) / w, t1 = s < 0 ? s + P : s, t2 = P / 2 - s;
      t2 = ((t2 % P) + P) % P;
      var ts = [t1, t2].sort(function (p, q) { return p - q; });
      return Q('The depth of water in a harbour is ' + M('d = ' + A + '\\sin\\left(\\frac{2\\pi t}{' + P + '}\\right) + ' + D) + ' metres, ' + M('t') + ' hours after midnight.', [
        ['State the maximum depth and the period.', 2, (A + D) + ' m; ' + P + ' hours'],
        ['Find the times in the first cycle when the depth is ' + h + ' m.', 3, list(ts) + ' hours'],
        ['A boat needs at least ' + h + ' m. For how long in each cycle can it enter?', 2, sf3(h >= D ? Math.abs(ts[1] - ts[0]) : P - Math.abs(ts[1] - ts[0])) + ' hours']
      ]);
    },
    function () {
      return Q('Solve ' + M('\\sin 2x = \\cos x') + ' for ' + M('0 \\le x \\le 2\\pi') + '.', [
        ['Use ' + M('\\sin 2x = 2\\sin x\\cos x') + ' and factorise.', 2, M('\\cos x(2\\sin x - 1) = 0')],
        ['Find all solutions exactly.', 3, M('\\frac{\\pi}{6}, \\frac{\\pi}{2}, \\frac{5\\pi}{6}, \\frac{3\\pi}{2}')],
        ['Explain why dividing by ' + M('\\cos x') + ' would be a mistake.', 1, 'It loses the solutions where ' + M('\\cos x = 0')]
      ]);
    },
    function () {
      var k = pick([2, 3]);
      return Q('Solve ' + M('\\tan(' + k + 'x) = 1') + ' for ' + M('0 \\le x \\le \\pi') + '.', [
        ['State the interval for ' + M(k + 'x') + '.', 1, M('0 \\le ' + k + 'x \\le ' + k + '\\pi')],
        ['Find all solutions.', 3, (function () { var r = []; for (var n = 0; n < 2 * k; n++) { var x = (Math.PI / 4 + n * Math.PI) / k; if (x <= Math.PI + 1e-9) r.push(x); } return list(r); })()],
        ['Explain the spacing between the solutions.', 1, M('\\frac{\\pi}{' + k + '}') + ': the period of ' + M('\\tan(' + k + 'x)')]
      ]);
    },
    function () {
      return Q('Prove and use the identity ' + M('\\frac{1 - \\cos 2x}{\\sin 2x} \\equiv \\tan x') + '.', [
        ['Prove the identity using double angle formulae.', 3, M('\\frac{2\\sin^2 x}{2\\sin x\\cos x}')],
        ['Hence solve ' + M('\\frac{1 - \\cos 2x}{\\sin 2x} = \\sqrt{3}') + ' for ' + M('0 < x < \\pi') + '.', 2, M('x = \\frac{\\pi}{3}')],
        ['State the values of ' + M('x') + ' in ' + M('0 < x < \\pi') + ' for which the left side has no value.', 1, M('x = \\frac{\\pi}{2}') + ' (where ' + M('\\sin 2x = 0') + ')']
      ]);
    },
    function () {
      var A = ri(3, 8), B = ri(2, 6);
      return Q('A Ferris wheel has radius ' + A + ' m with its centre ' + (A + B) + ' m above the ground. It turns once every 10 minutes, starting at the bottom.', [
        ['Write the height as ' + M('h = ' + (A + B) + ' - ' + A + '\\cos(kt)') + ' and find ' + M('k') + '.', 2, M('k = \\frac{\\pi}{5}')],
        ['Find when the rider first reaches ' + (A + B) + ' m.', 1, '2.5 minutes'],
        ['For how long in each turn is the rider above ' + (2 * A + B - 1) + ' m?', 3, sf3(10 / Math.PI * Math.acos((A - 1) / A)) + ' minutes']
      ]);
    },
    function () {
      return Q('Solve ' + M('3\\sin x = 2\\cos^2 x') + ' for ' + M('0 \\le x \\le 2\\pi') + '.', [
        ['Write as a quadratic in ' + M('\\sin x') + '.', 2, M('2\\sin^2 x + 3\\sin x - 2 = 0')],
        ['Solve, rejecting any impossible values.', 3, M('\\sin x = \\frac{1}{2}') + ': ' + M('\\frac{\\pi}{6}, \\frac{5\\pi}{6}') + '; ' + M('\\sin x = -2') + ' is rejected'],
        ['Check one solution by substitution.', 1, M('3 \\times \\frac{1}{2} = 2 \\times \\frac{3}{4}')]
      ]);
    },
    function () {
      var a = ri(2, 5), b = ri(2, 5);
      var R = Math.hypot(a, b), al = Math.atan2(b, a);
      return Q('Consider ' + M('f(x) = ' + a + '\\sin x + ' + b + '\\cos x') + '.', [
        ['Use technology to find the maximum value and where it first occurs for ' + M('x \\ge 0') + '.', 2, sf3(R) + ' at ' + M('x = ' + sf3(Math.PI / 2 - al))],
        ['Show that the maximum equals ' + M('\\sqrt{' + (a * a + b * b) + '}') + '.', 2, 'Write as ' + M('R\\sin(x + \\alpha)') + ' with ' + M('R^2 = ' + a * a + ' + ' + b * b)],
        ['Solve ' + M('f(x) = ' + Math.min(a, b)) + ' for ' + M('0 \\le x \\le 2\\pi') + ' using technology.', 2, (function () { var r = [], st = Math.asin(Math.min(a, b) / R); [st - al, Math.PI - st - al].forEach(function (x) { x = ((x % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI); r.push(x); }); return list(r.sort(function (p, q) { return p - q; })); })()]
      ]);
    },
    function () {
      var n = pick([3, 4, 5]);
      return Q('Consider ' + M('\\cos(' + n + 'x) = 0') + ' for ' + M('0 \\le x \\le 2\\pi') + '.', [
        ['How many solutions are there? Explain.', 2, 2 * n + ': ' + M(n + 'x') + ' covers ' + n + ' full cycles, each with 2 zeros'],
        ['Find the smallest and largest solutions.', 2, M('\\frac{\\pi}{' + 2 * n + '}') + ' and ' + M('\\frac{' + (4 * n - 1) + '\\pi}{' + 2 * n + '}')],
        ['Find the sum of all the solutions.', 2, M(2 * n + '\\pi')]
      ]);
    }
  ]);

  X('ib-mat-transform', [
    function () {
      var k = pick([2, 3]), t = pick([90, 180]);
      var R = t === 90 ? [0, -1, 1, 0] : [-1, 0, 0, -1];
      return Q('A transformation is a rotation of ' + t + '° anticlockwise about the origin followed by an enlargement scale factor ' + k + '.', [
        ['Write the matrix for each and find the combined matrix.', 3, M(mat(k * R[0], k * R[1], k * R[2], k * R[3]))],
        ['Find the image of ' + M(P(2, 1)) + '.', 1, M(P(k * (2 * R[0] + R[1]), k * (2 * R[2] + R[3])))],
        ['Find the area scale factor and explain it using the determinant.', 1, k * k + ': ' + M('\\det = ' + k * k)]
      ]);
    },
    function () {
      var th = pick([30, 45, 60]);
      var c = Math.cos(th * Math.PI / 180), s = Math.sin(th * Math.PI / 180);
      return Q('The matrix ' + M('R = \\begin{pmatrix}\\cos\\theta & -\\sin\\theta\\\\\\sin\\theta & \\cos\\theta\\end{pmatrix}') + ' rotates by ' + M('\\theta') + ' anticlockwise.', [
        ['Write ' + M('R') + ' for ' + M('\\theta = ' + th + '°') + ' with exact values.', 2, th === 30 ? M('\\begin{pmatrix}\\frac{\\sqrt{3}}{2}&-\\frac{1}{2}\\\\\\frac{1}{2}&\\frac{\\sqrt{3}}{2}\\end{pmatrix}') : th === 45 ? M('\\frac{1}{\\sqrt{2}}' + mat(1, -1, 1, 1)) : M('\\begin{pmatrix}\\frac{1}{2}&-\\frac{\\sqrt{3}}{2}\\\\\\frac{\\sqrt{3}}{2}&\\frac{1}{2}\\end{pmatrix}')],
        ['Find the smallest ' + M('n') + ' with ' + M('R^n = I') + '.', 1, 360 / th],
        ['Show that ' + M('\\det R = 1') + ' for every ' + M('\\theta') + ', and interpret.', 2, M('\\cos^2\\theta + \\sin^2\\theta = 1') + ': rotations preserve area']
      ]);
    },
    function () {
      var th = pick([30, 45, 60]);
      return Q('The matrix for reflection in the line through the origin at angle ' + M('\\theta') + ' to the ' + M('x') + '-axis is ' + M('\\begin{pmatrix}\\cos 2\\theta & \\sin 2\\theta\\\\\\sin 2\\theta & -\\cos 2\\theta\\end{pmatrix}') + '.', [
        ['Find the matrix for reflection in ' + M('y = x') + ' using this formula.', 1, M(mat(0, 1, 1, 0))],
        ['Find the reflection in the line at ' + th + '°, giving exact values.', 2, th === 45 ? M(mat(0, 1, 1, 0)) : th === 30 ? M('\\begin{pmatrix}\\frac{1}{2}&\\frac{\\sqrt{3}}{2}\\\\\\frac{\\sqrt{3}}{2}&-\\frac{1}{2}\\end{pmatrix}') : M('\\begin{pmatrix}-\\frac{1}{2}&\\frac{\\sqrt{3}}{2}\\\\\\frac{\\sqrt{3}}{2}&\\frac{1}{2}\\end{pmatrix}')],
        ['Show that the determinant of any reflection matrix is −1, and interpret.', 2, M('-\\cos^2 2\\theta - \\sin^2 2\\theta = -1') + ': area preserved, orientation reversed']
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(1, 4), c = ri(-2, 2), d = ri(1, 4); if (a * d - b * c === 0) d++;
      var det = a * d - b * c;
      return Q('A triangle with vertices ' + M('(0, 0), (2, 0), (0, 3)') + ' is transformed by ' + M(mat(a, b, c, d)) + '.', [
        ['Find the image vertices.', 2, M(P(0, 0) + ', ' + P(2 * a, 2 * c) + ', ' + P(3 * b, 3 * d))],
        ['Find the area of the image.', 2, 3 * Math.abs(det)],
        ['Does the transformation reverse orientation? Explain.', 1, det < 0 ? 'Yes: the determinant is negative' : 'No: the determinant is positive']
      ]);
    },
    function () {
      var A = [0, 1, 1, 0], B = [1, 0, 0, -1];
      return Q(M('A = ' + mat(0, 1, 1, 0)) + ' (reflection in ' + M('y = x') + ') and ' + M('B = ' + mat(1, 0, 0, -1)) + ' (reflection in the ' + M('x') + '-axis).', [
        ['Find ' + M('AB') + ' and describe it.', 2, M(mat(0, -1, 1, 0)) + ': rotation 90° anticlockwise'],
        ['Find ' + M('BA') + ' and describe it.', 2, M(mat(0, 1, -1, 0)) + ': rotation 90° clockwise'],
        ['Explain why two reflections always combine to a rotation.', 1, 'Each reverses orientation; two reversals restore it, and the determinant is ' + M('(-1)(-1) = 1')]
      ]);
    },
    function () {
      var k = nz(-3, 3);
      return Q('The shear ' + M('S = ' + mat(1, k, 0, 1)) + ' is applied.', [
        ['Find the image of the unit square and its area.', 2, M('(0,0), (1,0), (' + (1 + k) + ', 1), (' + k + ', 1)') + '; area 1'],
        ['Find the invariant line of points.', 1, 'The ' + M('x') + '-axis'],
        ['Find ' + M('S^{-1}') + ' and describe it.', 2, M(mat(1, -k, 0, 1)) + ': the shear in the opposite direction']
      ]);
    },
    function () {
      var a = nz(-4, 4), b = nz(-4, 4);
      return Q('A transformation maps ' + M('\\mathbf{x}') + ' to ' + M('A\\mathbf{x} + \\mathbf{b}') + ' with ' + M('A = ' + mat(0, -1, 1, 0)) + ' and ' + M('\\mathbf{b} = ' + vec(a, b)) + '.', [
        ['Find the image of the origin and of ' + M(P(1, 0)) + '.', 2, M(P(a, b)) + ' and ' + M(P(a, b + 1))],
        ['Find the fixed point, solving ' + M('A\\mathbf{x} + \\mathbf{b} = \\mathbf{x}') + '.', 3, M(P(F(a - b, 2), F(a + b, 2)))],
        ['Describe the transformation.', 1, 'Rotation 90° anticlockwise about ' + M(P(F(a - b, 2), F(a + b, 2)))]
      ]);
    },
    function () {
      var a = ri(2, 4), d = pick([2, 3, 0.5]);
      return Q(M('T = ' + mat(a, 0, 0, d)) + ' is applied to the circle ' + M('x^2 + y^2 = 1') + '.', [
        ['Describe ' + M('T') + '.', 1, 'Stretch by ' + a + ' horizontally and ' + d + ' vertically'],
        ['Find the equation of the image.', 2, M('\\frac{x^2}{' + a * a + '} + \\frac{y^2}{' + d * d + '} = 1')],
        ['Find the area of the image.', 1, M(sf3(a * d) + '\\pi')]
      ]);
    },
    function () {
      var a = nz(-3, 3), b = nz(-3, 3), c = nz(-3, 3), d = nz(-3, 3);
      var det = a * d - b * c;
      return Q('A transformation has matrix ' + M(mat(a, b, c, d)) + '.', [
        ['Find the determinant.', 1, det],
        ['Explain what happens to the unit square if the determinant is 0.', 1, 'It collapses onto a line (area 0)'],
        ['Find the image of the line ' + M('y = x') + '.', 2, det === 0 ? 'A line or point: the matrix is singular' : 'The line through the origin in the direction ' + M(vec(a + b, c + d))]
      ]);
    },
    function () {
      var n = pick([3, 4, 6, 8]);
      return Q('A matrix ' + M('M') + ' represents a rotation of ' + M('\\frac{2\\pi}{' + n + '}') + ' about the origin.', [
        ['Find ' + M('M^{' + n + '}') + ' and explain.', 1, M('I') + ': ' + n + ' rotations make a full turn'],
        ['Write ' + M('M^{-1}') + ' as a power of ' + M('M') + '.', 1, M('M^{' + (n - 1) + '}')],
        ['A regular ' + n + '-gon has a vertex at ' + M(P(1, 0)) + '. Explain how ' + M('M') + ' generates the other vertices.', 1, 'Apply ' + M('M, M^2, \\ldots, M^{' + (n - 1) + '}') + ' to ' + M(P(1, 0))]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
