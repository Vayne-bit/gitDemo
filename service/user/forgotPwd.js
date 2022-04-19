

const { findOneAndUpdate } = require("../../model/user")
module.exports = async ({tel, username, newPwd}) =>{
  console.log("service - forgot - start");
  try {
    const res = await findOneAndUpdate(
      {username, tel}, 
      {password: newPwd}
    );
    console.log('service', res)
    if (!res) throw '修改失败';
    return {
      error_code: 0,
      error_msg: '请求成功'
    };
  } catch (error) {
    throw error;
  }
};