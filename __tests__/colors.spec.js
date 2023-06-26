import { style } from '../src';

beforeAll(() => {
  process.env.FORCE_COLOR = 3;
});

afterAll(() => {
  delete process.env.FORCE_COLOR;
});

describe('colors', () => {
  it('renders red fg color', () => {
    expect(style('$r{RED}')).toEqual('\x1B[38;2;255;65;54mRED\x1B[0m');
  });

  it('renders green fg color', () => {
    expect(style('$g{GREEN}')).toEqual('\x1B[38;2;46;204;64mGREEN\x1B[0m');
  });

  it('renders blue fg color', () => {
    expect(style('$b{BLUE}')).toEqual('\x1B[38;2;0;116;217mBLUE\x1B[0m');
  });

  it('renders orange fg color', () => {
    expect(style('$o{ORANGE}')).toEqual('\x1B[38;2;255;133;27mORANGE\x1B[0m');
  });

  it('renders yellow fg color', () => {
    expect(style('$y{YELLOW}')).toEqual('\x1B[38;2;255;220;0mYELLOW\x1B[0m');
  });

  it('renders white fg color', () => {
    expect(style('$w{WHITE}')).toEqual('\x1B[38;2;255;255;255mWHITE\x1B[0m');
  });

  it('renders black fg color', () => {
    expect(style('$bl{BLACK}')).toEqual('\x1B[38;2;17;17;17mBLACK\x1B[0m');
  });

  it('renders grey fg color', () => {
    expect(style('$gr{GREY}')).toEqual('\x1B[38;2;170;170;170mGREY\x1B[0m');
  });

  it('renders navy fg color', () => {
    expect(style('$navy{NAVY}')).toEqual('\x1B[38;2;0;31;63mNAVY\x1B[0m');
  });

  it('renders aqua fg color', () => {
    expect(style('$aqua{AQUA}')).toEqual('\x1B[38;2;127;219;255mAQUA\x1B[0m');
  });

  it('renders teal fg color', () => {
    expect(style('$teal{TEAL}')).toEqual('\x1B[38;2;57;204;204mTEAL\x1B[0m');
  });

  it('renders purple fg color', () => {
    expect(style('$purple{PURPLE}')).toEqual(
      '\x1B[38;2;177;13;201mPURPLE\x1B[0m'
    );
  });

  it('renders fuchsia fg color', () => {
    expect(style('$fuchsia{FUCHSIA}')).toEqual(
      '\x1B[38;2;240;18;190mFUCHSIA\x1B[0m'
    );
  });

  it('renders maroon fg color', () => {
    expect(style('$maroon{MAROON}')).toEqual(
      '\x1B[38;2;133;20;75mMAROON\x1B[0m'
    );
  });

  it('renders olive fg color', () => {
    expect(style('$olive{OLIVE}')).toEqual('\x1B[38;2;61;153;112mOLIVE\x1B[0m');
  });

  it('renders lime fg color', () => {
    expect(style('$lime{LIME}')).toEqual('\x1B[38;2;1;255;112mLIME\x1B[0m');
  });

  it('renders silver fg color', () => {
    expect(style('$silver{SILVER}')).toEqual(
      '\x1B[38;2;221;221;221mSILVER\x1B[0m'
    );
  });

  it('renders bg red color', () => {
    expect(style('$bgr{RED}')).toEqual('\x1B[48;2;255;65;54mRED\x1B[0m');
  });

  it('renders bg green color', () => {
    expect(style('$bgg{GREEN}')).toEqual('\x1B[48;2;46;204;64mGREEN\x1B[0m');
  });

  it('renders bg blue color', () => {
    expect(style('$bgb{BLUE}')).toEqual('\x1B[48;2;0;116;217mBLUE\x1B[0m');
  });

  it('renders bg orange color', () => {
    expect(style('$bgo{ORANGE}')).toEqual('\x1B[48;2;255;133;27mORANGE\x1B[0m');
  });

  it('renders bg yellow color', () => {
    expect(style('$bgy{YELLOW}')).toEqual('\x1B[48;2;255;220;0mYELLOW\x1B[0m');
  });

  it('renders bg white color', () => {
    expect(style('$bgw{WHITE}')).toEqual('\x1B[48;2;255;255;255mWHITE\x1B[0m');
  });

  it('renders bg black color', () => {
    expect(style('$bgbl{BLACK}')).toEqual('\x1B[48;2;17;17;17mBLACK\x1B[0m');
  });

  it('renders bg grey color', () => {
    expect(style('$bggr{GREY}')).toEqual('\x1B[48;2;170;170;170mGREY\x1B[0m');
  });

  it('renders bg navy color', () => {
    expect(style('$bgnavy{NAVY}')).toEqual('\x1B[48;2;0;31;63mNAVY\x1B[0m');
  });

  it('renders bg aqua color', () => {
    expect(style('$bgaqua{AQUA}')).toEqual('\x1B[48;2;127;219;255mAQUA\x1B[0m');
  });

  it('renders bg teal color', () => {
    expect(style('$bgteal{TEAL}')).toEqual('\x1B[48;2;57;204;204mTEAL\x1B[0m');
  });

  it('renders bg purple color', () => {
    expect(style('$bgpurple{PURPLE}')).toEqual(
      '\x1B[48;2;177;13;201mPURPLE\x1B[0m'
    );
  });

  it('renders bg fuchsia color', () => {
    expect(style('$bgfuchsia{FUCHSIA}')).toEqual(
      '\x1B[48;2;240;18;190mFUCHSIA\x1B[0m'
    );
  });

  it('renders bg maroon color', () => {
    expect(style('$bgmaroon{MAROON}')).toEqual(
      '\x1B[48;2;133;20;75mMAROON\x1B[0m'
    );
  });

  it('renders bg olive color', () => {
    expect(style('$bgolive{OLIVE}')).toEqual(
      '\x1B[48;2;61;153;112mOLIVE\x1B[0m'
    );
  });

  it('renders bg lime color', () => {
    expect(style('$bglime{LIME}')).toEqual('\x1B[48;2;1;255;112mLIME\x1B[0m');
  });

  it('renders bg silver color', () => {
    expect(style('$bgsilver{SILVER}')).toEqual(
      '\x1B[48;2;221;221;221mSILVER\x1B[0m'
    );
  });

  it('renders multiple fg colors', () => {
    expect(style('$r{RED}$g{GREEN}$b{BLUE}')).toEqual(
      '\x1B[38;2;255;65;54mRED\x1B[0m\x1B[38;2;46;204;64mGREEN\x1B[0m\x1B[38;2;0;116;217mBLUE\x1B[0m'
    );
  });

  it('renders nested colors', () => {
    expect(
      style(
        "$bgbl.b{THE QUICK $g{BROWN $r{CAT} JUMPED} OVER THE LAZY $r{DOG}'S BACK}"
      )
    ).toEqual(
      "\x1B[48;2;17;17;17;38;2;0;116;217mTHE QUICK \x1B[0m\x1B[48;2;17;17;17;38;2;46;204;64mBROWN \x1B[0m\x1B[48;2;17;17;17;38;2;255;65;54mCAT\x1B[0m\x1B[48;2;17;17;17;38;2;46;204;64m JUMPED\x1B[0m\x1B[48;2;17;17;17;38;2;0;116;217m OVER THE LAZY \x1B[0m\x1B[48;2;17;17;17;38;2;255;65;54mDOG\x1B[0m\x1B[48;2;17;17;17;38;2;0;116;217m'S BACK\x1B[0m"
    );
  });

  it('renders rgb fg color', () => {
    expect(style('$rgb(255,0,0){RED}')).toEqual('\x1B[38;2;255;0;0mRED\x1B[0m');
    expect(style('$rgb(0, 255, 0){RED}')).toEqual(
      '\x1B[38;2;0;255;0mRED\x1B[0m'
    );
  });

  it('renders bg rgb color', () => {
    expect(style('$bgrgb(255,0,0){RED}')).toEqual(
      '\x1B[48;2;255;0;0mRED\x1B[0m'
    );
  });

  it('renders hex fg color', () => {
    expect(style('$hex(#ff0000){RED}')).toEqual('\x1B[38;2;255;0;0mRED\x1B[0m');
  });

  it('renders hex bg color', () => {
    expect(style('$bghex(#DDDDDD){COLOR}')).toEqual(
      '\x1B[48;2;221;221;221mCOLOR\x1B[0m'
    );
  });

  it('renders the last color', () => {
    expect(style('$r.rgb(0,255,0).hex(#0000ff){COLOR}')).toEqual(
      '\x1B[38;2;0;0;255mCOLOR\x1B[0m'
    );
    expect(style('$hex(#0000ff).r.rgb(0,255,0){COLOR}')).toEqual(
      '\x1B[38;2;0;255;0mCOLOR\x1B[0m'
    );
    expect(style('$rgb(0,255,0).hex(#0000ff).r{COLOR}')).toEqual(
      '\x1B[38;2;255;65;54mCOLOR\x1B[0m'
    );
  });

  it('renders with color when color option true', () => {
    expect(
      style('This is will be normal $r{RED} string', { color: true })
    ).toEqual('This is will be normal \x1B[38;2;255;65;54mRED\x1B[0m string');
  });

  it('renders without color when color option false', () => {
    expect(
      style('This is will be normal $r{RED} string', { color: false })
    ).toEqual('This is will be normal RED string');
  });
});
