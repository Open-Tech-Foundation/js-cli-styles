import { style } from '../lib/index.esm.js';

describe('Bold style', () => {
  it('does not make text bold', () => {
    expect(style('~{abc}')).not.toEqual('\x1B[1;38;2mabc\x1B[39;2;m');
    expect(style('~strong{abc}')).not.toEqual('\x1B[1;38;2mabc\x1B[39;2;m');
    expect(style('~bright{abc}')).not.toEqual('\x1B[1;38;2mabc\x1B[39;2;m');
  });

  test('Bold text', () => {
    expect(style('~bold{abc}')).toEqual('\x1B[1;38;2mabc\x1B[39;2;m');
  });
});
