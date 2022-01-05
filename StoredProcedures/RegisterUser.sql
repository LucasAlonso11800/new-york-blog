CREATE DEFINER=`root`@`localhost` PROCEDURE `RegisterUser`(
    IN PUsername		VARCHAR(40),
	IN PEmail			VARCHAR(100),
    IN PPassword		VARCHAR(255)
)
BEGIN
	INSERT INTO users (user_username, user_email, user_password)
	VALUES (Pusername, PEmail, PPassword);

    SELECT 
		user_id 		AS id,
        user_username 	AS username
	FROM users
    WHERE user_id = last_insert_id();
END