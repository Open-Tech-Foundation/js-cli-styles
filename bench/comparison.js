// benchmark.js
import { Bench } from 'tinybench';
import { style, compile } from '../dist/index.js';
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
const memoryHooks = {
  beforeAll() {
    global.gc?.();
    this.startMem = process.memoryUsage().heapUsed;
  },
  afterAll() {
    global.gc?.();
    this.heapUsedKB = Math.round(
      (process.memoryUsage().heapUsed - this.startMem) / 1024
    );
  },
};

console.log('Running benchmarks...\n');

bench
  // SIMPLE
  .add('chalk - simple', () => chalk.red.bold('RED'), memoryHooks)
  .add('picocolors - simple', () => pc.red(pc.bold('RED')), memoryHooks)
  .add('kleur - simple', () => kleur.red().bold('RED'), memoryHooks)
  .add('ansis - simple', () => ansis.red.bold('RED'), memoryHooks)
  .add('ansi-colors - simple', () => ansiColors.red.bold('RED'), memoryHooks)
  .add('@opentf/cli-styles - simple', () => style('$r.bol{RED}'), memoryHooks)
  .add(
    '@opentf/cli-styles - simple (compiled)',
    () => compiledSimple(true),
    memoryHooks
  )

  // NESTED
  .add(
    'chalk - nested',
    () =>
      chalk.bgBlack.blue(
        `THE QUICK ${chalk.green(
          `BROWN ${chalk.red('CAT')} JUMPED`
        )} OVER THE LAZY ${chalk.red("DOG'S BACK")}`
      ),
    memoryHooks
  )
  .add(
    'picocolors - nested',
    () =>
      pc.bgBlack(
        pc.blue(
          `THE QUICK ${pc.green(
            `BROWN ${pc.red('CAT')} JUMPED`
          )} OVER THE LAZY ${pc.red("DOG'S BACK")}`
        )
      ),
    memoryHooks
  )
  .add(
    'kleur - nested',
    () =>
      kleur.bgBlack().blue(
        `THE QUICK ${kleur.green(
          `BROWN ${kleur.red('CAT')} JUMPED`
        )} OVER THE LAZY ${kleur.red("DOG'S BACK")}`
      ),
    memoryHooks
  )
  .add(
    'ansis - nested',
    () =>
      ansis.bgBlack.blue(
        `THE QUICK ${ansis.green(
          `BROWN ${ansis.red('CAT')} JUMPED`
        )} OVER THE LAZY ${ansis.red("DOG'S BACK")}`
      ),
    memoryHooks
  )
  .add(
    'ansi-colors - nested',
    () =>
      ansiColors.bgBlack(
        ansiColors.blue(
          `THE QUICK ${ansiColors.green(`BROWN ${ansiColors.red('CAT')} JUMPED`)} OVER THE LAZY ${ansiColors.red("DOG'S BACK")}`
        )
      ),
    memoryHooks
  )
  .add('@opentf/cli-styles - nested', () => style(complexStr), memoryHooks)
  .add(
    '@opentf/cli-styles - nested (compiled)',
    () => compiledComplex(true),
    memoryHooks
  );

await bench.run();

console.table(
  bench.table().map((row) => ({
    'Task Name': row['Task Name'],
    'ops/sec': row['ops/sec'],
    'Avg Time (ns)': row['Average Time (ns)'],
    Margin: row.Margin,
    'Heap Δ (KB)':
      bench.tasks.find((t) => t.name === row['Task Name'])?.heapUsedKB || 0,
  }))
);
