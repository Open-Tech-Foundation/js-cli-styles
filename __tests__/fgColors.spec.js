import { style } from '../src/index';

describe('esCliStyles', () => {
  test('Standard foreground colors', () => {
    expect(style('~red{abc}')).toEqual('\x1B[38;2;255;65;54mabc\x1B[39;2;m');
    expect(style('~blue{abc}')).toEqual('\x1B[38;2;0;116;217mabc\x1B[39;2;m');
    expect(style('~green{abc}')).toEqual('\x1B[38;2;46;204;64mabc\x1B[39;2;m');
    expect(style('~orange{abc}')).toEqual(
      '\x1B[38;2;255;133;27mabc\x1B[39;2;m'
    );
    expect(style('~navy{abc}')).toEqual('\x1B[38;2;0;31;63mabc\x1B[39;2;m');
    expect(style('~aqua{abc}')).toEqual('\x1B[38;2;127;219;255mabc\x1B[39;2;m');
    expect(style('~teal{abc}')).toEqual('\x1B[38;2;57;204;204mabc\x1B[39;2;m');
    expect(style('~purple{abc}')).toEqual(
      '\x1B[38;2;177;13;201mabc\x1B[39;2;m'
    );
    expect(style('~fuchsia{abc}')).toEqual(
      '\x1B[38;2;240;18;190mabc\x1B[39;2;m'
    );
    expect(style('~maroon{abc}')).toEqual('\x1B[38;2;133;20;75mabc\x1B[39;2;m');
    expect(style('~yellow{abc}')).toEqual('\x1B[38;2;255;220;0mabc\x1B[39;2;m');
    expect(style('~olive{abc}')).toEqual('\x1B[38;2;61;153;112mabc\x1B[39;2;m');
    expect(style('~lime{abc}')).toEqual('\x1B[38;2;1;255;112mabc\x1B[39;2;m');
    expect(style('~black{abc}')).toEqual('\x1B[38;2;17;17;17mabc\x1B[39;2;m');
    expect(style('~gray{abc}')).toEqual('\x1B[38;2;170;170;170mabc\x1B[39;2;m');
    expect(style('~silver{abc}')).toEqual(
      '\x1B[38;2;221;221;221mabc\x1B[39;2;m'
    );
    expect(style('~white{abc}')).toEqual(
      '\x1B[38;2;255;255;255mabc\x1B[39;2;m'
    );
  });
});
