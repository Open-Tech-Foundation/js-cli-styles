import { style, compile } from './dist/index.js';
import hljs from 'highlight.js';
import { decode } from 'html-entities';

function highlight(code) {
  let html = hljs.highlight(code, {
    language: 'js',
  }).value;
  // Use more conventional colors for JS syntax highlighting
  html = html.replaceAll('<span class="hljs-keyword">', '$b{'); // Keywords: blue
  html = html.replaceAll('<span class="hljs-variable language_">', '$r{'); // Variables: red
  html = html.replaceAll('<span class="hljs-title function_">', '$y{'); // Function names: yellow
  html = html.replaceAll('<span class="hljs-string">', '$g{'); // Strings: green
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

function print(str) {
  console.log(str);
  console.log(style(str));
  console.log(); // Add a single newline for spacing
}

console.log('\n--- Code Highlighting Example ---');
console.log(highlight(code));

console.log('\n--- Template Literal Example ---');
const cpu = 90;
const ram = 40;
const disk = 70;

const getColor = (n) => (n <= 50 ? 'g' : n > 50 && n <= 70 ? 'y' : 'r');

print(`
 CPU: $${getColor(cpu)}{${cpu}%}
 RAM: $${getColor(ram)}{${ram}%}
DISK: $${getColor(disk)}{${disk}%}
`);

console.log('\n--- Font Weight Examples ---');
print('$r{RED} $r.bol{RED} $r.dim{RED}');
print('Normal text | $bol{Bold text} | $dim{Dimmed text}');

console.log('\n--- Blinking Text Example ---');
print('$g.bol{SALE! - $blk.r{50% OFFER}}');

console.log('\n--- Complex Nested Styles ---');
print('This is normal string $r{RED} $g{GREEN}');
print(
  "$bgbl.b{THE QUICK $g{BROWN $r.bol{CAT} JUMPED} OVER THE LAZY $r.bol{DOG}'S BACK}"
);
print(
  'This is a $o.bgbl{Hello World} example, This is a $r.bol{RED} $g.ita{GREEN} $b.str{BLUE} $gr.dim{GREY} $y.und{YELLOW} $w.bgbl.inv{INVERSE} $bol.rgb(57,204,204){TEAL} $bgrgb(133,20,75).w.bol{MAROON} $m{Magenta} text.'
);
print(
  `$bgy.bl{The $r.bol{R}$g.bol{G}$b.bol{B} color model is an additive color model in which the $r.bol{red}, $g.bol{green} and $b.bol{blue} primary colors of light are added together in various ways to reproduce a broad array of colors.}`
);
print(
  '$g{I am a green line $b.und.bol{with a blue substring} that becomes green again!}'
);

console.log('\n--- Modifier Examples ---');
print('$bol{foo $r.dbu{bar} $ovl.o{hindi} baz} $und{UNDERLINE}');
print('$bol.w.bgg{ PASS }');
print('$r.bgw.bol.inv{ FAILED }');
print('$inv{inverse}');
print(
  '$ita.f.bol.bgw{"This poem is endless,\n the odds against us are endless,\n our chances of being alive together statistically nonexistent;\n still we have made it"}'
);
print('Price: $str.r{\\$75.00} $g{\\$50.00}');

console.log('\n--- RGB and Hex Color Examples ---');
print('$rgb(197, 24, 117){Some random rgb text}');
print('$rgb(157,154,117){RGB text without space}');
print('$bgrgb(5, 255, 55).n.bol{Some random rgb text}');
print('$hex(#ff0000){RED}');
print('$bghex(#DDDDDD){COLOR}');

console.log('\n--- Underline Examples ---');
print('$und{Straight underline}');
print('Highlighted fruits: $und{Apple}, cat, $und{Banana}');
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

console.log('\n--- Escaped Character Example ---');
print(
  `<$hex(#39CCCC){input} name=$y{"price"} value=$y{"\\$\\{ Cost + Tax \\}.00"} />`
);

console.log('\n--- Compiled Performance Example ---');
const compiled = compile(
  '$bgbl.b{THE QUICK $g{BROWN $r.bol{CAT} JUMPED} OVER THE LAZY $r.bol{DOG}\'S BACK}'
);

console.log('\nRunning compiled function 100,000 times to show speed...');
console.time('compiled');
for (let i = 0; i < 100000; i++) {
  compiled(true);
}
console.timeEnd('compiled');

console.log('\nRendering with color (compiled(true)):');
console.log(compiled(true));

console.log('\nRendering without color (compiled(false)):');
console.log(compiled(false));
