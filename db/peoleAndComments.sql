SELECT * FROM users join comments on users.id = personcommenting where comments.ownerofpost = $1;
-- SELECT count(*) from comments where ownerofpost = $1;