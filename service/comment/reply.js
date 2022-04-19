
const { findByIdAndUpdate, findById } = require("../../model/comment");
const mongoose = require('mongoose');
module.exports = async ({commentId, userId, replyUserId, replyContent}) => {
  try {
    console.log('service - comment - add - params:', commentId, userId, replyUserId, replyContent);
    // 查询该文章是否存在 如果id不存，则会抛出错误
    const artRes = await findById({id: commentId});
    console.log('service - comment - findById - artRes:', artRes);
    if (!artRes) throw '该评论已被删除';
    console.log("-------------------");
    // 将当前评论修改为已读
    // await findByIdAndUpdate(
    //   {
    //     id: commentId, 
    //     update: {
    //       status: true
    //     }
    //   }
    // );
    const { replyList } = artRes
    replyList.push({
      replyUserId,
      replyContent,
      replyCreateTime: Date.now(),
      replyId: mongoose.Types.ObjectId()
    })
    artRes.replyList = replyList
    // 回复评论
    const res = await findByIdAndUpdate({id: commentId, update: {
      $set: artRes
    }});
    console.log('service - comment - add - artRes:', res);
    if (!res) throw '数据库操作错误';
   
    return {
      error_code: 0,
      error_msg: '请求成功'
    };
  } catch (error) {
    console.log('service error', error)
    throw error;
  }
};