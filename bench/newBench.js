// benchmark.js
import { Bench } from 'tinybench';
import { style, compile, clearCache } from '../dist/index.js';
import chalk from 'chalk';
import pc from 'picocolors';
import kleur from 'kleur';
import ansis from 'ansis';
import ansiColors from 'ansi-colors';

const bench = new Bench({ time: 100 });

const complexStr =
  "$bgbl.b{THE QUICK $g{BROWN $r{CAT} JUMPED} OVER THE LAZY $r{DOG}'S BACK}";
const compiledComplex = compile(complexStr);
const compiledSimple = compile('$r.bol{RED}');

console.log('Running benchmarks...\n');

bench
  // SIMPLE
  .add('chalk - simple', () => {
    chalk.red.bold('RED');
  })
  .add('picocolors - simple', () => {
    pc.red(pc.bold('RED'));
  })
  .add('kleur - simple', () => {
    kleur.red().bold('RED');
  })
  .add('ansis - simple', () => {
    ansis.red.bold('RED');
  })
  .add('ansi-colors - simple', () => {
    ansiColors.red(ansiColors.bold('RED'));
  })
  .add('@opentf/cli-styles - simple', () => {
    style('$r.bol{RED}');
  })
  .add('@opentf/cli-styles - simple (compiled)', () => {
    compiledSimple(true);
  })

  // NESTED
  .add('chalk - nested', () => {
    chalk.bgBlack.blue(
      `THE QUICK ${chalk.green(
        `BROWN ${chalk.red('CAT')} JUMPED`
      )} OVER THE LAZY ${chalk.red("DOG'S BACK")}`
    );
  })
  .add('picocolors - nested', () => {
    pc.bgBlack(
      pc.blue(
        `THE QUICK ${pc.green(
          `BROWN ${pc.red('CAT')} JUMPED`
        )} OVER THE LAZY ${pc.red("DOG'S BACK")}`
      )
    );
  })
  .add('kleur - nested', () => {
    kleur
      .bgBlack()
      .blue(
        `THE QUICK ${kleur.green(
          `BROWN ${kleur.red('CAT')} JUMPED`
        )} OVER THE LAZY ${kleur.red("DOG'S BACK")}`
      );
  })
  .add('ansis - nested', () => {
    ansis.bgBlack.blue(
      `THE QUICK ${ansis.green(
        `BROWN ${ansis.red('CAT')} JUMPED`
      )} OVER THE LAZY ${ansis.red("DOG'S BACK")}`
    );
  })
  .add('ansi-colors - nested', () => {
    ansiColors.bgBlack(
      ansiColors.blue(
        `THE QUICK ${ansiColors.green(
          `BROWN ${ansiColors.red('CAT')} JUMPED`
        )} OVER THE LAZY ${ansiColors.red("DOG'S BACK")}`
      )
    );
  })
  .add('@opentf/cli-styles - nested', () => {
    style(complexStr);
  })
  .add('@opentf/cli-styles - nested (compiled)', () => {
    compiledComplex(true);
  });

await bench.run();

// Format + print results
const table = bench
  .table()
  .filter((row) => row && row['Task Name'] && row['Task Name'] !== '---');

console.table(table);
