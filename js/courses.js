/* Byte Size course catalogue. status: 'live' or 'soon'. diffs: difficulty levels offered; def: default level. */
(function (g) {
  var BS = g.BS;
  var ALL = ['fractions', 'percentages', 'indices', 'surds', 'ratio', 'bounds',
    'expand-factorise', 'linear-equations', 'simultaneous', 'quadratics', 'inequalities', 'rearranging', 'sequences', 'functions', 'differentiation', 'straight-lines',
    'pythagoras-trig', 'circles', 'polygons', 'volume', 'sine-cosine',
    'averages', 'probability'];
  var FOUND = ALL.filter(function (t) { return ['surds', 'functions', 'differentiation', 'sine-cosine'].indexOf(t) < 0; });
  var Y9 = ['fractions', 'percentages', 'indices', 'ratio', 'expand-factorise', 'linear-equations', 'inequalities', 'sequences', 'straight-lines', 'pythagoras-trig', 'circles', 'polygons', 'volume', 'averages', 'probability'];

  BS.LEVELS = { 1: 'Foundation', 2: 'Core', 3: 'Accelerated' };

  BS.courses = [
    { id: 'y9', group: 'Maths', name: 'Year 9 · Pearson Edexcel GCSE', status: 'live', topics: Y9, diffs: [1, 2], def: 2 },
    { id: 'igcse', group: 'Maths', name: 'Year 10–11 · Pearson Edexcel International GCSE', status: 'live', topics: ALL, diffs: [1, 2, 3], def: 2 },
    { id: 'igcse-f', group: 'Maths', name: 'Year 11 Foundation · Pearson Edexcel International GCSE', status: 'live', topics: FOUND, diffs: [1, 2], def: 1 },
    { id: 'igcse-acc', group: 'Maths', name: 'Year 11 Accelerated · Pearson Edexcel International GCSE', status: 'live', topics: ALL, diffs: [2, 3], def: 3 },
    { id: 'aqa-fm', group: 'Maths', name: 'Year 11 · AQA Level 2 Further Maths', status: 'soon' },
    { id: 'as', group: 'Maths', name: 'Year 12 · AS Maths (Pure, Statistics, Mechanics) · Pearson', status: 'soon' },
    { id: 'cp1', group: 'Maths', name: 'Year 12 · Further Maths Core Pure · Pearson', status: 'soon' },
    { id: 'a2', group: 'Maths', name: 'Year 13 · A Level Maths (Pure, Statistics, Mechanics) · Pearson', status: 'soon' },
    { id: 'cp2', group: 'Maths', name: 'Year 13 · Further Maths Core Pure · Pearson', status: 'soon' },
    { id: 'fs1', group: 'Maths', name: 'Further Statistics 1 · Pearson', status: 'soon' },
    { id: 'd1', group: 'Maths', name: 'Decision Mathematics 1 · Pearson', status: 'soon' },
    { id: 'ib-ai-sl', group: 'Maths', name: 'IB Maths: Applications and Interpretation SL', status: 'soon' },
    { id: 'ib-ai-hl', group: 'Maths', name: 'IB Maths: Applications and Interpretation HL', status: 'soon' },
    { id: 'ocr-cs-1', group: 'Computer Science', name: 'A Level Year 1 · OCR Computer Science', status: 'soon' },
    { id: 'ocr-cs-2', group: 'Computer Science', name: 'A Level Year 2 · OCR Computer Science', status: 'soon' }
  ];
})(typeof window !== 'undefined' ? window : globalThis);
