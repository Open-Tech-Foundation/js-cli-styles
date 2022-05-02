import { style } from '../src/index';

describe('Italic style', () => {
  it('does not make text italic', () => {
    expect(style('~{abc}')).not.toEqual('\x1B[3;38;2mabc\x1B[39;2;m');
  });

  test('italic text', () => {
    expect(style('~italic{abc}')).toEqual('\x1B[3;38;2mabc\x1B[39;2;m');
  });
});
