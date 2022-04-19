
const { find, count } = require("../../model/article");
const { countDocuments } = require("../../model/comment");
module.exports = async ({pageNum, pageSize, type, userId}) => {
  try {
    console.log('service - article - find - params:', pageNum, pageSize, type, userId);
    const skip = (pageNum - 1) * pageSize;
    console.log('skip-------', skip);
    
    let conditions = type === '0' ? {} : { type };
    if (userId) conditions.userId = userId;
    const query = {sort: {_id: -1}, skip, limit: pageSize};
    const list = await find(conditions, 'title thumbnail userId nickname _id createTime type', query);
    console.log('list------------------------', list);
    let list2 = JSON.parse(JSON.stringify(list));
    list2.forEach(async (item, index) => {
      const commentCount = await countDocuments({articleId: item._id});
      console.log('commentCount::', commentCount);
      list2[index]['commentCount'] = commentCount;
    });
    
    const total = await count(conditions);
    console.log("service - article - find - list,total", list2, total);
    return {
      error_code: 0,
      error_msg: '请求成功',
      list: list2,
      data: {
        total
      }
    };
  } catch (error) {
    throw error;
  }
};