/*
 * @Author: Iamxiaoz gcz9956@outlook.com
 * @Date: 2022-07-31 15:29:53
 * @LastEditors: Iamxiaoz gcz9956@outlook.com
 * @LastEditTime: 2022-08-01 17:47:29
 * @FilePath: \jm-tooth-api\router\doctor\doctor.js
 * @Description: 医生相关API
 */
const express = require("express");
const router = express.Router();
const pool = require("../../pool");
const upload = require("../../utils/upload");

// 查看所有医生
// 请求方式: GET
// 请求地址: http://localhost:3000/v1/admin/doctor
router.get("/doctor", (req, res, next) => {
  // res.send("通了");
  let sql =
    "SELECT did,dname,dtitle,dhonour,dexp,exp_detail,expertise,characteristic,worktime,workstatus FROM `jm_doctor`";
  pool.query(sql, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.send({
        code: 200,
        msg: "查询成功",
        data: result,
      });
    }
  });
});

// 删除某个医生
// 请求方式: DELETE
// 传参方式: query
// 请求地址: http://localhost:3000/v1/admin/doctor
router.delete("/doctor", (req, res, next) => {
  let did = req.query.did;
  did = parseInt(did);
  if (!did) {
    res.send({
      code: 402,
      msg: "参数有误",
    });
    return;
  }
  let sql = "DELETE FROM `jm_doctor` WHERE did = ?";
  pool.query(sql, [did], (err, result) => {
    if (err) {
      next(err);
    } else {
      if (result.affectedRows > 0) {
        res.send({
          code: 200,
          msg: "删除成功",
        });
      } else {
        res.send({
          code: 401,
          msg: "删除失败",
        });
      }
    }
  });
});

// 根据特定信息查询相关医生

// 新增医生信息
// 请求方式: POST
// 请求参数: Body
// 请求地址: http://localhost:3000/v1/admin/doctor
router.post("/doctor", (req, res, next) => {
  // 名字和职称必填
  console.log(req.body);
  let sql = "INSERT INTO `jm_doctor` set ?";
  pool.query(sql, [req.body], (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.affectedRows > 0) {
        res.send({
          code: 200,
          msg: "上传成功",
        });
      } else {
        res.send({
          code: 401,
          msg: "上传失败",
          result: result,
        });
      }
    }
  });
});

// 医生头像上传接口
// 请求方式: POST
// 请求参数: uploadFile -- element ui组件中有个name属性可以设置
// 请求地址: http://localhost:3000/v1/admin/doctor/upload
router.post("/doctor/upload", upload.array("uploadFile"), (req, res) => {
  console.log(req.files);
  let urls = [];
  req.files.forEach((item) => {
    urls.push(`http://localhost:3000/${item.filename}`);
  });
  res.send({
    code: 200,
    msg: "上传成功",
    urls,
  });
});

module.exports = router;
