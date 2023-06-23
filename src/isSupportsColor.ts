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

  return false;
}
