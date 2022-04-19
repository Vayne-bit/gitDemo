const { create, findOne } = require("../../model/user");
const login = require("./login");
/**
 * 注册逻辑：
 *  1、首先根据用户名判断该账号是否已注册
 *    1.1、已经注册的话提示已注册
 *    1.2、去注册
 *  2、注册完成去自动登录，并返回userId以及token
 * @param {*} param0 
 * @returns 
 */
module.exports = async ({username, password, tel, ctx}) => {
  console.log("service-----------findOne--------------------start-");
  console.log(username, password, tel, ctx);
  try {
    console.log("service-----------findOne--------------------start");
    // 1、首先根据用户名判断该账号是否已注册
    const findRes = await findOne({username});
    console.log("service-----------findOne--------------------", findRes)
    if (findRes) throw '该用户名已注册';
    // 注册
    await create({username, password, tel});
    // 登录
    return await login({username, password, ctx})
  } catch (error) {
    throw error
  }
};