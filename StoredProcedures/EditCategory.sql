DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `EditCategory`(
	IN PCategoryId			INT,	
	IN PCategoryName		VARCHAR(40),
    IN PCategoryPath		VARCHAR(40)
)
BEGIN
	UPDATE categories 
    SET category_name = PCategoryName, category_path = PCategoryPath
    WHERE category_id = PCategoryId;
    
    SELECT 
		category_id AS id,
        category_name AS name,
        category_path AS path
	FROM categories
    WHERE category_id = PCategoryId;
END$$
DELIMITER ;
