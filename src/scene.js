/* The Market of Thought: one big illustration, built as SVG.
   Scene is 2800 x 1500. Left = the build-out and the price plunge (today),
   middle = railroads and telecom (history), right = the lantern market and
   the hospital (what comes next). */
(function () {
  function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var R = rng(17);
  var C = {
    ink: '#26203F', cream: '#FFF4E2', paper: '#FFF9EE', red: '#E8402A', redD: '#B92A1E',
    mus: '#F4B63F', lime: '#C9E25A', cyan: '#63CDE6', ice: '#C8F1F8', pink: '#F49CB7',
    lilac: '#B9A6EA', vio: '#6A5FC1', vioD: '#463D8F', peach: '#FFC9A8', mint: '#8FD6B4',
    brown: '#8A5A44', clay: '#D9A3C7', road: '#3B345E'
  };
  var F = "font-family=\"'Dela Gothic One','Arial Black',sans-serif\"";
  var M = "font-family=\"'IBM Plex Mono',ui-monospace,monospace\"";
  var out = [];
  function a(s) { out.push(s); }
  function txt(x, y, s, size, fill, extra) {
    return '<text x="' + x + '" y="' + y + '" ' + F + ' font-size="' + size + '" fill="' + fill + '" ' + (extra || '') + '>' + s + '</text>';
  }
  function mono(x, y, s, size, fill, extra) {
    return '<text x="' + x + '" y="' + y + '" ' + M + ' font-weight="600" font-size="' + size + '" fill="' + fill + '" letter-spacing="1" ' + (extra || '') + '>' + s + '</text>';
  }
  function person(x, y, body, opts) {
    opts = opts || {};
    var s = opts.s || 1, skin = opts.skin || '#F2C6A0', g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">';
    g += '<line x1="-6" y1="0" x2="-7" y2="-26" stroke="' + C.ink + '" stroke-width="5" stroke-linecap="round"/>';
    g += '<line x1="6" y1="0" x2="7" y2="-26" stroke="' + C.ink + '" stroke-width="5" stroke-linecap="round"/>';
    g += '<rect x="-14" y="-62" width="28" height="40" rx="12" fill="' + body + '" stroke="' + C.ink + '" stroke-width="2"/>';
    if (opts.armsUp) {
      g += '<path d="M-12 -55 L-24 -82 M12 -55 L24 -82" stroke="' + body + '" stroke-width="7" stroke-linecap="round"/>';
      g += '<path d="M-12 -55 L-24 -82 M12 -55 L24 -82" stroke="' + C.ink + '" stroke-width="1.5" stroke-linecap="round" fill="none" opacity=".6"/>';
    }
    g += '<circle cx="0" cy="-74" r="12" fill="' + skin + '" stroke="' + C.ink + '" stroke-width="2"/>';
    g += '<path d="M-12 -78 Q0 -94 12 -78 Q6 -84 0 -84 Q-6 -84 -12 -78Z" fill="' + C.ink + '"/>';
    if (opts.hat) g += '<path d="M-26 -78 L0 -100 L26 -78 Z" fill="#F3DFA2" stroke="' + C.ink + '" stroke-width="2" stroke-linejoin="round"/>';
    g += '<circle cx="-4" cy="-73" r="1.6" fill="' + C.ink + '"/><circle cx="4" cy="-73" r="1.6" fill="' + C.ink + '"/>';
    g += '<path d="M-4 -67 Q0 -' + (opts.happy ? '63' : '66') + ' 4 -67" stroke="' + C.ink + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
    return g + '</g>';
  }
  function cloud(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" class="cloud">' +
      '<ellipse cx="0" cy="26" rx="92" ry="10" fill="#E9A9C6" opacity=".35"/>' +
      '<rect x="-92" y="-8" width="184" height="34" rx="17" fill="#FFF3F6"/>' +
      '<circle cx="-42" cy="-10" r="30" fill="#FFF3F6"/><circle cx="10" cy="-24" r="40" fill="#FFF3F6"/><circle cx="58" cy="-4" r="26" fill="#FFF3F6"/>' +
      '<path d="M-60 -18 Q-46 -36 -26 -34" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>';
  }
  function windows(x0, y0, cols, rows, dx, dy, w, h, fills, cls) {
    var s = '';
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var f = fills[Math.floor(R() * fills.length)];
      var k = cls && R() < 0.35 ? ' class="' + cls + '" style="animation-delay:' + (R() * 3).toFixed(2) + 's"' : '';
      s += '<rect x="' + (x0 + c * dx) + '" y="' + (y0 + r * dy) + '" width="' + w + '" height="' + h + '" rx="3" fill="' + f + '"' + k + '/>';
    }
    return s;
  }
  function awning(x, y, w, h, c1, c2) {
    var n = Math.max(3, Math.round(w / 36)), sw = w / n, s = '';
    for (var i = 0; i < n; i++) {
      var col = i % 2 ? c2 : c1, xi = x + i * sw;
      s += '<path d="M' + xi + ' ' + y + ' H' + (xi + sw) + ' V' + (y + h) + ' A' + (sw / 2) + ' ' + (sw / 2.4) + ' 0 0 1 ' + xi + ' ' + (y + h) + ' Z" fill="' + col + '"/>';
    }
    return s + '<rect x="' + x + '" y="' + (y - 6) + '" width="' + w + '" height="8" rx="3" fill="' + C.ink + '"/>';
  }
  function lattice(x, y1, y2, w, col) {
    var s = '<rect x="' + x + '" y="' + y1 + '" width="' + w + '" height="' + (y2 - y1) + '" fill="none" stroke="' + col + '" stroke-width="5"/>';
    var p = 'M' + x + ' ' + y1;
    for (var y = y1, k = 0; y < y2; y += w, k++) p += ' L' + (k % 2 ? x : x + w) + ' ' + (y + w);
    return s + '<path d="' + p + '" stroke="' + col + '" stroke-width="3" fill="none"/>';
  }
  function catenary(x1, y1, x2, y2, sag) {
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + sag;
    return 'M' + x1 + ' ' + y1 + ' Q' + mx + ' ' + (my + sag) + ' ' + x2 + ' ' + y2;
  }
  function onCurve(x1, y1, x2, y2, sag, t) {
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + 2 * sag;
    var x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2;
    var y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * my + t * t * y2;
    return [x, y];
  }

  /* ---------- defs ---------- */
  a('<defs>' +
    '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A898E4"/><stop offset=".42" stop-color="#E7B6D6"/><stop offset=".72" stop-color="#FFD9B8"/><stop offset="1" stop-color="#FFE9CC"/></linearGradient>' +
    '<radialGradient id="sunG"><stop offset="0" stop-color="#FFE07A"/><stop offset=".55" stop-color="#FFB45E"/><stop offset="1" stop-color="#FF8F6B" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="glow"><stop offset="0" stop-color="#FFE68A" stop-opacity=".95"/><stop offset="1" stop-color="#FFE68A" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="goldGlow"><stop offset="0" stop-color="#FFF0A0" stop-opacity=".9"/><stop offset="1" stop-color="#FFC94A" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="ice" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6FBFF"/><stop offset="1" stop-color="#9FE2F0"/></linearGradient>' +
    '<path id="flyPath" d="M1450 1010 m-122 0 a122 122 0 1 1 244 0 a122 122 0 1 1 -244 0"/>' +
    '</defs>');

  /* ---------- sky, sun, clouds ---------- */
  a('<rect x="0" y="0" width="2800" height="1500" fill="url(#sky)"/>');
  a('<circle cx="2600" cy="400" r="330" fill="url(#sunG)" opacity=".85"/>');
  a('<circle cx="2600" cy="400" r="150" fill="#FFC164"/><circle cx="2600" cy="400" r="190" fill="none" stroke="#FFC164" stroke-width="3" opacity=".6"/><circle cx="2600" cy="400" r="232" fill="none" stroke="#FFC164" stroke-width="2" opacity=".35"/>');
  // pencil swooshes (Hiraoka-style loose lines)
  a('<g fill="none" stroke="' + C.ink + '" stroke-width="1.6" stroke-linecap="round" opacity=".22">' +
    '<path d="M40 70 C 300 20, 520 140, 860 60"/><path d="M70 92 C 330 48, 560 150, 880 84"/>' +
    '<path d="M1080 600 C 1300 520, 1520 660, 1760 560"/><path d="M1700 470 C 1900 430, 2050 520, 2200 460"/>' +
    '<path d="M260 980 C 360 940, 420 1000, 520 960"/></g>');
  a(cloud(330, 150, 1.15) + cloud(1060, 440, 0.8) + cloud(1660, 640, 0.7) + cloud(2230, 470, 0.75) + cloud(820, 300, 0.6));

  /* ---------- far skyline ---------- */
  var sk = '<g opacity=".55">';
  for (var x = -20; x < 2820;) {
    var w = 40 + Math.floor(R() * 60), h = 130 + Math.floor(R() * 280);
    var col = R() < 0.5 ? '#A796DD' : '#B7A2E0';
    sk += R() < 0.2 ? '<path d="M' + x + ' 1290 V' + (1290 - h + w / 2) + ' A' + (w / 2) + ' ' + (w / 2) + ' 0 0 1 ' + (x + w) + ' ' + (1290 - h + w / 2) + ' V1290Z" fill="' + col + '"/>'
      : '<rect x="' + x + '" y="' + (1290 - h) + '" width="' + w + '" height="' + h + '" fill="' + col + '"/>';
    x += w + Math.floor(R() * 10);
  }
  a(sk + '</g>');

  /* ---------- price-tag flock (Lallaoui fish, but tags) ---------- */
  var fl = '<g class="flock">';
  for (var i = 0; i < 80; i++) {
    var t = R(), fx = 520 + t * 1320, fy = 420 + Math.sin(t * 7) * 110 - t * 160 + (R() - 0.5) * 110, rot = -30 + R() * 60, sc = 0.6 + R() * 0.9;
    var fc = [C.red, C.pink, C.mus, C.red, C.paper][Math.floor(R() * 5)];
    fl += '<g transform="translate(' + fx.toFixed(1) + ' ' + fy.toFixed(1) + ') rotate(' + rot.toFixed(0) + ') scale(' + sc.toFixed(2) + ')"><path d="M-9 -5 H6 L11 0 L6 5 H-9 Z" fill="' + fc + '" stroke="' + C.ink + '" stroke-width=".8"/><circle cx="5" cy="0" r="1.4" fill="' + C.ink + '"/></g>';
  }
  a(fl + '</g>');

  /* ---------- ground: sidewalk, road, grass ---------- */
  a('<rect x="0" y="1290" width="2800" height="34" fill="#F3D9BE"/><rect x="0" y="1320" width="2800" height="5" fill="' + C.ink + '" opacity=".5"/>');
  a('<rect x="0" y="1325" width="2800" height="110" fill="' + C.road + '"/>');
  var dash = ''; for (var dx = 20; dx < 2800; dx += 90) dash += '<rect x="' + dx + '" y="1376" width="46" height="7" rx="3" fill="' + C.cream + '" opacity=".85"/>';
  a(dash);
  a('<rect x="0" y="1435" width="2800" height="65" fill="' + C.mint + '"/>');
  var tuft = ''; for (var gx = 10; gx < 2800; gx += 38 + R() * 30) tuft += '<path d="M' + gx.toFixed(0) + ' 1462 l6 -14 l4 12 l6 -16 l3 18" stroke="#5DAF8B" stroke-width="3" fill="none" stroke-linecap="round"/>';
  a(tuft);

  /* =========== LEFT: the build-out =========== */
  // plateau
  a('<path d="M0 700 H660 V1290 H0 Z" fill="' + C.clay + '"/><rect x="0" y="700" width="660" height="40" fill="#EBC2DB"/><line x1="0" y1="700" x2="660" y2="700" stroke="' + C.ink + '" stroke-width="3"/>');
  a('<path d="M660 700 V1290" stroke="' + C.ink + '" stroke-width="3"/>');
  // crane 2 (mustard, back)
  a(lattice(70, 240, 700, 22, C.mus) + '<rect x="10" y="232" width="330" height="16" fill="' + C.mus + '" stroke="' + C.ink + '" stroke-width="2"/><rect x="10" y="248" width="36" height="34" fill="' + C.ink + '"/><line x1="270" y1="248" x2="270" y2="330" stroke="' + C.ink + '" stroke-width="2"/><rect x="215" y="330" width="110" height="14" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="2"/>');
  // data centre
  a('<rect x="130" y="398" width="430" height="296" fill="' + C.vio + '" stroke="' + C.ink + '" stroke-width="3"/><rect x="120" y="386" width="450" height="18" fill="' + C.vioD + '" stroke="' + C.ink + '" stroke-width="3"/>');
  a(windows(150, 470, 15, 7, 27, 30, 17, 19, [C.lime, C.cyan, '#8E86E0', C.lime, '#4E46A0'], 'blink'));
  a('<rect x="300" y="626" width="90" height="68" fill="' + C.vioD + '" stroke="' + C.ink + '" stroke-width="2"/><rect x="306" y="632" width="78" height="62" fill="' + C.cyan + '" opacity=".5"/>');
  // banner on roof
  a('<line x1="170" y1="386" x2="170" y2="330" stroke="' + C.ink + '" stroke-width="4"/><line x1="520" y1="386" x2="520" y2="330" stroke="' + C.ink + '" stroke-width="4"/>');
  a('<rect x="150" y="318" width="390" height="62" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="3"/>' + txt(345, 356, '$10.3 TRILLION', 30, C.cream, 'text-anchor="middle"') + mono(345, 374, 'DATA CENTRES · 2025–2032', 11, C.cream, 'text-anchor="middle"'));
  a('<g fill="none" stroke="' + C.ink + '" stroke-width="2" opacity=".7">' + '<path d="M470 398 V694 M500 398 V694 M530 398 V694 M470 450 H560 M470 520 H560 M470 590 H560 M470 660 H560 M470 450 L500 520 L530 450 M500 590 L530 660"/></g>');
  // tiny comparison: canal + railroad + grid
  a('<rect x="140" y="706" width="120" height="14" rx="7" fill="' + C.cyan + '"/><path d="M180 708 h22 l-4 7 h-14z" fill="' + C.ink + '"/>' +
    '<line x1="280" y1="719" x2="420" y2="719" stroke="' + C.ink + '" stroke-width="2"/><rect x="290" y="707" width="20" height="11" fill="' + C.red + '"/><rect x="314" y="709" width="18" height="9" fill="' + C.brown + '"/><rect x="336" y="709" width="18" height="9" fill="' + C.brown + '"/>' +
    '<path d="M460 720 L470 690 L480 720 M464 708 H476 M462 698 H478" stroke="' + C.ink + '" stroke-width="2" fill="none"/>' +
    mono(140, 736, 'CANALS + RAILROADS + GRID, FOR SCALE', 10, C.ink, 'opacity=".8"'));
  // crane 1 (red, front)
  a(lattice(588, 160, 700, 24, C.red) + '<rect x="320" y="150" width="460" height="18" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="2"/><rect x="730" y="168" width="44" height="40" fill="' + C.ink + '"/><path d="M600 150 L612 110 L624 150" stroke="' + C.ink + '" stroke-width="3" fill="none"/>' +
    '<line x1="420" y1="168" x2="420" y2="262" stroke="' + C.ink + '" stroke-width="2"/><g class="sway2"><rect x="388" y="262" width="64" height="44" fill="' + C.mus + '" stroke="' + C.ink + '" stroke-width="3"/>' + txt(420, 292, 'GPU', 18, C.ink, 'text-anchor="middle"') + '</g>');

  // staircase of shrinking coins on the cliff face
  var st = '', sx = 50, sy = 770;
  for (var k = 0; k < 8; k++) {
    var x0 = sx + k * 72, y0 = sy + k * 38;
    st += '<path d="M' + x0 + ' ' + y0 + ' H' + (x0 + 72) + ' V' + (y0 + 38) + '" fill="none" stroke="' + C.ink + '" stroke-width="3"/>';
    st += '<rect x="' + x0 + '" y="' + y0 + '" width="72" height="10" fill="' + C.mus + '" stroke="' + C.ink + '" stroke-width="2"/>';
    var r = 34 * Math.pow(0.62, k);
    st += '<g class="hop" style="animation-delay:' + (k * 0.18).toFixed(2) + 's"><circle cx="' + (x0 + 36) + '" cy="' + (y0 - r) + '" r="' + r.toFixed(1) + '" fill="#FFD25A" stroke="' + C.ink + '" stroke-width="' + Math.max(1, 3 * Math.pow(0.8, k)).toFixed(1) + '"/>';
    if (r > 9) st += txt(x0 + 36, y0 - r + r * 0.42, '$', (r * 1.1).toFixed(0), C.ink, 'text-anchor="middle"');
    st += '</g>';
  }
  a('<path d="M50 808 L626 1074 L626 1290 L50 1290 Z" fill="#C98DB6" opacity=".5"/>' + st);
  a('<g transform="translate(330 780) rotate(-4)"><rect x="0" y="0" width="170" height="56" fill="' + C.cream + '" stroke="' + C.ink + '" stroke-width="3"/>' + txt(85, 30, '−47%', 26, C.red, 'text-anchor="middle"') + mono(85, 47, 'EVERY QUARTER', 11, C.ink, 'text-anchor="middle"') + '</g><line x1="415" y1="836" x2="415" y2="870" stroke="' + C.ink + '" stroke-width="4"/>');
  a(mono(60, 1000, '≈14× CHEAPER PER YEAR', 13, C.ink));

  // Mama's chicken stall
  a('<rect x="66" y="1080" width="12" height="210" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="2"/><rect x="566" y="1080" width="12" height="210" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="2"/>');
  a('<rect x="150" y="1026" width="300" height="46" fill="' + C.cream + '" stroke="' + C.ink + '" stroke-width="3"/>' + txt(300, 1058, 'BEST CHICKEN AUNTIE', 21, C.red, 'text-anchor="middle"'));
  a(awning(52, 1086, 540, 50, C.red, C.cream));
  var ch = '';
  for (var c = 0; c < 6; c++) {
    var cx = 120 + c * 46;
    ch += '<line x1="' + cx + '" y1="1136" x2="' + cx + '" y2="1152" stroke="' + C.ink + '" stroke-width="2"/><g class="swing" style="animation-delay:' + (c * 0.3) + 's;transform-origin:' + cx + 'px 1136px"><ellipse cx="' + cx + '" cy="1172" rx="17" ry="21" fill="#E39A3B" stroke="' + C.ink + '" stroke-width="2"/><path d="M' + (cx - 6) + ' 1190 l-4 10 M' + (cx + 6) + ' 1190 l4 10" stroke="' + C.ink + '" stroke-width="4" stroke-linecap="round"/><path d="M' + (cx - 8) + ' 1162 q8 -6 14 2" stroke="#FFD08A" stroke-width="3" fill="none"/></g>';
  }
  a(ch);
  a(person(250, 1222, C.lilac, { happy: true }));
  a('<rect x="90" y="1212" width="310" height="78" fill="' + C.mus + '" stroke="' + C.ink + '" stroke-width="3"/><path d="M90 1236 H400" stroke="' + C.ink + '" stroke-width="2"/>' + mono(245, 1270, 'GÀ NƯỚNG · FRESH DAILY', 13, C.ink, 'text-anchor="middle"'));
  // the price board
  a('<g transform="translate(410 1132) rotate(3)"><rect x="0" y="0" width="190" height="130" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="3"/>' +
    mono(95, 22, 'ONE GPQA QUESTION', 11, C.ink, 'text-anchor="middle"') +
    txt(95, 56, '$0.30', 30, C.ink, 'text-anchor="middle" opacity=".55"') + '<line x1="40" y1="44" x2="150" y2="44" stroke="' + C.red + '" stroke-width="6" stroke-linecap="round"/>' +
    txt(95, 96, '$0.0004', 30, C.red, 'text-anchor="middle"') + mono(95, 118, '725× CHEAPER', 12, C.ink, 'text-anchor="middle"') + '</g><line x1="505" y1="1262" x2="505" y2="1290" stroke="' + C.ink + '" stroke-width="5"/>');
  // Mom celebrating
  a(person(352, 1300, C.red, { hat: true, armsUp: true, happy: true, s: 1.05 }));

  // Legal AI tower with runaway receipt
  a('<rect x="690" y="520" width="170" height="770" fill="' + C.pink + '" stroke="' + C.ink + '" stroke-width="3"/><rect x="680" y="508" width="190" height="18" fill="' + C.redD + '" stroke="' + C.ink + '" stroke-width="3"/>');
  a(windows(708, 560, 4, 19, 38, 37, 24, 22, ['#FFE3EE', '#FFD0E0', C.cream, C.mus]));
  a('<rect x="705" y="452" width="140" height="48" fill="' + C.cream + '" stroke="' + C.ink + '" stroke-width="3"/>' + txt(775, 484, 'LEGAL AI', 20, C.ink, 'text-anchor="middle"') + '<line x1="740" y1="500" x2="740" y2="508" stroke="' + C.ink + '" stroke-width="3"/><line x1="810" y1="500" x2="810" y2="508" stroke="' + C.ink + '" stroke-width="3"/>');
  a('<path d="M846 600 C 900 640, 870 720, 900 800 S 860 960, 905 1060 S 880 1200, 930 1290" stroke="' + C.ink + '" stroke-width="34" fill="none" opacity=".18"/>' +
    '<path d="M846 600 C 900 640, 870 720, 900 800 S 860 960, 905 1060 S 880 1200, 930 1290" stroke="' + C.paper + '" stroke-width="28" fill="none"/>' +
    '<path d="M846 600 C 900 640, 870 720, 900 800 S 860 960, 905 1060 S 880 1200, 930 1290" stroke="' + C.ink + '" stroke-width="2" stroke-dasharray="10 8" fill="none" opacity=".45"/>');
  a('<g transform="translate(760 880) rotate(-6)"><rect x="-70" y="-38" width="140" height="76" fill="' + C.cream + '" stroke="' + C.ink + '" stroke-width="3"/>' + mono(0, -16, 'GROSS MARGIN', 11, C.ink, 'text-anchor="middle"') + txt(0, 20, '+50→−50%', 20, C.red, 'text-anchor="middle"') + '</g>');

  /* =========== MIDDLE: telecom wires, railroad, mail order, flywheel =========== */
  var poles = [930, 1150, 1370, 1590, 1800];
  var pl = '';
  poles.forEach(function (px) {
    pl += '<rect x="' + (px - 6) + '" y="96" width="12" height="700" fill="' + C.brown + '" stroke="' + C.ink + '" stroke-width="2"/>';
    pl += '<rect x="' + (px - 40) + '" y="112" width="80" height="9" fill="' + C.brown + '" stroke="' + C.ink + '" stroke-width="2"/><rect x="' + (px - 30) + '" y="144" width="60" height="8" fill="' + C.brown + '" stroke="' + C.ink + '" stroke-width="2"/>';
    pl += '<circle cx="' + (px - 34) + '" cy="110" r="4" fill="' + C.cyan + '"/><circle cx="' + (px + 34) + '" cy="110" r="4" fill="' + C.cyan + '"/><circle cx="' + px + '" cy="142" r="4" fill="' + C.cream + '"/>';
  });
  a(pl);
  var wires = '', riders = '';
  for (var p = 0; p < poles.length - 1; p++) {
    var x1 = poles[p], x2 = poles[p + 1];
    wires += '<path d="' + catenary(x1 - 34, 110, x2 - 34, 110, 26) + '" stroke="' + C.brown + '" stroke-width="3" fill="none"/>';
    wires += '<path d="' + catenary(x1, 142, x2, 142, 34) + '" stroke="' + C.ink + '" stroke-width="2.5" fill="none"/>';
    wires += '<path d="' + catenary(x1 + 34, 110, x2 + 34, 110, 44) + '" stroke="' + C.cyan + '" stroke-width="4" fill="none"/>';
    wires += '<path class="pulse" d="' + catenary(x1 + 34, 110, x2 + 34, 110, 44) + '" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="6 46" fill="none" stroke-linecap="round"/>';
    // envelope rides the copper wire
    var e = onCurve(x1 - 34, 110, x2 - 34, 110, 26, 0.35);
    riders += '<g transform="translate(' + e[0].toFixed(0) + ' ' + (e[1] + 4).toFixed(0) + ')"><rect x="-15" y="0" width="30" height="20" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="2"/><path d="M-15 0 L0 11 L15 0" stroke="' + C.ink + '" stroke-width="2" fill="none"/></g>';
    var m = onCurve(x1, 142, x2, 142, 34, 0.62);
    riders += mono(m[0].toFixed(0), (m[1] + 22).toFixed(0), '·−·· −−−', 15, C.ink, 'text-anchor="middle"');
  }
  a(wires + riders);
  // posters hanging off the fibre line (the companies that assumed connectivity)
  var posters = [['SEARCH', C.lime], ['VIDEO', C.red], ['RIDES', C.cyan], ['SHOP', C.mus], ['CLOUD', C.pink], ['STAYS', C.lilac], ['SONGS', C.lime], ['SOCIAL', C.mus]];
  var pp = '';
  posters.forEach(function (q, i) {
    var span = Math.floor(i / 2), t = i % 2 ? 0.7 : 0.3;
    var pt = onCurve(poles[span] + 34, 110, poles[span + 1] + 34, 110, 44, t);
    var px = pt[0], py = pt[1];
    var tc = (q[1] === C.red) ? C.cream : C.ink;
    pp += '<g class="swing" style="transform-origin:' + px.toFixed(0) + 'px ' + py.toFixed(0) + 'px;animation-delay:' + (i * 0.4) + 's"><line x1="' + px.toFixed(0) + '" y1="' + py.toFixed(0) + '" x2="' + px.toFixed(0) + '" y2="' + (py + 34).toFixed(0) + '" stroke="' + C.ink + '" stroke-width="2"/>' +
      '<rect x="' + (px - 44).toFixed(0) + '" y="' + (py + 34).toFixed(0) + '" width="88" height="112" fill="' + q[1] + '" stroke="' + C.ink + '" stroke-width="3"/>' +
      '<rect x="' + (px - 36).toFixed(0) + '" y="' + (py + 42).toFixed(0) + '" width="72" height="44" fill="' + C.paper + '" opacity=".55"/>' +
      '<circle cx="' + px.toFixed(0) + '" cy="' + (py + 64).toFixed(0) + '" r="14" fill="' + C.ink + '" opacity=".85"/>' +
      txt(px.toFixed(0), (py + 122).toFixed(0), q[0], 15, tc, 'text-anchor="middle"') + '</g>';
  });
  a(pp);

  // bridge
  var br = '';
  br += '<rect x="880" y="792" width="720" height="40" fill="' + C.vioD + '" stroke="' + C.ink + '" stroke-width="3"/>';
  br += '<path d="M1600 792 l-14 12 l12 8 l-10 12 l12 8 H1600" fill="' + C.road + '"/>';
  [890, 1240, 1560].forEach(function (px, i) {
    br += '<rect x="' + px + '" y="832" width="40" height="458" fill="' + C.vio + '" stroke="' + C.ink + '" stroke-width="3"/>';
  });
  br += '<path d="M930 832 Q1085 950 1240 832" fill="none" stroke="' + C.ink + '" stroke-width="3"/><path d="M1280 832 Q1420 950 1560 832" fill="none" stroke="' + C.ink + '" stroke-width="3"/>';
  br += '<path d="M1566 1000 l14 30 l-10 24 l16 34" stroke="' + C.ink + '" stroke-width="3" fill="none"/>';
  br += '<line x1="880" y1="772" x2="1600" y2="772" stroke="' + C.ink + '" stroke-width="3"/>';
  for (var bx = 890; bx <= 1590; bx += 20) br += '<line x1="' + bx + '" y1="772" x2="' + bx + '" y2="792" stroke="' + C.ink + '" stroke-width="2"/>';
  // broken span
  br += '<g transform="rotate(24 1690 800)"><rect x="1690" y="792" width="150" height="40" fill="' + C.vioD + '" stroke="' + C.ink + '" stroke-width="3"/><path d="M1690 792 l14 12 l-12 8 l10 12 l-12 8" fill="' + C.road + '"/><line x1="1690" y1="772" x2="1840" y2="772" stroke="' + C.ink + '" stroke-width="3"/></g>';
  br += '<rect x="1780" y="900" width="40" height="390" fill="' + C.vio + '" stroke="' + C.ink + '" stroke-width="3"/>';
  br += '<g fill="' + C.vioD + '" stroke="' + C.ink + '" stroke-width="2"><rect x="1612" y="900" width="18" height="14" transform="rotate(20 1620 906)"/><rect x="1640" y="980" width="14" height="12" transform="rotate(-30 1646 986)"/><rect x="1622" y="1080" width="20" height="14"/></g>';
  a(br);
  // newspaper
  a('<g transform="translate(1655 640) rotate(-12)" class="flutter"><rect x="-82" y="-50" width="164" height="104" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="3"/>' + mono(0, -30, 'THE DAILY NEWS · 1873', 10, C.ink, 'text-anchor="middle"') + '<line x1="-70" y1="-22" x2="70" y2="-22" stroke="' + C.ink + '" stroke-width="2"/>' + txt(0, 10, 'PANIC!', 30, C.red, 'text-anchor="middle"') + '<path d="M-70 24 H70 M-70 34 H40 M-70 44 H60" stroke="' + C.ink + '" stroke-width="2" opacity=".5"/></g>');
  // the train
  var tr = '';
  tr += '<line x1="880" y1="788" x2="1600" y2="788" stroke="' + C.ink + '" stroke-width="3"/>';
  function wheels(x0, x1) { var s = ''; [x0, x1].forEach(function (wx) { s += '<circle cx="' + wx + '" cy="774" r="13" fill="' + C.ink + '"/><circle cx="' + wx + '" cy="774" r="5" fill="' + C.cream + '"/>'; }); return s; }
  // cattle car
  tr += '<rect x="930" y="676" width="160" height="90" rx="4" fill="' + C.brown + '" stroke="' + C.ink + '" stroke-width="3"/><path d="M924 676 H1096 L1086 662 H934 Z" fill="' + C.redD + '" stroke="' + C.ink + '" stroke-width="2"/>';
  for (var sl = 0; sl < 4; sl++) tr += '<rect x="944" y="' + (690 + sl * 18) + '" width="132" height="7" fill="#5E3B2C"/>';
  [960, 1010, 1058].forEach(function (cx) { tr += '<g><ellipse cx="' + cx + '" cy="686" rx="16" ry="13" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="2"/><circle cx="' + (cx - 5) + '" cy="682" r="4" fill="' + C.ink + '"/><ellipse cx="' + cx + '" cy="694" rx="9" ry="5" fill="' + C.pink + '"/><path d="M' + (cx - 14) + ' 676 l-6 -6 M' + (cx + 14) + ' 676 l6 -6" stroke="' + C.ink + '" stroke-width="3"/></g>'; });
  tr += wheels(955, 1065);
  // Swift refrigerator car
  tr += '<rect x="1102" y="666" width="214" height="100" rx="6" fill="url(#ice)" stroke="' + C.ink + '" stroke-width="3"/><path d="M1096 666 H1322 L1310 650 H1108 Z" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="2"/>';
  tr += '<rect x="1130" y="636" width="22" height="16" fill="#E6FBFF" stroke="' + C.ink + '" stroke-width="2"/><rect x="1196" y="636" width="22" height="16" fill="#E6FBFF" stroke="' + C.ink + '" stroke-width="2"/><rect x="1262" y="636" width="22" height="16" fill="#E6FBFF" stroke="' + C.ink + '" stroke-width="2"/>';
  tr += txt(1209, 712, 'SWIFT', 30, C.red, 'text-anchor="middle"') + mono(1209, 732, 'REFRIGERATOR LINE', 11, C.ink, 'text-anchor="middle"');
  function flake(x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="#3E8FB0" stroke-width="2" stroke-linecap="round"><path d="M0 -8 V8 M-7 -4 L7 4 M-7 4 L7 -4"/></g>'; }
  tr += flake(1124, 690, 1) + flake(1294, 690, 1) + flake(1130, 748, 0.8) + flake(1290, 750, 0.8) + flake(1209, 752, 0.7);
  tr += wheels(1130, 1290);
  // locomotive
  tr += '<rect x="1336" y="700" width="150" height="66" rx="30" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="3"/><rect x="1330" y="656" width="62" height="110" fill="' + C.redD + '" stroke="' + C.ink + '" stroke-width="3"/><rect x="1342" y="670" width="36" height="30" fill="#FFE07A" stroke="' + C.ink + '" stroke-width="2"/>';
  tr += '<rect x="1446" y="664" width="22" height="40" fill="' + C.ink + '"/><rect x="1440" y="656" width="34" height="12" fill="' + C.ink + '"/><circle cx="1490" cy="733" r="10" fill="#FFE07A" stroke="' + C.ink + '" stroke-width="2"/><path d="M1486 766 l22 0 l-14 -18 z" fill="' + C.ink + '"/>';
  tr += '<circle cx="1360" cy="772" r="17" fill="' + C.ink + '"/><circle cx="1360" cy="772" r="7" fill="' + C.cream + '"/><circle cx="1410" cy="772" r="17" fill="' + C.ink + '"/><circle cx="1410" cy="772" r="7" fill="' + C.cream + '"/><circle cx="1458" cy="776" r="11" fill="' + C.ink + '"/>';
  tr += '<line x1="1360" y1="772" x2="1410" y2="772" stroke="' + C.mus + '" stroke-width="5"/>';
  tr += '<rect x="1090" y="752" width="14" height="6" fill="' + C.ink + '"/><rect x="1316" y="752" width="16" height="6" fill="' + C.ink + '"/>';
  // steam
  tr += '<g class="steam"><circle cx="1458" cy="630" r="18" fill="#FFF8FB"/><circle cx="1430" cy="598" r="26" fill="#FFF8FB"/><circle cx="1392" cy="560" r="34" fill="#FFF8FB" opacity=".9"/><circle cx="1340" cy="528" r="40" fill="#FFF8FB" opacity=".75"/></g>';
  a(tr);

  // mail-order catalogue house (Sears)
  var se = '';
  se += '<path d="M940 1000 L1080 900 L1220 1000 Z" fill="' + C.redD + '" stroke="' + C.ink + '" stroke-width="3" stroke-linejoin="round"/>';
  se += '<rect x="950" y="1000" width="260" height="290" fill="' + C.mus + '" stroke="' + C.ink + '" stroke-width="3"/>';
  se += '<rect x="966" y="1014" width="228" height="40" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="3"/>' + txt(1080, 1042, 'MAIL ORDER', 20, C.redD, 'text-anchor="middle"');
  se += '<rect x="1040" y="1176" width="60" height="114" fill="' + C.vioD + '" stroke="' + C.ink + '" stroke-width="3"/><circle cx="1088" cy="1236" r="4" fill="' + C.mus + '"/>';
  se += '<rect x="972" y="1076" width="48" height="56" fill="' + C.cream + '" stroke="' + C.ink + '" stroke-width="2"/><rect x="1140" y="1076" width="48" height="56" fill="' + C.cream + '" stroke="' + C.ink + '" stroke-width="2"/>';
  // catalogue
  se += '<g transform="translate(1012 1070) rotate(-8)"><rect x="0" y="0" width="120" height="96" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="3"/><rect x="8" y="8" width="104" height="80" fill="none" stroke="' + C.cream + '" stroke-width="2"/>' + mono(60, 28, 'CATALOGUE', 11, C.cream, 'text-anchor="middle"') + txt(60, 58, '1914', 24, C.cream, 'text-anchor="middle"') + mono(60, 78, '$100M+ / YR', 11, C.cream, 'text-anchor="middle"') + '</g>';
  // parcels
  [[1112, 1240, 52, 50], [1160, 1252, 44, 38], [1124, 1206, 40, 34], [1220, 1258, 40, 32]].forEach(function (b) {
    se += '<rect x="' + b[0] + '" y="' + b[1] + '" width="' + b[2] + '" height="' + b[3] + '" fill="#D9A574" stroke="' + C.ink + '" stroke-width="2"/><path d="M' + (b[0] + b[2] / 2) + ' ' + b[1] + ' V' + (b[1] + b[3]) + ' M' + b[0] + ' ' + (b[1] + b[3] / 2) + ' H' + (b[0] + b[2]) + '" stroke="' + C.redD + '" stroke-width="2"/>';
  });
  se += person(1000, 1290, C.cyan, { happy: true, s: 0.9 }) + '<rect x="1008" y="1224" width="26" height="22" fill="#D9A574" stroke="' + C.ink + '" stroke-width="2"/>';
  a(se);

  // flywheel + oil tanks (Standard Oil)
  var fw = '';
  [[1320, 1170, 70], [1400, 1150, 80], [1490, 1180, 60]].forEach(function (tk) {
    var x = tk[0], y = tk[1], w2 = tk[2];
    fw += '<rect x="' + x + '" y="' + y + '" width="' + w2 + '" height="' + (1290 - y) + '" fill="' + C.cream + '" stroke="' + C.ink + '" stroke-width="3"/><ellipse cx="' + (x + w2 / 2) + '" cy="' + y + '" rx="' + (w2 / 2) + '" ry="10" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="3"/><rect x="' + x + '" y="' + (y + 40) + '" width="' + w2 + '" height="16" fill="' + C.red + '"/>';
  });
  fw += mono(1440, 1250, 'OIL', 16, C.ink, 'text-anchor="middle"');
  fw += '<rect x="1444" y="1010" width="12" height="150" fill="' + C.ink + '"/>';
  fw += '<g class="spin" style="transform-origin:1450px 1010px"><circle cx="1450" cy="1010" r="96" fill="none" stroke="' + C.red + '" stroke-width="18"/><circle cx="1450" cy="1010" r="96" fill="none" stroke="' + C.ink + '" stroke-width="2"/><circle cx="1450" cy="1010" r="105" fill="none" stroke="' + C.ink + '" stroke-width="2"/>';
  for (var sp = 0; sp < 8; sp++) { var ang = sp * Math.PI / 4; fw += '<line x1="1450" y1="1010" x2="' + (1450 + Math.cos(ang) * 88).toFixed(1) + '" y2="' + (1010 + Math.sin(ang) * 88).toFixed(1) + '" stroke="' + C.ink + '" stroke-width="5"/>'; }
  fw += '<circle cx="1450" cy="1010" r="20" fill="' + C.mus + '" stroke="' + C.ink + '" stroke-width="3"/></g>';
  fw += '<text ' + M + ' font-weight="700" font-size="14" fill="' + C.ink + '" letter-spacing="2"><textPath href="#flyPath">SCALE → MORE LEVERAGE → CHEAPER SHIPPING → MORE SCALE → THE FLYWHEEL →</textPath></text>';
  a(fw);

  /* =========== RIGHT: lantern market, stalls, hospital =========== */
  // lantern strings
  var ls = '', strings = [[1810, 40, 2800, 60, 40], [1810, 120, 2800, 100, 50], [1810, 200, 2800, 180, 44]];
  strings.forEach(function (s) { ls += '<path d="' + catenary(s[0], s[1], s[2], s[3], s[4]) + '" stroke="' + C.ink + '" stroke-width="2" fill="none"/>'; });
  for (var L = 0; L < 60; L++) {
    var si = L % 3, s = strings[si], t2 = (Math.floor(L / 3) + 0.5 + (R() - 0.5) * 0.4) / 20;
    var pt2 = onCurve(s[0], s[1], s[2], s[3], s[4], t2), drop = 20 + R() * 150, lx = pt2[0], ly = pt2[1], ws = 0.65 + R() * 0.55;
    ls += '<g class="sway" style="transform-origin:' + lx.toFixed(0) + 'px ' + ly.toFixed(0) + 'px;animation-delay:-' + (R() * 4).toFixed(2) + 's;animation-duration:' + (3 + R() * 2).toFixed(2) + 's">';
    ls += '<line x1="' + lx.toFixed(0) + '" y1="' + ly.toFixed(0) + '" x2="' + lx.toFixed(0) + '" y2="' + (ly + drop).toFixed(0) + '" stroke="' + C.ink + '" stroke-width="1.5"/>';
    ls += '<g transform="translate(' + lx.toFixed(1) + ' ' + (ly + drop).toFixed(1) + ') scale(' + ws.toFixed(2) + ')">';
    ls += '<circle cx="0" cy="36" r="30" fill="url(#glow)"/><rect x="-7" y="0" width="14" height="10" fill="' + C.ink + '"/><path d="M-36 34 A36 34 0 0 1 36 34 Z" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="2"/>';
    ls += '<path d="M-20 14 Q-14 24 -16 34 M0 8 V34 M20 14 Q14 24 16 34" stroke="' + C.paper + '" stroke-width="2" fill="none" opacity=".75"/><ellipse cx="0" cy="36" rx="9" ry="6" fill="#FFF4B0"/></g></g>';
  }
  a(ls);
  a('<g transform="translate(1860 418) rotate(-3)"><rect x="0" y="0" width="230" height="54" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="3"/>' + txt(115, 26, 'CHEAPER THINKING', 17, C.red, 'text-anchor="middle"') + mono(115, 44, '= WAY MORE THINKING', 12, C.ink, 'text-anchor="middle"') + '</g>');

  // market deck
  a('<rect x="1820" y="800" width="560" height="30" fill="' + C.vioD + '" stroke="' + C.ink + '" stroke-width="3"/>');
  [1830, 2066, 2352].forEach(function (px) { a('<rect x="' + px + '" y="830" width="22" height="460" fill="' + C.vio + '" stroke="' + C.ink + '" stroke-width="3"/>'); });
  // stalls A-D
  var stalls = [
    ['A', C.cyan, C.paper, '$10→$12', 'SELLS THOUGHT'],
    ['B', C.lilac, C.paper, 'PICKAXES', 'SELLS INFRA'],
    ['C', C.mus, C.paper, '$300', 'REPLACES $1K'],
    ['D', C.red, C.paper, '$10K', 'MAKES THE THING']
  ];
  var stl = '';
  stalls.forEach(function (q, i) {
    var x = 1846 + i * 104, w3 = 92;
    if (q[0] === 'D') stl += '<circle cx="' + (x + w3 / 2) + '" cy="690" r="120" fill="url(#goldGlow)" class="pulseGlow"/>';
    stl += '<rect x="' + (x + 4) + '" y="600" width="6" height="200" fill="' + C.ink + '"/><rect x="' + (x + w3 - 10) + '" y="600" width="6" height="200" fill="' + C.ink + '"/>';
    stl += '<line x1="' + (x + 7) + '" y1="600" x2="' + (x + 7) + '" y2="548" stroke="' + C.ink + '" stroke-width="3"/><path d="M' + (x + 7) + ' 548 h36 l-8 12 l8 12 h-36 z" fill="' + q[1] + '" stroke="' + C.ink + '" stroke-width="2"/>' + txt(x + 22, 567, q[0], 16, C.ink, 'text-anchor="middle"');
    stl += awning(x, 606, w3, 34, q[1], q[2]);
    stl += '<rect x="' + x + '" y="726" width="' + w3 + '" height="74" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="3"/>';
    stl += txt(x + w3 / 2, 756, q[3], q[3].length > 6 ? 13 : 17, q[0] === 'D' ? C.red : C.ink, 'text-anchor="middle"') + mono(x + w3 / 2, 778, q[4], 7.5, C.ink, 'text-anchor="middle" letter-spacing="0"');
    stl += person(x + w3 / 2, 728, [C.pink, C.lime, C.cyan, C.mus][i], { s: 0.62, happy: q[0] === 'D' });
  });
  // sparkles on D
  stl += '<g class="twinkle" fill="#FFE07A" stroke="' + C.ink + '" stroke-width="1.5"><path d="M2214 590 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4z"/><path d="M2296 640 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3z"/><path d="M2200 700 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3z"/></g>';
  a(stl);
  // little lab on the deck
  var lab = '<rect x="2262" y="650" width="110" height="150" fill="' + C.mint + '" stroke="' + C.ink + '" stroke-width="3"/><rect x="2256" y="640" width="122" height="14" fill="#5DAF8B" stroke="' + C.ink + '" stroke-width="3"/>';
  lab += txt(2317, 690, 'LAB', 20, C.ink, 'text-anchor="middle"') + windows(2276, 704, 3, 2, 30, 34, 22, 24, [C.cyan, '#E6FBFF', C.lime]);
  lab += '<path d="M2280 640 V612 h10 V640" fill="none" stroke="' + C.ink + '" stroke-width="2"/><path d="M2296 640 l-8 0 l0 -24 l-10 -16 h30 l-10 16 v24z" fill="#E6FBFF" stroke="' + C.ink + '" stroke-width="2" transform="translate(30 0)"/><circle cx="2350" cy="626" r="14" fill="' + C.pink + '" stroke="' + C.ink + '" stroke-width="2"/><rect x="2345" y="600" width="10" height="14" fill="#E6FBFF" stroke="' + C.ink + '" stroke-width="2"/>';
  lab += '<g class="bubbles" fill="#E6FBFF" stroke="' + C.ink + '" stroke-width="1"><circle cx="2350" cy="588" r="4"/><circle cx="2342" cy="574" r="3"/><circle cx="2356" cy="562" r="5"/><circle cx="2318" cy="592" r="3"/><circle cx="2312" cy="578" r="4"/></g>';
  a(lab);

  // losers under the deck: shuttered shop + empty wrapper box
  var lo = '<rect x="1860" y="930" width="196" height="360" fill="#B4ABC9" stroke="' + C.ink + '" stroke-width="3"/><rect x="1872" y="944" width="172" height="44" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="2" opacity=".85"/>' + txt(1958, 964, 'EXPENSIVE', 15, C.ink, 'text-anchor="middle" opacity=".7"') + txt(1958, 982, 'THINKING CO.', 13, C.ink, 'text-anchor="middle" opacity=".7"');
  lo += '<rect x="1874" y="1004" width="168" height="200" fill="#9A90B4" stroke="' + C.ink + '" stroke-width="2"/>';
  for (var sh = 1014; sh < 1204; sh += 12) lo += '<line x1="1874" y1="' + sh + '" x2="2042" y2="' + sh + '" stroke="' + C.ink + '" stroke-width="1.2" opacity=".5"/>';
  lo += '<g transform="translate(1958 1090) rotate(-9)"><rect x="-54" y="-20" width="108" height="40" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="2"/>' + txt(0, 9, 'CLOSED', 20, C.cream, 'text-anchor="middle"') + '</g>';
  lo += '<path d="M1874 1004 l30 0 M1874 1004 l0 30 M1874 1004 L1900 1030 M1886 1004 Q1884 1016 1874 1018" stroke="' + C.paper + '" stroke-width="1.2" fill="none" opacity=".8"/>';
  // wrapper gift box
  lo += '<g transform="translate(1966 1214)"><rect x="0" y="16" width="80" height="60" fill="' + C.pink + '" stroke="' + C.ink + '" stroke-width="3"/><rect x="34" y="16" width="12" height="60" fill="' + C.lime + '" stroke="' + C.ink + '" stroke-width="2"/>';
  lo += '<g transform="rotate(-28 0 16)"><rect x="-4" y="2" width="88" height="16" fill="' + C.pink + '" stroke="' + C.ink + '" stroke-width="3"/></g>';
  lo += '<path d="M8 22 H72" stroke="' + C.ink + '" stroke-width="2" opacity=".4"/>' + mono(40, 58, 'WRAPPER', 9, C.ink, 'text-anchor="middle"') + mono(40, 70, '(EMPTY)', 8, C.ink, 'text-anchor="middle"') + '</g>';
  a(lo);
  // scarce stuff warehouse
  var wh = '<rect x="2090" y="900" width="258" height="390" fill="' + C.mint + '" stroke="' + C.ink + '" stroke-width="3"/><path d="M2084 900 L2219 852 L2354 900 Z" fill="#5DAF8B" stroke="' + C.ink + '" stroke-width="3" stroke-linejoin="round"/>';
  wh += '<rect x="2112" y="914" width="214" height="40" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="2"/>' + txt(2219, 942, 'SCARCE STUFF', 19, C.ink, 'text-anchor="middle"');
  wh += '<circle cx="2219" cy="1032" r="58" fill="#C9CED6" stroke="' + C.ink + '" stroke-width="4"/><circle cx="2219" cy="1032" r="40" fill="none" stroke="' + C.ink + '" stroke-width="2"/><circle cx="2219" cy="1032" r="10" fill="' + C.ink + '"/>';
  for (var vs = 0; vs < 6; vs++) { var va = vs * Math.PI / 3; wh += '<line x1="2219" y1="1032" x2="' + (2219 + Math.cos(va) * 34).toFixed(1) + '" y2="' + (1032 + Math.sin(va) * 34).toFixed(1) + '" stroke="' + C.ink + '" stroke-width="3"/>'; }
  var crates = [['DATA', 2104, 1170, C.mus], ['ENERGY', 2186, 1170, C.red], ['TRUST', 2268, 1170, C.cyan], ['PERMITS', 2120, 1110, C.lilac], ['CHIPS', 2206, 1110, C.lime], ['LAND', 2270, 1110, C.pink]];
  crates.forEach(function (q) {
    var cw = q[1] === 2270 ? 64 : 80;
    wh += '<rect x="' + q[1] + '" y="' + q[2] + '" width="' + cw + '" height="' + (q[2] === 1170 ? 120 : 60) + '" fill="' + q[3] + '" stroke="' + C.ink + '" stroke-width="2"/><path d="M' + q[1] + ' ' + q[2] + ' l' + cw + ' ' + (q[2] === 1170 ? 120 : 60) + '" stroke="' + C.ink + '" stroke-width="1.5" opacity=".35"/>' + mono(q[1] + cw / 2, q[2] + 32, q[0], 11, (q[3] === C.red ? C.cream : C.ink), 'text-anchor="middle"');
  });
  a(wh);

  // hospital
  var ho = '<rect x="2400" y="470" width="370" height="820" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="3"/><rect x="2390" y="456" width="390" height="20" fill="' + C.cyan + '" stroke="' + C.ink + '" stroke-width="3"/>';
  ho += '<circle cx="2585" cy="400" r="54" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="3"/><path d="M2573 368 h24 v20 h20 v24 h-20 v20 h-24 v-20 h-20 v-24 h20z" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="2"/><line x1="2585" y1="454" x2="2585" y2="456" stroke="' + C.ink + '" stroke-width="3"/>';
  ho += '<rect x="2430" y="490" width="310" height="44" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="3"/>' + txt(2585, 520, 'AI-NATIVE HOSPITAL', 19, C.cream, 'text-anchor="middle"');
  for (var hr = 0; hr < 9; hr++) for (var hc = 0; hc < 5; hc++) {
    var wx = 2424 + hc * 66, wy = 556 + hr * 66;
    var lit = R();
    ho += '<rect x="' + wx + '" y="' + wy + '" width="52" height="48" rx="4" fill="' + (lit < 0.55 ? '#FFE9A8' : (lit < 0.8 ? '#CFEFF7' : '#F5D3E1')) + '" stroke="' + C.ink + '" stroke-width="2"/>';
    if (lit < 0.25) ho += '<circle cx="' + (wx + 18) + '" cy="' + (wy + 22) + '" r="7" fill="' + C.ink + '" opacity=".75"/><rect x="' + (wx + 10) + '" y="' + (wy + 30) + '" width="16" height="18" rx="6" fill="' + C.ink + '" opacity=".75"/>';
    else if (lit > 0.82) ho += '<rect x="' + (wx + 10) + '" y="' + (wy + 12) + '" width="32" height="22" rx="3" fill="' + C.ink + '"/><path d="M' + (wx + 14) + ' ' + (wy + 24) + ' h6 l3 -6 l4 12 l3 -6 h8" stroke="' + C.lime + '" stroke-width="2" fill="none"/>';
  }
  ho += '<rect x="2530" y="1170" width="110" height="120" fill="' + C.cyan + '" stroke="' + C.ink + '" stroke-width="3"/><line x1="2585" y1="1170" x2="2585" y2="1290" stroke="' + C.ink + '" stroke-width="3"/>';
  ho += awning(2510, 1140, 150, 26, C.red, C.paper);
  ho += person(2490, 1292, C.mus, { happy: true }) + person(2690, 1292, C.lilac, { happy: true, s: 0.95 }) + person(2730, 1292, C.lime, { s: 0.7, happy: true });
  a(ho);
  // robot heading to work
  a('<g transform="translate(2420 1196)"><line x1="30" y1="0" x2="30" y2="-18" stroke="' + C.ink + '" stroke-width="3"/><circle cx="30" cy="-22" r="5" fill="' + C.red + '" class="blinkFast"/><rect x="8" y="0" width="44" height="34" rx="8" fill="#DDE3EA" stroke="' + C.ink + '" stroke-width="3"/><circle cx="22" cy="16" r="5" fill="' + C.cyan + '"/><circle cx="38" cy="16" r="5" fill="' + C.cyan + '"/><rect x="2" y="38" width="56" height="40" rx="6" fill="' + C.mus + '" stroke="' + C.ink + '" stroke-width="3"/><path d="M58 50 l18 -8 l6 8" stroke="' + C.ink + '" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="74" y="30" width="22" height="18" fill="#D9A574" stroke="' + C.ink + '" stroke-width="2"/><circle cx="16" cy="88" r="7" fill="' + C.ink + '"/><circle cx="44" cy="88" r="7" fill="' + C.ink + '"/></g>');

  /* ---------- road traffic ---------- */
  function car(col, w, label) {
    var s = '<rect x="0" y="-30" width="' + w + '" height="24" rx="10" fill="' + col + '" stroke="' + C.ink + '" stroke-width="2.5"/><path d="M' + (w * 0.22) + ' -30 l10 -18 h' + (w * 0.36) + ' l10 18z" fill="' + col + '" stroke="' + C.ink + '" stroke-width="2.5"/><path d="M' + (w * 0.3) + ' -32 l7 -12 h' + (w * 0.14) + ' v12z" fill="#E6FBFF"/>';
    if (label) s = '<rect x="0" y="-58" width="' + w * 0.7 + '" height="52" rx="4" fill="' + col + '" stroke="' + C.ink + '" stroke-width="2.5"/><rect x="' + w * 0.7 + '" y="-40" width="' + w * 0.3 + '" height="34" rx="6" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="2.5"/>' + '<text x="' + w * 0.35 + '" y="-28" ' + M + ' font-weight="700" font-size="11" fill="' + C.ink + '" text-anchor="middle">' + label[0] + '</text><text x="' + w * 0.35 + '" y="-14" ' + M + ' font-weight="700" font-size="11" fill="' + C.ink + '" text-anchor="middle">' + label[1] + '</text>';
    return s + '<circle cx="' + w * 0.22 + '" cy="-4" r="9" fill="' + C.ink + '"/><circle cx="' + w * 0.78 + '" cy="-4" r="9" fill="' + C.ink + '"/>';
  }
  var cars = [[C.mus, 96, null, 26, 0, 1362], [C.cyan, 90, null, 34, -12, 1362], [C.paper, 160, ['THOUGHT', 'DELIVERY ¢'], 40, -24, 1362], [C.pink, 92, null, 30, -6, 1418], [C.lime, 88, null, 22, -16, 1418], [C.lilac, 96, null, 36, -28, 1418]];
  var cs = '';
  cars.forEach(function (q, i) {
    var rev = q[5] > 1400;
    cs += '<g class="' + (rev ? 'driveL' : 'driveR') + '" style="animation-duration:' + q[3] + 's;animation-delay:' + q[4] + 's"><g transform="translate(0 ' + q[5] + ')' + (rev ? ' scale(-1 1)' : '') + '">' + car(q[0], q[1], q[2]) + '</g></g>';
  });
  a(cs);
  a('<g transform="translate(150 1468)">' + mono(0, 0, 'INTELLIGENCE, NOW JUST THE ROADS YOU DRIVE ON', 12, C.ink, 'opacity=".75"') + '</g>');

  window.MARKET_SVG = out.join('');
})();
