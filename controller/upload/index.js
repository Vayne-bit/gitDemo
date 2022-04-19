
const { isEmptyArr } = require("../../utils/check");
const upload = require("../../service/upload");
module.exports = async ctx => {
  const { response } = ctx;
  const { files } = ctx.request;
  try {
    if ( isEmptyArr(files) ) throw ("请选择上传文件");
    const uploadRes = await upload(files);
    response.body = uploadRes;
  } catch (error) {
    console.log('error:::', error);
    if (typeof error === 'object') error = '未知错误';
    response.body = {
      error_code: 1001,
      error_msg: error
    }
  }
};