select * from users join preferences
 on users.id = preferences.user_id where 
 users.id = $1;