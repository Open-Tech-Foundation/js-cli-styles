export type AstNode =
  | { type: 'text'; value: string }
  | { type: 'style'; tag: string; content: string };

export default function parser(str: string): AstNode[] {
  const nodes: AstNode[] = [];
  let i = 0;
  let lastIndex = 0;

  while (i < str.length) {
    const char = str[i];

    if (char === '\\') {
      i += 2;
      continue;
    }

    if (char === '$') {
      // This is a potential style tag.
      // A valid tag must start with a letter. If not, treat '$' as a literal.
      if (i + 1 >= str.length || !/^[a-zA-Z]/.test(str[i + 1])) {
        i++;
        continue;
      }

      let j = i + 1;
      while (j < str.length && str[j] !== '{') {
        j++;
      }

      if (j < str.length && str[j] === '{') {
        let k = j + 1;
        let depth = 1;
        while (k < str.length) {
          if (str[k] === '\\') {
            k += 2;
            continue;
          }
          if (str[k] === '{') {
            depth++;
          } else if (str[k] === '}') {
            depth--;
            if (depth === 0) {
              break;
            }
          }
          k++;
        }

        if (depth === 0) {
          if (i > lastIndex) {
            nodes.push({ type: 'text', value: str.substring(lastIndex, i) });
          }
          nodes.push({
            type: 'style',
            tag: str.substring(i + 1, j),
            content: str.substring(j + 1, k),
          });
          i = k + 1;
          lastIndex = i;
          continue;
        }
      }
    }
    i++;
  }

  if (i > lastIndex) {
    nodes.push({ type: 'text', value: str.substring(lastIndex, i) });
  }

  return nodes;
}
