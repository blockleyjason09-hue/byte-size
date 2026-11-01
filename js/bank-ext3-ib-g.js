/* Byte Size Classroom — deeper extension questions (set 3, IB AI HL part g): vectors and lines, vector kinematics, scalar and vector products, graph theory. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function v3(a) { return '\\begin{pmatrix}' + a.join('\\\\') + '\\end{pmatrix}'; }
  function v2(a) { return '\\begin{pmatrix}' + a[0] + '\\\\' + a[1] + '\\end{pmatrix}'; }
  function add(a, b, k) { k = k === undefined ? 1 : k; return a.map(function (x, i) { return x + k * b[i]; }); }
  function dot(a, b) { return a.reduce(function (s, x, i) { return s + x * b[i]; }, 0); }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function len(a) { return Math.sqrt(dot(a, a)); }
  function rv(lo, hi) { return [nz(lo, hi), nz(lo, hi), nz(lo, hi)]; }
  var DEG = 180 / Math.PI;
  function ang(a, b) { return Math.acos(Math.max(-1, Math.min(1, dot(a, b) / (len(a) * len(b))))) * DEG; }

  X('ib-vectors', [
    function () {
      var A = rv(-4, 4), d = rv(-3, 3), t = nz(-3, 3), B = add(A, d, t);
      return Q('A line passes through ' + M('A' + '(' + A.join(', ') + ')') + ' and ' + M('B(' + B.join(', ') + ')') + '.', [
        ['Find a vector equation of the line.', 2, M('\\mathbf{r} = ' + v3(A) + ' + \\lambda' + v3(d)) + ' (or equivalent)'],
        ['Does the point ' + M('(' + add(A, d, 2 * t).join(', ') + ')') + ' lie on the line? Show working.', 2, 'Yes: ' + M('\\lambda = ' + 2 * t)],
        ['Find the point where the line crosses the plane ' + M('z = 0') + ', if it does.', 2, d[2] && A[2] % d[2] === 0 ? M('(' + add(A, d, -A[2] / d[2]).join(', ') + ')') : (d[2] ? M('\\lambda = ' + F(-A[2], d[2])) + ': ' + M('(' + add(A, d, -A[2] / d[2]).map(sf3).join(', ') + ')') : 'It is parallel to that plane')]
      ]);
    },
    function () {
      var a = rv(-3, 3), b; do { b = rv(-3, 3); } while (cross(a, b).every(function (x) { return !x; }));
      return Q(M('\\mathbf{a} = ' + v3(a)) + ' and ' + M('\\mathbf{b} = ' + v3(b)) + '.', [
        ['Find the angle between ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '.', 3, sf3(ang(a, b)) + '°'],
        ['Find ' + M('k') + ' so that ' + M('\\mathbf{a} + k\\mathbf{b}') + ' is perpendicular to ' + M('\\mathbf{b}') + '.', 3, dot(b, b) ? M('k = ' + F(-dot(a, b), dot(b, b))) : '—'],
        ['Interpret ' + M('k\\mathbf{b}') + ' geometrically.', 1, 'Minus the projection of ' + M('\\mathbf{a}') + ' onto ' + M('\\mathbf{b}')]
      ]);
    },
    function () {
      var P = rv(-3, 3), d1 = rv(-2, 2), d2; do { d2 = rv(-2, 2); } while (cross(d1, d2).every(function (x) { return x === 0; }));
      var s = nz(-2, 2), t = nz(-2, 2), A = add(P, d1, -s), B = add(P, d2, -t);
      return Q('Lines ' + M('L_1: \\mathbf{r} = ' + v3(A) + ' + s' + v3(d1)) + ' and ' + M('L_2: \\mathbf{r} = ' + v3(B) + ' + t' + v3(d2)) + '.', [
        ['Show that the lines intersect and find the point.', 4, M('s = ' + s + ',\\ t = ' + t) + '; ' + M('(' + P.join(', ') + ')')],
        ['Find the acute angle between the lines.', 2, sf3(Math.min(ang(d1, d2), 180 - ang(d1, d2))) + '°'],
        ['Explain how you would know if two lines were skew.', 1, 'Not parallel, and the equations have no consistent solution']
      ]);
    },
    function () {
      var A = rv(-4, 4), d = rv(-3, 3), P = add(A, [nz(-3, 3), nz(-3, 3), nz(-3, 3)], 1);
      var AP = add(P, A, -1), t = dot(AP, d) / dot(d, d), foot = add(A, d, t), dist = len(add(P, foot, -1));
      return Q('Find the shortest distance from ' + M('P(' + P.join(', ') + ')') + ' to the line ' + M('\\mathbf{r} = ' + v3(A) + ' + \\lambda' + v3(d)) + '.', [
        ['Explain why the shortest distance is along a perpendicular.', 1, 'Any other route is the hypotenuse of a right-angled triangle'],
        ['Find ' + M('\\lambda') + ' at the foot of the perpendicular.', 3, M('\\lambda = ' + F(dot(AP, d), dot(d, d)))],
        ['Find the distance.', 2, sf3(dist)]
      ]);
    },
    function () {
      var A = rv(-3, 3), B, C; do { B = rv(-3, 3); C = rv(-3, 3); } while (cross(add(B, A, -1), add(C, A, -1)).every(function (x) { return !x; }));
      return Q('Triangle ' + M('ABC') + ' has ' + M('A(' + A.join(', ') + ')') + ', ' + M('B(' + B.join(', ') + ')') + ', ' + M('C(' + C.join(', ') + ')') + '.', [
        ['Find ' + M('\\vec{AB}') + ' and ' + M('\\vec{AC}') + '.', 1, M(v3(add(B, A, -1))) + ', ' + M(v3(add(C, A, -1)))],
        ['Find angle ' + M('BAC') + '.', 2, sf3(ang(add(B, A, -1), add(C, A, -1))) + '°'],
        ['Find the area of the triangle.', 2, sf3(len(cross(add(B, A, -1), add(C, A, -1))) / 2)]
      ]);
    },
    function () {
      var A = rv(-3, 3), B, m = ri(1, 3), n = ri(1, 3); do { B = rv(-3, 3); } while (len(add(B, A, -1)) === 0);
      var Pp = A.map(function (x, i) { return (n * x + m * B[i]) / (m + n); });
      return Q('Points ' + M('A(' + A.join(', ') + ')') + ' and ' + M('B(' + B.join(', ') + ')') + ' are given.', [
        ['Find the point ' + M('P') + ' dividing ' + M('AB') + ' in the ratio ' + m + ' : ' + n + '.', 2, M('(' + Pp.map(function (x, i) { return F(n * A[i] + m * B[i], m + n); }).join(', ') + ')')],
        ['Find the length ' + M('AB') + '.', 1, sf3(len(add(B, A, -1)))],
        ['Find the unit vector in the direction ' + M('\\vec{AB}') + '.', 2, M(v3(add(B, A, -1).map(function (x) { return sf3(x / len(add(B, A, -1))); })))]
      ]);
    },
    function () {
      var d1 = rv(-3, 3), k = nz(-2, 2), d2 = d1.map(function (x) { return k * x; }), A = rv(-3, 3), B = add(A, [1, 0, 0], 1);
      return Q('Lines ' + M('\\mathbf{r} = ' + v3(A) + ' + s' + v3(d1)) + ' and ' + M('\\mathbf{r} = ' + v3(B) + ' + t' + v3(d2)) + '.', [
        ['Show that the lines are parallel.', 1, 'The second direction is ' + k + ' times the first'],
        ['Determine whether they are the same line.', 2, (function () { var c = cross([1, 0, 0], d1); return c.every(function (x) { return x === 0; }) ? 'Yes' : 'No: ' + M('\\vec{AB} = ' + v3([1, 0, 0])) + ' is not parallel to the direction'; })()],
        ['Find the distance between them.', 2, sf3(len(cross([1, 0, 0], d1)) / len(d1))]
      ]);
    },
    function () {
      var d = rv(-3, 3), u = [1, 0, 0];
      return Q('A line has direction ' + M(v3(d)) + '.', [
        ['Find the angles it makes with the ' + M('x') + '-, ' + M('y') + '- and ' + M('z') + '-axes.', 3, [0, 1, 2].map(function (i) { return sf3(Math.acos(d[i] / len(d)) * DEG) + '°'; }).join(', ')],
        ['Show that the squares of the cosines of these angles add to 1.', 2, M('\\frac{' + d[0] * d[0] + ' + ' + d[1] * d[1] + ' + ' + d[2] * d[2] + '}{' + dot(d, d) + '} = 1')]
      ]);
    },
    function () {
      var p = [ri(0, 5), ri(0, 5), 0], q = [ri(0, 5), ri(0, 5), ri(3, 8)];
      return Q('A drone flies in a straight line from ' + M('(' + p.join(', ') + ')') + ' to ' + M('(' + q.join(', ') + ')') + ' (metres).', [
        ['Find the distance flown.', 2, sf3(len(add(q, p, -1)))],
        ['Find the angle of climb (between the path and the horizontal).', 2, sf3(Math.asin(q[2] / len(add(q, p, -1))) * DEG) + '°'],
        ['Find the point on the path at height 2 m.', 2, M('(' + add(p, add(q, p, -1), 2 / q[2]).map(sf3).join(', ') + ')')]
      ]);
    },
    function () {
      var a = rv(-3, 3), b = rv(-3, 3);
      var s = add(a, b), dd = add(a, b, -1);
      return Q(M('\\mathbf{a} = ' + v3(a)) + ', ' + M('\\mathbf{b} = ' + v3(b)) + '.', [
        ['Find ' + M('|\\mathbf{a} + \\mathbf{b}|') + ' and ' + M('|\\mathbf{a} - \\mathbf{b}|') + '.', 2, sf3(len(s)) + ' and ' + sf3(len(dd))],
        ['Show that ' + M('|\\mathbf{a} + \\mathbf{b}|^2 - |\\mathbf{a} - \\mathbf{b}|^2 = 4\\mathbf{a}\\cdot\\mathbf{b}') + ' for these vectors.', 2, (dot(s, s) - dot(dd, dd)) + ' = 4 × ' + dot(a, b)],
        ['When are the diagonals of a parallelogram equal?', 1, 'When ' + M('\\mathbf{a}\\cdot\\mathbf{b} = 0') + ': it is a rectangle']
      ]);
    }
  ]);

  X('ib-vec-kinematics', [
    function () {
      var r0 = [nz(-8, 8), nz(-8, 8)], v = [nz(-3, 3), nz(-3, 3)], T = ri(2, 5);
      return Q('A ship has position ' + M('\\mathbf{r} = ' + v2(r0) + ' + t' + v2(v)) + ' km after ' + M('t') + ' hours.', [
        ['Find its speed and its position after ' + T + ' hours.', 2, sf3(len(v)) + ' km/h; ' + M(v2(add(r0, v, T)))],
        ['Find the time when it is closest to the origin.', 3, M('t = ' + F(-dot(r0, v), dot(v, v)))],
        ['Find the closest distance.', 2, sf3(Math.abs(r0[0] * v[1] - r0[1] * v[0]) / len(v)) + ' km']
      ]);
    },
    function () {
      var a0 = [0, 0], va = [ri(1, 4), ri(1, 4)], t = ri(2, 4), vb = [nz(-4, 4), nz(-4, 4)];
      var meet = add(a0, va, t), b0 = add(meet, vb, -t);
      return Q('Ship A starts at the origin with velocity ' + M(v2(va)) + ' km/h. Ship B starts at ' + M(v2(b0)) + ' with velocity ' + M(v2(vb)) + ' km/h.', [
        ['Find the position vector of each after ' + M('t') + ' hours.', 2, M(v2(['' + va[0] + 't', '' + va[1] + 't'])) + '; ' + M(v2(b0) + ' + t' + v2(vb))],
        ['Show that they collide, and find when and where.', 3, M('t = ' + t) + ' at ' + M(v2(meet))],
        ['Find the velocity of B relative to A.', 1, M(v2(add(vb, va, -1)))]
      ]);
    },
    function () {
      var u = ri(10, 30), ang0 = pick([30, 45, 60]);
      var ux = u * Math.cos(ang0 / DEG), uy = u * Math.sin(ang0 / DEG), T = 2 * uy / 9.8;
      return Q('A ball has velocity ' + M('\\mathbf{v} = ' + v2([sf3(ux), sf3(uy) + ' - 9.8t'])) + ' m/s, starting at the origin.', [
        ['Find its position vector at time ' + M('t') + '.', 2, M(v2([sf3(ux) + 't', sf3(uy) + 't - 4.9t^2']))],
        ['Find when it lands and how far it has travelled horizontally.', 3, sf3(T) + ' s, ' + sf3(ux * T) + ' m'],
        ['Find its speed at the highest point.', 1, sf3(ux) + ' m/s']
      ]);
    },
    function () {
      var w = pick([0.5, 1, 2]), r = ri(2, 6);
      return Q('A particle moves with ' + M('\\mathbf{r} = ' + v2([r + '\\cos(' + w + 't)', r + '\\sin(' + w + 't)']).replace(/\(1t\)/g, '(t)')) + '.', [
        ['Describe the path.', 1, 'A circle, centre the origin, radius ' + r],
        ['Find the velocity and show the speed is constant.', 3, 'Speed ' + sf3(r * w)],
        ['Show that the velocity is always perpendicular to the position vector.', 2, 'Their scalar product is 0']
      ]);
    },
    function () {
      var r0 = [ri(-5, 0), ri(-5, 0)], v = [ri(1, 4), ri(1, 4)], L = ri(1, 3);
      var tc = -dot(r0, v) / dot(v, v), dmin = Math.abs(r0[0] * v[1] - r0[1] * v[0]) / len(v);
      return Q('A boat moves with ' + M('\\mathbf{r} = ' + v2(r0) + ' + t' + v2(v)) + ' km. A lighthouse at the origin can be seen within ' + L + ' km.', [
        ['Find the closest approach to the lighthouse.', 3, sf3(dmin) + ' km at ' + M('t = ' + sf3(tc))],
        ['Is the lighthouse ever visible?', 1, dmin <= L ? 'Yes' : 'No'],
        ['If visible, find for how long.', 2, dmin <= L ? sf3(2 * Math.sqrt(L * L - dmin * dmin) / len(v)) + ' hours' : 'Not visible']
      ]);
    },
    function () {
      var a = [nz(-2, 2), nz(-2, 2)], v0 = [nz(-3, 3), nz(-3, 3)], T = ri(2, 4);
      return Q('A particle has constant acceleration ' + M(v2(a)) + ' m/s² and initial velocity ' + M(v2(v0)) + ' m/s from the origin.', [
        ['Find the velocity at time ' + M('t') + '.', 1, M(v2([v0[0] + (a[0] < 0 ? ' - ' + (-a[0]) : ' + ' + a[0]) + 't', v0[1] + (a[1] < 0 ? ' - ' + (-a[1]) : ' + ' + a[1]) + 't']))],
        ['Find the position after ' + T + ' s.', 2, M(v2(add(v0.map(function (x) { return x * T; }), a, T * T / 2).map(sf3)))],
        ['Find the speed after ' + T + ' s.', 1, sf3(len(add(v0, a, T)))]
      ]);
    },
    function () {
      var c = ri(1, 3), vb = c + ri(2, 4), w = ri(40, 100);
      return Q('A river flows east at ' + c + ' m/s. A swimmer can swim at ' + vb + ' m/s relative to the water and wants to cross a ' + w + ' m wide river.', [
        ['If she swims due north (relative to the water), find her resultant velocity and where she lands.', 3, M(v2([c, vb])) + '; ' + sf3(c * w / vb) + ' m downstream'],
        ['Find the direction she should swim to land directly opposite.', 2, sf3(Math.asin(c / vb) * DEG) + '° west of north'],
        ['Find the time taken in each case.', 2, sf3(w / vb) + ' s and ' + sf3(w / Math.sqrt(vb * vb - c * c)) + ' s']
      ]);
    },
    function () {
      var r0 = [ri(-6, 6), ri(-6, 6)], v = [nz(-3, 3), nz(-3, 3)];
      return Q('A particle moves with ' + M('\\mathbf{r} = ' + v2(r0) + ' + t' + v2(v)) + '.', [
        ['Find the Cartesian equation of its path.', 3, (function () { var m = F(v[1], v[0]), L = r0[1] ? 'y' + (r0[1] < 0 ? ' + ' + (-r0[1]) : ' - ' + r0[1]) : 'y', R = (m === '1' ? '' : m === '-1' ? '-' : m) + (r0[0] ? '(x' + (r0[0] < 0 ? ' + ' + (-r0[0]) : ' - ' + r0[0]) + ')' : 'x'); return M(L + ' = ' + R); })()],
        ['Find when it crosses the ' + M('x') + '-axis.', 1, M('t = ' + F(-r0[1], v[1]))],
        ['Explain why the Cartesian equation loses information.', 1, 'It shows the path but not when or how fast the particle travels']
      ]);
    },
    function () {
      var u = ri(10, 20), h = ri(5, 20);
      return Q('A stone is thrown horizontally at ' + u + ' m/s from the top of a ' + h + ' m cliff. Take ' + M('\\mathbf{r} = ' + v2(['0', h])) + ' at ' + M('t = 0') + '.', [
        ['Write the position vector at time ' + M('t') + '.', 2, M(v2([u + 't', h + ' - 4.9t^2']))],
        ['Find when and where it lands.', 3, sf3(Math.sqrt(h / 4.9)) + ' s, ' + sf3(u * Math.sqrt(h / 4.9)) + ' m from the cliff'],
        ['Find the angle at which it hits the ground.', 2, sf3(Math.atan(9.8 * Math.sqrt(h / 4.9) / u) * DEG) + '° below the horizontal']
      ]);
    },
    function () {
      var a = [ri(0, 3), ri(0, 3)], va = [ri(1, 3), ri(-1, 2)], b = [ri(5, 8), ri(-2, 2)], vb = [ri(-2, 0), ri(1, 3)];
      var dr = add(a, b, -1), dv = add(va, vb, -1);
      var tc = dot(dv, dv) ? Math.max(0, -dot(dr, dv) / dot(dv, dv)) : 0, dm = len(add(dr, dv, tc));
      return Q('Two drones have ' + M('\\mathbf{r}_A = ' + v2(a) + ' + t' + v2(va)) + ' and ' + M('\\mathbf{r}_B = ' + v2(b) + ' + t' + v2(vb)) + ' (m, s).', [
        ['Find the vector from B to A at time ' + M('t') + '.', 2, M(v2(dr) + ' + t' + v2(dv))],
        ['Find the time of closest approach (for ' + M('t \\ge 0') + ').', 3, sf3(tc) + ' s'],
        ['Find the minimum distance.', 1, sf3(dm) + ' m']
      ]);
    }
  ]);

  X('ib-vec-product', [
    function () {
      var a = rv(-3, 3), b = rv(-3, 3);
      return Q(M('\\mathbf{a} = ' + v3(a)) + ' and ' + M('\\mathbf{b} = ' + v3(b)) + '.', [
        ['Find ' + M('\\mathbf{a} \\times \\mathbf{b}') + '.', 2, M(v3(cross(a, b)))],
        ['Verify that it is perpendicular to both ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '.', 2, 'Both scalar products are 0'],
        ['Find the area of the parallelogram with sides ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '.', 1, sf3(len(cross(a, b)))]
      ]);
    },
    function () {
      var a = rv(-3, 3), b = rv(-3, 3);
      return Q('Using ' + M('\\mathbf{a} = ' + v3(a)) + ' and ' + M('\\mathbf{b} = ' + v3(b)) + ':', [
        ['Find ' + M('\\mathbf{a}\\cdot\\mathbf{b}') + ' and ' + M('|\\mathbf{a} \\times \\mathbf{b}|') + '.', 2, dot(a, b) + ' and ' + sf3(len(cross(a, b)))],
        ['Show that ' + M('(\\mathbf{a}\\cdot\\mathbf{b})^2 + |\\mathbf{a}\\times\\mathbf{b}|^2 = |\\mathbf{a}|^2|\\mathbf{b}|^2') + '.', 2, (dot(a, b) * dot(a, b) + dot(cross(a, b), cross(a, b))) + ' = ' + dot(a, a) + ' × ' + dot(b, b)],
        ['Explain this identity using ' + M('\\cos\\theta') + ' and ' + M('\\sin\\theta') + '.', 1, M('\\cos^2\\theta + \\sin^2\\theta = 1')]
      ]);
    },
    function () {
      var a = rv(-3, 3), b = rv(-3, 3);
      var n = cross(a, b); if (n.every(function (x) { return !x; })) { b = [1, 0, 0]; a = [0, 1, 0]; n = cross(a, b); }
      return Q('Show that ' + M('\\mathbf{b} \\times \\mathbf{a} = -(\\mathbf{a} \\times \\mathbf{b})') + ' for ' + M('\\mathbf{a} = ' + v3(a)) + ', ' + M('\\mathbf{b} = ' + v3(b)) + '.', [
        ['Find both products.', 2, M(v3(n)) + ' and ' + M(v3(n.map(function (x) { return -x; })))],
        ['Explain geometrically using the right-hand rule.', 1, 'Swapping the order reverses the direction of the normal'],
        ['What is ' + M('\\mathbf{a} \\times \\mathbf{a}') + '? Explain.', 1, M('\\mathbf{0}') + ': the angle between them is 0']
      ]);
    },
    function () {
      var A = rv(-3, 3), B = rv(-3, 3), C = rv(-3, 3);
      var n = cross(add(B, A, -1), add(C, A, -1));
      return Q('A plane passes through ' + M('A(' + A.join(', ') + ')') + ', ' + M('B(' + B.join(', ') + ')') + ' and ' + M('C(' + C.join(', ') + ')') + '.', [
        ['Find a normal vector to the plane.', 3, M(v3(n))],
        ['Find the area of triangle ' + M('ABC') + '.', 1, sf3(len(n) / 2)],
        ['Explain what it means if the normal vector is ' + M('\\mathbf{0}') + '.', 1, 'The points are collinear']
      ]);
    },
    function () {
      var a = rv(-3, 3), b = rv(-3, 3), c = rv(-3, 3);
      var vol = Math.abs(dot(a, cross(b, c)));
      return Q('A parallelepiped has edges ' + M('\\mathbf{a} = ' + v3(a)) + ', ' + M('\\mathbf{b} = ' + v3(b)) + ', ' + M('\\mathbf{c} = ' + v3(c)) + '.', [
        ['Find ' + M('\\mathbf{b} \\times \\mathbf{c}') + '.', 2, M(v3(cross(b, c)))],
        ['Find its volume, ' + M('|\\mathbf{a}\\cdot(\\mathbf{b}\\times\\mathbf{c})|') + '.', 2, vol],
        ['What does a volume of 0 tell you about the three vectors?', 1, 'They lie in one plane']
      ]);
    },
    function () {
      var F0 = [nz(-5, 5), nz(-5, 5), 0], r = [nz(-3, 3), nz(-3, 3), 0];
      var T = cross(r, F0);
      return Q('A force ' + M('\\mathbf{F} = ' + v3(F0)) + ' N acts at the point with position vector ' + M('\\mathbf{r} = ' + v3(r)) + ' m.', [
        ['Find the moment ' + M('\\mathbf{r} \\times \\mathbf{F}') + '.', 2, M(v3(T))],
        ['Find its magnitude and explain the direction.', 2, Math.abs(T[2]) + ' N m; along the ' + M('z') + '-axis, the axis of rotation'],
        ['Find a point on the line of action of ' + M('\\mathbf{F}') + ' where the moment is zero, or explain.', 1, 'The moment about the origin is zero only if the line of action passes through the origin']
      ]);
    },
    function () {
      var a = rv(-3, 3), b; do { b = rv(-3, 3); } while (cross(a, b).every(function (x) { return !x; }));
      var th = ang(a, b);
      return Q('For ' + M('\\mathbf{a} = ' + v3(a)) + ' and ' + M('\\mathbf{b} = ' + v3(b)) + ':', [
        ['Find the angle between them using the scalar product.', 2, sf3(th) + '°'],
        ['Find it again using the vector product.', 2, sf3(Math.asin(Math.min(1, len(cross(a, b)) / (len(a) * len(b)))) * DEG) + '° (from ' + M('\\sin\\theta') + ')'],
        ['Explain why the vector product method can be ambiguous.', 1, M('\\sin\\theta') + ' is the same for ' + M('\\theta') + ' and ' + M('180° - \\theta')]
      ]);
    },
    function () {
      var a = rv(-3, 3), k = nz(-2, 2), b = a.map(function (x) { return k * x; });
      return Q(M('\\mathbf{a} = ' + v3(a)) + ' and ' + M('\\mathbf{b} = ' + v3(b)) + '.', [
        ['Find ' + M('\\mathbf{a} \\times \\mathbf{b}') + '.', 1, M('\\mathbf{0}')],
        ['Explain why.', 1, 'The vectors are parallel'],
        ['Find ' + M('\\mathbf{a}\\cdot\\mathbf{b}') + ' and relate it to ' + M('|\\mathbf{a}||\\mathbf{b}|') + '.', 2, dot(a, b) + ' = ' + (k > 0 ? '' : '−') + M('|\\mathbf{a}||\\mathbf{b}|')]
      ]);
    },
    function () {
      var n = rv(-3, 3), P = rv(-3, 3), d = dot(n, P);
      var Q0 = rv(-4, 4), dist = Math.abs(dot(n, Q0) - d) / len(n);
      return Q('A plane has normal ' + M(v3(n)) + ' and passes through ' + M('(' + P.join(', ') + ')') + '.', [
        ['Find its equation in the form ' + M('\\mathbf{r}\\cdot\\mathbf{n} = d') + '.', 2, M('\\mathbf{r}\\cdot' + v3(n) + ' = ' + d)],
        ['Find the distance from ' + M('(' + Q0.join(', ') + ')') + ' to the plane.', 3, sf3(dist)]
      ]);
    },
    function () {
      return Q('Properties of the products.', [
        ['Is the scalar product commutative? The vector product?', 2, 'Scalar: yes; vector: no (it changes sign)'],
        ['Explain why ' + M('\\mathbf{i}\\times\\mathbf{j} = \\mathbf{k}') + ' but ' + M('\\mathbf{j}\\times\\mathbf{i} = -\\mathbf{k}') + '.', 1, 'Right-hand rule: reversing the order reverses the direction'],
        ['Find ' + M('(\\mathbf{i}\\times\\mathbf{j})\\times\\mathbf{j}') + ' and ' + M('\\mathbf{i}\\times(\\mathbf{j}\\times\\mathbf{j})') + '. What does this show?', 2, M('-\\mathbf{i}') + ' and ' + M('\\mathbf{0}') + ': the vector product is not associative']
      ]);
    }
  ]);

  X('ib-graph-theory', [
    function () {
      var d = [ri(1, 4), ri(1, 4), ri(1, 4), ri(1, 4), ri(1, 4)];
      if ((d[0] + d[1] + d[2] + d[3] + d[4]) % 2) d[4]++;
      var odd = d.filter(function (x) { return x % 2; }).length;
      return Q('A connected graph has five vertices with degrees ' + d.join(', ') + '.', [
        ['Find the number of edges, explaining the handshaking lemma.', 2, (d[0] + d[1] + d[2] + d[3] + d[4]) / 2 + ': each edge adds 2 to the total degree'],
        ['Does the graph have an Eulerian circuit, an Eulerian trail, or neither?', 2, odd === 0 ? 'Eulerian circuit (all degrees even)' : odd === 2 ? 'Eulerian trail (exactly two odd vertices)' : 'Neither'],
        ['Explain why a graph can never have an odd number of odd vertices.', 1, 'The total degree is even']
      ]);
    },
    function () {
      var n = ri(4, 7);
      return Q('Consider the complete graph ' + M('K_' + n) + '.', [
        ['How many edges does it have?', 1, n * (n - 1) / 2],
        ['For which values of ' + M('n') + ' does ' + M('K_n') + ' have an Eulerian circuit?', 2, 'Odd ' + M('n') + ' (each vertex has even degree ' + M('n - 1') + ')'],
        ['How many different Hamiltonian cycles does ' + M('K_' + n) + ' have?', 2, M('\\frac{(' + n + ' - 1)!}{2} = ' + (function () { var f = 1; for (var i = 2; i < n; i++) f *= i; return f / 2; })())]
      ]);
    },
    function () {
      var A = [[0, 1, 1, 0], [1, 0, 1, 1], [1, 1, 0, 1], [0, 1, 1, 0]];
      var A2 = A.map(function (r, i) { return A.map(function (_, j) { return r.reduce(function (s, x, k) { return s + x * A[k][j]; }, 0); }); });
      var A3 = A2.map(function (r, i) { return A.map(function (_, j) { return r.reduce(function (s, x, k) { return s + x * A[k][j]; }, 0); }); });
      return Q('A graph has adjacency matrix ' + M('A = \\begin{pmatrix}0&1&1&0\\\\1&0&1&1\\\\1&1&0&1\\\\0&1&1&0\\end{pmatrix}') + ' for vertices P, Q, R, S.', [
        ['Find the degree of each vertex.', 1, '2, 3, 3, 2'],
        ['Use technology to find ' + M('A^2') + ' and ' + M('A^3') + '. How many walks of length 3 are there from P to S?', 3, A3[0][3]],
        ['Explain what the diagonal entries of ' + M('A^2') + ' represent.', 1, 'The degree of each vertex (walks of length 2 back to the start)']
      ]);
    },
    function () {
      var n = ri(5, 10);
      return Q('A tree has ' + n + ' vertices.', [
        ['How many edges does it have? Explain.', 2, (n - 1) + ': each new vertex adds exactly one edge'],
        ['Prove that a tree with at least 2 vertices has at least two vertices of degree 1.', 2, 'The longest path ends at two vertices; any extra edge there would extend the path or make a cycle'],
        ['How many spanning trees does ' + M('K_4') + ' have?', 1, '16']
      ]);
    },
    function () {
      return Q('A graph is planar if it can be drawn without edges crossing.', [
        ['State Euler’s formula for a connected planar graph.', 1, M('v - e + f = 2')],
        ['Check it for a cube’s edges and vertices.', 2, M('8 - 12 + 6 = 2')],
        ['Use ' + M('e \\le 3v - 6') + ' to show ' + M('K_5') + ' is not planar.', 2, M('10 > 3(5) - 6 = 9')]
      ]);
    },
    function () {
      var w = [ri(2, 9), ri(2, 9), ri(2, 9), ri(2, 9), ri(2, 9), ri(2, 9)];
      return Q('A weighted graph has vertices A, B, C, D with edges AB = ' + w[0] + ', AC = ' + w[1] + ', AD = ' + w[2] + ', BC = ' + w[3] + ', BD = ' + w[4] + ', CD = ' + w[5] + '.', [
        ['List all Hamiltonian cycles starting at A (ignoring direction).', 2, 'ABCDA, ABDCA, ACBDA'],
        ['Find the shortest.', 2, (function () { var c = [w[0] + w[3] + w[5] + w[2], w[0] + w[4] + w[5] + w[1], w[1] + w[3] + w[4] + w[2]]; var m = Math.min.apply(null, c); return ['ABCDA', 'ABDCA', 'ACBDA'][c.indexOf(m)] + ', length ' + m; })()],
        ['Explain why checking every cycle is impractical for large graphs.', 1, 'The number of cycles grows factorially']
      ]);
    },
    function () {
      return Q('Bipartite graphs.', [
        ['How many edges does ' + M('K_{3,4}') + ' have?', 1, 12],
        ['Explain why a bipartite graph has no cycles of odd length.', 2, 'Each step alternates sides, so returning to the start takes an even number of steps'],
        ['Does ' + M('K_{3,3}') + ' have an Eulerian circuit?', 1, 'No: every vertex has odd degree 3']
      ]);
    },
    function () {
      var n = ri(5, 9);
      return Q('A simple graph has ' + n + ' vertices.', [
        ['What is the maximum number of edges?', 1, n * (n - 1) / 2],
        ['Prove that two vertices must have the same degree.', 3, 'Degrees range from 0 to ' + (n - 1) + ', but 0 and ' + (n - 1) + ' cannot both occur, leaving ' + (n - 1) + ' values for ' + n + ' vertices'],
        ['What is the minimum number of edges for the graph to be connected?', 1, n - 1]
      ]);
    },
    function () {
      return Q('A transition matrix can be built from a directed graph.', [
        ['For a directed graph where each vertex links to others equally, explain how to form the transition matrix.', 2, 'Each column gives equal probabilities to the vertices it links to'],
        ['Explain how the steady state relates to the importance of each vertex (as in web page ranking).', 2, 'Vertices visited most often in the long run are ranked highest'],
        ['What problem occurs if a vertex has no outgoing edges?', 1, 'The walk gets stuck; the column would be all zeros']
      ]);
    },
    function () {
      var m = ri(3, 6);
      return Q('The cycle graph ' + M('C_' + m) + ' has ' + m + ' vertices in a ring.', [
        ['Is it Eulerian? Hamiltonian?', 2, 'Both: every degree is 2, and the ring visits every vertex'],
        ['How many walks of length 2 start and end at the same vertex?', 1, 2],
        ['Find the number of edges in its complement.', 2, m * (m - 1) / 2 - m]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
