/* Byte Size Classroom — more reasoning statements (set 2): GCSE / International GCSE and Level 2 Further Maths. */
(function (g) {
  var BS = g.BS, S = String.raw, C = BS.concept;

  C('fractions', [
    ['T', S`\(\frac{3}{8}\) lies between \(\frac{1}{3}\) and \(\frac{1}{2}\).`, S`\(\frac{1}{3} \approx 0.333,\ \frac{3}{8} = 0.375,\ \frac{1}{2} = 0.5\).`],
    ['F', S`\(\frac{2}{5} \times \frac{2}{5} = \frac{4}{5}\)`, S`Multiply denominators too: \(\frac{4}{25}\).`],
    ['A', S`Multiplying the numerator and denominator by the same non-zero number gives an equivalent fraction.`, S`You multiply the fraction by \(\frac{k}{k} = 1\).`],
    ['S', S`The product of two fractions is smaller than both of them.`, S`True for two proper fractions, e.g. \(\frac{1}{2} \times \frac{1}{3}\); false for \(\frac{1}{2} \times \frac{5}{2} = \frac{5}{4}\).`]
  ]);
  C('percentages', [
    ['T', S`A 50% increase followed by a 50% decrease leaves 75% of the original.`, S`\(1.5 \times 0.5 = 0.75\).`],
    ['S', S`Simple interest gives less than compound interest at the same rate.`, S`Over more than one year (positive rate) yes; over exactly one year they are equal.`],
    ['F', S`An item reduced by 30% to £56 originally cost £72.80.`, S`£56 is 70% of the original: \(56 \div 0.7 = £80\).`],
    ['A', S`Finding \(x\%\) of \(y\) gives the same answer as finding \(y\%\) of \(x\).`, S`Both equal \(\frac{xy}{100}\).`]
  ]);
  C('indices', [
    ['F', S`\((3x^2)^3 = 3x^6\)`, S`The 3 must be cubed too: \(27x^6\).`],
    ['T', S`\(10^{-2} = 0.01\)`, S`\(\frac{1}{10^2} = \frac{1}{100}\).`],
    ['F', S`\(a^m + b^m = (a + b)^m\) for all positive \(a\), \(b\) and \(m\).`, S`For example \(1^2 + 1^2 = 2\) but \((1 + 1)^2 = 4\).`],
    ['N', S`A positive number raised to any power gives a negative answer.`, S`\(a^n > 0\) for \(a > 0\) and any real \(n\).`]
  ]);
  C('ratio', [
    ['T', S`If \(a : b = 2 : 3\) and \(b : c = 6 : 5\), then \(a : b : c = 4 : 6 : 5\).`, S`Scale the first ratio so \(b\) is 6 in both.`],
    ['S', S`Adding the same amount to both parts of a ratio keeps the ratio the same.`, S`Only if the parts were equal (ratio \(1 : 1\)); e.g. \(1 : 2 \to 2 : 3\) changes.`],
    ['F', S`If 5 workers take 12 days, then 10 workers take 24 days.`, S`It is inverse proportion: 10 workers take 6 days.`],
    ['A', S`A ratio \(a : b\) can be written as the fraction \(\frac{a}{b}\) to compare the parts.`, S`Both describe how many times bigger the first part is than the second.`]
  ]);
  C('compound-measures', [
    ['T', S`A density of 2.5 g/cm³ is the same as 2500 kg/m³.`, S`\(1\) g/cm³ \(= 1000\) kg/m³.`],
    ['F', S`If you halve the time taken for a journey, the speed halves.`, S`For the same distance the speed doubles.`],
    ['S', S`Two objects of equal mass have equal volume.`, S`Only if they have the same density.`],
    ['A', S`The gradient of a distance–time graph gives the speed.`, S`Change in distance ÷ change in time.`]
  ]);
  C('expand-factorise', [
    ['F', S`\(6x^2 + 9x\) factorised fully is \(3(2x^2 + 3x)\).`, S`\(x\) is also a common factor: \(3x(2x + 3)\).`],
    ['T', S`\((x - 5)(x + 5) = x^2 - 25\)`, S`The \(\pm 5x\) terms cancel.`],
    ['S', S`\((a + b)^2 = a^2 + b^2\)`, S`Only when \(ab = 0\); in general there is a \(2ab\) term.`],
    ['A', S`Expanding \((x + a)(x + b)\) gives a constant term of \(ab\).`, S`It comes from multiplying the two numbers.`]
  ]);
  C('linear-equations', [
    ['T', S`\(\frac{x + 2}{3} = 5\) has solution \(x = 13\).`, S`\(x + 2 = 15\).`],
    ['F', S`\(5 - 2x = 11\) has solution \(x = 3\).`, S`\(-2x = 6\), so \(x = -3\).`],
    ['A', S`Doing the same operation to both sides keeps an equation balanced (except dividing by zero).`, S`Both sides change by the same amount or factor.`],
    ['S', S`The solution of a linear equation is a whole number.`, S`It might be a fraction, e.g. \(2x = 3\).`]
  ]);
  C('inequalities', [
    ['F', S`\(x^2 < 4\) means \(x < 2\).`, S`It means \(-2 < x < 2\).`],
    ['S', S`If \(a > b\), then \(\frac{1}{a} < \frac{1}{b}\).`, S`True if both are positive; false for \(a = 1,\ b = -1\).`],
    ['T', S`The integers satisfying \(3 < 2n + 1 \le 9\) are 2, 3 and 4.`, S`\(1 < n \le 4\).`],
    ['A', S`Adding the same number to both sides of an inequality keeps it true.`, S`It shifts both sides equally.`]
  ]);
  C('sequences', [
    ['S', S`An arithmetic sequence contains the number 0.`, S`6, 4, 2, 0, … does; 5, 3, 1, −1, … does not.`],
    ['T', S`The sequence \(2, 6, 18, 54, \dots\) is geometric.`, S`Each term is 3 times the previous one.`],
    ['F', S`The 20th term of \(7, 11, 15, \dots\) is 87.`, S`\(u_{20} = 7 + 19 \times 4 = 83\).`],
    ['N', S`The sequence \(4n\) contains an odd number.`, S`Every term is a multiple of 4.`]
  ]);
  C('straight-lines', [
    ['F', S`The line \(y = 5\) is vertical.`, S`It is horizontal; \(x = 5\) is vertical.`],
    ['T', S`The gradient of the line through \((1, 2)\) and \((3, 10)\) is 4.`, S`\(\frac{10 - 2}{3 - 1} = 4\).`],
    ['A', S`The point where a line meets the \(y\)-axis has \(x\)-coordinate 0.`, S`Every point on the \(y\)-axis has \(x = 0\).`],
    ['S', S`Two lines with the same \(y\)-intercept are the same line.`, S`Only if they also have the same gradient.`]
  ]);
  C('kinematic-graphs', [
    ['F', S`The area under a distance–time graph gives the speed.`, S`The gradient of a distance–time graph is the speed.`],
    ['A', S`A curved distance–time graph shows a changing speed.`, S`The gradient (the speed) changes.`],
    ['T', S`On a speed–time graph, a horizontal line means constant speed.`, S`The speed does not change with time.`],
    ['N', S`A distance–time graph for a real journey can slope backwards in time.`, S`Time always moves forwards.`]
  ]);
  C('angles-parallel', [
    ['T', S`Vertically opposite angles are equal.`, S`Both are \(180°\) minus the same angle.`],
    ['F', S`Corresponding angles add up to 180°.`, S`Corresponding angles are equal (for parallel lines); co-interior angles add to 180°.`],
    ['S', S`An isosceles triangle has an angle of 60°.`, S`An equilateral one does; one with angles 40°, 40°, 100° does not.`],
    ['A', S`Angles around a point add up to 360°.`, S`A full turn.`]
  ]);
  C('polygons', [
    ['F', S`Each interior angle of a regular octagon is 120°.`, S`Exterior angle 45°, so interior angle 135°.`],
    ['T', S`A regular polygon with exterior angle 24° has 15 sides.`, S`\(360 \div 24 = 15\).`],
    ['S', S`A shape with all sides equal has all angles equal.`, S`A rhombus has equal sides but not always equal angles.`],
    ['N', S`A polygon has an interior angle sum of 1000°.`, S`The sum is \(180(n - 2)\), a multiple of 180.`]
  ]);
  C('pythagoras-trig', [
    ['T', S`\(\tan 45° = 1\)`, S`In a right-angled isosceles triangle the opposite and adjacent sides are equal.`],
    ['F', S`If \(\sin x = 0.5\), then \(x = 0.5°\).`, S`\(x = \sin^{-1}(0.5) = 30°\).`],
    ['S', S`In a right-angled triangle, \(\sin x = \cos x\).`, S`Only when \(x = 45°\).`],
    ['A', S`For an acute angle \(x\), \(\sin x = \cos(90° - x)\).`, S`The opposite side for one angle is the adjacent side for the other.`]
  ]);
  C('circles', [
    ['F', S`The circumference of a circle of radius 5 cm is \(25\pi\) cm.`, S`\(C = 2\pi r = 10\pi\) cm; \(25\pi\) is the area.`],
    ['T', S`A circle with circumference \(12\pi\) has area \(36\pi\).`, S`\(r = 6\).`],
    ['A', S`Arc length is proportional to the angle at the centre.`, S`Arc \(= \frac{\theta}{360} \times 2\pi r\).`],
    ['N', S`The diameter is shorter than the radius.`, S`The diameter is twice the radius.`]
  ]);
  C('similar-shapes', [
    ['F', S`Two cones are similar with heights 3 cm and 6 cm, so the larger has twice the volume.`, S`Volume scale factor \(2^3 = 8\).`],
    ['T', S`All squares are similar.`, S`Each is an enlargement of the others.`],
    ['S', S`Two isosceles triangles are similar.`, S`Only if their angles match.`],
    ['A', S`In similar shapes, corresponding angles are equal.`, S`Enlargement preserves angles.`]
  ]);
  C('volume', [
    ['F', S`The surface area of a cube of side 3 cm is 27 cm².`, S`\(6 \times 9 = 54\) cm²; 27 cm³ is its volume.`],
    ['T', S`A cylinder of radius 1 and height 1 has volume \(\pi\).`, S`\(\pi r^2 h = \pi\).`],
    ['N', S`Doubling every length of a solid doubles its surface area.`, S`It multiplies the surface area by \(2^2 = 4\).`],
    ['A', S`The volume of a prism is area of cross-section × length.`, S`It is a stack of identical cross-sections.`]
  ]);
  C('vectors', [
    ['T', S`\(\begin{pmatrix} 3 \\ 4 \end{pmatrix}\) has magnitude 5.`, S`\(\sqrt{9 + 16} = 5\).`],
    ['F', S`\(2\begin{pmatrix} 1 \\ -3 \end{pmatrix} = \begin{pmatrix} 2 \\ -3 \end{pmatrix}\)`, S`Both components double: \(\begin{pmatrix} 2 \\ -6 \end{pmatrix}\).`],
    ['A', S`\(\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}\)`, S`Going from \(A\) to \(B\) then to \(C\) is the same as going from \(A\) to \(C\).`],
    ['S', S`Two vectors with the same magnitude are equal.`, S`They also need the same direction.`]
  ]);
  C('transformations', [
    ['F', S`A translation by \(\begin{pmatrix} 2 \\ -3 \end{pmatrix}\) moves a shape 2 left and 3 up.`, S`2 right and 3 down.`],
    ['T', S`Reflecting in \(y = x\) maps \((a, b)\) to \((b, a)\).`, S`The coordinates swap.`],
    ['S', S`Reflecting a shape twice gives the original position.`, S`In the same line, yes; in two different lines you get a rotation or translation.`],
    ['N', S`An enlargement changes the angles of a shape.`, S`Angles are preserved.`]
  ]);
  C('averages', [
    ['T', S`The median of 3, 9, 4, 1, 8 is 4.`, S`Ordered: 1, 3, 4, 8, 9.`],
    ['F', S`The mean of a set of whole numbers is always a whole number.`, S`The mean of 1 and 2 is 1.5.`],
    ['S', S`The mean is one of the data values.`, S`Only sometimes, e.g. 1, 2, 3 (mean 2) but not 1, 2 (mean 1.5).`],
    ['A', S`If every value is doubled, the median doubles.`, S`The order is unchanged, so the middle value doubles.`]
  ]);
  C('stats-diagrams', [
    ['T', S`The interquartile range is \(Q_3 - Q_1\).`, S`It is the range of the middle half of the data.`],
    ['F', S`In a box plot, the box shows the range.`, S`The box shows the interquartile range; the whiskers show the range.`],
    ['S', S`Two data sets with the same median have the same box plot.`, S`Their quartiles and extremes may differ.`],
    ['A', S`A pie chart sector angle is proportional to frequency.`, S`Angle \(= \frac{f}{\text{total}} \times 360°\).`]
  ]);
  C('probability', [
    ['T', S`Rolling a fair dice twice, the probability of two sixes is \(\frac{1}{36}\).`, S`\(\frac{1}{6} \times \frac{1}{6}\).`],
    ['F', S`If there are two outcomes, each has probability \(\frac{1}{2}\).`, S`Only if the outcomes are equally likely.`],
    ['S', S`Relative frequency equals the theoretical probability.`, S`It tends towards it with more trials but is rarely exactly equal.`],
    ['A', S`Expected frequency = probability × number of trials.`, S`Definition of expected frequency.`]
  ]);
  C('sets', [
    ['T', S`If \(\xi = \{1, 2, \dots, 10\}\) and \(A = \{\text{even numbers}\}\), then \(n(A') = 5\).`, S`\(A' = \{1, 3, 5, 7, 9\}\).`],
    ['F', S`\(A \cap B\) contains all the elements in \(A\) or \(B\).`, S`That is \(A \cup B\); \(A \cap B\) contains elements in both.`],
    ['S', S`\(A \cup B = A\)`, S`Only when \(B \subseteq A\).`],
    ['A', S`\((A \cup B)' = A' \cap B'\)`, S`Not in either set means not in \(A\) and not in \(B\).`]
  ]);
  C('surds', [
    ['F', S`\(\sqrt{12} = 4\sqrt{3}\)`, S`\(\sqrt{12} = \sqrt{4}\sqrt{3} = 2\sqrt{3}\).`],
    ['T', S`\(\sqrt{50} = 5\sqrt{2}\)`, S`\(\sqrt{25 \times 2}\).`],
    ['S', S`\(\sqrt{a} + \sqrt{b}\) can be simplified to a single surd.`, S`\(\sqrt{2} + \sqrt{8} = 3\sqrt{2}\), but \(\sqrt{2} + \sqrt{3}\) cannot.`],
    ['N', S`\(\sqrt{2}\) can be written as a fraction of two integers.`, S`It is irrational.`]
  ]);
  C('bounds', [
    ['T', S`A mass of 3.4 kg to 1 d.p. has lower bound 3.35 kg.`, S`Half of 0.1 below 3.4.`],
    ['S', S`The upper bound of a product uses both upper bounds.`, S`For positive quantities yes; with negative values it may not.`],
    ['F', S`An error interval for 80 (to the nearest 10) is \(79.5 \le x < 80.5\).`, S`\(75 \le x < 85\).`],
    ['A', S`Rounding to a coarser degree of accuracy gives a wider error interval.`, S`The half-unit is larger.`]
  ]);
  C('simultaneous', [
    ['F', S`\(x + y = 10\) and \(x - y = 2\) have solution \(x = 4,\ y = 6\).`, S`Adding gives \(2x = 12\): \(x = 6,\ y = 4\).`],
    ['T', S`You can check a solution by substituting into both original equations.`, S`It must satisfy both.`],
    ['S', S`Elimination is quicker than substitution.`, S`It depends on the equations.`],
    ['N', S`\(y = 2x + 1\) and \(y = 2x + 3\) have a solution.`, S`Parallel lines never meet.`]
  ]);
  C('quadratics', [
    ['T', S`\(x^2 - 5x + 6 = 0\) has roots 2 and 3.`, S`\((x - 2)(x - 3) = 0\).`],
    ['S', S`A quadratic with a positive constant term has positive roots.`, S`\(x^2 + 5x + 6\) has roots \(-2, -3\).`],
    ['A', S`The roots of \(ax^2 + bx + c = 0\) are where \(y = ax^2 + bx + c\) crosses the \(x\)-axis.`, S`There \(y = 0\).`],
    ['F', S`\(x^2 + 4x + 7 = (x + 2)^2 + 7\)`, S`\((x + 2)^2 + 3\).`]
  ]);
  C('rearranging', [
    ['T', S`Making \(x\) the subject of \(y = 3x - 4\) gives \(x = \frac{y + 4}{3}\).`, S`Add 4, then divide by 3.`],
    ['F', S`If \(v = u + at\), then \(t = v - u - a\).`, S`\(t = \frac{v - u}{a}\).`],
    ['S', S`Rearranging a formula gives a unique answer for the subject.`, S`Square roots can give \(\pm\), e.g. \(x^2 = y\).`],
    ['A', S`To undo squaring, you take the square root.`, S`They are inverse operations (for non-negative values).`]
  ]);
  C('functions', [
    ['T', S`If \(f(x) = 2x + 1\), then \(f^{-1}(x) = \frac{x - 1}{2}\).`, S`Reverse the operations.`],
    ['F', S`If \(f(x) = x^2\), then \(f(-3) = -9\).`, S`\((-3)^2 = 9\).`],
    ['S', S`A function is its own inverse.`, S`\(f(x) = \frac{1}{x}\) and \(f(x) = -x\) are; most are not.`],
    ['A', S`\(fg(x)\) means apply \(g\) first, then \(f\).`, S`The function nearest \(x\) acts first.`]
  ]);
  C('graphs', [
    ['T', S`\(y = x^3\) passes through the origin.`, S`\(0^3 = 0\).`],
    ['F', S`\(y = -f(x)\) is a reflection of \(y = f(x)\) in the \(y\)-axis.`, S`It is a reflection in the \(x\)-axis.`],
    ['A', S`\(y = \sin x\) and \(y = \cos x\) cross between 0° and 360°.`, S`They cross at 45° and 225°.`],
    ['A', S`\(y = \frac{1}{x}\) has rotational symmetry about the origin.`, S`\(f(-x) = -f(x)\).`]
  ]);
  C('differentiation', [
    ['T', S`The gradient of \(y = x^2\) at \(x = 3\) is 6.`, S`\(\frac{dy}{dx} = 2x\).`],
    ['F', S`The derivative of \(5x\) is 5x.`, S`It is 5.`],
    ['S', S`A curve has a turning point.`, S`\(y = x^3\) has none (just a point of inflection), and lines have none.`],
    ['A', S`If \(\frac{dy}{dx} > 0\), the curve is increasing.`, S`Positive gradient.`]
  ]);
  C('sine-cosine', [
    ['T', S`In triangle \(ABC\), \(\frac{a}{\sin A} = \frac{b}{\sin B}\).`, S`The sine rule.`],
    ['F', S`The cosine rule can only be used in right-angled triangles.`, S`It works in any triangle.`],
    ['S', S`To find a missing angle you need the cosine rule.`, S`The sine rule works if you know a side–angle pair.`],
    ['A', S`If \(a^2 > b^2 + c^2\), angle \(A\) is obtuse.`, S`Then \(\cos A < 0\).`]
  ]);
  C('circle-theorems', [
    ['T', S`The angle at the centre is twice the angle at the circumference subtended by the same arc.`, S`A standard circle theorem.`],
    ['F', S`The angle between a tangent and a chord equals the angle at the centre.`, S`It equals the angle in the alternate segment.`],
    ['A', S`A quadrilateral whose opposite angles add up to 180° is cyclic.`, S`This is the converse of the cyclic quadrilateral theorem.`],
    ['A', S`The perpendicular from the centre to a chord bisects the chord.`, S`Two congruent right-angled triangles.`]
  ]);
  C('intersecting-chords', [
    ['S', S`Two chords that meet inside a circle bisect each other.`, S`Only if both are diameters.`],
    ['A', S`Lengths \(PA \times PB\) are the same for every line through \(P\) meeting the circle at \(A\) and \(B\).`, S`The power of the point \(P\).`]
  ]);
  C('fm-counting', [
    ['T', S`There are 6 ways to arrange 3 different books in a row.`, S`\(3! = 6\).`],
    ['F', S`There are \(4 + 3 = 7\) outfits from 4 shirts and 3 trousers.`, S`Product rule: \(4 \times 3 = 12\).`],
    ['A', S`If one choice has \(m\) options and another independent choice has \(n\), together there are \(mn\) options.`, S`The product rule for counting.`]
  ]);
  C('fm-surds', [
    ['T', S`\(\frac{1}{\sqrt{5} - 2} = \sqrt{5} + 2\)`, S`Multiply by \(\sqrt{5} + 2\): denominator \(5 - 4 = 1\).`],
    ['F', S`\(\sqrt{8} + \sqrt{2} = \sqrt{10}\)`, S`\(2\sqrt{2} + \sqrt{2} = 3\sqrt{2}\).`],
    ['N', S`\((\sqrt{3})^4\) is irrational.`, S`It equals 9.`]
  ]);
  C('fm-functions', [
    ['T', S`If \(f(x) = \sqrt{x - 2}\), the domain is \(x \ge 2\).`, S`The square root needs a non-negative input.`],
    ['F', S`The range of \(f(x) = 3 - x^2\) is \(f(x) \ge 3\).`, S`\(f(x) \le 3\).`],
    ['A', S`A composite \(fg(x)\) requires the outputs of \(g\) to be valid inputs of \(f\).`, S`Otherwise \(f\) cannot be applied.`]
  ]);
  C('fm-algebra', [
    ['T', S`\(\frac{2}{x} + \frac{3}{x + 1} = \frac{5x + 2}{x(x + 1)}\)`, S`\(2(x + 1) + 3x = 5x + 2\).`],
    ['F', S`\(x^3 - x = x(x^2 - 1)\) is fully factorised.`, S`\(x(x - 1)(x + 1)\).`],
    ['S', S`\(\frac{a + b}{a} = 1 + b\)`, S`It is \(1 + \frac{b}{a}\); equal only when \(a = 1\) (or \(b = 0\)).`]
  ]);
  C('fm-binomial', [
    ['T', S`The 4th row of Pascal's triangle is 1, 4, 6, 4, 1.`, S`These are the coefficients of \((a + b)^4\).`],
    ['F', S`The coefficient of \(x^2\) in \((1 + x)^6\) is 12.`, S`\(\binom{6}{2} = 15\).`],
    ['S', S`All the coefficients in the expansion of \((1 - x)^n\) are positive.`, S`They alternate in sign.`]
  ]);
  C('fm-factor', [
    ['T', S`The remainder when \(f(x)\) is divided by \((x - 3)\) is \(f(3)\).`, S`The remainder theorem.`],
    ['F', S`If \(f(x) = x^3 - 8\), then \((x + 2)\) is a factor.`, S`\(f(-2) = -16\); \((x - 2)\) is a factor.`],
    ['A', S`A cubic with integer coefficients and leading coefficient 1 has any integer roots among the factors of the constant term.`, S`The product of the roots relates to the constant term.`]
  ]);
  C('fm-quadratics', [
    ['T', S`The line of symmetry of \(y = x^2 - 8x + 3\) is \(x = 4\).`, S`Completing the square: \((x - 4)^2 - 13\).`],
    ['F', S`\(2x^2 + 12x + 5 = 2(x + 3)^2 + 5\)`, S`\(2(x + 3)^2 - 13\).`],
    ['S', S`Completing the square shows the minimum value.`, S`For a positive \(x^2\) coefficient; with a negative one it shows the maximum.`]
  ]);
  C('fm-graphs', [
    ['F', S`The graph of \(y = 3^{-x}\) increases as \(x\) increases.`, S`It decreases: it is \(\left(\frac{1}{3}\right)^x\).`],
    ['S', S`A piecewise function has a gap in its graph.`, S`Only if the pieces don't meet.`],
    ['A', S`\(y = 2^x\) is always positive.`, S`Powers of a positive base are positive.`]
  ]);
  C('fm-equations', [
    ['F', S`A pair of equations with one linear and one quadratic always has two solutions.`, S`It can have 0, 1 or 2.`],
    ['A', S`In three equations with three unknowns, eliminating one variable gives two equations in two unknowns.`, S`That is the standard method.`]
  ]);
  C('fm-inequalities', [
    ['F', S`The solution of \(x^2 - 4x < 0\) is \(x < 4\).`, S`\(0 < x < 4\).`],
    ['A', S`For a quadratic inequality, a sketch of the graph shows where it is positive or negative.`, S`Read off where the curve is above or below the axis.`],
    ['S', S`A quadratic inequality has a solution.`, S`\(x^2 + 1 < 0\) has none.`]
  ]);
  C('fm-indices', [
    ['F', S`\(16^{\frac{3}{4}} = 12\)`, S`\(\sqrt[4]{16} = 2\), then \(2^3 = 8\).`],
    ['A', S`\(a^{-n} = \frac{1}{a^n}\) for \(a \ne 0\).`, S`Definition of negative powers.`],
    ['T', S`If \(2^x = 32\), then \(x = 5\).`, S`\(2^5 = 32\).`]
  ]);
  C('fm-proof', [
    ['F', S`The square of an odd number is even.`, S`\((2n + 1)^2 = 4n^2 + 4n + 1\), odd.`],
    ['A', S`The sum of three consecutive integers is a multiple of 3.`, S`\((n - 1) + n + (n + 1) = 3n\).`],
    ['T', S`One counterexample is enough to disprove a statement.`, S`A statement claimed for all cases fails if one case fails.`]
  ]);
  C('fm-sequences', [
    ['F', S`The sequence \(n^2 + 1\) has a constant first difference.`, S`Differences 3, 5, 7, …: the second difference is constant.`],
    ['N', S`\(\frac{n}{n + 1}\) is greater than 1 for some \(n \ge 1\).`, S`The numerator is less than the denominator.`],
    ['T', S`The \(n\)th term of 3, 6, 11, 18, 27, … is \(n^2 + 2\).`, S`Check \(n = 1, 2, 3\).`]
  ]);
  C('fm-coord', [
    ['F', S`The midpoint of \((2, 5)\) and \((6, -1)\) is \((4, 3)\).`, S`\((4, 2)\).`],
    ['S', S`Three points are collinear.`, S`Only if the gradients between pairs are equal.`],
    ['T', S`The line \(y = -\frac{1}{2}x + 3\) is perpendicular to \(y = 2x - 1\).`, S`\(2 \times -\frac{1}{2} = -1\).`]
  ]);
  C('fm-circles', [
    ['F', S`The circle \((x - 1)^2 + y^2 = 9\) passes through the origin.`, S`\(1 + 0 = 1 \ne 9\).`],
    ['T', S`The point \((3, 4)\) lies on \(x^2 + y^2 = 25\).`, S`\(9 + 16 = 25\).`],
    ['S', S`A line meets a circle twice.`, S`It might be a tangent or miss the circle.`]
  ]);
  C('fm-calculus', [
    ['F', S`If \(y = 4x^3\), then \(\frac{dy}{dx} = 4x^2\).`, S`\(12x^2\).`],
    ['T', S`At a minimum point the gradient changes from negative to positive.`, S`The curve falls then rises.`],
    ['A', S`A tangent to a straight line is the line itself.`, S`Its gradient is constant.`]
  ]);
  C('fm-matrices', [
    ['F', S`The matrix \(\begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}\) is a reflection.`, S`It is an enlargement, scale factor 2.`],
    ['T', S`\(\mathbf{I}\mathbf{A} = \mathbf{A}\) for any \(2 \times 2\) matrix \(\mathbf{A}\).`, S`The identity matrix leaves matrices unchanged.`],
    ['A', S`The columns of a transformation matrix are the images of \((1, 0)\) and \((0, 1)\).`, S`Multiply the matrix by each unit vector.`]
  ]);
  C('fm-trig', [
    ['F', S`\(\cos 60° = \frac{\sqrt{3}}{2}\)`, S`\(\cos 60° = \frac{1}{2}\).`],
    ['T', S`\(\tan 30° = \frac{1}{\sqrt{3}}\)`, S`From the 30–60–90 triangle.`],
    ['N', S`\(\sin x = 1.5\) has a solution.`, S`\(-1 \le \sin x \le 1\).`]
  ]);
  C('fm-geometry', [
    ['S', S`Two lines in 3D that never meet are parallel.`, S`They might be skew.`],
    ['A', S`The angle subtended at the centre is twice the angle at the circumference on the same arc.`, S`A circle theorem used in proofs.`],
    ['T', S`The area of a triangle is \(\frac{1}{2}ab\sin C\).`, S`Height \(= b\sin C\).`]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
