CREATE TABLE roles (
  role_id INT PRIMARY KEY AUTO_INCREMENT,
  role_name VARCHAR(40)
);

CREATE TABLE categories (
  category_id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(40) UNIQUE,
  category_path VARCHAR(40) UNIQUE
);

CREATE TABLE components (
  component_id INT PRIMARY KEY AUTO_INCREMENT,
  component_name VARCHAR(40),
  component_description VARCHAR(40)
);

CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  user_username VARCHAR(40) UNIQUE,
  user_email VARCHAR(100) UNIQUE,
  user_password VARCHAR(20),
  user_role_id INT,
  FOREIGN KEY (user_role_id) REFERENCES roles(role_id)
);

CREATE TABLE article_statuses (
	article_status_id INT PRIMARY KEY AUTO_INCREMENT,
    article_status_name VARCHAR(40)
);

CREATE TABLE articles (
  article_id INT PRIMARY KEY AUTO_INCREMENT,
  article_title VARCHAR (255) UNIQUE,
  article_visits INT,
  article_category_id INT,
  article_main_image VARCHAR(255),
  article_created_at CHAR(10),
  article_user_id INT,
  article_slug VARCHAR(255) UNIQUE,
  article_article_status_id INT,
  FOREIGN KEY(article_category_id) REFERENCES categories(category_id),
  FOREIGN KEY(article_user_id) REFERENCES users(user_id),
  FOREIGN KEY(article_article_status_id) REFERENCES article_statuses(article_status_id)
);

CREATE TABLE comments (
  comment_id INT PRIMARY KEY AUTO_INCREMENT,  
  comment_commenter VARCHAR(40),
  comment_email VARCHAR(100),
  comment_commenter_website VARCHAR(100),
  comment_body TEXT,
  comment_created_at CHAR(10),
  comment_article_id INT,
  comment_is_response CHAR(1),
  comment_is_response_to_comment_id INT,
  FOREIGN KEY(comment_article_id) REFERENCES articles(article_id) ON DELETE CASCADE,
  FOREIGN KEY(comment_is_response_to_comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE
);

CREATE TABLE article_components (
    article_component_id INT PRIMARY KEY AUTO_INCREMENT,
    article_component_component_id INT,
    article_component_article_id INT,
    article_component_order INT,
    article_component_image VARCHAR(255),
    article_component_text LONGTEXT,
    article_component_font_weight INT,
    article_component_text_align CHAR(1),
    FOREIGN KEY(article_component_component_id) REFERENCES components(component_id),
    FOREIGN KEY(article_component_article_id) REFERENCES articles(article_id) ON DELETE CASCADE
);