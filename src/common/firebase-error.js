export const customError = {
  'auth/email-already-in-use':
    'Invalid credentials, please enter valid credentials',
  'auth/wrong-password': 'Invalid credentials, please enter valid credentials',
  'auth/weak-password': 'Error, password must be at least 6 characters',
  'auth/email-already-exists':
    'Invalid credentials, please enter valid credentials',
  'auth/invalid-email': 'Invalid email, please provide a valid email.',
  'auth/user-not-found':
    'There is no existing user record corresponding to the provided credentials.',
  'auth/uid-already-exists':
    'The provided uid is already in use by an existing user. Each user must have a unique uid.',
  'auth/invalid-password':
    'The provided value for the password user property is invalid. It must be a string with at least six characters.',
  'auth/phone-number-already-exists':
    'The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.',
  'auth/invalid-phone-number':
    'The provided value for the phoneNumber is invalid. It must be a non-empty E.164 standard compliant identifier string.',
  'auth/network-request-failed': 'Network error, please try again.',
}
