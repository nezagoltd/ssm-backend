import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../bin/main';
import { userValidLoginData } from '../mocks/user.mock.data';
import { errorMessages, successMessages } from '../../app/helpers/messages.helper';
import { successCodes } from '../../app/helpers/statusCodes.helper';

chai.use(chaiHttp);

const { loginFail } = errorMessages;
const { loginSuccess, loggedOut } = successMessages;
const { ok } = successCodes;
let loginToken = '';

describe('Test the login feature', () => {
  it('Will login successfully, and send token on a successful login', (done) => {
    chai
      .request(server)
      .post('/api/session/login')
      .send(userValidLoginData)
      .end((err, res) => {
        loginToken = res.body.token;
        expect(res.status).to.equal(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string');
        expect(res.body.token).to.be.a('string');
        expect(res.body.data).to.equal(null);
        expect(res.body.message).to.equal(loginSuccess);
        done(err);
      });
  });
});
