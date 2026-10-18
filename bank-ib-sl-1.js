/* Byte Size — IB Mathematics: Applications and Interpretation SL (Topics 1 and 2).
   SL-only topics. Each topic reuses the HL question types that sit inside the SL syllabus and adds SL question types.
   Difficulty: 1 = Standard, 2 = Exam, 3 = Challenging. */
(function (g) {
  var BS = g.BS, D = BS.draw, IB = BS.ib;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, br = BS.br, dp = BS.dp, num = BS.num, M = BS.m;
  var s3 = IB.s3, usd = IB.usd, table = IB.table, htable = IB.htable, q1 = IB.q1;
  function hl(id, idx) { var gs = BS.topics[id].gens; return idx.map(function (i) { return gs[i]; }); }
  IB.sl = { hl: hl };
  function cv(a) { return '\\begin{pmatrix} ' + a.join(' \\\\ ') + ' \\end{pmatrix}'; }

  /* =============== TOPIC 1: NUMBER AND ALGEBRA (SL) =============== */
  BS.topic({ id: 'sl-approx', name: 'Standard form, bounds and percentage error', video: 'IB maths AI SL upper and lower bounds percentage error', gens: hl('ib-approx', [0, 1, 2]).concat([
    { d: [1, 2], f: function () { // bounds of a rectangle
      var l = ri(42, 98) / 10, w = ri(21, 59) / 10;
      var lu = l + 0.05, ll = l - 0.05, wu = w + 0.05, wl = w - 0.05;
      return { stem: 'A rectangular garden has length ' + l.toFixed(1) + ' m and width ' + w.toFixed(1) + ' m, both correct to one decimal place.', parts: [
        { q: 'Write down the lower bound and the upper bound for the length.', m: 2, a: ll.toFixed(2) + ' m and ' + lu.toFixed(2) + ' m' },
        { q: 'Find the upper bound for the area of the garden.', m: 2, a: M(lu.toFixed(2) + ' \\times ' + wu.toFixed(2) + ' = ' + (lu * wu).toFixed(4).replace(/0+$/, '')) + ' m²' },
        { q: 'Find the lower bound for the area of the garden.', m: 1, a: M(ll.toFixed(2) + ' \\times ' + wl.toFixed(2) + ' = ' + (ll * wl).toFixed(4).replace(/0+$/, '')) + ' m²' }
      ] };
    } },
    { d: [2, 3], f: function () { // standard form calculation + percentage error
      var a = ri(11, 99) / 10, k = ri(4, 9), b = ri(11, 99) / 10, j = -ri(2, 6);
      var v = a * Math.pow(10, k) * b * Math.pow(10, j), e = Math.floor(Math.log10(v)), man = v / Math.pow(10, e);
      var man3 = Number(man.toPrecision(3)), e3 = e; if (man3 >= 10) { man3 = 1; e3++; }
      var rounded = Number(man.toPrecision(1)) * Math.pow(10, e), pe = Math.abs(rounded - v) / v * 100;
      if (pe < 0.05) { a += 0.1; return BS.topics['sl-approx'].gens[4].f(); }
      return { stem: M('p = (' + a + ' \\times 10^{' + k + '}) \\times (' + b + ' \\times 10^{' + j + '})') + '.', parts: [
        { q: 'Find the value of ' + M('p') + '. Give your answer in the form ' + M('a \\times 10^{k}') + ', where ' + M('1 \\le a < 10') + ' and ' + M('k \\in \\mathbb{Z}') + ', correct to three significant figures.', m: 2, a: M(man3.toFixed(2) + ' \\times 10^{' + e3 + '}') },
        { q: 'Jo rounds ' + M('p') + ' to one significant figure. Find the percentage error in Jo’s value.', m: 2, a: M('\\left|\\frac{' + BS.sf(rounded, 1) + ' - ' + s3(v) + '}{' + s3(v) + '}\\right| \\times 100\\% = ' + s3(pe) + '\\%') }
      ] };
    } },
    { d: [1], f: function () { // rounding
      var x = ri(100000, 999999) / 1000;
      return { stem: M('x = ' + x.toFixed(3)), parts: [
        { q: 'Write down ' + M('x') + ' correct to one decimal place.', m: 1, a: x.toFixed(1) },
        { q: 'Write down ' + M('x') + ' correct to three significant figures.', m: 1, a: BS.sf(x, 3) },
        { q: 'Write down ' + M('x') + ' in the form ' + M('a \\times 10^{k}') + ', where ' + M('1 \\le a < 10') + ' and ' + M('k \\in \\mathbb{Z}') + '.', m: 1, a: M((x / 100).toFixed(5).replace(/0+$/, '') + ' \\times 10^{2}') }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-seq', name: 'Arithmetic and geometric sequences and series', video: 'IB maths AI SL arithmetic and geometric sequences', gens: hl('ib-arith', [0, 1, 2]).concat(hl('ib-geom', [0, 1])).concat([
    { d: [1], f: function () { // arithmetic: which term
      var u1 = ri(3, 30), d = ri(3, 9), n = ri(20, 60), un = u1 + (n - 1) * d;
      return { stem: 'An arithmetic sequence has first term ' + u1 + ' and common difference ' + d + '.', parts: [
        { q: 'Find the 10th term.', m: 2, a: M('u_{10} = ' + u1 + ' + 9 \\times ' + d + ' = ' + (u1 + 9 * d)) },
        { q: 'Find the value of ' + M('n') + ' for which ' + M('u_n = ' + un) + '.', m: 2, a: M(u1 + ' + (n - 1)' + d + ' = ' + un + ' \\Rightarrow n = ' + n) },
        { q: 'Find the sum of the first ' + n + ' terms.', m: 2, a: M('S_{' + n + '} = \\frac{' + n + '}{2}(' + u1 + ' + ' + un + ') = ' + num(n * (u1 + un) / 2)) }
      ] };
    } },
    { d: [2], f: function () { // geometric from two terms
      var r = pick([2, 3, 0.5, 1.5, -2]), u1 = pick([2, 3, 4, 5, 8, 16, 32]), u2 = u1 * r, u5 = u1 * Math.pow(r, 4), S = u1 * (Math.pow(r, 10) - 1) / (r - 1);
      return { stem: 'In a geometric sequence, ' + M('u_2 = ' + num(u2)) + ' and ' + M('u_5 = ' + num(u5)) + '.', parts: [
        { q: 'Find the common ratio, ' + M('r') + '.', m: 2, a: M('r^3 = \\frac{' + num(u5) + '}{' + num(u2) + '} \\Rightarrow r = ' + num(r)) },
        { q: 'Find ' + M('u_1') + '.', m: 1, a: M('u_1 = ' + num(u1)) },
        { q: 'Find the sum of the first 10 terms.', m: 2, a: M('S_{10} = ' + (Math.abs(S - Math.round(S)) < 1e-9 ? num(Math.round(S)) : s3(S))) }
      ] };
    } },
    { d: [3], f: function () { // two salary schemes
      var a1 = ri(30, 40) * 1000, d = ri(10, 20) * 100, a2 = a1 - ri(1, 4) * 1000, r = pick([1.04, 1.05, 1.06]), n = 0, ua, ug;
      do { n++; ua = a1 + (n - 1) * d; ug = a2 * Math.pow(r, n - 1); } while (ug <= ua && n < 60);
      var Sa = 10 * (2 * a1 + 9 * d) / 2, Sg = a2 * (Math.pow(r, 10) - 1) / (r - 1);
      return { stem: 'Kai is offered a job with two salary options. Option A: ' + usd(a1).replace('.00', '') + ' in the first year, increasing by ' + usd(d).replace('.00', '') + ' each year. Option B: ' + usd(a2).replace('.00', '') + ' in the first year, increasing by ' + Math.round((r - 1) * 100) + '% each year.', parts: [
        { q: 'Find the salary in the 10th year for each option.', m: 3, a: 'A: ' + usd(a1 + 9 * d) + '; B: ' + usd(a2 * Math.pow(r, 9)) },
        { q: 'Find the total amount earned over the first 10 years for each option.', m: 3, a: 'A: ' + usd(Sa) + '; B: ' + usd(Sg) },
        { q: 'Find the first year in which the salary from Option B is greater than the salary from Option A.', m: 2, a: 'Year ' + n }
      ] };
    } },
    { d: [1, 2], f: function () { // sigma notation
      var a = ri(2, 7), b = nz(-6, 9), n = ri(12, 40), first = a + b, last = a * n + b, S = n * (first + last) / 2;
      return { stem: 'Consider ' + M('\\displaystyle\\sum_{k=1}^{' + n + '} (' + poly([a, b], 'k') + ')') + '.', parts: [
        { q: 'Write down the first three terms of the series.', m: 2, a: M(first + ',\\ ' + (first + a) + ',\\ ' + (first + 2 * a)) },
        { q: 'Find the value of the sum.', m: 2, a: M('\\frac{' + n + '}{2}(' + first + ' + ' + last + ') = ' + num(S)) }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-finance', name: 'Financial mathematics: interest, inflation, depreciation and loans', video: 'IB maths AI SL compound interest TVM solver', gens: hl('ib-finance', [0, 1, 2]).concat([
    { d: [2], f: function () { // real value with inflation
      var P = ri(20, 90) * 100, i = pick([3, 3.5, 4, 4.5, 5]), inf = pick([1.5, 2, 2.5, 3]), n = ri(5, 12);
      var FV = P * Math.pow(1 + i / 100, n), real = FV / Math.pow(1 + inf / 100, n);
      return { stem: 'Sofia invests ' + usd(P) + ' in an account that pays ' + i + '% interest per year, compounded annually.', parts: [
        { q: 'Find the value of the investment after ' + n + ' years.', m: 2, a: usd(FV) },
        { q: 'The annual inflation rate is ' + inf + '% over this period. Find the real value of the investment after ' + n + ' years, in today’s money.', m: 2, a: M('\\frac{' + FV.toFixed(2) + '}{' + (1 + inf / 100) + '^{' + n + '}}') + ' = ' + usd(real) },
        { q: 'Find the real annual rate of interest, as a percentage.', m: 2, a: s3(((1 + i / 100) / (1 + inf / 100) - 1) * 100) + '% (approximately ' + (i - inf) + '%)' }
      ] };
    } },
    { d: [1], f: function () { // straight compound depreciation table
      var C = ri(12, 40) * 1000, r = pick([10, 12, 15, 20]), v = function (n) { return C * Math.pow(1 - r / 100, n); };
      return { stem: 'A machine costs ' + usd(C) + '. Its value depreciates by ' + r + '% each year.', parts: [
        { q: 'Write down the value of the machine after one year.', m: 1, a: usd(v(1)) },
        { q: 'Find the value of the machine after 5 years.', m: 2, a: usd(v(5)) },
        { q: 'Find the total depreciation over the 5 years.', m: 1, a: usd(C - v(5)) }
      ] };
    } },
    { d: [3], f: function () { // annuity: regular withdrawals
      var PV = ri(10, 40) * 10000, i = pick([3, 3.6, 4, 4.8, 6]), yrs = ri(10, 25), rm = i / 1200, n = yrs * 12;
      var pmt = PV * rm / (1 - Math.pow(1 + rm, -n));
      return { stem: 'Leo retires with ' + usd(PV) + ' in a fund that pays a nominal annual interest rate of ' + i + '%, compounded monthly. He withdraws the same amount at the end of every month, so that the fund runs out after exactly ' + yrs + ' years.', parts: [
        { q: 'Find the amount of each monthly withdrawal.', m: 3, a: usd(pmt) + ' (TVM: N = ' + n + ', I% = ' + i + ', PV = −' + PV + ', FV = 0, P/Y = C/Y = 12)' },
        { q: 'Find the total amount Leo withdraws.', m: 1, a: usd(pmt * n) },
        { q: 'Find the total interest Leo earns.', m: 1, a: usd(pmt * n - PV) }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-logs', name: 'Exponents and logarithms', video: 'IB maths AI SL logarithms base 10 and e', gens: hl('ib-logs', [0]).concat([
    { d: [1], f: function () { // laws of exponents (integer)
      var a = ri(2, 5), m = ri(2, 6), b = ri(2, 4), n = ri(2, 4), c = ri(2, 6), p = ri(1, 5);
      return { stem: '', parts: [
        { q: 'Simplify ' + M('(' + a + 'x^{' + m + '})^{' + b + '}') + '.', m: 2, a: M(Math.pow(a, b) + 'x^{' + m * b + '}') },
        { q: 'Simplify ' + M('\\frac{' + c * n + 'x^{' + (p + 3) + '}y^{2}}{' + n + 'x^{' + p + '}y^{5}}') + '.', m: 2, a: M('\\frac{' + (c === 1 ? '' : c) + 'x^{3}}{y^{3}}') + ' or ' + M(c + 'x^{3}y^{-3}') }
      ] };
    } },
    { d: [1, 2], f: function () { // pH
      var h = ri(11, 99) / 10, k = ri(3, 9), H = h * Math.pow(10, -k), pH = -Math.log10(H), pH2 = ri(20, 120) / 10, H2 = Math.pow(10, -pH2);
      return { stem: 'The pH of a solution is given by ' + M('\\text{pH} = -\\log_{10}[\\text{H}^+]') + ', where ' + M('[\\text{H}^+]') + ' is the concentration of hydrogen ions in moles per litre.', parts: [
        { q: 'Find the pH of a solution with ' + M('[\\text{H}^+] = ' + h + ' \\times 10^{-' + k + '}') + '.', m: 2, a: s3(pH) },
        { q: 'A second solution has pH ' + pH2.toFixed(1) + '. Find ' + M('[\\text{H}^+]') + ' for this solution. Give your answer in the form ' + M('a \\times 10^{k}') + '.', m: 2, a: M('10^{-' + pH2.toFixed(1) + '} = ' + (H2 / Math.pow(10, Math.floor(Math.log10(H2)))).toFixed(2) + ' \\times 10^{' + Math.floor(Math.log10(H2)) + '}') }
      ] };
    } },
    { d: [2], f: function () { // decibels
      var L1 = 10 * ri(5, 9), d = pick([10, 20, 30]), ratio = Math.pow(10, d / 10);
      return { stem: 'The loudness, ' + M('L') + ' decibels, of a sound of intensity ' + M('I') + ' is ' + M('L = 10\\log_{10}\\left(\\frac{I}{I_0}\\right)') + ', where ' + M('I_0 = 10^{-12}') + ' W m⁻².', parts: [
        { q: 'Find the loudness of a sound with intensity ' + M('10^{-' + (12 - L1 / 10).toFixed(0) + '}') + ' W m⁻².', m: 2, a: M('10\\log_{10}(10^{' + Math.round(L1 / 10) + '}) = ' + Math.round(L1 / 10) * 10) + ' dB' },
        { q: 'A second sound is ' + d + ' dB louder than the first. Find how many times greater its intensity is.', m: 2, a: M('10^{' + d / 10 + '} = ' + num(ratio)) + ' times' }
      ] };
    } },
    { d: [2, 3], f: function () { // solve exponential with logs/GDC
      var P0 = ri(20, 90) * 100, r = pick([2, 2.5, 3, 4, 5]), T = P0 * pick([2, 3, 1.5]), t = Math.log(T / P0) / Math.log(1 + r / 100), k = ri(5, 9) / 100, half = Math.log(2) / k;
      return { stem: 'The population of a town is modelled by ' + M('P = ' + P0 + ' \\times ' + (1 + r / 100) + '^{t}') + ', where ' + M('t') + ' is the number of years after 2020.', parts: [
        { q: 'Find the population in 2030.', m: 2, a: num(Math.round(P0 * Math.pow(1 + r / 100, 10))) },
        { q: 'Find the value of ' + M('t') + ' when the population reaches ' + num(T) + '.', m: 2, a: M('t = \\frac{\\log(' + num(T / P0) + ')}{\\log ' + (1 + r / 100) + '} = ' + s3(t)) },
        { q: 'The mass of a drug in the body is modelled by ' + M('m = 50e^{-' + k + 't}') + ' mg after ' + M('t') + ' hours. Find the time taken for the mass to halve.', m: 2, a: M('e^{-' + k + 't} = 0.5 \\Rightarrow t = \\frac{\\ln 2}{' + k + '} = ' + s3(half)) + ' hours' }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-systems', name: 'Systems of equations and polynomials (technology)', video: 'IB maths AI SL solving systems of equations GDC', gens: hl('ib-systems', [0, 1, 2]).concat([
    { d: [1, 2], f: function () { // polynomial roots by GDC
      var r1 = nz(-4, 4), r2 = nz(-5, 5), p = pick([1, 2]), r3 = pick([1, 3, -1, -3]) / p; while (r2 === r1 || r2 === r3) r2 = nz(-5, 5); while (r1 === r3) r1 = nz(-4, 4); while (r2 === r1 || r2 === r3) r2 = nz(-5, 5);
      var c = [p, -p * (r1 + r2 + r3), p * (r1 * r2 + r1 * r3 + r2 * r3), -p * r1 * r2 * r3];
      var roots = [r1, r2, r3].sort(function (a, b) { return a - b; });
      return q1('Use technology to solve ' + M(poly(c) + ' = 0') + '.', 3, M('x = ' + roots.map(function (x) { return Number.isInteger(x) ? x : frac(x * p, p); }).join(',\\ ')));
    } },
    { d: [2, 3], f: function () { // three-variable word problem
      var a = ri(4, 12), b = ri(6, 15), c = ri(8, 20), n1 = [ri(1, 4), ri(1, 4), ri(1, 4)], n2 = [ri(1, 4), ri(1, 4), ri(1, 4)], n3 = [ri(1, 4), ri(1, 4), ri(1, 4)];
      var det = n1[0] * (n2[1] * n3[2] - n2[2] * n3[1]) - n1[1] * (n2[0] * n3[2] - n2[2] * n3[0]) + n1[2] * (n2[0] * n3[1] - n2[1] * n3[0]);
      if (det === 0) { n3 = [1, 2, 4]; n2 = [2, 1, 1]; n1 = [1, 1, 1]; }
      var t = function (n) { return n[0] * a + n[1] * b + n[2] * c; };
      function line(n, who) { return who + ' buys ' + n[0] + ' adult, ' + n[1] + ' student and ' + n[2] + ' family tickets for $' + t(n) + '.'; }
      return { stem: 'A cinema sells adult tickets for ' + M('\\$x') + ', student tickets for ' + M('\\$y') + ' and family tickets for ' + M('\\$z') + '. ' + line(n1, 'Ana') + ' ' + line(n2, 'Ben') + ' ' + line(n3, 'Cara'), parts: [
        { q: 'Write down a system of three equations to represent this information.', m: 3, a: M('\\begin{aligned} ' + poly([n1[0], 0]) + ' + ' + poly([n1[1], 0], 'y') + ' + ' + poly([n1[2], 0], 'z') + ' &= ' + t(n1) + ' \\\\ ' + poly([n2[0], 0]) + ' + ' + poly([n2[1], 0], 'y') + ' + ' + poly([n2[2], 0], 'z') + ' &= ' + t(n2) + ' \\\\ ' + poly([n3[0], 0]) + ' + ' + poly([n3[1], 0], 'y') + ' + ' + poly([n3[2], 0], 'z') + ' &= ' + t(n3) + ' \\end{aligned}') },
        { q: 'Find the price of each type of ticket.', m: 2, a: M('x = ' + a + ',\\ y = ' + b + ',\\ z = ' + c) }
      ] };
    } }
  ]) });

  /* =============== TOPIC 2: FUNCTIONS (SL) =============== */
  BS.topic({ id: 'sl-lines', name: 'Straight lines: gradient, equations, parallel and perpendicular', video: 'IB maths AI SL equation of a line perpendicular', gens: hl('ib-lines', [0, 1, 2]).concat([
    { d: [1], f: function () { // forms of a line
      var a = ri(1, 6), b = nz(-6, 6), c = nz(-12, 12); while (gcd(gcd(a, Math.abs(b)), Math.abs(c)) > 1 || b === 0) { b = nz(-6, 6); c = nz(-12, 12); }
      return { stem: 'The line ' + M('L') + ' has equation ' + M(poly([a, 0]) + (b < 0 ? ' - ' + (b === -1 ? '' : -b) : ' + ' + (b === 1 ? '' : b)) + 'y' + sg(c) + ' = 0') + '.', parts: [
        { q: 'Find the gradient of ' + M('L') + '.', m: 2, a: M(frac(-a, b)) },
        { q: 'Find the ' + M('y') + '-intercept of ' + M('L') + '.', m: 1, a: M(frac(-c, b)) },
        { q: 'Write down the gradient of a line perpendicular to ' + M('L') + '.', m: 1, a: M(frac(b, a)) }
      ] };
    } },
    { d: [2, 3], f: function () { // line on a grid, triangle with axes
      var m, c; do { m = nz(-3, 3) * pick([1, 0.5]); c = ri(2, 8); } while (m > 0 || -c / m > 9 || -c / m === 0 || -c / m !== Math.round(-c / m));
      var xi = -c / m, p = D.plane({ xmin: -1, xmax: 10, ymin: -1, ymax: 9, w: 300, h: 280, grid: true, ticks: true, tstep: 1 });
      var A = [0, c], B = [xi, 0], s = p.svg + p.curve(function (x) { return m * x + c; }, -1, 10) + D.dot(p.X(0), p.Y(c)) + D.dot(p.X(xi), p.Y(0)) + D.text(p.X(0) + 8, p.Y(c) - 8, 'A', { cls: 'it' }) + D.text(p.X(xi) + 6, p.Y(0) - 10, 'B', { cls: 'it' });
      return { stem: 'The diagram shows the line ' + M('L') + ', which meets the ' + M('y') + '-axis at ' + M('A') + ' and the ' + M('x') + '-axis at ' + M('B') + '.' + D.svg(300, 280, s, 'Line on a grid', true), parts: [
        { q: 'Write down the coordinates of ' + M('A') + ' and ' + M('B') + '.', m: 2, a: M('A(0,\\ ' + c + '),\\ B(' + num(xi) + ',\\ 0)') },
        { q: 'Find the equation of ' + M('L') + ' in the form ' + M('y = mx + c') + '.', m: 2, a: M('y = ' + (m === -1 ? '-' : num(m)) + 'x + ' + c) },
        { q: 'Find the area of triangle ' + M('OAB') + ', where ' + M('O') + ' is the origin.', m: 1, a: num(c * xi / 2) },
        { q: 'Find the equation of the line through ' + M('B') + ' that is perpendicular to ' + M('L') + '. Give your answer in the form ' + M('ax + by + d = 0') + ', where ' + M('a, b, d \\in \\mathbb{Z}') + '.', m: 3, a: (function () { // y = (-1/m)(x - xi)
          var mn = m === Math.round(m) ? -1 : -2, md = m === Math.round(m) ? m : 2 * m; // -1/m = mn/md
          // md*y = mn*(x - xi) -> mn x - md y - mn xi = 0
          var A_ = mn, B_ = -md, C_ = -mn * xi; if (A_ < 0) { A_ = -A_; B_ = -B_; C_ = -C_; } var k = gcd(gcd(A_, Math.abs(B_)), Math.abs(C_)) || 1;
          return M(poly([A_ / k, 0]) + (B_ < 0 ? ' - ' + (B_ / k === -1 ? '' : -B_ / k) : ' + ' + (B_ / k === 1 ? '' : B_ / k)) + 'y' + (C_ ? sg(C_ / k) : '') + ' = 0');
        })() }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-functions', name: 'Functions: domain, range and inverse', video: 'IB maths AI SL inverse functions domain range', gens: hl('ib-functions', [0]).concat([
    { d: [1], f: function () { // linear inverse
      var a = nz(-5, 6), b = nz(-9, 9), x0 = ri(-4, 6), y1 = a * ri(-3, 5) + b; while (a === 1) a = ri(2, 6);
      return { stem: M('f(x) = ' + poly([a, b])) + '.', parts: [
        { q: 'Find ' + M('f(' + x0 + ')') + '.', m: 1, a: String(a * x0 + b) },
        { q: 'Find ' + M('f^{-1}(x)') + '.', m: 2, a: M('f^{-1}(x) = \\frac{x' + sg(-b) + '}{' + a + '}') },
        { q: 'Find ' + M('f^{-1}(' + y1 + ')') + '.', m: 1, a: M(frac(y1 - b, a)) }
      ] };
    } },
    { d: [2], f: function () { // inverse as reflection, with diagram
      var a = pick([0.5, 2, 3]), b = ri(-2, 2), x1 = ri(0, 3), x2 = x1 + ri(2, 4);
      var f = function (x) { return a * x + b; }, P = [x1, f(x1)], Q = [x2, f(x2)];
      var lo = Math.min(-2, P[1], b) - 1, hi = Math.max(8, Q[1], Q[0]) + 1;
      if (hi > 14) { a = 0.5; f = function (x) { return a * x + b; }; P = [x1, f(x1)]; Q = [x2, f(x2)]; hi = 10; }
      var p = D.plane({ xmin: lo, xmax: hi, ymin: lo, ymax: hi, w: 300, h: 300, grid: true, ticks: true, tstep: 2 });
      var s = p.svg + p.curve(function (x) { return x; }, lo, hi, 'curvedash') + D.line(p.X(P[0]), p.Y(P[1]), p.X(Q[0]), p.Y(Q[1]), 'curve') + D.dot(p.X(P[0]), p.Y(P[1])) + D.dot(p.X(Q[0]), p.Y(Q[1]));
      s += D.text(p.X(Q[0]) + 6, p.Y(Q[1]) - 8, 'y = f(x)', { size: 12 }) + D.text(p.X(hi) - 4, p.Y(hi) + 14, 'y = x', { anchor: 'end', size: 12 });
      return { stem: 'The graph of ' + M('y = f(x)') + ', for ' + M(num(P[0]) + ' \\le x \\le ' + num(Q[0])) + ', is shown, together with the line ' + M('y = x') + '. The endpoints are ' + M('(' + num(P[0]) + ',\\ ' + num(P[1]) + ')') + ' and ' + M('(' + num(Q[0]) + ',\\ ' + num(Q[1]) + ')') + '.' + D.svg(300, 300, s, 'Graph of f and the line y = x', true), parts: [
        { q: 'Write down the range of ' + M('f') + '.', m: 1, a: M(num(P[1]) + ' \\le f(x) \\le ' + num(Q[1])) },
        { q: 'Write down the coordinates of the endpoints of the graph of ' + M('y = f^{-1}(x)') + '.', m: 2, a: M('(' + num(P[1]) + ',\\ ' + num(P[0]) + ')') + ' and ' + M('(' + num(Q[1]) + ',\\ ' + num(Q[0]) + ')') },
        { q: 'Write down the domain of ' + M('f^{-1}') + '.', m: 1, a: M(num(P[1]) + ' \\le x \\le ' + num(Q[1])) },
        { q: 'Describe the geometric relationship between the graphs of ' + M('f') + ' and ' + M('f^{-1}') + '.', m: 1, a: 'The graph of ' + M('f^{-1}') + ' is the reflection of the graph of ' + M('f') + ' in the line ' + M('y = x') + '.' }
      ] };
    } },
    { d: [1, 2], f: function () { // domain/range of a quadratic on an interval
      var h = ri(-2, 3), k = ri(-4, 3), a = pick([1, -1]), lo = h - ri(1, 3), hi = h + ri(2, 4), f = function (x) { return a * (x - h) * (x - h) + k; };
      var vals = [f(lo), f(hi), k], mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals);
      var tgt = a > 0 ? ri(k + 1, mx) : ri(mn, k - 1), nsol = [1, -1].map(function (e) { return h + e * Math.sqrt((tgt - k) / a); }).filter(function (x) { return x >= lo - 1e-9 && x <= hi + 1e-9; }).length;
      var p = D.plane({ xmin: lo - 1, xmax: hi + 1, ymin: Math.min(mn, 0) - 2, ymax: Math.max(mx, 0) + 2, w: 300, h: 280, grid: true, ticks: true, tstep: 1, tstepy: Math.ceil((mx - mn + 4) / 8) });
      var s = p.svg + p.curve(f, lo, hi) + D.dot(p.X(lo), p.Y(f(lo))) + D.dot(p.X(hi), p.Y(f(hi)));
      return { stem: 'The graph of ' + M('y = f(x)') + ' for ' + M(lo + ' \\le x \\le ' + hi) + ' is shown. The vertex is at ' + M('(' + h + ',\\ ' + k + ')') + '.' + D.svg(300, 280, s, 'Graph of a quadratic on an interval', true), parts: [
        { q: 'Write down the domain of ' + M('f') + '.', m: 1, a: M(lo + ' \\le x \\le ' + hi) },
        { q: 'Find the range of ' + M('f') + '.', m: 2, a: M(mn + ' \\le f(x) \\le ' + mx) },
        { q: 'Find the number of solutions of ' + M('f(x) = ' + tgt) + ' in this domain.', m: 1, a: String(nsol) }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-graphs', name: 'Graphs: key features, intersections and asymptotes', video: 'IB maths AI SL key features of graphs GDC', gens: hl('ib-graphs', [0, 1, 2]).concat([
    { d: [1, 2], f: function () { // quadratic key features
      var a = pick([1, 2, -1, -2]), r1 = ri(-4, 1), r2 = r1 + ri(2, 6), f = function (x) { return a * (x - r1) * (x - r2); }, h = (r1 + r2) / 2, k = f(h);
      var c = [a, -a * (r1 + r2), a * r1 * r2];
      var p = D.plane({ xmin: r1 - 2, xmax: r2 + 2, ymin: Math.min(k, c[2], 0) - 2, ymax: Math.max(k, c[2], 0) + 2, w: 300, h: 280, ticks: true, tstep: 1, tstepy: Math.max(1, Math.ceil(Math.abs(k - c[2]) / 6)) });
      var s = p.svg + p.curve(f, r1 - 2, r2 + 2);
      return { stem: 'Part of the graph of ' + M('f(x) = ' + poly(c)) + ' is shown.' + D.svg(300, 280, s, 'Quadratic graph', true), parts: [
        { q: 'Find the ' + M('x') + '-intercepts of the graph.', m: 2, a: M('x = ' + r1 + ',\\ x = ' + r2) },
        { q: 'Write down the ' + M('y') + '-intercept.', m: 1, a: M('(0,\\ ' + c[2] + ')') },
        { q: 'Find the equation of the axis of symmetry.', m: 1, a: M('x = ' + num(h)) },
        { q: 'Find the coordinates of the vertex.', m: 2, a: M('(' + num(h) + ',\\ ' + num(k) + ')') }
      ] };
    } },
    { d: [2, 3], f: function () { // intersection with technology
      var a = ri(1, 3), b = ri(2, 6), m = nz(-2, 2), c = ri(1, 6);
      var f = function (x) { return a * x * x - b * x; }, g2 = function (x) { return m * x + c; };
      var A = a, B = -b - m, C = -c, Dd = B * B - 4 * A * C, x1 = (-B - Math.sqrt(Dd)) / (2 * A), x2 = (-B + Math.sqrt(Dd)) / (2 * A);
      var lo = Math.floor(x1) - 1, hi = Math.ceil(x2) + 1, ys = [f(x1), f(x2), f(lo), f(hi), g2(lo), g2(hi)];
      var p = D.plane({ xmin: lo, xmax: hi, ymin: Math.min.apply(null, ys.concat([0])) - 1, ymax: Math.max.apply(null, ys.concat([0])) + 1, w: 300, h: 280, ticks: true, tstep: 1, tstepy: 2 });
      var s = p.svg + p.curve(f, lo, hi) + p.curve(g2, lo, hi, 'curvedash');
      return { stem: 'The graphs of ' + M('f(x) = ' + poly([a, -b, 0])) + ' and ' + M('g(x) = ' + poly([m, c])) + ' are shown.' + D.svg(300, 280, s, 'Two graphs intersecting', true), parts: [
        { q: 'Use technology to find the ' + M('x') + '-coordinates of the points where the graphs intersect.', m: 3, a: M('x = ' + s3(x1) + ',\\ x = ' + s3(x2)) },
        { q: 'Hence write down the solutions of ' + M(poly([a, -b, 0]) + ' = ' + poly([m, c])) + '.', m: 1, a: M('x = ' + s3(x1)) + ' or ' + M('x = ' + s3(x2)) },
        { q: 'Write down the values of ' + M('x') + ' for which ' + M('f(x) < g(x)') + '.', m: 1, a: M(s3(x1) + ' < x < ' + s3(x2)) }
      ] };
    } },
    { d: [2], f: function () { // inverse variation graph, asymptotes
      var k = ri(2, 12), c = nz(-3, 3), f = function (x) { return k / x + c; };
      var p = D.plane({ xmin: -6, xmax: 6, ymin: c - 8, ymax: c + 8, w: 300, h: 280, ticks: true, tstep: 2, tstepy: 2 });
      var s = p.svg + p.curve(f, -6, -0.05) + p.curve(f, 0.05, 6) + D.line(p.X(-6), p.Y(c), p.X(6), p.Y(c), 'dash');
      return { stem: 'The graph of ' + M('y = \\frac{' + k + '}{x}' + sg(c)) + ' is shown.' + D.svg(300, 280, s, 'Graph with asymptotes', true), parts: [
        { q: 'Write down the equation of the vertical asymptote.', m: 1, a: M('x = 0') },
        { q: 'Write down the equation of the horizontal asymptote.', m: 1, a: M('y = ' + c) },
        { q: 'Find the ' + M('x') + '-intercept of the graph.', m: 2, a: M('x = ' + frac(-k, c)) }
      ] };
    } }
  ]) });

  BS.topic({ id: 'sl-models', name: 'Modelling: linear, quadratic, exponential, variation, cubic and sinusoidal', video: 'IB maths AI SL modelling functions sinusoidal', gens: hl('ib-models', [0, 1]).concat([
    { d: [2], f: function () { // sinusoidal in degrees
      var d = ri(8, 14), a = ri(2, 5), per = pick([12, 24]), b = 360 / per, tmax = pick([3, 4, 6, 9]);
      var f = function (t) { return a * Math.cos((t - tmax) * b * Math.PI / 180) + d; };
      var p = D.plane({ xmin: 0, xmax: per, ymin: 0, ymax: d + a + 3, w: 330, h: 240, grid: true, gstep: per / 12, gstepy: 1, ticks: true, tstep: per / 6, tstepy: 2, xl: 't', yl: 'h' });
      var s = p.svg + p.curve(f, 0, per) + D.dot(p.X(tmax), p.Y(d + a)) + D.text(p.X(tmax), p.Y(d + a) - 10, '(' + tmax + ', ' + (d + a) + ')', { anchor: 'middle', size: 11 });
      var tmin = tmax + per / 2 > per ? tmax - per / 2 : tmax + per / 2;
      s += D.dot(p.X(tmin), p.Y(d - a)) + D.text(p.X(tmin), p.Y(d - a) + 14, '(' + tmin + ', ' + (d - a) + ')', { anchor: 'middle', size: 11 });
      var level = d + Math.round(a / 2), tt = tmax - Math.acos((level - d) / a) * 180 / Math.PI / b; if (tt < 0) tt += per;
      return { stem: 'The depth of water, ' + M('h') + ' metres, at a harbour ' + M('t') + ' hours after midnight is modelled by ' + M('h(t) = a\\sin(b(t - c)) + d') + ', where ' + M('b') + ' is measured in degrees. The graph of ' + M('h') + ' for ' + M('0 \\le t \\le ' + per) + ' is shown, with a maximum at ' + M('(' + tmax + ',\\ ' + (d + a) + ')') + ' and a minimum at ' + M('(' + tmin + ',\\ ' + (d - a) + ')') + '.' + D.svg(330, 240, s, 'Sinusoidal model', true), parts: [
        { q: 'Find the value of ' + M('a') + '.', m: 1, a: M('a = ' + a) },
        { q: 'Find the value of ' + M('d') + '.', m: 1, a: M('d = ' + d) },
        { q: 'Find the value of ' + M('b') + '.', m: 2, a: 'Period ' + per + ' hours, so ' + M('b = \\frac{360}{' + per + '} = ' + b) },
        { q: 'Find the length of time each day for which the depth is at least ' + level + ' m.', m: 2, a: s3(2 * (tmax - (tmax - Math.acos((level - d) / a) * 180 / Math.PI / b))) + ' hours per cycle' + (per === 12 ? ' (' + s3(4 * Math.acos((level - d) / a) * 180 / Math.PI / b) + ' hours per day)' : '') }
      ] };
    } },
    { d: [1, 2], f: function () { // quadratic projectile model
      var u = ri(12, 25), h0 = ri(1, 20), f = function (t) { return -4.9 * t * t + u * t + h0; }, tm = u / 9.8, hm = f(tm), tg = (u + Math.sqrt(u * u + 4 * 4.9 * h0)) / 9.8;
      return { stem: 'A ball is thrown upwards from the top of a building. Its height above the ground, ' + M('h') + ' metres, after ' + M('t') + ' seconds is modelled by ' + M('h(t) = -4.9t^2 + ' + u + 't + ' + h0) + '.', parts: [
        { q: 'Write down the height from which the ball is thrown.', m: 1, a: h0 + ' m' },
        { q: 'Find the maximum height of the ball.', m: 2, a: s3(hm) + ' m' },
        { q: 'Find the time when the ball hits the ground.', m: 2, a: s3(tg) + ' s' }
      ] };
    } },
    { d: [1, 2], f: function () { // direct / inverse variation
      var inv = Math.random() < 0.5, n = pick([1, 2, 3]), x0 = ri(2, 5), k = ri(2, 9), y0 = inv ? k / Math.pow(x0, n) : k * Math.pow(x0, n), x1 = x0 + ri(1, 4);
      var rel = (inv ? 'inversely' : 'directly') + ' proportional to ' + M(n === 1 ? 'x' : 'x^{' + n + '}');
      var form = inv ? 'y = \\frac{k}{' + (n === 1 ? 'x' : 'x^{' + n + '}') + '}' : 'y = k' + (n === 1 ? 'x' : 'x^{' + n + '}');
      return { stem: M('y') + ' is ' + rel + '. When ' + M('x = ' + x0) + ', ' + M('y = ' + s3(y0).replace(/\.0+$/, '')) + '.', parts: [
        { q: 'Find the value of the constant of variation, ' + M('k') + '.', m: 2, a: M(form + ' \\Rightarrow k = ' + k) },
        { q: 'Find the value of ' + M('y') + ' when ' + M('x = ' + x1) + '.', m: 2, a: s3(inv ? k / Math.pow(x1, n) : k * Math.pow(x1, n)) }
      ] };
    } },
    { d: [3], f: function () { // cubic model via GDC regression from four points (exact cubic)
      var r = [ri(1, 3), ri(5, 8)], a = -ri(1, 3), f = function (x) { return a * x * (x - r[1] - 2) * (x + 1); };
      var xs = [1, 2, 3, 4], ys = xs.map(f), coeffs = [a, -a * (r[1] + 2 - 1), -a * (r[1] + 2), 0]; // a x (x - p)(x + 1) = a(x^3 + (1-p)x^2 - p x)
      var P = r[1] + 2; coeffs = [a, a * (1 - P), -a * P, 0];
      var best = 0, bx = 0; for (var x = 0; x <= P; x += 0.001) { var v = f(x); if (v > best) { best = v; bx = x; } }
      return { stem: 'The profit, ' + M('P') + ' thousand dollars, made by a company from selling ' + M('x') + ' thousand items is modelled by a cubic function ' + M('P(x) = ax^3 + bx^2 + cx + d') + '. The table shows some values.' + table([M('x')].concat(xs.map(String)), [[M('P')].concat(ys.map(String))]) + 'It is also known that ' + M('P(0) = 0') + '.', parts: [
        { q: 'Use technology to find the values of ' + M('a') + ', ' + M('b') + ', ' + M('c') + ' and ' + M('d') + '.', m: 3, a: M('a = ' + coeffs[0] + ',\\ b = ' + coeffs[1] + ',\\ c = ' + coeffs[2] + ',\\ d = 0') },
        { q: 'Find the number of items the company should sell to maximise its profit, and the maximum profit.', m: 3, a: s3(bx) + ' thousand items; maximum profit ' + s3(best) + ' thousand dollars' },
        { q: 'Find the largest number of items the company can sell without making a loss.', m: 1, a: P + ' thousand items' }
      ] };
    } },
    { d: [2, 3], f: function () { // exponential growth from two values
      var P0 = ri(20, 80) * 10, k = ri(8, 25) / 100, t1 = ri(2, 5), P1 = Math.round(P0 * Math.exp(k * t1)), kk = Math.log(P1 / P0) / t1, T = P0 * pick([3, 4, 5]);
      return { stem: 'A population of bacteria is modelled by ' + M('N(t) = N_0 e^{kt}') + ', where ' + M('t') + ' is the time in hours. Initially there are ' + P0 + ' bacteria and after ' + t1 + ' hours there are ' + P1 + '.', parts: [
        { q: 'Write down the value of ' + M('N_0') + '.', m: 1, a: String(P0) },
        { q: 'Find the value of ' + M('k') + '.', m: 2, a: M('k = \\frac{\\ln(' + P1 + '/' + P0 + ')}{' + t1 + '} = ' + s3(kk)) },
        { q: 'Find the time taken for the population to reach ' + num(T) + '.', m: 2, a: s3(Math.log(T / P0) / kk) + ' hours' },
        { q: 'Give one reason why this model may not be suitable for large values of ' + M('t') + '.', m: 1, a: 'The model predicts unlimited growth; in reality food and space are limited.' }
      ] };
    } }
  ]) });
})(typeof window !== 'undefined' ? window : globalThis);
