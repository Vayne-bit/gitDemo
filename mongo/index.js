const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zixun', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false  
}, err => {
  if (err) {
    console.log('连接失败');
    throw (err);
  }
  console.log('数据库连接成功');
});
module.exports = mongoose;