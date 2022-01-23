DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddArticle`(
	IN	PTitle 				VARCHAR (255),
	IN 	PVisits				INT,
	IN 	PCategoryId	 		INT,
    IN	PImage	 			VARCHAR(255),
	IN 	PCreatedAt 			CHAR(10),
	IN 	PUserId	 			INT,
	IN 	PSlug 				VARCHAR(255),
    IN 	PUserRoleName		VARCHAR(40)
)
BEGIN
	DECLARE BArticleStatus INT;
    IF (PUserRoleName = "Admin") THEN
		SELECT article_status_id AS id FROM article_statuses WHERE article_status_name = "Accepted" INTO BArticleStatus; 
	ELSE
		SELECT article_status_id AS id FROM article_statuses WHERE article_status_name = "Stand by" INTO BArticleStatus;
    END IF;
	INSERT INTO articles (
		article_title,
		article_visits,
		article_category_id,
		article_main_image,
		article_created_at,
		article_user_id,
		article_slug,
		article_article_status_id
	)
	VALUES (PTitle, PVisits, PCategoryId, PImage, PCreatedAt, PUserId, PSlug, BArticleStatus);
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
	WHERE article_id = last_insert_id();
END$$
DELIMITER ;
