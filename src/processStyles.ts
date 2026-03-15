import { hexToRGB } from '@opentf/std';
import {
  BG_CODE,
  FG_CODE,
  MODIFIERS,
  STANDARD_COLORS,
  UND_COLOR_CODE,
} from './constants';

const colorKeySet = new Set(Object.keys(STANDARD_COLORS));

const pairedModifiers = {
  inv: 'noi',
  noi: 'inv',
  hid: 'vis',
  vis: 'hid',
  blk: 'nob',
  nob: 'blk',
  ovl: 'noo',
  noo: 'ovl',
  str: 'nos',
  nos: 'str',
};

function dimColor(color: string) {
  return color
    .split(';')
    .map((c) => Math.floor(parseInt(c, 10) / 2))
    .join(';');
}

const underlineStyles = new Set(['und', 'dbu', 'cru', 'dou', 'dau']);

interface StyleInfo {
  value: string;
  code: string;
  dim?: boolean;
  color?: string;
}

const keywordHandlers: Record<string, (map: Map<string, StyleInfo>) => void> = {
  bol: (map) => {
    map.delete('nor');
    map.set('bold', { value: MODIFIERS.bol, code: '' });
  },
  res: (map) => {
    map.clear();
    map.set('reset', { value: MODIFIERS.res, code: '' });
  },
  dfg: (map) => {
    map.delete('color');
    map.set('dfg', { value: MODIFIERS.dfg, code: '' });
  },
  dbg: (map) => {
    map.delete('bgcolor');
    map.set('dbg', { value: MODIFIERS.dbg, code: '' });
  },
  ita: (map) => {
    map.set('ita', { value: MODIFIERS.ita, code: '' });
  },
  nou: (map) => {
    map.delete('und');
    map.set('nou', { value: MODIFIERS.nou, code: '' });
  },
  ruc: (map) => {
    map.delete('uColor');
    map.set('ruc', { value: MODIFIERS.ruc, code: '' });
  },
  nor: (map) => {
    map.delete('bold');
    map.delete('dim');
    const colorInfo = map.get('color');
    if (colorInfo?.dim && colorInfo.color) {
      map.set('color', { ...colorInfo, value: colorInfo.color, dim: false });
    }
    map.set('nor', { value: MODIFIERS.nor, code: '' });
  },
  dim: (map) => {
    if (map.has('color')) {
      const obj = map.get('color');
      map.set('color', {
        ...obj,
        value: dimColor(obj.value),
        dim: true,
        color: obj.color || obj.value,
      });
    } else {
      map.set('dim', { value: MODIFIERS.dim, code: '' });
    }
  },
};

export default function processStyles(styles: string) {
  const arr = styles.split('.');
  const map = new Map<string, StyleInfo>();

  for (const style of arr) {
    // --- Paired Modifiers ---
    if (style in pairedModifiers) {
      map.delete(pairedModifiers[style]);
      map.set(style, {
        value: MODIFIERS[style as keyof typeof MODIFIERS],
        code: '',
      });
      continue;
    }

    // --- Function-like styles ---
    if (style.endsWith(')')) {
      if (style.startsWith('rgb(')) {
        const s = style
          .slice(4, -1)
          .split(',')
          .map((v) => v.trim())
          .join(';');
        if (s) map.set('color', { value: s, code: FG_CODE });
      } else if (style.startsWith('hex(')) {
        const rgb = hexToRGB(style.slice(4, -1)).join(';');
        map.set('color', { value: rgb, code: FG_CODE });
      } else if (style.startsWith('bghex(')) {
        const rgb = hexToRGB(style.slice(6, -1)).join(';');
        map.set('bgcolor', { value: rgb, code: BG_CODE });
      } else if (style.startsWith('bgrgb(')) {
        const s = style
          .slice(6, -1)
          .split(',')
          .map((v) => v.trim())
          .join(';');
        if (s) map.set('bgcolor', { value: s, code: BG_CODE });
      } else if (style.startsWith('urgb(')) {
        const s = style
          .slice(5, -1)
          .split(',')
          .map((v) => v.trim())
          .join(':');
        if (s) map.set('uColor', { value: s, code: UND_COLOR_CODE });
      }
      continue;
    }

    // --- Simple Keywords ---
    const keywordHandler = keywordHandlers[style];
    if (keywordHandler) {
      keywordHandler(map);
      continue;
    }

    // --- Underline styles ---
    if (underlineStyles.has(style)) {
      map.delete('nou');
      map.set('und', { value: MODIFIERS[style], code: '' });
      continue;
    }

    // --- Foreground Color Keywords ---
    if (colorKeySet.has(style)) {
      map.delete('dfg');
      const colorValue = STANDARD_COLORS[style];
      if ((map.has('color') && map.get('color').dim) || map.has('dim')) {
        const value = dimColor(colorValue);
        map.delete('dim');
        map.set('color', {
          value,
          code: FG_CODE,
          dim: true,
          color: colorValue,
        });
      } else {
        map.set('color', {
          value: colorValue,
          code: FG_CODE,
          color: colorValue,
        });
      }
      continue;
    }

    // --- Background Color Keywords ---
    if (style.startsWith('bg') && colorKeySet.has(style.slice(2))) {
      map.set('bgcolor', {
        value: STANDARD_COLORS[style.slice(2)],
        code: BG_CODE,
      });
      continue;
    }

    // --- Underline Color Keywords ---
    if (style.startsWith('u') && colorKeySet.has(style.slice(1))) {
      map.set('uColor', {
        value: STANDARD_COLORS[style.slice(1)]?.replaceAll(';', ':'),
        code: UND_COLOR_CODE,
      });
      continue;
    }
  }

  return map;
}
