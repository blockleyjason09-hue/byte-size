/* Byte Size — Do Now, Exit Ticket and Revision tools */
(function () {
  var BS = window.BS;
  var root = document.getElementById('tool');
  if (!root) return;
  var mode = root.dataset.mode; // donow | exit | revise
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

  var prefs = store('bytesize-prefs') || {};
  var live = BS.courses.filter(function (c) { return c.status === 'live'; });
  var state = {
    course: (prefs.course && course(prefs.course) && course(prefs.course).status === 'live') ? prefs.course : 'igcse',
    topic: prefs.topic || 'mixed',
    diff: prefs.diff || null,
    count: prefs.count || (mode === 'exit' ? 3 : 5)
  };
  if (mode === 'exit' && !prefs.exitCount) state.count = 3;

  /* ---------- Controls ---------- */
  var groups = {};
  BS.courses.forEach(function (c) { (groups[c.group] = groups[c.group] || []).push(c); });
  var courseOpts = Object.keys(groups).map(function (gname) {
    return '<optgroup label="' + esc(gname) + '">' + groups[gname].map(function (c) {
      return '<option value="' + c.id + '"' + (c.status !== 'live' ? ' disabled' : '') + '>' + esc(c.name) + (c.status !== 'live' ? ' (coming soon)' : '') + '</option>';
    }).join('') + '</optgroup>';
  }).join('');

  var countCtl = mode === 'revise' ? '' :
    '<label class="ctl"><span>Questions</span><select id="bs-count">' + [3, 4, 5, 6, 8].map(function (n) { return '<option value="' + n + '">' + n + '</option>'; }).join('') + '</select></label>';
  var newLabel = mode === 'donow' ? 'New Do Now' : mode === 'exit' ? 'New exit ticket' : 'New question';

  root.innerHTML =
    '<div class="controls">' +
      '<label class="ctl wide"><span>Course</span><select id="bs-course">' + courseOpts + '</select></label>' +
      '<label class="ctl wide"><span>Topic</span><select id="bs-topic"></select></label>' +
      '<div class="ctl"><span id="bs-diff-label">Difficulty</span><div class="seg" id="bs-diff" role="group" aria-labelledby="bs-diff-label"></div></div>' +
      countCtl +
      '<button type="button" class="btn" id="bs-new">' + newLabel + '</button>' +
    '</div>' +
    (mode === 'revise'
      ? '<div class="revise-grid"><div id="bs-stage"></div><aside class="progress" id="bs-progress" aria-live="polite"></aside></div>'
      : '<div id="bs-stage"></div>');

  var $course = document.getElementById('bs-course'), $topic = document.getElementById('bs-topic'),
      $diff = document.getElementById('bs-diff'), $count = document.getElementById('bs-count'),
      $stage = document.getElementById('bs-stage');

  function fillTopics() {
    var c = course(state.course);
    var opts = '<option value="mixed">' + (mode === 'revise' ? 'All topics (mixed)' : 'Mixed retrieval (all topics)') + '</option>' +
      c.topics.map(function (t) { return '<option value="' + t + '">' + esc(BS.topics[t].name) + '</option>'; }).join('');
    $topic.innerHTML = opts;
    if (state.topic !== 'mixed' && c.topics.indexOf(state.topic) < 0) state.topic = 'mixed';
    $topic.value = state.topic;
    if (!state.diff || c.diffs.indexOf(state.diff) < 0) state.diff = c.def;
    $diff.innerHTML = c.diffs.map(function (d) {
      return '<button type="button" data-d="' + d + '" aria-pressed="' + (d === state.diff) + '">' + BS.LEVELS[d] + '</button>';
    }).join('');
  }
  $course.value = state.course;
  fillTopics();
  if ($count) $count.value = String(state.count);

  function save() { store('bytesize-prefs', { course: state.course, topic: state.topic, diff: state.diff, count: state.count, exitCount: mode === 'exit' ? true : prefs.exitCount }); }

  $course.addEventListener('change', function () { state.course = $course.value; state.diff = null; fillTopics(); save(); build(); });
  $topic.addEventListener('change', function () { state.topic = $topic.value; save(); build(); });
  $diff.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    state.diff = Number(b.dataset.d);
    $diff.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    save(); build();
  });
  if ($count) $count.addEventListener('change', function () { state.count = Number($count.value); save(); build(); });
  document.getElementById('bs-new').addEventListener('click', build);

  /* ---------- Rendering ---------- */
  function renderQ(q, n, showTopic) {
    var t = BS.topics[q.topic];
    var single = q.parts.length === 1;
    var parts = q.parts.map(function (p, i) {
      return '<div class="part">' +
        (single ? '' : '<span class="plabel">(' + LET[i] + ')</span>') +
        '<div class="ptext">' + p.q + '</div>' +
        '<span class="marks">(' + p.m + ')</span>' +
        '<div class="ans"><span class="ans-k">' + (single ? 'Answer' : '(' + LET[i] + ')') + '</span> ' + p.a + '</div>' +
      '</div>';
    }).join('');
    return '<section class="q" data-topic="' + q.topic + '">' +
      '<div class="qnum">' + n + '</div>' +
      '<div class="qbody">' +
        (q.stem ? '<div class="stem">' + q.stem + '</div>' : '') +
        parts +
        '<p class="total">(Total for Question ' + n + ' is ' + q.marks + ' mark' + (q.marks === 1 ? '' : 's') + ')</p>' +
        (showTopic ? '<p class="qtopic">' + esc(t.name) + '</p>' : '') +
      '</div>' +
    '</section>';
  }

  function pickTopics(n) {
    var c = course(state.course);
    if (state.topic !== 'mixed') { var a = []; for (var i = 0; i < n; i++) a.push(state.topic); return a; }
    var sh = BS.shuffle(c.topics), out = [];
    for (var j = 0; j < n; j++) out.push(sh[j % sh.length]);
    return out;
  }

  function build() {
    if (mode === 'revise') { nextRevise(); return; }
    var c = course(state.course), used = new Set();
    var qs = pickTopics(state.count).map(function (t) { return BS.make(t, state.diff, used); });
    var marks = qs.reduce(function (s, q) { return s + q.marks; }, 0);
    var title = state.topic === 'mixed' ? (mode === 'exit' ? 'Exit ticket' : 'Do Now: mixed retrieval') : (mode === 'exit' ? 'Exit ticket: ' : 'Do Now: ') + BS.topics[state.topic].name;
    var mins = mode === 'exit' ? Math.max(4, qs.length + 1) : Math.max(5, Math.round(marks * 0.8));
    $stage.innerHTML =
      '<article class="paper slide" id="bs-paper">' +
        '<header><span class="tag">' + esc(c.name) + ' · ' + BS.LEVELS[state.diff] + '</span><span class="time">' + marks + ' marks · about ' + mins + ' min</span></header>' +
        '<div class="body">' +
          '<h2 class="paper-title">' + esc(title) + '</h2>' +
          '<p class="instr">Answer all questions. Show all your working.</p>' +
          qs.map(function (q, i) { return renderQ(q, i + 1, state.topic === 'mixed'); }).join('') +
          (mode === 'exit' ? '<div class="reflect-box"><p><b>How confident do you feel?</b> <span class="scale">1&nbsp;&nbsp;2&nbsp;&nbsp;3&nbsp;&nbsp;4&nbsp;&nbsp;5</span></p><p><b>One thing I am still unsure about:</b></p><div class="write-line"></div></div>' : '') +
        '</div>' +
        '<footer><button type="button" data-answers aria-pressed="false">Show answers</button><button type="button" data-new>New questions</button><button type="button" class="present">Present</button></footer>' +
      '</article>';
    wirePaper();
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
    var q = BS.make(t, state.diff);
    $stage.innerHTML =
      '<article class="paper slide revise-card" id="bs-paper">' +
        '<header><span class="tag">' + esc(BS.topics[t].name) + ' · ' + BS.LEVELS[state.diff] + '</span><span class="time">' + q.marks + ' marks</span></header>' +
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

  if (mode === 'revise') { $course.addEventListener('change', renderProgress); renderProgress(); }
  build();
})();
