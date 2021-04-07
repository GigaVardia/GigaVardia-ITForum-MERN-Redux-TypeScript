export interface PasswordTestResult {
    message: string;
    isValid: boolean;
}

export const isPasswordsSame = (password: string, confirmPassword: string): PasswordTestResult => {
  const passwordTestResult: PasswordTestResult = {
    message: "",
    isValid: true,
  };

  if (password !== confirmPassword) {
    passwordTestResult.isValid = false;
    passwordTestResult.message = "Passwords are note same!"
  }

  return passwordTestResult
}
  
export const isPasswordValid = (password: string): PasswordTestResult => {
  const passwordTestResult: PasswordTestResult = {
    message: "",
    isValid: true,
  };

  if (password.length < 8) {
    passwordTestResult.message = "Password must be at least 8 characters";
    passwordTestResult.isValid = false;
    return passwordTestResult;
  }

  const strongPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
  );

  if (!strongPassword.test(password)) {
    passwordTestResult.message =
      "Password must contain at least 1 special character, 1 cap letter, and 1 number";
    passwordTestResult.isValid = false;
  }

  return passwordTestResult;
};
  