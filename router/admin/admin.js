const express = require("express");
const router = express.Router();
const pool = require("../../pool.js");
// 引入token方法
const { getToken, checkToken } = require("../../utils/token");
// 引入svgcaptcha
// const captcha = require("svg-captcha");

// -----------------------------------

// 校验是不是管理员
// 请求方式：post
// 请求地址：http://localhost:3000/v1/admin/login
router.post("/login", (req, res, next) => {
  let aname = req.body.aname;
  let apwd = req.body.apwd;
  // 检验结果 uname和upwd
  let sql = "SELECT aid FROM jm_admin WHERE aname = ? AND apwd = ?";
  pool.query(sql, [aname, apwd], (err, r) => {
    if (err) {
      next(err);
      return;
    }
    if (r.length != 0) {
      // 生成webtoken
      let userID = 1004;
      let token = getToken(aname, userID);
      // 响应中要携带token
      res.send({
        code: 200,
        msg: "登录成功",
        // 发送的时候可以携带 token
        token,
      });
    } else {
      res.send({
        code: 201,
        msg: "登陆失败,请检查用户名",
      });
    }
  });
});

// 验证Token
// 请求方式：get
// 请求地址：http://localhost:3000/v1/admin/verifyToken
router.get("/verifyToken", checkToken, (req, res, next) => {
  res.send({
    code: 200,
    msg: "Token验证成功",
  });
});

// 接收验证码的接口 获取验证码svg图片，推荐使用svg-captcha
// 请求方式：get
// 请求地址：http://localhost:3000/v1/users/getcode
// 这个用于存储token和验证码答案
let redis = {};
router.get("/getcode", (req, res) => {
  // 生成验证码对象
  let cap = captcha.create();
  // 正确答案 cap.text
  console.log("正确答案" + cap.text);
  // 正确答案要存储,结合token和正确答案
  res.send({
    svg: cap.data,
  });
});
// ----------------------------------

// 暴露
module.exports = router;
