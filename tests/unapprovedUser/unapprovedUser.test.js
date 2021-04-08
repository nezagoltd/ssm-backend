import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../bin/main';
import { successMessages } from '../../app/helpers/messages.helper';
import { successCodes } from '../../app/helpers/statusCodes.helper';

chai.use(chaiHttp);

// const { noRecordFound } = errorMessages;
const { recordFound } = successMessages;
// const { notFound } = failureCodes;
const { ok } = successCodes;

describe('Test the get unapproved users API', () => {
  it('Will not find any user who is unapproved', (done) => {
    chai
      .request(server)
      .get('/api/users/not-approved-users')
      .end((err, res) => {
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal(recordFound);
        expect(res.body.token).to.equal(null);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('count');
        expect(res.body.data).to.have.property('rows');
        expect(res.body.data.count).to.be.a('number');
        expect(res.body.data.count).to.be.greaterThan(0);
        expect(res.body.data.rows).to.be.an('array');
        expect(res.body.data.rows.length).to.be.greaterThan(0);
        done(err);
      });
  });
  // it('Will not login, send an error message of a failed login', (done) => {
  //   chai
  //     .request(server)
  //     .post('/api/login')
  //     .send(userInvalidEmailLogin)
  //     .end((err, res) => {
  //       expect(res.body).to.be.an('object');
  //       expect(res.body).to.have.property('error');
  //       expect(res.body.error).to.be.a('string');
  //       expect(res.body.error).to.equal(loginFail);
  //       done(err);
  //     });
  // });
});
