import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../bin/main';
import { userToken } from '../mocks/user.mock.data';

chai.use(chaiHttp);

describe('Test the verify user feature', () => {
  it('Will request to verify user endpoint', (done) => {
    chai
      .request(server)
      .get(`/api/users/verify-email?token=${userToken}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string');
        expect(res.body.data).to.be.equal(null);
        expect(res.body.token).to.equal(null);
        done(err);
      });
  });
});
