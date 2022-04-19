const mongo = require("../mongo");
const { Schema, model } = mongo;
const msgSchema = new Schema({
  // 哪个用户的未读消息
  userId: {
    type: String,
    required: true
  },
  // 哪个用户发送过来的消息
  fromUserId: {
    type: String
  },
  // 我的评论的Id
  userComment: {
    type: String
  },
  // 未读消息的内容
  content: {
    type: String
  },
  // 关于哪篇文章的未读消息
  articleId: {
    type: String
  },
  // 是否查看消息
  lookStatus: {
    type: Boolean,
    default: false
  }

}, {
  versionKey: false,
  timestamps: true
});

module.exports = model('message', msgSchema);