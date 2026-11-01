/* Byte Size Classroom — deeper extension questions (set 3, IB Applications and Interpretation part c): 3D geometry, trigonometry, bearings, arcs and sectors, Voronoi diagrams. Shared between SL and HL where content matches. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function S0(v) { return v ? S(v) : ''; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function cf(f, v) { f = String(f); return f === '1' ? v : f === '-1' ? '-' + v : f + v; }
  function P(x, y) { return '(' + x + ', ' + y + ')'; }
  var R = Math.PI / 180, D = 180 / Math.PI;
  function deg(x) { return sf3(x) + '°'; }
  function brg(dx, dy) { return (Math.atan2(dx, dy) * D + 360) % 360; }

  X(['sl-3d', 'ib-3d'], [
    function () {
      var a = ri(3, 10), b = ri(3, 10), c = ri(2, 8), d = Math.sqrt(a * a + b * b + c * c);
      return Q('A cuboid measures ' + a + ' × ' + b + ' × ' + c + ' cm.', [
        ['Find the length of the space diagonal.', 2, sf3(d) + ' cm'],
        ['Find the angle between the space diagonal and the base.', 2, deg(Math.asin(c / d) * D)],
        ['Find the angle between the space diagonal and a vertical edge.', 1, deg(Math.acos(c / d) * D)]
      ]);
    },
    function () {
      var r = ri(3, 10), h = ri(5, 15), l = Math.hypot(r, h);
      return Q('A cone has radius ' + r + ' cm and height ' + h + ' cm.', [
        ['Find the slant height and the curved surface area.', 2, sf3(l) + ' cm, ' + sf3(Math.PI * r * l) + ' cm²'],
        ['Find the volume.', 1, sf3(Math.PI * r * r * h / 3) + ' cm³'],
        ['Find the angle between the slant edge and the base.', 2, deg(Math.atan(h / r) * D)]
      ]);
    },
    function () {
      var r = ri(3, 8), h = ri(5, 15);
      var V = Math.PI * r * r * h + 2 / 3 * Math.PI * r * r * r, SA = 2 * Math.PI * r * h + 2 * Math.PI * r * r + Math.PI * r * r;
      return Q('A silo is a cylinder of radius ' + r + ' m and height ' + h + ' m, topped by a hemisphere.', [
        ['Find the volume.', 2, sf3(V) + ' m³'],
        ['Find the external surface area, including the base.', 2, sf3(SA) + ' m²'],
        ['Paint costs $4 per m² and the base is not painted. Find the cost.', 1, '$' + (4 * (SA - Math.PI * r * r)).toFixed(2)]
      ]);
    },
    function () {
      var s = ri(4, 12), h = ri(6, 15);
      var half = s / 2, sl = Math.hypot(h, half), edge = Math.hypot(h, s * Math.SQRT2 / 2);
      return Q('A square-based pyramid has base side ' + s + ' m and height ' + h + ' m.', [
        ['Find the slant height of a face and the length of a sloping edge.', 2, sf3(sl) + ' m and ' + sf3(edge) + ' m'],
        ['Find the total surface area.', 2, sf3(s * s + 2 * s * sl) + ' m²'],
        ['Find the angle between a face and the base.', 1, deg(Math.atan(h / half) * D)]
      ]);
    },
    function () {
      var A = [ri(-3, 1), ri(-3, 3), ri(0, 2)], B = [ri(2, 6), ri(-2, 4), ri(3, 8)];
      var d = Math.hypot(B[0] - A[0], B[1] - A[1], B[2] - A[2]), mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2];
      return Q('Points ' + M('A(' + A.join(', ') + ')') + ' and ' + M('B(' + B.join(', ') + ')') + '.', [
        ['Find the distance ' + M('AB') + '.', 2, sf3(d)],
        ['Find the midpoint.', 1, M('(' + mid.map(num).join(', ') + ')')],
        ['Find the angle ' + M('AB') + ' makes with the horizontal plane ' + M('z = 0') + '.', 2, deg(Math.asin(Math.abs(B[2] - A[2]) / d) * D)]
      ]);
    },
    function () {
      var k = pick([2, 3, 0.5]), V = ri(100, 500);
      return Q('Two similar solids have lengths in the ratio 1 : ' + k + '.', [
        ['The smaller has volume ' + V + ' cm³. Find the volume of the larger.', 1, sf3(V * k * k * k) + ' cm³'],
        ['The larger has surface area 360 cm². Find that of the smaller.', 1, sf3(360 / (k * k)) + ' cm²'],
        ['Explain why the ratio of volumes is the cube of the length ratio.', 1, 'Volume involves three lengths']
      ]);
    },
    function () {
      var w = ri(2, 4), h = ri(2, 3), L = ri(4, 8);
      var sl = Math.hypot(w / 2, h);
      return Q('A tent is a triangular prism: the front is an isosceles triangle of base ' + w + ' m and height ' + h + ' m, and the tent is ' + L + ' m long.', [
        ['Find the volume.', 1, num(w * h / 2 * L) + ' m³'],
        ['Find the area of fabric needed for the two ends and two sloping sides.', 3, sf3(w * h + 2 * sl * L) + ' m²'],
        ['Find the angle between a sloping side and the ground.', 1, deg(Math.atan(2 * h / w) * D)]
      ]);
    },
    function () {
      var s = ri(4, 12);
      var Vcube = s * s * s, Vcyl = Math.PI * s * s * s / 4, Vsph = Math.PI * s * s * s / 6;
      return Q('A cube of side ' + s + ' cm contains the largest possible cylinder and, separately, the largest sphere.', [
        ['Find the volume of the cylinder as a percentage of the cube.', 2, sf3(100 * Math.PI / 4) + '%'],
        ['Find the volume of the sphere as a percentage of the cube.', 2, sf3(100 * Math.PI / 6) + '%'],
        ['Explain why the percentages do not depend on ' + s + '.', 1, 'All volumes scale with ' + M('s^3')]
      ]);
    },
    function () {
      var r = ri(5, 15);
      return Q('A sphere has radius ' + r + ' cm.', [
        ['Find its volume and surface area.', 2, sf3(4 / 3 * Math.PI * r * r * r) + ' cm³, ' + sf3(4 * Math.PI * r * r) + ' cm²'],
        ['The sphere is melted and recast as a cylinder of radius ' + r + ' cm. Find its height.', 2, sf3(4 * r / 3) + ' cm'],
        ['Compare the surface areas.', 1, 'Cylinder: ' + sf3(2 * Math.PI * r * r + 2 * Math.PI * r * 4 * r / 3) + ' cm² — larger than the sphere']
      ]);
    },
    function () {
      var a = ri(4, 10), b = ri(4, 10), c = ri(3, 8);
      var d1 = Math.hypot(a, b), d2 = Math.hypot(b, c), d3 = Math.hypot(a, c);
      var C = Math.acos((d1 * d1 + d3 * d3 - d2 * d2) / (2 * d1 * d3));
      return Q('In a cuboid ' + a + ' × ' + b + ' × ' + c + ' m, a triangle joins three corners adjacent to one vertex.', [
        ['Find its three sides.', 2, [d1, d2, d3].map(sf3).join(', ') + ' m'],
        ['Find its largest angle.', 2, deg(Math.max(C, Math.acos((d1 * d1 + d2 * d2 - d3 * d3) / (2 * d1 * d2)), Math.acos((d2 * d2 + d3 * d3 - d1 * d1) / (2 * d2 * d3))) * D)],
        ['Find its area.', 1, sf3(0.5 * d1 * d3 * Math.sin(C)) + ' m²']
      ]);
    }
  ]);

  X(['sl-trig', 'ib-trig'], [
    function () {
      var A = ri(30, 70), B = ri(30, 70), a = ri(5, 15);
      var Cg = 180 - A - B, b = a * Math.sin(B * R) / Math.sin(A * R), c = a * Math.sin(Cg * R) / Math.sin(A * R);
      return Q('In triangle ' + M('ABC') + ', ' + M('A = ' + A + '°') + ', ' + M('B = ' + B + '°') + ' and ' + M('a = ' + a) + ' cm.', [
        ['Find ' + M('b') + ' and ' + M('c') + '.', 3, sf3(b) + ' cm and ' + sf3(c) + ' cm'],
        ['Find the area.', 1, sf3(0.5 * a * b * Math.sin(Cg * R)) + ' cm²'],
        ['Find the shortest distance from ' + M('C') + ' to ' + M('AB') + '.', 1, sf3(b * Math.sin(A * R)) + ' cm']
      ]);
    },
    function () {
      var a = ri(4, 12), b = ri(4, 12), C = ri(30, 140);
      var c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * R));
      return Q('Two roads leave a junction at ' + C + '°. A car travels ' + a + ' km along one and a bus ' + b + ' km along the other.', [
        ['Find the distance between them.', 2, sf3(c) + ' km'],
        ['Find the angle at the car’s position in the triangle.', 2, deg(Math.acos((a * a + c * c - b * b) / (2 * a * c)) * D)],
        ['Find the area of the triangle formed.', 1, sf3(0.5 * a * b * Math.sin(C * R)) + ' km²']
      ]);
    },
    function () {
      var a = ri(5, 12), b = ri(5, 12), A = ri(20, 80);
      return Q('A triangular field has sides ' + a + ' m and ' + b + ' m with included angle ' + M('\\theta') + '. Its area is ' + sf3(0.5 * a * b * Math.sin(A * R)) + ' m².', [
        ['Find the two possible values of ' + M('\\theta') + '.', 3, deg(A) + ' and ' + deg(180 - A)],
        ['Find the third side in each case.', 2, sf3(Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(A * R))) + ' m and ' + sf3(Math.sqrt(a * a + b * b + 2 * a * b * Math.cos(A * R))) + ' m']
      ]);
    },
    function () {
      var a = ri(6, 10), b = ri(a + 1, a + 4), A = ri(25, 35);
      var B1 = Math.asin(b * Math.sin(A * R) / a) * D;
      return Q('In triangle ' + M('ABC') + ', ' + M('a = ' + a) + ', ' + M('b = ' + b) + ', ' + M('A = ' + A + '°') + '.', [
        ['Find both possible values of ' + M('B') + '.', 3, deg(B1) + ' and ' + deg(180 - B1)],
        ['Explain why there are two triangles.', 1, M('b\\sin A < a < b')],
        ['Find the area of the larger triangle.', 2, (function () { var Cg = 180 - A - B1; return sf3(0.5 * a * b * Math.sin(Cg * R)); })() + ' (using ' + M('B = ' + deg(B1)) + ')']
      ]);
    },
    function () {
      var a = ri(3, 9), b = ri(3, 9), c = ri(Math.abs(a - b) + 2, a + b - 2);
      var s = [a, b, c].sort(function (x, y) { return x - y; });
      var L = Math.acos((s[0] * s[0] + s[1] * s[1] - s[2] * s[2]) / (2 * s[0] * s[1])) * D;
      return Q('A triangle has sides ' + a + ', ' + b + ' and ' + c + ' m.', [
        ['Find the largest angle.', 2, deg(L)],
        ['Find the area.', 2, sf3(0.5 * s[0] * s[1] * Math.sin(L * R)) + ' m²'],
        ['Is the triangle acute or obtuse? Explain.', 1, L > 90 ? 'Obtuse' : L === 90 ? 'Right-angled' : 'Acute']
      ]);
    },
    function () {
      var h = ri(10, 40), d = ri(20, 60), e = ri(20, 50);
      return Q('Find the height of a building using two angles. From point ' + M('A') + ' the angle of elevation is ' + e + '°; from ' + M('B') + ', ' + d + ' m closer, it is ' + (e + 15) + '°.', [
        ['Find the distance from ' + M('B') + ' to the top using the sine rule.', 3, sf3(d * Math.sin(e * R) / Math.sin(15 * R)) + ' m'],
        ['Find the height of the building.', 2, sf3(d * Math.sin(e * R) / Math.sin(15 * R) * Math.sin((e + 15) * R)) + ' m']
      ]);
    }
  ]);

  X(['sl-trig', 'ib-bearings'], [
    function () {
      var d1 = ri(5, 20), d2 = ri(5, 20), b1 = ri(20, 80), b2 = ri(120, 200);
      var x = d1 * Math.sin(b1 * R) + d2 * Math.sin(b2 * R), y = d1 * Math.cos(b1 * R) + d2 * Math.cos(b2 * R);
      return Q('A ship sails ' + d1 + ' km on a bearing of ' + String(b1).padStart(3, '0') + '°, then ' + d2 + ' km on ' + String(b2).padStart(3, '0') + '°.', [
        ['Find its distance from the start.', 3, sf3(Math.hypot(x, y)) + ' km'],
        ['Find the bearing of the start from the ship.', 2, deg(brg(-x, -y))]
      ]);
    },
    function () {
      var h = ri(20, 80), e = ri(20, 50);
      return Q('From a point on level ground, the angle of elevation of the top of a tower ' + h + ' m tall is ' + e + '°.', [
        ['Find the distance to the base of the tower.', 2, sf3(h / Math.tan(e * R)) + ' m'],
        ['How much closer must you walk for the angle to become ' + (e + 10) + '°?', 2, sf3(h / Math.tan(e * R) - h / Math.tan((e + 10) * R)) + ' m'],
        ['Find the angle of depression from the top of the tower to your original position.', 1, e + '°']
      ]);
    },
    function () {
      var h = ri(40, 120), d1 = ri(15, 35), d2 = d1 + ri(5, 15);
      return Q('From a cliff ' + h + ' m high, the angles of depression of two boats in line are ' + d2 + '° and ' + d1 + '°.', [
        ['Find the horizontal distance to each boat.', 2, sf3(h / Math.tan(d2 * R)) + ' m and ' + sf3(h / Math.tan(d1 * R)) + ' m'],
        ['Find the distance between the boats.', 1, sf3(h / Math.tan(d1 * R) - h / Math.tan(d2 * R)) + ' m']
      ]);
    },
    function () {
      var d = ri(5, 15), a = ri(30, 70), b = ri(30, 70);
      var c = 180 - a - b, AP = d * Math.sin(b * R) / Math.sin(c * R);
      return Q('Two coastguards are ' + d + ' km apart on an east–west line. One sees a ship on a bearing of ' + String(90 - a).padStart(3, '0') + '°, the other (to the east) on a bearing of ' + String(270 + b).padStart(3, '0') + '°.', [
        ['Find the angles of the triangle formed.', 2, a + '°, ' + b + '°, ' + c + '°'],
        ['Find the distance from the western coastguard to the ship.', 2, sf3(AP) + ' km'],
        ['Find how far the ship is from the coast line.', 1, sf3(AP * Math.sin(a * R)) + ' km']
      ]);
    }
  ]);

  X('ib-trig', [
    function () {
      var a = ri(5, 10), b = ri(5, 10), c = ri(5, 10), C = 60;
      var cc = Math.sqrt(a * a + b * b - a * b);
      return Q('A quadrilateral ' + M('ABCD') + ' has ' + M('AB = ' + a) + ', ' + M('BC = ' + b) + ', angle ' + M('ABC = 60°') + ', ' + M('CD = ' + c) + ' and angle ' + M('ACD = 90°') + '.', [
        ['Find ' + M('AC') + '.', 2, sf3(cc)],
        ['Find the area of the quadrilateral.', 3, sf3(0.5 * a * b * Math.sin(C * R) + 0.5 * cc * c)]
      ]);
    },
    function () {
      var r = ri(5, 12), n = pick([5, 6, 8]);
      return Q('A regular ' + n + '-sided polygon is inscribed in a circle of radius ' + r + ' cm.', [
        ['Find the length of a side using the cosine rule.', 2, sf3(Math.sqrt(2 * r * r - 2 * r * r * Math.cos(2 * Math.PI / n))) + ' cm'],
        ['Find the area of the polygon.', 2, sf3(n * 0.5 * r * r * Math.sin(2 * Math.PI / n)) + ' cm²'],
        ['What percentage of the circle does it cover?', 1, sf3(100 * n * 0.5 * Math.sin(2 * Math.PI / n) / Math.PI) + '%']
      ]);
    },
    function () {
      var a = ri(5, 10), b = ri(5, 10), c = ri(Math.abs(a - b) + 2, a + b - 2);
      var s = (a + b + c) / 2, area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      var C = Math.acos((a * a + b * b - c * c) / (2 * a * b));
      return Q('A triangle has sides ' + a + ', ' + b + ', ' + c + '.', [
        ['Find an angle and hence the area.', 3, sf3(0.5 * a * b * Math.sin(C))],
        ['Check with Heron’s formula ' + M('\\sqrt{s(s - a)(s - b)(s - c)}') + '.', 2, sf3(area)]
      ]);
    },
    function () {
      var d = ri(50, 200), a = ri(30, 60), b = ri(30, 60);
      var w = d * Math.sin(a * R) * Math.sin(b * R) / Math.sin((a + b) * R);
      return Q('To find the width of a river, two points ' + d + ' m apart on one bank sight a tree on the other bank, at angles ' + a + '° and ' + b + '° to the bank.', [
        ['Find the distance from the first point to the tree.', 3, sf3(d * Math.sin(b * R) / Math.sin((a + b) * R)) + ' m'],
        ['Find the width of the river.', 2, sf3(w) + ' m']
      ]);
    }
  ]);

  X('ib-bearings', [
    function () {
      var x = nz(-8, 8), y = nz(-8, 8);
      return Q('Town ' + M('B') + ' is ' + Math.abs(x) + ' km ' + (x > 0 ? 'east' : 'west') + ' and ' + Math.abs(y) + ' km ' + (y > 0 ? 'north' : 'south') + ' of town ' + M('A') + '.', [
        ['Find the bearing of ' + M('B') + ' from ' + M('A') + '.', 2, deg(brg(x, y))],
        ['Find the bearing of ' + M('A') + ' from ' + M('B') + '.', 1, deg(brg(-x, -y))],
        ['Explain why the two bearings differ by 180°.', 1, 'They point in opposite directions']
      ]);
    },
    function () {
      var h = ri(100, 500), e1 = ri(10, 25);
      return Q('A hot-air balloon is ' + h + ' m above the ground. From a point ' + M('P') + ' the angle of elevation is ' + e1 + '°. The balloon then rises vertically by 100 m.', [
        ['Find the horizontal distance from ' + M('P') + '.', 2, sf3(h / Math.tan(e1 * R)) + ' m'],
        ['Find the new angle of elevation.', 2, deg(Math.atan((h + 100) / (h / Math.tan(e1 * R))) * D)]
      ]);
    },
    function () {
      var s = ri(10, 25), t = pick([1, 1.5, 2]), b1 = ri(30, 80);
      var d = s * t;
      return Q('A plane flies at ' + s + '0 km/h on a bearing of ' + String(b1).padStart(3, '0') + '° for ' + t + ' hours, then turns onto bearing ' + String(b1 + 90).padStart(3, '0') + '° for the same time.', [
        ['Find the distance from the start.', 2, sf3(d * 10 * Math.SQRT2) + ' km'],
        ['Find the bearing of the plane from the start.', 2, deg(b1 + 45)]
      ]);
    },
    function () {
      var h = ri(30, 80), a = ri(20, 40), b = ri(40, 60);
      var d1 = h / Math.tan(a * R), d2 = h / Math.tan(b * R);
      return Q('A mast ' + h + ' m tall stands on level ground. From point ' + M('A') + ', due south, the angle of elevation is ' + a + '°. From point ' + M('B') + ', due east, it is ' + b + '°.', [
        ['Find the distances from ' + M('A') + ' and ' + M('B') + ' to the foot of the mast.', 2, sf3(d1) + ' m and ' + sf3(d2) + ' m'],
        ['Find the distance ' + M('AB') + '.', 2, sf3(Math.hypot(d1, d2)) + ' m'],
        ['Find the bearing of ' + M('B') + ' from ' + M('A') + '.', 1, deg(brg(d2, d1))]
      ]);
    },
    function () {
      var d = ri(10, 30), b = ri(30, 70), c = ri(100, 150);
      var x = d * Math.sin(b * R), y = d * Math.cos(b * R);
      return Q('A hiker walks ' + d + ' km on a bearing of ' + String(b).padStart(3, '0') + '°, then turns and walks due south until she is due east of her start.', [
        ['How far does she walk south?', 2, sf3(y) + ' km'],
        ['How far is she then from her start?', 1, sf3(x) + ' km'],
        ['What bearing must she walk on to return?', 1, '270°']
      ]);
    },
    function () {
      var e = ri(5, 15), h = ri(1, 2);
      return Q('From the top of a ' + h * 100 + ' m lighthouse, the angle of depression of a boat is ' + e + '°. Ten minutes later it is ' + (e + 10) + '°.', [
        ['Find the distance the boat has travelled towards the lighthouse.', 3, sf3(h * 100 / Math.tan(e * R) - h * 100 / Math.tan((e + 10) * R)) + ' m'],
        ['Find the boat’s speed in km/h.', 1, sf3((h * 100 / Math.tan(e * R) - h * 100 / Math.tan((e + 10) * R)) * 6 / 1000) + ' km/h']
      ]);
    }
  ]);

  X(['sl-sectors', 'ib-radians'], [
    function () {
      var r = ri(4, 12), t = ri(40, 150);
      return Q('A sector of a circle of radius ' + r + ' cm has angle ' + t + '°.', [
        ['Find the arc length and the perimeter.', 2, sf3(2 * Math.PI * r * t / 360) + ' cm, ' + sf3(2 * Math.PI * r * t / 360 + 2 * r) + ' cm'],
        ['Find the area.', 1, sf3(Math.PI * r * r * t / 360) + ' cm²'],
        ['Find the area of the segment cut off by the chord.', 2, sf3(Math.PI * r * r * t / 360 - 0.5 * r * r * Math.sin(t * R)) + ' cm²']
      ]);
    },
    function () {
      var A = ri(20, 100), r = ri(5, 12);
      var t = 360 * A / (Math.PI * r * r);
      return Q('A sector has area ' + A + ' cm² and radius ' + r + ' cm.', [
        ['Find the angle in degrees.', 2, deg(t)],
        ['Find the arc length.', 1, sf3(2 * A / r) + ' cm'],
        ['Explain why the arc length is ' + M('\\frac{2A}{r}') + ' whatever the angle.', 1, 'Area ' + M('= \\frac{1}{2}rl')]
      ]);
    },
    function () {
      var r = ri(6, 15), l = ri(5, 2 * r);
      return Q('A pendulum of length ' + r + ' cm swings through an arc of ' + l + ' cm.', [
        ['Find the angle of swing.', 2, deg(l / r * D) + ' (' + sf3(l / r) + ' rad)'],
        ['Find the straight-line distance between the ends of the swing.', 2, sf3(2 * r * Math.sin(l / (2 * r))) + ' cm']
      ]);
    },
    function () {
      var r = ri(3, 8);
      return Q('A sprinkler waters a sector of radius ' + r + ' m and angle 120°.', [
        ['Find the area watered.', 1, sf3(Math.PI * r * r / 3) + ' m²'],
        ['A second sprinkler with radius ' + (r + 2) + ' m waters the same area. Find its angle.', 2, deg(120 * r * r / ((r + 2) * (r + 2)))],
        ['Explain why increasing the radius slightly greatly reduces the angle needed.', 1, 'Area grows with the square of the radius']
      ]);
    }
  ]);

  X('sl-sectors', [
    function () {
      var r = ri(5, 15), t = ri(30, 90);
      return Q('A slice of pizza is a sector with radius ' + r + ' cm and angle ' + t + '°.', [
        ['Find the crust length (arc).', 1, sf3(2 * Math.PI * r * t / 360) + ' cm'],
        ['What fraction of the pizza is the slice?', 1, M(F(t, 360))],
        ['How many slices of this angle can be cut, and what angle is left over?', 1, Math.floor(360 / t) + ' slices, ' + (360 % t) + '° left']
      ]);
    },
    function () {
      var R1 = ri(8, 15), r1 = ri(3, R1 - 2), t = ri(60, 150);
      return Q('A garden bed is part of a ring between radii ' + r1 + ' m and ' + R1 + ' m, with angle ' + t + '°.', [
        ['Find its area.', 2, sf3(Math.PI * (R1 * R1 - r1 * r1) * t / 360) + ' m²'],
        ['Find its perimeter.', 2, sf3(2 * Math.PI * (R1 + r1) * t / 360 + 2 * (R1 - r1)) + ' m']
      ]);
    },
    function () {
      var r = ri(4, 10);
      return Q('A sector has perimeter equal to the circumference of a circle of radius ' + r + ' cm, and its own radius is ' + r + ' cm.', [
        ['Find the arc length.', 1, sf3(2 * Math.PI * r - 2 * r) + ' cm'],
        ['Find the angle.', 2, deg((2 * Math.PI * r - 2 * r) / r * D)],
        ['Explain why the answer does not depend on ' + r + '.', 1, 'Arc length is proportional to ' + M('r')]
      ]);
    },
    function () {
      var r = ri(10, 30), t = ri(20, 60);
      return Q('A clock’s minute hand is ' + r + ' cm long.', [
        ['How far does its tip travel in ' + t + ' minutes?', 1, sf3(2 * Math.PI * r * t / 60) + ' cm'],
        ['Find the area swept in that time.', 1, sf3(Math.PI * r * r * t / 60) + ' cm²'],
        ['Find the angle between the hands at 3:' + String(t).padStart(2, '0') + '.', 2, deg(Math.min(Math.abs(90 - 5.5 * t), 360 - Math.abs(90 - 5.5 * t)))]
      ]);
    },
    function () {
      var r = ri(5, 10), t = ri(50, 120);
      var l = 2 * Math.PI * r * t / 360, rc = l / (2 * Math.PI);
      return Q('A sector of radius ' + r + ' cm and angle ' + t + '° is folded into a cone.', [
        ['Find the radius of the cone’s base.', 2, sf3(rc) + ' cm'],
        ['Find the height of the cone.', 2, sf3(Math.sqrt(r * r - rc * rc)) + ' cm']
      ]);
    },
    function () {
      var r = ri(4, 10);
      return Q('Two radii of a circle of radius ' + r + ' cm make an angle of ' + M('\\theta') + '. The segment area is a quarter of the sector area.', [
        ['Explain why the triangle is three quarters of the sector, and show that ' + M('\\frac{1}{2}\\sin\\theta = \\frac{3}{4} \\times \\frac{\\pi\\theta}{360}') + '.', 2, 'Segment = sector − triangle, so triangle = ' + M('\\frac{3}{4}') + ' sector; divide by ' + M('r^2')],
        ['Use technology to find ' + M('\\theta') + '.', 2, (function () { var lo = 1, hi = 179; for (var i = 0; i < 60; i++) { var m = (lo + hi) / 2; var f = 0.75 * Math.PI * m / 360 - 0.5 * Math.sin(m * R); if (f < 0) lo = m; else hi = m; } return deg(lo); })()]
      ]);
    }
  ]);

  X('ib-radians', [
    function () {
      var r = ri(4, 12), t = pick([0.8, 1.2, 1.5, 2.4]);
      return Q('A sector has radius ' + r + ' cm and angle ' + t + ' radians.', [
        ['Find the arc length, perimeter and area.', 2, sf3(r * t) + ' cm, ' + sf3(r * t + 2 * r) + ' cm, ' + sf3(r * r * t / 2) + ' cm²'],
        ['Find the segment area.', 2, sf3(r * r / 2 * (t - Math.sin(t))) + ' cm²'],
        ['Convert the angle to degrees.', 1, deg(t * D)]
      ]);
    },
    function () {
      var rpm = pick([30, 60, 90]), r = ri(20, 60);
      return Q('A wheel of radius ' + r + ' cm turns at ' + rpm + ' rpm.', [
        ['Find the angular speed in rad/s.', 1, M(F(rpm, 30) + '\\pi') + ' ≈ ' + sf3(rpm * Math.PI / 30)],
        ['Find the linear speed of the rim.', 1, sf3(rpm * Math.PI / 30 * r / 100) + ' m/s'],
        ['Find the angle turned in 0.1 s.', 1, sf3(rpm * Math.PI / 300) + ' rad']
      ]);
    },
    function () {
      var P0 = ri(20, 40);
      return Q('A sector has fixed perimeter ' + P0 + ' cm.', [
        ['Show that its area is ' + M('A = \\frac{1}{2}r(' + P0 + ' - 2r)') + '.', 2, 'Arc length ' + M(P0 + ' - 2r')],
        ['Find the maximum area and the angle that gives it.', 3, num(P0 * P0 / 16) + ' cm² at 2 radians']
      ]);
    },
    function () {
      var r = ri(3, 8);
      return Q('Two circles of radius ' + r + ' cm each pass through the other’s centre.', [
        ['Find the angle subtended at each centre by the common chord, in radians.', 2, M('\\frac{2\\pi}{3}')],
        ['Find the area of overlap.', 3, sf3(2 * (r * r * Math.PI / 3 - r * r * Math.sqrt(3) / 4)) + ' cm²']
      ]);
    },
    function () {
      var r = ri(5, 10);
      return Q('A segment of a circle radius ' + r + ' cm has angle ' + M('\\theta') + ' radians and area equal to half the sector area.', [
        ['Show that ' + M('\\theta = 2\\sin\\theta') + '.', 2, M('\\frac{1}{2}r^2(\\theta - \\sin\\theta) = \\frac{1}{4}r^2\\theta')],
        ['Use technology to find ' + M('\\theta') + '.', 2, '1.90 rad']
      ]);
    },
    function () {
      return Q('Why radians?', [
        ['Show that the arc length formula is simpler in radians.', 1, M('l = r\\theta') + ' vs ' + M('\\frac{\\theta}{360} \\times 2\\pi r')],
        ['Use ' + M('\\sin\\theta \\approx \\theta') + ' to estimate ' + M('\\sin 0.05') + ', and check.', 1, '0.05; ' + Math.sin(0.05).toFixed(6)],
        ['Explain why this approximation fails in degrees.', 1, M('\\sin 0.05° \\ne 0.05')]
      ]);
    }
  ]);

  X(['sl-voronoi', 'ib-voronoi'], [
    function () {
      var A = [ri(0, 4), ri(0, 4)], B = [A[0] + 2 * ri(1, 4), A[1] + 2 * nz(-2, 2)];
      var mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
      return Q('Sites ' + M('A' + P(A[0], A[1])) + ' and ' + M('B' + P(B[0], B[1])) + ' are on a Voronoi diagram.', [
        ['Find the equation of the edge between their cells.', 3, M('y' + S0(-my) + ' = ' + cf(F(-(B[0] - A[0]), B[1] - A[1]), '') + '(x' + S(-mx) + ')')],
        ['Which cell contains ' + M(P(A[0], A[1] + 1)) + '? Explain.', 1, 'A’s cell: it is closer to A'],
        ['What property do points on the edge have?', 1, 'They are equidistant from A and B']
      ]);
    },
    function () {
      var s = [[0, 0], [2 * ri(2, 4), 0], [2 * ri(1, 3), 2 * ri(2, 4)]];
      var ax = s[0][0], ay = s[0][1], bx = s[1][0], by = s[1][1], cx = s[2][0], cy = s[2][1];
      var d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
      var ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
      var uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
      return Q('Three sites are at ' + s.map(function (p) { return M(P(p[0], p[1])); }).join(', ') + '.', [
        ['Find the Voronoi vertex where the three cells meet.', 4, M(P(sf3(ux), sf3(uy)))],
        ['Explain why this point is the best place for a new shop to be as far as possible from all three existing shops (within the triangle).', 1, 'It is equidistant from all three: the centre of the largest empty circle'],
        ['Find that distance.', 1, sf3(Math.hypot(ux - ax, uy - ay))]
      ]);
    },
    function () {
      return Q('A Voronoi diagram shows the nearest hospital for each region of a town.', [
        ['Explain what the cell around a hospital represents.', 1, 'All points closer to that hospital than to any other'],
        ['A new hospital is built. Describe how the diagram changes.', 2, 'A new cell is created around it, taking area from neighbouring cells'],
        ['Give one reason why the nearest hospital by straight-line distance might not be the quickest.', 1, 'Roads, traffic or barriers like rivers']
      ]);
    },
    function () {
      var A = [ri(0, 3), ri(0, 3)], B = [A[0] + 2 * ri(2, 4), A[1]];
      return Q('Sites ' + M('A' + P(A[0], A[1])) + ' and ' + M('B' + P(B[0], B[1])) + ' lie on a horizontal line.', [
        ['Find the edge between their cells.', 1, M('x = ' + (A[0] + B[0]) / 2)],
        ['A point ' + M(P((A[0] + B[0]) / 2 + 1, A[1] + 5)) + ' is chosen. Which site is nearer, and by how much?', 2, 'B, by ' + sf3(Math.hypot((A[0] + B[0]) / 2 + 1 - A[0], 5) - Math.hypot((A[0] + B[0]) / 2 + 1 - B[0], 5))]
      ]);
    },
    function () {
      var w = ri(6, 12), h = ri(6, 12);
      return Q('Two wells are at ' + M('(0, 0)') + ' and ' + M(P(w, 0)) + ' in a rectangular field from ' + M('(0, 0)') + ' to ' + M(P(w, h)) + '.', [
        ['Draw the Voronoi edge within the field.', 1, M('x = ' + num(w / 2))],
        ['Find the area of each cell.', 1, num(w * h / 2) + ' each'],
        ['A third well is placed at ' + M(P(num(w / 2), h)) + '. Find the new vertex.', 3, M(P(num(w / 2), sf3((h * h - w * w / 4) / (2 * h))))]
      ]);
    },
    function () {
      var s = [[0, 0], [6, 0], [3, 6]];
      return Q('A toxic waste dump must be placed as far as possible from three towns at ' + s.map(function (p) { return M(P(p[0], p[1])); }).join(', ') + ' (km), within the triangle.', [
        ['Explain why the best location is a Voronoi vertex.', 1, 'It is equidistant from the nearest towns and maximises the minimum distance'],
        ['Find it.', 3, M('(3, 2.25)')],
        ['Find its distance from each town.', 1, '3.75 km']
      ]);
    },
    function () {
      var A = [ri(0, 4), ri(0, 4)], B = [A[0] + 2 * ri(1, 3), A[1] + 2 * ri(1, 3)];
      var m = -(B[0] - A[0]) / (B[1] - A[1]), mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
      return Q('The perpendicular bisector of ' + M('A' + P(A[0], A[1])) + ' and ' + M('B' + P(B[0], B[1])) + ' forms a Voronoi edge.', [
        ['Find its equation in the form ' + M('y = mx + c') + '.', 3, M('y = ' + cf(F(-(B[0] - A[0]), B[1] - A[1]), 'x') + ' + ' + sf3(my - m * mx)).replace('+ -', '- ')],
        ['Find where it crosses the ' + M('x') + '-axis.', 1, M(P(sf3(mx - my / m), 0))]
      ]);
    },
    function () {
      return Q('Interpreting a Voronoi diagram for mobile phone masts.', [
        ['What does a large cell suggest?', 1, 'Masts are sparse there, so coverage may be weaker'],
        ['Where should a new mast go to reduce the largest distance to any mast?', 1, 'At the vertex furthest from its sites (largest empty circle)'],
        ['Why might the cell edges not be the true boundaries of coverage?', 1, 'Signal depends on terrain, power and buildings, not just distance']
      ]);
    },
    function () {
      var a = ri(2, 6);
      return Q('Sites are at ' + M('(0, 0)') + ', ' + M(P(2 * a, 0)) + ' and ' + M(P(0, 2 * a)) + '.', [
        ['Find the three edges.', 3, M('x = ' + a) + ', ' + M('y = ' + a) + ', ' + M('y = x')],
        ['Find the vertex.', 1, M(P(a, a))],
        ['Which cell is unbounded in every direction except one?', 1, 'All three cells are unbounded']
      ]);
    },
    function () {
      var A = [0, 0], B = [ri(4, 8), 0], Cc = [ri(1, 3), ri(4, 8)];
      var x = B[0] / 2;
      return Q('In a Voronoi diagram with sites ' + [A, B, Cc].map(function (p) { return M(P(p[0], p[1])); }).join(', ') + ', the edge between ' + M('A') + ' and ' + M('B') + ' is ' + M('x = ' + num(x)) + '.', [
        ['Find the point on this edge equidistant from all three sites.', 3, (function () { var y = (Cc[0] * Cc[0] + Cc[1] * Cc[1] - 2 * Cc[0] * x) / (2 * Cc[1]); return M(P(num(x), sf3(y))); })()],
        ['Explain why this is a vertex of the diagram.', 1, 'Three cells meet there']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
