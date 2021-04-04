import services from '../../services';

/**
 * @description it prepares userrole data
 * @param {object} req
 * @returns {object} userRoleData
 */
const getRoleData = async req => {
  const { RoleServiceInstance } = services;
  let userRoleData;
  if (req.body.roleId) {
    userRoleData.passedRoleId = req.body.roleId;
  } else {
    const accountantRole = await RoleServiceInstance.getBy({ name: 'accountant' });
    const roleId = accountantRole.id;
    userRoleData.passedRoleId = roleId;
  }
  userRoleData.passedUserId = req.params.userId;
  return userRoleData;
};

/**
 * @description it sets data for approving new user
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
const dataForApprovingUser = async (req, res, next) => {
  const userRoleData = await getRoleData(req);
  const { userId } = req.params;
  const dataToUpdate = { isApproved: true, isActive: true };
  const whereCondition = { id: userId };
  req.body.passedRoleId = userRoleData.passedRoleId;
  req.body.passedUserId = userRoleData.passedUserId;
  req.dataToUpdate = dataToUpdate;
  req.whereCondition = whereCondition;
  next();
};

export default dataForApprovingUser;
