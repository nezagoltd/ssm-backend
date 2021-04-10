import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../bin/main';
import { successMessages } from '../../app/helpers/messages.helper';
import { successCodes } from '../../app/helpers/statusCodes.helper';

chai.use(chaiHttp);

// const { noRecordFound } = errorMessages;
const { recordFound } = successMessages;
const { ok } = successCodes;

describe('Test the read users feature', () => {
  it('Will retrieve all users', (done) => {
    chai
      .request(server)
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.equal(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string');
        expect(res.body.token).to.equal(null);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('count');
        expect(res.body.data).to.have.property('rows');
        expect(res.body.data.count).to.be.a('number');
        expect(res.body.data.count).to.be.greaterThan(0);
        expect(res.body.data.rows).to.be.an('array');
        expect(res.body.data.rows.length).to.be.greaterThan(0);
        expect(res.body.message).to.equal(recordFound);
        done(err);
      });
  });
});
