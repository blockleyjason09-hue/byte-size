/* Byte Size course catalogue. status: 'live' or 'soon'. diffs: difficulty levels offered; def: default level. */
(function (g) {
  var BS = g.BS;
  var GCSE_GROUPS = [
    ['Number', ['fractions', 'percentages', 'indices', 'surds', 'ratio', 'bounds', 'compound-measures']],
    ['Algebra', ['expand-factorise', 'linear-equations', 'simultaneous', 'quadratics', 'inequalities', 'rearranging', 'sequences', 'functions', 'straight-lines', 'differentiation', 'kinematic-graphs']],
    ['Geometry and measures', ['angles-parallel', 'polygons', 'pythagoras-trig', 'sine-cosine', 'circles', 'circle-theorems', 'intersecting-chords', 'similar-shapes', 'volume']],
    ['Vectors and transformations', ['vectors', 'transformations']],
    ['Statistics and probability', ['averages', 'stats-diagrams', 'probability', 'sets']],
    ['Last-question problems', ['last-q']]
  ];
  function pickGroups(exclude, only) {
    return GCSE_GROUPS.map(function (gp) { return [gp[0], gp[1].filter(function (t) { return (!only || only.indexOf(t) > -1) && (!exclude || exclude.indexOf(t) < 0); })]; }).filter(function (gp) { return gp[1].length; });
  }
  function flat(groups) { return [].concat.apply([], groups.map(function (g) { return g[1]; })); }
  var G_ALL = pickGroups(), G_FOUND = pickGroups(['surds', 'functions', 'differentiation', 'sine-cosine', 'circle-theorems', 'intersecting-chords', 'last-q']);
  var G_Y9 = pickGroups(null, ['fractions', 'percentages', 'indices', 'ratio', 'compound-measures', 'expand-factorise', 'linear-equations', 'inequalities', 'sequences', 'straight-lines', 'kinematic-graphs', 'angles-parallel', 'polygons', 'pythagoras-trig', 'circles', 'similar-shapes', 'volume', 'vectors', 'transformations', 'averages', 'stats-diagrams', 'probability', 'sets']);

  BS.LEVELS = { 1: 'Foundation', 2: 'Core', 3: 'Accelerated' };
  var IBL = { 1: 'Standard', 2: 'Exam', 3: 'Challenging' };
  var IB_GROUPS = [
    ['Topic 1: Number and algebra', ['ib-approx', 'ib-arith', 'ib-geom', 'ib-finance', 'ib-logs', 'ib-systems', 'ib-complex', 'ib-matrices', 'ib-eigen']],
    ['Topic 2: Functions', ['ib-lines', 'ib-functions', 'ib-graphs', 'ib-models', 'ib-logistic', 'ib-transform', 'ib-linearise']],
    ['Topic 3: Geometry and trigonometry', ['ib-3d', 'ib-trig', 'ib-bearings', 'ib-radians', 'ib-voronoi', 'ib-trig-eq', 'ib-mat-transform', 'ib-vectors', 'ib-vec-kinematics', 'ib-vec-product', 'ib-graph-theory', 'ib-graph-algorithms']],
    ['Topic 4: Statistics and probability', ['ib-descriptive', 'ib-regression', 'ib-probability', 'ib-discrete', 'ib-normal', 'ib-hypothesis', 'ib-estimation', 'ib-poisson', 'ib-markov']],
    ['Topic 5: Calculus', ['ib-derivatives', 'ib-optimisation', 'ib-integration', 'ib-diff-rules', 'ib-volumes', 'ib-kinematics', 'ib-diff-equations', 'ib-coupled']]
  ];
  var IB_ALL = [].concat.apply([], IB_GROUPS.map(function (g) { return g[1]; }));

  BS.courses = [
    { id: 'y9', group: 'Maths', name: 'Year 9 · Pearson Edexcel GCSE', status: 'live', topics: flat(G_Y9), groups: G_Y9, diffs: [1, 2], def: 2 },
    { id: 'igcse', group: 'Maths', name: 'Year 10–11 · Pearson Edexcel International GCSE', status: 'live', topics: flat(G_ALL), groups: G_ALL, diffs: [1, 2, 3], def: 2 },
    { id: 'igcse-f', group: 'Maths', name: 'Year 11 Foundation · Pearson Edexcel International GCSE', status: 'live', topics: flat(G_FOUND), groups: G_FOUND, diffs: [1, 2], def: 1 },
    { id: 'igcse-acc', group: 'Maths', name: 'Year 11 Accelerated · Pearson Edexcel International GCSE', status: 'live', topics: flat(G_ALL), groups: G_ALL, diffs: [2, 3], def: 3 },
    { id: 'aqa-fm', group: 'Maths', name: 'Year 11 · AQA Level 2 Further Maths', status: 'soon' },
    { id: 'as', group: 'Maths', name: 'Year 12 · AS Maths (Pure, Statistics, Mechanics) · Pearson', status: 'soon' },
    { id: 'cp1', group: 'Maths', name: 'Year 12 · Further Maths Core Pure · Pearson', status: 'soon' },
    { id: 'a2', group: 'Maths', name: 'Year 13 · A Level Maths (Pure, Statistics, Mechanics) · Pearson', status: 'soon' },
    { id: 'cp2', group: 'Maths', name: 'Year 13 · Further Maths Core Pure · Pearson', status: 'soon' },
    { id: 'fs1', group: 'Maths', name: 'Further Statistics 1 · Pearson', status: 'soon' },
    { id: 'd1', group: 'Maths', name: 'Decision Mathematics 1 · Pearson', status: 'soon' },
    { id: 'ib-ai-sl', group: 'Maths', name: 'IB Maths: Applications and Interpretation SL', status: 'soon' },
    { id: 'ib-ai-hl', group: 'Maths', name: 'IB Maths: Applications and Interpretation HL', status: 'live', topics: IB_ALL, groups: IB_GROUPS, diffs: [1, 2, 3], def: 2, levels: IBL, style: 'ib' },
    { id: 'ocr-cs-1', group: 'Computer Science', name: 'A Level Year 1 · OCR Computer Science', status: 'soon' },
    { id: 'ocr-cs-2', group: 'Computer Science', name: 'A Level Year 2 · OCR Computer Science', status: 'soon' }
  ];
})(typeof window !== 'undefined' ? window : globalThis);
