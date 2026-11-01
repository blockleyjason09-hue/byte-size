/* Byte Size Classroom — deeper extension questions (set 3, IB AI HL part h): graph algorithms, estimation and confidence intervals, Poisson distribution, Markov chains. */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function d4(x) { return x.toFixed(4); }
  function F(n, d) { return frac(n, d); }
  var V = ['A', 'B', 'C', 'D', 'E'];
  function graph(n, p) { var e = []; for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) if (j === i + 1 || Math.random() < p) e.push([i, j, ri(2, 15)]); return e; }
  function elist(e) { return e.map(function (x) { return V[x[0]] + V[x[1]] + ' = ' + x[2]; }).join(', '); }
  function kruskal(n, e) { var par = []; for (var i = 0; i < n; i++) par.push(i); function f(x) { return par[x] === x ? x : (par[x] = f(par[x])); } var s = e.slice().sort(function (a, b) { return a[2] - b[2]; }), t = []; s.forEach(function (x) { var a = f(x[0]), b = f(x[1]); if (a !== b) { par[a] = b; t.push(x); } }); return t; }
  function dist(n, e) { var D = []; for (var i = 0; i < n; i++) { D.push([]); for (var j = 0; j < n; j++) D[i].push(i === j ? 0 : Infinity); } e.forEach(function (x) { D[x[0]][x[1]] = Math.min(D[x[0]][x[1]], x[2]); D[x[1]][x[0]] = D[x[0]][x[1]]; }); for (var k = 0; k < n; k++) for (i = 0; i < n; i++) for (j = 0; j < n; j++) if (D[i][k] + D[k][j] < D[i][j]) D[i][j] = D[i][k] + D[k][j]; return D; }
  function sum(a) { return a.reduce(function (p, q) { return p + q; }, 0); }
  function fact(n) { var f = 1; for (var i = 2; i <= n; i++) f *= i; return f; }
  function pois(l, k) { return Math.exp(-l) * Math.pow(l, k) / fact(k); }
  function pcdf(l, k) { var s = 0; for (var i = 0; i <= k; i++) s += pois(l, i); return s; }
  function mul(A, B) { return A.map(function (r) { return B[0].map(function (_, j) { return r.reduce(function (s, x, k) { return s + x * B[k][j]; }, 0); }); }); }
  function mtex(A) { return '\\begin{pmatrix}' + A.map(function (r) { return r.join(' & '); }).join('\\\\') + '\\end{pmatrix}'; }

  X('ib-graph-algorithms', [
    function () {
      var e = graph(5, 0.6), t = kruskal(5, e);
      return Q('A network has edges ' + elist(e) + '.', [
        ['Use Kruskal’s algorithm to find a minimum spanning tree, listing edges in the order chosen.', 3, t.map(function (x) { return V[x[0]] + V[x[1]]; }).join(', ')],
        ['State the total weight.', 1, sum(t.map(function (x) { return x[2]; }))],
        ['Explain why a spanning tree on 5 vertices always has 4 edges.', 1, 'Each edge joins a new vertex without forming a cycle']
      ]);
    },
    function () {
      var e = graph(5, 0.55), D = dist(5, e);
      return Q('A road network has edges ' + elist(e) + ' (km).', [
        ['Use Dijkstra’s algorithm to find the shortest distance from A to E.', 3, D[0][4]],
        ['Find the shortest distance from A to every other vertex.', 2, 'B ' + D[0][1] + ', C ' + D[0][2] + ', D ' + D[0][3] + ', E ' + D[0][4]],
        ['Explain why Dijkstra’s algorithm fails if some weights are negative.', 1, 'A vertex’s label could later be reduced after it has been made permanent']
      ]);
    },
    function () {
      var w = [ri(3, 9), ri(3, 9), ri(3, 9), ri(3, 9), ri(3, 9)];
      var e = [[0, 1, w[0]], [1, 2, w[1]], [2, 3, w[2]], [3, 0, w[3]], [0, 2, w[4]]];
      var D = dist(4, e), tot = sum(w);
      return Q('A route inspector must walk every road in a network with edges AB = ' + w[0] + ', BC = ' + w[1] + ', CD = ' + w[2] + ', DA = ' + w[3] + ', AC = ' + w[4] + ', starting and finishing at A.', [
        ['Identify the vertices of odd degree.', 1, 'A and C'],
        ['Find the shortest route length using the Chinese postman algorithm.', 3, tot + ' + ' + D[0][2] + ' = ' + (tot + D[0][2])],
        ['How would the answer change if the route could start at A and finish at C?', 1, 'No repeats needed: ' + tot]
      ]);
    },
    function () {
      var n = 5, P = [];
      for (var i = 0; i < n; i++) { P.push([]); for (var j = 0; j < n; j++) P[i].push(0); }
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) { P[i][j] = P[j][i] = ri(3, 15); }
      var vis = [0], cur = 0, tot = 0;
      while (vis.length < n) { var b = -1; for (j = 0; j < n; j++) if (vis.indexOf(j) < 0 && (b < 0 || P[cur][j] < P[cur][b])) b = j; tot += P[cur][b]; vis.push(b); cur = b; }
      tot += P[cur][0];
      var rest = [1, 2, 3, 4], e = []; for (i = 0; i < 4; i++) for (j = i + 1; j < 4; j++) e.push([rest[i] - 1, rest[j] - 1, P[rest[i]][rest[j]]]);
      var mst = sum(kruskal(4, e).map(function (x) { return x[2]; })), two = P[0].slice(1).sort(function (a, b) { return a - b; });
      return Q('A complete graph has distances ' + [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]].map(function (p) { return V[p[0]] + V[p[1]] + ' = ' + P[p[0]][p[1]]; }).join(', ') + '.', [
        ['Use the nearest neighbour algorithm from A to find an upper bound for the travelling salesman problem.', 3, vis.map(function (k) { return V[k]; }).join('') + 'A, length ' + tot],
        ['Use the deleted vertex algorithm (deleting A) to find a lower bound.', 3, mst + ' + ' + two[0] + ' + ' + two[1] + ' = ' + (mst + two[0] + two[1])],
        ['Explain what the two bounds tell you.', 1, 'The optimal tour length lies between them']
      ]);
    },
    function () {
      var e = graph(5, 0.7), t = kruskal(5, e);
      return Q('Prim’s algorithm is applied, starting from A, to the network with edges ' + elist(e) + '.', [
        ['List the edges in the order Prim’s algorithm adds them.', 3, (function () { var inT = [0], out = []; while (inT.length < 5) { var best = null; e.forEach(function (x) { var a = inT.indexOf(x[0]) >= 0, b = inT.indexOf(x[1]) >= 0; if (a !== b && (!best || x[2] < best[2])) best = x; }); out.push(V[best[0]] + V[best[1]]); inT.push(inT.indexOf(best[0]) >= 0 ? best[1] : best[0]); } return out.join(', '); })()],
        ['Compare the total with Kruskal’s algorithm.', 1, 'Same total, ' + sum(t.map(function (x) { return x[2]; })) + ' (both give a minimum spanning tree)'],
        ['Give one advantage of Prim’s algorithm when the network is given as a table.', 1, 'It can be done directly on a distance matrix without sorting all edges']
      ]);
    },
    function () {
      var a = ri(3, 9), b = ri(3, 9), c = ri(3, 9), d = ri(3, 9), x = ri(3, 9), y = ri(3, 9);
      var e = [[0, 1, a], [1, 2, b], [2, 3, c], [3, 0, d], [0, 2, x], [1, 3, y]];
      var D = dist(4, e), pair = Math.min(D[0][1] + D[2][3], D[0][2] + D[1][3], D[0][3] + D[1][2]);
      return Q('A network has edges AB = ' + a + ', BC = ' + b + ', CD = ' + c + ', DA = ' + d + ', AC = ' + x + ', BD = ' + y + '. Every road must be travelled, returning to the start.', [
        ['Explain why there are four odd vertices.', 1, 'Every vertex has degree 3'],
        ['Consider all pairings of the odd vertices and find the least extra distance.', 3, pair],
        ['Find the length of the shortest route.', 1, (a + b + c + d + x + y + pair)]
      ]);
    },
    function () {
      return Q('Comparing algorithms.', [
        ['Which algorithm finds the shortest path between two vertices?', 1, 'Dijkstra’s'],
        ['Which problem asks for the shortest closed route visiting every vertex, and why is no efficient exact algorithm known?', 2, 'The travelling salesman problem; the number of possible tours grows factorially'],
        ['Which problem asks for the shortest route using every edge?', 1, 'The Chinese postman (route inspection) problem']
      ]);
    },
    function () {
      var e = graph(5, 0.5), t = kruskal(5, e), w = sum(t.map(function (x) { return x[2]; }));
      return Q('A council wants to connect five villages with cables along the roads ' + elist(e) + ' (km), using as little cable as possible.', [
        ['Find the minimum length of cable.', 3, w + ' km'],
        ['Is the minimum spanning tree unique here? Explain how to tell.', 1, (function () { var ws = e.map(function (x) { return x[2]; }); return ws.length === new Set(ws).size ? 'Yes: all weights are different' : 'Not necessarily: some weights are equal'; })()],
        ['A cable must go along the most expensive road. Explain how to adapt the algorithm.', 1, 'Include that edge first, then continue Kruskal’s algorithm']
      ]);
    },
    function () {
      var n = ri(5, 8);
      return Q('The travelling salesman problem on ' + n + ' cities.', [
        ['How many different tours are there in a complete graph (ignoring direction and starting point)?', 2, M('\\frac{(' + n + ' - 1)!}{2} = ' + fact(n - 1) / 2)],
        ['Explain why the nearest neighbour algorithm may not give the optimal tour.', 1, 'Greedy choices early on can force long edges later'],
        ['Explain why the deleted vertex algorithm gives a lower bound.', 2, 'Any tour, minus the deleted vertex, is a spanning tree of the rest, plus two edges at the deleted vertex']
      ]);
    },
    function () {
      var e = graph(5, 0.6), D = dist(5, e);
      return Q('Use the network with edges ' + elist(e) + '.', [
        ['Find the shortest path from B to D.', 2, D[1][3]],
        ['Is the shortest path from B to D through A? Explain.', 2, D[1][0] + D[0][3] === D[1][3] ? 'Yes: it equals ' + D[1][0] + ' + ' + D[0][3] : 'No: ' + D[1][0] + ' + ' + D[0][3] + ' > ' + D[1][3]],
        ['Explain why the shortest paths from one vertex form a tree.', 1, 'Each vertex is reached by one shortest route from its predecessor']
      ]);
    }
  ]);

  X('ib-estimation', [
    function () {
      var m = ri(40, 60), s = ri(3, 8), n = pick([25, 36, 49, 64]);
      var e = 1.96 * s / Math.sqrt(n);
      return Q('A sample of ' + n + ' has mean ' + m + '. The population standard deviation is ' + s + '.', [
        ['Find a 95% confidence interval for the mean.', 3, '[' + sf3(m - e) + ', ' + sf3(m + e) + ']'],
        ['Interpret the interval.', 1, '95% of intervals made this way contain the true mean'],
        ['How large a sample is needed for the interval to have width at most 1?', 2, Math.ceil(Math.pow(2 * 1.96 * s, 2))]
      ]);
    },
    function () {
      var d = [ri(10, 20), ri(10, 20), ri(10, 20), ri(10, 20), ri(10, 20), ri(10, 20)];
      var n = d.length, mean = sum(d) / n, ss = sum(d.map(function (x) { return (x - mean) * (x - mean); }));
      return Q('A sample is ' + d.join(', ') + '.', [
        ['Find an unbiased estimate of the population mean and variance.', 3, sf3(mean) + ' and ' + sf3(ss / (n - 1))],
        ['Explain why dividing by ' + M('n - 1') + ' gives an unbiased estimate.', 1, 'Deviations from the sample mean are smaller on average than from the true mean'],
        ['Find the biased (sample) variance and compare.', 1, sf3(ss / n) + ': smaller, by factor ' + M(F(n - 1, n))]
      ]);
    },
    function () {
      var m = ri(100, 200), s = ri(5, 15), n = 10, t = 2.262;
      var e = t * s / Math.sqrt(n);
      return Q('A sample of 10 has mean ' + m + ' and unbiased standard deviation ' + s + '. The population is normal with unknown variance (' + M('t_{9}') + ' critical value 2.262).', [
        ['Find a 95% confidence interval for the mean.', 3, '[' + sf3(m - e) + ', ' + sf3(m + e) + ']'],
        ['Explain why the ' + M('t') + '-distribution is used.', 1, 'The variance is estimated from a small sample'],
        ['Would a 99% interval be wider or narrower? Explain.', 1, 'Wider: more confidence needs a larger range']
      ]);
    },
    function () {
      var L = ri(40, 50), w = ri(4, 10), U = L + w;
      return Q('A 95% confidence interval for a mean is [' + L + ', ' + U + '], based on a sample of 36.', [
        ['Find the sample mean.', 1, num((L + U) / 2)],
        ['Find the population standard deviation used.', 2, sf3(w / 2 / 1.96 * 6)],
        ['Does the interval support a claim that the mean is ' + (U + 1) + '? Explain.', 1, 'No: it lies outside the interval']
      ]);
    },
    function () {
      var p = pick([0.3, 0.4, 0.6]), n = pick([100, 200]);
      var e = 1.96 * Math.sqrt(p * (1 - p) / n);
      return Q('In a survey of ' + n + ' people, ' + p * n + ' support a proposal.', [
        ['Find an approximate 95% confidence interval for the proportion.', 3, '[' + sf3(p - e) + ', ' + sf3(p + e) + ']'],
        ['How many people would be needed to halve the width?', 2, 4 * n],
        ['Explain why the width depends on ' + M('\\sqrt{n}') + ' rather than ' + M('n') + '.', 1, 'The standard error is proportional to ' + M('\\frac{1}{\\sqrt{n}}')]
      ]);
    },
    function () {
      return Q('Estimators.', [
        ['What does it mean for an estimator to be unbiased?', 1, 'Its expected value equals the parameter'],
        ['Is the sample mean an unbiased estimator of the population mean? Explain.', 1, 'Yes: ' + M('E(\\bar{X}) = \\mu')],
        ['Explain why a larger sample gives a better estimate even if both are unbiased.', 1, 'The variance of the estimator is smaller']
      ]);
    },
    function () {
      var s = ri(4, 10), E = pick([1, 2]);
      return Q('A researcher wants to estimate a mean to within ' + E + ' unit with 95% confidence. The standard deviation is ' + s + '.', [
        ['Find the minimum sample size.', 3, Math.ceil(Math.pow(1.96 * s / E, 2))],
        ['How does the sample size change for 99% confidence (z = 2.576)?', 2, Math.ceil(Math.pow(2.576 * s / E, 2))],
        ['Explain the trade-off between confidence and precision.', 1, 'Higher confidence needs a wider interval or a larger sample']
      ]);
    },
    function () {
      var m1 = ri(50, 60), m2 = ri(50, 60), s = ri(4, 8), n = 25;
      var e = 1.96 * s / 5;
      return Q('Two independent samples of 25 have means ' + m1 + ' and ' + m2 + '; both populations have standard deviation ' + s + '.', [
        ['Find 95% confidence intervals for each mean.', 3, '[' + sf3(m1 - e) + ', ' + sf3(m1 + e) + '] and [' + sf3(m2 - e) + ', ' + sf3(m2 + e) + ']'],
        ['Do the intervals overlap? What does that suggest?', 1, Math.abs(m1 - m2) < 2 * e ? 'Yes: no clear evidence the means differ' : 'No: evidence the means differ'],
        ['Why is comparing overlapping intervals not a formal test?', 1, 'The proper test uses the standard error of the difference']
      ]);
    },
    function () {
      var m = ri(20, 30), s = ri(3, 6), n = 16;
      return Q('From 20 samples of 16, 95% confidence intervals are made.', [
        ['How many would you expect to contain the true mean?', 1, 19],
        ['Find the width of each interval if ' + M('\\sigma = ' + s) + '.', 2, sf3(2 * 1.96 * s / 4)],
        ['Explain why the intervals have different centres but the same width.', 1, 'The sample means vary; the width depends only on ' + M('\\sigma') + ' and ' + M('n')]
      ]);
    },
    function () {
      var sx = ri(400, 600), sxx = 0, n = 20, m = sx / n;
      sxx = Math.round(n * (m * m + ri(4, 25)));
      return Q('For a sample of 20, ' + M('\\sum x = ' + sx) + ' and ' + M('\\sum x^2 = ' + sxx) + '.', [
        ['Find unbiased estimates of the mean and variance.', 3, sf3(m) + ' and ' + sf3((sxx - n * m * m) / (n - 1))],
        ['Find an approximate 95% confidence interval for the mean (use ' + M('t_{19} = 2.093') + ').', 2, (function () { var s = Math.sqrt((sxx - n * m * m) / (n - 1)), e = 2.093 * s / Math.sqrt(n); return '[' + sf3(m - e) + ', ' + sf3(m + e) + ']'; })()]
      ]);
    }
  ]);

  X('ib-poisson', [
    function () {
      var l = pick([2, 2.5, 3, 4]);
      return Q('Calls arrive at a rate of ' + l + ' per minute, modelled by a Poisson distribution.', [
        ['Find the probability of exactly 2 calls in a minute.', 1, d4(pois(l, 2))],
        ['Find the probability of more than 5 calls in 2 minutes.', 2, d4(1 - pcdf(2 * l, 5))],
        ['State two conditions for the Poisson model.', 2, 'Calls occur independently, at a constant average rate, singly']
      ]);
    },
    function () {
      var a = pick([1.5, 2]), b = pick([2.5, 3]);
      return Q(M('X \\sim \\text{Po}(' + a + ')') + ' and ' + M('Y \\sim \\text{Po}(' + b + ')') + ' are independent.', [
        ['State the distribution of ' + M('X + Y') + '.', 1, M('\\text{Po}(' + (a + b) + ')')],
        ['Find ' + M('P(X + Y = 4)') + '.', 2, d4(pois(a + b, 4))],
        ['Find ' + M('P(X = 1 \\mid X + Y = 4)') + '.', 3, d4(pois(a, 1) * pois(b, 3) / pois(a + b, 4))]
      ]);
    },
    function () {
      var d = [0, 1, 2, 3, 4], f = [ri(10, 20), ri(20, 30), ri(15, 25), ri(5, 12), ri(1, 5)];
      var n = sum(f), m = sum(d.map(function (x, i) { return x * f[i]; })) / n;
      var v = sum(d.map(function (x, i) { return x * x * f[i]; })) / n - m * m;
      return Q('The number of goals per match: 0: ' + f[0] + ', 1: ' + f[1] + ', 2: ' + f[2] + ', 3: ' + f[3] + ', 4: ' + f[4] + '.', [
        ['Find the mean and variance.', 3, sf3(m) + ' and ' + sf3(v)],
        ['Comment on whether a Poisson model is suitable.', 1, Math.abs(m - v) / m < 0.2 ? 'Yes: mean and variance are close' : 'Doubtful: mean and variance differ noticeably'],
        ['Using ' + M('\\text{Po}(' + sf3(m) + ')') + ', find the expected number of matches with 0 goals.', 2, sf3(n * pois(m, 0))]
      ]);
    },
    function () {
      var l = pick([0.5, 0.8, 1.2]);
      return Q('Flaws occur in cloth at ' + l + ' per metre.', [
        ['Find the probability a 3 m length has no flaws.', 2, d4(Math.exp(-3 * l))],
        ['Find the length for which the probability of no flaws is 0.5.', 2, sf3(Math.log(2) / l) + ' m'],
        ['Ten 1 m pieces are cut. Find the probability that at least 8 are flawless.', 3, (function () { var p = Math.exp(-l), s = 0; for (var k = 8; k <= 10; k++) { var c = fact(10) / (fact(k) * fact(10 - k)); s += c * Math.pow(p, k) * Math.pow(1 - p, 10 - k); } return d4(s); })()]
      ]);
    },
    function () {
      var l = pick([2, 3, 4]);
      return Q(M('X \\sim \\text{Po}(\\lambda)') + ' and ' + M('P(X = 2) = P(X = 3)') + '.', [
        ['Show that ' + M('\\lambda = 3') + '.', 2, M('\\frac{\\lambda^2}{2} = \\frac{\\lambda^3}{6}')],
        ['Find ' + M('P(X \\le 1)') + '.', 1, d4(pcdf(3, 1))],
        ['For a general ' + M('k') + ', find ' + M('\\lambda') + ' if ' + M('P(X = k) = P(X = k + 1)') + '.', 1, M('\\lambda = k + 1')]
      ]);
    },
    function () {
      var n = pick([200, 500]), p = pick([0.01, 0.005]);
      var l = n * p;
      return Q('A machine makes items, ' + p * 100 + '% of which are faulty. A batch of ' + n + ' is checked.', [
        ['Explain why a Poisson approximation is appropriate.', 1, M('n') + ' is large and ' + M('p') + ' is small'],
        ['Use ' + M('\\text{Po}(' + l + ')') + ' to find the probability of at most 2 faulty items.', 2, d4(pcdf(l, 2))],
        ['Compare with the exact binomial probability.', 2, (function () { var s = 0; for (var k = 0; k <= 2; k++) { var c = 1; for (var i = 0; i < k; i++) c = c * (n - i) / (i + 1); s += c * Math.pow(p, k) * Math.pow(1 - p, n - k); } return d4(s); })()]
      ]);
    },
    function () {
      var l = pick([4, 5, 6]);
      return Q('Customers arrive at a rate of ' + l + ' per hour.', [
        ['Find the most likely number of customers in an hour.', 2, l - 1 + ' and ' + l + ' (equally likely)'],
        ['Find the probability of at least one customer in 15 minutes.', 2, d4(1 - Math.exp(-l / 4))],
        ['Find the probability that the first hour has fewer than ' + l + ' customers and the second has more.', 3, d4(pcdf(l, l - 1) * (1 - pcdf(l, l)))]
      ]);
    },
    function () {
      var l = pick([1.5, 2.5]), x = ri(5, 7);
      var pv = 1 - pcdf(l, x - 1);
      return Q('Accidents at a junction have averaged ' + l + ' per month. After a change, there are ' + x + ' in a month.', [
        ['Test at 5% whether the rate has increased.', 3, M('P(X \\ge ' + x + ') = ' + d4(pv)) + (pv < 0.05 ? ': reject ' + M('H_0') + ', evidence of increase' : ': do not reject ' + M('H_0'))],
        ['State the hypotheses.', 1, M('H_0: \\lambda = ' + l) + ', ' + M('H_1: \\lambda > ' + l)],
        ['Why should a single month be treated with caution?', 1, 'Random variation is large for small counts']
      ]);
    },
    function () {
      var l = pick([3, 3.5]);
      return Q('For ' + M('X \\sim \\text{Po}(' + l + ')') + ':', [
        ['Write down ' + M('E(X)') + ' and ' + M('\\text{Var}(X)') + '.', 1, l + ' and ' + l],
        ['Find ' + M('E(2X + 1)') + ' and ' + M('\\text{Var}(2X + 1)') + '.', 2, (2 * l + 1) + ' and ' + 4 * l],
        ['Explain why ' + M('2X') + ' is not Poisson.', 1, 'Its mean ' + 2 * l + ' and variance ' + 4 * l + ' are not equal (and it only takes even values)']
      ]);
    },
    function () {
      var l = pick([0.2, 0.3]);
      return Q('A rare event occurs at ' + l + ' per day.', [
        ['Find the probability of no events in a 7-day week.', 2, d4(Math.exp(-7 * l))],
        ['Find the probability that 3 weeks in a row are event-free.', 2, d4(Math.exp(-21 * l))],
        ['Explain why this equals the probability of no events in 21 days.', 1, 'Non-overlapping periods are independent in a Poisson process']
      ]);
    }
  ]);

  X('ib-markov', [
    function () {
      var a = pick([0.7, 0.8, 0.9]), b = pick([0.6, 0.7, 0.8]);
      var T = [[a, 1 - b], [1 - a, b]], ss = [(1 - b) / (2 - a - b), (1 - a) / (2 - a - b)];
      return Q('If it is sunny today, it is sunny tomorrow with probability ' + a + '. If it is rainy, it is rainy tomorrow with probability ' + b + '.', [
        ['Write the transition matrix (columns: today sunny, rainy).', 2, M(mtex([[a, sf3(1 - b)], [sf3(1 - a), b]]))],
        ['Today is sunny. Find the probability it is sunny in 2 days.', 2, sf3(mul(mul(T, T), [[1], [0]])[0][0])],
        ['Find the long-term proportion of sunny days.', 2, sf3(ss[0])]
      ]);
    },
    function () {
      var T = [[0.5, 0.2, 0.3], [0.3, 0.6, 0.1], [0.2, 0.2, 0.6]];
      var v = [[1], [0], [0]]; for (var i = 0; i < 100; i++) v = mul(T, v);
      return Q('Customers choose between three shops. The transition matrix is ' + M('T = \\begin{pmatrix}0.5&0.2&0.3\\\\0.3&0.6&0.1\\\\0.2&0.2&0.6\\end{pmatrix}') + '.', [
        ['Explain why each column adds to 1.', 1, 'Each customer must go to one of the shops'],
        ['A customer is at shop 1 this week. Find the probability they are at shop 2 in two weeks.', 2, sf3(mul(mul(T, T), [[1], [0], [0]])[1][0])],
        ['Use technology to find the steady state.', 2, M('\\begin{pmatrix}' + v.map(function (r) { return sf3(r[0]); }).join('\\\\') + '\\end{pmatrix}')]
      ]);
    },
    function () {
      var p = pick([0.2, 0.3]), q = pick([0.1, 0.4]);
      return Q('A two-state Markov chain has ' + M('T = ' + mtex([[1 - p, q], [p, 1 - q]])) + '.', [
        ['Solve ' + M('T\\mathbf{s} = \\mathbf{s}') + ' to find the steady state.', 3, M('\\begin{pmatrix}' + sf3(q / (p + q)) + '\\\\' + sf3(p / (p + q)) + '\\end{pmatrix}')],
        ['Find the eigenvalues of ' + M('T') + '.', 2, '1 and ' + sf3(1 - p - q)],
        ['Explain how the second eigenvalue controls how quickly the chain settles.', 1, 'Differences from the steady state shrink by a factor ' + sf3(Math.abs(1 - p - q)) + ' each step']
      ]);
    },
    function () {
      var n = pick([10, 20]);
      var T = [[0.9, 0.2], [0.1, 0.8]], v = [[600], [400]];
      var w = v; for (var i = 0; i < n; i++) w = mul(T, w);
      return Q('In a town of 1000 people, 600 use bus A and 400 use bus B. Each week, 10% of A users switch to B and 20% of B users switch to A.', [
        ['Write the transition matrix and find the numbers after one week.', 2, M(mtex([[0.9, 0.2], [0.1, 0.8]])) + '; ' + sf3(mul(T, v)[0][0]) + ' and ' + sf3(mul(T, v)[1][0])],
        ['Use technology to find the numbers after ' + n + ' weeks.', 2, sf3(w[0][0]) + ' and ' + sf3(w[1][0])],
        ['Find the long-term numbers.', 2, '667 and 333 (to the nearest person)']
      ]);
    },
    function () {
      return Q('An absorbing state.', [
        ['Explain what an absorbing state is.', 1, 'A state that cannot be left once entered'],
        ['In ' + M('T = \\begin{pmatrix}1&0.3\\\\0&0.7\\end{pmatrix}') + ', which state is absorbing?', 1, 'State 1'],
        ['Find the probability of still being in state 2 after 5 steps, starting there.', 2, d4(Math.pow(0.7, 5))]
      ]);
    },
    function () {
      var a = pick([0.6, 0.7]), b = pick([0.5, 0.4]);
      var T = [[a, b], [1 - a, 1 - b]];
      return Q('A player wins a game with probability ' + a + ' after a win and ' + b + ' after a loss.', [
        ['Write the transition matrix.', 1, M(mtex([[a, b], [sf3(1 - a), sf3(1 - b)]]))],
        ['The player has just won. Find the probability of winning the next two games.', 2, sf3(a * a)],
        ['Find the long-term proportion of wins.', 2, sf3(b / (1 - a + b))]
      ]);
    },
    function () {
      var T = [[0.8, 0.3], [0.2, 0.7]];
      var T3 = mul(mul(T, T), T);
      return Q(M('T = \\begin{pmatrix}0.8&0.3\\\\0.2&0.7\\end{pmatrix}') + '.', [
        ['Find ' + M('T^3') + '.', 2, M(mtex(T3.map(function (r) { return r.map(sf3); })))],
        ['Diagonalise ' + M('T') + ' to find an expression for ' + M('T^n') + '.', 3, M('T^n = \\frac{1}{5}\\begin{pmatrix}3 + 2(0.5)^n & 3 - 3(0.5)^n\\\\2 - 2(0.5)^n & 2 + 3(0.5)^n\\end{pmatrix}')],
        ['Find the limit of ' + M('T^n') + ' and interpret it.', 1, M('\\begin{pmatrix}0.6&0.6\\\\0.4&0.4\\end{pmatrix}') + ': the long-term state does not depend on the start']
      ]);
    },
    function () {
      return Q('Checking Markov assumptions.', [
        ['State the Markov property.', 1, 'The next state depends only on the current state'],
        ['Give an example where this might not hold.', 1, 'Weather patterns that depend on several previous days'],
        ['Why must transition probabilities stay constant over time for the model to work?', 1, 'The same matrix is applied at every step']
      ]);
    },
    function () {
      var p = pick([0.25, 0.4]);
      return Q('A frog jumps between two lily pads, switching with probability ' + p + ' each minute and staying otherwise.', [
        ['Write the transition matrix.', 1, M(mtex([[1 - p, p], [p, 1 - p]]))],
        ['Find the steady state and explain why it is ' + M('(0.5, 0.5)') + '.', 2, 'The matrix is symmetric, so neither pad is favoured'],
        ['Find the probability it is on its starting pad after 3 minutes.', 2, sf3(0.5 + 0.5 * Math.pow(1 - 2 * p, 3))]
      ]);
    },
    function () {
      var a = pick([0.1, 0.2]), b = pick([0.3, 0.4]);
      return Q('Each year ' + a * 100 + '% of city residents move to the suburbs and ' + b * 100 + '% of suburban residents move to the city.', [
        ['Find the long-term proportion living in the city.', 2, sf3(b / (a + b))],
        ['Explain why the starting populations do not affect the answer.', 1, 'The chain is regular, so it converges to a unique steady state'],
        ['Suggest a limitation of this model.', 1, 'Rates may change over time, and births, deaths and migration are ignored']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
