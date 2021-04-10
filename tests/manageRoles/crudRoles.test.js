import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../bin/main';
import { validRoleData } from '../mocks/role.mock.data';
import { errorMessages, successMessages } from '../../app/helpers/messages.helper';
import { failureCodes, successCodes } from '../../app/helpers/statusCodes.helper';

chai.use(chaiHttp);

const { roleCreateFail } = errorMessages;
const { roleCreateSuccess, recordFound } = successMessages;
const { internalServerError } = failureCodes;
const { ok, created } = successCodes;

describe('Test the manage role feature', () => {
  it('Will create role successfully', (done) => {
    chai
      .request(server)
      .post('/api/roles/create')
      .send(validRoleData)
      .end((err, res) => {
        expect(res.status).to.equal(created);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string');
        expect(res.body.token).to.equal(null);
        expect(res.body.data).to.be.an('object');
        expect(res.body.message).to.equal(roleCreateSuccess);
        done(err);
      });
  });
  it('Will read all roles successfully', (done) => {
    chai
      .request(server)
      .get('/api/roles')
      .end((err, res) => {
        console.log({ sentData: res.body });
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
