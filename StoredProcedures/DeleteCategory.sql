CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteCategory`(
	PCategoryId		INT
)
BEGIN
	DELETE FROM categories WHERE category_id = PCategoryId;
END