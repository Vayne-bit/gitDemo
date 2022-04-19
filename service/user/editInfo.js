
const  { findOneAndUpdate } = require("../../model/user");
const moment = require("moment");
module.exports = async ({ userId, nickname, sex, birthday,  avatarUrl }) => {
  try {
    console.log('service - findOneAndUpdate - params:', userId, nickname, sex, birthday,  avatarUrl);
    birthday = moment(birthday).valueOf();
    const res = await findOneAndUpdate({_id: userId}, {nickname, sex, birthday,  avatarUrl});
    if (!res) throw '修改失败';
    return {
      error_code: 0,
      error_msg: '请求成功'
    };
  } catch (error) {
    throw "数据库操作错误";
  }
};