import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../bin/main';
import { dataForUpdatingUser } from '../mocks/user.mock.data';
import { successMessages } from '../../app/helpers/messages.helper';
import { successCodes } from '../../app/helpers/statusCodes.helper';

chai.use(chaiHttp);

// const { loginFail } = errorMessages;
const { updateSuccess } = successMessages;
const { ok } = successCodes;

describe('Test the update user feature', () => {
  it('Will update user successfully', (done) => {
    chai
      .request(server)
      .patch('/api/users/update/1')
      .send(dataForUpdatingUser)
      .end((err, res) => {
        expect(res.status).to.equal(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string');
        expect(res.body.token).to.equal(null);
        expect(res.body.data).to.equal(null);
        expect(res.body.message).to.equal(updateSuccess);
        done(err);
      });
  });
});
