const response = require("../../config/response");
const State = require("../../model/state");
module.exports.getALLState = async (req, res) => {
    try {
      let  getList = await State.find({}).sort({ createdAt: -1 });
      if (getList.length > 0) {
        return response.returnTrue(req, res, "Record Found", getList);
      } else {
        return response.returnFalse(req, res, "No Record Found", []);
      }
    } catch (err) {
      return response.returnFalse(req, res, err.message, []);
    }
  };

