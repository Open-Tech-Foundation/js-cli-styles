import { style } from '../src';

beforeAll(() => {
  process.env.FORCE_COLOR = 3;
});

afterAll(() => {
  delete process.env.FORCE_COLOR;
});

describe('cases', () => {
  it('renders plain text', () => {
    expect(style('This is a normal text without any styles.')).toEqual(
      'This is a normal text without any styles.'
    );
  });

  it('renders plain text with $ sign in it', () => {
    expect(style('Price: $8.00')).toEqual('Price: $8.00');
  });

  it('renders styles with normal $ sign in a text', () => {
    expect(style('Price: $8.00 $g.blk{OFFER!}')).toEqual(
      'Price: $8.00 \x1B[38;2;46;204;64;5mOFFER!\x1B[0m'
    );
  });

  it('renders simple nested colors', () => {
    expect(style('$r{red $g{green} red}')).toEqual(
      '\x1B[38;2;255;65;54mred \x1B[0m\x1B[38;2;46;204;64mgreen\x1B[0m\x1B[38;2;255;65;54m red\x1B[0m'
    );
  });

  it('renders $ signs inbetween styles', () => {
    expect(style('$$r{\\$}$')).toEqual('$\x1B[38;2;255;65;54m$\x1B[0m$');
  });
});
