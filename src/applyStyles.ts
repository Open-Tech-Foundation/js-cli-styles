import { ANSI_END, ANSI_START, RESET } from './constants';
import processStyles from './processStyles';

export default function applyStyles(str: string, styles: string): string {
  if (!styles) {
    return str;
  }

  let out = '';
  const styleMap = processStyles(styles);

  for (const v of styleMap.values()) {
    out += ANSI_START + v.code + v.value + ANSI_END;
  }

  return out + str + RESET;
}
