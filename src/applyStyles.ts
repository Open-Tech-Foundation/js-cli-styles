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
const reset = `\x1B[39;2;m`;

function addRGB(str: string, style: string) {
  const value = style.slice(4, -1).split(',').join(';');
  const ansiColorCode = `\x1B[38;2;${value}m`;

  return ansiColorCode + str + reset;
}

function addBgRGB(str: string, style: string) {
  const value = style.slice(6, -1).split(',').join(';');
  const ansiColorCode = `\x1B[48;2;${value}m`;

  return ansiColorCode + str + reset;
}

function addColor(str: string, name: string) {
  const ansiColorCode = `\x1B[38;2;${standardColors[name]}m`;

  return ansiColorCode + str + reset;
}

function addBgColor(str: string, name: string) {
  const ansiColorCode = `\x1B[48;2;${standardColors[name]}m`;

  return ansiColorCode + str + reset;
}

function addBold(str: string) {
  const ansiCode = `\x1B[1;38;2m`;

  return ansiCode + str + reset;
}

function addDim(str: string) {
  const ansiCode = `\x1B[2;38;2m`;

  return ansiCode + str + reset;
}

function addItalic(str: string) {
  const ansiCode = `\x1B[3;38;2m`;

  return ansiCode + str + reset;
}

function addUnderline(str: string) {
  const ansiCode = `\x1B[4;38;2m`;

  return ansiCode + str + reset;
}

function inverse(str: string) {
  const ansiCode = `\x1B[7;38;2m`;

  return ansiCode + str + reset;
}

function strike(str: string) {
  const ansiCode = `\x1B[9;38;2m`;

  return ansiCode + str + reset;
}

function applyStyles(str: string, styles: string): string {
  let styledStr = str;
  const stylesArr = styles.split('.');

  const colorNames = Object.keys(standardColors);

  for (let i = 0; i < stylesArr.length; i++) {
    const style = stylesArr[i];

    if (colorNames.includes(style)) {
      styledStr = addColor(styledStr, style);
      continue;
    }
  }

  for (let i = 0; i < stylesArr.length; i++) {
    const style = stylesArr[i];

    if (style.match(/^bg[A-Z][a-z]+$/)) {
      styledStr = addBgColor(styledStr, style.substring(2).toLowerCase());
      continue;
    }

    if (style === 'bold') {
      styledStr = addBold(styledStr);
      continue;
    }

    if (style === 'dim') {
      styledStr = addDim(styledStr);
      continue;
    }

    if (style === 'italic') {
      styledStr = addItalic(styledStr);
      continue;
    }

    if (style === 'underline') {
      styledStr = addUnderline(styledStr);
      continue;
    }

    if (style === 'inverse') {
      styledStr = inverse(styledStr);
      continue;
    }

    if (style === 'strike') {
      styledStr = strike(styledStr);
      continue;
    }

    if (style.match(/^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/)) {
      styledStr = addRGB(styledStr, style);
      continue;
    }

    if (style.match(/^bgRgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/)) {
      styledStr = addBgRGB(styledStr, style);
      continue;
    }
  }

  return styledStr;
}

export default applyStyles;
