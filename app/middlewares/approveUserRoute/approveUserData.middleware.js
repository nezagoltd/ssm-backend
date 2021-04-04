/**
 * @description it sets data for approving new user
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
const dataForApprovingUser = async (req, res, next) => {
  const { userId } = req.params;
  const dataToUpdate = { isApproved: true };
  const whereCondition = { id: userId };
  req.dataToUpdate = dataToUpdate;
  req.whereCondition = whereCondition;
  next();
};

export default dataForApprovingUser;
