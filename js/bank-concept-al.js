/* Byte Size Classroom — reasoning statements for Do Nows and Exit tickets: A level Mathematics (Pearson Edexcel). */
(function (g) {
  var BS = g.BS, S = String.raw, C = BS.concept;

  C('al-indices', [
    ['F', S`\(\sqrt{a^2 + b^2} = a + b\) for positive \(a\) and \(b\).`, S`For \(a = 3,\ b = 4\): \(5 \ne 7\).`],
    ['T', S`\(\frac{2}{\sqrt{3} - 1} = \sqrt{3} + 1\)`, S`Multiply by \(\sqrt{3} + 1\): the denominator becomes \(3 - 1 = 2\).`],
    ['A', S`\(a^{\frac{m}{n}} = (\sqrt[n]{a})^m\) for \(a > 0\).`, S`Taking the \(n\)th root and raising to the power \(m\) can be done in either order.`],
    ['N', S`\((a + b)^{-1} = a^{-1} + b^{-1}\) for non-zero real \(a\), \(b\) with \(a + b \ne 0\).`, S`It would need \(ab = (a + b)^2\), i.e. \(a^2 + ab + b^2 = 0\), which has no real non-zero solutions.`]
  ]);
  C('al-quadratics', [
    ['T', S`If \(b^2 - 4ac < 0\) and \(a > 0\), then \(ax^2 + bx + c > 0\) for all \(x\).`, S`The parabola opens upwards and never meets the \(x\)-axis.`],
    ['F', S`The equation \(kx^2 + 4x + 1 = 0\) has equal roots when \(k = 2\).`, S`\(16 - 4k = 0\) gives \(k = 4\).`],
    ['S', S`A quadratic model of a projectile's height gives a sensible prediction for every time \(t \ge 0\).`, S`After landing the model goes negative, so it is only valid up to then.`],
    ['A', S`The vertex of \(y = a(x - p)^2 + q\) is \((p, q)\).`, S`The squared term is zero when \(x = p\).`]
  ]);
  C('al-equations', [
    ['F', S`The set \(\{x : x < 2\} \cup \{x : x > 5\}\) can be written \(5 < x < 2\).`, S`No number is both above 5 and below 2; it must be written as a union.`],
    ['S', S`A line meets a curve where the discriminant of the combined equation is positive.`, S`Positive gives two points, zero gives a tangent, negative gives no intersection.`],
    ['T', S`Solid lines on a region diagram show \(\le\) or \(\ge\); dashed lines show \(<\) or \(>\).`, S`Points on a solid boundary are included.`]
  ]);
  C('al-graphs', [
    ['T', S`\(y = (x - 1)^2(x + 2)\) touches the \(x\)-axis at \(x = 1\).`, S`A repeated root gives a turning point on the axis.`],
    ['F', S`The graph of \(y = f(2x)\) is a stretch of scale factor 2 parallel to the \(x\)-axis.`, S`It is a stretch of scale factor \(\frac{1}{2}\).`],
    ['A', S`\(y = \frac{k}{x}\) (\(k \ne 0\)) has asymptotes \(x = 0\) and \(y = 0\).`, S`\(y\) is undefined at \(x = 0\) and tends to 0 as \(|x|\) grows.`],
    ['S', S`A quartic graph has three turning points.`, S`\(y = x^4\) has only one.`]
  ]);
  C('al-lines', [
    ['T', S`\(y - y_1 = m(x - x_1)\) is the line with gradient \(m\) through \((x_1, y_1)\).`, S`Substituting \(x = x_1\) gives \(y = y_1\).`],
    ['F', S`The lines \(2x + 3y = 6\) and \(3x - 2y = 1\) are parallel.`, S`Gradients \(-\frac{2}{3}\) and \(\frac{3}{2}\) multiply to \(-1\): they are perpendicular.`],
    ['S', S`A linear model gives reliable predictions.`, S`Only within the range of the data and when the relationship really is linear.`]
  ]);
  C('al-circles', [
    ['T', S`The perpendicular bisector of any chord passes through the centre.`, S`The centre is equidistant from both ends of the chord.`],
    ['F', S`\(x^2 + y^2 + 4x - 6y = 3\) has radius \(\sqrt{3}\).`, S`\((x + 2)^2 + (y - 3)^2 = 16\): radius 4.`],
    ['S', S`\(x^2 + y^2 + 2gx + 2fy + c = 0\) is a circle.`, S`Only if \(g^2 + f^2 - c > 0\).`]
  ]);
  C('al-algebraic', [
    ['T', S`If \(f(-\frac{1}{2}) = 0\), then \((2x + 1)\) is a factor of \(f(x)\).`, S`The factor theorem: \(x = -\frac{1}{2}\) is a root.`],
    ['F', S`"\(n^2 - n + 11\) is prime for all positive integers \(n\)" can be proved by checking \(n = 1\) to \(10\).`, S`\(n = 11\) gives \(121 = 11^2\): examples are not a proof.`],
    ['A', S`The product of two consecutive integers is even.`, S`One of them is even.`]
  ]);
  C('al-binomial', [
    ['T', S`\(\binom{n}{r} = \binom{n}{n - r}\)`, S`Choosing \(r\) to include is the same as choosing \(n - r\) to leave out.`],
    ['F', S`The term in \(x^2\) in \((1 + 2x)^5\) is \(10x^2\).`, S`\(\binom{5}{2}(2x)^2 = 40x^2\).`],
    ['S', S`The largest coefficient in \((1 + x)^n\) is the middle one.`, S`For even \(n\) there is one middle term; for odd \(n\) the two middle ones are equal.`]
  ]);
  C('al-trig', [
    ['F', S`\(\sin^{-1}(0.5)\) gives every solution of \(\sin x = 0.5\).`, S`It gives one; use symmetry for \(180° - 30°\) and add multiples of 360°.`],
    ['A', S`\(\tan x = \frac{\sin x}{\cos x}\) where \(\cos x \ne 0\).`, S`Definition in the unit circle.`],
    ['S', S`\(\sin 2x = 2\sin x\)`, S`Only when \(\sin x = 0\) (since \(\sin 2x = 2\sin x\cos x\)).`],
    ['T', S`The graph of \(y = \cos x\) is the graph of \(y = \sin x\) translated 90° to the left.`, S`\(\cos x = \sin(x + 90°)\).`]
  ]);
  C('al-vectors', [
    ['T', S`The unit vector in the direction of \(3\mathbf{i} + 4\mathbf{j}\) is \(\frac{1}{5}(3\mathbf{i} + 4\mathbf{j})\).`, S`Its magnitude is 5.`],
    ['F', S`The vector \(2\mathbf{i} - \mathbf{j}\) has magnitude 1.`, S`\(\sqrt{4 + 1} = \sqrt{5}\).`],
    ['A', S`If \(\overrightarrow{AB} = k\overrightarrow{BC}\), then \(A\), \(B\) and \(C\) are collinear.`, S`The vectors are parallel and share the point \(B\).`]
  ]);
  C('al-differentiation', [
    ['T', S`\(f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}\)`, S`The gradient of chords tends to the gradient of the tangent.`],
    ['S', S`If \(f'(a) = 0\), then \(f\) has a maximum or minimum at \(x = a\).`, S`It could be a point of inflection, e.g. \(y = x^3\) at 0.`],
    ['F', S`The derivative of \(\frac{1}{x^2}\) is \(\frac{1}{2x}\).`, S`\(x^{-2} \to -2x^{-3}\).`],
    ['A', S`If \(f'(x) > 0\) on an interval, then \(f\) is increasing there.`, S`A positive gradient means the function rises.`]
  ]);
  C('al-integration', [
    ['F', S`\(\int_{-1}^{1} x^3\,dx\) gives the area between the curve and the \(x\)-axis.`, S`It gives 0: the region below the axis counts as negative.`],
    ['T', S`\(\int x^{-1}\,dx\) cannot be found using \(\frac{x^{n+1}}{n + 1}\).`, S`It would mean dividing by zero; the answer is \(\ln|x| + c\).`],
    ['A', S`An indefinite integral needs a constant of integration.`, S`Differentiating removes constants, so any constant could have been there.`]
  ]);
  C('al-explog', [
    ['F', S`\(\log(a + b) = \log a + \log b\)`, S`\(\log a + \log b = \log(ab)\).`],
    ['T', S`The gradient of \(y = e^{x}\) at any point equals its \(y\)-coordinate.`, S`\(\frac{d}{dx}e^x = e^x\).`],
    ['A', S`If \(y = ab^x\), then \(\log y\) against \(x\) is a straight line.`, S`\(\log y = \log a + x\log b\).`],
    ['S', S`\(\ln x\) is positive.`, S`Only for \(x > 1\).`]
  ]);
  C('al-sampling', [
    ['F', S`A larger sample is always free from bias.`, S`A large biased sample (e.g. only volunteers) is still biased.`],
    ['T', S`Quota sampling is not random.`, S`The interviewer chooses who fills each quota.`],
    ['S', S`A systematic sample is representative.`, S`Not if the list has a pattern that matches the interval.`]
  ]);
  C('al-location', [
    ['T', S`If \(y = \frac{x - 50}{10}\), then \(\sigma_x = 10\sigma_y\).`, S`Subtracting does not change spread; dividing by 10 divides it by 10.`],
    ['F', S`The standard deviation can be negative.`, S`It is the square root of a non-negative quantity.`],
    ['S', S`Removing a value from a data set lowers the standard deviation.`, S`It does for a value far from the mean, as outliers are; removing a value close to the mean would increase it.`]
  ]);
  C('al-representations', [
    ['T', S`An outlier is often defined as more than \(1.5 \times\) IQR beyond the nearest quartile.`, S`This is the definition used in Edexcel unless told otherwise.`],
    ['F', S`In a histogram, frequency = class width ÷ frequency density.`, S`Frequency = class width × frequency density.`],
    ['A', S`Comparing two box plots needs a comparison of both location and spread, in context.`, S`For example medians and interquartile ranges.`]
  ]);
  C('al-correlation', [
    ['F', S`Strong correlation proves that one variable causes the other.`, S`Correlation does not imply causation.`],
    ['S', S`The regression line of \(y\) on \(x\) gives reliable estimates.`, S`Only within the data range (interpolation) and with strong correlation.`],
    ['T', S`A correlation coefficient of \(-0.95\) shows strong negative linear correlation.`, S`It is close to \(-1\).`]
  ]);
  C('al-probability', [
    ['T', S`Mutually exclusive events with non-zero probabilities cannot be independent.`, S`\(P(A \cap B) = 0 \ne P(A)P(B)\).`],
    ['F', S`If \(P(A) = 0.5\) and \(P(B) = 0.6\), the events can be mutually exclusive.`, S`Then \(P(A \cup B) = 1.1 > 1\).`],
    ['A', S`\(P(A \cup B) = P(A) + P(B) - P(A \cap B)\)`, S`The addition rule.`]
  ]);
  C('al-binomial-dist', [
    ['T', S`\(X \sim B(n, p)\) needs a fixed number of independent trials, each with the same probability of success.`, S`These are the conditions of the binomial model.`],
    ['F', S`For \(X \sim B(10, 0.3)\), \(P(X > 3) = 1 - P(X \le 2)\).`, S`It is \(1 - P(X \le 3)\).`],
    ['S', S`A binomial distribution is symmetrical.`, S`Only when \(p = 0.5\).`]
  ]);
  C('al-hypothesis', [
    ['F', S`Not rejecting \(H_0\) proves that \(H_0\) is true.`, S`There is just insufficient evidence to reject it.`],
    ['T', S`The actual significance level of a binomial test can be less than the stated level.`, S`The distribution is discrete, so the critical region rarely has exactly 5%.`],
    ['A', S`The critical region is where the test statistic leads to rejecting \(H_0\).`, S`Definition.`]
  ]);
  C('al-suvat', [
    ['F', S`The suvat equations can be used whenever an object is moving.`, S`Only when the acceleration is constant.`],
    ['T', S`At the top of its flight, a ball thrown vertically upwards has zero velocity but acceleration \(g\) downwards.`, S`Gravity acts throughout.`],
    ['S', S`Displacement equals distance travelled.`, S`Only if the object never changes direction.`]
  ]);
  C('al-forces', [
    ['F', S`An object moving at constant velocity must have a resultant force acting on it.`, S`Newton's first law: the resultant force is zero.`],
    ['T', S`For a light inextensible string over a smooth pulley, the tension is the same on both sides.`, S`That is what "light" and "smooth" model.`],
    ['A', S`The normal reaction acts perpendicular to the surface.`, S`Definition.`]
  ]);
  C('al-variable-acc', [
    ['T', S`Acceleration is the derivative of velocity with respect to time.`, S`\(a = \frac{dv}{dt}\).`],
    ['F', S`If \(v = t^2 - 4\), the particle is at rest when \(t = 4\).`, S`\(v = 0\) when \(t = 2\).`],
    ['S', S`\(\int_0^T v\,dt\) gives the distance travelled.`, S`Only if \(v\) doesn't change sign; otherwise it gives displacement.`]
  ]);
  C('al-lds', [
    ['T', S`In the large data set, "tr" means trace: less than 0.05 mm of rainfall.`, S`It should be treated as 0 or a small value with a reason.`],
    ['F', S`The large data set contains data from every month of the year.`, S`It covers May to October only.`],
    ['T', S`Beaufort wind descriptions are on a scale, not a continuous measurement.`, S`They are categories such as "light" or "moderate".`]
  ]);

  C('a2-proof', [
    ['T', S`To prove \(\sqrt{2}\) is irrational by contradiction, you first assume \(\sqrt{2} = \frac{a}{b}\) in lowest terms.`, S`Then show that \(a\) and \(b\) are both even, a contradiction.`],
    ['F', S`\(\frac{3x + 1}{(x - 1)(x + 2)}\) can be written as \(\frac{A}{x - 1} + \frac{B}{x - 1}\).`, S`One fraction for each factor: \(\frac{A}{x - 1} + \frac{B}{x + 2}\).`],
    ['A', S`There is no largest prime number.`, S`Euclid's proof by contradiction.`]
  ]);
  C('a2-functions', [
    ['S', S`\(|a + b| = |a| + |b|\)`, S`Only when \(a\) and \(b\) have the same sign (or one is zero).`],
    ['T', S`The graph of \(y = f^{-1}(x)\) is the reflection of \(y = f(x)\) in \(y = x\).`, S`Inputs and outputs are swapped.`],
    ['F', S`\(y = |f(x)|\) and \(y = f(|x|)\) are the same graph.`, S`The first reflects the parts below the \(x\)-axis; the second reflects the right half in the \(y\)-axis.`]
  ]);
  C('a2-sequences', [
    ['S', S`A geometric series has a sum to infinity.`, S`Only when \(|r| < 1\).`],
    ['T', S`\(\sum_{r=1}^{n} 1 = n\)`, S`You add 1 a total of \(n\) times.`],
    ['F', S`A sequence defined by \(u_{n+1} = -u_n\) is periodic with order 1.`, S`It alternates, so its order is 2.`]
  ]);
  C('a2-binomial', [
    ['F', S`The expansion of \((1 + x)^{-1}\) is valid for all \(x\).`, S`Only for \(|x| < 1\).`],
    ['T', S`\((1 + x)^{\frac{1}{2}} \approx 1 + \frac{1}{2}x\) for small \(x\).`, S`The first two terms of the binomial expansion.`],
    ['A', S`The expansion of \((1 + x)^n\) for negative or fractional \(n\) is an infinite series.`, S`The coefficients never become zero.`]
  ]);
  C('a2-radians', [
    ['T', S`For small \(\theta\) in radians, \(\cos\theta \approx 1 - \frac{\theta^2}{2}\).`, S`Small-angle approximation.`],
    ['F', S`The arc length of a sector is \(r\theta\) when \(\theta\) is in degrees.`, S`\(\theta\) must be in radians.`],
    ['A', S`\(\pi\) radians equals 180°.`, S`Half a turn.`]
  ]);
  C('a2-trigfn', [
    ['F', S`\(\sec x = \frac{1}{\sin x}\)`, S`\(\sec x = \frac{1}{\cos x}\); \(\csc x = \frac{1}{\sin x}\).`],
    ['A', S`\(1 + \tan^2 x = \sec^2 x\)`, S`Divide \(\sin^2 x + \cos^2 x = 1\) by \(\cos^2 x\).`],
    ['T', S`The range of \(\arcsin x\) is \(-\frac{\pi}{2} \le y \le \frac{\pi}{2}\).`, S`The domain of \(\sin\) is restricted so it is one-to-one.`]
  ]);
  C('a2-trigadd', [
    ['F', S`\(\sin(A + B) = \sin A + \sin B\)`, S`\(\sin A\cos B + \cos A\sin B\).`],
    ['T', S`\(\cos 2x = 1 - 2\sin^2 x\)`, S`From \(\cos^2 x - \sin^2 x\) and \(\cos^2 x = 1 - \sin^2 x\).`],
    ['A', S`The maximum value of \(3\sin x + 4\cos x\) is 5.`, S`It equals \(5\sin(x + \alpha)\).`]
  ]);
  C('a2-parametric', [
    ['T', S`\(\frac{dy}{dx} = \frac{dy/dt}{dx/dt}\)`, S`The chain rule.`],
    ['F', S`\(x = \cos t,\ y = \sin t\) for \(0 \le t \le \pi\) is a full circle.`, S`It is a semicircle.`],
    ['S', S`A parametric curve can be written as a single Cartesian equation \(y = f(x)\).`, S`Not always, e.g. a full circle is not a function of \(x\).`]
  ]);
  C('a2-differentiation', [
    ['F', S`\(\frac{d}{dx}(uv) = \frac{du}{dx}\frac{dv}{dx}\)`, S`The product rule: \(u\frac{dv}{dx} + v\frac{du}{dx}\).`],
    ['T', S`\(\frac{d}{dx}\ln(f(x)) = \frac{f'(x)}{f(x)}\)`, S`The chain rule.`],
    ['A', S`\(\frac{d}{dx}(y^2) = 2y\frac{dy}{dx}\)`, S`Implicit differentiation uses the chain rule.`]
  ]);
  C('a2-numerical', [
    ['S', S`A change of sign of \(f(x)\) between \(a\) and \(b\) shows there is a root between them.`, S`Only if \(f\) is continuous there (e.g. \(\frac{1}{x}\) changes sign without a root).`],
    ['F', S`Newton–Raphson always converges to the nearest root.`, S`It can fail if \(f'(x) \approx 0\) or jump to a different root.`],
    ['T', S`The iteration \(x_{n+1} = g(x_n)\) converges near a root if \(|g'(x)| < 1\) there.`, S`Errors shrink each step.`]
  ]);
  C('a2-integration', [
    ['T', S`\(\int \frac{1}{2x}\,dx\) can be written as \(\frac{1}{2}\ln|x| + c\) or as \(\frac{1}{2}\ln|2x| + c\).`, S`They differ by the constant \(\frac{1}{2}\ln 2\), which the \(+ c\) absorbs.`],
    ['T', S`\(\int u\frac{dv}{dx}\,dx = uv - \int v\frac{du}{dx}\,dx\)`, S`Integration by parts, from the product rule.`],
    ['A', S`\(\int \frac{f'(x)}{f(x)}\,dx = \ln|f(x)| + c\)`, S`Reverse of the chain rule for \(\ln\).`]
  ]);
  C('a2-vectors', [
    ['T', S`\(|\mathbf{i} + \mathbf{j} + \mathbf{k}| = \sqrt{3}\)`, S`\(\sqrt{1 + 1 + 1}\).`],
    ['F', S`The point \((2, 3, 6)\) is 11 units from the origin.`, S`\(\sqrt{4 + 9 + 36} = 7\).`],
    ['S', S`Two non-parallel lines in 3D intersect.`, S`They may be skew.`]
  ]);
  C('a2-regression', [
    ['T', S`A test for correlation uses \(H_0: \rho = 0\).`, S`No correlation in the population.`],
    ['F', S`If \(\log y\) against \(\log x\) is linear, then \(y = ab^x\).`, S`It gives \(y = ax^n\); \(\log y\) against \(x\) gives \(y = ab^x\).`]
  ]);
  C('a2-probability', [
    ['F', S`\(P(A \mid B) = P(B \mid A)\)`, S`In general they differ: \(P(A \mid B) = \frac{P(A \cap B)}{P(B)}\).`],
    ['T', S`If \(A\) and \(B\) are independent, \(P(A \mid B) = P(A)\).`, S`Knowing \(B\) happened doesn't change \(P(A)\).`],
    ['A', S`\(P(A \mid B) = \frac{P(A \cap B)}{P(B)}\) for \(P(B) > 0\).`, S`Definition.`]
  ]);
  C('a2-normal', [
    ['T', S`About 95% of a normal distribution lies within 2 standard deviations of the mean.`, S`More precisely 95.4%.`],
    ['F', S`For a continuous normal variable, \(P(X \le 5) > P(X < 5)\).`, S`\(P(X = 5) = 0\), so they are equal.`],
    ['A', S`\(\bar{X} \sim N\left(\mu, \frac{\sigma^2}{n}\right)\) when \(X \sim N(\mu, \sigma^2)\).`, S`The mean of a sample varies less than single values.`]
  ]);
  C('a2-moments', [
    ['T', S`For a body in equilibrium, moments about any point balance.`, S`The resultant force and resultant moment are both zero.`],
    ['F', S`A uniform rod's weight acts at one end.`, S`It acts at the midpoint.`],
    ['S', S`A rod resting on two supports has equal reactions at the supports.`, S`Only if the loading is symmetrical.`]
  ]);
  C('a2-friction', [
    ['F', S`Friction always equals \(\mu R\).`, S`\(F \le \mu R\); equality only in limiting equilibrium or when sliding.`],
    ['T', S`On a smooth slope at angle \(\theta\), a particle accelerates at \(g\sin\theta\).`, S`The only force along the slope is \(mg\sin\theta\).`],
    ['A', S`Friction opposes the motion (or the tendency to move).`, S`It acts along the surface against relative sliding.`]
  ]);
  C('a2-projectiles', [
    ['T', S`For a projectile, the horizontal velocity is constant (ignoring air resistance).`, S`No horizontal force acts.`],
    ['S', S`Two projectiles launched at the same speed land at the same distance.`, S`Only if their angles add to 90° (or are equal), on level ground.`],
    ['F', S`At the top of its path a projectile has zero velocity.`, S`Its vertical velocity is zero; its horizontal velocity is not.`]
  ]);
  C('a2-statics', [
    ['T', S`For a ladder against a smooth wall, the reaction at the wall is horizontal.`, S`Smooth means no friction, so only the normal reaction acts.`],
    ['F', S`A particle in equilibrium under three forces can have the forces all pointing the same way.`, S`The forces must sum to zero.`]
  ]);
  C('a2-kinematics', [
    ['T', S`If \(\mathbf{r} = t^2\mathbf{i} + 3t\mathbf{j}\), then \(\mathbf{v} = 2t\mathbf{i} + 3\mathbf{j}\).`, S`Differentiate each component.`],
    ['F', S`Speed is the same as velocity.`, S`Speed is the magnitude of velocity.`],
    ['S', S`A particle moving with constant speed has zero acceleration.`, S`Not if it changes direction (e.g. circular motion).`]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
