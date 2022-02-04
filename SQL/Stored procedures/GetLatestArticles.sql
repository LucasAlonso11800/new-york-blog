DELIMITER $$
CREATE  PROCEDURE `GetLatestArticles`(
	IN 	PStatus			VARCHAR(20)
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
		article_slug 			AS slug,
		article_component_text 	AS description
	FROM articles
	JOIN categories
		ON categories.category_id = article_category_id
	JOIN users
		ON users.user_id = article_user_id
	LEFT JOIN article_components
		ON article_components.article_component_article_id = article_id 
		AND article_components.article_component_order = 2
	WHERE category_path != "about"
	AND article_article_status_id = (SELECT article_status_id 
										FROM article_statuses
										WHERE article_status_name = PArticleStatus
									)
	ORDER BY article_created_at DESC, article_id DESC;
END$$
DELIMITER ;
