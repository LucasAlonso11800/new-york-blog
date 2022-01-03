CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTotalArticleCount`()
BEGIN
	SELECT COUNT(*) AS count FROM articles;
END