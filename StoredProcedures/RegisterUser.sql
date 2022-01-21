DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `RegisterUser`(
    IN PUsername			VARCHAR(40),
	IN PEmail				VARCHAR(100),
    IN PPassword			VARCHAR(255)
)
BEGIN
	declare BWriterRoleId		INT;
    SELECT role_id 
    FROM roles 
    WHERE role_name = "Writer" 
    INTO BWriterRoleId;
    
	INSERT INTO users (user_username, user_email, user_password, user_role_id)
	VALUES (Pusername, PEmail, PPassword, BWriterRoleId);

    SELECT 
		user_id 			AS id,
        user_username 		AS username,
		user_role_id		AS roleId,
        role_name			AS roleName
	FROM users
    JOIN roles
    ON roles.role_id = user_role_id
    WHERE user_id = last_insert_id();
END$$
DELIMITER ;
