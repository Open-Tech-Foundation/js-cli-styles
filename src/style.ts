import styleText from './styleText';

function style(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }

  let result = str;
  const stylePattern = /(?:~)(?:[^{]+)(?:\{(?:[^~}]+)\})/g;

  while (result.match(stylePattern)) {
    result = styleText(result);
  }

  return result;
}

export default style;
