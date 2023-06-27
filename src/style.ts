import applyStyles from './applyStyles';
import isSupportsColor from './isSupportsColor';
import parser, { type StyleObj } from './parser';

function renderWithStyles(obj: StyleObj, color: boolean) {
  let out = '';

  obj.text.forEach((t) => {
    if (typeof t === 'string') {
      out += color ? applyStyles(t, obj.styles) : t;
    } else {
      out += renderWithStyles(t, color);
    }
  });

  return out;
}

function render(arr: (string | StyleObj)[], color: boolean) {
  let out = '';
  arr.forEach((item) => {
    if (typeof item === 'string') {
      out += item;
    } else {
      out += renderWithStyles(item, color);
    }
  });

  return out;
}

export default function style(
  str: string,
  options?: { color: boolean }
): string {
  let color = options && 'color' in options ? options.color : true;
  if (color) {
    color = isSupportsColor();
  }
  const parsedValue = parser(str);
  const out = render(parsedValue, color);

  return out;
}
