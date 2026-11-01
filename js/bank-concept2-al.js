/* Byte Size Classroom — more reasoning statements (set 2): A level Mathematics (Pearson Edexcel). */
(function (g) {
  var BS = g.BS, S = String.raw, C = BS.concept;

  C('al-indices', [
    ['T', S`\(\sqrt{18} + \sqrt{8} = 5\sqrt{2}\)`, S`\(3\sqrt{2} + 2\sqrt{2}\).`],
    ['F', S`\(\left(\frac{4}{9}\right)^{-\frac{1}{2}} = -\frac{2}{3}\)`, S`\(\left(\frac{9}{4}\right)^{\frac{1}{2}} = \frac{3}{2}\).`],
    ['S', S`\(\sqrt{a}\sqrt{b}\) is an integer when \(a\) and \(b\) are non-square integers.`, S`\(\sqrt{2}\sqrt{8} = 4\) but \(\sqrt{2}\sqrt{3} = \sqrt{6}\).`]
  ]);
  C('al-quadratics', [
    ['T', S`\(x^4 - 5x^2 + 4 = 0\) has four real roots.`, S`\((x^2 - 1)(x^2 - 4) = 0\): \(\pm 1, \pm 2\).`],
    ['F', S`If the discriminant is 0, the quadratic has no real roots.`, S`It has one repeated real root.`],
    ['A', S`A quadratic \(ax^2 + bx + c\) with \(a > 0\) and \(c < 0\) has two distinct real roots.`, S`\(b^2 - 4ac > 0\) because \(-4ac > 0\).`],
    ['N', S`A quadratic function \(f(x) = ax^2 + bx + c\) (\(a \ne 0\)) is one-to-one on all of \(\mathbb{R}\).`, S`Its graph is symmetric about the vertex.`]
  ]);
  C('al-equations', [
    ['T', S`\(y > x^2\) describes the region above the parabola.`, S`Points with \(y\)-values greater than \(x^2\).`],
    ['F', S`Solving \(\frac{1}{x} < 2\) by multiplying by \(x\) gives \(x > \frac{1}{2}\).`, S`\(x\) may be negative; the solution is \(x < 0\) or \(x > \frac{1}{2}\).`],
    ['A', S`If a line is a tangent to a curve, substituting gives an equation with a repeated root.`, S`The discriminant is zero.`]
  ]);
  C('al-graphs', [
    ['T', S`\(y = f(x) + a\) and \(y = f(x + a)\) are different transformations when \(a \ne 0\).`, S`One is vertical, the other horizontal.`],
    ['F', S`\(y = x(x - 2)^2\) crosses the \(x\)-axis at \(x = 2\).`, S`It touches the axis there (repeated root).`],
    ['N', S`\(y = \frac{1}{x^2}\) takes negative values.`, S`\(x^2 > 0\), so \(y > 0\).`],
  ]);
  C('al-lines', [
    ['T', S`The perpendicular bisector of \((0, 0)\) and \((4, 2)\) passes through \((2, 1)\).`, S`It passes through the midpoint.`],
    ['F', S`The lines \(y = 3x\) and \(y = 3x + 1\) meet at one point.`, S`They are parallel.`],
    ['A', S`The distance between \((x_1, y_1)\) and \((x_2, y_2)\) is \(\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\).`, S`Pythagoras.`]
  ]);
  C('al-circles', [
    ['T', S`The tangent to \(x^2 + y^2 = 25\) at \((3, 4)\) has gradient \(-\frac{3}{4}\).`, S`Radius gradient \(\frac{4}{3}\); perpendicular.`],
    ['F', S`The angle in a semicircle is 180°.`, S`It is 90°.`],
    ['S', S`A line meets a circle at two points.`, S`It could be a tangent (one) or miss (none).`]
  ]);
  C('al-algebraic', [
    ['T', S`\(x^3 - 1 = (x - 1)(x^2 + x + 1)\)`, S`Expand to check.`],
    ['F', S`Dividing \(x^3 + 2x + 1\) by \((x - 1)\) leaves remainder 0.`, S`\(f(1) = 4\), so the remainder is 4.`],
    ['A', S`Proof by exhaustion checks every possible case.`, S`That is its definition.`]
  ]);
  C('al-binomial', [
    ['T', S`In \((2 + x)^5\), the coefficient of \(x^4\) is 10.`, S`\(\binom{5}{4} \times 2 = 10\).`],
    ['F', S`\((1 + x)^{10} \approx 1 + 10x\) is accurate for any \(x\).`, S`Only for small \(x\).`],
    ['S', S`The coefficient of \(x^r\) in \((a + bx)^n\) is positive.`, S`It depends on the signs of \(a\) and \(b\).`]
  ]);
  C('al-trig', [
    ['T', S`\(\sin x = \sin(180° - x)\)`, S`Symmetry of the sine graph.`],
    ['F', S`\(\cos x = 0.3\) has exactly one solution in \(0° \le x < 360°\).`, S`Two: \(x\) and \(360° - x\).`],
    ['S', S`\(\tan x\) is defined.`, S`Not at 90°, 270°, …`],
    ['N', S`\(\sin^2 x + \cos^2 x = 2\) for some \(x\).`, S`It always equals 1.`]
  ]);
  C('al-vectors', [
    ['T', S`Vectors \(2\mathbf{i} + 3\mathbf{j}\) and \(4\mathbf{i} + 6\mathbf{j}\) are parallel.`, S`One is twice the other.`],
    ['F', S`The position vector of \((3, -1)\) is \(-\mathbf{i} + 3\mathbf{j}\).`, S`\(3\mathbf{i} - \mathbf{j}\).`],
    ['S', S`The resultant of two forces is bigger than both forces.`, S`Not if they act in opposite directions.`]
  ]);
  C('al-differentiation', [
    ['T', S`If \(y = \sqrt{x}\), then \(\frac{dy}{dx} = \frac{1}{2\sqrt{x}}\).`, S`\(x^{\frac{1}{2}} \to \frac{1}{2}x^{-\frac{1}{2}}\).`],
    ['F', S`\(\frac{d^2y}{dx^2} = 0\) means a point of inflection.`, S`Not necessarily: \(y = x^4\) at 0 is a minimum.`],
    ['S', S`A cubic has two stationary points.`, S`It may have none or one (e.g. \(x^3\)).`]
  ]);
  C('al-integration', [
    ['T', S`The area between \(y = x^2\) and the \(x\)-axis from 0 to 3 is 9.`, S`\(\left[\frac{x^3}{3}\right]_0^3 = 9\).`],
    ['F', S`\(\int 2x(x + 1)\,dx = x^2 \times \left(\frac{x^2}{2} + x\right) + c\)`, S`Expand first: \(\int (2x^2 + 2x)\,dx = \frac{2}{3}x^3 + x^2 + c\).`],
    ['S', S`A definite integral is positive.`, S`It is negative if the curve is mostly below the axis.`]
  ]);
  C('al-explog', [
    ['T', S`\(\log_2 8 = 3\)`, S`\(2^3 = 8\).`],
    ['F', S`\(\ln(e^2 + 1) = 3\)`, S`\(\ln(e^2 + 1) \approx 2.13\); \(\ln(e^2) = 2\).`],
    ['A', S`\(\log_a(x^n) = n\log_a x\) for \(x > 0\).`, S`A law of logarithms.`],
    ['N', S`\(e^x = 0\) has a solution.`, S`\(e^x > 0\) for all \(x\).`]
  ]);
  C('al-sampling', [
    ['F', S`A census is a sample.`, S`A census uses the whole population.`],
    ['T', S`Opportunity sampling is easy but likely to be biased.`, S`It uses whoever is available.`],
    ['A', S`A sampling frame lists the sampling units of the population.`, S`Definition.`]
  ]);
  C('al-location', [
    ['T', S`Interpolation assumes data are evenly spread within each class.`, S`That is how the median is estimated from grouped data.`],
    ['F', S`The variance is the square root of the standard deviation.`, S`The standard deviation is the square root of the variance.`],
    ['S', S`The mean and median of a data set are equal.`, S`For symmetric data they are; otherwise not.`]
  ]);
  C('al-representations', [
    ['F', S`A box plot shows every data value.`, S`It shows the five-number summary and outliers.`],
    ['T', S`Cumulative frequency is plotted at the upper class boundary.`, S`It counts all values up to that boundary.`],
    ['S', S`The median line is in the middle of the box on a box plot.`, S`Only when the middle half of the data is symmetric.`],
  ]);
  C('al-correlation', [
    ['F', S`A gradient of 3 in the regression line \(y = a + 3x\) means strong correlation.`, S`The gradient doesn't measure strength; \(r\) does.`],
    ['T', S`The regression line \(y = a + bx\) passes through \((\bar{x}, \bar{y})\).`, S`A property of least-squares regression.`],
    ['N', S`The PMCC can be 1.2.`, S`\(-1 \le r \le 1\).`]
  ]);
  C('al-probability', [
    ['T', S`If \(P(A) = 0.3\), \(P(B) = 0.5\) and \(A\), \(B\) are independent, \(P(A \cap B) = 0.15\).`, S`\(0.3 \times 0.5\).`],
    ['F', S`\(P(A \cup B) = P(A) + P(B)\) for any events.`, S`Only for mutually exclusive events.`],
    ['S', S`A tree diagram's second-stage probabilities are the same on every branch.`, S`Only if the events are independent.`]
  ]);
  C('al-binomial-dist', [
    ['T', S`For \(X \sim B(n, p)\), \(P(X = 0) = (1 - p)^n\).`, S`All \(n\) trials fail.`],
    ['F', S`\(P(X < 4) = P(X \le 4)\) for a binomial variable.`, S`\(P(X < 4) = P(X \le 3)\).`],
    ['A', S`The binomial distribution is discrete.`, S`It counts successes.`]
  ]);
  C('al-hypothesis', [
    ['T', S`A one-tailed test has the critical region in one tail only.`, S`\(H_1\) states a direction.`],
    ['F', S`The significance level is the probability that \(H_0\) is true.`, S`It is the probability of rejecting \(H_0\) when it is true.`],
    ['S', S`A result that is significant at 5% is significant at 1%.`, S`Only if the \(p\)-value is below 0.01.`]
  ]);
  C('al-suvat', [
    ['T', S`A ball thrown upwards at \(u\) m s⁻¹ returns to its starting point with speed \(u\) m s⁻¹ (no air resistance).`, S`By symmetry, or \(v^2 = u^2 + 2as\) with \(s = 0\).`],
    ['F', S`\(s = ut + at^2\)`, S`\(s = ut + \frac{1}{2}at^2\).`],
    ['A', S`On a velocity–time graph, the gradient is the acceleration.`, S`Change in velocity over time.`]
  ]);
  C('al-forces', [
    ['F', S`Weight and mass are the same thing.`, S`Weight is a force \(mg\) (newtons); mass is in kilograms.`],
    ['T', S`For connected particles moving together, they have the same acceleration.`, S`The string stays taut and inextensible.`],
    ['S', S`The tension in a string equals the weight it supports.`, S`Only in equilibrium (or constant velocity).`]
  ]);
  C('al-variable-acc', [
    ['T', S`If \(a = 6t\) and \(v = 0\) when \(t = 0\), then \(v = 3t^2\).`, S`Integrate and use the initial condition.`],
    ['F', S`The maximum velocity occurs when \(v = 0\).`, S`It occurs when \(a = \frac{dv}{dt} = 0\).`],
    ['A', S`\(s = \int v\,dt\)`, S`Displacement is the integral of velocity.`]
  ]);
  C('al-lds', [
    ['T', S`Leuchars and Camborne are UK weather stations in the large data set.`, S`It includes five UK stations and three overseas ones.`],
    ['F', S`Daily mean wind speed in the large data set is given in metres per second.`, S`It is in knots.`],
    ['S', S`The large data set has a value for every variable on every day.`, S`Some values are missing ("n/a").`]
  ]);

  C('a2-proof', [
    ['T', S`To prove "if \(n^2\) is even then \(n\) is even" by contradiction, assume \(n\) is odd.`, S`Then \(n^2\) is odd, a contradiction.`],
    ['F', S`\(\frac{x^2}{(x - 1)(x + 1)}\) can be split into partial fractions without dividing first.`, S`The fraction is improper: divide first.`],
    ['A', S`\(\frac{1}{x(x + 1)} = \frac{1}{x} - \frac{1}{x + 1}\)`, S`Combine the right-hand side to check.`]
  ]);
  C('a2-functions', [
    ['T', S`\(|x - 3| < 2\) means \(1 < x < 5\).`, S`\(x\) is within 2 of 3.`],
    ['F', S`The function \(f(x) = x^2\), \(x \in \mathbb{R}\), has an inverse.`, S`It is many-to-one; restrict the domain to \(x \ge 0\).`],
    ['S', S`\(f(x) = f^{-1}(x)\) has solutions on the line \(y = x\).`, S`For increasing functions any intersection is on \(y = x\); decreasing ones can meet elsewhere.`]
  ]);
  C('a2-sequences', [
    ['T', S`\(\sum_{r=1}^{n} r = \frac{n(n + 1)}{2}\)`, S`Arithmetic series with \(a = 1, d = 1\).`],
    ['F', S`The sum to infinity of \(8 + 4 + 2 + \dots\) is 14.`, S`\(\frac{8}{1 - \frac{1}{2}} = 16\).`],
    ['S', S`An increasing sequence diverges.`, S`\(1 - \frac{1}{n}\) increases but converges to 1.`]
  ]);
  C('a2-binomial', [
    ['F', S`\((1 - x)^{-1} = 1 - x + x^2 - x^3 + \dots\)`, S`It is \(1 + x + x^2 + x^3 + \dots\)`],
    ['T', S`\((4 + x)^{\frac{1}{2}} = 2\left(1 + \frac{x}{4}\right)^{\frac{1}{2}}\)`, S`Take out \(4^{\frac{1}{2}} = 2\).`],
    ['S', S`A binomial expansion is a finite series.`, S`Only for non-negative integer powers.`]
  ]);
  C('a2-radians', [
    ['T', S`The area of a sector is \(\frac{1}{2}r^2\theta\) with \(\theta\) in radians.`, S`Fraction \(\frac{\theta}{2\pi}\) of \(\pi r^2\).`],
    ['F', S`For small \(\theta\), \(\tan\theta \approx 1\).`, S`\(\tan\theta \approx \theta\).`],
    ['A', S`One radian is about 57.3°.`, S`\(\frac{180}{\pi}\).`]
  ]);
  C('a2-trigfn', [
    ['F', S`\(\cot x = \frac{\sin x}{\cos x}\)`, S`\(\cot x = \frac{\cos x}{\sin x}\).`],
    ['T', S`\(1 + \cot^2 x = \csc^2 x\)`, S`Divide \(\sin^2 x + \cos^2 x = 1\) by \(\sin^2 x\).`],
    ['N', S`\(\sec x = 0.5\) has a solution.`, S`\(|\sec x| \ge 1\).`]
  ]);
  C('a2-trigadd', [
    ['T', S`\(\sin 2x = 2\sin x\cos x\)`, S`From \(\sin(A + B)\) with \(A = B = x\).`],
    ['F', S`\(\cos(A - B) = \cos A - \cos B\)`, S`\(\cos A\cos B + \sin A\sin B\).`],
    ['S', S`\(\tan 2x = 2\tan x\)`, S`Only when \(\tan x = 0\).`]
  ]);
  C('a2-parametric', [
    ['T', S`For \(x = t^2,\ y = 2t\), the Cartesian equation is \(y^2 = 4x\).`, S`\(t = \frac{y}{2}\).`],
    ['F', S`The area under a parametric curve is \(\int y\,dt\).`, S`It is \(\int y\frac{dx}{dt}\,dt\).`],
    ['S', S`A parametric curve passes each point once.`, S`It may cross itself.`]
  ]);
  C('a2-differentiation', [
    ['T', S`\(\frac{d}{dx}(\tan x) = \sec^2 x\)`, S`Quotient rule on \(\frac{\sin x}{\cos x}\).`],
    ['F', S`\(\frac{d}{dx}(e^{x^2}) = e^{x^2}\)`, S`Chain rule: \(2xe^{x^2}\).`],
    ['A', S`\(\frac{dy}{dx} = \frac{1}{dx/dy}\) where \(\frac{dx}{dy} \ne 0\).`, S`Inverse rates.`]
  ]);
  C('a2-numerical', [
    ['T', S`The trapezium rule overestimates the area under a curve that is convex (concave up).`, S`The chords lie above the curve.`],
    ['F', S`If \(f(a)\) and \(f(b)\) have the same sign, there is no root between \(a\) and \(b\).`, S`There could be an even number of roots between them.`],
    ['S', S`Different rearrangements of \(f(x) = 0\) give iterations that converge to the same root.`, S`Some diverge or converge to a different root.`]
  ]);
  C('a2-integration', [
    ['F', S`\(\int \sin 2x\,dx = 2\cos 2x + c\)`, S`\(-\frac{1}{2}\cos 2x + c\).`],
    ['T', S`\(\int e^{3x}\,dx = \frac{1}{3}e^{3x} + c\)`, S`Reverse of the chain rule.`],
    ['S', S`Integration by substitution needs the limits changing.`, S`Only for definite integrals (or substitute back).`]
  ]);
  C('a2-vectors', [
    ['T', S`Points \(A\), \(B\), \(C\) are collinear if \(\overrightarrow{AB} = k\overrightarrow{AC}\).`, S`Parallel vectors through a common point.`],
    ['F', S`The vector \(\mathbf{i} + \mathbf{j} + \mathbf{k}\) has magnitude 3.`, S`\(\sqrt{3}\).`],
    ['A', S`A unit vector has magnitude 1.`, S`Definition.`]
  ]);
  C('a2-regression', [
    ['F', S`A PMCC of 0 means the variables are unrelated.`, S`There may be a non-linear relationship.`],
    ['T', S`If \(y = ax^n\), then \(\log y = \log a + n\log x\).`, S`Take logs of both sides.`],
    ['S', S`A larger sample makes a correlation test more likely to find significance.`, S`The critical value decreases as \(n\) increases, for the same \(r\).`]
  ]);
  C('a2-probability', [
    ['T', S`\(P(A' \mid B) = 1 - P(A \mid B)\)`, S`Given \(B\), either \(A\) happens or it doesn't.`],
    ['F', S`If \(P(A \mid B) = P(B \mid A)\), then \(A\) and \(B\) are independent.`, S`It means \(P(A) = P(B)\) (when \(P(A \cap B) > 0\)).`],
    ['S', S`\(P(A \mid B) > P(A)\)`, S`Only when \(B\) makes \(A\) more likely.`]
  ]);
  C('a2-normal', [
    ['T', S`If \(X \sim N(50, 4^2)\), then \(P(X > 50) = 0.5\).`, S`Symmetry about the mean.`],
    ['F', S`\(N(\mu, \sigma^2)\) has standard deviation \(\sigma^2\).`, S`\(\sigma^2\) is the variance.`],
    ['S', S`A binomial distribution can be approximated by a normal one.`, S`When \(n\) is large and \(p\) is close to 0.5.`]
  ]);
  C('a2-moments', [
    ['T', S`The moment of a force is force × perpendicular distance from the pivot.`, S`Definition.`],
    ['F', S`A plank on the point of tipping about a support has positive reaction at the other support.`, S`That reaction is zero.`],
    ['A', S`In equilibrium, clockwise moments equal anticlockwise moments about any point.`, S`The resultant moment is zero.`]
  ]);
  C('a2-friction', [
    ['T', S`Limiting friction is \(\mu R\).`, S`It is the maximum friction available.`],
    ['F', S`The coefficient of friction must be less than 1.`, S`It can exceed 1.`],
    ['S', S`A particle on a rough slope stays at rest.`, S`Only if \(\tan\theta \le \mu\).`]
  ]);
  C('a2-projectiles', [
    ['T', S`Maximum range on level ground (no air resistance) is at 45°.`, S`Range \(= \frac{u^2\sin 2\theta}{g}\).`],
    ['F', S`A heavier projectile falls faster (ignoring air resistance).`, S`All objects have the same acceleration \(g\).`],
    ['A', S`Horizontal and vertical motion can be treated separately.`, S`They are independent.`]
  ]);
  C('a2-statics', [
    ['T', S`For a particle in equilibrium, the forces resolved in any direction sum to zero.`, S`The resultant force is zero.`],
    ['S', S`A ladder resting against a rough wall needs friction at the ground.`, S`It depends on the wall friction and angle.`],
    ['A', S`Three forces in equilibrium can be drawn as a closed triangle.`, S`Their vector sum is zero.`]
  ]);
  C('a2-kinematics', [
    ['F', S`If \(\mathbf{v} = 3\mathbf{i} + 4\mathbf{j}\), the speed is 7.`, S`\(\sqrt{9 + 16} = 5\).`],
    ['T', S`\(\mathbf{a} = \frac{d\mathbf{v}}{dt}\)`, S`Acceleration is the rate of change of velocity.`],
    ['A', S`A particle moving due north has a velocity with zero \(\mathbf{i}\) component.`, S`(with \(\mathbf{i}\) east, \(\mathbf{j}\) north)`]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
