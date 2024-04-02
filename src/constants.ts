export const ANSI_START = '\x1B[';

export const ANSI_END = 'm';

export const RESET = '\x1B[0m';

export const FG_CODE = '38;2;';

export const BG_CODE = '48;2;';

export const UND_COLOR_CODE = '58:2:0:';

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
  c: '154;236;254', // Cyan
  n: '0;31;63', // Navy
  a: '127;219;255', // Aqua
  t: '57;204;204', // Teal
  p: '177;13;201', // Purple
  f: '240;18;190', // Fuchsia
  ma: '133;20;75', // Maroon
  ol: '61;153;112', // Olive
  li: '1;255;112', // Lime
  s: '221;221;221', // Silver
  pi: '255;191;203', // Pink
} as const;

export const MODIFIERS = {
  dfg: '39', // Default foreground color
  dbg: '49', // Default background color
  res: '0', // Reset
  nor: '22', // Normal intensity
  blk: '5', // Blink
  nob: '25', // No Blink
  hid: '8', // Hidden
  vis: '28', // Visible
  ovl: '53', // Overline
  noo: '55', // No Overline
  bol: '1', // Bold
  dim: '2', // Dimmed text
  ita: '3', // Italic
  inv: '7', // Inverse fg to bg & vice versa
  noi: '27', // Not inversed
  str: '9', // Strikethrough
  nos: '29', // No Strikethrough
  und: '4', // Straight underline
  dbu: '21', // Double underline
  nou: '24', // No underline
  cru: '4:3', // Curly underline
  dou: '4:4', // Dotted underline
  dau: '4:5', // Dashed underline
  ruc: '59', // Reset underline color
} as const;
