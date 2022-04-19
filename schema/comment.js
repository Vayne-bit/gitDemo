
const mongo = require("../mongo");

const { Schema, model } = mongo;


const commentSchema = new Schema({
  createTime: {
    type: Number,
    default: Date.now()
  },
  articleId: {
    type: String
    // type: Schema.Types.ObjectId,
    // ref: 'article'
  },
  // 哪个用户评论的
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  content: {
    type: String
  },
  like: {
    type: Number,
    default: 0
  },
  // 点赞这条评论的用户Id
  likeUserId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  replyList: {
    type: [
      /**
       * {
       *    replyUserId: '',
       *    replyId: '',
       *    replyContent: '',
       *    replyCreateTime: '',
       *    replyLike: 0,
       *    replyLikeUserId: '',
       *    reply2UserId: '',
       *    reply2Id: ''
       * }
       */
      Object
    ],
    default: []
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = model('comment', commentSchema);


