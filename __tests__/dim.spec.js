import { style } from '../src/index';

describe('Dim style', () => {
  it('does not make text dim', () => {
    expect(style('~{abc}')).not.toEqual('\x1B[2;38;2mabc\x1B[39;2;m');
    expect(style('~faint{abc}')).not.toEqual('\x1B[2;38;2mabc\x1B[39;2;m');
    expect(style('~dull{abc}')).not.toEqual('\x1B[2;38;2mabc\x1B[39;2;m');
  });

  test('dim text', () => {
    expect(style('~dim{abc}')).toEqual('\x1B[2;38;2mabc\x1B[39;2;m');
  });
});
