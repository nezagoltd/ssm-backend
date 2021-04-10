import dotenv from 'dotenv';

dotenv.config();

const { SUPERADMIN_EMAIL, SUPERADMIN_PASSWORD } = process.env;

export const userRegMock = {
  firstName: 'userFname',
  lastName: 'userLname',
  email: 'userFname@ssm.com',
  password: 'userFname',
};

export const userRoleMock = {
  roleId: 1,
};

export const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoic3VwZXJhZG1pbiIsImxhc3ROYW1lIjoic3VwZXJhZG1pbiIsImVtYWlsIjoiZW1tYW51ZWxsYW11Z2lAZ21haWwuY29tIiwidXBkYXRlZEF0IjoiMjAyMS0wNC0wNVQxNjo0NToxNS45NjdaIiwiY3JlYXRlZEF0IjoiMjAyMS0wNC0wNVQxNjo0NToxNS45NjdaIiwiaXNBcHByb3ZlZCI6ZmFsc2UsImlzVmVyaWZpZWQiOmZhbHNlLCJpc0FjdGl2ZSI6ZmFsc2UsImRlbGV0ZWRBdCI6bnVsbCwiaWF0IjoxNjE3NjQxMTE2LCJleHAiOjE2MTc3Mjc1MTZ9.ED5P377zzvANi5wg-MCeZ91oPJTdoZiIoUuSbt7pr3c';

export const userValidLoginData = {
  email: SUPERADMIN_EMAIL,
  password: SUPERADMIN_PASSWORD,
};

export const userInvalidEmailLogin = {
  email: 'superadmin',
  password: 111,
};

export const dataForUpdatingUser = {
  firstName: 'Mugisha',
  email: 'people@me.cdp',
};
