/* Byte Size — IB Mathematics: Applications and Interpretation
   Part 4: Topic 5 Calculus (including differential equations). */
(function (g) {
  var BS = g.BS, D = BS.draw, IB = BS.ib;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, num = BS.num, M = BS.m, dp = BS.dp;
  var s3 = IB.s3, vec = IB.vec, mat = IB.mat, q1 = IB.q1, T = BS.topic;
  var dydx = '\\frac{\\mathrm{d}y}{\\mathrm{d}x}';

  T({ id: 'ib-derivatives', name: 'Differentiation: gradients, tangents and normals', video: 'IB maths AI tangent and normal differentiation', gens: [
    { d: [1], f: function () {
      var a = nz(-4, 5), n = ri(2, 4), b = nz(-8, 8), c = nz(-12, 12), k = ri(1, 3);
      var fp = function (x) { return a * n * Math.pow(x, n - 1) + b - c / (x * x); };
      return { stem: M('f(x) = ' + (a === 1 ? '' : a === -1 ? '-' : a) + 'x^{' + n + '}' + (b < 0 ? ' - ' : ' + ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x' + (c < 0 ? ' - ' : ' + ') + '\\frac{' + Math.abs(c) + '}{x}') + ', for ' + M('x \\ne 0') + '.', parts: [
        { q: 'Find ' + M("f'(x)") + '.', m: 3, a: M((a * n) + 'x^{' + (n - 1) + '}'.replace('^{1}', '') + sg(b) + (c < 0 ? ' + ' : ' - ') + '\\frac{' + Math.abs(c) + '}{x^2}').replace('x^{1}', 'x') },
        { q: 'Find the gradient of the graph of ' + M('f') + ' at ' + M('x = ' + k) + '.', m: 2, a: num(Math.round(fp(k) * 1000) / 1000) }
      ] };
    } },
    { d: [2], f: function () {
      var a = nz(-2, 3), b = ri(-5, 5), c = ri(-6, 6), k = nz(-2, 3), m, y0;
      do { b = ri(-5, 5); m = 2 * a * k + b; } while (m === 0);
      y0 = a * k * k + b * k + c;
      var cT = y0 - m * k;
      return { stem: 'The curve ' + M('C') + ' has equation ' + M('y = ' + poly([a, b, c])) + '.', parts: [
        { q: 'Find the gradient of ' + M('C') + ' at the point where ' + M('x = ' + k) + '.', m: 2, a: M(String(m)) },
        { q: 'Find the equation of the tangent to ' + M('C') + ' at this point.', m: 2, a: M('y = ' + poly([m, cT])) },
        { q: 'Find the equation of the normal to ' + M('C') + ' at this point, in the form ' + M('y = mx + c') + '.', m: 2, a: M(IB.lineEq(-1, m, y0 * m + k, m)) }
      ] };
    } },
    { d: [3], f: function () {
      var r1 = ri(-3, 1), r2 = r1 + 2 * ri(1, 2), S = r1 + r2, P = r1 * r2, d = ri(-5, 5);
      var f = function (x) { return 2 * x * x * x - 3 * S * x * x + 6 * P * x + d; };
      var ys = [f(r1), f(r2), f(r1 - 1.3), f(r2 + 1.3)], ymin = Math.floor(Math.min.apply(null, ys)) - 2, ymax = Math.ceil(Math.max.apply(null, ys)) + 2;
      var p = D.plane({ xmin: r1 - 1.5, xmax: r2 + 1.5, ymin: ymin, ymax: ymax, w: 300, h: 260 });
      return { stem: 'Part of the graph of ' + M('f(x) = ' + poly([2, -3 * S, 6 * P, d])) + ' is shown.' + D.svg(300, 260, p.svg + p.curve(f, r1 - 1.4, r2 + 1.4), 'Graph of a cubic', true), parts: [
        { q: 'Find ' + M("f'(x)") + '.', m: 2, a: M(poly([6, -6 * S, 6 * P])) },
        { q: 'Find the values of ' + M('x') + ' for which ' + M('f') + ' is decreasing.', m: 3, a: M(r1 + ' < x < ' + r2) }
      ] };
    } }
  ] });

  T({ id: 'ib-optimisation', name: 'Stationary points and optimisation', video: 'IB maths AI optimisation stationary points', gens: [
    { d: [1, 2], f: function (dd) {
      var r1 = ri(-3, 1), r2 = r1 + 2 * ri(1, 2), S = r1 + r2, P = r1 * r2, d = ri(-5, 5);
      var f = function (x) { return 2 * x * x * x - 3 * S * x * x + 6 * P * x + d; };
      var parts = [{ q: 'Find the coordinates of the stationary points of the curve.', m: 4, a: M('(' + r1 + ',\\ ' + f(r1) + ')') + ' and ' + M('(' + r2 + ',\\ ' + f(r2) + ')') }];
      if (dd === 2) parts.push({ q: 'Use the second derivative to determine the nature of each stationary point.', m: 3, a: M("f''(x) = " + poly([12, -6 * S])) + '; ' + M("f''(" + r1 + ') = ' + (12 * r1 - 6 * S)) + ' < 0, maximum at ' + M('x = ' + r1) + '; ' + M("f''(" + r2 + ') = ' + (12 * r2 - 6 * S)) + ' > 0, minimum at ' + M('x = ' + r2) });
      return { stem: 'A curve has equation ' + M('y = ' + poly([2, -3 * S, 6 * P, d])) + '.', parts: parts };
    } },
    { d: [2, 3], f: function () {
      var a = 2 * ri(10, 25), b = 2 * ri(8, a / 2 - 1), A = 12, B = -4 * (a + b), C = a * b;
      var x = (-B - Math.sqrt(B * B - 4 * A * C)) / (2 * A), V = x * (a - 2 * x) * (b - 2 * x);
      return { stem: 'An open box is made from a rectangular sheet of card measuring ' + a + ' cm by ' + b + ' cm by cutting a square of side ' + M('x') + ' cm from each corner and folding up the sides.', parts: [
        { q: 'Show that the volume of the box is ' + M('V = ' + poly([4, -2 * (a + b), a * b, 0])) + '.', m: 2, a: M('V = x(' + a + ' - 2x)(' + b + ' - 2x)') + ', then expand.' },
        { q: 'Find ' + M('\\frac{\\mathrm{d}V}{\\mathrm{d}x}') + '.', m: 2, a: M(poly([12, -4 * (a + b), a * b])) },
        { q: 'Find the value of ' + M('x') + ' that maximises the volume, and the maximum volume.', m: 4, a: M('x = ' + s3(x)) + ' cm, ' + M('V = ' + s3(V)) + ' cm³' }
      ] };
    } },
    { d: [3], f: function () {
      var V = 50 * ri(4, 20), r = Math.cbrt(V / (2 * Math.PI)), h = V / (Math.PI * r * r), A = 2 * Math.PI * r * r + 2 * V / r;
      return { stem: 'A closed cylindrical can has volume ' + V + ' cm³, radius ' + M('r') + ' cm and height ' + M('h') + ' cm.', parts: [
        { q: 'Show that the total surface area is ' + M('A = 2\\pi r^2 + \\frac{' + 2 * V + '}{r}') + '.', m: 2, a: M('h = \\frac{' + V + '}{\\pi r^2}') + ', so ' + M('A = 2\\pi r^2 + 2\\pi r h = 2\\pi r^2 + \\frac{' + 2 * V + '}{r}') },
        { q: 'Find the value of ' + M('r') + ' that minimises the surface area.', m: 3, a: M('4\\pi r - \\frac{' + 2 * V + '}{r^2} = 0 \\Rightarrow r = ' + s3(r)) + ' cm' },
        { q: 'Find the minimum surface area.', m: 2, a: s3(A) + ' cm²' }
      ] };
    } }
  ] });

  T({ id: 'ib-integration', name: 'Integration, areas and the trapezoidal rule', video: 'IB maths AI trapezoidal rule integration area', gens: [
    { d: [1], f: function () {
      var a = 3 * nz(-3, 3), b = 2 * nz(-4, 4), c = nz(-9, 9), x0 = ri(0, 2), y0 = ri(-5, 10);
      var F = function (x) { return (a / 3) * x * x * x + (b / 2) * x * x + c * x; }, K = y0 - F(x0);
      return { stem: M("f'(x) = " + poly([a, b, c])), parts: [
        { q: 'Find ' + M('\\int (' + poly([a, b, c]) + ')\\,\\mathrm{d}x') + '.', m: 3, a: M(poly([a / 3, b / 2, c, 0]).replace(/ \+ 0$/, '') + ' + C') },
        { q: 'The graph of ' + M('f') + ' passes through ' + M('(' + x0 + ',\\ ' + y0 + ')') + '. Find ' + M('f(x)') + '.', m: 2, a: M('f(x) = ' + poly([a / 3, b / 2, c, K])) }
      ] };
    } },
    { d: [2], f: function () {
      var p = ri(-2, 1), q = p + ri(2, 4), k = pick([1, 2]), f = function (x) { return -k * (x - p) * (x - q); };
      var area = k * Math.pow(q - p, 3) / 6, top = f((p + q) / 2);
      var pl = D.plane({ xmin: Math.min(p - 1, -1), xmax: q + 1, ymin: -2, ymax: Math.ceil(top) + 2, w: 300, h: 240 });
      var s = pl.svg + pl.area(f, p, q, 0) + pl.curve(f, p - 0.8, q + 0.8) + D.text(pl.X(p), pl.Y(0) + 14, p, { anchor: 'middle', size: 12 }) + D.text(pl.X(q), pl.Y(0) + 14, q, { anchor: 'middle', size: 12 });
      return { stem: 'The diagram shows part of the graph of ' + M('y = ' + poly([-k, k * (p + q), -k * p * q])) + '. The shaded region ' + M('R') + ' is enclosed by the curve and the ' + M('x') + '-axis.' + D.svg(300, 240, s, 'Shaded region under a curve', true), parts: [
        { q: 'Write down an integral that represents the area of ' + M('R') + '.', m: 2, a: M('\\int_{' + p + '}^{' + q + '} (' + poly([-k, k * (p + q), -k * p * q]) + ')\\,\\mathrm{d}x') },
        { q: 'Find the area of ' + M('R') + '.', m: 2, a: M(frac(k * Math.pow(q - p, 3), 6)) + ' (' + s3(area) + ')' }
      ] };
    } },
    { d: [2, 3], f: function () {
      var fs = [['\\sqrt{x + 1}', function (x) { return Math.sqrt(x + 1); }, function (b) { return 2 / 3 * (Math.pow(b + 1, 1.5) - 1); }],
                ['\\frac{1}{1 + x^2}', function (x) { return 1 / (1 + x * x); }, function (b) { return Math.atan(b); }],
                ['e^{0.5x}', function (x) { return Math.exp(0.5 * x); }, function (b) { return 2 * (Math.exp(0.5 * b) - 1); }]];
      var F = pick(fs), b = pick([2, 3, 4]), n = pick([4, b === 3 ? 6 : 4]), h = b / n, s = F[1](0) + F[1](b);
      for (var i = 1; i < n; i++) s += 2 * F[1](i * h);
      var est = h / 2 * s, ex = F[2](b);
      var vals = []; for (var x = 0; x <= b; x += 0.05) vals.push(F[1](x));
      var pl = D.plane({ xmin: 0, xmax: b + 0.5, ymin: 0, ymax: Math.ceil(Math.max.apply(null, vals)) + 0.5, w: 300, h: 230, ticks: true });
      var sv = pl.svg; for (var j = 0; j < n; j++) { var x0 = j * h, x1 = x0 + h; sv += D.poly([[pl.X(x0), pl.Y(0)], [pl.X(x0), pl.Y(F[1](x0))], [pl.X(x1), pl.Y(F[1](x1))], [pl.X(x1), pl.Y(0)]], 'trap'); }
      sv += pl.curve(F[1], 0, b + 0.4);
      return { stem: 'The diagram shows the graph of ' + M('y = ' + F[0]) + ' for ' + M('0 \\le x \\le ' + b) + ', with ' + n + ' trapezoids of equal width.' + D.svg(300, 230, sv, 'Trapezoidal rule', true), parts: [
        { q: 'Use the trapezoidal rule with ' + n + ' intervals to estimate ' + M('\\int_0^{' + b + '} ' + F[0] + '\\,\\mathrm{d}x') + '.', m: 3, a: s3(est) },
        { q: 'Use your GDC to find the exact value of the integral, correct to three significant figures.', m: 1, a: s3(ex) },
        { q: 'Find the percentage error in the estimate.', m: 2, a: s3(Math.abs(est - ex) / ex * 100) + '%' }
      ] };
    } },
    { d: [3], f: function () {
      var k = ri(2, 5), a = ri(1, 3), m = ri(2, 4);
      return { parts: [
        { q: 'Find ' + M('\\int_0^{' + a + '} e^{' + k + 'x}\\,\\mathrm{d}x') + ', giving your answer in exact form.', m: 3, a: M('\\frac{e^{' + k * a + '} - 1}{' + k + '}') },
        { q: 'Find ' + M('\\int ' + m + '\\cos(' + k + 'x)\\,\\mathrm{d}x') + '.', m: 2, a: M((m === k ? '' : frac(m, k)) + '\\sin(' + k + 'x) + C') },
        { q: 'Find ' + M('\\int \\frac{' + m + '}{x}\\,\\mathrm{d}x') + ', for ' + M('x > 0') + '.', m: 1, a: M(m + '\\ln x + C') }
      ] };
    } }
  ] });

  T({ id: 'ib-diff-rules', name: 'Chain, product and quotient rules and related rates', video: 'IB maths AI chain rule product rule related rates', gens: [
    { d: [1], f: function () {
      var k = nz(-4, 5), m = ri(2, 6), c = ri(2, 5);
      return { parts: [
        { q: 'Differentiate ' + M('y = e^{' + (k === 1 ? '' : k === -1 ? '-' : k) + 'x}') + '.', m: 1, a: M(dydx + ' = ' + (k === 1 ? '' : k === -1 ? '-' : k) + 'e^{' + (k === 1 ? '' : k === -1 ? '-' : k) + 'x}') },
        { q: 'Differentiate ' + M('y = \\sin(' + m + 'x)') + '.', m: 1, a: M(dydx + ' = ' + m + '\\cos(' + m + 'x)') },
        { q: 'Differentiate ' + M('y = ' + c + '\\ln x') + '.', m: 1, a: M(dydx + ' = \\frac{' + c + '}{x}') }
      ] };
    } },
    { d: [2], f: function () {
      var n = ri(2, 4), k = pick([2, 3, 4, -2, -3]), a = ri(2, 5), b = nz(-6, 6), p = ri(3, 6);
      return { parts: [
        { q: 'Differentiate ' + M('f(x) = x^{' + n + '}e^{' + k + 'x}') + '.', m: 3, a: M("f'(x) = e^{" + k + 'x}(' + n + 'x^{' + (n - 1) + '} ' + (k < 0 ? '- ' + (-k) : '+ ' + k) + 'x^{' + n + '})').replace('x^{1}', 'x') },
        { q: 'Differentiate ' + M('g(x) = (' + poly([a, b]) + ')^{' + p + '}') + '.', m: 2, a: M("g'(x) = " + a * p + '(' + poly([a, b]) + ')^{' + (p - 1) + '}') },
        { q: 'Differentiate ' + M('h(x) = \\frac{\\sin x}{x}') + '.', m: 3, a: M("h'(x) = \\frac{x\\cos x - \\sin x}{x^2}") }
      ] };
    } },
    { d: [3], f: function () {
      if (Math.random() < 0.5) {
        var rate = ri(2, 6) / 10 + ri(0, 1) * 0.5, R = ri(5, 20);
        return q1('A spherical balloon is inflated so that its radius increases at a constant rate of ' + rate + ' cm s⁻¹. Find the rate at which the volume is increasing when the radius is ' + R + ' cm.', 4,
          M('\\frac{\\mathrm{d}V}{\\mathrm{d}t} = 4\\pi r^2 \\frac{\\mathrm{d}r}{\\mathrm{d}t} = 4\\pi(' + R + ')^2(' + rate + ')') + ' = ' + s3(4 * Math.PI * R * R * rate) + ' cm³ s⁻¹');
      }
      var Rc = ri(3, 8), H = ri(10, 24), Q = ri(5, 30), h = ri(4, H - 2);
      var dh = Q * H * H / (Math.PI * Rc * Rc * h * h);
      return q1('Water is poured into an inverted cone of radius ' + Rc + ' cm and height ' + H + ' cm at a rate of ' + Q + ' cm³ s⁻¹. Find the rate at which the depth of water is increasing when the depth is ' + h + ' cm.', 5,
        M('V = \\frac{\\pi(' + Rc + ')^2}{3(' + H + ')^2}h^3') + ', ' + M('\\frac{\\mathrm{d}h}{\\mathrm{d}t} = ' + s3(dh)) + ' cm s⁻¹');
    } }
  ] });

  T({ id: 'ib-volumes', name: 'Volumes of revolution and areas between curves', video: 'IB maths AI volume of revolution', gens: [
    { d: [1, 2], f: function () {
      var k = ri(1, 5), a = ri(2, 6), f = function (x) { return Math.sqrt(k * x); }, top = f(a);
      var pl = D.plane({ xmin: -0.5, xmax: a + 1, ymin: -top - 1, ymax: top + 1, w: 300, h: 240 });
      var s = pl.svg + pl.area(f, 0, a, 0) + pl.curve(f, 0, a + 0.8) + pl.curve(function (x) { return -f(x); }, 0, a, 'curvedash') + D.line(pl.X(a), pl.Y(-top), pl.X(a), pl.Y(top), 'dash') + D.text(pl.X(a) + 4, pl.Y(0) + 12, a, { size: 12 });
      return { stem: 'The region bounded by ' + M('y = \\sqrt{' + (k === 1 ? '' : k) + 'x}') + ', the ' + M('x') + '-axis and the line ' + M('x = ' + a) + ' is rotated 360° about the ' + M('x') + '-axis.' + D.svg(300, 240, s, 'Solid of revolution', true), parts: [
        { q: 'Write down an integral for the volume of the solid formed.', m: 2, a: M('\\pi\\int_0^{' + a + '} ' + (k === 1 ? '' : k) + 'x\\,\\mathrm{d}x') },
        { q: 'Find the volume.', m: 2, a: M(frac(k * a * a, 2) + '\\pi') + ' = ' + s3(Math.PI * k * a * a / 2) }
      ] };
    } },
    { d: [2], f: function () {
      var h = ri(2, 9);
      return q1('The curve ' + M('y = x^2') + ', for ' + M('0 \\le y \\le ' + h) + ', is rotated 360° about the ' + M('y') + '-axis to form the inside of a bowl. Find the volume of the bowl.', 4,
        M('\\pi\\int_0^{' + h + '} y\\,\\mathrm{d}y = ' + frac(h * h, 2) + '\\pi') + ' = ' + s3(Math.PI * h * h / 2));
    } },
    { d: [3], f: function () {
      var k = ri(2, 4), f = function (x) { return k * x; }, gq = function (x) { return x * x; };
      var pl = D.plane({ xmin: -0.5, xmax: k + 1, ymin: -1, ymax: k * k + 2, w: 300, h: 260 });
      var s = pl.svg + pl.area(f, 0, k, gq) + pl.curve(f, -0.3, k + 0.6) + pl.curve(gq, -0.6, k + 0.4);
      return { stem: 'The diagram shows the line ' + M('y = ' + k + 'x') + ' and the curve ' + M('y = x^2') + '. The shaded region ' + M('R') + ' is enclosed between them.' + D.svg(300, 260, s, 'Region between a line and a curve', true), parts: [
        { q: 'Find the ' + M('x') + '-coordinates of the points of intersection.', m: 2, a: M('x = 0,\\ x = ' + k) },
        { q: 'Find the area of ' + M('R') + '.', m: 3, a: M('\\int_0^{' + k + '} (' + k + 'x - x^2)\\,\\mathrm{d}x = ' + frac(k * k * k, 6)) },
        { q: 'Find the volume formed when ' + M('R') + ' is rotated 360° about the ' + M('x') + '-axis.', m: 3, a: M('\\pi\\int_0^{' + k + '} (' + k * k + 'x^2 - x^4)\\,\\mathrm{d}x = ' + frac(2 * Math.pow(k, 5), 15) + '\\pi') + ' = ' + s3(2 * Math.PI * Math.pow(k, 5) / 15) }
      ] };
    } }
  ] });

  T({ id: 'ib-kinematics', name: 'Kinematics', video: 'IB maths AI kinematics displacement velocity acceleration', gens: [
    { d: [1], f: function () {
      var a = ri(1, 6), b = ri(2, 15), c = ri(0, 10), t = ri(1, 5);
      return { stem: 'A particle moves in a straight line. Its displacement, ' + M('s') + ' m, after ' + M('t') + ' seconds is ' + M('s = t^3 - ' + a + 't^2 + ' + b + 't' + (c ? ' + ' + c : '')) + '.', parts: [
        { q: 'Find an expression for the velocity, ' + M('v') + '.', m: 2, a: M('v = ' + poly([3, -2 * a, b], 't')) },
        { q: 'Find the acceleration when ' + M('t = ' + t) + '.', m: 2, a: (6 * t - 2 * a) + ' m s⁻²' }
      ] };
    } },
    { d: [2], f: function () {
      var p = ri(1, 3), q = p + ri(1, 3), Tt = q + ri(1, 2);
      var F = function (t) { return t * t * t / 3 - (p + q) * t * t / 2 + p * q * t; };
      var disp = F(Tt), dist = Math.abs(F(p) - F(0)) + Math.abs(F(q) - F(p)) + Math.abs(F(Tt) - F(q));
      return { stem: 'A particle moves in a straight line with velocity ' + M('v = ' + poly([1, -(p + q), p * q], 't')) + ' m s⁻¹, for ' + M('0 \\le t \\le ' + Tt) + '.', parts: [
        { q: 'Find the times when the particle is at rest.', m: 2, a: M('t = ' + p + '\\text{ and } t = ' + q) },
        { q: 'Find the displacement of the particle after ' + Tt + ' seconds.', m: 2, a: s3(disp) + ' m' },
        { q: 'Find the total distance travelled in the first ' + Tt + ' seconds.', m: 3, a: M('\\int_0^{' + Tt + '} |v|\\,\\mathrm{d}t') + ' = ' + s3(dist) + ' m' }
      ] };
    } },
    { d: [3], f: function () {
      var A = ri(5, 20), k = pick([0.2, 0.3, 0.4, 0.5]), Tt = ri(3, 10), t1 = ri(1, 4);
      return { stem: 'The velocity of a cyclist after ' + M('t') + ' seconds is ' + M('v = ' + A + 'e^{-' + k + 't}') + ' m s⁻¹.', parts: [
        { q: 'Find the acceleration when ' + M('t = ' + t1) + '.', m: 2, a: s3(-A * k * Math.exp(-k * t1)) + ' m s⁻²' },
        { q: 'Find the distance travelled in the first ' + Tt + ' seconds.', m: 3, a: M('\\frac{' + A + '}{' + k + '}(1 - e^{-' + num(k * Tt) + '})') + ' = ' + s3(A / k * (1 - Math.exp(-k * Tt))) + ' m' }
      ] };
    } }
  ] });

  T({ id: 'ib-diff-equations', name: 'Differential equations, slope fields and Euler’s method', video: 'IB maths AI Euler method slope field separation of variables', gens: [
    { d: [1], f: function () {
      var a = pick([1, 2, -1]), b = pick([1, -1, 0.5]), x0 = 0, y0 = ri(1, 3), h = pick([0.1, 0.2]), n = 3;
      var f = function (x, y) { return a * x + b * y; }, x = x0, y = y0, rows = [];
      for (var i = 0; i < n; i++) { y = y + h * f(x, y); x = Math.round((x + h) * 10) / 10; rows.push(M('x = ' + x + ',\\ y = ' + y.toFixed(5).replace(/0+$/, '').replace(/\.$/, ''))); }
      var eq = (a === 1 ? '' : a === -1 ? '-' : a) + 'x' + (b < 0 ? ' - ' : ' + ') + (Math.abs(b) === 1 ? '' : num(Math.abs(b))) + 'y';
      return q1('Use Euler’s method with step length ' + h + ' to estimate ' + M('y') + ' when ' + M('x = ' + num(n * h)) + ', given that ' + M(dydx + ' = ' + eq) + ' and ' + M('y = ' + y0) + ' when ' + M('x = 0') + '.', 4, rows.join('<br>') + '<br>Estimate: ' + s3(y));
    } },
    { d: [2], f: function () {
      if (Math.random() < 0.5) {
        var H = ri(3, 30), N0 = 100 * ri(2, 20), t = ri(5, 60);
        var k = Math.log(2) / H;
        return { stem: 'The mass, ' + M('m') + ' grams, of a radioactive substance satisfies ' + M('\\frac{\\mathrm{d}m}{\\mathrm{d}t} = -km') + ', where ' + M('t') + ' is in years. Initially there are ' + N0 + ' g and the half-life is ' + H + ' years.', parts: [
          { q: 'Solve the differential equation to show that ' + M('m = ' + N0 + 'e^{-kt}') + '.', m: 3, a: M('\\int \\frac{1}{m}\\,\\mathrm{d}m = -\\int k\\,\\mathrm{d}t \\Rightarrow \\ln m = -kt + c') + '; ' + M('m(0) = ' + N0) },
          { q: 'Find the value of ' + M('k') + '.', m: 2, a: M('k = \\frac{\\ln 2}{' + H + '} = ' + s3(k)) },
          { q: 'Find the mass remaining after ' + t + ' years.', m: 2, a: s3(N0 * Math.exp(-k * t)) + ' g' }
        ] };
      }
      var a = ri(1, 5), X = ri(1, 3);
      return { stem: M(dydx + ' = xy') + ', where ' + M('y > 0') + ', and ' + M('y = ' + a) + ' when ' + M('x = 0') + '.', parts: [
        { q: 'Use separation of variables to find ' + M('y') + ' in terms of ' + M('x') + '.', m: 4, a: M('\\ln y = \\frac{x^2}{2} + c \\Rightarrow y = ' + (a === 1 ? '' : a) + 'e^{\\frac{x^2}{2}}') },
        { q: 'Find ' + M('y') + ' when ' + M('x = ' + X) + '.', m: 1, a: s3(a * Math.exp(X * X / 2)) }
      ] };
    } },
    { d: [3], f: function () {
      var forms = [['x - y', function (x, y) { return x - y; }, 'y = x'], ['x + y', function (x, y) { return x + y; }, 'y = -x'], ['y - 2x', function (x, y) { return y - 2 * x; }, 'y = 2x'], ['xy', function (x, y) { return x * y; }, 'x = 0 \\text{ and } y = 0']];
      var F = pick(forms), px = ri(-2, 3), py = ri(-2, 3), x0 = ri(-1, 1), y0 = ri(-1, 2), h = 0.5, y = y0, x = x0;
      for (var i = 0; i < 2; i++) { y = y + h * F[1](x, y); x += h; }
      return { stem: 'The diagram shows the slope field for the differential equation ' + M(dydx + ' = ' + F[0]) + '.' + D.slopeField(F[1], -4, 4, -4, 4), parts: [
        { q: 'Find the gradient of the solution curve at the point ' + M('(' + px + ',\\ ' + py + ')') + '.', m: 1, a: M(String(F[1](px, py))) },
        { q: 'Write down the equation of the curve on which every solution has zero gradient.', m: 1, a: M(F[2]) },
        { q: 'Use Euler’s method with step length 0.5 to estimate ' + M('y') + ' when ' + M('x = ' + (x0 + 1)) + ' for the solution through ' + M('(' + x0 + ',\\ ' + y0 + ')') + '.', m: 3, a: num(Math.round(y * 10000) / 10000) }
      ] };
    } }
  ] });

  T({ id: 'ib-coupled', name: 'Coupled systems, phase portraits and second-order equations', video: 'IB maths AI phase portrait coupled differential equations', gens: [
    { d: [1], f: function () {
      var r1 = -ri(1, 4), r2 = -ri(1, 5); while (r2 === r1) r2 = -ri(1, 5);
      var b = -(r1 + r2), c = r1 * r2;
      return { stem: 'The motion of a damped spring is modelled by ' + M('\\frac{\\mathrm{d}^2x}{\\mathrm{d}t^2} + ' + b + '\\frac{\\mathrm{d}x}{\\mathrm{d}t} + ' + c + 'x = 0') + '.', parts: [
        { q: 'Write this as a system of first-order equations, using ' + M('y = \\frac{\\mathrm{d}x}{\\mathrm{d}t}') + ', in the form ' + M('\\dot{\\mathbf{X}} = \\mathbf{M}\\mathbf{X}') + '.', m: 2, a: M('\\mathbf{M} = ' + mat([[0, 1], [-c, -b]])) },
        { q: 'Find the eigenvalues of ' + M('\\mathbf{M}') + '.', m: 2, a: M('\\lambda = ' + Math.min(r1, r2) + ',\\ ' + Math.max(r1, r2)) },
        { q: 'Write down the general solution for ' + M('x') + '.', m: 2, a: M('x = Ae^{' + ex(r1) + '} + Be^{' + ex(r2) + '}') }
      ] };
    } },
    { d: [2], f: function () {
      var e = IB.eigenSetup(), A = e.A, l1 = e.l1, l2 = e.l2;
      var kind = l1 * l2 < 0 ? 'a saddle point (unstable)' : (l1 < 0 && l2 < 0) ? 'a stable node' : 'an unstable node';
      return { stem: 'A system is given by ' + M('\\dot{x} = ' + lin(A[0][0], A[0][1])) + ', ' + M('\\dot{y} = ' + lin(A[1][0], A[1][1])) + '. Its phase portrait is shown.' + D.phase(A), parts: [
        { q: 'Find the eigenvalues and corresponding eigenvectors of the system matrix.', m: 4, a: M('\\lambda = ' + l1 + ': ' + vec(e.v1) + ',\\ \\lambda = ' + l2 + ': ' + vec(e.v2)) },
        { q: 'Write down the general solution.', m: 2, a: M('\\begin{pmatrix} x \\\\ y \\end{pmatrix} = Ae^{' + ex(l1) + '}' + vec(e.v1) + ' + Be^{' + ex(l2) + '}' + vec(e.v2)) },
        { q: 'Classify the equilibrium point at the origin.', m: 1, a: 'It is ' + kind + '.' }
      ] };
    } },
    { d: [3], f: function () {
      var a = pick([-2, -1, 1, 0]), b = ri(1, 3), A = [[a, -b], [b, a]];
      var kind = a < 0 ? 'a stable spiral' : a > 0 ? 'an unstable spiral' : 'a centre';
      return { stem: 'A system is given by ' + M('\\dot{x} = ' + lin(a, -b)) + ', ' + M('\\dot{y} = ' + lin(b, a)) + '.' + D.phase(A), parts: [
        { q: 'Find the eigenvalues of the system matrix.', m: 2, a: M('\\lambda = ' + (a === 0 ? '' : a) + ' \\pm ' + (b === 1 ? '' : b) + 'i') },
        { q: 'Classify the equilibrium point at the origin.', m: 2, a: 'It is ' + kind + '.' },
        { q: 'State whether trajectories move clockwise or anticlockwise. Justify your answer.', m: 2, a: 'At ' + M('(1,\\ 0)') + ', ' + M('\\dot{y} = ' + b + ' > 0') + ', so trajectories move anticlockwise.' }
      ] };
    } }
  ] });
  function ex(l) { return l === 1 ? 't' : l === -1 ? '-t' : l + 't'; }
  function lin(a, b) {
    var s = a === 0 ? '' : (a === 1 ? '' : a === -1 ? '-' : a) + 'x';
    if (b !== 0) s += (s === '' ? (b < 0 ? '-' : '') : (b < 0 ? ' - ' : ' + ')) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y';
    return s || '0';
  }
})(typeof window !== 'undefined' ? window : globalThis);
