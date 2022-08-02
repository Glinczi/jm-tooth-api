/*
 * @Author: Iamxiaoz gcz9956@outlook.com
 * @Date: 2022-07-31 11:03:05
 * @LastEditors: Iamxiaoz gcz9956@outlook.com
 * @LastEditTime: 2022-07-31 11:38:56
 * @FilePath: \jm-tooth-api\utils\token.js
 * @Description: token生成和验证封装
 */
// 引入jsonwebtoken模块
const jwt = require("jsonwebtoken");
// 设置 token 密钥
const key = "gliczi";

// 生成token字符串需要两个值,一个是payload,一个是密钥

/**
 * @description: 用于生成Token字符串的函数
 * @param {string} name -- 用户名
 * @param {number} userID -- 用户随机生成的ID
 * @return {string} 返回值 token字符串
 */
function getToken(name, userID) {
  let payload = {
    name: name,
    userID: userID,
    exp: Date.now() / 1000 + 3600 * 24,
  };
  let token = jwt.sign(payload, key);
  return token;
}
// 验证token需要两个值,一个是前端传递回来的token字符串,一个是密钥
/**
 * @description:
 * @param {*} req -- 请求参数
 * @param {*} res -- 响应参数
 * @param {*} next -- 跳到下一个中间件
 * @return {*}
 */
function checkToken(req, res, next) {
  let token = req.headers.authorization;
  jwt.verify(token, key, (err, decode) => {
    // err如果是null,说明验证成功,反之
    if (err != null) {
      res.send({
        code: "401",
        msg: "Token验证失败",
      });
    } else {
      req.jwtInfo = decode;
      next();
    }
  });
}

// 暴露两个方法
module.exports = {
  getToken,
  checkToken,
};
