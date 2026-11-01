/* Byte Size Classroom — deeper extension questions (set 3d): GCSE / International GCSE geometry topics (part 1). */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: p[2] }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  var R = Math.PI / 180;

  X('angles-parallel', [
    function () {
      var x = ri(36, 45), a = 2 * x + 10, b = 180 - a, k = 5 * x - 170;
      return Q('Two parallel lines are crossed by a transversal. A pair of co-interior angles are ' + M('(2x + 10)°') + ' and ' + M('(3x - ' + k + ')°') + '.', [
        ['Form an equation and find ' + M('x') + '.', 2, M('5x - ' + (k - 10) + ' = 180') + ', so ' + M('x = ' + x)],
        ['Find all eight angles formed at the two intersections.', 2, 'Four of ' + a + '° and four of ' + b + '°'],
        ['Prove that co-interior angles add to 180° using corresponding angles and angles on a straight line.', 2, 'One co-interior angle equals the corresponding angle at the other intersection, which forms a straight line with the second co-interior angle.']
      ]);
    },
    function () {
      var a = ri(30, 70), b = ri(30, 70);
      return Q('In triangle ' + M('ABC') + ', angle ' + M('A = ' + a + '°') + ' and angle ' + M('B = ' + b + '°') + '. The side ' + M('BC') + ' is extended to ' + M('D') + '.', [
        ['Find angle ' + M('ACD') + '.', 1, (a + b) + '°'],
        ['Prove that an exterior angle of a triangle equals the sum of the two opposite interior angles.', 3, 'Angle ' + M('ACD = 180° - C = A + B') + ', since ' + M('A + B + C = 180°')],
        ['Hence prove that the exterior angles of a triangle add to 360°.', 2, 'Sum ' + M('= 2(A + B + C) = 360°')]
      ]);
    },
    function () {
      var x = ri(20, 37);
      return Q(M('ABCD') + ' is a parallelogram. Angle ' + M('DAB = (3x - 10)°') + ' and angle ' + M('ABC = (2x + ' + (190 - 5 * x) + ')°') + '.', [
        ['Find ' + M('x') + ' and the angles of the parallelogram.', 3, M('x = ' + x) + '; ' + (3 * x - 10) + '° and ' + (180 - 3 * x + 10) + '°'],
        ['Prove that opposite angles of a parallelogram are equal.', 3, 'Each is co-interior with the same angle between parallel sides.'],
        ['The diagonal ' + M('AC') + ' bisects angle ' + M('DAB') + '. What type of parallelogram is ' + M('ABCD') + '? Explain.', 2, 'A rhombus: the bisecting diagonal makes triangle ' + M('ABC') + ' isosceles, so ' + M('AB = BC')]
      ]);
    },
    function () {
      var n = ri(5, 9);
      return Q('A line ' + M('PQ') + ' crosses ' + n + ' parallel lines.', [
        ['How many angles are formed at all the intersections, and how many different sizes can they have?', 2, (4 * n) + ' angles; at most 2 different sizes'],
        ['One angle is ' + (60 + n) + '°. Find the sum of all the acute angles.', 2, (2 * n) + ' × ' + (60 + n) + ' = ' + 2 * n * (60 + n) + '°'],
        ['Explain why the sum of all ' + 4 * n + ' angles is ' + 360 * n + '°.', 1, 'Angles at each point add to 360°']
      ]);
    },
    function () {
      var a = ri(20, 50), b = ri(20, 50);
      return Q('Lines ' + M('AB') + ' and ' + M('CD') + ' are parallel. A point ' + M('P') + ' lies between them. Angle ' + M('BAP = ' + a + '°') + ' and angle ' + M('PCD = ' + b + '°') + ' (with ' + M('P') + ' on the same side as ' + M('B') + ' and ' + M('D') + ').', [
        ['Find angle ' + M('APC') + ' (the angle at ' + M('P') + ' facing ' + M('B') + ' and ' + M('D') + ').', 3, (a + b) + '°'],
        ['Prove your result by drawing a line through ' + M('P') + ' parallel to ' + M('AB') + '.', 3, 'The angle at ' + M('P') + ' splits into two alternate angles, ' + a + '° and ' + b + '°.']
      ]);
    },
    function () {
      var y = ri(20, 70);
        return Q('An isosceles triangle has one angle of ' + y + '°.', [
          ['Find the two possible sets of angles.', 2, y + '°, ' + y + '°, ' + (180 - 2 * y) + '°; or ' + y + '°, ' + num((180 - y) / 2) + '°, ' + num((180 - y) / 2) + '°'],
          ['For which values of ' + M('y') + ' is there only one possible triangle? Explain.', 2, M('y \\ge 90') + ' (it must be the apex angle), or when both options coincide at ' + M('y = 60')],
          ['Prove that the base angles of an isosceles triangle are equal.', 2, 'Draw the line from the apex to the midpoint of the base: the two triangles are congruent (SSS).']
        ]);
    },
    function () {
      var a = ri(35, 75), b = ri(35, 75), c = 180 - a - b;
      return Q('Triangle ' + M('ABC') + ' has angle ' + M('A = ' + a + '°') + ' and angle ' + M('B = ' + b + '°') + '. A line ' + M('PCQ') + ' is drawn through ' + M('C') + ' parallel to ' + M('AB') + '.', [
        ['Find angles ' + M('PCA') + ' and ' + M('QCB') + ', giving reasons.', 2, a + '° and ' + b + '° (alternate angles)'],
        ['Hence prove that the angles of any triangle add to 180°.', 2, 'The three angles at ' + M('C') + ' lie on the straight line ' + M('PQ') + ', so ' + M('A + B + C = 180°')],
        ['Use this result to prove that the angles of any quadrilateral add to 360°.', 2, 'A diagonal splits it into two triangles: ' + M('2 \\times 180 = 360')]
      ]);
    },
    function () {
      var a = ri(40, 70);
      return Q('In a kite ' + M('ABCD') + ', ' + M('AB = AD') + ' and ' + M('CB = CD') + '. Angle ' + M('BAD = ' + a + '°') + ' and angle ' + M('BCD = ' + (a + 40) + '°') + '.', [
        ['Find angles ' + M('ABC') + ' and ' + M('ADC') + '.', 2, num((360 - 2 * a - 40) / 2) + '° each'],
        ['Prove that the diagonal ' + M('AC') + ' bisects angles ' + M('A') + ' and ' + M('C') + '.', 3, 'Triangles ' + M('ABC') + ' and ' + M('ADC') + ' are congruent (SSS).'],
        ['Find the angle between the diagonals.', 1, '90°']
      ]);
    }
  ]);

  X('polygons', [
    function () {
      var n = pick([5, 6, 8, 9, 10, 12]), ext = 360 / n, int = 180 - ext;
      return Q('A regular polygon has ' + n + ' sides.', [
        ['Find its interior and exterior angles.', 2, int + '° and ' + num(ext) + '°'],
        ['Find the sum of its interior angles in two different ways.', 2, M('(' + n + ' - 2) \\times 180 = ' + (n - 2) * 180) + ' and ' + M(n + ' \\times ' + num(int))],
        ['How many diagonals does it have, and how many go through the centre?', 3, n * (n - 3) / 2 + ' diagonals; ' + (n % 2 === 0 ? n / 2 : 0) + ' through the centre']
      ]);
    },
    function () {
        var x = ri(95, 115), extra = 720 - (x + (x + 10) + (x + 20) + (x + 30) + (x + 40));
        return Q('Five of the interior angles of a hexagon are ' + x + '°, ' + (x + 10) + '°, ' + (x + 20) + '°, ' + (x + 30) + '° and ' + (x + 40) + '°.', [
          ['Find the sixth angle.', 2, extra + '°'],
          ['Is the hexagon convex? Explain.', 1, extra < 180 ? 'Yes: every angle is less than 180°.' : 'No: one angle is reflex.'],
          ['Explain why the angles of a hexagon add to 720°, by splitting it into triangles.', 2, 'From one vertex, 3 diagonals make 4 triangles: ' + M('4 \\times 180 = 720')]
        ]);
    },
    function () {
      var n = ri(5, 12);
      return Q('Regular ' + n + '-sided polygons are placed edge to edge around a point.', [
        ['Find the interior angle of each polygon.', 1, sf3(180 - 360 / n) + '°'],
        ['Explain whether they can meet at a point with no gaps or overlaps.', 2, (360 % (180 - 360 / n) === 0) ? 'Yes: ' + (360 / (180 - 360 / n)) + ' fit exactly' : 'No: 360 is not a multiple of the interior angle'],
        ['Prove that the only regular polygons that tessellate on their own are triangles, squares and hexagons.', 3, 'Need ' + M('\\frac{360}{180 - 360/n} = \\frac{2n}{n - 2}') + ' to be a whole number; this happens only for ' + M('n = 3, 4, 6')]
      ]);
    },
    function () {
      var n = ri(5, 15);
      return Q('A polygon has ' + n + ' sides.', [
        ['Show that the sum of its interior angles is ' + M((n - 2) * 180 + '°') + '.', 2, 'Split into ' + (n - 2) + ' triangles from one vertex'],
        ['If it is regular, find each exterior angle, and show that exterior + interior = 180°.', 2, sf3(360 / n) + '° and ' + sf3(180 - 360 / n) + '°'],
        ['A polygon has interior angle sum ' + (n + 3) * 180 + '°. How many sides does it have?', 1, (n + 5)]
      ]);
    },
    function () {
      var n = pick([6, 8, 10, 12]), s = ri(4, 10);
      var A = n * s * s / (4 * Math.tan(Math.PI / n));
      return Q('A regular ' + n + '-sided polygon has side ' + s + ' cm.', [
        ['Split it into ' + n + ' isosceles triangles from the centre. Find the angle at the centre of each.', 1, num(360 / n) + '°'],
        ['Find the area of the polygon.', 4, M(n + ' \\times \\frac{1}{2} \\times ' + s + ' \\times \\frac{' + s + '}{2\\tan(' + num(180 / n) + '°)} = ' + sf3(A)) + ' cm²'],
        ['Explain why, as the number of sides increases (same perimeter), the area approaches that of a circle.', 1, 'The polygon becomes closer and closer to a circle.']
      ]);
    },
    function () {
        var n = pick([8, 9, 10, 12, 15, 18, 20]);
        return Q('The interior angle of a regular polygon is ' + num(180 - 360 / n) + '°.', [
          ['Find the number of sides.', 2, n],
          ['Find the number of diagonals.', 2, n * (n - 3) / 2],
          ['Can a regular polygon have an interior angle of 175°? Of 145°? Explain.', 3, '175°: yes, exterior 5° gives 72 sides. 145°: no, exterior 35° does not divide 360.']
        ]);
    },
    function () {
      return Q('A regular pentagon ' + M('ABCDE') + ' has all its diagonals drawn.', [
        ['Find the interior angle of the pentagon.', 1, '108°'],
        ['Find angle ' + M('BAC') + ', explaining your reasoning.', 2, '36°: triangle ' + M('ABC') + ' is isosceles with apex angle 108°'],
        ['Show that the diagonals divide angle ' + M('A') + ' into three equal parts.', 2, 'Each part is 36°: ' + M('BAC = EAD = 36°') + ', so ' + M('CAD = 108 - 72 = 36°')]
      ]);
    },
    function () {
      var n = ri(2, 6);
      return Q('A star polygon is made by joining every second vertex of a regular ' + (2 * n + 1) + '-gon.', [
        ['Find the interior angle of the ' + (2 * n + 1) + '-gon.', 1, sf3(180 - 360 / (2 * n + 1)) + '°'],
        ['Find the angle at each point of the star.', 3, sf3(180 * (2 * n - 3) / (2 * n + 1)) + '°'],
        ['Find the sum of the angles at the points of the star.', 1, 180 * (2 * n - 3) + '°']
      ]);
    }
  ]);

  X('pythagoras-trig', [
    function () {
      var a = ri(3, 9), b = ri(3, 9), c = ri(3, 9), d = Math.sqrt(a * a + b * b + c * c);
      return Q('A room is ' + a + ' m long, ' + b + ' m wide and ' + c + ' m high.', [
        ['Find the length of the longest straight pole that fits in the room.', 3, M('\\sqrt{' + (a * a + b * b + c * c) + '} = ' + sf3(d)) + ' m'],
        ['Find the angle this pole makes with the floor.', 2, M(sf3(Math.atan(c / Math.sqrt(a * a + b * b)) / R) + '°')],
        ['A spider walks from one bottom corner to the opposite top corner along the walls. Find the shortest route.', 3, M(sf3(Math.min(Math.sqrt((a + b) * (a + b) + c * c), Math.sqrt((a + c) * (a + c) + b * b), Math.sqrt((b + c) * (b + c) + a * a)))) + ' m (unfold the walls)']
      ]);
    },
    function () {
      var h = ri(20, 60), d1 = ri(30, 80), a1 = Math.atan(h / d1) / R;
      return Q('A tower is ' + h + ' m tall. Point ' + M('A') + ' is ' + d1 + ' m from its base on level ground.', [
        ['Find the angle of elevation of the top from ' + M('A') + '.', 2, M(sf3(a1) + '°')],
        ['Find how much closer to the tower you must walk to double the angle of elevation.', 3, 'New distance ' + M('\\frac{' + h + '}{\\tan ' + sf3(2 * a1) + '°} = ' + sf3(h / Math.tan(2 * a1 * R))) + ' m; move ' + sf3(d1 - h / Math.tan(2 * a1 * R)) + ' m'],
        ['Explain why halving the distance does not double the angle.', 1, M('\\tan') + ' is not proportional to the angle.']
      ]);
    },
    function () {
      var a = ri(3, 12), b = ri(3, 12);
      return Q('A right-angled triangle has shorter sides ' + a + ' cm and ' + b + ' cm.', [
        ['Find the hypotenuse and both acute angles.', 3, M(sf3(Math.hypot(a, b))) + ' cm; ' + sf3(Math.atan(a / b) / R) + '° and ' + sf3(Math.atan(b / a) / R) + '°'],
        ['Find the length of the perpendicular from the right angle to the hypotenuse.', 2, M('\\frac{' + a * b + '}{' + sf3(Math.hypot(a, b)) + '} = ' + sf3(a * b / Math.hypot(a, b))) + ' cm'],
        ['Prove that ' + M('\\sin^2 x + \\cos^2 x = 1') + ' using this triangle.', 2, M('\\frac{a^2 + b^2}{c^2} = 1')]
      ]);
    },
    function () {
      var n = pick([3, 4, 5]), L = ri(10, 30);
      return Q('A ramp rises ' + n + ' m over a horizontal distance of ' + L + ' m.', [
        ['Find the angle of the ramp and its length.', 3, M(sf3(Math.atan(n / L) / R) + '°') + ', ' + sf3(Math.hypot(n, L)) + ' m'],
        ['Regulations say the angle must be at most 5°. Find the minimum horizontal distance for a rise of ' + n + ' m.', 2, M('\\frac{' + n + '}{\\tan 5°} = ' + sf3(n / Math.tan(5 * R))) + ' m'],
        ['Explain why a small change in angle makes a large difference to the length of the ramp.', 1, 'For small angles the ramp is nearly horizontal, so the run is very sensitive to the angle.']
      ]);
    },
    function () {
      var m = ri(2, 6), n = m + ri(1, 4), a = n * n - m * m, b = 2 * m * n, c = m * m + n * n;
      return Q('Pythagorean triples are whole numbers with ' + M('a^2 + b^2 = c^2') + '.', [
        ['Show that ' + M('a = n^2 - m^2') + ', ' + M('b = 2mn') + ', ' + M('c = n^2 + m^2') + ' always form a triple.', 3, M('(n^2 - m^2)^2 + 4m^2n^2 = (n^2 + m^2)^2')],
        ['Use ' + M('m = ' + m + ',\\ n = ' + n) + ' to find a triple.', 1, a + ', ' + b + ', ' + c],
        ['Explain why multiplying a triple by 3 gives another triple.', 1, 'All squares are multiplied by 9, so the equation still holds.']
      ]);
    },
    function () {
      var s = ri(4, 10), h = ri(4, 12), l = Math.sqrt(h * h + s * s / 4);
      return Q('A square-based pyramid has base side ' + s + ' cm and height ' + h + ' cm.', [
        ['Find the slant height of a triangular face.', 2, M(sf3(l)) + ' cm'],
        ['Find the total surface area.', 2, M(s * s + ' + 2 \\times ' + s + ' \\times ' + sf3(l) + ' = ' + sf3(s * s + 2 * s * l)) + ' cm²'],
        ['Find the angle between a face and the base.', 2, M(sf3(Math.atan(2 * h / s) / R) + '°')]
      ]);
    },
    function () {
      var d = ri(5, 20), b1 = ri(20, 70);
      return Q('A ship sails ' + d + ' km on a bearing of ' + b1 + '°, then ' + d + ' km due south.', [
        ['Find how far east the ship is from its start.', 2, M(sf3(d * Math.sin(b1 * R))) + ' km'],
        ['Find the distance from the start.', 3, M(sf3(Math.hypot(d * Math.sin(b1 * R), d * Math.cos(b1 * R) - d))) + ' km'],
        ['Find the bearing of the start from the ship.', 2, M(sf3((Math.atan2(-d * Math.sin(b1 * R), -(d * Math.cos(b1 * R) - d)) / R + 360) % 360) + '°')]
      ]);
    },
    function () {
      var a = ri(2, 6);
      return Q('An equilateral triangle has side ' + 2 * a + ' cm.', [
        ['Find its exact height.', 2, M(a + '\\sqrt{3}') + ' cm'],
        ['Hence find exact values of ' + M('\\sin 60°') + ', ' + M('\\cos 60°') + ' and ' + M('\\tan 30°') + '.', 3, M('\\frac{\\sqrt{3}}{2}') + ', ' + M('\\frac{1}{2}') + ', ' + M('\\frac{1}{\\sqrt{3}}')],
        ['Find the exact area.', 1, M(a * a + '\\sqrt{3}') + ' cm²']
      ]);
    }
  ]);

  X('circles', [
    function () {
      var r = ri(3, 10), t = ri(40, 150), arc = 2 * Math.PI * r * t / 360, sec = Math.PI * r * r * t / 360;
      return Q('A sector has radius ' + r + ' cm and angle ' + t + '°.', [
        ['Find its perimeter and area.', 3, M(sf3(arc + 2 * r)) + ' cm, ' + M(sf3(sec)) + ' cm²'],
        ['The sector is rolled into a cone (the two radii joined). Find the radius of the base of the cone.', 3, M('2\\pi r_c = ' + sf3(arc)) + ', ' + M('r_c = ' + sf3(r * t / 360)) + ' cm'],
        ['Find the height of the cone.', 2, M(sf3(Math.sqrt(r * r - Math.pow(r * t / 360, 2)))) + ' cm']
      ]);
    },
    function () {
      var r = ri(3, 10);
      return Q('Three circles of radius ' + r + ' cm touch each other in pairs.', [
        ['Explain why their centres form an equilateral triangle, and find its side.', 2, 'Each pair of centres is ' + 2 * r + ' cm apart'],
        ['Find the area of the gap enclosed between the three circles.', 4, M('\\sqrt{3}(' + r + ')^2 - \\frac{1}{2}\\pi(' + r + ')^2 = ' + sf3(Math.sqrt(3) * r * r - Math.PI * r * r / 2)) + ' cm²'],
        ['A band is stretched tightly around all three circles. Find its length.', 2, M(6 * r + ' + 2\\pi(' + r + ') = ' + sf3(6 * r + 2 * Math.PI * r)) + ' cm']
      ]);
    },
    function () {
      var w = ri(10, 30);
      return Q('A wheel of diameter ' + w * 2 + ' cm rolls along the ground.', [
        ['How far does it travel in one revolution?', 1, M(sf3(2 * Math.PI * w)) + ' cm'],
        ['How many complete revolutions does it make in travelling 1 km?', 2, Math.floor(100000 / (2 * Math.PI * w))],
        ['A second wheel has radius 1 cm bigger. Show that it travels ' + M('2\\pi') + ' cm further per revolution, whatever the original size.', 2, M('2\\pi(r + 1) - 2\\pi r = 2\\pi')]
      ]);
    },
    function () {
      var a = ri(4, 12);
      return Q('A square of side ' + a + ' cm has a quarter circle of radius ' + a + ' cm drawn from one corner.', [
        ['Find the area of the square not covered by the quarter circle.', 2, M(a * a + ' - \\frac{1}{4}\\pi(' + a + ')^2 = ' + sf3(a * a * (1 - Math.PI / 4))) + ' cm²'],
        ['A second quarter circle is drawn from the opposite corner. Find the area of the leaf shape where they overlap.', 3, M('2 \\times \\frac{1}{4}\\pi a^2 - a^2 = ' + sf3(a * a * (Math.PI / 2 - 1))) + ' cm²'],
        ['Find the perimeter of the leaf shape.', 2, M('2 \\times \\frac{1}{4} \\times 2\\pi(' + a + ') = ' + sf3(Math.PI * a)) + ' cm']
      ]);
    },
    function () {
      var r = ri(2, 8);
      return Q('A circle has radius ' + r + ' cm.', [
        ['Find, in terms of ' + M('\\pi') + ', its circumference and area.', 2, M(2 * r + '\\pi') + ' cm and ' + M(r * r + '\\pi') + ' cm²'],
        ['Find the radius of a circle whose area equals its circumference (numerically).', 2, M('\\pi r^2 = 2\\pi r') + ', ' + M('r = 2')],
        ['A circle’s area is ' + M('k') + ' times its circumference. Find its radius in terms of ' + M('k') + '.', 2, M('r = 2k')]
      ]);
    },
    function () {
      var r = ri(4, 10), c = ri(Math.ceil(r * 0.6), r * 2 - 1), th = 2 * Math.asin(c / (2 * r)), seg = 0.5 * r * r * (th - Math.sin(th));
      return Q('A chord of length ' + c + ' cm is drawn in a circle of radius ' + r + ' cm.', [
        ['Find the angle the chord subtends at the centre.', 3, M(sf3(th / R) + '°')],
        ['Find the area of the minor segment.', 3, M(sf3(seg)) + ' cm²'],
        ['Find the distance from the centre to the chord.', 2, M('\\sqrt{' + r * r + ' - ' + num(c * c / 4) + '} = ' + sf3(Math.sqrt(r * r - c * c / 4))) + ' cm']
      ]);
    },
    function () {
      var R1 = ri(6, 12), r1 = ri(2, R1 - 2);
      return Q('A circular path is ' + (R1 - r1) + ' m wide and surrounds a circular pond of radius ' + r1 + ' m.', [
        ['Find the area of the path.', 2, M('\\pi(' + R1 + '^2 - ' + r1 + '^2) = ' + sf3(Math.PI * (R1 * R1 - r1 * r1))) + ' m²'],
        ['The path is to be widened so that its area doubles. Find the new outer radius.', 3, M('\\pi(R^2 - ' + r1 * r1 + ') = 2\\pi(' + (R1 * R1 - r1 * r1) + ')') + ', ' + M('R = ' + sf3(Math.sqrt(2 * (R1 * R1 - r1 * r1) + r1 * r1))) + ' m']
      ]);
    },
    function () {
      var t = ri(30, 150);
      return Q('A clock’s minute hand is 12 cm long and its hour hand is 8 cm long.', [
        ['How far does the tip of the minute hand travel in ' + t + ' minutes?', 2, M(sf3(2 * Math.PI * 12 * t / 60)) + ' cm'],
        ['How far does the tip of the hour hand travel in the same time?', 2, M(sf3(2 * Math.PI * 8 * t / 720)) + ' cm'],
        ['Find the angle between the hands at 4:20.', 2, '10°']
      ]);
    }
  ]);

  X('similar-shapes', [
    function () {
      var k = ri(2, 4), V = ri(100, 500), A = ri(50, 200);
      return Q('Two similar jugs have heights in the ratio 1 : ' + k + '.', [
        ['The small jug holds ' + V + ' ml. Find the capacity of the large jug.', 2, num(V * k * k * k) + ' ml'],
        ['The large jug needs ' + A * k * k + ' cm² of glaze. How much does the small jug need?', 2, A + ' cm²'],
        ['How many small jugs can be filled from one large jug?', 1, k * k * k]
      ]);
    },
    function () {
      var a = ri(3, 8), b = ri(3, 8), k = ri(2, 4);
      return Q('Triangle ' + M('ABC') + ' has ' + M('DE') + ' parallel to ' + M('BC') + ', with ' + M('D') + ' on ' + M('AB') + ' and ' + M('E') + ' on ' + M('AC') + '. ' + M('AD = ' + a) + ' cm, ' + M('DB = ' + a * (k - 1)) + ' cm, ' + M('DE = ' + b) + ' cm.', [
        ['Find ' + M('BC') + '.', 2, M(b * k) + ' cm'],
        ['Find the ratio of the area of triangle ' + M('ADE') + ' to the area of trapezium ' + M('DBCE') + '.', 3, M('1 : ' + (k * k - 1))],
        ['Explain why the triangles are similar.', 1, 'Corresponding angles are equal (parallel lines) and they share angle ' + M('A')]
      ]);
    },
    function () {
      var s = ri(2, 4), m = ri(5, 20);
      return Q('Two similar solid statues are made of the same material. The smaller has mass ' + m + ' kg and the larger has mass ' + m * s * s * s + ' kg.', [
        ['Find the scale factor for length.', 2, s],
        ['The smaller statue is 30 cm tall. How tall is the larger?', 1, 30 * s + ' cm'],
        ['The larger needs 2 litres of paint. How much does the smaller need?', 2, sf3(2 / (s * s)) + ' litres']
      ]);
    },
    function () {
      var a = ri(3, 8), b = ri(4, 10), c = ri(3, 9);
      return Q('Rectangles A and B are similar. A is ' + a + ' cm by ' + b + ' cm, and B has longest side ' + b * c + ' cm.', [
        ['Find the other side of B.', 1, a * c + ' cm'],
        ['Find the ratio of their areas.', 1, M('1 : ' + c * c)],
        ['A third rectangle C has the same area as B but is a square. Find its side.', 2, M('\\sqrt{' + a * b * c * c + '} = ' + sf3(Math.sqrt(a * b) * c)) + ' cm']
      ]);
    },
    function () {
      var h1 = ri(10, 20), h2 = ri(4, h1 - 3), r1 = ri(4, 10);
      return Q('A cone of height ' + h1 + ' cm and base radius ' + r1 + ' cm has its top cut off ' + h2 + ' cm from the vertex.', [
        ['Find the radius of the top of the frustum.', 2, M(F(r1 * h2, h1)) + ' cm'],
        ['Find the volume of the frustum.', 3, M('\\frac{1}{3}\\pi(' + r1 + '^2)(' + h1 + ')\\left(1 - \\left(\\frac{' + h2 + '}{' + h1 + '}\\right)^3\\right) = ' + sf3(Math.PI * r1 * r1 * h1 / 3 * (1 - Math.pow(h2 / h1, 3)))) + ' cm³'],
        ['What fraction of the original cone’s volume is the frustum?', 1, M('1 - \\left(\\frac{' + h2 + '}{' + h1 + '}\\right)^3 = ' + sf3(1 - Math.pow(h2 / h1, 3)))]
      ]);
    },
    function () {
      var k = ri(2, 5);
      return Q('A photo is enlarged so that its area increases by ' + (k * k - 1) * 100 + '%.', [
        ['By what percentage does each length increase?', 2, (k - 1) * 100 + '%'],
        ['The original photo is 10 cm by 15 cm. Find the enlarged size.', 1, 10 * k + ' cm by ' + 15 * k + ' cm'],
        ['Explain why a 10% increase in length gives a 21% increase in area.', 1, M('1.1^2 = 1.21')]
      ]);
    },
    function () {
      var p = ri(3, 8), q = ri(3, 8);
      return Q('In triangle ' + M('ABC') + ', angle ' + M('C = 90°') + ' and ' + M('CD') + ' is perpendicular to ' + M('AB') + '. ' + M('AD = ' + p) + ' cm and ' + M('DB = ' + q) + ' cm.', [
        ['Prove that triangles ' + M('ACD') + ' and ' + M('CBD') + ' are similar.', 3, 'Both are right-angled and angle ' + M('ACD = CBD') + ' (each is 90° minus angle ' + M('A') + ')'],
        ['Hence show that ' + M('CD^2 = AD \\times DB') + ' and find ' + M('CD') + '.', 2, M('CD = \\sqrt{' + p * q + '} = ' + sf3(Math.sqrt(p * q))) + ' cm']
      ]);
    },
    function () {
      var k = ri(2, 3);
      return Q('A model car is made to a scale of 1 : ' + 10 * k + '.', [
        ['The real car is 4.2 m long. How long is the model?', 1, num(420 / (10 * k)) + ' cm'],
        ['The model’s windscreen has area 15 cm². Find the real windscreen area in m².', 2, num(15 * 100 * k * k / 10000) + ' m²'],
        ['The model’s fuel tank holds 0.05 litres. Find the real capacity.', 2, num(0.05 * 1000 * k * k * k) + ' litres']
      ]);
    }
  ]);

  X('volume', [
    function () {
      var r = ri(3, 8), h = ri(5, 15);
      return Q('A cylinder has radius ' + r + ' cm and height ' + h + ' cm. A cone and a hemisphere, each with the same radius, are compared.', [
        ['Find the volume of the cylinder, in terms of ' + M('\\pi') + '.', 1, M(r * r * h + '\\pi') + ' cm³'],
        ['Find the height of a cone with the same radius and volume.', 2, 3 * h + ' cm'],
        ['Find the height of a cylinder with the same radius and volume as the hemisphere.', 2, M(F(2 * r, 3)) + ' cm']
      ]);
    },
    function () {
      var a = ri(4, 10), b = ri(3, 8), c = ri(2, 6), x = ri(1, Math.min(a, b, c) - 1);
      return Q('A cuboid measures ' + a + ' by ' + b + ' by ' + c + ' cm. A cube of side ' + x + ' cm is cut from one corner.', [
        ['Find the volume and surface area of the remaining solid.', 3, (a * b * c - x * x * x) + ' cm³; ' + 2 * (a * b + b * c + a * c) + ' cm² (unchanged)'],
        ['Explain why the surface area does not change.', 2, 'Three faces of area ' + x * x + ' are removed and three equal faces are exposed.']
      ]);
    },
    function () {
      var r = ri(2, 6), n = ri(3, 8);
      return Q(n + ' ball bearings of radius ' + r + ' mm are dropped into a cylinder of radius ' + 3 * r + ' mm partly filled with water.', [
        ['Find the total volume of the bearings.', 2, M(n + ' \\times \\frac{4}{3}\\pi(' + r + ')^3 = ' + sf3(n * 4 / 3 * Math.PI * r * r * r)) + ' mm³'],
        ['Find the rise in the water level.', 3, M(sf3(n * 4 / 3 * r * r * r / (9 * r * r))) + ' mm'],
        ['Show that the rise is ' + M('\\frac{4nr}{27}') + ' mm in general.', 2, M('\\frac{\\frac{4}{3}n\\pi r^3}{9\\pi r^2}')]
      ]);
    },
    function () {
      var l = ri(10, 30), a = ri(3, 8), b = ri(5, 12), h = ri(3, 8);
      return Q('A trough is a prism ' + l + ' cm long. Its cross-section is a trapezium with parallel sides ' + a + ' cm (bottom) and ' + b + ' cm (top), and depth ' + h + ' cm.', [
        ['Find the volume.', 2, M(num((a + b) * h / 2 * l)) + ' cm³'],
        ['Water is poured in to half the depth. Find the width of the water surface.', 2, M(num((a + b) / 2)) + ' cm'],
        ['What fraction of the trough is full? Explain why it is less than a half.', 3, M(F(3 * a + b, 4 * (a + b))) + ': the lower half of the trough is narrower than the upper half']
      ]);
    },
    function () {
      var r = ri(5, 15), h = ri(10, 25);
      return Q('A cone has radius ' + r + ' cm and height ' + h + ' cm.', [
        ['Find its slant height and curved surface area.', 3, M(sf3(Math.hypot(r, h))) + ' cm; ' + M(sf3(Math.PI * r * Math.hypot(r, h))) + ' cm²'],
        ['Find the height of a cylinder with the same radius and the same volume.', 2, M(F(h, 3)) + ' cm'],
        ['The cone is filled with water to half its height. What fraction of its volume is filled?', 2, M('\\frac{1}{8}')]
      ]);
    },
    function () {
      var V = pick([1000, 2000, 500]), r = Math.cbrt(V / (2 * Math.PI));
      return Q('A can must hold ' + V + ' cm³.', [
        ['Express the height ' + M('h') + ' in terms of the radius ' + M('r') + '.', 1, M('h = \\frac{' + V + '}{\\pi r^2}')],
        ['Show that the total surface area is ' + M('2\\pi r^2 + \\frac{' + 2 * V + '}{r}') + '.', 2, M('2\\pi r^2 + 2\\pi rh')],
        ['By trying values (or calculus), find the radius that uses the least material.', 3, M('r \\approx ' + sf3(r)) + ' cm (when ' + M('h = 2r') + ')']
      ]);
    },
    function () {
      var a = ri(4, 10);
      return Q('A cube of side ' + a + ' cm has a cylindrical hole of radius ' + num(a / 4) + ' cm drilled through the centre of two opposite faces.', [
        ['Find the volume remaining.', 3, M(a * a * a + ' - \\pi(' + num(a / 4) + ')^2(' + a + ') = ' + sf3(a * a * a - Math.PI * a * a * a / 16)) + ' cm³'],
        ['Find the total surface area of the solid.', 3, M('6(' + a * a + ') - 2\\pi(' + num(a / 4) + ')^2 + 2\\pi(' + num(a / 4) + ')(' + a + ') = ' + sf3(6 * a * a - 2 * Math.PI * a * a / 16 + 2 * Math.PI * a / 4 * a)) + ' cm²']
      ]);
    },
    function () {
      var r = ri(3, 8);
      return Q('A sphere, a cylinder and a cone all have radius ' + r + ' cm and height ' + 2 * r + ' cm (the sphere has diameter ' + 2 * r + ').', [
        ['Find the ratio of their volumes, cone : sphere : cylinder.', 3, M('1 : 2 : 3')],
        ['Explain why this ratio does not depend on ' + M('r') + '.', 1, 'Each volume is a multiple of ' + M('\\pi r^3')],
        ['Show that the curved surface area of the sphere equals that of the cylinder.', 2, M('4\\pi r^2 = 2\\pi r(2r)')]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
