import { isStr, shallowMerge } from '@opentf/std';
import applyStyles from './applyStyles';
import isSupportsColor from './isSupportsColor';
import parser, { type StyleObj } from './parser';

function renderWithStyles(obj: StyleObj, color: boolean) {
  let out = '';

  obj.text.forEach((t) => {
    if (isStr(t)) {
      out += color ? applyStyles(t, obj.styles) : t;
    } else {
      out += renderWithStyles(t, color);
    }
  });

  return out;
}

function render(arr: (string | StyleObj)[], color: boolean) {
  return arr.reduce((acc, cur) => {
    return (acc += isStr(cur) ? cur : renderWithStyles(cur, color));
  }, '') as string;
}

type Options = {
  color?: boolean;
};

export default function style(str: string, options?: Options): string {
  const opts = shallowMerge(
    { color: true },
    options as object
  ) as Required<Options>;
  if (opts.color) {
    opts.color = isSupportsColor();
  }
  const parsedValue = parser(str);

  return render(parsedValue, opts.color);
}
