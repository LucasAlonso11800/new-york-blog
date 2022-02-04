DELIMITER $$
CREATE  PROCEDURE `GetCategories`()
BEGIN
	SELECT 
		category_id AS id,
		category_name AS name,
		category_path AS path
	FROM categories
	WHERE category_path NOT IN("dev", "about");
END$$
DELIMITER ;
