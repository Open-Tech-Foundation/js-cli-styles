const standardColors: Record<string, string> = {
  blue: '0;116;217',
  red: '255;65;54',
  green: '46;204;64',
  orange: '255;133;27',
  navy: '0;31;63',
  aqua: '127;219;255',
  teal: '57;204;204',
  purple: '177;13;201',
  fuchsia: '240;18;190',
  maroon: '133;20;75',
  yellow: '255;220;0',
  olive: '61;153;112',
  lime: '1;255;112',
  black: '17;17;17',
  gray: '170;170;170',
  silver: '221;221;221',
  white: '255;255;255',
};

function applyStyles(str: string, color: string): string {
  const reset = `\x1B[39;2;m`;
  const ansiColorCode = `\x1B[38;2;${standardColors[color]}m`;

  return ansiColorCode + str + reset;
}

export default applyStyles;
