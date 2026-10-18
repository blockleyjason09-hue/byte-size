/* Byte Size — International GCSE (4MA1): graphs topic (3.3) and smaller specification gaps
   (symmetry, estimation, unit conversion, scale drawings, algebraic fractions and proof, quartiles, bar charts). */
(function (g) {
  var BS = g.BS, D = BS.draw;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, sf = BS.sf, dp = BS.dp, num = BS.num, M = BS.m, rad = BS.deg;
  function q1(q, m, a, stem) { return { stem: stem, parts: [{ q: q, m: m, a: a }] }; }
  function add(id, d, f) { BS.topics[id].gens.push({ d: d, f: f }); }
  function roots(fn, a, b) { // numerical roots of fn on [a, b]
    var out = [], n = 2000, prev = fn(a);
    for (var i = 1; i <= n; i++) { var x = a + (b - a) * i / n, v = fn(x); if (prev === 0 || prev * v < 0) { var lo = x - (b - a) / n, hi = x; for (var k = 0; k < 50; k++) { var m = (lo + hi) / 2; if (fn(lo) * fn(m) <= 0) hi = m; else lo = m; } out.push((lo + hi) / 2); } prev = v; }
    return out;
  }
  function list(xs) { return xs.map(function (x) { return M('x = ' + dp(x, 1)); }).join(', '); }

  /* ================= GRAPHS ================= */
  BS.topic({ id: 'graphs', name: 'Graphs: cubic, reciprocal and trigonometric; transformations', video: 'corbettmaths graph transformations', gens: [
    { d: [1, 2], f: function () { // table of values for a quadratic
      var b = nz(-3, 3), c = ri(-4, 3), xs = [-3, -2, -1, 0, 1, 2, 3], ys = xs.map(function (x) { return x * x + b * x + c; });
      var hide = [1, 4, 6], cells = ys.map(function (y, i) { return hide.indexOf(i) > -1 ? '' : y; });
      return { stem: 'Here is a table of values for ' + M('y = ' + poly([1, b, c])) + '.<div class="qtable"><table><tr><th>' + M('x') + '</th>' + xs.map(function (x) { return '<td>' + x + '</td>'; }).join('') + '</tr><tr><th>' + M('y') + '</th>' + cells.map(function (y) { return '<td>' + y + '</td>'; }).join('') + '</tr></table></div>', parts: [
        { q: 'Complete the table of values.', m: 2, a: hide.map(function (i) { return M('x = ' + xs[i]) + ': ' + M('y = ' + ys[i]); }).join('; ') },
        { q: 'Write down the equation of the line of symmetry of the graph of ' + M('y = ' + poly([1, b, c])) + '.', m: 1, a: M('x = ' + frac(-b, 2)) }
      ] };
    } },
    { d: [2, 3], f: function () { // cubic graph: solve f(x) = k
      var r = BS.shuffle([-3, -2, -1, 1, 2, 3]).slice(0, 3).sort(function (a, b) { return a - b; }), s = pick([1, -1]);
      var fn = function (x) { return s * (x - r[0]) * (x - r[1]) * (x - r[2]) / 2; };
      var ymax = 0; for (var x = -3.5; x <= 3.5; x += 0.05) ymax = Math.max(ymax, Math.abs(fn(x)));
      var Y = Math.min(12, Math.ceil(ymax / 2) * 2), k = nz(-2, 2);
      var p = D.plane({ xmin: -4, xmax: 4, ymin: -Y, ymax: Y, w: 320, h: 320, grid: true, gstep: 0.5, gstepy: Y > 8 ? 2 : 1, ticks: true, tstep: 1, tstepy: Y > 8 ? 4 : 2 });
      var eq = 'y = ' + (s > 0 ? '' : '-') + '\\tfrac{1}{2}' + r.map(function (t) { return br(1, -t); }).join('');
      var sol = roots(function (x) { return fn(x) - k; }, -4, 4);
      return { stem: 'The diagram shows the graph of ' + M(eq) + ' for ' + M('-4 \\le x \\le 4') + '.' + D.svg(320, 320, p.svg + p.curve(fn, -4, 4), 'Cubic graph', true), parts: [
        { q: 'Write down the solutions of ' + M(eq.slice(4) + ' = 0') + '.', m: 1, a: M('x = ' + r.join(',\\ ')) },
        { q: 'Use the graph to find estimates for the solutions of ' + M(eq.slice(4) + ' = ' + k) + '.', m: 2, a: list(sol) + ' (accept readings close to these)' }
      ] };
    } },
    { d: [2, 3], f: function () { // reciprocal graph and a line
      var a = pick([2, 3, 4, 6]), m = pick([1, -1]), c = ri(-2, 2);
      var p = D.plane({ xmin: -5, xmax: 5, ymin: -6, ymax: 6, w: 320, h: 320, grid: true, ticks: true, tstep: 1, tstepy: 2 });
      var fn = function (x) { return a / x; }, ln = function (x) { return m * x + c; };
      var sol = roots(function (x) { return x === 0 ? 1 : x * (fn(x) - ln(x)); }, -5, 5).filter(function (x) { return Math.abs(x) > 0.05; });
      if (!sol.length) { m = 1; c = 1; sol = roots(function (x) { return a - x * (x + 1); }, -5, 5); }
      var lineEq = 'y = ' + poly([m, c]);
      return { stem: 'The diagram shows the graph of ' + M('y = \\frac{' + a + '}{x}') + '.' + D.svg(320, 320, p.svg + p.curve(fn, -5, -0.2) + p.curve(fn, 0.2, 5), 'Reciprocal graph', true), parts: [
        { q: 'On the grid, draw the line ' + M(lineEq) + '.', m: 2, a: 'A straight line through ' + M('(0,\\ ' + c + ')') + ' with gradient ' + m + '.' },
        { q: 'Use the graphs to find estimates for the solutions of ' + M('\\frac{' + a + '}{x} = ' + poly([m, c])) + '.', m: 2, a: list(sol) },
        { q: 'Show that these solutions satisfy the equation ' + M(poly([m, c, -a]) + ' = 0') + '.', m: 1, a: 'Multiply both sides by ' + M('x') + ': ' + M(a + ' = ' + poly([m, c, 0])) + ', so ' + M(poly([m, c, -a]) + ' = 0') + '.' }
      ] };
    } },
    { d: [2, 3], f: function () { // trig graphs and exact solutions
      var c = pick([['\\sin', 30, '\\tfrac{1}{2}', [30, 150]], ['\\sin', 45, '\\tfrac{\\sqrt{2}}{2}', [45, 135]], ['\\cos', 60, '\\tfrac{1}{2}', [60, 300]], ['\\cos', 30, '\\tfrac{\\sqrt{3}}{2}', [30, 330]], ['\\sin', 60, '\\tfrac{\\sqrt{3}}{2}', [60, 120]], ['\\tan', 45, '1', [45, 225]], ['\\cos', 120, '-\\tfrac{1}{2}', [120, 240]]]);
      var fn = c[0] === '\\sin' ? function (x) { return Math.sin(rad(x)); } : c[0] === '\\cos' ? function (x) { return Math.cos(rad(x)); } : function (x) { return Math.tan(rad(x)); };
      var isTan = c[0] === '\\tan', p = D.plane({ xmin: 0, xmax: 360, ymin: isTan ? -4 : -1.2, ymax: isTan ? 4 : 1.2, w: 340, h: 240, grid: true, gstep: 30, gstepy: isTan ? 1 : 0.5, ticks: true, tstep: 90, tstepy: isTan ? 2 : 1 });
      var curve = isTan ? p.curve(fn, 0, 88) + p.curve(fn, 92, 268) + p.curve(fn, 272, 360) : p.curve(fn, 0, 360);
      return { stem: 'The diagram shows the graph of ' + M('y = ' + c[0] + ' x') + ' for ' + M('0^\\circ \\le x \\le 360^\\circ') + '.' + D.svg(340, 240, p.svg + curve, 'Trigonometric graph', true), parts: [
        { q: 'Write down the coordinates of the points where the graph crosses the ' + M('x') + '-axis.', m: 1, a: isTan ? M('(0, 0), (180, 0), (360, 0)') : c[0] === '\\sin' ? M('(0, 0), (180, 0), (360, 0)') : M('(90, 0), (270, 0)') },
        { q: 'Given that ' + M(c[0] + ' ' + c[1] + '^\\circ = ' + c[2]) + ', find all the solutions of ' + M(c[0] + ' x = ' + c[2]) + ' for ' + M('0^\\circ \\le x \\le 360^\\circ') + '.', m: 2, a: M('x = ' + c[3][0] + '^\\circ,\\ ' + c[3][1] + '^\\circ') + ' (using the symmetry of the graph)' }
      ] };
    } },
    { d: [3], f: function () { // transformations of a turning point
      var a = nz(-3, 3), b = nz(-4, 4);
      var fn = function (x) { return (x - a) * (x - a) + b; };
      var p = D.plane({ xmin: -6, xmax: 6, ymin: -6, ymax: 8, w: 300, h: 320, grid: true, ticks: true, tstep: 2, tstepy: 2 });
      var tr = BS.shuffle([
        ['y = \\mathrm{f}(x) + ' + 3, [a, b + 3]], ['y = \\mathrm{f}(x) - ' + 2, [a, b - 2]], ['y = \\mathrm{f}(x + ' + 2 + ')', [a - 2, b]], ['y = \\mathrm{f}(x - ' + 3 + ')', [a + 3, b]],
        ['y = -\\mathrm{f}(x)', [a, -b]], ['y = \\mathrm{f}(-x)', [-a, b]], ['y = 2\\mathrm{f}(x)', [a, 2 * b]], ['y = \\mathrm{f}(2x)', [a / 2, b]]
      ]).slice(0, 3);
      return { stem: 'The diagram shows the graph of ' + M('y = \\mathrm{f}(x)') + '. The graph has a minimum point at ' + M('(' + a + ',\\ ' + b + ')') + '.' + D.svg(300, 320, p.svg + p.curve(fn, -6, 6) + D.dot(p.X(a), p.Y(b), 3), 'Graph of y = f(x)', true),
        parts: tr.map(function (t) { return { q: 'Write down the coordinates of the minimum point of the graph of ' + M(t[0]) + '.', m: 1, a: M('(' + num(t[1][0]) + ',\\ ' + num(t[1][1]) + ')') }; }) };
    } },
    { d: [3], f: function () { // describe a translation of a trig graph
      var t = pick([['\\sin x + 2', 'y = \\sin x + 2', 'Translation by ' + M('\\begin{pmatrix} 0 \\\\ 2 \\end{pmatrix}'), function (x) { return Math.sin(rad(x)) + 2; }, function (x) { return Math.sin(rad(x)); }],
        ['\\cos x - 1', 'y = \\cos x - 1', 'Translation by ' + M('\\begin{pmatrix} 0 \\\\ -1 \\end{pmatrix}'), function (x) { return Math.cos(rad(x)) - 1; }, function (x) { return Math.cos(rad(x)); }],
        ['\\sin(x + 90^\\circ)', 'y = \\sin(x + 90^\\circ)', 'Translation by ' + M('\\begin{pmatrix} -90 \\\\ 0 \\end{pmatrix}'), function (x) { return Math.sin(rad(x + 90)); }, function (x) { return Math.sin(rad(x)); }],
        ['2\\cos x', 'y = 2\\cos x', 'The graph is stretched vertically by scale factor 2 (each y-value is doubled).', function (x) { return 2 * Math.cos(rad(x)); }, function (x) { return Math.cos(rad(x)); }]]);
      var base = t[0].indexOf('sin') > -1 ? 'y = \\sin x' : 'y = \\cos x';
      var p = D.plane({ xmin: 0, xmax: 360, ymin: -3, ymax: 3, w: 340, h: 260, grid: true, gstep: 30, gstepy: 0.5, ticks: true, tstep: 90, tstepy: 1 });
      return { stem: 'The diagram shows the graph of ' + M(base) + ' (dashed) and the graph of ' + M('y = \\mathrm{g}(x)') + ' (solid) for ' + M('0^\\circ \\le x \\le 360^\\circ') + '.' + D.svg(340, 260, p.svg + p.curve(t[4], 0, 360, 'curvedash') + p.curve(t[3], 0, 360), 'Two trigonometric graphs', true), parts: [
        { q: 'Write down an equation for ' + M('\\mathrm{g}(x)') + ' in terms of ' + M('x') + '.', m: 1, a: M('\\mathrm{g}(x) = ' + t[0]) },
        { q: 'Describe how the graph of ' + M(base) + ' is transformed to give the graph of ' + M(t[1]) + '.', m: 1, a: t[2] }
      ] };
    } },
    { d: [2, 3], f: function () { // gradient by drawing a tangent
      var b = nz(-3, 1), c = ri(-3, 2), x0 = ri(-1, 3), fn = function (x) { return x * x + b * x + c; };
      var p = D.plane({ xmin: -3, xmax: 5, ymin: -6, ymax: 14, w: 300, h: 340, grid: true, gstepy: 1, ticks: true, tstep: 1, tstepy: 2 });
      return q1('The diagram shows the graph of ' + M('y = ' + poly([1, b, c])) + '.' + D.svg(300, 340, p.svg + p.curve(fn, -3, 5), 'Quadratic graph', true) + 'By drawing a suitable tangent, find an estimate for the gradient of the curve at the point where ' + M('x = ' + x0) + '.', 3,
        M(String(2 * x0 + b)) + ' (accept an estimate close to this from a tangent drawn at ' + M('(' + x0 + ',\\ ' + fn(x0) + ')') + ')');
    } },
    { d: [2, 3], f: function () { // solving with a straight line
      var b = nz(-3, 3), c = ri(-4, 1), m = nz(-2, 2), k = ri(-2, 3);
      var fn = function (x) { return x * x + b * x + c; }, sol = roots(function (x) { return fn(x) - (m * x + k); }, -4, 5);
      if (sol.length < 2) { m = 1; k = 2; sol = roots(function (x) { return fn(x) - (x + 2); }, -4, 5); }
      var p = D.plane({ xmin: -4, xmax: 5, ymin: -8, ymax: 12, w: 320, h: 340, grid: true, gstepy: 1, ticks: true, tstep: 1, tstepy: 2 });
      return q1('The diagram shows the graph of ' + M('y = ' + poly([1, b, c])) + '.' + D.svg(320, 340, p.svg + p.curve(fn, -4, 5), 'Quadratic graph', true) +
        'By drawing a suitable straight line, use the graph to find estimates for the solutions of ' + M(poly([1, b - m, c - k]) + ' = 0') + '.', 3,
        'Draw ' + M('y = ' + poly([m, k])) + ': ' + list(sol) + ' (accept readings close to these)');
    } }
  ] });

  /* ================= SMALLER SPECIFICATION GAPS ================= */
  // 4.3 symmetry
  add('polygons', [1], function () {
    var n = ri(3, 10), names = { 3: 'equilateral triangle', 4: 'square', 5: 'regular pentagon', 6: 'regular hexagon', 7: 'regular heptagon', 8: 'regular octagon', 9: 'regular nonagon', 10: 'regular decagon' };
    var pts = {}, polyN = []; for (var i = 0; i < n; i++) { var k = 'P' + i; pts[k] = D.onCircle(90 + 360 * i / n); polyN.push(k); }
    var fig = D.geo({ pts: pts, polys: [polyN], nolabel: polyN, w: 200, h: 200, scaled: true, label: names[n] });
    return { stem: 'The diagram shows a ' + names[n] + '.' + fig, parts: [
      { q: 'Write down the number of lines of symmetry.', m: 1, a: String(n) },
      { q: 'Write down the order of rotational symmetry.', m: 1, a: String(n) }
    ] };
  });
  add('polygons', [1], function () {
    var s = pick([['parallelogram', 0, 2], ['rhombus', 2, 2], ['rectangle', 2, 2], ['kite', 1, 1], ['isosceles trapezium', 1, 1]]);
    return q1('Write down the number of lines of symmetry and the order of rotational symmetry of a ' + s[0] + '.', 2, s[1] + ' line' + (s[1] === 1 ? '' : 's') + ' of symmetry; order ' + s[2]);
  });
  // 1.10 estimation
  add('bounds', [1, 2], function () {
    var a = ri(21, 89) / 10 * pick([1, 10]), b = ri(11, 49), c = (pick([20, 40, 50]) + ri(-4, 4)) / 100;
    var r1 = function (x) { var p = Math.pow(10, Math.floor(Math.log10(x))); return Math.round(x / p) * p; };
    var est = r1(a) * r1(b) / r1(c);
    return q1('Work out an estimate for the value of ' + M('\\frac{' + num(a) + ' \\times ' + b + '}{' + num(c) + '}') + '. Show your working.', 2,
      M('\\frac{' + num(r1(a)) + ' \\times ' + r1(b) + '}{' + num(r1(c)) + '} = ' + num(Math.round(est * 1000) / 1000)));
  });
  add('bounds', [1], function () {
    var x = ri(100000, 9999999) / 1000, n = ri(1, 3), d = ri(1, 2);
    return { parts: [
      { q: 'Write ' + num(x) + ' correct to ' + n + ' significant figure' + (n > 1 ? 's' : '') + '.', m: 1, a: num(Number(sf(x, n))) },
      { q: 'Write ' + num(x) + ' correct to ' + d + ' decimal place' + (d > 1 ? 's' : '') + '.', m: 1, a: x.toFixed(d).replace(/^(\d+)/, function (w) { return w.replace(/\B(?=(\d{3})+$)/g, ','); }) }
    ] };
  });
  // 4.9 / 4.10 unit conversions
  add('compound-measures', [1, 2], function () {
    var t = pick([['m²', 'cm²', 10000, ri(2, 90) / 10], ['cm²', 'mm²', 100, ri(3, 80)], ['m³', 'cm³', 1000000, ri(2, 40) / 10], ['litres', 'cm³', 1000, ri(15, 95) / 10]]);
    return q1('Change ' + num(t[3]) + ' ' + t[0] + ' into ' + t[1] + '.', 1, num(Math.round(t[3] * t[2])) + ' ' + t[1]);
  });
  add('compound-measures', [2], function () {
    var l = ri(20, 80), w = ri(10, 50), h = ri(10, 40), V = l * w * h;
    return q1('A tank in the shape of a cuboid measures ' + l + ' cm by ' + w + ' cm by ' + h + ' cm. It is full of water. Work out how many litres of water the tank holds.', 2, M(l + ' \\times ' + w + ' \\times ' + h + ' = ' + num(V)) + ' cm³ ' + M('= ' + num(V / 1000)) + ' litres');
  });
  // 1.7 / 4.11 maps and scale drawings
  add('ratio', [1, 2], function () {
    var sc = pick([25000, 50000, 20000, 100000]), cm = ri(3, 18) + pick([0, 0.5]), real = cm * sc / 100000;
    return { parts: [
      { q: 'A map has a scale of 1 : ' + num(sc) + '. Two towns are ' + num(cm) + ' cm apart on the map. Work out the real distance between the towns, in kilometres.', m: 2, a: M(num(cm) + ' \\times ' + num(sc) + ' = ' + num(cm * sc)) + ' cm ' + M('= ' + num(real)) + ' km' },
      { q: 'A lake is ' + num(Math.round(real * 0.6 * 10) / 10) + ' km long. How long is the lake on the map, in centimetres?', m: 2, a: num(Math.round(real * 0.6 * 10) / 10 * 100000 / sc) + ' cm' }
    ] };
  });
  // 2.2 algebraic fractions and proof
  add('expand-factorise', [3], function () {
    var a = ri(2, 5), b = nz(-5, 5), c = ri(1, 5), d = nz(-5, 5); while (b === d) d = nz(-5, 5);
    var num_ = poly([a + c, a * d + c * b]);
    return q1('Write ' + M('\\frac{' + a + '}{' + poly([1, b]) + '} + \\frac{' + c + '}{' + poly([1, d]) + '}') + ' as a single fraction in its simplest form.', 3,
      M('\\frac{' + (a === 1 ? '' : a) + br(1, d) + ' + ' + (c === 1 ? '' : c) + br(1, b) + '}{' + br(1, b) + br(1, d) + '} = \\frac{' + num_ + '}{' + br(1, b) + br(1, d) + '}'));
  });
  add('expand-factorise', [3], function () {
    var t = pick([
      ['Prove that the sum of any three consecutive integers is a multiple of 3.', M('n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)') + ', which is a multiple of 3.'],
      ['Prove that the difference between the squares of two consecutive odd numbers is a multiple of 8.', M('(2n + 1)^2 - (2n - 1)^2 = 8n') + ', which is a multiple of 8.'],
      ['Prove that ' + M('(n + 3)^2 - (n - 3)^2') + ' is a multiple of 12 for all integer values of ' + M('n') + '.', M('(n^2 + 6n + 9) - (n^2 - 6n + 9) = 12n') + ', a multiple of 12.'],
      ['Prove that the sum of the squares of two consecutive integers is always odd.', M('n^2 + (n + 1)^2 = 2n^2 + 2n + 1 = 2(n^2 + n) + 1') + ', which is one more than an even number, so it is odd.'],
      ['Prove that ' + M('(2n + 3)^2 - (2n - 1)^2') + ' is a multiple of 8 for all positive integers ' + M('n') + '.', M('(4n^2 + 12n + 9) - (4n^2 - 4n + 1) = 16n + 8 = 8(2n + 1)') + ', a multiple of 8.']
    ]);
    return q1(t[0], 3, t[1]);
  });
  // 6.2 quartiles for discrete data
  add('averages', [2, 3], function () {
    var n = pick([11, 15, 19]), xs = []; for (var i = 0; i < n; i++) xs.push(ri(10, 60)); xs.sort(function (a, b) { return a - b; });
    var q1v = xs[(n + 1) / 4 - 1], q3v = xs[3 * (n + 1) / 4 - 1];
    return q1('Here are the ages, in years, of ' + n + ' people in a choir, written in order.<br>' + M(xs.join(',\\ ')) + '<br>Work out the interquartile range of the ages.', 2,
      'Lower quartile ' + M('= ' + q1v) + ' (the ' + ((n + 1) / 4) + 'th value), upper quartile ' + M('= ' + q3v) + ' (the ' + (3 * (n + 1) / 4) + 'th value); IQR ' + M('= ' + (q3v - q1v)) + ' years');
  });
  // 6.1 bar charts
  add('stats-diagrams', [1], function () {
    var cats = pick([['Bus', 'Car', 'Walk', 'Cycle'], ['Red', 'Blue', 'Green', 'Yellow'], ['Mon', 'Tue', 'Wed', 'Thu']]), f = cats.map(function () { return ri(2, 14); });
    var p = D.plane({ xmin: 0, xmax: 4.5, ymin: 0, ymax: 16, w: 320, h: 250, pad: 36, grid: true, gstep: 10, gstepy: 1, ticks: false, xl: '', yl: 'Frequency' });
    var s = p.svg; for (var y = 2; y <= 16; y += 2) s += D.text(p.X(0) - 6, p.Y(y), y, { anchor: 'end', size: 11 });
    f.forEach(function (v, i) { s += D.poly([[p.X(i + 0.25), p.Y(0)], [p.X(i + 0.25), p.Y(v)], [p.X(i + 0.85), p.Y(v)], [p.X(i + 0.85), p.Y(0)]], 'bar') + D.text(p.X(i + 0.55), p.Y(0) + 13, cats[i], { anchor: 'middle', size: 11 }); });
    var tot = f.reduce(function (a, b) { return a + b; }, 0), mx = f.indexOf(Math.max.apply(null, f));
    return { stem: 'The bar chart shows information about some students.' + D.svg(320, 256, s, 'Bar chart', true), parts: [
      { q: 'How many students are shown altogether?', m: 1, a: String(tot) },
      { q: 'What fraction of the students chose ' + cats[0] + '? Give your answer in its simplest form.', m: 1, a: M(frac(f[0], tot)) },
      { q: 'Write down the mode.', m: 1, a: f.filter(function (v) { return v === f[mx]; }).length > 1 ? 'There is more than one mode: ' + cats.filter(function (c, i) { return f[i] === f[mx]; }).join(' and ') : cats[mx] }
    ] };
  });
})(typeof window !== 'undefined' ? window : globalThis);
