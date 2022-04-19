
const { findOneAndUpdate} = require("../../model/user");
/**
 * 修改密码需要传递新密码，旧密码，如果旧密码不正确则不能修改
 * @param {*} param0 
 * @returns 
 */
module.exports = async ({ userId, newPwd, oldPwd }) => {
  try {
    console.log("service - editPwd :params:", userId, newPwd, oldPwd)
    // 修改密码 updateOne 修改成功也返回undefined
    const res = await findOneAndUpdate({_id: userId}, {password: newPwd});
    if (!res) throw '修改失败';
    return {
      error_code: 0,
      error_msg: '请求成功'
    };
  } catch (error) {
    throw error;
  }
};