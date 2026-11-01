/* Byte Size Classroom — deeper extension questions (set 3e): GCSE / International GCSE geometry (part 2) and statistics. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, sg = BS.sg, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: p[2] }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function vec(a, b) { return '\\begin{pmatrix}' + a + '\\\\' + b + '\\end{pmatrix}'; }
  var R = Math.PI / 180;

  X('vectors', [
    function () {
      var k = ri(2, 4);
      return Q(M('OAB') + ' is a triangle with ' + M('\\vec{OA} = \\mathbf{a}') + ' and ' + M('\\vec{OB} = \\mathbf{b}') + '. ' + M('M') + ' is the midpoint of ' + M('AB') + ' and ' + M('P') + ' divides ' + M('OM') + ' in the ratio ' + M((k - 1) + ' : 1') + '.', [
        ['Find ' + M('\\vec{OM}') + ' in terms of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + '.', 1, M('\\frac{1}{2}(\\mathbf{a} + \\mathbf{b})')],
        ['Find ' + M('\\vec{OP}') + ' and ' + M('\\vec{AP}') + '.', 2, M('\\vec{OP} = ' + F(k - 1, 2 * k) + '(\\mathbf{a} + \\mathbf{b})') + ', ' + M('\\vec{AP} = \\vec{OP} - \\mathbf{a}')],
        ['For which value of the ratio does ' + M('P') + ' lie on the line from ' + M('A') + ' to the midpoint of ' + M('OB') + '? Explain.', 3, M('2 : 1') + ' — ' + M('P') + ' is then the centroid, where the medians meet']
      ]);
    },
    function () {
      var a = nz(-5, 5), b = nz(-5, 5), c = nz(-5, 5), d = nz(-5, 5);
      return Q(M('\\mathbf{p} = ' + vec(a, b)) + ' and ' + M('\\mathbf{q} = ' + vec(c, d)) + '.', [
        ['Find ' + M('2\\mathbf{p} - 3\\mathbf{q}') + ' and its magnitude.', 2, M(vec(2 * a - 3 * c, 2 * b - 3 * d)) + ', ' + M(sf3(Math.hypot(2 * a - 3 * c, 2 * b - 3 * d)))],
        ['Find the scalars ' + M('s') + ' and ' + M('t') + ' so that ' + M('s\\mathbf{p} + t\\mathbf{q} = ' + vec(a + c, b + d)) + '.', 2, M('s = 1,\\ t = 1')],
        ['Explain why ' + M('\\mathbf{p}') + ' and ' + M('\\mathbf{q}') + ' are ' + (a * d === b * c ? '' : 'not ') + 'parallel.', 1, a * d === b * c ? 'One is a multiple of the other.' : 'Neither is a scalar multiple of the other: ' + M(a + '\\times' + d + ' \\ne ' + b + '\\times' + c)]
      ]);
    },
    function () {
      return Q(M('ABCD') + ' is a quadrilateral. ' + M('P, Q, R, S') + ' are the midpoints of ' + M('AB, BC, CD, DA') + '.', [
        ['Let ' + M('\\vec{AB} = \\mathbf{p}') + ', ' + M('\\vec{BC} = \\mathbf{q}') + ', ' + M('\\vec{CD} = \\mathbf{r}') + '. Find ' + M('\\vec{PQ}') + ' and ' + M('\\vec{SR}') + '.', 3, M('\\vec{PQ} = \\frac{1}{2}(\\mathbf{p} + \\mathbf{q})') + '; ' + M('\\vec{SR} = \\frac{1}{2}\\vec{AC} = \\frac{1}{2}(\\mathbf{p} + \\mathbf{q})')],
        ['Hence prove that ' + M('PQRS') + ' is always a parallelogram.', 2, M('\\vec{PQ} = \\vec{SR}') + ', so one pair of opposite sides is equal and parallel']
      ]);
    },
    function () {
      var a = ri(1, 4);
      return Q(M('\\vec{OA} = \\mathbf{a}') + ', ' + M('\\vec{OB} = \\mathbf{b}') + '. ' + M('C') + ' is the point with ' + M('\\vec{OC} = ' + (a + 1) + '\\mathbf{a} - ' + a + '\\mathbf{b}') + '.', [
        ['Find ' + M('\\vec{AB}') + ' and ' + M('\\vec{BC}') + '.', 2, M('\\vec{AB} = \\mathbf{b} - \\mathbf{a}') + ', ' + M('\\vec{BC} = ' + (a + 1) + '(\\mathbf{a} - \\mathbf{b})')],
        ['Prove that ' + M('A, B, C') + ' are collinear and find the ratio ' + M('AB : BC') + '.', 3, M('\\vec{BC} = -' + (a + 1) + '\\vec{AB}') + '; ratio ' + M('1 : ' + (a + 1)) + ' (C is on the other side of A)'],
        ['Explain what “collinear” requires in vector terms.', 1, 'Two vectors are multiples of each other and share a point.']
      ]);
    },
    function () {
      var a = nz(-4, 4), b = nz(-4, 4), k = ri(2, 4);
      return Q('A particle starts at ' + M('(1, 2)') + ' and moves with velocity ' + M(vec(a, b)) + ' per second.', [
        ['Find its position after ' + k + ' seconds.', 1, M('(' + (1 + k * a) + ', ' + (2 + k * b) + ')')],
        ['Find its speed.', 1, M(sf3(Math.hypot(a, b))) + ' units per second'],
        ['Find the position vector after ' + M('t') + ' seconds, and decide whether it passes through ' + M('(' + (1 + 5 * a) + ', ' + (2 + 5 * b + 1) + ')') + '.', 2, M(vec('1 ' + sg(a) + 't', '2 ' + sg(b) + 't')) + '; no — at ' + M('t = 5') + ' the y-coordinate is ' + (2 + 5 * b)]
      ]);
    },
    function () {
      var p = ri(1, 3), q = ri(1, 3);
      return Q('In triangle ' + M('OAB') + ', ' + M('\\vec{OA} = \\mathbf{a}') + ' and ' + M('\\vec{OB} = \\mathbf{b}') + '. ' + M('X') + ' lies on ' + M('AB') + ' with ' + M('AX : XB = ' + p + ' : ' + q) + '.', [
        ['Show that ' + M('\\vec{OX} = \\frac{' + q + '\\mathbf{a} + ' + p + '\\mathbf{b}}{' + (p + q) + '}') + '.', 3, M('\\mathbf{a} + \\frac{' + p + '}{' + (p + q) + '}(\\mathbf{b} - \\mathbf{a})')],
        ['Explain why the coefficients of ' + M('\\mathbf{a}') + ' and ' + M('\\mathbf{b}') + ' always add to 1 for a point on ' + M('AB') + '.', 2, M('\\vec{OX} = (1 - \\lambda)\\mathbf{a} + \\lambda\\mathbf{b}')]
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(2, 6);
      return Q('A boat heads due north at ' + a + ' m/s across a river flowing due east at ' + b + ' m/s.', [
        ['Write the resultant velocity as a column vector and find its speed.', 2, M(vec(b, a)) + ', ' + M(sf3(Math.hypot(a, b))) + ' m/s'],
        ['Find the bearing of the boat’s actual path.', 2, M(sf3(Math.atan(b / a) / R) + '°')],
        ['The river is 60 m wide. How far downstream does the boat land?', 2, M(num(60 * b / a)) + ' m']
      ]);
    },
    function () {
      return Q(M('OABC') + ' is a parallelogram with ' + M('\\vec{OA} = \\mathbf{a}') + ' and ' + M('\\vec{OC} = \\mathbf{c}') + '. The diagonals meet at ' + M('M') + '.', [
        ['Find ' + M('\\vec{OB}') + ' and ' + M('\\vec{AC}') + '.', 2, M('\\mathbf{a} + \\mathbf{c}') + ', ' + M('\\mathbf{c} - \\mathbf{a}')],
        ['Using ' + M('\\vec{OM} = \\lambda\\vec{OB}') + ' and ' + M('\\vec{OM} = \\mathbf{a} + \\mu\\vec{AC}') + ', prove the diagonals bisect each other.', 4, 'Comparing coefficients: ' + M('\\lambda = 1 - \\mu') + ' and ' + M('\\lambda = \\mu') + ', so ' + M('\\lambda = \\mu = \\frac{1}{2}')]
      ]);
    }
  ]);

  X('transformations', [
    function () {
      var a = nz(-4, 4), b = nz(-4, 4);
      return Q('Point ' + M('P(' + a + ', ' + b + ')') + ' is reflected in the line ' + M('y = x') + ' and then in the ' + M('x') + '-axis.', [
        ['Find the final image.', 2, M('(' + b + ', ' + (-a) + ')')],
        ['Describe fully the single transformation equivalent to these two reflections.', 2, 'Rotation 90° clockwise about the origin'],
        ['Does the order matter? Test by doing them the other way round.', 2, 'Yes: the other order gives ' + M('(' + (-b) + ', ' + a + ')') + ', a 90° anticlockwise rotation']
      ]);
    },
    function () {
      var k = pick([-2, -3, 2, 3]), a = ri(1, 4), b = ri(1, 4);
      return Q('Triangle T has vertices ' + M('(1, 1), (' + (1 + a) + ', 1), (1, ' + (1 + b) + ')') + '.', [
        ['Enlarge T by scale factor ' + k + ', centre the origin. Give the new vertices.', 2, M('(' + k + ', ' + k + '), (' + k * (1 + a) + ', ' + k + '), (' + k + ', ' + k * (1 + b) + ')')],
        ['Find the ratio of the areas of T and its image.', 1, M('1 : ' + k * k)],
        ['Describe ' + (k < 0 ? 'what the negative scale factor does' : 'the effect of scale factor ' + M(F(1, k))) + '.', 1, k < 0 ? 'The image is on the opposite side of the centre and is inverted (equivalent to a 180° rotation as well).' : 'The shape shrinks to ' + M(F(1, k)) + ' of the size, towards the centre']
      ]);
    },
    function () {
      var a = ri(1, 5), b = ri(1, 5);
      return Q('A shape is rotated 180° about ' + M('(' + a + ', ' + b + ')') + '.', [
        ['Where does the point ' + M('(0, 0)') + ' go?', 2, M('(' + 2 * a + ', ' + 2 * b + ')')],
        ['Show that a rotation of 180° about ' + M('(a, b)') + ' sends ' + M('(x, y)') + ' to ' + M('(2a - x, 2b - y)') + '.', 2, 'The centre is the midpoint of each point and its image.'],
        ['Show that two 180° rotations about different centres give a translation, and find it for centres ' + M('(0, 0)') + ' and ' + M('(' + a + ', ' + b + ')') + '.', 3, 'Translation by ' + M(vec(2 * a, 2 * b))]
      ]);
    },
    function () {
      var c = nz(-4, 4);
      return Q('A shape is reflected in the line ' + M('x = ' + c) + ' and then in the line ' + M('x = ' + (c + 3)) + '.', [
        ['Find the image of ' + M('(0, 2)') + '.', 2, M('(6, 2)')],
        ['Describe the single transformation.', 2, 'Translation by ' + M(vec(6, 0))],
        ['Explain why reflecting in two parallel lines a distance ' + M('d') + ' apart gives a translation of ' + M('2d') + '.', 2, M('x \\to 2c - x \\to 2(c + d) - (2c - x) = x + 2d')]
      ]);
    },
    function () {
      var a = nz(-5, 5), b = nz(-5, 5);
      return Q('Under a transformation, ' + M('(1, 0) \\to (0, 1)') + ' and ' + M('(0, 1) \\to (-1, 0)') + ', and the origin is fixed.', [
        ['Identify the transformation.', 2, 'Rotation 90° anticlockwise about the origin'],
        ['Find the image of ' + M('(' + a + ', ' + b + ')') + '.', 1, M('(' + (-b) + ', ' + a + ')')],
        ['Find the image after applying it four times, and explain.', 1, 'Back to ' + M('(' + a + ', ' + b + ')') + ': four 90° turns make 360°']
      ]);
    },
    function () {
      var k = ri(2, 3), cx = ri(1, 4), cy = ri(1, 4), x = ri(1, 5), y = ri(1, 5);
      return Q('A point ' + M('A(' + (cx + x) + ', ' + (cy + y) + ')') + ' is enlarged with scale factor ' + k + ' about centre ' + M('C(' + cx + ', ' + cy + ')') + '.', [
        ['Find the image ' + M('A’') + '.', 2, M('(' + (cx + k * x) + ', ' + (cy + k * y) + ')')],
        ['Show that ' + M('C, A, A’') + ' are collinear and find ' + M('CA : CA’') + '.', 2, M('\\vec{CA’} = ' + k + '\\vec{CA}') + '; ratio ' + M('1 : ' + k)],
        ['Given a shape and its image, explain how to find the centre of enlargement.', 2, 'Join corresponding points and extend the lines; they meet at the centre.']
      ]);
    },
    function () {
      return Q('Which transformations preserve each property? Consider translation, rotation, reflection and enlargement.', [
        ['Lengths', 1, 'Translation, rotation, reflection'],
        ['Angles', 1, 'All four'],
        ['Orientation (clockwise order of vertices)', 2, 'Translation, rotation, enlargement (reflection reverses it)'],
        ['Which pairs of shapes are congruent, and which only similar?', 1, 'Images under the first three are congruent; under enlargement only similar']
      ]);
    },
    function () {
      var a = nz(-3, 3), b = nz(-3, 3), c = nz(-3, 3), d = nz(-3, 3);
      return Q('Shape S is translated by ' + M(vec(a, b)) + ' and then by ' + M(vec(c, d)) + '.', [
        ['Find the single translation.', 1, M(vec(a + c, b + d))],
        ['What translation returns the shape to its start?', 1, M(vec(-(a + c), -(b + d)))],
        ['S is translated by ' + M(vec(a, b)) + ' and then reflected in the ' + M('y') + '-axis. Is this the same as reflecting first? Explain.', 2, 'No: reflecting first gives a translation of ' + M(vec(a, b)) + ' after, while reflecting second reverses the x-shift (they differ by ' + M(vec(2 * a, 0)) + ')']
      ]);
    }
  ]);

  X('sine-cosine', [
    function () {
      var a = ri(5, 12), b = ri(5, 12), C = ri(30, 120), c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * R));
      return Q('Two ships leave port. One travels ' + a + ' km and the other ' + b + ' km, on paths ' + C + '° apart.', [
        ['Find the distance between them.', 3, M(sf3(c)) + ' km'],
        ['Find the area of the triangle formed with the port.', 2, M(sf3(0.5 * a * b * Math.sin(C * R))) + ' km²'],
        ['Find the shortest distance from the port to the line joining the ships.', 2, M(sf3(a * b * Math.sin(C * R) / c)) + ' km']
      ]);
    },
    function () {
      var a = ri(6, 10), b = ri(a + 1, a + 4), A = ri(25, 35);
      var s = b * Math.sin(A * R) / a;
      var B1 = Math.asin(s) / R, B2 = 180 - B1;
      return Q('In triangle ' + M('ABC') + ', ' + M('a = ' + a) + ' cm, ' + M('b = ' + b) + ' cm and angle ' + M('A = ' + A + '°') + '.', [
        ['Find the two possible values of angle ' + M('B') + '.', 3, M(sf3(B1) + '°') + ' or ' + M(sf3(B2) + '°')],
        ['Explain geometrically why two triangles are possible.', 2, 'The side ' + M('a') + ' can swing to meet the base line at two different points.'],
        ['Find the difference between the two possible lengths of ' + M('c') + '.', 3, M(sf3(Math.abs(a * Math.sin((180 - A - B1) * R) - a * Math.sin((180 - A - B2) * R)) / Math.sin(A * R))) + ' cm']
      ]);
    },
    function () {
      var a = ri(4, 9), b = ri(4, 9), c = ri(Math.abs(a - b) + 2, a + b - 2);
      var C = Math.acos((a * a + b * b - c * c) / (2 * a * b)) / R;
      var s = [a, b, c].sort(function (x, y) { return x - y; }), dd = s[0] * s[0] + s[1] * s[1] - s[2] * s[2];
      var big = Math.acos(dd / (2 * s[0] * s[1])) / R;
      return Q('A triangle has sides ' + a + ' cm, ' + b + ' cm and ' + c + ' cm.', [
        ['Find the largest angle, explaining which side it is opposite.', 3, M(sf3(big) + '°') + ', opposite the longest side (' + s[2] + ' cm)'],
        ['Find the area.', 2, M(sf3(0.5 * a * b * Math.sin(C * R))) + ' cm²'],
        ['Without calculating an angle, decide whether the triangle is acute, right-angled or obtuse.', 2, dd > 0 ? 'Acute: ' + M(s[0] * s[0] + ' + ' + s[1] * s[1] + ' > ' + s[2] * s[2]) : dd === 0 ? 'Right-angled: ' + M(s[0] * s[0] + ' + ' + s[1] * s[1] + ' = ' + s[2] * s[2]) : 'Obtuse: ' + M(s[0] * s[0] + ' + ' + s[1] * s[1] + ' < ' + s[2] * s[2])]
      ]);
    },
    function () {
      var d = ri(50, 200), a1 = ri(20, 35), a2 = a1 + ri(10, 20);
      var h = d * Math.sin(a1 * R) * Math.sin(a2 * R) / Math.sin((a2 - a1) * R);
      return Q('From point ' + M('A') + ', the angle of elevation of a cliff top is ' + a1 + '°. From ' + M('B') + ', ' + d + ' m closer, it is ' + a2 + '°.', [
        ['Find the distance from ' + M('B') + ' to the cliff top, using the sine rule.', 3, M(sf3(d * Math.sin(a1 * R) / Math.sin((a2 - a1) * R))) + ' m'],
        ['Find the height of the cliff.', 2, M(sf3(h)) + ' m'],
        ['Why can you not use right-angled trigonometry directly from the information given?', 1, 'The distance to the foot of the cliff is unknown; only the gap between A and B is given.']
      ]);
    },
    function () {
      var a = ri(5, 12), b = ri(5, 12), C = ri(40, 140);
      return Q('Two sides of a triangle are ' + a + ' cm and ' + b + ' cm.', [
        ['Find the area if the angle between them is ' + C + '°.', 2, M(sf3(0.5 * a * b * Math.sin(C * R))) + ' cm²'],
        ['Find the other angle that gives the same area.', 1, (180 - C) + '°'],
        ['What is the largest possible area, and for what angle?', 2, M(num(a * b / 2)) + ' cm² at 90°']
      ]);
    },
    function () {
      var a = ri(5, 15), b = ri(5, 15), B1 = ri(20, 80), B2 = B1 + ri(60, 120);
      var dx = b * Math.sin(B2 * R) - a * Math.sin(B1 * R), dy = b * Math.cos(B2 * R) - a * Math.cos(B1 * R);
      return Q('From a lighthouse, buoy ' + M('P') + ' is ' + a + ' km away on a bearing of ' + B1 + '°, and buoy ' + M('Q') + ' is ' + b + ' km away on a bearing of ' + B2 + '°.', [
        ['Find the angle ' + M('PLQ') + ' at the lighthouse.', 1, (B2 - B1) + '°'],
        ['Find the distance ' + M('PQ') + '.', 3, M(sf3(Math.hypot(dx, dy))) + ' km'],
        ['Find the bearing of ' + M('Q') + ' from ' + M('P') + '.', 3, M(sf3((Math.atan2(dx, dy) / R + 360) % 360) + '°')]
      ]);
    },
    function () {
      var r = ri(5, 10), n = pick([5, 6, 8, 10]);
      return Q('A regular ' + n + '-sided polygon is drawn inside a circle of radius ' + r + ' cm (all vertices on the circle).', [
        ['Find the length of one side, using the cosine rule.', 2, M(sf3(2 * r * Math.sin(Math.PI / n))) + ' cm'],
        ['Find the area of the polygon.', 2, M(sf3(n * 0.5 * r * r * Math.sin(2 * Math.PI / n))) + ' cm²'],
        ['What percentage of the circle is covered?', 1, sf3(100 * n * 0.5 * Math.sin(2 * Math.PI / n) / Math.PI) + '%']
      ]);
    },
    function () {
      return Q('Prove the sine rule.', [
        ['In triangle ' + M('ABC') + ', drop a perpendicular of length ' + M('h') + ' from ' + M('C') + ' to ' + M('AB') + '. Write ' + M('h') + ' in two ways.', 2, M('h = b\\sin A = a\\sin B')],
        ['Hence show that ' + M('\\frac{a}{\\sin A} = \\frac{b}{\\sin B}') + '.', 1, 'Divide by ' + M('\\sin A\\sin B')],
        ['Use the same perpendicular to show that the area is ' + M('\\frac{1}{2}ab\\sin C') + ' (dropping it from another vertex).', 2, 'Area ' + M('= \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2}a(b\\sin C)')]
      ]);
    }
  ]);

  X('circle-theorems', [
    function () {
      var x = ri(25, 70);
      return Q(M('A, B, C, D') + ' lie on a circle centre ' + M('O') + '. Angle ' + M('ABD = ' + x + '°') + '.', [
        ['Find angle ' + M('ACD') + ' and angle ' + M('AOD') + ', giving reasons.', 2, x + '° (same segment) and ' + 2 * x + '° (angle at centre)'],
        ['Find angle ' + M('OAD') + '.', 2, (90 - x) + '° (isosceles triangle ' + M('OAD') + ')'],
        ['Prove that the angle at the centre is twice the angle at the circumference.', 3, 'Join the circumference point to ' + M('O') + ' and extend; use isosceles triangles and exterior angles.']
      ]);
    },
    function () {
      var x = ri(50, 110), y = ri(50, 110);
      return Q(M('ABCD') + ' is a cyclic quadrilateral. Angle ' + M('A = ' + x + '°') + ' and angle ' + M('B = ' + y + '°') + '.', [
        ['Find angles ' + M('C') + ' and ' + M('D') + '.', 2, (180 - x) + '° and ' + (180 - y) + '°'],
        ['Side ' + M('DC') + ' is extended to ' + M('E') + '. Find angle ' + M('BCE') + '.', 1, x + '° (exterior angle equals interior opposite angle)'],
        ['Prove that opposite angles of a cyclic quadrilateral add to 180°.', 3, 'The angles at the centre on the two arcs add to 360°, and each opposite angle is half of one of them.']
      ]);
    },
    function () {
      var x = ri(20, 70);
      return Q('A tangent touches a circle at ' + M('T') + '. A chord ' + M('TA') + ' makes an angle of ' + x + '° with the tangent.', [
        ['Find the angle subtended by ' + M('TA') + ' at any point ' + M('B') + ' on the major arc.', 1, x + '° (alternate segment theorem)'],
        ['Find angle ' + M('TOA') + ', where ' + M('O') + ' is the centre.', 1, 2 * x + '°'],
        ['Prove the alternate segment theorem, using the radius ' + M('OT') + ' and the isosceles triangle ' + M('OTA') + '.', 3, 'Angle ' + M('OTA = 90 - x') + ', so ' + M('TOA = 2x') + ', and the angle at the circumference is ' + M('x')]
      ]);
    },
    function () {
      var r = ri(5, 13), d = r + ri(3, 10), t = Math.sqrt(d * d - r * r);
      return Q('Point ' + M('P') + ' is ' + d + ' cm from the centre of a circle of radius ' + r + ' cm. Two tangents are drawn from ' + M('P') + '.', [
        ['Find the length of each tangent.', 2, M(sf3(t)) + ' cm'],
        ['Find the angle between the tangents.', 2, M(sf3(2 * Math.asin(r / d) / R) + '°')],
        ['Prove the two tangents are equal in length.', 2, 'The triangles ' + M('OPA') + ' and ' + M('OPB') + ' are congruent (RHS).']
      ]);
    },
    function () {
      var x = ri(20, 40);
      return Q(M('AB') + ' is a diameter of a circle. ' + M('C') + ' is on the circle with angle ' + M('CAB = ' + x + '°') + '.', [
        ['Find angle ' + M('ABC') + '.', 1, (90 - x) + '°'],
        ['The tangent at ' + M('C') + ' meets ' + M('AB') + ' extended at ' + M('T') + '. Find angle ' + M('BCT') + '.', 2, x + '° (alternate segment)'],
        ['Find angle ' + M('CTB') + '.', 2, (90 - 2 * x) + '°']
      ]);
    },
    function () {
      return Q('Points ' + M('A, B, C') + ' lie on a circle with ' + M('AB') + ' a diameter.', [
        ['Use the centre ' + M('O') + ' and two isosceles triangles to prove angle ' + M('ACB = 90°') + '.', 3, 'Angles ' + M('OAC = OCA = p') + ', ' + M('OBC = OCB = q') + '; ' + M('2p + 2q = 180') + ', so ' + M('p + q = 90')],
        ['Hence explain how to find the centre of a circular plate using only a set square.', 2, 'Place the right angle on the edge: the two sides meet the circle at the ends of a diameter. Do this twice; diameters cross at the centre.']
      ]);
    },
    function () {
      var x = ri(30, 60), y = ri(30, 60);
      return Q('Chords ' + M('AC') + ' and ' + M('BD') + ' of a circle cross at ' + M('X') + '. Angle ' + M('BAC = ' + x + '°') + ' and angle ' + M('ACD = ' + y + '°') + '.', [
        ['Find angle ' + M('BDC') + ' and angle ' + M('ABD') + '.', 2, x + '° and ' + y + '° (same segment)'],
        ['Find angle ' + M('AXB') + '.', 2, (180 - x - y) + '°'],
        ['Explain why triangles ' + M('ABX') + ' and ' + M('DCX') + ' are similar.', 1, 'Their angles are equal in pairs (angles in the same segment, vertically opposite)']
      ]);
    },
    function () {
      var x = ri(36, 45), p = ri(5, 20), q = 5 * x + p - 180;
      return Q(M('ABCD') + ' is a cyclic quadrilateral with angle ' + M('A = (2x + ' + p + ')°') + ' and angle ' + M('C = (3x - ' + q + ')°') + '.', [
        ['Find ' + M('x') + ' and the size of angle ' + M('A') + '.', 2, M('(2x + ' + p + ') + (3x - ' + q + ') = 180') + ', ' + M('x = ' + x) + ', angle ' + M('A = ' + (2 * x + p) + '°')],
        ['Angle ' + M('B') + ' is ' + M('(x + ' + (p + 10) + ')°') + '. Find angle ' + M('D') + '.', 1, (180 - x - p - 10) + '°'],
        ['Explain why a rectangle is always cyclic but a non-square rhombus never is.', 2, 'Opposite angles of a rectangle add to 180°; a non-square rhombus has equal opposite angles that are not 90°, so they cannot add to 180°']
      ]);
    }
  ]);

  X('intersecting-chords', [
    function () {
      var a = ri(2, 8), b = ri(2, 8), c = pick([1, 2, 4].filter(function (v) { return (a * b) % v === 0; }));
      return Q('Two chords cross inside a circle. One is split into ' + a + ' cm and ' + b + ' cm; the other has one part of ' + c + ' cm.', [
        ['Find the other part.', 2, M(num(a * b / c)) + ' cm'],
        ['Prove the intersecting chords theorem using similar triangles.', 3, 'Angles in the same segment make the two triangles similar, so ' + M('\\frac{a}{c} = \\frac{d}{b}')],
        ['Which chord is longer?', 1, (a + b) > (c + a * b / c) ? 'The first' : (a + b) < (c + a * b / c) ? 'The second' : 'They are equal']
      ]);
    },
    function () {
      var r = ri(5, 13), d = ri(1, r - 1);
      return Q('A chord passes through a point ' + d + ' cm from the centre of a circle of radius ' + r + ' cm, at right angles to the diameter through that point.', [
        ['Use the intersecting chords theorem on the diameter to find the length of the chord.', 3, M('h^2 = (' + r + ' - ' + d + ')(' + r + ' + ' + d + ') = ' + (r * r - d * d)) + ', chord ' + M('= 2\\sqrt{' + (r * r - d * d) + '} = ' + sf3(2 * Math.sqrt(r * r - d * d))) + ' cm'],
        ['Check your answer using Pythagoras.', 1, M('h^2 + ' + d + '^2 = ' + r + '^2')]
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(3, 9), t = Math.sqrt(a * (a + b));
      return Q('From an external point ' + M('P') + ', a secant meets a circle at ' + M('A') + ' and ' + M('B') + ' with ' + M('PA = ' + a) + ' cm and ' + M('AB = ' + b) + ' cm. A tangent from ' + M('P') + ' touches at ' + M('T') + '.', [
        ['Find ' + M('PT') + '.', 2, M('\\sqrt{' + a * (a + b) + '} = ' + sf3(t)) + ' cm'],
        ['Another secant from ' + M('P') + ' has ' + M('PC = ' + (a + 1)) + ' cm. Find ' + M('PD') + '.', 2, M(sf3(a * (a + b) / (a + 1))) + ' cm'],
        ['Prove ' + M('PT^2 = PA \\times PB') + ' using similar triangles ' + M('PTA') + ' and ' + M('PBT') + '.', 3, 'They share angle ' + M('P') + ' and angle ' + M('PTA = PBT') + ' (alternate segment)']
      ]);
    },
    function () {
      var w = ri(4, 12) * 2, h = ri(2, 5);
      var r = (w * w / 4 + h * h) / (2 * h);
      return Q('An arch is part of a circle. It is ' + w + ' m wide at its base and ' + h + ' m high in the middle.', [
        ['Use intersecting chords to find the diameter of the circle.', 3, M(num(w / 2) + ' \\times ' + num(w / 2) + ' = ' + h + '(D - ' + h + ')') + ', ' + M('D = ' + sf3(2 * r)) + ' m'],
        ['Find the radius and the height of the centre above the base.', 2, M('r = ' + sf3(r)) + ' m; centre ' + sf3(Math.abs(r - h)) + ' m ' + (r > h ? 'below' : 'above') + ' the base'],
        ['Find the height of the arch 1 m from one end.', 3, M(sf3(Math.sqrt(r * r - Math.pow(w / 2 - 1, 2)) - (r - h))) + ' m']
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(2, 6), c = ri(2, 6), d = ri(2, 6);
      var cyc = a * b === c * d;
      return Q('Two line segments ' + M('AB') + ' and ' + M('CD') + ' cross at ' + M('X') + ' with ' + M('AX = ' + a + ', XB = ' + b + ', CX = ' + c + ', XD = ' + d) + '.', [
        ['Decide whether ' + M('A, B, C, D') + ' lie on a circle. Explain.', 2, cyc ? 'Yes: ' + M(a + '\\times' + b + ' = ' + c + '\\times' + d) : 'No: ' + M(a + '\\times' + b + ' \\ne ' + c + '\\times' + d)],
        ['Find the value of ' + M('XD') + ' that would make them concyclic.', 1, M(F(a * b, c))]
      ]);
    },
    function () {
      var r = ri(5, 10), p = ri(1, r - 1);
      return Q('Point ' + M('P') + ' is ' + p + ' cm from the centre of a circle of radius ' + r + ' cm. Chords are drawn through ' + M('P') + '.', [
        ['Show that the product of the two parts of every chord through ' + M('P') + ' is ' + (r * r - p * p) + ' cm².', 2, 'Use the diameter through ' + M('P') + ': ' + M('(' + r + ' - ' + p + ')(' + r + ' + ' + p + ')')],
        ['Find the shortest chord through ' + M('P') + '.', 2, M('2\\sqrt{' + (r * r - p * p) + '} = ' + sf3(2 * Math.sqrt(r * r - p * p))) + ' cm (perpendicular to the diameter)'],
        ['Explain why it is the shortest.', 1, 'For a fixed product, the sum of the parts is smallest when they are equal.']
      ]);
    },
    function () {
      var a = ri(3, 8), x = ri(2, 6);
      return Q('Two chords cross. One has parts ' + M('x') + ' and ' + M('x + ' + a) + '; the other has parts ' + M('2') + ' and ' + M(num(x * (x + a) / 2)) + '.', [
        ['Form an equation for ' + M('x') + '.', 1, M('x(x + ' + a + ') = ' + x * (x + a))],
        ['Solve it, and explain why only one solution is valid.', 3, M('x = ' + x) + ' or ' + M('x = ' + (-x - a)) + '; a length cannot be negative']
      ]);
    },
    function () {
      var t = ri(4, 10), a = pick([1, 2, 4, 5].filter(function (v) { return (t * t) % v === 0 && v < t; }));
      return Q('A tangent from ' + M('P') + ' has length ' + t + ' cm. A line from ' + M('P') + ' through the centre meets the circle first at a distance of ' + a + ' cm.', [
        ['Find the diameter of the circle.', 3, M(num(t * t / a - a)) + ' cm'],
        ['Find the distance from ' + M('P') + ' to the centre.', 1, M(num((t * t / a + a) / 2)) + ' cm']
      ]);
    }
  ]);

  X('kinematic-graphs', [
    function () {
      var u = ri(0, 5), v = ri(10, 20), t1 = ri(4, 8), t2 = ri(5, 10), t3 = ri(3, 6);
      var d = (u + v) / 2 * t1 + v * t2 + v / 2 * t3;
      return Q('A car accelerates uniformly from ' + u + ' m/s to ' + v + ' m/s in ' + t1 + ' s, travels at ' + v + ' m/s for ' + t2 + ' s, then decelerates to rest in ' + t3 + ' s.', [
        ['Find the total distance travelled.', 3, M(num(d)) + ' m'],
        ['Find the average speed for the journey.', 1, M(sf3(d / (t1 + t2 + t3))) + ' m/s'],
        ['How long would the journey take at a constant ' + v + ' m/s for the same distance? Explain the difference.', 2, M(sf3(d / v)) + ' s; time is lost while speeding up and slowing down']
      ]);
    },
    function () {
      var a = ri(1, 3), T = ri(4, 8);
      return Q('A speed–time graph for a particle is ' + M('v = ' + a + 't') + ' for ' + M('0 \\le t \\le ' + T) + '.', [
        ['Find the acceleration and the distance travelled.', 2, a + ' m/s², ' + num(a * T * T / 2) + ' m'],
        ['Find the time at which the particle has gone half the total distance.', 3, M('t = \\frac{' + T + '}{\\sqrt{2}} = ' + sf3(T / Math.SQRT2)) + ' s'],
        ['Explain why this is not ' + num(T / 2) + ' s.', 1, 'It is moving faster in the second half, so covers more distance then.']
      ]);
    },
    function () {
      var v = ri(8, 16), T = ri(20, 60), w = ri(2, 5);
      return Q('A runner starts ' + 2 * v + ' m ahead and runs at ' + w + ' m/s. A cyclist sets off from the start at ' + v + ' m/s.', [
        ['Sketch both distance–time graphs on one set of axes.', 1, 'Two straight lines; the cyclist’s is steeper and starts at 0'],
        ['Find when and where the cyclist catches the runner.', 3, M('t = ' + sf3(2 * v / (v - w))) + ' s, ' + M(sf3(v * 2 * v / (v - w))) + ' m from the start'],
        ['How does the meeting point change if the runner starts twice as far ahead?', 1, 'The time and distance both double.']
      ]);
    },
    function () {
      var t = ri(3, 6), a = ri(2, 4);
      return Q('The velocity of an object is ' + M('v = ' + a + 't^2') + ' m/s.', [
        ['Estimate the distance travelled in the first ' + t + ' s using 3 trapezia.', 3, M(sf3((function () { var h = t / 3, s = 0; for (var i = 0; i < 3; i++) { s += h * (a * Math.pow(i * h, 2) + a * Math.pow((i + 1) * h, 2)) / 2; } return s; })())) + ' m'],
        ['Is this an overestimate or underestimate? Explain.', 1, 'Overestimate: the curve bends upwards, so the trapezia lie above it.'],
        ['Find the gradient of the tangent at ' + M('t = ' + t) + ' and interpret it.', 2, M(2 * a * t) + ' m/s²: the acceleration at that time']
      ]);
    },
    function () {
      var d = ri(2, 6) * 10, v1 = ri(10, 20), v2 = ri(20, 40);
      var t = d / v1 + d / v2;
      return Q('A cyclist rides ' + d + ' km uphill at ' + v1 + ' km/h and returns downhill at ' + v2 + ' km/h.', [
        ['Find the total time.', 2, M(sf3(t)) + ' hours'],
        ['Find the average speed for the round trip.', 2, M(sf3(2 * d / t)) + ' km/h'],
        ['Explain why this is not ' + num((v1 + v2) / 2) + ' km/h.', 1, 'More time is spent at the slower speed.']
      ]);
    },
    function () {
      var v = ri(10, 25), t = ri(2, 6), a = ri(2, 5);
      return Q('A train travels at ' + v + ' m/s, then brakes with constant deceleration ' + a + ' m/s².', [
        ['How long does it take to stop?', 1, M(sf3(v / a)) + ' s'],
        ['How far does it travel while braking?', 2, M(sf3(v * v / (2 * a))) + ' m'],
        ['The driver reacts after ' + t + ' s. Find the total stopping distance, and explain why doubling the speed more than doubles it.', 3, M(sf3(v * t + v * v / (2 * a))) + ' m; the braking part depends on ' + M('v^2')]
      ]);
    },
    function () {
      var a = ri(2, 4), b = ri(1, 3), T = ri(3, 6);
      return Q('Two particles start together. A has ' + M('v = ' + a + 't') + ' and B has constant speed ' + M(a * T) + ' m/s.', [
        ['When do they have the same speed?', 1, M('t = ' + T) + ' s'],
        ['When is A level with B again?', 3, M('t = ' + 2 * T) + ' s'],
        ['Explain using the areas under the speed–time graphs why A is behind until then.', 2, 'B’s area is larger until the triangle under A catches up with B’s rectangle.']
      ]);
    },
    function () {
      var s = ri(100, 400), t = ri(20, 80);
      return Q('A distance–time graph is a curve through ' + M('(0, 0)') + ' and ' + M('(' + t + ', ' + s + ')') + ', getting steeper.', [
        ['Find the average speed over the whole journey.', 1, M(sf3(s / t)) + ' m/s'],
        ['Explain how to estimate the speed at a particular time from the graph.', 2, 'Draw a tangent and find its gradient.'],
        ['Explain why the speed at the end must be greater than ' + sf3(s / t) + ' m/s.', 2, 'The curve gets steeper, so the final gradient exceeds the gradient of the chord.']
      ]);
    }
  ]);

  X('averages', [
    function () {
      var n = ri(5, 9), m = ri(10, 20), x = ri(25, 40);
      return Q('The mean of ' + n + ' numbers is ' + m + '. One more number, ' + x + ', is added.', [
        ['Find the new mean.', 2, M(sf3((n * m + x) / (n + 1)))],
        ['What number could be added so that the mean stays the same?', 1, m],
        ['What number must be added to raise the mean by 2?', 2, m + 2 * (n + 1)]
      ]);
    },
    function () {
      var a = ri(2, 8), d = ri(2, 6), m = a + 2 * d + 1;
      var s5 = [a, a + d, a + d, a + 2 * d, 0]; s5[4] = 5 * m - (s5[0] + s5[1] + s5[2] + s5[3]);
      return Q('Five whole numbers have mode ' + (a + d) + ', median ' + (a + 2 * d) + ' and mean ' + m + '. The smallest is ' + a + '.', [
        ['Find the five numbers, explaining each step.', 4, s5.join(', ') + ': the mode must appear twice below the median, and the total is ' + 5 * m],
        ['Find the range.', 1, s5[4] - a],
        ['Explain why the largest number is fixed once the other four are known.', 1, 'The total ' + M('5 \\times ' + m) + ' is fixed by the mean.']
      ]);
    },
    function () {
      var nB = ri(10, 20), nG = ri(10, 20), mB = ri(50, 70), mG = ri(50, 70);
      return Q('In a test, ' + nB + ' students in set A had mean ' + mB + ' and ' + nG + ' students in set B had mean ' + mG + '.', [
        ['Find the mean for all the students.', 2, M(sf3((nB * mB + nG * mG) / (nB + nG)))],
        ['Explain why it is not ' + num((mB + mG) / 2) + '.', 1, 'The sets are different sizes.'],
        ['One student moves from A to B and both means rise. How can that happen?', 2, 'The student scored below A’s mean but above B’s mean.']
      ]);
    },
    function () {
      var c = [ri(2, 8), ri(5, 12), ri(5, 12), ri(2, 8)], mids = [5, 15, 25, 35], n = c[0] + c[1] + c[2] + c[3];
      var est = (c[0] * 5 + c[1] * 15 + c[2] * 25 + c[3] * 35) / n;
      return Q('Times (minutes): 0–10: ' + c[0] + ', 10–20: ' + c[1] + ', 20–30: ' + c[2] + ', 30–40: ' + c[3] + '.', [
        ['Estimate the mean.', 3, M(sf3(est)) + ' minutes'],
        ['Explain why it is only an estimate.', 1, 'Midpoints are used in place of the actual values.'],
        ['Find the greatest possible value of the mean.', 2, M(sf3((c[0] * 10 + c[1] * 20 + c[2] * 30 + c[3] * 40) / n)) + ' minutes']
      ]);
    },
    function () {
      var a = pick([3, 8]);
      return Q('The numbers ' + M('x, x + ' + a + ', 2x, 3x - 1, 4x') + ' have a mean of ' + M((32 + a) / 5) + '.', [
        ['Find ' + M('x') + '.', 2, M('x = 3')],
        ['Find the median and the range.', 2, 'Median ' + (function () { var s = [3, 3 + a, 6, 8, 12].sort(function (p, q) { return p - q; }); return s[2] + ', range ' + (s[4] - s[0]); })()]
      ]);
    },
    function () {
      var n = ri(5, 9);
      return Q('A data set of ' + n + ' values has mean ' + M('m') + ' and range ' + M('r') + '.', [
        ['Every value is multiplied by 3 and then 5 is added. Find the new mean and range.', 2, M('3m + 5') + ', ' + M('3r')],
        ['Explain why adding 5 changes the mean but not the range.', 1, 'Every value moves up by 5, so the gaps are unchanged.'],
        ['The largest value is increased by ' + n + '. What happens to the mean, the median and the mode?', 2, 'Mean rises by 1; median and mode unchanged (unless the mode was the largest value)']
      ]);
    },
    function () {
      var a = ri(10, 20);
      return Q('Six salaries (in £1000s) are ' + a + ', ' + (a + 2) + ', ' + (a + 3) + ', ' + (a + 3) + ', ' + (a + 5) + ' and ' + (a + 80) + '.', [
        ['Find the mean, median and mode.', 3, 'Mean ' + sf3((6 * a + 93) / 6) + ', median ' + (a + 3) + ', mode ' + (a + 3)],
        ['Which average best represents a typical salary? Explain.', 2, 'The median: the mean is distorted by the outlier.'],
        ['Which average would the highest earner prefer to quote in a pay dispute, and why?', 1, 'The mean, since it makes average pay look high.']
      ]);
    },
    function () {
      var k = ri(3, 6);
      return Q('Find sets of positive whole numbers with these properties, or explain why none exist.', [
        ['Three numbers with mean ' + k + ', median ' + k + ' and range ' + 2 * (k - 1) + '.', 2, '1, ' + k + ', ' + (2 * k - 1)],
        ['Four numbers with mean less than the smallest number.', 1, 'Impossible: the mean is at least the smallest value.'],
        ['Five numbers with mode greater than mean, and mean greater than median.', 2, 'For example 1, 2, 3, 10, 10: median 3, mean 5.2, mode 10']
      ]);
    }
  ]);

  X('stats-diagrams', [
    function () {
      var a = ri(10, 30), b = ri(10, 30), c = ri(10, 30), n = a + b + c;
      return Q('A pie chart shows ' + n + ' people: ' + a + ' walk, ' + b + ' cycle and ' + c + ' drive.', [
        ['Find the angle for each sector.', 2, sf3(360 * a / n) + '°, ' + sf3(360 * b / n) + '°, ' + sf3(360 * c / n) + '°'],
        ['A second pie chart for another school is the same size and has a bigger ‘walk’ sector. Does that mean more people walk there? Explain.', 2, 'Not necessarily: a pie chart shows proportions, not totals.'],
        ['How should the second chart be drawn to compare totals fairly?', 1, 'Make its area proportional to the total.']
      ]);
    },
    function () {
      var w = [10, 10, 20, 20], f = [ri(4, 12), ri(10, 20), ri(10, 30), ri(4, 12)];
      return Q('Heights (cm): 140–150: ' + f[0] + ', 150–160: ' + f[1] + ', 160–180: ' + f[2] + ', 180–200: ' + f[3] + '.', [
        ['Find the frequency density of each class.', 2, f.map(function (x, i) { return num(x / w[i]); }).join(', ')],
        ['Estimate how many are between 155 cm and 170 cm.', 3, num(f[1] / 2 + f[2] / 2)],
        ['Explain why the tallest bar is not necessarily the class with the most people.', 1, 'Bar height is frequency density; area shows frequency.']
      ]);
    },
    function () {
      var q1 = ri(20, 30), med = q1 + ri(5, 10), q3 = med + ri(5, 10), lo = q1 - ri(5, 15), hi = q3 + ri(5, 25);
      return Q('A box plot shows minimum ' + lo + ', lower quartile ' + q1 + ', median ' + med + ', upper quartile ' + q3 + ', maximum ' + hi + '.', [
        ['Find the range and the interquartile range.', 1, (hi - lo) + ' and ' + (q3 - q1)],
        ['Is the maximum an outlier (more than 1.5 × IQR above the upper quartile)?', 2, hi > q3 + 1.5 * (q3 - q1) ? 'Yes: ' + hi + ' > ' + num(q3 + 1.5 * (q3 - q1)) : 'No: ' + hi + ' ≤ ' + num(q3 + 1.5 * (q3 - q1))],
        ['What fraction of the data lies between ' + q1 + ' and ' + hi + '?', 1, M('\\frac{3}{4}')]
      ]);
    },
    function () {
      var n = ri(60, 120);
      return Q('A cumulative frequency graph for ' + n + ' students’ times is drawn.', [
        ['Explain how to read off the median and quartiles.', 2, 'Read across from ' + num(n / 2) + ', ' + num(n / 4) + ' and ' + num(3 * n / 4)],
        ['Why are cumulative frequencies plotted at the upper class boundaries?', 1, 'The cumulative total is reached by the end of each class.'],
        ['Explain what a steep section of the graph tells you.', 1, 'Many values lie in that interval.']
      ]);
    },
    function () {
      var m = ri(2, 5), c = ri(10, 30);
      return Q('A scatter graph of hours revised ' + M('(x)') + ' against test score ' + M('(y)') + ' has a line of best fit ' + M('y = ' + m + 'x + ' + c) + '.', [
        ['Interpret the gradient and intercept.', 2, 'Each extra hour adds about ' + m + ' marks; ' + c + ' is the expected score with no revision'],
        ['Predict the score for 8 hours and for 40 hours. Which is reliable?', 2, (8 * m + c) + ' and ' + (40 * m + c) + '; the second is extrapolation and may exceed the maximum mark'],
        ['Does the correlation prove revision causes higher scores? Explain.', 1, 'No: correlation does not show causation; other factors may be involved.']
      ]);
    },
    function () {
      var a = ri(20, 40), b = ri(20, 40);
      return Q('A bar chart has a vertical axis starting at ' + (Math.min(a, b) - 5) + '. Bars show ' + a + ' and ' + b + '.', [
        ['How many times taller does the larger bar look than the smaller?', 2, sf3((Math.max(a, b) - Math.min(a, b) + 5) / 5)],
        ['How many times larger is the actual value?', 1, sf3(Math.max(a, b) / Math.min(a, b))],
        ['Explain why this chart is misleading.', 1, 'The axis does not start at zero, exaggerating the difference.']
      ]);
    },
    function () {
      var f = [ri(3, 8), ri(8, 15), ri(8, 15), ri(3, 8)], n = f[0] + f[1] + f[2] + f[3];
      return Q('Marks: 0–10: ' + f[0] + ', 10–20: ' + f[1] + ', 20–30: ' + f[2] + ', 30–40: ' + f[3] + '.', [
        ['Write the cumulative frequencies.', 1, [f[0], f[0] + f[1], f[0] + f[1] + f[2], n].join(', ')],
        ['Estimate the median by linear interpolation.', 3, (function () { var h = n / 2, cf = 0, k = 0; while (cf + f[k] < h) { cf += f[k]; k++; } return sf3(k * 10 + (h - cf) / f[k] * 10); })()],
        ['Which class contains the median, and why can you only estimate it?', 1, 'Grouped data: individual values are unknown.']
      ]);
    },
    function () {
      var a = ri(40, 60), b = ri(10, 20), c = ri(40, 60), d = ri(10, 20);
      return Q('Two classes’ scores: Class A has median ' + a + ' and IQR ' + b + '; Class B has median ' + c + ' and IQR ' + d + '.', [
        ['Make two comparisons, in context.', 2, (a > c ? 'A' : a < c ? 'B' : 'Both classes') + ' scored higher on average (median); ' + (b < d ? 'A' : b > d ? 'B' : 'neither') + ' was more consistent (smaller IQR)'],
        ['Why is the IQR better than the range for comparing spread?', 1, 'It is not affected by extreme values.']
      ]);
    }
  ]);

  X('probability', [
    function () {
      var r = ri(3, 7), b = ri(3, 7), n = r + b;
      return Q('A bag has ' + r + ' red and ' + b + ' blue counters. Two are taken without replacement.', [
        ['Find the probability that both are the same colour.', 3, M(F(r * (r - 1) + b * (b - 1), n * (n - 1)))],
        ['Find the probability of at least one red.', 2, M('1 - ' + F(b * (b - 1), n * (n - 1)) + ' = ' + F(n * (n - 1) - b * (b - 1), n * (n - 1)))],
        ['How many blue counters must be added so the probability of two blues is more than ' + M('\\frac{1}{2}') + '?', 3, (function () { var k = 0; while ((b + k) * (b + k - 1) * 2 <= (n + k) * (n + k - 1)) k++; return k; })()]
      ]);
    },
    function () {
      var p = ri(2, 8) / 10;
      return Q('The probability a biased coin lands heads is ' + p + '. It is thrown until the first head.', [
        ['Find the probability the first head is on the 3rd throw.', 2, M(sf3((1 - p) * (1 - p) * p))],
        ['Find the probability it takes more than 3 throws.', 2, M(sf3(Math.pow(1 - p, 3)))],
        ['Show that the probabilities of the first head on throws 1, 2, 3, … form a geometric sequence.', 1, 'Each term is the previous times ' + num(1 - p)]
      ]);
    },
    function () {
      var a = ri(1, 5), b = ri(1, 5);
      return Q('Two fair six-sided dice are rolled and the scores are added.', [
        ['Find the probability of a total of ' + (a + b + 1) + '.', 2, (function () { var t = a + b + 1, c = 0; for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) if (i + j === t) c++; return M(F(c, 36)); })()],
        ['Which total is most likely, and why?', 1, '7: it has the most combinations (6)'],
        ['Find the probability that the total is prime, given that at least one die shows a 6.', 3, M(F(4, 11)) + ' (totals 7 and 11, each two ways, out of 11 outcomes with a 6)']
      ]);
    },
    function () {
      var pA = ri(2, 6) / 10, pB = ri(2, 6) / 10;
      return Q(M('P(A) = ' + pA) + ' and ' + M('P(B) = ' + pB) + '.', [
        ['If ' + M('A') + ' and ' + M('B') + ' are independent, find ' + M('P(A \\text{ and } B)') + ' and ' + M('P(A \\text{ or } B)') + '.', 2, M(sf3(pA * pB)) + ', ' + M(sf3(pA + pB - pA * pB))],
        ['If they are mutually exclusive instead, find ' + M('P(A \\text{ or } B)') + '.', 1, M(sf3(pA + pB))],
        ['Explain why events with non-zero probabilities cannot be both independent and mutually exclusive.', 2, 'Independent requires ' + M('P(A \\cap B) = P(A)P(B) > 0') + ', but mutually exclusive requires 0']
      ]);
    },
    function () {
      var n = ri(20, 60), k = ri(5, n / 2 | 0);
      return Q('A spinner lands on red ' + k + ' times in ' + n + ' spins.', [
        ['Estimate the probability of red.', 1, M(F(k, n))],
        ['Predict how many reds in ' + 5 * n + ' spins.', 1, 5 * k],
        ['A student says the spinner is fair with 4 equal sections. Comment on the evidence and how to improve it.', 2, 'Expected ' + num(n / 4) + ' reds; observed ' + k + '. More spins give a more reliable estimate.']
      ]);
    },
    function () {
      var p = ri(1, 4) / 10, q = ri(5, 9) / 10;
      return Q('The probability it rains on a day is ' + p + '. If it rains, the probability Sam is late is ' + q + '; otherwise it is ' + sf3(q / 3) + '.', [
        ['Draw a tree diagram and find the probability Sam is late.', 3, M(sf3(p * q + (1 - p) * q / 3))],
        ['Given that Sam is late, find the probability it rained.', 2, M(sf3(p * q / (p * q + (1 - p) * q / 3)))],
        ['Explain why this is larger than ' + p + '.', 1, 'Being late is more likely on rainy days, so it is evidence of rain.']
      ]);
    },
    function () {
      var n = ri(3, 5);
      return Q('A fair coin is thrown ' + n + ' times.', [
        ['Find the probability of no heads.', 1, M(F(1, Math.pow(2, n)))],
        ['Find the probability of at least one head.', 1, M(F(Math.pow(2, n) - 1, Math.pow(2, n)))],
        ['How many throws are needed so that the probability of at least one head exceeds 0.99?', 2, '7 throws']
      ]);
    },
    function () {
      return Q('In a game you pay 50p to roll a die. You win £2 for a 6, and 50p back for a 5, and nothing otherwise.', [
        ['Find the expected winnings per game.', 2, M('\\frac{200 + 50}{6} = 41\\frac{2}{3}') + 'p'],
        ['Is the game fair? Explain.', 1, 'No: on average you lose ' + M('8\\frac{1}{3}') + 'p per game.'],
        ['What should the prize for a 6 be to make the game fair?', 2, '£2.50']
      ]);
    }
  ]);

  X('sets', [
    function () {
      var n = ri(30, 50), a = ri(15, 25), b = ri(10, 20), ab = ri(3, 8), none = n - (a + b - ab);
      return Q('In a group of ' + n + ' students, ' + a + ' study French, ' + b + ' study Spanish and ' + ab + ' study both.', [
        ['Draw a Venn diagram and find how many study neither.', 2, none],
        ['A student studies French. Find the probability they also study Spanish.', 2, M(F(ab, a))],
        ['Find the largest and smallest possible numbers studying both, if ' + a + ' and ' + b + ' stay the same.', 2, 'Largest ' + Math.min(a, b) + '; smallest ' + Math.max(0, a + b - n)]
      ]);
    },
    function () {
      return Q(M('\\xi = \\{1, 2, \\ldots, 20\\}') + ', ' + M('A') + ' = multiples of 3, ' + M('B') + ' = multiples of 4.', [
        ['List ' + M('A \\cap B') + ' and find ' + M('n(A \\cup B)') + '.', 2, M('\\{12\\}') + '; ' + M('6 + 5 - 1 = 10')],
        ['Find ' + M('n(A’ \\cap B’)') + '.', 1, 10],
        ['Explain how to find ' + M('n(A \\cap B)') + ' for multiples of ' + M('a') + ' and ' + M('b') + ' in general.', 2, 'Count multiples of the lowest common multiple of ' + M('a') + ' and ' + M('b')]
      ]);
    },
    function () {
      var a = ri(3, 8), b = ri(3, 8), c = ri(3, 8), ab = ri(1, 3), bc = ri(1, 3), ac = ri(1, 3), abc = 1;
      var tot = a + b + c + ab + bc + ac + abc;
      return Q('A three-set Venn diagram has ' + abc + ' in all three, ' + ab + ' in only ' + M('A') + ' and ' + M('B') + ', ' + bc + ' in only ' + M('B') + ' and ' + M('C') + ', ' + ac + ' in only ' + M('A') + ' and ' + M('C') + ', and ' + a + ', ' + b + ', ' + c + ' in only ' + M('A') + ', ' + M('B') + ', ' + M('C') + ' respectively.', [
        ['Find ' + M('n(A)') + ' and ' + M('n(A \\cup B \\cup C)') + '.', 2, (a + ab + ac + abc) + ' and ' + tot],
        ['Find ' + M('P(C \\mid A)') + '.', 2, M(F(ac + abc, a + ab + ac + abc))],
        ['Verify ' + M('n(A \\cup B) = n(A) + n(B) - n(A \\cap B)') + '.', 2, (a + ab + ac + abc) + ' + ' + (b + ab + bc + abc) + ' − ' + (ab + abc) + ' = ' + (a + b + ab + ac + bc + abc)]
      ]);
    },
    function () {
      var n = ri(3, 6);
      return Q('A set has ' + n + ' elements.', [
        ['How many subsets does it have (including the empty set and the set itself)?', 2, Math.pow(2, n)],
        ['Explain why, using the choice for each element.', 1, 'Each element is either in or out: ' + M('2^' + n)],
        ['How many subsets have exactly 2 elements?', 2, n * (n - 1) / 2]
      ]);
    },
    function () {
      var a = ri(20, 30), b = ri(20, 30), both = ri(3, 12), x = ri(3, 10), n = a + b - both + x;
      return Q('Of ' + n + ' people, ' + a + ' like tea and ' + b + ' like coffee. ' + x + ' like neither.', [
        ['Find how many like both.', 2, both],
        ['Shade ' + M('(T \\cup C)’') + ' on a Venn diagram and state its size.', 1, x],
        ['Find ' + M('P(T \\mid C’)') + '.', 2, M(F(a - both, n - b))]
      ]);
    },
    function () {
      return Q('Use set notation to describe each region, for sets ' + M('A') + ' and ' + M('B') + '.', [
        ['In ' + M('A') + ' but not ' + M('B') + '.', 1, M('A \\cap B’')],
        ['In exactly one of the sets.', 2, M('(A \\cap B’) \\cup (A’ \\cap B)')],
        ['Show that ' + M('(A \\cup B)’ = A’ \\cap B’') + ' by shading.', 2, 'Both shade only the region outside both circles.']
      ]);
    },
    function () {
      var a = ri(4, 9), b = ri(4, 9);
      return Q(M('n(A) = ' + a) + ', ' + M('n(B) = ' + b) + ' and ' + M('n(\\xi) = 20') + '.', [
        ['Find the possible values of ' + M('n(A \\cap B)') + '.', 2, '0 to ' + Math.min(a, b)],
        ['If ' + M('A') + ' and ' + M('B') + ' are independent events (choosing at random from ' + M('\\xi') + '), find ' + M('n(A \\cap B)') + '.', 3, M(num(a * b / 20)) + (a * b % 20 ? ' — not a whole number, so they cannot be independent' : '')]
      ]);
    },
    function () {
      var n = ri(50, 100), p = ri(20, 40), q = ri(20, 40), r = ri(5, 15);
      return Q('In a survey of ' + n + ' people, ' + p + ' own a dog, ' + q + ' own a cat and ' + r + ' own both.', [
        ['Find the probability a randomly chosen person owns a dog or a cat but not both.', 2, M(F(p + q - 2 * r, n))],
        ['Are owning a dog and owning a cat independent? Show working.', 3, 'Compare ' + M(F(r, n)) + ' with ' + M(F(p * q, n * n)) + ': ' + (r * n === p * q ? 'independent' : 'not independent')]
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
