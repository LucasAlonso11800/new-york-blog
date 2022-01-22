DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ChangeUserRole`(
	IN PUserId			INT,
    IN PUserRoleName	VARCHAR(20)
)
BEGIN
	UPDATE users 
    SET user_role_id = (SELECT role_id 
							FROM roles
                            WHERE role_name = PUserRoleName)
	WHERE user_id = PUserId;
END$$
DELIMITER ;
