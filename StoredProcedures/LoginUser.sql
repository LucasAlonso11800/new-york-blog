CREATE DEFINER=`root`@`localhost` PROCEDURE `LoginUser`(
	IN PEmail			VARCHAR(100)
)
BEGIN
    SELECT 
		user_id 			AS id,
        user_username 		AS username,
        user_password		AS password
	FROM users
    WHERE user_email = PEmail;
END