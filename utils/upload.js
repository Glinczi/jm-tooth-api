/*
 * @Author: Iamxiaoz gcz9956@outlook.com
 * @Date: 2022-08-01 14:41:12
 * @LastEditors: Iamxiaoz gcz9956@outlook.com
 * @LastEditTime: 2022-08-01 15:50:56
 * @FilePath: \jm-tooth-api\utils\upload.js
 * @Description: 文件上传模块(配置)
 */
//

const multer = require("multer");
const uuid = require("uuid");

// 配置multer
// 对上传进行更多的控制,配置storage
const storage = multer.diskStorage({
  // destination 上传的文件存储在哪里
  destination: function (req, file, cb) {
    // cd用来定义存储的文件夹
    cb(null, "public/doctor");
  },
  // filename 确定文件夹中的文件名
  filename: function (req, file, cb) {
    // 用于获取文件的原始文件名
    let name = file.originalname;
    // 截取文件的后缀名
    let ext = name.substr(name.lastIndexOf("."));
    // uuid.v4()会生成随机的uuid
    cb(null, uuid.v4() + ext);
  },
});
const upload = multer({
  storage: storage,
  // limits:{
  //   fileSize:200
  // }
});

module.exports = upload;
