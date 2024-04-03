import { hexToRGB } from '@opentf/std';
import {
  BG_CODE,
  FG_CODE,
  MODIFIERS,
  STANDARD_COLORS,
  UND_COLOR_CODE,
} from './constants';

const colorKeys = Object.keys(STANDARD_COLORS);

function dimColor(color: string) {
  return color
    .split(';')
    .map((c) => parseInt(c) * (1 / 2))
    .map((c) => Math.floor(c))
    .join(';');
}

export default function processStyles(styles: string) {
  const arr = styles.split('.');
  const map = new Map();

  for (let i = 0; i < arr.length; i++) {
    const style = arr[i] as string;

    if (style === 'dfg') {
      map.delete('color');
      map.set('dfg', { value: MODIFIERS[style], code: '' });
    }

    if (colorKeys.includes(style)) {
      map.delete('dfg');
      let value;
      if (map.has('color') && map.get('color').dim) {
        value = dimColor(STANDARD_COLORS[style] as string);
        map.set('color', {
          value,
          code: FG_CODE,
          dim: true,
          color: STANDARD_COLORS[style],
        });
        continue;
      } else if (map.has('dim')) {
        value = dimColor(STANDARD_COLORS[style] as string);
        map.delete('dim');
        map.set('color', {
          value,
          code: FG_CODE,
          dim: true,
          color: STANDARD_COLORS[style],
        });
        continue;
      } else {
        value = STANDARD_COLORS[style];
      }
      map.set('color', { value, code: FG_CODE, color: value });
      continue;
    }

    if (style === 'dim') {
      if (map.has('color')) {
        const obj = map.get('color');
        map.set('color', {
          ...obj,
          value: dimColor(obj.value),
          dim: true,
        });
      } else {
        map.set('dim', { value: MODIFIERS[style], code: '' });
      }
      continue;
    }

    if (style.startsWith('rgb')) {
      const s = style
        .slice(4, -1)
        .split(',')
        .map((v) => v.trim())
        .join(';');

      if (!s) {
        continue;
      }

      map.delete('fg');
      map.set('color', { value: s, code: FG_CODE });
      continue;
    }

    if (style.startsWith('hex')) {
      map.delete('fg');
      const rgb = hexToRGB(style.slice(4, -1)).join(';');
      map.set('color', {
        value: rgb,
        code: FG_CODE,
      });
      continue;
    }

    if (style.startsWith('bghex')) {
      map.delete('bg');
      const rgb = hexToRGB(style.slice(6, -1)).join(';');
      map.set('bgcolor', {
        value: rgb,
        code: BG_CODE,
      });
      continue;
    }

    if (style.startsWith('bgrgb')) {
      const s = style
        .slice(6, -1)
        .split(',')
        .map((v) => v.trim())
        .join(';');
      if (!s) {
        continue;
      }
      map.delete('fg');
      map.set('bgcolor', {
        value: s,
        code: BG_CODE,
      });
      continue;
    }

    if (style.startsWith('bg') && colorKeys.includes(style.slice(2))) {
      map.delete('bg');
      map.set('bgcolor', {
        value: STANDARD_COLORS[style.slice(2)],
        code: BG_CODE,
      });
      continue;
    }

    if (style === 'dbg') {
      map.delete('bgcolor');
      map.set('dbg', { value: MODIFIERS[style], code: '' });
    }

    if (style === 'bol') {
      map.delete('nor');
      map.set('bold', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'res') {
      map.clear();
      map.set('reset', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'dfg') {
      map.delete('color');
      map.set('dfg', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'nor') {
      map.delete('bold');
      if (map.has('color') && map.get('color').dim) {
        const obj = map.get('color');
        map.set('color', {
          ...obj,
          value: obj.color,
        });
      }
      map.set('nor', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'hid') {
      map.delete('vis');
      map.set('hid', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'vis') {
      map.delete('hid');
      map.set('vis', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'inv') {
      map.delete('noi');
      map.set('inv', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'noi') {
      map.delete('inv');
      map.set('noi', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'blk') {
      map.delete('nob');
      map.set('blk', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'nob') {
      map.delete('blk');
      map.set('nob', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'ovl') {
      map.delete('noo');
      map.set('ovl', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'noo') {
      map.delete('ovl');
      map.set('noo', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'str') {
      map.delete('nos');
      map.set('str', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'nos') {
      map.delete('str');
      map.set('nos', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'ita') {
      map.set('ita', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style.startsWith('urgb')) {
      const s = style
        .slice(5, -1)
        .split(',')
        .map((v) => v.trim())
        .join(':');
      map.set('uColor', { value: s, code: UND_COLOR_CODE });
      continue;
    }

    if (['und', 'dbu', 'cru', 'dou', 'dau'].includes(style)) {
      map.delete('nou');
      map.set('und', {
        value: MODIFIERS[style as keyof typeof MODIFIERS],
        code: '',
      });
      continue;
    }

    if (style === 'nou') {
      map.delete('und');
      map.set('nou', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style === 'ruc') {
      map.delete('uColor');
      map.set('ruc', { value: MODIFIERS[style], code: '' });
      continue;
    }

    if (style.startsWith('u') && colorKeys.includes(style.slice(1))) {
      map.set('uColor', {
        value: STANDARD_COLORS[style.slice(1)]?.replaceAll(';', ':'),
        code: UND_COLOR_CODE,
      });
    }
  }

  return map;
}
