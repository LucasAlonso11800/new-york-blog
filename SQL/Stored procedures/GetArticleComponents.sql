DELIMITER $$
CREATE  PROCEDURE `GetArticleComponents`(
	IN	PArticleId		INT
)
BEGIN
	SELECT         
		article_component_id 				AS id,
		article_component_component_id 		AS componentId,
		component_name 						AS componentName,
		article_component_article_id 		AS articleId,
		article_component_order 			AS 'order',
		article_component_image 			AS image,
		article_component_text				AS text,
		article_component_font_weight		AS fontWeight,
		article_component_text_align 		AS textAlign
	FROM article_components
	JOIN components 
		ON components.component_id = article_component_component_id
	WHERE article_component_article_id = PArticleId
	ORDER BY article_component_order;
END$$
DELIMITER ;
