/* Byte Size — Do Now, Exit Ticket and Revision tools */
(function () {
  var BS = window.BS;
  var root = document.getElementById('tool');
  if (!root) return;
  var TEACHER = { donow: 'Do Now', exit: 'Exit ticket', plenary: 'Plenary', revise: 'Revision worksheet' };
  var PUPIL = { practise: 'Practise', paper: 'Practice paper' };
  var qm = null; try { qm = new URLSearchParams(location.search).get('m'); } catch (e) {}
  var savedRole = null; try { savedRole = localStorage.getItem('bsc-role'); } catch (e) {}
  var role = PUPIL[qm] ? 'pupil' : TEACHER[qm] ? 'teacher' : (savedRole === 'pupil' ? 'pupil' : 'teacher');
  var MODES = role === 'pupil' ? PUPIL : TEACHER;
  var mode = MODES[qm] ? qm : (role === 'pupil' ? 'practise' : 'donow');
  try { localStorage.setItem('bsc-role', role); } catch (e) {}
  document.body.setAttribute('data-role', role);
  document.querySelectorAll('.role-switch [data-set-role]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-set-role') === role); });
  var fixed = root.dataset.fixed === '1'; // course page: the course comes from the address
  var LET = 'abcdefghij';

  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem(key) || 'null');
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tex(el) {
    var MJ = window.MathJax;
    if (!MJ || !MJ.startup || !MJ.startup.promise) { setTimeout(function () { tex(el); }, 150); return; }
    MJ.startup.promise.then(function () { if (MJ.typesetClear) MJ.typesetClear([el]); return MJ.typesetPromise([el]); }).catch(function () {});
  }
  function videoUrl(t) { return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(t.video); }
  function course(id) { return BS.courses.filter(function (c) { return c.id === id; })[0]; }
  function lvl(c, d) { return (c.levels || BS.LEVELS)[d]; }
  function isIB() { var c = course(state.course); return c && c.style === 'ib'; }

  var prefs = store('bytesize-prefs') || {};
  var live = BS.courses.filter(function (c) { return c.status === 'live'; });
  var state = {
    course: (prefs.course && course(prefs.course) && course(prefs.course).status === 'live') ? prefs.course : 'igcse',
    topic: prefs.topic || 'mixed',
    diff: prefs.diff || null,
    count: 5, mins: prefs.mins || 45
  };
  var COUNTS = { donow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], exit: [1, 2, 3, 4, 5, 6, 8], revise: [5, 8, 10, 12, 15, 20] };
  var DEFN = { donow: 5, exit: 3, revise: 10 };
  if (COUNTS[mode]) { var pc = prefs['n_' + mode]; state.count = COUNTS[mode].indexOf(pc) > -1 ? pc : DEFN[mode]; }
  var EXT = mode === 'donow' || mode === 'exit';
  state.ext = EXT && prefs['x_' + mode] === true;

  /* ---------- Controls ---------- */
  var groups = {};
  BS.courses.forEach(function (c) { (groups[c.group] = groups[c.group] || []).push(c); });
  var courseOpts = Object.keys(groups).map(function (gname) {
    return '<optgroup label="' + esc(gname) + '">' + groups[gname].map(function (c) {
      return '<option value="' + c.id + '"' + (c.status !== 'live' ? ' disabled' : '') + '>' + esc(c.name) + (c.status !== 'live' ? ' (coming soon)' : '') + '</option>';
    }).join('') + '</optgroup>';
  }).join('');

  var countCtl = COUNTS[mode] ?
    '<label class="ctl"><span>Questions</span><select id="bs-count">' + COUNTS[mode].map(function (n) { return '<option value="' + n + '">' + n + '</option>'; }).join('') + '</select></label>'
    : mode === 'paper' ? '<label class="ctl"><span>Length</span><select id="bs-mins">' + [30, 45, 60, 90].map(function (n) { return '<option value="' + n + '">' + n + ' minutes</option>'; }).join('') + '</select></label>' : '';
  var newLabel = { donow: 'New Do Now', exit: 'New exit ticket', revise: 'New worksheet', practise: 'New question', paper: 'New paper' }[mode];

  var LEDE = {
    donow: 'A fresh set of exam-style starter questions every time you press <b>New Do Now</b>. Choose one topic or mixed retrieval, then press <b>Present</b> to put it on the board.',
    exit: 'A short check at the end of the lesson, finishing with a confidence rating. Plenary ideas for any lesson are below.',
    plenary: 'Choose the topic and difficulty, then pick a plenary below. Each one is made from questions in this course.',
    revise: 'A longer set of exam-style questions for a revision lesson or homework. Press <b>Print</b> for a paper copy; show the answers first to print the mark scheme too.',
    practise: 'One question at a time. Answer on paper, then check the mark scheme. Anything you get wrong goes on your list of things to work on, with a video to help.',
    paper: 'A timed practice paper made from questions across the course, getting harder as you go. Start the timer, answer on paper, then mark your work with the mark scheme.'
  };
  LEDE.exit = 'A short check at the end of the lesson, finishing with a confidence rating.';
  var tabs = fixed ? '<nav class="modes" aria-label="Activity">' + Object.keys(MODES).map(function (m) {
    return '<a href="course.html?m=' + m + location.hash + '"' + (m === mode ? ' aria-current="page"' : '') + '>' + MODES[m] + '</a>';
  }).join('') + '</nav><p class="mode-lede">' + LEDE[mode] + '</p>' : '';
  root.innerHTML = tabs +
    '<div class="controls">' +
      '<label class="ctl wide"' + (fixed ? ' hidden' : '') + '><span>Course</span><select id="bs-course">' + courseOpts + '</select></label>' +
      '<label class="ctl wide"><span>Topic</span><select id="bs-topic"></select></label>' +
      '<div class="ctl"' + (mode === 'paper' ? ' hidden' : '') + '><span id="bs-diff-label">Difficulty</span><div class="seg" id="bs-diff" role="group" aria-labelledby="bs-diff-label"></div></div>' +
      countCtl +
      (EXT ? '<div class="ctl"><span id="bs-ext-label">Extension question</span><div class="seg" id="bs-ext" role="group" aria-labelledby="bs-ext-label"><button type="button" data-x="0" aria-pressed="' + !state.ext + '">None</button><button type="button" data-x="1" aria-pressed="' + state.ext + '">Add one</button></div></div>' : '') +
      (mode === 'plenary' ? '' : '<button type="button" class="btn" id="bs-new">' + newLabel + '</button>') +
    '</div>' +
    (mode === 'practise'
      ? '<div class="revise-grid"><div id="bs-stage"></div><aside class="progress" id="bs-progress" aria-live="polite"></aside></div>'
      : '<div id="bs-stage"></div>');

  var $course = document.getElementById('bs-course'), $topic = document.getElementById('bs-topic'),
      $diff = document.getElementById('bs-diff'), $count = document.getElementById('bs-count'),
      $stage = document.getElementById('bs-stage'), $mins = document.getElementById('bs-mins');

  function fillTopics() {
    var c = course(state.course);
    function opt(t) { return '<option value="' + t + '">' + esc(BS.topics[t].name) + '</option>'; }
    var opts = '<option value="mixed">' + (mode === 'practise' ? 'All topics (mixed)' : mode === 'paper' ? 'Whole course' : 'Mixed retrieval (all topics)') + '</option>' +
      (c.groups ? c.groups.map(function (gp) { return '<optgroup label="' + esc(gp[0]) + '">' + gp[1].map(opt).join('') + '</optgroup>'; }).join('') : c.topics.map(opt).join(''));
    $topic.innerHTML = opts;
    if (state.topic !== 'mixed' && c.topics.indexOf(state.topic) < 0) state.topic = 'mixed';
    $topic.value = state.topic;
    if (!state.diff || c.diffs.indexOf(state.diff) < 0) state.diff = c.def;
    $diff.innerHTML = c.diffs.map(function (d) {
      return '<button type="button" data-d="' + d + '" aria-pressed="' + (d === state.diff) + '">' + lvl(c, d) + '</button>';
    }).join('');
  }
  // A link such as do-now.html#last-q opens that topic directly
  var hashT = (location.hash || '').slice(1);
  // ...and do-now.html#course=igcse opens that course
  if (hashT.indexOf('course=') === 0) {
    var hc = course(hashT.slice(7).split('&')[0]);
    if (hc && hc.status === 'live') { if (state.course !== hc.id) { state.topic = 'mixed'; state.diff = null; } state.course = hc.id; }
    hashT = '';
  }
  if (hashT && BS.topics[hashT]) {
    var cur = course(state.course);
    if (!cur || cur.topics.indexOf(hashT) < 0) { var found = live.filter(function (c) { return c.topics.indexOf(hashT) > -1; })[0]; if (found) state.course = found.id; }
    state.topic = hashT;
  }
  if (fixed) {
    var fc = course((location.hash.match(/course=([\w-]+)/) || [])[1]);
    if (!fc || fc.status !== 'live') { location.replace('maths.html'); return; }
    var ft = (location.hash.match(/[&#]t=([\w-]+)/) || [])[1];
    if (ft && fc.topics.indexOf(ft) > -1) { state.topic = ft; fillTopics(); }
    var T = (window.BS_TITLES || {})[fc.id] || [fc.name, ''];
    var h = document.getElementById('course-title'), sub = document.getElementById('course-sub');
    if (h) h.textContent = T[0]; if (sub) sub.textContent = T[1];
    document.title = T[0] + ' · ' + MODES[mode] + ' | Byte Size Classroom';
    var pl = document.getElementById('plenaries'); if (pl) pl.hidden = mode !== 'plenary';
    var pp = document.getElementById('past-papers'); if (pp) pp.hidden = mode !== 'paper';
  }
  $course.value = state.course;
  fillTopics();
  if ($count) $count.value = String(state.count);

  function save() { if (COUNTS[mode]) prefs['n_' + mode] = state.count; if (EXT) prefs['x_' + mode] = state.ext; prefs.course = state.course; prefs.topic = state.topic; prefs.diff = state.diff; prefs.mins = state.mins; store('bytesize-prefs', prefs); }

  $course.addEventListener('change', function () { state.course = $course.value; state.diff = null; fillTopics(); save(); build(); });
  $topic.addEventListener('change', function () { state.topic = $topic.value; save(); build(); });
  $diff.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    state.diff = Number(b.dataset.d);
    $diff.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    save(); build();
  });
  var $ext = document.getElementById('bs-ext');
  if ($ext) $ext.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    state.ext = b.dataset.x === '1';
    $ext.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    save(); build();
  });
  if ($count) $count.addEventListener('change', function () { state.count = Number($count.value); save(); build(); });
  if ($mins) { $mins.value = String(state.mins); $mins.addEventListener('change', function () { state.mins = Number($mins.value); save(); build(); }); }
  var $new = document.getElementById('bs-new'); if ($new) $new.addEventListener('click', build);

  /* ---------- Rendering ---------- */
  function renderQ(q, n, showTopic) {
    var t = BS.topics[q.topic];
    var single = q.parts.length === 1, ib = isIB();
    var parts = q.parts.map(function (p, i) {
      return '<div class="part">' +
        (single ? '' : '<span class="plabel">(' + LET[i] + ')</span>') +
        '<div class="ptext">' + p.q + '</div>' +
        '<span class="marks">' + (ib ? '[' + p.m + ']' : '(' + p.m + ')') + '</span>' +
        '<div class="ans"><span class="ans-k">' + (single ? 'Answer' : '(' + LET[i] + ')') + '</span> ' + p.a + '</div>' +
      '</div>';
    }).join('');
    return '<section class="q" data-topic="' + q.topic + '">' +
      '<div class="qnum">' + n + '</div>' +
      '<div class="qbody">' +
        (ib ? '<p class="maxmark">[Maximum mark: ' + q.marks + ']</p>' : '') +
        (q.stem ? '<div class="stem">' + q.stem + '</div>' : '') +
        parts +
        (ib ? '' : '<p class="total">(Total for Question ' + n + ' is ' + q.marks + ' mark' + (q.marks === 1 ? '' : 's') + ')</p>') +
        (showTopic ? '<p class="qtopic">' + esc(t.name) + '</p>' : '') +
      '</div>' +
    '</section>';
  }

  function pickTopics(n) {
    var c = course(state.course);
    if (state.topic !== 'mixed') { var a = []; for (var i = 0; i < n; i++) a.push(state.topic); return a; }
    var sh = BS.shuffle(c.topics.filter(function (t) { return !BS.topics[t].noMix; })), out = [];
    for (var j = 0; j < n; j++) out.push(sh[j % sh.length]);
    return out;
  }

  function build() {
    if (mode === 'practise') { nextRevise(); return; }
    if (mode === 'plenary') { $stage.innerHTML = ''; return; }
    if (mode === 'paper') { buildPaper(); return; }
    var c = course(state.course), used = new Set();
    var qs = pickTopics(state.count).map(function (t) { return BS.make(t, state.diff, used, !!course(state.course).foundation); });
    var marks = qs.reduce(function (s, q) { return s + q.marks; }, 0);
    // Extension question for early finishers: the top-level (extension) question for one of the topics in the set
    var xq = null;
    if (EXT && state.ext) {
      var cand = qs.map(function (q) { return q.topic; }).filter(function (t) { return BS.topics[t].gens.some(function (g) { return g.x; }); });
      var xt = cand.length ? BS.pick(cand) : qs[0].topic;
      xq = BS.make(xt, 3, used, !!c.foundation);
    }
    var lead = { donow: 'Do Now', exit: 'Exit ticket', revise: 'Revision worksheet' }[mode];
    var title = state.topic === 'mixed' ? (mode === 'donow' ? 'Do Now: mixed retrieval' : lead) : lead + ': ' + BS.topics[state.topic].name;
    var mins = mode === 'exit' ? Math.max(4, qs.length + 1) : Math.max(5, Math.round(marks * 0.8));
    $stage.innerHTML =
      '<article class="paper slide" id="bs-paper">' +
        '<header><span class="tag">' + esc(c.name) + ' · ' + lvl(course(state.course), state.diff) + '</span><span class="time">' + marks + ' marks · about ' + mins + ' min' + (xq ? ' + extension' : '') + '</span></header>' +
        '<div class="body">' +
          '<h2 class="paper-title">' + esc(title) + '</h2>' +
          '<p class="instr">' + (isIB() ? 'Answer all questions. A graphic display calculator is required. Unless otherwise stated, give answers exactly or correct to three significant figures.' : 'Answer all questions. Show all your working.') + '</p>' +
          qs.map(function (q, i) { return renderQ(q, i + 1, state.topic === 'mixed'); }).join('') +
          (xq ? '<div class="ext-block"><p class="ext-head"><span class="ext-badge">Extension</span> Finished early? Try this.</p>' + renderQ(xq, '★', true).replace('<section class="q"', '<section class="q ext"').replace('Total for Question ★', 'Total for the extension question') + '</div>' : '') +
          (mode === 'exit' ? '<div class="reflect-box"><p><b>How confident do you feel?</b> <span class="scale">1&nbsp;&nbsp;2&nbsp;&nbsp;3&nbsp;&nbsp;4&nbsp;&nbsp;5</span></p><p><b>One thing I am still unsure about:</b></p><div class="write-line"></div></div>' : '') +
        '</div>' +
        '<footer><button type="button" data-answers aria-pressed="false">Show answers</button><button type="button" data-new>New questions</button>' + (mode === 'revise' ? '<button type="button" data-print>Print</button>' : '') + '<button type="button" class="present">Present</button></footer>' +
      '</article>';
    wirePaper();
    tex($stage);
  }

  /* ---------- Practice paper (pupils) ---------- */
  var timer = null;
  function boardLinks(c) {
    if (c.id === 'aqa-fm') return '<a href="https://www.aqa.org.uk/find-past-papers-and-mark-schemes" target="_blank" rel="noopener">AQA past papers and mark schemes</a>';
    if (c.style === 'ib') return 'IB past papers are sold by the IB, so ask your teacher for school copies.';
    return '<a href="https://qualifications.pearson.com/en/support/support-topics/exams/past-papers.html" target="_blank" rel="noopener">Pearson Edexcel past papers and mark schemes</a>';
  }
  function buildPaper() {
    if (timer) { clearInterval(timer); timer = null; }
    var c = course(state.course), ds = c.diffs.slice().sort(), target = Math.round(state.mins * (isIB() ? 0.9 : 1)), qs = [], used = new Set(), total = 0, guard = 0;
    var pool = state.topic === 'mixed' ? BS.shuffle(c.topics.filter(function (t) { return !BS.topics[t].noMix; })) : [state.topic];
    while (total < target - 2 && guard++ < 200) {
      var stage = total / target, d = ds[Math.min(ds.length - 1, Math.floor(stage * ds.length))];
      var q = BS.make(pool[qs.length % pool.length], d, used, !!c.foundation);
      if (total + q.marks > target + 3 && qs.length) continue;
      q.stage = d; qs.push(q); total += q.marks;
    }
    qs.sort(function (a, b) { return a.stage - b.stage; });
    $stage.innerHTML =
      '<article class="paper slide exam" id="bs-paper">' +
        '<header><span class="tag">Practice paper · ' + esc(c.name) + '</span><span class="time">' + total + ' marks · ' + state.mins + ' minutes</span></header>' +
        '<div class="body">' +
          '<div class="exam-top"><h2 class="paper-title">Practice paper' + (state.topic === 'mixed' ? '' : ': ' + esc(BS.topics[state.topic].name)) + '</h2>' +
          '<div class="clock"><span id="bs-clock" aria-live="off">' + state.mins + ':00</span><button type="button" class="btn" data-start>Start timer</button></div></div>' +
          '<p class="instr">' + (isIB() ? 'Answer all questions. A graphic display calculator is required. Unless otherwise stated, give answers exactly or correct to three significant figures.' : 'Answer all questions on paper. Show all your working. Questions get harder as you go through the paper.') + ' Total ' + total + ' marks.</p>' +
          '<p class="instr note">This paper is made from Byte Size Classroom questions. It is not an official past paper.</p>' +
          qs.map(function (q, i) { return renderQ(q, i + 1, false); }).join('') +
          '<div class="score" id="bs-score" hidden></div>' +
        '</div>' +
        '<footer><button type="button" class="btn" data-finish>Finish and mark</button><button type="button" data-new>New paper</button><button type="button" data-print>Print</button></footer>' +
      '</article>';
    var paper = document.getElementById('bs-paper'), clock = document.getElementById('bs-clock'), left = state.mins * 60;
    paper.querySelector('[data-start]').addEventListener('click', function (e) {
      var b = e.currentTarget;
      if (timer) { clearInterval(timer); timer = null; b.textContent = 'Resume timer'; return; }
      b.textContent = 'Pause timer';
      timer = setInterval(function () {
        left--; var m = Math.floor(Math.max(left, 0) / 60), sec = Math.max(left, 0) % 60;
        clock.textContent = m + ':' + (sec < 10 ? '0' : '') + sec;
        if (left <= 0) { clearInterval(timer); timer = null; clock.textContent = 'Time is up'; paper.classList.add('timeup'); b.hidden = true; }
      }, 1000);
    });
    paper.querySelector('[data-new]').addEventListener('click', build);
    paper.querySelector('[data-print]').addEventListener('click', function () { window.print(); });
    paper.querySelector('[data-finish]').addEventListener('click', function (e) {
      if (timer) { clearInterval(timer); timer = null; }
      paper.classList.add('show'); e.currentTarget.hidden = true;
      paper.querySelectorAll('.q').forEach(function (qe, i) {
        var m = qs[i].marks, lab = document.createElement('label'); lab.className = 'selfmark';
        lab.innerHTML = 'Your mark <input type="number" min="0" max="' + m + '" step="1" inputmode="numeric"> / ' + m;
        qe.querySelector('.qbody').appendChild(lab);
      });
      var score = document.getElementById('bs-score'); score.hidden = false;
      function sum() {
        var got = 0, done = 0; paper.querySelectorAll('.selfmark input').forEach(function (inp, i) { var v = Math.max(0, Math.min(qs[i].marks, Number(inp.value) || 0)); if (inp.value !== '') done++; got += v; });
        score.innerHTML = '<b>Your score: ' + got + ' / ' + total + ' (' + Math.round(got / total * 100) + '%)</b> <span>' + done + ' of ' + qs.length + ' questions marked</span>';
      }
      paper.addEventListener('input', sum); sum();
    });
    var pp = document.getElementById('past-papers-links'); if (pp) pp.innerHTML = boardLinks(c);
    tex($stage);
  }

  function wirePaper() {
    var paper = document.getElementById('bs-paper');
    paper.querySelector('[data-answers]').addEventListener('click', function (e) {
      var on = paper.classList.toggle('show');
      e.currentTarget.textContent = on ? 'Hide answers' : 'Show answers';
      e.currentTarget.setAttribute('aria-pressed', on);
    });
    paper.querySelector('[data-new]').addEventListener('click', function () {
      var presenting = paper.classList.contains('presenting');
      build();
      if (presenting) { var p = document.getElementById('bs-paper'); p.classList.add('presenting'); p.querySelector('.present').textContent = 'Close'; }
    });
    var pr = paper.querySelector('[data-print]'); if (pr) pr.addEventListener('click', function () { window.print(); });
    var pres = paper.querySelector('.present');
    pres.addEventListener('click', function () {
      if (paper.classList.contains('presenting')) { stopPresent(); return; }
      paper.classList.add('presenting'); document.body.classList.add('is-presenting'); pres.textContent = 'Close';
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) document.documentElement.requestFullscreen().catch(function () {});
    });
  }
  function stopPresent() {
    var p = document.querySelector('.paper.presenting'); if (!p) return;
    p.classList.remove('presenting'); document.body.classList.remove('is-presenting');
    p.querySelector('.present').textContent = 'Present';
    if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') stopPresent(); });
  document.addEventListener('fullscreenchange', function () { if (!document.fullscreenElement) stopPresent(); });

  /* ---------- Revision mode ---------- */
  var PKEY = 'bytesize-progress-v1';
  var session = { r: 0, n: 0 };
  function prog() { return store(PKEY) || {}; }
  function record(topic, ok) {
    var p = prog(); p[state.course] = p[state.course] || {};
    var t = p[state.course][topic] = p[state.course][topic] || { r: 0, w: 0 };
    if (ok) t.r++; else t.w++;
    store(PKEY, p);
    session.n++; if (ok) session.r++;
    renderProgress();
  }

  function nextRevise() {
    var t = pickTopics(1)[0];
    var q = BS.make(t, state.diff, null, !!course(state.course).foundation);
    $stage.innerHTML =
      '<article class="paper slide revise-card" id="bs-paper">' +
        '<header><span class="tag">' + esc(BS.topics[t].name) + ' · ' + lvl(course(state.course), state.diff) + '</span><span class="time">' + q.marks + ' marks</span></header>' +
        '<div class="body">' + renderQ(q, session.n + 1, false) + '</div>' +
        '<footer class="rev-actions">' +
          '<button type="button" class="btn" data-reveal>Show mark scheme</button>' +
          '<span class="judge" hidden><span class="judge-q">How did you do?</span>' +
            '<button type="button" class="ok" data-ok>I got it right</button>' +
            '<button type="button" class="no" data-no>I made a mistake</button></span>' +
          '<button type="button" class="skip" data-skip>Skip</button>' +
        '</footer>' +
      '</article>';
    var card = document.getElementById('bs-paper');
    var judge = card.querySelector('.judge'), reveal = card.querySelector('[data-reveal]');
    reveal.addEventListener('click', function () { card.classList.add('show'); reveal.hidden = true; judge.hidden = false; });
    card.querySelector('[data-ok]').addEventListener('click', function () { record(t, true); nextRevise(); });
    card.querySelector('[data-no]').addEventListener('click', function () {
      record(t, false);
      var topic = BS.topics[t];
      judge.innerHTML = '<span class="judge-q">Added to your list.</span> <a class="vid" href="' + videoUrl(topic) + '" target="_blank" rel="noopener">Watch a video on ' + esc(topic.name.toLowerCase()) + '</a>' +
        '<button type="button" class="ok" data-next>Next question</button>';
      judge.querySelector('[data-next]').addEventListener('click', nextRevise);
    });
    card.querySelector('[data-skip]').addEventListener('click', nextRevise);
    tex($stage);
  }

  var confirmReset = false;
  function renderProgress() {
    var box = document.getElementById('bs-progress'); if (!box) return;
    var c = course(state.course), p = (prog()[state.course]) || {};
    var rows = Object.keys(p).filter(function (t) { return BS.topics[t]; }).map(function (t) {
      var x = p[t], n = x.r + x.w; return { t: t, r: x.r, w: x.w, n: n, acc: n ? x.r / n : 0 };
    });
    var work = rows.filter(function (x) { return x.w > 0 && (x.acc < 0.8 || x.n < 3); }).sort(function (a, b) { return a.acc - b.acc || b.w - a.w; });
    var good = rows.filter(function (x) { return x.n >= 3 && x.acc >= 0.8; }).sort(function (a, b) { return b.acc - a.acc; });
    function row(x, weak) {
      var tp = BS.topics[x.t];
      return '<li class="prow">' +
        '<div class="prow-head"><span class="pname">' + esc(tp.name) + '</span><span class="pacc">' + Math.round(x.acc * 100) + '%</span></div>' +
        '<div class="bar"><span style="width:' + Math.round(x.acc * 100) + '%"></span></div>' +
        '<div class="pmeta">' + x.r + ' right, ' + x.w + ' wrong</div>' +
        (weak ? '<div class="plinks"><a href="' + videoUrl(tp) + '" target="_blank" rel="noopener">Watch video</a><button type="button" data-practise="' + x.t + '">Practise</button></div>' : '') +
      '</li>';
    }
    box.innerHTML =
      '<h2>Your progress</h2>' +
      '<p class="session">This session: <b>' + session.r + '</b> right out of <b>' + session.n + '</b></p>' +
      '<h3>Things to work on</h3>' +
      (work.length ? '<ul class="plist">' + work.map(function (x) { return row(x, true); }).join('') + '</ul>'
        : '<p class="empty">Nothing yet. When you get a question wrong, the topic appears here with a video to watch.</p>') +
      (good.length ? '<h3>Going well</h3><ul class="plist">' + good.map(function (x) { return row(x, false); }).join('') + '</ul>' : '') +
      '<p class="note">Progress is saved on this device for ' + esc(c.name) + '.</p>' +
      (rows.length ? '<button type="button" class="reset" id="bs-reset">' + (confirmReset ? 'Click again to clear all progress' : 'Reset progress') + '</button>' : '');
    box.querySelectorAll('[data-practise]').forEach(function (b) {
      b.addEventListener('click', function () { state.topic = b.dataset.practise; $topic.value = state.topic; save(); nextRevise(); window.scrollTo({ top: root.offsetTop - 20, behavior: 'smooth' }); });
    });
    var rs = document.getElementById('bs-reset');
    if (rs) rs.addEventListener('click', function () {
      if (!confirmReset) { confirmReset = true; renderProgress(); return; }
      var all = prog(); delete all[state.course]; store(PKEY, all); confirmReset = false; renderProgress();
    });
  }


  /* ---------- Plenaries: each idea becomes a ready-made activity for this course ---------- */
  var plRoot = document.getElementById('plenaries'), plStage = document.getElementById('plenary-stage');
  function plain(a) { return String(a).replace(/<[^>]+>/g, '').replace(/\\\(|\\\)/g, '').trim(); }
  function numAns(a) {
    var m = plain(a).match(/^(?:[a-z]\s*=\s*)?(-?[0-9][0-9,]*(?:\.[0-9]+)?)\s*([a-zA-Z°²³⁻¹\/% ]{0,12})$/);
    if (!m) return null;
    var str = m[1].replace(/,/g, ''), v = Number(str); if (!isFinite(v)) return null;
    return { v: v, dp: (str.split('.')[1] || '').length, unit: m[2].trim() };
  }
  function fmt(n, x) { var t = x.dp ? Number(n).toFixed(x.dp) : String(Math.round(n * 1000) / 1000); if (Math.abs(n) >= 1000 && !x.dp) t = Number(t).toLocaleString('en-GB'); return t + (x.unit ? ' ' + x.unit : ''); }
  function wrongs(x, k) {
    var v = x.v, c = v === 0 ? [1, -1, 2, 0.5, 10] : [2 * v, v / 2, v + 1, v - 1, v * 10, v / 10, v + 2, v * 3].concat(x.unit ? [] : [-v]);
    var out = [], seen = {}; seen[fmt(v, x)] = 1;
    BS.shuffle(c).forEach(function (n) { var f = fmt(n, x); if (out.length < k && !seen[f] && !/NaN/.test(f)) { seen[f] = 1; out.push(f); } });
    return out;
  }
  // A question with a part whose answer is short enough to offer as a choice. Wrong choices come from small
  // numerical slips, or else from the same question type with different numbers (so they look just as plausible).
  // Keep only the final result of a mark-scheme answer: drop working before the last ⇒ and notes in brackets.
  function finalOf(a) {
    var s = String(a), k = s.lastIndexOf('\\Rightarrow');
    if (k > -1) s = '\\(' + s.slice(k + 11).replace(/^\s+/, '');
    s = s.replace(/\s*\((?:reject|accept|or |since|because|both|the negative)[^)]*\)\s*$/i, '');
    return s.trim();
  }
  function choiceQuestion(tries) {
    for (var i = 0; i < (tries || 40); i++) {
      var t = pickTopics(1)[0], q = BS.make(t, state.diff, null, !!course(state.course).foundation);
      var idx = q.parts.map(function (p, j) { var a = plain(finalOf(p.a)); return a.length && a.length <= 70 && !/\.\s+[A-Z]/.test(a) ? j : -1; }).filter(function (j) { return j > -1; });
      if (!idx.length) continue;
      var j = BS.pick(idx), x = numAns(finalOf(q.parts[j].a)), right = x ? fmt(x.v, x) : finalOf(q.parts[j].a), wr = [];
      if (x) wr = wrongs(x, 3).map(esc);
      else {
        var seen = {}; seen[plain(right)] = 1;
        for (var k = 0; k < 25 && wr.length < 3; k++) {
          var alt = BS.topics[q.topic].gens[q.gen].f(q.d);
          if (!alt.parts[j]) continue;
          var a2 = finalOf(alt.parts[j].a), key = plain(a2);
          if (!seen[key] && key.length <= 70) { seen[key] = 1; wr.push(a2); }
        }
      }
      if (wr.length >= 3) return { q: q, j: j, right: x ? esc(right) : right, wrong: wr.slice(0, 3) };
    }
    return null;
  }
  function topicLabel() { return state.topic === 'mixed' ? 'this lesson' : BS.topics[state.topic].name.toLowerCase(); }
  function siblings(n) {
    var c = course(state.course), list = c.topics;
    if (state.topic !== 'mixed' && c.groups) c.groups.forEach(function (g) { if (g[1].indexOf(state.topic) > -1) list = g[1]; });
    var l = BS.shuffle(list.filter(function (t) { return t !== state.topic; })).slice(0, n - (state.topic === 'mixed' ? 0 : 1));
    if (state.topic !== 'mixed') l.unshift(state.topic);
    return l;
  }
  function partsUpTo(q, j) {
    return (q.stem ? '<div class="stem">' + q.stem + '</div>' : '') + q.parts.slice(0, j + 1).map(function (p, i) {
      return '<div class="part">' + (q.parts.length > 1 ? '<span class="plabel">(' + LET[i] + ')</span>' : '') + '<div class="ptext">' + p.q + '</div>' + '<span class="marks"></span>' +
        '</div>';
    }).join('');
  }
  var PLEN = {
    '321': function () {
      var sib = siblings(4).filter(function (t) { return t !== state.topic; });
      var link = sib.length ? BS.topics[sib[0]].name.toLowerCase() : 'another topic';
      return { title: '3-2-1: ' + (state.topic === 'mixed' ? 'today’s lesson' : BS.topics[state.topic].name), answers: false, body:
        '<ol class="pl-list"><li><b>3</b> things you can now do in ' + esc(topicLabel()) + '. Write each one as “I can …”.</li>' +
        '<li><b>2</b> questions you still have about ' + esc(topicLabel()) + '.</li>' +
        '<li><b>1</b> way ' + esc(topicLabel()) + ' links to ' + esc(link) + '.</li></ol>' };
    },
    hinge: function () {
      var r = choiceQuestion(60); if (!r) return null;
      var opts = BS.shuffle([r.right].concat(r.wrong)), right = opts.indexOf(r.right);
      return { title: 'Hinge question', answers: true, body: '<p class="instr">Everyone answers at the same time: hold up A, B, C or D.</p>' +
        '<section class="q"><div class="qnum">?</div><div class="qbody">' + partsUpTo(r.q, r.j) +
        '<ol class="pl-opts">' + opts.map(function (o, i) { return '<li' + (i === right ? ' class="right"' : '') + '><b>' + 'ABCD'[i] + '</b> <span>' + o + '</span></li>'; }).join('') + '</ol>' +
        '<div class="ans"><span class="ans-k">Answer</span> ' + 'ABCD'[right] + ': ' + r.q.parts[r.j].a + '</div></div></section>' };
    },
    muddy: function () {
      var qs = [], used = new Set(); for (var i = 0; i < 3; i++) qs.push(BS.make(pickTopics(1)[0], state.diff, used, !!course(state.course).foundation));
      return { title: 'Muddiest point', answers: true, body: '<p class="instr">Look at questions A, B and C. Which would you find hardest? Write the letter and the step you are least sure about.</p>' +
        qs.map(function (q, i) { return renderQ(q, 'ABC'[i], state.topic === 'mixed'); }).join('') };
    },
    mistake: function () {
      var r = choiceQuestion(60); if (!r) return null;
      var bad = r.wrong[0];
      var work = r.q.parts.map(function (p, i) { return '<li><b>' + (r.q.parts.length > 1 ? '(' + LET[i] + ') ' : '') + '</b>' + (i === r.j ? bad : p.a) + '</li>'; }).join('');
      return { title: 'Mistake hunt', answers: true, body: '<p class="instr">A student answered this question. One answer is wrong. Find it, explain the mistake and correct it.</p>' +
        renderQ(r.q, 1, false) +
        '<div class="student"><p><b>Student’s answers</b></p><ul>' + work + '</ul></div>' };
    },
    explain: function () {
      var q = BS.make(pickTopics(1)[0], state.diff, null, !!course(state.course).foundation);
      return { title: 'Explain it to a Year 7', answers: true, body: '<p class="instr">Do not work it out. In two sentences, explain to a younger pupil how you would start this question and why.</p>' + renderQ(q, 1, state.topic === 'mixed') };
    },
    traffic: function () {
      var ts = siblings(5);
      return { title: 'Traffic lights', answers: false, body: '<p class="instr">For each statement, colour or circle red (not yet), amber (nearly) or green (confident).</p>' +
        '<div class="qtable"><table class="tl"><thead><tr><th>I can answer questions on …</th><th>Red</th><th>Amber</th><th>Green</th></tr></thead><tbody>' +
        ts.map(function (t) { return '<tr><td>' + esc(BS.topics[t].name) + '</td><td></td><td></td><td></td></tr>'; }).join('') + '</tbody></table></div>' +
        '<p class="instr">Greens: help a red. Reds: write one question you would ask.</p>' };
    }
  };
  function showPlenary(key) {
    var p = PLEN[key] && PLEN[key]();
    if (!p) { plStage.innerHTML = '<p class="note">No suitable question was found for this topic. Choose another topic or “Mixed retrieval” above.</p>'; return; }
    var c = course(state.course);
    var grid = plRoot.querySelector('.ideas'); if (grid) grid.hidden = true;
    plStage.innerHTML = '<p class="pl-back"><button type="button" class="back" data-pl-back>All plenary ideas</button></p>' +
      '<article class="paper slide plenary" id="pl-paper">' +
      '<header><span class="tag">Plenary · ' + esc(c.name) + (state.topic === 'mixed' ? '' : ' · ' + esc(BS.topics[state.topic].name)) + '</span><span class="time">about 5 min</span></header>' +
      '<div class="body"><h2 class="paper-title">' + esc(p.title) + '</h2>' + p.body + '</div>' +
      '<footer>' + (p.answers ? '<button type="button" data-pl-ans aria-pressed="false">Show answers</button>' : '') +
      '<button type="button" data-pl-new>New version</button><button type="button" class="present">Present</button></footer></article>';
    var art = document.getElementById('pl-paper');
    var a = art.querySelector('[data-pl-ans]');
    if (a) a.addEventListener('click', function () { var on = art.classList.toggle('show'); a.textContent = on ? 'Hide answers' : 'Show answers'; a.setAttribute('aria-pressed', on); });
    art.querySelector('[data-pl-new]').addEventListener('click', function () { var pr = art.classList.contains('presenting'); showPlenary(key); if (pr) { var n = document.getElementById('pl-paper'); n.classList.add('presenting'); n.querySelector('.present').textContent = 'Close'; } });
    var pres = art.querySelector('.present');
    pres.addEventListener('click', function () {
      if (art.classList.contains('presenting')) { stopPresent(); return; }
      art.classList.add('presenting'); document.body.classList.add('is-presenting'); pres.textContent = 'Close';
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) document.documentElement.requestFullscreen().catch(function () {});
    });
    plStage.querySelector('[data-pl-back]').addEventListener('click', function () {
      stopPresent(); plStage.innerHTML = ''; if (grid) grid.hidden = false;
      try { plRoot.scrollIntoView({ block: 'start' }); } catch (e) {}
    });
    tex(plStage);
    try { plRoot.scrollIntoView({ block: 'start' }); } catch (e) {}
  }
  if (plRoot && plStage) plRoot.querySelectorAll('[data-plenary]').forEach(function (b) { b.addEventListener('click', function () { showPlenary(b.dataset.plenary); }); });
  if (mode === 'practise') { $course.addEventListener('change', renderProgress); renderProgress(); }
  build();
})();
