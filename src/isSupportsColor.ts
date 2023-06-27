export default function isSupportsColor() {
  const { env, argv } = process;

  if ('FORCE_COLOR' in env) {
    if (parseInt(env['FORCE_COLOR'] as string) === 3) {
      return true;
    }

    return false;
  }

  if (
    argv.includes('--no-color') ||
    argv.includes('--color=false') ||
    env['NO_COLOR']
  ) {
    return false;
  }

  if (env['COLORTERM'] === 'truecolor') {
    return true;
  }

  // Windows 10 build 14931 is the first release that supports 16m/TrueColor.
  if (process.platform === 'win32') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { release } = require('os');
    if (+release().split('.')[2] > 14931) {
      return true;
    }
  }

  return false;
}
