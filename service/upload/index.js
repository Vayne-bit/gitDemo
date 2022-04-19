const path = require("path");
const fs = require("fs");
const getIp = require("../../utils/getIp");
module.exports = async files => {
  try {
    let filePaths = [];
    for(let key in files){
      let file = files[key];
      console.log("upload start------", file)
      const filename = new Date().getTime()+file.name;
      const newFile = path.resolve(__dirname, "../../public/upload", filename);
      fs.createReadStream(file.path)
        .pipe(
          fs.createWriteStream(
            newFile
          )
        )
      // 获取本主机的IP
      const ip = getIp();
      filePaths.push(`http://${ip}:3000/upload/${filename}`);
    }
    console.log("service - upload - filePaths", filePaths);
    return {
      error_code: 0,
      error_msg: '请求成功',
      files: filePaths
    }
  } catch (error) {
    console.log('service - upload - error:', error);
    throw '上传文件失败'
  }
};