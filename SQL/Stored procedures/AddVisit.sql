DELIMITER $$
CREATE  PROCEDURE `AddVisit`(
	PArticleId 			INT
)
BEGIN
	UPDATE articles 
	SET article_visits = article_visits + 1
	WHERE article_id = PArticleId;
END$$
DELIMITER ;
