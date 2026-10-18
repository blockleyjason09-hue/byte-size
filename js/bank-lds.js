/* Byte Size — Pearson Edexcel A Level Mathematics large data set (Met Office weather data, May–October 1987 and 2015).
   A "learn the large data set" topic, plus large-data-set questions added to the statistics topics.
   Values in questions are realistic samples in the style of the data set, not copied records. */
(function (g) {
  var BS = g.BS, D = BS.draw, IB = BS.ib, AL = BS.al;
  var ri = BS.ri, pick = BS.pick, frac = BS.frac, dp = BS.dp, num = BS.num, M = BS.m;
  var s3 = IB.s3, q1 = AL.q1, table = IB.table;

  var UK = ['Camborne', 'Heathrow', 'Hurn', 'Leeming', 'Leuchars'], OS = ['Beijing', 'Jacksonville', 'Perth'];
  var ST = { // typical May–October ranges: daily mean temperature (°C), daily mean windspeed (kn)
    Camborne: { T: [10, 19], W: [5, 19], where: 'on the coast of Cornwall, in the far south-west of England' },
    Heathrow: { T: [10, 25], W: [3, 13], where: 'inland, in west London' },
    Hurn: { T: [8, 22], W: [2, 12], where: 'near the south coast of England, close to Bournemouth' },
    Leeming: { T: [7, 20], W: [3, 14], where: 'inland, in North Yorkshire' },
    Leuchars: { T: [6, 18], W: [4, 17], where: 'on the east coast of Scotland, in Fife' },
    Beijing: { T: [14, 30], W: [2, 9], where: 'in northern China, in the northern hemisphere' },
    Jacksonville: { T: [19, 30], W: [3, 12], where: 'on the east coast of Florida, USA, in the northern hemisphere' },
    Perth: { T: [9, 21], W: [4, 14], where: 'on the west coast of Australia, in the southern hemisphere' }
  };
  var BEAU = [[0, 'Calm', 'less than 1'], [1, 'Light', '1–10'], [4, 'Moderate', '11–16'], [5, 'Fresh', '17–21'], [6, 'Strong', '22–27'], [7, 'Near gale', '28–33'], [8, 'Gale', '34–40']];
  function beaufort(k) { return k < 1 ? 'Calm' : k <= 10 ? 'Light' : k <= 16 ? 'Moderate' : k <= 21 ? 'Fresh' : k <= 27 ? 'Strong' : k <= 33 ? 'Near gale' : 'Gale'; }
  var MONTHS = [['May', 31], ['June', 30], ['July', 31], ['August', 31], ['September', 30], ['October', 31]];
  function yr() { return pick([1987, 2015]); }
  function gauss() { return (Math.random() + Math.random() + Math.random() - 1.5) * 2; }
  function temps(st, n) { var r = ST[st].T, mid = (r[0] + r[1]) / 2, out = []; for (var i = 0; i < n; i++) out.push(Math.round(Math.min(r[1] + 2, Math.max(r[0] - 2, mid + gauss() * (r[1] - r[0]) / 4)) * 10) / 10); return out; }
  BS.lds = { UK: UK, OS: OS, ST: ST, BEAU: BEAU, beaufort: beaufort };

  /* ---------------- Learning the large data set ---------------- */
  var FACTS = [
    ['Who provided the data in the large data set?', 'The Met Office.'],
    ['Which months of the year are covered by the large data set?', 'May to October (inclusive).'],
    ['Which two years are covered by the large data set?', '1987 and 2015.'],
    ['Name the five UK weather stations in the large data set.', 'Camborne, Heathrow, Hurn, Leeming and Leuchars.'],
    ['Name the three overseas weather stations in the large data set.', 'Beijing, Jacksonville and Perth.'],
    ['Which overseas station is in the southern hemisphere, and what season does the data cover there?', 'Perth; May to October is autumn and winter there.'],
    ['What does "tr" mean in the rainfall columns, and what is its value?', 'A trace of rain: less than 0.05 mm. It is usually taken as 0 in calculations.'],
    ['What does "n/a" mean in the large data set?', 'The data are not available. These values are left out of calculations.'],
    ['In what units is daily mean windspeed recorded?', 'Knots (kn), with a Beaufort conversion.'],
    ['In what units is daily mean total cloud cover recorded?', 'Oktas: eighths of the sky covered (0 = clear, 8 = completely overcast).'],
    ['In what units is daily mean visibility recorded?', 'Decametres (dam); 1 dam = 10 m.'],
    ['In what units is daily mean pressure recorded?', 'Hectopascals (hPa).'],
    ['In what units is daily total sunshine recorded?', 'Hours, to the nearest tenth of an hour.'],
    ['How is daily maximum relative humidity recorded?', 'As a percentage of the air’s saturation with water vapour.'],
    ['Which variables are recorded for the overseas stations?', 'Daily mean temperature, daily total rainfall, daily mean pressure and daily mean windspeed (with Beaufort conversion) only.'],
    ['Over what period are daily mean temperature and daily total rainfall measured?', 'From 0900 one day to 0900 the next (0900–0900).'],
    ['How is daily mean wind direction recorded for the UK stations?', 'As a bearing in degrees, with the cardinal direction (for example N, NE).'],
    ['Which UK station is the most northerly, and which is the most southerly?', 'Leuchars is the most northerly; Camborne is the most southerly (and westerly).'],
    ['Which two UK stations are inland rather than on or near the coast?', 'Heathrow and Leeming.'],
    ['Daily maximum relative humidity above about 95% is often linked with which weather?', 'Mist or fog (usually with low visibility).'],
    ['How many days of data are there for each station in each year?', '184 days (31 + 30 + 31 + 31 + 30 + 31).']
  ];
  var CONTEXT = [
    ['Using your knowledge of the large data set, explain why the daily mean temperatures for Perth in July are lower than those for Jacksonville in July.', 'Perth is in the southern hemisphere, so July is winter there; Jacksonville is in the northern hemisphere, where July is summer.'],
    ['A student wants to compare the daily total sunshine in Perth and Heathrow. Explain why this is not possible using the large data set.', 'Sunshine is only recorded for the UK stations; it is not available for Perth.'],
    ['A student uses the large data set to claim that UK temperatures were higher in December 2015 than in December 1987. Comment on this claim.', 'The large data set only covers May to October, so it gives no information about December.'],
    ['A student compares 1987 and 2015 data for Heathrow and concludes that climate change has caused temperatures to rise. Give two reasons why this conclusion may not be valid.', 'Only two years are compared, from one station and only from May to October; other factors (natural year-to-year variation) could explain the difference.'],
    ['Explain why the daily total rainfall in Beijing is much higher in July and August than in May.', 'Beijing has a summer monsoon season, so most of its rainfall falls in July and August.'],
    ['Explain why Jacksonville may have some days with very high rainfall and windspeed between August and October.', 'This is the hurricane / tropical storm season in Florida.'],
    ['Suggest why Camborne and Leuchars tend to have higher mean windspeeds than Heathrow.', 'Camborne and Leuchars are on the coast, which is more exposed; Heathrow is inland.'],
    ['Suggest why Heathrow has a higher maximum daily mean temperature than Leuchars over the period.', 'Heathrow is further south, inland and in a large city; Leuchars is further north and on the coast.'],
    ['Explain why it is not sensible to compare the mean windspeed in knots at Perth with the Beaufort descriptions from Camborne without converting.', 'They are in different forms: knots are numerical and the Beaufort scale groups windspeeds into categories, so one must be converted to the other.'],
    ['A student finds the daily mean visibility at Leuchars recorded as 120 dam on a day with 100% humidity. Explain whether this value is likely to be an error.', 'Not an error: 1200 m visibility with 100% humidity is consistent with mist or fog.']
  ];
  var lds = [
    { d: [1, 2], f: function () {
      var a = pick(FACTS), b, c; do { b = pick(FACTS); } while (b === a); do { c = pick(FACTS); } while (c === a || c === b);
      return { stem: 'Answer these questions about the Pearson Edexcel large data set.', parts: [a, b, c].map(function (x) { return { q: x[0], m: 1, a: x[1] }; }) };
    } },
    { d: [1, 2], f: function () { // Beaufort conversion
      var ks = [ri(0, 9), ri(11, 16), ri(17, 25)].map(function (k) { return k === 0 ? 0.5 : k; });
      ks.sort(function () { return Math.random() - 0.5; });
      var desc = pick(BEAU.slice(1, 5));
      return { stem: 'The large data set gives daily mean windspeed in knots and as a Beaufort conversion.' + table(['Beaufort scale', 'Description', 'Windspeed (knots)'], BEAU.slice(0, 6).map(function (b) { return [b[0] === 1 ? '1–3' : String(b[0]), b[1], b[2]]; })), parts: [
        { q: 'Give the Beaufort description for daily mean windspeeds of ' + ks.map(function (k) { return num(k) + ' knots'; }).join(', ').replace(/, ([^,]*)$/, ' and $1') + '.', m: 2, a: ks.map(function (k) { return beaufort(k); }).join(', ') },
        { q: 'On one day the windspeed at a station is described as "' + desc[1] + '". State the range of windspeeds, in knots, that this could represent.', m: 1, a: desc[2] + ' knots' },
        { q: 'Explain why the Beaufort description gives less information than the windspeed in knots.', m: 1, a: 'It groups windspeeds into categories, so the exact value is lost.' }
      ] };
    } },
    { d: [2, 3], f: function () { // cleaning data with tr and n/a
      var st = pick(UK), y = yr(), mo = pick(MONTHS), start = ri(1, mo[1] - 9), vals = [];
      for (var i = 0; i < 10; i++) { var r = Math.random(); vals.push(r < 0.25 ? 'tr' : r < 0.5 ? '0' : r < 0.6 ? 'n/a' : String(dp(ri(1, 180) / 10, 1))); }
      if (vals.indexOf('n/a') < 0) vals[ri(0, 9)] = 'n/a'; if (vals.indexOf('tr') < 0) vals[vals.indexOf('n/a') === 0 ? 1 : 0] = 'tr';
      var nums = vals.filter(function (v) { return v !== 'n/a'; }).map(function (v) { return v === 'tr' ? 0 : +v; }), n = nums.length, tot = nums.reduce(function (a, b) { return a + b; }, 0);
      var wet = vals.filter(function (v) { return v !== 'n/a' && v !== 'tr' && +v > 0; }).length;
      return { stem: 'The table shows the daily total rainfall, in mm, at ' + st + ' for 10 consecutive days from ' + start + ' ' + mo[0] + ' ' + y + ', in the style of the large data set.' + table(['Day'].concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) { return String(start + i); })), [['Rainfall (mm)'].concat(vals)]), parts: [
        { q: 'Explain how you would deal with the values "tr" and "n/a" when calculating the mean daily rainfall.', m: 2, a: '"tr" (a trace, less than 0.05 mm) is taken as 0; "n/a" (not available) is left out, so ' + M('n = ' + n) + '.' },
        { q: 'Calculate the mean daily rainfall for these days.', m: 2, a: M('\\frac{' + num(dp(tot, 1)) + '}{' + n + '} = ' + s3(tot / n)) + ' mm' },
        { q: 'A day is defined as "wet" if more than 0.05 mm of rain falls. Find the proportion of the days with data that were wet.', m: 1, a: M(frac(wet, n)) }
      ] };
    } },
    { d: [2, 3], f: function () { // contextual knowledge
      var a = pick(CONTEXT), b; do { b = pick(CONTEXT); } while (b === a);
      return { stem: '', parts: [{ q: a[0], m: 2, a: a[1] }, { q: b[0], m: 2, a: b[1] }] };
    } },
    { d: [1, 2], f: function () { // sampling from the LDS
      var st = pick(UK.concat(OS)), y = yr(), n = pick([10, 15, 20, 23, 46]), k = Math.floor(184 / n), s0 = ri(1, k);
      var N = pick([40, 50, 60]), strat = MONTHS.map(function (m) { return m[1] / 184 * N; }), sr = strat.map(Math.floor), left = N - sr.reduce(function (a, b) { return a + b; }, 0);
      [0, 1, 2, 3, 4, 5].sort(function (i, j) { return (strat[j] - sr[j]) - (strat[i] - sr[i]); }).slice(0, left).forEach(function (i) { sr[i]++; });
      return { stem: 'A student wants a sample of days from the data for ' + st + ' in ' + y + ' in the large data set. The days are numbered 1 to 184, starting on 1 May.', parts: [
        { q: 'Explain how the student could take a systematic sample of ' + n + ' days.', m: 2, a: 'Take every ' + k + 'th day (' + M('184 \\div ' + n + ' \\approx ' + k) + '), starting from a randomly chosen day between 1 and ' + k + ', e.g. day ' + s0 + ', then day ' + (s0 + k) + ', ' + (s0 + 2 * k) + ', …' },
        { q: 'The student instead takes a sample of ' + N + ' days, stratified by month. Find how many days should be taken from each month.', m: 3, a: MONTHS.map(function (m, i) { return m[0] + ' ' + sr[i]; }).join(', ') },
        { q: 'Give one reason why taking the first ' + n + ' days of data would not be a good sample.', m: 1, a: 'It only includes May' + (n > 31 ? ' and June' : '') + ', so it would not represent the whole period: the weather in later months may be different.' }
      ] };
    } },
    { d: [2, 3], f: function () { // interpreting an extract with several UK variables
      var st = pick(UK), y = yr(), rows = [], fogDay = ri(0, 4);
      for (var i = 0; i < 5; i++) {
        var fog = i === fogDay, cloud = fog ? 8 : ri(1, 7), sun = fog ? 0 : dp(Math.max(0, (8 - cloud) * ri(10, 17) / 10), 1);
        rows.push([String(i + 1), String(cloud), num(sun), fog ? String(ri(98, 100)) : String(ri(72, 94)), fog ? String(ri(40, 150)) : String(ri(1800, 4200))]);
      }
      return { stem: 'The table shows data for five days at ' + st + ' in ' + y + ', in the style of the large data set.' + table(['Day', 'Daily mean total cloud (oktas)', 'Daily total sunshine (hrs)', 'Daily maximum relative humidity (%)', 'Daily mean visibility (dam)'], rows), parts: [
        { q: 'Identify the day on which there was most likely to be fog. Give a reason.', m: 2, a: 'Day ' + (fogDay + 1) + ': humidity is very high (' + rows[fogDay][3] + '%) and visibility is very low (' + rows[fogDay][4] + ' dam).' },
        { q: 'Convert the daily mean visibility on day ' + (fogDay + 1) + ' into metres.', m: 1, a: num(+rows[fogDay][4] * 10) + ' m' },
        { q: 'Describe the relationship you would expect between daily mean total cloud and daily total sunshine.', m: 1, a: 'Negative correlation: more cloud cover, less sunshine.' }
      ] };
    } }
  ];
  BS.topic({ id: 'al-lds', name: 'The large data set: learning it', video: 'Edexcel A level maths large data set', gens: lds });

  /* ---------------- Large-data-set questions inside the statistics topics ---------------- */
  function add(id, gens) { if (BS.topics[id]) gens.forEach(function (x) { BS.topics[id].gens.push(x); }); }

  add('al-sampling', [lds[4]]);

  add('al-location', [
    { d: [1, 2], f: function () { // summary statistics, two stations
      var A = pick(UK), B; do { B = pick(UK.concat(OS)); } while (B === A); var y = yr(), mo = pick(MONTHS);
      var xa = temps(A, mo[1]), xb = temps(B, mo[1]);
      function sums(x) { var s = 0, q = 0; x.forEach(function (v) { s += v; q += v * v; }); return [Math.round(s * 10) / 10, Math.round(q * 100) / 100]; }
      var sa = sums(xa), n = mo[1], mean = sa[0] / n, sd = Math.sqrt(sa[1] / n - mean * mean), mb = xb.reduce(function (a, b) { return a + b; }, 0) / n, sb = Math.sqrt(xb.reduce(function (a, b) { return a + b * b; }, 0) / n - mb * mb);
      return { stem: 'The daily mean temperature, ' + M('t') + ' °C, at ' + A + ' for the ' + n + ' days of ' + mo[0] + ' ' + y + ' is summarised by ' + M('\\sum t = ' + num(sa[0])) + ' and ' + M('\\sum t^2 = ' + num(sa[1])) + ', using data in the style of the large data set.', parts: [
        { q: 'Find the mean and standard deviation of the daily mean temperature at ' + A + '.', m: 3, a: 'Mean ' + s3(mean) + ' °C, standard deviation ' + s3(sd) + ' °C' },
        { q: 'For ' + B + ' in the same month the mean was ' + s3(mb) + ' °C and the standard deviation was ' + s3(sb) + ' °C. Compare the temperatures at the two stations.', m: 2, a: (mb > mean ? B : A) + ' had a higher mean temperature; ' + (sb > sd ? B : A) + ' had temperatures that were more spread out (larger standard deviation).' },
        { q: 'State, with a reason, whether you would expect the daily total sunshine data to be available for ' + B + '.', m: 1, a: OS.indexOf(B) >= 0 ? 'No: sunshine is only recorded for the UK stations.' : 'Yes: ' + B + ' is a UK station, and sunshine is recorded for the UK stations.' }
      ] };
    } }
  ]);

  add('al-representations', [
    { d: [2, 3], f: function () { // two box plots, windspeed
      var A = pick(['Camborne', 'Leuchars']), B = pick(['Heathrow', 'Leeming', 'Hurn']), y = yr();
      function five(st) { var r = ST[st].W, lo = r[0] - ri(0, 1), hi = r[1] + ri(1, 4), q1 = lo + ri(2, 3), med = q1 + ri(1, 3), q3 = med + ri(2, 3); return [lo, q1, med, q3, hi]; }
      var fa = five(A), fb = five(B), top = Math.max(fa[4], fb[4]) + 2;
      return { stem: 'The box plots summarise the daily mean windspeed, in knots, at ' + A + ' and ' + B + ' from May to October ' + y + ', in the style of the large data set.' + D.boxplot(fa, 0, Math.ceil(top / 2) * 2, 2, A + ' (knots)') + D.boxplot(fb, 0, Math.ceil(top / 2) * 2, 2, B + ' (knots)'), parts: [
        { q: 'Compare the windspeeds at the two stations.', m: 2, a: A + ' has a higher median (' + fa[2] + ' kn compared with ' + fb[2] + ' kn); IQRs are ' + (fa[3] - fa[1]) + ' kn and ' + (fb[3] - fb[1]) + ' kn, so ' + (fa[3] - fa[1] > fb[3] - fb[1] ? A + ' is more variable' : fa[3] - fa[1] < fb[3] - fb[1] ? B + ' is more variable' : 'the spreads are similar') + '.' },
        { q: 'Using your knowledge of the large data set, suggest a reason for the difference in median windspeed.', m: 1, a: A + ' is on the coast and more exposed; ' + B + ' is inland.' },
        { q: 'Give the Beaufort description for the median windspeed at ' + A + '.', m: 1, a: beaufort(fa[2]) }
      ] };
    } }
  ]);

  add('al-correlation', [
    { d: [2, 3], f: function () { // cloud vs sunshine scatter
      var st = pick(UK), y = yr(), xs = [], ys = [];
      for (var i = 0; i < 10; i++) { var c = ri(1, 8); xs.push(c); ys.push(Math.max(0, dp((8 - c) * 1.6 + 1 + (Math.random() - 0.5) * 3, 1))); }
      var r = IB.pearson(xs, ys).r;
      var mx = xs.reduce(function (a, b) { return a + b; }, 0) / 10, my = ys.reduce(function (a, b) { return a + b; }, 0) / 10, sxy = 0, sxx = 0; xs.forEach(function (x, i) { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) * (x - mx); });
      var b = sxy / sxx, a = my - b * mx;
      return { stem: 'A student takes a sample of 10 days from the data for ' + st + ' in ' + y + '. The scatter diagram shows daily mean total cloud, ' + M('c') + ' oktas, and daily total sunshine, ' + M('s') + ' hours. The regression line of ' + M('s') + ' on ' + M('c') + ' is ' + M('s = ' + dp(a, 2) + ' - ' + dp(-b, 2) + 'c') + '.' + D.scatter(xs, ys, 'Cloud (oktas)', 'Sunshine (hrs)'), parts: [
        { q: 'Describe the correlation and interpret it in context.', m: 2, a: 'Negative correlation (' + M('r = ' + dp(r, 3)) + '): days with more cloud cover tend to have less sunshine.' },
        { q: 'Interpret the gradient of the regression line.', m: 1, a: 'Each extra okta of cloud is associated with about ' + dp(-b, 2) + ' fewer hours of sunshine.' },
        { q: 'Explain why the line should not be used to predict the sunshine in Perth.', m: 1, a: 'The data come only from ' + st + '; sunshine is not recorded for Perth, and conditions there may be different.' }
      ] };
    } }
  ]);

  add('al-binomial-dist', [
    { d: [2, 3], f: function () { // proportion of wet days
      var st = pick(UK.concat(OS)), y = yr(), p = pick([0.3, 0.35, 0.4, 0.45]), n = pick([10, 12, 15, 20]), k = Math.round(n * p);
      return { stem: 'Using the large data set, a student estimates that the probability that a day in ' + y + ' at ' + st + ' has more than 1 mm of rainfall is ' + p + '. She chooses ' + n + ' days at random and models the number of days, ' + M('X') + ', with more than 1 mm of rainfall as ' + M('\\mathrm{B}(' + n + ',\\ ' + p + ')') + '.', parts: [
        { q: 'Find ' + M('P(X = ' + k + ')') + '.', m: 2, a: dp(IB.bpdf(n, p, k), 4) },
        { q: 'Find ' + M('P(X \\ge ' + (k + 2) + ')') + '.', m: 2, a: dp(1 - IB.bcdf(n, p, k + 1), 4) },
        { q: 'Using your knowledge of the large data set, explain why the binomial model may not be appropriate.', m: 1, a: 'Rainfall on consecutive days is not independent (wet days tend to come together), and the probability of rain changes from month to month.' }
      ] };
    } }
  ]);

  add('al-hypothesis', [
    { d: [2, 3], f: function () { // test proportion of moderate-wind days
      var st = pick(['Camborne', 'Leuchars']), p0 = pick([0.2, 0.25, 0.3]), n = pick([20, 25, 30]), lev = pick([5, 10]);
      var x = Math.round(n * p0) + ri(2, 5), pv = 1 - IB.bcdf(n, p0, x - 1), rej = pv < lev / 100;
      return { stem: 'Using 1987 data from the large data set, a meteorologist believes that the proportion of days at ' + st + ' with a daily mean windspeed described as "Moderate" or above on the Beaufort scale is ' + p0 + '. She thinks the proportion was higher in 2015. In a random sample of ' + n + ' days from 2015, ' + x + ' had a windspeed of "Moderate" or above.', parts: [
        { q: 'Write down the windspeed, in knots, that corresponds to "Moderate" or above.', m: 1, a: '11 knots or more' },
        { q: 'Test, at the ' + lev + '% significance level, whether there is evidence that the proportion was higher in 2015.', m: 5, a: M('H_0: p = ' + p0 + ',\\ H_1: p > ' + p0) + '. ' + M('X \\sim \\mathrm{B}(' + n + ',\\ ' + p0 + ')') + ', ' + M('P(X \\ge ' + x + ') = ' + dp(pv, 4)) + (rej ? ' < ' : ' > ') + lev / 100 + ', so ' + (rej ? 'reject ' + M('H_0') + ': there is evidence that the proportion was higher in 2015.' : 'do not reject ' + M('H_0') + ': there is insufficient evidence that the proportion was higher in 2015.') }
      ] };
    } }
  ]);

  add('a2-regression', [
    { d: [2, 3], f: function () { // PMCC test: humidity and visibility
      var st = pick(UK), y = yr(), n = pick([10, 12, 15]), cv = { 10: 0.5494, 12: 0.4973, 15: 0.4409 }[n], r = -dp(cv + pick([-1, 1]) * ri(4, 20) / 100, 3), rej = -r > cv;
      return { stem: 'A student takes a random sample of ' + n + ' days from the data for ' + st + ' in ' + y + ' in the large data set. She calculates the product moment correlation coefficient between daily maximum relative humidity and daily mean visibility as ' + M('r = ' + r) + '.', parts: [
        { q: 'Test, at the 5% level of significance, whether there is evidence of negative correlation between humidity and visibility. The critical value is ' + cv + '.', m: 3, a: M('H_0: \\rho = 0,\\ H_1: \\rho < 0') + '. ' + M(r + (rej ? ' < ' : ' > ') + '-' + cv) + ', so ' + (rej ? 'reject ' + M('H_0') + ': there is evidence of negative correlation.' : 'do not reject ' + M('H_0') + ': insufficient evidence of negative correlation.') },
        { q: 'State the units in which daily mean visibility is recorded in the large data set.', m: 1, a: 'Decametres (dam)' },
        { q: 'Explain why the student could not carry out this test using data for Beijing.', m: 1, a: 'Humidity and visibility are only recorded for the UK stations.' }
      ] };
    } }
  ]);

  add('a2-probability', [
    { d: [2, 3], f: function () { // Venn of rain and wind days in a month
      var st = pick(UK), y = yr(), mo = pick(MONTHS), n = mo[1], both = ri(2, 6), r = ri(4, 10), w = ri(3, 8), none = n - both - r - w;
      return { stem: 'For the ' + n + ' days of ' + mo[0] + ' ' + y + ' at ' + st + ', in the style of the large data set: ' + M('R') + ' is the event that the daily total rainfall is more than 0 mm (a trace counts as 0), and ' + M('W') + ' is the event that the daily mean windspeed is "Moderate" or above on the Beaufort scale.' + D.venn([r, both, w, none], ['R', 'W']), parts: [
        { q: 'A day is chosen at random. Find ' + M('P(R \\cap W)') + ' and ' + M('P(W \\mid R)') + '.', m: 3, a: M('P(R \\cap W) = ' + frac(both, n) + ',\\ P(W \\mid R) = ' + frac(both, both + r)) },
        { q: 'Determine whether ' + M('R') + ' and ' + M('W') + ' are independent.', m: 2, a: M('P(R)P(W) = ' + frac(r + both, n) + ' \\times ' + frac(w + both, n) + ' = ' + frac((r + both) * (w + both), n * n)) + (both * n === (r + both) * (w + both) ? ' = ' : ' ≠ ') + M('P(R \\cap W)') + ', so ' + (both * n === (r + both) * (w + both) ? 'independent.' : 'not independent.') },
        { q: 'State the minimum windspeed, in knots, for a day to be in ' + M('W') + '.', m: 1, a: '11 knots' }
      ] };
    } }
  ]);

  add('a2-normal', [
    { d: [2, 3], f: function () { // pressure modelled by normal
      var st = pick(UK.concat(OS)), y = yr(), mu = ri(1008, 1020), sd = ri(5, 9), a = mu - ri(5, 12), b = mu + ri(3, 10);
      return { stem: 'Using the large data set, a student models the daily mean pressure, ' + M('P') + ' hPa, at ' + st + ' in ' + y + ' as ' + M('P \\sim \\mathrm{N}(' + mu + ',\\ ' + sd + '^2)') + '.' + D.normal(mu, sd, a, b, { mu: String(mu), a: String(a), b: String(b) }), parts: [
        { q: 'Find ' + M('P(' + a + ' < P < ' + b + ')') + '.', m: 2, a: s3(IB.ncdf(b, mu, sd) - IB.ncdf(a, mu, sd)) },
        { q: 'Using the model, find the expected number of days from May to October with a daily mean pressure below ' + a + ' hPa.', m: 2, a: M('184 \\times ' + s3(IB.ncdf(a, mu, sd)) + ' = ' + s3(184 * IB.ncdf(a, mu, sd))) },
        { q: 'In the data, ' + ri(2, 6) + ' days have pressure above ' + (mu + 3 * sd + ri(1, 3)) + ' hPa. Comment on the suitability of the model.', m: 2, a: 'The model gives a very small probability (less than 0.2%) of pressure above ' + M('\\mu + 3\\sigma') + ', which predicts less than 1 day in 184, so the model may not be suitable for the upper tail.' }
      ] };
    } },
    { d: [3], f: function () { // z-test for mean temperature
      var st = pick(['Heathrow', 'Hurn', 'Leeming']), mu = ri(150, 170) / 10, sd = ri(25, 40) / 10, n = pick([20, 25, 30]), se = sd / Math.sqrt(n), xb = Math.round((mu + se * (1.6449 + pick([-0.7, 0.6, 1]))) * 10) / 10, pv = 1 - IB.ncdf(xb, mu, se), rej = pv < 0.05;
      return q1('Using the 1987 data in the large data set, the daily mean temperature at ' + st + ' from May to October is modelled by ' + M('\\mathrm{N}(' + mu + ',\\ ' + sd + '^2)') + '. A random sample of ' + n + ' days from 2015 has a mean daily mean temperature of ' + xb + ' °C. Test, at the 5% level of significance, whether the mean daily mean temperature was higher in 2015, assuming the standard deviation is unchanged.', 5,
        M('H_0: \\mu = ' + mu + ',\\ H_1: \\mu > ' + mu) + '. ' + M('\\bar{X} \\sim \\mathrm{N}\\left(' + mu + ',\\ \\frac{' + sd + '^2}{' + n + '}\\right)') + ', ' + M('P(\\bar{X} \\ge ' + xb + ') = ' + dp(pv, 4)) + (rej ? ' < 0.05: reject ' + M('H_0') + '; there is evidence that the mean temperature was higher in 2015.' : ' > 0.05: do not reject ' + M('H_0') + '; insufficient evidence that the mean temperature was higher in 2015.'));
    } }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
