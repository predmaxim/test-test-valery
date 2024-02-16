type RulesType = {
  isEmpty?: boolean,
  min?: number,
  max?: number,
  isEmail?: boolean,
}

export const formFieldValidation = (value: string, rules: RulesType): {
  status: boolean, message?: string
} => {
  const emailRegex = /^[^\\$@]+@[^\\$@]+\\.[^\\$@]{2,}$/i;
  return Object.entries(rules).reduce((acc, [key, val]) => {
    switch (key) {
      case 'isEmail': {
        const res = emailRegex.test(value);
        acc.status = res;
        if (!res) {
          acc.message = 'Mail is not correct';
        }
        break;
      }
      case 'min': {
        const res = value.length >= +val;
        acc.status = res;
        if (!res) {
          acc.message = `Should be greater then ${val} symbols`;
        }
        break;
      }
      case 'max': {
        const res = value.length <= +val;
        acc.status = res;
        if (!res) {
          acc.message = `Should be less then ${val} symbols`;
        }
        break;
      }
      case 'isEmpty': {
        const res = val === !!value;
        acc.status = res;
        if (!res) {
          acc.message = `Should not be empty`;
        }
        break;
      }
    }
    return acc;
  }, {} as { status: boolean, message?: string });
};
