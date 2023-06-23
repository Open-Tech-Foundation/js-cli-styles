export type StyleObj = {
  text: string[];
  styles: string;
};

function parseSyntax(
  str: string,
  start: number,
  baseStyles = ''
): [StyleObj, number] {
  const text = [];
  let s = '';
  let styles = baseStyles.length > 0 ? baseStyles + '.' : baseStyles;
  let open = false;
  let cursor = start + 1;

  for (let i = start + 1; i < str.length; i++) {
    cursor = i;
    const c = str[i] as string;

    if (open && c === '\\') {
      s += str[i + 1];
      i++;
      continue;
    }

    if (isSyntax(c, str[i + 1] as string)) {
      text.push(s);
      const [obj, cur] = parseSyntax(str, cursor, styles);
      text.push(obj);
      i = cur;
      s = '';
      continue;
    }

    if (open && c === '}') {
      text.push(s);
      return [{ text, styles } as StyleObj, i];
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

  return [{ text, styles } as StyleObj, cursor];
}

function isSyntax(c1: string, c2: string) {
  return c1 === '$' && new RegExp('[a-z]').test(c2);
}

export default function parser(str: string) {
  const arr = [];
  let s = '';

  for (let i = 0; i < str.length; i++) {
    const c = str[i] as string;
    if (isSyntax(c, str[i + 1] as string)) {
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
