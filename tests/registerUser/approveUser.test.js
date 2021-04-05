import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../bin/main';
import { userRoleMock } from '../mocks/user.mock.data';
import { successMessages } from '../../app/helpers/messages.helper';

const { roleAssignedSuccess } = successMessages;

chai.use(chaiHttp);

describe('Test the approval feature', () => {
  it('Will approve a user without sending any data', (done) => {
    chai
      .request(server)
      .patch('/api/users/approve-user/1')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal(roleAssignedSuccess);
        expect(res.body.data).to.be.equal(null);
        expect(res.body.token).to.equal(null);
        done(err);
      });
  });
  it('Will approve a user with sending roleData data', (done) => {
    chai
      .request(server)
      .patch('/api/users/approve-user/1')
      .send(userRoleMock)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal(roleAssignedSuccess);
        expect(res.body.data).to.be.equal(null);
        expect(res.body.token).to.equal(null);
        done(err);
      });
  });
});
