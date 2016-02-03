/*
Navicat MySQL Data Transfer

Source Server         : smart
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : smartas

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2016-02-03 16:38:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for act_evt_log
-- ----------------------------
DROP TABLE IF EXISTS `act_evt_log`;
CREATE TABLE `act_evt_log` (
  `LOG_NR_` bigint(20) NOT NULL AUTO_INCREMENT,
  `TYPE_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TIME_STAMP_` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DATA_` longblob,
  `LOCK_OWNER_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `LOCK_TIME_` timestamp(3) NULL DEFAULT NULL,
  `IS_PROCESSED_` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`LOG_NR_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_evt_log
-- ----------------------------

-- ----------------------------
-- Table structure for act_ge_bytearray
-- ----------------------------
DROP TABLE IF EXISTS `act_ge_bytearray`;
CREATE TABLE `act_ge_bytearray` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DEPLOYMENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `BYTES_` longblob,
  `GENERATED_` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_FK_BYTEARR_DEPL` (`DEPLOYMENT_ID_`),
  CONSTRAINT `ACT_FK_BYTEARR_DEPL` FOREIGN KEY (`DEPLOYMENT_ID_`) REFERENCES `act_re_deployment` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_ge_bytearray
-- ----------------------------

-- ----------------------------
-- Table structure for act_ge_property
-- ----------------------------
DROP TABLE IF EXISTS `act_ge_property`;
CREATE TABLE `act_ge_property` (
  `NAME_` varchar(64) COLLATE utf8_bin NOT NULL,
  `VALUE_` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `REV_` int(11) DEFAULT NULL,
  PRIMARY KEY (`NAME_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_ge_property
-- ----------------------------
INSERT INTO `act_ge_property` VALUES ('next.dbid', '1', '1');
INSERT INTO `act_ge_property` VALUES ('schema.history', 'create(6.0.0.1)', '1');
INSERT INTO `act_ge_property` VALUES ('schema.version', '6.0.0.1', '1');

-- ----------------------------
-- Table structure for act_hi_actinst
-- ----------------------------
DROP TABLE IF EXISTS `act_hi_actinst`;
CREATE TABLE `act_hi_actinst` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `ACT_ID_` varchar(255) COLLATE utf8_bin NOT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `CALL_PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACT_NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ACT_TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `ASSIGNEE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `START_TIME_` datetime(3) NOT NULL,
  `END_TIME_` datetime(3) DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_HI_ACT_INST_START` (`START_TIME_`),
  KEY `ACT_IDX_HI_ACT_INST_END` (`END_TIME_`),
  KEY `ACT_IDX_HI_ACT_INST_PROCINST` (`PROC_INST_ID_`,`ACT_ID_`),
  KEY `ACT_IDX_HI_ACT_INST_EXEC` (`EXECUTION_ID_`,`ACT_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_hi_actinst
-- ----------------------------

-- ----------------------------
-- Table structure for act_hi_attachment
-- ----------------------------
DROP TABLE IF EXISTS `act_hi_attachment`;
CREATE TABLE `act_hi_attachment` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DESCRIPTION_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `URL_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `CONTENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TIME_` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_hi_attachment
-- ----------------------------

-- ----------------------------
-- Table structure for act_hi_comment
-- ----------------------------
DROP TABLE IF EXISTS `act_hi_comment`;
CREATE TABLE `act_hi_comment` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TIME_` datetime(3) NOT NULL,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACTION_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `MESSAGE_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `FULL_MSG_` longblob,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_hi_comment
-- ----------------------------

-- ----------------------------
-- Table structure for act_hi_detail
-- ----------------------------
DROP TABLE IF EXISTS `act_hi_detail`;
CREATE TABLE `act_hi_detail` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACT_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin NOT NULL,
  `VAR_TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `REV_` int(11) DEFAULT NULL,
  `TIME_` datetime(3) NOT NULL,
  `BYTEARRAY_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DOUBLE_` double DEFAULT NULL,
  `LONG_` bigint(20) DEFAULT NULL,
  `TEXT_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TEXT2_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_HI_DETAIL_PROC_INST` (`PROC_INST_ID_`),
  KEY `ACT_IDX_HI_DETAIL_ACT_INST` (`ACT_INST_ID_`),
  KEY `ACT_IDX_HI_DETAIL_TIME` (`TIME_`),
  KEY `ACT_IDX_HI_DETAIL_NAME` (`NAME_`),
  KEY `ACT_IDX_HI_DETAIL_TASK_ID` (`TASK_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_hi_detail
-- ----------------------------

-- ----------------------------
-- Table structure for act_hi_identitylink
-- ----------------------------
DROP TABLE IF EXISTS `act_hi_identitylink`;
CREATE TABLE `act_hi_identitylink` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `GROUP_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_HI_IDENT_LNK_USER` (`USER_ID_`),
  KEY `ACT_IDX_HI_IDENT_LNK_TASK` (`TASK_ID_`),
  KEY `ACT_IDX_HI_IDENT_LNK_PROCINST` (`PROC_INST_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_hi_identitylink
-- ----------------------------

-- ----------------------------
-- Table structure for act_hi_procinst
-- ----------------------------
DROP TABLE IF EXISTS `act_hi_procinst`;
CREATE TABLE `act_hi_procinst` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `BUSINESS_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `START_TIME_` datetime(3) NOT NULL,
  `END_TIME_` datetime(3) DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `START_USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `START_ACT_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `END_ACT_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `SUPER_PROCESS_INSTANCE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DELETE_REASON_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  UNIQUE KEY `PROC_INST_ID_` (`PROC_INST_ID_`),
  KEY `ACT_IDX_HI_PRO_INST_END` (`END_TIME_`),
  KEY `ACT_IDX_HI_PRO_I_BUSKEY` (`BUSINESS_KEY_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_hi_procinst
-- ----------------------------

-- ----------------------------
-- Table structure for act_hi_taskinst
-- ----------------------------
DROP TABLE IF EXISTS `act_hi_taskinst`;
CREATE TABLE `act_hi_taskinst` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_DEF_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PARENT_TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DESCRIPTION_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `OWNER_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `START_TIME_` datetime(3) NOT NULL,
  `CLAIM_TIME_` datetime(3) DEFAULT NULL,
  `END_TIME_` datetime(3) DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `DELETE_REASON_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `PRIORITY_` int(11) DEFAULT NULL,
  `DUE_DATE_` datetime(3) DEFAULT NULL,
  `FORM_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_HI_TASK_INST_PROCINST` (`PROC_INST_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_hi_taskinst
-- ----------------------------

-- ----------------------------
-- Table structure for act_hi_varinst
-- ----------------------------
DROP TABLE IF EXISTS `act_hi_varinst`;
CREATE TABLE `act_hi_varinst` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin NOT NULL,
  `VAR_TYPE_` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `REV_` int(11) DEFAULT NULL,
  `BYTEARRAY_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DOUBLE_` double DEFAULT NULL,
  `LONG_` bigint(20) DEFAULT NULL,
  `TEXT_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TEXT2_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `CREATE_TIME_` datetime(3) DEFAULT NULL,
  `LAST_UPDATED_TIME_` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_HI_PROCVAR_PROC_INST` (`PROC_INST_ID_`),
  KEY `ACT_IDX_HI_PROCVAR_NAME_TYPE` (`NAME_`,`VAR_TYPE_`),
  KEY `ACT_IDX_HI_PROCVAR_TASK_ID` (`TASK_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_hi_varinst
-- ----------------------------

-- ----------------------------
-- Table structure for act_id_group
-- ----------------------------
DROP TABLE IF EXISTS `act_id_group`;
CREATE TABLE `act_id_group` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_id_group
-- ----------------------------

-- ----------------------------
-- Table structure for act_id_info
-- ----------------------------
DROP TABLE IF EXISTS `act_id_info`;
CREATE TABLE `act_id_info` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `USER_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `VALUE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PASSWORD_` longblob,
  `PARENT_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_id_info
-- ----------------------------

-- ----------------------------
-- Table structure for act_id_membership
-- ----------------------------
DROP TABLE IF EXISTS `act_id_membership`;
CREATE TABLE `act_id_membership` (
  `USER_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `GROUP_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`USER_ID_`,`GROUP_ID_`),
  KEY `ACT_FK_MEMB_GROUP` (`GROUP_ID_`),
  CONSTRAINT `ACT_FK_MEMB_GROUP` FOREIGN KEY (`GROUP_ID_`) REFERENCES `act_id_group` (`ID_`),
  CONSTRAINT `ACT_FK_MEMB_USER` FOREIGN KEY (`USER_ID_`) REFERENCES `act_id_user` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_id_membership
-- ----------------------------

-- ----------------------------
-- Table structure for act_id_user
-- ----------------------------
DROP TABLE IF EXISTS `act_id_user`;
CREATE TABLE `act_id_user` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `FIRST_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `LAST_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `EMAIL_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PWD_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PICTURE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_id_user
-- ----------------------------

-- ----------------------------
-- Table structure for act_procdef_info
-- ----------------------------
DROP TABLE IF EXISTS `act_procdef_info`;
CREATE TABLE `act_procdef_info` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `INFO_JSON_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_INFO_PROCDEF` (`PROC_DEF_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_procdef_info
-- ----------------------------

-- ----------------------------
-- Table structure for act_re_deployment
-- ----------------------------
DROP TABLE IF EXISTS `act_re_deployment`;
CREATE TABLE `act_re_deployment` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `DEPLOY_TIME_` timestamp(3) NULL DEFAULT NULL,
  `ENGINE_VERSION_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_re_deployment
-- ----------------------------

-- ----------------------------
-- Table structure for act_re_model
-- ----------------------------
DROP TABLE IF EXISTS `act_re_model`;
CREATE TABLE `act_re_model` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATE_TIME_` timestamp(3) NULL DEFAULT NULL,
  `LAST_UPDATE_TIME_` timestamp(3) NULL DEFAULT NULL,
  `VERSION_` int(11) DEFAULT NULL,
  `META_INFO_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `DEPLOYMENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EDITOR_SOURCE_VALUE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EDITOR_SOURCE_EXTRA_VALUE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_re_model
-- ----------------------------

-- ----------------------------
-- Table structure for act_re_procdef
-- ----------------------------
DROP TABLE IF EXISTS `act_re_procdef`;
CREATE TABLE `act_re_procdef` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `KEY_` varchar(255) COLLATE utf8_bin NOT NULL,
  `VERSION_` int(11) NOT NULL,
  `DEPLOYMENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `RESOURCE_NAME_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `DGRM_RESOURCE_NAME_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `DESCRIPTION_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `HAS_START_FORM_KEY_` tinyint(4) DEFAULT NULL,
  `HAS_GRAPHICAL_NOTATION_` tinyint(4) DEFAULT NULL,
  `SUSPENSION_STATE_` int(11) DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `ENGINE_VERSION_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  UNIQUE KEY `ACT_UNIQ_PROCDEF` (`KEY_`,`VERSION_`,`TENANT_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_re_procdef
-- ----------------------------

-- ----------------------------
-- Table structure for act_ru_event_subscr
-- ----------------------------
DROP TABLE IF EXISTS `act_ru_event_subscr`;
CREATE TABLE `act_ru_event_subscr` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `EVENT_TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `EVENT_NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACTIVITY_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `CONFIGURATION_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_EVENT_SUBSCR_CONFIG_` (`CONFIGURATION_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_ru_event_subscr
-- ----------------------------

-- ----------------------------
-- Table structure for act_ru_execution
-- ----------------------------
DROP TABLE IF EXISTS `act_ru_execution`;
CREATE TABLE `act_ru_execution` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `BUSINESS_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PARENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `SUPER_EXEC_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ROOT_PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACT_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `IS_ACTIVE_` tinyint(4) DEFAULT NULL,
  `IS_CONCURRENT_` tinyint(4) DEFAULT NULL,
  `IS_SCOPE_` tinyint(4) DEFAULT NULL,
  `IS_EVENT_SCOPE_` tinyint(4) DEFAULT NULL,
  `IS_MI_ROOT_` tinyint(4) DEFAULT NULL,
  `SUSPENSION_STATE_` int(11) DEFAULT NULL,
  `CACHED_ENT_STATE_` int(11) DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `LOCK_TIME_` timestamp(3) NULL DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_EXEC_BUSKEY` (`BUSINESS_KEY_`),
  KEY `ACT_IDC_EXEC_ROOT` (`ROOT_PROC_INST_ID_`),
  KEY `ACT_FK_EXE_PROCINST` (`PROC_INST_ID_`),
  KEY `ACT_FK_EXE_PARENT` (`PARENT_ID_`),
  KEY `ACT_FK_EXE_SUPER` (`SUPER_EXEC_`),
  KEY `ACT_FK_EXE_PROCDEF` (`PROC_DEF_ID_`),
  CONSTRAINT `ACT_FK_EXE_PARENT` FOREIGN KEY (`PARENT_ID_`) REFERENCES `act_ru_execution` (`ID_`) ON DELETE CASCADE,
  CONSTRAINT `ACT_FK_EXE_PROCDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `act_re_procdef` (`ID_`),
  CONSTRAINT `ACT_FK_EXE_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `act_ru_execution` (`ID_`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ACT_FK_EXE_SUPER` FOREIGN KEY (`SUPER_EXEC_`) REFERENCES `act_ru_execution` (`ID_`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_ru_execution
-- ----------------------------

-- ----------------------------
-- Table structure for act_ru_identitylink
-- ----------------------------
DROP TABLE IF EXISTS `act_ru_identitylink`;
CREATE TABLE `act_ru_identitylink` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `GROUP_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_IDENT_LNK_USER` (`USER_ID_`),
  KEY `ACT_IDX_IDENT_LNK_GROUP` (`GROUP_ID_`),
  KEY `ACT_IDX_ATHRZ_PROCEDEF` (`PROC_DEF_ID_`),
  KEY `ACT_FK_TSKASS_TASK` (`TASK_ID_`),
  KEY `ACT_FK_IDL_PROCINST` (`PROC_INST_ID_`),
  CONSTRAINT `ACT_FK_ATHRZ_PROCEDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `act_re_procdef` (`ID_`),
  CONSTRAINT `ACT_FK_IDL_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `act_ru_execution` (`ID_`),
  CONSTRAINT `ACT_FK_TSKASS_TASK` FOREIGN KEY (`TASK_ID_`) REFERENCES `act_ru_task` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_ru_identitylink
-- ----------------------------

-- ----------------------------
-- Table structure for act_ru_job
-- ----------------------------
DROP TABLE IF EXISTS `act_ru_job`;
CREATE TABLE `act_ru_job` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `LOCK_EXP_TIME_` timestamp(3) NULL DEFAULT NULL,
  `LOCK_OWNER_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `EXCLUSIVE_` tinyint(1) DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `RETRIES_` int(11) DEFAULT NULL,
  `EXCEPTION_STACK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXCEPTION_MSG_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `DUEDATE_` timestamp(3) NULL DEFAULT NULL,
  `REPEAT_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `HANDLER_TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `HANDLER_CFG_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_ru_job
-- ----------------------------

-- ----------------------------
-- Table structure for act_ru_task
-- ----------------------------
DROP TABLE IF EXISTS `act_ru_task`;
CREATE TABLE `act_ru_task` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PARENT_TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DESCRIPTION_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TASK_DEF_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `OWNER_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DELEGATION_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PRIORITY_` int(11) DEFAULT NULL,
  `CREATE_TIME_` timestamp(3) NULL DEFAULT NULL,
  `DUE_DATE_` datetime(3) DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `SUSPENSION_STATE_` int(11) DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `FORM_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_TASK_CREATE` (`CREATE_TIME_`),
  KEY `ACT_FK_TASK_EXE` (`EXECUTION_ID_`),
  KEY `ACT_FK_TASK_PROCINST` (`PROC_INST_ID_`),
  KEY `ACT_FK_TASK_PROCDEF` (`PROC_DEF_ID_`),
  CONSTRAINT `ACT_FK_TASK_EXE` FOREIGN KEY (`EXECUTION_ID_`) REFERENCES `act_ru_execution` (`ID_`),
  CONSTRAINT `ACT_FK_TASK_PROCDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `act_re_procdef` (`ID_`),
  CONSTRAINT `ACT_FK_TASK_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `act_ru_execution` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_ru_task
-- ----------------------------

-- ----------------------------
-- Table structure for act_ru_variable
-- ----------------------------
DROP TABLE IF EXISTS `act_ru_variable`;
CREATE TABLE `act_ru_variable` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin NOT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `BYTEARRAY_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DOUBLE_` double DEFAULT NULL,
  `LONG_` bigint(20) DEFAULT NULL,
  `TEXT_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TEXT2_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_`),
  KEY `ACT_IDX_VARIABLE_TASK_ID` (`TASK_ID_`),
  KEY `ACT_FK_VAR_EXE` (`EXECUTION_ID_`),
  KEY `ACT_FK_VAR_PROCINST` (`PROC_INST_ID_`),
  KEY `ACT_FK_VAR_BYTEARRAY` (`BYTEARRAY_ID_`),
  CONSTRAINT `ACT_FK_VAR_BYTEARRAY` FOREIGN KEY (`BYTEARRAY_ID_`) REFERENCES `act_ge_bytearray` (`ID_`),
  CONSTRAINT `ACT_FK_VAR_EXE` FOREIGN KEY (`EXECUTION_ID_`) REFERENCES `act_ru_execution` (`ID_`),
  CONSTRAINT `ACT_FK_VAR_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `act_ru_execution` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of act_ru_variable
-- ----------------------------

-- ----------------------------
-- Table structure for tpl_app_group_t
-- ----------------------------
DROP TABLE IF EXISTS `tpl_app_group_t`;
CREATE TABLE `tpl_app_group_t` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(128) NOT NULL COMMENT '群组编码',
  `name` varchar(128) NOT NULL COMMENT '群组名称',
  `desc` varchar(128) DEFAULT NULL COMMENT '描述',
  `status` smallint(6) NOT NULL COMMENT '状态',
  `isDefaultIn` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='群组表';

-- ----------------------------
-- Records of tpl_app_group_t
-- ----------------------------

-- ----------------------------
-- Table structure for tpl_app_role_perms_t
-- ----------------------------
DROP TABLE IF EXISTS `tpl_app_role_perms_t`;
CREATE TABLE `tpl_app_role_perms_t` (
  `role_id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  PRIMARY KEY (`role_id`,`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tpl_app_role_perms_t
-- ----------------------------
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1000.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1001.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1001.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1001.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1001.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1002.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1002.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1002.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1002.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1003.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1003.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1003.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1003.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '1003.3002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('1', '9000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('2', '1000.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('2', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('2', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('2', '1000.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('3', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('3', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('53', '1000.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('53', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('53', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('53', '1000.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('54', '1000.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('54', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('54', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('54', '1000.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('55', '1000.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('55', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('55', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('55', '1000.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('56', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('56', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1000.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1000.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1000.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1001.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1001.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1001.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1001.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1002.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1002.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1002.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1002.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1003.1000');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1003.1002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1003.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1003.1004');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '1003.3002');
INSERT INTO `tpl_app_role_perms_t` VALUES ('57', '9000.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('58', '1001.1003');
INSERT INTO `tpl_app_role_perms_t` VALUES ('59', '1001.1004');

-- ----------------------------
-- Table structure for tpl_app_role_t
-- ----------------------------
DROP TABLE IF EXISTS `tpl_app_role_t`;
CREATE TABLE `tpl_app_role_t` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL COMMENT '角色名称',
  `desc` varchar(128) NOT NULL COMMENT '角色描述',
  `status` smallint(6) NOT NULL COMMENT '状态',
  `rights` text,
  `defaultIn` char(1) NOT NULL,
  `code` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of tpl_app_role_t
-- ----------------------------
INSERT INTO `tpl_app_role_t` VALUES ('1', 'Admin', '系统管理员', '1', null, '1', '');
INSERT INTO `tpl_app_role_t` VALUES ('2', 'Public', '公共权限', '1', null, '1', '');
INSERT INTO `tpl_app_role_t` VALUES ('3', 'Guest', '访客', '1', null, '1', '');
INSERT INTO `tpl_app_role_t` VALUES ('62', 'Test62', '测试62', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('63', 'Test63', '测试63', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('64', 'Test64', '测试64', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('65', 'Test65', '测试65', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('66', 'Test66', '测试66', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('67', 'Test67', '测试67', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('68', 'Test68', '测试68', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('69', 'Test69', '测试69', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('70', 'Test70', '测试70', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('71', 'Test71', '测试71', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('72', 'Test72', '测试72', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('73', 'Test73', '测试73', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('74', 'Test74', '测试74', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('75', 'Test75', '测试75', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('76', 'Test76', '测试76', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('77', 'Test77', '测试77', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('78', 'Test78', '测试78', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('79', 'Test79', '测试79', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('80', 'Test80', '测试80', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('81', 'Test81', '测试81', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('82', 'Test82', '测试82', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('83', 'Test83', '测试83', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('84', 'Test84', '测试84', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('85', 'Test85', '测试85', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('86', 'Test86', '测试86', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('87', 'Test87', '测试87', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('88', 'Test88', '测试88', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('89', 'Test89', '测试89', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('90', 'Test90', '测试90', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('91', 'Test91', '测试91', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('92', 'Test92', '测试92', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('93', 'Test93', '测试93', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('94', 'Test94', '测试94', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('95', 'Test95', '测试95', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('96', 'Test96', '测试96', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('97', 'Test97', '测试97', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('98', 'Test98', '测试98', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('99', 'Test99', '测试99', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('100', 'Test100', '测试100', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('101', 'Test101', '测试101', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('102', 'Test102', '测试102', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('103', 'Test103', '测试103', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('104', 'Test104', '测试104', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('105', 'Test105', '测试105', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('106', 'Test106', '测试106', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('107', 'Test107', '测试107', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('108', 'Test108', '测试108', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('109', 'Test109', '测试109', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('110', 'Test110', '测试110', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('111', 'Test111', '测试111', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('112', 'Test112', '测试112', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('113', 'Test113', '测试113', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('114', 'Test114', '测试114', '1', null, '0', null);
INSERT INTO `tpl_app_role_t` VALUES ('115', 'Test115', '测试115', '1', null, '0', null);

-- ----------------------------
-- Table structure for tpl_menu_t
-- ----------------------------
DROP TABLE IF EXISTS `tpl_menu_t`;
CREATE TABLE `tpl_menu_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `className` varchar(45) DEFAULT NULL,
  `iconName` varchar(45) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `sn` int(11) DEFAULT NULL,
  `publish` char(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tpl_menu_t
-- ----------------------------
INSERT INTO `tpl_menu_t` VALUES ('1', 'tool_bar', '工具菜单', '', '', '', '0', '1', '1');
INSERT INTO `tpl_menu_t` VALUES ('2', 'nav_bar', '导航菜单', '', '', '', '0', '2', '1');
INSERT INTO `tpl_menu_t` VALUES ('3', '', '我的工作空间', '', '', '', '2', '5', '1');
INSERT INTO `tpl_menu_t` VALUES ('4', '', '系统管理', '', '', '', '2', '10', '1');
INSERT INTO `tpl_menu_t` VALUES ('5', '', '用户和权限', '', '', '', '4', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('6', '', '定时任务', '', '', '', '4', '1', '1');
INSERT INTO `tpl_menu_t` VALUES ('7', '', '多lookup管理', '', '', '', '4', '2', '1');
INSERT INTO `tpl_menu_t` VALUES ('8', '', '国际化信息管理', '', '', '', '4', '10', '1');
INSERT INTO `tpl_menu_t` VALUES ('15', '', '数据字典', '', '', '', '4', '1', '1');
INSERT INTO `tpl_menu_t` VALUES ('16', '', 'lookup管理', '', '', '', '4', '2', '1');
INSERT INTO `tpl_menu_t` VALUES ('17', '', '菜单管理', '#!web/security/menu/index.html', '', '', '4', '3', '1');
INSERT INTO `tpl_menu_t` VALUES ('18', '', '富文本管理', '', '', '', '4', '4', '0');
INSERT INTO `tpl_menu_t` VALUES ('19', '', '规则引擎', '', '', '', '4', '5', '1');
INSERT INTO `tpl_menu_t` VALUES ('20', '', '流程管理', '', '', '', '4', '6', '0');
INSERT INTO `tpl_menu_t` VALUES ('21', '', '内容管理', '', '', '', '4', '7', '0');
INSERT INTO `tpl_menu_t` VALUES ('22', '', '异步服务', '', '', '', '4', '8', '0');
INSERT INTO `tpl_menu_t` VALUES ('23', '', '数据锁', '', '', '', '4', '9', '0');
INSERT INTO `tpl_menu_t` VALUES ('24', '', 'ART控制台', '', '', '', '4', '90', '0');
INSERT INTO `tpl_menu_t` VALUES ('25', '', '信息管理', '', '', '', '4', '80', '0');
INSERT INTO `tpl_menu_t` VALUES ('26', '', '导入监控', '', '', '', '4', '70', '1');
INSERT INTO `tpl_menu_t` VALUES ('27', '', '导出监控', '', '', '', '4', '60', '1');
INSERT INTO `tpl_menu_t` VALUES ('28', '', '服务器管理', '', '', '', '4', '999', '1');
INSERT INTO `tpl_menu_t` VALUES ('29', '', '用户管理', '#!web/security/user/index.jsx', '', '', '5', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('30', null, '群组管理', null, null, null, '5', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('31', null, '数据范围管理', null, null, null, '5', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('32', '', '角色管理', '#!web/security/role/index.jsx', '', '', '5', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('33', null, '维度管理', null, null, null, '5', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('34', null, '属性组管理', null, null, null, '5', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('35', null, '用户权限批处理', null, null, null, '5', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('36', null, '群组权限批处理', null, null, null, '5', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('37', null, '用户登陆次数统计', null, null, null, '5', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('38', null, '用户权限审批日志', null, null, null, '5', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('39', '', '我的待办', '', '', '', '3', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('40', null, '我的已办', null, null, null, '3', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('41', null, '我的导入', null, null, null, '3', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('42', null, '我的导出', null, null, null, '3', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('43', '', '开发', '', '', '', '2', '99', '1');
INSERT INTO `tpl_menu_t` VALUES ('44', '', 'UI Demo', '', '', '', '43', '6', '1');
INSERT INTO `tpl_menu_t` VALUES ('45', '', 'API', '', '', '', '43', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('46', '', 'Dashboard', '12', '', '', '1', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('47', '', 'Profile', '1234', '', '', '1', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('48', null, '{{name}}', null, null, null, '1', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('49', null, 'Help', null, null, null, '1', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('50', null, '资料', null, null, null, '48', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('51', null, '设置', null, null, null, '48', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('52', null, '退出', null, null, null, '48', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('53', '', '首页', '#!web/demo/Dashboard.html', '', '', '2', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('54', null, 'Grid', '#!web/demo/bootstrap/grid/index.html', null, null, '44', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('55', '', '运维工具', '', '', '', '28', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('56', '', '缓存管理', '', '', '', '28', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('57', '', '版本信息', '', '', '', '28', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('58', null, 'SOA设置', null, null, null, '28', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('59', null, '类和项维护', null, null, null, '7', '0', '0');
INSERT INTO `tpl_menu_t` VALUES ('60', null, 'Easu UI Demo', null, null, null, '43', '2', '1');
INSERT INTO `tpl_menu_t` VALUES ('61', null, 'Grid', null, null, null, '60', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('62', '', 'contextmenu', '#!web/demo/easyui/datagrid/contextmenu.html', '', '', '61', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('63', '', 'Plugins', '', '', '', '44', '5', '1');
INSERT INTO `tpl_menu_t` VALUES ('64', '', 'Form', '#!web/demo/plugins/Form/index.jsx', '', '', '63', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('65', '', 'Antd', '#!web/demo/plugins/antd/index.jsx', '', '', '44', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('66', '', 'Form', '#!web/demo/plugins/antd/from.jsx', '', '', '89', '1', '1');
INSERT INTO `tpl_menu_t` VALUES ('67', '', 'Radio', '#!web/demo/plugins/antd/Radio.jsx', '', '', '89', '2', '1');
INSERT INTO `tpl_menu_t` VALUES ('68', '', 'Checkbox', '#!web/demo/plugins/antd/Checkbox.jsx', '', '', '89', '3', '1');
INSERT INTO `tpl_menu_t` VALUES ('69', null, 'Button', '#!web/demo/plugins/antd/Button.jsx', null, null, '88', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('70', '', 'Switch', '#!web/demo/plugins/antd/Switch.jsx', '', '', '89', '4', '1');
INSERT INTO `tpl_menu_t` VALUES ('71', '', 'Select', '#!web/demo/plugins/antd/Select.jsx', '', '', '89', '5', '1');
INSERT INTO `tpl_menu_t` VALUES ('72', null, 'Menu', '#!web/demo/plugins/antd/Menu.jsx', null, null, '91', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('73', '', 'InputNumber', '#!web/demo/plugins/antd/InputNumber.jsx', '', '', '89', '6', '1');
INSERT INTO `tpl_menu_t` VALUES ('74', null, 'Message', '#!web/demo/plugins/antd/Message.jsx', null, null, '90', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('75', null, 'Model', '#!web/demo/plugins/antd/Model.jsx', null, null, '90', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('76', null, 'Tooltip', '#!web/demo/plugins/antd/Tooltip.jsx', null, null, '90', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('77', null, 'Tabs', '#!web/demo/plugins/antd/Tabs.jsx', null, null, '91', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('78', null, 'Table', '#!web/demo/plugins/antd/Table.jsx', null, null, '90', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('79', null, 'Popconfirm', '#!web/demo/plugins/antd/Popconfirm.jsx', null, null, '90', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('80', '', 'Upload', '#!web/demo/plugins/antd/Upload.jsx', '', '', '89', '7', '1');
INSERT INTO `tpl_menu_t` VALUES ('81', null, 'Tag', '#!web/demo/plugins/antd/Tag.jsx', null, null, '90', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('82', null, 'Progress', '#!web/demo/plugins/antd/Progress.jsx', null, null, '90', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('83', null, 'Spin', '#!web/demo/plugins/antd/Spin.jsx', null, null, '92', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('84', null, 'Popover', '#!web/demo/plugins/antd/Popover.jsx', null, null, '90', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('85', null, 'Notification', '#!web/demo/plugins/antd/Notification.jsx', null, null, '90', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('86', null, 'Steps', '#!web/demo/plugins/antd/Steps.jsx', null, null, '91', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('87', null, 'Components', null, null, null, '43', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('88', null, '基本', null, null, null, '87', '1', '1');
INSERT INTO `tpl_menu_t` VALUES ('89', null, '表单', null, null, null, '87', '3', '1');
INSERT INTO `tpl_menu_t` VALUES ('90', null, '展示', null, null, null, '87', '5', '1');
INSERT INTO `tpl_menu_t` VALUES ('91', null, '导航', null, null, null, '87', '7', '1');
INSERT INTO `tpl_menu_t` VALUES ('92', null, '其他', null, null, null, '87', '11', '1');
INSERT INTO `tpl_menu_t` VALUES ('93', null, 'Timeline', '#!web/demo/plugins/antd/Timeline.jsx', null, null, '90', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('94', null, 'Cascader', '#!web/demo/plugins/antd/Cascader.jsx', null, null, '89', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('95', null, 'DatePicker', '#!web/demo/plugins/antd/DatePicker.jsx', null, null, '89', '0', '1');
INSERT INTO `tpl_menu_t` VALUES ('96', null, 'Calendar', '!web/demo/plugins/antd/Calendar.jsx', null, null, '89', '0', '1');

-- ----------------------------
-- Table structure for tpl_user_t
-- ----------------------------
DROP TABLE IF EXISTS `tpl_user_t`;
CREATE TABLE `tpl_user_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `acount` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `firstname` varchar(80) NOT NULL,
  `lastname` varchar(80) NOT NULL,
  `status` varchar(2) DEFAULT NULL,
  `addr1` varchar(80) NOT NULL,
  `addr2` varchar(40) DEFAULT NULL,
  `city` varchar(80) NOT NULL,
  `state` varchar(80) NOT NULL,
  `zip` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `phone` varchar(80) NOT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tpl_user_t
-- ----------------------------
INSERT INTO `tpl_user_t` VALUES ('1', 'chenjpu', 'chenjpu', 'chenjpu', 'chenjpu', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('2', 'test', 'test111', 'test', 'test', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('3', 'test1', 'test1', 'test1', 'test1', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('4', 'test2', 'test2', 'test2', 'test2', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('5', 'test3', 'test3', 'test3', 'test3', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('6', 'test4', 'test4', 'test4', 'test4', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('7', 'test5', 'test5', 'test5', 'test5', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('8', 'test6', 'test6', 'test6', 'test6', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('9', 'test7', 'test7', 'test7', 'test7', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('10', 'test8', 'test8', 'test8', 'test8', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO `tpl_user_t` VALUES ('11', 'test9', 'test9', 'test9', 'test9', '1', '11', '22', '11', '1', '1', '1', '1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');

-- ----------------------------
-- Function structure for fn_rcs_menu
-- ----------------------------
DROP FUNCTION IF EXISTS `fn_rcs_menu`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_rcs_menu`(rootId INT) RETURNS varchar(1000) CHARSET utf8
BEGIN 
       DECLARE sTemp VARCHAR(4000); 
       DECLARE sTempChd VARCHAR(1000); 
     
       SET sTemp = '$'; 
       SET sTempChd =cast(rootId as CHAR); 
     
       WHILE sTempChd is not null DO 
         SET sTemp = concat(sTemp,',',sTempChd); 
         SELECT group_concat(id) INTO sTempChd FROM tpl_menu_t t where t.publish = 1 and FIND_IN_SET(t.parentId,sTempChd)>0; 
       END WHILE; 
       RETURN sTemp; 
     END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for fn_size
-- ----------------------------
DROP FUNCTION IF EXISTS `fn_size`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_size`(tb_name VARCHAR(40)) RETURNS int(11)
BEGIN
DECLARE sTempChd int;

SET sTempChd = 0;

SELECT count(id) INTO sTempChd FROM tpl_menu_t;

return sTempChd;

END
;;
DELIMITER ;
