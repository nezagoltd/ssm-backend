/**
     *@param {object} expectedInput
     *@param {object} givenInput
     *@returns {object} filteredInput
     *@description {object} it filters the passed input from the frontend to avoid
     * unnecessary passed data which may be sent by attackers to break the system
     */
const removeUnexpectedInput = (expectedInput, givenInput) => {
  const inputKeys = Object.keys(givenInput);
  const filteredInputs = {};

  inputKeys.forEach((currKey) => {
    if (expectedInput.includes(currKey)) {
      filteredInputs[currKey] = givenInput[currKey];
    }
  });

  return filteredInputs;
};

/**
 * @class
 * @classdesc this class DataCable contains Create, Read, Update, methods which work with
 * database immediately, it can be extended or called from services, controllers, or routes
 */
class DataCable {
  /**
     * @param {object} model
     * @description returns the model name
     */
  constructor() {
    this.model = {};
    this.associateTable = [];
  }

  /**
     * @param {object} inputData
     * @returns {object} savedData
     * @description it returns the saved data
     */
  saveAll = async (inputData) => {
    const tableFields = Object.keys(this.model.rawAttributes);
    const acceptedSave = removeUnexpectedInput(tableFields, inputData);
    let results;
    try {
      const savedData = await this.model.create(acceptedSave);
      results = savedData;
    } catch (err) {
      throw new Error(err);
    }
    return results;
  }

  /**
   * @param {object} whereCondition
   * @returns {object} foundRes
   * @method
   * @description it gets whereCondition which should be an object containing the attribute of the
   * table and its value, example if you want to get by phoneNumber, ypu will pass the
   * whereCondition as this {phoneNumber:"+250722792371"} then it returns the object containing a
   * user with that phoneNumber
   */
  getBy = async (whereCondition) => {
    const inclusion = this.associateTable.map((table => ({ model: table })));
    const foundRes = await this.model.findOne({ where: whereCondition, include: inclusion });
    return foundRes;
  }

  // /**
  //  * @param {object} whereCondition
  //  * @returns {object} foundRes
  //  * @method
  //  * @description it gets whereCondition which should be an object
  //  * containing the attribute of the
  //  * table and its value, example if you want to get by phoneNumber, ypu will pass the
  //  * whereCondition as this {phoneNumber:"+250722792371"} then it returns the object containing a
  //  * user with that phoneNumber
  //  */
  // getAll = async (whereCondition) => {
  //   const inclusion = this.associateTable.map((table => ({ model: table })));
  //   const foundRes = whereCondition
  //     ? await this.model.findAndCountAll({ where: whereCondition, include: inclusion })
  //     : await this.model.findAndCountAll({ include: inclusion });
  //   return foundRes;
  // }

  /**
   * @param {object} dataToUpdate
   * @param {object} whereCondition
   * @returns {object} updatedData
   * @method
   * @description it gets the data to update as argument and where condition and it returns the
   * updated data, whereCondition should be an object, eg: {id:4}
   */
  updateBy = async (dataToUpdate, whereCondition) => {
    const tableFields = Object.keys(this.model.rawAttributes);
    const validDataToUpdate = removeUnexpectedInput(tableFields, dataToUpdate);
    const updatedData = await this.model.update(validDataToUpdate, {
      where: whereCondition, returning: true,
    });
    return updatedData;
  }

  // /**
  //  * @param {object} whereCondition
  //  * @returns {string} deleteEntry
  //  * @method
  //  * @description it deletes the entry from a model
  //  */
  // temporaryDelete = async (whereCondition) => {
  //   const deletedEntry = await this.model.destroy({ where: whereCondition });
  //   return deletedEntry;
  // }
}

export default DataCable;
