import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../bin/main';
import { userRegMock } from '../mocks/user.mock.data';

chai.use(chaiHttp);

describe('Test the registration feature', () => {
  it('Will send user data on registration endpoint', (done) => {
    chai
      .request(server)
      .post('/api/users')
      .send(userRegMock)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string');
        expect(res.body.data).to.be.a(null);
        expect(res.body.token).to.equal(null);
        done(err);
      });
  });
});
