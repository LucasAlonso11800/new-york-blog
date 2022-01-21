DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTotalArticleCount`()
BEGIN
	SELECT COUNT(*) AS count FROM articles 
    WHERE article_status_id = (SELECT article_status_id 
								FROM article_statuses
                                WHERE article_status_name = "Accepted"
							);
END$$
DELIMITER ;
