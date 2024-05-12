type ClassValue = string | Record<string, boolean> | undefined | null | false;

export function cx(...args: ClassValue[]) {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (typeof arg === 'string' && arg.trim() !== '') {
      classes.push(arg.trim());
    } else if (typeof arg === 'object' && arg !== null) {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(' ');
}
