//Below fields are required for passing the registration POST request
const patient = "patient";
const RANDOM_ID = Cypress._.random(0, 100);
const id = RANDOM_ID
const firstName = 'John';
const surName = 'Doe';
const email = 'dummy_mail@dummy.dummy';
const password = 'password';
const DEFINED_USER_EMAIL = 'some@email.com';
const step = 'Create account page';
const creationDate = 'Swagger UI';
const updateDate= null;
const updatedBy = null;
const registrationDataJson = 'registration data';
const registered = false;
const patientId = Cypress._.random(0, 100);
const registrationCompletionDate = null;
const obsolete = false;
const emailVerified = false;
const verificationCode = 123456;
const verificationCodeExpiry = '2022-07-29T06:23:47.4742565+00:00';
const responseCode = '100'
const message='string'
const type='string'

export const EXISTING_USER = {
  patient,
  id,
  email,
  firstName,
  surName,
  step,
  creationDate,
  updateDate,
  updatedBy,
  registrationDataJson,
  registered,
  patientId,
  registrationCompletionDate,
  obsolete,
  emailVerified,
  verificationCode,
  verificationCodeExpiry
};

export const REGISTER = {
  USER_WITH_EMAIL_AND_PASSWORD: {
    email: DEFINED_USER_EMAIL,
    password,
  },

  USER_WITH_MISSING_EMAIL: {
    password,
  },

  USER_WITH_MISSING_PASSWORD: {
    email: DEFINED_USER_EMAIL,
  },
};

export const ERROR_MESSAGES = {
  MISSING_EMAIL_OR_USERNAME: 'Missing email or username',
  MISSING_PASSWORD: 'Missing password',
};
