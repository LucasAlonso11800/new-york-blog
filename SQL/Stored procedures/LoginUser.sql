DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LoginUser`(
	IN PEmail			VARCHAR(100)
)
BEGIN
    SELECT 
		user_id 			AS id,
        user_username 		AS username,
        user_role_id		AS roleId,
        role_name			AS roleName,
        user_password		AS password
	FROM users
    JOIN roles
    ON roles.role_id = user_role_id
    WHERE user_email = PEmail;
END$$
DELIMITER ;
