DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddCategory`(
	IN PCategoryName		VARCHAR(40),
    IN PCategoryPath		VARCHAR(40)
)
BEGIN
	INSERT INTO categories (category_name, category_path)
    VALUES (PCategoryName, PCategoryPath);
    
    SELECT 
		category_id AS id,
        category_name AS name,
        category_path AS path
	FROM categories
    WHERE category_id = last_insert_id();
END$$
DELIMITER ;