import styleText from './styleText';

function style(str: string): string {
  let result = str;
  const stylePattern = /(~)([a-z.]*)\{([^~}]+)\}/g;

  while (result.match(stylePattern)) {
    result = styleText(result);
  }

  return result;
}

export default style;
