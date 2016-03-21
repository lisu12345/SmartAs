<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
	"http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="${entity.packageName}.dao.${entity.name}Dao">

	<!-- <cache /> -->

	<!-- ///////////////////////////基础接口定义///////////////////////////////// -->
	
	 <resultMap id="${entity.name}ResultMap" type="${entity.packageName}.${entity.name}">
	    <!--
	       	自动生成
	    -->
		<#list introspectTable.primaryKeyColumns as column><#lt />
        <id column="${column.actualColumnName}" jdbcType="${column.jdbcTypeName}" property="${column.javaProperty}" />
		</#list><#lt />
		<#list introspectTable.nonPrimaryKeyColumns as column><#lt />
        <result column="${column.actualColumnName}" jdbcType="${column.jdbcTypeName}" property="${column.javaProperty}" />
		</#list><#lt />
		<result column="tenant_id" jdbcType="VARCHAR" property="tenantId" />
        <result column="revision" jdbcType="INTEGER" property="revision" />
        <result column="create_user_id" jdbcType="NUMERIC" property="createUserId" />
        <result column="last_update_user_id" jdbcType="NUMERIC" property="lastUpdateUserId" />
        <result column="create_date" jdbcType="DATE" property="createDate" />
        <result column="last_update_date" jdbcType="DATE" property="lastUpdateDate" />
	</resultMap>
	

	<select id="getById" resultMap="${entity.name}ResultMap">
		SELECT
		T.*
		FROM ${entity.table} T
		WHERE T.ID = ${r"#{id}"}
	</select>
	
	
	<select id="getByIds" resultMap="${entity.name}ResultMap">
		SELECT
		T.*
		FROM ${entity.table} T
		WHERE ID in
		<foreach item="id" collection="ids" open="(" separator="," close=")">
		  ${r"#{id}"}
		</foreach>
	</select>

	<select id="getCount" resultType="int">
		SELECT
		count(1)
		FROM ${entity.table} T
		<query open="where (" close=")" />
	</select>

	<select id="selectAll" resultMap="${entity.name}ResultMap">
		SELECT
		T.*
		FROM ${entity.table} T
		<query open="where (" close=")" />
	</select>

	<select id="select" pageable="true" resultMap="${entity.name}ResultMap">
		SELECT T.* FROM ${entity.table} T
		<query open="where (" close=")" />
	</select>
	
	<!-- 插入语句  -->
	<sql id="base_insert_sql">
		INSERT INTO ${entity.table} (
			<#list introspectTable.allColumns as column><#lt>
			 ${(column_index%3==0)?string("\t\t\t","")}${column.actualColumnName},${(column_index%3==2)?string("\n","")}<#t>
			</#list>
			${true?string("\n\t\t\t","")}tenant_id,app_name,revision, ${true?string("\n","")}<#t>
			${true?string("\t\t\t","")}create_user_id,last_update_user_id,create_date,last_update_date ${true?string("\n","")}<#t>
		  ) VALUES (
			<#list introspectTable.allColumns as column><#lt>
			 ${(column_index%3==0)?string("\t\t\t","")}${r"#{"}${column.javaProperty},jdbcType=${column.jdbcTypeName}${r"}"},${(column_index%3==2)?string("\n","")}<#t>
			</#list>
			${true?string("\n\t\t\t","")}${r"#{"}tenantId,jdbcType=VARCHAR${r"}"},${r"#{"}appName,jdbcType=VARCHAR${r"}"},1, ${true?string("\n","")}<#t>
			${true?string("\t\t\t","")}${r"#{"}currentUserId,jdbcType=NUMERIC${r"}"},${r"#{"}currentUserId,jdbcType=NUMERIC${r"}"},NOW(),NOW() ${true?string("\n","")}<#t>
		  )
	</sql>

	<insert id="insert" parameterType="${entity.packageName}.${entity.name}" databaseId="mysql">
		<include refid="base_insert_sql" />
		<selectKey resultType="long" keyProperty="id" order="AFTER">
			SELECT LAST_INSERT_ID() AS ID
		</selectKey>
	</insert>
	
	<insert id="insert" parameterType="${entity.packageName}.${entity.name}" databaseId="oracle">
		<selectKey resultType="long" keyProperty="id" order="BEFORE">
        	SELECT ${entity.table?keep_before_last("_")}_s.nextval AS value FROM dual  
    	</selectKey>
    	<include refid="base_insert_sql" />
	</insert>

	<update id="update" parameterType="${entity.packageName}.${entity.name}">
		UPDATE ${entity.table}
		<set>
		  <#list introspectTable.nonPrimaryKeyColumns as column><#lt>
		  <if test="${column.javaProperty} != null">
	        ${column.actualColumnName} = ${r"#{"}${column.javaProperty},jdbcType=${column.jdbcTypeName}${r"}"},
	      </if>
		  </#list>
          revision = ${r"#{"}revisionNext,jdbcType=INTEGER${r"}"},
          last_update_user_id = ${r"#{"}currentUserId,jdbcType=NUMERIC${r"}"},
          last_update_date = now(),
		</set>
		WHERE ID = ${r"#{id,jdbcType=NUMERIC}"}
	</update>

	<delete id="deleteById">
		DELETE FROM ${entity.table}
		WHERE ID = ${r"#{id}"}
	</delete>
	
	<delete id="deleteByIds">
		DELETE FROM ${entity.table}
		WHERE ID in
	    <foreach item="id" collection="ids" open="(" separator="," close=")">
	     ${r"#{id}"}
	    </foreach>
	</delete>

	<!-- //////////////////////////////////////////////////////////// -->
 
</mapper>

