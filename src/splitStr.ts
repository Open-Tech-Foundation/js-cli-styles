function splitStr(str: string): string[] {
  let match;
  let currentIndex = 0;
  const ansiPattern = new RegExp(/\u001B(?:[^\u001B]*)\u001B\[39;2;m/g);
  const resultArr = [];

  while ((match = ansiPattern.exec(str)) !== null) {
    resultArr.push(str.substring(currentIndex, match.index));
    resultArr.push(str.substring(match.index, ansiPattern.lastIndex));
    currentIndex = ansiPattern.lastIndex;
  }

  resultArr.push(str.substring(currentIndex));

  return resultArr;
}

export default splitStr;
