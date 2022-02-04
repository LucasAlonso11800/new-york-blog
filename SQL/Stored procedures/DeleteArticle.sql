DELIMITER $$
CREATE  PROCEDURE `DeleteArticle`(
	IN PArticleId		INT
)
BEGIN
	DELETE FROM articles WHERE article_id = PArticleId;
END$$
DELIMITER ;
