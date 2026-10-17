/* Byte Size diagram library: small SVG figures for exam questions.
   All colours come from CSS (class "dg"), so diagrams follow light and dark themes. */
(function (g) {
  var BS = g.BS;
  var D = BS.draw = {};
  function f2(x) { return Math.round(x * 10) / 10; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  D.svg = function (w, h, inner, label, scaled) {
    return '<figure class="diagram"><svg class="dg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" role="img" aria-label="' + esc(label || 'Diagram') + '">' + inner + '</svg>' +
      (scaled ? '' : '<figcaption>Diagram not to scale</figcaption>') + '</figure>';
  };
  D.text = function (x, y, s, opt) {
    opt = opt || {};
    return '<text x="' + f2(x) + '" y="' + f2(y) + '"' + (opt.anchor ? ' text-anchor="' + opt.anchor + '"' : '') +
      (opt.cls ? ' class="' + opt.cls + '"' : '') + (opt.size ? ' font-size="' + opt.size + '"' : '') + ' dominant-baseline="middle">' + esc(s) + '</text>';
  };
  D.line = function (x1, y1, x2, y2, cls) { return '<line x1="' + f2(x1) + '" y1="' + f2(y1) + '" x2="' + f2(x2) + '" y2="' + f2(y2) + '" class="' + (cls || 'ln') + '"/>'; };
  D.dot = function (x, y, r) { return '<circle cx="' + f2(x) + '" cy="' + f2(y) + '" r="' + (r || 3.5) + '" class="pt"/>'; };
  D.poly = function (pts, cls) { return '<polygon points="' + pts.map(function (p) { return f2(p[0]) + ',' + f2(p[1]); }).join(' ') + '" class="' + (cls || 'shape') + '"/>'; };
  D.path = function (d, cls) { return '<path d="' + d + '" class="' + (cls || 'curve') + '"/>'; };
  D.arrowDefs = '<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ahead"/></marker>' +
    '<marker id="ahs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="aheads"/></marker></defs>';
  D.arrow = function (x1, y1, x2, y2, cls) { return '<line x1="' + f2(x1) + '" y1="' + f2(y1) + '" x2="' + f2(x2) + '" y2="' + f2(y2) + '" class="' + (cls || 'ln') + '" marker-end="url(#ah)"/>'; };

  /* Coordinate plane. o = {xmin,xmax,ymin,ymax,w,h,grid,ticks} */
  D.plane = function (o) {
    var w = o.w || 340, h = o.h || 260, pad = o.pad || 26;
    var X = function (x) { return pad + (x - o.xmin) / (o.xmax - o.xmin) * (w - 2 * pad); };
    var Y = function (y) { return h - pad - (y - o.ymin) / (o.ymax - o.ymin) * (h - 2 * pad); };
    var s = D.arrowDefs;
    if (o.grid) {
      for (var gx = Math.ceil(o.xmin); gx <= o.xmax; gx += (o.gstep || 1)) s += D.line(X(gx), Y(o.ymin), X(gx), Y(o.ymax), 'grid');
      for (var gy = Math.ceil(o.ymin); gy <= o.ymax; gy += (o.gstep || 1)) s += D.line(X(o.xmin), Y(gy), X(o.xmax), Y(gy), 'grid');
    }
    var ox = Math.min(Math.max(0, o.xmin), o.xmax), oy = Math.min(Math.max(0, o.ymin), o.ymax);
    s += D.arrow(X(o.xmin), Y(oy), X(o.xmax) + 8, Y(oy), 'ax') + D.arrow(X(ox), Y(o.ymin), X(ox), Y(o.ymax) - 8, 'ax');
    s += D.text(X(o.xmax) + 12, Y(oy) - 10, o.xl || 'x', { cls: 'it' }) + D.text(X(ox) + 12, Y(o.ymax) - 6, o.yl || 'y', { cls: 'it' });
    if (o.xmin <= 0 && o.ymin <= 0) s += D.text(X(0) - 9, Y(0) + 10, 'O', { anchor: 'middle', size: 12 });
    if (o.ticks) {
      var st = o.tstep || 1;
      for (var tx = Math.ceil(o.xmin / st) * st; tx <= o.xmax; tx += st) if (tx !== 0) s += D.line(X(tx), Y(oy) - 3, X(tx), Y(oy) + 3, 'ax') + D.text(X(tx), Y(oy) + 13, tx, { anchor: 'middle', size: 11 });
      var sty = o.tstepy || st;
      for (var ty = Math.ceil(o.ymin / sty) * sty; ty <= o.ymax; ty += sty) if (ty !== 0) s += D.line(X(ox) - 3, Y(ty), X(ox) + 3, Y(ty), 'ax') + D.text(X(ox) - 6, Y(ty), ty, { anchor: 'end', size: 11 });
    }
    return { X: X, Y: Y, w: w, h: h, svg: s,
      curve: function (fn, a, b, cls, n) {
        n = n || 160; var d = '', pen = false;
        for (var i = 0; i <= n; i++) {
          var x = a + (b - a) * i / n, y = fn(x);
          if (!isFinite(y) || y < o.ymin - 0.01 * (o.ymax - o.ymin) || y > o.ymax + 0.01 * (o.ymax - o.ymin)) { pen = false; continue; }
          d += (pen ? 'L' : 'M') + f2(X(x)) + ',' + f2(Y(y)); pen = true;
        }
        return D.path(d, cls || 'curve');
      },
      area: function (fn, a, b, base, n) { // shaded region between fn and base (function or number)
        n = n || 80; var bf = typeof base === 'function' ? base : function () { return base || 0; };
        var d = 'M' + f2(X(a)) + ',' + f2(Y(bf(a)));
        for (var i = 0; i <= n; i++) { var x = a + (b - a) * i / n; d += 'L' + f2(X(x)) + ',' + f2(Y(Math.max(o.ymin, Math.min(o.ymax, fn(x))))); }
        for (var j = n; j >= 0; j--) { var x2 = a + (b - a) * j / n; d += 'L' + f2(X(x2)) + ',' + f2(Y(bf(x2))); }
        return D.path(d + 'Z', 'shade');
      }
    };
  };

  /* Triangle from three side lengths (or vertices). labels: {A,B,C, a,b,c (side labels opposite), angA...} */
  D.triangle = function (P, lab, w, h) {
    w = w || 320; h = h || 220; var pad = 34;
    var xs = P.map(function (p) { return p[0]; }), ys = P.map(function (p) { return p[1]; });
    var minx = Math.min.apply(null, xs), maxx = Math.max.apply(null, xs), miny = Math.min.apply(null, ys), maxy = Math.max.apply(null, ys);
    var sc = Math.min((w - 2 * pad) / (maxx - minx || 1), (h - 2 * pad) / (maxy - miny || 1));
    var Q = P.map(function (p) { return [pad + (p[0] - minx) * sc + ((w - 2 * pad) - (maxx - minx) * sc) / 2, h - pad - (p[1] - miny) * sc]; });
    var cx = (Q[0][0] + Q[1][0] + Q[2][0]) / 3, cy = (Q[0][1] + Q[1][1] + Q[2][1]) / 3;
    var s = D.poly(Q, 'shape');
    var names = lab.names || ['A', 'B', 'C'];
    Q.forEach(function (q, i) {
      var dx = q[0] - cx, dy = q[1] - cy, L = Math.hypot(dx, dy) || 1;
      s += D.text(q[0] + dx / L * 16, q[1] + dy / L * 16, names[i], { anchor: 'middle', cls: 'it' });
      if (lab.ang && lab.ang[i]) {
        // angle label nudged inside the vertex
        s += D.text(q[0] - dx / L * 30, q[1] - dy / L * 30, lab.ang[i], { anchor: 'middle', size: 12 });
      }
    });
    if (lab.right !== undefined) {
      var i0 = lab.right, A = Q[i0], B = Q[(i0 + 1) % 3], C = Q[(i0 + 2) % 3];
      var u = [(B[0] - A[0]), (B[1] - A[1])], v = [(C[0] - A[0]), (C[1] - A[1])];
      var lu = Math.hypot(u[0], u[1]), lv = Math.hypot(v[0], v[1]); u = [u[0] / lu * 11, u[1] / lu * 11]; v = [v[0] / lv * 11, v[1] / lv * 11];
      s += D.path('M' + f2(A[0] + u[0]) + ',' + f2(A[1] + u[1]) + 'L' + f2(A[0] + u[0] + v[0]) + ',' + f2(A[1] + u[1] + v[1]) + 'L' + f2(A[0] + v[0]) + ',' + f2(A[1] + v[1]), 'thin');
    }
    if (lab.sides) { // sides[i] labels side from vertex i to i+1
      lab.sides.forEach(function (t, i) {
        if (!t) return;
        var A = Q[i], B = Q[(i + 1) % 3], mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
        var dx = mx - cx, dy = my - cy, L = Math.hypot(dx, dy) || 1;
        s += D.text(mx + dx / L * 16, my + dy / L * 14, t, { anchor: 'middle', size: 12 });
      });
    }
    return D.svg(w, h, s, 'Triangle ' + names.join(''));
  };

  /* Bearings: list of points [{x,y,name}] in km (north = +y), path through them, north lines at given point names */
  D.bearings = function (pts, northAt, extra) {
    var w = 320, h = 260, pad = 36;
    var xs = pts.map(function (p) { return p.x; }), ys = pts.map(function (p) { return p.y; });
    var minx = Math.min.apply(null, xs), maxx = Math.max.apply(null, xs), miny = Math.min.apply(null, ys), maxy = Math.max.apply(null, ys);
    var sc = Math.min((w - 2 * pad) / (maxx - minx || 1), (h - 2 * pad - 30) / (maxy - miny || 1));
    var T = function (p) { return [pad + (p.x - minx) * sc + ((w - 2 * pad) - (maxx - minx) * sc) / 2, h - pad - (p.y - miny) * sc]; };
    var s = D.arrowDefs, Q = pts.map(T);
    for (var i = 0; i < Q.length - 1; i++) s += D.line(Q[i][0], Q[i][1], Q[i + 1][0], Q[i + 1][1], 'ln');
    if (extra) s += D.line(Q[0][0], Q[0][1], Q[Q.length - 1][0], Q[Q.length - 1][1], 'dash');
    Q.forEach(function (q, k) {
      s += D.dot(q[0], q[1]) + D.text(q[0] + 10, q[1] + 12, pts[k].name, { cls: 'it' });
      if (northAt.indexOf(pts[k].name) > -1) s += D.arrow(q[0], q[1], q[0], q[1] - 44, 'thin') + D.text(q[0], q[1] - 52, 'N', { anchor: 'middle', size: 12 });
    });
    return D.svg(w, h, s, 'Bearings diagram');
  };

  /* Voronoi diagram for integer sites inside box [0,W]x[0,H] */
  function clip(poly, a, b, c) { // keep a*x + b*y <= c
    var out = [];
    for (var i = 0; i < poly.length; i++) {
      var P = poly[i], Qp = poly[(i + 1) % poly.length];
      var fp = a * P[0] + b * P[1] - c, fq = a * Qp[0] + b * Qp[1] - c;
      if (fp <= 1e-9) out.push(P);
      if ((fp < -1e-9 && fq > 1e-9) || (fp > 1e-9 && fq < -1e-9)) { var t = fp / (fp - fq); out.push([P[0] + t * (Qp[0] - P[0]), P[1] + t * (Qp[1] - P[1])]); }
    }
    return out;
  }
  D.voronoiCells = function (sites, W, H) {
    return sites.map(function (s, i) {
      var cell = [[0, 0], [W, 0], [W, H], [0, H]];
      sites.forEach(function (t, j) {
        if (i === j) return;
        // points closer to s than t: 2(t-s).p <= |t|^2 - |s|^2
        cell = clip(cell, 2 * (t[0] - s[0]), 2 * (t[1] - s[1]), t[0] * t[0] + t[1] * t[1] - s[0] * s[0] - s[1] * s[1]);
      });
      return cell;
    });
  };
  D.voronoi = function (sites, names, W, H, extraPts) {
    var p = D.plane({ xmin: 0, xmax: W, ymin: 0, ymax: H, w: 320, h: 300, grid: true, ticks: true, tstep: 2 });
    var s = p.svg, cells = D.voronoiCells(sites, W, H);
    cells.forEach(function (c) { if (c.length > 2) s += D.poly(c.map(function (q) { return [p.X(q[0]), p.Y(q[1])]; }), 'cell'); });
    sites.forEach(function (q, i) { s += D.dot(p.X(q[0]), p.Y(q[1])) + D.text(p.X(q[0]) + 8, p.Y(q[1]) - 9, names[i], { cls: 'it' }); });
    (extraPts || []).forEach(function (q) { s += '<circle cx="' + f2(p.X(q[0])) + '" cy="' + f2(p.Y(q[1])) + '" r="4" class="hollow"/>' + D.text(p.X(q[0]) + 8, p.Y(q[1]) - 9, q[2], { cls: 'it' }); });
    return D.svg(320, 300, s, 'Voronoi diagram', true);
  };

  /* Network graph. nodes: [{n,x,y}] in unit box, edges: [[i,j,w]] (w optional), directed optional */
  D.network = function (nodes, edges, opt) {
    opt = opt || {};
    var w = 320, h = 250, pad = 30;
    var P = nodes.map(function (q) { return [pad + q.x * (w - 2 * pad), pad + q.y * (h - 2 * pad)]; });
    var s = D.arrowDefs;
    edges.forEach(function (e) {
      var A = P[e[0]], B = P[e[1]];
      if (e[0] === e[1]) { s += '<circle cx="' + f2(A[0]) + '" cy="' + f2(A[1] - 18) + '" r="12" class="thin"/>'; return; }
      s += D.line(A[0], A[1], B[0], B[1], 'ln');
      if (e[2] !== undefined) {
        var mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
        s += '<rect x="' + f2(mx - 11) + '" y="' + f2(my - 9) + '" width="22" height="18" rx="4" class="wlab"/>' + D.text(mx, my + 1, e[2], { anchor: 'middle', size: 12 });
      }
    });
    P.forEach(function (q, i) { s += '<circle cx="' + f2(q[0]) + '" cy="' + f2(q[1]) + '" r="13" class="node"/>' + D.text(q[0], q[1] + 1, nodes[i].n, { anchor: 'middle', size: 13, cls: 'nodet' }); });
    return D.svg(w, h, s, 'Network graph');
  };

  /* Two-set Venn diagram with region counts [onlyA, both, onlyB, neither] */
  D.venn = function (c, names) {
    var w = 320, h = 200, s = '<rect x="10" y="10" width="300" height="180" rx="6" class="thin"/>';
    s += '<circle cx="125" cy="100" r="62" class="setA"/><circle cx="195" cy="100" r="62" class="setB"/>';
    s += D.text(80, 36, names[0], { anchor: 'middle', cls: 'it' }) + D.text(240, 36, names[1], { anchor: 'middle', cls: 'it' }) + D.text(296, 176, 'U', { anchor: 'end', cls: 'it' });
    s += D.text(100, 100, c[0], { anchor: 'middle' }) + D.text(160, 100, c[1], { anchor: 'middle' }) + D.text(220, 100, c[2], { anchor: 'middle' }) + D.text(40, 170, c[3], { anchor: 'middle' });
    return D.svg(w, h, s, 'Venn diagram');
  };

  /* Two-stage tree diagram. p1 = P(A) on first branch; p2a = P(B|A), p2b = P(B|A'). labels as strings */
  D.tree = function (lab) {
    var w = 340, h = 230, s = '';
    var O = [20, 115], A = [140, 60], Ac = [140, 170];
    var ends = [[280, 30], [280, 90], [280, 140], [280, 200]];
    s += D.line(O[0], O[1], A[0], A[1]) + D.line(O[0], O[1], Ac[0], Ac[1]);
    s += D.line(A[0] + 22, A[1], ends[0][0], ends[0][1]) + D.line(A[0] + 22, A[1], ends[1][0], ends[1][1]) + D.line(Ac[0] + 22, Ac[1], ends[2][0], ends[2][1]) + D.line(Ac[0] + 22, Ac[1], ends[3][0], ends[3][1]);
    s += D.text(A[0] + 12, A[1], lab.A, { anchor: 'middle', cls: 'it' }) + D.text(Ac[0] + 12, Ac[1], lab.Ac, { anchor: 'middle', cls: 'it' });
    s += D.text(ends[0][0] + 14, ends[0][1], lab.B, { cls: 'it' }) + D.text(ends[1][0] + 14, ends[1][1], lab.Bc, { cls: 'it' }) + D.text(ends[2][0] + 14, ends[2][1], lab.B, { cls: 'it' }) + D.text(ends[3][0] + 14, ends[3][1], lab.Bc, { cls: 'it' });
    s += D.text(66, 76, lab.p[0], { anchor: 'middle', size: 12 }) + D.text(66, 156, lab.p[1], { anchor: 'middle', size: 12 });
    s += D.text(214, 34, lab.p[2], { anchor: 'middle', size: 12 }) + D.text(214, 86, lab.p[3], { anchor: 'middle', size: 12 }) + D.text(214, 144, lab.p[4], { anchor: 'middle', size: 12 }) + D.text(214, 196, lab.p[5], { anchor: 'middle', size: 12 });
    return D.svg(w, h, s, 'Tree diagram');
  };

  /* Box plot on a number line */
  D.boxplot = function (five, lo, hi, step, label) {
    var w = 340, h = 130, pad = 26;
    var X = function (v) { return pad + (v - lo) / (hi - lo) * (w - 2 * pad); };
    var s = D.line(X(lo), 96, X(hi), 96, 'ax');
    for (var t = lo; t <= hi + 1e-9; t += step) s += D.line(X(t), 92, X(t), 100, 'ax') + D.text(X(t), 112, t, { anchor: 'middle', size: 11 });
    var y = 50;
    s += D.line(X(five[0]), y, X(five[1]), y) + D.line(X(five[3]), y, X(five[4]), y);
    s += D.line(X(five[0]), y - 10, X(five[0]), y + 10) + D.line(X(five[4]), y - 10, X(five[4]), y + 10);
    s += '<rect x="' + f2(X(five[1])) + '" y="' + (y - 20) + '" width="' + f2(X(five[3]) - X(five[1])) + '" height="40" class="box"/>';
    s += D.line(X(five[2]), y - 20, X(five[2]), y + 20, 'ln');
    s += D.text(w / 2, 132, label || '', { anchor: 'middle', size: 12 });
    return D.svg(w, h + 14, s, 'Box plot', true);
  };

  /* Normal curve with shaded region between a and b (use null for -inf / +inf) */
  D.normal = function (mu, sd, a, b, labels) {
    var p = D.plane({ xmin: mu - 3.6 * sd, xmax: mu + 3.6 * sd, ymin: 0, ymax: 1.12, w: 340, h: 180, pad: 20 });
    var phi = function (x) { return Math.exp(-0.5 * Math.pow((x - mu) / sd, 2)); };
    var lo = a === null ? mu - 3.6 * sd : a, hi = b === null ? mu + 3.6 * sd : b;
    var s = p.area(phi, lo, hi, 0) + p.curve(phi, mu - 3.6 * sd, mu + 3.6 * sd);
    s += D.line(p.X(mu - 3.6 * sd), p.Y(0), p.X(mu + 3.6 * sd), p.Y(0), 'ax');
    s += D.line(p.X(mu), p.Y(0), p.X(mu), p.Y(1), 'dash') + D.text(p.X(mu), p.Y(0) + 12, labels.mu, { anchor: 'middle', size: 11 });
    if (a !== null) s += D.text(p.X(a), p.Y(0) + 12, labels.a, { anchor: 'middle', size: 11 });
    if (b !== null) s += D.text(p.X(b), p.Y(0) + 12, labels.b, { anchor: 'middle', size: 11 });
    return D.svg(340, 196, s, 'Normal distribution curve', true);
  };

  /* Argand diagram with points [{re,im,name}] */
  D.argand = function (pts) {
    var m = 1; pts.forEach(function (q) { m = Math.max(m, Math.abs(q.re), Math.abs(q.im)); }); m = Math.ceil(m + 1);
    var p = D.plane({ xmin: -m, xmax: m, ymin: -m, ymax: m, w: 280, h: 280, grid: true, ticks: true, tstep: m > 6 ? 2 : 1, xl: 'Re', yl: 'Im' });
    var s = p.svg;
    pts.forEach(function (q) { s += D.line(p.X(0), p.Y(0), p.X(q.re), p.Y(q.im), 'dash') + D.dot(p.X(q.re), p.Y(q.im)) + D.text(p.X(q.re) + 8, p.Y(q.im) - 10, q.name, { cls: 'it' }); });
    return D.svg(280, 280, s, 'Argand diagram', true);
  };

  /* Slope field for dy/dx = f(x,y) */
  D.slopeField = function (f, xmin, xmax, ymin, ymax) {
    var p = D.plane({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, w: 300, h: 300, ticks: true });
    var s = p.svg, L = 7;
    for (var x = xmin; x <= xmax; x++) for (var y = ymin; y <= ymax; y++) {
      var m = f(x, y), dx = 1 / Math.sqrt(1 + m * m), dy = m * dx;
      var sx = (p.X(1) - p.X(0)), sy = (p.Y(0) - p.Y(1));
      var ux = dx * sx, uy = dy * sy, n = Math.hypot(ux, uy); ux = ux / n * L; uy = uy / n * L;
      s += D.line(p.X(x) - ux, p.Y(y) + uy, p.X(x) + ux, p.Y(y) - uy, 'seg');
    }
    return D.svg(300, 300, s, 'Slope field', true);
  };

  /* Phase portrait arrows for x' = a x + b y, y' = c x + d y */
  D.phase = function (A) {
    var p = D.plane({ xmin: -4, xmax: 4, ymin: -4, ymax: 4, w: 300, h: 300 });
    var s = p.svg;
    for (var x = -3; x <= 3; x++) for (var y = -3; y <= 3; y++) {
      if (x === 0 && y === 0) continue;
      var u = A[0][0] * x + A[0][1] * y, v = A[1][0] * x + A[1][1] * y, n = Math.hypot(u, v) || 1;
      var ux = u / n * 18, uy = v / n * 18;
      s += '<line x1="' + f2(p.X(x) - ux / 2) + '" y1="' + f2(p.Y(y) + uy / 2) + '" x2="' + f2(p.X(x) + ux / 2) + '" y2="' + f2(p.Y(y) - uy / 2) + '" class="seg" marker-end="url(#ahs)"/>';
    }
    return D.svg(300, 300, s, 'Phase portrait', true);
  };

  /* Cuboid (oblique) with labelled vertices ABCDEFGH and dimensions */
  D.cuboid = function (l, wdt, h, showDiag) {
    var W = 320, H = 230, sc = Math.min(180 / l, 120 / h), dx = 60, dy = -40;
    var ox = 40, oy = 190;
    var A = [ox, oy], B = [ox + l * sc, oy], C = [B[0] + dx, B[1] + dy], Dd = [A[0] + dx, A[1] + dy];
    var E = [A[0], A[1] - h * sc], F = [B[0], B[1] - h * sc], G = [C[0], C[1] - h * sc], Hh = [Dd[0], Dd[1] - h * sc];
    var s = D.line(A[0], A[1], B[0], B[1]) + D.line(B[0], B[1], C[0], C[1]) + D.line(C[0], C[1], Dd[0], Dd[1], 'dash') + D.line(Dd[0], Dd[1], A[0], A[1], 'dash');
    s += D.line(E[0], E[1], F[0], F[1]) + D.line(F[0], F[1], G[0], G[1]) + D.line(G[0], G[1], Hh[0], Hh[1]) + D.line(Hh[0], Hh[1], E[0], E[1]);
    s += D.line(A[0], A[1], E[0], E[1]) + D.line(B[0], B[1], F[0], F[1]) + D.line(C[0], C[1], G[0], G[1]) + D.line(Dd[0], Dd[1], Hh[0], Hh[1], 'dash');
    if (showDiag) s += D.line(A[0], A[1], G[0], G[1], 'accent') + D.line(A[0], A[1], C[0], C[1], 'accentdash');
    var lab = [[A, 'A', -12, 8], [B, 'B', 4, 12], [C, 'C', 12, 4], [Dd, 'D', -12, -4], [E, 'E', -12, -4], [F, 'F', -4, -12], [G, 'G', 12, -6], [Hh, 'H', -6, -12]];
    lab.forEach(function (q) { s += D.text(q[0][0] + q[2], q[0][1] + q[3], q[1], { anchor: 'middle', cls: 'it' }); });
    s += D.text((A[0] + B[0]) / 2, A[1] + 16, l + ' cm', { anchor: 'middle', size: 12 }) + D.text((B[0] + C[0]) / 2 + 22, (B[1] + C[1]) / 2 + 6, wdt + ' cm', { anchor: 'middle', size: 12 }) + D.text(A[0] - 26, (A[1] + E[1]) / 2, h + ' cm', { anchor: 'middle', size: 12 });
    return D.svg(W, H, s, 'Cuboid ABCDEFGH');
  };

  /* Right pyramid with square base ABCD and apex V */
  D.pyramid = function (side, height) {
    var W = 320, H = 240, A = [50, 200], B = [210, 200], C = [270, 150], Dd = [110, 150], M = [160, 175], V = [160, 30];
    var s = D.line(A[0], A[1], B[0], B[1]) + D.line(B[0], B[1], C[0], C[1]) + D.line(C[0], C[1], Dd[0], Dd[1], 'dash') + D.line(Dd[0], Dd[1], A[0], A[1], 'dash');
    s += D.line(V[0], V[1], A[0], A[1]) + D.line(V[0], V[1], B[0], B[1]) + D.line(V[0], V[1], C[0], C[1]) + D.line(V[0], V[1], Dd[0], Dd[1], 'dash');
    s += D.line(V[0], V[1], M[0], M[1], 'accentdash') + D.dot(M[0], M[1], 2.5);
    [[A, 'A', -12, 8], [B, 'B', 10, 8], [C, 'C', 12, 0], [Dd, 'D', -12, -4], [V, 'V', 0, -12], [M, 'M', 12, 8]].forEach(function (q) { s += D.text(q[0][0] + q[2], q[0][1] + q[3], q[1], { anchor: 'middle', cls: 'it' }); });
    s += D.text(130, 216, side + ' cm', { anchor: 'middle', size: 12 }) + D.text(176, 100, height + ' cm', { size: 12 });
    return D.svg(W, H, s, 'Square-based pyramid');
  };

  /* Sector with radius and angle labels */
  D.sector = function (thetaRad, rLabel, aLabel) {
    var W = 300, H = 220, O = [150, 190], R = 150;
    var t0 = Math.PI / 2 - thetaRad / 2, t1 = Math.PI / 2 + thetaRad / 2;
    if (thetaRad > Math.PI * 0.95) { R = 90; O = [150, 120]; }
    var P = [O[0] + R * Math.cos(t0), O[1] - R * Math.sin(t0)], Q = [O[0] + R * Math.cos(t1), O[1] - R * Math.sin(t1)];
    var large = thetaRad > Math.PI ? 1 : 0;
    var s = D.path('M' + O[0] + ',' + O[1] + 'L' + f2(P[0]) + ',' + f2(P[1]) + 'A' + R + ',' + R + ' 0 ' + large + ' 0 ' + f2(Q[0]) + ',' + f2(Q[1]) + 'Z', 'shape');
    s += D.text(O[0], O[1] + 14, 'O', { anchor: 'middle', cls: 'it' }) + D.text(P[0] + 12, P[1], 'A', { cls: 'it' }) + D.text(Q[0] - 18, Q[1], 'B', { cls: 'it' });
    s += D.text((O[0] + P[0]) / 2 + 14, (O[1] + P[1]) / 2 + 6, rLabel, { size: 12 }) + D.text(O[0], O[1] - 30, aLabel, { anchor: 'middle', size: 12 });
    return D.svg(W, H, s, 'Sector OAB');
  };

  /* Two- or three-state transition diagram. probs[i][j] = P(i -> j) */
  D.markov = function (names, probs) {
    var n = names.length, W = 320, H = n === 2 ? 170 : 310;
    var P = n === 2 ? [[90, 95], [230, 95]] : [[160, 84], [70, 222], [250, 222]];
    var s = D.arrowDefs;
    for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) {
      var pr = probs[i][j]; if (!pr) continue;
      if (i === j) {
        var cx = P[i][0], cy = P[i][1], up = n === 2 ? (i === 0 ? -1 : 1) : (i === 0 ? -1 : 1);
        var lx = n === 2 ? (i === 0 ? -1 : 1) : 0, ly = n === 2 ? 0 : (i === 0 ? -1 : 1);
        if (n === 2) s += D.path('M' + (cx + lx * 20) + ',' + (cy - 12) + ' C' + (cx + lx * 70) + ',' + (cy - 50) + ' ' + (cx + lx * 70) + ',' + (cy + 50) + ' ' + (cx + lx * 22) + ',' + (cy + 12), 'thin" marker-end="url(#ah)');
        else s += D.path('M' + (cx - 12) + ',' + (cy + ly * 20) + ' C' + (cx - 50) + ',' + (cy + ly * 72) + ' ' + (cx + 50) + ',' + (cy + ly * 72) + ' ' + (cx + 12) + ',' + (cy + ly * 22), 'thin" marker-end="url(#ah)');
        s += D.text(cx + lx * 68, cy + ly * 62 + (n === 2 ? 0 : ly * 6), pr, { anchor: 'middle', size: 12 });
        continue;
      }
      var A = P[i], B = P[j], dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
      var off = 9, sx = A[0] + dx / L * 24 + nx * off, sy = A[1] + dy / L * 24 + ny * off, ex = B[0] - dx / L * 24 + nx * off, ey = B[1] - dy / L * 24 + ny * off;
      s += D.arrow(sx, sy, ex, ey, 'thin') + D.text((sx + ex) / 2 + nx * 13, (sy + ey) / 2 + ny * 13, pr, { anchor: 'middle', size: 12 });
    }
    P.forEach(function (q, i) { s += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="22" class="node"/>' + D.text(q[0], q[1] + 1, names[i], { anchor: 'middle', size: 13, cls: 'nodet' }); });
    return D.svg(W, H, s, 'Transition state diagram');
  };

  /* Scatter plot */
  D.scatter = function (xs, ys, xl, yl) {
    var minx = Math.min.apply(null, xs), maxx = Math.max.apply(null, xs), miny = Math.min.apply(null, ys), maxy = Math.max.apply(null, ys);
    var rx = maxx - minx || 1, ry = maxy - miny || 1;
    function nice(r) { var e = Math.pow(10, Math.floor(Math.log10(r / 5))), m = r / 5 / e; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * e; }
    var sx = nice(rx * 1.3), sy = nice(ry * 1.3);
    var x0 = Math.floor((minx - rx * 0.15) / sx) * sx, y0 = Math.floor((miny - ry * 0.15) / sy) * sy;
    if (minx >= 0) x0 = Math.max(0, x0); if (miny >= 0) y0 = Math.max(0, y0);
    var p = D.plane({ xmin: x0, xmax: Math.ceil((maxx + rx * 0.1) / sx) * sx, ymin: y0, ymax: Math.ceil((maxy + ry * 0.1) / sy) * sy, w: 320, h: 240, xl: xl, yl: yl, pad: 34, ticks: true, tstep: sx, tstepy: sy });
    var s = p.svg;
    xs.forEach(function (x, i) { s += D.dot(p.X(x), p.Y(ys[i]), 3.5); });
    return D.svg(320, 240, s, 'Scatter diagram', true);
  };
})(typeof window !== 'undefined' ? window : globalThis);
