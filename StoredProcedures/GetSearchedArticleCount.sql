CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSearchedArticleCount`(
	IN PSearch		VARCHAR(255)
)
BEGIN
	SELECT COUNT(*) AS count 
    FROM articles 
    WHERE article_title LIKE CONCAT("%", PSearch, "%");
END