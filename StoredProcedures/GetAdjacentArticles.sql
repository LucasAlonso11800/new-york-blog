DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAdjacentArticles`(
	PArticleId					INT
)
BEGIN
	declare BPrevious			INT;
    declare BNext				INT;
    
    -- Get previous id
	SELECT  article_id 			AS id
    FROM articles
	JOIN categories
	ON categories.category_id = article_category_id
	WHERE article_id > PArticleId 
    AND category_path != "about"
	AND article_status_id = (SELECT article_status_id 
								FROM article_statuses
                                WHERE article_status_name = "Accepted"
							)
	ORDER BY article_id
	LIMIT 1
	INTO BPrevious;
    
    -- Get next id

	SELECT article_id 			AS id
	FROM articles
    JOIN categories
	ON categories.category_id = article_category_id
	WHERE article_id < PArticleId 
    AND category_path != "about"
	AND article_status_id = (SELECT article_status_id 
								FROM article_statuses
                                WHERE article_status_name = "Accepted"
							)
    ORDER BY article_id DESC
	LIMIT 1
    INTO BNext;
    
    IF BPrevious IS NOT NULL THEN
		IF BNext IS NOT NULL THEN
			-- Article has articles before and after
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
			WHERE article_id IN(BPrevious, BNext)
            ORDER BY article_id;
		ELSE
			-- Article is the last one
			SELECT 
				null	 				AS id,
				null		 			AS title,
				null		 			AS visits,
				null				 	AS categoryId,
				null		 			AS categoryName,
				null		 			AS categoryPath,
				null			 		AS image,
				null			 		AS createdAt,
				null			 		AS authorId,
				null					AS authorName,
				null 					AS slug
                
            UNION ALL
			
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
			WHERE article_id = BPrevious;
        END IF;
	ELSE
		-- Article is the first one
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
			WHERE article_id = BNext
            
            UNION ALL
            
            SELECT 
				null	 				AS id,
				null		 			AS title,
				null		 			AS visits,
				null				 	AS categoryId,
				null		 			AS categoryName,
				null		 			AS categoryPath,
				null			 		AS image,
				null			 		AS createdAt,
				null			 		AS authorId,
				null					AS authorName,
				null 					AS slug;
	END IF;
END$$
DELIMITER ;
