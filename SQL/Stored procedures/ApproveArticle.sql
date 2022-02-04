CREATE DEFINER=`root`@`localhost` PROCEDURE `ApproveArticle`(
	IN 	PArticleId		INT
)
BEGIN
	UPDATE articles 
    SET article_article_status_id = (SELECT article_status_id 
										FROM article_statuses
										WHERE article_status_name = "Accepted"
								)
	WHERE article_id = PArticleId;
END