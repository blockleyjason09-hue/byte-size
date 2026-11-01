/* Byte Size Classroom — deeper extension questions (set 3, A level Year 2 part e): friction, projectiles, statics, kinematics in two dimensions. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function vij(a, b) { return (a ? c1(a, '\\mathbf{i}') : '') + (b ? (a ? (b < 0 ? ' - ' + c1(-b, '\\mathbf{j}') : ' + ' + c1(b, '\\mathbf{j}')) : c1(b, '\\mathbf{j}')) : (a ? '' : '\\mathbf{0}')); }
  var gr = 9.8, R = Math.PI / 180;
  function tp(c0, c1v, acc) { var o = c0 ? String(c0) : ''; if (c1v) o += (o ? (c1v < 0 ? ' - ' : ' + ') : (c1v < 0 ? '-' : '')) + c1(Math.abs(c1v), 't'); var h = F(Math.abs(acc), 2); o += (o ? (acc < 0 ? ' - ' : ' + ') : (acc < 0 ? '-' : '')) + (h === '1' ? '' : h) + 't^2'; return o; }
  function deg(x) { return sf3(x) + '°'; }

  X('a2-friction', [
    function () {
      var m = ri(2, 10), P = ri(20, 60), th = pick([20, 30, 40]), mu = pick([0.2, 0.3, 0.4]);
      var Rn = m * gr - P * Math.sin(th * R), Fr = mu * Rn, a = (P * Math.cos(th * R) - Fr) / m;
      return Q('A box of mass ' + m + ' kg on rough horizontal ground ' + M('(\\mu = ' + mu + ')') + ' is pulled by a force of ' + P + ' N at ' + th + '° above the horizontal.', [
        ['Find the normal reaction.', 2, sf3(Rn) + ' N'],
        ['Find the acceleration (or show the box does not move).', 3, a > 0 ? sf3(a) + ' m s⁻²' : 'It does not move: ' + sf3(P * Math.cos(th * R)) + ' N < ' + sf3(Fr) + ' N'],
        ['Explain why pulling at an angle can be better than pulling horizontally.', 1, 'It reduces the normal reaction and hence the friction']
      ]);
    },
    function () {
      var al = pick([15, 20, 25, 30, 35]), mu = pick([0.3, 0.4, 0.5, 0.6]);
      var slides = Math.tan(al * R) > mu, a = gr * (Math.sin(al * R) - mu * Math.cos(al * R));
      return Q('A block is placed at rest on a rough plane inclined at ' + al + '° with ' + M('\\mu = ' + mu) + '.', [
        ['Show that it slides if ' + M('\\tan\\alpha > \\mu') + '.', 2, 'Down-slope weight ' + M('mg\\sin\\alpha') + ' exceeds maximum friction ' + M('\\mu mg\\cos\\alpha')],
        ['Decide whether it slides, and if so find its acceleration.', 2, slides ? 'Yes: ' + sf3(a) + ' m s⁻²' : 'No: ' + M('\\tan ' + al + '° = ' + sf3(Math.tan(al * R)) + ' \\le ' + mu)],
        ['Explain why the mass of the block does not matter.', 1, 'Both forces are proportional to ' + M('m')]
      ]);
    },
    function () {
      var m = ri(2, 6), al = pick([20, 30]), mu = pick([0.2, 0.3]), u = ri(5, 12);
      var up = gr * (Math.sin(al * R) + mu * Math.cos(al * R)), d = u * u / (2 * up), down = gr * (Math.sin(al * R) - mu * Math.cos(al * R));
      return Q('A block of mass ' + m + ' kg is projected up a rough plane inclined at ' + al + '° ' + M('(\\mu = ' + mu + ')') + ' at ' + u + ' m s⁻¹.', [
        ['Find the deceleration up the plane.', 2, sf3(up) + ' m s⁻²'],
        ['Find how far it travels before stopping.', 1, sf3(d) + ' m'],
        ['Does it slide back? If so, find its speed on returning to the start.', 3, down > 0 ? 'Yes: ' + sf3(Math.sqrt(2 * down * d)) + ' m s⁻¹' : 'No: it stays at rest']
      ]);
    },
    function () {
      var m = ri(2, 8), al = pick([25, 30, 35]), mu = pick([0.2, 0.3, 0.4]);
      var W = m * gr, s = Math.sin(al * R), c = Math.cos(al * R);
      return Q('A block of mass ' + m + ' kg rests on a rough plane inclined at ' + al + '° ' + M('(\\mu = ' + mu + ')') + '. A force ' + M('P') + ' acts up the line of greatest slope.', [
        ['Find the least ' + M('P') + ' that prevents the block sliding down.', 3, sf3(Math.max(0, W * (s - mu * c))) + ' N'],
        ['Find the least ' + M('P') + ' that makes it start to move up.', 2, sf3(W * (s + mu * c)) + ' N'],
        ['Explain why the friction acts in opposite directions in the two cases.', 1, 'Friction opposes the motion that would occur']
      ]);
    },
    function () {
      var m1 = ri(3, 8), m2 = ri(2, 6), mu = pick([0.1, 0.2, 0.3]);
      var a = (m2 * gr - mu * m1 * gr) / (m1 + m2), T = m2 * (gr - a);
      return Q('A block of mass ' + m1 + ' kg on a rough table ' + M('(\\mu = ' + mu + ')') + ' is connected over a smooth pulley to a hanging mass of ' + m2 + ' kg.', [
        ['Show that the system moves.', 1, M(m2 + 'g > ' + mu + ' \\times ' + m1 + 'g')],
        ['Find the acceleration and the tension.', 3, sf3(a) + ' m s⁻², ' + sf3(T) + ' N'],
        ['Find the least coefficient of friction for which the system stays at rest.', 1, M(F(m2, m1))]
      ]);
    },
    function () {
      var mu = pick([0.2, 0.25, 0.4, 0.5]), m = ri(2, 8);
      var th = Math.atan(mu) / R, P = mu * m * gr / Math.sqrt(1 + mu * mu);
      return Q('A box of mass ' + m + ' kg on rough ground ' + M('(\\mu = ' + mu + ')') + ' is pulled by a force ' + M('P') + ' at angle ' + M('\\theta') + ' above the horizontal.', [
        ['Show that the least ' + M('P') + ' to move the box satisfies ' + M('P = \\frac{\\mu mg}{\\cos\\theta + \\mu\\sin\\theta}') + '.', 3, 'Resolve: ' + M('P\\cos\\theta = \\mu(mg - P\\sin\\theta)')],
        ['Find the angle that minimises ' + M('P') + ', and the minimum ' + M('P') + '.', 3, M('\\tan\\theta = \\mu') + ': ' + deg(th) + ', ' + sf3(P) + ' N']
      ]);
    },
    function () {
      var u = ri(10, 25), d = ri(20, 60);
      var a = u * u / (2 * d), mu = a / gr;
      return Q('A puck sliding at ' + u + ' m s⁻¹ on rough ice comes to rest in ' + d + ' m.', [
        ['Find the deceleration.', 1, sf3(a) + ' m s⁻²'],
        ['Find the coefficient of friction.', 2, sf3(mu)],
        ['How far would it slide from ' + 2 * u + ' m s⁻¹?', 1, 4 * d + ' m']
      ]);
    },
    function () {
      var m1 = ri(2, 6), m2 = ri(3, 8), al = 30, mu = pick([0.1, 0.2]);
      var a = (m2 * gr - m1 * gr * Math.sin(al * R) - mu * m1 * gr * Math.cos(al * R)) / (m1 + m2);
      return Q('A block of mass ' + m1 + ' kg on a rough plane inclined at 30° ' + M('(\\mu = ' + mu + ')') + ' is connected over a smooth pulley at the top to a hanging mass of ' + m2 + ' kg.', [
        ['Find the acceleration, or show the system does not move.', 4, a > 0 ? sf3(a) + ' m s⁻²' : 'It does not move upwards'],
        ['Find the tension.', 2, a > 0 ? sf3(m2 * (gr - a)) + ' N' : sf3(m2 * gr) + ' N']
      ]);
    },
    function () {
      var mu = pick([0.3, 0.5, 0.7, 1]);
      return Q('The angle of friction ' + M('\\lambda') + ' is defined by ' + M('\\tan\\lambda = \\mu') + '.', [
        ['Find ' + M('\\lambda') + ' for ' + M('\\mu = ' + mu) + '.', 1, deg(Math.atan(mu) / R)],
        ['Show that a block is on the point of slipping on a plane inclined at ' + M('\\lambda') + '.', 2, M('mg\\sin\\lambda = \\mu mg\\cos\\lambda')],
        ['Explain why the total contact force then acts vertically.', 1, 'It balances the weight, the only other force']
      ]);
    },
    function () {
      var m = ri(2, 6), P = ri(10, 40), mu = pick([0.2, 0.3]);
      var Rn = m * gr + P * Math.sin(30 * R), net = P * Math.cos(30 * R) - mu * Rn;
      return Q('A box of mass ' + m + ' kg is pushed by ' + P + ' N directed 30° below the horizontal on rough ground ' + M('(\\mu = ' + mu + ')') + '.', [
        ['Find the normal reaction.', 2, sf3(Rn) + ' N'],
        ['Find the acceleration, or show it does not move.', 2, net > 0 ? sf3(net / m) + ' m s⁻²' : 'It does not move'],
        ['Compare with pulling at 30° above the horizontal.', 1, 'Pulling reduces the reaction and friction, so it is more effective']
      ]);
    }
  ]);

  X('a2-projectiles', [
    function () {
      var u = ri(15, 35), th = pick([30, 40, 45, 50, 60]);
      var ux = u * Math.cos(th * R), uy = u * Math.sin(th * R), T = 2 * uy / gr;
      return Q('A ball is projected from level ground at ' + u + ' m s⁻¹ at ' + th + '° above the horizontal.', [
        ['Find the time of flight.', 2, sf3(T) + ' s'],
        ['Find the range and the greatest height.', 2, sf3(ux * T) + ' m, ' + sf3(uy * uy / (2 * gr)) + ' m'],
        ['Find another angle giving the same range.', 1, (90 - th) + '°']
      ]);
    },
    function () {
      var h = ri(20, 60), u = ri(8, 20), th = pick([0, 20, 30]);
      var ux = u * Math.cos(th * R), uy = u * Math.sin(th * R), T = (uy + Math.sqrt(uy * uy + 2 * gr * h)) / gr;
      return Q('A stone is thrown from a cliff ' + h + ' m high at ' + u + ' m s⁻¹, ' + (th ? th + '° above the horizontal' : 'horizontally') + '.', [
        ['Find the time to reach the sea.', 3, sf3(T) + ' s'],
        ['Find the horizontal distance travelled.', 1, sf3(ux * T) + ' m'],
        ['Find the speed on hitting the sea.', 2, sf3(Math.sqrt(u * u + 2 * gr * h)) + ' m s⁻¹']
      ]);
    },
    function () {
      var u = ri(20, 30), d = ri(20, 40), h = ri(2, 8);
      var A = gr * d * d / (2 * u * u), D = d * d - 4 * A * (A + h);
      var t1 = D >= 0 ? (d + Math.sqrt(D)) / (2 * A) : 0, t2 = D >= 0 ? (d - Math.sqrt(D)) / (2 * A) : 0;
      return Q('A ball is projected at ' + u + ' m s⁻¹ from ground level towards a target ' + d + ' m away horizontally and ' + h + ' m high.', [
        ['Show that ' + M('\\tan\\theta') + ' satisfies ' + M(sf3(A) + 'T^2 - ' + d + 'T + ' + sf3(A + h) + ' = 0') + ', where ' + M('T = \\tan\\theta') + '.', 3, 'Use the trajectory equation and ' + M('\\sec^2\\theta = 1 + \\tan^2\\theta')],
        ['Find the possible angles.', 3, D >= 0 ? deg(Math.atan(t2) / R) + ' and ' + deg(Math.atan(t1) / R) : 'None: the target is out of reach']
      ]);
    },
    function () {
      var u = ri(10, 30);
      return Q('Projectiles from level ground with speed ' + u + ' m s⁻¹.', [
        ['Show that the range is ' + M('\\frac{u^2\\sin 2\\theta}{g}') + '.', 3, 'Time ' + M('\\frac{2u\\sin\\theta}{g}') + ', times ' + M('u\\cos\\theta')],
        ['Find the maximum range and the angle.', 1, sf3(u * u / gr) + ' m at 45°'],
        ['Explain why complementary angles give the same range.', 1, M('\\sin 2\\theta = \\sin(180° - 2\\theta)')]
      ]);
    },
    function () {
      var u = ri(15, 30), th = pick([30, 45, 60]), t = ri(1, 2);
      var vx = u * Math.cos(th * R), vy = u * Math.sin(th * R) - gr * t;
      return Q('A particle is projected at ' + u + ' m s⁻¹ at ' + th + '° above the horizontal.', [
        ['Find its velocity after ' + t + ' s as a vector.', 2, M('(' + sf3(vx) + '\\mathbf{i} ' + (vy < 0 ? '- ' + sf3(-vy) : '+ ' + sf3(vy)) + '\\mathbf{j})') + ' m s⁻¹'],
        ['Find its speed and direction at that time.', 2, sf3(Math.hypot(vx, vy)) + ' m s⁻¹ at ' + deg(Math.abs(Math.atan(vy / vx)) / R) + (vy < 0 ? ' below' : ' above') + ' the horizontal'],
        ['When is it moving horizontally?', 1, sf3(u * Math.sin(th * R) / gr) + ' s']
      ]);
    },
    function () {
      var u = ri(20, 30), th = pick([40, 50, 60]), h = ri(5, 15);
      var uy = u * Math.sin(th * R), D = uy * uy - 2 * gr * h;
      return Q('A projectile is launched at ' + u + ' m s⁻¹ at ' + th + '°.', [
        ['Find the times when it is ' + h + ' m above the ground.', 3, D >= 0 ? sf3((uy - Math.sqrt(D)) / gr) + ' s and ' + sf3((uy + Math.sqrt(D)) / gr) + ' s' : 'It never reaches that height'],
        ['Find the horizontal distance between the two points.', 2, D >= 0 ? sf3(2 * Math.sqrt(D) / gr * u * Math.cos(th * R)) + ' m' : '—'],
        ['Explain why the two times are symmetric about the time of greatest height.', 1, 'The vertical motion is symmetric']
      ]);
    },
    function () {
      var u = ri(18, 28), th = pick([35, 45]), d = ri(15, 30), H = ri(2, 6);
      var x = d, t = x / (u * Math.cos(th * R)), y = u * Math.sin(th * R) * t - 4.9 * t * t;
      return Q('A ball is kicked at ' + u + ' m s⁻¹ at ' + th + '° towards a wall ' + H + ' m high and ' + d + ' m away.', [
        ['Find the height of the ball when it reaches the wall.', 3, sf3(y) + ' m'],
        ['Does it clear the wall? By how much?', 1, y > H ? 'Yes, by ' + sf3(y - H) + ' m' : 'No'],
        ['State one modelling assumption.', 1, 'The ball is a particle; no air resistance']
      ]);
    },
    function () {
      var u = ri(10, 25), th = pick([30, 45, 60]);
      var tn = Math.tan(th * R), k = gr / (2 * u * u * Math.pow(Math.cos(th * R), 2));
      return Q('A projectile has initial speed ' + u + ' m s⁻¹ at ' + th + '°.', [
        ['Find the equation of the trajectory.', 3, M('y = ' + (sf3(tn) === '1' ? '' : sf3(tn)) + 'x - ' + sf3(k) + 'x^2')],
        ['Explain why the path is a parabola.', 1, M('y') + ' is a quadratic in ' + M('x')],
        ['Find ' + M('x') + ' where it returns to ground level.', 1, sf3(tn / k) + ' m']
      ]);
    },
    function () {
      var th = pick([20, 30, 35]), u = ri(15, 25);
      var r1 = u * u * Math.sin(2 * th * R) / gr, h1 = Math.pow(u * Math.sin(th * R), 2) / (2 * gr), h2 = Math.pow(u * Math.cos(th * R), 2) / (2 * gr);
      return Q('Two balls are projected at ' + u + ' m s⁻¹, at ' + th + '° and ' + (90 - th) + '°.', [
        ['Show that they have the same range, and find it.', 2, sf3(r1) + ' m'],
        ['Compare their greatest heights and times of flight.', 2, sf3(h1) + ' m vs ' + sf3(h2) + ' m; the steeper is in the air longer'],
        ['Which would you choose to hit a target quickly? Explain.', 1, 'The lower angle: shorter time of flight']
      ]);
    },
    function () {
      var d = ri(10, 30), H = ri(3, 10);
      var umin = Math.sqrt(gr * (H + Math.sqrt(H * H + d * d)));
      return Q('A ball is to be thrown from ground level over a wall of height ' + H + ' m at a horizontal distance ' + d + ' m.', [
        ['Explain why the minimum speed corresponds to the wall top being on the path of greatest range.', 2, 'The set of reachable points is bounded by a curve; the minimum speed just reaches the wall top'],
        ['The minimum speed is ' + M('\\sqrt{g(H + \\sqrt{H^2 + d^2})}') + '. Find it.', 1, sf3(umin) + ' m s⁻¹'],
        ['Check that at this speed, ' + M('u^2 > gd') + ' and explain.', 1, 'Yes: reaching height needs more than the speed for range ' + d + ' alone']
      ]);
    }
  ]);

  X('a2-statics', [
    function () {
      var L = ri(4, 8), W = ri(100, 300), al = pick([50, 60, 65, 70]);
      var mu = 1 / (2 * Math.tan(al * R));
      return Q('A uniform ladder of length ' + L + ' m and weight ' + W + ' N rests against a smooth wall at ' + al + '° to the horizontal, on rough ground.', [
        ['Find the reaction at the wall.', 3, sf3(W / (2 * Math.tan(al * R))) + ' N'],
        ['Find the least coefficient of friction for equilibrium.', 2, sf3(mu)],
        ['Explain why a ladder is safer at a steeper angle.', 1, 'Less friction is needed: ' + M('\\mu \\ge \\frac{1}{2\\tan\\alpha}')]
      ]);
    },
    function () {
      var m = ri(2, 8), al = pick([20, 30, 40]);
      return Q('A particle of mass ' + m + ' kg rests on a smooth plane inclined at ' + al + '°, held by a horizontal force ' + M('P') + '.', [
        ['Find ' + M('P') + '.', 3, sf3(m * gr * Math.tan(al * R)) + ' N'],
        ['Find the normal reaction.', 2, sf3(m * gr / Math.cos(al * R)) + ' N'],
        ['Explain why the reaction is larger than the weight.', 1, M('P') + ' also presses the particle into the plane']
      ]);
    },
    function () {
      var W = ri(20, 80), a = pick([30, 40, 45]), b = pick([50, 60]);
      var T1 = W * Math.cos(b * R) / Math.sin((a + b) * R), T2 = W * Math.cos(a * R) / Math.sin((a + b) * R);
      return Q('A weight of ' + W + ' N hangs from two strings making angles of ' + a + '° and ' + b + '° with the horizontal.', [
        ['Resolve horizontally and vertically.', 2, M('T_1\\cos ' + a + '° = T_2\\cos ' + b + '°') + ', ' + M('T_1\\sin ' + a + '° + T_2\\sin ' + b + '° = ' + W)],
        ['Find both tensions.', 3, sf3(T1) + ' N and ' + sf3(T2) + ' N'],
        ['Which string has the greater tension? Explain.', 1, 'The steeper one (' + b + '°): it supports more of the weight']
      ]);
    },
    function () {
      var L = ri(2, 5), W = ri(50, 150), th = pick([30, 40, 45]);
      var T = W / (2 * Math.sin(th * R)), H = T * Math.cos(th * R), Vv = W - T * Math.sin(th * R);
      return Q('A uniform rod of length ' + L + ' m and weight ' + W + ' N is hinged to a wall and held horizontal by a string from its far end to the wall, at ' + th + '° to the rod.', [
        ['Find the tension.', 3, sf3(T) + ' N'],
        ['Find the horizontal and vertical components of the hinge force.', 2, sf3(H) + ' N and ' + sf3(Vv) + ' N'],
        ['Find the magnitude and direction of the hinge force.', 2, sf3(Math.hypot(H, Vv)) + ' N at ' + deg(Math.atan(Vv / H) / R) + ' to the horizontal']
      ]);
    },
    function () {
      var L = 5, W = ri(100, 200), P = ri(500, 800), al = pick([60, 65, 70]), mu = pick([0.3, 0.4]);
      var x = (mu * (W + P) * L * Math.sin(al * R) - W * (L / 2) * Math.cos(al * R)) / (P * Math.cos(al * R));
      return Q('A uniform ladder 5 m long, weight ' + W + ' N, rests at ' + al + '° to rough ground ' + M('(\\mu = ' + mu + ')') + ' against a smooth wall. A person of weight ' + P + ' N climbs it.', [
        ['Find how far up the ladder the person can climb before it slips.', 4, x >= L ? 'To the top: it never slips' : sf3(Math.max(0, x)) + ' m'],
        ['Suggest one way to make the ladder safer.', 1, 'Steeper angle, or a rougher surface']
      ]);
    },
    function () {
      var m = ri(2, 6), al = 30, mu = pick([0.2, 0.3]), th = pick([10, 20]);
      var W = m * gr, s = Math.sin(al * R), c = Math.cos(al * R);
      var Pup = W * (s + mu * c) / (Math.cos(th * R) + mu * Math.sin(th * R));
      return Q('A block of mass ' + m + ' kg on a rough plane inclined at 30° ' + M('(\\mu = ' + mu + ')') + ' is pulled by a force ' + M('P') + ' at ' + th + '° above the line of greatest slope.', [
        ['Find the value of ' + M('P') + ' for which the block is about to move up the plane.', 4, sf3(Pup) + ' N'],
        ['Explain why angling ' + M('P') + ' upwards reduces the force needed.', 1, 'It reduces the normal reaction and hence friction, at a small cost to the component along the slope']
      ]);
    },
    function () {
      var f = [[ri(1, 6), ri(-3, 3)], [ri(-5, -1), ri(1, 5)], [ri(-2, 3), ri(-6, -1)]];
      var R = [f[0][0] + f[1][0] + f[2][0], f[0][1] + f[1][1] + f[2][1]];
      return Q('Three forces ' + f.map(function (v) { return M(vij(v[0], v[1])); }).join(', ') + ' (N) act on a particle.', [
        ['Find the resultant.', 1, M(vij(R[0], R[1]))],
        ['Find the fourth force needed for equilibrium, with magnitude and direction.', 3, M(vij(-R[0], -R[1])) + ', ' + sf3(Math.hypot(R[0], R[1])) + ' N'],
        ['Explain why the fourth force does not depend on the order the forces are added.', 1, 'Vector addition is commutative']
      ]);
    },
    function () {
      var W = ri(50, 150), d = ri(1, 3), L = ri(4, 6);
      return Q('A uniform beam of length ' + L + ' m and weight ' + W + ' N rests on a smooth peg ' + d + ' m from its upper end, with its lower end on rough ground. The beam is inclined at 30°.', [
        ['Explain why the peg reaction is perpendicular to the beam.', 1, 'The peg is smooth'],
        ['Find the peg reaction by taking moments about the end on the ground.', 3, sf3(W * (L / 2) * Math.cos(30 * R) / (L - d)) + ' N'],
        ['Find the least coefficient of friction at the ground.', 3, (function () { var S = W * (L / 2) * Math.cos(30 * R) / (L - d); var H = S * Math.sin(30 * R), Vv = W - S * Math.cos(30 * R); return sf3(H / Vv); })()]
      ]);
    },
    function () {
      var W = ri(100, 400), a = pick([20, 30, 40]);
      var T = W / (2 * Math.sin(a * R));
      return Q('A sign of weight ' + W + ' N hangs from the middle of a cable fixed at two points at the same height. Each half makes ' + a + '° with the horizontal.', [
        ['Find the tension.', 2, sf3(T) + ' N'],
        ['Explain what happens to the tension as the cable is pulled tighter.', 1, 'The angle decreases and the tension increases'],
        ['Explain why the cable can never be perfectly horizontal.', 1, 'The tension would need to be infinite']
      ]);
    },
    function () {
      var m = ri(2, 6), P = ri(10, 30), th = pick([20, 30, 40]);
      var Rn = m * gr - P * Math.sin(th * R), Fh = P * Math.cos(th * R);
      return Q('A box of mass ' + m + ' kg rests on rough ground, pulled by ' + P + ' N at ' + th + '° above the horizontal, on the point of moving.', [
        ['Find the friction and normal reaction.', 3, sf3(Fh) + ' N and ' + sf3(Rn) + ' N'],
        ['Find ' + M('\\mu') + '.', 1, sf3(Fh / Rn)],
        ['Find the magnitude of the total contact force.', 1, sf3(Math.hypot(Fh, Rn)) + ' N']
      ]);
    }
  ]);

  X('a2-kinematics', [
    function () {
      var a = ri(1, 3), b = ri(2, 5), c = ri(1, 4), t = ri(1, 3);
      return Q('A particle has position ' + M('\\mathbf{r} = ' + c1(a, 't^2') + '\\mathbf{i} + (' + b + 't - ' + c + ')\\mathbf{j}') + ' m.', [
        ['Find its velocity and acceleration.', 2, M('\\mathbf{v} = ' + vij(2 * a, b).replace(c1(2 * a, '\\mathbf{i}'), c1(2 * a, 't\\mathbf{i}'))) + ', ' + M('\\mathbf{a} = ' + c1(2 * a, '\\mathbf{i}'))],
        ['Find its speed at ' + M('t = ' + t) + '.', 1, sf3(Math.hypot(2 * a * t, b)) + ' m s⁻¹'],
        ['Find when it is moving at 45° to ' + M('\\mathbf{i}') + '.', 2, M('t = ' + F(b, 2 * a))]
      ]);
    },
    function () {
      var ax = nz(-2, 2), ay = nz(-3, 3), ux = ri(1, 4), uy = ri(-3, 3), x0 = ri(-5, 0), y0 = ri(1, 6);
      var tE = function () { var A = ay / 2, B = uy, Cc = y0; if (Math.abs(A) < 1e-9) return -Cc / B; var D = B * B - 4 * A * Cc; if (D < 0) return null; var t1 = (-B + Math.sqrt(D)) / (2 * A), t2 = (-B - Math.sqrt(D)) / (2 * A); var c = [t1, t2].filter(function (v) { return v > 0; }).sort(function (p, q) { return p - q; }); return c.length ? c[0] : null; }();
      return Q('A particle starts at ' + M(vij(x0, y0)) + ' with velocity ' + M(vij(ux, uy)) + ' and constant acceleration ' + M(vij(ax, ay)) + '.', [
        ['Find its position at time ' + M('t') + '.', 2, M('\\mathbf{r} = (' + tp(x0, ux, ax) + ')\\mathbf{i} + (' + tp(y0, uy, ay) + ')\\mathbf{j}')],
        ['Find when it is due east of the origin (on the ' + M('x') + '-axis), if ever.', 3, tE === null ? 'Never' : M('t = ' + sf3(tE))]
      ]);
    },
    function () {
      var p = ri(1, 3);
      return Q('A particle has velocity ' + M('\\mathbf{v} = (3t^2 - ' + 6 * p + 't)\\mathbf{i} + (2t + 1)\\mathbf{j}') + '.', [
        ['Find when it is moving parallel to ' + M('\\mathbf{j}') + '.', 2, M('t = ' + 2 * p) + ' (and ' + M('t = 0') + ')'],
        ['Find its acceleration at that time.', 2, M(vij(6 * 2 * p - 6 * p, 2))],
        ['Find its displacement from ' + M('t = 0') + ' to ' + M('t = ' + 2 * p) + '.', 2, M(vij(8 * p * p * p - 12 * p * p * p, 4 * p * p + 2 * p))]
      ]);
    },
    function () {
      var a = ri(1, 3), b = ri(2, 5), T = ri(2, 4);
      var p0 = [0, 0], q0 = [a * T * T - 0, (b - a) * T];
      return Q('Particle ' + M('P') + ' has ' + M('\\mathbf{r}_P = ' + c1(a, 't^2') + '\\mathbf{i} + ' + c1(b, 't') + '\\mathbf{j}') + ' and particle ' + M('Q') + ' has ' + M('\\mathbf{r}_Q = ' + a * T + 't\\mathbf{i} + (' + (b - a) * T + ' + ' + c1(a, 't') + ')\\mathbf{j}') + '.', [
        ['Show that they collide, and find when.', 3, M('t = ' + T)],
        ['Find where they collide.', 1, M(vij(a * T * T, b * T))],
        ['Find their speeds at the collision.', 2, sf3(Math.hypot(2 * a * T, b)) + ' and ' + sf3(Math.hypot(a * T, a)) + ' m s⁻¹']
      ]);
    },
    function () {
      var m = ri(2, 5), k = ri(1, 3);
      return Q('A particle of mass ' + m + ' kg starts from rest at the origin under the force ' + M('\\mathbf{F} = ' + 6 * k + 't\\mathbf{i} + ' + 2 * m + '\\mathbf{j}') + ' N.', [
        ['Find the acceleration.', 1, M(F(6 * k, m) + 't\\mathbf{i} + 2\\mathbf{j}')],
        ['Find the velocity and position at time ' + M('t') + '.', 3, M('\\mathbf{v} = ' + F(3 * k, m) + 't^2\\mathbf{i} + 2t\\mathbf{j}') + ', ' + M('\\mathbf{r} = ' + F(k, m) + 't^3\\mathbf{i} + t^2\\mathbf{j}')],
        ['Find the speed at ' + M('t = 2') + '.', 1, sf3(Math.hypot(12 * k / m, 4)) + ' m s⁻¹']
      ]);
    },
    function () {
      var r = ri(2, 6), w = pick([1, 2, 3]);
      return Q('A particle has ' + M('\\mathbf{r} = ' + r + '\\cos(' + (w === 1 ? '' : w) + 't)\\mathbf{i} + ' + r + '\\sin(' + (w === 1 ? '' : w) + 't)\\mathbf{j}') + '.', [
        ['Show that it moves in a circle and state the radius.', 1, 'Radius ' + r],
        ['Show that its speed is constant and find it.', 2, r * w + ' m s⁻¹'],
        ['Show that the acceleration is ' + M('-' + w * w + '\\mathbf{r}').replace('-1\\mathbf', '-\\mathbf') + ' and interpret.', 2, 'It points towards the centre']
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(2, 6);
      var tm = b / (2 * a);
      return Q('A particle has ' + M('\\mathbf{r} = (' + b + 't - ' + c1(a, 't^2') + ')\\mathbf{i} + ' + b + '\\mathbf{j}') + '.', [
        ['Find the greatest ' + M('\\mathbf{i}') + '-component of position.', 2, sf3(b * tm - a * tm * tm) + ' at ' + M('t = ' + sf3(tm))],
        ['Find the least distance from the origin.', 2, b + ' (at ' + M('t = 0') + ' and ' + M('t = ' + F(b, a)) + ')'],
        ['Describe the path.', 1, 'Along the line ' + M('y = ' + b) + ', out and back']
      ]);
    },
    function () {
      var vx = nz(-5, 5), vy = nz(-5, 5);
      var brg = (Math.atan2(vx, vy) / R + 360) % 360;
      return Q('A ship has velocity ' + M(vij(vx, vy)) + ' km h⁻¹, with ' + M('\\mathbf{i}') + ' east and ' + M('\\mathbf{j}') + ' north.', [
        ['Find its speed.', 1, sf3(Math.hypot(vx, vy)) + ' km h⁻¹'],
        ['Find the bearing on which it is moving.', 2, sf3(brg) + '°'],
        ['A second ship moves on bearing ' + sf3((brg + 180) % 360) + '°. Describe the relationship between their directions.', 1, 'Opposite directions']
      ]);
    },
    function () {
      var u = ri(10, 20), th = pick([30, 45, 60]);
      var ux = sf3(u * Math.cos(th * R)), uy = sf3(u * Math.sin(th * R));
      return Q('A projectile has ' + M('\\mathbf{r} = \\mathbf{u}t + \\frac{1}{2}\\mathbf{g}t^2') + ' with ' + M('\\mathbf{u} = ' + ux + '\\mathbf{i} + ' + uy + '\\mathbf{j}') + ' and ' + M('\\mathbf{g} = -9.8\\mathbf{j}') + '.', [
        ['Write ' + M('\\mathbf{r}') + ' in component form.', 1, M(ux + 't\\mathbf{i} + (' + uy + 't - 4.9t^2)\\mathbf{j}')],
        ['Find when the velocity is perpendicular to the initial velocity, if ever.', 3, th > 45 ? M('t = ' + sf3(u / (gr * Math.sin(th * R)))) : th === 45 ? M('t = ' + sf3(u / (gr * Math.sin(th * R)))) + ' (at landing)' : 'After landing: ' + M('t = ' + sf3(u / (gr * Math.sin(th * R))))]
      ]);
    },
    function () {
      var a = ri(1, 3), v1 = [ri(1, 5), ri(1, 5)], r0 = [ri(-3, 3), ri(-3, 3)];
      return Q('A particle has acceleration ' + M('\\mathbf{a} = ' + 6 * a + 't\\mathbf{i} - 2\\mathbf{j}') + '. At ' + M('t = 1') + ', ' + M('\\mathbf{v} = ' + vij(v1[0], v1[1])) + '.', [
        ['Find ' + M('\\mathbf{v}') + ' at time ' + M('t') + '.', 3, M('(' + c1(3 * a, 't^2') + S(v1[0] - 3 * a) + ')\\mathbf{i} + (' + (v1[1] + 2) + ' - 2t)\\mathbf{j}').replace(' + 0)', ')').replace(' - 0)', ')')],
        ['Find when the particle is moving parallel to ' + M('\\mathbf{i}') + '.', 1, M('t = ' + F(v1[1] + 2, 2))],
        ['Explain why two conditions are needed to find position from acceleration.', 1, 'Two integrations give two constants']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
