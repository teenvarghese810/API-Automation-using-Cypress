import ENDPOINTS from '../constants/endpoints';
import { REGISTER, ERROR_MESSAGES } from '../constants';

describe('Partial Patient Register API', () => {
  let accessToken = 'A6533172c3fbea4cf3bd5d12d436654e9c64a79a450ed050ffb1c4269b7145de'
  context('POST requests', () => {
    
    it('TC01.Should register a new patient successfully', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.PATIENT_WITH_VALID_DETAILS,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.message).to.eq('Success');
        expect(res.body.responseCode).to.eq(responseCode);
        expect(res.body.message).to.eq(message);
        expect(res.body.type).to.eq(type);
        expect(res.body.value).to.eq('value retrieved from response')
      });
    });

    it('TC02. Should not allow user to register with an already registered EmailID', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register_dupEmail,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.PATIENT_WITH_VALID_DETAILS,
      }).then((res) => {
        expect(res.status).to.eq(409);
        expect(res.message).to.eq('Conflict - Email ID already exists');
      });
    });

    it('TC10. Should not be able to create user with missing email', () => {
      cy.request({
        method: 'POST',
        url: ENDPOINTS.register,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.PATIENT_WITH_MISSING_EMAIL,
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

    it('TC11. Should not be able to create user with missing password', () => {
      cy.request({
        method: 'POST',
        url: ENDPOINTS.register,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.PATIENT_WITH_MISSING_PASSWORD,
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

    it('TC12. Unauthorized user should not be able to access the registration service', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register,
        headers: {
          'Authorization': ''
        },
        body: REGISTER.PATIENT_WITH_VALID_DETAILS,
      }).then((res) => {
        expect(res.status).to.eq(401);
        expect(res.message).to.eq('Unauthorized');
      });
    });

    it('TC13. Unauthenticated user should be forbidden to access the resource', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register, //Assume user doesnt have access to this resource.
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.PATIENT_WITH_VALID_DETAILS,
      }).then((res) => {
        expect(res.status).to.eq(403);
        expect(res.message).to.eq('Forbidden');
      });
    });

    it('TC03. Should register a new patient successfully with duplicate Email', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register_dupEmail_false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.PATIENT_WITH_VALID_DETAILS,
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

    it('TC04. Should register a new patient successfully with password encrypted', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register_encPwd,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.PATIENT_WITH_VALID_DETAILS,
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

    it('TC05. Should register a new patient successfully without encrypting the password', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register_encPwd_false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.PATIENT_WITH_VALID_DETAILS,
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

    it('TC06. Should register a new patient successfully with EmailID encrypted', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register_encEmail,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.PATIENT_WITH_VALID_DETAILS,
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

    it('TC07. Should register a new patient successfully without encrypting EmailID', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register_encEmail_false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.PATIENT_WITH_VALID_DETAILS,
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

    it('TC08.should register a new patient successfully with an existing EmailID and with encrypted EmailID and Password', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.PATIENT_WITH_VALID_DETAILS,
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

    it('TC09.should register a new patient successfully with a new EmailID and without encrypting EmailID and Password', () => {
      cy.request({
        method:'POST',
        url: ENDPOINTS.register,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: REGISTER.PATIENT_WITH_VALID_DETAILS,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.message).to.eq('Success');
        expect(res.body.responseCode).to.eq(responseCode);
        expect(res.body.message).to.eq(message);
        expect(res.body.type).to.eq(type);
        expect(res.body.value).to.eq('value retrieved from response');
       /*  Make a DB connection, retrieve the data (EmailID and Password) from DB and validate whether the data encrypted 
       as specified by query parameters hashAndEncryptPassword and encryptEmailAddress */
        expect(db.table.emailID).to.eq("Encrypted Email ID");
        expect(db.table.password).to.eq("Encrypted Password");
      })
    });

  });
});
