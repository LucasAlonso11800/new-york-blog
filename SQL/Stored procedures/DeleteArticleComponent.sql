DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteArticleComponent`(
	IN	PArticleComponentId		INT
)
BEGIN
	DELETE FROM article_components WHERE article_component_id = PArticleComponentId;
END$$
DELIMITER ;
