import { style } from '../src/index';

describe('Underline style', () => {
  it('does not make text underline', () => {
    expect(style('~u{abc}')).not.toEqual('\x1B[4;38;2mabc\x1B[39;2;m');
    expect(style('~under{abc}')).not.toEqual('\x1B[4;38;2mabc\x1B[39;2;m');
    expect(style('~line{abc}')).not.toEqual('\x1B[4;38;2mabc\x1B[39;2;m');
  });

  test('underline text', () => {
    expect(style('~underline{abc}')).toEqual('\x1B[4;38;2mabc\x1B[39;2;m');
  });
});
