const { find, countDocuments } = require("../../model/comment");
const { findOne } = require("../../model/user");
module.exports = async ({ articleId, pageNum, pageSize }) => {
  try {
    console.log("service - comment - getListByArtId - params:", articleId, pageNum, pageSize);
    const skip = (pageNum - 1) * pageSize;
    const query = {sort: {_id: -1}, skip, limit: pageSize};
    let list2 = await find({ articleId }, '', query);
    let list = JSON.parse(JSON.stringify(list2));
    for(let i = 0; i < list.length; i ++) {
      const reply = list[i].replyList
      for(let j = 0; j < reply.length; j ++) {
        const replyUserId = reply[j]['replyUserId'];
        const { nickname } = await findOne({_id: replyUserId});
        reply[j]['nickname'] = nickname;
      }
    }
    
    // console.log("service - comment - getListByartId - list:--", await find({ articleId }, '', query));
    // list = list ? list : [];
    const total = await countDocuments({articleId});
    console.log("service - comment - getListByartId - res:", list);
    return {
      data: {
        total
      },
      error_code: 0,
      error_msg: '请求成功',
      list
    };
  } catch (error) {
    throw error;
  }
};