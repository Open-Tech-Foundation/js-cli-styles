import { style } from './src';
import hljs from 'highlight.js';
import { decode } from 'html-entities';

function highlight(code) {
  let html = hljs.highlight(code, {
    language: 'js',
  }).value;
  html = html.replaceAll('<span class="hljs-keyword">', '$f{');
  html = html.replaceAll('<span class="hljs-variable language_">', '$b{');
  html = html.replaceAll('<span class="hljs-title function_">', '$li{');
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

function print(str, color = true) {
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

print(`
 CPU: $${getColor(cpu)}{${cpu}%}
 RAM: $${getColor(ram)}{${ram}%}
DISK: $${getColor(disk)}{${disk}%}
`);

print('$r{RED} $r.bol{RED} $r.dim{RED}');

print('$g.bol{SALE! - $blk.r{50% OFFER}}');

print('This is normal string $r{RED} $g{GREEN}');

print(
  "$bgbl.b{THE QUICK $g{BROWN $r.bol{CAT} JUMPED} OVER THE LAZY $r.bol{DOG}'S BACK}"
);

print('$bol{foo $r.dbu{bar} $ovl.o{hindi} baz} $und{UNDERLINE}');

print(
  'This is a $o.bgbl{Hello World} example, This is a $r.bol{RED} $g.ita{GREEN} $b.str{BLUE} $gr.dim{GREY} $y.und{YELLOW} $w.bgbl.inv{INVERSE} $bol.rgb(57,204,204){TEAL} $bgrgb(133,20,75).w.bol{MAROON} $m{Magenta} text.'
);

print(
  '🍊 - An $o{orange} is a fruit of various citrus species in the family Rutaceae.'
);

print(
  `$bgy.bl{The $r.bol{R}$g.bol{G}$b.bol{B} color model is an additive color model in which the $r.bol{red}, $g.bol{green} and $b.bol{blue} primary colors of light are added together in various ways to reproduce a broad array of colors.}`
);

print(
  '$g{I am a green line $b.und.bol{with a blue substring} that becomes green again!}'
);

print('$bol.w.bgg{ PASS }');

print('$r.bgw.bol.inv{ FAILED }');

print('Normal text | $bol{Bold text} | $dim{Dimmed text}');

print(
  '$ita.f.bol.bgw{"This poem is endless,\n the odds against us are endless,\n our chances of being alive together statistically nonexistent;\n still we have made it"}'
);

print('Highlighted fruits: $und{Apple}, cat, $und{Banana}');

print('Price: $str.r{\\$75.00} $g{\\$50.00}');

print('$rgb(197, 24, 117){Some random rgb text}');

print('$rgb(157,154,117){RGB text without space}');

print('$bgrgb(5, 255, 55).n.bol{Some random rgb text}');

print('$inv{inverse}');

print(
  `<$hex(#39CCCC){input} name=$y{"price"} value=$y{"\\$\\{ Cost + Tax \\}.00"} />`
);

print('$und{Straight underline}');
print('$und{Straight $nou{(No underline here)}  underline}');
print('$dbu{Double underline}');
print('$cru{Curly underline}');
print('$dou{Dotted underline}');
print('$dau{Dashed underline}');
print('$und.ug{Straight underline colored}');
print('$dbu.uy{Double underline colored}');
print('$cru.ur{Curly underline colored}');
print('$dou.ub{Dotted underline colored}');
print('$dau.uo{Dashed underline colored}');
print('$und.urgb(100,200,255){Straight underline RGB colored}');
print('$und.ub{Straight $ruc{underline reset} colored}');
