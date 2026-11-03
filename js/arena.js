/* Maths Arena for the TMUA and ESAT course: classwork and homework for each lesson.
   Pupils answer a set of questions, press Submit and see their mark with worked answers.
   Nothing is saved or sent anywhere: answers live only in this page until it is closed.
   Links: #C4 opens Lesson 4 classwork, #H4 opens Lesson 4 homework. */
(function () {
  var D = window.ARENA, app = document.getElementById('arena');
  if (!D || !app) return;
  var LET = 'ABCDEFGH', LVL = ['', 'Core skill', 'Stepping stone', 'Exam standard'];
  var KIND = { C: { key: 'cw', name: 'Classwork', note: 'Questions at real TMUA and ESAT standard. Work without a calculator, and aim for about three minutes a question.' },
               H: { key: 'hw', name: 'Homework', note: 'Choose one answer for each question. You can change your mind until you press Submit.' } };
  var current = '', started = false;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function lesson(n) { for (var i = 0; i < D.lessons.length; i++) if (D.lessons[i].n === n) return D.lessons[i]; return null; }

  function home() {
    current = '';
    if (location.hash) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} }
    app.innerHTML =
      '<p class="lede">Each lesson has <b>classwork</b> to do in the lesson, at real TMUA and ESAT standard, and <b>homework</b> to do afterwards. Answer all the questions, then press <b>Submit answers</b> to have them marked and see the worked answers. No calculator. Nothing is saved or sent anywhere.</p>' +
      '<ol class="ar-grid">' + D.lessons.map(function (l) {
        return '<li class="ar-lesson"><span class="ar-num">Lesson ' + l.n + '</span><span class="ar-t">' + esc(l.title) + '</span><span class="ar-s">' + esc(l.short) + '</span>' +
          '<span class="ar-pick"><a href="#C' + l.n + '">Classwork</a><a href="#H' + l.n + '">Homework</a></span></li>';
      }).join('') + '</ol>';
    window.scrollTo(0, 0);
  }

  function sheet(n, k) {
    var l = lesson(n); if (!l) { home(); return; }
    var K = KIND[k], QS = l[K.key], id = k + n;
    current = id;
    if (location.hash !== '#' + id) location.hash = id;
    var chosen = QS.map(function () { return -1; }), marked = false;

    function answered() { return chosen.filter(function (c) { return c >= 0; }).length; }
    function render() {
      var score = QS.reduce(function (s, q, i) { return s + (chosen[i] === q.a ? 1 : 0); }, 0), total = QS.length;
      var verdict = score === total ? 'Full marks. Excellent.' : score >= total * 0.75 ? 'Strong work.' : score >= total / 2 ? 'Good effort: read the worked answers below.' : 'Keep going: read each worked answer, then try again tomorrow.';
      app.innerHTML =
        '<div class="ar-head"><p class="ar-kicker">Lesson ' + n + '</p><h2>' + esc(l.title) + '</h2></div>' +
        '<nav class="ar-tabs" aria-label="Classwork or homework">' + ['C', 'H'].map(function (x) {
          return '<a href="#' + x + n + '"' + (x === k ? ' aria-current="page"' : '') + '>' + KIND[x].name + '</a>';
        }).join('') + '</nav>' +
        (marked
          ? '<div class="ar-score" id="ar-score" tabindex="-1"><div class="ar-big">' + score + '/' + total + '</div><div><b>' + verdict + '</b><p>Green shows the correct answer. Red shows your answer where it was wrong.</p></div></div>'
          : '<p class="ar-note">' + K.note + '</p>') +
        QS.map(function (q, i) {
          var ok = chosen[i] === q.a, many = q.o.length > 5 && q.o.every(function (o) { return o.length < 28; });
          return '<section class="ar-q' + (marked ? (ok ? ' ok' : ' no') : '') + '" aria-label="Question ' + (i + 1) + '">' +
            '<div class="ar-qhead"><span class="ar-qnum">' + (i + 1) + '</span><span class="ar-lvl' + (q.lvl === 3 ? ' l3' : '') + '">' + LVL[q.lvl] + '</span>' +
              (marked ? '<span class="ar-verdict">' + (ok ? '✓ Correct' : (chosen[i] < 0 ? '✗ Not answered' : '✗ Incorrect')) + '</span>' : '') + '</div>' +
            '<p class="ar-text">' + esc(q.q).replace(k === 'C' ? /\s{2,}(\(?I{1,3}[:)])/g : /\s{2,}(I{1,3}:)/g, '<br>$1') + '</p>' +
            '<div class="ar-opts' + (many ? ' two' : '') + '">' + q.o.map(function (o, j) {
              var cls = 'ar-opt';
              if (!marked && chosen[i] === j) cls += ' sel';
              if (marked && j === q.a) cls += ' right';
              if (marked && j === chosen[i] && j !== q.a) cls += ' wrong';
              return '<button type="button" class="' + cls + '" data-i="' + i + '" data-k="' + j + '"' + (marked ? ' disabled' : '') + ' aria-pressed="' + (chosen[i] === j) + '"><span class="ar-bub">' + LET[j] + '</span><span class="ar-txt">' + esc(o) + '</span></button>';
            }).join('') + '</div>' +
            (marked ? '<div class="ar-why"><b>Answer ' + LET[q.a] + '.</b> ' + esc(q.w) + '</div>' : '') +
          '</section>';
        }).join('') +
        '<div class="ar-bar">' + (marked
          ? '<span><b>' + score + '/' + total + '</b> correct</span><div class="ar-row"><button type="button" class="btn" id="ar-again">Try again</button>' +
            (k === 'C' ? '<a class="btn ar-ghost" href="#H' + n + '">Homework</a>' : '') + '<button type="button" class="btn ar-ghost" id="ar-all">All lessons</button></div>'
          : '<span id="ar-count">' + answered() + ' of ' + total + ' answered</span><div class="ar-row" id="ar-act"></div>') + '</div>';

      if (!marked) {
        app.querySelectorAll('.ar-opt').forEach(function (b) {
          b.addEventListener('click', function () {
            chosen[+b.dataset.i] = +b.dataset.k;
            b.parentElement.querySelectorAll('.ar-opt').forEach(function (x) { x.classList.toggle('sel', x === b); x.setAttribute('aria-pressed', x === b); });
            document.getElementById('ar-count').textContent = answered() + ' of ' + total + ' answered';
            resetSubmit();
          });
        });
        resetSubmit();
      } else {
        document.getElementById('ar-again').addEventListener('click', function () { current = ''; sheet(n, k); });
        document.getElementById('ar-all').addEventListener('click', home);
      }
    }
    function resetSubmit() {
      var act = document.getElementById('ar-act');
      act.innerHTML = '<button type="button" class="btn ar-submit" id="ar-submit">Submit answers</button>';
      document.getElementById('ar-submit').addEventListener('click', function () {
        var blank = QS.length - answered();
        if (!blank) { submit(); return; }
        act.innerHTML = '<span class="ar-warn">' + blank + ' not answered.</span><button type="button" class="btn ar-submit" id="ar-yes">Submit anyway</button><button type="button" class="btn ar-ghost" id="ar-no">Keep going</button>';
        document.getElementById('ar-yes').addEventListener('click', submit);
        document.getElementById('ar-no').addEventListener('click', function () {
          resetSubmit();
          var first = chosen.indexOf(-1); app.querySelectorAll('.ar-q')[first].scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      });
    }
    function submit() { marked = true; render(); var s = document.getElementById('ar-score'); s.scrollIntoView({ block: 'start' }); s.focus({ preventScroll: true }); }
    render(); window.scrollTo(0, 0);
  }

  function route() {
    var m = (location.hash || '').replace('#', '').match(/^([CH]?)(\d+)$/i);
    if (m && lesson(+m[2])) { var k = (m[1] || 'H').toUpperCase(); if (k + (+m[2]) !== current) sheet(+m[2], k); }
    else if (current || !started) home();
    started = true;
  }
  window.addEventListener('hashchange', route);
  route();
})();
