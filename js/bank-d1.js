/* Byte Size Classroom — Pearson Edexcel A level Further Mathematics: Decision Mathematics 1.
   Difficulty: 1 = Standard, 2 = Exam, 3 = Challenging (extension questions). */
(function (g) {
  var BS = g.BS, A = BS.fa, M = BS.m;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, frac = BS.frac, num = BS.num;
  var Q = A.Q, sf3 = A.sf3, sum = A.sum, fact = A.fact;
  var X = BS.ext, T = BS.topic, Cn = BS.concept, Sr = String.raw;
  var V = ['A', 'B', 'C', 'D', 'E', 'F'];
  function table(head, rows) { return '<div class="qtable"><table><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>'; }
  function graph(n, p) { var e = []; for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) if (j === i + 1 || Math.random() < p) e.push([i, j, ri(3, 20)]); return e; }
  function elist(e) { return e.map(function (x) { return V[x[0]] + V[x[1]] + ' = ' + x[2]; }).join(', '); }
  function kruskal(n, e) { var par = []; for (var i = 0; i < n; i++) par.push(i); function f(x) { return par[x] === x ? x : (par[x] = f(par[x])); } var t = []; e.slice().sort(function (a, b) { return a[2] - b[2]; }).forEach(function (x) { var a = f(x[0]), b = f(x[1]); if (a !== b) { par[a] = b; t.push(x); } }); return t; }
  function dist(n, e) { var D = []; for (var i = 0; i < n; i++) { D.push([]); for (var j = 0; j < n; j++) D[i].push(i === j ? 0 : Infinity); } e.forEach(function (x) { D[x[0]][x[1]] = D[x[1]][x[0]] = Math.min(D[x[0]][x[1]], x[2]); }); for (var k = 0; k < n; k++) for (i = 0; i < n; i++) for (j = 0; j < n; j++) if (D[i][k] + D[k][j] < D[i][j]) D[i][j] = D[i][k] + D[k][j]; return D; }
  function prim(n, e) { var inT = [0], out = []; while (inT.length < n) { var b = null; e.forEach(function (x) { var a = inT.indexOf(x[0]) >= 0, c = inT.indexOf(x[1]) >= 0; if (a !== c && (!b || x[2] < b[2])) b = x; }); out.push(b); inT.push(inT.indexOf(b[0]) >= 0 ? b[1] : b[0]); } return out; }
  function wt(t) { return sum(t.map(function (x) { return x[2]; })); }
  function ename(x) { return V[x[0]] + V[x[1]]; }

  /* ---------------- Algorithms ---------------- */
  function bubblePass(a) { a = a.slice(); var sw = 0, cmp = 0; for (var i = 0; i < a.length - 1; i++) { cmp++; if (a[i] > a[i + 1]) { var t = a[i]; a[i] = a[i + 1]; a[i + 1] = t; sw++; } } return { a: a, sw: sw, cmp: cmp }; }
  function firstFit(items, cap) { var bins = []; items.forEach(function (x) { for (var i = 0; i < bins.length; i++) if (sum(bins[i]) + x <= cap) { bins[i].push(x); return; } bins.push([x]); }); return bins; }
  function showBins(b) { return b.map(function (x, i) { return 'Bin ' + (i + 1) + ': ' + x.join(', '); }).join('; '); }
  T({ id: 'd-algorithms', name: 'Algorithms: sorting, searching and bin packing', video: 'decision maths bubble sort quick sort bin packing', gens: [
    { d: [1], f: function () {
      var a = []; while (a.length < 7) a.push(ri(1, 40));
      var p1 = bubblePass(a), p2 = bubblePass(p1.a);
      return Q('Use a bubble sort to put ' + a.join(', ') + ' into ascending order.', [
        ['Write the list after the first pass and state the number of comparisons and swaps.', 3, p1.a.join(', ') + '; ' + p1.cmp + ' comparisons, ' + p1.sw + ' swaps'],
        ['Write the list after the second pass.', 1, p2.a.join(', ')],
        ['Explain how you know when the algorithm has finished.', 1, 'A pass with no swaps']
      ]);
    } },
    { d: [1, 2], f: function () {
      var a = []; while (a.length < 8) { var v = ri(1, 50); if (a.indexOf(v) < 0) a.push(v); }
      var piv = a[Math.floor(a.length / 2)], lo = a.filter(function (x) { return x < piv; }), hi = a.filter(function (x) { return x > piv; });
      return Q('Apply the first pass of a quick sort to ' + a.join(', ') + ', choosing the middle item as the pivot (for 8 items, the 5th).', [
        ['State the pivot and write the list after the first pass.', 3, piv + '; ' + lo.concat([piv]).concat(hi).join(', ')],
        ['Explain why the pivot is now in its correct final position.', 1, 'Everything smaller is before it and everything larger after it']
      ]);
    } },
    { d: [2], f: function () {
      var cap = pick([10, 12, 15]), items = []; while (items.length < 9) items.push(ri(2, cap - 2));
      var ff = firstFit(items, cap), ffd = firstFit(items.slice().sort(function (a, b) { return b - a; }), cap), lb = Math.ceil(sum(items) / cap);
      return Q('Items of sizes ' + items.join(', ') + ' are packed into bins of capacity ' + cap + '.', [
        ['Find a lower bound for the number of bins.', 2, M('\\lceil ' + sum(items) + ' \\div ' + cap + ' \\rceil = ' + lb)],
        ['Use first fit.', 2, showBins(ff) + ' (' + ff.length + ' bins)'],
        ['Use first fit decreasing and comment on whether it is optimal.', 3, showBins(ffd) + ' (' + ffd.length + ' bins)' + (ffd.length === lb ? ': optimal, as it meets the lower bound' : ': not proven optimal')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var n = ri(10, 30), list = []; for (var i = 0; i < n; i++) list.push(i * ri(2, 3) + 1 + (list.length ? list[list.length - 1] : 0) - (list.length ? list[list.length - 1] : 0) + i * 2);
      list = []; var v = ri(1, 5); for (i = 0; i < n; i++) { list.push(v); v += ri(1, 4); }
      var t = pick(list), lo = 1, hi = n, steps = [];
      while (lo <= hi) { var mid = Math.floor((lo + hi + 1) / 2); steps.push(list[mid - 1]); if (list[mid - 1] === t) break; if (list[mid - 1] < t) lo = mid + 1; else hi = mid - 1; }
      return Q('An ordered list has ' + n + ' items: ' + list.join(', ') + '. Use a binary search to find ' + t + ', taking the middle item as ' + M('\\lceil\\frac{\\text{first} + \\text{last}}{2}\\rceil') + '.', [
        ['List the items compared.', 3, steps.join(', ')],
        ['Find the maximum number of comparisons needed for a list of ' + n + ' items.', 2, Math.ceil(Math.log2(n + 1))]
      ]);
    } },
    { d: [2, 3], f: function () {
      var t = ri(2, 9), n1 = pick([100, 200, 500]), k = pick([2, 3, 4]);
      return Q('An algorithm of quadratic order takes ' + t + ' seconds for ' + n1 + ' items.', [
        ['Estimate the time for ' + k * n1 + ' items.', 2, t * k * k + ' seconds'],
        ['A bubble sort makes at most ' + M('\\frac{n(n - 1)}{2}') + ' comparisons. Explain why it has quadratic order.', 1, 'The leading term is ' + M('\\frac{n^2}{2}')],
        ['Explain why actual times may differ from the estimate.', 1, 'Lower-order terms and how ordered the data already is']
      ]);
    } }
  ] });
  X('d-algorithms', [
    function () {
      var a = []; while (a.length < 6) a.push(ri(1, 30));
      var b = a.slice(), passes = 0, cmps = 0;
      while (true) { var p = bubblePass(b); passes++; cmps += p.cmp; b = p.a; if (!p.sw) break; }
      return Q('Bubble sort efficiency for ' + a.join(', ') + '.', [
        ['Find the total number of passes, including the final pass with no swaps.', 2, passes],
        ['Explain how the number of comparisons can be reduced each pass.', 2, 'After each pass the largest remaining item is in place, so one fewer comparison is needed'],
        ['State the worst-case number of comparisons for 6 items with this improvement.', 1, 15]
      ]);
    },
    function () {
      var cap = 20, items = [11, 9, 8, 7, 6, 5, 4];
      return Q('Bins of capacity 20 hold items ' + items.join(', ') + '.', [
        ['Find the lower bound.', 1, Math.ceil(sum(items) / 20)],
        ['Find an optimal packing by trial, and explain how you know it is optimal.', 3, '11 + 9; 8 + 7 + 5; 6 + 4 (3 bins = lower bound)'],
        ['Explain why first fit decreasing is called a heuristic.', 1, 'It gives a good solution quickly but is not guaranteed optimal']
      ]);
    },
    function () {
      return Q('Full-bin combinations.', [
        ['Items 7, 8, 5, 6, 3, 4, 2, 5 go into bins of size 10. Find a full-bin packing.', 3, '7 + 3; 8 + 2; 5 + 5; 6 + 4 (4 bins)'],
        ['Explain why a full-bin packing is always optimal.', 1, 'It uses exactly the lower bound number of bins']
      ]);
    },
    function () {
      var n = pick([7, 8, 9]);
      return Q('Quick sort performance.', [
        ['Describe the worst case for a quick sort with the first item as pivot.', 2, 'An already sorted list: each pass only fixes one item'],
        ['How many passes might be needed for ' + n + ' items in the worst case?', 1, n - 1],
        ['Explain why choosing the middle item as pivot helps.', 1, 'It is more likely to split the list evenly']
      ]);
    },
    function () {
      var n = pick([50, 100, 1000]);
      return Q('Binary search versus linear search.', [
        ['Find the maximum number of comparisons for a binary search on ' + n + ' items.', 2, Math.ceil(Math.log2(n + 1))],
        ['Find it for a linear search.', 1, n],
        ['What condition must the list satisfy for binary search?', 1, 'It must be in order']
      ]);
    }
  ]);

  /* ---------------- Graphs and networks ---------------- */
  T({ id: 'd-graphs', name: 'Graphs and networks', video: 'decision maths graph theory terminology eulerian planar', gens: [
    { d: [1], f: function () {
      var d = [ri(1, 5), ri(1, 5), ri(1, 5), ri(1, 5), ri(1, 5)]; if (sum(d) % 2) d[0]++;
      var odd = d.filter(function (x) { return x % 2; }).length;
      return Q('A connected graph has vertices with degrees ' + d.join(', ') + '.', [
        ['Find the number of edges.', 1, sum(d) / 2],
        ['State whether the graph is Eulerian, semi-Eulerian or neither.', 2, odd === 0 ? 'Eulerian' : odd === 2 ? 'Semi-Eulerian' : 'Neither'],
        ['Explain why the number of odd vertices is always even.', 1, 'The sum of degrees is twice the number of edges']
      ]);
    } },
    { d: [1, 2], f: function () {
      var n = 4, m = []; for (var i = 0; i < n; i++) { m.push([]); for (var j = 0; j < n; j++) m[i].push(0); }
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) if (Math.random() < 0.6 || j === i + 1) m[i][j] = m[j][i] = 1;
      var deg = m.map(function (r) { return sum(r); });
      return Q('A graph has adjacency matrix' + table(['', 'A', 'B', 'C', 'D'], m.map(function (r, i) { return [V[i]].concat(r); })), [
        ['List the edges.', 2, (function () { var e = []; for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) if (m[i][j]) e.push(V[i] + V[j]); return e.join(', '); })()],
        ['Find the degree of each vertex.', 1, deg.join(', ')],
        ['Is the graph a tree? Explain.', 1, sum(deg) / 2 === n - 1 ? 'Yes: connected with ' + (n - 1) + ' edges' : 'No: it has ' + sum(deg) / 2 + ' edges, so it contains a cycle']
      ]);
    } },
    { d: [2], f: function () {
      var n = ri(4, 7);
      return Q('Complete graphs.', [
        ['How many edges does ' + M('K_' + n) + ' have?', 1, n * (n - 1) / 2],
        ['For which ' + M('n') + ' is ' + M('K_n') + ' Eulerian?', 2, 'Odd ' + M('n')],
        ['Is ' + M('K_' + n) + ' planar? Explain.', 2, n <= 4 ? 'Yes' : 'No: ' + M('e = ' + n * (n - 1) / 2 + ' > 3v - 6 = ' + (3 * n - 6))]
      ]);
    } },
    { d: [2, 3], f: function () {
      var v = ri(5, 9), e = ri(v, 3 * v - 6);
      return Q('A connected planar graph has ' + v + ' vertices and ' + e + ' edges.', [
        ['Use Euler’s formula to find the number of faces.', 2, e - v + 2],
        ['Explain why a simple planar graph with ' + v + ' vertices has at most ' + (3 * v - 6) + ' edges.', 2, 'Each face has at least 3 edges and each edge borders 2 faces: ' + M('3f \\le 2e')],
        ['Show that ' + M('K_{3,3}') + ' is not planar using ' + M('e \\le 2v - 4') + ' for bipartite graphs.', 2, M('9 > 2(6) - 4 = 8')]
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Terminology.', [
        ['Define a walk, a trail, a path and a cycle.', 4, 'Walk: any sequence of edges; trail: no repeated edges; path: no repeated vertices; cycle: closed path'],
        ['Explain the difference between a subgraph and a spanning tree.', 1, 'A spanning tree is a subgraph that is a tree containing every vertex']
      ]);
    } }
  ] });
  X('d-graphs', [
    function () {
      var n = ri(5, 8);
      return Q('Simple graphs on ' + n + ' vertices.', [
        ['Prove that two vertices must have the same degree.', 3, 'Degrees lie in 0 to ' + (n - 1) + ', but 0 and ' + (n - 1) + ' cannot both occur'],
        ['What is the maximum number of edges?', 1, n * (n - 1) / 2]
      ]);
    },
    function () {
      return Q('Isomorphism.', [
        ['Explain what it means for two graphs to be isomorphic.', 1, 'There is a one-to-one matching of vertices that preserves edges'],
        ['Give two properties that isomorphic graphs must share.', 2, 'Number of vertices and edges; degree sequence'],
        ['Show that equal degree sequences do not guarantee isomorphism.', 2, 'A 6-cycle and two separate triangles both have all degrees 2']
      ]);
    },
    function () {
      var m = ri(3, 5), n = ri(3, 5);
      return Q('Complete bipartite graph ' + M('K_{' + m + ',' + n + '}') + '.', [
        ['How many edges does it have?', 1, m * n],
        ['When is it Eulerian?', 2, 'When both ' + M('m') + ' and ' + M('n') + ' are even'],
        ['Explain why it has no odd cycles.', 1, 'Every edge alternates between the two sets']
      ]);
    },
    function () {
      return Q('The planarity algorithm.', [
        ['Explain how the planarity algorithm uses a Hamiltonian cycle.', 2, 'Draw the cycle as a polygon, then place remaining edges inside or outside so none cross'],
        ['Why can it not be used on every graph?', 1, 'The graph must have a Hamiltonian cycle']
      ]);
    },
    function () {
      var v = ri(6, 10);
      return Q('A tree has ' + v + ' vertices.', [
        ['How many edges does it have?', 1, v - 1],
        ['Prove it has at least two vertices of degree 1.', 2, 'The ends of a longest path have degree 1'],
        ['Find its number of faces when drawn in the plane.', 1, 1]
      ]);
    }
  ]);

  /* ---------------- Algorithms on graphs ---------------- */
  T({ id: 'd-network-algorithms', name: 'Algorithms on graphs: Kruskal, Prim and Dijkstra', video: 'decision maths kruskal prim dijkstra', gens: [
    { d: [1, 2], f: function () {
      var e = graph(5, 0.6), t = kruskal(5, e);
      return Q('A network has arcs ' + elist(e) + '.', [
        ['Use Kruskal’s algorithm to find a minimum spanning tree, listing arcs in order.', 3, t.map(ename).join(', ')],
        ['State its weight.', 1, wt(t)]
      ]);
    } },
    { d: [1, 2], f: function () {
      var e = graph(5, 0.7), t = prim(5, e);
      return Q('Apply Prim’s algorithm, starting at A, to the network ' + elist(e) + '.', [
        ['List the arcs in the order added.', 3, t.map(ename).join(', ')],
        ['State the weight of the tree.', 1, wt(t)],
        ['Explain one advantage of Prim’s algorithm over Kruskal’s.', 1, 'No need to check for cycles; works directly from a matrix']
      ]);
    } },
    { d: [2], f: function () {
      var e = graph(6, 0.5), D = dist(6, e);
      return Q('Use Dijkstra’s algorithm on the network ' + elist(e) + '.', [
        ['Find the shortest distance from A to F.', 4, D[0][5]],
        ['Find the shortest distances from A to every other vertex.', 2, [1, 2, 3, 4, 5].map(function (k) { return V[k] + ' ' + D[0][k]; }).join(', ')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var n = 5, P = []; for (var i = 0; i < n; i++) { P.push([]); for (var j = 0; j < n; j++) P[i].push(0); }
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) P[i][j] = P[j][i] = ri(3, 20);
      var e = []; for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) e.push([i, j, P[i][j]]);
      var t = prim(n, e);
      return Q('Apply Prim’s algorithm to this distance matrix, starting at A.' + table(['', 'A', 'B', 'C', 'D', 'E'], P.map(function (r, i) { return [V[i]].concat(r.map(function (x, j) { return i === j ? '–' : x; })); })), [
        ['List the arcs in the order added.', 3, t.map(ename).join(', ')],
        ['State the weight.', 1, wt(t)]
      ]);
    } },
    { d: [2, 3], f: function () {
      var e = graph(5, 0.6), D = dist(5, e);
      return Q('For the network ' + elist(e) + ':', [
        ['Find the shortest route length from B to E.', 2, D[1][4]],
        ['Explain why Dijkstra’s algorithm gives the shortest distance to every vertex, not just the target.', 1, 'Each vertex receives a permanent label equal to its shortest distance']
      ]);
    } }
  ] });
  X('d-network-algorithms', [
    function () {
      var e = graph(5, 0.6), t = kruskal(5, e), ws = e.map(function (x) { return x[2]; });
      return Q('The network ' + elist(e) + ' must be connected using the least total length.', [
        ['Find the minimum spanning tree weight.', 2, wt(t)],
        ['Is the minimum spanning tree unique? Explain.', 2, new Set(ws).size === ws.length ? 'Yes: all weights differ' : 'Not necessarily: some weights are equal'],
        ['An arc AE must be included. Explain how to adapt Kruskal’s algorithm.', 1, 'Include AE first, then continue']
      ]);
    },
    function () {
      return Q('Floyd’s algorithm.', [
        ['Describe the purpose of Floyd’s algorithm.', 1, 'Finds shortest distances between every pair of vertices'],
        ['Explain the update rule at iteration ' + M('k') + '.', 2, 'Replace ' + M('d(i, j)') + ' by ' + M('d(i, k) + d(k, j)') + ' if smaller'],
        ['Explain the role of the route matrix.', 1, 'Records the next vertex so routes can be reconstructed']
      ]);
    },
    function () {
      var e = graph(5, 0.6), D = dist(5, e);
      return Q('Use the network ' + elist(e) + '.', [
        ['Find the shortest distance between every pair of vertices.', 4, (function () { var r = []; for (var i = 0; i < 5; i++) for (var j = i + 1; j < 5; j++) r.push(V[i] + V[j] + ' ' + D[i][j]); return r.join(', '); })()],
        ['Which vertex is the best place for a depot (smallest maximum distance)?', 2, (function () { var b = 0, bv = 1e9; for (var i = 0; i < 5; i++) { var m = Math.max.apply(null, D[i]); if (m < bv) { bv = m; b = i; } } return V[b] + ' (furthest ' + bv + ')'; })()]
      ]);
    },
    function () {
      return Q('Comparing algorithms.', [
        ['State the order of Prim’s algorithm on a distance matrix with ' + M('n') + ' vertices.', 1, M('n^3') + ' (often stated; with care ' + M('n^2') + ')'],
        ['Why might Kruskal’s be slower for a large complete network?', 1, 'It sorts every arc and checks for cycles'],
        ['Why does Dijkstra’s algorithm fail with negative weights?', 1, 'A permanent label could later need reducing']
      ]);
    },
    function () {
      var e = graph(6, 0.5), t = kruskal(6, e), D = dist(6, e);
      return Q('In the network ' + elist(e) + ':', [
        ['Find the minimum spanning tree weight.', 2, wt(t)],
        ['Find the shortest path from A to F.', 2, D[0][5]],
        ['Explain why the shortest path need not use only minimum spanning tree arcs.', 1, 'The MST minimises total length, not individual routes']
      ]);
    }
  ]);

  /* ---------------- Route inspection ---------------- */
  T({ id: 'd-route', name: 'Route inspection (Chinese postman)', video: 'decision maths route inspection chinese postman', gens: [
    { d: [1, 2], f: function () {
      var w = [ri(3, 12), ri(3, 12), ri(3, 12), ri(3, 12), ri(3, 12)];
      var e = [[0, 1, w[0]], [1, 2, w[1]], [2, 3, w[2]], [3, 0, w[3]], [0, 2, w[4]]], D = dist(4, e), tot = sum(w);
      return Q('Every road in the network AB = ' + w[0] + ', BC = ' + w[1] + ', CD = ' + w[2] + ', DA = ' + w[3] + ', AC = ' + w[4] + ' must be inspected, starting and ending at A.', [
        ['Identify the odd vertices.', 1, 'A and C'],
        ['Find the length of the shortest inspection route.', 3, tot + ' + ' + D[0][2] + ' = ' + (tot + D[0][2])],
        ['State which arcs are repeated.', 1, D[0][2] === w[4] ? 'AC' : 'The shortest route from A to C (via B or D)']
      ]);
    } },
    { d: [2], f: function () {
      var w = [ri(3, 12), ri(3, 12), ri(3, 12), ri(3, 12), ri(3, 12), ri(3, 12)];
      var e = [[0, 1, w[0]], [1, 2, w[1]], [2, 3, w[2]], [3, 0, w[3]], [0, 2, w[4]], [1, 3, w[5]]], D = dist(4, e);
      var pr = [D[0][1] + D[2][3], D[0][2] + D[1][3], D[0][3] + D[1][2]], best = Math.min.apply(null, pr);
      return Q('Network: AB = ' + w[0] + ', BC = ' + w[1] + ', CD = ' + w[2] + ', DA = ' + w[3] + ', AC = ' + w[4] + ', BD = ' + w[5] + '. Find the shortest closed route covering every arc.', [
        ['Explain why all four vertices are odd.', 1, 'Each has degree 3'],
        ['Find the total of each pairing.', 3, 'AB + CD: ' + pr[0] + '; AC + BD: ' + pr[1] + '; AD + BC: ' + pr[2]],
        ['Find the length of the route.', 1, sum(w) + best]
      ]);
    } },
    { d: [2, 3], f: function () {
      var w = [ri(3, 12), ri(3, 12), ri(3, 12), ri(3, 12), ri(3, 12)], tot = sum(w);
      return Q('The network AB = ' + w[0] + ', BC = ' + w[1] + ', CD = ' + w[2] + ', DA = ' + w[3] + ', AC = ' + w[4] + ' must be inspected. The route may start and finish at different vertices.', [
        ['Where should it start and finish?', 2, 'At A and C (the odd vertices)'],
        ['Find its length.', 1, tot]
      ]);
    } },
    { d: [1], f: function () {
      return Q('Eulerian graphs and route inspection.', [
        ['Explain why a route covering every edge exactly once and returning to the start exists only if every vertex is even.', 2, 'Each visit enters and leaves a vertex, using two edges'],
        ['Explain why the extra distance is the shortest path between the two odd vertices when there are two.', 2, 'Repeating those arcs makes every degree even at least cost']
      ]);
    } },
    { d: [2, 3], f: function () {
      var w = [ri(3, 12), ri(3, 12), ri(3, 12), ri(3, 12), ri(3, 12), ri(3, 12)];
      var e = [[0, 1, w[0]], [1, 2, w[1]], [2, 3, w[2]], [3, 0, w[3]], [0, 2, w[4]], [1, 3, w[5]]], D = dist(4, e);
      var opts = [[1, 2, D[1][2]], [1, 3, D[1][3]], [2, 3, D[2][3]]], best = opts.reduce(function (a, b) { return b[2] < a[2] ? b : a; });
      return Q('In the network AB = ' + w[0] + ', BC = ' + w[1] + ', CD = ' + w[2] + ', DA = ' + w[3] + ', AC = ' + w[4] + ', BD = ' + w[5] + ', the route must start at A but may finish anywhere.', [
        ['Explain which pair of odd vertices should be joined.', 3, 'Leave A unpaired (as the start) and choose the finish to minimise the repeat: join ' + V[best[0]] + V[best[1]] + ' (' + best[2] + '), finishing at the remaining vertex'],
        ['Find the route length.', 2, sum(w) + best[2]]
      ]);
    } }
  ] });
  X('d-route', [
    function () {
      var w = [ri(3, 12), ri(3, 12), ri(3, 12), ri(3, 12), ri(3, 12)];
      return Q('A new road of length ' + M('x') + ' is added between A and C in the network AB = ' + w[0] + ', BC = ' + w[1] + ', CD = ' + w[2] + ', DA = ' + w[3] + ', BD = ' + w[4] + '.', [
        ['Identify the odd vertices before the new road.', 1, 'B and D'],
        ['Explain how adding AC changes the odd vertices.', 2, 'A and C also become odd, so all four are odd']
      ]);
    },
    function () {
      return Q('Route inspection with six odd vertices.', [
        ['How many pairings must be considered?', 2, 15],
        ['Explain why.', 1, M('5 \\times 3 \\times 1')]
      ]);
    },
    function () {
      var a = ri(5, 15);
      return Q('A gritter must cover every road in a network of total length ' + a * 10 + ' km. The odd vertices are P and Q, ' + a + ' km apart by the shortest route.', [
        ['Find the minimum distance if it must return to the depot.', 1, a * 11],
        ['A second depot is opened at Q. How does this change the route?', 2, 'Start at P and finish at Q: ' + a * 10 + ' km']
      ]);
    },
    function () {
      return Q('Semi-Eulerian graphs.', [
        ['A graph has exactly two odd vertices. Explain why there is a trail using every edge once.', 2, 'Start at one odd vertex and finish at the other'],
        ['How many edges must be added to make it Eulerian?', 1, 'One (between the odd vertices), or repeat a path']
      ]);
    },
    function () {
      var w = [ri(3, 12), ri(3, 12), ri(3, 12)];
      return Q('A triangle ABC has sides ' + w.join(', ') + ' plus a pendant edge CD = 5.', [
        ['Find the odd vertices.', 1, 'C and D'],
        ['Find the shortest closed inspection route.', 2, sum(w) + 10]
      ]);
    }
  ]);

  /* ---------------- Travelling salesman ---------------- */
  T({ id: 'd-tsp', name: 'The travelling salesman problem', video: 'decision maths travelling salesman upper bound lower bound', gens: [
    { d: [1, 2], f: function () {
      var n = 5, P = []; for (var i = 0; i < n; i++) { P.push([]); for (var j = 0; j < n; j++) P[i].push(0); }
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) P[i][j] = P[j][i] = ri(5, 25);
      var vis = [0], cur = 0, tot = 0; while (vis.length < n) { var b = -1; for (j = 0; j < n; j++) if (vis.indexOf(j) < 0 && (b < 0 || P[cur][j] < P[cur][b])) b = j; tot += P[cur][b]; vis.push(b); cur = b; } tot += P[cur][0];
      return Q('Use the nearest neighbour algorithm, starting at A, on this table.' + table(['', 'A', 'B', 'C', 'D', 'E'], P.map(function (r, i) { return [V[i]].concat(r.map(function (x, j) { return i === j ? '–' : x; })); })), [
        ['Find the tour and its length.', 3, vis.map(function (k) { return V[k]; }).join('') + 'A, ' + tot],
        ['What does this give?', 1, 'An upper bound for the optimal tour']
      ]);
    } },
    { d: [2], f: function () {
      var n = 5, P = []; for (var i = 0; i < n; i++) { P.push([]); for (var j = 0; j < n; j++) P[i].push(0); }
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) P[i][j] = P[j][i] = ri(5, 25);
      var e = []; for (i = 1; i < n; i++) for (j = i + 1; j < n; j++) e.push([i - 1, j - 1, P[i][j]]);
      var mst = wt(kruskal(4, e)), two = P[0].slice(1).sort(function (a, b) { return a - b; });
      return Q('Find a lower bound by deleting A, using this table.' + table(['', 'A', 'B', 'C', 'D', 'E'], P.map(function (r, i) { return [V[i]].concat(r.map(function (x, j) { return i === j ? '–' : x; })); })), [
        ['Find the minimum spanning tree weight of the residual network.', 3, mst],
        ['Find the lower bound.', 2, mst + ' + ' + two[0] + ' + ' + two[1] + ' = ' + (mst + two[0] + two[1])]
      ]);
    } },
    { d: [2, 3], f: function () {
      var e = graph(5, 0.5), D = dist(5, e);
      return Q('A network ' + elist(e) + ' is not complete. Explain how to set up a TSP.', [
        ['Explain the table of least distances.', 2, 'Replace each pair’s distance by the shortest route between them, giving a complete network'],
        ['Find the shortest distance from A to E.', 1, D[0][4]],
        ['Explain the difference between the classical and practical TSP.', 1, 'Classical: each vertex visited exactly once; practical: at least once']
      ]);
    } },
    { d: [1, 2], f: function () {
      var u = ri(60, 80), l = u - ri(5, 15);
      return Q('For a TSP, an upper bound is ' + u + ' and a lower bound is ' + l + '.', [
        ['Write an inequality for the optimal length ' + M('T') + '.', 1, M(l + ' \\le T \\le ' + u)],
        ['A tour of length ' + l + ' is found. What can you conclude?', 1, 'It is optimal'],
        ['Explain why the best upper bound is the smallest and the best lower bound the largest.', 2, 'They narrow the interval containing the optimum']
      ]);
    } },
    { d: [2, 3], f: function () {
      var n = ri(5, 9);
      return Q('Brute force for the TSP.', [
        ['How many distinct tours are there on ' + n + ' vertices of a complete graph?', 2, M('\\frac{(' + n + ' - 1)!}{2} = ' + fact(n - 1) / 2)],
        ['Explain why heuristic algorithms are used.', 1, 'The number of tours grows factorially']
      ]);
    } }
  ] });
  X('d-tsp', [
    function () {
      return Q('The triangle inequality.', [
        ['State the triangle inequality for a network.', 1, M('d(A, C) \\le d(A, B) + d(B, C)')],
        ['Explain why it must hold in a table of least distances.', 1, 'Otherwise the direct distance would not be the least'],
        ['Explain how the nearest neighbour tour may be improved by tour improvement.', 2, 'Swap pairs of arcs if it reduces the total']
      ]);
    },
    function () {
      var n = 5, P = []; for (var i = 0; i < n; i++) { P.push([]); for (var j = 0; j < n; j++) P[i].push(0); }
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) P[i][j] = P[j][i] = ri(5, 25);
      var best = 1e9; [[1, 2, 3, 4], [1, 2, 4, 3], [1, 3, 2, 4], [1, 3, 4, 2], [1, 4, 2, 3], [1, 4, 3, 2], [2, 1, 3, 4], [2, 1, 4, 3], [2, 3, 1, 4], [2, 4, 1, 3], [3, 1, 2, 4], [3, 2, 1, 4]].forEach(function (p) { var r = [0].concat(p).concat([0]), s = 0; for (var k = 0; k < 5; k++) s += P[r[k]][r[k + 1]]; best = Math.min(best, s); });
      return Q('Find the optimal tour by checking all tours.' + table(['', 'A', 'B', 'C', 'D', 'E'], P.map(function (r, i) { return [V[i]].concat(r.map(function (x, j) { return i === j ? '–' : x; })); })), [
        ['How many distinct tours are there?', 1, 12],
        ['Find the optimal length.', 4, best]
      ]);
    },
    function () {
      return Q('Deleting different vertices.', [
        ['Explain why deleting different vertices gives different lower bounds.', 1, 'The residual MSTs and the two added arcs differ'],
        ['Which lower bound is best?', 1, 'The largest']
      ]);
    },
    function () {
      return Q('Nearest neighbour from different starts.', [
        ['Explain why starting from different vertices can give different tours.', 1, 'The greedy choices change'],
        ['Which upper bound is best?', 1, 'The smallest']
      ]);
    },
    function () {
      var n = 6;
      return Q('A delivery driver must visit 6 shops and return.', [
        ['Explain why the problem is a practical TSP.', 1, 'The driver may pass through shops more than once'],
        ['Explain why converting to the classical problem helps.', 1, 'The table of least distances makes the network complete and satisfies the triangle inequality']
      ]);
    }
  ]);

  /* ---------------- Linear programming ---------------- */
  function lpSolve(c, cons) { var pts = [[0, 0]]; cons.forEach(function (k) { pts.push([k[2] / k[0], 0]); pts.push([0, k[2] / k[1]]); }); for (var i = 0; i < cons.length; i++) for (var j = i + 1; j < cons.length; j++) { var a = cons[i], b = cons[j], d = a[0] * b[1] - a[1] * b[0]; if (d) pts.push([(a[2] * b[1] - a[1] * b[2]) / d, (a[0] * b[2] - a[2] * b[0]) / d]); } var ok = pts.filter(function (p) { return p[0] >= -1e-9 && p[1] >= -1e-9 && cons.every(function (k) { return k[0] * p[0] + k[1] * p[1] <= k[2] + 1e-9; }); }); var best = null; ok.forEach(function (p) { var v = c[0] * p[0] + c[1] * p[1]; if (!best || v > best.v + 1e-9) best = { p: p, v: v }; }); return { best: best, verts: ok }; }
  T({ id: 'd-lp', name: 'Linear programming: formulation and graphical solution', video: 'decision maths linear programming graphical method objective line', gens: [
    { d: [1, 2], f: function () {
      var a = ri(2, 4), b = ri(1, 3), c = ri(1, 3), d = ri(2, 4), x0 = ri(3, 8), y0 = ri(3, 8);
      var P = [ri(2, 6), ri(2, 6)], cons = [[a, b, a * x0 + b * y0], [c, d, c * x0 + d * y0]], r = lpSolve(P, cons);
      return Q('Maximise ' + M('P = ' + P[0] + 'x + ' + P[1] + 'y') + ' subject to ' + M(a + 'x + ' + (b === 1 ? '' : b) + 'y \\le ' + cons[0][2]) + ', ' + M((c === 1 ? '' : c) + 'x + ' + d + 'y \\le ' + cons[1][2]) + ', ' + M('x, y \\ge 0') + '.', [
        ['Find the vertices of the feasible region.', 3, r.verts.map(function (p) { return '(' + sf3(p[0]) + ', ' + sf3(p[1]) + ')'; }).filter(function (v, i, A) { return A.indexOf(v) === i; }).join(', ')],
        ['Find the optimal solution.', 2, M('P = ' + sf3(r.best.v)) + ' at ' + M('(' + sf3(r.best.p[0]) + ', ' + sf3(r.best.p[1]) + ')')]
      ]);
    } },
    { d: [1, 2], f: function () {
      var p1 = ri(20, 50), p2 = ri(20, 50), t1 = ri(2, 4), t2 = ri(1, 3), T0 = ri(30, 60), m1 = ri(1, 3), m2 = ri(2, 4), M0 = ri(30, 60);
      return Q('A firm makes chairs (' + M('x') + ') and tables (' + M('y') + '). A chair needs ' + t1 + ' hours of labour and ' + m1 + ' m of wood; a table needs ' + t2 + ' hours and ' + m2 + ' m. There are ' + T0 + ' hours and ' + M0 + ' m available. Profit is £' + p1 + ' per chair and £' + p2 + ' per table.', [
        ['Formulate the problem as a linear programme.', 4, 'Maximise ' + M('P = ' + p1 + 'x + ' + p2 + 'y') + ' subject to ' + M(t1 + 'x + ' + (t2 === 1 ? '' : t2) + 'y \\le ' + T0) + ', ' + M((m1 === 1 ? '' : m1) + 'x + ' + m2 + 'y \\le ' + M0) + ', ' + M('x, y \\ge 0')],
        ['Explain why ' + M('x') + ' and ' + M('y') + ' should be integers.', 1, 'Whole chairs and tables'],
        ['Find the optimal integer solution.', 3, (function () { var b = null; for (var x = 0; x <= 60; x++) for (var y = 0; y <= 60; y++) if (t1 * x + t2 * y <= T0 && m1 * x + m2 * y <= M0) { var v = p1 * x + p2 * y; if (!b || v > b[2]) b = [x, y, v]; } return b[0] + ' chairs, ' + b[1] + ' tables, profit £' + b[2]; })()]
      ]);
    } },
    { d: [2], f: function () {
      var k = ri(2, 5);
      return Q('Objective line method.', [
        ['Explain how an objective line is used to find the optimal vertex.', 2, 'Draw ' + M('P = \\text{constant}') + ' and slide it parallel until it last touches the region'],
        ['For ' + M('P = ' + k + 'x + y') + ', what is the gradient of the objective line?', 1, -k],
        ['When could there be more than one optimal solution?', 1, 'When the objective line is parallel to an edge of the region']
      ]);
    } },
    { d: [2, 3], f: function () {
      var x0 = ri(2, 5), y0 = ri(2, 5);
      var cons = [[1, 1, x0 + y0 + ri(2, 4)], [1, 2, x0 + 2 * y0 + ri(2, 6)]], c = [ri(2, 5), ri(2, 5)];
      return Q('Minimise ' + M('C = ' + c[0] + 'x + ' + c[1] + 'y') + ' subject to ' + M('x + y \\ge ' + cons[0][2]) + ', ' + M('x + 2y \\ge ' + cons[1][2]) + ', ' + M('x, y \\ge 0') + '.', [
        ['Explain why the feasible region is unbounded.', 1, 'Both constraints are “at least”, so large ' + M('x, y') + ' are allowed'],
        ['Find the minimum value of ' + M('C') + '.', 3, (function () { var a = cons[0][2], b = cons[1][2]; var pts = [[0, Math.max(a, b / 2)], [Math.max(a, b), 0], [2 * a - b, b - a]].filter(function (p) { return p[0] >= 0 && p[1] >= 0 && p[0] + p[1] >= a - 1e-9 && p[0] + 2 * p[1] >= b - 1e-9; }); var best = pts.reduce(function (m, p) { var v = c[0] * p[0] + c[1] * p[1]; return v < m.v ? { v: v, p: p } : m; }, { v: 1e9 }); return M('C = ' + sf3(best.v)) + ' at ' + M('(' + sf3(best.p[0]) + ', ' + sf3(best.p[1]) + ')'); })()]
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Formulating constraints in words.', [
        ['“At least twice as many ' + M('x') + ' as ' + M('y') + '.” Write the constraint.', 1, M('x \\ge 2y')],
        ['“' + M('y') + ' is at most 40% of the total.” Write the constraint in the form ' + M('ax + by \\le 0') + '.', 2, M('3y \\le 2x') + ', i.e. ' + M('-2x + 3y \\le 0')],
        ['Why are non-negativity constraints needed?', 1, 'Quantities cannot be negative']
      ]);
    } }
  ] });
  X('d-lp', [
    function () {
      var a = ri(2, 4);
      return Q('Find the range of values of ' + M('k') + ' for which ' + M('P = kx + y') + ' is maximised at ' + M('(4, 3)') + ' in the region with vertices ' + M('(0, 0), (6, 0), (4, 3), (0, 5)') + '.', [
        ['Find the gradients of the edges through ' + M('(4, 3)') + '.', 2, M('-\\frac{3}{2}') + ' and ' + M('-\\frac{1}{2}')],
        ['Find the range of ' + M('k') + '.', 3, M('\\frac{1}{2} \\le k \\le \\frac{3}{2}')]
      ]);
    },
    function () {
      return Q('Integer solutions.', [
        ['The optimal vertex is ' + M('(3.6, 2.4)') + '. Explain how to find the best integer solution.', 2, 'Test nearby integer points inside the region'],
        ['Explain why rounding the vertex may give an infeasible point.', 1, 'Rounding may leave the region']
      ]);
    },
    function () {
      return Q('Slack variables.', [
        ['Rewrite ' + M('3x + 2y \\le 18') + ' using a slack variable.', 1, M('3x + 2y + s = 18,\\ s \\ge 0')],
        ['Interpret ' + M('s') + ' in a context of machine hours.', 1, 'Unused hours']
      ]);
    },
    function () {
      var c1v = ri(2, 4), c2v = ri(2, 4);
      return Q('A diet uses foods ' + M('x') + ' and ' + M('y') + ' (kg). Food X has 2 units of protein and 1 of fat per kg; food Y has 1 of protein and 3 of fat. At least 8 units of protein and 9 of fat are needed. Costs are £' + c1v + ' and £' + c2v + ' per kg.', [
        ['Formulate the problem.', 3, 'Minimise ' + M('C = ' + c1v + 'x + ' + c2v + 'y') + ' subject to ' + M('2x + y \\ge 8') + ', ' + M('x + 3y \\ge 9') + ', ' + M('x, y \\ge 0')],
        ['Find the vertices of the feasible region.', 2, M('(0, 8), (3, 2), (9, 0)')],
        ['Find the minimum cost.', 1, '£' + Math.min(8 * c2v, 3 * c1v + 2 * c2v, 9 * c1v)]
      ]);
    },
    function () {
      return Q('Degenerate and infeasible problems.', [
        ['Give an example of constraints with no feasible region.', 1, M('x + y \\le 2') + ' and ' + M('x + y \\ge 5')],
        ['When is the maximum of an LP unbounded?', 1, 'When the region is unbounded in a direction that increases the objective']
      ]);
    }
  ]);

  /* ---------------- Simplex ---------------- */
  T({ id: 'd-simplex', name: 'The simplex algorithm', video: 'decision maths simplex algorithm tableau', gens: [
    { d: [1, 2], f: function () {
      var r, a1, b1, c1v, a2, b2, c2, p, q;
      do { p = ri(2, 6); q = ri(1, p); a1 = 1; b1 = ri(1, 3); a2 = ri(1, 4); b2 = ri(1, 3); c1v = ri(4, 12); c2 = ri(c1v * a2 + 1, c1v * a2 + 20); } while (c1v / a1 >= c2 / a2);
      var rowP = [-p, -q, 0, 0, 0];
      var row1 = [a1, b1, 1, 0, c1v], row2 = [a2, b2, 0, 1, c2];
      var n2 = row2.map(function (v, i) { return v - a2 * row1[i]; }), nP = rowP.map(function (v, i) { return v + p * row1[i]; });
      var hd = ['Basic', M('x'), M('y'), M('r'), M('s'), 'Value'];
      return Q('Maximise ' + M('P = ' + p + 'x + ' + (q === 1 ? '' : q) + 'y') + ' subject to ' + M('x + ' + (b1 === 1 ? '' : b1) + 'y \\le ' + c1v) + ', ' + M((a2 === 1 ? '' : a2) + 'x + ' + (b2 === 1 ? '' : b2) + 'y \\le ' + c2) + ', ' + M('x, y \\ge 0') + '.', [
        ['Write the initial tableau using slack variables ' + M('r, s') + '.', 3, table(hd, [['r'].concat(row1), ['s'].concat(row2), ['P'].concat(rowP)])],
        ['Choose the pivot, explaining your choice.', 2, 'Column ' + M('x') + ' (most negative in the objective row); ratios ' + c1v + ' and ' + sf3(c2 / a2) + ' → pivot in row ' + M('r') + ' (value 1)'],
        ['Write the tableau after one iteration.', 3, table(hd, [['x'].concat(row1), ['s'].concat(n2), ['P'].concat(nP)])]
      ]);
    } },
    { d: [2], f: function () {
      return Q('Reading a simplex tableau.', [
        ['How do you know a tableau is optimal?', 1, 'No negative entries in the objective row'],
        ['How are the values of the variables read off?', 1, 'Basic variables take the value in the value column; non-basic variables are 0'],
        ['What does a slack variable with a non-zero value mean?', 1, 'That resource is not fully used']
      ]);
    } },
    { d: [2, 3], f: function () {
      var p = ri(2, 5), q = ri(2, 5), a = ri(1, 3), c = ri(6, 15);
      return Q('After some iterations, a tableau has objective row ' + M('P') + ': 0, 0, ' + p + ', ' + q + ' | ' + (p * c + q * a * 2) + '.', [
        ['Explain why this tableau is optimal.', 1, 'All objective row entries are non-negative'],
        ['State the maximum value of ' + M('P') + '.', 1, p * c + q * a * 2],
        ['Explain what the entries ' + p + ' and ' + q + ' under the slack variables tell you.', 2, 'Each extra unit of that resource would increase ' + M('P') + ' by that amount (shadow prices)']
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Formulating for the simplex method.', [
        ['Rewrite: maximise ' + M('P = 3x + 2y + z') + ' subject to ' + M('x + y + z \\le 10') + ' and ' + M('2x + y \\le 8') + ', as equations.', 2, M('x + y + z + r = 10') + ', ' + M('2x + y + s = 8') + ', ' + M('P - 3x - 2y - z = 0')],
        ['Which variable enters first?', 1, M('x') + ' (most negative, −3)'],
        ['Find the pivot row.', 2, 'Ratios 10 and 4: the second row']
      ]);
    } },
    { d: [1], f: function () {
      return Q('Why the simplex method works.', [
        ['Explain the link between a simplex iteration and the graphical method.', 2, 'Each iteration moves from one vertex of the feasible region to an adjacent, better one'],
        ['Why is the smallest positive ratio chosen?', 1, 'To stay in the feasible region (keep all values non-negative)']
      ]);
    } }
  ] });
  X('d-simplex', [
    function () {
      return Q('Two-stage simplex.', [
        ['Explain why a ≥ constraint needs a surplus and an artificial variable.', 2, 'The surplus would make the initial basic value negative; an artificial variable gives a starting solution'],
        ['Explain the aim of the first stage.', 1, 'Minimise the sum of the artificial variables to zero']
      ]);
    },
    function () {
      return Q('Big-M method.', [
        ['Explain how the big-M method handles artificial variables.', 2, 'They are given a large penalty ' + M('M') + ' in the objective so they are driven out'],
        ['What happens if an artificial variable is still positive at the end?', 1, 'There is no feasible solution']
      ]);
    },
    function () {
      var p = ri(2, 5), q = ri(1, 3);
      return Q('Unbounded and degenerate cases.', [
        ['In the pivot column, all entries are 0 or negative. What does this mean?', 1, 'The problem is unbounded'],
        ['Two rows have equal smallest ratios. What can happen?', 1, 'Degeneracy: a basic variable becomes 0 and the algorithm may cycle']
      ]);
    },
    function () {
      return Q('Integer requirements.', [
        ['The simplex method gives ' + M('x = 2.5, y = 3') + '. Explain how to find integer solutions.', 2, 'Test nearby integer points that satisfy the constraints'],
        ['Why might the integer optimum be far from the LP optimum?', 1, 'The nearest integer points may be infeasible or poor']
      ]);
    },
    function () {
      return Q('Minimisation problems.', [
        ['How is minimising ' + M('C') + ' converted for the simplex method?', 1, 'Maximise ' + M('-C')],
        ['Explain why the final value must be negated.', 1, M('\\min C = -\\max(-C)')]
      ]);
    }
  ]);

  /* ---------------- Critical path analysis ---------------- */
  function cpa() {
    var acts = [['A', ri(2, 8), []], ['B', ri(2, 8), []], ['C', ri(2, 8), ['A']], ['D', ri(2, 8), ['A']], ['E', ri(2, 8), ['B', 'C']], ['F', ri(2, 8), ['D']], ['G', ri(2, 8), ['E', 'F']]];
    var es = {}, ef = {};
    acts.forEach(function (a) { es[a[0]] = a[2].length ? Math.max.apply(null, a[2].map(function (p) { return ef[p]; })) : 0; ef[a[0]] = es[a[0]] + a[1]; });
    var end = Math.max.apply(null, acts.map(function (a) { return ef[a[0]]; })), lf = {}, ls = {};
    acts.slice().reverse().forEach(function (a) { var succ = acts.filter(function (b) { return b[2].indexOf(a[0]) >= 0; }); lf[a[0]] = succ.length ? Math.min.apply(null, succ.map(function (b) { return ls[b[0]]; })) : end; ls[a[0]] = lf[a[0]] - a[1]; });
    return { acts: acts, es: es, ef: ef, lf: lf, ls: ls, end: end, crit: acts.filter(function (a) { return lf[a[0]] - es[a[0]] - a[1] === 0; }).map(function (a) { return a[0]; }) };
  }
  function cpaTable(c) { return table(['Activity', 'Duration', 'Immediately preceded by'], c.acts.map(function (a) { return [a[0], a[1], a[2].length ? a[2].join(', ') : '–']; })); }
  T({ id: 'd-cpa', name: 'Critical path analysis', video: 'decision maths critical path analysis activity network float', gens: [
    { d: [1, 2], f: function () {
      var c = cpa();
      return Q('A project has these activities.' + cpaTable(c), [
        ['Find the early start time of each activity.', 3, c.acts.map(function (a) { return a[0] + ' ' + c.es[a[0]]; }).join(', ')],
        ['Find the minimum project duration.', 1, c.end],
        ['Find the critical activities.', 2, c.crit.join(', ')]
      ]);
    } },
    { d: [2], f: function () {
      var c = cpa(), nc = c.acts.filter(function (a) { return c.crit.indexOf(a[0]) < 0; });
      var a = nc.length ? nc[0] : c.acts[0];
      return Q('For this project:' + cpaTable(c), [
        ['Find the late finish time of each activity.', 3, c.acts.map(function (x) { return x[0] + ' ' + c.lf[x[0]]; }).join(', ')],
        ['Find the total float of activity ' + a[0] + '.', 2, c.lf[a[0]] - c.es[a[0]] - a[1]],
        ['Explain what total float means.', 1, 'How long the activity can be delayed without delaying the project']
      ]);
    } },
    { d: [2, 3], f: function () {
      var c = cpa(), tot = sum(c.acts.map(function (a) { return a[1]; }));
      return Q('For this project:' + cpaTable(c), [
        ['Find a lower bound for the number of workers needed to finish in the minimum time.', 2, M('\\lceil\\frac{' + tot + '}{' + c.end + '}\\rceil = ' + Math.ceil(tot / c.end))],
        ['Explain why more workers may still be needed.', 1, 'Precedence constraints may force activities to overlap']
      ]);
    } },
    { d: [1], f: function () {
      return Q('Activity networks.', [
        ['Explain why dummy activities are sometimes needed in an activity-on-arc network.', 2, 'To show dependencies correctly, or so that two activities do not share the same start and end events'],
        ['What is a critical path?', 1, 'A path of activities with zero total float, giving the minimum project duration']
      ]);
    } },
    { d: [2, 3], f: function () {
      var c = cpa(), crit = c.crit;
      var a = crit[crit.length - 1] || 'G';
      return Q('For this project:' + cpaTable(c), [
        ['Activity ' + a + ' is delayed by 2 units. How does the project duration change?', 1, 'It increases by 2, to ' + (c.end + 2)],
        ['A non-critical activity is delayed by less than its float. Effect?', 1, 'None on the project duration']
      ]);
    } }
  ] });
  X('d-cpa', [
    function () {
      var c = cpa();
      return Q('Gantt charts.' + cpaTable(c), [
        ['Explain how a Gantt (cascade) chart shows float.', 2, 'Each activity is drawn from its early start, with float shown as a dashed extension'],
        ['Which activities could be happening at time ' + Math.floor(c.end / 2) + '?', 2, c.acts.filter(function (a) { var t = Math.floor(c.end / 2); return c.es[a[0]] < t + 0.5 && c.lf[a[0]] > t + 0.5; }).map(function (a) { return a[0]; }).join(', ')]
      ]);
    },
    function () {
      return Q('Independent float versus total float.', [
        ['Explain why using the total float of one activity may reduce the float of another.', 2, 'Activities on the same non-critical path share float'],
        ['Why do critical activities have zero float?', 1, 'Any delay delays the project']
      ]);
    },
    function () {
      var c = cpa();
      return Q('Crashing a project.' + cpaTable(c), [
        ['To finish one unit sooner, which activities should be considered for shortening?', 2, 'Critical activities: ' + c.crit.join(', ')],
        ['Why might shortening one critical activity not reduce the duration?', 1, 'Another path may also become critical']
      ]);
    },
    function () {
      return Q('Resource levelling.', [
        ['Explain resource levelling.', 2, 'Rescheduling non-critical activities within their float to smooth the number of workers'],
        ['Why should critical activities not be moved?', 1, 'It would delay the project']
      ]);
    },
    function () {
      var c = cpa();
      return Q('Scheduling with two workers.' + cpaTable(c), [
        ['Explain the rule for choosing which activity a free worker should start.', 2, 'Choose the available activity with the smallest late start (most urgent)'],
        ['Can the project be done in ' + c.end + ' with two workers? Discuss.', 2, Math.ceil(sum(c.acts.map(function (a) { return a[1]; })) / c.end) <= 2 ? 'Possibly: the lower bound is 2; build a schedule to check' : 'No: the lower bound is more than 2']
      ]);
    }
  ]);

  /* ---------------- Reasoning statements ---------------- */
  Cn('d-algorithms', [
    ['T', Sr`A bubble sort pass on \(n\) items makes \(n - 1\) comparisons.`, Sr`Each adjacent pair is compared once.`],
    ['F', Sr`First fit decreasing always gives an optimal packing.`, Sr`It is a heuristic; it is not guaranteed optimal.`],
    ['A', Sr`A binary search requires the list to be ordered.`, Sr`It discards half the list by comparing with the middle.`],
    ['S', Sr`Doubling the size of a problem doubles the run time.`, Sr`Only for linear order; quadratic order quadruples it.`]
  ]);
  Cn('d-graphs', [
    ['T', Sr`The sum of degrees equals twice the number of edges.`, Sr`Each edge has two ends.`],
    ['F', Sr`\(K_5\) is planar.`, Sr`\(10 > 3(5) - 6\).`],
    ['A', Sr`A tree on \(n\) vertices has \(n - 1\) edges.`, Sr`Connected with no cycles.`],
    ['N', Sr`A graph can have exactly three odd vertices.`, Sr`The number of odd vertices is always even.`]
  ]);
  Cn('d-network-algorithms', [
    ['T', Sr`Kruskal’s and Prim’s algorithms give MSTs of the same total weight.`, Sr`Both find a minimum spanning tree.`],
    ['F', Sr`Kruskal’s algorithm always grows a single connected tree.`, Sr`It may build separate pieces that join later.`],
    ['A', Sr`An MST on \(n\) vertices has \(n - 1\) arcs.`, Sr`It is a spanning tree.`]
  ]);
  Cn('d-route', [
    ['T', Sr`If all vertices are even, the route inspection length is the total weight.`, Sr`The network is Eulerian.`],
    ['F', Sr`With four odd vertices, there are four possible pairings.`, Sr`There are three.`],
    ['A', Sr`Repeated arcs make every vertex even.`, Sr`That is the aim of the pairing.`]
  ]);
  Cn('d-tsp', [
    ['T', Sr`The nearest neighbour algorithm gives an upper bound.`, Sr`It gives a valid tour, which may not be optimal.`],
    ['F', Sr`The deleted vertex algorithm gives an upper bound.`, Sr`It gives a lower bound.`],
    ['S', Sr`The best upper bound equals the optimal tour length.`, Sr`Only if the upper and lower bounds coincide can we be sure.`]
  ]);
  Cn('d-lp', [
    ['T', Sr`The optimal value of a linear objective over a bounded convex region occurs at a vertex.`, Sr`The objective line last touches a corner.`],
    ['F', Sr`An LP always has a unique optimal solution.`, Sr`There may be infinitely many along an edge.`],
    ['S', Sr`Rounding the optimal vertex gives the optimal integer solution.`, Sr`It may be infeasible or not the best.`]
  ]);
  Cn('d-simplex', [
    ['T', Sr`The pivot column is the one with the most negative objective-row entry.`, Sr`It increases \(P\) fastest per unit.`],
    ['F', Sr`The pivot row is the one with the largest ratio.`, Sr`It is the smallest non-negative ratio.`],
    ['A', Sr`Slack variables are never negative.`, Sr`They measure unused resources.`]
  ]);
  Cn('d-cpa', [
    ['T', Sr`Critical activities have zero total float.`, Sr`Any delay delays the project.`],
    ['F', Sr`Delaying any activity delays the project.`, Sr`Only if the delay exceeds its float.`],
    ['A', Sr`The project duration is the length of the critical path.`, Sr`The longest path through the network.`]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
