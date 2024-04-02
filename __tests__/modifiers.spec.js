import { style } from '../src/index';

beforeAll(() => {
  process.env.FORCE_COLOR = 3;
});

afterAll(() => {
  delete process.env.FORCE_COLOR;
});

describe('Modifiers', () => {
  it('renders default style', () => {
    expect(style('$r{RED $res{Normal} RED}')).toEqual(
      '\x1B[38;2;255;65;54mRED \x1B[0m\x1B[0mNormal\x1B[0m\x1B[38;2;255;65;54m RED\x1B[0m'
    );
  });

  it('renders normal style', () => {
    expect(style('$bol{BOLD $nor{NORMAL} BOLD}')).toEqual(
      '\x1B[1mBOLD \x1B[0m\x1B[22mNORMAL\x1B[0m\x1B[1m BOLD\x1B[0m'
    );
  });

  it('blinks text', () => {
    expect(style('$blk{SALE}')).toEqual('\x1B[5mSALE\x1B[0m');
  });

  it('renders no blinking text', () => {
    expect(style('$nob{Offer sale}')).toEqual('\u001B[25mOffer sale\u001B[0m');
  });

  it('renders hidden text', () => {
    expect(style('$hid{text}')).toEqual('\x1B[8mtext\x1B[0m');
  });

  it('renders visible text inside hidden text', () => {
    expect(style('Email: $hid{user12345$vis{@example.com}}')).toEqual(
      'Email: \u001B[8muser12345\u001B[0m\u001B[28m@example.com\u001B[0m\u001B[8m\u001B[0m'
    );
  });

  it('renders overline text', () => {
    expect(style('$ovl{text}')).toEqual('\x1B[53mtext\x1B[0m');
  });

  it('renders no overline text', () => {
    expect(style('$noo{text}')).toEqual('\x1B[55mtext\x1B[0m');
  });

  it('renders bold text', () => {
    expect(style('$bol{text}')).toEqual('\x1B[1mtext\x1B[0m');
  });

  it('renders italic text', () => {
    expect(style('$ita{text}')).toEqual('\x1B[3mtext\x1B[0m');
  });

  it('renders inversed text', () => {
    expect(style('$inv{text}')).toEqual('\x1B[7mtext\x1B[0m');
  });

  it('renders not inversed text', () => {
    expect(style('$noi{text}')).toEqual('\x1B[27mtext\x1B[0m');
  });

  it('renders strikethrough text', () => {
    expect(style('$str{text}')).toEqual('\x1B[9mtext\x1B[0m');
  });

  it('renders not strikethrough text', () => {
    expect(style('$nos{text}')).toEqual('\x1B[29mtext\x1B[0m');
  });

  it('renders pink color text after dim, bold & nor', () => {
    expect(style(`$pi.dim.bol.nor{-> Node.js process.version}`)).toEqual(
      '\u001B[38;2;255;191;203m\u001B[22m-> Node.js process.version\u001B[0m'
    );
  });
});
