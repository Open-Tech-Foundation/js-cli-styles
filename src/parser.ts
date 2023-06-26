export type StyleObj = {
  text: string[];
  styles: string;
};

function parseSyntax(
  str: string,
  start: number,
  styles = ''
): [string | StyleObj, number] {
  const text = [];
  let tempStr = '';
  let styleStr = '';
  let open = false;
  let cursor = start + 1;
  let strStart = start;
  const getCurStyles = () =>
    styles.length > 0 ? styles + '.' + styleStr : styleStr;

  for (; cursor < str.length; cursor++) {
    const c = str[cursor];

    if (open) {
      if (c === '\\') {
        tempStr += str[cursor + 1];
        cursor++;
        continue;
      }

      if (c === '}') {
        text.push(tempStr);
        open = false;
        return [{ text, styles: getCurStyles() } as StyleObj, cursor];
      }

      if (c === '$') {
        text.push({ text: [tempStr], styles: getCurStyles() });
        const [obj, cur] = parseSyntax(str, cursor, getCurStyles());
        text.push(obj);
        cursor = cur;
        tempStr = '';
        continue;
      }

      tempStr += c;
      continue;
    }

    if (c === '{') {
      open = true;
      continue;
    }

    if (c === '$') {
      text.push(str.substring(strStart, cursor));
      styleStr = '';
      const [obj, cur] = parseSyntax(str, cursor, styles);
      text.push(obj);
      cursor = cur;
      tempStr = '';
      strStart = cur + 1;
      continue;
    }

    styleStr += c;
  }

  if (!open && text.length === 0) {
    return [str.substring(strStart, cursor), cursor];
  }

  text.push(styleStr);

  return [{ text, styles: getCurStyles() } as StyleObj, cursor];
}

export default function parser(str: string) {
  const arr = [];
  let s = '';

  for (let i = 0; i < str.length; i++) {
    const c = str[i] as string;
    if (c === '$') {
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
