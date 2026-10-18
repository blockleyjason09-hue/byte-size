/* Byte Size — Pearson Edexcel A Level Mathematics, Year 2 Pure. */
(function (g) {
  var BS = g.BS, D = BS.draw, IB = BS.ib, FM = BS.fm, AL = BS.al;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, dp = BS.dp, num = BS.num, M = BS.m;
  var s3 = IB.s3, from = FM.from, c1 = FM.c1, tc = FM.tc, comb = FM.comb, q1 = AL.q1, rad = AL.rad, deg = AL.deg, pt = AL.pt, surd = BS.gcse2.surd;
  function svgOf(p, s, label) { return D.svg(p.w, p.h, s, label, true); }
  function lin(a, b) { return poly([a, b]); }
  function paramPath(p, X, Y, t0, t1, n) { n = n || 200; var d = ''; for (var i = 0; i <= n; i++) { var t = t0 + (t1 - t0) * i / n; d += (i ? 'L' : 'M') + p.X(X(t)).toFixed(1) + ',' + p.Y(Y(t)).toFixed(1); } return D.path(d, 'curve'); }

  /* ---------------- Proof and partial fractions ---------------- */
  BS.topic({ id: 'a2-proof', name: 'Proof by contradiction, algebraic division and partial fractions', video: 'A level maths partial fractions proof by contradiction', gens: [
    { d: [2, 3], f: function () {
      var P = pick([
        ['Prove by contradiction that ' + M('\\sqrt{2}') + ' is irrational.', 'Assume ' + M('\\sqrt{2} = \\frac{a}{b}') + ' in lowest terms. Then ' + M('a^2 = 2b^2') + ', so ' + M('a') + ' is even; write ' + M('a = 2k') + ', giving ' + M('b^2 = 2k^2') + ', so ' + M('b') + ' is even. This contradicts lowest terms, so ' + M('\\sqrt{2}') + ' is irrational.'],
        ['Prove by contradiction that there are infinitely many prime numbers.', 'Assume finitely many primes ' + M('p_1, \\ldots, p_n') + '. Let ' + M('N = p_1 p_2 \\cdots p_n + 1') + '. No ' + M('p_i') + ' divides ' + M('N') + ', so ' + M('N') + ' is prime or has a prime factor not in the list: a contradiction.'],
        ['Prove by contradiction that if ' + M('n^2') + ' is even then ' + M('n') + ' is even.', 'Assume ' + M('n^2') + ' is even and ' + M('n') + ' is odd, ' + M('n = 2k + 1') + '. Then ' + M('n^2 = 4k^2 + 4k + 1') + ' is odd: a contradiction.'],
        ['Prove by contradiction that there are no integers ' + M('a') + ' and ' + M('b') + ' for which ' + M('2a + 4b = 1') + '.', 'Assume such integers exist. Then ' + M('2(a + 2b) = 1') + ', so 1 is even: a contradiction.'],
        ['Prove by contradiction that there is no greatest even integer.', 'Assume ' + M('N') + ' is the greatest even integer. Then ' + M('N + 2') + ' is even and greater than ' + M('N') + ': a contradiction.']]);
      return q1(P[0], 4, P[1]);
    } },
    { d: [1, 2], f: function () { // two linear factors
      var a = nz(-5, 5), b = nz(-5, 5), A = nz(-6, 6), B = nz(-6, 6); while (a === b) b = nz(-5, 5);
      // A/(x + a) + B/(x + b) = (A(x + b) + B(x + a))/((x+a)(x+b))
      var num_ = [A + B, A * b + B * a];
      return q1('Express ' + M('\\frac{' + lin(num_[0], num_[1]) + '}{' + br(1, a) + br(1, b) + '}') + ' in partial fractions.', 3,
        M((A < 0 ? '-' : '') + '\\frac{' + Math.abs(A) + '}{' + lin(1, a) + '} ' + (B < 0 ? '- \\frac{' + (-B) : '+ \\frac{' + B) + '}{' + lin(1, b) + '}'));
    } },
    { d: [2, 3], f: function () { // repeated factor
      var a = nz(-4, 4), b = nz(-4, 4), A = nz(-5, 5), B = nz(-5, 5), C = nz(-5, 5); while (a === b) b = nz(-4, 4);
      // A/(x+a) + B/(x+b) + C/(x+b)^2 over (x+a)(x+b)^2
      var n2 = A + B, n1 = 2 * A * b + B * (a + b) + C, n0 = A * b * b + B * a * b + C * a;
      return q1('Express ' + M('\\frac{' + poly([n2, n1, n0]) + '}{' + br(1, a) + br(1, b) + '^2}') + ' in partial fractions.', 4,
        M((A < 0 ? '-' : '') + '\\frac{' + Math.abs(A) + '}{' + lin(1, a) + '}' + (B < 0 ? ' - ' : ' + ') + '\\frac{' + Math.abs(B) + '}{' + lin(1, b) + '}' + (C < 0 ? ' - ' : ' + ') + '\\frac{' + Math.abs(C) + '}{' + br(1, b) + '^2}'));
    } },
    { d: [3], f: function () { // improper fraction
      var a = nz(-4, 4), b = nz(-4, 4), A = nz(-5, 5), B = nz(-5, 5), k = ri(1, 3); while (a === b) b = nz(-4, 4);
      // k + A/(x+a) + B/(x+b)
      var den = [1, a + b, a * b], top = [k, k * (a + b) + A + B, k * a * b + A * b + B * a];
      return q1('Given that ' + M('\\frac{' + poly(top) + '}{' + poly(den) + '} \\equiv P + \\frac{Q}{' + lin(1, a) + '} + \\frac{R}{' + lin(1, b) + '}') + ', find the values of ' + M('P') + ', ' + M('Q') + ' and ' + M('R') + '.', 4, M('P = ' + k + ',\\ Q = ' + A + ',\\ R = ' + B));
    } }
  ] });

  /* ---------------- Functions and modulus ---------------- */
  BS.topic({ id: 'a2-functions', name: 'Functions: modulus, composite, inverse and transformations', video: 'A level maths modulus functions composite inverse', gens: from('fm-functions', [9, 10, 11]).concat([
    { d: [2, 3], f: function () { // |ax + b| = cx + d
      var a = ri(1, 4), b = nz(-8, 8), c = pick([1, 2, -1, 0.5]), d = ri(1, 9);
      var sols = []; [[a, b], [-a, -b]].forEach(function (L) { var x = (d - L[1]) / (L[0] - c); if (isFinite(x) && L[0] * x + L[1] >= -1e-9 && c * x + d >= -1e-9 && sols.every(function (s) { return Math.abs(s - x) > 1e-9; })) sols.push(x); });
      if (!sols.length) { c = 0; d = ri(2, 9); sols = [(d - b) / a, (-d - b) / a]; }
      sols.sort(function (u, v) { return u - v; });
      return q1('Solve ' + M('|' + poly([a, b]) + '| = ' + (c ? poly([c, d]) : d)) + '.', 4, M('x = ' + sols.map(function (v) { return frac(Math.round(v * 2 * a * 2), 2 * a * 2); }).join('\\text{ or } x = ')));
    } },
    { d: [2], f: function () { // graph of y = |f(x)| with diagram
      var a = ri(1, 3), b = nz(-6, 6), f = function (x) { return Math.abs(a * x + b); }, v = -b / a;
      var pl = D.plane({ xmin: v - 5, xmax: v + 5, ymin: -2, ymax: Math.max(f(v - 5), f(v + 5)) + 1, w: 300, h: 260 });
      var s = pl.svg + pl.curve(f, v - 5, v + 5) + D.dot(pl.X(v), pl.Y(0)) + D.dot(pl.X(0), pl.Y(f(0)));
      var k = ri(1, 6);
      return { stem: 'The diagram shows a sketch of ' + M('y = |' + poly([a, b]) + '|') + '.' + svgOf(pl, s, 'Modulus graph'), parts: [
        { q: 'Write down the coordinates of the vertex and of the ' + M('y') + '-intercept.', m: 2, a: M(pt([frac(-b, a), 0]) + ',\\ ' + pt([0, Math.abs(b)])) },
        { q: 'Solve ' + M('|' + poly([a, b]) + '| = ' + k) + '.', m: 3, a: M('x = ' + frac(-b - k, a) + '\\text{ or } x = ' + frac(-b + k, a)) },
        { q: 'Solve ' + M('|' + poly([a, b]) + '| < ' + k) + '.', m: 2, a: M(frac(-b - k, a) + ' < x < ' + frac(-b + k, a)) }
      ] };
    } },
    { d: [2, 3], f: function () { // composite and inverse with exponential/log
      var a = ri(2, 5), b = ri(1, 6), k = ri(2, 4);
      return { stem: M('f(x) = e^{' + k + 'x} + ' + b) + ', ' + M('x \\in \\mathbb{R}') + ', and ' + M('g(x) = \\ln(' + a + 'x)') + ', ' + M('x > 0') + '.', parts: [
        { q: 'State the range of ' + M('f') + '.', m: 1, a: M('f(x) > ' + b) },
        { q: 'Find ' + M('f^{-1}(x)') + ' and state its domain.', m: 3, a: M('f^{-1}(x) = \\frac{1}{' + k + '}\\ln(x - ' + b + ')') + ', ' + M('x > ' + b) },
        { q: 'Find ' + M('fg(x)') + ' in its simplest form.', m: 2, a: M(Math.pow(a, k) + 'x^{' + k + '} + ' + b) }
      ] };
    } },
    { d: [3], f: function () { // transformations: y = 2f(x - 1) + 3 and y = |f(x)|, f(|x|) of key points
      var P = [ri(-4, -1), ri(-6, -1)], Q = [ri(1, 4), ri(2, 6)], a = nz(-3, 3), k = pick([2, 3]), c = nz(-4, 4);
      return { stem: 'The curve ' + M('y = f(x)') + ' has a minimum point ' + M('A' + pt(P)) + ' and a maximum point ' + M('B' + pt(Q)) + '.', parts: [
        { q: 'Find the coordinates of the image of ' + M('A') + ' on ' + M('y = ' + k + 'f(x' + sg(-a) + ')' + sg(c)) + '.', m: 2, a: M(pt([P[0] + a, k * P[1] + c])) },
        { q: 'Find the coordinates of the image of ' + M('A') + ' on ' + M('y = |f(x)|') + ' and state whether it is a maximum or a minimum.', m: 2, a: M(pt([P[0], -P[1]])) + ', a maximum' },
        { q: 'Find the coordinates of the turning points of ' + M('y = f(|x|)') + '.', m: 2, a: M(pt(Q) + ',\\ ' + pt([-Q[0], Q[1]])) + ' (both maxima)' }
      ] };
    } }
  ]) });

  /* ---------------- Sequences and series ---------------- */
  BS.topic({ id: 'a2-sequences', name: 'Sequences and series: arithmetic, geometric, sigma and recurrence', video: 'A level maths sequences series sum to infinity', gens: from('ib-arith', [1, 2]).concat(from('ib-geom', [0, 2, 3])).concat([
    { d: [2], f: function () { // sum to infinity condition
      var a = ri(2, 9), r = pick(['\\frac{1}{2}', '\\frac{2}{3}', '\\frac{1}{3}', '\\frac{3}{4}', '-\\frac{1}{2}']), rv = { '\\frac{1}{2}': 0.5, '\\frac{2}{3}': 2 / 3, '\\frac{1}{3}': 1 / 3, '\\frac{3}{4}': 0.75, '-\\frac{1}{2}': -0.5 }[r];
      var Sinf = a / (1 - rv), k = pick([2, 3]);
      return { stem: 'A geometric series has first term ' + a + ' and common ratio ' + M(r) + '.', parts: [
        { q: 'Explain why the series is convergent.', m: 1, a: M('|r| < 1') },
        { q: 'Find the sum to infinity.', m: 2, a: M(frac(Math.round(Sinf * 12), 12)) },
        { q: 'Find the least value of ' + M('n') + ' for which ' + M('S_\\infty - S_n < 0.001') + '.', m: 3, a: M('n = ' + (function () { var n = 1; while (Math.abs(Sinf - a * (1 - Math.pow(rv, n)) / (1 - rv)) >= 0.001) n++; return n; })()) }
      ] };
    } },
    { d: [2, 3], f: function () { // geometric r from x-terms
      var r = pick([2, 3, -2]), x = ri(2, 6);
      // terms: x - a, x, x + b form tricky; use k, k + c, ... : terms 2k + ..., use simple: (k+4), k, (k-3) style? keep: p, pr, pr^2 with p = 3k - 2 etc.
      var k = ri(3, 8), t1 = k - 2, t2 = k + 2, t3 = 2 * k + 4; // need (k+2)^2 = (k-2)(2k+4) -> k^2 + 4k + 4 = 2k^2 - 8 -> k^2 - 4k - 12 = 0 -> k = 6
      k = 6; t1 = 4; t2 = 8; t3 = 16;
      return { stem: 'The first three terms of a geometric sequence are ' + M('(k - 2),\\ (k + 2),\\ (2k + 4)') + ', where ' + M('k') + ' is a positive constant.', parts: [
        { q: 'Show that ' + M('k^2 - 4k - 12 = 0') + '.', m: 2, a: M('(k + 2)^2 = (k - 2)(2k + 4)') + ', expand and simplify.' },
        { q: 'Find the value of ' + M('k') + ' and the common ratio.', m: 2, a: M('k = 6,\\ r = 2') },
        { q: 'Find the sum of the first 10 terms.', m: 2, a: M('S_{10} = \\frac{4(2^{10} - 1)}{1} = 4,092') }
      ] };
    } },
    { d: [2], f: function () { // sigma notation
      var a = ri(2, 6), b = nz(-5, 9), n = ri(15, 40), S = n * (a + b + a * n + b) / 2, r = pick([2, 3]), m = ri(4, 8), G = (Math.pow(r, m + 1) - r) / (r - 1);
      return { stem: '', parts: [
        { q: 'Find ' + M('\\displaystyle\\sum_{k=1}^{' + n + '} (' + poly([a, b], 'k') + ')') + '.', m: 3, a: num(S) },
        { q: 'Find ' + M('\\displaystyle\\sum_{k=1}^{' + m + '} ' + r + '^{k}') + '.', m: 2, a: num(G) }
      ] };
    } },
    { d: [2, 3], f: function () { // recurrence relation
      var k = nz(-3, 3), u1 = ri(1, 5), type = pick(['lin', 'per']);
      if (type === 'per') {
        return { stem: 'A sequence is defined by ' + M('u_1 = ' + u1) + ' and ' + M('u_{n+1} = \\frac{' + k * k + '}{u_n}') + '.', parts: [
          { q: 'Find ' + M('u_2') + ', ' + M('u_3') + ' and ' + M('u_4') + '.', m: 2, a: M(frac(k * k, u1) + ',\\ ' + u1 + ',\\ ' + frac(k * k, u1)) },
          { q: 'Describe the sequence and find ' + M('\\displaystyle\\sum_{r=1}^{20} u_r') + '.', m: 3, a: 'Periodic with period 2; sum ' + M('= 10\\left(' + u1 + ' + ' + frac(k * k, u1) + '\\right) = ' + frac(10 * (u1 * u1 + k * k), u1)) }
        ] };
      }
      var p = ri(2, 4), q = nz(-5, 5); while (u1 * (p - 1) + q === 0 || q === 0) q++; var u = [u1]; for (var i = 0; i < 3; i++) u.push(p * u[i] + q);
      return { stem: 'A sequence is defined by ' + M('u_1 = ' + u1) + ' and ' + M('u_{n+1} = ' + p + 'u_n' + sg(q)) + '.', parts: [
        { q: 'Find ' + M('u_2') + ', ' + M('u_3') + ' and ' + M('u_4') + '.', m: 2, a: M(u.slice(1).join(',\\ ')) },
        { q: 'State whether the sequence is increasing, decreasing or periodic.', m: 1, a: u[3] > u[2] ? 'Increasing' : u[3] < u[2] ? 'Decreasing' : 'Constant' }
      ] };
    } }
  ]) });
  // replace the fixed geometric-k question with a varied version
  BS.topics['a2-sequences'].gens[6].f = function () {
    var r = pick([2, 3]), a = ri(2, 6);
    // terms (k - p), (k + q), ... pick k then design: t1 = a, t2 = a r, t3 = a r^2 with k = a + s: t1 = k - s, t2 = k + (ar - a - s), t3 = r(k + ar - a - s) ... show as linear in k
    var s = ri(1, 5), k = a + s, c3 = pick([2, 3, 4]), d2 = a * r - k, d3 = a * r * r - c3 * k; // t2 = k + d2, t3 = r k + d3
    var A = 1, B = 2 * d2, C = d2 * d2; // (k + d2)^2 = (k - s)(rk + d3) -> k^2 + 2 d2 k + d2^2 = r k^2 + (d3 - r s)k - s d3
    var qa = c3 - 1, qb = d3 - c3 * s - 2 * d2, qc = -s * d3 - d2 * d2;
    var g_ = gcd(gcd(Math.abs(qa), Math.abs(qb)), Math.abs(qc)) || 1;
    var other = qc / qa / k; if (other > 0) return BS.topics['a2-sequences'].gens[6].f();
    var Sn = a * (Math.pow(r, 8) - 1) / (r - 1);
    return { stem: 'The first three terms of a geometric sequence are ' + M('(k - ' + s + '),\\ (k' + (d2 ? sg(d2) : '') + '),\\ (' + c1(c3, 'k') + (d3 ? sg(d3) : '') + ')') + ', where ' + M('k') + ' is a positive constant.', parts: [
      { q: 'Show that ' + M(poly([qa / g_, qb / g_, qc / g_], 'k') + ' = 0') + '.', m: 3, a: M((d2 ? '(k' + sg(d2) + ')' : 'k') + '^2 = (k - ' + s + ')(' + c1(c3, 'k') + (d3 ? sg(d3) : '') + ')') + ', expand and simplify.' },
      { q: 'Hence find the value of ' + M('k') + ' and the common ratio.', m: 2, a: M('k = ' + k + ',\\ r = ' + r) },
      { q: 'Find the sum of the first 8 terms.', m: 2, a: num(Sn) }
    ] };
  };

  /* ---------------- Binomial expansion (general n) ---------------- */
  function genC(n, k) { var r = 1; for (var i = 0; i < k; i++) r *= (n - i) / (i + 1); return r; }
  BS.topic({ id: 'a2-binomial', name: 'Binomial expansion for any rational n', video: 'A level maths binomial expansion negative fractional power', gens: [
    { d: [2], f: function () {
      var n = pick([-1, -2, -3, 0.5, -0.5, 1.5, 1 / 3]), nS = { '-1': '-1', '-2': '-2', '-3': '-3', '0.5': '\\frac{1}{2}', '-0.5': '-\\frac{1}{2}', '1.5': '\\frac{3}{2}' }[String(n)] || '\\frac{1}{3}', k = pick([2, 3, -2, 4]);
      var t = [1, 2, 3].map(function (r) { return genC(n, r) * Math.pow(k, r); });
      function F(v) { for (var d = 1; d <= 81; d++) if (Math.abs(v * d - Math.round(v * d)) < 1e-9) return frac(Math.round(v * d), d); return s3(v); }
      return { stem: '', parts: [
        { q: 'Find the first four terms, in ascending powers of ' + M('x') + ', of the binomial expansion of ' + M('(1' + tc(k, 'x') + ')^{' + nS + '}') + '.', m: 4, a: M((function (v) { return '1 ' + (v.charAt(0) === '-' ? '- ' + v.slice(1) : '+ ' + v); })(BS.vt(t.map(F), ['x', 'x^{2}', 'x^{3}']))) },
        { q: 'State the range of values of ' + M('x') + ' for which the expansion is valid.', m: 1, a: M('|x| < ' + frac(1, Math.abs(k))) }
      ] };
    } },
    { d: [2, 3], f: function () { // (a + bx)^n with a ≠ 1, approximation
      var a = pick([4, 9]), n = 0.5, b = pick([1, 2, -1]), xv = 0.01;
      var r = Math.sqrt(a), c1v = n * b / a, c2v = n * (n - 1) / 2 * b * b / (a * a), est = r * (1 + c1v * xv + c2v * xv * xv);
      function F(v) { for (var d = 1; d <= 4096; d++) if (Math.abs(v * d - Math.round(v * d)) < 1e-9) return frac(Math.round(v * d), d); return s3(v); }
      return { stem: '', parts: [
        { q: 'Find the first three terms, in ascending powers of ' + M('x') + ', of ' + M('\\sqrt{' + a + tc(b, 'x') + '}') + '.', m: 4, a: M(r + '\\left(1 ' + (b < 0 ? '-' : '+') + ' \\frac{' + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x}{' + a + '}\\right)^{\\frac{1}{2}} = ' + r + ' ' + (r * c1v < 0 ? '- ' + F(-r * c1v) : '+ ' + F(r * c1v)) + 'x ' + (r * c2v < 0 ? '- ' + F(-r * c2v) : '+ ' + F(r * c2v)) + 'x^2') },
        { q: 'Use your expansion with ' + M('x = 0.01') + ' to find an approximation for ' + M('\\sqrt{' + num(a + b * xv) + '}') + ', giving your answer to 6 decimal places.', m: 2, a: est.toFixed(6) }
      ] };
    } },
    { d: [3], f: function () { // with partial fractions
      var a = 1, b = 2;
      return q1('Given that ' + M('\\frac{3x + 4}{(1 + x)(2 + x)} \\equiv \\frac{1}{1 + x} + \\frac{2}{2 + x}') + ', find the expansion of ' + M('\\frac{3x + 4}{(1 + x)(2 + x)}') + ' in ascending powers of ' + M('x') + ', up to and including the term in ' + M('x^2') + '.', 5,
        M('(1 + x)^{-1} + (1 + \\tfrac{x}{2})^{-1} = (1 - x + x^2) + (1 - \\tfrac{x}{2} + \\tfrac{x^2}{4}) = 2 - \\tfrac{3}{2}x + \\tfrac{5}{4}x^2'));
    } }
  ] });

  /* ---------------- Radians ---------------- */
  BS.topic({ id: 'a2-radians', name: 'Radians, arcs, sectors and small-angle approximations', video: 'A level maths radians small angle approximation', gens: from('ib-radians', [0, 1, 2]).concat([
    { d: [2], f: function () { // small angle
      var a = ri(2, 6), b = ri(1, 4);
      return q1('Given that ' + M('\\theta') + ' is small and measured in radians, use small-angle approximations to show that ' + M('\\frac{' + a + '\\sin\\theta\\tan\\theta}{1 - \\cos\\theta} \\approx ' + 2 * a) + '.', 3,
        M('\\frac{' + a + '\\theta \\cdot \\theta}{\\tfrac{1}{2}\\theta^2} = ' + 2 * a));
    } },
    { d: [2, 3], f: function () { // solve in radians
      var fn = pick(['sin', 'cos']), k = pick([0.5, -0.5, 0.3, 0.8]), base = fn === 'sin' ? Math.asin(k) : Math.acos(k), sols;
      sols = fn === 'sin' ? [base, Math.PI - base] : [base, 2 * Math.PI - base];
      sols = sols.map(function (v) { return ((v % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI); }).sort(function (x, y) { return x - y; });
      return q1('Solve ' + M('\\' + fn + '\\theta = ' + k) + ' for ' + M('0 \\le \\theta < 2\\pi') + ', giving your answers to 3 significant figures.', 3, M('\\theta = ' + sols.map(s3).join(',\\ ')));
    } },
    { d: [3], f: function () { // shaded segment from two sectors
      var r = ri(4, 12), th = ri(5, 15) / 10, seg = 0.5 * r * r * (th - Math.sin(th)), per = r * th + 2 * r * Math.sin(th / 2);
      return { stem: 'A sector ' + M('OAB') + ' of a circle has radius ' + r + ' cm and angle ' + th + ' radians. The chord ' + M('AB') + ' is drawn.' + D.sector(th, r + ' cm', th + ' rad'), parts: [
        { q: 'Find the area of the segment bounded by the chord ' + M('AB') + ' and the arc ' + M('AB') + '.', m: 3, a: M('\\tfrac{1}{2}(' + r + ')^2(' + th + ' - \\sin ' + th + ') = ' + s3(seg)) + ' cm²' },
        { q: 'Find the perimeter of the segment.', m: 3, a: M(r + ' \\times ' + th + ' + 2(' + r + ')\\sin ' + (th / 2) + ' = ' + s3(per)) + ' cm' }
      ] };
    } }
  ]) });

  /* ---------------- Trigonometric functions ---------------- */
  BS.topic({ id: 'a2-trigfn', name: 'Trigonometric functions: sec, cosec, cot and inverse trig', video: 'A level maths sec cosec cot identities', gens: from('ib-trig-eq', [0, 1, 2]).concat([
    { d: [1, 2], f: function () { // exact values
      var A = pick([['\\sec 60^\\circ', '2'], ['\\csc 30^\\circ', '2'], ['\\cot 45^\\circ', '1'], ['\\sec 45^\\circ', '\\sqrt{2}'], ['\\csc 60^\\circ', '\\frac{2}{\\sqrt{3}}'], ['\\cot 30^\\circ', '\\sqrt{3}'], ['\\sec 120^\\circ', '-2'], ['\\csc 210^\\circ', '-2']]), B; do { B = pick([['\\sec 60^\\circ', '2'], ['\\cot 60^\\circ', '\\frac{1}{\\sqrt{3}}'], ['\\csc 45^\\circ', '\\sqrt{2}'], ['\\sec 150^\\circ', '-\\frac{2}{\\sqrt{3}}']]); } while (B[0] === A[0]);
      return { stem: 'Without using a calculator, find the exact value of', parts: [{ q: M(A[0]), m: 1, a: M(A[1]) }, { q: M(B[0]), m: 1, a: M(B[1]) }] };
    } },
    { d: [2, 3], f: function () { // identity equation sec^2 = 1 + tan^2
      var E = pick([
        ['2\\tan^2 x + \\sec x = 1', '2(\\sec^2 x - 1) + \\sec x - 1 = 0 \\Rightarrow (2\\sec x + 3)(\\sec x - 1) = 0', '\\cos x = 1\\text{ or }\\cos x = -\\tfrac{2}{3}', [0, 131.8, 228.2]],
        ['\\csc^2 x - \\cot x = 3', '1 + \\cot^2 x - \\cot x - 3 = 0 \\Rightarrow (\\cot x - 2)(\\cot x + 1) = 0', '\\tan x = \\tfrac{1}{2}\\text{ or }\\tan x = -1', [26.6, 135, 206.6, 315]],
        ['\\sec^2 x = 3\\tan x - 1', '\\tan^2 x - 3\\tan x + 2 = 0 \\Rightarrow (\\tan x - 1)(\\tan x - 2) = 0', '\\tan x = 1\\text{ or }\\tan x = 2', [45, 63.4, 225, 243.4]]]);
      return q1('Solve, for ' + M('0 \\le x < 360^\\circ') + ', ' + M(E[0]) + '. Give your answers to 1 decimal place where appropriate.', 6, M(E[1]) + ', so ' + M(E[2]) + ': ' + M('x = ' + E[3].map(function (v) { return v + '^\\circ'; }).join(',\\ ')));
    } },
    { d: [2, 3], f: function () { // prove identity
      var P = pick([
        ['\\frac{1 + \\tan^2 x}{\\tan x} \\equiv \\sec x \\csc x', '\\frac{\\sec^2 x}{\\tan x} = \\frac{1}{\\cos^2 x} \\cdot \\frac{\\cos x}{\\sin x} = \\sec x\\csc x'],
        ['\\csc^2 x - \\cot^2 x \\equiv 1', '1 + \\cot^2 x - \\cot^2 x = 1'],
        ['\\frac{\\cos x}{1 - \\sin x} + \\frac{\\cos x}{1 + \\sin x} \\equiv 2\\sec x', '\\frac{2\\cos x}{1 - \\sin^2 x} = \\frac{2\\cos x}{\\cos^2 x} = 2\\sec x'],
        ['\\sec^4 x - \\tan^4 x \\equiv \\sec^2 x + \\tan^2 x', '(\\sec^2 x - \\tan^2 x)(\\sec^2 x + \\tan^2 x) = 1 \\times (\\sec^2 x + \\tan^2 x)']]);
      return q1('Prove that ' + M(P[0]) + '.', 4, M(P[1]));
    } },
    { d: [2], f: function () { // arcsin graph / inverse
      var k = pick([0.5, -0.5, 1, -1, 0]);
      var v = { '0.5': '\\frac{\\pi}{6}', '-0.5': '-\\frac{\\pi}{6}', '1': '\\frac{\\pi}{2}', '-1': '-\\frac{\\pi}{2}', '0': '0' }[String(k)];
      return { stem: '', parts: [
        { q: 'Write down the domain and range of ' + M('y = \\arcsin x') + '.', m: 2, a: 'Domain ' + M('-1 \\le x \\le 1') + '; range ' + M('-\\frac{\\pi}{2} \\le y \\le \\frac{\\pi}{2}') },
        { q: 'Find the exact value of ' + M('\\arcsin(' + k + ')') + '.', m: 1, a: M(v) }
      ] };
    } }
  ]) });

  /* ---------------- Compound angles and R-formula ---------------- */
  BS.topic({ id: 'a2-trigadd', name: 'Addition and double-angle formulae; R cos(x − α)', video: 'A level maths addition formulae double angle R cos', gens: [
    { d: [1, 2], f: function () { // exact compound angle
      var E = pick([['\\sin 75^\\circ', '\\frac{\\sqrt{6} + \\sqrt{2}}{4}', '\\sin(45 + 30)'], ['\\cos 15^\\circ', '\\frac{\\sqrt{6} + \\sqrt{2}}{4}', '\\cos(45 - 30)'], ['\\cos 75^\\circ', '\\frac{\\sqrt{6} - \\sqrt{2}}{4}', '\\cos(45 + 30)'], ['\\sin 15^\\circ', '\\frac{\\sqrt{6} - \\sqrt{2}}{4}', '\\sin(45 - 30)'], ['\\tan 75^\\circ', '2 + \\sqrt{3}', '\\tan(45 + 30)']]);
      return q1('Use an addition formula to find the exact value of ' + M(E[0]) + '.', 3, M(E[0] + ' = ' + E[2] + ' = ' + E[1]));
    } },
    { d: [2, 3], f: function () { // double angle equation
      var E = pick([
        ['\\cos 2x = \\sin x', '1 - 2\\sin^2 x = \\sin x \\Rightarrow (2\\sin x - 1)(\\sin x + 1) = 0', [30, 150, 270]],
        ['\\sin 2x = \\sin x', '\\sin x(2\\cos x - 1) = 0', [0, 60, 180, 300]],
        ['\\cos 2x + \\cos x = 0', '2\\cos^2 x + \\cos x - 1 = 0 \\Rightarrow (2\\cos x - 1)(\\cos x + 1) = 0', [60, 180, 300]],
        ['3\\cos 2x + \\sin x + 1 = 0', '6\\sin^2 x - \\sin x - 4 = 0', [-1]]]);
      if (E[2][0] === -1) E = ['2\\sin 2x = \\cos x', '\\cos x(4\\sin x - 1) = 0', [14.5, 90, 165.5, 270]];
      return q1('Solve, for ' + M('0 \\le x < 360^\\circ') + ', ' + M(E[0]) + '.', 5, M(E[1]) + ', so ' + M('x = ' + E[2].map(function (v) { return v + '^\\circ'; }).join(',\\ ')));
    } },
    { d: [2, 3], f: function () { // R cos(x - a)
      var t = pick([[3, 4], [4, 3], [5, 12], [12, 5], [1, 1], [1, 2], [2, 1], [7, 24]]), a = t[0], b = t[1], R = Math.hypot(a, b), al = deg(Math.atan2(b, a)), k = pick([1, 2, 3]);
      return { stem: '', parts: [
        { q: 'Express ' + M(c1(a, '\\cos x') + ' + ' + c1(b, '\\sin x')) + ' in the form ' + M('R\\cos(x - \\alpha)') + ', where ' + M('R > 0') + ' and ' + M('0 < \\alpha < 90^\\circ') + '. Give ' + M('\\alpha') + ' to 2 decimal places.', m: 3, a: M('R = ' + (Number.isInteger(R) ? R : '\\sqrt{' + (a * a + b * b) + '}') + ',\\ \\tan\\alpha = \\frac{' + b + '}{' + a + '} \\Rightarrow \\alpha = ' + al.toFixed(2) + '^\\circ') },
        { q: 'Hence find the maximum value of ' + M(c1(a, '\\cos x') + ' + ' + c1(b, '\\sin x') + ' + ' + k) + ' and the smallest positive value of ' + M('x') + ' at which it occurs.', m: 2, a: 'Maximum ' + M(Number.isInteger(R) ? String(R + k) : '\\sqrt{' + (a * a + b * b) + '} + ' + k) + ' at ' + M('x = ' + al.toFixed(2) + '^\\circ') },
        { q: 'Solve ' + M(c1(a, '\\cos x') + ' + ' + c1(b, '\\sin x') + ' = ' + (Number.isInteger(R) ? R / 2 : 1)) + ' for ' + M('0 \\le x < 360^\\circ') + ', to 1 decimal place.', m: 4, a: (function () { var c = (Number.isInteger(R) ? R / 2 : 1) / R, b0 = deg(Math.acos(c)), s = [al + b0, al - b0].map(function (v) { return ((v % 360) + 360) % 360; }).sort(function (x, y) { return x - y; }); return M('x = ' + s.map(function (v) { return v.toFixed(1) + '^\\circ'; }).join(',\\ ')); })() }
      ] };
    } },
    { d: [3], f: function () { // prove identity with double angle
      var P = pick([
        ['\\frac{\\sin 2x}{1 + \\cos 2x} \\equiv \\tan x', '\\frac{2\\sin x\\cos x}{2\\cos^2 x} = \\tan x'],
        ['\\frac{1 - \\cos 2x}{\\sin 2x} \\equiv \\tan x', '\\frac{2\\sin^2 x}{2\\sin x\\cos x} = \\tan x'],
        ['\\cos^4 x - \\sin^4 x \\equiv \\cos 2x', '(\\cos^2 x - \\sin^2 x)(\\cos^2 x + \\sin^2 x) = \\cos 2x'],
        ['\\sin 3x \\equiv 3\\sin x - 4\\sin^3 x', '\\sin(2x + x) = 2\\sin x\\cos^2 x + (1 - 2\\sin^2 x)\\sin x = 3\\sin x - 4\\sin^3 x']]);
      return q1('Prove that ' + M(P[0]) + '.', 4, M(P[1]));
    } }
  ] });

  /* ---------------- Parametric equations ---------------- */
  BS.topic({ id: 'a2-parametric', name: 'Parametric equations', video: 'A level maths parametric equations', gens: [
    { d: [1, 2], f: function () { // convert to Cartesian (polynomial)
      var a = ri(1, 4), b = nz(-5, 5), c = nz(-3, 3);
      return q1('A curve has parametric equations ' + M('x = ' + poly([a, b], 't') + ',\\ y = ' + poly([1, 0, c], 't')) + '. Find a Cartesian equation of the curve in the form ' + M('y = f(x)') + '.', 3,
        M('t = \\frac{x' + sg(-b) + '}{' + a + '} \\Rightarrow y = \\left(\\frac{x' + sg(-b) + '}{' + a + '}\\right)^2' + sg(c)));
    } },
    { d: [2], f: function () { // circle param with diagram
      var a = ri(-3, 3), b = ri(-3, 3), r = ri(2, 5);
      var pl = D.plane({ xmin: a - r - 2, xmax: a + r + 2, ymin: b - r - 2, ymax: b + r + 2, w: 280, h: 280 });
      var s = pl.svg + paramPath(pl, function (t) { return a + r * Math.cos(t); }, function (t) { return b + r * Math.sin(t); }, 0, 2 * Math.PI);
      return { stem: 'The curve ' + M('C') + ' has parametric equations ' + M('x = ' + (a ? a + ' + ' : '') + r + '\\cos t,\\ y = ' + (b ? b + ' + ' : '') + r + '\\sin t') + ', ' + M('0 \\le t < 2\\pi') + '.' + svgOf(pl, s, 'Parametric circle'), parts: [
        { q: 'Find a Cartesian equation of ' + M('C') + '.', m: 3, a: M((a ? br(1, -a) : 'x') + '^2 + ' + (b ? br(1, -b).replace('x', 'y') : 'y') + '^2 = ' + r * r) },
        { q: 'Describe the curve.', m: 1, a: 'A circle, centre ' + M(pt([a, b])) + ', radius ' + r + '.' }
      ] };
    } },
    { d: [2, 3], f: function () { // gradient of parametric curve, tangent
      var a = ri(1, 3), b = ri(1, 4), t0 = nz(-2, 2);
      var x0 = a * t0 * t0, y0 = b * t0 * t0 * t0 - t0, m = (3 * b * t0 * t0 - 1) / (2 * a * t0);
      var pl = D.plane({ xmin: -1, xmax: a * 4 + 1, ymin: -(b * 8 + 1), ymax: b * 8 + 1, w: 300, h: 280 });
      var s = pl.svg + paramPath(pl, function (t) { return a * t * t; }, function (t) { return b * t * t * t - t; }, -2, 2) + D.dot(pl.X(x0), pl.Y(y0));
      return { stem: 'The curve ' + M('C') + ' has parametric equations ' + M('x = ' + c1(a, 't^2') + ',\\ y = ' + c1(b, 't^3') + ' - t') + '. The point ' + M('P') + ' has parameter ' + M('t = ' + t0) + '.' + svgOf(pl, s, 'Parametric curve'), parts: [
        { q: 'Find ' + M('\\frac{\\mathrm{d}y}{\\mathrm{d}x}') + ' in terms of ' + M('t') + '.', m: 2, a: M('\\frac{' + 3 * b + 't^2 - 1}{' + 2 * a + 't}') },
        { q: 'Find the equation of the tangent to ' + M('C') + ' at ' + M('P') + '.', m: 3, a: M('P' + pt([x0, y0]) + ',\\ m = ' + frac(3 * b * t0 * t0 - 1, 2 * a * t0)) + '; ' + M('y' + (y0 ? sg(-y0) : '') + ' = ' + c1(frac(3 * b * t0 * t0 - 1, 2 * a * t0), '').replace(/^1$/, '').replace(/^-1$/, '-') + '(x' + sg(-x0) + ')').replace('= 0(x', '= 0 \\cdot (x') }
      ] };
    } },
    { d: [3], f: function () { // intersection with a line
      var a = ri(1, 3), t1 = nz(-3, 3), t2 = t1 + ri(1, 4); // x = a t^2, y = 2 a t (parabola y^2 = 4a x); chord through t1, t2
      if (t1 + t2 === 0) t2 = t1 + 1;
      var P1 = [a * t1 * t1, 2 * a * t1], P2 = [a * t2 * t2, 2 * a * t2], S = t1 + t2, cn = 2 * a * t1 * t2, gs = frac(2, S), lineC = cn ? (cn * S < 0 ? ' - ' : ' + ') + frac(Math.abs(cn), Math.abs(S)) : '';
      if (gs === '1') gs = ''; else if (gs === '-1') gs = '-';
      return q1('The curve ' + M('C') + ' has parametric equations ' + M('x = ' + c1(a, 't^2') + ',\\ y = ' + 2 * a + 't') + '. The line ' + M('y = ' + gs + 'x' + lineC) + ' meets ' + M('C') + ' at two points. Find the coordinates of these points.', 5,
        'Substitute: a quadratic in ' + M('t') + ' with roots ' + M('t = ' + t1 + ',\\ ' + t2) + ', giving ' + M(pt(P1) + ',\\ ' + pt(P2)));
    } }
  ] });

  /* ---------------- Differentiation ---------------- */
  BS.topic({ id: 'a2-differentiation', name: 'Differentiation: chain, product, quotient, implicit and rates of change', video: 'A level maths chain rule product rule implicit differentiation', gens: from('ib-diff-rules', [0, 1, 2]).concat([
    { d: [1, 2], f: function () { // standard derivatives
      var a = ri(2, 6), b = ri(2, 5), c = ri(2, 4);
      return { stem: 'Differentiate with respect to ' + M('x') + ':', parts: [
        { q: M('e^{' + a + 'x} + \\ln(' + b + 'x)'), m: 2, a: M(a + 'e^{' + a + 'x} + \\frac{1}{x}') },
        { q: M('\\sin ' + c + 'x\\cos x'), m: 3, a: M(c + '\\cos ' + c + 'x\\cos x - \\sin ' + c + 'x\\sin x') },
        { q: M('\\tan ' + b + 'x'), m: 1, a: M(b + '\\sec^2 ' + b + 'x') }
      ] };
    } },
    { d: [2, 3], f: function () { // quotient + stationary point
      var a = ri(1, 3);
      return { stem: M('f(x) = \\frac{e^{' + c1(a, 'x') + '}}{x}') + ', ' + M('x \\ne 0') + '.', parts: [
        { q: 'Find ' + M("f'(x)") + '.', m: 3, a: M("f'(x) = \\frac{e^{" + c1(a, 'x') + '}(' + c1(a, 'x') + ' - 1)}{x^2}') },
        { q: 'Find the exact coordinates of the stationary point of ' + M('y = f(x)') + '.', m: 3, a: M('\\left(' + frac(1, a) + ',\\ ' + c1(a, 'e') + '\\right)') }
      ] };
    } },
    { d: [2, 3], f: function () { // implicit differentiation
      var a = ri(1, 4), b = ri(1, 4), P = [nz(-3, 3), nz(-3, 3)], c = P[0] * P[0] + a * P[0] * P[1] + b * P[1] * P[1];
      // x^2 + a xy + b y^2 = c ; dy/dx = -(2x + a y)/(a x + 2 b y)
      var num_ = -(2 * P[0] + a * P[1]), den = a * P[0] + 2 * b * P[1];
      if (den === 0) { P = [1, 1]; c = 1 + a + b; num_ = -(2 + a); den = a + 2 * b; }
      return { stem: 'A curve has equation ' + M('x^2 + ' + c1(a, 'xy') + ' + ' + c1(b, 'y^2') + ' = ' + c) + '.', parts: [
        { q: 'Find ' + M('\\frac{\\mathrm{d}y}{\\mathrm{d}x}') + ' in terms of ' + M('x') + ' and ' + M('y') + '.', m: 4, a: M('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = -\\frac{2x + ' + c1(a, 'y') + '}{' + c1(a, 'x') + ' + ' + c1(2 * b, 'y') + '}') },
        { q: 'Find the gradient of the curve at ' + M(pt(P)) + '.', m: 1, a: M(frac(num_, den)) }
      ] };
    } },
    { d: [2, 3], f: function () { // connected rates
      var r = ri(2, 8), k = ri(2, 9);
      return q1('A spherical balloon is inflated at a rate of ' + k + ' cm³ s⁻¹. Find the rate at which the radius is increasing when the radius is ' + r + ' cm. [' + M('V = \\tfrac{4}{3}\\pi r^3') + ']', 4,
        M('\\frac{\\mathrm{d}r}{\\mathrm{d}t} = \\frac{' + k + '}{4\\pi(' + r + ')^2} = ' + s3(k / (4 * Math.PI * r * r))) + ' cm s⁻¹');
    } },
    { d: [2, 3], f: function () { // convex / concave and points of inflection
      var a = ri(1, 3), b = nz(-6, 6); // f = x^3 - 3a x^2 + b x : f'' = 6x - 6a
      return { stem: M('f(x) = x^3 - ' + 3 * a + 'x^2' + tc(b, 'x')) + '.', parts: [
        { q: 'Find the interval on which ' + M('f') + ' is concave.', m: 3, a: M("f''(x) = 6x - " + 6 * a + ' \\le 0 \\Rightarrow x \\le ' + a) },
        { q: 'Find the coordinates of the point of inflection.', m: 2, a: M(pt([a, a * a * a - 3 * a * a * a + b * a])) }
      ] };
    } }
  ]) });

  /* ---------------- Numerical methods ---------------- */
  BS.topic({ id: 'a2-numerical', name: 'Numerical methods: change of sign, iteration and Newton–Raphson', video: 'A level maths Newton Raphson iteration', gens: [
    { d: [1, 2], f: function () { // change of sign
      var f = function (x) { return x * x * x - 2 * x - 5; }, a = 2, b = 3;
      var c = pick([[1, -3, 1, 2], [1, 0, -4, 1], [1, -1, -1, -3], [2, 0, -5, 1]]), F = function (x) { return c[0] * x * x * x + c[1] * x * x + c[2] * x + c[3]; };
      var lo = null; for (var x = -4; x < 4; x += 0.1) { if (F(x) * F(x + 0.1) < 0) { lo = Math.round(x * 10) / 10; break; } }
      var A_ = Math.floor(lo), B_ = A_ + 1; if (F(A_) * F(B_) > 0) { A_ = lo; B_ = Math.round((lo + 0.1) * 10) / 10; }
      return q1('Show that the equation ' + M(poly(c) + ' = 0') + ' has a root between ' + M('x = ' + num(A_)) + ' and ' + M('x = ' + num(B_)) + '.', 2,
        M('f(' + num(A_) + ') = ' + s3(F(A_)) + ',\\ f(' + num(B_) + ') = ' + s3(F(B_))) + '. There is a change of sign and ' + M('f') + ' is continuous, so there is a root in the interval.');
    } },
    { d: [2], f: function () { // iteration
      var c = ri(2, 6), x0 = ri(1, 2), g_ = function (x) { return Math.cbrt(c * x + 1); }, xs = [x0]; for (var i = 0; i < 3; i++) xs.push(g_(xs[i]));
      return { stem: 'The equation ' + M('x^3 - ' + c + 'x - 1 = 0') + ' has a positive root ' + M('\\alpha') + '.', parts: [
        { q: 'Show that the equation can be written as ' + M('x = \\sqrt[3]{' + c + 'x + 1}') + '.', m: 1, a: 'Rearrange: ' + M('x^3 = ' + c + 'x + 1') + ' and take cube roots.' },
        { q: 'Use ' + M('x_{n+1} = \\sqrt[3]{' + c + 'x_n + 1}') + ' with ' + M('x_0 = ' + x0) + ' to find ' + M('x_1') + ', ' + M('x_2') + ' and ' + M('x_3') + ' to 4 decimal places.', m: 3, a: M(xs.slice(1).map(function (v) { return v.toFixed(4); }).join(',\\ ')) }
      ] };
    } },
    { d: [2, 3], f: function () { // Newton-Raphson
      var c = pick([2, 3, 5, 6, 7, 9, 10, 11, 12, 15, 20]), x0 = Math.round(Math.cbrt(c) * 2) / 2, f = function (x) { return x * x * x - c; }, fp = function (x) { return 3 * x * x; }, x1 = x0 - f(x0) / fp(x0);
      return q1('Use the Newton–Raphson method with ' + M('x_0 = ' + x0) + ' to find a second approximation, ' + M('x_1') + ', to the root of ' + M('x^3 - ' + c + ' = 0') + '. Give your answer to 3 decimal places.', 4,
        M('x_1 = ' + x0 + ' - \\frac{' + x0 + '^3 - ' + c + '}{3(' + x0 + ')^2} = ' + x1.toFixed(3)));
    } }
  ] });

  /* ---------------- Integration ---------------- */
  BS.topic({ id: 'a2-integration', name: 'Integration: standard results, substitution, parts, partial fractions and differential equations', video: 'A level maths integration by parts substitution', gens: from('ib-integration', [3]).concat([
    { d: [1, 2], f: function () { // standard results
      var a = ri(2, 6), b = ri(2, 5), c = ri(2, 4), d = nz(-5, 5);
      return { stem: 'Find', parts: [
        { q: M('\\displaystyle\\int e^{' + a + 'x}\\,\\mathrm{d}x'), m: 1, a: M('\\frac{1}{' + a + '}e^{' + a + 'x} + c') },
        { q: M('\\displaystyle\\int \\frac{' + b + '}{' + c + 'x' + sg(d) + '}\\,\\mathrm{d}x'), m: 2, a: M(frac(b, c).replace(/^1$/, '') + '\\ln|' + c + 'x' + sg(d) + '| + c') },
        { q: M('\\displaystyle\\int \\sin ' + c + 'x\\,\\mathrm{d}x'), m: 1, a: M('-\\frac{1}{' + c + '}\\cos ' + c + 'x + c') }
      ] };
    } },
    { d: [2, 3], f: function () { // by parts
      var a = ri(2, 4);
      var E = pick([
        ['x e^{' + a + 'x}', '\\frac{x}{' + a + '}e^{' + a + 'x} - \\frac{1}{' + a * a + '}e^{' + a + 'x} + c'],
        ['x\\cos ' + a + 'x', '\\frac{x}{' + a + '}\\sin ' + a + 'x + \\frac{1}{' + a * a + '}\\cos ' + a + 'x + c'],
        ['x\\ln x', '\\frac{x^2}{2}\\ln x - \\frac{x^2}{4} + c']]);
      return q1('Use integration by parts to find ' + M('\\displaystyle\\int ' + E[0] + '\\,\\mathrm{d}x') + '.', 4, M(E[1]));
    } },
    { d: [2, 3], f: function () { // substitution definite
      var a = ri(1, 3), n = ri(2, 4), top = ri(1, 2);
      // ∫_0^top x (a x^2 + 1)^n dx = [ (a x^2 + 1)^{n+1} / (2a(n+1)) ]
      var val = (Math.pow(a * top * top + 1, n + 1) - 1) / (2 * a * (n + 1));
      return q1('Use the substitution ' + M('u = ' + c1(a, 'x^2') + ' + 1') + ' to find the exact value of ' + M('\\displaystyle\\int_0^{' + top + '} x(' + c1(a, 'x^2') + ' + 1)^{' + n + '}\\,\\mathrm{d}x') + '.', 5,
        M('\\frac{1}{' + 2 * a + '}\\int_1^{' + (a * top * top + 1) + '} u^{' + n + '}\\,\\mathrm{d}u = ' + frac(Math.pow(a * top * top + 1, n + 1) - 1, 2 * a * (n + 1))));
    } },
    { d: [2, 3], f: function () { // partial fractions integral
      var a = ri(1, 3), b = a + ri(1, 3), A = ri(1, 4), B = ri(1, 4), lo = 0, hi = ri(1, 3);
      return q1('Find the exact value of ' + M('\\displaystyle\\int_0^{' + hi + '} \\left(\\frac{' + A + '}{x + ' + a + '} + \\frac{' + B + '}{x + ' + b + '}\\right)\\mathrm{d}x') + ', giving your answer in the form ' + M('\\ln k') + '.', 4,
        M('\\left[' + A + '\\ln(x + ' + a + ') + ' + B + '\\ln(x + ' + b + ')\\right]_0^{' + hi + '} = \\ln\\frac{' + Math.pow(hi + a, A) * Math.pow(hi + b, B) + '}{' + Math.pow(a, A) * Math.pow(b, B) + '}'));
    } },
    { d: [2, 3], f: function () { // separable DE
      var k = ri(2, 6) / 100, y0 = ri(20, 90), t1 = ri(5, 20);
      return { stem: 'The rate of decrease of the mass, ' + M('m') + ' grams, of a substance is proportional to ' + M('m') + ': ' + M('\\frac{\\mathrm{d}m}{\\mathrm{d}t} = -km') + '. Initially ' + M('m = ' + y0) + ' and ' + M('k = ' + k) + '.', parts: [
        { q: 'Solve the differential equation to find ' + M('m') + ' in terms of ' + M('t') + '.', m: 4, a: M('\\int \\frac{1}{m}\\,\\mathrm{d}m = -\\int ' + k + '\\,\\mathrm{d}t \\Rightarrow m = ' + y0 + 'e^{-' + k + 't}') },
        { q: 'Find the mass after ' + t1 + ' days.', m: 1, a: s3(y0 * Math.exp(-k * t1)) + ' g' },
        { q: 'Find the time for the mass to halve.', m: 2, a: M('\\frac{\\ln 2}{' + k + '} = ' + s3(Math.log(2) / k)) + ' days' }
      ] };
    } },
    { d: [2, 3], f: function () { // trapezium rule with e^x or ln
      var f = pick([['\\sqrt{1 + x^3}', function (x) { return Math.sqrt(1 + x * x * x); }], ['\\ln(1 + x^2)', function (x) { return Math.log(1 + x * x); }], ['e^{-x^2}', function (x) { return Math.exp(-x * x); }]]), n = 4, h = 0.5, ys = [0, 1, 2, 3, 4].map(function (i) { return f[1](i * h); });
      var est = h / 2 * (ys[0] + ys[4] + 2 * (ys[1] + ys[2] + ys[3]));
      var pl = D.plane({ xmin: -0.2, xmax: 2.3, ymin: 0, ymax: Math.max.apply(null, ys) * 1.2 + 0.2, w: 300, h: 240 });
      var s = pl.svg; for (var i = 0; i < 4; i++) s += D.poly([[pl.X(i * h), pl.Y(0)], [pl.X(i * h), pl.Y(ys[i])], [pl.X((i + 1) * h), pl.Y(ys[i + 1])], [pl.X((i + 1) * h), pl.Y(0)]], 'shade') + D.line(pl.X(i * h), pl.Y(0), pl.X(i * h), pl.Y(ys[i]), 'thin') + D.line(pl.X(i * h), pl.Y(ys[i]), pl.X((i + 1) * h), pl.Y(ys[i + 1]), 'thin');
      s += D.line(pl.X(2), pl.Y(0), pl.X(2), pl.Y(ys[4]), 'thin');
      s += pl.curve(f[1], 0, 2.1);
      return { stem: 'The diagram shows the curve ' + M('y = ' + f[0]) + ' for ' + M('0 \\le x \\le 2') + ', with four trapezia of equal width.' + table(['x', '0', '0.5', '1', '1.5', '2'], [['y'].concat(ys.map(function (v) { return v.toFixed(4); }))]) + svgOf(pl, s, 'Trapezium rule'), parts: [
        { q: 'Use the trapezium rule with all the values in the table to estimate ' + M('\\displaystyle\\int_0^{2} ' + f[0] + '\\,\\mathrm{d}x') + '.', m: 3, a: est.toFixed(4) },
        { q: 'Explain how the estimate could be improved.', m: 1, a: 'Use more strips (smaller width).' }
      ] };
    } }
  ]) });
  var table = IB.table;

  /* ---------------- Vectors in 3D ---------------- */
  BS.topic({ id: 'a2-vectors', name: 'Vectors in three dimensions', video: 'A level maths 3D vectors', gens: from('ib-vectors', [0]).concat([
    { d: [1, 2], f: function () {
      var A = [ri(-5, 5), ri(-5, 5), ri(-5, 5)], B = [ri(-5, 5), ri(-5, 5), ri(-5, 5)], d = [B[0] - A[0], B[1] - A[1], B[2] - A[2]], L2 = d[0] * d[0] + d[1] * d[1] + d[2] * d[2];
      if (!L2) { B[0]++; d[0]++; L2 = d[0] * d[0] + d[1] * d[1] + d[2] * d[2]; }
      function v3(a) { return BS.vt(a, ['\\mathbf{i}', '\\mathbf{j}', '\\mathbf{k}']); }
      return { stem: 'The points ' + M('A') + ' and ' + M('B') + ' have position vectors ' + M(v3(A)) + ' and ' + M(v3(B)) + '.', parts: [
        { q: 'Find ' + M('\\overrightarrow{AB}') + '.', m: 1, a: M(v3(d)) },
        { q: 'Find the exact distance ' + M('AB') + '.', m: 2, a: M(surd(L2)) },
        { q: 'Find the angle between ' + M('\\overrightarrow{AB}') + ' and the ' + M('x') + '-axis.', m: 2, a: dp(deg(Math.acos(d[0] / Math.sqrt(L2))), 1) + '°' }
      ] };
    } },
    { d: [2, 3], f: function () { // forces in 3D / parallel
      var a = [nz(-4, 4), nz(-4, 4), nz(-4, 4)], k = nz(-3, 3);
      function v3(x) { return BS.vt(x, ['\\mathbf{i}', '\\mathbf{j}', '\\mathbf{k}']); }
      return q1('The vectors ' + M(v3(a)) + ' and ' + M(c1(a[0] * k, '\\mathbf{i}') + ' + p\\mathbf{j} + q\\mathbf{k}') + ' are parallel. Find ' + M('p') + ' and ' + M('q') + '.', 2, M('p = ' + a[1] * k + ',\\ q = ' + a[2] * k));
    } }
  ]) });
})(typeof window !== 'undefined' ? window : globalThis);
