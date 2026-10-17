/* Byte Size question engine: shared helpers and registry */
(function (g) {
  var BS = g.BS = g.BS || {};
  BS.topics = BS.topics || {};
  BS.courses = BS.courses || [];
  BS.L = String.raw;

  var ri = BS.ri = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  BS.pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  BS.nz = function (a, b) { var v; do { v = ri(a, b); } while (v === 0); return v; };
  var gcd = BS.gcd = function (a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; };
  BS.shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };

  // Fraction in simplest form as LaTeX
  BS.frac = function (n, d) {
    if (d < 0) { n = -n; d = -d; }
    var k = gcd(n, d) || 1; n /= k; d /= k;
    if (d === 1) return String(n);
    return (n < 0 ? '-' : '') + '\\frac{' + Math.abs(n) + '}{' + d + '}';
  };
  // Mixed number (positive) as LaTeX
  BS.mixed = function (n, d) {
    var k = gcd(n, d); n /= k; d /= k;
    if (d === 1) return String(n);
    var w = Math.floor(n / d), r = n % d;
    return (w ? w : '') + '\\tfrac{' + r + '}{' + d + '}';
  };
  // Polynomial from coefficients (highest power first)
  BS.poly = function (c, v) {
    v = v || 'x';
    var n = c.length - 1, s = '';
    c.forEach(function (a, i) {
      if (a === 0) return;
      var p = n - i, abs = Math.abs(a);
      var t = (abs === 1 && p > 0) ? '' : String(abs);
      if (p === 1) t += v; else if (p > 1) t += v + '^{' + p + '}';
      if (s === '') s = (a < 0 ? '-' : '') + t; else s += (a < 0 ? ' - ' : ' + ') + t;
    });
    return s || '0';
  };
  // " + 5" / " - 5"
  BS.sg = function (b) { return b < 0 ? ' - ' + (-b) : ' + ' + b; };
  // Bracket factor like (x - 3) or (2x + 1)
  BS.br = function (p, q, v) { return '(' + BS.poly([p, q], v) + ')'; };
  // Significant figures, keeping trailing zeros
  BS.sf = function (x, n) {
    if (x === 0) return '0';
    var p = Math.floor(Math.log10(Math.abs(x)));
    var dp = n - 1 - p;
    if (dp > 0) {
      var s = x.toFixed(dp);
      // toFixed may roll up a digit (e.g. 9.996 -> 10.00): recompute
      var p2 = Math.floor(Math.log10(Math.abs(Number(s))));
      if (p2 !== p) s = Number(s).toFixed(Math.max(0, n - 1 - p2));
      return s;
    }
    var f = Math.pow(10, -dp);
    return String(Math.round(x / f) * f);
  };
  BS.dp = function (x, n) { var s = x.toFixed(n); if (/^-0(\.0+)?$/.test(s)) s = s.slice(1); return s; };
  BS.money = function (x, pence) { if (!pence && Math.abs(x - Math.round(x)) < 1e-9) return '£' + Math.round(x).toLocaleString('en-GB'); return '£' + x.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  BS.num = function (x) { return x.toLocaleString('en-GB', { maximumFractionDigits: 10 }); };
  BS.deg = function (x) { return x * Math.PI / 180; };
  BS.m = function (s) { return '\\(' + s + '\\)'; };

  /* Register a topic.
     t = { id, name, video, gens: [ { d:[1,2,3], f: function(d){ return { stem?, parts:[{q, m, a}] } } } ] } */
  BS.topic = function (t) { BS.topics[t.id] = t; };

  // Make one question for a topic at difficulty d, avoiding generators already used (set of indices)
  BS.make = function (topicId, d, used) {
    var t = BS.topics[topicId];
    var cands = [];
    t.gens.forEach(function (gn, i) { if (gn.d.indexOf(d) > -1) cands.push(i); });
    if (!cands.length) {
      // fall back to the nearest difficulty available
      var best = 99;
      t.gens.forEach(function (gn) { gn.d.forEach(function (x) { best = Math.min(best, Math.abs(x - d)); }); });
      t.gens.forEach(function (gn, i) { gn.d.forEach(function (x) { if (Math.abs(x - d) === best && cands.indexOf(i) < 0) cands.push(i); }); });
    }
    var fresh = cands.filter(function (i) { return !used || !used.has(topicId + ':' + i); });
    if (!fresh.length) {
      // all templates at this level used: borrow unused ones from the next level down, then up
      [d - 1, d + 1].forEach(function (dd) {
        if (fresh.length) return;
        t.gens.forEach(function (gn, k) { if (gn.d.indexOf(dd) > -1 && !used.has(topicId + ':' + k)) fresh.push(k); });
      });
    }
    var i = BS.pick(fresh.length ? fresh : cands);
    if (used) used.add(topicId + ':' + i);
    var q = t.gens[i].f(d);
    q.topic = topicId;
    q.marks = q.parts.reduce(function (s, p) { return s + (p.m || 0); }, 0);
    return q;
  };
})(typeof window !== 'undefined' ? window : globalThis);
