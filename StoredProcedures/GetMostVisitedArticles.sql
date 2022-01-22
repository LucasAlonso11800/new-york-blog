DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetMostVisitedArticles`(
	IN PLimit					INT
)
BEGIN
	SELECT         
		article_id 				AS id,
		article_title 			AS title,
		article_visits 			AS visits,
		article_category_id 	AS categoryId,
		category_name 			AS categoryName,
		category_path 			AS categoryPath,
		article_main_image 		AS image,
		article_created_at 		AS createdAt,
		article_user_id 		AS authorId,
		user_username 			AS authorName,
		article_slug 			AS slug
	FROM articles
	JOIN categories
		ON categories.category_id = article_category_id
	JOIN users
		ON users.user_id = article_user_id
	WHERE category_path != "about"
	AND article_article_status_id = (SELECT article_status_id 
										FROM article_statuses
										WHERE article_status_name = "Accepted"
									)
	ORDER BY article_visits DESC
	LIMIT PLimit;
END$$
DELIMITER ;

