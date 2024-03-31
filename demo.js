import { style } from './src';
import hljs from 'highlight.js';
import { decode } from 'html-entities';

function highlight(code) {
  let html = hljs.highlight(code, {
    language: 'js',
  }).value;
  html = html.replaceAll('<span class="hljs-keyword">', '$fuchsia{');
  html = html.replaceAll('<span class="hljs-variable language_">', '$b{');
  html = html.replaceAll('<span class="hljs-title function_">', '$lime{');
  html = html.replaceAll('<span class="hljs-string">', '$y{');
  html = html.replaceAll('<span class="hljs-params"></span>', '');
  html = html.replaceAll('<span class="hljs-comment">', '$gr.dim{');
  html = html.replaceAll('</span>', '}');
  html = decode(html);
  return style(html);
}

const code = `
// Comment
function greet() {
  console.log('Hello World!');
}
`;

console.log(highlight(code));

function run(str, color = true) {
  console.log();
  console.log(str);
  console.log();
  console.log(style(str, { color }));
  console.log();
}

const cpu = 90;
const ram = 40;
const disk = 70;

const getColor = (n) => (n <= 50 ? 'g' : n > 50 && n <= 70 ? 'y' : 'r');

run(`
 CPU: $${getColor(cpu)}{${cpu}%}
 RAM: $${getColor(ram)}{${ram}%}
DISK: $${getColor(disk)}{${disk}%}
`);

run('$r{RED} $r.bol{RED} $r.dim{RED}');

run('$g.bol{SALE! - $blk.r{50% OFFER}}');

run('This is normal string $r{RED} $g{GREEN}');

run(
  "$bgbl.b{THE QUICK $g{BROWN $r.bol{CAT} JUMPED} OVER THE LAZY $r.bol{DOG}'S BACK}"
);

run('$bol{foo $r.dun{bar} $ovl.o{hindi} baz} $und{UNDERLINE}');

run(
  'This is a $o.bgbl{Hello World} example, This is a $r.bol{RED} $g.ita{GREEN} $b.str{BLUE} $gr.dim{GREY} $y.und{YELLOW} $w.bgbl.inv{INVERSE} $bol.rgb(57,204,204){TEAL} $bgrgb(133,20,75).w.bol{MAROON} $m{Magenta} text.'
);

run(
  '🍊 - An $o{orange} is a fruit of various citrus species in the family Rutaceae.'
);

run(
  `$bgy.bl{The $r.bol{R}$g.bol{G}$b.bol{B} color model is an additive color model in which the $r.bol{red}, $g.bol{green} and $b.bol{blue} primary colors of light are added together in various ways to reproduce a broad array of colors.}`
);

run(
  '$g{I am a green line $b.und.bol{with a blue substring} that becomes green again!}'
);

run('$bol.w.bgg{ PASS }');

run('$r.bgw.bol.inv{ FAILED }');

run('Normal text | $bol{Bold text} | $dim{Dimmed text}');

run(
  '$ita.fuchsia.bol.bgw{"This poem is endless,\n the odds against us are endless,\n our chances of being alive together statistically nonexistent;\n still we have made it"}'
);

run('Highlighted fruits: $und{Apple}, cat, $und{Banana}');

run('Price: $str.r{\\$75.00} $g{\\$50.00}');

run('$rgb(197, 24, 117){Some random rgb text}');

run('$rgb(157,154,117){RGB text without space}');

run('$bgrgb(5, 255, 55).navy.bol{Some random rgb text}');

run('$inv{inverse}');

run(
  `<$hex(#39CCCC){input} name=$y{"price"} value=$y{"\\$\\{ Cost + Tax \\}.00"} />`
);
