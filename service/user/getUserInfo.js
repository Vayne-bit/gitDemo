
const  { findOne } = require("../../model/user");

module.exports = async ({ userId }) => {
  try {
    console.log('service - findOne - params:', userId);
    const res = await findOne({_id: userId}, 'avatarUrl birthday nickname sex tel username');
    if (!res) throw '修改失败';
    return {
      error_code: 0,
      error_msg: '请求成功',
      data: res
    };
  } catch (error) {
    throw "数据库操作错误";
  }
};