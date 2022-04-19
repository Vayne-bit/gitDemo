const path = require("path");
const Koa = require("koa");
const route = require("koa-route");
const compose = require("koa-compose");
const static = require("koa-static");
const koaBody = require("koa-body");
const session = require('koa-session');
// const cors = require("koa2-cors");
const app = new Koa();
// moment 格式化日期组件
const checkToken = require("./utils/checkToken");
app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 1000 * 60 * 60 * 10,//session 有效期 1h
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};
// 给手机发送验证码
const sendMsg = require("./controller/sendMsg");
// 注册
const register = require("./controller/user/register");
// 登录
const login = require("./controller/user/login");
// 修改密码
const editPwd = require("./controller/user/editPwd");
// 忘记密码
const forgotPwd = require("./controller/user/forgotPwd");
// 修改用户信息
const editInfo = require("./controller/user/editInfo");
// 获取用户信息
const getUserInfo = require("./controller/user/getUserInfo");
// 多文件上传到服务器
const upload = require("./controller/upload");
// 发布文章
const artAdd = require("./controller/article/add");
// 查找文章
const artFind = require("./controller/article/find");
// 获取文章详情
const artDetails = require("./controller/article/getDetails");
// 点赞或取消点赞
const artLike = require("./controller/article/like");
// 收藏或取消收藏
const artkeep = require("./controller/article/keep");
// 删除文章
const artDelete = require("./controller/article/deleteOne");
// 添加评论
const commentAdd = require("./controller/comment/add");
// 回复评论
const commentReply = require("./controller/comment/reply");
// 根据文章id获取评论
const getCommentByArtId = require("./controller/comment/getListByArtId");

app.use(session(CONFIG, app));
app.use(
  // 合并中间件
  compose([
    static(path.resolve(__dirname, 'public')),
    // 设置跨域属性
    // cors({
    //   origin: '*', // 允许所有域访问该服务器
    //   maxAge: 60*60,  //预检测结果可以被缓存的最大时间
    //   allowMethods: ['POST'], // 跨域所允许的请求方法【只允许POST请求】
    // }),
    // POST请求以及上传文件
    koaBody({
      multipart: true,
      formidable: {
          maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
      }
    }),
    // 拦截器
    async (ctx, next) => {
      const url = ctx.request.url;
      if(url === '/user/login' || 
        url === '/user/reg' ||
        url === '/user/forgotPwd' ||
        url === '/upload' ||
        url === '/sendMsg') {
        await next();
      } else {
        console.log("开始校验token");
        const flag = await checkToken({ctx});
        console.log('flag:', flag)
        if (!flag) return ctx.response.body = {
          error_code: -100,
          error_msg: 'token失效'
        };
        await next();
      }
    },
    route.post("/sendMsg", sendMsg),
    route.post("/user/reg", register),
    route.post("/user/login", login),
    route.post("/user/editPwd", editPwd),
    route.post("/user/forgotPwd", forgotPwd),
    route.post("/user/editInfo", editInfo),
    route.post("/user/getUserInfo", getUserInfo),
    route.post("/upload", upload),
    route.post("/article/add", artAdd),
    route.post("/article/find", artFind),
    route.post("/article/getDetails", artDetails),
    route.post("/article/delete", artDelete),
    route.post("/article/like", artLike),
    route.post("/article/keep", artkeep),
    route.post("/comment/add", commentAdd),
    route.post("/comment/reply", commentReply),
    route.post("/commment/getCommentByArtId", getCommentByArtId),
  ])
);

// 监听服务端口3000
app.listen(3000, err => {
  if(err) {
    console.log('err:', err);
    return;
  }
  console.log('服务已启动');
});
