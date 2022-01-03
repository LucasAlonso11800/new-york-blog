CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCategoryArticleCount`(
	IN	PCategoryId			INT
)
BEGIN
	SELECT COUNT(*) AS count 
    FROM articles 
    WHERE article_category_id = PCategoryId;
END