/**
 * @class
 */
class UserController {
  /**
   * @constructor
   * @param {object} service
   */
  constructor(service) {
    this.service = service;
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /users
   */
  all = (req, res) => {}

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description POST: /users
   */
  create = (req, res) => {}

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /users/userId
   */
  show = (req, res) => {}

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description PATCH: /users/userId
   */
  update = (req, res) => {}

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description DELETE: /users/userId
   */
  delete = (req, res) => {}
}
export default UserController;