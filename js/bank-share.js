/* Byte Size Classroom — share question templates between IB SL and HL topics that cover the same content,
   so each topic has a wider range of question types. Duplicates (same wording apart from numbers) are skipped. */
(function (g) {
  var BS = g.BS;
  function sig(gen) {
    try { var q = gen.f(gen.d[0]); return ((q.stem || '') + q.parts.map(function (p) { return p.q; }).join('|')).replace(/<[^>]+>/g, '').replace(/[0-9.,]+/g, '#').replace(/\s+/g, ' ').slice(0, 90); }
    catch (e) { return Math.random() + ''; }
  }
  function share(src, dst, test) {
    var S = BS.topics[src], T = BS.topics[dst]; if (!S || !T) return;
    var have = {}; T.gens.forEach(function (gn) { if (!gn.x) have[sig(gn)] = 1; });
    S.gens.forEach(function (gn) {
      if (gn.x || gn.shared) return;
      var s = sig(gn); if (have[s]) return;
      if (test) { var q = gn.f(gn.d[0]), txt = (q.stem || '') + q.parts.map(function (p) { return p.q; }).join(' '); if (!test(txt)) return; }
      have[s] = 1; T.gens.push({ d: gn.d.slice(), f: gn.f, shared: true });
    });
  }
  var BEAR = /bearing|elevation|depression/i, GEO = /geometric|common ratio|\bratio\b|% each|per cent each|increase by \d+(\.\d+)?%|decrease by|population/i;
  [['approx', 'approx'], ['finance', 'finance'], ['logs', 'logs'], ['systems', 'systems'], ['lines', 'lines'], ['functions', 'functions'],
   ['graphs', 'graphs'], ['models', 'models'], ['3d', '3d'], ['voronoi', 'voronoi'], ['descriptive', 'descriptive'], ['regression', 'regression'],
   ['probability', 'probability'], ['discrete', 'discrete'], ['normal', 'normal'], ['tests', 'hypothesis'], ['derivatives', 'derivatives'],
   ['optimisation', 'optimisation'], ['integration', 'integration']].forEach(function (p) {
    share('sl-' + p[0], 'ib-' + p[1]);
    if (p[0] !== 'tests') share('ib-' + p[1], 'sl-' + p[0]);
  });
  share('sl-seq', 'ib-arith', function (t) { return !GEO.test(t); });
  share('sl-seq', 'ib-geom', function (t) { return GEO.test(t); });
  share('ib-arith', 'sl-seq'); share('ib-geom', 'sl-seq');
  share('sl-trig', 'ib-trig', function (t) { return !BEAR.test(t); });
  share('sl-trig', 'ib-bearings', function (t) { return BEAR.test(t); });
  share('ib-bearings', 'sl-trig');
})(typeof window !== 'undefined' ? window : globalThis);
