DELIMITER $$
CREATE  PROCEDURE `GetSearchedArticleCount`(
	IN PSearch		VARCHAR(255)
)
BEGIN
	SELECT COUNT(*) AS count 
    FROM articles 
    WHERE article_title LIKE CONCAT("%", PSearch, "%")
	AND article_article_status_id = (SELECT article_status_id 
										FROM article_statuses
										WHERE article_status_name = "Accepted"
									)
END$$
DELIMITER ;
