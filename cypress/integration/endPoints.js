const ENDPOINTS = {
  register: '/RegisterPartialPatient',
  register_dupEmail: '/RegisterPartialPatient?allowDuplicateEmail="true"',
  register_dupEmail_false: '/RegisterPartialPatient?allowDuplicateEmail="true"',
  register_encPwd: '/RegisterPartialPatient?hashAndEncryptPassword="true"',
  register_encPwd_false: '/RegisterPartialPatient?hashAndEncryptPassword="true"',
  register_encEmail: '/RegisterPartialPatient?encryptEmailAddress="true"',
  register_encEmail_false: '/RegisterPartialPatient?encryptEmailAddress="true"',
  register_allParam_dupEmail: '/RegisterPartialPatient?encryptEmailAddress="true"&&allowDuplicateEmail="true"&&hashAndEncryptPassword="true"',
};

export default ENDPOINTS;
