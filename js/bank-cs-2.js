/* Byte Size Classroom — OCR A level Computer Science (H446), Component 02: Algorithms and programming.
   Uses the helpers in bank-cs-1.js. Code follows the OCR pseudocode conventions. */
(function (g) {
  var BS = g.BS, A = BS.fa, M = BS.m, C = BS.cs;
  var ri = BS.ri, pick = BS.pick;
  var Q = A.Q, sum = A.sum, sf3 = A.sf3;
  var X = BS.ext, T = BS.topic, Cn = BS.concept, Sr = String.raw;
  var code = C.code, ic = C.ic, table = C.table, list = C.list, some = C.some, shuffle = C.shuffle;
  function arr(n, lo, hi, uniq) { var a = []; while (a.length < n) { var v = ri(lo, hi); if (!uniq || a.indexOf(v) < 0) a.push(v); } return a; }
  function br(a) { return '[' + a.join(', ') + ']'; }

  /* =============================== 2.1 Computational thinking =============================== */
  var ABS = [
    ['a map of the London Underground', 'exact distances, street layout and geography', 'stations, lines and the order of stops'],
    ['a flight simulator for training pilots', 'passenger details and cabin decor', 'controls, instruments, physics of flight and weather'],
    ['a program modelling the spread of a virus', 'individual names and appearances', 'contacts between people and infection probabilities'],
    ['a satnav route planner', 'buildings and scenery', 'roads, junctions, distances and speed limits'],
    ['a football management game', 'the colour of the grass and crowd faces', 'player skills, tactics and results']];
  T({ id: 'cs-thinking', name: 'Computational thinking', video: 'OCR A level computer science computational thinking abstraction thinking ahead', gens: [
    { d: [1], f: function () {
      var a = pick(ABS);
      return Q('A developer is creating ' + a[0] + '.', [
        ['Explain what is meant by abstraction.', 1, 'Removing unnecessary detail to focus on what matters for the problem'],
        ['Give details that should be removed and details that must be kept.', 2, 'Remove ' + a[1] + '; keep ' + a[2]],
        ['Give one benefit of abstraction here.', 1, 'Simpler model that is quicker to build and run, and easier to understand']
      ]);
    } },
    { d: [1, 2], f: function () {
      var f = pick([
        ['binarySearch(list, target)', 'the list is sorted'],
        ['squareRoot(x)', 'x is not negative'],
        ['average(scores)', 'the list is not empty, so there is no division by zero'],
        ['pop()', 'the stack is not empty']]);
      return Q('Thinking ahead: the subroutine ' + ic(f[0]) + '.', [
        ['State a precondition for this subroutine.', 1, f[1]],
        ['Explain the benefit of stating preconditions.', 2, 'The subroutine need not check them itself, making it shorter and reusable, and the caller knows what to guarantee'],
        ['Explain what is meant by a reusable component.', 1, 'A tested module that can be used in other programs, saving time']
      ]);
    } },
    { d: [2], f: function () {
      var n = ri(200, 1000), hit = pick([60, 70, 80, 90]), tc = pick([2, 5, 10]), tf = pick([100, 150, 200, 300]);
      var withC = n * (hit / 100 * tc + (1 - hit / 100) * tf), without = n * tf;
      return Q('A web app needs ' + n + ' data items. Fetching from the server takes ' + tf + ' ms; reading from the cache takes ' + tc + ' ms. ' + hit + '% of requests are found in the cache.', [
        ['Find the total time without caching.', 1, without + ' ms'],
        ['Find the total time with caching.', 2, sf3(withC) + ' ms'],
        ['Give a drawback of caching.', 1, 'Cached data may be out of date, and the cache takes memory']
      ]);
    } },
    { d: [2, 3], f: function () {
      var t = [['A', ri(2, 6), []], ['B', ri(2, 6), []], ['C', ri(2, 6), ['A']], ['D', ri(2, 6), ['A', 'B']], ['E', ri(2, 6), ['C', 'D']]];
      var fin = {}; t.forEach(function (x) { fin[x[0]] = x[1] + (x[2].length ? Math.max.apply(null, x[2].map(function (p) { return fin[p]; })) : 0); });
      return Q('A program has tasks with durations (seconds) and dependencies.' + table(['Task', 'Time', 'Needs'], t.map(function (x) { return [x[0], x[1], x[2].length ? x[2].join(', ') : '–']; })), [
        ['Find the time if the tasks run one after another.', 1, sum(t.map(function (x) { return x[1]; }))],
        ['Find the shortest time if independent tasks can run concurrently.', 3, fin.E],
        ['Explain one problem concurrent processing can cause.', 1, 'Two tasks updating shared data can cause a race condition']
      ]);
    } },
    { d: [1, 2], f: function () {
      var p = pick(['a school timetabling program', 'an online cinema booking system', 'a quiz app for revision', 'a library loans system']);
      return Q('Decomposition and thinking procedurally for ' + p + '.', [
        ['Decompose the problem into four sub-problems.', 4, 'For example: input and validate data; store and retrieve records; process the main rules; produce output or reports'],
        ['Explain two benefits of decomposition.', 2, 'Sub-problems are easier to solve and test; different programmers can work in parallel; modules can be reused']
      ]);
    } }
  ] });
  X('cs-thinking', [
    function () {
      return Q('Thinking logically.', [
        ['Identify the decision points in a login process.', 3, 'Is the username found? Is the password correct? Has the attempt limit been reached?'],
        ['Explain how identifying decision points helps when testing.', 2, 'Each branch needs test data, so all paths are tested']
      ]);
    },
    function () {
      return Q('Concurrency problems.', [
        ['Two threads each run ' + ic('count = count + 1') + ' 1000 times on a shared variable starting at 0. Explain why the result may be less than 2000.', 3, 'Both may read the same value before either writes, so an update is lost (a race condition)'],
        ['Explain how a lock prevents this.', 2, 'Only one thread can hold the lock and update count at a time'],
        ['Explain how locks can cause deadlock.', 1, 'Each thread holds a lock the other needs, so both wait forever']
      ]);
    },
    function () {
      var hit = pick([75, 85, 95]), n = pick([1000, 5000]);
      return Q('Prefetching. A video player loads the next ' + pick([5, 10]) + ' seconds of video before it is needed.', [
        ['Explain why prefetching is an example of thinking ahead.', 2, 'It predicts what data will be needed and fetches it in advance to avoid waiting'],
        ['Explain when prefetching wastes resources.', 1, 'If the user skips or stops, the data was downloaded for nothing']
      ]);
    },
    function () {
      return Q('Levels of abstraction.', [
        ['Explain how programming languages are an example of layered abstraction.', 3, 'High-level code hides machine code, which hides electronics; each layer can be used without knowing the layer below'],
        ['Explain the difference between representational abstraction and abstraction by generalisation.', 2, 'Representational: removing unnecessary detail. Generalisation: grouping by common characteristics']
      ]);
    },
    function () {
      var n = ri(4, 8), t = ri(2, 6), c = ri(2, 4);
      return Q('A rendering task has ' + n + ' independent frames, each taking ' + t + ' s, plus a final ' + t + ' s step that joins them.', [
        ['Find the time on one processor.', 1, (n + 1) * t + ' s'],
        ['Find the time on ' + c + ' processors.', 2, (Math.ceil(n / c) + 1) * t + ' s'],
        ['Explain why the speed-up is less than ' + c + ' times.', 1, 'The final step cannot be shared, and frames may not divide evenly']
      ]);
    }
  ]);

  /* =============================== 2.2.1 Programming techniques =============================== */
  T({ id: 'cs-programming', name: 'Programming techniques: trace tables, recursion and parameters', video: 'OCR A level computer science recursion trace table by value by reference', gens: [
    { d: [1], f: function () {
      var a = ri(1, 5), b = ri(1, 3), L = ri(12, 25), x = a, y = b, rows = [[x, y]];
      while (x < L) { x = x + y; y = y + 1; rows.push([x, y]); }
      return Q('Complete a trace table for this code.' + code(['x = ' + a, 'y = ' + b, 'while x < ' + L, '  x = x + y', '  y = y + 1', 'endwhile', 'print(x)', 'print(y)']), [
        ['Give the values of x and y after each pass.', 3, table(['x', 'y'], rows)],
        ['State the output.', 1, x + ' and ' + y]
      ]);
    } },
    { d: [1, 2], f: function () {
      var n = ri(8, 20), k = ri(2, 5), t = 0, c = 0;
      for (var i = 1; i <= n; i++) if (i % k === 0) { t += i; c++; }
      return Q('Consider this code.' + code(['total = 0', 'count = 0', 'for i = 1 to ' + n, '  if i MOD ' + k + ' == 0 then', '    total = total + i', '    count = count + 1', '  endif', 'next i', 'print(total)', 'print(count)']), [
        ['State the output.', 2, t + ' and ' + c],
        ['Describe what the program does.', 2, 'Adds up and counts the multiples of ' + k + ' from 1 to ' + n],
        ['Identify the variable used as a counter.', 1, 'count (or i)']
      ]);
    } },
    { d: [2], f: function () {
      var kind = ri(0, 2), k = ri(4, 7), m = ri(2, 4), c0 = ri(1, 3), r, lines;
      if (kind === 0) { r = function f(n) { return n <= 1 ? c0 : f(n - 1) + n * m; }; lines = ['function f(n)', '  if n <= 1 then', '    return ' + c0, '  else', '    return f(n - 1) + n * ' + m, '  endif', 'endfunction']; }
      else if (kind === 1) { r = function f(n) { return n <= 1 ? c0 : m * f(n - 1); }; lines = ['function f(n)', '  if n <= 1 then', '    return ' + c0, '  else', '    return ' + m + ' * f(n - 1)', '  endif', 'endfunction']; }
      else { k = ri(20, 99); r = function f(n) { return n === 0 ? 0 : n % 10 + f(Math.floor(n / 10)); }; lines = ['function f(n)', '  if n == 0 then', '    return 0', '  else', '    return n MOD 10 + f(n DIV 10)', '  endif', 'endfunction']; }
      var calls = kind === 2 ? String(k).length + 1 : k;
      return Q('This recursive function is called with ' + ic('print(f(' + k + '))') + '.' + code(lines), [
        ['State the output.', 3, r(k)],
        ['How many times is f called in total?', 1, calls],
        ['Explain what would happen if the base case were removed.', 2, 'The function would call itself forever until the stack overflows']
      ]);
    } },
    { d: [2], f: function () {
      var X0 = ri(2, 9), Y0 = ri(2, 9), p = ri(1, 5), q = ri(2, 3), refA = Math.random() < 0.5;
      var x = refA ? X0 + p : X0, y = refA ? Y0 : Y0 * q;
      return Q('Consider this code.' + code(['procedure change(' + (refA ? 'byRef' : 'byVal') + ' a, ' + (refA ? 'byVal' : 'byRef') + ' b)', '  a = a + ' + p, '  b = b * ' + q, '  print(a + b)', 'endprocedure', '', 'x = ' + X0, 'y = ' + Y0, 'change(x, y)', 'print(x)', 'print(y)']), [
        ['State the three values printed.', 3, (X0 + p + Y0 * q) + ', ' + x + ', ' + y],
        ['Explain the difference between passing by value and by reference.', 2, 'By value passes a copy, so the original is unchanged; by reference passes the address, so changes affect the original']
      ]);
    } },
    { d: [2, 3], f: function () {
      var w = pick(['COMPUTER', 'ALGORITHM', 'BINARY', 'NETWORK', 'VARIABLE', 'PROCEDURE']), o = '';
      for (var i = 0; i < w.length; i++) if (i % 2 === 0) o += w.charAt(i);
      return Q('Consider this code.' + code(['word = "' + w + '"', 'out = ""', 'for i = 0 to word.length - 1', '  if i MOD 2 == 0 then', '    out = out + word.substring(i, 1)', '  endif', 'next i', 'print(out)', 'print(out.length)']), [
        ['State the output.', 2, o + ' and ' + o.length],
        ['Explain the difference between a local and a global variable.', 2, 'A local variable exists only inside its subroutine; a global variable can be used anywhere in the program'],
        ['Give one reason to prefer local variables.', 1, 'They avoid accidental changes elsewhere and free memory when the subroutine ends']
      ]);
    } }
  ] });
  X('cs-programming', [
    function () {
      var k = ri(4, 7), fib = [0, 1]; for (var i = 2; i <= k; i++) fib.push(fib[i - 1] + fib[i - 2]);
      var calls = function c(n) { return n <= 1 ? 1 : 1 + c(n - 1) + c(n - 2); };
      return Q('A recursive Fibonacci function:' + code(['function fib(n)', '  if n <= 1 then', '    return n', '  else', '    return fib(n - 1) + fib(n - 2)', '  endif', 'endfunction']), [
        ['State the value of ' + ic('fib(' + k + ')') + '.', 1, fib[k]],
        ['Find how many calls ' + ic('fib(' + k + ')') + ' makes in total.', 3, calls(k)],
        ['Rewrite the function iteratively.', 4, code(['function fib(n)', '  a = 0', '  b = 1', '  for i = 1 to n', '    t = a + b', '    a = b', '    b = t', '  next i', '  return a', 'endfunction'])]
      ]);
    },
    function () {
      var r = ri(3, 4), c = ri(3, 4), g = [], tot = 0, best = -1;
      for (var i = 0; i < r; i++) { g.push([]); for (var j = 0; j < c; j++) g[i].push(ri(1, 9)); }
      var rowSums = g.map(function (row) { return sum(row); }); best = rowSums.indexOf(Math.max.apply(null, rowSums));
      return Q('A 2D array ' + ic('grid') + ' has ' + r + ' rows and ' + c + ' columns:' + table([''].concat(g[0].map(function (_, j) { return 'col ' + j; })), g.map(function (row, i) { return ['row ' + i].concat(row); })), [
        ['Write a function that returns the index of the row with the largest total.', 5, code(['function bestRow(grid)', '  best = 0', '  bestTotal = -1', '  for i = 0 to ' + (r - 1), '    t = 0', '    for j = 0 to ' + (c - 1), '      t = t + grid[i, j]', '    next j', '    if t > bestTotal then', '      bestTotal = t', '      best = i', '    endif', '  next i', '  return best', 'endfunction'])],
        ['State the value returned for this grid.', 1, best + ' (total ' + rowSums[best] + ')']
      ]);
    },
    function () {
      return Q('File handling. A file scores.txt holds one integer per line.', [
        ['Write code to read the file and print the mean of the values.', 5, code(['f = openRead("scores.txt")', 'total = 0', 'n = 0', 'while NOT f.endOfFile()', '  total = total + int(f.readLine())', '  n = n + 1', 'endwhile', 'f.close()', 'if n > 0 then', '  print(total / n)', 'endif'])],
        ['Explain why the check ' + ic('n > 0') + ' is included.', 1, 'An empty file would cause division by zero']
      ]);
    },
    function () {
      var n = ri(4, 6);
      return Q('Recursion and the call stack. ' + ic('fact(' + n + ')') + ' is computed recursively.', [
        ['Describe what is stored on the stack for each call.', 2, 'A stack frame holding the return address, parameters and local variables'],
        ['State the maximum number of frames for this call.', 1, n],
        ['Give one advantage and one disadvantage of recursion compared with iteration.', 2, 'More natural and shorter for some problems; uses more memory and can overflow the stack']
      ]);
    },
    function () {
      var a = arr(6, 1, 30), t = pick(a);
      return Q('Debugging. This function should return the index of ' + ic('target') + ' in ' + ic('items') + ', or −1 if absent.' + code(['function find(items, target)', '  for i = 0 to items.length', '    if items[i] == target then', '      return i', '    else', '      return -1', '    endif', '  next i', 'endfunction'], true), [
        ['Identify two errors, giving line numbers.', 2, 'Line 2: should go to items.length - 1. Lines 5–6: returning −1 inside the loop stops after the first item'],
        ['Write a corrected version.', 3, code(['function find(items, target)', '  for i = 0 to items.length - 1', '    if items[i] == target then', '      return i', '    endif', '  next i', '  return -1', 'endfunction'])],
        ['State the result of the corrected function for ' + br(a) + ' and target ' + t + '.', 1, a.indexOf(t)]
      ]);
    }
  ]);

  /* =============================== Object-oriented programming =============================== */
  function account() {
    return ['class Account', '  private balance', '  public procedure new(start)', '    balance = start', '  endprocedure', '  public procedure deposit(amount)', '    balance = balance + amount', '  endprocedure', '  public function withdraw(amount)', '    if amount > balance then', '      return false', '    else', '      balance = balance - amount', '      return true', '    endif', '  endfunction', '  public function getBalance()', '    return balance', '  endfunction', 'endclass'];
  }
  T({ id: 'cs-oop', name: 'Object-oriented programming', video: 'OCR A level computer science object oriented programming inheritance polymorphism encapsulation', gens: [
    { d: [1, 2], f: function () {
      var s = ri(20, 80), d = ri(10, 50), w = ri(20, 140), bal = s + d, ok = w <= bal;
      return Q('Consider this class.' + code(account()) + 'The main program runs:' + code(['acc = new Account(' + s + ')', 'acc.deposit(' + d + ')', 'ok = acc.withdraw(' + w + ')', 'print(ok)', 'print(acc.getBalance())']), [
        ['State the output.', 2, ok + ' and ' + (ok ? bal - w : bal)],
        ['Identify an attribute and a method.', 2, 'Attribute: balance. Method: deposit, withdraw or getBalance'],
        ['Explain how the class uses encapsulation.', 2, 'balance is private, so it can only be changed through the public methods, which can check values']
      ]);
    } },
    { d: [2], f: function () {
      var a = ri(2, 9), b = ri(2, 9), r = ri(2, 6), tri = Math.random() < 0.5;
      var lines = ['class Shape', '  public name', '  public procedure new(n)', '    name = n', '  endprocedure', '  public function area()', '    return 0', '  endfunction', '  public function describe()', '    return name + " " + str(area())', '  endfunction', 'endclass', '', 'class Rectangle inherits Shape', '  private w', '  private h', '  public procedure new(w0, h0)', '    super.new("rectangle")', '    w = w0', '    h = h0', '  endprocedure', '  public function area()', '    return w * h', '  endfunction', 'endclass'];
      return Q('Consider these classes.' + code(lines), [
        ['State the output of ' + ic('print(new Rectangle(' + a + ', ' + b + ').describe())') + '.', 2, ic('rectangle ' + a * b)],
        ['State the output of ' + ic('print(new Shape("blob").describe())') + '.', 1, ic('blob 0')],
        ['Explain how this shows polymorphism.', 2, 'describe calls area, and the version that runs depends on the object’s class: Rectangle overrides area']
      ]);
    } },
    { d: [1], f: function () {
      var c = pick([['Car', 'make, speed', 'accelerate(), brake()'], ['Pupil', 'name, yearGroup', 'addMark(), getAverage()'], ['Book', 'title, isOnLoan', 'lend(), giveBack()']]);
      return Q('A class ' + c[0] + ' has attributes ' + c[1] + ' and methods ' + c[2] + '.', [
        ['Explain the difference between a class and an object.', 2, 'A class is a template; an object is an instance created from it with its own attribute values'],
        ['Explain what a constructor does.', 1, 'It runs when an object is created, setting initial attribute values'],
        ['Write the line to create a new ' + c[0] + ' called ' + c[0].toLowerCase() + '1.', 1, ic(c[0].toLowerCase() + '1 = new ' + c[0] + '(…)')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var lim = ri(3, 8);
      return Q('Write a class ' + ic('Counter') + ' with a private attribute ' + ic('value') + ' starting at 0, a method ' + ic('increment()') + ' that adds 1 but never goes above ' + lim + ', and a method ' + ic('getValue()') + '.', [
        ['Write the class.', 5, code(['class Counter', '  private value', '  public procedure new()', '    value = 0', '  endprocedure', '  public procedure increment()', '    if value < ' + lim + ' then', '      value = value + 1', '    endif', '  endprocedure', '  public function getValue()', '    return value', '  endfunction', 'endclass'])],
        ['After ' + (lim + 2) + ' calls to increment, what does getValue return?', 1, lim]
      ]);
    } },
    { d: [2], f: function () {
      var animals = some([['Dog', 'Woof'], ['Cat', 'Meow'], ['Cow', 'Moo'], ['Duck', 'Quack']], 3);
      return Q('Classes ' + list(animals.map(function (x) { return x[0]; })) + ' all inherit from Animal and override ' + ic('speak()') + ' to return ' + list(animals.map(function (x) { return '"' + x[1] + '"'; })) + ' respectively. A list holds one object of each, in that order.', [
        ['State the output of a loop that prints ' + ic('a.speak()') + ' for each object.', 2, animals.map(function (x) { return x[1]; }).join(', ')],
        ['Explain the benefit of inheritance here.', 2, 'Shared attributes and methods are written once in Animal and reused by every subclass']
      ]);
    } }
  ] });
  X('cs-oop', [
    function () {
      return Q('Design a class hierarchy for a school’s staff: teachers have a subject, support staff have a department, and everyone has a name and salary.', [
        ['Describe the classes, attributes and inheritance.', 4, 'Staff (name, salary, getName()); Teacher inherits Staff (subject); SupportStaff inherits Staff (department)'],
        ['Explain why salary should be private with a getter and setter.', 2, 'The setter can validate changes and the data cannot be changed directly']
      ]);
    },
    function () {
      return Q('Overriding and overloading.', [
        ['Explain overriding.', 1, 'A subclass redefines a method inherited from its superclass'],
        ['Explain how ' + ic('super.new()') + ' is used in a subclass constructor.', 2, 'It calls the parent constructor to set inherited attributes before setting the new ones'],
        ['Explain what is meant by aggregation.', 1, 'An object contains or uses other objects that can exist independently']
      ]);
    },
    function () {
      var s = ri(20, 50), ops = [];
      var bal = s; for (var i = 0; i < 4; i++) { if (Math.random() < 0.5) { var d = ri(5, 30); bal += d; ops.push('acc.deposit(' + d + ')'); } else { var w = ri(10, 60); if (w <= bal) bal -= w; ops.push('acc.withdraw(' + w + ')'); } }
      return Q('Using the Account class (withdraw refuses if the amount is more than the balance):' + code(['acc = new Account(' + s + ')'].concat(ops).concat(['print(acc.getBalance())'])), [
        ['State the output.', 3, bal],
        ['Explain why ' + ic('acc.balance = 1000') + ' in the main program would fail.', 1, 'balance is private']
      ]);
    },
    function () {
      return Q('Comparing paradigms.', [
        ['Compare object-oriented and procedural programming for a large team project.', 4, 'OOP: classes are self-contained, reusable and easy to extend through inheritance, but design takes longer. Procedural: simpler for small tasks, but shared data can be changed anywhere'],
        ['Give one situation where procedural code is more suitable.', 1, 'A short script or a simple calculation']
      ]);
    },
    function () {
      var a = ri(2, 6), b = ri(2, 6);
      return Q('A class Square inherits from Rectangle, calling ' + ic('super.new("square")') + ' and setting w and h both to the side length.', [
        ['Write the Square class.', 3, code(['class Square inherits Rectangle', '  public procedure new(side)', '    super.new(side, side)', '  endprocedure', 'endclass'])],
        ['State the output of ' + ic('print(new Square(' + a + ').area())') + '.', 1, a * a],
        ['Explain why Square does not need its own area method.', 1, 'It inherits Rectangle’s area, which works for equal sides']
      ]);
    }
  ]);

  /* =============================== 2.2.2 Computational methods =============================== */
  var METH = [
    ['finding a route through a maze', 'backtracking', 'paths are tried and abandoned at dead ends, returning to the last choice'],
    ['planning a delivery route visiting 40 shops', 'heuristics', 'an exact search is too slow, so a good-enough route is found quickly'],
    ['a supermarket finding which products are bought together', 'data mining', 'large amounts of transaction data are searched for patterns'],
    ['testing how long queues get at a new theme park ride', 'performance modelling (simulation)', 'the real system cannot be tested before it is built'],
    ['sorting a million records quickly', 'divide and conquer', 'the problem is split into halves that are solved and combined'],
    ['spotting trends in pupils’ test scores', 'visualisation', 'a chart shows patterns that are hard to see in a table']];
  T({ id: 'cs-methods', name: 'Computational methods', video: 'OCR A level computer science computational methods backtracking heuristics data mining', gens: [
    { d: [1], f: function () {
      var ms = some(METH, 3);
      return Q('Identify a computational method suited to each problem.', ms.map(function (m) { return [m[0].charAt(0).toUpperCase() + m[0].slice(1) + '.', 2, m[1] + ': ' + m[2]]; }));
    } },
    { d: [1, 2], f: function () {
      var n = pick([100, 1000, 10000, 1000000]), d = Math.ceil(Math.log2(n));
      return Q('Divide and conquer on ' + n.toLocaleString('en-GB') + ' items.', [
        ['How many times can the items be halved before one item remains (round up)?', 2, d],
        ['Explain why binary search is an example of divide and conquer.', 2, 'Each step halves the part of the list still to be searched'],
        ['State the time complexity of binary search.', 1, M('O(\\log n)')]
      ]);
    } },
    { d: [2], f: function () {
      var digits = pick([4, 5, 6]), chars = pick([10, 26, 36]), rate = pick([1000, 1e6]);
      var combos = Math.pow(chars, digits);
      return Q('A password has ' + digits + ' characters, each one of ' + chars + ' possibilities. A program tries ' + rate.toLocaleString('en-GB') + ' passwords per second.', [
        ['Find the number of possible passwords.', 1, combos.toLocaleString('en-GB')],
        ['Find the worst-case time to try them all.', 2, sf3(combos / rate) + ' s'],
        ['Explain why brute force becomes intractable as length grows.', 1, 'The number of combinations grows exponentially with length']
      ]);
    } },
    { d: [2, 3], f: function () {
      var arrive = pick([2, 3, 4]), serve = arrive + pick([1, 2]), T0 = pick([30, 60]);
      var arrived = Math.floor(T0 / arrive) + 1, served = Math.floor(T0 / serve);
      return Q('Performance modelling. At a café, a customer arrives every ' + arrive + ' minutes (first at time 0) and each is served in ' + serve + ' minutes by one server.', [
        ['Estimate how many customers are waiting or being served after ' + T0 + ' minutes.', 3, arrived - served],
        ['Explain why a simulation would use random arrival times.', 1, 'Real arrivals vary; random values give a more realistic model'],
        ['Suggest a change the café could test with the model.', 1, 'Adding a second server']
      ]);
    } },
    { d: [1, 2], f: function () {
      return Q('Problem recognition and heuristics.', [
        ['Explain what is meant by a heuristic.', 1, 'A rule of thumb that finds a good solution quickly but not necessarily the best'],
        ['Give an example of a heuristic in computing.', 1, 'The straight-line distance in A*; nearest neighbour for route planning; virus scanners spotting suspicious patterns'],
        ['Explain what makes a problem solvable by computer.', 2, 'It can be described precisely, broken into steps, and solved in a reasonable time with available data']
      ]);
    } }
  ] });
  X('cs-methods', [
    function () {
      return Q('Backtracking.', [
        ['Describe how backtracking solves a Sudoku.', 3, 'Fill the first empty cell with the smallest valid digit; move on; if no digit fits, go back and try the next digit in the previous cell'],
        ['Explain why backtracking is better than trying every complete grid.', 2, 'Partial solutions that break the rules are abandoned early, so most possibilities are never explored']
      ]);
    },
    function () {
      return Q('Data mining.', [
        ['Give two benefits of data mining to a retailer.', 2, 'Targeted offers; better stock planning; spotting fraud'],
        ['Discuss one ethical concern.', 2, 'Customers may not know their data is analysed this way; inferences may be intrusive or biased']
      ]);
    },
    function () {
      var n = ri(10, 20);
      return Q('The travelling salesman problem with ' + n + ' cities.', [
        ['Find the number of distinct routes, ' + M('\\frac{(n - 1)!}{2}') + '.', 2, sf3(A.fact(n - 1) / 2)],
        ['Explain why a heuristic is used.', 1, 'Checking every route is intractable'],
        ['Explain the trade-off of using a heuristic.', 1, 'The answer is found quickly but may not be optimal']
      ]);
    },
    function () {
      return Q('Pipelining as a method.', [
        ['Explain how pipelining is used outside the processor, for example in a program processing images.', 2, 'The output of one stage feeds the next, so different images are at different stages at once'],
        ['Give a condition needed for pipelining to help.', 1, 'Stages must be independent and take similar times']
      ]);
    },
    function () {
      return Q('Intractable problems.', [
        ['Explain the difference between a tractable and an intractable problem.', 2, 'Tractable: solvable in polynomial time. Intractable: no known polynomial-time solution, so it is impractical for large inputs'],
        ['Explain why intractable problems are still tackled in practice.', 2, 'Heuristics and approximations give useful answers for real inputs']
      ]);
    }
  ]);

  /* =============================== 2.3.1 Searching and sorting =============================== */
  function bubble(a) { a = a.slice(); var sw = 0; for (var i = 0; i < a.length - 1; i++) if (a[i] > a[i + 1]) { var t = a[i]; a[i] = a[i + 1]; a[i + 1] = t; sw++; } return { a: a, sw: sw }; }
  function insertStages(a, k) { a = a.slice(); var out = []; for (var i = 1; i <= k && i < a.length; i++) { var v = a[i], j = i - 1; while (j >= 0 && a[j] > v) { a[j + 1] = a[j]; j--; } a[j + 1] = v; out.push(a.slice()); } return out; }
  function mergeLevels(a) { var lv = a.map(function (x) { return [x]; }), out = []; while (lv.length > 1) { var nx = []; for (var i = 0; i < lv.length; i += 2) { if (i + 1 < lv.length) { var p = lv[i], q = lv[i + 1], m = [], x = 0, y = 0; while (x < p.length || y < q.length) { if (y >= q.length || (x < p.length && p[x] <= q[y])) m.push(p[x++]); else m.push(q[y++]); } nx.push(m); } else nx.push(lv[i]); } lv = nx; out.push(lv.map(br).join(' ')); } return out; }
  T({ id: 'cs-search-sort', name: 'Searching and sorting algorithms', video: 'OCR A level computer science binary search bubble sort insertion sort merge sort quick sort', gens: [
    { d: [1], f: function () {
      var a = arr(8, 1, 60, true), present = Math.random() < 0.7, t = present ? pick(a) : 61 + ri(0, 9);
      return Q('A linear search looks for ' + t + ' in ' + br(a) + '.', [
        ['How many comparisons are made?', 1, present ? a.indexOf(t) + 1 : a.length],
        ['State one advantage of linear search over binary search.', 1, 'The list does not need to be sorted'],
        ['State the worst-case time complexity.', 1, M('O(n)')]
      ]);
    } },
    { d: [1, 2], f: function () {
      var a = arr(ri(9, 14), 1, 99, true).sort(function (x, y) { return x - y; }), t = Math.random() < 0.75 ? pick(a) : ri(1, 99);
      var lo = 0, hi = a.length - 1, mids = [], found = false;
      while (lo <= hi) { var mid = Math.floor((lo + hi) / 2); mids.push(a[mid] + ' (index ' + mid + ')'); if (a[mid] === t) { found = true; break; } if (a[mid] < t) lo = mid + 1; else hi = mid - 1; }
      return Q('A binary search looks for ' + t + ' in ' + br(a) + ' (indexes start at 0, ' + ic('mid = (low + high) DIV 2') + ').', [
        ['List the values compared, in order.', 3, mids.join(', ')],
        ['State the result.', 1, found ? 'Found at index ' + a.indexOf(t) : 'Not found']
      ]);
    } },
    { d: [2], f: function () {
      var a = arr(7, 1, 50, true), p1 = bubble(a), st = insertStages(a, 3);
      return Q('Sort ' + br(a) + ' into ascending order.', [
        ['Show the list after the first pass of a bubble sort, and the number of swaps.', 2, br(p1.a) + ', ' + p1.sw + ' swaps'],
        ['Show the list after each of the first three passes of an insertion sort.', 3, st.map(br).join('; ')]
      ]);
    } },
    { d: [2], f: function () {
      var a = arr(8, 1, 60, true), lv = mergeLevels(a);
      return Q('Use a merge sort on ' + br(a) + '.', [
        ['Show the sublists after each round of merging.', 4, lv.join('; ')],
        ['State the time complexity of merge sort and one drawback.', 2, M('O(n \\log n)') + '; it needs extra memory for the merged lists']
      ]);
    } },
    { d: [2, 3], f: function () {
      var a = arr(8, 1, 60, true), p = a[0], lo = a.slice(1).filter(function (x) { return x < p; }), hi = a.slice(1).filter(function (x) { return x > p; });
      return Q('A quick sort on ' + br(a) + ' uses the first item as the pivot. Smaller items are placed before the pivot and larger items after it, keeping their order.', [
        ['Show the list after the first partition.', 2, br(lo.concat([p]).concat(hi))],
        ['Explain why quick sort is ' + M('O(n^2)') + ' in the worst case.', 2, 'If the pivot is always the smallest or largest item, each partition removes only one item'],
        ['State its average time complexity.', 1, M('O(n \\log n)')]
      ]);
    } }
  ] });
  X('cs-search-sort', [
    function () {
      return Q('Write an insertion sort.', [
        ['Write a procedure ' + ic('insertionSort(items)') + ' in pseudocode.', 6, code(['procedure insertionSort(items)', '  for i = 1 to items.length - 1', '    current = items[i]', '    j = i - 1', '    while j >= 0 AND items[j] > current', '      items[j + 1] = items[j]', '      j = j - 1', '    endwhile', '    items[j + 1] = current', '  next i', 'endprocedure'])],
        ['Explain why items must be passed by reference.', 1, 'The original array must be changed']
      ]);
    },
    function () {
      var n = ri(6, 12);
      return Q('Counting comparisons for ' + n + ' items.', [
        ['Find the maximum comparisons for a bubble sort that stops when a pass makes no swaps.', 2, n * (n - 1) / 2 + ' (if each pass is one shorter)'],
        ['Find the minimum comparisons for that bubble sort.', 1, (n - 1) + ' (already sorted)'],
        ['Find the maximum comparisons for a binary search.', 2, Math.ceil(Math.log2(n + 1))]
      ]);
    },
    function () {
      return Q('Write a recursive binary search.', [
        ['Write ' + ic('function search(items, target, low, high)') + ' returning the index or −1.', 6, code(['function search(items, target, low, high)', '  if low > high then', '    return -1', '  endif', '  mid = (low + high) DIV 2', '  if items[mid] == target then', '    return mid', '  elseif items[mid] < target then', '    return search(items, target, mid + 1, high)', '  else', '    return search(items, target, low, mid - 1)', '  endif', 'endfunction'])],
        ['Compare the space use with an iterative version.', 1, 'Recursion uses a stack frame per call, ' + M('O(\\log n)') + ' space; iteration uses constant space']
      ]);
    },
    function () {
      var a = arr(6, 1, 9, false);
      return Q('Stability. A list of records is sorted by mark, and some marks are equal.', [
        ['Explain what is meant by a stable sort.', 1, 'Records with equal keys keep their original order'],
        ['State which of bubble, insertion and merge sort are stable as usually written.', 2, 'All three'],
        ['Explain why stability matters when sorting by surname then by form.', 1, 'The second sort keeps the alphabetical order within each form']
      ]);
    },
    function () {
      var a = arr(7, 1, 50, true), passes = 0, b = a.slice();
      while (true) { var r = bubble(b); passes++; b = r.a; if (!r.sw) break; }
      return Q('Bubble sort efficiency on ' + br(a) + '.', [
        ['Find the number of passes, including the final pass with no swaps.', 3, passes],
        ['Explain why insertion sort is often faster than bubble sort on nearly sorted data.', 2, 'Each item moves only a short way, so few comparisons and shifts are needed']
      ]);
    }
  ]);

  /* =============================== Algorithm complexity =============================== */
  var FRAGS = [
    [['for i = 1 to n', '  total = total + i', 'next i'], 'O(n)', 'one loop of n steps'],
    [['for i = 1 to n', '  for j = 1 to n', '    print(i * j)', '  next j', 'next i'], 'O(n^2)', 'a loop inside a loop, n × n steps'],
    [['while n > 1', '  n = n DIV 2', '  count = count + 1', 'endwhile'], 'O(\\log n)', 'n halves each pass'],
    [['x = items[0]', 'print(x)'], 'O(1)', 'a fixed number of steps'],
    [['for i = 1 to n', '  for j = 1 to 10', '    print(j)', '  next j', 'next i'], 'O(n)', 'the inner loop is a constant 10 steps']];
  T({ id: 'cs-complexity', name: 'Algorithm complexity and Big O', video: 'OCR A level computer science big o notation time complexity', gens: [
    { d: [1], f: function () {
      var f = pick(FRAGS);
      return Q('State the time complexity of this code in Big O notation.' + code(f[0]), [
        ['Give the complexity.', 1, M(f[1])],
        ['Explain your answer.', 1, 'There is ' + f[2]]
      ]);
    } },
    { d: [1, 2], f: function () {
      var kind = pick(['O(n)', 'O(n^2)', 'O(n^3)', 'O(2^n)']), t = ri(2, 8), n = pick([100, 200, 500]), k = pick([2, 3, 4]);
      var ans = kind === 'O(n)' ? t * k : kind === 'O(n^2)' ? t * k * k : kind === 'O(n^3)' ? t * k * k * k : null;
      return Q('An algorithm with time complexity ' + M(kind) + ' takes ' + t + ' s for ' + n + ' items.', kind === 'O(2^n)' ? [
        ['Estimate the time for ' + (n + k) + ' items.', 2, t * Math.pow(2, k) + ' s'],
        ['Explain why this algorithm is unsuitable for large inputs.', 1, 'The time doubles with each extra item']
      ] : [
        ['Estimate the time for ' + k * n + ' items.', 2, ans + ' s'],
        ['Explain why this is only an estimate.', 1, 'Big O ignores constants and lower-order terms, and the hardware or data may vary']
      ]);
    } },
    { d: [2], f: function () {
      var al = some([['Linear search', 'O(1)', 'O(n)'], ['Binary search', 'O(1)', 'O(\\log n)'], ['Bubble sort', 'O(n)', 'O(n^2)'], ['Insertion sort', 'O(n)', 'O(n^2)'], ['Merge sort', 'O(n \\log n)', 'O(n \\log n)'], ['Quick sort', 'O(n \\log n)', 'O(n^2)']], 3);
      return Q('Best and worst case time complexities.', [
        ['Give the best and worst case for ' + list(al.map(function (x) { return x[0].toLowerCase(); })) + '.', 3, al.map(function (x) { return x[0] + ': best ' + M(x[1]) + ', worst ' + M(x[2]); }).join('; ')],
        ['Explain what the best case means for one of them.', 1, 'E.g. bubble sort on an already sorted list makes one pass with no swaps']
      ]);
    } },
    { d: [2], f: function () {
      var a = pick([2, 5, 10]), b = pick([50, 100, 200]);
      var n = 2; while (a * n * n <= b * n * Math.log2(n)) n++;
      return Q('Algorithm P takes ' + M(a + 'n^2') + ' steps and algorithm Q takes ' + M(b + 'n \\log_2 n') + ' steps.', [
        ['Find the smallest ' + M('n \\ge 2') + ' for which Q takes fewer steps than P.', 3, n],
        ['Explain why Big O alone would not tell you this.', 1, 'Big O ignores the constants, which decide where the curves cross']
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Space complexity.', [
        ['Explain what is meant by space complexity.', 1, 'How the memory needed grows with the input size'],
        ['Compare the space complexity of merge sort and bubble sort.', 2, 'Merge sort ' + M('O(n)') + ' extra for the merged lists; bubble sort sorts in place, ' + M('O(1)')],
        ['Explain why a faster algorithm is not always chosen.', 1, 'It may use too much memory, or be harder to write; for small n a simple algorithm may be faster']
      ]);
    } }
  ] });
  X('cs-complexity', [
    function () {
      var n = ri(6, 15);
      return Q('Consider this code.' + code(['count = 0', 'for i = 1 to n', '  for j = i + 1 to n', '    count = count + 1', '  next j', 'next i']), [
        ['Find count when ' + M('n = ' + n) + '.', 2, n * (n - 1) / 2],
        ['Find a general expression for count.', 2, M('\\frac{n(n - 1)}{2}')],
        ['State the complexity and justify it.', 1, M('O(n^2)') + ': the leading term is ' + M('\\frac{n^2}{2}')]
      ]);
    },
    function () {
      var k = ri(8, 12);
      return Q('Recursive Fibonacci makes about ' + M('2^n') + ' calls.', [
        ['Explain why it is exponential.', 2, 'Each call makes two more calls, so the call tree roughly doubles at each level'],
        ['Explain how memoisation reduces this to ' + M('O(n)') + '.', 2, 'Each value is stored the first time it is computed, so each ' + ic('fib(k)') + ' is only computed once']
      ]);
    },
    function () {
      var n = pick([1024, 4096, 65536]);
      return Q('Merge sort on ' + n.toLocaleString('en-GB') + ' items.', [
        ['How many levels of splitting are there?', 2, Math.log2(n)],
        ['Explain why each level does about ' + M('n') + ' work.', 1, 'Every item is merged once at each level'],
        ['Hence justify ' + M('O(n \\log n)') + '.', 1, M('\\log_2 n') + ' levels of ' + M('n') + ' work each']
      ]);
    },
    function () {
      var f = some(['O(1)', 'O(\\log n)', 'O(n)', 'O(n \\log n)', 'O(n^2)', 'O(2^n)'], 4);
      var order = ['O(1)', 'O(\\log n)', 'O(n)', 'O(n \\log n)', 'O(n^2)', 'O(2^n)'];
      return Q('Order these complexities from fastest growing to slowest growing: ' + f.map(M).join(', ') + '.', [
        ['Give the order.', 2, f.slice().sort(function (a, b) { return order.indexOf(b) - order.indexOf(a); }).map(M).join(', ')],
        ['Which are polynomial?', 1, f.filter(function (x) { return x !== 'O(2^n)'; }).map(M).join(', ')]
      ]);
    },
    function () {
      return Q('Hash tables and complexity.', [
        ['State the average and worst-case search complexity of a hash table.', 2, M('O(1)') + ' average; ' + M('O(n)') + ' worst (all keys collide)'],
        ['Compare with a balanced binary search tree.', 1, M('O(\\log n)') + ' search, but the data can be traversed in order']
      ]);
    }
  ]);

  /* =============================== Graph and tree algorithms =============================== */
  var N6 = ['A', 'B', 'C', 'D', 'E', 'F'];
  function geo() {
    var pts = [[0, 0]], tries = 0; while (pts.length < 6 && tries++ < 200) { var p = [ri(0, 10), ri(0, 10)]; if (pts.every(function (q) { return Math.hypot(p[0] - q[0], p[1] - q[1]) >= 3; })) pts.push(p); }
    if (pts.length < 6) return geo();
    var e = [], has = {};
    function add(i, j) { var k = Math.min(i, j) + '-' + Math.max(i, j); if (has[k] || i === j) return; has[k] = 1; e.push([Math.min(i, j), Math.max(i, j), Math.ceil(Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1])) + ri(0, 2)]); }
    for (var i = 1; i < 6; i++) { var best = -1, bd = 1e9; for (var j = 0; j < i; j++) { var d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]); if (d < bd) { bd = d; best = j; } } add(i, best); }
    for (var k = 0; k < 3; k++) { var a = ri(0, 5), b = ri(0, 5); add(a, b); }
    return { pts: pts, e: e };
  }
  function adj(e, n) { var L = []; for (var i = 0; i < n; i++) L.push([]); e.forEach(function (x) { L[x[0]].push([x[1], x[2]]); L[x[1]].push([x[0], x[2]]); }); L.forEach(function (l) { l.sort(function (a, b) { return a[0] - b[0]; }); }); return L; }
  function dijkstra(e, n, s) { var L = adj(e, n), d = [], prev = [], done = [], order = []; for (var i = 0; i < n; i++) d.push(Infinity); d[s] = 0; for (var k = 0; k < n; k++) { var u = -1; for (i = 0; i < n; i++) if (!done[i] && (u < 0 || d[i] < d[u])) u = i; if (d[u] === Infinity) break; done[u] = 1; order.push(u); L[u].forEach(function (x) { if (d[u] + x[1] < d[x[0]]) { d[x[0]] = d[u] + x[1]; prev[x[0]] = u; } }); } return { d: d, prev: prev, order: order }; }
  function path(prev, t) { var p = [t]; while (prev[t] !== undefined) { t = prev[t]; p.unshift(t); } return p.map(function (i) { return N6[i]; }).join(' → '); }
  function astar(g, s, t) { var n = 6, L = adj(g.e, n), h = g.pts.map(function (p) { return Math.floor(Math.hypot(p[0] - g.pts[t][0], p[1] - g.pts[t][1])); }), gs = [], prev = [], closed = [], open = [s], order = []; for (var i = 0; i < n; i++) gs.push(Infinity); gs[s] = 0;
    while (open.length) { open.sort(function (a, b) { return (gs[a] + h[a]) - (gs[b] + h[b]) || a - b; }); var u = open.shift(); if (closed[u]) continue; closed[u] = 1; order.push(u); if (u === t) break; L[u].forEach(function (x) { if (closed[x[0]]) return; var ng = gs[u] + x[1]; if (ng < gs[x[0]]) { gs[x[0]] = ng; prev[x[0]] = u; if (open.indexOf(x[0]) < 0) open.push(x[0]); } }); }
    return { h: h, order: order, prev: prev, cost: gs[t] }; }
  function goodGeo(t, needGain) {
    for (var k = 0; k < 200; k++) {
      var g = geo(); if (g.e.some(function (x) { return x[0] === 0 && x[1] === t; })) continue;
      var d = dijkstra(g.e, 6, 0); if (d.d[t] === Infinity) continue;
      var hops = 0, u = t; while (d.prev[u] !== undefined) { u = d.prev[u]; hops++; } if (hops < 2) continue;
      if (needGain) { var r = astar(g, 0, t); if (r.order.length >= d.order.indexOf(t) + 1) continue; }
      return g;
    }
    return g;
  }
  function etable(e) { return table(['Edge', 'Weight'], e.map(function (x) { return [N6[x[0]] + N6[x[1]], x[2]]; })); }
  function bfs(L, s) { var seen = [s], q = [s], out = []; while (q.length) { var u = q.shift(); out.push(N6[u]); L[u].forEach(function (x) { if (seen.indexOf(x[0]) < 0) { seen.push(x[0]); q.push(x[0]); } }); } return out; }
  function dfs(L, s) { var seen = [], out = []; (function go(u) { seen.push(u); out.push(N6[u]); L[u].forEach(function (x) { if (seen.indexOf(x[0]) < 0) go(x[0]); }); })(s); return out; }
  T({ id: 'cs-graph-algorithms', name: 'Graph traversal, Dijkstra and A*', video: 'OCR A level computer science dijkstra A star breadth first depth first', gens: [
    { d: [1, 2], f: function () {
      var g = geo(), L = adj(g.e, 6);
      return Q('A graph has edges ' + g.e.map(function (x) { return N6[x[0]] + N6[x[1]]; }).join(', ') + '. Neighbours are visited in alphabetical order.', [
        ['Give the order of a breadth-first traversal from A.', 2, bfs(L, 0).join(', ')],
        ['Give the order of a depth-first traversal from A.', 2, dfs(L, 0).join(', ')],
        ['State the data structure used by each traversal.', 2, 'Breadth-first: a queue. Depth-first: a stack (or recursion)']
      ]);
    } },
    { d: [2], f: function () {
      var t = ri(3, 5), g = goodGeo(t), r = dijkstra(g.e, 6, 0);
      return Q('Use Dijkstra’s algorithm to find the shortest path from A to ' + N6[t] + '.' + etable(g.e), [
        ['Give the shortest distance and the path.', 4, r.d[t] + ': ' + path(r.prev, t)],
        ['Give the order in which nodes are visited (made permanent).', 2, r.order.map(function (i) { return N6[i]; }).join(', ')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var t = 5, g = goodGeo(t), r = astar(g, 0, t);
      return Q('Use the A* algorithm to find the shortest path from A to F. The heuristic is the straight-line distance to F, rounded down.' + etable(g.e) + table(['Node'].concat(N6), [['h'].concat(r.h)]), [
        ['Give the order in which nodes are visited (removed from the open list), breaking ties alphabetically.', 4, r.order.map(function (i) { return N6[i]; }).join(', ')],
        ['Give the path found and its length.', 2, path(r.prev, t) + ', ' + r.cost]
      ]);
    } },
    { d: [1, 2], f: function () {
      var keys = arr(7, 10, 90, true), root = null;
      function ins(n, k) { if (!n) return { k: k }; if (k < n.k) n.l = ins(n.l, k); else n.r = ins(n.r, k); return n; }
      keys.forEach(function (k) { root = ins(root, k); });
      var lv = [], q = [root]; while (q.length) { var u = q.shift(); lv.push(u.k); if (u.l) q.push(u.l); if (u.r) q.push(u.r); }
      var po = []; (function post(n) { if (!n) return; post(n.l); post(n.r); po.push(n.k); })(root);
      return Q('A binary search tree is built by inserting ' + keys.join(', ') + ' in order.', [
        ['Give a breadth-first traversal.', 2, lv.join(', ')],
        ['Give a post-order (depth-first) traversal.', 2, po.join(', ')],
        ['Give one use of a post-order traversal.', 1, 'Deleting a tree, or evaluating an expression tree in Reverse Polish']
      ]);
    } },
    { d: [2], f: function () {
      return Q('Comparing Dijkstra and A*.', [
        ['Explain how A* differs from Dijkstra’s algorithm.', 2, 'A* adds a heuristic estimate of the remaining distance, ' + M('f = g + h') + ', so it explores towards the goal'],
        ['Explain what makes a heuristic admissible.', 1, 'It never overestimates the true remaining cost'],
        ['Explain why A* with a poor heuristic can be no better than Dijkstra.', 1, 'If ' + M('h = 0') + ' for all nodes it becomes Dijkstra']
      ]);
    } }
  ] });
  X('cs-graph-algorithms', [
    function () {
      var g = geo(), L = adj(g.e, 6), st = [0], seen = [], snaps = [];
      while (st.length && snaps.length < 4) { var u = st.pop(); if (seen.indexOf(u) >= 0) continue; seen.push(u); L[u].slice().reverse().forEach(function (x) { if (seen.indexOf(x[0]) < 0) st.push(x[0]); }); snaps.push(N6[u] + ' visited, stack ' + (st.length ? st.map(function (i) { return N6[i]; }).join('') : 'empty') + ' (top on right)'); }
      return Q('An iterative depth-first search from A uses a stack. Unvisited neighbours are pushed in reverse alphabetical order, so the alphabetically first is on top. Edges: ' + g.e.map(function (x) { return N6[x[0]] + N6[x[1]]; }).join(', ') + '.', [
        ['Show the stack after each of the first four visits.', 4, snaps.join('; ')]
      ]);
    },
    function () {
      var g = geo(), r = dijkstra(g.e, 6, 0);
      return Q('Using Dijkstra’s algorithm from A on these edges:' + etable(g.e), [
        ['Give the shortest distance from A to every node.', 3, [1, 2, 3, 4, 5].map(function (i) { return N6[i] + ' ' + r.d[i]; }).join(', ')],
        ['Explain why Dijkstra’s algorithm fails with negative weights.', 1, 'A node made permanent might later be reachable more cheaply']
      ]);
    },
    function () {
      return Q('Write pseudocode for a breadth-first traversal of a graph stored as an adjacency list.', [
        ['Write the algorithm.', 6, code(['procedure bfs(graph, start)', '  visited = [start]', '  queue = new Queue()', '  queue.enqueue(start)', '  while NOT queue.isEmpty()', '    node = queue.dequeue()', '    print(node)', '    for each n in graph[node]', '      if n NOT in visited then', '        visited.append(n)', '        queue.enqueue(n)', '      endif', '    next n', '  endwhile', 'endprocedure'])],
        ['Explain why breadth-first search finds the path with fewest edges.', 1, 'It visits all nodes at distance 1, then 2, and so on']
      ]);
    },
    function () {
      var t = 5, g = goodGeo(t, true), r = astar(g, 0, t), d = dijkstra(g.e, 6, 0);
      return Q('A* versus Dijkstra from A to F on this graph, with straight-line heuristic h (rounded down).' + etable(g.e) + table(['Node'].concat(N6), [['h'].concat(r.h)]), [
        ['How many nodes does A* visit?', 2, r.order.length],
        ['How many does Dijkstra visit before F is permanent?', 2, d.order.indexOf(t) + 1],
        ['Do both find the same length? Explain.', 1, (r.cost === d.d[t] ? 'Yes, ' + r.cost : 'They differ') + ': the heuristic is admissible']
      ]);
    },
    function () {
      return Q('Expression trees.', [
        ['Draw (describe) the expression tree for ' + ic('(3 + 4) * (5 - 2)') + '.', 2, 'Root *, left child + with 3 and 4, right child − with 5 and 2'],
        ['Give the post-order traversal.', 1, '3 4 + 5 2 - *'],
        ['Explain how a stack evaluates it.', 2, 'Push numbers; on an operator pop two values, apply it and push the result; the final value is 21']
      ]);
    }
  ]);

  /* ---------------- Reasoning statements ---------------- */
  Cn('cs-thinking', [
    ['T', Sr`Abstraction removes details that are not needed for the problem.`, Sr`It simplifies the model.`],
    ['F', Sr`Concurrent processing means two instructions execute at exactly the same instant.`, Sr`Tasks are in progress at the same time, possibly by switching.`],
    ['S', Sr`Caching makes programs faster.`, Sr`Only when the same data is needed again.`]
  ]);
  Cn('cs-programming', [
    ['T', Sr`A recursive function must have a base case.`, Sr`Otherwise it never stops.`],
    ['F', Sr`Passing by value lets a subroutine change the original variable.`, Sr`It works on a copy.`],
    ['S', Sr`Recursion uses more memory than iteration.`, Sr`Usually, because of stack frames.`]
  ]);
  Cn('cs-oop', [
    ['T', Sr`An object is an instance of a class.`, Sr`The class is the template.`],
    ['F', Sr`Private attributes can be changed directly from the main program.`, Sr`Only through public methods.`],
    ['A', Sr`A subclass inherits the methods of its superclass.`, Sr`It can also override them.`]
  ]);
  Cn('cs-methods', [
    ['T', Sr`A heuristic may not find the best solution.`, Sr`It trades accuracy for speed.`],
    ['F', Sr`Backtracking tries every possible complete solution.`, Sr`It abandons partial solutions early.`],
    ['S', Sr`Divide and conquer reduces the time taken.`, Sr`When the parts are smaller and easy to combine.`]
  ]);
  Cn('cs-search-sort', [
    ['T', Sr`Binary search needs a sorted list.`, Sr`It discards half based on order.`],
    ['F', Sr`Merge sort is \(O(n^2)\) in the worst case.`, Sr`It is \(O(n \log n)\) in every case.`],
    ['S', Sr`Insertion sort is faster than merge sort.`, Sr`For small or nearly sorted lists.`]
  ]);
  Cn('cs-complexity', [
    ['T', Sr`\(O(\log n)\) grows more slowly than \(O(n)\).`, Sr`Doubling n adds one step.`],
    ['F', Sr`An \(O(n^2)\) algorithm is always slower than an \(O(n)\) one.`, Sr`For small n the constants can make it faster.`],
    ['N', Sr`An exponential algorithm is tractable for large inputs.`, Sr`Its time grows too fast.`]
  ]);
  Cn('cs-graph-algorithms', [
    ['T', Sr`Breadth-first traversal uses a queue.`, Sr`Nodes are visited level by level.`],
    ['F', Sr`A* always visits fewer nodes than Dijkstra.`, Sr`With a poor heuristic it may visit as many.`],
    ['A', Sr`Dijkstra’s algorithm with non-negative weights finds the shortest path.`, Sr`It is proven optimal.`]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
