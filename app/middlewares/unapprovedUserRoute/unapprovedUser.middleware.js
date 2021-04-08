/**
 * @description it prepares the whereConditions and saves it in request
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
const unapprovedUserData = (req, res, next) => {
  req.whereCondition = { isApproved: false };
  next();
};

export default unapprovedUserData;
