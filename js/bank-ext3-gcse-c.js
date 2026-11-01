/* Byte Size Classroom — deeper extension questions (set 3c): GCSE / International GCSE algebra topics (part 2). */
(function (g) {
  var BS = g.BS, X = BS.ext;
  var ri = BS.ri, pick = BS.pick, nz = BS.nz, gcd = BS.gcd, frac = BS.frac, poly = BS.poly, sg = BS.sg, num = BS.num, M = BS.m;
  function Q(stem, parts) { return { stem: stem || '', parts: parts.map(function (p) { return { q: p[0], m: p[1], a: String(p[2]) }; }) }; }
  function sf3(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : BS.sf(x, 3); }
  function F(n, d) { return frac(n, d); }
  function c1(c, v) { return c === 1 ? v : c === -1 ? '-' + v : c + v; }
  function xm(v) { return v ? '(x' + sg(-v) + ')' : 'x'; }

  X('quadratics', [
    function () {
      var w = ri(3, 10), k = ri(2, 6), A = w * (w + k);
      return Q('A rectangle has length ' + k + ' cm more than its width and area ' + A + ' cm².', [
        ['Form and solve a quadratic equation to find its dimensions.', 3, M('x^2 + ' + k + 'x - ' + A + ' = 0') + ', ' + M('x = ' + w) + ': ' + w + ' cm by ' + (w + k) + ' cm'],
        ['Explain why one solution of the equation is rejected.', 1, 'The other root, ' + (-w - k) + ', is negative, which is impossible for a length.'],
        ['Find the length of the diagonal, in surd form if necessary.', 2, M('\\sqrt{' + (w * w + (w + k) * (w + k)) + '}') + ' cm']
      ]);
    },
    function () {
      var p = nz(-5, 5), q = ri(1, 9);
      return Q(M('y = x^2' + (2 * p ? sg(-2 * p) + 'x' : '') + sg(p * p + q)) + '.', [
        ['Write the expression in the form ' + M('(x - a)^2 + b') + '.', 2, M('(x' + sg(-p) + ')^2 + ' + q)],
        ['Write down the coordinates of the turning point and the equation of the line of symmetry.', 2, M('(' + p + ',\\ ' + q + ')') + ', ' + M('x = ' + p)],
        ['Explain how you know the graph does not cross the ' + M('x') + '-axis.', 1, 'The minimum value is ' + q + ' > 0.'],
        ['Find the values of ' + M('k') + ' for which ' + M('x^2' + (2 * p ? sg(-2 * p) + 'x' : '') + sg(p * p + q) + ' = k') + ' has two solutions.', 1, M('k > ' + q)]
      ]);
    },
    function () {
      var a = ri(2, 5), b = nz(-9, 9), c = nz(-9, 9), d = b * b - 4 * a * c;
      while (d <= 0 || Number.isInteger(Math.sqrt(d))) { c = nz(-9, 9); d = b * b - 4 * a * c; }
      return Q('', [
        ['Solve ' + M(poly([a, b, c]) + ' = 0') + ', giving exact answers in surd form.', 3, M('x = \\frac{' + (-b) + ' \\pm \\sqrt{' + d + '}}{' + 2 * a + '}')],
        ['Find the sum and the product of the two roots.', 2, M(F(-b, a)) + ' and ' + M(F(c, a))],
        ['Prove that for ' + M('ax^2 + bx + c = 0') + ' the sum of the roots is ' + M('-\\frac{b}{a}') + '.', 2, 'Add the two formula roots: the surds cancel, leaving ' + M('\\frac{-2b}{2a}')]
      ]);
    },
    function () {
      var n = ri(5, 15), S = n * (n + 1) / 2;
      return Q('The sum ' + M('1 + 2 + 3 + \\cdots + n = \\frac{n(n + 1)}{2}') + '.', [
        ['Find ' + M('n') + ' if the sum is ' + S + '.', 3, M('n^2 + n - ' + 2 * S + ' = 0') + ', ' + M('n = ' + n)],
        ['Show that no value of ' + M('n') + ' gives a sum of ' + (S + 1) + '.', 2, M('n^2 + n - ' + 2 * (S + 1) + ' = 0') + ' has discriminant ' + (1 + 8 * (S + 1)) + ', not a square number'],
        ['Find the smallest ' + M('n') + ' for which the sum exceeds 1000.', 2, M('n = 45')]
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(5, 9);
      return (function () {
        var L = 2 * ri(6, 10), W = 2 * ri(3, 5), x = ri(1, W / 2 - 1), base = (L - 2 * x) * (W - 2 * x);
        return Q('A square of side ' + M('x') + ' cm is cut from each corner of a ' + L + ' cm by ' + W + ' cm sheet of card, which is folded into an open box. The base of the box has area ' + base + ' cm².', [
          ['Show that ' + M('4x^2 - ' + 2 * (L + W) + 'x + ' + (L * W - base) + ' = 0') + '.', 3, M('(' + L + ' - 2x)(' + W + ' - 2x) = ' + base)],
          ['Solve to find ' + M('x') + ', explaining which solution is valid.', 3, M('x = ' + x) + '; the other root, ' + sf3((L + W) / 2 - x) + ', is too big for the card'],
          ['Find the volume of the box.', 1, M(base * x) + ' cm³']
        ]);
      })();
    },
    function () {
      var a = ri(2, 5), b = ri(2, 6);
      return Q('', [
        ['Solve ' + M('x^4 - ' + (a * a + b * b) + 'x^2 + ' + a * a * b * b + ' = 0') + ' by letting ' + M('y = x^2') + '.', 4, M('(y - ' + a * a + ')(y - ' + b * b + ') = 0') + ': ' + M('x = \\pm ' + a + ',\\ \\pm ' + b)],
        ['Explain why ' + M('x^4 + 5x^2 + 6 = 0') + ' has no real solutions.', 2, 'Every term is positive (or ' + M('y = -2, -3') + ' would need ' + M('x^2 < 0') + ')']
      ]);
    },
    function () {
      var k = ri(2, 12);
      return (function () {
        var c = ri(2, 9);
        return Q('Consider the equation ' + M('x^2 + kx + ' + c + ' = 0') + '.', [
          ['Find the values of ' + M('k') + ' for which the equation has equal roots.', 2, M('k^2 = ' + 4 * c) + ', ' + M('k = \\pm ' + (Number.isInteger(Math.sqrt(4 * c)) ? Math.sqrt(4 * c) : '2\\sqrt{' + c + '}'))],
          ['Find the range of values of ' + M('k') + ' for which the equation has no real roots.', 2, M('-' + (Number.isInteger(Math.sqrt(4 * c)) ? Math.sqrt(4 * c) : '2\\sqrt{' + c + '}') + ' < k < ' + (Number.isInteger(Math.sqrt(4 * c)) ? Math.sqrt(4 * c) : '2\\sqrt{' + c + '}'))],
          ['Describe what the graph of ' + M('y = x^2 + kx + ' + c) + ' looks like in each case.', 2, 'Equal roots: touches the ' + M('x') + '-axis; no roots: entirely above it']
        ]);
      })();
    },
    function () {
      var v = ri(15, 30);
      return Q('The height ' + M('h') + ' m of a firework ' + M('t') + ' s after launch is ' + M('h = ' + v + 't - 5t^2') + '.', [
        ['Find when the firework is at a height of ' + (v * v / 20 - 5).toFixed(2).replace(/\.00$/, '') + ' m.', 3, M('t = ' + sf3(v / 10 - 1) + '\\text{ or } ' + sf3(v / 10 + 1))],
        ['Explain why the two times are equally spaced either side of ' + M('t = ' + num(v / 10)) + '.', 2, 'The graph is symmetrical about the line through the maximum.'],
        ['Find the greatest height.', 1, M(num(v * v / 20)) + ' m']
      ]);
    }
  ]);

  X('rearranging', [
    function () {
      var a = ri(2, 6), b = ri(1, 9);
      return Q('', [
        ['Make ' + M('x') + ' the subject of ' + M('y = \\frac{' + a + 'x + ' + b + '}{x - 1}') + '.', 4, M('x = \\frac{y + ' + b + '}{y - ' + a + '}')],
        ['Hence explain why ' + M('y') + ' can never equal ' + a + '.', 1, 'The denominator ' + M('y - ' + a) + ' would be zero.'],
        ['What does this mean for the graph of ' + M('y = \\frac{' + a + 'x + ' + b + '}{x - 1}') + '?', 1, 'It has a horizontal asymptote ' + M('y = ' + a)]
      ]);
    },
    function () {
      return Q('The surface area of a cylinder is ' + M('A = 2\\pi r^2 + 2\\pi rh') + '.', [
        ['Make ' + M('h') + ' the subject.', 2, M('h = \\frac{A - 2\\pi r^2}{2\\pi r}')],
        ['Explain why ' + M('r') + ' cannot easily be made the subject.', 2, 'It appears squared and not squared: it gives a quadratic in ' + M('r')],
        ['Find ' + M('r') + ' when ' + M('A = 100\\pi') + ' and ' + M('h = 15') + '.', 3, M('r^2 + 15r - 50 = 0') + ', ' + M('r = \\frac{-15 + \\sqrt{425}}{2} = ' + sf3((-15 + Math.sqrt(425)) / 2))]
      ]);
    },
    function () {
      var g2 = 9.8;
      return Q('The kinetic energy of an object is ' + M('E = \\frac{1}{2}mv^2') + '.', [
        ['Make ' + M('v') + ' the subject.', 2, M('v = \\sqrt{\\frac{2E}{m}}')],
        ['A ball of mass 0.5 kg has 100 J of energy. Find its speed.', 1, M('v = 20') + ' m/s'],
        ['If the energy is multiplied by 9, by what factor does the speed change?', 2, 'By 3'],
        ['An object falls from height ' + M('h') + ' so that ' + M('mgh = \\frac{1}{2}mv^2') + '. Show that the speed does not depend on the mass.', 2, M('v = \\sqrt{2gh}')]
      ]);
    },
    function () {
      var a = ri(2, 5), b = ri(2, 6); if (b === a) b++;
      return Q('', [
        ['Make ' + M('x') + ' the subject of ' + M(a + '(x - y) = ' + b + 'x + y') + '.', 3, M('x = \\frac{' + (a + 1) + 'y}{' + (a - b) + '}') + (a === b ? ' — impossible when a = b' : '')],
        ['Make ' + M('y') + ' the subject of the same formula.', 2, M('y = \\frac{' + c1(a - b, 'x') + '}{' + (a + 1) + '}')],
        ['What do you notice about the two answers?', 1, 'Each is the rearrangement of the other: ' + M('y = kx') + ' and ' + M('x = \\frac{y}{k}')]
      ]);
    },
    function () {
      return Q('The formula ' + M('F = \\frac{9}{5}C + 32') + ' converts Celsius to Fahrenheit.', [
        ['Make ' + M('C') + ' the subject.', 2, M('C = \\frac{5}{9}(F - 32)')],
        ['Find the temperature that is the same in both scales.', 2, M('C = \\frac{9}{5}C + 32') + ', ' + M('C = -40')],
        ['Explain why a change of 1°C is a change of 1.8°F.', 1, 'The gradient of the formula is ' + M('\\frac{9}{5}')]
      ]);
    },
    function () {
      var P = ri(1, 5) * 1000, r = ri(2, 6);
      return Q('Compound interest: ' + M('A = P\\left(1 + \\frac{r}{100}\\right)^n') + '.', [
        ['Make ' + M('P') + ' the subject.', 1, M('P = \\frac{A}{(1 + \\frac{r}{100})^n}')],
        ['Make ' + M('r') + ' the subject.', 3, M('r = 100\\left(\\sqrt[n]{\\frac{A}{P}} - 1\\right)')],
        ['£' + P + ' grows to £' + (P * 1.5) + ' in 10 years. Find the annual rate.', 2, M(sf3(100 * (Math.pow(1.5, 0.1) - 1)) + '\\%')]
      ]);
    },
    function () {
      var k = ri(2, 6);
      return Q('', [
        ['Make ' + M('x') + ' the subject of ' + M('\\sqrt{x + ' + k + '} = y') + '.', 2, M('x = y^2 - ' + k)],
        ['Explain why, for the original formula, ' + M('y') + ' must be at least 0.', 1, 'A square root is never negative.'],
        ['Make ' + M('x') + ' the subject of ' + M('y = \\frac{1}{\\sqrt{x}} + ' + k) + '.', 3, M('x = \\frac{1}{(y - ' + k + ')^2}')]
      ]);
    },
    function () {
      return Q('Two resistors in parallel have total resistance ' + M('R') + ' given by ' + M('\\frac{1}{R} = \\frac{1}{a} + \\frac{1}{b}') + '.', [
        ['Make ' + M('R') + ' the subject.', 2, M('R = \\frac{ab}{a + b}')],
        ['Make ' + M('a') + ' the subject.', 3, M('a = \\frac{Rb}{b - R}')],
        ['Prove that ' + M('R') + ' is always less than both ' + M('a') + ' and ' + M('b') + ' (for positive values).', 2, M('R = a \\times \\frac{b}{a + b} < a') + ' since ' + M('\\frac{b}{a + b} < 1') + '; similarly for ' + M('b')]
      ]);
    }
  ]);

  X('functions', [
    function () {
      var a = ri(2, 5), b = nz(-6, 6);
      return Q(M('\\mathrm{f}(x) = ' + a + 'x' + sg(b)) + '.', [
        ['Find ' + M('\\mathrm{ff}(x)') + ' and ' + M('\\mathrm{fff}(x)') + '.', 3, M(a * a + 'x' + sg(a * b + b)) + ', ' + M(a * a * a + 'x' + sg(a * a * b + a * b + b))],
        ['Find the value of ' + M('x') + ' for which ' + M('\\mathrm{f}(x) = x') + ', and check that it also satisfies ' + M('\\mathrm{ff}(x) = x') + '.', 2, M('x = ' + F(-b, a - 1))],
        ['Explain why applying ' + M('\\mathrm{f}') + ' repeatedly to any starting value moves further away from this point.', 1, 'Each application multiplies the distance from it by ' + a + '.']
      ]);
    },
    function () {
      var a = ri(1, 6);
      return Q(M('\\mathrm{f}(x) = x^2 + ' + a) + ' and ' + M('\\mathrm{g}(x) = \\sqrt{x - ' + a + '}') + '.', [
        ['Find ' + M('\\mathrm{gf}(x)') + ' and comment.', 2, M('\\sqrt{x^2} = |x|') + '; for ' + M('x \\ge 0') + ' it is ' + M('x')],
        ['Explain why ' + M('\\mathrm{g}') + ' is the inverse of ' + M('\\mathrm{f}') + ' only if the domain of f is restricted.', 2, 'f is many-to-one (e.g. ' + M('\\mathrm{f}(2) = \\mathrm{f}(-2)') + '); restrict to ' + M('x \\ge 0')],
        ['State the domain and range of ' + M('\\mathrm{g}') + '.', 2, 'Domain ' + M('x \\ge ' + a) + ', range ' + M('\\mathrm{g}(x) \\ge 0')]
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(1, 9);
      return Q(M('\\mathrm{f}(x) = \\frac{' + a + '}{x - ' + b + '}') + '.', [
        ['State the value of ' + M('x') + ' that must be excluded from the domain, and why.', 1, M('x = ' + b) + ': division by zero'],
        ['Find ' + M('\\mathrm{f}^{-1}(x)') + '.', 3, M('\\mathrm{f}^{-1}(x) = \\frac{' + a + '}{x} + ' + b)],
        ['Explain why ' + M('\\mathrm{f}^{-1}(x)') + ' is not defined at ' + M('x = 0') + ', and link this to the range of f.', 2, 'f never outputs 0, so 0 is not in its range, which is the domain of the inverse.']
      ]);
    },
    function () {
      var a = ri(1, 5), b = ri(2, 5);
      return Q(M('\\mathrm{f}(x) = x + ' + a) + ' and ' + M('\\mathrm{g}(x) = ' + b + 'x') + '.', [
        ['Find ' + M('\\mathrm{fg}(x)') + ' and ' + M('\\mathrm{gf}(x)') + '.', 2, M(b + 'x + ' + a) + ' and ' + M(b + 'x + ' + a * b)],
        ['Find the value of ' + M('x') + ' for which ' + M('\\mathrm{fg}(x) = \\mathrm{gf}(x)') + ', or explain why there is none.', 2, b === 1 ? 'Every value of ' + M('x') : 'None: ' + M(a + ' \\ne ' + a * b)],
        ['Find ' + M('(\\mathrm{fg})^{-1}(x)') + ' and check that it equals ' + M('\\mathrm{g}^{-1}\\mathrm{f}^{-1}(x)') + '.', 3, M('\\frac{x - ' + a + '}{' + b + '}')]
      ]);
    },
    function () {
      var k = ri(2, 5);
      return Q('A function satisfies ' + M('\\mathrm{f}(x + 1) = \\mathrm{f}(x) + ' + k) + ' for every ' + M('x') + ', and ' + M('\\mathrm{f}(0) = 3') + '.', [
        ['Find ' + M('\\mathrm{f}(1)') + ', ' + M('\\mathrm{f}(2)') + ' and ' + M('\\mathrm{f}(10)') + '.', 2, (3 + k) + ', ' + (3 + 2 * k) + ', ' + (3 + 10 * k)],
        ['Suggest a formula for ' + M('\\mathrm{f}(x)') + ' and check it satisfies the condition.', 2, M('\\mathrm{f}(x) = ' + k + 'x + 3')],
        ['Find ' + M('\\mathrm{f}^{-1}(' + (3 + 7 * k) + ')') + '.', 1, '7']
      ]);
    },
    function () {
      var a = ri(2, 5);
      return Q(M('\\mathrm{f}(x) = ' + a + ' - x') + '.', [
        ['Find ' + M('\\mathrm{f}^{-1}(x)') + '. What do you notice?', 2, M(a + ' - x') + ': f is its own inverse'],
        ['Find ' + M('\\mathrm{ff}(x)') + ', and explain the result.', 1, M('x') + ': applying a self-inverse function twice returns the input'],
        ['Find another linear function that is its own inverse, and describe its graph.', 2, 'Any ' + M('\\mathrm{f}(x) = c - x') + ': a line of gradient ' + M('-1') + ', symmetric in ' + M('y = x')]
      ]);
    },
    function () {
      return Q(M('\\mathrm{f}(x) = 2^x') + '.', [
        ['Find ' + M('\\mathrm{f}(3)') + ', ' + M('\\mathrm{f}(0)') + ' and ' + M('\\mathrm{f}(-2)') + '.', 2, '8, 1, ' + M('\\frac{1}{4}')],
        ['Solve ' + M('\\mathrm{f}(x) = 64') + ' and ' + M('\\mathrm{ff}(x) = 16') + '.', 3, M('x = 6') + '; ' + M('2^{2^x} = 16') + ', ' + M('2^x = 4') + ', ' + M('x = 2')],
        ['Explain why ' + M('\\mathrm{f}(x)') + ' can never be negative.', 1, 'A positive base raised to any power is positive.']
      ]);
    },
    function () {
      var a = ri(2, 4), b = nz(-5, 5);
      return Q(M('\\mathrm{f}(x) = ' + a + 'x' + sg(b)) + ' and ' + M('\\mathrm{g}(x) = x^2') + '.', [
        ['Solve ' + M('\\mathrm{gf}(x) = \\mathrm{fg}(x)') + '.', 4, M('(' + a + 'x' + sg(b) + ')^2 = ' + a + 'x^2' + sg(b)) + ' gives ' + M(poly([a * a - a, 2 * a * b, b * b - b]) + ' = 0') + (function () { var A = a * a - a, B = 2 * a * b, C = b * b - b, D = B * B - 4 * A * C; return D < 0 ? ': no real solutions' : ': ' + M('x = ' + sf3((-B + Math.sqrt(D)) / (2 * A)) + ',\\ ' + sf3((-B - Math.sqrt(D)) / (2 * A))); })()],
        ['Explain why ' + M('\\mathrm{gf}') + ' and ' + M('\\mathrm{fg}') + ' are usually different functions.', 1, 'The order of operations changes the result.']
      ]);
    }
  ]);

  X('graphs', [
    function () {
      var a = ri(1, 3), b = ri(2, 6);
      return Q('The graph of ' + M('y = \\frac{' + a + '}{x}') + ' is drawn.', [
        ['Describe the transformation that maps it to ' + M('y = \\frac{' + a + '}{x - ' + b + '}') + ', and state the new asymptotes.', 3, 'Translation ' + b + ' right; asymptotes ' + M('x = ' + b) + ' and ' + M('y = 0')],
        ['Find where ' + M('y = \\frac{' + a + '}{x - ' + b + '}') + ' meets ' + M('y = x - ' + b) + '.', 3, M('(x - ' + b + ')^2 = ' + a) + ': ' + M('x = ' + b + ' \\pm \\sqrt{' + a + '}')],
        ['Explain why the curve has rotational symmetry about ' + M('(' + b + ',\\ 0)') + '.', 1, M('y = \\frac{' + a + '}{x}') + ' has rotational symmetry about the origin, and the translation moves that centre.']
      ]);
    },
    function () {
      var a = ri(1, 3), b = nz(-3, 3), c = nz(-3, 3);
      while (c === b) c = nz(-3, 3);
      return Q('The graph of ' + M('y = ' + xm(a) + xm(b) + xm(c)) + ' is a cubic.', [
        ['Write down where it crosses the axes.', 2, M('x = ' + [a, b, c].join(',\\ ')) + '; ' + M('y = ' + (-a * b * c))],
        ['Sketch the graph, showing its shape for large positive and negative ' + M('x') + '.', 2, 'Rises to the right, falls to the left'],
        ['Use the graph to solve ' + M(xm(a) + xm(b) + xm(c) + ' > 0') + '.', 2, (function () { var r = [a, b, c].sort(function (x, y) { return x - y; }); return M(r[0] + ' < x < ' + r[1]) + ' or ' + M('x > ' + r[2]); })()]
      ]);
    },
    function () {
      var A = ri(2, 4);
      return Q('Consider ' + M('y = ' + A + '\\sin x') + ' and ' + M('y = \\sin(' + A + 'x)') + ' for ' + M('0° \\le x \\le 360°') + '.', [
        ['Describe how each graph is related to ' + M('y = \\sin x') + '.', 2, 'Vertical stretch scale factor ' + A + '; horizontal stretch scale factor ' + M('\\frac{1}{' + A + '}')],
        ['State the maximum value and the period of each.', 2, A + ' and 360°; 1 and ' + 360 / A + '°'],
        ['How many solutions does ' + M('\\sin(' + A + 'x) = 0.5') + ' have for ' + M('0° \\le x \\le 360°') + '?', 2, 2 * A]
      ]);
    },
    function () {
      var k = ri(2, 5);
      return Q('The graph of ' + M('y = ' + k + '^x') + ' is drawn.', [
        ['Write down the coordinates of the ' + M('y') + '-intercept and explain why every graph ' + M('y = a^x') + ' passes through it.', 2, M('(0,\\ 1)') + ': ' + M('a^0 = 1')],
        ['Describe the graph of ' + M('y = ' + k + '^{-x}') + ' in relation to ' + M('y = ' + k + '^x') + '.', 1, 'A reflection in the ' + M('y') + '-axis'],
        ['Explain why the graph approaches but never reaches the ' + M('x') + '-axis.', 2, 'For large negative ' + M('x') + ', ' + M(k + '^x') + ' is tiny but always positive.']
      ]);
    },
    function () {
      var a = nz(-3, 3), b = nz(-4, 4);
      return Q('A curve ' + M('y = \\mathrm{f}(x)') + ' passes through ' + M('P(2,\\ 5)') + ' and has a minimum at ' + M('(1,\\ 3)') + '.', [
        ['Find the image of ' + M('P') + ' and of the minimum under ' + M('y = \\mathrm{f}(x' + sg(-a) + ')' + sg(b)) + '.', 2, M('(' + (2 + a) + ',\\ ' + (5 + b) + ')') + ', ' + M('(' + (1 + a) + ',\\ ' + (3 + b) + ')')],
        ['Under ' + M('y = -\\mathrm{f}(x)') + ', what happens to the minimum?', 2, 'It becomes a maximum at ' + M('(1,\\ -3)')],
        ['Under ' + M('y = \\mathrm{f}(2x)') + ', find the image of ' + M('P') + '.', 1, M('(1,\\ 5)')]
      ]);
    },
    function () {
      var r = ri(2, 6);
      return Q('The circle ' + M('x^2 + y^2 = ' + r * r) + ' is drawn.', [
        ['Write down its centre and radius.', 1, M('(0,\\ 0)') + ', ' + r],
        ['Find where it meets the line ' + M('y = x') + '.', 2, M('\\left(\\pm\\frac{' + r + '}{\\sqrt{2}},\\ \\pm\\frac{' + r + '}{\\sqrt{2}}\\right)')],
        ['Explain why ' + M('x^2 + y^2 = ' + r * r) + ' is not a function ' + M('y = \\mathrm{f}(x)') + '.', 1, 'Each ' + M('x') + ' between ' + -r + ' and ' + r + ' gives two ' + M('y') + ' values.']
      ]);
    },
    function () {
      var a = ri(1, 4), b = ri(1, 4);
      return Q('The graph of ' + M('y = x^2') + ' is transformed to ' + M('y = (x' + sg(-a) + ')^2' + sg(-b)) + '.', [
        ['Describe the transformation and find the turning point.', 2, 'Translation by ' + M('\\begin{pmatrix} ' + a + ' \\\\ ' + (-b) + ' \\end{pmatrix}') + '; ' + M('(' + a + ',\\ ' + (-b) + ')')],
        ['Find where the new curve crosses the ' + M('x') + '-axis.', 2, M('x = ' + a + ' \\pm \\sqrt{' + b + '}')],
        ['Find the area of the triangle formed by the turning point and the two ' + M('x') + '-intercepts.', 2, M('\\frac{1}{2} \\times 2\\sqrt{' + b + '} \\times ' + b + ' = ' + b + '\\sqrt{' + b + '}')]
      ]);
    },
    function () {
      return Q('', [
        ['Sketch ' + M('y = x^2') + ', ' + M('y = x^3') + ' and ' + M('y = \\frac{1}{x}') + ' on the same axes for ' + M('-2 \\le x \\le 2') + '.', 3, 'Parabola, cubic through the origin, reciprocal with asymptotes'],
        ['Find all points where ' + M('y = x^2') + ' and ' + M('y = x^3') + ' meet.', 2, M('(0,\\ 0)') + ' and ' + M('(1,\\ 1)')],
        ['For which values of ' + M('x') + ' is ' + M('x^3 > x^2') + '?', 2, M('x > 1')]
      ]);
    }
  ]);

  X('differentiation', [
    function () {
      var a = ri(2, 6), b = ri(1, 9);
      return Q('The curve ' + M('y = x^2 - ' + 2 * a + 'x + ' + b) + ' is given.', [
        ['Find ' + M('\\frac{dy}{dx}') + ' and the coordinates of the turning point.', 3, M('2x - ' + 2 * a) + '; ' + M('(' + a + ',\\ ' + (b - a * a) + ')')],
        ['Find the equation of the tangent at ' + M('x = ' + (a + 1)) + '.', 3, 'Gradient 2: ' + M('y = 2x' + ((b - a * a + 1 - 2 * (a + 1)) ? sg(b - a * a + 1 - 2 * (a + 1)) : ''))],
        ['Find the point where the tangent at ' + M('x = ' + (a + 1)) + ' meets the tangent at ' + M('x = ' + (a - 1)) + '.', 2, M('(' + a + ',\\ ' + (b - a * a - 1) + ')')]
      ]);
    },
    function () {
      var P = ri(20, 80);
      return Q('A rectangle has perimeter ' + P + ' cm.', [
        ['Show that its area is ' + M('A = ' + P / 2 + 'x - x^2') + ', where ' + M('x') + ' is one side.', 2, 'Other side ' + M(P / 2 + ' - x')],
        ['Use differentiation to find the maximum area.', 3, M('\\frac{dA}{dx} = ' + P / 2 + ' - 2x = 0') + ', ' + M('x = ' + num(P / 4)) + ', area ' + num(P * P / 16) + ' cm²'],
        ['Explain how the answer shows that the best rectangle is a square.', 1, 'Both sides are ' + num(P / 4) + ' cm']
      ]);
    },
    function () {
      var a = ri(1, 3), b = ri(3, 9);
      return Q('A curve has equation ' + M('y = x^3 - ' + 3 * a * a + 'x + ' + b) + '.', [
        ['Find the stationary points.', 4, M('3x^2 - ' + 3 * a * a + ' = 0') + ': ' + M('(-' + a + ',\\ ' + (2 * a * a * a + b) + ')') + ' and ' + M('(' + a + ',\\ ' + (b - 2 * a * a * a) + ')')],
        ['Determine which is a maximum and which a minimum.', 2, 'Maximum at ' + M('x = -' + a) + ', minimum at ' + M('x = ' + a)],
        ['Find the values of ' + M('k') + ' for which ' + M('x^3 - ' + 3 * a * a + 'x + ' + b + ' = k') + ' has three solutions.', 2, M((b - 2 * a * a * a) + ' < k < ' + (b + 2 * a * a * a))]
      ]);
    },
    function () {
      var V = pick([16, 32, 54, 128, 250]), x = Math.cbrt(V);
      return Q('A closed box has a square base of side ' + M('x') + ' and height ' + M('h') + '. Its volume is ' + V + ' cm³.', [
        ['Show that its surface area is ' + M('S = 2x^2 + \\frac{' + 4 * V + '}{x}') + '.', 2, M('h = \\frac{' + V + '}{x^2}')],
        ['Find the value of ' + M('x') + ' that minimises ' + M('S') + '.', 3, M('4x - \\frac{' + 4 * V + '}{x^2} = 0') + ', ' + M('x = ' + sf3(x))],
        ['Show that the best box is a cube.', 1, M('h = \\frac{' + V + '}{x^2} = x')]
      ]);
    },
    function () {
      var a = ri(1, 3), b = ri(1, 4);
      return Q('A particle has displacement ' + M('s = ' + a + 't^3 - ' + b + 't^2') + ' m.', [
        ['Find the velocity and acceleration as functions of ' + M('t') + '.', 2, M('v = ' + 3 * a + 't^2 - ' + 2 * b + 't') + ', ' + M('a = ' + 6 * a + 't - ' + 2 * b)],
        ['Find when the particle is momentarily at rest (other than ' + M('t = 0') + ').', 2, M('t = ' + F(2 * b, 3 * a))],
        ['Find the acceleration at that moment.', 1, M(2 * b) + ' m/s²']
      ]);
    },
    function () {
      var c = ri(2, 9);
      return Q('The curve ' + M('y = x^2 + ' + c) + ' and the point ' + M('P(0,\\ 0)') + ' are given.', [
        ['Show that the tangent at ' + M('(a,\\ a^2 + ' + c + ')') + ' has equation ' + M('y = 2ax - a^2 + ' + c) + '.', 3, 'Gradient ' + M('2a')],
        ['Find the tangents that pass through the origin.', 3, M('a^2 = ' + c) + ': ' + M('y = \\pm 2\\sqrt{' + c + '}x')]
      ]);
    },
    function () {
      var a = ri(2, 5);
      return Q('', [
        ['Find the gradient of ' + M('y = \\frac{1}{x}') + ' at ' + M('x = ' + a) + ', by writing ' + M('\\frac{1}{x} = x^{-1}') + '.', 2, M('-\\frac{1}{' + a * a + '}')],
        ['Explain why the gradient of ' + M('y = \\frac{1}{x}') + ' is always negative.', 1, M('-\\frac{1}{x^2} < 0') + ' for all ' + M('x \\ne 0')],
        ['Find the point on ' + M('y = \\frac{1}{x}') + ' (with ' + M('x > 0') + ') where the gradient is ' + M('-\\frac{1}{' + a * a * 4 + '}') + '.', 2, M('(' + 2 * a + ',\\ \\frac{1}{' + 2 * a + '})')]
      ]);
    },
    function () {
      var h = ri(60, 90);
      return Q('Water drains from a tank so that the depth after ' + M('t') + ' minutes is ' + M('d = ' + h + ' - ' + (2) + 't + 0.02t^2') + ' cm, for ' + M('0 \\le t \\le 50') + '.', [
        ['Find the rate at which the depth is falling at ' + M('t = 10') + '.', 2, M('\\frac{dd}{dt} = -2 + 0.04t = -1.6') + ': 1.6 cm/min'],
        ['Find when the rate of change is zero, and the depth then.', 2, M('t = 50') + ', ' + M('d = ' + (h - 50)) + ' cm'],
        ['Explain why the model is only valid while ' + M('d \\ge 0') + '.', 1, 'A depth cannot be negative.']
      ]);
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
