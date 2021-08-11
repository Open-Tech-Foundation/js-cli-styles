import { style } from '../lib/index.esm.js';

describe('Strike style', () => {
  it('does not make text strike', () => {
    expect(style('~s{abc}')).not.toEqual('\x1B[9;38;2mabc\x1B[39;2;m');
    expect(style('~strikethrought{abc}')).not.toEqual(
      '\x1B[9;38;2mabc\x1B[39;2;m'
    );
  });

  test('strike text', () => {
    expect(style('~strike{abc}')).toEqual('\x1B[9;38;2mabc\x1B[39;2;m');
  });
});
