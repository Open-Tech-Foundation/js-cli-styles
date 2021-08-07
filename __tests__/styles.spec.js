import { style } from '../lib/index.js';

describe('Styles', () => {
  it('renders two fg colors in a text', () => {
    expect(style('~red{abc}~green{efg}')).toEqual(
      '\x1B[38;2;255;65;54mabc\x1B[39;2;m\x1B[38;2;46;204;64mefg\x1B[39;2;m'
    );
  });

  it('renders multiple fg colors in a text', () => {
    expect(
      style(
        'An ~red{apple} is red but the ~green{leaves} are green, came in a blue ~blue{box}'
      )
    ).toEqual(
      'An \x1B[38;2;255;65;54mapple\x1B[39;2;m is red but the \x1B[38;2;46;204;64mleaves\x1B[39;2;m are green, came in a blue \x1B[38;2;0;116;217mbox\x1B[39;2;m'
    );
  });

  it('renders nested fg colors in a text', () => {
    expect(
      style(
        '~blue{This is a long blue text with some ~red{red} & ~green{green} color in it}'
      )
    ).toEqual(
      '\x1B[38;2;0;116;217mThis is a long blue text with some \x1B[39;2;m\x1B[38;2;255;65;54mred\x1B[39;2;m\x1B[38;2;0;116;217m & \x1B[39;2;m\x1B[38;2;46;204;64mgreen\x1B[39;2;m\x1B[38;2;0;116;217m color in it\x1B[39;2;m'
    );
  });

  it('renders bold white text with green bg', () => {
    expect(style('~bold.white.bgGreen{ PASS }')).toEqual(
      '\x1B[48;2;46;204;64m\x1B[1;38;2m\x1B[38;2;255;255;255m PASS \x1B[39;2;m\x1B[39;2;m\x1B[39;2;m'
    );
  });

  it('inverse the fg into bg & vice versa text', () => {
    expect(style('~inverse.red.bgWhite{ FAILED }')).toEqual(
      '\x1B[48;2;255;255;255m\x1B[7;38;2m\x1B[38;2;255;65;54m FAILED \x1B[39;2;m\x1B[39;2;m\x1B[39;2;m'
    );
  });

  it('renders a dim red text', () => {
    expect(style('~inverse.red.bgWhite{ FAILED }')).toEqual(
      '\x1B[48;2;255;255;255m\x1B[7;38;2m\x1B[38;2;255;65;54m FAILED \x1B[39;2;m\x1B[39;2;m\x1B[39;2;m'
    );
  });

  it('renders a RGB fg color with space', () => {
    expect(style('~rgb(0, 255, 0){RGB}')).toEqual(
      '\x1B[38;2;0;255;0mRGB\x1B[39;2;m'
    );
  });

  it('renders a RGB fg color without space', () => {
    expect(style('~rgb(0,255,0){RGB}')).toEqual(
      '\x1B[38;2;0;255;0mRGB\x1B[39;2;m'
    );
  });

  it('renders a bg RGB fg color with space', () => {
    expect(style('~bgRgb(0, 255, 0){RGB}')).toEqual(
      '\x1B[48;2;0;255;0mRGB\x1B[39;2;m'
    );
  });

  it('renders a bg RGB fg color without space', () => {
    expect(style('~bgRgb(0,255,0){RGB}')).toEqual(
      '\x1B[48;2;0;255;0mRGB\x1B[39;2;m'
    );
  });

  it('renders fg color text with ~ tilde char in it', () => {
    const path = 'C:\\Users\\RUNNER~1\\AppData\\Local\\Temp\\node_rm_xyz';

    expect(
      style(`~red{ENOENT: no such file or directory, scandir '${path}'}`)
    ).toEqual(
      `\x1B[38;2;255;65;54mENOENT: no such file or directory, scandir 'C:\\Users\\RUNNER~1\\AppData\\Local\\Temp\\node_rm_xyz'\x1B[39;2;m`
    );
  });
});
