
const { create } = require("../../model/article")
module.exports = async ({userId, title, type, content, thumbnail}) => {
  try {
    // 创建文章
    const res = await create({userId, title, type, content, thumbnail});
    console.log('service - article - add - res:', res);
    return {
      error_code: 0,
      error_msg: '请求成功'
    }
  } catch (error) {
    throw error;
  }
};