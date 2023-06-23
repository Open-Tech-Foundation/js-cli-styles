/* eslint-disable turbo/no-undeclared-env-vars */
export default function isSupportsColor() {
  if (
    process.argv.includes('--no-color') ||
    process.argv.includes('--color=false') ||
    process.env.NO_COLOR
  ) {
    return false;
  }

  if (process.env.COLORTERM === 'truecolor') {
    return true;
  }

  return false;
}
