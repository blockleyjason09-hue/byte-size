/* Byte Size Classroom — deeper extension questions (set 3, IB AI SL/HL part i): derivatives, optimisation, integration (shared SL/HL), differentiation rules (HL). */
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
  function trap(f, a, b, n) { var h = (b - a) / n, s = (f(a) + f(b)) / 2; for (var i = 1; i < n; i++) s += f(a + i * h); return s * h; }

  X(['sl-derivatives', 'ib-derivatives'], [
    function () {
      var a = nz(-3, 3), b = ri(-4, 4), x0 = nz(-2, 2);
      var y0 = a * x0 * x0 * x0 + b * x0, m = 3 * a * x0 * x0 + b;
      return Q('The curve ' + M('y = ' + poly([a, 0, b, 0])) + ' passes through ' + M(P(x0, y0)) + '.', [
        ['Find the gradient at this point.', 1, m],
        ['Find the equation of the tangent.', 2, M('y = ' + (m === 0 ? String(y0) : c1(m, 'x') + S0(y0 - m * x0)))],
        ['Find the other point on the curve with the same gradient.', 2, M(P(-x0, -y0))]
      ]);
    },
    function () {
      var p = ri(1, 3), q = p + ri(1, 3);
      return Q('Let ' + M('f(x) = x^3 - ' + num(1.5 * (p + q)) + 'x^2 + ' + 3 * p * q + 'x') + '.', [
        ['Find the intervals where ' + M('f') + ' is decreasing.', 3, M(p + ' < x < ' + q)],
        ['Find the coordinates of the local maximum.', 2, M(P(p, sf3(p * p * p - 1.5 * (p + q) * p * p + 3 * p * q * p)))],
        ['Explain how the sign of ' + M("f'(x)") + ' changes either side of a local maximum.', 1, 'From positive to negative']
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(2, 9);
      return Q('The cost of producing ' + M('x') + ' items is ' + M('C(x) = ' + a + 'x^2 + ' + b + 'x + 100') + ' dollars.', [
        ['Find the marginal cost ' + M("C'(x)") + ' and interpret ' + M("C'(10)") + '.', 2, M(2 * a + 'x + ' + b) + '; about $' + (20 * a + b) + ' to make the 11th item'],
        ['Compare with the actual cost of the 11th item.', 1, '$' + (a * 21 + b)],
        ['Explain why the two differ.', 1, 'The derivative gives an instantaneous rate, while the cost changes over the whole interval']
      ]);
    },
    function () {
      var k = pick([2, 3, 4]);
      return Q('Consider ' + M('f(x) = x^' + k) + '.', [
        ['Find the gradient of the chord from ' + M('x = 1') + ' to ' + M('x = 1 + h') + ' for ' + M('h = 0.1') + ' and ' + M('h = 0.01') + '.', 2, sf3((Math.pow(1.1, k) - 1) / 0.1) + ' and ' + sf3((Math.pow(1.01, k) - 1) / 0.01)],
        ['What do these approach, and why?', 1, k + ': the gradient of the tangent at ' + M('x = 1')],
        ['Explain why the chord gradient is always larger here.', 1, 'The curve is getting steeper (concave up)']
      ]);
    },
    function () {
      var a = ri(1, 3), b = ri(-3, 3);
      return Q('The normal to ' + M('y = x^2' + S0(b)) + ' at ' + M('x = ' + a) + ' is drawn.', [
        ['Find its equation.', 3, M('y' + S0(-(a * a + b)) + ' = -\\frac{1}{' + 2 * a + '}' + xm(a))],
        ['Find where it crosses the ' + M('y') + '-axis.', 1, M(P(0, F(2 * a * (a * a + b) + a, 2 * a)))],
        ['Explain why the gradients of tangent and normal multiply to −1.', 1, 'They are perpendicular']
      ]);
    },
    function () {
      var a = nz(-2, 2), c = ri(-5, 5);
      return Q('The gradient of a curve is ' + M("f'(x) = " + poly([3 * a, 0, -3 * a])) + '.', [
        ['Find the ' + M('x') + '-coordinates of the stationary points.', 1, M('x = \\pm 1')],
        ['Use ' + M("f''(x)") + ' to classify them.', 2, a > 0 ? 'Minimum at 1, maximum at −1' : 'Maximum at 1, minimum at −1'],
        ['Given ' + M('f(0) = ' + c) + ', find the values of ' + M('f') + ' at these points.', 2, M('f(1) = ' + (c - 2 * a) + ',\\ f(-1) = ' + (c + 2 * a))]
      ]);
    },
    function () {
      var k = pick([0.5, 1, 2]);
      return Q('Use technology with ' + M('f(x) = x^3 - 3x') + '.', [
        ['Find the gradient at ' + M('x = ' + k) + '.', 1, sf3(3 * k * k - 3)],
        ['Find where the gradient equals 9.', 2, M('x = \\pm 2')],
        ['Find the range of values of ' + M('x') + ' where the curve is increasing.', 2, M('x < -1') + ' or ' + M('x > 1')]
      ]);
    },
    function () {
      var p = ri(10, 40), q = ri(1, 4);
      return Q('The temperature of a liquid is ' + M('T = ' + p + ' + ' + q + 't - 0.1t^2') + ' °C after ' + M('t') + ' minutes.', [
        ['Find the rate of change at ' + M('t = 5') + '.', 1, sf3(q - 1) + ' °C per minute'],
        ['Find when the temperature stops rising and the maximum temperature.', 2, sf3(5 * q) + ' min, ' + sf3(p + 2.5 * q * q) + ' °C'],
        ['Is this model realistic for large ' + M('t') + '? Explain.', 1, 'No: it predicts temperatures decreasing without limit']
      ]);
    },
    function () {
      var a = ri(2, 5);
      return Q('Consider ' + M('y = \\frac{' + a + '}{x}') + ' for ' + M('x > 0') + '.', [
        ['Write ' + M('y') + ' as a power of ' + M('x') + ' and differentiate.', 1, M('-' + a + 'x^{-2}')],
        ['Explain why the gradient is always negative.', 1, M('x^2 > 0')],
        ['Find the point where the gradient is ' + M('-' + a * 4) + '.', 2, M(P(F(1, 2), 2 * a))]
      ]);
    },
    function () {
      var a = ri(2, 5);
      return Q('For ' + M('y = x^2 - ' + 2 * a + 'x') + ':', [
        ['Find the gradient function and where it is zero.', 1, M('2x - ' + 2 * a) + '; ' + M('x = ' + a)],
        ['Sketch both the curve and the gradient function on the same axes.', 2, 'Parabola with minimum at ' + M('x = ' + a) + '; straight line crossing the axis at ' + M('x = ' + a)],
        ['Explain how the gradient function shows where the curve is increasing.', 1, 'The curve increases where the gradient function is positive: ' + M('x > ' + a)]
      ]);
    }
  ]);

  X(['sl-optimisation', 'ib-optimisation'], [
    function () {
      var P = 4 * ri(10, 30);
      return Q('A farmer has ' + P + ' m of fencing to make a rectangular pen against a wall (three sides fenced).', [
        ['Show that the area is ' + M('A = x(' + P + ' - 2x)') + ', where ' + M('x') + ' is the width.', 1, 'The length is ' + M(P + ' - 2x')],
        ['Find the maximum area.', 3, (P * P / 8) + ' m² when ' + M('x = ' + P / 4)],
        ['Explain why this is a maximum.', 1, M("A''(x) = -4 < 0")]
      ]);
    },
    function () {
      var V = pick([1000, 500, 2000]);
      var r = Math.cbrt(V / (2 * Math.PI));
      return Q('A closed cylindrical can holds ' + V + ' cm³.', [
        ['Write the surface area in terms of ' + M('r') + '.', 2, M('A = 2\\pi r^2 + \\frac{' + 2 * V + '}{r}')],
        ['Use technology or calculus to minimise ' + M('A') + '.', 3, M('r = ' + sf3(r)) + ' cm, ' + M('A = ' + sf3(2 * Math.PI * r * r + 2 * V / r)) + ' cm²'],
        ['Real cans are often taller than this. Suggest a reason.', 1, 'Ease of holding, packaging or labelling']
      ]);
    },
    function () {
      var L = 6 * ri(2, 6);
      return Q('Squares of side ' + M('x') + ' are cut from the corners of a ' + L + ' cm square sheet to make an open box.', [
        ['Write ' + M('V(x)') + ' and state the domain.', 2, M('V = x(' + L + ' - 2x)^2') + ', ' + M('0 < x < ' + L / 2)],
        ['Find the maximum volume.', 3, (2 * L * L * L / 27) + ' cm³ at ' + M('x = ' + L / 6)],
        ['Explain why the endpoints of the domain give zero volume.', 1, 'Either there are no sides, or no base']
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(20, 60);
      return Q('The profit from selling at price ' + M('p') + ' dollars is ' + M('P = -' + a + 'p^2 + ' + b * a / 2 * 2 + 'p - 500') + '.', [
        ['Find the price that maximises profit.', 2, num(b / 2)],
        ['Find the maximum profit.', 1, num(a * b * b / 4 - 500)],
        ['Find the prices for which the profit is positive.', 2, (function () { var D = a * a * b * b - 2000 * a; if (D <= 0) return 'None'; var r = Math.sqrt(D) / (2 * a); return M(sf3(b / 2 - r) + ' < p < ' + sf3(b / 2 + r)); })()]
      ]);
    },
    function () {
      var k = ri(2, 9);
      return Q('Find the point on ' + M('y = x^2') + ' closest to ' + M(P(0, k)) + '.', [
        ['Show that the squared distance is ' + M('D = x^2 + (x^2 - ' + k + ')^2') + '.', 1, 'Pythagoras'],
        ['Minimise ' + M('D') + ' with respect to ' + M('x') + '.', 3, M('x = \\pm\\sqrt{' + F(2 * k - 1, 2) + '}')],
        ['Find the minimum distance.', 1, sf3(Math.sqrt(k - 0.25))]
      ]);
    },
    function () {
      var w = ri(20, 50), c1v = ri(2, 6), c2v = c1v + ri(2, 6);
      return Q('A cable runs from a point on one bank of a river ' + w + ' m wide to a point 100 m downstream on the other bank. It costs $' + c2v + '/m underwater and $' + c1v + '/m along the bank.', [
        ['Write the cost if the cable crosses to a point ' + M('x') + ' m downstream.', 2, M('C = ' + c2v + '\\sqrt{' + w * w + ' + x^2} + ' + c1v + '(100 - x)')],
        ['Use technology to find the minimum cost.', 3, (function () { var best = 1e9, bx = 0; for (var x = 0; x <= 100; x += 0.01) { var c = c2v * Math.sqrt(w * w + x * x) + c1v * (100 - x); if (c < best) { best = c; bx = x; } } return 'At ' + M('x = ' + sf3(bx)) + ', $' + sf3(best); })()],
        ['Explain why it is not optimal to cross straight to the destination.', 1, 'The bank is cheaper, so it saves money to cover some distance along it']
      ]);
    },
    function () {
      var P = ri(20, 60);
      return Q('A window is a rectangle topped by a semicircle. Its perimeter is ' + P + ' m.', [
        ['If the width is ' + M('2r') + ', show that the height of the rectangle is ' + M('\\frac{' + P + ' - 2r - \\pi r}{2}') + '.', 2, 'Perimeter ' + M('2r + 2h + \\pi r')],
        ['Show that the area is ' + M('A = ' + P + 'r - 2r^2 - \\frac{\\pi r^2}{2}') + '.', 2, M('2rh + \\frac{1}{2}\\pi r^2')],
        ['Find the value of ' + M('r') + ' that maximises the light let in.', 2, sf3(P / (4 + Math.PI)) + ' m']
      ]);
    },
    function () {
      var a = ri(1, 4);
      return Q('A rectangle has two vertices on the ' + M('x') + '-axis and two on ' + M('y = ' + a * a * 4 + ' - x^2') + '.', [
        ['Write the area in terms of the ' + M('x') + '-coordinate of the right-hand vertex.', 2, M('A = 2x(' + 4 * a * a + ' - x^2)')],
        ['Find the maximum area.', 3, sf3(2 * (2 * a / Math.sqrt(3)) * (4 * a * a - 4 * a * a / 3)) + ' at ' + M('x = \\frac{' + 2 * a + '}{\\sqrt{3}}')],
        ['Explain why ' + M('x = -\\frac{' + 2 * a + '}{\\sqrt{3}}') + ' is rejected.', 1, 'Lengths must be positive']
      ]);
    },
    function () {
      var c = ri(50, 200), k = ri(2, 8);
      return Q('The cost per hour of running a ship at speed ' + M('v') + ' is ' + M(c + ' + ' + k + 'v^2') + '. A journey is 1000 km.', [
        ['Show that the cost of the journey is ' + M('C = \\frac{' + 1000 * c + '}{v} + ' + 1000 * k + 'v') + '.', 2, 'Time is ' + M('\\frac{1000}{v}')],
        ['Find the speed that minimises the cost.', 3, M('v = \\sqrt{' + F(c, k) + '} = ' + sf3(Math.sqrt(c / k)))],
        ['Show that at this speed the two parts of the hourly cost are equal.', 1, M(k + 'v^2 = ' + c)]
      ]);
    },
    function () {
      var n = ri(80, 200), d = ri(1, 5), p = ri(20, 50);
      return Q('A theatre sells ' + n + ' tickets at $' + p + '. For each $1 rise in price, ' + d + ' fewer tickets are sold.', [
        ['Write the revenue for a rise of $' + M('x') + '.', 2, M('R = (' + p + ' + x)(' + n + ' - ' + c1(d, 'x') + ')')],
        ['Find the price that maximises revenue.', 3, '$' + sf3(p + (n / d - p) / 2)],
        ['Find the maximum revenue.', 1, '$' + sf3((p + (n / d - p) / 2) * (n - d * (n / d - p) / 2))]
      ]);
    }
  ]);

  X(['sl-integration', 'ib-integration'], [
    function () {
      var a = ri(1, 4);
      return Q('Find the area enclosed by ' + M('y = x(' + a + ' - x)') + ' and the ' + M('x') + '-axis.', [
        ['Find the area.', 3, M(F(a * a * a, 6))],
        ['Use technology to check your answer.', 1, sf3(a * a * a / 6)],
        ['Use the trapezoidal rule with 4 strips to estimate the area, and explain whether it is an over- or underestimate.', 3, sf3(trap(function (x) { return x * (a - x); }, 0, a, 4)) + ': underestimate (the curve is concave down)']
      ]);
    },
    function () {
      var a = nz(-3, 3), b = ri(-4, 4), x0 = ri(1, 3), y0 = ri(-5, 5);
      return Q("A curve has " + M("f'(x) = " + poly([2 * a, b])) + " and passes through " + M(P(x0, y0)) + '.', [
        ['Find ' + M('f(x)') + '.', 3, M('f(x) = ' + poly([a, b, y0 - a * x0 * x0 - b * x0]))],
        ['Find ' + M('f(0)') + '.', 1, y0 - a * x0 * x0 - b * x0],
        ['Explain why a point is needed.', 1, 'Integration gives a family of curves differing by a constant']
      ]);
    },
    function () {
      var k = ri(1, 5);
      return Q('Find the area between ' + M('y = x^2') + ' and ' + M('y = ' + c1(k, 'x')) + '.', [
        ['Find where they meet.', 1, M('x = 0, ' + k)],
        ['Find the area.', 3, M(F(k * k * k, 6))],
        ['Explain why ' + M('\\int (' + c1(k, 'x') + ' - x^2)\\,dx') + ' uses the line minus the curve.', 1, 'The line is above the curve between the intersections']
      ]);
    },
    function () {
      var h = pick([0.5, 1]), ys = [ri(2, 6), ri(4, 9), ri(5, 10), ri(4, 9), ri(2, 6)];
      var T = h / 2 * (ys[0] + 2 * (ys[1] + ys[2] + ys[3]) + ys[4]);
      return Q('A river’s depth (m) is measured every ' + h + ' m across: ' + ys.join(', ') + '.', [
        ['Use the trapezoidal rule to estimate the cross-sectional area.', 3, sf3(T) + ' m²'],
        ['The water flows at 0.4 m/s. Estimate the volume of water passing per second.', 1, sf3(0.4 * T) + ' m³'],
        ['Suggest how to improve the estimate.', 1, 'Take more measurements (smaller intervals)']
      ]);
    },
    function () {
      var a = ri(1, 3);
      return Q('The velocity of a car is ' + M('v = ' + a * 6 + 't - ' + a + 't^2') + ' m/s for ' + M('0 \\le t \\le 6') + '.', [
        ['Find the distance travelled.', 3, a * 36 + ' m'],
        ['Find the average speed.', 1, a * 6 + ' m/s'],
        ['Compare the average speed with the maximum speed.', 1, 'Maximum ' + a * 9 + ' m/s; average is ' + M('\\frac{2}{3}') + ' of it']
      ]);
    },
    function () {
      var b = ri(2, 5);
      return Q('Find ' + M('\\int_1^{' + b + '} \\frac{2}{x^2}\\,dx') + '.', [
        ['Integrate.', 2, M('-\\frac{2}{x}')],
        ['Evaluate.', 1, M(F(2 * (b - 1), b))],
        ['Find the limit of ' + M('\\int_1^{b} \\frac{2}{x^2}\\,dx') + ' as ' + M('b \\to \\infty') + ' and interpret.', 2, '2: the area under the curve from 1 onwards is finite']
      ]);
    },
    function () {
      var a = ri(1, 3), b = a + ri(1, 3);
      return Q('Use technology to find the area between ' + M('y = \\sin x') + ' and the ' + M('x') + '-axis for ' + M('0 \\le x \\le 2\\pi') + '.', [
        ['Explain why ' + M('\\int_0^{2\\pi}\\sin x\\,dx = 0') + '.', 1, 'Equal areas above and below the axis cancel'],
        ['Find the total area.', 2, 4],
        ['Find ' + M('\\int_0^{\\pi}\\sin x\\,dx') + ' exactly.', 1, 2]
      ]);
    },
    function () {
      var a = ri(2, 6);
      return Q('Find ' + M('k > 0') + ' such that the area under ' + M('y = ' + a + 'x^2') + ' from ' + M('0') + ' to ' + M('k') + ' is ' + 9 * a + '.', [
        ['Form an equation.', 2, M('\\frac{' + a + 'k^3}{3} = ' + 9 * a)],
        ['Solve.', 1, M('k = 3')],
        ['Find the value of ' + M('m') + ' for which the line ' + M('x = m') + ' splits this area in half.', 2, M('m = \\frac{3}{\\sqrt[3]{2}} = ' + sf3(3 / Math.cbrt(2)))]
      ]);
    },
    function () {
      var c = ri(1, 9);
      return Q('Find ' + M('\\int (3x^2 + 2x + ' + c + ')\\,dx') + '.', [
        ['Integrate.', 2, M('x^3 + x^2 + ' + c1(c, 'x') + ' + C')],
        ['Check your answer by differentiating.', 1, M('3x^2 + 2x + ' + c)],
        ['Explain why the constant ' + M('C') + ' is needed.', 1, 'Constants vanish on differentiation']
      ]);
    },
    function () {
      var n = pick([4, 8]);
      var f = function (x) { return 1 / (1 + x * x); };
      return Q('Estimate ' + M('\\int_0^1 \\frac{1}{1 + x^2}\\,dx') + '.', [
        ['Use the trapezoidal rule with ' + n + ' strips.', 3, sf3(trap(f, 0, 1, n))],
        ['The exact value is ' + M('\\frac{\\pi}{4}') + '. Find the percentage error.', 2, sf3(100 * Math.abs(trap(f, 0, 1, n) - Math.PI / 4) / (Math.PI / 4)) + '%'],
        ['Explain how this could be used to estimate ' + M('\\pi') + '.', 1, 'Multiply the estimate by 4']
      ]);
    }
  ]);

  X('ib-diff-rules', [
    function () {
      var a = ri(2, 5), b = ri(1, 4);
      return Q('Differentiate ' + M('y = (' + a + 'x + ' + b + ')^5') + '.', [
        ['Use the chain rule.', 2, M(5 * a + '(' + a + 'x + ' + b + ')^4')],
        ['Find where the gradient is zero and describe the point.', 2, M('x = -' + F(b, a)) + ': a stationary point of inflection'],
        ['Explain why the gradient is never negative.', 1, 'It is ' + 5 * a + ' times a fourth power']
      ]);
    },
    function () {
      var k = ri(1, 3);
      return Q('Let ' + M('f(x) = x^2e^{-' + (k === 1 ? '' : k) + 'x}') + '.', [
        ['Use the product rule to find ' + M("f'(x)") + '.', 2, M('xe^{-' + (k === 1 ? '' : k) + 'x}(2 - ' + c1(k, 'x') + ')')],
        ['Find the stationary points.', 2, M('x = 0') + ' and ' + M('x = ' + F(2, k))],
        ['Find the maximum value of ' + M('f') + ' for ' + M('x > 0') + '.', 1, sf3(4 / (k * k) * Math.exp(-2))]
      ]);
    },
    function () {
      var a = ri(1, 5);
      return Q('Differentiate ' + M('y = \\frac{x}{x^2 + ' + a + '}') + '.', [
        ['Use the quotient rule.', 3, M('\\frac{' + a + ' - x^2}{(x^2 + ' + a + ')^2}')],
        ['Find the maximum value of ' + M('y') + '.', 2, M('\\frac{1}{2\\sqrt{' + a + '}} = ' + sf3(1 / (2 * Math.sqrt(a))))],
        ['Explain why ' + M('y \\to 0') + ' as ' + M('x \\to \\infty') + '.', 1, 'The denominator grows faster than the numerator']
      ]);
    },
    function () {
      var a = ri(2, 6);
      return Q('Differentiate ' + M('y = \\ln(x^2 + ' + a + ')') + '.', [
        ['Use the chain rule.', 2, M('\\frac{2x}{x^2 + ' + a + '}')],
        ['Find the gradient at ' + M('x = 1') + '.', 1, M(F(2, 1 + a))],
        ['Find the ' + M('x') + '-coordinates where the gradient is greatest.', 3, M('x = \\sqrt{' + a + '}') + ' (gradient ' + M('\\frac{1}{\\sqrt{' + a + '}}') + ')']
      ]);
    },
    function () {
      var k = ri(2, 4);
      return Q('Let ' + M('y = \\sin(' + k + 'x)\\cos x') + '.', [
        ['Use the product rule to find ' + M('\\frac{dy}{dx}') + '.', 2, M(k + '\\cos(' + k + 'x)\\cos x - \\sin(' + k + 'x)\\sin x')],
        ['Find the gradient at ' + M('x = 0') + '.', 1, k],
        ['Use technology to find the first positive stationary point.', 2, (function () { for (var x = 0.001; x < 4; x += 0.0005) { var d = k * Math.cos(k * x) * Math.cos(x) - Math.sin(k * x) * Math.sin(x); if (d <= 0) return M('x \\approx ' + sf3(x)); } return '—'; })()]
      ]);
    },
    function () {
      var r = ri(2, 5), drdt = pick([0.1, 0.2, 0.5]);
      return Q('A circular ripple’s radius grows at ' + drdt + ' m/s.', [
        ['Find ' + M('\\frac{dA}{dt}') + ' when the radius is ' + r + ' m.', 3, M(sf3(2 * r * drdt) + '\\pi') + ' m²/s'],
        ['Explain how the chain rule links the rates.', 1, M('\\frac{dA}{dt} = \\frac{dA}{dr}\\times\\frac{dr}{dt}')],
        ['Explain why the area grows faster as the ripple gets bigger.', 1, M('\\frac{dA}{dr} = 2\\pi r') + ' increases with ' + M('r')]
      ]);
    },
    function () {
      var a = ri(2, 5);
      return Q('Find the derivative of ' + M('y = e^{' + a + 'x}\\sin x') + '.', [
        ['Use the product rule.', 2, M('e^{' + a + 'x}(' + a + '\\sin x + \\cos x)')],
        ['Find the first positive ' + M('x') + ' where the gradient is zero.', 2, M('\\tan x = -' + F(1, a)) + ': ' + M('x = ' + sf3(Math.PI - Math.atan(1 / a)))],
        ['Explain why the maxima grow larger.', 1, M('e^{' + a + 'x}') + ' increases']
      ]);
    },
    function () {
      var k = ri(2, 5);
      return Q('Let ' + M('y = \\tan(' + k + 'x)') + '.', [
        ['Find ' + M('\\frac{dy}{dx}') + '.', 2, M(k + '\\sec^2(' + k + 'x) = \\frac{' + k + '}{\\cos^2(' + k + 'x)}')],
        ['Explain why the gradient is always at least ' + k + '.', 1, M('\\cos^2 \\le 1')],
        ['Find the equation of the tangent at the origin.', 1, M('y = ' + k + 'x')]
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(2, 5);
      return Q('Use the second derivative with ' + M('y = x^3 - ' + 3 * a + 'x^2 + ' + b + 'x') + '.', [
        ['Find ' + M('\\frac{d^2y}{dx^2}') + '.', 1, M('6x - ' + 6 * a)],
        ['Find the point of inflection.', 2, M('x = ' + a)],
        ['Explain what a point of inflection means about the gradient.', 1, 'The gradient has a maximum or minimum there; concavity changes']
      ]);
    },
    function () {
      var k = ri(2, 6);
      return Q('Differentiate ' + M('y = \\sqrt{' + k + ' - x^2}') + '.', [
        ['Write as a power and use the chain rule.', 2, M('-\\frac{x}{\\sqrt{' + k + ' - x^2}}')],
        ['Explain the shape of the graph and why the gradient has no finite value at ' + M('x = \\pm\\sqrt{' + k + '}') + '.', 2, 'An upper semicircle; the tangent is vertical at its ends'],
        ['Show the tangent at any point is perpendicular to the radius.', 1, 'Radius gradient ' + M('\\frac{y}{x}') + ' times tangent gradient ' + M('-\\frac{x}{y}') + ' is −1']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
