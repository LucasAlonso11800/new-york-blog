DELIMITER $$
CREATE  PROCEDURE `EditMetadata`(
	PMetadataId			INT,
    PMetadataName		VARCHAR(40),
    PMetadataValue		TEXT
)
BEGIN
	UPDATE metadata
    SET metadata_name = PMetadataName, metadata_value = PMetadataValue
	WHERE metadata_id = PMetadataId;
	
    SELECT 
		metadata_id 			AS id,
		metadata_name 			AS name,
		metadata_description	AS description,
		metadata_value 			AS value
	FROM metadata
    WHERE metadata_id = PMetadataId;
END$$
DELIMITER ;
