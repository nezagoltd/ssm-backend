import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../bin/main';

chai.use(chaiHttp);

describe('Test the app if it launches', () => {
  it('Will request the welcome route', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('Welcome to SSM!');
        done();
      });
  });
});
