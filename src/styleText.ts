import applyStyles from './applyStyles';
import splitStr from './splitStr';

function hasStyle(str: string): boolean {
  return new RegExp(/\u001B/).test(str);
}

function styleText(str: string): string {
  const stylePattern = /(~)([^{]+)\{([^~}]+)\}/g;
  const regExp = new RegExp(stylePattern);
  const regExpresult = regExp.exec(str);
  let styledStr = '';

  if (regExpresult) {
    const matchStr = regExpresult[3];
    const styles = regExpresult[2];

    if (hasStyle(matchStr)) {
      const arr = splitStr(matchStr);

      for (let i = 0; i < arr.length; i++) {
        const text = arr[i];

        if (hasStyle(text)) {
          styledStr += text;
          continue;
        }

        styledStr += applyStyles(text, styles);
      }

      return (
        str.substring(0, regExpresult.index) +
        styledStr +
        str.substring(regExp.lastIndex)
      );
    }

    return (
      str.substring(0, regExpresult.index) +
      applyStyles(matchStr, styles) +
      str.substring(regExp.lastIndex)
    );
  } else {
    return str;
  }
}

export default styleText;
