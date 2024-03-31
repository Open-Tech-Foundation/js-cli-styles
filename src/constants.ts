export const ANSI_START = '\x1B[';

export const ANSI_END = 'm';

export const RESET = '\x1B[0m';

export const FG_CODE = '38;2;';

export const BG_CODE = '48;2;';

export const STANDARD_COLORS: Record<string, string> = {
  r: '255;65;54', // Red
  g: '46;204;64', // Green
  b: '0;116;217', // Blue
  o: '255;133;27', // Orange
  y: '255;220;0', // Yellow
  w: '255;255;255', // White
  bl: '17;17;17', // Black
  gr: '170;170;170', // Grey
  m: '255;105;193', // Magenta
  navy: '0;31;63',
  aqua: '127;219;255',
  teal: '57;204;204',
  purple: '177;13;201',
  fuchsia: '240;18;190',
  maroon: '133;20;75',
  olive: '61;153;112',
  lime: '1;255;112',
  silver: '221;221;221',
};

export const MODIFIERS: Record<string, string> = {
  res: '0',
  nor: '22',
  blk: '5',
  dun: '21',
  hid: '8',
  ovl: '53',
  bol: '1',
  dim: '2',
  ita: '3',
  und: '4',
  inv: '7',
  str: '9',
};
