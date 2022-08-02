/*
 * @Author: Iamxiaoz gcz9956@outlook.com
 * @Date: 2022-07-16 00:17:54
 * @LastEditors: Iamxiaoz gcz9956@outlook.com
 * @LastEditTime: 2022-07-31 15:36:57
 * @FilePath: \jm-tooth-api\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// --------------------------- 引入模块

// 引入express模块
const express = require("express");
// 引入 cors 模块
const cors = require("cors");
const adminRouter = require("./router/admin/admin");
// -------------------------------

// 创建服务器
const app = express();
// 设置监听端口
app.listen(3000, () => {
  console.log("Server Start");
});

// ---------------------------- 中间件
// 托管静态资源
app.use(express.static("public"));

// 解决跨域问题
app.use(
  cors({
    origin: ["http://localhost:8080"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// post请求中间件
app.use(
  express.urlencoded({
    extended: false,
  })
);

// 应用级中间件

// 路由中间件
// ----------------------------
// 管理员登录路由
app.use("/v1/admin", adminRouter);
// 医生相关路由
const doctorRouter = require("./router/doctor/doctor");
app.use("/v1/admin", doctorRouter);

// ---------------------------- 中间件
