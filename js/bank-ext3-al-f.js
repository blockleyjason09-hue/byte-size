/* Byte Size Classroom — deeper extension questions (set 3, A level Year 1 part f): constant acceleration, forces and Newton’s laws, variable acceleration, large data set. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  var gr = 9.8;
  function vij(a, b) { return (a ? c1(a, '\\mathbf{i}') : '') + (b ? (a ? (b < 0 ? ' - ' + c1(-b, '\\mathbf{j}') : ' + ' + c1(b, '\\mathbf{j}')) : c1(b, '\\mathbf{j}')) : (a ? '' : '\\mathbf{0}')); }

  X('al-suvat', [
    function () {
      var a = pick([1, 2, 3]), v = ri(6, 15);
      var t = 2 * v / a;
      return Q('Car A starts from rest at a set of lights with acceleration ' + a + ' m s⁻². At the same moment, car B passes the lights at a constant ' + v + ' m s⁻¹.', [
        ['Find when A catches B.', 3, M('\\frac{1}{2}(' + a + ')t^2 = ' + v + 't') + ', ' + M('t = ' + sf3(t)) + ' s'],
        ['Find how far they have travelled.', 1, sf3(v * t) + ' m'],
        ['Find the greatest distance between them before A catches up, and when it occurs.', 3, 'When speeds are equal, ' + M('t = ' + sf3(v / a)) + ' s: ' + sf3(v * v / (2 * a)) + ' m']
      ]);
    },
    function () {
      var u = ri(10, 25), h = ri(5, Math.floor(u * u / (2 * gr)) - 1);
      var D = u * u - 2 * gr * h;
      return Q('A ball is thrown vertically upwards at ' + u + ' m s⁻¹ from ground level. Take ' + M('g = 9.8') + ' m s⁻².', [
        ['Find the maximum height.', 2, sf3(u * u / (2 * gr)) + ' m'],
        ['Find the time the ball is more than ' + h + ' m above the ground.', 3, sf3(2 * Math.sqrt(D) / gr) + ' s'],
        ['Find its speed when it is ' + h + ' m up, and explain why it is the same on the way up and down.', 2, sf3(Math.sqrt(D)) + ' m s⁻¹; ' + M('v^2 = u^2 - 2gs') + ' gives the same ' + M('v^2')]
      ]);
    },
    function () {
      var H = ri(20, 60), u = ri(Math.ceil(Math.sqrt(4.9 * H)) + 2, Math.ceil(Math.sqrt(4.9 * H)) + 10), t = H / u;
      return Q('A stone is dropped from a tower ' + H + ' m high. At the same moment, a second stone is thrown up from the ground directly below at ' + u + ' m s⁻¹.', [
        ['Show that they meet when ' + M('t = \\frac{' + H + '}{' + u + '}') + '.', 3, 'Heights: ' + M(H + ' - 4.9t^2') + ' and ' + M(u + 't - 4.9t^2') + '; set equal'],
        ['Find the height at which they meet.', 2, sf3(H - 4.9 * t * t) + ' m' + (H - 4.9 * t * t < 0 ? ' — negative, so they do not meet in the air' : '')],
        ['Explain why gravity “cancels out” in finding the meeting time.', 1, 'Both stones have the same acceleration, so their relative velocity is constant']
      ]);
    },
    function () {
      var V = ri(10, 20), t1 = ri(4, 8), t3 = ri(3, 6), D = V * (t1 / 2 + t3 / 2) + V * ri(10, 30);
      var T2 = (D - V * (t1 + t3) / 2) / V;
      return Q('A train accelerates uniformly from rest to ' + V + ' m s⁻¹ in ' + t1 + ' s, travels at that speed for ' + M('T') + ' s, then decelerates uniformly to rest in ' + t3 + ' s. The total distance is ' + D + ' m.', [
        ['Sketch the velocity–time graph.', 1, 'A trapezium'],
        ['Find ' + M('T') + '.', 3, sf3(T2) + ' s'],
        ['Find the average speed for the journey.', 1, sf3(D / (t1 + T2 + t3)) + ' m s⁻¹']
      ]);
    },
    function () {
      var u = ri(10, 25), a = ri(3, 7), r = ri(1, 2);
      return Q('A car braking from ' + u + ' m s⁻¹ with deceleration ' + a + ' m s⁻² stops in ' + sf3(u * u / (2 * a)) + ' m.', [
        ['Show that the stopping distance is proportional to the square of the initial speed.', 2, M('s = \\frac{u^2}{2a}')],
        ['Find the stopping distance from ' + (u * (r + 1)) + ' m s⁻¹.', 1, sf3(Math.pow(u * (r + 1), 2) / (2 * a)) + ' m'],
        ['Including a reaction time of 0.7 s, find the total stopping distance from ' + u + ' m s⁻¹.', 2, sf3(0.7 * u + u * u / (2 * a)) + ' m']
      ]);
    },
    function () {
      var u = ri(2, 6), v = u + ri(4, 10), d = ri(20, 60);
      var a = (v * v - u * u) / (2 * d);
      return Q('A particle with constant acceleration passes ' + M('A') + ' at ' + u + ' m s⁻¹ and ' + M('B') + ' at ' + v + ' m s⁻¹. ' + M('AB = ' + d) + ' m.', [
        ['Find the acceleration.', 2, sf3(a) + ' m s⁻²'],
        ['Show that its speed at the midpoint of ' + M('AB') + ' is ' + M('\\sqrt{\\frac{u^2 + v^2}{2}}') + '.', 3, 'Apply ' + M('v^2 = u^2 + 2as') + ' to each half'],
        ['Explain why this is greater than the speed halfway through the time, ' + num((u + v) / 2) + ' m s⁻¹.', 1, 'It reaches the midpoint later than halfway through the time, so it is moving faster']
      ]);
    },
    function () {
      var u = ri(0, 6), a = ri(1, 4), n = ri(3, 8);
      return Q('A particle starts with speed ' + u + ' m s⁻¹ and constant acceleration ' + a + ' m s⁻².', [
        ['Show that the distance travelled in the ' + M('n') + 'th second is ' + M('u + a\\left(n - \\frac{1}{2}\\right)') + '.', 3, M('s_n - s_{n - 1}')],
        ['Find the distance in the ' + n + 'th second.', 1, num(u + a * (n - 0.5)) + ' m'],
        ['Show that the distances in successive seconds form an arithmetic sequence.', 1, 'Common difference ' + a]
      ]);
    },
    function () {
      var a = ri(1, 3), T = ri(40, 80), D = ri(Math.round(T * T / 8), Math.round(T * T / 5)) * a;
      var Vd = (a * T - Math.sqrt(a * a * T * T - 4 * a * D)) / 2;
      return Q('A train accelerates at ' + a + ' m s⁻² from rest to a top speed ' + M('V') + ', travels at ' + M('V') + ', then decelerates at ' + a + ' m s⁻² to rest. The whole journey takes ' + T + ' s and covers ' + D + ' m.', [
        ['Show that ' + M('V^2 - ' + a * T + 'V + ' + a * D + ' = 0') + '.', 3, 'Time at constant speed ' + M(T + ' - \\frac{2V}{' + a + '}') + '; distance ' + M('\\frac{V^2}{' + a + '} + V\\left(' + T + ' - \\frac{2V}{' + a + '}\\right) = ' + D)],
        ['Find ' + M('V') + ', explaining which root to choose.', 2, sf3(Vd) + ' m s⁻¹ (the other root makes the constant-speed time negative)']
      ]);
    },
    function () {
      var u = ri(3, 10), h = ri(20, 60);
      var v = Math.sqrt(u * u + 2 * gr * h), t = (v - u) / gr;
      return Q('A stone is thrown vertically downwards at ' + u + ' m s⁻¹ from a cliff ' + h + ' m high.', [
        ['Find its speed on hitting the sea.', 2, sf3(v) + ' m s⁻¹'],
        ['Find the time taken.', 2, sf3(t) + ' s'],
        ['State one assumption in the model and its effect.', 1, 'No air resistance; the real speed would be lower']
      ]);
    },
    function () {
      var k = ri(15, 40);
      var t = k / gr + 0.5, H = 0.5 * gr * t * t;
      return Q('A stone falls from rest. In the last second of its fall it travels ' + k + ' m.', [
        ['If the fall takes ' + M('T') + ' seconds, show that ' + M('4.9T^2 - 4.9(T - 1)^2 = ' + k) + '.', 2, 'Distance in the last second'],
        ['Find ' + M('T') + ' and the height of the fall.', 3, M('T = ' + sf3(t)) + ' s, ' + sf3(H) + ' m']
      ]);
    }
  ]);

  X('al-forces', [
    function () {
      var m = ri(400, 900), a = pick([0.5, 1, 1.5, 2]);
      return Q('A lift of mass ' + m + ' kg carries no passengers. Take ' + M('g = 9.8') + '.', [
        ['Find the tension in the cable when it accelerates upwards at ' + a + ' m s⁻².', 2, sf3(m * (gr + a)) + ' N'],
        ['Find the tension when it accelerates downwards at ' + a + ' m s⁻².', 1, sf3(m * (gr - a)) + ' N'],
        ['Find the tension when moving upwards at constant speed, and explain.', 1, sf3(m * gr) + ' N: no acceleration, so forces balance']
      ]);
    },
    function () {
      var M1 = ri(1000, 1500), m2 = ri(300, 700), Fd = ri(3000, 5000), r1 = ri(200, 500), r2 = ri(100, 300);
      var a = (Fd - r1 - r2) / (M1 + m2), T = m2 * a + r2;
      return Q('A car of mass ' + M1 + ' kg tows a trailer of mass ' + m2 + ' kg. The driving force is ' + Fd + ' N; resistances are ' + r1 + ' N (car) and ' + r2 + ' N (trailer).', [
        ['Find the acceleration.', 2, sf3(a) + ' m s⁻²'],
        ['Find the tension in the tow bar.', 2, sf3(T) + ' N'],
        ['The tow bar breaks. Find the trailer’s deceleration and explain the effect on the car.', 2, sf3(r2 / m2) + ' m s⁻²; the car’s acceleration increases to ' + sf3((Fd - r1) / M1) + ' m s⁻²']
      ]);
    },
    function () {
      var m1 = ri(2, 6), m2 = m1 + ri(1, 4), h = ri(1, 3);
      var a = (m2 - m1) * gr / (m1 + m2), T = 2 * m1 * m2 * gr / (m1 + m2), v = Math.sqrt(2 * a * h);
      return Q('Particles of mass ' + m1 + ' kg and ' + m2 + ' kg hang over a smooth pulley and are released from rest. The heavier one is ' + h + ' m above the floor.', [
        ['Find the acceleration and the tension.', 3, sf3(a) + ' m s⁻², ' + sf3(T) + ' N'],
        ['Find the speed when the heavier particle hits the floor.', 2, sf3(v) + ' m s⁻¹'],
        ['Find the further height risen by the lighter particle after this.', 2, sf3(v * v / (2 * gr)) + ' m']
      ]);
    },
    function () {
      var m1 = ri(2, 8), m2 = ri(1, 5);
      var a = m2 * gr / (m1 + m2), T = m1 * a;
      return Q('A block of mass ' + m1 + ' kg on a smooth horizontal table is connected by a light string over a smooth pulley to a hanging mass of ' + m2 + ' kg.', [
        ['Find the acceleration and the tension.', 3, sf3(a) + ' m s⁻², ' + sf3(T) + ' N'],
        ['Explain why the tension is less than ' + m2 + 'g.', 1, 'The hanging mass accelerates downwards, so the net force on it is downwards'],
        ['What assumption does “light string” represent?', 1, 'Tension is the same throughout; the string has no mass']
      ]);
    },
    function () {
      var f1 = [ri(1, 6), ri(-4, 4)], f2 = [ri(-5, 3), ri(1, 6)], m = ri(2, 5);
      var R = [f1[0] + f2[0], f1[1] + f2[1]], mag = Math.hypot(R[0], R[1]);
      return Q('Forces ' + M('(' + vij(f1[0], f1[1]) + ')') + ' N and ' + M('(' + vij(f2[0], f2[1]) + ')') + ' N act on a particle of mass ' + m + ' kg.', [
        ['Find the resultant force.', 1, M(vij(R[0], R[1]))],
        ['Find the magnitude of the acceleration.', 2, sf3(mag / m) + ' m s⁻²'],
        ['Find the angle between the acceleration and ' + M('\\mathbf{i}') + '.', 2, sf3(Math.atan2(R[1], R[0]) * 180 / Math.PI) + '°']
      ]);
    },
    function () {
      var m = ri(50, 90), a = pick([0.5, 1, 2]);
      return Q('A person of mass ' + m + ' kg stands on scales in a lift.', [
        ['Find the reading (in newtons) when the lift accelerates upwards at ' + a + ' m s⁻².', 2, sf3(m * (gr + a)) + ' N'],
        ['Find the reading when it decelerates while moving down at ' + a + ' m s⁻².', 2, sf3(m * (gr + a)) + ' N (acceleration is upwards)'],
        ['Explain when the person would feel “weightless”.', 1, 'When the lift accelerates downwards at ' + M('g')]
      ]);
    },
    function () {
      var me = ri(20, 40) * 1000, mc = ri(10, 20) * 1000, n = ri(3, 6), Fd = ri(40, 90) * 1000, r = ri(1, 3) * 1000;
      var total = me + n * mc, a = (Fd - (n + 1) * r) / total;
      return Q('An engine of mass ' + me / 1000 + ' tonnes pulls ' + n + ' carriages, each of mass ' + mc / 1000 + ' tonnes. The driving force is ' + Fd / 1000 + ' kN, and each vehicle has resistance ' + r / 1000 + ' kN.', [
        ['Find the acceleration.', 2, sf3(a) + ' m s⁻²'],
        ['Find the tension in the coupling between the engine and the first carriage.', 2, sf3((n * mc * a + n * r) / 1000) + ' kN'],
        ['Find the tension between the last two carriages.', 2, sf3((mc * a + r) / 1000) + ' kN']
      ]);
    },
    function () {
      var f1 = [ri(2, 8), ri(-5, 5)], f2 = [ri(-6, 2), ri(-5, 5)];
      return Q('Three forces ' + M('\\mathbf{F}_1 = ' + vij(f1[0], f1[1])) + ', ' + M('\\mathbf{F}_2 = ' + vij(f2[0], f2[1])) + ' and ' + M('\\mathbf{F}_3') + ' keep a particle in equilibrium.', [
        ['Find ' + M('\\mathbf{F}_3') + '.', 2, M(vij(-(f1[0] + f2[0]), -(f1[1] + f2[1])))],
        ['Find its magnitude.', 1, sf3(Math.hypot(f1[0] + f2[0], f1[1] + f2[1])) + ' N'],
        ['If ' + M('\\mathbf{F}_3') + ' is removed, describe the motion of a particle that starts at rest.', 1, 'It accelerates in the direction of ' + M('\\mathbf{F}_1 + \\mathbf{F}_2')]
      ]);
    },
    function () {
      var m = ri(800, 1500), u = ri(15, 30), R1 = ri(4000, 9000);
      var a = R1 / m;
      return Q('A car of mass ' + m + ' kg travelling at ' + u + ' m s⁻¹ brakes with a constant total resistance of ' + R1 + ' N.', [
        ['Find the deceleration.', 1, sf3(a) + ' m s⁻²'],
        ['Find the stopping distance and time.', 2, sf3(u * u / (2 * a)) + ' m, ' + sf3(u / a) + ' s'],
        ['The same car carries extra load of 300 kg with the same braking force. Find the new stopping distance.', 2, sf3(u * u * (m + 300) / (2 * R1)) + ' m']
      ]);
    },
    function () {
      var m1 = ri(2, 5), m2 = m1 + ri(1, 3), h = ri(1, 3);
      var a = (m2 - m1) * gr / (m1 + m2), v = Math.sqrt(2 * a * h), t1 = Math.sqrt(2 * h / a), t2 = 2 * v / gr;
      return Q('Masses ' + m1 + ' kg and ' + m2 + ' kg hang over a smooth pulley. The heavier is ' + h + ' m above the ground; the system is released from rest.', [
        ['Find the time until the heavier mass hits the ground.', 2, sf3(t1) + ' s'],
        ['After impact the string goes slack. Find the time until it becomes taut again.', 3, sf3(t2) + ' s (lighter mass moves up and returns to the same point)'],
        ['Explain why the string goes slack.', 1, 'The lighter mass keeps moving upwards under gravity alone, while the heavier one has stopped']
      ]);
    }
  ]);

  X('al-variable-acc', [
    function () {
      var p = ri(1, 2), q = p + ri(1, 3), T = q + 1;
      var s = function (t) { return t * t * t - 1.5 * (p + q) * t * t + 3 * p * q * t; };
      return Q('A particle has velocity ' + M('v = ' + poly([3, -3 * (p + q), 3 * p * q]).replace(/x/g, 't')) + ' m s⁻¹.', [
        ['Find when it is at rest.', 2, M('t = ' + p) + ' and ' + M('t = ' + q)],
        ['Find its acceleration at each of these times.', 2, (6 * p - 3 * (p + q)) + ' and ' + (6 * q - 3 * (p + q)) + ' m s⁻²'],
        ['Find the total distance travelled from ' + M('t = 0') + ' to ' + M('t = ' + T) + '.', 4, num(s(p) + (s(p) - s(q)) + (s(T) - s(q))) + ' m']
      ]);
    },
    function () {
      var a = ri(2, 4);
      return Q('The displacement of a particle is ' + M('s = t^3 - ' + 2 * a + 't^2 + ' + a * a + 't') + ' m.', [
        ['Find when the particle is back at its starting point.', 2, M('t = ' + a) + ' (' + M('t(t - ' + a + ')^2 = 0') + ')'],
        ['Find when it is at rest.', 2, M('t = ' + F(a, 3)) + ' and ' + M('t = ' + a)],
        ['Find its greatest displacement for ' + M('0 \\le t \\le ' + a) + '.', 2, M(F(4 * a * a * a, 27)) + ' m']
      ]);
    },
    function () {
      var k = ri(2, 6), c = ri(1, 4), u = ri(0, 5);
      return Q('A particle has acceleration ' + M('a = ' + k + 't - ' + c) + ' m s⁻² and starts from the origin with velocity ' + u + ' m s⁻¹.', [
        ['Find ' + M('v') + ' in terms of ' + M('t') + '.', 2, M('v = ' + F(k, 2) + 't^2 - ' + c1(c, 't') + (u ? ' + ' + u : ''))],
        ['Find ' + M('s') + ' in terms of ' + M('t') + '.', 2, M('s = ' + F(k, 6) + 't^3 - ' + F(c, 2) + 't^2' + (u ? ' + ' + c1(u, 't') : ''))],
        ['Find the minimum velocity.', 2, sf3(u - c * c / (2 * k)) + ' m s⁻¹ at ' + M('t = ' + F(c, k))]
      ]);
    },
    function () {
      var T = ri(4, 10), D = ri(20, 100);
      var k = 6 * D / (T * T * T);
      return Q('A train travels between stations, starting and finishing at rest, with ' + M('v = kt(' + T + ' - t)') + ' for ' + M('0 \\le t \\le ' + T) + '. The stations are ' + D + ' m apart.', [
        ['Show that the distance is ' + M('\\frac{k \\times ' + T * T * T + '}{6}') + ' and find ' + M('k') + '.', 3, M('k = ' + sf3(k))],
        ['Find the maximum speed.', 2, sf3(k * T * T / 4) + ' m s⁻¹ at ' + M('t = ' + num(T / 2))],
        ['Find the greatest acceleration in the journey.', 1, sf3(k * T) + ' m s⁻² (at the start)']
      ]);
    },
    function () {
      var A = ri(2, 5), B = ri(6, 12);
      return Q('A particle has ' + M('v = ' + B + 't - ' + A + 't^2') + ' for ' + M('0 \\le t \\le ' + F(B, A)) + '.', [
        ['Find the maximum velocity.', 2, M(F(B * B, 4 * A)) + ' m s⁻¹'],
        ['Find the distance travelled in this time.', 2, M(F(B * B * B, 6 * A * A)) + ' m'],
        ['Find the average velocity and compare it with the maximum.', 1, M(F(B * B, 6 * A)) + ' m s⁻¹, which is ' + M('\\frac{2}{3}') + ' of the maximum']
      ]);
    },
    function () {
      var p = ri(2, 5), q = ri(1, 3);
      return Q('Particles ' + M('P') + ' and ' + M('Q') + ' move on a line with ' + M('s_P = t^2 + ' + p + 't') + ' and ' + M('s_Q = ' + (p + q) + 't - t^2 + ' + q) + ', measured in metres from the same origin.', [
        ['Find when they meet.', 3, (function () { var D = q * q + 8 * q, t = (q + Math.sqrt(D)) / 4; return M('2t^2 - ' + c1(q, 't') + ' - ' + q + ' = 0') + ', ' + M('t = ' + sf3(t)); })()],
        ['Find their velocities at that moment.', 2, (function () { var t = (q + Math.sqrt(q * q + 8 * q)) / 4; return sf3(2 * t + p) + ' and ' + sf3(p + q - 2 * t) + ' m s⁻¹'; })()]
      ]);
    },
    function () {
      var a = ri(2, 4);
      var s = function (t) { return t * t * t / 3 - a * t * t; };
      var T = 3 * a, dist = Math.abs(s(2 * a)) + (s(T) - s(2 * a));
      return Q('A particle starts from rest at the origin with ' + M('v = t^2 - ' + 2 * a + 't') + ' m s⁻¹.', [
        ['Find its displacement after ' + T + ' s.', 2, sf3(s(T)) + ' m'],
        ['Find the distance travelled in this time.', 3, sf3(dist) + ' m'],
        ['Explain the difference between average speed and average velocity here.', 1, 'Average velocity ' + sf3(s(T) / T) + ' m s⁻¹, average speed ' + sf3(dist / T) + ' m s⁻¹ — the particle reverses']
      ]);
    },
    function () {
      var a = ri(2, 4), T = 4;
      return Q('A particle has ' + M('v = 8 - ' + 2 + 't') + ' for ' + M('0 \\le t \\le 4') + ' and ' + M('v = ' + a + '(t - 4)^2') + ' for ' + M('t > 4') + '.', [
        ['Show the velocity is continuous at ' + M('t = 4') + '.', 1, 'Both give 0'],
        ['Find the distance travelled in the first 4 s.', 2, '16 m'],
        ['Find the time when the total distance travelled is 24 m.', 3, M('t = 4 + \\sqrt[3]{' + F(24, a) + '}') + ' = ' + sf3(4 + Math.cbrt(24 / a)) + ' s']
      ]);
    },
    function () {
      var k = ri(1, 4), d = ri(20, 100);
      var t = Math.cbrt(3 * d / k);
      return Q('A car starts from rest with ' + M('a = ' + 2 * k + 't') + ' m s⁻².', [
        ['Find ' + M('v') + ' and ' + M('s') + ' in terms of ' + M('t') + '.', 2, M('v = ' + c1(k, 't^2') + ',\\ s = ' + F(k, 3) + 't^3')],
        ['Find the time to travel ' + d + ' m.', 2, sf3(t) + ' s'],
        ['Explain why constant-acceleration formulae cannot be used here.', 1, 'The acceleration changes with time']
      ]);
    },
    function () {
      var a = ri(1, 3), b = ri(4, 8);
      return Q('A particle has ' + M('s = ' + c1(a, 't^3') + ' - ' + 3 * a * b + 't^2') + ' metres, for ' + M('t \\ge 0') + '.', [
        ['Find when the acceleration is zero.', 2, M('t = ' + b) + ' s'],
        ['Find the velocity at that time and explain its significance.', 2, sf3(3 * a * b * b - 2 * 3 * a * b * b) + ' m s⁻¹: the minimum velocity'],
        ['Find when the particle returns to the origin.', 1, M('t = ' + 3 * b) + ' s']
      ]);
    }
  ]);

  X('al-lds', [
    function () {
      var n = ri(150, 184), k = pick([10, 15, 20]);
      return Q('A student wants a sample of ' + k + ' days from the ' + n + ' days of data for one weather station in the large data set.', [
        ['Describe how to take a systematic sample.', 2, 'Choose a random start from the first ' + Math.floor(n / k) + ' days, then every ' + Math.floor(n / k) + 'th day'],
        ['Explain why some sampled days might have to be replaced.', 1, 'Some values are recorded as n/a'],
        ['Explain why sampling across the whole period is better than taking ' + k + ' consecutive days.', 1, 'Consecutive days are all in one part of the season and are not representative']
      ]);
    },
    function () {
      var m1 = ri(130, 170) / 10, m2 = m1 + ri(-15, 25) / 10, s1 = ri(20, 40) / 10, s2 = ri(20, 40) / 10;
      return Q('Daily mean temperature (°C), May–October: 1987 mean ' + m1 + ', sd ' + s1 + '; 2015 mean ' + m2 + ', sd ' + s2 + ' at the same station.', [
        ['Compare the two years.', 2, (m2 > m1 ? '2015 was warmer' : m2 < m1 ? '1987 was warmer' : 'Same average temperature') + ' on average; ' + (s2 > s1 ? '2015' : s2 < s1 ? '1987' : 'neither year') + ' was more variable'],
        ['A student claims this shows global warming. Comment.', 2, 'Only two years at one station; natural variation could explain the difference'],
        ['Suggest what data would be needed to support the claim.', 1, 'Many years and many stations']
      ]);
    },
    function () {
      var tr = ri(3, 10), z = ri(40, 80), r = ri(50, 100);
      return Q('Daily total rainfall data contain ' + tr + ' days recorded as “tr” (trace, under 0.05 mm), ' + z + ' days of 0 mm and ' + r + ' days with measurable rain.', [
        ['Explain how you would treat “tr” when calculating a mean.', 1, 'Treat it as 0 (or a value under 0.05), stating the assumption'],
        ['Explain why the median rainfall may be 0 or very small.', 1, 'Many days have little or no rain'],
        ['Why is the mean a poor summary for rainfall?', 1, 'Heavy-rain days skew it upwards']
      ]);
    },
    function () {
      return Q('The large data set includes UK and overseas weather stations.', [
        ['Give one reason the overseas stations might be in different seasons from the UK ones.', 1, 'Stations in the Southern Hemisphere have opposite seasons'],
        ['A student compares daily maximum gust at a coastal and an inland station. Suggest a likely difference and a reason.', 2, 'Higher gusts at the coast: fewer obstructions and sea winds'],
        ['Why might the data for daily mean pressure have little variation?', 1, 'Pressure changes only slightly from day to day']
      ]);
    },
    function () {
      var r = pick([-0.82, -0.65, 0.12, 0.74]);
      return Q('For one station, the PMCC between daily mean temperature and daily total sunshine is ' + r + '.', [
        ['Interpret this value.', 1, (Math.abs(r) > 0.6 ? 'Strong ' : 'Weak ') + (r > 0 ? 'positive' : 'negative') + ' correlation'],
        ['Is this what you would expect? Explain with reference to weather.', 2, r > 0.5 ? 'Yes: sunny days tend to be warmer in summer months' : r < -0.5 ? 'Surprising for summer; perhaps the data include cooler autumn days with long clear nights' : 'A weak link: temperature depends on many other factors'],
        ['Explain why you should not extrapolate this to winter.', 1, 'The data cover May–October only']
      ]);
    },
    function () {
      var hum = ri(70, 95);
      return Q('Daily mean relative humidity at a station has median ' + hum + '%.', [
        ['A day has humidity 100%. What does this mean?', 1, 'The air is saturated'],
        ['Suggest a type of weather associated with high humidity.', 1, 'Fog, mist or rain'],
        ['Explain why humidity data may be negatively skewed.', 1, 'Values are capped at 100%, with a tail towards lower values']
      ]);
    },
    function () {
      var c = ri(20, 40);
      return Q('Visibility in the large data set is recorded in decametres (Dm). A day has visibility ' + c * 100 + ' Dm.', [
        ['Convert this to kilometres.', 1, c + ' km'],
        ['Explain why a student’s calculation of mean visibility in km came out 10 times too large.', 1, '1 Dm = 10 m, so dividing by 100 (not 1000) gives the wrong unit'],
        ['Suggest a weather condition that would give very low visibility.', 1, 'Fog']
      ]);
    },
    function () {
      var a = ri(5, 15), b = ri(5, 15);
      return Q('Wind direction is recorded as a bearing. A student finds the mean wind direction for two days with bearings ' + (360 - a) + '° and ' + b + '°.', [
        ['Find the simple average of the two numbers.', 1, num((360 - a + b) / 2) + '°'],
        ['Explain why this is misleading.', 2, 'Both winds are near north (0°), but the average points roughly south'],
        ['What would be a better summary?', 1, 'The modal compass direction, or about ' + num(((b - a) / 2 + 360) % 360) + '° (taking the shorter way round)']
      ]);
    },
    function () {
      var n = ri(20, 31), miss = ri(1, 4);
      return Q('A month of data for one station has ' + n + ' days, with ' + miss + ' days of daily mean windspeed recorded as n/a.', [
        ['Explain how to handle the missing values when finding the mean windspeed.', 1, 'Exclude them and use ' + (n - miss) + ' days'],
        ['How might excluding them bias the result?', 1, 'If data were missing on extreme days (e.g. storms), the mean would be too low'],
        ['Why should you state which data were used?', 1, 'So others can check and understand any limitations']
      ]);
    },
    function () {
      var m = ri(100, 150) / 10, s = ri(20, 40) / 10;
      return Q('Daily maximum temperature at a station has mean ' + m + '°C and sd ' + s + '°C.', [
        ['Assuming roughly symmetric data, about what proportion of days are within one sd of the mean?', 1, 'About two-thirds'],
        ['A day with ' + sf3(m + 2.5 * s) + '°C is recorded. Is it unusual? Explain.', 1, 'Yes: more than 2 sd above the mean'],
        ['Suggest why daily maximum temperature is more variable than daily mean temperature.', 1, 'The mean averages out highs and lows']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
