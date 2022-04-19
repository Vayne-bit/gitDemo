
const { isEmpty } = require("../../utils/check");
const { artType } = require("../../dictionary");
const add = require("../../service/article/add");
module.exports = async ctx => {
  const { request, response } = ctx;
  try {
    // 请求参数
    let { userId, title, type, content, thumbnail } = request.body;
    type = type && type.toString()
    console.log('controller- article - add - params:', userId, title, type, content, thumbnail)
    if (isEmpty(userId)) throw '用户Id不能为空';
    if (isEmpty(title)) throw '文章标题不能为空';
    if (isEmpty(content)) throw '文章内容不能为空';
    if (isEmpty(type)) throw '文章类型不能为空';
    if (!Object.values(artType).includes(type)) throw '文章类型不正确';
    if (!Array.isArray(thumbnail)) throw 'thumbnail格式不正确';
    console.log('controller- article - add - params:格式校验通过')
    response.body = await add({userId, title, type, content, thumbnail});
  } catch (error) {
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    }
  }
};