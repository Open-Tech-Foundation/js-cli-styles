import { style } from '../src/index';

beforeAll(() => {
  process.env.FORCE_COLOR = 3;
});

afterAll(() => {
  delete process.env.FORCE_COLOR;
});

describe('Underline', () => {
  it('renders straight underline text', () => {
    expect(style('$und{Straight Underline}')).toEqual(
      '\x1B[4mStraight Underline\x1B[0m'
    );
  });

  it('renders straight underline text with no underline', () => {
    expect(
      style('$und{Straight $nou{(No underline here)}  underline}')
    ).toEqual(
      '\u001B[4mStraight \u001B[0m\u001B[24m(No underline here)\u001B[0m\u001B[4m  underline\u001B[0m'
    );
  });

  it('renders doubly underline text', () => {
    expect(style('$dbu{Double underline}')).toEqual(
      '\u001B[21mDouble underline\u001B[0m'
    );
  });

  it('renders curly underline text', () => {
    expect(style('$cru{Curly underline}')).toEqual(
      '\u001B[4:3mCurly underline\u001B[0m'
    );
  });

  it('renders dotted underline text', () => {
    expect(style('$dou{Dotted underline}')).toEqual(
      '\u001B[4:4mDotted underline\u001B[0m'
    );
  });

  it('renders dashed underline text', () => {
    expect(style('$dau{Dashed underline}')).toEqual(
      '\u001B[4:5mDashed underline\u001B[0m'
    );
  });

  it('renders straight colored underline text', () => {
    expect(style('$und.ug{Straight underline colored}')).toEqual(
      '\u001B[4m\u001B[58:2:0:46:204:64mStraight underline colored\u001B[0m'
    );
  });

  it('renders doubly colored underline text', () => {
    expect(style('$dbu.uy{Double underline colored}')).toEqual(
      '\u001B[21m\u001B[58:2:0:255:220:0mDouble underline colored\u001B[0m'
    );
  });

  it('renders curly colored underline text', () => {
    expect(style('$cru.ur{Curly underline colored}')).toEqual(
      '\u001B[4:3m\u001B[58:2:0:255:65:54mCurly underline colored\u001B[0m'
    );
  });

  it('renders dotted colored underline text', () => {
    expect(style('$dou.ub{Dotted underline colored}')).toEqual(
      '\u001B[4:4m\u001B[58:2:0:0:116:217mDotted underline colored\u001B[0m'
    );
  });

  it('renders dashed colored underline text', () => {
    expect(style('$dau.uo{Dashed underline colored}')).toEqual(
      '\u001B[4:5m\u001B[58:2:0:255:133:27mDashed underline colored\u001B[0m'
    );
  });

  it('renders staight rgb colored', () => {
    expect(
      style('$und.urgb(100,200,255){Straight underline $ug{RGB} colored}')
    ).toEqual(
      '\u001B[4m\u001B[58:2:0:100:200:255mStraight underline \u001B[0m\u001B[4m\u001B[58:2:0:46:204:64mRGB\u001B[0m\u001B[4m\u001B[58:2:0:100:200:255m colored\u001B[0m'
    );
  });

  it('renders default colored underline between blue colored text', () => {
    expect(style('$und.ub{Straight $ruc{underline reset} colored}')).toEqual(
      '\u001B[4m\u001B[58:2:0:0:116:217mStraight \u001B[0m\u001B[4m\u001B[59munderline reset\u001B[0m\u001B[4m\u001B[58:2:0:0:116:217m colored\u001B[0m'
    );
  });
});
