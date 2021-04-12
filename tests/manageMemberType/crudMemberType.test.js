import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../bin/main';
import { memberTypeUpdatingData, memberTypeValidData } from './memberType.mock.data';
import { errorMessages, successMessages } from '../../app/helpers/messages.helper';
import { failureCodes, successCodes } from '../../app/helpers/statusCodes.helper';

chai.use(chaiHttp);

const { updateFail, noRecordFound, deleteRecordFail } = errorMessages;
const {
  recordCreateSuccess,
  recordFound,
  updateSuccess,
  deleteRecordSuccess,
} = successMessages;
const { internalServerError, notFound } = failureCodes;
const { ok, created } = successCodes;

describe('Test the manage memberType feature', () => {
  it('Will create memberType successfully', (done) => {
    chai
      .request(server)
      .post('/api/member-types/create')
      .send(memberTypeValidData)
      .end((err, res) => {
        expect(res.status).to.equal(created);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string');
        expect(res.body.token).to.equal(null);
        expect(res.body.data).to.be.an('object');
        expect(res.body.message).to.equal(recordCreateSuccess);
        done(err);
      });
  });
  it('Will read all memberTypes successfully', (done) => {
    chai
      .request(server)
      .get('/api/member-types')
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
  it('Will retrieve a one memberType', (done) => {
    chai
      .request(server)
      .get('/api/member-types/all/1')
      .end((err, res) => {
        expect(res.status).to.equal(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal(recordFound);
        done(err);
      });
  });
  it('Will not update an member types', (done) => {
    chai
      .request(server)
      .patch('/api/member-types/update/0')
      .end((err, res) => {
        expect(res.status).to.equal(internalServerError);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal(updateFail);
        done(err);
      });
  });
  it('Will update member type successfully', (done) => {
    chai
      .request(server)
      .patch('/api/member-types/update/1')
      .send(memberTypeUpdatingData)
      .end((err, res) => {
        expect(res.status).to.equal(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal(updateSuccess);
        done(err);
      });
  });
  it('Will delete an member types', (done) => {
    chai
      .request(server)
      .delete('/api/member-types/1')
      .end((err, res) => {
        expect(res.status).to.equal(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string');
        expect(res.body.token).to.equal(null);
        expect(res.body.data).to.equal(null);
        expect(res.body.message).to.equal(deleteRecordSuccess);
        done(err);
      });
  });
  it('Will not delete an member types', (done) => {
    chai
      .request(server)
      .delete('/api/member-types/0')
      .end((err, res) => {
        expect(res.status).to.equal(internalServerError);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal(deleteRecordFail);
        done(err);
      });
  });
  it('Will not retrieve an membertype', (done) => {
    chai
      .request(server)
      .get('/api/member-types/all/3')
      .end((err, res) => {
        expect(res.status).to.equal(notFound);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal(noRecordFound);
        done(err);
      });
  });
  it('Will not read any memberType', (done) => {
    chai
      .request(server)
      .get('/api/member-types')
      .end((err, res) => {
        expect(res.status).to.equal(notFound);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal(noRecordFound);
        done(err);
      });
  });
});
