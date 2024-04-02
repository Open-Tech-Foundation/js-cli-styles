import { style } from '../src/index';

beforeAll(() => {
  process.env.FORCE_COLOR = 3;
});

afterAll(() => {
  delete process.env.FORCE_COLOR;
});

describe('Dim', () => {
  it('renders dim text', () => {
    expect(style('$dim{text}')).toEqual('\x1B[2mtext\x1B[0m');
  });

  it('renders dim text with color', () => {
    expect(style('$dim.r{text}')).toEqual(
      '\u001B[38;2;127;32;27mtext\u001B[0m'
    );
  });

  it('renders normal text inside dim', () => {
    expect(style('$dim{Some $nor{long} text}')).toEqual(
      '\u001B[2mSome \u001B[0m\u001B[2m\u001B[22mlong\u001B[0m\u001B[2m text\u001B[0m'
    );
  });

  it('renders bold color text inside dim', () => {
    expect(style('$dim{Some $bol.y{long} text}')).toEqual(
      '\u001B[2mSome \u001B[0m\u001B[1m\u001B[38;2;127;110;0mlong\u001B[0m\u001B[2m text\u001B[0m'
    );
  });

  it('renders nested dim text with color', () => {
    expect(style('$dim.r{Some $g{green} text}')).toEqual(
      '\u001B[38;2;127;32;27mSome \u001B[0m\u001B[38;2;23;102;32mgreen\u001B[0m\u001B[38;2;127;32;27m text\u001B[0m'
    );
  });

  it('renders normal text nested within dim text with color', () => {
    expect(
      style('$dim.r{Some $g{green text $nor{inside} some text} text}')
    ).toEqual(
      '\u001B[38;2;127;32;27mSome \u001B[0m\u001B[38;2;23;102;32mgreen text \u001B[0m\u001B[38;2;46;204;64m\u001B[22minside\u001B[0m\u001B[38;2;23;102;32m some text\u001B[0m\u001B[38;2;127;32;27m text\u001B[0m'
    );
  });

  it('renders rgb colored dim text within normal text', () => {
    expect(style('Normal $rgb(255, 150, 0).dim{dim text} text')).toEqual(
      'Normal \u001B[38;2;127;75;0mdim text\u001B[0m text'
    );
  });
});
