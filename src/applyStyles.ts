const standardColors: Record<string, string> = {
  blue: '0;116;217',
  red: '255;65;54',
  green: '46;204;64',
};

function applyStyles(str: string, color: string): string {
  const reset = `\x1B[39;2;m`;
  const ansiColorCode = `\x1B[38;2;${standardColors[color]}m`;

  return ansiColorCode + str + reset;
}

export default applyStyles;
