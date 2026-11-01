/* Byte Size Classroom — OCR A level Computer Science (H446), Component 01: Computer systems.
   Difficulty: 1 = Standard, 2 = Exam, 3 = Challenging (extension questions). */
(function (g) {
  var BS = g.BS, A = BS.fa, M = BS.m;
  var ri = BS.ri, pick = BS.pick;
  var Q = A.Q, sum = A.sum;
  var X = BS.ext, T = BS.topic, Cn = BS.concept, Sr = String.raw;

  /* ---------- shared Computer Science helpers (also used by bank-cs-2) ---------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function code(lines, numbered) { return '<pre class="qcode">' + lines.map(function (l, i) { return (numbered ? '<span class="ln">' + (i + 1) + '</span>' : '') + esc(l); }).join('\n') + '</pre>'; }
  function ic(s) { return '<code class="ic">' + esc(s) + '</code>'; }
  function table(head, rows, cls) { return '<div class="qtable"><table' + (cls ? ' class="' + cls + '"' : '') + '><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>'; }
  function bin(n, bits) { var s = (n >>> 0).toString(2); if (bits) { s = s.slice(-bits); while (s.length < bits) s = '0' + s; } return s; }
  function tc(n, bits) { return bin(n < 0 ? Math.pow(2, bits) + n : n, bits); }
  function fromTc(s) { var v = parseInt(s, 2); return s.charAt(0) === '1' ? v - Math.pow(2, s.length) : v; }
  function hex(n, w) { var s = n.toString(16).toUpperCase(); while (w && s.length < w) s = '0' + s; return s; }
  function nib(s) { return s.replace(/(\d{4})(?=\d)/g, '$1 '); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = ri(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function some(a, k) { return shuffle(a).slice(0, k); }
  function list(a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]; }
  function dec(x) { return String(+x.toFixed(10)); }
  BS.cs = { esc: esc, code: code, ic: ic, table: table, bin: bin, tc: tc, fromTc: fromTc, hex: hex, nib: nib, shuffle: shuffle, some: some, list: list, dec: dec };

  /* =============================== 1.1.1 / 1.1.2 Processors =============================== */
  var OPS = ['ADD', 'SUB', 'LDA', 'STA'];
  T({ id: 'cs-processor', name: 'The processor: structure, FDE cycle and performance', video: 'OCR A level computer science fetch decode execute cycle registers', gens: [
    { d: [1], f: function () {
      var pc = ri(10, 60), op = pick(OPS), addr = ri(70, 99);
      return Q('The program counter holds ' + pc + '. Memory location ' + pc + ' holds the instruction ' + ic(op + ' ' + addr) + '.', [
        ['State the contents of the PC, MAR, MDR and CIR at the end of the fetch stage.', 4, 'PC ' + (pc + 1) + ', MAR ' + pc + ', MDR ' + ic(op + ' ' + addr) + ', CIR ' + ic(op + ' ' + addr)],
        ['State which bus carries the address ' + pc + ' to memory.', 1, 'The address bus'],
        ['Explain the role of the control unit during decode.', 2, 'It decodes the instruction in the CIR and sends control signals to coordinate execution']
      ]);
    } },
    { d: [1, 2], f: function () {
      var k = pick([3, 4, 5]), n = ri(6, 20);
      return Q('A processor uses a ' + k + '-stage pipeline. Each stage takes one clock cycle. A sequence of ' + n + ' instructions has no branches.', [
        ['Find the number of cycles needed without pipelining.', 1, k * n],
        ['Find the number of cycles needed with pipelining.', 2, M(k + ' + ' + n + ' - 1 = ' + (k + n - 1))],
        ['Explain why branch instructions reduce the benefit of pipelining.', 2, 'Instructions already fetched after the branch may be wrong and must be flushed, so the pipeline refills']
      ]);
    } },
    { d: [2], f: function () {
      var ghz = pick([2, 2.5, 3, 3.2, 4]), n = pick([2, 4, 6, 8]) * 1e9, cpi = pick([1, 2, 4]);
      return Q('A single-core processor runs at ' + ghz + ' GHz. On average each instruction takes ' + cpi + ' clock cycle' + (cpi > 1 ? 's' : '') + '.', [
        ['Find the number of instructions it can execute per second.', 2, BS.cs.dec(ghz * 1e9 / cpi / 1e9) + ' billion'],
        ['Find the time taken to execute ' + (n / 1e9) + ' billion instructions.', 2, A.sf3(n * cpi / (ghz * 1e9)) + ' s'],
        ['Give two reasons why doubling the number of cores may not halve the time.', 2, 'Not all of the program can run in parallel; cores must share data and memory bandwidth, which adds overhead']
      ]);
    } },
    { d: [1, 2], f: function () {
      var dev = pick([['a washing machine controller', 'Harvard', 'separate instruction and data memories let it fetch both at once, and the program is fixed in ROM'], ['a general-purpose desktop PC', 'von Neumann', 'one memory holds both programs and data, which is flexible and cheaper'], ['a digital signal processor in a phone', 'Harvard', 'instructions and data can be fetched at the same time, giving fast, predictable performance']]);
      return Q('A designer is choosing an architecture for ' + dev[0] + '.', [
        ['State the key difference between von Neumann and Harvard architecture.', 1, 'Von Neumann shares one memory and bus for instructions and data; Harvard has separate memories and buses'],
        ['Suggest the more suitable architecture, with a reason.', 2, dev[1] + ': ' + dev[2]]
      ]);
    } },
    { d: [2, 3], f: function () {
      var hit = pick([80, 85, 90, 95]), tc = pick([1, 2, 5]), tm = pick([50, 60, 80, 100]);
      var eff = hit / 100 * tc + (1 - hit / 100) * (tc + tm);
      return Q('A processor checks cache first. Cache access takes ' + tc + ' ns and main memory access takes a further ' + tm + ' ns. The hit rate is ' + hit + '%.', [
        ['Find the average memory access time.', 3, M(BS.cs.dec(hit / 100) + ' \\times ' + tc + ' + ' + BS.cs.dec(1 - hit / 100) + ' \\times ' + (tc + tm) + ' = ' + BS.cs.dec(eff)) + ' ns'],
        ['Explain why a larger cache improves performance only up to a point.', 2, 'More data is found in cache, but larger caches are slower to search and cost more; frequently used data already fits']
      ]);
    } }
  ] });
  X('cs-processor', [
    function () {
      var p = pick([60, 70, 80, 90]), n = pick([2, 4, 8]);
      var s = 1 / ((1 - p / 100) + p / 100 / n);
      return Q('A program spends ' + p + '% of its run time in code that can run in parallel. It is moved from one core to ' + n + ' identical cores.', [
        ['Find the speed-up, using ' + M('\\frac{1}{(1 - p) + \\frac{p}{n}}') + '.', 3, BS.cs.dec(Math.round(s * 100) / 100)],
        ['Find the greatest possible speed-up with unlimited cores.', 2, BS.cs.dec(Math.round(100 / (100 - p) * 100) / 100)],
        ['What does this show about adding cores?', 1, 'The serial part limits the gain, so extra cores give diminishing returns']
      ]);
    },
    function () {
      var w = pick([16, 20, 24, 32]), d = pick([8, 16, 32, 64]);
      return Q('A processor has a ' + w + '-bit address bus and a ' + d + '-bit data bus. Memory is byte-addressable.', [
        ['Find the number of addressable locations.', 2, M('2^{' + w + '} = ' + Math.pow(2, w).toLocaleString('en-GB'))],
        ['Find the maximum memory size in bytes.', 1, Math.pow(2, w).toLocaleString('en-GB') + ' bytes'],
        ['Explain how the data bus width affects performance.', 2, 'A wider data bus moves more bits per transfer, so fewer transfers are needed']
      ]);
    },
    function () {
      var k = 4, n = ri(8, 14), b = ri(3, n - 3);
      return Q('A 4-stage pipeline (fetch, decode, execute, write back) runs ' + n + ' instructions. Instruction ' + b + ' is a branch that is taken; the branch is resolved at the end of the execute stage and the 2 instructions fetched after it are flushed.', [
        ['Find the cycles needed with no branch.', 1, k + n - 1],
        ['Find the cycles needed with the flush.', 3, (k + n - 1 + 2) + ' (two extra cycles to refill)'],
        ['Describe one technique that reduces this penalty.', 1, 'Branch prediction, or executing an instruction in a delay slot']
      ]);
    },
    function () {
      return Q('CISC and RISC.', [
        ['Compare CISC and RISC instruction sets.', 4, 'CISC: many complex, variable-length instructions, some taking several cycles; fewer lines of assembly. RISC: few simple, fixed-length instructions, mostly one cycle; more lines of code but easier to pipeline'],
        ['Explain why RISC processors are common in phones.', 2, 'Simpler circuits use less power and produce less heat'],
        ['Explain why a compiler for a RISC processor produces longer machine code.', 1, 'Each complex operation must be built from several simple instructions']
      ]);
    },
    function () {
      var task = pick([['training a neural network on millions of images', 'GPU', 'the same operation is applied to huge amounts of data in parallel (SIMD)'], ['running a word processor', 'CPU', 'tasks are sequential with lots of branching, so many simple GPU cores give little benefit'], ['rendering a 3D game scene', 'GPU', 'each pixel can be shaded independently in parallel']]);
      return Q('Choosing hardware for ' + task[0] + '.', [
        ['Explain whether a GPU or a CPU is better suited.', 3, task[1] + ': ' + task[2]],
        ['Explain what is meant by SIMD.', 1, 'Single instruction, multiple data: one instruction operates on many data items at once'],
        ['Give a disadvantage of using a GPU for general processing.', 1, 'Moving data to and from the GPU takes time, and branching code runs poorly on it']
      ]);
    }
  ]);

  /* =============================== 1.1.3 Input, output and storage =============================== */
  T({ id: 'cs-storage', name: 'Input, output and storage', video: 'OCR A level computer science storage devices RAM ROM virtual storage', gens: [
    { d: [1], f: function () {
      var w = pick([640, 800, 1024, 1920]), h = pick([480, 600, 768, 1080]), cd = pick([8, 16, 24]);
      var bytes = w * h * cd / 8;
      return Q('A bitmap image is ' + w + ' × ' + h + ' pixels with a colour depth of ' + cd + ' bits. Use 1 MB = 1 000 000 bytes.', [
        ['Find the file size in bytes, ignoring metadata.', 2, bytes.toLocaleString('en-GB')],
        ['Give the size in MB to 2 decimal places.', 1, (bytes / 1e6).toFixed(2) + ' MB'],
        ['State how many colours can be shown.', 1, M('2^{' + cd + '} = ' + Math.pow(2, cd).toLocaleString('en-GB'))]
      ]);
    } },
    { d: [1, 2], f: function () {
      var sr = pick([22050, 44100, 48000]), bd = pick([8, 16, 24]), ch = pick([1, 2]), s = pick([30, 60, 120, 180]);
      var bytes = sr * bd * ch * s / 8;
      return Q('A sound is recorded for ' + s + ' s at ' + sr.toLocaleString('en-GB') + ' Hz with a bit depth of ' + bd + ' bits, in ' + (ch === 2 ? 'stereo' : 'mono') + '. Use 1 MB = 1 000 000 bytes.', [
        ['Find the file size in MB.', 3, BS.cs.dec(bytes / 1e6) + ' MB'],
        ['Explain the effect of halving the sample rate.', 2, 'The file size halves but sound quality falls, as fewer samples capture the waveform']
      ]);
    } },
    { d: [2], f: function () {
      var mb = pick([50, 120, 250, 700, 1500]), mbps = pick([8, 20, 40, 100]);
      return Q('A ' + mb + ' MB file is sent over a ' + mbps + ' Mbps connection (1 MB = 1 000 000 bytes, 1 Mbps = 1 000 000 bits per second).', [
        ['Find the minimum transfer time in seconds.', 3, M('\\frac{' + mb + ' \\times 8}{' + mbps + '} = ' + BS.cs.dec(mb * 8 / mbps)) + ' s'],
        ['Give two reasons the actual time is longer.', 2, 'Packet headers and protocol overheads; network congestion or errors needing retransmission']
      ]);
    } },
    { d: [1, 2], f: function () {
      var sc = pick([
        ['a photographer backing up 4 TB of images each month', 'magnetic hard disk', 'very high capacity at low cost per GB; portability and speed matter less'],
        ['a drone storing flight video', 'flash (solid state)', 'no moving parts so it is robust against vibration, light and low power'],
        ['a music company selling an album in shops', 'optical disc', 'cheap to mass-produce and distribute'],
        ['a laptop for a student who travels', 'solid state drive', 'robust, fast boot and load times, low power so better battery life']]);
      return Q('Recommend a type of secondary storage for ' + sc[0] + '.', [
        ['State the storage type.', 1, sc[1]],
        ['Justify your choice using two characteristics.', 2, sc[2]],
        ['Explain why RAM is not suitable for this purpose.', 1, 'RAM is volatile, so data is lost when power is off']
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Virtual storage and memory.', [
        ['Explain how virtual memory is used when RAM is full.', 2, 'Pages not currently needed are moved to secondary storage, freeing RAM; they are swapped back when needed'],
        ['Explain why heavy use of virtual memory slows a computer.', 2, 'Secondary storage is much slower than RAM; constant swapping (disk thrashing) wastes time'],
        ['State one item stored in ROM and why.', 1, 'The BIOS / boot program, as it must survive with no power and should not change']
      ]);
    } }
  ] });
  X('cs-storage', [
    function () {
      var cd1 = pick([8, 16]), cd2 = 24, w = 1200, h = 800;
      return Q('An image of ' + w + ' × ' + h + ' pixels is changed from ' + cd1 + '-bit to ' + cd2 + '-bit colour, and its resolution is halved in each direction.', [
        ['Find the ratio of new to old file size.', 3, M('\\frac{' + cd2 + ' \\times \\frac{1}{4}}{' + cd1 + '} = ' + BS.cs.dec(cd2 / 4 / cd1))],
        ['Explain whether image quality has improved overall.', 2, 'More colours, but fewer pixels, so less detail; it depends on the image']
      ]);
    },
    function () {
      var hdd = pick([40, 50, 60]), ssd = pick([70, 90, 110]), tb = pick([1, 2, 4]);
      return Q('A 1 TB hard disk costs £' + hdd + ' and a 1 TB SSD costs £' + ssd + '. A school needs ' + tb + ' TB for archives and 0.5 TB for a busy database.', [
        ['Find the cost per GB of each (1 TB = 1000 GB).', 2, 'HDD ' + BS.cs.dec(hdd / 1000 * 100) + 'p, SSD ' + BS.cs.dec(ssd / 1000 * 100) + 'p'],
        ['Recommend a combination, with reasons.', 3, 'SSD for the database (fast random access); HDD for archives (cheap capacity, rarely accessed)']
      ]);
    },
    function () {
      var s = pick([5, 10, 20]), sr = 44100, bd = 16, ch = 2;
      return Q('A ' + s + '-minute stereo track is recorded at 44 100 Hz, 16-bit, and then compressed to a 128 kbps (128 000 bits per second) file.', [
        ['Find the uncompressed size in MB (1 MB = 1 000 000 bytes).', 2, BS.cs.dec(sr * bd * ch * s * 60 / 8 / 1e6)],
        ['Find the compressed size in MB.', 2, BS.cs.dec(128000 * s * 60 / 8 / 1e6)],
        ['Explain why this compression must be lossy.', 1, 'The ratio is far beyond what lossless methods achieve; data the ear barely notices is removed']
      ]);
    },
    function () {
      return Q('A school is deciding whether to move its files to cloud storage.', [
        ['Give two advantages and two disadvantages of cloud storage.', 4, 'Advantages: access anywhere, provider handles backup and scaling. Disadvantages: needs a reliable internet connection, ongoing cost, data held by a third party'],
        ['Explain how regular backups and archiving differ.', 2, 'Backups are copies to restore after loss; archiving moves rarely used data to long-term storage to free space']
      ]);
    },
    function () {
      return Q('Storage technologies compared.', [
        ['Explain why flash memory wears out.', 2, 'Each cell can be erased and rewritten only a limited number of times before the insulating layer breaks down'],
        ['Explain how an optical disc stores data.', 2, 'A laser reads pits and lands; changes in reflection represent bits'],
        ['Explain why magnetic disks have slower random access than SSDs.', 1, 'The read head must physically move and wait for the platter to rotate']
      ]);
    }
  ]);

  /* =============================== 1.2.1 Operating systems and scheduling =============================== */
  function rr(bursts, q) { var rem = bursts.slice(), t = 0, done = [], order = [], queue = bursts.map(function (_, i) { return i; }); while (queue.length) { var i = queue.shift(), run = Math.min(q, rem[i]); order.push('P' + (i + 1) + ' (' + t + '–' + (t + run) + ')'); t += run; rem[i] -= run; if (rem[i] > 0) queue.push(i); else done[i] = t; } return { done: done, order: order }; }
  T({ id: 'cs-os', name: 'Operating systems: scheduling, memory and interrupts', video: 'OCR A level computer science scheduling algorithms round robin paging segmentation', gens: [
    { d: [1, 2], f: function () {
      var n = ri(3, 4), b = []; for (var i = 0; i < n; i++) b.push(ri(2, 9)); var q = pick([2, 3]);
      var r = rr(b, q);
      return Q('Processes all arrive at time 0 in the order ' + b.map(function (_, i) { return 'P' + (i + 1); }).join(', ') + ' with burst times ' + b.join(', ') + '. Round robin is used with a time slice of ' + q + '.', [
        ['Show the order in which processes run, with times.', 3, r.order.join(', ')],
        ['Find the completion time of each process.', 2, r.done.map(function (t, i) { return 'P' + (i + 1) + ' ' + t; }).join(', ')]
      ]);
    } },
    { d: [1, 2], f: function () {
      var n = 4, b = []; for (var i = 0; i < n; i++) b.push(ri(2, 12));
      var t = 0, w = b.map(function (x) { var s = t; t += x; return s; });
      var sj = b.map(function (x, i) { return [x, i]; }).sort(function (p, q) { return p[0] - q[0] || p[1] - q[1]; }), t2 = 0, w2 = [];
      sj.forEach(function (p) { w2[p[1]] = t2; t2 += p[0]; });
      return Q('Four jobs P1–P4 arrive at time 0 with burst times ' + b.join(', ') + '.', [
        ['Find the average waiting time using first come first served.', 2, BS.cs.dec(sum(w) / 4)],
        ['Find the average waiting time using shortest job first.', 2, BS.cs.dec(sum(w2) / 4)],
        ['Give a drawback of shortest job first.', 1, 'Long jobs may starve, and burst times must be known in advance']
      ]);
    } },
    { d: [2], f: function () {
      var ps = pick([256, 512, 1024, 4096]), addr = ri(ps * 2, ps * 20);
      return Q('A system uses paging with a page size of ' + ps + ' bytes.', [
        ['Find the page number and offset of logical address ' + addr + '.', 2, 'Page ' + Math.floor(addr / ps) + ', offset ' + (addr % ps)],
        ['Explain the difference between paging and segmentation.', 2, 'Pages are fixed-size physical divisions; segments are variable-size logical divisions such as a module or routine'],
        ['State one advantage of paging.', 1, 'No external fragmentation, since any free frame can hold any page']
      ]);
    } },
    { d: [1, 2], f: function () {
      var ints = some([['power failure', 1], ['hardware failure', 2], ['printer out of paper', 4], ['keyboard input', 5], ['timer for scheduling', 3]], 3);
      var s = ints.slice().sort(function (a, b) { return a[1] - b[1]; });
      return Q('A processor receives these interrupts at the same moment: ' + list(ints.map(function (x) { return x[0]; })) + '.', [
        ['Put them in a sensible priority order, highest first.', 2, s.map(function (x) { return x[0]; }).join(', ')],
        ['Describe what happens when an interrupt is serviced.', 4, 'At the end of the FDE cycle the interrupt register is checked; current register contents are pushed to the stack; the ISR runs; registers are popped and the program resumes']
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Types of operating system and software.', [
        ['Explain the purpose of a device driver.', 2, 'Translates the OS’s generic instructions into commands for a specific device'],
        ['Explain what a virtual machine is and give one use.', 2, 'Software that emulates a computer; e.g. running another OS, or running intermediate code like Java bytecode'],
        ['Explain why a real-time operating system is used in a car’s airbag controller.', 2, 'It must respond within a guaranteed time to sensor input']
      ]);
    } }
  ] });
  X('cs-os', [
    function () {
      var p = [[0, ri(5, 8)], [ri(1, 2), ri(2, 4)], [ri(3, 4), ri(1, 3)]];
      /* shortest remaining time, preemptive */
      var rem = p.map(function (x) { return x[1]; }), t = 0, fin = [], log = [], cur = -1;
      while (fin.filter(function (x) { return x !== undefined; }).length < 3) { var best = -1; for (var i = 0; i < 3; i++) if (p[i][0] <= t && rem[i] > 0 && (best < 0 || rem[i] < rem[best])) best = i; if (best !== cur) { log.push('P' + (best + 1) + ' at ' + t); cur = best; } rem[best]--; t++; if (!rem[best]) fin[best] = t; }
      return Q('Shortest remaining time scheduling. Arrival and burst times: P1 (' + p[0].join(', ') + '), P2 (' + p[1].join(', ') + '), P3 (' + p[2].join(', ') + ').', [
        ['Show when each process starts or resumes.', 3, log.join(', ')],
        ['Find each completion time.', 2, fin.map(function (x, i) { return 'P' + (i + 1) + ' ' + x; }).join(', ')],
        ['Explain why this algorithm has more overhead than shortest job first.', 1, 'It may preempt, causing extra context switches']
      ]);
    },
    function () {
      return Q('Multi-level feedback queues.', [
        ['Describe how a multi-level feedback queue works.', 3, 'Several queues of different priority; a process that uses its whole time slice drops to a lower queue; processes waiting a long time can be promoted'],
        ['Explain how it favours interactive processes.', 2, 'Short I/O-bound bursts stay in high-priority queues so they respond quickly']
      ]);
    },
    function () {
      var frames = 3, refs = []; for (var i = 0; i < 8; i++) refs.push(ri(1, 5));
      var mem = [], faults = 0; refs.forEach(function (r) { if (mem.indexOf(r) < 0) { faults++; if (mem.length === frames) mem.shift(); mem.push(r); } });
      return Q('A process has 3 page frames. Pages are requested in the order ' + refs.join(', ') + '. Pages are replaced first in, first out.', [
        ['Find the number of page faults.', 3, faults],
        ['State the pages in memory at the end.', 1, mem.join(', ')],
        ['Explain what is meant by disk thrashing.', 1, 'Pages are swapped so often that little useful work is done']
      ]);
    },
    function () {
      return Q('BIOS and booting.', [
        ['Describe the role of the BIOS when a computer is switched on.', 3, 'Runs a POST to check hardware, sets up hardware, then locates and loads the bootstrap loader for the OS'],
        ['Explain why the BIOS is stored in flash ROM rather than RAM.', 1, 'It must be non-volatile, yet occasionally updatable']
      ]);
    },
    function () {
      var n = ri(3, 4), b = []; for (var i = 0; i < n; i++) b.push(ri(3, 10));
      var r2 = rr(b, 2), r4 = rr(b, 4);
      var avg = function (r) { return A.sf3(sum(r.done) / n); };
      return Q('Processes arrive at time 0 with bursts ' + b.join(', ') + '.', [
        ['Find the average completion time with round robin, time slice 2.', 2, avg(r2)],
        ['Repeat with a time slice of 4.', 2, avg(r4)],
        ['Explain the trade-off in choosing a time slice.', 2, 'Small slices give good responsiveness but more context-switching overhead; large slices behave like first come first served']
      ]);
    }
  ]);

  /* =============================== 1.2.2 / 1.2.4 Translators and languages =============================== */
  T({ id: 'cs-translators', name: 'Translators, compilation and types of language', video: 'OCR A level computer science stages of compilation lexical analysis', gens: [
    { d: [1, 2], f: function () {
      var v1 = pick(['total', 'score', 'count', 'price']), v2 = pick(['item', 'bonus', 'rate', 'step']), op = pick(['+', '-', '*']), k = ri(2, 9);
      var stmt = v1 + ' = ' + v1 + ' ' + op + ' ' + v2 + ' * ' + k;
      return Q('During lexical analysis, the statement ' + ic(stmt) + ' is split into tokens.', [
        ['How many tokens are there?', 1, 7],
        ['Classify each token as an identifier, operator or literal.', 3, v1 + ' (identifier), = (operator), ' + v1 + ' (identifier), ' + op + ' (operator), ' + v2 + ' (identifier), * (operator), ' + k + ' (literal)'],
        ['State what is added to the symbol table.', 1, 'The identifiers ' + v1 + ' and ' + v2 + ', with details such as type and scope']
      ]);
    } },
    { d: [1], f: function () {
      var sc = pick([
        ['a games company selling software to customers', 'compiler', 'the executable runs fast and the source code is not distributed'],
        ['a student testing a short program line by line', 'interpreter', 'errors are reported as soon as they occur, so debugging is quick'],
        ['a web page’s scripts that must run on any device', 'interpreter', 'the same source runs on any platform with an interpreter']]);
      return Q('Choose a translator for ' + sc[0] + '.', [
        ['State whether a compiler or an interpreter is more suitable.', 1, sc[1]],
        ['Justify your answer.', 2, sc[2]],
        ['State what translates assembly code into machine code.', 1, 'An assembler']
      ]);
    } },
    { d: [2], f: function () {
      var st = shuffle(['Lexical analysis', 'Syntax analysis', 'Code generation', 'Optimisation']);
      return Q('The stages of compilation are listed in a random order: ' + st.join(', ') + '.', [
        ['Put them in the correct order.', 1, 'Lexical analysis, syntax analysis, code generation, optimisation'],
        ['Describe what happens in syntax analysis.', 2, 'Tokens are checked against the rules of the language and an abstract syntax tree is built; errors are reported'],
        ['Explain one risk of optimisation.', 1, 'It may remove code that was needed or change behaviour, and it lengthens compile time']
      ]);
    } },
    { d: [1, 2], f: function () {
      return Q('Linkers, loaders and libraries.', [
        ['Explain the difference between static and dynamic linking.', 2, 'Static: library code is copied into the executable. Dynamic: the executable refers to a shared library loaded at run time'],
        ['Give an advantage of dynamic linking.', 1, 'Smaller executables, and library updates apply to all programs'],
        ['State the role of a loader.', 1, 'Copies the program into memory and sets up addresses so it can run']
      ]);
    } },
    { d: [2, 3], f: function () {
      var sc = pick([['a small business needing accounts software', 'off-the-shelf', 'cheaper, tested and supported, available now'], ['a hospital needing to link several unusual machines', 'bespoke', 'meets exact needs that off-the-shelf software does not'], ['a charity with no budget for licences', 'open source', 'free to use and can be modified by volunteers']]);
      return Q('Application software for ' + sc[0] + '.', [
        ['Recommend off-the-shelf, bespoke or open source software.', 1, sc[1]],
        ['Justify, giving one drawback too.', 3, sc[2] + '; a drawback might be cost, time to develop, or limited support']
      ]);
    } }
  ] });
  X('cs-translators', [
    function () {
      return Q('Intermediate code.', [
        ['Explain how Java-style bytecode makes programs portable.', 2, 'Source is compiled to intermediate code that any platform’s virtual machine can run'],
        ['Explain why bytecode usually runs slower than native machine code.', 1, 'It must be interpreted or compiled just in time on the target machine'],
        ['Explain how just-in-time compilation reduces this.', 1, 'Frequently used parts are compiled to native code while running']
      ]);
    },
    function () {
      var stmt = pick(['if x > 3 then', 'while count < 10', 'total = total + 1']);
      return Q('Errors at different stages.', [
        ['The statement ' + ic('totl = 5 +') + ' is compiled. At which stage is the error found?', 1, 'Syntax analysis (the expression is incomplete)'],
        ['An undeclared identifier is used. Which stage finds this?', 1, 'Semantic checks during syntax analysis (or code generation), using the symbol table'],
        ['Explain why a program can compile but still give wrong results.', 1, 'Logic errors obey the rules of the language']
      ]);
    },
    function () {
      return Q('Low-level and high-level languages.', [
        ['Give two reasons to write in assembly language.', 2, 'Direct control of hardware; very efficient code for small embedded systems'],
        ['Explain why one high-level statement may become several machine code instructions.', 2, 'High-level statements describe tasks in abstract terms; the processor only performs simple operations'],
        ['Explain what is meant by a one-to-one correspondence in assembly language.', 1, 'Each mnemonic corresponds to one machine code instruction']
      ]);
    },
    function () {
      return Q('Open source licensing.', [
        ['Explain one benefit and one drawback of open source software to a developer.', 2, 'Benefit: can adapt and inspect the code. Drawback: support may be limited, and some licences require changes to be shared'],
        ['Explain why a company might keep its source code closed.', 2, 'To protect intellectual property and earn from licences']
      ]);
    },
    function () {
      return Q('Optimisation in practice.', [
        ['The loop ' + ic('for i = 1 to 100: x = 5 * 3 + i') + ' is compiled. Suggest two optimisations.', 2, 'Replace 5 * 3 by 15 (constant folding); compute the result of loop-invariant expressions once'],
        ['Why might a programmer turn optimisation off while debugging?', 1, 'Optimised code may not match the source line by line']
      ]);
    }
  ]);

  /* =============================== Little Man Computer and addressing modes =============================== */
  function lmcRun(prog, inputs) {
    var mem = [], labels = {}, out = [], acc = 0, pc = 0, steps = 0;
    prog.forEach(function (l, i) { if (l[0]) labels[l[0]] = i; });
    prog.forEach(function (l, i) { mem[i] = l[1] === 'DAT' ? (l[2] || 0) : null; });
    var inp = inputs.slice();
    while (steps++ < 500) {
      var l = prog[pc], op = l[1], arg = l[2], a = labels[arg] !== undefined ? labels[arg] : arg; pc++;
      if (op === 'INP') acc = inp.shift(); else if (op === 'OUT') out.push(acc); else if (op === 'STA') mem[a] = acc; else if (op === 'LDA') acc = mem[a];
      else if (op === 'ADD') acc += mem[a]; else if (op === 'SUB') acc -= mem[a]; else if (op === 'BRA') pc = a; else if (op === 'BRZ') { if (acc === 0) pc = a; } else if (op === 'BRP') { if (acc >= 0) pc = a; } else if (op === 'HLT') break;
    }
    return out;
  }
  function pad(s, n) { s = String(s); while (s.length < n) s += ' '; return s; }
  function lmcText(prog) { return code(prog.map(function (l) { return pad(l[0] || '', 7) + pad(l[1], 5) + (l[2] !== undefined ? l[2] : ''); })); }
  function lmcCode(lines) { return code(lines.map(function (l) { var p = l.split('\t'); return pad(p[0], 7) + pad(p[1] || '', 5) + (p[2] || ''); })); }
  var LMC = [
    { p: [[null, 'INP'], [null, 'STA', 'num'], [null, 'INP'], [null, 'ADD', 'num'], [null, 'OUT'], [null, 'HLT'], ['num', 'DAT']], i: function () { return [ri(5, 60), ri(5, 60)]; }, what: 'outputs the sum of the two inputs' },
    { p: [[null, 'INP'], [null, 'STA', 'a'], [null, 'INP'], [null, 'STA', 'b'], [null, 'LDA', 'a'], [null, 'SUB', 'b'], [null, 'BRP', 'big'], [null, 'LDA', 'b'], [null, 'OUT'], [null, 'HLT'], ['big', 'LDA', 'a'], [null, 'OUT'], [null, 'HLT'], ['a', 'DAT'], ['b', 'DAT']], i: function () { return [ri(5, 90), ri(5, 90)]; }, what: 'outputs the larger of the two inputs' },
    { p: [[null, 'INP'], ['loop', 'OUT'], [null, 'SUB', 'one'], [null, 'BRP', 'loop'], [null, 'HLT'], ['one', 'DAT', 1]], i: function () { return [ri(2, 5)]; }, what: 'counts down from the input to 0' },
    { p: [[null, 'INP'], [null, 'STA', 'a'], [null, 'INP'], [null, 'STA', 'b'], ['loop', 'LDA', 't'], [null, 'ADD', 'a'], [null, 'STA', 't'], [null, 'LDA', 'b'], [null, 'SUB', 'one'], [null, 'STA', 'b'], [null, 'BRZ', 'end'], [null, 'BRA', 'loop'], ['end', 'LDA', 't'], [null, 'OUT'], [null, 'HLT'], ['a', 'DAT'], ['b', 'DAT'], ['t', 'DAT', 0], ['one', 'DAT', 1]], i: function () { return [ri(2, 12), ri(2, 6)]; }, what: 'multiplies the two inputs by repeated addition' },
    { p: [[null, 'INP'], [null, 'STA', 'n'], ['loop', 'LDA', 'n'], [null, 'SUB', 'step'], [null, 'STA', 'n'], [null, 'BRP', 'loop'], [null, 'LDA', 'n'], [null, 'ADD', 'step'], [null, 'OUT'], [null, 'HLT'], ['n', 'DAT'], ['step', 'DAT', 7]], i: function () { return [ri(10, 60)]; }, what: 'outputs the remainder when the input is divided by 7' }
  ];
  T({ id: 'cs-lmc', name: 'Assembly language, Little Man Computer and addressing modes', video: 'OCR A level computer science little man computer addressing modes', gens: [
    { d: [1, 2], f: function () {
      var k = ri(0, 2), L = LMC[k], ins = L.i();
      return Q('Here is a Little Man Computer program.' + lmcText(L.p), [
        ['State the output when the input' + (ins.length > 1 ? 's are ' + list(ins.map(String)) : ' is ' + ins[0]) + '.', 2, lmcRun(L.p, ins).join(', ')],
        ['Describe what the program does.', 2, 'It ' + L.what]
      ]);
    } },
    { d: [2], f: function () {
      var k = ri(3, 4), L = LMC[k], ins = L.i();
      return Q('Trace this Little Man Computer program.' + lmcText(L.p), [
        ['State the output when the input' + (ins.length > 1 ? 's are ' + list(ins.map(String)) : ' is ' + ins[0]) + '.', 3, lmcRun(L.p, ins).join(', ')],
        ['Describe the purpose of the program.', 2, 'It ' + L.what],
        ['Explain the difference between BRZ and BRP.', 1, 'BRZ branches if the accumulator is zero; BRP branches if it is zero or positive']
      ]);
    } },
    { d: [1, 2], f: function () {
      var mem, base, op, ix, i;
      do { mem = {}; base = ri(20, 30); for (i = 0; i < 8; i++) mem[base + i] = ri(base, base + 7); op = base + ri(0, 3); ix = ri(1, 3); }
      while (new Set([op, mem[op], mem[mem[op]], mem[op + ix]]).size < 4);
      var rows = []; for (i = 0; i < 8; i++) rows.push([base + i, mem[base + i]]);
      return Q('Memory contents are shown. The index register holds ' + ix + '.' + table(['Address', 'Contents'], rows), [
        ['Give the value loaded into the accumulator by ' + ic('LDA ' + op) + ' with immediate addressing.', 1, op],
        ['With direct addressing.', 1, mem[op]],
        ['With indirect addressing.', 1, mem[mem[op]]],
        ['With indexed addressing.', 1, mem[op + ix]]
      ]);
    } },
    { d: [1], f: function () {
      var a = ri(10, 40), b = ri(10, 40);
      return Q('Write a Little Man Computer program that inputs two numbers and outputs their difference (first minus second).', [
        ['Write the program.', 4, lmcCode(['\tINP', '\tSTA first', '\tINP', '\tSTA second', '\tLDA first', '\tSUB second', '\tOUT', '\tHLT', 'first\tDAT', 'second\tDAT'])],
        ['State the output for inputs ' + a + ' and ' + b + '.', 1, a - b]
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Addressing modes in use.', [
        ['Explain why indexed addressing is useful for arrays.', 2, 'The index register is added to a base address, so a loop can step through consecutive locations'],
        ['Explain one advantage and one disadvantage of indirect addressing.', 2, 'Can reach addresses larger than the operand field allows; needs an extra memory access, so it is slower']
      ]);
    } }
  ] });
  X('cs-lmc', [
    function () {
      return Q('Write a Little Man Computer program that inputs numbers until a 0 is entered, then outputs their total.', [
        ['Write the program.', 5, lmcCode(['loop\tINP', '\tBRZ end', '\tADD total', '\tSTA total', '\tBRA loop', 'end\tLDA total', '\tOUT', '\tHLT', 'total\tDAT\t0'])],
        ['Explain why the total is stored after each addition.', 1, 'The next INP overwrites the accumulator']
      ]);
    },
    function () {
      var L = LMC[4], ins = [ri(30, 99)];
      return Q('This program uses a constant of 7.' + lmcText(L.p), [
        ['State the output for input ' + ins[0] + '.', 2, lmcRun(L.p, ins).join(', ')],
        ['Explain why the program adds 7 back before outputting.', 2, 'The loop stops only once the value has gone negative, one subtraction too far'],
        ['Suggest a change so it outputs the quotient instead.', 2, 'Keep a counter incremented each loop, subtract one at the end, and output it']
      ]);
    },
    function () {
      var k = ri(2, 5);
      return Q('Write a Little Man Computer program that inputs a number and outputs it multiplied by ' + k + ', using only ADD.', [
        ['Write the program.', 3, lmcCode(['\tINP', '\tSTA n'].concat(Array(k - 1).fill('\tADD n')).concat(['\tOUT', '\tHLT', 'n\tDAT']))],
        ['Explain why a loop would be better for a large multiplier.', 1, 'The program would be shorter and the multiplier could vary']
      ]);
    },
    function () {
      return Q('Machine code format.', [
        ['An instruction uses 4 bits for the opcode and 12 bits for the operand. How many different opcodes are possible?', 1, 16],
        ['What is the largest address that can be used directly?', 1, 4095],
        ['Explain how indirect addressing helps if memory is larger than this.', 2, 'The operand points to a location holding a full-width address']
      ]);
    },
    function () {
      var a = ri(3, 9);
      return Q('A program uses self-modifying code: it changes the address of an ' + ic('LDA') + ' instruction inside a loop to step through a list.', [
        ['Explain why this is needed in LMC to process a list.', 2, 'LMC has no indexed addressing, so the address in the instruction itself must be incremented'],
        ['Give a risk of self-modifying code.', 1, 'It is hard to read, debug and maintain']
      ]);
    }
  ]);

  /* =============================== 1.2.3 Software development =============================== */
  T({ id: 'cs-softdev', name: 'Software development: methodologies and testing', video: 'OCR A level computer science software development methodologies waterfall agile spiral', gens: [
    { d: [1, 2], f: function () {
      var lo = ri(1, 20), hi = lo + ri(10, 80), vals = shuffle([[ri(lo + 1, hi - 1), 'normal'], [lo, 'boundary'], [hi, 'boundary'], [pick(['"ten"', '"' + (lo + 3) + '.5"', 'blank']), 'erroneous'], [hi + ri(20, 60), 'erroneous']]);
      return Q('A program accepts a whole number from ' + lo + ' to ' + hi + ' inclusive.', [
        ['Classify each test value as normal, boundary or erroneous: ' + vals.map(function (v) { return v[0]; }).join(', ') + '.', 3, vals.map(function (v) { return v[0] + ' ' + v[1]; }).join('; ')],
        ['Explain why boundary data is tested.', 1, 'Mistakes with < and ≤ are common at the edges of a range']
      ]);
    } },
    { d: [1, 2], f: function () {
      var sc = pick([
        ['a small team building an app for a client who keeps changing requirements', 'agile (or extreme programming)', 'short iterations let the client review working software and change requirements'],
        ['a large, safety-critical project with fixed requirements', 'waterfall', 'clear stages and documentation suit stable requirements; each stage is signed off'],
        ['a high-risk, large project with uncertain technology', 'spiral', 'each loop identifies and reduces risk before committing further'],
        ['a project needing a working prototype quickly for user feedback', 'rapid application development', 'prototypes are refined with users in short cycles']]);
      return Q('Recommend a development methodology for ' + sc[0] + '.', [
        ['Name the methodology.', 1, sc[1]],
        ['Justify your choice.', 3, sc[2]]
      ]);
    } },
    { d: [2], f: function () {
      return Q('Testing strategies.', [
        ['Explain the difference between black box and white box testing.', 2, 'Black box tests inputs and outputs without seeing the code; white box tests each path through the code'],
        ['Explain alpha and beta testing.', 2, 'Alpha: in-house testing by the developers. Beta: a near-final version used by real users to find remaining bugs'],
        ['What is acceptance testing?', 1, 'The client checks the system meets the requirements before sign-off']
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Extreme programming (XP).', [
        ['Describe two practices used in extreme programming.', 2, 'Pair programming; test-driven development; small frequent releases; continuous integration'],
        ['Explain one disadvantage of XP.', 1, 'Little documentation; needs constant client involvement'],
        ['Explain why XP suits projects where requirements change.', 1, 'Short iterations and constant feedback absorb change']
      ]);
    } },
    { d: [1], f: function () {
      var lo = ri(1, 5), hi = lo + ri(5, 20);
      return Q('A validation routine checks that a score is between ' + lo + ' and ' + hi + '.', [
        ['Write the condition in pseudocode.', 2, ic('if score >= ' + lo + ' AND score <= ' + hi + ' then')],
        ['Give one test value of each type: normal, boundary and erroneous.', 3, (lo + 2) + ' normal; ' + lo + ' or ' + hi + ' boundary; ' + (hi + 5) + ' or text erroneous']
      ]);
    } }
  ] });
  X('cs-softdev', [
    function () {
      var lo = ri(5, 15), hi = lo + ri(10, 30);
      return Q('A programmer writes ' + ic('if age > ' + lo + ' AND age < ' + hi + ' then valid = true') + ' for the rule ' + M(lo + ' \\le \\text{age} \\le ' + hi) + '.', [
        ['Which test values reveal the error?', 2, lo + ' and ' + hi + ' (the boundaries), which are wrongly rejected'],
        ['Correct the condition.', 1, ic('if age >= ' + lo + ' AND age <= ' + hi + ' then')]
      ]);
    },
    function () {
      return Q('Comparing methodologies.', [
        ['Compare waterfall and agile for a project with a fixed deadline and budget.', 4, 'Waterfall makes cost and schedule easier to predict but is inflexible; agile adapts but scope may grow; prioritising features in agile can protect the deadline'],
        ['Why is documentation important in waterfall?', 1, 'Each stage depends on sign-off of the previous one']
      ]);
    },
    function () {
      return Q('Destructive testing and test plans.', [
        ['Explain the purpose of a test plan.', 2, 'Lists tests, data, expected results and actual results so testing is systematic and repeatable'],
        ['Explain why testing cannot prove a program has no errors.', 1, 'Not every input and path can be tested']
      ]);
    },
    function () {
      return Q('Maintenance after release.', [
        ['Describe corrective, adaptive and perfective maintenance.', 3, 'Corrective fixes bugs; adaptive adjusts to new environments; perfective improves performance or adds features'],
        ['Explain how good coding practice helps maintenance.', 2, 'Meaningful names, comments and modular code make it easier to understand and change']
      ]);
    },
    function () {
      return Q('The spiral model.', [
        ['Describe the four phases of each loop in the spiral model.', 4, 'Determine objectives; identify and resolve risks; develop and test; plan the next iteration'],
        ['Why is the spiral model expensive?', 1, 'Risk analysis needs expertise and many iterations']
      ]);
    }
  ]);

  /* =============================== 1.3.1 Compression, encryption and hashing =============================== */
  function rle(s) { var o = [], i = 0; while (i < s.length) { var j = i; while (j < s.length && s[j] === s[i]) j++; o.push((j - i) + s[i]); i = j; } return o.join(''); }
  var WORDS = ['BINARY', 'PACKET', 'SCHEMA', 'BUFFER', 'KERNEL', 'SOCKET', 'STACK', 'QUEUE', 'CACHE', 'ROUTER', 'MODEM', 'PIXEL'];
  function caesar(w, k) { return w.split('').map(function (c) { return String.fromCharCode((c.charCodeAt(0) - 65 + k + 26) % 26 + 65); }).join(''); }
  T({ id: 'cs-exchange', name: 'Compression, encryption and hashing', video: 'OCR A level computer science compression encryption hashing', gens: [
    { d: [1], f: function () {
      var s = ''; var cs = 'WB'; for (var i = 0; i < 5; i++) s += Array(ri(1, 6) + 1).join(cs[i % 2]);
      return Q('A row of pixels is ' + ic(s) + ' (W = white, B = black).', [
        ['Encode it using run length encoding.', 2, rle(s)],
        ['Explain why RLE suits images with large blocks of colour.', 1, 'Long runs are stored as one count and value'],
        ['State whether RLE is lossy or lossless.', 1, 'Lossless']
      ]);
    } },
    { d: [1, 2], f: function () {
      var w = pick(WORDS), k = ri(2, 9), w2; do { w2 = pick(WORDS); } while (w2 === w);
      return Q('A Caesar cipher shifts each letter ' + k + ' places forward.', [
        ['Encrypt ' + ic(w) + '.', 2, caesar(w, k)],
        ['Explain why a Caesar cipher is easy to break.', 2, 'Only 25 keys to try; letter frequencies are kept'],
        ['Decrypt ' + ic(caesar(w2, k)) + '.', 1, w2]
      ]);
    } },
    { d: [2], f: function () {
      var size = pick([7, 11, 13]), keys = []; while (keys.length < 6) { var k = ri(10, 99); if (keys.indexOf(k) < 0) keys.push(k); }
      var tbl = []; for (var i = 0; i < size; i++) tbl.push('–'); keys.forEach(function (k) { var h = k % size; while (tbl[h] !== '–') h = (h + 1) % size; tbl[h] = k; });
      return Q('Keys ' + keys.join(', ') + ' are inserted in order into a hash table of size ' + size + ' using ' + ic('key MOD ' + size) + '. Collisions use the next free slot.', [
        ['Show the final table.', 4, table(tbl.map(function (_, i) { return i; }), [tbl])],
        ['Explain why hashing gives fast lookups.', 1, 'The location is calculated directly instead of searched for']
      ]);
    } },
    { d: [2, 3], f: function () {
      var p = bin(ri(1, 255), 8), k = bin(ri(1, 255), 8), c = bin(parseInt(p, 2) ^ parseInt(k, 2), 8);
      return Q('The Vernam cipher combines plaintext ' + ic(p) + ' with key ' + ic(k) + ' using XOR.', [
        ['Find the ciphertext.', 2, c],
        ['Show that XOR with the key recovers the plaintext.', 1, c + ' XOR ' + k + ' = ' + p],
        ['State the conditions for the Vernam cipher to be unbreakable.', 2, 'The key is truly random, at least as long as the message, kept secret and used only once']
      ]);
    } },
    { d: [1, 2], f: function () {
      return Q('Symmetric and asymmetric encryption.', [
        ['Explain how asymmetric encryption lets two strangers communicate securely.', 3, 'The sender encrypts with the receiver’s public key; only the receiver’s private key can decrypt'],
        ['Explain why symmetric encryption is still widely used.', 1, 'It is much faster, so a symmetric key is often exchanged using asymmetric encryption'],
        ['Explain how hashing is used to store passwords.', 2, 'Only the hash is stored; a login attempt is hashed and compared; hashes cannot be reversed']
      ]);
    } }
  ] });
  X('cs-exchange', [
    function () {
      var text = 'the cat and the dog and the bird';
      return Q('Dictionary compression of ' + ic(text) + '.', [
        ['List the dictionary of distinct words.', 1, 'the, cat, and, dog, bird'],
        ['Write the compressed sequence using positions starting at 1.', 2, '1 2 3 1 4 3 1 5'],
        ['Explain why this saves space for long texts but may not for short ones.', 2, 'The dictionary must be stored too; savings come from repeats']
      ]);
    },
    function () {
      var w = pick(WORDS), k = ri(3, 20);
      return Q('Frequency analysis.', [
        ['The most common letter in a long ciphertext is ' + ic(caesar('E', k)) + '. Assuming a Caesar cipher on English text, estimate the shift.', 2, k],
        ['Explain why the Vernam cipher resists frequency analysis.', 2, 'Each character is combined with a different random key value, so frequencies are flat']
      ]);
    },
    function () {
      return Q('Digital signatures.', [
        ['Describe how a digital signature is created and checked.', 4, 'The sender hashes the message and encrypts the hash with their private key; the receiver decrypts with the sender’s public key and compares with their own hash of the message'],
        ['What two things does a valid signature prove?', 2, 'The message came from the sender, and it has not been altered']
      ]);
    },
    function () {
      var s = pick(['AAAAABBBCCCCCCD', 'XXXXXXYYZZZZZZZZ', 'PPPQQQQQQQQRRS']);
      var r = rle(s);
      return Q('Compression ratio.', [
        ['Encode ' + ic(s) + ' with RLE, each count and character taking one byte.', 1, r],
        ['Find the compression ratio (original : compressed).', 2, s.length + ' : ' + r.length],
        ['Give a string that RLE makes longer.', 1, 'Any string with no repeats, e.g. ABCD becomes 1A1B1C1D']
      ]);
    },
    function () {
      return Q('Properties of a good hash function.', [
        ['Give three properties of a good hashing algorithm for a hash table.', 3, 'Fast to compute; spreads keys evenly; few collisions; same key always gives the same index'],
        ['Explain what the load factor is and why it matters.', 2, 'Items ÷ slots; a high load factor causes more collisions and slower lookups']
      ]);
    }
  ]);

  /* =============================== 1.3.2 Databases =============================== */
  var NAMES = ['Amara', 'Ben', 'Chloe', 'Dev', 'Ella', 'Finn', 'Grace', 'Hari', 'Isla', 'Jack', 'Kofi', 'Lily'];
  var HOUSES = ['North', 'South', 'East', 'West'];
  function pupils(n) { return some(NAMES, n).map(function (nm, i) { return { id: 101 + i, name: nm, house: pick(HOUSES), year: pick([12, 13]), score: ri(40, 99) }; }); }
  function ptab(rs) { return table(['PupilID', 'Name', 'House', 'Year', 'Score'], rs.map(function (r) { return [r.id, r.name, r.house, r.year, r.score]; })); }
  T({ id: 'cs-databases', name: 'Databases and SQL', video: 'OCR A level computer science SQL normalisation databases', gens: [
    { d: [1, 2], f: function () {
      var rs = pupils(7), y = pick([12, 13]), s = ri(55, 75);
      var res = rs.filter(function (r) { return r.year === y && r.score > s; }).sort(function (a, b) { return b.score - a.score; });
      return Q('The table Pupils is shown.' + ptab(rs), [
        ['State the result of the query.' + code(['SELECT Name, Score', 'FROM Pupils', 'WHERE Year = ' + y + ' AND Score > ' + s, 'ORDER BY Score DESC;']), 3, res.length ? res.map(function (r) { return r.name + ' ' + r.score; }).join('; ') : 'No rows are returned'],
        ['Identify the primary key and explain why.', 1, 'PupilID: it is unique for each pupil']
      ]);
    } },
    { d: [1, 2], f: function () {
      var rs = pupils(6), h = pick(HOUSES);
      return Q('Using the table Pupils:' + ptab(rs), [
        ['Write SQL to list the names of pupils in ' + h + ' house, in alphabetical order.', 3, code(['SELECT Name', 'FROM Pupils', 'WHERE House = "' + h + '"', 'ORDER BY Name;'])],
        ['Write SQL to delete the pupil with ID ' + rs[2].id + '.', 2, code(['DELETE FROM Pupils', 'WHERE PupilID = ' + rs[2].id + ';'])]
      ]);
    } },
    { d: [2], f: function () {
      var rs = pupils(6), l = pick(['A', 'E', 'I', 'G', 'J']);
      var res = rs.filter(function (r) { return r.name.charAt(0) === l || r.score >= 90; });
      return Q('Using the table Pupils:' + ptab(rs), [
        ['State the result of ' + code(['SELECT Name FROM Pupils', 'WHERE Name LIKE "' + l + '%" OR Score >= 90;']), 2, res.length ? res.map(function (r) { return r.name; }).join(', ') : 'No rows are returned'],
        ['Write SQL to add a new pupil: ID 120, Mo, East, Year 12, score 77.', 2, code(['INSERT INTO Pupils (PupilID, Name, House, Year, Score)', 'VALUES (120, "Mo", "East", 12, 77);'])]
      ]);
    } },
    { d: [2, 3], f: function () {
      var rs = pupils(5), hm = { North: 'Mr Okafor', South: 'Ms Patel', East: 'Dr Reid', West: 'Mrs Lowe' };
      return Q('A second table Houses has fields House and Housemaster: ' + HOUSES.map(function (h) { return h + ' – ' + hm[h]; }).join(', ') + '.' + ptab(rs), [
        ['Write SQL to list each pupil’s name with their housemaster.', 3, code(['SELECT Pupils.Name, Houses.Housemaster', 'FROM Pupils', 'INNER JOIN Houses ON Pupils.House = Houses.House;'])],
        ['State the output row for ' + rs[0].name + '.', 1, rs[0].name + ', ' + hm[rs[0].house]],
        ['Explain what is meant by a foreign key.', 1, 'A field in one table that is the primary key of another, linking them']
      ]);
    } },
    { d: [1, 2], f: function () {
      return Q('A table Orders(OrderID, CustomerName, CustomerPhone, ItemCode, ItemName, Qty) stores one row per item in each order.', [
        ['Explain why the table is not in 3NF.', 2, 'Customer details depend on the customer, not the order; ItemName depends on ItemCode, not the whole key'],
        ['Normalise the data into 3NF, underlining primary keys.', 4, 'Customer(CustomerID, Name, Phone); Order(OrderID, CustomerID); Item(ItemCode, ItemName); OrderLine(OrderID, ItemCode, Qty)']
      ]);
    } }
  ] });
  X('cs-databases', [
    function () {
      return Q('Transactions and ACID.', [
        ['Explain each of the ACID properties.', 4, 'Atomicity: all or nothing. Consistency: rules are kept. Isolation: concurrent transactions do not interfere. Durability: committed changes survive failure'],
        ['Two staff book the last seat at the same moment. Explain how record locking prevents a problem.', 2, 'The first transaction locks the record; the second must wait until it is released'],
        ['Explain how deadlock can occur with record locking.', 1, 'Two transactions each lock a record the other needs, and both wait forever']
      ]);
    },
    function () {
      return Q('Referential integrity.', [
        ['Explain what referential integrity means.', 2, 'Every foreign key value must match an existing primary key value'],
        ['Explain how cascade delete maintains it.', 1, 'Deleting a parent record deletes its linked child records too'],
        ['Why might a school not use cascade delete on pupils and exam results?', 1, 'Results may be needed after a pupil leaves']
      ]);
    },
    function () {
      var rs = pupils(7), y = pick([12, 13]);
      var res = rs.filter(function (r) { return r.year === y; });
      return Q('Using the table Pupils:' + ptab(rs), [
        ['Write SQL to increase every Year ' + y + ' score by 5.', 2, code(['UPDATE Pupils', 'SET Score = Score + 5', 'WHERE Year = ' + y + ';'])],
        ['How many records are changed?', 1, res.length],
        ['Write SQL to remove the whole table.', 1, code(['DROP TABLE Pupils;'])]
      ]);
    },
    function () {
      return Q('Capturing, selecting, managing and exchanging data.', [
        ['Give two methods of capturing data for a database.', 2, 'Online forms; OCR/OMR of paper forms; sensors; barcode scanning'],
        ['Explain what EDI is.', 1, 'Electronic data interchange: exchanging documents between organisations in a standard electronic format'],
        ['Explain the difference between a flat file and a relational database.', 2, 'A flat file is one table with repeated data; a relational database links tables by keys, reducing redundancy']
      ]);
    },
    function () {
      return Q('Entity relationships.', [
        ['A pupil studies many subjects and each subject has many pupils. Explain why a link table is needed.', 2, 'Many-to-many relationships cannot be stored directly; a link table creates two one-to-many relationships'],
        ['Name the link table’s primary key.', 1, 'A composite key of PupilID and SubjectID'],
        ['Explain the difference between indexing and a primary key.', 1, 'An index speeds up searches on a field; a primary key uniquely identifies each record (and is usually indexed)']
      ]);
    }
  ]);

  /* =============================== 1.3.3 Networks =============================== */
  var PROTOS = [['HTTP', 'Application'], ['HTTPS', 'Application'], ['FTP', 'Application'], ['SMTP', 'Application'], ['POP3', 'Application'], ['IMAP', 'Application'], ['TCP', 'Transport'], ['UDP', 'Transport'], ['IP', 'Internet (network)'], ['Ethernet', 'Link']];
  T({ id: 'cs-networks', name: 'Networks, protocols and security', video: 'OCR A level computer science TCP/IP stack packet switching', gens: [
    { d: [1], f: function () {
      var ps = some(PROTOS, 3);
      return Q('The TCP/IP stack has four layers.', [
        ['Name the four layers, from the top.', 2, 'Application, transport, internet (network), link'],
        ['State the layer for each of ' + list(ps.map(function (p) { return p[0]; })) + '.', 3, ps.map(function (p) { return p[0] + ': ' + p[1]; }).join('; ')]
      ]);
    } },
    { d: [1, 2], f: function () {
      var kb = pick([20, 50, 120, 300]), pl = pick([500, 1000, 1460]), hd = pick([20, 40]);
      var n = Math.ceil(kb * 1000 / pl);
      return Q('A ' + kb + ' kB file (1 kB = 1000 bytes) is split into packets with a payload of ' + pl + ' bytes and a header of ' + hd + ' bytes.', [
        ['Find the number of packets.', 2, n],
        ['Find the total header overhead in bytes.', 1, n * hd],
        ['Describe how packet switching delivers the file.', 3, 'Packets travel by different routes chosen by routers; each has a sequence number so they are reassembled in order; missing packets are re-sent']
      ]);
    } },
    { d: [2], f: function () {
      return Q('Networking hardware and DNS.', [
        ['Describe how DNS finds the IP address of a web server.', 3, 'The browser asks a DNS resolver; if not cached it queries root, then top-level domain, then authoritative servers; the IP address is returned and cached'],
        ['Explain the difference between a switch and a router.', 2, 'A switch forwards frames within a LAN using MAC addresses; a router forwards packets between networks using IP addresses']
      ]);
    } },
    { d: [1, 2], f: function () {
      var t = pick([['a hacker guessing passwords on a login page', 'limit attempts, lock accounts, use strong passwords and two-factor authentication'], ['an employee opening an email attachment that installs malware', 'anti-malware software, staff training, blocking executable attachments'], ['data intercepted on public Wi-Fi', 'encryption (HTTPS / VPN)'], ['unauthorised packets entering the school network', 'a firewall filtering by port and IP address']]);
      return Q('Network security: ' + t[0] + '.', [
        ['Suggest measures to reduce the threat.', 2, t[1]],
        ['Explain how a proxy server can improve security.', 2, 'Requests go through the proxy, hiding internal addresses and allowing filtering and logging']
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Client-server and peer-to-peer.', [
        ['Compare client-server and peer-to-peer networks.', 4, 'Client-server: central management, security and backup, but the server is a single point of failure and costly. Peer-to-peer: cheap and resilient, but hard to manage and secure'],
        ['Explain why file sharing often uses peer-to-peer.', 1, 'Many peers upload parts of a file at once, so no server is overloaded']
      ]);
    } }
  ] });
  X('cs-networks', [
    function () {
      return Q('Circuit and packet switching.', [
        ['Compare circuit switching and packet switching for a video call.', 4, 'Circuit switching reserves a dedicated path, giving constant quality but wasting capacity; packet switching shares links efficiently but packets may be delayed or arrive out of order'],
        ['Why does live video often use UDP rather than TCP?', 2, 'Retransmitting late packets is pointless; speed matters more than perfect delivery']
      ]);
    },
    function () {
      var mb = pick([10, 25, 80]), a = pick([8, 16]), b = pick([50, 100]);
      return Q('A ' + mb + ' MB file is sent to 10 users. Each user’s link is ' + a + ' Mbps, and the server’s upload link is ' + b + ' Mbps (1 MB = 8 Mb).', [
        ['Find the time if all 10 download at once from the server (shared upload).', 2, BS.cs.dec(mb * 8 * 10 / b) + ' s'],
        ['Find the time for one user alone.', 1, BS.cs.dec(mb * 8 / Math.min(a, b)) + ' s'],
        ['Explain how this links to the case for a CDN or peer-to-peer.', 2, 'The server link is the bottleneck; spreading the load removes it']
      ]);
    },
    function () {
      return Q('Layering.', [
        ['Explain two advantages of using layers in network protocols.', 2, 'Each layer can be changed independently; problems are easier to isolate; standards let different vendors interoperate'],
        ['Describe what happens to data as it passes down the stack.', 3, 'Each layer adds its own header (encapsulation): port numbers at transport, IP addresses at internet, MAC addresses at link']
      ]);
    },
    function () {
      return Q('Network threats.', [
        ['Explain how SQL injection works and how to prevent it.', 3, 'Code typed into an input field changes the query; use parameterised queries and validate input'],
        ['Explain what a DDoS attack is.', 2, 'Many compromised machines flood a server with requests so real users cannot be served']
      ]);
    },
    function () {
      return Q('Standards and protocols.', [
        ['Explain why standards are needed in networking.', 2, 'Devices from different manufacturers can communicate'],
        ['Explain the difference between a MAC address and an IP address.', 2, 'A MAC address is fixed to a network card and used within a LAN; an IP address is logical, assigned by the network, and used for routing between networks']
      ]);
    }
  ]);

  /* =============================== 1.3.4 Web technologies =============================== */
  function pagerank(links, it, d) { var n = links.length, pr = links.map(function () { return 1; }); for (var k = 0; k < it; k++) { var nx = []; for (var i = 0; i < n; i++) { var s = 0; for (var j = 0; j < n; j++) if (links[j].indexOf(i) >= 0) s += pr[j] / links[j].length; nx.push((1 - d) + d * s); } pr = nx; } return pr; }
  var PG = ['A', 'B', 'C', 'D'];
  T({ id: 'cs-web', name: 'Web technologies and search engines', video: 'OCR A level computer science pagerank html css javascript', gens: [
    { d: [1, 2], f: function () {
      var links = [[1], [2], [0]]; if (Math.random() < 0.5) links[0] = [1, 2]; if (Math.random() < 0.5) links[2] = [0, 1];
      var pr = pagerank(links, 1, 0.85);
      return Q('Three pages link as follows: ' + links.map(function (l, i) { return PG[i] + ' → ' + l.map(function (x) { return PG[x]; }).join(', '); }).join('; ') + '. All pages start with PageRank 1, and ' + M('d = 0.85') + '.', [
        ['Use ' + M('PR(X) = (1 - d) + d \\sum \\frac{PR(T)}{C(T)}') + ' for one iteration to find each page’s new PageRank.', 4, pr.map(function (v, i) { return PG[i] + ' ' + BS.cs.dec(Math.round(v * 1000) / 1000); }).join(', ')],
        ['State what ' + M('C(T)') + ' means.', 1, 'The number of outbound links from page T']
      ]);
    } },
    { d: [1], f: function () {
      var c = pick(['#title', '.note', 'p', 'h1']);
      var m = { '#title': 'the single element with id title', '.note': 'every element with class note', p: 'every paragraph', h1: 'every level 1 heading' };
      return Q('A style sheet contains ' + code([c + ' { color: red; font-size: 20px; }']), [
        ['State which elements are styled.', 1, m[c]],
        ['Explain one advantage of an external style sheet.', 1, 'One change restyles every page that links to it'],
        ['Write the HTML to link to a style sheet called style.css.', 1, ic('<link href="style.css" rel="stylesheet" type="text/css">')]
      ]);
    } },
    { d: [2], f: function () {
      var n = ri(3, 6), k = ri(2, Math.min(4, n)), s = '', t = 0;
      for (var i = 1; i <= n; i++) { if (i % k === 0) s += i; t += i; }
      return Q('This JavaScript runs in a page.' + code(['var s = "";', 'var t = 0;', 'for (var i = 1; i <= ' + n + '; i++) {', '  if (i % ' + k + ' == 0) { s = s + i; }', '  t = t + i;', '}', 'document.getElementById("out").innerHTML = s + " " + t;']), [
        ['State what is shown in the element with id out.', 3, ic(s + ' ' + t)],
        ['Explain why JavaScript validation must also be repeated on the server.', 2, 'Client-side code can be bypassed or edited, so the server must not trust it']
      ]);
    } },
    { d: [1, 2], f: function () {
      return Q('Search engines.', [
        ['Explain how a search engine indexes the web.', 3, 'Crawlers follow links, read pages and record words and their locations in an index, which is searched instead of the web'],
        ['Give two factors other than PageRank that affect ranking.', 2, 'Relevance of keywords; freshness; location of user; page speed']
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Client-side and server-side processing.', [
        ['Compare client-side and server-side processing.', 4, 'Client-side runs in the browser, reducing server load and giving instant feedback, but code is visible and can be bypassed. Server-side can access databases and keep code secret, but adds load and round trips'],
        ['Give an example of each for an online shop.', 2, 'Client: checking an email field is filled in. Server: checking stock and processing payment']
      ]);
    } }
  ] });
  X('cs-web', [
    function () {
      var links = [[1, 2], [2], [0], [2]], pr1 = pagerank(links, 1, 0.85), pr2 = pagerank(links, 2, 0.85);
      return Q('Four pages: A → B, C; B → C; C → A; D → C. All start at 1, with ' + M('d = 0.85') + '.', [
        ['Find the PageRanks after one iteration.', 3, pr1.map(function (v, i) { return PG[i] + ' ' + BS.cs.dec(Math.round(v * 1000) / 1000); }).join(', ')],
        ['Find them after two iterations.', 3, pr2.map(function (v, i) { return PG[i] + ' ' + BS.cs.dec(Math.round(v * 1000) / 1000); }).join(', ')],
        ['Explain why D has the lowest rank.', 1, 'No page links to D']
      ]);
    },
    function () {
      return Q('The damping factor.', [
        ['Explain the meaning of the damping factor in PageRank.', 2, 'The probability that a user keeps clicking links rather than jumping to a random page'],
        ['Explain why a page with no inbound links has PageRank ' + M('1 - d') + '.', 1, 'The sum term is zero']
      ]);
    },
    function () {
      return Q('Write HTML for a page with a heading “Results”, a paragraph with id summary, an image score.png with alternative text “Score chart”, and a link to results2.html.', [
        ['Write the HTML.', 4, code(['<h1>Results</h1>', '<p id="summary"></p>', '<img src="score.png" alt="Score chart">', '<a href="results2.html">Next</a>'])],
        ['Why is alternative text important?', 1, 'Screen readers read it, and it shows if the image fails to load']
      ]);
    },
    function () {
      var a = ri(3, 9), b = ri(2, 6);
      return Q('Write a JavaScript function ' + ic('area(w, h)') + ' that returns the area of a rectangle, and code to show the area of a ' + a + ' by ' + b + ' rectangle in an alert.', [
        ['Write the code.', 3, code(['function area(w, h) {', '  return w * h;', '}', 'alert(area(' + a + ', ' + b + '));'])],
        ['State the value shown.', 1, a * b]
      ]);
    },
    function () {
      return Q('Search engine manipulation.', [
        ['Explain how link farms try to raise a page’s rank.', 2, 'Many pages are created just to link to the target, inflating its inbound links'],
        ['Explain why search engines keep their algorithms partly secret.', 1, 'To make manipulation harder']
      ]);
    }
  ]);

  /* =============================== 1.4.1 Data types: number representation =============================== */
  T({ id: 'cs-data-types', name: 'Data types: binary, hex, two’s complement and bitwise operations', video: 'OCR A level computer science two\'s complement binary hexadecimal', gens: [
    { d: [1], f: function () {
      var n = ri(20, 250);
      return Q('Number conversions for denary ' + n + '.', [
        ['Write ' + n + ' as an 8-bit binary number.', 1, nib(bin(n, 8))],
        ['Write ' + n + ' in hexadecimal.', 1, hex(n)],
        ['Explain why hexadecimal is used by programmers.', 1, 'Shorter and easier to read than binary, and each digit maps to exactly 4 bits']
      ]);
    } },
    { d: [1, 2], f: function () {
      var n = -ri(5, 120), m = ri(-128, -1);
      return Q('Using 8-bit two’s complement:', [
        ['Represent ' + n + '.', 2, nib(tc(n, 8))],
        ['Convert ' + nib(tc(m, 8)) + ' to denary.', 2, m],
        ['State the range of 8-bit two’s complement.', 1, '−128 to 127']
      ]);
    } },
    { d: [2], f: function () {
      var a = ri(60, 200), b = ri(60, 200), s = a + b;
      return Q('Add the 8-bit unsigned binary numbers ' + nib(bin(a, 8)) + ' and ' + nib(bin(b, 8)) + '.', [
        ['Show the 8-bit result.', 2, nib(bin(s % 256, 8))],
        ['Explain whether overflow has occurred.', 1, s > 255 ? 'Yes: the true sum ' + s + ' needs 9 bits' : 'No: the sum ' + s + ' fits in 8 bits']
      ]);
    } },
    { d: [1, 2], f: function () {
      var n = ri(10, 200), k = ri(1, 3), op = pick(['AND', 'OR', 'XOR']), mask = ri(1, 255);
      var r = op === 'AND' ? n & mask : op === 'OR' ? n | mask : n ^ mask;
      return Q('Bitwise operations on ' + nib(bin(n, 8)) + '.', [
        ['Apply ' + op + ' with the mask ' + nib(bin(mask, 8)) + '.', 2, nib(bin(r, 8))],
        ['Apply a logical shift left by ' + k + ' places (8 bits).', 1, nib(bin((n << k) & 255, 8))],
        ['Explain the effect of a logical shift left on the value, if no set bits are lost.', 1, 'It multiplies by ' + M('2^{' + k + '}')]
      ]);
    } },
    { d: [2, 3], f: function () {
      var whole = ri(1, 15), f = ri(1, 15), bits = bin(whole, 4) + bin(f, 4);
      return Q('An 8-bit unsigned fixed-point number has 4 bits before the binary point and 4 after.', [
        ['Convert ' + bits.slice(0, 4) + '.' + bits.slice(4) + ' to denary.', 2, BS.cs.dec(whole + f / 16)],
        ['Explain why 0.1 cannot be stored exactly.', 1, '0.1 is a recurring fraction in binary'],
        ['State the largest value that can be stored.', 1, '15.9375']
      ]);
    } }
  ] });
  X('cs-data-types', [
    function () {
      var a = ri(20, 100), b = ri(20, 100);
      return Q('Subtraction in 8-bit two’s complement: ' + a + ' − ' + b + '.', [
        ['Write ' + b + ' and −' + b + ' in two’s complement.', 2, nib(tc(b, 8)) + ' and ' + nib(tc(-b, 8))],
        ['Add ' + nib(tc(a, 8)) + ' and ' + nib(tc(-b, 8)) + ' and give the 8-bit result.', 2, nib(tc(a - b, 8)) + ' (' + (a - b) + ')'],
        ['Explain how overflow is detected in two’s complement addition.', 1, 'Adding two numbers of the same sign gives a result of the opposite sign']
      ]);
    },
    function () {
      var n = ri(1, 127), neg = -n;
      return Q('Sign and magnitude versus two’s complement for ' + neg + '.', [
        ['Write ' + neg + ' in 8-bit sign and magnitude.', 1, nib('1' + bin(n, 7))],
        ['Write it in 8-bit two’s complement.', 1, nib(tc(neg, 8))],
        ['Give two reasons two’s complement is preferred.', 2, 'Only one representation of zero; addition and subtraction use the same circuit']
      ]);
    },
    function () {
      var v = ri(0, 255), bit = ri(0, 7);
      return Q('Using masks on an 8-bit register holding ' + nib(bin(v, 8)) + '. Bits are numbered 0 (rightmost) to 7.', [
        ['Give the mask and operation to set bit ' + bit + ' to 1.', 2, 'OR with ' + nib(bin(1 << bit, 8)) + ' → ' + nib(bin(v | (1 << bit), 8))],
        ['Give the mask and operation to clear bit ' + bit + '.', 2, 'AND with ' + nib(bin(255 ^ (1 << bit), 8)) + ' → ' + nib(bin(v & (255 ^ (1 << bit)), 8))],
        ['Give the mask and operation to test whether bit ' + bit + ' is 1.', 1, 'AND with ' + nib(bin(1 << bit, 8)) + ' and check for a non-zero result']
      ]);
    },
    function () {
      var n = -ri(2, 60), k = ri(1, 2);
      var ar = (n >> k);
      return Q('Arithmetic shifts on two’s complement ' + nib(tc(n, 8)) + ' (' + n + ').', [
        ['Perform an arithmetic shift right by ' + k + '.', 2, nib(tc(ar, 8)) + ' (' + ar + ')'],
        ['Explain how an arithmetic shift differs from a logical shift right.', 1, 'The sign bit is copied in, keeping negative numbers negative'],
        ['Explain why the result is not exactly ' + n + ' ÷ ' + Math.pow(2, k) + ' in every case.', 1, 'Bits shifted out are lost, so the result is rounded down']
      ]);
    },
    function () {
      var ch = pick(['A', 'G', 'M', 'Z', 'a', 'k']), c = ch.charCodeAt(0);
      return Q('Character sets.', [
        ['The ASCII code for ' + ch + ' is ' + c + '. Give the code for the letter 3 places later, in binary.', 1, nib(bin(c + 3, 8))],
        ['Explain why Unicode replaced ASCII for many purposes.', 2, 'ASCII has only 128 (or 256) characters; Unicode covers all the world’s scripts and symbols'],
        ['Explain a drawback of Unicode.', 1, 'Characters may need more bytes, increasing file sizes']
      ]);
    }
  ]);

  /* =============================== Floating point =============================== */
  function fp(m, e) { /* m: 8-bit two's complement mantissa string; e: 4-bit two's complement exponent string */ return fromTc(m) / 128 * Math.pow(2, fromTc(e)); }
  function normFp() { var m; do { m = ri(-128, 127); } while (!(m >= 64 || (m < -64 && m >= -128))); return tc(m, 8); }
  function fpStr(m) { return m.charAt(0) + '.' + m.slice(1); }
  T({ id: 'cs-float', name: 'Floating point representation', video: 'OCR A level computer science floating point normalisation', gens: [
    { d: [1, 2], f: function () {
      var m = normFp(), e = tc(ri(-3, 6), 4);
      return Q('A floating point number has an 8-bit two’s complement mantissa and a 4-bit two’s complement exponent. Mantissa ' + ic(fpStr(m)) + ', exponent ' + ic(e) + '.', [
        ['Convert the number to denary.', 3, BS.cs.dec(fp(m, e))],
        ['Explain how you know the number is normalised.', 1, 'The first two bits of the mantissa differ']
      ]);
    } },
    { d: [2], f: function () {
      /* un-normalised mantissa */
      var shift = ri(1, 3), base; do { base = ri(-128, 127); } while (!(base >= 64 || base < -64));
      var mv = base >> shift, m = tc(mv, 8), ev = ri(-2, 4), e = tc(ev, 4);
      var nm = tc(mv << shift, 8), ne = tc(ev - shift, 4);
      return Q('Normalise the floating point number with mantissa ' + ic(fpStr(m)) + ' and exponent ' + ic(e) + ' (8-bit mantissa, 4-bit exponent, both two’s complement).', [
        ['Give the normalised mantissa and exponent.', 3, ic(fpStr(nm)) + ', exponent ' + ic(ne)],
        ['Explain why normalisation is used.', 2, 'It gives the maximum precision for the mantissa size and a unique representation of each number']
      ]);
    } },
    { d: [2, 3], f: function () {
      var m = normFp(), e = tc(ri(-2, 5), 4), v = fp(m, e);
      return Q('Represent ' + BS.cs.dec(v) + ' as a normalised floating point number with an 8-bit two’s complement mantissa and a 4-bit two’s complement exponent.', [
        ['Give the mantissa and exponent.', 4, ic(fpStr(m)) + ', exponent ' + ic(e)]
      ]);
    } },
    { d: [1, 2], f: function () {
      return Q('Range and precision.', [
        ['A system has 12 bits for a floating point number. Explain the effect of using more bits for the mantissa.', 2, 'Greater precision but a smaller range'],
        ['Explain the effect of using more bits for the exponent.', 1, 'Greater range but less precision'],
        ['Compare floating point and fixed point representation.', 2, 'Floating point gives a much larger range; fixed point is simpler and faster with constant precision']
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Find the largest positive number that can be stored with a normalised 8-bit two’s complement mantissa and 4-bit two’s complement exponent.', [
        ['Give the mantissa and exponent.', 2, ic('0.1111111') + ', exponent ' + ic('0111')],
        ['Give its denary value.', 2, BS.cs.dec(127 / 128 * 128)],
        ['Give the smallest positive normalised number.', 2, ic('0.1000000') + ', exponent ' + ic('1000') + ': ' + M('0.5 \\times 2^{-8} = 2^{-9}') + ' = 0.001953125']
      ]);
    } }
  ] });
  X('cs-float', [
    function () {
      var e1 = ri(1, 3), e2 = e1 + ri(1, 2);
      var m1 = ri(64, 127), m2 = ri(64, 127);
      var v1 = m1 / 128 * Math.pow(2, e1), v2 = m2 / 128 * Math.pow(2, e2);
      return Q('Add two floating point numbers (8-bit mantissa, 4-bit exponent): ' + ic(fpStr(bin(m1, 8))) + ' ' + M('\\times 2^{' + e1 + '}') + ' and ' + ic(fpStr(bin(m2, 8))) + ' ' + M('\\times 2^{' + e2 + '}') + '.', [
        ['Give the denary values.', 2, BS.cs.dec(v1) + ' and ' + BS.cs.dec(v2)],
        ['Find the exact sum in denary.', 1, BS.cs.dec(v1 + v2)],
        ['Explain the steps a processor takes to add them.', 3, 'Make the exponents equal by shifting the smaller number’s mantissa right; add the mantissas; normalise the result; round if needed']
      ]);
    },
    function () {
      var m = normFp(), e = tc(ri(-3, 5), 4);
      return Q('Negative floating point numbers. Mantissa ' + ic(fpStr(tc(-ri(65, 128), 8))) + ' has a leading 1.', [
        ['Explain how the leading bits show a normalised negative mantissa.', 1, 'It starts 10'],
        ['Convert mantissa ' + ic(fpStr(m)) + ', exponent ' + ic(e) + ' to denary.', 3, BS.cs.dec(fp(m, e))]
      ]);
    },
    function () {
      return Q('Rounding errors.', [
        ['Explain why ' + ic('0.1 + 0.2 == 0.3') + ' may be false on a computer.', 2, '0.1 and 0.2 cannot be stored exactly in binary floating point; the stored sum differs slightly from the stored 0.3'],
        ['Suggest how a program should compare two floating point values.', 1, 'Check whether their difference is smaller than a small tolerance']
      ]);
    },
    function () {
      var v = pick([0.75, 0.625, 1.5, 3.25, 5.5, -0.75, -1.5, -2.5]);
      var e = 0;
      if (v > 0) { while (v / Math.pow(2, e) >= 1) e++; while (v / Math.pow(2, e) < 0.5) e--; }
      else { while (v / Math.pow(2, e) < -1) e++; while (v / Math.pow(2, e) >= -0.5) e--; }
      var x = v / Math.pow(2, e);
      var m = tc(Math.round(x * 128), 8);
      return Q('Represent ' + v + ' as a normalised floating point number with an 8-bit two’s complement mantissa and 4-bit two’s complement exponent.', [
        ['Give the mantissa and exponent.', 4, ic(fpStr(m)) + ', exponent ' + ic(tc(e, 4))],
        ['Check by converting back.', 1, BS.cs.dec(fp(m, tc(e, 4)))]
      ]);
    },
    function () {
      return Q('Underflow and overflow.', [
        ['Explain what is meant by underflow in floating point.', 1, 'A result too close to zero to be represented'],
        ['Explain how the exponent size affects the risk of underflow.', 1, 'More exponent bits allow more negative exponents, so smaller numbers can be stored']
      ]);
    }
  ]);

  /* =============================== 1.4.2 Data structures =============================== */
  function bstBuild(keys) { var root = null; function ins(n, k) { if (!n) return { k: k, l: null, r: null }; if (k < n.k) n.l = ins(n.l, k); else n.r = ins(n.r, k); return n; } keys.forEach(function (k) { root = ins(root, k); }); return root; }
  function trav(n, kind, out) { if (!n) return out; if (kind === 'pre') out.push(n.k); trav(n.l, kind, out); if (kind === 'in') out.push(n.k); trav(n.r, kind, out); if (kind === 'post') out.push(n.k); return out; }
  T({ id: 'cs-data-structures', name: 'Data structures: stacks, queues, lists, trees, graphs and hash tables', video: 'OCR A level computer science stacks queues linked lists binary trees', gens: [
    { d: [1], f: function () {
      var st = [], ops = [], popped = [], v = 10;
      for (var i = 0; i < 7; i++) { if (st.length && Math.random() < 0.4) { popped.push(st.pop()); ops.push('pop()'); } else { v += ri(1, 9); st.push(v); ops.push('push(' + v + ')'); } }
      return Q('An empty stack has these operations applied: ' + ops.join(', ') + '.', [
        ['State the values popped, in order.', 2, popped.length ? popped.join(', ') : 'None'],
        ['State the contents of the stack, from bottom to top.', 2, st.length ? st.join(', ') : 'Empty'],
        ['State one use of a stack.', 1, 'Storing return addresses for subroutine calls; undo; evaluating expressions']
      ]);
    } },
    { d: [1, 2], f: function () {
      var size = 6, q = [], front = 0, rear = -1, count = 0, ops = [], out = [], v = 1;
      for (var i = 0; i < 9; i++) { if (count && (Math.random() < 0.35 || count === size)) { out.push(q[front]); q[front] = undefined; front = (front + 1) % size; count--; ops.push('dequeue'); } else { rear = (rear + 1) % size; v += ri(1, 5); q[rear] = v; count++; ops.push('enqueue ' + v); } }
      return Q('A circular queue is stored in an array of size 6 (indexes 0–5). Front starts at 0 and rear at −1. The operations are: ' + ops.join(', ') + '.', [
        ['State the values dequeued.', 2, out.length ? out.join(', ') : 'None'],
        ['State the final front and rear pointers.', 2, 'Front ' + front + ', rear ' + rear],
        ['Explain why a circular queue is used instead of a linear one.', 1, 'Spaces freed at the front can be reused']
      ]);
    } },
    { d: [2], f: function () {
      var keys = []; while (keys.length < 7) { var k = ri(10, 90); if (keys.indexOf(k) < 0) keys.push(k); }
      var t = bstBuild(keys);
      return Q('The values ' + keys.join(', ') + ' are inserted in order into an empty binary search tree.', [
        ['Give the pre-order traversal.', 2, trav(t, 'pre', []).join(', ')],
        ['Give the in-order traversal.', 1, trav(t, 'in', []).join(', ')],
        ['Give the post-order traversal.', 2, trav(t, 'post', []).join(', ')]
      ]);
    } },
    { d: [1, 2], f: function () {
      var nm = some(['Ash', 'Bea', 'Cal', 'Dee', 'Eli', 'Fay'], 4).sort();
      var ins = pick(['Ava', 'Bob', 'Col', 'Dan', 'Eve']);
      var all = nm.concat([ins]).sort();
      return Q('A linked list holds the names ' + nm.join(', ') + ' in alphabetical order. Each node has a data field and a pointer.', [
        ['Describe how ' + ins + ' is inserted in the correct place.', 3, 'Store ' + ins + ' in a free node; traverse from the start pointer to find the node before it; set ' + ins + '’s pointer to that node’s pointer, then point that node to ' + ins + ' (or update the start pointer if first)'],
        ['State the new order.', 1, all.join(', ')],
        ['Give one advantage of a linked list over an array.', 1, 'Items can be inserted or removed without shifting other items']
      ]);
    } },
    { d: [2, 3], f: function () {
      var n = 4, m = [], e = [];
      for (var i = 0; i < n; i++) { m.push([]); for (var j = 0; j < n; j++) m[i].push(0); }
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) if (j === i + 1 || Math.random() < 0.4) { m[i][j] = m[j][i] = 1; }
      var adj = m.map(function (r, i) { return 'ABCD'[i] + ': ' + r.map(function (x, j) { return x ? 'ABCD'[j] : ''; }).filter(Boolean).join(', '); });
      return Q('An undirected graph has adjacency matrix' + table(['', 'A', 'B', 'C', 'D'], m.map(function (r, i) { return ['ABCD'[i]].concat(r); })), [
        ['Write the adjacency list.', 2, adj.join('; ')],
        ['Explain when an adjacency list is better than a matrix.', 2, 'For sparse graphs it uses less memory'],
        ['Explain why the matrix is symmetrical.', 1, 'The graph is undirected']
      ]);
    } }
  ] });
  X('cs-data-structures', [
    function () {
      var keys = []; while (keys.length < 6) { var k = ri(10, 90); if (keys.indexOf(k) < 0) keys.push(k); }
      var root = keys[0];
      return Q('Deleting from a binary search tree built from ' + keys.join(', ') + '.', [
        ['Describe how to delete the root, ' + root + ', so the tree stays a BST.', 3, 'Replace it by its in-order successor (smallest value in the right subtree) or predecessor, then delete that node from its old position'],
        ['Give the in-order traversal after deleting ' + root + '.', 1, keys.slice(1).sort(function (a, b) { return a - b; }).join(', ')]
      ]);
    },
    function () {
      return Q('Write pseudocode for push and pop on a stack held in an array ' + ic('stack[0..9]') + ' with pointer ' + ic('top') + ' (−1 when empty).', [
        ['Write the push procedure, checking for overflow.', 3, code(['procedure push(item)', '  if top == 9 then', '    print("Stack full")', '  else', '    top = top + 1', '    stack[top] = item', '  endif', 'endprocedure'])],
        ['Write the pop function, checking for underflow.', 3, code(['function pop()', '  if top == -1 then', '    print("Stack empty")', '    return -1', '  else', '    top = top - 1', '    return stack[top + 1]', '  endif', 'endfunction'])]
      ]);
    },
    function () {
      return Q('Choosing data structures.', [
        ['Choose a structure for a printer’s jobs, a browser’s back button and a road map, with reasons.', 3, 'Queue (first in, first out); stack (last visited first); graph (junctions and roads)'],
        ['Explain the difference between static and dynamic data structures.', 2, 'Static has a fixed size set in advance; dynamic grows and shrinks as needed, using memory from the heap']
      ]);
    },
    function () {
      return Q('Tuples, records and arrays.', [
        ['Explain the difference between a list and a tuple.', 1, 'A tuple is immutable; a list can be changed'],
        ['Explain the difference between an array and a record.', 2, 'An array holds items of one type accessed by index; a record holds named fields of different types'],
        ['A 2D array ' + ic('grid[5, 8]') + ' stores integers. How many elements does it have?', 1, 40]
      ]);
    },
    function () {
      var n = 7, kk = []; while (kk.length < 5) { var k = ri(10, 60); if (kk.indexOf(k) < 0) kk.push(k); }
      return Q('Hash table with chaining. Keys ' + kk.join(', ') + ' use ' + ic('key MOD ' + n) + '.', [
        ['Show which keys are stored at each index.', 3, (function () { var t = {}; kk.forEach(function (k) { (t[k % n] = t[k % n] || []).push(k); }); return Object.keys(t).sort(function (a, b) { return a - b; }).map(function (i) { return i + ': ' + t[i].join(' → '); }).join('; '); })()],
        ['Compare chaining with linear probing.', 2, 'Chaining stores collisions in a list at the index, so the table never fills; probing keeps everything in the array but causes clustering']
      ]);
    }
  ]);

  /* =============================== 1.4.3 Boolean algebra =============================== */
  var VARS = ['A', 'B', 'C', 'D'];
  function sop(v, ones) {
    /* minimal sum of products by brute force over implicants */
    var N = 1 << v, terms = [];
    if (!ones.length) return '0'; if (ones.length === N) return '1';
    (function gen(i, t) { if (i === v) { if (t.some(function (x) { return x !== 2; })) terms.push(t.slice()); return; } for (var s = 0; s < 3; s++) { t[i] = s; gen(i + 1, t); } })(0, []);
    function cov(t) { var c = []; for (var m = 0; m < N; m++) { var ok = true; for (var i = 0; i < v; i++) { var b = (m >> (v - 1 - i)) & 1; if (t[i] !== 2 && t[i] !== b) ok = false; } if (ok) c.push(m); } return c; }
    var imp = terms.map(function (t) { return { t: t, c: cov(t), lits: t.filter(function (x) { return x !== 2; }).length }; }).filter(function (x) { return x.c.every(function (m) { return ones.indexOf(m) >= 0; }); });
    imp = imp.filter(function (a) { return !imp.some(function (b) { return b !== a && b.c.length > a.c.length && a.c.every(function (m) { return b.c.indexOf(m) >= 0; }); }); });
    var best = null;
    for (var size = 1; size <= 5 && !best; size++) {
      (function comb(start, chosen) {
        if (chosen.length === size) {
          var cv = {}; chosen.forEach(function (x) { x.c.forEach(function (m) { cv[m] = 1; }); });
          if (ones.every(function (m) { return cv[m]; })) { var lit = sum(chosen.map(function (x) { return x.lits; })); if (!best || lit < best.lit) { best = chosen.slice(); best.lit = lit; } }
          return;
        }
        for (var i = start; i < imp.length; i++) { chosen.push(imp[i]); comb(i + 1, chosen); chosen.pop(); }
      })(0, []);
    }
    if (!best) return null;
    return best.map(function (x) { var p = []; x.t.forEach(function (s, i) { if (s === 1) p.push(VARS[i]); else if (s === 0) p.push('\\neg ' + VARS[i]); }); return p.join(' \\wedge '); }).map(function (s, _, arr) { return arr.length > 1 && s.indexOf('\\wedge') >= 0 ? '(' + s + ')' : s; }).join(' \\vee ');
  }
  function randExpr(depth) {
    if (depth === 0 || Math.random() < 0.25) { var v = pick(['A', 'B', 'C']); return Math.random() < 0.3 ? { op: 'NOT', a: { v: v } } : { v: v }; }
    var op = pick(['AND', 'OR', 'XOR']); return { op: op, a: randExpr(depth - 1), b: randExpr(depth - 1) };
  }
  function ev(e, env) { if (e.v) return env[e.v]; if (e.op === 'NOT') return 1 - ev(e.a, env); var a = ev(e.a, env), b = ev(e.b, env); return e.op === 'AND' ? a & b : e.op === 'OR' ? a | b : a ^ b; }
  function show(e, top) { if (e.v) return e.v; if (e.op === 'NOT') return '\\neg ' + show(e.a); var s = show(e.a) + (e.op === 'AND' ? ' \\wedge ' : e.op === 'OR' ? ' \\vee ' : ' \\veebar ') + show(e.b); return top ? s : '(' + s + ')'; }
  var LAWS = [
    ['A \\wedge (A \\vee B)', 'A', 'absorption'], ['A \\vee (A \\wedge B)', 'A', 'absorption'], ['\\neg(\\neg A \\wedge \\neg B)', 'A \\vee B', 'De Morgan, then double negation'],
    ['(A \\wedge B) \\vee (A \\wedge \\neg B)', 'A', 'distribution, then a variable OR its complement is 1'], ['\\neg(A \\vee B) \\vee (\\neg A \\wedge B)', '\\neg A', 'De Morgan, then distribution'],
    ['(A \\wedge \\neg A) \\vee B', 'B', 'a variable AND its complement is 0'], ['(A \\vee B) \\wedge (A \\vee \\neg B)', 'A', 'distribution'], ['\\neg(A \\wedge \\neg B) \\wedge A', 'A \\wedge B', 'De Morgan, then distribution']];
  T({ id: 'cs-boolean', name: 'Boolean algebra, Karnaugh maps and logic circuits', video: 'OCR A level computer science karnaugh maps boolean algebra', gens: [
    { d: [1, 2], f: function () {
      var e; do { e = randExpr(2); } while (!e.op || e.op === 'NOT');
      var rows = []; for (var m = 0; m < 8; m++) { var env = { A: m >> 2 & 1, B: m >> 1 & 1, C: m & 1 }; rows.push([env.A, env.B, env.C, ev(e, env)]); }
      return Q('Complete the truth table for ' + M('Q = ' + show(e, true)) + ' (' + M('\\veebar') + ' is XOR).', [
        ['Give the output column Q for inputs 000 to 111.', 4, rows.map(function (r) { return r[3]; }).join(', ')]
      ]);
    } },
    { d: [1, 2], f: function () {
      var L = pick(LAWS);
      return Q('Simplify ' + M(L[0]) + '.', [
        ['Simplify, naming the laws used.', 3, M(L[1]) + ' (' + L[2] + ')']
      ]);
    } },
    { d: [2], f: function () {
      var ones, r; do { ones = []; for (var m = 0; m < 8; m++) if (Math.random() < 0.45) ones.push(m); if (ones.length < 2) ones = [1, 3, 5]; if (ones.length > 6) ones = ones.slice(0, 5); r = sop(3, ones); } while (!r);
      return Q('A function of A, B and C is 1 for the input combinations (ABC) ' + ones.map(function (m) { return bin(m, 3); }).join(', ') + ' and 0 otherwise.', [
        ['Use a Karnaugh map to find a minimal sum-of-products expression.', 4, 'One minimal form: ' + M(r)]
      ]);
    } },
    { d: [1, 2], f: function () {
      var a = ri(0, 1), b = ri(0, 1), c = ri(0, 1), s = a ^ b ^ c, co = (a & b) | (c & (a ^ b));
      return Q('A full adder has inputs A = ' + a + ', B = ' + b + ' and carry in = ' + c + '.', [
        ['State the sum and carry out.', 2, 'Sum ' + s + ', carry ' + co],
        ['Give the Boolean expressions for a half adder’s outputs.', 2, 'Sum ' + M('A \\veebar B') + ', carry ' + M('A \\wedge B')],
        ['Explain how full adders are combined to add 4-bit numbers.', 1, 'Chain four full adders, passing each carry out to the next carry in']
      ]);
    } },
    { d: [2, 3], f: function () {
      var ds = []; for (var i = 0; i < 6; i++) ds.push(ri(0, 1));
      return Q('A D-type flip-flop starts with Q = 0. At each rising clock edge, D has the values ' + ds.join(', ') + '.', [
        ['State Q after each clock edge.', 2, ds.join(', ')],
        ['Explain the purpose of a D-type flip-flop.', 1, 'Stores one bit, changing only on the clock edge'],
        ['Explain how flip-flops are used in registers.', 1, 'A register is a group of flip-flops sharing a clock, storing several bits']
      ]);
    } }
  ] });
  X('cs-boolean', [
    function () {
      var ones, r; do { ones = []; for (var m = 0; m < 16; m++) if (Math.random() < 0.4) ones.push(m); if (ones.length < 3) ones = [0, 2, 8, 10]; if (ones.length > 9) ones = ones.slice(0, 8); r = sop(4, ones); } while (!r);
      return Q('A function of A, B, C and D is 1 for minterms (ABCD) ' + ones.map(function (m) { return bin(m, 4); }).join(', ') + '.', [
        ['Use a 4-variable Karnaugh map to find a minimal sum of products.', 5, 'One minimal form: ' + M(r)],
        ['Explain why Karnaugh map columns are labelled 00, 01, 11, 10.', 1, 'Gray code: adjacent cells differ by one bit, so groups show eliminable variables']
      ]);
    },
    function () {
      return Q('Prove ' + M('(A \\vee B) \\wedge (A \\vee C) = A \\vee (B \\wedge C)') + '.', [
        ['Prove it using Boolean laws.', 3, 'Expand: ' + M('A \\vee (A \\wedge C) \\vee (A \\wedge B) \\vee (B \\wedge C)') + '; absorption gives ' + M('A \\vee (B \\wedge C)')],
        ['Verify with a truth table for the row A = 0, B = 1, C = 0.', 1, 'Both sides are 0']
      ]);
    },
    function () {
      var e, ones; do { e = randExpr(2); ones = []; for (var m = 0; m < 8; m++) { if (ev(e, { A: m >> 2 & 1, B: m >> 1 & 1, C: m & 1 })) ones.push(m); } } while (!e.op || e.op === 'NOT' || !sop(3, ones));
      return Q('Simplify ' + M('Q = ' + show(e, true)) + ' (' + M('\\veebar') + ' is XOR).', [
        ['Write the truth table output for 000 to 111.', 2, [0, 1, 2, 3, 4, 5, 6, 7].map(function (m) { return ones.indexOf(m) >= 0 ? 1 : 0; }).join(', ')],
        ['Find a minimal sum-of-products form using AND, OR and NOT.', 3, 'One minimal form: ' + M(sop(3, ones))]
      ]);
    },
    function () {
      return Q('Universal gates.', [
        ['Show how to make NOT A using only a NAND gate.', 1, 'Connect A to both inputs: ' + M('\\neg(A \\wedge A) = \\neg A')],
        ['Show how to make A AND B using only NAND gates.', 2, 'NAND A and B, then NAND the result with itself'],
        ['Why are NAND gates useful to chip manufacturers?', 1, 'Any circuit can be built from one type of gate']
      ]);
    },
    function () {
      return Q('Design a circuit for a majority vote of three inputs A, B and C (output 1 when at least two inputs are 1).', [
        ['Write a Boolean expression.', 3, M('(A \\wedge B) \\vee (A \\wedge C) \\vee (B \\wedge C)')],
        ['Explain why this is the same as the carry out of a full adder.', 1, 'The carry is 1 exactly when at least two of the three inputs are 1']
      ]);
    }
  ]);

  /* =============================== 1.5 Legal, moral, cultural and ethical =============================== */
  var CASES = [
    ['A student guesses a teacher’s password and changes their marks.', 'Computer Misuse Act 1990', 'unauthorised access with intent to commit a further offence, and unauthorised modification'],
    ['A shop sells customer email addresses without consent.', 'Data Protection Act 2018', 'personal data processed without a lawful basis'],
    ['A website copies a photographer’s images without permission.', 'Copyright, Designs and Patents Act 1988', 'copying a protected work'],
    ['Police ask an internet provider to intercept a suspect’s messages.', 'Regulation of Investigatory Powers Act 2000', 'it governs lawful interception and surveillance'],
    ['A company keeps CVs of unsuccessful applicants for ten years.', 'Data Protection Act 2018', 'data kept longer than necessary'],
    ['Someone writes and spreads a virus.', 'Computer Misuse Act 1990', 'unauthorised modification of computer material'],
    ['A developer sells cracked copies of a game.', 'Copyright, Designs and Patents Act 1988', 'distributing copies without permission']];
  T({ id: 'cs-legal', name: 'Computing legislation and ethical issues', video: 'OCR A level computer science computer misuse act data protection act', gens: [
    { d: [1, 2], f: function () {
      var cs = some(CASES, 3);
      return Q('Identify the law broken or used in each case.', cs.map(function (c) { return [c[0], 2, c[1] + ': ' + c[2]]; }));
    } },
    { d: [2, 3], f: function () {
      var t = pick(['automated decision making in job applications', 'facial recognition cameras in shops', 'monitoring employees’ emails', 'driverless cars', 'social media algorithms that choose what users see']);
      return Q('Discuss the ethical issues raised by ' + t + '.', [
        ['Discuss benefits and drawbacks, reaching a conclusion.', 9, 'Points might include efficiency, safety and convenience against privacy, bias in data, accountability for mistakes, transparency and consent; the conclusion should weigh these']
      ]);
    } },
    { d: [1], f: function () {
      return Q('Principles of the Data Protection Act.', [
        ['State three principles of data protection.', 3, 'Processed lawfully, fairly and transparently; collected for specified purposes; adequate and limited; accurate; kept no longer than necessary; kept secure'],
        ['State two rights a data subject has.', 2, 'To access their data; to have it corrected; to have it erased; to object to processing']
      ]);
    } },
    { d: [2], f: function () {
      return Q('Environmental and cultural effects.', [
        ['Discuss two environmental effects of computing.', 4, 'Energy use of data centres; e-waste containing toxic metals; mining of rare materials; but also reduced travel and smarter energy use'],
        ['Explain what is meant by the digital divide.', 2, 'The gap between those with and without access to technology and the skills to use it']
      ]);
    } },
    { d: [2, 3], f: function () {
      return Q('Artificial intelligence and accountability.', [
        ['A medical AI system recommends a wrong treatment. Discuss who should be held responsible.', 4, 'Developers, the hospital, the clinician who acted, or the data providers; issues of transparency and the need for human oversight'],
        ['Explain how bias can enter a machine learning system.', 2, 'Training data that under-represents groups or reflects past unfairness']
      ]);
    } }
  ] });
  X('cs-legal', [
    function () {
      return Q('The Computer Misuse Act sections.', [
        ['Describe the three main offences in the Computer Misuse Act 1990.', 3, 'Unauthorised access to computer material; unauthorised access with intent to commit further offences; unauthorised acts intended to impair operation (modification)'],
        ['Explain why ethical hackers must have written permission.', 1, 'Without authorisation the same activity is an offence']
      ]);
    },
    function () {
      return Q('Censorship and the internet.', [
        ['Discuss whether governments should be able to block websites.', 6, 'Protecting citizens from harmful or illegal content against freedom of speech, risk of abuse of power, and ease of bypassing blocks with VPNs'],
        ['Explain how encryption complicates surveillance laws.', 2, 'End-to-end encrypted messages cannot be read even if intercepted']
      ]);
    },
    function () {
      return Q('Layout, health and safety, and accessibility.', [
        ['Explain how software can be designed for accessibility.', 3, 'Screen-reader support, alt text, adjustable text size and contrast, keyboard navigation, captions'],
        ['Explain why accessibility is an ethical as well as legal issue.', 1, 'Excluding users denies them equal access to services']
      ]);
    },
    function () {
      return Q('Copyright and software licences.', [
        ['Explain the difference between copyright and a software licence.', 2, 'Copyright protects the work automatically; a licence grants specific permissions to use it'],
        ['Explain what Creative Commons licences allow.', 1, 'Creators let others share or adapt their work under stated conditions']
      ]);
    },
    function () {
      return Q('Automation and employment.', [
        ['Discuss the impact of automation on employment.', 6, 'Loss of routine jobs against creation of new skilled roles; productivity gains; the need for retraining; unequal effects across regions']
      ]);
    }
  ]);

  /* ---------------- Reasoning statements ---------------- */
  Cn('cs-processor', [
    ['T', Sr`The program counter holds the address of the next instruction to be fetched.`, Sr`It is incremented during the fetch stage.`],
    ['F', Sr`Doubling the clock speed always halves the run time.`, Sr`Memory access and other bottlenecks do not speed up.`],
    ['S', Sr`Adding more cores makes a program run faster.`, Sr`Only if the program can be split into parallel tasks.`],
    ['A', Sr`The MAR holds an address, not data.`, Sr`It holds the address being read from or written to.`]
  ]);
  Cn('cs-storage', [
    ['T', Sr`RAM is volatile.`, Sr`Its contents are lost when power is removed.`],
    ['F', Sr`Virtual memory makes a computer faster.`, Sr`It lets more programs run, but secondary storage is slower than RAM.`],
    ['S', Sr`An SSD is a better choice than a hard disk.`, Sr`It is faster and more robust, but costs more per GB.`]
  ]);
  Cn('cs-os', [
    ['T', Sr`Round robin gives each process a fixed time slice in turn.`, Sr`Unfinished processes return to the back of the queue.`],
    ['F', Sr`Pages and segments are both fixed in size.`, Sr`Segments vary in size.`],
    ['S', Sr`Shortest job first gives the lowest average waiting time.`, Sr`Only when all jobs are available together and their lengths are known.`]
  ]);
  Cn('cs-translators', [
    ['T', Sr`A compiler produces an executable that runs without the compiler.`, Sr`The whole program is translated once.`],
    ['F', Sr`An interpreter produces an executable file.`, Sr`It translates and runs each line every time.`],
    ['A', Sr`Lexical analysis removes comments and whitespace.`, Sr`They are not needed in the token stream.`]
  ]);
  Cn('cs-lmc', [
    ['T', Sr`In immediate addressing, the operand is the value itself.`, Sr`No memory lookup is needed.`],
    ['F', Sr`BRP branches only if the accumulator is greater than zero.`, Sr`It also branches on zero.`],
    ['A', Sr`Indirect addressing needs at least two memory accesses.`, Sr`One to find the address, one for the data.`]
  ]);
  Cn('cs-softdev', [
    ['T', Sr`Boundary data tests values at the edges of the valid range.`, Sr`Errors with < and ≤ show up there.`],
    ['F', Sr`Black box testing needs knowledge of the code.`, Sr`It only checks inputs and outputs.`],
    ['S', Sr`Agile development produces less documentation than waterfall.`, Sr`Usually, though documentation can still be kept.`]
  ]);
  Cn('cs-exchange', [
    ['T', Sr`Lossless compression allows the original file to be rebuilt exactly.`, Sr`No data is removed.`],
    ['F', Sr`Hashing can be reversed with the key.`, Sr`Hashes are one-way.`],
    ['S', Sr`Run length encoding reduces file size.`, Sr`Only when the data has long runs.`]
  ]);
  Cn('cs-databases', [
    ['T', Sr`A foreign key links to a primary key in another table.`, Sr`That is how relationships are made.`],
    ['F', Sr`A table in 2NF must be in 3NF.`, Sr`3NF also removes non-key dependencies.`],
    ['A', Sr`A primary key value is unique in its table.`, Sr`It identifies each record.`]
  ]);
  Cn('cs-networks', [
    ['T', Sr`TCP guarantees packets are reassembled in order.`, Sr`It uses sequence numbers and acknowledgements.`],
    ['F', Sr`A router forwards data using MAC addresses between networks.`, Sr`Routers use IP addresses.`],
    ['S', Sr`Packets from one file take the same route.`, Sr`Routes depend on traffic.`]
  ]);
  Cn('cs-web', [
    ['T', Sr`A page with many inbound links from high-ranking pages gets a high PageRank.`, Sr`Rank flows along links.`],
    ['F', Sr`Client-side validation is enough to keep a website secure.`, Sr`It can be bypassed.`],
    ['A', Sr`CSS controls presentation, HTML controls structure.`, Sr`Separating them makes changes easier.`]
  ]);
  Cn('cs-data-types', [
    ['T', Sr`In two’s complement the most significant bit has a negative place value.`, Sr`For 8 bits it is \(-128\).`],
    ['F', Sr`Sign and magnitude has only one representation of zero.`, Sr`It has +0 and −0.`],
    ['S', Sr`A logical shift left by one doubles a number.`, Sr`Only if no 1 is shifted out.`]
  ]);
  Cn('cs-float', [
    ['T', Sr`A normalised positive mantissa starts 01.`, Sr`Leading bits differ.`],
    ['F', Sr`More mantissa bits increase the range.`, Sr`They increase precision; exponent bits increase range.`],
    ['S', Sr`A denary fraction can be stored exactly in binary floating point.`, Sr`Only if its denominator is a power of 2 and it fits.`]
  ]);
  Cn('cs-data-structures', [
    ['T', Sr`A stack is last in, first out.`, Sr`Items are removed from the top.`],
    ['F', Sr`An in-order traversal of any binary tree gives sorted output.`, Sr`Only for a binary search tree.`],
    ['A', Sr`A hash table may have collisions.`, Sr`Different keys can hash to the same index.`]
  ]);
  Cn('cs-boolean', [
    ['T', Sr`\(\neg(A \wedge B) = \neg A \vee \neg B\).`, Sr`De Morgan’s law.`],
    ['F', Sr`\(A \vee (A \wedge B) = A \wedge B\).`, Sr`By absorption it equals \(A\).`],
    ['N', Sr`\(A \wedge \neg A = 1\).`, Sr`It is always 0.`]
  ]);
  Cn('cs-legal', [
    ['T', Sr`Accessing a computer without permission is an offence even if nothing is changed.`, Sr`Section 1 of the Computer Misuse Act.`],
    ['F', Sr`Copyright must be registered to apply.`, Sr`It applies automatically in the UK.`],
    ['S', Sr`An organisation may share personal data with others.`, Sr`Only with a lawful basis, such as consent.`]
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
