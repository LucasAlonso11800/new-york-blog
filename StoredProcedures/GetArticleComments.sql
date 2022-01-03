CREATE DEFINER=`root`@`localhost` PROCEDURE `GetArticleComments`(
	IN PArticleId			INT
)
BEGIN
	SELECT
		comment_id 			AS id,  
		comment_commenter 	AS author,
		comment_body 		AS body,
		comment_created_at 	AS createdAt,
		comment_article_id 	AS articleId
	FROM comments
	WHERE comment_is_response = 'N' AND comment_article_id = PArticleId
	ORDER BY comment_created_at DESC;
END