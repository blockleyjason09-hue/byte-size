/* Byte Size Classroom — more reasoning statements (set 2): IB Mathematics: Applications and Interpretation SL and HL. */
(function (g) {
  var BS = g.BS, S = String.raw, C = BS.concept;

  C(['sl-approx', 'ib-approx'], [
    ['T', S`\(3.456 \times 10^{4} = 34\,560\)`, S`Move the decimal point 4 places right.`],
    ['F', S`A length of 12 cm measured to the nearest cm can be at most 12.4 cm.`, S`Its upper bound is 12.5 cm.`],
    ['A', S`The upper bound of \(a + b\) is the sum of their upper bounds.`, S`Largest plus largest gives the largest sum.`],
    ['S', S`A bigger absolute error means a bigger percentage error.`, S`It depends on the size of the exact value.`]
  ]);
  C(['sl-seq', 'ib-arith', 'ib-geom'], [
    ['T', S`\(\sum_{k=1}^{5} 2k = 30\)`, S`\(2 + 4 + 6 + 8 + 10\).`],
    ['F', S`An arithmetic sequence with \(u_1 = 5\) and \(d = -2\) has \(u_{10} = -15\).`, S`\(5 + 9(-2) = -13\).`],
    ['S', S`A geometric sequence is increasing.`, S`It depends on \(r\) and the first term.`],
    ['A', S`Compound interest growth is modelled by a geometric sequence.`, S`The amount is multiplied by the same factor each period.`]
  ]);
  C(['sl-finance', 'ib-finance'], [
    ['T', S`An annual rate of 6% compounded monthly gives an effective annual rate above 6%.`, S`\(\left(1 + \frac{0.06}{12}\right)^{12} - 1 \approx 6.17\%\).`],
    ['F', S`Doubling the length of a loan halves the monthly repayment.`, S`More interest builds up, so it is more than half.`],
    ['A', S`With the same amount borrowed and a positive interest rate, a longer loan term costs more in total interest.`, S`Interest is charged for longer on the outstanding balance.`],
  ]);
  C(['sl-logs', 'ib-logs'], [
    ['T', S`\(\log 5 + \log 2 = 1\) (base 10)`, S`\(\log 10 = 1\).`],
    ['F', S`\(\ln x = 2\) gives \(x = 2e\).`, S`\(x = e^2\).`],
    ['S', S`\(\log_a b\) is positive.`, S`Negative when \(0 < b < 1\) and \(a > 1\).`]
  ]);
  C(['sl-systems', 'ib-systems'], [
    ['T', S`A GDC can solve a system of linear equations using a matrix or equation solver.`, S`Technology is expected in Paper 2.`],
    ['F', S`A quadratic can have three \(x\)-intercepts.`, S`At most two.`],
    ['S', S`Two equations in three unknowns have infinitely many solutions.`, S`Or none, if they are inconsistent.`]
  ]);
  C(['sl-lines', 'ib-lines'], [
    ['T', S`The line through \((2, 5)\) with gradient \(-3\) is \(y - 5 = -3(x - 2)\).`, S`Point–gradient form.`],
    ['F', S`The gradient of \(3x + 2y = 6\) is 3.`, S`\(y = -\frac{3}{2}x + 3\).`],
    ['A', S`Parallel lines have equal gradients.`, S`They rise at the same rate.`]
  ]);
  C(['sl-functions', 'ib-functions'], [
    ['T', S`If \(f(x) = 3x - 2\), then \(f^{-1}(4) = 2\).`, S`\(f(2) = 4\).`],
    ['F', S`The range of \(f(x) = e^x\) is all real numbers.`, S`\(f(x) > 0\).`],
    ['S', S`\(f(f(x)) = x\)`, S`Only for self-inverse functions.`]
  ]);
  C(['sl-graphs', 'ib-graphs'], [
    ['T', S`\(y = \frac{2}{x - 1}\) has a vertical asymptote at \(x = 1\).`, S`Division by zero there.`],
    ['F', S`A graph's \(y\)-intercept is found by setting \(y = 0\).`, S`Set \(x = 0\).`],
    ['S', S`Two graphs intersect.`, S`Not always, e.g. parallel lines.`]
  ]);
  C(['sl-models', 'ib-models'], [
    ['T', S`In \(y = a\cos(bx) + d\), the maximum value is \(d + |a|\).`, S`\(\cos\) ranges from \(-1\) to 1.`],
    ['F', S`A quadratic model of profit always has a maximum.`, S`Only if the \(x^2\) coefficient is negative.`],
    ['A', S`A direct variation model \(y = kx^n\) passes through the origin for \(n > 0\).`, S`\(x = 0\) gives \(y = 0\).`]
  ]);
  C('ib-logistic', [
    ['A', S`In a logistic model, the growth rate tends to zero as \(N\) approaches the carrying capacity.`, S`The \(Ce^{-kt}\) term tends to zero.`],
    ['S', S`A logistic model fits data that grow quickly at first.`, S`It fits data that level off; early data may look exponential.`]
  ]);
  C('ib-transform', [
    ['F', S`\(y = f(2x)\) is a horizontal stretch with scale factor 2.`, S`Scale factor \(\frac{1}{2}\).`],
    ['A', S`\(y = f(x) + c\) moves every point up by \(c\) (for \(c > 0\)).`, S`Each output increases by \(c\).`]
  ]);
  C('ib-linearise', [
    ['T', S`If \(\ln y\) against \(x\) is linear with gradient \(m\), then \(y = Ae^{mx}\).`, S`\(\ln y = mx + \ln A\).`],
    ['S', S`A curved scatter graph becomes straight after taking logs.`, S`Only for exponential or power relationships.`]
  ]);
  C(['sl-3d', 'ib-3d'], [
    ['T', S`The surface area of a sphere is \(4\pi r^2\).`, S`Formula booklet.`],
    ['F', S`The slant height of a cone with radius 3 and height 4 is 7.`, S`\(\sqrt{9 + 16} = 5\).`],
    ['S', S`The midpoint of two points in 3D has integer coordinates.`, S`Only if each pair of coordinates has an even sum.`]
  ]);
  C(['sl-trig', 'ib-trig', 'ib-bearings'], [
    ['T', S`In any triangle, the longest side is opposite the largest angle.`, S`From the sine rule.`],
    ['F', S`A bearing of 300° points north-east.`, S`It points north-west.`],
    ['S', S`The sine rule finds an obtuse angle directly.`, S`\(\sin^{-1}\) gives an acute angle; the obtuse one is \(180° - \theta\).`]
  ]);
  C(['sl-sectors', 'ib-radians'], [
    ['T', S`A sector with angle 90° has arc length a quarter of the circumference.`, S`\(\frac{90}{360} = \frac{1}{4}\).`],
    ['F', S`A full circle is \(\pi\) radians.`, S`\(2\pi\) radians.`],
    ['A', S`Doubling the radius of a sector (same angle) doubles the arc length.`, S`Arc length is proportional to \(r\).`]
  ]);
  C(['sl-voronoi', 'ib-voronoi'], [
    ['T', S`The perpendicular bisector of \(A(0, 0)\) and \(B(4, 0)\) is \(x = 2\).`, S`Points equidistant from both.`],
    ['F', S`Adding a new site to a Voronoi diagram changes every cell.`, S`Only nearby cells change.`],
    ['N', S`A point in the cell of site \(A\) is closer to another site than to \(A\).`, S`That is what the cell means.`]
  ]);
  C('ib-trig-eq', [
    ['T', S`\(\cos(2\pi - x) = \cos x\)`, S`Symmetry of the cosine graph.`],
    ['F', S`\(\tan x = 1\) has one solution in \(0 \le x < 2\pi\).`, S`\(\frac{\pi}{4}\) and \(\frac{5\pi}{4}\).`],
    ['S', S`\(\sin x = \cos x\)`, S`At \(x = \frac{\pi}{4} + k\pi\) only.`]
  ]);
  C('ib-mat-transform', [
    ['T', S`The matrix \(\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}\) reflects in the \(x\)-axis.`, S`It changes the sign of \(y\).`],
    ['A', S`A rotation matrix has determinant 1.`, S`\(\cos^2\theta + \sin^2\theta = 1\).`],
    ['S', S`Two transformations commute (give the same result in either order).`, S`Two rotations about the origin do; a rotation and a reflection usually don't.`]
  ]);
  C('ib-vectors', [
    ['T', S`The direction vector of a line can be multiplied by any non-zero scalar.`, S`It still points along the line.`],
    ['F', S`Parallel lines have equal position vectors.`, S`They have parallel direction vectors.`],
    ['A', S`The angle between two lines uses their direction vectors.`, S`Position vectors don't affect direction.`]
  ]);
  C('ib-vec-kinematics', [
    ['T', S`In \(\mathbf{r} = \mathbf{a} + t\mathbf{v}\), \(\mathbf{a}\) is the position at \(t = 0\).`, S`Substitute \(t = 0\).`],
    ['F', S`Speed is a vector.`, S`Speed is the magnitude of velocity, a scalar.`],
    ['A', S`Relative position is \(\mathbf{r}_B - \mathbf{r}_A\).`, S`The vector from \(A\) to \(B\).`]
  ]);
  C('ib-vec-product', [
    ['S', S`The scalar product of two vectors is positive.`, S`Negative when the angle between them is obtuse.`],
    ['N', S`\(\mathbf{a} \times \mathbf{a}\) is non-zero.`, S`A vector is parallel to itself: \(\mathbf{a} \times \mathbf{a} = \mathbf{0}\).`],
    ['T', S`\(\mathbf{i} \times \mathbf{j} = \mathbf{k}\)`, S`Right-hand rule.`]
  ]);
  C('ib-graph-theory', [
    ['T', S`A complete graph \(K_n\) has \(\frac{n(n - 1)}{2}\) edges.`, S`Every pair joined once.`],
    ['F', S`A Hamiltonian cycle uses every edge.`, S`It visits every vertex once; an Eulerian circuit uses every edge.`],
    ['S', S`A connected graph has an Eulerian trail.`, S`Only with 0 or 2 odd vertices.`]
  ]);
  C('ib-graph-algorithms', [
    ['T', S`A minimum spanning tree of \(n\) vertices has \(n - 1\) edges.`, S`It is a tree.`],
    ['F', S`Kruskal's algorithm can add an edge that forms a cycle.`, S`Edges forming cycles are rejected.`],
    ['S', S`The lower bound for the travelling salesperson problem equals the optimal route length.`, S`It is at most the optimal length; sometimes equal.`]
  ]);
  C(['sl-descriptive', 'ib-descriptive'], [
    ['T', S`The standard deviation measures spread about the mean.`, S`Definition.`],
    ['F', S`A sample of the 20 tallest students is random.`, S`It is biased.`],
    ['S', S`Discrete data can be shown on a histogram.`, S`Grouped discrete data can; it is usually for continuous data.`]
  ]);
  C(['sl-regression', 'ib-regression'], [
    ['T', S`Spearman's \(r_s = 1\) means the ranks agree exactly.`, S`A perfectly increasing relationship.`],
    ['F', S`The regression line of \(y\) on \(x\) can be used to predict \(x\) from \(y\).`, S`Use the line of \(x\) on \(y\).`],
    ['A', S`\(r^2\) lies between 0 and 1.`, S`\(-1 \le r \le 1\).`]
  ]);
  C(['sl-probability', 'ib-probability'], [
    ['T', S`\(P(A) + P(A') = 1\)`, S`Complementary events.`],
    ['F', S`If \(P(A) = 0.6\) and \(P(B) = 0.7\), the events could be mutually exclusive.`, S`\(0.6 + 0.7 > 1\).`],
    ['S', S`\(P(A \mid B) = P(A)\)`, S`Only when \(A\) and \(B\) are independent.`]
  ]);
  C(['sl-discrete', 'ib-discrete'], [
    ['T', S`For \(X \sim B(10, 0.5)\), \(E(X) = 5\).`, S`\(np = 5\).`],
    ['F', S`\(E(X)\) must be a possible value of \(X\).`, S`For a fair die \(E(X) = 3.5\).`],
    ['S', S`A binomial model fits the number of red cards when 5 cards are drawn from a pack.`, S`Only if the cards are replaced; without replacement the trials are not independent.`],
  ]);
  C(['sl-normal', 'ib-normal'], [
    ['T', S`If \(X \sim N(100, 15^2)\), about 95% of values lie between 70 and 130.`, S`Within 2 standard deviations.`],
    ['F', S`The normal distribution is suitable for the number of cars passing a junction.`, S`That is a discrete count; Poisson is usually better.`],
    ['A', S`Increasing \(\sigma\) makes the normal curve wider and flatter.`, S`The total area stays 1.`]
  ]);
  C(['sl-tests', 'ib-hypothesis'], [
    ['T', S`In a goodness of fit test with 5 categories and no estimated parameters, \(\nu = 4\).`, S`\(n - 1\).`],
    ['F', S`A very small \(p\)-value proves \(H_1\) is true.`, S`It is strong evidence against \(H_0\), not proof.`],
    ['S', S`A \(t\)-test is appropriate for comparing two means.`, S`When the data are approximately normal (and variances similar for the pooled test).`]
  ]);
  C('ib-estimation', [
    ['T', S`An unbiased estimate of the population variance uses \(s_{n-1}^2\).`, S`Dividing by \(n - 1\) corrects the bias.`],
    ['F', S`A 95% confidence interval contains the population mean with probability 0.95 after it is calculated.`, S`95% of intervals constructed this way contain it.`],
    ['A', S`By the central limit theorem, the sample mean is approximately normal for large \(n\).`, S`Whatever the population distribution.`]
  ]);
  C('ib-poisson', [
    ['T', S`If \(X \sim \mathrm{Po}(2)\) and \(Y \sim \mathrm{Po}(3)\) are independent, \(X + Y \sim \mathrm{Po}(5)\).`, S`Independent Poisson variables add.`],
    ['F', S`For a Poisson distribution, \(P(X = 0) = 0\).`, S`\(P(X = 0) = e^{-m} > 0\).`],
    ['S', S`If the mean and variance of count data are close, a Poisson model fits.`, S`It suggests one, but the conditions must also hold.`]
  ]);
  C('ib-markov', [
    ['T', S`\(\mathbf{T}^n\mathbf{s}_0\) gives the state after \(n\) steps.`, S`Apply the transition \(n\) times.`],
    ['F', S`The entries of a steady-state vector can be negative.`, S`They are probabilities.`],
    ['S', S`A Markov chain has a unique steady state.`, S`Regular chains do; some chains don't.`]
  ]);
  C(['sl-derivatives', 'ib-derivatives'], [
    ['T', S`The tangent to \(y = x^2\) at \((1, 1)\) is \(y = 2x - 1\).`, S`Gradient 2 through \((1, 1)\).`],
    ['F', S`If \(f'(x) = 0\) for all \(x\), then \(f(x) = 0\).`, S`\(f\) is constant, not necessarily zero.`],
    ['S', S`The gradient of a curve is positive where the curve is above the \(x\)-axis.`, S`Height and gradient are independent.`]
  ]);
  C(['sl-optimisation', 'ib-optimisation'], [
    ['T', S`For a fixed perimeter, the rectangle with the largest area is a square.`, S`\(A = x(P/2 - x)\) is greatest at \(x = P/4\).`],
    ['F', S`An optimisation answer is valid without checking the context.`, S`The value must make sense (e.g. positive lengths).`],
    ['A', S`At a local maximum of a differentiable function, \(f'(x) = 0\).`, S`The tangent is horizontal.`]
  ]);
  C(['sl-integration', 'ib-integration'], [
    ['T', S`\(\int_0^2 3x^2\,dx = 8\)`, S`\([x^3]_0^2\).`],
    ['F', S`\(\int x^3\,dx = 3x^2 + c\)`, S`\(\frac{x^4}{4} + c\).`],
    ['S', S`The trapezoidal rule gives the exact area.`, S`Only for straight-line graphs.`]
  ]);
  C('ib-diff-rules', [
    ['T', S`\(\frac{d}{dx}\ln(3x) = \frac{1}{x}\)`, S`\(\ln 3 + \ln x\).`],
    ['F', S`\(\frac{d}{dx}\left(\frac{1}{\cos x}\right) = -\frac{1}{\sin x}\)`, S`It is \(\frac{\sin x}{\cos^2 x}\).`],
    ['F', S`\(\frac{d}{dx}(x^2\sin x) = 2x\cos x\)`, S`Product rule: \(2x\sin x + x^2\cos x\).`],
  ]);
  C('ib-volumes', [
    ['T', S`Rotating \(y = r\) (constant) from 0 to \(h\) about the \(x\)-axis gives a cylinder.`, S`\(\pi r^2 h\).`],
    ['A', S`Volumes of revolution are always positive.`, S`The integrand \(\pi y^2 \ge 0\).`]
  ]);
  C('ib-kinematics', [
    ['T', S`If \(s = t^3 - 3t\), the particle is at rest when \(t = 1\).`, S`\(v = 3t^2 - 3 = 0\).`],
    ['S', S`Speed is increasing when acceleration is positive.`, S`Only if velocity is also positive (same sign).`],
    ['A', S`Total distance = \(\int |v|\,dt\).`, S`Count all motion as positive.`]
  ]);
  C('ib-diff-equations', [
    ['T', S`\(\frac{dy}{dx} = ky\) has solution \(y = Ae^{kx}\).`, S`Separate variables.`],
    ['F', S`A slope field shows the solution of a differential equation exactly.`, S`It shows gradients; solution curves are sketched along them.`],
    ['S', S`Euler's method overestimates the solution.`, S`It depends on the curvature of the solution.`]
  ]);
  C('ib-coupled', [
    ['T', S`Purely imaginary eigenvalues give closed orbits (a centre).`, S`No growth or decay.`],
    ['F', S`A saddle point is stable.`, S`Most trajectories move away.`],
    ['A', S`An equilibrium point is where \(\dot{x} = 0\) and \(\dot{y} = 0\).`, S`Nothing changes there.`]
  ]);
  C('ib-matrices', [
    ['T', S`\(\det(\mathbf{AB}) = \det\mathbf{A} \times \det\mathbf{B}\)`, S`A property of determinants.`],
    ['F', S`Any two matrices can be multiplied.`, S`The number of columns of the first must equal the number of rows of the second.`],
    ['S', S`A \(2 \times 2\) matrix with all entries non-zero has an inverse.`, S`\(\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}\) has determinant 0.`],
    ['A', S`\(\mathbf{A}\mathbf{A}^{-1} = \mathbf{I}\) for an invertible matrix.`, S`Definition of the inverse.`]
  ]);
  C('ib-eigen', [
    ['T', S`The eigenvalues of \(\begin{pmatrix} 2 & 0 \\ 0 & 5 \end{pmatrix}\) are 2 and 5.`, S`A diagonal matrix has its diagonal entries as eigenvalues.`],
    ['F', S`Each eigenvalue has exactly one eigenvector.`, S`Any non-zero multiple of an eigenvector is also an eigenvector.`],
    ['S', S`A \(2 \times 2\) matrix has two real eigenvalues.`, S`The characteristic equation may have complex or repeated roots.`],
    ['A', S`The sum of the eigenvalues of a \(2 \times 2\) matrix equals its trace.`, S`From the characteristic equation \(\lambda^2 - (\text{tr})\lambda + \det = 0\).`]
  ]);
  C('ib-complex', [
    ['T', S`\(i^4 = 1\)`, S`\(i^2 = -1\), so \(i^4 = 1\).`],
    ['F', S`\(|3 + 4i| = 7\)`, S`\(\sqrt{9 + 16} = 5\).`],
    ['S', S`The sum of a complex number and its conjugate is zero.`, S`It is \(2\operatorname{Re}(z)\): zero only for purely imaginary \(z\).`]
  ]);
  C(['ib-logistic', 'ib-linearise', 'ib-volumes'], [
    ['S', S`A model that fits the data well can be used for any input.`, S`Extrapolating beyond the data is unreliable.`]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
