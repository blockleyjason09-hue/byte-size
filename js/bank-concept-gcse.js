/* Byte Size Classroom — reasoning statements for Do Nows and Exit tickets: GCSE / International GCSE and Level 2 Further Maths.
   Each entry: [verdict, statement, reason]. Verdict A / S / N = always / sometimes / never true; T / F = true / false. */
(function (g) {
  var BS = g.BS, S = String.raw;
  BS.concepts = BS.concepts || {};
  var C = BS.concept = function (ids, list) { [].concat(ids).forEach(function (id) { BS.concepts[id] = (BS.concepts[id] || []).concat(list); }); };

  C('fractions', [
    ['S', S`Adding the same number to the numerator and denominator of a fraction makes it bigger.`, S`True for proper fractions such as \(\frac{1}{2} \to \frac{2}{3}\), but \(\frac{3}{2} \to \frac{4}{3}\) gets smaller, and \(\frac{2}{2}\) stays the same.`],
    ['N', S`A fraction in its simplest form with denominator 15 can be written as a terminating decimal.`, S`\(15 = 3 \times 5\), so a simplest-form denominator of 15 always contains the prime factor 3 and the decimal recurs.`],
    ['F', S`\(\frac{1}{3} + \frac{1}{4} = \frac{2}{7}\)`, S`You cannot add denominators. \(\frac{4}{12} + \frac{3}{12} = \frac{7}{12}\).`],
    ['S', S`Dividing by a fraction makes the answer bigger.`, S`Dividing by a proper fraction (e.g. \(\div \frac{1}{2}\)) makes a positive number bigger, but dividing by \(\frac{5}{2}\) makes it smaller.`],
    ['T', S`\(0.\dot{9} = 1\)`, S`If \(x = 0.\dot{9}\) then \(10x - x = 9\), so \(x = 1\).`]
  ]);
  C('percentages', [
    ['F', S`Increasing a price by 20% and then decreasing it by 20% gets you back to the original price.`, S`The multiplier is \(1.2 \times 0.8 = 0.96\), a 4% decrease overall.`],
    ['A', S`Increasing by 10% twice gives a bigger increase than increasing by 20% once.`, S`\(1.1^2 = 1.21 > 1.2\): the second 10% is taken of a larger amount.`],
    ['T', S`30% of 70 is the same as 70% of 30.`, S`Both are \(0.3 \times 70 = 0.7 \times 30 = 21\): multiplication is commutative.`],
    ['N', S`A value can decrease by more than 100% and still be positive.`, S`A decrease of more than 100% gives a multiplier below 0, so a positive value becomes negative.`],
    ['F', S`To reverse a 25% increase you decrease by 25%.`, S`Divide by 1.25: that is a decrease of 20%.`]
  ]);
  C('indices', [
    ['S', S`\(a^n\) is bigger than \(a\).`, S`True for \(a = 3,\ n = 2\); false for \(a = \frac{1}{2}\) or \(n = 1\) or \(a = 1\).`],
    ['F', S`\(2^3 \times 2^4 = 4^7\)`, S`Add the powers but keep the base: \(2^7 = 128\).`],
    ['A', S`\(x^0 = 1\) for any non-zero \(x\).`, S`\(\frac{x^n}{x^n} = x^{n-n} = x^0\) and also equals 1.`],
    ['N', S`A number in standard form \(a \times 10^n\) can have \(a = 10\).`, S`Standard form needs \(1 \le a < 10\); \(10 \times 10^n\) should be written \(1 \times 10^{n+1}\).`],
    ['T', S`\(8^{-\frac{1}{3}} = \frac{1}{2}\)`, S`\(8^{\frac{1}{3}} = 2\), and a negative power means the reciprocal.`]
  ]);
  C('ratio', [
    ['F', S`If a ratio is \(2 : 3\), then the first part is \(\frac{2}{3}\) of the total.`, S`There are 5 parts in total, so the first part is \(\frac{2}{5}\) of the total.`],
    ['S', S`If \(y\) is directly proportional to \(x\), then doubling \(x\) doubles \(y\).`, S`Always for \(y = kx\). But "\(y\) proportional to \(x^2\)" quadruples, so check the exact relationship.`],
    ['T', S`If \(y\) is inversely proportional to \(x\), then \(xy\) is constant.`, S`\(y = \frac{k}{x}\) rearranges to \(xy = k\).`],
    ['F', S`Sharing £60 in the ratio \(1 : 2\) gives £20 and £30.`, S`3 parts of £20: £20 and £40.`]
  ]);
  C('compound-measures', [
    ['F', S`If you drive 60 km at 30 km/h and then 60 km at 90 km/h, your average speed is 60 km/h.`, S`Times are 2 h and \(\frac{2}{3}\) h, so the average is \(120 \div 2\frac{2}{3} = 45\) km/h.`],
    ['T', S`Doubling the area that a force acts on halves the pressure.`, S`\(P = \frac{F}{A}\): \(P\) is inversely proportional to \(A\).`],
    ['A', S`An object with density greater than water's (1 g/cm³) has mass greater than its volume in cm³ in grams.`, S`Mass = density × volume, and density > 1.`],
    ['F', S`72 km/h is faster than 25 m/s.`, S`72 km/h \(= 72\,000 \div 3600 = 20\) m/s.`]
  ]);
  C('expand-factorise', [
    ['F', S`\((x + 3)^2 = x^2 + 9\)`, S`\((x + 3)(x + 3) = x^2 + 6x + 9\).`],
    ['A', S`\(x^2 - 9\) factorises as \((x - 3)(x + 3)\).`, S`The difference of two squares: the middle terms cancel.`],
    ['N', S`\(x^2 + 9\) factorises into two brackets with integer terms.`, S`\(x^2 + 9 > 0\) for all \(x\), so it has no real roots and no real factors.`],
    ['S', S`\(x^2 + bx + 12\) factorises, where \(b\) is an integer.`, S`Only for \(b = \pm 7, \pm 8, \pm 13\) (from the factor pairs of 12).`]
  ]);
  C('linear-equations', [
    ['S', S`An equation of the form \(ax + b = cx + d\) has exactly one solution.`, S`Only when \(a \ne c\). If \(a = c\) there is no solution (\(b \ne d\)) or infinitely many (\(b = d\)).`],
    ['F', S`If \(3x = 12\) then \(x = 9\).`, S`Divide by 3 rather than subtract: \(x = 4\).`],
    ['T', S`\(2(x + 3) = 2x + 6\) is true for every value of \(x\).`, S`It is an identity: expanding the left side gives the right side.`],
    ['F', S`The solution of \(\frac{x}{4} = 3\) is \(x = \frac{3}{4}\).`, S`Multiply both sides by 4: \(x = 12\).`]
  ]);
  C('inequalities', [
    ['S', S`If \(a > b\) then \(a^2 > b^2\).`, S`True for \(3 > 2\), false for \(-3 > -4\) (\(9 < 16\)).`],
    ['A', S`If \(a > b\) then \(-a < -b\).`, S`Multiplying by a negative number reverses the inequality.`],
    ['F', S`\(-2x > 6\) gives \(x > -3\).`, S`Dividing by \(-2\) reverses the sign: \(x < -3\).`],
    ['T', S`There are exactly 5 integers that satisfy \(-2 \le n < 3\).`, S`\(-2, -1, 0, 1, 2\).`]
  ]);
  C('sequences', [
    ['N', S`The sequence \(5n + 2\) contains a multiple of 10.`, S`\(5n + 2\) always ends in 2 or 7.`],
    ['N', S`The number 100 is a term of the sequence \(3n + 2\).`, S`\(3n + 2 = 100\) gives \(n = 32\frac{2}{3}\), not a whole number.`],
    ['T', S`In an arithmetic sequence, the difference between the 10th and 4th terms is 6 times the common difference.`, S`\(u_{10} - u_4 = (a + 9d) - (a + 3d) = 6d\).`],
    ['F', S`The \(n\)th term of 4, 7, 10, 13, … is \(n + 3\).`, S`The difference is 3, so it is \(3n + 1\).`]
  ]);
  C('straight-lines', [
    ['T', S`The lines \(y = 2x + 1\) and \(y = 2x - 5\) never meet.`, S`They have the same gradient, so they are parallel.`],
    ['A', S`A line perpendicular to \(y = 3x\) has gradient \(-\frac{1}{3}\).`, S`Perpendicular gradients multiply to \(-1\).`],
    ['F', S`The line \(2y = 4x + 6\) has gradient 4.`, S`Divide by 2: \(y = 2x + 3\), gradient 2.`],
    ['S', S`A straight line passes through the origin.`, S`Only when the \(y\)-intercept is 0, e.g. \(y = 3x\) but not \(y = 3x + 1\).`]
  ]);
  C('kinematic-graphs', [
    ['T', S`The area under a speed–time graph gives the distance travelled.`, S`Distance = speed × time, which is the area for each small time interval.`],
    ['F', S`On a distance–time graph, a horizontal line means the object is moving at constant speed.`, S`A horizontal line means the distance isn't changing: the object is stationary.`],
    ['S', S`A steeper line on a speed–time graph means a faster object.`, S`The gradient is acceleration, not speed. A steep line could start from rest.`],
    ['T', S`On a speed–time graph, a negative gradient shows deceleration.`, S`The gradient is the acceleration; negative means slowing down.`]
  ]);
  C('angles-parallel', [
    ['A', S`Co-interior angles between parallel lines add up to 180°.`, S`Each is the supplement of the alternate angle of the other.`],
    ['F', S`Alternate angles are always equal.`, S`Only when the lines are parallel.`],
    ['N', S`A triangle can have two obtuse angles.`, S`Two obtuse angles would already sum to more than 180°.`],
    ['A', S`The exterior angle of a triangle equals the sum of the two opposite interior angles.`, S`Both equal 180° minus the third angle.`]
  ]);
  C('polygons', [
    ['A', S`The exterior angles of any convex polygon add up to 360°.`, S`Walking round the polygon you turn through one full turn.`],
    ['N', S`A regular polygon has interior angles of 100°.`, S`Its exterior angle would be 80°, and \(360 \div 80 = 4.5\) is not a whole number.`],
    ['S', S`A quadrilateral with four equal sides is a square.`, S`It could be a rhombus with angles other than 90°.`],
    ['T', S`The interior angles of a hexagon add up to 720°.`, S`\((6 - 2) \times 180° = 720°\).`]
  ]);
  C('pythagoras-trig', [
    ['F', S`\(\sin 60° = 2\sin 30°\)`, S`\(\sin 60° = \frac{\sqrt{3}}{2} \approx 0.866\), but \(2\sin 30° = 1\).`],
    ['N', S`In a right-angled triangle, the hypotenuse can be shorter than one of the other sides.`, S`\(c^2 = a^2 + b^2 > a^2\), so \(c > a\).`],
    ['S', S`A triangle whose sides are three consecutive whole numbers is right-angled.`, S`3, 4, 5 is, but 4, 5, 6 is not (\(16 + 25 \ne 36\)).`],
    ['A', S`For an acute angle \(x\), \(\sin x < 1\).`, S`The opposite side is shorter than the hypotenuse.`]
  ]);
  C('circles', [
    ['F', S`If you double the radius of a circle, you double its area.`, S`Area \(= \pi r^2\), so it multiplies by 4.`],
    ['T', S`A semicircle of radius 2 has a perimeter of \(2\pi + 4\).`, S`Half the circumference (\(2\pi\)) plus the diameter (4).`],
    ['S', S`A circle's area is numerically bigger than its circumference.`, S`\(\pi r^2 > 2\pi r\) only when \(r > 2\).`],
    ['A', S`A sector with angle 90° has a quarter of the circle's area.`, S`\(\frac{90}{360} = \frac{1}{4}\).`]
  ]);
  C('similar-shapes', [
    ['F', S`If two similar shapes have lengths in ratio \(1 : 3\), their areas are in ratio \(1 : 3\).`, S`Areas scale by the square: \(1 : 9\).`],
    ['A', S`Any two circles are similar.`, S`One is an enlargement of the other, with scale factor the ratio of their radii.`],
    ['S', S`Two rectangles are similar.`, S`Only when their length-to-width ratios are equal.`],
    ['T', S`If the volume scale factor is 8, the length scale factor is 2.`, S`\(\sqrt[3]{8} = 2\).`]
  ]);
  C('volume', [
    ['F', S`A cone has one third of the volume of a cylinder of the same radius and the same slant height.`, S`It is a third of the cylinder with the same perpendicular height.`],
    ['S', S`A cuboid with a bigger volume has a bigger surface area.`, S`A \(1 \times 1 \times 10\) cuboid (volume 10, area 42) has more area than a \(2 \times 2 \times 3\) cuboid (volume 12, area 32).`],
    ['T', S`A sphere fits exactly inside a cylinder with height and diameter equal to its diameter, filling \(\frac{2}{3}\) of it.`, S`\(\frac{4}{3}\pi r^3 \div (\pi r^2 \times 2r) = \frac{2}{3}\).`],
    ['A', S`1 m³ is 1 000 000 cm³.`, S`\(100 \times 100 \times 100\).`]
  ]);
  C('vectors', [
    ['T', S`If \(\overrightarrow{AB} = 2\overrightarrow{CD}\), then \(AB\) and \(CD\) are parallel.`, S`One vector is a multiple of the other.`],
    ['F', S`\(\overrightarrow{AB} = \overrightarrow{BA}\)`, S`They have the same length but opposite directions: \(\overrightarrow{BA} = -\overrightarrow{AB}\).`],
    ['S', S`\(|\mathbf{a} + \mathbf{b}| = |\mathbf{a}| + |\mathbf{b}|\)`, S`Only when \(\mathbf{a}\) and \(\mathbf{b}\) point in the same direction (or one is zero).`],
    ['A', S`If \(M\) is the midpoint of \(AB\), then \(\overrightarrow{OM} = \frac{1}{2}(\mathbf{a} + \mathbf{b})\).`, S`\(\mathbf{a} + \frac{1}{2}(\mathbf{b} - \mathbf{a})\).`]
  ]);
  C('transformations', [
    ['S', S`A rotation followed by another rotation is a single rotation.`, S`About the same centre, yes; about different centres it could be a translation (e.g. two 180° turns).`],
    ['A', S`A reflection leaves the size and shape of an object unchanged.`, S`Reflections are isometries: they preserve lengths and angles.`],
    ['F', S`An enlargement with scale factor \(\frac{1}{2}\) makes a shape's area half as big.`, S`The area scale factor is \(\left(\frac{1}{2}\right)^2 = \frac{1}{4}\).`],
    ['T', S`An enlargement with scale factor \(-1\) is the same as a rotation of 180° about the centre.`, S`Each point is sent to the opposite side of the centre at the same distance.`]
  ]);
  C('averages', [
    ['S', S`The mean is bigger than the median.`, S`True for positively skewed data such as 1, 2, 9; false for 1, 8, 9.`],
    ['A', S`Adding 5 to every value increases the mean by 5.`, S`The total increases by \(5n\), so the mean by 5.`],
    ['F', S`Adding 5 to every value increases the range by 5.`, S`The largest and smallest both increase by 5, so the range is unchanged.`],
    ['S', S`A data set has exactly one mode.`, S`It might have two modes, or none if every value appears once.`]
  ]);
  C('stats-diagrams', [
    ['F', S`In a histogram, the height of each bar is the frequency.`, S`With unequal class widths, height is frequency density; the area is the frequency.`],
    ['T', S`On a cumulative frequency graph, the median is read at half of the total frequency.`, S`Half of the data lies below the median.`],
    ['A', S`The interquartile range is less affected by outliers than the range.`, S`It uses only the middle 50% of the data.`],
    ['S', S`The longest bar in a histogram shows the class with the highest frequency.`, S`Only if classes are equal in width; a wide short bar can have a larger area.`]
  ]);
  C('probability', [
    ['F', S`If a coin lands on heads five times in a row, it is more likely to land on tails next.`, S`Throws are independent: still \(\frac{1}{2}\).`],
    ['A', S`For any event \(A\), \(P(A) + P(\text{not } A) = 1\).`, S`Either \(A\) happens or it doesn't.`],
    ['S', S`\(P(A \text{ and } B) = P(A) \times P(B)\).`, S`Only when \(A\) and \(B\) are independent.`],
    ['N', S`A probability can be \(\frac{5}{4}\).`, S`Probabilities lie between 0 and 1.`]
  ]);
  C('sets', [
    ['A', S`\(n(A \cup B) = n(A) + n(B) - n(A \cap B)\)`, S`The intersection is counted twice in \(n(A) + n(B)\).`],
    ['S', S`\(n(A \cup B) = n(A) + n(B)\)`, S`Only when \(A\) and \(B\) have no elements in common.`],
    ['T', S`If \(A \subset B\), then \(A \cap B = A\).`, S`Every element of \(A\) is already in \(B\).`],
    ['F', S`\(\varnothing\) and \(\{0\}\) are the same set.`, S`\(\{0\}\) has one element; the empty set has none.`]
  ]);
  C('surds', [
    ['F', S`\(\sqrt{9 + 16} = \sqrt{9} + \sqrt{16}\)`, S`\(\sqrt{25} = 5\) but \(3 + 4 = 7\).`],
    ['A', S`\(\sqrt{a} \times \sqrt{a} = a\) for \(a \ge 0\).`, S`That is the definition of a square root.`],
    ['S', S`The product of two surds is rational.`, S`\(\sqrt{2} \times \sqrt{8} = 4\), but \(\sqrt{2} \times \sqrt{3} = \sqrt{6}\).`],
    ['T', S`\(\frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}\)`, S`Multiply top and bottom by \(\sqrt{2}\).`]
  ]);
  C('bounds', [
    ['T', S`A length of 6 cm to the nearest cm could be 6.4 cm.`, S`Its bounds are \(5.5 \le l < 6.5\).`],
    ['F', S`To find the upper bound of \(a - b\), use the upper bounds of \(a\) and \(b\).`, S`Use the upper bound of \(a\) and the lower bound of \(b\).`],
    ['F', S`The upper bound of 7.2 (to 1 d.p.) is 7.249.`, S`It is 7.25 (the value can be as close to 7.25 as we like).`],
    ['A', S`For a division \(\frac{a}{b}\) with positive values, the upper bound uses the upper bound of \(a\) and the lower bound of \(b\).`, S`A bigger numerator and smaller denominator give a bigger result.`]
  ]);
  C('simultaneous', [
    ['S', S`A pair of linear simultaneous equations has exactly one solution.`, S`Not if the lines are parallel (no solution) or identical (infinitely many).`],
    ['T', S`A line and a circle can meet at 0, 1 or 2 points.`, S`Substituting gives a quadratic, which has 0, 1 or 2 real roots.`],
    ['T', S`The solution of a pair of simultaneous equations is where their graphs intersect.`, S`That point satisfies both equations.`],
    ['N', S`A straight line can meet a parabola \(y = x^2\) at three points.`, S`\(x^2 = mx + c\) is a quadratic, with at most two roots.`]
  ]);
  C('quadratics', [
    ['S', S`A quadratic equation has two different real solutions.`, S`It may have one repeated root or none: it depends on the discriminant.`],
    ['F', S`If \(x^2 = 16\), then \(x = 4\).`, S`\(x = \pm 4\).`],
    ['T', S`The graph of \(y = (x - 2)^2 + 3\) has its turning point at \((2, 3)\).`, S`The square is least (zero) at \(x = 2\).`],
    ['F', S`\(x(x - 5) = 6\) means \(x = 6\) or \(x - 5 = 6\).`, S`This only works when the product is 0. Rearrange: \(x^2 - 5x - 6 = 0\), \(x = 6\) or \(-1\).`]
  ]);
  C('rearranging', [
    ['F', S`Making \(r\) the subject of \(A = \pi r^2\) gives \(r = \frac{A}{2\pi}\).`, S`\(r = \sqrt{\frac{A}{\pi}}\).`],
    ['T', S`If the subject appears twice, you collect the terms and factorise.`, S`For example \(ax + b = cx\) gives \(x(a - c) = -b\).`],
    ['F', S`\(\frac{1}{a} + \frac{1}{b} = \frac{1}{a + b}\)`, S`\(\frac{1}{a} + \frac{1}{b} = \frac{a + b}{ab}\).`],
    ['A', S`Squaring both sides of \(\sqrt{x} = y\) gives \(x = y^2\).`, S`The square of a square root returns the original value.`]
  ]);
  C('functions', [
    ['S', S`\(fg(x) = gf(x)\)`, S`True for some pairs, e.g. \(f(x) = 2x,\ g(x) = 3x\); usually not, e.g. \(f(x) = x + 1,\ g(x) = x^2\).`],
    ['F', S`\(f^{-1}(x) = \frac{1}{f(x)}\)`, S`The inverse undoes \(f\); it is not the reciprocal.`],
    ['A', S`\(ff^{-1}(x) = x\)`, S`Applying a function and then its inverse returns the input.`],
    ['T', S`The function \(f(x) = \frac{1}{x - 3}\) cannot take the input 3.`, S`It would mean dividing by zero.`]
  ]);
  C('graphs', [
    ['T', S`The graph of \(y = f(x) + 3\) is the graph of \(y = f(x)\) moved up 3.`, S`Each output is 3 more.`],
    ['F', S`The graph of \(y = f(x + 3)\) is the graph of \(y = f(x)\) moved 3 to the right.`, S`It moves 3 to the left.`],
    ['N', S`The graph of \(y = \frac{1}{x}\) crosses the \(x\)-axis.`, S`\(\frac{1}{x} = 0\) has no solution.`],
    ['S', S`A cubic graph crosses the \(x\)-axis three times.`, S`It crosses at least once, but may cross only once or twice.`]
  ]);
  C('differentiation', [
    ['T', S`At a turning point, \(\frac{dy}{dx} = 0\).`, S`The tangent is horizontal.`],
    ['F', S`If \(y = x^3\), then \(\frac{dy}{dx} = 3x^3\).`, S`Multiply by the power and reduce it by 1: \(3x^2\).`],
    ['A', S`The derivative of a constant is 0.`, S`A constant function has a horizontal graph.`],
    ['S', S`A point where \(\frac{dy}{dx} = 0\) is a maximum.`, S`It might be a minimum (or a point of inflection).`]
  ]);
  C('sine-cosine', [
    ['T', S`The cosine rule becomes Pythagoras' theorem when the angle is 90°.`, S`\(\cos 90° = 0\), so the \(-2bc\cos A\) term disappears.`],
    ['S', S`Given two sides and a non-included angle, there is exactly one possible triangle.`, S`This is the ambiguous case: there can be two triangles.`],
    ['A', S`The largest angle of a triangle is opposite the longest side.`, S`From the sine rule, a bigger side goes with a bigger angle.`],
    ['F', S`The area of a triangle is \(ab\sin C\).`, S`It is \(\frac{1}{2}ab\sin C\).`]
  ]);
  C('circle-theorems', [
    ['A', S`The angle in a semicircle is 90°.`, S`It is half the angle at the centre, which is 180°.`],
    ['F', S`Opposite angles of any quadrilateral add up to 180°.`, S`Only for a cyclic quadrilateral.`],
    ['A', S`A tangent is perpendicular to the radius at the point of contact.`, S`The radius is the shortest distance from the centre to the tangent.`],
    ['T', S`Angles in the same segment are equal.`, S`Each is half the angle at the centre subtended by the same arc.`]
  ]);
  C('intersecting-chords', [
    ['A', S`If two chords \(AB\) and \(CD\) meet at \(P\) inside a circle, \(PA \times PB = PC \times PD\).`, S`Triangles \(PAC\) and \(PDB\) are similar.`],
    ['T', S`Two tangents from the same external point are equal in length.`, S`The two right-angled triangles formed with the centre are congruent.`],
    ['F', S`For a tangent \(PT\) and secant \(PAB\), \(PT^2 = PA + PB\).`, S`It is \(PT^2 = PA \times PB\).`]
  ]);
  C('last-q', [
    ['T', S`A good first step in an unfamiliar problem is to draw a diagram or try a small example.`, S`It makes the structure of the problem visible.`]
  ]);

  /* ---------- Level 2 Further Maths ---------- */
  C('fm-counting', [
    ['T', S`A 4-digit PIN using the digits 0–9 has 10 000 possibilities.`, S`\(10^4\): 10 choices for each of 4 positions.`],
    ['F', S`The number of ways to arrange the letters of BOOK is \(4! = 24\).`, S`The two O's are identical: \(\frac{24}{2} = 12\).`],
    ['S', S`Allowing repeated digits increases the number of codes.`, S`For codes of 2 or more digits, yes; for 1-digit codes it makes no difference.`]
  ]);
  C('fm-surds', [
    ['F', S`\((\sqrt{3} + 1)^2 = 3 + 1 = 4\)`, S`\(3 + 2\sqrt{3} + 1 = 4 + 2\sqrt{3}\).`],
    ['A', S`\((\sqrt{a} + \sqrt{b})(\sqrt{a} - \sqrt{b}) = a - b\)`, S`The difference of two squares removes the surds.`],
    ['S', S`The sum of two irrational numbers is irrational.`, S`\(\sqrt{2} + (-\sqrt{2}) = 0\) is rational.`]
  ]);
  C('fm-functions', [
    ['S', S`A function has an inverse.`, S`Only if it is one-to-one on its domain, e.g. \(x^2\) needs its domain restricted.`],
    ['T', S`The range of \(f^{-1}\) is the domain of \(f\).`, S`The inverse swaps inputs and outputs.`],
    ['F', S`If \(f(x) = x^2\), the range of \(f\) is all real numbers.`, S`\(f(x) \ge 0\).`]
  ]);
  C('fm-algebra', [
    ['F', S`\(\frac{x + 3}{x + 5} = \frac{3}{5}\)`, S`You can only cancel common factors, not terms.`],
    ['A', S`\(\frac{x^2 - 1}{x - 1} = x + 1\) for \(x \ne 1\).`, S`\(x^2 - 1 = (x - 1)(x + 1)\).`],
    ['S', S`\(\frac{a}{b} + \frac{c}{d} = \frac{a + c}{b + d}\)`, S`Only in special cases (e.g. \(a = c = 0\)); in general you need a common denominator.`]
  ]);
  C('fm-binomial', [
    ['T', S`The coefficients in the expansion of \((1 + x)^5\) add up to 32.`, S`Put \(x = 1\): \(2^5 = 32\).`],
    ['F', S`\((a + b)^3 = a^3 + b^3\)`, S`\(a^3 + 3a^2b + 3ab^2 + b^3\).`],
    ['A', S`The expansion of \((a + b)^n\) has \(n + 1\) terms.`, S`Powers of \(b\) run from 0 to \(n\).`]
  ]);
  C('fm-factor', [
    ['T', S`If \(f(2) = 0\), then \((x - 2)\) is a factor of \(f(x)\).`, S`That is the factor theorem.`],
    ['S', S`A cubic equation has three real roots.`, S`It always has at least one, but may have only one.`],
    ['F', S`If \(f(-3) = 0\), then \((x - 3)\) is a factor.`, S`The factor is \((x + 3)\).`]
  ]);
  C('fm-quadratics', [
    ['T', S`\(x^2 - 6x + 11 = (x - 3)^2 + 2\), so it is always positive.`, S`A square is at least 0, plus 2.`],
    ['F', S`The minimum value of \((x + 4)^2 - 7\) is at \(x = 4\).`, S`It is at \(x = -4\).`],
    ['S', S`A quadratic graph crosses the \(y\)-axis below the \(x\)-axis.`, S`It depends on the sign of the constant term.`]
  ]);
  C('fm-graphs', [
    ['A', S`The graph of \(y = a^x\) (\(a > 0\)) passes through \((0, 1)\).`, S`\(a^0 = 1\).`],
    ['N', S`The graph of \(y = 2^x\) meets the \(x\)-axis.`, S`\(2^x > 0\) for all \(x\).`],
    ['T', S`A piecewise function can be continuous even though it is defined in pieces.`, S`If the pieces meet at the boundaries, there is no jump.`]
  ]);
  C('fm-equations', [
    ['S', S`Three linear equations in three unknowns have a unique solution.`, S`Only if the equations are independent and consistent.`],
    ['T', S`Substituting a linear equation into a quadratic one gives a quadratic equation.`, S`This is how a line and a curve are solved together.`]
  ]);
  C('fm-inequalities', [
    ['F', S`The solution of \(x^2 > 9\) is \(x > 3\).`, S`It is \(x < -3\) or \(x > 3\).`],
    ['T', S`The solution of \((x - 1)(x - 5) < 0\) is \(1 < x < 5\).`, S`The parabola is below the \(x\)-axis between its roots.`],
    ['S', S`Multiplying both sides of an inequality by \(x\) keeps the inequality the same way round.`, S`Only if \(x > 0\).`]
  ]);
  C('fm-indices', [
    ['T', S`\(27^{\frac{2}{3}} = 9\)`, S`\(\sqrt[3]{27} = 3\), then square.`],
    ['F', S`\(4^{-\frac{1}{2}} = -2\)`, S`\(\frac{1}{\sqrt{4}} = \frac{1}{2}\).`],
    ['A', S`\((a^m)^n = a^{mn}\)`, S`You multiply \(a^m\) by itself \(n\) times.`]
  ]);
  C('fm-proof', [
    ['T', S`The sum of two consecutive integers is always odd.`, S`\(n + (n + 1) = 2n + 1\).`],
    ['F', S`Checking that a statement works for 10 examples proves it.`, S`Examples cannot cover every case; one counterexample disproves it.`],
    ['S', S`\(n^2 + n + 41\) is prime.`, S`It is for \(n = 1, \dots, 39\), but not for \(n = 40\) (\(41^2\)).`]
  ]);
  C('fm-sequences', [
    ['T', S`A quadratic sequence has a constant second difference.`, S`The second difference is \(2a\) for \(an^2 + bn + c\).`],
    ['A', S`The limiting value of \(\frac{2n + 1}{n + 3}\) is 2.`, S`Divide by \(n\): \(\frac{2 + 1/n}{1 + 3/n} \to 2\).`],
    ['S', S`A sequence that increases has no limit.`, S`\(1 - \frac{1}{n}\) increases towards a limit of 1.`]
  ]);
  C('fm-coord', [
    ['T', S`The point dividing \(AB\) in the ratio \(1 : 2\) is a third of the way from \(A\) to \(B\).`, S`3 parts in total; 1 part from \(A\).`],
    ['F', S`The distance between \((1, 2)\) and \((4, 6)\) is 7.`, S`\(\sqrt{3^2 + 4^2} = 5\).`],
    ['A', S`Two lines with gradients \(m_1\) and \(m_2\) are perpendicular when \(m_1 m_2 = -1\).`, S`For non-vertical lines this is the condition.`]
  ]);
  C('fm-circles', [
    ['T', S`\(x^2 + y^2 = 25\) has centre \((0, 0)\) and radius 5.`, S`Compare with \(x^2 + y^2 = r^2\).`],
    ['F', S`\((x - 2)^2 + (y + 3)^2 = 16\) has centre \((-2, 3)\).`, S`The centre is \((2, -3)\).`],
    ['A', S`The tangent at a point is perpendicular to the radius there.`, S`Use the negative reciprocal of the radius' gradient.`]
  ]);
  C('fm-calculus', [
    ['T', S`If \(\frac{d^2y}{dx^2} > 0\) at a stationary point, it is a minimum.`, S`The gradient is increasing through zero.`],
    ['F', S`The normal to a curve has the same gradient as the tangent.`, S`It is perpendicular: gradient \(-\frac{1}{m}\).`],
    ['S', S`A curve's gradient is positive where the curve is above the \(x\)-axis.`, S`Height and gradient are unrelated: a curve can be above the axis and decreasing.`]
  ]);
  C('fm-matrices', [
    ['S', S`\(\mathbf{AB} = \mathbf{BA}\)`, S`Matrix multiplication is not commutative in general, though it is for some pairs (e.g. \(\mathbf{B} = \mathbf{I}\)).`],
    ['T', S`The matrix \(\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}\) rotates points 90° anticlockwise about the origin.`, S`It sends \((1, 0)\) to \((0, 1)\) and \((0, 1)\) to \((-1, 0)\).`],
    ['F', S`The identity matrix is \(\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}\).`, S`It is \(\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}\).`]
  ]);
  C('fm-trig', [
    ['A', S`\(\sin^2 x + \cos^2 x = 1\)`, S`Pythagoras in the unit circle.`],
    ['F', S`\(\sin x = 0.5\) has only one solution for \(0° \le x \le 360°\).`, S`\(x = 30°\) and \(150°\).`],
    ['S', S`\(\tan x > 1\)`, S`Only for some angles, e.g. \(45° < x < 90°\).`]
  ]);
  C('fm-geometry', [
    ['T', S`The angle between a line and a plane is measured to the line's projection on the plane.`, S`That gives the smallest angle between the line and the plane.`],
    ['F', S`The space diagonal of a unit cube has length 2.`, S`\(\sqrt{1 + 1 + 1} = \sqrt{3}\).`]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
