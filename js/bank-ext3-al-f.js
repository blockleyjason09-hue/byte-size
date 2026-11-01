/* Byte Size Classroom — deeper extension questions (set 3, A level Year 1 part f): constant acceleration, forces and Newton's laws, variable acceleration, the large data set. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function ij(a, b) { var s = a ? c1(a, '\\mathbf{i}') : ''; if (b) s += (s ? (b < 0 ? ' - ' + c1(-b, '\\mathbf{j}') : ' + ' + c1(b, '\\mathbf{j}')) : c1(b, '\\mathbf{j}')); return s || '\\mathbf{0}'; }
  var G = 9.8;
  function fv(x, y, m) { var a = F(x, m), b = F(y, m), out = x ? (a === '1' ? '' : a === '-1' ? '-' : a) + '\\mathbf{i}' : ''; if (y) { var bb = b.charAt(0) === '-' ? b.slice(1) : b; out += (out ? (y < 0 ? ' - ' : ' + ') : (y < 0 ? '-' : '')) + (bb === '1' ? '' : bb) + '\\mathbf{j}'; } return out || '\\mathbf{0}'; }

  X('al-suvat', [
    function () {
      var u = ri(2, 10), v = u + ri(5, 15), s = ri(50, 150);
      var a = (v * v - u * u) / (2 * s), t = 2 * s / (u + v);
      return Q('A car accelerates uniformly from ' + u + ' m/s to ' + v + ' m/s over ' + s + ' m.', [
        ['Find the acceleration.', 2, sf3(a) + ' m/s²'],
        ['Find the time taken.', 2, sf3(t) + ' s'],
        ['Find the speed when it is halfway, and explain why it is more than ' + num((u + v) / 2) + ' m/s.', 3, M('\\sqrt{\\frac{' + u * u + ' + ' + v * v + '}{2}} = ' + sf3(Math.sqrt((u * u + v * v) / 2))) + ' m/s; it covers the second half faster, so it reaches halfway after more than half the time']
      ]);
    },
    function () {
      var u = ri(14, 25), h = ri(5, Math.floor(u * u / (2 * G)) - 2);
      var D = u * u - 2 * G * h;
      return Q('A ball is thrown vertically upwards at ' + u + ' m/s from ground level.', [
        ['Find the greatest height.', 2, sf3(u * u / (2 * G)) + ' m'],
        ['Find the time it is in the air.', 2, sf3(2 * u / G) + ' s'],
        ['Find how long it is more than ' + h + ' m above the ground.', 3, sf3(2 * Math.sqrt(D) / G) + ' s']
      ]);
    },
    function () {
      var a = ri(2, 4), V = ri(10, 20);
      var t = 2 * V / a;
      return Q('A car starts from rest at a junction with acceleration ' + a + ' m/s² just as a van passes it at a constant ' + V + ' m/s.', [
        ['Find when the car catches the van.', 3, sf3(t) + ' s'],
        ['Find the car’s speed then, and comment.', 1, 2 * V + ' m/s: exactly twice the van’s speed'],
        ['Find the greatest distance between them before the car catches up.', 3, sf3(V * V / (2 * a)) + ' m, when both have speed ' + V + ' m/s']
      ]);
    },
    function () {
      var h = ri(30, 80);
      var t1 = Math.sqrt(2 * h / G), u = (h - 0.5 * G * (t1 - 1) * (t1 - 1)) / (t1 - 1);
      return Q('A stone is dropped from a cliff ' + h + ' m high. One second later a second stone is thrown downwards from the same point. Both land together.', [
        ['Find the time taken by the first stone.', 2, sf3(t1) + ' s'],
        ['Find the speed at which the second stone was thrown.', 3, sf3(u) + ' m/s'],
        ['State one modelling assumption.', 1, 'No air resistance (or stones are particles)']
      ]);
    },
    function () {
      var v = ri(10, 30), a = ri(4, 8);
      return Q('A car travelling at ' + v + ' m/s brakes with deceleration ' + a + ' m/s².', [
        ['Find the braking distance.', 2, sf3(v * v / (2 * a)) + ' m'],
        ['Show that doubling the speed multiplies the braking distance by 4.', 2, M('s = \\frac{v^2}{2a}')],
        ['The driver has a reaction time of 0.8 s. Find the total stopping distance at ' + 2 * v + ' m/s.', 2, sf3(1.6 * v + 4 * v * v / (2 * a)) + ' m']
      ]);
    },
    function () {
      var V = ri(10, 20), t1 = ri(4, 8), t2 = ri(10, 30), t3 = ri(4, 10);
      var D = V * (t1 / 2 + t2 + t3 / 2);
      return Q('A train accelerates uniformly from rest to ' + V + ' m/s in ' + t1 + ' s, travels at that speed for ' + t2 + ' s, then decelerates uniformly to rest in ' + t3 + ' s.', [
        ['Sketch the velocity–time graph and find the total distance.', 3, D + ' m'],
        ['Find the average speed.', 1, sf3(D / (t1 + t2 + t3)) + ' m/s'],
        ['If the same distance is covered with the same acceleration and deceleration but a top speed of ' + 2 * V + ' m/s, how long is spent at top speed?', 3, (function () { var t1b = 2 * t1, t3b = 2 * t3, r = D - 2 * V * (t1b / 2 + t3b / 2); return r >= 0 ? sf3(r / (2 * V)) + ' s' : 'None — it cannot reach ' + 2 * V + ' m/s in that distance'; })()]
      ]);
    },
    function () {
      var h = ri(10, 40), u = ri(2, 8);
      var v = Math.sqrt(u * u + 2 * G * h);
      return Q('A ball is thrown downwards at ' + u + ' m/s from a height of ' + h + ' m.', [
        ['Find its speed when it hits the ground.', 2, sf3(v) + ' m/s'],
        ['Find the time taken.', 2, sf3((v - u) / G) + ' s'],
        ['Would it hit the ground faster if thrown upwards at ' + u + ' m/s? Explain.', 2, 'No: it returns to the starting point at ' + u + ' m/s downwards, so it lands at the same speed (but later)']
      ]);
    },
    function () {
      return Q('Deriving the constant acceleration formulae.', [
        ['From a velocity–time graph with initial velocity ' + M('u') + ', final ' + M('v') + ' and time ' + M('t') + ', explain why ' + M('s = \\frac{(u + v)t}{2}') + '.', 2, 'The area is a trapezium'],
        ['Use ' + M('v = u + at') + ' to show ' + M('s = ut + \\frac{1}{2}at^2') + '.', 2, 'Substitute ' + M('v')],
        ['Eliminate ' + M('t') + ' to show ' + M('v^2 = u^2 + 2as') + '.', 3, M('t = \\frac{v - u}{a}') + ', so ' + M('s = \\frac{(u + v)(v - u)}{2a}')]
      ]);
    },
    function () {
      var u = ri(15, 30), v = ri(3, u - 5), d = ri(40, 120);
      return Q('A particle passes ' + M('A') + ' at ' + u + ' m/s and ' + M('B') + ', ' + d + ' m further on, at ' + v + ' m/s, with constant deceleration.', [
        ['Find the deceleration.', 2, sf3((u * u - v * v) / (2 * d)) + ' m/s²'],
        ['Find its speed at the midpoint of ' + M('AB') + '.', 2, sf3(Math.sqrt((u * u + v * v) / 2)) + ' m/s'],
        ['How much further does it travel before stopping?', 2, sf3(v * v * d / (u * u - v * v)) + ' m']
      ]);
    },
    function () {
      var u = ri(5, 15), a = ri(2, 5), n = ri(3, 6);
      return Q('A particle starts with velocity ' + u + ' m/s and accelerates at ' + a + ' m/s².', [
        ['Find the distance travelled in the first ' + n + ' seconds.', 1, (u * n + a * n * n / 2) + ' m'],
        ['Find the distance travelled in the ' + n + 'th second only.', 2, (u + a * (2 * n - 1) / 2) + ' m'],
        ['Show that distances in successive seconds form an arithmetic sequence and state the common difference.', 2, 'Each is ' + M(u + ' + ' + a + '(k - \\tfrac{1}{2})') + '; difference ' + a]
      ]);
    }
  ]);

  X('al-forces', [
    function () {
      var m = ri(50, 90), a = pick([0.5, 1, 1.5, 2]);
      return Q('A person of mass ' + m + ' kg stands on scales in a lift.', [
        ['Find the reading (the normal reaction) when the lift accelerates upwards at ' + a + ' m/s².', 2, sf3(m * (G + a)) + ' N'],
        ['Find it when the lift accelerates downwards at ' + a + ' m/s².', 2, sf3(m * (G - a)) + ' N'],
        ['What happens if the lift accelerates downwards at 9.8 m/s²? Explain.', 1, 'The reading is 0: the person is in free fall']
      ]);
    },
    function () {
      var M1 = ri(800, 1500), m2 = ri(200, 500), Df = ri(2000, 4000), R1 = ri(200, 500), R2 = ri(100, 300);
      var a = (Df - R1 - R2) / (M1 + m2), T = m2 * a + R2;
      return Q('A car of mass ' + M1 + ' kg tows a trailer of mass ' + m2 + ' kg. The driving force is ' + Df + ' N, and the resistances are ' + R1 + ' N (car) and ' + R2 + ' N (trailer).', [
        ['Find the acceleration.', 2, sf3(a) + ' m/s²'],
        ['Find the tension in the tow bar.', 2, sf3(T) + ' N'],
        ['The tow bar breaks. Find the trailer’s deceleration.', 1, sf3(R2 / m2) + ' m/s²']
      ]);
    },
    function () {
      var m1 = ri(3, 8), m2 = ri(1, m1 - 1), h = ri(1, 4);
      var a = (m1 - m2) * G / (m1 + m2), T = 2 * m1 * m2 * G / (m1 + m2), v = Math.sqrt(2 * a * h);
      return Q('Particles of mass ' + m1 + ' kg and ' + m2 + ' kg hang over a smooth pulley, released from rest. The heavier particle is ' + h + ' m above the floor.', [
        ['Find the acceleration and the tension.', 4, sf3(a) + ' m/s², ' + sf3(T) + ' N'],
        ['Find the speed when the heavier particle hits the floor.', 2, sf3(v) + ' m/s'],
        ['Find how much higher the lighter particle rises after the string goes slack.', 2, sf3(v * v / (2 * G)) + ' m']
      ]);
    },
    function () {
      var m1 = ri(2, 6), m2 = ri(1, 4);
      var a = m2 * G / (m1 + m2), T = m1 * a;
      return Q('A block of mass ' + m1 + ' kg on a smooth table is connected by a string over a smooth pulley at the edge to a particle of mass ' + m2 + ' kg hanging freely.', [
        ['Write equations of motion for each particle.', 2, M(m1 + 'a = T') + ', ' + M(m2 + 'g - T = ' + m2 + 'a')],
        ['Find the acceleration and the tension.', 2, sf3(a) + ' m/s², ' + sf3(T) + ' N'],
        ['Explain why the tension is less than the weight of the hanging particle.', 1, 'The hanging particle accelerates downwards, so the resultant force on it is downwards']
      ]);
    },
    function () {
      var m = ri(2, 5), f1 = [ri(1, 6), ri(-4, 4)], f2 = [ri(-5, 3), ri(1, 6)];
      var R = [f1[0] + f2[0], f1[1] + f2[1]]; if (!R[0] && !R[1]) R = [1, 1];
      var ax = R[0] / m, ay = R[1] / m;
      return Q('Forces ' + M('(' + ij(f1[0], f1[1]) + ')') + ' N and ' + M('(' + ij(f2[0], f2[1]) + ')') + ' N act on a particle of mass ' + m + ' kg.', [
        ['Find the acceleration vector.', 2, M(fv(R[0], R[1], m))],
        ['Find the magnitude of the acceleration.', 1, sf3(Math.hypot(ax, ay)) + ' m/s²'],
        ['The particle starts from rest. Find its velocity after 2 s.', 1, M(fv(2 * R[0], 2 * R[1], m)) + ' m/s']
      ]);
    },
    function () {
      var a = ri(1, 6), b = ri(-5, 5), c = ri(-6, 2), d = ri(1, 7);
      return Q('A particle is in equilibrium under ' + M('\\mathbf{F}_1 = ' + ij(a, b)) + ', ' + M('\\mathbf{F}_2 = ' + ij(c, d)) + ' and ' + M('\\mathbf{F}_3 = p\\mathbf{i} + q\\mathbf{j}') + ' (all in N).', [
        ['Find ' + M('p') + ' and ' + M('q') + '.', 2, M('p = ' + (-a - c) + ',\\ q = ' + (-b - d))],
        ['Find the magnitude of ' + M('\\mathbf{F}_3') + '.', 1, sf3(Math.hypot(a + c, b + d)) + ' N'],
        ['If ' + M('\\mathbf{F}_3') + ' is removed, find the magnitude of the resultant.', 1, sf3(Math.hypot(a + c, b + d)) + ' N (equal to ' + M('|\\mathbf{F}_3|') + ')']
      ]);
    },
    function () {
      var m = ri(5, 20), P = ri(50, 150), R = ri(10, 40);
      return Q('A box of mass ' + m + ' kg is pushed across a floor by a horizontal force of ' + P + ' N against a constant resistance of ' + R + ' N.', [
        ['Find the acceleration.', 2, sf3((P - R) / m) + ' m/s²'],
        ['What force is needed to keep it moving at constant speed?', 1, R + ' N'],
        ['The push is removed when the speed is 3 m/s. How far does the box slide?', 2, sf3(9 * m / (2 * R)) + ' m']
      ]);
    },
    function () {
      var m1 = ri(2, 5), m2 = ri(2, 5), P = ri(10, 40);
      return Q('Two blocks of mass ' + m1 + ' kg (A) and ' + m2 + ' kg (B) are joined by a light string on a smooth surface. A force of ' + P + ' N pulls A.', [
        ['Find the acceleration and the tension.', 3, sf3(P / (m1 + m2)) + ' m/s², ' + sf3(P * m2 / (m1 + m2)) + ' N'],
        ['Find the tension if the force pulls B instead.', 1, sf3(P * m1 / (m1 + m2)) + ' N'],
        ['Explain why the tension changes but the acceleration does not.', 1, 'The string must accelerate whichever block is being towed']
      ]);
    },
    function () {
      var m = ri(2, 10);
      return Q('Mass and weight.', [
        ['Find the weight of a ' + m + ' kg mass on Earth and on the Moon (g = 1.6 m/s²).', 2, sf3(m * G) + ' N and ' + sf3(m * 1.6) + ' N'],
        ['Explain why it would be equally hard to accelerate the mass horizontally on the Moon.', 1, 'Horizontal acceleration depends on mass, not weight'],
        ['Explain why the normal reaction on a horizontal surface equals the weight only if there is no vertical acceleration.', 1, 'Otherwise the resultant vertical force is not zero']
      ]);
    },
    function () {
      var m = ri(2, 6), u = ri(5, 15), R = ri(5, 15);
      var a = G + R / m, h = u * u / (2 * a);
      return Q('A ball of mass ' + m + ' kg is thrown upwards at ' + u + ' m/s, with a constant air resistance of ' + R + ' N.', [
        ['Find the deceleration on the way up.', 2, sf3(a) + ' m/s²'],
        ['Find the greatest height reached.', 2, sf3(h) + ' m'],
        ['Find the acceleration on the way down, and explain why it is different.', 2, sf3(G - R / m) + ' m/s²; resistance now acts upwards, against the weight']
      ]);
    }
  ]);

  X('al-variable-acc', [
    function () {
      var p = ri(1, 3), q = p + ri(1, 3);
      var A = 3, B = -3 * (p + q), Cc = 3 * p * q;
      var s = function (t) { return t * t * t - 3 * (p + q) * t * t / 2 + 3 * p * q * t; };
      return Q('A particle has velocity ' + M('v = ' + poly([A, B, Cc]).replace(/x/g, 't')) + ' m/s.', [
        ['Find when it is at rest.', 2, M('t = ' + p) + ' and ' + M('t = ' + q)],
        ['Find the distance travelled between these times.', 3, sf3(Math.abs(s(q) - s(p))) + ' m'],
        ['Find the acceleration at each time and interpret the signs.', 2, (6 * p + B) + ' and ' + (6 * q + B) + ' m/s²: slowing to reverse, then speeding up the other way']
      ]);
    },
    function () {
      var p = ri(1, 2), q = p + ri(1, 3), T = q + ri(1, 2);
      var s = function (t) { return t * t * t - 1.5 * (p + q) * t * t + 3 * p * q * t; };
      var d = Math.abs(s(p)) + Math.abs(s(q) - s(p)) + Math.abs(s(T) - s(q));
      return Q('A particle has displacement ' + M('s = t^3 - ' + num(1.5 * (p + q)) + 't^2 + ' + 3 * p * q + 't') + ' m.', [
        ['Find when its velocity is zero.', 2, M('t = ' + p) + ' and ' + M('t = ' + q)],
        ['Find its displacement at ' + M('t = ' + T) + '.', 1, sf3(s(T)) + ' m'],
        ['Find the total distance travelled in the first ' + T + ' s.', 3, sf3(d) + ' m']
      ]);
    },
    function () {
      var k = ri(2, 6), c = ri(1, 5), u = ri(1, 6);
      return Q('A particle has acceleration ' + M('a = ' + k + 't - ' + c) + ' m/s² and initial velocity ' + u + ' m/s, starting at the origin.', [
        ['Find ' + M('v') + ' in terms of ' + M('t') + '.', 2, M('v = ' + c1(k / 2 === 1 ? 1 : num(k / 2), 't^2') + ' - ' + c1(c, 't') + ' + ' + u)],
        ['Find ' + M('s') + ' in terms of ' + M('t') + '.', 2, M('s = ' + c1(F(k, 6) === '1' ? 1 : F(k, 6), 't^3') + ' - ' + c1(F(c, 2) === '1' ? 1 : F(c, 2), 't^2') + ' + ' + c1(u, 't'))],
        ['Find the minimum velocity.', 2, sf3(u - c * c / (2 * k)) + ' m/s at ' + M('t = ' + F(c, k))]
      ]);
    },
    function () {
      var T = ri(4, 10);
      return Q('A particle has velocity ' + M('v = t(' + T + ' - t)') + ' m/s for ' + M('0 \\le t \\le ' + T) + '.', [
        ['Find the maximum velocity.', 2, num(T * T / 4) + ' m/s'],
        ['Find the distance travelled.', 2, M(F(T * T * T, 6)) + ' m'],
        ['Find the average speed and compare it with the maximum.', 2, M(F(T * T, 6)) + ' m/s: exactly ' + M('\\frac{2}{3}') + ' of the maximum']
      ]);
    },
    function () {
      var k = ri(2, 6);
      return Q('A particle starts at the origin with velocity ' + M('v = ' + 2 * k + 't - t^2') + ' m/s.', [
        ['Find its displacement after ' + M('t') + ' seconds.', 2, M('s = ' + c1(k, 't^2') + ' - \\frac{t^3}{3}')],
        ['When does it return to the origin?', 2, M('t = ' + 3 * k) + ' s'],
        ['Find the greatest distance from the origin in this time.', 2, M(F(4 * k * k * k, 3)) + ' m at ' + M('t = ' + 2 * k)]
      ]);
    },
    function () {
      var T = ri(2, 6), u = ri(0, 4);
      var k = (T * T - u) / T;
      return Q('A particle has acceleration ' + M('a = k - 2t') + ' and starts with velocity ' + u + ' m/s. It is at rest at ' + M('t = ' + T) + '.', [
        ['Find ' + M('v') + ' in terms of ' + M('k') + ' and ' + M('t') + '.', 2, M('v = ' + (u ? u + ' + ' : '') + 'kt - t^2')],
        ['Find ' + M('k') + '.', 2, M('k = ' + F(T * T - u, T))],
        ['Find the maximum velocity.', 2, sf3(u + k * k / 4) + ' m/s']
      ]);
    },
    function () {
      var b = ri(1, 4), c = b * b + ri(1, 5);
      return Q('A particle has velocity ' + M('v = t^2 - ' + 2 * b + 't + ' + c) + ' m/s.', [
        ['Prove that it is never at rest.', 2, M('v = (t - ' + b + ')^2 + ' + (c - b * b) + ' > 0')],
        ['Find the minimum speed and when it occurs.', 1, (c - b * b) + ' m/s at ' + M('t = ' + b)],
        ['Explain why the distance travelled equals the displacement here.', 1, 'It always moves in the positive direction']
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(5, 12);
      return Q('Particle P has displacement ' + M('s_P = t^2 + ' + a + 't') + ' and particle Q has ' + M('s_Q = ' + b + 't') + ' (both in m, from the same point).', [
        ['Find when they are at the same position (after ' + M('t = 0') + ').', 2, M('t = ' + (b - a)) + ' s'],
        ['Find their velocities then.', 2, (2 * (b - a) + a) + ' and ' + b + ' m/s'],
        ['Find the greatest distance between them before then.', 2, num((b - a) * (b - a) / 4) + ' m']
      ]);
    },
    function () {
      var p = ri(1, 3), q = p + ri(1, 3);
      var s = function (t) { return t * t * t / 3 - (p + q) * t * t / 2 + p * q * t; };
      var T = q + 1, disp = s(T), dist = Math.abs(s(p)) + Math.abs(s(q) - s(p)) + Math.abs(s(T) - s(q));
      return Q('A particle has ' + M('v = ' + poly([1, -(p + q), p * q]).replace(/x/g, 't')) + ' and starts at the origin.', [
        ['Find the average velocity over the first ' + T + ' s.', 2, sf3(disp / T) + ' m/s'],
        ['Find the average speed over the same time.', 3, sf3(dist / T) + ' m/s'],
        ['Explain why they differ.', 1, 'The particle changes direction, so some distance cancels in the displacement']
      ]);
    },
    function () {
      var k = ri(1, 4), n = ri(2, 5);
      return Q('A particle starts from rest with ' + M('v = ' + c1(k, 't^2')) + ' m/s.', [
        ['Find the distance travelled in the first ' + n + ' seconds.', 2, M(F(k * n * n * n, 3)) + ' m'],
        ['Find the distance travelled during the ' + n + 'th second.', 2, M(F(k * (n * n * n - (n - 1) * (n - 1) * (n - 1)), 3)) + ' m'],
        ['Explain why ' + M('\\int v\\,dt') + ' gives distance here without splitting the interval.', 1, M('v \\ge 0') + ' throughout']
      ]);
    }
  ]);

  X('al-lds', [
    function () {
      return Q('In the weather large data set, daily rainfall is sometimes recorded as “tr”.', [
        ['What does “tr” mean?', 1, 'Trace: less than 0.05 mm'],
        ['Suggest a value to use when calculating summary statistics, and justify it.', 2, '0 (or 0.025): the amount is negligible'],
        ['Explain how your choice could affect the mean and the median.', 1, 'The mean changes slightly; the median is unlikely to change']
      ]);
    },
    function () {
      var N = 184, n = pick([20, 23, 46]);
      return Q('A student wants a sample of ' + n + ' days from the ' + N + ' days of data for one location.', [
        ['Describe how to take a systematic sample.', 2, 'Number the days 1–' + N + '; interval about ' + Math.floor(N / n) + '; random start, then every ' + Math.floor(N / n) + 'th day'],
        ['Explain a weakness of systematic sampling for weather data.', 1, 'Weather patterns can be cyclic, which might match the interval'],
        ['Explain why a simple random sample might miss the seasonal change across the months.', 1, 'By chance it may contain mostly early or late days']
      ]);
    },
    function () {
      return Q('The data set includes UK locations and overseas locations such as Perth (Australia).', [
        ['Explain why mean temperatures for May–October behave differently in Perth.', 2, 'Perth is in the southern hemisphere, so May–October is autumn/winter'],
        ['How should this be considered when comparing locations?', 1, 'Compare like-for-like seasons, or note the difference'],
        ['Suggest a better comparison between Perth and a UK location.', 1, 'Compare the same season (e.g. each location’s summer months)']
      ]);
    },
    function () {
      var m1 = ri(14, 18), m2 = ri(15, 20), s1 = ri(2, 4), s2 = ri(2, 4);
      return Q('Daily mean temperatures (°C) in June: Location A mean ' + m1 + ', SD ' + s1 + '; Location B mean ' + m2 + ', SD ' + s2 + '.', [
        ['Compare the temperatures in context.', 2, (m1 > m2 ? 'A' : m1 < m2 ? 'B' : 'Neither') + ' was warmer on average; ' + (s1 < s2 ? 'A' : s1 > s2 ? 'B' : 'neither') + ' was more consistent'],
        ['A day at A had mean temperature ' + (m1 + 2 * s1 + 1) + ' °C. Is this unusual? Explain.', 1, 'Yes: more than 2 SDs above the mean'],
        ['Explain why one month of data may not represent the location’s climate.', 1, 'A single month in one year may be unusual']
      ]);
    },
    function () {
      return Q('Some entries in the data set are marked “n/a”.', [
        ['Explain what this means and how it should be handled.', 2, 'Data not available; omit those days from calculations'],
        ['Explain how omitting them could bias the results.', 1, 'If missing days share a feature (e.g. extreme weather), the sample is no longer representative'],
        ['How should the sample size be reported?', 1, 'As the number of days actually used']
      ]);
    },
    function () {
      var r = pick([0.62, 0.71, 0.48]);
      return Q('For one location, the PMCC between daily total sunshine and daily maximum temperature is ' + r + '.', [
        ['Interpret this value.', 1, 'Moderate/strong positive correlation: sunnier days tend to be warmer'],
        ['Suggest a reason for the correlation, and explain why it does not prove causation.', 2, 'Sunshine heats the ground; but season and wind direction may affect both'],
        ['Why might the correlation be weaker at a coastal location?', 1, 'The sea moderates temperature']
      ]);
    },
    function () {
      return Q('Wind direction is recorded as a compass bearing (e.g. 230°).', [
        ['Explain why the mean of bearings can be misleading.', 2, 'The mean of 350° and 10° is 180°, which is the opposite direction'],
        ['Suggest a suitable representation.', 1, 'A bar chart or rose diagram of directions grouped into sectors'],
        ['Is wind direction quantitative or qualitative data? Explain.', 1, 'Numerical but circular; often treated as categorical in sectors']
      ]);
    },
    function () {
      var a = ri(14, 17), b = a + 1;
      return Q('The mean daily maximum temperature at a UK location was ' + a + ' °C in 1987 and ' + b + ' °C in 2015.', [
        ['Can you conclude that the climate is getting warmer? Explain.', 2, 'No: two single years are too little data, and year-to-year variation is large'],
        ['What additional data would support such a conclusion?', 1, 'Many years of data from many locations'],
        ['What else should be checked before comparing the two years?', 1, 'That the same months and recording methods were used']
      ]);
    },
    function () {
      var a = 1000, n = ri(25, 31), sy = ri(-40, 40), syy = ri(400, 900);
      var m = a + sy / n, sd = Math.sqrt(syy / n - (sy / n) * (sy / n));
      return Q('Daily mean pressure ' + M('p') + ' (hPa) for ' + n + ' days is coded as ' + M('y = p - 1000') + ', giving ' + M('\\sum y = ' + sy) + ' and ' + M('\\sum y^2 = ' + syy) + '.', [
        ['Find the mean and standard deviation of ' + M('p') + '.', 3, sf3(m) + ' hPa, ' + sf3(sd) + ' hPa'],
        ['Explain why coding was useful here.', 1, 'The numbers are smaller, so sums are easier and rounding errors smaller'],
        ['Low pressure is often linked to rain. Suggest how to investigate this with the data set.', 1, 'Compare rainfall on low and high pressure days, or find the correlation']
      ]);
    },
    function () {
      return Q('Daily mean wind speed is recorded in knots, and also described using the Beaufort scale.', [
        ['What type of data is the Beaufort description (e.g. “light”, “moderate”)?', 1, 'Qualitative (ordinal)'],
        ['Explain why the median is a more appropriate average than the mean for Beaufort categories.', 1, 'The categories are ordered but not equally spaced numbers'],
        ['Explain a problem with using the mode of wind speed in knots.', 1, 'Speeds are continuous, so values rarely repeat']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
