DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `EditArticle`(
	IN 	PArticleId			INT,
	IN	PTitle 				VARCHAR (255),
	IN 	PCategoryId	 		INT,
    IN	PImage	 			VARCHAR(255),
	IN 	PSlug 				VARCHAR(255)
)
BEGIN
	UPDATE articles SET
		article_title = PTitle,
		article_category_id = PCategoryId,
		article_main_image = PImage,
		article_slug = PSlug,
		article_article_status_id = (SELECT article_status_id 
										FROM article_statuses 
										WHERE article_status_name = "Stand by"
									)
	WHERE article_id = PArticleId;
    
	SELECT         
		article_id 					AS id,
		article_title 				AS title,
		article_visits 				AS visits,
		article_category_id 		AS categoryId,
		category_name 				AS categoryName,
		category_path 				AS categoryPath,
		article_main_image 			AS image,
		article_created_at 			AS createdAt,
		article_user_id 			AS authorId,
		user_username 				AS authorName,
		article_slug 				AS slug,
		article_article_status_id	AS statusId
	FROM articles
	JOIN categories
		ON categories.category_id = article_category_id
	JOIN users
		ON users.user_id = article_user_id
	WHERE article_id = PArticleId;
END$$
DELIMITER ;
