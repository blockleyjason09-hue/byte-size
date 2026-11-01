/* Byte Size Classroom — shared helpers for the A level Further Maths banks (Core Pure, Further Statistics, Decision). */
(function (g) {
  var BS = g.BS;
  var M = BS.m, frac = BS.frac, poly = BS.poly, num = BS.num;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function d4(x) { return x.toFixed(4); }
  function S(v) { return v < 0 ? ' - ' + (-v) : ' + ' + v; }
  function S0(v) { return v ? S(v) : ''; }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function xm(v, x) { x = x || 'x'; return v ? '(' + x + S(-v) + ')' : x; }
  function cx(a, b) { if (!b) return String(a); var im = Math.abs(b) === 1 ? 'i' : Math.abs(b) + 'i'; return a ? a + (b < 0 ? ' - ' : ' + ') + im : (b < 0 ? '-' : '') + im; }
  function cxF(an, ad, bn, bd) { var A = frac(an, ad), B = frac(Math.abs(bn), bd); if (!bn) return A; return (an ? A + (bn < 0 ? ' - ' : ' + ') : (bn < 0 ? '-' : '')) + (B === '1' ? '' : B) + 'i'; }
  function mat(rows) { return '\\begin{pmatrix}' + rows.map(function (r) { return r.join(' & '); }).join('\\\\') + '\\end{pmatrix}'; }
  function vec(a) { return '\\begin{pmatrix}' + a.join('\\\\') + '\\end{pmatrix}'; }
  function lin(cs, vars) { var s = ''; cs.forEach(function (c, i) { if (!c) return; var t = (Math.abs(c) === 1 ? '' : Math.abs(c)) + vars[i]; s += s ? (c < 0 ? ' - ' : ' + ') + t : (c < 0 ? '-' : '') + t; }); return s || '0'; }
  function C(n, r) { if (r < 0 || r > n) return 0; var v = 1; for (var i = 1; i <= r; i++) v = v * (n - r + i) / i; return Math.round(v); }
  function fact(n) { var f = 1; for (var i = 2; i <= n; i++) f *= i; return f; }
  function det3(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]); }
  function mul(A, B) { return A.map(function (r) { return B[0].map(function (_, j) { return r.reduce(function (s, x, k) { return s + x * B[k][j]; }, 0); }); }); }
  function dot(a, b) { return a.reduce(function (s, x, i) { return s + x * b[i]; }, 0); }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function len(a) { return Math.sqrt(dot(a, a)); }
  function add(a, b, k) { k = k === undefined ? 1 : k; return a.map(function (x, i) { return x + k * b[i]; }); }
  function sq(n) { var r = Math.round(Math.sqrt(n)); return r * r === n; }
  function rt(n) { var o = 1, i = n; for (var k = 2; k * k <= i; k++) while (i % (k * k) === 0) { o *= k; i /= k * k; } return i === 1 ? String(o) : (o === 1 ? '' : o) + '\\sqrt{' + i + '}'; }
  function pois(l, k) { return Math.exp(-l) * Math.pow(l, k) / fact(k); }
  function pcdf(l, k) { var s = 0; for (var i = 0; i <= k; i++) s += pois(l, i); return s; }
  function bin(n, p, k) { return C(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k); }
  function sum(a) { return a.reduce(function (p, q) { return p + q; }, 0); }
  function pr(x, y) { return '(' + x + ', ' + y + ')'; }
  function ang(x) { return x * 180 / Math.PI; }
  function piF(n, d) { /* n*pi/d exact */ var f = frac(n, d); if (f === '0') return '0'; var neg = f.charAt(0) === '-'; if (neg) f = f.slice(1); var m = f.match(/^\\frac\{(\d+)\}\{(\d+)\}$/); var s = m ? '\\frac{' + (m[1] === '1' ? '' : m[1]) + '\\pi}{' + m[2] + '}' : (f === '1' ? '\\pi' : f + '\\pi'); return (neg ? '-' : '') + s; }
  BS.fa = { Q: Q, sf3: sf3, d4: d4, S: S, S0: S0, c1: c1, xm: xm, cx: cx, cxF: cxF, mat: mat, vec: vec, lin: lin, C: C, fact: fact, det3: det3, mul: mul, dot: dot, cross: cross, len: len, add: add, sq: sq, rt: rt, pois: pois, pcdf: pcdf, bin: bin, sum: sum, pr: pr, ang: ang, piF: piF };
})(typeof window !== 'undefined' ? window : globalThis);
