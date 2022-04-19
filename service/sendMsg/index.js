

module.exports = ({tel, ctx}) => {
  const code = (Math.floor(Math.random()*900000) + 100000).toString();
  ctx.session[tel] = code;
  console.log("sendMsg - code - session:code", ctx.session);
  console.log("sendMsg - code - res", code);
  return {
    error_code: 0,
    error_msg: '请求成功',
    data: {
      code
    }
  };
};