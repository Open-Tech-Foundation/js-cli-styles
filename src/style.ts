import { RESET } from './constants';
import isSupportsColor from './isSupportsColor';
import parser from './parser';
import processStyles from './processStyles';

// --- Caching ---
const rendererCache = new Map<string, (color: boolean) => string>();
const styleCache = new Map<string, string>();

export function clearCache() {
  rendererCache.clear();
  styleCache.clear();
}

/**
 * Processes a style tag (e.g., "r.bol") and returns the corresponding
 * ANSI opening sequence. Results are cached.
 */
function getAnsi(tag: string): string {
  if (styleCache.has(tag)) {
    return styleCache.get(tag)!;
  }

  const styleMap = processStyles(tag);
  if (styleMap.size === 0) {
    styleCache.set(tag, '');
    return '';
  }

  let openSequence = '';
  for (const v of styleMap.values()) {
    openSequence += `\x1B[${v.code}${v.value}m`;
  }

  styleCache.set(tag, openSequence);
  return openSequence;
}

type FullAstNode =
  | { type: 'text'; value: string; content?: undefined }
  | {
      type: 'style';
      open: string;
      close: string;
      content: FullAstNode[];
    };

function buildFullAst(template: string, parentTag: string): FullAstNode[] {
  const nodes = parser(template);
  return nodes.map((node) => {
    if (node.type === 'text') {
      return {
        type: 'text',
        value: node.value.replace(/\\(.)/g, '$1'),
      };
    }

    const currentTag = parentTag ? `${parentTag}.${node.tag}` : node.tag;
    const openSequence = getAnsi(currentTag);
    // The close sequence must reset all styles, then re-apply the parent's styles.
    const resetSequence = parentTag ? RESET + getAnsi(parentTag) : RESET;

    return {
      type: 'style',
      open: openSequence,
      close: openSequence ? resetSequence : '',
      content: buildFullAst(node.content, currentTag),
    };
  });
}

/**
 * Compiles a template string into a function that can quickly render it.
 * This is much faster for templates that are used multiple times.
 * @param template The template string to compile.
 * @returns A renderer function.
 */
export function compile(template: string): (color: boolean) => string {
  if (rendererCache.has(template)) {
    return rendererCache.get(template)!;
  }

  const fullAst = buildFullAst(template, '');

  const renderer = (color: boolean) => {
    const renderNodes = (nodes: FullAstNode[]): string => {
      let result = '';
      for (const node of nodes) {
        if (node.type === 'text') {
          result += node.value;
        } else {
          result +=
            (color ? node.open : '') +
            renderNodes(node.content) +
            (color ? node.close : '');
        }
      }
      return result;
    };
    return renderNodes(fullAst);
  };

  rendererCache.set(template, renderer);
  return renderer;
}

export default function style(
  str: string,
  options: { color?: boolean } = {}
): string {
  const opts = { color: true, ...options };

  if (opts.color) {
    opts.color = isSupportsColor();
  }

  // Fast path for strings that do not contain styling syntax
  if (!str.includes('$')) {
    return str;
  }

  const renderer = compile(str);
  return renderer(opts.color);
}
