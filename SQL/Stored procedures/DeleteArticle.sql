DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteArticle`(
	IN PArticleId		INT
)
BEGIN
	DELETE FROM articles WHERE article_id = PArticleId;
END$$
DELIMITER ;
