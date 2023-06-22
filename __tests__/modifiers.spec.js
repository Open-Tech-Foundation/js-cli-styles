import { style } from '../src/index';

describe('Modifiers', () => {
  it('renders default style', () => {
    expect(style('$r{RED $res{Normal} RED}')).toEqual(
      '\x1B[38;2;255;65;54mRED \x1B[0m\x1B[38;2;255;65;54;0mNormal\x1B[0m\x1B[38;2;255;65;54m RED\x1B[0m'
    );
  });

  it('renders normal style', () => {
    expect(style('$bol{BOLD $nor{NORMAL} BOLD}')).toEqual(
      '\x1B[1mBOLD \x1B[0m\x1B[1;22mNORMAL\x1B[0m\x1B[1m BOLD\x1B[0m'
    );
  });

  it('blinks text', () => {
    expect(style('$blk{SALE}')).toEqual('\x1B[5mSALE\x1B[0m');
  });

  it('renders double underline text', () => {
    expect(style('$dun{text}')).toEqual('\x1B[21mtext\x1B[0m');
  });

  it('renders hidden text', () => {
    expect(style('$hid{text}')).toEqual('\x1B[8mtext\x1B[0m');
  });

  it('renders overline text', () => {
    expect(style('$ovl{text}')).toEqual('\x1B[53mtext\x1B[0m');
  });

  it('renders bold text', () => {
    expect(style('$bol{text}')).toEqual('\x1B[1mtext\x1B[0m');
  });

  it('renders dim text', () => {
    expect(style('$dim{text}')).toEqual('\x1B[2mtext\x1B[0m');
  });

  it('renders italic text', () => {
    expect(style('$ita{text}')).toEqual('\x1B[3mtext\x1B[0m');
  });

  it('renders underline text', () => {
    expect(style('$und{text}')).toEqual('\x1B[4mtext\x1B[0m');
  });

  it('renders inv text', () => {
    expect(style('$inv{text}')).toEqual('\x1B[7mtext\x1B[0m');
  });

  it('renders strikethrough text', () => {
    expect(style('$str{text}')).toEqual('\x1B[9mtext\x1B[0m');
  });
});
