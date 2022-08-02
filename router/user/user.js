const express = require("express");
const router = express.Router();
const pool = require("../../pool.js");
// 引入token方法

// 引入svgcaptcha
const captcha = require("svg-captcha");

// -----------------------------------

// 校验是不是管理员
// 这里使用 localhost是为了解决响应无法携带cookie问题
// 请求方式：post
// 请求地址：http://localhost:3000/v1/users/login
router.post("/login", (req, res, next) => {
  // console.log(req.body)
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
      // ---------------------------------------

      // 设置payload
      let payload = {
        name: aname,
        userID: 1003,
        exp: Date.now() / 1000 + 3600 * 24,
      };

      let token = jwt.sign(payload, key);

      // ---------------------------------------

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
// 请求地址：http://localhost:3000/v1/users/verifyToken
router.get("/verifyToken", (req, res, next) => {
  // console.log(req.headers.authorization);
  let token = req.headers.authorization;
  // console.log(req);
  // 拿到token以后要去根据之前的密钥去解析jwt.verify()
  // let payload = jwt.verify(token, key);
  // console.log(payload);
  // 异步实现
  jwt.verify(token, key, (err, decode) => {
    console.warn(err); // 若验证失败 则err将不是null(合法的,没被篡改)
    if (err != null) {
      res.send({
        code: 201,
        msg: "Token验证失败",
      });
      return;
    }
    console.log(decode);
    res.send({
      code: 200,
      msg: "Token验证成功",
    });
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
