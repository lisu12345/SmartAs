<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
	"http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="${pkg}.dao.${name}Dao">

	<!-- <cache /> -->

	<!-- ///////////////////////////基础接口定义///////////////////////////////// -->
	

	<select id="getById" resultType="${pkg}.${name}">
		SELECT
		T.*
		FROM ${table} T
		WHERE T.ID = ${r"#{id}"}
	</select>
	
	
	<select id="getByIds" resultType="${pkg}.${name}">
		SELECT
		T.*
		FROM ${table} T
		WHERE ID in
		  <foreach item="id" collection="ids" open="(" separator="," close=")">
		     ${r"#{id}"}
		  </foreach>
	</select>

	<select id="getCountAll" resultType="int">
		SELECT
		count(1)
		FROM ${table} T
	</select>

	<select id="selectAll" resultType="${pkg}.${name}">
		SELECT
		T.*
		FROM ${table} T
	</select>

	<select id="select" resultType="${pkg}.${name}" pageable="true">
		SELECT T.* FROM ${table} T
	</select>


	<insert id="insert" parameterType="${pkg}.${name}">
		INSERT INTO ${table}
		(code)
		VALUES(
		${r"#{code,jdbcType=VARCHAR}"}
		
		)
		<selectKey resultType="long" keyProperty="id" order="AFTER">
			SELECT LAST_INSERT_ID() AS ID
		</selectKey>
	</insert>

	<update id="update" parameterType="${pkg}.${name}">
		UPDATE ${table} SET
		code = ${r"#{code,jdbcType=VARCHAR}"}
		WHERE ID = ${r"#{id,jdbcType=NUMERIC}"}
	</update>


	<delete id="deleteById">
		DELETE FROM ${table}
		WHERE ID = ${r"#{id}"}
	</delete>
	
	<delete id="deleteByIds">
		DELETE FROM ${table}
		WHERE ID in
		  <foreach item="id" collection="ids" open="(" separator="," close=")">
		     ${r"#{id}"}
		  </foreach>
	</delete>

	<!-- //////////////////////////////////////////////////////////// -->
 
</mapper>

