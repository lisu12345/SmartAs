<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
	"http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="${pkg}.dao.${name}Dao">

	<!-- <cache /> -->

	<!-- ///////////////////////////基础接口定义///////////////////////////////// -->
	

	<select id="getById" resultType="${pkg}.${name}">
		SELECT
		T.*
		FROM tpl_${name?uncap_first}_t T
		WHERE T.ID = ${r"#{id}"}
	</select>
	
	
	<select id="getByIds" resultType="${pkg}.${name}">
		SELECT
		T.*
		FROM tpl_${name?uncap_first}_t T
		WHERE ID in
		  <foreach item="id" collection="ids" open="(" separator="," close=")">
		     ${r"#{id}"}
		  </foreach>
	</select>

	<select id="getCountAll" resultType="int">
		SELECT
		count(1)
		FROM tpl_${name?uncap_first}_t T
	</select>

	<select id="selectAll" resultType="${pkg}.${name}">
		SELECT
		T.*
		FROM tpl_${name?uncap_first}_t T
	</select>

	<select id="select" resultType="${pkg}.${name}" pageable="true">
		SELECT T.* FROM tpl_${name?uncap_first}_t T
	</select>


	<insert id="insert" parameterType="${pkg}.${name}">
		INSERT INTO tpl_${name?uncap_first}_t
		(code)
		VALUES(
		${r"#{code,jdbcType=VARCHAR}"}
		
		)
		<selectKey resultType="long" keyProperty="id" order="AFTER">
			SELECT LAST_INSERT_ID() AS ID
		</selectKey>
	</insert>

	<update id="update" parameterType="${pkg}.${name}">
		UPDATE tpl_${name?uncap_first}_t SET
		code = ${r"#{code,jdbcType=VARCHAR}"}
		WHERE ID = ${r"#{id,jdbcType=NUMERIC}"}
	</update>


	<delete id="deleteById">
		DELETE FROM tpl_${name?uncap_first}_t
		WHERE ID = ${r"#{id}"}
	</delete>
	
	<delete id="deleteByIds">
		DELETE FROM tpl_${name?uncap_first}_t
		WHERE ID in
		  <foreach item="id" collection="ids" open="(" separator="," close=")">
		     ${r"#{id}"}
		  </foreach>
	</delete>

	<!-- //////////////////////////////////////////////////////////// -->
 
</mapper>

