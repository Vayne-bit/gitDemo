const mongo = require("../mongo");
// const userSchema = require("./user");
const { model, Schema } = mongo;
const articleSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  thumbnail: {
    type: [String]
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  type: {
    type: String
  },
  createTime: {
    type: Date,
    default: Date.now()
  },
  like: {
    type: Number,
    default: 0
  },
  // 点赞的用户的ID
  likeUserId: {
    type: Array
  },
  // 收藏数量
  keep: {
    type: Number,
    default: 0
  },
  // 收藏的用户Id
  keepUserId: {
    type: Array
  }
}, {
  versionKey: false,
  timestamps: true
});


module.exports = model("article", articleSchema);