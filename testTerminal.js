import { style } from './lib/index.js';

function run(str) {
  console.log();
  console.log(str);
  console.log();
  console.log(style(str));
  console.log();
}

run('I like 🍊 ~orange{oranges}');

run(
  `An ~red{apple} is red but the ~green{leaves} are green, came in a blue ~blue{box}`
);

run(
  `~blue{This is a long blue text with some ~red{red} & ~green{green} color in it}`
);

run('~bold.white.bgGreen{ PASS }');

run('~inverse.red.bgWhite{ FAILED }');

function warning(str) {
  return style(`⚠️  ~bold.black.bgYellow{${str}}`);
}

console.log(warning(' CAUTION '));
console.log('');

run('~dim{TEXT}');

run('~italic.fuchsia.bold.bgWhite{ Beautiful Text }');

run('Highlighted fruits: ~underline{Apple}, cat, ~underline{Banana}');

run('~strike.red{Deleted file.ext}');

run('~rgb(197, 24, 117){Some random rgb text}');

run('~rgb(157,154,117){RGB text without space}');

run('~bgRgb(5, 255, 55).navy.bold{Some random rgb text}');

run('~inverse{inverse}');

const path = 'C:\\Users\\RUNNER~1\\AppData\\Local\\Temp\\node_rm_xyz';

run(`~red{ENOENT: no such file or directory, scandir '${path}'}`);
