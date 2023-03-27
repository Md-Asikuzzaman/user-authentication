interface SignUpType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signUpValidate = (values: any): SignUpType => {
  const errors: any = {};

  if (!values.username) {
    errors.username = 'Username is required';
  } else if (values.username.length > 20) {
    errors.username = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Email Address is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Use at list 8 characters';
  } else if (values.password.length > 50) {
    errors.password = 'Use at most 50 characters';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password not matched';
  }

  return errors;
};

interface SignInType {
  email: string;
  password: string;
}

export const signInValidate = (values: any): SignInType => {
  const errors: any = {};

  if (!values.email) {
    errors.email = 'Email Address is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Use at list 8 characters';
  } else if (values.password.length > 50) {
    errors.password = 'Use at most 50 characters';
  }

  return errors;
};
