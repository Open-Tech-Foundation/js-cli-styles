import { style } from '../src/index';

describe('Inverse style', () => {
  it('does not make text inverse', () => {
    expect(style('~i{abc}')).not.toEqual('\x1B[7;38;2mabc\x1B[39;2;m');
    expect(style('~invert{abc}')).not.toEqual('\x1B[7;38;2mabc\x1B[39;2;m');
  });

  test('inverse text', () => {
    expect(style('~inverse{abc}')).toEqual('\x1B[7;38;2mabc\x1B[39;2;m');
  });
});
