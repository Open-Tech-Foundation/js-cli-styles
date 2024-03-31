import { arrRm, hexToRGB } from '@opentf/std';
import {
  ANSI_END,
  ANSI_START,
  BG_CODE,
  FG_CODE,
  MODIFIERS,
  RESET,
  STANDARD_COLORS,
} from './constants';

const colorKeys = Object.keys(STANDARD_COLORS);
const modfierKeys = Object.keys(MODIFIERS);

function getStylesArr(styles: string, colorKeys: string[]) {
  const fgArr: number[] = [];
  const bgArr: number[] = [];
  const stylesArr = styles.split('.');

  for (let i = 0; i < stylesArr.length; i++) {
    const s = stylesArr[i] as string;
    if (colorKeys.includes(s) || s.startsWith('hex') || s.startsWith('rgb')) {
      fgArr.push(i);
    }

    if (
      (s.startsWith('bg') && colorKeys.includes(s.substring(2))) ||
      s.startsWith('bghex') ||
      s.startsWith('bgrgb')
    ) {
      bgArr.push(i);
    }
  }

  const rmarr = [...arrRm(fgArr), ...arrRm(bgArr)];

  return stylesArr.filter((_, i) => !rmarr.includes(i));
}

export default function applyStyles(str: string, styles: string): string {
  if (!styles) {
    return str;
  }

  let out = '';
  const stylesArr = getStylesArr(styles, colorKeys);

  for (let i = 0; i < stylesArr.length; i++) {
    const style = stylesArr[i] as string;

    if (colorKeys.includes(style)) {
      out += ANSI_START + FG_CODE + STANDARD_COLORS[style] + ANSI_END;
      continue;
    }

    if (style.startsWith('bgrgb')) {
      const s = style
        .slice(6, -1)
        .split(',')
        .map((v) => v.trim())
        .join(';');
      out += ANSI_START + BG_CODE + s + ANSI_END;
      continue;
    }

    if (style.startsWith('bghex')) {
      const rgb = hexToRGB(style.slice(6, -1));
      out += ANSI_START + BG_CODE + rgb.join(';') + ANSI_END;
      continue;
    }

    if (style.startsWith('bg')) {
      out += ANSI_START + BG_CODE + STANDARD_COLORS[style.slice(2)] + ANSI_END;
      continue;
    }

    if (modfierKeys.includes(style)) {
      out += ANSI_START + MODIFIERS[style] + ANSI_END;
      continue;
    }

    if (style.startsWith('rgb')) {
      const s = style
        .slice(4, -1)
        .split(',')
        .map((v) => v.trim())
        .join(';');
      out += ANSI_START + FG_CODE + s + ANSI_END;
      continue;
    }

    if (style.startsWith('hex')) {
      const rgb = hexToRGB(style.slice(4, -1));
      out += ANSI_START + FG_CODE + rgb.join(';') + ANSI_END;
    }
  }

  return out + str + RESET;
}
