DELIMITER $$
CREATE  PROCEDURE `GetUsers`()
BEGIN
	SELECT 
		user_id 				AS id,
		user_username 			AS username,
		user_role_id			AS roleId,
		role_name				AS roleName,
		user_password			AS password,
		COUNT(article_id)		AS articles,
		SUM(article_visits)		AS visits
	FROM users
	JOIN roles
		ON roles.role_id = user_role_id
	LEFT JOIN articles
		ON articles.article_user_id = user_id
	GROUP BY user_id
    ORDER BY visits DESC;
END$$
DELIMITER ;
