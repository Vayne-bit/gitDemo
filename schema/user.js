const mongo = require("../mongo");
const getIp = require("../utils/getIp");
const {model , Schema} = mongo;

const user = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  nickname: {
    type: String,
    default: "用户" + Date.now().toString()
  },
  tel: {
    type: String
  },
  createTime: {
    type: Date,
    default: Date.now()
  },
  birthday: {
    type: String,
    default: Date.now().toString()
  },
  sex: { //0 - 男； 1 - 女
    type: String,
    default: '0'
  },
  avatarUrl: {
    type: String,
    default: () => {
      return `http://${getIp()}:3000/imgs/head.png`
    }
  }
}, {
  versionKey: false,
  timestamps: true
});
// 映射集合users
module.exports = model('user', user);