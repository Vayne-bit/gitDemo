
const editInfo = require("../../service/user/editInfo");
const { isEmpty } = require("../../utils/check");
const { sexDic } = require("../../dictionary");
// 日期格式化插件
// const moment = require("moment");
module.exports = async ctx => {
  const { request, response } = ctx;
  const { userId, nickname, sex, birthday, avatarUrl } = request.body;
  console.log('---controller---editInfo------params:', userId, nickname, sex, birthday,  avatarUrl);
  try {
    if (isEmpty(userId)) throw '用户Id不能为空';
    if (isEmpty(nickname)) throw '昵称不能为空';
    if (!Object.values(sexDic).includes(sex)) throw '性别格式不正确';
    if (isEmpty(birthday)) throw '生日不能为空';
    if (isEmpty(avatarUrl)) throw '头像路径不能为空';
    // 响应数据
    response.body = await editInfo({ userId, nickname, sex, birthday,  avatarUrl });
  } catch (error) {
    console.log('---controller---editInfo------error:', error);
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    }
  }
};