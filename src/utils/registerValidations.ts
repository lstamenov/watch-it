export const isValidEmail = (email: string): boolean => {
  const reggex = new RegExp('(.+)@(.+){2,}.(.+){2,}');
  return reggex.test(email);
};

export const isVaildPassword = (password: string): boolean => password.length >= 8;

export const isNotEmptyField = (field: string): boolean => field.length > 0;

export const arePasswordsMatch = (password: string, confirmPassword: string): boolean =>
  password === confirmPassword;
