/* Byte Size Classroom — deeper extension questions (set 3, IB AI HL part j): volumes of revolution, kinematics, differential equations, coupled systems. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function S0(v) { return v ? S(v) : ''; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function mat(a, b, c, d) { return '\\begin{pmatrix}' + a + ' & ' + b + '\\\\' + c + ' & ' + d + '\\end{pmatrix}'; }
  function vec(a, b) { return '\\begin{pmatrix}' + a + '\\\\' + b + '\\end{pmatrix}'; }
  function simp(f, a, b) { var n = 2000, h = (b - a) / n, s = f(a) + f(b); for (var i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; }
  function lin2(p, q) { var a = p ? c1(p, 'x') : ''; if (q) a += a ? (q < 0 ? ' - ' + c1(-q, 'y') : ' + ' + c1(q, 'y')) : c1(q, 'y'); return a || '0'; }
  function eig(l1, l2, u) { var v = u + 1; return [l1 * v - l2 * u, l2 - l1, (l1 - l2) * u * v, l2 * v - l1 * u]; }

  X('ib-volumes', [
    function () {
      var r = ri(2, 6), h = ri(3, 10);
      return Q('The line ' + M('y = \\frac{' + r + '}{' + h + '}x') + ' from ' + M('x = 0') + ' to ' + M('x = ' + h) + ' is rotated 360° about the ' + M('x') + '-axis.', [
        ['Describe the solid formed.', 1, 'A cone of radius ' + r + ' and height ' + h],
        ['Find its volume by integration.', 3, M('\\pi\\int_0^{' + h + '}\\frac{' + r * r + '}{' + h * h + '}x^2\\,dx = ' + F(r * r * h, 3) + '\\pi')],
        ['Check with the cone formula.', 1, M('\\frac{1}{3}\\pi r^2h = ' + F(r * r * h, 3) + '\\pi')]
      ]);
    },
    function () {
      var r = ri(2, 5);
      return Q('The semicircle ' + M('y = \\sqrt{' + r * r + ' - x^2}') + ' is rotated 360° about the ' + M('x') + '-axis.', [
        ['Find the volume of the solid.', 3, M(F(4 * r * r * r, 3) + '\\pi')],
        ['Explain why this gives the formula for the volume of a sphere.', 1, 'The rotated semicircle is a sphere of radius ' + r],
        ['Find the volume of the cap from ' + M('x = ' + (r - 1)) + ' to ' + M('x = ' + r) + '.', 2, M(sf3(Math.PI * (r * r * 1 - (r * r * r - Math.pow(r - 1, 3)) / 3)))]
      ]);
    },
    function () {
      var a = ri(1, 3);
      return Q('The region between ' + M('y = x^2') + ' and ' + M('y = ' + a * a) + ' for ' + M('x \\ge 0') + ' is rotated about the ' + M('y') + '-axis.', [
        ['Write ' + M('x^2') + ' in terms of ' + M('y') + '.', 1, M('x^2 = y')],
        ['Find the volume.', 3, M('\\pi\\int_0^{' + a * a + '} y\\,dy = ' + F(Math.pow(a, 4), 2) + '\\pi')],
        ['Compare with the cylinder of the same radius and height.', 1, 'It is half: ' + M(Math.pow(a, 4) + '\\pi')]
      ]);
    },
    function () {
      var k = ri(1, 3);
      var V = Math.PI * (Math.exp(2 * k) - 1) / 2;
      return Q('The region under ' + M('y = e^x') + ' from ' + M('x = 0') + ' to ' + M('x = ' + k) + ' is rotated about the ' + M('x') + '-axis.', [
        ['Write the volume as an integral.', 1, M('\\pi\\int_0^{' + k + '}e^{2x}\\,dx')],
        ['Evaluate it.', 2, M('\\frac{\\pi}{2}(e^{' + 2 * k + '} - 1) = ' + sf3(V))],
        ['Explain why the integrand is ' + M('e^{2x}') + ' not ' + M('e^{x}') + '.', 1, 'The cross-sections are discs of area ' + M('\\pi y^2')]
      ]);
    },
    function () {
      var a = ri(2, 4);
      var V = Math.PI * (a * a * a / 3 - a * a * a / 5);
      return Q('The region between ' + M('y = x') + ' and ' + M('y = \\frac{x^2}{' + a + '}') + ' is rotated about the ' + M('x') + '-axis.', [
        ['Find where the curves meet.', 1, M('x = 0, ' + a)],
        ['Find the volume using the difference of two discs.', 3, M('\\pi\\int_0^{' + a + '}\\left(x^2 - \\frac{x^4}{' + a * a + '}\\right)dx = ' + sf3(V))],
        ['Explain why ' + M('\\pi\\int (y_1 - y_2)^2\\,dx') + ' would be wrong.', 1, 'Each cross-section is a washer: area ' + M('\\pi(y_1^2 - y_2^2)')]
      ]);
    },
    function () {
      var h = ri(5, 15);
      var f = function (x) { return 2 + 0.5 * Math.sin(x); };
      var V = simp(function (x) { return Math.PI * f(x) * f(x); }, 0, h);
      return Q('A vase has radius ' + M('r = 2 + 0.5\\sin x') + ' cm at height ' + M('x') + ' cm, for ' + M('0 \\le x \\le ' + h) + '.', [
        ['Write the volume as an integral.', 1, M('\\pi\\int_0^{' + h + '}(2 + 0.5\\sin x)^2\\,dx')],
        ['Use technology to find the volume.', 2, sf3(V) + ' cm³'],
        ['Find the height of water when the vase is half full.', 3, (function () { var lo = 0, hi = h; for (var i = 0; i < 40; i++) { var m = (lo + hi) / 2; if (simp(function (x) { return Math.PI * f(x) * f(x); }, 0, m) < V / 2) lo = m; else hi = m; } return sf3(lo) + ' cm'; })()]
      ]);
    },
    function () {
      var a = ri(1, 4);
      return Q('The curve ' + M('y = \\frac{1}{x}') + ' for ' + M('1 \\le x \\le ' + (a + 1)) + ' is rotated about the ' + M('x') + '-axis.', [
        ['Find the volume.', 3, M('\\pi\\left(1 - \\frac{1}{' + (a + 1) + '}\\right) = ' + F(a, a + 1) + '\\pi')],
        ['What happens to the volume as the upper limit tends to infinity?', 1, 'It tends to ' + M('\\pi')],
        ['Explain why the area under the curve does not have a finite limit, while the volume does.', 1, M('\\int\\frac{1}{x}dx = \\ln x') + ' grows without limit, but ' + M('\\int\\frac{1}{x^2}dx') + ' does not']
      ]);
    },
    function () {
      var r = ri(3, 8), d = ri(1, r - 1);
      return Q('A bowl is formed by rotating ' + M('x^2 + y^2 = ' + r * r) + ' for ' + M('-' + r + ' \\le y \\le -' + d) + ' about the ' + M('y') + '-axis.', [
        ['Write the volume as an integral in ' + M('y') + '.', 2, M('\\pi\\int_{-' + r + '}^{-' + d + '}(' + r * r + ' - y^2)\\,dy')],
        ['Evaluate it.', 2, sf3(Math.PI * ((r * r * (r - d)) - (r * r * r - d * d * d) / 3))],
        ['Explain what this solid looks like.', 1, 'A spherical cap of depth ' + (r - d)]
      ]);
    },
    function () {
      var k = pick([1, 2]);
      return Q('Find the volume when ' + M('y = \\sin x') + ', ' + M('0 \\le x \\le \\pi') + ', is rotated about the ' + M('x') + '-axis.', [
        ['Write the integral.', 1, M('\\pi\\int_0^{\\pi}\\sin^2 x\\,dx')],
        ['Use technology or ' + M('\\sin^2 x = \\frac{1 - \\cos 2x}{2}') + ' to evaluate it.', 3, M('\\frac{\\pi^2}{2} = ' + sf3(Math.PI * Math.PI / 2))],
        ['Find the volume when ' + M('y = ' + (k === 1 ? '2' : '3') + '\\sin x') + ' is rotated.', 1, M(sf3((k === 1 ? 4 : 9) * Math.PI * Math.PI / 2))]
      ]);
    },
    function () {
      var r = ri(3, 6), h = ri(4, 10);
      return Q('A frustum is formed by rotating the line from ' + M('(0, ' + r + ')') + ' to ' + M('(' + h + ', ' + (r + 2) + ')') + ' about the ' + M('x') + '-axis.', [
        ['Write the equation of the line.', 1, M('y = ' + r + ' + \\frac{2}{' + h + '}x')],
        ['Find the volume.', 3, sf3(Math.PI * h / 3 * (r * r + r * (r + 2) + (r + 2) * (r + 2)))],
        ['Check with ' + M('V = \\frac{\\pi h}{3}(R^2 + Rr + r^2)') + '.', 1, 'Same value']
      ]);
    }
  ]);

  X('ib-kinematics', [
    function () {
      var a = ri(2, 6), w = pick([1, 2]);
      return Q('A particle has displacement ' + M('s = ' + a + '\\sin(' + (w === 1 ? '' : w) + 't)') + ' m.', [
        ['Find the velocity and acceleration.', 2, M('v = ' + a * w + '\\cos(' + (w === 1 ? '' : w) + 't)') + ', ' + M('a = -' + a * w * w + '\\sin(' + (w === 1 ? '' : w) + 't)')],
        ['Show that ' + M('a = -' + (w * w === 1 ? '' : w * w) + 's') + '.', 1, 'Compare the expressions'],
        ['Find the maximum speed and where it occurs.', 2, a * w + ' m/s, at ' + M('s = 0')]
      ]);
    },
    function () {
      var k = pick([0.5, 1, 2]), u = ri(5, 20);
      return Q('A particle slows with ' + M('v = ' + u + 'e^{-' + k + 't}') + ' m/s.', [
        ['Find the acceleration in terms of ' + M('v') + '.', 2, M('a = -' + k + 'v')],
        ['Find the distance travelled in the first 2 s.', 2, sf3(u / k * (1 - Math.exp(-2 * k))) + ' m'],
        ['Find the total distance travelled as ' + M('t \\to \\infty') + '.', 1, sf3(u / k) + ' m']
      ]);
    },
    function () {
      var p = ri(1, 3), q = p + ri(1, 3), T = q + 1;
      var s = function (t) { return t * t * t / 3 - (p + q) * t * t / 2 + p * q * t; };
      var d = Math.abs(s(p)) + Math.abs(s(q) - s(p)) + Math.abs(s(T) - s(q));
      return Q('A particle has ' + M('v = ' + poly([1, -(p + q), p * q]).replace(/x/g, 't')) + ' m/s.', [
        ['Find ' + M('\\int_0^{' + T + '} v\\,dt') + ' and interpret.', 2, sf3(s(T)) + ' m: the displacement'],
        ['Find ' + M('\\int_0^{' + T + '} |v|\\,dt') + ' using technology and interpret.', 2, sf3(d) + ' m: the total distance'],
        ['Explain why they differ.', 1, 'The particle changes direction at ' + M('t = ' + p) + ' and ' + M('t = ' + q)]
      ]);
    },
    function () {
      var a = ri(2, 6);
      return Q('A particle starts from rest with acceleration ' + M('a = ' + a + 'e^{-t}') + '.', [
        ['Find ' + M('v') + ' in terms of ' + M('t') + '.', 2, M('v = ' + a + '(1 - e^{-t})')],
        ['State the terminal velocity.', 1, a + ' m/s'],
        ['Find the time to reach 90% of the terminal velocity.', 2, sf3(Math.log(10)) + ' s']
      ]);
    },
    function () {
      var w = pick([2, 3]), A = ri(2, 5);
      return Q('A particle has ' + M('v = ' + A + '\\cos(' + w + 't)') + ' and starts at the origin.', [
        ['Find ' + M('s') + ' in terms of ' + M('t') + '.', 2, M('s = ' + F(A, w) + '\\sin(' + w + 't)')],
        ['Find the first time the particle is at rest and its position then.', 2, M('t = \\frac{\\pi}{' + 2 * w + '}') + ', ' + M('s = ' + F(A, w))],
        ['Find the total distance travelled in ' + M('0 \\le t \\le \\frac{\\pi}{' + w + '}') + '.', 2, M(F(2 * A, w))]
      ]);
    },
    function () {
      var k = ri(2, 6);
      return Q('A particle has ' + M('s = t^3 - ' + 3 * k + 't^2') + ' m for ' + M('t \\ge 0') + '.', [
        ['Find when the particle is at rest.', 2, M('t = 0') + ' and ' + M('t = ' + 2 * k)],
        ['Find when its acceleration is zero and its velocity then.', 2, M('t = ' + k) + ', ' + M('v = ' + (-3 * k * k)) + ' m/s'],
        ['Find the times when it is speeding up, explaining your reasoning.', 2, 'When ' + M('v') + ' and ' + M('a') + ' have the same sign: ' + M('0 < t < ' + k) + ' and ' + M('t > ' + 2 * k)]
      ]);
    },
    function () {
      var u = ri(10, 30), k = pick([0.1, 0.2]);
      return Q('A ball is projected upwards at ' + u + ' m/s. With air resistance its velocity is ' + M('v = (' + u + ' + ' + 9.8 / k + ')e^{-' + k + 't} - ' + 9.8 / k) + '.', [
        ['Find when it reaches its highest point.', 2, sf3(Math.log((u + 9.8 / k) / (9.8 / k)) / k) + ' s'],
        ['Compare with the time without air resistance.', 1, sf3(u / 9.8) + ' s (longer)'],
        ['Explain the value ' + sf3(9.8 / k) + ' m/s.', 1, 'It is the terminal speed when falling']
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(1, 4);
      return Q('A particle moves in the plane with ' + M('\\mathbf{r} = ' + vec('t^2', a + 't - ' + b + 't^2').replace(/1t/g, 't')) + '.', [
        ['Find the velocity and acceleration vectors.', 2, M(vec('2t', a + ' - ' + 2 * b + 't')) + ', ' + M(vec(2, -2 * b))],
        ['Find when the velocity is horizontal.', 1, M('t = ' + F(a, 2 * b))],
        ['Find the speed at ' + M('t = 1') + '.', 1, sf3(Math.hypot(2, a - 2 * b))]
      ]);
    },
    function () {
      var v0 = ri(10, 20), k = pick([0.02, 0.05]);
      return Q('A boat with engine off slows according to ' + M('\\frac{dv}{dt} = -' + k + 'v^2') + ', starting at ' + v0 + ' m/s.', [
        ['Solve to show ' + M('v = \\frac{' + v0 + '}{1 + ' + sf3(k * v0) + 't}') + '.', 3, 'Separate variables: ' + M('-\\frac{1}{v} = -' + k + 't + C')],
        ['Find when the speed has halved.', 1, sf3(1 / (k * v0)) + ' s'],
        ['Show the boat never stops in this model, and comment.', 1, M('v > 0') + ' always; in reality other forces bring it to rest']
      ]);
    },
    function () {
      var T = ri(4, 8);
      return Q('A train’s velocity is ' + M('v = ' + T + 't - t^2') + ' for ' + M('0 \\le t \\le ' + T) + ' (minutes, km/min).', [
        ['Find the maximum acceleration and when it occurs.', 2, T + ' at ' + M('t = 0')],
        ['Find the total distance.', 2, M(F(T * T * T, 6)) + ' km'],
        ['Find when the train has covered half the distance.', 2, M('t = ' + F(T, 2)) + ' (by symmetry)']
      ]);
    }
  ]);

  X('ib-diff-equations', [
    function () {
      var k = pick([0.1, 0.2, 0.3]), y0 = ri(10, 50);
      return Q('Solve ' + M('\\frac{dy}{dt} = ' + k + 'y') + ' with ' + M('y(0) = ' + y0) + '.', [
        ['Separate the variables and integrate.', 3, M('\\ln y = ' + k + 't + C')],
        ['Find ' + M('y') + ' in terms of ' + M('t') + '.', 1, M('y = ' + y0 + 'e^{' + k + 't}')],
        ['Find when ' + M('y') + ' doubles.', 1, sf3(Math.log(2) / k)]
      ]);
    },
    function () {
      var h = pick([0.1, 0.2]), n = 3;
      var x = 0, y = 1, f = function (x, y) { return x + y; };
      for (var i = 0; i < n; i++) { y = y + h * f(x, y); x += h; }
      var ex = 2 * Math.exp(n * h) - n * h - 1;
      return Q('Use Euler’s method with step ' + h + ' to estimate ' + M('y(' + sf3(n * h) + ')') + ' for ' + M('\\frac{dy}{dx} = x + y') + ', ' + M('y(0) = 1') + '.', [
        ['Write the iteration formula.', 1, M('y_{n+1} = y_n + ' + h + '(x_n + y_n)')],
        ['Find the estimate.', 3, sf3(y)],
        ['The exact solution is ' + M('y = 2e^x - x - 1') + '. Find the error and suggest how to reduce it.', 2, sf3(ex - y) + '; use a smaller step']
      ]);
    },
    function () {
      var k = pick([0.05, 0.1]), Ta = 20, T0 = pick([80, 90]);
      return Q('Newton’s law of cooling: ' + M('\\frac{dT}{dt} = -' + k + '(T - ' + Ta + ')') + ', ' + M('T(0) = ' + T0) + '.', [
        ['Solve the equation.', 3, M('T = 20 + ' + (T0 - Ta) + 'e^{-' + k + 't}')],
        ['Find when ' + M('T = 40') + '.', 1, sf3(Math.log((T0 - Ta) / 20) / k)],
        ['Describe the slope field’s behaviour near ' + M('T = 20') + '.', 1, 'Slopes are close to zero: solutions level off at 20']
      ]);
    },
    function () {
      var a = ri(2, 5);
      return Q('Solve ' + M('\\frac{dy}{dx} = \\frac{' + a + 'x}{y}') + ' with ' + M('y(0) = 2') + '.', [
        ['Separate and integrate.', 2, M('\\frac{y^2}{2} = \\frac{' + a + 'x^2}{2} + C')],
        ['Find the particular solution.', 2, M('y = \\sqrt{' + c1(a, 'x^2') + ' + 4}')],
        ['Describe the solution curve.', 1, 'The upper branch of a hyperbola']
      ]);
    },
    function () {
      var L = pick([100, 500]), k = pick([0.2, 0.5]), P0 = pick([10, 20]);
      var h = 1, P = P0; for (var i = 0; i < 3; i++) P = P + h * k * P * (1 - P / L);
      return Q('A population satisfies ' + M('\\frac{dP}{dt} = ' + k + 'P\\left(1 - \\frac{P}{' + L + '}\\right)') + ', ' + M('P(0) = ' + P0) + '.', [
        ['Use Euler’s method with ' + M('h = 1') + ' to estimate ' + M('P(3)') + '.', 3, sf3(P)],
        ['Identify the equilibrium solutions and their stability.', 2, M('P = 0') + ' (unstable) and ' + M('P = ' + L) + ' (stable)'],
        ['Explain why Euler’s method may overshoot for large step sizes.', 1, 'It follows the gradient at the start of each step, which can carry it past the equilibrium']
      ]);
    },
    function () {
      var a = ri(1, 3);
      return Q('Consider ' + M('\\frac{dy}{dx} = y - ' + a) + '.', [
        ['Find the equilibrium solution.', 1, M('y = ' + a)],
        ['Solve with ' + M('y(0) = ' + (a + 1)) + '.', 3, M('y = ' + a + ' + e^x')],
        ['Describe how solutions starting just above and just below ' + M('y = ' + a) + ' behave.', 1, 'They move away: the equilibrium is unstable']
      ]);
    },
    function () {
      var k = pick([2, 3]);
      return Q('A tank drains so that ' + M('\\frac{dh}{dt} = -' + k + '\\sqrt{h}') + ', with ' + M('h(0) = 16') + ' cm.', [
        ['Solve to find ' + M('h') + ' in terms of ' + M('t') + '.', 3, M('2\\sqrt{h} = 8 - ' + k + 't') + ', ' + M('h = \\left(4 - ' + F(k, 2) + 't\\right)^2')],
        ['Find when the tank is empty.', 1, M(F(8, k))],
        ['Explain why the model is only valid until then.', 1, 'Afterwards the formula would give a rising depth']
      ]);
    },
    function () {
      return Q('Slope fields.', [
        ['For ' + M('\\frac{dy}{dx} = x - y') + ', where are the slopes zero?', 1, 'Along ' + M('y = x')],
        ['Show that ' + M('y = x - 1') + ' is a solution.', 2, 'Its gradient is 1, and ' + M('x - (x - 1) = 1')],
        ['Describe the long-term behaviour of all solutions.', 1, 'They approach the line ' + M('y = x - 1')]
      ]);
    },
    function () {
      var r = pick([0.04, 0.05]), A = pick([1000, 3000, 6000]), W = pick([100, 200]);
      var eq = W / r;
      return Q('An account grows continuously at ' + r * 100 + '% with withdrawals of $' + W + ' per year: ' + M('\\frac{dB}{dt} = ' + r + 'B - ' + W) + '.', [
        ['Find the equilibrium balance.', 1, '$' + eq],
        ['Solve with ' + M('B(0) = ' + A) + '.', 3, M('B = ' + eq + (A - eq < 0 ? ' - ' + (eq - A) : ' + ' + (A - eq)) + 'e^{' + r + 't}')],
        ['Describe what happens to the account.', 1, A > eq ? 'It grows without limit' : A < eq ? 'It runs out in ' + sf3(Math.log(eq / (eq - A)) / r) + ' years' : 'It stays constant']
      ]);
    },
    function () {
      var h = 0.5;
      var x = 0, y = 2, f = function (x, y) { return -2 * y + x; };
      for (var i = 0; i < 2; i++) { y = y + h * f(x, y); x += h; }
      return Q('For ' + M('\\frac{dy}{dx} = x - 2y') + ', ' + M('y(0) = 2') + ', use Euler’s method with ' + M('h = 0.5') + '.', [
        ['Estimate ' + M('y(1)') + '.', 2, sf3(y)],
        ['The exact value is ' + sf3(0.25 * (2 * 1 - 1) + 2.25 * Math.exp(-2)) + '. Comment on the accuracy.', 1, 'Poor: the step is too large for how fast the solution changes'],
        ['Repeat with ' + M('h = 0.25') + ' using technology.', 2, (function () { var xx = 0, yy = 2; for (var j = 0; j < 4; j++) { yy = yy + 0.25 * (xx - 2 * yy); xx += 0.25; } return sf3(yy); })()]
      ]);
    }
  ]);

  X('ib-coupled', [
    function () {
      var l1 = pick([-1, -2]), l2 = pick([-3, 1, 2]), u = ri(-1, 1);
      if (l2 === l1) l2 = -3;
      var A = eig(l1, l2, u);
      var type = l1 < 0 && l2 < 0 ? 'a stable node (sink)' : 'a saddle';
      return Q('Consider ' + M('\\dot{x} = ' + lin2(A[0], A[1])) + ', ' + M('\\dot{y} = ' + lin2(A[2], A[3])) + '.', [
        ['Find the eigenvalues of the matrix.', 3, l1 + ' and ' + l2],
        ['Classify the equilibrium at the origin.', 1, type],
        ['Find the eigenvectors and describe their role in the phase portrait.', 2, M(vec(1, u)) + ' and ' + M(vec(1, u + 1)) + ': straight-line solutions lie along them']
      ]);
    },
    function () {
      var a = pick([1, 2]), b = pick([1, 2]);
      return Q('Consider ' + M('\\dot{x} = ' + c1(a, 'y')) + ', ' + M('\\dot{y} = -' + c1(b, 'x')) + '.', [
        ['Find the eigenvalues.', 2, M('\\pm i\\sqrt{' + a * b + '}')],
        ['Describe the phase portrait.', 1, 'Closed loops (a centre) around the origin'],
        ['Show that ' + M(c1(b, 'x^2') + ' + ' + c1(a, 'y^2')) + ' is constant along trajectories.', 2, M('\\frac{d}{dt}(' + c1(b, 'x^2') + ' + ' + c1(a, 'y^2') + ') = 2' + (b === 1 ? '' : b) + 'x\\dot{x} + 2' + (a === 1 ? '' : a) + 'y\\dot{y} = 0')]
      ]);
    },
    function () {
      var l1 = 2, l2 = -1, u = 0;
      var A = eig(l1, l2, u);
      return Q('The system ' + M('\\dot{\\mathbf{x}} = ' + mat(A[0], A[1], A[2], A[3]) + '\\mathbf{x}') + ' has eigenvalues 2 and −1 with eigenvectors ' + M(vec(1, 0)) + ' and ' + M(vec(1, 1)) + '.', [
        ['Write the general solution.', 2, M('\\mathbf{x} = Ae^{2t}' + vec(1, 0) + ' + Be^{-t}' + vec(1, 1))],
        ['Find the solution with ' + M('\\mathbf{x}(0) = ' + vec(3, 1)) + '.', 2, M('A = 2,\\ B = 1')],
        ['Describe the behaviour as ' + M('t \\to \\infty') + '.', 1, 'It moves away along the direction ' + M(vec(1, 0))]
      ]);
    },
    function () {
      var r = pick([0.5, 1]), s = pick([0.5, 1]);
      return Q('Two species interact: ' + M('\\dot{x} = ' + (r === 1 ? '' : r) + 'x - 0.01xy') + ', ' + M('\\dot{y} = -' + (s === 1 ? '' : s) + 'y + 0.01xy') + '.', [
        ['Which species is the predator? Explain.', 1, M('y') + ': it declines without ' + M('x') + ' and grows when ' + M('x') + ' is present'],
        ['Find the non-zero equilibrium.', 2, M('x = ' + s * 100 + ',\\ y = ' + r * 100)],
        ['Use Euler’s method with step 0.1 from ' + M('(' + (s * 100 + 20) + ', ' + r * 100 + ')') + ' to find the next point.', 2, (function () { var x = s * 100 + 20, y = r * 100; var nx = x + 0.1 * (r * x - 0.01 * x * y), ny = y + 0.1 * (-s * y + 0.01 * x * y); return M('(' + sf3(nx) + ', ' + sf3(ny) + ')'); })()]
      ]);
    },
    function () {
      return Q('Classifying equilibria from eigenvalues.', [
        ['Two negative real eigenvalues.', 1, 'Stable node'],
        ['Real eigenvalues of opposite sign.', 1, 'Saddle (unstable)'],
        ['Complex eigenvalues with negative real part.', 1, 'Stable spiral'],
        ['Purely imaginary eigenvalues.', 1, 'Centre (closed orbits)']
      ]);
    },
    function () {
      var p = pick([-1, -2]), q = pick([1, 2]);
      return Q('The matrix ' + M(mat(p, -q, q, p)) + ' defines ' + M('\\dot{\\mathbf{x}} = M\\mathbf{x}') + '.', [
        ['Find the eigenvalues.', 2, M(p + ' \\pm ' + (q === 1 ? '' : q) + 'i')],
        ['Describe the phase portrait.', 1, 'Trajectories spiral into the origin (stable spiral)'],
        ['Determine the direction of rotation using the point ' + M('(1, 0)') + '.', 1, 'Velocity ' + M(vec(p, q)) + ': anticlockwise']
      ]);
    },
    function () {
      var a = pick([2, 3]);
      return Q('Show that ' + M('\\ddot{x} + ' + a * a + 'x = 0') + ' can be written as a coupled system.', [
        ['Let ' + M('y = \\dot{x}') + '. Write the system.', 2, M('\\dot{x} = y,\\ \\dot{y} = -' + a * a + 'x')],
        ['Find the eigenvalues and describe the motion.', 2, M('\\pm ' + a + 'i') + ': oscillation with period ' + M('\\frac{2\\pi}{' + a + '}')],
        ['Verify that ' + M('x = \\cos(' + a + 't)') + ' is a solution.', 1, M('\\ddot{x} = -' + a * a + '\\cos(' + a + 't)')]
      ]);
    },
    function () {
      var l1 = -1, l2 = -3, u = 1;
      var A = eig(l1, l2, u);
      return Q('The system has matrix ' + M(mat(A[0], A[1], A[2], A[3])) + '.', [
        ['Find the eigenvalues and eigenvectors.', 3, '−1 with ' + M(vec(1, 1)) + '; −3 with ' + M(vec(1, 2))],
        ['Which eigenvector do most trajectories approach the origin along? Explain.', 2, M(vec(1, 1)) + ': the ' + M('e^{-3t}') + ' term dies away faster'],
        ['Classify the origin.', 1, 'Stable node']
      ]);
    },
    function () {
      var h = 0.1;
      return Q('For ' + M('\\dot{x} = x - y') + ', ' + M('\\dot{y} = x + y') + ', starting at ' + M('(1, 0)') + ':', [
        ['Use Euler’s method with ' + M('h = ' + h) + ' for two steps.', 3, (function () { var x = 1, y = 0; for (var i = 0; i < 2; i++) { var nx = x + h * (x - y), ny = y + h * (x + y); x = nx; y = ny; } return M('(' + sf3(x) + ', ' + sf3(y) + ')'); })()],
        ['Find the eigenvalues.', 2, M('1 \\pm i')],
        ['Describe the long-term behaviour.', 1, 'Unstable spiral: trajectories spiral outwards']
      ]);
    },
    function () {
      return Q('Equilibrium points of non-linear systems.', [
        ['Find all equilibria of ' + M('\\dot{x} = x(3 - x - y)') + ', ' + M('\\dot{y} = y(2 - x - y)') + '.', 3, M('(0,0), (3,0), (0,2)') + ' (the lines ' + M('x + y = 3') + ' and ' + M('x + y = 2') + ' never meet)'],
        ['Interpret this in a competing species context.', 1, 'The species cannot coexist: one dies out'],
        ['Which species is predicted to win? Explain using the equilibria.', 1, M('x') + ': near ' + M('(0, 2)') + ', ' + M('x') + ' can still grow since ' + M('3 - 0 - 2 > 0')]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
