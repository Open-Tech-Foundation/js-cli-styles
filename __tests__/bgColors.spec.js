import { style } from '../lib/index.js';

describe('esCliStyles', () => {
  test('Standard background colors', () => {
    expect(style('~bgRed{abc}')).toEqual('\x1B[48;2;255;65;54mabc\x1B[39;2;m');
    expect(style('~bgBlue{abc}')).toEqual('\x1B[48;2;0;116;217mabc\x1B[39;2;m');
    expect(style('~bgGreen{abc}')).toEqual(
      '\x1B[48;2;46;204;64mabc\x1B[39;2;m'
    );
    expect(style('~bgOrange{abc}')).toEqual(
      '\x1B[48;2;255;133;27mabc\x1B[39;2;m'
    );
    expect(style('~bgNavy{abc}')).toEqual('\x1B[48;2;0;31;63mabc\x1B[39;2;m');
    expect(style('~bgAqua{abc}')).toEqual(
      '\x1B[48;2;127;219;255mabc\x1B[39;2;m'
    );
    expect(style('~bgTeal{abc}')).toEqual(
      '\x1B[48;2;57;204;204mabc\x1B[39;2;m'
    );
    expect(style('~bgPurple{abc}')).toEqual(
      '\x1B[48;2;177;13;201mabc\x1B[39;2;m'
    );
    expect(style('~bgFuchsia{abc}')).toEqual(
      '\x1B[48;2;240;18;190mabc\x1B[39;2;m'
    );
    expect(style('~bgMaroon{abc}')).toEqual(
      '\x1B[48;2;133;20;75mabc\x1B[39;2;m'
    );
    expect(style('~bgYellow{abc}')).toEqual(
      '\x1B[48;2;255;220;0mabc\x1B[39;2;m'
    );
    expect(style('~bgOlive{abc}')).toEqual(
      '\x1B[48;2;61;153;112mabc\x1B[39;2;m'
    );
    expect(style('~bgLime{abc}')).toEqual('\x1B[48;2;1;255;112mabc\x1B[39;2;m');
    expect(style('~bgBlack{abc}')).toEqual('\x1B[48;2;17;17;17mabc\x1B[39;2;m');
    expect(style('~bgGray{abc}')).toEqual(
      '\x1B[48;2;170;170;170mabc\x1B[39;2;m'
    );
    expect(style('~bgSilver{abc}')).toEqual(
      '\x1B[48;2;221;221;221mabc\x1B[39;2;m'
    );
    expect(style('~bgWhite{abc}')).toEqual(
      '\x1B[48;2;255;255;255mabc\x1B[39;2;m'
    );
  });
});
