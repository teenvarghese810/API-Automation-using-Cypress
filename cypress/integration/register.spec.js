import ENDPOINTS from '../constants/endpoints';
import { REGISTER, ERROR_MESSAGES } from '../constants';

describe('Partial Patient Register API', () => {
  let accessToken = 'A6533172c3fbea4cf3bd5d12d436654e9c64a79a450ed050ffb1c4269b7145de'
  context('POST requests', () => {
    
    it('should create a new user successfully', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register,
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'username': 'userName',
          'password': 'password123'
        },
        body: REGISTER.USER_WITH_EMAIL_AND_PASSWORD,
        qs: {
        "allowDuplicateEmail": "true",
        "hashAndEncryptPassword": "true",
        "encryptEmailAddress": "true"
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.message).to.eq('Success');
        expect(res.body.responseCode).to.eq(responseCode);
        expect(res.body.message).to.eq(message);
        expect(res.body.type).to.eq(type);
        expect(res.body.value).to.eq('value retrieved from response');
       /*  Make a DB connection, retrieve the data (EmailID and Password) from DB and validate whether the data encrypted 
       as specified by query parameters hashAndEncryptPassword and encryptEmailAddress */
        expect(db.table.emailID).to.eq("Encrypted Email ID")
        expect(db.table.password).to.eq("Encrypted Password")
      });
    });

    it('should not be able to create user with missing email', () => {
      cy.request({
        method: 'POST',
        url: ENDPOINTS.register,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.USER_WITH_MISSING_EMAIL,
        allowDuplicateEmail: "true",
        hashAndEncryptPassword: "true",
        encryptEmailAddress: "true",
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.message).to.eq('Bad Request');
        expect(res.body).to.have.property(
          'error',
          ERROR_MESSAGES.MISSING_EMAIL_OR_USERNAME
        );
      });
    });

    it('should not be able to create user with missing password', () => {
      cy.request({
        method: 'POST',
        url: ENDPOINTS.register,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.USER_WITH_MISSING_PASSWORD,
        allowDuplicateEmail: "true",
        hashAndEncryptPassword: "true",
        encryptEmailAddress: "true",
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.message).to.eq('Bad Request');
        expect(res.body).to.have.property(
          'error',
          ERROR_MESSAGES.MISSING_PASSWORD
        );
      });
    });

    it('should create a new user successfully', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.USER_WITH_EMAIL_AND_PASSWORD,
        hashAndEncryptPassword: "true",
        encryptEmailAddress: "true"
      }).then((res) => {
        expect(res.status).to.eq(409);
        expect(res.message).to.eq('Conflict - Email ID already exists');
      });
    });

    it('should create a new user successfully', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register,
        headers: {
          'Authorization': '',
          'username': 'userName',
          'password': 'password123'
        },
        body: REGISTER.USER_WITH_EMAIL_AND_PASSWORD,
        hashAndEncryptPassword: "true",
        encryptEmailAddress: "true"
      }).then((res) => {
        expect(res.status).to.eq(401);
        expect(res.message).to.eq('Unauthorized');
      });
    });

    it('should create a new user successfully', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register,
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'username': 'userName',
          'password': ''
        },
        body: REGISTER.USER_WITH_EMAIL_AND_PASSWORD,
        hashAndEncryptPassword: "true",
        encryptEmailAddress: "true"
      }).then((res) => {
        expect(res.status).to.eq(403);
        expect(res.message).to.eq('Forbidden');
      });
    });

  });
});
