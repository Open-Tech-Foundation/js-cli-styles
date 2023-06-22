import { hexToRGB } from '@opentf/utils';

const reset = '\x1B[0m';

const standardColors: Record<string, string> = {
  r: '255;65;54',
  g: '46;204;64',
  b: '0;116;217',
  o: '255;133;27',
  y: '255;220;0',
  w: '255;255;255',
  bl: '17;17;17',
  gr: '170;170;170',
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

function getStylesArr(styles: string, colorNames: string[]) {
  const fgArr: number[] = [];
  const bgArr: number[] = [];
  const stylesArr = styles.split('.');

  for (let i = 0; i < stylesArr.length; i++) {
    const s = stylesArr[i];
    if (colorNames.includes(s) || s.startsWith('hex') || s.startsWith('rgb')) {
      fgArr.push(i);
    }

    if (
      (s.startsWith('bg') && colorNames.includes(s.substring(2))) ||
      s.startsWith('bghex') ||
      s.startsWith('bgrgb')
    ) {
      bgArr.push(i);
    }
  }

  const rmarr = [...fgArr.slice(0, -1), ...bgArr.slice(0, -1)];

  return stylesArr.filter((_, i) => !rmarr.includes(i));
}

export default function applyStyles(str: string, styles: string): string {
  const ansiStart = '\x1B[';
  const params = [];
  const colorNames = Object.keys(standardColors);
  const stylesArr = getStylesArr(styles, colorNames);
  // console.log(stylesArr);

  for (let i = 0; i < stylesArr.length; i++) {
    const style = stylesArr[i];

    if (colorNames.includes(style)) {
      params.push(`38;2;${standardColors[style]}`);
      continue;
    }

    if (style.startsWith('bgrgb')) {
      const s = style
        .slice(6, -1)
        .split(',')
        .map((v) => v.trim())
        .join(';');
      params.push('48;2;' + s);
      continue;
    }

    if (style.startsWith('bghex')) {
      const rgb = hexToRGB(style.slice(6, -1));
      params.push('48;2;' + `${rgb[0]};${rgb[1]};${rgb[2]}`);
      continue;
    }

    if (style.startsWith('bg')) {
      params.push(`48;2;${standardColors[style.slice(2)]}`);
      continue;
    }

    if (style === 'res') {
      params.push('0');
      continue;
    }

    if (style === 'nor') {
      params.push('22');
      continue;
    }

    if (style === 'blk') {
      params.push('5');
      continue;
    }

    if (style === 'dun') {
      params.push('21');
      continue;
    }

    if (style === 'hid') {
      params.push('8');
      continue;
    }

    if (style === 'ovl') {
      params.push('53');
      continue;
    }

    if (style === 'bol') {
      params.push('1');
      continue;
    }

    if (style === 'dim') {
      params.push('2');
      continue;
    }

    if (style === 'ita') {
      params.push('3');
      continue;
    }

    if (style === 'und') {
      params.push('4');
      continue;
    }

    if (style === 'inv') {
      params.push('7');
      continue;
    }

    if (style === 'str') {
      params.push('9');
      continue;
    }

    if (style.startsWith('rgb')) {
      const s = style
        .slice(4, -1)
        .split(',')
        .map((v) => v.trim())
        .join(';');
      params.push('38;2;' + s);
      continue;
    }

    if (style.startsWith('hex')) {
      const rgb = hexToRGB(style.slice(4, -1));
      params.push('38;2;' + `${rgb[0]};${rgb[1]};${rgb[2]}`);
    }
  }

  return ansiStart + params.join(';') + 'm' + str + reset;
}
