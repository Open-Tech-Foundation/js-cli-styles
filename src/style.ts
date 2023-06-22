// import styleText from './styleText';

import applyStyles from './applyStyles';

// const pattern = /~(?:[^{]+)(?:{)(?:.+)(?:})/g;

function parseSyntax(str: string, start: number, baseStyles = '') {
  const text = [];
  let s = '';
  let styles = baseStyles.length > 0 ? baseStyles + '.' : baseStyles;
  let open = false;
  let cursor = start + 1;

  for (let i = start + 1; i < str.length; i++) {
    cursor = i;
    const c = str[i];

    if (open && c === '\\') {
      s += str[i + 1];
      i++;
      continue;
    }

    if (isSyntax(c, str[i + 1])) {
      text.push(s);
      const [obj, cur] = parseSyntax(str, cursor, styles);
      text.push(obj);
      i = cur;
      s = '';
      continue;
    }

    if (open && c === '}') {
      text.push(s);
      return [{ text, styles }, i];
    }

    if (open) {
      s += c;
      continue;
    }

    if (c === '{') {
      open = true;
    } else {
      styles += c;
    }
  }

  text.push(s);

  return [{ text, styles }, cursor];
}

function isSyntax(c1: string, c2: string) {
  return c1 === '$' && new RegExp('[a-z]').test(c2);
}

function parser(str: string) {
  const arr = [];
  let s = '';

  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (isSyntax(c, str[i + 1])) {
      const [obj, cursor] = parseSyntax(str, i);
      arr.push(s);
      arr.push(obj);
      i = cursor as number;
      s = '';
      continue;
    }
    s += c;
  }

  arr.push(s);

  return arr;
}

function renderWithStyles(obj) {
  let out = '';

  obj.text.forEach((t) => {
    if (typeof t === 'string') {
      out += applyStyles(t, obj.styles);
    } else {
      out += renderWithStyles(t);
    }
  });

  return out;
}

function render(arr) {
  let out = '';
  arr.forEach((item) => {
    if (typeof item === 'string') {
      out += item;
    } else {
      out += renderWithStyles(item);
    }
  });

  return out;
}

export default function style(str: string): string {
  const parsedValue = parser(str);
  // console.log(JSON.stringify(parsedValue, null, 2));
  const out = render(parsedValue);

  return out;
}
