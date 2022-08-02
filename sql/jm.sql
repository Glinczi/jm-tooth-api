SET NAMES UTF8;
# 丢弃数据库
DROP DATABASE IF EXISTS `jm`;
# 创建数据库
CREATE DATABASE `jm` CHARSET = UTF8;
# 进入数据库
USE `jm`

drop table if exists jm_admin;

/*==============================================================*/
/* Table: jm_admin                                              */
/*==============================================================*/
create table jm_admin
(
   aid                  INT auto_increment,
   aname                varchar(10),
   apwd                 INT,
   alevel               TINYINT,
   primary key (aid)
);
INSERT INTO `jm_admin` VALUES (null,'admin',123456,1);

# 创建用户信息表
drop table if exists jm_user;

/*==============================================================*/
/* Table: jm_user                                               */
/*==============================================================*/
create table jm_user
(
   uid                  int auto_increment,
   uname                varchar(20),
   upwd                 VARCHAR(32),
   email                VARCHAR(16),
   phone                VARCHAR(16) not null,
   avatar               VARCHAR(128),
   gender               INT,
   primary key (uid)
);

drop table if exists jm_product_category;

/*==============================================================*/
/* Table: jm_product_category                                   */
/*==============================================================*/
create table jm_product_category
(
   cid                  INT auto_increment,
   name                 VARCHAR(32),
   primary key (cid)
);

drop table if exists jm_products_details;

/*==============================================================*/
/* Table: jm_products_details                                   */
/*==============================================================*/
create table jm_products_details
(
   pid                  INT auto_increment,
   cid                  INT,
   atime                VARCHAR(8),
   suit_people          VARCHAR(8),
   price                decimal(6,2),
   prdcess              VARCHAR(128),
   ex_items             VARCHAR(128),
   detail_des           VARCHAR(360),
   prd_pic              VARCHAR(128),
   primary key (pid)
);

alter table jm_products_details add constraint FK_cid foreign key (cid)
      references jm_product_category (cid) on delete restrict on update restrict;


drop table if exists need_to_know;

/*==============================================================*/
/* Table: need_to_know                                          */
/*==============================================================*/
create table need_to_know
(
   kid                  INT auto_increment,
   pid                  INT,
   indata               VARCHAR(36),
   invalid_date         VARCHAR(128),
   reservation          VARCHAR(128),
   people_num           VARCHAR(36),
   primary key (kid)
);

alter table need_to_know add constraint FK_pid foreign key (pid)
      references jm_products_details (pid) on delete restrict on update restrict;

drop table if exists jm_doctor;

/*==============================================================*/
/* Table: jm_doctor                                             */
/*==============================================================*/
create table jm_doctor
(
   did                  INT not null auto_increment,
   dname                VARCHAR(16),
   dtitle               VARCHAR(16),
   dhonour              VARCHAR(128),
   dexp                 VARCHAR(128),
   exp_detail           VARCHAR(400),
   expertise            VARCHAR(400),
   characteristic       VARCHAR(400),
   worktime             VARCHAR(36) comment '0-not working
            1- working
            2- rest',
   workstatus           INT,
   dpic                 VARCHAR(128),
   primary key (did)
);



drop table if exists jm_user_booking;

/*==============================================================*/
/* Table: jm_user_booking                                       */
/*==============================================================*/
create table jm_user_booking
(
   bid                  INT auto_increment,
   user_id              INT,
   product_id           INT,
   btime                BIGINT,
   did                  INT,
   primary key (bid)
);

alter table jm_user_booking add constraint FK_did foreign key (did)
      references jm_doctor (did) on delete restrict on update restrict;

alter table jm_user_booking add constraint FK_product_id foreign key (product_id)
      references jm_products_details (pid) on delete restrict on update restrict;

alter table jm_user_booking add constraint FK_user_id foreign key (user_id)
      references jm_user (uid) on delete restrict on update restrict;
