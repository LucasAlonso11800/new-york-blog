CREATE DEFINER=`root`@`localhost` PROCEDURE `GetComponentList`()
BEGIN
	SELECT 
		component_id AS id,
		component_name AS name
	FROM components;
END