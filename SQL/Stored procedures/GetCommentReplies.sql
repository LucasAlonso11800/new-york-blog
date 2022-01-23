DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCommentReplies`(
	IN PCommentId			INT
)
BEGIN
	SELECT
		comment_id 				AS id,  
		comment_commenter 		AS author,
		comment_body 			AS body,
		comment_created_at 		AS createdAt,
		comment_article_id 		AS articleId
	FROM comments
	WHERE comment_is_response = 'Y' AND comment_is_response_to_comment_id = PCommentId
	ORDER BY comment_created_at DESC;
END$$
DELIMITER ;
