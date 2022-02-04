DELIMITER $$
CREATE  PROCEDURE `GetMetadata`()
BEGIN
	SELECT 
		metadata_id 			AS id,
		metadata_name 			AS name,
		metadata_description	AS description,
		metadata_value 			AS value
	FROM metadata;
END$$
DELIMITER ;
