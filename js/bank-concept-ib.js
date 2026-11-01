/* Byte Size Classroom — reasoning statements for Do Nows and Exit tickets: IB Mathematics: Applications and Interpretation SL and HL. */
(function (g) {
  var BS = g.BS, S = String.raw, C = BS.concept;

  C(['sl-approx', 'ib-approx'], [
    ['F', S`0.0450 has 2 significant figures.`, S`The trailing zero after the decimal point is significant: 3 s.f.`],
    ['T', S`Percentage error \(= \left|\frac{v_A - v_E}{v_E}\right| \times 100\%\), where \(v_E\) is the exact value.`, S`IB formula booklet definition.`],
    ['S', S`Rounding each value before calculating gives the same answer as rounding at the end.`, S`Rounding early can change the final answer, so keep full accuracy until the end.`],
    ['N', S`\(12 \times 10^{3}\) is in standard form.`, S`The number in front must satisfy \(1 \le a < 10\): \(1.2 \times 10^4\).`]
  ]);
  C(['sl-seq', 'ib-arith'], [
    ['T', S`In an arithmetic sequence, \(u_{n+1} - u_n\) is the same for every \(n\).`, S`That is the common difference \(d\).`],
    ['F', S`\(S_n = \frac{n}{2}(u_1 + u_n)\) only works if \(d > 0\).`, S`It works for any arithmetic sequence.`],
    ['S', S`An arithmetic sequence contains the number 100.`, S`Only if \(100 - u_1\) is a non-negative multiple of \(d\) (for \(d > 0\)).`]
  ]);
  C(['sl-seq', 'ib-geom'], [
    ['S', S`A geometric series has a sum to infinity.`, S`Only if \(|r| < 1\).`],
    ['F', S`The sequence 2, 6, 18, 54, … has common ratio 4.`, S`Each term is 3 times the previous one.`],
    ['T', S`If \(r < 0\), a geometric sequence alternates in sign.`, S`Multiplying by a negative number changes the sign each time.`]
  ]);
  C(['sl-finance', 'ib-finance'], [
    ['A', S`Compounding monthly gives more interest than compounding annually at the same nominal rate.`, S`Interest is earned on interest more often (for a positive rate).`],
    ['F', S`In a TVM solver, money you pay out and money you receive have the same sign.`, S`Outgoing and incoming amounts have opposite signs.`],
    ['T', S`Real value after inflation can fall even when the investment grows.`, S`If inflation is higher than the interest rate.`],
    ['F', S`Straight-line depreciation reduces a value by the same percentage each year.`, S`It reduces by the same amount; reducing by the same percentage is reducing-balance depreciation.`]
  ]);
  C(['sl-logs', 'ib-logs'], [
    ['F', S`\(\log_{10} 200 = 2 \times \log_{10} 100\)`, S`\(\log_{10}200 = \log_{10}2 + 2 \approx 2.30\).`],
    ['T', S`\(\ln e^{3x} = 3x\)`, S`\(\ln\) and \(e^x\) are inverse functions.`],
    ['N', S`\(\log_{10} x\) is defined for \(x = -10\).`, S`Logarithms are only defined for positive inputs.`],
    ['A', S`\(\log_a a = 1\) for any valid base \(a\).`, S`\(a^1 = a\).`]
  ]);
  C(['sl-systems', 'ib-systems'], [
    ['S', S`A system of three linear equations in three unknowns has a unique solution.`, S`It may have none or infinitely many.`],
    ['T', S`A cubic polynomial with real coefficients has at least one real root.`, S`Its graph goes from \(-\infty\) to \(+\infty\) (or the reverse).`],
    ['F', S`A polynomial of degree 4 can have 5 real roots.`, S`At most 4.`]
  ]);
  C('ib-complex', [
    ['A', S`\(z\bar{z}\) is real and non-negative.`, S`\(z\bar{z} = |z|^2\).`],
    ['T', S`Multiplying by \(i\) rotates a point on the Argand diagram 90° anticlockwise about the origin.`, S`\(i = e^{i\pi/2}\).`],
    ['F', S`\(|z_1 + z_2| = |z_1| + |z_2|\) for all complex numbers.`, S`Only when they have the same argument; in general \(|z_1 + z_2| \le |z_1| + |z_2|\).`],
    ['T', S`\(\arg(z_1z_2) = \arg z_1 + \arg z_2\) (up to multiples of \(2\pi\)).`, S`Multiplying in exponential form adds arguments.`]
  ]);
  C('ib-matrices', [
    ['S', S`\(\mathbf{AB} = \mathbf{BA}\)`, S`Not in general; it holds for some pairs, e.g. when \(\mathbf{B} = \mathbf{A}^{-1}\).`],
    ['T', S`A square matrix has an inverse if and only if its determinant is non-zero.`, S`The inverse involves dividing by the determinant.`],
    ['F', S`\((\mathbf{AB})^{-1} = \mathbf{A}^{-1}\mathbf{B}^{-1}\)`, S`\((\mathbf{AB})^{-1} = \mathbf{B}^{-1}\mathbf{A}^{-1}\).`]
  ]);
  C('ib-eigen', [
    ['T', S`If \(\mathbf{Mv} = \lambda\mathbf{v}\), then \(\mathbf{M}^n\mathbf{v} = \lambda^n\mathbf{v}\).`, S`Apply \(\mathbf{M}\) repeatedly.`],
    ['F', S`An eigenvector can be the zero vector.`, S`Eigenvectors must be non-zero.`],
    ['A', S`The eigenvalues of a \(2 \times 2\) matrix multiply to give its determinant.`, S`From the characteristic equation.`]
  ]);
  C(['sl-lines', 'ib-lines'], [
    ['T', S`The line \(ax + by + d = 0\) has gradient \(-\frac{a}{b}\) (\(b \ne 0\)).`, S`Rearrange to \(y = -\frac{a}{b}x - \frac{d}{b}\).`],
    ['F', S`Perpendicular lines have gradients that add to zero.`, S`Their gradients multiply to \(-1\).`],
    ['S', S`Two lines with different gradients intersect at a point with integer coordinates.`, S`They always intersect, but the coordinates need not be integers.`]
  ]);
  C(['sl-functions', 'ib-functions'], [
    ['S', S`\((f \circ g)(x) = (g \circ f)(x)\)`, S`Usually not; it is true for some pairs.`],
    ['F', S`\(f^{-1}(x) = \frac{1}{f(x)}\)`, S`The inverse reverses the mapping; it is not the reciprocal.`],
    ['T', S`The domain of \(f^{-1}\) is the range of \(f\).`, S`Inputs and outputs swap.`]
  ]);
  C(['sl-graphs', 'ib-graphs'], [
    ['T', S`A horizontal asymptote can be crossed by the graph.`, S`It describes behaviour as \(|x| \to \infty\); for example \(y = \frac{x}{x^2 + 1}\) crosses \(y = 0\).`],
    ['N', S`A function's graph meets a vertical line twice.`, S`A function has one output for each input.`],
    ['S', S`A GDC graph in the standard window shows every \(x\)-intercept of a function.`, S`Roots outside the window are missed, so adjust the window and think about the function's shape.`]
  ]);
  C(['sl-models', 'ib-models'], [
    ['T', S`In \(y = a\sin(b(x - c)) + d\), the period is \(\frac{360°}{b}\) (or \(\frac{2\pi}{b}\) in radians).`, S`\(b\) controls how many cycles fit in one standard period.`],
    ['F', S`An exponential decay model \(y = ae^{-kt}\) eventually reaches zero.`, S`It approaches 0 but never reaches it.`],
    ['S', S`A model that fits the data well gives good predictions outside the data range.`, S`Extrapolation is unreliable.`],
    ['A', S`For a linear model, equal increases in \(x\) give equal increases in \(y\).`, S`The gradient is constant.`]
  ]);
  C('ib-logistic', [
    ['T', S`For \(N(t) = \frac{L}{1 + Ce^{-kt}}\) with \(k > 0\), \(N\) approaches \(L\) as \(t\) increases.`, S`\(Ce^{-kt} \to 0\).`],
    ['F', S`A logistic model grows fastest at the start.`, S`It grows fastest when \(N = \frac{L}{2}\).`]
  ]);
  C('ib-transform', [
    ['F', S`\(y = f(x - 3)\) is \(y = f(x)\) translated 3 units left.`, S`It is translated 3 units right.`],
    ['S', S`Applying two transformations in either order gives the same graph.`, S`Not always: a stretch then a translation can differ from the translation then the stretch.`],
    ['T', S`\(y = -f(x)\) is a reflection of \(y = f(x)\) in the \(x\)-axis.`, S`Every \(y\) value changes sign.`]
  ]);
  C('ib-linearise', [
    ['T', S`If \(y = ax^n\), then \(\ln y\) against \(\ln x\) is a straight line with gradient \(n\).`, S`\(\ln y = n\ln x + \ln a\).`],
    ['F', S`If \(y = ab^x\), plotting \(\ln y\) against \(\ln x\) gives a straight line.`, S`Plot \(\ln y\) against \(x\): \(\ln y = x\ln b + \ln a\).`]
  ]);
  C(['sl-3d', 'ib-3d'], [
    ['F', S`The volume of a cone is \(\pi r^2 h\).`, S`\(\frac{1}{3}\pi r^2 h\).`],
    ['T', S`The angle between a line and a plane is found in a right-angled triangle using the line's projection on the plane.`, S`The projection gives the smallest angle.`],
    ['A', S`The space diagonal of a cuboid is longer than every edge.`, S`\(\sqrt{l^2 + w^2 + h^2}\) exceeds each of \(l\), \(w\), \(h\).`]
  ]);
  C(['sl-trig', 'ib-trig'], [
    ['S', S`Given two sides and a non-included angle, there is one possible triangle.`, S`The ambiguous case can give two.`],
    ['T', S`The cosine rule with a 90° angle is Pythagoras' theorem.`, S`\(\cos 90° = 0\).`],
    ['F', S`Area \(= ab\sin C\).`, S`Area \(= \frac{1}{2}ab\sin C\).`]
  ]);
  C(['sl-trig', 'ib-bearings'], [
    ['T', S`Bearings are measured clockwise from north and written with three figures.`, S`For example 045°.`],
    ['F', S`If the bearing of \(B\) from \(A\) is 070°, the bearing of \(A\) from \(B\) is 110°.`, S`It is \(070° + 180° = 250°\).`],
    ['A', S`An angle of depression from \(A\) to \(B\) equals the angle of elevation from \(B\) to \(A\).`, S`They are alternate angles between horizontal lines.`]
  ]);
  C('sl-sectors', [
    ['F', S`If you double the angle of a sector, you double its perimeter.`, S`The arc doubles but the two radii do not change.`],
    ['T', S`A sector with angle 120° has a third of the circle's area.`, S`\(\frac{120}{360} = \frac{1}{3}\).`],
    ['S', S`A sector's arc is longer than its two radii added together.`, S`Only if the angle is more than about 114.6° (\(\frac{360}{\pi}\)°).`]
  ]);
  C('ib-radians', [
    ['T', S`\(1\) radian is the angle subtended by an arc equal in length to the radius.`, S`Definition.`],
    ['F', S`The area of a sector is \(r\theta\) for \(\theta\) in radians.`, S`Area \(= \frac{1}{2}r^2\theta\); arc length \(= r\theta\).`],
    ['A', S`\(2\pi\) radians is a full turn.`, S`\(2\pi \times\) radius is the circumference.`]
  ]);
  C(['sl-voronoi', 'ib-voronoi'], [
    ['A', S`Every point on the perpendicular bisector of \(AB\) is the same distance from \(A\) and \(B\).`, S`That defines the bisector.`],
    ['T', S`Each cell of a Voronoi diagram contains exactly one site.`, S`The cell is the set of points closest to that site.`],
    ['S', S`A Voronoi vertex is equidistant from exactly three sites.`, S`Usually three, but it can be four or more in special cases (e.g. a square of sites).`],
    ['F', S`The best place for a new site far from all others is always at the centre of the region.`, S`It is usually at a Voronoi vertex or on the boundary.`]
  ]);
  C('ib-trig-eq', [
    ['F', S`\(\sin x = 0.5\) has one solution for \(0 \le x \le 2\pi\).`, S`\(x = \frac{\pi}{6}\) and \(\frac{5\pi}{6}\).`],
    ['A', S`\(\sin^2 x + \cos^2 x = 1\)`, S`Pythagoras on the unit circle.`],
    ['S', S`\(\cos x = k\) has two solutions in \(0 \le x < 2\pi\).`, S`Only for \(-1 < k < 1\); \(k = \pm 1\) gives one, \(|k| > 1\) gives none.`]
  ]);
  C('ib-mat-transform', [
    ['T', S`\(|\det \mathbf{T}|\) is the area scale factor of the transformation.`, S`The unit square maps to a parallelogram of that area.`],
    ['F', S`For "transformation \(\mathbf{A}\) followed by \(\mathbf{B}\)", the matrix is \(\mathbf{AB}\).`, S`It is \(\mathbf{BA}\): the first transformation is next to the vector.`],
    ['S', S`A transformation matrix with determinant \(-1\) is a reflection.`, S`It reverses orientation, but it need not preserve lengths: \(\begin{pmatrix} 2 & 0 \\ 0 & -\frac{1}{2} \end{pmatrix}\) has determinant \(-1\) and also stretches.`]
  ]);
  C('ib-vectors', [
    ['S', S`Two lines in 3D that are not parallel intersect.`, S`They might be skew.`],
    ['T', S`\(\mathbf{r} = \mathbf{a} + \lambda\mathbf{b}\) describes a line through \(\mathbf{a}\) in the direction \(\mathbf{b}\).`, S`Each \(\lambda\) gives a point on the line.`],
    ['F', S`The vector equation of a line is unique.`, S`Any point on the line and any multiple of the direction vector can be used.`]
  ]);
  C('ib-vec-kinematics', [
    ['T', S`If \(\mathbf{r} = \mathbf{a} + t\mathbf{v}\), the speed is \(|\mathbf{v}|\).`, S`The velocity is constant, \(\mathbf{v}\).`],
    ['F', S`Two ships whose paths cross must collide.`, S`They must be at the crossing point at the same time.`],
    ['S', S`The closest approach of two moving objects happens at \(t = 0\).`, S`Only if they are moving apart from the start.`]
  ]);
  C('ib-vec-product', [
    ['A', S`\(\mathbf{a} \times \mathbf{b}\) is perpendicular to both \(\mathbf{a}\) and \(\mathbf{b}\).`, S`Property of the vector product.`],
    ['F', S`\(\mathbf{a} \times \mathbf{b} = \mathbf{b} \times \mathbf{a}\)`, S`\(\mathbf{b} \times \mathbf{a} = -\mathbf{a} \times \mathbf{b}\).`],
    ['T', S`If \(\mathbf{a} \cdot \mathbf{b} = 0\) for non-zero vectors, they are perpendicular.`, S`\(\cos\theta = 0\).`],
    ['T', S`\(|\mathbf{a} \times \mathbf{b}|\) is the area of the parallelogram formed by \(\mathbf{a}\) and \(\mathbf{b}\).`, S`\(|\mathbf{a}||\mathbf{b}|\sin\theta\).`]
  ]);
  C('ib-graph-theory', [
    ['A', S`The sum of the degrees of a graph is twice the number of edges.`, S`Each edge adds 1 to the degree of each of its two ends.`],
    ['N', S`A graph has exactly one vertex of odd degree.`, S`The number of odd vertices is always even.`],
    ['T', S`A connected graph with every vertex of even degree has an Eulerian circuit.`, S`Euler's theorem.`],
    ['N', S`A tree with \(n\) vertices has \(n\) edges.`, S`A tree always has \(n - 1\) edges.`]
  ]);
  C('ib-graph-algorithms', [
    ['T', S`Kruskal's algorithm and Prim's algorithm give minimum spanning trees of the same total weight.`, S`Both find a minimum spanning tree.`],
    ['F', S`The nearest-neighbour algorithm always finds the optimal travelling-salesperson route.`, S`It gives an upper bound.`],
    ['A', S`In the Chinese postman problem, odd vertices must be paired.`, S`Each odd vertex needs one repeated route to make all degrees even.`]
  ]);
  C(['sl-descriptive', 'ib-descriptive'], [
    ['S', S`The mean is greater than the median.`, S`For positively skewed data; not for negatively skewed data.`],
    ['A', S`Adding a constant to every value doesn't change the standard deviation.`, S`Every value moves by the same amount, so the spread is unchanged.`],
    ['F', S`An outlier is any value more than 1.5 above the upper quartile.`, S`It is more than \(1.5 \times \text{IQR}\) above \(Q_3\) (or below \(Q_1\)).`],
    ['T', S`A stratified sample keeps the proportions of each group in the population.`, S`Each stratum is sampled in proportion.`]
  ]);
  C(['sl-regression', 'ib-regression'], [
    ['F', S`\(r = 0.9\) shows that \(x\) causes \(y\).`, S`Correlation does not imply causation.`],
    ['S', S`Spearman's \(r_s\) and Pearson's \(r\) give the same value.`, S`They are equal only in special cases; \(r_s = 1\) for any increasing relationship, linear or not.`],
    ['T', S`Use the regression line of \(x\) on \(y\) to estimate \(x\) from a given \(y\).`, S`Each line minimises errors in the variable being estimated.`]
  ]);
  C(['sl-probability', 'ib-probability'], [
    ['T', S`If \(A\) and \(B\) are independent, \(P(A \mid B) = P(A)\).`, S`Knowing \(B\) doesn't change the probability of \(A\).`],
    ['F', S`Mutually exclusive events are independent.`, S`If one happens the other can't, so they are dependent (when both are possible).`],
    ['A', S`\(P(A \cup B) = P(A) + P(B) - P(A \cap B)\)`, S`The addition rule.`]
  ]);
  C(['sl-discrete', 'ib-discrete'], [
    ['A', S`The probabilities of a discrete random variable add up to 1.`, S`One of the outcomes must happen.`],
    ['F', S`For \(X \sim B(n, p)\), \(E(X) = np(1 - p)\).`, S`\(E(X) = np\); \(\mathrm{Var}(X) = np(1 - p)\).`],
    ['T', S`A game is fair when the expected gain is 0.`, S`On average no one wins or loses.`]
  ]);
  C(['sl-normal', 'ib-normal'], [
    ['T', S`About 68% of a normal distribution lies within one standard deviation of the mean.`, S`A standard property.`],
    ['F', S`For a normal variable, \(P(X = 5)\) can be found with normalcdf by using equal bounds of 5.`, S`It is 0 for a continuous variable.`],
    ['A', S`A normal distribution is symmetric about its mean.`, S`Mean = median = mode.`]
  ]);
  C(['sl-tests', 'ib-hypothesis'], [
    ['F', S`A \(p\)-value of 0.03 means there is a 3% chance that \(H_0\) is true.`, S`It is the probability of results at least this extreme if \(H_0\) is true.`],
    ['T', S`For a \(\chi^2\) test, expected frequencies should be at least 5.`, S`Otherwise combine categories.`],
    ['S', S`Rejecting \(H_0\) at the 5% level means rejecting it at the 1% level.`, S`Only if the \(p\)-value is also below 0.01.`],
    ['T', S`For a \(\chi^2\) test of independence with a \(3 \times 4\) table, \(\nu = 6\).`, S`\((3 - 1)(4 - 1) = 6\).`]
  ]);
  C('ib-estimation', [
    ['T', S`\(\mathrm{Var}(X_1 + X_2) = \mathrm{Var}(X_1) + \mathrm{Var}(X_2)\) for independent \(X_1, X_2\).`, S`Variances add for independent variables.`],
    ['F', S`\(\mathrm{Var}(X - Y) = \mathrm{Var}(X) - \mathrm{Var}(Y)\) for independent variables.`, S`Variances add: \(\mathrm{Var}(X) + \mathrm{Var}(Y)\).`],
    ['A', S`A 99% confidence interval is wider than a 95% one from the same sample.`, S`More confidence needs a wider interval.`]
  ]);
  C('ib-poisson', [
    ['A', S`For \(X \sim \mathrm{Po}(m)\), \(E(X) = \mathrm{Var}(X) = m\).`, S`A property of the Poisson distribution.`],
    ['T', S`If calls arrive at 3 per hour, the number in 2 hours is \(\mathrm{Po}(6)\).`, S`The rate scales with the time interval.`],
    ['S', S`A Poisson model is suitable for counts.`, S`Only if events occur randomly, independently and at a constant average rate.`]
  ]);
  C('ib-markov', [
    ['A', S`Each column of a transition matrix (columns = current state) adds up to 1.`, S`From each state the system must go somewhere.`],
    ['T', S`The steady state \(\mathbf{s}\) satisfies \(\mathbf{Ts} = \mathbf{s}\).`, S`It is an eigenvector with eigenvalue 1.`],
    ['F', S`The long-term state depends on the initial state for a regular Markov chain.`, S`It tends to the same steady state whatever the start.`]
  ]);
  C(['sl-derivatives', 'ib-derivatives'], [
    ['S', S`If \(f'(a) = 0\), then \(f\) has a maximum or minimum at \(a\).`, S`It could be a point of inflection.`],
    ['T', S`The normal at a point is perpendicular to the tangent there.`, S`Gradients multiply to \(-1\).`],
    ['F', S`The derivative of \(x^{-1}\) is \(\ln x\).`, S`It is \(-x^{-2}\); \(\ln x\) is the integral of \(x^{-1}\).`],
    ['A', S`If \(f'(x) < 0\) on an interval, \(f\) is decreasing there.`, S`A negative gradient means falling.`]
  ]);
  C(['sl-optimisation', 'ib-optimisation'], [
    ['S', S`The maximum value of a function on an interval is at a stationary point.`, S`It could be at an endpoint of the interval.`],
    ['T', S`At a local maximum, \(f'(x)\) changes from positive to negative.`, S`The function rises then falls.`],
    ['F', S`A minimum point always has a lower \(y\)-value than every maximum point.`, S`Local minima can be higher than local maxima elsewhere.`]
  ]);
  C(['sl-integration', 'ib-integration'], [
    ['F', S`\(\int_a^b f(x)\,dx\) always gives the area between the curve and the \(x\)-axis.`, S`Parts below the axis count as negative.`],
    ['T', S`The trapezoidal rule overestimates the area under a curve that is concave up.`, S`The straight tops of the trapezia lie above the curve.`],
    ['A', S`\(\int (f(x) + g(x))\,dx = \int f(x)\,dx + \int g(x)\,dx\)`, S`Integration is linear.`]
  ]);
  C('ib-diff-rules', [
    ['F', S`\(\frac{d}{dx}(fg) = f'g'\)`, S`Product rule: \(f'g + fg'\).`],
    ['T', S`\(\frac{d}{dx}\sin(3x) = 3\cos(3x)\)`, S`Chain rule.`],
    ['A', S`In related rates, \(\frac{dV}{dt} = \frac{dV}{dr} \times \frac{dr}{dt}\).`, S`The chain rule links the rates.`]
  ]);
  C('ib-volumes', [
    ['T', S`The volume when \(y = f(x)\) is rotated 360° about the \(x\)-axis is \(\pi\int y^2\,dx\).`, S`Sum of thin discs of area \(\pi y^2\).`],
    ['F', S`Rotating the region between two curves gives \(\pi\int (y_1 - y_2)^2\,dx\).`, S`It is \(\pi\int (y_1^2 - y_2^2)\,dx\) (washers).`]
  ]);
  C('ib-kinematics', [
    ['S', S`\(\int_0^T v\,dt\) is the distance travelled.`, S`Only if \(v\) doesn't change sign; otherwise it is the displacement.`],
    ['T', S`Acceleration is the derivative of velocity.`, S`\(a = \frac{dv}{dt}\).`],
    ['F', S`A particle with zero velocity has zero acceleration.`, S`At the top of a throw, \(v = 0\) but \(a = -g\).`]
  ]);
  C('ib-diff-equations', [
    ['T', S`Euler's method is more accurate with a smaller step length.`, S`The tangent approximation is used over shorter intervals.`],
    ['F', S`\(\frac{dy}{dx} = x + y\) can be solved by separating the variables.`, S`It cannot be written as \(f(y)\,dy = g(x)\,dx\).`],
    ['A', S`A slope field shows the gradient of solution curves at each point.`, S`Each segment has gradient \(\frac{dy}{dx}\) at that point.`]
  ]);
  C('ib-coupled', [
    ['T', S`If both eigenvalues are negative, the equilibrium at the origin is stable.`, S`All solutions decay to the origin.`],
    ['S', S`Complex eigenvalues give a spiral in the phase portrait.`, S`A spiral if the real part is non-zero; a centre (closed loops) if it is zero.`],
    ['F', S`Eigenvalues of opposite signs give a stable node.`, S`They give a saddle point, which is unstable.`]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
