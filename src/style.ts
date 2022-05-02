import styleText from './styleText';

export default function style(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }

  let result = styleText(str);
  const stylePattern = /(?:~)(?:[^{]+)(?:\{(?:[^{}]+)\})/g;

  while (result.match(stylePattern)) {
    result = styleText(result);
  }

  return result;
}
