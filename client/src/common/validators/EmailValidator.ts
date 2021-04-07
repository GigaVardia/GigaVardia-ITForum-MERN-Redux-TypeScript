export interface EmailTestResult {
    message: string;
    isValid: boolean;
}

export const isEmailValid = (email: string): EmailTestResult => {
    const emailTestResult: EmailTestResult = {
        message: "",
        isValid: true,
    };

    if (email.length < 8) {
        emailTestResult.message = "Email must be at least 8 characters";
        emailTestResult.isValid = false;
        return emailTestResult;
    }
    // eslint-disable-next-line
    const validEmail = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    if (!validEmail.test(email)) {
        emailTestResult.message =
            "Email is not valid, try again...";
        emailTestResult.isValid = false;
    }

    return emailTestResult;
};
