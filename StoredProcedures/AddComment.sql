CREATE DEFINER=`root`@`localhost` PROCEDURE `AddComment`(
	IN PCommenter				VARCHAR(40),
	IN PEmail					VARCHAR(255),
	IN PBody					TEXT,
	IN PWebsite					VARCHAR(255),
	IN PArticleId				INT,
	IN PIsResponse				CHAR(1),
	IN PIsResponseToCommentId	INT
)
BEGIN
	declare BNewCommentId		INT;
    
	INSERT INTO comments (
		comment_commenter,
		comment_email,
		comment_body,
        comment_commenter_website,
		comment_created_at,
		comment_article_id,
		comment_is_response,
		comment_is_response_to_comment_id
	)
	VALUES (PCommenter, PEmail, PBody, PWebsite, NOW(), PArticleId, PIsResponse, PIsResponseToCommentId);
    
    SET BNewCommentId = last_insert_id();
    
	SELECT
		comment_id 					AS id,  
		comment_commenter 			AS author,
		comment_body 				AS body,
        comment_commenter_website 	AS website,
		comment_created_at 			AS createdAt,
		comment_article_id 			AS articleId
	FROM comments
	WHERE comment_id = BNewCommentId;
END