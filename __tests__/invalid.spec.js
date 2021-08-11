import { style } from '../lib/index.esm.js';

describe('Invalid', () => {
  test('Invalid parameters', () => {
    expect(style()).toEqual('');
    expect(style([])).toEqual('');
    expect(style({})).toEqual('');
    expect(style(1)).toEqual('');
  });

  test('Invalid patterns', () => {
    expect(style('')).toEqual('');
    expect(style('~')).toEqual('~');
    expect(style('~r')).toEqual('~r');
    expect(style('~red')).toEqual('~red');
    expect(style('~red{')).toEqual('~red{');
    expect(style('~red()')).toEqual('~red()');
  });

  test('Unknown styles', () => {
    expect(style('~rad{abc}')).toEqual('abc');
    expect(style('~rad.red{abc}')).toEqual(
      '\x1B[38;2;255;65;54mabc\x1B[39;2;m'
    );
    expect(style('~rad.bgWhite{abc}')).toEqual(
      '\x1B[48;2;255;255;255mabc\x1B[39;2;m'
    );
    expect(style('~strikethrough{abc}')).toEqual('abc');
    expect(style('~brightRed{abc}')).not.toEqual(
      '\x1B[38;2;255;65;54mabc\x1B[39;2;m'
    );
  });
});
